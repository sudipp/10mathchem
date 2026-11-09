// Lesson 13 video script. Based on Day 14 notes (Examples A, C, E, F, G) and HW #14 #2.
const R = String.raw
const O = '#CC5833'

export default {
  id: '13-polynomial-inequalities',
  tag: 'UNIT 4 · LESSON 13 · POLYNOMIAL INEQUALITIES',
  chapters: ['The plan', 'Example', 'Bounces', 'Special cases', 'Your turn', 'Recap'],
  layouts: {
    exA: { type: 'graph', num: [1, -5, -6], window: [-3, 8, -14, 10] },
    exC: { type: 'graph', num: [1, -1, -8, 12], window: [-4.5, 4, -10, 24] },
  },
  scenes: [
    {
      ch: 0, say: 'When is a polynomial less than zero, or greater than zero? To solve a polynomial inequality, the zeros do most of the work.',
      view: { kind: 'title', kicker: 'UNIT 4 · LESSON 13', title: 'Polynomial', em: 'inequalities', sub: 'Zeros split the number line.' },
    },
    {
      ch: 0, say: 'Here’s the plan. [[1]]Find the real zeros. We call them critical points. [[2]]Put them on a number line: open circles for less than or greater than, closed circles when it says or equal to. [[3]]Test one x value in each interval to get its sign. [[4]]Write the answer in interval notation.',
      view: { kind: 'recap', items: [
        { text: '1. Real zeros = critical points.', at: 1 },
        { text: '2. Number line: open ( ) for < >, closed [ ] for ≤ ≥.', at: 2 },
        { text: '3. Test one x in each interval: + or −.', at: 3 },
        { text: '4. Answer in interval notation.', at: 4 },
      ] },
    },
    {
      ch: 1, say: 'Solve x squared minus five x minus six, less than zero. [[1]]Factor: x minus six, times x plus one. [[2]]So the critical points are minus one and six. Less than means open circles.',
      view: { kind: 'lines', lines: [
        { tex: R`x^2 - 5x - 6 < 0` },
        { tex: R`(x - 6)(x + 1) < 0`, at: 1 },
        { tex: R`x = -1,\quad x = 6 \quad (\text{open})`, at: 2, glow: true },
      ] },
    },
    {
      ch: 1, say: 'Now test each interval. [[1]]Left of minus one, try minus two: f is eight, positive. [[2]]Between them, try zero: f is minus six, negative. [[3]]Right of six, try seven: f is eight, positive.',
      view: { kind: 'table', title: 'Sign chart', rows: [
        { left: 'x < −1:  f(−2) = 8', right: '+', at: 1 },
        { left: '−1 < x < 6:  f(0) = −6', right: '−   ✓', at: 2 },
        { left: 'x > 6:  f(7) = 8', right: '+', at: 3 },
      ] },
    },
    {
      ch: 1, say: 'We want less than zero, the negative part. [[1]]On the graph, that’s where the parabola dips below the x-axis. [[2]]So the answer is the open interval from minus one to six.',
      view: { kind: 'graph', layout: 'exA', title: R`y = x^2 - 5x - 6`, reveal: [['curve', 0], ['zeros', 1]], side: [{ text: 'Below the x-axis between the zeros', at: 1 }, { tex: R`(-1,\ 6)`, at: 2, strong: true }] },
    },
    {
      ch: 2, say: 'Next: x minus two, squared, times x plus three, greater than zero. [[1]]The critical points are minus three and two. [[2]]Two has multiplicity two, so the graph bounces there, and the sign does not change. [[3]]Testing gives: negative, then positive, then positive.',
      view: { kind: 'graph', layout: 'exC', title: R`y = (x - 2)^2(x + 3)`, reveal: [['curve', 0], ['zeros', 1]], hl: [[2, 2]], side: [{ tex: R`x = -3,\ 2`, at: 1 }, { text: 'Bounce at 2: same sign on both sides', at: 2 }, { tex: R`-\ \ |\ \ +\ \ |\ \ +`, at: 3 }] },
    },
    {
      ch: 2, say: '[[1]]Greater than zero means the positive parts, but not the zero at two itself. [[2]]So the answer is minus three to two, union two to infinity, with open parentheses everywhere.',
      view: { kind: 'lines', lines: [
        { tex: R`(x - 2)^2(x + 3) > 0`, at: 1 },
        { tex: R`(-3,\ 2) \cup (2,\ \infty)`, at: 2, big: true, glow: true },
      ] },
    },
    {
      ch: 3, say: 'Watch for special cases. [[1]]x plus three, squared, greater than zero: it’s positive everywhere except minus three. [[2]]x plus two, squared, less than or equal to zero: only x equals minus two works. [[3]]And x squared plus five x plus seven, less than zero, has no real zeros and is always positive. No solution, the empty set.',
      view: { kind: 'lines', lines: [
        { tex: R`(x + 3)^2 > 0 \;\Rightarrow\; (-\infty, -3) \cup (-3, \infty)`, at: 1 },
        { tex: R`(x + 2)^2 \le 0 \;\Rightarrow\; \{-2\}`, at: 2 },
        { tex: R`x^2 + 5x + 7 < 0 \;\Rightarrow\; \varnothing`, at: 3 },
      ] },
    },
    {
      ch: 4, say: 'Your turn! Solve x minus eight, times x plus six, greater than or equal to zero.',
      countdown: 10,
      view: { kind: 'try', tex: R`(x - 8)(x + 6) \ge 0`, hint: ['Zeros', 'Test intervals', 'Open or closed?'] },
    },
    {
      ch: 4, say: '[[1]]The zeros are minus six and eight, with closed circles. [[2]]Testing gives positive, negative, positive. [[3]]So the answer is minus infinity to minus six, union eight to infinity, with square brackets at minus six and eight. Great job!',
      view: { kind: 'lines', lines: [
        { tex: R`x = -6,\ 8 \quad (\text{closed})`, at: 1 },
        { tex: R`+\ \ |\ \ -\ \ |\ \ +`, at: 2 },
        { tex: R`(-\infty,\ -6] \cup [8,\ \infty)`, at: 3, big: true, glow: true },
      ] },
    },
    {
      ch: 5, say: 'Recap. [[1]]Get zero on one side, then find the real zeros. [[2]]Open circles for strict inequalities, closed for or-equal-to. [[3]]Test one point in each interval. [[4]]At an even multiplicity zero, the sign doesn’t change.',
      view: { kind: 'recap', items: [
        { text: 'Zero on one side, then find the real zeros.', at: 1 },
        { text: '< > open ( ), ≤ ≥ closed [ ].', at: 2 },
        { text: 'Test one x in each interval.', at: 3 },
        { text: 'Even multiplicity → the sign stays the same.', at: 4 },
      ] },
    },
    {
      ch: 5, say: 'Next up: inverse functions, which undo what a function does. See you there!',
      view: { kind: 'title', kicker: 'UP NEXT · LESSON 14', title: 'Inverse', em: 'functions', sub: 'Undo what a function does' },
    },
  ],
}
