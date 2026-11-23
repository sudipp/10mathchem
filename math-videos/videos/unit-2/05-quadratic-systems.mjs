// Unit 2, Lesson 5 video script: quadratic–quadratic systems. Based on Day 17 notes (Examples 1, 2, 4) and HW #17.
const R = String.raw

export default {
  id: '05-quadratic-systems',
  tag: 'UNIT 2 · LESSON 5 · TWO PARABOLAS',
  chapters: ['The idea', 'Two solutions', 'One solution', 'x² cancels', 'Your turn', 'Recap'],
  layouts: {
    ex1: { type: 'plane', window: [-4, 6, -5, 30], tex: R`y = x^2 + 2x + 1,\ \ y = 2x^2 - x - 3`, items: [
      { key: 'a', kind: 'fn', f: x => x * x + 2 * x + 1 },
      { key: 'b', kind: 'fn', f: x => 2 * x * x - x - 3, alt: true },
      { key: 'sol', kind: 'dots', pts: [[4, 25], [-1, 0]], style: 'sol', labels: true },
    ] },
    ex2: { type: 'plane', window: [-2, 5, -4, 4], tex: R`y = 2x^2 - 7x + 6,\ \ y = -2x^2 + 5x - 3`, items: [
      { key: 'a', kind: 'fn', f: x => 2 * x * x - 7 * x + 6 },
      { key: 'b', kind: 'fn', f: x => -2 * x * x + 5 * x - 3, alt: true },
      { key: 'sol', kind: 'dots', pts: [[1.5, 0]], style: 'sol', labels: true },
    ] },
  },
  scenes: [
    {
      ch: 0, say: 'Two parabolas can cross twice, touch once, or never meet. The algebra tells you which.',
      view: { kind: 'title', kicker: 'UNIT 2 · LESSON 5', title: 'Two parabolas', em: 'systems', sub: 'Set the two y-expressions equal.' },
    },
    {
      ch: 0, say: 'The plan: [[1]]solve both equations for y. [[2]]Set the right sides equal. [[3]]Solve for x, then plug back in for y.',
      view: { kind: 'recap', items: [
        { text: '1. Solve both for y.', at: 1 },
        { text: '2. Set them equal; get 0 on one side.', at: 2 },
        { text: '3. Solve for x, then find each y.', at: 3 },
      ] },
    },
    {
      ch: 1, say: 'y equals x squared plus two x plus one, and y equals two x squared minus x minus three. [[1]]Set them equal. [[2]]Move everything to the right: zero equals x squared minus three x minus four. [[3]]Factor: x minus four, times x plus one. So x is four or negative one.',
      view: { kind: 'lines', lines: [
        { tex: R`x^2 + 2x + 1 = 2x^2 - x - 3`, at: 1 },
        { tex: R`0 = x^2 - 3x - 4`, at: 2 },
        { tex: R`(x - 4)(x + 1) = 0 \Rightarrow x = 4,\ -1`, at: 3, glow: true },
      ] },
    },
    {
      ch: 1, say: '[[1]]Plug into the first equation: x equals four gives twenty-five, and x equals negative one gives zero. The parabolas meet at four comma twenty-five and negative one comma zero.',
      view: { kind: 'plane', layout: 'ex1', reveal: [['a', 0], ['b', 0], ['sol', 1]], side: [{ tex: R`(4, 25),\ (-1, 0)`, at: 1, strong: true }] },
    },
    {
      ch: 2, say: 'Now y equals two x squared minus seven x plus six, and y equals negative two x squared plus five x minus three. [[1]]Set equal and simplify: four x squared minus twelve x plus nine equals zero. [[2]]That is a perfect square: two x minus three, squared. Only one x: three halves. [[3]]y is zero, so they touch at one point: three halves comma zero.',
      view: { kind: 'plane', layout: 'ex2', reveal: [['a', 0], ['b', 0], ['sol', 3]], side: [{ tex: R`4x^2 - 12x + 9 = 0`, at: 1 }, { tex: R`(2x - 3)^2 = 0`, at: 2 }, { tex: R`\left(\tfrac32, 0\right)`, at: 3, strong: true }] },
    },
    {
      ch: 3, say: 'If both have the same x squared term, it cancels. [[1]]x squared plus four x plus four equals x squared plus two x plus six. [[2]]The x squared terms cancel: two x equals two, so x is one. [[3]]y is one plus four plus four: nine. One solution: one comma nine.',
      view: { kind: 'lines', lines: [
        { tex: R`x^2 + 4x + 4 = x^2 + 2x + 6`, at: 1 },
        { tex: R`2x = 2 \Rightarrow x = 1`, at: 2 },
        { tex: R`(1, 9)`, at: 3, glow: true },
      ] },
    },
    {
      ch: 4, say: 'Your turn! Solve y equals two x squared minus eight and y equals three x squared minus nine.',
      countdown: 10,
      view: { kind: 'try', tex: R`y = 2x^2 - 8,\quad y = 3x^2 - 9`, hint: ['Set them equal', 'Solve for x'] },
    },
    {
      ch: 4, say: '[[1]]Set equal: two x squared minus eight equals three x squared minus nine, so x squared equals one. [[2]]x is one or negative one, and y is two minus eight: negative six. [[3]]The solutions are one comma negative six and negative one comma negative six.',
      view: { kind: 'lines', lines: [
        { tex: R`x^2 = 1`, at: 1 },
        { tex: R`x = \pm1,\ y = 2 - 8 = -6`, at: 2 },
        { tex: R`(1, -6),\ (-1, -6)`, at: 3, glow: true },
      ] },
    },
    {
      ch: 5, say: 'Recap. [[1]]Solve both for y and set them equal. [[2]]Solve the result: two, one, or no solutions. [[3]]When the x squared terms cancel, the equation is linear: one solution.',
      view: { kind: 'recap', items: [
        { text: 'Both for y; set equal.', at: 1 },
        { text: 'Solve: 2, 1, or 0 solutions.', at: 2 },
        { text: 'x² cancels → linear → one solution.', at: 3 },
      ] },
    },
    {
      ch: 5, say: 'Next up: quadratic inequalities. See you there!',
      view: { kind: 'title', kicker: 'UP NEXT · LESSON 6', title: 'Quadratic', em: 'inequalities', sub: 'Shade a parabola or test a number line' },
    },
  ],
}
