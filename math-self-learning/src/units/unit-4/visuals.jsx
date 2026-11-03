// Drawings used only by Unit 4 lesson animations.
import { TeX } from '../../TeX.jsx'

const R = String.raw

const TERMS = [{ tex: 'x^3', deg: 3 }, { tex: '+2', deg: 0 }, { tex: '-3x', deg: 1 }, { tex: '-2x^2', deg: 2 }]
const ORDER = [0, 3, 2, 1]
export function StandardForm({ step }) {
  const placed = [0, 1, 2, 4, 4][step]
  return <div className="sf">
    <div className="sf-row">{TERMS.map((t, i) => <div key={t.tex} className={`sf-chip ${ORDER.slice(0, placed).includes(i) ? 'used' : ''}`}><TeX math={t.tex} /><span className="sf-deg">degree {t.deg}</span></div>)}</div>
    <div className="sf-arrow" aria-hidden="true">↓ highest degree first</div>
    <div className="sf-row sf-target">{ORDER.map((idx, slot) => <div key={slot} className={`sf-slot ${slot < placed ? 'filled' : ''}`}>{slot < placed && <TeX math={slot === 0 ? TERMS[idx].tex : TERMS[idx].tex} />}</div>)}</div>
    {step === 4 && <div className="sf-name"><TeX math={R`x^3 - 2x^2 - 3x + 2`} /> · degree 3 → <strong>cubic</strong> · 4 terms → <strong>polynomial with 4 terms</strong></div>}
  </div>
}
