// Chapter 1: metric prefixes, factor-label conversions and temperature, using the class
// "Chemistry Conversions and Constants" reference sheet.
import { fixed, sci } from './sci.js'

export const PREFIXES = [
  { name: 'mega', sym: 'M', power: 6 },
  { name: 'kilo', sym: 'k', power: 3 },
  { name: 'base unit', sym: '', power: 0 },
  { name: 'deci', sym: 'd', power: -1 },
  { name: 'centi', sym: 'c', power: -2 },
  { name: 'milli', sym: 'm', power: -3 },
  { name: 'micro', sym: 'μ', power: -6 },
  { name: 'nano', sym: 'n', power: -9 },
  { name: 'pico', sym: 'p', power: -12 },
]

export const CONSTANTS = {
  c: 3.00e8, // m/s
  h: 6.6262e-34, // J·s (the worksheets use 6.6262; the reference sheet rounds to 6.63)
  avogadro: 6.02e23,
  R: [0.0821, 8.314],
  calorie: 4.184,
}

// Exact metric conversion between two prefixes of the same base unit.
export function metric(value, fromPrefix, toPrefix, base) {
  const from = PREFIXES.find(p => p.sym === fromPrefix), to = PREFIXES.find(p => p.sym === toPrefix)
  const shift = from.power - to.power
  const result = value * 10 ** shift
  const bigger = 10 ** Math.abs(shift)
  const big = shift > 0 ? from : to, small = shift > 0 ? to : from
  const factor = shift > 0
    ? `1 ${big.sym}${base} = ${bigger >= 1e4 ? `10${supInt(Math.abs(shift))}` : bigger.toLocaleString('en-US')} ${small.sym}${base}`
    : `${bigger >= 1e4 ? `10${supInt(Math.abs(shift))}` : bigger.toLocaleString('en-US')} ${small.sym}${base} = 1 ${big.sym}${base}`
  return { result, shift, factor, places: Math.abs(shift), direction: shift > 0 ? 'right' : 'left' }
}
const supInt = n => String(n).split('').map(d => '⁰¹²³⁴⁵⁶⁷⁸⁹'[d]).join('')

// Factor-label chain: value × (top/bottom) × ... Each factor is [topValue, topUnit, bottomValue, bottomUnit].
export function chain(value, unit, factors) {
  let v = value
  const rows = []
  for (const [tv, tu, bv, bu] of factors) { v = v * tv / bv; rows.push({ tv, tu, bv, bu, running: v }) }
  return { start: [value, unit], rows, result: v, unit: factors.at(-1)?.[1] ?? unit }
}

export function temperature(value, from, to) {
  const toC = { C: v => v, F: v => 5 / 9 * (v - 32), K: v => v - 273 }[from]
  const fromC = { C: v => v, F: v => v * 9 / 5 + 32, K: v => v + 273 }[to]
  const c = toC(value)
  return { celsius: c, result: fromC(c) }
}

export const show = (x, sf, useSci) => useSci ? sci(x, sf) : fixed(x, sf)
