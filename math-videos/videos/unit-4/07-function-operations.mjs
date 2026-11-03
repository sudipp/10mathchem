// Lesson 7 video script. Based on HW #6 #3, #6, #8, #11, #12, #13.
const R = String.raw
const O = '#CC5833'

export default {
  id: '07-function-operations',
  tag: 'UNIT 4 · LESSON 7 · FUNCTION OPERATIONS',
  chapters: ['Operations', 'Plugging in', 'Composition', 'Your turn', 'Recap'],
  scenes: [
    {
      ch: 0, say: 'Functions can be added, subtracted, multiplied, and divided. You can even put one function inside another. Let’s see how.',
      view: { kind: 'title', kicker: 'UNIT 4 · LESSON 7', title: 'Function', em: 'operations', sub: 'Combine functions, then put one inside another.' },
    },
    {
      ch: 0, say: '[[1]]f plus g of x just means f of x plus g of x. [[2]]f times g means multiply them. [[3]]Same idea for minus, and for divide.',
      view: { kind: 'lines', lines: [{ tex: R`(f + g)(x) = f(x) + g(x)`, at: 1, box: true }, { tex: R`(f \cdot g)(x) = f(x) \cdot g(x)`, at: 2, box: true }, { tex: R`(f - g)(x) \qquad \left(\tfrac{f}{g}\right)(x)`, at: 3 }] },
    },
    {
      ch: 0, say: 'Watch out when subtracting. h of n is minus two n plus two, and g of n is n squared plus one. [[1]]Put the whole second function in parentheses. [[2]]The minus sign changes every sign inside. [[3]]Then combine like terms.',
      view: { kind: 'lines', lines: [
        { tex: R`h(n) - g(n)` },
        { tex: R`= (-2n + 2) - {\color{${O}}(n^2 + 1)}`, at: 1 },
        { tex: R`= -2n + 2 \mathbin{\color{${O}}-} {\color{${O}}n^2} \mathbin{\color{${O}}-} {\color{${O}}1}`, at: 2 },
        { tex: R`= -n^2 - 2n + 1`, at: 3, glow: true },
      ] },
    },
    {
      ch: 1, say: 'To evaluate at a number, find each value first. With g of a equals minus four a plus three, and h of a equals a squared plus four: [[1]]g of minus three is fifteen. [[2]]h of minus three is thirteen. [[3]]So g times h of minus three is one hundred ninety-five.',
      view: { kind: 'lines', lines: [
        { tex: R`g(-3) = -4(-3) + 3 = 15`, at: 1 },
        { tex: R`h(-3) = (-3)^2 + 4 = 13`, at: 2 },
        { tex: R`g(-3) \cdot h(-3) = 15 \cdot 13 = 195`, at: 3, glow: true },
      ] },
    },
    {
      ch: 1, say: 'To plug in an expression, use parentheses. [[1]]f of minus four t means: replace every a with minus four t, in parentheses. [[2]]Minus four t, cubed, is minus sixty-four t cubed. Not minus four t cubed!',
      view: { kind: 'lines', lines: [
        { tex: R`f(a) = 3a^3 - a^2` },
        { tex: R`f({\color{${O}}-4t}) = 3({\color{${O}}-4t})^3 - ({\color{${O}}-4t})^2`, at: 1 },
        { tex: R`= 3(-64t^3) - 16t^2 = -192t^3 - 16t^2`, at: 2, glow: true },
      ] },
    },
    {
      ch: 2, say: 'Composition puts one function inside another. For g of h of x: [[1]]start with x. [[2]]h turns it into x cubed minus two. [[3]]Then g takes that whole thing as its input: three times x cubed minus two, minus three. [[4]]That simplifies to three x cubed minus nine.',
      view: { kind: 'machine', stages: [
        { texs: ['x'], ats: [0], at: 1, on: [[1, 2]] },
        { texs: [R`h(x) = x^3 - 2`], ats: [0], fn: true, at: 1, on: [[2, 3]] },
        { texs: ['?', R`x^3 - 2`], ats: [0, 2], at: 1, on: [[2, 3]] },
        { texs: [R`g(x) = 3x - 3`], ats: [0], fn: true, at: 1, on: [[3]] },
        { texs: ['?', R`3(x^3 - 2) - 3`, R`3x^3 - 9`], ats: [0, 3, 4], at: 1, on: [[3]] },
      ], lines: [{ tex: R`g(h(x)) = 3x^3 - 9`, at: 4 }] },
    },
    {
      ch: 2, say: 'Always work from the inside out. For f of f of one, with f of x equals x minus one: [[1]]first, f of one is zero. [[2]]Then f of zero is minus one.',
      view: { kind: 'lines', lines: [{ tex: R`f(f(1))`, big: true }, { tex: R`f(1) = 1 - 1 = 0`, at: 1 }, { tex: R`f(0) = 0 - 1 = -1`, at: 2, glow: true }] },
    },
    {
      ch: 3, say: 'Your turn! g of x is x cubed plus two x, and h of x is two x plus five. Find g of h of minus two.',
      countdown: 10,
      view: { kind: 'try', tex: R`g(x) = x^3 + 2x,\quad h(x) = 2x + 5:\quad g(h(-2))`, hint: ['Inside first', 'Then outside'] },
    },
    {
      ch: 3, say: '[[1]]Inside first: h of minus two is minus four plus five, which is one. [[2]]Then g of one is one plus two, which is three.',
      view: { kind: 'lines', lines: [{ tex: R`h(-2) = 2(-2) + 5 = 1`, at: 1 }, { tex: R`g(1) = 1^3 + 2(1) = 3`, at: 2, glow: true }] },
    },
    {
      ch: 4, say: 'Recap. [[1]]f plus g, f times g: just combine the outputs. [[2]]When subtracting, use parentheses. [[3]]When plugging in an expression, use parentheses too. [[4]]For composition, work from the inside out.',
      view: { kind: 'recap', items: [
        { tex: R`(f + g)(x) = f(x) + g(x)`, at: 1 },
        { text: 'Subtracting? Parentheses around the whole function.', at: 2 },
        { text: 'Plugging in an expression? Parentheses again.', at: 3 },
        { text: 'g(h(x)): inside first, then outside.', at: 4 },
      ] },
    },
    {
      ch: 4, say: 'Next up: solving equations by graphing, with your calculator. See you there!',
      view: { kind: 'title', kicker: 'UP NEXT · LESSON 8', title: 'Solving by', em: 'graphing', sub: 'Calculator zeros and completing the square' },
    },
  ],
}
