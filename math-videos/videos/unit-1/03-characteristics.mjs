// Unit 1, Lesson 3 video script: characteristics of quadratics. Based on Day 3 notes (Examples 1a and 2) and HW #3.
const R = String.raw
const f = x => -2 * x * x + 4 * x

export default {
  id: '03-characteristics',
  tag: 'UNIT 1 · LESSON 3 · CHARACTERISTICS',
  chapters: ['The list', 'Intercepts', 'Domain & range', 'Increasing', 'Your turn', 'Recap'],
  layouts: {
    ex: { type: 'plane', window: [-3, 4, -4, 4], tex: R`f(x) = -2x^2 + 4x`, items: [
      { key: 'curve', kind: 'fn', f },
      { key: 'v', kind: 'dots', pts: [[1, 2]], style: 'vertex', labels: true },
      { key: 'axis', kind: 'axis', x: 1 },
      { key: 'ints', kind: 'dots', pts: [[0, 0], [2, 0]], style: 'sol', labels: true },
      { key: 'up', kind: 'fn', f, to: 1, alt: true },
      { key: 'down', kind: 'fn', f, from: 1, dashed: true },
    ] },
  },
  scenes: [
    {
      ch: 0, say: 'Reading a parabola means naming its characteristics. Let’s go through the whole list with one example.',
      view: { kind: 'title', kicker: 'UNIT 1 · LESSON 3', title: 'Characteristics', em: 'of quadratics', sub: 'Everything a parabola can tell you.' },
    },
    {
      ch: 0, say: 'Here is f of x equals negative two x squared plus four x. [[1]]It opens down. The vertex is at x equals negative four over negative four, which is one, and f of one is two. So the vertex is one comma two. [[2]]The axis of symmetry is x equals one.',
      view: { kind: 'plane', layout: 'ex', reveal: [['curve', 0], ['v', 1], ['axis', 2]], side: [{ tex: R`\text{vertex } (1, 2)`, at: 1 }, { tex: R`\text{axis } x = 1`, at: 2 }] },
    },
    {
      ch: 1, say: '[[1]]The y-intercept is where x is zero: f of zero is zero. [[2]]The x-intercepts, or zeros, are where y is zero. Factor: negative two x times x minus two equals zero, so x equals zero and x equals two.',
      view: { kind: 'plane', layout: 'ex', reveal: [['ints', 2]], side: [{ tex: R`y\text{-int: } f(0) = 0`, at: 1 }, { tex: R`-2x(x - 2) = 0`, at: 2 }, { tex: R`\text{zeros } 0,\ 2`, at: 2, strong: true }] },
    },
    {
      ch: 2, say: '[[1]]The domain is all real numbers, negative infinity to infinity. [[2]]It opens down from a maximum of two, so the range is negative infinity to two, with a bracket at two.',
      view: { kind: 'lines', lines: [
        { tex: R`D: (-\infty, \infty)`, at: 1 },
        { tex: R`R: (-\infty, 2]`, at: 2, glow: true },
      ] },
    },
    {
      ch: 3, say: 'Read the graph left to right. [[1]]It goes up until the vertex: increasing on negative infinity to one. [[2]]Then it goes down: decreasing on one to infinity. Use parentheses, and use the x-value of the vertex.',
      view: { kind: 'plane', layout: 'ex', reveal: [['up', 1], ['down', 2]], side: [{ tex: R`\text{inc } (-\infty, 1)`, at: 1 }, { tex: R`\text{dec } (1, \infty)`, at: 2, strong: true }] },
    },
    {
      ch: 3, say: 'Bonus: zeros give you factored form. [[1]]r of x equals negative two x squared plus six x plus twenty has zeros five and negative two. [[2]]So r of x equals negative two, times x minus five, times x plus two.',
      view: { kind: 'lines', lines: [
        { tex: R`r(x) = -2x^2 + 6x + 20`, at: 1 },
        { tex: R`= -2(x - 5)(x + 2)`, at: 2, glow: true },
      ] },
    },
    {
      ch: 4, say: 'Your turn! y equals x minus three, squared, plus one. On which interval is it decreasing?',
      countdown: 10,
      view: { kind: 'try', tex: R`y = (x - 3)^2 + 1`, hint: ['Vertex?', 'Opens up or down?'] },
    },
    {
      ch: 4, say: '[[1]]The vertex is three comma one, and it opens up. [[2]]So it goes down until x equals three: decreasing on negative infinity to three.',
      view: { kind: 'lines', lines: [
        { tex: R`(3, 1),\ \text{opens up}`, at: 1 },
        { tex: R`\text{dec } (-\infty, 3)`, at: 2, glow: true },
      ] },
    },
    {
      ch: 5, say: 'Recap. [[1]]y-intercept: set x to zero. Zeros: set y to zero. [[2]]Domain is all reals; range starts at the vertex. [[3]]Increasing and decreasing switch at the vertex’s x.',
      view: { kind: 'recap', items: [
        { text: 'y-int: x = 0. Zeros: y = 0.', at: 1 },
        { text: 'Domain all reals; range from the vertex.', at: 2 },
        { text: 'Increase/decrease switch at the vertex.', at: 3 },
      ] },
    },
    {
      ch: 5, say: 'Next up: intercept form. See you there!',
      view: { kind: 'title', kicker: 'UP NEXT · LESSON 4', title: 'Intercept', em: 'form', sub: 'y = a(x − p)(x − q)' },
    },
  ],
}
