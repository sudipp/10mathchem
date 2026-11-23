// Unit 1, Lesson 5 video script: writing quadratic functions. Based on Day 5 notes (Examples 1–3) and HW #5.
const R = String.raw

export default {
  id: '05-writing-quadratics',
  tag: 'UNIT 1 · LESSON 5 · WRITING QUADRATICS',
  chapters: ['Pick a form', 'Vertex + point', 'Zeros + point', 'Converting', 'Your turn', 'Recap'],
  layouts: {
    vp: { type: 'plane', window: [-2, 7, -2, 12], tex: R`y = 2(x - 3)^2 + 1`, items: [
      { key: 'v', kind: 'dots', pts: [[3, 1]], style: 'vertex', labels: true },
      { key: 'p', kind: 'dots', pts: [[1, 9]], style: 'sol', labels: true },
      { key: 'curve', kind: 'fn', f: x => 2 * (x - 3) ** 2 + 1 },
    ] },
    zp: { type: 'plane', window: [-6, 3, -4, 8], tex: R`y = -2x(x + 4)`, items: [
      { key: 'z', kind: 'dots', pts: [[-4, 0], [0, 0]], style: 'vertex', labels: true },
      { key: 'p', kind: 'dots', pts: [[-3, 6]], style: 'sol', labels: true },
      { key: 'curve', kind: 'fn', f: x => -2 * x * (x + 4) },
    ] },
  },
  scenes: [
    {
      ch: 0, say: 'To write a quadratic, choose the form that matches your clues. Then one more point finds a.',
      view: { kind: 'title', kicker: 'UNIT 1 · LESSON 5', title: 'Writing', em: 'quadratics', sub: 'Pick the form that fits the clues.' },
    },
    {
      ch: 0, say: '[[1]]Know the vertex? Use vertex form. [[2]]Know the zeros? Use intercept form. Either way, plug in one more point to solve for a.',
      view: { kind: 'cards', cards: [
        { head: 'Vertex given', tex: R`y = a(x - h)^2 + k`, at: 1 },
        { head: 'Zeros given', tex: R`y = a(x - p)(x - q)`, at: 2, dark: true },
      ] },
    },
    {
      ch: 1, say: 'Vertex three comma one, through one comma nine. [[1]]Vertex form: y equals a times x minus three, squared, plus one. [[2]]Plug in one comma nine: nine equals a times negative two squared, plus one, so nine equals four a plus one. [[3]]a equals two.',
      view: { kind: 'plane', layout: 'vp', reveal: [['v', 1], ['p', 2], ['curve', 3]], side: [{ tex: R`y = a(x - 3)^2 + 1`, at: 1 }, { tex: R`9 = 4a + 1`, at: 2 }, { tex: R`a = 2`, at: 3, strong: true }] },
    },
    {
      ch: 2, say: 'Zeros negative four and zero, through negative three comma six. [[1]]Intercept form: y equals a times x plus four, times x. [[2]]Plug in negative three comma six: six equals a times one times negative three, so six equals negative three a. [[3]]a equals negative two: y equals negative two x times x plus four.',
      view: { kind: 'plane', layout: 'zp', reveal: [['z', 1], ['p', 2], ['curve', 3]], side: [{ tex: R`y = a(x + 4)x`, at: 1 }, { tex: R`6 = a(1)(-3)`, at: 2 }, { tex: R`a = -2`, at: 3, strong: true }] },
    },
    {
      ch: 3, say: 'Converting between forms: [[1]]vertex to standard: square the binomial and distribute. Two times x minus three squared plus one is two x squared minus twelve x plus nineteen. [[2]]Standard to vertex: find x equals negative b over two a, then the y. [[3]]Standard to intercept: factor, or find the zeros.',
      view: { kind: 'lines', lines: [
        { tex: R`2(x - 3)^2 + 1 = 2x^2 - 12x + 19`, at: 1 },
        { tex: R`ax^2 + bx + c \to h = -\tfrac{b}{2a},\ k = f(h)`, at: 2 },
        { tex: R`x^2 - 8x + 12 = (x - 2)(x - 6)`, at: 3, glow: true },
      ] },
    },
    {
      ch: 4, say: 'Your turn! A parabola has zeros negative one and three, and passes through one comma negative eight. Find a.',
      countdown: 10,
      view: { kind: 'try', tex: R`\text{zeros } -1,\ 3;\ \text{point } (1, -8)`, hint: ['y = a(x + 1)(x − 3)', 'Plug in (1, −8)'] },
    },
    {
      ch: 4, say: '[[1]]y equals a times x plus one, times x minus three. [[2]]At x equals one: negative eight equals a times two times negative two, which is negative four a. [[3]]a equals two.',
      view: { kind: 'lines', lines: [
        { tex: R`y = a(x + 1)(x - 3)`, at: 1 },
        { tex: R`-8 = a(2)(-2) = -4a`, at: 2 },
        { tex: R`a = 2`, at: 3, glow: true },
      ] },
    },
    {
      ch: 5, say: 'Recap. [[1]]Vertex given: vertex form. Zeros given: intercept form. [[2]]Plug in one more point to find a. [[3]]Convert forms by expanding, using negative b over two a, or factoring.',
      view: { kind: 'recap', items: [
        { text: 'Vertex → vertex form; zeros → intercept form.', at: 1 },
        { text: 'One more point finds a.', at: 2 },
        { text: 'Convert: expand, −b/2a, or factor.', at: 3 },
      ] },
    },
    {
      ch: 5, say: 'That wraps up Unit one. Next, Unit two: solving quadratics with the quadratic formula. Great work!',
      view: { kind: 'title', kicker: 'UP NEXT · UNIT 2', title: 'The quadratic', em: 'formula', sub: 'Solve any quadratic' },
    },
  ],
}
