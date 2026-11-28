# Self Learning: AP World History

A React 19 site that teaches one textbook chapter a day, served at
`/history/`. The class uses Bentley & Ziegler, *Traditions & Encounters*
(5th ed.); chapters are added as the teacher assigns them, starting with
**Chapter 11, Mediterranean Society: The Roman Phase**.

## Run locally

```powershell
npm install
npm run dev -- --host 127.0.0.1
```

`npm run build` builds into `dist/`; `npm run lint` runs oxlint. The root
`npm run build` builds all three sites and assembles them with
`site-host/assemble.mjs`.

## A lesson day (about an hour)

Each chapter page (`#/chapter/<n>`) walks through six steps; “Mark this step
done” saves progress on the device (localStorage).

1. **Big picture**: the chapter’s big question, a hook, four big ideas, a
   note on how the chapter fits the AP course, the narrated video, and an
   outside overview video (Crash Course and similar).
2. **Timeline** (`src/Timeline.jsx`): one lane per theme (government, war,
   society & economy, religion & ideas) plus “Meanwhile in the world” for
   comparisons. Zoom presets; tap an event for details. `#/timeline` shows
   every chapter’s events together, with a zoom button per chapter.
3. **Animated map** (`src/MapPlayer.jsx`): steps that zoom, fade in
   territories and draw routes; a step can switch base map (for example to
   the Pacific). Each lesson section has “Show on the map.”
4. **Lesson**: short sections, each with key facts, a cause → effect chain
   revealed one link at a time, a “So what?” line, optional fact checks where
   the class notes differ from standard dates, and a related video.
5. **Compare & terms**: comparison tables (e.g. Rome vs Han China) and flip
   flashcards with a saved “got it” pile.
6. **Practice**: stimulus-based multiple choice (public-domain primary
   sources; options are shuffled per question), short-answer questions with a
   scoring guide and model answers, a long-essay outline builder (thesis,
   context, evidence sorting, complexity), and a five-question exit ticket to
   repeat the next day.

## Adding a chapter

Each chapter is three files; nothing else needs to change (the chapter list,
loader and video manifests are found automatically).

1. Add the title, era and big question to `src/chapters/index.js`, and put the
   PDFs in `../History/` (not committed: the slides are the publisher's).
2. `src/chapters/ch<n>.js` — the lesson, following `ch11.js`: `hook`, `apNote`,
   `bigIdeas`, `video` (outside video for step 1), `mapSub`, `zooms` (timeline
   zoom buttons), `sections`, `timeline` (year < 0 is BCE; `end` makes a span),
   `terms` (`[term, meaning, why it matters]`), `compare`, `mcq`, `saq`, `leq`,
   `recall`. Write explanations in your own words; quote only public-domain
   translations (1929 or earlier) and cite them.
3. `src/maps/ch<n>.js` — the animated map: `{ base, aspect, cities, steps }`
   (see below).
4. The narrated video: a script in `../math-videos/videos/hist-<n>/` with
   `layouts: { map: { type: 'histmap', chapter: <n> } }`, then
   `node build.mjs hist-<n>/<id>`, `python make_video.py hist-<n>/<id>` and
   `node publish.mjs hist-<n>` (writes `public/videos/chapter-<n>/<id>.{mp4,jpg}`
   and `src/videos/chapter-<n>.json`). History videos are MP4 only.

`node tools/check-chapter.mjs <n>` checks a chapter's content, map and video
script; `node tools/preview-map.mjs <n>` renders every map step to
`tools/out/ch<n>-step<i>.png` with a longitude/latitude grid.

Chapters load on demand (`loadChapter` in `src/shared.js`), so the home page
stays small; the master timeline (`#/timeline`) loads every chapter's events.

## Maps

Three base maps in `src/geo/` hold coastlines, rivers and lakes from Natural
Earth 1:50m data (public domain), in an equirectangular projection:

- `mediterranean.js`: lon −11…50, lat 22…57, the most detailed coastline.
- `world.js`: the whole world (lon −180…180, lat −56…78), Atlantic-centered.
- `pacific.js`: lon 95…295, lat −50…62. East of 180° longitudes keep counting
  (lon + 360), so Hawaii is about 204.5 and Lima 283.

`python tools/make_basemap.py world|pacific <geojson-dir>` regenerates the
world and Pacific maps from `ne_50m_land`, `ne_50m_rivers_lake_centerlines`
and `ne_50m_lakes` (as `land50`, `rivers50`, `lakes50.geojson`).

`src/maps/ch<n>.js` holds a chapter's cities, territories and routes in
longitude/latitude and its steps (`title`, `caption`, `view`
`[lonMin, latMin, lonMax, latMax]` or null, `lands`, `routes`, `cities`,
`tags`, and optionally `base` to switch base map). Territories are clipped to
the coastline, so outlines only need to follow land frontiers. The video
player (`../math-videos/player.html`, view `histmap`) uses the same data and
the same view boxes (`src/mapView.js`), so the site and the video match.
## Sources

Practice questions quote only public-domain texts: translations published in
1929 or earlier (for example Jowett, Rawlinson, Perrin, Legge, Rodwell, Yule,
Gibb, Markham, Maudslay and Waterworth), texts first written in English
(Locke, Adam Smith, Bradford, Cook) and the King James Bible. Each quotation
was copied from an online scan or sourcebook page and is cited with its
translator and year in the chapter file. Explanations are original, and
`factCheck` notes flag places where the class notes differ from standard
dates. Outside videos (CrashCourse, Khan Academy, Heimler's History, TED-Ed and
others) are linked by verified YouTube ids and load only on click.