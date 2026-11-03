// Type I binary ionic compounds: metal cation + nonmetal anion.
// Formulas are computed by criss-crossing the charges and reducing.

// Type I metals have one possible charge: groups 1, 2, 13 (Al), plus Zn, Cd, Ag.
export const CATIONS = {
  Li: { name: 'lithium', charge: 1, why: 'in group 1' },
  Na: { name: 'sodium', charge: 1, why: 'in group 1' },
  K: { name: 'potassium', charge: 1, why: 'in group 1' },
  Mg: { name: 'magnesium', charge: 2, why: 'in group 2' },
  Ca: { name: 'calcium', charge: 2, why: 'in group 2' },
  Al: { name: 'aluminum', charge: 3, why: 'in group 13' },
  Zn: { name: 'zinc', charge: 2, why: 'always +2 (a Type I exception)' },
  Cd: { name: 'cadmium', charge: 2, why: 'always +2 (a Type I exception)' },
  Ag: { name: 'silver', charge: 1, why: 'always +1 (a Type I exception)' },
}

export const ANIONS = {
  N: { element: 'nitrogen', name: 'nitride', charge: -3, why: 'in group 15' },
  P: { element: 'phosphorus', name: 'phosphide', charge: -3, why: 'in group 15' },
  O: { element: 'oxygen', name: 'oxide', charge: -2, why: 'in group 16' },
  S: { element: 'sulfur', name: 'sulfide', charge: -2, why: 'in group 16' },
  F: { element: 'fluorine', name: 'fluoride', charge: -1, why: 'in group 17' },
  Cl: { element: 'chlorine', name: 'chloride', charge: -1, why: 'in group 17' },
  Br: { element: 'bromine', name: 'bromide', charge: -1, why: 'in group 17' },
}

const gcd = (a, b) => { while (b) [a, b] = [b, a % b]; return a }
const SUP = { '+': '⁺', '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' }
export const charge = n => `${n > 0 ? '+' : '-'}${Math.abs(n)}`.split('').map(ch => SUP[ch]).join('')
export const pretty = f => f.replace(/\d/g, d => '₀₁₂₃₄₅₆₇₈₉'[d])
const symbolWithSub = (s, n) => `${s}${n > 1 ? n : ''}`

export function ionic(cat, an) {
  const c = CATIONS[cat], a = ANIONS[an]
  const raw = [Math.abs(a.charge), c.charge]
  const g = gcd(raw[0], raw[1])
  const sub = [raw[0] / g, raw[1] / g]
  return {
    cat, an, c, a, raw, g, sub,
    cancels: c.charge === Math.abs(a.charge),
    crossed: `${cat}${raw[0]}${an}${raw[1]}`,
    formula: symbolWithSub(cat, sub[0]) + symbolWithSub(an, sub[1]),
    name: `${c.name} ${a.name}`,
  }
}

// The Type I Nomenclature WS grid, and the examples from the class notes.
export const WORKSHEET = { cations: ['Li', 'Ca', 'Al', 'Ag', 'K'], anions: ['O', 'Cl', 'P', 'S', 'Br', 'N'], example: 'Li-O' }
export const NOTES_NAME_TO_FORMULA = [['K', 'Cl'], ['Mg', 'P'], ['Na', 'O'], ['Al', 'Br'], ['Ag', 'S']]
export const NOTES_FORMULA_TO_NAME = [['Al', 'Br'], ['Li', 'N'], ['Zn', 'F'], ['Ca', 'O'], ['Cd', 'P']]
export const NOTES_EXAMPLES = [['Na', 'Cl'], ['Na', 'S'], ['Ca', 'N']]
