// Checks every Type I, II, and III ionic answer the site shows against an
// independently written answer list. Run: node scripts/verify_ionic.mjs
import { WORKSHEET, NOTES_NAME_TO_FORMULA, NOTES_FORMULA_TO_NAME, NOTES_EXAMPLES, WORKSHEET2, NOTES2_NAME_TO_FORMULA, NOTES2_FORMULA_TO_NAME, WS2_REVIEW, WORKSHEET3, ionic, reverseCharge } from '../src/ionic.js'

const EXPECTED = {
  'Li-O': ['Li2O', 'lithium oxide'], 'Li-Cl': ['LiCl', 'lithium chloride'], 'Li-P': ['Li3P', 'lithium phosphide'], 'Li-S': ['Li2S', 'lithium sulfide'], 'Li-Br': ['LiBr', 'lithium bromide'], 'Li-N': ['Li3N', 'lithium nitride'],
  'Ca-O': ['CaO', 'calcium oxide'], 'Ca-Cl': ['CaCl2', 'calcium chloride'], 'Ca-P': ['Ca3P2', 'calcium phosphide'], 'Ca-S': ['CaS', 'calcium sulfide'], 'Ca-Br': ['CaBr2', 'calcium bromide'], 'Ca-N': ['Ca3N2', 'calcium nitride'],
  'Al-O': ['Al2O3', 'aluminum oxide'], 'Al-Cl': ['AlCl3', 'aluminum chloride'], 'Al-P': ['AlP', 'aluminum phosphide'], 'Al-S': ['Al2S3', 'aluminum sulfide'], 'Al-Br': ['AlBr3', 'aluminum bromide'], 'Al-N': ['AlN', 'aluminum nitride'],
  'Ag-O': ['Ag2O', 'silver oxide'], 'Ag-Cl': ['AgCl', 'silver chloride'], 'Ag-P': ['Ag3P', 'silver phosphide'], 'Ag-S': ['Ag2S', 'silver sulfide'], 'Ag-Br': ['AgBr', 'silver bromide'], 'Ag-N': ['Ag3N', 'silver nitride'],
  'K-O': ['K2O', 'potassium oxide'], 'K-Cl': ['KCl', 'potassium chloride'], 'K-P': ['K3P', 'potassium phosphide'], 'K-S': ['K2S', 'potassium sulfide'], 'K-Br': ['KBr', 'potassium bromide'], 'K-N': ['K3N', 'potassium nitride'],
  'Mg-P': ['Mg3P2', 'magnesium phosphide'], 'Na-O': ['Na2O', 'sodium oxide'], 'Zn-F': ['ZnF2', 'zinc fluoride'], 'Cd-P': ['Cd3P2', 'cadmium phosphide'],
  'Na-Cl': ['NaCl', 'sodium chloride'], 'Na-S': ['Na2S', 'sodium sulfide'],
  // Type II WS. (The answer key misprints Cu2S as Cu2P, Fe3P2 as iron(II) chloride, and PbBr4 as PBr4.)
  'Cu+1-O': ['Cu2O', 'copper(I) oxide'], 'Cu+1-Cl': ['CuCl', 'copper(I) chloride'], 'Cu+1-P': ['Cu3P', 'copper(I) phosphide'], 'Cu+1-S': ['Cu2S', 'copper(I) sulfide'], 'Cu+1-Br': ['CuBr', 'copper(I) bromide'], 'Cu+1-N': ['Cu3N', 'copper(I) nitride'],
  'Fe+2-O': ['FeO', 'iron(II) oxide'], 'Fe+2-Cl': ['FeCl2', 'iron(II) chloride'], 'Fe+2-P': ['Fe3P2', 'iron(II) phosphide'], 'Fe+2-S': ['FeS', 'iron(II) sulfide'], 'Fe+2-Br': ['FeBr2', 'iron(II) bromide'], 'Fe+2-N': ['Fe3N2', 'iron(II) nitride'],
  'Pb+4-O': ['PbO2', 'lead(IV) oxide'], 'Pb+4-Cl': ['PbCl4', 'lead(IV) chloride'], 'Pb+4-P': ['Pb3P4', 'lead(IV) phosphide'], 'Pb+4-S': ['PbS2', 'lead(IV) sulfide'], 'Pb+4-Br': ['PbBr4', 'lead(IV) bromide'], 'Pb+4-N': ['Pb3N4', 'lead(IV) nitride'],
  'Fe+3-S': ['Fe2S3', 'iron(III) sulfide'], 'Mn+4-N': ['Mn3N4', 'manganese(IV) nitride'], 'Cu+2-O': ['CuO', 'copper(II) oxide'], 'Pb+2-P': ['Pb3P2', 'lead(II) phosphide'],
  'Cr+3-Cl': ['CrCl3', 'chromium(III) chloride'], 'Zn-P': ['Zn3P2', 'zinc phosphide'], 'Au+1-O': ['Au2O', 'gold(I) oxide'], 'Pt+3-Br': ['PtBr3', 'platinum(III) bromide'],
  'Mg-Cl': ['MgCl2', 'magnesium chloride'],
  // Type III WS (no answer key; worked out by hand).
  'Al-OH': ['Al(OH)3', 'aluminum hydroxide'], 'K-CO3': ['K2CO3', 'potassium carbonate'], 'Sn+2-PO4': ['Sn3(PO4)2', 'tin(II) phosphate'], 'Fe+3-ClO3': ['Fe(ClO3)3', 'iron(III) chlorate'],
  'Pb+4-NO3': ['Pb(NO3)4', 'lead(IV) nitrate'], 'Au+1-C2H3O2': ['AuC2H3O2', 'gold(I) acetate'], 'Na-C2H3O2': ['NaC2H3O2', 'sodium acetate'], 'NH4-Br': ['NH4Br', 'ammonium bromide'],
  'Ba-CN': ['Ba(CN)2', 'barium cyanide'], 'Pb+2-C2O4': ['PbC2O4', 'lead(II) oxalate'], 'Ca-MnO4': ['Ca(MnO4)2', 'calcium permanganate'], 'Cr+3-PO4': ['CrPO4', 'chromium(III) phosphate'],
  'Ni+1-SO3': ['Ni2SO3', 'nickel(I) sulfite'], 'Mn+5-NO2': ['Mn(NO2)5', 'manganese(V) nitrite'], 'Mg-ClO4': ['Mg(ClO4)2', 'magnesium perchlorate'],
}

const pairs = [
  ...WORKSHEET.cations.flatMap(c => WORKSHEET.anions.map(a => [c, a])),
  ...NOTES_NAME_TO_FORMULA, ...NOTES_FORMULA_TO_NAME, ...NOTES_EXAMPLES,
  ...WORKSHEET2.cations.flatMap(c => WORKSHEET2.anions.map(a => [c, a])),
  ...NOTES2_NAME_TO_FORMULA, ...NOTES2_FORMULA_TO_NAME, ...WS2_REVIEW.filter(x => typeof x[0] === 'string'),
  ...WORKSHEET3.filter(Boolean).map(([c, a]) => [c, a]),
]
let pass = 0, fail = 0
for (const [c, a] of pairs) {
  const r = ionic(c, a), [f, n] = EXPECTED[`${c}-${a}`]
  const charge = r.sub[0] * r.c.charge + r.sub[1] * r.a.charge
  const back = r.c.type2 ? reverseCharge(r) === r.c.charge : true
  if (r.formula === f && r.name === n && charge === 0 && back) pass++
  else { fail++; console.log('FAIL', c, a, r.formula, r.name, 'charge', charge) }
}
console.log(`Ionic checks: ${pass} passed, ${fail} failed (${pairs.length} answers, all neutral)`)
process.exit(fail ? 1 : 0)
