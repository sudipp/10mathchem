// Chapter 3 exam review video: rapid-fire questions modeled on the Unit 3 Exam Review
// (#19 Pauli, #27 Ti, #29–30 Cr, #32 Bi, #35 Te²⁻, #43 radius ranking, #47 electronegativity, #52 I⁻).
import { COLORS, Z, configTex, shortTex } from '../chem.mjs'

const q = (n, say, text, hint, countdown = 7) => ({ ch: [0, 1, 2, 2, 3, 4, 5, 5, 5][n], say: `Question ${n}. ${say} Pause if you need more time.`, countdown, view: { kind: 'try', label: `Question <em>${n}.</em>`, text, hint } })

export default {
  id: '08-exam-review',
  tag: 'CHAPTER 3 · EXAM REVIEW',
  chapters: ['Start', 'Rules', 'Configs', 'Exceptions', 'Ions', 'Trends', 'Checklist'],
  layouts: {
    pt: { type: 'ptable' },
    pauli: { type: 'orbitals', rows: [{ sub: '1s', boxes: ['↑↓'] }, { sub: '2s', boxes: ['↑↓'] }, { sub: '2p', boxes: ['↑↓', '↑↓', '↑↓'] }, { sub: '3s', boxes: ['↑↑'], bad: [0] }] },
    Ti: { type: 'orbitals', z: 22, only: ['4s', '3d'] },
    Cr: { type: 'orbitals', z: 24, only: ['4s', '3d'] },
  },
  scenes: [
    {
      ch: 0, say: 'Chapter three exam review. Eight quick questions straight from your review sheet. Pause, answer on paper, then check.',
      view: { kind: 'title', kicker: 'CHAPTER 3 · EXAM REVIEW', title: 'Ready for', em: 'the test?', sub: '8 questions · pause, try, check' },
    },
    { ...q(1, 'Which rule does this diagram break?', 'Which rule is broken? 1s² 2s² 2p⁶ 3s ↑↑', ['Aufbau', 'Pauli', 'Hund']), view: { kind: 'orbitals', layout: 'pauli', title: 'Which rule is broken?', hl: [['3s', 0]] } },
    {
      ch: 1, say: '[[1]]Pauli. Two electrons in one orbital must have opposite spins, and these both point up.',
      view: { kind: 'orbitals', layout: 'pauli', hl: [['3s', 0]], notes: [{ text: 'Pauli exclusion principle: ↑↓, never ↑↑', at: 1, strong: true }] },
    },
    q(2, 'Write the shorthand configuration for titanium, and draw its four s and three d boxes.', 'Titanium (Ti): shorthand + 4s and 3d boxes', ['Up one row → [Ar]', 'Hund in 3d']),
    {
      ch: 2, say: '[[1]]Argon, four s two, three d two. [[2]]The two d electrons go in separate boxes, both up: that’s Hund’s rule.',
      view: { kind: 'orbitals', layout: 'Ti', config: { tex: shortTex('Ti'), at: 1 }, hl: [['3d', 2]] },
    },
    q(3, 'Write the shorthand for bismuth. Careful, this row has an f block.', 'Bismuth (Bi): shorthand configuration', ['Up one row → [Xe]', '6s, 4f, 5d, 6p']),
    {
      ch: 2, say: '[[1]]Up one row is xenon. [[2]]Then six s two, four f fourteen, five d ten, and bismuth is the third box in six p: six p three.',
      view: { kind: 'ptable', layout: 'pt', groups: [{ z: Z('Xe'), color: '#6E5BA8', at: 1 }, { z: [55, 56], color: COLORS.s, at: 2 }, { z: Array.from({ length: 14 }, (_, i) => 57 + i), color: COLORS.f, at: 2 }, { z: Array.from({ length: 10 }, (_, i) => 71 + i), color: COLORS.d, at: 2 }, { z: [81, 82, 83], color: COLORS.p, at: 2 }],
        rings: [{ z: 83, at: 2 }], notes: [{ text: `$${shortTex('Bi')}$`, at: 2, strong: true }] },
    },
    q(4, 'Write the configuration for chromium. Watch out!', 'Chromium (Cr): shorthand configuration', ['d⁴ or d⁹?']),
    {
      ch: 3, say: '[[1]]Chromium would end in d four, so one four s electron moves up. [[2]]Argon, four s one, three d five. Half-full d.',
      view: { kind: 'orbitals', layout: 'Cr', reveal: [[6, 1]], gap: 0.1, config: { tex: shortTex('Cr'), at: 2 } },
    },
    q(5, 'Write the shorthand for telluride, Te two minus.', 'Te²⁻: shorthand configuration', ['Te has 52', '− means add']),
    {
      ch: 4, say: '[[1]]Tellurium has fifty-two electrons, plus two is fifty-four. [[2]]With your class method, bracket the noble gas before that: krypton, five s two, four d ten, five p six.',
      view: { kind: 'lines', lines: [{ tex: '52 + 2 = 54\\ e^-', at: 1 }, { tex: shortTex('Te', -2), at: 2, glow: true }] },
    },
    q(6, 'Rank phosphorus, iron, titanium and radium from smallest to largest atomic radius.', 'Rank by atomic radius: P, Fe, Ti, Ra', ['Lower row → bigger', 'Same row → left is bigger']),
    {
      ch: 5, say: '[[1]]Phosphorus is in row three, the smallest. [[2]]Iron and titanium are in row four: titanium is further left, so bigger. [[3]]Radium is in row seven, the largest.',
      view: { kind: 'ptable', layout: 'pt', skipF: true, arrows: [{ dir: 'down', at: 1 }, { dir: 'left', at: 1, label: 'radius gets bigger' }], groups: [{ z: Z('P'), color: '#9CC48A', at: 1, dark: false }, { z: Z('Fe'), color: '#E9C46A', at: 2, dark: false }, { z: Z('Ti'), color: '#E3A587', at: 2, dark: false }, { z: Z('Ra'), color: COLORS.s, at: 3 }],
        side: [{ text: 'P < Fe < Ti < Ra', at: 3, strong: true }] },
    },
    q(7, 'Rank strontium, magnesium, carbon and fluorine from lowest to highest electronegativity.', 'Rank by electronegativity: Sr, Mg, C, F', ['Up and right = bigger']),
    {
      ch: 5, say: '[[1]]Electronegativity grows up and to the right, so strontium, magnesium, carbon, fluorine. Fluorine is the highest of all.',
      view: { kind: 'ptable', layout: 'pt', skipF: true, arrows: [{ dir: 'up', at: 1 }, { dir: 'right', at: 1, label: 'electronegativity gets bigger' }], groups: [{ z: Z('Sr', 'Mg', 'C', 'F'), color: COLORS.d, at: 1 }], side: [{ text: 'Sr < Mg < C < F', at: 1, strong: true }] },
    },
    q(8, 'Which is larger, an iodine atom or an iodide ion, I minus?', 'Larger: I or I⁻?', ['Gained electrons?']),
    {
      ch: 5, say: '[[1]]I minus gained an electron. Anions are larger than their atoms, so iodide is larger.',
      view: { kind: 'circles', items: [{ label: 'I', r: 60, sub: 'atom', at: 0 }, { label: 'I⁻', r: 92, sub: 'anion: bigger', color: '#CFE0A6', at: 1 }] },
    },
    {
      ch: 6, say: 'Your checklist before the test. [[1]]Aufbau, Pauli, Hund. [[2]]Read the table for configurations, with four s before three d. [[3]]Shorthand: bracket the noble gas. [[4]]Chromium and copper exceptions. [[5]]Ions: subtract for plus, add for minus. [[6]]Radius grows down and left; the energy trends grow up and right. You’ve got this!',
      view: { kind: 'recap', items: [
        { text: 'Aufbau · Pauli · Hund', at: 1 },
        { text: `Configurations: read the table; 4s before 3d (Fe: $${configTex('Fe')}$)`, at: 2 },
        { text: 'Shorthand: [noble gas] + what is left', at: 3 },
        { text: 'Exceptions: Cr 4s¹ 3d⁵ · Cu 4s¹ 3d¹⁰', at: 4 },
        { text: 'Ions: + subtract, − add', at: 5 },
        { text: 'Radius ← ↓ · IE, EN, EA → ↑', at: 6 },
      ] },
    },
  ],
}
