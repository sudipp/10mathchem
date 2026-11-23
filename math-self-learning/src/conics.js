// Conic sections (circles, parabolas, ellipses, hyperbolas) with exact values.
// General form A x² + C y² + D x + E y + F = 0 → standard form by completing the
// square, with teaching steps; key features (center, vertices, foci, asymptotes,
// focus/directrix) as exact fractions or simplified square roots.
import { q, add, sub, mul, div, num, eqQ, qLatex } from './poly.js'

const R = String.raw
export const toQ = x => typeof x === 'number' ? q(x) : Array.isArray(x) ? q(x[0], x[1]) : x
const neg = a => q(-a.n, a.d)
const isZ = a => a.n === 0
const absQ = a => q(Math.abs(a.n), a.d)
const sqQ = a => mul(a, a)
const ONE = q(1)

// ---------- square roots: c·√r with r square-free ----------
export function sqrtQ(x) {
  x = toQ(x)
  if (x.n < 0) throw new Error(`sqrt of a negative number (${x.n}/${x.d})`)
  let r = x.n * x.d, out = 1
  for (let f = 2; f * f <= r; f++) while (r % (f * f) === 0) { r /= f * f; out *= f }
  return { c: q(out, x.d), r }
}
export const surdNum = s => num(s.c) * Math.sqrt(s.r)
export const isRat = s => s.r === 1 || s.c.n === 0
export function surdLatex(s) {
  if (isRat(s)) return qLatex(s.c)
  const n = Math.abs(s.c.n), d = s.c.d
  const top = `${n === 1 ? '' : n}\\sqrt{${s.r}}`
  return `${s.c.n < 0 ? '-' : ''}${d === 1 ? top : `\\tfrac{${top}}{${d}}`}`
}
// √(value) written in full, e.g. "\sqrt{12} = 2\sqrt{3}" when it simplifies.
export function rootLatex(x) {
  x = toQ(x)
  const s = sqrtQ(x)
  const raw = x.d === 1 ? `\\sqrt{${x.n}}` : `\\sqrt{\\tfrac{${x.n}}{${x.d}}}`
  if (isRat(s)) return `${raw} = ${qLatex(s.c)}`
  const simple = surdLatex(s)
  return simple === raw || (x.d === 1 && simple === `\\sqrt{${x.n}}`) ? raw : `${raw} = ${simple}`
}
const sympyQ = a => a.d === 1 ? `(${a.n})` : `(${a.n}/${a.d})`

// ---------- LaTeX helpers ----------
const fracQ = a => a.d === 1 ? String(a.n) : `\\tfrac{${Math.abs(a.n)}}{${a.d}}`
const valQ = a => a.d === 1 ? String(a.n) : `${a.n < 0 ? '-' : ''}\\tfrac{${Math.abs(a.n)}}{${a.d}}`
// (v − h)² or v² when h = 0
export const sqTerm = (v, h) => isZ(h) ? `${v}^2` : `(${v} ${h.n < 0 ? '+' : '-'} ${fracQ(absQ(h))})^2`
const tail = c => isZ(c) ? '' : ` ${c.n < 0 ? '-' : '+'} ${fracQ(absQ(c))}`
const coef = a => eqQ(a, ONE) ? '' : eqQ(a, q(-1)) ? '-' : valQ(a)
const den = a => a.d === 1 ? String(a.n) : `\\frac{${a.n}}{${a.d}}`
export const ptLatex = (x, y) => `\\left(${x},\\ ${y}\\right)`
const pmLatex = (h, s) => isZ(h) ? `\\pm ${surdLatex(s)}` : `${valQ(h)} \\pm ${surdLatex(s)}`
// y − k = ±m(x − h)
const shifted = (v, h) => isZ(h) ? v : `${v} ${h.n < 0 ? '+' : '-'} ${fracQ(absQ(h))}`
export const pointSlope = (h, k, m) => `${shifted('y', k)} = \\pm ${surdLatex(m) === '1' ? '' : surdLatex(m)}${isZ(h) ? 'x' : `(${shifted('x', h)})`}`
// A x² + C y² + D x + E y + F
export function generalLatex(g) {
  const terms = [[g.A, 'x^2'], [g.C, 'y^2'], [g.D, 'x'], [g.E, 'y'], [g.F, '']].filter(([c]) => !isZ(c))
  return terms.map(([c, v], i) => {
    const body = v && eqQ(absQ(c), ONE) ? v : `${fracQ(absQ(c))}${v}`
    return i === 0 ? `${c.n < 0 ? '-' : ''}${body}` : `${c.n < 0 ? '-' : '+'} ${body}`
  }).join(' ') || '0'
}
const linTerm = (c, v) => isZ(c) ? '' : ` ${c.n < 0 ? '-' : '+'} ${eqQ(absQ(c), ONE) ? '' : fracQ(absQ(c))}${v}`

// Two points h ± s along one axis: both written out when s is rational, else "h ± s".
function offsetPoints(h, k, axis, s) {
  const [hn, kn, d] = [num(h), num(k), surdNum(s)]
  const pts = axis === 'x' ? [[hn + d, kn], [hn - d, kn]] : [[hn, kn + d], [hn, kn - d]]
  if (isRat(s)) {
    const plus = axis === 'x' ? [add(h, s.c), k] : [h, add(k, s.c)]
    const minus = axis === 'x' ? [sub(h, s.c), k] : [h, sub(k, s.c)]
    return { pts, exact: [plus, minus], latex: `${ptLatex(valQ(plus[0]), valQ(plus[1]))},\\ ${ptLatex(valQ(minus[0]), valQ(minus[1]))}` }
  }
  return { pts, latex: axis === 'x' ? ptLatex(pmLatex(h, s), valQ(k)) : ptLatex(valQ(h), pmLatex(k, s)) }
}

// ---------- standard form ----------
// circle {h,k,r2} · parabola {vertical,a,h,k} · ellipse {h,k,X2,Y2} · hyperbola {h,k,X2,Y2,vertical}
export function makeConic(c) {
  const o = { ...c }
  for (const key of ['h', 'k', 'r2', 'a', 'X2', 'Y2']) if (o[key] != null) o[key] = toQ(o[key])
  o.h ??= q(0); o.k ??= q(0)
  return o
}

export function stdLatex(c) {
  const { h, k } = c
  if (c.kind === 'circle') return `${sqTerm('x', h)} + ${sqTerm('y', k)} = ${valQ(c.r2)}`
  if (c.kind === 'parabola') return c.vertical ? `y = ${coef(c.a)}${sqTerm('x', h)}${tail(k)}` : `x = ${coef(c.a)}${sqTerm('y', k)}${tail(h)}`
  const X = `\\dfrac{${sqTerm('x', h)}}{${den(c.X2)}}`, Y = `\\dfrac{${sqTerm('y', k)}}{${den(c.Y2)}}`
  if (c.kind === 'ellipse') return `${X} + ${Y} = 1`
  return c.vertical ? `${Y} - ${X} = 1` : `${X} - ${Y} = 1`
}

// Sympy expression that equals 0 on the curve.
export function stdSympy(c) {
  const X = `(x - ${sympyQ(c.h)})**2`, Y = `(y - ${sympyQ(c.k)})**2`
  if (c.kind === 'circle') return `${X} + ${Y} - ${sympyQ(c.r2)}`
  if (c.kind === 'parabola') return c.vertical ? `y - (${sympyQ(c.a)}*${X} + ${sympyQ(c.k)})` : `x - (${sympyQ(c.a)}*${Y} + ${sympyQ(c.h)})`
  if (c.kind === 'ellipse') return `${X}/${sympyQ(c.X2)} + ${Y}/${sympyQ(c.Y2)} - 1`
  return c.vertical ? `${Y}/${sympyQ(c.Y2)} - ${X}/${sympyQ(c.X2)} - 1` : `${X}/${sympyQ(c.X2)} - ${Y}/${sympyQ(c.Y2)} - 1`
}
// Numeric value of the standard-form expression (0 on the curve).
export function stdValue(c, x, y) {
  const X = (x - num(c.h)) ** 2, Y = (y - num(c.k)) ** 2
  if (c.kind === 'circle') return X + Y - num(c.r2)
  if (c.kind === 'parabola') return c.vertical ? y - (num(c.a) * X + num(c.k)) : x - (num(c.a) * Y + num(c.h))
  if (c.kind === 'ellipse') return X / num(c.X2) + Y / num(c.Y2) - 1
  return c.vertical ? Y / num(c.Y2) - X / num(c.X2) - 1 : X / num(c.X2) - Y / num(c.Y2) - 1
}

// ---------- key features ----------
export function features(c) {
  const { h, k } = c
  const center = { exact: [h, k], latex: ptLatex(valQ(h), valQ(k)), pt: [num(h), num(k)] }
  if (c.kind === 'circle') {
    const r = sqrtQ(c.r2)
    return { kind: 'circle', center, r, rLatex: surdLatex(r), points: [offsetPoints(h, k, 'x', r), offsetPoints(h, k, 'y', r)] }
  }
  if (c.kind === 'parabola') {
    const p = div(ONE, mul(q(4), c.a))
    const vertex = center
    if (c.vertical) {
      const F = [h, add(k, p)], d = sub(k, p)
      return { kind: 'parabola', vertical: true, vertex, p, focus: { exact: F, latex: ptLatex(valQ(F[0]), valQ(F[1])), pt: F.map(num) }, directrix: { y: d, latex: `y = ${valQ(d)}` }, axis: { x: h, latex: `x = ${valQ(h)}` }, opens: c.a.n > 0 ? 'up' : 'down', intercept: { y: add(mul(c.a, sqQ(h)), k), latex: `y\\text{-int: } ${valQ(add(mul(c.a, sqQ(h)), k))}` } }
    }
    const F = [add(h, p), k], d = sub(h, p)
    return { kind: 'parabola', vertical: false, vertex, p, focus: { exact: F, latex: ptLatex(valQ(F[0]), valQ(F[1])), pt: F.map(num) }, directrix: { x: d, latex: `x = ${valQ(d)}` }, axis: { y: k, latex: `y = ${valQ(k)}` }, opens: c.a.n > 0 ? 'right' : 'left', intercept: { x: add(mul(c.a, sqQ(k)), h), latex: `x\\text{-int: } ${valQ(add(mul(c.a, sqQ(k)), h))}` } }
  }
  if (c.kind === 'ellipse') {
    const horizontal = num(c.X2) > num(c.Y2)
    const a2 = horizontal ? c.X2 : c.Y2, b2 = horizontal ? c.Y2 : c.X2, c2 = sub(a2, b2)
    const [a, b, cc] = [sqrtQ(a2), sqrtQ(b2), sqrtQ(c2)]
    const major = horizontal ? 'x' : 'y', minor = horizontal ? 'y' : 'x'
    return { kind: 'ellipse', horizontal, center, a2, b2, c2, a, b, c: cc, vertices: offsetPoints(h, k, major, a), coVertices: offsetPoints(h, k, minor, b), foci: offsetPoints(h, k, major, cc) }
  }
  const vertical = !!c.vertical
  const a2 = vertical ? c.Y2 : c.X2, b2 = vertical ? c.X2 : c.Y2, c2 = add(a2, b2)
  const [a, b, cc] = [sqrtQ(a2), sqrtQ(b2), sqrtQ(c2)]
  const major = vertical ? 'y' : 'x', minor = vertical ? 'x' : 'y'
  const m = vertical ? sqrtQ(div(a2, b2)) : sqrtQ(div(b2, a2))
  let asym = pointSlope(h, k, m)
  let lines = null
  if (isRat(m)) {
    const ms = m.c, b1 = sub(k, mul(ms, h)), b2v = add(k, mul(ms, h))
    const line = (s, bb) => `y = ${eqQ(s, ONE) ? '' : eqQ(s, q(-1)) ? '-' : valQ(s)}x${tail(bb)}`
    lines = [line(ms, b1), line(neg(ms), b2v)]
    asym = `${lines[0]},\\quad ${lines[1]}`
  }
  return { kind: 'hyperbola', vertical, center, a2, b2, c2, a, b, c: cc, m, vertices: offsetPoints(h, k, major, a), coVertices: offsetPoints(h, k, minor, b), foci: offsetPoints(h, k, major, cc), asymptotes: { latex: asym, lines } }
}

// Answer lines for the requested features.
const LABEL = { center: 'Center', radius: 'Radius', vertex: 'Vertex', focus: 'Focus', directrix: 'Directrix', axis: 'Axis of symmetry', opens: 'Opens', intercept: 'Intercept', vertices: 'Vertices', coVertices: 'Co-vertices', foci: 'Foci', asymptotes: 'Asymptotes' }
export function featureLatex(f, key) {
  if (key === 'radius') return f.rLatex
  if (key === 'opens') return `\\text{${f.opens}}`
  if (key === 'vertex') return f.vertex.latex
  if (key === 'intercept') return f.intercept.latex
  return f[key]?.latex
}
export const answerLines = (c, f, keys) => [stdLatex(c), ...keys.map(key => `\\text{${LABEL[key]}: } ${featureLatex(f, key)}`)]

// ---------- general form → standard form, with steps ----------
export function classify(g) {
  const { A, C } = g
  if (isZ(A) && isZ(C)) throw new Error('not a conic')
  if (isZ(A) || isZ(C)) return 'parabola'
  if (eqQ(A, C)) return 'circle'
  return A.n * C.n > 0 ? 'ellipse' : 'hyperbola'
}
const KIND_WHY = {
  circle: R`$x^2$ and $y^2$ have the **same** coefficient, so it is a **circle**.`,
  parabola: R`Only **one** variable is squared, so it is a **parabola**.`,
  ellipse: R`$x^2$ and $y^2$ have **different coefficients with the same sign**, so it is an **ellipse**.`,
  hyperbola: R`$x^2$ and $y^2$ have **opposite signs**, so it is a **hyperbola**.`,
}

export function fromGeneral(input) {
  const g = Object.fromEntries(['A', 'C', 'D', 'E', 'F'].map(key => [key, toQ(input[key] ?? 0)]))
  const kind = classify(g)
  const steps = [R`**Get 0 on one side** and put the terms in order: $${generalLatex(g)} = 0$. ${KIND_WHY[kind]}`]
  let { A, C, D, E, F } = g
  if (kind === 'parabola') {
    const vertical = !isZ(A)
    const [sq, lin, other, v, w] = vertical ? [A, D, E, 'x', 'y'] : [C, E, D, 'y', 'x']
    if (isZ(other)) throw new Error('degenerate parabola')
    // other·w = −(sq v² + lin v + F)
    const a = neg(div(sq, other)), b = neg(div(lin, other)), cc = neg(div(F, other))
    const solved = `${w} = ${coef(a)}${v}^2${linTerm(b, v)}${tail(cc)}`
    if (eqQ(absQ(other), ONE)) steps.push(R`**Solve for $${w}$** (the variable that is **not** squared): $${solved}$.`)
    else {
      const s = other.n < 0 ? ONE : q(-1)
      const rest = vertical ? { A: mul(sq, s), C: q(0), D: mul(lin, s), E: q(0), F: mul(F, s) } : { A: q(0), C: mul(sq, s), D: q(0), E: mul(lin, s), F: mul(F, s) }
      steps.push(R`**Solve for $${w}$** (the variable that is **not** squared): $${fracQ(absQ(other))}${w} = ${generalLatex(rest)}$, so divide by $${fracQ(absQ(other))}$: $${solved}$.`)
    }
    const hv = neg(div(b, mul(q(2), a)))
    const kv = sub(cc, mul(a, sqQ(hv)))
    const conic = makeConic({ kind: 'parabola', vertical, a, h: vertical ? hv : kv, k: vertical ? kv : hv })
    if (isZ(b)) steps.push(R`There is no $${v}$ term, so the vertex form is just $${stdLatex(conic)}$.`)
    else {
      const half = div(b, mul(q(2), a))
      steps.push(R`**Complete the square:** factor $${valQ(a)}$ out of the $${v}$ terms: $${w} = ${coef(a)}\left(${v}^2${linTerm(div(b, a), v)}\right)${tail(cc)}$. Half of $${valQ(div(b, a))}$ is $${valQ(half)}$; square it: $${valQ(sqQ(half))}$.`)
      steps.push(R`Add it inside and subtract $${valQ(a)} \cdot ${valQ(sqQ(half))} = ${valQ(mul(a, sqQ(half)))}$ outside to keep it balanced: $${stdLatex(conic)}$.`)
    }
    return { conic, steps, kind }
  }
  if (kind === 'circle' && !eqQ(A, ONE)) {
    steps.push(R`**Divide every term by $${valQ(A)}$** so $x^2$ and $y^2$ have coefficient 1: $${generalLatex({ A: ONE, C: ONE, D: div(D, A), E: div(E, A), F: div(F, A) })} = 0$.`)
    D = div(D, A); E = div(E, A); F = div(F, A); A = ONE; C = ONE
  }
  const right0 = neg(F)
  if (kind === 'circle') {
    const hx = div(D, q(2)), ky = div(E, q(2))
    steps.push(R`**Group** the $x$ terms and the $y$ terms, and move the number to the right: $(x^2${linTerm(D, 'x')}) + (y^2${linTerm(E, 'y')}) = ${valQ(right0)}$.`)
    const r2 = add(right0, add(sqQ(hx), sqQ(ky)))
    const conic = makeConic({ kind: 'circle', h: neg(hx), k: neg(ky), r2 })
    if (isZ(D) && isZ(E)) steps.push(R`There are no $x$ or $y$ terms to complete: $${stdLatex(conic)}$.`)
    else steps.push(R`**Complete the square:** add $\left(\tfrac{${valQ(D)}}{2}\right)^2 = ${valQ(sqQ(hx))}$ and $\left(\tfrac{${valQ(E)}}{2}\right)^2 = ${valQ(sqQ(ky))}$ to **both** sides: $${stdLatex(conic).replace(/= .*$/, '')}= ${valQ(right0)} + ${valQ(sqQ(hx))} + ${valQ(sqQ(ky))} = ${valQ(r2)}$.`)
    if (r2.n <= 0) throw new Error('not a real circle')
    return { conic, steps, kind }
  }
  // Ellipse or hyperbola.
  const hx = div(D, mul(q(2), A)), ky = div(E, mul(q(2), C))
  const group = (a, d, v) => isZ(d) ? `${coef(a)}${v}^2` : eqQ(a, ONE) ? `(${v}^2${linTerm(d, v)})` : `${coef(a)}(${v}^2${linTerm(div(d, a), v)})`
  const addX = mul(A, sqQ(hx)), addY = mul(C, sqQ(ky))
  const Rv = add(right0, add(addX, addY))
  if (isZ(Rv)) throw new Error('degenerate conic')
  if (!isZ(D) || !isZ(E)) {
    steps.push(R`**Group** the $x$ and $y$ terms, factor out the coefficients of $x^2$ and $y^2$, and move the number to the right: $${group(A, D, 'x')} ${C.n < 0 ? '-' : '+'} ${group(absQ(C), C.n < 0 ? neg(E) : E, 'y')} = ${valQ(right0)}$.`)
    const parts = []
    if (!isZ(D)) parts.push(`$${valQ(A)} \\cdot ${valQ(sqQ(hx))} = ${valQ(addX)}$`)
    if (!isZ(E)) parts.push(`$${valQ(C)} \\cdot ${valQ(sqQ(ky))} = ${valQ(addY)}$`)
    const lhs = `${coef(A)}${sqTerm('x', neg(hx))} ${C.n < 0 ? '-' : '+'} ${coef(absQ(C))}${sqTerm('y', neg(ky))}`
    steps.push(R`**Complete the square** inside each group. Because of the factored-out numbers, the right side gets ${parts.join(' and ')}: $${lhs} = ${valQ(Rv)}$.`)
  } else steps.push(R`There are no $x$ or $y$ terms, so it is already grouped: $${coef(A)}x^2 ${C.n < 0 ? '-' : '+'} ${coef(absQ(C))}y^2 = ${valQ(Rv)}$.`)
  const X2 = div(Rv, A), Y2 = div(Rv, C)
  const vertical = kind === 'hyperbola' && Y2.n > 0
  const conic = makeConic(kind === 'ellipse'
    ? { kind, h: neg(hx), k: neg(ky), X2, Y2 }
    : { kind, h: neg(hx), k: neg(ky), X2: absQ(X2), Y2: absQ(Y2), vertical })
  steps.push(R`**Divide both sides by $${valQ(Rv)}$** so the right side is 1: $${stdLatex(conic)}$.${kind === 'hyperbola' && Rv.n < 0 ? ' (Dividing by a negative flips which term is positive.)' : ''}`)
  return { conic, steps, kind }
}

// Teaching steps for "classify the conic" from A x² + C y² + … = 0.
export function classifySteps(input) {
  const g = Object.fromEntries(['A', 'C', 'D', 'E', 'F'].map(key => [key, toQ(input[key] ?? 0)]))
  const kind = classify(g)
  return {
    kind,
    steps: [
      R`Write it as $Ax^2 + Cy^2 + Dx + Ey + F = 0$: $${generalLatex(g)} = 0$, so $A = ${valQ(g.A)}$ and $C = ${valQ(g.C)}$.`,
      kind === 'parabola' ? R`$AC = ${valQ(mul(g.A, g.C))} = 0$: only one variable is squared, so it is a **parabola**.`
        : kind === 'circle' ? R`$A = C$ (and not $0$), so it is a **circle**.`
          : kind === 'ellipse' ? R`$AC = ${valQ(mul(g.A, g.C))} > 0$ (same signs) and $A \ne C$, so it is an **ellipse**.`
            : R`$AC = ${valQ(mul(g.A, g.C))} < 0$ (different signs), so it is a **hyperbola**.`,
    ],
  }
}

// Teaching steps that read the key features off the standard form.
export function featureSteps(c, f) {
  const { h, k } = c
  if (c.kind === 'circle') return [R`**Center** $(h, k) = ${f.center.latex}$ (use the opposite signs of the numbers inside the parentheses). **Radius** $r = ${rootLatex(c.r2)}$.`]
  if (c.kind === 'parabola') {
    const sym = c.vertical ? 'x' : 'y'
    return [
      R`**Vertex** $${f.vertex.latex}$. $a = ${valQ(c.a)}$, so it opens **${f.opens}** ($${sym}$ is squared, so the axis of symmetry is ${c.vertical ? 'vertical' : 'horizontal'}: $${f.axis.latex}$).`,
      R`$p = \dfrac{1}{4a} = \dfrac{1}{4(${valQ(c.a)})} = ${valQ(f.p)}$. **Focus** is $p$ from the vertex inside the curve: $${f.focus.latex}$. **Directrix** is $p$ the other way: $${f.directrix.latex}$.`,
    ]
  }
  if (c.kind === 'ellipse') return [
    R`**Center** $${f.center.latex}$. The larger denominator is under $${f.horizontal ? 'x' : 'y'}$, so the major axis is **${f.horizontal ? 'horizontal' : 'vertical'}**: $a^2 = ${valQ(f.a2)}$, $b^2 = ${valQ(f.b2)}$, so $a = ${rootLatex(f.a2)}$ and $b = ${rootLatex(f.b2)}$.`,
    R`**Vertices** ($a$ from the center along the major axis): $${f.vertices.latex}$. **Co-vertices** ($b$ along the minor axis): $${f.coVertices.latex}$.`,
    R`**Foci:** $c^2 = a^2 - b^2 = ${valQ(f.a2)} - ${valQ(f.b2)} = ${valQ(f.c2)}$, so $c = ${rootLatex(f.c2)}$. The foci are $c$ from the center on the major axis: $${f.foci.latex}$.`,
  ]
  const slope = c.vertical ? R`\tfrac{a}{b}` : R`\tfrac{b}{a}`
  return [
    R`**Center** $${f.center.latex}$. The **positive** term is the $${c.vertical ? 'y' : 'x'}$ term, so the transverse axis is **${c.vertical ? 'vertical' : 'horizontal'}**: $a^2 = ${valQ(f.a2)}$, $b^2 = ${valQ(f.b2)}$, so $a = ${rootLatex(f.a2)}$ and $b = ${rootLatex(f.b2)}$.`,
    R`**Vertices** ($a$ from the center): $${f.vertices.latex}$. **Foci:** $c^2 = a^2 + b^2 = ${valQ(f.c2)}$, so $c = ${rootLatex(f.c2)}$: $${f.foci.latex}$.`,
    R`**Asymptotes** go through the center with slope $\pm ${slope} = \pm ${surdLatex(f.m)}$: $${pointSlope(h, k, f.m)}$${f.asymptotes.lines ? R`, which is $${f.asymptotes.latex}$` : ''}.`,
  ]
}
