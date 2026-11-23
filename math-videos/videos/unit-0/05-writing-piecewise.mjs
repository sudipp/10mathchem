// Unit 0, Lesson 5 video script: writing piecewise functions, domain and range. Based on Day 5 notes and HW #5.
const R = String.raw

export default {
  id: '05-writing-piecewise',
  tag: 'UNIT 0 · LESSON 5 · WRITING PIECEWISE',
  chapters: ['The plan', 'Left piece', 'Right piece', 'Domain & range', 'Your turn', 'Recap'],
  layouts: {
    g: { type: 'plane', window: [-6, 6, -6, 6], tex: R`g(x) = \ ?`, items: [
      { key: 'p1', kind: 'fn', f: x => -x - 2, to: 0 },
      { key: 'c1', kind: 'dots', pts: [[0, -2]], style: 'closed' },
      { key: 'p2', kind: 'fn', f: x => x + 2, from: 0 },
      { key: 'o2', kind: 'dots', pts: [[0, 2]], style: 'open' },
      { key: 'r1', kind: 'dots', pts: [[-4, 2], [-2, 0]], style: 'vertex', labels: true },
      { key: 'r2', kind: 'dots', pts: [[1, 3], [3, 5]], style: 'vertex', labels: true },
      { key: 'range', kind: 'shade', f: () => -2, side: 'above' },
    ] },
    turn: { type: 'plane', window: [-6, 6, -6, 6], tex: R`\text{Domain?}`, items: [
      { key: 'ray', kind: 'fn', f: x => x + 2, from: 1 },
      { key: 'o', kind: 'dots', pts: [[1, 3]], style: 'open', labels: true },
    ] },
  },
  scenes: [
    {
      ch: 0, say: 'Last time we graphed piecewise functions. Now let’s go backwards: start with the graph and write the function.',
      view: { kind: 'title', kicker: 'UNIT 0 · LESSON 5', title: 'Writing', em: 'piecewise functions', sub: 'Read each piece off the graph.' },
    },
    {
      ch: 0, say: 'The plan: [[1]]for each section, find its rule: the slope and y-intercept, or a constant. [[2]]Then write its interval from the dots: closed means or-equal-to, open means strictly less or greater, and an arrow means it keeps going.',
      view: { kind: 'cards', cards: [
        { head: 'The rule', tex: R`y = mx + b`, text: 'or a constant', at: 1 },
        { head: 'The interval', text: 'closed: ≤ ≥ · open: < > · arrow: ∞', at: 2, dark: true },
      ] },
    },
    {
      ch: 1, say: 'Here is the graph. Two sections break at x equals zero. [[1]]Pick two grid points on the left section: negative four, two and negative two, zero. [[2]]The slope is negative two over two: negative one, and it crosses the y-axis at negative two. So y equals negative x minus two. [[3]]The dot at zero, negative two is closed, so x is less than or equal to zero.',
      view: { kind: 'plane', layout: 'g', reveal: [['p1', 0], ['c1', 0], ['p2', 0], ['o2', 0], ['r1', 1]], side: [{ tex: R`m = \dfrac{0 - 2}{-2 - (-4)} = -1`, at: 2 }, { tex: R`-x - 2,\ x \le 0`, at: 3, strong: true }] },
    },
    {
      ch: 2, say: '[[1]]The right section goes through one, three and three, five: slope one, and it would cross the y-axis at two. So y equals x plus two. [[2]]The dot at zero, two is open, so x is greater than zero.',
      view: { kind: 'plane', layout: 'g', reveal: [['r2', 1]], side: [{ tex: R`m = 1,\ b = 2`, at: 1 }, { tex: R`x + 2,\ x > 0`, at: 2, strong: true }] },
    },
    {
      ch: 2, say: 'Put the pieces together: [[1]]g of x is negative x minus two when x is at most zero, and x plus two when x is greater than zero.',
      view: { kind: 'lines', lines: [
        { tex: R`g(x) = \begin{cases} -x - 2, & x \le 0 \\ x + 2, & x > 0 \end{cases}`, at: 1, glow: true },
      ] },
    },
    {
      ch: 3, say: 'Domain and range. [[1]]The domain is every x the graph covers: here, all real numbers. [[2]]The range is every y it reaches. The left piece starts at negative two and goes up; the right piece is above two. So the range is negative two to infinity, with a bracket.',
      view: { kind: 'plane', layout: 'g', reveal: [['range', 2]], side: [{ tex: R`D: (-\infty, \infty)`, at: 1 }, { tex: R`R: [-2, \infty)`, at: 2, strong: true }] },
    },
    {
      ch: 4, say: 'Your turn! A ray starts with an open dot at one comma three and goes to the right. What is its domain?',
      countdown: 10,
      view: { kind: 'plane', layout: 'turn', reveal: [['ray', 0], ['o', 0]], side: [{ text: 'Domain is about x.', at: 0 }, { text: 'Open dot: included?', at: 0 }] },
    },
    {
      ch: 4, say: '[[1]]Domain is about x. The open dot leaves x equals one out, and the ray goes on forever. [[2]]So the domain is one to infinity, with a parenthesis at one.',
      view: { kind: 'lines', lines: [
        { tex: R`x = 1 \text{ left out}`, at: 1 },
        { tex: R`(1, \infty)`, at: 2, glow: true },
      ] },
    },
    {
      ch: 5, say: 'Recap. [[1]]For each section, find the slope and the y-intercept. [[2]]Turn each dot into an inequality. [[3]]Domain is the x-values covered; range is the y-values reached.',
      view: { kind: 'recap', items: [
        { text: 'Each section: slope and y-intercept.', at: 1 },
        { text: 'Dots become ≤ ≥ (closed) or < > (open).', at: 2 },
        { text: 'Domain: x-values. Range: y-values.', at: 3 },
      ] },
    },
    {
      ch: 5, say: 'That finishes Unit zero. Next, in Unit one, quadratic functions and their parabolas. Great work!',
      view: { kind: 'title', kicker: 'UP NEXT · UNIT 1', title: 'Quadratic', em: 'functions', sub: 'Every parabola has a turning point' },
    },
  ],
}
