// Chapter 2 · Lesson 1 video. Based on the Ch 2 notes and the Unit 2 Exam Review: contributions of Democritus,
// the alchemists, Dalton, Becquerel, Thomson, Rutherford, Bohr, Schrödinger and Chadwick.
export default {
  id: '01-atomic-theory',
  tag: 'CHAPTER 2 · LESSON 1 · MODELS OF THE ATOM',
  chapters: ['Ideas', 'Dalton', 'Electron', 'Nucleus', 'Modern', 'Your turn', 'Recap'],
  scenes: [
    {
      ch: 0, say: 'Nobody has ever seen an atom clearly. So how do we know what’s inside? One clever experiment at a time. Here are the nine names your test asks about.',
      view: { kind: 'title', kicker: 'CHAPTER 2 · LESSON 1', title: 'Models of', em: 'the atom', sub: 'Who found what, and how' },
    },
    {
      ch: 0, say: '[[1]]Around four hundred B C, Democritus reasoned that matter is made of tiny pieces that can’t be cut. He called them atomos. No experiments, just thinking. [[2]]Later, alchemists tried to turn cheap metals into gold. They failed, but they invented lab tools and techniques chemists still use.',
      view: { kind: 'table', title: 'Before experiments', rows: [
        { left: '~400 BC', right: '<b>Democritus</b>: matter is tiny uncuttable “atomos” (reasoning only)', at: 1 },
        { left: 'Alchemy', right: '<b>Alchemists</b>: never made gold, but invented lab tools & techniques', at: 2 },
      ] },
    },
    {
      ch: 1, say: 'Eighteen oh three. [[1]]Dalton’s atomic theory: all matter is made of atoms, atoms of one element are identical, and in reactions atoms are rearranged, never created or destroyed. [[2]]His model: a solid sphere, like a billiard ball.',
      view: { kind: 'models', items: [{ type: 'sphere', label: 'Dalton · 1803', sub: 'solid sphere (“billiard ball”)', at: 2 }],
        side: [{ text: 'All matter is atoms', at: 1 }, { text: 'Same element → identical atoms', at: 1 }, { text: 'Reactions rearrange atoms', at: 1 }] },
    },
    {
      ch: 2, say: '[[1]]Eighteen ninety-six: Becquerel found uranium fogged a wrapped photographic plate. He discovered radioactivity. [[2]]Eighteen ninety-seven: Thomson’s cathode ray tube revealed the electron, a tiny negative particle. [[3]]His model: plum pudding, negative electrons stuck in a positive sphere.',
      view: { kind: 'models', items: [
        { type: 'plate', label: 'Becquerel · 1896', sub: 'radioactivity', at: 1 },
        { type: 'tube', label: 'Thomson · 1897', sub: 'cathode ray tube → electron', at: 2 },
        { type: 'plum', label: 'Plum pudding', sub: 'electrons in a + sphere', at: 3 },
      ] },
    },
    {
      ch: 3, say: 'Nineteen eleven: Rutherford fired alpha particles at thin gold foil. [[1]]Most went straight through, so the atom is mostly empty space. [[2]]But a few bounced back! Something tiny, dense and positive was in the middle: [[3]]the nucleus.',
      view: { kind: 'models', items: [{ type: 'foil', label: 'Gold foil experiment', at: 1 }, { type: 'nuclear', label: 'Rutherford · 1911', sub: 'tiny dense + nucleus', at: 3 }] },
    },
    {
      ch: 4, say: '[[1]]Nineteen thirteen: Bohr put electrons in fixed energy levels, like planets in orbits. It explained hydrogen’s line spectrum. [[2]]Nineteen twenty-six: Schrödinger treated electrons as waves. Orbitals are regions where an electron is likely to be: the electron cloud. [[3]]Nineteen thirty-two: Chadwick discovered the neutron, the neutral particle in the nucleus.',
      view: { kind: 'models', items: [
        { type: 'bohr', label: 'Bohr · 1913', sub: 'fixed energy levels', at: 1 },
        { type: 'cloud', label: 'Schrödinger · 1926', sub: 'electron cloud', at: 2 },
        { type: 'neutron', label: 'Chadwick · 1932', sub: 'the neutron', at: 3 },
      ] },
    },
    {
      ch: 4, say: 'Exam tip: for each person, give the contribution and the experiment or model. [[1]]Thomson: electron, cathode ray tube, plum pudding. [[2]]Rutherford: nucleus, gold foil. [[3]]Chadwick: neutron.',
      view: { kind: 'table', title: 'Exam tip: discovery + evidence', rows: [
        { left: 'Thomson', right: 'electron · cathode ray tube · plum pudding', at: 1 },
        { left: 'Rutherford', right: 'nucleus · gold foil · mostly empty space', at: 2 },
        { left: 'Chadwick', right: 'neutron', at: 3 },
      ] },
    },
    {
      ch: 5, say: 'Your turn! Which scientist matches each discovery: radioactivity, fixed energy levels, and the electron cloud?',
      countdown: 8,
      view: { kind: 'try', text: 'Radioactivity? Energy levels? Electron cloud?', hint: ['1896', '1913', '1926'] },
    },
    {
      ch: 5, say: '[[1]]Radioactivity: Becquerel. [[2]]Fixed energy levels: Bohr. [[3]]Electron cloud: Schrödinger.',
      view: { kind: 'cards', cards: [{ head: 'Becquerel', text: 'radioactivity', at: 1 }, { head: 'Bohr', text: 'energy levels', at: 2 }, { head: 'Schrödinger', text: 'electron cloud', at: 3, dark: true }] },
    },
    {
      ch: 6, say: 'Recap, in order. [[1]]Democritus, the alchemists, and Dalton’s solid sphere. [[2]]Becquerel’s radioactivity and Thomson’s electron. [[3]]Rutherford’s nucleus. [[4]]Bohr’s energy levels, Schrödinger’s cloud, and Chadwick’s neutron.',
      view: { kind: 'recap', items: [
        { text: 'Democritus → alchemists → Dalton (solid sphere)', at: 1 },
        { text: 'Becquerel (radioactivity) → Thomson (electron)', at: 2 },
        { text: 'Rutherford: gold foil → nucleus', at: 3 },
        { text: 'Bohr (levels) → Schrödinger (cloud) → Chadwick (neutron)', at: 4 },
      ] },
    },
  ],
}
