// Chapter 2 · Lesson 2 video. Based on the Ch 2 notes and the Unit 2 Exam Review atomic-structure table
// (Mg-26, K-40, P-32 3−, Ag-109 +1, S-33).
import { nuc } from '../chem.mjs'

export default {
  id: '02-atomic-structure',
  tag: 'CHAPTER 2 · LESSON 2 · ATOMIC STRUCTURE',
  chapters: ['Symbol', 'Count', 'Ions', 'Isotopes', 'Your turn', 'Recap'],
  scenes: [
    {
      ch: 0, say: 'One small symbol tells you everything inside an atom: protons, neutrons, and electrons. Let’s decode it.',
      view: { kind: 'title', kicker: 'CHAPTER 2 · LESSON 2', title: 'Protons, neutrons', em: '& electrons', sub: 'Read the nuclear symbol' },
    },
    {
      ch: 0, say: 'Here’s magnesium twenty-six. [[1]]The top number is the mass number: protons plus neutrons. [[2]]The bottom number is the atomic number: the number of protons. It decides the element.',
      view: { kind: 'lines', lines: [
        { tex: `\\Huge ${nuc(26, 12, 'Mg')}` },
        { text: 'Top: <b>mass number</b> = protons + neutrons', at: 1, box: true },
        { text: 'Bottom: <b>atomic number</b> = protons', at: 2, box: true },
      ] },
    },
    {
      ch: 1, say: 'Three quick formulas. [[1]]Protons equal the atomic number. [[2]]Neutrons equal mass number minus atomic number. [[3]]Electrons equal protons in a neutral atom. [[4]]So magnesium twenty-six has twelve protons, fourteen neutrons, and twelve electrons.',
      view: { kind: 'table', title: `Mg-26`, rows: [
        { left: 'protons', right: '= atomic number = <b>12</b>', at: 1 },
        { left: 'neutrons', right: '= mass − atomic = 26 − 12 = <b>14</b>', at: 2 },
        { left: 'electrons', right: '= protons (neutral) = <b>12</b>', at: 3 },
      ], example: { tex: '12\\ p^+,\\ 14\\ n,\\ 12\\ e^-', at: 4 } },
    },
    {
      ch: 2, say: 'Ions have a charge. [[1]]A positive ion lost electrons. [[2]]A negative ion gained electrons. [[3]]Phosphorus thirty-two three minus: fifteen protons, seventeen neutrons, and fifteen plus three, eighteen electrons. [[4]]Silver one oh nine plus: forty-seven protons, sixty-two neutrons, forty-six electrons.',
      view: { kind: 'cards', cards: [
        { head: '+ charge', text: 'lost electrons', at: 1 },
        { head: '− charge', text: 'gained electrons', at: 2 },
        { tex: `${nuc(32, 15, 'P')}^{3-}`, text: '15 p · 17 n · 18 e⁻', at: 3, dark: true },
        { tex: `${nuc(109, 47, 'Ag')}^{+}`, text: '47 p · 62 n · 46 e⁻', at: 4, dark: true },
      ] },
    },
    {
      ch: 3, say: 'Isotopes are atoms of the same element with different numbers of neutrons. [[1]]Carbon twelve has six neutrons. [[2]]Carbon fourteen has eight. Same protons, same element, different mass.',
      view: { kind: 'cards', title: 'Isotopes: same protons, different neutrons', cards: [
        { tex: nuc(12, 6, 'C'), text: '6 p · 6 n', at: 1 },
        { tex: nuc(14, 6, 'C'), text: '6 p · 8 n', at: 2 },
      ] },
    },
    {
      ch: 3, say: 'Exam tip: on the review table, fill every box with the same three steps. [[1]]The symbol comes from the atomic number. [[2]]Neutrons, mass minus atomic. [[3]]Electrons, protons minus the charge. A minus charge adds electrons.',
      view: { kind: 'lines', title: 'Exam tip', lines: [
        { tex: '\\text{atomic number} \\rightarrow \\text{element}', at: 1 },
        { tex: 'n = A - Z', at: 2 },
        { tex: 'e^- = p^+ - \\text{charge}', at: 3, glow: true },
      ] },
    },
    {
      ch: 4, say: 'Your turn! For sulfur thirty-three, find the protons, neutrons and electrons.',
      countdown: 8,
      view: { kind: 'try', tex: nuc(33, 16, 'S'), hint: ['p = Z', 'n = A − Z', 'neutral: e = p'] },
    },
    {
      ch: 4, say: '[[1]]Sixteen protons. [[2]]Thirty-three minus sixteen is seventeen neutrons. [[3]]Neutral, so sixteen electrons.',
      view: { kind: 'table', title: 'S-33', rows: [{ left: 'protons', right: '16', at: 1 }, { left: 'neutrons', right: '33 − 16 = 17', at: 2 }, { left: 'electrons', right: '16', at: 3 }] },
    },
    {
      ch: 5, say: 'Recap. [[1]]Atomic number equals protons and names the element. [[2]]Mass number is protons plus neutrons. [[3]]Electrons equal protons minus the charge. [[4]]Isotopes differ only in neutrons.',
      view: { kind: 'recap', items: [
        { text: 'Atomic number (bottom) = protons = which element.', at: 1 },
        { text: 'Mass number (top) = protons + neutrons.', at: 2 },
        { text: 'Electrons = protons − charge.', at: 3 },
        { text: 'Isotopes: same element, different neutrons.', at: 4 },
      ] },
    },
  ],
}
