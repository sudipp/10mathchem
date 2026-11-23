// Helpers for the chemistry video scripts (videos/chem-*/*.mjs): element lists for the periodic-table view,
// colors, and answers computed with the chemistry site's engines so the videos match the worksheet help.
import { ELEMENT_LIST, BY_SYMBOL } from '../../chemistry-self-learning/src/elements.js'
import { position, configOf, shorthand } from '../../chemistry-self-learning/src/electrons.js'

export const R = String.raw
export const COLORS = { s: '#CC5833', p: '#4E8A5B', d: '#3D6B9A', f: '#8A5BA8', ink: '#2E4036', soft: '#E9C46A' }
export const O = '#CC5833', G = '#3d6b50', B = '#3D6B9A'

const all = ELEMENT_LIST.map(e => ({ ...e, ...position(e.z) }))
export const Z = (...syms) => syms.flat().map(s => BY_SYMBOL[s].z)
export const where = fn => all.filter(fn).map(e => e.z)
export const blockOf = b => where(e => e.block === b)
export const groupOf = (...g) => where(e => g.includes(e.group) && e.block !== 'f')
export const periodRange = (period, fromSym, toSym) => { const a = BY_SYMBOL[fromSym].z, b = BY_SYMBOL[toSym].z; return where(e => e.z >= a && e.z <= b && e.period === period) }
export const range = (fromSym, toSym) => { const a = BY_SYMBOL[fromSym].z, b = BY_SYMBOL[toSym].z; return where(e => e.z >= a && e.z <= b) }

// "1s² 2s²" style config → KaTeX "1s^{2}\,2s^{2}"
const texOf = conf => conf.map(([sub, k]) => `\\mathrm{${sub}}^{${k}}`).join('\\,')
export const configTex = (sym, charge = 0) => texOf(configOf(BY_SYMBOL[sym].z, charge))
export const shortTex = (sym, charge = 0) => {
  const r = shorthand(BY_SYMBOL[sym].z, charge)
  return r.core ? `[\\text{${r.core}}]\\,${texOf(r.rest)}` : texOf(r.rest)
}
// Nuclide in KaTeX via mhchem: nuc(238, 92, 'U') → \ce{^{238}_{92}U}
export const nuc = (A, Zn, sym) => R`\ce{^{${A}}_{${Zn}}${sym}}`
