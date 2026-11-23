// Chapter 3 · Lesson 2 video. Based on the Ch 3 notes (Aufbau "lazy tenant", Pauli, Hund "empty bus seat")
// and the Orbital Diagram WS (violations, nitrogen).
import { configTex } from '../chem.mjs'

const steps = n => Array.from({ length: n }, (_, i) => [i + 1, i + 1])

export default {
  id: '02-orbital-rules',
  tag: 'CHAPTER 3 · LESSON 2 · AUFBAU, PAULI, HUND',
  chapters: ['Boxes', 'Three rules', 'Oxygen', '4s first', 'Exam tip', 'Your turn', 'Recap'],
  layouts: {
    O: { type: 'orbitals', z: 8 },
    pauli: { type: 'orbitals', rows: [{ sub: '✗ same spin', boxes: ['↑↑'], bad: [0] }, { sub: '✓ opposite', boxes: ['↑↓'] }] },
    hund: { type: 'orbitals', rows: [{ sub: '✗ paired early', boxes: ['↑↓', '', ''], bad: [0] }, { sub: '✓ one each first', boxes: ['↑', '↑', ''] }] },
    K: { type: 'orbitals', z: 19 },
    aufbauBad: { type: 'orbitals', rows: [{ sub: '1s', boxes: ['↑↓'] }, { sub: '2s', boxes: ['↑↓'] }, { sub: '2p', boxes: ['↑↓', '↑↓', '↑↓'] }, { sub: '3s', boxes: [''], bad: [0] }, { sub: '3p', boxes: ['↑', '', ''] }] },
    N: { type: 'orbitals', z: 7 },
  },
  scenes: [
    {
      ch: 0, say: 'Three rules tell you exactly where every electron goes. Learn them once, and orbital diagrams become easy points on the test.',
      view: { kind: 'title', kicker: 'CHAPTER 3 · LESSON 2', title: 'Orbital', em: 'diagrams', sub: 'Aufbau · Pauli · Hund' },
    },
    {
      ch: 0, say: 'Here is oxygen’s orbital diagram, still empty. [[1]]Each box is one orbital. [[2]]Each arrow will be one electron, pointing up or down to show its spin. Oxygen has eight electrons to place.',
      view: { kind: 'orbitals', layout: 'O', reveal: [[0, 0]], hl: [['2p', 1, 2]], side: [{ text: 'Box = orbital', at: 1 }, { text: 'Arrow = electron (↑ or ↓ spin)', at: 2 }] },
    },
    {
      ch: 1, say: 'Rule one, Aufbau: fill the lowest energy first. Your notes call it the lazy tenant rule: [[1]]take the ground floor before climbing stairs. [[2]]So one s fills before two s.',
      view: { kind: 'orbitals', layout: 'O', reveal: [[1, 1], [2, 2]], hl: [['1s', 1]], side: [{ text: 'Aufbau: lowest energy first', at: 0, strong: true }, { text: '“Lazy tenant rule”', at: 1 }] },
    },
    {
      ch: 1, say: 'Rule two, Pauli: an orbital holds at most two electrons, and they must spin opposite ways. [[1]]Two up arrows in one box is wrong. [[2]]One up, one down is right.',
      view: { kind: 'orbitals', layout: 'pauli', reveal: [[2, 1], [4, 2]], side: [{ text: 'Pauli: max 2 per box, opposite spins', at: 0, strong: true }] },
    },
    {
      ch: 1, say: 'Rule three, Hund: in a sublevel, put one electron in each box before pairing any. Your notes call it the empty bus seat rule: [[1]]nobody sits next to a stranger [[2]]while an empty seat is still open.',
      view: { kind: 'orbitals', layout: 'hund', reveal: [[2, 1], [4, 2]], side: [{ text: 'Hund: one in each box, then pair', at: 0, strong: true }, { text: '“Empty bus seat rule”', at: 1 }] },
    },
    {
      ch: 2, say: 'Now place oxygen’s eight electrons. [[1]]One. [[2]]Two, opposite spin. [[3]]Three. [[4]]Four fills two s. [[5]]Five, [[6]]six, [[7]]seven: one in each two p box first. [[8]]Eight pairs up. [[9]]That’s one s two, two s two, two p four.',
      view: { kind: 'orbitals', layout: 'O', reveal: steps(8), gap: 0, hl: [['1s', 1, 3], ['2s', 3, 5], ['2p', 5]], config: { at: 9 } },
    },
    {
      ch: 3, say: 'One surprise from Aufbau. [[1]]After three p, the next electron goes into four s, not three d, because four s is lower in energy. [[2]]That’s why potassium ends in four s one.',
      view: { kind: 'orbitals', layout: 'K', hl: [['4s', 1]], config: { tex: configTex('K'), at: 2 }, side: [{ text: '4s fills before 3d', at: 1, strong: true }] },
    },
    {
      ch: 4, say: 'Exam tip: the worksheet asks which rule a diagram breaks. [[1]]Look here: three s is empty, but three p has an electron. [[2]]Skipping a lower box breaks Aufbau. [[3]]Two same arrows in a box? Pauli. One box paired while another is empty? Hund.',
      view: { kind: 'orbitals', layout: 'aufbauBad', hl: [['3s', 1]], side: [{ text: '3s skipped → Aufbau', at: 2, strong: true }, { text: '↑↑ in one box → Pauli', at: 3 }, { text: 'Paired with an empty box → Hund', at: 3 }] },
    },
    {
      ch: 5, say: 'Your turn! Draw the orbital diagram for nitrogen. It has seven electrons.',
      countdown: 10,
      view: { kind: 'try', text: 'Draw nitrogen’s orbital diagram (7 e⁻)', hint: ['Aufbau', 'Pauli', 'Hund'] },
    },
    {
      ch: 5, say: '[[1]]One s gets two. [[2]]Two s gets two. [[3]]The last three go one in each two p box, all pointing up. [[4]]One s two, two s two, two p three.',
      view: { kind: 'orbitals', layout: 'N', reveal: [[2, 1], [4, 2], [7, 3]], config: { at: 4 } },
    },
    {
      ch: 6, say: 'Recap. [[1]]Aufbau: fill the lowest energy first, and four s comes before three d. [[2]]Pauli: at most two per box, opposite spins. [[3]]Hund: one in each box before pairing.',
      view: { kind: 'recap', items: [
        { text: 'Aufbau: lowest energy first (4s before 3d).', at: 1 },
        { text: 'Pauli: max 2 per orbital, opposite spins ↑↓.', at: 2 },
        { text: 'Hund: one in each orbital before pairing.', at: 3 },
      ] },
    },
  ],
}
