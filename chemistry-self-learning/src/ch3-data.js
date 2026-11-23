// Chapter 3 data: animation steps and every worksheet item (checked against the class keys by scripts/verify_ch123.mjs).
import { elementOf } from './atomic.js'
import { BY_Z } from './elements.js'
import { EXCEPTIONS, ORDER, aufbau, compare, configOf, configText, electronCount, ionSize, levelCount, orbitals, parseConfig, position, rank, ruleCheck, sameConfig, shorthand, valenceElectrons } from './electrons.js'
import { orbSeg } from './grid.js'
import { closeTo, parseNumber, sup } from './sci.js'

export const BLOCK_STEPS = [
  { block: 's', text: 's-block: groups 1–2 (and He). Each s sublevel has 1 orbital: 2 electrons.' },
  { block: 'p', text: 'p-block: groups 13–18. Each p sublevel has 3 orbitals: 6 electrons.' },
  { block: 'd', text: 'd-block: groups 3–12. Each d sublevel has 5 orbitals: 10 electrons. Its energy level is n − 1.' },
  { block: 'f', text: 'f-block: the two rows below. Each f sublevel has 7 orbitals: 14 electrons. Its energy level is n − 2.' },
  { family: ['alkali', 'alkaline'], text: 'Alkali metals (group 1) and alkaline earth metals (group 2).' },
  { family: ['transition'], text: 'Transition metals: the d-block, groups 3–12.' },
  { family: ['halogen', 'noble'], text: 'Halogens (group 17) and noble gases (group 18).' },
  { metal: true, text: 'Metals sit left of the stair-step line; nonmetals sit right of it. Metalloids border the line.' },
]
export const OXYGEN_STEPS = Array.from({ length: 8 }, (_, k) => k + 1)
export const ruleFor = e => [
  'Aufbau: start in the lowest-energy orbital, 1s.',
  'Pauli: the 2nd electron in an orbital spins the opposite way.',
  'Aufbau: 1s is full, so move up to 2s.',
  'Pauli: 2s gets its 2nd electron, opposite spin.',
  'Aufbau: 2s is full, so move up to 2p. Hund: one per orbital first.',
  'Hund: one electron in each 2p orbital before pairing.',
  'Hund: one electron in each 2p orbital before pairing.',
  'Hund + Pauli: every 2p has one, so now pair, opposite spin.',
][e - 1]
export const BR_PATH = ['1s', '2s', '2p', '3s', '3p', '4s', '3d', '4p']
export const SHORT_STEPS = [
  { z: 16, text: 'Sulfur: go up one period to the noble gas neon. [Ne] covers 1s² 2s² 2p⁶.' },
  { z: 20, text: 'Calcium: up one period is argon. [Ar] then 4s².' },
  { z: 24, expect: true, text: 'Chromium, expected: [Ar] 4s² 3d⁴. That d⁴ is one short of half-full.' },
  { z: 24, text: 'Chromium, actual: [Ar] 4s¹ 3d⁵. Every 3d orbital has one electron: half-full is more stable.' },
  { z: 29, expect: true, text: 'Copper, expected: [Ar] 4s² 3d⁹. That d⁹ is one short of full.' },
  { z: 29, text: 'Copper, actual: [Ar] 4s¹ 3d¹⁰. A full d sublevel is more stable.' },
]
export const ION_STEPS = [
  { z: 15, q: -3, text: 'P³⁻: phosphorus has 15 electrons. A 3− charge means it gained 3: 15 + 3 = 18.' },
  { z: 15, q: -3, done: true, text: 'Fill 18 electrons: [Ne] 3s² 3p⁶. Same electrons as argon.' },
  { z: 13, q: 3, text: 'Al³⁺: aluminum has 13 electrons. A 3+ charge means it lost 3: 13 − 3 = 10.' },
  { z: 13, q: 3, done: true, text: 'Fill 10 electrons: 1s² 2s² 2p⁶. Same electrons as neon.' },
  { z: 35, q: -1, done: true, text: 'Br⁻: 35 + 1 = 36 electrons → [Ar] 4s² 3d¹⁰ 4p⁶.' },
]
export const RADIUS_STEPS = [
  { kind: 'group', list: ['Li', 'Na', 'K'], text: 'Down a group: each period adds an energy level, so atoms get bigger.' },
  { kind: 'period', list: ['Li', 'Be', 'B', 'C', 'N', 'O', 'F'], text: 'Across a period: more protons pull the same energy level in tighter, so atoms get smaller.' },
  { kind: 'ion', list: ['Na', 'Na+'], text: 'Cation vs atom: Na⁺ lost its whole outer level, so it is much smaller than Na.' },
  { kind: 'ion', list: ['Cl', 'Cl-'], text: 'Anion vs atom: Cl⁻ gained an electron; extra repulsion spreads the cloud, so it is bigger.' },
  { kind: 'arrows', text: 'Summary: radius increases down and to the left. Francium is the largest; helium is the smallest.' },
]
export const ENERGY_STEPS = [
  { text: 'Ionization energy: the energy needed to remove an electron. It increases up and to the right.' },
  { text: 'Electronegativity: how strongly an atom attracts shared electrons in a bond. Same direction: F is the highest.' },
  { text: 'Electron affinity: the energy change when an atom gains an electron. Same general direction: Cl and F want electrons most.' },
  { cmp: ['Na', 'O'], trend: 'ionization', text: 'Na or O? Same period, O is further right: O has the larger ionization energy.' },
  { cmp: ['Be', 'Ba'], trend: 'ionization', text: 'Be or Ba? Be is higher on the table: its outer electron is closer, so Be has the larger ionization energy.' },
]

// ---------- Worksheet helpers ----------
const reveal = (n, prompt, answer, steps = [], note) => ({ num: n, prompt, kind: 'reveal', answer, steps, note })
const textItem = (n, prompt, accept, answer, steps, note, placeholder) => ({ num: n, prompt, kind: 'text', accept, answer, steps, note, placeholder })
const words = s => s.toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim()
const acceptWords = list => v => list.map(words).includes(words(v))

function electronSteps(Z, charge = 0) {
  const el = BY_Z(Z)
  const n = Z - charge
  const steps = [charge === 0 ? `${el.name}: atomic number ${Z}, so ${Z} electrons.` : `${el.name} has ${Z} electrons. Charge ${charge > 0 ? `+${charge}: subtract ${charge}` : `${charge}: add ${-charge}`} → ${n} electrons.`]
  const conf = aufbau(n)
  steps.push(`Fill in order: ${configText(conf)}.`)
  const ex = charge === 0 && EXCEPTIONS[Z]
  if (ex) steps.push(`Exception: it would end in ${ex[1]}${sup(conf.find(([s]) => s === ex[1])[1])}, so one ${ex[0]} electron moves into ${ex[1]}: ${configText(configOf(Z, charge))}.`)
  return steps
}
function configItem(n, sym, mode, extra = {}) {
  const charge = extra.charge ?? 0
  const el = elementOf(sym)
  const conf = configOf(el.z, charge)
  const sh = shorthand(el.z, charge)
  const steps = electronSteps(el.z, charge)
  const label = `${el.symbol}${charge ? sup(`${Math.abs(charge) > 1 ? Math.abs(charge) : ''}${charge > 0 ? '+' : '-'}`) : ''}`
  if (mode === 'short') steps.push(sh.core ? `Shorthand: the noble gas before it is ${sh.core} (${configText(aufbau(elementOf(sh.core).z))}). Bracket it and write what is left.` : 'There is no noble gas before it, so write it out in full.')
  return {
    num: n, kind: 'text', placeholder: mode === 'short' ? 'e.g. [Ne] 3s2 3p4' : 'e.g. 1s2 2s2 2p6',
    prompt: `${label}: ${mode === 'short' ? 'shorthand' : 'longhand'} configuration${extra.ask ? ` (${extra.ask})` : ''}`,
    accept: v => sameConfig(parseConfig(v), conf),
    answer: [{ strong: mode === 'short' ? sh.text : configText(conf) }, { muted: `· atomic # ${el.z} · ${electronCount(conf)} electrons` }],
    steps, note: extra.note, conf, text: mode === 'short' ? sh.text : configText(conf),
  }
}
function diagramItem(n, sym, extra = {}) {
  const el = elementOf(sym)
  const conf = configOf(el.z)
  return {
    num: n, kind: 'number', placeholder: '# of electrons',
    prompt: `${el.symbol} (${el.name}): how many electrons? Then draw its orbital diagram.`,
    accept: v => closeTo(parseNumber(v), el.z, 0), wrongHint: 'Not yet. A neutral atom has as many electrons as its atomic number.',
    answer: [{ strong: `${el.z} electrons` }, ` · ${configText(conf)}`, orbSeg(orbitals(conf))],
    steps: [...electronSteps(el.z), 'Draw a box for each orbital (s: 1, p: 3, d: 5). Fill singly with ↑ first (Hund), then pair with ↓ (Pauli).'],
    note: extra.note, conf,
  }
}
const VIOLATIONS = [
  [{ sub: '1s', boxes: ['↑↓'] }, { sub: '2s', boxes: ['↑↓'] }, { sub: '2p', boxes: ['↑↓', '', ''] }],
  [{ sub: '1s', boxes: ['↑↓'] }, { sub: '2s', boxes: ['↑↓'] }, { sub: '2p', boxes: ['↑↓', '↑↓', '↑↓'] }, { sub: '3s', boxes: [''] }, { sub: '3p', boxes: ['↑↓', '↑', '↑'] }],
  [{ sub: '1s', boxes: ['↑↓'] }, { sub: '2s', boxes: ['↑↓'] }, { sub: '2p', boxes: ['↑↓', '↑↓', '↑↓'] }, { sub: '3s', boxes: ['↑↑'] }, { sub: '3p', boxes: ['↑↓', '↑↓', '↑'] }],
  [{ sub: '1s', boxes: ['↑↓'] }, { sub: '2s', boxes: ['↑↓'] }, { sub: '2p', boxes: ['↑↓', '↑↓', '↑↓'] }, { sub: '3s', boxes: ['↑↓'] }, { sub: '3p', boxes: ['↑↓', '↑↓', '↑↓'] }, { sub: '3d', boxes: ['↑↓', '↑↓', '↑↓', '↑↓', '↑↓'] }],
]
const RULE_TEXT = {
  Hund: 'Hund’s rule: each orbital in a sublevel gets one electron before any pair up.',
  Aufbau: 'Aufbau principle: electrons fill the lowest energy level first before moving to the next.',
  Pauli: 'Pauli exclusion principle: two electrons in one orbital must have opposite spins.',
}
export const VIOLATION_ITEMS = VIOLATIONS.map((d, k) => {
  const problems = ruleCheck(d)
  const rule = problems[0].rule
  return {
    num: k + 1, kind: 'choice', choices: ['Hund’s Rule', 'Pauli Exclusion Principle', 'Aufbau Principle'], correct: ['Hund', 'Pauli', 'Aufbau'].indexOf(rule),
    prompt: ['Which rule is violated?', { orb: d.map(r => ({ ...r, mark: problems.some(p => p.sub === r.sub) })), compact: true }],
    answer: RULE_TEXT[rule], steps: problems.map(p => `Problem: ${p.why}.`), rule,
  }
})

export const ORBITAL_WS = ['N', 'Al', 'Cu', 'Xe', 'Mg', 'Mn', 'F', 'Ba', 'Zn', 'Sn', 'S', 'K'].map((s, k) => diagramItem(k + 1, s, s === 'Cu'
  ? { note: 'Your Orbital Diagram WS key shows Cu as 4s² 3d⁹ (straight Aufbau order). Copper is an exception: one 4s electron moves to make a full 3d¹⁰. Your later Orbital & Electron Configuration WS key uses 4s¹ 3d¹⁰.' }
  : {}))

export const ECONFIG_DIAGRAMS = ['Cu', 'S', 'Al'].map((s, k) => diagramItem(k + 1, s))
export const ECONFIG_LONG = [configItem(1, 'Be', 'long'), configItem(2, 'O', 'long', { charge: -2 }), configItem(3, 'Al', 'long', { charge: 3 }), configItem(4, 'Fe', 'long')]
export const ECONFIG_SHORT = [configItem(1, 'Cr', 'short'), configItem(2, 'Br', 'short'), configItem(3, 'Mg', 'short'), configItem(4, 'Cu', 'short')]

// ---------- Periodic trends ----------
const symList = v => (v.match(/[A-Z][a-z]?|[a-z]{1,2}/g) ?? []).map(t => t[0].toUpperCase() + t.slice(1).toLowerCase())
function pairItem(n, a, b, trend) {
  const r = compare(a, b, trend)
  return { num: n, kind: 'choice', prompt: `${a} or ${b}`, choices: [a, b], correct: [a, b].indexOf(r.answer), answer: r.answer, steps: [`${r.a} vs ${r.b}.`, r.why] }
}
function rankItem(n, list, trend, dir = 'up', prompt) {
  const asc = rank(list, trend)
  const order = dir === 'up' ? asc : [...asc].reverse()
  const label = { radius: 'atomic radius', ionization: 'first ionization energy', affinity: 'electron affinity', electronegativity: 'electronegativity' }[trend]
  return {
    num: n, kind: 'text', placeholder: 'Symbols in order, e.g. Ar, P, Si…', prompt: prompt ?? `${list.join(', ')}: ${dir === 'up' ? 'smallest' : 'largest'} to ${dir === 'up' ? 'largest' : 'smallest'} ${label}`,
    accept: v => { const got = symList(v); return got.length === order.length && got.every((s, k) => s === order[k]) },
    answer: order.join(' < '),
    steps: [list.map(s => { const p = position(elementOf(s).z); return `${s}: period ${p.period}, group ${p.group}` }).join(' · '),
      `Different periods: the ${TRENDSIGN[trend]} first. Same period: ${trend === 'radius' ? 'further left is larger' : 'further right is larger'}.`],
  }
}
const TRENDSIGN = { radius: 'lower period is larger', ionization: 'higher (smaller period number) is larger', affinity: 'higher (smaller period number) is larger', electronegativity: 'higher is larger' }
function ionItem(n, sym, charge) {
  const r = ionSize(sym, charge)
  const ion = `${sym}${sup(`${Math.abs(charge) > 1 ? Math.abs(charge) : ''}${charge > 0 ? '+' : '-'}`)}`
  return { num: n, kind: 'choice', prompt: `${sym} or ${ion}`, choices: [sym, ion], correct: charge > 0 ? 0 : 1, answer: charge > 0 ? sym : ion, steps: [r.why] }
}

export const TRENDS_WS = {
  radiusPairs: [['Li', 'K'], ['Ca', 'Ni'], ['Ga', 'B'], ['O', 'C'], ['Cl', 'Br'], ['Be', 'Ba'], ['Si', 'S'], ['Fe', 'Au']].map(([a, b], k) => pairItem(`1${'abcdefgh'[k]}`, a, b, 'radius')),
  radiusWhy: [
    reveal(2, 'What is the periodic trend for atomic size from top to bottom in a group? From left to right in a period?', 'Atomic size increases from top to bottom in a group and decreases from left to right across a period.'),
    reveal(3, 'Why do atoms get smaller as you move left to right in a period?', 'Each step adds a proton (greater nuclear charge) but the electrons stay in the same energy level, so the nucleus pulls the electron cloud in tighter.'),
    reveal(4, 'Why do atoms get larger as you move down a group?', 'Each period adds a new energy level, so the outer electrons are farther from the nucleus and shielded by more inner electrons.'),
    rankItem(5, ['Mg', 'Na', 'P', 'Si', 'Ar'], 'radius', 'up', 'Arrange in order of increasing atomic radius: Mg, Na, P, Si and Ar.'),
  ],
  ionic: [
    reveal(6, 'Define an ion.', 'An atom (or group of atoms) with a charge because it has gained or lost electrons.'),
    reveal(7, 'What is the difference between a cation and an anion?', 'A cation is a positive ion: it lost electrons (usually a metal). An anion is a negative ion: it gained electrons (usually a nonmetal).'),
    reveal(8, 'Explain the relationship between the relative size of an ion to its neutral atom and the charge on the ion.', 'Positive ions (cations) are smaller than their neutral atoms; negative ions (anions) are larger. The more electrons lost, the smaller the ion; the more gained, the larger.', ['Losing electrons leaves the same protons pulling on fewer electrons, and often removes a whole energy level.', 'Gaining electrons adds electron–electron repulsion while the proton count stays the same.']),
    ionItem('9a', 'Na', 1), ionItem('9b', 'S', -2), ionItem('9c', 'I', -1), ionItem('9d', 'Al', 3),
  ],
  ionization: [
    reveal(10, 'What is ionization energy? What is first ionization energy?', 'Ionization energy is the energy needed to remove an electron from an atom. First ionization energy is the energy needed to remove the first (outermost) electron from a neutral atom.'),
    reveal(11, 'What is the periodic trend for first ionization energy?', 'It increases from left to right across a period and decreases from top to bottom in a group (highest at the top right: He, Ne, F).'),
    ...[['Na', 'O'], ['Be', 'Ba'], ['Ar', 'F'], ['Cu', 'Ra'], ['I', 'Ne'], ['K', 'V'], ['Ca', 'Fr'], ['W', 'Se']].map(([a, b], k) => pairItem(`12${'abcdefgh'[k]}`, a, b, 'ionization')),
    rankItem('13a', ['Be', 'Mg', 'Sr'], 'ionization', 'up', 'Increasing ionization energy: Be, Mg, Sr'),
    rankItem('13b', ['Bi', 'Cs', 'Ba'], 'ionization', 'up', 'Increasing ionization energy: Bi, Cs, Ba'),
    rankItem('13c', ['Na', 'Al', 'S'], 'ionization', 'up', 'Increasing ionization energy: Na, Al, S'),
  ],
  electronegativity: [
    reveal(14, 'Define electronegativity.', 'Electronegativity is the ability of an atom to attract shared electrons in a chemical bond.'),
    reveal(15, 'What is the periodic trend for electronegativity?', 'It increases from left to right across a period and decreases from top to bottom in a group. Fluorine is the most electronegative element.'),
    pairItem('16a', 'Cl', 'F', 'electronegativity'),
    pairItem('16b', 'C', 'N', 'electronegativity'),
    reveal('16c', 'Mg or Ne', 'Mg', ['Ne is a noble gas: it does not form bonds, so it is not given an electronegativity value. Mg (1.31 on the Pauling scale) is the only one of the pair with a value.'], 'If your teacher wants the trend arrow alone, Ne is further right. Check which answer was used in class.'),
    pairItem('16d', 'As', 'Ca', 'electronegativity'),
  ],
  affinity: [
    reveal(17, 'What is electron affinity?', 'The energy change when a neutral atom gains an electron: how strongly an atom “wants” an extra electron.'),
    reveal(18, 'What is the periodic trend for electron affinity?', 'Electron affinity generally increases from left to right across a period and decreases from top to bottom in a group. Halogens have the greatest; noble gases are left out.'),
    rankItem(19, ['Br', 'Sb', 'I', 'Te', 'Cl'], 'affinity', 'up', 'Arrange in order of increasing electron affinity: Br, Sb, I, Te, Cl'),
  ],
}

// ---------- Unit 3 exam review ----------
const parseEl = v => { const w = v.trim(); const el = elementOf(w[0]?.toUpperCase() + w.slice(1).toLowerCase()) ?? elementOf(w); return el }
const elementAccept = sym => v => parseEl(v)?.symbol === sym
const fromConfig = text => BY_Z(electronCount(parseConfig(text)))
const UNIT3_TEXT = '1s2 2s2 2p6 3s2 3p4'
export const UNIT3_ITEMS = {
  basics: [
    textItem(1, 'The number of valence electrons in helium is ___, but in all other noble gases it is ___.', acceptWords(['2, 8', '2 8', '2 and 8']), '2 and 8', ['Helium is 1s²: its only energy level is full with 2.', 'The other noble gases end in ns² np⁶: 2 + 6 = 8.'], undefined, 'e.g. 2, 8'),
    textItem(2, 'In any p sublevel (block), there are how many p orbitals?', v => parseNumber(v) === 3, '3', ['p has 3 orbitals: px, py, pz.']),
    textItem(3, 'The maximum number of electrons possible in any p sublevel is ___.', v => parseNumber(v) === 6, '6', ['3 orbitals × 2 electrons each = 6.']),
    { num: 4, kind: 'choice', prompt: 'A 3d orbital has (more, less) energy than a 4s orbital.', choices: ['more', 'less'], correct: 0, answer: 'more', steps: ['Aufbau order: … 3p, 4s, 3d … — 4s fills first because it is lower in energy.'] },
    textItem(5, 'In sodium, the block (sublevel) with the highest energy is the ___.', v => words(v) === configOf(11).at(-1)[0], configOf(11).at(-1)[0], [`Na: ${configText(configOf(11))}.`, 'The last sublevel filled is 3s.'], undefined, 'e.g. 2p'),
    textItem(6, 'The element having atomic number 36 is ___. The number of electrons in its 3d sublevel is ___.', v => /krypton|\bkr\b/i.test(v) && /\b10\b/.test(v), `${BY_Z(36).name}; ${configOf(36).find(([s]) => s === '3d')[1]}`, [`Atomic number 36 → ${BY_Z(36).name}.`, `${configText(configOf(36))}: 3d¹⁰.`], undefined, 'e.g. krypton, 10'),
    textItem(7, 'No more than ___ electrons can fill an orbital.', v => parseNumber(v) === 2, '2', ['Pauli exclusion principle: 2 electrons with opposite spins.']),
    textItem(8, '1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹ is the configuration of which element?', elementAccept(fromConfig('1s2 2s2 2p6 3s2 3p6 4s1').symbol), fromConfig('1s2 2s2 2p6 3s2 3p6 4s1').name, ['Add the superscripts: 2 + 2 + 6 + 2 + 6 + 1 = 19.', 'Atomic number 19 is potassium.']),
    textItem(9, '1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d¹⁰ 4p¹ is which element, and how many electrons are in its outermost shell?', v => /gallium|\bga\b/i.test(v) && /\b3\b/.test(v), `${fromConfig('1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p1').name}; ${valenceElectrons(parseConfig('1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p1'))} valence electrons`, ['Add the superscripts: 31 → gallium.', 'Outermost shell is n = 4: 4s² 4p¹ = 3 electrons (aka valence electrons). 3d is not in the outer shell.'], undefined, 'e.g. gallium, 3'),
    { num: 10, kind: 'choice', prompt: 'Which of these sublevels has the lowest energy?', choices: ['3d', '3p', '2s', '2p'], correct: ['3d', '3p', '2s', '2p'].indexOf(['3d', '3p', '2s', '2p'].sort((a, b) => ORDER.indexOf(a) - ORDER.indexOf(b))[0]), answer: '2s', steps: ['Aufbau order: 1s 2s 2p 3s 3p 4s 3d … — 2s comes first of these.'] },
    textItem(12, `For the neutral atom 1s² 2s² 2p⁶ 3s² 3p⁴: how many valence electrons?`, v => parseNumber(v) === valenceElectrons(parseConfig(UNIT3_TEXT)), String(valenceElectrons(parseConfig(UNIT3_TEXT))), ['Outer energy level is n = 3: 3s² 3p⁴ → 2 + 4 = 6.']),
    textItem(13, 'Same atom: the total number of electrons in the second energy level?', v => parseNumber(v) === levelCount(parseConfig(UNIT3_TEXT), 2), String(levelCount(parseConfig(UNIT3_TEXT), 2)), ['Level 2 is 2s² 2p⁶: 2 + 6 = 8.']),
    textItem(14, 'Same atom: what element is it?', elementAccept(fromConfig(UNIT3_TEXT).symbol), fromConfig(UNIT3_TEXT).name, ['2 + 2 + 6 + 2 + 4 = 16 electrons → sulfur.']),
  ],
  identify: [['15', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s1', '1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d¹⁰ 4p⁶ 5s¹'], ['16', '1s2 2s2 2p6 3s2 3p2', '1s² 2s² 2p⁶ 3s² 3p²'], ['17', '[Kr] 5s1 4d10', '[Kr] 5s¹ 4d¹⁰']].map(([n, raw, shown]) => {
    const el = fromConfig(raw)
    return textItem(n, `Identify the element: ${shown}`, elementAccept(el.symbol), `${el.symbol} (${el.name})`, [`Count the electrons${raw.startsWith('[') ? ' (Kr = 36)' : ''}: ${electronCount(parseConfig(raw))}.`, `Atomic number ${el.z} is ${el.name}.`, ...(el.symbol === 'Ag' ? ['Silver is an exception like copper: 5s¹ 4d¹⁰ instead of 5s² 4d⁹.'] : [])], undefined, 'Symbol or name')
  }),
  terms: [
    [18, 'The principle that electrons fill the lowest energy orbitals first.', ['aufbau', 'aufbau principle', 'aufbaus principle', 'aufbau rule'], 'Aufbau principle'],
    [19, 'Each orbital can hold TWO electrons with opposite spins.', ['pauli', 'pauli exclusion', 'pauli exclusion principle'], 'Pauli exclusion principle'],
    [20, 'When filling sublevels, fill each orbital with one electron before you start pairing them.', ['hund', 'hunds', 'hunds rule', 'hund rule'], 'Hund’s rule'],
    [21, 'A term describing the outermost electrons in an atom.', ['valence electrons', 'valence electron', 'valence'], 'Valence electrons'],
    [22, 'Classification of elements found to the left of the “stair-step” line.', ['metals', 'metal'], 'Metals'],
    [23, 'Classification of elements found to the right of the “stair-step” line.', ['nonmetals', 'nonmetal', 'non metals', 'non metal'], 'Nonmetals'],
    [24, 'The section of the periodic table that includes only the elements in the d-block.', ['transition metals', 'transition metal', 'transition elements'], 'Transition metals'],
  ].map(([n, p, ok, ans]) => textItem(n, p, acceptWords(ok), ans, [])),
  diagrams: [['25', 'Mg'], ['26', 'Si'], ['27', 'Ti']].map(([n, s]) => diagramItem(n, s)),
  longhand: [['28', 'N'], ['29', 'K'], ['30', 'Cr']].map(([n, s]) => configItem(n, s, 'long')),
  shorthand: [['31', 'Sb'], ['32', 'Bi'], ['33', 'Tc'], ['34', 'Ge']].map(([n, s]) => configItem(n, s, 'short')),
  ions: [['35', 'Te', -2], ['36', 'B', 3], ['37', 'Ba', 2], ['38', 'Br', -1], ['39', 'K', 1]].map(([n, s, q]) => configItem(n, s, 'short', { charge: q, note: s === 'B' ? 'Only 2 electrons are left, so there is no noble gas to bracket: write 1s² (the same as helium).' : undefined })),
  radius: [pairItem('40', 'C', 'Sn', 'radius'), pairItem('41', 'Sr', 'In', 'radius'), rankItem('42', ['Li', 'K', 'Cs', 'O'], 'radius'), rankItem('43', ['Fe', 'P', 'Ra', 'Ti'], 'radius')],
  ionization: [pairItem('44', 'Fr', 'Ne', 'ionization'), pairItem('45', 'Na', 'Si', 'ionization'), rankItem('46', ['Ar', 'Xe', 'Ba', 'Sn'], 'ionization'), rankItem('47', ['Mg', 'C', 'F', 'Sr'], 'ionization')],
  electronegativity: [pairItem('48', 'Cs', 'W', 'electronegativity'), pairItem('49', 'Fe', 'As', 'electronegativity'), pairItem('50', 'Na', 'Si', 'electronegativity')],
  particle: [ionItem('51', 'Mg', 2), ionItem('52', 'I', -1)],
}

