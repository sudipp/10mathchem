// Chapter 2 · Lesson 8 video. Based on the Ch 2 notes: Co-60 halving, the class formulas
// (m_f = m_i(.5)^N, t½ = time·log(.5)/log(m_f/m_i)), the F-21 example (0.0061 g) and the 173.0 g → 11.8 g example (0.976 hr).
import { halfLife } from '../../../chemistry-self-learning/src/atomic.js'

const f21 = halfLife({ mi: 25.0, time: 60.0, t12: 5.0 }, 'mf').value // 0.0061 g
const t12 = halfLife({ mi: 173.0, mf: 11.8, time: 3.78 }, 't12').value // 0.976 hr
if (Math.abs(f21 - 0.0061) > 0.00005 || Math.abs(t12 - 0.976) > 0.0006) throw new Error('half-life example changed')

const pts = [0, 1, 2, 3, 4].map(n => [n, 10 * 0.5 ** n])
export default {
  id: '08-half-life',
  tag: 'CHAPTER 2 · LESSON 8 · HALF-LIFE',
  chapters: ['Halving', 'Formula', 'Example', 'Logs', 'Your turn', 'Recap'],
  layouts: {
    decay: { type: 'plane', window: [-0.5, 5.5, -0.6, 11], tex: 'm_f = m_i(0.5)^N', items: [
      { key: 'curve', kind: 'fn', f: x => 10 * 0.5 ** x, from: 0, to: 5.3 },
      ...pts.map(([n, m]) => ({ key: `n${n}`, kind: 'dots', pts: [[n, m]], style: n ? 'vertex' : 'key', labels: true })),
    ] },
  },
  scenes: [
    {
      ch: 0, say: 'Radioactive atoms decay at a steady pace. The half-life is the time it takes for half of them to decay.',
      view: { kind: 'title', kicker: 'CHAPTER 2 · LESSON 8', title: 'Half-', em: 'life', sub: 'Half is left, every time' },
    },
    {
      ch: 0, say: 'Start with ten grams of cobalt sixty. Its half-life is five point two seven years. [[1]]After one half-life, five grams are left. [[2]]After two, two point five. [[3]]After three, one point two five. [[4]]After four, point six two five. [[5]]It never quite reaches zero.',
      view: { kind: 'plane', layout: 'decay', title: '\\text{Co-60: } t_{1/2} = 5.27\\text{ yr}', reveal: [['n0', 0], ['curve', 1], ['n1', 1], ['n2', 2], ['n3', 3], ['n4', 4]],
        side: [{ text: 'x: number of half-lives (N)', at: 0 }, { text: 'y: grams left', at: 0 }, { text: 'Each half-life: ÷ 2', at: 5, strong: true }] },
    },
    {
      ch: 1, say: 'Your class formula: [[1]]m final equals m initial times point five to the N. [[2]]N is the number of half-lives: the time divided by the half-life. N doesn’t have to be a whole number.',
      view: { kind: 'lines', lines: [
        { tex: 'm_f = m_i\\,(0.5)^N', at: 1, big: true, box: true },
        { tex: 'N = \\dfrac{\\text{time}}{t_{1/2}}', at: 2 },
      ] },
    },
    {
      ch: 2, say: 'Fluorine twenty-one has a half-life of five point oh seconds. How much of twenty-five grams is left after sixty seconds? [[1]]N equals sixty over five: twelve half-lives. [[2]]m final equals twenty-five times point five to the twelfth. [[3]]That’s point oh oh six one grams.',
      view: { kind: 'lines', lines: [
        { tex: 'N = \\dfrac{60.0\\ \\text{s}}{5.0\\ \\text{s}} = 12', at: 1 },
        { tex: 'm_f = 25.0\\,(0.5)^{12}', at: 2 },
        { tex: 'm_f = 0.0061\\ \\text{g}', at: 3, glow: true },
      ] },
    },
    {
      ch: 3, say: 'What if the half-life or the time is the unknown? It’s stuck in the exponent, so your class uses logs. [[1]]Half-life equals time times log point five, over log of m final over m initial. [[2]]And time equals half-life times log of m final over m initial, over log point five.',
      view: { kind: 'lines', lines: [
        { tex: 't_{1/2} = \\dfrac{\\text{time}\\cdot\\log(0.5)}{\\log(m_f/m_i)}', at: 1, box: true },
        { tex: '\\text{time} = \\dfrac{t_{1/2}\\cdot\\log(m_f/m_i)}{\\log(0.5)}', at: 2, box: true },
      ] },
    },
    {
      ch: 3, say: 'Example: one seventy-three grams drops to eleven point eight grams in three point seven eight hours. [[1]]Plug in. [[2]]The half-life is point nine seven six hours.',
      view: { kind: 'lines', lines: [
        { tex: 't_{1/2} = \\dfrac{3.78\\cdot\\log(0.5)}{\\log(11.8/173.0)}', at: 1 },
        { tex: `t_{1/2} = ${t12.toFixed(3)}\\ \\text{hr}`, at: 2, glow: true },
      ] },
    },
    {
      ch: 3, say: 'Exam tip: [[1]]label what you know: m initial, m final, time, half-life. [[2]]The one that’s missing picks your formula. [[3]]Check: the amount left must be smaller than what you started with.',
      view: { kind: 'cards', title: 'Exam tip', cards: [
        { head: 'Label', text: 'mᵢ · m_f · time · t½', at: 1 },
        { head: 'Missing one', text: 'picks the formula', at: 2, dark: true },
        { head: 'Check', text: 'm_f < mᵢ', at: 3 },
      ] },
    },
    {
      ch: 4, say: 'Your turn! A sample starts at eighty grams. Its half-life is ten days. How much is left after thirty days?',
      countdown: 10,
      view: { kind: 'try', tex: 'm_i = 80.0\\ \\text{g},\\ t_{1/2} = 10.0\\ \\text{d},\\ \\text{time} = 30.0\\ \\text{d}', hint: ['N = time ÷ t½', 'm_f = mᵢ(.5)ᴺ'] },
    },
    {
      ch: 4, say: '[[1]]N equals thirty over ten: three. [[2]]Eighty, forty, twenty, ten. Ten point oh grams.',
      view: { kind: 'lines', lines: [{ tex: 'N = 30.0 / 10.0 = 3', at: 1 }, { tex: 'm_f = 80.0\\,(0.5)^3 = 10.0\\ \\text{g}', at: 2, glow: true }] },
    },
    {
      ch: 5, say: 'Recap. [[1]]Each half-life, half is left. [[2]]m final equals m initial times point five to the N, with N equal to time over half-life. [[3]]Unknown in the exponent? Use the log formulas.',
      view: { kind: 'recap', items: [
        { text: 'Each half-life: half the sample is left.', at: 1 },
        { text: 'm_f = mᵢ(0.5)ᴺ, N = time ÷ t½.', at: 2 },
        { text: 'Unknown t½ or time → log formulas.', at: 3 },
      ] },
    },
  ],
}
