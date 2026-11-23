// Layout of the SVG periodic-table grid used by the Chapter 1 and 3 animations.
import { position } from './electrons.js'

export const CELL = { w: 31, h: 27, x0: 21, y0: 18 }

export function cellOf(z) {
  const { period, group, block } = position(z)
  if (block === 'f') return { col: 3 + (z - (period === 6 ? 57 : 89)), row: period + 2.3 }
  return { col: group, row: period }
}

export const cellCenter = z => { const { col, row } = cellOf(z); return [CELL.x0 + (col - 0.5) * CELL.w, CELL.y0 + (row - 0.5) * CELL.h] }

// Rich worksheet content: a string, or a list of segments the UI renders with chemistry notation.
// { eq: { left, right } } a nuclear equation · { nuc } one nuclide · { orb: rows } an orbital diagram · { strong } · { muted }
export const eqSeg = (left, right) => ({ eq: { left, right } })
export const nucSeg = nuc => ({ nuc })
export const orbSeg = rows => ({ orb: rows })
