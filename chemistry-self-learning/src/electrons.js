// Chapter 3: electron configurations, orbital diagrams, the three filling rules and periodic trends.
import { BY_Z } from './elements.js'
import { elementOf } from './atomic.js'
import { sup } from './sci.js'

export const ORDER = ['1s', '2s', '2p', '3s', '3p', '4s', '3d', '4p', '5s', '4d', '5p', '6s', '4f', '5d', '6p', '7s', '5f', '6d', '7p']
export const CAP = { s: 2, p: 6, d: 10, f: 14 }
const cap = sub => CAP[sub.at(-1)]
const NOBLE = [2, 10, 18, 36, 54, 86, 118]

// The class rule: a d-block atom that would end in d⁴ or d⁹ moves one s electron into d (half-full / full d).
// Applied to the atoms where measurements agree with that rule: Cr, Cu, Mo, Ag, Au.
export const EXCEPTIONS = { 24: ['4s', '3d'], 29: ['4s', '3d'], 42: ['5s', '4d'], 47: ['5s', '4d'], 79: ['6s', '5d'] }

export function aufbau(electrons) {
  const out = []
  let left = electrons
  for (const sub of ORDER) {
    if (left <= 0) break
    const k = Math.min(cap(sub), left)
    out.push([sub, k]); left -= k
  }
  return out
}

export function neutralConfig(Z) {
  const conf = aufbau(Z)
  const ex = EXCEPTIONS[Z]
  if (ex) {
    const s = conf.find(([sub]) => sub === ex[0]), d = conf.find(([sub]) => sub === ex[1])
    s[1] -= 1; d[1] += 1
  }
  return conf
}

// Ions: anions add electrons in filling order; cations lose electrons from the highest energy level first.
export function configOf(Z, charge = 0) {
  if (charge < 0) return aufbau(Z - charge)
  const conf = neutralConfig(Z).map(x => [...x])
  let remove = charge
  while (remove > 0) {
    const maxN = Math.max(...conf.filter(x => x[1] > 0).map(([sub]) => Number(sub[0])))
    const target = conf.filter(([sub, k]) => k > 0 && Number(sub[0]) === maxN).sort((a, b) => 'fdps'.indexOf(a[0][1]) - 'fdps'.indexOf(b[0][1]))[0]
    target[1] -= 1; remove -= 1
  }
  return conf.filter(([, k]) => k > 0)
}

export const configText = conf => conf.map(([sub, k]) => `${sub}${sup(k)}`).join(' ')

// Shorthand: bracket the noble gas one period up from the atom (the class method), then write what is left.
// For ions the class brackets the noble gas below the ion's electron count: K⁺ → [Ne] 3s² 3p⁶, B³⁺ → 1s².
export function shorthand(Z, charge = 0) {
  const conf = configOf(Z, charge)
  const coreZ = [...NOBLE].reverse().find(n => n < electronCount(conf))
  if (!coreZ) return { core: null, rest: conf, text: configText(conf) }
  const core = aufbau(coreZ)
  const rest = conf.filter(([sub, k]) => !core.some(([cs, ck]) => cs === sub && ck === k))
  const coreSym = BY_Z(coreZ).symbol
  return { core: coreSym, rest, text: rest.length ? `[${coreSym}] ${configText(rest)}` : configText(conf) }
}

const SUPDIGIT = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9' }
// Parse "1s2 2s2 2p6", "1s^2 2s^2", "[Ne] 3s² 3p⁴". Returns [[sub, count]...] with any noble-gas core expanded, or null.
export function parseConfig(text) {
  let s = String(text).replace(/[⁰-⁹¹²³]/g, ch => SUPDIGIT[ch] ?? ch).replace(/\^/g, '').replace(/\s+/g, '')
  const out = []
  const core = s.match(/^\[([A-Za-z]{1,2})\]/)
  if (core) {
    const el = elementOf(core[1])
    if (!el || !NOBLE.includes(el.z)) return null
    out.push(...aufbau(el.z)); s = s.slice(core[0].length)
  }
  // Lazy count + lookahead splits run-together text like 5s14d10 into 5s¹ 4d¹⁰.
  const re = /([1-7])([spdf])(\d{1,2}?)(?=[1-7][spdf]|$)/y
  let m, used = 0
  while ((m = re.exec(s))) { out.push([m[1] + m[2], Number(m[3])]); used = re.lastIndex }
  if (used !== s.length || !out.length) return null
  return out
}
export const sameConfig = (a, b) => {
  const norm = c => c.filter(([, k]) => k > 0).map(([sub, k]) => `${sub}${k}`).sort().join(' ')
  return !!a && !!b && norm(a) === norm(b)
}
export const electronCount = conf => conf.reduce((s, [, k]) => s + k, 0)

// Orbital boxes: Hund's rule puts one ↑ in every orbital before pairing with ↓.
export function orbitals(conf) {
  return conf.map(([sub, k]) => {
    const m = cap(sub) / 2
    const ups = Math.min(k, m), downs = k - ups
    return { sub, boxes: Array.from({ length: m }, (_, i) => (i < ups ? '↑' : '') + (i < downs ? '↓' : '')) }
  })
}

// Which rule does a drawn diagram break? diagram: [{ sub, boxes: ['↑↓', '↑', ''] }]
export function ruleCheck(diagram) {
  const problems = []
  for (const { sub, boxes } of diagram) {
    boxes.forEach((b, i) => { if (b === '↑↑' || b === '↓↓' || b.length > 2) problems.push({ rule: 'Pauli', sub, why: `orbital ${i + 1} of ${sub} holds two electrons with the same spin` }) })
    const paired = boxes.some(b => b.length === 2), empty = boxes.some(b => b.length === 0)
    if (paired && empty) problems.push({ rule: 'Hund', sub, why: `${sub} pairs electrons while another ${sub} orbital is still empty` })
  }
  const count = Object.fromEntries(diagram.map(({ sub, boxes }) => [sub, boxes.reduce((s, b) => s + b.length, 0)]))
  const last = Math.max(...diagram.filter(d => count[d.sub] > 0).map(d => ORDER.indexOf(d.sub)))
  for (const sub of ORDER.slice(0, last)) if ((count[sub] ?? 0) < cap(sub)) problems.push({ rule: 'Aufbau', sub, why: `${sub} is ${count[sub] ? 'not full' : 'empty'} but a higher-energy sublevel already has electrons` })
  return problems
}

export const valenceElectrons = conf => {
  const maxN = Math.max(...conf.map(([sub]) => Number(sub[0])))
  return conf.filter(([sub]) => Number(sub[0]) === maxN).reduce((s, [, k]) => s + k, 0)
}
export const levelCount = (conf, n) => conf.filter(([sub]) => Number(sub[0]) === n).reduce((s, [, k]) => s + k, 0)

// ---------- Position and periodic trends ----------
export function position(Z) {
  const period = NOBLE.findIndex(n => Z <= n) + 1
  const start = period === 1 ? 1 : NOBLE[period - 2] + 1
  const pos = Z - start + 1
  let group, block
  if (period === 1) group = Z === 1 ? 1 : 18
  else if (period <= 3) group = pos <= 2 ? pos : pos + 10
  else if (period <= 5) group = pos
  else if (pos <= 2) group = pos
  else if (pos <= 16) { group = 3; block = 'f' } // La-Yb / Ac-No: the f-block row
  else group = pos - 14
  block ??= group <= 2 || Z === 2 ? 's' : group >= 13 ? 'p' : 'd'
  return { period, group, block }
}

const describe = el => { const p = position(el.z); return `${el.symbol} (period ${p.period}, group ${p.group})` }

// Period (energy levels) wins first; within a period, more protons pull the same level in tighter.
function sizeScore(el) { const p = position(el.z); return p.period * 100 - p.group }

export const TRENDS = {
  radius: { label: 'atomic radius', bigger: 'larger', up: false },
  ionization: { label: 'first ionization energy', bigger: 'higher', up: true },
  electronegativity: { label: 'electronegativity', bigger: 'higher', up: true },
  affinity: { label: 'electron affinity', bigger: 'greater', up: true },
}

export function compare(symA, symB, trend) {
  const a = elementOf(symA), b = elementOf(symB)
  const pa = position(a.z), pb = position(b.z)
  const upTrend = TRENDS[trend].up
  const aWins = upTrend ? sizeScore(a) < sizeScore(b) : sizeScore(a) > sizeScore(b)
  const win = aWins ? a : b, lose = aWins ? b : a
  const pw = position(win.z), pl = position(lose.z)
  let why
  if (pa.period !== pb.period) {
    why = upTrend
      ? `${win.symbol} is in period ${pw.period}, higher on the table than ${lose.symbol} (period ${pl.period}). Fewer energy levels keep its outer electrons closer to the nucleus, so it holds them more tightly.`
      : `${win.symbol} is in period ${pw.period}, lower than ${lose.symbol} (period ${pl.period}). More energy levels put its outer electrons farther from the nucleus.`
  } else {
    why = upTrend
      ? `Same period (${pw.period}). ${win.symbol} is further right (group ${pw.group} vs ${pl.group}): more protons pull the same energy level in tighter.`
      : `Same period (${pw.period}). ${win.symbol} is further left (group ${pw.group} vs ${pl.group}): fewer protons pull less on the same energy level.`
  }
  return { answer: win.symbol, other: lose.symbol, why, a: describe(a), b: describe(b) }
}

// Rank a list from smallest to largest for a trend.
export function rank(symbols, trend) {
  const els = symbols.map(elementOf)
  const up = TRENDS[trend].up
  return [...els].sort((x, y) => up ? sizeScore(y) - sizeScore(x) : sizeScore(x) - sizeScore(y)).map(e => e.symbol)
}

// Atom vs its ion: losing electrons shrinks a particle; gaining electrons swells it.
export function ionSize(sym, charge) {
  const el = elementOf(sym)
  return charge > 0
    ? { answer: el.symbol, why: `${el.symbol} is larger. The cation lost ${charge} electron${charge > 1 ? 's' : ''}${position(el.z).block !== 'd' ? ' (its whole outer energy level)' : ''}, and the protons pull the remaining electrons in tighter.` }
    : { answer: `${el.symbol}${sup(`${Math.abs(charge) > 1 ? Math.abs(charge) : ''}-`)}`, why: `The anion is larger. It gained ${-charge} electron${charge < -1 ? 's' : ''}, so more electron–electron repulsion spreads the cloud out while the proton count stays the same.` }
}
