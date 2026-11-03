// Exact polynomial arithmetic with step-by-step records for teaching.
// Polynomials are arrays of fractions in DESCENDING order of degree.

const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1 }

export function q(n, d = 1) {
  if (d < 0) { n = -n; d = -d }
  const g = gcd(n, d)
  return { n: n / g, d: d / g }
}
const toQ = x => typeof x === 'number' ? q(x) : Array.isArray(x) ? q(x[0], x[1]) : x
export const add = (a, b) => q(a.n * b.d + b.n * a.d, a.d * b.d)
export const sub = (a, b) => q(a.n * b.d - b.n * a.d, a.d * b.d)
export const mul = (a, b) => q(a.n * b.n, a.d * b.d)
export const div = (a, b) => q(a.n * b.d, a.d * b.n)
export const isZero = a => a.n === 0
export const num = a => a.n / a.d
export const eqQ = (a, b) => a.n === b.n && a.d === b.d

export const P = arr => trim(arr.map(toQ))
export function trim(p) {
  let i = 0
  while (i < p.length - 1 && isZero(p[i])) i++
  return p.slice(i)
}
export const degree = p => trim(p).length - 1
export const coefAt = (p, d) => p[p.length - 1 - d] ?? q(0)
export const isZeroPoly = p => trim(p).every(isZero)

export function polyAdd(a, b) {
  const n = Math.max(a.length, b.length)
  const out = []
  for (let d = n - 1; d >= 0; d--) out.push(add(coefAt(a, d), coefAt(b, d)))
  return trim(out)
}
export const polyScale = (p, c) => p.map(x => mul(x, c))
export const polyNeg = p => polyScale(p, q(-1))
export const polySub = (a, b) => polyAdd(a, polyNeg(b))
export function polyMul(a, b) {
  const out = Array.from({ length: a.length + b.length - 1 }, () => q(0))
  a.forEach((x, i) => b.forEach((y, j) => { out[i + j] = add(out[i + j], mul(x, y)) }))
  return trim(out)
}
export const shift = (p, k) => [...p, ...Array.from({ length: k }, () => q(0))]

export function evaluate(p, x) {
  x = toQ(x)
  return p.reduce((acc, c) => add(mul(acc, x), c), q(0))
}
export const evalNum = (p, x) => p.reduce((acc, c) => acc * x + num(c), 0)
export function derivative(p) {
  const n = p.length - 1
  return n === 0 ? [q(0)] : p.slice(0, -1).map((c, i) => mul(c, q(n - i)))
}

// ---------- LaTeX ----------
export function qLatex(a, { abs = false } = {}) {
  const n = abs ? Math.abs(a.n) : a.n
  if (a.d === 1) return String(n)
  return `${n < 0 ? '-' : ''}\\frac{${Math.abs(n)}}{${a.d}}`
}
function power(v, d) { return d === 0 ? '' : d === 1 ? v : `${v}^{${d}}` }
export function termBody(c, d, v) {
  const absC = qLatex(c, { abs: true })
  if (d === 0) return absC
  return `${absC === '1' ? '' : absC}${power(v, d)}`
}
// options.zeros: keep zero terms (used to show placeholders like 0x)
export function polyLatex(p, v = 'x', { zeros = false } = {}) {
  const t = trim(p)
  const parts = []
  t.forEach((c, i) => {
    const d = t.length - 1 - i
    if (isZero(c) && !(zeros && parts.length)) return
    const body = termBody(c, d, v)
    const neg = c.n < 0
    parts.push(parts.length === 0 ? `${neg ? '-' : ''}${body}` : `${neg ? '-' : '+'} ${body}`)
  })
  return parts.length ? parts.join(' ') : '0'
}
export const termLatex = (c, d, v, first) => {
  const body = termBody(c, d, v)
  if (first) return `${c.n < 0 ? '-' : ''}${body}`
  return `${c.n < 0 ? '-' : '+'} ${body}`
}
const wrap = s => /[+-]/.test(s.replace(/^-/, '')) ? `(${s})` : s

// quotient + remainder / divisor, written the way the answer keys write it
export function fractionForm(quotient, remainder, divisor, v = 'x') {
  const qs = isZeroPoly(quotient) ? '' : polyLatex(quotient, v)
  if (isZeroPoly(remainder)) return qs || '0'
  const r = trim(remainder)
  const dl = polyLatex(divisor, v)
  if (r.length === 1 && r[0].n < 0) return `${qs} - \\dfrac{${qLatex(r[0], { abs: true })}}{${dl}}`
  return `${qs}${qs ? ' + ' : ''}\\dfrac{${polyLatex(r, v)}}{${dl}}`
}

// ---------- Long division ----------
export function longDivide(numer, denom, v = 'x') {
  const N = trim(numer), D = trim(denom)
  const degD = D.length - 1
  const degQ = Math.max(N.length - 1 - degD, 0)
  const quotient = Array.from({ length: degQ + 1 }, () => q(0))
  let rem = N
  const cycles = []
  while (!isZeroPoly(rem) && rem.length - 1 >= degD) {
    const degR = rem.length - 1
    const k = degR - degD
    const c = div(rem[0], D[0])
    quotient[degQ - k] = c
    const product = shift(polyScale(D, c), k)
    const full = polySub(rem, product)
    cycles.push({ degR, k, c, product, leadTerm: [rem[0], degR], after: full })
    rem = full
  }
  cycles.forEach((cy, i) => {
    cy.low = i === cycles.length - 1 ? 0 : Math.max(0, cycles[i + 1].degR - degD)
    const t = (x, d) => `${x.n < 0 ? '-' : ''}${termBody(x, d, v)}`
    const termC = t(cy.c, cy.k)
    const nextDeg = cy.degR - degD - 1
    const brought = i < cycles.length - 1 && nextDeg >= 0 && nextDeg >= cy.low ? coefAt(N, nextDeg) : null
    cy.explain = [
      `**Divide** the leading terms: $${t(cy.leadTerm[0], cy.leadTerm[1])} \\div ${t(D[0], degD)} = ${termC}$. Write $${termC}$ on top.`,
      `**Multiply** the divisor by $${termC}$: $${wrap(termC)}${wrap(polyLatex(D, v))} = ${polyLatex(cy.product, v)}$.`,
      `**Subtract** (change the signs and add)${brought ? `, then **bring down** $${termLatex(brought, nextDeg, v, true)}$` : ''}. ${i === cycles.length - 1 ? `The degree of what is left is less than the divisor’s, so we stop. **Remainder: $${polyLatex(rem, v)}$**.` : ''}`,
    ]
  })
  return { numer: N, denom: D, quotient: trim(quotient), remainder: trim(rem), cycles, v, answer: fractionForm(trim(quotient), trim(rem), D, v) }
}

// ---------- Synthetic division by (x - k) ----------
export function synthetic(numer, k, v = 'x') {
  const a = numer.map(toQ)
  k = toQ(k)
  const b = [a[0]], products = [null]
  for (let i = 1; i < a.length; i++) {
    products.push(mul(b[i - 1], k))
    b.push(add(a[i], products[i]))
  }
  const quotient = trim(b.slice(0, -1))
  const remainder = [b[b.length - 1]]
  const divisor = [q(1), mul(k, q(-1))]
  const steps = [`**Bring down** the first coefficient, $${qLatex(b[0])}$.`]
  for (let i = 1; i < a.length; i++) {
    steps.push(`**Multiply** $${qLatex(k)} \\times ${wrapNum(b[i - 1])} = ${qLatex(products[i])}$. Write it under the next coefficient.`)
    steps.push(`**Add** $${qLatex(a[i])} + ${wrapNum(products[i])} = ${qLatex(b[i])}$.${i === a.length - 1 ? ` The last number is the **remainder**.` : ''}`)
  }
  return { coeffs: a, k, products, results: b, quotient, remainder, divisor, steps, v, answer: fractionForm(quotient, remainder, divisor, v) }
}
const wrapNum = c => c.n < 0 ? `(${qLatex(c)})` : qLatex(c)

// ---------- Building polynomials from zeros ----------
// zero: [p, q, mult] means x = p/q with that multiplicity
export function factorForZero([p, d = 1]) {
  const z = q(p, d)
  return [q(z.d), q(-z.n)] // z.d·x − z.n
}
export function fromZeros(zeros) {
  let poly = [q(1)]
  const factors = []
  zeros.forEach(([p, d = 1, m = 1]) => {
    for (let i = 0; i < m; i++) { const f = factorForZero([p, d]); factors.push(f); poly = polyMul(poly, f) }
  })
  return { factors, poly }
}

// ---------- Numeric analysis for graphs ----------
function bisect(f, a, b) {
  let fa = f(a)
  for (let i = 0; i < 80; i++) {
    const m = (a + b) / 2, fm = f(m)
    if (fm === 0) return m
    if (Math.sign(fm) === Math.sign(fa)) { a = m; fa = fm } else b = m
  }
  return (a + b) / 2
}
function signChangeRoots(f, lo = -12, hi = 12, step = 0.0025) {
  const roots = []
  let x0 = lo, f0 = f(x0)
  for (let x = lo + step; x <= hi + 1e-12; x += step) {
    const f1 = f(x)
    if (f0 === 0) roots.push(x0)
    else if (Math.sign(f0) !== Math.sign(f1) && f1 !== 0) roots.push(bisect(f, x0, x))
    x0 = x; f0 = f1
  }
  return roots
}
export function analyze(p) {
  const f = x => evalNum(p, x)
  const dp = derivative(p)
  const df = x => evalNum(dp, x)
  const crit = degree(p) > 1 ? signChangeRoots(df) : []
  const zeros = signChangeRoots(f)
  const extrema = crit.map(x => ({ x, y: f(x), type: df(x - 1e-4) > 0 ? 'max' : 'min' }))
  extrema.forEach(e => { if (Math.abs(e.y) < 1e-7 && !zeros.some(z => Math.abs(z - e.x) < 1e-4)) zeros.push(e.x) })
  zeros.sort((a, b) => a - b)
  return { zeros, extrema, f }
}
export const tenth = x => { const r = Math.round(x * 10) / 10; return Object.is(r, -0) ? 0 : r }

// End behavior from degree parity and leading-coefficient sign: [left, right], each +1 (up) or -1 (down).
export function endBehavior(p) {
  const t = trim(p), n = t.length - 1, s = Math.sign(t[0].n)
  return [n % 2 === 0 ? s : -s, s]
}

// A polynomial given as c · Π (a x + b)^m, with exact zeros and multiplicities.
export function fromFactors(c, factors) {
  let poly = [toQ(c)]
  const zeros = factors.map(([a, b, m = 1]) => {
    const A = toQ(a), B = toQ(b)
    for (let i = 0; i < m; i++) poly = polyMul(poly, [A, B])
    return { x: div(mul(B, q(-1)), A), m }
  }).sort((u, v) => num(u.x) - num(v.x))
  return { poly: trim(poly), zeros }
}

// x-values to test between and beyond the zeros: one unit past each end, plus midpoints.
export function testPoints(zeros) {
  const xs = [...new Set(zeros.map(z => num(z.x)))].sort((a, b) => a - b).map(v => zeros.find(z => num(z.x) === v).x)
  const pts = [sub(xs[0], q(1))]
  for (let i = 0; i < xs.length - 1; i++) pts.push(div(add(xs[i], xs[i + 1]), q(2)))
  pts.push(add(xs[xs.length - 1], q(1)))
  return pts
}
