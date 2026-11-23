# Self Learning: math

A React 19 learning site for Accelerated Math II/III, organized by unit.
Each unit has step-by-step animations, quick checks, videos, and homework
help. Available now: **Unit 3, Conic Sections**, **Unit 4, Polynomial
Functions** (with narrated video lessons), and **Unit 5, Radical
Expressions** (with the Fall Final Exam Review).

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
| `/math/#/unit-3` | Unit 3 home (`/lessons`, `/day`, `/resources` jump to a section) |
| `/math/#/unit-3/homework/hw1` | Unit 3 homework help |
| `/math/#/unit-4` | Unit 4 home |
| `/math/#/unit-4/homework/hw3` | Unit 4 homework help |
| `/math/#/unit-5/homework/rev1` | Unit 5 Fall Final Exam Review #1 |

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
(`Visuals.jsx`, `ConicGraph.jsx`), the polynomial engine (`poly.js`), and the
conics engine (`conics.js`).

### Adding a unit

1. Copy `src/units/unit-4/` to `src/units/unit-<n>/` and replace its lessons,
   homework, day plan, and bookshelf. Set `number`, `slug: 'unit-<n>'`, and
   `title`. Start `videos.json` as `{}` and `videoIds` as `[]` until videos
   exist (Unit 3 does this: each lesson shows its Khan Academy video instead).
2. Import it in `src/units/index.js` and add it to `UNITS`.
3. Optional videos: write scripts in `../math-videos/videos/unit-<n>/`, render
   them, then `node ../math-videos/publish.mjs unit-<n>`.
4. `npm run build`.

## Unit 3: Conic Sections

Built from the class notes (Days 1–7) and HW #1 to HW #8 (HW #8 is the unit
review). Eight lessons, each with a step-by-step animation drawn by
`ConicGraph.jsx`, a short reading, a quick check, and a Khan Academy video:

1. Circles: standard form, center and radius, completing the square.
2. Parabolas: vertex form, $p = \tfrac{1}{4a}$, focus, directrix, axis.
3. Writing equations of circles and parabolas from clues.
4. Ellipses: vertices, co-vertices, and foci ($c^2 = a^2 - b^2$).
5. Writing equations of ellipses.
6. Hyperbolas: transverse axis, the box, asymptotes, foci ($c^2 = a^2 + b^2$).
7. Writing equations of hyperbolas.
8. Classifying conics from $Ax^2 + Cy^2 + Dx + Ey + F = 0$.

Homework help covers HW #1–#8 plus the class-note examples. Graphing problems
give only the equation's coefficients: `src/conics.js` completes the square
with exact fractions and simplified square roots, reads off the center,
vertices, co-vertices, foci, directrix, and asymptotes, and draws the graph.
Writing problems have worked steps and an engine-drawn answer. `verify.mjs`
checks every answer-key value, the definition of each conic on sample points
(focus–directrix distance, constant sum or difference to the foci), and that
general and standard forms describe the same curve; sympy confirms each
equation matches the answer key. Answer-key notes: HW #8 Ellipses #2 writes
$\sqrt{63}$ (the site also shows the simplified $3\sqrt7$), and HW #8
Ellipses #10–11 ask for the foci, which the key leaves out; the site lists them.

## Unit 4: Polynomial Functions

Built from the class notes (Days 1–5, 7, 9–12, 14, 15) and HW #1 to HW #17.

1. Polynomial basics: standard form, degree, and names.
2. Zeros and linear factors: multiplicity and writing polynomials from zeros.
3. Polynomial long division and the Remainder Theorem.
4. Synthetic division and evaluating f(k).
5. Factoring: sum/difference of cubes, quadratic form, grouping.
6. Solving polynomial equations, including complex roots.
7. Function operations and composition.
8. Solving by graphing: calculator zeros and completing the square.
9. End behavior and graphing from intercepts and multiplicity.
10. The Rational Root Theorem: candidates p/q, testing, and dividing them out.
11. Irrational and complex roots: conjugate pairs and building polynomials.
12. The Fundamental Theorem of Algebra: counting zeros and finding them all.
13. Polynomial inequalities: critical points, sign charts, interval notation.
14. Inverse functions: switch and solve, composition checks, reflections.

Each lesson has a narrated video (2–3 minutes), a step-by-step animation, a
short reading, a quick check, and a Khan Academy video as another
explanation. The unit page has a "Polynomials in a day" plan: six short
sessions of videos and homework, with breaks between.

Homework help covers HW #1 to HW #17 plus the class-note examples, revealed
one step at a time. Division layouts, synthetic division tables, graphs,
polynomials built from zeros, and the HW #9 graph analyses (end behavior,
intercepts, multiplicity, test points) are **computed** by `src/poly.js` with
exact fractions rather than typed by hand. HW #9 has no answer key, so its
answers are also confirmed independently with sympy. HW #10 and #11 (possible
rational zeros, testing and dividing, the final quadratic with exact surds,
conjugate partners, and polynomials built from roots) come from
`src/roots.js`; their roots are also cross-checked with sympy. HW #1 and #2 (naming
polynomials, products, and function operations and composition) come from
`src/funcs.js`, and each result is re-computed independently with sympy.
HW #12–#14 (zero counts, all zeros including given complex zeros and
`w = x^2` substitution, parabolas from focus and directrix, and inequality
sign charts) come from `src/roots.js` and `src/extra.js`; sympy re-solves every
zero set and every inequality. HW #15 inverses are checked numerically both
ways (`f(g(x)) = g(f(x)) = x`). HW #11 assigns
the odd problems, so the page shows those first and hides the evens until
asked.

HW #16 & 17 is the unit test review (50 problems, due Nov 17). Each section
links to the lesson video that teaches it. Engine types cover classifying,
end behavior, evaluation, division, factor tests, zero counts, and rational
roots; "factor, one zero given" and RRT factoring problems also show the
factored form the key asks for, and sympy confirms both the factored form
and every root. The hand-written factoring and quadratic-form problems are
checked the same way.

Two more test-review activities follow it. **Circuit Training: Factoring
Completely** has the 16 circuit cards in circuit order, starting with the first
card on the sheet: each card is factored, and its last step names the next card
(the one whose printed answer is one of your factors). Sympy confirms every
factorization and that each "next" answer really is a factor. **Pixel Review**
is the 24-question multiple-choice review (it has no answer key): each question
shows the choices, works the problem, and highlights the correct letter.
`verify.mjs` checks that every marked letter matches the worked answer; the two
graph-sketch questions describe the pictured choices in words and draw the
actual graph.

## Unit 5: Radical Expressions

The class packet has HW #1 (with its answer key) and the Fall Final Exam
Review, but no class notes, so the three lessons are built from HW #1:

1. Simplifying radicals: pull out perfect squares and even powers.
2. Multiplying radicals: outside × outside, inside × inside, distribute.
3. Dividing radicals and rationalizing the denominator.

Each lesson has a step-by-step animation, a short reading, a quick check, and
a Khan Academy video. Homework help covers HW #1 (radicals, plus parabola
features and zeros as spiral review) and both Fall Final Exam Review packets.
**Review #1** (Sections 1–4: linear equations and functions, distance and
midpoint, every conic, polynomials, factoring, quadratics, complex numbers)
and **Review #2** (projectile, quadratics, complex numbers, factoring,
polynomial zeros, and multiple choice #32–34) keep the worksheet numbering
(1a, 1b, …). The review has no answer key: conic, division, zero, and
conjugate problems are computed by the Unit 3 and Unit 4 engines, and every
hand-written answer is confirmed with sympy. Radical checks assume positive
variables, as the worksheet does.

## Checking the answers

```powershell
node scripts/verify.mjs          # engine output vs. the Unit 3, 4, and 5 answer keys
python scripts/verify_sympy.py   # hand-written solutions vs. sympy
```

`verify.mjs` checks every division, evaluation, factor test, zero list,
polynomial-from-zeros, and graph (zeros and extrema to the nearest tenth)
against the worksheet answer keys. It also exports the hand-written
solutions (factoring, roots, function operations) to `scripts/checks.json`,
which `verify_sympy.py` confirms with sympy (needs `pip install sympy`).
