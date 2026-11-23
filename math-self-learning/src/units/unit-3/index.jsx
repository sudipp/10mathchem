// Unit 3: Conic Sections. Lessons, homework, videos, and the day plan.
// Each lesson has a narrated video (math-videos/videos/unit-3) plus a Khan Academy video.
import { MathLines } from '../../Visuals.jsx'
import { ConicGraph } from '../../ConicGraph.jsx'
import { HOMEWORK } from './homework.js'
import VIDEOS from './videos.json'

const R = String.raw
const HIDE = { curve: false, center: false, vertices: false, coVertices: false, foci: false, asymptotes: false, box: false, directrix: false, focus: false }

const CIRCLE_EX = { kind: 'circle', h: 5, k: -2, r2: 12 }
const PARA_EX = { kind: 'parabola', vertical: true, a: [-1, 4], h: 1, k: 1 }
const PARA_WRITE = { kind: 'parabola', vertical: false, a: [1, 8], h: 0, k: 2 }
const ELL_EX = { kind: 'ellipse', h: -3, k: 1, X2: 4, Y2: 1 }
const ELL_WRITE = { kind: 'ellipse', h: 0, k: 0, X2: 36, Y2: 32 }
const HYP_EX = { kind: 'hyperbola', h: 2, k: 3, X2: 16, Y2: 25, vertical: true }
const HYP_WRITE = { kind: 'hyperbola', h: 2, k: 0, X2: 27, Y2: 9, vertical: true }

const LESSONS = [
  {
    title: 'Circles', short: 'Circles', tag: 'Center and radius',
    intro: R`A **circle** is every point that is the same distance (the **radius** $r$) from a fixed point (the **center**). Its equation tells you both, once it is in standard form.`,
    points: [
      ['Standard form', R`$(x - h)^2 + (y - k)^2 = r^2$. The center is $(h, k)$: use the **opposite signs** of the numbers inside the parentheses. The radius is the **square root** of the right side: $(x - 5)^2 + (y + 3)^2 = 9$ has center $(5, -3)$ and radius $3$.`],
      ['From general form', R`If it looks like $x^2 + y^2 - 10x + 4y + 17 = 0$, **group** the $x$ terms and the $y$ terms, move the number to the right, and **complete the square** for each: add $\left(\tfrac{b}{2}\right)^2$ to **both** sides. If $x^2$ and $y^2$ have a coefficient other than 1, divide everything by it first.`],
      ['Graphing', R`Plot the center, then four convenient points one radius away: right, left, up, and down. Connect them with a smooth circle.`],
    ],
    steps: [
      R`Start with $x^2 + y^2 - 10x + 4y + 17 = 0$. $x^2$ and $y^2$ have the same coefficient, so it is a **circle**.`,
      R`**Group** and move the number: $(x^2 - 10x) + (y^2 + 4y) = -17$.`,
      R`**Complete the square:** half of $-10$ is $-5$ (square: $25$); half of $4$ is $2$ (square: $4$). Add both to each side: $(x - 5)^2 + (y + 2)^2 = 12$.`,
      R`**Center** $(5, -2)$, **radius** $\sqrt{12} = 2\sqrt3 \approx 3.5$. Plot the center and the points one radius away, then draw the circle.`,
    ],
    visual: step => step < 3
      ? <MathLines step={step} lines={[R`x^2 + y^2 - 10x + 4y + 17 = 0`, R`(x^2 - 10x) + (y^2 + 4y) = -17`, R`(x^2 - 10x + 25) + (y^2 + 4y + 4) = -17 + 25 + 4`]} />
      : <ConicGraph conic={CIRCLE_EX} label="Circle with center (5, −2) and radius 2√3" />,
    question: R`What are the center and radius of $(x + 3)^2 + (y - 1)^2 = 25$?`,
    options: [R`$(3, -1)$, $r = 25$`, R`$(-3, 1)$, $r = 5$`, R`$(-3, 1)$, $r = 25$`], correct: 1,
    explanation: R`Use the opposite signs: $x + 3$ means $h = -3$ and $y - 1$ means $k = 1$. The right side is $r^2 = 25$, so $r = 5$.`,
    video: 'thDrJvWNI8M', videoTitle: 'Graphing a circle from its standard equation', more: [['eyUn7e6nZZ0', 'Features of a circle from its expanded equation'], ['XyDMsotfJhE', 'Completing the square to write equation in standard form of a circle']],
    watch: 'Notice how the signs inside the parentheses flip to give the center.',
    homework: 'hw1',
  },
  {
    title: 'Parabolas: focus and directrix', short: 'Parabolas', tag: 'Vertex, focus, and directrix',
    intro: R`A **parabola** is every point that is the same distance from a fixed point (the **focus**) and a fixed line (the **directrix**). The vertex sits exactly halfway between them.`,
    points: [
      ['Vertex form', R`$y = a(x - h)^2 + k$ opens **up** ($a > 0$) or **down** ($a < 0$), with axis of symmetry $x = h$. $x = a(y - k)^2 + h$ opens **right** ($a > 0$) or **left** ($a < 0$), with axis $y = k$. The vertex is $(h, k)$ either way.`],
      [R`$p = \tfrac{1}{4a}$`, R`$p$ is the distance from the vertex to the focus. The **focus** is $p$ units from the vertex **inside** the curve: $(h, k + p)$ or $(h + p, k)$. The **directrix** is $p$ units the other way: $y = k - p$ or $x = h - p$.`],
      ['From general form', R`**Solve for the variable that is not squared**, then complete the square: $x^2 - 2x + 4y - 3 = 0$ becomes $y = -\tfrac14(x - 1)^2 + 1$. Make a small table of points on one side of the axis and reflect them.`],
    ],
    steps: [
      R`Start with $x^2 - 2x + 4y - 3 = 0$. Only $x$ is squared, so it is a **parabola** that opens up or down.`,
      R`**Solve for $y$:** $4y = -x^2 + 2x + 3$, so $y = -\tfrac14x^2 + \tfrac12x + \tfrac34$.`,
      R`**Complete the square:** $y = -\tfrac14(x^2 - 2x + 1) + \tfrac34 + \tfrac14 = -\tfrac14(x - 1)^2 + 1$.`,
      R`**Vertex** $(1, 1)$. $a = -\tfrac14 < 0$, so it opens **down**, with axis of symmetry $x = 1$.`,
      R`$p = \dfrac{1}{4a} = -1$. **Focus** $(1, 0)$ (1 unit down, inside the curve). **Directrix** $y = 2$ (1 unit up).`,
    ],
    visual: step => step < 3
      ? <MathLines step={step} lines={[R`x^2 - 2x + 4y - 3 = 0`, R`y = -\tfrac14x^2 + \tfrac12x + \tfrac34`, R`y = -\tfrac14(x - 1)^2 + 1`]} />
      : <ConicGraph conic={PARA_EX} show={step === 3 ? { focus: false, directrix: false, axis: true } : { axis: true }} label="Parabola with vertex (1, 1), focus (1, 0), and directrix y = 2" />,
    question: R`Which way does $x = -2(y - 1)^2 + 3$ open?`,
    options: ['Up', 'Left', 'Right'], correct: 1,
    explanation: R`$y$ is squared, so it opens left or right. $a = -2 < 0$, so it opens **left**.`,
    video: 'pe8Dm_FUpdU', videoTitle: 'Focus and directrix introduction', more: [['02h9yhc7ruc', 'Completing the square for vertex form'], ['IbI-l7mbKO4', 'Finding the vertex of a parabola example']],
    watch: 'Check that a point on the parabola really is the same distance from the focus and the directrix.',
    homework: 'hw2',
  },
  {
    title: 'Writing equations of circles and parabolas', short: 'Writing equations I', tag: 'Work backwards from the clues',
    intro: R`Now go the other way: from a center, a radius, a focus, or a directrix to the equation. Sketching the clues on a grid first usually shows the answer.`,
    points: [
      ['Circles', R`You need the center $(h, k)$ and $r^2$. Area $\pi r^2$ or circumference $2\pi r$ gives $r$. A point on the circle or a tangent line gives $r$ as a distance. The ends of a diameter give the center (midpoint) and $r$ (half the length).`],
      ['Parabolas', R`Find the **vertex** (it is halfway between the focus and the directrix), the **direction** (toward the focus, away from the directrix), and $p$ (vertex to focus). Then $a = \dfrac{1}{4p}$.`],
      ['Through a point', R`If you know the vertex and one point, write $y = a(x - h)^2 + k$ (or the $x =$ version), plug in the point, and solve for $a$.`],
    ],
    steps: [
      R`Write the parabola with **focus** $(2, 2)$ and **directrix** $x = -2$. Plot them first.`,
      R`The **vertex** is halfway between the focus and the directrix: $\left(\tfrac{2 + (-2)}{2},\ 2\right) = (0, 2)$.`,
      R`The focus is to the **right** of the vertex, so it opens right: $x = a(y - 2)^2 + 0$. $p = 2 - 0 = 2$.`,
      R`$a = \dfrac{1}{4p} = \dfrac18$, so $x = \tfrac18(y - 2)^2$.`,
    ],
    visual: step => <ConicGraph conic={PARA_WRITE} window={[-6, 6, -4, 8]} show={[{ ...HIDE, focus: true, directrix: true }, { ...HIDE, focus: true, directrix: true, center: true }, { ...HIDE, focus: true, directrix: true, center: true, axis: true }, { axis: true }][step]} label="Parabola with focus (2, 2) and directrix x = −2" />,
    question: R`A parabola has vertex $(0, 0)$ and focus $(0, 3)$. What is $a$?`,
    options: ['3', R`$\tfrac{1}{12}$`, '12'], correct: 1,
    explanation: R`$p = 3$ (vertex to focus), so $a = \dfrac{1}{4p} = \dfrac{1}{12}$, and the equation is $y = \tfrac{1}{12}x^2$.`,
    video: 'okXVhDMuGFg', videoTitle: 'Equation for parabola from focus and directrix', more: [['iX5UgArMyiI', 'Writing standard equation of a circle'], ['JvDpYlyKkNU', 'Radius and center for a circle equation in standard form']],
    watch: 'Watch how the distance-to-focus = distance-to-directrix idea turns into an equation.',
    homework: 'hw3',
  },
  {
    title: 'Ellipses', short: 'Ellipses', tag: 'Center, vertices, co-vertices, foci',
    intro: R`An **ellipse** is every point whose distances to two fixed points (the **foci**) **add up** to the same number. It looks like a stretched circle, and its standard form tells you exactly how far it stretches each way.`,
    points: [
      ['Standard form', R`$\dfrac{(x - h)^2}{a^2} + \dfrac{(y - k)^2}{b^2} = 1$ (horizontal) or $\dfrac{(x - h)^2}{b^2} + \dfrac{(y - k)^2}{a^2} = 1$ (vertical). $a^2$ is always the **larger** denominator, and it is under the direction of the **major axis**. The right side must be **1**.`],
      ['Vertices and co-vertices', R`From the center $(h, k)$, the **vertices** are $a$ units along the major axis and the **co-vertices** are $b$ units along the minor axis. The major axis has length $2a$; the minor axis has length $2b$.`],
      ['Foci', R`The foci lie on the major axis, $c$ units from the center, with $c^2 = a^2 - b^2$. They are always **inside** the ellipse.`],
    ],
    steps: [
      R`Start with $x^2 + 4y^2 + 6x - 8y + 9 = 0$. $x^2$ and $y^2$ have different coefficients with the same sign: an **ellipse**.`,
      R`**Group** and factor out the $y^2$ coefficient: $(x^2 + 6x) + 4(y^2 - 2y) = -9$.`,
      R`**Complete the square.** Inside the second group you add 1, but it is multiplied by 4, so add 4 to the right: $(x + 3)^2 + 4(y - 1)^2 = -9 + 9 + 4 = 4$.`,
      R`**Divide by 4** so the right side is 1: $\dfrac{(x + 3)^2}{4} + \dfrac{(y - 1)^2}{1} = 1$.`,
      R`**Center** $(-3, 1)$. The larger denominator, 4, is under $x$: horizontal, $a = 2$, $b = 1$. Vertices $(-1, 1)$ and $(-5, 1)$; co-vertices $(-3, 2)$ and $(-3, 0)$.`,
      R`**Foci:** $c^2 = a^2 - b^2 = 3$, so $c = \sqrt3$: $(-3 \pm \sqrt3,\ 1)$.`,
    ],
    visual: step => step < 4
      ? <MathLines step={step} lines={[R`x^2 + 4y^2 + 6x - 8y + 9 = 0`, R`(x^2 + 6x) + 4(y^2 - 2y) = -9`, R`(x + 3)^2 + 4(y - 1)^2 = 4`, R`\dfrac{(x + 3)^2}{4} + \dfrac{(y - 1)^2}{1} = 1`]} />
      : <ConicGraph conic={ELL_EX} show={step === 4 ? { foci: false } : {}} label="Ellipse with center (−3, 1), a = 2, b = 1" />,
    question: R`For $\dfrac{x^2}{9} + \dfrac{y^2}{25} = 1$, which is the major axis?`,
    options: ['Horizontal', 'Vertical', 'Neither: it is a circle'], correct: 1,
    explanation: R`The larger denominator, 25, is under $y$, so the major axis is **vertical** ($a = 5$, vertices $(0, \pm5)$).`,
    video: 'lvAYFUIEpFI', videoTitle: 'Conic sections: Intro to ellipse', more: [['QR2vxfwiHAU', 'Foci of an ellipse']],
    watch: 'Look for which denominator is bigger: that is the direction the ellipse stretches.',
    homework: 'hw4',
  },
  {
    title: 'Writing equations of ellipses', short: 'Writing equations II', tag: 'Find the center, then a and b',
    intro: R`To write an ellipse's equation you need three things: the **center**, $a^2$ (major axis), and $b^2$ (minor axis). Every clue gives you one of them.`,
    points: [
      ['Center first', R`The center is the **midpoint** of the vertices, of the co-vertices, or of the foci. The direction of the vertices (or foci) from the center tells you whether the major axis is horizontal or vertical.`],
      [R`Find $a$, $b$, and $c$`, R`$a$ = center to vertex (half the major axis). $b$ = center to co-vertex (half the minor axis). $c$ = center to focus. If you only know two, use $c^2 = a^2 - b^2$ to get the third.`],
      ['Through a point', R`If you know $a^2$ but not $b^2$, plug the point into the standard form and solve for $b^2$. You can also use the definition: the distances from any point to the two foci add up to $2a$.`],
    ],
    steps: [
      R`Write the ellipse with **vertices** $(\pm6, 0)$ and **foci** $(\pm2, 0)$. Plot them first.`,
      R`The **center** is the midpoint, $(0, 0)$. The vertices are left and right, so it is **horizontal**: $a = 6$, $a^2 = 36$.`,
      R`$c = 2$, so $b^2 = a^2 - c^2 = 36 - 4 = 32$. The co-vertices are $(0, \pm\sqrt{32})$.`,
      R`$\dfrac{x^2}{36} + \dfrac{y^2}{32} = 1$.`,
    ],
    visual: step => <ConicGraph conic={ELL_WRITE} show={[{ ...HIDE, vertices: true, foci: true }, { ...HIDE, vertices: true, foci: true, center: true }, { ...HIDE, vertices: true, foci: true, center: true, coVertices: true }, {}][step]} label="Ellipse with vertices (±6, 0) and foci (±2, 0)" />,
    question: R`Vertices $(0, \pm5)$ and foci $(0, \pm3)$. What is $b^2$?`,
    options: ['16', '34', '4'], correct: 0,
    explanation: R`$a = 5$ and $c = 3$, so $b^2 = a^2 - c^2 = 25 - 9 = 16$. The equation is $\dfrac{x^2}{16} + \dfrac{y^2}{25} = 1$.`,
    video: 'pae1hExrc5o', videoTitle: 'Writing the equation of an ellipse from graph', more: [['_JrQF8Rkaio', 'Ellipse standard equation from graph']],
    watch: 'Find the center before anything else, then count to the vertices and co-vertices.',
    homework: 'hw5',
  },
  {
    title: 'Hyperbolas', short: 'Hyperbolas', tag: 'Two branches and their asymptotes',
    intro: R`A **hyperbola** is every point whose distances to two foci have the same **difference**. It has two branches that bend away from each other and hug two straight lines, the **asymptotes**.`,
    points: [
      ['Standard form', R`$\dfrac{(x - h)^2}{a^2} - \dfrac{(y - k)^2}{b^2} = 1$ opens **left and right**; $\dfrac{(y - k)^2}{a^2} - \dfrac{(x - h)^2}{b^2} = 1$ opens **up and down**. $a^2$ is under the **positive** term (it does not have to be the larger number).`],
      ['Vertices and the box', R`The vertices are $a$ units from the center along the transverse axis. Go $b$ units the other way and draw a dashed **box** through those points. The asymptotes are the diagonals of the box.`],
      ['Asymptotes and foci', R`Asymptote slopes are $\pm\tfrac{b}{a}$ (horizontal) or $\pm\tfrac{a}{b}$ (vertical), through the center: $y - k = \pm m(x - h)$. The foci are $c$ units from the center with $c^2 = a^2 + b^2$, so they are outside the box.`],
    ],
    steps: [
      R`$\dfrac{(y - 3)^2}{25} - \dfrac{(x - 2)^2}{16} = 1$: the **$y$ term is positive**, so it opens up and down. **Center** $(2, 3)$.`,
      R`$a^2 = 25$, so $a = 5$: **vertices** 5 up and down from the center, $(2, 8)$ and $(2, -2)$.`,
      R`$b^2 = 16$, so $b = 4$: go 4 left and right of the center and draw the dashed **box**.`,
      R`The **asymptotes** are the box's diagonals: slope $\pm\tfrac{a}{b} = \pm\tfrac54$, so $y - 3 = \pm\tfrac54(x - 2)$.`,
      R`Draw each **branch** from a vertex, bending toward the asymptotes without touching them.`,
      R`**Foci:** $c^2 = a^2 + b^2 = 41$, so $c = \sqrt{41} \approx 6.4$: $(2, 3 \pm \sqrt{41})$, outside the box.`,
    ],
    visual: step => <ConicGraph conic={HYP_EX} window={[-8, 12, -7, 13]} show={[
      { ...HIDE, center: true },
      { ...HIDE, center: true, vertices: true },
      { ...HIDE, center: true, vertices: true, box: true, coVertices: true },
      { ...HIDE, center: true, vertices: true, box: true, coVertices: true, asymptotes: true },
      { foci: false },
      {},
    ][step]} label="Hyperbola with center (2, 3), opening up and down" />,
    question: R`Which way does $\dfrac{x^2}{4} - \dfrac{y^2}{9} = 1$ open?`,
    options: ['Up and down', 'Left and right', 'It is an ellipse'], correct: 1,
    explanation: R`The $x$ term is the positive one, so it opens **left and right**, even though 9 is bigger than 4.`,
    video: 'pzSyOTkAsY4', videoTitle: 'Conic sections: Intro to hyperbolas', more: [['S0Fd2Tg2v7M', 'Foci of a hyperbola']],
    watch: 'Watch how the asymptotes come from the box built with a and b.',
    homework: 'hw6',
  },
  {
    title: 'Writing equations of hyperbolas', short: 'Writing equations III', tag: 'Center, a, b, and c² = a² + b²',
    intro: R`Writing a hyperbola's equation works just like an ellipse: find the **center**, the **direction**, $a^2$, and $b^2$. The one big difference: for a hyperbola, $c^2 = a^2 + b^2$.`,
    points: [
      ['Center and direction', R`The center is the midpoint of the vertices or the foci. If they are left and right of the center, the $x$ term comes first (positive); if above and below, the $y$ term does.`],
      [R`$c^2 = a^2 + b^2$`, R`$a$ = center to vertex, $c$ = center to focus. For a hyperbola $c$ is the **largest**, so $b^2 = c^2 - a^2$.`],
      ['Asymptotes or a point', R`Asymptote slopes give $\tfrac{b}{a}$ (horizontal) or $\tfrac{a}{b}$ (vertical). A point on the curve can be plugged in to solve for $b^2$, or use the definition: the difference of its distances to the foci is $2a$.`],
    ],
    steps: [
      R`Write the hyperbola with **foci** $(2, \pm6)$ and **vertices** $(2, \pm3)$. Plot them.`,
      R`The **center** is the midpoint, $(2, 0)$. They are above and below it, so it opens up and down: the $y$ term is positive.`,
      R`$a = 3$ and $c = 6$, so $b^2 = c^2 - a^2 = 36 - 9 = 27$.`,
      R`$\dfrac{y^2}{9} - \dfrac{(x - 2)^2}{27} = 1$.`,
    ],
    visual: step => <ConicGraph conic={HYP_WRITE} window={[-10, 14, -12, 12]} show={[{ ...HIDE, vertices: true, foci: true }, { ...HIDE, vertices: true, foci: true, center: true }, { ...HIDE, vertices: true, foci: true, center: true, box: true, coVertices: true, asymptotes: true }, {}][step]} label="Hyperbola with foci (2, ±6) and vertices (2, ±3)" />,
    question: R`Vertices $(\pm3, 0)$ and foci $(\pm5, 0)$. What is $b^2$?`,
    options: ['16', '34', '4'], correct: 0,
    explanation: R`For a hyperbola $b^2 = c^2 - a^2 = 25 - 9 = 16$, so $\dfrac{x^2}{9} - \dfrac{y^2}{16} = 1$.`,
    video: 'hl58vTCqVIY', videoTitle: 'Conic sections: Hyperbolas 2', more: [['NGKCekLhErg', 'Identifying if an ellipse or hyperbola exists from given key features']],
    watch: 'Compare with ellipses: which of a and c is bigger here?',
    homework: 'hw7',
  },
  {
    title: 'Classifying conics', short: 'Classifying conics', tag: 'Which conic is it?',
    intro: R`Circles, parabolas, ellipses, and hyperbolas are all **conic sections**: the shapes you get by slicing a double cone with a plane. You can tell which one an equation is before doing any algebra.`,
    points: [
      ['General form', R`Every conic here can be written $Ax^2 + Cy^2 + Dx + Ey + F = 0$. Only $A$ and $C$ (the $x^2$ and $y^2$ coefficients) decide the shape.`],
      ['The rules', R`**Circle:** $A = C$. **Parabola:** $AC = 0$ (only one variable is squared). **Ellipse:** $AC > 0$ ($A$ and $C$ have the **same** sign, but $A \ne C$). **Hyperbola:** $AC < 0$ (**different** signs).`],
      ['Then graph it', R`Once you know the type, use that conic's steps: complete the square to get standard form, then read the center or vertex, the vertices, and the foci.`],
    ],
    steps: [
      R`$4x^2 - 9x + y - 5 = 0$: $A = 4$, $C = 0$, so $AC = 0$. Only $x$ is squared: **parabola**.`,
      R`$4x^2 - y^2 + 8x + 6y + 4 = 0$: $A = 4$, $C = -1$, so $AC < 0$: **hyperbola**.`,
      R`$2x^2 + 4y^2 - 4x + 12y = 0$: $A = 2$, $C = 4$, same sign but different: **ellipse**.`,
      R`$2x^2 + 2y^2 - 4x + 12y - 6 = 0$: $A = C = 2$: **circle**.`,
    ],
    visual: step => <MathLines step={step} lines={[R`4x^2 - 9x + y - 5 = 0 \;\Rightarrow\; AC = 0:\ \text{parabola}`, R`4x^2 - y^2 + 8x + 6y + 4 = 0 \;\Rightarrow\; AC < 0:\ \text{hyperbola}`, R`2x^2 + 4y^2 - 4x + 12y = 0 \;\Rightarrow\; AC > 0:\ \text{ellipse}`, R`2x^2 + 2y^2 - 4x + 12y - 6 = 0 \;\Rightarrow\; A = C:\ \text{circle}`]} />,
    question: R`Classify $3x^2 + 3y^2 - 6x + 12y = 0$.`,
    options: ['Ellipse', 'Circle', 'Hyperbola'], correct: 1,
    explanation: R`$A = C = 3$, so it is a **circle**. (Dividing by 3 and completing the square gives $(x - 1)^2 + (y + 2)^2 = 5$.)`,
    video: '0A7RR0oy2ho', videoTitle: 'Introduction to conic sections', more: [['LSJuu4Qm2qQ', 'Identifying an ellipse from equation'], ['cvA4VN1dpuY', 'Identifying a hyperbola from an equation']],
    watch: 'See how each conic is a different slice through the same double cone.',
    homework: 'hw8',
  },
]
const HW_FOR = { 0: 'hw1', 1: 'hw2', 2: 'hw3', 3: 'hw4', 4: 'hw5', 5: 'hw6', 6: 'hw7', 7: 'hw8' }

// Bookshelf in learning order (Khan Academy).
const SHELF = [
  [['6r1GQCxyMKI', 'Conic sections: Intro to circles'], ['thDrJvWNI8M', 'Graphing a circle from its standard equation'], ['JvDpYlyKkNU', 'Radius and center for a circle equation in standard form'], ['eyUn7e6nZZ0', 'Features of a circle from its expanded equation'], ['XyDMsotfJhE', 'Completing the square to write equation in standard form of a circle']],
  [['pe8Dm_FUpdU', 'Focus and directrix introduction'], ['02h9yhc7ruc', 'Completing the square for vertex form'], ['IbI-l7mbKO4', 'Finding the vertex of a parabola example']],
  [['iX5UgArMyiI', 'Writing standard equation of a circle'], ['okXVhDMuGFg', 'Equation for parabola from focus and directrix']],
  [['lvAYFUIEpFI', 'Conic sections: Intro to ellipse'], ['QR2vxfwiHAU', 'Foci of an ellipse']],
  [['pae1hExrc5o', 'Writing the equation of an ellipse from graph'], ['_JrQF8Rkaio', 'Ellipse standard equation from graph']],
  [['pzSyOTkAsY4', 'Conic sections: Intro to hyperbolas'], ['S0Fd2Tg2v7M', 'Foci of a hyperbola']],
  [['hl58vTCqVIY', 'Conic sections: Hyperbolas 2'], ['NGKCekLhErg', 'Identifying if an ellipse or hyperbola exists from given key features']],
  [['0A7RR0oy2ho', 'Introduction to conic sections'], ['LSJuu4Qm2qQ', 'Identifying an ellipse from equation'], ['cvA4VN1dpuY', 'Identifying a hyperbola from an equation']],
]

const unit3 = {
  number: 3,
  slug: 'unit-3',
  title: 'Conic Sections',
  short: 'Conics',
  course: 'Accelerated Math II/III',
  summary: 'Circles, parabolas, ellipses, and hyperbolas: completing the square, center, vertices, foci, directrix and asymptotes, writing equations from clues, and classifying conics.',
  hero: { title: 'Slice a cone.', em: 'Find a curve.', text: 'Circles, parabolas, ellipses, and hyperbolas.', sub: 'Complete the square, read the key features, and sketch.', side: 'EVERY CONIC STARTS AS ONE EQUATION.' },
  path: { title: 'From equations to', em: 'curves.' },
  lessons: LESSONS,
  homework: HOMEWORK,
  hwFor: HW_FOR,
  shelf: SHELF,
  videoIds: ['01-circles', '02-parabolas', '03-writing-circles-parabolas', '04-ellipses', '05-writing-ellipses', '06-hyperbolas', '07-writing-hyperbolas', '08-classifying-conics'],
  videos: VIDEOS,
  dayPlan: {
    title: 'Conics in a day',
    sessions: [
      { name: 'Session 1', title: 'Circles and parabolas', lessons: [0, 1], hw: ['hw1', 'hw2'] },
      { name: 'Session 2', title: 'Writing circles and parabolas', lessons: [2], hw: ['hw3'] },
      { name: 'Session 3', title: 'Ellipses', lessons: [3, 4], hw: ['hw4', 'hw5'] },
      { name: 'Session 4', title: 'Hyperbolas and classifying', lessons: [5, 6, 7], hw: ['hw6', 'hw7', 'hw8'] },
    ],
  },
}
export default unit3
