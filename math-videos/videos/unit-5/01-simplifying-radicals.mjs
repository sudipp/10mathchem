// Lesson 1 video script. Based on HW #1 problems 1, 4, and 11.
const R = String.raw
const O = '#CC5833', G = '#3d6b50'

export default {
  id: '01-simplifying-radicals',
  tag: 'UNIT 5 · LESSON 1 · SIMPLIFYING RADICALS',
  chapters: ['Perfect squares', 'Numbers', 'Variables', 'Full example', 'Your turn', 'Recap'],
  scenes: [
    {
      ch: 0, say: 'Today you’ll learn to simplify square roots. The whole trick is finding perfect squares hiding inside.',
      view: { kind: 'title', kicker: 'UNIT 5 · LESSON 1', title: 'Simplifying', em: 'radicals', sub: 'Pull the perfect squares out. Keep the rest inside.' },
    },
    {
      ch: 0, say: 'First, know your perfect squares. [[1]]Four, nine, sixteen, twenty-five, thirty-six, forty-nine, sixty-four, eighty-one, one hundred. [[2]]Each one has a whole-number square root, so it can come out of the radical.',
      view: { kind: 'lines', title: 'Perfect squares to know', lines: [
        { tex: R`4,\ 9,\ 16,\ 25,\ 36,\ 49,\ 64,\ 81,\ 100`, at: 1, big: true },
        { tex: R`\sqrt{16} = 4,\quad \sqrt{64} = 8,\quad \sqrt{100} = 10`, at: 2 },
      ] },
    },
    {
      ch: 1, say: 'The product property says the square root of a times b equals root a times root b. [[1]]So split the number into the biggest perfect square, times what’s left. [[2]]Eighty is sixteen times five. [[3]]Root sixteen is four, so root eighty is four root five.',
      view: { kind: 'lines', lines: [
        { tex: R`\sqrt{ab} = \sqrt a \cdot \sqrt b`, box: true },
        { tex: R`\sqrt{80}`, at: 1 },
        { tex: R`= \sqrt{{\color{${O}}16} \cdot 5}`, at: 2 },
        { tex: R`= {\color{${O}}4}\sqrt5`, at: 3, glow: true },
      ] },
    },
    {
      ch: 2, say: 'Now variables. In this unit every variable is positive. [[1]]An even exponent comes out halved: root x to the fourth is x squared. [[2]]An odd exponent? Split off one copy, which stays inside: root x cubed is x root x. [[3]]And root x to the fifth is x squared root x.',
      view: { kind: 'cards', cards: [
        { head: 'Even power', tex: R`\sqrt{x^4} = x^2`, at: 1 },
        { head: 'Odd power', tex: R`\sqrt{x^3} = x\sqrt x`, at: 2 },
        { head: 'Odd power', tex: R`\sqrt{x^5} = x^2\sqrt x`, at: 3 },
      ] },
    },
    {
      ch: 3, say: 'Let’s put it together. Simplify six root eighty x to the fourth y squared. [[1]]Eighty is sixteen times five. [[2]]x to the fourth and y squared are even, so they come out as x squared and y. [[3]]Six times four is twenty-four. The answer is twenty-four x squared y root five.',
      view: { kind: 'lines', lines: [
        { tex: R`6\sqrt{80x^4y^2}` },
        { tex: R`= 6\sqrt{{\color{${O}}16} \cdot 5 \cdot {\color{${G}}x^4y^2}}`, at: 1 },
        { tex: R`= 6 \cdot {\color{${O}}4} \cdot {\color{${G}}x^2y}\sqrt5`, at: 2 },
        { tex: R`= 24x^2y\sqrt5`, at: 3, glow: true },
      ] },
    },
    {
      ch: 3, say: 'One with odd powers: negative five root one ninety-two x cubed y cubed. [[1]]One ninety-two is sixty-four times three. [[2]]x cubed is x squared times x, and the same for y. [[3]]Sixty-four gives eight, the squares give x y, and three x y stays inside. [[4]]Negative five times eight is negative forty.',
      view: { kind: 'lines', lines: [
        { tex: R`-5\sqrt{192x^3y^3}` },
        { tex: R`192 = {\color{${O}}64} \cdot 3`, at: 1 },
        { tex: R`x^3y^3 = {\color{${G}}x^2y^2} \cdot xy`, at: 2 },
        { tex: R`= -5 \cdot {\color{${O}}8}{\color{${G}}xy}\sqrt{3xy}`, at: 3 },
        { tex: R`= -40xy\sqrt{3xy}`, at: 4, glow: true },
      ] },
    },
    {
      ch: 4, say: 'Your turn! Simplify the square root of seventy-two x cubed. Find the biggest perfect square first.',
      countdown: 10,
      view: { kind: 'try', tex: R`\sqrt{72x^3}`, hint: ['Biggest perfect square in 72?', 'x³ = x² · x'] },
    },
    {
      ch: 4, say: '[[1]]Seventy-two is thirty-six times two, and root thirty-six is six. [[2]]x cubed is x squared times x, so one x comes out. [[3]]The answer is six x root two x.',
      view: { kind: 'lines', lines: [
        { tex: R`72 = {\color{${O}}36} \cdot 2`, at: 1 },
        { tex: R`x^3 = {\color{${G}}x^2} \cdot x`, at: 2 },
        { tex: R`\sqrt{72x^3} = 6x\sqrt{2x}`, at: 3, glow: true },
      ] },
    },
    {
      ch: 5, say: 'Recap. [[1]]Split the number into the biggest perfect square times what’s left. [[2]]Even exponents come out halved. [[3]]Odd exponents leave one copy inside. [[4]]You’re done when nothing under the root is a perfect square.',
      view: { kind: 'recap', items: [
        { text: 'Biggest perfect square × what is left.', at: 1 },
        { text: 'Even exponent → comes out halved.', at: 2 },
        { text: 'Odd exponent → one copy stays inside.', at: 3 },
        { text: 'Done when no perfect square is left inside.', at: 4 },
      ] },
    },
    {
      ch: 5, say: 'Next up: multiplying radicals. See you there!',
      view: { kind: 'title', kicker: 'UP NEXT · LESSON 2', title: 'Multiplying', em: 'radicals', sub: 'Outside times outside, inside times inside' },
    },
  ],
}
