import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { LAKES, LAND, MAP, RIVERS, project } from './geo/mediterranean.js'
import { CITIES, MAP_STEPS } from './geo/rome.js'

const FULL = { x: 0, y: 0, w: MAP.w, h: MAP.h }
const ASPECT = MAP.h / MAP.w
function viewBoxOf(view) {
  if (!view) return FULL
  const [lon0, lat0, lon1, lat1] = view
  const [x0, y0] = project(lon0, lat1), [x1, y1] = project(lon1, lat0)
  let w = x1 - x0, h = y1 - y0
  // keep the map's aspect ratio so nothing stretches
  if (h / w > ASPECT) { const nw = h / ASPECT; return { x: x0 - (nw - w) / 2, y: y0, w: nw, h } }
  const nh = w * ASPECT
  return { x: x0, y: y0 - (nh - h) / 2, w, h: nh }
}
const pathOf = pts => 'M' + pts.map(p => project(...p).map(v => v.toFixed(1)).join(',')).join('L')
const polyOf = pts => pathOf(pts) + 'Z'

// The animated map: each step zooms, fades in territories, and draws routes.
export default function MapPlayer({ step, setStep }) {
  const [playing, setPlaying] = useState(false)
  const [vb, setVb] = useState(() => viewBoxOf(MAP_STEPS[step].view))
  const vbRef = useRef(vb)
  const s = MAP_STEPS[step]

  useEffect(() => {
    const from = vbRef.current, to = viewBoxOf(s.view), t0 = performance.now()
    let frame
    const tick = now => {
      const p = Math.min(1, (now - t0) / 900), e = 1 - Math.pow(1 - p, 3)
      const next = { x: from.x + (to.x - from.x) * e, y: from.y + (to.y - from.y) * e, w: from.w + (to.w - from.w) * e, h: from.h + (to.h - from.h) * e }
      vbRef.current = next; setVb(next)
      if (p < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [s])
  useEffect(() => {
    if (!playing) return
    const id = setTimeout(() => { if (step < MAP_STEPS.length - 1) setStep(step + 1); else setPlaying(false) }, 5200)
    return () => clearTimeout(id)
  }, [playing, step, setStep])

  const k = vb.w / MAP.w // label scale: keeps text the same size on screen at any zoom
  return <div className="map-player">
    <div className="map-head"><span className="eyebrow">ANIMATED MAP · {step + 1} / {MAP_STEPS.length}</span><h3>{s.title}</h3></div>
    <div className="map-frame">
      <svg viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`} role="img" aria-label={`${s.title}. ${s.caption}`}>
        <defs>
          <clipPath id="landclip"><path d={LAND} /></clipPath>
          {(s.routes ?? []).map((r, i) => r.arrow && <marker key={i} id={`ah-${step}-${i}`} viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill={r.color} /></marker>)}
        </defs>
        <rect x={-50} y={-50} width={MAP.w + 100} height={MAP.h + 100} className="sea" />
        <path d={LAND} className="land" />
        <path d={LAKES} className="lake" />
        {Object.entries(RIVERS).map(([name, d]) => <path key={name} d={d} className="river" style={{ strokeWidth: 1.4 * k }} />)}
        <g clipPath="url(#landclip)">
          {(s.lands ?? []).map(l => <g key={`${step}-${l.label}`} className="territory" style={{ fill: l.color, opacity: l.faint ? 0.18 : 0.5 }}>{l.polys.map((p, i) => <path key={i} d={polyOf(p)} />)}</g>)}
        </g>
        <path d={LAND} className="coast" style={{ strokeWidth: 0.8 * k }} />
        {(s.routes ?? []).map((r, i) => <path key={`${step}-r${i}`} d={pathOf(r.pts)} className={`route${r.dashed ? ' dashed' : ''}`} pathLength="1000"
          style={{ stroke: r.color, strokeWidth: (r.label ? 3.2 : 2) * k, animationDelay: `${0.3 + i * 0.12}s` }} markerEnd={r.arrow ? `url(#ah-${step}-${i})` : undefined} />)}
        {(s.routes ?? []).filter(r => r.label).map((r, i) => { const [x, y] = project(...(r.labelAt ?? r.pts[Math.floor(r.pts.length / 2)])); return <text key={`rl${i}`} x={x} y={y - 8 * k} className="route-label" style={{ fontSize: 13 * k, fill: r.color }}>{r.label}</text> })}
        {(s.lands ?? []).filter(l => l.label && l.at).map(l => { const [x, y] = project(...l.at); return <text key={`ll-${l.label}`} x={x} y={y} className="land-label" style={{ fontSize: 17 * k }}>{l.label}</text> })}
        {(s.tags ?? []).map((t, i) => { const [x, y] = project(...t.at); return <text key={`t${i}`} x={x} y={y} className="goods" style={{ fontSize: 12 * k }}>{t.text}</text> })}
        {(s.cities ?? []).map(id => { const c = CITIES[id]; const [x, y] = project(...c.at); return <g key={id} className="city"><circle cx={x} cy={y} r={(c.big ? 4.5 : 3.2) * k} /><text x={x + (c.side === 'left' ? -6 : c.side === 'below' ? 0 : 6) * k} y={y + (c.side === 'below' ? 15 : -5) * k} textAnchor={c.side === 'left' ? 'end' : c.side === 'below' ? 'middle' : 'start'} style={{ fontSize: (c.big ? 14 : 12) * k }}>{c.name}</text></g> })}
      </svg>
    </div>
    <p className="map-caption" aria-live="polite">{s.caption}</p>
    <div className="map-controls">
      <button className="icon-btn" aria-label="Previous map" disabled={step === 0} onClick={() => { setPlaying(false); setStep(step - 1) }}><ChevronLeft size={18} /></button>
      <button className="btn accent" onClick={() => { if (step === MAP_STEPS.length - 1) setStep(0); setPlaying(!playing) }}>{playing ? <Pause size={15} /> : <Play size={15} />}{playing ? 'Pause' : 'Play all'}</button>
      <button className="icon-btn" aria-label="Next map" disabled={step === MAP_STEPS.length - 1} onClick={() => { setPlaying(false); setStep(step + 1) }}><ChevronRight size={18} /></button>
      <div className="map-chips">{MAP_STEPS.map((m, i) => <button key={m.title} aria-pressed={i === step} onClick={() => { setPlaying(false); setStep(i) }}>{m.title.split(',')[0].replace('The ', '')}</button>)}</div>
    </div>
  </div>
}
