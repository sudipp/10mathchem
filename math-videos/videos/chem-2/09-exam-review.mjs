// Chapter 2 exam review video: rapid-fire questions modeled on the Unit 2 Exam Review
// (contributions, atomic structure, average mass, light, nuclear equations, half-life).
import { R, nuc } from '../chem.mjs'
import { halfLife } from '../../../chemistry-self-learning/src/atomic.js'

const beta = R`\ce{^{0}_{-1}e}`, alpha = nuc(4, 2, 'He')
const ca = halfLife({ mi: 40.0, time: 18.0, t12: 4.5 }, 'mf').value // 2.5 g
if (Math.abs(ca - 2.5) > 1e-9) throw new Error('half-life example changed')
const q = (n, ch, say, text, hint, countdown = 8) => ({ ch, say: `Question ${n}. ${say}`, countdown, view: { kind: 'try', label: `Question <em>${n}.</em>`, text, hint } })
const qt = (n, ch, say, tex, hint, countdown = 8) => ({ ch, say: `Question ${n}. ${say}`, countdown, view: { kind: 'try', label: `Question <em>${n}.</em>`, tex, hint } })

export default {
  id: '09-exam-review',
  tag: 'CHAPTER 2 · EXAM REVIEW',
  chapters: ['Start', 'Atoms', 'Light', 'Nuclear', 'Half-life', 'Checklist'],
  layouts: { pt: { type: 'ptable' } },
  scenes: [
    {
      ch: 0, say: 'Chapter two exam review. Eight quick questions like the ones on your review sheet. Pause, answer on paper, then check.',
      view: { kind: 'title', kicker: 'CHAPTER 2 · EXAM REVIEW', title: 'Ready for', em: 'the test?', sub: '8 questions · pause, try, check' },
    },
    q(1, 1, 'Whose experiment showed the atom has a tiny, dense, positive nucleus? What was the experiment?', 'Tiny dense + nucleus: who? which experiment?', ['1911']),
    {
      ch: 1, say: '[[1]]Rutherford, with the gold foil experiment. Most alpha particles went straight through, but a few bounced back.',
      view: { kind: 'models', items: [{ type: 'foil', label: 'Rutherford · gold foil', at: 1 }] },
    },
    qt(2, 1, 'How many protons, neutrons and electrons are in phosphorus thirty-two with a three minus charge?', `${nuc(32, 15, 'P')}^{3-}`, ['n = A − Z', 'e = p − charge']),
    {
      ch: 1, say: '[[1]]Fifteen protons. [[2]]Thirty-two minus fifteen is seventeen neutrons. [[3]]Three minus means it gained three: eighteen electrons.',
      view: { kind: 'table', rows: [{ left: 'protons', right: '15', at: 1 }, { left: 'neutrons', right: '32 − 15 = 17', at: 2 }, { left: 'electrons', right: '15 + 3 = 18', at: 3 }] },
    },
    q(3, 1, 'Zinc is forty-eight point six percent zinc sixty-four, twenty-seven point nine percent zinc sixty-six, and twenty-three point five percent zinc sixty-eight. Set up the average atomic mass.', '48.6% Zn-64 · 27.9% Zn-66 · 23.5% Zn-68', ['decimal × mass', 'add']),
    {
      ch: 1, say: '[[1]]Decimal times mass for each, [[2]]then add: sixty-five point five amu. It lands between sixty-four and sixty-eight, so it checks.',
      view: { kind: 'lines', lines: [{ tex: '(0.486)(64) + (0.279)(66) + (0.235)(68)', at: 1 }, { tex: `= ${(0.486 * 64 + 0.279 * 66 + 0.235 * 68).toFixed(1)}\\ \\text{amu}`, at: 2, glow: true }] },
    },
    q(4, 2, 'Put these in order from lowest to highest energy: X-ray, radio, visible, ultraviolet.', 'Lowest → highest energy: X-ray, radio, visible, UV', ['R M I V U X G']),
    {
      ch: 2, say: '[[1]]Radio, visible, ultraviolet, X-ray. Higher frequency means more energy.',
      view: { kind: 'spectrum', at: 0, energyAt: 1 },
    },
    qt(5, 2, 'Find the frequency of light with a wavelength of four hundred thirty-four nanometers.', '\\lambda = 434\\ \\text{nm}\\quad \\nu = ?', ['nm → m first', 'ν = c / λ']),
    {
      ch: 2, say: '[[1]]Four thirty-four nanometers is four point three four times ten to the minus seven meters. [[2]]Nu equals c over lambda: six point nine one times ten to the fourteenth hertz.',
      view: { kind: 'lines', lines: [{ tex: '434\\ \\text{nm} = 4.34\\times10^{-7}\\ \\text{m}', at: 1 }, { tex: '\\nu = \\dfrac{3.00\\times10^{8}}{4.34\\times10^{-7}} = 6.91\\times10^{14}\\ \\text{Hz}', at: 2, glow: true }] },
    },
    qt(6, 3, 'Uranium two thirty-five undergoes alpha decay. Write the equation.', `${nuc(235, 92, 'U')} \\rightarrow ${alpha} + \\,?`, ['top: 235 − 4', 'bottom: 92 − 2']),
    {
      ch: 3, say: '[[1]]Two thirty-five minus four is two thirty-one. Ninety-two minus two is ninety. [[2]]Ninety is thorium: thorium two thirty-one.',
      view: { kind: 'lines', lines: [{ tex: '235 - 4 = 231\\qquad 92 - 2 = 90', at: 1 }, { tex: `${nuc(235, 92, 'U')} \\rightarrow ${alpha} + ${nuc(231, 90, 'Th')}`, at: 2, glow: true }] },
    },
    qt(7, 3, 'Fill in the blank.', `${nuc(131, 53, 'I')} \\rightarrow \\,? + ${beta}`, ['top', 'bottom']),
    {
      ch: 3, say: '[[1]]Top: one thirty-one. Bottom: fifty-three equals what minus one, so fifty-four. [[2]]That’s xenon one thirty-one.',
      view: { kind: 'lines', lines: [{ tex: '131 = ? + 0\\qquad 53 = ? + (-1)\\ \\Rightarrow\\ ? = 54', at: 1 }, { tex: `? = ${nuc(131, 54, 'Xe')}`, at: 2, glow: true }] },
    },
    qt(8, 4, 'A forty gram sample has a half-life of four point five days. How much is left after eighteen days?', 'm_i = 40.0\\ \\text{g},\\ t_{1/2} = 4.5\\ \\text{d},\\ \\text{time} = 18.0\\ \\text{d}', ['N = time ÷ t½']),
    {
      ch: 4, say: '[[1]]N equals eighteen over four point five: four half-lives. [[2]]Forty times point five to the fourth is two point five grams.',
      view: { kind: 'lines', lines: [{ tex: 'N = 18.0 / 4.5 = 4', at: 1 }, { tex: `m_f = 40.0\\,(0.5)^4 = ${ca.toFixed(1)}\\ \\text{g}`, at: 2, glow: true }] },
    },
    {
      ch: 5, say: 'Your checklist. [[1]]Nine scientists: contribution plus experiment or model. [[2]]Protons, neutrons, electrons, and average atomic mass. [[3]]c equals lambda nu, E equals h nu, nanometers to meters. [[4]]Balance nuclear equations top and bottom. [[5]]Half-life: m final equals m initial times point five to the N. You’ve got this!',
      view: { kind: 'recap', items: [
        { text: 'Atomic theory: who + what + how', at: 1 },
        { text: 'p = Z · n = A − Z · e = p − charge · weighted average', at: 2 },
        { text: 'c = λν · E = hν · nm → m', at: 3 },
        { text: 'Nuclear: balance top and bottom', at: 4 },
        { text: 'Half-life: m_f = mᵢ(0.5)ᴺ', at: 5 },
      ] },
    },
  ],
}
