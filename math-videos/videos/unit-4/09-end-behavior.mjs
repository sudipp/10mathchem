// Lesson 9 video script. Based on Day 9 notes (Examples 1A, 1B, 3) and HW #9 #2.
const R = String.raw
const O = '#CC5833'

export default {
  id: '09-end-behavior',
  tag: 'UNIT 4 · LESSON 9 · END BEHAVIOR',
  chapters: ['End behavior', 'The rule', 'Turning points', 'Sketching', 'Your turn', 'Recap'],
  layouts: {
    ex1a: { type: 'graph', num: [1, 2, -3, -2], window: [-4, 3, -8, 8] },
    ex3: { type: 'graph', num: [-2, 3, 0, 0], window: [-2, 3, -6, 7] },
    hw2: { type: 'graph', num: [3, -15, 18, 0], window: [-1, 4, -8, 8] },
  },
  scenes: [
    {
      ch: 0, say: 'You can sketch a polynomial without plotting a hundred points. Just read its clues: end behavior, zeros, and multiplicity.',
      view: { kind: 'title', kicker: 'UNIT 4 · LESSON 9', title: 'End behavior', em: '& graphing', sub: 'Sketch any polynomial from its clues.' },
    },
    {
      ch: 0, say: 'End behavior is what the graph does at the far left, and the far right. [[1]]For x cubed plus two x squared minus three x minus two, [[2]]the left end falls, [[3]]and the right end rises.',
      view: { kind: 'graph', layout: 'ex1a', title: R`f(x) = x^3 + 2x^2 - 3x - 2`, reveal: [['curve', 1]], labels: [{ x: -3.3, y: -6.5, text: 'falls ↓', at: 2 }, { x: 2.3, y: 6.5, text: 'rises ↑', at: 3 }], side: [{ tex: R`x \to -\infty:\ f(x) \to -\infty`, at: 2 }, { tex: R`x \to +\infty:\ f(x) \to +\infty`, at: 3, strong: true }] },
    },
    {
      ch: 1, say: 'Only two clues decide it: the degree, and the sign of the leading coefficient. [[1]]Even degree, positive: both ends up. [[2]]Even degree, negative: both ends down. [[3]]Odd degree, positive: down on the left, up on the right. [[4]]Odd degree, negative: up on the left, down on the right.',
      view: { kind: 'table', title: 'End behavior rule', rows: [
        { left: 'even, a > 0', right: '↖  both ends up  ↗', at: 1 },
        { left: 'even, a < 0', right: '↙  both ends down  ↘', at: 2 },
        { left: 'odd, a > 0', right: '↙  down left, up right  ↗', at: 3 },
        { left: 'odd, a < 0', right: '↖  up left, down right  ↘', at: 4 },
      ] },
    },
    {
      ch: 1, say: 'Try minus twenty-four x to the tenth, minus three sixteenths x to the fourth, plus four x. [[1]]Degree ten is even. [[2]]The leading coefficient, minus twenty-four, is negative. [[3]]So both ends go down.',
      view: { kind: 'lines', lines: [
        { tex: R`f(x) = {\color{${O}}-24}x^{\color{${O}}10} - \tfrac{3}{16}x^4 + 4x` },
        { tex: R`\text{degree } 10:\ \text{even}`, at: 1 },
        { tex: R`\text{leading coefficient } -24:\ \text{negative}`, at: 2 },
        { tex: R`\swarrow\ \text{both ends down}\ \searrow`, at: 3, glow: true },
      ] },
    },
    {
      ch: 2, say: 'Turning points are the hills and valleys. [[1]]A polynomial of degree n has at most n minus one of them. [[2]]So a cubic has at most two, [[3]]and a quartic, at most three.',
      view: { kind: 'lines', lines: [{ tex: R`\text{at most } n - 1 \text{ turning points}`, at: 1, box: true }, { tex: R`\text{cubic } (n = 3):\ \le 2`, at: 2 }, { tex: R`\text{quartic } (n = 4):\ \le 3`, at: 3 }] },
    },
    {
      ch: 3, say: 'Now let’s sketch three x squared minus two x cubed. [[1]]First, end behavior: in standard form it’s minus two x cubed plus three x squared. Odd degree, negative, so up on the left, down on the right. [[2]]Next, factor out minus x squared, to get minus x squared, times two x minus three.',
      view: { kind: 'lines', lines: [
        { tex: R`f(x) = 3x^2 - 2x^3` },
        { tex: R`= -2x^3 + 3x^2 \;\to\; \nwarrow\ \text{up left, down right}\ \searrow`, at: 1 },
        { tex: R`= -x^2(2x - 3)`, at: 2, glow: true },
      ] },
    },
    {
      ch: 3, say: '[[1]]The zeros are zero, and three halves. [[2]]Zero comes from x squared: multiplicity two, so the graph bounces there. [[3]]Three halves has multiplicity one, so the graph crosses.',
      view: { kind: 'lines', lines: [
        { tex: R`x = 0,\quad x = \tfrac{3}{2}`, at: 1, big: true },
        { tex: R`0:\ \text{multiplicity } 2 \to \textbf{bounce}`, at: 2, box: true },
        { tex: R`\tfrac{3}{2}:\ \text{multiplicity } 1 \to \textbf{cross}`, at: 3, box: true },
      ] },
    },
    {
      ch: 3, say: '[[1]]Plot a few test points: f of minus one is five, f of one is one, and f of two is minus four. [[2]]Then connect them, following the end behavior: up on the left, bounce at zero, a small hill, cross at three halves, and down on the right.',
      view: { kind: 'graph', layout: 'ex3', title: R`f(x) = 3x^2 - 2x^3`, reveal: [['zeros', 1], ['curve', 2]], hl: [[0, 2]], dots: [{ x: -1, y: 5, at: 1 }, { x: 1, y: 1, at: 1 }, { x: 2, y: -4, at: 1 }], labels: [{ x: -0.35, y: 5.6, text: '(−1, 5)', at: 1 }, { x: 1, y: 2.1, text: '(1, 1)', at: 1 }, { x: 2.1, y: -5.2, text: '(2, −4)', at: 1 }], side: [{ text: 'Up on the left, down on the right', at: 2 }, { text: 'Bounce at 0, cross at 3⁄2', at: 2, strong: true }] },
    },
    {
      ch: 4, say: 'Your turn! For three x cubed minus fifteen x squared plus eighteen x, find the end behavior and the zeros.',
      countdown: 10,
      view: { kind: 'try', tex: R`f(x) = 3x^3 - 15x^2 + 18x`, hint: ['Degree & sign', 'Factor', 'Zeros & multiplicity'] },
    },
    {
      ch: 4, say: '[[1]]Degree three, positive: down on the left, up on the right. [[2]]Factor: three x, times x minus two, times x minus three. [[3]]So the zeros are zero, two, and three, and the graph crosses at each one.',
      view: { kind: 'graph', layout: 'hw2', title: R`f(x) = 3x(x - 2)(x - 3)`, reveal: [['curve', 1], ['zeros', 3]], side: [{ text: 'Odd, positive: down left, up right', at: 1 }, { tex: R`3x(x - 2)(x - 3)`, at: 2 }, { tex: R`0,\ 2,\ 3 \to \text{cross each}`, at: 3, strong: true }] },
    },
    {
      ch: 5, say: 'Recap. [[1]]End behavior comes from the degree and the sign of the leading coefficient. [[2]]At most n minus one turning points. [[3]]Odd multiplicity crosses; even multiplicity bounces. [[4]]Then plot a few points, and connect.',
      view: { kind: 'recap', items: [
        { text: 'End behavior: degree (even/odd) + sign of the leading coefficient.', at: 1 },
        { text: 'At most n − 1 turning points.', at: 2 },
        { text: 'Odd multiplicity → cross. Even → bounce.', at: 3 },
        { text: 'Factor, find intercepts, test points, connect.', at: 4 },
      ] },
    },
    {
      ch: 5, say: 'Next up: the Rational Root Theorem, a short list of zeros worth trying. See you there!',
      view: { kind: 'title', kicker: 'UP NEXT · LESSON 10', title: 'Rational Root', em: 'Theorem', sub: 'A short list of zeros worth trying' },
    },
  ],
}
