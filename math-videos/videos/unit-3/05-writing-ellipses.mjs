// Unit 3, Lesson 5 video script: writing equations of ellipses.
// Based on Day 5 notes (Examples 2 and 4), HW #8 Ellipses #9, and HW #5 #3.
const R = String.raw

export default {
  id: '05-writing-ellipses',
  tag: 'UNIT 3 · LESSON 5 · WRITING ELLIPSES',
  chapters: ['Three things', 'From vertices & foci', 'Using the definition', 'Your turn', 'Recap'],
  layouts: {
    a: { type: 'conic', conic: { kind: 'ellipse', h: 0, k: 0, X2: 36, Y2: 32 }, window: [-8, 8, -8, 8] },
    b: { type: 'conic', conic: { kind: 'ellipse', h: 2, k: 1, X2: 4, Y2: 9 }, window: [-4, 8, -5, 7] },
    c: { type: 'conic', conic: { kind: 'ellipse', h: 0, k: 0, X2: 81, Y2: 45 }, window: [-11, 11, -11, 11] },
    turn: { type: 'conic', conic: { kind: 'ellipse', h: 2, k: 0, X2: 16, Y2: 12 }, window: [-4, 8, -6, 6] },
  },
  scenes: [
    {
      ch: 0, say: 'Now let us write an ellipse’s equation from its clues. It always comes down to three things.',
      view: { kind: 'title', kicker: 'UNIT 3 · LESSON 5', title: 'Writing', em: 'ellipse equations', sub: 'Center first, then a and b.' },
    },
    {
      ch: 0, say: '[[1]]The center: the midpoint of the vertices, or of the foci. [[2]]a: the distance from the center to a vertex. [[3]]b: the distance from the center to a co-vertex. If you know two of a, b, and c, use c squared equals a squared minus b squared.',
      view: { kind: 'cards', title: 'You need three things', cards: [
        { head: 'Center', text: 'midpoint of vertices or foci', at: 1 },
        { head: 'a', text: 'center → vertex', at: 2 },
        { head: 'b', tex: R`c^2 = a^2 - b^2`, text: 'center → co-vertex', at: 3, dark: true },
      ] },
    },
    {
      ch: 1, say: 'Vertices plus or minus six, zero, and foci plus or minus two, zero. [[1]]The center is the origin, and the vertices are left and right, so it is horizontal, with a equal to six. [[2]]c is two, so b squared is thirty-six minus four, which is thirty-two. [[3]]x squared over thirty-six, plus y squared over thirty-two, equals one.',
      view: { kind: 'conic', layout: 'a', title: R`\text{vertices } (\pm6, 0),\ \text{foci } (\pm2, 0)`, reveal: [['vertices', 0], ['foci', 0], ['center', 1], ['coVertices', 2], ['curve', 3]], side: [{ tex: R`\text{center } (0, 0),\ a = 6`, at: 1 }, { tex: R`b^2 = 36 - 4 = 32`, at: 2 }, { tex: R`\dfrac{x^2}{36} + \dfrac{y^2}{32} = 1`, at: 3, strong: true }] },
    },
    {
      ch: 1, say: 'Vertices two, minus two, and two, four, with a minor axis four units long. [[1]]The midpoint is two, one, and the vertices are above and below: vertical, with a equal to three. [[2]]The minor axis is two b, so b is two. [[3]]x minus two squared over four, plus y minus one squared over nine, equals one.',
      view: { kind: 'conic', layout: 'b', title: R`\text{vertices } (2, -2),\ (2, 4);\ \text{minor } 4`, reveal: [['vertices', 0], ['center', 1], ['coVertices', 2], ['curve', 3]], side: [{ tex: R`\text{center } (2, 1),\ a = 3`, at: 1 }, { tex: R`2b = 4 \Rightarrow b = 2`, at: 2 }, { tex: R`\dfrac{(x - 2)^2}{4} + \dfrac{(y - 1)^2}{9} = 1`, at: 3, strong: true }] },
    },
    {
      ch: 2, say: 'Here is a clever one. The foci are plus or minus six, zero, and the point six, five is on the ellipse. [[1]]Use the definition: the distances to the foci add up to two a. [[2]]From six, five to six, zero is five. To minus six, zero is thirteen. Five plus thirteen is eighteen, so a is nine. [[3]]Then b squared is eighty-one minus thirty-six, which is forty-five.',
      view: { kind: 'conic', layout: 'c', title: R`\text{foci } (\pm6, 0),\ \text{point } (6, 5)`, reveal: [['foci', 0], ['vertices', 2], ['curve', 3]], dots: [{ x: 6, y: 5, at: 0 }], side: [{ tex: R`d_1 + d_2 = 2a`, at: 1 }, { tex: R`5 + 13 = 18 \Rightarrow a = 9`, at: 2 }, { tex: R`\dfrac{x^2}{81} + \dfrac{y^2}{45} = 1`, at: 3, strong: true }] },
    },
    {
      ch: 3, say: 'Your turn! Write the ellipse with foci zero, zero, and four, zero, and a major axis of length eight.',
      countdown: 10,
      view: { kind: 'try', tex: R`\text{foci } (0, 0),\ (4, 0);\ \ \text{major axis } 8`, hint: ['Center', 'a from the major axis', 'b² = a² − c²'] },
    },
    {
      ch: 3, say: '[[1]]The center is the midpoint, two, zero, and c is two. [[2]]The major axis is two a, which is eight, so a is four. [[3]]b squared is sixteen minus four, twelve. So x minus two squared over sixteen, plus y squared over twelve, equals one. You got it!',
      view: { kind: 'conic', layout: 'turn', title: R`\text{foci } (0, 0),\ (4, 0);\ 2a = 8`, reveal: [['foci', 0], ['center', 1], ['vertices', 2], ['coVertices', 3], ['curve', 3]], side: [{ tex: R`\text{center } (2, 0),\ c = 2`, at: 1 }, { tex: R`a = 4`, at: 2 }, { tex: R`\dfrac{(x - 2)^2}{16} + \dfrac{y^2}{12} = 1`, at: 3, strong: true }] },
    },
    {
      ch: 4, say: 'Recap. [[1]]Find the center first: it is the midpoint. [[2]]The direction of the vertices or foci gives the major axis. [[3]]a is center to vertex, b is center to co-vertex. [[4]]Missing one? Use c squared equals a squared minus b squared, or the definition: the distances add up to two a.',
      view: { kind: 'recap', items: [
        { text: 'Center: the midpoint.', at: 1 },
        { text: 'Vertices/foci direction → major axis.', at: 2 },
        { text: 'a: center → vertex. b: center → co-vertex.', at: 3 },
        { tex: R`c^2 = a^2 - b^2 \ \text{ or } \ d_1 + d_2 = 2a`, at: 4 },
      ] },
    },
    {
      ch: 4, say: 'Next up: hyperbolas, two branches and their asymptotes. See you there!',
      view: { kind: 'title', kicker: 'UP NEXT · LESSON 6', title: 'Hyperbolas', em: 'two branches', sub: 'The box and the asymptotes' },
    },
  ],
}
