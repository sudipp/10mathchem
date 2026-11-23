// Chapter 2: atomic structure, average atomic mass, light (c = λν, E = hν), nuclear equations and half-life.
// Every worksheet answer on the site is computed here and checked against the class keys in scripts/verify_ch123.mjs.
import { BY_SYMBOL, BY_Z, ELEMENT_LIST } from './elements.js'
import { CONSTANTS } from './measure.js'
import { fixed, sci, sup } from './sci.js'

export const elementOf = s => {
  const key = String(s).trim()
  return BY_SYMBOL[key] ?? ELEMENT_LIST.find(e => e.name.toLowerCase() === key.toLowerCase())
}

// ---------- Atomic structure ----------
// Fill a row of the "Atomic Structure" table from whatever is given.
export function atomRow({ sym, Z, A, p, e, n, charge }) {
  // With only electrons given, assume a neutral atom (protons = electrons).
  Z = Z ?? p ?? (sym ? elementOf(sym).z : e + (charge ?? 0))
  const el = BY_Z(Z)
  if (A == null) A = Z + n
  if (charge == null) charge = e != null ? Z - e : 0
  const electrons = Z - charge
  return { sym: el.symbol, name: el.name, Z, A, protons: Z, electrons, neutrons: A - Z, charge }
}
export const chargeText = q => q === 0 ? '' : sup(`${Math.abs(q) === 1 ? '' : Math.abs(q)}${q > 0 ? '+' : '-'}`)

// ---------- Average atomic mass ----------
export function averageMass(isotopes) {
  const parts = isotopes.map(([pct, mass]) => ({ pct, mass, contribution: pct / 100 * mass }))
  return { parts, total: parts.reduce((s, x) => s + x.contribution, 0) }
}
export function beanium(rows) {
  const count = rows.reduce((s, r) => s + r.count, 0), mass = rows.reduce((s, r) => s + r.mass, 0)
  const out = rows.map(r => ({ ...r, each: r.mass / r.count, pct: 100 * r.count / count }))
  return { rows: out, count, mass, average: out.reduce((s, r) => s + r.pct / 100 * r.each, 0) }
}

// ---------- Light ----------
const { c: C, h: H } = CONSTANTS
const UNIT = { m: 1, nm: 1e-9 }
// given: { lambda: [value, 'nm'|'m'] } | { nu: value } | { E: value }; returns λ (m), ν (Hz), E (J) and worked lines.
export function light(given, sf = 3) {
  const lines = []
  let lambda, nu, E
  if (given.lambda) {
    const [v, u] = given.lambda
    lambda = v * UNIT[u]
    if (u !== 'm') lines.push(`Convert to meters first: ${v} nm × (1 m / 10⁹ nm) = ${sci(lambda, sf)} m`)
    nu = C / lambda
    lines.push(`ν = c / λ = (3.00 × 10⁸ m/s) / (${sci(lambda, sf)} m) = ${sci(nu, sf)} Hz`)
    E = H * nu
  } else if (given.nu) {
    nu = given.nu
    lambda = C / nu
    E = H * nu
  } else {
    E = given.E
    nu = E / H
    lines.push(`ν = E / h = (${sci(E, sf)} J) / (6.6262 × 10⁻³⁴ J·s) = ${sci(nu, sf)} Hz`)
    lambda = C / nu
  }
  return {
    lambda, nu, E, lines,
    lambdaLine: `λ = c / ν = (3.00 × 10⁸ m/s) / (${sci(nu, sf)} s⁻¹) = ${sci(lambda, sf)} m`,
    energyLine: given.lambda
      ? `E = hc / λ = (6.6262 × 10⁻³⁴ J·s)(3.00 × 10⁸ m/s) / (${sci(lambda, sf)} m) = ${sci(E, sf)} J`
      : `E = hν = (6.6262 × 10⁻³⁴ J·s)(${sci(nu, sf)} s⁻¹) = ${sci(E, sf)} J`,
  }
}

export const SPECTRUM = ['radio', 'microwave', 'infrared', 'visible', 'ultraviolet', 'X-ray', 'gamma']

// ---------- Half-life (class formulas) ----------
// mf = mi(.5)^N, N = time / t½;  mi = mf / (.5)^N;  t½ = time·log(.5) / log(mf/mi);  time = t½·log(mf/mi) / log(.5)
export function halfLife({ mi, mf, time, t12, N }, find) {
  const L5 = Math.log10(0.5)
  if (find === 'mf') { const n = N ?? time / t12; return { value: mi * 0.5 ** n, N: n } }
  if (find === 'mi') { const n = N ?? time / t12; return { value: mf / 0.5 ** n, N: n } }
  if (find === 't12') return { value: time * L5 / Math.log10(mf / mi), N: Math.log10(mf / mi) / L5 }
  if (find === 'time') return { value: t12 * Math.log10(mf / mi) / L5, N: Math.log10(mf / mi) / L5 }
  throw new Error(`unknown half-life unknown ${find}`)
}

// ---------- Nuclear equations ----------
export const PARTICLES = {
  alpha: { A: 4, Z: 2, sym: 'He', name: 'alpha particle' },
  beta: { A: 0, Z: -1, sym: 'e', name: 'beta particle (electron)' },
  positron: { A: 0, Z: 1, sym: 'e', name: 'positron' },
  gamma: { A: 0, Z: 0, sym: 'γ', name: 'gamma ray' },
  neutron: { A: 1, Z: 0, sym: 'n', name: 'neutron' },
}
export const nuclide = (sym, A) => { const el = elementOf(sym); return { A, Z: el.z, sym: el.symbol, name: el.name } }
const fromAZ = (A, Z) => { const el = BY_Z(Z); return { A, Z, sym: el.symbol, name: el.name } }

// "uranium-235 undergoes alpha decay", "Th-227 undergoes positron capture". Emission = decay. Beta capture = electron capture.
export function decay(parent, mode) {
  const m = mode.toLowerCase().replace('emission', 'decay').replace('beta capture', 'electron capture')
  const kind = m.startsWith('alpha') ? 'alpha' : m.startsWith('positron') ? 'positron' : m.startsWith('beta') || m.startsWith('electron') ? 'beta' : null
  const capture = m.includes('capture')
  const p = PARTICLES[kind]
  const product = capture ? fromAZ(parent.A + p.A, parent.Z + p.Z) : fromAZ(parent.A - p.A, parent.Z - p.Z)
  return capture
    ? { left: [parent, { ...p, kind }], right: [product], product, capture, kind }
    : { left: [parent], right: [{ ...p, kind }, product], product, capture, kind }
}

// Fill the one missing piece (null) of a nuclear equation so mass numbers and atomic numbers balance.
export function balance(left, right) {
  const sum = (list, k) => list.filter(Boolean).reduce((s, x) => s + x[k], 0)
  const missingLeft = left.includes(null)
  const A = missingLeft ? sum(right, 'A') - sum(left, 'A') : sum(left, 'A') - sum(right, 'A')
  const Z = missingLeft ? sum(right, 'Z') - sum(left, 'Z') : sum(left, 'Z') - sum(right, 'Z')
  if (A === 4 && Z === 2) return { ...PARTICLES.alpha, kind: 'alpha' }
  if (A === 0 && Z === -1) return { ...PARTICLES.beta, kind: 'beta' }
  if (A === 0 && Z === 1) return { ...PARTICLES.positron, kind: 'positron' }
  if (A === 0 && Z === 0) return { ...PARTICLES.gamma, kind: 'gamma' }
  if (A === 1 && Z === 0) return { ...PARTICLES.neutron, kind: 'neutron' }
  return fromAZ(A, Z)
}

export const nuclideText = x => `${sup(x.A)}${x.sym}`
export const show = (x, sf, useSci) => useSci ? sci(x, sf) : fixed(x, sf)
