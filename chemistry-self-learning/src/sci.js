// Number formatting and answer parsing shared by the Chapter 1-3 engines.
const SUP = { '-': '⁻', '+': '⁺', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' }
export const sup = s => String(s).split('').map(ch => SUP[ch] ?? ch).join('')
export const subs = s => String(s).replace(/\d/g, d => '₀₁₂₃₄₅₆₇₈₉'[d])

// Round to `sf` significant figures and return mantissa/exponent.
export function sigParts(x, sf) {
  if (x === 0) return { mant: (0).toFixed(sf - 1), exp: 0 }
  let exp = Math.floor(Math.log10(Math.abs(x)))
  // Round half away from zero on the decimal value (5.00 × 1.609 = 8.045 → 8.05, not 8.04).
  const round = e => { const scaled = Math.abs(x) / 10 ** e * 10 ** (sf - 1); return Math.sign(x) * Math.round(Number(scaled.toPrecision(12))) / 10 ** (sf - 1) }
  let mant = round(exp)
  if (Math.abs(mant) >= 10) { exp += 1; mant = round(exp) }
  return { mant: mant.toFixed(sf - 1), exp }
}

export const sci = (x, sf = 3) => { const { mant, exp } = sigParts(x, sf); return exp === 0 ? mant : `${mant} × 10${sup(exp)}` }

// Plain decimal with `sf` significant figures: 280. g, 15,340 yr, 0.0061 g.
export function fixed(x, sf = 3) {
  const { mant, exp } = sigParts(x, sf)
  const digits = mant.replace('-', '').replace('.', '')
  const neg = x < 0 ? '-' : ''
  if (exp >= sf - 1) {
    const whole = digits + '0'.repeat(exp - (sf - 1))
    const grouped = whole.length > 4 ? whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : whole
    // A trailing zero that is significant gets a decimal point (280. has 3 sig figs).
    return neg + grouped + (exp === sf - 1 && digits.endsWith('0') ? '.' : '')
  }
  if (exp >= 0) return neg + digits.slice(0, exp + 1) + '.' + digits.slice(exp + 1)
  return neg + '0.' + '0'.repeat(-exp - 1) + digits
}

export const roundSig = (x, sf) => Number(Number(x).toPrecision(sf))

// Read what a student types: 3.2e-19, 3.2 x 10^-19, 3.2×10⁻¹⁹, 15,340 yr, 280. g
const UNSUP = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁻': '-', '⁺': '+' }
export function parseNumber(input) {
  let s = String(input).trim().replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺]/g, ch => UNSUP[ch]).replace(/−/g, '-').replace(/,/g, '').replace(/\s+/g, '')
  s = s.replace(/(\d)\s*[x×*·]\s*10\^?\(?([+-]?\d+)\)?/i, '$1e$2')
  const m = s.match(/^[+-]?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?/i)
  return m ? Number(m[0]) : NaN
}

export const closeTo = (a, b, rel = 0.012) => Number.isFinite(a) && Math.abs(a - b) <= rel * Math.abs(b) + 1e-300
