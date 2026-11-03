// Lesson 8 video script. Based on HW #8 (#2, #3, #19, #20).
const R = String.raw
const O = '#CC5833'

export default {
  id: '08-solving-by-graphing',
  tag: 'UNIT 4 · LESSON 8 · SOLVING BY GRAPHING',
  chapters: ['Graphing', 'Calculator', 'Complex roots', 'Completing the square', 'Your turn', 'Recap'],
  layouts: {
    hw2: { type: 'graph', num: [1, -1, -2, 0, -1], window: [-3, 3, -6, 6] },
    hw3: { type: 'graph', num: [1, 6, 3], window: [-7, 1, -7, 5] },
  },
  scenes: [
    {
      ch: 0, say: 'Some polynomial equations won’t factor nicely. Today you’ll solve them two new ways: with a graph, and by completing the square.',
      view: { kind: 'title', kicker: 'UNIT 4 · LESSON 8', title: 'Solving by', em: 'graphing', sub: 'When factoring gets hard, let the graph help.' },
    },
    {
      ch: 0, say: 'Solve x to the fourth, minus x cubed, minus two x squared, minus one, equals zero. [[1]]It won’t factor, so graph it. [[2]]The real solutions are where the curve crosses the x-axis. Here, there are two.',
      view: { kind: 'graph', layout: 'hw2', reveal: [['curve', 1], ['zeros', 2]], side: [{ text: 'Real solutions = x-intercepts', at: 2, strong: true }] },
    },
    {
      ch: 1, say: 'Your graphing calculator can find them. [[1]]Press second, calc, then zero. [[2]]Move to the left of a crossing and press enter: that’s the left bound. [[3]]Move to the right of it and press enter: the right bound. [[4]]Press enter once more to guess, and the calculator finds the zero.',
      view: { kind: 'cards', title: 'TI-84: find a zero', cards: [
        { head: '1', text: '2nd → CALC → 2: zero', at: 1 },
        { head: '2', text: 'Left of the crossing → ENTER', at: 2 },
        { head: '3', text: 'Right of the crossing → ENTER', at: 3 },
        { head: '4', text: 'ENTER again to guess', at: 4, dark: true },
      ] },
    },
    {
      ch: 1, say: '[[1]]The first zero is about minus one point two. [[2]]The second is about two point one, to the nearest tenth.',
      view: { kind: 'graph', layout: 'hw2', reveal: [], hl: [[-1.212, 1], [2.075, 2]], labels: [{ x: -1.212, y: 1.4, text: '≈ −1.2', at: 1 }, { x: 2.075, y: 1.4, text: '≈ 2.1', at: 2 }], side: [{ tex: R`x \approx -1.2`, at: 1 }, { tex: R`x \approx 2.1`, at: 2, strong: true }] },
    },
    {
      ch: 2, say: 'But wait: degree four means four roots in all. [[1]]Two are real, and you can see them on the graph. [[2]]The other two are complex, so they never show up on the graph.',
      view: { kind: 'lines', lines: [{ tex: R`\text{degree } 4 \ \Rightarrow\ 4 \text{ roots}`, box: true }, { tex: R`2 \text{ real: the x-intercepts}`, at: 1 }, { tex: R`2 \text{ complex: not on the graph}`, at: 2, glow: true }] },
    },
    {
      ch: 3, say: 'For a quadratic, completing the square gives exact answers. Solve n squared minus ten n minus forty equals five. [[1]]Move the constants: n squared minus ten n equals forty-five. [[2]]Half of minus ten is minus five, and minus five squared is twenty-five. Add it to both sides. [[3]]Now the left side is a perfect square: n minus five, squared, equals seventy. [[4]]Take the square root of both sides: n equals five, plus or minus root seventy.',
      view: { kind: 'lines', lines: [
        { tex: R`n^2 - 10n - 40 = 5` },
        { tex: R`n^2 - 10n = 45`, at: 1 },
        { tex: R`n^2 - 10n + {\color{${O}}25} = 45 + {\color{${O}}25} \qquad \left(\tfrac{-10}{2}\right)^2 = 25`, at: 2 },
        { tex: R`(n - 5)^2 = 70`, at: 3 },
        { tex: R`n = 5 \pm \sqrt{70}`, at: 4, glow: true },
      ] },
    },
    {
      ch: 3, say: 'One tip: if x squared has a coefficient, like eight x squared, [[1]]divide everything by eight first. Then complete the square as usual.',
      view: { kind: 'lines', lines: [{ tex: R`8x^2 - 16x = 49`, big: true }, { tex: R`\div 8:\quad x^2 - 2x = \tfrac{49}{8}`, at: 1, box: true }] },
    },
    {
      ch: 4, say: 'Your turn! Solve x squared plus six x plus three equals zero by completing the square.',
      countdown: 10,
      view: { kind: 'try', tex: R`x^2 + 6x + 3 = 0`, hint: ['Move the constant', 'Add (b ÷ 2)²', 'Square root, ±'] },
    },
    {
      ch: 4, say: '[[1]]Move the three: x squared plus six x equals minus three. [[2]]Half of six is three, and three squared is nine. Add nine: x plus three, squared, equals six. [[3]]So x equals minus three, plus or minus root six.',
      view: { kind: 'lines', lines: [
        { tex: R`x^2 + 6x = -3`, at: 1 },
        { tex: R`x^2 + 6x + {\color{${O}}9} = -3 + {\color{${O}}9} \;\Rightarrow\; (x + 3)^2 = 6`, at: 2 },
        { tex: R`x = -3 \pm \sqrt{6}`, at: 3, glow: true },
      ] },
    },
    {
      ch: 4, say: 'Check it with a graph. [[1]]Minus three plus or minus root six is about minus five point four, and minus zero point six. [[2]]Exactly where the parabola crosses the x-axis!',
      view: { kind: 'graph', layout: 'hw3', reveal: [['curve', 0], ['zeros', 2]], side: [{ tex: R`-3 - \sqrt6 \approx -5.4`, at: 1 }, { tex: R`-3 + \sqrt6 \approx -0.6`, at: 1 }, { text: 'Same as the graph ✓', at: 2, strong: true }] },
    },
    {
      ch: 5, say: 'Recap. [[1]]Real solutions are the x-intercepts of the graph. [[2]]On the calculator: second, calc, zero, then left bound, right bound, guess. [[3]]Complex roots don’t appear on the graph. [[4]]And for quadratics, complete the square for exact answers.',
      view: { kind: 'recap', items: [
        { text: 'Real solutions = x-intercepts of the graph.', at: 1 },
        { text: 'TI-84: 2nd → CALC → zero → left bound, right bound, guess.', at: 2 },
        { text: 'Complex roots never show on the graph.', at: 3 },
        { tex: R`\text{Complete the square: add } \left(\tfrac{b}{2}\right)^2 \text{ to both sides}`, at: 4 },
      ] },
    },
    {
      ch: 5, say: 'Next up: end behavior, and sketching a polynomial from its clues. See you there!',
      view: { kind: 'title', kicker: 'UP NEXT · LESSON 9', title: 'End behavior', em: '& graphing', sub: 'Sketch any polynomial from its clues' },
    },
  ],
}
