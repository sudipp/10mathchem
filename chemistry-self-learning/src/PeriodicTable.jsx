import { useState } from 'react'
import { ArrowLeft, Search, X } from 'lucide-react'

import { RAW } from './elements.js'

const CATEGORIES = {
  alkali: { label: 'Alkali metal', color: '#EDB59C', text: 'Soft, shiny metals that react strongly with water. Each has 1 valence electron, which it gives away easily.' },
  alkaline: { label: 'Alkaline earth metal', color: '#F3D5A6', text: 'Reactive metals with 2 valence electrons. They are less reactive than the alkali metals beside them.' },
  transition: { label: 'Transition metal', color: '#DCE3CF', text: 'Typical metals: strong, shiny, and good conductors. Their electron arrangements are more complex, so the simple valence-electron shortcut does not apply.' },
  post: { label: 'Post-transition metal', color: '#B9CDB8', text: 'Softer metals near the metalloids, such as aluminum, tin, and lead.' },
  metalloid: { label: 'Metalloid', color: '#A9C4C9', text: 'Elements with properties between metals and nonmetals. Silicon, for example, is used in computer chips.' },
  nonmetal: { label: 'Reactive nonmetal', color: '#CFE0A6', text: 'Elements like carbon, nitrogen, and oxygen. They usually share electrons to form covalent bonds.' },
  halogen: { label: 'Halogen', color: '#E6C6D6', text: 'Very reactive nonmetals with 7 valence electrons. They need just 1 more electron to complete an octet.' },
  noble: { label: 'Noble gas', color: '#C9C3E3', text: 'Very unreactive gases. Their outer shells are full: 8 valence electrons, or 2 for helium.' },
  lanthanide: { label: 'Lanthanide', color: '#F2E3C6', text: 'f-block metals, often called rare-earth elements. They are used in strong magnets and screens.' },
  actinide: { label: 'Actinide', color: '#E9D0BC', text: 'f-block metals that are all radioactive. Uranium and plutonium are well-known examples.' },
  unknown: { label: 'Unknown properties', color: '#E4E2DC', text: 'Superheavy, human-made elements that last only fractions of a second. Most of their chemistry is predicted, not measured.' },
}

const SETS = {
  alkali: [3, 11, 19, 37, 55, 87], alkaline: [4, 12, 20, 38, 56, 88], noble: [2, 10, 18, 36, 54, 86],
  halogen: [9, 17, 35, 53, 85], metalloid: [5, 14, 32, 33, 51, 52], nonmetal: [1, 6, 7, 8, 15, 16, 34],
  post: [13, 31, 49, 50, 81, 82, 83, 84],
}

const NOTES = {
  1: 'Hydrogen sits in group 1 because it has 1 valence electron, but it is a nonmetal gas, not an alkali metal.',
  2: 'Helium is in group 18 with the other noble gases, but it has only 2 valence electrons: its single shell is already full.',
  6: 'Carbon’s 4 valence electrons let it form 4 bonds. That flexibility is why it is the backbone of every living thing.',
  8: 'Oxygen has 6 valence electrons, so it usually forms 2 bonds. In CO₂, each oxygen forms a double bond with carbon.',
}

function categoryOf(z) {
  if (z >= 57 && z <= 71) return 'lanthanide'
  if (z >= 89 && z <= 103) return 'actinide'
  if (z >= 109) return 'unknown'
  for (const [key, list] of Object.entries(SETS)) if (list.includes(z)) return key
  return 'transition'
}

function place(z) {
  if (z === 1) return { period: 1, col: 1 }
  if (z === 2) return { period: 1, col: 18 }
  if (z <= 10) return { period: 2, col: z <= 4 ? z - 2 : z + 8 }
  if (z <= 18) return { period: 3, col: z <= 12 ? z - 10 : z }
  if (z <= 36) return { period: 4, col: z - 18 }
  if (z <= 54) return { period: 5, col: z - 36 }
  if (z <= 56) return { period: 6, col: z - 54 }
  if (z <= 71) return { period: 6, col: z - 54, fRow: 1 }
  if (z <= 86) return { period: 6, col: z - 68 }
  if (z <= 88) return { period: 7, col: z - 86 }
  if (z <= 103) return { period: 7, col: z - 86, fRow: 2 }
  return { period: 7, col: z - 100 }
}

function shellsOf(z) {
  if (z > 20) return null
  if (z <= 2) return [z]
  if (z <= 10) return [2, z - 2]
  if (z <= 18) return [2, 8, z - 10]
  return [2, 8, 8, z - 18]
}

const ELEMENTS = RAW.split('|').map((entry, i) => {
  const [symbol, name, mass] = entry.split(' ')
  const z = i + 1
  const { period, col, fRow } = place(z)
  const group = fRow ? null : col
  let valence = null
  if (z === 2) valence = 2
  else if (group === 1 || group === 2) valence = group
  else if (group >= 13) valence = group - 10
  return { z, symbol, name, mass, period, col, fRow, group, valence, category: categoryOf(z), shells: shellsOf(z) }
})

function Lewis({ symbol, count }) {
  const sides = [0, 0, 0, 0]
  if (symbol === 'He') sides[0] = 2
  else for (let i = 0; i < count; i++) sides[i % 4]++
  const offsets = [[0, -31], [31, 0], [0, 31], [-31, 0]]
  return <svg viewBox="0 0 100 100" className="pt-lewis-svg" role="img" aria-label={`Lewis symbol for ${symbol} with ${count} valence electrons`}>
    <text x="50" y="59" textAnchor="middle" fontSize={symbol.length > 1 ? 26 : 30}>{symbol}</text>
    {sides.map((n, side) => {
      const [dx, dy] = offsets[side]
      const horizontal = side % 2 === 0
      const spread = n === 2 ? [-6, 6] : n === 1 ? [0] : []
      return spread.map(s => <circle key={`${side}${s}`} cx={50 + dx + (horizontal ? s : 0)} cy={50 + dy + (horizontal ? 0 : s)} r="3.6" fill="#CC5833" />)
    })}
  </svg>
}

function Detail({ el, className = '' }) {
  const info = CATEGORIES[el.category]
  const estimated = el.mass.startsWith('[')
  const predicted = el.z >= 113
  return <div className={`pt-detail ${className}`} aria-live="polite">
    <div className="pt-detail-tile" style={{ background: info.color }}>
      <span>{el.z}</span><strong>{el.symbol}</strong><small>{el.mass}</small>
    </div>
    <div className="pt-detail-body">
      <span className="eyebrow">{info.label.toUpperCase()}</span>
      <h3>{el.name}</h3>
      <dl>
        <div><dt>Atomic number</dt><dd>{el.z}</dd></div>
        <div><dt>Group</dt><dd>{el.group ?? 'f-block'}</dd></div>
        <div><dt>Period</dt><dd>{el.period}</dd></div>
        <div><dt>Valence e⁻</dt><dd>{el.valence === null ? 'Varies' : `${el.valence}${predicted ? ' (predicted)' : ''}`}</dd></div>
        {el.shells && <div><dt>Shells</dt><dd>{el.shells.join(' · ')}</dd></div>}
      </dl>
      <p>{NOTES[el.z] ?? info.text}</p>
      {estimated && <small className="pt-note">Mass in brackets: mass number of the most stable known isotope.</small>}
    </div>
    {el.valence !== null && !predicted && <div className="pt-lewis"><Lewis symbol={el.symbol} count={el.valence} /><small>Lewis symbol</small></div>}
  </div>
}

function groupNote(g) {
  if (g <= 2) return `Group ${g}: each atom has ${g} valence electron${g === 1 ? '' : 's'}.`
  if (g <= 12) return 'Groups 3–12 are transition metals. The simple valence-electron shortcut does not apply here.'
  return `Group ${g}: each atom has ${g - 10} valence electrons${g === 18 ? ' (except helium, which has 2)' : ''}.`
}

export default function PeriodicTablePage() {
  const [selected, setSelected] = useState(6)
  const [query, setQuery] = useState('')
  const [highlight, setHighlight] = useState(null)
  const [showValence, setShowValence] = useState(true)
  const el = ELEMENTS[selected - 1]
  const q = query.trim().toLowerCase()
  const matchesQuery = e => !q || e.symbol.toLowerCase() === q || e.name.toLowerCase().includes(q) || String(e.z) === q
  const matchesHighlight = e => !highlight || (highlight.type === 'group' ? e.group === highlight.value : e.category === highlight.value)
  const results = q ? ELEMENTS.filter(matchesQuery) : []
  const toggle = next => setHighlight(h => h && h.type === next.type && h.value === next.value ? null : next)
  const note = highlight && (highlight.type === 'group' ? groupNote(highlight.value) : `${CATEGORIES[highlight.value].label}: ${CATEGORIES[highlight.value].text}`)

  return <main className="pt-page">
    <section className="pt-hero">
      <a className="text-link" href="#lessons"><ArrowLeft size={15} /> Back to the lessons</a>
      <span className="eyebrow">REFERENCE · ALL 118 ELEMENTS</span>
      <h1>The periodic <em>table.</em></h1>
      <p>Every known element, arranged by atomic number. Elements in the same column often behave alike because they have the same number of valence electrons. Select an element to see its details and its Lewis symbol, or select a group number to see the pattern.</p>
    </section>

    <section className="pt-tools" aria-label="Periodic table tools">
      <div className="pt-tool-row">
        <label className="pt-search">
          <Search size={16} aria-hidden="true" />
          <span className="sr-only">Find an element</span>
          <input type="search" placeholder="Find an element: name, symbol, or number" value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && results[0]) setSelected(results[0].z) }} />
        </label>
        <label className="pt-toggle"><input type="checkbox" checked={showValence} onChange={e => setShowValence(e.target.checked)} /> Show valence electrons</label>
        {(highlight || q) && <button className="pt-clear" onClick={() => { setHighlight(null); setQuery('') }}><X size={14} /> Clear</button>}
      </div>
      {q && <p className="pt-status" role="status">{results.length ? `${results.length} match${results.length === 1 ? '' : 'es'}. Press Enter to select ${results[0].name}.` : 'No elements match.'}</p>}
      <div className="pt-legend" role="group" aria-label="Highlight a category">
        {Object.entries(CATEGORIES).map(([key, info]) =>
          <button key={key} aria-pressed={highlight?.type === 'category' && highlight.value === key} onClick={() => toggle({ type: 'category', value: key })}>
            <span className="pt-swatch" style={{ background: info.color }} />{info.label}
          </button>)}
      </div>
      {note && <p className="pt-filter-note" role="status">{note}</p>}
    </section>

    <Detail el={el} className="pt-detail-mobile" />

    <section className="pt-scroll" aria-label="Periodic table">
      <div className="pt-grid">
        {Array.from({ length: 18 }, (_, i) => i + 1).map(g =>
          <button key={`g${g}`} className="pt-group" style={{ gridColumn: g + 1, gridRow: 1 }}
            aria-pressed={highlight?.type === 'group' && highlight.value === g} aria-label={`Highlight group ${g}`}
            onClick={() => toggle({ type: 'group', value: g })}>{g}</button>)}
        {Array.from({ length: 7 }, (_, i) => <span key={`p${i}`} className="pt-period" style={{ gridColumn: 1, gridRow: i + 2 }} aria-hidden="true">{i + 1}</span>)}
        <Detail el={el} className="pt-detail-inset" />
        {[['57–71', 'lanthanide', 7], ['89–103', 'actinide', 8]].map(([label, cat, row]) =>
          <button key={cat} className="pt-cell pt-placeholder" style={{ gridColumn: 4, gridRow: row, background: CATEGORIES[cat].color }}
            aria-label={`Highlight ${CATEGORIES[cat].label.toLowerCase()}s, elements ${label}`} onClick={() => toggle({ type: 'category', value: cat })}>{label}</button>)}
        {ELEMENTS.map(e => {
          const dim = !matchesQuery(e) || !matchesHighlight(e)
          return <button key={e.z} title={e.name}
            className={`pt-cell ${dim ? 'dim' : ''} ${selected === e.z ? 'selected' : ''}`}
            style={{ gridColumn: e.col + 1, gridRow: e.fRow ? 9 + e.fRow : e.period + 1, background: selected === e.z ? undefined : CATEGORIES[e.category].color }}
            aria-pressed={selected === e.z} aria-label={`${e.name}, atomic number ${e.z}`}
            onClick={() => setSelected(e.z)}>
            <span className="pt-z">{e.z}</span>
            {showValence && e.valence !== null && <span className="pt-valence" aria-hidden="true">{e.valence}</span>}
            <strong>{e.symbol}</strong>
            <span className="pt-name">{e.name}</span>
          </button>
        })}
      </div>
    </section>
    <p className="pt-scroll-hint">Scroll sideways to see the whole table.</p>

    <section className="pt-guide">
      <div><span className="reading-number">01</span><h3>Columns are groups</h3><p>The 18 vertical columns are groups. In groups 1, 2, and 13–18, atoms in the same group have the same number of valence electrons, so they react in similar ways.</p></div>
      <div><span className="reading-number">02</span><h3>Rows are periods</h3><p>The 7 horizontal rows are periods. Moving left to right adds one proton and one electron at each step. A new period starts when a new electron shell begins.</p></div>
      <div><span className="reading-number">03</span><h3>The two rows below</h3><p>The lanthanides and actinides belong in periods 6 and 7. They sit underneath so the table is not too wide to read.</p></div>
    </section>
  </main>
}
