"""Render a narrated lesson video: python make_video.py <unit>/<video-id> [--preview SECONDS] [--stills]

1. Narrate each scene with a neural voice (cached in build/<id>/tts).
2. Align [[n]] markers in the script to spoken word times.
3. Render player.html frame by frame in headless Edge, piping frames to ffmpeg.
4. Mux with the narration track into out/<id>.mp4 (H.264 + AAC).
"""
import asyncio, hashlib, json, pathlib, re, subprocess, sys, wave

import edge_tts, imageio_ffmpeg
from playwright.sync_api import sync_playwright

VOICE, RATE = "en-US-AvaMultilingualNeural", "+6%"
FPS, SR = 30, 48000
LEAD, TAIL, FIRST_LEAD = 0.25, 0.5, 0.6
ROOT = pathlib.Path(__file__).parent
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()


def tokenize(say):
    """Split narration into words; return (clean text, words, marker -> word index)."""
    words, marks = [], {}
    for tok in say.split():
        while (m := re.match(r"\[\[(\d+)\]\]", tok)):
            marks[int(m.group(1))] = len(words)
            tok = tok[m.end():]
        if tok:
            words.append(tok)
    return " ".join(words), words, marks


async def narrate(text, mp3):
    for attempt in range(4):
        try:
            return await _narrate(text, mp3)
        except Exception:  # network hiccups and empty responses
            if attempt == 3:
                raise
            await asyncio.sleep(2 + attempt * 3)


async def _narrate(text, mp3):
    comm = edge_tts.Communicate(text, VOICE, rate=RATE, boundary="WordBoundary")
    audio, bounds = bytearray(), []
    async for ch in comm.stream():
        if ch["type"] == "audio":
            audio += ch["data"]
        elif ch["type"] == "WordBoundary":
            bounds.append((ch["offset"] / 1e7, ch["text"]))
    mp3.write_bytes(audio)
    return bounds


def norm(s):
    return re.sub(r"[^a-z0-9]", "", s.lower())


def align(words, bounds):
    """Time for each word: match spoken boundaries against the script text."""
    stream, owner = "", []
    for i, w in enumerate(words):
        n = norm(w)
        stream += n
        owner += [i] * len(n)
    times, pos = [None] * len(words), 0
    for t, text in bounds:
        b = norm(text)
        if not b:
            continue
        idx = stream.find(b, pos)
        if idx < 0 or idx - pos > 40:
            continue
        w = owner[idx]
        if times[w] is None:
            times[w] = t
        pos = idx + len(b)
    # fill gaps by interpolation
    known = [i for i, t in enumerate(times) if t is not None]
    for i in range(len(times)):
        if times[i] is None:
            before = max((k for k in known if k < i), default=None)
            after = min((k for k in known if k > i), default=None)
            if before is not None and after is not None:
                times[i] = times[before] + (times[after] - times[before]) * (i - before) / (after - before)
            else:
                times[i] = times[before] + 0.3 * (i - before) if before is not None else 0.0
    return times


def decode(mp3, wav):
    subprocess.run([FFMPEG, "-y", "-loglevel", "error", "-i", str(mp3), "-ac", "1", "-ar", str(SR), "-sample_fmt", "s16", str(wav)], check=True)
    with wave.open(str(wav)) as w:
        return w.readframes(w.getnframes())


def capture(page):
    """Screenshot one frame, retrying if the browser stalls briefly."""
    for attempt in range(4):
        try:
            return page.screenshot(type="jpeg", quality=92, timeout=90000)
        except Exception:
            if attempt == 3:
                raise
            page.wait_for_timeout(2000)


def main():
    vid = sys.argv[1]
    preview = float(sys.argv[sys.argv.index("--preview") + 1]) if "--preview" in sys.argv else None
    build = ROOT / "build" / vid
    spec = json.loads((build / "spec.json").read_text(encoding="utf-8"))
    tts = build / "tts"
    tts.mkdir(exist_ok=True)

    pcm, start = bytearray(), 0.0
    for i, s in enumerate(spec["scenes"]):
        text, words, marks = tokenize(s["say"])
        h = hashlib.sha1(f"{VOICE}|{RATE}|{text}".encode()).hexdigest()[:12]
        mp3, meta = tts / f"{h}.mp3", tts / f"{h}.json"
        if not meta.exists():
            bounds = asyncio.run(narrate(text, mp3))
            meta.write_text(json.dumps(bounds))
        bounds = json.loads(meta.read_text())
        audio = decode(mp3, tts / f"{h}.wav")
        audio_len = len(audio) / 2 / SR
        times = align(words, bounds)
        lead = FIRST_LEAD if i == 0 else LEAD
        dur = lead + audio_len + TAIL + s.get("countdown", 0) + (0.6 if s.get("countdown") else 0)
        n_total = round((start + dur) * SR) - round(start * SR)
        silence_before = round(lead * SR)
        chunk = bytes(silence_before * 2) + audio
        chunk += bytes(max(0, n_total * 2 - len(chunk)))
        pcm += chunk[: n_total * 2]
        s.update(start=start, dur=n_total / SR, lead=lead, audio=audio_len,
                 words=[{"w": w, "t": t} for w, t in zip(words, times)],
                 marks={str(k): lead + times[v] for k, v in marks.items()})
        start += n_total / SR
        print(f"scene {i + 1:2d}: {dur:5.1f}s  {text[:70]}")
    total = start
    wav_path = build / "narration.wav"
    with wave.open(str(wav_path), "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(bytes(pcm))
    (build / "timeline.json").write_text(json.dumps(spec, indent=1), encoding="utf-8")
    length = min(total, preview) if preview else total
    print(f"Total {total:.1f}s; rendering {length:.1f}s at {FPS} fps")

    if "--stills" in sys.argv:
        stills = build / "stills"
        stills.mkdir(exist_ok=True)
        with sync_playwright() as p:
            browser = p.chromium.launch(channel="msedge")
            page = browser.new_page(viewport={"width": 1280, "height": 720})
            page.goto((ROOT / "player.html").as_uri())
            page.evaluate("document.fonts.ready")
            page.evaluate("data => window.setup(data)", spec)
            for i, s in enumerate(spec["scenes"]):
                page.evaluate(f"window.render({s['start'] + s['dur'] - 0.4})")
                page.screenshot(path=str(stills / f"{i + 1:02d}.png"))
            browser.close()
        print(f"Wrote {len(spec['scenes'])} stills to {stills}")
        return

    out = ROOT / "out" / f"{vid}{'-preview' if preview else ''}.mp4"
    out.parent.mkdir(parents=True, exist_ok=True)
    ff = subprocess.Popen([FFMPEG, "-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", str(FPS), "-c:v", "mjpeg", "-i", "-",
                           "-i", str(wav_path), "-t", f"{length:.3f}", "-vf", "scale=in_range=pc:out_range=tv,format=yuv420p", "-c:v", "libx264", "-preset", "medium", "-crf", "20", "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709", "-color_range", "tv",
                           "-ac", "2", "-c:a", "aac", "-b:a", "160k", "-movflags", "+faststart", str(out)], stdin=subprocess.PIPE)
    with sync_playwright() as p:
        browser = p.chromium.launch(channel="msedge")
        page = browser.new_page(viewport={"width": 1280, "height": 720}, device_scale_factor=1.5)
        page.goto((ROOT / "player.html").as_uri())
        page.evaluate("document.fonts.ready")
        page.evaluate("data => window.setup(data)", spec)
        page.wait_for_timeout(300)
        last_sig, last_img, frames = None, None, round(length * FPS)
        for f in range(frames):
            sig = page.evaluate(f"window.render({f / FPS})")
            if sig != last_sig:
                last_img, last_sig = capture(page), sig
            ff.stdin.write(last_img)
            if f % (FPS * 10) == 0:
                print(f"  frame {f}/{frames}", flush=True)
        browser.close()
    ff.stdin.close()
    ff.wait()
    print(f"Wrote {out} ({out.stat().st_size / 1e6:.1f} MB)")
    # VP9/Opus copy for players without AAC support (such as the VS Code preview)
    webm = out.with_suffix(".webm")
    subprocess.run([FFMPEG, "-y", "-loglevel", "error", "-i", str(out), "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "34", "-row-mt", "1",
                    "-deadline", "good", "-cpu-used", "4", "-c:a", "libopus", "-b:a", "128k", str(webm)], check=True)
    print(f"Wrote {webm} ({webm.stat().st_size / 1e6:.1f} MB)")


if __name__ == "__main__":
    main()
