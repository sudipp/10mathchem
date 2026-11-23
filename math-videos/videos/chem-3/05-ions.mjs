// Chapter 3 · Lesson 5 video. Based on the Ch 3 notes (P³⁻, Al³⁺) and the Orbital & Electron Configuration WS (O²⁻)
// plus the Unit 3 review ion shorthand convention (K⁺, B³⁺).
import { configTex, shortTex } from '../chem.mjs'

export default {
  id: '05-ions',
  tag: 'CHAPTER 3 · LESSON 5 · ION CONFIGURATIONS',
  chapters: ['Count', 'Gain', 'Lose', 'Noble gases', 'Exam tip', 'Your turn', 'Recap'],
  layouts: {
    P3: { type: 'orbitals', z: 15, charge: -3, only: ['3s', '3p'] },
    Al: { type: 'orbitals', rows: [{ sub: '1s', boxes: ['↑↓'] }, { sub: '2s', boxes: ['↑↓'] }, { sub: '2p', boxes: ['↑↓', '↑↓', '↑↓'] }, { sub: '3s', boxes: ['↑↓'], bad: [0] }, { sub: '3p', boxes: ['↑', '', ''], bad: [0] }] },
    O2: { type: 'orbitals', z: 8, charge: -2 },
  },
  scenes: [
    {
      ch: 0, say: 'An ion is an atom that gained or lost electrons. The trick: fix the electron count first, then write the configuration like normal.',
      view: { kind: 'title', kicker: 'CHAPTER 3 · LESSON 5', title: 'Ion', em: 'configurations', sub: 'Count first. Then configure.' },
    },
    {
      ch: 0, say: 'The charge tells you what happened. [[1]]A positive charge means electrons were lost, so subtract. [[2]]A negative charge means electrons were gained, so add.',
      view: { kind: 'cards', cards: [
        { head: '+ charge', text: 'lost electrons → SUBTRACT', at: 1 },
        { head: '− charge', text: 'gained electrons → ADD', at: 2, dark: true },
      ] },
    },
    {
      ch: 1, say: 'Phosphorus three minus. [[1]]Phosphorus has fifteen electrons. Its outer level looks like this. [[2]]Three minus means it gained three: fifteen plus three is eighteen. [[3]]The three new electrons pair up in three p. [[4]]Neon, three s two, three p six.',
      view: { kind: 'orbitals', layout: 'P3', reveal: [[5, 1], [8, 3]], title: 'P³⁻', side: [{ text: 'P: 15 e⁻', at: 1 }, { text: '15 + 3 = 18 e⁻', at: 2, strong: true }], config: { tex: shortTex('P', -3), at: 4 } },
    },
    {
      ch: 2, say: 'Aluminum three plus. [[1]]Aluminum has thirteen electrons. [[2]]Three plus means it lost three, its outer three, from level three. [[3]]Thirteen minus three is ten: one s two, two s two, two p six.',
      view: { kind: 'orbitals', layout: 'Al', title: 'Al³⁺', hl: [['3s', 2], ['3p', 2]], side: [{ text: 'Al: 13 e⁻', at: 1 }, { text: 'Lose the 3 outer electrons', at: 2 }, { text: `13 − 3 = 10: $${configTex('Al', 3)}$`, at: 3, strong: true }] },
    },
    {
      ch: 3, say: 'Notice something? [[1]]P three minus has eighteen electrons, the same as argon. [[2]]Al three plus has ten, the same as neon. [[3]]Main-group ions usually end up looking like a noble gas. That’s why those charges are so common.',
      view: { kind: 'cards', title: 'Ions copy noble gases', cards: [
        { head: 'P³⁻', text: '18 e⁻ → same as Ar', at: 1 },
        { head: 'Al³⁺', text: '10 e⁻ → same as Ne', at: 2 },
        { head: 'Stable!', text: 'a full outer level, like a noble gas', at: 3, dark: true },
      ] },
    },
    {
      ch: 4, say: 'Exam tip for shorthand. [[1]]Your class brackets the noble gas before the ion’s electron count. [[2]]Potassium plus has eighteen electrons, so it’s neon, three s two, three p six. [[3]]Boron three plus has only two electrons left, so just write one s two.',
      view: { kind: 'lines', title: 'Shorthand for ions (class method)', lines: [
        { text: 'Bracket the noble gas <b>before</b> the ion’s electron count', at: 1, box: true },
        { tex: `\\text{K}^{+}\\ (18\\ e^-):\\ ${shortTex('K', 1)}`, at: 2 },
        { tex: `\\text{B}^{3+}\\ (2\\ e^-):\\ ${shortTex('B', 3)}`, at: 3 },
      ] },
    },
    {
      ch: 5, say: 'Your turn! Write the electron configuration for the oxide ion, O two minus.',
      countdown: 8,
      view: { kind: 'try', text: 'O²⁻: how many electrons? configuration?', hint: ['O has 8', '− means add'] },
    },
    {
      ch: 5, say: '[[1]]Oxygen has eight. Two minus means add two: ten electrons. [[2]]One s two, two s two, two p six. The same as neon.',
      view: { kind: 'orbitals', layout: 'O2', reveal: [[10, 1]], gap: 0.08, title: 'O²⁻', config: { tex: configTex('O', -2), at: 2 } },
    },
    {
      ch: 6, say: 'Recap. [[1]]Count electrons first: subtract for plus, add for minus. [[2]]Then write the configuration exactly like an atom. [[3]]Main-group ions usually match a noble gas.',
      view: { kind: 'recap', items: [
        { text: 'Positive: subtract electrons. Negative: add.', at: 1 },
        { text: 'Then configure like a normal atom.', at: 2 },
        { text: 'Main-group ions match a noble gas.', at: 3 },
      ] },
    },
  ],
}
