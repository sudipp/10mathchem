// Unit 3, Lesson 7 video script: writing equations of hyperbolas.
// Based on Day 7 notes (Example 2), HW #7 #7, HW #8 Hyperbolas #10, and HW #7 #4.
const R = String.raw

export default {
  id: '07-writing-hyperbolas',
  tag: 'UNIT 3 · LESSON 7 · WRITING HYPERBOLAS',
  chapters: ['Same plan', 'From foci', 'From asymptotes', 'Through a point', 'Your turn', 'Recap'],
  layouts: {
    a: { type: 'conic', conic: { kind: 'hyperbola', h: 2, k: 0, X2: 27, Y2: 9, vertical: true }, window: [-10, 14, -12, 12] },
    b: { type: 'conic', conic: { kind: 'hyperbola', h: 3, k: 2, X2: 9, Y2: 4 }, window: [-5, 11, -6, 10] },
    c: { type: 'conic', conic: { kind: 'hyperbola', h: 0, k: 0, X2: 12, Y2: 4, vertical: true }, window: [-9, 9, -9, 9] },
    turn: { type: 'conic', conic: { kind: 'hyperbola', h: 4, k: 5, X2: 9, Y2: 16, vertical: true }, window: [-4, 12, -3, 13] },
  },
  scenes: [
    {
      ch: 0, say: 'Writing a hyperbola’s equation works a lot like an ellipse, with one big change.',
      view: { kind: 'title', kicker: 'UNIT 3 · LESSON 7', title: 'Writing', em: 'hyperbola equations', sub: 'Center, a, b, and c.' },
    },
    {
      ch: 0, say: '[[1]]Find the center and the direction. [[2]]Find a, from the center to a vertex. [[3]]Then find b. Here is the one big change: for a hyperbola, c squared equals a squared plus b squared. So c is the biggest of the three.',
      view: { kind: 'lines', lines: [
        { tex: R`1)\ \text{center \& direction}`, at: 1 },
        { tex: R`2)\ a:\ \text{center} \to \text{vertex}`, at: 2 },
        { tex: R`3)\ b^2 = c^2 - a^2 \quad (c^2 = a^2 + b^2)`, at: 3, box: true },
      ] },
    },
    {
      ch: 1, say: 'Foci two, plus or minus six, and vertices two, plus or minus three. [[1]]The center is two, zero, and they are stacked vertically, so the y term goes first. [[2]]a is three, and c is six. [[3]]b squared is thirty-six minus nine, which is twenty-seven. [[4]]y squared over nine, minus x minus two squared over twenty-seven, equals one.',
      view: { kind: 'conic', layout: 'a', title: R`\text{foci } (2, \pm6),\ \text{vertices } (2, \pm3)`, reveal: [['vertices', 0], ['foci', 0], ['center', 1], ['box', 3], ['coVertices', 3], ['asymptotes', 3], ['curve', 4]], side: [{ tex: R`\text{center } (2, 0),\ \updownarrow`, at: 1 }, { tex: R`a = 3,\ c = 6`, at: 2 }, { tex: R`b^2 = 36 - 9 = 27`, at: 3 }, { tex: R`\dfrac{y^2}{9} - \dfrac{(x - 2)^2}{27} = 1`, at: 4, strong: true }] },
    },
    {
      ch: 2, say: 'Vertices zero, two and six, two, with asymptotes of slope two thirds. [[1]]The center is three, two. It is horizontal, with a equal to three. [[2]]For a horizontal hyperbola, the slope is b over a. Two thirds equals b over three, so b is two. [[3]]x minus three squared over nine, minus y minus two squared over four, equals one.',
      view: { kind: 'conic', layout: 'b', title: R`\text{vertices } (0, 2),\ (6, 2)`, reveal: [['vertices', 0], ['center', 1], ['asymptotes', 2], ['box', 2], ['curve', 3]], side: [{ tex: R`\text{asymptote slope } \pm\tfrac23`, at: 0 }, { tex: R`(3, 2),\ a = 3`, at: 1 }, { tex: R`\tfrac{b}{a} = \tfrac23 \Rightarrow b = 2`, at: 2 }, { tex: R`\dfrac{(x - 3)^2}{9} - \dfrac{(y - 2)^2}{4} = 1`, at: 3, strong: true }] },
    },
    {
      ch: 3, say: 'Foci zero, plus or minus four, and the point six, four is on the curve. [[1]]Use the definition: the difference of the distances to the foci is two a. [[2]]Six, four is six units from one focus and ten from the other. Ten minus six is four, so a is two. [[3]]b squared is sixteen minus four, twelve. So y squared over four, minus x squared over twelve, equals one.',
      view: { kind: 'conic', layout: 'c', title: R`\text{foci } (0, \pm4),\ \text{point } (6, 4)`, reveal: [['foci', 0], ['vertices', 2], ['asymptotes', 3], ['curve', 3]], dots: [{ x: 6, y: 4, at: 0 }], side: [{ tex: R`|d_1 - d_2| = 2a`, at: 1 }, { tex: R`10 - 6 = 4 \Rightarrow a = 2`, at: 2 }, { tex: R`\dfrac{y^2}{4} - \dfrac{x^2}{12} = 1`, at: 3, strong: true }] },
    },
    {
      ch: 4, say: 'Your turn! Write the hyperbola with vertices four, one and four, nine, and foci four, zero and four, ten.',
      countdown: 10,
      view: { kind: 'try', tex: R`\text{vertices } (4, 1),\ (4, 9);\ \ \text{foci } (4, 0),\ (4, 10)`, hint: ['Center & direction', 'a and c', 'b² = c² − a²'] },
    },
    {
      ch: 4, say: '[[1]]The center is four, five, and it is vertical. [[2]]a is four and c is five, so b squared is twenty-five minus sixteen, nine. [[3]]y minus five squared over sixteen, minus x minus four squared over nine, equals one. Fantastic!',
      view: { kind: 'conic', layout: 'turn', title: R`\text{vertices } (4, 1),\ (4, 9);\ \text{foci } (4, 0),\ (4, 10)`, reveal: [['vertices', 0], ['foci', 0], ['center', 1], ['box', 2], ['coVertices', 2], ['asymptotes', 2], ['curve', 3]], side: [{ tex: R`(4, 5),\ \updownarrow`, at: 1 }, { tex: R`b^2 = 25 - 16 = 9`, at: 2 }, { tex: R`\dfrac{(y - 5)^2}{16} - \dfrac{(x - 4)^2}{9} = 1`, at: 3, strong: true }] },
    },
    {
      ch: 5, say: 'Recap. [[1]]Find the center and the direction first. [[2]]a is center to vertex; c is center to focus. [[3]]For a hyperbola, b squared equals c squared minus a squared. [[4]]Asymptote slopes give b over a, and a point on the curve uses the difference of distances.',
      view: { kind: 'recap', items: [
        { text: 'Center and direction first.', at: 1 },
        { text: 'a: center → vertex. c: center → focus.', at: 2 },
        { tex: R`b^2 = c^2 - a^2`, at: 3 },
        { tex: R`\text{slope } \tfrac{b}{a} \text{ or } \tfrac{a}{b};\ \ |d_1 - d_2| = 2a`, at: 4 },
      ] },
    },
    {
      ch: 5, say: 'Last lesson: how to tell which conic an equation is, before doing any algebra. See you there!',
      view: { kind: 'title', kicker: 'UP NEXT · LESSON 8', title: 'Classifying', em: 'conics', sub: 'Which one is it?' },
    },
  ],
}
