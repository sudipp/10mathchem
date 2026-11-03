// Verifies engine-solved homework against the answer keys, and exports the
// hand-solved checks to JSON for scripts/verify_sympy.py.
import { writeFileSync } from 'node:fs'
import { HOMEWORK } from '../src/units/unit-4/homework.js'
import { P, q, longDivide, synthetic, evaluate, fromZeros, analyze, tenth, isZeroPoly, eqQ, trim, polyLatex, endBehavior, fromFactors, degree } from '../src/poly.js'

let pass = 0, fail = 0
const checks = []
const same = (a, b) => trim(a).length === trim(b).length && trim(a).every((x, i) => eqQ(x, trim(b)[i]))
const report = (ok, label, detail = '') => { if (ok) pass++; else { fail++; console.log('FAIL', label, detail) } }

for (const hw of HOMEWORK) {
  hw.sections.forEach((section, s) => section.problems.forEach((p, i) => {
    const label = `${hw.id} §${s + 1} #${i + 1} (${p.type})`
    if (p.type === 'ends') {
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
    } else if (p.check) {
      checks.push({ label, ...p.check })
    }
  }))
}
writeFileSync(new URL('./checks.json', import.meta.url), JSON.stringify(checks, null, 1))
console.log(`Engine checks: ${pass} passed, ${fail} failed. Exported ${checks.length} hand-solved checks.`)
process.exit(fail ? 1 : 0)
