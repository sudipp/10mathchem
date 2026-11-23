// Unit 2, Lesson 6 video script: quadratic inequalities. Based on Day 18 notes (Examples 1 and 3) and HW #18.
const R = String.raw
const f = x => x * x - 4

export default {
  id: '06-quadratic-inequalities',
  tag: 'UNIT 2 · LESSON 6 · QUADRATIC INEQUALITIES',
  chapters: ['Two kinds', 'Graphing', 'Number line', 'Special cases', 'Your turn', 'Recap'],
  layouts: {
    ex1: { type: 'plane', window: [-5, 5, -6, 6], tex: R`y < x^2 - 4`, items: [
      { key: 'shade', kind: 'shade', f, side: 'below' },
      { key: 'curve', kind: 'fn', f, dashed: true },
      { key: 'test', kind: 'dots', pts: [[0, 0]], style: 'sol', labels: true },
    ] },
    line: { type: 'plane', window: [0, 5, -1, 3], tex: R`x^2 - 5x + 6 \ge 0`, items: [
      { key: 'curve', kind: 'fn', f: x => x * x - 5 * x + 6 },
      { key: 'zeros', kind: 'dots', pts: [[2, 0], [3, 0]], style: 'closed', labels: true },
      { key: 'left', kind: 'fn', f: x => x * x - 5 * x + 6, to: 2, alt: true },
      { key: 'right', kind: 'fn', f: x => x * x - 5 * x + 6, from: 3, alt: true },
    ] },
    turn: { type: 'plane', window: [-5, 5, -6, 6], tex: R`y > x^2 - 4`, items: [
      { key: 'curve', kind: 'fn', f, dashed: true },
    ] },
  },
  scenes: [
    {
      ch: 0, say: 'Quadratic inequalities come in two kinds: ones with y, which you shade on a graph, and ones with only x, which you solve on a number line.',
      view: { kind: 'title', kicker: 'UNIT 2 · LESSON 6', title: 'Quadratic', em: 'inequalities', sub: 'Shade a parabola or test a number line.' },
    },
    {
      ch: 1, say: 'Graph y less than x squared minus four. [[1]]Draw the parabola dashed, because it is strictly less than. [[2]]Test the origin: zero less than negative four is false. [[3]]So shade the side without the origin: below the parabola, outside the U.',
      view: { kind: 'plane', layout: 'ex1', reveal: [['curve', 1], ['test', 2], ['shade', 3]], side: [{ tex: R`<\ \Rightarrow\ \text{dashed}`, at: 1 }, { tex: R`0 < -4\ \times`, at: 2 }, { tex: R`\text{shade below}`, at: 3, strong: true }] },
    },
    {
      ch: 2, say: 'Now with only x: solve x squared minus five x plus six is at least zero. [[1]]Find the critical points: x minus two, times x minus three, so two and three, with closed dots. [[2]]Test each interval. Zero gives six, positive. Two and a half gives negative. Four gives two, positive. [[3]]We want at least zero: the positive parts plus the zeros.',
      view: { kind: 'plane', layout: 'line', reveal: [['curve', 0], ['zeros', 1], ['left', 3], ['right', 3]], side: [{ tex: R`(x - 2)(x - 3) = 0`, at: 1 }, { tex: R`+,\ -,\ +`, at: 2 }, { tex: R`(-\infty, 2] \cup [3, \infty)`, at: 3, strong: true }] },
    },
    {
      ch: 3, say: 'Watch for special cases. [[1]]Three x minus four, squared, is at least zero for every x: all real numbers. [[2]]x squared plus ten x plus twenty-five less than zero is x plus five, squared, less than zero: never true, no solution.',
      view: { kind: 'cards', cards: [
        { head: 'Always true', tex: R`(3x - 4)^2 \ge 0`, text: '(−∞, ∞)', at: 1 },
        { head: 'Never true', tex: R`(x + 5)^2 < 0`, text: 'no solution, ∅', at: 2, dark: true },
      ] },
    },
    {
      ch: 4, say: 'Your turn! For y greater than x squared minus four, should the parabola be dashed or solid, and which side gets shaded?',
      countdown: 10,
      view: { kind: 'plane', layout: 'turn', reveal: [['curve', 0]], side: [{ text: 'Dashed or solid?', at: 0 }, { text: 'Test (0, 0)', at: 0 }] },
    },
    {
      ch: 4, say: '[[1]]Greater than is strict, so it is dashed. [[2]]Test the origin: zero greater than negative four is true. [[3]]So shade the side with the origin: above, inside the U.',
      view: { kind: 'lines', lines: [
        { tex: R`> \Rightarrow \text{dashed}`, at: 1 },
        { tex: R`0 > -4\ \checkmark`, at: 2 },
        { tex: R`\text{shade above (inside)}`, at: 3, glow: true },
      ] },
    },
    {
      ch: 5, say: 'Recap. [[1]]With y: dashed or solid, test a point, shade. [[2]]With only x: find the zeros, test each interval, pick the signs you want. [[3]]Squares are never negative.',
      view: { kind: 'recap', items: [
        { text: 'With y: boundary, test point, shade.', at: 1 },
        { text: 'Only x: zeros, test intervals, choose signs.', at: 2 },
        { text: 'A square is never negative.', at: 3 },
      ] },
    },
    {
      ch: 5, say: 'That completes Unit two. You can now solve any quadratic, find where graphs meet, and solve inequalities. Great work!',
      view: { kind: 'title', kicker: 'UNIT 2 · COMPLETE', title: 'Great', em: 'work!', sub: 'Now try HW #18 and the HW #19 review' },
    },
  ],
}
