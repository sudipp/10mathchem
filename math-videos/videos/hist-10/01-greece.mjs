// History · Chapter 10 video: Mediterranean Society, the Greek Phase. Follows the class chapter notes
// (Bentley & Ziegler, Traditions & Encounters 5e, ch. 10). Maps come from the history site (src/geo).
export default {
  id: '01-greece',
  tag: 'WORLD HISTORY · CHAPTER 10 · THE GREEK PHASE',
  chapters: ['Origins', 'Polis', 'Colonies', 'Wars', 'Alexander', 'Culture', 'Exam tip', 'Your turn', 'Recap'],
  layouts: { map: { type: 'histmap', chapter: 10 } },
  scenes: [
    {
      ch: 0, say: 'How did a land of small, quarrelsome city-states beat the Persian Empire, invent democracy, and spread its culture all the way to India? Let’s find out.',
      view: { kind: 'title', kicker: 'CHAPTER 10 · c. 2200 – 31 BCE', title: 'Greece:', em: 'city-states to empire', sub: 'Mediterranean Society, the Greek Phase' },
    },
    {
      ch: 0, say: 'Greek history starts on the island of Crete. [[1]]From about twenty-two hundred B C E, the Minoans of Knossos grow rich on sea trade. [[2]]After seventeen hundred B C E, natural disasters weaken Crete, and the warlike Mycenaeans from the mainland take over.',
      view: { kind: 'histmap', layout: 'map', step: 0, landsAt: 1, citiesAt: 1, tagsAt: 2, side: [{ text: 'Minoan Crete: sea trade', at: 1, strong: true }, { text: 'Disasters after 1700 BCE', at: 2 }, { text: 'Mycenaeans take over', at: 2 }] },
    },
    {
      ch: 0, say: 'Then comes a collapse. [[1]]Around twelve hundred B C E, the Mycenaeans may have fought Troy, the war in Homer’s Iliad. [[2]]Invasions and revolts follow. [[3]]From eleven hundred to eight hundred B C E, even writing disappears. [[4]]When Greece recovers, it is a land of city-states.',
      view: { kind: 'chain', title: 'From palaces to a dark age', items: [
        { text: 'Trojan War, c. 1200 BCE (Homer’s Iliad)', at: 1 }, { text: 'Invasions and revolts', at: 2 },
        { text: 'Dark age, 1100–800 BCE: writing lost', at: 3 }, { text: 'Rebirth: the polis', at: 4 },
      ] },
    },
    {
      ch: 1, say: 'Mountains and sea split Greece into about a thousand poleis, or city-states. [[1]]Each is a city plus its farmland, ruled by kings, tyrants, or early democracies. [[2]]Two become famous opposites: Sparta and Athens.',
      view: { kind: 'histmap', layout: 'map', step: 1, landsAt: 2, citiesAt: 1, tagsAt: 1, side: [{ text: 'Polis = city-state', at: 0, strong: true }, { text: 'Kings · tyrants · democracies', at: 1 }, { text: 'Sparta vs Athens', at: 2 }] },
    },
    {
      ch: 1, say: 'Sparta turns its conquered neighbors into helots, serfs who farm for Spartan masters. [[1]]Helots outnumber Spartans ten to one. [[2]]So Sparta becomes a military camp. Boys leave home at seven to train in barracks, [[3]]and men live with the army until about thirty.',
      view: { kind: 'cards', title: 'Sparta: a military society', cards: [
        { head: 'Helots', text: 'serfs who outnumber Spartans 10 to 1', at: 1 },
        { head: 'Age 7', text: 'boys leave home for military barracks', at: 2 },
        { head: 'Until 30', text: 'men live with the army, not at home', at: 3, dark: true },
      ] },
    },
    {
      ch: 1, say: 'Athens takes another road. [[1]]Sea trade makes it rich, but poor farmers fall into debt slavery. [[2]]In five ninety-four B C E, Solon cancels debts and bans debt slavery. [[3]]Cleisthenes gives power to a citizen assembly. [[4]]Under Pericles, democracy peaks. But only free adult men can vote.',
      view: { kind: 'chain', title: 'Athens: the road to democracy', items: [
        { text: 'Trade wealth → debt and class conflict', at: 1 }, { text: 'Solon, 594 BCE: debts canceled', at: 2 },
        { text: 'Cleisthenes, 508 BCE: citizen assembly', at: 3 }, { text: 'Pericles, 461–429 BCE: democracy’s peak (free men only)', at: 4 },
      ] },
    },
    {
      ch: 2, say: 'Greece is short of farmland. [[1]]So from eight hundred to five hundred B C E, Greeks found colonies from France to the Black Sea. [[2]]They trade olive oil and wine for grain, and festivals like the Olympic Games, first held in seven seventy-six B C E, keep all Greeks connected.',
      view: { kind: 'histmap', layout: 'map', step: 2, landsAt: 1, routesAt: [1], citiesAt: 1, tagsAt: 2, side: [{ text: 'Too many people, too little farmland', at: 0 }, { text: 'Colonies around two seas', at: 1, strong: true }, { text: 'Oil and wine for grain', at: 2 }] },
    },
    {
      ch: 3, say: 'When the Ionian Greeks revolt against Persia, Athens sends ships. [[1]]In four ninety B C E, the Athenians rout Darius’s army at Marathon. [[2]]Ten years later, Xerxes invades. Three hundred Spartans die at Thermopylae, and Athens is burned. [[3]]But the Greeks win at sea at Salamis, and by four seventy-nine the Persians are gone.',
      view: { kind: 'histmap', layout: 'map', step: 3, landsAt: 0, citiesAt: 0, routesAt: [1, 2], side: [{ text: 'Marathon, 490 BCE', at: 1 }, { text: 'Thermopylae · Salamis, 480', at: 2 }, { text: 'Persians driven out, 479', at: 3, strong: true }] },
    },
    {
      ch: 3, say: 'Victory makes Athens bold. [[1]]It leads the Delian League, and turns its allies’ payments into an empire. [[2]]Sparta fears Athenian power, and the Peloponnesian War lasts from four thirty-one to four oh four B C E. [[3]]Plague hits Athens, and Athens finally surrenders. Greece is left weak.',
      view: { kind: 'histmap', layout: 'map', step: 4, landsAt: 1, citiesAt: 1, tagsAt: 3, side: [{ text: 'Delian League → Athenian empire', at: 1 }, { text: 'Peloponnesian War, 431–404 BCE', at: 2, strong: true }, { text: 'Athens surrenders', at: 3 }] },
    },
    {
      ch: 4, say: 'To the north, Philip the Second of Macedon conquers Greece by three thirty-eight B C E. [[1]]His son Alexander invades Persia in three thirty-four, wins at Issus and Gaugamela, and marches all the way to India. [[2]]There his exhausted troops refuse to go on. He turns back, and dies in Babylon in three twenty-three, at thirty-two.',
      view: { kind: 'histmap', layout: 'map', step: 5, landsAt: 1, citiesAt: 1, routesAt: [1, 2], tagsAt: 2, side: [{ text: 'Philip II conquers Greece, 338', at: 0 }, { text: 'Alexander invades Persia, 334', at: 1, strong: true }, { text: 'Mutiny in India · dies 323', at: 2 }] },
    },
    {
      ch: 4, say: 'Alexander leaves no clear heir, so his generals split the empire. [[1]]Antigonids in Macedon and Greece, Ptolemies in rich Egypt, and Seleucids in the old Persian lands, east to Bactria. [[2]]This is the Hellenistic age.',
      view: { kind: 'histmap', layout: 'map', step: 6, landsAt: 1, citiesAt: 1, side: [{ text: 'Antigonid · Ptolemaic · Seleucid', at: 1 }, { text: 'Hellenistic age, 323–31 BCE', at: 2, strong: true }] },
    },
    {
      ch: 4, say: 'Hellenistic culture is a blend. [[1]]Greek settlers fill new cities, and Greek is spoken from Egypt to Afghanistan. [[2]]Alexandria has the greatest library in the world. [[3]]In India, Ashoka posts an edict in Greek and Aramaic. That is cultural diffusion.',
      view: { kind: 'cards', title: 'A blended world', cards: [
        { head: 'New Greek cities', text: 'Alexandria, Antioch, Ai-Khanoum; Greek spoken widely', at: 1 },
        { head: 'Great Library', text: 'Alexandria: hundreds of thousands of scrolls', at: 2 },
        { head: 'Ashoka’s edict', text: 'in Greek and Aramaic, at Kandahar', at: 3, dark: true },
      ] },
    },
    {
      ch: 5, say: 'Greek society was patriarchal. [[1]]Athenian women rarely appeared in public; Spartan women had more freedom. [[2]]Slaves, many of them Scythians and Nubians, did much of the work. [[3]]And festivals for Zeus and the other gods gave birth to tragedy and comedy.',
      view: { kind: 'cards', title: 'Greek society', cards: [
        { head: 'Women', text: 'kept at home in Athens; freer in Sparta', at: 1 },
        { head: 'Slaves', text: 'chattel: Scythians, Nubians; some bought freedom', at: 2 },
        { head: 'Gods & drama', text: 'Zeus · mystery cults · Sophocles, Aristophanes', at: 3, dark: true },
      ] },
    },
    {
      ch: 5, say: 'Greek thinkers used reason instead of myth. [[1]]Thales predicted an eclipse; Democritus imagined atoms. [[2]]Socrates questioned everyone, and was executed in three ninety-nine B C E. [[3]]Plato imagined perfect Forms. [[4]]Aristotle trusted evidence and logic. [[5]]Later, Stoics and Epicureans asked how to live a calm life.',
      view: { kind: 'chain', title: 'Greek thought, step by step', items: [
        { text: 'Thales, Democritus: nature explained by reason', at: 1 }, { text: 'Socrates: question everything (died 399 BCE)', at: 2 },
        { text: 'Plato: Forms and philosopher-kings', at: 3 }, { text: 'Aristotle: evidence and logic', at: 4 }, { text: 'Stoics, Epicureans, Skeptics', at: 5 },
      ] },
    },
    {
      ch: 6, say: 'Exam tip: AP loves to compare Athens and Sparta. [[1]]Athens was a democracy of free men; Sparta was run by a military elite. [[2]]Athens lived by sea trade; Sparta by helot farming. [[3]]Spartan women had more freedom. [[4]]But both depended on unfree labor.',
      view: { kind: 'table', title: 'Athens vs Sparta', rows: [
        { left: 'Government', right: 'Athens: democracy of free men · Sparta: military elite', at: 1 },
        { left: 'Economy', right: 'Athens: sea trade · Sparta: helot farming', at: 2 },
        { left: 'Women', right: 'Athens: at home · Sparta: more freedom', at: 3 },
        { left: 'Same', right: 'both rely on unfree labor: slaves and helots', at: 4 },
      ] },
    },
    {
      ch: 7, say: 'Your turn! Explain one way the conquests of Alexander spread Greek culture. Use a specific example.',
      countdown: 12,
      view: { kind: 'try', text: 'Explain ONE way Alexander’s conquests spread Greek culture.', hint: ['Name the way', 'Explain how', 'Give an example'] },
    },
    {
      ch: 7, say: 'Here is a strong answer. [[1]]Alexander founded new cities, like Alexandria in Egypt. [[2]]He filled them with Greek settlers, who spoke Greek and built theaters, schools and libraries. [[3]]So Greek language and ideas spread from Egypt all the way to Bactria.',
      view: { kind: 'chain', title: 'A full-credit answer', items: [{ text: 'Alexander founds new cities, like Alexandria', at: 1 }, { text: 'Greek settlers bring language, theaters, schools', at: 2 }, { text: 'Greek culture spreads from Egypt to Bactria', at: 3 }] },
    },
    {
      ch: 8, say: 'The chapter on one line. [[1]]Solon’s reforms, five ninety-four B C E. [[2]]Marathon, four ninety. [[3]]The Peloponnesian War begins, four thirty-one. [[4]]Socrates dies, three ninety-nine. [[5]]Alexander invades Persia, three thirty-four, [[6]]and dies in three twenty-three. [[7]]And at Actium, in thirty-one B C E, Rome ends the Hellenistic age.',
      view: { kind: 'timeline', range: [-650, 0], ticks: [-600, -500, -400, -300, -200, -100], events: [
        { year: -594, date: '594 BCE', label: 'Solon', at: 1, color: '#2F4A7A' }, { year: -490, date: '490 BCE', label: 'Marathon', at: 2, color: '#B5482A' },
        { year: -431, date: '431 BCE', label: 'Peloponnesian War', at: 3, color: '#B5482A' }, { year: -399, date: '399 BCE', label: 'Socrates dies', at: 4, color: '#4E7A55' },
        { year: -334, date: '334 BCE', label: 'Alexander invades', at: 5, color: '#B5482A' }, { year: -323, date: '323 BCE', label: 'Alexander dies', at: 6, color: '#2F4A7A' },
        { year: -31, date: '31 BCE', label: 'Actium', at: 7, color: '#2F4A7A' },
      ] },
    },
    {
      ch: 8, say: 'Recap. [[1]]Geography made Greece a land of independent poleis: military Sparta and democratic Athens. [[2]]Colonies and trade spread Greeks around the Mediterranean and the Black Sea. [[3]]Greeks beat Persia, then fought each other, and Macedon took over. [[4]]And Alexander’s conquests created the blended Hellenistic world. Now try the practice questions on the site!',
      view: { kind: 'recap', items: [
        { text: 'Poleis: military Sparta, democratic Athens (free men only).', at: 1 },
        { text: 'Colonies and trade around the Mediterranean and Black Sea.', at: 2 },
        { text: 'Persian Wars → Peloponnesian War → Macedon.', at: 3 },
        { text: 'Alexander → the blended Hellenistic world.', at: 4 },
      ] },
    },
  ],
}
