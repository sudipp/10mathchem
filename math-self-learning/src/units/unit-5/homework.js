// Unit 5 homework: radical expressions (HW #1) and the Fall Final Exam Review.
// Radical checks use `positive: true` (Kuta assumes every variable is positive),
// so sympy simplifies √(x²) to x. Conic and polynomial problems reuse the
// Unit 3 / Unit 4 engines, which scripts/verify.mjs re-checks.

const R = String.raw
const S5 = Math.sqrt(5), S13 = Math.sqrt(13)

const rad = (prompt, expr, result, steps, answer) => ({ type: 'steps', prompt, steps, answer, check: { expr, result, positive: true } })
const val = (prompt, value, result, steps, answer, extra = {}) => ({ type: 'steps', prompt, steps, answer, check: { value, result }, ...extra })
const same = (prompt, expr, result, steps, answer, extra = {}) => ({ type: 'steps', prompt, steps, answer, check: { expr, result }, ...extra })
const roots = (prompt, expr, rts, steps, answer, variable = 'x') => ({ type: 'steps', prompt, steps, answer, check: { expr, roots: rts, variable } })
const factor = (prompt, expr, factored, steps, answer) => ({ type: 'steps', prompt, steps, answer, check: { expr, factored } })
const zeros = (std, rts, extra = {}) => ({ type: 'rrt', find: true, all: true, std, exp: { roots: rts }, ...extra })
const hand = (prompt, steps, answer, extra = {}) => ({ type: 'steps', prompt, steps, answer, ...extra })
const mc = (problem, choice, choices) => ({ ...problem, choice, choices: choices.map((t, i) => ['ABCDE'[i], t]) })

const conic = (prompt, g, ask, exp, extra = {}) => ({ type: 'conic', prompt, g, ask, exp, ...extra })
const eqn = (prompt, conicSpec, steps, key, facts, extra = {}) => ({ type: 'conicEq', prompt, conic: conicSpec, steps, key, facts, ...extra })
const para = (vertical, a, h, k) => ({ kind: 'parabola', vertical, a, h, k })
const ell = (h, k, X2, Y2) => ({ kind: 'ellipse', h, k, X2, Y2 })
const hyp = (h, k, X2, Y2, vertical = false) => ({ kind: 'hyperbola', h, k, X2, Y2, vertical })
const CIRCLE = ['center', 'radius']
const PARA = ['vertex', 'axis', 'opens', 'focus', 'directrix']
const ELL = ['center', 'vertices', 'coVertices', 'foci']
const HYP = ['center', 'vertices', 'foci', 'asymptotes']

// Parabola features (HW #1, 23–26): vertex form, then every feature, then the graph.
const parab = (prompt, std, window, expr, vform, steps, answer) => ({ type: 'steps', prompt, steps, answer, poly: std, window, check: { expr, factored: vform } })

const LIST = [
  {
    id: 'hw1', title: 'HW #1', name: 'Simplifying Radicals', due: '', lesson: 0,
    intro: 'Assume every variable is positive, so √(x²) = x. Problems 23–28 review parabolas and zeros from earlier units.',
    sections: [
      {
        title: 'Simplify.', lesson: 0,
        problems: [
          rad(R`6\sqrt{80x^4y^2}`, '6*sqrt(80*x**4*y**2)', '24*x**2*y*sqrt(5)', [
            R`**Find the biggest perfect square in 80:** $80 = 16 \cdot 5$.`,
            R`**Even powers come out halved:** $\sqrt{x^4} = x^2$, $\sqrt{y^2} = y$.`,
            R`$6\sqrt{16x^4y^2 \cdot 5} = 6 \cdot 4x^2y\sqrt5 = 24x^2y\sqrt5$.`,
          ], R`24x^2y\sqrt5`),
          rad(R`2\sqrt{112x^4y^4}`, '2*sqrt(112*x**4*y**4)', '8*x**2*y**2*sqrt(7)', [
            R`$112 = 16 \cdot 7$; $\sqrt{x^4} = x^2$, $\sqrt{y^4} = y^2$.`,
            R`$2 \cdot 4x^2y^2\sqrt7 = 8x^2y^2\sqrt7$.`,
          ], R`8x^2y^2\sqrt7`),
          rad(R`-2\sqrt{128x^2y^4}`, '-2*sqrt(128*x**2*y**4)', '-16*x*y**2*sqrt(2)', [
            R`$128 = 64 \cdot 2$; $\sqrt{x^2} = x$, $\sqrt{y^4} = y^2$.`,
            R`$-2 \cdot 8xy^2\sqrt2 = -16xy^2\sqrt2$.`,
          ], R`-16xy^2\sqrt2`),
          rad(R`-5\sqrt{192x^3y^3}`, '-5*sqrt(192*x**3*y**3)', '-40*x*y*sqrt(3*x*y)', [
            R`$192 = 64 \cdot 3$.`,
            R`**Odd powers:** split off one copy. $x^3 = x^2 \cdot x$, so $\sqrt{x^3} = x\sqrt x$. Same for $y^3$.`,
            R`$-5 \cdot 8xy\sqrt{3xy} = -40xy\sqrt{3xy}$.`,
          ], R`-40xy\sqrt{3xy}`),
          rad(R`8\sqrt{175x^2y}`, '8*sqrt(175*x**2*y)', '40*x*sqrt(7*y)', [
            R`$175 = 25 \cdot 7$; $\sqrt{x^2} = x$; $y$ (power 1) stays inside.`,
            R`$8 \cdot 5x\sqrt{7y} = 40x\sqrt{7y}$.`,
          ], R`40x\sqrt{7y}`),
          rad(R`2\sqrt{28x^2y^4}`, '2*sqrt(28*x**2*y**4)', '4*x*y**2*sqrt(7)', [
            R`$28 = 4 \cdot 7$; $\sqrt{x^2} = x$, $\sqrt{y^4} = y^2$.`,
            R`$2 \cdot 2xy^2\sqrt7 = 4xy^2\sqrt7$.`,
          ], R`4xy^2\sqrt7`),
        ],
      },
      {
        title: 'Simplify (multiplying radicals).', lesson: 1,
        problems: [
          rad(R`\sqrt5 \cdot -\sqrt5`, 'sqrt(5)*(-sqrt(5))', '-5', [R`$\sqrt5 \cdot \sqrt5 = 5$ (a square root times itself is the number inside).`, R`Keep the negative sign: $-5$.`], R`-5`),
          rad(R`2\sqrt5 \cdot \sqrt5`, '2*sqrt(5)*sqrt(5)', '10', [R`Multiply outside by outside, inside by inside: $2\sqrt{25} = 2 \cdot 5 = 10$.`], R`10`),
          rad(R`\sqrt5 \cdot -2\sqrt5`, 'sqrt(5)*(-2*sqrt(5))', '-10', [R`$-2\sqrt{25} = -2 \cdot 5 = -10$.`], R`-10`),
          rad(R`\sqrt5 \cdot \sqrt{10}`, 'sqrt(5)*sqrt(10)', '5*sqrt(2)', [R`$\sqrt{5 \cdot 10} = \sqrt{50}$.`, R`$50 = 25 \cdot 2$, so $\sqrt{50} = 5\sqrt2$.`], R`5\sqrt2`),
          rad(R`-5\sqrt{5x^3} \cdot \sqrt{3x^2}`, '-5*sqrt(5*x**3)*sqrt(3*x**2)', '-5*x**2*sqrt(15*x)', [
            R`**Multiply under one root:** $-5\sqrt{15x^5}$.`,
            R`$x^5 = x^4 \cdot x$, so $\sqrt{x^5} = x^2\sqrt x$.`,
            R`$-5x^2\sqrt{15x}$.`,
          ], R`-5x^2\sqrt{15x}`),
          rad(R`-2\sqrt{15m^2} \cdot \sqrt{6m^3}`, '-2*sqrt(15*m**2)*sqrt(6*m**3)', '-6*m**2*sqrt(10*m)', [
            R`$-2\sqrt{90m^5}$, and $90 = 9 \cdot 10$, $m^5 = m^4 \cdot m$.`,
            R`$-2 \cdot 3m^2\sqrt{10m} = -6m^2\sqrt{10m}$.`,
          ], R`-6m^2\sqrt{10m}`),
          rad(R`2\sqrt{10x^3} \cdot \sqrt{6x^2}`, '2*sqrt(10*x**3)*sqrt(6*x**2)', '4*x**2*sqrt(15*x)', [
            R`$2\sqrt{60x^5}$, and $60 = 4 \cdot 15$.`,
            R`$2 \cdot 2x^2\sqrt{15x} = 4x^2\sqrt{15x}$.`,
          ], R`4x^2\sqrt{15x}`),
          rad(R`\sqrt{12a} \cdot \sqrt{25a}`, 'sqrt(12*a)*sqrt(25*a)', '10*a*sqrt(3)', [
            R`$\sqrt{300a^2}$, and $300 = 100 \cdot 3$.`,
            R`$10a\sqrt3$.`,
          ], R`10a\sqrt3`),
          rad(R`-5\sqrt{15a}\left(3 + 3\sqrt{6a}\right)`, '-5*sqrt(15*a)*(3 + 3*sqrt(6*a))', '-15*sqrt(15*a) - 45*a*sqrt(10)', [
            R`**Distribute** $-5\sqrt{15a}$ to both terms: $-15\sqrt{15a} - 15\sqrt{90a^2}$.`,
            R`$\sqrt{90a^2} = \sqrt{9a^2 \cdot 10} = 3a\sqrt{10}$, so the second term is $-15 \cdot 3a\sqrt{10} = -45a\sqrt{10}$.`,
            R`The radicands differ ($15a$ and $10$), so they are not like terms.`,
          ], R`-15\sqrt{15a} - 45a\sqrt{10}`),
          rad(R`\sqrt{15x}\left(\sqrt{10} + 4\sqrt{3x}\right)`, 'sqrt(15*x)*(sqrt(10) + 4*sqrt(3*x))', '5*sqrt(6*x) + 12*x*sqrt(5)', [
            R`**Distribute:** $\sqrt{150x} + 4\sqrt{45x^2}$.`,
            R`$\sqrt{150x} = \sqrt{25 \cdot 6x} = 5\sqrt{6x}$ and $4\sqrt{45x^2} = 4 \cdot 3x\sqrt5 = 12x\sqrt5$.`,
          ], R`5\sqrt{6x} + 12x\sqrt5`),
        ],
      },
      {
        title: 'Simplify (dividing and rationalizing).', lesson: 2,
        problems: [
          rad(R`\dfrac{5\sqrt{20}}{\sqrt{125}}`, '5*sqrt(20)/sqrt(125)', '2', [
            R`**Divide under one root:** $5\sqrt{\dfrac{20}{125}} = 5\sqrt{\dfrac{4}{25}}$.`,
            R`$5 \cdot \dfrac25 = 2$.`,
          ], R`2`),
          rad(R`\dfrac{3\sqrt2}{3\sqrt{18}}`, '3*sqrt(2)/(3*sqrt(18))', '1/3', [
            R`Cancel the 3s: $\sqrt{\dfrac{2}{18}} = \sqrt{\dfrac19} = \dfrac13$.`,
          ], R`\dfrac13`),
          rad(R`\dfrac{5}{\sqrt3}`, '5/sqrt(3)', '5*sqrt(3)/3', [
            R`**Rationalize:** multiply top and bottom by $\sqrt3$ (it equals multiplying by $1$).`,
            R`$\dfrac{5\sqrt3}{\sqrt3 \cdot \sqrt3} = \dfrac{5\sqrt3}{3}$.`,
          ], R`\dfrac{5\sqrt3}{3}`),
          rad(R`\dfrac{2\sqrt2}{\sqrt5}`, '2*sqrt(2)/sqrt(5)', '2*sqrt(10)/5', [
            R`Multiply top and bottom by $\sqrt5$: $\dfrac{2\sqrt{10}}{5}$.`,
          ], R`\dfrac{2\sqrt{10}}{5}`),
          rad(R`\dfrac{\sqrt{20x^2y^3}}{3\sqrt{15xy^3}}`, 'sqrt(20*x**2*y**3)/(3*sqrt(15*x*y**3))', '2*sqrt(3*x)/9', [
            R`**Divide under one root first:** $\dfrac13\sqrt{\dfrac{20x^2y^3}{15xy^3}} = \dfrac13\sqrt{\dfrac{4x}{3}}$.`,
            R`$\sqrt{\dfrac{4x}{3}} = \dfrac{2\sqrt x}{\sqrt3}$. Rationalize: $\dfrac{2\sqrt x \cdot \sqrt3}{3} = \dfrac{2\sqrt{3x}}{3}$.`,
            R`Times $\dfrac13$: $\dfrac{2\sqrt{3x}}{9}$.`,
          ], R`\dfrac{2\sqrt{3x}}{9}`),
          rad(R`\dfrac{\sqrt{16x^3y^2}}{\sqrt{20x^3y}}`, 'sqrt(16*x**3*y**2)/sqrt(20*x**3*y)', '2*sqrt(5*y)/5', [
            R`**Divide under one root:** $\sqrt{\dfrac{16x^3y^2}{20x^3y}} = \sqrt{\dfrac{4y}{5}} = \dfrac{2\sqrt y}{\sqrt5}$.`,
            R`Rationalize: $\dfrac{2\sqrt y \cdot \sqrt5}{5} = \dfrac{2\sqrt{5y}}{5}$.`,
          ], R`\dfrac{2\sqrt{5y}}{5}`),
        ],
      },
      {
        title: 'Find the vertex, axis of symmetry, y-intercept, x-intercepts, domain and range. Then graph.',
        problems: [
          parab(R`y = x^2 - 6x + 8`, [1, -6, 8], [-1, 7, -2, 9], 'x**2 - 6*x + 8', '(x-3)**2 - 1', [
            R`**Vertex:** $x = -\dfrac{b}{2a} = \dfrac{6}{2} = 3$, and $y(3) = 9 - 18 + 8 = -1$. Vertex form: $y = (x - 3)^2 - 1$.`,
            R`**Axis of symmetry:** $x = 3$. **y-intercept:** $y(0) = 8$.`,
            R`**x-intercepts:** $x^2 - 6x + 8 = (x - 2)(x - 4) = 0$, so $x = 2$ and $x = 4$.`,
            R`It opens up from $y = -1$: **domain** all reals, **range** $y \ge -1$.`,
          ], R`\begin{array}{l} \text{Vertex } (3, -1),\ \text{axis } x = 3 \\ \text{y-int } (0, 8);\ \text{x-ints } (2, 0), (4, 0) \\ \text{D: all reals};\ \text{R: } y \ge -1 \end{array}`),
          parab(R`y = x^2 + 4x + 7`, [1, 4, 7], [-6, 2, -1, 12], 'x**2 + 4*x + 7', '(x+2)**2 + 3', [
            R`**Vertex:** $x = -\dfrac{4}{2} = -2$, $y(-2) = 4 - 8 + 7 = 3$. Vertex form: $y = (x + 2)^2 + 3$.`,
            R`**Axis:** $x = -2$. **y-intercept:** $7$.`,
            R`**x-intercepts:** the vertex is above the x-axis and it opens up, so there are **none** (the discriminant $16 - 28 < 0$).`,
            R`**Domain** all reals, **range** $y \ge 3$.`,
          ], R`\begin{array}{l} \text{Vertex } (-2, 3),\ \text{axis } x = -2 \\ \text{y-int } (0, 7);\ \text{no x-intercepts} \\ \text{D: all reals};\ \text{R: } y \ge 3 \end{array}`),
          parab(R`y = -(x + 5)^2`, [-1, -10, -25], [-10, 0, -12, 3], '-(x+5)**2', '-(x+5)**2', [
            R`Already in vertex form $y = a(x - h)^2 + k$ with $a = -1$, $h = -5$, $k = 0$: **vertex** $(-5, 0)$, opens **down**.`,
            R`**Axis:** $x = -5$. **y-intercept:** $-(0 + 5)^2 = -25$.`,
            R`**x-intercept:** the vertex sits on the x-axis, so the only one is $x = -5$.`,
            R`**Domain** all reals, **range** $y \le 0$.`,
          ], R`\begin{array}{l} \text{Vertex } (-5, 0),\ \text{axis } x = -5 \\ \text{y-int } (0, -25);\ \text{x-int } (-5, 0) \\ \text{D: all reals};\ \text{R: } y \le 0 \end{array}`),
          parab(R`y = \left(x - \tfrac72\right)^2 - \tfrac14`, [1, -7, 12], [0, 7, -1, 13], '(x-Rational(7,2))**2 - Rational(1,4)', 'x**2 - 7*x + 12', [
            R`Vertex form: **vertex** $\left(\tfrac72, -\tfrac14\right)$, opens up. **Axis:** $x = \tfrac72$.`,
            R`**y-intercept:** $\tfrac{49}{4} - \tfrac14 = 12$.`,
            R`**x-intercepts:** $\left(x - \tfrac72\right)^2 = \tfrac14 \Rightarrow x - \tfrac72 = \pm\tfrac12$, so $x = 3$ and $x = 4$.`,
            R`**Domain** all reals, **range** $y \ge -\tfrac14$.`,
          ], R`\begin{array}{l} \text{Vertex } \left(\tfrac72, -\tfrac14\right),\ \text{axis } x = \tfrac72 \\ \text{y-int } (0, 12);\ \text{x-ints } (3, 0), (4, 0) \\ \text{D: all reals};\ \text{R: } y \ge -\tfrac14 \end{array}`),
        ],
      },
      {
        title: 'Find all zeros.',
        problems: [
          zeros([3, 1, -3, -1], ['-1/3', '-1', '1']),
          zeros([-27, 0, 0, 1], ['1/3', '(-1+I*sqrt(3))/6', '(-1-I*sqrt(3))/6']),
        ],
      },
    ],
  },
  {
    id: 'rev1', title: 'Final Review #1', name: 'Fall Final Exam Review #1', due: '',
    intro: 'Four sections that cover the whole fall semester: linear equations and functions, conic sections (Unit 3), polynomials (Unit 4), and quadratics with complex numbers. Show your work on your own paper.',
    sections: [
      {
        title: 'Section 1: Evaluate, simplify, solve, and lines',
        problems: [
          val(R`\text{Evaluate } 3 + 12x - x^2 \text{ for } x = -2`, '3 + 12*(-2) - (-2)**2', '-25', [R`Substitute with parentheses: $3 + 12(-2) - (-2)^2 = 3 - 24 - 4$.`, R`$(-2)^2 = 4$, so subtract $4$: total $-25$.`], R`-25`),
          val(R`\text{Evaluate } 2x - 8 \text{ for } x = 6`, '2*6 - 8', '4', [R`$2(6) - 8 = 12 - 8 = 4$.`], R`4`),
          same(R`\text{Simplify } 4(x - 5) - 3(2x + 7)`, '4*(x-5) - 3*(2*x+7)', '-2*x - 41', [R`**Distribute** (the $-3$ hits both terms): $4x - 20 - 6x - 21$.`, R`**Combine like terms:** $-2x - 41$.`], R`-2x - 41`),
          same(R`\text{Simplify } 2(x - 1) + 3(x + 2)`, '2*(x-1) + 3*(x+2)', '5*x + 4', [R`$2x - 2 + 3x + 6 = 5x + 4$.`], R`5x + 4`),
          roots(R`|10x - 73| = 29`, '(10*x-73)**2 - 29**2', ['22/5', '51/5'], [
            R`An absolute value equal to $29$ means the inside is $29$ **or** $-29$.`,
            R`$10x - 73 = 29 \Rightarrow 10x = 102 \Rightarrow x = 10.2$.`,
            R`$10x - 73 = -29 \Rightarrow 10x = 44 \Rightarrow x = 4.4$.`,
          ], R`x = 4.4 \text{ or } x = 10.2`),
          roots(R`3x - [5 - 2(1 - 2x)] = 9 - 7x`, '3*x - (5 - 2*(1 - 2*x)) - (9 - 7*x)', ['2'], [
            R`**Inside the brackets first:** $5 - 2(1 - 2x) = 5 - 2 + 4x = 3 + 4x$.`,
            R`$3x - (3 + 4x) = -x - 3$, so $-x - 3 = 9 - 7x$.`,
            R`$6x = 12 \Rightarrow x = 2$.`,
          ], R`x = 2`),
          val(R`f(x) = x^3 - x + 2.\ \text{Is it linear? Find } f(1).`, '1**3 - 1 + 2', '2', [R`**Not linear:** it has an $x^3$ term (a linear function has highest power $1$).`, R`$f(1) = 1 - 1 + 2 = 2$.`], R`\text{Not linear};\ f(1) = 2`),
          val(R`f(x) = |3x + 1|.\ \text{Is it linear? Find } f(-5).`, 'Abs(3*(-5) + 1)', '14', [R`**Not linear:** an absolute value graph is a V, not a line.`, R`$f(-5) = |{-15} + 1| = |{-14}| = 14$.`], R`\text{Not linear};\ f(-5) = 14`),
          val(R`f(x) = \begin{cases} 3x + 5, & x < 5 \\ -x + 3, & x \ge 5 \end{cases}\quad \text{Find } f(10).`, '-10 + 3', '-7', [R`$10 \ge 5$, so use the **second** piece: $f(10) = -10 + 3 = -7$.`], R`-7`),
          val(R`\text{Same } f.\ \text{Find } f(5) - f(4).`, '(-5 + 3) - (3*4 + 5)', '-19', [R`$5 \ge 5$: $f(5) = -5 + 3 = -2$. $4 < 5$: $f(4) = 3(4) + 5 = 17$.`, R`$-2 - 17 = -19$.`], R`-19`),
          same(R`\text{Line through } (3, -4) \text{ parallel to } y = \tfrac12x - 8`, 'Rational(1,2)*(x-3) - 4', 'x/2 - Rational(11,2)', [
            R`**Parallel** lines have the **same slope:** $m = \tfrac12$.`,
            R`Point-slope: $y + 4 = \tfrac12(x - 3)$, so $y = \tfrac12x - \tfrac32 - 4$.`,
          ], R`y = \tfrac12x - \tfrac{11}{2}`),
          same(R`\text{Line through } (1, 1) \text{ perpendicular to } y = \tfrac12x - 7`, '-2*(x-1) + 1', '-2*x + 3', [
            R`**Perpendicular** slope is the negative reciprocal of $\tfrac12$: $m = -2$.`,
            R`$y - 1 = -2(x - 1) \Rightarrow y = -2x + 3$.`,
          ], R`y = -2x + 3`),
        ],
      },
      {
        title: 'Section 2: Distance, midpoint, and conic sections (Unit 3)',
        problems: [
          val(R`\text{Distance and midpoint: } (4, -3) \text{ and } (6, 2)`, 'sqrt((6-4)**2 + (2+3)**2)', 'sqrt(29)', [
            R`**Distance:** $\sqrt{(6 - 4)^2 + (2 - (-3))^2} = \sqrt{4 + 25} = \sqrt{29}$.`,
            R`**Midpoint:** average the coordinates: $\left(\tfrac{4 + 6}{2}, \tfrac{-3 + 2}{2}\right) = \left(5, -\tfrac12\right)$.`,
          ], R`d = \sqrt{29};\ M = \left(5, -\tfrac12\right)`),
          val(R`\text{Distance and midpoint: } (6, 1) \text{ and } (2, -5)`, 'sqrt((2-6)**2 + (-5-1)**2)', '2*sqrt(13)', [
            R`**Distance:** $\sqrt{(-4)^2 + (-6)^2} = \sqrt{52} = 2\sqrt{13}$.`,
            R`**Midpoint:** $\left(\tfrac{6 + 2}{2}, \tfrac{1 - 5}{2}\right) = (4, -2)$.`,
          ], R`d = 2\sqrt{13};\ M = (4, -2)`),
          same(R`\text{Perpendicular bisector of } (9, -2) \text{ and } (-3, 2)`, '3*(x - 3)', '3*x - 9', [
            R`**Midpoint:** $\left(\tfrac{9 - 3}{2}, \tfrac{-2 + 2}{2}\right) = (3, 0)$.`,
            R`**Slope** of the segment: $\dfrac{2 - (-2)}{-3 - 9} = -\tfrac13$, so the perpendicular slope is $3$.`,
            R`Through $(3, 0)$ with slope $3$: $y = 3(x - 3)$.`,
          ], R`y = 3x - 9`),
          same(R`\text{Perpendicular bisector of } (2, 5) \text{ and } (-1, 7)`, 'Rational(3,2)*(x - Rational(1,2)) + 6', '3*x/2 + Rational(21,4)', [
            R`**Midpoint:** $\left(\tfrac12, 6\right)$. **Slope:** $\dfrac{7 - 5}{-1 - 2} = -\tfrac23$, so the perpendicular slope is $\tfrac32$.`,
            R`$y - 6 = \tfrac32\left(x - \tfrac12\right) = \tfrac32x - \tfrac34$.`,
          ], R`y = \tfrac32x + \tfrac{21}{4}`),
          eqn(R`\text{Parabola: vertex } (3, 1),\ \text{focus } (4, 1)`, para(false, [1, 4], 3, 1), [
            R`Vertex and focus share $y = 1$, so the axis is horizontal: $x = a(y - k)^2 + h$.`,
            R`$p = 4 - 3 = 1$ (focus to the right: opens **right**), so $a = \dfrac{1}{4p} = \tfrac14$.`,
          ], 'x - ((y-1)**2/4 + 3)', { vertex: [3, 1], focus: [4, 1] }),
          eqn(R`\text{Parabola: focus } (0, -5),\ \text{directrix } y = 5`, para(true, [-1, 20], 0, 0), [
            R`The vertex is halfway between the focus and the directrix: $(0, 0)$.`,
            R`The focus is **below** the vertex, so it opens down and $p = -5$: $a = \dfrac{1}{4(-5)} = -\tfrac{1}{20}$.`,
          ], 'y + x**2/20', { vertex: [0, 0], focus: [0, -5], directrix: { y: 5 } }),
          conic(R`x^2 + 4x - 8y + 4 = 0`, { A: 1, D: 4, E: -8, F: 4 }, PARA, { vertex: [-2, 0], focus: [-2, 2], directrix: { y: -2 }, opens: 'up' }),
          conic(R`y^2 - 12y + 16x - 12 = 0`, { C: 1, E: -12, D: 16, F: -12 }, PARA, { vertex: [3, 6], focus: [-1, 6], directrix: { x: 7 }, opens: 'left' }),
          conic(R`4x^2 + 9y^2 - 8x + 72y + 4 = 0`, { A: 4, C: 9, D: -8, E: 72, F: 4 }, ELL, { center: [1, -4], vertices: [[7, -4], [-5, -4]], coVertices: [[1, 0], [1, -8]], foci: [[1 + 2 * S5, -4], [1 - 2 * S5, -4]] }),
          eqn(R`\text{Ellipse: center } (0, 0),\ \text{a focus at } (3, 0),\ \text{major axis length } 12`, ell(0, 0, 36, 27), [
            R`Major axis $12 = 2a$, so $a = 6$. The focus is on the x-axis, so the major axis is horizontal and $c = 3$.`,
            R`$b^2 = a^2 - c^2 = 36 - 9 = 27$.`,
          ], 'x**2/36 + y**2/27 - 1', { center: [0, 0], foci: [[3, 0], [-3, 0]] }),
          eqn(R`\text{Ellipse: a focus at } (0, 2),\ \text{vertices } (0, 0) \text{ and } (0, 10)`, ell(0, 5, 16, 25), [
            R`The **center** is the midpoint of the vertices: $(0, 5)$, and $a = 5$ (vertical major axis).`,
            R`The focus $(0, 2)$ is $c = 3$ from the center (the other focus is $(0, 8)$).`,
            R`$b^2 = a^2 - c^2 = 25 - 9 = 16$. The bigger number goes under $y$.`,
          ], 'x**2/16 + (y-5)**2/25 - 1', { center: [0, 5], vertices: [[0, 10], [0, 0]], foci: [[0, 8], [0, 2]] }),
          factor(R`\text{Circle: center } (2, -1) \text{ through } (-3, 2).\ \text{Write it in general form.}`, 'x**2 + y**2 - 4*x + 2*y - 29', '(x-2)**2 + (y+1)**2 - 34', [
            R`$r^2$ is the squared distance from the center to the point: $(-3 - 2)^2 + (2 + 1)^2 = 25 + 9 = 34$.`,
            R`Standard form: $(x - 2)^2 + (y + 1)^2 = 34$.`,
            R`**General form** (expand, everything on one side): $x^2 - 4x + 4 + y^2 + 2y + 1 - 34 = 0$.`,
          ], R`x^2 + y^2 - 4x + 2y - 29 = 0`),
          same(R`\text{Circle center } (1, 2).\ \text{Tangent line at } P(-5, -4)`, '-(x + 5) - 4', '-x - 9', [
            R`A tangent line is **perpendicular to the radius** at the point.`,
            R`Radius slope: $\dfrac{-4 - 2}{-5 - 1} = 1$, so the tangent slope is $-1$.`,
            R`$y + 4 = -1(x + 5) \Rightarrow y = -x - 9$.`,
          ], R`y = -x - 9`),
          conic(R`y^2 + x^2 + 8y - 4x - 5 = 0`, { A: 1, C: 1, D: -4, E: 8, F: -5 }, CIRCLE, { center: [2, -4], r2: 25 }),
          eqn(R`\text{Hyperbola: center } (0, 0),\ \text{vertices } (\pm3, 0),\ \text{foci } (\pm3\sqrt5, 0)`, hyp(0, 0, 9, 36), [
            R`Vertices on the x-axis: horizontal, $a = 3$. Foci: $c = 3\sqrt5$, so $c^2 = 45$.`,
            R`For a hyperbola $c^2 = a^2 + b^2$: $b^2 = 45 - 9 = 36$.`,
          ], 'x**2/9 - y**2/36 - 1', { center: [0, 0], vertices: [[3, 0], [-3, 0]], foci: [[3 * S5, 0], [-3 * S5, 0]] }),
          eqn(R`\text{Hyperbola: center } (0, 0),\ \text{vertices } (0, \pm9),\ \text{asymptotes } y = \pm\tfrac92x`, hyp(0, 0, 4, 81, true), [
            R`Vertices on the y-axis: vertical, $a = 9$.`,
            R`For a vertical hyperbola the asymptote slope is $\dfrac ab = \dfrac92$, so $b = 2$.`,
          ], 'y**2/81 - x**2/4 - 1', { center: [0, 0], vertices: [[0, 9], [0, -9]] }),
          conic(R`9x^2 - 4y^2 - 54x + 8y + 41 = 0`, { A: 9, C: -4, D: -54, E: 8, F: 41 }, HYP, { center: [3, 1], vertices: [[5, 1], [1, 1]], foci: [[3 + S13, 1], [3 - S13, 1]], asym: [[1.5, -3.5], [-1.5, 5.5]] }),
          eqn(R`\text{Hyperbola: foci } (-1, 5) \text{ and } (-1, -1),\ \text{transverse axis length } 4`, hyp(-1, 2, 5, 4, true), [
            R`The **center** is the midpoint of the foci: $(-1, 2)$. The foci are $c = 3$ above and below, so it is vertical.`,
            R`Transverse axis $2a = 4$, so $a = 2$. $b^2 = c^2 - a^2 = 9 - 4 = 5$.`,
          ], '(y-2)**2/4 - (x+1)**2/5 - 1', { center: [-1, 2], foci: [[-1, 5], [-1, -1]] }),
          conic(R`\text{Classify, then write in standard form: } 3x^2 + 6x - 4y + 12 = 0`, { A: 3, D: 6, E: -4, F: 12 }, ['vertex'], { vertex: [-1, [9, 4]] }),
          conic(R`\text{Classify, then write in standard form: } 2x^2 - 5y^2 + 4x - 6 = 0`, { A: 2, C: -5, D: 4, F: -6 }, ['center'], { center: [-1, 0] }),
          conic(R`\text{Classify, then write in standard form: } 2x^2 + 2y^2 - 6x + 4y - 12 = 0`, { A: 2, C: 2, D: -6, E: 4, F: -12 }, CIRCLE, { center: [[3, 2], -1], r2: [37, 4] }),
        ],
      },
      {
        title: 'Section 3: Exponents, rational expressions, and polynomials (Unit 4)',
        problems: [
          rad(R`\left(8(x^3y^4)^2\right)^{-2}`, '(8*(x**3*y**4)**2)**(-2)', '1/(64*x**12*y**16)', [
            R`**Inside first:** $(x^3y^4)^2 = x^6y^8$, so the base is $8x^6y^8$.`,
            R`**Negative exponent** means reciprocal: $\dfrac{1}{(8x^6y^8)^2} = \dfrac{1}{64x^{12}y^{16}}$.`,
          ], R`\dfrac{1}{64x^{12}y^{16}}`),
          rad(R`\dfrac{15xy^4}{8x^3y^0} \div \dfrac{5y^4}{16x^5y^2}`, '(15*x*y**4/(8*x**3)) / (5*y**4/(16*x**5*y**2))', '6*x**3*y**2', [
            R`**Divide = multiply by the reciprocal:** $\dfrac{15xy^4}{8x^3} \cdot \dfrac{16x^5y^2}{5y^4}$ (and $y^0 = 1$).`,
            R`Numbers: $\dfrac{15 \cdot 16}{8 \cdot 5} = 6$. $x$: $x^{1 + 5 - 3} = x^3$. $y$: $y^{4 + 2 - 4} = y^2$.`,
          ], R`6x^3y^2`),
          same(R`\dfrac{x}{2y} - \dfrac{y}{2x}`, 'x/(2*y) - y/(2*x)', '(x**2 - y**2)/(2*x*y)', [
            R`**Common denominator** $2xy$: $\dfrac{x \cdot x}{2xy} - \dfrac{y \cdot y}{2xy}$.`,
          ], R`\dfrac{x^2 - y^2}{2xy}`),
          same(R`\dfrac{x - 2}{x + 4} + \dfrac{6}{x^2 + 2x - 8}`, '(x-2)/(x+4) + 6/(x**2+2*x-8)', '(x**2 - 4*x + 10)/((x+4)*(x-2))', [
            R`**Factor the denominator:** $x^2 + 2x - 8 = (x + 4)(x - 2)$. That is the common denominator.`,
            R`$\dfrac{(x - 2)(x - 2) + 6}{(x + 4)(x - 2)} = \dfrac{x^2 - 4x + 4 + 6}{(x + 4)(x - 2)}$.`,
            R`$x^2 - 4x + 10$ does not factor, so nothing cancels.`,
          ], R`\dfrac{x^2 - 4x + 10}{(x + 4)(x - 2)}`),
          same(R`(29x - 8) + (15x^3 + 9x^2 - 8)`, '(29*x-8) + (15*x**3+9*x**2-8)', '15*x**3 + 9*x**2 + 29*x - 16', [R`Combine like terms and write in standard form (highest power first).`], R`15x^3 + 9x^2 + 29x - 16`),
          same(R`(6x^3 - 7x^4 + 10x) - (4x^3 - 6x^2)`, '(6*x**3-7*x**4+10*x) - (4*x**3-6*x**2)', '-7*x**4 + 2*x**3 + 6*x**2 + 10*x', [R`**Distribute the minus:** $6x^3 - 7x^4 + 10x - 4x^3 + 6x^2$.`, R`Combine and order: $-7x^4 + 2x^3 + 6x^2 + 10x$.`], R`-7x^4 + 2x^3 + 6x^2 + 10x`),
          same(R`(2x + 8)^3`, '(2*x+8)**3', '8*x**3 + 96*x**2 + 384*x + 512', [
            R`$(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$ with $a = 2x$, $b = 8$.`,
            R`$8x^3 + 3(4x^2)(8) + 3(2x)(64) + 512$.`,
          ], R`8x^3 + 96x^2 + 384x + 512`),
          { type: 'product', factors: [[1, 1], [3, 3], [2, 3]], exp: [6, 21, 24, 9] },
          { type: 'synth', num: [5, 0, -6], k: 2, exp: { q: [5, 10], r: 14 } },
          { type: 'long', num: [3, -10, 26, -12], den: [3, -4], exp: { q: [1, -2, 6], r: [12] } },
          factor(R`\text{Factor } 2x^3 + 250`, '2*x**3 + 250', '2*(x+5)*(x**2 - 5*x + 25)', [
            R`**GCF first:** $2(x^3 + 125)$.`,
            R`**Sum of cubes** $a^3 + b^3 = (a + b)(a^2 - ab + b^2)$ with $a = x$, $b = 5$.`,
          ], R`2(x + 5)(x^2 - 5x + 25)`),
          factor(R`\text{Factor } 2x^3 + 18x^2 - 5x - 45`, '2*x**3 + 18*x**2 - 5*x - 45', '(x+9)*(2*x**2 - 5)', [
            R`**Group:** $2x^2(x + 9) - 5(x + 9)$.`,
            R`Factor out $(x + 9)$. $2x^2 - 5$ does not factor over the integers.`,
          ], R`(x + 9)(2x^2 - 5)`),
          zeros([2, -1, -7, 6], ['3/2', '1', '-2'], { given: [3, 2] }),
          same(R`f(x) = 2x - 4,\ g(x) = x - 2.\ \text{Find } (f + g)(x)`, '(2*x-4) + (x-2)', '3*x - 6', [R`$(2x - 4) + (x - 2) = 3x - 6$.`], R`3x - 6`),
          same(R`\text{Same } f, g.\ \text{Find } (f - g)(x)`, '(2*x-4) - (x-2)', 'x - 2', [R`$(2x - 4) - (x - 2) = 2x - 4 - x + 2 = x - 2$.`], R`x - 2`),
          same(R`\text{Same } f, g.\ \text{Find } (f \cdot g)(x)`, '(2*x-4)*(x-2)', '2*x**2 - 8*x + 8', [R`FOIL: $2x^2 - 4x - 4x + 8$.`], R`2x^2 - 8x + 8`),
          same(R`\text{Same } f, g.\ \text{Find } \left(\tfrac fg\right)(x)`, '(2*x-4)/(x-2)', '2', [R`$\dfrac{2x - 4}{x - 2} = \dfrac{2(x - 2)}{x - 2} = 2$.`, R`$g(2) = 0$, so $x = 2$ is not allowed.`], R`2,\ x \ne 2`),
          same(R`\text{Same } f, g.\ \text{Find } f(g(x))`, '2*(x-2) - 4', '2*x - 8', [R`Put $g(x)$ into $f$: $f(x - 2) = 2(x - 2) - 4 = 2x - 8$.`], R`2x - 8`),
        ],
      },
      {
        title: 'Section 4: Factoring, quadratics, and complex numbers',
        problems: [
          factor(R`\text{Factor } 3x^2 + 11x - 4`, '3*x**2 + 11*x - 4', '(3*x-1)*(x+4)', [R`$ac = -12$: find two numbers that multiply to $-12$ and add to $11$: $12$ and $-1$.`, R`$3x^2 + 12x - x - 4 = 3x(x + 4) - 1(x + 4)$.`], R`(3x - 1)(x + 4)`),
          factor(R`\text{Factor } 6x^2 + 5x - 6`, '6*x**2 + 5*x - 6', '(3*x-2)*(2*x+3)', [R`$ac = -36$: $9$ and $-4$.`, R`$6x^2 + 9x - 4x - 6 = 3x(2x + 3) - 2(2x + 3)$.`], R`(3x - 2)(2x + 3)`),
          factor(R`\text{Factor } n^2 - 49`, 'n**2 - 49', '(n-7)*(n+7)', [R`**Difference of squares:** $a^2 - b^2 = (a - b)(a + b)$ with $b = 7$.`], R`(n - 7)(n + 7)`),
          roots(R`x^2 + 10x + 21 = 0`, 'x**2 + 10*x + 21', ['-3', '-7'], [R`$(x + 3)(x + 7) = 0$ (3 and 7 multiply to 21 and add to 10).`], R`x = -3,\ -7`),
          roots(R`3x^2 - 24x - 27 = 0`, '3*x**2 - 24*x - 27', ['9', '-1'], [R`**GCF:** $3(x^2 - 8x - 9) = 3(x - 9)(x + 1) = 0$.`], R`x = 9,\ -1`),
          roots(R`5x^2 = -125`, '5*x**2 + 125', ['5*I', '-5*I'], [R`$x^2 = -25$.`, R`$x = \pm\sqrt{-25} = \pm5i$.`], R`x = \pm5i`),
          roots(R`(y - 3)^2 = -49`, '(y-3)**2 + 49', ['3+7*I', '3-7*I'], [R`Square root both sides: $y - 3 = \pm7i$.`], R`y = 3 \pm 7i`, 'y'),
          roots(R`4(x + 5)^2 = -8`, '4*(x+5)**2 + 8', ['-5+I*sqrt(2)', '-5-I*sqrt(2)'], [R`Divide by 4: $(x + 5)^2 = -2$.`, R`$x + 5 = \pm i\sqrt2$.`], R`x = -5 \pm i\sqrt2`),
          roots(R`-\tfrac14(r + 1)^2 = 5`, '-(r+1)**2/4 - 5', ['-1+2*I*sqrt(5)', '-1-2*I*sqrt(5)'], [R`Multiply by $-4$: $(r + 1)^2 = -20$.`, R`$r + 1 = \pm\sqrt{-20} = \pm2i\sqrt5$.`], R`r = -1 \pm 2i\sqrt5`, 'r'),
          val(R`(4 + 3i)^2`, '(4+3*I)**2', '7+24*I', [R`$(4 + 3i)(4 + 3i) = 16 + 12i + 12i + 9i^2$.`, R`$i^2 = -1$: $16 - 9 + 24i$.`], R`7 + 24i`),
          val(R`(9 - 5i) - (-2 + 6i)`, '(9-5*I) - (-2+6*I)', '11-11*I', [R`Real parts: $9 - (-2) = 11$. Imaginary parts: $-5 - 6 = -11$.`], R`11 - 11i`),
        ],
      },
    ],
  },
  {
    id: 'rev2', title: 'Final Review #2', name: 'Fall Final Exam Review #2', due: '',
    intro: 'Quadratics, complex numbers, factoring, and polynomial zeros. Problems 32–34 are multiple choice.',
    sections: [
      {
        title: 'Quadratics and the projectile',
        problems: [
          val(R`h = -16t^2 + 64t + 5.\ \text{(a) When does it reach its maximum height?}`, '-64/(2*(-16))', '2', [R`The maximum is at the **vertex**: $t = -\dfrac{b}{2a} = -\dfrac{64}{2(-16)} = 2$.`], R`t = 2 \text{ seconds}`),
          val(R`\text{(b) What is the maximum height?}`, '-16*2**2 + 64*2 + 5', '69', [R`$h(2) = -16(4) + 128 + 5 = 69$.`], R`69 \text{ feet}`),
          roots(R`\text{(c) When does it hit the ground? } -16t^2 + 64t + 5 = 0`, '-16*t**2 + 64*t + 5', ['2+sqrt(69)/4', '2-sqrt(69)/4'], [
            R`**Quadratic formula:** $t = \dfrac{-64 \pm \sqrt{64^2 - 4(-16)(5)}}{2(-16)} = \dfrac{-64 \pm \sqrt{4416}}{-32}$.`,
            R`$\sqrt{4416} = 8\sqrt{69} \approx 66.45$, so $t = 2 \pm \dfrac{\sqrt{69}}{4}$: $t \approx 4.08$ or $t \approx -0.08$.`,
            R`Time cannot be negative.`,
          ], R`t = 2 + \tfrac{\sqrt{69}}{4} \approx 4.08 \text{ seconds}`, 't'),
          roots(R`y = -x^2 + 4x + 21.\ \text{Find the zeros.}`, '-x**2 + 4*x + 21', ['7', '-3'], [R`Factor out $-1$: $-(x^2 - 4x - 21) = -(x - 7)(x + 3) = 0$.`], R`x = 7,\ -3`),
          same(R`\text{Same } y.\ \text{Find the vertex and axis of symmetry.}`, '-x**2 + 4*x + 21', '-(x-2)**2 + 25', [R`$x = -\dfrac{b}{2a} = -\dfrac{4}{-2} = 2$, and $y(2) = -4 + 8 + 21 = 25$.`, R`It is also halfway between the zeros $-3$ and $7$ ✓.`], R`\text{Vertex } (2, 25);\ \text{axis } x = 2`),
          hand(R`\text{Same } y.\ \text{Maximum or minimum? What is it?}`, [R`$a = -1 < 0$, so it opens **down** and the vertex is the highest point.`], R`\text{Maximum value } 25`),
          hand(R`y = 7(x - 4)^2 + 2.\ \text{Maximum or minimum? What is it?}`, [R`$a = 7 > 0$: opens **up**, so the vertex $(4, 2)$ is the lowest point.`], R`\text{Minimum value } 2`),
          factor(R`\text{Perfect square trinomial: } x^2 - 18x + \underline{\quad}`, 'x**2 - 18*x + 81', '(x-9)**2', [R`Take half of $-18$ and square it: $(-9)^2 = 81$.`], R`x^2 - 18x + 81 = (x - 9)^2`),
          factor(R`\text{Perfect square trinomial: } x^2 - 3x + \underline{\quad}`, 'x**2 - 3*x + Rational(9,4)', '(x-Rational(3,2))**2', [R`Half of $-3$ is $-\tfrac32$; squared: $\tfrac94$.`], R`x^2 - 3x + \tfrac94 = \left(x - \tfrac32\right)^2`),
          roots(R`\text{Complete the square: } x^2 - 12x + 5 = 0`, 'x**2 - 12*x + 5', ['6+sqrt(31)', '6-sqrt(31)'], [
            R`Move the 5: $x^2 - 12x = -5$. Add $(-6)^2 = 36$: $(x - 6)^2 = 31$.`,
            R`$x - 6 = \pm\sqrt{31}$.`,
          ], R`x = 6 \pm \sqrt{31}`),
          roots(R`\text{Quadratic formula: } 2x^2 = -6x - 7`, '2*x**2 + 6*x + 7', ['(-3+I*sqrt(5))/2', '(-3-I*sqrt(5))/2'], [
            R`Standard form: $2x^2 + 6x + 7 = 0$, so $a = 2$, $b = 6$, $c = 7$.`,
            R`$x = \dfrac{-6 \pm \sqrt{36 - 56}}{4} = \dfrac{-6 \pm \sqrt{-20}}{4} = \dfrac{-6 \pm 2i\sqrt5}{4}$.`,
          ], R`x = \dfrac{-3 \pm i\sqrt5}{2}`),
        ],
      },
      {
        title: 'Complex numbers',
        problems: [
          val(R`(1 - 5i)(2 - i)`, '(1-5*I)*(2-I)', '-3-11*I', [R`FOIL: $2 - i - 10i + 5i^2$.`, R`$5i^2 = -5$: $2 - 5 - 11i$.`], R`-3 - 11i`),
          val(R`-\dfrac{8}{i}`, '-8/I', '8*I', [R`Multiply top and bottom by $i$: $-\dfrac{8i}{i^2} = -\dfrac{8i}{-1} = 8i$.`], R`8i`),
          val(R`\dfrac{1 - 4i}{3 + i}`, '(1-4*I)/(3+I)', '(-1-13*I)/10', [
            R`Multiply by the **conjugate** $\dfrac{3 - i}{3 - i}$.`,
            R`Top: $(1 - 4i)(3 - i) = 3 - i - 12i + 4i^2 = -1 - 13i$. Bottom: $9 - i^2 = 10$.`,
          ], R`-\tfrac{1}{10} - \tfrac{13}{10}i`),
          roots(R`4x^2 + 100 = 0`, '4*x**2 + 100', ['5*I', '-5*I'], [R`$x^2 = -25 \Rightarrow x = \pm5i$.`], R`x = \pm5i`),
          roots(R`8x^3 - 1 = 0`, '8*x**3 - 1', ['1/2', '(-1+I*sqrt(3))/4', '(-1-I*sqrt(3))/4'], [
            R`**Difference of cubes:** $(2x - 1)(4x^2 + 2x + 1) = 0$.`,
            R`$2x - 1 = 0 \Rightarrow x = \tfrac12$.`,
            R`$x = \dfrac{-2 \pm \sqrt{4 - 16}}{8} = \dfrac{-2 \pm 2i\sqrt3}{8} = \dfrac{-1 \pm i\sqrt3}{4}$.`,
          ], R`x = \tfrac12,\ \dfrac{-1 \pm i\sqrt3}{4}`),
          roots(R`18x^2 - 8 = 0`, '18*x**2 - 8', ['2/3', '-2/3'], [R`$x^2 = \tfrac{8}{18} = \tfrac49$, so $x = \pm\tfrac23$.`], R`x = \pm\tfrac23`),
          hand(R`\text{Vertex of } y = \tfrac12(x - 3)^2 - 4`, [R`Vertex form $y = a(x - h)^2 + k$ has vertex $(h, k)$.`], R`(3, -4)`),
          factor(R`\text{Vertex form of } y = x^2 - 2x + 1`, 'x**2 - 2*x + 1', '(x-1)**2', [R`It is a perfect square: $(x - 1)^2$. Vertex $(1, 0)$.`], R`y = (x - 1)^2 + 0`),
          hand(R`\text{Evaluate } i^2,\ i^4,\ i^6,\ i^8,\ i^{10},\ i^{12}`, [R`$i^2 = -1$ and $i^4 = 1$. Even powers alternate: $i^{4k} = 1$ and $i^{4k + 2} = -1$.`], R`-1,\ 1,\ -1,\ 1,\ -1,\ 1`),
        ],
      },
      {
        title: 'Factoring and polynomial zeros',
        problems: [
          factor(R`\text{Factor } x^3 - 1000`, 'x**3 - 1000', '(x-10)*(x**2 + 10*x + 100)', [R`**Difference of cubes** $a^3 - b^3 = (a - b)(a^2 + ab + b^2)$ with $b = 10$.`], R`(x - 10)(x^2 + 10x + 100)`),
          factor(R`\text{Factor } 27x^3 + 8`, '27*x**3 + 8', '(3*x+2)*(9*x**2 - 6*x + 4)', [R`**Sum of cubes** with $a = 3x$, $b = 2$.`], R`(3x + 2)(9x^2 - 6x + 4)`),
          factor(R`\text{Factor } (x - y)^2 - z^2`, '(x-y)**2 - z**2', '(x-y-z)*(x-y+z)', [R`**Difference of squares** with $a = x - y$ and $b = z$.`], R`(x - y - z)(x - y + z)`),
          roots(R`x^3 + 3x^2 - 4x - 12 = 0`, 'x**3 + 3*x**2 - 4*x - 12', ['-3', '2', '-2'], [R`**Group:** $x^2(x + 3) - 4(x + 3) = (x + 3)(x^2 - 4)$.`, R`$(x + 3)(x - 2)(x + 2) = 0$.`], R`x = -3,\ 2,\ -2`),
          { type: 'graph', num: [1, 3, -1, -3, 0], window: [-3.5, 1.5, -8, 3], exp: { zeros: [-3, -1, 0, 1], min: [[-2.3, -6.9], [0.6, -1.4]], max: [[-0.5, 0.9]] } },
          hand(R`\text{Classify by degree: (a) } f(x) = x^3 - x - 5\quad \text{(b) } f(x) = 5x^2 + 2x - 5\quad \text{(c) } f(x) = -2x + 3`, [R`The **degree** is the highest power: 3, 2, and 1.`], R`\text{(a) cubic, (b) quadratic, (c) linear}`),
          val(R`\text{Remainder Theorem: remainder of } (x^{34} - 3x^3 + 4) \div (x + 1)`, '(-1)**34 - 3*(-1)**3 + 4', '8', [
            R`**Remainder Theorem:** dividing by $x - k$ leaves remainder $f(k)$. Here $x + 1 = x - (-1)$, so $k = -1$ (no 35-column synthetic division needed).`,
            R`$f(-1) = (-1)^{34} - 3(-1)^3 + 4 = 1 + 3 + 4$ (an even power of $-1$ is $1$, an odd power is $-1$).`,
          ], R`8`),
          zeros([1, -2, -5, 6], ['1', '3', '-2'], { given: 1 }),
          zeros([1, -3, 0, 4], ['-1', '2', '2'], { given: -1 }),
          { type: 'conj', roots: [[1, -1, -1], [2, 1, 5]], exp: [[1, 1, -1], [2, -1, 5]] },
          { type: 'build', roots: [[4], [0, 1, 2]], exp: [1, -4, -2, 8], degree: 3 },
          { type: 'build', roots: [[0], [1, -2, -1]], exp: [1, -2, 5, 0], degree: 3 },
          zeros([1, 4, 1, -6], ['1', '-2', '-3']),
          roots(R`\text{Find the real zeros of } f(x) = x^4 + 2x^2 - 15`, 'x**4 + 2*x**2 - 15', ['sqrt(3)', '-sqrt(3)', 'I*sqrt(5)', '-I*sqrt(5)'], [
            R`**Quadratic form:** let $u = x^2$: $u^2 + 2u - 15 = (u + 5)(u - 3)$.`,
            R`$x^2 = 3 \Rightarrow x = \pm\sqrt3$ (real). $x^2 = -5 \Rightarrow x = \pm i\sqrt5$ (not real).`,
          ], R`x = \pm\sqrt3`),
          hand(R`\text{End behavior: } f(x) = 4(x + 3)^2(x - 1)^3`, [R`Degree $2 + 3 = 5$ (odd), leading coefficient $4 > 0$: like $y = x$.`], R`x \to -\infty,\ y \to -\infty;\ \ x \to \infty,\ y \to \infty`),
          hand(R`\text{End behavior: } f(x) = -7(x + 1)^2(x - 1)^4`, [R`Degree $6$ (even), leading coefficient $-7 < 0$: both ends go **down**.`], R`x \to \pm\infty,\ y \to -\infty`),
          hand(R`\text{End behavior: } f(x) = 6(x + 1)(x - 3)^2`, [R`Degree $3$ (odd), leading coefficient $6 > 0$: down on the left, up on the right.`], R`x \to -\infty,\ y \to -\infty;\ \ x \to \infty,\ y \to \infty`),
        ],
      },
      {
        title: 'Multiple choice',
        problems: [
          mc(roots(R`\text{Solve } x^3 - 5x^2 + 5x = 1`, 'x**3 - 5*x**2 + 5*x - 1', ['1', '2+sqrt(3)', '2-sqrt(3)'], [
            R`Get 0 on one side: $x^3 - 5x^2 + 5x - 1 = 0$. Try $x = 1$: $1 - 5 + 5 - 1 = 0$ ✓.`,
            R`Synthetic division by $1$ leaves $x^2 - 4x + 1$.`,
            R`$x = \dfrac{4 \pm \sqrt{16 - 4}}{2} = 2 \pm \sqrt3$.`,
          ], R`1,\ 2 \pm \sqrt3`), 'B', [R`1,\ 2 \pm 2\sqrt3`, R`1,\ 2 \pm \sqrt3`, R`1`, R`-1,\ 2 \pm 2\sqrt3`, R`\text{None of these}`]),
          mc(val(R`\text{Write in standard form: } 3 + \sqrt{-9} - 16 + 2i^2`, '3 + sqrt(-9) - 16 + 2*I**2', '-15+3*I', [R`$\sqrt{-9} = 3i$ and $2i^2 = -2$.`, R`$3 + 3i - 16 - 2 = -15 + 3i$.`], R`-15 + 3i`), 'B', [R`-15 - 3i`, R`-15 + 3i`, R`-18`, R`-17 + 3i`, R`\text{None of these}`]),
          mc(roots(R`\text{Solve } x^3 + 5x^2 + 10x + 6 = 0`, 'x**3 + 5*x**2 + 10*x + 6', ['-1', '-2+I*sqrt(2)', '-2-I*sqrt(2)'], [
            R`Try $x = -1$: $-1 + 5 - 10 + 6 = 0$ ✓.`,
            R`Synthetic division by $-1$ leaves $x^2 + 4x + 6$.`,
            R`$x = \dfrac{-4 \pm \sqrt{16 - 24}}{2} = -2 \pm i\sqrt2$.`,
          ], R`-1,\ -2 \pm i\sqrt2`), 'D', [R`-1,\ 6`, R`-1,\ -2 \pm \sqrt2`, R`-1`, R`-1,\ -2 \pm i\sqrt2`, R`\text{None of these}`]),
        ],
      },
    ],
  },
]

// Worksheet numbering for the review packets (sub-parts like 1a share a number on paper).
const nums = list => list.split(' ')
const NUMS = {
  rev1: [
    nums('1 2 3 4 5 6 7 8 9 10 11 12'),
    nums('1a 1b 2a 2b 3 4 5a 5b 6 7 8 9 10 11 12 13 14 15 16a 16b 16c'),
    nums('1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18'),
    nums('1 2 3 4 5 6 7 8 9 10 11'),
  ],
  rev2: [
    nums('1a 1b 1c 2 3 4 5 6a 6b 7 8'),
    nums('9 10 11 12 13 14 15 16 17'),
    nums('18 19 20 21 22 23 24 25 26 27 28a 28b 29 30 31a 31b 31c'),
    nums('32 33 34'),
  ],
}

export const HOMEWORK = LIST.map(hw => !NUMS[hw.id] ? hw : {
  ...hw,
  sections: hw.sections.map((s, i) => {
    if (NUMS[hw.id][i].length !== s.problems.length) throw new Error(`${hw.id} section ${i + 1}: ${s.problems.length} problems, ${NUMS[hw.id][i].length} numbers`)
    return { ...s, problems: s.problems.map((p, j) => ({ ...p, no: NUMS[hw.id][i][j] })) }
  }),
})