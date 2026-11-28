// History · Chapter 22 video: Transoceanic Encounters and Global Connections. Follows the class chapter notes
// (Bentley & Ziegler, Traditions & Encounters 5e, ch. 22). Maps come from the history site (src/geo).
export default {
  id: '01-transoceanic',
  tag: 'WORLD HISTORY · CHAPTER 22 · TRANSOCEANIC ENCOUNTERS',
  chapters: ['Why sail', 'Portugal', 'Atlantic', 'Pacific', 'Empires', 'Exchange', 'Exam tip', 'Your turn', 'Recap'],
  layouts: { map: { type: 'histmap', chapter: 22 } },
  scenes: [
    {
      ch: 0, say: 'How did European voyages across the oceans tie every inhabited region of the world together for the first time? Let’s follow the ships.',
      view: { kind: 'title', kicker: 'CHAPTER 22 · c. 1400 – 1800 CE', title: 'Transoceanic', em: 'encounters', sub: 'Global connections across every ocean' },
    },
    {
      ch: 0, say: 'Around fourteen fifty, rich Europeans want pepper, ginger and silk from Asia. [[1]]But spices travel by sea from India to the Red Sea, overland to Cairo and Alexandria, and then on Venetian ships. [[2]]At every stop someone charges a duty, so prices soar. A sea route straight to Asia would cut out the middlemen.',
      view: { kind: 'histmap', layout: 'map', step: 0, landsAt: 0, citiesAt: 0, routesAt: [1, 1, 1, 1], tagsAt: 2, side: [{ text: 'Spices from Asia', at: 0, strong: true }, { text: 'Many middlemen', at: 1 }, { text: 'Duties at every stop', at: 2 }] },
    },
    {
      ch: 0, say: 'Europeans have three big motives. [[1]]Trade: spices, silk, porcelain, and African gold. [[2]]Land: Portugal plants sugarcane on Madeira and the Azores. [[3]]And God: missionaries, and the crusading spirit of the reconquista in Spain.',
      view: { kind: 'cards', title: 'Why sail?', cards: [
        { head: 'Trade', text: 'spices, silk, porcelain · African gold and ivory', at: 1 },
        { head: 'Land', text: 'sugar plantations on Madeira and the Azores', at: 2 },
        { head: 'God', text: 'missionaries · the crusading spirit', at: 3, dark: true },
      ] },
    },
    {
      ch: 0, say: 'They also need the right tools. [[1]]The sternpost rudder comes from China. [[2]]Triangular lateen sails handle cross winds, and the compass and astrolabe give direction and latitude. [[3]]Most important, sailors learn the winds. The volta do mar, the return through the sea, means sailing far out into the ocean to catch a wind home.',
      view: { kind: 'cards', title: 'The technology of exploration', cards: [
        { head: 'Sternpost rudder', text: 'from China, by the 1100s', at: 1 },
        { head: 'Lateen sail · compass · astrolabe', text: 'cross winds, direction, latitude', at: 2 },
        { head: 'Volta do mar', text: 'use the ocean’s winds to get home', at: 3, dark: true },
      ] },
    },
    {
      ch: 1, say: 'Portugal goes first. Prince Henry sends ship after ship down the African coast, for gold, slaves and land. [[1]]In fourteen eighty-eight, Bartolomeu Dias rounds the Cape of Good Hope. [[2]]In fourteen ninety-seven, Vasco da Gama swings far out into the Atlantic, rounds the Cape, and rides the monsoon winds to Calicut, India, in fourteen ninety-eight.',
      view: { kind: 'histmap', layout: 'map', step: 1, landsAt: 0, citiesAt: 0, routesAt: [1, 2], tagsAt: 0, side: [{ text: 'Prince Henry (1394–1460)', at: 0, strong: true }, { text: 'Dias rounds the Cape, 1488', at: 1 }, { text: 'Da Gama to Calicut, 1498', at: 2 }] },
    },
    {
      ch: 2, say: 'Christopher Columbus thinks the earth is small: Japan, he says, is only twenty-five hundred miles west. Portugal says no, so Spain pays for his voyage. [[1]]In fourteen ninety-two he lands in the Bahamas, then Cuba and Hispaniola. [[2]]In fourteen ninety-four, the Treaty of Tordesillas splits the world between Spain and Portugal. That is why Brazil speaks Portuguese. [[3]]Farther north, Cabot, Cartier and Hudson hunt for a Northwest Passage to Asia.',
      view: { kind: 'histmap', layout: 'map', step: 2, landsAt: 0, citiesAt: 1, routesAt: [2, 1, 1, 2, 3, 3, 3], tagsAt: 2, side: [{ text: 'Columbus, 1492', at: 1, strong: true }, { text: 'Tordesillas line, 1494', at: 2 }, { text: 'A Northwest Passage?', at: 3 }] },
    },
    {
      ch: 3, say: 'In fifteen thirteen, Balboa sees the Pacific from Panama. [[1]]In fifteen nineteen, Magellan, a Portuguese captain sailing for Spain, finds a strait at the tip of South America and crosses the Pacific: more than three months without fresh food. [[2]]He is killed in the Philippines in fifteen twenty-one. [[3]]Elcano sails the last ship home in fifteen twenty-two, with just eighteen men. They have sailed around the world.',
      view: { kind: 'histmap', layout: 'map', step: 3, landsAt: 0, citiesAt: 0, routesAt: [1, 2, 3], tagsAt: 1, side: [{ text: 'Balboa sees the Pacific, 1513', at: 0 }, { text: 'Magellan killed, 1521', at: 2 }, { text: '18 men return, 1522', at: 3, strong: true }] },
    },
    {
      ch: 4, say: 'In Asia, Europeans can’t conquer the great land empires, so they build trading-post empires on the coasts. [[1]]Portugal sets up about fifty forts, like Goa, Malacca and Hormuz, and charges duties on Asian ships. [[2]]In the sixteen hundreds the Dutch and English take over, from Cape Town and Batavia to Bombay and Madras. [[3]]And Spain rules the Philippines from Manila.',
      view: { kind: 'histmap', layout: 'map', step: 5, landsAt: 1, citiesAt: 1, tagsAt: 2, side: [{ text: 'Portugal: forts + duties', at: 1, strong: true }, { text: 'Dutch & English, 1600s', at: 2 }, { text: 'Spain: Manila', at: 3 }] },
    },
    {
      ch: 4, say: 'Why do the Dutch and English win? A new kind of business: the joint-stock company. [[1]]The English East India Company, in sixteen hundred. [[2]]The Dutch V O C, in sixteen oh two. [[3]]Private investors buy shares, but the government lets the company trade, build forts and even make war. They make enormous profits.',
      view: { kind: 'cards', title: 'Joint-stock companies', cards: [
        { head: 'English East India Co.', text: '1600 · focus on India', at: 1 },
        { head: 'Dutch VOC', text: '1602 · spice islands · Batavia, 1619', at: 2 },
        { head: 'How they work', text: 'private shares + state power to trade, build forts, make war', at: 3, dark: true },
      ] },
    },
    {
      ch: 4, say: 'Russia builds its empire over land. [[1]]Ivan the Terrible takes the Mongol khanates of Kazan and Astrakhan in the fifteen fifties. [[2]]In fifteen eighty-two, Cossacks under Yermak cross the Ural Mountains, and fur traders reach the Pacific by sixteen thirty-nine. [[3]]Siberian peoples must pay tribute in furs, and by seventeen sixty-three Russians outnumber them two to one.',
      view: { kind: 'histmap', layout: 'map', step: 6, landsAt: 1, citiesAt: 0, routesAt: [2], tagsAt: 3, side: [{ text: 'Over land, not sea', at: 0, strong: true }, { text: 'Yermak crosses the Urals, 1582', at: 2 }, { text: 'Furs: sable, fox, ermine', at: 3 }] },
    },
    {
      ch: 5, say: 'After fourteen ninety-two, the two hemispheres swap living things. This is the Columbian Exchange. [[1]]Smallpox, measles and flu reach the Americas, where no one has immunity. [[2]]Central Mexico loses about ninety percent of its people. [[3]]Horses, cattle and pigs go west; maize and potatoes go east, and the world’s population grows. [[4]]To replace dying workers, Europeans ship millions of enslaved Africans across the Atlantic.',
      view: { kind: 'chain', title: 'The Columbian Exchange', items: [
        { text: 'Smallpox, measles, flu: no immunity', at: 1 }, { text: 'Central Mexico: about 90% die', at: 2 },
        { text: 'Horses and cattle west · maize and potatoes east', at: 3 }, { text: 'Enslaved Africans shipped to the Americas', at: 4 },
      ] },
    },
    {
      ch: 5, say: 'Silver ties the world together. [[1]]Silver from Potosí sails to Spain, [[2]]and the Manila galleons carry it across the Pacific to buy Chinese silk and porcelain. [[3]]Enslaved Africans are shipped to the Caribbean and Brazil. [[4]]Rivalry over all this trade explodes in the Seven Years’ War, from seventeen fifty-six to seventeen sixty-three, fought in Europe, North America, the Caribbean and India. Britain wins Canada and the lead in India.',
      view: { kind: 'histmap', layout: 'map', step: 7, landsAt: 0, citiesAt: 0, routesAt: [1, 2, 2, 2, 3, 3, 3], tagsAt: 4, side: [{ text: 'Silver: to Spain and to China', at: 1 }, { text: 'Seven Years’ War, 1756–63', at: 4, strong: true }] },
    },
    {
      ch: 6, say: 'Exam tip: AP loves to compare trading-post empires. [[1]]Portugal’s was run by the crown, with forts and duties on Asian shipping. [[2]]The Dutch V O C was a joint-stock company that took direct control of the spice islands. [[3]]Both stayed on the coasts, because Asia’s land empires were too strong to conquer.',
      view: { kind: 'table', title: 'Portuguese vs Dutch trading posts', rows: [
        { left: 'Portugal', right: 'run by the crown · forts · duties on shipping', at: 1 },
        { left: 'Dutch VOC', right: 'joint-stock company · controls the spice islands', at: 2 },
        { left: 'Both', right: 'coastal posts: Asian empires too strong to conquer', at: 3 },
      ] },
    },
    {
      ch: 7, say: 'Your turn! Explain one way the Columbian Exchange affected the Americas. Use a specific example.',
      countdown: 12,
      view: { kind: 'try', text: 'Explain ONE way the Columbian Exchange affected the Americas.', hint: ['Name the effect', 'Explain how', 'Give an example'] },
    },
    {
      ch: 7, say: 'Here is a strong answer. [[1]]Europeans brought smallpox, and Native Americans had no immunity to it. [[2]]When it struck the Aztec empire in fifteen twenty, it spread fast. [[3]]Central Mexico lost about ninety percent of its people within a century, which helped the Spanish conquer it.',
      view: { kind: 'chain', title: 'A full-credit answer', items: [{ text: 'Smallpox arrives; no Native immunity', at: 1 }, { text: 'Strikes the Aztec empire, 1520', at: 2 }, { text: 'About 90% die; Spanish conquest is easier', at: 3 }] },
    },
    {
      ch: 8, say: 'The whole chapter on one line. [[1]]Dias rounds the Cape, fourteen eighty-eight. [[2]]Columbus, fourteen ninety-two. [[3]]Da Gama reaches India, fourteen ninety-eight. [[4]]Around the world, fifteen twenty-two. [[5]]Yermak crosses the Urals, fifteen eighty-two. [[6]]The Dutch V O C, sixteen oh two. [[7]]The Seven Years’ War begins, seventeen fifty-six.',
      view: { kind: 'timeline', range: [1460, 1790], ticks: [1500, 1550, 1600, 1650, 1700, 1750], events: [
        { year: 1488, date: '1488', label: 'Dias', at: 1, color: '#4E7A55' }, { year: 1492, date: '1492', label: 'Columbus', at: 2, color: '#6E5A8F' },
        { year: 1498, date: '1498', label: 'da Gama', at: 3, color: '#4E7A55' }, { year: 1522, date: '1522', label: 'Around the world', at: 4, color: '#6E5A8F' },
        { year: 1602, date: '1602', label: 'Dutch VOC', at: 6, color: '#C99A3D' }, { year: 1582, date: '1582', label: 'Yermak', at: 5, color: '#7A3B22' },
        { year: 1756, date: '1756', label: 'Seven Years’ War', at: 7, color: '#B5482A' },
      ] },
    },
    {
      ch: 8, say: 'Recap. [[1]]Europeans sailed for trade, land and God, using borrowed technology and a new knowledge of the winds. [[2]]Portugal reached India, Spain reached the Americas, and Magellan’s crew sailed around the world. [[3]]Trading-post empires and joint-stock companies grew in Asia, while Russia expanded across Siberia. [[4]]And the Columbian Exchange and American silver tied the whole world together. Now try the practice questions on the site!',
      view: { kind: 'recap', items: [
        { text: 'Motives: trade, land, God · tools: rudder, sails, winds.', at: 1 },
        { text: 'Da Gama to India, Columbus to the Americas, Magellan around the world.', at: 2 },
        { text: 'Trading posts and joint-stock companies in Asia; Russia across Siberia.', at: 3 },
        { text: 'Columbian Exchange + silver = the first global economy.', at: 4 },
      ] },
    },
  ],
}
