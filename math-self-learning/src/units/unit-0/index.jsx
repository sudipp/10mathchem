// Unit 0: Linear, Absolute Value & Piecewise Functions. Lessons, homework, videos, and the day plan.
// Built from the Day 4–5 notes, the interval notation handout, and HW #1–#6.
import { MathLines } from '../../Visuals.jsx'
import { PlaneGraph } from '../../PlaneGraph.jsx'
import { absFn, fnOf, line, lineIneqPlane, pwPlane } from '../../lines.js'
import { HOMEWORK } from './homework.js'
import VIDEOS from './videos.json'

const R = String.raw
const W8 = [-8, 8, -8, 8]

// Lesson 1: through (−4, −2), perpendicular to y = −7/6 x + 2 (HW #1 39)
const REF = line([-7, 6], 2), PERP = line([6, 7], [10, 7])
// Lesson 2: y ≤ ½x + 2
const IQ = line([1, 2], 2)
// Lesson 4: Day 4 Ex 9
const EX9 = [
  { m: -1, b: 1, lo: null, hi: -3 },
  { m: -1, b: 2, lo: -3, hi: 2, loIn: true, hiIn: true },
  { m: 1, b: -1, lo: 2, hi: null },
]
// Lesson 5: Day 5 #1
const D5 = [{ m: -1, b: -2, lo: null, hi: 0, hiIn: true }, { m: 1, b: 2, lo: 0, hi: null }]

const LESSONS = [
  {
    title: 'Lines review', short: 'Lines', tag: 'Slope, three forms, parallel and perpendicular',
    intro: R`Every line has a **slope** (how steep) and can be written three ways. This lesson reviews all of it, plus simplifying radicals, which HW #1 also practices (see Unit 5, Lesson 1 for radicals).`,
    points: [
      ['Slope', R`$m = \dfrac{y_2 - y_1}{x_2 - x_1} = \dfrac{\text{rise}}{\text{run}}$. A **horizontal** line has slope $0$; a **vertical** line ($x = c$) has an **undefined** slope.`],
      ['Three forms', R`**Slope-intercept** $y = mx + b$ (read the slope and $y$-intercept). **Standard** $Ax + By = C$ (whole numbers, $A$ positive). **Point-slope** $y - y_1 = m(x - x_1)$ (use any point on the line).`],
      ['Parallel and perpendicular', R`**Parallel** lines have the **same** slope. **Perpendicular** slopes are **opposite reciprocals**: $\tfrac23$ and $-\tfrac32$ (they multiply to $-1$). Vertical and horizontal lines are perpendicular to each other.`],
      ['Graphing', R`Get $y = mx + b$, plot $(0, b)$, then use rise over run to find a second point. For $Ax + By = C$ you can also plot both intercepts.`],
    ],
    steps: [
      R`HW #1, problem 39: the line through $(-4, -2)$ **perpendicular** to $y = -\tfrac76x + 2$, in standard form.`,
      R`**Perpendicular slope:** flip $-\tfrac76$ and change the sign: $m = \tfrac67$.`,
      R`**Point-slope form** with $(-4, -2)$: $y + 2 = \tfrac67(x + 4)$.`,
      R`**Clear the fraction** (multiply by $7$): $7y + 14 = 6x + 24$.`,
      R`**Standard form:** $6x - 7y = -10$.`,
      R`**Graph:** the new line crosses the old one at a right angle.`,
    ],
    visual: step => step < 5
      ? <MathLines step={step} lines={[R`\text{through } (-4, -2) \perp\ y = -\tfrac76x + 2`, R`m = \tfrac67`, R`y + 2 = \tfrac67(x + 4)`, R`7y + 14 = 6x + 24`, R`6x - 7y = -10`]} />
      : <PlaneGraph window={W8} items={[{ kind: 'fn', f: fnOf(REF), alt: true }, { kind: 'fn', f: fnOf(PERP) }, { kind: 'dots', pts: [[-4, -2]], style: 'vertex', labels: true }]} legend={[['y = −7/6x + 2', 'alt'], ['6x − 7y = −10', '']]} />,
    question: R`What is the slope of a line perpendicular to $y = 3x - 1$?`,
    options: [R`$3$`, R`$-3$`, R`$-\tfrac13$`], correct: 2,
    explanation: R`Perpendicular slopes are opposite reciprocals: flip $3 = \tfrac31$ to $\tfrac13$ and change the sign: $-\tfrac13$. Check: $3 \cdot (-\tfrac13) = -1$.`,
    video: 'IL3UCuXrUzE', videoTitle: 'Slope-intercept form',
    more: [['9hryH94KFJA', 'Equations of parallel and perpendicular lines'], ['6CFE60iP2Ug', 'Standard form for linear equations'], ['uggD8mwglyc', 'Simplifying square roots']],
    watch: 'Watch how the slope and the y-intercept show up on the graph.',
    homework: 'hw1',
  },
  {
    title: 'Linear inequalities and interval notation', short: 'Inequalities', tag: 'Boundary line, solid or dashed, then shade',
    intro: R`An inequality like $y \le \tfrac12x + 2$ is true for a whole **region** of the plane, not just a line. You draw the boundary line, decide solid or dashed, and shade the side that works.`,
    points: [
      ['Solid or dashed', R`$\le$ and $\ge$ include the line: draw it **solid**. $<$ and $>$ do not: draw it **dashed**.`],
      ['Which side?', R`$y >$ or $y \ge$: shade **above** the line. $y <$ or $y \le$: shade **below**. For $x \le c$ shade left, $x \ge c$ shade right. Check with a **test point** like $(0, 0)$.`],
      ['Interval notation', R`$(a, b)$: endpoints left out (open circles); $[a, b]$: endpoints included (closed). Infinity always gets a parenthesis: $x \ge -5$ is $[-5, \infty)$.`],
      ['Compound inequalities', R`**And** means both are true: the overlap, like $2 \le x \le 7 = [2, 7]$. **Or** means either one: join the pieces with $\cup$, like $(-\infty, 2) \cup (6, \infty)$.`],
    ],
    steps: [
      R`Graph $y \le \tfrac12x + 2$. **Boundary:** the line $y = \tfrac12x + 2$ ($b = 2$, slope up 1, right 2).`,
      R`The symbol is $\le$, so the boundary is **solid**: points on the line count.`,
      R`**Test** $(0, 0)$: $0 \le \tfrac12(0) + 2$ means $0 \le 2$, which is **true**.`,
      R`So shade the side with $(0, 0)$: **below** the line. Every shaded point is a solution.`,
    ],
    visual: step => {
      const full = lineIneqPlane(IQ, '<=', W8)
      const items = step < 3 ? full.items.filter(i => i.kind !== 'shade') : full.items
      return <PlaneGraph window={W8} items={[...items, ...(step >= 2 ? [{ kind: 'dots', pts: [[0, 0]], style: 'sol', labels: true }] : [])]} />
    },
    question: R`A dashed line $y = 2x - 1$ with the shading **above** it. Which inequality is it?`,
    options: [R`$y > 2x - 1$`, R`$y \ge 2x - 1$`, R`$y < 2x - 1$`], correct: 0,
    explanation: R`Dashed means the line is not included ($>$ or $<$), and shading above means $y$ is bigger: $y > 2x - 1$.`,
    video: 'unSBFwK881s', videoTitle: 'Introduction to graphing inequalities',
    more: [['dK_w1HzU3Ts', 'Graphing two-variable inequality'], ['msiceXvwriE', 'How to solve compound inequalities', 'The Organic Chemistry Tutor']],
    watch: 'Notice how he picks a test point to decide which side to shade.',
    homework: 'hw2',
  },
  {
    title: 'Absolute value functions', short: 'Absolute value', tag: 'y = a|x − h| + k makes a V',
    intro: R`$y = |x|$ is a **V** with its point at the origin: absolute value is never negative. Every absolute value function $y = a|x - h| + k$ is that V moved, flipped, or stretched.`,
    points: [
      ['Vertex and axis', R`The **vertex** (the point of the V) is $(h, k)$, and the **axis of symmetry** is $x = h$. The sign inside flips: $|x + 4|$ means $h = -4$.`],
      ['Up or down, wide or narrow', R`$a > 0$ opens **up**, $a < 0$ opens **down**. $|a| > 1$ is **narrower** (steeper) than $|x|$, $|a| < 1$ is **wider**, $|a| = 1$ is the same width.`],
      ['Graphing', R`1) Plot the vertex. 2) Draw the dashed axis. 3) Plot two points on one side. 4) Mirror them across the axis. 5) Draw the V.`],
      ['Writing from a graph', R`Read the vertex, put it in $y = a|x - h| + k$, plug in one more point, and solve for $a$. Vertex $(0, 2)$ and point $(2, 3)$: $3 = a|2| + 2$, so $a = \tfrac12$.`],
    ],
    steps: [
      R`Graph $y = -|x - 1| + 1$ (Day 4, Example 3). Match $y = a|x - h| + k$: $a = -1$, $h = 1$, $k = 1$.`,
      R`**Vertex** $(1, 1)$ and dashed **axis** $x = 1$. $a < 0$: it opens **down**; $|a| = 1$: same width as $|x|$.`,
      R`**Two points on one side:** $x = 2$ gives $y = 0$; $x = 3$ gives $y = -1$.`,
      R`**Mirror** across $x = 1$: $(0, 0)$ and $(-1, -1)$. Connect the upside-down V.`,
    ],
    visual: step => <PlaneGraph window={[-5, 5, -5, 5]} items={[
      ...(step >= 1 ? [{ kind: 'axis', x: 1 }] : []),
      ...(step >= 3 ? [{ kind: 'fn', f: absFn(-1, 1, 1) }] : []),
      { kind: 'dots', pts: [[1, 1]], style: 'vertex', labels: step >= 1 },
      ...(step >= 2 ? [{ kind: 'dots', pts: [[2, 0], [3, -1]], style: 'key' }] : []),
      ...(step >= 3 ? [{ kind: 'dots', pts: [[0, 0], [-1, -1]], style: 'key' }] : []),
    ]} />,
    question: R`What is the vertex of $y = 2|x + 3| - 5$?`,
    options: [R`$(3, -5)$`, R`$(-3, -5)$`, R`$(-3, 5)$`], correct: 1,
    explanation: R`$|x + 3| = |x - (-3)|$, so $h = -3$, and $k = -5$. The vertex is $(-3, -5)$.`,
    video: '1OtzfP8fCNU', videoTitle: 'Graphs of absolute value functions',
    more: [['Wri26sPEBoI', 'Shifting absolute value graphs'], ['Yyfk0rwuZSE', 'Scaling and reflecting absolute value functions']],
    watch: 'Watch where the vertex moves when the numbers change.',
    homework: 'hw4a',
  },
  {
    title: 'Graphing piecewise functions', short: 'Piecewise graphs', tag: 'Each rule lives on its own interval',
    intro: R`A **piecewise function** uses different rules on different intervals of $x$. You graph each rule **only** on its interval, and mark the ends with open or closed dots.`,
    points: [
      ['Reading the cases', R`$f(x) = \begin{cases} 2, & x \le 1 \\ -x + 3, & x > 1 \end{cases}$ means: use $2$ when $x \le 1$, and $-x + 3$ when $x > 1$.`],
      ['Open or closed dots', R`At an endpoint, **$\le$ or $\ge$** includes it: a **closed** dot. **$<$ or $>$** leaves it out: an **open** dot. Find the endpoint's $y$ by plugging the boundary $x$ into **that** piece.`],
      ['Evaluating', R`To find $f(a)$, first find the piece whose condition is true for $x = a$, then substitute into that piece only. If no condition fits, $f(a)$ is undefined.`],
      ['Is it a function?', R`Every $x$ may belong to **one** piece at most. A vertical line must never hit two dots that are both closed.`],
    ],
    steps: [
      R`Day 4, Example 9: $f(x) = \begin{cases} -x + 1, & x < -3 \\ -x + 2, & -3 \le x \le 2 \\ x - 1, & x > 2 \end{cases}$`,
      R`**Piece 1:** $-x + 1$ for $x < -3$. At $x = -3$: $y = 4$, an **open** dot. Draw left from there.`,
      R`**Piece 2:** $-x + 2$ from $x = -3$ to $x = 2$, both **closed**: $(-3, 5)$ and $(2, 0)$.`,
      R`**Piece 3:** $x - 1$ for $x > 2$. At $x = 2$: $y = 1$, an **open** dot. Draw right from there.`,
    ],
    visual: step => {
      const shown = EX9.slice(0, Math.max(0, step))
      return <PlaneGraph {...(shown.length ? pwPlane(shown, [-6, 6, -6, 6]) : { window: [-6, 6, -6, 6], items: [] })} />
    },
    question: R`$f(x) = \begin{cases} x + 1, & x < 2 \\ 5, & x \ge 2 \end{cases}$. What is $f(2)$?`,
    options: [R`$3$`, R`$5$`, R`Undefined`], correct: 1,
    explanation: R`$x = 2$ fits $x \ge 2$ (not $x < 2$), so use the second piece: $f(2) = 5$.`,
    video: 'PQiXRrT_14o', videoTitle: 'Graphing piecewise function',
    more: [['hg2HR9zJFq4', 'How to evaluate a piecewise function']],
    watch: 'Pay attention to which endpoints get open dots and which get closed dots.',
    homework: 'hw4b',
  },
  {
    title: 'Writing piecewise functions, domain and range', short: 'Writing piecewise', tag: 'Read each piece off the graph',
    intro: R`Going the other way: given a graph, write its piecewise function. Each section of the graph gives one rule (from its slope and intercept) and one interval (from its dots).`,
    points: [
      ['One section at a time', R`For a slanted section, pick two grid points and find the slope, then the $y$-intercept: $y = mx + b$. A flat section is a constant, like $y = 4$.`],
      ['The interval', R`Read where the section starts and stops. A **closed** dot becomes $\le$ or $\ge$; an **open** dot becomes $<$ or $>$; an arrow means it keeps going to $\pm\infty$.`],
      ['Domain and range', R`**Domain:** all the $x$-values the graph covers. **Range:** all the $y$-values it reaches. Write them in interval notation, joining pieces with $\cup$, like $(-\infty, 3] \cup (5, \infty)$.`],
    ],
    steps: [
      R`Day 5, graph 1: two sections that break at $x = 0$.`,
      R`**Left section:** through $(-4, 2)$ and $(0, -2)$: slope $\dfrac{-2 - 2}{0 - (-4)} = -1$, and it crosses the $y$-axis at $-2$: $y = -x - 2$. The dot at $(0, -2)$ is **closed**: $x \le 0$.`,
      R`**Right section:** through $(0, 2)$ and $(2, 4)$: slope $1$, $y$-intercept $2$: $y = x + 2$. The dot at $(0, 2)$ is **open**: $x > 0$.`,
      R`$g(x) = \begin{cases} -x - 2, & x \le 0 \\ x + 2, & x > 0 \end{cases}$. **Domain:** every $x$ is covered: $(-\infty, \infty)$. **Range:** the left piece covers $y \ge -2$ and the right piece $y > 2$, so together $[-2, \infty)$.`,
    ],
    visual: () => <PlaneGraph {...pwPlane(D5, [-6, 6, -6, 6])} />,
    question: R`A graph's only piece is a ray starting with an **open** dot at $(1, 3)$ and going to the right. What is its domain?`,
    options: [R`$[1, \infty)$`, R`$(1, \infty)$`, R`$(3, \infty)$`], correct: 1,
    explanation: R`The domain is about $x$-values. The open dot at $x = 1$ leaves $1$ out, and the ray continues forever: $(1, \infty)$.`,
    video: 'tedzsRH0Jas', videoTitle: 'Piecewise function formula from graph',
    more: [['IJWDyPFXGyM', 'Finding a piecewise function definition from graph'], ['rpI-X9Gn5a4', 'Domain and range of a piecewise function']],
    watch: 'See how he turns each open or closed dot into an inequality.',
    homework: 'hw5',
  },
]
const HW_FOR = { 0: 'hw1', 1: 'hw2', 2: 'hw4a', 3: 'hw4b', 4: 'hw5' }

// Bookshelf in learning order.
const SHELF = [
  [['IL3UCuXrUzE', 'Slope-intercept form'], ['9hryH94KFJA', 'Equations of parallel and perpendicular lines'], ['6CFE60iP2Ug', 'Standard form for linear equations'], ['uggD8mwglyc', 'Simplifying square roots']],
  [['unSBFwK881s', 'Introduction to graphing inequalities'], ['dK_w1HzU3Ts', 'Graphing two-variable inequality'], ['msiceXvwriE', 'How to solve compound inequalities', 'The Organic Chemistry Tutor']],
  [['1OtzfP8fCNU', 'Graphs of absolute value functions'], ['Wri26sPEBoI', 'Shifting absolute value graphs'], ['Yyfk0rwuZSE', 'Scaling and reflecting absolute value functions']],
  [['PQiXRrT_14o', 'Graphing piecewise function'], ['hg2HR9zJFq4', 'How to evaluate a piecewise function']],
  [['tedzsRH0Jas', 'Piecewise function formula from graph'], ['IJWDyPFXGyM', 'Finding a piecewise function definition from graph'], ['rpI-X9Gn5a4', 'Domain and range of a piecewise function']],
]

const unit0 = {
  number: 0,
  slug: 'unit-0',
  title: 'Linear, Absolute Value & Piecewise Functions',
  short: 'Lines & piecewise',
  course: 'Accelerated Math II/III',
  summary: 'Lines in slope-intercept, standard and point-slope form, parallel and perpendicular lines, linear inequalities, interval notation, absolute value functions, and graphing and writing piecewise functions.',
  hero: { title: 'Lines, Vs, and pieces.', em: 'One rule at a time.', text: 'Graph it, write it, read it.', sub: 'The building blocks for every function that comes next.', side: 'EVERY GRAPH IS BUILT FROM SIMPLE PIECES.' },
  path: { title: 'From lines to', em: 'pieces.' },
  lessons: LESSONS,
  homework: HOMEWORK,
  hwFor: HW_FOR,
  shelf: SHELF,
  videoIds: ['01-lines', '02-linear-inequalities', '03-absolute-value', '04-piecewise-graphs', '05-writing-piecewise'],
  videos: VIDEOS,
  dayPlan: {
    title: 'Unit 0 in a day',
    sessions: [
      { name: 'Session 1', title: 'Lines and inequalities', lessons: [0, 1], hw: ['hw1', 'hw2'] },
      { name: 'Session 2', title: 'Absolute value', lessons: [2], hw: ['hw4a', 'notes'] },
      { name: 'Session 3', title: 'Piecewise functions and review', lessons: [3, 4], hw: ['hw4b', 'hw5', 'hw6'] },
    ],
  },
}
export default unit0
