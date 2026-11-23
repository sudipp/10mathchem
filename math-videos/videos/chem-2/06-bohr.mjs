// Chapter 2 · Lesson 6 video. Based on the Ch 2 notes: Bohr energy levels, ground and excited states,
// hydrogen's visible lines (656, 486, 434, 410 nm), and atomic fingerprints.
export default {
  id: '06-bohr',
  tag: 'CHAPTER 2 · LESSON 6 · BOHR MODEL & LINE SPECTRA',
  chapters: ['Levels', 'Jumps', 'Spectrum', 'Fingerprints', 'Your turn', 'Recap'],
  scenes: [
    {
      ch: 0, say: 'Why does a neon sign glow one exact color? Bohr’s model of the atom explains it.',
      view: { kind: 'title', kicker: 'CHAPTER 2 · LESSON 6', title: 'The Bohr', em: 'model', sub: 'Energy in, photon out' },
    },
    {
      ch: 0, say: 'Bohr said electrons can only be in fixed energy levels, like rungs on a ladder. Never in between. [[1]]Normally the electron sits in the lowest level: the ground state.',
      view: { kind: 'bohr', groundAt: 1, side: [{ text: 'Fixed energy levels only', at: 0 }, { text: 'Ground state: lowest level', at: 1, strong: true }] },
    },
    {
      ch: 1, say: 'Add heat or electricity, and the electron jumps up to a higher level: the excited state. [[1]]It can’t stay there. When it falls back down, it gives off the extra energy as a photon of light. [[2]]A fall from level three to level two gives red light, six fifty-six nanometers.',
      view: { kind: 'bohr', jumps: [{ from: 3, to: 2, nm: 656, at: 2 }], side: [{ text: 'Energy in → jumps UP (excited)', at: 0 }, { text: 'Falls DOWN → photon out', at: 1, strong: true }] },
    },
    {
      ch: 2, say: 'Each fall gives one exact color. [[1]]Three to two: red, six fifty-six. [[2]]Four to two: blue-green, four eighty-six. [[3]]Five to two: blue, four thirty-four. [[4]]Six to two: violet, four ten. [[5]]A bigger fall means more energy and a shorter wavelength.',
      view: { kind: 'bohr', jumps: [{ from: 3, to: 2, nm: 656, at: 1 }, { from: 4, to: 2, nm: 486, at: 2 }, { from: 5, to: 2, nm: 434, at: 3 }, { from: 6, to: 2, nm: 410, at: 4 }],
        side: [{ text: 'Bigger fall → more energy → shorter λ', at: 5, strong: true }] },
    },
    {
      ch: 2, say: 'Pass that light through a prism and you don’t see a rainbow. [[1]]You see a few sharp lines: a line-emission spectrum. [[2]]Only certain energy jumps are possible, so only certain colors appear.',
      view: { kind: 'bohr', jumps: [{ from: 3, to: 2, nm: 656, at: -9 }, { from: 4, to: 2, nm: 486, at: -9 }, { from: 5, to: 2, nm: 434, at: -9 }, { from: 6, to: 2, nm: 410, at: -9 }],
        side: [{ text: 'Bright lines, not a rainbow', at: 1, strong: true }, { text: 'Only certain jumps → only certain colors', at: 2 }] },
    },
    {
      ch: 3, say: 'Every element has its own set of lines, [[1]]like a fingerprint or a barcode. Scientists use them to tell what stars are made of. [[2]]Bohr’s math matched hydrogen perfectly, but it only worked for hydrogen. That’s why Schrödinger’s cloud model came next.',
      view: { kind: 'cards', cards: [
        { head: 'Fingerprint', text: 'each element has its own bright-line spectrum', at: 1, dark: true },
        { head: 'Limit', text: 'Bohr’s model only worked for hydrogen', at: 2 },
      ] },
    },
    {
      ch: 3, say: 'Exam tip: [[1]]falling down gives off light, an emission. [[2]]Jumping up absorbs energy. [[3]]And a bigger jump means more energy, higher frequency, and shorter wavelength.',
      view: { kind: 'cards', title: 'Exam tip', cards: [
        { head: '↓ down', text: 'gives off a photon (emission)', at: 1, dark: true },
        { head: '↑ up', text: 'absorbs energy', at: 2 },
        { head: 'Bigger jump', text: 'more E · higher ν · shorter λ', at: 3 },
      ] },
    },
    {
      ch: 4, say: 'Your turn! Which fall makes hydrogen’s violet line? And does it have more or less energy than the red line?',
      countdown: 8,
      view: { kind: 'try', text: 'Violet line: which fall? More or less energy than red?', hint: ['Bigger fall → shorter λ'] },
    },
    {
      ch: 4, say: '[[1]]Six to two, the biggest fall, makes the violet line at four ten nanometers. [[2]]It has more energy than the red line.',
      view: { kind: 'bohr', jumps: [{ from: 6, to: 2, nm: 410, at: 1 }], side: [{ text: '6 → 2: violet, 410 nm', at: 1, strong: true }, { text: 'More energy than red (656 nm)', at: 2 }] },
    },
    {
      ch: 5, say: 'Recap. [[1]]Electrons live only in fixed energy levels. [[2]]Energy in: jump up. Fall down: a photon out. [[3]]Each element gives its own line spectrum, a fingerprint.',
      view: { kind: 'recap', items: [
        { text: 'Bohr: fixed energy levels (ground vs excited).', at: 1 },
        { text: 'Fall down → photon; bigger fall → more energy.', at: 2 },
        { text: 'Line spectrum = element fingerprint (H: 656, 486, 434, 410 nm).', at: 3 },
      ] },
    },
  ],
}
