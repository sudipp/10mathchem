// Lesson 3 video script. Based on HW #1 problems 17, 19, and 22.
const R = String.raw
const O = '#CC5833', G = '#3d6b50'

export default {
  id: '03-dividing-rationalizing',
  tag: 'UNIT 5 · LESSON 3 · DIVIDING & RATIONALIZING',
  chapters: ['One root', 'Rationalize', 'With variables', 'Your turn', 'Recap'],
  scenes: [
    {
      ch: 0, say: 'Today you’ll divide radicals. A simplified answer never has a square root in the denominator, so you’ll learn to get rid of it.',
      view: { kind: 'title', kicker: 'UNIT 5 · LESSON 3', title: 'Dividing', em: 'radicals', sub: 'And rationalizing the denominator.' },
    },
    {
      ch: 0, say: 'The quotient property: [[1]]root a over root b equals the root of a over b. So put everything under one root. [[2]]Five root twenty over root one twenty-five [[3]]is five times the root of twenty over one twenty-five, which reduces to four over twenty-five. [[4]]Root four over twenty-five is two fifths, and five times two fifths is two.',
      view: { kind: 'lines', lines: [
        { tex: R`\dfrac{\sqrt a}{\sqrt b} = \sqrt{\dfrac ab}`, at: 1, box: true },
        { tex: R`\dfrac{5\sqrt{20}}{\sqrt{125}}`, at: 2 },
        { tex: R`= 5\sqrt{\dfrac{20}{125}} = 5\sqrt{\dfrac{4}{25}}`, at: 3 },
        { tex: R`= 5 \cdot \dfrac25 = 2`, at: 4, glow: true },
      ] },
    },
    {
      ch: 1, say: 'What if a root is stuck on the bottom, like five over root three? [[1]]Multiply the top and the bottom by root three. That’s multiplying by one, so the value doesn’t change. [[2]]On the bottom, root three times root three is three. [[3]]The answer is five root three over three. No root in the denominator!',
      view: { kind: 'lines', lines: [
        { tex: R`\dfrac{5}{\sqrt3}` },
        { tex: R`= \dfrac{5}{\sqrt3} \cdot {\color{${O}}\dfrac{\sqrt3}{\sqrt3}}`, at: 1 },
        { tex: R`\sqrt3 \cdot \sqrt3 = {\color{${G}}3}`, at: 2 },
        { tex: R`= \dfrac{5\sqrt3}{3}`, at: 3, glow: true },
      ] },
    },
    {
      ch: 2, say: 'With variables: root sixteen x cubed y squared, over root twenty x cubed y. [[1]]Put it under one root and reduce: sixteen over twenty is four fifths, x cubed cancels, and y squared over y is y. [[2]]Root four y over five is two root y over root five. Rationalize with root five. [[3]]The answer is two root five y, over five.',
      view: { kind: 'lines', lines: [
        { tex: R`\dfrac{\sqrt{16x^3y^2}}{\sqrt{20x^3y}}` },
        { tex: R`= \sqrt{\dfrac{4y}{5}}`, at: 1 },
        { tex: R`= \dfrac{2\sqrt y}{\sqrt5} \cdot {\color{${O}}\dfrac{\sqrt5}{\sqrt5}}`, at: 2 },
        { tex: R`= \dfrac{2\sqrt{5y}}{5}`, at: 3, glow: true },
      ] },
    },
    {
      ch: 3, say: 'Your turn! Rationalize six over root two.',
      countdown: 10,
      view: { kind: 'try', tex: R`\dfrac{6}{\sqrt2}`, hint: ['Multiply by √2 / √2', '√2 · √2 = ?', 'Reduce'] },
    },
    {
      ch: 3, say: '[[1]]Multiply top and bottom by root two. [[2]]That gives six root two over two. [[3]]Six over two is three, so the answer is three root two.',
      view: { kind: 'lines', lines: [
        { tex: R`\dfrac{6}{\sqrt2} \cdot \dfrac{\sqrt2}{\sqrt2}`, at: 1 },
        { tex: R`= \dfrac{6\sqrt2}{2}`, at: 2 },
        { tex: R`= 3\sqrt2`, at: 3, glow: true },
      ] },
    },
    {
      ch: 4, say: 'Recap. [[1]]Put the fraction under one root and reduce it. [[2]]If a root is left on the bottom, multiply top and bottom by that root. [[3]]Then simplify, and check that no root is left in the denominator.',
      view: { kind: 'recap', items: [
        { text: 'One root: √a / √b = √(a/b). Reduce inside.', at: 1 },
        { text: 'Root on the bottom? Multiply by √n / √n.', at: 2 },
        { text: 'Simplify. No root left in the denominator.', at: 3 },
      ] },
    },
    {
      ch: 4, say: 'That’s radicals! Now practice with HW number one, and then the fall final review. You’ve got this!',
      view: { kind: 'title', kicker: 'UNIT 5 · PRACTICE', title: 'Try HW #1', em: 'then the final review', sub: 'Homework help shows every step' },
    },
  ],
}
