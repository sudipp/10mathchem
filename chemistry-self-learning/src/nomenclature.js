// Formula → name by walking the class nomenclature flowchart (Flow Chart II),
// plus the special cases from the flowchart notes: diatomic elements and
// hydrocarbons (alkanes). Ionic names reuse the ion tables in ionic.js.
import { CATIONS, POLYATOMIC, TYPE2, ANIONS, charge, ion, ionic, pretty, reverseCharge } from './ionic.js'

export const ELEMENT = { H: 'hydrogen', B: 'boron', C: 'carbon', N: 'nitrogen', O: 'oxygen', F: 'fluorine', Si: 'silicon', P: 'phosphorus', S: 'sulfur', Cl: 'chlorine', Se: 'selenium', Br: 'bromine', Te: 'tellurium', I: 'iodine', Xe: 'xenon' }
const IDE_ROOT = { H: 'hydr', C: 'carb', N: 'nitr', O: 'ox', F: 'fluor', Si: 'silic', P: 'phosph', S: 'sulf', Cl: 'chlor', Se: 'selen', Br: 'brom', Te: 'tellur', I: 'iod' }
// Binary acid stems keep more of the element name: hydro-sulfur-ic, hydro-phosphor-ic.
const ACID_ROOT = { F: 'fluor', Cl: 'chlor', Br: 'brom', I: 'iod', S: 'sulfur', P: 'phosphor', Se: 'selen' }
export const PREFIX = ['', 'mono', 'di', 'tri', 'tetra', 'penta', 'hexa', 'hepta', 'octa', 'nona', 'deca']
export const ALKANE = ['', 'meth', 'eth', 'prop', 'but', 'pent', 'hex', 'hept', 'oct', 'non', 'dec']
// The "Lucky 7": the elements that travel in pairs.
export const DIATOMIC = ['H', 'N', 'O', 'F', 'Cl', 'Br', 'I']

// Ternary acids: -ate → -ic, -ite → -ous. Sulfur and phosphorus keep a longer stem.
const ACID_STEM = { sulfate: 'sulfuric', sulfite: 'sulfurous', phosphate: 'phosphoric', phosphite: 'phosphorous' }
export const acidFromIon = ionName => ACID_STEM[ionName] ?? ionName.replace(/ate$/, 'ic').replace(/ite$/, 'ous')

const isMetal = sym => !!(CATIONS[sym] || TYPE2[sym])
// Ag, Cd, and Zn are transition metals with only one charge; Pb and Sn are not transition metals but have two.
const needsNumeral = sym => !!TYPE2[sym]
const numeralWhy = sym => sym === 'Pb' || sym === 'Sn'
  ? `${TYPE2[sym]} is not a transition metal, but (like ${sym === 'Pb' ? 'tin' : 'lead'}) it can form more than one charge, so it needs a Roman numeral`
  : ['Ag', 'Cd', 'Zn'].includes(sym)
    ? `${CATIONS[sym].name} is a transition metal, but it is an exception: it has only one charge (${charge(CATIONS[sym].charge)}), so no Roman numeral`
    : CATIONS[sym] ? `${CATIONS[sym].name} is ${CATIONS[sym].why}, so it has only one charge (${charge(CATIONS[sym].charge)})` : `${TYPE2[sym]} is a transition metal that can form more than one charge, so it needs a Roman numeral`

export const normalizeFormula = s => String(s).replace(/[₀-₉]/g, d => String(d.charCodeAt(0) - 8320)).replace(/\s+/g, '')
const elementsIn = f => [...new Set(f.match(/[A-Z][a-z]?/g) ?? [])]
const tokens = f => /^([A-Z][a-z]?\d*)+$/.test(f) ? [...f.matchAll(/([A-Z][a-z]?)(\d*)/g)].map(m => [m[1], m[2] ? +m[2] : 1]) : null

// Split an ionic formula into cation (with count) and anion (with count).
function splitIonic(f) {
  let m, cat, n, rest
  if ((m = f.match(/^\(NH4\)(\d+)/))) [cat, n, rest] = ['NH4', +m[1], f.slice(m[0].length)]
  else if (f.startsWith('NH4')) [cat, n, rest] = ['NH4', 1, f.slice(3)]
  else if ((m = f.match(/^([A-Z][a-z]?)(\d*)/))) [cat, n, rest] = [m[1], m[2] ? +m[2] : 1, f.slice(m[0].length)]
  else return null
  if ((m = rest.match(/^\(([A-Za-z0-9]+)\)(\d+)$/))) return POLYATOMIC[m[1]] ? { cat, n, an: m[1], k: +m[2] } : null
  if (POLYATOMIC[rest]) return { cat, n, an: rest, k: 1 }
  if ((m = rest.match(/^([A-Z][a-z]?)(\d*)$/)) && ANIONS[m[1]]) return { cat, n, an: m[1], k: m[2] ? +m[2] : 1 }
  return null
}

const Q = {
  h: '1st element is H?',
  three: '3 or more elements?',
  metal: '1st element is a metal?',
  tm: '1st element is a transition metal (needs a Roman numeral)?',
}
const OUTCOME = {
  acid: 'Acid',
  binMol: 'Binary molecular (covalent)',
  binIon: 'Binary ionic',
  binIonTM: 'Binary ionic with a transition metal',
  poly: 'Ionic compound with a polyatomic ion',
  polyTM: 'Polyatomic ion with a transition metal',
  diatomic: 'Diatomic molecule',
  alkane: 'Hydrocarbon (alkane)',
}
export { Q as QUESTIONS, OUTCOME as OUTCOMES }

const fail = (formula, error) => ({ ok: false, formula, error })
const done = (formula, outcome, path, steps, name, accept = [name], extra = {}) => ({ ok: true, formula, pretty: pretty(formula), outcome, label: OUTCOME[outcome], path, steps, name, accept, ...extra })

function nameAcid(f, path) {
  const m = f.match(/^H(\d*)(.+)$/)
  const nH = m[1] ? +m[1] : 1, rest = m[2]
  if (rest === 'O') return fail(f, 'H₂O is water. It is not named with the acid rules.')
  if (ELEMENT[rest] && ACID_ROOT[rest]) {
    const a = ion(rest)
    if (nH !== -a.charge) return fail(f, `${ELEMENT[rest]} forms ${rest}${charge(a.charge)}, so its acid needs ${-a.charge} H: H${-a.charge > 1 ? -a.charge : ''}${rest}.`)
    const name = `hydro${ACID_ROOT[rest]}ic acid`
    return done(f, 'acid', path, [
      `Everything besides H is ${pretty(rest)}: just one element (${ELEMENT[rest]}), so it is a **binary acid**. Check: ${nH} H⁺¹ balance ${rest}${charge(a.charge)} ✓`,
      `Translate the ending: H & 1 element → **hydro-** + stem + **-ic**: hydro + ${ACID_ROOT[rest]} + ic = hydro${ACID_ROOT[rest]}ic.`,
      `Write the word **acid** at the end: **${name}**.`,
    ], name, [name], { kind: 'binary acid' })
  }
  const poly = POLYATOMIC[rest]
  if (!poly || poly.charge > 0) return fail(f, `After the H, “${pretty(rest)}” is not one element or a polyatomic ion from the class table.`)
  if (nH !== -poly.charge) return fail(f, `${poly.name} is ${pretty(rest)}${charge(poly.charge)}, so its acid needs ${-poly.charge} H: H${-poly.charge > 1 ? -poly.charge : ''}${rest}.`)
  if (/ide$/.test(poly.name)) {
    const name = `hydro${poly.name.replace(/ide$/, 'ic')} acid`
    return done(f, 'acid', path, [
      `Everything besides H is ${pretty(rest)} = **${poly.name}**, a polyatomic ion that ends in -ide, so treat it like a binary acid.`,
      `**hydro-** + stem + **-ic**: ${name.replace(' acid', '')}. Add **acid**: **${name}**.`,
    ], name, [name], { kind: 'binary acid' })
  }
  const ic = acidFromIon(poly.name)
  const name = `${ic} acid`
  const ending = /ate$/.test(poly.name) ? ['-ate', '-ic'] : ['-ite', '-ous']
  return done(f, 'acid', path, [
    `Everything besides H is ${pretty(rest)} = **${poly.name}** (${charge(poly.charge)}), a polyatomic ion, so it is a **ternary acid**: do **not** use hydro-. Check: ${nH} H⁺¹ balance ${pretty(rest)}${charge(poly.charge)} ✓`,
    `Translate the ending: ${ending[0]} → ${ending[1]}, so ${poly.name} → **${ic}**.`,
    `Write the word **acid** at the end: **${name}**.`,
  ], name, [name], { kind: 'ternary acid' })
}

function nameIonic(f, parts, three, path) {
  const { cat, n, an, k } = parts
  const tm = needsNumeral(cat)
  path.push({ q: 'tm', yes: tm, why: cat === 'NH4' ? 'the cation is ammonium, NH₄⁺¹, a polyatomic ion with one charge' : numeralWhy(cat) })
  let key = cat
  if (tm) {
    const a = ion(an), x = (-a.charge * k) / n
    if (!Number.isInteger(x) || x < 1 || x > 7) return fail(f, `The charges do not work out: ${k} × (${a.charge}) cannot be shared evenly by ${n} ${cat}.`)
    key = `${cat}+${x}`
  }
  const r = ionic(key, an)
  if (r.formula !== f) return fail(f, `${r.c.name} and ${r.a.name} make ${pretty(r.formula)}, not ${pretty(f)}. Check the subscripts${tm ? '' : ' and reduce'}.`)
  const outcome = three ? (tm ? 'polyTM' : 'poly') : (tm ? 'binIonTM' : 'binIon')
  const steps = []
  if (tm) {
    steps.push(`Write the name of the ${cat === 'Pb' || cat === 'Sn' ? 'metal' : 'transition metal'}: **${r.c.element}**.`)
    steps.push(`Find its charge (cross back up): ${pretty(r.a.sym)} is ${charge(r.a.charge)}${k > 1 ? `, and there are ${k}: ${k} × (${r.a.charge}) = ${k * r.a.charge}` : ''}. The total must be 0, so ${n > 1 ? `${n} ${cat} share +${-r.a.charge * k}: each is` : `the ${cat} is`} ${charge(reverseCharge(r))} → **${r.c.name.match(/\(.*\)/)[0]}**.`)
  } else steps.push(`Write the name of the ${cat === 'NH4' ? 'cation' : 'metal'}: **${r.c.element}**${cat === 'NH4' ? ' (NH₄⁺¹ is the one positive polyatomic ion)' : ''}. No Roman numeral.`)
  steps.push(r.a.poly
    ? `Write the name of the polyatomic ion: ${pretty(an)} = **${r.a.name}**. It keeps its own name (no -ide).${an === 'OH' ? ' A metal + hydroxide is a **base**.' : ''}`
    : `Write the name of the nonmetal with **-ide**: ${r.a.element} → **${r.a.name}**.`)
  steps.push(`Put it together: **${r.name}**.`)
  return done(f, outcome, path, steps, r.name, [r.name, r.name.replace('(', ' (')], { kind: an === 'OH' ? 'base' : 'ionic' })
}

function nameMolecular(f, path) {
  const t = tokens(f)
  if (!t || t.length !== 2 || t[0][0] === t[1][0]) return fail(f, 'A binary molecular compound has exactly two different nonmetals, like N₂O₄.')
  const [[a, n1], [b, n2]] = t
  const unknown = [a, b].find(s => !ELEMENT[s] && !isMetal(s))
  if (unknown) return fail(f, `${unknown} is not in the class ion tables, so this page cannot name it.`)
  if (!ELEMENT[a] || !ELEMENT[b] || !IDE_ROOT[b]) return fail(f, `${a} and ${b} are not both nonmetals from the class list.`)
  if (n1 > 10 || n2 > 10) return fail(f, 'The prefixes only go up to deca (10).')
  const p2 = PREFIX[n2], root = IDE_ROOT[b]
  const dropped = /[ao]$/.test(p2) && root.startsWith('o') ? p2.slice(0, -1) : p2
  const first = `${n1 > 1 ? PREFIX[n1] : ''}${ELEMENT[a]}`
  const name = `${first} ${dropped}${root}ide`, full = `${first} ${p2}${root}ide`
  return done(f, 'binMol', path, [
    `Write the name of the 1st nonmetal${n1 > 1 ? ` with its prefix: ${n1} → ${PREFIX[n1]}` : ''}: **${first}**${n1 === 1 ? ' (never start with mono-)' : ''}.`,
    `Write the 2nd nonmetal with **-ide**: ${ELEMENT[b]} → ${root}ide.`,
    `Translate its subscript into a prefix: ${n2} → ${p2}${dropped !== p2 ? `, and drop the final “${p2.at(-1)}” before “o” (${p2}oxide → ${dropped}oxide)` : ''}: **${dropped}${root}ide**.`,
    `Put it together: **${name}**.`,
  ], name, [...new Set([name, full])], { kind: 'covalent' })
}

// Returns { ok, outcome, path: [{ q, yes, why }], steps, name, accept } or { ok: false, error }.
export function nameFormula(input) {
  const f = normalizeFormula(input)
  if (!f) return fail(f, 'Type a formula, like Fe2O3 or H2SO4.')
  if (!/^(\(?[A-Z][a-z]?\d*\)?\d*)+$/.test(f)) return fail(f, 'That does not look like a formula. Use capital letters for each element, like NaCl or Mg(NO3)2.')
  const els = elementsIn(f)
  const t = tokens(f)
  if (els.length === 1) {
    const [sym, n] = t?.length === 1 ? t[0] : [els[0], 0]
    if (DIATOMIC.includes(sym) && n === 2) {
      const name = ELEMENT[sym]
      return done(f, 'diatomic', [], [
        `Only one element, written as a pair: **${pretty(f)}** is a **diatomic molecule**, one of the “Lucky 7” (N₂, O₂, F₂, Cl₂, Br₂, I₂, H₂).`,
        `It is not a compound, so there are no prefixes or endings. The name is just the element: **${name}**.`,
      ], name, [name, `${name} gas`, `di${name}`], { kind: 'element' })
    }
    return fail(f, `${pretty(f)} is a single element, not a compound.${DIATOMIC.includes(sym) ? ` As a diatomic molecule it is written ${sym}₂.` : ''}`)
  }
  if (t && els.length === 2 && els.every(e => e === 'C' || e === 'H') && t[0][0] === 'C') {
    const [[, c], [, h]] = t
    if (c > 10) return fail(f, 'The hydrocarbon prefixes only go up to dec (10 carbons).')
    if (h !== 2 * c + 2) return fail(f, `${pretty(f)} is not an alkane (an alkane with ${c} C has 2 × ${c} + 2 = ${2 * c + 2} H). We only name alkanes.`)
    const name = `${ALKANE[c]}ane`
    return done(f, 'alkane', [], [
      `Only carbon and hydrogen: a **hydrocarbon** (a fuel). Hydrocarbons have no charges.`,
      `Check it is an **alkane** (single bonds only): an alkane with ${c} C has 2 × ${c} + 2 = ${2 * c + 2} H ✓`,
      `Use the hydrocarbon prefix for the number of carbons: ${c} → **${ALKANE[c]}**, then end in **-ane**: **${name}**.`,
    ], name, [name], { kind: 'hydrocarbon' })
  }
  const first = f.match(/^\(?([A-Z][a-z]?)/)[1]
  const path = [{ q: 'h', yes: first === 'H', why: first === 'H' ? 'the formula starts with H, so the compound is an acid' : `the 1st element is ${first}` }]
  if (first === 'H') return nameAcid(f, path)
  const three = els.length >= 3
  path.push({ q: 'three', yes: three, why: `${els.length} elements: ${els.join(', ')}${three ? ' → it contains a polyatomic ion' : ''}` })
  const parts = splitIonic(f)
  if (three) {
    if (!parts || !(isMetal(parts.cat) || parts.cat === 'NH4')) return fail(f, 'With 3 or more elements, the formula should be a metal (or NH₄) followed by a polyatomic ion from the class table.')
    return nameIonic(f, parts, true, path)
  }
  const metal = isMetal(first)
  path.push({ q: 'metal', yes: metal, why: metal ? `${first} is a metal` : `${ELEMENT[first] ?? first} is a nonmetal` })
  if (!metal) return nameMolecular(f, path)
  if (!parts) return fail(f, `After ${first}, the formula should be one nonmetal from the class ion table (N, P, O, S, F, Cl, Br, I).`)
  return nameIonic(f, parts, false, path)
}

// Class-notes examples from the nomenclature flowchart, and mixed practice.
export const FLOWCHART_EXAMPLES = ['Li2S', 'Mg(NO3)2', 'FeO', 'CuNO3', 'NO2', 'C3H8', 'H2S', 'H2SO3', 'H2SO4', 'NaOH', 'N2']
export const FLOWCHART_PRACTICE = ['HCl', 'HNO3', 'HNO2', 'H3PO4', 'HC2H3O2', 'HBr', 'Ca(OH)2', 'Cu(OH)2', 'CH4', 'C8H18', 'P2O5', 'CCl4', 'Fe2O3', 'PbO2', 'SnF4', 'ZnCl2', 'AgNO3', 'K2CO3', 'Al2(SO4)3', '(NH4)2SO4', 'Br2']
// The animation in the flowchart lesson walks one compound per step.
export const LESSON_WALK = ['N2O4', 'Li2S', 'Fe2O3', 'Mg(NO3)2', 'CuNO3', 'H2S', 'H2SO4']

export const SHORT_QUESTIONS = { h: '1st element H?', three: '3 or more elements?', metal: '1st element a metal?', tm: 'Transition metal?' }
export const walkCaption = r => `${r.pretty}: ${r.path.length ? `${r.path.map(p => `${SHORT_QUESTIONS[p.q]} ${p.yes ? 'Yes' : 'No'}`).join(' · ')} → ` : ''}${r.label.toLowerCase()}: ${r.name}.`
