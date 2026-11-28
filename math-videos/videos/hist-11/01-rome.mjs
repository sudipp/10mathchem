// History · Chapter 11 video: Mediterranean Society, the Roman Phase. Follows the class chapter notes
// (Bentley & Ziegler, Traditions & Encounters 5e, ch. 11). Maps come from the history site (src/geo).
export default {
  id: '01-rome',
  tag: 'WORLD HISTORY · CHAPTER 11 · THE ROMAN PHASE',
  chapters: ['Republic', 'Expansion', 'Fall', 'Empire', 'Society', 'Faith', 'Exam tip', 'Your turn', 'Recap'],
  layouts: { map: { type: 'histmap', chapter: 11 } },
  scenes: [
    {
      ch: 0, say: 'How did one small town on the Tiber River come to rule the whole Mediterranean? And why did it trade its republic for an emperor? Let’s find out.',
      view: { kind: 'title', kicker: 'CHAPTER 11 · c. 750 BCE – 117 CE', title: 'Rome:', em: 'republic to empire', sub: 'Mediterranean Society, the Roman Phase' },
    },
    {
      ch: 0, say: 'Around six hundred B C E, Rome is just one city. [[1]]The Etruscans rule the north and Campania. Greek colonies fill the south and Sicily. And Carthage controls North Africa. [[2]]Rome itself is tiny, and its kings are Etruscan.',
      view: { kind: 'histmap', layout: 'map', step: 0, landsAt: 1, citiesAt: 2, side: [{ text: 'Rome starts small', at: 0, strong: true }, { text: 'Ruled by Etruscan kings', at: 2 }] },
    },
    {
      ch: 0, say: 'In five oh nine B C E, the Romans throw out their last king and create a republic: power held by elected officials. [[1]]Two consuls run the government and army, for one year only. [[2]]The Senate, the aristocrats, controls the money. [[3]]And after a long struggle, the commoners, the plebeians, win tribunes who can block unfair laws. [[4]]The laws are written down in the Twelve Tables.',
      view: { kind: 'cards', title: '509 BCE: the Republic', cards: [
        { head: '2 consuls', text: 'run government and army, one-year terms', at: 1 },
        { head: 'Senate', text: 'patricians (aristocrats) control finances', at: 2 },
        { head: 'Tribunes', text: 'protect the plebeians (commoners)', at: 3 },
        { head: 'Twelve Tables', text: 'written law, 449 BCE', at: 4, dark: true },
      ] },
    },
    {
      ch: 1, say: 'Rome grows by mixing threats with rewards. [[1]]Conquered towns get tax breaks, trade rights, and sometimes citizenship, so they stay loyal. [[2]]By two sixty-four B C E, Rome controls all of Italy.',
      view: { kind: 'histmap', layout: 'map', step: 1, landsAt: 2, citiesAt: 0, side: [{ text: 'Threats + rewards', at: 0, strong: true }, { text: 'Tax breaks · trade rights · citizenship', at: 1 }] },
    },
    {
      ch: 1, say: 'Then Rome collides with Carthage. Three Punic Wars, from two sixty-four to one forty-six B C E. [[1]]In the second war, Hannibal marches elephants from Spain over the Alps and crushes Rome at Cannae. [[2]]But Rome refuses to quit. It invades Africa and wins at Zama.',
      view: { kind: 'histmap', layout: 'map', step: 2, landsAt: 0, citiesAt: 0, routesAt: [1, 2], side: [{ text: 'Punic Wars, 264–146 BCE', at: 0, strong: true }, { text: 'Hannibal crosses the Alps, 218', at: 1 }, { text: 'Rome wins at Zama, 202', at: 2 }] },
    },
    {
      ch: 1, say: '[[1]]In one forty-six B C E, Rome burns Carthage to the ground, and takes Greece too. Rome now dominates the Mediterranean. [[2]]But all that conquest is about to wreck the Republic at home.',
      view: { kind: 'histmap', layout: 'map', step: 3, landsAt: 1, citiesAt: 1, side: [{ text: '146 BCE: Carthage destroyed', at: 1, strong: true }, { text: 'Wealth · slaves · provinces', at: 2 }] },
    },
    {
      ch: 2, say: 'Here is how the Republic falls, one link at a time. [[1]]Conquest brings wealth and slaves. [[2]]The rich build latifundia, huge estates worked by slaves, and small farmers lose their land. [[3]]The Gracchi brothers try land reform, and senators kill them. [[4]]Generals like Marius and Sulla recruit landless men loyal to them, not to Rome. [[5]]Civil war follows.',
      view: { kind: 'chain', title: 'Why the Republic fell', items: [
        { text: 'Conquest brings wealth and slaves', at: 1 }, { text: 'Latifundia ruin small farmers', at: 2 }, { text: 'Gracchi reforms blocked with violence', at: 3 },
        { text: 'Generals build private armies', at: 4 }, { text: 'Civil wars', at: 5 },
      ] },
    },
    {
      ch: 2, say: '[[1]]Julius Caesar conquers Gaul, crosses the Rubicon with his army in forty-nine B C E, and makes himself dictator. Senators stab him in forty-four. [[2]]His heir Octavian defeats Mark Antony and Cleopatra. [[3]]In twenty-seven B C E he takes the title Augustus. He keeps the Senate, but he controls the army and the provinces: a monarchy disguised as a republic.',
      view: { kind: 'cards', cards: [
        { head: 'Julius Caesar', text: 'crosses the Rubicon 49 BCE · killed 44 BCE', at: 1 },
        { head: 'Octavian', text: 'defeats Antony & Cleopatra, 31 BCE', at: 2 },
        { head: 'Augustus, 27 BCE', text: 'a monarchy disguised as a republic', at: 3, dark: true },
      ] },
    },
    {
      ch: 3, say: 'Augustus begins the Pax Romana, about two centuries of Roman peace. [[1]]By one seventeen C E, under Trajan, the empire reaches its largest size, from Britain to Egypt, and from Spain to Mesopotamia.',
      view: { kind: 'histmap', layout: 'map', step: 4, landsAt: 1, citiesAt: 1, side: [{ text: 'Pax Romana', at: 0, strong: true }, { text: 'Largest extent, c. 117 CE', at: 1 }] },
    },
    {
      ch: 3, say: 'Peace means trade. [[1]]Stone roads and safe sea lanes carry goods everywhere. [[2]]Egypt and North Africa send grain, Spain sends olive oil and silver, Italy sends wine. [[3]]Ships even sail from Red Sea ports to India for pepper, cotton and gems. And Roman law spreads ideas we still use, like innocent until proven guilty.',
      view: { kind: 'histmap', layout: 'map', step: 5, landsAt: 0, routesAt: [1], tagsAt: 2, citiesAt: 0, side: [{ text: 'Roads and sea lanes', at: 1 }, { text: 'Regions specialize', at: 2 }, { text: 'Trade reaches India', at: 3, strong: true }] },
    },
    {
      ch: 4, say: 'Roman society is deeply unequal. [[1]]The father, the paterfamilias, has legal power over his family. [[2]]The rich get richer, the poor crowd into Rome, and leaders keep them calm with bread and circuses. [[3]]Slaves may be a third of the population. In seventy-three B C E, the gladiator Spartacus leads a huge revolt.',
      view: { kind: 'cards', cards: [
        { head: 'Paterfamilias', text: 'father’s legal power over the household', at: 1 },
        { head: 'Bread & circuses', text: 'free grain and games for the urban poor', at: 2 },
        { head: 'Slavery', text: '≈ ⅓ of the people · Spartacus, 73 BCE', at: 3, dark: true },
      ] },
    },
    {
      ch: 5, say: 'Romans worship many gods and happily add new ones. [[1]]Educated Romans like Cicero follow Stoicism: reason and duty. Soldiers love the cult of Mithras. [[2]]But Jews worship one God only and refuse Rome’s gods. After revolts, Rome crushes them in the Jewish War and destroys the Temple in seventy C E.',
      view: { kind: 'cards', cards: [
        { head: 'Many gods', text: 'polytheism that absorbs foreign gods', at: 0 },
        { head: 'Stoicism · Mithras', text: 'Cicero’s philosophy · soldiers’ cult', at: 1 },
        { head: 'Jewish War, 66–70 CE', text: 'one God only → revolt → Temple destroyed', at: 2, dark: true },
      ] },
    },
    {
      ch: 5, say: 'Out of Judaism comes Christianity. Jesus of Nazareth is crucified around thirty C E; his followers believe he rose from the dead. [[1]]Paul of Tarsus carries the faith to non-Jews in cities across the empire, using Roman roads and sea lanes. [[2]]He finally reaches Rome. Despite persecution, Christianity spreads fast among the poor, women and slaves.',
      view: { kind: 'histmap', layout: 'map', step: 6, landsAt: 0, citiesAt: 0, routesAt: [1, 2], side: [{ text: 'Paul spreads the faith', at: 1 }, { text: 'Appeals to the poor, women, slaves', at: 2, strong: true }] },
    },
    {
      ch: 6, say: 'Exam tip: AP loves to compare Rome with Han China, which existed at the same time. [[1]]Both had emperors and huge territories. [[2]]Rome held together with roads, law and legions; Han China used a Confucian bureaucracy. [[3]]Both traded along the Silk Roads, and both later weakened from inequality and pressure on their frontiers.',
      view: { kind: 'table', title: 'Rome vs Han China', rows: [
        { left: 'Same', right: 'emperors · huge empires · roads · Silk Road trade', at: 1 },
        { left: 'Rome', right: 'roads, Roman law, legions, citizenship', at: 2 },
        { left: 'Han', right: 'Confucian bureaucracy, Mandate of Heaven', at: 2 },
        { left: 'Later', right: 'both weakened by inequality and frontier pressure', at: 3 },
      ] },
    },
    {
      ch: 7, say: 'Your turn! Explain one cause of the fall of the Roman Republic. Use a specific example.',
      countdown: 12,
      view: { kind: 'try', text: 'Explain ONE cause of the fall of the Roman Republic.', hint: ['Name it', 'Explain how', 'Give an example'] },
    },
    {
      ch: 7, say: 'Here is a strong answer. [[1]]Latifundia pushed small farmers off their land. [[2]]Generals like Marius recruited these landless men, who were loyal to the general who paid them, not to the state. [[3]]That let Sulla, and later Caesar, march on Rome and take power.',
      view: { kind: 'chain', title: 'A full-credit answer', items: [{ text: 'Latifundia push small farmers off their land', at: 1 }, { text: 'Generals recruit landless men loyal to them', at: 2 }, { text: 'Sulla and Caesar march on Rome', at: 3 }] },
    },
    {
      ch: 8, say: 'The whole chapter on one line. [[1]]Republic, five oh nine B C E. [[2]]Punic Wars end, one forty-six. [[3]]Caesar killed, forty-four. [[4]]Augustus, twenty-seven B C E. [[5]]Jesus crucified, around thirty C E. [[6]]Empire at its largest, one seventeen C E.',
      view: { kind: 'timeline', range: [-560, 160], ticks: [-500, -400, -300, -200, -100, 0, 100], events: [
        { year: -509, date: '509 BCE', label: 'Republic', at: 1, color: '#2F4A7A' }, { year: -146, date: '146 BCE', label: 'Carthage falls', at: 2, color: '#B5482A' },
        { year: -44, date: '44 BCE', label: 'Caesar killed', at: 3, color: '#2F4A7A' }, { year: -27, date: '27 BCE', label: 'Augustus', at: 4, color: '#2F4A7A' },
        { year: 30, date: 'c. 30 CE', label: 'Jesus crucified', at: 5, color: '#4E7A55' }, { year: 117, date: '117 CE', label: 'Largest empire', at: 6, color: '#B5482A' },
      ] },
    },
    {
      ch: 8, say: 'Recap. [[1]]The Republic shared power, but conquest made it unequal. [[2]]Generals with private armies ended it, and Augustus became emperor. [[3]]The Pax Romana, roads and law tied the empire together. [[4]]And Christianity spread along those same roads. Now try the practice questions on the site!',
      view: { kind: 'recap', items: [
        { text: 'Republic: consuls, Senate, tribunes; conquest makes it unequal.', at: 1 },
        { text: 'Private armies → civil war → Augustus (27 BCE).', at: 2 },
        { text: 'Pax Romana: roads, law, one Mediterranean market.', at: 3 },
        { text: 'Christianity spreads along Roman roads and sea lanes.', at: 4 },
      ] },
    },
  ],
}
