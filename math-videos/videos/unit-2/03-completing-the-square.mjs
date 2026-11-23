// Unit 2, Lesson 3 video script: changing forms and completing the square. Based on Day 13 notes (Examples 1, 5, 9) and HW #13.
const R = String.raw
const O = '#CC5833'

export default {
  id: '03-completing-the-square',
  tag: 'UNIT 2 · LESSON 3 · COMPLETING THE SQUARE',
  chapters: ['Three forms', 'To standard', 'To vertex', 'Solving', 'Your turn', 'Recap'],
  layouts: {
    ex: { type: 'plane', window: [-3, 7, -8, 4], tex: R`y = 2(x - 2)^2 - 7`, items: [
      { key: 'curve', kind: 'fn', f: x => 2 * x * x - 8 * x + 1 },
      { key: 'v', kind: 'dots', pts: [[2, -7]], style: 'vertex', labels: true },
    ] },
  },
  scenes: [
    {
      ch: 0, say: 'Every quadratic can be written in three forms. Today you’ll learn to move between them, especially into vertex form by completing the square.',
      view: { kind: 'title', kicker: 'UNIT 2 · LESSON 3', title: 'Completing', em: 'the square', sub: 'Move between standard, vertex, and intercept form.' },
    },
    {
      ch: 0, say: '[[1]]To get standard form, expand. [[2]]To get intercept form, factor. [[3]]To get vertex form, complete the square.',
      view: { kind: 'cards', cards: [
        { head: '→ Standard', text: 'expand', at: 1 },
        { head: '→ Intercept', text: 'factor', at: 2 },
        { head: '→ Vertex', text: 'complete the square', at: 3, dark: true },
      ] },
    },
    {
      ch: 1, say: 'Expand y equals two times x plus three, squared, plus five. [[1]]Square the binomial: x squared plus six x plus nine. [[2]]Distribute the two: two x squared plus twelve x plus eighteen. [[3]]Add five: two x squared plus twelve x plus twenty-three.',
      view: { kind: 'lines', lines: [
        { tex: R`y = 2(x + 3)^2 + 5` },
        { tex: R`(x + 3)^2 = x^2 + 6x + 9`, at: 1 },
        { tex: R`2x^2 + 12x + 18`, at: 2 },
        { tex: R`y = 2x^2 + 12x + 23`, at: 3, glow: true },
      ] },
    },
    {
      ch: 2, say: 'Now the other way: put y equals two x squared minus eight x plus one in vertex form. [[1]]Factor two out of the x terms. [[2]]Half of negative four is negative two; squared, that’s four. Add and subtract four inside. [[3]]Factor the perfect square. The minus four comes out times two: minus eight. [[4]]Combine: two times x minus two, squared, minus seven.',
      view: { kind: 'lines', lines: [
        { tex: R`y = 2(x^2 - 4x) + 1`, at: 1 },
        { tex: R`y = 2(x^2 - 4x + {\color{${O}}4} - {\color{${O}}4}) + 1`, at: 2 },
        { tex: R`y = 2(x - 2)^2 - 8 + 1`, at: 3 },
        { tex: R`y = 2(x - 2)^2 - 7`, at: 4, glow: true },
      ] },
    },
    {
      ch: 2, say: '[[1]]The vertex is two comma negative seven. You can check: negative b over two a is eight over four, which is two.',
      view: { kind: 'plane', layout: 'ex', reveal: [['curve', 0], ['v', 1]], side: [{ tex: R`\text{vertex } (2, -7)`, at: 1, strong: true }, { tex: R`-\tfrac{b}{2a} = \tfrac{8}{4} = 2\ \checkmark`, at: 1 }] },
    },
    {
      ch: 3, say: 'Completing the square also solves equations. Solve x squared minus twelve x plus five equals zero. [[1]]Move the five: x squared minus twelve x equals negative five. [[2]]Half of negative twelve is negative six; squared, thirty-six. Add it to both sides. [[3]]Factor: x minus six, squared, equals thirty-one. [[4]]Square root both sides: x equals six plus or minus root thirty-one.',
      view: { kind: 'lines', lines: [
        { tex: R`x^2 - 12x = -5`, at: 1 },
        { tex: R`x^2 - 12x + 36 = -5 + 36`, at: 2 },
        { tex: R`(x - 6)^2 = 31`, at: 3 },
        { tex: R`x = 6 \pm \sqrt{31}`, at: 4, glow: true },
      ] },
    },
    {
      ch: 4, say: 'Your turn! What number completes the square for x squared plus ten x?',
      countdown: 10,
      view: { kind: 'try', tex: R`x^2 + 10x + \underline{\quad}`, hint: ['Half of b', 'Then square it'] },
    },
    {
      ch: 4, say: '[[1]]Half of ten is five. [[2]]Five squared is twenty-five, so x squared plus ten x plus twenty-five is x plus five, squared.',
      view: { kind: 'lines', lines: [
        { tex: R`\tfrac{10}{2} = 5`, at: 1 },
        { tex: R`x^2 + 10x + 25 = (x + 5)^2`, at: 2, glow: true },
      ] },
    },
    {
      ch: 5, say: 'Recap. [[1]]Expand for standard form; factor for intercept form. [[2]]Complete the square: half of b, squared, added and subtracted. [[3]]When a isn’t one, factor it out first, and remember the number you pull out gets multiplied by a.',
      view: { kind: 'recap', items: [
        { text: 'Expand → standard. Factor → intercept.', at: 1 },
        { text: 'Complete the square: (b/2)².', at: 2 },
        { text: 'Factor out a first; what comes out is × a.', at: 3 },
      ] },
    },
    {
      ch: 5, say: 'Next up: systems with a line and a parabola. See you there!',
      view: { kind: 'title', kicker: 'UP NEXT · LESSON 4', title: 'Line + parabola', em: 'systems', sub: 'Where the graphs meet' },
    },
  ],
}
