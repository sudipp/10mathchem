import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { pathOf, routeLabelAt, viewBoxOf } from './mapView.js'

// The animated map: each step zooms, fades in territories, and draws routes.
// map = { base, aspect, cities, steps, bases: { name: base module } }; a step may switch to another base map.
export default function MapPlayer({ map, step, setStep }) {
  const steps = map.steps, aspect = map.aspect ?? 0.62
  const s = steps[step], baseName = s.base ?? map.base, B = map.bases[baseName]
  const [playing, setPlaying] = useState(false)
  const [vb, setVb] = useState(() => viewBoxOf(B, s.view, aspect))
  const vbRef = useRef({ vb, baseName })

  useEffect(() => {
    const to = viewBoxOf(B, s.view, aspect)
    // a different base map has different coordinates, so jump instead of zooming
    if (vbRef.current.baseName !== baseName) { vbRef.current = { vb: to, baseName }; setVb(to); return }
    const from = vbRef.current.vb, t0 = performance.now()
    let frame
    const tick = now => {
      const p = Math.min(1, (now - t0) / 900), e = 1 - Math.pow(1 - p, 3)
      const next = { x: from.x + (to.x - from.x) * e, y: from.y + (to.y - from.y) * e, w: from.w + (to.w - from.w) * e, h: from.h + (to.h - from.h) * e }
      vbRef.current = { vb: next, baseName }; setVb(next)
      if (p < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [s, B, baseName, aspect])
  useEffect(() => {
    if (!playing) return
    const id = setTimeout(() => { if (step < steps.length - 1) setStep(step + 1); else setPlaying(false) }, 5200)
    return () => clearTimeout(id)
  }, [playing, step, setStep, steps.length])

  const P = (lon, lat) => B.project(lon, lat)
  const k = vb.w / 1000 // label scale: keeps text the same size on screen at any zoom
  const clip = `landclip-${baseName}`
  return <div className="map-player">
    <div className="map-head"><span className="eyebrow">ANIMATED MAP · {step + 1} / {steps.length}</span><h3>{s.title}</h3></div>
    <div className="map-frame">
      <svg viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`} style={{ aspectRatio: `1 / ${aspect}` }} role="img" aria-label={`${s.title}. ${s.caption}`}>
        <defs>
          <clipPath id={clip}><path d={B.LAND} /></clipPath>
          {(s.routes ?? []).map((r, i) => r.arrow && <marker key={i} id={`ah-${step}-${i}`} viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill={r.color} /></marker>)}
        </defs>
        <rect x={-B.MAP.w} y={-B.MAP.h} width={B.MAP.w * 3} height={B.MAP.h * 3} className="sea" />
        <path d={B.LAND} className="land" />
        <path d={B.LAKES} className="lake" />
        {Object.entries(B.RIVERS).map(([name, d]) => <path key={name} d={d} className="river" style={{ strokeWidth: 1.4 * k }} />)}
        <g clipPath={`url(#${clip})`}>
          {(s.lands ?? []).map(l => <g key={`${step}-${l.label}-${l.color}`} className="territory" style={{ fill: l.color, opacity: l.faint ? 0.18 : 0.5 }}>{l.polys.map((p, i) => <path key={i} d={pathOf(B, p) + 'Z'} />)}</g>)}
        </g>
        <path d={B.LAND} className="coast" style={{ strokeWidth: 0.8 * k }} />
        {(s.routes ?? []).map((r, i) => <path key={`${step}-r${i}`} d={pathOf(B, r.pts)} className={`route${r.dashed ? ' dashed' : ''}`} pathLength="1000"
          style={{ stroke: r.color, strokeWidth: (r.label ? 3.2 : 2) * k, animationDelay: `${0.3 + i * 0.12}s`, ...(r.dashed ? { strokeDasharray: `${9 * k} ${7 * k}` } : {}) }} markerEnd={r.arrow ? `url(#ah-${step}-${i})` : undefined} />)}
        {(s.routes ?? []).filter(r => r.label).map((r, i) => { const [x, y] = P(...routeLabelAt(r)); return <text key={`rl${i}`} x={x} y={y - 8 * k} className="route-label" style={{ fontSize: 13 * k, fill: r.color, strokeWidth: 3 * k }}>{r.label}</text> })}
        {(s.lands ?? []).filter(l => l.label && l.at).map(l => { const [x, y] = P(...l.at); return <text key={`ll-${l.label}`} x={x} y={y} className="land-label" style={{ fontSize: 17 * k, strokeWidth: 3 * k }}>{l.label}</text> })}
        {(s.tags ?? []).map((t, i) => { const [x, y] = P(...t.at); return <text key={`t${i}`} x={x} y={y} className="goods" style={{ fontSize: 12 * k, strokeWidth: 3 * k }}>{t.text}</text> })}
        {(s.cities ?? []).map(id => {
          const c = map.cities[id]; const [x, y] = P(...c.at)
          return <g key={id} className="city"><circle cx={x} cy={y} r={(c.big ? 4.5 : 3.2) * k} style={{ strokeWidth: 0.8 * k }} />
            <text x={x + (c.side === 'left' ? -6 : c.side === 'below' ? 0 : 6) * k} y={y + (c.side === 'below' ? 15 : -5) * k} textAnchor={c.side === 'left' ? 'end' : c.side === 'below' ? 'middle' : 'start'} style={{ fontSize: (c.big ? 14 : 12) * k, strokeWidth: 3 * k }}>{c.name}</text></g>
        })}
      </svg>
    </div>
    <p className="map-caption" aria-live="polite">{s.caption}</p>
    <div className="map-controls">
      <button className="icon-btn" aria-label="Previous map" disabled={step === 0} onClick={() => { setPlaying(false); setStep(step - 1) }}><ChevronLeft size={18} /></button>
      <button className="btn accent" onClick={() => { if (step === steps.length - 1) setStep(0); setPlaying(!playing) }}>{playing ? <Pause size={15} /> : <Play size={15} />}{playing ? 'Pause' : 'Play all'}</button>
      <button className="icon-btn" aria-label="Next map" disabled={step === steps.length - 1} onClick={() => { setPlaying(false); setStep(step + 1) }}><ChevronRight size={18} /></button>
      <div className="map-chips">{steps.map((m, i) => <button key={m.title} aria-pressed={i === step} onClick={() => { setPlaying(false); setStep(i) }}>{m.chip ?? m.title.split(',')[0].replace('The ', '')}</button>)}</div>
    </div>
  </div>
}
