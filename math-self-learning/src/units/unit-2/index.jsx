// Unit 2: Solving Quadratics, Systems & Inequalities. Lessons, homework, videos, and the day plan.
// Built from the Day 11–18 notes (with the filled-in formula and discriminant notes) and HW #11–#19.
import { MathLines, SignChart } from '../../Visuals.jsx'
import { PlaneGraph } from '../../PlaneGraph.jsx'
import { inequality } from '../../extra.js'
import { HOMEWORK } from './homework.js'
import VIDEOS from './videos.json'

const R = String.raw
const IQ = inequality({ lhs: [1, -5, 6], rel: '>=' })

const LESSONS = [
  {
    title: 'The quadratic formula', short: 'Quadratic formula', tag: 'Solves any ax² + bx + c = 0',
    intro: R`When a quadratic will not factor, the **quadratic formula** always works: $x = \dfrac{-b \pm \sqrt{b^2 - 4ac}}{2a}$. It gives both solutions at once.`,
    points: [
      ['The steps', R`1) Put the equation in standard form, $= 0$. 2) Read $a$, $b$, $c$ (with their signs). 3) Plug in and simplify the part under the root first. 4) Split the $\pm$ into two answers and simplify. 5) Box both answers.`],
      ['Simplify the root', R`Pull perfect squares out: $\sqrt{228} = \sqrt{4 \cdot 57} = 2\sqrt{57}$. Then reduce the whole fraction: $\dfrac{2 \pm 2\sqrt{57}}{14} = \dfrac{1 \pm \sqrt{57}}{7}$.`],
      ['Other methods', R`If it factors, factor (zero product property). If there is no $x$-term, isolate $x^2$ and take square roots ($\pm$!). Completing the square works too (Lesson 3).`],
    ],
    steps: [
      R`Solve $x^2 - 5x + 3 = 0$ (Day 11, Example D). It is already in standard form: $a = 1$, $b = -5$, $c = 3$.`,
      R`**Plug in:** $x = \dfrac{-(-5) \pm \sqrt{(-5)^2 - 4(1)(3)}}{2(1)}$.`,
      R`**Under the root:** $25 - 12 = 13$. So $x = \dfrac{5 \pm \sqrt{13}}{2}$.`,
      R`$\sqrt{13}$ does not simplify. **Answers:** $x = \dfrac{5 + \sqrt{13}}{2} \approx 4.30$ and $x = \dfrac{5 - \sqrt{13}}{2} \approx 0.70$.`,
    ],
    visual: step => step < 3
      ? <MathLines step={step} lines={[R`x^2 - 5x + 3 = 0`, R`x = \dfrac{5 \pm \sqrt{25 - 12}}{2}`, R`x = \dfrac{5 \pm \sqrt{13}}{2}`]} />
      : <PlaneGraph window={[-2, 7, -4, 6]} items={[{ kind: 'fn', f: x => x * x - 5 * x + 3 }, { kind: 'dots', pts: [[(5 + Math.sqrt(13)) / 2, 0], [(5 - Math.sqrt(13)) / 2, 0]], style: 'sol', labels: true }]} />,
    question: R`In $3x^2 + 12x = 15$, what are $a$, $b$, and $c$?`,
    options: [R`$3,\ 12,\ 15$`, R`$3,\ 12,\ -15$`, R`$3,\ -12,\ 15$`], correct: 1,
    explanation: R`First get $0$ on one side: $3x^2 + 12x - 15 = 0$. So $a = 3$, $b = 12$, $c = -15$.`,
    video: 'i7idZfS8t8w', videoTitle: 'How to use the quadratic formula',
    more: [['IWigvJcCAJ0', 'Introduction to the quadratic equation'], ['hfQ1FhbLLDQ', "Quadratic formula song (to Maroon 5's Payphone)", 'Sean Boardman'], ['VOXYMRcWbF8', 'The quadratic formula song', 'Olen Rambow']],
    watch: 'Watch how carefully he keeps the signs of a, b, and c. (Your teacher linked the two songs, too.)',
    homework: 'hw11',
  },
  {
    title: 'The discriminant and complex numbers', short: 'Discriminant', tag: 'b² − 4ac counts the solutions',
    intro: R`The part under the root, $b^2 - 4ac$, is the **discriminant**. Before solving, it tells you how many solutions there are and what kind. A negative discriminant leads to **imaginary** numbers.`,
    points: [
      ['Count the solutions', R`$b^2 - 4ac > 0$: **two real** solutions (the parabola crosses the $x$-axis twice). $= 0$: **one real** solution (it touches once). $< 0$: **two imaginary** solutions (it never touches).`],
      ['The imaginary unit', R`$i = \sqrt{-1}$, so $i^2 = -1$. Then $\sqrt{-16} = 4i$ and $\sqrt{-12} = 2i\sqrt3$. A complex number is $a + bi$.`],
      ['Complex arithmetic', R`**Add/subtract:** combine real parts and imaginary parts. **Multiply:** FOIL, then replace $i^2$ with $-1$. **Divide:** multiply top and bottom by the **conjugate** ($a + bi \to a - bi$).`],
    ],
    steps: [
      R`How many solutions does $6x^2 - 2x = -5$ have (Day 12, Example C)? **Standard form:** $6x^2 - 2x + 5 = 0$.`,
      R`$a = 6$, $b = -2$, $c = 5$: $b^2 - 4ac = (-2)^2 - 4(6)(5) = 4 - 120 = -116$.`,
      R`The discriminant is **negative**: **two imaginary** solutions. The graph never touches the $x$-axis.`,
    ],
    visual: step => step < 2
      ? <MathLines step={step} lines={[R`6x^2 - 2x + 5 = 0`, R`b^2 - 4ac = 4 - 120 = -116`]} />
      : <PlaneGraph window={[-3, 3, -2, 10]} items={[{ kind: 'fn', f: x => 6 * x * x - 2 * x + 5 }]} />,
    question: R`What is $(2 + 3i)(2 - 3i)$?`,
    options: [R`$4 - 9i^2 = 13$`, R`$4 + 9 = 13i$`, R`$-5$`], correct: 0,
    explanation: R`FOIL: $4 - 6i + 6i - 9i^2 = 4 - 9(-1) = 13$. Conjugates always multiply to a real number.`,
    video: '1213qW5k55I', videoTitle: 'Discriminant for types of solutions',
    more: [['cWn6g8Qqvs4', 'Multiplying complex numbers'], ['6fU9ZgwbU74', 'How to determine the discriminant', 'The Organic Chemistry Tutor']],
    watch: 'Listen for what each sign of the discriminant means for the graph.',
    homework: 'hw12',
  },
  {
    title: 'Changing forms and completing the square', short: 'Completing the square', tag: 'Standard, vertex, and intercept form',
    intro: R`Each form of a quadratic shows something different. You can move between them: expand to get **standard** form, factor to get **intercept** form, and **complete the square** to get **vertex** form.`,
    points: [
      ['To standard form', R`Square the binomial or FOIL, distribute $a$, and combine: $2(x + 3)^2 + 5 = 2(x^2 + 6x + 9) + 5 = 2x^2 + 12x + 23$.`],
      ['To vertex form', R`Factor $a$ out of the $x$-terms, add and subtract $\left(\tfrac{b}{2}\right)^2$ inside, factor the perfect square, and combine the constants.`],
      ['Solving by completing the square', R`Move $c$ over, divide by $a$, add $\left(\tfrac{b}{2}\right)^2$ to **both** sides, factor, then square root both sides (remember $\pm$).`],
    ],
    steps: [
      R`Write $y = 2x^2 - 8x + 1$ in vertex form (Day 13, Example 9). **Factor 2** from the $x$-terms: $y = 2(x^2 - 4x) + 1$.`,
      R`Half of $-4$ is $-2$; squared: $4$. Add and subtract it inside: $y = 2(x^2 - 4x + 4 - 4) + 1$.`,
      R`**Factor** the perfect square; the $-4$ comes out times $2$: $y = 2(x - 2)^2 - 8 + 1$.`,
      R`**Combine:** $y = 2(x - 2)^2 - 7$. Vertex $(2, -7)$.`,
    ],
    visual: step => <MathLines step={step} lines={[R`y = 2(x^2 - 4x) + 1`, R`y = 2(x^2 - 4x + 4 - 4) + 1`, R`y = 2(x - 2)^2 - 8 + 1`, R`y = 2(x - 2)^2 - 7`]} />,
    question: R`What number completes the square for $x^2 + 10x + \underline{\quad}$?`,
    options: [R`$10$`, R`$25$`, R`$100$`], correct: 1,
    explanation: R`Half of $10$ is $5$, and $5^2 = 25$: $x^2 + 10x + 25 = (x + 5)^2$.`,
    video: '02h9yhc7ruc', videoTitle: 'Completing the square for vertex form',
    more: [['VvuuRpJbbHE', 'Example: completing the square'], ['NbNfSIG65Qc', 'Vertex form to standard form']],
    watch: 'Watch what happens to the number you add when a is not 1.',
    homework: 'hw13',
  },
  {
    title: 'Linear–quadratic systems', short: 'Line + parabola', tag: 'Where a line meets a parabola',
    intro: R`Solving a system means finding where the graphs **intersect**. A line can meet a parabola **twice**, **once**, or **not at all**.`,
    points: [
      ['Check a point', R`A point is a solution only if it makes **both** equations true. Substitute it into each one.`],
      ['Substitution', R`Solve the linear equation for $y$, substitute into the quadratic, and solve the resulting quadratic in $x$. Then plug each $x$ back into the **linear** equation for $y$.`],
      ['How many?', R`The new quadratic tells you: two real $x$-values, two points; one (a double root), one point; a negative discriminant, **no solution**.`],
    ],
    steps: [
      R`Solve $y = 2x + 7$ and $y = x^2 + 4$ (Day 16, Example 2A). **Substitute:** $x^2 + 4 = 2x + 7$.`,
      R`**Standard form:** $x^2 - 2x - 3 = 0$, which factors as $(x - 3)(x + 1) = 0$.`,
      R`$x = 3$ or $x = -1$. **Back into the line:** $y = 2(3) + 7 = 13$ and $y = 2(-1) + 7 = 5$.`,
      R`**Solutions:** $(3, 13)$ and $(-1, 5)$, where the line crosses the parabola.`,
    ],
    visual: step => <PlaneGraph window={[-5, 6, -2, 16]} items={[{ kind: 'fn', f: x => x * x + 4 }, { kind: 'fn', f: x => 2 * x + 7, alt: true }, ...(step >= 3 ? [{ kind: 'dots', pts: [[3, 13], [-1, 5]], style: 'sol', labels: true }] : [])]} />,
    question: R`Is $(1, 3)$ a solution of the system $y = x^2 + 2$ and $y = 2x$?`,
    options: ['Yes', 'No: it fails the line', 'No: it fails the parabola'], correct: 1,
    explanation: R`Parabola: $1^2 + 2 = 3$ ✓. Line: $2(1) = 2 \ne 3$ ✗. A solution must satisfy **both**, so it is not a solution.`,
    video: 'Cy1Pxz_wLfA', videoTitle: 'Quadratic systems: a line and a parabola',
    more: [['NGPRtXxrinI', 'Solving systems of linear and quadratic equations', "Ms. Smith's Math Tutorials"]],
    watch: 'See how the number of intersections matches the number of solutions.',
    homework: 'hw16',
  },
  {
    title: 'Quadratic–quadratic systems', short: 'Two parabolas', tag: 'Set the two y-expressions equal',
    intro: R`Two parabolas can meet in two points, one point, or none. With both solved for $y$, set the right sides equal: the $x^2$ terms often simplify or even cancel.`,
    points: [
      ['Set them equal', R`If $y = f(x)$ and $y = g(x)$, solve $f(x) = g(x)$. Get $0$ on one side and solve by factoring or the quadratic formula.`],
      ['When $x^2$ cancels', R`If both have the same $x^2$ coefficient, the equation becomes **linear**: exactly one solution (or none).`],
      ['Finish with $y$', R`Plug each $x$ into either original equation to get its $y$. Write the answers as ordered pairs.`],
    ],
    steps: [
      R`Solve $y = x^2 + 2x + 1$ and $y = 2x^2 - x - 3$ (Day 17, Example 1). **Set equal:** $x^2 + 2x + 1 = 2x^2 - x - 3$.`,
      R`**One side $0$:** $0 = x^2 - 3x - 4 = (x - 4)(x + 1)$.`,
      R`$x = 4$: $y = 16 + 8 + 1 = 25$. $x = -1$: $y = 1 - 2 + 1 = 0$.`,
      R`**Solutions:** $(4, 25)$ and $(-1, 0)$.`,
    ],
    visual: step => <PlaneGraph window={[-4, 6, -5, 30]} items={[{ kind: 'fn', f: x => x * x + 2 * x + 1 }, { kind: 'fn', f: x => 2 * x * x - x - 3, alt: true }, ...(step >= 3 ? [{ kind: 'dots', pts: [[4, 25], [-1, 0]], style: 'sol', labels: true }] : [])]} />,
    question: R`$y = x^2 + 4x + 4$ and $y = x^2 + 2x + 6$. What happens when you set them equal?`,
    options: [R`The $x^2$ terms cancel: $2x = 2$, one solution`, 'Two solutions', 'No solution'], correct: 0,
    explanation: R`$x^2 + 4x + 4 = x^2 + 2x + 6$ gives $2x = 2$, so $x = 1$ and $y = 9$: one solution, $(1, 9)$.`,
    video: 'rq5AjFs95qw', videoTitle: 'Systems of quadratic equations', creator: 'The Organic Chemistry Tutor',
    more: [['SYsf5hD30aQ', 'Solving quadratic systems', "Mario's Math Tutoring"]],
    watch: 'Notice how setting the equations equal turns two curves into one equation.',
    homework: 'hw17',
  },
  {
    title: 'Quadratic inequalities', short: 'Inequalities', tag: 'Shade a parabola or test a number line',
    intro: R`Quadratic inequalities come in two kinds: with $y$ (shade a region on a graph) and with only $x$ (find intervals on a number line).`,
    points: [
      ['Graphing $y < ax^2 + bx + c$', R`Graph the parabola **dashed** for $<$ or $>$, **solid** for $\le$ or $\ge$. Test a point not on it (like $(0, 0)$): if it works, shade its side; if not, the other side.`],
      ['One variable', R`For $x^2 - 5x + 6 \ge 0$: find the zeros (**critical points**), mark them on a number line (closed for $\le, \ge$; open for $<, >$), and test one number in each interval.`],
      ['Special cases', R`$(3x - 4)^2 \ge 0$ is true for **all real numbers**. $x^2 + 10x + 25 < 0$ is $(x + 5)^2 < 0$: **no solution** ($\varnothing$).`],
    ],
    steps: [
      R`Solve $x^2 - 5x + 6 \ge 0$ (Day 18, Example 3). **Critical points:** $(x - 2)(x - 3) = 0$, so $x = 2$ and $x = 3$ (closed circles).`,
      R`**Test each interval:** $x = 0$ gives $6$ ($+$), $x = 2.5$ gives $-0.25$ ($-$), $x = 4$ gives $2$ ($+$).`,
      R`We want $\ge 0$: the positive intervals plus the zeros: $(-\infty, 2] \cup [3, \infty)$.`,
    ],
    visual: step => <SignChart pts={IQ.pts} signs={step >= 1 ? IQ.signs : IQ.signs.map(() => 0)} atoms={IQ.atoms} showSolution={step >= 2} />,
    question: R`For $y > x^2 - 4$, should the parabola be dashed or solid, and which side is shaded?`,
    options: ['Solid, below', 'Dashed, above (inside)', 'Dashed, below (outside)'], correct: 1,
    explanation: R`$>$ means dashed. Test $(0, 0)$: $0 > -4$ is true, and $(0, 0)$ is inside the parabola, above it: shade above.`,
    video: 'ZNtzWpU80-0', videoTitle: 'Quadratic inequalities',
    more: [['xdiBjypYFRQ', 'Quadratic inequalities (visual explanation)'], ['s2zwXod9z2w', 'Graph a quadratic inequality in two variables', 'Eat Pi']],
    watch: 'See how the zeros split the number line into intervals.',
    homework: 'hw18',
  },
]
const HW_FOR = { 0: 'hw11', 1: 'hw12', 2: 'hw13', 3: 'hw16', 4: 'hw17', 5: 'hw18' }

// Bookshelf in learning order.
const SHELF = [
  [['i7idZfS8t8w', 'How to use the quadratic formula'], ['IWigvJcCAJ0', 'Introduction to the quadratic equation'], ['hfQ1FhbLLDQ', "Quadratic formula song (to Maroon 5's Payphone)", 'Sean Boardman'], ['VOXYMRcWbF8', 'The quadratic formula song', 'Olen Rambow']],
  [['1213qW5k55I', 'Discriminant for types of solutions'], ['cWn6g8Qqvs4', 'Multiplying complex numbers'], ['6fU9ZgwbU74', 'How to determine the discriminant', 'The Organic Chemistry Tutor']],
  [['02h9yhc7ruc', 'Completing the square for vertex form'], ['VvuuRpJbbHE', 'Example: completing the square'], ['NbNfSIG65Qc', 'Vertex form to standard form']],
  [['Cy1Pxz_wLfA', 'Quadratic systems: a line and a parabola'], ['NGPRtXxrinI', 'Solving systems of linear and quadratic equations', "Ms. Smith's Math Tutorials"]],
  [['rq5AjFs95qw', 'Systems of quadratic equations', 'The Organic Chemistry Tutor'], ['SYsf5hD30aQ', 'Solving quadratic systems', "Mario's Math Tutoring"]],
  [['ZNtzWpU80-0', 'Quadratic inequalities'], ['xdiBjypYFRQ', 'Quadratic inequalities (visual explanation)'], ['s2zwXod9z2w', 'Graph a quadratic inequality in two variables', 'Eat Pi']],
]

const unit2 = {
  number: 2,
  slug: 'unit-2',
  title: 'Solving Quadratics, Systems & Inequalities',
  short: 'Solving quadratics',
  course: 'Accelerated Math II/III',
  summary: 'The quadratic formula, the discriminant and complex numbers, completing the square and changing forms, linear–quadratic and quadratic–quadratic systems, and quadratic inequalities.',
  hero: { title: 'Every quadratic', em: 'can be solved.', text: 'Factor it, complete the square, or use the formula.', sub: 'Then find where graphs meet and where they stay above or below.', side: 'b² − 4ac TELLS YOU WHAT TO EXPECT.' },
  path: { title: 'From formula to', em: 'systems.' },
  lessons: LESSONS,
  homework: HOMEWORK,
  hwFor: HW_FOR,
  shelf: SHELF,
  videoIds: ['01-quadratic-formula', '02-discriminant', '03-completing-the-square', '04-linear-quadratic-systems', '05-quadratic-systems', '06-quadratic-inequalities'],
  videos: VIDEOS,
  dayPlan: {
    title: 'Solving quadratics in a day',
    sessions: [
      { name: 'Session 1', title: 'Formula, discriminant, complex numbers', lessons: [0, 1], hw: ['hw11', 'hw12'] },
      { name: 'Session 2', title: 'Changing forms and review', lessons: [2], hw: ['hw13', 'hw14'] },
      { name: 'Session 3', title: 'Systems', lessons: [3, 4], hw: ['hw16', 'hw17'] },
      { name: 'Session 4', title: 'Inequalities and review', lessons: [5], hw: ['hw18', 'hw19'] },
    ],
  },
}
export default unit2
