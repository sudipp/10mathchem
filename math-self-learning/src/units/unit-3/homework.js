// Unit 3 homework: conic sections. Graphing problems give the general-form
// coefficients (everything moved to one side: A x² + C y² + D x + E y + F = 0)
// and the engine in src/conics.js completes the square. Writing problems give
// worked steps plus the standard form. `exp`/`facts` are answer-key values that
// scripts/verify.mjs checks; `key` is the answer key's equation (checked with sympy).

const R = String.raw
const S2 = Math.SQRT2, S3 = Math.sqrt(3), S5 = Math.sqrt(5)

const CIRCLE = ['center', 'radius']
const PARA = ['vertex', 'axis', 'opens', 'focus', 'directrix']
const PARA_V = ['vertex', 'axis', 'opens']
const PARA_INT = ['vertex', 'focus', 'axis', 'directrix', 'opens', 'intercept']
const ELL = ['center', 'vertices', 'coVertices', 'foci']
const HYP = ['center', 'vertices', 'foci', 'asymptotes']
const HYP_CV = ['center', 'vertices', 'coVertices', 'foci', 'asymptotes']

const conic = (prompt, g, ask, exp, extra = {}) => ({ type: 'conic', prompt, g, ask, exp, ...extra })
const conicStd = (prompt, std, ask, exp, extra = {}) => ({ type: 'conic', prompt, std, ask, exp, ...extra })
const eqn = (prompt, conicSpec, steps, key, facts, extra = {}) => ({ type: 'conicEq', prompt, conic: conicSpec, steps, key, facts, ...extra })
const circle = (h, k, r2) => ({ kind: 'circle', h, k, r2 })
const para = (vertical, a, h, k) => ({ kind: 'parabola', vertical, a, h, k })
const ell = (h, k, X2, Y2) => ({ kind: 'ellipse', h, k, X2, Y2 })
const hyp = (h, k, X2, Y2, vertical = false) => ({ kind: 'hyperbola', h, k, X2, Y2, vertical })

export const HOMEWORK = [
  {
    id: 'hw1', title: 'HW #1', name: 'Circles: Graphing', due: '', lesson: 0,
    sections: [
      {
        title: 'Put the equation into standard form. Then identify the center and radius of each and sketch the graph.',
        problems: [
          conic(R`y^2 - 8x = -x^2 - 15`, { A: 1, C: 1, D: -8, F: 15 }, CIRCLE, { center: [4, 0], r2: 1 }),
          conic(R`2x + 1 = 2y - y^2 - x^2`, { A: 1, C: 1, D: 2, E: -2, F: 1 }, CIRCLE, { center: [-1, 1], r2: 1 }),
          conic(R`-8x + y^2 + 11 + 2y = -x^2`, { A: 1, C: 1, D: -8, E: 2, F: 11 }, CIRCLE, { center: [4, -1], r2: 6 }),
          conic(R`x^2 + 17 = 6x - 6y - y^2`, { A: 1, C: 1, D: -6, E: 6, F: 17 }, CIRCLE, { center: [3, -3], r2: 1 }),
          conic(R`2x + 6y = -x^2 - y^2 - 1`, { A: 1, C: 1, D: 2, E: 6, F: 1 }, CIRCLE, { center: [-1, -3], r2: 9 }),
          {
            type: 'steps', prompt: R`5 + 4x^2 = -4y^2 + 16y\sqrt2 + 12x`,
            check: { expr: '4*x**2 + 4*y**2 - 12*x - 16*sqrt(2)*y + 5', factored: '4*((x - 3/2)**2 + (y - 2*sqrt(2))**2 - 9)' },
            steps: [
              R`**Get 0 on one side:** $4x^2 + 4y^2 - 12x - 16\sqrt2\,y + 5 = 0$. Same coefficient on $x^2$ and $y^2$, so it is a **circle**.`,
              R`**Divide every term by 4:** $x^2 + y^2 - 3x - 4\sqrt2\,y + \tfrac54 = 0$.`,
              R`**Group and move the number:** $(x^2 - 3x) + (y^2 - 4\sqrt2\,y) = -\tfrac54$.`,
              R`**Complete the square:** half of $-3$ is $-\tfrac32$ (squared: $\tfrac94$); half of $-4\sqrt2$ is $-2\sqrt2$ (squared: $8$). Add both to each side: $\left(x - \tfrac32\right)^2 + (y - 2\sqrt2)^2 = -\tfrac54 + \tfrac94 + 8 = 9$.`,
              R`**Center** $\left(\tfrac32,\ 2\sqrt2\right)$, **radius** $r = \sqrt9 = 3$.`,
            ],
            answer: R`\begin{array}{l} \left(x - \tfrac32\right)^2 + (y - 2\sqrt2)^2 = 9 \\ \text{Center: } \left(\tfrac32,\ 2\sqrt2\right) \\ \text{Radius: } 3 \end{array}`,
          },
          conic(R`y^2 + x^2 = -6y`, { A: 1, C: 1, E: 6 }, CIRCLE, { center: [0, -3], r2: 9 }),
          conic(R`6x + 15 + 6y = -y^2 - x^2`, { A: 1, C: 1, D: 6, E: 6, F: 15 }, CIRCLE, { center: [-3, -3], r2: 3 }),
          conic(R`-8y = -x^2 - y^2 - 12`, { A: 1, C: 1, E: -8, F: 12 }, CIRCLE, { center: [0, 4], r2: 4 }),
          conic(R`x^2 + y^2 - 6x + 6y + 9 = 0`, { A: 1, C: 1, D: -6, E: 6, F: 9 }, CIRCLE, { center: [3, -3], r2: 9 }),
        ],
      },
    ],
  },
  {
    id: 'hw2', title: 'HW #2', name: 'Parabolas: Graphing', due: '', lesson: 1,
    intro: 'Rewrite each parabola in vertex form; name the vertex, axis of symmetry, and direction it opens. Graph ONLY the odd problems and name their focus and directrix. (The worked steps find the focus and directrix for every problem.)',
    sections: [
      {
        title: 'Rewrite in vertex form. Name the vertex, axis of symmetry, and direction. Odd problems: also the focus and directrix, and graph.', lesson: 1,
        problems: [
          conic(R`y = 5x^2 - 10x + 8`, { A: 5, D: -10, E: -1, F: 8 }, PARA, { vertex: [1, 3], focus: [1, [61, 20]], directrix: { y: [59, 20] }, opens: 'up' }),
          conic(R`y = -3x^2 - 24x - 49`, { A: -3, D: -24, E: -1, F: -49 }, PARA_V, { vertex: [-4, -1], opens: 'down' }),
          conic(R`y = 2x^2 + 8x + 2`, { A: 2, D: 8, E: -1, F: 2 }, PARA, { vertex: [-2, -6], focus: [-2, [-47, 8]], directrix: { y: [-49, 8] }, opens: 'up' }),
          conic(R`2y = x^2 - 8x + 20`, { A: 1, D: -8, E: -2, F: 20 }, PARA_V, { vertex: [4, 2], opens: 'up' }),
          conic(R`y = -x^2 + 10x - 15`, { A: -1, D: 10, E: -1, F: -15 }, PARA, { vertex: [5, 10], focus: [5, [39, 4]], directrix: { y: [41, 4] }, opens: 'down' }),
          conic(R`4y = -x^2 - 2x`, { A: 1, D: 2, E: 4 }, PARA_V, { vertex: [-1, [1, 4]], opens: 'down' }),
          conic(R`y = 2x^2 - 12x + 14`, { A: 2, D: -12, E: -1, F: 14 }, PARA, { vertex: [3, -4], focus: [3, [-31, 8]], directrix: { y: [-33, 8] }, opens: 'up' }),
          conic(R`x = 3y^2 + 6y - 2`, { C: 3, E: 6, D: -1, F: -2 }, PARA_V, { vertex: [-5, -1], opens: 'right' }),
          conic(R`y = \tfrac14(x^2 - 4)`, { A: [1, 4], E: -1, F: -1 }, PARA, { vertex: [0, -1], focus: [0, 0], directrix: { y: -2 }, opens: 'up' }),
          conic(R`y = -\tfrac12x^2 + 4x - 9`, { A: [-1, 2], D: 4, E: -1, F: -9 }, PARA_V, { vertex: [4, -1], opens: 'down' }),
          conic(R`4x = y^2 - 6y + 1`, { C: 1, E: -6, D: -4, F: 1 }, PARA, { vertex: [-2, 3], focus: [-1, 3], directrix: { x: -3 }, opens: 'right' }),
          conic(R`x = -\tfrac14y^2 + 2y`, { C: [-1, 4], E: 2, D: -1 }, PARA_V, { vertex: [4, 4], opens: 'left' }),
          conic(R`x = y^2 - 6y`, { C: 1, E: -6, D: -1 }, PARA, { vertex: [-9, 3], focus: [[-35, 4], 3], directrix: { x: [-37, 4] }, opens: 'right' }),
          conic(R`y = -2x^2 - 2x`, { A: -2, D: -2, E: -1 }, PARA_V, { vertex: [[-1, 2], [1, 2]], opens: 'down' }),
          conic(R`y = \tfrac12x^2 - 3x`, { A: [1, 2], D: -3, E: -1 }, PARA, { vertex: [3, [-9, 2]], focus: [3, -4], directrix: { y: -5 }, opens: 'up' }),
        ],
      },
    ],
  },
  {
    id: 'hw3', title: 'HW #3', name: 'Writing Equations of Circles & Parabolas', due: '', lesson: 2,
    sections: [
      {
        title: 'Identify the center and radius of each. Then sketch the graph.', lesson: 0,
        problems: [
          conicStd(R`(x - 3)^2 + (y - 1)^2 = 4`, circle(3, 1, 4), CIRCLE, { center: [3, 1], r2: 4 }),
          conicStd(R`(x + 3)^2 + y^2 = 8`, circle(-3, 0, 8), CIRCLE, { center: [-3, 0], r2: 8 }),
          conic(R`x^2 + y^2 + 6y - 5 = 0`, { A: 1, C: 1, E: 6, F: -5 }, CIRCLE, { center: [0, -3], r2: 14 }),
          conic(R`x^2 + y^2 + 4x + 8y + 11 = 0`, { A: 1, C: 1, D: 4, E: 8, F: 11 }, CIRCLE, { center: [-2, -4], r2: 9 }),
        ],
      },
      {
        title: 'Use the information provided to write the standard form equation of each circle.', lesson: 2,
        problems: [
          eqn(R`\text{Center: } (-13,\ 9);\ \text{Radius: } 3`, circle(-13, 9, 9), [R`Standard form is $(x - h)^2 + (y - k)^2 = r^2$ with $(h, k) = (-13, 9)$.`, R`$r = 3$, so $r^2 = 9$. Subtracting a negative: $x - (-13) = x + 13$.`], '(x+13)**2 + (y-9)**2 - 9', { center: [-13, 9], r2: 9 }),
          eqn(R`\text{Center: } (14,\ 4);\ \text{Area: } 11\pi`, circle(14, 4, 11), [R`**Area** $= \pi r^2 = 11\pi$, so $r^2 = 11$ (you never need $r$ itself).`, R`Use the center $(14, 4)$ for $h$ and $k$.`], '(x-14)**2 + (y-4)**2 - 11', { center: [14, 4], r2: 11 }),
          eqn(R`\text{Center: } (3,\ -4);\ \text{Circumference: } 20\pi`, circle(3, -4, 100), [R`**Circumference** $= 2\pi r = 20\pi$, so $r = 10$ and $r^2 = 100$.`, R`Use the center $(3, -4)$: $y - (-4) = y + 4$.`], '(x-3)**2 + (y+4)**2 - 100', { center: [3, -4], r2: 100 }),
          eqn(R`\text{Center: } (6,\ 1);\ \text{Point on circle: } (15,\ 1)`, circle(6, 1, 81), [R`The **radius** is the distance from the center to the point: both have $y = 1$, so $r = 15 - 6 = 9$.`, R`$r^2 = 81$.`], '(x-6)**2 + (y-1)**2 - 81', { center: [6, 1], r2: 81, passes: [[15, 1]] }),
          eqn(R`\text{Center: } (14,\ 11);\ \text{Tangent to } x = 15`, circle(14, 11, 1), [R`**Tangent** means the circle just touches the line $x = 15$. The radius is the distance from the center to that line: $r = 15 - 14 = 1$.`, R`$r^2 = 1$.`], '(x-14)**2 + (y-11)**2 - 1', { center: [14, 11], r2: 1, passes: [[15, 11]] }),
          eqn(R`\text{Center in quadrant II; tangent to } y = 5,\ y = 11, \text{ and } x = -2`, circle(-5, 8, 9), [
            R`The circle touches **both** $y = 5$ and $y = 11$, so they are opposite ends of a diameter: $d = 11 - 5 = 6$, $r = 3$, and the center is halfway: $y = 8$.`,
            R`It also touches $x = -2$, so the center is $3$ units from that line: $x = -5$ or $x = 1$. Quadrant II needs $x < 0$, so the center is $(-5, 8)$.`,
          ], '(x+5)**2 + (y-8)**2 - 9', { center: [-5, 8], r2: 9, passes: [[-5, 5], [-5, 11], [-2, 8]] }),
          eqn(R`\text{Ends of a diameter: } (7,\ -3) \text{ and } (3,\ 17)`, circle(5, 7, 104), [
            R`The **center** is the midpoint: $\left(\tfrac{7 + 3}{2},\ \tfrac{-3 + 17}{2}\right) = (5, 7)$.`,
            R`$r^2$ is the squared distance from the center to an end: $(7 - 5)^2 + (-3 - 7)^2 = 4 + 100 = 104$.`,
          ], '(x-5)**2 + (y-7)**2 - 104', { center: [5, 7], r2: 104, passes: [[7, -3], [3, 17]] }),
          eqn(R`\text{Three points: } (-11,\ 3),\ (-5,\ 3),\ (-13,\ 11)`, circle(-8, 8, 34), [
            R`$(-11, 3)$ and $(-5, 3)$ are at the same height, so the center is halfway between them: $x = -8$. Call the center $(-8, k)$.`,
            R`The center is the same distance from $(-11, 3)$ and $(-13, 11)$: $3^2 + (k - 3)^2 = 5^2 + (k - 11)^2$.`,
            R`Expand: $9 + k^2 - 6k + 9 = 25 + k^2 - 22k + 121$, so $16k = 128$ and $k = 8$.`,
            R`$r^2 = 3^2 + (8 - 3)^2 = 9 + 25 = 34$.`,
          ], '(x+8)**2 + (y-8)**2 - 34', { center: [-8, 8], r2: 34, passes: [[-11, 3], [-5, 3], [-13, 11]] }),
        ],
      },
      {
        title: 'Identify the vertex, focus, axis of symmetry, directrix, direction of opening, and intercepts on the axis parallel to the axis of symmetry of each. Then sketch the graph.', lesson: 1,
        problems: [
          conic(R`y = -x^2 + 4x - 8`, { A: -1, D: 4, E: -1, F: -8 }, PARA_INT, { vertex: [2, -4], focus: [2, [-17, 4]], directrix: { y: [-15, 4] }, opens: 'down', intercept: -8 }),
          conic(R`x = y^2 - 6y + 7`, { C: 1, E: -6, D: -1, F: 7 }, PARA_INT, { vertex: [-2, 3], focus: [[-7, 4], 3], directrix: { x: [-9, 4] }, opens: 'right', intercept: 7 }),
          conicStd(R`x = -4(y + 4)^2 - 4`, para(false, -4, -4, -4), PARA_INT, { vertex: [-4, -4], focus: [[-65, 16], -4], directrix: { x: [-63, 16] }, opens: 'left', intercept: -68 }),
          conicStd(R`y = (x + 4)^2 - 6`, para(true, 1, -4, -6), PARA_INT, { vertex: [-4, -6], focus: [-4, [-23, 4]], directrix: { y: [-25, 4] }, opens: 'up', intercept: 10 }),
          conic(R`-x^2 - 12x + y - 37 = 0`, { A: -1, D: -12, E: 1, F: -37 }, PARA_INT, { vertex: [-6, 1], focus: [-6, [5, 4]], directrix: { y: [3, 4] }, opens: 'up', intercept: 37 }),
          conic(R`3y^2 + x + 3 = 0`, { C: 3, D: 1, F: 3 }, PARA_INT, { vertex: [-3, 0], focus: [[-37, 12], 0], directrix: { x: [-35, 12] }, opens: 'left', intercept: -3 }),
        ],
      },
      {
        title: 'Use the information provided to write the vertex form equation of each parabola.', lesson: 2,
        problems: [
          eqn(R`\text{Vertex: } (-8,\ 8),\ \text{Focus: } \left(-\tfrac{65}{8},\ 8\right)`, para(false, -2, -8, 8), [
            R`Vertex and focus share $y = 8$, so the axis is horizontal: $x = a(y - k)^2 + h$.`,
            R`$p$ = vertex to focus $= -\tfrac{65}{8} - (-8) = -\tfrac18$ (negative: it opens **left**).`,
            R`$a = \dfrac{1}{4p} = \dfrac{1}{4(-\frac18)} = -2$.`,
          ], 'x - (-2*(y-8)**2 - 8)', { vertex: [-8, 8], focus: [[-65, 8], 8] }),
          eqn(R`\text{Vertex: } (4,\ -4),\ \text{Focus: } \left(4,\ -\tfrac{33}{8}\right)`, para(true, -2, 4, -4), [
            R`Vertex and focus share $x = 4$, so the axis is vertical: $y = a(x - h)^2 + k$.`,
            R`$p = -\tfrac{33}{8} - (-4) = -\tfrac18$ (it opens **down**), so $a = \dfrac{1}{4p} = -2$.`,
          ], 'y - (-2*(x-4)**2 - 4)', { vertex: [4, -4], focus: [4, [-33, 8]] }),
          eqn(R`\text{Vertex: } (9,\ -1),\ \text{Directrix: } y = -\tfrac12`, para(true, [-1, 2], 9, -1), [
            R`A horizontal directrix ($y = \ldots$) means a vertical axis: $y = a(x - h)^2 + k$.`,
            R`The directrix is $p$ the **other** way from the vertex: $k - p = -\tfrac12$, so $p = -1 + \tfrac12 = -\tfrac12$ (directrix above, so it opens **down**).`,
            R`$a = \dfrac{1}{4p} = \dfrac{1}{-2} = -\tfrac12$.`,
          ], 'y - (-(x-9)**2/2 - 1)', { vertex: [9, -1], directrix: { y: [-1, 2] } }),
          eqn(R`\text{Vertex: } (4,\ -2),\ \text{Directrix: } x = 5`, para(false, [-1, 4], 4, -2), [
            R`A vertical directrix ($x = \ldots$) means a horizontal axis: $x = a(y - k)^2 + h$.`,
            R`$h - p = 5$, so $p = 4 - 5 = -1$ (directrix on the right, so it opens **left**). $a = \dfrac{1}{4p} = -\tfrac14$.`,
          ], 'x - (-(y+2)**2/4 + 4)', { vertex: [4, -2], directrix: { x: 5 } }),
          eqn(R`\text{Opens left or right; Vertex: } (-2,\ 5);\ \text{Passes through: } (13,\ 6)`, para(false, 15, -2, 5), [
            R`Opens left or right: $x = a(y - 5)^2 - 2$.`,
            R`Plug in the point $(13, 6)$: $13 = a(6 - 5)^2 - 2$, so $15 = a$.`,
          ], 'x - (15*(y-5)**2 - 2)', { vertex: [-2, 5], passes: [[13, 6]] }),
          eqn(R`\text{Focus: } \left(-3,\ -\tfrac54\right),\ \text{Directrix: } y = -\tfrac34`, para(true, -1, -3, -1), [
            R`The **vertex** is halfway between the focus and the directrix: $x = -3$, $y = \dfrac{-\frac54 + (-\frac34)}{2} = -1$. Vertex $(-3, -1)$.`,
            R`$p$ = vertex to focus $= -\tfrac54 - (-1) = -\tfrac14$, so $a = \dfrac{1}{4p} = -1$ (opens **down**).`,
          ], 'y - (-(x+3)**2 - 1)', { vertex: [-3, -1], focus: [-3, [-5, 4]], directrix: { y: [-3, 4] } }),
          eqn(R`\text{Focus: } \left(-\tfrac{225}{32},\ -7\right),\ \text{Directrix: } x = -\tfrac{223}{32}`, para(false, -8, -7, -7), [
            R`Vertical directrix, so the axis is horizontal. **Vertex** halfway: $x = \dfrac{-\frac{225}{32} - \frac{223}{32}}{2} = -\tfrac{448}{64} = -7$, so the vertex is $(-7, -7)$.`,
            R`$p = -\tfrac{225}{32} - (-7) = -\tfrac{1}{32}$, so $a = \dfrac{1}{4p} = -8$ (opens **left**).`,
          ], 'x - (-8*(y+7)**2 - 7)', { vertex: [-7, -7], focus: [[-225, 32], -7], directrix: { x: [-223, 32] } }),
        ],
      },
    ],
  },
  {
    id: 'hw4', title: 'HW #4', name: 'Ellipses: Graphing', due: '', lesson: 3,
    sections: [
      {
        title: 'Write each equation in standard form if not already. Identify the center, foci, and vertices of the ellipse and sketch its graph. (The worksheet skips #8.)', lesson: 3,
        problems: [
          conicStd(R`\dfrac{(x - 1)^2}{9} + \dfrac{(y - 5)^2}{25} = 1`, ell(1, 5, 9, 25), ELL, { center: [1, 5], vertices: [[1, 10], [1, 0]], coVertices: [[4, 5], [-2, 5]], foci: [[1, 9], [1, 1]] }),
          conicStd(R`\dfrac{(x - 6)^2}{4} + \dfrac{(y + 7)^2}{16} = 1`, ell(6, -7, 4, 16), ELL, { center: [6, -7], vertices: [[6, -3], [6, -11]], coVertices: [[8, -7], [4, -7]], foci: [[6, -7 + 2 * S3], [6, -7 - 2 * S3]] }),
          conicStd(R`(x + 2)^2 + \dfrac{(y + 4)^2}{\frac14} = 1`, ell(-2, -4, 1, [1, 4]), ELL, { center: [-2, -4], vertices: [[-1, -4], [-3, -4]], coVertices: [[-2, -3.5], [-2, -4.5]], foci: [[-2 + S3 / 2, -4], [-2 - S3 / 2, -4]] }, { lead: [R`$(x + 2)^2$ is the same as $\dfrac{(x + 2)^2}{1}$, so it is already in **standard form**.`] }),
          conicStd(R`\dfrac{(x - 3)^2}{\frac{25}{9}} + (y - 8)^2 = 1`, ell(3, 8, [25, 9], 1), ELL, { center: [3, 8], vertices: [[14 / 3, 8], [4 / 3, 8]], coVertices: [[3, 9], [3, 7]], foci: [[13 / 3, 8], [5 / 3, 8]] }),
          conic(R`9x^2 + 4y^2 + 36x - 24y + 36 = 0`, { A: 9, C: 4, D: 36, E: -24, F: 36 }, ELL, { center: [-2, 3], vertices: [[-2, 6], [-2, 0]], coVertices: [[0, 3], [-4, 3]], foci: [[-2, 3 + S5], [-2, 3 - S5]] }),
          conic(R`9x^2 + 4y^2 - 36x + 8y + 31 = 0`, { A: 9, C: 4, D: -36, E: 8, F: 31 }, ELL, { center: [2, -1], vertices: [[2, 0.5], [2, -2.5]], coVertices: [[3, -1], [1, -1]], foci: [[2, -1 + S5 / 2], [2, -1 - S5 / 2]] }),
          conic(R`16x^2 + 25y^2 - 32x + 50y + 16 = 0`, { A: 16, C: 25, D: -32, E: 50, F: 16 }, ELL, { center: [1, -1], vertices: [[2.25, -1], [-0.25, -1]], coVertices: [[1, 0], [1, -2]], foci: [[1.75, -1], [0.25, -1]] }),
          conic(R`4x^2 + y^2 - 8x + 4y - 8 = 0`, { A: 4, C: 1, D: -8, E: 4, F: -8 }, ELL, { center: [1, -2], vertices: [[1, 2], [1, -6]], coVertices: [[3, -2], [-1, -2]], foci: [[1, -2 + 2 * S3], [1, -2 - 2 * S3]] }, { no: 9 }),
          conicStd(R`\dfrac{(x - 5)^2}{25} + \dfrac{(y - 4)^2}{16} = 1`, ell(5, 4, 25, 16), ELL, { center: [5, 4], vertices: [[10, 4], [0, 4]], coVertices: [[5, 8], [5, 0]], foci: [[8, 4], [2, 4]] }, { no: 10 }),
        ],
      },
    ],
  },
  {
    id: 'hw5', title: 'HW #5', name: 'Ellipses: Writing Equations', due: '', lesson: 4,
    sections: [
      {
        title: 'Find an equation for the ellipse.', lesson: 4,
        problems: [
          eqn(R`\text{Vertices } (-1,\ 7),\ (-1,\ 1);\ \text{Co-vertices } (-3,\ 4),\ (1,\ 4)`, ell(-1, 4, 4, 9), [
            R`**Center** = midpoint of the vertices: $(-1, 4)$. The vertices are above and below it, so the major axis is **vertical** ($a^2$ goes under $y$).`,
            R`$a$ = center to vertex $= 7 - 4 = 3$, so $a^2 = 9$. $b$ = center to co-vertex $= 1 - (-1) = 2$, so $b^2 = 4$.`,
          ], '(x+1)**2/4 + (y-4)**2/9 - 1', { center: [-1, 4], vertices: [[-1, 7], [-1, 1]], coVertices: [[-3, 4], [1, 4]] }),
          eqn(R`\text{Vertices } (0,\ 2),\ (4,\ 2);\ \text{Minor axis of length } 2`, ell(2, 2, 4, 1), [
            R`**Center** $(2, 2)$; the vertices are left and right of it, so the major axis is **horizontal**. $a = 2$, $a^2 = 4$.`,
            R`Minor axis length $2b = 2$, so $b = 1$ and $b^2 = 1$.`,
          ], '(x-2)**2/4 + (y-2)**2 - 1', { center: [2, 2], vertices: [[0, 2], [4, 2]], minorLength: 2 }),
          eqn(R`\text{Foci } (0,\ 0),\ (4,\ 0);\ \text{Major axis of length } 8`, ell(2, 0, 16, 12), [
            R`**Center** = midpoint of the foci: $(2, 0)$. Horizontal major axis. $c = 2$.`,
            R`Major axis $2a = 8$, so $a = 4$, $a^2 = 16$. Then $b^2 = a^2 - c^2 = 16 - 4 = 12$.`,
          ], '(x-2)**2/16 + y**2/12 - 1', { center: [2, 0], foci: [[0, 0], [4, 0]], majorLength: 8 }),
          eqn(R`\text{Foci } (0,\ 0),\ (0,\ 8);\ \text{Major axis of length } 16`, ell(0, 4, 48, 64), [
            R`**Center** $(0, 4)$; the foci are stacked vertically, so the major axis is **vertical**. $c = 4$.`,
            R`$2a = 16$, so $a = 8$, $a^2 = 64$. $b^2 = 64 - 16 = 48$.`,
          ], 'x**2/48 + (y-4)**2/64 - 1', { center: [0, 4], foci: [[0, 0], [0, 8]], majorLength: 16 }),
          eqn(R`\text{Center } (2,\ -1);\ \text{Vertex } \left(2,\ \tfrac12\right);\ \text{Minor axis of length } 2`, ell(2, -1, 1, [9, 4]), [
            R`The vertex is straight above the center, so the major axis is **vertical**. $a = \tfrac12 - (-1) = \tfrac32$, so $a^2 = \tfrac94$.`,
            R`$2b = 2$, so $b = 1$ and $b^2 = 1$.`,
          ], '(x-2)**2 + (y+1)**2/(9/4) - 1', { center: [2, -1], vertices: [[2, 0.5], [2, -2.5]], minorLength: 2 }),
          eqn(R`\text{Vertices } (3,\ 1),\ (3,\ 9);\ \text{Minor axis of length } 6`, ell(3, 5, 9, 16), [
            R`**Center** $(3, 5)$, **vertical** major axis, $a = 4$, $a^2 = 16$.`,
            R`$2b = 6$, so $b = 3$ and $b^2 = 9$.`,
          ], '(x-3)**2/9 + (y-5)**2/16 - 1', { center: [3, 5], vertices: [[3, 1], [3, 9]], minorLength: 6 }),
          eqn(R`\text{Center } (3,\ 2);\ a = 3c;\ \text{Foci } (1,\ 2),\ (5,\ 2)`, ell(3, 2, 36, 32), [
            R`The foci are left and right of the center, so the major axis is **horizontal**. $c = 5 - 3 = 2$.`,
            R`$a = 3c = 6$, so $a^2 = 36$. $b^2 = a^2 - c^2 = 36 - 4 = 32$.`,
          ], '(x-3)**2/36 + (y-2)**2/32 - 1', { center: [3, 2], foci: [[1, 2], [5, 2]] }),
          eqn(R`\text{Center } (0,\ 4);\ a = 2c;\ \text{Vertices } (-4,\ 4),\ (4,\ 4)`, ell(0, 4, 16, 12), [
            R`**Horizontal** major axis with $a = 4$, $a^2 = 16$.`,
            R`$a = 2c$, so $c = 2$. $b^2 = a^2 - c^2 = 16 - 4 = 12$.`,
          ], 'x**2/16 + (y-4)**2/12 - 1', { center: [0, 4], vertices: [[-4, 4], [4, 4]] }),
          eqn(R`\text{Vertices } (5,\ 0),\ (5,\ 12);\ \text{Endpoints of the minor axis } (0,\ 6),\ (10,\ 6)`, ell(5, 6, 25, 36), [
            R`**Center** $(5, 6)$, **vertical** major axis, $a = 6$, $a^2 = 36$.`,
            R`The minor axis endpoints are the co-vertices: $b = 10 - 5 = 5$, $b^2 = 25$.`,
          ], '(x-5)**2/25 + (y-6)**2/36 - 1', { center: [5, 6], vertices: [[5, 0], [5, 12]], coVertices: [[0, 6], [10, 6]] }),
          eqn(R`\text{Vertices } (2,\ 0),\ (2,\ 4);\ \text{Foci } (2,\ 1),\ (2,\ 3)`, ell(2, 2, 3, 4), [
            R`**Center** $(2, 2)$, **vertical**. $a = 2$, $c = 1$.`,
            R`$b^2 = a^2 - c^2 = 4 - 1 = 3$.`,
          ], '(x-2)**2/3 + (y-2)**2/4 - 1', { center: [2, 2], vertices: [[2, 0], [2, 4]], foci: [[2, 1], [2, 3]] }),
        ],
      },
    ],
  },
  {
    id: 'hw6', title: 'HW #6', name: 'Hyperbolas: Graphing', due: '', lesson: 5,
    sections: [
      {
        title: 'Write each equation in standard form if not already. Identify the center, foci, vertices, and asymptotes of the hyperbola, then sketch the asymptotes dotted as an aid to obtain the graph.', lesson: 5,
        problems: [
          conicStd(R`\dfrac{x^2}{16} - \dfrac{y^2}{16} = 1`, hyp(0, 0, 16, 16), HYP, { center: [0, 0], vertices: [[4, 0], [-4, 0]], foci: [[4 * S2, 0], [-4 * S2, 0]], asym: [[1, 0], [-1, 0]] }),
          conic(R`-36 = -4x^2 + 9y^2`, { A: 4, C: -9, F: -36 }, HYP, { center: [0, 0], vertices: [[3, 0], [-3, 0]], foci: [[Math.sqrt(13), 0], [-Math.sqrt(13), 0]], asym: [[2 / 3, 0], [-2 / 3, 0]] }),
          conicStd(R`\dfrac{(x - 2)^2}{9} - \dfrac{(y - 1)^2}{16} = 1`, hyp(2, 1, 9, 16), HYP, { center: [2, 1], vertices: [[5, 1], [-1, 1]], foci: [[7, 1], [-3, 1]], asym: [[4 / 3, -5 / 3], [-4 / 3, 11 / 3]] }),
          conic(R`-137 + 16y^2 - 9x^2 - 18x = -32y`, { A: -9, C: 16, D: -18, E: 32, F: -137 }, HYP, { center: [-1, -1], vertices: [[-1, 2], [-1, -4]], foci: [[-1, 4], [-1, -6]], asym: [[3 / 4, -1 / 4], [-3 / 4, -7 / 4]] }),
          conic(R`-x^2 - 1 = -y^2 + 4y - 2x`, { A: -1, C: 1, D: 2, E: -4, F: -1 }, HYP, { center: [1, 2], vertices: [[1, 4], [1, 0]], foci: [[1, 2 + 2 * S2], [1, 2 - 2 * S2]], asym: [[1, 1], [-1, 3]] }),
          conic(R`-24x = y^2 - 19 + 2y - 4x^2`, { A: 4, C: -1, D: -24, E: -2, F: 19 }, HYP, { center: [3, -1], vertices: [[5, -1], [1, -1]], foci: [[3 + 2 * S5, -1], [3 - 2 * S5, -1]], asym: [[2, -7], [-2, 5]] }),
          conic(R`-8y - 16 - x^2 = -4y^2`, { A: -1, C: 4, E: -8, F: -16 }, HYP, { center: [0, 1], vertices: [[0, 1 + S5], [0, 1 - S5]], foci: [[0, 6], [0, -4]], asym: [[0.5, 1], [-0.5, 1]] }),
          conic(R`-16x^2 + 25y^2 + 50y - 375 = 0`, { A: -16, C: 25, E: 50, F: -375 }, HYP, { center: [0, -1], vertices: [[0, 3], [0, -5]], foci: [[0, -1 + Math.sqrt(41)], [0, -1 - Math.sqrt(41)]], asym: [[0.8, -1], [-0.8, -1]] }),
        ],
      },
    ],
  },
  {
    id: 'hw7', title: 'HW #7', name: 'Hyperbolas: Writing Equations', due: '', lesson: 6,
    sections: [
      {
        title: 'Find an equation for the hyperbola.', lesson: 6,
        problems: [
          eqn(R`\text{Vertices } (2,\ 0),\ (6,\ 0);\ \text{Foci } (0,\ 0),\ (8,\ 0)`, hyp(4, 0, 4, 12), [
            R`**Center** = midpoint $(4, 0)$. Vertices left and right, so the transverse axis is **horizontal** ($x$ term first).`,
            R`$a = 2$, $c = 4$. For a hyperbola $c^2 = a^2 + b^2$, so $b^2 = 16 - 4 = 12$.`,
          ], '(x-4)**2/4 - y**2/12 - 1', { center: [4, 0], vertices: [[2, 0], [6, 0]], foci: [[0, 0], [8, 0]] }),
          eqn(R`\text{Vertices } (-5,\ 5),\ (5,\ 5);\ \text{Foci } (-7,\ 5),\ (7,\ 5)`, hyp(0, 5, 25, 24), [
            R`**Center** $(0, 5)$, **horizontal**. $a = 5$, $c = 7$.`,
            R`$b^2 = c^2 - a^2 = 49 - 25 = 24$.`,
          ], 'x**2/25 - (y-5)**2/24 - 1', { center: [0, 5], vertices: [[-5, 5], [5, 5]], foci: [[-7, 5], [7, 5]] }),
          eqn(R`\text{Vertices } (2,\ 3),\ (2,\ -3);\ \text{Foci } (2,\ 5),\ (2,\ -5)`, hyp(2, 0, 16, 9, true), [
            R`**Center** $(2, 0)$; vertices above and below, so the transverse axis is **vertical** ($y$ term first).`,
            R`$a = 3$, $c = 5$, so $b^2 = 25 - 9 = 16$.`,
          ], 'y**2/9 - (x-2)**2/16 - 1', { center: [2, 0], vertices: [[2, 3], [2, -3]], foci: [[2, 5], [2, -5]] }),
          eqn(R`\text{Vertices } (4,\ 1),\ (4,\ 9);\ \text{Foci } (4,\ 0),\ (4,\ 10)`, hyp(4, 5, 9, 16, true), [
            R`**Center** $(4, 5)$, **vertical**. $a = 4$, $c = 5$.`,
            R`$b^2 = 25 - 16 = 9$.`,
          ], '(y-5)**2/16 - (x-4)**2/9 - 1', { center: [4, 5], vertices: [[4, 1], [4, 9]], foci: [[4, 0], [4, 10]] }),
          eqn(R`\text{Vertices } (2,\ 3),\ (2,\ -3);\ \text{Passes through } (0,\ 5)`, hyp(2, 0, [9, 4], 9, true), [
            R`**Center** $(2, 0)$, **vertical**, $a = 3$: $\dfrac{y^2}{9} - \dfrac{(x - 2)^2}{b^2} = 1$.`,
            R`Plug in $(0, 5)$: $\dfrac{25}{9} - \dfrac{4}{b^2} = 1$, so $\dfrac{4}{b^2} = \dfrac{16}{9}$ and $b^2 = \dfrac{36}{16} = \dfrac94$.`,
          ], 'y**2/9 - (x-2)**2/(9/4) - 1', { center: [2, 0], vertices: [[2, 3], [2, -3]], passes: [[0, 5]] }),
          eqn(R`\text{Vertices } (-2,\ 1),\ (2,\ 1);\ \text{Passes through } (4,\ 3)`, hyp(0, 1, 4, [4, 3]), [
            R`**Center** $(0, 1)$, **horizontal**, $a = 2$: $\dfrac{x^2}{4} - \dfrac{(y - 1)^2}{b^2} = 1$.`,
            R`Plug in $(4, 3)$: $\dfrac{16}{4} - \dfrac{4}{b^2} = 1$, so $\dfrac{4}{b^2} = 3$ and $b^2 = \dfrac43$.`,
          ], 'x**2/4 - (y-1)**2/(4/3) - 1', { center: [0, 1], vertices: [[-2, 1], [2, 1]], passes: [[4, 3]] }),
          eqn(R`\text{Vertices } (0,\ 2),\ (6,\ 2);\ \text{Asymptotes } y = \tfrac23x \text{ and } y = 4 - \tfrac23x`, hyp(3, 2, 9, 4), [
            R`**Center** $(3, 2)$, **horizontal**, $a = 3$.`,
            R`For a horizontal hyperbola the asymptote slope is $\pm\tfrac{b}{a}$: $\tfrac{b}{3} = \tfrac23$, so $b = 2$ and $b^2 = 4$.`,
          ], '(x-3)**2/9 - (y-2)**2/4 - 1', { center: [3, 2], vertices: [[0, 2], [6, 2]], slope: 2 / 3 }),
          eqn(R`\text{Foci } (3,\ \pm 2);\ \text{Asymptotes } y = \pm 2(x - 3)`, hyp(3, 0, [4, 5], [16, 5], true), [
            R`**Center** $(3, 0)$ (midpoint of the foci), **vertical**, $c = 2$.`,
            R`Vertical slope is $\pm\tfrac{a}{b} = \pm 2$, so $a = 2b$.`,
            R`$c^2 = a^2 + b^2$: $4 = 4b^2 + b^2 = 5b^2$, so $b^2 = \tfrac45$ and $a^2 = \tfrac{16}{5}$.`,
          ], 'y**2/(16/5) - (x-3)**2/(4/5) - 1', { center: [3, 0], foci: [[3, 2], [3, -2]], slope: 2 }),
        ],
      },
    ],
  },
  {
    id: 'hw8', title: 'HW #8', name: 'Conics Review', due: '', lesson: 7,
    intro: 'The unit review (Chapter 10 Review: Conics). Each section restarts its numbering, like the worksheet, and links to the lesson that teaches it.',
    sections: [
      {
        title: 'Circles: write the equation in standard form; state the center and radius.', lesson: 0,
        problems: [
          conic(R`x^2 + y^2 + 4y = 12`, { A: 1, C: 1, E: 4, F: -12 }, CIRCLE, { center: [0, -2], r2: 16 }, { no: 1 }),
          conic(R`x^2 + y^2 - 12x - 2y - 8 = 0`, { A: 1, C: 1, D: -12, E: -2, F: -8 }, CIRCLE, { center: [6, 1], r2: 45 }, { no: 2 }),
          conic(R`4x^2 + 4y^2 - 24x - 40y - 8 = 0`, { A: 4, C: 4, D: -24, E: -40, F: -8 }, CIRCLE, { center: [3, 5], r2: 36 }, { no: 3 }),
        ],
      },
      {
        title: 'Circles: translations, tangent lines, and word problems.', lesson: 2,
        problems: [
          eqn(R`(x - 1)^2 + (y + 4)^2 = 16 \text{ translated 3 left and 2 down}`, circle(-2, -6, 16), [R`The center $(1, -4)$ moves 3 left and 2 down: $(1 - 3,\ -4 - 2) = (-2, -6)$.`, R`Translating doesn't change the radius: $r^2 = 16$.`], '(x+2)**2 + (y+6)**2 - 16', { center: [-2, -6], r2: 16 }, { no: 4 }),
          eqn(R`x^2 + y^2 - 8x - 4y + 9 = 0 \text{ translated 4 right and 6 up}`, circle(8, 8, 11), [
            R`First complete the square: $(x^2 - 8x + 16) + (y^2 - 4y + 4) = -9 + 16 + 4$, so $(x - 4)^2 + (y - 2)^2 = 11$.`,
            R`Move the center $(4, 2)$ 4 right and 6 up: $(8, 8)$. The radius stays the same: $r^2 = 11$.`,
          ], '(x-8)**2 + (y-8)**2 - 11', { center: [8, 8], r2: 11 }, { no: 5 }),
          {
            type: 'steps', no: 6, prompt: R`\text{Circle O: center } (3,\ 5) \text{ through } P(-4,\ 7). \text{ Find the tangent line at } P.`,
            check: { value: '(7/2)*(-4) + 21 - 7 + ((7-5)/(-4-3))*(7/2) + 1', result: '0' },
            steps: [
              R`A tangent line is **perpendicular to the radius** at the point of tangency.`,
              R`Slope of the radius from $(3, 5)$ to $(-4, 7)$: $\dfrac{7 - 5}{-4 - 3} = -\dfrac27$.`,
              R`Perpendicular slope (opposite reciprocal): $\dfrac72$.`,
              R`Point-slope through $P$: $y - 7 = \tfrac72(x + 4)$, so $y = \tfrac72x + 14 + 7 = \tfrac72x + 21$.`,
            ],
            answer: R`y = \tfrac72x + 21`,
          },
          {
            type: 'steps', no: 7, prompt: R`\text{A van is 40 mi east and 30 mi north of a tower that reaches 70 mi. Jessica is 30 mi east of the van. Can she receive the program?}`,
            steps: [
              R`Put the tower at the origin. The van is at $(40, 30)$, so Jessica is at $(70, 30)$.`,
              R`The tower reaches everything **inside** the circle $x^2 + y^2 = 70^2 = 4900$.`,
              R`Jessica: $70^2 + 30^2 = 4900 + 900 = 5800 > 4900$, so she is outside the circle (about $76$ miles away).`,
            ],
            answer: R`\text{No}`,
          },
          eqn(R`\text{Circle centered at the origin through } (\pm4,\ 0) \text{ and } (0,\ \pm4)`, circle(0, 0, 16), [R`Center $(0, 0)$; the circle crosses the axes 4 units out, so $r = 4$ and $r^2 = 16$.`], 'x**2 + y**2 - 16', { center: [0, 0], r2: 16, passes: [[4, 0], [0, -4]] }, { no: 8 }),
          eqn(R`\text{Small circle centered at the origin through } (\pm1,\ 0)`, circle(0, 0, 1), [R`Center $(0, 0)$ and radius $1$, so $r^2 = 1$.`], 'x**2 + y**2 - 1', { center: [0, 0], r2: 1, passes: [[1, 0]] }, { no: 9 }),
          eqn(R`\text{Circle centered at } (-5,\ -3) \text{ with radius } 2 \text{ (from the graph)}`, circle(-5, -3, 4), [R`Read the center from the graph: $(-5, -3)$. It reaches 2 units in every direction, so $r = 2$ and $r^2 = 4$.`], '(x+5)**2 + (y+3)**2 - 4', { center: [-5, -3], r2: 4 }, { no: 10 }),
        ],
      },
      {
        title: 'Ellipses: find the vertices, co-vertices, and foci.', lesson: 3,
        problems: [
          conicStd(R`\dfrac{x^2}{25} + \dfrac{y^2}{9} = 1`, ell(0, 0, 25, 9), ELL, { center: [0, 0], vertices: [[5, 0], [-5, 0]], coVertices: [[0, 3], [0, -3]], foci: [[4, 0], [-4, 0]] }, { no: 1 }),
          conicStd(R`\dfrac{x^2}{1} + \dfrac{y^2}{64} = 1`, ell(0, 0, 1, 64), ELL, { center: [0, 0], vertices: [[0, 8], [0, -8]], coVertices: [[1, 0], [-1, 0]], foci: [[0, Math.sqrt(63)], [0, -Math.sqrt(63)]] }, { no: 2, after: [R`The answer key writes $\pm\sqrt{63}$; simplified, $\sqrt{63} = 3\sqrt7$.`] }),
          conicStd(R`\dfrac{x^2}{5} + \dfrac{y^2}{2} = 1`, ell(0, 0, 5, 2), ELL, { center: [0, 0], vertices: [[S5, 0], [-S5, 0]], coVertices: [[0, S2], [0, -S2]], foci: [[S3, 0], [-S3, 0]] }, { no: 3 }),
          conic(R`3x^2 + 12y^2 = 12`, { A: 3, C: 12, F: -12 }, ELL, { center: [0, 0], vertices: [[2, 0], [-2, 0]], coVertices: [[0, 1], [0, -1]], foci: [[S3, 0], [-S3, 0]] }, { no: 4 }),
          conic(R`5x^2 + 20y^2 = 80`, { A: 5, C: 20, F: -80 }, ELL, { center: [0, 0], vertices: [[4, 0], [-4, 0]], coVertices: [[0, 2], [0, -2]], foci: [[2 * S3, 0], [-2 * S3, 0]] }, { no: 5 }),
          conic(R`\dfrac{x^2}{3} + \dfrac{y^2}{12} = 3`, { A: 4, C: 1, F: -36 }, ELL, { center: [0, 0], vertices: [[0, 6], [0, -6]], coVertices: [[3, 0], [-3, 0]], foci: [[0, 3 * S3], [0, -3 * S3]] }, { no: 6, lead: [R`**Clear the fractions:** multiply every term by $12$: $4x^2 + y^2 = 36$.`] }),
        ],
      },
      {
        title: 'Ellipses: write the equation in standard form with the given characteristics (10–11: name the foci too).', lesson: 4,
        problems: [
          eqn(R`\text{Foci } (5,\ 0),\ (-5,\ 0);\ \text{Vertices } (9,\ 0),\ (-9,\ 0)`, ell(0, 0, 81, 56), [R`Center $(0, 0)$, horizontal. $a = 9$, $c = 5$.`, R`$b^2 = a^2 - c^2 = 81 - 25 = 56$.`], 'x**2/81 + y**2/56 - 1', { center: [0, 0], vertices: [[9, 0], [-9, 0]], foci: [[5, 0], [-5, 0]] }, { no: 7 }),
          eqn(R`\text{Foci } (0,\ 3),\ (0,\ -3);\ \text{Co-vertices } (1,\ 0),\ (-1,\ 0)`, ell(0, 0, 1, 10), [R`Center $(0, 0)$; foci on the $y$-axis, so it is **vertical**. $c = 3$, $b = 1$.`, R`For an ellipse $a^2 = b^2 + c^2 = 1 + 9 = 10$.`], 'x**2/1 + y**2/10 - 1', { center: [0, 0], foci: [[0, 3], [0, -3]], coVertices: [[1, 0], [-1, 0]] }, { no: 8 }),
          eqn(R`\text{Foci } (\pm 6,\ 0);\ \text{Point } (6,\ 5) \text{ on the ellipse}`, ell(0, 0, 81, 45), [
            R`Use the definition: the **sum** of the distances from any point to the foci is $2a$.`,
            R`From $(6, 5)$ to $(6, 0)$: $5$. From $(6, 5)$ to $(-6, 0)$: $\sqrt{12^2 + 5^2} = 13$. So $2a = 18$, $a = 9$, $a^2 = 81$.`,
            R`$b^2 = a^2 - c^2 = 81 - 36 = 45$.`,
          ], 'x**2/81 + y**2/45 - 1', { center: [0, 0], foci: [[6, 0], [-6, 0]], passes: [[6, 5]] }, { no: 9 }),
          eqn(R`\text{Ellipse from the graph: vertices } (\pm 6,\ 0),\ \text{co-vertices } (0,\ \pm 5)`, ell(0, 0, 36, 25), [R`Center $(0, 0)$, horizontal: $a = 6$, $b = 5$.`, R`**Foci:** $c^2 = 36 - 25 = 11$, so $c = \sqrt{11}$: $(\pm\sqrt{11}, 0)$.`], 'x**2/36 + y**2/25 - 1', { center: [0, 0], vertices: [[6, 0], [-6, 0]], coVertices: [[0, 5], [0, -5]] }, { no: 10, ask: ['foci'] }),
          eqn(R`\text{Ellipse from the graph: vertices } (0,\ \pm 4),\ \text{co-vertices } (\pm 3,\ 0)`, ell(0, 0, 9, 16), [R`Center $(0, 0)$, vertical: $a = 4$, $b = 3$.`, R`**Foci:** $c^2 = 16 - 9 = 7$: $(0, \pm\sqrt7)$.`], 'x**2/9 + y**2/16 - 1', { center: [0, 0], vertices: [[0, 4], [0, -4]], coVertices: [[3, 0], [-3, 0]] }, { no: 11, ask: ['foci'] }),
          eqn(R`\text{Ellipse from the graph: center } (0,\ 0),\ \text{vertex } (8,\ 0),\ \text{focus } (5,\ 0)`, ell(0, 0, 64, 39), [R`Horizontal: $a = 8$, $c = 5$.`, R`$b^2 = 64 - 25 = 39$.`], 'x**2/64 + y**2/39 - 1', { center: [0, 0], vertices: [[8, 0], [-8, 0]], foci: [[5, 0], [-5, 0]] }, { no: 12 }),
        ],
      },
      {
        title: 'Hyperbolas: write the equation for each hyperbola graphed (read from the graph).', lesson: 6,
        problems: [
          eqn(R`\text{Vertices } (\pm 3,\ 0);\ \text{the dashed box reaches } y = \pm 5`, hyp(0, 0, 9, 25), [R`Opens left and right: **horizontal**, center $(0, 0)$, $a = 3$.`, R`The box's height gives $b = 5$, so $b^2 = 25$.`], 'x**2/9 - y**2/25 - 1', { center: [0, 0], vertices: [[3, 0], [-3, 0]], slope: 5 / 3 }, { no: 1 }),
          eqn(R`\text{Vertices } (\pm 4,\ 0);\ \text{the dashed box reaches } y = \pm 5`, hyp(0, 0, 16, 25), [R`**Horizontal**, center $(0, 0)$, $a = 4$, $b = 5$.`], 'x**2/16 - y**2/25 - 1', { center: [0, 0], vertices: [[4, 0], [-4, 0]], slope: 5 / 4 }, { no: 2 }),
          eqn(R`\text{Center } (-1,\ 0);\ \text{vertices } (-1,\ \pm 1);\ \text{the box reaches } x = -4 \text{ and } x = 2`, hyp(-1, 0, 9, 1, true), [R`Opens up and down: **vertical**, center $(-1, 0)$, $a = 1$.`, R`The box is 3 units each side of the center, so $b = 3$ and $b^2 = 9$.`], 'y**2/1 - (x+1)**2/9 - 1', { center: [-1, 0], vertices: [[-1, 1], [-1, -1]], slope: 1 / 3 }, { no: 3 }),
          eqn(R`\text{Center } (0,\ 0);\ \text{vertices } (0,\ \pm 1);\ \text{the box reaches } x = \pm 3`, hyp(0, 0, 9, 1, true), [R`**Vertical**, center $(0, 0)$, $a = 1$, $b = 3$.`], 'y**2/1 - x**2/9 - 1', { center: [0, 0], vertices: [[0, 1], [0, -1]], slope: 1 / 3 }, { no: 4 }),
        ],
      },
      {
        title: 'Hyperbolas: graph; label the center, vertices, co-vertices, foci, and asymptotes.', lesson: 5,
        problems: [
          conic(R`x^2 - y^2 = 1`, { A: 1, C: -1, F: -1 }, HYP_CV, { center: [0, 0], vertices: [[1, 0], [-1, 0]], coVertices: [[0, 1], [0, -1]], foci: [[S2, 0], [-S2, 0]], asym: [[1, 0], [-1, 0]] }, { no: 5 }),
          conicStd(R`\dfrac{y^2}{9} - \dfrac{x^2}{25} = 1`, hyp(0, 0, 25, 9, true), HYP_CV, { center: [0, 0], vertices: [[0, 3], [0, -3]], coVertices: [[5, 0], [-5, 0]], foci: [[0, Math.sqrt(34)], [0, -Math.sqrt(34)]], asym: [[0.6, 0], [-0.6, 0]] }, { no: 6 }),
          conic(R`36y^2 - 4x^2 = 144`, { A: -4, C: 36, F: -144 }, HYP_CV, { center: [0, 0], vertices: [[0, 2], [0, -2]], coVertices: [[6, 0], [-6, 0]], foci: [[0, 2 * Math.sqrt(10)], [0, -2 * Math.sqrt(10)]], asym: [[1 / 3, 0], [-1 / 3, 0]] }, { no: 7 }),
        ],
      },
      {
        title: 'Hyperbolas: write the equation in standard form with the given characteristics.', lesson: 6,
        problems: [
          eqn(R`\text{Vertices } (-5,\ 0),\ (5,\ 0);\ \text{Foci } (\pm 7,\ 0)`, hyp(0, 0, 25, 24), [R`Center $(0, 0)$, horizontal, $a = 5$, $c = 7$.`, R`$b^2 = c^2 - a^2 = 49 - 25 = 24$.`], 'x**2/25 - y**2/24 - 1', { center: [0, 0], vertices: [[5, 0], [-5, 0]], foci: [[7, 0], [-7, 0]] }, { no: 8 }),
          eqn(R`\text{Vertices } (0,\ -4),\ (0,\ 4);\ \text{Foci } (0,\ \pm 5)`, hyp(0, 0, 9, 16, true), [R`Center $(0, 0)$, vertical, $a = 4$, $c = 5$.`, R`$b^2 = 25 - 16 = 9$.`], 'y**2/16 - x**2/9 - 1', { center: [0, 0], vertices: [[0, 4], [0, -4]], foci: [[0, 5], [0, -5]] }, { no: 9 }),
          eqn(R`\text{Foci } (0,\ \pm 4);\ \text{Passes through } (6,\ 4)`, hyp(0, 0, 12, 4, true), [
            R`Use the definition: the **difference** of the distances from any point to the foci is $2a$.`,
            R`From $(6, 4)$ to $(0, 4)$: $6$. To $(0, -4)$: $\sqrt{6^2 + 8^2} = 10$. So $2a = 10 - 6 = 4$, $a = 2$, $a^2 = 4$.`,
            R`Vertical (foci on the $y$-axis). $b^2 = c^2 - a^2 = 16 - 4 = 12$.`,
          ], 'y**2/4 - x**2/12 - 1', { center: [0, 0], foci: [[0, 4], [0, -4]], passes: [[6, 4]] }, { no: 10 }),
        ],
      },
      {
        title: 'Parabolas: write the standard equation for each parabola graphed.', lesson: 2,
        problems: [
          eqn(R`\text{Vertex } (0,\ 0);\ \text{focus } (0,\ -1);\ \text{directrix } y = 1`, para(true, [-1, 4], 0, 0), [R`Vertical axis, opens **down**. $p = -1$.`, R`$a = \dfrac{1}{4p} = -\tfrac14$.`], 'y + x**2/4', { vertex: [0, 0], focus: [0, -1], directrix: { y: 1 } }, { no: 1 }),
          eqn(R`\text{Vertex } (-2,\ 2);\ \text{focus } (1,\ 2);\ \text{directrix } x = -5`, para(false, [1, 12], -2, 2), [R`Horizontal axis, opens **right**. $p = 1 - (-2) = 3$.`, R`$a = \dfrac{1}{4p} = \tfrac{1}{12}$.`], 'x - ((y-2)**2/12 - 2)', { vertex: [-2, 2], focus: [1, 2], directrix: { x: -5 } }, { no: 2 }),
          eqn(R`\text{Vertex } (0,\ 0);\ \text{focus } (-2,\ 0)`, para(false, [-1, 8], 0, 0), [R`Horizontal axis, opens **left**. $p = -2$.`, R`$a = \dfrac{1}{4p} = -\tfrac18$.`], 'x + y**2/8', { vertex: [0, 0], focus: [-2, 0] }, { no: 3 }),
        ],
      },
      {
        title: 'Parabolas: graph; label the vertex, focus, and directrix.', lesson: 1,
        problems: [
          conic(R`y = \tfrac14x^2`, { A: [1, 4], E: -1 }, ['vertex', 'focus', 'directrix'], { vertex: [0, 0], focus: [0, 1], directrix: { y: -1 } }, { no: 4 }),
          conic(R`x^2 - 8x - y + 20 = 0`, { A: 1, D: -8, E: -1, F: 20 }, ['vertex', 'focus', 'directrix'], { vertex: [4, 4], focus: [4, [17, 4]], directrix: { y: [15, 4] } }, { no: 5 }),
          conic(R`-14x + 2y^2 - 8y = 20`, { C: 2, E: -8, D: -14, F: -20 }, ['vertex', 'focus', 'directrix'], { vertex: [-2, 2], focus: [[-1, 4], 2], directrix: { x: [-15, 4] } }, { no: 6 }),
        ],
      },
      {
        title: 'Parabolas: write the equation in standard form with the given characteristics.', lesson: 2,
        problems: [
          eqn(R`\text{Vertex } (0,\ 0),\ \text{focus } (-4,\ 0)`, para(false, [-1, 16], 0, 0), [R`Horizontal, opens **left**, $p = -4$.`, R`$a = \dfrac{1}{4(-4)} = -\tfrac{1}{16}$.`], 'x + y**2/16', { vertex: [0, 0], focus: [-4, 0] }, { no: 7 }),
          eqn(R`\text{Focus } (0,\ -5),\ \text{directrix } y = 5`, para(true, [-1, 20], 0, 0), [R`The vertex is halfway between: $(0, 0)$. Opens **down**, $p = -5$.`, R`$a = \dfrac{1}{4(-5)} = -\tfrac{1}{20}$.`], 'y + x**2/20', { vertex: [0, 0], focus: [0, -5], directrix: { y: 5 } }, { no: 8 }),
          eqn(R`\text{Directrix } x = 8,\ \text{focus } (-8,\ 0)`, para(false, [-1, 32], 0, 0), [R`Vertex halfway: $(0, 0)$. Opens **left**, $p = -8$.`, R`$a = \dfrac{1}{4(-8)} = -\tfrac{1}{32}$.`], 'x + y**2/32', { vertex: [0, 0], focus: [-8, 0], directrix: { x: 8 } }, { no: 9 }),
          eqn(R`\text{Vertex } (6,\ 3),\ \text{passes through } (10,\ -4),\ \text{opens down}`, para(true, [-7, 16], 6, 3), [R`$y = a(x - 6)^2 + 3$.`, R`Plug in $(10, -4)$: $-4 = a(4)^2 + 3$, so $16a = -7$ and $a = -\tfrac{7}{16}$.`], 'y - (-7*(x-6)**2/16 + 3)', { vertex: [6, 3], passes: [[10, -4]] }, { no: 10 }),
          eqn(R`\text{Focus } (4,\ 2),\ \text{passes through } (7,\ 6),\ \text{opens up}`, para(true, [1, 2], 4, [3, 2]), [
            R`Every point on a parabola is as far from the focus as from the directrix. $(7, 6)$ is $\sqrt{3^2 + 4^2} = 5$ from the focus.`,
            R`It opens up, so the directrix is a line $y = d$ below the point: $6 - d = 5$, so $d = 1$.`,
            R`The vertex is halfway between the focus and directrix: $\left(4,\ \tfrac{2 + 1}{2}\right) = \left(4,\ \tfrac32\right)$, and $p = 2 - \tfrac32 = \tfrac12$.`,
            R`$a = \dfrac{1}{4p} = \tfrac12$.`,
          ], 'y - ((x-4)**2/2 + 3/2)', { vertex: [4, 1.5], focus: [4, 2], directrix: { y: 1 }, passes: [[7, 6]] }, { no: 11 }),
        ],
      },
    ],
  },
  {
    id: 'notes', title: 'Class notes', name: 'Examples from Days 1–7', due: '', lesson: 0,
    sections: [
      {
        title: 'Day 1 — Circles', lesson: 0,
        problems: [
          conicStd(R`\text{Ex 1A: } (x - 5)^2 + (y + 3)^2 = 9`, circle(5, -3, 9), CIRCLE, { center: [5, -3], r2: 9 }),
          conicStd(R`\text{Ex 1B: } x^2 = 16 - (y - 1)^2`, circle(0, 1, 16), CIRCLE, { center: [0, 1], r2: 16 }, { lead: [R`**Add $(y - 1)^2$ to both sides:** $x^2 + (y - 1)^2 = 16$. That is standard form.`] }),
          conicStd(R`\text{Ex 2A: } y^2 = 4 - x^2`, circle(0, 0, 4), CIRCLE, { center: [0, 0], r2: 4 }, { lead: [R`**Add $x^2$ to both sides:** $x^2 + y^2 = 4$.`] }),
          conicStd(R`\text{Ex 2B: } (x - 2)^2 = -y^2 + 16`, circle(2, 0, 16), CIRCLE, { center: [2, 0], r2: 16 }, { lead: [R`**Add $y^2$ to both sides:** $(x - 2)^2 + y^2 = 16$.`] }),
          conic(R`\text{Ex 3A: } x^2 + y^2 - 2x - 15 = 0`, { A: 1, C: 1, D: -2, F: -15 }, CIRCLE, { center: [1, 0], r2: 16 }),
          conic(R`\text{Ex 3B: } x^2 + y^2 - 10x + 4y + 17 = 0`, { A: 1, C: 1, D: -10, E: 4, F: 17 }, CIRCLE, { center: [5, -2], r2: 12 }),
          conic(R`\text{Ex 3C: } 16x^2 + 16y^2 + 8x - 32y = 127`, { A: 16, C: 16, D: 8, E: -32, F: -127 }, CIRCLE, { center: [[-1, 4], 1], r2: 9 }),
        ],
      },
      {
        title: 'Day 2 — Parabolas (vertex at (h, k))', lesson: 1,
        problems: [
          conic(R`\text{Ex 1: } 2x = y^2`, { C: 1, D: -2 }, PARA, { vertex: [0, 0], focus: [[1, 2], 0], directrix: { x: [-1, 2] }, opens: 'right' }),
          conicStd(R`\text{Ex 2: } (x - 1)^2 + 8(y + 2) = 0`, para(true, [-1, 8], 1, -2), PARA, { vertex: [1, -2], focus: [1, -4], directrix: { y: 0 }, opens: 'down' }, { lead: [R`**Solve for $y$:** $8(y + 2) = -(x - 1)^2$, so $y + 2 = -\tfrac18(x - 1)^2$ and $y = -\tfrac18(x - 1)^2 - 2$.`] }),
          conic(R`\text{Ex 3: } y^2 - 4x + 2y + 5 = 0`, { C: 1, D: -4, E: 2, F: 5 }, PARA, { vertex: [1, -1], focus: [2, -1], directrix: { x: 0 }, opens: 'right' }),
          conic(R`\text{Ex 4: } x^2 - 2x + 4y - 3 = 0`, { A: 1, D: -2, E: 4, F: -3 }, PARA, { vertex: [1, 1], focus: [1, 0], directrix: { y: 2 }, opens: 'down' }),
        ],
      },
      {
        title: 'Day 3 — Writing equations of circles & parabolas', lesson: 2,
        problems: [
          eqn(R`\text{Ex 1A: center } (3,\ -2);\ \text{radius } 3`, circle(3, -2, 9), [R`$(h, k) = (3, -2)$ and $r^2 = 9$.`], '(x-3)**2 + (y+2)**2 - 9', { center: [3, -2], r2: 9 }),
          eqn(R`\text{Ex 1B: center } (-4,\ 1);\ \text{radius } 2`, circle(-4, 1, 4), [R`$(h, k) = (-4, 1)$ and $r^2 = 4$.`], '(x+4)**2 + (y-1)**2 - 4', { center: [-4, 1], r2: 4 }),
          eqn(R`\text{Ex 2A: } x^2 + y^2 = 16;\ \text{right 2, down 1}`, circle(2, -1, 16), [R`The center $(0, 0)$ moves to $(2, -1)$; the radius stays $4$.`], '(x-2)**2 + (y+1)**2 - 16', { center: [2, -1], r2: 16 }),
          eqn(R`\text{Ex 2B: } (x + 1)^2 + (y - 5)^2 = 25;\ \text{left 3, up 2}`, circle(-4, 7, 25), [R`The center $(-1, 5)$ moves to $(-4, 7)$; $r^2$ stays $25$.`], '(x+4)**2 + (y-7)**2 - 25', { center: [-4, 7], r2: 25 }),
          eqn(R`\text{Ex 3: vertex } (2,\ 1),\ \text{focus } (2,\ 4)`, para(true, [1, 12], 2, 1), [R`Same $x$: vertical axis. $p = 4 - 1 = 3$ (opens **up**).`, R`$a = \dfrac{1}{4p} = \tfrac{1}{12}$.`], 'y - ((x-2)**2/12 + 1)', { vertex: [2, 1], focus: [2, 4] }),
          eqn(R`\text{Ex 4: vertex } (0,\ 1),\ \text{focus } (-2,\ 1)`, para(false, [-1, 8], 0, 1), [R`Same $y$: horizontal axis. $p = -2 - 0 = -2$ (opens **left**).`, R`$a = \dfrac{1}{4p} = -\tfrac18$.`], 'x + (y-1)**2/8', { vertex: [0, 1], focus: [-2, 1] }),
          eqn(R`\text{Ex 5: vertex } (-7,\ -5),\ \text{through } (2,\ -1),\ \text{opens right}`, para(false, [9, 16], -7, -5), [R`$x = a(y + 5)^2 - 7$.`, R`Plug in $(2, -1)$: $2 = a(4)^2 - 7$, so $16a = 9$ and $a = \tfrac{9}{16}$.`], 'x - (9*(y+5)**2/16 - 7)', { vertex: [-7, -5], passes: [[2, -1]] }),
          eqn(R`\text{Ex 6: vertex } (0,\ 4),\ \text{directrix } y = 7`, para(true, [-1, 12], 0, 4), [R`Horizontal directrix: vertical axis. The directrix is above the vertex, so it opens **down**: $p = 4 - 7 = -3$.`, R`$a = \dfrac{1}{4p} = -\tfrac{1}{12}$.`], 'y - (-x**2/12 + 4)', { vertex: [0, 4], directrix: { y: 7 } }),
          eqn(R`\text{Ex 7: focus } (2,\ 2),\ \text{directrix } x = -2`, para(false, [1, 8], 0, 2), [R`Vertex halfway between: $(0, 2)$. $p = 2 - 0 = 2$ (opens **right**).`, R`$a = \dfrac{1}{4p} = \tfrac18$.`], 'x - (y-2)**2/8', { vertex: [0, 2], focus: [2, 2], directrix: { x: -2 } }),
        ],
      },
      {
        title: 'Day 4 — Ellipses (graphing)', lesson: 3,
        problems: [
          conicStd(R`\text{Ex 1: } \dfrac{x^2}{4} + \dfrac{y^2}{25} = 1`, ell(0, 0, 4, 25), ELL, { center: [0, 0], vertices: [[0, 5], [0, -5]], coVertices: [[2, 0], [-2, 0]], foci: [[0, Math.sqrt(21)], [0, -Math.sqrt(21)]] }),
          conicStd(R`\text{Ex 2: } 4(x + 2)^2 + (y - 3)^2 = 36`, ell(-2, 3, 9, 36), ELL, { center: [-2, 3], vertices: [[-2, 9], [-2, -3]], coVertices: [[1, 3], [-5, 3]], foci: [[-2, 3 + 3 * S3], [-2, 3 - 3 * S3]] }, { lead: [R`**Divide by 36** so the right side is 1: $\dfrac{(x + 2)^2}{9} + \dfrac{(y - 3)^2}{36} = 1$.`] }),
          conic(R`\text{Ex 3: } 4x^2 + y^2 - 8x - 12 = 0`, { A: 4, C: 1, D: -8, F: -12 }, ELL, { center: [1, 0], vertices: [[1, 4], [1, -4]], coVertices: [[3, 0], [-1, 0]], foci: [[1, 2 * S3], [1, -2 * S3]] }),
          conic(R`\text{Ex 4: } x^2 + 4y^2 + 6x - 8y + 9 = 0`, { A: 1, C: 4, D: 6, E: -8, F: 9 }, ELL, { center: [-3, 1], vertices: [[-1, 1], [-5, 1]], coVertices: [[-3, 2], [-3, 0]], foci: [[-3 + S3, 1], [-3 - S3, 1]] }),
        ],
      },
      {
        title: 'Day 5 — Ellipses (writing equations)', lesson: 4,
        problems: [
          eqn(R`\text{Ex 1: centered at the origin; vertex } (0,\ 7),\ \text{co-vertex } (-4,\ 0)`, ell(0, 0, 16, 49), [R`The vertex is on the $y$-axis, so it is **vertical**: $a = 7$, $b = 4$.`], 'x**2/16 + y**2/49 - 1', { center: [0, 0], vertices: [[0, 7], [0, -7]], coVertices: [[-4, 0], [4, 0]] }),
          eqn(R`\text{Ex 2: vertices } (\pm 6,\ 0),\ \text{foci } (\pm 2,\ 0)`, ell(0, 0, 36, 32), [R`Horizontal: $a = 6$, $c = 2$.`, R`$b^2 = 36 - 4 = 32$.`], 'x**2/36 + y**2/32 - 1', { center: [0, 0], vertices: [[6, 0], [-6, 0]], foci: [[2, 0], [-2, 0]] }),
          eqn(R`\text{Ex 3: vertices } (0,\ \pm 5),\ \text{passes through } (4,\ 2)`, ell(0, 0, [400, 21], 25), [R`Vertical, $a^2 = 25$: $\dfrac{x^2}{b^2} + \dfrac{y^2}{25} = 1$.`, R`Plug in $(4, 2)$: $\dfrac{16}{b^2} + \dfrac{4}{25} = 1$, so $\dfrac{16}{b^2} = \dfrac{21}{25}$ and $b^2 = \dfrac{400}{21}$.`], 'x**2/(400/21) + y**2/25 - 1', { center: [0, 0], vertices: [[0, 5], [0, -5]], passes: [[4, 2]] }),
          eqn(R`\text{Ex 4: vertices } (2,\ -2),\ (2,\ 4);\ \text{minor axis length } 4`, ell(2, 1, 4, 9), [R`Center $(2, 1)$, vertical, $a = 3$.`, R`$2b = 4$, so $b = 2$.`], '(x-2)**2/4 + (y-1)**2/9 - 1', { center: [2, 1], vertices: [[2, -2], [2, 4]], minorLength: 4 }),
        ],
      },
      {
        title: 'Day 6 — Hyperbolas (graphing)', lesson: 5,
        problems: [
          conicStd(R`\text{Ex 1: } \dfrac{(y - 3)^2}{25} - \dfrac{(x - 2)^2}{16} = 1`, hyp(2, 3, 16, 25, true), HYP, { center: [2, 3], vertices: [[2, 8], [2, -2]], foci: [[2, 3 + Math.sqrt(41)], [2, 3 - Math.sqrt(41)]], slope: 5 / 4 }),
          conic(R`\text{Ex 2: } 9x^2 - 49y^2 = 441`, { A: 9, C: -49, F: -441 }, HYP, { center: [0, 0], vertices: [[7, 0], [-7, 0]], foci: [[Math.sqrt(58), 0], [-Math.sqrt(58), 0]], asym: [[3 / 7, 0], [-3 / 7, 0]] }),
          conic(R`\text{Ex 3: } 16y^2 - x^2 + 2x + 64y + 47 = 0`, { A: -1, C: 16, D: 2, E: 64, F: 47 }, HYP, { center: [1, -2], vertices: [[1, -1], [1, -3]], foci: [[1, -2 + Math.sqrt(17)], [1, -2 - Math.sqrt(17)]], asym: [[0.25, -2.25], [-0.25, -1.75]] }),
          conic(R`\text{Ex 4: } 25y^2 - 9x^2 - 100y - 72x - 269 = 0`, { A: -9, C: 25, D: -72, E: -100, F: -269 }, HYP, { center: [-4, 2], vertices: [[-4, 5], [-4, -1]], foci: [[-4, 2 + Math.sqrt(34)], [-4, 2 - Math.sqrt(34)]], asym: [[0.6, 4.4], [-0.6, -0.4]] }),
        ],
      },
      {
        title: 'Day 7 — Hyperbolas (writing equations)', lesson: 6,
        problems: [
          eqn(R`\text{Ex 1: foci } (\pm 5,\ 0),\ \text{vertices } (\pm 4,\ 0)`, hyp(0, 0, 16, 9), [R`Horizontal, $a = 4$, $c = 5$.`, R`$b^2 = 25 - 16 = 9$.`], 'x**2/16 - y**2/9 - 1', { center: [0, 0], vertices: [[4, 0], [-4, 0]], foci: [[5, 0], [-5, 0]] }),
          eqn(R`\text{Ex 2: foci } (2,\ -6),\ (2,\ 6);\ \text{vertices } (2,\ 3),\ (2,\ -3)`, hyp(2, 0, 27, 9, true), [R`Center $(2, 0)$, vertical, $a = 3$, $c = 6$.`, R`$b^2 = 36 - 9 = 27$.`], 'y**2/9 - (x-2)**2/27 - 1', { center: [2, 0], vertices: [[2, 3], [2, -3]], foci: [[2, 6], [2, -6]] }),
          eqn(R`\text{Ex 3: vertices } (0,\ 2),\ (6,\ 2);\ \text{asymptotes } y = \pm 3(x - 3) + 2`, hyp(3, 2, 9, 81), [R`Center $(3, 2)$, horizontal, $a = 3$.`, R`Slope $\tfrac{b}{a} = 3$, so $b = 9$ and $b^2 = 81$.`], '(x-3)**2/9 - (y-2)**2/81 - 1', { center: [3, 2], vertices: [[0, 2], [6, 2]], slope: 3 }),
          eqn(R`\text{Ex 4: vertices } (-2,\ 1),\ (2,\ 1);\ \text{passes through } (5,\ 4)`, hyp(0, 1, 4, [12, 7]), [R`Center $(0, 1)$, horizontal, $a^2 = 4$.`, R`Plug in $(5, 4)$: $\dfrac{25}{4} - \dfrac{9}{b^2} = 1$, so $\dfrac{9}{b^2} = \dfrac{21}{4}$ and $b^2 = \dfrac{36}{21} = \dfrac{12}{7}$.`], 'x**2/4 - (y-1)**2/(12/7) - 1', { center: [0, 1], vertices: [[-2, 1], [2, 1]], passes: [[5, 4]] }),
        ],
      },
      {
        title: 'Day 7 — Classifying conics: circle, parabola, ellipse, or hyperbola?', lesson: 7,
        problems: [
          { type: 'conicType', prompt: R`\text{A) } 4x^2 - 9x + y - 5 = 0`, g: { A: 4, D: -9, E: 1, F: -5 }, exp: 'parabola' },
          { type: 'conicType', prompt: R`\text{B) } 4x^2 - y^2 + 8x + 6y + 4 = 0`, g: { A: 4, C: -1, D: 8, E: 6, F: 4 }, exp: 'hyperbola' },
          { type: 'conicType', prompt: R`\text{C) } 2x^2 + 4y^2 - 4x + 12y = 0`, g: { A: 2, C: 4, D: -4, E: 12 }, exp: 'ellipse' },
          { type: 'conicType', prompt: R`\text{D) } 2x^2 + 2y^2 - 4x + 12y - 6 = 0`, g: { A: 2, C: 2, D: -4, E: 12, F: -6 }, exp: 'circle' },
        ],
      },
    ],
  },
]
