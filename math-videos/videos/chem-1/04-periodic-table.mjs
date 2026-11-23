// Chapter 1 · Lesson 4 video. Based on the class periodic table: the element box, groups and periods,
// and the ion charges printed above the main groups (Ag +1, Zn and Cd +2).
import { COLORS, Z, groupOf, range } from '../chem.mjs'

const charge = (zs, txt) => Object.fromEntries(zs.map(z => [z, txt]))
const g = n => groupOf(n).filter(z => z !== 1 && z <= 86)

export default {
  id: '04-periodic-table',
  tag: 'CHAPTER 1 · LESSON 4 · READING THE PERIODIC TABLE',
  chapters: ['One box', 'Rows & columns', 'Charges', 'Exam tip', 'Your turn', 'Recap'],
  layouts: { pt: { type: 'ptable' } },
  scenes: [
    {
      ch: 0, say: 'The periodic table is the most useful cheat sheet you’re allowed to have. Here’s how to read it.',
      view: { kind: 'title', kicker: 'CHAPTER 1 · LESSON 4', title: 'Reading the', em: 'periodic table', sub: 'One box, four facts' },
    },
    {
      ch: 0, say: 'Every box has the same four facts. [[1]]At the top, the atomic number: sodium has eleven protons. [[2]]The symbol, N a, from its Latin name. [[3]]The name, sodium. [[4]]And the average atomic mass, twenty-two point nine nine amu.',
      view: { kind: 'tile', z: 11, sym: 'Na', name: 'Sodium', mass: '22.99', on: { tz: [1, 2], ts: [2, 3], tn: [3, 4], tm: [4] },
        side: [{ text: 'Atomic number = protons', at: 1 }, { text: 'Symbol', at: 2 }, { text: 'Name', at: 3 }, { text: 'Average atomic mass (amu)', at: 4 }] },
    },
    {
      ch: 1, say: '[[1]]Rows are periods, one through seven. The period number is how many energy levels the atom uses. [[2]]Columns are groups, one through eighteen. Elements in a group act alike. [[3]]Sodium is in period three, group one.',
      view: { kind: 'ptable', layout: 'pt', skipF: true, groups: [{ z: range('Na', 'Ar'), color: '#E9C46A', dark: false, at: 1 }, { z: groupOf(1), color: COLORS.d, at: 2 }, { z: Z('Na'), color: COLORS.s, at: 3 }], rings: [{ z: 11, at: 3 }],
        side: [{ text: 'Row = period (energy levels)', at: 1, color: '#E9C46A' }, { text: 'Column = group (act alike)', at: 2, color: COLORS.d }, { text: 'Na: period 3, group 1', at: 3, strong: true }] },
    },
    {
      ch: 2, say: 'Your class table prints the usual ion charge above each main group. [[1]]Metals on the left lose electrons: plus one, plus two, plus three. [[2]]Nonmetals on the right gain them: minus three, minus two, minus one. [[3]]Noble gases: zero. Your table marks group fourteen as minus four.',
      view: { kind: 'ptable', layout: 'pt', skipF: true, groups: [
        { z: g(1), color: COLORS.s, at: 1, text: charge(g(1), '+1') }, { z: g(2), color: COLORS.s, at: 1, text: charge(g(2), '+2') }, { z: g(13), color: COLORS.s, at: 1, text: charge(g(13), '+3') },
        { z: g(15), color: COLORS.d, at: 2, text: charge(g(15), '−3') }, { z: g(16), color: COLORS.d, at: 2, text: charge(g(16), '−2') }, { z: g(17), color: COLORS.d, at: 2, text: charge(g(17), '−1') },
        { z: g(18), color: '#6E5BA8', at: 3, text: charge(g(18), '0') }, { z: g(14), color: '#9aa69c', at: 3, text: charge(g(14), '−4') },
      ] },
    },
    {
      ch: 3, say: 'Exam tip: [[1]]three transition metals have only one charge, so they never need a Roman numeral: [[2]]silver is plus one, and zinc and cadmium are plus two.',
      view: { kind: 'ptable', layout: 'pt', skipF: true, groups: [{ z: Z('Ag'), color: COLORS.s, at: 2, text: { 47: '+1' } }, { z: Z('Zn', 'Cd'), color: COLORS.s, at: 2, text: { 30: '+2', 48: '+2' } }],
        side: [{ text: 'No Roman numeral needed:', at: 1, strong: true }, { text: 'Ag +1 · Zn +2 · Cd +2', at: 2 }] },
    },
    {
      ch: 4, say: 'Your turn! What charge does a sulfur ion usually have? What about calcium?',
      countdown: 8,
      view: { kind: 'try', text: 'Usual ion charge: S? Ca?', hint: ['Find the group'] },
    },
    {
      ch: 4, say: '[[1]]Sulfur is in group sixteen: it gains two electrons, so two minus. [[2]]Calcium is in group two: it loses two, so two plus.',
      view: { kind: 'ptable', layout: 'pt', skipF: true, groups: [{ z: Z('S'), color: COLORS.d, at: 1, text: { 16: '2−' } }, { z: Z('Ca'), color: COLORS.s, at: 2, text: { 20: '2+' } }],
        side: [{ text: 'S: group 16 → 2−', at: 1, strong: true }, { text: 'Ca: group 2 → 2+', at: 2, strong: true }] },
    },
    {
      ch: 5, say: 'Recap. [[1]]Each box: atomic number, symbol, name, average atomic mass. [[2]]Rows are periods; columns are groups. [[3]]Charges: plus one, plus two, plus three on the left; minus three, minus two, minus one on the right.',
      view: { kind: 'recap', items: [
        { text: 'Box: atomic number · symbol · name · atomic mass', at: 1 },
        { text: 'Rows = periods · columns = groups', at: 2 },
        { text: 'Charges: +1 +2 +3 … −3 −2 −1 · noble gases 0', at: 3 },
      ] },
    },
  ],
}
