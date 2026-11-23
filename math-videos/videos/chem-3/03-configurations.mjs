// Chapter 3 · Lesson 3 video. Based on the Ch 3 notes: reading the table like a book (bromine), 4s before 3d,
// checking by adding, and the Orbital & Electron Configuration WS (Fe, S).
import { COLORS, Z, range, configTex } from '../chem.mjs'

const { s, p, d } = COLORS
const label = (zs, txt) => Object.fromEntries(zs.map(z => [z, txt]))
const path = [
  ['1s', Z('H', 'He'), s], ['2s', range('Li', 'Be'), s], ['2p', range('B', 'Ne'), p], ['3s', range('Na', 'Mg'), s],
  ['3p', range('Al', 'Ar'), p], ['4s', range('K', 'Ca'), s], ['3d', range('Sc', 'Zn'), d], ['4p', range('Ga', 'Br'), p],
]
const brGroups = path.map(([sub, zs, color], i) => ({ z: zs, color, at: i + 1, text: label(zs, sub) }))
const sPath = path.slice(0, 5).map(([sub, zs, color], i) => ({ z: sub === '3p' ? range('Al', 'S') : zs, color, at: i + 1, text: label(sub === '3p' ? range('Al', 'S') : zs, sub) }))

export default {
  id: '03-configurations',
  tag: 'CHAPTER 3 · LESSON 3 · ELECTRON CONFIGURATION',
  chapters: ['Read it', 'Bromine', 'Check', 'Iron', 'Your turn', 'Recap'],
  layouts: { pt: { type: 'ptable' } },
  scenes: [
    {
      ch: 0, say: 'An electron configuration is the address of every electron. And the periodic table writes it for you, if you read it like a book.',
      view: { kind: 'title', kicker: 'CHAPTER 3 · LESSON 3', title: 'Electron', em: 'configurations', sub: 'Read the table left to right, top to bottom' },
    },
    {
      ch: 0, say: 'First, what does two p four mean? [[1]]The two is the energy level, the period. [[2]]The p is the block. [[3]]The four is how many electrons are in that sublevel: how many columns into the block you went.',
      view: { kind: 'cards', title: 'Reading 2p⁴', cards: [
        { head: '2', text: 'energy level (the period)', at: 1 },
        { head: 'p', text: 'the block (sublevel)', at: 2 },
        { head: '⁴', text: 'electrons in it (columns into the block)', at: 3, dark: true },
      ] },
    },
    {
      ch: 1, say: 'Let’s do bromine. Start at hydrogen and read across. [[1]]Row one: one s two. [[2]]Row two: two s two, [[3]]then two p six. [[4]]Row three: three s two, [[5]]three p six. [[6]]Row four: four s two, [[7]]then the d block, which is three d ten. [[8]]Then four p: bromine is the fifth box, so four p five.',
      view: { kind: 'ptable', layout: 'pt', skipF: true, groups: brGroups, rings: [{ z: 35, at: 8 }], notes: [{ text: `$${configTex('Br')}$`, at: 8, strong: true }] },
    },
    {
      ch: 2, say: 'Always check by adding the superscripts. [[1]]Two plus two plus six plus two plus six plus two plus ten plus five [[2]]equals thirty-five. Bromine’s atomic number is thirty-five. It checks!',
      view: { kind: 'lines', lines: [
        { tex: configTex('Br') },
        { tex: '2+2+6+2+6+2+10+5', at: 1 },
        { tex: '= 35 = \\text{atomic number of Br}\\ \\checkmark', at: 2, glow: true },
      ] },
    },
    {
      ch: 3, say: 'Iron, from your worksheet. Iron is atomic number twenty-six. [[1]]Fill through four s two, that’s twenty electrons. [[2]]Iron is the sixth box in the three d section, so three d six. [[3]]Notice your class writes four s before three d, in filling order.',
      view: { kind: 'lines', title: 'Fe: 26 electrons', lines: [
        { tex: '\\mathrm{1s}^{2}\\,\\mathrm{2s}^{2}\\,\\mathrm{2p}^{6}\\,\\mathrm{3s}^{2}\\,\\mathrm{3p}^{6}\\,\\mathrm{4s}^{2}\\quad(20)', at: 1 },
        { tex: configTex('Fe'), at: 2, glow: true },
        { text: 'Exam tip: write 4s before 3d', at: 3, box: true },
      ] },
    },
    {
      ch: 4, say: 'Your turn! Write the full electron configuration for sulfur, atomic number sixteen.',
      countdown: 10,
      view: { kind: 'try', text: 'Sulfur (16 e⁻): full configuration', hint: ['Read across', 'Add to check: 16'] },
    },
    {
      ch: 4, say: '[[1]]One s two, [[2]]two s two, [[3]]two p six, [[4]]three s two, [[5]]and sulfur is the fourth box in three p. [[6]]One s two, two s two, two p six, three s two, three p four. Sixteen.',
      view: { kind: 'ptable', layout: 'pt', skipF: true, groups: sPath, rings: [{ z: 16, at: 5 }], notes: [{ text: `$${configTex('S')}$`, at: 6, strong: true }] },
    },
    {
      ch: 5, say: 'Recap. [[1]]Read the table left to right, row by row, until you reach your element. [[2]]The d block is one level behind: row four is three d. [[3]]Write four s before three d. [[4]]Add the superscripts to check the electron count.',
      view: { kind: 'recap', items: [
        { text: 'Read the table like a book until you reach the element.', at: 1 },
        { text: 'd block is one level behind: row 4 → 3d.', at: 2 },
        { text: 'Write 4s before 3d (filling order).', at: 3 },
        { text: 'Superscripts must add up to the electron count.', at: 4 },
      ] },
    },
  ],
}
