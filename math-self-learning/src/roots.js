// Rational Root Theorem, quadratic formula with exact surds, and conjugate
// root pairs. Polynomials are fraction arrays in descending order (see poly.js).
import { P, div, eqQ, evaluate, mul, polyLatex, polyMul, q, qLatex, sub, synthetic, trim } from './poly.js'

const igcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a }
const ilcm = (a, b) => a / igcd(a, b) * b
export const divisors = n => { n = Math.abs(n); const out = []; for (let i = 1; i <= n; i++) if (n % i === 0) out.push(i); return out }

// Scale a rational polynomial to integers with no common factor and a positive lead.
export function integerize(p) {
  const L = p.reduce((acc, c) => ilcm(acc, c.d), 1)
  let ints = p.map(c => c.n * (L / c.d))
  const g = ints.reduce((acc, c) => igcd(acc, c), 0) || 1
  const s = ints[0] < 0 ? -1 : 1
  ints = ints.map(c => c / g * s)
  return { poly: P(ints), factor: q(s * g, L) }
}

// Possible rational zeros p/q, ordered like the answer keys: by q, then p.
export function candidates(p) {
  const a0 = p[p.length - 1].n, an = p[0].n
  const ps = divisors(a0), qs = divisors(an)
  const list = []
  for (const d of qs) for (const n of ps) { const v = q(n, d); if (!list.some(w => eqQ(w, v))) list.push(v) }
  return { ps, qs, list }
}
const pm = v => `\\pm ${qLatex(v)}`.replace('\\pm \\frac', '\\pm\\tfrac')
export const candidatesLatex = (list, zero = false) => [...(zero ? ['0'] : []), ...list.map(pm)].join(',\\ ')

function squarefree(n) {
  let k = 1, m = n
  for (let f = 2; f * f <= m; f++) while (m % (f * f) === 0) { m /= f * f; k *= f }
  return { k, m }
}

// Exact roots of a x^2 + b x + c (integers).
export function quadratic(a, b, c) {
  const D = b * b - 4 * a * c
  const formula = R => `x = \\dfrac{${-b} \\pm \\sqrt{${D}}}{${2 * a}}${R ? ` = ${R}` : ''}`
  const s = Math.round(Math.sqrt(Math.abs(D)))
  if (D >= 0 && s * s === D) {
    const r1 = q(-b + s, 2 * a), r2 = q(-b - s, 2 * a)
    return { D, rational: true, roots: D === 0 ? [r1] : [r1, r2], double: D === 0, formula: formula() }
  }
  const { k, m } = squarefree(Math.abs(D))
  const imag = D < 0
  const g = igcd(igcd(b, k), 2 * a) || 1
  const B = -b / g, K = k / g, Dn = 2 * a / g
  const rad = imag ? (m === 1 ? (K === 1 ? 'i' : `${K}i`) : `${K === 1 ? '' : K}i\\sqrt{${m}}`) : `${K === 1 ? '' : K}\\sqrt{${m}}`
  const top = B === 0 ? `\\pm ${rad}` : `${B} \\pm ${rad}`
  const latex = Dn === 1 ? top : B === 0 ? `\\pm\\dfrac{${rad}}{${Dn}}` : `\\dfrac{${top}}{${Dn}}`
  const sym = sign => `(${B} ${sign} ${K}*sqrt(${m})${imag ? '*I' : ''})/${Dn}`
  return { D, rational: false, imag, latex, sympy: [sym('+'), sym('-')], formula: formula(latex) }
}

// Find rational zeros by testing candidates and dividing them out with synthetic
// division. With { all: true }, the last quadratic is solved exactly too.
export function rationalRoots(std, { given = null } = {}) {
  const poly = P(std)
  let k0 = 0
  while (poly.length - k0 > 1 && poly[poly.length - 1 - k0].n === 0) k0++
  const work = poly.slice(0, poly.length - k0)
  const cand = candidates(work)
  const zeros = []
  const addZero = x => { const z = zeros.find(w => eqQ(w.x, x)); if (z) z.m++; else zeros.push({ x, m: 1 }) }
  if (k0) zeros.push({ x: q(0), m: k0 })
  const rounds = []
  let cur = work
  if (given != null) {
    const x = q(...(Array.isArray(given) ? given : [given, 1]))
    const syn = synthetic(cur, x)
    rounds.push({ poly: cur, given: true, tried: [], found: x, syn })
    addZero(x)
    cur = syn.quotient
  }
  let last = given != null ? q(...(Array.isArray(given) ? given : [given, 1])) : null
  while (cur.length - 1 > 2) {
    const order = [...(last ? [last] : []), ...cand.list.flatMap(v => [v, mul(v, q(-1))])].filter((v, i, arr) => arr.findIndex(w => eqQ(w, v)) === i)
    const tried = []
    let found = null
    for (const x of order) {
      const val = evaluate(cur, x)
      tried.push({ x, val })
      if (val.n === 0) { found = x; break }
    }
    if (!found) { rounds.push({ poly: cur, tried, found: null }); return { poly, k0, work, cand, rounds, zeros, rest: cur } }
    const syn = synthetic(cur, found)
    rounds.push({ poly: cur, tried, found, syn })
    addZero(found)
    last = found
    cur = syn.quotient
  }
  let quad = null, linear = null
  if (cur.length - 1 === 2) {
    const { poly: ip, factor } = integerize(cur)
    const [a, b, c] = ip.map(x => x.n)
    quad = { from: cur, poly: ip, factor, a, b, c, ...quadratic(a, b, c) }
    if (quad.rational) quad.roots.forEach(x => { addZero(x); if (quad.double) addZero(x) })
  } else if (cur.length - 1 === 1) {
    linear = { from: cur, x: div(mul(cur[1], q(-1)), cur[0]) }
    addZero(linear.x)
  }
  return { poly, k0, work, cand, rounds, zeros, quad, linear, rest: null }
}

export const zerosLatex = zeros => zeros.map(z => `${qLatex(z.x)}${z.m > 1 ? `\\text{ mult. }${z.m}` : ''}`).join(',\\ ')
export const qSympy = x => x.d === 1 ? String(x.n) : `${x.n}/${x.d}`

// ---------- Conjugate roots ----------
// A root is [a] (rational; a may be [n, d]) or [a, b, m]: a + b·√m, with m = -1 for i.
const toQ = a => Array.isArray(a) ? q(a[0], a[1]) : q(a)
export const isPaired = r => r.length === 3 && r[1] !== 0
export const conjugate = r => isPaired(r) ? [r[0], -r[1], r[2]] : r
export function rootLatex(r) {
  const A = toQ(r[0])
  if (!isPaired(r)) return qLatex(A)
  const [, b, m] = r
  const unit = m === -1 ? 'i' : `\\sqrt{${m}}`
  const body = `${Math.abs(b) === 1 ? '' : Math.abs(b)}${unit}`
  if (A.n === 0) return `${b < 0 ? '-' : ''}${body}`
  return `${qLatex(A)} ${b < 0 ? '-' : '+'} ${body}`
}
export function rootSympy(r) {
  const A = toQ(r[0])
  if (!isPaired(r)) return qSympy(A)
  const [, b, m] = r
  return `${qSympy(A)} + (${b})*${m === -1 ? 'I' : `sqrt(${m})`}`
}
export const rootKind = r => !isPaired(r) ? 'rational' : r[2] === -1 ? 'complex' : 'irrational'

// (x - r)(x - r̄) = x^2 - 2a x + (a^2 - b^2 m)
export function pairQuadratic(r) {
  const A = toQ(r[0]), [, b, m] = r
  const sq = q(b * b * m)
  const poly = [q(1), mul(A, q(-2)), sub(mul(A, A), sq)]
  const unit = m === -1 ? 'i' : `\\sqrt{${m}}`
  const part = `${Math.abs(b) === 1 ? '' : Math.abs(b)}${unit}`
  const shifted = A.n === 0 ? 'x^2' : `(${polyLatex([q(1), mul(A, q(-1))])})^2`
  const expanded = A.n === 0 ? 'x^2' : polyLatex([q(1), mul(A, q(-2)), mul(A, A)])
  const tail = sq.n < 0 ? `+ ${qLatex(q(-sq.n, sq.d))}` : `- ${qLatex(sq)}`
  const pair = A.n === 0 ? `(x - ${part})(x + ${part})` : `\\big(x - (${rootLatex(r)})\\big)\\big(x - (${rootLatex(conjugate(r))})\\big)`
  const latex = `${pair} = ${shifted} - (${part})^2 = ${expanded} ${tail} = ${polyLatex(poly)}`
  return { poly, latex }
}
export function rationalFactor(r) {
  const A = toQ(r[0])
  return [q(A.d), q(-A.n)]
}

export function buildFromRoots(roots) {
  const factors = []
  roots.forEach(r => {
    if (isPaired(r)) factors.push({ root: r, ...pairQuadratic(r), pair: true })
    else { const f = rationalFactor(r); factors.push({ root: r, poly: f, latex: polyLatex(f), pair: false }) }
  })
  const poly = factors.reduce((acc, f) => polyMul(acc, f.poly), [q(1)])
  return { factors, poly: trim(poly) }
}
