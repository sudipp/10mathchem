// Checks every Chapter 1-3 worksheet answer the site shows against the class answer keys
// (transcribed from Chemistry/chapter2 and chapter3 classwork), plus real data for the trend questions.
// Run: node scripts/verify_ch123.mjs
import { CONVERSION_ITEMS } from '../src/ch1-data.js'
import * as C2 from '../src/ch2-data.js'
import * as C3 from '../src/ch3-data.js'
import { beanium } from '../src/atomic.js'
import { configOf, configText, parseConfig, sameConfig } from '../src/electrons.js'

let pass = 0, fail = 0
const check = (label, ok, detail = '') => { if (ok) pass++; else { fail++; console.log(`FAIL ${label} ${detail}`) } }
const text = a => typeof a === 'string' ? a : (Array.isArray(a) ? a : [a]).map(s => typeof s === 'string' ? s : s.strong ?? s.muted ?? '').join('')
const eq = (label, got, want) => check(label, got === want, `got ${JSON.stringify(got)} want ${JSON.stringify(want)}`)

// ---------- Chapter 1 (practice set: independent hand values) ----------
const ch1 = [['2500 m', 2500], ['0.450 g', 0.45], ['3200 mL', 3200], ['6.0 × 10⁻⁶ g', 6e-6], ['4.34 × 10⁻⁷ m', 4.34e-7], ['750 kg', 750], ['7.56 L', 7.56], ['8.05 km', 8.045], ['0.305 m', 0.3048], ['68.2 kg', 150 / 2.2], ['1140 torr', 1140], ['1.05 × 10³ J', 1046], ['259,200 s', 259200], ['37.0 °C', 37], ['298 K', 298], ['-196 °C', -196], ['98.6 °F', 98.6]]
ch1.forEach(([ans, v], k) => {
  const item = CONVERSION_ITEMS[k]
  eq(`ch1 #${k + 1} answer`, item.answer, ans)
  check(`ch1 #${k + 1} value`, Math.abs(item.value - v) <= Math.abs(v) * 1e-9 + 1e-12, `${item.value} vs ${v}`)
  check(`ch1 #${k + 1} accepts`, item.accept(String(v)))
  check(`ch1 #${k + 1} rejects ×10`, !item.accept(String(v * 10)))
})
check('ch1 accepts 4.34 x 10^-7', CONVERSION_ITEMS[4].accept('4.34 x 10^-7 m'))
check('ch1 accepts 4.34×10⁻⁷', CONVERSION_ITEMS[4].accept('4.34×10⁻⁷'))

// ---------- Chapter 2 ----------
const waveKey = ['3.2 × 10⁻¹⁹ J', '7.32 × 10¹⁹ Hz', '3.00 × 10¹⁸ Hz', '1.78 × 10⁻²⁷ J', '4.085 × 10⁻¹⁹ J', '4.866 × 10⁻⁷ m', '2.0 × 10⁻⁷ m', '9.9 × 10⁻¹⁹ J', '3.8 × 10⁻⁷ m']
const waveNum = C2.WAVE_ITEMS.filter(x => x.value != null)
waveKey.forEach((k, i) => eq(`wave ${waveNum[i].num}`, waveNum[i].answer, k))
check('wave 1 accepts key 3.2e-19', waveNum[0].accept('3.2e-19'))
check('wave 1 rejects 3.2e-18', !waveNum[0].accept('3.2e-18'))
const order8 = C2.WAVE_ITEMS.find(x => x.num === 8), order9 = C2.WAVE_ITEMS.find(x => x.num === 9)
check('wave 8 accepts key', order8.accept('radio < microwave < infrared < visible < ultraviolet < x-ray < gamma'))
check('wave 8 accepts plurals/abbrev', order8.accept('radio waves, microwaves, IR, visible, UV, X-rays, gamma rays'))
check('wave 8 rejects swapped', !order8.accept('radio, infrared, microwave, visible, ultraviolet, x-ray, gamma'))
check('wave 9 accepts key', order9.accept('gamma < x-ray < ultraviolet < visible < infrared < microwave < radio'))
eq('wave 10', C2.WAVE_ITEMS.find(x => x.num === 10).answer, 'Inverse')

const halfKey = ['7.125 hr', '25.0 g', '6.000 yr', '5.35 g', '4.50 days', '15,340 yr', '2.21 g', '5.846 hr', '280. g', '9.75 days']
C2.HALF_ITEMS.forEach((x, i) => { eq(`half-life WS ${i + 1}`, x.answer, halfKey[i]); check(`half-life WS ${i + 1} accepts key`, x.accept(halfKey[i])) })
;['0.0061 g', '120 g', '0.976 hr'].forEach((k, i) => { eq(`half-life notes ${i + 1}`, C2.HALF_NOTES[i].answer, k); check(`half-life notes ${i + 1} accepts`, C2.HALF_NOTES[i].accept(k)) })
check('half-life Ca-47 accepts 121 (notes rounding)', C2.HALF_NOTES[1].accept('121'))

const nucKey = [['N', 14, 7], 'positron', ['Th', 234, 90], 'beta', 'alpha', ['Po', 213, 84], ['La', 140, 57], 'positron', 'beta', ['Xe', 131, 54], 'beta', ['N', 11, 7]]
C2.NUCLEAR_BLANKS.forEach((x, i) => {
  const k = nucKey[i], m = x.missing
  if (typeof k === 'string') { eq(`nuclear ${i + 1}`, m.kind, k); check(`nuclear ${i + 1} accepts`, x.accept(k)); check(`nuclear ${i + 1} rejects other particle`, !x.accept(k === 'beta' ? 'positron' : 'beta')) }
  else { eq(`nuclear ${i + 1}`, `${m.sym}-${m.A}-${m.Z}`, k.join('-')); check(`nuclear ${i + 1} accepts`, x.accept(`${k[0]}-${k[1]}`) && x.accept(`${k[1]} ${k[2]} ${k[0]}`)); check(`nuclear ${i + 1} rejects`, !x.accept(`${k[0]}-${k[1] + 1}`)) }
})
check('nuclear accepts 0 +1 e', C2.NUCLEAR_BLANKS[1].accept('0 +1 e'))
check('nuclear accepts He-4', C2.NUCLEAR_BLANKS[4].accept('He-4'))
check('nuclear accepts name', C2.NUCLEAR_BLANKS[9].accept('xenon-131'))
// The class key shows Fr-219 for #7 (Rn-219 positron decay); 86 − 1 = 85 is At-219, and the site explains the slip.
const seriesKey = ['Th-231', 'Pa-231', 'Np-235', 'Th-227', 'Pa-227', 'Th-227', 'At-219', 'At-215', 'Rn-215', 'Ra-219', 'Fr-219']
check('series 7 notes the key slip', /Fr/.test(C2.SERIES_ITEMS[6].note ?? ''))
C2.SERIES_ITEMS.forEach((x, i) => { eq(`series ${i + 1}`, `${x.product.sym}-${x.product.A}`, seriesKey[i]); check(`series ${i + 1} accepts`, x.accept(seriesKey[i])) })
const revEqKey = ['Th-231', 'Ac-231', 'Ac-227', 'Ra-227', 'U-231', 'Ac-223', 'Ra-223']
C2.REVIEW_EQUATIONS.forEach((x, i) => eq(`unit2 equation ${i + 1}`, `${x.product.sym}-${x.product.A}`, revEqKey[i]))
check('alpha emission puts He on the right', C2.REVIEW_EQUATIONS[0].eq.right.some(p => p.kind === 'alpha'))
check('beta capture puts e on the left', C2.REVIEW_EQUATIONS[1].eq.left.some(p => p.kind === 'beta'))

const structKey = [['Mg', 12, 26, 12, 12, 14], ['K', 19, 40, 19, 19, 21], ['S', 16, 33, 16, 16, 17], ['H', 1, 3, 1, 1, 2], ['Ag', 47, 109, 47, 46, 62], ['P', 15, 32, 15, 18, 17]]
C2.STRUCTURE_ANSWERS.forEach((r, i) => eq(`structure row ${i + 1}`, [r.sym, r.Z, r.A, r.protons, r.electrons, r.neutrons].join(','), structKey[i].join(',')))
eq('avg iodine', C2.AVERAGE_ITEMS[0].answer, '126.85 amu')
eq('avg zinc', C2.AVERAGE_ITEMS[1].answer, '65.37 amu')
eq('beanium', C2.AVERAGE_ITEMS[2].answer, '2.22 g')
const bean = beanium(C2.BEANS)
eq('beanium rows', bean.rows.map(r => `${r.each.toFixed(2)}/${r.pct.toFixed(2)}`).join(' '), '3.27/31.88 1.93/43.96 1.36/24.16')
const revHalfKey = [8.07, 3.41, 38.5, 121, 90.6, 60.0, 9.89, 10.2]
C2.REVIEW_HALF.forEach((x, i) => { check(`unit2 half-life ${i + 1}`, Number(x.value.toPrecision(3)) === revHalfKey[i], `${x.value}`); check(`unit2 half-life ${i + 1} accepts`, x.accept(String(revHalfKey[i]))) })
const revLightKey = ['1.3 × 10⁻²¹ J', '7.0 × 10⁻⁷ m', '3.24 × 10¹⁴ Hz', '2.50 × 10⁻¹⁹ J', '5.1 × 10⁸ Hz']
C2.REVIEW_LIGHT.forEach((x, i) => eq(`unit2 light ${i + 1}`, x.answer, revLightKey[i]))

// ---------- Chapter 3 ----------
const orbKey = { N: 7, Al: 13, Cu: 29, Xe: 54, Mg: 12, Mn: 25, F: 9, Ba: 56, Zn: 30, Sn: 50, S: 16, K: 19 }
const orbConf = { N: '1s2 2s2 2p3', Al: '1s2 2s2 2p6 3s2 3p1', Cu: '[Ar] 4s1 3d10', Xe: '[Kr] 5s2 4d10 5p6', Mg: '[Ne] 3s2', Mn: '[Ar] 4s2 3d5', F: '1s2 2s2 2p5', Ba: '[Xe] 6s2', Zn: '[Ar] 4s2 3d10', Sn: '[Kr] 5s2 4d10 5p2', S: '[Ne] 3s2 3p4', K: '[Ar] 4s1' }
C3.ORBITAL_WS.forEach(x => {
  const sym = Object.keys(orbKey).find(s => x.prompt.startsWith(`${s} (`))
  check(`orbital WS ${sym} electrons`, x.accept(String(orbKey[sym])) && !x.accept(String(orbKey[sym] + 1)))
  check(`orbital WS ${sym} config`, sameConfig(x.conf, parseConfig(orbConf[sym])), configText(x.conf))
})
eq('violations', C3.VIOLATION_ITEMS.map(x => x.rule).join(','), 'Hund,Aufbau,Pauli,Aufbau')
const longKey = ['1s² 2s²', '1s² 2s² 2p⁶', '1s² 2s² 2p⁶', '1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁶']
C3.ECONFIG_LONG.forEach((x, i) => eq(`econfig longhand ${i + 1}`, x.text, longKey[i]))
const shortKey = ['[Ar] 4s¹ 3d⁵', '[Ar] 4s² 3d¹⁰ 4p⁵', '[Ne] 3s²', '[Ar] 4s¹ 3d¹⁰']
C3.ECONFIG_SHORT.forEach((x, i) => eq(`econfig shorthand ${i + 1}`, x.text, shortKey[i]))
check('econfig accepts run-together key', C3.ECONFIG_SHORT[1].accept('[Ar]4s23d104p5'))
check('econfig accepts superscripts', C3.ECONFIG_SHORT[0].accept('[Ar] 4s¹ 3d⁵'))
check('econfig rejects Cu 4s2 3d9', !C3.ECONFIG_SHORT[3].accept('[Ar] 4s2 3d9'))
check('econfig rejects Cr 4s2 3d4', !C3.ECONFIG_SHORT[0].accept('[Ar]4s2 3d4'))
eq('econfig diagrams', C3.ECONFIG_DIAGRAMS.map(x => configText(x.conf).split(' ').slice(-2).join(' ')).join(' | '), '4s¹ 3d¹⁰ | 3s² 3p⁴ | 3s² 3p¹')

const T = C3.TRENDS_WS
const ans = list => list.map(x => text(x.answer)).join(',')
eq('trends #1 radius pairs', ans(T.radiusPairs), 'K,Ca,Ga,C,Br,Ba,Si,Au')
eq('trends #5', text(T.radiusWhy[3].answer), 'Ar < P < Si < Mg < Na')
check('trends #5 accepts typed order', T.radiusWhy[3].accept('Ar, P, Si, Mg, Na') && !T.radiusWhy[3].accept('Na, Mg, Si, P, Ar'))
eq('trends #9 ions', ans(T.ionic.slice(3)), 'Na,S²⁻,I⁻,Al')
eq('trends #12 ionization', ans(T.ionization.slice(2, 10)), 'O,Be,F,Cu,Ne,V,Ca,Se')
eq('trends #13', ans(T.ionization.slice(10)), 'Sr < Mg < Be,Cs < Ba < Bi,Na < Al < S')
eq('trends #16', ans(T.electronegativity.slice(2)), 'F,N,Mg,As')
eq('trends #19', text(T.affinity[2].answer), 'Sb < Te < I < Br < Cl')

// Real data for every trend pair (IE in kJ/mol, Pauling EN, empirical atomic radius in pm).
const IE = { Na: 496, O: 1314, Be: 900, Ba: 503, Ar: 1521, F: 1681, Cu: 745, Ra: 509, I: 1008, Ne: 2081, K: 419, V: 651, Ca: 590, Fr: 393, W: 770, Se: 941, Mg: 738, Sr: 549, Bi: 703, Cs: 376, Al: 578, S: 1000, Si: 787, Xe: 1170, Sn: 709, C: 1086 }
const EN = { Cl: 3.16, F: 3.98, C: 2.55, N: 3.04, As: 2.18, Ca: 1.0, Cs: 0.79, W: 2.36, Fe: 1.83, Na: 0.93, Si: 1.9 }
// Calculated atomic radii (Clementi et al., pm); Ra is estimated from its neighbors.
const RAD = { Li: 167, K: 243, Ca: 194, Ni: 149, Ga: 136, B: 87, O: 48, C: 67, Cl: 79, Br: 94, Be: 112, Ba: 253, Si: 111, S: 88, Fe: 156, Au: 174, Sn: 145, Sr: 219, In: 156, Cs: 298, P: 98, Ra: 283, Ti: 176, Mg: 145, Na: 190, Ar: 71 }
const pairCheck = (label, items, table) => items.forEach(x => { if (x.kind !== 'choice') return; const [a, b] = x.choices; const real = table[a] > table[b] ? a : b; check(`${label} ${x.num} matches real data`, text(x.answer) === real, `${a}:${table[a]} ${b}:${table[b]}`) })
pairCheck('radius', T.radiusPairs, RAD)
pairCheck('IE', T.ionization.filter(x => x.kind === 'choice'), IE)
pairCheck('EN', T.electronegativity.filter(x => x.kind === 'choice'), EN)
const U = C3.UNIT3_ITEMS
pairCheck('unit3 radius', U.radius, RAD)
pairCheck('unit3 IE', U.ionization, IE)
pairCheck('unit3 EN', U.electronegativity, EN)
const rankReal = (x, table) => { const syms = text(x.answer).split(' < '); return syms.every((s, k) => k === 0 || table[syms[k - 1]] < table[s]) }
for (const x of [T.radiusWhy[3], U.radius[2], U.radius[3]]) check(`rank ${x.num} radius real`, rankReal(x, RAD), text(x.answer))
for (const x of [...T.ionization.slice(10), U.ionization[2], U.ionization[3]]) check(`rank ${x.num} IE real`, rankReal(x, IE), text(x.answer))

eq('unit3 basics', U.basics.map(x => text(x.answer)).join(' | '), '2 and 8 | 3 | 6 | more | 3s | Krypton; 10 | 2 | Potassium | Gallium; 3 valence electrons | 2s | 6 | 8 | Sulfur')
check('unit3 #10 correct choice is 2s', U.basics[9].choices[U.basics[9].correct] === '2s')
eq('unit3 identify', U.identify.map(x => x.answer).join(','), 'Rb (Rubidium),Si (Silicon),Ag (Silver)')
check('unit3 identify accepts names', U.identify[0].accept('rubidium') && U.identify[2].accept('Ag') && !U.identify[1].accept('S'))
eq('unit3 terms accept', U.terms.map(x => x.accept(x.answer) ? 1 : 0).join(''), '1111111')
check('unit3 #20 accepts Hunds rule', U.terms[2].accept("Hund's rule"))
eq('unit3 longhand', U.longhand.map(x => x.text).join(' | '), '1s² 2s² 2p³ | 1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹ | 1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹ 3d⁵')
eq('unit3 shorthand', U.shorthand.map(x => x.text).join(' | '), '[Kr] 5s² 4d¹⁰ 5p³ | [Xe] 6s² 4f¹⁴ 5d¹⁰ 6p³ | [Kr] 5s² 4d⁵ | [Ar] 4s² 3d¹⁰ 4p²')
eq('unit3 ions', U.ions.map(x => x.text).join(' | '), '[Kr] 5s² 4d¹⁰ 5p⁶ | 1s² | [Kr] 5s² 4d¹⁰ 5p⁶ | [Ar] 4s² 3d¹⁰ 4p⁶ | [Ne] 3s² 3p⁶')
eq('unit3 radius', ans(U.radius), 'Sn,Sr,O < Li < K < Cs,P < Fe < Ti < Ra')
eq('unit3 IE', ans(U.ionization), 'Ne,Si,Ba < Sn < Xe < Ar,Sr < Mg < C < F')
eq('unit3 EN', ans(U.electronegativity), 'W,As,Si')
eq('unit3 particle', ans(U.particle), 'Mg,I⁻')
eq('unit3 diagrams', U.diagrams.map(x => configText(x.conf).split(' ').at(-1)).join(','), '3s²,3p²,3d²')
check('Ag exception', configText(configOf(47)).endsWith('5s¹ 4d¹⁰'))

console.log(`${pass} checks passed, ${fail} failed`)
process.exit(fail ? 1 : 0)
