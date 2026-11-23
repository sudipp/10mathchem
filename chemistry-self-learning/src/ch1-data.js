// Chapter 1 data: animation steps and the conversion practice set (built from the class reference sheet).
import { PREFIXES, chain, metric, show, temperature } from './measure.js'
import { closeTo, parseNumber } from './sci.js'

export const LADDER_STEPS = [
  { from: 1, to: 2, text: '2.5 km = ? m' },
  { from: 1, to: 2, arrow: true, text: 'kilo → base: 10³ → 10⁰, so × 1000' },
  { from: 1, to: 2, arrow: true, text: '2.5 km = 2500 m' },
  { from: 5, to: 2, arrow: true, text: '450 mg → g: ÷ 1000 → 0.450 g' },
  { from: 7, to: 2, arrow: true, text: '434 nm → m: × 10⁻⁹ → 4.34 × 10⁻⁷ m' },
]

export const CHAIN_STEPS = [
  { start: '2.00 gal', factors: [], result: '= ? L', cancel: [] },
  { start: '2.00 gal', factors: [['3.78 L', '1 gal']], result: '', cancel: [] },
  { start: '2.00 gal', factors: [['3.78 L', '1 gal']], result: '= 7.56 L', cancel: ['gal'] },
  { start: '12.0 in', factors: [['2.54 cm', '1 in']], result: '= 30.48 cm', cancel: ['in'] },
  { start: '12.0 in', factors: [['2.54 cm', '1 in'], ['1 m', '100 cm']], result: '= 0.305 m', cancel: ['in', 'cm'] },
]

export const THERMO_STEPS = [
  { c: 0, label: 'Water freezes' },
  { c: 37, label: 'Body temperature', partial: true },
  { c: 37, label: 'Body temperature' },
  { c: 100, label: 'Water boils' },
  { c: -273, label: 'Absolute zero' },
]

// ---------- Conversion practice (made from the reference sheet) ----------
const num = (value, sf, useSci = false) => ({ kind: 'number', value, accept: v => closeTo(parseNumber(v), value), answerText: show(value, sf, useSci) })
function metricItem(n, value, from, to, base, sf, useSci = false) {
  const m = metric(value, from, to, base)
  const f = PREFIXES.find(p => p.sym === from), t = PREFIXES.find(p => p.sym === to)
  const res = num(m.result, sf, useSci)
  return {
    num: n, prompt: `Convert ${value} ${from}${base} to ${to}${base}.`, ...res,
    answer: `${res.answerText} ${to}${base}`,
    steps: [
      `On the ladder, ${f.name} is 10${sup(f.power)} and ${t.name} is 10${sup(t.power)}: ${m.places} place${m.places > 1 ? 's' : ''} apart.`,
      `Equality: ${m.factor}. ${m.shift > 0 ? 'The new unit is smaller, so the number gets bigger' : 'The new unit is bigger, so the number gets smaller'}: move the decimal ${m.places} place${m.places > 1 ? 's' : ''} to the ${m.direction}.`,
      `${value} ${from}${base} = ${res.answerText} ${to}${base}`,
    ],
  }
}
const sup = n => String(n).replace('-', '⁻').replace(/\d/g, d => '⁰¹²³⁴⁵⁶⁷⁸⁹'[d])
function chainItem(n, prompt, value, unit, factors, sf, useSci = false, note, exact = false) {
  const c = chain(value, unit, factors)
  const res = num(c.result, sf, useSci)
  const running = x => Number.isInteger(x) ? x.toLocaleString('en-US') : show(x, sf + 1, useSci)
  return {
    num: n, prompt, ...res, answer: `${res.answerText} ${c.unit}`, note,
    steps: [
      `Start with ${value} ${unit}. Pick equalities from your sheet: ${factors.map(([tv, tu, bv, bu]) => `${bv} ${bu} = ${tv} ${tu}`).join('; ')}.`,
      ...c.rows.map(r => `× (${r.tv} ${r.tu} / ${r.bv} ${r.bu}): ${r.bu} cancels → ${running(r.running)} ${r.tu}`),
      exact ? `= ${res.answerText} ${c.unit} (exact)` : `Round to ${sf} significant figures: ${res.answerText} ${c.unit}`,
    ],
  }
}
function tempItem(n, value, from, to, sf) {
  const t = temperature(value, from, to)
  const res = num(t.result, sf)
  const lbl = u => u === 'K' ? 'K' : `°${u}`
  const steps = []
  if (from === 'F') steps.push(`°C = 5/9(°F − 32) = 5/9(${value} − 32) = 5/9(${Math.round((value - 32) * 10) / 10}) = ${to === 'C' ? res.answerText : Math.round(t.celsius * 10) / 10} °C`)
  if (from === 'K') steps.push(`°C = K − 273 = ${value} − 273 = ${t.celsius} °C`)
  if (from === 'C') steps.push(`Start in Celsius: ${value} °C`)
  if (to === 'K') steps.push(`K = °C + 273 = ${Math.round(t.celsius * 10) / 10} + 273 = ${res.answerText} K`)
  if (to === 'F') steps.push(`°F = (°C × 9/5) + 32 = (${t.celsius} × 9/5) + 32 = ${res.answerText} °F`)
  return { num: n, prompt: `Convert ${value} ${lbl(from)} to ${lbl(to)}.`, ...res, answer: `${res.answerText} ${lbl(to)}`, steps }
}

export const CONVERSION_ITEMS = [
  metricItem(1, 2.5, 'k', '', 'm', 2),
  metricItem(2, 450, 'm', '', 'g', 3),
  metricItem(3, 3.2, '', 'm', 'L', 2),
  metricItem(4, 6.0, 'μ', '', 'g', 2, true),
  metricItem(5, 434, 'n', '', 'm', 3, true),
  metricItem(6, 0.75, 'M', 'k', 'g', 2),
  chainItem(7, 'How many liters are in 2.00 gallons?', 2.00, 'gal', [[3.78, 'L', 1, 'gal']], 3),
  chainItem(8, 'A race is 5.00 miles long. How many kilometers is that?', 5.00, 'mi', [[1.609, 'km', 1, 'mi']], 3),
  chainItem(9, 'Convert 12.0 inches to meters.', 12.0, 'in', [[2.54, 'cm', 1, 'in'], [1, 'm', 100, 'cm']], 3),
  chainItem(10, 'A student has a mass of 150. pounds. What is that in kilograms?', 150, 'lb', [[1, 'kg', 2.2, 'lb']], 3, false, 'The sheet’s 1 kg = 2.2 lb is a rounded equality; using 454 g = 1 lb gives 68.1 kg, which is just as good.'),
  chainItem(11, 'Convert 1.50 atm to torr.', 1.50, 'atm', [[760, 'torr', 1, 'atm']], 3),
  chainItem(12, 'A snack has 250. calories (chemistry calories). How many joules is that?', 250, 'cal', [[4.184, 'J', 1, 'cal']], 3, true),
  chainItem(13, 'How many seconds are in 3 days?', 3, 'days', [[24, 'h', 1, 'day'], [60, 'min', 1, 'h'], [60, 's', 1, 'min']], 4, false, 'Counted days and the time equalities are exact, so the answer is exact too.', true),
  tempItem(14, 98.6, 'F', 'C', 3),
  tempItem(15, 25, 'C', 'K', 3),
  tempItem(16, 77, 'K', 'C', 3),
  tempItem(17, 37.0, 'C', 'F', 3),
]

