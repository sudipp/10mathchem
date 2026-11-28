// History · Chapter 20 video: Worlds Apart, the Americas and Oceania. Follows the class chapter notes
// (Bentley & Ziegler, Traditions & Encounters 5e, ch. 20). Maps come from the history site (src/geo).
export default {
  id: '01-americas-oceania',
  tag: 'WORLD HISTORY · CHAPTER 20 · THE AMERICAS & OCEANIA',
  chapters: ['Toltecs', 'Aztecs', 'North', 'Andes', 'Inca', 'Oceania', 'Exam tip', 'Your turn', 'Recap'],
  layouts: { map: { type: 'histmap', chapter: 20 } },
  scenes: [
    {
      ch: 0, say: 'How did the Aztecs, the Inca, and the peoples of the Pacific build great societies with almost no contact with Africa, Asia or Europe? Let’s find out.',
      view: { kind: 'title', kicker: 'CHAPTER 20 · c. 950 – 1500 CE', title: 'Worlds apart:', em: 'the Americas & Oceania', sub: 'Aztecs, Inca, mound builders and Pacific voyagers' },
    },
    {
      ch: 0, say: 'After the great city of Teotihuacan collapses, central Mexico breaks into warring states. [[1]]The strongest are the Toltecs, who rule from their capital, Tula, from about nine fifty to eleven fifty C E. About sixty thousand people live in the city. [[2]]Toltec styles even reach the Maya city of Chichén Itzá. Then, around eleven seventy-five, civil strife and nomad raids destroy Tula.',
      view: { kind: 'histmap', layout: 'map', step: 0, landsAt: 1, citiesAt: 2, side: [{ text: 'A warrior state at Tula', at: 1, strong: true }, { text: 'Height c. 950–1150 CE', at: 1 }, { text: 'Destroyed c. 1175', at: 2 }] },
    },
    {
      ch: 1, say: 'In the twelve hundreds, a migrant people called the Mexica enter the Valley of Mexico. Their neighbors hate them. [[1]]Around thirteen twenty-five they settle on an island in a lake and found Tenochtitlan. [[2]]In fourteen twenty-eight they join Texcoco and Tlacopan in the Triple Alliance, and conquer an empire from the Gulf coast to the Pacific.',
      view: { kind: 'histmap', layout: 'map', step: 1, landsAt: 2, citiesAt: 1, tagsAt: 2, side: [{ text: 'Tenochtitlan, c. 1325', at: 1 }, { text: 'Triple Alliance, 1428', at: 2, strong: true }] },
    },
    {
      ch: 1, say: 'Tenochtitlan is an engineering marvel. [[1]]Chinampas, gardens built from lake-bottom mud, give up to seven crops a year. [[2]]Causeways and an aqueduct link the island to the shore. [[3]]By fifteen hundred, perhaps two hundred thousand people live there, and its great market amazes the Spanish.',
      view: { kind: 'cards', title: 'Tenochtitlan', cards: [
        { head: 'Chinampas', text: 'raised gardens from lake mud · up to 7 crops a year', at: 1 },
        { head: 'Causeways', text: 'roads across the lake, plus an aqueduct', at: 2 },
        { head: '≈ 200,000 people', text: 'a huge, orderly market', at: 3, dark: true },
      ] },
    },
    {
      ch: 1, say: 'How does the Aztec empire work? [[1]]The army conquers a town. [[2]]The local ruler stays in power. [[3]]But the town must send tribute: maize, cotton cloth, cacao, feathers and gold. [[4]]Tribute makes Tenochtitlan rich. [[5]]But many subjects resent it, and some will later join the Spanish.',
      view: { kind: 'chain', title: 'A tribute empire', items: [
        { text: 'Conquest by the Triple Alliance', at: 1 }, { text: 'Local rulers stay in place', at: 2 }, { text: 'Tribute: food, cloth, cacao, feathers', at: 3 },
        { text: 'Tenochtitlan grows rich', at: 4 }, { text: 'Resentful subjects', at: 5 },
      ] },
    },
    {
      ch: 1, say: 'Mexica society is strictly ranked. [[1]]Warriors, mostly aristocrats, win land, food and the right to wear fine cloaks and jewelry. [[2]]Commoners work in calpulli, communal groups that farm the land. [[3]]And the sun god Huitzilopochtli demands human blood, so priests sacrifice captured enemies to keep the sun moving.',
      view: { kind: 'cards', cards: [
        { head: 'Warriors', text: 'land grants, food, fine clothing', at: 1 },
        { head: 'Calpulli', text: 'communal groups of farmers', at: 2 },
        { head: 'Huitzilopochtli', text: 'sun and war god · blood sacrifice', at: 3, dark: true },
      ] },
    },
    {
      ch: 2, say: 'North of Mexico there are no big empires, but there are towns and trade. [[1]]In the Southwest, Ancestral Puebloans grow maize and build stone great houses at Chaco Canyon. [[2]]Along the Mississippi, mound builders raise Cahokia, with a mound thirty meters high. The Iroquois farm the eastern woodlands. [[3]]With no writing, archaeology shows us their trade: copper, shells, even macaws from Mexico.',
      view: { kind: 'histmap', layout: 'map', step: 2, landsAt: 0, citiesAt: 1, routesAt: [3], side: [{ text: 'Pueblo: Chaco Canyon', at: 1 }, { text: 'Mississippian: Cahokia', at: 2, strong: true }, { text: 'Trade along the rivers', at: 3 }] },
    },
    {
      ch: 3, say: 'Now the Andes. These societies never develop writing. [[1]]After earlier cultures fade, regional kingdoms rise. On the desert coast, Chimu rules from its huge adobe capital, Chan Chan. [[2]]Around Lake Titicaca, the kingdom of Chucuito grows potatoes and herds llamas and alpacas. And near Cuzco lives a small group called the Inca.',
      view: { kind: 'histmap', layout: 'map', step: 3, landsAt: 0, citiesAt: 1, tagsAt: 2, side: [{ text: 'Chimu: Chan Chan', at: 1 }, { text: 'Chucuito: llamas, potatoes', at: 2 }, { text: 'Inca: still small', at: 2, strong: true }] },
    },
    {
      ch: 4, say: 'In fourteen thirty-eight, Pachacuti takes power. [[1]]He and his heirs conquer the whole Andes, about four thousand kilometers from Quito to Chile, with eleven and a half million people. [[2]]Two main roads, one in the mountains and one on the coast, tie the empire to Cuzco.',
      view: { kind: 'histmap', layout: 'map', step: 4, landsAt: 1, citiesAt: 1, routesAt: [2], tagsAt: 2, side: [{ text: 'Pachacuti, r. 1438–1471', at: 0, strong: true }, { text: '≈ 11.5 million people', at: 1 }, { text: 'Mountain + coast roads', at: 2 }] },
    },
    {
      ch: 4, say: 'How do you run an empire with no writing and no money? [[1]]Each community owes the mit’a: turns of labor for the state. [[2]]That labor builds roads, terraces and storehouses. [[3]]Officials record it all on quipus, knotted cords. [[4]]Hostages in Cuzco and loyal colonists keep the provinces in line.',
      view: { kind: 'chain', title: 'Running the Inca empire', items: [
        { text: 'Ayllu owe mit’a labor', at: 1 }, { text: 'Roads, terraces, storehouses', at: 2 },
        { text: 'Quipus record tribute and labor', at: 3 }, { text: 'Hostages and colonists ensure loyalty', at: 4 },
      ] },
    },
    {
      ch: 4, say: 'Religion holds it together. [[1]]The king claims descent from Inti, the sun god, and is seen as infallible. [[2]]Dead kings are kept as mummies, consulted and paraded on feast days. [[3]]And sacrifices are usually crops and llamas, not people.',
      view: { kind: 'cards', cards: [
        { head: 'Son of the sun', text: 'the king descends from Inti', at: 1 },
        { head: 'Royal mummies', text: 'consulted, honored, paraded', at: 2 },
        { head: 'Sacrifice', text: 'mostly crops and animals', at: 3, dark: true },
      ] },
    },
    {
      ch: 5, say: 'Now cross to Oceania. [[1]]Aboriginal Australians live as foragers for tens of thousands of years and never farm. They trade pearl shell, spears and boomerangs across the continent. [[2]]Their Dreaming stories explain how ancestors shaped the land. Next door, New Guinea’s people grow root crops and herd pigs.',
      view: { kind: 'histmap', layout: 'map', step: 6, landsAt: 0, routesAt: [1], tagsAt: 1, citiesAt: 2, side: [{ text: 'Foragers, no farming', at: 1, strong: true }, { text: 'Long-distance trade', at: 1 }, { text: 'Myths tied to the land', at: 2 }] },
    },
    {
      ch: 5, say: 'Out in the Pacific, voyagers in big canoes reach Fiji, Tonga and Samoa by about eight hundred B C E. [[1]]Much later, Polynesians sail on to Hawaii, Easter Island and New Zealand, steering by the stars, the swells and the birds. [[2]]Some even reach South America and bring back the sweet potato.',
      view: { kind: 'histmap', layout: 'map', step: 7, routesAt: [1, 0, 0, 0, 1, 1, 1, 1, 1, 2], citiesAt: 1, tagsAt: 0, side: [{ text: 'Lapita: Fiji, Tonga, Samoa', at: 0 }, { text: 'Polynesian Triangle', at: 1, strong: true }, { text: 'Sweet potato from South America', at: 2 }] },
    },
    {
      ch: 5, say: 'On the islands, populations grow. [[1]]Hawaiians build fishponds that trap fish as they grow. [[2]]But land is limited, so fighting becomes fierce. [[3]]Chiefs rise above commoners, and priests serve the gods of war and farming at temples called marae, or heiau in Hawaii.',
      view: { kind: 'cards', cards: [
        { head: 'Fishponds', text: 'small fish swim in; big fish are trapped', at: 1 },
        { head: 'Crowding', text: 'limited land → warfare', at: 2 },
        { head: 'Chiefs & priests', text: 'classes · marae / heiau temples', at: 3, dark: true },
      ] },
    },
    {
      ch: 6, say: 'Exam tip: AP loves to compare the Aztecs and the Inca. [[1]]Both are conquest empires with sacred rulers. [[2]]But the Aztecs collect tribute in goods and leave local rulers in place. [[3]]The Inca collect labor, the mit’a, and run a centralized state. [[4]]Aztecs have big markets; the Inca have state storehouses and quipus.',
      view: { kind: 'table', title: 'Aztec vs Inca', rows: [
        { left: 'Same', right: 'conquest · sacred rulers · rich capitals', at: 1 },
        { left: 'Aztec', right: 'tribute in goods · local rulers kept', at: 2 },
        { left: 'Inca', right: 'mit’a labor · centralized · roads', at: 3 },
        { left: 'Economy', right: 'Aztec markets vs Inca storehouses', at: 4 },
      ] },
    },
    {
      ch: 7, say: 'Your turn! Explain one difference in how the Aztec and Inca empires took resources from their subjects.',
      countdown: 12,
      view: { kind: 'try', text: 'Explain ONE difference in how the Aztec and Inca empires took resources from their subjects.', hint: ['Name each method', 'Give an example', 'Say why it matters'] },
    },
    {
      ch: 7, say: 'Here is a strong answer. [[1]]The Aztecs let conquered rulers stay in power. [[2]]In return, those towns sent tribute goods such as cotton cloth and cacao to Tenochtitlan. [[3]]The Inca instead demanded the mit’a: turns of labor building roads and farming state lands.',
      view: { kind: 'chain', title: 'A full-credit answer', items: [{ text: 'Aztecs keep conquered rulers in place', at: 1 }, { text: 'Towns send tribute goods to Tenochtitlan', at: 2 }, { text: 'Inca demand mit’a labor instead', at: 3 }] },
    },
    {
      ch: 8, say: 'The whole chapter on one line. [[1]]Tula at its height, around nine fifty. [[2]]Cahokia’s peak, around eleven hundred. [[3]]Tenochtitlan founded, around thirteen twenty-five. [[4]]The Triple Alliance, fourteen twenty-eight. [[5]]Pachacuti, fourteen thirty-eight. [[6]]And the Spanish reach Tenochtitlan in fifteen nineteen.',
      view: { kind: 'timeline', range: [900, 1550], ticks: [900, 1000, 1200, 1300, 1400], events: [
        { year: 950, date: 'c. 950', label: 'Tula', at: 1, color: '#C99A3D' }, { year: 1100, date: 'c. 1100', label: 'Cahokia', at: 2, color: '#7A3B22' },
        { year: 1325, date: 'c. 1325', label: 'Tenochtitlan', at: 3, color: '#B5482A' }, { year: 1428, date: '1428', label: 'Triple Alliance', at: 4, color: '#B5482A' },
        { year: 1438, date: '1438', label: 'Pachacuti', at: 5, color: '#2F4A7A' }, { year: 1519, date: '1519', label: 'Spanish arrive', at: 6, color: '#4E7A55' },
      ] },
    },
    {
      ch: 8, say: 'Recap. [[1]]The Aztecs built a tribute empire from Tenochtitlan. [[2]]The Inca built a centralized empire on mit’a labor, roads and quipus. [[3]]North American peoples built towns like Cahokia without big states. [[4]]And in Oceania, Australians stayed foragers while Polynesians settled the Pacific. Now try the practice questions on the site!',
      view: { kind: 'recap', items: [
        { text: 'Aztecs: Triple Alliance, chinampas, tribute in goods.', at: 1 },
        { text: 'Inca: mit’a labor, roads, quipus, a king descended from the sun.', at: 2 },
        { text: 'North America: Chaco, Cahokia, the Iroquois, no big states.', at: 3 },
        { text: 'Oceania: Aboriginal foragers; Polynesian voyagers and chiefs.', at: 4 },
      ] },
    },
  ],
}
