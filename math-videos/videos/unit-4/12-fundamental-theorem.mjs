// Lesson 12 video script. Based on Day 12 notes (Examples 1-3).
const R = String.raw
const O = '#CC5833'

export default {
  id: '12-fundamental-theorem',
  tag: 'UNIT 4 · LESSON 12 · FUNDAMENTAL THEOREM OF ALGEBRA',
  chapters: ['The theorem', 'Counting', 'All zeros', 'Graph', 'Your turn', 'Recap'],
  layouts: {
    ex1a: { type: 'synth', num: [1, 3, -8, -22, -24], k: 3 },
    ex1b: { type: 'synth', num: [1, 6, 10, 8], k: -4 },
    ex1g: { type: 'graph', num: [1, 3, -8, -22, -24], window: [-5.5, 4.5, -70, 50] },
  },
  scenes: [
    {
      ch: 0, say: 'How many zeros can a polynomial have? The Fundamental Theorem of Algebra gives the exact answer, as long as you count complex zeros too.',
      view: { kind: 'title', kicker: 'UNIT 4 · LESSON 12', title: 'Fundamental Theorem', em: 'of Algebra', sub: 'Degree n means exactly n zeros.' },
    },
    {
      ch: 0, say: 'Here’s the theorem. [[1]]Every polynomial of degree n, bigger than zero, has at least one complex root. [[2]]Divide that root out, and the quotient has a root too. Keep going, and you get the big idea: [[3]]a polynomial of degree n has exactly n roots, counting multiplicity.',
      view: { kind: 'lines', lines: [
        { tex: R`\text{degree } n > 0 \;\Rightarrow\; \text{at least one complex root}`, at: 1, box: true },
        { tex: R`\text{divide it out, repeat}`, at: 2 },
        { tex: R`\text{degree } n \;\Rightarrow\; \textbf{exactly } {\color{${O}}n} \textbf{ roots}`, at: 3, big: true, glow: true },
      ] },
    },
    {
      ch: 1, say: 'Take x to the fourth, minus three x cubed, plus four x, plus one. [[1]]Degree four, so four complex roots. [[2]]Imaginary roots come in pairs, so the number of real roots is four, two, or zero. [[3]]And the imaginary roots are zero, two, or four. [[4]]The possible rational roots are just plus or minus one.',
      view: { kind: 'lines', lines: [
        { tex: R`f(x) = x^4 - 3x^3 + 4x + 1` },
        { tex: R`\#\text{ complex roots} = 4`, at: 1 },
        { tex: R`\#\text{ real roots: } 4,\ 2,\text{ or } 0`, at: 2 },
        { tex: R`\#\text{ imaginary roots: } 0,\ 2,\text{ or } 4`, at: 3 },
        { tex: R`\text{possible rational: } \pm 1`, at: 4, glow: true },
      ] },
    },
    {
      ch: 1, say: 'Why do real roots drop by two? [[1]]Because imaginary roots always come as a conjugate pair, a plus b i and a minus b i. [[2]]So a degree five polynomial has five, three, or one real roots. Never four!',
      view: { kind: 'lines', lines: [
        { tex: R`a + bi \text{ and } a - bi \text{ come together}`, at: 1, box: true },
        { tex: R`\text{degree } 5:\ 5,\ 3,\text{ or } 1 \text{ real roots}`, at: 2 },
      ] },
    },
    {
      ch: 2, say: 'Now find all the zeros of x to the fourth plus three x cubed minus eight x squared minus twenty-two x minus twenty-four. Degree four, so we’re looking for four zeros. [[1]]Testing candidates, f of three is zero. [[2]]Divide by x minus three: the quotient is x cubed plus six x squared plus ten x plus eight.',
      view: { kind: 'synth', layout: 'ex1a', reveal: [['coef', 0], ['k', 1], ['down', 2], ['m1', 2], ['a1', 2], ['m2', 2], ['a2', 2], ['m3', 2], ['a3', 2], ['m4', 2], ['a4', 2]], answer: [{ tex: R`f(3) = 0 \;\to\; x^3 + 6x^2 + 10x + 8`, at: 2 }] },
    },
    {
      ch: 2, say: '[[1]]Test the cubic: minus four works. [[2]]Divide again, and we’re down to a quadratic: x squared plus two x plus two.',
      view: { kind: 'synth', layout: 'ex1b', reveal: [['coef', 0], ['k', 1], ['down', 2], ['m1', 2], ['a1', 2], ['m2', 2], ['a2', 2], ['m3', 2], ['a3', 2]], answer: [{ tex: R`x^2 + 2x + 2`, at: 2 }] },
    },
    {
      ch: 2, say: 'Use the quadratic formula. [[1]]Minus two, plus or minus the square root of four minus eight, over two. [[2]]That’s minus one plus or minus i. [[3]]So the four zeros are three, minus four, minus one plus i, and minus one minus i. Four zeros, just like the theorem promised.',
      view: { kind: 'lines', lines: [
        { tex: R`x = \dfrac{-2 \pm \sqrt{4 - 8}}{2}`, at: 1 },
        { tex: R`= -1 \pm i`, at: 2 },
        { tex: R`x = 3,\ -4,\ -1 + i,\ -1 - i`, at: 3, big: true, glow: true },
      ] },
    },
    {
      ch: 3, say: 'On the graph, [[1]]you see only the two real zeros, minus four and three. The other two are the imaginary pair, hiding off the x-axis.',
      view: { kind: 'graph', layout: 'ex1g', title: R`f(x) = x^4 + 3x^3 - 8x^2 - 22x - 24`, reveal: [['curve', 0], ['zeros', 1]], side: [{ tex: R`\text{real: } -4,\ 3`, at: 1, strong: true }, { tex: R`\text{imaginary: } -1 \pm i`, at: 1 }] },
    },
    {
      ch: 4, say: 'Your turn! For two x to the fifth plus ten x to the fourth minus two x squared minus x plus three, find the number of complex roots, the possible number of real roots, and the possible rational roots.',
      countdown: 10,
      view: { kind: 'try', tex: R`f(x) = 2x^5 + 10x^4 - 2x^2 - x + 3`, hint: ['# complex', '# real', 'p / q'] },
    },
    {
      ch: 4, say: '[[1]]Degree five, so five complex roots. [[2]]Real roots: five, three, or one. [[3]]And p over q: plus or minus one, three, one half, and three halves. Nice work!',
      view: { kind: 'lines', lines: [
        { tex: R`\#\text{ complex roots} = 5`, at: 1 },
        { tex: R`\#\text{ real roots: } 5,\ 3,\text{ or } 1`, at: 2 },
        { tex: R`\pm1,\ \pm3,\ \pm\tfrac12,\ \pm\tfrac32`, at: 3, glow: true },
      ] },
    },
    {
      ch: 5, say: 'Recap. [[1]]Degree n means exactly n complex roots, counting multiplicity. [[2]]Imaginary roots come in pairs, so real roots go n, n minus two, and so on. [[3]]To find them all: rational root theorem, divide, then the quadratic formula.',
      view: { kind: 'recap', items: [
        { text: 'Degree n → exactly n complex roots.', at: 1 },
        { text: 'Real roots: n, n − 2, n − 4, … (imaginary come in pairs).', at: 2 },
        { text: 'Find them: test p/q, divide, quadratic formula.', at: 3 },
      ] },
    },
    {
      ch: 5, say: 'Next up: polynomial inequalities, where the zeros split the number line. See you there!',
      view: { kind: 'title', kicker: 'UP NEXT · LESSON 13', title: 'Polynomial', em: 'inequalities', sub: 'Zeros split the number line' },
    },
  ],
}
