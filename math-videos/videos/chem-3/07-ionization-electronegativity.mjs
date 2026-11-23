// Chapter 3 · Lesson 7 video. Based on the Ch 3 notes (ionization energy, electronegativity, electron affinity)
// and the Unit 3 review (#46 Ba < Sn < Xe < Ar ionization energy, #47 Sr < Mg < C < F electronegativity).
import { COLORS, Z } from '../chem.mjs'

export default {
  id: '07-ionization-electronegativity',
  tag: 'CHAPTER 3 · LESSON 7 · IONIZATION & ELECTRONEGATIVITY',
  chapters: ['Ionization', 'Why', 'Electroneg.', 'Affinity', 'Exam tip', 'Your turn', 'Recap'],
  layouts: { pt: { type: 'ptable' } },
  scenes: [
    {
      ch: 0, say: 'Three trends, one idea: how tightly does an atom hold on to electrons? Small atoms hold on hardest.',
      view: { kind: 'title', kicker: 'CHAPTER 3 · LESSON 7', title: 'Ionization &', em: 'electronegativity', sub: 'Bigger up and to the right' },
    },
    {
      ch: 0, say: 'Ionization energy is the energy needed to pull one electron off an atom. [[1]]It gets bigger going up a group, [[2]]and bigger going right across a period.',
      view: { kind: 'ptable', layout: 'pt', skipF: true, arrows: [{ dir: 'up', at: 1 }, { dir: 'right', at: 2, label: 'ionization energy gets bigger → and ↑' }], groups: [{ z: Z('He', 'Ne'), color: COLORS.p, at: 2 }] },
    },
    {
      ch: 1, say: 'Why? It’s the opposite of atomic radius. [[1]]In a big atom like cesium, the outer electron is far from the nucleus, so it’s easy to remove. [[2]]In a small atom like fluorine, the electron is close and held tight.',
      view: { kind: 'circles', items: [{ label: 'Cs', r: 110, sub: 'far away → easy to remove', at: 1, color: '#E3A587' }, { label: 'F', r: 32, sub: 'close → hard to remove', at: 2, color: '#9CC48A' }],
        notes: [{ text: 'Small atom = tight hold = high ionization energy', at: 2, strong: true }] },
    },
    {
      ch: 2, say: 'Electronegativity is how strongly an atom pulls on shared electrons in a bond. [[1]]Same directions: up and to the right. [[2]]Fluorine is the most electronegative element of all.',
      view: { kind: 'ptable', layout: 'pt', skipF: true, arrows: [{ dir: 'up', at: 1 }, { dir: 'right', at: 1, label: 'electronegativity gets bigger → and ↑' }], groups: [{ z: Z('F'), color: COLORS.s, at: 2 }], rings: [{ z: 9, at: 2 }] },
    },
    {
      ch: 3, say: 'Electron affinity is the energy change when an atom gains an electron. [[1]]Same general direction. [[2]]The halogens want electrons the most. [[3]]Noble gases have the highest ionization energies, but they are usually left out of electronegativity and electron affinity.',
      view: { kind: 'ptable', layout: 'pt', skipF: true, groups: [{ z: [9, 17, 35, 53, 85], color: '#B5487A', at: 2 }, { z: [2, 10, 18, 36, 54, 86], color: '#c9c3dc', dark: false, at: 3 }],
        side: [{ text: 'Electron affinity: → and ↑', at: 1 }, { text: 'Halogens: greatest', at: 2, color: '#B5487A' }, { text: 'Noble gases: left out of EN and EA', at: 3, color: '#c9c3dc' }] },
    },
    {
      ch: 4, say: 'Exam tip: one picture for all four trends. [[1]]Atomic radius points down and left. [[2]]Ionization energy, electronegativity and electron affinity all point up and right. [[3]]Ranking barium, tin, xenon, argon by ionization energy, smallest to largest: barium, tin, xenon, argon.',
      view: { kind: 'cards', title: 'Exam tip: two directions', cards: [
        { head: '← ↓', text: 'atomic radius', at: 1 },
        { head: '→ ↑', text: 'ionization energy · electronegativity · electron affinity', at: 2, dark: true },
        { head: 'Ba < Sn < Xe < Ar', text: 'ionization energy', at: 3 },
      ] },
    },
    {
      ch: 5, say: 'Your turn! Which has the higher ionization energy, potassium or krypton? Then rank strontium, magnesium, carbon and fluorine by electronegativity.',
      countdown: 10,
      view: { kind: 'try', text: 'K or Kr? · Rank Sr, Mg, C, F by electronegativity', hint: ['Up and right = bigger'] },
    },
    {
      ch: 5, say: '[[1]]Krypton: same row, further right. [[2]]Electronegativity, smallest to largest: strontium, magnesium, carbon, fluorine.',
      view: { kind: 'ptable', layout: 'pt', skipF: true, groups: [{ z: Z('Kr'), color: COLORS.p, at: 1 }, { z: Z('Sr', 'Mg', 'C', 'F'), color: COLORS.d, at: 2 }],
        side: [{ text: 'Kr > K', at: 1, strong: true }, { text: 'Sr < Mg < C < F', at: 2, strong: true }] },
    },
    {
      ch: 6, say: 'Recap. [[1]]Ionization energy: energy to remove an electron. [[2]]Electronegativity: pull on shared electrons; fluorine is highest. [[3]]Both, plus electron affinity, increase up and to the right, opposite to atomic radius.',
      view: { kind: 'recap', items: [
        { text: 'Ionization energy = energy to remove an electron.', at: 1 },
        { text: 'Electronegativity = pull on shared electrons (F highest).', at: 2 },
        { text: 'IE, EN, EA increase → and ↑ (opposite of radius).', at: 3 },
      ] },
    },
  ],
}
