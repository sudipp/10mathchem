// Unit 2, Lesson 1 video script: the quadratic formula. Based on Day 11 notes (Examples A, D, E) and HW #11.
const R = String.raw
const O = '#CC5833'

export default {
  id: '01-quadratic-formula',
  tag: 'UNIT 2 · LESSON 1 · QUADRATIC FORMULA',
  chapters: ['The formula', 'Steps', 'Example', 'Simplifying', 'Your turn', 'Recap'],
  layouts: {
    ex: { type: 'plane', window: [-2, 7, -4, 6], tex: R`y = x^2 - 5x + 3`, items: [
      { key: 'curve', kind: 'fn', f: x => x * x - 5 * x + 3 },
      { key: 'roots', kind: 'dots', pts: [[(5 + Math.sqrt(13)) / 2, 0], [(5 - Math.sqrt(13)) / 2, 0]], style: 'sol', labels: true },
    ] },
  },
  scenes: [
    {
      ch: 0, say: 'Welcome to Unit two. When a quadratic won’t factor, there is one formula that solves it every time.',
      view: { kind: 'title', kicker: 'UNIT 2 · LESSON 1', title: 'The quadratic', em: 'formula', sub: 'Solves any ax² + bx + c = 0.' },
    },
    {
      ch: 0, say: 'For a x squared plus b x plus c equals zero, [[1]]x equals negative b, plus or minus the square root of b squared minus four a c, all over two a. The plus or minus gives you two answers.',
      view: { kind: 'lines', lines: [
        { tex: R`ax^2 + bx + c = 0` },
        { tex: R`x = \dfrac{-b \pm \sqrt{b^2 - 4ac}}{2a}`, at: 1, big: true, box: true },
      ] },
    },
    {
      ch: 1, say: 'Five steps. [[1]]Put the equation in standard form, equal to zero. [[2]]Read a, b, and c, with their signs. [[3]]Plug in and simplify under the root first. [[4]]Split the plus or minus into two answers. [[5]]Simplify and box both.',
      view: { kind: 'recap', items: [
        { text: '1. Standard form, = 0.', at: 1 },
        { text: '2. Read a, b, c (with signs).', at: 2 },
        { text: '3. Plug in; simplify under the root.', at: 3 },
        { text: '4. Split ± into two answers.', at: 4 },
        { text: '5. Simplify and box both.', at: 5 },
      ] },
    },
    {
      ch: 2, say: 'Solve x squared minus five x plus three equals zero. [[1]]a is one, b is negative five, c is three. [[2]]Plug in: x equals five, plus or minus the root of twenty-five minus twelve, over two. [[3]]Twenty-five minus twelve is thirteen. So x equals five plus or minus root thirteen, over two.',
      view: { kind: 'lines', lines: [
        { tex: R`x^2 - 5x + 3 = 0` },
        { tex: R`a = 1,\ b = {\color{${O}}-5},\ c = 3`, at: 1 },
        { tex: R`x = \dfrac{5 \pm \sqrt{25 - 12}}{2}`, at: 2 },
        { tex: R`x = \dfrac{5 \pm \sqrt{13}}{2}`, at: 3, glow: true },
      ] },
    },
    {
      ch: 2, say: '[[1]]On the graph, those are where the parabola crosses the x-axis: about four point three and zero point seven.',
      view: { kind: 'plane', layout: 'ex', reveal: [['curve', 0], ['roots', 1]], side: [{ tex: R`\dfrac{5 + \sqrt{13}}{2} \approx 4.30`, at: 1 }, { tex: R`\dfrac{5 - \sqrt{13}}{2} \approx 0.70`, at: 1 }] },
    },
    {
      ch: 3, say: 'Simplify the root before you finish. Solve seven x squared equals two x plus eight. [[1]]Standard form: seven x squared minus two x minus eight equals zero. [[2]]Under the root: four plus two twenty-four is two twenty-eight. [[3]]Two twenty-eight is four times fifty-seven, so its root is two root fifty-seven. [[4]]Every term divides by two: x equals one plus or minus root fifty-seven, over seven.',
      view: { kind: 'lines', lines: [
        { tex: R`7x^2 - 2x - 8 = 0`, at: 1 },
        { tex: R`x = \dfrac{2 \pm \sqrt{4 + 224}}{14}`, at: 2 },
        { tex: R`\sqrt{228} = \sqrt{4 \cdot 57} = 2\sqrt{57}`, at: 3 },
        { tex: R`x = \dfrac{2 \pm 2\sqrt{57}}{14} = \dfrac{1 \pm \sqrt{57}}{7}`, at: 4, glow: true },
      ] },
    },
    {
      ch: 4, say: 'Your turn! In three x squared plus twelve x equals fifteen, what are a, b, and c?',
      countdown: 10,
      view: { kind: 'try', tex: R`3x^2 + 12x = 15`, hint: ['Standard form first', 'Watch the sign of c'] },
    },
    {
      ch: 4, say: '[[1]]Get zero on one side: three x squared plus twelve x minus fifteen equals zero. [[2]]So a is three, b is twelve, and c is negative fifteen. The answers are one and negative five.',
      view: { kind: 'lines', lines: [
        { tex: R`3x^2 + 12x - 15 = 0`, at: 1 },
        { tex: R`a = 3,\ b = 12,\ c = -15`, at: 2, glow: true },
      ] },
    },
    {
      ch: 5, say: 'Recap. [[1]]Standard form first. [[2]]Plug a, b, and c into the formula. [[3]]Simplify the root, split the plus or minus, and reduce.',
      view: { kind: 'recap', items: [
        { text: 'Standard form, = 0.', at: 1 },
        { text: 'x = (−b ± √(b² − 4ac)) / 2a.', at: 2 },
        { text: 'Simplify the root, split, reduce.', at: 3 },
      ] },
    },
    {
      ch: 5, say: 'Next up: the discriminant and complex numbers. See you there!',
      view: { kind: 'title', kicker: 'UP NEXT · LESSON 2', title: 'The discriminant', em: 'and complex numbers', sub: 'b² − 4ac counts the solutions' },
    },
  ],
}
