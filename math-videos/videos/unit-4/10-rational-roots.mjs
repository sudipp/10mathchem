// Lesson 10 video script. Based on Day 10 notes (Examples 1, 2, 3).
const R = String.raw
const O = '#CC5833'

export default {
  id: '10-rational-roots',
  tag: 'UNIT 4 · LESSON 10 · RATIONAL ROOT THEOREM',
  chapters: ['Why', 'The theorem', 'List', 'Test & divide', 'Your turn', 'Recap'],
  layouts: {
    ex2: { type: 'synth', num: [1, -4, -11, 30], k: 2 },
    ex2g: { type: 'graph', num: [1, -4, -11, 30], window: [-5, 7, -40, 60] },
    ex1: { type: 'synth', num: [1, -1, -9, 9], k: 1 },
  },
  scenes: [
    {
      ch: 0, say: 'How do you find the zeros of a cubic that won’t factor by grouping? Guessing could take forever. The Rational Root Theorem gives you a short list of numbers to try.',
      view: { kind: 'title', kicker: 'UNIT 4 · LESSON 10', title: 'Rational Root', em: 'Theorem', sub: 'A short list of zeros worth trying.' },
    },
    {
      ch: 1, say: 'Here’s the theorem. If a polynomial has integer coefficients, [[1]]every rational zero is a fraction p over q, [[2]]where p is a factor of the constant term, [[3]]and q is a factor of the leading coefficient.',
      view: { kind: 'lines', lines: [
        { tex: R`f(x) = {\color{${O}}a_n}x^n + \dots + a_1x + {\color{#2E4036}a_0}` },
        { tex: R`\text{rational zero } = \dfrac{p}{q}`, at: 1, big: true },
        { tex: R`p = \text{factors of the constant } a_0`, at: 2, box: true },
        { tex: R`q = \text{factors of the leading coefficient } {\color{${O}}a_n}`, at: 3, box: true },
      ] },
    },
    {
      ch: 2, say: 'Let’s list them for fifteen x to the fourth, minus sixty-eight x cubed, minus seven x squared, plus twenty-four x, minus four. [[1]]p: the factors of four. Plus or minus one, two, and four. [[2]]q: the factors of fifteen. One, three, five, and fifteen. [[3]]Now put each p over each q. Skip any repeats, like two over two.',
      view: { kind: 'lines', lines: [
        { tex: R`f(x) = 15x^4 - 68x^3 - 7x^2 + 24x - 4` },
        { tex: R`p:\ \pm1,\ \pm2,\ \pm4`, at: 1 },
        { tex: R`q:\ \pm1,\ \pm3,\ \pm5,\ \pm15`, at: 2 },
        { tex: R`\pm1,\ \pm2,\ \pm4,\ \pm\tfrac13,\ \pm\tfrac23,\ \pm\tfrac43,\ \pm\tfrac15,\ \pm\tfrac25,\ \pm\tfrac45,\ \pm\tfrac1{15},\ \pm\tfrac2{15},\ \pm\tfrac4{15}`, at: 3, glow: true },
      ] },
    },
    {
      ch: 2, say: 'Remember: these are only possible zeros. [[1]]The theorem never promises that any of them work. [[2]]It just tells you which ones are worth testing.',
      view: { kind: 'lines', lines: [{ tex: R`\text{possible zeros} \ne \text{actual zeros}`, at: 1, box: true }, { tex: R`\text{test them to find the real ones}`, at: 2 }] },
    },
    {
      ch: 3, say: 'Now find the zeros of x cubed minus four x squared minus eleven x plus thirty. [[1]]The leading coefficient is one, so the candidates are just the factors of thirty. [[2]]Test them. f of one is sixteen. Not zero. [[3]]f of minus one is thirty-six. No. [[4]]f of two is zero. Two is a zero!',
      view: { kind: 'lines', lines: [
        { tex: R`f(x) = x^3 - 4x^2 - 11x + 30` },
        { tex: R`\pm1,\ \pm2,\ \pm3,\ \pm5,\ \pm6,\ \pm10,\ \pm15,\ \pm30`, at: 1 },
        { tex: R`f(1) = 16\ \ \times`, at: 2 },
        { tex: R`f(-1) = 36\ \ \times`, at: 3 },
        { tex: R`f(2) = 0\ \ \checkmark`, at: 4, glow: true },
      ] },
    },
    {
      ch: 3, say: 'Since two is a zero, x minus two is a factor. Divide it out with synthetic division. [[1]]Bring down the one. [[2]]Multiply and add: minus two. [[3]]Then minus fifteen. [[4]]And the remainder is zero, just as we expected.',
      view: { kind: 'synth', layout: 'ex2', reveal: [['coef', 0], ['k', 0], ['down', 1], ['m1', 2], ['a1', 2], ['m2', 3], ['a2', 3], ['m3', 4], ['a3', 4]] },
    },
    {
      ch: 3, say: 'The quotient is a quadratic: x squared minus two x minus fifteen. [[1]]Factor it: x minus five, times x plus three. [[2]]So the zeros are two, five, and minus three.',
      view: { kind: 'lines', lines: [
        { tex: R`x^2 - 2x - 15` },
        { tex: R`= (x - 5)(x + 3)`, at: 1 },
        { tex: R`x = 2,\ 5,\ -3`, at: 2, big: true, glow: true },
      ] },
    },
    {
      ch: 3, say: 'Check with a graph. [[1]]It crosses the x-axis at minus three, two, and five. A graph is also a great way to pick which candidates to test first.',
      view: { kind: 'graph', layout: 'ex2g', title: R`f(x) = x^3 - 4x^2 - 11x + 30`, reveal: [['curve', 0], ['zeros', 1]], side: [{ tex: R`x = -3,\ 2,\ 5`, at: 1, strong: true }, { text: 'Tip: graph first to choose candidates', at: 1 }] },
    },
    {
      ch: 4, say: 'Your turn! Find the rational zeros of x cubed minus x squared minus nine x plus nine.',
      countdown: 10,
      view: { kind: 'try', tex: R`f(x) = x^3 - x^2 - 9x + 9`, hint: ['List p/q', 'Test', 'Divide', 'Factor'] },
    },
    {
      ch: 4, say: '[[1]]The candidates are plus or minus one, three, and nine. [[2]]f of one is zero, so divide by x minus one.',
      view: { kind: 'synth', layout: 'ex1', reveal: [['coef', 0], ['k', 2], ['down', 2], ['m1', 2], ['a1', 2], ['m2', 2], ['a2', 2], ['m3', 2], ['a3', 2]], answer: [{ tex: R`\pm1,\ \pm3,\ \pm9 \;\to\; f(1) = 0\ \checkmark`, at: 1 }] },
    },
    {
      ch: 4, say: '[[1]]The quotient is x squared minus nine, a difference of squares. [[2]]So the zeros are one, three, and minus three. Nice work!',
      view: { kind: 'lines', lines: [
        { tex: R`x^2 - 9 = (x - 3)(x + 3)`, at: 1 },
        { tex: R`x = 1,\ 3,\ -3`, at: 2, big: true, glow: true },
      ] },
    },
    {
      ch: 5, say: 'Recap. [[1]]Possible rational zeros are p over q: factors of the constant, over factors of the leading coefficient. [[2]]Test candidates until one gives zero. [[3]]Divide it out with synthetic division. [[4]]When you reach a quadratic, factor it, or use the quadratic formula.',
      view: { kind: 'recap', items: [
        { tex: R`\dfrac{p}{q} = \dfrac{\text{factors of } a_0}{\text{factors of } a_n}`, at: 1 },
        { text: 'Test candidates until f(x) = 0.', at: 2 },
        { text: 'Divide it out with synthetic division.', at: 3 },
        { text: 'Quadratic left? Factor it or use the formula.', at: 4 },
      ] },
    },
    {
      ch: 5, say: 'Next up: irrational and complex roots, which always come in pairs. See you there!',
      view: { kind: 'title', kicker: 'UP NEXT · LESSON 11', title: 'Irrational &', em: 'complex roots', sub: 'Roots that come in pairs' },
    },
  ],
}
