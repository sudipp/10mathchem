// Lesson 11 video script. Based on Day 11 notes (Examples 1-4) and HW #11 #15.
const R = String.raw
const O = '#CC5833'

export default {
  id: '11-conjugate-roots',
  tag: 'UNIT 4 · LESSON 11 · IRRATIONAL & COMPLEX ROOTS',
  chapters: ['Pairs', 'Find partners', 'Build', 'Your turn', 'All roots', 'Recap'],
  layouts: {
    all: { type: 'synth', num: [1, -6, 13, -10], k: 2 },
    allg: { type: 'graph', num: [1, -6, 13, -10], window: [-1, 5, -12, 12] },
  },
  scenes: [
    {
      ch: 0, say: 'Some roots are irrational, like two minus root seven. Some are complex, like four plus five i. In a polynomial with integer coefficients, these roots always come in pairs.',
      view: { kind: 'title', kicker: 'UNIT 4 · LESSON 11', title: 'Irrational &', em: 'complex roots', sub: 'Roots that always come in pairs.' },
    },
    {
      ch: 0, say: 'Here are the two theorems. [[1]]If a plus root b is a root, then its conjugate, a minus root b, is a root too. [[2]]If a plus b i is a root, then a minus b i is a root too. [[3]]Just flip the sign in front of the root, or in front of the i.',
      view: { kind: 'lines', lines: [
        { tex: R`a + \sqrt{b} \;\Rightarrow\; a \mathbin{\color{${O}}-} \sqrt{b}`, at: 1, box: true },
        { tex: R`a + bi \;\Rightarrow\; a \mathbin{\color{${O}}-} bi`, at: 2, box: true },
        { tex: R`\text{flip the sign of the } \sqrt{\ }\text{ or } i \text{ part only}`, at: 3 },
      ] },
    },
    {
      ch: 1, say: 'Let’s find the partners. [[1]]One plus root three pairs with one minus root three, and minus root eleven pairs with root eleven. [[2]]Two minus root seven pairs with two plus root seven, and four plus five i with four minus five i. [[3]]Three minus i pairs with three plus i, and four i with minus four i.',
      view: { kind: 'table', title: 'Given root → its partner', rows: [
        { left: '1 + √3,  −√11', right: '1 − √3,  √11', at: 1 },
        { left: '2 − √7,  4 + 5i', right: '2 + √7,  4 − 5i', at: 2 },
        { left: '3 − i,  4i', right: '3 + i,  −4i', at: 3 },
      ] },
    },
    {
      ch: 2, say: 'Now build a polynomial. Find a third-degree polynomial with integer coefficients and roots eight and three i. [[1]]Three i brings its partner, minus three i. That makes three roots, for degree three. [[2]]Write a factor for each root. [[3]]Multiply the pair first: x squared minus nine i squared, which is x squared plus nine. [[4]]Then times x minus eight.',
      view: { kind: 'lines', lines: [
        { tex: R`\text{roots: } 8,\ 3i,\ {\color{${O}}-3i}`, at: 1 },
        { tex: R`(x - 8)(x - 3i)(x + 3i)`, at: 2 },
        { tex: R`(x - 3i)(x + 3i) = x^2 - 9i^2 = x^2 + 9`, at: 3, box: true },
        { tex: R`(x - 8)(x^2 + 9) = x^3 - 8x^2 + 9x - 72 = 0`, at: 4, glow: true },
      ] },
    },
    {
      ch: 2, say: 'For a pair like a plus b i and a minus b i, there’s a shortcut. [[1]]Multiply the two factors, and you get x minus a, squared, minus b i squared. [[2]]For one plus two i, that’s x minus one squared, minus two i squared. [[3]]Which is x squared minus two x plus one, plus four: x squared minus two x plus five.',
      view: { kind: 'lines', lines: [
        { tex: R`\big(x - (a + bi)\big)\big(x - (a - bi)\big) = (x - a)^2 - (bi)^2`, at: 1, box: true },
        { tex: R`1 \pm 2i:\ (x - 1)^2 - (2i)^2`, at: 2 },
        { tex: R`= x^2 - 2x + 1 + 4 = x^2 - 2x + 5`, at: 3, glow: true },
      ] },
    },
    {
      ch: 2, say: 'So for roots minus three, and one plus two i: [[1]]the roots are minus three, one plus two i, and one minus two i. [[2]]Multiply x plus three, by x squared minus two x plus five. [[3]]You get x cubed plus x squared minus x plus fifteen. Every coefficient is an integer. That’s how you know the pairs worked.',
      view: { kind: 'lines', lines: [
        { tex: R`\text{roots: } -3,\ 1 + 2i,\ {\color{${O}}1 - 2i}`, at: 1 },
        { tex: R`(x + 3)(x^2 - 2x + 5)`, at: 2 },
        { tex: R`x^3 + x^2 - x + 15 = 0`, at: 3, big: true, glow: true },
      ] },
    },
    {
      ch: 3, say: 'Your turn! Find a polynomial with integer coefficients that has roots five and root two.',
      countdown: 10,
      view: { kind: 'try', tex: R`\text{roots: } 5 \text{ and } \sqrt{2}`, hint: ['Partner of √2', 'Multiply the pair', 'Times (x − 5)'] },
    },
    {
      ch: 3, say: '[[1]]Root two brings its partner, minus root two. [[2]]The pair multiplies to x squared minus two. [[3]]Times x minus five gives x cubed minus five x squared minus two x plus ten. Great job!',
      view: { kind: 'lines', lines: [
        { tex: R`\text{roots: } 5,\ \sqrt2,\ {\color{${O}}-\sqrt2}`, at: 1 },
        { tex: R`(x - \sqrt2)(x + \sqrt2) = x^2 - 2`, at: 2, box: true },
        { tex: R`(x - 5)(x^2 - 2) = x^3 - 5x^2 - 2x + 10 = 0`, at: 3, glow: true },
      ] },
    },
    {
      ch: 4, say: 'Now let’s find every root of x cubed minus six x squared plus thirteen x minus ten. [[1]]Use the Rational Root Theorem: f of two is zero. [[2]]Divide by x minus two to get x squared minus four x plus five.',
      view: { kind: 'synth', layout: 'all', reveal: [['coef', 0], ['k', 1], ['down', 2], ['m1', 2], ['a1', 2], ['m2', 2], ['a2', 2], ['m3', 2], ['a3', 2]], answer: [{ tex: R`f(2) = 0\ \checkmark \;\to\; x^2 - 4x + 5`, at: 2 }] },
    },
    {
      ch: 4, say: 'That quadratic doesn’t factor, so use the quadratic formula. [[1]]Four plus or minus the square root of sixteen minus twenty, all over two. [[2]]The square root of minus four is two i, so the roots are two plus i and two minus i. A conjugate pair, just like the theorem says!',
      view: { kind: 'lines', lines: [
        { tex: R`x = \dfrac{4 \pm \sqrt{16 - 20}}{2} = \dfrac{4 \pm 2i}{2}`, at: 1 },
        { tex: R`x = 2,\quad 2 \pm i`, at: 2, big: true, glow: true },
      ] },
    },
    {
      ch: 4, say: 'On the graph, [[1]]you only see the real root, two. The complex pair never shows up on the x-axis.',
      view: { kind: 'graph', layout: 'allg', title: R`f(x) = x^3 - 6x^2 + 13x - 10`, reveal: [['curve', 0], ['zeros', 1]], side: [{ tex: R`\text{real root: } 2`, at: 1, strong: true }, { tex: R`2 \pm i \text{ not on the graph}`, at: 1 }] },
    },
    {
      ch: 5, say: 'Recap. [[1]]Irrational roots come in pairs: a plus or minus root b. [[2]]Complex roots come in pairs: a plus or minus b i. [[3]]To build a polynomial, add the partners, multiply each pair first, then multiply everything. [[4]]To find all roots, use the Rational Root Theorem, divide, then the quadratic formula.',
      view: { kind: 'recap', items: [
        { tex: R`a + \sqrt b \;\Rightarrow\; a - \sqrt b`, at: 1 },
        { tex: R`a + bi \;\Rightarrow\; a - bi`, at: 2 },
        { text: 'Build: add partners, multiply each pair, then the rest.', at: 3 },
        { text: 'All roots: RRT → divide → quadratic formula.', at: 4 },
      ] },
    },
    {
      ch: 5, say: 'That’s all of Unit 4: polynomials in a day! Now try the homework help, one step at a time. You’ve got this!',
      view: { kind: 'title', kicker: 'YOU DID IT · UNIT 4', title: 'Polynomials,', em: 'done.', sub: 'Next: homework help, one step at a time' },
    },
  ],
}
