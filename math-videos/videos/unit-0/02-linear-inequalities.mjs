// Unit 0, Lesson 2 video script: linear inequalities and interval notation. Based on HW #2 and the interval notation handout.
const R = String.raw
const f = x => x / 2 + 2

export default {
  id: '02-linear-inequalities',
  tag: 'UNIT 0 · LESSON 2 · LINEAR INEQUALITIES',
  chapters: ['Boundary', 'Shading', 'Reading a graph', 'Interval notation', 'Your turn', 'Recap'],
  layouts: {
    ex: { type: 'plane', window: [-8, 8, -8, 8], tex: R`y \le \tfrac12x + 2`, items: [
      { key: 'shade', kind: 'shade', f, side: 'below' },
      { key: 'line', kind: 'fn', f },
      { key: 'test', kind: 'dots', pts: [[0, 0]], style: 'sol', labels: true },
    ] },
    read: { type: 'plane', window: [-8, 8, -8, 8], tex: R`\text{Which inequality?}`, items: [
      { key: 'shade', kind: 'shade', f: x => -x + 3, side: 'above' },
      { key: 'line', kind: 'fn', f: x => -x + 3, dashed: true },
      { key: 'b', kind: 'dots', pts: [[0, 3], [1, 2]], style: 'vertex', labels: true },
    ] },
    turn: { type: 'plane', window: [-8, 8, -8, 8], tex: R`\text{Which inequality?}`, items: [
      { key: 'shade', kind: 'shade', x: 3, side: 'left' },
      { key: 'line', kind: 'vline', x: 3 },
    ] },
  },
  scenes: [
    {
      ch: 0, say: 'An equation like y equals one half x plus two is a line. An inequality is a whole region. Let’s see how to draw one.',
      view: { kind: 'title', kicker: 'UNIT 0 · LESSON 2', title: 'Linear', em: 'inequalities', sub: 'Boundary line, solid or dashed, then shade.' },
    },
    {
      ch: 0, say: 'Graph y is less than or equal to one half x plus two. [[1]]First draw the boundary line, y equals one half x plus two. [[2]]Less than or equal includes the line, so draw it solid. Less than or greater than alone would make it dashed.',
      view: { kind: 'plane', layout: 'ex', reveal: [['line', 1]], side: [{ tex: R`\text{boundary } y = \tfrac12x + 2`, at: 1 }, { tex: R`\le\ \Rightarrow\ \text{solid}`, at: 2, strong: true }] },
    },
    {
      ch: 1, say: 'Which side gets shaded? [[1]]Test a point that is not on the line, like the origin. Zero is less than or equal to two: true! [[2]]So shade the side with the origin: below the line.',
      view: { kind: 'plane', layout: 'ex', reveal: [['test', 1], ['shade', 2]], side: [{ tex: R`0 \le \tfrac12(0) + 2\ \checkmark`, at: 1 }, { tex: R`\text{shade below}`, at: 2, strong: true }] },
    },
    {
      ch: 1, say: 'A shortcut: [[1]]y greater than, or greater than or equal to, means shade above. [[2]]y less than, or less than or equal to, means shade below. [[3]]For x alone, greater means right and less means left.',
      view: { kind: 'cards', cards: [
        { head: 'Shade above', tex: R`y > \ \text{or}\ \ y \ge`, at: 1 },
        { head: 'Shade below', tex: R`y < \ \text{or}\ \ y \le`, at: 2 },
        { head: 'Right or left', tex: R`x > c \ \text{or}\ \ x < c`, at: 3, dark: true },
      ] },
    },
    {
      ch: 2, say: 'Now read a graph backwards. [[1]]The line crosses the y-axis at three and goes down one for every one to the right, so it is y equals negative x plus three. [[2]]It is dashed, so use greater than or less than. [[3]]The shading is above, so it is y greater than negative x plus three.',
      view: { kind: 'plane', layout: 'read', reveal: [['line', 0], ['shade', 0], ['b', 1]], side: [{ tex: R`b = 3,\ m = -1`, at: 1 }, { tex: R`\text{dashed} \Rightarrow <\text{ or }>`, at: 2 }, { tex: R`y > -x + 3`, at: 3, strong: true }] },
    },
    {
      ch: 3, say: 'Interval notation writes a range of numbers. [[1]]Parentheses mean the endpoint is not included. [[2]]Brackets mean it is. [[3]]Infinity always gets a parenthesis. So x greater than or equal to negative five is bracket negative five, infinity.',
      view: { kind: 'lines', title: 'Interval notation', lines: [
        { tex: R`1 < x < 5 \ \to\ (1, 5)`, at: 1 },
        { tex: R`1 \le x \le 5 \ \to\ [1, 5]`, at: 2 },
        { tex: R`x \ge -5 \ \to\ [-5, \infty)`, at: 3, glow: true },
      ] },
    },
    {
      ch: 3, say: 'Compound inequalities join two parts. [[1]]And means both are true: three x minus nine is between negative three and twelve, which gives x from two to seven. [[2]]Or keeps either piece: x less than two, or x greater than six, joined with a union symbol.',
      view: { kind: 'cards', cards: [
        { head: 'And: the overlap', tex: R`2 \le x \le 7 \ \to\ [2, 7]`, at: 1 },
        { head: 'Or: both pieces', tex: R`(-\infty, 2) \cup (6, \infty)`, at: 2, dark: true },
      ] },
    },
    {
      ch: 4, say: 'Your turn! A solid vertical line at x equals three, shaded to the left. Which inequality is it?',
      countdown: 10,
      view: { kind: 'plane', layout: 'turn', reveal: [['line', 0], ['shade', 0]], side: [{ text: 'Solid or dashed?', at: 0 }, { text: 'Left or right?', at: 0 }] },
    },
    {
      ch: 4, say: '[[1]]Solid means or equal to. [[2]]Left means smaller x. [[3]]So it is x less than or equal to three.',
      view: { kind: 'lines', lines: [
        { tex: R`\text{solid} \Rightarrow \le \text{ or } \ge`, at: 1 },
        { tex: R`\text{left} \Rightarrow x \text{ smaller}`, at: 2 },
        { tex: R`x \le 3`, at: 3, glow: true },
      ] },
    },
    {
      ch: 5, say: 'Recap. [[1]]Draw the boundary: solid for or-equal-to, dashed otherwise. [[2]]Test a point, or use above for greater and below for less. [[3]]In interval notation, parentheses leave endpoints out and brackets keep them.',
      view: { kind: 'recap', items: [
        { text: 'Boundary: solid for ≤ ≥, dashed for < >.', at: 1 },
        { text: 'Shade: test (0, 0), or y > above, y < below.', at: 2 },
        { text: '( ) leaves out, [ ] includes, ∞ gets ( ).', at: 3 },
      ] },
    },
    {
      ch: 5, say: 'Next up: absolute value functions. See you there!',
      view: { kind: 'title', kicker: 'UP NEXT · LESSON 3', title: 'Absolute value', em: 'functions', sub: 'Every graph is a V' },
    },
  ],
}
