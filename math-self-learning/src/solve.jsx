import { Graph, LongDivisionView, SyntheticView } from './Visuals.jsx'
import { P, analyze, endBehavior, evaluate, fromFactors, fromZeros, isZeroPoly, longDivide, polyLatex, polyMul, q, qLatex, synthetic, tenth, testPoints } from './poly.js'
import { buildFromRoots, candidatesLatex, conjugate, isPaired, rationalRoots, rootKind, rootLatex, zerosLatex } from './roots.js'
import { classify, degreeName, funcOp, product, resultLatex, termsName, writtenLatex } from './funcs.js'

const R = String.raw
const factorLatex = ([a, b, m = 1], v = 'x') => {
  const base = b === 0 && a === 1 ? v : `(${polyLatex(P([a, b]), v)})`
  return m > 1 ? `${base}^{${m}}` : base
}
const zeroLatex = ([n, d = 1, m = 1]) => `${qLatex(q(n, d))}${m > 1 ? R`\text{ mult. }${m}` : ''}`
const divisorFor = k => polyLatex(P([1, -k]))
const linearK = den => den.length === 2 && den[0].n === 1 && den[0].d === 1 ? q(-den[1].n, den[1].d) : null

function longSolution(num, den, extra = []) {
  const r = longDivide(P(num), P(den))
  const steps = [
    R`**Set up.** Write the dividend in standard form${r.numer.some(c => c.n === 0) ? ' with **0 placeholders** for missing powers' : ''}, and the divisor outside.`,
    ...r.cycles.flatMap(c => c.explain),
    R`**Fraction form:** quotient + $\dfrac{\text{remainder}}{\text{divisor}}$ = $${r.answer}$.`,
    ...extra.map(f => f(r)),
  ]
  return { r, steps, visual: n => <LongDivisionView r={r} shown={Math.min(n - 1, r.cycles.length * 3)} /> }
}
function synthSolution(num, k, extra = []) {
  const r = synthetic(num, k)
  const steps = [
    R`**Set up.** The divisor is $${polyLatex(r.divisor)}$, so $k = ${qLatex(r.k)}$. Write the coefficients${num.some(c => c === 0) ? ' with **0 placeholders**' : ''}: $${r.coeffs.map(c => qLatex(c)).join(',\\ ')}$.`,
    ...r.steps,
    ...extra.map(f => f(r)),
  ]
  return { r, steps, visual: n => <SyntheticView r={r} shown={Math.min(n - 1, 2 * r.coeffs.length - 1)} /> }
}

export function solve(p) {
  const pre = p.label ? `${p.label}:\\ ` : ''
  if (p.type === 'long') {
    const s = longSolution(p.num, p.den)
    if (p.note) s.steps.unshift(p.note)
    const offset = p.note ? 1 : 0
    return { prompt: `${pre}(${polyLatex(P(p.num))}) \\div (${polyLatex(P(p.den))})`, steps: s.steps, visual: n => s.visual(n - offset), answer: s.r.answer }
  }
  if (p.type === 'synth') {
    const s = synthSolution(p.num, p.k, [r => R`**Read the answer.** The bottom row gives the quotient (one degree lower) and the remainder: $${r.answer}$.`])
    if (p.note) s.steps.unshift(p.note)
    const offset = p.note ? 1 : 0
    return { prompt: `${pre}(${polyLatex(P(p.num))}) \\div (${divisorFor(p.k)})`, steps: s.steps, visual: n => s.visual(n - offset), answer: s.r.answer }
  }
  if (p.type === 'eval') {
    const s = synthSolution(p.num, p.k, [r => R`**Remainder Theorem:** the remainder is $f(${qLatex(r.k)})$, so $f(${qLatex(r.k)}) = ${qLatex(r.remainder[0])}$. (Check by substituting: $f(${qLatex(r.k)}) = ${qLatex(evaluate(P(p.num), p.k))}$ ✓)`])
    return { prompt: `${pre}f(x) = ${polyLatex(P(p.num))},\\ k = ${p.k}`, steps: s.steps, visual: s.visual, answer: `f(${p.k}) = ${qLatex(s.r.remainder[0])}` }
  }
  if (p.type === 'factor') {
    const den = P(p.den)
    const k = p.method === 'long' ? null : linearK(den)
    const conclude = r => {
      const zero = isZeroPoly(r.remainder)
      return zero ? R`The remainder is $0$, so **yes**, $d(x) = ${polyLatex(den)}$ is a factor of $f(x)$.` : R`The remainder is $${polyLatex(r.remainder)}$, not $0$, so **no**, $d(x)$ is not a factor.`
    }
    const s = k ? synthSolution(p.num, k, [conclude]) : longSolution(p.num, p.den, [conclude])
    const why = k ? R`$d(x)$ is linear ($x - k$ with $k = ${qLatex(k)}$), so use **synthetic division**. A factor leaves remainder $0$.` : R`Divide $f(x)$ by $d(x)$${den[0].n !== 1 ? ' (the leading coefficient is not 1, so use **long division**)' : ''}. A factor leaves remainder $0$.`
    return { prompt: `${pre}f(x) = ${polyLatex(P(p.num))},\\ d(x) = ${polyLatex(den)}`, steps: [why, ...s.steps], visual: n => s.visual(n - 1), answer: isZeroPoly(s.r.remainder) ? R`\text{Yes}` : R`\text{No}` }
  }
  if (p.type === 'zeros') {
    const poly = p.factors.reduce((acc, [a, b, m = 1]) => { for (let i = 0; i < m; i++) acc = polyMul(acc, P([a, b])); return acc }, P([1]))
    const zeros = p.factors.map(([a, b, m = 1]) => { const z = q(-b, a); return [z.n, z.d, m] })
    const steps = [
      R`It is already in **factored form**. Use the **Zero Product Property**: set each factor equal to $0$.`,
      ...p.factors.map(([a, b, m = 1], i) => {
        const z = zeros[i]
        const eq = b === 0 && a === 1 ? 'x = 0' : `${polyLatex(P([a, b]))} = 0 \\Rightarrow x = ${qLatex(q(z[0], z[1]))}`
        return `$${eq}$${m > 1 ? ` — the factor is squared, so this zero has **multiplicity ${m}** (the graph touches the x-axis and bounces back).` : ''}`
      }),
      R`**Check with a graph:** the curve meets the x-axis at each zero.`,
    ]
    return { prompt: `${pre}f(x) = ${p.factors.map(f => factorLatex(f)).join('')}`, steps, visual: n => n >= steps.length ? <Graph poly={poly} show={{ zeros: true, extrema: false }} /> : null, answer: `\\left\\{${zeros.map(zeroLatex).join(',\\ ')}\\right\\}` }
  }
  if (p.type === 'fromZeros') {
    const { poly } = fromZeros(p.zeros)
    const facs = p.zeros.map(([n, d = 1, m = 1]) => { const z = q(n, d); return [z.d, -z.n, m] })
    const facLatex = facs.map(f => factorLatex(f)).join('')
    let running = P([1])
    const products = []
    facs.forEach(([a, b, m]) => { for (let i = 0; i < m; i++) { running = polyMul(running, P([a, b])); products.push(polyLatex(running)) } })
    const steps = [
      R`**Write a factor for each zero.** Zero $r$ gives $(x - r)$. A fraction zero $\tfrac{p}{q}$ gives $(qx - p)$ so the coefficients stay integers. Repeat a factor for each multiplicity.`,
      R`$f(x) = ${facLatex}$`,
      R`**Multiply** the factors one at a time: $${products.slice(1).length ? products.slice(1).join(R`\ \to\ `) : products[0]}$.`,
    ]
    return { prompt: `${pre}\\text{Zeros: } ${p.zeros.map(zeroLatex).join(',\\ ')}`, steps, answer: `f(x) = ${polyLatex(poly)}` }
  }
  if (p.type === 'graph' && p.zerosOnly) {
    const poly = P(p.num)
    const { zeros } = analyze(poly)
    const zs = zeros.map(tenth)
    const steps = [
      R`**Graph it:** on a TI-84 press Y=, type the function, then GRAPH (or use the picture here).`,
      zs.length
        ? R`**Find each zero:** 2nd → CALC → 2: zero. Move left of a crossing and press ENTER (left bound), move right of it and press ENTER (right bound), then ENTER to guess. Repeat for each crossing.`
        : R`**Look for crossings:** the graph never touches the x-axis, so there is nothing to find with 2nd → CALC → zero.`,
      zs.length ? R`**Real zeros** to the nearest tenth: $${zs.join(',\\ ')}$.` : R`**No real zeros.** All ${poly.length - 1} roots are complex, so none appear on the graph.`,
    ]
    return {
      prompt: `${pre}f(x) = ${polyLatex(poly)}`, steps,
      visual: n => n >= 1 ? <Graph poly={poly} window={p.window} show={{ zeros: n >= 3, extrema: false }} /> : null,
      answer: zs.length ? R`\text{Real zeros} \approx ${zs.join(',\\ ')}` : R`\text{No real zeros}`,
    }
  }
  if (p.type === 'graph') {
    const poly = P(p.num)
    const { zeros, extrema } = analyze(poly)
    const list = arr => arr.length ? arr.map(e => `(${tenth(e.x)},\\ ${tenth(e.y)})`).join(',\\ ') : R`\text{none}`
    const mins = extrema.filter(e => e.type === 'min'), maxs = extrema.filter(e => e.type === 'max')
    const steps = [
      ...(p.factorsNote ? [p.factorsNote] : []),
      R`**Graph it** (on your calculator: Y= then GRAPH, or use the picture here).`,
      R`**Real zeros** (where the curve meets the x-axis), to the nearest tenth: $${zeros.map(tenth).join(',\\ ')}$.`,
      R`**Relative maxima** (hilltops): $${list(maxs)}$. **Relative minima** (valleys): $${list(mins)}$. On a TI-84 use 2nd → CALC → maximum / minimum.`,
    ]
    const o = p.factorsNote ? 1 : 0
    return {
      prompt: p.title ?? `${pre}f(x) = ${polyLatex(poly)}`, steps,
      visual: n => n - o >= 1 ? <Graph poly={poly} window={p.window} show={{ zeros: n - o >= 2, extrema: n - o >= 3 }} /> : null,
      answer: R`\text{Zeros} \approx ${zeros.map(tenth).join(',\\ ')};\ \text{max } ${list(maxs)};\ \text{min } ${list(mins)}`,
    }
  }
  if (p.type === 'ends') return endsSolution(P(p.std), pre)
  if (p.type === 'analyze') return analyzeSolution(p, pre)
  if (p.type === 'rrt') return rrtSolution(p, pre)
  if (p.type === 'conj') return conjSolution(p, pre)
  if (p.type === 'build') return buildSolution(p, pre)
  if (p.type === 'classify') return classifySolution(p, pre)
  if (p.type === 'product') return productSolution(p, pre)
  if (p.type === 'funcop') return funcOpSolution(p, pre)
  return { prompt: p.prompt, steps: p.steps, answer: p.answer }
}

function classifySolution(p, pre) {
  const v = p.v ?? 'x'
  const c = classify(p.terms)
  const std = polyLatex(c.poly, v)
  const steps = [
    ...(c.combined ? [R`**Combine like terms** first (terms with the same exponent).`] : []),
    R`**Standard form:** order the terms from the highest exponent to the lowest: $${std}$.`,
    R`**By degree:** the highest exponent is $${c.degree}$, so it is **${degreeName(c.degree)}**.`,
    R`**By number of terms:** it has ${c.count} term${c.count > 1 ? 's' : ''}, so it is a **${termsName(c.count)}**.`,
  ]
  return { prompt: `${pre}${writtenLatex(p.terms, v)}`, steps, answer: R`${std};\ \text{${c.name}}` }
}

function productSolution(p, pre) {
  const v = p.v ?? 'x'
  const { poly, stages } = product(p.factors)
  const f = arr => `(${polyLatex(P(arr), v)})`
  const steps = stages.map((s, i) => i === 0
    ? R`**Multiply the first two** (every term by every term, then combine like terms): $${f(p.factors[0])}${f(p.factors[1])} = ${polyLatex(s.result, v)}$.`
    : R`**Multiply by the next factor:** $(${polyLatex(s.left, v)})${f(p.factors[i + 1])} = ${polyLatex(s.result, v)}$.`)
  steps.push(R`**Standard form:** $${polyLatex(poly, v)}$.`)
  if (p.keyNote) steps.push(p.keyNote)
  return { prompt: `${pre}${p.factors.map(f).join('')}`, steps, answer: polyLatex(poly, v) }
}

function funcOpSolution(p, pre) {
  const out = p.out ?? p.v
  const { result, steps } = funcOp(p)
  const defs = Object.entries(p.fns).map(([k, c]) => `${k}(${p.v}) = ${polyLatex(P(c), p.v)}`).join(',\\ ')
  const answer = resultLatex(result, out) + (p.domain ? R`;\ \text{domain: all real numbers}` : '')
  return {
    prompt: `${pre}${defs};\\ \\text{find } ${p.find}`,
    steps: [...steps, ...(p.notes ?? [])], answer,
  }
}

const pmList = ns => ns.map(n => `\\pm ${n}`).join(',\\ ')
const linFactor = x => polyLatex([q(x.d), q(-x.n)])
const xPow = k => k === 1 ? 'x' : `x^{${k}}`

function rrtSolution(p, pre) {
  const r = rationalRoots(p.std, { given: p.given })
  const fx = p.eq ? `${polyLatex(r.poly)} = 0` : `f(x) = ${polyLatex(r.poly)}`
  const givenQ = p.given != null ? q(...(Array.isArray(p.given) ? p.given : [p.given, 1])) : null
  const prompt = `${pre}${fx}${givenQ ? `;\\ \\text{one zero is } ${qLatex(givenQ)}` : ''}`
  const possible = candidatesLatex(r.cand.list, r.k0 > 0)
  const items = possible.split(',\\ ')
  const rows = []
  for (let i = 0; i < items.length; i += 8) rows.push(items.slice(i, i + 8).join(',\\ '))
  const steps = [], visuals = {}
  if (r.k0) steps.push(R`**GCF first:** every term has $${xPow(r.k0)}$, so $${p.eq ? '' : 'f(x) = '}${xPow(r.k0)}(${polyLatex(r.work)})$. That makes $0$ a zero. Use $${polyLatex(r.work)}$ for the theorem.`)
  steps.push(R`**p** = factors of the constant $${qLatex(r.work[r.work.length - 1])}$: $${pmList(r.cand.ps)}$. **q** = factors of the leading coefficient $${qLatex(r.work[0])}$: $${pmList(r.cand.qs)}$.`)
  steps.push(R`**Possible rational ${p.eq ? 'roots' : 'zeros'}** $\tfrac{p}{q}$ (each $p$ over each $q$, skipping repeats): ${items.map(s => `$${s}$`).join(', ')}.`)
  if (!p.find) return { prompt, steps, answer: rows.length > 1 ? R`\begin{array}{l} ${rows.join(R`, \\ `)} \end{array}` : possible }
  r.rounds.forEach((round, i) => {
    const name = i === 0 && !r.k0 ? 'f' : 'g'
    const g = R`$${name}(x) = ${polyLatex(round.poly)}$`
    if (round.given) {
      steps.push(R`**Use the given zero** $x = ${qLatex(round.found)}$: divide by $(${linFactor(round.found)})$ with **synthetic division**. The remainder is $0$ ✓ and the quotient is $${polyLatex(round.syn.quotient)}$.`)
    } else {
      const tests = round.tried.map(t => `$${name}(${qLatex(t.x)}) = ${qLatex(t.val)}$${t.val.n === 0 ? ' ✓' : ''}`).join(', ')
      const prev = r.rounds[i - 1]?.found
      const again = prev && round.tried.length && round.tried[0].x.n === prev.n && round.tried[0].x.d === prev.d ? R`Zeros can repeat, so try $${qLatex(prev)}$ again first. ` : ''
      if (!round.found) {
        steps.push(R`${again}**Test every candidate** in ${g}: ${tests}. None of them gives $0$, so there are **no ${r.zeros.length ? 'more ' : ''}rational ${p.eq ? 'roots' : 'zeros'}**.`)
        return
      }
      steps.push(R`${again}**Test candidates** in ${g}: ${tests}. So $x = ${qLatex(round.found)}$ is a zero. Divide by $(${linFactor(round.found)})$ with **synthetic division**: the quotient is $${polyLatex(round.syn.quotient)}$.`)
    }
    visuals[steps.length] = <SyntheticView r={round.syn} shown={99} />
  })
  const Q = r.quad
  if (Q) {
    const simplify = polyLatex(Q.from) !== polyLatex(Q.poly) ? R`Divide out the common factor: $${polyLatex(Q.poly)} = 0$. ` : ''
    if (Q.rational) {
      const [r1, r2 = r1] = Q.roots
      const fac = `(${linFactor(r1)})(${linFactor(r2)})`
      steps.push(R`The quotient $${polyLatex(Q.from)}$ is **quadratic**. ${simplify}Factor it: $${polyLatex(Q.poly)} = ${fac}$, so $x = ${Q.roots.map(qLatex).join(',\\ ')}$${Q.double ? ' (twice)' : ''}.`)
    } else {
      const kind = Q.imag ? 'complex' : 'irrational'
      steps.push(R`The quotient $${polyLatex(Q.from)}$ is **quadratic** and doesn’t factor. ${simplify}Use the **quadratic formula**: $${Q.formula}$. ${p.all ? `These are the two ${kind} roots (a conjugate pair).` : `These are ${kind}, so they are **not rational**.`}`)
    }
  } else if (r.linear) {
    steps.push(R`What is left is linear: $${polyLatex(r.linear.from)} = 0 \Rightarrow x = ${qLatex(r.linear.x)}$.`)
  }
  const zs = r.zeros.length ? zerosLatex(r.zeros) : null
  const extra = p.all && Q && !Q.rational ? Q.latex : null
  if (p.all) {
    const all = [zs, extra].filter(Boolean).join(',\\ ')
    steps.push(R`**All roots:** $x = ${all}$.`)
    return { prompt, steps, visual: n => visuals[n] ?? null, answer: `x = ${all}` }
  }
  steps.push(zs ? R`**Rational ${p.eq ? 'roots' : 'zeros'}:** $\left\{${zs}\right\}$.` : R`**Rational ${p.eq ? 'roots' : 'zeros'}:** none.`)
  return {
    prompt, steps, visual: n => visuals[n] ?? null,
    answer: R`\begin{array}{l} \text{Possible: } ${rows.join(R`, \\ \qquad\quad `)} \\ \text{Rational ${p.eq ? 'roots' : 'zeros'}: } ${zs ? R`\left\{${zs}\right\}` : R`\text{none}`} \end{array}`,
  }
}

const KIND_TEXT = {
  complex: ['complex', R`a + bi`, 'Complex Root Theorem'],
  irrational: ['irrational', R`a + \sqrt{b}`, 'Irrational Root Theorem'],
}
function partnerStep(r) {
  const kind = rootKind(r)
  if (kind === 'rational') return R`$${rootLatex(r)}$ is **rational**, so it has no partner.`
  const [word, form, theorem] = KIND_TEXT[kind]
  return R`$${rootLatex(r)}$ is **${word}** (form $${form}$). By the ${theorem}, its conjugate $${rootLatex(conjugate(r))}$ is also a root.`
}

function conjSolution(p, pre) {
  const steps = [...p.roots.map(partnerStep), R`**Flip the sign** of only the $\sqrt{\ }$ or $i$ part. The real part $a$ stays the same.`]
  return {
    prompt: `${pre}\\text{Given roots: } ${p.roots.map(rootLatex).join(',\\ ')}`,
    steps, answer: p.roots.filter(isPaired).map(r => rootLatex(conjugate(r))).join(',\\ '),
  }
}

function buildSolution(p, pre) {
  const { factors, poly } = buildFromRoots(p.roots)
  const all = p.roots.flatMap(r => isPaired(r) ? [r, conjugate(r)] : [r])
  const steps = [
    R`**List every root.** ${p.roots.map(partnerStep).join(' ')} That makes ${all.length} roots: $${all.map(rootLatex).join(',\\ ')}$, so the degree is ${all.length}.`,
    ...factors.map(f => f.pair
      ? R`**Multiply the conjugate pair first** (the $\sqrt{\ }$ or $i$ disappears): $${f.latex}$.`
      : R`$x = ${rootLatex(f.root)}$ gives the factor $(${f.latex})$${f.poly[0].n !== 1 ? ', so the coefficients stay integers' : ''}.`),
  ]
  const parts = factors.map(f => `(${polyLatex(f.poly)})`)
  if (factors.length > 1) steps.push(R`**Multiply everything:** $${parts.join('')} = ${polyLatex(poly)}$.`)
  steps.push(R`**Answer:** $${polyLatex(poly)} = 0$. Every coefficient is an integer ✓.`)
  return {
    prompt: `${pre}\\text{Roots: } ${p.roots.map(rootLatex).join(',\\ ')}${p.degree ? `\\ (\\text{degree } ${p.degree})` : ''}`,
    steps, answer: `${polyLatex(poly)} = 0`,
  }
}

const arrow = s => s > 0 ? R`+\infty` : R`-\infty`
const endsLatex = ([l, r]) => R`x \to -\infty:\ f(x) \to ${arrow(l)};\quad x \to +\infty:\ f(x) \to ${arrow(r)}`
const sketch = ([l, r]) => ({ '1,1': 'up on both ends', '-1,-1': 'down on both ends', '-1,1': 'down on the left, up on the right', '1,-1': 'up on the left, down on the right' })[`${l},${r}`]

function endsSteps(poly) {
  const n = poly.length - 1, a = poly[0], ends = endBehavior(poly)
  return [
    R`**Degree** $${n}$ (${n % 2 === 0 ? 'even' : 'odd'}). **Leading coefficient** $${qLatex(a)}$ (${a.n > 0 ? 'positive' : 'negative'}).`,
    R`**End behavior** (${n % 2 === 0 ? 'even' : 'odd'} degree, ${a.n > 0 ? 'positive' : 'negative'} leading coefficient → ${sketch(ends)}): $${endsLatex(ends)}$.`,
  ]
}

function endsSolution(poly, pre) {
  return { prompt: `${pre}f(x) = ${polyLatex(poly)}`, steps: endsSteps(poly), answer: endsLatex(endBehavior(poly)) }
}

function factoredLatex(c, factors) {
  const C = q(...(Array.isArray(c) ? c : [c, 1]))
  const lead = C.d === 1 ? (C.n === 1 ? '' : C.n === -1 ? '-' : String(C.n)) : `${C.n < 0 ? '-' : ''}\\tfrac{${Math.abs(C.n)}}{${C.d}}`
  return lead + factors.map(([a, b, m = 1]) => {
    const B = q(...(Array.isArray(b) ? b : [b, 1]))
    const inner = B.n === 0 ? (a === 1 ? 'x' : `${a}x`) : `(${a === 1 ? '' : a}x ${B.n < 0 ? '-' : '+'} ${B.d === 1 ? Math.abs(B.n) : `\\tfrac{${Math.abs(B.n)}}{${B.d}}`})`
    return m > 1 ? (B.n === 0 && a === 1 ? `x^{${m}}` : `${inner}^{${m}}`) : inner
  }).join('')
}

function analyzeSolution(p, pre) {
  const { poly, zeros } = fromFactors(p.c, p.factors)
  const ends = endBehavior(poly)
  const fx = factoredLatex(p.c, p.factors)
  const yInt = evaluate(poly, 0)
  const distinct = zeros.filter((z, i) => zeros.findIndex(w => w.x.n === z.x.n && w.x.d === z.x.d) === i)
  const pts = testPoints(distinct)
  const vals = pts.map(x => evaluate(poly, x))
  const strut = R`\rule[-12pt]{0pt}{30pt}`
  const table = R`\begin{array}{c|${'c'.repeat(pts.length)}} ${strut} x & ${pts.map(x => `\\displaystyle ${qLatex(x)}`).join(' & ')} \\ \hline ${strut} f(x) & ${vals.map(v => `\\displaystyle ${qLatex(v)}`).join(' & ')} \end{array}`
  const zeroText = distinct.map(z => R`$x = ${qLatex(z.x)}$ (multiplicity ${z.m}, ${z.m % 2 === 0 ? '**touches and bounces**' : '**crosses**'})`).join('; ')
  const steps = [
    ...endsSteps(poly).map((s, i) => (i === 0 ? '**(a)** ' : '') + s),
    ...p.factorSteps.map((s, i) => (i === 0 ? '**(b)** ' : '') + s),
    R`**Factored form:** $f(x) = ${fx}$.`,
    R`**(c)** Set each factor equal to $0$. **x-intercepts:** $${distinct.map(z => `(${qLatex(z.x)},\\ 0)`).join(',\\ ')}$. **y-intercept:** $f(0) = ${qLatex(yInt)}$, so $(0,\ ${qLatex(yInt)})$.`,
    R`**(d)** ${zeroText}.`,
    R`**(e)** Test points **between and beyond** the x-intercepts: $${table}$`,
    R`**(f)** Plot the intercepts and points, then connect them: ${sketch(ends)}, bouncing or crossing at each zero as found in (d).`,
  ]
  const xs = [...pts, ...distinct.map(z => z.x)].map(v => v.n / v.d)
  const ys = [...vals.map(v => v.n / v.d), yInt.n / yInt.d, 0]
  const x0 = Math.min(...xs) - 0.5, x1 = Math.max(...xs) + 0.5
  const lo = Math.max(Math.min(...ys), -14), hi = Math.min(Math.max(...ys), 14), pad = Math.max(1, (hi - lo) * 0.15)
  const win = [Math.floor(x0), Math.ceil(x1), Math.floor(lo - pad), Math.ceil(hi + pad)]
  const synthStep = p.synth != null ? steps.findIndex(s => s.startsWith('**(b)**')) + 1 : -1
  return {
    prompt: `${pre}${p.prompt}`, steps,
    visual: n => n >= steps.length ? <Graph poly={poly} window={win} show={{ zeros: true, extrema: false }} />
      : synthStep > 0 && n >= synthStep && n < synthStep + 3 ? <SyntheticView r={synthetic(p.std, p.synth)} shown={99} /> : null,
    answer: R`\begin{array}{l} ${endsLatex(ends)} \\ x\text{-intercepts: } ${distinct.map(z => `{${qLatex(z.x)}}` + (z.m % 2 === 0 ? R`\,(\text{bounce})` : '')).join(',\\ ')};\quad y\text{-intercept: } {${qLatex(yInt)}} \end{array}`,
  }
}
