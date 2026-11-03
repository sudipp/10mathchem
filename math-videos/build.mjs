// Turns a video script into build/<id>/spec.json for make_video.py.
// Long-division layouts are computed with the math site's polynomial engine.
import { mkdirSync, writeFileSync } from 'node:fs'
import { P, analyze, coefAt, evalNum, isZero, longDivide, polyLatex, termLatex, mul, q, qLatex, synthetic } from '../math-self-learning/src/poly.js'

const id = process.argv[2]
if (!id) { console.error('usage: node build.mjs <unit>/<video-id>, e.g. unit-4/03-long-division'); process.exit(1) }
const spec = (await import(`./videos/${id}.mjs`)).default

function longDivCells(num, den, v = 'x') {
  const r = longDivide(P(num), P(den), v)
  const N = r.numer, D = r.denom, degN = N.length - 1, degD = D.length - 1
  const col = d => 2 + (degN - d)
  const t = (c, d, first) => termLatex(c, d, v, first)
  const cells = []
  const texLead = [`{\\color{#CC5833}${t(D[0], degD, true)}}`, ...D.slice(1).map((c, i) => isZero(c) ? null : t(c, degD - 1 - i, false))].filter(Boolean).join(' ')
  cells.push({ id: 'div', row: 2, col: 1, tex: polyLatex(D, v), texLead, cls: 'divisor', key: 'setup' })
  N.forEach((c, i) => { const d = degN - i; cells.push({ id: `n${d}`, row: 2, col: col(d), tex: t(c, d, i === 0), cls: `top${isZero(c) ? ' ph' : ''}`, key: 'setup' }) })
  r.cycles.forEach((cy, i) => {
    cells.push({ id: `q${i}`, row: 1, col: col(cy.k), tex: t(cy.c, cy.k, i === 0), cls: 'q', key: `c${i}-divide` })
    const pRow = 3 + 2 * i, aRow = 4 + 2 * i
    for (let d = cy.degR; d >= cy.degR - degD; d--) {
      const c = coefAt(cy.product, d)
      cells.push({ id: `p${i}-${d}`, row: pRow, col: col(d), tex: t(c, d, d === cy.degR), tex2: t(mul(c, q(-1)), d, false), cls: 'prod', key: `c${i}-multiply`, key2: `c${i}-flip` })
    }
    let started = false
    for (let d = cy.degR - 1; d >= cy.low; d--) {
      const c = coefAt(cy.after, d)
      if (!started && isZero(c) && d !== cy.low) continue
      cells.push({ id: `a${i}-${d}`, row: aRow, col: col(d), tex: t(c, d, !started), cls: d >= cy.degR - degD ? 'after' : 'after brought', key: d >= cy.degR - degD ? `c${i}-subtract` : `c${i}-bring` })
      started = true
    }
  })
  return { cells, cols: degN + 2, rows: 2 + 2 * r.cycles.length, problem: `(${polyLatex(N, v)}) \\div (${polyLatex(D, v)})`, answer: r.answer }
}

// Synthetic division table: row 1 = k and coefficients, row 2 = products, row 3 = results.
function syntheticCells(num, k, v = 'x') {
  const r = synthetic(num, k, v)
  const n = r.coeffs.length
  const cells = [{ id: 'k', row: 1, col: 1, tex: qLatex(r.k), cls: 'k', key: 'k' }]
  r.coeffs.forEach((c, i) => cells.push({ id: `c${i}`, row: 1, col: i + 2, tex: qLatex(c), cls: `coef${isZero(c) ? ' ph' : ''}`, key: 'coef' }))
  for (let i = 0; i < n; i++) {
    if (i > 0) cells.push({ id: `m${i}`, row: 2, col: i + 2, tex: qLatex(r.products[i]), cls: 'sprod', key: `m${i}` })
    cells.push({ id: `r${i}`, row: 3, col: i + 2, tex: qLatex(r.results[i]), cls: `res${i === n - 1 ? ' rem' : ''}`, key: i === 0 ? 'down' : `a${i}` })
  }
  const divisor = polyLatex(r.divisor, v)
  return { cells, cols: n + 1, rows: 3, problem: `(${polyLatex(P(num), v)}) \\div (${divisor})`, answer: r.answer }
}

// Curve samples in data coordinates, plus numerically found zeros and extrema.
function graphData(num, win = [-8, 8, -8, 8]) {
  const p = P(num), [x0, x1, y0, y1] = win, pad = (y1 - y0) * 0.6
  const pts = []
  for (let i = 0; i <= 700; i++) {
    const x = x0 + (x1 - x0) * i / 700
    pts.push([+x.toFixed(4), +Math.max(y0 - pad, Math.min(y1 + pad, evalNum(p, x))).toFixed(4)])
  }
  const { zeros, extrema } = analyze(p)
  return { type: 'graph', win, pts, zeros: zeros.map(z => +z.toFixed(4)), extrema: extrema.map(e => ({ ...e, x: +e.x.toFixed(4), y: +e.y.toFixed(4) })), tex: polyLatex(p) }
}

const layouts = {}
for (const [name, l] of Object.entries(spec.layouts ?? {})) {
  if (l.type === 'longdiv') layouts[name] = { type: 'longdiv', ...longDivCells(l.num, l.den) }
  if (l.type === 'synth') layouts[name] = { type: 'synth', ...syntheticCells(l.num, l.k) }
  if (l.type === 'graph') layouts[name] = graphData(l.num, l.window)
}
const out = new URL(`./build/${id}/`, import.meta.url)
mkdirSync(out, { recursive: true })
writeFileSync(new URL('spec.json', out), JSON.stringify({ ...spec, layouts }, null, 1))
console.log(`Wrote build/${id}/spec.json: ${spec.scenes.length} scenes`)
for (const [name, l] of Object.entries(layouts)) console.log(`  ${name}: ${l.type === 'graph' ? `y = ${l.tex}, zeros ${l.zeros.join(', ')}` : `${l.problem} = ${l.answer}`}`)
