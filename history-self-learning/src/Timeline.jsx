import { useMemo, useState } from 'react'
import { TRACKS, spanText } from './shared.js'


const W = 1100, LEFT = 150, RIGHT = 20, ROW = 26, AXIS = 34
const niceStep = span => [5, 10, 20, 25, 50, 100, 200, 250, 500].find(s => span / s <= 12) ?? 1000

// Interactive timeline: one lane per theme, spans as bars, click any event for details.
// zooms: [{ label, from, to }], the first being the default view.
// tracks: which theme lanes to show (all five by default).
export default function Timeline({ events, zooms, tracks = TRACKS }) {
  const [preset, setPreset] = useState(0)
  const [hidden, setHidden] = useState([])
  const [sel, setSel] = useState(null)
  const { from, to } = zooms[Math.min(preset, zooms.length - 1)]
  const x = y => LEFT + (y - from) / (to - from) * (W - LEFT - RIGHT)

  const lanes = useMemo(() => {
    const built = tracks.filter(t => !hidden.includes(t.id)).map(t => {
      const evs = events.filter(e => e.track === t.id && (e.end ?? e.year) >= from && e.year <= to).sort((a, b) => a.year - b.year)
      const rowsEnd = []
      const placed = evs.map(e => {
        const x0 = Math.max(LEFT, (LEFT + (e.year - from) / (to - from) * (W - LEFT - RIGHT)))
        const x1end = e.end != null ? LEFT + (Math.min(e.end, to) - from) / (to - from) * (W - LEFT - RIGHT) : x0
        const width = 14 + e.label.length * 6.4
        // labels that would run off the right edge sit to the left of the event instead
        const flip = x0 + width > W - RIGHT
        const start = flip ? Math.min(x0, x1end) - width : x0, end = flip ? x1end : Math.max(x1end, x0 + width)
        let row = rowsEnd.findIndex(r => r < start - 6)
        if (row < 0) { row = rowsEnd.length; rowsEnd.push(0) }
        rowsEnd[row] = end
        return { ...e, row, flip }
      })
      return { ...t, rows: Math.max(1, rowsEnd.length), events: placed }
    })
    // stack the lanes top to bottom
    return built.map((lane, i) => ({ ...lane, top: AXIS + 8 + built.slice(0, i).reduce((s, l) => s + l.rows * ROW + 14, 0) }))
  }, [events, from, to, hidden, tracks])
  const height = lanes.length ? lanes.at(-1).top + lanes.at(-1).rows * ROW + 10 : AXIS + 20
  const step = niceStep(to - from)
  const ticks = []
  for (let y = Math.ceil(from / step) * step; y <= to; y += step) ticks.push(y)

  return <div className="timeline">
    <div className="tl-controls">
      <div className="chips" role="group" aria-label="Zoom">{zooms.map((p, i) => <button key={p.label} aria-pressed={i === preset} onClick={() => setPreset(i)}>{p.label}</button>)}</div>
      <div className="chips" role="group" aria-label="Themes">{tracks.map(t => <button key={t.id} className="track-chip" aria-pressed={!hidden.includes(t.id)} style={{ '--c': t.color }}
        onClick={() => setHidden(hidden.includes(t.id) ? hidden.filter(h => h !== t.id) : [...hidden, t.id])}><span className="dot" />{t.label}</button>)}</div>
    </div>
    <div className="tl-scroll">
      <svg viewBox={`0 0 ${W} ${height}`} width={W} height={height} role="img" aria-label="Timeline of the chapter">
        {ticks.map(y => <g key={y}><line x1={x(y)} x2={x(y)} y1={AXIS - 6} y2={height} className="tl-grid" /><text x={x(y)} y={AXIS - 12} className="tl-tick">{y === 0 ? '0' : y < 0 ? `${-y} BCE` : `${y} CE`}</text></g>)}
        {from < 0 && to > 0 && <g><line x1={x(0)} x2={x(0)} y1={AXIS - 6} y2={height} className="tl-zero" /></g>}
        {lanes.map(l => <g key={l.id}>
          <rect x={0} y={l.top - 4} width={W} height={l.rows * ROW + 6} className="tl-lane" />
          <text x={10} y={l.top + 15} className="tl-lane-label" style={{ fill: l.color }}>{l.label}</text>
          {l.events.map(e => {
            const cy = l.top + e.row * ROW + 10, x0 = Math.max(LEFT, x(e.year)), on = sel === e
            const x1 = e.end != null ? Math.min(x(e.end), W - RIGHT) : null
            return <g key={`${e.ch ?? ''}-${e.year}-${e.label}`} className={`tl-event${on ? ' on' : ''}`} tabIndex={0} role="button" aria-label={`${spanText(e.year, e.end)}: ${e.label}`}
              onClick={() => setSel(e)} onKeyDown={ev => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); setSel(e) } }}>
              {x1 != null ? <rect x={x0} y={cy - 6} width={Math.max(4, x1 - x0)} height={12} rx={6} style={{ fill: l.color, opacity: on ? 1 : 0.55 }} />
                : <circle cx={x0} cy={cy} r={on ? 7 : 5.5} style={{ fill: l.color }} />}
              <text x={e.flip ? (x1 != null ? x1 - 6 : x0 - 10) : (x1 != null ? x0 + 6 : x0 + 10)} y={cy + (x1 != null ? -9 : 4.5)} textAnchor={e.flip ? 'end' : 'start'} className="tl-label">{e.label}</text>
            </g>
          })}
        </g>)}
      </svg>
    </div>
    <div className="tl-detail" aria-live="polite">
      {sel ? <><span className="eyebrow" style={{ color: TRACKS.find(t => t.id === sel.track).color }}>{spanText(sel.year, sel.end)} · {TRACKS.find(t => t.id === sel.track).label}{sel.ch ? ` · Chapter ${sel.ch}` : ''}</span><h4>{sel.label}</h4><p>{sel.detail}</p></>
        : <p className="muted">Tap any event for details. Use the zoom buttons to spread out crowded years, and the theme buttons to hide lanes.</p>}
    </div>
  </div>
}
