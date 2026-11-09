// Unit 4: Polynomial Functions. Lessons, homework, videos, and the day plan.
import { StandardForm } from './visuals.jsx'
import { FnGraph, FunctionMachine, Graph, LongDivisionView, MathLines, SignChart, SyntheticView } from '../../Visuals.jsx'
import { P, longDivide, qLatex, synthetic } from '../../poly.js'
import { inequality } from '../../extra.js'
import { HOMEWORK } from './homework.js'
import VIDEOS from './videos.json'

const R = String.raw

const LD = longDivide(P([2, 13, -7]), P([1, 6]))
const SYN = synthetic([1, -3, -7, 6], 4)
const RRT = synthetic([1, -4, -11, 30], 2)
const FTA1 = synthetic([1, 3, -8, -22, -24], 3)
const FTA2 = synthetic([1, 6, 10, 8], -4)
const IQ = inequality({ lhs: [2, -1, -32, 0], rhs: [-16], rel: '>=' })

const LESSONS = [
  {
    title: 'Polynomial basics', short: 'Naming polynomials', tag: 'Standard form, degree, and names',
    intro: R`A polynomial is a sum of terms like $3x^2$, $-5x$, and $7$. Before doing anything else with a polynomial, write it in standard form and name it by its degree and number of terms.`,
    points: [
      ['Standard form', R`Write the terms from the **highest degree** (exponent) to the lowest. In standard form, the highest degree goes first: $x^3 + 2 - 3x - 2x^2$ becomes $x^3 - 2x^2 - 3x + 2$.`],
      ['Name by degree', R`Degree 0: constant · 1: linear · 2: quadratic · 3: cubic · 4: quartic · 5: quintic · 6 and up: “sixth degree”, “seventh degree”, and so on.`],
      ['Name by number of terms', R`1 term: monomial · 2 terms: binomial · 3 terms: trinomial · 4 or more: “polynomial with $n$ terms”. So $7r^6 - 4r$ is a **sixth degree binomial**.`],
      ['Is it a polynomial?', R`Every exponent must be a **whole number** ($0, 1, 2, \dots$) and every coefficient a **real number**. $\pi x^2 + .45x^5 - \sqrt5\,x$ is a polynomial; $x^{-1} + x$ (negative exponent) and $12x + 5^x$ (variable in the exponent) are not. Combine like terms before naming: $4x - 6x + 5 = -2x + 5$ is a linear binomial.`],
    ],
    steps: [
      R`Here is $x^3 + 2 - 3x - 2x^2$ with its terms out of order. Under each term is its degree (its exponent).`,
      R`Find the highest degree: $x^3$ (degree 3) goes first.`,
      R`Next highest: $-2x^2$ (degree 2). Keep each term’s sign with it.`,
      R`Then $-3x$ (degree 1) and the constant $+2$ (degree 0).`,
      R`Standard form: $x^3 - 2x^2 - 3x + 2$. The degree is 3, so it is **cubic**, with 4 terms.`,
    ],
    visual: step => <StandardForm step={step} />,
    question: R`Name the polynomial $5x^2 - 3x^4 + 1$.`,
    options: ['Quadratic trinomial', 'Quartic trinomial', 'Quartic binomial'], correct: 1,
    explanation: R`In standard form it is $-3x^4 + 5x^2 + 1$: degree 4 (quartic) with 3 terms (trinomial).`,
    video: 'Vm7H0VTlIco', videoTitle: 'Polynomials intro', more: [['-6qiO49Q180', 'Analyzing polynomial manipulations']],
    watch: 'Listen for the words term, coefficient, and degree. You will use them in every lesson after this.',
  },
  {
    title: 'Zeros and linear factors', short: 'Zeros & factors', tag: 'Where the graph meets the x-axis',
    intro: R`The **zeros** of a polynomial are the $x$-values that make it equal $0$. On a graph, they are where the curve crosses or touches the x-axis. Factored form makes them easy to read.`,
    points: [
      ['Zero = root = x-intercept', R`To find the zeros: 1) write the polynomial in **factored form** (always look for a GCF to factor out first); 2) set each factor equal to $0$ and solve.`],
      ['Multiplicity', R`A repeated zero is a **multiple zero**. Its **multiplicity** is how many times its factor appears. Odd multiplicity: the graph **crosses** the x-axis. Even multiplicity: it **touches and bounces back**.`],
      ['Working backwards', R`Given the zeros, write one factor for each: zero $2$ → $(x - 2)$; zero $-\tfrac{3}{2}$ → $(2x + 3)$, which keeps the coefficients whole numbers. Multiply the factors to get standard form.`],
    ],
    steps: [
      R`This is $f(x) = (x - 1)(x + 1)(x + 3)^2$ from your Day 3 notes.`,
      R`$x - 1 = 0 \Rightarrow x = 1$. Multiplicity 1 (odd): the graph **crosses** the x-axis.`,
      R`$x + 1 = 0 \Rightarrow x = -1$. Multiplicity 1: it **crosses** again.`,
      R`$(x + 3)^2 = 0 \Rightarrow x = -3$. Multiplicity 2 (even): the graph **touches and bounces back**.`,
      R`Zeros: $1$, $-1$, and $-3$ (mult. 2). Total degree $1 + 1 + 2 = 4$.`,
    ],
    visual: step => <Graph poly={P([1, 6, 8, -6, -9])} window={[-5, 3, -12, 12]} show={{ zeros: step === 4, extrema: false }} highlight={[[], [1], [-1], [-3], []][step]} label="Graph of f(x) = (x − 1)(x + 1)(x + 3)²" />,
    question: R`Which zero of $f(x) = x(x - 2)^2$ makes the graph bounce off the x-axis?`,
    options: [R`$x = 0$`, R`$x = 2$`, 'Both of them'], correct: 1,
    explanation: R`$(x - 2)$ is squared, so $x = 2$ has multiplicity 2 (even): the graph touches and turns around. $x = 0$ has multiplicity 1, so the graph crosses there.`,
    video: '1ke_xceCevk', videoTitle: 'Zeros of polynomials (multiplicity)', more: [['EtzwLlkoAnM', 'Zeros of polynomials introduction']],
    watch: 'Watch what the graph does at a zero with an even multiplicity compared with an odd one.',
    homework: 'hw3',
  },
  {
    title: 'Polynomial long division', short: 'Long division', tag: 'Divide, multiply, subtract, bring down',
    intro: R`Dividing polynomials works just like long division with numbers. $15 \div 2 = 7$ remainder $1$, so $\tfrac{15}{2} = 7 + \tfrac{1}{2}$. For polynomials: $\dfrac{f(x)}{d(x)} = q(x) + \dfrac{r(x)}{d(x)}$.`,
    points: [
      ['The cycle', R`Repeat four moves: **Divide** the leading terms, **Multiply** the divisor by that answer, **Subtract** (change the signs and add), **Bring down** the next term. Stop when what is left has a lower degree than the divisor.`],
      ['Use placeholders', R`If a power is missing, write it with a $0$ coefficient: $x^3 - 12x^2 - 42$ becomes $x^3 - 12x^2 + 0x - 42$. This keeps the columns lined up.`],
      ['Remainder Theorem', R`If $f(x)$ is divided by $(x - k)$, the remainder is $f(k)$. If the remainder is $0$, then $(x - k)$ is a **factor** of $f(x)$.`],
    ],
    steps: [R`**Set up** $(2x^2 + 13x - 7) \div (x + 6)$ (Day 4, Example 1): divisor outside, dividend inside.`, ...LD.cycles.flatMap(c => c.explain), R`**Fraction form:** $${LD.answer}$.`],
    visual: step => <LongDivisionView r={LD} shown={Math.min(step, LD.cycles.length * 3)} />,
    question: R`You divide $f(x)$ by $x - 3$ and the remainder is $0$. What does that tell you?`,
    options: [R`$x - 3$ is a factor of $f(x)$`, R`$f(0) = 3$`, 'The quotient is 0'], correct: 0,
    explanation: R`By the Remainder Theorem, $f(3) = 0$, which means $(x - 3)$ divides evenly: it is a factor.`,
    video: '4u8_AMacu-Y', videoTitle: 'Algebraic long division', more: [['MwG6QD352yc', 'Polynomial remainder theorem'], ['3eowXt_LNbg', 'Polynomial division introduction']],
    watch: 'Pause after each “divide” step and predict the next term of the quotient before he writes it.',
    homework: 'hw4',
  },
  {
    title: 'Synthetic division', short: 'Synthetic division', tag: 'A shortcut for dividing by x − k',
    intro: R`Synthetic division is a fast way to divide by a **linear** divisor like $x - 4$ or $x + 2$. It only works with linear divisors, and it uses just the coefficients.`,
    points: [
      ['Set up', R`For a divisor $x - k$, put $k$ in the box. For $x + 2$, $k = -2$. Write the coefficients in standard form, with $0$ for any missing power.`],
      ['Bring down, multiply, add', R`Bring down the first coefficient. Multiply it by $k$, write the product under the next coefficient, and add. Repeat to the end.`],
      ['Read the answer', R`The last number is the **remainder**. The others are the quotient’s coefficients, starting **one degree lower** than $f(x)$. The remainder is also $f(k)$, so this is a fast way to evaluate $f(k)$.`],
    ],
    steps: [R`**Set up** $(x^3 - 3x^2 - 7x + 6) \div (x - 4)$ (Day 5, Example 1): $k = 4$, coefficients $1, -3, -7, 6$.`, ...SYN.steps, R`**Read the answer:** $${SYN.answer}$.`],
    visual: step => <SyntheticView r={SYN} shown={Math.min(step, 2 * SYN.coeffs.length - 1)} />,
    question: R`To divide by $x + 5$ with synthetic division, which number goes in the box?`,
    options: ['5', '−5', '1'], correct: 1,
    explanation: R`$x + 5 = x - (-5)$, so $k = -5$.`,
    video: '1byR9UEQJN0', videoTitle: 'Synthetic division', more: [['z7JiQ5etCZs', 'Intro to polynomial synthetic division'], ['-nlMXVrgtjw', 'Why synthetic division works']],
    watch: 'Notice that he only writes the coefficients. Compare each row with the long division version.',
    homework: 'hw5',
  },
  {
    title: 'Factoring higher-degree polynomials', short: 'Factoring', tag: 'Cubes, quadratic form, and grouping',
    intro: R`To factor polynomials with degree higher than 2, **always take out the GCF first**, then look for one of three patterns.`,
    points: [
      ['Sum and difference of cubes', R`$a^3 + b^3 = (a + b)(a^2 - ab + b^2)$ and $a^3 - b^3 = (a - b)(a^2 + ab + b^2)$. Remember **SOAP** for the signs: Same, Opposite, Always Positive.`],
      ['Quadratic form', R`If the exponents are 4 and 2 (like $u^4 + 9u^2 + 14$), let $w = u^2$. Factor $w^2 + 9w + 14 = (w + 2)(w + 7)$, then put $u^2$ back: $(u^2 + 2)(u^2 + 7)$.`],
      ['Grouping', R`With four terms, group them in pairs and factor each pair: $35m^3 + 7m^2 - 20m - 4 = 7m^2(5m + 1) - 4(5m + 1) = (7m^2 - 4)(5m + 1)$.`],
    ],
    steps: [
      R`Factor $x^3 + 27$ (Day 7, Example 1A). Two terms, a plus sign, and both are perfect cubes → **sum of cubes**.`,
      R`Write each term as a cube: $x^3 = (x)^3$ and $27 = 3^3$. So $a = x$ and $b = 3$.`,
      R`Use the pattern $a^3 + b^3 = (a + b)(a^2 - ab + b^2)$.`,
      R`Substitute $a = x$ and $b = 3$.`,
      R`Simplify. The quadratic part $x^2 - 3x + 9$ does not factor any further.`,
    ],
    visual: step => <MathLines step={step} lines={[
      R`x^3 + 27`,
      R`= {\color{#CC5833}x}^3 + {\color{#3d6b50}3}^3`,
      R`= (a + b)(a^2 - ab + b^2)`,
      R`= ({\color{#CC5833}x} + {\color{#3d6b50}3})\big({\color{#CC5833}x}^2 - {\color{#CC5833}x}\cdot{\color{#3d6b50}3} + {\color{#3d6b50}3}^2\big)`,
      R`= (x + 3)(x^2 - 3x + 9)`,
    ]} />,
    question: R`Factor $x^3 - 8$.`,
    options: [R`$(x - 2)(x^2 + 2x + 4)$`, R`$(x - 2)(x^2 - 2x + 4)$`, R`$(x - 2)^3$`], correct: 0,
    explanation: R`Difference of cubes with $a = x$, $b = 2$: $(a - b)(a^2 + ab + b^2)$. SOAP: Same sign, Opposite sign, Always Positive.`,
    video: 'Touv2APcBRw', videoTitle: 'Factoring sum of cubes', more: [['CxcP4ylUP5w', 'Difference of cubes factoring'], ['AUBX_aHStQY', 'Factoring higher degree polynomials'], ['rR4FfB-FZJw', 'Factor expressions by grouping']],
    watch: 'Find the a and b first, then plug them into the pattern. That is the whole trick.',
    homework: 'hw7',
  },
  {
    title: 'Solving polynomial equations', short: 'Solving equations', tag: 'Factor, then use zero products',
    intro: R`To solve a polynomial equation, get $0$ on one side, **factor completely**, and set each factor equal to $0$. A polynomial of degree $n$ has $n$ roots in total, counting complex roots and multiplicity.`,
    points: [
      ['Zero Product Property', R`If $AB = 0$, then $A = 0$ or $B = 0$. It works for any number of factors: if $ABCD = 0$, at least one of them is $0$.`],
      ['Complex roots', R`Sometimes a factor like $y^2 + 3 = 0$ has no real solution. Then $y^2 = -3$, so $y = \pm\sqrt{-3} = \pm i\sqrt3$. Write complex answers in $a + bi$ form.`],
      ['Quadratic formula when stuck', R`If a quadratic factor will not factor, use $x = \dfrac{-b \pm \sqrt{b^2 - 4ac}}{2a}$. For $x^2 - 4x + 16 = 0$ you get $x = 2 \pm 2i\sqrt3$.`],
    ],
    steps: [
      R`Solve $2y^5 - 18y = 0$ (Day 7, Example 5A). It already has $0$ on one side.`,
      R`**GCF:** both terms share $2y$.`,
      R`$y^4 - 9$ is a **difference of squares**: $(y^2)^2 - 3^2$.`,
      R`**Zero Product Property:** set each factor equal to $0$.`,
      R`Solve each one. $y^2 = -3$ gives the complex roots $\pm i\sqrt3$. Degree 5 → 5 roots in total.`,
    ],
    visual: step => <MathLines step={step} lines={[R`2y^5 - 18y = 0`, R`2y(y^4 - 9) = 0`, R`2y(y^2 - 3)(y^2 + 3) = 0`, R`2y = 0 \qquad y^2 - 3 = 0 \qquad y^2 + 3 = 0`, R`y = 0,\ \pm\sqrt3,\ \pm i\sqrt3`]} />,
    question: R`How many roots (real and complex together) does $x^4 + 64x = 0$ have?`,
    options: ['2', '3', '4'], correct: 2,
    explanation: R`It has degree 4, so 4 roots: $0$, $-4$, and $2 \pm 2i\sqrt3$.`,
    video: '7y_2jQlnKag', videoTitle: 'Introduction to factoring higher degree polynomials', more: [['8TPofjGXDR4', 'Factoring sum of squares (complex numbers)']],
    watch: 'Each time a factor is found, ask: what value of x makes this factor zero?',
    homework: 'hw7',
  },
  {
    title: 'Function operations and composition', short: 'Function operations', tag: 'Add, multiply, and plug in',
    intro: R`You can add, subtract, multiply, and divide functions, and you can put one function inside another. These skills appear in HW #1, HW #2, and the HW #6 review.`,
    points: [
      ['Operations', R`$(f + g)(x) = f(x) + g(x)$ and $(f \cdot g)(x) = f(x) \cdot g(x)$. When subtracting, put the **whole** second function in parentheses: $h(n) - g(n) = (-2n + 2) - (n^2 + 1)$. For $\left(\tfrac{f}{g}\right)(x) = \dfrac{f(x)}{g(x)}$, remember $g(x) \ne 0$.`],
      ['Plugging in expressions', R`To find $g(-4t)$, replace every $a$ in $g(a)$ with $(-4t)$, **in parentheses**: $(-4t)^3 = -64t^3$, not $-4t^3$.`],
      ['Composition', R`$g(h(x))$, also written $(g \circ h)(x)$, means work **inside out**: find $h(x)$ first, then put that whole answer into $g$. Order matters: $(f \circ g)(x) \ne (g \circ f)(x)$. When both are polynomials, the domain is all real numbers.`],
    ],
    steps: [
      R`$g(x) = 3x - 3$ and $h(x) = x^3 - 2$. To find $g(h(x))$, start with the input $x$.`,
      R`The **inside** function goes first: $h$ turns $x$ into $x^3 - 2$.`,
      R`Now $g$ takes that whole expression as its input: replace $x$ in $3x - 3$ with $(x^3 - 2)$.`,
      R`Simplify: $3x^3 - 6 - 3 = 3x^3 - 9$. (This is HW #6, problem 11.)`,
      R`Check with a number: $h(2) = 6$, then $g(6) = 15$. And $3(2)^3 - 9 = 15$ ✓.`,
    ],
    visual: step => <FunctionMachine step={step} />,
    question: R`If $f(x) = x - 1$, what is $f(f(1))$?`,
    options: ['0', '−1', '1'], correct: 1,
    explanation: R`Inside first: $f(1) = 0$. Then $f(0) = -1$.`,
    video: 'wUNWjd4bMmw', videoTitle: 'Introduction to function composition', more: [['lxtlwnCV-HM', 'Evaluating composite functions']],
    watch: 'Watch the order: the function written on the inside is always used first.',
    homework: 'hw2',
  },
  {
    title: 'Solving by graphing', short: 'Solving by graphing', tag: 'Calculator zeros and completing the square',
    intro: R`Some polynomial equations won’t factor nicely. Then you can **graph** the polynomial and read its real zeros, or, for a quadratic, **complete the square** to get exact answers.`,
    points: [
      ['Real zeros live on the graph', R`The real solutions of $f(x) = 0$ are the x-intercepts of $y = f(x)$. Graph it and look for where it crosses or touches the x-axis. Complex roots never appear on the graph: a degree-4 polynomial that crosses twice has 2 real and 2 complex roots.`],
      ['Zeros on a TI-84', R`Press Y=, type $f(x)$, then GRAPH. Then **2nd → CALC → 2: zero**. Move left of a crossing and press ENTER (left bound), move right of it and press ENTER (right bound), then ENTER again to guess. Round to the nearest tenth. Repeat for each crossing.`],
      ['Completing the square', R`For $x^2 + bx = c$: add $\left(\tfrac{b}{2}\right)^2$ to both sides, write the left side as $\left(x + \tfrac{b}{2}\right)^2$, then take the square root ($\pm$!). If $x^2$ has a coefficient, divide everything by it first.`],
    ],
    steps: [
      R`Solve $x^4 - x^3 - 2x^2 - 1 = 0$ (HW #8, problem 2). It won’t factor nicely, so **graph** $y = x^4 - x^3 - 2x^2 - 1$.`,
      R`The real solutions are where the curve **crosses the x-axis**. There are two.`,
      R`TI-84: **2nd → CALC → zero**. Left bound, right bound, guess: $x \approx -1.2$.`,
      R`Repeat for the second crossing: $x \approx 2.1$. Degree 4, so the other **2 roots are complex** (not on the graph).`,
      R`Exact answers by **completing the square** (HW #8, problem 19): $n^2 - 10n - 40 = 5$. Move the constants: $n^2 - 10n = 45$.`,
      R`Half of $-10$ is $-5$, and $(-5)^2 = 25$. Add $25$ to both sides.`,
      R`The left side is a perfect square: $(n - 5)^2 = 70$.`,
      R`Square root of both sides (remember $\pm$): $n = 5 \pm \sqrt{70}$.`,
    ],
    visual: step => step < 4
      ? <Graph poly={P([1, -1, -2, 0, -1])} window={[-3, 3, -6, 6]} show={{ zeros: step >= 1, extrema: false }} highlight={[[], [], [-1.212], [2.075]][step]} label="Graph of y = x⁴ − x³ − 2x² − 1" />
      : <MathLines step={step - 4} lines={[R`n^2 - 10n - 40 = 5 \;\Rightarrow\; n^2 - 10n = 45`, R`n^2 - 10n + {\color{#CC5833}25} = 45 + {\color{#CC5833}25}`, R`(n - 5)^2 = 70`, R`n = 5 \pm \sqrt{70}`]} />,
    question: R`The graph of a degree-4 polynomial crosses the x-axis at exactly 2 points. How many of its roots are complex (not real)?`,
    options: ['0', '2', '4'], correct: 1,
    explanation: R`Degree 4 means 4 roots in all. 2 are real (the x-intercepts), so the other 2 are complex, and complex roots never show up on the graph.`,
    video: 'hlFhHN67ICE', videoTitle: 'Solving equations by graphing: graphing calculator',
    more: [['RxA8YMRF4M4', 'Find the zeros of a function using the TI-83/84 calculator', 'MySecretMathTutor'], ['bNQY0z76M5A', 'Solving quadratic equations by completing the square', 'Khan Academy']],
    watch: 'Have your graphing calculator ready and follow along with each key press.',
    homework: 'hw8',
  },
  {
    title: 'End behavior and graphing', short: 'End behavior', tag: 'Sketch a polynomial from its clues',
    intro: R`You can sketch any polynomial from a few clues: its **end behavior** (what the far left and right do), its **zeros**, and their **multiplicity**. Then a few test points fill in the shape.`,
    points: [
      ['End behavior', R`Only the degree $n$ and the leading coefficient $a_n$ matter. **Even** degree: both ends go the same way (up if $a_n > 0$, down if $a_n < 0$). **Odd** degree: the ends go opposite ways (down-left/up-right if $a_n > 0$, up-left/down-right if $a_n < 0$).`],
      ['Turning points', R`A degree-$n$ polynomial has **at most $n - 1$** turning points (hills and valleys). If it has $n$ distinct real zeros, it has **exactly** $n - 1$. A turning point higher than all nearby points is a relative maximum; lower is a relative minimum.`],
      ['Graphing step by step', R`1) End behavior. 2) Factored form. 3) x-intercepts (and the y-intercept $f(0)$). 4) Multiplicity: odd → **cross**, even → **bounce**. 5) Test points between and beyond the intercepts. 6) Connect them smoothly.`],
    ],
    steps: [
      R`Graph $f(x) = 3x^2 - 2x^3$ (Day 9, Example 3). **End behavior:** standard form is $-2x^3 + 3x^2$: odd degree, negative leading coefficient, so **up on the left, down on the right**.`,
      R`**Factored form:** take out $-x^2$: $f(x) = -x^2(2x - 3)$.`,
      R`**x-intercepts:** $x = 0$ and $x = \tfrac{3}{2}$. The y-intercept is $f(0) = 0$.`,
      R`**Multiplicity:** $x^2$ means $0$ has multiplicity 2 → **bounce**. $\tfrac{3}{2}$ has multiplicity 1 → **cross**.`,
      R`**Test points:** $f(-1) = 5$, $f(1) = 1$, $f(2) = -4$.`,
      R`**Connect** the points: up on the left, bounce at $0$, over a small hill, cross at $\tfrac{3}{2}$, then down on the right.`,
    ],
    visual: step => step < 5
      ? <MathLines step={step} lines={[R`f(x) = -2x^3 + 3x^2 \;\to\; \nwarrow\ \ \searrow`, R`f(x) = -x^2(2x - 3)`, R`x = 0,\quad x = \tfrac{3}{2};\quad f(0) = 0`, R`0:\ \text{mult. } 2 \to \text{bounce};\quad \tfrac{3}{2}:\ \text{mult. } 1 \to \text{cross}`, R`f(-1) = 5,\quad f(1) = 1,\quad f(2) = -4`]} />
      : <Graph poly={P([-2, 3, 0, 0])} window={[-2, 3, -6, 6]} show={{ zeros: true, extrema: false }} highlight={[0]} label="Graph of f(x) = 3x² − 2x³" />,
    question: R`What is the end behavior of $f(x) = -24x^{10} - \tfrac{3}{16}x^4 + 4x$?`,
    options: ['Both ends go up', 'Both ends go down', 'Down on the left, up on the right'], correct: 1,
    explanation: R`Degree 10 is even, so both ends go the same way. The leading coefficient $-24$ is negative, so both go down.`,
    video: 'tZKzaF28sOk', videoTitle: 'Polynomial end behavior',
    more: [['03Y76Q7tlSw', 'Polynomial end behavior example'], ['H-N4QpKJQoY', 'Solving polynomial functions using their graphs']],
    watch: 'Focus on the two clues that decide end behavior: the degree and the sign of the leading coefficient.',
    homework: 'hw9',
  },
  {
    title: 'The Rational Root Theorem', short: 'Rational Root Theorem', tag: 'A short list of zeros worth trying',
    intro: R`When a polynomial won’t factor by grouping, where do you even start? The **Rational Root Theorem** turns endless guessing into a short list of candidates. Test them, divide out the ones that work, and finish with a quadratic.`,
    points: [
      ['The theorem', R`If $f(x)$ has **integer coefficients**, every rational zero is $\dfrac{p}{q}$, where $p$ is a factor of the **constant** $a_0$ and $q$ is a factor of the **leading coefficient** $a_n$. List $\pm$ each $p$ over each $q$ and skip repeats. These are only **possible** zeros.`],
      ['Test, then divide', R`Plug candidates in (or use synthetic division) until $f(x) = 0$. That zero $k$ means $(x - k)$ is a factor: divide it out with **synthetic division**. Keep testing the quotient (zeros can repeat) until a quadratic is left, then factor it or use the quadratic formula.`],
      ['Shortcuts', R`If the constant is $0$, factor out $x$ first: $0$ is a zero. If one zero is given, divide by it right away. A quick graph shows which candidates look like x-intercepts, so you test those first.`],
    ],
    steps: [
      R`Find the rational zeros of $f(x) = x^3 - 4x^2 - 11x + 30$ (Day 10, Example 2). The constant is $30$ and the leading coefficient is $1$.`,
      R`$p$ = factors of $30$: $\pm1, \pm2, \pm3, \pm5, \pm6, \pm10, \pm15, \pm30$. $q$ = factors of $1$: $\pm1$.`,
      R`Test candidates: $f(1) = 16$ ✗, $f(-1) = 36$ ✗, $f(2) = 0$ ✓. So $x = 2$ is a zero.`,
      R`Divide by $(x - 2)$ with synthetic division. The remainder is $0$ and the quotient is $x^2 - 2x - 15$.`,
      R`Factor the quadratic: $x^2 - 2x - 15 = (x - 5)(x + 3)$.`,
      R`The rational zeros are $2,\ 5,\ -3$. The graph crosses the x-axis at exactly those points ✓.`,
    ],
    visual: step => step < 3
      ? <MathLines step={step} lines={[R`f(x) = x^3 - 4x^2 - 11x + 30`, R`\tfrac{p}{q}:\ \pm1,\ \pm2,\ \pm3,\ \pm5,\ \pm6,\ \pm10,\ \pm15,\ \pm30`, R`f(1) = 16\ \times \quad f(-1) = 36\ \times \quad f(2) = 0\ \checkmark`]} />
      : step === 3 ? <SyntheticView r={RRT} shown={99} />
        : step === 4 ? <MathLines step={1} lines={[R`x^2 - 2x - 15`, R`= (x - 5)(x + 3)`]} />
          : <Graph poly={P([1, -4, -11, 30])} window={[-5, 7, -40, 60]} show={{ zeros: true, extrema: false }} label="Graph of f(x) = x³ − 4x² − 11x + 30" />,
    question: R`Which number is **not** a possible rational zero of $f(x) = 2x^3 + x - 3$?`,
    options: [R`$\tfrac{3}{2}$`, R`$3$`, R`$\tfrac{2}{3}$`], correct: 2,
    explanation: R`$p$ comes from the constant $3$ ($\pm1, \pm3$) and $q$ from the leading coefficient $2$ ($\pm1, \pm2$). So the candidates are $\pm1, \pm3, \pm\tfrac12, \pm\tfrac32$. $\tfrac23$ has the numbers upside down.`,
    video: 'Y9fwl_qocJc', videoTitle: 'Applying the rational root theorem',
    more: [['x9lb_frpkH0', 'Finding zeros of polynomials (1 of 2)', 'Khan Academy'], ['Iaq7z7reznM', 'Finding all zeros using the rational zero theorem', 'The Organic Chemistry Tutor']],
    watch: 'Pause after each candidate list and check that you would have written the same p and q.',
    homework: 'hw10',
  },
  {
    title: 'Irrational and complex roots', short: 'Conjugate roots', tag: 'Roots that come in pairs',
    intro: R`In a polynomial with integer (rational) coefficients, irrational roots like $2 - \sqrt7$ and complex roots like $4 + 5i$ never show up alone. Their **conjugates** are always roots too. That lets you find missing roots and build a polynomial from its roots.`,
    points: [
      ['The two theorems', R`**Irrational Root Theorem:** if $a + \sqrt{b}$ is a root, so is $a - \sqrt{b}$. **Complex Root Theorem:** if $a + bi$ is a root, so is $a - bi$. Flip the sign of only the $\sqrt{\ }$ or $i$ part: the partner of $-4i$ is $4i$, and of $3 - \sqrt2$ is $3 + \sqrt2$.`],
      ['Building a polynomial', R`List **every** root, adding partners. Multiply each conjugate pair first: $\big(x - (a + bi)\big)\big(x - (a - bi)\big) = (x - a)^2 - (bi)^2$. The $\sqrt{\ }$ or $i$ disappears. A fraction root $\tfrac{3}{4}$ gives the factor $(4x - 3)$. Then multiply everything.`],
      ['Finding all roots', R`Use the Rational Root Theorem to find a rational root, divide it out, and use the **quadratic formula** on what is left. Irrational or complex answers come out as a conjugate pair. Complex roots never appear on the graph.`],
    ],
    steps: [
      R`Find a polynomial with integer coefficients and roots $-3$ and $1 + 2i$ (Day 11, Example 4).`,
      R`$1 + 2i$ is complex, so its conjugate $1 - 2i$ is also a root. All roots: $-3,\ 1 + 2i,\ 1 - 2i$ (degree 3).`,
      R`Write a factor for each root: $(x + 3)\big(x - (1 + 2i)\big)\big(x - (1 - 2i)\big)$.`,
      R`Multiply the conjugate pair first: $(x - 1)^2 - (2i)^2 = x^2 - 2x + 1 + 4 = x^2 - 2x + 5$.`,
      R`Multiply the rest: $(x + 3)(x^2 - 2x + 5) = x^3 + x^2 - x + 15$.`,
      R`Answer: $x^3 + x^2 - x + 15 = 0$. Every coefficient is an integer ✓.`,
    ],
    visual: step => <MathLines step={step} lines={[R`\text{roots: } -3,\ 1 + 2i`, R`\text{roots: } -3,\ 1 + 2i,\ {\color{#CC5833}1 - 2i}`, R`(x + 3)\big(x - (1 + 2i)\big)\big(x - (1 - 2i)\big)`, R`(x - 1)^2 - (2i)^2 = x^2 - 2x + 5`, R`(x + 3)(x^2 - 2x + 5) = x^3 + x^2 - x + 15`, R`x^3 + x^2 - x + 15 = 0`]} />,
    question: R`A polynomial with integer coefficients has the root $4 - \sqrt{3}$. Which number must also be a root?`,
    options: [R`$-4 + \sqrt{3}$`, R`$4 + \sqrt{3}$`, R`$4 - i\sqrt{3}$`], correct: 1,
    explanation: R`Flip only the sign of the $\sqrt{\ }$ part: the conjugate of $4 - \sqrt3$ is $4 + \sqrt3$. The real part $4$ stays the same.`,
    video: 'BZxZ_eEuJBM', videoTitle: 'Complex conjugates',
    more: [['9NhTVXhfqzU', 'Factoring polynomials using complex numbers', 'Khan Academy'], ['B9jXJ7uYYCM', 'Complex Conjugate Theorem: find all zeros', 'Math Tutorials']],
    watch: 'Watch what happens to the i when you multiply a number by its conjugate.',
    homework: 'hw11',
  },
  {
    title: 'The Fundamental Theorem of Algebra', short: 'Fundamental Theorem', tag: 'Degree n means exactly n zeros',
    intro: R`How many zeros should you be looking for? The **Fundamental Theorem of Algebra** answers that: a polynomial of degree $n$ has exactly $n$ complex zeros. Then you find them with everything you already know.`,
    points: [
      ['The theorem', R`If $f(x)$ has degree $n > 0$, then $f(x) = 0$ has at least one complex root. Divide it out and repeat: degree $n$ means **exactly $n$ complex zeros**, counting multiplicity. (Real numbers count as complex numbers too.)`],
      ['Counting real and imaginary zeros', R`Imaginary zeros come in conjugate pairs, so the number of **real** zeros is $n,\ n - 2,\ n - 4, \dots$ For degree 5: 5, 3, or 1 real zeros, and 0, 2, or 4 imaginary ones.`],
      ['Finding all of them', R`List the possible rational zeros $\tfrac{p}{q}$, test and divide (or divide by a **given** zero first: a complex given zero brings its conjugate, so divide by their quadratic). Finish with factoring, the quadratic formula, or $w = x^2$ for $ax^4 + bx^2 + c$.`],
    ],
    steps: [
      R`Find all zeros of $f(x) = x^4 + 3x^3 - 8x^2 - 22x - 24$ (Day 12, Example 1). Degree $4$, so there are exactly $4$ zeros.`,
      R`Possible rational zeros: $\pm1, \pm2, \pm3, \pm4, \pm6, \pm8, \pm12, \pm24$.`,
      R`$f(3) = 0$ ✓. Synthetic division by $(x - 3)$ leaves $x^3 + 6x^2 + 10x + 8$.`,
      R`Test the cubic: $x = -4$ works. Divide again: $x^2 + 2x + 2$.`,
      R`Quadratic formula: $x = \dfrac{-2 \pm \sqrt{4 - 8}}{2} = -1 \pm i$.`,
      R`All four zeros: $3,\ -4,\ -1 + i,\ -1 - i$. The graph shows only the 2 real ones ✓.`,
    ],
    visual: step => step < 2
      ? <MathLines step={step} lines={[R`\text{degree } 4 \Rightarrow 4 \text{ zeros}`, R`\pm1,\ \pm2,\ \pm3,\ \pm4,\ \pm6,\ \pm8,\ \pm12,\ \pm24`]} />
      : step === 2 ? <SyntheticView r={FTA1} shown={99} />
        : step === 3 ? <SyntheticView r={FTA2} shown={99} />
          : step === 4 ? <MathLines step={1} lines={[R`x^2 + 2x + 2 = 0`, R`x = -1 \pm i`]} />
            : <Graph poly={P([1, 3, -8, -22, -24])} window={[-5.5, 4.5, -70, 50]} show={{ zeros: true, extrema: false }} label="Graph of f(x) = x⁴ + 3x³ − 8x² − 22x − 24" />,
    question: R`How many complex zeros does $f(x) = x^5 - 2x + 7$ have?`,
    options: ['1', '3', '5'], correct: 2,
    explanation: R`The degree is $5$, so there are exactly $5$ complex zeros (counting multiplicity). Some may be real; the imaginary ones come in pairs.`,
    video: 'd8-LO6FCna0', videoTitle: 'Fundamental theorem of algebra',
    more: [['zNxEVaRbdus', 'Fundamental theorem of algebra for quadratic', 'Khan Academy'], ['Iaq7z7reznM', 'Finding all zeros using the rational zero theorem', 'The Organic Chemistry Tutor']],
    watch: 'Listen for why imaginary zeros always come in pairs.',
    homework: 'hw12',
  },
  {
    title: 'Polynomial inequalities', short: 'Inequalities', tag: 'Zeros split the number line',
    intro: R`To solve an inequality like $2x^3 - x^2 - 32x \ge -16$, find where the polynomial is zero. Those **critical points** split the number line into intervals, and the sign stays the same inside each one.`,
    points: [
      ['The four steps', R`1) Get $0$ on one side and find the **real** zeros (critical points). 2) Plot them on a number line: **open** circles for $<, >$, **closed** for $\le, \ge$. 3) Test one $x$-value in each interval to get its sign. 4) Write the answer in **interval notation**: $(\ )$ for open circles and $\pm\infty$, $[\ ]$ for closed.`],
      ['Even multiplicity', R`At a zero with even multiplicity, like $(x - 2)^2$, the graph **bounces**: the sign is the same on both sides. That can leave a single point, like $\{8\}$, as part of the answer for $\le$ or $\ge$.`],
      ['Special cases', R`$(x + 3)^2 > 0$ is true everywhere except $-3$: $(-\infty, -3) \cup (-3, \infty)$. $(x + 2)^2 \le 0$ only at $x = -2$: $\{-2\}$. $x^2 + 5x + 7 < 0$ has no real zeros and is always positive: no solution, $\varnothing$.`],
    ],
    steps: [
      R`Solve $2x^3 - x^2 - 32x \ge -16$ (Day 14, Example 1B). First get $0$ on one side: $2x^3 - x^2 - 32x + 16 \ge 0$.`,
      R`Factor by **grouping**: $x^2(2x - 1) - 16(2x - 1) = (x^2 - 16)(2x - 1) = (x - 4)(x + 4)(2x - 1)$.`,
      R`Critical points: $-4,\ \tfrac12,\ 4$. The inequality is $\ge$, so use **closed** circles.`,
      R`Test each interval: ${IQ.tests.map((t, i) => `$f(${qLatex(t)}) = ${qLatex(IQ.vals[i])}$`).join(', ')}. Signs: ${IQ.signs.map(s => s > 0 ? '+' : '−').join(', ')}.`,
      R`We want $\ge 0$: the positive intervals plus the zeros. **Answer:** $${IQ.answer}$.`,
    ],
    visual: step => step < 2
      ? <MathLines step={step} lines={[R`2x^3 - x^2 - 32x + 16 \ge 0`, R`(x - 4)(x + 4)(2x - 1) \ge 0`]} />
      : <SignChart pts={IQ.pts} signs={step >= 3 ? IQ.signs : IQ.signs.map(() => 0)} atoms={IQ.atoms} showSolution={step >= 4} />,
    question: R`Solve $(x - 1)(x + 2) < 0$.`,
    options: [R`$(-2,\ 1)$`, R`$(-\infty, -2) \cup (1, \infty)$`, R`$[-2,\ 1]$`], correct: 0,
    explanation: R`The critical points are $-2$ and $1$ (open circles, since it is $<$). Testing $x = 0$ gives $(-1)(2) = -2 < 0$, so the middle interval works: $(-2, 1)$.`,
    video: 'Fd5ys4PQ-aM', videoTitle: 'Solving polynomial inequalities', creator: 'The Organic Chemistry Tutor',
    more: [['idBbsanc8BQ', 'Solve a polynomial inequality using a table', 'MySecretMathTutor']],
    watch: 'Notice how he tests one number in each interval before writing the answer.',
    homework: 'hw14',
  },
  {
    title: 'Inverse functions', short: 'Inverse functions', tag: 'Undo what a function does',
    intro: R`An **inverse function** $f^{-1}$ undoes $f$: if $f$ sends $2$ to $5$, then $f^{-1}$ sends $5$ back to $2$. Every point $(x, y)$ becomes $(y, x)$, so the graph reflects over the line $y = x$.`,
    points: [
      ['Finding the inverse', R`**Switch $x$ and $y$, then solve for $y$.** For $f(x) = \dfrac{5 - 3x}{2}$: $x = \dfrac{5 - 3y}{2} \Rightarrow 2x = 5 - 3y \Rightarrow f^{-1}(x) = \dfrac{5 - 2x}{3}$. Undo roots with powers: $x = \sqrt[3]{y + 1} \Rightarrow x^3 = y + 1$.`],
      ['Checking with composition', R`$f$ and $g$ are inverses **only if** $f(g(x)) = x$ **and** $g(f(x)) = x$. So $(f \circ f^{-1})(652) = 652$ with no arithmetic. One counterexample (like $g(f(0)) \ne 0$) proves they are **not** inverses.`],
      ['Graphs and the horizontal line test', R`The graph of $f^{-1}$ is the reflection of $f$ over $y = x$. The domain of $f$ becomes the range of $f^{-1}$. If a **horizontal line** hits $f$ twice (like $y = x^2$), the inverse is not a function.`],
    ],
    steps: [
      R`Find the inverse of $f(x) = \dfrac{5 - 3x}{2}$ (Day 15, Example 2C). Write it as $y = \dfrac{5 - 3x}{2}$.`,
      R`**Switch** $x$ and $y$: $x = \dfrac{5 - 3y}{2}$.`,
      R`**Solve for $y$:** multiply by $2$: $2x = 5 - 3y$, so $3y = 5 - 2x$.`,
      R`$f^{-1}(x) = \dfrac{5 - 2x}{3}$.`,
      R`**Check:** $f(f^{-1}(x)) = \dfrac{5 - 3\cdot\frac{5 - 2x}{3}}{2} = \dfrac{5 - 5 + 2x}{2} = x$ ✓.`,
      R`**Graph:** $f$ and $f^{-1}$ are mirror images over the line $y = x$.`,
    ],
    visual: step => step < 5
      ? <MathLines step={step} lines={[R`y = \dfrac{5 - 3x}{2}`, R`x = \dfrac{5 - 3y}{2}`, R`2x = 5 - 3y \;\Rightarrow\; 3y = 5 - 2x`, R`f^{-1}(x) = \dfrac{5 - 2x}{3}`, R`f\big(f^{-1}(x)\big) = x\ \checkmark`]} />
      : <FnGraph curves={[{ f: x => (5 - 3 * x) / 2, label: 'f(x)' }, { f: x => (5 - 2 * x) / 3, label: 'f⁻¹(x)' }]} window={[-5, 5, -5, 5]} />,
    question: R`What is the inverse of $f(x) = 2x + 6$?`,
    options: [R`$f^{-1}(x) = \tfrac{x}{2} - 3$`, R`$f^{-1}(x) = 2x - 6$`, R`$f^{-1}(x) = \dfrac{1}{2x + 6}$`], correct: 0,
    explanation: R`Switch: $x = 2y + 6$. Solve: $2y = x - 6$, so $y = \tfrac{x}{2} - 3$. (Note: $f^{-1}$ is not the same as $\tfrac{1}{f}$.)`,
    video: 'W84lObmOp8M', videoTitle: 'Introduction to function inverses',
    more: [['8GEGnSEJA2s', 'Verifying inverse functions by composition', 'Khan Academy'], ['JBqYTuA_WgE', 'Finding inverse functions: radical', 'Khan Academy'], ['mPQCHmOxGlY', 'Function invertibility', 'Khan Academy']],
    watch: 'Watch how every input and output trade places.',
    homework: 'hw15',
  },
]
const HW_FOR = { 0: 'hw1', 1: 'hw3', 2: 'hw4', 3: 'hw5', 4: 'hw7', 5: 'hw7', 6: 'hw2', 7: 'hw8', 8: 'hw9', 9: 'hw10', 10: 'hw11', 11: 'hw12', 12: 'hw14', 13: 'hw15' }

// Bookshelf in learning order: lessons in class order, and within each
// lesson the introduction first, then the main skill, then extensions.
const SHELF = [
  [['Vm7H0VTlIco', 'Polynomials intro'], ['-6qiO49Q180', 'Analyzing polynomial manipulations']],
  [['EtzwLlkoAnM', 'Zeros of polynomials introduction'], ['1ke_xceCevk', 'Zeros of polynomials (multiplicity)']],
  [['3eowXt_LNbg', 'Polynomial division introduction'], ['4u8_AMacu-Y', 'Algebraic long division'], ['MwG6QD352yc', 'Polynomial remainder theorem']],
  [['z7JiQ5etCZs', 'Intro to polynomial synthetic division'], ['1byR9UEQJN0', 'Synthetic division'], ['-nlMXVrgtjw', 'Why synthetic division works']],
  [['7y_2jQlnKag', 'Introduction to factoring higher degree polynomials'], ['Touv2APcBRw', 'Factoring sum of cubes'], ['CxcP4ylUP5w', 'Difference of cubes factoring'], ['AUBX_aHStQY', 'Factoring higher degree polynomials (quadratic form)'], ['rR4FfB-FZJw', 'Factor expressions by grouping']],
  [['8TPofjGXDR4', 'Factoring sum of squares (complex roots)']],
  [['wUNWjd4bMmw', 'Introduction to function composition'], ['lxtlwnCV-HM', 'Evaluating composite functions']],
  [['hlFhHN67ICE', 'Solving equations by graphing: graphing calculator'], ['RxA8YMRF4M4', 'Find the zeros of a function using the TI-83/84 calculator', 'MySecretMathTutor'], ['bNQY0z76M5A', 'Solving quadratic equations by completing the square']],
  [['tZKzaF28sOk', 'Polynomial end behavior'], ['03Y76Q7tlSw', 'Polynomial end behavior example'], ['H-N4QpKJQoY', 'Solving polynomial functions using their graphs']],
  [['Y9fwl_qocJc', 'Applying the rational root theorem'], ['x9lb_frpkH0', 'Finding zeros of polynomials (1 of 2)'], ['Iaq7z7reznM', 'Finding all zeros using the rational zero theorem', 'The Organic Chemistry Tutor']],
  [['BZxZ_eEuJBM', 'Complex conjugates'], ['9NhTVXhfqzU', 'Factoring polynomials using complex numbers'], ['B9jXJ7uYYCM', 'Complex Conjugate Theorem: find all zeros', 'Math Tutorials']],
  [['d8-LO6FCna0', 'Fundamental theorem of algebra'], ['zNxEVaRbdus', 'Fundamental theorem of algebra for quadratic']],
  [['Fd5ys4PQ-aM', 'Solving polynomial inequalities', 'The Organic Chemistry Tutor'], ['idBbsanc8BQ', 'Solve a polynomial inequality using a table', 'MySecretMathTutor']],
  [['W84lObmOp8M', 'Introduction to function inverses'], ['8GEGnSEJA2s', 'Verifying inverse functions by composition'], ['JBqYTuA_WgE', 'Finding inverse functions: radical'], ['mPQCHmOxGlY', 'Function invertibility']],
]

const unit4 = {
  number: 4,
  slug: 'unit-4',
  title: 'Polynomial Functions',
  short: 'Polynomials',
  course: 'Accelerated Math II/III',
  summary: 'Standard form, zeros, long and synthetic division, factoring, solving equations, function operations, graphs, rational, irrational & complex roots, the Fundamental Theorem of Algebra, inequalities, and inverse functions.',
  hero: { title: 'Big equations.', em: 'Small steps.', text: 'Factor it, divide it, solve it.', sub: 'Every polynomial is just a few simple moves, one after another.', side: 'EVERY BIG PROBLEM IS A FEW SMALL STEPS.' },
  path: { title: 'From terms to', em: 'roots.' },
  lessons: LESSONS,
  homework: HOMEWORK,
  hwFor: HW_FOR,
  shelf: SHELF,
  videoIds: ['01-polynomial-basics', '02-zeros-factors', '03-long-division', '04-synthetic-division', '05-factoring', '06-solving', '07-function-operations', '08-solving-by-graphing', '09-end-behavior', '10-rational-roots', '11-conjugate-roots', '12-fundamental-theorem', '13-polynomial-inequalities', '14-inverse-functions'],
  videos: VIDEOS,
  dayPlan: {
    title: 'Polynomials in a day',
    sessions: [
      { name: 'Session 1', title: 'The basics', lessons: [0, 1], hw: ['hw1', 'hw3'] },
      { name: 'Session 2', title: 'Dividing polynomials', lessons: [2, 3], hw: ['hw4', 'hw5'] },
      { name: 'Session 3', title: 'Factor, solve, combine', lessons: [4, 5, 6], hw: ['hw7', 'hw2', 'hw6'] },
      { name: 'Session 4', title: 'Graphs and end behavior', lessons: [7, 8], hw: ['hw8', 'hw9'] },
      { name: 'Session 5', title: 'Finding every root', lessons: [9, 10], hw: ['hw10', 'hw11'] },
      { name: 'Session 6', title: 'Counting zeros, inequalities, inverses', lessons: [11, 12, 13], hw: ['hw12', 'hw13', 'hw14', 'hw15'] },
    ],
  },
}
export default unit4
