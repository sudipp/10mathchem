// Unit 1, Lesson 2 video script: transformations and vertex form. Based on Day 2 notes (Examples 1–4) and HW #2.
const R = String.raw

export default {
  id: '02-transformations',
  tag: 'UNIT 1 · LESSON 2 · TRANSFORMATIONS',
  chapters: ['Vertex form', 'Shifts', 'Reflections', 'Stretches', 'Your turn', 'Recap'],
  layouts: {
    shift: { type: 'plane', window: [-6, 6, -6, 6], tex: R`y = 2(x - 1)^2 - 4`, items: [
      { key: 'parent', kind: 'fn', f: x => x * x, alt: true },
      { key: 'right', kind: 'fn', f: x => (x - 1) ** 2, dashed: true },
      { key: 'down', kind: 'fn', f: x => (x - 1) ** 2 - 4, dashed: true },
      { key: 'final', kind: 'fn', f: x => 2 * (x - 1) ** 2 - 4 },
      { key: 'v', kind: 'dots', pts: [[1, -4]], style: 'vertex', labels: true },
    ] },
    reflect: { type: 'plane', window: [-5, 5, -5, 5], tex: R`y = -x^2`, items: [
      { key: 'parent', kind: 'fn', f: x => x * x, alt: true },
      { key: 'flip', kind: 'fn', f: x => -x * x },
    ] },
    turn: { type: 'plane', window: [-6, 6, -6, 6], tex: R`\text{Write the dashed parabola}`, items: [
      { key: 'parent', kind: 'fn', f: x => x * x, alt: true },
      { key: 'dash', kind: 'fn', f: x => -((x - 2) ** 2) - 2, dashed: true },
      { key: 'v', kind: 'dots', pts: [[2, -2]], style: 'vertex', labels: true },
    ] },
  },
  scenes: [
    {
      ch: 0, say: 'Every parabola is the basic parabola, y equals x squared, moved, flipped, or stretched. Vertex form shows exactly how.',
      view: { kind: 'title', kicker: 'UNIT 1 · LESSON 2', title: 'Transformations', em: 'and vertex form', sub: 'y = a(x − h)² + k' },
    },
    {
      ch: 0, say: 'In vertex form, y equals a times x minus h, squared, plus k, [[1]]the vertex is h comma k, and the axis is x equals h. [[2]]Watch the sign: x minus five means h is five, but x plus two means h is negative two.',
      view: { kind: 'lines', title: 'y = a(x − h)² + k', lines: [
        { tex: R`\text{vertex } (h, k),\ \text{axis } x = h`, at: 1, box: true },
        { tex: R`(x - 5)^2 \Rightarrow h = 5 \qquad (x + 2)^2 \Rightarrow h = -2`, at: 2 },
      ] },
    },
    {
      ch: 1, say: 'Let’s build y equals two times x minus one, squared, minus four. [[1]]Start with y equals x squared. [[2]]x minus one, inside the parentheses, shifts it right one: the opposite of what it looks like. [[3]]Minus four, outside, shifts it down four. [[4]]And the two stretches it, so it is narrower. The vertex is one comma negative four.',
      view: { kind: 'plane', layout: 'shift', reveal: [['parent', 1], ['right', 2], ['down', 3], ['final', 4], ['v', 4]], side: [{ tex: R`y = x^2`, at: 1 }, { tex: R`(x - 1):\ \text{right } 1`, at: 2 }, { tex: R`-4:\ \text{down } 4`, at: 3 }, { tex: R`a = 2:\ \text{stretch}`, at: 4, strong: true }] },
    },
    {
      ch: 2, say: 'Reflections flip the graph. [[1]]A minus sign outside, negative f of x, flips it over the x-axis: now it opens down. A minus sign inside, f of negative x, flips it over the y-axis.',
      view: { kind: 'plane', layout: 'reflect', reveal: [['parent', 0], ['flip', 1]], side: [{ tex: R`-f(x):\ \text{over the } x\text{-axis}`, at: 1, strong: true }, { tex: R`f(-x):\ \text{over the } y\text{-axis}`, at: 1 }] },
    },
    {
      ch: 3, say: 'Stretches change the width. [[1]]When the size of a is bigger than one, it is a vertical stretch: narrower. [[2]]When it is between zero and one, it is a shrink: wider.',
      view: { kind: 'cards', cards: [
        { head: 'Stretch', tex: R`y = 5x^2`, text: 'narrower', at: 1 },
        { head: 'Shrink', tex: R`y = \tfrac15x^2`, text: 'wider', at: 2, dark: true },
      ] },
    },
    {
      ch: 4, say: 'Your turn! Write the equation of the dashed parabola. It has the same shape as y equals x squared, but opens down.',
      countdown: 10,
      view: { kind: 'plane', layout: 'turn', reveal: [['parent', 0], ['dash', 0], ['v', 0]], side: [{ text: 'Vertex?', at: 0 }, { text: 'Up or down?', at: 0 }] },
    },
    {
      ch: 4, say: '[[1]]The vertex is two comma negative two: right two, down two. [[2]]It opens down with the same shape, so a is negative one. [[3]]y equals negative x minus two, squared, minus two.',
      view: { kind: 'lines', lines: [
        { tex: R`(h, k) = (2, -2)`, at: 1 },
        { tex: R`a = -1`, at: 2 },
        { tex: R`y = -(x - 2)^2 - 2`, at: 3, glow: true },
      ] },
    },
    {
      ch: 5, say: 'Recap. [[1]]Vertex form shows the vertex h comma k. [[2]]Inside shifts left or right, the opposite way. [[3]]Outside shifts up or down. [[4]]A negative a flips it; the size of a stretches or shrinks it.',
      view: { kind: 'recap', items: [
        { text: 'y = a(x − h)² + k → vertex (h, k).', at: 1 },
        { text: 'Inside: left/right (opposite sign).', at: 2 },
        { text: 'Outside: up/down.', at: 3 },
        { text: 'a < 0 flips; |a| stretches or shrinks.', at: 4 },
      ] },
    },
    {
      ch: 5, say: 'Next up: characteristics of quadratics, like intercepts and where the graph increases. See you there!',
      view: { kind: 'title', kicker: 'UP NEXT · LESSON 3', title: 'Characteristics', em: 'of quadratics', sub: 'Intercepts, domain, range, increasing' },
    },
  ],
}
