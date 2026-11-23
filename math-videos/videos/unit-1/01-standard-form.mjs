// Unit 1, Lesson 1 video script: graphing quadratics in standard form. Based on Day 1 notes (Examples 1 and 3) and HW #1.
const R = String.raw
const O = '#CC5833'
const f = x => -x * x + 2 * x + 4

export default {
  id: '01-standard-form',
  tag: 'UNIT 1 · LESSON 1 · STANDARD FORM',
  chapters: ['Parabolas', 'The vertex', 'Graphing', 'Domain & range', 'Your turn', 'Recap'],
  layouts: {
    ex3: { type: 'plane', window: [-4, 6, -4, 6], tex: R`y = -x^2 + 2x + 4`, items: [
      { key: 'axis', kind: 'axis', x: 1 },
      { key: 'v', kind: 'dots', pts: [[1, 5]], style: 'vertex', labels: true },
      { key: 'right', kind: 'dots', pts: [[2, 4], [3, 1]], style: 'key' },
      { key: 'left', kind: 'dots', pts: [[0, 4], [-1, 1]], style: 'key' },
      { key: 'curve', kind: 'fn', f },
      { key: 'range', kind: 'shade', f: () => 5, side: 'below' },
    ] },
  },
  scenes: [
    {
      ch: 0, say: 'Welcome to Unit one: quadratic functions. Their graphs are U-shaped curves called parabolas.',
      view: { kind: 'title', kicker: 'UNIT 1 · LESSON 1', title: 'Graphing', em: 'quadratics', sub: 'Standard form: y = ax² + bx + c.' },
    },
    {
      ch: 0, say: 'In y equals a x squared plus b x plus c, [[1]]a tells you the direction: positive opens up, negative opens down. [[2]]a also sets the width: bigger than one is narrower than x squared, smaller than one is wider. [[3]]The turning point is the vertex: a minimum if it opens up, a maximum if it opens down.',
      view: { kind: 'cards', title: 'y = ax² + bx + c', cards: [
        { head: 'Direction', tex: R`a > 0 \cup \quad a < 0 \cap`, at: 1 },
        { head: 'Width', tex: R`|a| > 1 \text{ narrow},\ |a| < 1 \text{ wide}`, at: 2 },
        { head: 'Vertex', text: 'minimum or maximum', at: 3, dark: true },
      ] },
    },
    {
      ch: 1, say: 'The vertex is hidden in standard form, so use a formula. [[1]]The axis of symmetry is x equals negative b over two a. [[2]]Plug that x back in to get the y-coordinate of the vertex.',
      view: { kind: 'lines', title: 'Find the vertex', lines: [
        { tex: R`x = -\dfrac{b}{2a}`, at: 1, box: true },
        { tex: R`y = f\left(-\dfrac{b}{2a}\right)`, at: 2 },
      ] },
    },
    {
      ch: 1, say: 'Try y equals negative x squared plus two x plus four. [[1]]a is negative one and b is two. [[2]]x equals negative two over two times negative one, which is one. [[3]]Plug in one: negative one plus two plus four is five. The vertex is one comma five, a maximum.',
      view: { kind: 'lines', lines: [
        { tex: R`y = -x^2 + 2x + 4` },
        { tex: R`a = -1,\ b = 2`, at: 1 },
        { tex: R`x = -\dfrac{2}{2(-1)} = {\color{${O}}1}`, at: 2 },
        { tex: R`y = -1 + 2 + 4 = 5:\ \text{vertex } (1, 5)`, at: 3, glow: true },
      ] },
    },
    {
      ch: 2, say: 'Now graph it. [[1]]Plot the vertex and draw the dashed axis x equals one. [[2]]Plot two points on one side: two comma four and three comma one. [[3]]Mirror them across the axis to zero comma four and negative one comma one. [[4]]Draw the parabola through all five points.',
      view: { kind: 'plane', layout: 'ex3', reveal: [['v', 1], ['axis', 1], ['right', 2], ['left', 3], ['curve', 4]], side: [{ tex: R`\text{vertex } (1, 5)`, at: 1 }, { tex: R`(2, 4),\ (3, 1)`, at: 2 }, { tex: R`\text{mirror: } (0, 4),\ (-1, 1)`, at: 3 }] },
    },
    {
      ch: 3, say: '[[1]]The domain of every quadratic is all real numbers: any x works. [[2]]The range depends on the vertex. This one opens down from five, so y is less than or equal to five.',
      view: { kind: 'plane', layout: 'ex3', reveal: [['range', 2]], side: [{ tex: R`D: (-\infty, \infty)`, at: 1 }, { tex: R`R: y \le 5`, at: 2, strong: true }] },
    },
    {
      ch: 4, say: 'Your turn! Find the axis of symmetry of y equals two x squared minus eight x plus three.',
      countdown: 10,
      view: { kind: 'try', tex: R`y = 2x^2 - 8x + 3`, hint: ['x = −b / 2a'] },
    },
    {
      ch: 4, say: '[[1]]a is two and b is negative eight. [[2]]x equals negative negative eight over two times two: eight over four, which is two.',
      view: { kind: 'lines', lines: [
        { tex: R`a = 2,\ b = -8`, at: 1 },
        { tex: R`x = -\dfrac{-8}{2(2)} = 2`, at: 2, glow: true },
      ] },
    },
    {
      ch: 5, say: 'Recap. [[1]]a decides up or down, and narrow or wide. [[2]]The axis is x equals negative b over two a; plug it in for the vertex. [[3]]Graph: vertex, axis, two points, mirror. [[4]]Domain is all reals; range starts at the vertex.',
      view: { kind: 'recap', items: [
        { text: 'a: up/down and narrow/wide.', at: 1 },
        { text: 'Axis x = −b/2a; plug in for the vertex.', at: 2 },
        { text: 'Graph: vertex, axis, two points, mirror.', at: 3 },
        { text: 'Domain: all reals. Range: from the vertex.', at: 4 },
      ] },
    },
    {
      ch: 5, say: 'Next up: transformations and vertex form. See you there!',
      view: { kind: 'title', kicker: 'UP NEXT · LESSON 2', title: 'Transformations', em: 'and vertex form', sub: 'Move y = x² anywhere' },
    },
  ],
}
