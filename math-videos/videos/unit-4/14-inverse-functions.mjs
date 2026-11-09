// Lesson 14 video script. Based on Day 15 notes (Examples 1, 2C, 2D, 3, 5) and HW #15 #7.
const R = String.raw
const O = '#CC5833'

export default {
  id: '14-inverse-functions',
  tag: 'UNIT 4 · LESSON 14 · INVERSE FUNCTIONS',
  chapters: ['Undo', 'Find it', 'Check it', 'Graph', 'Your turn', 'Recap'],
  layouts: {
    cube: { type: 'graph', num: [1, 0, 0, -1], window: [-4, 4, -4, 4], extra: [{ key: 'inv', fn: x => Math.cbrt(x + 1) }], diag: true },
  },
  scenes: [
    {
      ch: 0, say: 'A function takes an input and gives an output. Its inverse runs it backwards: put the output in, and you get the original input back.',
      view: { kind: 'title', kicker: 'UNIT 4 · LESSON 14', title: 'Inverse', em: 'functions', sub: 'Undo what a function does.' },
    },
    {
      ch: 0, say: 'Look at this table for f. [[1]]f sends minus two to three. So the inverse sends three back to minus two. [[2]]Every point just swaps its x and y. [[3]]That means the domain of f becomes the range of f inverse.',
      view: { kind: 'table', title: 'Swap x and y', rows: [
        { left: 'f:  (−2, 3)', right: 'f⁻¹:  (3, −2)', at: 1 },
        { left: 'f:  (−1, 2),  (0, 1)', right: 'f⁻¹:  (2, −1),  (1, 0)', at: 2 },
        { left: 'f:  (1, −2),  (2, −3)', right: 'f⁻¹:  (−2, 1),  (−3, 2)', at: 2 },
        { left: 'domain of f', right: 'range of f⁻¹', at: 3 },
      ] },
    },
    {
      ch: 1, say: 'To find an inverse from an equation, just two steps: [[1]]switch x and y, [[2]]then solve for y. Let’s try f of x equals five minus three x, over two. [[3]]Switch: x equals five minus three y, over two. [[4]]Multiply by two, move the five, and divide by minus three. [[5]]So f inverse is five minus two x, over three.',
      view: { kind: 'lines', lines: [
        { tex: R`1)\ \text{switch } x \text{ and } y \qquad 2)\ \text{solve for } y`, at: 1, box: true },
        { tex: R`y = \dfrac{5 - 3x}{2}`, at: 2 },
        { tex: R`x = \dfrac{5 - 3y}{2}`, at: 3 },
        { tex: R`2x = 5 - 3y \;\Rightarrow\; 3y = 5 - 2x`, at: 4 },
        { tex: R`f^{-1}(x) = \dfrac{5 - 2x}{3}`, at: 5, glow: true },
      ] },
    },
    {
      ch: 1, say: 'Now f of x equals the cube root of x plus one. [[1]]Switch: x equals the cube root of y plus one. [[2]]Undo the cube root by cubing both sides: x cubed equals y plus one. [[3]]So f inverse is x cubed minus one.',
      view: { kind: 'lines', lines: [
        { tex: R`y = \sqrt[3]{x + 1}` },
        { tex: R`x = \sqrt[3]{y + 1}`, at: 1 },
        { tex: R`x^3 = y + 1`, at: 2 },
        { tex: R`f^{-1}(x) = x^3 - 1`, at: 3, glow: true },
      ] },
    },
    {
      ch: 2, say: 'How do you know two functions are inverses? [[1]]Compose them both ways. f of f inverse of x, and f inverse of f of x, must both give back x. [[2]]So for f of x equals one half x plus five, f of f inverse of six hundred fifty-two is just six hundred fifty-two. No arithmetic needed!',
      view: { kind: 'lines', lines: [
        { tex: R`f\big(f^{-1}(x)\big) = x \quad\text{and}\quad f^{-1}\big(f(x)\big) = x`, at: 1, box: true },
        { tex: R`(f \circ f^{-1})(652) = 652`, at: 2, glow: true },
      ] },
    },
    {
      ch: 3, say: 'Swapping x and y reflects the graph over the line y equals x. [[1]]Here’s y equals x cubed minus one. [[2]]Here’s the line y equals x. [[3]]And its inverse, the cube root of x plus one, is the mirror image.',
      view: { kind: 'graph', layout: 'cube', title: R`y = x^3 - 1`, reveal: [['curve', 1], ['diag', 2], ['inv', 3]], side: [{ tex: R`y = x \text{ (mirror)}`, at: 2 }, { tex: R`\text{inverse: } y = \sqrt[3]{x + 1}`, at: 3, strong: true }] },
    },
    {
      ch: 3, say: 'One more check: the horizontal line test. [[1]]If any horizontal line hits the graph twice, the inverse is not a function. [[2]]x squared fails: y equals four hits at minus two and two. Its inverse, plus or minus root x, isn’t a function.',
      view: { kind: 'lines', lines: [
        { tex: R`\text{a horizontal line hits twice} \;\Rightarrow\; f^{-1} \text{ is not a function}`, at: 1 },
        { tex: R`y = x^2:\ \ (-2, 4),\ (2, 4) \;\Rightarrow\; y = \pm\sqrt{x}`, at: 2, box: true },
      ] },
    },
    {
      ch: 4, say: 'Your turn! Find the inverse of f of x equals minus two plus three x, all over two.',
      countdown: 10,
      view: { kind: 'try', tex: R`f(x) = \dfrac{-2 + 3x}{2}`, hint: ['Switch x and y', 'Multiply by 2', 'Solve for y'] },
    },
    {
      ch: 4, say: '[[1]]Switch: x equals minus two plus three y, over two. [[2]]Multiply by two, and add two: two x plus two equals three y. [[3]]So f inverse is two x plus two, over three. Great job!',
      view: { kind: 'lines', lines: [
        { tex: R`x = \dfrac{-2 + 3y}{2}`, at: 1 },
        { tex: R`2x + 2 = 3y`, at: 2 },
        { tex: R`f^{-1}(x) = \dfrac{2x + 2}{3}`, at: 3, big: true, glow: true },
      ] },
    },
    {
      ch: 5, say: 'Recap. [[1]]An inverse swaps x and y. [[2]]To find it: switch x and y, then solve for y. [[3]]To check it: both compositions give x. [[4]]Its graph is the reflection over y equals x.',
      view: { kind: 'recap', items: [
        { text: 'Inverse = swap x and y.', at: 1 },
        { text: 'Find it: switch, then solve for y.', at: 2 },
        { tex: R`\text{Check: } f(f^{-1}(x)) = f^{-1}(f(x)) = x`, at: 3 },
        { text: 'Graph: reflect over y = x.', at: 4 },
      ] },
    },
    {
      ch: 5, say: 'That’s all of Unit 4: polynomials, start to finish! Now try the homework help, one step at a time. You’ve got this!',
      view: { kind: 'title', kicker: 'YOU DID IT · UNIT 4', title: 'Polynomials,', em: 'done.', sub: 'Next: homework help, one step at a time' },
    },
  ],
}
