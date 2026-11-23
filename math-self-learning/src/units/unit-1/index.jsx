// Unit 1: Quadratic Functions. Lessons, homework, videos, and the day plan.
// Built from the Day 1–5 notes and HW #1–#7.
import { MathLines } from '../../Visuals.jsx'
import { PlaneGraph } from '../../PlaneGraph.jsx'
import { HOMEWORK } from './homework.js'
import VIDEOS from './videos.json'

const R = String.raw
const sq = (a, h, k) => x => a * (x - h) ** 2 + k

const LESSONS = [
  {
    title: 'Graphing quadratics in standard form', short: 'Standard form', tag: 'Find the vertex with x = −b/2a',
    intro: R`A **quadratic function** $y = ax^2 + bx + c$ ($a \ne 0$) graphs as a U-shaped **parabola**. In standard form the vertex is hidden, so you find it with a formula, then graph from there.`,
    points: [
      ['Up or down, wide or narrow', R`$a > 0$ opens **up** (the vertex is a **minimum**); $a < 0$ opens **down** (a **maximum**). $|a| > 1$ is narrower than $y = x^2$; $|a| < 1$ is wider.`],
      ['The vertex', R`The axis of symmetry is the vertical line $x = -\dfrac{b}{2a}$. Plug that $x$ back in to get the $y$-coordinate: the max or min **value**.`],
      ['Domain and range', R`Domain: **always** all real numbers. Range: $y \ge k$ if it opens up, $y \le k$ if it opens down, where $k$ is the vertex's $y$.`],
      ['Graphing steps', R`1) Plot the vertex. 2) Draw the axis of symmetry (dashed). 3) Plot two points on one side. 4) Mirror them across the axis. 5) Draw the parabola.`],
    ],
    steps: [
      R`Graph $y = -x^2 + 2x + 4$ (Day 1, Example 3). $a = -1 < 0$, so it opens **down**: the vertex is a **maximum**.`,
      R`**Axis:** $x = -\dfrac{b}{2a} = -\dfrac{2}{2(-1)} = 1$.`,
      R`**Vertex:** $y = -(1)^2 + 2(1) + 4 = 5$. Vertex $(1, 5)$: max value $5$.`,
      R`**Two points on one side:** $x = 2$ gives $4$; $x = 3$ gives $1$.`,
      R`**Mirror** across $x = 1$: $(0, 4)$ and $(-1, 1)$. Draw the parabola. Range $y \le 5$.`,
    ],
    visual: step => <PlaneGraph window={[-5, 5, -3, 7]} items={[
      ...(step >= 1 ? [{ kind: 'axis', x: 1 }] : []),
      ...(step >= 4 ? [{ kind: 'fn', f: sq(-1, 1, 5) }] : []),
      ...(step >= 2 ? [{ kind: 'dots', pts: [[1, 5]], style: 'vertex', labels: true }] : []),
      ...(step >= 3 ? [{ kind: 'dots', pts: [[2, 4], [3, 1]], style: 'key' }] : []),
      ...(step >= 4 ? [{ kind: 'dots', pts: [[0, 4], [-1, 1]], style: 'key' }] : []),
    ]} />,
    question: R`What is the axis of symmetry of $y = 2x^2 - 8x + 3$?`,
    options: [R`$x = -2$`, R`$x = 2$`, R`$x = 4$`], correct: 1,
    explanation: R`$x = -\dfrac{b}{2a} = -\dfrac{-8}{2(2)} = \dfrac{8}{4} = 2$.`,
    video: 'IbI-l7mbKO4', videoTitle: 'Finding the vertex of a parabola example',
    more: [['3a7UbMJpeIM', 'Graphing a quadratic function'], ['MQtsRYPx3v0', 'Graphing a parabola using roots and vertex']],
    watch: 'Watch how the vertex comes first, then the symmetric points.',
    homework: 'hw1',
  },
  {
    title: 'Transformations and vertex form', short: 'Transformations', tag: 'y = a(x − h)² + k moves y = x²',
    intro: R`**Vertex form** $y = a(x - h)^2 + k$ shows the vertex $(h, k)$ right away. Every quadratic is the parent $y = x^2$ shifted, reflected, or stretched.`,
    points: [
      ['Shifts', R`Numbers **outside** the parentheses move it up/down: $x^2 + 3$ is up 3. Numbers **inside** move it left/right, the **opposite** way: $(x - 5)^2$ is right 5, $(x + 2)^2$ is left 2.`],
      ['Reflections', R`A minus **outside**, $-f(x)$, flips it over the $x$-axis (opens down). A minus **inside**, $f(-x)$, flips it over the $y$-axis.`],
      ['Stretch or shrink', R`$a \cdot f(x)$ with $|a| > 1$ stretches it vertically (narrower); $0 < |a| < 1$ shrinks it (wider).`],
      ['Vertex and axis', R`Vertex $(h, k)$, axis $x = h$. In standard form the vertex is $\left(-\tfrac{b}{2a},\ f\left(-\tfrac{b}{2a}\right)\right)$.`],
    ],
    steps: [
      R`Describe $f(x) = 2(x - 1)^2 - 4$ (Day 2, Example 3C) and graph it. Start with the parent $y = x^2$.`,
      R`$(x - 1)$: shift **right 1**.`,
      R`$-4$: shift **down 4**. The vertex moves from $(0, 0)$ to $(1, -4)$.`,
      R`$a = 2$: **stretch** by 2, so it is narrower. Points 1 away from the vertex go up $2$ (not $1$).`,
    ],
    visual: step => <PlaneGraph window={[-5, 5, -5, 5]} items={[
      { kind: 'fn', f: x => x * x, alt: true },
      ...(step >= 1 ? [{ kind: 'fn', f: sq(step >= 3 ? 2 : 1, 1, step >= 2 ? -4 : 0), dashed: step < 3 }] : []),
      { kind: 'dots', pts: [[1, step >= 2 ? -4 : 0]], style: 'vertex', labels: step >= 2 },
    ]} legend={[['y = x²', 'alt'], ['transformed', '']]} />,
    question: R`Which describes $y = -(x + 3)^2$?`,
    options: ['Right 3, opens down', 'Left 3, opens down', 'Left 3, opens up'], correct: 1,
    explanation: R`$(x + 3) = (x - (-3))$ moves it **left** 3, and the minus outside reflects it over the $x$-axis, so it opens **down**.`,
    video: '99v51U3HSCU', videoTitle: 'Shifting and scaling parabolas',
    more: [['_QqhuLixNEk', 'Introduction to vertex form of a quadratic'], ['7QMoNY6FzvM', 'Graphing a parabola in vertex form']],
    watch: 'Notice which numbers move the parabola sideways and which move it up and down.',
    homework: 'hw2',
  },
  {
    title: 'Characteristics of quadratics', short: 'Characteristics', tag: 'Domain, range, intercepts, increasing, decreasing',
    intro: R`Reading a parabola means naming its **characteristics**: domain, range, $x$- and $y$-intercepts, axis, vertex, and where it is increasing or decreasing.`,
    points: [
      ['Intercepts', R`**$y$-intercept:** set $x = 0$ (it is $c$ in standard form). **$x$-intercepts (zeros):** where $y = 0$: factor, use the quadratic formula, or read them from a graphing calculator.`],
      ['Increasing and decreasing', R`Read left to right. Opening up: **decreasing** on $(-\infty, h)$, **increasing** on $(h, \infty)$. Opening down: the reverse. Use the vertex's $x$, with parentheses.`],
      ['Factored form from zeros', R`If the zeros are $p$ and $q$, then $f(x) = a(x - p)(x - q)$. Example: $r(x) = -2x^2 + 6x + 20$ has zeros $5$ and $-2$, so $r(x) = -2(x - 5)(x + 2)$.`],
      ['Average rate of change', R`On $[a, b]$ it is $\dfrac{f(b) - f(a)}{b - a}$: the slope of the line through the two points.`],
    ],
    steps: [
      R`$f(x) = -2x^2 + 4x$ (Day 3, Example 1a). $a = -2$: it opens **down**.`,
      R`**Vertex:** $x = -\dfrac{4}{2(-2)} = 1$, $y = -2 + 4 = 2$. Vertex $(1, 2)$, axis $x = 1$.`,
      R`**Intercepts:** $y$-intercept $0$. Zeros: $-2x(x - 2) = 0$, so $x = 0$ and $x = 2$.`,
      R`**Domain** $(-\infty, \infty)$; **range** $(-\infty, 2]$.`,
      R`**Increasing** on $(-\infty, 1)$, **decreasing** on $(1, \infty)$.`,
    ],
    visual: step => <PlaneGraph window={[-3, 4, -4, 4]} items={[
      { kind: 'axis', x: 1 }, { kind: 'fn', f: sq(-2, 1, 2) },
      { kind: 'dots', pts: [[1, 2]], style: 'vertex', labels: true },
      ...(step >= 2 ? [{ kind: 'dots', pts: [[0, 0], [2, 0]], style: 'key', labels: true }] : []),
      ...(step >= 3 ? [{ kind: 'shade', f: () => 2, side: 'below', alt: true }] : []),
    ]} />,
    question: R`$y = (x - 3)^2 + 1$ is decreasing on which interval?`,
    options: [R`$(-\infty, 3)$`, R`$(3, \infty)$`, R`$(-\infty, 1)$`], correct: 0,
    explanation: R`It opens up with vertex $(3, 1)$, so it goes down until $x = 3$: decreasing on $(-\infty, 3)$.`,
    video: 'KxOp3s9ottg', videoTitle: 'Increasing, decreasing, positive or negative intervals',
    more: [['uYNKJWFYh7k', 'Graphing quadratics using x and y intercepts', 'The Organic Chemistry Tutor'], ['oT6LclcJ-I8', 'Introduction to average rate of change']],
    watch: 'Watch how he reads intervals off the graph from left to right.',
    homework: 'hw3',
  },
  {
    title: 'Intercept form', short: 'Intercept form', tag: 'y = a(x − p)(x − q) shows the zeros',
    intro: R`**Intercept form** $y = a(x - p)(x - q)$ (also called factored form) shows the $x$-intercepts $p$ and $q$. The vertex sits exactly halfway between them.`,
    points: [
      ['Three forms', R`**Standard** $ax^2 + bx + c$: vertex at $x = -\tfrac{b}{2a}$. **Vertex** $a(x - h)^2 + k$: vertex $(h, k)$. **Intercept** $a(x - p)(x - q)$: zeros $p$, $q$; axis $x = \tfrac{p + q}{2}$.`],
      ['Find the vertex', R`Axis $x = \dfrac{p + q}{2}$; plug it in for the $y$. For $h(x) = -2(x + 3)(x + 5)$: axis $x = -4$, $h(-4) = -2(-1)(1) = 2$.`],
      ['Watch the signs', R`$(x + 3)$ means the zero is $-3$. A factor like $(1 - x)$ hides a minus: $-2x(1 - x) = 2x(x - 1)$.`],
    ],
    steps: [
      R`Graph $h(x) = -2(x + 3)(x + 5)$ (Day 4, Example 2A). **Zeros:** $-3$ and $-5$.`,
      R`**Axis:** halfway: $x = \dfrac{-3 + (-5)}{2} = -4$.`,
      R`**Vertex:** $h(-4) = -2(-4 + 3)(-4 + 5) = -2(-1)(1) = 2$. Vertex $(-4, 2)$, a **maximum** ($a < 0$).`,
      R`**$y$-intercept:** $h(0) = -2(3)(5) = -30$. Draw the parabola through the zeros and the vertex.`,
    ],
    visual: step => <PlaneGraph window={[-8, 2, -6, 4]} items={[
      ...(step >= 1 ? [{ kind: 'axis', x: -4 }] : []),
      ...(step >= 3 ? [{ kind: 'fn', f: x => -2 * (x + 3) * (x + 5) }] : []),
      { kind: 'dots', pts: [[-3, 0], [-5, 0]], style: 'key', labels: true },
      ...(step >= 2 ? [{ kind: 'dots', pts: [[-4, 2]], style: 'vertex', labels: true }] : []),
    ]} />,
    question: R`What is the vertex of $y = (x - 2)(x - 8)$?`,
    options: [R`$(5, -9)$`, R`$(5, 9)$`, R`$(-5, -9)$`], correct: 0,
    explanation: R`Zeros $2$ and $8$, so the axis is $x = 5$. $y = (5 - 2)(5 - 8) = 3(-3) = -9$. Vertex $(5, -9)$.`,
    video: 'EV57jv7JKCs', videoTitle: 'Graphing parabola from quadratic in factored form',
    more: [['Mk_hLTGabTQ', 'Graphing quadratics in factored form when a = 1']],
    watch: 'See how the vertex lands halfway between the two zeros.',
    homework: 'hw4',
  },
  {
    title: 'Writing quadratic functions', short: 'Writing quadratics', tag: 'Pick the form that fits the clues',
    intro: R`To write a quadratic, choose the form that matches what you know: the **vertex** (use vertex form) or the **zeros** (use intercept form). Then one more point finds $a$.`,
    points: [
      ['Vertex and a point', R`$y = a(x - h)^2 + k$: plug in the vertex, then the point, and solve for $a$.`],
      ['Zeros and a point', R`$y = a(x - p)(x - q)$: plug in the zeros, then the point, and solve for $a$. Symmetric points (same $y$) tell you the axis if a zero is missing.`],
      ['Converting forms', R`**Vertex to standard:** square the binomial, distribute, combine. **Standard to vertex:** find $h = -\tfrac{b}{2a}$ and $k = f(h)$ (or complete the square). **Standard to intercept:** factor (or find the zeros).`],
    ],
    steps: [
      R`Write the parabola with vertex $(3, 1)$ through $(1, 9)$ (Day 5, Example 2A).`,
      R`**Vertex form:** $y = a(x - 3)^2 + 1$.`,
      R`**Plug in** $(1, 9)$: $9 = a(1 - 3)^2 + 1 = 4a + 1$.`,
      R`**Solve:** $4a = 8$, so $a = 2$. The answer is $y = 2(x - 3)^2 + 1$.`,
    ],
    visual: step => step < 3
      ? <MathLines step={step} lines={[R`\text{vertex } (3, 1),\ \text{point } (1, 9)`, R`y = a(x - 3)^2 + 1`, R`9 = a(1 - 3)^2 + 1 = 4a + 1`]} />
      : <PlaneGraph window={[-2, 7, -2, 12]} items={[{ kind: 'axis', x: 3 }, { kind: 'fn', f: sq(2, 3, 1) }, { kind: 'dots', pts: [[3, 1]], style: 'vertex', labels: true }, { kind: 'dots', pts: [[1, 9]], style: 'sol', labels: true }]} />,
    question: R`A parabola has zeros $-1$ and $3$ and passes through $(1, -8)$. What is $a$?`,
    options: [R`$a = 2$`, R`$a = -2$`, R`$a = 4$`], correct: 0,
    explanation: R`$y = a(x + 1)(x - 3)$. At $x = 1$: $-8 = a(2)(-2) = -4a$, so $a = 2$.`,
    video: 'Fmte_dkjHys', videoTitle: 'Quadratic equation from a vertex and a point', creator: 'Brian McLogan',
    more: [['FfqJ4jgLmpk', 'Quadratic equation from roots and a point', 'Nerdstudy'], ['NbNfSIG65Qc', 'Vertex form to standard form']],
    watch: 'Watch how one extra point is all it takes to find a.',
    homework: 'hw5',
  },
]
const HW_FOR = { 0: 'hw1', 1: 'hw2', 2: 'hw3', 3: 'hw4', 4: 'hw5' }

// Bookshelf in learning order.
const SHELF = [
  [['IbI-l7mbKO4', 'Finding the vertex of a parabola example'], ['3a7UbMJpeIM', 'Graphing a quadratic function'], ['MQtsRYPx3v0', 'Graphing a parabola using roots and vertex']],
  [['99v51U3HSCU', 'Shifting and scaling parabolas'], ['_QqhuLixNEk', 'Introduction to vertex form of a quadratic'], ['7QMoNY6FzvM', 'Graphing a parabola in vertex form']],
  [['KxOp3s9ottg', 'Increasing, decreasing, positive or negative intervals'], ['uYNKJWFYh7k', 'Graphing quadratics using x and y intercepts', 'The Organic Chemistry Tutor'], ['oT6LclcJ-I8', 'Introduction to average rate of change']],
  [['EV57jv7JKCs', 'Graphing parabola from quadratic in factored form'], ['Mk_hLTGabTQ', 'Graphing quadratics in factored form when a = 1']],
  [['Fmte_dkjHys', 'Quadratic equation from a vertex and a point', 'Brian McLogan'], ['FfqJ4jgLmpk', 'Quadratic equation from roots and a point', 'Nerdstudy'], ['NbNfSIG65Qc', 'Vertex form to standard form']],
]

const unit1 = {
  number: 1,
  slug: 'unit-1',
  title: 'Quadratic Functions',
  short: 'Quadratics',
  course: 'Accelerated Math II/III',
  summary: 'Graphing quadratics in standard, vertex, and intercept form: vertex, axis of symmetry, max/min, domain and range, intercepts, increasing and decreasing intervals, transformations, and writing quadratic functions.',
  hero: { title: 'Every parabola', em: 'has a turning point.', text: 'Find the vertex, then the rest follows.', sub: 'Standard, vertex, and intercept form, and how they connect.', side: 'FIND THE VERTEX FIRST.' },
  path: { title: 'From x² to', em: 'any parabola.' },
  lessons: LESSONS,
  homework: HOMEWORK,
  hwFor: HW_FOR,
  shelf: SHELF,
  videoIds: ['01-standard-form', '02-transformations', '03-characteristics', '04-intercept-form', '05-writing-quadratics'],
  videos: VIDEOS,
  dayPlan: {
    title: 'Quadratic functions in a day',
    sessions: [
      { name: 'Session 1', title: 'Graphing and transformations', lessons: [0, 1], hw: ['hw1', 'hw2'] },
      { name: 'Session 2', title: 'Characteristics and intercept form', lessons: [2, 3], hw: ['hw3', 'hw4'] },
      { name: 'Session 3', title: 'Writing quadratics and review', lessons: [4], hw: ['hw5', 'hw6', 'hw7'] },
    ],
  },
}
export default unit1
