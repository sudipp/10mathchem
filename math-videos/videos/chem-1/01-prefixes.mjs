// Chapter 1 · Lesson 1 video. Based on the Conversions & Constants reference sheet (metric prefixes).
export default {
  id: '01-prefixes',
  tag: 'CHAPTER 1 · LESSON 1 · METRIC PREFIXES',
  chapters: ['Ladder', 'Big unit = 1', 'Direction', 'Examples', 'Your turn', 'Recap'],
  scenes: [
    {
      ch: 0, say: 'Kilograms, milliliters, nanometers. Every metric unit is a base unit plus a prefix, and every prefix is just a power of ten.',
      view: { kind: 'title', kicker: 'CHAPTER 1 · LESSON 1', title: 'Metric', em: 'prefixes', sub: 'Powers of ten, from your reference sheet' },
    },
    {
      ch: 0, say: 'Here’s the ladder from your reference sheet. [[1]]Mega, ten to the sixth. [[2]]Kilo, ten to the third. [[3]]The base unit: gram, liter, meter, second. [[4]]Deci, centi, milli: ten to the minus one, two, three. [[5]]Micro, minus six. [[6]]Nano, minus nine. [[7]]Pico, minus twelve.',
      view: { kind: 'table', title: 'The prefix ladder', rows: [
        { left: 'M  mega', right: '10⁶ = 1,000,000', at: 1 },
        { left: 'k  kilo', right: '10³ = 1,000', at: 2 },
        { left: 'base', right: 'g · L · m · s  (10⁰ = 1)', at: 3 },
        { left: 'd · c · m', right: 'deci 10⁻¹ · centi 10⁻² · milli 10⁻³', at: 4 },
        { left: 'μ  micro', right: '10⁻⁶', at: 5 },
        { left: 'n  nano', right: '10⁻⁹', at: 6 },
        { left: 'p  pico', right: '10⁻¹²', at: 7 },
      ] },
    },
    {
      ch: 1, say: 'Trick one: the bigger unit gets the one. [[1]]One kilogram equals one thousand grams. [[2]]One gram equals one thousand milligrams. [[3]]One meter equals ten to the ninth nanometers. Whole numbers, easy to check.',
      view: { kind: 'lines', title: 'The big unit gets the 1', lines: [
        { tex: '1\\ \\text{kg} = 1000\\ \\text{g}', at: 1 },
        { tex: '1\\ \\text{g} = 1000\\ \\text{mg}', at: 2 },
        { tex: '1\\ \\text{m} = 10^{9}\\ \\text{nm}', at: 3 },
      ] },
    },
    {
      ch: 2, say: 'Trick two: which way does the number move? [[1]]Going to a smaller unit, you need more of them, so the number gets bigger. [[2]]Going to a bigger unit, the number gets smaller. [[3]]The difference in exponents tells you how many places to move.',
      view: { kind: 'cards', cards: [
        { head: 'To a smaller unit', text: 'number gets BIGGER (km → m)', at: 1 },
        { head: 'To a bigger unit', text: 'number gets SMALLER (mg → g)', at: 2 },
        { head: 'How many places?', text: 'subtract the exponents', at: 3, dark: true },
      ] },
    },
    {
      ch: 3, say: '[[1]]Two point five kilometers to meters: kilo is ten to the third, so move three places. Two thousand five hundred meters. [[2]]Four fifty milligrams to grams: three places the other way. Point four five oh grams. [[3]]Five hundred nanometers to meters: nine places. Five times ten to the minus seven meters.',
      view: { kind: 'lines', lines: [
        { tex: '2.5\\ \\text{km} = 2500\\ \\text{m}', at: 1 },
        { tex: '450\\ \\text{mg} = 0.450\\ \\text{g}', at: 2 },
        { tex: '500\\ \\text{nm} = 5.00\\times10^{-7}\\ \\text{m}', at: 3, glow: true },
      ] },
    },
    {
      ch: 3, say: 'Exam tip: [[1]]lowercase m is milli, but capital M is mega. [[2]]And micro is the Greek letter mu. [[3]]Nanometers to meters shows up all through chapter two, so know that one cold.',
      view: { kind: 'cards', title: 'Exam tip', cards: [
        { head: 'm vs M', text: 'milli (10⁻³) vs mega (10⁶)', at: 1 },
        { head: 'μ', text: 'micro, 10⁻⁶', at: 2 },
        { head: '1 m = 10⁹ nm', text: 'used for light in Chapter 2', at: 3, dark: true },
      ] },
    },
    {
      ch: 4, say: 'Your turn! How many micrograms are in one gram? And how many liters are in two hundred fifty milliliters?',
      countdown: 8,
      view: { kind: 'try', text: '1 g = ? μg · 250 mL = ? L', hint: ['micro = 10⁻⁶', 'milli = 10⁻³'] },
    },
    {
      ch: 4, say: '[[1]]One gram is one million micrograms: the smaller unit needs the bigger number. [[2]]Two fifty milliliters is point two five oh liters.',
      view: { kind: 'lines', lines: [{ tex: '1\\ \\text{g} = 10^{6}\\ \\mu\\text{g} = 1{,}000{,}000\\ \\mu\\text{g}', at: 1 }, { tex: '250\\ \\text{mL} = 0.250\\ \\text{L}', at: 2, glow: true }] },
    },
    {
      ch: 5, say: 'Recap. [[1]]Each prefix is a power of ten. [[2]]Write equalities with one on the bigger unit. [[3]]Smaller unit, bigger number. Bigger unit, smaller number.',
      view: { kind: 'recap', items: [
        { text: 'M 10⁶ · k 10³ · c 10⁻² · m 10⁻³ · μ 10⁻⁶ · n 10⁻⁹ · p 10⁻¹²', at: 1 },
        { text: 'The bigger unit gets the 1.', at: 2 },
        { text: 'Smaller unit → bigger number (and vice versa).', at: 3 },
      ] },
    },
  ],
}
