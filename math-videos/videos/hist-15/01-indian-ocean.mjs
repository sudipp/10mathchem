// History · Chapter 15 video: India and the Indian Ocean Basin. Follows the class chapter notes
// (Bentley & Ziegler, Traditions & Encounters 5e, ch. 15). Maps come from the history site (src/geo).
export default {
  id: '01-indian-ocean',
  tag: 'WORLD HISTORY · CHAPTER 15 · INDIA & THE INDIAN OCEAN',
  chapters: ['India divided', 'Islam arrives', 'The south', 'Ocean trade', 'Faith', 'Southeast Asia', 'Exam tip', 'Your turn', 'Recap'],
  layouts: { map: { type: 'histmap', chapter: 15 } },
  scenes: [
    {
      ch: 0, say: 'For a thousand years, India was almost never united. So how did it end up at the center of the busiest trading ocean in the world? Let’s find out.',
      view: { kind: 'title', kicker: 'CHAPTER 15 · c. 500 – 1500 CE', title: 'India and the', em: 'Indian Ocean', sub: 'A divided land at the center of the sea' },
    },
    {
      ch: 0, say: 'After the White Huns break the Gupta Empire, northern India splits into rival kingdoms. [[1]]In six oh six C E, King Harsha reunites the north from his capital at Kanauj. He is a Buddhist, tolerant, and generous to the poor. [[2]]The Chinese monk Xuanzang visits his court and studies at Nalanda. [[3]]But when Harsha dies in six forty-seven, the north falls apart again.',
      view: { kind: 'histmap', layout: 'map', step: 0, landsAt: 1, citiesAt: 1, routesAt: [2], side: [{ text: 'Gupta collapse → division', at: 0, strong: true }, { text: 'Harsha, 606–647', at: 1 }, { text: 'Then division again', at: 3 }] },
    },
    {
      ch: 1, say: 'Islam reaches India in three ways. [[1]]In seven eleven, an Arab army conquers Sind, in the Indus valley. [[2]]Muslim merchants settle in ports like Cambay. [[3]]And from ten oh one to ten twenty-seven, Mahmud of Ghazni, a Turkish ruler in Afghanistan, raids northern India again and again, looting Hindu and Buddhist temples.',
      view: { kind: 'histmap', layout: 'map', step: 1, landsAt: 1, citiesAt: 1, routesAt: [3, 3, 2, 2], tagsAt: 3, side: [{ text: 'Conquest: Sind, 711', at: 1 }, { text: 'Trade: Muslim merchants', at: 2 }, { text: 'Raids: Mahmud, 1001–1027', at: 3, strong: true }] },
    },
    {
      ch: 1, say: 'In twelve oh six, Turkish generals found the Sultanate of Delhi. [[1]]By about thirteen thirty, under Muhammad bin Tughluq, it covers almost all of India. [[2]]But its government is weak. It depends on Hindu kings who pay tribute, and nineteen of its thirty-five sultans are assassinated. [[3]]Still, it holds off the Mongols.',
      view: { kind: 'histmap', layout: 'map', step: 2, landsAt: 1, citiesAt: 0, routesAt: [3], tagsAt: 2, side: [{ text: 'Sultanate of Delhi, 1206–1526', at: 0, strong: true }, { text: 'Largest c. 1330', at: 1 }, { text: 'Weak: relies on Hindu kings', at: 2 }] },
    },
    {
      ch: 2, say: 'The south stays Hindu. [[1]]The Chola kingdom becomes a sea power. [[2]]Its armies march north to the Ganges, [[3]]and in ten twenty-five its fleet crosses the Bay of Bengal to raid Srivijaya, the kingdom that guards the straits to China.',
      view: { kind: 'histmap', layout: 'map', step: 3, landsAt: 1, citiesAt: 1, routesAt: [2, 3, 3], tagsAt: 1, side: [{ text: 'Chola: a Hindu sea power', at: 1, strong: true }, { text: 'Fleet raids Srivijaya, 1025', at: 3 }] },
    },
    {
      ch: 2, say: 'In thirteen thirty-six, two brothers who had served the Delhi Sultanate, and even converted to Islam, return to Hinduism and found the kingdom of Vijayanagara. [[1]]It rules the south for two centuries and fights the Muslim Bahmani Sultanate to its north. [[2]]Yet it hires Muslim soldiers and buys war horses from Muslim merchants. Rivals still do business.',
      view: { kind: 'cards', title: 'Vijayanagara, 1336–1565', cards: [
        { head: '1336', text: 'Harihara and Bukka renounce Islam and found a Hindu kingdom', at: 0 },
        { head: 'Rival', text: 'the Muslim Bahmani Sultanate to the north', at: 1 },
        { head: 'Yet', text: 'Muslim soldiers · horses from Muslim merchants', at: 2, dark: true },
      ] },
    },
    {
      ch: 3, say: 'Life in India follows the monsoon. [[1]]In summer the wind blows from the southwest and brings heavy rain. [[2]]In winter it blows from the northeast, and the land dries out. [[3]]So kings and temples build reservoirs and canals, and more food means more people: India’s population roughly doubles by fifteen hundred. [[4]]Temples become landlords, schools and banks.',
      view: { kind: 'cards', title: 'The monsoon world', cards: [
        { head: 'Summer', text: 'southwest monsoon brings rain', at: 1 },
        { head: 'Winter', text: 'northeast wind, dry season', at: 2 },
        { head: 'Irrigation', text: 'reservoirs and canals → population ≈ doubles', at: 3 },
        { head: 'Temples', text: 'land, schools and banks', at: 4, dark: true },
      ] },
    },
    {
      ch: 3, say: 'Sailors use the same winds to cross the ocean. [[1]]Ships ride the monsoon one way, wait in port, and ride it back, so trade moves in stages through emporia like Aden, Calicut, Melaka and Kilwa. [[2]]India sends pepper, cotton and steel; China, silk and porcelain; East Africa, gold and ivory; and Southeast Asia, spices.',
      view: { kind: 'histmap', layout: 'map', step: 5, routesAt: [1, 1, 1, 1, 1, 1, 1, 1, 1], citiesAt: 1, tagsAt: 2, side: [{ text: 'Monsoons set the schedule', at: 0, strong: true }, { text: 'Emporia: ports of exchange', at: 1 }, { text: 'Regions specialize', at: 2 }] },
    },
    {
      ch: 3, say: 'Here is the chain the exam wants for Indian Ocean trade. [[1]]Sailors understand the monsoon winds. [[2]]Bigger ships, Arab dhows with lateen sails and Chinese junks, carry more cargo. [[3]]Trade moves in stages through port cities. [[4]]Merchants settle abroad, forming diasporic communities, like Arabs in Calicut and Gujaratis in Melaka. [[5]]And with them travel religions, especially Islam.',
      view: { kind: 'chain', title: 'Why Indian Ocean trade grew', items: [
        { text: 'Knowledge of the monsoon winds', at: 1 }, { text: 'Dhows (lateen sails) and junks', at: 2 }, { text: 'Trade in stages through emporia', at: 3 },
        { text: 'Diasporic merchant communities', at: 4 }, { text: 'Islam spreads with them', at: 5 },
      ] },
    },
    {
      ch: 4, say: 'Religion in India changes too. [[1]]Turkish armies destroy Buddhist monasteries like Nalanda, and Buddhism fades in the land of its birth. [[2]]Hindus turn to loving devotion to Vishnu and Shiva. [[3]]And Islam wins about twenty-five million converts by fifteen hundred, many through Sufis, Muslim mystics who are flexible about local customs. Usually a whole caste converts together, so its rank stays the same.',
      view: { kind: 'cards', title: 'Faith in India', cards: [
        { head: 'Buddhism fades', text: 'Nalanda sacked in the 1190s', at: 1 },
        { head: 'Devotional Hinduism', text: 'Vishnu and Shiva · Shankara, Ramanuja', at: 2 },
        { head: 'Islam grows', text: '≈ 25 million by 1500 · Sufis · caste rank kept', at: 3, dark: true },
      ] },
    },
    {
      ch: 4, say: 'Some teachers try to bring the faiths together. [[1]]The bhakti movement of loving devotion, born among Tamil poet-saints in the south, spreads north. [[2]]In the fourteen hundreds, the weaver-poet Kabir says God is neither in temple nor in mosque, and that caste means nothing to God. [[3]]Most people keep their separate faiths, but bhakti later shapes Sikhism.',
      view: { kind: 'cards', title: 'Bhakti and Kabir', cards: [
        { head: 'Bhakti', text: 'loving devotion, from the Tamil south', at: 1 },
        { head: 'Kabir', text: '“neither in temple nor in mosque”', at: 2 },
        { head: 'Result', text: 'faiths stay separate · shapes Sikhism', at: 3, dark: true },
      ] },
    },
    {
      ch: 5, say: 'Indian ideas also sail east. [[1]]Southeast Asian kings adopt Hinduism, Buddhism and Sanskrit, but not caste. Funan grows rich on the Mekong. [[2]]Then Srivijaya, on Sumatra, uses its navy to control the Strait of Malacca and taxes ships on the route between India and China. [[3]]It is also a great Buddhist center, with more than a thousand monks.',
      view: { kind: 'histmap', layout: 'map', step: 6, landsAt: 1, citiesAt: 1, routesAt: [2, 2], tagsAt: 3, side: [{ text: 'Indian kingship, no caste', at: 1, strong: true }, { text: 'Srivijaya taxes the strait', at: 2 }, { text: 'Buddhist learning', at: 3 }] },
    },
    {
      ch: 5, say: 'On the mainland, Angkor, the Khmer kingdom of Cambodia, grows rich on irrigated rice and builds Angkor Wat. [[1]]On Java, Majapahit rules a Hindu-Buddhist sea empire. [[2]]Around fourteen hundred, Melaka takes control of the strait, and its rulers become Muslim. [[3]]Islam spreads through the islands along the trade routes.',
      view: { kind: 'histmap', layout: 'map', step: 7, landsAt: 0, citiesAt: 1, tagsAt: 3, side: [{ text: 'Angkor: rice and temples', at: 0, strong: true }, { text: 'Majapahit: Java', at: 1 }, { text: 'Melaka: Islam spreads', at: 2 }] },
    },
    {
      ch: 6, say: 'Exam tip: AP loves to compare sea power and land power in Southeast Asia. [[1]]Srivijaya got rich from the sea, by taxing ships in the strait. [[2]]Angkor got rich from the land, from irrigated rice. [[3]]Both borrowed Indian religions and Indian ideas of kingship. [[4]]You can make the same kind of comparison inside India: the Muslim Delhi Sultanate in the north, and Hindu Vijayanagara in the south.',
      view: { kind: 'table', title: 'Srivijaya vs Angkor', rows: [
        { left: 'Srivijaya', right: 'sea power: navy, tolls in the strait', at: 1 },
        { left: 'Angkor', right: 'land power: irrigated rice, temple cities', at: 2 },
        { left: 'Both', right: 'Indian kingship, Hinduism and Buddhism', at: 3 },
        { left: 'In India', right: 'Delhi Sultanate (north) vs Vijayanagara (south)', at: 4 },
      ] },
    },
    {
      ch: 7, say: 'Your turn! Explain one way the monsoon winds shaped trade in the Indian Ocean. Use a specific example.',
      countdown: 12,
      view: { kind: 'try', text: 'Explain ONE way the monsoon winds shaped Indian Ocean trade.', hint: ['Name the winds', 'Explain the effect', 'Give a port as an example'] },
    },
    {
      ch: 7, say: 'Here is a strong answer. [[1]]The monsoon blows from the southwest in summer and from the northeast in winter. [[2]]So ships had to wait months in port for the wind to turn. [[3]]That made ports like Calicut and Melaka into emporia, where merchants from many lands lived side by side.',
      view: { kind: 'chain', title: 'A full-credit answer', items: [{ text: 'Monsoon: southwest in summer, northeast in winter', at: 1 }, { text: 'Ships wait months for the wind to turn', at: 2 }, { text: 'Calicut and Melaka become emporia', at: 3 }] },
    },
    {
      ch: 8, say: 'The whole chapter on one line. [[1]]Harsha, six oh six. [[2]]Arabs in Sind, seven eleven. [[3]]Mahmud’s raids begin, ten oh one. [[4]]The Delhi Sultanate, twelve oh six. [[5]]Vijayanagara, thirteen thirty-six. [[6]]And Melaka, around fourteen hundred.',
      view: { kind: 'timeline', range: [560, 1480], ticks: [650, 850, 1050, 1250, 1450], events: [
        { year: 606, date: '606', label: 'Harsha', at: 1, color: '#2F4A7A' }, { year: 711, date: '711', label: 'Arabs in Sind', at: 2, color: '#4E7A55' },
        { year: 1001, date: '1001', label: 'Mahmud’s raids', at: 3, color: '#B5482A' }, { year: 1206, date: '1206', label: 'Delhi Sultanate', at: 4, color: '#2F4A7A' },
        { year: 1336, date: '1336', label: 'Vijayanagara', at: 5, color: '#B5482A' }, { year: 1400, date: 'c. 1400', label: 'Melaka', at: 6, color: '#4E7A55' },
      ] },
    },
    {
      ch: 8, say: 'Recap. [[1]]After the Gupta, northern India stayed divided, and Turkish Muslims came to rule the north as the Delhi Sultanate. [[2]]Hindu kingdoms like the Cholas and Vijayanagara held the south. [[3]]Monsoon winds, new ships and port cities made the Indian Ocean the busiest trade zone in the world. [[4]]And Indian religions, then Islam, spread across Southeast Asia along the sea lanes. Now try the practice questions on the site!',
      view: { kind: 'recap', items: [
        { text: 'North divided; Turkish Muslims rule it as the Delhi Sultanate.', at: 1 },
        { text: 'Hindu south: the Cholas, then Vijayanagara.', at: 2 },
        { text: 'Monsoons, dhows, junks and emporia link the ocean.', at: 3 },
        { text: 'Indian religions, then Islam, spread to Southeast Asia.', at: 4 },
      ] },
    },
  ],
}
