import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowRight, Atom, BookOpen, Check, ChevronLeft, ChevronRight, ExternalLink, Pause, Play, RotateCcw, Sigma } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PeriodicTablePage from './PeriodicTable.jsx'
import WorksheetsPage, { PrefixTable, VseprChart } from './Worksheets.jsx'
import { CrissCross, IonChargeTable } from './Ionic.jsx'

gsap.registerPlugin(ScrollTrigger)

const routeFromHash = () => {
  const hash = window.location.hash
  if (hash.startsWith('#/periodic-table')) return 'table'
  if (hash.startsWith('#/worksheets')) return 'worksheets'
  return 'home'
}

const khan = 'https://www.khanacademy.org/science/hs-chemistry/x2613d8165d88df5e:chemical-bonding/x2613d8165d88df5e:covalent-bonds/v/lewis-diagrams-for-molecules'
const lessons = [
  {
    title: 'What are valence electrons?', short: 'Valence electrons', tag: 'Start with the atom',
    intro: 'An atom has a tiny nucleus surrounded by electrons. Valence electrons are the electrons in its outermost occupied shell. They are the electrons we usually track when studying bonds between main-group elements.',
    points: [
      ['Think in layers', 'In a simple shell model, carbon has 2 electrons in its first shell and 4 in its second. Those 4 outer electrons are its valence electrons.'],
      ['Why the outside matters', 'Outer electrons are involved when atoms form chemical bonds. Inner electrons are not shown in a Lewis symbol.'],
      ['A model, not a photograph', 'The moving dots below are a learning model. Real electrons do not travel along neat circular paths; quantum orbitals describe where they may be found.'],
    ],
    steps: ['Carbon has 6 electrons: 2 inside and 4 outside.', 'Oxygen has 8 electrons: 2 inside and 6 outside.', 'Neon has 10 electrons: 2 inside and 8 outside. Its outer shell is full.'],
    question: 'Oxygen has 2 inner electrons and 6 outer electrons. How many valence electrons does it have?',
    options: ['2', '6', '8'], correct: 1, explanation: 'Only the outermost-shell electrons count here. Oxygen has 6 valence electrons, not 8.',
    video: 'yADrWdNTWEc', videoTitle: 'Valence Electrons and the Periodic Table', creator: 'Tyler DeWitt', watch: 'Focus on the difference between total electrons and outer-shell electrons.',
  },
  {
    title: 'Understanding the periodic table', short: 'The periodic table', tag: 'Find the pattern',
    intro: 'The periodic table arranges elements by atomic number: their number of protons. A vertical column is a group. A horizontal row is a period. Main-group elements in the same group have similar valence-electron patterns.',
    points: [
      ['Read down a group', 'For neutral main-group atoms: group 1 has 1 valence electron, group 2 has 2, and groups 13 through 18 have 3 through 8.'],
      ['Read across a period', 'Moving across the second period from lithium to neon adds one proton and one electron at each step. The number of valence electrons increases from 1 to 8.'],
      ['Know the exceptions', 'Helium is in group 18 but has only 2 electrons: a full first shell. Do not apply this shortcut to transition metals (groups 3-12).'],
    ],
    steps: ['Group 1: lithium has 1 valence electron.', 'Group 2: beryllium has 2 valence electrons.', 'Group 13: boron has 3 valence electrons.', 'Group 14: carbon has 4 valence electrons.', 'Group 15: nitrogen has 5 valence electrons.', 'Group 16: oxygen has 6 valence electrons.', 'Group 17: fluorine has 7 valence electrons.', 'Group 18: neon has 8 valence electrons. Remember: helium has 2.'],
    question: 'A neutral sulfur atom is in group 16. How many valence electrons does it have?',
    options: ['16', '8', '6'], correct: 2, explanation: 'For groups 13-18, subtract 10 from the group number. Group 16 means 6 valence electrons.',
    video: 'yADrWdNTWEc', videoTitle: 'Valence Electrons and the Periodic Table', creator: 'Tyler DeWitt', watch: 'This is the same foundation video as lesson 1. This time, watch for the group-number shortcut.',
  },
  {
    title: 'How to draw Lewis dot structures', short: 'Lewis dot symbols', tag: 'Turn electrons into dots',
    intro: 'A Lewis symbol shows an element symbol surrounded by dots for its valence electrons. Start with one atom before drawing a whole molecule. Here, we will build the symbol for oxygen.',
    points: [
      ['Count first', 'Oxygen is in group 16, so a neutral oxygen atom has 6 valence electrons. Write O, then place exactly 6 dots.'],
      ['One on each side, then pair', 'Place one dot on each of the four sides before adding a second dot to a side. For oxygen, you finish with two pairs and two single dots.'],
      ['Atoms versus molecules', 'An atomic Lewis symbol shows dots around one atom. A molecular Lewis structure also shows shared pairs: one line represents a bond containing 2 electrons. Rotating a dot arrangement does not change its meaning.'],
    ],
    steps: ['Write O and place the first electron.', 'Place a second electron on another side.', 'Place a third electron on another side.', 'Place a fourth electron: one on each side.', 'Add electron 5 to make the first pair.', 'Add electron 6 to make a second pair. Two electrons are still unpaired.'],
    question: 'How many electrons does one single bond line represent?',
    options: ['1 electron', '2 electrons', '4 electrons'], correct: 1, explanation: 'A single covalent bond is one shared electron pair, so one line represents 2 electrons.',
    video: null, khan: true, videoTitle: 'Lewis diagrams for molecules', creator: 'Khan Academy', watch: 'Notice how the electrons are counted first, then placed as bonds and lone pairs. Atom symbols come first; whole molecules are the next step.',
  },
  {
    title: 'Understanding chemical bonds', short: 'Sharing electrons', tag: 'Two atoms, one shared pair',
    intro: 'A chemical bond holds atoms together. In a covalent bond, atoms share electron pairs. Start with the simplest example: two hydrogen atoms forming H₂.',
    points: [
      ['Begin with two atoms', 'Each hydrogen atom brings 1 electron. Its first shell can hold 2, so hydrogen follows a duet rule rather than an octet rule.'],
      ['Share a pair', 'When H₂ forms, the 2 electrons occupy a shared region between the nuclei. Each hydrogen counts the shared pair toward its full first shell.'],
      ['Not all bonds are the same', 'A single bond shares 2 electrons; a double bond shares 4; a triple bond shares 6. Ionic bonding is different: attraction between oppositely charged ions holds them together.'],
    ],
    steps: ['Two separate hydrogen atoms each contribute 1 electron.', 'The atoms approach. Their electrons can form a shared pair.', 'H-H: one single covalent bond, containing 2 shared electrons.'],
    question: 'How many electrons are shared in a double bond?',
    options: ['2', '4', '8'], correct: 1, explanation: 'A double bond contains two shared pairs: 2 × 2 = 4 electrons.',
    video: 'PKA4CZwbZWU', videoTitle: 'Ionic vs. Molecular', creator: 'Tyler DeWitt', watch: 'Focus on the molecular (covalent) side: nonmetals bonding by sharing electrons. Ionic compounds are the other kind, formed between a metal and a nonmetal.',
  },
  {
    title: 'How to draw the CO₂ Lewis structure', short: 'Build CO₂', tag: 'Put it all together',
    intro: 'Carbon dioxide has 1 carbon atom and 2 oxygen atoms. The goal is to account for every valence electron while giving each atom an octet. Follow the electron budget instead of guessing the bonds.',
    points: [
      ['Budget: 16 electrons', 'Carbon contributes 4 and each oxygen contributes 6: 4 + 2(6) = 16 valence electrons. CO₂ is neutral, so no charge adjustment is needed.'],
      ['Start simple, then inspect', 'Place carbon in the center and connect O-C-O with two single bonds (4 electrons). Place the remaining 12 electrons around the oxygens. Carbon now has only 4 electrons around it.'],
      ['Repair without adding electrons', 'Move one lone pair from each oxygen into a second bond to carbon. The result is O=C=O: 8 bonding electrons plus 8 lone-pair electrons. Every atom has an octet and formal charge 0.'],
    ],
    steps: ['Count 16 valence electrons. Choose the O-C-O skeleton; no bonds are drawn yet.', 'Draw two single bonds. Used: 4 electrons. Remaining: 12.', 'Add three lone pairs to each oxygen. Used: all 16. Carbon has only 4 electrons around it: not finished!', 'Move one lone pair from the left oxygen into a second bond. Carbon now has 6 electrons around it.', 'Move one lone pair from the right oxygen into a second bond. O=C=O: every atom has 8 electrons around it; all formal charges are 0.'],
    question: 'In the final CO₂ structure, how many lone pairs are on EACH oxygen?',
    options: ['1 pair', '2 pairs', '3 pairs'], correct: 1, explanation: 'Each oxygen has two lone pairs (4 electrons) and one double bond (4 shared electrons), giving it an octet.',
    video: null, khan: true, videoTitle: 'Lewis diagrams for molecules', creator: 'Khan Academy', watch: 'Watch the general method for molecules, then apply it to CO₂ with our five-step animation.',
  },
  {
    title: 'VSEPR shapes and polarity', short: 'VSEPR & polarity', tag: 'From flat drawing to 3D shape',
    intro: 'VSEPR stands for Valence Shell Electron Pair Repulsion. Electron pairs around a central atom push each other as far apart as possible. That push decides the 3D shape of a molecule.',
    points: [
      ['Tally around the central atom', 'Draw the Lewis structure first. Then count only what is on the central atom: bonding pairs (one per attached atom) and lone pairs. A double or triple bond counts as ONE bonding pair for shape.'],
      ['Lone pairs push harder', 'Lone pairs repel more strongly than bonding pairs, so they squeeze the bond angles: 109.5° in CH₄, 107° in NH₃, and 104.5° in H₂O. All three have 4 pairs; only the number of lone pairs changes.'],
      ['Polar or nonpolar?', 'Use your class rule: a molecule is polar IF its outside atoms are different OR the central atom has lone pairs. Otherwise it is nonpolar. CBr₄ is nonpolar; H₂O is polar.'],
      ['Resonance', 'If a double bond could be drawn in more than one equally good place, the molecule has resonance. SO₂ and CO₃²⁻ have resonance; CH₄ and H₂O do not.'],
    ],
    steps: ['2 bonding pairs, 0 lone pairs → linear, 180°. Example: CO₂.', '3 bonding pairs, 0 lone pairs → trigonal planar, 120°. Example: BF₃.', '2 bonding pairs, 1 lone pair → bent, less than 120°. Example: SO₂.', '4 bonding pairs, 0 lone pairs → tetrahedral, 109.5°. Example: CH₄.', '3 bonding pairs, 1 lone pair → trigonal pyramidal, 107°. Example: NH₃.', '2 bonding pairs, 2 lone pairs → bent, 104.5°. Example: H₂O.'],
    question: 'A central atom has 3 bonding pairs and 1 lone pair. What is the shape?',
    options: ['Trigonal planar', 'Trigonal pyramidal', 'Tetrahedral'], correct: 1, explanation: '3 bonding + 1 lone pair is trigonal pyramidal (107°), like NH₃. The lone pair still takes up space, so the shape is not flat.',
    video: 'nxebQZUVvTg', videoTitle: 'VSEPR Theory: Introduction', creator: 'Tyler DeWitt', watch: 'Watch how he tallies bonding and lone pairs on the central atom, then matches them to a shape.',
  },
  {
    title: 'Naming covalent compounds', short: 'Naming compounds', tag: 'Prefixes tell you how many',
    intro: 'Covalent (molecular) compounds form between two nonmetals. Their names use prefixes to show how many atoms of each element are in one molecule.',
    points: [
      ['The pattern', '(prefix + first nonmetal) (prefix + root of second nonmetal + -ide). The less electronegative element usually comes first: the one further left or lower on the periodic table.'],
      ['Prefixes 1 to 10', 'mono 1 · di 2 · tri 3 · tetra 4 · penta 5 · hexa 6 · hepta 7 · octa 8 · nona 9 · deca 10. Never put mono- on the first element: CO is carbon monoxide, not monocarbon monoxide.'],
      ['Two small spelling rules', 'Change the second element to its root + -ide: oxygen → oxide, chlorine → chloride, sulfur → sulfide. If the prefix ends in a or o and the root starts with o, drop that vowel: monoxide, pentoxide, tetroxide.'],
      ['Going backwards', 'To write a formula, turn each prefix back into a number: diphosphorus pentasulfide → P₂S₅. No prefix on the first element means 1: carbon tetrachloride → CCl₄.'],
    ],
    steps: ['Start with N₂O₃. It has two nonmetals: nitrogen first, oxygen second.', 'Count the first element: 2 nitrogen atoms → di + nitrogen = dinitrogen.', 'Count the second element: 3 oxygen atoms → tri.', 'Change oxygen to its root + -ide: ox + ide = oxide.', 'Put it together: N₂O₃ is dinitrogen trioxide.'],
    question: 'What is the name of N₂O₅?',
    options: ['Nitrogen pentoxide', 'Dinitrogen pentoxide', 'Dinitrogen pentaoxygen'], correct: 1, explanation: '2 N → dinitrogen. 5 O → penta + oxide, dropping the “a”: pentoxide. Together: dinitrogen pentoxide.',
    video: 'DejkvR4pvRw', videoTitle: 'Naming Covalent Molecular Compounds', creator: 'Tyler DeWitt', watch: 'Pause after each example and try naming it yourself before he does.',
  },
  {
    title: 'Naming ionic compounds (Type I)', short: 'Ionic compounds', tag: 'Metal + nonmetal: criss-cross',
    intro: 'Ionic compounds form when a metal transfers electrons to a nonmetal. The metal becomes a positive ion (cation) and the nonmetal a negative ion (anion). Opposite charges attract and hold them together.',
    points: [
      ['Cations and anions', 'Metals lose electrons and become cations (+). Nonmetals gain electrons and become anions (−). Type I metals have only one possible charge: group 1 is +1, group 2 is +2, aluminum is +3, and zinc (+2), cadmium (+2), and silver (+1) never change. For nonmetals: group 15 is −3, group 16 is −2, group 17 is −1.'],
      ['Writing the formula', 'Write the cation first. The total charge must be zero. If the charges already cancel, just write the symbols: Na⁺¹ and Cl⁻¹ make NaCl. If not, criss-cross: each charge number becomes the other ion’s subscript, so Na⁺¹ and S⁻² make Na₂S. Do not show the charges in the final formula.'],
      ['Reduce, then name', 'Always reduce the subscripts: Ca⁺² and O⁻² criss-cross to Ca₂O₂, which reduces to CaO. To name it, write the metal’s name as it appears on the periodic table, then the nonmetal’s root + -ide: Ca₃N₂ is calcium nitride. Ionic names never use prefixes like di- or tri-.'],
    ],
    steps: ['Sodium is in group 1, so it forms Na⁺¹. Sulfur is in group 16, so it forms S⁻². The charges do not cancel.', 'Criss-cross: the 2 from sulfur becomes sodium’s subscript, and the 1 from sodium becomes sulfur’s subscript.', 'That gives Na₂S₁. A subscript of 1 is not written, so the formula is Na₂S.', 'Check: 2 × (+1) = +2 and 1 × (−2) = −2. Total charge 0 ✓', 'Name it: sodium + sulf + ide = sodium sulfide.'],
    question: 'Ca⁺² and O⁻² combine. What is the formula?',
    options: ['Ca₂O₂', 'CaO', 'CaO₂'], correct: 1, explanation: 'Criss-crossing gives Ca₂O₂, but you must reduce: divide both subscripts by 2 to get CaO. (The +2 and −2 already cancel.)',
    video: 'URc75hoKGLY', videoTitle: 'Writing Ionic Formulas: Introduction', creator: 'Tyler DeWitt', watch: 'Watch how he makes the total charge zero before writing the final formula.',
  },
]

function Button({ children, className = '', ...props }) {
  return <button className={`button ${className}`} {...props}><span className="button-wash" aria-hidden="true" /><span className="button-label">{children}</span></button>
}

const dotPositions = [[0, -43], [43, 0], [0, 43], [-43, 0], [13, -43], [43, 13], [13, 43], [-43, 13]]
function Dots({ x, y, count, color = '#CC5833' }) {
  return <g>{dotPositions.slice(0, count).map(([dx, dy], i) => <circle key={i} cx={x + dx} cy={y + dy} r="5" fill={color} />)}</g>
}

function Diagram({ lesson, step }) {
  if (lesson === 0) {
    const data = [{ symbol: 'C', outer: 4, name: 'Carbon' }, { symbol: 'O', outer: 6, name: 'Oxygen' }, { symbol: 'Ne', outer: 8, name: 'Neon' }][step]
    return <svg viewBox="0 0 600 320" role="img" aria-label={`${data.name}: 2 inner electrons, ${data.outer} valence electrons. Simplified shell model.`}>
      <circle cx="300" cy="155" r="65" className="shell" /><circle cx="300" cy="155" r="122" className="shell outer-shell" />
      <circle cx="300" cy="155" r="29" fill="#2E4036" /><text x="300" y="164" className="nucleus">{data.symbol}</text>
      <g className="orbit-inner">{[0, 180].map(a => <circle key={a} cx={300 + 65 * Math.cos(a * Math.PI / 180)} cy={155 + 65 * Math.sin(a * Math.PI / 180)} r="6" fill="#75877a" />)}</g>
      <g className="orbit-outer">{Array.from({ length: data.outer }, (_, i) => { const a = i * 2 * Math.PI / data.outer; return <circle key={i} cx={300 + 122 * Math.cos(a)} cy={155 + 122 * Math.sin(a)} r="7" fill="#CC5833" /> })}</g>
      <text x="300" y="312" className="diagram-caption">{data.name} · {data.outer} outer electrons</text>
    </svg>
  }
  if (lesson === 1) {
    const symbols = ['Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne']
    return <svg viewBox="0 0 600 320" role="img" aria-label={`Main-group excerpt, second period. ${symbols[step]} has ${step + 1} valence electrons.`}>
      <text x="300" y="45" className="diagram-caption">SECOND PERIOD · MAIN-GROUP EXCERPT</text>
      {symbols.map((symbol, i) => <g key={symbol}>
        <text x={55 + i * 70} y="93" className="diagram-caption">{[1, 2, 13, 14, 15, 16, 17, 18][i]}</text>
        <rect x={25 + i * 70} y="110" width="60" height="80" rx="18" fill={step === i ? '#2E4036' : '#e5e6db'} />
        <text x={55 + i * 70} y="157" className={`element ${step === i ? 'selected-element' : ''}`}>{symbol}</text>
        <text x={55 + i * 70} y="218" className="diagram-caption">{i + 1} e⁻</text>
      </g>)}
      <text x="300" y="276" className="diagram-caption">Group number above · valence electrons below</text>
      <text x="300" y="303" className="diagram-caption">Groups 3–12 are omitted, not adjacent to group 2.</text>
    </svg>
  }
  if (lesson === 2) return <svg viewBox="0 0 600 320" role="img" aria-label={`Oxygen Lewis symbol with ${step + 1} of its 6 valence electrons placed.`}>
    <text x="300" y="163" className="large-element">O</text><Dots x={300} y={147} count={step + 1} />
    <text x="300" y="266" className="diagram-caption">{step + 1} of 6 electrons placed</text>
    <text x="300" y="296" className="diagram-caption">Fill four sides singly before pairing.</text>
  </svg>
  if (lesson === 3) {
    const x1 = [160, 235, 250][step], x2 = [440, 365, 350][step]
    return <svg viewBox="0 0 600 320" role="img" aria-label={lessons[3].steps[step]}>
      <ellipse cx={x1} cy="148" rx="75" ry="80" className="shell" /><ellipse cx={x2} cy="148" rx="75" ry="80" className="shell" />
      {step === 2 && <line x1="275" y1="148" x2="325" y2="148" className="bond" />}
      <text x={x1} y="162" className="large-element">H</text><text x={x2} y="162" className="large-element">H</text>
      <circle cx={step === 0 ? 190 : 296} cy={step === 2 ? 185 : 132} r="6" fill="#CC5833" />
      <circle cx={step === 0 ? 410 : 308} cy={step === 2 ? 185 : 156} r="6" fill="#CC5833" />
      <text x="300" y="266" className="diagram-caption">{step === 2 ? 'The line represents the pair shown below it, not extra electrons.' : '1 electron + 1 electron = 1 shared pair'}</text>
      <text x="300" y="296" className="diagram-caption">Simplified illustration of covalent bonding</text>
    </svg>
  }
  if (lesson === 5) return <ShapeDiagram step={step} />
  if (lesson === 6) return <NamingDiagram step={step} />
  if (lesson === 7) return <CrissCross cat="Na" an="S" step={step} label={lessons[7].steps[step]} />
  const leftDouble = step >= 3, rightDouble = step >= 4
  const pair = (x, y, vertical = false) => <g><circle cx={x} cy={y} r="5" fill="#CC5833" /><circle cx={x + (vertical ? 0 : 13)} cy={y + (vertical ? 13 : 0)} r="5" fill="#CC5833" /></g>
  return <svg viewBox="0 0 600 320" role="img" aria-label={lessons[4].steps[step]}>
    {[150, 300, 450].map((x, i) => <text key={x} x={x} y="164" className="large-element">{i === 1 ? 'C' : 'O'}</text>)}
    {step >= 1 && <g>
      <line x1="185" x2="265" y1={leftDouble ? 141 : 149} y2={leftDouble ? 141 : 149} className="bond" />
      {leftDouble && <line x1="185" x2="265" y1="157" y2="157" className="bond" />}
      <line x1="335" x2="415" y1={rightDouble ? 141 : 149} y2={rightDouble ? 141 : 149} className="bond" />
      {rightDouble && <line x1="335" x2="415" y1="157" y2="157" className="bond" />}
    </g>}
    {step >= 2 && <g>{pair(143, 105)}{pair(143, 193)}{pair(443, 105)}{pair(443, 193)}
      {!leftDouble && pair(105, 142, true)}{!rightDouble && pair(495, 142, true)}
    </g>}
    <text x="300" y="264" className="diagram-caption">{['Electron budget: 4 + 6 + 6 = 16', '4 in bonds + 12 still to place = 16', '4 in bonds + 12 in lone pairs = 16', '6 in bonds + 10 in lone pairs = 16', '8 in bonds + 8 in lone pairs = 16'][step]}</text>
    <text x="300" y="295" className="diagram-caption">{step === 4 ? 'Final: two double bonds, two lone pairs on each O.' : 'Work in progress: do not stop before checking carbon.'}</text>
  </svg>
}

const SHAPES = [
  { center: 'C', outer: 'O', bp: 2, lp: 0, name: 'Linear', angle: '180°', example: 'CO₂' },
  { center: 'B', outer: 'F', bp: 3, lp: 0, name: 'Trigonal planar', angle: '120°', example: 'BF₃' },
  { center: 'S', outer: 'O', bp: 2, lp: 1, name: 'Bent', angle: '<120°', example: 'SO₂' },
  { center: 'C', outer: 'H', bp: 4, lp: 0, name: 'Tetrahedral', angle: '109.5°', example: 'CH₄' },
  { center: 'N', outer: 'H', bp: 3, lp: 1, name: 'Trigonal pyramidal', angle: '107°', example: 'NH₃' },
  { center: 'O', outer: 'H', bp: 2, lp: 2, name: 'Bent', angle: '104.5°', example: 'H₂O' },
]
const DIRECTIONS = { 2: [180, 0], 3: [90, 210, 330], 4: [90, 270, 210, 330] }

function ShapeDiagram({ step }) {
  const s = SHAPES[step]
  const dirs = DIRECTIONS[s.bp + s.lp]
  const lonePairs = dirs.slice(0, s.lp), atoms = dirs.slice(s.lp)
  const cx = 300, cy = 140
  const point = (deg, r) => [cx + r * Math.cos(deg * Math.PI / 180), cy - r * Math.sin(deg * Math.PI / 180)]
  return <svg viewBox="0 0 600 320" role="img" aria-label={`${s.example}: ${s.bp} bonding pairs and ${s.lp} lone pairs, ${s.name}, ${s.angle}`}>
    {lonePairs.map(deg => {
      const [x, y] = point(deg, 52), [d1x, d1y] = point(deg + 90, 7), [d2x, d2y] = point(deg - 90, 7)
      return <g key={`lp${deg}`}>
        <ellipse cx={x} cy={y} rx="30" ry="19" transform={`rotate(${-deg} ${x} ${y})`} fill="#CC583322" stroke="#CC5833" strokeDasharray="3 4" />
        <circle cx={x + d1x - cx} cy={y + d1y - cy} r="5" fill="#CC5833" /><circle cx={x + d2x - cx} cy={y + d2y - cy} r="5" fill="#CC5833" />
      </g>
    })}
    {atoms.map(deg => {
      const [x, y] = point(deg, 105), [sx, sy] = point(deg, 24), [ex, ey] = point(deg, 82)
      const front = s.bp + s.lp === 4 && deg === 270
      return <g key={`a${deg}`}>
        {front ? <polygon points={`${sx},${sy} ${ex - 9},${ey} ${ex + 9},${ey}`} fill="#2E4036" /> : <line x1={sx} y1={sy} x2={ex} y2={ey} className="bond" />}
        <circle cx={x} cy={y} r="22" fill="#e5e6db" stroke="#2E4036" strokeWidth="1.5" />
        <text x={x} y={y + 7} className="element">{s.outer}</text>
      </g>
    })}
    <circle cx={cx} cy={cy} r="24" fill="#2E4036" /><text x={cx} y={cy + 8} className="nucleus">{s.center}</text>
    <text x="300" y="282" className="diagram-caption">{s.example} · {s.bp} bonding + {s.lp} lone → {s.name.toUpperCase()} · {s.angle}</text>
    <text x="300" y="306" className="diagram-caption">{s.bp + s.lp === 4 ? 'A 3D shape drawn flat: the wedge points toward you.' : 'Shape view: double bonds are drawn as one line here.'}</text>
  </svg>
}

function NamingDiagram({ step }) {
  const hi = (part) => (step === 0 || step === 4 || (part === 'N' && step === 1) || (part === 'O' && (step === 2 || step === 3))) ? '#CC5833' : '#2E4036'
  const pieces = [
    { text: 'di', show: step >= 1, color: step === 1 ? '#CC5833' : '#2E4036' },
    { text: 'nitrogen ', show: step >= 1, color: '#2E4036' },
    { text: 'tri', show: step >= 2, color: step === 2 ? '#CC5833' : '#2E4036' },
    { text: 'ox', show: step >= 3, color: step === 3 ? '#CC5833' : '#2E4036' },
    { text: 'ide', show: step >= 3, color: step === 3 ? '#CC5833' : '#2E4036' },
  ]
  return <svg viewBox="0 0 600 320" role="img" aria-label={lessons[6].steps[step]}>
    <text x="300" y="120" textAnchor="middle" fontSize="76" fontWeight="600">
      <tspan fill={hi('N')}>N</tspan><tspan fill={hi('N')} fontSize="44" dy="16">2</tspan>
      <tspan fill={hi('O')} dy="-16">O</tspan><tspan fill={hi('O')} fontSize="44" dy="16">3</tspan>
    </text>
    <text x="300" y="168" className="diagram-caption">{['TWO NONMETALS', '2 × N → DI', '3 × O → TRI', 'OXYGEN → OX + IDE', 'DONE'][step]}</text>
    <rect x="70" y="196" width="460" height="64" rx="32" fill="#e5e6db" />
    <text x="300" y="238" textAnchor="middle" fontSize="28" fontWeight="600">
      {pieces.some(p => p.show) ? pieces.filter(p => p.show).map(p => <tspan key={p.text} fill={p.color}>{p.text}</tspan>) : <tspan fill="#879783">? ? ?</tspan>}
    </text>
    <text x="300" y="300" className="diagram-caption">(prefix + nonmetal 1) (prefix + root of nonmetal 2 + ide)</text>
  </svg>
}

function AnimationPlayer({ lesson }) {
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [motionAllowed, setMotionAllowed] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const ref = useRef(null)
  const steps = lessons[lesson].steps
  useEffect(() => {
    if (!playing) return
    const timer = setInterval(() => setStep(s => { if (s >= steps.length - 1) { setPlaying(false); return s } return s + 1 }), 4200)
    return () => clearInterval(timer)
  }, [playing, steps.length])
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (motionAllowed && lesson === 0) {
        gsap.to('.orbit-outer', { rotation: 360, svgOrigin: '300 155', duration: 30, repeat: -1, ease: 'none' })
        gsap.to('.orbit-inner', { rotation: -360, svgOrigin: '300 155', duration: 18, repeat: -1, ease: 'none' })
      }
      if (motionAllowed) gsap.from('.drawing svg', { opacity: 0.4, duration: 0.5, ease: 'power2.inOut' })
    }, ref)
    return () => ctx.revert()
  }, [lesson, step, motionAllowed])
  function move(next) { setPlaying(false); setStep(next) }
  return <div className="animation-player" ref={ref}>
    <div className="player-top"><span className="eyebrow">CUSTOM ANIMATION</span><span className="mono">STEP {step + 1} / {steps.length}</span></div>
    <div className="drawing"><Diagram lesson={lesson} step={step} /></div>
    <div className="step-caption" aria-live="polite">{steps[step]}</div>
    <div className="player-controls">
      <Button className="icon-button" aria-label="Restart animation" onClick={() => move(0)}><RotateCcw size={17} /></Button>
      <Button className="icon-button" aria-label="Previous step" disabled={step === 0} onClick={() => move(step - 1)}><ChevronLeft size={20} /></Button>
      <Button className="accent" onClick={() => { if (step === steps.length - 1) setStep(0); setPlaying(!playing) }}>{playing ? <Pause size={16} /> : <Play size={16} />}{playing ? 'Pause' : 'Play steps'}</Button>
      <Button className="icon-button" aria-label="Next step" disabled={step === steps.length - 1} onClick={() => move(step + 1)}><ChevronRight size={20} /></Button>
    </div>
    {lesson === 0 && <label className="motion-toggle"><input type="checkbox" checked={motionAllowed} onChange={e => setMotionAllowed(e.target.checked)} /> Animate electron motion</label>}
  </div>
}

function Video({ lesson }) {
  const [loaded, setLoaded] = useState(false)
  if (lesson.khan) return <section className="video-card">
    <div className="section-label"><Play size={16} /><span className="eyebrow">WATCH WITH A TEACHER</span></div>
    <h3>{lesson.videoTitle}</h3>
    <p className="muted">Khan Academy</p>
    <a className="video-frame khan-frame" href={khan} target="_blank" rel="noreferrer">
      <span className="khan-play"><Play size={26} /></span>
      <span>Watch “{lesson.videoTitle}” on Khan Academy <ExternalLink size={14} /></span>
    </a>
    <p><strong>While watching:</strong> {lesson.watch}</p>
    <small>Khan Academy videos open on khanacademy.org in a new tab. They need an internet connection and may be blocked on some networks.</small>
  </section>
  return <section className="video-card">
    <div className="section-label"><Play size={16} /><span className="eyebrow">WATCH WITH A TEACHER</span></div>
    <h3>{lesson.videoTitle}</h3>
    <p className="muted">{lesson.creator} · YouTube</p>
    <div className="video-frame">
      {loaded ? <iframe title={lesson.videoTitle} src={`https://www.youtube-nocookie.com/embed/${lesson.video}?rel=0`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /> :
        <Button className="accent" onClick={() => setLoaded(true)}><Play size={18} /> Load video</Button>}
    </div>
    <p><strong>While watching:</strong> {lesson.watch}</p>
    <a className="text-link" href={`https://www.youtube.com/watch?v=${lesson.video}`} target="_blank" rel="noreferrer">Watch on YouTube <ExternalLink size={14} /></a>
    <small>Videos need an internet connection and may be restricted by your school or the video owner. If the player does not load, use the direct link. External players may use cookies.</small>
  </section>
}

function Quiz({ lesson, onComplete, completed }) {
  const [answer, setAnswer] = useState(null)
  const [checked, setChecked] = useState(false)
  const correct = answer === lesson.correct
  return <section className="quiz">
    <span className="eyebrow">CHECK YOUR UNDERSTANDING</span>
    <h3>{lesson.question}</h3>
    <div className="answers" role="group" aria-label="Answer choices">{lesson.options.map((option, i) =>
      <button key={option} className={`answer ${answer === i ? 'chosen' : ''}`} aria-pressed={answer === i} onClick={() => { setAnswer(i); setChecked(false) }}><span>{String.fromCharCode(65 + i)}</span>{option}</button>)}</div>
    <Button className="primary" disabled={answer === null} onClick={() => { setChecked(true); if (correct) onComplete() }}>Check answer <ArrowRight size={16} /></Button>
    {checked && <p className={`feedback ${correct ? 'correct' : ''}`} role="status"><strong>{correct ? 'Exactly right. ' : 'Not quite — try again. '}</strong>{lesson.explanation}</p>}
    {completed && <p className="completed"><Check size={16} /> Lesson check passed</p>}
  </section>
}

function App() {
  const [active, setActive] = useState(0)
  const [completed, setCompleted] = useState([])
  const [scrolled, setScrolled] = useState(false)
  const [route, setRoute] = useState(routeFromHash)
  const root = useRef(null)
  const lesson = lessons[active]
  useEffect(() => {
    const onHashChange = () => {
      const next = routeFromHash()
      setRoute(next)
      if (next !== 'home') window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])
  useEffect(() => {
    if (route !== 'home') return
    const target = window.location.hash.slice(1)
    if (target && target !== 'home') document.getElementById(target)?.scrollIntoView({ behavior: 'instant' })
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting), { threshold: 0.2 })
    observer.observe(document.getElementById('home'))
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.from('.hero-reveal', { y: 40, opacity: 0, stagger: 0.08, duration: 1.1, ease: 'power3.out' })
      gsap.utils.toArray('.reveal').forEach(el => gsap.from(el, { y: 25, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 94%', once: true }, clearProps: 'all' }))
    }, root)
    return () => { observer.disconnect(); ctx.revert() }
  }, [route])
  function selectLesson(i) { setActive(i) }
  function openLesson(i) { setActive(i); window.location.hash = 'lessons' }
  const count = lessons.length
  return <div ref={root}>
    <a className="skip-link" href="#lessons">Skip to lessons</a>
    <header className={`navbar ${scrolled || route !== 'home' ? 'scrolled' : ''}`}>
      <a href="#home" className="brand"><Atom size={25} />Self Learning<span className="brand-dot">.</span></a>
      <nav aria-label="Main navigation"><a href="#lessons">Lessons</a><a href="#/periodic-table" aria-current={route === 'table' ? 'page' : undefined}><span className="nav-long">Periodic table</span><span className="nav-short">Table</span></a><a href="#/worksheets" aria-current={route === 'worksheets' ? 'page' : undefined}><span className="nav-long">Worksheet help</span><span className="nav-short">Worksheets</span></a><a href="#resources">Videos</a><a href="/math/" className="nav-switch"><Sigma size={15} /> Math</a></nav>
      <a className="nav-cta" href="#lessons">Start reading <ArrowRight size={15} /></a>
    </header>
    {route === 'table' ? <PeriodicTablePage /> : route === 'worksheets' ? <WorksheetsPage openLesson={openLesson} /> : <main>
      <section id="home" className="hero">
        <div className="hero-content">
          <div className="eyebrow hero-reveal"><span className="status-dot" /> CHEMISTRY, FROM THE BEGINNING</div>
          <h1 className="hero-reveal">Small atoms.<br /><em>Big understanding.</em></h1>
          <p className="hero-reveal">Electrons, bonds, and those little dots.<br />Finally, a place where it all starts to make sense.</p>
          <a className="hero-link hero-reveal" href="#lessons">Read your first lesson <ArrowDown size={18} /></a>
          <div className="hero-meta hero-reveal">08 SHORT LESSONS <span> / </span> VIDEOS + ANIMATIONS <span> / </span> WORKSHEET HELP</div>
        </div>
        <span className="hero-side">A LITTLE CURIOSITY GOES A LONG WAY.</span>
      </section>

      <section className="intro-section reveal">
        <div><span className="eyebrow">NO CHEMISTRY BACKGROUND NEEDED</span><h2>Read it. Watch it.<br /><em>Make it click.</em></h2></div>
        <div className="intro-copy"><p>You do not need to memorize a page of rules before you begin. Start with one electron, see what it does, and build from there.</p><div className="learning-path"><span>01 Read a little</span><ArrowRight size={14} /><span>02 See it move</span><ArrowRight size={14} /><span>03 Try it yourself</span></div></div>
      </section>

      <section id="lessons" className="lesson-section">
        <div className="lesson-header"><div><span className="eyebrow">YOUR LEARNING PATH</span>        <h2>From the atom to <em>compounds.</em></h2></div><div className="progress-summary"><span>{completed.length} / {count} checks passed</span><progress max={count} value={completed.length} aria-label="Lesson checks passed" /><small>Progress lasts for this visit.</small></div></div>
        <div className="lesson-layout">
                  <aside className="lesson-nav"><span className="eyebrow">EIGHT STEPS</span>
            <div role="tablist" aria-label="Chemistry lessons" aria-orientation="vertical">{lessons.map((item, i) => <button key={item.short} role="tab" id={`tab-${i}`} aria-controls="lesson-panel" aria-selected={active === i} tabIndex={active === i ? 0 : -1} className={`lesson-tab ${active === i ? 'active' : ''}`} onClick={() => selectLesson(i)} onKeyDown={e => {
                      const keys = { ArrowDown: (i + 1) % count, ArrowUp: (i + count - 1) % count, Home: 0, End: count - 1 }
              if (Object.hasOwn(keys, e.key)) { e.preventDefault(); selectLesson(keys[e.key]); document.getElementById(`tab-${keys[e.key]}`).focus() }
            }}><span className="lesson-number">{completed.includes(i) ? <Check size={16} /> : `0${i + 1}`}</span><span>{item.short}</span><ChevronRight size={15} /></button>)}</div>
            <div className="sidebar-note"><BookOpen size={22} /><p>A good place to pause?<br />Any time you need to.<br /><strong>Understanding has no timer.</strong></p></div>
          </aside>
          <article id="lesson-panel" role="tabpanel" aria-labelledby={`tab-${active}`} tabIndex={0}>
            <div className="lesson-title"><span className="eyebrow">LESSON 0{active + 1} <span className="separator">/</span> {lesson.tag}</span><h2>{lesson.title}</h2><p className="lesson-intro">{lesson.intro}</p></div>
            <AnimationPlayer key={`animation-${active}`} lesson={active} />
            <div className="reading">{lesson.points.map(([title, text], i) => <section key={title}><span className="reading-number">0{i + 1}</span><div><h3>{title}</h3><p>{text}</p></div></section>)}</div>
            {active === 1 && <a className="table-callout" href="#/periodic-table"><div><span className="eyebrow">TRY IT ON THE REAL THING</span><h3>Explore the full periodic table</h3><p>Select any element to see its group, valence electrons, and Lewis symbol.</p></div><ArrowRight size={22} /></a>}
            {active === 5 && <VseprChart />}
            {active === 6 && <PrefixTable />}
            {active === 7 && <IonChargeTable />}
            {(active === 5 || active === 6 || active === 7) && <a className="table-callout" href={`#/worksheets/${['vsepr', 'names', 'ionic'][active - 5]}`}><div><span className="eyebrow">PRACTICE</span><h3>{['VSEPR Worksheet help', 'Covalent Nomenclature WS help', 'Type I Ionic WS help'][active - 5]}</h3><p>Work through every worksheet problem with step-by-step answers you reveal when you are ready.</p></div><ArrowRight size={22} /></a>}
            <Video key={`video-${active}`} lesson={lesson} />
            <Quiz key={`quiz-${active}`} lesson={lesson} completed={completed.includes(active)} onComplete={() => setCompleted(previous => previous.includes(active) ? previous : [...previous, active])} />
            <div className="lesson-bottom"><Button disabled={active === 0} onClick={() => selectLesson(active - 1)}><ChevronLeft size={17} /> Previous lesson</Button><Button className="primary" disabled={active === count - 1} onClick={() => selectLesson(active + 1)}>Next lesson <ChevronRight size={17} /></Button></div>
          </article>
        </div>
      </section>

      <section className="manifesto reveal"><span className="eyebrow">LESS MEMORIZING. MORE UNDERSTANDING.</span><p>Chemistry is not just a set of rules.<br />It is a way to see <em>what connects.</em></p><span>Replay a step. Rewatch a video. Let a new idea settle.</span></section>
      <section id="resources" className="resources reveal">
        <div><span className="eyebrow">KEEP A TEACHER CLOSE</span><h2>Your video <em>bookshelf.</em></h2>        <p>Start with your Khan Academy lesson, then the Tyler DeWitt videos used in the lessons. Videos are hosted by their original creators.</p></div>
                <a className="resource featured-resource" href={khan} target="_blank" rel="noreferrer"><span className="eyebrow">YOUR KHAN ACADEMY RESOURCE</span><h3>Lewis diagrams for molecules</h3><p>Used in the Lewis dot and CO₂ lessons. Read our beginner explanations alongside it.</p><span className="text-link">Watch on Khan Academy <ExternalLink size={16} /></span></a>
                <div className="resource-links">{[...new Map(lessons.filter(l => l.video).map(l => [l.video, l])).values()].map(item => <a key={item.video} href={`https://www.youtube.com/watch?v=${item.video}`} target="_blank" rel="noreferrer"><div><strong>{item.videoTitle}</strong><span>{item.creator}</span></div><ExternalLink size={18} /></a>)}</div>
      </section>
      <section className="get-started reveal"><Atom size={36} /><h2>A small step is <em>still a start.</em></h2><p>Go back to the basics whenever you need. They are where the good stuff begins.</p><a className="hero-link" href="#lessons" onClick={() => selectLesson(0)}>Back to lesson one <ArrowRight size={18} /></a></section>
          </main>}
          <footer><div><a href="#home" className="brand"><Atom />Self Learning.</a><p>A little clearer, one electron at a time.</p></div><div className="footer-links"><a href="#lessons">Read the lessons</a><a href="#/periodic-table">Periodic table</a><a href="#/worksheets">Worksheet help</a><a href="/math/">Math site</a><a href="#resources">Video bookshelf</a><span><span className="status-dot" /> Free to explore · No account needed</span></div><small>Independent learning resource. Not affiliated with Khan Academy or Tyler DeWitt. Original explanations and simplified diagrams; their videos remain with their creators.</small></footer>
  </div>
}

export default App
