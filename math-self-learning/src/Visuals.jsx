import { useId } from 'react'
import { TeX } from './TeX.jsx'
import { analyze, coefAt, evalNum, isZero, polyLatex, qLatex, termLatex, tenth } from './poly.js'

// Long division laid out in columns by degree. `shown` = sub-steps revealed
// (each cycle has 3: divide, multiply, subtract & bring down).
export function LongDivisionView({ r, shown }) {
  const { numer: N, denom: D, cycles, v } = r
  const degN = N.length - 1, degD = D.length - 1
  const col = d => 2 + (degN - d)
  const cells = []
  const put = (key, c, d, row, first, cls = '', isNew = false) => cells.push(
    <span key={key} className={`ld-cell ${cls} ${isNew ? 'new' : ''}`} style={{ gridColumn: col(d), gridRow: row }}>
      {c !== null && <TeX math={termLatex(c, d, v, first)} />}
    </span>)

  cycles.forEach((cy, i) => { if (shown >= 3 * i + 1) put(`q${i}`, cy.c, cy.k, 1, i === 0, 'ld-q', shown === 3 * i + 1) })
  cells.push(<span key="div" className="ld-divisor" style={{ gridColumn: 1, gridRow: 2 }}><TeX math={polyLatex(D, v)} /></span>)
  N.forEach((c, i) => put(`n${i}`, c, degN - i, 2, i === 0, `ld-top ${isZero(c) ? 'ld-ph' : ''}`))

  cycles.forEach((cy, i) => {
    const pRow = 3 + 2 * i, aRow = 4 + 2 * i
    if (shown >= 3 * i + 2) {
      cells.push(<span key={`m${i}`} className={`ld-minus ${shown === 3 * i + 2 ? 'new' : ''}`} style={{ gridColumn: 1, gridRow: pRow }} aria-label="subtract"><span className="ld-minus-word">subtract</span><span className="ld-minus-sym" aria-hidden="true">−</span></span>)
      for (let d = cy.degR; d >= cy.degR - degD; d--) put(`p${i}${d}`, coefAt(cy.product, d), d, pRow, d === cy.degR, 'ld-prod', shown === 3 * i + 2)
    }
    if (shown >= 3 * i + 3) {
      let started = false
      for (let d = cy.degR; d >= cy.low; d--) {
        const c = coefAt(cy.after, d)
        const visible = d < cy.degR && (started || !isZero(c) || d === cy.low)
        put(`a${i}${d}`, visible ? c : null, d, aRow, !started, 'ld-after', shown === 3 * i + 3)
        if (visible) started = true
      }
    }
  })
  return <div className="ld-scroll"><div className="ld" style={{ gridTemplateColumns: `auto repeat(${degN + 1}, auto)` }}>{cells}</div></div>
}

// Synthetic division. `shown` counts revealed steps: 1 = bring down, then
// multiply/add pairs.
export function SyntheticView({ r, shown }) {
  const n = r.coeffs.length
  const cells = [<span key="k" className="syn-k" style={{ gridColumn: 1, gridRow: 1 }}><TeX math={qLatex(r.k)} /></span>]
  r.coeffs.forEach((c, i) => cells.push(<span key={`c${i}`} className="syn-cell" style={{ gridColumn: i + 2, gridRow: 1 }}><TeX math={qLatex(c)} /></span>))
  for (let i = 0; i < n; i++) {
    if (i > 0) cells.push(<span key={`p${i}`} className={`syn-cell syn-prod ${shown === 2 * i ? 'new' : ''}`} style={{ gridColumn: i + 2, gridRow: 2 }}>{shown >= 2 * i && <TeX math={qLatex(r.products[i])} />}</span>)
    else cells.push(<span key="p0" className="syn-cell" style={{ gridColumn: 2, gridRow: 2 }} />)
    const last = i === n - 1
    cells.push(<span key={`r${i}`} className={`syn-cell syn-res ${last ? 'syn-rem' : ''} ${shown === 2 * i + 1 ? 'new' : ''}`} style={{ gridColumn: i + 2, gridRow: 3 }}>{shown >= 2 * i + 1 && <TeX math={qLatex(r.results[i])} />}</span>)
  }
  return <div className="ld-scroll"><div className="syn" style={{ gridTemplateColumns: `auto repeat(${n}, minmax(44px, auto))` }}>{cells}</div></div>
}

export function Graph({ poly, window: win = [-8, 8, -8, 8], show = { zeros: true, extrema: true }, highlight = [], label }) {
  const clip = useId().replace(/:/g, '')
  const [x0, x1, y0, y1] = win
  const W = 320, pad = 14
  const sx = x => pad + (x - x0) / (x1 - x0) * (W - 2 * pad)
  const sy = y => W - pad - (y - y0) / (y1 - y0) * (W - 2 * pad)
  const { zeros, extrema } = analyze(poly)
  const pts = []
  for (let i = 0; i <= 800; i++) {
    const x = x0 + (x1 - x0) * i / 800
    const y = Math.max(Math.min(evalNum(poly, x), y1 + 50), y0 - 50)
    pts.push(`${sx(x).toFixed(2)},${sy(y).toFixed(2)}`)
  }
  const stepX = (x1 - x0) > 20 ? 2 : 1, stepY = (y1 - y0) > 20 ? 4 : (y1 - y0) > 16 ? 2 : 1
  const gx = [], gy = []
  for (let x = Math.ceil(x0 / stepX) * stepX; x <= x1; x += stepX) gx.push(x)
  for (let y = Math.ceil(y0 / stepY) * stepY; y <= y1; y += stepY) gy.push(y)
  const inView = (x, y) => x >= x0 && x <= x1 && y >= y0 && y <= y1
  return <figure className="graph">
    <svg viewBox={`0 0 ${W} ${W}`} role="img" aria-label={label ?? `Graph of f(x) = ${polyLatex(poly).replace(/\^\{(\d+)\}/g, '^$1')}`}>
      <defs><clipPath id={clip}><rect x={pad} y={pad} width={W - 2 * pad} height={W - 2 * pad} /></clipPath></defs>
      {gx.map(x => <line key={`gx${x}`} x1={sx(x)} x2={sx(x)} y1={pad} y2={W - pad} className="g-grid" />)}
      {gy.map(y => <line key={`gy${y}`} y1={sy(y)} y2={sy(y)} x1={pad} x2={W - pad} className="g-grid" />)}
      {y0 <= 0 && y1 >= 0 && <line x1={pad} x2={W - pad} y1={sy(0)} y2={sy(0)} className="g-axis" />}
      {x0 <= 0 && x1 >= 0 && <line y1={pad} y2={W - pad} x1={sx(0)} x2={sx(0)} className="g-axis" />}
      {gx.filter(x => x !== 0 && x % (stepX * 2) === 0).map(x => <text key={`tx${x}`} x={sx(x)} y={sy(0) + 13} className="g-tick">{x}</text>)}
      {gy.filter(y => y !== 0 && y % (stepY * 2) === 0).map(y => <text key={`ty${y}`} x={sx(0) - 5} y={sy(y) + 3} className="g-tick g-tick-y">{y}</text>)}
      <polyline points={pts.join(' ')} className="g-curve" clipPath={`url(#${clip})`} />
      {highlight.map(x => <circle key={`h${x}`} cx={sx(x)} cy={sy(0)} r="11" className="g-highlight" />)}
      {show.zeros && zeros.filter(z => inView(z, 0)).map(z => <circle key={`z${z}`} cx={sx(z)} cy={sy(0)} r="4.5" className="g-zero" />)}
      {show.extrema && extrema.filter(e => inView(e.x, e.y)).map(e => <g key={`e${e.x}`}>
        <circle cx={sx(e.x)} cy={sy(e.y)} r="4.5" className={`g-ext g-${e.type}`} />
        <text x={sx(e.x)} y={sy(e.y) + (e.type === 'max' ? -9 : 17)} className="g-label">({tenth(e.x)}, {tenth(e.y)})</text>
      </g>)}
    </svg>
  </figure>
}

// Any functions (JS closures) on one grid, with the mirror line y = x.
export function FnGraph({ curves, window: win = [-6, 6, -6, 6], diag = true, label }) {
  const clip = useId().replace(/:/g, '')
  const [x0, x1, y0, y1] = win
  const W = 320, pad = 14
  const sx = x => pad + (x - x0) / (x1 - x0) * (W - 2 * pad)
  const sy = y => W - pad - (y - y0) / (y1 - y0) * (W - 2 * pad)
  const path = f => {
    let d = '', pen = false
    for (let i = 0; i <= 800; i++) {
      const x = x0 + (x1 - x0) * i / 800, y = f(x)
      if (!Number.isFinite(y) || y < y0 - 40 || y > y1 + 40) { pen = false; continue }
      d += `${pen ? 'L' : 'M'}${sx(x).toFixed(2)},${sy(y).toFixed(2)}`
      pen = true
    }
    return d
  }
  const gx = [], gy = []
  for (let x = Math.ceil(x0); x <= x1; x++) gx.push(x)
  for (let y = Math.ceil(y0); y <= y1; y++) gy.push(y)
  return <figure className="graph">
    <svg viewBox={`0 0 ${W} ${W}`} role="img" aria-label={label ?? 'Graph of a function and its inverse'}>
      <defs><clipPath id={clip}><rect x={pad} y={pad} width={W - 2 * pad} height={W - 2 * pad} /></clipPath></defs>
      {gx.map(x => <line key={`gx${x}`} x1={sx(x)} x2={sx(x)} y1={pad} y2={W - pad} className="g-grid" />)}
      {gy.map(y => <line key={`gy${y}`} y1={sy(y)} y2={sy(y)} x1={pad} x2={W - pad} className="g-grid" />)}
      <line x1={pad} x2={W - pad} y1={sy(0)} y2={sy(0)} className="g-axis" />
      <line y1={pad} y2={W - pad} x1={sx(0)} x2={sx(0)} className="g-axis" />
      {gx.filter(x => x !== 0 && x % 2 === 0).map(x => <text key={`tx${x}`} x={sx(x)} y={sy(0) + 13} className="g-tick">{x}</text>)}
      {gy.filter(y => y !== 0 && y % 2 === 0).map(y => <text key={`ty${y}`} x={sx(0) - 5} y={sy(y) + 3} className="g-tick g-tick-y">{y}</text>)}
      {diag && <line x1={sx(Math.max(x0, y0))} y1={sy(Math.max(x0, y0))} x2={sx(Math.min(x1, y1))} y2={sy(Math.min(x1, y1))} className="g-diag" clipPath={`url(#${clip})`} />}
      {curves.map((c, i) => <path key={i} d={path(c.f)} className={`g-curve ${i ? 'g-curve-alt' : ''}`} clipPath={`url(#${clip})`} />)}
    </svg>
    <figcaption className="g-legend">{curves.map((c, i) => c.label && <span key={i} className={i ? 'alt' : ''}>{c.label}</span>)}{diag && <span className="diag">y = x</span>}</figcaption>
  </figure>
}

// Number line with critical points, interval signs, and the solution shaded.
export function SignChart({ pts, signs, atoms, showSolution }) {
  const W = 520, H = 92, y = 52, n = pts.length
  const xs = pts.map((_, i) => 40 + (W - 80) * (i + 1) / (n + 1))
  const edge = i => i === 0 ? 14 : i === n + 1 ? W - 14 : xs[i - 1]
  return <figure className="sign-chart">
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Sign chart on a number line">
      {showSolution && atoms.filter(a => a.inc && a.kind === 'I').map(a => <line key={`s${a.i}`} x1={edge(a.i)} x2={edge(a.i + 1)} y1={y} y2={y} className="sc-shade" />)}
      <line x1="8" x2={W - 8} y1={y} y2={y} className="sc-axis" />
      <path d={`M8 ${y}l8 -5v10z M${W - 8} ${y}l-8 -5v10z`} className="sc-arrow" />
      {signs.map((s, i) => <text key={`g${i}`} x={(edge(i) + edge(i + 1)) / 2} y={y - 14} className={`sc-sign ${s > 0 ? 'pos' : s < 0 ? 'neg' : ''}`}>{s > 0 ? '+' : s < 0 ? '−' : '0'}</text>)}
      {pts.map((p, i) => <g key={`p${i}`}>
        <circle cx={xs[i]} cy={y} r="6.5" className={`sc-pt ${atoms[2 * i + 1].inc ? 'closed' : 'open'}`} />
        <text x={xs[i]} y={y + 26} className="sc-label">{p.label}</text>
      </g>)}
    </svg>
  </figure>
}

export function MathLines({ lines, step }) {
  return <div className="math-lines">{lines.slice(0, step + 1).map((l, i) =>
    <div key={i} className={`math-line ${i === step ? 'current' : ''}`}><TeX math={l} block /></div>)}</div>
}

export function FunctionMachine({ step }) {
  const stages = [
    ['input', step >= 4 ? '2' : 'x'],
    ['h', 'h(x) = x^3 - 2'],
    ['middle', step >= 4 ? 'h(2) = 6' : step >= 1 ? 'x^3 - 2' : '?'],
    ['g', 'g(x) = 3x - 3'],
    ['output', step >= 4 ? 'g(6) = 15' : step >= 3 ? '3x^3 - 9' : step >= 2 ? '3(x^3 - 2) - 3' : '?'],
  ]
  return <div className="machine">{stages.map(([kind, tex], i) => <div key={kind} className="machine-part">
    <div className={`machine-box ${kind === 'h' || kind === 'g' ? 'machine-fn' : ''} ${(step === 1 && i <= 2) || (step >= 2 && step <= 3 && i >= 2) ? 'active' : ''}`}><TeX math={tex} /></div>
    {i < stages.length - 1 && <span className="machine-arrow" aria-hidden="true">→</span>}
  </div>)}</div>
}
