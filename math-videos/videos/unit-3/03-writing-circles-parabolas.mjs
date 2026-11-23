// Unit 3, Lesson 3 video script: writing equations of circles and parabolas.
// Based on Day 3 notes (Examples 3, 5, 7), HW #3 #6 and #11, and HW #3 #24.
const R = String.raw

export default {
  id: '03-writing-circles-parabolas',
  tag: 'UNIT 3 · LESSON 3 · WRITING EQUATIONS',
  chapters: ['Circles', 'Parabola clues', 'Through a point', 'Your turn', 'Recap'],
  layouts: {
    diam: { type: 'conic', conic: { kind: 'circle', h: 5, k: 7, r2: 104 } },
    vf: { type: 'conic', conic: { kind: 'parabola', vertical: true, a: [1, 12], h: 2, k: 1 }, window: [-6, 10, -4, 12] },
    fd: { type: 'conic', conic: { kind: 'parabola', vertical: false, a: [1, 8], h: 0, k: 2 }, window: [-6, 6, -4, 8] },
    turn: { type: 'conic', conic: { kind: 'parabola', vertical: true, a: -1, h: -3, k: -1 }, window: [-8, 4, -8, 4] },
  },
  scenes: [
    {
      ch: 0, say: 'So far we have read the clues from an equation. Now let us go the other way, and build the equation from the clues.',
      view: { kind: 'title', kicker: 'UNIT 3 · LESSON 3', title: 'Writing', em: 'equations', sub: 'Circles and parabolas from their clues.' },
    },
    {
      ch: 0, say: 'For a circle you need two things: [[1]]the center, h comma k, [[2]]and r squared. [[3]]An area of pi r squared, or a circumference of two pi r, gives you r. [[4]]For example, an area of eleven pi means r squared is eleven.',
      view: { kind: 'lines', lines: [
        { tex: R`(x - h)^2 + (y - k)^2 = r^2`, box: true },
        { tex: R`\text{center } (h, k)`, at: 1 },
        { tex: R`r^2`, at: 2 },
        { tex: R`\text{Area} = \pi r^2 \qquad C = 2\pi r`, at: 3 },
        { tex: R`\text{Area } 11\pi \;\Rightarrow\; r^2 = 11`, at: 4, glow: true },
      ] },
    },
    {
      ch: 0, say: 'A trickier one: the ends of a diameter are seven, minus three, and three, seventeen. [[1]]The center is the midpoint: five, seven. [[2]]r squared is the squared distance from the center to an end: two squared plus ten squared, which is one hundred four. [[3]]So the equation is x minus five, squared, plus y minus seven, squared, equals one hundred four.',
      view: { kind: 'conic', layout: 'diam', title: R`\text{ends } (7, -3),\ (3, 17)`, reveal: [['center', 1], ['curve', 3]], dots: [{ x: 7, y: -3, at: 0 }, { x: 3, y: 17, at: 0 }], side: [{ tex: R`\text{midpoint } (5, 7)`, at: 1 }, { tex: R`r^2 = 2^2 + 10^2 = 104`, at: 2 }, { tex: R`(x - 5)^2 + (y - 7)^2 = 104`, at: 3, strong: true }] },
    },
    {
      ch: 1, say: 'For parabolas, sketch the clues first. Then find three things: [[1]]the vertex, which is halfway between the focus and the directrix, [[2]]the direction, which is toward the focus, [[3]]and p, the distance from the vertex to the focus. Then a equals one over four p.',
      view: { kind: 'cards', title: 'Parabola from clues', cards: [
        { head: 'Vertex', text: 'halfway between focus and directrix', at: 1 },
        { head: 'Direction', text: 'toward the focus', at: 2 },
        { head: 'p', tex: R`a = \dfrac{1}{4p}`, text: 'vertex → focus', at: 3, dark: true },
      ] },
    },
    {
      ch: 1, say: 'Vertex two, one, and focus two, four. [[1]]They share x equals two, so it opens up or down. The focus is above, so up. [[2]]p is four minus one, which is three. [[3]]a equals one over four times three: one twelfth. [[4]]So y equals one twelfth, times x minus two, squared, plus one.',
      view: { kind: 'conic', layout: 'vf', title: R`\text{vertex } (2, 1),\ \text{focus } (2, 4)`, reveal: [['center', 0], ['focus', 0], ['axis', 1], ['directrix', 2], ['curve', 4]], side: [{ text: 'Opens up', at: 1 }, { tex: R`p = 4 - 1 = 3`, at: 2 }, { tex: R`a = \tfrac{1}{12}`, at: 3 }, { tex: R`y = \tfrac{1}{12}(x - 2)^2 + 1`, at: 4, strong: true }] },
    },
    {
      ch: 1, say: 'Now just a focus, two, two, and a directrix, x equals minus two. [[1]]The vertex is halfway between them: zero, two. [[2]]The focus is to the right, so it opens right, with p equal to two. [[3]]a is one eighth, so x equals one eighth, times y minus two, squared.',
      view: { kind: 'conic', layout: 'fd', title: R`\text{focus } (2, 2),\ \text{directrix } x = -2`, reveal: [['focus', 0], ['directrix', 0], ['center', 1], ['curve', 3]], side: [{ tex: R`\text{vertex } (0, 2)`, at: 1 }, { tex: R`p = 2,\ \text{opens right}`, at: 2 }, { tex: R`x = \tfrac18(y - 2)^2`, at: 3, strong: true }] },
    },
    {
      ch: 2, say: 'If you know the vertex and one point, plug the point in. Vertex minus seven, minus five, through two, minus one, opening right. [[1]]Write x equals a, times y plus five, squared, minus seven. [[2]]Plug in two, minus one: two equals sixteen a, minus seven. [[3]]So a is nine sixteenths.',
      view: { kind: 'lines', lines: [
        { tex: R`\text{vertex } (-7, -5),\ \text{through } (2, -1)` },
        { tex: R`x = a(y + 5)^2 - 7`, at: 1 },
        { tex: R`2 = a(-1 + 5)^2 - 7 = 16a - 7`, at: 2 },
        { tex: R`a = \tfrac{9}{16}:\quad x = \tfrac{9}{16}(y + 5)^2 - 7`, at: 3, glow: true },
      ] },
    },
    {
      ch: 3, say: 'Your turn! Write the equation of the parabola with focus minus three, minus five fourths, and directrix y equals minus three fourths.',
      countdown: 10,
      view: { kind: 'try', tex: R`\text{focus } \left(-3,\ -\tfrac54\right),\ \ \text{directrix } y = -\tfrac34`, hint: ['Vertex halfway', 'Direction & p', 'a = 1/(4p)'] },
    },
    {
      ch: 3, say: '[[1]]The vertex is halfway between: minus three, minus one. [[2]]The focus is below the vertex, so it opens down, with p equal to minus one quarter. [[3]]a equals one over four p, which is minus one. So y equals minus, x plus three, squared, minus one. Well done!',
      view: { kind: 'conic', layout: 'turn', title: R`\text{focus } \left(-3, -\tfrac54\right),\ y = -\tfrac34`, reveal: [['focus', 0], ['directrix', 0], ['center', 1], ['curve', 3]], side: [{ tex: R`\text{vertex } (-3, -1)`, at: 1 }, { tex: R`p = -\tfrac14,\ \text{opens down}`, at: 2 }, { tex: R`y = -(x + 3)^2 - 1`, at: 3, strong: true }] },
    },
    {
      ch: 4, say: 'Recap. [[1]]For a circle, find the center and r squared. [[2]]For a parabola, find the vertex, halfway between the focus and the directrix. [[3]]The direction is toward the focus, and p is vertex to focus: a equals one over four p. [[4]]With a vertex and a point, plug in the point and solve for a.',
      view: { kind: 'recap', items: [
        { text: 'Circle: center (h, k) and r².', at: 1 },
        { text: 'Parabola vertex: halfway between focus and directrix.', at: 2 },
        { tex: R`\text{Toward the focus};\ a = \tfrac{1}{4p}`, at: 3 },
        { text: 'Vertex + point: plug the point in, solve for a.', at: 4 },
      ] },
    },
    {
      ch: 4, say: 'Next up: ellipses, stretched circles with two foci. See you there!',
      view: { kind: 'title', kicker: 'UP NEXT · LESSON 4', title: 'Ellipses', em: 'two foci', sub: 'Stretched circles' },
    },
  ],
}
