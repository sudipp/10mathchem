// Chapter 1 · Lesson 2 video. Based on the Conversions & Constants reference sheet (1 gal = 3.78 L, 1 in = 2.54 cm).
const X = u => `{\\color{#CC5833}\\cancel{\\text{${u}}}}`

export default {
  id: '02-conversion-factors',
  tag: 'CHAPTER 1 · LESSON 2 · CONVERSION FACTORS',
  chapters: ['The idea', 'Set up', 'One step', 'Chains', 'Your turn', 'Recap'],
  scenes: [
    {
      ch: 0, say: 'Converting units is like a puzzle: line up the units so the ones you don’t want cancel out.',
      view: { kind: 'title', kicker: 'CHAPTER 1 · LESSON 2', title: 'Conversion', em: 'factors', sub: 'Cancel what you don’t want' },
    },
    {
      ch: 0, say: 'Your reference sheet says one inch equals two point five four centimeters. [[1]]That gives two fractions: two point five four centimeters over one inch, [[2]]or one inch over two point five four centimeters. [[3]]The top equals the bottom, so each fraction equals one. Multiplying by one changes the units, not the amount.',
      view: { kind: 'lines', lines: [
        { tex: '1\\ \\text{in} = 2.54\\ \\text{cm}', box: true },
        { parts: [{ tex: '\\dfrac{2.54\\ \\text{cm}}{1\\ \\text{in}}', at: 1 }, { text: 'or', at: 2 }, { tex: '\\dfrac{1\\ \\text{in}}{2.54\\ \\text{cm}}', at: 2 }], big: true },
        { text: 'Both equal 1', at: 3, glow: true },
      ] },
    },
    {
      ch: 1, say: 'The rule: [[1]]start with the number you were given. [[2]]Put its unit on the BOTTOM of the next fraction, [[3]]so it cancels and the unit you want is left on top.',
      view: { kind: 'cards', cards: [
        { head: '1', text: 'start with what you’re given', at: 1 },
        { head: '2', text: 'unwanted unit on the BOTTOM', at: 2 },
        { head: '3', text: 'it cancels; wanted unit on top', at: 3, dark: true },
      ] },
    },
    {
      ch: 2, say: 'Two point oh oh gallons to liters. Your sheet: one gallon equals three point seven eight liters. [[1]]Gallons go on the bottom. [[2]]Gallons cancel. [[3]]Two times three point seven eight is seven point five six liters.',
      view: { kind: 'lines', lines: [
        { tex: '2.00\\ \\text{gal} \\times \\dfrac{3.78\\ \\text{L}}{1\\ \\text{gal}}', at: 1 },
        { tex: `2.00\\ ${X('gal')} \\times \\dfrac{3.78\\ \\text{L}}{1\\ ${X('gal')}}`, at: 2 },
        { tex: '= 7.56\\ \\text{L}', at: 3, glow: true },
      ] },
    },
    {
      ch: 3, say: 'No direct equality? Chain them. Twelve point oh inches to meters. [[1]]Inches to centimeters: times two point five four over one. [[2]]Centimeters to meters: times one meter over one hundred centimeters. [[3]]Inches cancel, centimeters cancel: point three oh five meters.',
      view: { kind: 'lines', lines: [
        { tex: `12.0\\ ${X('in')} \\times \\dfrac{2.54\\ ${X('cm')}}{1\\ ${X('in')}}`, at: 1 },
        { tex: `\\times \\dfrac{1\\ \\text{m}}{100\\ ${X('cm')}}`, at: 2 },
        { tex: '= 0.305\\ \\text{m}', at: 3, glow: true },
      ] },
    },
    {
      ch: 3, say: 'Exam tip: [[1]]always write the units on every number. [[2]]If the units don’t cancel to what you want, the fraction is upside down. Flip it.',
      view: { kind: 'cards', title: 'Exam tip', cards: [
        { head: 'Units on everything', text: 'they tell you if it’s set up right', at: 1 },
        { head: 'Didn’t cancel?', text: 'flip the fraction', at: 2, dark: true },
      ] },
    },
    {
      ch: 4, say: 'Your turn! Convert thirty point oh centimeters to inches.',
      countdown: 8,
      view: { kind: 'try', tex: '30.0\\ \\text{cm} = ?\\ \\text{in}', hint: ['1 in = 2.54 cm', 'cm on the bottom'] },
    },
    {
      ch: 4, say: '[[1]]Centimeters go on the bottom: times one inch over two point five four centimeters. [[2]]Eleven point eight inches.',
      view: { kind: 'lines', lines: [{ tex: `30.0\\ ${X('cm')} \\times \\dfrac{1\\ \\text{in}}{2.54\\ ${X('cm')}}`, at: 1 }, { tex: '= 11.8\\ \\text{in}', at: 2, glow: true }] },
    },
    {
      ch: 5, say: 'Recap. [[1]]Every equality makes two fractions that equal one. [[2]]Put the unwanted unit on the bottom so it cancels. [[3]]Chain as many as you need.',
      view: { kind: 'recap', items: [
        { text: 'An equality → two fractions, each = 1.', at: 1 },
        { text: 'Unwanted unit on the bottom → it cancels.', at: 2 },
        { text: 'Chain factors when there’s no direct one.', at: 3 },
      ] },
    },
  ],
}
