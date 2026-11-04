// Classifying polynomials, multiplying factors, and function operations
// (sums, products, quotients, plugging in, and composition) with steps.
import { P, div, polyAdd, polyLatex, polyMul, polyScale, polySub, q, qLatex, termLatex, trim } from './poly.js'

const NUM = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']
const DEGREE = ['constant', 'linear', 'quadratic', 'cubic', 'quartic', 'quintic']
const ordinal = n => `${n}${n % 10 === 1 && n % 100 !== 11 ? 'st' : n % 10 === 2 && n % 100 !== 12 ? 'nd' : n % 10 === 3 && n % 100 !== 13 ? 'rd' : 'th'}`
export const degreeName = n => DEGREE[n] ?? `${ordinal(n)} degree`
export const termsName = k => ['', 'monomial', 'binomial', 'trinomial'][k] ?? `polynomial with ${NUM[k] ?? k} terms`

// Terms are [coefficient, degree] in the order they were written.
export const writtenLatex = (terms, v) => terms.map(([c, d], i) => termLatex(q(c), d, v, i === 0)).join(' ')
export function classify(terms) {
  const deg = Math.max(...terms.map(t => t[1]))
  const coeffs = Array.from({ length: deg + 1 }, () => q(0))
  terms.forEach(([c, d]) => { coeffs[deg - d] = q(coeffs[deg - d].n + c) })
  const poly = trim(coeffs)
  const count = poly.filter(c => c.n !== 0).length
  const n = poly.length - 1
  const combined = new Set(terms.map(t => t[1])).size !== terms.length
  return { poly, degree: n, count, combined, name: `${degreeName(n)} ${termsName(count)}` }
}

export function product(factors) {
  let running = P(factors[0])
  const stages = []
  for (const f of factors.slice(1)) {
    const next = polyMul(running, P(f))
    stages.push({ left: running, right: P(f), result: next })
    running = next
  }
  return { poly: running, stages }
}

// ---------- Function operations ----------
// Node: number | { p: coeffs, tex? } | { f, x: node } | { k, a: node } | { op: '+' | '-' | '*' | '/', a, b }
export function compose(f, arg) {
  return trim(f.reduce((acc, c) => polyAdd(polyMul(acc, arg), [c]), [q(0)]))
}
const isConst = p => trim(p).length === 1
const paren = s => s.startsWith('-') || /[+-]/.test(s.slice(1)) ? `(${s})` : s
const ilcm = (a, b) => { let x = a, y = b; while (y) [x, y] = [y, x % y]; return a / x * b }

// f written with every variable replaced by (arg)
function substituted(f, argTex) {
  const n = f.length - 1
  const parts = []
  f.forEach((c, i) => {
    const d = n - i
    if (c.n === 0) return
    const neg = c.n < 0
    const abs = qLatex(c, { abs: true })
    const coef = d === 0 ? abs : abs === '1' ? '' : abs
    const body = d === 0 ? coef : `${coef}(${argTex})${d > 1 ? `^{${d}}` : ''}`
    parts.push(parts.length ? `${neg ? '-' : '+'} ${body}` : `${neg ? '-' : ''}${body}`)
  })
  return parts.join(' ')
}

export function funcOp({ fns, v, out = v, expr }) {
  const F = Object.fromEntries(Object.entries(fns).map(([k, c]) => [k, P(c)]))
  const steps = []
  const lat = p => polyLatex(p, out)
  function ev(node, top = false, inside = false) {
    if (typeof node === 'number' || Array.isArray(node)) {
      const c = q(...(Array.isArray(node) ? node : [node, 1]))
      return { poly: [c], name: qLatex(c), num: true }
    }
    if (node.p) { const p = P(node.p); return { poly: p, name: node.tex ?? lat(p), num: false } }
    if (node.f) {
      const inner = ev(node.x, false, true)
      const f = F[node.f]
      const result = compose(f, inner.poly)
      const nested = !!node.x.f
      const name = `${node.f}(${inner.name})`
      const argTex = nested ? lat(inner.poly) : inner.name
      const sub = node.x.id ? null : substituted(f, argTex)
      const shown = nested ? `${node.f}(${lat(inner.poly)})` : null
      const res = lat(result)
      const chain = [name, shown, sub === res ? null : sub, res].filter(Boolean)
      if (node.x.id && !inside) return { poly: result, name, num: false }
      steps.push(`${nested ? `**Then** put that answer into $${node.f}$: ` : inside ? '**Inside first:** ' : ''}$${chain.join(' = ')}$`)
      return { poly: result, name, num: inner.num }
    }
    if (node.k != null) {
      const a = ev(node.a)
      const k = q(...(Array.isArray(node.k) ? node.k : [node.k, 1]))
      const kTex = k.n === -1 && k.d === 1 ? '-' : qLatex(k)
      return { poly: polyScale(a.poly, k), name: `${kTex}${a.name}`, value: `${kTex}(${lat(a.poly)})`, num: a.num }
    }
    const a = ev(node.a), b = ev(node.b)
    const va = a.value ?? (a.num ? paren(lat(a.poly)) : `(${lat(a.poly)})`)
    const vb = b.value ?? (b.num ? paren(lat(b.poly)) : `(${lat(b.poly)})`)
    if (node.op === '/') {
      let num = a.poly, den = b.poly
      if (isConst(num) && isConst(den)) {
        const r = div(num[0], den[0])
        steps.push(`$${a.name} \\div ${b.name} = \\dfrac{${lat(num)}}{${lat(den)}} = ${qLatex(r)}$`)
        return { poly: [r], name: qLatex(r), num: true, frac: null }
      }
      const L = [...num, ...den].reduce((acc, c) => ilcm(acc, c.d), 1)
      const cleared = L > 1
      if (cleared) { num = polyScale(num, q(L)); den = polyScale(den, q(L)) }
      const tex = `\\dfrac{${lat(num)}}{${lat(den)}}`
      steps.push(`$${a.name} \\div ${b.name} = \\dfrac{${lat(a.poly)}}{${lat(b.poly)}}${cleared ? ` = ${tex}` : ''}$${cleared ? ` (multiply the top and bottom by $${L}$ to clear the fractions)` : ''}. Write the answer as one fraction.`)
      return { frac: { num, den }, name: tex }
    }
    const opTex = { '+': '+', '-': '-', '*': '\\cdot' }[node.op]
    const poly = node.op === '+' ? polyAdd(a.poly, b.poly) : node.op === '-' ? polySub(a.poly, b.poly) : polyMul(a.poly, b.poly)
    const name = `${a.name} ${opTex} ${b.name}`
    const joinTex = node.op === '*' ? (b.num || !vb.startsWith('(') ? ' \\cdot ' : '') : ` ${opTex} `
    steps.push(`${top ? '**Combine:** ' : ''}$${name} = ${va}${joinTex}${vb} = ${lat(poly)}$${node.op === '-' && !b.num ? ' (the minus sign changes the sign of **every** term inside the parentheses)' : ''}`)
    return { poly, name, num: a.num && b.num }
  }
  const r = ev(expr, true)
  return { result: r, steps, fns: F }
}

export function resultLatex(r, out) {
  if (r.frac) return `\\dfrac{${polyLatex(r.frac.num, out)}}{${polyLatex(r.frac.den, out)}}`
  const p = trim(r.poly)
  const L = p.reduce((acc, c) => ilcm(acc, c.d), 1)
  if (L > 1 && p.length > 1) return `${polyLatex(p, out)} = \\dfrac{${polyLatex(polyScale(p, q(L)), out)}}{${L}}`
  return polyLatex(p, out)
}

// sympy strings for scripts/verify_sympy.py
const qs = c => `(${c.n}/${c.d})`
export const polySympy = (p, v) => trim(p).map((c, i, a) => `${qs(c)}*${v}**${a.length - 1 - i}`).join(' + ')
export function exprSympy(node, out) {
  if (typeof node === 'number') return `(${node})`
  if (Array.isArray(node)) return `(${node[0]}/${node[1]})`
  if (node.p) return `(${polySympy(P(node.p), out)})`
  if (node.f) return `${node.f}(${exprSympy(node.x, out)})`
  if (node.k != null) return `(${Array.isArray(node.k) ? `${node.k[0]}/${node.k[1]}` : node.k})*(${exprSympy(node.a, out)})`
  return `(${exprSympy(node.a, out)}) ${{ '+': '+', '-': '-', '*': '*', '/': '/' }[node.op]} (${exprSympy(node.b, out)})`
}
export function resultSympy(r, out) {
  if (r.frac) return `(${polySympy(r.frac.num, out)})/(${polySympy(r.frac.den, out)})`
  return `(${polySympy(r.poly, out)})`
}
