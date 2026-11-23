// Chapter 2 · Lesson 7 video. Based on the Ch 2 notes (particles, balancing, decay vs capture) and the
// Nuclear Equations WS (#1 C-14 → N-14; series #2 Th-231 beta → Pa-231).
import { R, nuc } from '../chem.mjs'

const alpha = nuc(4, 2, 'He'), beta = R`\ce{^{0}_{-1}e}`, positron = R`\ce{^{0}_{+1}e}`, gamma = R`\ce{^{0}_{0}\gamma}`
const O = '#CC5833'
const hi = t => `{\\color{${O}}${t}}`

export default {
  id: '07-nuclear',
  tag: 'CHAPTER 2 · LESSON 7 · NUCLEAR EQUATIONS',
  chapters: ['Particles', 'Alpha', 'Beta', 'Positron', 'Capture', 'Your turn', 'Recap'],
  scenes: [
    {
      ch: 0, say: 'In a nuclear reaction the nucleus itself changes, and one element can turn into another. The good news: balancing them is just adding.',
      view: { kind: 'title', kicker: 'CHAPTER 2 · LESSON 7', title: 'Nuclear', em: 'equations', sub: 'Balance the top. Balance the bottom.' },
    },
    {
      ch: 0, say: 'Meet the particles. [[1]]Alpha: a helium nucleus, mass four, charge plus two. [[2]]Beta: a fast electron, mass zero, charge minus one. [[3]]Positron: like an electron but positive, plus one. [[4]]Gamma: pure energy, zero and zero.',
      view: { kind: 'table', title: 'The particles', rows: [
        { left: alpha, tex: true, right: '<b>alpha</b> · mass 4 · charge +2 · stopped by paper', at: 1 },
        { left: beta, tex: true, right: '<b>beta</b> (electron) · mass 0 · charge −1', at: 2 },
        { left: positron, tex: true, right: '<b>positron</b> · mass 0 · charge +1', at: 3 },
        { left: gamma, tex: true, right: '<b>gamma</b> · pure energy · most penetrating', at: 4 },
      ] },
    },
    {
      ch: 1, say: 'Alpha decay of uranium two thirty-eight. The alpha particle goes on the right. [[1]]Top numbers: two thirty-eight equals four plus what? Two thirty-four. [[2]]Bottom numbers: ninety-two equals two plus what? Ninety. [[3]]Atomic number ninety is thorium.',
      view: { kind: 'lines', lines: [
        { tex: `${nuc(238, 92, 'U')} \\rightarrow ${alpha} + \\,?` },
        { tex: `\\text{top: } 238 = 4 + ${hi('234')}`, at: 1 },
        { tex: `\\text{bottom: } 92 = 2 + ${hi('90')}`, at: 2 },
        { tex: `${nuc(238, 92, 'U')} \\rightarrow ${alpha} + ${nuc(234, 90, 'Th')}`, at: 3, glow: true },
      ], },
    },
    {
      ch: 2, say: 'Beta decay of cesium one thirty-seven. [[1]]Top: one thirty-seven equals zero plus one thirty-seven. [[2]]Bottom: fifty-five equals negative one plus fifty-six. [[3]]Fifty-six is barium. In beta decay the mass stays the same and the atomic number goes up by one.',
      view: { kind: 'lines', lines: [
        { tex: `${nuc(137, 55, 'Cs')} \\rightarrow ${beta} + \\,?` },
        { tex: `\\text{top: } 137 = 0 + ${hi('137')}`, at: 1 },
        { tex: `\\text{bottom: } 55 = -1 + ${hi('56')}`, at: 2 },
        { tex: `${nuc(137, 55, 'Cs')} \\rightarrow ${beta} + ${nuc(137, 56, 'Ba')}`, at: 3, glow: true },
      ] },
    },
    {
      ch: 3, say: 'Positron decay of phosphorus thirty. [[1]]The mass stays thirty. [[2]]Bottom: fifteen equals one plus fourteen. [[3]]Fourteen is silicon. Positron decay lowers the atomic number by one.',
      view: { kind: 'lines', lines: [
        { tex: `${nuc(30, 15, 'P')} \\rightarrow ${positron} + \\,?` },
        { tex: `\\text{top: } 30 = 0 + ${hi('30')}`, at: 1 },
        { tex: `\\text{bottom: } 15 = 1 + ${hi('14')}`, at: 2 },
        { tex: `${nuc(30, 15, 'P')} \\rightarrow ${positron} + ${nuc(30, 14, 'Si')}`, at: 3, glow: true },
      ] },
    },
    {
      ch: 4, say: 'Capture is different: the particle is absorbed, so it goes on the LEFT. [[1]]Iodine one twenty-five captures an electron. [[2]]Top: one twenty-five plus zero. Bottom: fifty-three plus negative one is fifty-two. [[3]]That’s tellurium.',
      view: { kind: 'lines', lines: [
        { text: 'Decay / emission → particle on the RIGHT · Capture → particle on the LEFT', box: true },
        { tex: `${nuc(125, 53, 'I')} + ${beta} \\rightarrow \\,?`, at: 1 },
        { tex: `125 + 0 = ${hi('125')}\\qquad 53 + (-1) = ${hi('52')}`, at: 2 },
        { tex: `${nuc(125, 53, 'I')} + ${beta} \\rightarrow ${nuc(125, 52, 'Te')}`, at: 3, glow: true },
      ] },
    },
    {
      ch: 4, say: 'Exam tip: a missing particle? [[1]]Find its top and bottom numbers the same way. [[2]]Carbon fourteen goes to a beta particle plus what? Top: fourteen. Bottom: six plus one is seven. [[3]]Nitrogen fourteen.',
      view: { kind: 'lines', title: 'Exam tip: solve for the blank', lines: [
        { tex: `${nuc(14, 6, 'C')} \\rightarrow ${beta} + \\,?`, at: 1 },
        { tex: `14 = 0 + ${hi('14')}\\qquad 6 = -1 + ${hi('7')}`, at: 2 },
        { tex: `? = ${nuc(14, 7, 'N')}`, at: 3, glow: true },
      ] },
    },
    {
      ch: 5, say: 'Your turn! Thorium two thirty-one undergoes beta decay. What forms?',
      countdown: 10,
      view: { kind: 'try', tex: `${nuc(231, 90, 'Th')} \\rightarrow ${beta} + \\,?`, hint: ['top: mass', 'bottom: atomic number'] },
    },
    {
      ch: 5, say: '[[1]]Top stays two thirty-one. [[2]]Bottom: ninety equals negative one plus ninety-one. [[3]]Ninety-one is protactinium.',
      view: { kind: 'lines', lines: [
        { tex: `231 = 0 + ${hi('231')}`, at: 1 },
        { tex: `90 = -1 + ${hi('91')}`, at: 2 },
        { tex: `${nuc(231, 90, 'Th')} \\rightarrow ${beta} + ${nuc(231, 91, 'Pa')}`, at: 3, glow: true },
      ] },
    },
    {
      ch: 6, say: 'Recap. [[1]]Top numbers must add up the same on both sides. So must the bottom numbers. [[2]]Alpha: mass minus four, atomic number minus two. Beta: atomic number plus one. Positron and capture: atomic number minus one. [[3]]Decay puts the particle on the right; capture puts it on the left.',
      view: { kind: 'recap', items: [
        { text: 'Balance the top (mass) and bottom (atomic number) separately.', at: 1 },
        { text: 'α: −4, −2 · β: Z + 1 · positron, capture: Z − 1', at: 2 },
        { text: 'Decay → right side · Capture → left side.', at: 3 },
      ] },
    },
  ],
}
