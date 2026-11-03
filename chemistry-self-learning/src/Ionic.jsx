import { useState } from 'react'
import { ArrowRight, Check, Eye, EyeOff, X } from 'lucide-react'
import { ANIONS, CATIONS, WORKSHEET, charge, ionic, pretty } from './ionic.js'

const CHAR_W = 50

// Criss-cross picture. step 0: ions and charges · 1: arrows and subscripts ·
// 2: formula · 3: reduce or check · 4: name.
export function CrissCross({ cat, an, step, label }) {
  const r = ionic(cat, an)
  const catEnd = 250, anStart = 350
  const anEnd = anStart + CHAR_W * an.length
  const catCharge = { x: catEnd + 6, y: 86 }, anCharge = { x: anEnd + 6, y: 86 }
  const catSub = { x: catEnd + 8, y: 168 }, anSub = { x: anEnd + 8, y: 168 }
  const total = r.sub[0] * r.c.charge + r.sub[1] * r.a.charge
  const line3 = r.cancels ? `${charge(r.c.charge)} and ${charge(r.a.charge)} already cancel`
    : r.g > 1 ? `Reduce: ÷ ${r.g}  →  ${pretty(r.formula)}`
      : `Check: ${r.sub[0]}(${charge(r.c.charge)}) + ${r.sub[1]}(${charge(r.a.charge)}) = ${total}  ✓`
  return <svg viewBox="0 0 600 320" role="img" aria-label={label ?? `${r.c.name} and ${r.a.element}: ${pretty(r.formula)}, ${r.name}`}>
    <defs>
      <marker id="cc-arrow-a" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#CC5833" /></marker>
      <marker id="cc-arrow-b" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#3d6b9a" /></marker>
    </defs>
    <text x={catEnd} y="150" textAnchor="end" className="ion-symbol">{cat}</text>
    <text x={anStart} y="150" textAnchor="start" className="ion-symbol">{an}</text>
    <text x={catCharge.x} y={catCharge.y} className="ion-charge ion-a">{charge(r.c.charge)}</text>
    <text x={anCharge.x} y={anCharge.y} className="ion-charge ion-b">{charge(r.a.charge)}</text>
    {step >= 1 && !r.cancels && <g className="cc-arrows">
      <path d={`M${catCharge.x + 16} ${catCharge.y + 8} C ${catCharge.x + 70} ${catCharge.y + 20}, ${anSub.x - 40} ${anSub.y - 40}, ${anSub.x + 4} ${anSub.y - 20}`} stroke="#CC5833" markerEnd="url(#cc-arrow-a)" />
      <path d={`M${anCharge.x + 10} ${anCharge.y + 8} C ${anCharge.x - 40} ${anCharge.y + 30}, ${catSub.x + 60} ${catSub.y - 50}, ${catSub.x + 6} ${catSub.y - 20}`} stroke="#3d6b9a" markerEnd="url(#cc-arrow-b)" />
      <text x={catSub.x} y={catSub.y} className="ion-sub ion-b">{r.raw[0]}</text>
      <text x={anSub.x} y={anSub.y} className="ion-sub ion-a">{r.raw[1]}</text>
    </g>}
    {step >= 2 && <text x="300" y="232" textAnchor="middle" className="ion-formula">{r.cancels ? pretty(r.formula) : r.g > 1 || r.sub.some(s => s === 1) ? `${pretty(r.crossed)}  →  ${pretty(r.formula)}` : pretty(r.formula)}</text>}
    {step >= 3 && <text x="300" y="268" textAnchor="middle" className="diagram-caption">{line3}</text>}
    {step >= 4 && <text x="300" y="304" textAnchor="middle" className="ion-name">{r.name}</text>}
  </svg>
}

export function IonChargeTable() {
  const cats = [['Group 1', '+1', 'Li, Na, K'], ['Group 2', '+2', 'Mg, Ca'], ['Group 13', '+3', 'Al'], ['Always', '+2', 'Zn, Cd'], ['Always', '+1', 'Ag']]
  const ans = [['Group 15', '−3', 'N, P'], ['Group 16', '−2', 'O, S'], ['Group 17', '−1', 'F, Cl, Br, I']]
  const row = ([g, c, ex], cls) => <div key={g + ex} className={`ion-chip ${cls}`}><strong>{c}</strong><span>{g}</span><small>{ex}</small></div>
  return <div className="ref-table ion-table">
    <span className="eyebrow">TYPE I ION CHARGES</span>
    <div className="ion-rows"><span className="ion-label">Cations (metals lose e⁻)</span>{cats.map(c => row(c, 'pos'))}</div>
    <div className="ion-rows"><span className="ion-label">Anions (nonmetals gain e⁻)</span>{ans.map(a => row(a, 'neg'))}</div>
  </div>
}

function stepsFor(r) {
  const s = [
    <><strong>Charges:</strong> {r.c.name} is {r.c.why} → {r.cat}{charge(r.c.charge)}. {r.a.element[0].toUpperCase() + r.a.element.slice(1)} is {r.a.why} → {r.an}{charge(r.a.charge)}.</>,
    r.cancels
      ? <><strong>The charges cancel</strong> ({charge(r.c.charge)} and {charge(r.a.charge)}), so just write the symbols, cation first: <strong>{pretty(r.formula)}</strong>.</>
      : <><strong>Criss-cross:</strong> the {r.raw[0]} from {r.an} becomes {r.cat}’s subscript, and the {r.raw[1]} from {r.cat} becomes {r.an}’s subscript: {pretty(r.crossed)}.</>,
  ]
  if (!r.cancels) s.push(r.g > 1
    ? <><strong>Reduce:</strong> both subscripts divide by {r.g}: <strong>{pretty(r.formula)}</strong>.</>
    : <><strong>Write it neatly</strong> (a subscript of 1 is not written): <strong>{pretty(r.formula)}</strong>. Check: {r.sub[0]}({charge(r.c.charge)}) + {r.sub[1]}({charge(r.a.charge)}) = 0 ✓</>)
  s.push(<><strong>Name:</strong> cation name + anion root + <em>-ide</em>: <strong>{r.name}</strong>. Ionic names never use prefixes.</>)
  return s
}

const normalize = s => s.toLowerCase().replace(/\s+/g, ' ').trim()
const normalizeFormula = s => s.replace(/[₀-₉]/g, d => String(d.charCodeAt(0) - 8320)).replace(/\s+/g, '')

function Detail({ cat, an, onDone }) {
  const r = ionic(cat, an)
  const steps = stepsFor(r)
  const [shown, setShown] = useState(0)
  const [f, setF] = useState(''), [n, setN] = useState('')
  const [result, setResult] = useState(null)
  const reveal = k => { setShown(k); if (k >= steps.length) onDone() }
  const check = () => {
    const okF = normalizeFormula(f) === r.formula, okN = normalize(n) === r.name
    setResult({ okF, okN })
    if (okF && okN) onDone()
  }
  return <div className="ionic-detail">
    <div className="ionic-detail-head"><span className="eyebrow">{CATIONS[cat].name.toUpperCase()} + {ANIONS[an].element.toUpperCase()}</span><h3>{cat}{charge(r.c.charge)} and {an}{charge(r.a.charge)}</h3></div>
    <div className="ionic-try">
      <label>Formula<input value={f} placeholder="e.g. Li2O" onChange={e => { setF(e.target.value); setResult(null) }} onKeyDown={e => e.key === 'Enter' && check()} /></label>
      <label>Name<input value={n} placeholder="e.g. lithium oxide" onChange={e => { setN(e.target.value); setResult(null) }} onKeyDown={e => e.key === 'Enter' && check()} /></label>
      <button className="ws-btn primary" onClick={check} disabled={!f.trim() && !n.trim()}>Check</button>
    </div>
    {result && <p className={`ws-result ${result.okF && result.okN ? 'ok' : ''}`} role="status">{result.okF && result.okN ? <><Check size={14} /> Both correct!</> : <><X size={14} /> {[!result.okF && 'Formula: check the criss-cross and reduce.', !result.okN && 'Name: cation name, then the anion ending in -ide.'].filter(Boolean).join(' ')}</>}</p>}
    {shown > 0 && <div className="drawing ionic-drawing"><CrissCross cat={cat} an={an} step={shown >= steps.length ? 4 : r.cancels ? [0, 0, 3][shown] : [0, 0, 1, 3][shown]} /></div>}
    {shown > 0 && <ol className="ws-steps ionic-steps">{steps.slice(0, shown).map((s, i) => <li key={i}><p>{s}</p></li>)}</ol>}
    <div className="ws-actions">
      {shown < steps.length && <button className="ws-btn primary" onClick={() => reveal(shown + 1)}>{shown === 0 ? 'Show step 1' : 'Next step'} <ArrowRight size={14} /></button>}
      {shown < steps.length && <button className="ws-btn" onClick={() => reveal(steps.length)}><Eye size={14} /> Show all steps</button>}
      {shown > 0 && <button className="ws-btn ghost" onClick={() => setShown(0)}><EyeOff size={14} /> Hide steps</button>}
    </div>
  </div>
}

export function IonicGrid() {
  const [sel, setSel] = useState(['Ca', 'Cl'])
  const [done, setDone] = useState(() => new Set([WORKSHEET.example]))
  const [all, setAll] = useState(false)
  const key = (c, a) => `${c}-${a}`
  return <div className="ionic-grid-wrap">
    <div className="ws-part-head"><div><h3>Type I Nomenclature WS</h3><p>Pick a box. Try the formula and name yourself, then check or reveal the steps. Li₂O is the worked example from the sheet.</p></div>
      <button className="ws-btn" onClick={() => setAll(!all)}>{all ? <><EyeOff size={14} /> Hide answers</> : <><Eye size={14} /> Show all 30 answers</>}</button></div>
    <div className="ionic-table-scroll"><table className="ionic-table">
      <thead><tr><th />{WORKSHEET.anions.map(a => <th key={a}>{a}{charge(ANIONS[a].charge)}</th>)}</tr></thead>
      <tbody>{WORKSHEET.cations.map(c => <tr key={c}><th>{c}{charge(CATIONS[c].charge)}</th>{WORKSHEET.anions.map(a => {
        const r = ionic(c, a), show = all || done.has(key(c, a)), on = sel[0] === c && sel[1] === a
        return <td key={a}><button className={`ionic-cell ${on ? 'on' : ''} ${show ? 'solved' : ''}`} aria-pressed={on} aria-label={`${c} and ${a}${show ? `: ${r.formula}, ${r.name}` : ''}`} onClick={() => setSel([c, a])}>
          {show ? <><strong>{pretty(r.formula)}</strong><span>{r.name}</span></> : <span className="ionic-q">?</span>}
        </button></td>
      })}</tr>)}</tbody>
    </table></div>
    <Detail key={key(...sel)} cat={sel[0]} an={sel[1]} onDone={() => setDone(prev => new Set(prev).add(key(...sel)))} />
  </div>
}
