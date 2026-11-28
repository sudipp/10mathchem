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
   note on how the chapter fits the AP course, the narrated video, and a
   Crash Course video.
2. **Timeline** (`src/Timeline.jsx`): one lane per theme (government, war,
   society & economy, religion & ideas) plus “Meanwhile in the world” for
   comparisons. Zoom presets; tap an event for details. `#/timeline` shows
   every chapter’s events together.
3. **Animated map** (`src/MapPlayer.jsx`): steps that zoom, fade in
   territories and draw routes. Each lesson section has “Show on the map.”
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

1. Put the PDFs in `../History/` and write `src/chapters/ch<n>.js` following
   `ch11.js`: `sections`, `timeline` (year < 0 is BCE; `end` makes a span),
   `terms` (`[term, meaning, why it matters]`), `compare`, `mcq`, `saq`,
   `leq`, `recall`. Write explanations in your own words; quote only
   public-domain translations and cite them.
2. Add map steps for the chapter’s region (see below) and list the chapter in
   `CHAPTERS` in `src/shared.js`.
3. Make the narrated video: a script in `../math-videos/videos/hist-<n>/`,
   then `node build.mjs hist-<n>/<id>`, `python make_video.py hist-<n>/<id>`,
   and `node publish.mjs hist-<n>` (writes `public/videos/chapter-<n>/` and
   `src/videos/chapter-<n>.json`; add the import to `src/narrated.js`).

## Maps

`src/geo/mediterranean.js` holds the base map (coastline, rivers, lakes)
generated from Natural Earth 1:50m data (public domain) with an
equirectangular projection centered on 40°N. `src/geo/rome.js` holds the
chapter’s cities, routes and territories in longitude/latitude. Territories
are clipped to the coastline, so outlines only need to follow land
frontiers. The video player (`../math-videos/player.html`, view `histmap`)
reuses the same data, so the site and the video always match.

To regenerate the base map for a new region, download `ne_50m_land`,
`ne_50m_rivers_lake_centerlines` and `ne_50m_lakes` GeoJSON from
`nvkelso/natural-earth-vector`, clip to the region, simplify (about 0.03°),
project, and write the paths the same way.

## Sources

Chapter 11 practice quotes Polybius (trans. Paton, 1923), Plutarch’s
*Tiberius Gracchus* (trans. Perrin, 1921), the *Res Gestae* (trans. Shipley,
1924), Tacitus’s *Agricola* (trans. Church and Brodribb, 1877) and
Galatians 3:28 (King James Version). Outside videos are linked from Crash
Course, Khan Academy and Overly Sarcastic Productions and load only on click.
