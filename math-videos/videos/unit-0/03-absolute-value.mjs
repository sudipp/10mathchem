// Unit 0, Lesson 3 video script: absolute value functions. Based on Day 4 notes (Examples 2, 3, 5) and HW #4.
const R = String.raw
const abs = (a, h, k) => x => a * Math.abs(x - h) + k

export default {
  id: '03-absolute-value',
  tag: 'UNIT 0 · LESSON 3 · ABSOLUTE VALUE',
  chapters: ['The V shape', 'a, h, k', 'Graphing', 'Writing', 'Your turn', 'Recap'],
  layouts: {
    parent: { type: 'plane', window: [-5, 5, -5, 5], tex: R`y = |x|`, items: [
      { key: 'curve', kind: 'fn', f: Math.abs },
      { key: 'v', kind: 'dots', pts: [[0, 0]], style: 'vertex', labels: true },
    ] },
    ex3: { type: 'plane', window: [-5, 5, -5, 5], tex: R`y = -|x - 1| + 1`, items: [
      { key: 'axis', kind: 'axis', x: 1 },
      { key: 'v', kind: 'dots', pts: [[1, 1]], style: 'vertex', labels: true },
      { key: 'right', kind: 'dots', pts: [[2, 0], [3, -1]], style: 'key' },
      { key: 'left', kind: 'dots', pts: [[0, 0], [-1, -1]], style: 'key' },
      { key: 'curve', kind: 'fn', f: abs(-1, 1, 1) },
    ] },
    ex5: { type: 'plane', window: [-5, 5, -5, 5], tex: R`\text{Write the equation}`, items: [
      { key: 'curve', kind: 'fn', f: abs(0.5, 0, 2) },
      { key: 'v', kind: 'dots', pts: [[0, 2]], style: 'vertex', labels: true },
      { key: 'pt', kind: 'dots', pts: [[2, 3]], style: 'sol', labels: true },
    ] },
  },
  scenes: [
    {
      ch: 0, say: 'Absolute value means distance from zero, so it is never negative. That makes its graph a V.',
      view: { kind: 'title', kicker: 'UNIT 0 · LESSON 3', title: 'Absolute value', em: 'functions', sub: 'y = a|x − h| + k makes a V.' },
    },
    {
      ch: 0, say: '[[1]]Here is y equals the absolute value of x. On the right it is y equals x; on the left it is y equals negative x. [[2]]The point of the V, the vertex, is at the origin.',
      view: { kind: 'plane', layout: 'parent', reveal: [['curve', 1], ['v', 2]], side: [{ tex: R`x > 0:\ y = x`, at: 1 }, { tex: R`x < 0:\ y = -x`, at: 1 }, { tex: R`\text{vertex } (0, 0)`, at: 2, strong: true }] },
    },
    {
      ch: 1, say: 'Every absolute value function is y equals a times the absolute value of x minus h, plus k. [[1]]The vertex is h comma k, and the axis of symmetry is x equals h. Careful: the sign inside flips. [[2]]If a is positive it opens up; negative, down. [[3]]If the size of a is more than one it is narrower; less than one, wider.',
      view: { kind: 'cards', title: 'y = a|x − h| + k', cards: [
        { head: 'Vertex', tex: R`(h, k),\ \text{axis } x = h`, at: 1 },
        { head: 'Up or down', tex: R`a > 0 \uparrow \quad a < 0 \downarrow`, at: 2 },
        { head: 'Width', tex: R`|a| > 1 \text{ narrow},\ |a| < 1 \text{ wide}`, at: 3, dark: true },
      ] },
    },
    {
      ch: 2, say: 'Graph y equals negative absolute value of x minus one, plus one. [[1]]The vertex is one comma one, with the dashed axis x equals one. [[2]]a is negative one, so it opens down with the same width. Plot two points on the right: two comma zero and three comma negative one. [[3]]Mirror them across the axis. [[4]]Connect the upside-down V.',
      view: { kind: 'plane', layout: 'ex3', reveal: [['v', 1], ['axis', 1], ['right', 2], ['left', 3], ['curve', 4]], side: [{ tex: R`\text{vertex } (1, 1)`, at: 1 }, { tex: R`a = -1:\ \text{down}`, at: 2 }, { tex: R`\text{mirror } x = 1`, at: 3 }, { tex: R`y = -|x - 1| + 1`, at: 4, strong: true }] },
    },
    {
      ch: 3, say: 'Now write an equation from a graph. [[1]]Read the vertex: zero comma two. So y equals a times absolute value of x, plus two. [[2]]Find another point on the graph: two comma three. [[3]]Plug it in: three equals a times two, plus two. So a is one half.',
      view: { kind: 'plane', layout: 'ex5', reveal: [['curve', 0], ['v', 1], ['pt', 2]], side: [{ tex: R`y = a|x| + 2`, at: 1 }, { tex: R`3 = a|2| + 2`, at: 2 }, { tex: R`a = \tfrac12:\ y = \tfrac12|x| + 2`, at: 3, strong: true }] },
    },
    {
      ch: 4, say: 'Your turn! What is the vertex of y equals two times the absolute value of x plus three, minus five?',
      countdown: 10,
      view: { kind: 'try', tex: R`y = 2|x + 3| - 5`, hint: ['The sign inside flips', 'Vertex (h, k)'] },
    },
    {
      ch: 4, say: '[[1]]x plus three is x minus negative three, so h is negative three. [[2]]k is negative five. [[3]]The vertex is negative three, negative five.',
      view: { kind: 'lines', lines: [
        { tex: R`|x + 3| = |x - (-3)| \Rightarrow h = -3`, at: 1 },
        { tex: R`k = -5`, at: 2 },
        { tex: R`\text{vertex } (-3, -5)`, at: 3, glow: true },
      ] },
    },
    {
      ch: 5, say: 'Recap. [[1]]The vertex is h comma k, and the sign inside flips. [[2]]a decides up or down, and narrow or wide. [[3]]To graph: vertex, axis, two points, mirror. [[4]]To write: vertex, then one point to find a.',
      view: { kind: 'recap', items: [
        { text: 'Vertex (h, k); the sign inside flips.', at: 1 },
        { text: 'a: sign is up/down, size is narrow/wide.', at: 2 },
        { text: 'Graph: vertex, axis, two points, mirror.', at: 3 },
        { text: 'Write: vertex, then a point to find a.', at: 4 },
      ] },
    },
    {
      ch: 5, say: 'Next up: graphing piecewise functions. See you there!',
      view: { kind: 'title', kicker: 'UP NEXT · LESSON 4', title: 'Piecewise', em: 'functions', sub: 'Each rule lives on its own interval' },
    },
  ],
}
