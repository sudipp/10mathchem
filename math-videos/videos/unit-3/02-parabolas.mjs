// Unit 3, Lesson 2 video script: parabolas. Based on Day 2 notes (Examples 1 and 4) and HW #2 #11.
const R = String.raw

export default {
  id: '02-parabolas',
  tag: 'UNIT 3 · LESSON 2 · PARABOLAS',
  chapters: ['Focus & directrix', 'Vertex form', 'Finding p', 'Graphing', 'Your turn', 'Recap'],
  layouts: {
    def: { type: 'conic', conic: { kind: 'parabola', vertical: true, a: [1, 4], h: 0, k: 0 }, window: [-6, 6, -4, 8] },
    ex1: { type: 'conic', conic: { kind: 'parabola', vertical: false, a: [1, 2], h: 0, k: 0 }, window: [-4, 6, -5, 5] },
    ex4: { type: 'conic', conic: { kind: 'parabola', vertical: true, a: [-1, 4], h: 1, k: 1 }, window: [-5, 7, -8, 4] },
    turn: { type: 'conic', conic: { kind: 'parabola', vertical: false, a: [1, 4], h: -2, k: 3 }, window: [-6, 6, -3, 9] },
  },
  scenes: [
    {
      ch: 0, say: 'Parabolas are everywhere: satellite dishes, headlights, and the path of a thrown ball. Here is what makes one.',
      view: { kind: 'title', kicker: 'UNIT 3 · LESSON 2', title: 'Parabolas', em: 'focus & directrix', sub: 'Same distance from a point and a line.' },
    },
    {
      ch: 0, say: '[[1]]Start with a point, called the focus, [[2]]and a line, called the directrix. [[3]]A parabola is every point that is the same distance from the focus as from the directrix. [[4]]The vertex sits exactly halfway between them.',
      view: { kind: 'conic', layout: 'def', title: R`y = \tfrac14x^2`, reveal: [['focus', 1], ['directrix', 2], ['curve', 3], ['center', 4]], side: [{ tex: R`\text{focus } (0, 1)`, at: 1 }, { tex: R`\text{directrix } y = -1`, at: 2 }, { tex: R`\text{vertex } (0, 0)`, at: 4, strong: true }] },
    },
    {
      ch: 1, say: 'There are two vertex forms. [[1]]If x is squared, y equals a times x minus h, squared, plus k. It opens up when a is positive, and down when a is negative. [[2]]If y is squared, x equals a times y minus k, squared, plus h. It opens right when a is positive, and left when a is negative. In both, the vertex is h comma k.',
      view: { kind: 'cards', title: 'Vertex form', cards: [
        { head: 'Up or down', tex: R`y = a(x - h)^2 + k`, text: 'a > 0: up · a < 0: down', at: 1 },
        { head: 'Right or left', tex: R`x = a(y - k)^2 + h`, text: 'a > 0: right · a < 0: left', at: 2, dark: true },
      ] },
    },
    {
      ch: 2, say: 'To find the focus and directrix, use p equals one over four a. [[1]]p is the distance from the vertex to the focus. [[2]]The focus is p units from the vertex, inside the curve. [[3]]The directrix is p units the other way.',
      view: { kind: 'lines', lines: [
        { tex: R`p = \dfrac{1}{4a}`, box: true },
        { tex: R`\text{vertex to focus} = p`, at: 1 },
        { tex: R`\text{focus: } (h,\ k + p) \ \text{ or } \ (h + p,\ k)`, at: 2 },
        { tex: R`\text{directrix: } y = k - p \ \text{ or } \ x = h - p`, at: 3, glow: true },
      ] },
    },
    {
      ch: 3, say: 'Let us graph two x equals y squared. [[1]]First solve for x, the variable that is not squared: x equals one half y squared. [[2]]y is squared and a is positive, so it opens right, with its vertex at the origin. [[3]]p equals one over four times one half, which is one half.',
      view: { kind: 'lines', lines: [
        { tex: R`2x = y^2` },
        { tex: R`x = \tfrac12y^2`, at: 1 },
        { tex: R`a = \tfrac12 > 0:\ \text{opens right, vertex } (0, 0)`, at: 2 },
        { tex: R`p = \dfrac{1}{4 \cdot \frac12} = \tfrac12`, at: 3, glow: true },
      ] },
    },
    {
      ch: 3, say: '[[1]]The vertex is the origin. [[2]]The focus is one half unit to the right, [[3]]and the directrix is the line x equals minus one half. [[4]]Now draw the curve, opening right around the focus.',
      view: { kind: 'conic', layout: 'ex1', title: R`x = \tfrac12y^2`, reveal: [['center', 1], ['focus', 2], ['directrix', 3], ['curve', 4]], side: [{ tex: R`\text{vertex } (0, 0)`, at: 1 }, { tex: R`\text{focus } \left(\tfrac12,\ 0\right)`, at: 2 }, { tex: R`\text{directrix } x = -\tfrac12`, at: 3, strong: true }] },
    },
    {
      ch: 3, say: 'This one needs completing the square: x squared minus two x plus four y minus three equals zero. [[1]]Solve for y: four y equals minus x squared plus two x plus three. [[2]]Divide by four. [[3]]Then complete the square: y equals minus one quarter, times x minus one, squared, plus one.',
      view: { kind: 'lines', lines: [
        { tex: R`x^2 - 2x + 4y - 3 = 0` },
        { tex: R`4y = -x^2 + 2x + 3`, at: 1 },
        { tex: R`y = -\tfrac14x^2 + \tfrac12x + \tfrac34`, at: 2 },
        { tex: R`y = -\tfrac14(x - 1)^2 + 1`, at: 3, glow: true },
      ] },
    },
    {
      ch: 3, say: '[[1]]The vertex is one, one, and a is negative, so it opens down. [[2]]p equals one over four times minus one quarter, which is minus one. So the focus is one unit down, at one, zero, [[3]]and the directrix is one unit up: y equals two. [[4]]Then draw the parabola.',
      view: { kind: 'conic', layout: 'ex4', title: R`y = -\tfrac14(x - 1)^2 + 1`, reveal: [['center', 1], ['axis', 1], ['focus', 2], ['directrix', 3], ['curve', 4]], side: [{ tex: R`\text{vertex } (1, 1),\ \text{opens down}`, at: 1 }, { tex: R`p = -1:\ \text{focus } (1, 0)`, at: 2 }, { tex: R`\text{directrix } y = 2`, at: 3, strong: true }] },
    },
    {
      ch: 4, say: 'Your turn! Write four x equals y squared minus six y plus one in vertex form, and find the focus and directrix.',
      countdown: 10,
      view: { kind: 'try', tex: R`4x = y^2 - 6y + 1`, hint: ['Solve for x', 'Complete the square', 'p = 1/(4a)'] },
    },
    {
      ch: 4, say: '[[1]]Divide by four and complete the square: x equals one quarter, times y minus three, squared, minus two. [[2]]The vertex is minus two, three, and it opens right. [[3]]p is one, so the focus is minus one, three, [[4]]and the directrix is x equals minus three. Nice work!',
      view: { kind: 'conic', layout: 'turn', title: R`4x = y^2 - 6y + 1`, reveal: [['center', 2], ['curve', 2], ['focus', 3], ['directrix', 4]], side: [{ tex: R`x = \tfrac14(y - 3)^2 - 2`, at: 1 }, { tex: R`\text{vertex } (-2, 3),\ \text{right}`, at: 2 }, { tex: R`\text{focus } (-1, 3)`, at: 3 }, { tex: R`\text{directrix } x = -3`, at: 4, strong: true }] },
    },
    {
      ch: 5, say: 'Recap. [[1]]A parabola is the same distance from its focus and its directrix. [[2]]Solve for the variable that is not squared, then complete the square. [[3]]The sign of a gives the direction. [[4]]p equals one over four a: the focus is p inside, and the directrix is p outside.',
      view: { kind: 'recap', items: [
        { text: 'Same distance from the focus and the directrix.', at: 1 },
        { text: 'Solve for the non-squared variable, then complete the square.', at: 2 },
        { text: 'x squared: up or down. y squared: right or left. Sign of a decides.', at: 3 },
        { tex: R`p = \tfrac{1}{4a}:\ \text{focus } p \text{ inside, directrix } p \text{ outside}`, at: 4 },
      ] },
    },
    {
      ch: 5, say: 'Next up: writing the equations of circles and parabolas from clues. See you there!',
      view: { kind: 'title', kicker: 'UP NEXT · LESSON 3', title: 'Writing', em: 'equations', sub: 'Work backwards from the clues' },
    },
  ],
}
