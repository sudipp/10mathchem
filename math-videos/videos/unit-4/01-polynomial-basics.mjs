// Lesson 1 video script. Based on Day 3 notes (review) and HW #6 #1–2.
const R = String.raw

export default {
  id: '01-polynomial-basics',
  tag: 'UNIT 4 · LESSON 1 · POLYNOMIAL BASICS',
  chapters: ['Terms', 'Standard form', 'Degree', 'Names', 'Your turn', 'Recap'],
  scenes: [
    {
      ch: 0, say: 'Welcome to polynomials! In three minutes, you’ll learn to write a polynomial in standard form, and give it its proper name.',
      view: { kind: 'title', kicker: 'UNIT 4 · LESSON 1', title: 'Polynomial', em: 'basics', sub: 'Standard form, degree, and names.' },
    },
    {
      ch: 0, say: 'A polynomial is a sum of terms, [[1]]like three x squared, minus five x, plus seven. [[2]]Each term has a degree: the exponent on x.',
      view: { kind: 'lines', lines: [{ tex: R`3x^2 - 5x + 7`, at: 1, big: true }, { tex: R`\underbrace{3x^{\color{#CC5833}2}}_{\text{degree } 2}\qquad \underbrace{-5x^{\color{#CC5833}1}}_{\text{degree } 1}\qquad \underbrace{+7}_{\text{degree } 0}`, at: 2 }] },
    },
    {
      ch: 1, say: 'Standard form means [[1]]the highest degree goes first, then down to the lowest. Let’s fix this one from your notes.',
      view: { kind: 'sort', ruleAt: 1, terms: [{ tex: 'x^3', deg: 3 }, { tex: '+2', deg: 0 }, { tex: '-3x', deg: 1 }, { tex: '-2x^2', deg: 2 }], order: [0, 3, 2, 1] },
    },
    {
      ch: 1, say: '[[1]]x cubed has the highest degree, so it goes first. [[2]]Then minus two x squared. Keep each sign with its term! [[3]]Then minus three x, [[4]]and the plain number, plus two, goes last.',
      view: { kind: 'sort', ruleAt: -9, terms: [{ tex: 'x^3', deg: 3 }, { tex: '+2', deg: 0 }, { tex: '-3x', deg: 1 }, { tex: '-2x^2', deg: 2 }], order: [0, 3, 2, 1], fill: [1, 2, 3, 4] },
    },
    {
      ch: 2, say: 'The degree of the whole polynomial is its highest exponent. [[1]]Here, that’s three.',
      view: { kind: 'lines', lines: [{ tex: R`x^{\color{#CC5833}3} - 2x^2 - 3x + 2`, big: true }, { tex: R`\text{degree} = 3`, at: 1, glow: true }] },
    },
    {
      ch: 3, say: 'Polynomials are named by degree. [[1]]Degree zero is a constant. [[2]]One is linear. [[3]]Two is quadratic. [[4]]Three is cubic. [[5]]Four is quartic, [[6]]and five is quintic. [[7]]After that, just say sixth degree, seventh degree, and so on.',
      view: { kind: 'table', title: 'Name by degree', rows: [
        { left: '0', right: 'constant', at: 1 }, { left: '1', right: 'linear', at: 2 }, { left: '2', right: 'quadratic', at: 3 },
        { left: '3', right: 'cubic', at: 4 }, { left: '4', right: 'quartic', at: 5 }, { left: '5', right: 'quintic', at: 6 }, { left: '6+', right: 'sixth degree, seventh degree…', at: 7 },
      ] },
    },
    {
      ch: 3, say: 'They’re also named by how many terms they have. [[1]]One term is a monomial. [[2]]Two terms, a binomial. [[3]]Three terms, a trinomial. [[4]]Four or more: just say polynomial with four terms, and so on.',
      view: { kind: 'table', title: 'Name by number of terms', rows: [
        { left: '1', right: 'monomial', at: 1 }, { left: '2', right: 'binomial', at: 2 }, { left: '3', right: 'trinomial', at: 3 }, { left: '4+', right: 'polynomial with 4 terms…', at: 4 },
      ] },
    },
    {
      ch: 3, say: 'So x cubed minus two x squared minus three x plus two is a [[1]]cubic [[2]]polynomial with four terms.',
      view: { kind: 'lines', lines: [{ tex: R`x^3 - 2x^2 - 3x + 2`, big: true }, { tex: R`\text{degree } 3 \ \to\ \textbf{cubic}`, at: 1, box: true }, { tex: R`4 \text{ terms} \ \to\ \textbf{polynomial with 4 terms}`, at: 2, box: true }] },
    },
    {
      ch: 4, say: 'Your turn! Write minus four r, plus seven r to the sixth, in standard form, then name it by degree and number of terms.',
      countdown: 10,
      view: { kind: 'try', tex: R`-4r + 7r^6`, hint: ['Highest degree first', 'Degree?', 'How many terms?'] },
    },
    {
      ch: 4, say: '[[1]]Standard form: seven r to the sixth, minus four r. [[2]]The degree is six, and there are two terms. [[3]]So it’s a sixth degree binomial.',
      view: { kind: 'lines', lines: [{ tex: R`7r^6 - 4r`, at: 1, big: true }, { tex: R`\text{degree } 6,\ \ 2 \text{ terms}`, at: 2 }, { tex: R`\text{sixth degree binomial}`, at: 3, glow: true }] },
    },
    {
      ch: 5, say: 'Recap. [[1]]Standard form: highest degree first. [[2]]The degree is the highest exponent. [[3]]Name it by degree, [[4]]and by number of terms.',
      view: { kind: 'recap', items: [
        { text: 'Standard form: highest degree first.', at: 1 },
        { text: 'Degree = the highest exponent.', at: 2 },
        { text: 'By degree: constant, linear, quadratic, cubic, quartic, quintic.', at: 3 },
        { text: 'By terms: monomial, binomial, trinomial.', at: 4 },
      ] },
    },
    {
      ch: 5, say: 'Next up: zeros and factors, where a graph crosses the x-axis. See you there!',
      view: { kind: 'title', kicker: 'UP NEXT · LESSON 2', title: 'Zeros and', em: 'linear factors', sub: 'Where a graph meets the x-axis' },
    },
  ],
}
