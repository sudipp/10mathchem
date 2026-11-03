// Lesson 5 video script. Based on Day 7 notes (Examples 1A, 2A) and HW #7 #1, #6, #9.
const R = String.raw
const O = '#CC5833', G = '#3d6b50'

export default {
  id: '05-factoring',
  tag: 'UNIT 4 · LESSON 5 · FACTORING',
  chapters: ['GCF first', 'Cubes', 'Quadratic form', 'Grouping', 'Your turn', 'Recap'],
  scenes: [
    {
      ch: 0, say: 'Today you’ll factor polynomials bigger than quadratics, using three patterns. But first, one golden rule.',
      view: { kind: 'title', kicker: 'UNIT 4 · LESSON 5', title: 'Factoring', em: 'bigger polynomials', sub: 'Cubes, quadratic form, and grouping.' },
    },
    {
      ch: 0, say: 'Always take out the greatest common factor first. [[1]]Two u cubed plus four hundred thirty-two [[2]]becomes two, times u cubed plus two hundred sixteen. Now it’s easier.',
      view: { kind: 'lines', title: 'Golden rule: GCF first', lines: [{ tex: R`2u^3 + 432`, at: 1, big: true }, { tex: R`= {\color{${O}}2}(u^3 + 216)`, at: 2, big: true }] },
    },
    {
      ch: 1, say: 'Pattern one: cubes. [[1]]a cubed plus b cubed factors like this. [[2]]a cubed minus b cubed, like this. [[3]]Remember the signs with SOAP: Same, Opposite, Always Positive.',
      view: { kind: 'cards', cards: [
        { head: 'Sum of cubes', tex: R`a^3 + b^3 = (a \mathbin{\color{${O}}+} b)(a^2 \mathbin{\color{${O}}-} ab \mathbin{\color{${O}}+} b^2)`, at: 1 },
        { head: 'Difference of cubes', tex: R`a^3 - b^3 = (a \mathbin{\color{${O}}-} b)(a^2 \mathbin{\color{${O}}+} ab \mathbin{\color{${O}}+} b^2)`, at: 2 },
      ], chips: { items: ['Same', 'Opposite', 'Always Positive'], at: 3 } },
    },
    {
      ch: 1, say: 'Try x cubed plus twenty-seven. [[1]]x cubed is x, cubed. Twenty-seven is three, cubed. [[2]]So a is x, and b is three. [[3]]Plug them in: x plus three, times x squared minus three x plus nine.',
      view: { kind: 'lines', lines: [
        { tex: R`x^3 + 27` },
        { tex: R`= {\color{${O}}x}^3 + {\color{${G}}3}^3`, at: 1 },
        { tex: R`a = {\color{${O}}x},\quad b = {\color{${G}}3}`, at: 2 },
        { tex: R`= (x + 3)(x^2 - 3x + 9)`, at: 3, glow: true },
      ] },
    },
    {
      ch: 2, say: 'Pattern two: quadratic form. When the exponents are four and two, [[1]]let w equal u squared. [[2]]Now it’s w squared plus nine w plus fourteen, which factors into w plus two, times w plus seven. [[3]]Put u squared back in for w.',
      view: { kind: 'lines', lines: [
        { tex: R`u^4 + 9u^2 + 14` },
        { tex: R`\text{let } w = u^2`, at: 1, box: true },
        { tex: R`w^2 + 9w + 14 = (w + 2)(w + 7)`, at: 2 },
        { tex: R`= (u^2 + 2)(u^2 + 7)`, at: 3, glow: true },
      ] },
    },
    {
      ch: 3, say: 'Pattern three: grouping, for four terms. [[1]]Group the first two terms, and the last two. [[2]]Factor each group: seven m squared, times five m plus one, minus four, times five m plus one. [[3]]Five m plus one is in both, so factor it out!',
      view: { kind: 'lines', lines: [
        { tex: R`35m^3 + 7m^2 - 20m - 4` },
        { tex: R`= (35m^3 + 7m^2) + (-20m - 4)`, at: 1 },
        { tex: R`= 7m^2{\color{${O}}(5m + 1)} - 4{\color{${O}}(5m + 1)}`, at: 2 },
        { tex: R`= (7m^2 - 4)(5m + 1)`, at: 3, glow: true },
      ] },
    },
    {
      ch: 4, say: 'Your turn! Factor eight x cubed minus twenty-seven. Which pattern is it?',
      countdown: 10,
      view: { kind: 'try', tex: R`8x^3 - 27`, hint: ['GCF?', 'Cubes?', 'a = ?  b = ?'] },
    },
    {
      ch: 4, say: '[[1]]Eight x cubed is two x, cubed, and twenty-seven is three cubed. [[2]]It’s a difference of cubes, so use same, opposite, always positive: [[3]]two x minus three, times four x squared plus six x plus nine.',
      view: { kind: 'lines', lines: [
        { tex: R`8x^3 - 27 = ({\color{${O}}2x})^3 - {\color{${G}}3}^3`, at: 1 },
        { tex: R`a^3 - b^3 = (a - b)(a^2 + ab + b^2)`, at: 2, box: true },
        { tex: R`= (2x - 3)(4x^2 + 6x + 9)`, at: 3, glow: true },
      ] },
    },
    {
      ch: 5, say: 'Recap. [[1]]Always take out the GCF first. [[2]]Two cubes? Use the cube patterns and SOAP. [[3]]Exponents four and two? Use quadratic form. [[4]]Four terms? Try grouping.',
      view: { kind: 'recap', items: [
        { text: 'GCF first, every time.', at: 1 },
        { text: 'Two cubes → sum or difference of cubes (SOAP).', at: 2 },
        { text: 'Exponents 4 and 2 → quadratic form (let w = x²).', at: 3 },
        { text: 'Four terms → grouping.', at: 4 },
      ] },
    },
    {
      ch: 5, say: 'Next up: solving polynomial equations, using everything you’ve learned. See you there!',
      view: { kind: 'title', kicker: 'UP NEXT · LESSON 6', title: 'Solving', em: 'polynomial equations', sub: 'Factor, then set each piece to zero' },
    },
  ],
}
