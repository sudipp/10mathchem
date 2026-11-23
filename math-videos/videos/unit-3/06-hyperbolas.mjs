// Unit 3, Lesson 6 video script: hyperbolas. Based on Day 6 notes (Examples 1, 2, 4) and HW #6 #6.
const R = String.raw

export default {
  id: '06-hyperbolas',
  tag: 'UNIT 3 · LESSON 6 · HYPERBOLAS',
  chapters: ['Two branches', 'Which way?', 'The box', 'Foci', 'Your turn', 'Recap'],
  layouts: {
    ex2: { type: 'conic', conic: { kind: 'hyperbola', h: 0, k: 0, X2: 49, Y2: 9 }, window: [-12, 12, -12, 12] },
    ex1: { type: 'conic', conic: { kind: 'hyperbola', h: 2, k: 3, X2: 16, Y2: 25, vertical: true }, window: [-8, 12, -7, 13] },
    ex4: { type: 'conic', conic: { kind: 'hyperbola', h: -4, k: 2, X2: 25, Y2: 9, vertical: true }, window: [-14, 6, -8, 12] },
    turn: { type: 'conic', conic: { kind: 'hyperbola', h: 3, k: -1, X2: 4, Y2: 16 }, window: [-5, 11, -9, 7] },
  },
  scenes: [
    {
      ch: 0, say: 'A hyperbola is two curves that bend away from each other. Let us see how to draw one, step by step.',
      view: { kind: 'title', kicker: 'UNIT 3 · LESSON 6', title: 'Hyperbolas', em: 'two branches', sub: 'The box and the asymptotes.' },
    },
    {
      ch: 0, say: 'A hyperbola has two branches. [[1]]Like an ellipse, it has two foci. [[2]]But this time, the difference of the distances to the foci stays the same. [[3]]As the branches spread out, they get closer and closer to two straight lines, called the asymptotes.',
      view: { kind: 'conic', layout: 'ex2', title: R`\dfrac{x^2}{49} - \dfrac{y^2}{9} = 1`, reveal: [['foci', 1], ['curve', 2], ['asymptotes', 3]], side: [{ text: 'Two foci', at: 1 }, { tex: R`|d_1 - d_2| \text{ is always the same}`, at: 2 }, { text: 'Branches hug the asymptotes', at: 3, strong: true }] },
    },
    {
      ch: 1, say: 'In standard form, one squared term is positive and the other is negative. [[1]]The positive term tells you the direction. x first: it opens left and right. y first: it opens up and down. [[2]]a squared is always under the positive term, even if it is the smaller number. [[3]]So y minus three squared over twenty-five, minus x minus two squared over sixteen, opens up and down, with a equal to five and b equal to four.',
      view: { kind: 'lines', lines: [
        { tex: R`\dfrac{(x - h)^2}{a^2} - \dfrac{(y - k)^2}{b^2} = 1 \;\leftrightarrow \qquad \dfrac{(y - k)^2}{a^2} - \dfrac{(x - h)^2}{b^2} = 1 \;\updownarrow`, at: 1, box: true },
        { tex: R`a^2 \text{ is under the positive term}`, at: 2 },
        { tex: R`\dfrac{(y - 3)^2}{25} - \dfrac{(x - 2)^2}{16} = 1:\ \ \updownarrow,\ a = 5,\ b = 4`, at: 3, glow: true },
      ] },
    },
    {
      ch: 2, say: 'Let us graph it. [[1]]The center is two, three. [[2]]Go a, five units, up and down: those are the vertices. [[3]]Go b, four units, left and right, and draw a dashed box through those four points. [[4]]The asymptotes are the diagonals of the box. [[5]]Now draw each branch from a vertex, bending toward the asymptotes.',
      view: { kind: 'conic', layout: 'ex1', title: R`\dfrac{(y - 3)^2}{25} - \dfrac{(x - 2)^2}{16} = 1`, reveal: [['center', 1], ['vertices', 2], ['coVertices', 3], ['box', 3], ['asymptotes', 4], ['curve', 5]], side: [{ tex: R`\text{center } (2, 3)`, at: 1 }, { tex: R`\text{vertices } (2, 8),\ (2, -2)`, at: 2 }, { text: 'Box: a up/down, b left/right', at: 3 }, { text: 'Diagonals = asymptotes', at: 4, strong: true }] },
    },
    {
      ch: 3, say: '[[1]]The asymptotes go through the center, with slope rise over run of the box: here, a over b, five fourths. [[2]]For a hyperbola, c squared equals a squared plus b squared. Twenty-five plus sixteen is forty-one, [[3]]so the foci are root forty-one, about six point four, above and below the center, outside the box.',
      view: { kind: 'lines', lines: [
        { tex: R`\text{slope } \pm\dfrac{a}{b} = \pm\dfrac54:\quad y - 3 = \pm\tfrac54(x - 2)`, at: 1 },
        { tex: R`c^2 = a^2 + b^2 = 25 + 16 = 41`, at: 2, box: true },
        { tex: R`\text{foci: } (2,\ 3 \pm \sqrt{41})`, at: 3, glow: true },
      ] },
    },
    {
      ch: 3, say: 'From general form, it works just like an ellipse. Twenty-five y squared minus nine x squared minus one hundred y minus seventy-two x minus two hundred sixty-nine equals zero. [[1]]Group, and factor out minus nine and twenty-five. [[2]]Complete the squares. The right side gets minus one hundred forty-four, and plus one hundred. [[3]]Then divide by two hundred twenty-five.',
      view: { kind: 'lines', lines: [
        { tex: R`25y^2 - 9x^2 - 100y - 72x - 269 = 0` },
        { tex: R`-9(x^2 + 8x) + 25(y^2 - 4y) = 269`, at: 1 },
        { tex: R`-9(x + 4)^2 + 25(y - 2)^2 = 269 - 144 + 100 = 225`, at: 2 },
        { tex: R`\dfrac{(y - 2)^2}{9} - \dfrac{(x + 4)^2}{25} = 1`, at: 3, glow: true },
      ] },
    },
    {
      ch: 3, say: '[[1]]The y term is positive, so it opens up and down, from the center minus four, two, with a equal to three and b equal to five. [[2]]Draw the box and its diagonals: slope three fifths. [[3]]Then the two branches.',
      view: { kind: 'conic', layout: 'ex4', title: R`\dfrac{(y - 2)^2}{9} - \dfrac{(x + 4)^2}{25} = 1`, reveal: [['center', 1], ['vertices', 1], ['coVertices', 2], ['box', 2], ['asymptotes', 2], ['curve', 3]], side: [{ tex: R`(-4, 2),\ a = 3,\ b = 5`, at: 1 }, { tex: R`\text{slope } \pm\tfrac35`, at: 2, strong: true }] },
    },
    {
      ch: 4, say: 'Your turn! Graph minus twenty-four x equals y squared minus nineteen plus two y minus four x squared. Find the center, the vertices, and the asymptotes.',
      countdown: 12,
      view: { kind: 'try', tex: R`-24x = y^2 - 19 + 2y - 4x^2`, hint: ['Everything on one side', 'Complete the squares', 'Box & asymptotes'] },
    },
    {
      ch: 4, say: '[[1]]Move everything over and complete the squares: four times x minus three, squared, minus y plus one, squared, equals sixteen. [[2]]Divide by sixteen: x minus three squared over four, minus y plus one squared over sixteen, equals one. [[3]]It opens left and right: the vertices are five, minus one, and one, minus one. [[4]]The slope is plus or minus two, so the asymptotes are y equals two x minus seven, and y equals minus two x plus five. Excellent!',
      view: { kind: 'conic', layout: 'turn', title: R`-24x = y^2 - 19 + 2y - 4x^2`, reveal: [['center', 2], ['vertices', 3], ['box', 3], ['coVertices', 3], ['curve', 3], ['asymptotes', 4]], side: [{ tex: R`4(x - 3)^2 - (y + 1)^2 = 16`, at: 1 }, { tex: R`\dfrac{(x - 3)^2}{4} - \dfrac{(y + 1)^2}{16} = 1`, at: 2 }, { tex: R`\text{vertices } (5, -1),\ (1, -1)`, at: 3 }, { tex: R`y = 2x - 7,\ \ y = -2x + 5`, at: 4, strong: true }] },
    },
    {
      ch: 5, say: 'Recap. [[1]]The positive term tells you the direction, and a squared goes under it. [[2]]Build the box: a along the transverse axis, b the other way. [[3]]The asymptotes are the diagonals of the box. [[4]]For the foci, c squared equals a squared plus b squared.',
      view: { kind: 'recap', items: [
        { text: 'Positive term = direction; a² is under it.', at: 1 },
        { text: 'Box: a along the axis, b the other way.', at: 2 },
        { text: 'Asymptotes: the box’s diagonals, through the center.', at: 3 },
        { tex: R`c^2 = a^2 + b^2`, at: 4 },
      ] },
    },
    {
      ch: 5, say: 'Next up: writing the equation of a hyperbola from its clues. See you there!',
      view: { kind: 'title', kicker: 'UP NEXT · LESSON 7', title: 'Writing', em: 'hyperbola equations', sub: 'c² = a² + b²' },
    },
  ],
}
