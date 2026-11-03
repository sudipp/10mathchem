import { useEffect, useState } from 'react'
import { ArrowRight, CalendarClock, Check, Eye, EyeOff, X } from 'lucide-react'
import { IonChargeTable, IonicGrid } from './Ionic.jsx'
import { NOTES_FORMULA_TO_NAME, NOTES_NAME_TO_FORMULA, charge, ionic, pretty } from './ionic.js'
import { CHAPTERS, WORKSHEETS, dueInfo } from './chapters.js'

const sub = text => String(text).replace(/\d/g, d => '₀₁₂₃₄₅₆₇₈₉'[d])

const SIDES = { top: [0, -1], right: [1, 0], bottom: [0, 1], left: [-1, 0] }
const OPPOSITE = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' }
const PERPENDICULAR = { top: ['left', 'right'], bottom: ['left', 'right'], left: ['top', 'bottom'], right: ['top', 'bottom'] }

function LewisStructure({ spec, label }) {
  const c = [160, 110], d = 68
  const at = side => [c[0] + SIDES[side][0] * d, c[1] + SIDES[side][1] * d]
  const pairs = (x, y, sides) => sides.map(side => {
    const [dx, dy] = SIDES[side]
    const px = x + dx * 20, py = y + dy * 20
    return [-5, 5].map(s => <circle key={`${x}${y}${side}${s}`} cx={px + (dx === 0 ? s : 0)} cy={py + (dy === 0 ? s : 0)} r="2.8" fill="#CC5833" />)
  })
  const used = spec.outer.map(o => o.side)
  const centerFree = ['top', 'bottom', 'left', 'right'].filter(s => !used.includes(s)).slice(0, spec.centerLP ?? 0)
  const points = [c, ...spec.outer.map(o => at(o.side))]
  const xs = points.map(p => p[0]), ys = points.map(p => p[1])
  const box = [Math.min(...xs) - 36, Math.min(...ys) - 36, Math.max(...xs) + 36, Math.max(...ys) + 36]
  return <svg viewBox="0 0 320 220" className="ws-lewis" role="img" aria-label={label}>
    {spec.outer.map(o => {
      const [x, y] = at(o.side), [dx, dy] = SIDES[o.side]
      const offsets = o.order === 3 ? [-7, 0, 7] : o.order === 2 ? [-5, 5] : [0]
      return <g key={o.side}>
        {offsets.map(off => <line key={off} className="bond"
          x1={c[0] + dx * 17 + (dx === 0 ? off : 0)} y1={c[1] + dy * 17 + (dy === 0 ? off : 0)}
          x2={x - dx * 17 + (dx === 0 ? off : 0)} y2={y - dy * 17 + (dy === 0 ? off : 0)} />)}
        <text x={x} y={y + 7} className="ws-atom">{o.symbol}</text>
        {pairs(x, y, o.lp === 3 ? [OPPOSITE[OPPOSITE[o.side]], ...PERPENDICULAR[o.side]] : o.lp === 2 ? PERPENDICULAR[o.side] : o.lp === 1 ? [o.side] : [])}
      </g>
    })}
    <text x={c[0]} y={c[1] + 7} className="ws-atom">{spec.center}</text>
    {pairs(c[0], c[1], centerFree)}
    {spec.charge && <g className="ws-bracket">
      <path d={`M${box[0] + 8} ${box[1]} H${box[0]} V${box[3]} H${box[0] + 8}`} />
      <path d={`M${box[2] - 8} ${box[1]} H${box[2]} V${box[3]} H${box[2] - 8}`} />
      <text x={box[2] + 4} y={box[1] + 10} className="ws-charge">{spec.charge}</text>
    </g>}
  </svg>
}

const VSEPR = [
  {
    formula: 'SeO₃', ve: 'Se 6 + O (6 × 3) = 24',
    lewis: { center: 'Se', outer: [{ side: 'top', symbol: 'O', order: 2, lp: 2 }, { side: 'left', symbol: 'O', order: 1, lp: 3 }, { side: 'right', symbol: 'O', order: 1, lp: 3 }] },
    lewisWhy: 'Put Se in the center. Single bonds to the 3 O use 6 electrons; completing the oxygen octets uses the other 18. Se would then have only 6, so one oxygen lone pair becomes a Se=O double bond.',
    bp: 3, lp: 0, shape: 'Trigonal planar', angle: '120°', polar: false,
    polarWhy: 'All outside atoms are O, and Se has no lone pairs.',
    resonance: true, resonanceWhy: 'The double bond can be drawn to any of the 3 oxygens: 3 resonance structures.',
  },
  {
    formula: '[NH₄]⁺', ve: 'N 5 + H (1 × 4) = 9, minus 1 for the + charge = 8',
    lewis: { center: 'N', charge: '+', outer: ['top', 'left', 'right', 'bottom'].map(side => ({ side, symbol: 'H', order: 1, lp: 0 })) },
    lewisWhy: 'N in the center with single bonds to all 4 H. That uses all 8 electrons. Draw brackets and the + charge.',
    bp: 4, lp: 0, shape: 'Tetrahedral', angle: '109.5°', polar: false,
    polarWhy: 'All outside atoms are H, and N has no lone pairs. (It is still an ion with a +1 charge.)',
    resonance: false, resonanceWhy: 'Only single bonds, so there is nothing to move.',
  },
  {
    formula: '[NO₂]⁻', ve: 'N 5 + O (6 × 2) = 17, plus 1 for the − charge = 18',
    lewis: { center: 'N', centerLP: 1, charge: '−', outer: [{ side: 'left', symbol: 'O', order: 2, lp: 2 }, { side: 'right', symbol: 'O', order: 1, lp: 3 }] },
    lewisWhy: 'N in the center. Single bonds plus full oxygen octets use 16 electrons, and the last 2 go on N as a lone pair. N then has only 6, so one oxygen lone pair becomes an N=O double bond.',
    bp: 2, lp: 1, shape: 'Bent', angle: '<120°', polar: true,
    polarWhy: 'N has a lone pair.',
    resonance: true, resonanceWhy: 'The double bond can be on either oxygen: 2 resonance structures.',
  },
  {
    formula: 'H₂O', ve: 'H (1 × 2) + O 6 = 8',
    lewis: { center: 'O', centerLP: 2, outer: [{ side: 'left', symbol: 'H', order: 1, lp: 0 }, { side: 'right', symbol: 'H', order: 1, lp: 0 }] },
    lewisWhy: 'O in the center with single bonds to both H (4 electrons). The other 4 electrons are 2 lone pairs on O.',
    bp: 2, lp: 2, shape: 'Bent', angle: '104.5°', polar: true,
    polarWhy: 'O has 2 lone pairs.',
    resonance: false, resonanceWhy: 'Only single bonds, so there is nothing to move.',
  },
  {
    formula: 'BF₃', ve: 'B 3 + F (7 × 3) = 24',
    lewis: { center: 'B', outer: [{ side: 'top', symbol: 'F', order: 1, lp: 3 }, { side: 'left', symbol: 'F', order: 1, lp: 3 }, { side: 'right', symbol: 'F', order: 1, lp: 3 }] },
    lewisWhy: 'B in the center with single bonds to 3 F (6 electrons). The other 18 complete the fluorine octets. Boron is an exception: it is stable with only 6 electrons.',
    bp: 3, lp: 0, shape: 'Trigonal planar', angle: '120°', polar: false,
    polarWhy: 'All outside atoms are F, and B has no lone pairs.',
    resonance: false, resonanceWhy: 'All single bonds. Boron is allowed to have just 6 electrons, so no double bond is needed.',
  },
  {
    formula: 'CBr₄', ve: 'C 4 + Br (7 × 4) = 32',
    lewis: { center: 'C', outer: ['top', 'left', 'right', 'bottom'].map(side => ({ side, symbol: 'Br', order: 1, lp: 3 })) },
    lewisWhy: 'C in the center with single bonds to 4 Br (8 electrons). The other 24 give each Br 3 lone pairs.',
    bp: 4, lp: 0, shape: 'Tetrahedral', angle: '109.5°', polar: false,
    polarWhy: 'All outside atoms are Br, and C has no lone pairs.',
    resonance: false, resonanceWhy: 'Only single bonds, so there is nothing to move.',
  },
  {
    formula: '[SiS₃]²⁻', ve: 'Si 4 + S (6 × 3) = 22, plus 2 for the 2− charge = 24',
    lewis: { center: 'Si', charge: '2−', outer: [{ side: 'top', symbol: 'S', order: 2, lp: 2 }, { side: 'left', symbol: 'S', order: 1, lp: 3 }, { side: 'right', symbol: 'S', order: 1, lp: 3 }] },
    lewisWhy: 'Same pattern as CO₃²⁻: Si in the center, one Si=S double bond and two Si–S single bonds. Draw brackets and the 2− charge.',
    bp: 3, lp: 0, shape: 'Trigonal planar', angle: '120°', polar: false,
    polarWhy: 'All outside atoms are S, and Si has no lone pairs.',
    resonance: true, resonanceWhy: 'The double bond can be drawn to any of the 3 sulfurs: 3 resonance structures.',
  },
]

function VseprCard({ item, index }) {
  const [shown, setShown] = useState(0)
  const steps = [
    ['Count valence electrons', <p key="ve">{item.ve}</p>],
    ['Draw the Lewis structure', <div key="lw" className="ws-lewis-step"><LewisStructure spec={item.lewis} label={`Lewis structure of ${item.formula}`} /><p>{item.lewisWhy}</p></div>],
    ['Tally pairs on the central atom', <p key="tally"><strong>{item.bp} bonding pair{item.bp === 1 ? '' : 's'}, {item.lp} lone pair{item.lp === 1 ? '' : 's'}.</strong> A double bond counts as one bonding pair. Lone pairs on the outside atoms do not change the shape.</p>],
    ['Shape and bond angle', <p key="shape"><strong>{item.shape}, {item.angle}.</strong> From the chart: {item.bp} bonding + {item.lp} lone → {item.shape.toLowerCase()}.</p>],
    ['Polar or nonpolar?', <p key="polar"><strong>{item.polar ? 'Polar' : 'Nonpolar'}.</strong> {item.polarWhy}</p>],
    ['Resonance?', <p key="res"><strong>{item.resonance ? 'Yes' : 'No'}.</strong> {item.resonanceWhy}</p>],
  ]
  return <article className="ws-card">
    <header><span className="reading-number">{String(index + 1).padStart(2, '0')}</span><h3>{item.formula}</h3><span className="mono">{shown} / {steps.length} STEPS</span></header>
    <ol className="ws-steps">{steps.slice(0, shown).map(([title, body]) => <li key={title}><span className="eyebrow">{title.toUpperCase()}</span>{body}</li>)}</ol>
    <div className="ws-actions">
      {shown < steps.length && <button className="ws-btn primary" onClick={() => setShown(shown + 1)}>{shown === 0 ? 'I tried it — show step 1' : 'Show next step'} <ArrowRight size={14} /></button>}
      {shown < steps.length && <button className="ws-btn" onClick={() => setShown(steps.length)}><Eye size={14} /> Show all</button>}
      {shown > 0 && <button className="ws-btn" onClick={() => setShown(0)}><EyeOff size={14} /> Hide</button>}
    </div>
  </article>
}

export function VseprChart() {
  const rows = [[1, 0, 'Linear', '180°'], [2, 0, 'Linear', '180°'], [3, 0, 'Trigonal planar', '120°'], [2, 1, 'Bent', '<120°'], [4, 0, 'Tetrahedral', '109.5°'], [3, 1, 'Trigonal pyramidal', '107°'], [2, 2, 'Bent', '104.5°']]
  return <div className="ref-table"><span className="eyebrow">VSEPR CHART · PAIRS ON THE CENTRAL ATOM</span>
    <table><thead><tr><th>Bonding pairs</th><th>Lone pairs</th><th>Shape</th><th>Angle</th></tr></thead>
      <tbody>{rows.map(r => <tr key={r.join()}>{r.map((v, i) => <td key={i}>{v}</td>)}</tr>)}</tbody></table></div>
}

const PREFIX = ['', 'mono', 'di', 'tri', 'tetra', 'penta', 'hexa', 'hepta', 'octa', 'nona', 'deca']
const NAME = { H: 'hydrogen', B: 'boron', C: 'carbon', N: 'nitrogen', O: 'oxygen', F: 'fluorine', Si: 'silicon', P: 'phosphorus', S: 'sulfur', Cl: 'chlorine', Se: 'selenium', Br: 'bromine', Te: 'tellurium', I: 'iodine', Xe: 'xenon' }
const ROOT = { H: 'hydr', N: 'nitr', O: 'ox', F: 'fluor', P: 'phosph', S: 'sulf', Cl: 'chlor', Se: 'selen', Br: 'brom', I: 'iod' }

export function PrefixTable() {
  return <div className="ref-table"><span className="eyebrow">PREFIXES</span>
    <table><tbody><tr>{PREFIX.slice(1).map((p, i) => <td key={p}><strong>{i + 1}</strong><br />{p}</td>)}</tr></tbody></table></div>
}

function secondWord(sym, n, drop = true) {
  const prefix = PREFIX[n]
  const root = ROOT[sym]
  const trimmed = drop && /[ao]$/.test(prefix) && root.startsWith('o') ? prefix.slice(0, -1) : prefix
  return `${trimmed}${root}ide`
}
const nameOf = ([[a, n1], [b, n2]], drop = true) => `${n1 > 1 ? PREFIX[n1] : ''}${NAME[a]} ${secondWord(b, n2, drop)}`
const formulaOf = parts => parts.map(([s, n]) => `${s}${n > 1 ? n : ''}`).join('')

function explainName(parts) {
  const [[a, n1], [b, n2]] = parts
  const first = n1 > 1 ? `${sub(a + n1)}: ${n1} atoms → ${PREFIX[n1]} + ${NAME[a]} = ${PREFIX[n1]}${NAME[a]}` : `${a}: 1 atom, and the first element never gets mono- → ${NAME[a]}`
  const word = secondWord(b, n2)
  const dropped = word !== secondWord(b, n2, false)
  const second = `${sub(b + (n2 > 1 ? n2 : ''))}: ${n2} atom${n2 > 1 ? 's' : ''} → ${PREFIX[n2]} + ${ROOT[b]} + ide = ${word}${dropped ? ` (drop the “${PREFIX[n2].slice(-1)}” before “oxide”)` : ''}`
  return `${first}. ${second}.`
}

function explainFormula(parts) {
  return parts.map(([s, n], i) => i === 0 && n === 1 ? `No prefix on ${NAME[s]} → 1 ${s}` : `${PREFIX[n]} → ${n} ${s}`).join('; ') + `. Formula: ${sub(formulaOf(parts))}.`
}

const PART_A = [
  [['C', 1], ['O', 1]], [['C', 1], ['O', 2]], [['N', 2], ['O', 3]], [['N', 2], ['O', 7]],
  [['N', 1], ['P', 1], 'Named as written. Phosphorus is actually less electronegative than nitrogen, so chemists write this compound as PN, phosphorus mononitride (see Part B #4).'],
  [['S', 1], ['Cl', 2]], [['P', 2], ['O', 5]], [['N', 1], ['Br', 3]], [['C', 1], ['I', 4]], [['C', 1], ['Cl', 4]],
  [['P', 1], ['F', 5]], [['P', 1], ['F', 3]],
  [['O', 1], ['S', 1], 'Named as written. Following the “less electronegative first” rule, it would be written SO, sulfur monoxide.'],
  [['Se', 1], ['F', 2]], [['Te', 1], ['Br', 2]], [['P', 2], ['S', 5]], [['C', 3], ['N', 4]], [['P', 3], ['F', 2]],
  [['C', 1], ['H', 4], 'By the prefix system: carbon tetrahydride. Its common name, methane, is used everywhere; check which one your teacher wants.', ['methane']],
  [['P', 1], ['H', 3], 'By the prefix system: phosphorus trihydride. Its common name is phosphine; check which one your teacher wants.', ['phosphine']],
].map(([p1, p2, note, extra = []]) => {
  const parts = [p1, p2]
  return { prompt: sub(formulaOf(parts)), answer: nameOf(parts), accept: [nameOf(parts), nameOf(parts, false), ...extra], explain: explainName(parts), note }
})

const PART_B = [
  ['carbon tetrafluoride', [['C', 1], ['F', 4]]], ['silicon dioxide', [['Si', 1], ['O', 2]]],
  ['dinitrogen trisulfide', [['N', 2], ['S', 3]]], ['phosphorus mononitride', [['P', 1], ['N', 1]]],
  ['hydrogen hexanitride', [['H', 1], ['N', 6]], 'Follow the prefixes even when a compound looks unusual.'],
  ['carbon disulfide', [['C', 1], ['S', 2]]], ['nitrogen trichloride', [['N', 1], ['Cl', 3]]],
  ['silicon tetrabromide', [['Si', 1], ['Br', 4]]], ['carbon dioxide', [['C', 1], ['O', 2]]],
  ['nitrogen trifluoride', [['N', 1], ['F', 3]]],
  ['boron trisulfide', [['B', 1], ['S', 3]], 'This is the formula the name describes. The real boron sulfide is B₂S₃, diboron trisulfide.'],
  ['sulphur trioxide', [['S', 1], ['O', 3]], '“Sulphur” is the British spelling of sulfur.'],
  ['selenium tetrafluoride', [['Se', 1], ['F', 4]]], ['diphosphorus pentasulfide', [['P', 2], ['S', 5]]],
  ['xenon tetrafluoride', [['Xe', 1], ['F', 4]], 'Yes, a noble gas can form compounds. XeF₄ is a real one.'],
  ['sulfur dibromide', [['S', 1], ['Br', 2]]], ['carbon tetrachloride', [['C', 1], ['Cl', 4]]],
  ['silicone dioxide', [['Si', 1], ['O', 2]], '“Silicone” is a typo for silicon. Silicone is a rubbery material, not an element.'],
  ['fluorine trihydride', [['F', 1], ['H', 3]], 'This is the formula the name describes. It does not exist as a real compound; the real one is HF, hydrogen fluoride.'],
  ['dinitrogen tetroxide', [['N', 2], ['O', 4]]],
].map(([prompt, parts, note]) => ({ prompt, answer: sub(formulaOf(parts)), accept: [formulaOf(parts)], explain: explainFormula(parts), note, formula: true }))

const normalizeName = s => s.toLowerCase().replace(/sulphur/g, 'sulfur').replace(/phosphorous/g, 'phosphorus').replace(/\s+/g, ' ').trim()
const normalizeFormula = s => s.replace(/[₀-₉]/g, d => String(d.charCodeAt(0) - 8320)).replace(/\s+/g, '')

function NameItem({ item, index, revealAll }) {
  const [value, setValue] = useState('')
  const [result, setResult] = useState(null)
  const [open, setOpen] = useState(false)
  const check = () => {
    if (!value.trim()) return
    const ok = item.formula ? item.accept.includes(normalizeFormula(value)) : item.accept.map(normalizeName).includes(normalizeName(value))
    setResult(ok)
  }
  const showing = open || revealAll
  return <li className="ws-item">
    <div className="ws-item-row">
      <span className="ws-num">{index + 1}.</span>
      <span className="ws-prompt">{item.prompt}</span>
      <input aria-label={`Answer for ${index + 1}: ${item.prompt}`} value={value} placeholder={item.formula ? 'Formula, e.g. N2O4' : 'Name'}
        onChange={e => { setValue(e.target.value); setResult(null) }} onKeyDown={e => e.key === 'Enter' && check()} />
      <button className="ws-btn" onClick={check} disabled={!value.trim()}>Check</button>
      <button className="ws-btn ghost" aria-expanded={showing} onClick={() => setOpen(!open)}>{showing ? 'Hide' : 'Answer'}</button>
    </div>
    {result !== null && <p className={`ws-result ${result ? 'ok' : ''}`} role="status">{result ? <><Check size={14} /> Correct!</> : <><X size={14} /> {item.wrongHint ?? 'Not yet. Check the prefixes and the -ide ending.'}</>}</p>}
    {showing && <div className="ws-answer"><strong>{item.answer}</strong><p>{item.explain}</p>{item.note && <p className="ws-note">{item.note}</p>}</div>}
  </li>
}

function NamePart({ title, hint, items }) {
  const [revealAll, setRevealAll] = useState(false)
  return <section className="ws-part">
    <div className="ws-part-head"><div><h3>{title}</h3><p>{hint}</p></div><button className="ws-btn" onClick={() => setRevealAll(!revealAll)}>{revealAll ? <><EyeOff size={14} /> Hide all answers</> : <><Eye size={14} /> Show all answers</>}</button></div>
    <ol className="ws-list">{items.map((item, i) => <NameItem key={item.prompt + i} item={item} index={i} revealAll={revealAll} />)}</ol>
  </section>
}

const tabFromHash = () => WORKSHEETS.find(w => window.location.hash === `#/worksheets/${w.id}`)?.id ?? WORKSHEETS[0].id

function DueBadge({ due }) {
  const info = dueInfo(due)
  return info && <span className={`due-badge ${info.when}`}><CalendarClock size={14} /> {info.text}</span>
}

const IONIC_WRONG = 'Not yet. Check the charges, the criss-cross, reducing, and the -ide ending.'
const ionicExplain = r => r.cancels
  ? `${r.cat}${charge(r.c.charge)} and ${r.an}${charge(r.a.charge)} cancel, so the formula is just ${pretty(r.formula)}. Name: ${r.c.name} + ${r.a.name}.`
  : `${r.cat}${charge(r.c.charge)} and ${r.an}${charge(r.a.charge)}: criss-cross gives ${pretty(r.crossed)}${r.g > 1 ? `, reduce by ${r.g}` : ''} → ${pretty(r.formula)}. Name: ${r.c.name} + ${r.a.name}.`
const IONIC_NAME_TO_FORMULA = NOTES_NAME_TO_FORMULA.map(([c, a]) => { const r = ionic(c, a); return { prompt: r.name, answer: pretty(r.formula), accept: [r.formula], explain: ionicExplain(r), formula: true, wrongHint: IONIC_WRONG } })
const IONIC_FORMULA_TO_NAME = NOTES_FORMULA_TO_NAME.map(([c, a]) => { const r = ionic(c, a); return { prompt: pretty(r.formula), answer: r.name, accept: [r.name], explain: ionicExplain(r), wrongHint: IONIC_WRONG } })

export default function WorksheetsPage({ openLesson }) {
  const [tab, setTabState] = useState(tabFromHash)
  const [table, setTable] = useState(false)
  useEffect(() => {
    const sync = () => setTabState(tabFromHash())
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])
  const setTab = id => window.location.assign(`#/worksheets/${id}`)
  const sheet = WORKSHEETS.find(w => w.id === tab)
  return <main className="pt-page ws-page">
    <section className="pt-hero">
      <span className="eyebrow">WORKSHEET HELP</span>
      <h1>Worksheet <em>help.</em></h1>
      <p>Try each problem on paper first. Then reveal one step at a time, so you can see exactly where your thinking matched and where it went a different way.</p>
      {CHAPTERS.map(c => <div key={c.n} className="ws-chapter">
        <span className="eyebrow">CHAPTER {c.n} · {c.title.toUpperCase()}</span>
        <div className="ws-tabs" role="group" aria-label={`Chapter ${c.n} worksheets`}>
          {WORKSHEETS.filter(w => w.chapter === c.n).map(w => { const info = dueInfo(w.due); return <button key={w.id} aria-pressed={tab === w.id} onClick={() => setTab(w.id)}>{w.label}{info && <small className={`tab-due ${info.when}`}>{info.when === 'today' ? 'Due today' : info.text}</small>}</button> })}
        </div>
      </div>)}
    </section>
    <div className="ws-due-row"><span className="eyebrow">CHAPTER {sheet.chapter} · {sheet.label.toUpperCase()}</span><DueBadge due={sheet.due} /></div>

    {tab === 'ionic' ? <section className="ws-section">
      <div className="ws-intro">
        <p>Type I ionic compounds: a metal with one possible charge plus a nonmetal. Write the cation first, criss-cross the charges, reduce if you can, then name it: cation name + anion ending in <em>-ide</em>.</p>
        <button className="text-link" onClick={() => openLesson(7)}>Review the ionic compounds lesson first <ArrowRight size={14} /></button>
        <IonChargeTable />
      </div>
      <IonicGrid />
      <NamePart title="Class notes: write the formula" hint="Name → formula. Type numbers normally: Mg3P2." items={IONIC_NAME_TO_FORMULA} />
      <NamePart title="Class notes: name the compound" hint="Formula → name" items={IONIC_FORMULA_TO_NAME} />
    </section> : tab === 'vsepr' ? <section className="ws-section">
      <div className="ws-intro">
        <p>For each molecule: count valence electrons, draw the Lewis structure, tally bonding and lone pairs on the central atom, then find the shape, angle, polarity, and resonance.</p>
        <button className="text-link" onClick={() => openLesson(5)}>Review the VSEPR lesson first <ArrowRight size={14} /></button>
        <VseprChart />
      </div>
      <div className="ws-grid">{VSEPR.map((item, i) => <VseprCard key={item.formula} item={item} index={i} />)}</div>
      <div className="ws-summary">
        <button className="ws-btn" onClick={() => setTable(!table)}>{table ? <><EyeOff size={14} /> Hide answer table</> : <><Eye size={14} /> Show full answer table</>}</button>
        {table && <div className="ws-table-wrap"><table>
          <thead><tr><th>Molecule</th><th>Valence e⁻</th><th>Bonding pairs</th><th>Lone pairs</th><th>Shape</th><th>Angle</th><th>Polarity</th><th>Resonance</th></tr></thead>
          <tbody>{VSEPR.map(r => <tr key={r.formula}><td>{r.formula}</td><td>{r.ve.split('= ').pop()}</td><td>{r.bp}</td><td>{r.lp}</td><td>{r.shape}</td><td>{r.angle}</td><td>{r.polar ? 'Polar' : 'Nonpolar'}</td><td>{r.resonance ? 'Yes' : 'No'}</td></tr>)}</tbody>
        </table><small>Bonding and lone pairs are counted on the central atom, as in your class VSEPR chart.</small></div>}
      </div>
    </section> : <section className="ws-section">
      <div className="ws-intro">
        <p>Use the prefix system: (prefix + first nonmetal) (prefix + root of second nonmetal + -ide). Never use mono- on the first element. Type an answer and select Check, or reveal the worked answer.</p>
        <button className="text-link" onClick={() => openLesson(6)}>Review the naming lesson first <ArrowRight size={14} /></button>
        <PrefixTable />
      </div>
      <NamePart title="Part A: Name the compound" hint="Formula → name" items={PART_A} />
      <NamePart title="Part B: Write the formula" hint="Name → formula. Type numbers normally: N2O4." items={PART_B} />
    </section>}
  </main>
}
