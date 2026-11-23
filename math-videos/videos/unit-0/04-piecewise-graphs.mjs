// Unit 0, Lesson 4 video script: graphing piecewise functions. Based on Day 4 notes (Examples 8–9) and HW #4.
const R = String.raw

export default {
  id: '04-piecewise-graphs',
  tag: 'UNIT 0 · LESSON 4 · PIECEWISE GRAPHS',
  chapters: ['What it is', 'Open or closed', 'Graphing', 'Evaluating', 'Your turn', 'Recap'],
  layouts: {
    ex8: { type: 'plane', window: [-5, 5, -5, 5], tex: R`f(x) = \begin{cases} 2, & x \le 1 \\ -x + 3, & x > 1 \end{cases}`, items: [
      { key: 'p1', kind: 'fn', f: () => 2, to: 1 },
      { key: 'd1', kind: 'dots', pts: [[1, 2]], style: 'closed', labels: true },
      { key: 'p2', kind: 'fn', f: x => -x + 3, from: 1 },
    ] },
    ex9: { type: 'plane', window: [-6, 6, -6, 6], tex: R`f(x) = \begin{cases} -x + 1, & x < -3 \\ -x + 2, & -3 \le x \le 2 \\ x - 1, & x > 2 \end{cases}`, items: [
      { key: 'p1', kind: 'fn', f: x => -x + 1, to: -3 },
      { key: 'o1', kind: 'dots', pts: [[-3, 4]], style: 'open' },
      { key: 'p2', kind: 'fn', f: x => -x + 2, from: -3, to: 2 },
      { key: 'c2', kind: 'dots', pts: [[-3, 5], [2, 0]], style: 'closed', labels: true },
      { key: 'p3', kind: 'fn', f: x => x - 1, from: 2 },
      { key: 'o3', kind: 'dots', pts: [[2, 1]], style: 'open' },
    ] },
  },
  scenes: [
    {
      ch: 0, say: 'Some functions follow different rules in different places. Those are piecewise functions.',
      view: { kind: 'title', kicker: 'UNIT 0 · LESSON 4', title: 'Piecewise', em: 'functions', sub: 'Each rule lives on its own interval.' },
    },
    {
      ch: 0, say: 'Read the cases like this: [[1]]when x is less than or equal to one, f of x is two. [[2]]When x is greater than one, f of x is negative x plus three. Each piece only exists on its own interval.',
      view: { kind: 'lines', lines: [
        { tex: R`f(x) = \begin{cases} 2, & x \le 1 \\ -x + 3, & x > 1 \end{cases}`, big: true },
        { tex: R`x \le 1:\ \text{use } 2`, at: 1 },
        { tex: R`x > 1:\ \text{use } -x + 3`, at: 2 },
      ] },
    },
    {
      ch: 1, say: 'At each endpoint, look at the symbol. [[1]]Less than or equal, or greater than or equal, includes the point: a closed dot. [[2]]Less than or greater than leaves it out: an open dot.',
      view: { kind: 'cards', cards: [
        { head: '≤ or ≥', text: 'closed dot (included)', at: 1 },
        { head: '< or >', text: 'open dot (left out)', at: 2, dark: true },
      ] },
    },
    {
      ch: 2, say: '[[1]]Piece one: the flat line y equals two, for x up to one, [[2]]with a closed dot at one comma two. [[3]]Piece two: negative x plus three starts at x equals one, where it also equals two, so the pieces connect.',
      view: { kind: 'plane', layout: 'ex8', reveal: [['p1', 1], ['d1', 2], ['p2', 3]], side: [{ tex: R`y = 2,\ x \le 1`, at: 1 }, { tex: R`(1, 2)\ \text{closed}`, at: 2 }, { tex: R`-x + 3 \text{ at } 1 = 2`, at: 3, strong: true }] },
    },
    {
      ch: 2, say: 'A three-piece example. [[1]]Piece one, negative x plus one, for x less than negative three. At negative three it would be four: an open dot. [[2]]Piece two, negative x plus two, from negative three to two, closed at both ends: five and zero. [[3]]Piece three, x minus one, for x greater than two. At two it would be one: open.',
      view: { kind: 'plane', layout: 'ex9', reveal: [['p1', 1], ['o1', 1], ['p2', 2], ['c2', 2], ['p3', 3], ['o3', 3]], side: [{ tex: R`(-3, 4)\ \text{open}`, at: 1 }, { tex: R`(-3, 5),\ (2, 0)\ \text{closed}`, at: 2 }, { tex: R`(2, 1)\ \text{open}`, at: 3 }] },
    },
    {
      ch: 3, say: 'To evaluate, first find the right piece. For f of ten: [[1]]ten fits x greater than two. [[2]]So use x minus one: ten minus one is nine. If no condition fits, the value is undefined.',
      view: { kind: 'lines', lines: [
        { tex: R`f(10):\ 10 > 2`, at: 1 },
        { tex: R`f(10) = 10 - 1 = 9`, at: 2, glow: true },
      ] },
    },
    {
      ch: 4, say: 'Your turn! f of x is x plus one when x is less than two, and five when x is at least two. What is f of two?',
      countdown: 10,
      view: { kind: 'try', tex: R`f(x) = \begin{cases} x + 1, & x < 2 \\ 5, & x \ge 2 \end{cases}\quad f(2) = ?`, hint: ['Which condition fits x = 2?'] },
    },
    {
      ch: 4, say: '[[1]]Two is not less than two, but it is greater than or equal to two. [[2]]So f of two is five.',
      view: { kind: 'lines', lines: [
        { tex: R`2 < 2\ \times \qquad 2 \ge 2\ \checkmark`, at: 1 },
        { tex: R`f(2) = 5`, at: 2, glow: true },
      ] },
    },
    {
      ch: 5, say: 'Recap. [[1]]Graph each piece only on its interval. [[2]]Closed dots for or-equal-to, open dots otherwise. [[3]]To evaluate, pick the piece whose condition is true.',
      view: { kind: 'recap', items: [
        { text: 'Each piece only on its own interval.', at: 1 },
        { text: '≤ ≥ closed dot; < > open dot.', at: 2 },
        { text: 'Evaluate: find the true condition first.', at: 3 },
      ] },
    },
    {
      ch: 5, say: 'Next up: writing piecewise functions from a graph, plus domain and range. See you there!',
      view: { kind: 'title', kicker: 'UP NEXT · LESSON 5', title: 'Writing', em: 'piecewise functions', sub: 'Read each piece off the graph' },
    },
  ],
}
