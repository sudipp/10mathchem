# Self Learning: beginner chemistry

A React 19 learning site with five original written lessons, interactive SVG
animations, curated video players, and feedback-based practice questions.

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

## Extra pages

- `#/periodic-table`: all 118 elements with search, category and group
  highlighting, valence electrons, shells (Z ≤ 20), and Lewis symbols.
- `#/worksheets`: step-by-step help for the VSEPR Worksheet (7 species)
  and the Covalent Nomenclature WS (Parts A and B, 40 items). VSEPR steps
  are revealed one at a time; naming answers can be typed and checked.
  Pair counts follow the class notes: pairs on the central atom only.
  The Type I Ionic WS tab (`#/worksheets/ionic`) has the 30-cell
  cation × anion grid plus the class-notes practice lists. Answers are
  computed in `src/ionic.js`; run `node scripts/verify_ionic.mjs` to check
  them against independently written expected answers.

Animations have previous, next, play, pause, and restart controls. Electron
motion can be disabled and defaults off for reduced-motion preferences.
Lesson checks last for the current page visit, not across reloads.
The lesson selector supports arrow keys, Home, and End.

## Videos and outside resources

Videos come only from Khan Academy and Tyler DeWitt. The Lewis dot and CO2
lessons link to the [Khan Academy lesson](https://www.khanacademy.org/science/hs-chemistry/x2613d8165d88df5e:chemical-bonding/x2613d8165d88df5e:covalent-bonds/v/lewis-diagrams-for-molecules),
which opens on khanacademy.org. The other lessons embed Tyler DeWitt videos
from YouTube. This project does not download or reproduce their videos.

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
