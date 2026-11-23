// Unit 3, Lesson 4 video script: ellipses. Based on Day 4 notes (Examples 1 and 4) and HW #4 #5.
const R = String.raw

export default {
  id: '04-ellipses',
  tag: 'UNIT 3 · LESSON 4 · ELLIPSES',
  chapters: ['Two foci', 'Standard form', 'Graphing', 'From general form', 'Your turn', 'Recap'],
  layouts: {
    ex1: { type: 'conic', conic: { kind: 'ellipse', h: 0, k: 0, X2: 4, Y2: 25 }, window: [-7, 7, -7, 7] },
    ex4: { type: 'conic', conic: { kind: 'ellipse', h: -3, k: 1, X2: 4, Y2: 1 }, window: [-8, 2, -4, 6] },
    turn: { type: 'conic', conic: { kind: 'ellipse', h: -2, k: 3, X2: 4, Y2: 9 }, window: [-8, 4, -3, 9] },
  },
  scenes: [
    {
      ch: 0, say: 'An ellipse looks like a stretched circle. Planets orbit the sun in ellipses!',
      view: { kind: 'title', kicker: 'UNIT 3 · LESSON 4', title: 'Ellipses', em: 'stretched circles', sub: 'Center, vertices, co-vertices, foci.' },
    },
    {
      ch: 0, say: 'An ellipse has two special points inside it, [[1]]called the foci. [[2]]For every point on the ellipse, the distances to the two foci add up to the same number. [[3]]For this one, that sum is ten.',
      view: { kind: 'conic', layout: 'ex1', title: R`\dfrac{x^2}{4} + \dfrac{y^2}{25} = 1`, reveal: [['foci', 1], ['curve', 2]], side: [{ text: 'Two foci inside', at: 1 }, { tex: R`d_1 + d_2 \text{ is always the same}`, at: 2 }, { tex: R`d_1 + d_2 = 2a = 10`, at: 3, strong: true }] },
    },
    {
      ch: 1, say: 'In standard form, an ellipse is x minus h squared over one number, plus y minus k squared over another, equals one. [[1]]The bigger denominator is a squared. It tells you the direction of the long, major axis. [[2]]Here, twenty-five is under y, so this ellipse is tall: vertical. [[3]]a is five, and b, from the smaller number four, is two.',
      view: { kind: 'lines', lines: [
        { tex: R`\dfrac{(x - h)^2}{\square} + \dfrac{(y - k)^2}{\square} = 1`, box: true },
        { tex: R`\text{larger denominator} = a^2 \;\to\; \text{major axis}`, at: 1 },
        { tex: R`\dfrac{x^2}{4} + \dfrac{y^2}{25} = 1:\ \ 25 \text{ under } y \;\to\; \text{vertical}`, at: 2 },
        { tex: R`a = 5,\quad b = 2`, at: 3, glow: true },
      ] },
    },
    {
      ch: 2, say: '[[1]]From the center, go a, five units, up and down. Those are the vertices. [[2]]Go b, two units, left and right. Those are the co-vertices. [[3]]Then connect them with a smooth oval.',
      view: { kind: 'conic', layout: 'ex1', title: R`\dfrac{x^2}{4} + \dfrac{y^2}{25} = 1`, reveal: [['center', 0], ['vertices', 1], ['coVertices', 2], ['curve', 3]], side: [{ tex: R`\text{vertices } (0, \pm 5)`, at: 1 }, { tex: R`\text{co-vertices } (\pm 2, 0)`, at: 2, strong: true }] },
    },
    {
      ch: 2, say: 'Where are the foci? [[1]]For an ellipse, c squared equals a squared minus b squared. [[2]]Here, twenty-five minus four is twenty-one. [[3]]So the foci are root twenty-one, about four point six, above and below the center.',
      view: { kind: 'lines', lines: [
        { tex: R`c^2 = a^2 - b^2`, at: 1, box: true },
        { tex: R`c^2 = 25 - 4 = 21`, at: 2 },
        { tex: R`\text{foci: } (0, \pm\sqrt{21}) \approx (0, \pm 4.6)`, at: 3, glow: true },
      ] },
    },
    {
      ch: 3, say: 'Now from general form: x squared plus four y squared plus six x minus eight y plus nine equals zero. [[1]]Group, and factor four out of the y terms. [[2]]Complete each square. Inside the y group we add one, but it is multiplied by four, so add four to the right side. [[3]]Then divide by four, so the right side is one.',
      view: { kind: 'lines', lines: [
        { tex: R`x^2 + 4y^2 + 6x - 8y + 9 = 0` },
        { tex: R`(x^2 + 6x) + 4(y^2 - 2y) = -9`, at: 1 },
        { tex: R`(x + 3)^2 + 4(y - 1)^2 = -9 + 9 + 4 = 4`, at: 2 },
        { tex: R`\dfrac{(x + 3)^2}{4} + \dfrac{(y - 1)^2}{1} = 1`, at: 3, glow: true },
      ] },
    },
    {
      ch: 3, say: '[[1]]The center is minus three, one. Four is the bigger number, and it is under x, so the ellipse is wide: a is two, and b is one. [[2]]The vertices are two units left and right. [[3]]The co-vertices are one unit up and down. [[4]]And c squared is four minus one, three, so the foci are root three from the center.',
      view: { kind: 'conic', layout: 'ex4', title: R`\dfrac{(x + 3)^2}{4} + \dfrac{(y - 1)^2}{1} = 1`, reveal: [['center', 1], ['vertices', 2], ['coVertices', 3], ['curve', 3], ['foci', 4]], side: [{ tex: R`(-3, 1),\ a = 2,\ b = 1`, at: 1 }, { tex: R`\text{vertices } (-1, 1),\ (-5, 1)`, at: 2 }, { tex: R`\text{foci } (-3 \pm \sqrt3,\ 1)`, at: 4, strong: true }] },
    },
    {
      ch: 4, say: 'Your turn! Write nine x squared plus four y squared plus thirty-six x minus twenty-four y plus thirty-six equals zero in standard form, and find the vertices and foci.',
      countdown: 12,
      view: { kind: 'try', tex: R`9x^2 + 4y^2 + 36x - 24y + 36 = 0`, hint: ['Group & factor', 'Complete the squares', 'Divide to get 1'] },
    },
    {
      ch: 4, say: '[[1]]Group and factor: nine times x plus two, squared, plus four times y minus three, squared, equals thirty-six. [[2]]Divide by thirty-six: x plus two squared over four, plus y minus three squared over nine, equals one. [[3]]Nine is under y, so it is vertical: the vertices are minus two, six, and minus two, zero. [[4]]c squared is nine minus four, five, so the foci are minus two, three plus or minus root five. Great work!',
      view: { kind: 'conic', layout: 'turn', title: R`9x^2 + 4y^2 + 36x - 24y + 36 = 0`, reveal: [['center', 2], ['vertices', 3], ['coVertices', 3], ['curve', 3], ['foci', 4]], side: [{ tex: R`9(x + 2)^2 + 4(y - 3)^2 = 36`, at: 1 }, { tex: R`\dfrac{(x + 2)^2}{4} + \dfrac{(y - 3)^2}{9} = 1`, at: 2 }, { tex: R`\text{vertices } (-2, 6),\ (-2, 0)`, at: 3 }, { tex: R`\text{foci } (-2,\ 3 \pm \sqrt5)`, at: 4, strong: true }] },
    },
    {
      ch: 5, say: 'Recap. [[1]]The distances to the two foci always add up to two a. [[2]]Standard form equals one, and the bigger denominator, a squared, sets the major axis. [[3]]Vertices are a from the center; co-vertices are b. [[4]]Foci: c squared equals a squared minus b squared.',
      view: { kind: 'recap', items: [
        { tex: R`d_1 + d_2 = 2a`, at: 1 },
        { text: 'Equal to 1; the bigger denominator (a²) sets the major axis.', at: 2 },
        { text: 'Vertices: a from the center. Co-vertices: b.', at: 3 },
        { tex: R`c^2 = a^2 - b^2`, at: 4 },
      ] },
    },
    {
      ch: 5, say: 'Next up: writing the equation of an ellipse from its clues. See you there!',
      view: { kind: 'title', kicker: 'UP NEXT · LESSON 5', title: 'Writing', em: 'ellipse equations', sub: 'Center first, then a and b' },
    },
  ],
}
