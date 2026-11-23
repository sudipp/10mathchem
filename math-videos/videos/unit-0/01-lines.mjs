// Unit 0, Lesson 1 video script: lines. Based on HW #1 (11, 39) and HW #6.
const R = String.raw
const O = '#CC5833'

export default {
  id: '01-lines',
  tag: 'UNIT 0 · LESSON 1 · LINES REVIEW',
  chapters: ['Slope', 'Three forms', 'Graphing', 'Parallel & perpendicular', 'Your turn', 'Recap'],
  layouts: {
    g11: { type: 'plane', window: [-7, 7, -7, 7], tex: R`y = \tfrac45x - 3`, items: [
      { key: 'b', kind: 'dots', pts: [[0, -3]], style: 'vertex', labels: true },
      { key: 'p2', kind: 'dots', pts: [[5, 1]], style: 'key', labels: true },
      { key: 'line', kind: 'fn', f: x => 0.8 * x - 3 },
    ] },
    perp: { type: 'plane', window: [-8, 8, -8, 8], tex: R`6x - 7y = -10`, items: [
      { key: 'ref', kind: 'fn', f: x => -7 / 6 * x + 2, alt: true },
      { key: 'pt', kind: 'dots', pts: [[-4, -2]], style: 'vertex', labels: true },
      { key: 'new', kind: 'fn', f: x => 6 / 7 * x + 10 / 7 },
    ] },
  },
  scenes: [
    {
      ch: 0, say: 'Welcome to Unit zero. Before parabolas, let’s make sure lines feel easy. Everything starts with slope.',
      view: { kind: 'title', kicker: 'UNIT 0 · LESSON 1', title: 'Lines', em: 'review', sub: 'Slope, three forms, parallel and perpendicular.' },
    },
    {
      ch: 0, say: 'Slope tells you how steep a line is. [[1]]It is the change in y over the change in x: rise over run. [[2]]A horizontal line has slope zero. [[3]]A vertical line has an undefined slope, because you would divide by zero.',
      view: { kind: 'lines', title: 'Slope', lines: [
        { tex: R`m = \dfrac{y_2 - y_1}{x_2 - x_1} = \dfrac{\text{rise}}{\text{run}}`, at: 1, box: true },
        { tex: R`\text{horizontal } (y = 3):\ m = 0`, at: 2 },
        { tex: R`\text{vertical } (x = 5):\ m \text{ undefined}`, at: 3 },
      ] },
    },
    {
      ch: 1, say: 'A line can be written three ways. [[1]]Slope-intercept form shows the slope and the y-intercept. [[2]]Standard form uses whole numbers, with A positive. [[3]]Point-slope form uses any point on the line.',
      view: { kind: 'cards', title: 'Three forms', cards: [
        { head: 'Slope-intercept', tex: R`y = mx + b`, at: 1 },
        { head: 'Standard', tex: R`Ax + By = C`, at: 2 },
        { head: 'Point-slope', tex: R`y - y_1 = m(x - x_1)`, at: 3, dark: true },
      ] },
    },
    {
      ch: 2, say: 'Let’s graph four x minus five y equals fifteen. [[1]]Solve for y. Move four x over: negative five y equals negative four x plus fifteen. [[2]]Divide every term by negative five: y equals four fifths x minus three. [[3]]So the slope is four fifths and the y-intercept is negative three.',
      view: { kind: 'lines', lines: [
        { tex: R`4x - 5y = 15` },
        { tex: R`-5y = -4x + 15`, at: 1 },
        { tex: R`y = \tfrac45x - 3`, at: 2 },
        { tex: R`m = \tfrac45,\quad b = -3`, at: 3, glow: true },
      ] },
    },
    {
      ch: 2, say: '[[1]]Plot the y-intercept, zero comma negative three. [[2]]From there, rise four and run five, to five comma one. [[3]]Draw the line through both points.',
      view: { kind: 'plane', layout: 'g11', reveal: [['b', 1], ['p2', 2], ['line', 3]], side: [{ tex: R`(0, -3)`, at: 1 }, { tex: R`\text{up } 4,\ \text{right } 5`, at: 2 }, { tex: R`y = \tfrac45x - 3`, at: 3, strong: true }] },
    },
    {
      ch: 3, say: '[[1]]Parallel lines have the same slope. [[2]]Perpendicular lines have opposite reciprocal slopes: flip the fraction and change the sign. Two thirds becomes negative three halves. They always multiply to negative one.',
      view: { kind: 'cards', title: 'Parallel and perpendicular', cards: [
        { head: 'Parallel', tex: R`m_1 = m_2`, at: 1 },
        { head: 'Perpendicular', tex: R`\tfrac23 \to -\tfrac32`, text: 'flip and change the sign', at: 2, dark: true },
      ] },
    },
    {
      ch: 3, say: 'Find the line through negative four, negative two, perpendicular to y equals negative seven sixths x plus two, in standard form. [[1]]Flip and change the sign: the new slope is six sevenths. [[2]]Point-slope form: y plus two equals six sevenths times x plus four. [[3]]Multiply by seven to clear the fraction. [[4]]Rearrange: six x minus seven y equals negative ten.',
      view: { kind: 'lines', lines: [
        { tex: R`\perp\ y = -\tfrac76x + 2,\ \text{through } (-4, -2)` },
        { tex: R`m = {\color{${O}}\tfrac67}`, at: 1 },
        { tex: R`y + 2 = \tfrac67(x + 4)`, at: 2 },
        { tex: R`7y + 14 = 6x + 24`, at: 3 },
        { tex: R`6x - 7y = -10`, at: 4, glow: true },
      ] },
    },
    {
      ch: 3, say: '[[1]]Here is the original line. [[2]]Here is our point. [[3]]And the new line passes through it, crossing at a perfect right angle.',
      view: { kind: 'plane', layout: 'perp', reveal: [['ref', 1], ['pt', 2], ['new', 3]], side: [{ tex: R`y = -\tfrac76x + 2`, at: 1 }, { tex: R`(-4, -2)`, at: 2 }, { tex: R`6x - 7y = -10`, at: 3, strong: true }] },
    },
    {
      ch: 4, say: 'Your turn! What is the slope of a line perpendicular to y equals three x minus one?',
      countdown: 10,
      view: { kind: 'try', tex: R`\perp\ y = 3x - 1:\ m = \ ?`, hint: ['Flip it', 'Change the sign'] },
    },
    {
      ch: 4, say: '[[1]]Three is three over one. Flip it: one third. [[2]]Change the sign: negative one third. [[3]]Check: three times negative one third is negative one.',
      view: { kind: 'lines', lines: [
        { tex: R`3 = \tfrac31 \to \tfrac13`, at: 1 },
        { tex: R`m = -\tfrac13`, at: 2, glow: true },
        { tex: R`3 \cdot \left(-\tfrac13\right) = -1\ \checkmark`, at: 3 },
      ] },
    },
    {
      ch: 5, say: 'Recap. [[1]]Slope is rise over run. [[2]]Get y equals m x plus b to graph. [[3]]Parallel: same slope. [[4]]Perpendicular: flip and change the sign.',
      view: { kind: 'recap', items: [
        { text: 'Slope = rise / run; vertical is undefined.', at: 1 },
        { text: 'Solve for y, plot b, then rise over run.', at: 2 },
        { text: 'Parallel → same slope.', at: 3 },
        { text: 'Perpendicular → flip and change the sign.', at: 4 },
      ] },
    },
    {
      ch: 5, say: 'Next up: linear inequalities and interval notation. See you there!',
      view: { kind: 'title', kicker: 'UP NEXT · LESSON 2', title: 'Linear', em: 'inequalities', sub: 'Solid or dashed, then shade' },
    },
  ],
}
