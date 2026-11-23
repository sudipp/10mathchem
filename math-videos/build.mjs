// Turns a video script into build/<id>/spec.json for make_video.py.
// Long-division layouts are computed with the math site's polynomial engine.
import { mkdirSync, writeFileSync } from 'node:fs'
import { P, analyze, coefAt, evalNum, isZero, longDivide, polyLatex, termLatex, mul, num, q, qLatex, synthetic } from '../math-self-learning/src/poly.js'
import { features, makeConic, stdLatex, surdNum } from '../math-self-learning/src/conics.js'

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
function graphData(num, win = [-8, 8, -8, 8], extra = [], diag = false) {
  const p = P(num), [x0, x1, y0, y1] = win, pad = (y1 - y0) * 0.6
  const pts = []
  for (let i = 0; i <= 700; i++) {
    const x = x0 + (x1 - x0) * i / 700
    pts.push([+x.toFixed(4), +Math.max(y0 - pad, Math.min(y1 + pad, evalNum(p, x))).toFixed(4)])
  }
  const { zeros, extrema } = analyze(p)
  const curves = extra.map(({ fn, key }) => {
    const segs = [[]]
    for (let i = 0; i <= 700; i++) {
      const x = x0 + (x1 - x0) * i / 700, y = fn(x)
      if (!Number.isFinite(y) || y < y0 - pad || y > y1 + pad) { if (segs.at(-1).length) segs.push([]); continue }
      segs.at(-1).push([+x.toFixed(4), +y.toFixed(4)])
    }
    return { key, segs: segs.filter(s => s.length > 1) }
  })
  return { type: 'graph', win, pts, curves, diag, zeros: zeros.map(z => +z.toFixed(4)), extrema: extrema.map(e => ({ ...e, x: +e.x.toFixed(4), y: +e.y.toFixed(4) })), tex: polyLatex(p) }
}

// A conic in standard form: curve segments plus every key feature, in data coordinates.
function conicData(spec, win) {
  const c = makeConic(spec), f = features(c)
  const [h, k] = [num(c.h), num(c.k)]
  const r4 = v => +v.toFixed(4)
  const pt = p => p.map(r4)
  const pts = { center: pt(f.center?.pt ?? f.vertex.pt) }
  if (f.vertices) pts.vertices = f.vertices.pts.map(pt)
  if (f.coVertices) pts.coVertices = f.coVertices.pts.map(pt)
  if (f.foci) pts.foci = f.foci.pts.map(pt)
  if (f.focus) pts.focus = [pt(f.focus.pt)]
  if (c.kind === 'circle') pts.points = [...f.points[0].pts, ...f.points[1].pts].map(pt)
  if (!win) {
    const all = [[0, 0], pts.center, ...['vertices', 'coVertices', 'foci', 'focus', 'points'].flatMap(key => pts[key] ?? [])]
    if (c.kind === 'parabola') { const p = num(f.p), reach = Math.max(4, Math.abs(p) * 5); all.push(c.vertical ? [h + reach, k + num(c.a) * reach * reach] : [h + num(c.a) * reach * reach, k + reach]) }
    const xs = all.map(p => p[0]), ys = all.map(p => p[1])
    const half = Math.max(5, Math.ceil(Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys)) / 2 + 2))
    const cx = Math.round((Math.min(...xs) + Math.max(...xs)) / 2), cy = Math.round((Math.min(...ys) + Math.max(...ys)) / 2)
    win = [cx - half, cx + half, cy - half, cy + half]
  }
  const [x0, x1, y0, y1] = win, pad = (x1 - x0) * 0.3
  const inside = ([x, y]) => x > x0 - pad && x < x1 + pad && y > y0 - pad && y < y1 + pad
  const segs = []
  const trace = gen => { let seg = []; for (const p of gen) { if (inside(p)) seg.push(pt(p)); else if (seg.length) { segs.push(seg); seg = [] } } if (seg.length > 1) segs.push(seg) }
  const N = 720
  if (c.kind === 'circle' || c.kind === 'ellipse') {
    const rx = c.kind === 'circle' ? surdNum(f.r) : Math.sqrt(num(c.X2)), ry = c.kind === 'circle' ? rx : Math.sqrt(num(c.Y2))
    trace(Array.from({ length: N + 1 }, (_, i) => { const t = Math.PI / 2 + 2 * Math.PI * i / N; return [h + rx * Math.cos(t), k + ry * Math.sin(t)] }))
  } else if (c.kind === 'parabola') {
    const a = num(c.a), span = c.vertical ? [x0 - pad, x1 + pad] : [y0 - pad, y1 + pad]
    trace(Array.from({ length: N + 1 }, (_, i) => { const t = span[0] + (span[1] - span[0]) * i / N; return c.vertical ? [t, a * (t - h) ** 2 + k] : [a * (t - k) ** 2 + h, t] }))
  } else {
    const a = surdNum(f.a), b = surdNum(f.b), T = Math.acosh(Math.max(2, 3 * (x1 - x0) / Math.min(a, b)))
    for (const s of [1, -1]) trace(Array.from({ length: N + 1 }, (_, i) => { const t = -T + 2 * T * i / N; return c.vertical ? [h + b * Math.sinh(t), k + s * a * Math.cosh(t)] : [h + s * a * Math.cosh(t), k + b * Math.sinh(t)] }))
  }
  const lines = {}, L = 3 * (x1 - x0)
  if (c.kind === 'parabola') {
    lines.directrix = [f.directrix.y ? [[x0 - pad, num(f.directrix.y)], [x1 + pad, num(f.directrix.y)]] : [[num(f.directrix.x), y0 - pad], [num(f.directrix.x), y1 + pad]]]
    lines.axis = [c.vertical ? [[h, y0 - pad], [h, y1 + pad]] : [[x0 - pad, k], [x1 + pad, k]]]
  }
  let box = null
  if (c.kind === 'hyperbola') {
    const m = surdNum(f.m)
    lines.asymptotes = [[[h - L, k - m * L], [h + L, k + m * L]], [[h - L, k + m * L], [h + L, k - m * L]]]
    const [dx, dy] = c.vertical ? [surdNum(f.b), surdNum(f.a)] : [surdNum(f.a), surdNum(f.b)]
    box = [h - dx, k - dy, h + dx, k + dy].map(r4)
  }
  return { type: 'conic', kind: c.kind, win, segs, pts, lines, box, tex: stdLatex(c) }
}

const layouts = {}
for (const [name, l] of Object.entries(spec.layouts ?? {})) {
  if (l.type === 'longdiv') layouts[name] = { type: 'longdiv', ...longDivCells(l.num, l.den) }
  if (l.type === 'synth') layouts[name] = { type: 'synth', ...syntheticCells(l.num, l.k) }
  if (l.type === 'graph') layouts[name] = graphData(l.num, l.window, l.extra, l.diag)
  if (l.type === 'conic') layouts[name] = conicData(l.conic, l.window)
}
const out = new URL(`./build/${id}/`, import.meta.url)
mkdirSync(out, { recursive: true })
writeFileSync(new URL('spec.json', out), JSON.stringify({ ...spec, layouts }, null, 1))
console.log(`Wrote build/${id}/spec.json: ${spec.scenes.length} scenes`)
for (const [name, l] of Object.entries(layouts)) console.log(`  ${name}: ${l.type === 'conic' ? `${l.tex}, window ${l.win.join(' ')}` : l.type === 'graph' ? `y = ${l.tex}, zeros ${l.zeros.join(', ')}` : `${l.problem} = ${l.answer}`}`)
