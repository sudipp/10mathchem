// Shared pieces for the Chapter 1-3 lessons and worksheet help.
import { useState } from 'react'
import { ArrowRight, Check, ChevronRight, Eye, EyeOff, X } from 'lucide-react'
import { ELEMENT_LIST } from './elements.js'
import { position } from './electrons.js'
import { CELL, cellOf } from './grid.js'

// Nuclear notation: mass number over atomic number, then the symbol.
export function Nuclide({ x, hideZ = false }) {
  return <span className="nuc"><span className="nuc-az"><span>{x.A}</span><span>{hideZ ? '' : x.sym === 'e' && x.Z > 0 ? `+${x.Z}` : x.Z}</span></span><span className="nuc-sym">{x.sym}</span></span>
}
export function Equation({ left, right }) {
  const side = list => list.map((x, i) => <span key={i}>{i > 0 && <span className="eq-op">+</span>}<Nuclide x={x} /></span>)
  return <span className="nuc-eq">{side(left)}<span className="eq-op">→</span>{side(right)}</span>
}

export function OrbitalDiagram({ rows, compact = false }) {
  return <div className={`orb ${compact ? 'compact' : ''}`} role="img" aria-label={rows.map(r => `${r.sub}: ${r.boxes.map(b => b || 'empty').join(' ')}`).join('; ')}>
    {rows.map(({ sub, boxes, mark }) => <div key={sub} className={`orb-sub ${mark ? 'mark' : ''}`}>
      <div className="orb-boxes">{boxes.map((b, i) => <span key={i} className="orb-box">{b}</span>)}</div>
      <span className="orb-label">{sub}</span>
    </div>)}
  </div>
}

// ---------- SVG periodic-table grid used by several animations ----------
function isDark(hex) {
  const m = /^#([0-9a-f]{6})$/i.exec(hex)
  if (!m) return false
  const n = parseInt(m[1], 16)
  return 0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255) < 120
}
export function MiniTable({ fill = () => null, text = () => null, maxZ = 118, showSymbols = true, skipF = false }) {
  return <g>{ELEMENT_LIST.filter(e => e.z <= maxZ && !(skipF && position(e.z).block === 'f')).map(e => {
    const { col, row } = cellOf(e.z)
    const x = CELL.x0 + (col - 1) * CELL.w, y = CELL.y0 + (row - 1) * CELL.h
    const f = fill(e.z)
    return <g key={e.z}>
      <rect x={x + 1} y={y + 1} width={CELL.w - 2} height={CELL.h - 2} rx="4" fill={f ?? '#ecebe3'} />
      {showSymbols && <text x={x + CELL.w / 2} y={y + CELL.h / 2 + 4} textAnchor="middle" fontSize="10" fontWeight="600" fill={!f || f === '#ecebe3' ? '#8a948c' : isDark(f) ? '#ffffff' : '#1f2c24'}>{text(e.z) ?? e.symbol}</text>}
    </g>
  })}</g>
}

// ---------- Step-by-step worksheet items ----------
// Rich content from the data files: a string, a segment, or a list of segments (see grid.js).
export function Rich({ value }) {
  if (value == null || typeof value === 'string' || typeof value === 'number') return value ?? null
  const list = Array.isArray(value) ? value : [value]
  return <>{list.map((s, i) => typeof s === 'string' ? <span key={i}>{s}</span>
    : s.eq ? <Equation key={i} left={s.eq.left} right={s.eq.right} />
      : s.nuc ? <Nuclide key={i} x={s.nuc} />
        : s.orb ? <OrbitalDiagram key={i} rows={s.orb} compact={s.compact} />
          : s.strong ? <strong key={i}>{s.strong}</strong>
            : s.muted ? <span key={i} className="muted"> {s.muted}</span> : null)}</>
}

// item: { num, prompt, kind: 'number'|'choice'|'text'|'reveal', choices, correct, accept(input) → bool, answer, steps, note, wrongHint }
export function StepItem({ item, revealAll }) {
  const [value, setValue] = useState('')
  const [picked, setPicked] = useState(null)
  const [result, setResult] = useState(null)
  const [shown, setShown] = useState(0)
  const steps = item.steps ?? []
  const all = revealAll || shown > steps.length
  const visible = all ? steps.length : shown
  const check = () => { if (value.trim()) setResult(!!item.accept(value)) }
  return <li className="ws-item step-item">
    <div className="step-head"><span className="ws-num">{item.num}.</span><div className="step-prompt"><Rich value={item.prompt} /></div></div>
    {item.kind === 'choice' && <div className="step-choices" role="group" aria-label={`Choices for ${item.num}`}>
      {item.choices.map((c, i) => <button key={i} className="ws-btn" aria-pressed={picked === i} onClick={() => { setPicked(i); setResult(i === item.correct) }}><Rich value={c} /></button>)}
    </div>}
    {(item.kind === 'number' || item.kind === 'text') && <div className="ws-item-row step-input">
      <input aria-label={`Your answer for ${item.num}`} value={value} placeholder={item.placeholder ?? (item.kind === 'number' ? 'Your answer, e.g. 3.2e-19' : 'Your answer')}
        onChange={e => { setValue(e.target.value); setResult(null) }} onKeyDown={e => e.key === 'Enter' && check()} />
      <button className="ws-btn" onClick={check} disabled={!value.trim()}>Check</button>
    </div>}
    {result !== null && <p className={`ws-result ${result ? 'ok' : ''}`} role="status">{result ? <><Check size={14} /> Correct!</> : <><X size={14} /> {item.wrongHint ?? 'Not yet. Reveal a step to see where it went a different way.'}</>}</p>}
    <div className="ws-actions step-actions">
      {steps.length > 0 && !all && <button className="ws-btn" onClick={() => setShown(shown + 1)}><ChevronRight size={14} /> {shown < steps.length ? `Show step ${shown + 1} of ${steps.length}` : 'Show the answer'}</button>}
      <button className="ws-btn ghost" aria-expanded={all} onClick={() => setShown(all ? 0 : steps.length + 1)}>{all ? 'Hide' : 'Answer'}</button>
    </div>
    {(visible > 0 || all) && <div className="ws-answer">
      {visible > 0 && <ol className="step-list">{steps.slice(0, visible).map((s, i) => <li key={i}><Rich value={s} /></li>)}</ol>}
      {all && <div className="step-final"><span className="eyebrow">ANSWER</span><div><Rich value={item.answer} /></div></div>}
      {all && item.note && <p className="ws-note">{item.note}</p>}
    </div>}
  </li>
}

export function StepPart({ title, hint, items }) {
  const [revealAll, setRevealAll] = useState(false)
  return <section className="ws-part">
    <div className="ws-part-head"><div><h3>{title}</h3>{hint && <p>{hint}</p>}</div><button className="ws-btn" onClick={() => setRevealAll(!revealAll)}>{revealAll ? <><EyeOff size={14} /> Hide all answers</> : <><Eye size={14} /> Show all answers</>}</button></div>
    <ol className="ws-list step-grid">{items.map((item, i) => <StepItem key={`${item.num}-${i}`} item={item} revealAll={revealAll} />)}</ol>
  </section>
}

export function ReviewLink({ onClick, children }) {
  return <button className="text-link" onClick={onClick}>{children} <ArrowRight size={14} /></button>
}

export function RefTable({ title, head, rows, note }) {
  return <div className="ref-table"><span className="eyebrow">{title}</span>
    <table><thead><tr>{head.map(h => <th key={h}>{h}</th>)}</tr></thead>
      <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody></table>
    {note && <small>{note}</small>}
  </div>
}
