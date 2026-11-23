// Chapter 3 · Lesson 1 video. Based on the Ch 3 notes: blocks, orbitals per sublevel, families, metals/nonmetals.
import { COLORS, blockOf, groupOf, Z, where, range } from '../chem.mjs'

const { s, p, d, f } = COLORS
const metalloids = Z('B', 'Si', 'Ge', 'As', 'Sb', 'Te', 'At')
const nonmetals = Z('H', 'C', 'N', 'O', 'F', 'Ne', 'P', 'S', 'Cl', 'Ar', 'Se', 'Br', 'Kr', 'I', 'Xe', 'Rn')
const metals = where(e => !metalloids.includes(e.z) && !nonmetals.includes(e.z) && e.z < 117)

export default {
  id: '01-blocks',
  tag: 'CHAPTER 3 · LESSON 1 · BLOCKS & FAMILIES',
  chapters: ['Blocks', 'Orbitals', 'Families', 'Metals', 'Your turn', 'Recap'],
  layouts: { pt: { type: 'ptable' } },
  scenes: [
    {
      ch: 0, say: 'The periodic table is a map of where electrons go. Let’s learn to read that map in two minutes.',
      view: { kind: 'title', kicker: 'CHAPTER 3 · LESSON 1', title: 'Blocks &', em: 'families', sub: 'The shape of the table comes from electrons' },
    },
    {
      ch: 0, say: 'The table splits into four blocks. [[1]]Groups one and two, plus helium, are the s block. [[2]]Groups thirteen to eighteen are the p block. [[3]]The middle, groups three to twelve, is the d block. [[4]]And the two rows at the bottom are the f block.',
      view: { kind: 'ptable', layout: 'pt', title: 'Four blocks = four kinds of sublevel', groups: [
        { z: blockOf('s'), color: s, at: 1 }, { z: blockOf('p'), color: p, at: 2 }, { z: blockOf('d'), color: d, at: 3 }, { z: blockOf('f'), color: f, at: 4 },
      ], labels: [{ text: 's', col: 1.5, row: 1, at: 1 }, { text: 'p', col: 15.5, row: 2, at: 2 }, { text: 'd', col: 7.5, row: 4, at: 3 }] },
    },
    {
      ch: 1, say: 'Why those widths? Each block is one kind of sublevel. [[1]]s has one orbital. [[2]]p has three. [[3]]d has five. [[4]]f has seven. Each orbital holds two electrons, so the blocks are two, six, ten, and fourteen columns wide.',
      view: { kind: 'table', title: 'Orbitals × 2 = block width', rows: [
        { left: 's', right: '1 orbital → 2 electrons → 2 columns', at: 1 },
        { left: 'p', right: '3 orbitals → 6 electrons → 6 columns', at: 2 },
        { left: 'd', right: '5 orbitals → 10 electrons → 10 columns', at: 3 },
        { left: 'f', right: '7 orbitals → 14 electrons → 14 columns', at: 4 },
      ] },
    },
    {
      ch: 1, say: 'One catch. [[1]]The d block is one energy level behind its row. In row four it is three d. [[2]]The f block is two behind: row six is four f.',
      view: { kind: 'ptable', layout: 'pt', groups: [
        { z: range('Sc', 'Zn'), color: d, at: 1, text: Object.fromEntries(range('Sc', 'Zn').map(z => [z, '3d'])) },
        { z: range('La', 'Yb'), color: f, at: 2, text: Object.fromEntries(range('La', 'Yb').map(z => [z, '4f'])) },
      ], side: [{ text: 'd block: energy level n − 1', at: 1, color: d }, { text: 'f block: energy level n − 2', at: 2, color: f }] },
    },
    {
      ch: 2, say: 'Families are columns that act alike. [[1]]Group one: alkali metals. [[2]]Group two: alkaline earth metals. [[3]]The d block: transition metals. [[4]]Group seventeen: halogens. [[5]]Group eighteen: noble gases.',
      view: { kind: 'ptable', layout: 'pt', skipF: true, groups: [
        { z: groupOf(1).filter(z => z !== 1), color: '#CC5833', at: 1 }, { z: groupOf(2), color: '#E9A23B', at: 2, dark: false },
        { z: blockOf('d'), color: '#3D6B9A', at: 3 }, { z: groupOf(17), color: '#B5487A', at: 4 }, { z: groupOf(18), color: '#6E5BA8', at: 5 },
      ], side: [
        { text: 'Alkali metals (group 1)', at: 1, color: '#CC5833' }, { text: 'Alkaline earth (group 2)', at: 2, color: '#E9A23B' },
        { text: 'Transition metals (d block)', at: 3, color: '#3D6B9A' }, { text: 'Halogens (group 17)', at: 4, color: '#B5487A' }, { text: 'Noble gases (group 18)', at: 5, color: '#6E5BA8' },
      ] },
    },
    {
      ch: 3, say: 'Now find the staircase line. [[1]]Everything to the left is a metal. [[2]]To the right are nonmetals. [[3]]Elements touching the line are metalloids. Watch out: hydrogen sits in group one, but it is a nonmetal.',
      view: { kind: 'ptable', layout: 'pt', skipF: true, groups: [
        { z: metals, color: '#E3A587', at: 1, dark: false }, { z: nonmetals, color: '#9CC48A', at: 2, dark: false }, { z: metalloids, color: '#8FB3C9', at: 3, dark: false },
      ], rings: [{ z: 1, at: 3 }], side: [{ text: 'Metals: left', at: 1, color: '#E3A587' }, { text: 'Nonmetals: right', at: 2, color: '#9CC48A' }, { text: 'Metalloids: on the line', at: 3, color: '#8FB3C9' }] },
    },
    {
      ch: 3, say: 'Exam tip. [[1]]If a question asks which block an element is in, just find its column. [[2]]Selenium is in group sixteen, so it’s p block. [[3]]Iron is in the middle, so it’s d block.',
      view: { kind: 'cards', title: 'Exam tip: find the column', cards: [
        { head: 'Column → block', text: 'groups 1–2 s · 13–18 p · 3–12 d', at: 1, dark: true },
        { head: 'Se', text: 'group 16 → p block', at: 2 },
        { head: 'Fe', text: 'groups 3–12 → d block', at: 3 },
      ] },
    },
    {
      ch: 4, say: 'Your turn! Name the block and the family for bromine, and for barium.',
      countdown: 8,
      view: { kind: 'try', text: 'Br and Ba: which block? which family?', hint: ['Find the column', 'Groups 1–2, 3–12, 13–18'] },
    },
    {
      ch: 4, say: '[[1]]Bromine is in group seventeen: p block, a halogen. [[2]]Barium is in group two: s block, an alkaline earth metal.',
      view: { kind: 'ptable', layout: 'pt', skipF: true, groups: [{ z: Z('Br'), color: p, at: 1 }, { z: Z('Ba'), color: s, at: 2 }],
        rings: [{ z: Z('Br')[0], at: 1 }, { z: Z('Ba')[0], at: 2 }], side: [{ text: 'Br: p block · halogen', at: 1, strong: true }, { text: 'Ba: s block · alkaline earth metal', at: 2, strong: true }] },
    },
    {
      ch: 5, say: 'Recap. [[1]]s, p, d, f blocks match the sublevel being filled. [[2]]s, p, d, f have one, three, five, seven orbitals. [[3]]d is n minus one; f is n minus two. [[4]]Metals left of the staircase, nonmetals right.',
      view: { kind: 'recap', items: [
        { text: 'Block = the sublevel being filled (s, p, d, f).', at: 1 },
        { text: 'Orbitals: s 1 · p 3 · d 5 · f 7 (2 electrons each).', at: 2 },
        { text: 'd block is level n − 1; f block is n − 2.', at: 3 },
        { text: 'Metals left of the staircase, nonmetals right.', at: 4 },
      ] },
    },
  ],
}
