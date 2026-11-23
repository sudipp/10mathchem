// Chapter 1: the class reference sheets (conversions, constants, periodic table with charges).
import { MiniTable, RefTable, ReviewLink, StepPart } from './ChemBits.jsx'
import { CELL, cellCenter } from './grid.js'
import { PREFIXES } from './measure.js'
import { CHAIN_STEPS, CONVERSION_ITEMS, LADDER_STEPS, THERMO_STEPS } from './ch1-data.js'

const INK = '#2E4036', ACCENT = '#CC5833', SOFT = '#e5e6db', MUTED = '#879783'

// ---------- Figures ----------
export function PrefixLadder({ step }) {
  const s = LADDER_STEPS[step]
  const x = i => 16 + i * 64
  return <svg viewBox="0 0 600 320" role="img" aria-label={`Metric prefix ladder. ${s.text}`}>
    <text x="300" y="40" className="diagram-caption">BIGGER UNITS ←                                → SMALLER UNITS</text>
    {PREFIXES.map((p, i) => {
      const on = i === s.from || i === s.to
      return <g key={p.name}>
        <rect x={x(i)} y="70" width="56" height="86" rx="14" fill={i === s.from ? ACCENT : i === s.to ? INK : SOFT} />
        <text x={x(i) + 28} y="112" textAnchor="middle" fontSize="26" fontWeight="600" fill={on ? '#fff' : INK}>{p.sym || '—'}</text>
        <text x={x(i) + 28} y="140" textAnchor="middle" fontSize="12" fill={on ? '#fff' : '#536448'}>10{String(p.power).split('').map(c => ({ '-': '⁻' }[c] ?? '⁰¹²³⁴⁵⁶⁷⁸⁹'[c])).join('')}</text>
        <text x={x(i) + 28} y="178" className="diagram-caption">{p.name === 'base unit' ? 'base' : p.name}</text>
      </g>
    })}
    {s.arrow && <path d={`M ${x(s.from) + 28} 196 Q ${(x(s.from) + x(s.to)) / 2 + 28} 236 ${x(s.to) + 28} 196`} fill="none" stroke={ACCENT} strokeWidth="3" markerEnd="url(#arrowhead)" />}
    <defs><marker id="arrowhead" markerWidth="10" markerHeight="10" refX="6" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill={ACCENT} /></marker></defs>
    <text x="300" y="282" textAnchor="middle" fontSize="22" fontWeight="600" fill={INK}>{s.text}</text>
    <text x="300" y="308" className="diagram-caption">Base units: g (mass) · L (volume) · m (length) · s (time)</text>
  </svg>
}

function Term({ x, y, text, cancel, size = 24 }) {
  const [num, ...unit] = text.split(' ')
  const u = unit.join(' ')
  const struck = cancel.includes(u)
  return <text x={x} y={y} textAnchor="middle" fontSize={size} fontWeight="600" fill={INK}>{num} <tspan fill={struck ? ACCENT : INK} style={struck ? { textDecoration: 'line-through' } : undefined}>{u}</tspan></text>
}
export function FactorChain({ step }) {
  const s = CHAIN_STEPS[step]
  const cols = [s.start, ...s.factors]
  const w = 150, x0 = 300 - ((cols.length - 1) * w) / 2 - (s.result ? 60 : 0)
  return <svg viewBox="0 0 600 320" role="img" aria-label={`Factor-label chain: ${s.start} ${s.factors.map(f => `times ${f[0]} over ${f[1]}`).join(' ')} ${s.result}`}>
    <text x="300" y="50" className="diagram-caption">MULTIPLY BY FRACTIONS THAT EQUAL 1 · CANCEL THE UNIT YOU DON'T WANT</text>
    {cols.map((c, i) => {
      const cx = x0 + i * w
      return <g key={i}>
        {i > 0 && <text x={cx - w / 2} y="168" textAnchor="middle" fontSize="26" fill={MUTED}>×</text>}
        {typeof c === 'string' ? <Term x={cx} y={168} text={c} cancel={s.cancel} /> : <g>
          <Term x={cx} y={146} text={c[0]} cancel={s.cancel} />
          <line x1={cx - 58} x2={cx + 58} y1="160" y2="160" stroke={INK} strokeWidth="2" />
          <Term x={cx} y={190} text={c[1]} cancel={s.cancel} />
        </g>}
      </g>
    })}
    {s.result && <text x={x0 + (cols.length - 1) * w + 80} y="168" fontSize="26" fontWeight="700" fill={ACCENT}>{s.result}</text>}
    <text x="300" y="262" className="diagram-caption">{step < 3 ? 'From the sheet: 1 gallon = 3.78 liters' : 'From the sheet: 1 inch = 2.54 cm · and 1 m = 100 cm'}</text>
    <text x="300" y="290" className="diagram-caption">Units on top stay. Units on the bottom cancel matching units on top.</text>
  </svg>
}

export function Thermometers({ step }) {
  const s = THERMO_STEPS[step]
  const y = c => 250 - (c + 273) * (190 / 383)
  const scales = [
    { x: 140, name: '°F', v: c => Math.round(c * 9 / 5 + 32 * 10) / 10 },
    { x: 300, name: '°C', v: c => c },
    { x: 460, name: 'K', v: c => c + 273 },
  ]
  const val = (sc, c) => sc.name === '°F' ? Math.round((c * 9 / 5 + 32) * 10) / 10 : sc.v(c)
  return <svg viewBox="0 0 600 320" role="img" aria-label={`${s.label}: ${val(scales[0], s.c)} °F, ${s.c} °C, ${s.c + 273} K`}>
    {scales.map(sc => <g key={sc.name}>
      <rect x={sc.x - 9} y="50" width="18" height="205" rx="9" fill={SOFT} />
      <rect x={sc.x - 9} y={y(s.c)} width="18" height={255 - y(s.c)} rx="9" fill={ACCENT} />
      <circle cx={sc.x} cy="262" r="17" fill={ACCENT} />
      <text x={sc.x} y="36" textAnchor="middle" fontSize="18" fontWeight="700" fill={INK}>{sc.name}</text>
      {[-273, 0, 100].map(c => <line key={c} x1={sc.x - 16} x2={sc.x - 10} y1={y(c)} y2={y(c)} stroke={MUTED} strokeWidth="2" />)}
      {(!s.partial || sc.name !== 'K') && <g>
        <line x1={sc.x + 10} x2={sc.x + 26} y1={y(s.c)} y2={y(s.c)} stroke={INK} strokeWidth="2" />
        <text x={sc.x + 30} y={y(s.c) + 6} fontSize="17" fontWeight="700" fill={INK}>{sc.name === '°F' ? val(sc, s.c) : sc.name === 'K' ? s.c + 273 : s.c.toFixed(s.c === 37 ? 1 : 0)}</text>
      </g>}
    </g>)}
    <text x="300" y="306" className="diagram-caption">{s.label.toUpperCase()} · °C = 5/9(°F − 32) · K = °C + 273</text>
  </svg>
}

const GROUP_CHARGE = { 1: '+1', 2: '+2', 13: '+3', 14: '−4', 15: '−3', 16: '−2', 17: '−1', 18: '0' }
export function ElementTile({ step }) {
  if (step < 3) {
    const parts = [['11', 'Atomic number = protons'], ['Na', 'Symbol'], ['Sodium', 'Name'], ['22.99', 'Average atomic mass (amu)']]
    const hi = [0, 1, 3][step]
    return <svg viewBox="0 0 600 320" role="img" aria-label={`Sodium box: ${parts[hi][1]} is ${parts[hi][0]}`}>
      <rect x="110" y="40" width="170" height="220" rx="18" fill="#fffdf7" stroke={INK} strokeWidth="3" />
      <text x="128" y="78" fontSize="26" fontWeight="700" fill={hi === 0 ? ACCENT : INK}>11</text>
      <text x="195" y="160" textAnchor="middle" fontSize="70" fontWeight="700" fill={hi === 1 ? ACCENT : INK}>Na</text>
      <text x="195" y="200" textAnchor="middle" fontSize="18" fill={hi === 1 ? ACCENT : INK}>Sodium</text>
      <text x="195" y="240" textAnchor="middle" fontSize="20" fontWeight="600" fill={hi === 3 ? ACCENT : INK}>22.99</text>
      {parts.map(([, label], i) => i === 2 ? null : <g key={label} opacity={i === hi ? 1 : 0.35}>
        <line x1="290" x2="350" y1={[70, 150, 0, 234][i]} y2={[70, 150, 0, 234][i]} stroke={i === hi ? ACCENT : MUTED} strokeWidth="2" />
        <text x="358" y={[75, 155, 0, 239][i]} fontSize="16" fontWeight="600" fill={INK}>{i === 1 ? 'Symbol + name' : label}</text>
      </g>)}
      <text x="300" y="300" className="diagram-caption">EVERY BOX ON THE TABLE FOLLOWS THIS LAYOUT</text>
    </svg>
  }
  const [nx, ny] = cellCenter(11)
  return <svg viewBox="0 0 600 320" role="img" aria-label={step === 3 ? 'Sodium is in group 1, period 3' : 'Common ion charge for each main group'}>
    <MiniTable skipF fill={z => step === 3 ? (z === 11 ? ACCENT : null) : null} />
    {step === 3 && <g>
      <rect x={CELL.x0 + 1} y={CELL.y0 + 2 * CELL.h} width={18 * CELL.w - 2} height={CELL.h} fill="none" stroke={INK} strokeWidth="2.5" rx="5" />
      <rect x={CELL.x0 + 1} y={CELL.y0} width={CELL.w - 2} height={7 * CELL.h} fill="none" stroke={ACCENT} strokeWidth="2.5" rx="5" />
      <text x={CELL.x0 + 7.5 * CELL.w} y={ny + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill={INK}>← period 3 (row) →</text>
      <text x={nx + 10} y={CELL.y0 + 7 * CELL.h + 22} fontSize="14" fontWeight="700" fill={ACCENT}>↑ group 1 (column)</text>
    </g>}
    {step === 4 && Object.entries(GROUP_CHARGE).map(([g, q]) => <text key={g} x={CELL.x0 + (g - 0.5) * CELL.w} y={CELL.y0 + 7 * CELL.h + 22} textAnchor="middle" fontSize="13" fontWeight="700" fill={q.startsWith('+') ? ACCENT : INK}>{q}</text>)}
    {step === 4 && <text x="300" y="300" className="diagram-caption">METALS LOSE ELECTRONS (+) · NONMETALS GAIN ELECTRONS (−)</text>}
  </svg>
}

// ---------- Reference tables (from the class sheet) ----------
export function PrefixRef() {
  return <RefTable title="FROM YOUR REFERENCE SHEET · METRIC PREFIXES" head={['Prefix', 'Symbol', 'Factor', 'Example']} rows={PREFIXES.map(p => [p.name, p.sym || 'L, m, g, s', `10${p.power === 0 ? '⁰' : String(p.power).replace('-', '⁻').replace(/\d/g, d => '⁰¹²³⁴⁵⁶⁷⁸⁹'[d])}`, p.power === 0 ? '—' : p.power > 0 ? `1 ${p.sym}g = ${(10 ** p.power).toLocaleString('en-US')} g` : `1 g = ${(10 ** -p.power).toLocaleString('en-US')} ${p.sym}g`])} />
}
export function ConversionRef() {
  return <RefTable title="FROM YOUR REFERENCE SHEET · CONVERSIONS" head={['Type', 'Equalities']} rows={[
    ['Mass', '16 ounces = 1 pound · 1 kilogram = 2.2 pounds · 454 grams = 1 pound · 1 ton = 2000 pounds'],
    ['Volume', '1 liter = 1.0567 quarts · 1 mL = 1 cm³ · 1 gallon = 3.78 liters = 4 quarts = 128 ounces · 1 quart = 2 pints = 32 ounces · 1 pint = 2 cups = 16 ounces'],
    ['Length', '1 inch = 2.54 cm · 1 mile = 5280 ft = 1.609 km · 1 yard = 3 feet = 36 inches = 0.9144 m · 1 meter = 39.37 inches = 3.281 feet = 1.094 yards · 1 km = 1094 yards = 0.6215 miles'],
    ['Time', '1 year = 365 days = 12 months = 52 weeks · 1 day = 24 hours · 1 hour = 60 minutes · 1 minute = 60 seconds'],
  ]} />
}
export function ConstantsRef() {
  return <RefTable title="FROM YOUR REFERENCE SHEET · TEMPERATURE, ENERGY & CONSTANTS" head={['Quantity', 'Value']} rows={[
    ['Temperature', '°C = 5/9(°F − 32) · °F = (°C × 9/5) + 32 · K = °C + 273'],
    ['Density of water', '1 g/mL = 1 g/cm³'],
    ['Energy', '1 calorie = 4.184 J'],
    ['Pressure', '1 atm = 760 torr = 760 mm Hg = 101.325 kPa = 14.7 psi'],
    ['Avogadro’s number', '6.02 × 10²³ particles/mol'],
    ['Ideal gas constant', '0.0821 L·atm/(mol·K) or 8.314 L·kPa/(mol·K)'],
    ['Speed of light (c)', '3.00 × 10⁸ m/s'],
    ['Planck’s constant (h)', '6.63 × 10⁻³⁴ J·s (your Chapter 2 worksheets use 6.6262 × 10⁻³⁴)'],
  ]} />
}
export function ChargeRef() {
  return <RefTable title="FROM YOUR CLASS PERIODIC TABLE · COMMON ION CHARGES" head={['Group', '1', '2', '13', '14', '15', '16', '17', '18']} rows={[['Charge', '+1', '+2', '+3', '−4', '−3', '−2', '−1', '0']]} note="Also on your table: Ag⁺¹, Zn⁺² and Cd⁺². These cations do not need a Roman numeral." />
}


export function ConversionSheet({ openLessonId }) {
  return <section className="ws-section">
    <div className="ws-intro">
      <p>Chapter 1 is your <strong>reference sheet</strong>, so there is no class worksheet. Use these practice problems, built only from the equalities on your sheet, to get fast at metric prefixes, conversion factors and temperature.</p>
      <ReviewLink onClick={() => openLessonId('c1-factor')}>Review the conversion-factor lesson first</ReviewLink>
      <PrefixRef />
    </div>
    <StepPart title="Metric prefixes" hint="Type numbers normally or in scientific notation: 4.34e-7" items={CONVERSION_ITEMS.slice(0, 6)} />
    <StepPart title="Conversion factors" hint="Use the equalities from your reference sheet. Cancel the unit you don’t want." items={CONVERSION_ITEMS.slice(6, 13)} />
    <StepPart title="Temperature" hint="°C = 5/9(°F − 32) · °F = (°C × 9/5) + 32 · K = °C + 273" items={CONVERSION_ITEMS.slice(13)} />
  </section>
}
