// Polynomial inequalities (sign charts) and parabolas from focus/directrix.
import { P, eqQ, evaluate, num, polyLatex, polyMul, polySub, q, qLatex, trim } from './poly.js'
import { rationalRoots, qSympy } from './roots.js'

const toQ = a => Array.isArray(a) ? q(a[0], a[1]) : q(a)
const qLabel = x => x.d === 1 ? String(x.n).replace('-', '−') : `${x.n < 0 ? '−' : ''}${Math.abs(x.n)}/${x.d}`

export const REL = { '<': '<', '<=': '\\le', '>': '>', '>=': '\\ge' }

function factorTex([a, b, m = 1]) {
  const base = b === 0 && a === 1 ? 'x' : `(${polyLatex(P([a, b]))})`
  return m > 1 ? `${base}^{${m}}` : base
}

// A rational number strictly between u and v (numbers), as simple as possible.
function between(u, v) {
  for (const d of [1, 2, 4, 10, 100]) {
    const lo = Math.floor(u * d) + 1, hi = Math.ceil(v * d) - 1
    if (lo <= hi) { const mid = Math.round((u + v) / 2 * d); return q(Math.min(Math.max(mid, lo), hi), d) }
  }
  return q(Math.round((u + v) / 2 * 1000), 1000)
}

export function inequality(p) {
  const factored = !!p.factors
  let poly, moved = null
  if (factored) {
    poly = p.factors.reduce((acc, [a, b, m = 1]) => { for (let i = 0; i < m; i++) acc = polyMul(acc, P([a, b])); return acc }, P([p.c ?? 1]))
  } else {
    poly = trim(polySub(P(p.lhs), P(p.rhs ?? [0])))
    if (p.rhs && trim(P(p.rhs)).some(c => c.n !== 0)) moved = poly
  }
  const promptLhs = factored ? `${p.c != null && p.c !== 1 ? p.c : ''}${p.factors.map(factorTex).join('')}` : polyLatex(P(p.lhs))
  const promptRhs = factored ? '0' : polyLatex(P(p.rhs ?? [0]))
  // Real zeros with multiplicity.
  const zeros = []
  let rr = null
  if (factored) {
    p.factors.forEach(([a, b, m = 1]) => {
      const x = q(-b, a), z = zeros.find(w => eqQ(w.q, x))
      if (z) z.m += m; else zeros.push({ q: x, m })
    })
  } else {
    rr = rationalRoots(poly.map(c => [c.n, c.d]))
    rr.zeros.forEach(z => zeros.push({ q: z.x, m: z.m }))
  }
  const pts = zeros.map(z => ({ value: num(z.q), latex: qLatex(z.q), sympy: qSympy(z.q), label: qLabel(z.q), m: z.m, q: z.q }))
  rr?.others.forEach(o => o.each?.forEach(e => pts.push({ value: e.value, latex: e.latex, sympy: e.sympy, label: `≈ ${(Math.round(e.value * 100) / 100).toString().replace('-', '−')}`, m: 1 })))
  pts.sort((a, b) => a.value - b.value)
  const allRational = !rr || (rr.zeros.reduce((s, z) => s + z.m, 0) === poly.length - 1)
  // Test points and signs.
  const tests = []
  if (!pts.length) tests.push(q(0))
  else {
    tests.push(q(Math.floor(pts[0].value) - 1))
    for (let i = 0; i < pts.length - 1; i++) tests.push(between(pts[i].value, pts[i + 1].value))
    tests.push(q(Math.ceil(pts[pts.length - 1].value) + 1))
  }
  const vals = tests.map(t => evaluate(poly, t))
  const signs = vals.map(v => Math.sign(v.n))
  const want = p.rel.startsWith('>') ? 1 : -1
  const strict = !p.rel.includes('=')
  // Atoms: I0, Z1, I1, ..., Zk, Ik.
  const atoms = []
  signs.forEach((s, i) => { atoms.push({ kind: 'I', i, inc: s === want }); if (i < pts.length) atoms.push({ kind: 'Z', i, inc: !strict }) })
  const runs = []
  let cur = null
  atoms.forEach(a => { if (a.inc) { if (!cur) { cur = []; runs.push(cur) } cur.push(a) } else cur = null })
  const pieces = runs.map(run => {
    const first = run[0], last = run[run.length - 1]
    if (run.length === 1 && first.kind === 'Z') return { point: pts[first.i] }
    const lo = first.kind === 'Z' ? { pt: pts[first.i], closed: true } : first.i === 0 ? null : { pt: pts[first.i - 1], closed: false }
    const hi = last.kind === 'Z' ? { pt: pts[last.i], closed: true } : last.i === pts.length ? null : { pt: pts[last.i], closed: false }
    return { lo, hi }
  })
  const pieceTex = pc => pc.point ? `\\{${pc.point.latex}\\}` : `${pc.lo ? (pc.lo.closed ? '[' : '(') + pc.lo.pt.latex : '(-\\infty'},\\ ${pc.hi ? pc.hi.pt.latex + (pc.hi.closed ? ']' : ')') : '\\infty)'}`
  const answer = !pieces.length ? '\\varnothing' : pieces.length === 1 && !pieces[0].point && !pieces[0].lo && !pieces[0].hi ? '(-\\infty,\\ \\infty)' : pieces.map(pieceTex).join(' \\cup ')
  const pieceSym = pc => pc.point ? `FiniteSet(${pc.point.sympy})` : `Interval(${pc.lo ? pc.lo.pt.sympy : '-oo'}, ${pc.hi ? pc.hi.pt.sympy : 'oo'}, ${pc.lo ? !pc.lo.closed : true}, ${pc.hi ? !pc.hi.closed : true})`.replace(/true/g, 'True').replace(/false/g, 'False')
  const sympySet = !pieces.length ? 'EmptySet' : `Union(${pieces.map(pieceSym).join(', ')})`
  return { poly, moved, promptLhs, promptRhs, factored, rr, allRational, pts, tests, vals, signs, want, strict, atoms, pieces, answer, sympySet }
}

// Factored form c · Π (d x - n)^m when every zero is rational.
export function factoredForm(poly, zeros) {
  let lead = poly[0]
  const parts = zeros.map(z => { lead = q(lead.n * 1, lead.d * z.q.d ** z.m); return factorTex([z.q.d, -z.q.n, z.m]) })
  const c = lead.d === 1 && lead.n === 1 ? '' : lead.d === 1 && lead.n === -1 ? '-' : qLatex(lead)
  return c + parts.join('')
}

// Parabola from vertex & focus, or focus & directrix.
export function parabola(p) {
  const F = p.focus.map(toQ)
  let V, dir = null
  if (p.vertex) V = p.vertex.map(toQ)
  else {
    dir = p.directrix
    const d = toQ(dir.y ?? dir.x)
    V = dir.y != null ? [F[0], q(F[1].n * d.d + d.n * F[1].d, 2 * F[1].d * d.d)] : [q(F[0].n * d.d + d.n * F[0].d, 2 * F[0].d * d.d), F[1]]
  }
  const vertical = eqQ(V[0], F[0])
  const P4 = vertical ? q(F[1].n * V[1].d - V[1].n * F[1].d, F[1].d * V[1].d) : q(F[0].n * V[0].d - V[0].n * F[0].d, F[0].d * V[0].d)
  const a = q(P4.d, 4 * P4.n)
  const [h, k] = V
  const sq = (v, c) => c.n === 0 ? `${v}^2` : `(${v} ${c.n < 0 ? '+' : '-'} ${qLatex(q(Math.abs(c.n), c.d))})^2`
  const coef = a.n === 1 && a.d === 1 ? '' : a.n === -1 && a.d === 1 ? '-' : a.d === 1 ? String(a.n) : `${a.n < 0 ? '-' : ''}\\frac{${Math.abs(a.n)}}{${a.d}}`
  const tail = c => c.n === 0 ? '' : ` ${c.n < 0 ? '-' : '+'} ${qLatex(q(Math.abs(c.n), c.d))}`
  const eq = vertical ? `y = ${coef}${sq('x', h)}${tail(k)}` : `x = ${coef}${sq('y', k)}${tail(h)}`
  const opens = vertical ? (P4.n > 0 ? 'up' : 'down') : (P4.n > 0 ? 'right' : 'left')
  return { V, F, dir, vertical, p: P4, a, eq, opens }
}
