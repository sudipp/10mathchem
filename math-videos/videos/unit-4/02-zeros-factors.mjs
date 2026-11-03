// Lesson 2 video script. Based on Day 3 notes (Examples 1A, 3A, 3B, 4A) and HW #3.
const R = String.raw

export default {
  id: '02-zeros-factors',
  tag: 'UNIT 4 · LESSON 2 · ZEROS & FACTORS',
  chapters: ['Zeros', 'Factored form', 'Multiplicity', 'Backwards', 'Your turn', 'Recap'],
  layouts: {
    quad: { type: 'graph', num: [1, 4, -5], window: [-7, 3, -10, 6] },
    mult: { type: 'graph', num: [1, 6, 8, -6, -9], window: [-5, 3, -12, 12] },
    try: { type: 'graph', num: [4, -4, 1, 0], window: [-1, 1.5, -1, 1] },
  },
  scenes: [
    {
      ch: 0, say: 'Let’s find the zeros of a polynomial: the places where its graph meets the x-axis.',
      view: { kind: 'title', kicker: 'UNIT 4 · LESSON 2', title: 'Zeros and', em: 'linear factors', sub: 'Where a graph meets the x-axis.' },
    },
    {
      ch: 0, say: 'Here’s y equals x squared plus four x minus five. [[1]]It crosses the x-axis at minus five, and at one. [[2]]Those x-values are the zeros, also called roots, or x-intercepts.',
      view: { kind: 'graph', layout: 'quad', reveal: [['curve', 0], ['zeros', 1]], labels: [{ x: -5, y: 1.6, text: '−5', at: 1 }, { x: 1, y: 1.6, text: '1', at: 1 }], side: [{ text: 'zero = root = x-intercept', at: 2, strong: true }] },
    },
    {
      ch: 1, say: 'To find zeros without a graph, [[1]]write the polynomial in factored form. [[2]]Then set each factor equal to zero. [[3]]x is minus five, or x is one. They match the graph!',
      view: { kind: 'lines', lines: [{ tex: R`x^2 + 4x - 5 = 0` }, { tex: R`(x + 5)(x - 1) = 0`, at: 1 }, { tex: R`x + 5 = 0 \qquad x - 1 = 0`, at: 2 }, { tex: R`x = -5 \qquad x = 1`, at: 3, glow: true }] },
    },
    {
      ch: 1, say: 'Always look for a common factor first. [[1]]Three x cubed minus eighteen x squared plus twenty-four x [[2]]has a common factor of three x. [[3]]Factor what’s left, [[4]]and the zeros are zero, two, and four.',
      view: { kind: 'lines', lines: [{ tex: R`f(x) = 3x^3 - 18x^2 + 24x`, at: 1 }, { tex: R`= {\color{#CC5833}3x}(x^2 - 6x + 8)`, at: 2 }, { tex: R`= 3x(x - 2)(x - 4)`, at: 3 }, { tex: R`\text{zeros: } 0,\ 2,\ 4`, at: 4, glow: true }] },
    },
    {
      ch: 2, say: 'Now look at x minus one, times x plus one, times x plus three squared. [[1]]At one and minus one, the graph crosses the x-axis. [[2]]But x plus three is squared, so minus three is a double zero. [[3]]The graph just touches the axis there, and bounces back.',
      view: { kind: 'graph', layout: 'mult', title: R`f(x) = (x - 1)(x + 1)(x + 3)^2`, reveal: [['curve', 0], ['zero1', 1], ['zero-1', 1]], hl: [[-3, 2]], labels: [{ x: -3, y: -2.6, text: 'bounce', at: 3 }], side: [{ tex: R`1,\ -1 \to \text{cross}`, at: 1 }, { tex: R`-3 \ (\text{mult. } 2) \to \text{bounce}`, at: 2, strong: true }] },
    },
    {
      ch: 2, say: 'How many times a factor repeats is its multiplicity. [[1]]Odd multiplicity: the graph crosses. [[2]]Even multiplicity: it touches and bounces.',
      view: { kind: 'cards', title: 'Multiplicity', cards: [{ head: 'Odd', tex: R`(x - 1)^{1}`, text: 'crosses the x-axis', at: 1 }, { head: 'Even', tex: R`(x + 3)^{2}`, text: 'touches and bounces', at: 2, dark: true }] },
    },
    {
      ch: 3, say: 'You can also work backwards. For zeros two, minus three, and zero, [[1]]write a factor for each: x minus two, x plus three, and x. [[2]]Then multiply them out, [[3]]to get x cubed plus x squared minus six x.',
      view: { kind: 'lines', lines: [{ tex: R`\text{zeros: } 2,\ -3,\ 0` }, { tex: R`f(x) = (x - 2)(x + 3)\,x`, at: 1 }, { tex: R`= x(x^2 + x - 6)`, at: 2 }, { tex: R`= x^3 + x^2 - 6x`, at: 3, glow: true }] },
    },
    {
      ch: 3, say: 'If a zero is a fraction, like minus three halves, [[1]]multiply to clear it: two x equals minus three. [[2]]So the factor is two x plus three. No fractions!',
      view: { kind: 'lines', lines: [{ tex: R`x = -\tfrac{3}{2}`, big: true }, { tex: R`2x = -3`, at: 1 }, { tex: R`(2x + 3)`, at: 2, glow: true }] },
    },
    {
      ch: 4, say: 'Your turn! Find the zeros of x times two x minus one, squared. Which zero makes the graph bounce?',
      countdown: 10,
      view: { kind: 'try', tex: R`f(x) = x(2x - 1)^2`, hint: ['Set each factor = 0', 'Squared → bounce'] },
    },
    {
      ch: 4, say: '[[1]]x equals zero. [[2]]Two x minus one equals zero gives one half. [[3]]It’s squared, so one half has multiplicity two, and the graph bounces there.',
      view: { kind: 'graph', layout: 'try', title: R`f(x) = x(2x - 1)^2`, reveal: [['curve', 0], ['zeros', 1]], hl: [[0.5, 3]], side: [{ tex: R`x = 0`, at: 1 }, { tex: R`2x - 1 = 0 \Rightarrow x = \tfrac{1}{2}`, at: 2 }, { tex: R`\tfrac{1}{2} \text{ mult. } 2 \to \text{bounce}`, at: 3, strong: true }] },
    },
    {
      ch: 5, say: 'Recap. [[1]]Zeros are where the graph meets the x-axis. [[2]]Factor first, then set each factor to zero. [[3]]A squared factor means the graph bounces. [[4]]And to go backwards, turn each zero into a factor and multiply.',
      view: { kind: 'recap', items: [
        { text: 'Zero = root = x-intercept.', at: 1 },
        { text: 'GCF first, factor, then set each factor = 0.', at: 2 },
        { text: 'Even multiplicity → bounce. Odd → cross.', at: 3 },
        { text: 'Backwards: zero r → factor (x − r), then multiply.', at: 4 },
      ] },
    },
    {
      ch: 5, say: 'Next up: dividing polynomials with long division. See you there!',
      view: { kind: 'title', kicker: 'UP NEXT · LESSON 3', title: 'Polynomial', em: 'long division', sub: 'Four moves, over and over' },
    },
  ],
}
