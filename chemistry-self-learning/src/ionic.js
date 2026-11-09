// Ionic compounds: Type I (metals with one charge), Type II (metals with more
// than one charge, named with Roman numerals), and Type III (polyatomic ions).
// Formulas are computed by criss-crossing the charges and reducing.

// Type I metals have one possible charge: groups 1, 2, 13 (Al), plus Zn, Cd, Ag.
export const CATIONS = {
  Li: { name: 'lithium', charge: 1, why: 'in group 1' },
  Na: { name: 'sodium', charge: 1, why: 'in group 1' },
  K: { name: 'potassium', charge: 1, why: 'in group 1' },
  Mg: { name: 'magnesium', charge: 2, why: 'in group 2' },
  Ca: { name: 'calcium', charge: 2, why: 'in group 2' },
  Ba: { name: 'barium', charge: 2, why: 'in group 2' },
  Al: { name: 'aluminum', charge: 3, why: 'in group 13' },
  Zn: { name: 'zinc', charge: 2, why: 'always +2 (a Type I exception)' },
  Cd: { name: 'cadmium', charge: 2, why: 'always +2 (a Type I exception)' },
  Ag: { name: 'silver', charge: 1, why: 'always +1 (a Type I exception)' },
}

// Type II metals can form more than one charge, so the name needs a Roman numeral.
export const TYPE2 = { Cu: 'copper', Fe: 'iron', Pb: 'lead', Sn: 'tin', Mn: 'manganese', Cr: 'chromium', Au: 'gold', Pt: 'platinum', Ni: 'nickel', Co: 'cobalt', Hg: 'mercury' }
export const OLD_NAMES = [['Fe', 2, 'ferrous'], ['Fe', 3, 'ferric'], ['Cu', 1, 'cuprous'], ['Cu', 2, 'cupric'], ['Sn', 2, 'stannous'], ['Sn', 4, 'stannic']]

export const ANIONS = {
  N: { element: 'nitrogen', name: 'nitride', charge: -3, why: 'in group 15' },
  P: { element: 'phosphorus', name: 'phosphide', charge: -3, why: 'in group 15' },
  O: { element: 'oxygen', name: 'oxide', charge: -2, why: 'in group 16' },
  S: { element: 'sulfur', name: 'sulfide', charge: -2, why: 'in group 16' },
  F: { element: 'fluorine', name: 'fluoride', charge: -1, why: 'in group 17' },
  Cl: { element: 'chlorine', name: 'chloride', charge: -1, why: 'in group 17' },
  Br: { element: 'bromine', name: 'bromide', charge: -1, why: 'in group 17' },
  I: { element: 'iodine', name: 'iodide', charge: -1, why: 'in group 17' },
}

// Common polyatomic ions (the class reference list). NH4 is the one positive ion.
export const POLYATOMIC = {
  NH4: { name: 'ammonium', charge: 1 },
  OH: { name: 'hydroxide', charge: -1 },
  NO3: { name: 'nitrate', charge: -1 },
  NO2: { name: 'nitrite', charge: -1 },
  C2H3O2: { name: 'acetate', charge: -1 },
  CN: { name: 'cyanide', charge: -1 },
  MnO4: { name: 'permanganate', charge: -1 },
  HCO3: { name: 'hydrogen carbonate (bicarbonate)', charge: -1 },
  ClO4: { name: 'perchlorate', charge: -1 },
  ClO3: { name: 'chlorate', charge: -1 },
  ClO2: { name: 'chlorite', charge: -1 },
  ClO: { name: 'hypochlorite', charge: -1 },
  CO3: { name: 'carbonate', charge: -2 },
  SO4: { name: 'sulfate', charge: -2 },
  SO3: { name: 'sulfite', charge: -2 },
  C2O4: { name: 'oxalate', charge: -2 },
  CrO4: { name: 'chromate', charge: -2 },
  Cr2O7: { name: 'dichromate', charge: -2 },
  PO4: { name: 'phosphate', charge: -3 },
}

const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII']
const gcd = (a, b) => { while (b) [a, b] = [b, a % b]; return a }
const SUP = { '+': '⁺', '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' }
export const charge = n => `${n > 0 ? '+' : '-'}${Math.abs(n)}`.split('').map(ch => SUP[ch]).join('')
export const pretty = f => f.replace(/\d/g, d => '₀₁₂₃₄₅₆₇₈₉'[d])

// Ion keys: 'Li' (Type I), 'Fe+3' (Type II with its charge), 'O' (anion), 'PO4' / 'NH4' (polyatomic).
export function ion(key) {
  const m = key.match(/^([A-Z][a-z]?)\+(\d)$/)
  if (m) return { key, sym: m[1], name: `${TYPE2[m[1]]}(${ROMAN[+m[2]]})`, element: TYPE2[m[1]], charge: +m[2], type2: true, why: `a Type II metal (it can have more than one charge), here ${charge(+m[2])}` }
  if (CATIONS[key]) return { key, sym: key, ...CATIONS[key], element: CATIONS[key].name }
  if (ANIONS[key]) return { key, sym: key, ...ANIONS[key] }
  if (POLYATOMIC[key]) return { key, sym: key, ...POLYATOMIC[key], element: POLYATOMIC[key].name, poly: true, why: `a polyatomic ion with charge ${charge(POLYATOMIC[key].charge)}` }
  throw new Error(`Unknown ion ${key}`)
}

const part = (io, n) => io.poly && n > 1 ? `(${io.sym})${n}` : `${io.sym}${n > 1 ? n : ''}`

export function ionic(catKey, anKey) {
  const c = ion(catKey), a = ion(anKey)
  const raw = [Math.abs(a.charge), c.charge]
  const g = gcd(raw[0], raw[1])
  const sub = [raw[0] / g, raw[1] / g]
  return {
    cat: c.sym, an: a.sym, c, a, raw, g, sub,
    cancels: c.charge === Math.abs(a.charge),
    crossed: `${c.poly && raw[0] > 1 ? `(${c.sym})` : c.sym}${raw[0]}${a.poly && raw[1] > 1 ? `(${a.sym})` : a.sym}${raw[1]}`,
    formula: part(c, sub[0]) + part(a, sub[1]),
    name: `${c.name} ${a.name}`,
    poly: !!(c.poly || a.poly),
  }
}

// From a formula, work backwards to the Type II cation's charge: x·(cations) + (anion charge)·(anions) = 0.
export const reverseCharge = r => (Math.abs(r.a.charge) * r.sub[1]) / r.sub[0]

// The Type I Nomenclature WS grid, and the examples from the class notes.
export const WORKSHEET = { cations: ['Li', 'Ca', 'Al', 'Ag', 'K'], anions: ['O', 'Cl', 'P', 'S', 'Br', 'N'], example: 'Li-O', title: 'Type I Nomenclature WS', exampleText: 'Li₂O' }
export const NOTES_NAME_TO_FORMULA = [['K', 'Cl'], ['Mg', 'P'], ['Na', 'O'], ['Al', 'Br'], ['Ag', 'S']]
export const NOTES_FORMULA_TO_NAME = [['Al', 'Br'], ['Li', 'N'], ['Zn', 'F'], ['Ca', 'O'], ['Cd', 'P']]
export const NOTES_EXAMPLES = [['Na', 'Cl'], ['Na', 'S'], ['Ca', 'N']]

// Type II Nomenclature WS grid and the Type II class-note examples.
export const WORKSHEET2 = { cations: ['Cu+1', 'Fe+2', 'Pb+4'], anions: ['O', 'Cl', 'P', 'S', 'Br', 'N'], example: 'Cu+1-O', title: 'Type II Nomenclature WS', exampleText: 'Cu₂O' }
export const NOTES2_NAME_TO_FORMULA = [['Fe+3', 'S'], ['Mn+4', 'N'], ['Cu+2', 'O'], ['Pb+2', 'P']]
export const NOTES2_FORMULA_TO_NAME = [['Cr+3', 'Cl'], ['Zn', 'P'], ['Au+1', 'O'], ['Pt+3', 'Br'], ['Pb+4', 'O']]
// (Covalent & Type I review) on the Type II WS: ionic pairs or covalent [[sym, n], [sym, n]].
export const WS2_REVIEW = [['Zn', 'P'], ['Al', 'S'], ['Mg', 'Cl'], [['C', 4], ['F', 7]], ['K', 'Br'], ['Ag', 'S'], [['S', 3], ['O', 7]], [['N', 3], ['O', 8]]]

// Type III WS rows in worksheet order: [cation, anion, which column is given]. Row 5 is blank on the sheet.
export const WORKSHEET3 = [
  ['Al', 'OH', 'name', 'example'], ['K', 'CO3', 'name'], ['Sn+2', 'PO4', 'formula'], ['Fe+3', 'ClO3', 'name'], null,
  ['Pb+4', 'NO3', 'name'], ['Au+1', 'C2H3O2', 'name'], ['Na', 'C2H3O2', 'formula'], ['NH4', 'Br', 'formula'], ['Ba', 'CN', 'name'],
  ['Pb+2', 'C2O4', 'formula'], ['Ca', 'MnO4', 'name'], ['Cr+3', 'PO4', 'formula'], ['Ni+1', 'SO3', 'formula'], ['Mn+5', 'NO2', 'name'], ['Mg', 'ClO4', 'name'],
]
