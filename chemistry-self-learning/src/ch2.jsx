// Chapter 2: atomic theory, atomic structure, light, Bohr, nuclear chemistry and half-life.
import { RefTable, ReviewLink, StepPart } from './ChemBits.jsx'
import { SPECTRUM, averageMass, chargeText } from './atomic.js'
import { sci } from './sci.js'
import { AVERAGE_ITEMS, HALF_ITEMS, HALF_NOTES, IODINE, ISO_STEPS, LINES, NUCLEAR_BLANKS, NUCLEAR_DESCRIBE, NUC_STEPS, PARTICLE_REVIEW, PHOTONS, RADIATION_TABLE, REVIEW_EQUATIONS, REVIEW_HALF, REVIEW_LIGHT, SERIES_ITEMS, STRUCTURE_ITEMS, THEORY, THEORY_ITEMS, WAVE_ITEMS } from './ch2-data.js'

const INK = '#2E4036', ACCENT = '#CC5833', SOFT = '#e5e6db', MUTED = '#879783'

// ---------- Figures ----------
function ModelSketch({ i, cx, cy }) {
  const r = 52
  if (i === 0 || i === 2) return <g><circle cx={cx} cy={cy} r={r} fill={i === 0 ? '#b9bfb2' : '#7d8c80'} /><circle cx={cx - 16} cy={cy - 18} r="12" fill="#fff" opacity=".35" /></g>
  if (i === 1) return <g><path d={`M ${cx - 14} ${cy - 55} h 28 v 34 l 30 54 q 6 14 -10 14 h -68 q -16 0 -10 -14 l 30 -54 z`} fill="#e7d9b8" stroke={INK} strokeWidth="3" /><path d={`M ${cx - 36} ${cy + 22} h 72 l 8 16 q 4 9 -8 9 h -72 q -12 0 -8 -9 z`} fill="#d9a441" /></g>
  if (i === 3) return <g><rect x={cx - 34} y={cy - 18} width="40" height="36" rx="8" fill="#9aa99c" />{[-30, -10, 10, 30].map(a => <line key={a} x1={cx + 10} y1={cy + a / 3} x2={cx + 60} y2={cy + a} stroke={ACCENT} strokeWidth="3" strokeDasharray="6 5" />)}<text x={cx - 14} y={cy + 6} textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">U</text></g>
  if (i === 4) return <g><circle cx={cx} cy={cy} r={r} fill="#f1c9b6" />{[[-20, -22], [18, -28], [-30, 10], [24, 8], [-4, 30], [4, -4]].map(([dx, dy], k) => <g key={k}><circle cx={cx + dx} cy={cy + dy} r="8" fill={INK} /><text x={cx + dx} y={cy + dy + 4} textAnchor="middle" fontSize="12" fill="#fff">−</text></g>)}</g>
  if (i === 5) return <g><circle cx={cx} cy={cy} r={r} fill="none" stroke={MUTED} strokeDasharray="4 5" /><circle cx={cx} cy={cy} r="7" fill={ACCENT} />{[[-60, -20, 60, -20], [-60, 4, 60, 4], [-60, 24, -8, 4]].map(([x1, y1, x2, y2], k) => <line key={k} x1={cx + x1} y1={cy + y1} x2={cx + x2} y2={cy + y2} stroke={INK} strokeWidth="2" markerEnd="url(#ah2)" />)}</g>
  if (i === 6) return <g>{[18, 34, 50].map(rr => <circle key={rr} cx={cx} cy={cy} r={rr} fill="none" stroke={MUTED} strokeWidth="1.5" />)}<circle cx={cx} cy={cy} r="8" fill={ACCENT} /><circle cx={cx + 34} cy={cy} r="6" fill={INK} /><circle cx={cx - 18} cy={cy} r="6" fill={INK} /><circle cx={cx} cy={cy - 50} r="6" fill={INK} /></g>
  if (i === 7) return <g>{Array.from({ length: 90 }, (_, k) => { const a = k * 2.4, rr = 6 + (k * 37 % 50); return <circle key={k} cx={cx + rr * Math.cos(a)} cy={cy + rr * Math.sin(a)} r="2.6" fill={INK} opacity={1 - rr / 60} /> })}<circle cx={cx} cy={cy} r="7" fill={ACCENT} /></g>
  return <g>{[[-9, -6, 1], [5, -9, 0], [9, 5, 1], [-4, 8, 0], [-12, 6, 0], [3, 1, 1]].map(([dx, dy, p], k) => <circle key={k} cx={cx + dx * 1.6} cy={cy + dy * 1.6} r="10" fill={p ? ACCENT : '#9aa99c'} stroke="#fff" strokeWidth="1.5" />)}<text x={cx} y={cy + 52} textAnchor="middle" fontSize="12" fill={INK}>red p⁺ · gray n⁰</text></g>
}
export function Timeline({ step }) {
  const t = THEORY[step]
  const x = k => 40 + k * 65
  return <svg viewBox="0 0 600 320" role="img" aria-label={`${t.who}, ${t.when}: ${t.idea}`}>
    <defs><marker id="ah2" markerWidth="8" markerHeight="8" refX="5" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill={INK} /></marker></defs>
    <line x1="40" x2="560" y1="36" y2="36" stroke={SOFT} strokeWidth="4" />
    {THEORY.map((th, k) => <g key={th.who}><circle cx={x(k)} cy="36" r={k === step ? 9 : 6} fill={k === step ? ACCENT : k < step ? INK : '#c9cdc2'} /><text x={x(k)} y="62" textAnchor="middle" fontSize="10" fontWeight={k === step ? 700 : 500} fill={k === step ? ACCENT : '#6b756d'}>{th.who === 'Schrödinger' ? 'Schröd.' : th.who}</text></g>)}
    <ModelSketch i={step} cx={130} cy={170} />
    <text x="240" y="120" fontSize="26" fontWeight="700" fill={INK}>{t.who}</text>
    <text x="240" y="146" fontSize="14" fontWeight="600" fill={ACCENT}>{t.when}</text>
    <foreignObject x="240" y="156" width="340" height="140"><p xmlns="http://www.w3.org/1999/xhtml" style={{ margin: 0, fontSize: 14, lineHeight: 1.45, color: INK }}>{t.how}</p></foreignObject>
  </svg>
}

function StackNuclide({ x, y, A, Z, sym, color = INK, size = 52, charge }) {
  return <g>
    <text x={x - 4} y={y - size * 0.42} textAnchor="end" fontSize={size * 0.42} fontWeight="600" fill={color}>{A}</text>
    <text x={x - 4} y={y + size * 0.1} textAnchor="end" fontSize={size * 0.42} fontWeight="600" fill={color}>{sym === 'e' && Z > 0 ? `+${Z}` : Z}</text>
    <text x={x} y={y} fontSize={size} fontWeight="700" fill={color}>{sym}</text>
    {charge && <text x={x + size * 0.62 * sym.length + 4} y={y - size * 0.45} fontSize={size * 0.42} fontWeight="700" fill={ACCENT}>{charge}</text>}
  </g>
}
export function IsotopeFigure({ step }) {
  const s = ISO_STEPS[step]
  const n = s.A - s.Z, e = s.Z - (s.q ?? 0)
  const rows = [['Protons', s.Z, s.show === 'Z'], ['Neutrons', n, s.show === 'n'], ['Electrons', e, s.show === 'e']]
  return <svg viewBox="0 0 600 320" role="img" aria-label={s.text}>
    <StackNuclide x={150} y={170} A={s.A} Z={s.Z} sym={s.sym} size={86} charge={s.q ? chargeText(s.q) : null} />
    {s.show === 'A' && <rect x="58" y="84" width="58" height="44" rx="10" fill="none" stroke={ACCENT} strokeWidth="3" />}
    {s.show === 'Z' && <rect x="58" y="136" width="58" height="44" rx="10" fill="none" stroke={ACCENT} strokeWidth="3" />}
    {rows.map(([label, v, hi], k) => <g key={label} opacity={step >= [1, 2, 3][k] || s.show === 'A' && k === 0 ? 1 : 0.3}>
      <rect x="340" y={78 + k * 58} width="210" height="46" rx="16" fill={hi ? ACCENT : SOFT} />
      <text x="358" y={108 + k * 58} fontSize="17" fontWeight="600" fill={hi ? '#fff' : INK}>{label}</text>
      <text x="532" y={108 + k * 58} textAnchor="end" fontSize="22" fontWeight="700" fill={hi ? '#fff' : INK}>{v}</text>
    </g>)}
    <text x="300" y="284" textAnchor="middle" fontSize="16" fontWeight="600" fill={INK}>{s.text}</text>
  </svg>
}

export function AverageFigure({ step }) {
  const avg = averageMass(IODINE)
  return <svg viewBox="0 0 600 320" role="img" aria-label={`Average atomic mass of iodine: ${avg.total.toFixed(2)} amu`}>
    {avg.parts.map((p, k) => <g key={k} opacity={step === 0 || step >= 1 ? 1 : 0.4}>
      <text x="40" y={70 + k * 62} fontSize="18" fontWeight="700" fill={INK}>I-{p.mass}</text>
      <rect x="120" y={52 + k * 62} width={4.2 * p.pct} height="26" rx="8" fill={k === 0 ? ACCENT : k === 1 ? INK : MUTED} />
      <text x={130 + 4.2 * p.pct} y={71 + k * 62} fontSize="15" fill={INK}>{p.pct}%</text>
      {step >= 1 && <text x="560" y={71 + k * 62} textAnchor="end" fontSize="16" fontWeight="600" fill={k + 1 === step || step === 4 ? ACCENT : INK}>{(p.pct / 100).toFixed(3)} × {p.mass} = {p.contribution.toFixed(3)}</text>}
    </g>)}
    {step >= 4 && <text x="300" y="262" textAnchor="middle" fontSize="24" fontWeight="700" fill={ACCENT}>Sum = {avg.total.toFixed(2)} amu</text>}
    <text x="300" y="300" className="diagram-caption">Change each % to a decimal · multiply by its mass · add them up</text>
  </svg>
}

function wavePath(x0, y0, width, cycles, amp) {
  let d = `M ${x0} ${y0}`
  for (let k = 0; k <= 200; k++) { const t = k / 200; d += ` L ${x0 + t * width} ${y0 - amp * Math.sin(t * cycles * 2 * Math.PI)}` }
  return d
}
// A wave whose frequency rises from left to right, like the spectrum from radio to gamma.
function chirpPath(x0, y0, width, amp) {
  let d = `M ${x0} ${y0}`
  for (let k = 0; k <= 400; k++) { const t = k / 400; d += ` L ${x0 + t * width} ${y0 - amp * Math.sin(2 * Math.PI * (1.5 * t + 11 * t * t))}` }
  return d
}
export function WaveFigure({ step }) {
  if (step <= 1) return <svg viewBox="0 0 600 320" role="img" aria-label={step === 0 ? 'Wavelength is the length of one complete wave' : 'Amplitude is the height from the middle line to a crest'}>
    <line x1="40" x2="560" y1="160" y2="160" stroke={MUTED} strokeDasharray="5 5" />
    <path d={wavePath(40, 160, 520, 3, 70)} fill="none" stroke={INK} strokeWidth="4" />
    {step === 0 && <g><line x1={40 + 520 / 12} x2={40 + 520 / 12 + 520 / 3} y1="70" y2="70" stroke={ACCENT} strokeWidth="3" /><text x={40 + 520 / 12 + 520 / 6} y="60" textAnchor="middle" fontSize="18" fontWeight="700" fill={ACCENT}>wavelength λ (crest to crest)</text></g>}
    {step === 1 && <g><line x1={40 + 520 / 12} x2={40 + 520 / 12} y1="160" y2="90" stroke={ACCENT} strokeWidth="3" /><text x={40 + 520 / 12 + 10} y="130" fontSize="18" fontWeight="700" fill={ACCENT}>amplitude</text><text x="430" y="252" fontSize="15" fill={INK}>trough ↑</text></g>}
    <text x="300" y="300" className="diagram-caption">{step === 0 ? 'λ is measured in meters (or nm: 1 m = 10⁹ nm)' : 'Amplitude: origin line to a crest or a trough'}</text>
  </svg>
  if (step === 2) return <svg viewBox="0 0 600 320" role="img" aria-label="High frequency waves have short wavelengths; low frequency waves have long wavelengths">
    <text x="40" y="60" fontSize="16" fontWeight="700" fill={ACCENT}>High frequency → short wavelength</text>
    <path d={wavePath(40, 110, 520, 9, 30)} fill="none" stroke={ACCENT} strokeWidth="3" />
    <text x="40" y="190" fontSize="16" fontWeight="700" fill={INK}>Low frequency → long wavelength</text>
    <path d={wavePath(40, 240, 520, 2, 30)} fill="none" stroke={INK} strokeWidth="3" />
    <text x="300" y="306" className="diagram-caption">c = λν: same speed, so when ν goes up, λ goes down (inverse)</text>
  </svg>
  const colors = ['#8a6d3b', '#a0522d', '#c0392b', '#e0a800', '#7d3c98', '#2e86c1', '#1e8449']
  return <svg viewBox="0 0 600 320" role="img" aria-label="Electromagnetic spectrum from radio to gamma">
    <path d={chirpPath(20, 90, 560, 24)} fill="none" stroke={MUTED} strokeWidth="2" />
    {SPECTRUM.map((name, k) => <g key={name}>
      <rect x={20 + k * 80} y="140" width="76" height="56" rx="12" fill={colors[k]} opacity={step === 3 ? 1 : 0.85} />
      <text x={58 + k * 80} y="174" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">{name === 'ultraviolet' ? 'UV' : name === 'infrared' ? 'IR' : name}</text>
    </g>)}
    <text x="20" y="230" fontSize="14" fontWeight="600" fill={INK}>← long λ · low ν · low energy</text>
    <text x="580" y="230" textAnchor="end" fontSize="14" fontWeight="600" fill={ACCENT}>short λ · high ν · high energy →</text>
    <text x="300" y="290" className="diagram-caption">Radio · Microwave · Infrared · Visible · Ultraviolet · X-ray · Gamma</text>
  </svg>
}

export function PhotonFigure({ step }) {
  const p = PHOTONS[Math.min(step, 2)]
  const E = 6.6262e-34 * p.nu
  if (step === 3) return <svg viewBox="0 0 600 320" role="img" aria-label="Photoelectric effect: light of high enough frequency knocks electrons out of a metal">
    <rect x="80" y="210" width="440" height="60" rx="10" fill="#9aa99c" />
    <text x="300" y="248" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff">metal</text>
    {[140, 230].map(x => <path key={x} d={wavePath(x - 60, 120, 110, 4, 8)} transform={`rotate(40 ${x} 150)`} fill="none" stroke="#e0a800" strokeWidth="3" />)}
    {[360, 440].map((x, k) => <g key={x}><line x1={x} y1="206" x2={x + 40} y2={130 - k * 20} stroke={INK} strokeWidth="3" markerEnd="url(#ah3)" /><circle cx={x + 46} cy={122 - k * 20} r="10" fill={ACCENT} /><text x={x + 46} y={127 - k * 20} textAnchor="middle" fontSize="14" fill="#fff">−</text></g>)}
    <defs><marker id="ah3" markerWidth="8" markerHeight="8" refX="5" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill={INK} /></marker></defs>
    <text x="300" y="300" className="diagram-caption">EINSTEIN 1905: LIGHT COMES IN PACKETS (PHOTONS) · E = hν</text>
  </svg>
  return <svg viewBox="0 0 600 320" role="img" aria-label={`${p.name}: E = hν = ${sci(E, 3)} J`}>
    <path d={wavePath(40, 90, 520, Math.min(4 + step * 6, 18), 30)} fill="none" stroke={p.color} strokeWidth="3" />
    <text x="300" y="170" textAnchor="middle" fontSize="20" fontWeight="700" fill={INK}>{p.name}: ν = {sci(p.nu, 3)} Hz</text>
    <text x="300" y="210" textAnchor="middle" fontSize="18" fill={INK}>E = hν = (6.6262 × 10⁻³⁴ J·s)({sci(p.nu, 3)} s⁻¹)</text>
    <text x="300" y="250" textAnchor="middle" fontSize="26" fontWeight="700" fill={ACCENT}>E = {sci(E, 3)} J</text>
    <text x="300" y="300" className="diagram-caption">HIGHER FREQUENCY → MORE ENERGY PER PHOTON (DIRECT)</text>
  </svg>
}

export function BohrFigure({ step }) {
  const cx = 165, cy = 150, r = n => 18 + n * 19
  const shown = LINES.slice(0, Math.max(0, step - 1) + (step >= 1 ? 1 : 0))
  const current = step >= 1 ? LINES[step - 1] : null
  const spec = nm => 330 + (nm - 400) * (240 / 300)
  return <svg viewBox="0 0 600 320" role="img" aria-label={step === 0 ? 'Bohr model: electrons only in fixed energy levels' : `Electron falls from level ${current.from} to level 2 and gives off a ${current.nm} nm photon`}>
    {[1, 2, 3, 4, 5, 6].map(n => <g key={n}><circle cx={cx} cy={cy} r={r(n)} fill="none" stroke={n === 2 ? INK : MUTED} strokeWidth={n === 2 ? 2 : 1.2} /><text x={cx - r(n) + 3} y={cy - 4} fontSize="10" fill={MUTED}>{n}</text></g>)}
    <circle cx={cx} cy={cy} r="10" fill={ACCENT} />
    {step === 0 && <g><circle cx={cx + r(1)} cy={cy} r="6" fill={INK} /><text x={cx} y="308" textAnchor="middle" fontSize="13" fill={INK}>ground state: lowest level</text></g>}
    {current && <g>
      <circle cx={cx + r(current.from) * Math.cos(-0.6)} cy={cy + r(current.from) * Math.sin(-0.6)} r="6" fill={INK} opacity=".35" />
      <line x1={cx + r(current.from) * Math.cos(-0.6)} y1={cy + r(current.from) * Math.sin(-0.6)} x2={cx + r(2) * Math.cos(-0.6)} y2={cy + r(2) * Math.sin(-0.6)} stroke={current.color} strokeWidth="3" />
      <circle cx={cx + r(2) * Math.cos(-0.6)} cy={cy + r(2) * Math.sin(-0.6)} r="6" fill={INK} />
      <text x={cx} y="308" textAnchor="middle" fontSize="13" fill={INK}>n = {current.from} → n = 2 · photon out</text>
    </g>}
    <rect x="320" y="70" width="260" height="90" rx="8" fill="#111" />
    {shown.map(l => <rect key={l.nm} x={spec(l.nm) - 2} y="74" width="4" height="82" fill={l.color} />)}
    {shown.map(l => <text key={l.nm} x={spec(l.nm) + (l.nm === 410 ? -6 : l.nm === 434 ? 6 : 0)} y="178" textAnchor="middle" fontSize="11" fill={INK}>{l.nm}</text>)}
    <text x="450" y="210" textAnchor="middle" fontSize="14" fontWeight="600" fill={INK}>Hydrogen’s bright-line spectrum (nm)</text>
    <text x="450" y="236" textAnchor="middle" fontSize="12" fill={INK}>Energy in → excited state · photon out → ground</text>
  </svg>
}

export function NuclearFigure({ step }) {
  const s = NUC_STEPS[step]
  const items = [...s.left.map(x => ({ ...x })), 'arrow', ...s.right.map(x => ({ ...x }))]
  const sumA = list => list.reduce((t, x) => t + x.A, 0), sumZ = list => list.reduce((t, x) => t + x.Z, 0)
  let cursor = 70
  return <svg viewBox="0 0 600 320" role="img" aria-label={`${s.title}: ${s.note}`}>
    <text x="300" y="50" textAnchor="middle" fontSize="22" fontWeight="700" fill={ACCENT}>{s.title}</text>
    {items.map((it, k) => {
      if (it === 'arrow') { const x = cursor; cursor += 70; return <text key={k} x={x + 18} y="150" fontSize="34" fill={INK}>→</text> }
      const plus = k > 0 && items[k - 1] !== 'arrow'
      if (plus) { cursor += 34 }
      const x = cursor + 46
      cursor += 46 + it.sym.length * 30 + 20
      return <g key={k}>{plus && <text x={x - 64} y="150" fontSize="30" fill={MUTED}>+</text>}<StackNuclide x={x} y={150} A={it.A} Z={it.Z} sym={it.sym} size={54} color={it.hi ? ACCENT : INK} /></g>
    })}
    <text x="300" y="214" textAnchor="middle" fontSize="16" fill={INK}>Mass numbers: {sumA(s.left)} = {s.right.map(x => x.A).join(' + ')} · Atomic numbers: {sumZ(s.left)} = {s.right.map(x => x.Z).join(' + ')}</text>
    <text x="300" y="256" textAnchor="middle" fontSize="15" fontWeight="600" fill={INK}>{s.note}</text>
    <text x="300" y="300" className="diagram-caption">BOTH SIDES MUST MATCH: TOP NUMBERS AND BOTTOM NUMBERS</text>
  </svg>
}

export function HalfLifeFigure({ step }) {
  const x = n => 80 + n * 90, y = m => 250 - m * 18
  const pts = [0, 1, 2, 3, 4].map(n => [n, 10 / 2 ** n])
  let d = ''
  for (let k = 0; k <= 100; k++) { const n = k / 25; d += `${k ? 'L' : 'M'} ${x(n)} ${y(10 / 2 ** n)} ` }
  return <svg viewBox="0 0 600 320" role="img" aria-label={`After ${step} half-lives, ${pts[step][1]} g of cobalt-60 remain`}>
    <line x1="80" x2="80" y1="60" y2="250" stroke={MUTED} /><line x1="80" x2="460" y1="250" y2="250" stroke={MUTED} />
    <path d={d} fill="none" stroke={ACCENT} strokeWidth="3" opacity=".35" />
    {pts.slice(0, step + 1).map(([n, m]) => <g key={n}><circle cx={x(n)} cy={y(m)} r="7" fill={n === step ? ACCENT : INK} /><text x={x(n) + 10} y={y(m) - 10} fontSize="14" fontWeight="700" fill={INK}>{m} g</text><text x={x(n)} y="272" textAnchor="middle" fontSize="13" fill={INK}>{n}</text></g>)}
    <text x="270" y="296" textAnchor="middle" fontSize="12" fill={INK}>number of half-lives (1 half-life of Co-60 = 5.27 years)</text>
    <g transform="translate(470,80)">
      <text x="0" y="0" fontSize="14" fontWeight="700" fill={INK}>m_f = m_i(0.5)ᴺ</text>
      <text x="0" y="30" fontSize="13" fill={INK}>N = {step}</text>
      <text x="0" y="56" fontSize="13" fill={INK}>{`10 × 0.5${'⁰¹²³⁴⁵⁶⁷⁸⁹'[step] ?? `^${step}`}`}</text>
      <text x="0" y="84" fontSize="18" fontWeight="700" fill={ACCENT}>= {pts[step][1]} g</text>
      <text x="0" y="112" fontSize="12" fill={INK}>{(5.27 * step).toFixed(2)} years</text>
    </g>
  </svg>
}

export function HalfLifeFormulas() {
  return <RefTable title="YOUR CLASS FORMULAS · HALF-LIFE" head={['Find', 'Formula']} rows={[
    ['Final mass', 'm_f = m_i (.5)ᴺ   where N = time ÷ half-life'],
    ['Initial mass', 'm_i = m_f ÷ (.5)ᴺ'],
    ['Half-life', 't½ = time · log(.5) ÷ log(m_f / m_i)'],
    ['Time passed', 'time = t½ · log(m_f / m_i) ÷ log(.5)'],
  ]} note="These come from m_f = m_i(.5)ᴺ. When the unknown is in the exponent, take the log of both sides." />
}
export function LightFormulas() {
  return <RefTable title="EQUATIONS AND CONSTANTS · LIGHT" head={['Equation', 'Meaning']} rows={[
    ['c = λν   →   ν = c / λ,   λ = c / ν', 'c = 3.00 × 10⁸ m/s · λ in meters · ν in Hz (s⁻¹)'],
    ['E = hν   and   E = hc / λ', 'h = 6.6262 × 10⁻³⁴ J·s · E in joules'],
  ]} note="Change nm to meters first: 1 m = 10⁹ nm, so 630 nm = 6.30 × 10⁻⁷ m." />
}
export function ParticleTable() {
  return <RefTable title="TYPES OF RADIATION" head={['Particle', 'Symbol', 'Charge', 'Mass', 'Effect on the nucleus']} rows={[
    ['Alpha (α)', '⁴₂He', '+2', '4', 'mass − 4, atomic number − 2'],
    ['Beta (β⁻)', '⁰₋₁e', '−1', '0', 'mass same, atomic number + 1'],
    ['Positron (β⁺)', '⁰₊₁e', '+1', '0', 'mass same, atomic number − 1'],
    ['Gamma (γ)', '⁰₀γ', '0', '0', 'energy only: nothing changes'],
    ['Electron capture', '⁰₋₁e absorbed', '—', '—', 'mass same, atomic number − 1'],
  ]} note="Decay or emission: the particle is a product (right side). Capture: the particle is a reactant (left side)." />
}


// ---------- Sheets ----------
export function WaveSheet({ openLessonId }) {
  return <section className="ws-section">
    <div className="ws-intro">
      <p>Write the equation, plug in with units, then round. <strong>Change nm to meters first.</strong> Type answers in scientific notation like <code>3.2e-19</code> or <code>3.2 x 10^-19</code>.</p>
      <ReviewLink onClick={() => openLessonId('c2-photon')}>Review the photon energy lesson first</ReviewLink>
      <LightFormulas />
    </div>
    <StepPart title="Calculating frequency, wavelength and energy" hint="c = 3.00 × 10⁸ m/s · h = 6.6262 × 10⁻³⁴ J·s" items={WAVE_ITEMS} />
  </section>
}
export function NuclearSheet({ openLessonId }) {
  return <section className="ws-section">
    <div className="ws-intro">
      <p>Balance the <strong>top numbers</strong> (mass) and the <strong>bottom numbers</strong> (atomic number) separately, then use the atomic number to find the element. Type the missing piece like <code>Th-234</code>, <code>positron</code>, <code>beta</code> or <code>alpha</code>.</p>
      <ReviewLink onClick={() => openLessonId('c2-nuclear')}>Review the nuclear equations lesson first</ReviewLink>
      <ParticleTable />
    </div>
    <StepPart title="Exercise 21.2a: complete each equation" hint="Each equation has one blank (___)." items={NUCLEAR_BLANKS} />
    <StepPart title="Describe the changes in the nucleus" items={NUCLEAR_DESCRIBE} />
    <StepPart title="Types of radiation: complete the table" items={RADIATION_TABLE} />
    <StepPart title="Write the nuclear equation for each decay in the series" hint="Type the new nuclide that forms, e.g. Th-231. The answer shows the whole equation." items={SERIES_ITEMS} />
  </section>
}
export function HalfLifeSheet({ openLessonId }) {
  return <section className="ws-section">
    <div className="ws-intro">
      <p>Pick the formula that solves for what you want. Keep the class’s significant figures: the answers match your key.</p>
      <ReviewLink onClick={() => openLessonId('c2-halflife')}>Review the half-life lesson first</ReviewLink>
      <HalfLifeFormulas />
    </div>
    <StepPart title="Half-Life WS" items={HALF_ITEMS} />
    <StepPart title="Class notes examples" items={HALF_NOTES} />
  </section>
}
export function Unit2Sheet({ openLessonId }) {
  return <section className="ws-section">
    <div className="ws-intro">
      <p>Everything on the Unit 2 exam: atomic theory, atomic structure, average atomic mass, radiation, nuclear equations, half-life and light. Answers match your class key, with a few notes where the key needs a second look.</p>
      <ReviewLink onClick={() => openLessonId('c2-theory')}>Start with the atomic theory timeline</ReviewLink>
    </div>
    <StepPart title="Atomic theory: know each contribution" items={THEORY_ITEMS} />
    <StepPart title="Atomic structure: fill in the missing information" items={STRUCTURE_ITEMS} />
    <StepPart title="Average atomic mass" hint="Type the number only, e.g. 126.85" items={AVERAGE_ITEMS} />
    <StepPart title="Nuclear chemistry: the particles" items={PARTICLE_REVIEW} />
    <StepPart title="Write the nuclear equations" hint="Emission = decay. Beta capture = electron capture. Type the new nuclide, e.g. Th-231." items={REVIEW_EQUATIONS} />
    <StepPart title="Half-life" items={REVIEW_HALF} />
    <StepPart title="Light and energy" items={REVIEW_LIGHT} />
  </section>
}
