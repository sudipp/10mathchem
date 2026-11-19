// Checks every flowchart answer the site shows (the lesson walk-through, the
// class-notes examples, and the mixed practice) against an independently
// written answer list, plus formulas that must be rejected.
// Run: node scripts/verify_nomenclature.mjs
import { FLOWCHART_EXAMPLES, FLOWCHART_PRACTICE, LESSON_WALK, nameFormula } from '../src/nomenclature.js'

// [name, flowchart outcome, path answers for: 1st element H?, 3+ elements?, metal?, transition metal?]
const EXPECTED = {
  // Class notes (Nomenclature Flow Chart).
  Li2S: ['lithium sulfide', 'binIon', 'NNYN'],
  'Mg(NO3)2': ['magnesium nitrate', 'poly', 'NY-N'],
  FeO: ['iron(II) oxide', 'binIonTM', 'NNYY'],
  CuNO3: ['copper(I) nitrate', 'polyTM', 'NY-Y'],
  NO2: ['nitrogen dioxide', 'binMol', 'NNN'],
  C3H8: ['propane', 'alkane', ''],
  H2S: ['hydrosulfuric acid', 'acid', 'Y'],
  H2SO3: ['sulfurous acid', 'acid', 'Y'],
  H2SO4: ['sulfuric acid', 'acid', 'Y'],
  NaOH: ['sodium hydroxide', 'poly', 'NY-N'],
  N2: ['nitrogen', 'diatomic', ''],
  // Lesson walk-through.
  N2O4: ['dinitrogen tetroxide', 'binMol', 'NNN'],
  Fe2O3: ['iron(III) oxide', 'binIonTM', 'NNYY'],
  // Mixed practice.
  HCl: ['hydrochloric acid', 'acid', 'Y'],
  HNO3: ['nitric acid', 'acid', 'Y'],
  HNO2: ['nitrous acid', 'acid', 'Y'],
  H3PO4: ['phosphoric acid', 'acid', 'Y'],
  HC2H3O2: ['acetic acid', 'acid', 'Y'],
  HBr: ['hydrobromic acid', 'acid', 'Y'],
  'Ca(OH)2': ['calcium hydroxide', 'poly', 'NY-N'],
  'Cu(OH)2': ['copper(II) hydroxide', 'polyTM', 'NY-Y'],
  CH4: ['methane', 'alkane', ''],
  C8H18: ['octane', 'alkane', ''],
  P2O5: ['diphosphorus pentoxide', 'binMol', 'NNN'],
  CCl4: ['carbon tetrachloride', 'binMol', 'NNN'],
  PbO2: ['lead(IV) oxide', 'binIonTM', 'NNYY'],
  SnF4: ['tin(IV) fluoride', 'binIonTM', 'NNYY'],
  ZnCl2: ['zinc chloride', 'binIon', 'NNYN'],
  AgNO3: ['silver nitrate', 'poly', 'NY-N'],
  K2CO3: ['potassium carbonate', 'poly', 'NY-N'],
  'Al2(SO4)3': ['aluminum sulfate', 'poly', 'NY-N'],
  '(NH4)2SO4': ['ammonium sulfate', 'poly', 'NY-N'],
  Br2: ['bromine', 'diatomic', ''],
  // Extra engine coverage (not shown on the site).
  CO: ['carbon monoxide', 'binMol', 'NNN'],
  HF: ['hydrofluoric acid', 'acid', 'Y'],
  HClO4: ['perchloric acid', 'acid', 'Y'],
  HClO: ['hypochlorous acid', 'acid', 'Y'],
  H2CO3: ['carbonic acid', 'acid', 'Y'],
  HCN: ['hydrocyanic acid', 'acid', 'Y'],
  NH4Cl: ['ammonium chloride', 'poly', 'NY-N'],
  'Fe(OH)3': ['iron(III) hydroxide', 'polyTM', 'NY-Y'],
  Cu2O: ['copper(I) oxide', 'binIonTM', 'NNYY'],
  CdS: ['cadmium sulfide', 'binIon', 'NNYN'],
  'Pb(NO3)2': ['lead(II) nitrate', 'polyTM', 'NY-Y'],
  C2H6: ['ethane', 'alkane', ''],
  C10H22: ['decane', 'alkane', ''],
  O2: ['oxygen', 'diatomic', ''],
  H2: ['hydrogen', 'diatomic', ''],
}
// Formulas the engine must refuse instead of naming.
const REJECT = ['', 'Fe', 'O3', 'H2O', 'C2H4', 'Fe2O2', 'NaCl2', 'H2Cl', 'HSO4', 'xyz', 'RbCl', 'Mg(NO3)']

const order = ['h', 'three', 'metal', 'tm']
const pathCode = path => order.map(q => { const s = path.find(p => p.q === q); return s ? (s.yes ? 'Y' : 'N') : '-' }).join('').replace(/-+$/, '')

let pass = 0, fail = 0
const shown = [...new Set([...LESSON_WALK, ...FLOWCHART_EXAMPLES, ...FLOWCHART_PRACTICE])]
for (const f of shown) if (!EXPECTED[f]) { fail++; console.log('MISSING expected answer for', f) }
for (const [f, [name, outcome, code]] of Object.entries(EXPECTED)) {
  const r = nameFormula(f)
  const ok = r.ok && r.name === name && r.outcome === outcome && pathCode(r.path) === code && r.accept.includes(name) && r.steps.length > 0
  if (ok) pass++
  else { fail++; console.log('FAIL', f, r.ok ? `${r.name} · ${r.outcome} · ${pathCode(r.path)}` : r.error) }
}
for (const f of REJECT) {
  const r = nameFormula(f)
  if (!r.ok && r.error) pass++
  else { fail++; console.log('SHOULD REJECT', f, r.name) }
}
console.log(`Flowchart checks: ${pass} passed, ${fail} failed.`)
process.exit(fail ? 1 : 0)
