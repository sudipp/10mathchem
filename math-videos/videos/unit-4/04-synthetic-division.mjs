// Lesson 4 video script. Based on Day 5 notes (Examples 1, 2, 3, 5A).
const R = String.raw
const ex = (reveal, extra = {}) => ({ kind: 'synth', layout: 'ex', reveal, ...extra })

export default {
  id: '04-synthetic-division',
  tag: 'UNIT 4 · LESSON 4 · SYNTHETIC DIVISION',
  chapters: ['Why', 'Set up', 'Example', 'Your turn', 'f(k)', 'Recap'],
  layouts: {
    ex: { type: 'synth', num: [1, -3, -7, 6], k: 4 },
    try: { type: 'synth', num: [2, -3, 4, 5], k: -2 },
    fk: { type: 'synth', num: [3, 13, 2, -8], k: -4 },
  },
  scenes: [
    {
      ch: 0, say: 'Synthetic division is a super-fast shortcut for dividing by x minus k. It only works when the divisor is linear, like x minus four, or x plus two.',
      view: { kind: 'title', kicker: 'UNIT 4 · LESSON 4', title: 'Synthetic', em: 'division', sub: 'Long division’s fast shortcut. Linear divisors only.' },
    },
    {
      ch: 1, say: 'Let’s divide x cubed minus three x squared minus seven x plus six, by x minus four. [[1]]Put four in the box. That’s k, the number that makes x minus four equal zero. [[2]]Then write just the coefficients: one, minus three, minus seven, six.',
      view: ex([['k', 1], ['coef', 2]]),
    },
    {
      ch: 1, say: 'Careful with the sign: [[1]]for x minus four, k is four. [[2]]For x plus two, k is minus two. [[3]]And if a power is missing, write a zero in its place.',
      view: { kind: 'lines', lines: [{ tex: R`x - 4 \ \to\ k = 4`, at: 1, box: true }, { tex: R`x + 2 \ \to\ k = -2`, at: 2, box: true }, { tex: R`x^3 - 2x^2 - 4 \ \to\ 1,\ -2,\ {\color{#CC5833}0},\ -4`, at: 3 }] },
    },
    {
      ch: 2, move: 0, say: 'Step one: [[1]]bring down the first coefficient, one.',
      view: ex([['down', 1]]),
    },
    {
      ch: 2, say: 'Now just two moves, over and over. [[1]]Multiply: four times one is four. Write it under minus three. [[2]]Add: minus three plus four is one.',
      view: ex([['m1', 1], ['a1', 2]], { hl: [['k', 1], ['r0', 1], ['r1', 2]], track: [[1, 1], [2, 2]] }),
    },
    {
      ch: 2, say: 'Multiply: [[1]]four times one is four. [[2]]Add: minus seven plus four is minus three.',
      view: ex([['m2', 1], ['a2', 2]], { hl: [['r2', 2]], track: [[1, 1], [2, 2]] }),
    },
    {
      ch: 2, say: 'Multiply: [[1]]four times minus three is minus twelve. [[2]]Add: six plus minus twelve is minus six.',
      view: ex([['m3', 1], ['a3', 2]], { track: [[1, 1], [2, 2]] }),
    },
    {
      ch: 2, say: 'Now read the answer. [[1]]The last number, minus six, is the remainder. [[2]]The others are the quotient, one degree lower: x squared plus x minus three.',
      view: ex([], { hl: [['r3', 1]], answer: [{ tex: R`x^2 + x - 3`, at: 2 }, { tex: R`-\ \dfrac{6}{x - 4}`, at: 2 }] }),
    },
    {
      ch: 3, say: 'Your turn! Use synthetic division to divide two x cubed minus three x squared plus four x plus five, by x plus two.',
      countdown: 10,
      view: { kind: 'try', tex: R`(2x^3 - 3x^2 + 4x + 5) \div (x + 2)`, hint: ['k = ?', 'Bring down', 'Multiply', 'Add'] },
    },
    {
      ch: 3, say: 'Let’s check. [[1]]k is minus two. [[2]]Bring down the two. [[3]]Multiply and add: minus seven, [[4]]then eighteen, [[5]]then minus thirty-one.',
      view: { kind: 'synth', layout: 'try', reveal: [['coef', 0], ['k', 1], ['down', 2], ['m1', 3], ['a1', 3], ['m2', 4], ['a2', 4], ['m3', 5], ['a3', 5]] },
    },
    {
      ch: 3, say: 'So the answer is [[1]]two x squared minus seven x plus eighteen, minus thirty-one over x plus two. Great work!',
      view: { kind: 'synth', layout: 'try', reveal: [], answer: [{ tex: R`2x^2 - 7x + 18 - \dfrac{31}{x + 2}`, at: 1 }] },
    },
    {
      ch: 4, say: 'Here’s a bonus. Because of the Remainder Theorem, synthetic division finds f of k fast. [[1]]For f of minus four, divide by x plus four. [[2]]The remainder is zero, [[3]]so f of minus four is zero, and x plus four is a factor!',
      view: { kind: 'synth', layout: 'fk', reveal: [['k', 1], ['coef', 1], ['down', 1], ['m1', 1], ['a1', 1], ['m2', 1], ['a2', 1], ['m3', 2], ['a3', 2]], hl: [['r3', 2]], note: { tex: R`f(-4) = 0`, at: 3 } },
    },
    {
      ch: 5, say: 'Recap. [[1]]Only for linear divisors. [[2]]Put k in the box, and zeros for missing powers. [[3]]Bring down, then multiply and add, again and again. [[4]]The last number is the remainder, and it equals f of k.',
      view: { kind: 'recap', items: [
        { text: 'Only for divisors like x − k.', at: 1 },
        { text: 'k in the box. 0 for any missing power.', at: 2 },
        { text: 'Bring down → Multiply → Add. Repeat.', at: 3 },
        { tex: R`\text{Last number} = \text{remainder} = f(k)`, at: 4 },
      ] },
    },
    {
      ch: 5, say: 'Next up: factoring bigger polynomials. See you there!',
      view: { kind: 'title', kicker: 'UP NEXT · LESSON 5', title: 'Factoring', em: 'bigger polynomials', sub: 'Cubes, quadratic form, and grouping' },
    },
  ],
}
