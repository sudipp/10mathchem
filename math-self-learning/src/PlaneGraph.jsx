// A coordinate plane for lines, absolute value, piecewise functions, parabolas,
// inequalities (shaded half-planes), and systems (curves + intersection dots).
// Items are plain data with numeric closures, produced by lines.js / quadratics.js:
//   { kind: 'fn', f, from, to, dashed, alt }        a curve (optionally on [from, to])
//   { kind: 'vline', x, dashed, alt }                a vertical line
//   { kind: 'shade', f | x, side, alt }              shade above/below a curve, or left/right of x = c
//   { kind: 'axis', x }                              dashed axis of symmetry
//   { kind: 'dots', pts: [[x, y]], style, labels }   style: closed | open | vertex | key | sol
import { useId } from 'react'

const W = 320, PAD = 14
const fmt = v => { const r = Math.round(v * 100) / 100; return Object.is(r, -0) ? '0' : String(r) }

export function PlaneGraph({ items, window: win = [-8, 8, -8, 8], label, legend }) {
  const clip = useId().replace(/:/g, '')
  const [x0, x1, y0, y1] = win
  const sx = x => PAD + (x - x0) / (x1 - x0) * (W - 2 * PAD)
  const sy = y => W - PAD - (y - y0) / (y1 - y0) * (W - 2 * PAD)
  const span = Math.max(x1 - x0, y1 - y0)
  const step = span > 40 ? 5 : span > 24 ? 4 : span > 14 ? 2 : 1
  const gx = [], gy = []
  for (let x = Math.ceil(x0 / step) * step; x <= x1; x += step) gx.push(x)
  for (let y = Math.ceil(y0 / step) * step; y <= y1; y += step) gy.push(y)
  const lab = step === 1 ? 2 : step
  const path = (f, from = x0 - 1, to = x1 + 1) => {
    const a = Math.max(from, x0 - 1), b = Math.min(to, x1 + 1)
    if (!(b > a)) return ''
    let d = '', pen = false
    for (let i = 0; i <= 600; i++) {
      const x = a + (b - a) * i / 600, y = f(x)
      if (!Number.isFinite(y) || y < y0 - 60 || y > y1 + 60) { pen = false; continue }
      d += `${pen ? 'L' : 'M'}${sx(x).toFixed(2)},${sy(y).toFixed(2)}`
      pen = true
    }
    return d
  }
  const shade = it => {
    if (it.x != null) {
      const [a, b] = it.side === 'left' ? [x0 - 1, it.x] : [it.x, x1 + 1]
      return `M${sx(a)},${sy(y0 - 1)}L${sx(b)},${sy(y0 - 1)}L${sx(b)},${sy(y1 + 1)}L${sx(a)},${sy(y1 + 1)}Z`
    }
    const edge = it.side === 'above' ? y1 + 2 : y0 - 2
    let d = ''
    for (let i = 0; i <= 600; i++) {
      const x = x0 - 1 + (x1 - x0 + 2) * i / 600
      const y = Math.max(Math.min(it.f(x), y1 + 2), y0 - 2)
      d += `${i ? 'L' : 'M'}${sx(x).toFixed(2)},${sy(y).toFixed(2)}`
    }
    return `${d}L${sx(x1 + 1)},${sy(edge)}L${sx(x0 - 1)},${sy(edge)}Z`
  }
  const inView = ([x, y]) => x >= x0 - 1e-9 && x <= x1 + 1e-9 && y >= y0 - 1e-9 && y <= y1 + 1e-9
  const tickY = Math.min(Math.max(sy(0) + 13, PAD + 10), W - PAD - 3)
  const tickX = Math.min(Math.max(sx(0) - 5, PAD + 14), W - PAD)
  return <figure className="graph plane-graph">
    <svg viewBox={`0 0 ${W} ${W}`} role="img" aria-label={label ?? 'Graph'}>
      <defs><clipPath id={clip}><rect x={PAD} y={PAD} width={W - 2 * PAD} height={W - 2 * PAD} /></clipPath></defs>
      {items.filter(it => it.kind === 'shade').map((it, i) => <path key={`s${i}`} d={shade(it)} className={`pg-shade ${it.alt ? 'alt' : ''}`} clipPath={`url(#${clip})`} />)}
      {gx.map(x => <line key={`gx${x}`} x1={sx(x)} x2={sx(x)} y1={PAD} y2={W - PAD} className="g-grid" />)}
      {gy.map(y => <line key={`gy${y}`} y1={sy(y)} y2={sy(y)} x1={PAD} x2={W - PAD} className="g-grid" />)}
      {y0 <= 0 && y1 >= 0 && <line x1={PAD} x2={W - PAD} y1={sy(0)} y2={sy(0)} className="g-axis" />}
      {x0 <= 0 && x1 >= 0 && <line y1={PAD} y2={W - PAD} x1={sx(0)} x2={sx(0)} className="g-axis" />}
      {gx.filter(x => x !== 0 && x % lab === 0).map(x => <text key={`tx${x}`} x={sx(x)} y={tickY} className="g-tick">{x}</text>)}
      {gy.filter(y => y !== 0 && y % lab === 0).map(y => <text key={`ty${y}`} x={tickX} y={sy(y) + 3} className="g-tick g-tick-y">{y}</text>)}
      {items.map((it, i) => {
        if (it.kind === 'axis') return <line key={i} x1={sx(it.x)} x2={sx(it.x)} y1={PAD} y2={W - PAD} className="c-axis-sym" />
        if (it.kind === 'vline') return <line key={i} x1={sx(it.x)} x2={sx(it.x)} y1={sy(it.to ?? y1 + 1)} y2={sy(it.from ?? y0 - 1)} className={`g-curve ${it.alt ? 'g-curve-alt' : ''} ${it.dashed ? 'pg-dashed' : ''}`} clipPath={`url(#${clip})`} />
        if (it.kind === 'fn') return <path key={i} d={path(it.f, it.from, it.to)} className={`g-curve ${it.alt ? 'g-curve-alt' : ''} ${it.dashed ? 'pg-dashed' : ''}`} clipPath={`url(#${clip})`} />
        return null
      })}
      {items.filter(it => it.kind === 'dots').flatMap((it, i) => it.pts.filter(inView).map((p, j) => <g key={`d${i}-${j}`}>
        <circle cx={sx(p[0])} cy={sy(p[1])} r={it.style === 'open' || it.style === 'closed' ? 4.2 : 4.5} className={`pg-dot ${it.style ?? 'key'}`} />
        {it.labels && <text x={sx(p[0])} y={sy(p[1]) + (p[2] === 'below' ? 16 : -9)} className="g-label">({fmt(p[0])}, {fmt(p[1])})</text>}
      </g>))}
    </svg>
    {legend && <figcaption className="g-legend">{legend.map(([text, cls]) => <span key={text} className={cls}>{text}</span>)}</figcaption>}
  </figure>
}
