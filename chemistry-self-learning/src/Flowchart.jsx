import { useState } from 'react'
import { ArrowRight, Eye, RotateCcw } from 'lucide-react'
import { ALKANE, DIATOMIC, FLOWCHART_EXAMPLES, PREFIX, QUESTIONS, SHORT_QUESTIONS as SHORT_Q, acidFromIon, nameFormula } from './nomenclature.js'
import { pretty } from './ionic.js'

// **bold** markup used in the engine's explanations.
const rich = text => String(text).split(/\*\*(.+?)\*\*/g).map((s, i) => i % 2 ? <strong key={i}>{s}</strong> : s)

// Flow Chart II layout: questions, outcomes, and the two "check first" special cases.
const NODES = {
  h: { x: 300, y: 58, w: 150, text: ['1st element H?'] },
  three: { x: 300, y: 118, w: 170, text: ['3 or more elements?'] },
  metal: { x: 150, y: 176, w: 160, text: ['1st element a metal?'] },
  tm3: { x: 455, y: 176, w: 150, text: ['Transition metal?'] },
  tm2: { x: 228, y: 232, w: 150, text: ['Transition metal?'] },
  acid: { x: 510, y: 58, w: 120, text: ['Acid'], leaf: true },
  binMol: { x: 62, y: 290, w: 106, text: ['Binary', 'molecular'], leaf: true },
  binIon: { x: 174, y: 290, w: 106, text: ['Binary', 'ionic'], leaf: true },
  binIonTM: { x: 286, y: 290, w: 106, text: ['Binary ionic', '+ Roman numeral'], leaf: true },
  poly: { x: 412, y: 290, w: 106, text: ['Ionic with a', 'polyatomic ion'], leaf: true },
  polyTM: { x: 530, y: 290, w: 120, text: ['Polyatomic', '+ Roman numeral'], leaf: true },
  diatomic: { x: 78, y: 58, w: 132, text: ['One element × 2?', '→ diatomic'], pre: true },
  alkane: { x: 78, y: 118, w: 132, text: ['Only C and H?', '→ alkane (-ane)'], pre: true },
}
const EDGES = [['h', 'acid', true], ['h', 'three', false], ['three', 'metal', false], ['three', 'tm3', true], ['metal', 'binMol', false], ['metal', 'tm2', true], ['tm2', 'binIon', false], ['tm2', 'binIonTM', true], ['tm3', 'poly', false], ['tm3', 'polyTM', true]]
const nodeOf = (q, path) => q === 'tm' ? (path.find(p => p.q === 'three')?.yes ? 'tm3' : 'tm2') : q
const half = id => (NODES[id].leaf || NODES[id].pre) && NODES[id].text.length > 1 ? 20 : 17

export function FlowchartDiagram({ result, title }) {
  const path = result?.ok ? result.path : []
  const visited = new Set(path.map(p => nodeOf(p.q, path)))
  const used = new Set(path.map(p => `${nodeOf(p.q, path)}-${p.yes}`))
  const end = result?.ok ? result.outcome : null
  const label = result?.ok ? `${result.pretty}: ${path.map(p => `${SHORT_Q[p.q]} ${p.yes ? 'yes' : 'no'}`).join(', ')}${path.length ? ', so ' : ''}${result.label.toLowerCase()}: ${result.name}` : 'Nomenclature flowchart: formula to name'
  return <svg viewBox="0 0 600 320" role="img" aria-label={label} className="flowchart-svg">
    <defs>
      <marker id="fc-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#c9cdbf" /></marker>
      <marker id="fc-arrow-on" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#cc5833" /></marker>
    </defs>
    {title && <text x="300" y="22" className="fc-title">{title}</text>}
    {EDGES.map(([a, b, yes]) => {
      const A = NODES[a], B = NODES[b], on = used.has(`${a}-${yes}`)
      const horizontal = A.y === B.y
      const [x1, y1] = horizontal ? [A.x + A.w / 2, A.y] : [A.x, A.y + half(a)]
      const [x2, y2] = horizontal ? [B.x - B.w / 2 - 2, B.y] : [B.x, B.y - half(b) - 2]
      return <g key={`${a}-${b}`} className={`fc-edge ${on ? 'on' : ''}`}>
        <line x1={x1} y1={y1} x2={x2} y2={y2} markerEnd={on ? 'url(#fc-arrow-on)' : 'url(#fc-arrow)'} />
        <text x={x1 + (x2 - x1) * (horizontal ? 0.5 : 0.4) + (horizontal ? 0 : yes ? 14 : -14)} y={y1 + (y2 - y1) * (horizontal ? 0.5 : 0.4) + (horizontal ? -6 : 4)} className="fc-yes">{yes ? 'Yes' : 'No'}</text>
      </g>
    })}
    {Object.entries(NODES).map(([id, n]) => {
      const h = half(id) * 2
      const cls = n.pre ? (end === id ? 'end' : 'pre') : n.leaf ? (end === id ? 'end' : 'leaf') : visited.has(id) ? 'on' : 'q'
      return <g key={id} className={`fc-node ${cls}`}>
        <rect x={n.x - n.w / 2} y={n.y - h / 2} width={n.w} height={h} rx={n.leaf || n.pre ? 12 : h / 2} />
        {n.text.map((t, i) => <text key={i} x={n.x} y={n.y + 4 + (i - (n.text.length - 1) / 2) * 13}>{t}</text>)}
      </g>
    })}
    <text x="78" y="148" className="fc-note">check these first</text>
  </svg>
}

// Inline explanation for the practice answers: the questions, then the rule.
export function Explain({ r }) {
  return <>{r.path.map((p, i) => <span key={i}>{SHORT_Q[p.q]} <strong>{p.yes ? 'Yes' : 'No'}</strong> ({p.why}). </span>)}<strong>{r.label}.</strong> {r.steps.map((s, i) => <span key={`s${i}`}>{rich(s)} </span>)}</>
}

export function FlowchartReference() {
  const acids = [['SO₄⁻²', 'sulfate'], ['SO₃⁻²', 'sulfite'], ['NO₃⁻¹', 'nitrate'], ['NO₂⁻¹', 'nitrite'], ['PO₄⁻³', 'phosphate'], ['C₂H₃O₂⁻¹', 'acetate']]
  return <div className="ref-table fc-ref">
    <span className="eyebrow">NOMENCLATURE FLOWCHART · CLASS NOTES</span>
    <div className="fc-cards">
      <div><h4>Acids (start with H)</h4><p><strong>Binary</strong> (H + 1 element): hydro- + stem + -ic + acid. H₂S → hydrosulfuric acid, HCl → hydrochloric acid.</p><p><strong>Ternary</strong> (H + polyatomic ion): no hydro-! -ate → -ic, -ite → -ous.</p>
        <table><tbody>{acids.map(([f, n]) => <tr key={n}><td>{f} {n}</td><td><strong>{acidFromIon(n)} acid</strong></td></tr>)}</tbody></table></div>
      <div><h4>Bases (hydroxides)</h4><p>A metal + OH⁻¹. Name the cation, then <strong>hydroxide</strong>: NaOH → sodium hydroxide, Ca(OH)₂ → calcium hydroxide.</p>
        <h4>Diatomic “Lucky 7”</h4><p>{DIATOMIC.map(s => `${s}₂`).join(', ')}: single elements that travel in pairs. Start at element 7 (N) and trace a 7 on the periodic table, plus H. Name = the element.</p></div>
      <div><h4>Transition-metal exceptions</h4><p><strong>Ag⁺¹, Cd⁺², Zn⁺²</strong> are transition metals with one charge: <strong>no</strong> Roman numeral. <strong>Pb</strong> and <strong>Sn</strong> are not transition metals but form more than one charge: they <strong>need</strong> one.</p>
        <h4>Binary molecular</h4><p>Two nonmetals, no charges: prefixes for the amounts, 2nd element ends in -ide, never mono- on the 1st. NO₂ → nitrogen dioxide.</p></div>
    </div>
    <div className="ws-table-wrap"><table>
      <thead><tr><th>#</th>{PREFIX.slice(1).map((_, i) => <th key={i}>{i + 1}</th>)}</tr></thead>
      <tbody>
        <tr><td>Molecular prefix</td>{PREFIX.slice(1).map(p => <td key={p}>{p}</td>)}</tr>
        <tr><td>Hydrocarbon prefix</td>{ALKANE.slice(1).map(p => <td key={p}>{p}</td>)}</tr>
      </tbody>
    </table><small>Hydrocarbons: carbon + hydrogen (fuels). Alkanes have single bonds only (CₙH₂ₙ₊₂) and end in -ane: C₃H₈ → propane. Alkenes (double) and alkynes (triple) exist too, but we only name alkanes.</small></div>
  </div>
}

// Type a formula, then reveal the flowchart questions one at a time.
export function FlowchartWalker() {
  const [value, setValue] = useState('Fe2O3')
  const [result, setResult] = useState(() => nameFormula('Fe2O3'))
  const [shown, setShown] = useState(0)
  const run = f => { setValue(f); setResult(nameFormula(f)); setShown(0) }
  const total = result.ok ? result.path.length + result.steps.length + 1 : 0
  const pathShown = result.ok ? result.path.slice(0, shown) : []
  const partial = result.ok ? { ...result, path: pathShown, outcome: shown > result.path.length ? result.outcome : null } : result
  return <section className="ws-part fc-walker">
    <div className="ws-part-head"><div><h3>Walk the flowchart</h3><p>Type a formula (numbers normally: Fe2O3, Mg(NO3)2) or pick one from the class notes. Answer each question yourself, then reveal it.</p></div></div>
    <div className="fc-input">
      <input aria-label="Formula" value={value} placeholder="Formula, e.g. H2SO4" onChange={e => setValue(e.target.value)} onKeyDown={e => e.key === 'Enter' && run(value)} />
      <button className="ws-btn primary" onClick={() => run(value)}>Start <ArrowRight size={14} /></button>
    </div>
    <div className="fc-chips" role="group" aria-label="Class-notes examples">{FLOWCHART_EXAMPLES.map(f => <button key={f} className="ws-btn" aria-pressed={result.formula === f} onClick={() => run(f)}>{pretty(f)}</button>)}</div>
    {!result.ok ? <p className="ws-result" role="status">{result.error}</p> : <div className="fc-work">
      <div className="ionic-drawing"><FlowchartDiagram result={partial} title={`${result.pretty}${shown >= total ? ` → ${result.name}` : ''}`} /></div>
      <ol className="fc-steps">
        {pathShown.map((p, i) => <li key={`q${i}`}><strong>{QUESTIONS[p.q]}</strong> {p.yes ? 'Yes' : 'No'}: {p.why}.</li>)}
        {shown > result.path.length && <li className="fc-outcome">→ <strong>{result.label}</strong></li>}
        {result.steps.slice(0, Math.max(0, shown - result.path.length - 1)).map((s, i) => <li key={`s${i}`}>{rich(s)}</li>)}
      </ol>
      {shown >= total && <p className="fc-answer" role="status">{result.pretty} = <strong>{result.name}</strong></p>}
      <div className="ws-actions">
        {shown < total && <button className="ws-btn primary" onClick={() => setShown(shown + 1)}>{shown === 0 ? (result.path.length ? `First question: ${SHORT_Q[result.path[0].q]}` : 'Show step 1') : 'Next step'} <ArrowRight size={14} /></button>}
        {shown < total && <button className="ws-btn" onClick={() => setShown(total)}><Eye size={14} /> Show everything</button>}
        {shown > 0 && <button className="ws-btn ghost" onClick={() => setShown(0)}><RotateCcw size={14} /> Start over</button>}
      </div>
    </div>}
  </section>
}
