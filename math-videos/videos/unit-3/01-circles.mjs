// Unit 3, Lesson 1 video script: circles. Based on Day 1 notes (Examples 1A, 2A, 3B, 3C) and HW #1 #10.
const R = String.raw

export default {
  id: '01-circles',
  tag: 'UNIT 3 · LESSON 1 · CIRCLES',
  chapters: ['What is a circle?', 'Standard form', 'Complete the square', 'Your turn', 'Recap'],
  layouts: {
    ex1: { type: 'conic', conic: { kind: 'circle', h: 5, k: -3, r2: 9 } },
    ex3: { type: 'conic', conic: { kind: 'circle', h: 5, k: -2, r2: 12 } },
    turn: { type: 'conic', conic: { kind: 'circle', h: 3, k: -3, r2: 9 } },
  },
  scenes: [
    {
      ch: 0, say: 'Welcome to conic sections! We start with the simplest one: the circle.',
      view: { kind: 'title', kicker: 'UNIT 3 · LESSON 1', title: 'Circles', em: 'center & radius', sub: 'One point, one distance.' },
    },
    {
      ch: 0, say: 'Here is a circle. [[1]]Its center is the point five, minus three. [[2]]Every point on the circle is exactly three units from the center. That distance is the radius. [[3]]So four easy points are three units right, left, up, and down.',
      view: { kind: 'conic', layout: 'ex1', title: R`(x - 5)^2 + (y + 3)^2 = 9`, reveal: [['center', 1], ['curve', 2], ['points', 3]], side: [{ tex: R`\text{center } (5, -3)`, at: 1 }, { tex: R`\text{radius } 3`, at: 2, strong: true }] },
    },
    {
      ch: 1, say: 'The standard form of a circle is x minus h, squared, plus y minus k, squared, equals r squared. [[1]]The center is h comma k. Careful: use the opposite signs of the numbers inside the parentheses. [[2]]So x minus five and y plus three give the center five, minus three. [[3]]The right side is r squared. Nine means the radius is three.',
      view: { kind: 'lines', lines: [
        { tex: R`(x - h)^2 + (y - k)^2 = r^2`, box: true },
        { tex: R`\text{center } (h, k):\ \text{opposite signs}`, at: 1 },
        { tex: R`(x - 5)^2 + (y + 3)^2 = 9 \;\Rightarrow\; (5, -3)`, at: 2 },
        { tex: R`r^2 = 9 \;\Rightarrow\; r = 3`, at: 3, glow: true },
      ] },
    },
    {
      ch: 1, say: 'Sometimes it is almost in standard form. y squared equals four minus x squared. [[1]]Just add x squared to both sides. [[2]]That is a circle centered at the origin, with radius two.',
      view: { kind: 'lines', lines: [
        { tex: R`y^2 = 4 - x^2` },
        { tex: R`x^2 + y^2 = 4`, at: 1 },
        { tex: R`\text{center } (0, 0),\quad r = 2`, at: 2, glow: true },
      ] },
    },
    {
      ch: 2, say: 'But what about x squared plus y squared minus ten x plus four y plus seventeen equals zero? [[1]]First, group the x terms and the y terms, and move the seventeen to the other side. [[2]]Now complete the square. Half of minus ten is minus five; squared, that is twenty-five. Half of four is two; squared, four. [[3]]Add both numbers to both sides. [[4]]Now each group is a perfect square: x minus five, squared, plus y plus two, squared, equals twelve.',
      view: { kind: 'lines', lines: [
        { tex: R`x^2 + y^2 - 10x + 4y + 17 = 0` },
        { tex: R`(x^2 - 10x) + (y^2 + 4y) = -17`, at: 1 },
        { tex: R`\left(\tfrac{-10}{2}\right)^2 = 25 \qquad \left(\tfrac{4}{2}\right)^2 = 4`, at: 2, box: true },
        { tex: R`(x^2 - 10x + 25) + (y^2 + 4y + 4) = -17 + 25 + 4`, at: 3 },
        { tex: R`(x - 5)^2 + (y + 2)^2 = 12`, at: 4, glow: true },
      ] },
    },
    {
      ch: 2, say: '[[1]]The center is five, minus two. [[2]]The radius is the square root of twelve, which is two root three, about three and a half. [[3]]Plot the points one radius away, and draw the circle.',
      view: { kind: 'conic', layout: 'ex3', title: R`(x - 5)^2 + (y + 2)^2 = 12`, reveal: [['center', 1], ['points', 3], ['curve', 3]], side: [{ tex: R`\text{center } (5, -2)`, at: 1 }, { tex: R`r = \sqrt{12} = 2\sqrt3 \approx 3.5`, at: 2, strong: true }] },
    },
    {
      ch: 2, say: 'One more trick. If x squared and y squared have a number in front, like sixteen, [[1]]divide every term by sixteen first. [[2]]Then complete the square as before: center minus one quarter, one, and radius three.',
      view: { kind: 'lines', lines: [
        { tex: R`16x^2 + 16y^2 + 8x - 32y = 127` },
        { tex: R`x^2 + y^2 + \tfrac12x - 2y = \tfrac{127}{16}`, at: 1 },
        { tex: R`\left(x + \tfrac14\right)^2 + (y - 1)^2 = 9`, at: 2, glow: true },
      ] },
    },
    {
      ch: 3, say: 'Your turn! Find the center and radius of x squared plus y squared minus six x plus six y plus nine equals zero.',
      countdown: 10,
      view: { kind: 'try', tex: R`x^2 + y^2 - 6x + 6y + 9 = 0`, hint: ['Group x and y', 'Complete the square', 'Center & radius'] },
    },
    {
      ch: 3, say: '[[1]]Group, and move the nine: x squared minus six x, plus y squared plus six y, equals minus nine. [[2]]Add nine and nine to both sides: x minus three, squared, plus y plus three, squared, equals nine. [[3]]Center three, minus three, and radius three. Great job!',
      view: { kind: 'conic', layout: 'turn', title: R`x^2 + y^2 - 6x + 6y + 9 = 0`, reveal: [['center', 3], ['curve', 3]], side: [{ tex: R`(x^2 - 6x) + (y^2 + 6y) = -9`, at: 1 }, { tex: R`(x - 3)^2 + (y + 3)^2 = 9`, at: 2 }, { tex: R`(3, -3),\ r = 3`, at: 3, strong: true }] },
    },
    {
      ch: 4, say: 'Recap. [[1]]Every point on a circle is the radius away from the center. [[2]]Standard form is x minus h, squared, plus y minus k, squared, equals r squared. [[3]]The center uses opposite signs; the radius is the square root of the right side. [[4]]From general form, group and complete the square.',
      view: { kind: 'recap', items: [
        { text: 'Circle: every point is r from the center.', at: 1 },
        { tex: R`(x - h)^2 + (y - k)^2 = r^2`, at: 2 },
        { text: 'Center: opposite signs. Radius: square root of the right side.', at: 3 },
        { text: 'General form: group, then complete the square for x and y.', at: 4 },
      ] },
    },
    {
      ch: 4, say: 'Next up: parabolas, with a focus and a directrix. See you there!',
      view: { kind: 'title', kicker: 'UP NEXT · LESSON 2', title: 'Parabolas', em: 'focus & directrix', sub: 'Same distance from a point and a line' },
    },
  ],
}
