// Chapter 2 · Lesson 3 video. Based on the Ch 2 notes and the Unit 2 Exam Review (iodine 126.85 amu, beanium lab).
import { averageMass } from '../../../chemistry-self-learning/src/atomic.js'

const iodine = averageMass([[80.0, 127], [17.5, 126], [2.5, 128]])

export default {
  id: '03-average-mass',
  tag: 'CHAPTER 2 · LESSON 3 · AVERAGE ATOMIC MASS',
  chapters: ['Why', 'Method', 'Iodine', 'Check', 'Beanium', 'Your turn', 'Recap'],
  scenes: [
    {
      ch: 0, say: 'Why is chlorine’s mass thirty-five point four five, not a whole number? Because it’s an average of its isotopes.',
      view: { kind: 'title', kicker: 'CHAPTER 2 · LESSON 3', title: 'Average', em: 'atomic mass', sub: 'A weighted average of isotopes' },
    },
    {
      ch: 0, say: 'Picture a class grade where tests count more than homework. [[1]]Atomic mass works the same way: [[2]]common isotopes count more, rare ones count less.',
      view: { kind: 'circles', items: [{ label: 'X-35', r: 95, sub: '75% common', at: 1, color: '#E3A587' }, { label: 'X-37', r: 52, sub: '25% rare', at: 1, color: '#9CC48A' }],
        notes: [{ text: 'Common isotopes count more', at: 2, strong: true }] },
    },
    {
      ch: 1, say: 'The method has three steps. [[1]]Change each percent to a decimal. [[2]]Multiply by that isotope’s mass. [[3]]Add them up. The answer is in amu.',
      view: { kind: 'cards', cards: [
        { head: '1', text: 'percent → decimal (÷ 100)', at: 1 },
        { head: '2', text: '× isotope mass', at: 2 },
        { head: '3', text: 'add → amu', at: 3, dark: true },
      ] },
    },
    {
      ch: 2, say: 'Iodine is eighty percent iodine one twenty-seven, seventeen point five percent iodine one twenty-six, and two point five percent iodine one twenty-eight. [[1]]Point eight times one twenty-seven is one oh one point six. [[2]]Point one seven five times one twenty-six is twenty-two point oh five. [[3]]Point oh two five times one twenty-eight is three point two. [[4]]Add: one twenty-six point eight five amu.',
      view: { kind: 'lines', title: 'Iodine', lines: [
        { tex: '0.800 \\times 127 = 101.600', at: 1 },
        { tex: '0.175 \\times 126 = 22.050', at: 2 },
        { tex: '0.025 \\times 128 = 3.200', at: 3 },
        { tex: `\\text{sum} = ${iodine.total.toFixed(2)}\\ \\text{amu}`, at: 4, glow: true },
      ] },
    },
    {
      ch: 3, say: 'Always check. [[1]]The average must land between the lightest and heaviest isotope. [[2]]And closest to the most common one. One twenty-six point eight five is closest to one twenty-seven. It checks.',
      view: { kind: 'cards', title: 'Check your answer', cards: [
        { head: '126 ≤ avg ≤ 128', text: 'between lightest and heaviest', at: 1 },
        { head: '≈ 127', text: 'closest to the most common (80%)', at: 2, dark: true },
      ] },
    },
    {
      ch: 4, say: 'The beanium lab uses the same idea. [[1]]Average mass of one bean of each type: mass divided by count. [[2]]Percent of each type: count divided by total count. [[3]]Then the weighted average: black three point two seven grams times point three one eight eight, plus brown, plus white, gives two point two two grams.',
      view: { kind: 'lines', title: 'Beanium lab', lines: [
        { tex: '\\text{one bean} = \\dfrac{\\text{mass}}{\\text{count}}', at: 1 },
        { tex: '\\% = \\dfrac{\\text{count}}{\\text{total count}} \\times 100', at: 2 },
        { tex: '(3.27)(0.3188) + (1.93)(0.4396) + (1.36)(0.2416) = 2.22\\ \\text{g}', at: 3, glow: true },
      ] },
    },
    {
      ch: 5, say: 'Your turn! Element X is seventy-five percent X thirty-five and twenty-five percent X thirty-seven. Find its average atomic mass.',
      countdown: 8,
      view: { kind: 'try', text: '75% X-35 · 25% X-37 → average?', hint: ['decimal × mass', 'add'] },
    },
    {
      ch: 5, say: '[[1]]Point seven five times thirty-five is twenty-six point two five. [[2]]Point two five times thirty-seven is nine point two five. [[3]]Thirty-five point five amu. That’s chlorine!',
      view: { kind: 'lines', lines: [{ tex: '0.75 \\times 35 = 26.25', at: 1 }, { tex: '0.25 \\times 37 = 9.25', at: 2 }, { tex: '35.5\\ \\text{amu}\\ (\\text{chlorine})', at: 3, glow: true }] },
    },
    {
      ch: 6, say: 'Recap. [[1]]Atomic mass is a weighted average of the isotopes. [[2]]Percent to decimal, times mass, add. [[3]]The answer sits closest to the most common isotope.',
      view: { kind: 'recap', items: [
        { text: 'Atomic mass = weighted average of isotopes.', at: 1 },
        { text: 'Decimal × mass, then add (amu).', at: 2 },
        { text: 'Closest to the most common isotope.', at: 3 },
      ] },
    },
  ],
}
