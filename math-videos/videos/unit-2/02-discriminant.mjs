// Unit 2, Lesson 2 video script: the discriminant and complex numbers. Based on Day 12 notes and HW #12.
const R = String.raw

export default {
  id: '02-discriminant',
  tag: 'UNIT 2 · LESSON 2 · THE DISCRIMINANT',
  chapters: ['Three cases', 'Example', 'Imaginary i', 'Complex math', 'Your turn', 'Recap'],
  layouts: {
    two: { type: 'plane', window: [-4, 4, -4, 4], tex: R`b^2 - 4ac > 0`, items: [{ key: 'c', kind: 'fn', f: x => x * x - 2 }, { key: 'd', kind: 'dots', pts: [[Math.SQRT2, 0], [-Math.SQRT2, 0]], style: 'sol' }] },
    one: { type: 'plane', window: [-4, 4, -4, 4], tex: R`b^2 - 4ac = 0`, items: [{ key: 'c', kind: 'fn', f: x => (x - 1) ** 2 }, { key: 'd', kind: 'dots', pts: [[1, 0]], style: 'sol' }] },
    none: { type: 'plane', window: [-4, 4, -2, 6], tex: R`6x^2 - 2x + 5`, items: [{ key: 'c', kind: 'fn', f: x => 6 * x * x - 2 * x + 5 }] },
  },
  scenes: [
    {
      ch: 0, say: 'Before you solve, one quick number tells you how many solutions to expect. It’s called the discriminant.',
      view: { kind: 'title', kicker: 'UNIT 2 · LESSON 2', title: 'The discriminant', em: 'and complex numbers', sub: 'b² − 4ac counts the solutions.' },
    },
    {
      ch: 0, say: 'The discriminant is the part under the root: b squared minus four a c. [[1]]Positive: two real solutions. [[2]]Zero: one real solution. [[3]]Negative: no real solutions, but two imaginary ones.',
      view: { kind: 'cards', title: 'The discriminant: b² − 4ac', cards: [
        { head: 'Positive', text: 'two real solutions', at: 1 },
        { head: 'Zero', text: 'one real solution', at: 2 },
        { head: 'Negative', text: 'two imaginary solutions', at: 3, dark: true },
      ] },
    },
    {
      ch: 0, say: 'On a graph: [[1]]a positive discriminant means the parabola crosses the x-axis twice.',
      view: { kind: 'plane', layout: 'two', reveal: [['c', 0], ['d', 1]], side: [{ text: 'Crosses twice', at: 1, strong: true }] },
    },
    {
      ch: 0, say: '[[1]]Zero means it just touches the axis once, at the vertex.',
      view: { kind: 'plane', layout: 'one', reveal: [['c', 0], ['d', 1]], side: [{ text: 'Touches once', at: 1, strong: true }] },
    },
    {
      ch: 1, say: 'How many solutions does six x squared minus two x equals negative five have? [[1]]Standard form: six x squared minus two x plus five equals zero. [[2]]b squared minus four a c is four minus one twenty: negative one sixteen. [[3]]Negative: two imaginary solutions. The parabola never touches the axis.',
      view: { kind: 'plane', layout: 'none', reveal: [['c', 3]], side: [{ tex: R`6x^2 - 2x + 5 = 0`, at: 1 }, { tex: R`4 - 120 = -116`, at: 2 }, { tex: R`\text{two imaginary}`, at: 3, strong: true }] },
    },
    {
      ch: 2, say: 'Imaginary numbers start with i. [[1]]i is the square root of negative one, so i squared is negative one. [[2]]Then the root of negative sixteen is four i, [[3]]and the root of negative twelve is two i root three.',
      view: { kind: 'lines', lines: [
        { tex: R`i = \sqrt{-1},\quad i^2 = -1`, at: 1, box: true },
        { tex: R`\sqrt{-16} = 4i`, at: 2 },
        { tex: R`\sqrt{-12} = 2i\sqrt3`, at: 3 },
      ] },
    },
    {
      ch: 3, say: 'Complex numbers look like a plus b i. [[1]]To add, combine real parts and imaginary parts. [[2]]To multiply, FOIL, then replace i squared with negative one. Three minus eight i, times negative six minus six i, is negative sixty-six plus thirty i. [[3]]To divide, multiply top and bottom by the conjugate.',
      view: { kind: 'lines', lines: [
        { tex: R`(4 - i) - (-7 - 2i) = 11 + i`, at: 1 },
        { tex: R`(3 - 8i)(-6 - 6i) = -18 + 30i + 48i^2 = -66 + 30i`, at: 2 },
        { tex: R`\dfrac{10}{7 + i} \cdot \dfrac{7 - i}{7 - i} = \dfrac75 - \dfrac15i`, at: 3, glow: true },
      ] },
    },
    {
      ch: 4, say: 'Your turn! What is two plus three i, times two minus three i?',
      countdown: 10,
      view: { kind: 'try', tex: R`(2 + 3i)(2 - 3i)`, hint: ['FOIL', 'i² = −1'] },
    },
    {
      ch: 4, say: '[[1]]FOIL: four minus six i plus six i minus nine i squared. [[2]]The i terms cancel, and minus nine i squared is plus nine. [[3]]The answer is thirteen. Conjugates always multiply to a real number.',
      view: { kind: 'lines', lines: [
        { tex: R`4 - 6i + 6i - 9i^2`, at: 1 },
        { tex: R`= 4 + 9`, at: 2 },
        { tex: R`= 13`, at: 3, glow: true },
      ] },
    },
    {
      ch: 5, say: 'Recap. [[1]]b squared minus four a c: positive, two real; zero, one; negative, two imaginary. [[2]]i squared is negative one. [[3]]Multiply with FOIL; divide with the conjugate.',
      view: { kind: 'recap', items: [
        { text: 'Discriminant +, 0, − → 2 real, 1 real, 2 imaginary.', at: 1 },
        { text: 'i² = −1; √−n = i√n.', at: 2 },
        { text: 'Multiply: FOIL. Divide: conjugate.', at: 3 },
      ] },
    },
    {
      ch: 5, say: 'Next up: completing the square and changing forms. See you there!',
      view: { kind: 'title', kicker: 'UP NEXT · LESSON 3', title: 'Completing', em: 'the square', sub: 'Standard, vertex, and intercept form' },
    },
  ],
}
