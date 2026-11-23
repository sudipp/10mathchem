# Math lesson videos

Narrated, captioned lesson videos (about 2–3 minutes each) for the math site,
organized by unit: `unit-3` is Conic Sections, `unit-4` is Polynomial
Functions, and `unit-5` is Radical Expressions. Each video follows the class
notes (Unit 5 has none, so its videos follow HW #1), ends with a timed "Your
turn" problem, and checks the answer.

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
