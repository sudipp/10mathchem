# Self Learning: beginner chemistry

A React 19 learning site with thirty original written lessons across four
chapters, interactive SVG animations, curated video players, and
feedback-based practice questions.

## Run locally

Requires a current Node.js version compatible with Vite 8.

```powershell
npm install
npm run dev -- --host 127.0.0.1
```

Open the local address printed by Vite. For a production build, run
`npm run build`. Run `npm run lint` for static checks.

## Host it on the home network

Run `..\site-host\Start Self Learning Sites.bat` (or this folder's
`Start Chemistry Site.bat`, which calls it). It builds the chemistry and math
sites and serves both on port 8080 for every device on the network:

- `http://<this computer's IP>:8080/`: landing page
- `http://<IP>:8080/chemistry/#lessons`: chemistry
- `http://<IP>:8080/math/#lessons`: math

The window prints the exact addresses. Windows Firewall must allow inbound
TCP 8080 for other devices to connect.

## Lessons

Chapters and worksheets (with optional `YYYY-MM-DD` due dates) are listed in
`src/chapters.js`. Chapter 4 lessons live in `App.jsx`; Chapters 1–3 live in
`src/lessons123.js` (appended after Chapter 4, so worksheets link to them by
`lessonId`). To add a chapter, add it to `CHAPTERS`, tag its lessons with
`chapter: <n>`, and list its worksheets in `WORKSHEETS`.
The Type I Ionic WS is due Nov 3, 2026, Type II Nov 10, and Type III
Nov 11; due dates show as "Due today",
"Due …", or "Was due …".

### Chapter 1: Measurement & Reference Sheets

Built from the class reference sheets (there is no Chapter 1 worksheet, so
the Conversion Practice set is self-made and labeled as practice).

1. Metric prefixes: the prefix ladder and moving the decimal.
2. Conversion factors: chaining factors so units cancel.
3. Temperature: °C ↔ K (K = °C + 273).
4. Reading the class periodic table: symbols, atomic number, ion charges.

### Chapter 2: Atomic Theory & Nuclear Chemistry

1. Models of the atom: Dalton to Chadwick timeline.
2. Atomic structure: protons, neutrons, electrons, isotopes, ions.
3. Average atomic mass (with the "beanium" lab).
4. Waves and light: c = λν, the electromagnetic spectrum.
5. Photons: E = hν (class value h = 6.6262 × 10⁻³⁴ J·s).
6. Bohr model: energy levels and hydrogen's bright-line spectrum.
7. Nuclear equations: alpha, beta, positron, gamma, electron capture.
8. Half-life: the class log formulas for m_f, m_i, t½ and time.

### Chapter 3: Electron Configuration & Periodic Trends

1. Blocks and families on the periodic table.
2. Aufbau, Pauli, and Hund (orbital diagrams).
3. Longhand electron configurations (4s written before 3d).
4. Shorthand configurations and the d⁴/d⁹ exceptions (Cr, Cu, Mo, Ag, Au).
5. Ion configurations (cations lose from the highest n first).
6. Atomic and ionic radius.
7. Ionization energy, electronegativity, and electron affinity.

### Chapter 4: Lewis Structures & Nomenclature
1. Valence electrons: carbon, oxygen, and neon shell models.
2. Periodic table: main-group patterns and helium/transition-metal caveats.
3. Lewis symbols: place oxygen's six dots step by step.
4. Covalent bonds: hydrogen shares a pair; single versus multiple bonds.
5. Carbon dioxide: conserve 16 electrons while building O=C=O.
6. VSEPR shapes and polarity: the class VSEPR chart, lone-pair effects,
   the class polarity rule, and resonance.
7. Naming covalent compounds: prefixes, -ide roots, and vowel dropping.
8. Naming ionic compounds (Type I): ion charges, criss-cross, reduce,
   and metal name + nonmetal root + -ide. Includes an ion-charge table.
9. Naming ionic compounds (Type II): transition metals with more than one
   charge, Roman numerals, and working the charge back from a formula.
   Includes a Type II charge table with the old -ous/-ic names.
10. Polyatomic ions (Type III): keep the ion together, use parentheses
    when more than one is needed. Includes the class polyatomic ion table.
11. Naming any compound: the class nomenclature flowchart (1st element H?
    3 or more elements? metal? transition metal?), acids (hydro-…-ic,
    -ate → -ic, -ite → -ous), bases (hydroxides), the diatomic "Lucky 7",
    hydrocarbons (alkanes), and the Ag/Cd/Zn and Pb/Sn exceptions. The
    animation walks seven compounds through the flowchart.

## Extra pages

- `#/periodic-table`: all 118 elements with search, category and group
  highlighting, valence electrons, shells (Z ≤ 20), and Lewis symbols.
- `#/worksheets`: step-by-step help for the VSEPR Worksheet (7 species)
  and the Covalent Nomenclature WS (Parts A and B, 40 items). VSEPR steps
  are revealed one at a time; naming answers can be typed and checked.
  Pair counts follow the class notes: pairs on the central atom only.
  The Type I Ionic WS tab (`#/worksheets/ionic`) has the 30-cell
  cation × anion grid plus the class-notes practice lists. The Type II tab
  (`#/worksheets/type2`) has the 18-cell grid, the review section, and the
  notes practice; the Type III tab (`#/worksheets/type3`) has the
  polyatomic name/formula chart (the sheet has no key, and row 5 is blank).
  Answers are computed in `src/ionic.js`; run
  `node scripts/verify_ionic.mjs` to check all Type I–III answers (90)
  against independently written expected answers. The printed Type II key
  has three typos (Cu₂S shown as Cu₂P, Fe₃P₂ named "iron(II) chloride",
  PbBr₄ shown as PBr₄); the site shows the correct answers and a note.
  The Nomenclature Flowchart tab (`#/worksheets/flowchart`) walks any
  formula through the flowchart one question at a time, then has the
  class-notes examples and 21 mixed practice compounds. Names come from
  `src/nomenclature.js` (which reuses the ion tables in `src/ionic.js`);
  run `node scripts/verify_nomenclature.mjs` to check every name, every
  flowchart path, and formulas that must be rejected.
- Chapter 1–3 worksheet tabs: Conversion Practice; Wave Calculations,
  Nuclear Equations, Half-Life, and the Unit 2 Exam Review; Orbital
  Diagram, Orbital & Electron Configuration, Periodic Trends, and the
  Unit 3 Exam Review. Each problem has a typed or multiple-choice check,
  steps revealed one at a time, and the final answer (with nuclear
  equations and orbital diagrams drawn in). Answers are computed by the
  engines in `src/measure.js`, `src/atomic.js`, and `src/electrons.js`;
  run `node scripts/verify_ch123.mjs` to check them against the class
  answer keys (310 checks). Where a printed key has a mistake (for
  example, Rn-219 positron decay gives At-219, not Fr-219), the site shows
  the correct answer with a note.

Animations have previous, next, play, pause, and restart controls. Electron
motion can be disabled and defaults off for reduced-motion preferences.
Lesson checks last for the current page visit, not across reloads.
The lesson selector supports arrow keys, Home, and End.

## Videos and outside resources

Every Chapter 1–3 lesson has its own narrated, captioned video (2–3 minutes)
hosted with the site in `public/videos/chapter-N/`, plus an exam-review video
on the Unit 2 and Unit 3 Exam Review worksheet tabs. They are made with the
pipeline in `../math-videos` (see its README) and listed in
`src/videos/chapter-N.json`; `src/narrated.js` and `src/NarratedVideo.jsx`
show them.

The other videos come only from Khan Academy and Tyler DeWitt. The Lewis dot and CO2
lessons link to the [Khan Academy lesson](https://www.khanacademy.org/science/hs-chemistry/x2613d8165d88df5e:chemical-bonding/x2613d8165d88df5e:covalent-bonds/v/lewis-diagrams-for-molecules),
which opens on khanacademy.org. The other lessons embed Tyler DeWitt or Khan
Academy videos from YouTube. This project does not download or reproduce
their videos.

Players load only after a click. Network access and permission from the video
host are required; school restrictions or embed policies may block playback.
Direct video links remain available. Fonts use Google Fonts and the hero
photograph uses Unsplash. Written explanations and SVG diagrams work without
those third-party resources once the application itself has loaded.

## Scope of the models

Electron circles are simplified diagrams, not real orbital trajectories.
Valence shortcuts cover neutral main-group atoms, not transition metals.
CO2 electron accounting includes lone pairs, bonding electrons, octets,
and zero formal charges in the final structure.
