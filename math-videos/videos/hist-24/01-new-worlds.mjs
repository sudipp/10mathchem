// History · Chapter 24 video: New Worlds, the Americas and Oceania. Follows the class chapter notes
// (Bentley & Ziegler, Traditions & Encounters 5e, ch. 24). Maps come from the history site (src/geo).
export default {
  id: '01-new-worlds',
  tag: 'WORLD HISTORY · CHAPTER 24 · NEW WORLDS',
  chapters: ['Caribbean', 'Conquest', 'Silver & sugar', 'Society', 'North America', 'Oceania', 'Exam tip', 'Your turn', 'Recap'],
  layouts: { map: { type: 'histmap', chapter: 24 } },
  scenes: [
    {
      ch: 0, say: 'How did a few hundred Spaniards topple the Aztec and Inca empires? Why did silver from one Andean mountain end up in China? And how did the same story reach Australia? Let’s find out.',
      view: { kind: 'title', kicker: 'CHAPTER 24 · 1492 – 1800 CE', title: 'New worlds:', em: 'conquest, silver and sugar', sub: 'The Americas and Oceania' },
    },
    {
      ch: 0, say: 'In fourteen ninety-two, Columbus lands in the Bahamas and meets the Taíno, an Arawak people. [[1]]He makes Hispaniola his base. [[2]]By fifteen eleven, Spaniards also hold Puerto Rico, Jamaica and Cuba. There are no spices or silks here, so the Spanish force the Taíno to mine gold.',
      view: { kind: 'histmap', layout: 'map', step: 0, landsAt: 1, citiesAt: 0, routesAt: [0, 0], tagsAt: 2, side: [{ text: 'Taíno meet Columbus, 1492', at: 0, strong: true }, { text: 'Hispaniola = the base', at: 1 }, { text: 'Gold mining by force', at: 2 }] },
    },
    {
      ch: 0, say: 'Three things destroy Taíno society. [[1]]The encomienda gives Spanish settlers the right to Native labor. In practice, it is forced labor. [[2]]In fifteen eighteen smallpox arrives, and the Taíno have no immunity. By about fifteen fifty they are gone. [[3]]With the gold running out, the Spanish plant sugar, and import enslaved Africans to work it.',
      view: { kind: 'cards', title: 'The Caribbean, 1492–1550', cards: [
        { head: 'Encomienda', text: 'settlers get Native labor: forced work', at: 1 },
        { head: 'Smallpox, 1518', text: 'no immunity → Taíno gone by c. 1550', at: 2 },
        { head: 'Sugar', text: 'plantations need imported African slaves', at: 3, dark: true },
      ] },
    },
    {
      ch: 1, say: 'Next, the mainland. [[1]]In fifteen nineteen Hernán Cortés lands at Veracruz with about four hundred fifty men and marches to Tenochtitlan. Smallpox hits the city, and in fifteen twenty-one it falls. [[2]]In fifteen thirty-two Francisco Pizarro captures the Inca emperor Atahualpa at Cajamarca, and the next year he takes Cuzco.',
      view: { kind: 'histmap', layout: 'map', step: 1, landsAt: 0, citiesAt: 0, routesAt: [1, 1, 2, 2], tagsAt: 1, side: [{ text: 'Cortés: Aztecs, 1519–1521', at: 1, strong: true }, { text: 'Pizarro: Inca, 1532–1533', at: 2, strong: true }] },
    },
    {
      ch: 1, say: 'How could so few win? It took several causes together. [[1]]Smallpox killed huge numbers of defenders. [[2]]Native allies, like the Tlaxcalans, hated Aztec rule and fought beside Cortés. [[3]]The Inca were already split by a civil war. [[4]]And steel swords, guns and horses gave the Spanish an edge in battle.',
      view: { kind: 'chain', title: 'Why so few Spaniards won', items: [
        { text: 'Smallpox kills defenders', at: 1 }, { text: 'Native allies: Tlaxcalans', at: 2 },
        { text: 'Inca civil war', at: 3 }, { text: 'Steel, guns, horses', at: 4 },
      ] },
    },
    {
      ch: 1, say: 'Spain rules through two viceroyalties: [[1]]New Spain, with Mexico City built on top of Tenochtitlan, and Peru, with its capital at Lima. Courts called audiencias watch the viceroys. [[2]]And the Treaty of Tordesillas, in fourteen ninety-four, gives Brazil to Portugal.',
      view: { kind: 'histmap', layout: 'map', step: 2, landsAt: 1, citiesAt: 1, routesAt: [2], tagsAt: 2, side: [{ text: 'Viceroys + audiencias', at: 1, strong: true }, { text: 'Tordesillas, 1494: Brazil to Portugal', at: 2 }] },
    },
    {
      ch: 2, say: 'The real treasure is silver. Huge mines open at Potosí and Zacatecas in the fifteen forties. [[1]]Treasure fleets carry the silver to Seville, [[2]]and European merchants ship much of it around Africa to Asia. [[3]]From fifteen sixty-five, the Manila galleons carry more straight across the Pacific. Much of it ends up in China.',
      view: { kind: 'histmap', layout: 'map', step: 3, landsAt: 0, citiesAt: 0, routesAt: [0, 0, 0, 1, 2, 3], tagsAt: 3, side: [{ text: 'Potosí 1545 · Zacatecas 1546', at: 0, strong: true }, { text: 'To Seville, then Asia', at: 2 }, { text: 'Manila galleons → China', at: 3 }] },
    },
    {
      ch: 2, say: 'Who digs it? [[1]]The Spanish adapt the Inca mita, a rotating labor draft. Native villages must send men to the mines, where they climb ladders in the dark with heavy loads. [[2]]The king takes a fifth of everything, the quinto. [[3]]And China wants silver because it collects its taxes in silver, so it trades silk and porcelain for it.',
      view: { kind: 'cards', title: 'Silver: the first global money', cards: [
        { head: 'Mita', text: 'Inca labor draft reused for the mines', at: 1 },
        { head: 'Quinto', text: 'the king’s fifth of all silver', at: 2 },
        { head: 'China', text: 'taxes in silver → buys it with silk, porcelain', at: 3, dark: true },
      ] },
    },
    {
      ch: 2, say: 'In Brazil, the Portuguese build sugar mills called engenhos. [[1]]Native Brazilians keep escaping, so planters buy enslaved Africans, in huge numbers from the fifteen eighties. [[2]]Five to ten percent die every year: about one human life for every ton of sugar. [[3]]Later the same system spreads to Caribbean islands like Barbados.',
      view: { kind: 'histmap', layout: 'map', step: 4, landsAt: 0, citiesAt: 0, routesAt: [1, 1, 3, 2], tagsAt: 2, side: [{ text: 'Engenhos on the coast', at: 0, strong: true }, { text: 'Enslaved Africans from the 1580s', at: 1 }, { text: 'One life per ton of sugar', at: 2 }] },
    },
    {
      ch: 3, say: 'Most migrants are men, so new mixed peoples appear: mestizos, mulattoes and zambos. A race-based ladder forms. [[1]]At the top, peninsulares, born in Spain. [[2]]Then criollos, Europeans born in the Americas. [[3]]Then people of mixed ancestry. [[4]]And at the bottom, slaves and conquered peoples.',
      view: { kind: 'cards', title: 'The colonial social ladder', cards: [
        { head: 'Peninsulares', text: 'born in Spain or Portugal: top offices', at: 1 },
        { head: 'Criollos', text: 'European descent, born in the Americas', at: 2 },
        { head: 'Mixed peoples', text: 'mestizos, mulattoes, zambos', at: 3 },
        { head: 'Slaves', text: 'and conquered Native peoples at the bottom', at: 4, dark: true },
      ] },
    },
    {
      ch: 3, say: 'Missionaries, Franciscans, Dominicans and Jesuits, spread Catholicism. [[1]]Many Native people convert, but keep older beliefs inside Christian worship, as with the Virgin of Guadalupe. [[2]]Others resist: the Pueblo Revolt of sixteen eighty drives the Spanish out of New Mexico, [[3]]and Túpac Amaru the Second leads a huge Andean rebellion in seventeen eighty.',
      view: { kind: 'cards', title: 'Faith and resistance', cards: [
        { head: 'Blended faith', text: 'Catholic worship + older beliefs · Guadalupe', at: 1 },
        { head: 'Pueblo Revolt, 1680', text: 'Spanish driven from New Mexico', at: 2 },
        { head: 'Túpac Amaru II, 1780', text: 'great Andean rebellion', at: 3, dark: true },
      ] },
    },
    {
      ch: 4, say: 'In the sixteen hundreds, France, England and the Netherlands settle North America. [[1]]Jamestown, sixteen oh seven. Quebec, sixteen oh eight. Plymouth, sixteen twenty. [[2]]The Dutch New Amsterdam becomes English New York in sixteen sixty-four. These colonies govern themselves far more than Spain’s do.',
      view: { kind: 'histmap', layout: 'map', step: 5, landsAt: 0, citiesAt: 1, tagsAt: 2, side: [{ text: 'Settler colonies', at: 0, strong: true }, { text: 'Jamestown · Quebec · Plymouth', at: 1 }, { text: 'More self-government', at: 2 }] },
    },
    {
      ch: 4, say: 'Here there are no rich empires to conquer. [[1]]The French trade guns, pots and blankets for beaver furs, which sparks the Beaver Wars between the Iroquois and the Huron. [[2]]English settlers clear land for farms and push Native peoples off it. [[3]]Tobacco, rice and indigo need workers: first indentured servants, then, more and more, enslaved Africans.',
      view: { kind: 'cards', title: 'Furs, farms and cash crops', cards: [
        { head: 'Fur trade', text: 'beaver pelts → Beaver Wars', at: 1 },
        { head: 'Settlers', text: 'clear land, displace Native peoples', at: 2 },
        { head: 'Cash crops', text: 'indentured servants → enslaved Africans', at: 3, dark: true },
      ] },
    },
    {
      ch: 5, say: 'Oceania comes last. Spanish galleons use Guam as a stop, and smallpox ravages its people. [[1]]In seventeen seventy, Captain James Cook charts eastern Australia and claims it for Britain. [[2]]On his third voyage he reaches Hawaii, where he is killed in seventeen seventy-nine. [[3]]In seventeen eighty-eight, the First Fleet brings convicts to Sydney.',
      view: { kind: 'histmap', layout: 'map', step: 7, landsAt: 1, citiesAt: 0, routesAt: [1, 2, 3], tagsAt: 1, side: [{ text: 'Cook claims Australia, 1770', at: 1, strong: true }, { text: 'Killed in Hawaiʻi, 1779', at: 2 }, { text: 'First Fleet, 1788', at: 3 }] },
    },
    {
      ch: 6, say: 'Exam tip: AP loves to compare Spanish and English colonies. [[1]]Spain wanted silver and converts and ruled huge Native populations as laborers. [[2]]England wanted land for settlers and pushed Native peoples away. [[3]]Spain ran a centralized government of viceroys, while the English colonies governed themselves. [[4]]Both relied more and more on enslaved Africans.',
      view: { kind: 'table', title: 'Spanish vs English colonies', rows: [
        { left: 'Spain', right: 'silver, converts · Native labor (encomienda, mita)', at: 1 },
        { left: 'England', right: 'land for settlers · Native peoples pushed out', at: 2 },
        { left: 'Rule', right: 'viceroys and audiencias vs self-governing assemblies', at: 3 },
        { left: 'Both', right: 'disease, lost Native land, African slavery', at: 4 },
      ] },
    },
    {
      ch: 7, say: 'Your turn! Explain one way silver from the Americas connected the Americas to Asia. Use a specific example.',
      countdown: 12,
      view: { kind: 'try', text: 'Explain ONE way silver from the Americas connected the Americas to Asia.', hint: ['Name the route', 'Explain the demand', 'Give an example'] },
    },
    {
      ch: 7, say: 'Here is a strong answer. [[1]]Native workers, drafted through the mita, mined silver at Potosí. [[2]]From fifteen sixty-five, Manila galleons carried it from Acapulco across the Pacific. [[3]]In Manila, Chinese merchants traded silk and porcelain for it, because China collected its taxes in silver.',
      view: { kind: 'chain', title: 'A full-credit answer', items: [{ text: 'Mita labor mines silver at Potosí', at: 1 }, { text: 'Manila galleons: Acapulco → Manila', at: 2 }, { text: 'China trades silk for silver', at: 3 }] },
    },
    {
      ch: 8, say: 'The whole chapter on one line. [[1]]Columbus, fourteen ninety-two. [[2]]Tenochtitlan falls, fifteen twenty-one. [[3]]Inca conquered, fifteen thirty-three. [[4]]Silver at Potosí, fifteen forty-five. [[5]]Jamestown, sixteen oh seven. [[6]]Pueblo Revolt, sixteen eighty. [[7]]And the First Fleet, seventeen eighty-eight.',
      view: { kind: 'timeline', range: [1470, 1810], ticks: [1500, 1550, 1600, 1650, 1700, 1750, 1800], events: [
        { year: 1492, date: '1492', label: 'Columbus', at: 1, color: '#2F4A7A' }, { year: 1521, date: '1521', label: 'Aztecs fall', at: 2, color: '#B5482A' },
        { year: 1533, date: '1533', label: 'Inca fall', at: 3, color: '#B5482A' }, { year: 1545, date: '1545', label: 'Potosí silver', at: 4, color: '#6E5A8F' },
        { year: 1607, date: '1607', label: 'Jamestown', at: 5, color: '#2F4A7A' }, { year: 1680, date: '1680', label: 'Pueblo Revolt', at: 6, color: '#B5482A' },
        { year: 1788, date: '1788', label: 'First Fleet', at: 7, color: '#4E7A55' },
      ] },
    },
    {
      ch: 8, say: 'Recap. [[1]]Smallpox and conquest destroyed the Taíno, the Aztecs and the Inca. [[2]]Spain ruled through viceroys and forced Native labor, and Brazil ran on African slavery. [[3]]American silver flowed to Europe and China. [[4]]And English and French settlers pushed Native peoples off the land, a pattern that reached Australia in seventeen eighty-eight. Now try the practice questions on the site!',
      view: { kind: 'recap', items: [
        { text: 'Smallpox + conquest: Taíno, Aztecs, Inca destroyed.', at: 1 },
        { text: 'Viceroys, encomienda, mita; Brazil’s sugar runs on slavery.', at: 2 },
        { text: 'American silver flows to Europe and China.', at: 3 },
        { text: 'Settler colonies displace Native peoples, even in Australia.', at: 4 },
      ] },
    },
  ],
}
