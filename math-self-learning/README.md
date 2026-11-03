# Self Learning: math

A React 19 learning site for Accelerated Math II/III, organized by unit.
Each unit has narrated video lessons, step-by-step animations, quick checks,
and homework help. Available now: **Unit 4, Polynomial Functions**.

## Run locally

```powershell
npm install
npm run dev -- --host 127.0.0.1
```

`npm run build` writes `dist/` (served at `/math/`), and `npm run lint` runs
static checks. To host both the chemistry and math sites on the home network,
use `..\site-host\Start Self Learning Sites.bat`.

## Addresses

| Address | Page |
|---|---|
| `/math/` | All units |
| `/math/#/unit-4` | Unit 4 home (`/lessons`, `/day`, `/resources` jump to a section) |
| `/math/#/unit-4/homework/hw3` | Unit 4 homework help |

Links from before units existed (`#lessons`, `#/homework/hw3`) redirect to
Unit 4.

## How units are organized

```
src/units/index.js            list of units shown on the site
src/units/unit-4/index.jsx    lessons, day plan, bookshelf, video list
src/units/unit-4/homework.js  homework problems and answer-key values
src/units/unit-4/videos.json  video durations (written by publish.mjs)
src/units/unit-4/visuals.jsx  drawings only this unit uses
public/videos/unit-4/         lesson videos and poster images
```

Shared pieces live in `src/`: the lesson page parts (`Lesson.jsx`), homework
help (`Homework.jsx`, `solve.jsx`), math rendering (`TeX.jsx`), drawings
(`Visuals.jsx`), and the polynomial engine (`poly.js`).

### Adding a unit

1. Copy `src/units/unit-4/` to `src/units/unit-<n>/` and replace its lessons,
   homework, day plan, and bookshelf. Set `number`, `slug: 'unit-<n>'`, and
   `title`. Start `videos.json` as `{}` until videos exist.
2. Import it in `src/units/index.js` and add it to `UNITS`.
3. Optional videos: write scripts in `../math-videos/videos/unit-<n>/`, render
   them, then `node ../math-videos/publish.mjs unit-<n>`.
4. `npm run build`.

## Unit 4: Polynomial Functions

Built from the class notes (Days 3, 4, 5, 7, 9) and HW #3 to HW #9.

1. Polynomial basics: standard form, degree, and names.
2. Zeros and linear factors: multiplicity and writing polynomials from zeros.
3. Polynomial long division and the Remainder Theorem.
4. Synthetic division and evaluating f(k).
5. Factoring: sum/difference of cubes, quadratic form, grouping.
6. Solving polynomial equations, including complex roots.
7. Function operations and composition.
8. Solving by graphing: calculator zeros and completing the square.
9. End behavior and graphing from intercepts and multiplicity.

Each lesson has a narrated video (2–3 minutes), a step-by-step animation, a
short reading, a quick check, and a Khan Academy video as another
explanation. The unit page has a "Polynomials in a day" plan: four short
sessions of videos and homework, with breaks between.

Homework help covers HW #3 to HW #9 plus the class-note examples, revealed
one step at a time. Division layouts, synthetic division tables, graphs,
polynomials built from zeros, and the HW #9 graph analyses (end behavior,
intercepts, multiplicity, test points) are **computed** by `src/poly.js` with
exact fractions rather than typed by hand. HW #9 has no answer key, so its
answers are also confirmed independently with sympy.

## Checking the answers

```powershell
node scripts/verify.mjs          # engine output vs. the Unit 4 answer keys
python scripts/verify_sympy.py   # hand-written solutions vs. sympy
```

`verify.mjs` checks every division, evaluation, factor test, zero list,
polynomial-from-zeros, and graph (zeros and extrema to the nearest tenth)
against the worksheet answer keys. It also exports the hand-written
solutions (factoring, roots, function operations) to `scripts/checks.json`,
which `verify_sympy.py` confirms with sympy (needs `pip install sympy`).
