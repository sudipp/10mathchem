// Chapter 2 · Lesson 5 video. Based on the Ch 2 notes (Planck, Einstein, E = hν, 4.57 × 10¹⁴ Hz example)
// and the Wave Calculations WS (#1: 630 nm; #4: 2.68 × 10⁶ Hz → 1.78 × 10⁻²⁷ J). h = 6.6262 × 10⁻³⁴ J·s.
export default {
  id: '05-photons',
  tag: 'CHAPTER 2 · LESSON 5 · PHOTONS & E = hν',
  chapters: ['Quanta', 'Photons', 'E = hν', 'With λ', 'Your turn', 'Recap'],
  scenes: [
    {
      ch: 0, say: 'Light is a wave, but it also comes in tiny packets of energy called photons. This lesson is about how much energy one photon carries.',
      view: { kind: 'title', kicker: 'CHAPTER 2 · LESSON 5', title: 'Photons', em: 'E = hν', sub: 'Light is a wave and a particle' },
    },
    {
      ch: 0, say: '[[1]]In nineteen hundred, Planck found that energy is given off in small, specific amounts called quanta. Like stairs, not a ramp. [[2]]In nineteen oh five, Einstein showed light itself comes in packets, photons. Light acts as both a wave and a particle.',
      view: { kind: 'cards', cards: [
        { head: 'Planck · 1900', text: 'energy comes in quanta: steps, not a ramp', at: 1 },
        { head: 'Einstein · 1905', text: 'light comes in photons: wave-particle duality', at: 2, dark: true },
      ] },
    },
    {
      ch: 1, say: 'Einstein’s evidence was the photoelectric effect. [[1]]Shine light on a metal, and electrons fly off, but only if each photon has enough energy. [[2]]On a metal like this, dim violet light works, but bright red light doesn’t! Energy depends on the frequency, not the brightness.',
      view: { kind: 'cards', title: 'Photoelectric effect', cards: [
        { head: 'Violet photon', text: 'high ν → enough energy → e⁻ ejected ✓', at: 1, dark: true },
        { head: 'Red photon', text: 'low ν → not enough, even if bright ✗', at: 2 },
      ] },
    },
    {
      ch: 2, say: 'The equation: [[1]]E equals h nu. E is the energy of one photon in joules. h is Planck’s constant, six point six two six two times ten to the minus thirty-four. Nu is frequency. [[2]]Energy and frequency are directly proportional: higher frequency, more energy.',
      view: { kind: 'spectrum', at: 0, freqAt: 1, energyAt: 2, notes: [{ text: '$E = h\\nu$ · $h = 6.6262\\times10^{-34}$ J·s', at: 1, strong: true }] },
    },
    {
      ch: 2, say: 'Red light has a frequency of four point five seven times ten to the fourteenth hertz. [[1]]E equals h times nu, [[2]]so E equals three point oh three times ten to the minus nineteen joules.',
      view: { kind: 'lines', lines: [
        { tex: 'E = h\\nu', box: true },
        { tex: 'E = (6.6262\\times10^{-34})(4.57\\times10^{14})', at: 1 },
        { tex: 'E = 3.03\\times10^{-19}\\ \\text{J}', at: 2, glow: true },
      ] },
    },
    {
      ch: 3, say: 'Given a wavelength instead? [[1]]Combine the two equations: E equals h c over lambda. [[2]]Orange light, six thirty nanometers: change to meters, six point three oh times ten to the minus seven. [[3]]E equals three point one six times ten to the minus nineteen joules. Your key rounds it to three point two.',
      view: { kind: 'lines', lines: [
        { tex: 'E = \\dfrac{hc}{\\lambda}', at: 1, box: true },
        { tex: '\\lambda = 630\\ \\text{nm} = 6.30\\times10^{-7}\\ \\text{m}', at: 2 },
        { tex: 'E = \\dfrac{(6.6262\\times10^{-34})(3.00\\times10^{8})}{6.30\\times10^{-7}} = 3.16\\times10^{-19}\\ \\text{J}', at: 3, glow: true },
      ] },
    },
    {
      ch: 3, say: 'Exam tip: pick the formula from what you’re given. [[1]]Frequency and energy: E equals h nu. [[2]]Wavelength and frequency: c equals lambda nu. [[3]]Wavelength and energy: E equals h c over lambda.',
      view: { kind: 'cards', title: 'Exam tip: which formula?', cards: [
        { tex: 'E = h\\nu', text: 'E ↔ ν', at: 1 },
        { tex: 'c = \\lambda\\nu', text: 'λ ↔ ν', at: 2 },
        { tex: 'E = hc/\\lambda', text: 'E ↔ λ', at: 3, dark: true },
      ] },
    },
    {
      ch: 4, say: 'Your turn! A photon has a frequency of two point six eight times ten to the sixth hertz. Find its energy.',
      countdown: 10,
      view: { kind: 'try', tex: '\\nu = 2.68\\times10^{6}\\ \\text{Hz}\\quad E = ?', hint: ['E = hν', 'h = 6.6262 × 10⁻³⁴'] },
    },
    {
      ch: 4, say: '[[1]]E equals h nu: [[2]]one point seven eight times ten to the minus twenty-seven joules. A radio photon carries very little energy.',
      view: { kind: 'lines', lines: [{ tex: 'E = (6.6262\\times10^{-34})(2.68\\times10^{6})', at: 1 }, { tex: '= 1.78\\times10^{-27}\\ \\text{J}', at: 2, glow: true }] },
    },
    {
      ch: 5, say: 'Recap. [[1]]Planck: energy comes in quanta. Einstein: light comes in photons. [[2]]E equals h nu: more frequency, more energy. [[3]]With a wavelength, use E equals h c over lambda, in meters.',
      view: { kind: 'recap', items: [
        { text: 'Planck: quanta · Einstein: photons (wave + particle).', at: 1 },
        { text: 'E = hν: energy ∝ frequency.', at: 2 },
        { text: 'E = hc/λ with λ in meters.', at: 3 },
      ] },
    },
  ],
}
