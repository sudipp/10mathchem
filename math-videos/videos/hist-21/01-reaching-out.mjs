// History · Chapter 21 video: Reaching Out, cross-cultural interaction c. 1200–1500. Follows the class chapter notes
// (Bentley & Ziegler, Traditions & Encounters 5e, ch. 21). Maps come from the history site (src/geo).
export default {
  id: '01-reaching-out',
  tag: 'WORLD HISTORY · CHAPTER 21 · REACHING OUT',
  chapters: ['Trade', 'Travelers', 'Exchange', 'Plague', 'Ming', 'Europe', 'Exam tip', 'Your turn', 'Recap'],
  layouts: { map: { type: 'histmap', chapter: 21 } },
  scenes: [
    {
      ch: 0, say: 'Silk, pepper, gold, missionaries, gunpowder, and a deadly plague: between twelve hundred and fifteen hundred, they all traveled the same roads. How did the world get so connected, and why did Europe sail outward?',
      view: { kind: 'title', kicker: 'CHAPTER 21 · c. 1200 – 1500 CE', title: 'Reaching out:', em: 'a connected world', sub: 'Expanding Horizons of Cross-Cultural Interaction' },
    },
    {
      ch: 0, say: 'Around thirteen hundred, three great networks link Afro-Eurasia. [[1]]The Silk Roads cross Central Asia, made safer by the Mongol khanates. [[2]]Sea lanes cross the Indian Ocean on the monsoon winds. [[3]]And camel caravans carry gold and salt across the Sahara. [[4]]Where they meet, rich trading cities grow: Venice, Cairo, Hormuz, Calicut, Malacca and Quanzhou.',
      view: { kind: 'histmap', layout: 'map', step: 0, landsAt: 1, citiesAt: 4, routesAt: [1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3], tagsAt: 4, side: [{ text: 'Three networks', at: 0, strong: true }, { text: 'Land · sea · desert', at: 3 }, { text: 'Emporia grow rich', at: 4 }] },
    },
    {
      ch: 1, say: 'Two travelers show how connected this world is. [[1]]Marco Polo, a Venetian merchant, crosses Asia to Khubilai Khan’s court and serves him for about seventeen years. He comes home by sea in twelve ninety-five. [[2]]Ibn Battuta, a Muslim legal scholar from Morocco, leaves in thirteen twenty-five and travels about seventy-five thousand miles, from Mali to China.',
      view: { kind: 'histmap', layout: 'map', step: 1, landsAt: 2, citiesAt: 0, routesAt: [1, 1, 1, 1, 2, 2], side: [{ text: 'Marco Polo, 1271–1295', at: 1 }, { text: 'Ibn Battuta, 1325–1354', at: 2, strong: true }] },
    },
    {
      ch: 1, say: 'Read their books with point of view in mind. [[1]]Polo tells his stories to a fellow prisoner during a war with Genoa, and he notices wealth, trade and marvels. [[2]]Ibn Battuta works as a qadi, a judge of Islamic law, in Delhi and the Maldives, and judges every place by that law. [[3]]Always ask who wrote it.',
      view: { kind: 'cards', title: 'Two travelers, two points of view', cards: [
        { head: 'Marco Polo', text: 'Venetian merchant · served Khubilai Khan · told in a Genoese prison', at: 1 },
        { head: 'Ibn Battuta', text: 'Muslim scholar · qadi (judge) in Delhi and the Maldives', at: 2 },
        { head: 'For the AP exam', text: 'always ask: who wrote it, and what did they notice?', at: 3, dark: true },
      ] },
    },
    {
      ch: 2, say: 'Diplomats and missionaries travel too. [[1]]The pope sends envoys inviting the Mongols to become Christian. The khan replies: submit, or be destroyed. [[2]]In twelve eighty-seven the Mongols of Persia send Rabban Sauma, a Christian monk, to Rome and Paris to propose an alliance against the Muslims. No armies come. [[3]]And the friar John of Montecorvino builds churches in Khanbaliq, the Mongol capital.',
      view: { kind: 'histmap', layout: 'map', step: 2, landsAt: 0, citiesAt: 0, routesAt: [1, 2, 2, 3], tagsAt: 3, side: [{ text: 'Carpini, 1245', at: 1 }, { text: 'Rabban Sauma, 1287', at: 2, strong: true }, { text: 'Sufis spread Islam', at: 3 }] },
    },
    {
      ch: 2, say: 'Ideas and things spread along the same routes. [[1]]Troubadours carry songs between Muslim Spain and France. [[2]]The magnetic compass comes from China. [[3]]Muslims bring sugar to Europe, along with the model of big plantations worked by slaves. [[4]]And gunpowder spreads west with Muslims and Mongols, reaching Europe by the mid twelve hundreds.',
      view: { kind: 'cards', title: 'What else traveled?', cards: [
        { head: 'Ideas', text: 'troubadours’ songs · Muslim and Jewish scholars', at: 1 },
        { head: 'Compass', text: 'from China, for safer sailing', at: 2 },
        { head: 'Sugar', text: 'and the slave-plantation model', at: 3 },
        { head: 'Gunpowder', text: 'reaches Europe by the mid-1200s', at: 4, dark: true },
      ] },
    },
    {
      ch: 3, say: 'Around thirteen hundred the climate cools, and famine spreads. Then comes the bubonic plague, carried by fleas on rats. [[1]]It moves west along Mongol trade routes and hits the Black Sea port of Caffa in thirteen forty-six. [[2]]Italian ships carry it through the Mediterranean in thirteen forty-seven, and it sweeps western Europe in thirteen forty-eight.',
      view: { kind: 'histmap', layout: 'map', step: 3, landsAt: 0, citiesAt: 0, routesAt: [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], tagsAt: 2, side: [{ text: 'Little Ice Age → famine', at: 0 }, { text: 'Caffa, 1346', at: 1, strong: true }, { text: 'Western Europe, 1348', at: 2 }] },
    },
    {
      ch: 3, say: 'About sixty to seventy percent of the infected die, often within days. Europe loses a third or more of its people. Now follow the chain. [[1]]So many die that workers are scarce. [[2]]Survivors demand higher wages and move to find better terms. [[3]]Governments try to freeze wages, like England’s Statute of Labourers. [[4]]Angry peasants and workers riot and revolt.',
      view: { kind: 'chain', title: 'Effects of the Black Death', items: [
        { text: 'A third or more of Europe dies', at: 0 }, { text: 'Massive labor shortage', at: 1 }, { text: 'Workers demand higher wages and move', at: 2 },
        { text: 'Governments freeze wages (1351)', at: 3 }, { text: 'Riots and peasant revolts', at: 4 },
      ] },
    },
    {
      ch: 4, say: 'In China, plague and rebellion bring down the Mongols. In thirteen sixty-eight, a poor orphan raised by Buddhist monks founds the Ming dynasty as Emperor Hongwu. [[1]]He restores Confucian schools and rules directly. [[2]]The Ming govern through mandarins and rely on eunuchs, who cannot found rival families. [[3]]Emperor Yongle orders a giant encyclopedia of about twenty-three thousand rolls.',
      view: { kind: 'cards', title: 'The Ming dynasty, 1368–1644', cards: [
        { head: 'Hongwu', text: 'expels the Mongols · Confucian schools · direct rule', at: 1 },
        { head: 'Mandarins', text: 'officials, plus eunuchs who cannot found rival families', at: 2 },
        { head: 'Yongle', text: 'encyclopedia of about 23,000 rolls · revives Chinese culture', at: 3, dark: true },
      ] },
    },
    {
      ch: 4, say: 'Yongle also sends Admiral Zheng He on seven huge voyages, from fourteen oh five to fourteen thirty-three. [[1]]Fleets of up to three hundred ships reach Malacca, Calicut and Hormuz, [[2]]and even Malindi in East Africa. They collect tribute and show off Ming power. [[3]]Then the voyages stop. They are costly, and the Mongols threaten the north again.',
      view: { kind: 'histmap', layout: 'map', step: 4, landsAt: 0, citiesAt: 0, routesAt: [1, 2, 2], tagsAt: 3, side: [{ text: '7 voyages, 1405–33', at: 0, strong: true }, { text: 'Up to 300 ships', at: 1 }, { text: 'Ended: cost and the Mongol threat', at: 3 }] },
    },
    {
      ch: 5, say: 'Europe recovers differently: as many competing states, not one empire. [[1]]Rulers invent new taxes and build standing armies. [[2]]In fourteen sixty-nine Fernando of Aragon marries Isabel of Castile, uniting Spain. [[3]]And the Renaissance revives classical learning, from Leonardo’s art to the humanist Erasmus.',
      view: { kind: 'cards', title: 'Europe rebuilds', cards: [
        { head: 'New taxes', text: 'pay for large standing armies', at: 1 },
        { head: 'Spain, 1469', text: 'Fernando and Isabel unite Aragon and Castile', at: 2 },
        { head: 'Renaissance', text: 'perspective · anatomy · humanists like Erasmus', at: 3, dark: true },
      ] },
    },
    {
      ch: 5, say: 'Portugal leads Europe into the Atlantic. [[1]]In fourteen fifteen it seizes Ceuta, and Prince Henry the Navigator starts sponsoring voyages. [[2]]The Portuguese settle Madeira and the Azores and plant sugar, and they trade along Africa’s coast for gold and slaves. [[3]]In fourteen eighty-eight Bartolomeu Dias rounds the Cape of Good Hope.',
      view: { kind: 'histmap', layout: 'map', step: 5, landsAt: 2, citiesAt: 0, routesAt: [3, 2, 2], tagsAt: 2, side: [{ text: 'Ceuta, 1415', at: 1, strong: true }, { text: 'Sugar · gold · slaves', at: 2 }, { text: 'Dias, 1488', at: 3 }] },
    },
    {
      ch: 5, say: 'Then the oceans open. [[1]]In fourteen ninety-two Columbus sails west for Spain and lands in the Caribbean, sure he is near Asia. [[2]]In fourteen ninety-eight Vasco da Gama reaches Calicut in India, looking for Christians and spices, [[3]]the same port Zheng He’s fleets had visited about seventy years before.',
      view: { kind: 'histmap', layout: 'map', step: 6, landsAt: 3, citiesAt: 0, routesAt: [1, 2, 3, 3], side: [{ text: 'Columbus, 1492', at: 1 }, { text: 'da Gama, 1498', at: 2, strong: true }, { text: 'Avoid Muslim middlemen', at: 3 }] },
    },
    {
      ch: 6, say: 'Exam tip: AP loves to compare Zheng He with the Portuguese. [[1]]Zheng He had hundreds of ships; da Gama had four. [[2]]China sailed for prestige and tribute; Portugal sailed for profit and converts. [[3]]China stopped after fourteen thirty-three. Portugal kept coming back, with cannons, and built an empire.',
      view: { kind: 'table', title: 'Zheng He vs. the Portuguese', rows: [
        { left: 'Ships', right: 'up to 300 ships vs. four small ships', at: 1 },
        { left: 'Goals', right: 'prestige and tribute vs. profit and converts', at: 2 },
        { left: 'Methods', right: 'gifts vs. trade backed by cannons', at: 2 },
        { left: 'Result', right: 'voyages end vs. a lasting empire', at: 3 },
      ] },
    },
    {
      ch: 7, say: 'Your turn! Explain one economic effect of the Black Death in Europe. Use a specific example.',
      countdown: 12,
      view: { kind: 'try', text: 'Explain ONE economic effect of the Black Death in Europe.', hint: ['Name the effect', 'Explain how', 'Give an example'] },
    },
    {
      ch: 7, say: 'Here is a strong answer. [[1]]The plague killed about a third of Europe’s people, so there were far fewer workers. [[2]]Surviving peasants and servants demanded higher wages. [[3]]England tried to freeze wages with the Statute of Labourers in thirteen fifty-one, and anger over such limits fed the Peasants’ Revolt of thirteen eighty-one.',
      view: { kind: 'chain', title: 'A full-credit answer', items: [{ text: 'About a third of Europe dies', at: 1 }, { text: 'Labor shortage: workers demand higher wages', at: 2 }, { text: 'Wage freeze (1351) → Peasants’ Revolt (1381)', at: 3 }] },
    },
    {
      ch: 8, say: 'The whole chapter on one line. [[1]]Marco Polo sets out, twelve seventy-one. [[2]]Ibn Battuta leaves Tangier, thirteen twenty-five. [[3]]Plague reaches Europe, thirteen forty-seven. [[4]]The Ming dynasty, thirteen sixty-eight. [[5]]Zheng He’s first voyage, fourteen oh five. [[6]]Dias, fourteen eighty-eight. [[7]]And da Gama reaches India, fourteen ninety-eight.',
      view: { kind: 'timeline', range: [1250, 1520], ticks: [1250, 1300, 1350, 1400, 1450, 1500], events: [
        { year: 1271, date: '1271', label: 'Marco Polo', at: 1, color: '#B5482A' }, { year: 1325, date: '1325', label: 'Ibn Battuta', at: 2, color: '#4E7A55' },
        { year: 1347, date: '1347', label: 'Black Death', at: 3, color: '#7A3B22' }, { year: 1368, date: '1368', label: 'Ming', at: 4, color: '#2F4A7A' },
        { year: 1405, date: '1405', label: 'Zheng He', at: 5, color: '#2E6E9A' }, { year: 1488, date: '1488', label: 'Dias', at: 6, color: '#B5482A' },
        { year: 1498, date: '1498', label: 'da Gama', at: 7, color: '#B5482A' },
      ] },
    },
    {
      ch: 8, say: 'Recap. [[1]]The Silk Roads, the Indian Ocean and the Sahara linked Afro-Eurasia, safest under the Mongols. [[2]]Merchants, missionaries and travelers carried goods, crops, technology and faith. [[3]]The same routes spread the Black Death, causing labor shortages and revolts. [[4]]Ming China sailed and stopped; Europe’s competing states sailed and kept going. Now try the practice questions on the site!',
      view: { kind: 'recap', items: [
        { text: 'Three networks: Silk Roads, Indian Ocean, Sahara.', at: 1 },
        { text: 'Travelers spread goods, crops, technology and faith.', at: 2 },
        { text: 'Black Death → labor shortage → revolts.', at: 3 },
        { text: 'Zheng He stopped; Portugal kept sailing.', at: 4 },
      ] },
    },
  ],
}
