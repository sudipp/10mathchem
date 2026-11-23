// Chapter 3: the periodic table, electron configuration, orbital diagrams and periodic trends.
import { MiniTable, RefTable, ReviewLink, StepPart } from './ChemBits.jsx'
import { elementOf } from './atomic.js'
import { BY_Z } from './elements.js'
import { ORDER, aufbau, compare, configText, neutralConfig, orbitals, position, shorthand } from './electrons.js'
import { CELL, cellCenter } from './grid.js'
import { sup } from './sci.js'
import { BLOCK_STEPS, BR_PATH, ECONFIG_DIAGRAMS, ECONFIG_LONG, ECONFIG_SHORT, ENERGY_STEPS, ION_STEPS, ORBITAL_WS, OXYGEN_STEPS, RADIUS_STEPS, SHORT_STEPS, TRENDS_WS, UNIT3_ITEMS, VIOLATION_ITEMS, ruleFor } from './ch3-data.js'

const INK = '#2E4036', ACCENT = '#CC5833', SOFT = '#e5e6db', MUTED = '#879783'
const BLOCK_COLOR = { s: '#EDB59C', p: '#CFE0A6', d: '#F3D5A6', f: '#C9C3E3' }

// ---------- Figures ----------
const FAMILY = {
  alkali: { z: [3, 11, 19, 37, 55, 87], color: '#EDB59C', label: 'Alkali metals (group 1)' },
  alkaline: { z: [4, 12, 20, 38, 56, 88], color: '#F3D5A6', label: 'Alkaline earth metals (group 2)' },
  transition: { test: z => position(z).block === 'd', color: '#DCE3CF', label: 'Transition metals (d-block, groups 3–12)' },
  halogen: { z: [9, 17, 35, 53, 85, 117], color: '#E6C6D6', label: 'Halogens (group 17)' },
  noble: { z: [2, 10, 18, 36, 54, 86, 118], color: '#C9C3E3', label: 'Noble gases (group 18)' },
}
const inFamily = (key, z) => FAMILY[key].test ? FAMILY[key].test(z) : FAMILY[key].z.includes(z)
const METALLOIDS = [5, 14, 32, 33, 51, 52, 85]
const NONMETALS = [1, 2, 6, 7, 8, 9, 10, 15, 16, 17, 18, 34, 35, 36, 53, 54, 86]
export function BlocksFigure({ step }) {
  const s = BLOCK_STEPS[step]
  const fill = z => {
    if (s.block) { const b = position(z).block; return b === s.block || BLOCK_STEPS.findIndex(x => x.block === b) < step ? (b === s.block ? BLOCK_COLOR[b] : '#dfe2d6') : null }
    if (s.family) { const k = s.family.find(f => inFamily(f, z)); return k ? FAMILY[k].color : null }
    return NONMETALS.includes(z) ? '#CFE0A6' : METALLOIDS.includes(z) ? '#A9C4C9' : '#EDB59C'
  }
  const stair = [[13, 2], [13, 3], [14, 3], [14, 4], [15, 4], [15, 5], [16, 5], [16, 6], [17, 6], [17, 7]]
  const pt = ([g, p]) => [CELL.x0 + (g - 1) * CELL.w, CELL.y0 + (p - 1) * CELL.h]
  return <svg viewBox="0 0 600 320" role="img" aria-label={s.text}>
    <MiniTable fill={fill} />
    {s.metal && <polyline points={stair.map(pt).map(p => p.join(',')).join(' ')} fill="none" stroke={INK} strokeWidth="4" />}
    <text x="300" y="312" className="diagram-caption">{s.block ? `${s.block}-BLOCK` : s.family ? s.family.map(f => FAMILY[f].label.split(' (')[0].toUpperCase()).join(' · ') : 'ORANGE METALS · BLUE METALLOIDS · GREEN NONMETALS'}</text>
  </svg>
}

function SvgOrbitals({ rows, y = 120, highlight }) {
  const widths = rows.map(r => r.boxes.length * 40 + 24)
  const total = widths.reduce((a, b) => a + b, 0)
  const starts = widths.map((_, k) => 300 - total / 2 + widths.slice(0, k).reduce((a, b) => a + b, 0))
  return <g>{rows.map((r, k) => {
    const x0 = starts[k]
    return <g key={r.sub}>
      {r.boxes.map((b, i) => <g key={i}>
        <rect x={x0 + i * 40} y={y} width="38" height="46" rx="6" fill={highlight === r.sub ? '#fbeee6' : '#fffdf7'} stroke={r.bad ? ACCENT : INK} strokeWidth="2" />
        <text x={x0 + i * 40 + 19} y={y + 32} textAnchor="middle" fontSize="24" fontWeight="700" fill={INK}>{b}</text>
      </g>)}
      <text x={x0 + (r.boxes.length * 40) / 2} y={y + 70} textAnchor="middle" fontSize="15" fontWeight="600" fill={MUTED}>{r.sub}</text>
    </g>
  })}</g>
}
export function RulesFigure({ step }) {
  const e = OXYGEN_STEPS[step]
  const rows = orbitals(aufbau(e)).concat()
  const full = ['1s', '2s', '2p'].map(sub => rows.find(r => r.sub === sub) ?? { sub, boxes: Array(sub.endsWith('p') ? 3 : 1).fill('') })
  return <svg viewBox="0 0 600 320" role="img" aria-label={`Oxygen, electron ${e} of 8: ${ruleFor(e)}`}>
    <text x="300" y="50" textAnchor="middle" fontSize="22" fontWeight="700" fill={INK}>Oxygen: electron {e} of 8</text>
    <SvgOrbitals rows={full} highlight={rows.at(-1).sub} />
    <text x="300" y="248" textAnchor="middle" fontSize="16" fontWeight="600" fill={ACCENT}>{ruleFor(e)}</text>
    <text x="300" y="290" className="diagram-caption">{configText(aufbau(e))}</text>
  </svg>
}

const subOf = z => { const c = aufbau(z); return c.at(-1)[0] }
export function LonghandFigure({ step }) {
  const upto = BR_PATH[step]
  const conf = aufbau(35).filter(([sub]) => ORDER.indexOf(sub) <= ORDER.indexOf(upto))
  const fill = z => {
    if (z > 35) return null
    const sub = subOf(z)
    if (sub === upto) return ACCENT
    return ORDER.indexOf(sub) < ORDER.indexOf(upto) ? '#dfe2d6' : null
  }
  const [bx, by] = cellCenter(35)
  return <svg viewBox="0 0 600 320" role="img" aria-label={`Bromine, reading the table through ${upto}: ${configText(conf)}`}>
    <MiniTable skipF fill={fill} />
    {step === BR_PATH.length - 1 && <circle cx={bx} cy={by} r="16" fill="none" stroke={INK} strokeWidth="3" />}
    <text x="300" y="250" textAnchor="middle" fontSize="20" fontWeight="700" fill={INK}>{configText(conf)}</text>
    <text x="300" y="282" className="diagram-caption">{step === 6 ? 'd-BLOCK IN ROW 4 IS 3d (n − 1)' : step === 7 ? 'STOP AT Br: 5 SPACES INTO 4p → 4p⁵' : `READ ACROSS THE ${upto} SECTION`}</text>
  </svg>
}

export function ShorthandFigure({ step }) {
  const s = SHORT_STEPS[step]
  const conf = s.expect ? aufbau(s.z) : neutralConfig(s.z)
  const sh = shorthand(s.z)
  const rest = conf.filter(([sub]) => sh.rest.some(([r]) => r === sub))
  const text = `[${sh.core}] ${configText(rest)}`
  return <svg viewBox="0 0 600 320" role="img" aria-label={s.text}>
    <text x="300" y="48" textAnchor="middle" fontSize="22" fontWeight="700" fill={INK}>{BY_Z(s.z).name} ({s.z} e⁻){s.expect ? ' · expected' : step >= 2 ? ' · actual' : ''}</text>
    <SvgOrbitals rows={orbitals(rest)} y={90} highlight={s.z >= 24 ? '3d' : undefined} />
    <text x="300" y="214" textAnchor="middle" fontSize="28" fontWeight="700" fill={s.expect ? MUTED : ACCENT} style={s.expect ? { textDecoration: 'line-through' } : undefined}>{text}</text>
    <text x="300" y="262" textAnchor="middle" fontSize="14" fill={INK}>[{sh.core}] = {configText(aufbau({ He: 2, Ne: 10, Ar: 18, Kr: 36 }[sh.core]))}</text>
    <text x="300" y="300" className="diagram-caption">{s.z >= 24 ? 'EXCEPTIONS: ONLY d⁴ OR d⁹ (Cr, Cu, Mo, Ag, Au)' : 'BRACKET THE NOBLE GAS, WRITE WHAT IS LEFT'}</text>
  </svg>
}

export function IonFigure({ step }) {
  const s = ION_STEPS[step]
  const el = BY_Z(s.z)
  const n = s.z - s.q
  return <svg viewBox="0 0 600 320" role="img" aria-label={s.text}>
    <text x="150" y="130" textAnchor="middle" fontSize="80" fontWeight="700" fill={INK}>{el.symbol}<tspan fontSize="40" dy="-36" fill={ACCENT}>{sup(`${Math.abs(s.q) > 1 ? Math.abs(s.q) : ''}${s.q > 0 ? '+' : '-'}`)}</tspan></text>
    <text x="380" y="80" fontSize="20" fill={INK}>{s.z} electrons (atomic #)</text>
    <text x="380" y="116" fontSize="20" fill={s.q < 0 ? ACCENT : INK}>{s.q < 0 ? `+ ${-s.q} gained` : `− ${s.q} lost`}</text>
    <line x1="380" x2="560" y1="130" y2="130" stroke={INK} strokeWidth="2" />
    <text x="380" y="160" fontSize="24" fontWeight="700" fill={INK}>{n} electrons</text>
    {s.done && <text x="300" y="230" textAnchor="middle" fontSize="28" fontWeight="700" fill={ACCENT}>{shorthand(s.z, s.q).text}</text>}
    <text x="300" y="290" className="diagram-caption">POSITIVE: SUBTRACT ELECTRONS · NEGATIVE: ADD ELECTRONS</text>
  </svg>
}

const RADIUS_PM = { Li: 152, Na: 186, K: 227, Be: 112, B: 85, C: 77, N: 75, O: 73, F: 72, 'Na+': 102, Cl: 99, 'Cl-': 181 }
function TrendArrows({ up }) {
  return <g>
    <MiniTable skipF fill={() => null} />
    <defs><marker id="ah4" markerUnits="userSpaceOnUse" markerWidth="18" markerHeight="18" refX="9" refY="9" orient="auto"><path d="M0,0 L18,9 L0,18 z" fill={ACCENT} /></marker></defs>
    <line x1={up ? 60 : 540} y1="235" x2={up ? 540 : 60} y2="235" stroke={ACCENT} strokeWidth="5" markerEnd="url(#ah4)" />
    <line x1="9" y1={up ? 205 : 22} x2="9" y2={up ? 22 : 205} stroke={ACCENT} strokeWidth="5" markerEnd="url(#ah4)" />
  </g>
}
export function RadiusFigure({ step }) {
  const s = RADIUS_STEPS[step]
  if (s.kind === 'arrows') return <svg viewBox="0 0 600 320" role="img" aria-label={s.text}><TrendArrows up={false} /><text x="300" y="275" textAnchor="middle" fontSize="16" fontWeight="700" fill={INK}>Atomic radius: bigger ← and ↓</text></svg>
  const gap = 600 / (s.list.length + 1)
  return <svg viewBox="0 0 600 320" role="img" aria-label={s.text}>
    {s.list.map((sym, k) => { const r = RADIUS_PM[sym] * (s.kind === 'period' ? 0.22 : s.kind === 'group' ? 0.3 : 0.4); return <g key={sym}>
      <circle cx={gap * (k + 1)} cy="150" r={r} fill={sym.endsWith('+') ? '#EDB59C' : sym.endsWith('-') ? '#CFE0A6' : SOFT} stroke={INK} strokeWidth="2" />
      <text x={gap * (k + 1)} y="156" textAnchor="middle" fontSize="18" fontWeight="700" fill={INK}>{sym.replace('+', '⁺').replace('-', '⁻')}</text>
      <text x={gap * (k + 1)} y="250" textAnchor="middle" fontSize="12" fill={MUTED}>{RADIUS_PM[sym]} pm</text>
    </g> })}
    <text x="300" y="290" className="diagram-caption">{s.kind === 'group' ? 'GROUP 1, TOP TO BOTTOM' : s.kind === 'period' ? 'PERIOD 2, LEFT TO RIGHT' : 'ATOM VS ION'} · RADII IN PICOMETERS</text>
  </svg>
}
export function EnergyFigure({ step }) {
  const s = ENERGY_STEPS[step]
  if (!s.cmp) return <svg viewBox="0 0 600 320" role="img" aria-label={s.text}><TrendArrows up /><text x="300" y="275" textAnchor="middle" fontSize="16" fontWeight="700" fill={INK}>{['Ionization energy', 'Electronegativity', 'Electron affinity'][step]}: bigger → and ↑</text></svg>
  const [a, b] = s.cmp.map(x => elementOf(x).z)
  const win = compare(...s.cmp, s.trend).answer
  return <svg viewBox="0 0 600 320" role="img" aria-label={s.text}>
    <MiniTable skipF fill={z => z === a || z === b ? (BY_Z(z).symbol === win ? ACCENT : INK) : null} />
    <text x="300" y="275" textAnchor="middle" fontSize="16" fontWeight="700" fill={INK}>{s.cmp.join(' or ')} → {win} has the larger ionization energy</text>
  </svg>
}

export function SublevelRef() {
  return <RefTable title="SUBLEVELS AND ORBITALS" head={['Sublevel', 'Orbitals (boxes)', 'Max electrons', 'Where on the table']} rows={[
    ['s', '1', '2', 'groups 1–2 and He'], ['p', '3', '6', 'groups 13–18'], ['d', '5', '10', 'groups 3–12 (energy level n − 1)'], ['f', '7', '14', 'the two bottom rows (n − 2)'],
  ]} note="Filling order: 1s 2s 2p 3s 3p 4s 3d 4p 5s 4d 5p 6s 4f 5d 6p 7s 5f 6d 7p. Each orbital holds 2 electrons." />
}
export function TrendRef() {
  return <RefTable title="PERIODIC TRENDS SUMMARY" head={['Property', 'Across a period (→)', 'Down a group (↓)', 'Why']} rows={[
    ['Atomic radius', 'decreases', 'increases', 'more protons pull tighter → ; more energy levels ↓'],
    ['Ionization energy', 'increases', 'decreases', 'closer electrons are held more tightly'],
    ['Electronegativity', 'increases', 'decreases', 'small atoms with many protons pull shared electrons'],
    ['Electron affinity', 'increases', 'decreases', 'small atoms attract an added electron more'],
    ['Ionic radius', 'cation < atom', 'anion > atom', 'losing electrons shrinks; gaining electrons swells'],
  ]} note="Noble gases are usually left out of electronegativity and electron affinity: they do not bond or gain electrons easily." />
}


export function FamilyMap() {
  const keys = Object.keys(FAMILY)
  return <div className="ref-table"><span className="eyebrow">LABEL THE PERIODIC TABLE · ANSWER</span>
    <svg viewBox="0 0 600 300" role="img" aria-label="Periodic table with alkali metals, alkaline earth metals, transition metals, halogens and noble gases colored">
      <MiniTable fill={z => { const k = keys.find(f => inFamily(f, z)); return k ? FAMILY[k].color : null }} />
    </svg>
    <div className="family-legend">{keys.map(k => <span key={k}><i style={{ background: FAMILY[k].color }} />{FAMILY[k].label}</span>)}</div>
  </div>
}

// ---------- Sheets ----------
export function OrbitalSheet({ openLessonId }) {
  return <section className="ws-section">
    <div className="ws-intro">
      <p>Count the electrons (the atomic number), then fill boxes in Aufbau order: 1s 2s 2p 3s 3p 4s 3d 4p 5s 4d 5p 6s. One arrow per box first (Hund), then pair with an opposite arrow (Pauli).</p>
      <ReviewLink onClick={() => openLessonId('c3-rules')}>Review the three rules first</ReviewLink>
      <SublevelRef />
    </div>
    <StepPart title="Draw the orbital diagram for each element" hint="Type the number of electrons, then reveal the diagram." items={ORBITAL_WS} />
    <StepPart title="Which rule is being violated?" hint="Hund’s Rule, Pauli Exclusion Principle, or Aufbau’s Principle." items={VIOLATION_ITEMS} />
  </section>
}
export function EconfigSheet({ openLessonId }) {
  return <section className="ws-section">
    <div className="ws-intro">
      <p>Find the atomic number, adjust for any charge, then write the configuration. Type superscripts as plain numbers: <code>1s2 2s2 2p6</code> or <code>[Ar] 4s1 3d5</code>.</p>
      <ReviewLink onClick={() => openLessonId('c3-shorthand')}>Review shorthand and exceptions first</ReviewLink>
    </div>
    <StepPart title="Orbital diagrams" hint="Type the number of electrons, then reveal the diagram." items={ECONFIG_DIAGRAMS} />
    <StepPart title="Longhand configurations" items={ECONFIG_LONG} />
    <StepPart title="Shorthand configurations" hint="Cr and Cu are the d⁴ / d⁹ exceptions." items={ECONFIG_SHORT} />
  </section>
}
export function TrendsSheet({ openLessonId }) {
  const t = TRENDS_WS
  return <section className="ws-section">
    <div className="ws-intro">
      <p>For any pair: if the periods differ, start there (more energy levels = bigger atom, lower ionization energy). If they are in the same period, compare left and right. Rank lists by typing symbols in order: <code>Ar, P, Si, Mg, Na</code>.</p>
      <ReviewLink onClick={() => openLessonId('c3-radius')}>Review atomic and ionic radius first</ReviewLink>
      <TrendRef />
    </div>
    <StepPart title="Atomic radius: which atom is larger?" items={t.radiusPairs} />
    <StepPart title="Atomic radius: trends and reasons" items={t.radiusWhy} />
    <StepPart title="Ionic radius" hint="#9: which particle is larger?" items={t.ionic} />
    <StepPart title="Ionization energy" hint="#12: which has the larger ionization energy?" items={t.ionization} />
    <StepPart title="Electronegativity" hint="#16: which has the higher electronegativity?" items={t.electronegativity} />
    <StepPart title="Electron affinity" items={t.affinity} />
  </section>
}
export function Unit3Sheet({ openLessonId }) {
  const u = UNIT3_ITEMS
  return <section className="ws-section">
    <div className="ws-intro">
      <p>Everything on the Unit 3 exam: electrons and sublevels, configurations (longhand, shorthand and ions), orbital diagrams, trends and families. Answers match your class key.</p>
      <ReviewLink onClick={() => openLessonId('c3-longhand')}>Review electron configurations first</ReviewLink>
    </div>
    <StepPart title="Electron / atom questions (1–14)" items={u.basics} />
    <StepPart title="Identify the element (15–17)" items={u.identify} />
    <StepPart title="Name the term (18–24)" items={u.terms} />
    <StepPart title="Draw orbital diagrams (25–27)" items={u.diagrams} />
    <StepPart title="Longhand configurations (28–30)" items={u.longhand} />
    <StepPart title="Shorthand configurations (31–34)" items={u.shorthand} />
    <StepPart title="Shorthand configurations for ions (35–39)" hint="Your class brackets the noble gas below the ion’s electron count: K⁺ → [Ne] 3s² 3p⁶." items={u.ions} />
    <StepPart title="Atomic radius (40–43)" items={u.radius} />
    <StepPart title="First ionization energy (44–47)" items={u.ionization} />
    <StepPart title="Electronegativity (48–50)" items={u.electronegativity} />
    <StepPart title="Which particle has the larger radius? (51–52)" items={u.particle} />
    <FamilyMap />
  </section>
}
