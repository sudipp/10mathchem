// Unit 5: Radical Expressions, plus the Fall Final Exam Review. Lessons, homework, videos, and the day plan.
// The class packet has no notes for this unit, so the lessons are built from HW #1.
import { MathLines } from '../../Visuals.jsx'
import { HOMEWORK } from './homework.js'
import VIDEOS from './videos.json'

const R = String.raw

const LESSONS = [
  {
    title: 'Simplifying radicals', short: 'Simplifying', tag: 'Pull the perfect squares out',
    intro: R`A square root is **simplified** when nothing under the root is a perfect square any more. You pull every perfect square out of the root: numbers and variables both.`,
    points: [
      ['Product property', R`$\sqrt{ab} = \sqrt a \cdot \sqrt b$. So split the number into **(biggest perfect square) × (what is left)**: $\sqrt{80} = \sqrt{16 \cdot 5} = 4\sqrt5$. Perfect squares to know: $4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144$.`],
      ['Even powers', R`Take **half** the exponent out: $\sqrt{x^4} = x^2$, $\sqrt{y^2} = y$, $\sqrt{m^{10}} = m^5$. (In this unit every variable is positive, so you never need $|x|$.)`],
      ['Odd powers', R`Split off **one** copy, which stays inside: $\sqrt{x^3} = \sqrt{x^2 \cdot x} = x\sqrt x$, and $\sqrt{x^5} = x^2\sqrt x$.`],
      ['Check yourself', R`Look under the root: no perfect-square factor (like $4$ or $9$) and no exponent of $2$ or more means you are done.`],
    ],
    steps: [
      R`Simplify $6\sqrt{80x^4y^2}$ (HW #1, problem 1).`,
      R`**Number:** the biggest perfect square that divides $80$ is $16$: $80 = 16 \cdot 5$.`,
      R`**Variables:** $x^4$ and $y^2$ have even exponents, so they come out halved: $x^2$ and $y$.`,
      R`**Pull them out:** $6 \cdot \sqrt{16} \cdot x^2 \cdot y \cdot \sqrt5 = 6 \cdot 4x^2y\sqrt5$.`,
      R`**Multiply the outside:** $24x^2y\sqrt5$. Only the $5$ is left inside, and it has no perfect-square factor ✓.`,
    ],
    visual: step => <MathLines step={step} lines={[R`6\sqrt{80x^4y^2}`, R`6\sqrt{16 \cdot 5 \cdot x^4 \cdot y^2}`, R`\sqrt{x^4} = x^2,\quad \sqrt{y^2} = y`, R`6 \cdot 4x^2y\sqrt5`, R`24x^2y\sqrt5`]} />,
    question: R`Simplify $\sqrt{72x^3}$.`,
    options: [R`$6x\sqrt{2x}$`, R`$36x\sqrt{2x}$`, R`$6x^2\sqrt{2}$`], correct: 0,
    explanation: R`$72 = 36 \cdot 2$, so $\sqrt{36} = 6$ comes out. $x^3 = x^2 \cdot x$, so one $x$ comes out and one stays: $6x\sqrt{2x}$.`,
    video: 'uggD8mwglyc', videoTitle: 'Simplifying square roots',
    more: [['3MijXB91DVo', 'Simplifying square-root expressions'], ['NuccqpiUHrk', 'Simplifying cube roots (two variables)']],
    watch: 'Watch how he hunts for the biggest perfect square first.',
    homework: 'hw1',
  },
  {
    title: 'Multiplying radicals', short: 'Multiplying', tag: 'Outside times outside, inside times inside',
    intro: R`To multiply radicals, multiply the numbers **outside** together and the numbers **inside** together, then simplify the new root.`,
    points: [
      ['The rule', R`$a\sqrt b \cdot c\sqrt d = ac\sqrt{bd}$. For example $2\sqrt5 \cdot \sqrt5 = 2\sqrt{25} = 10$. A root times itself is the number inside: $\sqrt5 \cdot \sqrt5 = 5$.`],
      ['Simplify at the end', R`After multiplying, look for perfect squares again: $\sqrt5 \cdot \sqrt{10} = \sqrt{50} = 5\sqrt2$, and $-5\sqrt{5x^3} \cdot \sqrt{3x^2} = -5\sqrt{15x^5} = -5x^2\sqrt{15x}$.`],
      ['Distribute', R`A radical times a sum works just like $a(b + c)$: multiply it by **each** term. Then simplify each term on its own. Terms combine only if the parts under the root match exactly (like terms).`],
    ],
    steps: [
      R`Simplify $\sqrt{15x}\left(\sqrt{10} + 4\sqrt{3x}\right)$ (HW #1, problem 16).`,
      R`**Distribute** $\sqrt{15x}$ to both terms: $\sqrt{15x}\cdot\sqrt{10} + 4\sqrt{15x}\cdot\sqrt{3x}$.`,
      R`**Multiply inside the roots:** $\sqrt{150x} + 4\sqrt{45x^2}$.`,
      R`**Simplify each:** $150 = 25 \cdot 6$, so $\sqrt{150x} = 5\sqrt{6x}$. And $45x^2 = 9x^2 \cdot 5$, so $4\sqrt{45x^2} = 4 \cdot 3x\sqrt5 = 12x\sqrt5$.`,
      R`**Answer:** $5\sqrt{6x} + 12x\sqrt5$. The roots ($6x$ and $5$) differ, so these are not like terms.`,
    ],
    visual: step => <MathLines step={step} lines={[R`\sqrt{15x}\left(\sqrt{10} + 4\sqrt{3x}\right)`, R`\sqrt{15x}\cdot\sqrt{10} + 4\sqrt{15x}\cdot\sqrt{3x}`, R`\sqrt{150x} + 4\sqrt{45x^2}`, R`5\sqrt{6x} + 4 \cdot 3x\sqrt5`, R`5\sqrt{6x} + 12x\sqrt5`]} />,
    question: R`Simplify $3\sqrt2 \cdot 4\sqrt6$.`,
    options: [R`$12\sqrt{12}$`, R`$24\sqrt3$`, R`$7\sqrt8$`], correct: 1,
    explanation: R`Outside: $3 \cdot 4 = 12$. Inside: $2 \cdot 6 = 12$, and $\sqrt{12} = 2\sqrt3$. So $12 \cdot 2\sqrt3 = 24\sqrt3$. ($12\sqrt{12}$ is right but not simplified.)`,
    video: 'sBvRJUwXJPo', videoTitle: 'Multiply and simplify a radical expression',
    more: [['yAH3722GrP8', 'Multiplying binomials with radicals']],
    watch: 'Notice that he simplifies the root at the very end.',
    homework: 'hw1',
  },
  {
    title: 'Dividing radicals and rationalizing', short: 'Dividing', tag: 'No roots left in the denominator',
    intro: R`To divide radicals, put everything under **one** root and simplify the fraction. A simplified answer never has a square root in the denominator, so you **rationalize** it away.`,
    points: [
      ['Quotient property', R`$\dfrac{\sqrt a}{\sqrt b} = \sqrt{\dfrac ab}$. Reduce the fraction inside first: $\dfrac{5\sqrt{20}}{\sqrt{125}} = 5\sqrt{\dfrac{20}{125}} = 5\sqrt{\dfrac{4}{25}} = 5 \cdot \dfrac25 = 2$.`],
      ['Rationalize', R`If a root is left on the bottom, multiply the top **and** bottom by that root (this is multiplying by $1$): $\dfrac{5}{\sqrt3} \cdot \dfrac{\sqrt3}{\sqrt3} = \dfrac{5\sqrt3}{3}$, because $\sqrt3 \cdot \sqrt3 = 3$.`],
      ['With variables', R`Cancel variables inside the single root first, then rationalize: $\sqrt{\dfrac{4y}{5}} = \dfrac{2\sqrt y}{\sqrt5} = \dfrac{2\sqrt{5y}}{5}$.`],
    ],
    steps: [
      R`Simplify $\dfrac{\sqrt{16x^3y^2}}{\sqrt{20x^3y}}$ (HW #1, problem 22).`,
      R`**One root:** $\sqrt{\dfrac{16x^3y^2}{20x^3y}}$.`,
      R`**Reduce inside:** $\dfrac{16}{20} = \dfrac45$; $x^3$ cancels; $\dfrac{y^2}{y} = y$. So it is $\sqrt{\dfrac{4y}{5}} = \dfrac{2\sqrt y}{\sqrt5}$.`,
      R`**Rationalize:** multiply top and bottom by $\sqrt5$: $\dfrac{2\sqrt y \cdot \sqrt5}{\sqrt5 \cdot \sqrt5} = \dfrac{2\sqrt{5y}}{5}$.`,
      R`**Answer:** $\dfrac{2\sqrt{5y}}{5}$. There is no root in the denominator ✓.`,
    ],
    visual: step => <MathLines step={step} lines={[R`\dfrac{\sqrt{16x^3y^2}}{\sqrt{20x^3y}}`, R`\sqrt{\dfrac{16x^3y^2}{20x^3y}}`, R`\sqrt{\dfrac{4y}{5}} = \dfrac{2\sqrt y}{\sqrt5}`, R`\dfrac{2\sqrt y}{\sqrt5}\cdot\dfrac{\sqrt5}{\sqrt5}`, R`\dfrac{2\sqrt{5y}}{5}`]} />,
    question: R`Rationalize $\dfrac{6}{\sqrt2}$.`,
    options: [R`$3\sqrt2$`, R`$6\sqrt2$`, R`$\dfrac{\sqrt6}{2}$`], correct: 0,
    explanation: R`$\dfrac{6}{\sqrt2}\cdot\dfrac{\sqrt2}{\sqrt2} = \dfrac{6\sqrt2}{2} = 3\sqrt2$.`,
    video: 'gY5TvlHg4Vk', videoTitle: 'How to rationalize a denominator',
    watch: 'See why multiplying by √3 / √3 does not change the value.',
    homework: 'hw1',
  },
]
const HW_FOR = { 0: 'hw1', 1: 'hw1', 2: 'hw1' }

// Bookshelf in learning order (Khan Academy).
const SHELF = [
  [['uggD8mwglyc', 'Simplifying square roots'], ['3MijXB91DVo', 'Simplifying square-root expressions'], ['NuccqpiUHrk', 'Simplifying cube roots (two variables)']],
  [['sBvRJUwXJPo', 'Multiply and simplify a radical expression'], ['yAH3722GrP8', 'Multiplying binomials with radicals']],
  [['gY5TvlHg4Vk', 'How to rationalize a denominator']],
]

const unit5 = {
  number: 5,
  slug: 'unit-5',
  title: 'Radical Expressions',
  short: 'Radicals',
  course: 'Accelerated Math II/III',
  summary: 'Simplifying, multiplying, and dividing square roots and rationalizing denominators, plus the full Fall Final Exam Review (linear equations, conics, polynomials, quadratics, and complex numbers).',
  hero: { title: 'Pull out the squares.', em: 'Keep the rest inside.', text: 'Simplify, multiply, and rationalize radicals.', sub: 'Then review the whole fall semester for the final.', side: 'EVERY ROOT HIDES A PERFECT SQUARE.' },
  path: { title: 'From roots to', em: 'the final.' },
  lessons: LESSONS,
  homework: HOMEWORK,
  hwFor: HW_FOR,
  shelf: SHELF,
  videoIds: [],
  videos: VIDEOS,
  dayPlan: {
    title: 'Radicals and the final in a day',
    sessions: [
      { name: 'Session 1', title: 'Simplify, multiply, divide', lessons: [0, 1, 2], hw: ['hw1'] },
      { name: 'Session 2', title: 'Fall final review: lines, conics, polynomials', lessons: [], hw: ['rev1'] },
      { name: 'Session 3', title: 'Fall final review: quadratics and complex numbers', lessons: [], hw: ['rev2'] },
    ],
  },
}
export default unit5
