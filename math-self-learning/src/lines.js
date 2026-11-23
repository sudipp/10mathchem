// Unit 0 engine: lines, absolute value functions, piecewise functions, and linear
// inequalities, with exact fractions. Each generator returns a homework problem
// ({ type: 'steps', prompt, steps, answer, plane, check }) whose steps are computed
// here; `check` holds the worksheet key so scripts/verify_sympy.py can confirm it.
import { q, add, sub, mul, div, num, eqQ, qLatex } from './poly.js'

const R = String.raw
export const Q = x => typeof x === 'number' ? q(x) : Array.isArray(x) ? q(x[0], x[1]) : x
const neg = a => q(-a.n, a.d)
const isZ = a => a.n === 0
const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1 }
const lcm = (a, b) => a / gcd(a, b) * b
const sym = a => a.d === 1 ? `${a.n}` : `Rational(${a.n},${a.d})`
const L = qLatex
// "(−3)" for substitutions
const par = a => a.n < 0 ? `(${L(a)})` : L(a)

// ---------- LaTeX for terms ----------
// m·x with m = 1 → x, −1 → −x
export const coefX = (m, v = 'x') => eqQ(m, q(1)) ? v : eqQ(m, q(-1)) ? `-${v}` : `${L(m)}${v}`
// " + 3" / " - \frac{1}{2}"
export const plus = c => isZ(c) ? '' : c.n < 0 ? ` - ${L(neg(c))}` : ` + ${L(c)}`
export const linLatex = (m, b, v = 'x') => isZ(m) ? L(b) : `${coefX(m, v)}${plus(b)}`
// (x − h) or x
export const shiftLatex = (v, h) => isZ(h) ? v : `${v} ${h.n < 0 ? '+' : '-'} ${L(h.n < 0 ? neg(h) : h)}`
export const ptL = (x, y) => `(${L(Q(x))},\\ ${L(Q(y))})`

// ---------- lines ----------
// A line is { m, b } (y = mx + b) or { x } (vertical, x = c).
export const line = (m, b) => ({ m: Q(m), b: Q(b) })
export const vline = x => ({ x: Q(x) })
export const isVertical = l => l.x != null
export const fnOf = l => x => num(l.m) * x + num(l.b)
export function siLatex(l) { return isVertical(l) ? `x = ${L(l.x)}` : `y = ${linLatex(l.m, l.b)}` }
// Ax + By = C with integers, A > 0 (or B > 0 when A = 0), no common factor
export function stdOf(l) {
  if (isVertical(l)) { const d = l.x.d; return { A: d, B: 0, C: l.x.n } }
  // y = mx + b → −mx + y = b, cleared of fractions
  const D = lcm(l.m.d, l.b.d)
  let A = -l.m.n * (D / l.m.d), B = D, C = l.b.n * (D / l.b.d)
  const g = gcd(gcd(A, B), C)
  A /= g; B /= g; C /= g
  if (A < 0 || (A === 0 && B < 0)) { A = -A; B = -B; C = -C }
  return { A, B, C }
}
const tA = (c, v, first) => c === 0 ? '' : `${first ? (c < 0 ? '-' : '') : (c < 0 ? ' - ' : ' + ')}${Math.abs(c) === 1 ? '' : Math.abs(c)}${v}`
export function stdLatex(l) {
  const { A, B, C } = stdOf(l)
  const lhs = `${tA(A, 'x', true)}${tA(B, 'y', A === 0)}`
  return `${lhs} = ${C}`
}
export const lineSympy = l => isVertical(l) ? `x - (${sym(l.x)})` : `y - (${sym(l.m)}*x + ${sym(l.b)})`
export function pointSlopeLatex(m, x1, y1) {
  return `${shiftLatex('y', Q(y1))} = ${eqQ(m, q(1)) ? '' : eqQ(m, q(-1)) ? '-' : L(m)}${isZ(Q(x1)) ? 'x' : `(${shiftLatex('x', Q(x1))})`}`
}

// Rise over run between two points; null when the line is vertical.
export function slopeOf([x1, y1], [x2, y2]) {
  const dx = sub(Q(x2), Q(x1)), dy = sub(Q(y2), Q(y1))
  return isZ(dx) ? null : div(dy, dx)
}
const slopeWork = ([x1, y1], [x2, y2]) => R`m = \dfrac{y_2 - y_1}{x_2 - x_1} = \dfrac{${L(Q(y2))} - ${par(Q(y1))}}{${L(Q(x2))} - ${par(Q(x1))}} = \dfrac{${L(sub(Q(y2), Q(y1)))}}{${L(sub(Q(x2), Q(x1)))}}`

// A window that shows the origin and the given points with some room.
export function windowFor(pts, min = 6) {
  const xs = [0, ...pts.map(p => p[0])], ys = [0, ...pts.map(p => p[1])]
  const r = Math.max(min, Math.ceil(Math.max(...xs.map(Math.abs), ...ys.map(Math.abs)) + 2))
  return [-r, r, -r, r]
}
// Two nice points on a line for graphing (integer x when the slope allows).
export function twoPoints(l) {
  if (isVertical(l)) return [[num(l.x), 0], [num(l.x), 2]]
  const run = l.m.d, x0 = 0
  return [[x0, num(l.b)], [x0 + run, num(l.b) + num(l.m) * run]]
}
export function linePlane(l, { dashed = false, extra = [], win } = {}) {
  const pts = twoPoints(l)
  return {
    window: win ?? windowFor(pts),
    items: [isVertical(l) ? { kind: 'vline', x: num(l.x), dashed } : { kind: 'fn', f: fnOf(l), dashed }, { kind: 'dots', pts, style: 'key' }, ...extra],
  }
}

// Graph a line given in any form. `given`: { A, B, C } for Ax + By = C, or { m, b }, or { x }, or { y }.
export function graphLine(prompt, given) {
  const steps = []
  let l
  if (given.x != null) {
    l = vline(given.x)
    steps.push(R`**Vertical line:** $x = ${L(l.x)}$ is every point whose $x$-coordinate is $${L(l.x)}$. Its slope is **undefined**.`)
  } else if (given.y != null) {
    l = line(0, given.y)
    steps.push(R`**Horizontal line:** $y = ${L(l.b)}$ has slope $0$; every point has $y = ${L(l.b)}$.`)
  } else if (given.A != null) {
    const A = Q(given.A), B = Q(given.B), C = Q(given.C)
    if (isZ(B)) {
      l = vline(div(C, A))
      steps.push(R`**Solve for $x$:** $${L(A)}x = ${L(C)}$, so $x = ${L(l.x)}$. That is a **vertical line** (slope undefined).`)
    } else {
      l = line(div(neg(A), B), div(C, B))
      steps.push(R`**Solve for $y$** (slope-intercept form): move the $x$-term: $${L(B)}y = ${linLatex(neg(A), C)}$.`)
      if (!eqQ(B, q(1))) steps.push(R`**Divide every term by $${L(B)}$:** $${siLatex(l)}$.`)
    }
  } else l = line(given.m, given.b)
  if (!isVertical(l)) {
    const [p1, p2] = twoPoints(l)
    steps.push(R`**Read it:** slope $m = ${L(l.m)}$${isZ(l.m) ? '' : R` $= \dfrac{\text{rise}}{\text{run}} = \dfrac{${l.m.n}}{${l.m.d}}$`}, $y$-intercept $b = ${L(l.b)}$.`)
    steps.push(R`**Plot** the $y$-intercept $${ptL(p1[0], p1[1])}$.${isZ(l.m) ? '' : R` From there go **${l.m.n < 0 ? 'down' : 'up'} ${Math.abs(l.m.n)}** and **right ${l.m.d}** to $${ptL(p2[0], p2[1])}$.`}`)
  } else {
    steps.push(R`**Plot** $${ptL(num(l.x), 0)}$ and draw the vertical line through it.`)
  }
  steps.push(R`**Draw** the line through the points and put arrows on both ends.`)
  return {
    type: 'steps', prompt, steps, answer: siLatex(l), plane: linePlane(l),
    check: { line: lineSympy(l), key: given.key ?? lineSympy(l), ...(given.A != null ? { through: [], original: `${sym(Q(given.A))}*x + ${sym(Q(given.B))}*y - (${sym(Q(given.C))})` } : {}) },
  }
}

// Slope through two points (HW #1 21–22).
export function slopeProblem(prompt, p1, p2, key) {
  const m = slopeOf(p1, p2)
  const steps = [R`**Slope formula:** $${slopeWork(p1, p2)}$.`]
  if (m === null) steps.push(R`Dividing by $0$ is undefined: both points have $x = ${L(Q(p1[0]))}$, so the line is **vertical**.`)
  else if (isZ(m)) steps.push(R`$0$ divided by anything is $0$: both points have $y = ${L(Q(p1[1]))}$, so the line is **horizontal**.`)
  else steps.push(R`$m = ${L(m)}$.`)
  const l = m === null ? vline(p1[0]) : line(m, sub(Q(p1[1]), mul(m, Q(p1[0]))))
  return { type: 'steps', prompt, steps, answer: m === null ? R`\text{Undefined}` : L(m), plane: linePlane(l, { extra: [{ kind: 'dots', pts: [p1, p2], style: 'vertex' }] }), check: { slope: m === null ? 'undefined' : sym(m), key: key ?? (m === null ? 'undefined' : sym(m)), points: [p1, p2] } }
}

// Write a line. spec: { point, slope } | { points: [p1, p2] } | { slope, yint } | { std: { A, B, C } }
//   | { point, parallel: line } | { point, perp: line }. form: 'si' | 'std' | 'ps'. key: sympy expression = 0.
export function writeLine(prompt, spec, form, key) {
  const steps = []
  let l, pt
  const name = { si: 'slope-intercept form $y = mx + b$', std: 'standard form $Ax + By = C$', ps: R`point-slope form $y - y_1 = m(x - x_1)$` }[form]
  if (spec.parallel || spec.perp) {
    const ref = spec.parallel ?? spec.perp
    pt = spec.point
    if (spec.parallel && isVertical(ref)) {
      l = vline(pt[0])
      steps.push(R`$${siLatex(ref)}$ is a **vertical** line. A parallel line is vertical too, through $${ptL(...pt)}$.`)
    } else if (spec.perp && isVertical(ref)) {
      l = line(0, pt[1])
      steps.push(R`$${siLatex(ref)}$ is **vertical**. A perpendicular line is **horizontal**, through $${ptL(...pt)}$.`)
    } else if (spec.perp && isZ(ref.m)) {
      l = vline(pt[0])
      steps.push(R`$${siLatex(ref)}$ is **horizontal** (slope $0$). A perpendicular line is **vertical**, through $${ptL(...pt)}$.`)
    } else {
      const m = spec.parallel ? ref.m : div(q(-1), ref.m)
      steps.push(spec.parallel
        ? R`**Parallel** lines have the **same slope**: $m = ${L(m)}$.`
        : R`**Perpendicular** slope is the **opposite reciprocal** of $${L(ref.m)}$: $m = ${L(m)}$ (check: $${par(ref.m)} \cdot ${par(m)} = -1$).`)
      l = line(m, sub(Q(pt[1]), mul(m, Q(pt[0]))))
    }
  } else if (spec.points) {
    const [p1, p2] = spec.points
    const m = slopeOf(p1, p2)
    pt = p1
    if (m === null) {
      l = vline(p1[0])
      steps.push(R`**Slope:** $${slopeWork(p1, p2)}$, which is undefined. Both points have $x = ${L(Q(p1[0]))}$: a **vertical** line.`)
    } else {
      steps.push(R`**Slope:** $${slopeWork(p1, p2)} = ${L(m)}$.`)
      l = line(m, sub(Q(p1[1]), mul(m, Q(p1[0]))))
    }
  } else if (spec.std) {
    const A = Q(spec.std.A), B = Q(spec.std.B), C = Q(spec.std.C)
    if (isZ(B)) {
      l = vline(div(C, A))
      steps.push(R`There is no $y$-term, so this is a vertical line: $x = ${L(l.x)}$. It has no slope-intercept form.`)
    } else {
      l = line(div(neg(A), B), div(C, B))
      steps.push(R`**Solve for $y$:** $${L(B)}y = ${linLatex(neg(A), C)}$.`)
      if (!eqQ(B, q(1))) steps.push(R`**Divide by $${L(B)}$:** $y = ${linLatex(l.m, l.b)}$.`)
    }
  } else if (spec.yint != null) {
    l = line(spec.slope, spec.yint)
    steps.push(R`Slope $m = ${L(l.m)}$ and $y$-intercept $b = ${L(l.b)}$ go straight into $y = mx + b$: $${siLatex(l)}$.`)
  } else if (spec.slope === null) {
    pt = spec.point
    l = vline(pt[0])
    steps.push(R`An **undefined** slope means a **vertical** line. Through $${ptL(...pt)}$ it is $x = ${L(Q(pt[0]))}$.`)
  } else {
    pt = spec.point
    const m = Q(spec.slope)
    l = line(m, sub(Q(pt[1]), mul(m, Q(pt[0]))))
  }
  if (!isVertical(l) && pt && !(spec.std) && spec.yint == null) {
    if (form === 'ps') steps.push(R`**Point-slope form** with $m = ${L(l.m)}$ and $(x_1, y_1) = ${ptL(...pt)}$: $${pointSlopeLatex(l.m, pt[0], pt[1])}$.`)
    else steps.push(R`**Find $b$:** plug $${ptL(...pt)}$ into $y = mx + b$: $${L(Q(pt[1]))} = ${L(l.m)}${par(Q(pt[0]))} + b$, so $b = ${L(l.b)}$. That gives $${siLatex(l)}$.`)
  }
  let answer = siLatex(l)
  if (form === 'std') {
    if (!isVertical(l)) {
      const D = lcm(l.m.d, l.b.d)
      steps.push(R`**Standard form:** move the $x$-term left${D > 1 ? R` and multiply by $${D}$ to clear fractions` : ''}${stdOf(l).A !== -l.m.n * (D / l.m.d) ? ' (and make $A$ positive)' : ''}: $${stdLatex(l)}$.`)
    }
    answer = stdLatex(l)
  }
  if (form === 'ps') answer = isVertical(l) ? siLatex(l) : pointSlopeLatex(l.m, pt[0], pt[1])
  steps.unshift(R`Goal: ${name}.`)
  const markers = [spec.point, ...(spec.points ?? [])].filter(Boolean)
  return {
    type: 'steps', prompt, steps, answer,
    plane: linePlane(l, { extra: markers.length ? [{ kind: 'dots', pts: markers, style: 'vertex', labels: true }] : [] }),
    check: { line: lineSympy(l), key, through: markers, ...(spec.parallel || spec.perp ? { ref: lineSympy(spec.parallel ?? spec.perp), rel: spec.parallel ? 'parallel' : 'perp' } : {}) },
  }
}

// ---------- absolute value: y = a|x − h| + k ----------
export const absFn = (a, h, k) => x => num(Q(a)) * Math.abs(x - num(Q(h))) + num(Q(k))
export function absLatex(a, h, k, v = 'x') {
  a = Q(a); h = Q(h); k = Q(k)
  const c = eqQ(a, q(1)) ? '' : eqQ(a, q(-1)) ? '-' : L(a)
  return `${c}|${shiftLatex(v, h)}|${plus(k)}`
}
export function absPlane(a, h, k, { win, given = false } = {}) {
  a = Q(a); h = Q(h); k = Q(k)
  const f = absFn(a, h, k), H = num(h), K = num(k)
  const pts = [[H, K], [H + 1, f(H + 1)], [H + 2, f(H + 2)], [H - 1, f(H - 1)], [H - 2, f(H - 2)]]
  return {
    window: win ?? windowFor(pts.slice(0, 3), 6),
    items: [...(given ? [] : [{ kind: 'axis', x: H }]), { kind: 'fn', f }, { kind: 'dots', pts: given ? pts.slice(0, 2) : [pts[0]], style: 'vertex', labels: given }, ...(given ? [] : [{ kind: 'dots', pts: pts.slice(1), style: 'key' }])],
  }
}
// ask: any of 'opens', 'vertex', 'axis', 'width', 'graph'
export function absProblem(prompt, a, h, k, ask) {
  a = Q(a); h = Q(h); k = Q(k)
  const A = Math.abs(num(a))
  const steps = [R`Match $y = a|x - h| + k$: $a = ${L(a)}$, $h = ${L(h)}$, $k = ${L(k)}$.`]
  const ans = []
  if (ask.includes('opens')) {
    steps.push(R`$a ${a.n > 0 ? '> 0' : '< 0'}$, so the V opens **${a.n > 0 ? 'up' : 'down'}**.`)
    ans.push(R`\text{Opens ${a.n > 0 ? 'up' : 'down'}}`)
  }
  if (ask.includes('vertex') || ask.includes('graph')) {
    steps.push(R`**Vertex** $(h, k) = ${ptL(h, k)}$. (The sign inside flips: $${shiftLatex('x', h)}$ means $h = ${L(h)}$.)`)
    if (ask.includes('vertex')) ans.push(R`\text{Vertex } ${ptL(h, k)}`)
  }
  if (ask.includes('axis')) { steps.push(R`**Axis of symmetry:** $x = ${L(h)}$.`); ans.push(R`x = ${L(h)}`) }
  if (ask.includes('width')) {
    const w = A > 1 ? 'narrower' : A < 1 ? 'wider' : 'the same width'
    steps.push(R`$|a| = ${L(q(Math.abs(a.n), a.d))}$ ${A > 1 ? '> 1' : A < 1 ? '< 1' : '= 1'}, so the graph is **${w}** ${A === 1 ? 'as' : 'than'} $y = |x|$.`)
    ans.push(R`\text{${w[0].toUpperCase()}${w.slice(1)}}`)
  }
  let plane
  if (ask.includes('graph')) {
    const f = absFn(a, h, k), H = num(h)
    const row = x => R`x = ${x}: y = ${L(q(Math.round(f(x) * 1000), 1000))}`
    steps.push(R`**Plot two points on one side** of the axis $x = ${L(h)}$: $${row(H + 1)}$ and $${row(H + 2)}$.`)
    steps.push(R`**Mirror them** across the axis: $${row(H - 1)}$ and $${row(H - 2)}$. Connect with a V.`)
    plane = absPlane(a, h, k)
    if (!ans.length) ans.push(R`y = ${absLatex(a, h, k)}\ \text{(vertex } ${ptL(h, k)}\text{, see graph)}`)
  }
  return { type: 'steps', prompt, steps, answer: ans.length > 1 ? R`\begin{array}{l} ${ans.join(' \\\\ ')} \end{array}` : ans[0], plane, facts: { opens: a.n > 0 ? 'up' : 'down', vertex: [num(h), num(k)], width: A > 1 ? 'narrower' : A < 1 ? 'wider' : 'same' } }
}
// Write y = a|x − h| + k from its vertex and one more point (Day 4 Ex 5–7, HW #4 22–24).
export function absWrite(prompt, vertex, point, { given = true, key } = {}) {
  const [h, k] = vertex.map(Q), [px, py] = point.map(Q)
  const a = div(sub(py, k), Q(Math.abs(num(sub(px, h)))))
  const steps = [
    R`**Vertex:** $${ptL(h, k)}$, so $y = a|${shiftLatex('x', h)}|${plus(k)}$.`,
    R`**Another point** on the graph: $${ptL(px, py)}$. Plug it in: $${L(py)} = a|${L(px)} ${h.n < 0 ? '+' : '-'} ${L(h.n < 0 ? neg(h) : h)}|${plus(k)} = ${L(Q(Math.abs(num(sub(px, h)))))}a${plus(k)}$.`,
    R`**Solve for $a$:** $a = ${L(a)}$ ${a.n < 0 ? '(negative: it opens **down**)' : '(positive: it opens **up**)'}.`,
  ]
  return {
    type: 'steps', prompt, steps, answer: `y = ${absLatex(a, h, k)}`,
    given: given ? absPlane(a, h, k, { given: true }) : undefined,
    check: { expr: `${sym(a)}*Abs(x - (${sym(h)})) + ${sym(k)}`, key: key ?? null, points: [vertex, point] },
  }
}

// ---------- piecewise functions ----------
// piece: { m, b } (line) | { c } (constant) | { abs: [a, h, k] }, on lo..hi (null = ±∞), loIn / hiIn = endpoint included.
const pieceFn = p => p.abs ? absFn(...p.abs) : p.c != null ? () => num(Q(p.c)) : x => num(Q(p.m)) * x + num(Q(p.b))
export const pieceExact = (p, x) => p.abs ? add(mul(Q(p.abs[0]), Q(Math.abs(num(sub(Q(x), Q(p.abs[1])))))), Q(p.abs[2])) : p.c != null ? Q(p.c) : add(mul(Q(p.m), Q(x)), Q(p.b))
export function pieceLatex(p) {
  if (p.abs) { const [a, h, k] = p.abs.map(Q); return absLatex(a, h, k) }
  if (p.c != null) return L(Q(p.c))
  return linLatex(Q(p.m), Q(p.b))
}
export function condLatex(p) {
  const lo = p.lo != null ? Q(p.lo) : null, hi = p.hi != null ? Q(p.hi) : null
  if (lo && hi && eqQ(lo, hi)) return `x = ${L(lo)}`
  if (lo && hi) return `${L(lo)} ${p.loIn ? '\\le' : '<'} x ${p.hiIn ? '\\le' : '<'} ${L(hi)}`
  if (lo) return `x ${p.loIn ? '\\ge' : '>'} ${L(lo)}`
  return `x ${p.hiIn ? '\\le' : '<'} ${L(hi)}`
}
export const pwLatex = (pieces, name = 'f(x)') => `${name} = \\begin{cases} ${pieces.map(p => `${pieceLatex(p)}, & ${condLatex(p)}`).join(' \\\\ ')} \\end{cases}`
export const pwSympy = pieces => `Piecewise(${pieces.map(p => {
  const e = p.abs ? `${sym(Q(p.abs[0]))}*Abs(x - (${sym(Q(p.abs[1]))})) + ${sym(Q(p.abs[2]))}` : p.c != null ? sym(Q(p.c)) : `${sym(Q(p.m))}*x + ${sym(Q(p.b))}`
  const conds = []
  if (p.lo != null) conds.push(`x ${p.loIn ? '>=' : '>'} ${sym(Q(p.lo))}`)
  if (p.hi != null) conds.push(`x ${p.hiIn ? '<=' : '<'} ${sym(Q(p.hi))}`)
  return `(${e}, ${conds.length ? conds.map(c => `(${c})`).join(' & ') : 'True'})`
}).join(', ')}, (nan, True))`
export function pwPlane(pieces, win) {
  const items = [], ends = { open: [], closed: [] }
  for (const p of pieces) {
    const f = pieceFn(p)
    const lo = p.lo != null ? num(Q(p.lo)) : -Infinity, hi = p.hi != null ? num(Q(p.hi)) : Infinity
    if (lo === hi) { (p.loIn ? ends.closed : ends.open).push([lo, f(lo)]); continue }
    items.push({ kind: 'fn', f, from: lo, to: hi })
    if (p.lo != null) (p.loIn ? ends.closed : ends.open).push([lo, f(lo)])
    if (p.hi != null) (p.hiIn ? ends.closed : ends.open).push([hi, f(hi)])
  }
  // A closed dot covers an open one at the same spot (the function is defined there).
  const same = (a, b) => Math.abs(a[0] - b[0]) < 1e-9 && Math.abs(a[1] - b[1]) < 1e-9
  ends.open = ends.open.filter(o => !ends.closed.some(c => same(o, c)))
  items.push({ kind: 'dots', pts: ends.open, style: 'open' }, { kind: 'dots', pts: ends.closed, style: 'closed' })
  return { window: win ?? [-8, 8, -8, 8], items }
}
const pieceIn = (p, x) => (p.lo == null || x > num(Q(p.lo)) || (p.loIn && x === num(Q(p.lo)))) && (p.hi == null || x < num(Q(p.hi)) || (p.hiIn && x === num(Q(p.hi))))
export const pieceAt = (pieces, x) => pieces.find(p => pieceIn(p, num(Q(x))))
const subst = (p, x) => {
  x = Q(x)
  if (p.abs) { const [a, h, k] = p.abs.map(Q); return `${eqQ(a, q(1)) ? '' : eqQ(a, q(-1)) ? '-' : L(a)}|${par(x)} ${h.n < 0 ? '+' : '-'} ${L(h.n < 0 ? neg(h) : h)}|${plus(k)}` }
  if (p.c != null) return L(Q(p.c))
  return `${eqQ(Q(p.m), q(1)) ? '' : eqQ(Q(p.m), q(-1)) ? '-' : L(Q(p.m))}${par(x)}${plus(Q(p.b))}`
}
// Evaluate f at each x: find the piece whose condition holds.
export function pwEvalSteps(pieces, xs, name = 'f') {
  return xs.map(x => {
    const p = pieceAt(pieces, x)
    if (!p) return { x, value: null, step: R`$${name}(${L(Q(x))})$: $x = ${L(Q(x))}$ fits **none** of the conditions, so $${name}(${L(Q(x))})$ is **undefined**.` }
    const v = pieceExact(p, x)
    return { x, value: v, step: R`$${name}(${L(Q(x))})$: $${L(Q(x))}$ fits $${condLatex(p)}$, so use $${pieceLatex(p)}$: $${subst(p, x)} = ${L(v)}$.` }
  })
}
// Graphing steps: an endpoint table for each piece.
export function pwGraphSteps(pieces) {
  return pieces.map((p, i) => {
    const f = x => pieceExact(p, x)
    if (p.lo != null && p.hi != null && num(Q(p.lo)) === num(Q(p.hi))) return R`**Piece ${i + 1}:** a single point $${ptL(Q(p.lo), f(p.lo))}$ (${p.loIn ? 'closed' : 'open'} dot).`
    const ends = []
    if (p.lo != null) ends.push(R`at $x = ${L(Q(p.lo))}$: $y = ${L(f(p.lo))}$, **${p.loIn ? 'closed' : 'open'}** dot (${p.loIn ? '$\\le$ / $\\ge$ includes it' : '$<$ / $>$ leaves it out'})`)
    if (p.hi != null) ends.push(R`at $x = ${L(Q(p.hi))}$: $y = ${L(f(p.hi))}$, **${p.hiIn ? 'closed' : 'open'}** dot`)
    const kind = p.abs ? 'an absolute value V' : p.c != null ? 'a horizontal line' : 'a line'
    const more = p.lo == null || p.hi == null
    const extraX = p.lo == null ? num(Q(p.hi)) - 2 : p.hi == null ? num(Q(p.lo)) + 2 : null
    return R`**Piece ${i + 1}:** $y = ${pieceLatex(p)}$ is ${kind} for $${condLatex(p)}$. ${ends.join('; ')}.${more ? R` One more point: $x = ${extraX}$ gives $y = ${L(f(extraX))}$; draw an arrow ${p.lo == null ? 'to the left' : 'to the right'}.` : ''}`
  })
}

// ---------- linear inequalities ----------
// rel: '<' | '<=' | '>' | '>='; for vertical lines the inequality is on x.
export const relLatex = { '<': '<', '<=': R`\le`, '>': '>', '>=': R`\ge` }
export function lineIneqPlane(l, rel, win) {
  const dashed = rel === '<' || rel === '>'
  const up = rel[0] === '>'
  const items = isVertical(l)
    ? [{ kind: 'shade', x: num(l.x), side: up ? 'right' : 'left' }, { kind: 'vline', x: num(l.x), dashed }]
    : [{ kind: 'shade', f: fnOf(l), side: up ? 'above' : 'below' }, { kind: 'fn', f: fnOf(l), dashed }]
  return { window: win ?? [-10, 10, -10, 10], items }
}
export const lineIneqLatex = (l, rel) => isVertical(l) ? `x ${relLatex[rel]} ${L(l.x)}` : `y ${relLatex[rel]} ${linLatex(l.m, l.b)}`
// Write the inequality shown in a graph (HW #2): read b and the slope, then the boundary type, then the shading.
export function ineqFromGraph(l, rel, key) {
  const dashed = rel === '<' || rel === '>'
  const steps = []
  if (isVertical(l)) steps.push(R`The boundary is the **vertical** line $x = ${L(l.x)}$.`)
  else {
    const [a, b] = twoPoints(l)
    steps.push(R`**Boundary line:** it crosses the $y$-axis at $${L(l.b)}$, so $b = ${L(l.b)}$.`)
    if (!isZ(l.m)) steps.push(R`**Slope** from two grid points $${ptL(...a)}$ and $${ptL(...b)}$: $m = ${L(l.m)}$. Boundary: $${siLatex(l)}$.`)
    else steps.push(R`It is horizontal, so $m = 0$. Boundary: $y = ${L(l.b)}$.`)
  }
  steps.push(R`The line is **${dashed ? 'dashed' : 'solid'}**, so the points on it are ${dashed ? 'not included: use $<$ or $>$' : 'included: use $\\le$ or $\\ge$'}.`)
  const up = rel[0] === '>'
  steps.push(isVertical(l)
    ? R`The shading is to the **${up ? 'right' : 'left'}**, where $x$ is ${up ? 'bigger' : 'smaller'}: $${lineIneqLatex(l, rel)}$.`
    : R`The shading is **${up ? 'above' : 'below'}** the line, where $y$ is ${up ? 'bigger' : 'smaller'}: $${lineIneqLatex(l, rel)}$.`)
  const t = isVertical(l) || !isZ(l.b) ? [0, 0] : [0, 1]
  const lhs = isVertical(l) ? t[0] : t[1], rhs = isVertical(l) ? num(l.x) : num(l.m) * t[0] + num(l.b)
  const ok = { '<': lhs < rhs, '<=': lhs <= rhs, '>': lhs > rhs, '>=': lhs >= rhs }[rel]
  steps.push(R`**Check** with the test point $${ptL(...t)}$: ${isVertical(l) ? `$${t[0]} ${relLatex[rel]} ${L(l.x)}$` : `$${t[1]} ${relLatex[rel]} ${L(l.m)}(${t[0]})${plus(l.b)}$`} is **${ok ? 'true' : 'false'}**, and $${ptL(...t)}$ is ${ok ? '' : 'not '}in the shaded region ✓.`)
  return { type: 'steps', prompt: R`\text{Write an inequality for the graph.}`, steps, answer: lineIneqLatex(l, rel), given: lineIneqPlane(l, rel), check: { line: lineSympy(l), key: key.line, rel_ineq: rel, key_rel: key.rel } }
}

// ---------- piecewise problems ----------
const INF = Infinity
// Union of intervals { lo, hi, loIn, hiIn } (±Infinity allowed), merged and sorted.
function unionOf(list) {
  const iv = list.map(i => ({ ...i })).sort((s, t) => s.lo - t.lo || (t.loIn - s.loIn))
  const out = []
  for (const i of iv) {
    const last = out.at(-1)
    if (last && (i.lo < last.hi || (i.lo === last.hi && (last.hiIn || i.loIn)))) {
      if (i.hi > last.hi) { last.hi = i.hi; last.hiIn = i.hiIn } else if (i.hi === last.hi) last.hiIn = last.hiIn || i.hiIn
    } else out.push(i)
  }
  return out
}
const ivLatex = i => {
  const f = x => x === INF ? '\\infty' : x === -INF ? '-\\infty' : L(q(Math.round(x * 1e6), 1e6))
  if (i.lo === i.hi) return `\\{${f(i.lo)}\\}`
  return `${i.loIn && i.lo !== -INF ? '[' : '('}${f(i.lo)}, ${f(i.hi)}${i.hiIn && i.hi !== INF ? ']' : ')'}`
}
export const unionLatex = list => list.length ? list.map(ivLatex).join(' \\cup ') : '\\varnothing'
export function domainOf(pieces) {
  return unionOf(pieces.map(p => ({ lo: p.lo != null ? num(Q(p.lo)) : -INF, hi: p.hi != null ? num(Q(p.hi)) : INF, loIn: !!p.loIn, hiIn: !!p.hiIn })))
}
// Range of line / constant pieces (absolute value pieces are not needed here).
export function rangeOf(pieces) {
  return unionOf(pieces.map(p => {
    const lo = p.lo != null ? num(Q(p.lo)) : -INF, hi = p.hi != null ? num(Q(p.hi)) : INF
    if (p.c != null || lo === hi) { const v = num(pieceExact(p, p.lo ?? p.hi ?? 0)); return { lo: v, hi: v, loIn: true, hiIn: true } }
    const m = num(Q(p.m)), f = x => x === -INF ? (m > 0 ? -INF : INF) : x === INF ? (m > 0 ? INF : -INF) : m * x + num(Q(p.b))
    const [a, b] = [f(lo), f(hi)]
    return m > 0 ? { lo: a, hi: b, loIn: !!p.loIn, hiIn: !!p.hiIn } : { lo: b, hi: a, loIn: !!p.hiIn, hiIn: !!p.loIn }
  }))
}
const endpointFacts = pieces => {
  const { items } = pwPlane(pieces)
  const dots = items.filter(i => i.kind === 'dots')
  const r = v => Math.round(v * 1000) / 1000
  return { open: dots[0].pts.map(p => p.map(r)), closed: dots[1].pts.map(p => p.map(r)) }
}
// Graph a piecewise function (Day 4 Ex 8–9, HW #4, HW #6, HW #7). exp: { open, closed } read from the key's graph.
export function pwGraphProblem(prompt, pieces, { win, exp, name = 'f(x)' } = {}) {
  const steps = [R`Each piece only lives on its own interval. Graph them one at a time, starting each piece at its boundary point.`, ...pwGraphSteps(pieces)]
  steps.push(R`**Check:** a vertical line never hits the graph twice, so it is a function.`)
  return { type: 'steps', prompt: prompt ?? pwLatex(pieces, name), steps, answer: R`\text{See the graph}`, plane: pwPlane(pieces, win), facts: endpointFacts(pieces), exp }
}
// Evaluate (HW #5 Part II, HW #6 8–9, Unit 0 review). values: key numbers (null = undefined).
export function pwEvalProblem(prompt, pieces, xs, values, { name = 'f', win, domainRange = false, keyNote, expDR } = {}) {
  const ev = pwEvalSteps(pieces, xs, name)
  const steps = [R`For each input, find the piece whose condition is true, then substitute into **that piece only**.`, ...ev.map(e => e.step)]
  const ans = ev.map(e => `${name}(${L(Q(e.x))}) = ${e.value ? L(e.value) : '\\text{undefined}'}`)
  let facts = { values: ev.map(e => e.value ? num(e.value) : null) }
  if (domainRange) {
    const D = domainOf(pieces), Rg = rangeOf(pieces)
    steps.push(R`**Domain** (all the $x$-values the pieces cover): $${unionLatex(D)}$.`)
    steps.push(R`**Range** (all the $y$-values the graph reaches, from bottom to top): $${unionLatex(Rg)}$.`)
    ans.push(`D: ${unionLatex(D)}`, `R: ${unionLatex(Rg)}`)
    facts = { ...facts, domain: unionLatex(D), range: unionLatex(Rg) }
  }
  if (keyNote) steps.push(keyNote)
  return { type: 'steps', prompt: prompt ?? pwLatex(pieces, `${name}(x)`), steps, answer: R`\begin{array}{l} ${ans.join(' \\\\ ')} \end{array}`, plane: pwPlane(pieces, win), planeAt: 1, facts, exp: values ? { values, ...(expDR ?? {}) } : undefined }
}
// Write the equation from a graph (Day 5, HW #5 Part III, HW #7 additional review).
// Each piece lists two points read off the graph so the slope can be shown.
export function pwWriteProblem(prompt, pieces, key, { win, name = 'f(x)', reads } = {}) {
  const steps = [R`Write one rule for each section of the graph, then its $x$-interval. A **closed** dot means $\le$ or $\ge$; an **open** dot means $<$ or $>$.`]
  pieces.forEach((p, i) => {
    const rd = reads?.[i]
    let rule
    if (p.c != null) rule = R`it is **horizontal** at $y = ${L(Q(p.c))}$, so the rule is $${L(Q(p.c))}$`
    else if (p.abs) rule = R`it is a V with vertex $${ptL(Q(p.abs[1]), Q(p.abs[2]))}$: $${pieceLatex(p)}$`
    else if (rd) rule = R`through $${ptL(...rd[0])}$ and $${ptL(...rd[1])}$: slope $${slopeWork(rd[0], rd[1])} = ${L(Q(p.m))}$; then $b = ${L(Q(p.b))}$, so $${pieceLatex(p)}$`
    else rule = R`slope $${L(Q(p.m))}$ and $y$-intercept $${L(Q(p.b))}$: $${pieceLatex(p)}$`
    steps.push(R`**Piece ${i + 1}:** ${rule}, for $${condLatex(p)}$.`)
  })
  const samples = []
  pieces.forEach(p => { for (const e of [p.lo, p.hi]) if (e != null) samples.push(num(Q(e)) - 0.5, num(Q(e)), num(Q(e)) + 0.5) })
  return { type: 'steps', prompt, steps, answer: pwLatex(pieces, name), given: pwPlane(pieces, win), check: key ? { piecewise: pwSympy(pieces), key, samples: [...new Set(samples)] } : undefined }
}
