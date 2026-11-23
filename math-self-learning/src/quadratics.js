// Units 1–2 engine: quadratic functions and equations with exact values.
// Vertex, axis, intercepts, domain/range, increase/decrease, transformations,
// converting between standard, vertex and intercept forms, the quadratic formula
// (simplified surds and complex roots), the discriminant, completing the square,
// systems with a line or a second parabola, and quadratic inequalities in x and y.
// Each generator returns a homework problem; `check` is confirmed by verify_sympy.py.
import { q, add, sub, mul, div, num, eqQ, qLatex, P, polyLatex, polySub, trim } from './poly.js'
import { Q, ptL, windowFor, plus, shiftLatex } from './lines.js'

const R = String.raw
const L = qLatex
const neg = a => q(-a.n, a.d)
const isZ = a => a.n === 0
const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1 }
const lcm = (a, b) => a / gcd(a, b) * b
const sym = a => a.d === 1 ? `${a.n}` : `Rational(${a.n},${a.d})`
const par = a => a.n < 0 ? `(${L(a)})` : L(a)
const sq = a => mul(a, a)
const coef = (a, v) => eqQ(a, q(1)) ? v : eqQ(a, q(-1)) ? `-${v}` : `${L(a)}${v}`
const ONE = q(1), TWO = q(2)

// ---------- quadratics a x² + b x + c ----------
export const quad = (a, b, c) => ({ a: Q(a), b: Q(b), c: Q(c) })
export const qVal = (f, x) => add(add(mul(f.a, sq(Q(x))), mul(f.b, Q(x))), f.c)
export const qFn = f => x => num(f.a) * x * x + num(f.b) * x + num(f.c)
export const qLatexStd = (f, v = 'x') => polyLatex([f.a, f.b, f.c], v)
export const qSympy = (f, v = 'x') => `${sym(f.a)}*${v}**2 + ${sym(f.b)}*${v} + ${sym(f.c)}`
export function vertexOf(f) {
  const h = div(neg(f.b), mul(TWO, f.a))
  return { h, k: qVal(f, h) }
}
// a(x − h)² + k
export function vertexLatex(a, h, k, v = 'x') {
  const sqr = isZ(h) ? `${v}^2` : `(${shiftLatex(v, h)})^2`
  return `${eqQ(a, ONE) ? '' : eqQ(a, q(-1)) ? '-' : L(a)}${sqr}${plus(k)}`
}
export const fromVertex = (a, h, k) => quad(a, mul(mul(q(-2), Q(a)), Q(h)), add(mul(Q(a), sq(Q(h))), Q(k)))
export const fromRoots = (a, r, s) => quad(a, mul(neg(Q(a)), add(Q(r), Q(s))), mul(Q(a), mul(Q(r), Q(s))))

// ---------- exact roots ----------
// Roots of a x² + b x + c: rational, surd (p ± m√r)/d, or complex (p ± m i√r)/d.
export function solveQuad(f, v = 'x') {
  const D0 = lcm(lcm(f.a.d, f.b.d), f.c.d)
  let A = f.a.n * (D0 / f.a.d), B = f.b.n * (D0 / f.b.d), C = f.c.n * (D0 / f.c.d)
  const G = gcd(gcd(A, B), C); A /= G; B /= G; C /= G
  if (A < 0) { A = -A; B = -B; C = -C }
  const D = B * B - 4 * A * C
  const out = { A, B, C, D, v }
  if (D === 0) {
    const r = q(-B, 2 * A)
    return { ...out, kind: 'one', roots: [{ q: r, latex: L(r), sympy: sym(r), x: num(r) }], latex: L(r) }
  }
  let m = 1, r = Math.abs(D)
  for (let k = 2; k * k <= r; k++) while (r % (k * k) === 0) { r /= k * k; m *= k }
  if (D > 0 && r === 1) {
    const r1 = q(-B + m, 2 * A), r2 = q(-B - m, 2 * A)
    const roots = [r1, r2].sort((s, t) => num(t) - num(s)).map(z => ({ q: z, latex: L(z), sympy: sym(z), x: num(z) }))
    return { ...out, kind: 'rational', roots, latex: roots.map(z => z.latex).join(',\\ ') }
  }
  let p = -B, den = 2 * A
  const g = gcd(gcd(p, m), den); p /= g; m /= g; den /= g
  const complex = D < 0
  const unit = complex ? (r === 1 ? 'i' : `i\\sqrt{${r}}`) : `\\sqrt{${r}}`
  const mU = `${m === 1 ? '' : m}${unit}`
  const top = p === 0 ? `\\pm ${mU}` : `${p} \\pm ${mU}`
  const latex = den === 1 ? top : p === 0 ? `\\pm\\dfrac{${mU}}{${den}}` : `\\dfrac{${top}}{${den}}`
  const s = `${m}*${complex ? 'I*' : ''}sqrt(${r})`
  const roots = [+1, -1].map(sg => ({ latex: null, sympy: `(${p} ${sg > 0 ? '+' : '-'} ${s})/${den}`, x: complex ? null : (p + sg * m * Math.sqrt(r)) / den }))
  return { ...out, kind: complex ? 'complex' : 'irrational', roots, latex, p, m, r, den }
}
const discWord = D => D > 0 ? 'two real solutions' : D === 0 ? 'one real solution' : 'two imaginary solutions'
const approx = x => (Math.round(x * 100) / 100).toString()

// Equation lhs = rhs (coefficient arrays, descending) → standard form steps.
export function standardize(lhs, rhs, v = 'x') {
  const poly = trim(polySub(P(lhs), P(rhs)))
  while (poly.length < 3) poly.unshift(q(0))
  let f = quad(...poly)
  const steps = []
  const moved = P(rhs).some(c => c.n !== 0)
  const eq0 = g => `${qLatexStd(g, v)} = 0`
  if (moved) steps.push(R`**Standard form** (everything on one side, $= 0$): $${eq0(f)}$.`)
  if (f.a.n < 0) { f = quad(neg(f.a), neg(f.b), neg(f.c)); steps.push(R`**Multiply by $-1$** so $a$ is positive: $${eq0(f)}$.`) }
  const ints = [f.a, f.b, f.c].every(c => c.d === 1)
  const G = ints ? gcd(gcd(f.a.n, f.b.n), f.c.n) : 1
  if (G > 1) { f = quad(div(f.a, q(G)), div(f.b, q(G)), div(f.c, q(G))); steps.push(R`**Divide by $${G}$** (every term shares it): $${eq0(f)}$.`) }
  return { f, steps, eq: eq0(f) }
}
const promptEq = (lhs, rhs, v) => `${polyLatex(P(lhs), v)} = ${polyLatex(P(rhs), v)}`

// Quadratic formula with every step.
export function formulaSteps(f, v = 'x') {
  const s = solveQuad(f, v)
  const { a, b, c } = f
  const D = sub(sq(b), mul(q(4), mul(a, c)))
  const steps = [
    R`**Identify** $a = ${L(a)}$, $b = ${L(b)}$, $c = ${L(c)}$.`,
    R`**Plug in:** $${v} = \dfrac{-${par(b)} \pm \sqrt{${par(b)}^2 - 4${par(a)}${par(c)}}}{2${par(a)}}$.`,
    R`**Discriminant first:** $b^2 - 4ac = ${L(sq(b))} - ${par(mul(q(4), mul(a, c)))} = ${L(D)}$${D.n < 0 ? ' (negative, so the answers are **imaginary**: $\\sqrt{-n} = i\\sqrt{n}$)' : ''}.`,
  ]
  const top = `${L(neg(b))} \\pm \\sqrt{${L(D)}}`
  steps.push(R`So $${v} = \dfrac{${top}}{${L(mul(TWO, a))}}$.`)
  if (s.kind === 'one') steps.push(R`$\sqrt{0} = 0$, so there is **one** answer: $${v} = ${s.latex}$.`)
  else if (s.kind === 'rational') steps.push(R`$\sqrt{${L(D)}} = ${Math.sqrt(num(D))}$. **Split:** $${v} = \dfrac{${L(neg(b))} + ${Math.sqrt(num(D))}}{${L(mul(TWO, a))}}$ and $\dfrac{${L(neg(b))} - ${Math.sqrt(num(D))}}{${L(mul(TWO, a))}}$: $${v} = ${s.roots.map(z => z.latex).join('$ or $')}$.`)
  else {
    const simp = D.d === 1 ? simplifiedRoot(D) : null
    const raw = D.n < 0 ? `i\\sqrt{${-D.n}}` : `\\sqrt{${D.n}}`
    steps.push(R`**Simplify the root:** ${simp && simp !== raw ? `$\\sqrt{${L(D)}} = ${raw} = ${simp}$` : `$\\sqrt{${L(D)}} = ${raw}$`}. Then reduce the fraction: $${v} = ${s.latex}$${s.kind === 'irrational' ? ` (about $${s.roots.map(z => approx(z.x)).join('$ and $')}$)` : ''}.`)
  }
  return { s, steps }
}
function simplifiedRoot(D) {
  let m = 1, r = Math.abs(D.n)
  for (let k = 2; k * k <= r; k++) while (r % (k * k) === 0) { r /= k * k; m *= k }
  const i = D.n < 0 ? 'i' : ''
  return r === 1 ? `${m === 1 && i ? '' : m}${i}` : `${m === 1 ? '' : m}${i}\\sqrt{${r}}`
}

// method: 'formula' | 'factor' | 'square' | 'sqrt'
export function solveProblem(prompt, lhs, rhs, method, key, v = 'x') {
  const { f, steps: st } = standardize(lhs, rhs, v)
  const steps = [...st]
  let s
  if (method === 'formula') {
    const r = formulaSteps(f, v); s = r.s; steps.push(...r.steps)
  } else if (method === 'factor') {
    s = solveQuad(f, v)
    if (s.kind !== 'rational' && s.kind !== 'one') throw new Error(`${prompt}: not factorable`)
    const fac = intFactors(f, s, v)
    steps.push(R`**Factor:** $${fac.latex} = 0$${fac.note}.`)
    steps.push(R`**Zero product property:** set each factor to $0$: $${v} = ${s.roots.map(z => z.latex).join('$ or $')}$.`)
  } else if (method === 'sqrt') {
    const rhsQ = div(neg(f.c), f.a)
    s = solveQuad(f, v)
    steps.push(R`**Isolate $${v}^2$:** $${v}^2 = ${L(rhsQ)}$.`)
    steps.push(R`**Square root both sides** (don't forget $\pm$): $${v} = \pm\sqrt{${L(rhsQ)}}$${rhsQ.n < 0 ? ' (negative inside, so use $i$)' : ''} $= ${s.latex}$.`)
  } else {
    const r = squareSteps(f, v); s = r.s; steps.push(...r.steps)
  }
  const answer = s.kind === 'irrational' || s.kind === 'complex' ? `${v} = ${s.latex}` : `${v} = ${s.roots.map(z => z.latex).join(',\\ ')}`
  return { type: 'steps', prompt: prompt ?? promptEq(lhs, rhs, v), steps, answer, check: { expr: qSympy(f, v), roots: s.roots.map(z => z.sympy), keyRoots: key, variable: v } }
}
// Integer factor form k(d₁x − n₁)(d₂x − n₂) of a quadratic with rational roots.
export function intFactors(f, s, v = 'x') {
  const fac = z => {
    const r = z.q
    if (isZ(r)) return { d: 1, latex: v }
    return { d: r.d, latex: `(${r.d === 1 ? '' : r.d}${v} ${r.n < 0 ? '+' : '-'} ${Math.abs(r.n)})` }
  }
  const fs = s.kind === 'one' ? [fac(s.roots[0]), fac(s.roots[0])] : s.roots.map(fac)
  const k = div(f.a, q(fs[0].d * fs[1].d))
  const body = s.kind === 'one' ? `${fs[0].latex}^2` : fs.map(x => x.latex).join('')
  const kL = eqQ(k, ONE) ? '' : eqQ(k, q(-1)) ? '-' : L(k)
  return { latex: `${kL}${body}`, k, note: '' }
}
// Complete the square to solve a x² + b x + c = 0.
export function squareSteps(f, v = 'x') {
  const s = solveQuad(f, v)
  const steps = []
  let { a, b, c } = f
  if (!eqQ(a, ONE)) {
    steps.push(R`**Divide by $${L(a)}$** so the $${v}^2$ coefficient is $1$: $${polyLatex([ONE, div(b, a), div(c, a)], v)} = 0$.`)
    b = div(b, a); c = div(c, a); a = ONE
  }
  steps.push(R`**Move the constant:** $${polyLatex([ONE, b, q(0)], v)} = ${L(neg(c))}$.`)
  const h = div(b, TWO), h2 = sq(h)
  steps.push(R`**Half of $${L(b)}$** is $${L(h)}$; squared: $${L(h2)}$. **Add it to both sides:** $${polyLatex([ONE, b, h2], v)} = ${L(neg(c))} + ${L(h2)}$.`)
  const rhs = add(neg(c), h2)
  steps.push(R`**Factor the left side:** $(${shiftLatex(v, neg(h))})^2 = ${L(rhs)}$.`)
  const root = rhs.n < 0 ? 'imaginary' : 'real'
  steps.push(R`**Square root both sides:** $${shiftLatex(v, neg(h))} = \pm\sqrt{${L(rhs)}}$${root === 'imaginary' ? ' (negative inside, so use $i$)' : ''}.`)
  steps.push(R`**Solve for $${v}$:** $${v} = ${s.kind === 'rational' ? s.roots.map(z => z.latex).join('$ or $') : s.latex}$.`)
  return { s, steps }
}

// Discriminant only (HW #12 5–10, HW #14 11–14, Day 12).
export function discProblem(prompt, lhs, rhs, keyD, v = 'x') {
  const poly = trim(polySub(P(lhs), P(rhs)))
  while (poly.length < 3) poly.unshift(q(0))
  const f = quad(...poly)
  const D = sub(sq(f.b), mul(q(4), mul(f.a, f.c)))
  const steps = []
  if (P(rhs).some(c => c.n !== 0)) steps.push(R`**Standard form:** $${qLatexStd(f, v)} = 0$.`)
  steps.push(R`$a = ${L(f.a)}$, $b = ${L(f.b)}$, $c = ${L(f.c)}$.`)
  steps.push(R`$b^2 - 4ac = ${par(f.b)}^2 - 4${par(f.a)}${par(f.c)} = ${L(sq(f.b))} - ${par(mul(q(4), mul(f.a, f.c)))} = ${L(D)}$.`)
  steps.push(R`The discriminant is ${D.n > 0 ? '**positive**' : D.n === 0 ? '**zero**' : '**negative**'}: **${discWord(D.n)}**.`)
  return { type: 'steps', prompt: prompt ?? promptEq(lhs, rhs, v), steps, answer: R`${L(D)};\ \text{${discWord(D.n)}}`, check: { value: `(${sym(f.b)})**2 - 4*(${sym(f.a)})*(${sym(f.c)})`, result: String(keyD) } }
}

// ---------- complex numbers a + bi ----------
export const cx = (re, im) => ({ re: Q(re), im: Q(im) })
export function cxLatex(z) {
  const { re, im } = z
  if (isZ(im)) return L(re)
  const imL = eqQ(im, ONE) ? 'i' : eqQ(im, q(-1)) ? '-i' : `${L(im)}i`
  if (isZ(re)) return imL
  return `${L(re)} ${im.n < 0 ? '-' : '+'} ${eqQ(im, ONE) || eqQ(im, q(-1)) ? '' : L(q(Math.abs(im.n), im.d))}i`
}
const cxPar = z => isZ(z.re) || isZ(z.im) ? (z.re.n < 0 || z.im.n < 0 ? `(${cxLatex(z)})` : cxLatex(z)) : `(${cxLatex(z)})`
const cxSym = z => `(${sym(z.re)} + ${sym(z.im)}*I)`
// op: '+', '-', '*', '/', '^2'
export function complexProblem(prompt, op, z1, z2, key) {
  const steps = []
  let r
  if (op === '+' || op === '-') {
    const s = op === '+' ? add : sub
    r = cx(s(z1.re, z2.re), s(z1.im, z2.im))
    if (op === '-') steps.push(R`**Distribute the minus** to both parts of $${cxPar(z2)}$.`)
    steps.push(R`**Real parts:** $${L(z1.re)} ${op} ${par(z2.re)} = ${L(r.re)}$. **Imaginary parts:** $${L(z1.im)}i ${op} ${par(z2.im)}i = ${L(r.im)}i$.`)
  } else if (op === '*' || op === '^2') {
    const w = op === '^2' ? z1 : z2
    const F = mul(z1.re, w.re), O = mul(z1.re, w.im), I = mul(z1.im, w.re), La = mul(z1.im, w.im)
    if (op === '^2') steps.push(R`**Square** means multiply it by itself: $${cxPar(z1)}${cxPar(z1)}$.`)
    steps.push(R`**FOIL:** $${L(F)} ${plusI(O)} ${plusI(I)} ${La.n < 0 ? '-' : '+'} ${L(q(Math.abs(La.n), La.d))}i^2$.`)
    r = cx(sub(F, La), add(O, I))
    steps.push(R`**Use $i^2 = -1$:** $${L(La)}i^2 = ${L(neg(La))}$. Combine: $${cxLatex(r)}$.`)
  } else {
    const conj = cx(z2.re, neg(z2.im))
    const den = add(sq(z2.re), sq(z2.im))
    const top = cx(add(mul(z1.re, conj.re), neg(mul(z1.im, conj.im))), add(mul(z1.re, conj.im), mul(z1.im, conj.re)))
    steps.push(R`**Multiply top and bottom by the conjugate** $${cxLatex(conj)}$ (it clears $i$ from the bottom).`)
    steps.push(R`**Bottom:** $${cxPar(z2)}${cxPar(conj)} = ${L(sq(z2.re))} + ${L(sq(z2.im))} = ${L(den)}$. **Top:** $${cxPar(z1)}${cxPar(conj)} = ${cxLatex(top)}$.`)
    r = cx(div(top.re, den), div(top.im, den))
    steps.push(R`**Split into $a + bi$:** $${isZ(r.re) ? '' : L(r.re)}${isZ(r.im) ? '' : `${r.im.n < 0 ? ' - ' : isZ(r.re) ? '' : ' + '}${L(q(Math.abs(r.im.n), r.im.d))}i`}$.`)
  }
  const expr = op === '^2' ? `${cxSym(z1)}**2` : `${cxSym(z1)} ${op === '*' ? '*' : op} ${cxSym(z2)}`
  return { type: 'steps', prompt, steps, answer: cxLatex(r), check: { value: expr, result: key } }
}
const plusI = c => `${c.n < 0 ? '-' : '+'} ${L(q(Math.abs(c.n), c.d))}i`

// ---------- quadratic functions: features ----------
// spec: { std: [a, b, c] } | { vertex: [a, h, k] } | { intercept: [a, p, q] }
export function specQuad(spec) {
  if (spec.std) return quad(...spec.std)
  if (spec.vertex) return fromVertex(...spec.vertex)
  return fromRoots(...spec.intercept)
}
export function specLatex(spec, v = 'x') {
  if (spec.latex) return spec.latex
  if (spec.std) return qLatexStd(quad(...spec.std), v)
  if (spec.vertex) { const [a, h, k] = spec.vertex.map(Q); return vertexLatex(a, h, k, v) }
  const [a, p, r] = spec.intercept.map(Q)
  const f1 = isZ(p) ? v : `(${shiftLatex(v, p)})`, f2 = isZ(r) ? v : `(${shiftLatex(v, r)})`
  return `${eqQ(a, ONE) ? '' : eqQ(a, q(-1)) ? '-' : L(a)}${f1}${eqQ(p, r) && !isZ(p) ? '^2' : f2}`
}
const intervalLatex = (lo, hi, loIn, hiIn) => `${loIn ? '[' : '('}${lo == null ? '-\\infty' : L(lo)}, ${hi == null ? '\\infty' : L(hi)}${hiIn ? ']' : ')'}`
export function quadPlane(f, { win, ints = true, extra = [], dashed = false } = {}) {
  const { h, k } = vertexOf(f)
  const H = num(h), K = num(k)
  const s = solveQuad(f)
  const xi = ints && (s.kind === 'rational' || s.kind === 'irrational' || s.kind === 'one') ? s.roots.map(z => [z.x, 0]) : []
  const pts = [[H, K], [H - 3, qFn(f)(H - 3)], [H + 3, qFn(f)(H + 3)], [0, num(f.c)], ...xi]
  const usable = pts.filter(p => Math.abs(p[1]) < 60)
  return {
    window: win ?? windowFor(usable, 6),
    items: [{ kind: 'axis', x: H }, { kind: 'fn', f: qFn(f), dashed }, { kind: 'dots', pts: xi, style: 'key' }, { kind: 'dots', pts: [[0, num(f.c)]], style: 'key' }, { kind: 'dots', pts: [[H, K]], style: 'vertex', labels: true }, ...extra],
  }
}
// ask: 'vertex' 'axis' 'opens' 'maxmin' 'domain' 'range' 'yint' 'xints' 'zeros' 'incdec' 'graph' 'transform' 'width' 'concavity'
export function quadProblem(prompt, spec, ask, opts = {}) {
  const f = specQuad(spec)
  const { h, k } = vertexOf(f)
  const a = f.a
  const steps = []
  const ans = []
  const up = a.n > 0
  // Vertex
  if (spec.std) {
    steps.push(R`**Axis of symmetry:** $x = -\dfrac{b}{2a} = -\dfrac{${L(f.b)}}{2${par(a)}} = ${L(h)}$.`)
    steps.push(R`**Vertex:** plug $x = ${L(h)}$ back in: $y = ${L(a)}${par(h)}^2 ${f.b.n < 0 ? '-' : '+'} ${L(q(Math.abs(f.b.n), f.b.d))}${par(h)}${plus(f.c)} = ${L(k)}$. Vertex $${ptL(h, k)}$.`)
  } else if (spec.vertex) {
    steps.push(R`**Vertex form** $y = a(x - h)^2 + k$: $a = ${L(a)}$, $h = ${L(h)}$, $k = ${L(k)}$ (the sign inside the parentheses flips). Vertex $${ptL(h, k)}$, axis $x = ${L(h)}$.`)
  } else {
    const [, p, r] = spec.intercept.map(Q)
    steps.push(R`**Intercept form** $y = a(x - p)(x - q)$: the $x$-intercepts are $${L(p)}$ and $${L(r)}$.`)
    steps.push(R`**Axis** is halfway between them: $x = \dfrac{${L(p)} + ${par(r)}}{2} = ${L(h)}$. **Vertex:** $y = ${eqQ(a, ONE) ? '' : eqQ(a, q(-1)) ? '-' : L(a)}(${L(h)} ${p.n < 0 ? '+' : '-'} ${L(p.n < 0 ? neg(p) : p)})(${L(h)} ${r.n < 0 ? '+' : '-'} ${L(r.n < 0 ? neg(r) : r)}) = ${L(k)}$, so $${ptL(h, k)}$.`)
  }
  if (ask.includes('vertex')) ans.push(R`\text{Vertex: } ${ptL(h, k)}`)
  if (ask.includes('axis')) ans.push(R`\text{Axis: } x = ${L(h)}`)
  if (ask.includes('opens') || ask.includes('concavity')) {
    steps.push(R`$a = ${L(a)} ${up ? '> 0' : '< 0'}$, so it opens **${up ? 'up' : 'down'}**.`)
    ans.push(ask.includes('concavity') ? R`\text{Concave ${up ? 'up' : 'down'}}` : R`\text{Opens ${up ? 'up' : 'down'}}`)
  }
  if (ask.includes('width')) {
    const A = Math.abs(num(a))
    steps.push(R`$|a| = ${L(q(Math.abs(a.n), a.d))}$: ${A > 1 ? 'more than 1, so it is **narrower** than' : A < 1 ? 'less than 1, so it is **wider** than' : 'exactly 1, so it is the **same width** as'} $y = x^2$.`)
  }
  if (ask.includes('maxmin')) {
    steps.push(R`It opens ${up ? 'up, so the vertex is the lowest point: **minimum**' : 'down, so the vertex is the highest point: **maximum**'} value $${L(k)}$ at $x = ${L(h)}$.`)
    ans.push(R`\text{${up ? 'Min' : 'Max'} value: } ${L(k)}`)
  }
  if (ask.includes('transform')) {
    const parts = []
    if (a.n < 0) parts.push('reflected over the $x$-axis')
    const A = Math.abs(num(a))
    if (A !== 1) parts.push(`${A > 1 ? 'vertically stretched' : 'vertically shrunk'} by $${L(q(Math.abs(a.n), a.d))}$`)
    if (!isZ(h)) parts.push(`shifted ${h.n > 0 ? 'right' : 'left'} $${L(q(Math.abs(h.n), h.d))}$`)
    if (!isZ(k)) parts.push(`shifted ${k.n > 0 ? 'up' : 'down'} $${L(q(Math.abs(k.n), k.d))}$`)
    steps.push(R`**Transformations from $y = x^2$:** ${parts.join(', ')}.`)
    ans.push(R`\text{${parts.map(t => t.replace(/\$([^$]*)\$/g, '}$1\\text{')).join(', ')}}`.replace(/\\text\{\}/g, ''))
  }
  if (ask.includes('yint')) {
    steps.push(R`**$y$-intercept:** set $x = 0$: $y = ${L(f.c)}$, the point $${ptL(0, f.c)}$.`)
    ans.push(R`y\text{-int: } ${L(f.c)}`)
  }
  let s = null
  if (ask.includes('xints') || ask.includes('zeros')) {
    s = solveQuad(f)
    if (spec.intercept) {
      steps.push(R`**$x$-intercepts (zeros):** read them from the factors: $${s.roots.map(z => z.latex).join('$ and $')}$.`)
    } else if (s.kind === 'complex') {
      steps.push(R`**$x$-intercepts:** the vertex is ${up ? 'above' : 'below'} the $x$-axis and it opens ${up ? 'up' : 'down'}, so the graph **never crosses**: no real zeros (the discriminant is $${s.D} < 0$).`)
    } else if (s.kind === 'rational' || s.kind === 'one') {
      steps.push(R`**$x$-intercepts:** solve $${qLatexStd(f)} = 0$. Factor: $${intFactors(f, s).latex} = 0$, so $x = ${s.roots.map(z => z.latex).join('$ and $')}$${s.kind === 'one' ? ' (the vertex touches the axis)' : ''}.`)
    } else {
      steps.push(R`**$x$-intercepts:** solve $${qLatexStd(f)} = 0$ (quadratic formula): $x = ${s.latex}$, about $${s.roots.map(z => approx(z.x)).join('$ and $')}$.`)
    }
    const real = s.kind !== 'complex'
    ans.push(R`\text{${ask.includes('zeros') ? 'Zeros' : 'x-ints'}: } ${real ? (s.kind === 'irrational' ? `${s.latex} \\approx ${s.roots.map(z => approx(z.x)).join(',\\ ')}` : s.roots.map(z => z.latex).join(',\\ ')) : '\\text{none}'}`)
  }
  if (ask.includes('domain')) {
    steps.push(R`**Domain:** every $x$ works in a quadratic: all real numbers, $(-\infty, \infty)$.`)
    ans.push(R`D: (-\infty, \infty)`)
  }
  if (ask.includes('range')) {
    steps.push(R`**Range:** it opens ${up ? 'up' : 'down'} from $y = ${L(k)}$: $y ${up ? '\\ge' : '\\le'} ${L(k)}$, or $${up ? intervalLatex(k, null, true, false) : intervalLatex(null, k, false, true)}$.`)
    ans.push(R`R: ${up ? intervalLatex(k, null, true, false) : intervalLatex(null, k, false, true)}`)
  }
  if (ask.includes('incdec')) {
    const left = intervalLatex(null, h, false, false), right = intervalLatex(h, null, false, false)
    steps.push(R`**Increasing / decreasing:** reading left to right, it goes ${up ? '**down** until the vertex, then **up**' : '**up** until the vertex, then **down**'}. Increasing on $${up ? right : left}$, decreasing on $${up ? left : right}$.`)
    ans.push(R`\text{Inc: } ${up ? right : left};\ \text{Dec: } ${up ? left : right}`)
  }
  let plane
  if (ask.includes('graph')) {
    const H = num(h)
    const base = Number.isInteger(H) ? [H - 2, H - 1, H + 1, H + 2] : [Math.floor(H) - 1, Math.floor(H), Math.ceil(H), Math.ceil(H) + 1]
    const rows = base.map(x => [x, qVal(f, x)])
    const table = [[h, k], ...rows.map(([x, y]) => [Q(x), y])].sort((s, t) => num(s[0]) - num(t[0]))
    steps.push(R`**Table** around the vertex: $\begin{array}{c|${'c'.repeat(table.length)}} x & ${table.map(r => L(r[0])).join(' & ')} \\ \hline y & ${table.map(r => L(r[1])).join(' & ')} \end{array}$. Mirror points have equal $y$-values.`)
    steps.push(R`**Graph:** plot the vertex and the points, draw the dashed axis $x = ${L(h)}$, and connect them in a smooth U.`)
    plane = quadPlane(f, { win: opts.window, extra: [{ kind: 'dots', pts: rows.map(r => [r[0], num(r[1])]), style: 'key' }] })
  }
  const exp = opts.exp ?? {}
  return {
    type: 'steps', prompt, steps, answer: R`\begin{array}{l} ${ans.join(' \\\\ ')} \end{array}`, plane,
    check: { quad: qSympy(f), vertex: [sym(h), sym(k)], keyVertex: exp.vertex?.map(x => typeof x === 'number' ? String(x) : `Rational(${x[0]},${x[1]})`), yint: exp.yint != null ? String(exp.yint) : null, zeros: s && s.kind !== 'complex' ? s.roots.map(z => z.sympy) : null, keyZeros: exp.zeros ?? null },
  }
}

// ---------- converting forms ----------
// a(ux + v)² + k → standard
export function vertexToStd(prompt, a, inner, k, key) {
  a = Q(a); k = Q(k)
  const [u, w] = inner.map(Q)
  const inside = polyLatex([u, w])
  const sqP = [sq(u), mul(TWO, mul(u, w)), sq(w)]
  const f = quad(mul(a, sqP[0]), mul(a, sqP[1]), add(mul(a, sqP[2]), k))
  const steps = [
    R`**Square the binomial:** $(${inside})^2 = (${inside})(${inside}) = ${polyLatex(sqP)}$.`,
    ...(eqQ(a, ONE) ? [] : [R`**Distribute $${L(a)}$:** $${polyLatex([mul(a, sqP[0]), mul(a, sqP[1]), mul(a, sqP[2])])}$.`]),
    ...(isZ(k) ? [] : [R`**Combine the constants:** $${L(mul(a, sqP[2]))} ${k.n < 0 ? '-' : '+'} ${L(q(Math.abs(k.n), k.d))} = ${L(f.c)}$.`]),
  ]
  return { type: 'steps', prompt, steps, answer: `y = ${qLatexStd(f)}`, check: { expr: `${sym(a)}*(${sym(u)}*x + ${sym(w)})**2 + ${sym(k)}`, result: key ?? qSympy(f) } }
}
// a(u₁x + v₁)(u₂x + v₂) → standard
export function interceptToStd(prompt, a, f1, f2, key) {
  a = Q(a)
  const [u1, v1] = f1.map(Q), [u2, v2] = f2.map(Q)
  const prod = [mul(u1, u2), add(mul(u1, v2), mul(v1, u2)), mul(v1, v2)]
  const f = quad(...prod.map(c => mul(a, c)))
  const steps = [
    R`**FOIL:** $(${polyLatex([u1, v1])})(${polyLatex([u2, v2])}) = ${coef(mul(u1, u2), 'x^2')} ${plusX(mul(u1, v2))} ${plusX(mul(v1, u2))}${plus(mul(v1, v2))} = ${polyLatex(prod)}$.`,
    ...(eqQ(a, ONE) ? [] : [R`**Distribute $${L(a)}$:** $${qLatexStd(f)}$.`]),
  ]
  return { type: 'steps', prompt, steps, answer: `y = ${qLatexStd(f)}`, check: { expr: `${sym(a)}*(${sym(u1)}*x + ${sym(v1)})*(${sym(u2)}*x + ${sym(v2)})`, result: key ?? qSympy(f) } }
}
const plusX = c => `${c.n < 0 ? '-' : '+'} ${eqQ(q(Math.abs(c.n), c.d), ONE) ? '' : L(q(Math.abs(c.n), c.d))}x`
// standard → vertex form by completing the square (a factored out of the x-terms)
export function stdToVertex(prompt, std, key, { v = 'x', name = 'y' } = {}) {
  const f = quad(...std)
  const { h, k } = vertexOf(f)
  const steps = []
  const b1 = div(f.b, f.a), half = div(b1, TWO), h2 = sq(half)
  if (!eqQ(f.a, ONE)) steps.push(R`**Factor $${L(f.a)}$ out of the $${v}$-terms:** $${name} = ${L(f.a)}(${polyLatex([ONE, b1, q(0)], v)})${plus(f.c)}$.`)
  else steps.push(R`**Group the $${v}$-terms:** $${name} = (${polyLatex([ONE, b1, q(0)], v)})${plus(f.c)}$.`)
  steps.push(R`**Half of $${L(b1)}$** is $${L(half)}$, squared: $${L(h2)}$. Add and subtract it inside: $${name} = ${eqQ(f.a, ONE) ? '' : L(f.a)}(${polyLatex([ONE, b1, h2], v)} - ${L(h2)})${plus(f.c)}$.`)
  steps.push(R`**Factor the perfect square** and move $${L(h2)}$ out${eqQ(f.a, ONE) ? '' : R` (it gets multiplied by $${L(f.a)}$)`}: $${name} = ${eqQ(f.a, ONE) ? '' : L(f.a)}(${shiftLatex(v, neg(half))})^2${plus(f.c)} - ${par(mul(f.a, h2))}$.`)
  steps.push(R`**Combine:** $${name} = ${vertexLatex(f.a, h, k, v)}$. Vertex $${ptL(h, k)}$, axis $${v} = ${L(h)}$.`)
  return { type: 'steps', prompt, steps, answer: `${name} = ${vertexLatex(f.a, h, k, v)}`, check: { expr: qSympy(f, v), result: key ?? `${sym(f.a)}*(${v} - (${sym(h)}))**2 + ${sym(k)}`, vertexForm: true } }
}
// standard → intercept form (needs rational roots)
export function stdToIntercept(prompt, std, key, { intForm = false, zerosKey } = {}) {
  const f = quad(...std)
  const s = solveQuad(f)
  if (s.kind === 'complex' || s.kind === 'irrational') throw new Error(`${prompt}: no intercept form`)
  const steps = []
  const fac = intFactors(f, s)
  steps.push(R`**Zeros:** solve $${qLatexStd(f)} = 0$. It factors: $${fac.latex} = 0$, so $x = ${s.roots.map(z => z.latex).join('$ and $')}$${s.kind === 'one' ? ' (a double zero)' : ''}.`)
  const a = f.a
  const facs = (s.kind === 'one' ? [s.roots[0], s.roots[0]] : s.roots).map(z => isZ(z.q) ? 'x' : `(${shiftLatex('x', z.q)})`)
  const frac = `${eqQ(a, ONE) ? '' : eqQ(a, q(-1)) ? '-' : L(a)}${s.kind === 'one' ? `${facs[0]}^2` : facs.join('')}`
  steps.push(R`**Intercept form** $y = a(x - p)(x - q)$ with $a = ${L(a)}$: $y = ${frac}$${intForm ? R`, or with whole numbers: $${fac.latex}$` : ''}.`)
  return { type: 'steps', prompt, steps, answer: `y = ${intForm ? fac.latex : frac}`, zeros: s.roots.map(z => z.latex), check: { expr: qSympy(f), result: key ?? qSympy(f), roots: s.roots.map(z => z.sympy), keyRoots: zerosKey ?? null } }
}
// vertex → intercept: solve a(x − h)² + k = 0
export function vertexToIntercept(prompt, a, h, k, key) {
  const f = fromVertex(a, h, k)
  const s = solveQuad(f)
  const t = div(neg(Q(k)), Q(a))
  const steps = [
    R`**Find the zeros:** set $${vertexLatex(Q(a), Q(h), Q(k))} = 0$, so $(${shiftLatex('x', Q(h))})^2 = ${L(t)}$.`,
    R`**Square root:** $${shiftLatex('x', Q(h))} = \pm ${ratSqrt(t)}$, so $x = ${s.roots.map(z => z.latex).join('$ and $')}$.`,
  ]
  const r = stdToIntercept(prompt, [f.a, f.b, f.c], key)
  steps.push(r.steps.at(-1))
  return { ...r, steps }
}
// intercept → vertex: axis halfway between the zeros
export function interceptToVertex(prompt, a, p, r, key) {
  const f = fromRoots(a, p, r)
  const { h, k } = vertexOf(f)
  const steps = [
    R`**Zeros:** $${L(Q(p))}$ and $${L(Q(r))}$. The **axis** is halfway: $x = \dfrac{${L(Q(p))} + ${par(Q(r))}}{2} = ${L(h)}$.`,
    R`**Vertex $y$:** plug in $x = ${L(h)}$: $${L(k)}$.`,
    R`**Vertex form** with $a = ${L(Q(a))}$: $y = ${vertexLatex(Q(a), h, k)}$.`,
  ]
  return { type: 'steps', prompt, steps, answer: `y = ${vertexLatex(Q(a), h, k)}`, check: { expr: qSympy(f), result: key ?? `${sym(Q(a))}*(x - (${sym(h)}))**2 + ${sym(k)}` } }
}

// ---------- writing quadratics ----------
export function writeVertexPoint(prompt, vertex, point, key) {
  const [h, k] = vertex.map(Q), [px, py] = point.map(Q)
  const d = sq(sub(px, h))
  const a = div(sub(py, k), d)
  const steps = [
    R`**Vertex form** with $(h, k) = ${ptL(h, k)}$: $y = a${isZ(h) ? 'x^2' : `(${shiftLatex('x', h)})^2`}${plus(k)}$.`,
    R`**Plug in the point** $${ptL(px, py)}$: $${L(py)} = a(${L(px)} ${h.n < 0 ? '+' : '-'} ${L(h.n < 0 ? neg(h) : h)})^2${plus(k)} = ${L(d)}a${plus(k)}$.`,
    R`**Solve for $a$:** $${L(d)}a = ${L(sub(py, k))}$, so $a = ${L(a)}$.`,
  ]
  const f = fromVertex(a, h, k)
  return { type: 'steps', prompt, steps, answer: `y = ${vertexLatex(a, h, k)}`, plane: quadPlane(f, { extra: [{ kind: 'dots', pts: [point.map(x => num(Q(x)))], style: 'sol' }] }), check: { expr: `${sym(a)}*(x - (${sym(h)}))**2 + ${sym(k)}`, result: key, points: [vertex, point] } }
}
export function writeZerosPoint(prompt, p, r, point, key, { findOther } = {}) {
  const [P0, R0] = [Q(p), Q(r)], [px, py] = point.map(Q)
  const prod = mul(sub(px, P0), sub(px, R0))
  const a = div(py, prod)
  const steps = []
  if (findOther) steps.push(findOther)
  steps.push(R`**Intercept form** with zeros $${L(P0)}$ and $${L(R0)}$: $y = a${isZ(P0) ? 'x' : `(${shiftLatex('x', P0)})`}${isZ(R0) ? 'x' : `(${shiftLatex('x', R0)})`}$.`)
  steps.push(R`**Plug in** $${ptL(px, py)}$: $${L(py)} = a(${L(sub(px, P0))})(${L(sub(px, R0))}) = ${L(prod)}a$, so $a = ${L(a)}$.`)
  const f = fromRoots(a, P0, R0)
  return { type: 'steps', prompt, steps, answer: `y = ${specLatex({ intercept: [a, P0, R0] })}`, plane: quadPlane(f, { extra: [{ kind: 'dots', pts: [[num(px), num(py)]], style: 'sol' }] }), check: { expr: `${sym(a)}*(x - (${sym(P0)}))*(x - (${sym(R0)}))`, result: key, points: [[p, 0], [r, 0], point] } }
}

// ---------- systems ----------
// Each equation: { x2, x, y, c } meaning x2·x² + x·x + y·y + c = 0 (y ≠ 0), plus the printed LaTeX.
const yOf = e => [div(neg(Q(e.x2 ?? 0)), Q(e.y)), div(neg(Q(e.x ?? 0)), Q(e.y)), div(neg(Q(e.c ?? 0)), Q(e.y))]
export function systemProblem(prompt, eqs, key, { win } = {}) {
  const [e1, e2] = eqs
  const y1 = yOf(e1), y2 = yOf(e2)
  const steps = []
  const linear = [e1, e2].findIndex(e => !(e.x2 ?? 0))
  const yl = c => polyLatex(c)
  if (linear >= 0) {
    const yLin = linear === 0 ? y1 : y2, yQ = linear === 0 ? y2 : y1
    steps.push(R`**Solve the linear equation for $y$:** $y = ${yl(yLin)}$.`)
    steps.push(R`**Solve the other for $y$** too: $y = ${yl(yQ)}$, then **substitute**: $${yl(yQ)} = ${yl(yLin)}$.`)
  } else {
    steps.push(R`**Solve each equation for $y$:** $y = ${yl(y1)}$ and $y = ${yl(y2)}$.`)
    steps.push(R`**Set them equal** (substitution): $${yl(y1)} = ${yl(y2)}$.`)
  }
  const diff = trim(polySub(y1, y2))
  while (diff.length < 3) diff.unshift(q(0))
  let f = quad(...diff)
  if (f.a.n < 0 || (isZ(f.a) && f.b.n < 0)) f = quad(neg(f.a), neg(f.b), neg(f.c))
  // Clear fractions so the equation (and its factoring) uses whole numbers.
  const D0 = lcm(lcm(f.a.d, f.b.d), f.c.d)
  const clearNote = D0 > 1 ? R` (multiply by $${D0}$ to clear the fractions)` : ''
  if (D0 > 1) f = quad(mul(f.a, q(D0)), mul(f.b, q(D0)), mul(f.c, q(D0)))
  const fnY = c => x => num(c[0]) * x * x + num(c[1]) * x + num(c[2])
  const yAt = (c, x) => add(add(mul(c[0], sq(x)), mul(c[1], x)), c[2])
  let xs = []
  if (isZ(f.a)) {
    if (isZ(f.b)) { steps.push(R`The $x$-terms cancel and $${L(f.c)} = 0$ is false: **no solution**.`) }
    else {
      const x = div(neg(f.c), f.b)
      steps.push(R`**Simplify:** $${polyLatex([f.b, f.c])} = 0$${clearNote}, so $x = ${L(x)}$.`)
      xs = [x]
    }
  } else {
    steps.push(R`**Get $0$ on one side:** $${qLatexStd(f)} = 0$${clearNote}.`)
    const s = solveQuad(f)
    if (s.kind === 'complex') {
      steps.push(R`The discriminant is $${s.D} < 0$: no real $x$, so the graphs **never meet**. **No solution.**`)
    } else if (s.kind === 'irrational') {
      steps.push(R`**Quadratic formula:** $x = ${s.latex}$.`)
      xs = s.roots.map(z => z.x)
    } else {
      const fac = intFactors(f, s)
      steps.push(R`**Factor:** $${fac.latex} = 0$, so $x = ${s.roots.map(z => z.latex).join('$ or $')}$${s.kind === 'one' ? ' (one point: the graphs just touch)' : ''}.`)
      xs = s.roots.map(z => z.q)
    }
  }
  const useLin = linear >= 0 ? (linear === 0 ? y1 : y2) : y1
  const pts = xs.map(x => typeof x === 'number' ? [x, fnY(useLin)(x)] : [x, yAt(useLin, x)])
  if (pts.length) steps.push(R`**Find each $y$** from $y = ${yl(useLin)}$: ${pts.map(([x, y]) => typeof x === 'number' ? `$x \\approx ${approx(x)}$ gives $y \\approx ${approx(y)}$` : `$x = ${L(x)}$ gives $y = ${L(y)}$`).join('; ')}.`)
  const exact = pts.filter(p => typeof p[0] !== 'number')
  const answer = pts.length ? exact.map(([x, y]) => ptL(x, y)).join(',\\ ') : R`\text{No solution}`
  const numPts = pts.map(([x, y]) => [typeof x === 'number' ? x : num(x), typeof y === 'number' ? y : num(y)])
  const plane = {
    window: win ?? windowFor(numPts.length ? numPts : [[0, num(y1[2])], [0, num(y2[2])]], 6),
    items: [{ kind: 'fn', f: fnY(y1) }, { kind: 'fn', f: fnY(y2), alt: true }, { kind: 'dots', pts: numPts, style: 'sol', labels: true }],
  }
  const eqSym = e => `${sym(Q(e.x2 ?? 0))}*x**2 + ${sym(Q(e.x ?? 0))}*x + ${sym(Q(e.y))}*y + ${sym(Q(e.c ?? 0))}`
  return { type: 'steps', prompt, steps, answer, plane, check: { system: [eqSym(e1), eqSym(e2)], engine: exact.map(([x, y]) => [sym(x), sym(y)]), key } }
}
// Is a point a solution? terms: [[coef, px, py], ...] = 0 for each equation, plus its LaTeX.
export function systemPointProblem(prompt, eqs, point, key) {
  const [x, y] = point.map(Q)
  const steps = []
  let all = true
  eqs.forEach(({ terms, latex }, i) => {
    const val = terms.reduce((s, [c, px, py]) => add(s, mul(Q(c), mul(pw(x, px), pw(y, py)))), q(0))
    const ok = isZ(val)
    all = all && ok
    steps.push(R`**Equation ${i + 1}:** substitute $x = ${L(x)}$, $y = ${L(y)}$ into $${latex}$. The left side works out to $${L(val)}$, ${ok ? '**which is $0$** ✓' : '**not $0$** ✗'}.`)
  })
  steps.push(all ? R`It satisfies **both** equations, so **yes**, $${ptL(x, y)}$ is a solution.` : R`It fails at least one equation, so **no**, $${ptL(x, y)}$ is not a solution.`)
  const eqSym = terms => terms.map(([c, px, py]) => `(${sym(Q(c))})*x**${px}*y**${py}`).join(' + ')
  return { type: 'steps', prompt, steps, answer: all ? R`\text{Yes}` : R`\text{No}`, check: { pointIn: eqs.map(e => eqSym(e.terms)), point: point.map(v => sym(Q(v))), expect: key } }
}
const pw = (a, n) => { let r = q(1); for (let i = 0; i < n; i++) r = mul(r, a); return r }
// √(n/d) for a perfect-square fraction, else \sqrt{…}
const ratSqrt = t => { const a = Math.sqrt(t.n), b = Math.sqrt(t.d); return Number.isInteger(a) && Number.isInteger(b) ? L(q(a, b)) : `\\sqrt{${L(t)}}` }

// ---------- quadratic inequalities in two variables ----------
export function quadIneq2(prompt, spec, rel) {
  const f = specQuad(spec)
  const { h, k } = vertexOf(f)
  const dashed = rel === '<' || rel === '>'
  const above = rel[0] === '>'
  const relL = { '<': '<', '<=': R`\le`, '>': '>', '>=': R`\ge` }[rel]
  const onCurve = isZ(f.c)
  const t = onCurve ? [0, num(k) > 0 ? -1 : 1] : [0, 0]
  const lhs = t[1], rhs = qFn(f)(t[0])
  const ok = { '<': lhs < rhs, '<=': lhs <= rhs, '>': lhs > rhs, '>=': lhs >= rhs }[rel]
  const steps = [
    R`**Boundary:** graph $y = ${specLatex(spec)}$. Vertex $${ptL(h, k)}$, opens ${f.a.n > 0 ? 'up' : 'down'}.`,
    R`The symbol is $${relL}$, so draw a **${dashed ? 'dashed' : 'solid'}** parabola (${dashed ? 'points on it are not solutions' : 'points on it are solutions'}).`,
    R`**Test a point** not on the parabola, $${ptL(...t)}$: $${t[1]} ${relL} ${L(qVal(f, t[0]))}$ is **${ok ? 'true' : 'false'}**, so shade the side ${ok ? 'containing' : 'away from'} $${ptL(...t)}$: **${above ? 'above' : 'below'}** the parabola.`,
  ]
  const plane = quadPlane(f, { dashed, ints: false })
  plane.items.unshift({ kind: 'shade', f: qFn(f), side: above ? 'above' : 'below' })
  plane.items = plane.items.filter(it => it.kind !== 'axis')
  return { type: 'steps', prompt, steps, answer: R`\text{${dashed ? 'Dashed' : 'Solid'} parabola, shaded ${above ? 'above' : 'below'}}`, plane, planeAt: 1, facts: { dashed, side: above ? 'above' : 'below', vertex: [num(h), num(k)] } }
}
