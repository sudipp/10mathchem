// Lesson 2 video script. Based on HW #1 problems 8, 10, 11, and 16.
const R = String.raw
const O = '#CC5833', G = '#3d6b50'

export default {
  id: '02-multiplying-radicals',
  tag: 'UNIT 5 · LESSON 2 · MULTIPLYING RADICALS',
  chapters: ['The rule', 'Simplify after', 'Distribute', 'Your turn', 'Recap'],
  scenes: [
    {
      ch: 0, say: 'Today you’ll multiply radicals. There’s one rule, and then you simplify.',
      view: { kind: 'title', kicker: 'UNIT 5 · LESSON 2', title: 'Multiplying', em: 'radicals', sub: 'Outside times outside, inside times inside.' },
    },
    {
      ch: 0, say: 'Here’s the rule. [[1]]Multiply the numbers outside the roots together, and the numbers inside together. [[2]]For example, two root five times root five is two root twenty-five. [[3]]Root twenty-five is five, so the answer is ten. A root times itself is just the number inside.',
      view: { kind: 'lines', lines: [
        { tex: R`{\color{${O}}a}\sqrt{\color{${G}}b} \cdot {\color{${O}}c}\sqrt{\color{${G}}d} = {\color{${O}}ac}\sqrt{\color{${G}}bd}`, at: 1, box: true },
        { tex: R`2\sqrt5 \cdot \sqrt5 = 2\sqrt{25}`, at: 2 },
        { tex: R`= 2 \cdot 5 = 10`, at: 3, glow: true },
      ] },
    },
    {
      ch: 1, say: 'After you multiply, always look for perfect squares again. [[1]]Root five times root ten is root fifty. [[2]]Fifty is twenty-five times two, [[3]]so the answer is five root two.',
      view: { kind: 'lines', lines: [
        { tex: R`\sqrt5 \cdot \sqrt{10} = \sqrt{50}`, at: 1 },
        { tex: R`= \sqrt{{\color{${O}}25} \cdot 2}`, at: 2 },
        { tex: R`= 5\sqrt2`, at: 3, glow: true },
      ] },
    },
    {
      ch: 1, say: 'With variables: negative five root five x cubed, times root three x squared. [[1]]Multiply inside: negative five root fifteen x to the fifth. [[2]]x to the fifth is x to the fourth times x. [[3]]x to the fourth comes out as x squared, so the answer is negative five x squared root fifteen x.',
      view: { kind: 'lines', lines: [
        { tex: R`-5\sqrt{5x^3} \cdot \sqrt{3x^2}` },
        { tex: R`= -5\sqrt{15x^5}`, at: 1 },
        { tex: R`x^5 = {\color{${O}}x^4} \cdot x`, at: 2 },
        { tex: R`= -5x^2\sqrt{15x}`, at: 3, glow: true },
      ] },
    },
    {
      ch: 2, say: 'A radical times a sum? Distribute, just like a times b plus c. Root fifteen x, times root ten plus four root three x. [[1]]Multiply root fifteen x by each term. [[2]]That gives root one fifty x plus four root forty-five x squared. [[3]]One fifty is twenty-five times six, and forty-five x squared is nine x squared times five. [[4]]So it’s five root six x plus twelve x root five. The roots are different, so they don’t combine.',
      view: { kind: 'lines', lines: [
        { tex: R`\sqrt{15x}\left(\sqrt{10} + 4\sqrt{3x}\right)` },
        { tex: R`= {\color{${O}}\sqrt{15x}}\cdot\sqrt{10} + 4\,{\color{${O}}\sqrt{15x}}\cdot\sqrt{3x}`, at: 1 },
        { tex: R`= \sqrt{150x} + 4\sqrt{45x^2}`, at: 2 },
        { tex: R`= 5\sqrt{6x} + 4 \cdot 3x\sqrt5`, at: 3 },
        { tex: R`= 5\sqrt{6x} + 12x\sqrt5`, at: 4, glow: true },
      ] },
    },
    {
      ch: 3, say: 'Your turn! Multiply three root two times four root six, and simplify.',
      countdown: 10,
      view: { kind: 'try', tex: R`3\sqrt2 \cdot 4\sqrt6`, hint: ['Outside: 3 · 4', 'Inside: 2 · 6', 'Simplify the root'] },
    },
    {
      ch: 3, say: '[[1]]Outside, three times four is twelve. Inside, two times six is twelve. [[2]]Root twelve is root four times three, which is two root three. [[3]]Twelve times two root three is twenty-four root three.',
      view: { kind: 'lines', lines: [
        { tex: R`3\sqrt2 \cdot 4\sqrt6 = 12\sqrt{12}`, at: 1 },
        { tex: R`\sqrt{12} = \sqrt{{\color{${O}}4} \cdot 3} = 2\sqrt3`, at: 2 },
        { tex: R`= 24\sqrt3`, at: 3, glow: true },
      ] },
    },
    {
      ch: 4, say: 'Recap. [[1]]Multiply outside times outside, inside times inside. [[2]]A root times itself is the number inside. [[3]]Simplify the new root at the end. [[4]]Distribute over sums, and only combine terms with the same root.',
      view: { kind: 'recap', items: [
        { text: 'Outside × outside, inside × inside.', at: 1 },
        { text: '√a · √a = a.', at: 2 },
        { text: 'Simplify the new root at the end.', at: 3 },
        { text: 'Distribute; combine only matching roots.', at: 4 },
      ] },
    },
    {
      ch: 4, say: 'Next up: dividing radicals and rationalizing the denominator. See you there!',
      view: { kind: 'title', kicker: 'UP NEXT · LESSON 3', title: 'Dividing', em: 'radicals', sub: 'No roots left in the denominator' },
    },
  ],
}
