# Math lesson videos

Narrated, captioned lesson videos (about 2–3 minutes each) for the math site,
organized by unit: `unit-4` is Polynomial Functions. Each video follows the
class notes, ends with a timed "Your turn" problem, and checks the answer.

## Folders

```
videos/<unit>/<id>.mjs    scripts, e.g. videos/unit-4/03-long-division.mjs
build/<unit>/<id>/        computed layouts, cached narration
out/<unit>/<id>.mp4/.webm finished videos
```

## How a video is made

1. Write the script in `videos/<unit>/<id>.mjs`. Each scene has narration
   (`say`) and a picture (`view`). In the narration, `[[n]]` marks the word
   where an item with `at: n` appears on screen.
2. `node build.mjs <unit>/<id>` computes long-division layouts,
   synthetic-division tables, and graphs with the math site's engine
   (`../math-self-learning/src/poly.js`), and writes
   `build/<unit>/<id>/spec.json`.
3. `python make_video.py <unit>/<id>` narrates each scene (neural voice,
   cached), lines up markers and captions with the spoken words, renders
   `player.html` frame by frame in headless Edge, and writes
   `out/<unit>/<id>.mp4` (H.264/AAC) and `.webm` (VP9/Opus).
   - `--stills` renders one image per scene instead, for quick review;
     `python contact_sheet.py <unit>/<id>` combines them into review sheets.
4. `node publish.mjs <unit>` copies the unit's finished videos, plus poster
   images, into `../math-self-learning/public/videos/<unit>/` and writes the
   durations to `../math-self-learning/src/units/<unit>/videos.json`. Then
   rebuild the math site. The unit must already exist in the site.

## Requirements

Node.js, Python 3, Microsoft Edge, and the Python packages `edge-tts`,
`imageio-ffmpeg`, and `playwright` (`pip install edge-tts imageio-ffmpeg
playwright`). Narration uses Microsoft's online neural voices, so an internet
connection is needed the first time a script is narrated; only the lesson
script text is sent.

## Unit 4 videos

| Id | Lesson | Based on |
|---|---|---|
| 01-polynomial-basics | Standard form, degree, names | Day 3 review, HW #6 #1–2 |
| 02-zeros-factors | Zeros, multiplicity, writing from zeros | Day 3, HW #3 |
| 03-long-division | Long division, Remainder Theorem | Day 4 |
| 04-synthetic-division | Synthetic division, f(k) | Day 5 |
| 05-factoring | GCF, cubes, quadratic form, grouping | Day 7, HW #7 |
| 06-solving | Zero Product Property, complex roots | Day 7, HW #7 |
| 07-function-operations | Operations, plugging in, composition | HW #6 |
| 08-solving-by-graphing | Calculator zeros, completing the square | HW #8 |
| 09-end-behavior | End behavior, turning points, sketching | Day 9, HW #9 |
| 10-rational-roots | Rational Root Theorem: list, test, divide | Day 10 |
| 11-conjugate-roots | Conjugate pairs, building polynomials, all roots | Day 11, HW #11 |
