// Unit 2, Lesson 4 video script: linear–quadratic systems. Based on Day 16 notes (Examples 1A, 2A, 2C) and HW #16.
const R = String.raw

export default {
  id: '04-linear-quadratic-systems',
  tag: 'UNIT 2 · LESSON 4 · LINE + PARABOLA',
  chapters: ['0, 1, or 2', 'Check a point', 'Substitution', 'No solution', 'Your turn', 'Recap'],
  layouts: {
    ex: { type: 'plane', window: [-5, 6, -2, 16], tex: R`y = 2x + 7,\ \ y = x^2 + 4`, items: [
      { key: 'para', kind: 'fn', f: x => x * x + 4 },
      { key: 'line', kind: 'fn', f: x => 2 * x + 7, alt: true },
      { key: 'sol', kind: 'dots', pts: [[3, 13], [-1, 5]], style: 'sol', labels: true },
    ] },
    none: { type: 'plane', window: [-5, 4, -8, 8], tex: R`y = -4x - 7,\ \ y = 3x^2 + x - 3`, items: [
      { key: 'para', kind: 'fn', f: x => 3 * x * x + x - 3 },
      { key: 'line', kind: 'fn', f: x => -4 * x - 7, alt: true },
    ] },
  },
  scenes: [
    {
      ch: 0, say: 'Solving a system means finding where two graphs meet. Today: a line and a parabola.',
      view: { kind: 'title', kicker: 'UNIT 2 · LESSON 4', title: 'Line + parabola', em: 'systems', sub: 'Where the graphs intersect.' },
    },
    {
      ch: 0, say: 'A line can meet a parabola in [[1]]no points, [[2]]one point, where it just touches, [[3]]or two points.',
      view: { kind: 'cards', cards: [
        { head: 'No solution', text: 'they never meet', at: 1 },
        { head: 'One solution', text: 'the line just touches', at: 2 },
        { head: 'Two solutions', text: 'it cuts through', at: 3, dark: true },
      ] },
    },
    {
      ch: 1, say: 'Is zero comma negative two a solution of this system? [[1]]Plug it into the first equation: two times zero, plus four, plus zero, minus two, minus two: zero. True! [[2]]Into the second: zero minus two plus two is zero. True again. [[3]]It works in both, so yes, it is a solution.',
      view: { kind: 'lines', lines: [
        { tex: R`2x^2 + y^2 + 15x + y - 2 = 0,\quad x + y + 2 = 0` },
        { tex: R`0 + 4 + 0 - 2 - 2 = 0\ \checkmark`, at: 1 },
        { tex: R`0 - 2 + 2 = 0\ \checkmark`, at: 2 },
        { tex: R`\text{Yes, } (0, -2) \text{ is a solution}`, at: 3, glow: true },
      ] },
    },
    {
      ch: 2, say: 'Solve y equals two x plus seven and y equals x squared plus four. [[1]]Both equal y, so set them equal: x squared plus four equals two x plus seven. [[2]]Get zero on one side: x squared minus two x minus three equals zero. [[3]]Factor: x minus three, times x plus one. So x is three or negative one.',
      view: { kind: 'lines', lines: [
        { tex: R`x^2 + 4 = 2x + 7`, at: 1 },
        { tex: R`x^2 - 2x - 3 = 0`, at: 2 },
        { tex: R`(x - 3)(x + 1) = 0 \Rightarrow x = 3,\ -1`, at: 3, glow: true },
      ] },
    },
    {
      ch: 2, say: '[[1]]Plug each x into the line for y: two times three plus seven is thirteen, and two times negative one plus seven is five. [[2]]The solutions are three comma thirteen, and negative one comma five: exactly where the line crosses the parabola.',
      view: { kind: 'plane', layout: 'ex', reveal: [['para', 0], ['line', 0], ['sol', 2]], side: [{ tex: R`y = 2(3) + 7 = 13`, at: 1 }, { tex: R`y = 2(-1) + 7 = 5`, at: 1 }, { tex: R`(3, 13),\ (-1, 5)`, at: 2, strong: true }] },
    },
    {
      ch: 3, say: 'Sometimes there is no solution. [[1]]Setting negative four x minus seven equal to three x squared plus x minus three gives three x squared plus five x plus four equals zero. [[2]]Its discriminant is twenty-five minus forty-eight: negative. No real x, so the graphs never meet.',
      view: { kind: 'plane', layout: 'none', reveal: [['para', 0], ['line', 0]], side: [{ tex: R`3x^2 + 5x + 4 = 0`, at: 1 }, { tex: R`25 - 48 < 0`, at: 2 }, { text: 'No solution', at: 2, strong: true }] },
    },
    {
      ch: 4, say: 'Your turn! Is one comma three a solution of y equals x squared plus two and y equals two x?',
      countdown: 10,
      view: { kind: 'try', tex: R`y = x^2 + 2,\quad y = 2x;\quad (1, 3)?`, hint: ['Check both equations'] },
    },
    {
      ch: 4, say: '[[1]]The parabola: one plus two is three. That works. [[2]]The line: two times one is two, not three. [[3]]It fails the line, so it is not a solution.',
      view: { kind: 'lines', lines: [
        { tex: R`1^2 + 2 = 3\ \checkmark`, at: 1 },
        { tex: R`2(1) = 2 \ne 3\ \times`, at: 2 },
        { tex: R`\text{Not a solution}`, at: 3, glow: true },
      ] },
    },
    {
      ch: 5, say: 'Recap. [[1]]A solution must make both equations true. [[2]]Substitute the line into the parabola and solve the quadratic. [[3]]Use the line to find each y. A negative discriminant means no solution.',
      view: { kind: 'recap', items: [
        { text: 'A solution works in both equations.', at: 1 },
        { text: 'Substitute, then solve the quadratic.', at: 2 },
        { text: 'Find y from the line; b² − 4ac < 0 → none.', at: 3 },
      ] },
    },
    {
      ch: 5, say: 'Next up: systems of two parabolas. See you there!',
      view: { kind: 'title', kicker: 'UP NEXT · LESSON 5', title: 'Two parabolas', em: 'systems', sub: 'Set the two y’s equal' },
    },
  ],
}
