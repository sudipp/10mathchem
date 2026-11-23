// Chapter 3 · Lesson 4 video. Based on the Ch 3 notes: shorthand steps (S, Ca), stability, the d⁴/d⁹
// exceptions (Cr, Cu), and the Unit 3 review (Br shorthand).
import { COLORS, Z, range, configTex, shortTex } from '../chem.mjs'

export default {
  id: '04-shorthand',
  tag: 'CHAPTER 3 · LESSON 4 · SHORTHAND & EXCEPTIONS',
  chapters: ['Shorthand', 'Steps', 'Stability', 'Cr & Cu', 'Exam tip', 'Your turn', 'Recap'],
  layouts: {
    pt: { type: 'ptable' },
    half: { type: 'orbitals', rows: [{ sub: 'half-full 3d', boxes: ['↑', '↑', '↑', '↑', '↑'] }] },
    full: { type: 'orbitals', rows: [{ sub: 'full 3d', boxes: ['↑↓', '↑↓', '↑↓', '↑↓', '↑↓'] }] },
    crExp: { type: 'orbitals', rows: [{ sub: '4s', boxes: ['↑↓'] }, { sub: '3d', boxes: ['↑', '↑', '↑', '↑', ''], bad: [4] }] },
    crAct: { type: 'orbitals', z: 24, only: ['4s', '3d'] },
    cuExp: { type: 'orbitals', rows: [{ sub: '4s', boxes: ['↑↓'] }, { sub: '3d', boxes: ['↑↓', '↑↓', '↑↓', '↑↓', '↑'], bad: [4] }] },
    cuAct: { type: 'orbitals', z: 29, only: ['4s', '3d'] },
  },
  scenes: [
    {
      ch: 0, say: 'Long configurations get long. Shorthand lets a noble gas stand in for all the inner electrons.',
      view: { kind: 'title', kicker: 'CHAPTER 3 · LESSON 4', title: 'Shorthand', em: '& exceptions', sub: 'Let a noble gas do the work' },
    },
    {
      ch: 0, say: 'Here is sulfur, written out long. [[1]]The first part, one s two, two s two, two p six, is exactly neon. [[2]]So swap it for neon in brackets: neon, three s two, three p four.',
      view: { kind: 'lines', lines: [
        { tex: `{\\color{#CC5833}\\mathrm{1s}^{2}\\,\\mathrm{2s}^{2}\\,\\mathrm{2p}^{6}}\\,\\mathrm{3s}^{2}\\,\\mathrm{3p}^{4}` },
        { tex: `{\\color{#CC5833}= \\text{Ne's 10 electrons}}`, at: 1 },
        { tex: shortTex('S'), at: 2, glow: true, big: true },
      ] },
    },
    {
      ch: 1, say: 'The steps on the table. [[1]]Find your atom. [[2]]Go up one row and all the way right, to the noble gas. Bracket it. [[3]]Then write only what comes after it, from the start of your row to your atom.',
      view: { kind: 'ptable', layout: 'pt', skipF: true, rings: [{ z: 16, at: 1 }], groups: [{ z: Z('Ne'), color: '#6E5BA8', at: 2 }, { z: range('Na', 'S'), color: COLORS.p, at: 3, text: { 11: '3s', 12: '3s', 13: '3p', 14: '3p', 15: '3p', 16: '3p' } }],
        side: [{ text: '1. Find the atom', at: 1 }, { text: '2. Up one row → noble gas [Ne]', at: 2 }, { text: '3. Write what’s left: 3s² 3p⁴', at: 3, strong: true }] },
    },
    {
      ch: 1, say: 'Calcium: [[1]]up one row is argon. [[2]]After argon come two electrons in four s. Argon, four s two.',
      view: { kind: 'ptable', layout: 'pt', skipF: true, rings: [{ z: 20, at: 0 }], groups: [{ z: Z('Ar'), color: '#6E5BA8', at: 1 }, { z: range('K', 'Ca'), color: COLORS.s, at: 2, text: { 19: '4s', 20: '4s' } }],
        notes: [{ text: `$${shortTex('Ca')}$`, at: 2, strong: true }] },
    },
    {
      ch: 2, say: 'Before the exceptions, one idea: some arrangements are extra stable. [[1]]A half-full d sublevel, one electron in every box. [[2]]And a full d sublevel, every box paired.',
      view: { kind: 'orbitals', layout: 'half', notes: [{ text: 'Extra stable: half-full and full sublevels', at: 0, strong: true }] },
    },
    {
      ch: 2, say: '[[1]]Full is the most stable of all.',
      view: { kind: 'orbitals', layout: 'full', reveal: [[10, 1]], gap: 0.05 },
    },
    {
      ch: 3, say: 'Chromium is expected to end in four s two, three d four. [[1]]But three d four is one electron short of half-full.',
      view: { kind: 'orbitals', layout: 'crExp', title: 'Chromium, expected', config: { tex: '[\\text{Ar}]\\,\\mathrm{4s}^{2}\\,\\mathrm{3d}^{4}', at: 0 }, hl: [['3d', 1]] },
    },
    {
      ch: 3, say: 'So one four s electron moves into three d. [[1]]Now every three d box has one: half-full. Chromium is argon, four s one, three d five.',
      view: { kind: 'orbitals', layout: 'crAct', title: 'Chromium, actual', hl: [['3d', 1]], config: { tex: shortTex('Cr'), at: 1 } },
    },
    {
      ch: 3, say: 'Copper is expected to end in three d nine, one short of full. [[1]]So again one four s electron moves over. [[2]]Copper is argon, four s one, three d ten.',
      view: { kind: 'orbitals', layout: 'cuExp', title: 'Copper, expected → 3d⁹', config: { tex: '[\\text{Ar}]\\,\\mathrm{4s}^{2}\\,\\mathrm{3d}^{9}', at: 0 }, side: [{ text: 'One 4s electron moves into 3d', at: 1, strong: true }, { text: `Actual: $${shortTex('Cu')}$`, at: 2 }] },
    },
    {
      ch: 4, say: 'Exam tip. [[1]]Only configurations that would end in d four or d nine change. [[2]]On your test that means chromium and copper, and the ones below them: molybdenum, silver, and gold.',
      view: { kind: 'cards', title: 'Exam tip: only d⁴ and d⁹', cards: [
        { head: 'd⁴ → s¹ d⁵', text: 'Cr, Mo (half-full)', at: 1 },
        { head: 'd⁹ → s¹ d¹⁰', text: 'Cu, Ag, Au (full)', at: 1 },
        { head: 'Every other element', text: 'follows the normal order', at: 2, dark: true },
      ] },
    },
    {
      ch: 5, say: 'Your turn! Write the shorthand configuration for bromine.',
      countdown: 8,
      view: { kind: 'try', text: 'Bromine: shorthand configuration', hint: ['Up one row → noble gas', 'Then 4s, 3d, 4p'] },
    },
    {
      ch: 5, say: '[[1]]Up one row from bromine is argon. [[2]]After argon: four s two, three d ten, and four p five.',
      view: { kind: 'ptable', layout: 'pt', skipF: true, rings: [{ z: 35, at: 0 }], groups: [{ z: Z('Ar'), color: '#6E5BA8', at: 1 }, { z: range('K', 'Br'), color: COLORS.d, at: 2 }],
        notes: [{ text: `$${shortTex('Br')}$`, at: 2, strong: true }] },
    },
    {
      ch: 6, say: 'Recap. [[1]]Go up one row to the noble gas, bracket it, and write what’s left. [[2]]Half-full and full sublevels are extra stable. [[3]]d four and d nine borrow one s electron: chromium is four s one, three d five; copper is four s one, three d ten.',
      view: { kind: 'recap', items: [
        { text: 'Up one row → [noble gas] + what is left.', at: 1 },
        { text: 'Half-full and full sublevels are extra stable.', at: 2 },
        { text: `Cr $${shortTex('Cr')}$ · Cu $${shortTex('Cu')}$`, at: 3 },
      ] },
    },
  ],
}
