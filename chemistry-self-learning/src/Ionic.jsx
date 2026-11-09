import { useState } from 'react'
import { ArrowRight, Check, Eye, EyeOff, X } from 'lucide-react'
import { OLD_NAMES, POLYATOMIC, TYPE2, WORKSHEET, charge, ionic, pretty, reverseCharge } from './ionic.js'

const CHAR_W = 50

// Criss-cross picture. step 0: ions and charges · 1: arrows and subscripts ·
// 2: formula · 3: reduce or check · 4: name.
export function CrissCross({ cat, an, step, label }) {
  const r = ionic(cat, an)
  const catEnd = 250, anStart = 350
  const catText = pretty(r.c.sym), anText = r.a.poly ? `(${pretty(r.a.sym)})` : pretty(r.a.sym)
  const anEnd = anStart + CHAR_W * (r.a.sym.replace(/\d/g, '').length + r.a.sym.replace(/\D/g, '').length * 0.55 + (r.a.poly ? 1.1 : 0))
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
    <text x={catEnd} y="150" textAnchor="end" className="ion-symbol">{catText}</text>
    <text x={anStart} y="150" textAnchor="start" className="ion-symbol">{anText}</text>
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

const cap = s => s[0].toUpperCase() + s.slice(1)
function stepsFor(r) {
  const ionText = io => `${pretty(io.sym)}${charge(io.charge)}`
  const s = [
    <><strong>Charges:</strong> {r.c.element} is {r.c.why} → {ionText(r.c)}. {cap(r.a.element)} is {r.a.why} → {ionText(r.a)}.</>,
    r.cancels
      ? <><strong>The charges cancel</strong> ({charge(r.c.charge)} and {charge(r.a.charge)}), so just write the symbols, cation first: <strong>{pretty(r.formula)}</strong>.</>
      : <><strong>Criss-cross:</strong> the {r.raw[0]} from {pretty(r.a.sym)} becomes {pretty(r.c.sym)}’s subscript, and the {r.raw[1]} from {pretty(r.c.sym)} becomes {pretty(r.a.sym)}’s subscript: {pretty(r.crossed)}.{r.poly && (r.raw[0] > 1 && r.c.poly || r.raw[1] > 1 && r.a.poly) && <> A polyatomic ion goes in <strong>parentheses</strong> when you need more than one of it.</>}</>,
  ]
  if (!r.cancels) s.push(r.g > 1
    ? <><strong>Reduce:</strong> both subscripts divide by {r.g}: <strong>{pretty(r.formula)}</strong>.{r.poly && <> (Only the outside subscripts change; never the numbers inside a polyatomic ion.)</>}</>
    : <><strong>Write it neatly</strong> (a subscript of 1 is not written): <strong>{pretty(r.formula)}</strong>. Check: {r.sub[0]}({charge(r.c.charge)}) + {r.sub[1]}({charge(r.a.charge)}) = 0 ✓</>)
  const ending = r.a.poly ? <>the polyatomic ion keeps its own name (no <em>-ide</em> change)</> : <>anion root + <em>-ide</em></>
  s.push(r.c.type2
    ? <><strong>Name:</strong> metal name + Roman numeral for its charge ({charge(r.c.charge)} → {r.c.name.match(/\(.*\)/)[0]}) + {ending}: <strong>{r.name}</strong>.</>
    : <><strong>Name:</strong> cation name + {ending}: <strong>{r.name}</strong>.{r.c.poly ? '' : ' Ionic names never use prefixes, and this metal needs no Roman numeral (it has only one charge).'}</>)
  return s
}

// Formula → name for a Type II metal: work the charge out backwards from the anion.
export function BackSteps({ r }) {
  const n = r.sub[0], m = r.sub[1]
  return <>{pretty(r.a.sym)} is {charge(r.a.charge)}{m > 1 ? `, and there ${'are'} ${m} of them: ${m} × (${r.a.charge}) = ${m * r.a.charge}` : ''}. The total must be 0, so {n > 1 ? `${n} ${r.c.sym} atoms` : `the ${r.c.sym}`} must add up to +{Math.abs(r.a.charge) * m}: {n > 1 ? `${n}x + (${m * r.a.charge}) = 0 → x = +${reverseCharge(r)}` : `x + (${m * r.a.charge}) = 0 → x = +${reverseCharge(r)}`}. So it is {r.c.name.replace(/\(.*\)/, '')}<strong>{r.c.name.match(/\(.*\)/)[0]}</strong>.</>
}

const normalize = s => s.toLowerCase().replace(/\s+/g, ' ').trim()
const normalizeFormula = s => s.replace(/[₀-₉]/g, d => String(d.charCodeAt(0) - 8320)).replace(/\s+/g, '')

function Detail({ cat, an, ws, onDone }) {
  const r = ionic(cat, an)
  const steps = stepsFor(r)
  const [shown, setShown] = useState(0)
  const [f, setF] = useState(''), [n, setN] = useState('')
  const [result, setResult] = useState(null)
  const reveal = k => { setShown(k); if (k >= steps.length) onDone() }
  const check = () => {
    const okF = normalizeFormula(f) === r.formula, okN = normalize(n).replace(/\s*\(/g, '(') === r.name.toLowerCase()
    setResult({ okF, okN })
    if (okF && okN) onDone()
  }
  return <div className="ionic-detail">
    <div className="ionic-detail-head"><span className="eyebrow">{r.c.element.toUpperCase()} + {r.a.element.toUpperCase()}</span><h3>{pretty(r.c.sym)}{charge(r.c.charge)} and {pretty(r.a.sym)}{charge(r.a.charge)}</h3></div>
    <div className="ionic-try">
      <label>Formula<input value={f} placeholder={`e.g. ${ws.exampleText.replace(/[₀-₉]/g, d => String(d.charCodeAt(0) - 8320))}`} onChange={e => { setF(e.target.value); setResult(null) }} onKeyDown={e => e.key === 'Enter' && check()} /></label>
      <label>Name<input value={n} placeholder={`e.g. ${ionic(...ws.example.split(/-(?=[A-Z])/)).name}`} onChange={e => { setN(e.target.value); setResult(null) }} onKeyDown={e => e.key === 'Enter' && check()} /></label>
      <button className="ws-btn primary" onClick={check} disabled={!f.trim() && !n.trim()}>Check</button>
    </div>
    {result && <p className={`ws-result ${result.okF && result.okN ? 'ok' : ''}`} role="status">{result.okF && result.okN ? <><Check size={14} /> Both correct!</> : <><X size={14} /> {[!result.okF && 'Formula: check the criss-cross and reduce.', !result.okN && (r.c.type2 ? 'Name: metal name, Roman numeral for its charge, then the anion ending in -ide.' : 'Name: cation name, then the anion ending in -ide.')].filter(Boolean).join(' ')}</>}</p>}
    {shown > 0 && <div className="drawing ionic-drawing"><CrissCross cat={cat} an={an} step={shown >= steps.length ? 4 : r.cancels ? [0, 0, 3][shown] : [0, 0, 1, 3][shown]} /></div>}
    {shown > 0 && <ol className="ws-steps ionic-steps">{steps.slice(0, shown).map((s, i) => <li key={i}><p>{s}</p></li>)}</ol>}
    <div className="ws-actions">
      {shown < steps.length && <button className="ws-btn primary" onClick={() => reveal(shown + 1)}>{shown === 0 ? 'Show step 1' : 'Next step'} <ArrowRight size={14} /></button>}
      {shown < steps.length && <button className="ws-btn" onClick={() => reveal(steps.length)}><Eye size={14} /> Show all steps</button>}
      {shown > 0 && <button className="ws-btn ghost" onClick={() => setShown(0)}><EyeOff size={14} /> Hide steps</button>}
    </div>
  </div>
}

export function IonicGrid({ ws = WORKSHEET, start = ['Ca', 'Cl'] }) {
  const [sel, setSel] = useState(start)
  const [done, setDone] = useState(() => new Set([ws.example]))
  const [all, setAll] = useState(false)
  const key = (c, a) => `${c}-${a}`
  return <div className="ionic-grid-wrap">
    <div className="ws-part-head"><div><h3>{ws.title}</h3><p>Pick a box. Try the formula and name yourself, then check or reveal the steps. {ws.exampleText} is the worked example from the sheet.</p></div>
      <button className="ws-btn" onClick={() => setAll(!all)}>{all ? <><EyeOff size={14} /> Hide answers</> : <><Eye size={14} /> Show all {ws.cations.length * ws.anions.length} answers</>}</button></div>
    <div className="ionic-table-scroll"><table className="ionic-table">
      <thead><tr><th />{ws.anions.map(a => <th key={a}>{a}{charge(ionic(ws.cations[0], a).a.charge)}</th>)}</tr></thead>
      <tbody>{ws.cations.map(c => <tr key={c}><th>{ionic(c, ws.anions[0]).c.sym}{charge(ionic(c, ws.anions[0]).c.charge)}</th>{ws.anions.map(a => {
        const r = ionic(c, a), show = all || done.has(key(c, a)), on = sel[0] === c && sel[1] === a
        return <td key={a}><button className={`ionic-cell ${on ? 'on' : ''} ${show ? 'solved' : ''}`} aria-pressed={on} aria-label={`${c} and ${a}${show ? `: ${r.formula}, ${r.name}` : ''}`} onClick={() => setSel([c, a])}>
          {show ? <><strong>{pretty(r.formula)}</strong><span>{r.name}</span></> : <span className="ionic-q">?</span>}
        </button></td>
      })}</tr>)}</tbody>
    </table></div>
    <Detail key={key(...sel)} cat={sel[0]} an={sel[1]} ws={ws} onDone={() => setDone(prev => new Set(prev).add(key(...sel)))} />
  </div>
}

export function Type2Table() {
  const common = [['Cu', [1, 2]], ['Fe', [2, 3]], ['Pb', [2, 4]], ['Sn', [2, 4]], ['Mn', [2, 4]], ['Cr', [2, 3]], ['Au', [1, 3]], ['Ni', [2, 3]]]
  const roman = ['', 'I', 'II', 'III', 'IV']
  return <div className="ref-table ion-table">
    <span className="eyebrow">TYPE II METALS · THE ROMAN NUMERAL IS THE CHARGE</span>
    <div className="ion-rows"><span className="ion-label">Common charges</span>{common.map(([s, cs]) => <div key={s} className="ion-chip pos"><strong>{s}</strong><span>{TYPE2[s]}</span><small>{cs.map(c => `${charge(c)} ${TYPE2[s]}(${roman[c]})`).join(' · ')}</small></div>)}</div>
    <div className="ion-rows"><span className="ion-label">Old names (-ous lower, -ic higher)</span>{OLD_NAMES.map(([s, c, old]) => <div key={old} className="ion-chip neg"><strong>{s}{charge(c)}</strong><span>{old}</span><small>{TYPE2[s]}({roman[c]})</small></div>)}</div>
  </div>
}

export function PolyatomicTable() {
  const groups = [-1, -2, -3, 1].map(c => [c, Object.entries(POLYATOMIC).filter(([, v]) => v.charge === c)])
  return <div className="ref-table ion-table">
    <span className="eyebrow">POLYATOMIC IONS · KEEP THEM TOGETHER</span>
    {groups.map(([c, list]) => <div key={c} className="ion-rows"><span className="ion-label">{c > 0 ? 'Positive' : `Charge ${charge(c)}`}</span>{list.map(([s, v]) => <div key={s} className={`ion-chip ${c > 0 ? 'pos' : 'neg'}`}><strong>{pretty(s)}{charge(v.charge)}</strong><span>{v.name}</span></div>)}</div>)}
  </div>
}