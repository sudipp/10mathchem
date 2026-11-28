# Math and chemistry lesson videos

Narrated, captioned lesson videos (about 2–3 minutes each) for the math site,
organized by unit: `unit-0` is Linear, Absolute Value & Piecewise Functions,
`unit-1` is Quadratic Functions, `unit-2` is Solving Quadratics, Systems &
Inequalities, `unit-3` is Conic Sections, `unit-4` is Polynomial Functions,
and `unit-5` is Radical Expressions. Each video follows the class notes
(Unit 5 has none, so its videos follow HW #1), ends with a timed "Your turn"
problem, and checks the answer.

The same pipeline makes the chemistry videos (`chem-1` to `chem-3`, see
[Chemistry videos](#chemistry-videos) below).

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
   (`../math-self-learning/src/poly.js`), and conic graphs (circles,
   parabolas, ellipses, hyperbolas, with their center, vertices, co-vertices,
   foci, directrix, asymptotes, and box) with `../math-self-learning/src/conics.js`.
   It writes `build/<unit>/<id>/spec.json`. A `conic` view reveals each
   feature on its own narration marker, e.g.
   `reveal: [['center', 1], ['vertices', 2], ['box', 3], ['asymptotes', 4], ['curve', 5]]`.
   A `plane` layout (Units 0–2) lists its own items, each with a reveal
   `key`: curves on an interval (`fn`, optionally `dashed` or `alt`),
   vertical lines, shaded regions above/below a curve or left/right of
   `x = c`, an axis of symmetry, and open, closed, vertex, or solution dots.
   A `plane` scene with a `countdown` shows the timer beside the graph.
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

## Unit 0 videos

| Id | Lesson | Based on |
|---|---|---|
| 01-lines | Slope, three forms, graphing, parallel and perpendicular | HW #1 #11, #39 |
| 02-linear-inequalities | Boundary, shading, reading a graph, interval notation | HW #2, handout |
| 03-absolute-value | Vertex, a/h/k, graphing, writing from a graph | Day 4, HW #4 |
| 04-piecewise-graphs | Open and closed dots, graphing, evaluating | Day 4 Ex. 8–9 |
| 05-writing-piecewise | Rules from a graph, domain and range | Day 5, HW #5 |

## Unit 1 videos

| Id | Lesson | Based on |
|---|---|---|
| 01-standard-form | Vertex from −b/2a, graphing, domain and range | Day 1, HW #1 |
| 02-transformations | Vertex form, shifts, reflections, stretches | Day 2, HW #2 |
| 03-characteristics | Intercepts, range, increasing and decreasing | Day 3, HW #3 |
| 04-intercept-form | Zeros, axis halfway, vertex | Day 4, HW #4 |
| 05-writing-quadratics | Vertex or zeros plus a point; converting forms | Day 5, HW #5 |

## Unit 2 videos

| Id | Lesson | Based on |
|---|---|---|
| 01-quadratic-formula | The formula, steps, simplifying the root | Day 11, HW #11 |
| 02-discriminant | Three cases, imaginary i, complex arithmetic | Day 12, HW #12 |
| 03-completing-the-square | Changing forms, vertex form, solving | Day 13, HW #13 |
| 04-linear-quadratic-systems | Checking a point, substitution, no solution | Day 16, HW #16 |
| 05-quadratic-systems | Setting two parabolas equal, one solution, x² cancels | Day 17, HW #17 |
| 06-quadratic-inequalities | Shading a parabola, number line, special cases | Day 18, HW #18 |

## Unit 3 videos

| Id | Lesson | Based on |
|---|---|---|
| 01-circles | Center and radius, completing the square | Day 1, HW #1 #10 |
| 02-parabolas | Focus, directrix, vertex form, p = 1/(4a) | Day 2, HW #2 #11 |
| 03-writing-circles-parabolas | Equations from centers, diameters, foci, directrices | Day 3, HW #3 #11, #24 |
| 04-ellipses | Vertices, co-vertices, foci, general form | Day 4, HW #4 #5 |
| 05-writing-ellipses | Center, a, b; the sum-of-distances definition | Day 5, HW #5 #3, HW #8 |
| 06-hyperbolas | Direction, the box, asymptotes, foci | Day 6, HW #6 #6 |
| 07-writing-hyperbolas | c² = a² + b², asymptote slopes, a point | Day 7, HW #7 #4, #7, HW #8 |
| 08-classifying-conics | A and C decide the conic | Day 7 |

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
| 12-fundamental-theorem | Counting zeros, finding all zeros | Day 12 |
| 13-polynomial-inequalities | Critical points, sign charts, special cases | Day 14, HW #14 |
| 14-inverse-functions | Switch and solve, composition, reflection | Day 15, HW #15 |

## Unit 5 videos

| Id | Lesson | Based on |
|---|---|---|
| 01-simplifying-radicals | Perfect squares, even and odd exponents | HW #1 #1, #4 |
| 02-multiplying-radicals | Outside × outside, inside × inside, distributing | HW #1 #8, #10, #11, #16 |
| 03-dividing-rationalizing | Quotient property, rationalizing the denominator | HW #1 #17, #19, #22 |

## Chemistry videos

Scripts live in `videos/chem-1` … `videos/chem-3` (Chapters 1–3) and share
`videos/chem.mjs`, which computes electron configurations, shorthand, and
element lists with the chemistry site's engines
(`../chemistry-self-learning/src/electrons.js`, `atomic.js`, `measure.js`), so
the videos match the worksheet help. Some scripts also throw if a worked
example no longer matches the engine.

Chemistry views in `player.html`:

- `ptable`: the periodic table (layout `{ type: 'ptable' }`) with colored
  `groups` (cell text can be replaced, e.g. `3d` or `+2`), `rings`, block
  `labels`, and trend `arrows` (`up`, `down`, `left`, `right`).
- `orbitals`: orbital boxes from `{ type: 'orbitals', z, charge, only }` or
  explicit `rows` (`bad` marks a broken box). `reveal: [[count, marker]]` adds
  arrows in Hund order; `config` shows the configuration.
- `waves` (wavelength and amplitude markers), `spectrum` (radio → gamma with
  frequency, energy and wavelength arrows), `bohr` (energy levels, electron
  falls, and hydrogen's bright lines), `circles` (atom and ion sizes),
  `tile` (one periodic-table box), and `models` (Dalton, plum pudding, gold
  foil, nuclear, Bohr, electron cloud, neutron).
- Every chemistry view accepts `title`, `notes`, and a `side` panel; with a
  `countdown`, a timer appears beside it.

`node publish.mjs chem-2` copies `out/chem-2` to
`../chemistry-self-learning/public/videos/chapter-2/` and writes
`../chemistry-self-learning/src/videos/chapter-2.json`. Lessons point to their
video with `narrated: 'chapter-2/07-nuclear'` in `src/lessons123.js`; the exam
reviews appear on the Unit 2 and Unit 3 Exam Review worksheet tabs.

| Chapter | Videos |
|---|---|
| 1 Measurement | 01-prefixes, 02-conversion-factors, 03-temperature, 04-periodic-table |
| 2 Atomic theory & nuclear | 01-atomic-theory, 02-atomic-structure, 03-average-mass, 04-waves, 05-photons, 06-bohr, 07-nuclear, 08-half-life, 09-exam-review |
| 3 Electrons & trends | 01-blocks, 02-orbital-rules, 03-configurations, 04-shorthand, 05-ions, 06-radius, 07-ionization-electronegativity, 08-exam-review |

Each lesson video has a picture for every idea, an "Exam tip" scene, a timed
"Your turn" problem with its answer, and a recap. The exam reviews are eight
pause-and-try questions modeled on the class review sheets.

## History videos

Scripts live in `videos/hist-<chapter>/` (e.g. `hist-11/01-rome.mjs`). The
`histmap` layout (`{ type: 'histmap' }`) loads the history site's map
(`../history-self-learning/src/geo`) so the video shows the same territories,
routes and cities as the site. History views in `player.html`:

- `histmap`: one map step (`step`), with `landsAt`, `routesAt` (one marker
  per route), `tagsAt` and `citiesAt` reveal markers.
- `chain`: cause → effect boxes, each on its marker.
- `timeline`: one axis (`range`, `ticks`) with events on their markers.

`node publish.mjs hist-11` copies the videos to
`../history-self-learning/public/videos/chapter-11/` and writes
`../history-self-learning/src/videos/chapter-11.json`.
