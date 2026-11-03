// Lesson 3 video script. In `say`, [[n]] marks the word where item `at: n`
// appears on screen. Math follows Day 4 class notes, Examples 1 and 2.
const R = String.raw
const ex = (reveal, extra = {}) => ({ kind: 'longdiv', layout: 'ex', reveal, ...extra })

export default {
  id: '03-long-division',
  tag: 'UNIT 4 · LESSON 3 · LONG DIVISION',
  chapters: ['Why', 'Four moves', 'Example', 'Your turn', 'Shortcut', 'Recap'],
  layouts: {
    ex: { type: 'longdiv', num: [2, 13, -7], den: [1, 6] },
    try: { type: 'longdiv', num: [3, 11, 1], den: [1, -3] },
  },
  scenes: [
    {
      ch: 0, say: "Let's learn polynomial long division. It's just four moves, and you'll be able to divide any polynomial.",
      view: { kind: 'title', kicker: 'UNIT 4 · LESSON 3', title: 'Polynomial', em: 'long division', sub: 'Four moves. Under three minutes.' },
    },
    {
      ch: 0, say: 'You already know this with numbers. [[1]]Fifteen divided by two is seven, remainder one. [[2]]So fifteen over two is seven, plus one half.',
      view: { kind: 'lines', lines: [{ tex: R`15 \div 2` }, { tex: R`= 7 \text{ remainder } 1`, at: 1 }, { tex: R`\dfrac{15}{2} = 7 + \dfrac{1}{2}`, at: 2, big: true }] },
    },
    {
      ch: 0, say: 'Polynomials work the same way: [[1]]a quotient, [[2]]plus the remainder over the divisor.',
      view: { kind: 'lines', lines: [{ parts: [{ tex: R`\dfrac{f(x)}{d(x)} =` }, { tex: R`\underbrace{q(x)}_{\text{quotient}}`, at: 1 }, { tex: R`+\ \dfrac{\overbrace{r(x)}^{\text{remainder}}}{\underbrace{d(x)}_{\text{divisor}}}`, at: 2 }], big: true }] },
    },
    {
      ch: 1, say: 'Here are the four moves. [[1]]Divide. [[2]]Multiply. [[3]]Subtract. [[4]]Bring down. [[5]]Then repeat. Remember them as [[6]]Dad, Mom, Sister, Brother.',
      view: { kind: 'moves', at: [1, 2, 3, 4], repeatAt: 5, mnemonicAt: 6 },
    },
    {
      ch: 2, say: "Let's try one: two x squared plus thirteen x minus seven, divided by x plus six. [[1]]Divisor outside, dividend inside.",
      view: ex([['setup', 1]], { problemOnly: true }),
    },
    {
      ch: 2, move: 0, say: 'Divide. Look only at the first terms: [[1]]two x squared divided by x [[2]]is two x. Write it on top.',
      view: ex([['c0-divide', 2]], { hl: [['n2', 1], ['divLead', 1]], note: { tex: R`2x^2 \div x = 2x`, at: 2 } }),
    },
    {
      ch: 2, move: 1, say: 'Multiply. [[1]]Two x times x plus six [[2]]is two x squared plus twelve x. Line it up underneath.',
      view: ex([['c0-multiply', 2]], { hl: [['q0', 1], ['div', 1]], note: { tex: R`2x(x + 6) = 2x^2 + 12x`, at: 2 } }),
    },
    {
      ch: 2, move: 2, say: 'Subtract. [[1]]Change the signs, then add. [[2]]Thirteen x minus twelve x leaves x.',
      view: ex([['c0-flip', 1], ['c0-subtract', 2]], { note: { tex: R`13x - 12x = x`, at: 2 } }),
    },
    {
      ch: 2, move: 3, say: 'Bring down. [[1]]Bring down the minus seven. [[2]]Now repeat with x minus seven.',
      view: ex([['c0-bring', 1]], { hl: [['n0', 1], ['a0-0', 1], ['a0-1', 2]] }),
    },
    {
      ch: 2, move: 0, say: 'Divide: [[1]]x divided by x is one.',
      view: ex([['c1-divide', 1]], { hl: [['a0-1', 0], ['divLead', 0]], note: { tex: R`x \div x = 1`, at: 1 } }),
    },
    {
      ch: 2, move: 1, say: 'Multiply: [[1]]one times x plus six is x plus six.',
      view: ex([['c1-multiply', 1]], { hl: [['q1', 0], ['div', 0]], note: { tex: R`1(x + 6) = x + 6`, at: 1 } }),
    },
    {
      ch: 2, move: 2, say: 'Subtract: [[1]]change the signs and add. [[2]]Minus seven minus six is minus thirteen.',
      view: ex([['c1-flip', 1], ['c1-subtract', 2]], { note: { tex: R`-7 - 6 = -13`, at: 2 } }),
    },
    {
      ch: 2, say: 'Minus thirteen has a lower degree than x plus six, [[1]]so we stop. That’s the remainder.',
      view: ex([], { hl: [['a1-0', 1]], note: { tex: R`\text{remainder} = -13`, at: 1 } }),
    },
    {
      ch: 2, say: 'The answer: [[1]]two x plus one, [[2]]minus thirteen over x plus six.',
      view: ex([], { answer: [{ tex: R`2x + 1`, at: 1 }, { tex: R`-\ \dfrac{13}{x + 6}`, at: 2 }] }),
    },
    {
      ch: 3, say: 'Your turn! Divide three x squared plus eleven x plus one, by x minus three. Pause the video if you need more time.',
      countdown: 10,
      view: { kind: 'try', tex: R`(3x^2 + 11x + 1) \div (x - 3)` },
    },
    {
      ch: 3, say: "Let’s check. [[1]]Divide: three x. [[2]]Multiply and subtract: twenty x plus one. [[3]]Divide: twenty. [[4]]Multiply and subtract: the remainder is sixty-one.",
      view: { kind: 'longdiv', layout: 'try', reveal: [['setup', 0], ['c0-divide', 1], ['c0-multiply', 2], ['c0-flip', 2], ['c0-subtract', 2], ['c0-bring', 2], ['c1-divide', 3], ['c1-multiply', 4], ['c1-flip', 4], ['c1-subtract', 4]], hl: [['a1-0', 4]] },
    },
    {
      ch: 3, say: 'So it’s [[1]]three x plus twenty, plus sixty-one over x minus three. [[2]]Got it? Great job!',
      view: { kind: 'longdiv', layout: 'try', reveal: [], answer: [{ tex: R`3x + 20 + \dfrac{61}{x - 3}`, at: 1 }] },
    },
    {
      ch: 4, say: 'Now a cool shortcut. [[1]]Plug three into the polynomial, because x minus three is zero when x is three. [[2]]Twenty-seven plus thirty-three plus one [[3]]is sixty-one. The remainder!',
      view: { kind: 'lines', lines: [{ tex: R`f(x) = 3x^2 + 11x + 1` }, { tex: R`f({\color{#CC5833}3}) = 3({\color{#CC5833}3})^2 + 11({\color{#CC5833}3}) + 1`, at: 1 }, { tex: R`= 27 + 33 + 1`, at: 2 }, { tex: R`= 61`, at: 3, glow: true }] },
    },
    {
      ch: 4, say: 'That’s the Remainder Theorem. [[1]]Divide by x minus k, and the remainder is f of k. [[2]]A remainder of zero means x minus k is a factor.',
      view: { kind: 'lines', title: 'The Remainder Theorem', lines: [{ tex: R`f(x) \div (x - k) \ \Rightarrow\ \text{remainder} = f(k)`, at: 1, box: true }, { tex: R`\text{remainder} = 0 \ \Rightarrow\ (x - k) \text{ is a factor}`, at: 2, box: true }] },
    },
    {
      ch: 5, say: 'Recap. [[1]]Divide, multiply, subtract, bring down, repeat. [[2]]Stop when the leftover’s degree is lower. [[3]]Use a zero for a missing power. [[4]]Answer: quotient, plus remainder over divisor.',
      view: { kind: 'recap', items: [
        { text: 'Divide → Multiply → Subtract → Bring down. Repeat.', at: 1 },
        { text: 'Stop when the leftover has a lower degree than the divisor.', at: 2 },
        { text: 'Missing power? Write it with a 0, like 0x.', at: 3 },
        { tex: R`\text{Answer} = q(x) + \dfrac{r(x)}{d(x)}`, at: 4 },
      ] },
    },
    {
      ch: 5, say: 'Next up: synthetic division, the fast shortcut. See you there!',
      view: { kind: 'title', kicker: 'UP NEXT · LESSON 4', title: 'Synthetic', em: 'division', sub: 'The fast shortcut for dividing by x − k' },
    },
  ],
}
