// Chapter 2 data: animation steps and every worksheet item (checked against the class keys by scripts/verify_ch123.mjs).
import { PARTICLES, SPECTRUM, atomRow, averageMass, balance, beanium, chargeText, decay, elementOf, halfLife, light, nuclide } from './atomic.js'
import { eqSeg, nucSeg } from './grid.js'
import { closeTo, fixed, parseNumber, sci } from './sci.js'

export const THEORY = [
  { who: 'Democritus', when: '~400 BC', idea: 'Matter is made of tiny particles that cannot be cut: “atomos.”', how: 'Pure reasoning, no experiments.' },
  { who: 'Alchemy', when: '~300 BC–1600s', idea: 'Tried to turn cheap metals into gold. It failed, but alchemists invented lab tools and techniques and discovered several elements.', how: 'Trial and error with heat, flasks and furnaces.' },
  { who: 'Dalton', when: '1803', idea: 'Atomic theory: all matter is atoms; atoms of one element are identical; atoms combine in whole-number ratios and are rearranged, not created or destroyed, in reactions.', how: 'Model: a solid sphere (“billiard ball”).' },
  { who: 'Becquerel', when: '1896', idea: 'Discovered radioactivity: uranium gives off rays on its own.', how: 'Uranium salts fogged a wrapped photographic plate.' },
  { who: 'Thomson', when: '1897', idea: 'Discovered the electron, a negative particle much smaller than an atom.', how: 'Cathode ray tube. Model: “plum pudding” (electrons in a positive sphere).' },
  { who: 'Rutherford', when: '1911', idea: 'The atom is mostly empty space with a tiny, dense, positive nucleus.', how: 'Gold foil experiment: most alpha particles passed straight through; a few bounced back.' },
  { who: 'Bohr', when: '1913', idea: 'Electrons orbit the nucleus in fixed energy levels and jump between them.', how: 'Explained hydrogen’s line-emission spectrum. Model: planetary orbits.' },
  { who: 'Schrödinger', when: '1926', idea: 'Electrons behave as waves; an orbital is a region where an electron is likely to be found.', how: 'Wave equation. Model: the electron cloud (quantum mechanical model).' },
  { who: 'Chadwick', when: '1932', idea: 'Discovered the neutron, a neutral particle in the nucleus.', how: 'Bombarded beryllium with alpha particles and detected neutral radiation.' },
]

export const ISO_STEPS = [
  { A: 26, Z: 12, sym: 'Mg', show: 'A', text: 'Mass number (top) = protons + neutrons = 26' },
  { A: 26, Z: 12, sym: 'Mg', show: 'Z', text: 'Atomic number (bottom) = protons = 12' },
  { A: 26, Z: 12, sym: 'Mg', show: 'n', text: 'Neutrons = mass number − atomic number = 26 − 12 = 14' },
  { A: 26, Z: 12, sym: 'Mg', show: 'e', text: 'Neutral atom: electrons = protons = 12' },
  { A: 32, Z: 15, sym: 'P', q: -3, show: 'e', text: 'P³⁻ gained 3 electrons: 15 + 3 = 18 electrons (still 15 p, 17 n)' },
]

export const PHOTONS = [
  { name: 'Red light', nu: 4.57e14, color: '#c0392b' },
  { name: 'Violet light', nu: 7.32e14, color: '#7d3c98' },
  { name: 'X-ray', nu: 3.00e18, color: '#2e86c1' },
]

export const LINES = [
  { from: 3, nm: 656, color: '#e74c3c' },
  { from: 4, nm: 486, color: '#1abc9c' },
  { from: 5, nm: 434, color: '#3498db' },
  { from: 6, nm: 410, color: '#8e44ad' },
]

export const NUC_STEPS = [
  { title: 'Alpha decay', left: [{ A: 252, Z: 98, sym: 'Cf' }], right: [{ A: 248, Z: 96, sym: 'Cm' }, { A: 4, Z: 2, sym: 'He', hi: true }], note: 'An alpha particle (⁴₂He) leaves: mass − 4, atomic number − 2.' },
  { title: 'Beta decay', left: [{ A: 137, Z: 55, sym: 'Cs' }], right: [{ A: 137, Z: 56, sym: 'Ba' }, { A: 0, Z: -1, sym: 'e', hi: true }], note: 'A beta particle (⁰₋₁e, an electron) leaves: mass same, atomic number + 1.' },
  { title: 'Positron decay', left: [{ A: 30, Z: 15, sym: 'P' }], right: [{ A: 30, Z: 14, sym: 'Si' }, { A: 0, Z: 1, sym: 'e', hi: true }], note: 'A positron (⁰₊₁e) leaves: mass same, atomic number − 1.' },
  { title: 'Electron capture', left: [{ A: 125, Z: 53, sym: 'I' }, { A: 0, Z: -1, sym: 'e', hi: true }], right: [{ A: 125, Z: 52, sym: 'Te' }], note: 'The nucleus absorbs an electron: mass same, atomic number − 1.' },
  { title: 'Balance any equation', left: [{ A: 238, Z: 92, sym: 'U' }], right: [{ A: 234, Z: 90, sym: 'Th', hi: true }, { A: 4, Z: 2, sym: 'He' }], note: 'Top: 238 = 234 + 4. Bottom: 92 = 90 + 2. Atomic number 90 is Th.' },
]

export const IODINE = [[80.0, 127], [17.5, 126], [2.5, 128]]

// ---------- Worksheet items ----------
const reveal = (n, prompt, answer, steps = [], note) => ({ num: n, prompt, kind: 'reveal', answer, steps, note })
const choice = (n, prompt, choices, correct, steps, answer, note) => ({ num: n, prompt, kind: 'choice', choices, correct, steps, answer: answer ?? choices[correct], note })
const SPECTRUM_ALIAS = { uv: 'ultraviolet', ir: 'infrared', micro: 'microwave', vis: 'visible', x: 'xray', gammaray: 'gamma', radiowave: 'radio' }
const spectrumWords = text => text.toLowerCase().replace(/x-?rays?/g, 'xray').split(/[<,>\s;]+/)
  .map(w => w.replace(/-/g, '')).filter(w => w && !['ray', 'rays', 'wave', 'waves', 'light', 'lowest', 'highest', 'shortest', 'longest'].includes(w))
  .map(w => w.replace(/s$/, '')).map(w => SPECTRUM_ALIAS[w] ?? w)
const orderItem = (n, prompt, order, steps, placeholder) => ({
  num: n, prompt, kind: 'text', placeholder: placeholder ?? 'Type the order, e.g. radio, microwave, …',
  accept: v => { const got = spectrumWords(v), want = order.map(w => w.toLowerCase().replace(/-/g, '')); return got.length === want.length && got.every((g, k) => g === want[k]) },
  answer: order.join(' < '), steps,
})
// Light problems: given λ, ν or E; find ν, λ or E.
function lightItem(n, prompt, given, find, sf, note) {
  const r = light(given, sf)
  const known = given.lambda ? `λ = ${given.lambda[1] === 'nm' ? `${given.lambda[0]} nm` : `${sci(given.lambda[0], sf)} m`}` : given.nu ? `ν = ${sci(given.nu, sf)} Hz` : `E = ${sci(given.E, sf)} J`
  const plan = { nu: given.E ? 'E = hν, so ν = E / h' : 'c = λν, so ν = c / λ', lambda: 'c = λν, so λ = c / ν', E: given.lambda ? 'E = hc / λ' : 'E = hν' }[find]
  const steps = [`Known: ${known}. Find ${find === 'nu' ? 'ν' : find === 'lambda' ? 'λ' : 'E'}. Use ${plan}.`]
  if (given.lambda?.[1] === 'nm') steps.push(r.lines[0])
  if (find === 'nu') steps.push(given.E ? r.lines[0] : r.lines.at(-1))
  if (find === 'lambda') steps.push(r.lambdaLine)
  if (find === 'E') steps.push(r.energyLine)
  const value = { nu: r.nu, lambda: r.lambda, E: r.E }[find]
  return { num: n, prompt, kind: 'number', accept: v => closeTo(parseNumber(v), value, 0.02), answer: `${sci(value, sf)} ${{ nu: 'Hz', lambda: 'm', E: 'J' }[find]}`, steps: [...steps, `Round to ${sf} significant figures.`], note, value }
}

export const WAVE_ITEMS = [
  reveal('Draw', 'Draw a wave of light with high frequency, and one with low frequency.', 'High frequency: many waves packed close together (short wavelength). Low frequency: a few long, stretched-out waves (long wavelength).', ['Frequency = how many waves pass a point each second.', 'More waves in the same space means each one is shorter.']),
  lightItem(1, 'How many joules of energy are in one photon of orange light whose wavelength is 630 nm?', { lambda: [630, 'nm'] }, 'E', 2, '630 nm has 2 significant figures, so the key rounds to 3.2 × 10⁻¹⁹ J. With 3 sig figs it is 3.16 × 10⁻¹⁹ J.'),
  lightItem(2, 'Violet light has a wavelength of 4.10 × 10⁻¹² m. What is the frequency?', { lambda: [4.10e-12, 'm'] }, 'nu', 3),
  lightItem(3, 'An X-ray machine emits EMR with a wavelength of 1.00 × 10⁻¹⁰ m. What is the frequency?', { lambda: [1.00e-10, 'm'] }, 'nu', 3),
  lightItem(4, 'A photon has a frequency of 2.68 × 10⁶ Hz. Calculate its energy.', { nu: 2.68e6 }, 'E', 3),
  lightItem('5a', 'A photon has ν = 6.165 × 10¹⁴ Hz. Calculate its energy (E).', { nu: 6.165e14 }, 'E', 4),
  lightItem('5b', 'Same photon (ν = 6.165 × 10¹⁴ Hz). Calculate its wavelength (λ).', { nu: 6.165e14 }, 'lambda', 4),
  lightItem('6a', 'Light has a frequency of 1.5 × 10¹⁵ Hz. Calculate its wavelength.', { nu: 1.5e15 }, 'lambda', 2),
  lightItem('6b', 'Same light (ν = 1.5 × 10¹⁵ Hz). Calculate its energy.', { nu: 1.5e15 }, 'E', 2),
  lightItem(7, 'Calculate the wavelength of radiation with a frequency of 8.0 × 10¹⁴ Hz.', { nu: 8.0e14 }, 'lambda', 2),
  orderItem(8, 'Rank the parts of the electromagnetic spectrum from lowest frequency to highest.', SPECTRUM, ['Lowest frequency = longest wavelength = lowest energy: radio.', 'Highest frequency = shortest wavelength = highest energy: gamma.']),
  orderItem(9, 'Rank the parts of the electromagnetic spectrum from shortest wavelength to longest.', [...SPECTRUM].reverse(), ['Shortest wavelength = highest frequency: gamma rays.', 'Then reverse the frequency order from #8.']),
  choice(10, 'What is the relationship between frequency and wavelength?', ['Direct', 'Inverse'], 1, ['c = λν and c never changes.', 'If ν doubles, λ must halve.'], 'Inverse'),
  choice(11, 'What is the relationship between frequency and energy?', ['Direct (proportional)', 'Inverse'], 0, ['E = hν and h is a constant.', 'If ν doubles, E doubles.'], 'Proportional (direct)'),
]

// Half-life items use the class formulas.
function halfItem(n, prompt, data, find, sf, unit, extra = {}) {
  const r = halfLife(data, find)
  const v = r.value
  const knowns = Object.entries(data).map(([k, x]) => `${{ mi: 'm_i', mf: 'm_f', time: 'time', t12: 't½', N: 'N' }[k]} = ${x}`).join(', ')
  const steps = [`Known: ${knowns}. Find ${{ mf: 'm_f', mi: 'm_i', t12: 't½', time: 'time' }[find]}.`]
  if (find === 'mf') steps.push(data.N != null ? `N = ${data.N} half-lives (given).` : `N = time / t½ = ${data.time} / ${data.t12} = ${fixed(r.N, 4)}`, `m_f = m_i(.5)ᴺ = (${data.mi})(.5)^${data.N ?? fixed(r.N, 4)}`)
  if (find === 'mi') steps.push(data.N != null ? `N = ${data.N} half-lives (given).` : `N = time / t½ = ${data.time} / ${data.t12} = ${fixed(r.N, 4)}`, `m_i = m_f / (.5)ᴺ = ${data.mf} / (.5)^${data.N ?? fixed(r.N, 4)}`)
  if (find === 't12') steps.push(`t½ = time·log(.5) / log(m_f/m_i) = (${data.time})log(.5) / log(${data.mf}/${data.mi})`)
  if (find === 'time') steps.push(`time = t½·log(m_f/m_i) / log(.5) = (${data.t12})log(${data.mf}/${data.mi}) / log(.5)`)
  steps.push(`= ${fixed(v, sf)} ${unit} (${sf} significant figures)`)
  return { num: n, prompt, kind: 'number', accept: x => closeTo(parseNumber(x), v, 0.01), answer: `${fixed(v, sf)} ${unit}`, steps, value: v, ...extra }
}
export const HALF_ITEMS = [
  halfItem(1, 'A 127.45 g sample decays to 31.86 g in 14.25 hours. What is the half-life of the substance?', { mi: 127.45, mf: 31.86, time: 14.25 }, 't12', 4, 'hr'),
  halfItem(2, 'A radioactive element has a half-life of 6.50 hours. How much of a 200.00 g sample remains after 19.50 hours?', { mi: 200.00, time: 19.50, t12: 6.50 }, 'mf', 3, 'g'),
  halfItem(3, 'A 96.00 g substance decays to 12.00 g over a period of 18.00 years. What is the half-life?', { mi: 96.00, mf: 12.00, time: 18.00 }, 't12', 4, 'yr'),
  halfItem(4, 'How much of a 144.00 g sample will remain after 4.75 half-lives?', { mi: 144.00, N: 4.75 }, 'mf', 3, 'g'),
  halfItem(5, 'A 310.00 g sample has decayed to 77.50 g. If the half-life is 2.25 days, how much time has passed?', { mi: 310.00, mf: 77.50, t12: 2.25 }, 'time', 3, 'days'),
  halfItem(6, 'A piece of wood contains 15.63% of its original carbon-14. Carbon-14 has a half-life of 5,730 years. How old is the sample?', { mi: 100, mf: 15.63, t12: 5730 }, 'time', 4, 'yr', { note: 'No masses are given, so use percents: m_i = 100 and m_f = 15.63. Only the ratio matters.' }),
  halfItem(7, 'Iodine-131 has a half-life of 5.02 days. How much of a 185.00 g sample remains after 32.08 days?', { mi: 185.00, time: 32.08, t12: 5.02 }, 'mf', 3, 'g'),
  halfItem(8, 'A 225.00 g sample of a substance decays to 17.58 g in 21.50 hours. What is the half-life?', { mi: 225.00, mf: 17.58, time: 21.50 }, 't12', 4, 'hr'),
  halfItem(9, 'After 24.00 hours, a sample has decayed to 10.94 g. The half-life is 5.13 hours. What was the original mass?', { mf: 10.94, time: 24.00, t12: 5.13 }, 'mi', 3, 'g'),
  halfItem(10, 'A 500.00 g sample decays to 62.50 g. If the half-life is 3.25 days, how much time has passed?', { mi: 500.00, mf: 62.50, t12: 3.25 }, 'time', 3, 'days'),
]
export const HALF_NOTES = [
  halfItem('Ex 1', 'Fluorine-21 has a half-life of 5.0 seconds. If you start with 25.0 grams, how much would remain after 60.0 seconds?', { mi: 25.0, time: 60.0, t12: 5.0 }, 'mf', 2, 'g'),
  halfItem('Ex 2', 'Calcium-47 has a half-life of 4.5 days. How many grams were initially present if 2.50 grams remain after 25 days?', { mf: 2.50, time: 25, t12: 4.5 }, 'mi', 2, 'g', { note: 'Your notes round N to 5.6 and get 121 g; with N = 5.556 you get 118 g. Both round to 120 g with 2 significant figures.', accept: x => closeTo(parseNumber(x), 120, 0.03) }),
  halfItem('Ex 3', 'A 173.0 g sample of a substance decays to 11.8 g in 3.78 hours. What is the half-life?', { mi: 173.0, mf: 11.8, time: 3.78 }, 't12', 3, 'hr'),
]

// Nuclear equations
const kindWord = { alpha: 'alpha particle ⁴₂He', beta: 'beta particle ⁰₋₁e', positron: 'positron ⁰₊₁e', gamma: 'gamma ray', neutron: 'neutron' }
export function parseNuclideAnswer(input) {
  const s = String(input).trim().replace(/−/g, '-').replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹₀₁₂₃₄₅₆₇₈₉₊₋⁺⁻]/g, ch => ({ '₊': '+', '₋': '-', '⁺': '+', '⁻': '-' }[ch] ?? String('⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(ch) >= 0 ? '⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(ch) : '₀₁₂₃₄₅₆₇₈₉'.indexOf(ch))))
  // Particle words first, then particle notation for the whole answer (so Xe-131 is never read as "e-").
  if (/positron|β\s*\+|beta\s*\+/i.test(s)) return { kind: 'positron' }
  if (/alpha|α/i.test(s)) return { kind: 'alpha' }
  if (/gamma|γ/i.test(s)) return { kind: 'gamma' }
  if (/beta|β|electron/i.test(s)) return { kind: 'beta' }
  const bare = s.replace(/[\s,]/g, '').toLowerCase()
  if (/^(0?\+1e|e\+|0e\+1|\+e)$/.test(bare)) return { kind: 'positron' }
  if (/^(0?-1e|e-?|0e-1|-e)$/.test(bare)) return { kind: 'beta' }
  if (/^(42he|4he|he-?4|he42)$/.test(bare)) return { kind: 'alpha' }
  const word = s.match(/[A-Za-z]+/)?.[0]
  const el = word && (elementOf(word[0].toUpperCase() + word.slice(1).toLowerCase()) ?? elementOf(word))
  return { el, nums: (s.match(/\d+/g) ?? []).map(Number) }
}
export function nuclideMatches(input, expected) {
  const p = parseNuclideAnswer(input)
  if (expected.kind) return p.kind === expected.kind
  return !!p.el && p.el.symbol === expected.sym && p.nums.includes(expected.A) && p.nums.every(x => x === expected.A || x === expected.Z)
}
const label = x => x.kind ? kindWord[x.kind] : `${x.name}-${x.A}`

// One blank in a printed equation.
function blankItem(n, left, right) {
  const missing = balance(left, right)
  const L2 = left.map(x => x ?? missing), R2 = right.map(x => x ?? missing)
  const sumA = list => list.reduce((t, x) => t + x.A, 0), sumZ = list => list.reduce((t, x) => t + x.Z, 0)
  const onLeft = left.includes(null)
  const others = (onLeft ? left : right).filter(Boolean)
  const target = onLeft ? right : left
  const steps = [
    `Mass numbers (top): ${sumA(target)} = ${[...others.map(x => x.A), '?'].join(' + ')} → ? = ${missing.A}`,
    `Atomic numbers (bottom): ${sumZ(target)} = ${[...others.map(x => x.Z), '?'].join(' + ')} → ? = ${missing.Z}`,
    missing.kind ? `Mass ${missing.A}, charge ${missing.Z > 0 ? '+' : ''}${missing.Z}: that is ${/^[aeiou]/.test(kindWord[missing.kind]) ? 'an' : 'a'} ${kindWord[missing.kind]}.` : `Atomic number ${missing.Z} is ${missing.name} (${missing.sym}).`,
  ]
  return {
    num: n, kind: 'text', placeholder: 'e.g. Th-234, or positron',
    prompt: [eqSeg(left.map(x => x ?? BLANK), right.map(x => x ?? BLANK))],
    accept: v => nuclideMatches(v, missing), answer: [eqSeg(L2, R2), { muted: `(${label(missing)})` }], steps, missing,
  }
}
const BLANK = { A: '?', Z: '?', sym: '___' }
const N = (s, A) => nuclide(s, A)
const P = k => ({ ...PARTICLES[k], kind: k })
export const NUCLEAR_BLANKS = [
  blankItem(1, [N('C', 14)], [null, P('beta')]),
  blankItem(2, [N('B', 8)], [null, N('Be', 8)]),
  blankItem(3, [N('U', 238)], [null, P('alpha')]),
  blankItem(4, [N('Kr', 81)], [N('Rb', 81), null]),
  blankItem(5, [N('Po', 212)], [N('Pb', 208), null]),
  blankItem(6, [null], [N('Pb', 209), P('alpha')]),
  blankItem(7, [N('Ba', 140)], [null, P('beta')]),
  blankItem(8, [N('Br', 75)], [null, N('Se', 75)]),
  blankItem(9, [N('Ar', 38), null], [N('Cl', 38)]),
  blankItem(10, [N('I', 131)], [null, P('beta')]),
  blankItem(11, [N('Sr', 80), null], [N('Rb', 80)]),
  blankItem(12, [N('C', 11)], [null, P('beta')]),
]
export const NUCLEAR_DESCRIBE = [
  reveal(13, 'Alpha decay: describe the change in the nucleus.', 'Mass number decreases by 4; atomic number decreases by 2.', ['The nucleus loses an alpha particle, ⁴₂He: 2 protons + 2 neutrons.']),
  reveal(14, 'Beta decay: describe the change in the nucleus.', 'Mass number stays the same; atomic number increases by 1.', ['A neutron turns into a proton and an electron; the electron (⁰₋₁e) is emitted.']),
  reveal(15, 'Positron decay: describe the change in the nucleus.', 'Mass number stays the same; atomic number decreases by 1.', ['A proton turns into a neutron and a positron; the positron (⁰₊₁e) is emitted.']),
  reveal(16, 'Electron capture: describe the change in the nucleus.', 'Mass number stays the same; atomic number decreases by 1.', ['The nucleus absorbs an electron (⁰₋₁e) from the electron cloud, and a proton becomes a neutron.']),
]
export const RADIATION_TABLE = [
  reveal('a', 'Alpha: charge and isotopic symbol?', 'Charge +2 · symbol ⁴₂He'),
  reveal('b', 'Beta: charge and isotopic symbol?', 'Charge −1 · symbol ⁰₋₁e'),
  reveal('c', 'Positron: charge and isotopic symbol?', 'Charge +1 · symbol ⁰₊₁e'),
]

function decayItem(n, parent, mode, label2) {
  const d = decay(parent, mode)
  const p = d.capture ? d.left[1] : d.right[0]
  const sign = d.capture ? '+' : '−'
  const steps = [
    `${mode.replace(/^\w/, c => c.toUpperCase())}: ${d.capture ? 'the particle is absorbed, so it goes on the LEFT' : 'the particle is given off, so it goes on the RIGHT'}. It is the ${kindWord[d.kind]}.`,
    `Mass number: ${parent.A} ${sign} ${p.A} = ${d.product.A}. Atomic number: ${parent.Z} ${p.Z >= 0 ? sign : sign === '+' ? '−' : '+'} ${Math.abs(p.Z)} = ${d.product.Z}.`,
    `Atomic number ${d.product.Z} is ${d.product.name} (${d.product.sym}).`,
  ]
  return {
    num: n, kind: 'text', placeholder: 'The new nuclide, e.g. Th-231',
    prompt: label2 ?? `${parent.name.toLowerCase()}-${parent.A} undergoes ${mode}`,
    accept: v => nuclideMatches(v, d.product), answer: eqSeg(d.left, d.right), steps, product: d.product, eq: d,
  }
}
const SERIES = [['U', 235, 'alpha decay'], ['Th', 231, 'beta decay'], ['Pa', 231, 'alpha capture'], ['Ac', 227, 'beta decay'], ['Th', 227, 'positron capture'], ['Ra', 223, 'alpha capture'], ['Rn', 219, 'positron decay'], ['Po', 215, 'beta decay']]
export const SERIES_ITEMS = (() => {
  const out = SERIES.map(([s, A, mode], k) => decayItem(k + 1, N(s, A), mode))
  let last = out.at(-1).product
  for (const [k, mode] of [[9, 'beta decay'], [10, 'alpha capture'], [11, 'positron decay']]) {
    const item = decayItem(k, last, mode, `The daughter from above (${last.sym}-${last.A}) undergoes ${mode}`)
    out.push(item); last = item.product
  }
  out[6].note = 'Your answer key shows ²¹⁹₈₇Fr here, but positron decay LOWERS the atomic number by 1: 86 − 1 = 85, astatine. Fr-219 would come from beta decay.'
  return out
})()

// ---------- Unit 2 exam review ----------
const STRUCTURE_ROWS = [
  { given: { sym: 'Mg', A: 26 }, show: '²⁶₁₂Mg' },
  { given: { Z: 19, n: 21 }, show: 'Atomic # 19, 21 neutrons' },
  { given: { e: 16, n: 17 }, show: '16 electrons, 17 neutrons' },
  { given: { A: 3, p: 1 }, show: 'Mass # 3, 1 proton' },
  { given: { A: 109, p: 47, e: 46 }, show: 'Mass # 109, 47 protons, 46 electrons' },
  { given: { sym: 'P', A: 32, charge: -3 }, show: '³²₁₅P³⁻' },
]
export const STRUCTURE_ITEMS = STRUCTURE_ROWS.map((row, k) => {
  const r = atomRow(row.given)
  const steps = []
  if (row.given.e != null && row.given.p == null) steps.push(`Only electrons are given, so assume a neutral atom: protons = electrons = ${row.given.e}.`)
  steps.push(`Atomic number = protons = ${r.Z} → ${r.name} (${r.sym}).`)
  steps.push(row.given.n != null ? `Mass number = protons + neutrons = ${r.Z} + ${row.given.n} = ${r.A}.` : `Neutrons = mass number − atomic number = ${r.A} − ${r.Z} = ${r.neutrons}.`)
  steps.push(r.charge === 0 ? `Neutral: electrons = protons = ${r.electrons}.` : `Charge = protons − electrons = ${r.Z} − ${r.electrons} = ${r.charge > 0 ? '+' : ''}${r.charge}.`)
  return reveal(k + 1, `${row.show}: fill in the symbol, atomic #, mass #, protons, electrons and neutrons.`,
    [nucSeg({ A: r.A, Z: r.Z, sym: r.sym + chargeText(r.charge) }), ` · atomic # ${r.Z} · mass # ${r.A} · ${r.protons} p · ${r.electrons} e⁻ · ${r.neutrons} n`], steps,
    k === 4 ? 'Your key writes this symbol as ¹⁰⁹₄₇Ag, but 47 protons with 46 electrons is the ion Ag⁺ (charge +1).' : undefined)
})
export const STRUCTURE_ANSWERS = STRUCTURE_ROWS.map(row => atomRow(row.given))

function avgItem(n, prompt, isotopes, sf) {
  const r = averageMass(isotopes)
  return {
    num: n, prompt, kind: 'number', accept: v => closeTo(parseNumber(v), r.total, 0.002), answer: `${r.total.toFixed(2)} amu`, value: r.total,
    steps: [...r.parts.map(p => `${(p.pct / 100).toFixed(3)} × ${p.mass} = ${p.contribution.toFixed(3)}`), `Add: ${r.parts.map(p => p.contribution.toFixed(3)).join(' + ')} = ${r.total.toFixed(2)} amu`], sf,
  }
}
export const BEANS = [{ name: 'Black', count: 95, mass: 311.0 }, { name: 'Brown', count: 131, mass: 252.8 }, { name: 'White', count: 72, mass: 97.6 }]
const bean = beanium(BEANS)
export const AVERAGE_ITEMS = [
  avgItem(1, 'Average atomic mass: 80.0% iodine-127, 17.5% iodine-126, and 2.5% iodine-128.', [[80.0, 127], [17.5, 126], [2.5, 128]]),
  avgItem(2, 'Average atomic mass: 71.5% zinc-65, 20.4% zinc-66, and 8.1% zinc-67.', [[71.5, 65], [20.4, 66], [8.1, 67]]),
  {
    num: 'Beanium', prompt: 'Black: 95 beans, 311.0 g · Brown: 131 beans, 252.8 g · White: 72 beans, 97.6 g. Find each average bean mass, each % of beans, and the average atomic mass of “Beanium.”',
    kind: 'number', accept: v => closeTo(parseNumber(v), bean.average, 0.006), value: bean.average,
    answer: `${bean.average.toFixed(2)} g`,
    steps: [
      ...bean.rows.map(r => `${r.name}: ${r.mass} g ÷ ${r.count} = ${r.each.toFixed(2)} g per bean; ${r.count} ÷ ${bean.count} × 100 = ${r.pct.toFixed(2)}%`),
      `Weighted average: ${bean.rows.map(r => `(${(r.pct / 100).toFixed(4)})(${r.each.toFixed(3)})`).join(' + ')} = ${bean.average.toFixed(2)} g`,
      `Check: that is just total mass ÷ total beans = ${bean.mass.toFixed(1)} ÷ ${bean.count} = ${(bean.mass / bean.count).toFixed(2)} g.`,
    ],
  },
]

export const PARTICLE_REVIEW = [
  reveal('Gamma', 'Gamma: nuclear symbol, charge, and minimum substance that blocks it?', '⁰₀γ · charge 0 · your key: concrete', [], 'Thick lead or concrete is needed to block gamma rays.'),
  reveal('Alpha', 'Alpha: nuclear symbol, charge, and minimum substance that blocks it?', '⁴₂He · charge +2 · paper', ['Alpha particles are big and slow, so a sheet of paper (or skin) stops them.']),
  reveal('Beta', 'Beta: nuclear symbol, charge, and minimum substance that blocks it?', '⁰₋₁e · charge −1 · your key: lead', [], 'Most textbooks say a thin sheet of aluminum (or wood) is enough to stop beta particles. Lead certainly stops them; use your teacher’s answer on the test.'),
  reveal('Positron', 'Positron: nuclear symbol, charge, and minimum substance that blocks it?', '⁰₊₁e · charge +1 · your key: lead', [], 'Positrons are as penetrating as beta particles; textbooks list thin aluminum. Use your teacher’s answer on the test.'),
]
export const REVIEW_EQUATIONS = [['U', 235, 'alpha emission'], ['Th', 231, 'beta capture'], ['Pa', 231, 'alpha decay'], ['Ac', 227, 'positron decay'], ['Th', 227, 'alpha capture'], ['Ra', 223, 'beta emission'], ['Rn', 219, 'alpha capture']]
  .map(([s, A, mode], k) => decayItem(k + 1, N(s, A), mode))
export const REVIEW_HALF = [
  halfItem(1, 'A 64.7 g sample of a radioactive isotope with a half-life of 5.36 hours decays for 16.1 hours. What is the final mass?', { mi: 64.7, time: 16.1, t12: 5.36 }, 'mf', 3, 'g'),
  halfItem(2, 'A 27.3 g sample of carbon-14 (half-life = 5730 years) decays for 17,200 years. What is the final mass?', { mi: 27.3, time: 17200, t12: 5730 }, 'mf', 3, 'g'),
  halfItem(3, 'After 42.5 minutes, a radioactive isotope (half-life = 14.2 minutes) has 4.83 g remaining. What was the initial mass?', { mf: 4.83, time: 42.5, t12: 14.2 }, 'mi', 3, 'g'),
  halfItem(4, 'A 7.56 g sample remains after 4.00 half-lives. Find the initial mass.', { mf: 7.56, N: 4.00 }, 'mi', 3, 'g', { note: 'Your key labels this M_f, but the question asks for the initial mass, m_i = 121 g.' }),
  halfItem(5, 'A 182 g sample of cesium-137 (half-life = 30.1 years) decays to 22.6 g. How many years have passed?', { mi: 182, mf: 22.6, t12: 30.1 }, 'time', 3, 'yr'),
  halfItem(6, 'A 12.4 g sample of sodium-24 (half-life = 15.0 hours) decays to 0.775 g. How long has it decayed?', { mi: 12.4, mf: 0.775, t12: 15.0 }, 'time', 3, 'hr'),
  halfItem(7, 'A 146 g sample decays to 18.2 g in 29.7 hours. Determine the half-life of the isotope.', { mi: 146, mf: 18.2, time: 29.7 }, 't12', 3, 'hr'),
  halfItem(8, 'A 58.3 g sample decays to 9.72 g in 26.4 minutes. What is its half-life?', { mi: 58.3, mf: 9.72, time: 26.4 }, 't12', 3, 'min'),
]
export const REVIEW_LIGHT = [
  lightItem(1, 'Find the energy of an infrared photon whose frequency is 2.0 × 10¹² Hz.', { nu: 2.0e12 }, 'E', 2),
  lightItem(2, 'What is the wavelength of a red light wave whose frequency is 4.3 × 10¹⁴ Hz?', { nu: 4.3e14 }, 'lambda', 2),
  lightItem(3, 'Calculate the frequency of an X-ray wave that has a wavelength of 925 nm.', { lambda: [925, 'nm'] }, 'nu', 3, '925 nm is actually in the infrared range, not X-ray; the math is the same.'),
  lightItem(4, 'What is the energy of a cosmic ray photon whose wavelength is 795 nm?', { lambda: [795, 'nm'] }, 'E', 3),
  lightItem(5, 'Find the frequency of a microwave that carries 3.4 × 10⁻²⁵ J of energy.', { E: 3.4e-25 }, 'nu', 2),
]
export const THEORY_ITEMS = THEORY.map((t, k) => reveal(k + 1, `${t.who}: what was the contribution?`, `${t.idea}`, [`${t.when}. ${t.how}`]))

