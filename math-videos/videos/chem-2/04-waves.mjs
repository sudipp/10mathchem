// Chapter 2 · Lesson 4 video. Based on the Ch 2 notes (parts of a wave, c = λν, the spectrum, 434 nm example)
// and the Wave Calculations WS (#3: λ = 1.00 × 10⁻¹⁰ m → 3.00 × 10¹⁸ Hz; #8–10 spectrum order, inverse).
export default {
  id: '04-waves',
  tag: 'CHAPTER 2 · LESSON 4 · WAVES & THE SPECTRUM',
  chapters: ['Waves', 'Frequency', 'Spectrum', 'c = λν', 'Your turn', 'Recap'],
  scenes: [
    {
      ch: 0, say: 'Light is a wave. Radio, microwaves, X-rays: all the same kind of wave, just stretched or squeezed.',
      view: { kind: 'title', kicker: 'CHAPTER 2 · LESSON 4', title: 'Waves &', em: 'light', sub: 'c = λν' },
    },
    {
      ch: 0, say: 'Parts of a wave. [[1]]Wavelength, lambda, is the length of one complete wave, crest to crest, in meters. [[2]]Amplitude is the height from the middle line to a crest.',
      view: { kind: 'waves', waves: [{ cycles: 2, color: '#2E4036', label: 'One wave', at: 0, lambdaAt: 1, ampAt: 2, amp: 0.85 }] },
    },
    {
      ch: 1, say: 'Frequency, nu, is how many waves pass a point each second, in hertz. [[1]]Long waves: low frequency. [[2]]Short waves: high frequency. [[3]]Wavelength and frequency are inversely proportional: one goes up, the other goes down.',
      view: { kind: 'waves', waves: [
        { cycles: 2, color: '#e5483a', label: 'Long λ', sub: 'low frequency', at: 1 },
        { cycles: 7, color: '#8a46c8', label: 'Short λ', sub: 'high frequency', at: 2 },
      ], notes: [{ text: 'λ ↑ → ν ↓ (inverse)', at: 3, strong: true }] },
    },
    {
      ch: 2, say: 'The electromagnetic spectrum, from lowest frequency to highest: [[1]]radio, [[2]]microwave, [[3]]infrared, [[4]]visible, [[5]]ultraviolet, [[6]]X-ray, [[7]]gamma. [[8]]Frequency goes up to the right. [[9]]Wavelength goes the other way.',
      view: { kind: 'spectrum', segAt: [1, 2, 3, 4, 5, 6, 7], freqAt: 8, waveAt: 9 },
    },
    {
      ch: 2, say: 'Memory trick: [[1]]Raging Martians Invaded Venus Using X-ray Guns. [[2]]Visible light runs from red at about seven hundred nanometers to violet at about four hundred.',
      view: { kind: 'cards', cards: [
        { head: 'R M I V U X G', text: 'Raging Martians Invaded Venus Using X-ray Guns', at: 1, dark: true },
        { head: 'Visible', text: 'red ≈ 700 nm → violet ≈ 400 nm', at: 2 },
      ] },
    },
    {
      ch: 3, say: 'All light travels at the same speed, c, three times ten to the eighth meters per second. [[1]]c equals lambda times nu. [[2]]Example: light at four hundred thirty-four nanometers. [[3]]First, change to meters: four point three four times ten to the minus seven. [[4]]Then nu equals c over lambda: six point nine one times ten to the fourteenth hertz.',
      view: { kind: 'lines', lines: [
        { tex: 'c = \\lambda\\nu \\qquad c = 3.00\\times10^{8}\\ \\text{m/s}', box: true, at: 1 },
        { tex: '\\lambda = 434\\ \\text{nm}', at: 2 },
        { tex: '= 4.34\\times10^{-7}\\ \\text{m}', at: 3 },
        { tex: '\\nu = \\dfrac{3.00\\times10^{8}}{4.34\\times10^{-7}} = 6.91\\times10^{14}\\ \\text{Hz}', at: 4, glow: true },
      ] },
    },
    {
      ch: 3, say: 'Exam tip: the number one mistake is forgetting to convert. [[1]]Nanometers to meters: multiply by ten to the minus nine. [[2]]And type exponents in your calculator with the E E key.',
      view: { kind: 'cards', title: 'Exam tip', cards: [
        { head: 'nm → m', text: '× 10⁻⁹ (1 m = 10⁹ nm)', at: 1, dark: true },
        { head: 'EE key', text: '3.00 EE 8 ÷ 4.34 EE −7', at: 2 },
      ] },
    },
    {
      ch: 4, say: 'Your turn! An X-ray has a wavelength of one point oh oh times ten to the minus ten meters. What is its frequency?',
      countdown: 10,
      view: { kind: 'try', tex: '\\lambda = 1.00\\times10^{-10}\\ \\text{m}\\quad \\nu = ?', hint: ['ν = c / λ'] },
    },
    {
      ch: 4, say: '[[1]]Nu equals c over lambda: [[2]]three point oh oh times ten to the eighteenth hertz.',
      view: { kind: 'lines', lines: [{ tex: '\\nu = \\dfrac{3.00\\times10^{8}}{1.00\\times10^{-10}}', at: 1 }, { tex: '= 3.00\\times10^{18}\\ \\text{Hz}', at: 2, glow: true }] },
    },
    {
      ch: 5, say: 'Recap. [[1]]Wavelength is one wave’s length; frequency is waves per second. [[2]]They are inversely proportional: c equals lambda nu. [[3]]Radio, microwave, infrared, visible, ultraviolet, X-ray, gamma. [[4]]Convert nanometers to meters first.',
      view: { kind: 'recap', items: [
        { text: 'λ = length of one wave · ν = waves per second (Hz).', at: 1 },
        { text: 'c = λν: λ and ν are inverse.', at: 2 },
        { text: 'Radio → micro → IR → visible → UV → X-ray → gamma.', at: 3 },
        { text: 'nm → m first (× 10⁻⁹).', at: 4 },
      ] },
    },
  ],
}
