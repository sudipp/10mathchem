// Graph of a conic in standard form, with its key features marked.
import { useId } from 'react'
import { num } from './poly.js'
import { features, makeConic, surdNum } from './conics.js'

const W = 320, PAD = 14

// A square window around the key points, always showing the origin.
function conicWindow(c, f) {
  const pts = [[0, 0], f.center?.pt ?? f.vertex.pt]
  const add = o => o && pts.push(...o.pts)
  if (c.kind === 'circle') { add(f.points[0]); add(f.points[1]) }
  if (c.kind === 'ellipse' || c.kind === 'hyperbola') { add(f.vertices); add(f.coVertices); add(f.foci) }
  if (c.kind === 'parabola') {
    pts.push(f.focus.pt)
    const [h, k, p] = [num(c.h), num(c.k), num(f.p)]
    const reach = Math.max(4, Math.abs(p) * 6)
    pts.push(c.vertical ? [h - reach, k + Math.sign(p) * reach * Math.abs(num(c.a)) * reach] : [h + Math.sign(p) * reach * Math.abs(num(c.a)) * reach, k - reach])
    pts.push(c.vertical ? [h, f.directrix.y.n / f.directrix.y.d] : [f.directrix.x.n / f.directrix.x.d, k])
  }
  const xs = pts.map(p => p[0]), ys = pts.map(p => p[1])
  const [cx, cy] = [(Math.min(...xs) + Math.max(...xs)) / 2, (Math.min(...ys) + Math.max(...ys)) / 2]
  const half = Math.max(5, Math.ceil(Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys)) / 2 + 2))
  const x0 = Math.floor(cx - half), y0 = Math.floor(cy - half)
  return [x0, x0 + 2 * half, y0, y0 + 2 * half]
}

function curvePaths(c, f, sx, sy, win) {
  const [x0, x1, y0, y1] = win
  const path = pts => pts.map(([x, y], i) => `${i ? 'L' : 'M'}${sx(x).toFixed(2)},${sy(y).toFixed(2)}`).join('')
  const [h, k] = [num(c.h), num(c.k)]
  const N = 400
  if (c.kind === 'circle' || c.kind === 'ellipse') {
    const rx = c.kind === 'circle' ? surdNum(f.r) : Math.sqrt(num(c.X2)), ry = c.kind === 'circle' ? rx : Math.sqrt(num(c.Y2))
    return [path(Array.from({ length: N + 1 }, (_, i) => { const t = 2 * Math.PI * i / N; return [h + rx * Math.cos(t), k + ry * Math.sin(t)] })) + 'Z']
  }
  if (c.kind === 'parabola') {
    const a = num(c.a), span = c.vertical ? [x0 - 1, x1 + 1] : [y0 - 1, y1 + 1]
    return [path(Array.from({ length: N + 1 }, (_, i) => {
      const t = span[0] + (span[1] - span[0]) * i / N
      return c.vertical ? [t, a * (t - h) ** 2 + k] : [a * (t - k) ** 2 + h, t]
    }))]
  }
  const a = surdNum(f.a), b = surdNum(f.b), T = Math.acosh(Math.max(2, (x1 - x0 + y1 - y0) / Math.min(a, b)))
  const branch = s => path(Array.from({ length: N + 1 }, (_, i) => {
    const t = -T + 2 * T * i / N
    return c.vertical ? [h + b * Math.sinh(t), k + s * a * Math.cosh(t)] : [h + s * a * Math.cosh(t), k + b * Math.sinh(t)]
  }))
  return [branch(1), branch(-1)]
}

// show: { center, vertices, coVertices, foci, asymptotes, box, directrix, focus, axis, curve }
export function ConicGraph({ conic, show = {}, window: win, label }) {
  const clip = useId().replace(/:/g, '')
  const c = makeConic(conic)
  const f = features(c)
  const view = win ?? conicWindow(c, f)
  const [x0, x1, y0, y1] = view
  const sx = x => PAD + (x - x0) / (x1 - x0) * (W - 2 * PAD)
  const sy = y => W - PAD - (y - y0) / (y1 - y0) * (W - 2 * PAD)
  const span = x1 - x0
  const step = span > 30 ? 4 : span > 14 ? 2 : 1
  const gx = [], gy = []
  for (let x = Math.ceil(x0 / step) * step; x <= x1; x += step) gx.push(x)
  for (let y = Math.ceil(y0 / step) * step; y <= y1; y += step) gy.push(y)
  const s = { curve: true, center: true, vertices: true, foci: true, coVertices: true, asymptotes: true, box: true, directrix: true, focus: true, axis: false, ...show }
  const [h, k] = [num(c.h), num(c.k)]
  const line = (ax, ay, bx, by, cls, key) => <line key={key} x1={sx(ax)} y1={sy(ay)} x2={sx(bx)} y2={sy(by)} className={cls} clipPath={`url(#${clip})`} />
  const dots = (o, cls, r = 4.5) => o?.pts.map(([x, y], i) => <circle key={`${cls}${i}`} cx={sx(x)} cy={sy(y)} r={r} className={cls} />)
  const marks = []
  if (c.kind === 'hyperbola') {
    const a = surdNum(f.a), b = surdNum(f.b)
    const [dx, dy] = c.vertical ? [b, a] : [a, b]
    if (s.box) marks.push(<rect key="box" x={sx(h - dx)} y={sy(k + dy)} width={sx(h + dx) - sx(h - dx)} height={sy(k - dy) - sy(k + dy)} className="c-box" clipPath={`url(#${clip})`} />)
    if (s.asymptotes) {
      const m = dy / dx, L = 4 * span
      marks.push(line(h - L, k - m * L, h + L, k + m * L, 'c-dash', 'as1'), line(h - L, k + m * L, h + L, k - m * L, 'c-dash', 'as2'))
    }
  }
  if (c.kind === 'parabola') {
    if (s.directrix) marks.push(c.vertical ? line(x0 - 1, num(f.directrix.y), x1 + 1, num(f.directrix.y), 'c-dash', 'dir') : line(num(f.directrix.x), y0 - 1, num(f.directrix.x), y1 + 1, 'c-dash', 'dir'))
    if (s.axis) marks.push(c.vertical ? line(h, y0 - 1, h, y1 + 1, 'c-axis-sym', 'ax') : line(x0 - 1, k, x1 + 1, k, 'c-axis-sym', 'ax'))
  }
  const inView = ([x, y]) => x >= x0 && x <= x1 && y >= y0 && y <= y1
  return <figure className="graph conic-graph">
    <svg viewBox={`0 0 ${W} ${W}`} role="img" aria-label={label ?? `Graph of the ${c.kind}`}>
      <defs><clipPath id={clip}><rect x={PAD} y={PAD} width={W - 2 * PAD} height={W - 2 * PAD} /></clipPath></defs>
      {gx.map(x => <line key={`gx${x}`} x1={sx(x)} x2={sx(x)} y1={PAD} y2={W - PAD} className="g-grid" />)}
      {gy.map(y => <line key={`gy${y}`} y1={sy(y)} y2={sy(y)} x1={PAD} x2={W - PAD} className="g-grid" />)}
      {y0 <= 0 && y1 >= 0 && <line x1={PAD} x2={W - PAD} y1={sy(0)} y2={sy(0)} className="g-axis" />}
      {x0 <= 0 && x1 >= 0 && <line y1={PAD} y2={W - PAD} x1={sx(0)} x2={sx(0)} className="g-axis" />}
      {gx.filter(x => x !== 0 && x % (step * 2) === 0).map(x => <text key={`tx${x}`} x={sx(x)} y={Math.min(Math.max(sy(0) + 13, PAD + 10), W - PAD - 3)} className="g-tick">{x}</text>)}
      {gy.filter(y => y !== 0 && y % (step * 2) === 0).map(y => <text key={`ty${y}`} x={Math.min(Math.max(sx(0) - 5, PAD + 14), W - PAD)} y={sy(y) + 3} className="g-tick g-tick-y">{y}</text>)}
      {marks}
      {s.curve && curvePaths(c, f, sx, sy, view).map((d, i) => <path key={`c${i}`} d={d} className="g-curve c-curve" clipPath={`url(#${clip})`} />)}
      {s.coVertices && f.coVertices && dots(f.coVertices, 'c-cov', 3.5)}
      {s.vertices && f.vertices && dots(f.vertices, 'c-vertex')}
      {s.foci && f.foci && dots(f.foci, 'c-focus')}
      {s.focus && f.focus && inView(f.focus.pt) && <circle cx={sx(f.focus.pt[0])} cy={sy(f.focus.pt[1])} r="4.5" className="c-focus" />}
      {s.center && inView(f.center?.pt ?? f.vertex.pt) && <circle cx={sx(h)} cy={sy(k)} r="4" className={c.kind === 'parabola' ? 'c-vertex' : 'c-center'} />}
    </svg>
    <figcaption className="conic-legend">
      <span><i className={c.kind === 'parabola' ? 'lg-vertex' : 'lg-center'} />{c.kind === 'parabola' ? 'vertex' : 'center'}</span>
      {(f.vertices) && <span><i className="lg-vertex" />vertices</span>}
      {(f.coVertices) && <span><i className="lg-cov" />co-vertices</span>}
      {(f.foci || f.focus) && <span><i className="lg-focus" />{f.focus ? 'focus' : 'foci'}</span>}
      {c.kind === 'parabola' && <span><i className="lg-dash" />directrix</span>}
      {c.kind === 'hyperbola' && <span><i className="lg-dash" />asymptotes</span>}
    </figcaption>
  </figure>
}
