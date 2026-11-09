// Homework and class-note problems. Engine-solved types are computed from
// polynomial coefficients (descending powers); `exp` holds the answer-key
// values used by scripts/verify.mjs. Hand-solved problems use `steps`, written
// with $LaTeX$ and **bold** markup.

const R = String.raw

const ROOTS = {
  'x*(5*x-1)*(x+1)**2': ['0', '1/5', '-1'],
  'x*(2*x-1)*(x+1)*(x-1)': ['0', '1/2', '-1', '1'],
  '3*x**3 + 19*x**2 + 20*x': ['0', '-4/3', '-5'],
  '3*x**3 - 5*x**2 + 2*x': ['0', '2/3', '1'],
  '2*x**4 + 11*x**2 - 40': ['sqrt(10)/2', '-sqrt(10)/2', '2*I*sqrt(2)', '-2*I*sqrt(2)'],
  '5*x**4 - 6*x**2 - 27': ['3*I*sqrt(5)/5', '-3*I*sqrt(5)/5', 'sqrt(3)', '-sqrt(3)'],
  '2*x**4 + 2*x**3 + 5*x**2 + 5*x': ['0', '-1', 'I*sqrt(10)/2', '-I*sqrt(10)/2'],
  '2*x**4 + 5*x**3 + 6*x**2 + 15*x': ['0', '-5/2', 'I*sqrt(3)', '-I*sqrt(3)'],
  'x**4 + 64*x': ['0', '-4', '2+2*I*sqrt(3)', '2-2*I*sqrt(3)'],
  '27*x**4 - x': ['0', '1/3', '(-1+I*sqrt(3))/6', '(-1-I*sqrt(3))/6'],
  '2*y**5 - 18*y': ['0', 'sqrt(3)', '-sqrt(3)', 'I*sqrt(3)', '-I*sqrt(3)'],
  'g**4 - 10*g**2 + 25': ['sqrt(5)', '-sqrt(5)'],
  '3*x**3 - x**2 - 2*x': ['0', '-2/3', '1'],
  '3*x**3 + 8*x**2 + 5*x': ['0', '-5/3', '-1'],
  '5*x**4 - 12*x**2 - 32': ['2', '-2', '2*I*sqrt(10)/5', '-2*I*sqrt(10)/5'],
  '2*x**4 + 25*x**2 + 63': ['3*I', '-3*I', 'I*sqrt(14)/2', '-I*sqrt(14)/2'],
  '5*x**4 + 3*x**3 - 15*x**2 - 9*x': ['0', '-3/5', 'sqrt(3)', '-sqrt(3)'],
  '5*x**4 + 3*x**3 - 5*x**2 - 3*x': ['0', '-3/5', '1', '-1'],
  'x**4 + 125*x': ['0', '-5', '(5+5*I*sqrt(3))/2', '(5-5*I*sqrt(3))/2'],
  '8*x**4 - x': ['0', '1/2', '(-1+I*sqrt(3))/4', '(-1-I*sqrt(3))/4'],
  'n**2 - 10*n - 45': ['5+sqrt(70)', '5-sqrt(70)'],
  '8*x**2 - 16*x - 49': ['(4+sqrt(114))/4', '(4-sqrt(114))/4'],
}

// Function-operation helpers: fn('g', x) is g(x); px(coeffs) is an expression
// in the output variable; op/k combine results; ID is the variable itself.
const fn = (f, x) => ({ f, x })
const px = (p, tex) => ({ p, tex })
const op = (o, a, b) => ({ op: o, a, b })
const k = (n, a) => ({ k: n, a })
const ID = { p: [1, 0], id: true }
const fop = (v, fns, find, expr, key, extra = {}) => ({ type: 'funcop', v, fns, find, expr, key, ...extra })
const EX4 = { f: [2, -3, -18, -8], g: [1, -4] }
const EX3 = { f: [2, 0, 0], g: [1, -1] }
const DOMAIN = R`**Domain:** the result is a polynomial, and every input of $g$ and $f$ is allowed, so the domain is **all real numbers**, $(-\infty, \infty)$.`

// Zeros: rrt shorthand. Inequalities: factored ([a, b, m] = (ax + b)^m) or standard form.
const zeros = (std, roots, extra = {}) => ({ type: 'rrt', find: true, all: true, std, exp: { roots, ...(extra.possible ? { possible: extra.possible } : {}) }, ...extra })
const ineqF = (factors, rel, key, extra = {}) => ({ type: 'ineq', factors, rel, key, ...extra })
const ineqS = (lhs, rel, key, extra = {}) => ({ type: 'ineq', lhs, rel, key, ...extra })
// Inverse functions: f and g are sympy strings (cbrt/root5 = real roots) checked numerically.
const inv = (prompt, steps, answer, f, g, expect = true, extra = {}) => ({ type: 'steps', prompt, steps, answer, check: { inverse: { f, g, expect, v: extra.v ?? 'x' } }, ...extra })
const cbrt = Math.cbrt
const pairGraph = (f, fl, g, gl) => ({ curves: [{ f, label: fl }, { f: g, label: gl }], window: [-6, 6, -6, 6] })

export const HOMEWORK = [
  {
    id: 'hw1', title: 'HW #1', name: 'Polynomial Operations & Classification', due: '', lesson: 0,
    sections: [
      {
        title: 'Write the polynomial in standard form. Name each polynomial by degree and number of terms.',
        problems: [
          { type: 'classify', terms: [[-8, 4], [5, 3], [-6, 5], [-2, 2], [-1, 0]], exp: { poly: [-6, -8, 5, -2, 0, -1], name: 'quintic polynomial with five terms' } },
          { type: 'classify', v: 'p', terms: [[2, 0], [-8, 2]], exp: { poly: [-8, 0, 2], name: 'quadratic binomial' } },
          { type: 'classify', terms: [[-7, 0], [10, 4], [10, 1]], exp: { poly: [10, 0, 0, 10, -7], name: 'quartic trinomial' } },
          { type: 'classify', terms: [[-9, 0]], exp: { poly: [-9], name: 'constant monomial' } },
          { type: 'classify', v: 'n', terms: [[4, 0], [9, 1]], exp: { poly: [9, 4], name: 'linear binomial' } },
          { type: 'classify', v: 'n', terms: [[2, 3], [-6, 0], [-2, 1]], exp: { poly: [2, 0, -2, -6], name: 'cubic trinomial' } },
        ],
      },
      {
        title: 'Find each product. Write your answer in standard form.',
        problems: [
          { type: 'product', factors: [[1, 3], [4, -1], [3, 7]], exp: [12, 61, 68, -21] },
          // The answer key prints x^3 + 2x^2 - x - 1; the constant is (1)(-1)(2) = -2.
          { type: 'product', factors: [[1, 1], [1, -1], [1, 2]], exp: [1, 2, -1, -2], keyNote: R`**Heads up:** the answer key prints $x^3 + 2x^2 - x - 1$, but the constant term is $(1)(-1)(2) = -2$. Check with $x = 1$: $(2)(0)(3) = 0$, and $1 + 2 - 1 - 2 = 0$ ✓, while $1 + 2 - 1 - 1 = 1$ ✗.` },
          {
            type: 'steps', prompt: R`(x + y)(x - y)(x + y)(x - y)`,
            check: { expr: '(x+y)*(x-y)*(x+y)*(x-y)', factored: 'x**4 - 2*x**2*y**2 + y**4' },
            steps: [
              R`**Pair them up** (multiplication can go in any order): $\big[(x + y)(x - y)\big]\big[(x + y)(x - y)\big]$.`,
              R`Each pair is a **difference of squares**: $(x + y)(x - y) = x^2 - y^2$.`,
              R`So it is $(x^2 - y^2)^2 = (x^2 - y^2)(x^2 - y^2) = x^4 - x^2y^2 - x^2y^2 + y^4$.`,
              R`Combine like terms: $x^4 - 2x^2y^2 + y^4$.`,
            ],
            answer: R`x^4 - 2x^2y^2 + y^4`,
          },
        ],
      },
      {
        title: 'Perform the indicated operation.',
        problems: [
          fop('n', { h: [1, 5], g: [1, 0, 2, 0] }, R`(h + g)(n)`, op('+', fn('h', ID), fn('g', ID)), 'n**3 + 3*n + 5'),
          fop('a', { f: [1, -5, 0], g: [3, -5] }, R`(f - g)(a)`, op('-', fn('f', ID), fn('g', ID)), 'a**2 - 8*a + 5'),
          fop('x', { g: [4, 1], h: [1, -3, 0, 0] }, R`(g \cdot h)(x)`, op('*', fn('g', ID), fn('h', ID)), '4*x**4 - 11*x**3 - 3*x**2'),
          fop('n', { g: [1, 0, -1], h: [-4, 2] }, R`g(n) \div h(n)`, op('/', fn('g', ID), fn('h', ID)), '(n**2 - 1)/(-4*n + 2)'),
          fop('x', { g: [1, 0, -5], f: [1, 3] }, R`g(10) + f(10)`, op('+', fn('g', 10), fn('f', 10)), '108'),
          fop('t', { g: [3, -4], f: [4, -5] }, R`g(-2) - f(-2)`, op('-', fn('g', -2), fn('f', -2)), '3'),
          fop('x', { g: [1, 5, 0], h: [2, 0] }, R`g(-7) \cdot h(-7)`, op('*', fn('g', -7), fn('h', -7)), '-196'),
          fop('t', { g: [-2, -6, 0], h: [3, 1] }, R`\left(\tfrac{g}{h}\right)(6)`, op('/', fn('g', 6), fn('h', 6)), '-108/19'),
          fop('x', { h: [-2, -4], g: [1, 0, -1] }, R`(h + g)(x^2)`, op('+', fn('h', px([1, 0, 0])), fn('g', px([1, 0, 0]))), 'x**4 - 2*x**2 - 5'),
          fop('t', { g: [1, -1, 0], h: [3, 0] }, R`g(2 - t) + h(2 - t)`, op('+', fn('g', px([-1, 2])), fn('h', px([-1, 2]))), 't**2 - 6*t + 8'),
          fop('x', { g: [1, -3], h: [1, -1, 0] }, R`(g - h)(z - 1)`, op('-', fn('g', px([1, -1])), fn('h', px([1, -1]))), '-z**2 + 4*z - 6', { out: 'z' }),
          fop('n', { f: [2, -4], g: [4, 0] }, R`f(-3n) - g(-3n)`, op('-', fn('f', px([-3, 0])), fn('g', px([-3, 0]))), '6*n - 4'),
          fop('n', { h: [3, -1], g: [-2, -1, 0] }, R`(h \cdot g)(-3n)`, op('*', fn('h', px([-3, 0])), fn('g', px([-3, 0]))), '162*n**3 - 9*n**2 - 3*n'),
          fop('t', { g: [1, -5], h: [4, 5] }, R`g(t^2) \cdot h(t^2)`, op('*', fn('g', px([1, 0, 0])), fn('h', px([1, 0, 0]))), '4*t**4 - 15*t**2 - 25'),
          fop('a', { g: [1, -2, 0], f: [-4, 5] }, R`g(-3x) \div f(-3x)`, op('/', fn('g', px([-3, 0])), fn('f', px([-3, 0]))), '(9*x**2 + 6*x)/(12*x + 5)', { out: 'x' }),
          fop('n', { h: [4, -1], g: [3, -4] }, R`h\left(\tfrac{n}{4}\right) \div g\left(\tfrac{n}{4}\right)`, op('/', fn('h', px([[1, 4], 0], R`\tfrac{n}{4}`)), fn('g', px([[1, 4], 0], R`\tfrac{n}{4}`))), '(4*n - 4)/(-16 + 3*n)'),
        ],
      },
    ],
  },
  {
    id: 'hw2', title: 'HW #2', name: 'Function Operations (Composition)', due: '', lesson: 6,
    sections: [
      {
        title: 'Perform the indicated operation.',
        problems: [
          fop('a', { g: [2, 4], h: [1, -2, 0, 0] }, R`(g \circ h)(a)`, fn('g', fn('h', ID)), '2*a**3 - 4*a**2 + 4'),
          fop('a', { g: [-3, -4, 0] }, R`g(g(a))`, fn('g', fn('g', ID)), '-27*a**4 - 72*a**3 - 36*a**2 + 16*a'),
          fop('a', { g: [1, 5], f: [1, 5, 0] }, R`(g \circ f)(a)`, fn('g', fn('f', ID)), 'a**2 + 5*a + 5'),
          fop('x', { g: [3, 0], h: [1, -4] }, R`(g \circ h)(x)`, fn('g', fn('h', ID)), '3*x - 12'),
          fop('a', { g: [1, 1], h: [1, 1, 0] }, R`g(h(7))`, fn('g', fn('h', 7)), '57'),
          fop('n', { g: [4, -2], f: [-1, 0, -2] }, R`(g \circ f)(6)`, fn('g', fn('f', 6)), '-154'),
          fop('x', { g: [-4, -4] }, R`(g \circ g)(10)`, fn('g', fn('g', 10)), '172'),
          fop('x', { f: [1, -1], g: [4, 5] }, R`f(g(8))`, fn('f', fn('g', 8)), '36'),
          fop('n', { h: [4, -5] }, R`h(h(4n))`, fn('h', fn('h', px([4, 0]))), '64*n - 25'),
          fop('t', { g: [3, 2], f: [1, 3, 0] }, R`(g \circ f)\left(\tfrac{b}{4}\right)`, fn('g', fn('f', px([[1, 4], 0], R`\tfrac{b}{4}`))), '(32 + 3*b**2 + 36*b)/16', { out: 'b' }),
          fop('t', { g: [-1, 4], f: [1, 1, 0] }, R`g(f(t - 2))`, fn('g', fn('f', px([1, -2]))), '-t**2 + 3*t + 2'),
          fop('x', { g: [1, -3], h: [-1, 0, -4, 0] }, R`(g \circ h)(x - 4)`, fn('g', fn('h', px([1, -4]))), '-x**3 + 12*x**2 - 52*x + 77'),
          fop('t', { h: [1, -1], g: [-4, -2] }, R`2h(t) + 4g(t)`, op('+', k(2, fn('h', ID)), k(4, fn('g', ID))), '-14*t - 10'),
          fop('n', { f: [2, 4], g: [1, 0, 3, 0] }, R`4f(n) + g(n)`, op('+', k(4, fn('f', ID)), fn('g', ID)), 'n**3 + 11*n + 16'),
          fop('x', { f: [1, 0, 3, 0], g: [3, -2] }, R`4f(x) - 5g(x)`, op('-', k(4, fn('f', ID)), k(5, fn('g', ID))), '4*x**3 - 3*x + 10'),
          fop('a', { h: [4, 1], g: [4, 4] }, R`(4h + g)(a)`, op('+', k(4, fn('h', ID)), fn('g', ID)), '20*a + 8'),
          fop('x', { h: [1, 3, 0, 0], g: [3, -5] }, R`(2h - 2g)(-2)`, op('-', k(2, fn('h', -2)), k(2, fn('g', -2))), '30'),
          fop('n', { h: [1, 0, 5], g: [4, -3] }, R`(5h - g)(3)`, op('-', k(5, fn('h', 3)), fn('g', 3)), '61'),
          fop('n', { f: [-1, -1], g: [-2, 0, -1] }, R`4f(8) - g(8)`, op('-', k(4, fn('f', 8)), fn('g', 8)), '93'),
          fop('x', { f: [2, -3], g: [1, -2, 0] }, R`3f(4) + g(4)`, op('+', k(3, fn('f', 4)), fn('g', 4)), '23'),
          fop('a', { g: [2, 0, -3], h: [1, -1] }, R`{-g(-3a)} - 4h(-3a)`, op('-', k(-1, fn('g', px([-3, 0]))), k(4, fn('h', px([-3, 0])))), '-18*a**2 + 12*a + 7'),
          fop('n', { h: [1, 0, -3], g: [3, 3] }, R`3h(4n) - 5g(4n)`, op('-', k(3, fn('h', px([4, 0]))), k(5, fn('g', px([4, 0])))), '48*n**2 - 60*n - 24'),
          fop('n', { g: [2, 0, 0, -5], f: [4, 0] }, R`(g + 3f)(-2n)`, op('+', fn('g', px([-2, 0])), k(3, fn('f', px([-2, 0])))), '-16*n**3 - 24*n - 5'),
          fop('a', { h: [4, -5], g: [1, 4, 0] }, R`(h - 2g)(2a)`, op('-', fn('h', px([2, 0])), k(2, fn('g', px([2, 0])))), '-8*a**2 - 8*a - 5'),
        ],
      },
    ],
  },
  {
    id: 'hw3', title: 'HW #3', name: 'Polynomials & Linear Factors', due: 'Oct 27', lesson: 1,
    sections: [
      {
        title: 'Find the zeros of the function. Then graph it to check.',
        problems: [
          { type: 'zeros', factors: [[1, 0], [1, 3], [1, 1]], exp: [[0], [-3], [-1]] },
          { type: 'zeros', factors: [[1, 0], [1, 4], [1, -1]], exp: [[0], [-4], [1]] },
          { type: 'zeros', factors: [[1, 0], [2, 5], [1, -1]], exp: [[0], [-5, 2], [1]] },
          { type: 'zeros', factors: [[1, 0], [2, -1, 2]], exp: [[0], [1, 2, 2]] },
          { type: 'zeros', factors: [[1, 0], [2, 3, 2]], exp: [[0], [-3, 2, 2]] },
          { type: 'zeros', factors: [[1, 0], [2, 1], [2, -5]], exp: [[0], [-1, 2], [5, 2]] },
        ],
      },
      {
        title: 'Write each function in factored form.',
        problems: [
          {
            type: 'steps', prompt: R`f(x) = 3x^3 - 7x^2 - 6x`, check: { expr: '3*x**3 - 7*x**2 - 6*x', factored: 'x*(3*x+2)*(x-3)' },
            steps: [
              R`**Factor out the GCF** $x$: $\;x(3x^2 - 7x - 6)$.`,
              R`**Factor the trinomial** $3x^2 - 7x - 6$. Multiply $a \cdot c = 3(-6) = -18$. Find two numbers that multiply to $-18$ and add to $-7$: $\;-9$ and $2$.`,
              R`**Split the middle and group:** $3x^2 - 9x + 2x - 6 = 3x(x - 3) + 2(x - 3) = (3x + 2)(x - 3)$.`,
            ],
            answer: R`f(x) = x(3x + 2)(x - 3)`,
          },
          {
            type: 'steps', prompt: R`f(x) = 2x^3 - 3x^2 + x`, check: { expr: '2*x**3 - 3*x**2 + x', factored: 'x*(2*x-1)*(x-1)' },
            steps: [
              R`**Factor out the GCF** $x$: $\;x(2x^2 - 3x + 1)$.`,
              R`**Factor the trinomial.** $a \cdot c = 2$. Two numbers that multiply to $2$ and add to $-3$: $\;-2$ and $-1$.`,
              R`**Group:** $2x^2 - 2x - x + 1 = 2x(x - 1) - 1(x - 1) = (2x - 1)(x - 1)$.`,
            ],
            answer: R`f(x) = x(2x - 1)(x - 1)`,
          },
        ],
      },
      {
        title: 'Sketch the graph. Approximate each real zero and the relative minima and maxima to the nearest tenth.',
        problems: [
          { type: 'graph', num: [1, -2, -1, 2], exp: { zeros: [-1, 1, 2] } },
          { type: 'graph', num: [2, 3, 0, -1], exp: { zeros: [-1, 0.5] } },
          { type: 'graph', num: [1, 11, 35, 28], exp: { zeros: [-5.8, -4, -1.2], min: [[-2.3, -6.5]], max: [[-5, 3]] } },
          { type: 'graph', num: [1, 1, -1, 1], exp: { zeros: [-1.8], min: [[0.3, 0.8]], max: [[-1, 2]] } },
          { type: 'graph', num: [1, -1, 0, -3], exp: { zeros: [1.9], min: [[0.7, -3.1]], max: [[0, -3]] } },
          { type: 'graph', num: [-1, -1, 4, 0, -2], exp: { zeros: [-2.5, -0.7, 1, 1.2], min: [[0, -2]], max: [[-1.8, 6.3], [1.1, 0]] } },
        ],
      },
      {
        title: 'Write a polynomial function of least degree with integer coefficients that has the given zeros.',
        problems: [
          { type: 'fromZeros', zeros: [[0], [5], [-5]], exp: [1, 0, -25, 0] },
          { type: 'fromZeros', zeros: [[2], [-3, 2], [-2, 5]], exp: [10, -1, -32, -12] },
          { type: 'fromZeros', zeros: [[-3, 1, 2], [1], [3]], exp: [1, 2, -12, -18, 27] },
          { type: 'fromZeros', zeros: [[-2, 1, 2], [4]], exp: [1, 0, -12, -16] },
        ],
      },
    ],
  },
  {
    id: 'hw4', title: 'HW #4', name: 'Polynomial Long Division', due: 'Oct 28', lesson: 2,
    sections: [
      {
        title: 'Divide using long division. Write your answer in fraction form.',
        problems: [
          { type: 'long', num: [5, -8, -26, 16, -2], den: [1, -3], exp: { q: [5, 7, -5, 1], r: [1] } },
          { type: 'long', num: [5, -23, -9], den: [1, -5], exp: { q: [5, 2], r: [1] } },
          { type: 'long', num: [3, 5, -2, 19, -30, 0], den: [1, 3], exp: { q: [3, -4, 10, -11, 3], r: [-9] } },
          { type: 'long', num: [8, 8, -12, -16, 6], den: [1, 1], exp: { q: [8, 0, -12, -4], r: [10] } },
          { type: 'long', num: [25, -20, 1], den: [5, -2], exp: { q: [5, -2], r: [-3] } },
          { type: 'long', num: [12, -29, 0, 13], den: [3, -5], exp: { q: [4, -3, -5], r: [-12] } },
          { type: 'long', num: [6, 28, 14, 1], den: [1, 5, 4], exp: { q: [6, -2], r: [9] } },
          { type: 'long', num: [2, 15, 24, -7, -15], den: [1, 2, -3], exp: { q: [2, 11, 8], r: [10, 9] } },
          { type: 'long', num: [3, 8, -10, -12], den: [1, 4, 2], exp: { q: [3, -4], r: [-4] } },
          { type: 'long', num: [5, -4, -11, -14], den: [1, -1, -2], exp: { q: [5, 1], r: [-12] } },
        ],
      },
      {
        title: R`Determine if $d(x)$ is a factor of $f(x)$.`,
        problems: [
          { type: 'factor', num: [3, 22, 26, 12], den: [1, 6], method: 'long', exp: true },
          { type: 'factor', num: [12, 23, -23, 1], den: [4, 1], method: 'long', exp: false },
          { type: 'factor', num: [6, 4, 2, 22, -28], den: [2, 4], method: 'long', exp: true },
          { type: 'factor', num: [25, 5, 29, 11, 25, -14], den: [5, -2], method: 'long', exp: true },
        ],
      },
    ],
  },
  {
    id: 'hw5', title: 'HW #5', name: 'Polynomial Synthetic Division', due: 'Oct 29', lesson: 3,
    sections: [
      {
        title: 'Divide using synthetic division. Write your answer in fraction form.',
        problems: [
          { type: 'synth', num: [3, -6, 5, 8, -12, 6], k: 1, exp: { q: [3, -3, 2, 10, -2], r: 4 } },
          { type: 'synth', num: [1, -9, 16, 16, -25, 17], k: 6, exp: { q: [1, -3, -2, 4, -1], r: 11 } },
          { type: 'synth', num: [8, -20, 0], k: 1, exp: { q: [8, -12], r: -12 } },
          { type: 'synth', num: [1, 3, -20], k: 4, exp: { q: [1, 7], r: 8 } },
          { type: 'synth', num: [11, 22, 14], k: -1, exp: { q: [11, 11], r: 3 } },
          { type: 'synth', num: [11, -21, 1, -17], k: 2, exp: { q: [11, 1, 3], r: -11 } },
          { type: 'synth', num: [2, 14, 8, -27, -21, -27], k: -6, exp: { q: [2, 2, -4, -3, -3], r: -9 } },
          { type: 'synth', num: [4, -21, -21, 13, 26, 16], k: 6, exp: { q: [4, 3, -3, -5, -4], r: -8 } },
        ],
      },
      {
        title: R`Determine if $d(x)$ is a factor of $f(x)$.`,
        problems: [
          { type: 'factor', num: [2, -12, 5, 28], den: [1, -5], exp: false },
          { type: 'factor', num: [4, -29, 29, 6, 0], den: [1, -6], exp: true },
          { type: 'factor', num: [1, 2, -11, -6, -18], den: [1, -3], exp: true },
          { type: 'factor', num: [3, -2, 5, 8], den: [1, 1], exp: false },
        ],
      },
      {
        title: R`Evaluate $f(x)$ at $k$.`,
        problems: [
          { type: 'eval', num: [5, -6, 5, 0, 0], k: 1, exp: 4 },
          { type: 'eval', num: [1, -1, 11, -11, 0], k: 2, exp: 30 },
          { type: 'eval', num: [6, 0, -3, -1, 2], k: 1, exp: 4 },
          { type: 'eval', num: [6, 26, 16, -24], k: -1, exp: -20 },
          { type: 'eval', num: [3, 0, -5, 1], k: 1, exp: -1 },
          { type: 'eval', num: [1, -13, 28, -21, 5], k: 2, exp: -13 },
        ],
      },
    ],
  },
  {
    id: 'hw6', title: 'HW #6', name: 'Review #1', due: 'Oct 30', lesson: 0,
    sections: [
      {
        title: 'Write the polynomial in standard form. Name it by degree and number of terms.',
        problems: [
          {
            type: 'steps', prompt: R`-3p^7`,
            steps: [R`It is already in standard form: one term, $-3p^7$.`, R`**Degree** = the highest exponent = $7$ → seventh degree. **One term** → monomial.`],
            answer: R`-3p^7:\ \text{seventh degree monomial}`,
          },
          {
            type: 'steps', prompt: R`-4r + 7r^6`,
            steps: [R`**Standard form** puts the highest degree first: $7r^6 - 4r$.`, R`**Degree** $6$ → sixth degree. **Two terms** → binomial.`],
            answer: R`7r^6 - 4r:\ \text{sixth degree binomial}`,
          },
        ],
      },
      {
        title: 'Perform the indicated operation.',
        problems: [
          {
            type: 'steps', prompt: R`h(n) = -2n + 2,\ g(n) = n^2 + 1.\ \text{Find } h(n) - g(n)`, check: { expr: '(-2*n+2) - (n**2+1)', result: '-n**2 - 2*n + 1' },
            steps: [R`Subtract the **whole** of $g$: $(-2n + 2) - (n^2 + 1)$.`, R`Distribute the minus sign: $-2n + 2 - n^2 - 1$.`, R`Combine like terms and write in standard form.`],
            answer: R`-n^2 - 2n + 1`,
          },
          {
            type: 'steps', prompt: R`h(t) = -3t,\ g(t) = 2t^3 - 5.\ \text{Find } (h \cdot g)(t)`, check: { expr: '(-3*t)*(2*t**3-5)', result: '-6*t**4 + 15*t' },
            steps: [R`$(h \cdot g)(t)$ means multiply: $-3t(2t^3 - 5)$.`, R`Distribute: $-3t \cdot 2t^3 = -6t^4$ and $-3t \cdot (-5) = 15t$.`],
            answer: R`-6t^4 + 15t`,
          },
          {
            type: 'steps', prompt: R`g(a) = a^2 - 5,\ h(a) = 3a - 3.\ \text{Find } g(a) \div h(a)`, check: { expr: '(a**2-5)/(3*a-3)', result: '(a**2-5)/(3*a-3)' },
            steps: [R`Write it as a fraction: $\dfrac{a^2 - 5}{3a - 3}$.`, R`Check for common factors: $3a - 3 = 3(a - 1)$, but $a^2 - 5$ has no factor of $(a - 1)$ or $3$, so it does not simplify.`],
            answer: R`\dfrac{a^2 - 5}{3a - 3}`,
          },
          {
            type: 'steps', prompt: R`g(a) = -4a + 3,\ h(a) = a^2 + 4.\ \text{Find } g(-3) \cdot h(-3)`, check: { value: '(-4*(-3)+3)*((-3)**2+4)', result: '195' },
            steps: [R`$g(-3) = -4(-3) + 3 = 12 + 3 = 15$.`, R`$h(-3) = (-3)^2 + 4 = 9 + 4 = 13$.`, R`Multiply: $15 \cdot 13 = 195$.`],
            answer: R`195`,
          },
          {
            type: 'steps', prompt: R`g(n) = 3n + 5,\ f(n) = n^2 + 5.\ \text{Find } \left(\tfrac{g}{f}\right)(1)`, check: { value: '(3*1+5)/(1**2+5)', result: '4/3' },
            steps: [R`$g(1) = 3(1) + 5 = 8$ and $f(1) = 1^2 + 5 = 6$.`, R`Divide and simplify: $\dfrac{8}{6} = \dfrac{4}{3}$.`],
            answer: R`\dfrac{4}{3}`,
          },
          {
            type: 'steps', prompt: R`g(a) = 4a + 3,\ f(a) = 3a^3 - a^2.\ \text{Find } g(-4t) - f(-4t)`, check: { expr: '(4*(-4*t)+3) - (3*(-4*t)**3 - (-4*t)**2)', result: '192*t**3 + 16*t**2 - 16*t + 3' },
            steps: [
              R`Replace $a$ with $-4t$ in $g$: $g(-4t) = 4(-4t) + 3 = -16t + 3$.`,
              R`Replace $a$ with $-4t$ in $f$: $(-4t)^3 = -64t^3$ and $(-4t)^2 = 16t^2$, so $f(-4t) = 3(-64t^3) - 16t^2 = -192t^3 - 16t^2$.`,
              R`Subtract: $(-16t + 3) - (-192t^3 - 16t^2) = 192t^3 + 16t^2 - 16t + 3$.`,
            ],
            answer: R`192t^3 + 16t^2 - 16t + 3`,
          },
          {
            type: 'steps', prompt: R`h(a) = 2a,\ g(a) = 2a + 2.\ \text{Find } h(a - 3) \cdot g(a - 3)`, check: { expr: '(2*(a-3))*(2*(a-3)+2)', result: '4*a**2 - 20*a + 24' },
            steps: [R`$h(a - 3) = 2(a - 3) = 2a - 6$.`, R`$g(a - 3) = 2(a - 3) + 2 = 2a - 4$.`, R`Multiply (FOIL): $(2a - 6)(2a - 4) = 4a^2 - 8a - 12a + 24 = 4a^2 - 20a + 24$.`],
            answer: R`4a^2 - 20a + 24`,
          },
          {
            type: 'steps', prompt: R`f(x) = 3x - 3,\ g(x) = x^2 + 3.\ \text{Find } \left(\tfrac{f}{g}\right)\!\left(\tfrac{x}{2}\right)`, check: { expr: '(3*(x/2)-3)/((x/2)**2+3)', result: '(6*x-12)/(x**2+12)' },
            steps: [
              R`$f\!\left(\tfrac{x}{2}\right) = 3 \cdot \tfrac{x}{2} - 3 = \tfrac{3x}{2} - 3$.`,
              R`$g\!\left(\tfrac{x}{2}\right) = \left(\tfrac{x}{2}\right)^2 + 3 = \tfrac{x^2}{4} + 3$.`,
              R`Divide, then multiply top and bottom by $4$ to clear the small fractions: $\dfrac{\tfrac{3x}{2} - 3}{\tfrac{x^2}{4} + 3} = \dfrac{6x - 12}{x^2 + 12}$.`,
            ],
            answer: R`\dfrac{6x - 12}{x^2 + 12}`,
          },
          {
            type: 'steps', prompt: R`g(x) = 3x - 3,\ h(x) = x^3 - 2.\ \text{Find } g(h(x))`, check: { expr: '3*(x**3-2)-3', result: '3*x**3 - 9' },
            steps: [R`Work **inside out**: put all of $h(x)$ in for $x$ in $g$.`, R`$g(h(x)) = 3(x^3 - 2) - 3 = 3x^3 - 6 - 3$.`],
            answer: R`3x^3 - 9`,
          },
          {
            type: 'steps', prompt: R`f(x) = x - 1.\ \text{Find } f(f(1))`, check: { value: '(1-1)-1', result: '-1' },
            steps: [R`Inside first: $f(1) = 1 - 1 = 0$.`, R`Then $f(0) = 0 - 1 = -1$.`],
            answer: R`-1`,
          },
          {
            type: 'steps', prompt: R`g(x) = x^3 + 2x,\ h(x) = 2x + 5.\ \text{Find } g(h(-2))`, check: { value: '(2*(-2)+5)**3 + 2*(2*(-2)+5)', result: '3' },
            steps: [R`Inside first: $h(-2) = 2(-2) + 5 = 1$.`, R`Then $g(1) = 1^3 + 2(1) = 3$.`],
            answer: R`3`,
          },
          {
            type: 'steps', prompt: R`f(x) = 4x - 4.\ \text{Find } (f \circ f)(3x)`, check: { expr: '4*(4*(3*x)-4)-4', result: '48*x - 20' },
            steps: [R`$(f \circ f)(3x)$ means $f(f(3x))$.`, R`Inside first: $f(3x) = 4(3x) - 4 = 12x - 4$.`, R`Then $f(12x - 4) = 4(12x - 4) - 4 = 48x - 16 - 4 = 48x - 20$.`],
            answer: R`48x - 20`,
          },
          {
            type: 'steps', prompt: R`g(a) = a - 2,\ h(a) = -2a^2 - 2a.\ \text{Find } g\!\left(h\!\left(\tfrac{a}{3}\right)\right)`, check: { expr: '(-2*(a/3)**2 - 2*(a/3)) - 2', result: '(-2*a**2 - 6*a - 18)/9' },
            steps: [
              R`Inside first: $h\!\left(\tfrac{a}{3}\right) = -2\left(\tfrac{a}{3}\right)^2 - 2\left(\tfrac{a}{3}\right) = -\tfrac{2a^2}{9} - \tfrac{2a}{3}$.`,
              R`Then subtract 2: $g(\ldots) = -\tfrac{2a^2}{9} - \tfrac{2a}{3} - 2$.`,
              R`Use a common denominator of $9$: $-\tfrac{2a^2}{9} - \tfrac{6a}{9} - \tfrac{18}{9}$.`,
            ],
            answer: R`\dfrac{-2a^2 - 6a - 18}{9}`,
          },
          {
            type: 'steps', prompt: R`g(n) = n^2 + 2,\ f(n) = 2n + 5.\ \text{Find } (5g - 4f)(n)`, check: { expr: '5*(n**2+2) - 4*(2*n+5)', result: '5*n**2 - 8*n - 10' },
            steps: [R`$(5g - 4f)(n) = 5g(n) - 4f(n) = 5(n^2 + 2) - 4(2n + 5)$.`, R`Distribute: $5n^2 + 10 - 8n - 20$.`, R`Combine like terms.`],
            answer: R`5n^2 - 8n - 10`,
          },
          {
            type: 'steps', prompt: R`g(n) = 2n + 5,\ h(n) = n^3 - 2.\ \text{Find } (4g + 3h)(-3)`, check: { value: '4*(2*(-3)+5) + 3*((-3)**3-2)', result: '-91' },
            steps: [R`$g(-3) = 2(-3) + 5 = -1$.`, R`$h(-3) = (-3)^3 - 2 = -27 - 2 = -29$.`, R`$4(-1) + 3(-29) = -4 - 87 = -91$.`],
            answer: R`-91`,
          },
          {
            type: 'steps', prompt: R`g(n) = n^2 - 4,\ h(n) = 3n.\ \text{Find } 2g\!\left(\tfrac{n}{3}\right) + 3h\!\left(\tfrac{n}{3}\right)`, check: { expr: '2*((n/3)**2-4) + 3*(3*(n/3))', result: '(2*n**2 + 27*n - 72)/9' },
            steps: [
              R`$g\!\left(\tfrac{n}{3}\right) = \tfrac{n^2}{9} - 4$, so $2g\!\left(\tfrac{n}{3}\right) = \tfrac{2n^2}{9} - 8$.`,
              R`$h\!\left(\tfrac{n}{3}\right) = 3 \cdot \tfrac{n}{3} = n$, so $3h\!\left(\tfrac{n}{3}\right) = 3n$.`,
              R`Add with a common denominator of $9$: $\tfrac{2n^2}{9} + \tfrac{27n}{9} - \tfrac{72}{9}$.`,
            ],
            answer: R`\dfrac{2n^2 + 27n - 72}{9}`,
          },
        ],
      },
      {
        title: 'Find the zeros of the function.',
        problems: [
          { type: 'zeros', factors: [[1, 0], [1, -4], [1, 2]], exp: [[0], [4], [-2]] },
          { type: 'zeros', factors: [[1, 0], [3, 5], [3, -4]], exp: [[0], [-5, 3], [4, 3]] },
        ],
      },
      {
        title: 'Write a polynomial function of least degree with integer coefficients that has the given zeros.',
        problems: [
          { type: 'fromZeros', zeros: [[1], [-2, 5], [5, 2]], exp: [10, -31, 11, 10] },
          { type: 'fromZeros', zeros: [[-3], [4, 3], [5, 3]], exp: [9, 0, -61, 60] },
        ],
      },
      {
        title: 'Divide using the most appropriate method. Write your answer in fraction form.',
        problems: [
          { type: 'synth', num: [1, -1, -7, 0, 9, 28], k: 2, note: R`The divisor $x - 2$ is linear with leading coefficient 1, so **synthetic division** is fastest.`, exp: { q: [1, 1, -5, -10, -11], r: 6 } },
          { type: 'synth', num: [1, 4, 0], k: -6, note: R`The divisor $x + 6$ is linear, so use **synthetic division** with $k = -6$.`, exp: { q: [1, -2], r: 12 } },
          { type: 'long', num: [12, -4, 1, 4], den: [6, -5], note: R`The divisor $6x - 5$ has leading coefficient 6, so use **long division**.`, exp: { q: [2, 1, 1], r: [9] } },
          { type: 'long', num: [2, 10, 25, 23, 28], den: [1, 2, 4], note: R`The divisor is quadratic, so **long division** is the only option.`, exp: { q: [2, 6, 5], r: [-11, 8] } },
        ],
      },
      {
        title: R`Determine if $d(x)$ is a factor of $f(x)$.`,
        problems: [
          { type: 'factor', num: [5, -8, -26, 21, -22, 12], den: [1, -3], exp: true },
          { type: 'factor', num: [9, 9, -10, -8], den: [3, 4], method: 'long', exp: true },
          { type: 'factor', num: [18, 15, 0, -13], den: [6, -3], method: 'long', exp: false },
          { type: 'factor', num: [4, -10, 0, 5, -2], den: [1, -2], exp: false },
        ],
      },
      {
        title: R`Evaluate $f(x)$ at $k$ using synthetic division and the Remainder Theorem.`,
        problems: [
          { type: 'eval', num: [6, 1, -18, -15, -2], k: 1, exp: -28 },
          { type: 'eval', num: [5, 0, -29, -18], k: 3, exp: 30 },
          { type: 'eval', num: [4, -10, 8, 0], k: -1, exp: -22 },
          { type: 'eval', num: [5, 4, 20, 0, 0], k: 1, exp: 29 },
        ],
      },
    ],
  },
  {
    id: 'hw7', title: 'HW #7', name: 'Solving Polynomial Equations', due: '', lesson: 5,
    sections: [
      {
        title: 'Factor each completely.',
        problems: [
          factorProblem(R`35m^3 + 7m^2 - 20m - 4`, '35*m**3 + 7*m**2 - 20*m - 4', '(7*m**2-4)*(5*m+1)', [
            R`**Group** the first two and last two terms: $(35m^3 + 7m^2) + (-20m - 4)$.`,
            R`Factor each group: $7m^2(5m + 1) - 4(5m + 1)$.`,
            R`Factor out the common binomial $(5m + 1)$.`,
          ], R`(7m^2 - 4)(5m + 1)`),
          factorProblem(R`48a^3 + 42a^2 - 56a - 49`, '48*a**3 + 42*a**2 - 56*a - 49', '(6*a**2-7)*(8*a+7)', [
            R`**Group:** $(48a^3 + 42a^2) + (-56a - 49)$.`,
            R`Factor each group: $6a^2(8a + 7) - 7(8a + 7)$.`,
            R`Factor out $(8a + 7)$.`,
          ], R`(6a^2 - 7)(8a + 7)`),
          factorProblem(R`96n^4 + 64n^3 - 120n^2 - 80n`, '96*n**4 + 64*n**3 - 120*n**2 - 80*n', '8*n*(4*n**2-5)*(3*n+2)', [
            R`**GCF first:** every term has $8n$: $8n(12n^3 + 8n^2 - 15n - 10)$.`,
            R`**Group** inside: $4n^2(3n + 2) - 5(3n + 2)$.`,
            R`Factor out $(3n + 2)$: $8n(4n^2 - 5)(3n + 2)$.`,
          ], R`8n(4n^2 - 5)(3n + 2)`),
          factorProblem(R`20n^3 + 100n^2 - 15n - 75`, '20*n**3 + 100*n**2 - 15*n - 75', '5*(4*n**2-3)*(n+5)', [
            R`**GCF first:** $5(4n^3 + 20n^2 - 3n - 15)$.`,
            R`**Group** inside: $4n^2(n + 5) - 3(n + 5)$.`,
            R`Factor out $(n + 5)$.`,
          ], R`5(4n^2 - 3)(n + 5)`),
          factorProblem(R`8x^3 - 1`, '8*x**3 - 1', '(2*x-1)*(4*x**2+2*x+1)', [
            R`**Difference of cubes:** $a^3 - b^3 = (a - b)(a^2 + ab + b^2)$.`,
            R`$8x^3 = (2x)^3$ and $1 = 1^3$, so $a = 2x$ and $b = 1$.`,
            R`Substitute: $(2x - 1)\big((2x)^2 + (2x)(1) + 1^2\big)$.`,
          ], R`(2x - 1)(4x^2 + 2x + 1)`),
          factorProblem(R`2u^3 + 432`, '2*u**3 + 432', '2*(u+6)*(u**2-6*u+36)', [
            R`**GCF first:** $2(u^3 + 216)$.`,
            R`**Sum of cubes:** $216 = 6^3$, so $a = u$, $b = 6$, and $a^3 + b^3 = (a + b)(a^2 - ab + b^2)$.`,
            R`Substitute: $2(u + 6)(u^2 - 6u + 36)$.`,
          ], R`2(u + 6)(u^2 - 6u + 36)`),
          factorProblem(R`192 - 81x^3`, '192 - 81*x**3', '3*(4-3*x)*(16+12*x+9*x**2)', [
            R`**GCF first:** $3(64 - 27x^3)$.`,
            R`**Difference of cubes:** $64 = 4^3$ and $27x^3 = (3x)^3$, so $a = 4$, $b = 3x$.`,
            R`Substitute: $3(4 - 3x)\big(4^2 + 4(3x) + (3x)^2\big)$.`,
          ], R`3(4 - 3x)(16 + 12x + 9x^2)`),
          factorProblem(R`-108x^3 + 32`, '-108*x**3 + 32', '4*(2-3*x)*(4+6*x+9*x**2)', [
            R`**GCF first:** $4(-27x^3 + 8)$. Reorder: $4(8 - 27x^3)$.`,
            R`**Difference of cubes:** $8 = 2^3$ and $27x^3 = (3x)^3$, so $a = 2$, $b = 3x$.`,
            R`Substitute: $4(2 - 3x)(4 + 6x + 9x^2)$. (Same as the key’s $4(-3x + 2)(9x^2 + 6x + 4)$.)`,
          ], R`4(-3x + 2)(9x^2 + 6x + 4)`),
          factorProblem(R`u^4 + 9u^2 + 14`, 'u**4 + 9*u**2 + 14', '(u**2+2)*(u**2+7)', [
            R`**Quadratic form:** let $w = u^2$. Then it is $w^2 + 9w + 14$.`,
            R`Two numbers that multiply to $14$ and add to $9$: $2$ and $7$, so $(w + 2)(w + 7)$.`,
            R`Put $u^2$ back in for $w$.`,
          ], R`(u^2 + 2)(u^2 + 7)`),
          factorProblem(R`2x^4 - 10x^2 + 8`, '2*x**4 - 10*x**2 + 8', '2*(x-2)*(x+2)*(x-1)*(x+1)', [
            R`**GCF first:** $2(x^4 - 5x^2 + 4)$.`,
            R`**Quadratic form** ($w = x^2$): $w^2 - 5w + 4 = (w - 4)(w - 1)$, so $2(x^2 - 4)(x^2 - 1)$.`,
            R`Both are **differences of squares**: $x^2 - 4 = (x - 2)(x + 2)$ and $x^2 - 1 = (x - 1)(x + 1)$.`,
          ], R`2(x - 2)(x + 2)(x - 1)(x + 1)`),
          factorProblem(R`14m^4 - 38m^2 - 12`, '14*m**4 - 38*m**2 - 12', '2*(7*m**2+2)*(m**2-3)', [
            R`**GCF first:** $2(7m^4 - 19m^2 - 6)$.`,
            R`**Quadratic form** ($w = m^2$): $7w^2 - 19w - 6$. $a \cdot c = -42$; numbers $-21$ and $2$.`,
            R`$7w^2 - 21w + 2w - 6 = 7w(w - 3) + 2(w - 3) = (7w + 2)(w - 3)$. Put $m^2$ back.`,
          ], R`2(7m^2 + 2)(m^2 - 3)`),
          factorProblem(R`7x^4 + 20x^2 - 3`, '7*x**4 + 20*x**2 - 3', '(7*x**2-1)*(x**2+3)', [
            R`**Quadratic form** ($w = x^2$): $7w^2 + 20w - 3$. $a \cdot c = -21$; numbers $21$ and $-1$.`,
            R`$7w^2 + 21w - w - 3 = 7w(w + 3) - 1(w + 3) = (7w - 1)(w + 3)$.`,
            R`Put $x^2$ back in for $w$.`,
          ], R`(7x^2 - 1)(x^2 + 3)`),
          factorProblem(R`8m^4 + 54m^2 + 81`, '8*m**4 + 54*m**2 + 81', '(2*m**2+9)*(4*m**2+9)', [
            R`**Quadratic form** ($w = m^2$): $8w^2 + 54w + 81$. $a \cdot c = 648$; numbers $18$ and $36$.`,
            R`$8w^2 + 18w + 36w + 81 = 2w(4w + 9) + 9(4w + 9) = (2w + 9)(4w + 9)$.`,
            R`Put $m^2$ back in for $w$.`,
          ], R`(2m^2 + 9)(4m^2 + 9)`),
          factorProblem(R`60x^4 + 81x^2 - 24`, '60*x**4 + 81*x**2 - 24', '3*(5*x**2+8)*(2*x-1)*(2*x+1)', [
            R`**GCF first:** $3(20x^4 + 27x^2 - 8)$.`,
            R`**Quadratic form** ($w = x^2$): $20w^2 + 27w - 8$. $a \cdot c = -160$; numbers $32$ and $-5$, giving $(5w + 8)(4w - 1)$.`,
            R`$4x^2 - 1$ is a **difference of squares**: $(2x - 1)(2x + 1)$.`,
          ], R`3(5x^2 + 8)(2x - 1)(2x + 1)`),
        ],
      },
      {
        title: R`Find all roots. Write complex solutions in standard form $(a + bi)$.`,
        problems: [
          rootsProblem(R`x(5x - 1)(x + 1)^2 = 0`, 'x*(5*x-1)*(x+1)**2', [
            R`It is already factored. Use the **Zero Product Property**: set each factor equal to $0$.`,
            R`$x = 0$, $\;5x - 1 = 0 \Rightarrow x = \tfrac{1}{5}$, $\;(x + 1)^2 = 0 \Rightarrow x = -1$ (multiplicity 2).`,
          ], R`\left\{0,\ \tfrac{1}{5},\ -1 \text{ mult. } 2\right\}`),
          rootsProblem(R`x(2x - 1)(x + 1)(x - 1) = 0`, 'x*(2*x-1)*(x+1)*(x-1)', [
            R`Set each factor equal to $0$.`,
            R`$x = 0$, $\;x = \tfrac{1}{2}$, $\;x = -1$, $\;x = 1$.`,
          ], R`\left\{0,\ \tfrac{1}{2},\ -1,\ 1\right\}`),
          rootsProblem(R`3x^3 + 19x^2 + 20x = 0`, '3*x**3 + 19*x**2 + 20*x', [
            R`**GCF:** $x(3x^2 + 19x + 20) = 0$.`,
            R`Factor: $a \cdot c = 60$; numbers $15$ and $4$: $3x^2 + 15x + 4x + 20 = (3x + 4)(x + 5)$.`,
            R`$x(3x + 4)(x + 5) = 0 \Rightarrow x = 0,\ -\tfrac{4}{3},\ -5$.`,
          ], R`\left\{0,\ -\tfrac{4}{3},\ -5\right\}`),
          rootsProblem(R`3x^3 - 5x^2 + 2x = 0`, '3*x**3 - 5*x**2 + 2*x', [
            R`**GCF:** $x(3x^2 - 5x + 2) = 0$.`,
            R`Factor: $a \cdot c = 6$; numbers $-3$ and $-2$: $(3x - 2)(x - 1)$.`,
            R`$x = 0,\ \tfrac{2}{3},\ 1$.`,
          ], R`\left\{0,\ \tfrac{2}{3},\ 1\right\}`),
          rootsProblem(R`2x^4 + 11x^2 - 40 = 0`, '2*x**4 + 11*x**2 - 40', [
            R`**Quadratic form** ($w = x^2$): $2w^2 + 11w - 40 = (2w - 5)(w + 8)$. So $(2x^2 - 5)(x^2 + 8) = 0$.`,
            R`$2x^2 = 5 \Rightarrow x^2 = \tfrac{5}{2} \Rightarrow x = \pm\sqrt{\tfrac{5}{2}} = \pm\tfrac{\sqrt{10}}{2}$ (rationalize: multiply by $\tfrac{\sqrt2}{\sqrt2}$).`,
            R`$x^2 = -8 \Rightarrow x = \pm\sqrt{-8} = \pm i\sqrt{8} = \pm 2i\sqrt{2}$.`,
          ], R`\left\{\tfrac{\sqrt{10}}{2},\ -\tfrac{\sqrt{10}}{2},\ 2i\sqrt{2},\ -2i\sqrt{2}\right\}`),
          rootsProblem(R`5x^4 - 6x^2 - 27 = 0`, '5*x**4 - 6*x**2 - 27', [
            R`**Quadratic form:** $5w^2 - 6w - 27 = (5w + 9)(w - 3)$, so $(5x^2 + 9)(x^2 - 3) = 0$.`,
            R`$x^2 = -\tfrac{9}{5} \Rightarrow x = \pm\tfrac{3i}{\sqrt5} = \pm\tfrac{3i\sqrt5}{5}$.`,
            R`$x^2 = 3 \Rightarrow x = \pm\sqrt{3}$.`,
          ], R`\left\{\tfrac{3i\sqrt5}{5},\ -\tfrac{3i\sqrt5}{5},\ \sqrt3,\ -\sqrt3\right\}`),
          rootsProblem(R`2x^4 + 2x^3 + 5x^2 + 5x = 0`, '2*x**4 + 2*x**3 + 5*x**2 + 5*x', [
            R`**GCF:** $x(2x^3 + 2x^2 + 5x + 5) = 0$.`,
            R`**Group:** $2x^2(x + 1) + 5(x + 1) = (2x^2 + 5)(x + 1)$.`,
            R`$x = 0$, $x = -1$, and $x^2 = -\tfrac{5}{2} \Rightarrow x = \pm i\sqrt{\tfrac52} = \pm\tfrac{i\sqrt{10}}{2}$.`,
          ], R`\left\{0,\ -1,\ \tfrac{i\sqrt{10}}{2},\ -\tfrac{i\sqrt{10}}{2}\right\}`),
          rootsProblem(R`2x^4 + 5x^3 + 6x^2 + 15x = 0`, '2*x**4 + 5*x**3 + 6*x**2 + 15*x', [
            R`**GCF:** $x(2x^3 + 5x^2 + 6x + 15) = 0$.`,
            R`**Group:** $x^2(2x + 5) + 3(2x + 5) = (x^2 + 3)(2x + 5)$.`,
            R`$x = 0$, $x = -\tfrac{5}{2}$, and $x^2 = -3 \Rightarrow x = \pm i\sqrt{3}$.`,
          ], R`\left\{0,\ -\tfrac{5}{2},\ i\sqrt3,\ -i\sqrt3\right\}`),
          rootsProblem(R`x^4 + 64x = 0`, 'x**4 + 64*x', [
            R`**GCF:** $x(x^3 + 64) = 0$. **Sum of cubes:** $x^3 + 4^3 = (x + 4)(x^2 - 4x + 16)$.`,
            R`$x = 0$ and $x = -4$.`,
            R`**Quadratic formula** on $x^2 - 4x + 16 = 0$: $x = \dfrac{4 \pm \sqrt{16 - 64}}{2} = \dfrac{4 \pm \sqrt{-48}}{2} = \dfrac{4 \pm 4i\sqrt3}{2} = 2 \pm 2i\sqrt3$.`,
          ], R`\left\{0,\ -4,\ 2 + 2i\sqrt3,\ 2 - 2i\sqrt3\right\}`),
          rootsProblem(R`27x^4 - x = 0`, '27*x**4 - x', [
            R`**GCF:** $x(27x^3 - 1) = 0$. **Difference of cubes:** $(3x)^3 - 1^3 = (3x - 1)(9x^2 + 3x + 1)$.`,
            R`$x = 0$ and $x = \tfrac{1}{3}$.`,
            R`**Quadratic formula** on $9x^2 + 3x + 1 = 0$: $x = \dfrac{-3 \pm \sqrt{9 - 36}}{18} = \dfrac{-3 \pm 3i\sqrt3}{18} = \dfrac{-1 \pm i\sqrt3}{6}$.`,
          ], R`\left\{0,\ \tfrac{1}{3},\ \tfrac{-1 + i\sqrt3}{6},\ \tfrac{-1 - i\sqrt3}{6}\right\}`),
        ],
      },
    ],
  },
  {
    id: 'hw8', title: 'HW #8', name: 'Solving Polynomial Equations by Graphing', due: 'Nov 4', lesson: 7,
    sections: [
      {
        title: 'Sketch the graph of each function. Use your graphing calculator to approximate each real zero to the nearest tenth.',
        problems: [
          { type: 'graph', zerosOnly: true, num: [1, -1, 0, -2], exp: { zeros: [1.7] } },
          { type: 'graph', zerosOnly: true, num: [1, -1, -2, 0, -1], exp: { zeros: [-1.2, 2.1] } },
          { type: 'graph', zerosOnly: true, num: [1, 6, 3], exp: { zeros: [-5.4, -0.6] } },
          { type: 'graph', zerosOnly: true, num: [-1, -8, -16, -7], exp: { zeros: [-5.2, -2.2, -0.6] } },
          { type: 'graph', zerosOnly: true, num: [1, -3, 0, 6], exp: { zeros: [-1.2] } },
          { type: 'graph', zerosOnly: true, num: [-1, 0, 4, 0, -1, -2], exp: { zeros: [-2, 1, 1.8] } },
          { type: 'graph', zerosOnly: true, num: [1, -4, 4, 0, 3], exp: { zeros: [] } },
          { type: 'graph', zerosOnly: true, num: [1, 0, -4, 0, 2, -3], exp: { zeros: [2] } },
        ],
      },
      {
        title: 'Factor each completely.',
        problems: [
          factorProblem(R`27x^3 - 125`, '27*x**3 - 125', '(3*x-5)*(9*x**2+15*x+25)', [
            R`**Difference of cubes:** $27x^3 = (3x)^3$ and $125 = 5^3$, so $a = 3x$, $b = 5$.`,
            R`Use $a^3 - b^3 = (a - b)(a^2 + ab + b^2)$: $(3x - 5)\big((3x)^2 + (3x)(5) + 5^2\big)$.`,
          ], R`(3x - 5)(9x^2 + 15x + 25)`),
          factorProblem(R`24x^3 - 3`, '24*x**3 - 3', '3*(2*x-1)*(4*x**2+2*x+1)', [
            R`**GCF first:** $3(8x^3 - 1)$.`,
            R`**Difference of cubes:** $8x^3 = (2x)^3$ and $1 = 1^3$, so $a = 2x$, $b = 1$.`,
            R`$3(2x - 1)\big((2x)^2 + (2x)(1) + 1^2\big)$.`,
          ], R`3(2x - 1)(4x^2 + 2x + 1)`),
        ],
      },
      {
        title: R`Find all roots. Write complex solutions in standard form $(a + bi)$.`,
        problems: [
          rootsProblem(R`3x^3 - x^2 - 2x = 0`, '3*x**3 - x**2 - 2*x', [
            R`**GCF:** $x(3x^2 - x - 2) = 0$.`,
            R`Factor: $a \cdot c = -6$; numbers $-3$ and $2$: $3x^2 - 3x + 2x - 2 = (3x + 2)(x - 1)$.`,
            R`$x = 0$, $x = -\tfrac{2}{3}$, $x = 1$.`,
          ], R`\left\{0,\ -\tfrac{2}{3},\ 1\right\}`),
          rootsProblem(R`3x^3 + 8x^2 + 5x = 0`, '3*x**3 + 8*x**2 + 5*x', [
            R`**GCF:** $x(3x^2 + 8x + 5) = 0$.`,
            R`Factor: $a \cdot c = 15$; numbers $5$ and $3$: $3x^2 + 3x + 5x + 5 = (3x + 5)(x + 1)$.`,
            R`$x = 0$, $x = -\tfrac{5}{3}$, $x = -1$.`,
          ], R`\left\{0,\ -\tfrac{5}{3},\ -1\right\}`),
          rootsProblem(R`5x^4 - 12x^2 - 32 = 0`, '5*x**4 - 12*x**2 - 32', [
            R`**Quadratic form** ($w = x^2$): $5w^2 - 12w - 32 = (5w + 8)(w - 4)$, so $(5x^2 + 8)(x^2 - 4) = 0$.`,
            R`$x^2 = 4 \Rightarrow x = \pm 2$.`,
            R`$x^2 = -\tfrac{8}{5} \Rightarrow x = \pm i\sqrt{\tfrac{8}{5}} = \pm \tfrac{2i\sqrt{2}}{\sqrt{5}} = \pm\tfrac{2i\sqrt{10}}{5}$ (rationalize).`,
          ], R`\left\{\tfrac{2i\sqrt{10}}{5},\ -\tfrac{2i\sqrt{10}}{5},\ 2,\ -2\right\}`),
          rootsProblem(R`2x^4 + 25x^2 + 63 = 0`, '2*x**4 + 25*x**2 + 63', [
            R`**Quadratic form:** $2w^2 + 25w + 63 = (2w + 7)(w + 9)$, so $(2x^2 + 7)(x^2 + 9) = 0$.`,
            R`$x^2 = -9 \Rightarrow x = \pm 3i$.`,
            R`$x^2 = -\tfrac{7}{2} \Rightarrow x = \pm i\sqrt{\tfrac{7}{2}} = \pm\tfrac{i\sqrt{14}}{2}$ (rationalize).`,
          ], R`\left\{\tfrac{i\sqrt{14}}{2},\ -\tfrac{i\sqrt{14}}{2},\ 3i,\ -3i\right\}`),
          rootsProblem(R`5x^4 + 3x^3 - 15x^2 - 9x = 0`, '5*x**4 + 3*x**3 - 15*x**2 - 9*x', [
            R`**GCF:** $x(5x^3 + 3x^2 - 15x - 9) = 0$.`,
            R`**Group:** $x^2(5x + 3) - 3(5x + 3) = (x^2 - 3)(5x + 3)$.`,
            R`$x = 0$, $x = -\tfrac{3}{5}$, and $x^2 = 3 \Rightarrow x = \pm\sqrt{3}$.`,
          ], R`\left\{0,\ -\tfrac{3}{5},\ \sqrt3,\ -\sqrt3\right\}`),
          rootsProblem(R`5x^4 + 3x^3 - 5x^2 - 3x = 0`, '5*x**4 + 3*x**3 - 5*x**2 - 3*x', [
            R`**GCF:** $x(5x^3 + 3x^2 - 5x - 3) = 0$.`,
            R`**Group:** $x^2(5x + 3) - 1(5x + 3) = (x^2 - 1)(5x + 3)$.`,
            R`$x = 0$, $x = -\tfrac{3}{5}$, and $x^2 = 1 \Rightarrow x = \pm 1$.`,
          ], R`\left\{0,\ -\tfrac{3}{5},\ 1,\ -1\right\}`),
          rootsProblem(R`x^4 + 125x = 0`, 'x**4 + 125*x', [
            R`**GCF:** $x(x^3 + 125) = 0$. **Sum of cubes:** $x^3 + 5^3 = (x + 5)(x^2 - 5x + 25)$.`,
            R`$x = 0$ and $x = -5$.`,
            R`**Quadratic formula** on $x^2 - 5x + 25 = 0$: $x = \dfrac{5 \pm \sqrt{25 - 100}}{2} = \dfrac{5 \pm \sqrt{-75}}{2} = \dfrac{5 \pm 5i\sqrt3}{2}$.`,
          ], R`\left\{0,\ -5,\ \tfrac{5 + 5i\sqrt3}{2},\ \tfrac{5 - 5i\sqrt3}{2}\right\}`),
          rootsProblem(R`8x^4 - x = 0`, '8*x**4 - x', [
            R`**GCF:** $x(8x^3 - 1) = 0$. **Difference of cubes:** $(2x)^3 - 1^3 = (2x - 1)(4x^2 + 2x + 1)$.`,
            R`$x = 0$ and $x = \tfrac{1}{2}$.`,
            R`**Quadratic formula** on $4x^2 + 2x + 1 = 0$: $x = \dfrac{-2 \pm \sqrt{4 - 16}}{8} = \dfrac{-2 \pm 2i\sqrt3}{8} = \dfrac{-1 \pm i\sqrt3}{4}$.`,
          ], R`\left\{0,\ \tfrac{1}{2},\ \tfrac{-1 + i\sqrt3}{4},\ \tfrac{-1 - i\sqrt3}{4}\right\}`),
        ],
      },
      {
        title: 'Solve each equation by completing the square.',
        problems: [
          rootsProblem(R`n^2 - 10n - 40 = 5`, 'n**2 - 10*n - 45', [
            R`**Move the constants** to the right: $n^2 - 10n = 45$.`,
            R`**Half of $-10$ is $-5$; square it: $25$.** Add $25$ to both sides: $n^2 - 10n + 25 = 70$.`,
            R`The left side is a **perfect square**: $(n - 5)^2 = 70$.`,
            R`**Square root of both sides** (remember $\pm$): $n - 5 = \pm\sqrt{70}$, so $n = 5 \pm \sqrt{70}$.`,
          ], R`\left\{5 + \sqrt{70},\ 5 - \sqrt{70}\right\}`, 'n'),
          rootsProblem(R`8x^2 - 16x - 46 = 3`, '8*x**2 - 16*x - 49', [
            R`**Move the constants:** $8x^2 - 16x = 49$.`,
            R`**Divide everything by 8** so $x^2$ has coefficient 1: $x^2 - 2x = \tfrac{49}{8}$.`,
            R`**Half of $-2$ is $-1$; square it: $1$.** Add $1$: $x^2 - 2x + 1 = \tfrac{49}{8} + \tfrac{8}{8} = \tfrac{57}{8}$, so $(x - 1)^2 = \tfrac{57}{8}$.`,
            R`$x - 1 = \pm\sqrt{\tfrac{57}{8}} = \pm\tfrac{\sqrt{114}}{4}$ (multiply inside by $\tfrac{2}{2}$: $\tfrac{114}{16}$).`,
            R`$x = 1 \pm \tfrac{\sqrt{114}}{4} = \dfrac{4 \pm \sqrt{114}}{4}$.`,
          ], R`\left\{\tfrac{4 + \sqrt{114}}{4},\ \tfrac{4 - \sqrt{114}}{4}\right\}`),
        ],
      },
    ],
  },
  {
    id: 'hw9', title: 'HW #9', name: 'End Behavior', due: 'Nov 4', lesson: 8,
    sections: [
      {
        title: R`For each function: **(a)** degree, leading coefficient, and end behavior; **(b)** factored form; **(c)** x- and y-intercepts; **(d)** multiplicity behavior; **(e)** points between and beyond the x-intercepts; **(f)** the graph.`,
        problems: [
          {
            type: 'analyze', prompt: R`f(x) = -2x^4 + 2x^2`, c: -2, factors: [[1, 0, 2], [1, -1, 1], [1, 1, 1]], std: [-2, 0, 2, 0, 0],
            factorSteps: [R`**GCF:** both terms share $-2x^2$: $-2x^2(x^2 - 1)$.`, R`$x^2 - 1$ is a **difference of squares**: $(x - 1)(x + 1)$.`],
            exp: { ends: [-1, -1], yInt: 0, zeros: [[-1, 1, 1], [0, 1, 2], [1, 1, 1]] },
          },
          {
            type: 'analyze', prompt: R`f(x) = 3x^3 - 15x^2 + 18x`, c: 3, factors: [[1, 0, 1], [1, -2, 1], [1, -3, 1]], std: [3, -15, 18, 0],
            factorSteps: [R`**GCF:** $3x(x^2 - 5x + 6)$.`, R`Two numbers that multiply to $6$ and add to $-5$: $-2$ and $-3$.`],
            exp: { ends: [-1, 1], yInt: 0, zeros: [[0, 1, 1], [2, 1, 1], [3, 1, 1]] },
          },
          {
            type: 'analyze', prompt: R`f(x) = -5x^2 - x^3`, c: -1, factors: [[1, 0, 2], [1, 5, 1]], std: [-1, -5, 0, 0],
            factorSteps: [R`**Standard form first:** $f(x) = -x^3 - 5x^2$. The leading term is $-x^3$.`, R`**GCF:** $-x^2(x + 5)$.`],
            exp: { ends: [1, -1], yInt: 0, zeros: [[-5, 1, 1], [0, 1, 2]] },
          },
          {
            type: 'analyze', prompt: R`f(x) = -\tfrac{1}{4}(x - 2)^2(x + 2)^2`, c: [-1, 4], factors: [[1, -2, 2], [1, 2, 2]],
            factorSteps: [R`It is **already in factored form**.`],
            exp: { ends: [-1, -1], yInt: -4, zeros: [[-2, 1, 2], [2, 1, 2]] },
          },
          {
            type: 'analyze', prompt: R`f(x) = \tfrac{1}{12}(x + 4)(x - 3)(x + 1)^2`, c: [1, 12], factors: [[1, 4, 1], [1, -3, 1], [1, 1, 2]],
            factorSteps: [R`It is **already in factored form**.`],
            exp: { ends: [1, 1], yInt: -1, zeros: [[-4, 1, 1], [-1, 1, 2], [3, 1, 1]] },
          },
          {
            type: 'analyze', prompt: R`f(x) = \tfrac{1}{5}(x - 3)^2(x + 1)^2`, c: [1, 5], factors: [[1, -3, 2], [1, 1, 2]],
            factorSteps: [R`It is **already in factored form**.`],
            exp: { ends: [1, 1], yInt: [9, 5], zeros: [[-1, 1, 2], [3, 1, 2]] },
          },
          {
            type: 'analyze', prompt: R`f(x) = x^3 - 2x^2 - 9x + 18,\ \text{given } f(2) = 0`, c: 1, factors: [[1, -2, 1], [1, -3, 1], [1, 3, 1]], std: [1, -2, -9, 18], synth: 2,
            factorSteps: [
              R`$f(2) = 0$ means $(x - 2)$ **is a factor** (Remainder Theorem). Divide by it with **synthetic division** ($k = 2$): the bottom row is $1,\ 0,\ -9$ with remainder $0$.`,
              R`So $f(x) = (x - 2)(x^2 - 9)$, and $x^2 - 9$ is a **difference of squares**: $(x - 3)(x + 3)$.`,
            ],
            exp: { ends: [-1, 1], yInt: 18, zeros: [[-3, 1, 1], [2, 1, 1], [3, 1, 1]] },
          },
        ],
      },
    ],
  },
  {
    id: 'hw10', title: 'HW #10', name: 'Rational Root Theorem', due: 'Nov 6', lesson: 9,
    sections: [
      {
        title: 'State the possible rational zeros for each function.',
        problems: [
          { type: 'rrt', std: [4, 7, 2, -1], exp: { possible: [[1], [1, 2], [1, 4]] } },
          { type: 'rrt', std: [2, -27, 11, 27, -13], exp: { possible: [[1], [13], [1, 2], [13, 2]] } },
          { type: 'rrt', std: [4, -12, -47, -42, -11], exp: { possible: [[1], [11], [1, 2], [11, 2], [1, 4], [11, 4]] } },
          { type: 'rrt', std: [2, 7, 4, -7, -6], exp: { possible: [[1], [2], [3], [6], [1, 2], [3, 2]] } },
        ],
      },
      {
        title: 'State the possible rational zeros for each function. Then find all rational zeros. One zero has been given.',
        problems: [
          { type: 'rrt', find: true, std: [2, -1, -11, -11, -3], given: 3, exp: { possible: [[1], [3], [1, 2], [3, 2]], zeros: [[-1, 1, 2], [-1, 2, 1], [3, 1, 1]] } },
          { type: 'rrt', find: true, std: [15, 14, -12, -14, -3], given: [-3, 5], exp: { possible: [[1], [3], [1, 3], [1, 5], [3, 5], [1, 15]], zeros: [[-1, 3, 1], [1, 1, 1], [-1, 1, 1], [-3, 5, 1]] } },
        ],
      },
      {
        title: 'State the possible rational zeros for each function. Then find all rational zeros.',
        problems: [
          { type: 'rrt', find: true, std: [2, -3, -3, 9], exp: { possible: [[1], [3], [9], [1, 2], [3, 2], [9, 2]], zeros: [[-3, 2, 1]] } },
          { type: 'rrt', find: true, std: [4, -4, -1, 1], exp: { possible: [[1], [1, 2], [1, 4]], zeros: [[1, 1, 1], [1, 2, 1], [-1, 2, 1]] } },
          { type: 'rrt', find: true, std: [4, 9, 6, 1], exp: { possible: [[1], [1, 2], [1, 4]], zeros: [[-1, 1, 2], [-1, 4, 1]] } },
          { type: 'rrt', find: true, std: [4, 16, -25, 8], exp: { possible: [[1], [2], [4], [8], [1, 2], [1, 4]], zeros: [[1, 2, 1]] } },
          { type: 'rrt', find: true, std: [3, -4, -5, 2], exp: { possible: [[1], [2], [1, 3], [2, 3]], zeros: [[1, 3, 1], [2, 1, 1], [-1, 1, 1]] } },
          { type: 'rrt', find: true, std: [5, 59, 43, -11], exp: { possible: [[1], [11], [1, 5], [11, 5]], zeros: [[1, 5, 1], [-11, 1, 1], [-1, 1, 1]] } },
          { type: 'rrt', find: true, std: [5, -1, -5, 1, 0], exp: { zero: true, possible: [[1], [1, 5]], zeros: [[0, 1, 1], [1, 5, 1], [-1, 1, 1], [1, 1, 1]] } },
          { type: 'rrt', find: true, std: [5, 19, -29, 5, 0], exp: { zero: true, possible: [[1], [5], [1, 5]], zeros: [[0, 1, 1], [1, 1, 1], [-5, 1, 1], [1, 5, 1]] } },
        ],
      },
      {
        title: 'Describe the end behavior of each function.',
        problems: [
          { type: 'ends', std: [-1, 2, 0, -1], exp: [1, -1] },
          { type: 'ends', std: [-1, -1, 1, 0, 4], exp: [-1, -1] },
        ],
      },
    ],
  },
  {
    id: 'hw11', title: 'HW #11', name: 'Irrational & Complex Root Theorems', due: 'Nov 9', lesson: 10, assigned: 'odd',
    sections: [
      {
        title: 'A polynomial equation with rational coefficients has the given roots. Find two additional roots.',
        problems: [
          { type: 'conj', roots: [[2, 3, -1], [0, 1, 7]], exp: [[2, -3, -1], [0, -1, 7]] },
          { type: 'conj', roots: [[3, -1, 2], [1, 1, 3]], exp: [[3, 1, 2], [1, -1, 3]] },
          { type: 'conj', roots: [[0, -4, -1], [6, -1, -1]], exp: [[0, 4, -1], [6, 1, -1]] },
          { type: 'conj', roots: [[5, -1, 6], [-2, 1, 10]], exp: [[5, 1, 6], [-2, -1, 10]] },
        ],
      },
      {
        title: 'Find a fourth-degree polynomial equation with integer coefficients that has the given numbers as roots.',
        problems: [
          { type: 'build', roots: [[0, 2, -1], [4, -1, -1]], exp: [1, -8, 21, -32, 68] },
          { type: 'build', roots: [[0, 1, 2], [2, -1, 3]], exp: [1, -4, -1, 8, -2] },
          { type: 'build', roots: [[0, 3, -1], [0, 1, 6]], exp: [1, 0, 3, 0, -54] },
          { type: 'build', roots: [[2, 1, -1], [1, -1, 5]], exp: [1, -6, 9, 6, -20] },
        ],
      },
      {
        title: 'Find the roots of each polynomial equation.',
        problems: [
          { type: 'rrt', eq: true, find: true, all: true, std: [1, -5, 2, 8], exp: { roots: ['4', '2', '-1'] } },
          { type: 'rrt', eq: true, find: true, all: true, std: [1, 1, -17, 15], exp: { roots: ['3', '1', '-5'] } },
          { type: 'rrt', eq: true, find: true, all: true, std: [2, 13, 17, -12], exp: { roots: ['-4', '-3', '1/2'] } },
          { type: 'rrt', eq: true, find: true, all: true, std: [1, -1, -34, -56], exp: { roots: ['7', '-2', '-4'] } },
          { type: 'rrt', eq: true, find: true, all: true, std: [1, 0, -18, 27], exp: { roots: ['3', '(-3+3*sqrt(5))/2', '(-3-3*sqrt(5))/2'] } },
          { type: 'rrt', eq: true, find: true, all: true, std: [1, 0, -5, 0, 4], exp: { roots: ['-2', '-1', '1', '2'] } },
          { type: 'rrt', eq: true, find: true, all: true, std: [1, -6, 13, -10], exp: { roots: ['2', '2+I', '2-I'] } },
          { type: 'rrt', eq: true, find: true, all: true, std: [1, -5, 4, 10], exp: { roots: ['-1', '3+I', '3-I'] } },
          { type: 'rrt', eq: true, find: true, all: true, std: [1, -5, 17, -13], exp: { roots: ['1', '2+3*I', '2-3*I'] } },
          { type: 'rrt', eq: true, find: true, all: true, std: [1, 0, 1, 10], exp: { roots: ['-2', '1+2*I', '1-2*I'] } },
          { type: 'rrt', eq: true, find: true, all: true, std: [1, -5, -1, 5], exp: { roots: ['1', '-1', '5'] } },
          { type: 'rrt', eq: true, find: true, all: true, std: [1, 0, -12, 16], exp: { roots: ['-4', '2'] } },
          { type: 'rrt', eq: true, find: true, all: true, std: [1, -2, -5, 6], exp: { roots: ['-2', '1', '3'] } },
          { type: 'rrt', eq: true, find: true, all: true, std: [1, -8, 0, -200], exp: { roots: ['10', '-1+I*sqrt(19)', '-1-I*sqrt(19)'] } },
          { type: 'rrt', eq: true, find: true, all: true, std: [1, 1, -5, 3], exp: { roots: ['1', '-3'] } },
          { type: 'rrt', eq: true, find: true, all: true, std: [4, -12, -1, 3], exp: { roots: ['3', '1/2', '-1/2'] } },
          { type: 'rrt', eq: true, find: true, all: true, std: [1, 1, -7, 2], exp: { roots: ['2', '(-3+sqrt(13))/2', '(-3-sqrt(13))/2'] } },
          { type: 'rrt', eq: true, find: true, all: true, std: [12, 31, -17, -6], exp: { roots: ['-3', '2/3', '-1/4'] } },
        ],
      },
      {
        title: 'Use the Rational Root Theorem to list all possible rational roots for each polynomial equation. Then find any actual rational roots.',
        problems: [
          { type: 'rrt', eq: true, find: true, std: [1, 5, -2, -15], exp: { possible: [[1], [3], [5], [15]], zeros: [] } },
          { type: 'rrt', eq: true, find: true, std: [36, 144, -1, -4], exp: { possible: [[1], [2], [4], [1, 2], [1, 3], [2, 3], [4, 3], [1, 4], [1, 6], [1, 9], [2, 9], [4, 9], [1, 12], [1, 18], [1, 36]], zeros: [[-4, 1, 1], [-1, 6, 1], [1, 6, 1]] } },
          { type: 'rrt', eq: true, find: true, std: [2, 5, 4, 1], exp: { possible: [[1], [1, 2]], zeros: [[-1, 1, 2], [-1, 2, 1]] } },
          { type: 'rrt', eq: true, find: true, std: [12, 14, -5, -14, -4], exp: { possible: [[1], [2], [4], [1, 2], [1, 3], [2, 3], [4, 3], [1, 4], [1, 6], [1, 12]], zeros: [] } },
          { type: 'rrt', eq: true, find: true, std: [5, -11, 7, -1], exp: { possible: [[1], [1, 5]], zeros: [[1, 5, 1], [1, 1, 2]] } },
          { type: 'rrt', eq: true, find: true, std: [1, 81, -49, -49], exp: { possible: [[1], [7], [49]], zeros: [] } },
        ],
      },
      {
        title: 'Find a third-degree polynomial equation with rational coefficients that has the given numbers as roots.',
        problems: [
          { type: 'build', roots: [[3], [2, -1, -1]], exp: [1, -7, 17, -15] },
          { type: 'build', roots: [[5], [0, 2, -1]], exp: [1, -5, 4, -20] },
          { type: 'build', roots: [[-1], [3, 1, -1]], exp: [1, -5, 4, 10] },
          { type: 'build', roots: [[-7], [0, 1, -1]], exp: [1, 7, 1, 7] },
          { type: 'build', roots: [[-4], [0, 4, -1]], exp: [1, 4, 16, 64] },
          { type: 'build', roots: [[6], [3, -2, -1]], exp: [1, -12, 49, -78] },
        ],
      },
    ],
  },
  {
    id: 'hw12', title: 'HW #12', name: 'Fundamental Theorem of Algebra', due: 'Nov 5', lesson: 11,
    sections: [
      {
        title: 'State the number of complex zeros, the possible number of real and imaginary zeros, and the possible rational zeros for each function.',
        problems: [
          { type: 'fta', std: [1, -3, 8, -24, 15, -45], exp: { possible: [[1], [3], [5], [9], [15], [45]] } },
          { type: 'fta', std: [1, 0, -4, 0, -4, 0, 16], exp: { possible: [[1], [2], [4], [8], [16]] } },
          { type: 'fta', std: [1, -8, 16], exp: { possible: [[1], [2], [4], [8], [16]] } },
          { type: 'fta', std: [1, -1, -5, -3], exp: { possible: [[1], [3]] } },
        ],
      },
      {
        title: 'Find all zeros. One zero has been given.',
        problems: [
          zeros([2, -5, -4, 3, 0], ['0', '1/2', '-1', '3'], { given: 3 }),
          zeros([3, -14, 27, -36, 0], ['0', '(5+I*sqrt(119))/6', '(5-I*sqrt(119))/6', '3'], { given: 3 }),
          zeros([10, 45, 41, -18, -18], ['-3', 'sqrt(10)/5', '-sqrt(10)/5', '-3/2'], { given: [-3, 2] }),
          zeros([10, 48, 45, -11, 0], ['0', '(-5+sqrt(3))/2', '(-5-sqrt(3))/2', '1/5'], { given: [1, 5] }),
        ],
      },
      {
        title: 'State the possible rational zeros for each function. Then find all zeros.',
        problems: [
          zeros([1, 0, -4, 0, -1, 0, 4], ['2', '-2', '1', '-1', 'I', '-I'], { list: true, possible: [[1], [2], [4]] }),
          zeros([1, -3, 4, -12, 3, -9], ['3', 'I', '-I', 'I*sqrt(3)', '-I*sqrt(3)'], { list: true, possible: [[1], [3], [9]] }),
          zeros([1, -14, 13], ['1', '13'], { list: true, possible: [[1], [13]] }),
          {
            type: 'steps', prompt: R`f(x) = x^6 - 126x^3 + 125`,
            check: { expr: 'x**6 - 126*x**3 + 125', roots: ['5', '(-5+5*I*sqrt(3))/2', '(-5-5*I*sqrt(3))/2', '1', '(-1+I*sqrt(3))/2', '(-1-I*sqrt(3))/2'], variable: 'x' },
            steps: [
              R`**Possible rational zeros:** $p$ divides $125$, $q$ divides $1$: $\pm1,\ \pm5,\ \pm25,\ \pm125$.`,
              R`Degree $6$, so there are $6$ zeros. Notice it is in **quadratic form** with $w = x^3$: $w^2 - 126w + 125 = (w - 1)(w - 125)$.`,
              R`So $(x^3 - 1)(x^3 - 125) = 0$: a **difference of cubes** twice. $x^3 - 1 = (x - 1)(x^2 + x + 1)$ and $x^3 - 125 = (x - 5)(x^2 + 5x + 25)$.`,
              R`Rational zeros: $x = 1$ and $x = 5$ (both on the candidate list ✓).`,
              R`**Quadratic formula** on $x^2 + x + 1 = 0$: $x = \dfrac{-1 \pm \sqrt{1 - 4}}{2} = \dfrac{-1 \pm i\sqrt3}{2}$.`,
              R`**Quadratic formula** on $x^2 + 5x + 25 = 0$: $x = \dfrac{-5 \pm \sqrt{25 - 100}}{2} = \dfrac{-5 \pm 5i\sqrt3}{2}$ (since $\sqrt{-75} = 5i\sqrt3$).`,
            ],
            answer: R`\begin{array}{l} \text{Possible: } \pm1,\ \pm5,\ \pm25,\ \pm125 \\ \text{Zeros: } 5,\ \dfrac{-5 \pm 5i\sqrt3}{2},\ 1,\ \dfrac{-1 \pm i\sqrt3}{2} \end{array}`,
          },
        ],
      },
      {
        title: 'Use the information provided to write the vertex form equation of each parabola.',
        problems: [
          { type: 'parabola', vertex: [8, 1], focus: [8, [7, 8]], exp: { a: [-2, 1], h: 8, k: 1, vertical: true } },
          { type: 'parabola', vertex: [0, 4], focus: [[-1, 8], 4], exp: { a: [-2, 1], h: 0, k: 4, vertical: false } },
          { type: 'parabola', focus: [8, 2], directrix: { y: -8 }, exp: { a: [1, 20], h: 8, k: -3, vertical: true } },
          { type: 'parabola', focus: [5, [7, 8]], directrix: { y: [9, 8] }, exp: { a: [-2, 1], h: 5, k: 1, vertical: true } },
        ],
      },
    ],
  },
  {
    id: 'hw13', title: 'HW #13', name: 'Fundamental Theorem of Algebra', due: 'Nov 6', lesson: 11,
    sections: [
      {
        title: 'State the number of complex zeros, the possible number of real and imaginary zeros, and the possible rational zeros for each function.',
        problems: [
          { type: 'fta', std: [3, 0, 2, 0, -8], exp: { possible: [[1], [2], [4], [8], [1, 3], [2, 3], [4, 3], [8, 3]] } },
          { type: 'fta', std: [5, -5, -1, 1], exp: { possible: [[1], [1, 5]] } },
          { type: 'fta', std: [1, 0, 0, -27], exp: { possible: [[1], [3], [9], [27]] } },
          { type: 'fta', std: [2, 4, -11, -22, -6, -12], exp: { possible: [[1], [2], [3], [4], [6], [12], [1, 2], [3, 2]] } },
        ],
      },
      {
        title: 'Find all zeros. One zero has been given.',
        problems: [
          zeros([3, -11, 20, 8, 0], ['0', '2+2*I', '2-2*I', '-1/3'], { given: [-1, 3] }),
          zeros([10, -11, -7, 11, -3], ['1/2', '1', '-1', '3/5'], { given: [3, 5] }),
          zeros([15, 13, -23, -5, 0], ['0', '1', '-1/5', '-5/3'], { given: [-5, 3] }),
          zeros([10, 33, 0, -66, -40], ['-4/5', 'sqrt(2)', '-sqrt(2)', '-5/2'], { given: [-5, 2] }),
          zeros([3, 2, -8, -5], ['(1+sqrt(5))/2', '(1-sqrt(5))/2', '-5/3'], { given: [-5, 3] }),
          zeros([4, -4, -15, 18], ['3/2', '-2'], { given: [3, 2] }),
          zeros([1, -2, 8, -16, 7, -14], ['I', '-I', 'I*sqrt(7)', '-I*sqrt(7)', '2'], { given: 2 }),
          zeros([1, -14, 68, -146, 91], ['7', '1', '3+2*I', '3-2*I'], { given: [3, 2, -1] }),
        ],
      },
      {
        title: 'Find all zeros.',
        problems: [
          zeros([3, 1, -3, -1], ['-1/3', '1', '-1']),
          zeros([2, 5, 4, 1], ['-1', '-1/2']),
          zeros([5, 0, 8, 0, -4], ['I*sqrt(2)', '-I*sqrt(2)', 'sqrt(10)/5', '-sqrt(10)/5']),
          zeros([4, -8, 5, -1], ['1/2', '1']),
          zeros([1, -12, 11, 0], ['0', '11', '1']),
          zeros([1, 3, -47, -185], ['-5', '1+sqrt(38)', '1-sqrt(38)']),
        ],
      },
    ],
  },
  {
    id: 'hw14', title: 'HW #14', name: 'Polynomial Inequalities', due: 'Nov 10', lesson: 12,
    sections: [
      {
        title: 'Solve each inequality. Show the testing of values between and beyond the zeros and the sign graph. Write your solution in interval notation.',
        problems: [
          ineqF([[-1, 2], [2, -3]], '<=', 'Union(Interval(-oo, 3/2), Interval(2, oo))'),
          ineqF([[1, -8], [1, 6]], '>=', 'Union(Interval(-oo, -6), Interval(8, oo))'),
          ineqS([-3, 17, -10], '>=', 'Interval(2/3, 5)'),
          ineqS([1, 11, 24], '>=', 'Union(Interval(-oo, -8), Interval(-3, oo))'),
          ineqS([15, -4, -12], '>', 'Union(Interval.open(-oo, -2), Interval.open(6, oo))', { rhs: [14, 0, 0] }),
          ineqS([1, 11, 13], '<', 'EmptySet', { rhs: [13, 12] }),
          ineqF([[-1, -4], [1, -2], [1, -1]], '>', 'Union(Interval.open(-oo, -4), Interval.open(1, 2))'),
          ineqF([[1, -1, 2], [-2, 1]], '>', 'Interval.open(-oo, 1/2)'),
          ineqS([-1, 16, -80, 128], '>=', 'Interval(-oo, 8)'),
          ineqS([1, -12, 29, 42], '>', 'Union(Interval.open(-1, 6), Interval.open(7, oo))'),
          ineqF([[3, -5], [1, 2], [-1, -1], [1, 6]], '>', 'Union(Interval.open(-6, -2), Interval.open(-1, 5/3))'),
          ineqF([[1, -2], [1, -8, 2], [1, 3]], '<=', 'Union(Interval(-3, 2), FiniteSet(8))'),
          ineqS([-6, 25, 37, -64, 20], '>', 'Union(Interval.open(-2, 1/2), Interval.open(2/3, 5))'),
          ineqS([-3, 32, -59, -46, 48], '<', 'Union(Interval.open(-oo, -1), Interval.open(2/3, 3), Interval.open(8, oo))'),
          ineqF([[1, 7], [2, -1, 4]], '<=', 'Union(Interval(-oo, -7), FiniteSet(1/2))'),
          ineqF([[1, 3], [-1, 3], [1, 7], [1, -8], [1, -4]], '<', 'Union(Interval.open(-7, -3), Interval.open(3, 4), Interval.open(8, oo))'),
        ],
      },
    ],
  },
  {
    id: 'hw15', title: 'HW #15', name: 'Inverse Relations & Functions', due: 'Nov 11', lesson: 13,
    sections: [
      {
        title: 'State if the given functions are inverses. (Use composition of functions.)',
        problems: [
          inv(R`g(x) = \tfrac34x + \tfrac{15}{4},\ \ f(x) = x + 4`, [
            R`Inverses must undo each other **both ways**: $f(g(x)) = x$ **and** $g(f(x)) = x$.`,
            R`$f(g(x)) = \left(\tfrac34x + \tfrac{15}{4}\right) + 4 = \tfrac34x + \tfrac{31}{4}$.`,
            R`That is not $x$, so they are **not** inverses.`,
          ], R`\text{No}`, '3*x/4 + 15/4', 'x + 4', false),
          inv(R`f(x) = -4 + \tfrac94x,\ \ g(x) = \tfrac49x + \tfrac{16}{9}`, [
            R`$f(g(x)) = -4 + \tfrac94\left(\tfrac49x + \tfrac{16}{9}\right) = -4 + x + 4 = x$ ✓.`,
            R`$g(f(x)) = \tfrac49\left(-4 + \tfrac94x\right) + \tfrac{16}{9} = -\tfrac{16}{9} + x + \tfrac{16}{9} = x$ ✓.`,
            R`Both give $x$, so they **are** inverses.`,
          ], R`\text{Yes}`, '-4 + 9*x/4', '4*x/9 + 16/9', true),
          inv(R`h(n) = -2n^3 - 1,\ \ f(n) = \sqrt[3]{\dfrac{-n - 1}{2}}`, [
            R`$h(f(n)) = -2\left(\sqrt[3]{\tfrac{-n - 1}{2}}\right)^3 - 1 = -2\cdot\tfrac{-n - 1}{2} - 1 = n + 1 - 1 = n$ ✓.`,
            R`$f(h(n)) = \sqrt[3]{\dfrac{-(-2n^3 - 1) - 1}{2}} = \sqrt[3]{\dfrac{2n^3}{2}} = \sqrt[3]{n^3} = n$ ✓.`,
            R`Both give $n$, so they **are** inverses.`,
          ], R`\text{Yes}`, '-2*x**3 - 1', 'cbrt((-x - 1)/2)', true),
          inv(R`h(x) = \sqrt[3]{\dfrac{x + 1}{2}},\ \ f(x) = 2 + 2x^3`, [
            R`$f(h(x)) = 2 + 2\left(\sqrt[3]{\tfrac{x + 1}{2}}\right)^3 = 2 + (x + 1) = x + 3$.`,
            R`That is not $x$, so they are **not** inverses. (The inverse of $f$ would be $\sqrt[3]{\tfrac{x - 2}{2}}$.)`,
          ], R`\text{No}`, 'cbrt((x + 1)/2)', '2 + 2*x**3', false),
          inv(R`g(x) = \dfrac{1}{x + 2} - 1,\ \ f(x) = \dfrac{1}{x - 2} + 2`, [
            R`One counterexample is enough to say **no**. Try $x = 0$: $f(0) = \tfrac{1}{-2} + 2 = \tfrac32$.`,
            R`$g\left(\tfrac32\right) = \dfrac{1}{\tfrac32 + 2} - 1 = \tfrac27 - 1 = -\tfrac57$, not $0$.`,
            R`$g(f(0)) \ne 0$, so they are **not** inverses.`,
          ], R`\text{No}`, '1/(x + 2) - 1', '1/(x - 2) + 2', false),
          inv(R`g(x) = -\dfrac{3}{-x + 3},\ \ f(x) = \dfrac{3}{x} + 3`, [
            R`$g(f(x)) = -\dfrac{3}{-\left(\tfrac3x + 3\right) + 3} = -\dfrac{3}{-\tfrac3x} = x$ ✓.`,
            R`$f(g(x)) = \dfrac{3}{-\tfrac{3}{-x + 3}} + 3 = -(-x + 3) + 3 = x$ ✓.`,
            R`Both give $x$, so they **are** inverses.`,
          ], R`\text{Yes}`, '-3/(-x + 3)', '3/x + 3', true),
        ],
      },
      {
        title: 'Find the inverse of each function.',
        problems: [
          inv(R`f(x) = \dfrac{-2 + 3x}{2}`, [R`**Switch** $x$ and $y$: $x = \dfrac{-2 + 3y}{2}$.`, R`Multiply by $2$: $2x = -2 + 3y$. Add $2$: $2x + 2 = 3y$.`, R`Divide by $3$: $y = \dfrac{2x + 2}{3}$.`], R`f^{-1}(x) = \dfrac{2x + 2}{3}`, '(-2 + 3*x)/2', '(2*x + 2)/3'),
          inv(R`f(x) = 5 + \tfrac95x`, [R`**Switch:** $x = 5 + \tfrac95y$.`, R`Subtract $5$: $x - 5 = \tfrac95y$. Multiply by $\tfrac59$: $y = \tfrac59(x - 5)$.`, R`Distribute: $y = \tfrac59x - \tfrac{25}{9}$.`], R`f^{-1}(x) = \tfrac59x - \tfrac{25}{9}`, '5 + 9*x/5', '5*x/9 - 25/9'),
          inv(R`f(x) = -(x - 1)^3`, [R`**Switch:** $x = -(y - 1)^3$.`, R`Multiply by $-1$: $-x = (y - 1)^3$. Take the cube root: $\sqrt[3]{-x} = y - 1$.`, R`$\sqrt[3]{-x} = -\sqrt[3]{x}$, so $y = -\sqrt[3]{x} + 1$.`], R`f^{-1}(x) = -\sqrt[3]{x} + 1`, '-(x - 1)**3', '-cbrt(x) + 1'),
          inv(R`f(x) = \sqrt[5]{x - 3} - 2`, [R`**Switch:** $x = \sqrt[5]{y - 3} - 2$.`, R`Add $2$: $x + 2 = \sqrt[5]{y - 3}$. Raise both sides to the 5th power: $(x + 2)^5 = y - 3$.`, R`Add $3$: $y = 3 + (x + 2)^5$.`], R`f^{-1}(x) = 3 + (x + 2)^5`, 'root5(x - 3) - 2', '3 + (x + 2)**5'),
          inv(R`g(n) = \dfrac{2}{n} - 3`, [R`**Switch:** $n = \dfrac{2}{y} - 3$.`, R`Add $3$: $n + 3 = \dfrac{2}{y}$.`, R`Flip both sides (or multiply by $y$ and divide by $n + 3$): $y = \dfrac{2}{n + 3}$.`], R`g^{-1}(n) = \dfrac{2}{n + 3}`, '2/x - 3', '2/(x + 3)'),
          inv(R`f(x) = -\dfrac{3}{x - 1}`, [R`**Switch:** $x = -\dfrac{3}{y - 1}$.`, R`Multiply by $(y - 1)$ and divide by $x$: $y - 1 = -\dfrac{3}{x}$.`, R`Add $1$: $y = -\dfrac{3}{x} + 1$.`], R`f^{-1}(x) = -\dfrac{3}{x} + 1`, '-3/(x - 1)', '-3/x + 1'),
        ],
      },
      {
        title: 'Find the inverse of each function. Then graph the function and its inverse.',
        problems: [
          inv(R`h(x) = 4 + \tfrac74x`, [R`**Switch:** $x = 4 + \tfrac74y$.`, R`Subtract $4$: $x - 4 = \tfrac74y$. Multiply by $\tfrac47$: $y = \tfrac47x - \tfrac{16}{7}$.`, R`**Graph:** the two lines are mirror images over $y = x$.`], R`h^{-1}(x) = \tfrac47x - \tfrac{16}{7}`, '4 + 7*x/4', '4*x/7 - 16/7', true, { graph: pairGraph(x => 4 + 7 / 4 * x, 'h(x)', x => 4 / 7 * x - 16 / 7, 'h⁻¹(x)') }),
          inv(R`f(x) = \tfrac23x + \tfrac43`, [R`**Switch:** $x = \tfrac23y + \tfrac43$.`, R`Multiply by $3$: $3x = 2y + 4$. So $2y = 3x - 4$ and $y = \tfrac32x - 2$.`, R`**Graph:** mirror images over $y = x$. (They cross on that line at $(4, 4)$.)`], R`f^{-1}(x) = -2 + \tfrac32x`, '2*x/3 + 4/3', '3*x/2 - 2', true, { graph: pairGraph(x => 2 / 3 * x + 4 / 3, 'f(x)', x => 1.5 * x - 2, 'f⁻¹(x)') }),
          inv(R`h(x) = \sqrt[3]{x} - 1`, [R`**Switch:** $x = \sqrt[3]{y} - 1$.`, R`Add $1$: $x + 1 = \sqrt[3]{y}$. Cube both sides: $y = (x + 1)^3$.`, R`**Graph:** the cube-root curve and the cubic are mirror images over $y = x$.`], R`h^{-1}(x) = (x + 1)^3`, 'cbrt(x) - 1', '(x + 1)**3', true, { graph: pairGraph(x => cbrt(x) - 1, 'h(x)', x => (x + 1) ** 3, 'h⁻¹(x)') }),
          inv(R`g(x) = -3 - 2x^3`, [R`**Switch:** $x = -3 - 2y^3$.`, R`Add $3$: $x + 3 = -2y^3$. Divide by $-2$: $y^3 = \dfrac{-x - 3}{2}$.`, R`Take the cube root: $y = \sqrt[3]{\dfrac{-x - 3}{2}}$. **Graph:** mirror images over $y = x$.`], R`g^{-1}(x) = \sqrt[3]{\dfrac{-x - 3}{2}}`, '-3 - 2*x**3', 'cbrt((-x - 3)/2)', true, { graph: pairGraph(x => -3 - 2 * x ** 3, 'g(x)', x => cbrt((-x - 3) / 2), 'g⁻¹(x)') }),
        ],
      },
    ],
  },
  {
    id: 'notes', title: 'Class notes', name: 'Examples from Days 1–15', due: '', lesson: 0,
    sections: [
      {
        title: 'Day 1 — Classifying polynomials & function operations',
        problems: [
          {
            type: 'steps', prompt: R`\text{Polynomial function: } f(x) = a_nx^n + a_{n-1}x^{n-1} + \dots + a_1x + a_0`,
            steps: [
              R`Exponents are all **whole** numbers ($0, 1, 2, \dots$) and coefficients are all **real** numbers.`,
              R`**Standard form:** terms are written in descending order of **degree** (exponent) from left to right.`,
            ],
            answer: R`\text{whole};\ \text{real};\ \text{degree}`,
          },
          {
            type: 'steps', prompt: R`\text{Ex 1: degree, leading coefficient, and constant}`,
            steps: [
              R`**A)** $f(x) = 4x + 2$: degree $1$, leading coefficient $4$, constant $2$.`,
              R`**B)** $f(x) = 6x^4 + 2x^3 - 4x^2 + 5x - 10$: degree $4$, leading coefficient $6$, constant $-10$.`,
              R`The **leading coefficient** is the number in front of the highest power, once it is in standard form. The **constant** is the term with no $x$.`,
            ],
            answer: R`\text{A: } 1,\ 4,\ 2;\quad \text{B: } 4,\ 6,\ -10`,
          },
          {
            type: 'steps', prompt: R`\text{Fill in the table: degree, type, number of terms, name}`,
            steps: [
              R`Degree $0$: **constant**, $f(x) = 5$, 1 term: **monomial**.`,
              R`Degree $1$: **linear**, $f(x) = -2x$, 1 term: **monomial**.`,
              R`Degree **2**: **quadratic**, $f(x) = \tfrac14x^2 + 3x + 1$, 3 terms: trinomial.`,
              R`Degree $3$: **cubic**, $f(x) = -2x^3 + 2x - 9$, 3 terms: **trinomial**.`,
              R`Degree **4**: **quartic**, $f(x) = 4x^4 - 6x^2$, 2 terms: binomial.`,
              R`Degree $5$: **quintic**, $f(x) = 5x^5 - 4x^4 + 3x^3 - 2x^2 + 1$, 5 terms: polynomial of 5 terms.`,
            ],
            answer: R`\text{constant, linear, quadratic, cubic, quartic, quintic}`,
          },
          {
            type: 'steps', prompt: R`\text{Ex 2: is it a polynomial function?}`,
            steps: [
              R`**A)** $f(x) = x^2 + 3x^4 + 1$: **yes**. Every exponent is a whole number (it just isn’t in standard form).`,
              R`**B)** $f(x) = \pi x^2 + .45x^5 - \sqrt5\,x$: **yes**. $\pi$, $.45$, and $\sqrt5$ are real-number coefficients, and the exponents are whole numbers.`,
              R`**C)** $f(x) = x^{-1} + x + 10$: **no**. The exponent $-1$ is not a whole number.`,
              R`**D)** $f(x) = 12x + x^4 + 5^x$: **no**. In $5^x$ the variable is in the exponent.`,
            ],
            answer: R`\text{A yes, B yes, C no, D no}`,
          },
          { type: 'classify', label: R`\text{Ex 3A}`, terms: [[9, 0], [1, 3]], exp: { poly: [1, 0, 0, 9], name: 'cubic binomial' } },
          { type: 'classify', label: R`\text{Ex 3B}`, terms: [[1, 3], [-2, 2], [-3, 4]], exp: { poly: [-3, 1, -2, 0, 0], name: 'quartic trinomial' } },
          { type: 'classify', label: R`\text{Ex 3C}`, terms: [[4, 1], [-6, 1], [5, 0]], exp: { poly: [-2, 5], name: 'linear binomial' } },
          { type: 'classify', label: R`\text{Ex 3D}`, terms: [[3, 3], [1, 2], [-4, 1], [2, 3]], exp: { poly: [5, 1, -4, 0], name: 'cubic trinomial' } },
          fop('x', EX4, R`(f + g)(x)`, op('+', fn('f', ID), fn('g', ID)), '2*x**3 - 3*x**2 - 17*x - 12', { label: R`\text{Ex 4A}` }),
          fop('x', EX4, R`(f - g)(x)`, op('-', fn('f', ID), fn('g', ID)), '2*x**3 - 3*x**2 - 19*x - 4', { label: R`\text{Ex 4B}` }),
          fop('x', EX4, R`(f \cdot g)(x)`, op('*', fn('f', ID), fn('g', ID)), '2*x**4 - 11*x**3 - 6*x**2 + 64*x + 32', { label: R`\text{Ex 4C}` }),
          fop('x', EX4, R`\left(\tfrac{f}{g}\right)(x)`, op('/', fn('f', ID), fn('g', ID)), '(2*x**3 - 3*x**2 - 18*x - 8)/(x - 4)', {
            label: R`\text{Ex 4D}`,
            notes: [R`$g(x) \ne 0$, so $x \ne 4$. (Later, on Day 4, you can divide: $f(x) \div (x - 4) = 2x^2 + 5x + 2$ with remainder $0$.)`],
          }),
          fop('x', { f: [3, -18, 24, 0] }, R`f\left(\tfrac{x}{2}\right)`, fn('f', px([[1, 2], 0], R`\tfrac{x}{2}`)), '3*x**3/8 - 9*x**2/2 + 12*x', { label: R`\text{Ex 5A}` }),
          fop('x', { f: [-2, 8, -8] }, R`f(a - 3)`, fn('f', px([1, -3])), '-2*a**2 + 20*a - 50', { label: R`\text{Ex 5B}`, out: 'a' }),
        ],
      },
      {
        title: 'Day 2 — Composition',
        problems: [
          {
            type: 'steps', prompt: R`\text{Composition: } (f \circ g)(x) = f(g(x))`,
            steps: [
              R`$g(x)$ becomes the **input** (domain) of $f(x)$: work from the **inside out**.`,
              R`Order matters: $(f \circ g)(x) \ne (g \circ f)(x)$ in general.`,
            ],
            answer: R`(f \circ g)(x) = f(g(x)) \ne (g \circ f)(x)`,
          },
          fop('x', EX3, R`(f \circ g)(x)`, fn('f', fn('g', ID)), '2*x**2 - 4*x + 2', { label: R`\text{Ex 3A}`, domain: true, notes: [DOMAIN] }),
          fop('x', EX3, R`(f \circ g)(2)`, fn('f', fn('g', 2)), '2', { label: R`\text{Ex 3a}` }),
          fop('x', EX3, R`(g \circ f)(x)`, fn('g', fn('f', ID)), '2*x**2 - 1', { label: R`\text{Ex 3B}`, domain: true, notes: [DOMAIN] }),
          fop('x', EX3, R`(g \circ f)(0)`, fn('g', fn('f', 0)), '-1', { label: R`\text{Ex 3b}` }),
          fop('x', EX3, R`(f \circ f)(x)`, fn('f', fn('f', ID)), '8*x**4', { label: R`\text{Ex 3C}`, domain: true, notes: [DOMAIN] }),
          fop('x', EX3, R`(f \circ f)(-1)`, fn('f', fn('f', -1)), '8', { label: R`\text{Ex 3c}` }),
        ],
      },
      {
        title: 'Day 3 — Polynomials and linear factors',
        problems: [
          {
            type: 'steps', prompt: R`\text{Review: write } x^3 + 2 - 3x - 2x^2 \text{ in standard form. What is the degree?}`,
            steps: [R`Order the terms from **highest** degree to lowest: $x^3$, then $-2x^2$, then $-3x$, then $2$.`, R`The highest exponent is $3$. (Blank: in standard form, the **highest** degree goes first.)`],
            answer: R`x^3 - 2x^2 - 3x + 2,\ \text{degree } 3`,
          },
          factorProblem(R`\text{Ex 1A: } f(x) = 3x^3 - 18x^2 + 24x`, '3*x**3 - 18*x**2 + 24*x', '3*x*(x-2)*(x-4)', [
            R`**GCF first:** $3x(x^2 - 6x + 8)$.`,
            R`Two numbers that multiply to $8$ and add to $-6$: $-2$ and $-4$.`,
          ], R`f(x) = 3x(x - 2)(x - 4)`),
          factorProblem(R`\text{Ex 1B: } f(x) = -2x^2 + 8x - 8`, '-2*x**2 + 8*x - 8', '-2*(x-2)**2', [
            R`**GCF first** (take out $-2$ so the leading term is positive): $-2(x^2 - 4x + 4)$.`,
            R`$x^2 - 4x + 4$ is a **perfect square**: $(x - 2)^2$.`,
          ], R`f(x) = -2(x - 2)^2`),
          {
            type: 'steps', prompt: R`\text{Fill in the blanks}`,
            steps: [
              R`The **zero** of a function is where the graph crosses the **$x$**-axis.`,
              R`AKA: zero = **root** (or solution) = $x$-intercept.`,
              R`A **repeated** zero is called a multiple zero. The **multiplicity** is the number of times that zero occurs.`,
            ],
            answer: R`\text{zero},\ x,\ \text{root},\ \text{repeated},\ \text{multiplicity}`,
          },
          { type: 'graph', title: R`\text{Ex 3A: } f(x) = (x - 1)(x + 1)(x + 3)^2`, num: [1, 6, 8, -6, -9], factorsNote: R`Zeros from the factors: $1$, $-1$, and $-3$ (multiplicity 2, so the graph **bounces** there).`, window: [-5, 3, -12, 12] },
          { type: 'graph', title: R`\text{Ex 3B: } y = x^2 + 4x - 5`, num: [1, 4, -5], factorsNote: R`Factor: $(x + 5)(x - 1)$, so the zeros are $-5$ and $1$.` },
          { type: 'fromZeros', label: R`\text{Ex 4A}`, zeros: [[2], [-3], [0]], exp: [1, 1, -6, 0] },
          { type: 'fromZeros', label: R`\text{Ex 4B}`, zeros: [[1, 1, 2], [-4]], exp: [1, 2, -7, 4] },
        ],
      },
      {
        title: 'Day 4 — Dividing polynomials: long division',
        problems: [
          {
            type: 'steps', prompt: R`\text{Review: } \tfrac{15}{2}`,
            steps: [R`$15 \div 2 = 7$ with remainder $1$.`, R`So $\tfrac{15}{2} = 7 + \tfrac{1}{2}$. Polynomials work the same way: $\dfrac{f(x)}{d(x)} = q(x) + \dfrac{r(x)}{d(x)}$.`],
            answer: R`7 + \tfrac{1}{2}`,
          },
          { type: 'long', label: R`\text{Ex 1}`, num: [2, 13, -7], den: [1, 6], exp: { q: [2, 1], r: [-13] } },
          { type: 'long', label: R`\text{Ex 2}`, num: [3, 11, 1], den: [1, -3], exp: { q: [3, 20], r: [61] } },
          {
            type: 'steps', prompt: R`\text{Remainder Theorem, using Ex 2}`,
            steps: [
              R`**Remainder Theorem:** if $f(x)$ is divided by $(x - k)$, the remainder is $f(k)$.`,
              R`In Ex 2: $f(x) = 3x^2 + 11x + 1$, $\;(x - k) = x - 3$, $\;k = 3$.`,
              R`Check: $f(3) = 3(9) + 11(3) + 1 = 27 + 33 + 1 = 61$, the same as the remainder.`,
            ],
            answer: R`\text{remainder} = f(k);\ f(3) = 61`,
          },
          { type: 'long', label: R`\text{Ex 3}`, num: [1, -12, 0, -42], den: [1, -2, 1], exp: { q: [1, -10], r: [-21, -32] } },
        ],
      },
      {
        title: 'Day 5 — Synthetic division (linear divisors only)',
        problems: [
          { type: 'synth', label: R`\text{Ex 1}`, num: [1, -3, -7, 6], k: 4, exp: { q: [1, 1, -3], r: -6 } },
          { type: 'synth', label: R`\text{Ex 2}`, num: [2, -3, 4, 5], k: -2, exp: { q: [2, -7, 18], r: -31 } },
          { type: 'synth', label: R`\text{Ex 3}`, num: [1, -2, 0, -4], k: 3, exp: { q: [1, 1, 3], r: 5 } },
          { type: 'synth', label: R`\text{Ex 4}`, num: [3, 14, -28, -24], k: -6, exp: { q: [3, -4, -4], r: 0 } },
          { type: 'eval', label: R`\text{Ex 5A}`, num: [3, 13, 2, -8], k: -4, exp: 0 },
          { type: 'eval', label: R`\text{Ex 5B}`, num: [4, 0, -6, -4], k: 3, exp: 86 },
        ],
      },
      {
        title: 'Day 7 — Factoring & solving polynomial equations',
        problems: [
          factorProblem(R`\text{Review A: } t^2 - 10t + 25`, 't**2 - 10*t + 25', '(t-5)**2', [R`**Perfect square trinomial:** $t^2 - 2(5)t + 5^2$.`], R`(t - 5)^2`),
          factorProblem(R`\text{Review B: } 4x^2 - 9`, '4*x**2 - 9', '(2*x-3)*(2*x+3)', [R`**Difference of squares:** $(2x)^2 - 3^2 = (2x - 3)(2x + 3)$.`], R`(2x - 3)(2x + 3)`),
          factorProblem(R`\text{Ex 1A: } x^3 + 27`, 'x**3 + 27', '(x+3)*(x**2-3*x+9)', [R`**Sum of cubes** with $a = x$, $b = 3$: $(a + b)(a^2 - ab + b^2)$.`], R`(x + 3)(x^2 - 3x + 9)`),
          factorProblem(R`\text{Ex 1B: } 125 + 64x^3`, '125 + 64*x**3', '(5+4*x)*(25-20*x+16*x**2)', [R`**Sum of cubes** with $a = 5$, $b = 4x$.`, R`$(5 + 4x)\big(5^2 - 5(4x) + (4x)^2\big)$.`], R`(5 + 4x)(25 - 20x + 16x^2)`),
          factorProblem(R`\text{Ex 2A: } 8x^3 - 27`, '8*x**3 - 27', '(2*x-3)*(4*x**2+6*x+9)', [R`**Difference of cubes** with $a = 2x$, $b = 3$: $(a - b)(a^2 + ab + b^2)$.`], R`(2x - 3)(4x^2 + 6x + 9)`),
          factorProblem(R`\text{Ex 2B: } 8a^6 - 125b^3`, '8*a**6 - 125*b**3', '(2*a**2-5*b)*(4*a**4+10*a**2*b+25*b**2)', [R`$8a^6 = (2a^2)^3$ and $125b^3 = (5b)^3$, so $a \to 2a^2$, $b \to 5b$.`, R`**Difference of cubes:** $(2a^2 - 5b)\big((2a^2)^2 + (2a^2)(5b) + (5b)^2\big)$.`], R`(2a^2 - 5b)(4a^4 + 10a^2b + 25b^2)`),
          factorProblem(R`\text{Ex 3A: } x^2 - 36`, 'x**2 - 36', '(x-6)*(x+6)', [R`**Difference of squares.**`], R`(x - 6)(x + 6)`),
          factorProblem(R`\text{Ex 3B: } 25x^4 - 36`, '25*x**4 - 36', '(5*x**2-6)*(5*x**2+6)', [R`**Quadratic form:** $(5x^2)^2 - 6^2$, a difference of squares.`], R`(5x^2 - 6)(5x^2 + 6)`),
          factorProblem(R`\text{Ex 3C: } g^4 - 10g^2 + 25`, 'g**4 - 10*g**2 + 25', '(g**2-5)**2', [R`**Quadratic form** ($w = g^2$): $w^2 - 10w + 25 = (w - 5)^2$.`], R`(g^2 - 5)^2`),
          factorProblem(R`\text{Ex 3D: } a^2b^2 - 8ab^3 + 16b^4`, 'a**2*b**2 - 8*a*b**3 + 16*b**4', 'b**2*(a-4*b)**2', [R`**GCF:** $b^2(a^2 - 8ab + 16b^2)$.`, R`Perfect square: $a^2 - 2(a)(4b) + (4b)^2 = (a - 4b)^2$.`], R`b^2(a - 4b)^2`),
          factorProblem(R`\text{Ex 4A: } ra + rb + sa + sb`, 'r*a + r*b + s*a + s*b', '(r+s)*(a+b)', [R`**Group:** $r(a + b) + s(a + b)$.`, R`Factor out $(a + b)$.`], R`(r + s)(a + b)`),
          factorProblem(R`\text{Ex 4B: } x^2y^2 - 3x^2 - 4y^2 + 12`, 'x**2*y**2 - 3*x**2 - 4*y**2 + 12', '(x-2)*(x+2)*(y**2-3)', [R`**Group:** $x^2(y^2 - 3) - 4(y^2 - 3) = (x^2 - 4)(y^2 - 3)$.`, R`$x^2 - 4$ is a difference of squares.`], R`(x - 2)(x + 2)(y^2 - 3)`),
          factorProblem(R`\text{Ex 4C: } bx^2 + 2a + 2b + ax^2`, 'b*x**2 + 2*a + 2*b + a*x**2', '(x**2+2)*(a+b)', [R`**Rearrange** so groups share a factor: $ax^2 + bx^2 + 2a + 2b$.`, R`$x^2(a + b) + 2(a + b)$.`], R`(x^2 + 2)(a + b)`),
          rootsProblem(R`\text{Ex 5A: } 2y^5 - 18y = 0`, '2*y**5 - 18*y', [
            R`**GCF:** $2y(y^4 - 9) = 0$.`,
            R`**Difference of squares:** $2y(y^2 - 3)(y^2 + 3) = 0$.`,
            R`$y = 0$, $\;y^2 = 3 \Rightarrow y = \pm\sqrt3$, $\;y^2 = -3 \Rightarrow y = \pm i\sqrt3$.`,
          ], R`\{0,\ \pm\sqrt3,\ \pm i\sqrt3\}`, 'y'),
          rootsProblem(R`\text{Ex 5B: } g^4 - 10g^2 = -25`, 'g**4 - 10*g**2 + 25', [
            R`Move everything to one side: $g^4 - 10g^2 + 25 = 0$.`,
            R`**Factor** (from Ex 3C): $(g^2 - 5)^2 = 0$.`,
            R`$g^2 = 5 \Rightarrow g = \pm\sqrt5$, each with multiplicity 2.`,
          ], R`\{\sqrt5,\ -\sqrt5\}\ \text{(each mult. 2)}`, 'g'),
          {
            type: 'steps', prompt: R`\text{Ex 6: a bin of } 162\text{ ft}^3 \text{ measures } x \text{ by } (5x - 6) \text{ by } (5x - 9)\text{ ft. Find the dimensions.}`,
            check: { value: '3*(5*3-6)*(5*3-9)', result: '162' },
            steps: [
              R`**Volume = length × width × height:** $x(5x - 6)(5x - 9) = 162$.`,
              R`Multiply out: $(5x - 6)(5x - 9) = 25x^2 - 75x + 54$, so $25x^3 - 75x^2 + 54x - 162 = 0$.`,
              R`**Group:** $25x^2(x - 3) + 54(x - 3) = (25x^2 + 54)(x - 3) = 0$.`,
              R`$x = 3$ (the other factor gives no real answer, and a length must be positive).`,
              R`Dimensions: $3$ ft, $5(3) - 6 = 9$ ft, $5(3) - 9 = 6$ ft. Check: $3 \cdot 9 \cdot 6 = 162$ ✓.`,
            ],
            answer: R`3\text{ ft} \times 9\text{ ft} \times 6\text{ ft}`,
          },
        ],
      },
      {
        title: 'Day 9 — End behavior & analyzing graphs',
        problems: [
          { type: 'ends', label: R`\text{Ex 1A}`, std: [1, 2, -3, -2], exp: [-1, 1] },
          { type: 'ends', label: R`\text{Ex 1B}`, std: [-24, 0, 0, 0, 0, 0, [-3, 16], 0, 0, 4, 0], exp: [-1, -1] },
          {
            type: 'steps', prompt: R`\text{Fill in the blanks: turning points and equivalent statements}`,
            steps: [
              R`A polynomial of degree $n$ has **at most $n - 1$** turning points. If it has **$n$** distinct real zeros, it has **exactly $n - 1$** turning points.`,
              R`For a real number $k$, these all say the same thing: **$k$** is a zero of $f$; **$k$** is a solution of $f(x) = 0$; **$(x - k)$** is a factor of $f(x)$; **$(k, 0)$** is an x-intercept of the graph.`,
            ],
            answer: R`n - 1;\ n;\ n - 1;\ k;\ k;\ (x - k);\ (k, 0)`,
          },
          factorProblem(R`\text{Ex 2: x-intercepts of } f(x) = x^3 - x^2 - x + 1`, 'x**3 - x**2 - x + 1', '(x-1)**2*(x+1)', [
            R`**Group:** $x^2(x - 1) - 1(x - 1) = (x^2 - 1)(x - 1)$.`,
            R`$x^2 - 1 = (x - 1)(x + 1)$, so $f(x) = (x - 1)^2(x + 1)$.`,
            R`Set each factor to $0$: $x = 1$ (a **repeated zero**, multiplicity 2) and $x = -1$.`,
          ], R`(1, 0) \text{ and } (-1, 0);\ \ f(x) = (x - 1)^2(x + 1)`),
          {
            type: 'steps', prompt: R`\text{Multiplicity: } f(x) = (x - 2)(x - 4)^2(x + 1)^5`,
            steps: [
              R`$x = 2$: multiplicity $1$ (odd) → the graph **crosses**.`,
              R`$x = 4$: multiplicity $2$ (even) → the graph **touches and bounces**.`,
              R`$x = -1$: multiplicity $5$ (odd) → the graph **crosses** (flattening out as it passes through).`,
            ],
            answer: R`2:\ \text{cross};\ \ 4:\ \text{bounce};\ \ -1:\ \text{cross}`,
          },
          {
            type: 'analyze', label: R`\text{Ex 3}`, prompt: R`f(x) = 3x^2 - 2x^3`, c: -1, factors: [[1, 0, 2], [2, -3, 1]], std: [-2, 3, 0, 0],
            factorSteps: [R`**Standard form first:** $f(x) = -2x^3 + 3x^2$.`, R`**GCF:** $-x^2(2x - 3)$.`],
            exp: { ends: [1, -1], yInt: 0, zeros: [[0, 1, 2], [3, 2, 1]] },
          },
          {
            type: 'analyze', label: R`\text{Ex 4}`, prompt: R`f(x) = \tfrac{2}{3}(x + 1)^2(x - 3)\left(x - \tfrac{9}{2}\right)`, c: [2, 3], factors: [[1, 1, 2], [1, -3, 1], [1, [-9, 2], 1]],
            factorSteps: [R`It is **already in factored form**.`],
            exp: { ends: [1, 1], yInt: 9, zeros: [[-1, 1, 2], [3, 1, 1], [9, 2, 1]] },
          },
        ],
      },
      {
        title: 'Day 10 — Rational Root Theorem',
        problems: [
          {
            type: 'steps', prompt: R`\text{Rational Root Theorem}`,
            steps: [
              R`If $f(x) = a_nx^n + a_{n-1}x^{n-1} + \dots + a_1x + a_0$ has **integer coefficients**, then every rational zero has the form $\dfrac{p}{q}$.`,
              R`$p$ = a factor of the **constant** $a_0$; $\;q$ = a factor of the **leading coefficient** $a_n$.`,
            ],
            answer: R`\dfrac{p}{q} = \dfrac{\text{factors of the constant } (a_0)}{\text{factors of the leading coefficient } (a_n)}`,
          },
          { type: 'rrt', label: R`\text{Ex 1}`, find: true, std: [1, -1, -9, 9], exp: { possible: [[1], [3], [9]], zeros: [[1, 1, 1], [3, 1, 1], [-3, 1, 1]] } },
          { type: 'rrt', label: R`\text{Ex 2}`, find: true, std: [1, -4, -11, 30], exp: { possible: [[1], [2], [3], [5], [6], [10], [15], [30]], zeros: [[2, 1, 1], [5, 1, 1], [-3, 1, 1]] } },
          { type: 'rrt', label: R`\text{Ex 3}`, std: [15, -68, -7, 24, -4], exp: { possible: [[1], [2], [4], [1, 3], [2, 3], [4, 3], [1, 5], [2, 5], [4, 5], [1, 15], [2, 15], [4, 15]] } },
        ],
      },
      {
        title: 'Day 11 — Irrational & complex root theorems',
        problems: [
          {
            type: 'steps', prompt: R`\text{Fill in the blanks}`,
            steps: [
              R`**Irrational Root Theorem:** if $a + \sqrt{b}$ is a root (zero) of a polynomial, then the conjugate **$a - \sqrt{b}$** is also a root.`,
              R`**Complex/Imaginary Root Theorem:** if $a + bi$ is a root (zero) of a polynomial, then the conjugate **$a - bi$** is also a root.`,
              R`(Both need a polynomial with rational, e.g. integer, coefficients.)`,
            ],
            answer: R`a - \sqrt{b};\quad a - bi`,
          },
          { type: 'conj', label: R`\text{Ex 1A}`, roots: [[1, 1, 3], [0, -1, 11]], exp: [[1, -1, 3], [0, 1, 11]] },
          { type: 'conj', label: R`\text{Ex 1B}`, roots: [[2, -1, 7], [4, 5, -1]], exp: [[2, 1, 7], [4, -5, -1]] },
          { type: 'conj', label: R`\text{Ex 1C}`, roots: [[3, -1, -1], [0, 4, -1]], exp: [[3, 1, -1], [0, -4, -1]] },
          { type: 'build', label: R`\text{Ex 2}`, degree: 3, roots: [[8], [0, 3, -1]], exp: [1, -8, 9, -72] },
          { type: 'build', label: R`\text{Ex 3}`, roots: [[5], [0, 1, 2]], exp: [1, -5, -2, 10] },
          { type: 'build', label: R`\text{Ex 4}`, roots: [[-3], [1, 2, -1]], exp: [1, 1, -1, 15] },
          { type: 'build', label: R`\text{Ex 5}`, roots: [[[3, 4]], [2, -1, 5]], exp: [4, -19, 8, 3] },
        ],
      },
      {
        title: 'Day 12 — The Fundamental Theorem of Algebra',
        problems: [
          {
            type: 'steps', prompt: R`\text{Fundamental Theorem of Algebra: what it means}`,
            steps: [
              R`If $f(x)$ has degree $n > 0$, then $f(x) = 0$ has **at least one** root in the complex numbers.`,
              R`Divide that root out and repeat: a polynomial of degree $n$ has **exactly $n$ complex roots**, counting multiplicity.`,
              R`Imaginary roots come in conjugate pairs, so the number of **real** roots is $n,\ n - 2,\ n - 4, \dots$`,
            ],
            answer: R`\text{degree } n \Rightarrow \text{exactly } n \text{ complex roots}`,
          },
          zeros([1, 3, -8, -22, -24], ['3', '-4', '-1+I', '-1-I'], { label: R`\text{Ex 1}` }),
          { type: 'fta', label: R`\text{Ex 2}`, std: [1, -3, 0, 4, 1], exp: { possible: [[1]] } },
          { type: 'fta', label: R`\text{Ex 3}`, std: [2, 10, 0, -2, -1, 3], exp: { possible: [[1], [3], [1, 2], [3, 2]] } },
        ],
      },
      {
        title: 'Day 14 — Polynomial inequalities',
        problems: [
          {
            type: 'steps', prompt: R`\text{How to solve a polynomial inequality}`,
            steps: [
              R`1. Find all the **real** zeros of the polynomial (not imaginary). The zeros are the **critical points**.`,
              R`2. Plot the zeros on a number line: **open** circles for $<$ and $>$, **closed** circles for $\le$ and $\ge$.`,
              R`3. Pick one $x$-value in each test interval and find the **sign** there.`,
              R`4. Write the answer in interval notation: $(\ )$ for open circles and $\pm\infty$, $[\ ]$ for closed circles.`,
            ],
            answer: R`\text{zeros} \to \text{number line} \to \text{test} \to \text{interval notation}`,
          },
          ineqS([1, -5, -6], '<', 'Interval.open(-1, 6)', { label: R`\text{Ex 1A}` }),
          ineqS([2, -1, -32, 0], '>=', 'Union(Interval(-4, 1/2), Interval(4, oo))', { label: R`\text{Ex 1B}`, rhs: [-16] }),
          ineqF([[1, -2, 2], [1, 3]], '>', 'Union(Interval.open(-3, 2), Interval.open(2, oo))', { label: R`\text{Ex 1C}` }),
          ineqS([1, 0, -4, 0, 3], '>', 'Union(Interval.open(-oo, -sqrt(3)), Interval.open(-1, 1), Interval.open(sqrt(3), oo))', { label: R`\text{Ex 1D}` }),
          ineqS([1, 6, 9], '>', 'Union(Interval.open(-oo, -3), Interval.open(-3, oo))', { label: R`\text{Ex 1E}` }),
          ineqS([1, 4, 4], '<=', 'FiniteSet(-2)', { label: R`\text{Ex 1F}` }),
          ineqS([1, 5, 7], '<', 'EmptySet', { label: R`\text{Ex 1G}` }),
          ineqS([1, -6, 9], '>=', 'Reals', { label: R`\text{Ex 1H}` }),
        ],
      },
      {
        title: 'Day 15 — Inverse functions',
        problems: [
          {
            type: 'steps', prompt: R`\text{Ex 1: } f(x) \text{ is } (-2, 3),\ (-1, 2),\ (0, 1),\ (1, -2),\ (2, -3).\ \text{ Find } f^{-1}(x).`,
            steps: [
              R`An inverse **switches $x$ and $y$** in every point.`,
              R`$f^{-1}$: $(3, -2),\ (2, -1),\ (1, 0),\ (-2, 1),\ (-3, 2)$.`,
              R`The **domain** of $f$ becomes the **range** of $f^{-1}$ (and the range becomes the domain).`,
            ],
            answer: R`x:\ 3,\ 2,\ 1,\ -2,\ -3;\quad y:\ -2,\ -1,\ 0,\ 1,\ 2`,
          },
          inv(R`\text{Ex 2A: } f(x) = x + 4`, [R`**Switch:** $x = y + 4$.`, R`**Solve for $y$:** $y = x - 4$.`], R`f^{-1}(x) = x - 4`, 'x + 4', 'x - 4'),
          inv(R`\text{Ex 2B: } f(x) = \tfrac13x`, [R`**Switch:** $x = \tfrac13y$.`, R`Multiply by $3$: $y = 3x$.`], R`f^{-1}(x) = 3x`, 'x/3', '3*x'),
          inv(R`\text{Ex 2C: } f(x) = \dfrac{5 - 3x}{2}`, [R`**Switch:** $x = \dfrac{5 - 3y}{2}$.`, R`Multiply by $2$: $2x = 5 - 3y$, so $3y = 5 - 2x$.`, R`Divide by $3$: $y = \dfrac{5 - 2x}{3}$.`], R`f^{-1}(x) = \dfrac{5 - 2x}{3}`, '(5 - 3*x)/2', '(5 - 2*x)/3'),
          inv(R`\text{Ex 2D: } f(x) = \sqrt[3]{x + 1}`, [R`**Switch:** $x = \sqrt[3]{y + 1}$.`, R`Cube both sides: $x^3 = y + 1$.`, R`Subtract $1$: $y = x^3 - 1$.`], R`f^{-1}(x) = x^3 - 1`, 'cbrt(x + 1)', 'x**3 - 1', true, { graph: pairGraph(x => cbrt(x + 1), 'f(x)', x => x ** 3 - 1, 'f⁻¹(x)') }),
          {
            type: 'steps', prompt: R`\text{Ex 2E: } f(x) = x^2 + 1`,
            steps: [
              R`**Switch:** $x = y^2 + 1$. Subtract $1$: $y^2 = x - 1$.`,
              R`Square root (both signs!): $y = \pm\sqrt{x - 1}$.`,
              R`Each input gives **two** outputs, so this inverse is a relation, **not a function** (unless we limit the domain to $x \ge 0$).`,
            ],
            answer: R`y = \pm\sqrt{x - 1}\ \ (\text{not a function})`,
          },
          {
            type: 'steps', prompt: R`\text{Ex 3: } f(x) = \tfrac12x + 5.\ \text{Find (a) } (f \circ f^{-1})(652),\ \text{(b) } (f^{-1} \circ f)(-\sqrt{27}),\ \text{(c) } (f^{-1} \circ f)(-3.8\pi)`,
            steps: [
              R`**Definition:** $f$ and $f^{-1}$ undo each other: $f(f^{-1}(x)) = x$ and $f^{-1}(f(x)) = x$.`,
              R`So the composition hands back whatever went in, with no arithmetic needed: (a) $652$, (b) $-\sqrt{27}$, (c) $-3.8\pi$.`,
              R`Check (a) the long way: $f^{-1}(x) = 2x - 10$, so $f^{-1}(652) = 1294$ and $f(1294) = 647 + 5 = 652$ ✓.`,
            ],
            answer: R`\text{(a) } 652\quad \text{(b) } -\sqrt{27}\quad \text{(c) } -3.8\pi`,
          },
          {
            type: 'steps', prompt: R`\text{Ex 4: graph } f(x) = x^2 \text{ and its inverse}`,
            steps: [
              R`Swapping $x$ and $y$ **reflects** the graph over the line $y = x$.`,
              R`$(1, 1),\ (2, 4),\ (-2, 4)$ on $y = x^2$ become $(1, 1),\ (4, 2),\ (4, -2)$ on the inverse $x = y^2$, i.e. $y = \pm\sqrt{x}$.`,
              R`The inverse opens to the **right**. It fails the vertical line test, so it is not a function.`,
            ],
            answer: R`y = \pm\sqrt{x}\ \text{(reflection over } y = x\text{)}`,
            graph: { curves: [{ f: x => x * x, label: 'f(x) = x²' }, { f: x => Math.sqrt(x), label: 'inverse: y = ±√x' }, { f: x => -Math.sqrt(x), label: '' }], window: [-5, 5, -5, 5] },
          },
          {
            type: 'steps', prompt: R`\text{Ex 5: horizontal line test. Is the inverse a function?}`,
            steps: [
              R`**Horizontal line test:** if any horizontal line hits the graph of $f$ more than once, the inverse is **not** a function.`,
              R`**A)** The curve always rises, so every horizontal line hits it at most once: **yes**.`,
              R`**B)** It goes up, down, and up again, so some horizontal lines hit it three times: **no**.`,
              R`**C)** A slanted line is hit exactly once by every horizontal line: **yes**.`,
            ],
            answer: R`\text{A yes, B no, C yes}`,
          },
        ],
      },
    ],
  },
]

function factorProblem(prompt, expr, factored, steps, answer) {
  return { type: 'steps', prompt, steps, answer, check: { expr, factored } }
}
function rootsProblem(prompt, expr, steps, answer, variable = 'x') {
  return { type: 'steps', prompt, steps, answer, check: { expr, roots: ROOTS[expr], variable } }
}
