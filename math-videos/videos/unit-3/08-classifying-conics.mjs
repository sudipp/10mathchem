// Unit 3, Lesson 8 video script: classifying conics. Based on Day 7 notes (Classifying Conics, Example 1 A–D).
const R = String.raw

export default {
  id: '08-classifying-conics',
  tag: 'UNIT 3 · LESSON 8 · CLASSIFYING CONICS',
  chapters: ['Slicing a cone', 'General form', 'The rules', 'Your turn', 'Recap'],
  layouts: {
    turn: { type: 'conic', conic: { kind: 'circle', h: 1, k: -2, r2: 5 } },
  },
  scenes: [
    {
      ch: 0, say: 'Circle, parabola, ellipse, or hyperbola? You can tell which one an equation is before doing any algebra.',
      view: { kind: 'title', kicker: 'UNIT 3 · LESSON 8', title: 'Classifying', em: 'conics', sub: 'Which one is it?' },
    },
    {
      ch: 0, say: 'All four shapes come from slicing a double cone with a flat plane. [[1]]Slice straight across, and you get a circle. [[2]]Tilt the slice, and you get an ellipse. [[3]]Tilt it to match the side of the cone, and you get a parabola. [[4]]Slice through both cones, and you get a hyperbola.',
      view: { kind: 'cards', title: 'Conic sections', cards: [
        { head: 'Circle', text: 'straight across', at: 1 },
        { head: 'Ellipse', text: 'tilted', at: 2 },
        { head: 'Parabola', text: 'parallel to the side', at: 3 },
        { head: 'Hyperbola', text: 'through both cones', at: 4, dark: true },
      ] },
    },
    {
      ch: 1, say: 'Every one of them can be written as A x squared plus C y squared plus D x plus E y plus F equals zero. [[1]]Only A and C, the numbers in front of x squared and y squared, decide the shape.',
      view: { kind: 'lines', lines: [
        { tex: R`{\color{#CC5833}A}x^2 + {\color{#CC5833}C}y^2 + Dx + Ey + F = 0`, big: true },
        { tex: R`\text{only } A \text{ and } C \text{ decide the shape}`, at: 1, box: true },
      ] },
    },
    {
      ch: 2, say: '[[1]]If A equals C, it is a circle. [[2]]If one of them is zero, only one variable is squared, so it is a parabola. [[3]]If A and C have the same sign but are different numbers, it is an ellipse. [[4]]If they have different signs, it is a hyperbola.',
      view: { kind: 'table', title: 'The rules', rows: [
        { left: 'A = C', right: 'circle', at: 1 },
        { left: 'AC = 0', right: 'parabola: only one squared', at: 2 },
        { left: 'AC > 0', right: 'ellipse: same signs', at: 3 },
        { left: 'AC < 0', right: 'hyperbola: different signs', at: 4 },
      ] },
    },
    {
      ch: 2, say: 'Let us try four. [[1]]Four x squared minus nine x plus y minus five: there is no y squared, so it is a parabola. [[2]]Four x squared minus y squared, and so on: different signs, so a hyperbola. [[3]]Two x squared plus four y squared: same sign, different numbers, so an ellipse. [[4]]Two x squared plus two y squared: equal, so a circle.',
      view: { kind: 'lines', lines: [
        { tex: R`4x^2 - 9x + y - 5 = 0 \;\Rightarrow\; AC = 0:\ \textbf{parabola}`, at: 1 },
        { tex: R`4x^2 - y^2 + 8x + 6y + 4 = 0 \;\Rightarrow\; AC < 0:\ \textbf{hyperbola}`, at: 2 },
        { tex: R`2x^2 + 4y^2 - 4x + 12y = 0 \;\Rightarrow\; AC > 0:\ \textbf{ellipse}`, at: 3 },
        { tex: R`2x^2 + 2y^2 - 4x + 12y - 6 = 0 \;\Rightarrow\; A = C:\ \textbf{circle}`, at: 4, glow: true },
      ] },
    },
    {
      ch: 3, say: 'Your turn! Classify three x squared plus three y squared minus six x plus twelve y equals zero. Then find its center and radius.',
      countdown: 12,
      view: { kind: 'try', tex: R`3x^2 + 3y^2 - 6x + 12y = 0`, hint: ['Compare A and C', 'Divide by 3', 'Complete the square'] },
    },
    {
      ch: 3, say: '[[1]]A equals C equals three, so it is a circle. [[2]]Divide by three and complete the square: x minus one, squared, plus y plus two, squared, equals five. [[3]]The center is one, minus two, and the radius is root five. Perfect!',
      view: { kind: 'conic', layout: 'turn', title: R`3x^2 + 3y^2 - 6x + 12y = 0`, reveal: [['center', 3], ['curve', 3]], side: [{ tex: R`A = C = 3:\ \text{circle}`, at: 1 }, { tex: R`(x - 1)^2 + (y + 2)^2 = 5`, at: 2 }, { tex: R`(1, -2),\ r = \sqrt5`, at: 3, strong: true }] },
    },
    {
      ch: 4, say: 'Recap. [[1]]Write it as A x squared plus C y squared, and so on, equals zero. [[2]]A equals C: circle. One of them zero: parabola. [[3]]Same signs: ellipse. Different signs: hyperbola. [[4]]Then use that conic’s steps to graph it.',
      view: { kind: 'recap', items: [
        { tex: R`Ax^2 + Cy^2 + Dx + Ey + F = 0`, at: 1 },
        { text: 'A = C: circle. AC = 0: parabola.', at: 2 },
        { text: 'Same signs: ellipse. Different signs: hyperbola.', at: 3 },
        { text: 'Then complete the square and graph.', at: 4 },
      ] },
    },
    {
      ch: 4, say: 'That is all of Unit 3: conic sections! Now try the homework help, one step at a time. You have got this!',
      view: { kind: 'title', kicker: 'YOU DID IT · UNIT 3', title: 'Conics,', em: 'done.', sub: 'Next: homework help, one step at a time' },
    },
  ],
}
