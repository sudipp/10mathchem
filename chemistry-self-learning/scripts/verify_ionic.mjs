// Checks every Type I ionic answer the site shows against an independently
// written answer list. Run: node scripts/verify_ionic.mjs
import { WORKSHEET, NOTES_NAME_TO_FORMULA, NOTES_FORMULA_TO_NAME, NOTES_EXAMPLES, ionic } from '../src/ionic.js'

const EXPECTED = {
  'Li-O': ['Li2O', 'lithium oxide'], 'Li-Cl': ['LiCl', 'lithium chloride'], 'Li-P': ['Li3P', 'lithium phosphide'], 'Li-S': ['Li2S', 'lithium sulfide'], 'Li-Br': ['LiBr', 'lithium bromide'], 'Li-N': ['Li3N', 'lithium nitride'],
  'Ca-O': ['CaO', 'calcium oxide'], 'Ca-Cl': ['CaCl2', 'calcium chloride'], 'Ca-P': ['Ca3P2', 'calcium phosphide'], 'Ca-S': ['CaS', 'calcium sulfide'], 'Ca-Br': ['CaBr2', 'calcium bromide'], 'Ca-N': ['Ca3N2', 'calcium nitride'],
  'Al-O': ['Al2O3', 'aluminum oxide'], 'Al-Cl': ['AlCl3', 'aluminum chloride'], 'Al-P': ['AlP', 'aluminum phosphide'], 'Al-S': ['Al2S3', 'aluminum sulfide'], 'Al-Br': ['AlBr3', 'aluminum bromide'], 'Al-N': ['AlN', 'aluminum nitride'],
  'Ag-O': ['Ag2O', 'silver oxide'], 'Ag-Cl': ['AgCl', 'silver chloride'], 'Ag-P': ['Ag3P', 'silver phosphide'], 'Ag-S': ['Ag2S', 'silver sulfide'], 'Ag-Br': ['AgBr', 'silver bromide'], 'Ag-N': ['Ag3N', 'silver nitride'],
  'K-O': ['K2O', 'potassium oxide'], 'K-Cl': ['KCl', 'potassium chloride'], 'K-P': ['K3P', 'potassium phosphide'], 'K-S': ['K2S', 'potassium sulfide'], 'K-Br': ['KBr', 'potassium bromide'], 'K-N': ['K3N', 'potassium nitride'],
  'Mg-P': ['Mg3P2', 'magnesium phosphide'], 'Na-O': ['Na2O', 'sodium oxide'], 'Zn-F': ['ZnF2', 'zinc fluoride'], 'Cd-P': ['Cd3P2', 'cadmium phosphide'],
  'Na-Cl': ['NaCl', 'sodium chloride'], 'Na-S': ['Na2S', 'sodium sulfide'],
}

const pairs = [
  ...WORKSHEET.cations.flatMap(c => WORKSHEET.anions.map(a => [c, a])),
  ...NOTES_NAME_TO_FORMULA, ...NOTES_FORMULA_TO_NAME, ...NOTES_EXAMPLES,
]
let pass = 0, fail = 0
for (const [c, a] of pairs) {
  const r = ionic(c, a), [f, n] = EXPECTED[`${c}-${a}`]
  const charge = r.sub[0] * r.c.charge + r.sub[1] * r.a.charge
  if (r.formula === f && r.name === n && charge === 0) pass++
  else { fail++; console.log('FAIL', c, a, r.formula, r.name, 'charge', charge) }
}
console.log(`Ionic checks: ${pass} passed, ${fail} failed (${pairs.length} answers, all neutral)`)
process.exit(fail ? 1 : 0)
