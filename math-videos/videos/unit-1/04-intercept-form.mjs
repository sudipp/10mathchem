// Unit 1, Lesson 4 video script: intercept form. Based on Day 4 notes (Example 2A, D) and HW #4.
const R = String.raw
const f = x => -2 * (x + 3) * (x + 5)

export default {
  id: '04-intercept-form',
  tag: 'UNIT 1 · LESSON 4 · INTERCEPT FORM',
  chapters: ['Three forms', 'Zeros', 'Vertex', 'Graph', 'Your turn', 'Recap'],
  layouts: {
    ex: { type: 'plane', window: [-8, 2, -5, 5], tex: R`h(x) = -2(x + 3)(x + 5)`, items: [
      { key: 'zeros', kind: 'dots', pts: [[-3, 0], [-5, 0]], style: 'sol', labels: true },
      { key: 'axis', kind: 'axis', x: -4 },
      { key: 'v', kind: 'dots', pts: [[-4, 2]], style: 'vertex', labels: true },
      { key: 'curve', kind: 'fn', f },
    ] },
  },
  scenes: [
    {
      ch: 0, say: 'A quadratic can be written three ways. Intercept form shows the x-intercepts right away.',
      view: { kind: 'title', kicker: 'UNIT 1 · LESSON 4', title: 'Intercept', em: 'form', sub: 'y = a(x − p)(x − q)' },
    },
    {
      ch: 0, say: '[[1]]Standard form: the vertex is at x equals negative b over two a. [[2]]Vertex form: the vertex is h comma k. [[3]]Intercept form, a times x minus p times x minus q: the zeros are p and q, and the axis is halfway between them.',
      view: { kind: 'cards', cards: [
        { head: 'Standard', tex: R`ax^2 + bx + c`, text: 'x = −b/2a', at: 1 },
        { head: 'Vertex', tex: R`a(x - h)^2 + k`, text: 'vertex (h, k)', at: 2 },
        { head: 'Intercept', tex: R`a(x - p)(x - q)`, text: 'zeros p, q', at: 3, dark: true },
      ] },
    },
    {
      ch: 1, say: 'Take h of x equals negative two, times x plus three, times x plus five. [[1]]Set each factor to zero: x equals negative three and x equals negative five. Careful with the signs!',
      view: { kind: 'plane', layout: 'ex', reveal: [['zeros', 1]], side: [{ tex: R`x + 3 = 0 \Rightarrow -3`, at: 1 }, { tex: R`x + 5 = 0 \Rightarrow -5`, at: 1 }] },
    },
    {
      ch: 2, say: '[[1]]The axis of symmetry is halfway between the zeros: negative three plus negative five, over two, is negative four. [[2]]Plug in negative four: negative two, times negative one, times one, is two. The vertex is negative four comma two. a is negative, so it is a maximum.',
      view: { kind: 'plane', layout: 'ex', reveal: [['axis', 1], ['v', 2]], side: [{ tex: R`x = \dfrac{-3 + (-5)}{2} = -4`, at: 1 }, { tex: R`h(-4) = -2(-1)(1) = 2`, at: 2, strong: true }] },
    },
    {
      ch: 3, say: '[[1]]Draw the parabola down through the two zeros from the vertex. Its range is y less than or equal to two.',
      view: { kind: 'plane', layout: 'ex', reveal: [['curve', 1]], side: [{ tex: R`R: y \le 2`, at: 1, strong: true }] },
    },
    {
      ch: 3, say: 'One trap: [[1]]j of x equals negative two x times one minus x. The one minus x hides a minus sign. [[2]]Pull it out: j of x equals two x times x minus one. Now a is positive two, so it opens up, with zeros zero and one.',
      view: { kind: 'lines', lines: [
        { tex: R`j(x) = -2x(1 - x)`, at: 1 },
        { tex: R`= 2x(x - 1)\ \Rightarrow\ a = 2 > 0`, at: 2, glow: true },
      ] },
    },
    {
      ch: 4, say: 'Your turn! What is the vertex of y equals x minus two, times x minus eight?',
      countdown: 10,
      view: { kind: 'try', tex: R`y = (x - 2)(x - 8)`, hint: ['Zeros?', 'Halfway?'] },
    },
    {
      ch: 4, say: '[[1]]The zeros are two and eight, so the axis is x equals five. [[2]]Plug in five: three times negative three is negative nine. [[3]]The vertex is five comma negative nine.',
      view: { kind: 'lines', lines: [
        { tex: R`x = \dfrac{2 + 8}{2} = 5`, at: 1 },
        { tex: R`y = (3)(-3) = -9`, at: 2 },
        { tex: R`(5, -9)`, at: 3, glow: true },
      ] },
    },
    {
      ch: 5, say: 'Recap. [[1]]In intercept form, the zeros are p and q: watch the signs. [[2]]The axis is halfway: p plus q over two. [[3]]Plug the axis in to get the vertex.',
      view: { kind: 'recap', items: [
        { text: 'Zeros p and q (flip the signs).', at: 1 },
        { text: 'Axis x = (p + q) / 2.', at: 2 },
        { text: 'Plug it in for the vertex.', at: 3 },
      ] },
    },
    {
      ch: 5, say: 'Next up: writing quadratic functions. See you there!',
      view: { kind: 'title', kicker: 'UP NEXT · LESSON 5', title: 'Writing', em: 'quadratics', sub: 'Pick the form that fits the clues' },
    },
  ],
}
