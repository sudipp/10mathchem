// Lesson 6 video script. Based on Day 7 notes (Zero Product Property, Example 5A) and HW #7 #17, #18, #23.
const R = String.raw
const O = '#CC5833'

export default {
  id: '06-solving',
  tag: 'UNIT 4 · LESSON 6 · SOLVING EQUATIONS',
  chapters: ['Zero product', 'Example', 'Complex roots', 'Formula', 'Your turn', 'Recap'],
  scenes: [
    {
      ch: 0, say: 'To solve a polynomial equation, you’ll use everything so far: get zero on one side, factor, and find every root.',
      view: { kind: 'title', kicker: 'UNIT 4 · LESSON 6', title: 'Solving', em: 'polynomial equations', sub: 'Factor, then set each piece to zero.' },
    },
    {
      ch: 0, say: 'The key is the Zero Product Property. [[1]]If two things multiply to zero, one of them must be zero. [[2]]It works for any number of factors.',
      view: { kind: 'lines', title: 'Zero Product Property', lines: [{ tex: R`AB = 0 \ \Rightarrow\ A = 0 \text{ or } B = 0`, at: 1, box: true }, { tex: R`ABCD = 0 \ \Rightarrow\ A = 0 \text{ or } B = 0 \text{ or } C = 0 \text{ or } D = 0`, at: 2 }] },
    },
    {
      ch: 1, say: 'Solve three x cubed plus nineteen x squared plus twenty x equals zero. [[1]]Take out the common factor, x. [[2]]Factor what’s left into three x plus four, times x plus five. [[3]]Set each factor to zero: x is zero, minus four thirds, or minus five.',
      view: { kind: 'lines', lines: [
        { tex: R`3x^3 + 19x^2 + 20x = 0` },
        { tex: R`{\color{${O}}x}(3x^2 + 19x + 20) = 0`, at: 1 },
        { tex: R`x(3x + 4)(x + 5) = 0`, at: 2 },
        { tex: R`x = 0,\ \ -\frac{4}{3},\ \ -5`, at: 3, glow: true },
      ] },
    },
    {
      ch: 2, say: 'Sometimes the answers aren’t real numbers. Solve two y to the fifth minus eighteen y equals zero. [[1]]Factor out two y. [[2]]y to the fourth minus nine is a difference of squares. [[3]]So y is zero, or plus or minus root three. [[4]]And y squared equals minus three gives plus or minus i root three.',
      view: { kind: 'lines', lines: [
        { tex: R`2y^5 - 18y = 0` },
        { tex: R`2y(y^4 - 9) = 0`, at: 1 },
        { tex: R`2y(y^2 - 3)(y^2 + 3) = 0`, at: 2 },
        { tex: R`y = 0,\ \ \pm\sqrt{3}`, at: 3 },
        { tex: R`y^2 = -3 \Rightarrow y = \pm i\sqrt{3}`, at: 4, glow: true },
      ] },
    },
    {
      ch: 2, say: 'Count them: [[1]]degree five means five roots in total, [[2]]counting the complex ones. One, two, three, four, five!',
      view: { kind: 'lines', lines: [{ tex: R`\text{degree } 5 \ \Rightarrow\ 5 \text{ roots}`, at: 1, box: true }, { tex: R`0,\quad \sqrt{3},\quad -\sqrt{3},\quad i\sqrt{3},\quad -i\sqrt{3}`, at: 2, big: true }] },
    },
    {
      ch: 3, say: 'When a quadratic piece won’t factor, use the quadratic formula. [[1]]x to the fourth plus sixty-four x is x, times x cubed plus sixty-four: a sum of cubes. [[2]]That gives x, times x plus four, times x squared minus four x plus sixteen. [[3]]The quadratic formula on that last piece [[4]]gives two plus or minus two i root three.',
      view: { kind: 'lines', lines: [
        { tex: R`x^4 + 64x = 0` },
        { tex: R`x(x^3 + 64) = 0`, at: 1 },
        { tex: R`x(x + 4)(x^2 - 4x + 16) = 0`, at: 2 },
        { tex: R`x = \dfrac{4 \pm \sqrt{16 - 64}}{2} = \dfrac{4 \pm 4i\sqrt{3}}{2}`, at: 3 },
        { tex: R`x = 0,\ -4,\ 2 \pm 2i\sqrt{3}`, at: 4, glow: true },
      ] },
    },
    {
      ch: 4, say: 'Your turn! Solve three x cubed minus five x squared plus two x equals zero.',
      countdown: 10,
      view: { kind: 'try', tex: R`3x^3 - 5x^2 + 2x = 0`, hint: ['GCF', 'Factor', 'Each factor = 0'] },
    },
    {
      ch: 4, say: '[[1]]Factor out x. [[2]]Then three x squared minus five x plus two is three x minus two, times x minus one. [[3]]So x is zero, two thirds, or one.',
      view: { kind: 'lines', lines: [
        { tex: R`x(3x^2 - 5x + 2) = 0`, at: 1 },
        { tex: R`x(3x - 2)(x - 1) = 0`, at: 2 },
        { tex: R`x = 0,\ \ \frac{2}{3},\ \ 1`, at: 3, glow: true },
      ] },
    },
    {
      ch: 5, say: 'Recap. [[1]]Get zero on one side. [[2]]Factor completely, GCF first. [[3]]Set each factor to zero. [[4]]If a piece won’t factor, use the quadratic formula, and expect complex roots.',
      view: { kind: 'recap', items: [
        { text: 'Get 0 on one side.', at: 1 },
        { text: 'Factor completely (GCF first).', at: 2 },
        { text: 'Zero Product Property: each factor = 0.', at: 3 },
        { tex: R`\text{Stuck? } x = \dfrac{-b \pm \sqrt{b^2 - 4ac}}{2a}`, at: 4 },
      ] },
    },
    {
      ch: 5, say: 'Next up: function operations and composition. See you there!',
      view: { kind: 'title', kicker: 'UP NEXT · LESSON 7', title: 'Function', em: 'operations', sub: 'Combine functions, and put one inside another' },
    },
  ],
}
