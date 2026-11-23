// Chapter 3 · Lesson 6 video. Based on the Ch 3 notes (radius down a group / across a period, ions) and the
// Unit 3 review (#42 O < Li < K < Cs). Radii in picometers (common textbook values).
import { COLORS, Z } from '../chem.mjs'

const k = 0.42
export default {
  id: '06-radius',
  tag: 'CHAPTER 3 · LESSON 6 · ATOMIC & IONIC RADIUS',
  chapters: ['Down', 'Across', 'The rule', 'Ions', 'Exam tip', 'Your turn', 'Recap'],
  layouts: { pt: { type: 'ptable' } },
  scenes: [
    {
      ch: 0, say: 'How big is an atom? Two things decide it: how many energy levels it has, and how hard its protons pull.',
      view: { kind: 'title', kicker: 'CHAPTER 3 · LESSON 6', title: 'Atomic', em: 'radius', sub: 'Bigger down and to the left' },
    },
    {
      ch: 0, say: 'Go down group one. [[1]]Lithium, [[2]]sodium, [[3]]potassium. [[4]]Each row adds a whole new energy level, so the atom gets bigger going down.',
      view: { kind: 'circles', items: [
        { label: 'Li', r: 152 * k, sub: '2 levels · 152 pm', at: 1 }, { label: 'Na', r: 186 * k, sub: '3 levels · 186 pm', at: 2 }, { label: 'K', r: 227 * k, sub: '4 levels · 227 pm', at: 3 },
      ], notes: [{ text: 'Down a group → more energy levels → BIGGER', at: 4, strong: true }] },
    },
    {
      ch: 1, say: 'Now go across period two, from lithium to fluorine. [[1]]Surprise: they get smaller! [[2]]Each step adds a proton but no new level, so the stronger nucleus pulls the same level in tighter.',
      view: { kind: 'circles', items: [['Li', 152], ['Be', 112], ['B', 85], ['C', 77], ['N', 75], ['O', 73], ['F', 72]].map(([l, r]) => ({ label: l, r: r * 0.36, sub: `${r} pm`, at: 1 })),
        notes: [{ text: 'Across a period → more protons, same level → SMALLER', at: 2, strong: true }] },
    },
    {
      ch: 2, say: 'So on the table, atomic radius grows [[1]]as you go down, [[2]]and as you go left. The biggest atoms are in the bottom left; the smallest are top right.',
      view: { kind: 'ptable', layout: 'pt', skipF: true, arrows: [{ dir: 'down', at: 1 }, { dir: 'left', at: 2, label: 'atomic radius gets bigger ← and ↓' }], groups: [{ z: Z('Fr', 'Cs'), color: COLORS.s, at: 2 }, { z: Z('He', 'F'), color: COLORS.p, at: 2 }] },
    },
    {
      ch: 3, say: 'Ions change size too. [[1]]Sodium loses its outer electron and its whole outer level. [[2]]So the cation is much smaller than the atom.',
      view: { kind: 'circles', items: [{ label: 'Na', r: 186 * k, sub: 'atom · 186 pm', at: 0 }, { label: 'Na⁺', r: 102 * k, sub: 'cation · 102 pm', color: '#EDB59C', at: 1 }],
        notes: [{ text: 'Cation (+): lost electrons → SMALLER', at: 2, strong: true }] },
    },
    {
      ch: 3, say: '[[1]]Chlorine gains an electron. [[2]]More electrons repel each other and spread out, so the anion is bigger than the atom.',
      view: { kind: 'circles', items: [{ label: 'Cl', r: 99 * k, sub: 'atom · 99 pm', at: 0 }, { label: 'Cl⁻', r: 181 * k, sub: 'anion · 181 pm', color: '#CFE0A6', at: 1 }],
        notes: [{ text: 'Anion (−): gained electrons → BIGGER', at: 2, strong: true }] },
    },
    {
      ch: 4, say: 'Exam tip: ranking atoms from different rows. [[1]]The period wins first: lower on the table is bigger. [[2]]In the same period, further left is bigger. [[3]]So oxygen, lithium, potassium, cesium goes smallest to largest.',
      view: { kind: 'ptable', layout: 'pt', skipF: true, groups: [{ z: Z('O'), color: '#9CC48A', at: 3, dark: false }, { z: Z('Li'), color: '#E9C46A', at: 3, dark: false }, { z: Z('K'), color: '#E3A587', at: 3, dark: false }, { z: Z('Cs'), color: COLORS.s, at: 3 }],
        side: [{ text: '1. Lower row → bigger', at: 1 }, { text: '2. Same row → further left is bigger', at: 2 }, { text: 'O < Li < K < Cs', at: 3, strong: true }] },
    },
    {
      ch: 5, say: 'Your turn! Which atom is larger, magnesium or sulfur? And which is larger, calcium or the calcium two plus ion?',
      countdown: 8,
      view: { kind: 'try', text: 'Mg or S? · Ca or Ca²⁺?', hint: ['Same row → left is bigger', 'Cation → smaller'] },
    },
    {
      ch: 5, say: '[[1]]Magnesium and sulfur are both in period three. Magnesium is further left, so magnesium is larger. [[2]]Calcium two plus lost electrons, so the calcium atom is larger.',
      view: { kind: 'cards', cards: [{ head: 'Mg', text: 'same period, further left → larger', at: 1, dark: true }, { head: 'Ca', text: 'Ca²⁺ lost electrons → smaller', at: 2, dark: true }] },
    },
    {
      ch: 6, say: 'Recap. [[1]]Down a group: more levels, bigger. [[2]]Across a period: more protons, smaller. [[3]]Cations are smaller than their atoms; anions are bigger.',
      view: { kind: 'recap', items: [
        { text: 'Down a group → more energy levels → bigger.', at: 1 },
        { text: 'Across a period → more protons pull → smaller.', at: 2 },
        { text: 'Cation smaller than its atom; anion bigger.', at: 3 },
      ] },
    },
  ],
}
