// Verifies engine-solved homework against the answer keys, and exports the
// hand-solved checks to JSON for scripts/verify_sympy.py.
import { writeFileSync } from 'node:fs'
import { HOMEWORK } from '../src/units/unit-4/homework.js'
import { HOMEWORK as HOMEWORK3 } from '../src/units/unit-3/homework.js'
import { HOMEWORK as HOMEWORK5 } from '../src/units/unit-5/homework.js'
import { HOMEWORK as HOMEWORK0 } from '../src/units/unit-0/homework.js'
import { HOMEWORK as HOMEWORK1 } from '../src/units/unit-1/homework.js'
import { HOMEWORK as HOMEWORK2 } from '../src/units/unit-2/homework.js'
import { P, q, longDivide, synthetic, evaluate, fromZeros, analyze, tenth, isZeroPoly, eqQ, trim, polyLatex, endBehavior, fromFactors, degree, num } from '../src/poly.js'
import { rationalRoots, buildFromRoots, conjugate, isPaired, qSympy, rootSympy, candidates } from '../src/roots.js'
import { inequality, parabola } from '../src/extra.js'
import { classify, product, funcOp, polySympy, exprSympy, resultSympy } from '../src/funcs.js'
import { classify as classifyConic, features as conicFeatures, fromGeneral, makeConic, stdSympy, stdValue, surdNum, toQ } from '../src/conics.js'

const sympyPoly = p => p.map((c, i) => `(${qSympy(c)})*x**${p.length - 1 - i}`).join(' + ')

let pass = 0, fail = 0
const checks = []
const same = (a, b) => trim(a).length === trim(b).length && trim(a).every((x, i) => eqQ(x, trim(b)[i]))
const report = (ok, label, detail = '') => { if (ok) pass++; else { fail++; console.log('FAIL', label, detail) } }

// ---------- conic checks ----------
const toN = v => Array.isArray(v) ? v[0] / v[1] : v
const close = (a, b, tol = 1e-9) => Math.abs(a - b) <= tol * Math.max(1, Math.abs(a), Math.abs(b))
const samePts = (got, exp) => got.length === exp.length && exp.every(e => got.some(g => close(g[0], toN(e[0])) && close(g[1], toN(e[1]))))
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1])
// Points on the curve from its parametrization.
function samples(c, f) {
  const [h, k] = [num(c.h), num(c.k)], out = []
  for (let i = 0; i < 12; i++) {
    const t = -2.5 + i * 0.45, th = i * Math.PI / 6 + 0.3
    if (c.kind === 'circle') { const r = surdNum(f.r); out.push([h + r * Math.cos(th), k + r * Math.sin(th)]) }
    if (c.kind === 'ellipse') out.push([h + Math.sqrt(num(c.X2)) * Math.cos(th), k + Math.sqrt(num(c.Y2)) * Math.sin(th)])
    if (c.kind === 'parabola') out.push(c.vertical ? [h + t, num(c.a) * t * t + k] : [num(c.a) * t * t + h, k + t])
    if (c.kind === 'hyperbola') { const [a, b, s] = [surdNum(f.a), surdNum(f.b), i % 2 ? 1 : -1]; out.push(c.vertical ? [h + b * Math.sinh(t), k + s * a * Math.cosh(t)] : [h + s * a * Math.cosh(t), k + b * Math.sinh(t)]) }
  }
  return out
}
function checkConic(c, e = {}) {
  const f = conicFeatures(c), bad = []
  const pts = samples(c, f)
  if (pts.some(([x, y]) => Math.abs(stdValue(c, x, y)) > 1e-9)) bad.push('samples off the curve')
  // The definition of each conic, tested on sample points.
  if (c.kind === 'circle' && pts.some(p => !close(dist(p, f.center.pt), surdNum(f.r)))) bad.push('radius definition')
  if (c.kind === 'parabola') {
    const d = p => f.directrix.y ? Math.abs(p[1] - num(f.directrix.y)) : Math.abs(p[0] - num(f.directrix.x))
    if (pts.some(p => !close(dist(p, f.focus.pt), d(p)))) bad.push('focus-directrix definition')
  }
  if (c.kind === 'ellipse' && pts.some(p => !close(dist(p, f.foci.pts[0]) + dist(p, f.foci.pts[1]), 2 * surdNum(f.a)))) bad.push('ellipse sum definition')
  if (c.kind === 'hyperbola') {
    if (pts.some(p => !close(Math.abs(dist(p, f.foci.pts[0]) - dist(p, f.foci.pts[1])), 2 * surdNum(f.a)))) bad.push('hyperbola difference definition')
    const far = c.vertical ? [num(c.h) + surdNum(f.b) * Math.sinh(12), num(c.k) + surdNum(f.a) * Math.cosh(12)] : [num(c.h) + surdNum(f.a) * Math.cosh(12), num(c.k) + surdNum(f.b) * Math.sinh(12)]
    if (!close((far[1] - num(c.k)) / (far[0] - num(c.h)), surdNum(f.m), 1e-6)) bad.push('asymptote slope')
  }
  for (const key of ['vertices', 'coVertices']) if (f[key] && (c.kind === 'ellipse' || key === 'vertices') && f[key].pts.some(([x, y]) => Math.abs(stdValue(c, x, y)) > 1e-9)) bad.push(`${key} off the curve`)
  // Answer-key values.
  if (e.center && !samePts([f.center.pt], [e.center])) bad.push('center')
  if (e.r2 != null && !close(num(c.r2), toN(e.r2))) bad.push('r2')
  if (e.vertex && !samePts([f.vertex.pt], [e.vertex])) bad.push('vertex')
  if (e.focus && !samePts([f.focus.pt], [e.focus])) bad.push('focus')
  if (e.directrix) { const [axis, v] = Object.entries(e.directrix)[0]; if (!(f.directrix[axis] && close(num(f.directrix[axis]), toN(v)))) bad.push('directrix') }
  if (e.opens && f.opens !== e.opens) bad.push('opens')
  if (e.intercept != null && !close(num(f.intercept.y ?? f.intercept.x), toN(e.intercept))) bad.push('intercept')
  for (const key of ['vertices', 'coVertices', 'foci']) if (e[key] && !samePts(f[key].pts, e[key])) bad.push(key)
  if (e.asym) {
    const m = surdNum(f.m), [h, k] = [num(c.h), num(c.k)]
    if (!samePts([[m, k - m * h], [-m, k + m * h]], e.asym)) bad.push('asymptotes')
  }
  if (e.slope != null && !close(surdNum(f.m), e.slope)) bad.push('asymptote slope')
  if (e.passes) for (const [x, y] of e.passes) if (Math.abs(stdValue(c, toN(x), toN(y))) > 1e-9) bad.push(`passes (${x}, ${y})`)
  if (e.majorLength != null && !close(2 * surdNum(f.a), e.majorLength)) bad.push('major axis length')
  if (e.minorLength != null && !close(2 * surdNum(f.b), e.minorLength)) bad.push('minor axis length')
  return bad
}
const generalSympy = g => ['A', 'C', 'D', 'E', 'F'].map((key, i) => `(${qSympy(toQ(g[key] ?? 0))})*${['x**2', 'y**2', 'x', 'y', '1'][i]}`).join(' + ')

for (const [unitTag, list] of [['', HOMEWORK], ['u3 ', HOMEWORK3], ['u5 ', HOMEWORK5], ['u0 ', HOMEWORK0], ['u1 ', HOMEWORK1], ['u2 ', HOMEWORK2]]) for (const hw of list) {
  hw.sections.forEach((section, s) => section.problems.forEach((p, i) => {
    const label = `${unitTag}${hw.id} §${s + 1} #${i + 1} (${p.type})`
    if (p.choice) {
      // The marked letter must match the worked answer (graph pictures and inequalities are checked by hand / by the engine).
      const pick = p.choices.find(c => c[0] === p.choice)?.[1]
      const norm = x => String(x).replace(/[\s{}]/g, '').replace(/\\[dt]frac/g, '\\frac')
      const ENDS = { '1,1': 'A', '-1,1': 'B', '1,-1': 'C', '-1,-1': 'D' }
      let ok = pick != null
      if (p.type === 'steps' && !/Graph/.test(p.answer)) ok = ok && norm(p.answer) === norm(pick)
      if (p.type === 'eval') ok = ok && norm(pick) === String(p.exp)
      if (p.type === 'synth') ok = ok && p.exp.r === 0 && norm(pick) === norm(polyLatex(P(p.exp.q)))
      if (p.type === 'ends') ok = ok && ENDS[p.exp.join(',')] === p.choice
      report(ok, `${label} choice ${p.choice}`, pick)
    }
    if (p.type === 'fta') {
      const poly = P(p.std), n = degree(poly)
      const { list } = candidates(poly)
      report(JSON.stringify(list.map(v => [v.n, v.d])) === JSON.stringify(p.exp.possible.map(([a, b = 1]) => [a, b])), label, JSON.stringify({ n, list: list.map(v => `${v.n}/${v.d}`) }))
    } else if (p.type === 'parabola') {
      const r = parabola(p)
      const e = p.exp
      const ok = eqQ(r.a, q(...e.a)) && eqQ(r.V[0], q(r.vertical ? e.h : e.h)) && eqQ(r.V[1], q(e.k)) && r.vertical === e.vertical
      // Every point on the parabola is as far from the focus as from the directrix.
      let geo = true
      for (const t of [-3, -1, 0.5, 2, 4]) {
        const [h, k, a] = [num(r.V[0]), num(r.V[1]), num(r.a)], pp = num(r.p)
        const [x, y] = r.vertical ? [h + t, a * t * t + k] : [a * t * t + h, k + t]
        const df = Math.hypot(x - num(r.F[0]), y - num(r.F[1]))
        const dd = r.vertical ? Math.abs(y - (k - pp)) : Math.abs(x - (h - pp))
        if (Math.abs(df - dd) > 1e-9) geo = false
      }
      report(ok && geo, label, r.eq)
    } else if (p.type === 'ineq') {
      const s = inequality(p)
      checks.push({ label, expr: sympyPoly(s.poly), rel: p.rel, engineSet: s.sympySet, keySet: p.key })
    } else if (p.type === 'classify') {
      const c = classify(p.terms)
      report(same(c.poly, P(p.exp.poly)) && c.name === p.exp.name, label, `${polyLatex(c.poly)} ${c.name}`)
    } else if (p.type === 'product') {
      const r = product(p.factors)
      report(same(r.poly, P(p.exp)), label, polyLatex(r.poly))
      checks.push({ label, expr: p.factors.map(f => `(${sympyPoly(P(f))})`).join('*'), factored: sympyPoly(r.poly) })
    } else if (p.type === 'funcop') {
      const out = p.out ?? p.v
      const { result } = funcOp(p)
      checks.push({ label, funcs: Object.fromEntries(Object.entries(p.fns).map(([n, c]) => [n, polySympy(P(c), p.v)])), v: p.v, op: exprSympy(p.expr, out), engine: resultSympy(result, out), key: p.key })
    } else if (p.type === 'rrt') {
      const r = rationalRoots(p.std, { given: p.given })
      const possible = r.cand.list.map(v => [v.n, v.d])
      const exp = p.exp.possible?.map(([n, d = 1]) => [n, d])
      let ok = !exp || (JSON.stringify(possible) === JSON.stringify(exp) && (r.k0 > 0) === !!p.exp.zero)
      const zs = r.zeros.map(z => [z.x.n, z.x.d, z.m])
      const key = a => JSON.stringify([...a].sort())
      if (p.exp.zeros) ok = ok && key(zs) === key(p.exp.zeros.map(([n, d = 1, m = 1]) => [q(n, d).n, q(n, d).d, m]))
      report(ok, label, JSON.stringify({ possible, zs }))
      const roots = r.zeros.flatMap(z => Array(z.m).fill(qSympy(z.x)))
      if (p.all) checks.push({ label, expr: sympyPoly(r.poly), allRoots: [...roots, ...r.others.flatMap(o => o.sympy)], keyRoots: p.exp.roots })
      else if (p.find) checks.push({ label, expr: sympyPoly(r.poly), rationalRoots: [...new Set(roots)] })
      if (p.factoredExpr) checks.push({ label: `${label} factored`, expr: sympyPoly(r.poly), factored: p.factoredExpr })
    } else if (p.type === 'conj') {
      const got = p.roots.filter(isPaired).map(conjugate)
      report(JSON.stringify(got) === JSON.stringify(p.exp), label, JSON.stringify(got))
    } else if (p.type === 'build') {
      const { poly } = buildFromRoots(p.roots)
      report(same(poly, P(p.exp)) && (!p.degree || degree(poly) === p.degree), label, polyLatex(poly))
      const all = p.roots.flatMap(r => isPaired(r) ? [r, conjugate(r)] : [r])
      checks.push({ label, expr: sympyPoly(poly), buildRoots: all.map(rootSympy), lead: qSympy(poly[0]) })
    } else if (p.type === 'ends') {
      const e = endBehavior(P(p.std))
      report(e[0] === p.exp[0] && e[1] === p.exp[1], label, JSON.stringify(e))
    } else if (p.type === 'analyze') {
      const { poly, zeros } = fromFactors(p.c, p.factors)
      const distinct = zeros.map(z => [z.x.n, z.x.d, z.m])
      const multSum = zeros.reduce((a, z) => a + z.m, 0)
      const ok = (!p.std || same(poly, P(p.std)))
        && zeros.every(z => isZeroPoly([evaluate(poly, z.x)]))
        && multSum === degree(poly)
        && JSON.stringify(endBehavior(poly)) === JSON.stringify(p.exp.ends)
        && eqQ(evaluate(poly, 0), Array.isArray(p.exp.yInt) ? q(...p.exp.yInt) : q(p.exp.yInt))
        && JSON.stringify(distinct) === JSON.stringify(p.exp.zeros)
        && (p.synth == null || isZeroPoly([evaluate(P(p.std), p.synth)]))
      report(ok, label, JSON.stringify({ std: polyLatex(poly), zeros: distinct, ends: endBehavior(poly), y: evaluate(poly, 0) }))
    } else if (p.type === 'long') {
      const r = longDivide(P(p.num), P(p.den))
      report(same(r.quotient, P(p.exp.q)) && same(r.remainder, P(p.exp.r)), label, r.answer)
    } else if (p.type === 'synth') {
      const r = synthetic(p.num, p.k)
      report(same(r.quotient, P(p.exp.q)) && eqQ(r.remainder[0], q(p.exp.r)), label, r.answer)
    } else if (p.type === 'eval') {
      const r = synthetic(p.num, p.k)
      const direct = evaluate(P(p.num), p.k)
      report(eqQ(r.remainder[0], q(p.exp)) && eqQ(direct, q(p.exp)), label, `${r.remainder[0].n}`)
    } else if (p.type === 'factor') {
      const den = P(p.den)
      const r = p.method === 'long' || !(den.length === 2 && den[0].n === 1 && den[0].d === 1)
        ? longDivide(P(p.num), den) : synthetic(p.num, q(-den[1].n, den[1].d))
      report(isZeroPoly(r.remainder) === p.exp, label, polyLatex(r.remainder))
    } else if (p.type === 'fromZeros') {
      report(same(fromZeros(p.zeros).poly, P(p.exp)), label, polyLatex(fromZeros(p.zeros).poly))
    } else if (p.type === 'zeros') {
      const got = p.factors.map(([a, b, m = 1]) => { const z = q(-b, a); return [z.n, z.d, m] })
      const exp = p.exp.map(([n, d = 1, m = 1]) => { const z = q(n, d); return [z.n, z.d, m] })
      report(JSON.stringify(got) === JSON.stringify(exp), label, JSON.stringify(got))
    } else if (p.type === 'graph') {
      const a = analyze(P(p.num))
      if (!p.exp) return
      const zeros = a.zeros.map(tenth)
      let ok = JSON.stringify(zeros) === JSON.stringify(p.exp.zeros)
      const pts = t => a.extrema.filter(e => e.type === t).map(e => [tenth(e.x), tenth(e.y)])
      if (p.exp.min) ok = ok && JSON.stringify(pts('min')) === JSON.stringify(p.exp.min)
      if (p.exp.max) ok = ok && JSON.stringify(pts('max')) === JSON.stringify(p.exp.max)
      report(ok, label, JSON.stringify({ zeros, min: pts('min'), max: pts('max') }))
    } else if (p.type === 'conic') {
      const c = p.g ? fromGeneral(p.g).conic : makeConic(p.std)
      const bad = checkConic(c, p.exp)
      if (p.g) {
        const G = (x, y) => ['A', 'C', 'D', 'E', 'F'].reduce((acc, key, j) => acc + num(toQ(p.g[key] ?? 0)) * [x * x, y * y, x, y, 1][j], 0)
        if (samples(c, conicFeatures(c)).some(([x, y]) => Math.abs(G(x, y)) > 1e-7 * (1 + Math.abs(x * x) + Math.abs(y * y)))) bad.push('standard form does not match the general equation')
        checks.push({ label, conicGeneral: generalSympy(p.g), conicStd: stdSympy(c) })
      }
      report(!bad.length, label, bad.join(', '))
    } else if (p.type === 'conicEq') {
      const c = makeConic(p.conic)
      const bad = checkConic(c, p.facts)
      report(!bad.length, label, bad.join(', '))
      checks.push({ label, conicGeneral: p.key, conicStd: stdSympy(c) })
    } else if (p.type === 'conicType') {
      const g = Object.fromEntries(['A', 'C', 'D', 'E', 'F'].map(key => [key, toQ(p.g[key] ?? 0)]))
      report(classifyConic(g) === p.exp, label, classifyConic(g))
    } else if (p.check) {
      checks.push({ label, ...p.check })
    }
    // Engine facts (vertex, opens, shading, …) against the worksheet key.
    if (p.facts && p.exp) {
      const norm = v => Array.isArray(v) && v.length && v.every(Array.isArray) ? JSON.stringify([...v].map(x => JSON.stringify(x)).sort()) : JSON.stringify(v)
      const bad = Object.entries(p.exp).filter(([k, v]) => norm(p.facts[k]) !== norm(v))
      report(!bad.length, `${label} facts`, JSON.stringify(Object.fromEntries(bad.map(([k]) => [k, p.facts[k]]))))
    }
  }))
}
writeFileSync(new URL('./checks.json', import.meta.url), JSON.stringify(checks, null, 1))
console.log(`Engine checks: ${pass} passed, ${fail} failed. Exported ${checks.length} hand-solved checks.`)
process.exit(fail ? 1 : 0)
