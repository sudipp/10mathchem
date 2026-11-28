// History · Chapter 17 video: Nomadic Empires and Eurasian Integration. Follows the class chapter notes
// (Bentley & Ziegler, Traditions & Encounters 5e, ch. 17). Maps come from the history site (src/geo).
export default {
  id: '01-mongols',
  tag: 'WORLD HISTORY · CHAPTER 17 · NOMADIC EMPIRES',
  chapters: ['Steppe', 'Turks', 'Chinggis', 'Khanates', 'Exchange', 'Decline', 'Exam tip', 'Your turn', 'Recap'],
  layouts: { map: { type: 'histmap', chapter: 17 } },
  scenes: [
    {
      ch: 0, say: 'How did about a million herders on horseback build the largest land empire in history, and tie all of Eurasia together? Let’s find out.',
      view: { kind: 'title', kicker: 'CHAPTER 17 · c. 1000 – 1450 CE', title: 'Nomadic empires:', em: 'the Turks and the Mongols', sub: 'Nomadic Empires and Eurasian Integration' },
    },
    {
      ch: 0, say: 'Start with the land. [[1]]A belt of grassland, the steppe, runs from Hungary all the way to Manchuria. It is too dry for big farms, so people herd sheep, horses and camels, moving with the seasons. [[2]]They live in felt tents called yurts, and trade horses and hides for grain, tea and silk from the farmers to the south.',
      view: { kind: 'histmap', layout: 'map', step: 0, landsAt: 1, tagsAt: 2, citiesAt: 2, routesAt: [2], side: [{ text: 'Too dry for big farms', at: 0, strong: true }, { text: 'Herding · seasonal migration', at: 1 }, { text: 'Trade with settled peoples', at: 2 }] },
    },
    {
      ch: 0, say: 'Nomad society is built on clans. [[1]]A strong leader can unite many clans under a khan. [[2]]Nobles inherit their rank, but can lose it if they fail, and talented commoners can rise. [[3]]Women advise khans and sometimes rule. [[4]]And since everyone rides and shoots from childhood, nomads have the best cavalry in the world.',
      view: { kind: 'cards', title: 'Nomadic society', cards: [
        { head: 'Clans → khan', text: 'confederations led by a khan and tribal elders', at: 1 },
        { head: 'Fluid nobility', text: 'rank can be lost by failure or earned by merit', at: 2 },
        { head: 'Women', text: 'advisors, sometimes regents or rulers', at: 3 },
        { head: 'Cavalry', text: 'speed and mobility: the nomads’ great weapon', at: 4, dark: true },
      ] },
    },
    {
      ch: 1, say: 'Before the Mongols came the Turks. Turkish soldiers served the Abbasid caliphs, then took them over. [[1]]In ten fifty-five, the Seljuk leader Tughril Beg takes Baghdad and becomes sultan. [[2]]In ten seventy-one, the Seljuks crush Byzantium at Manzikert and pour into Anatolia. [[3]]Further east, Mahmud of Ghazni raids India, and in twelve oh six Turkish generals found the Sultanate of Delhi.',
      view: { kind: 'histmap', layout: 'map', step: 1, landsAt: 0, citiesAt: 0, routesAt: [1, 2, 2, 3], side: [{ text: 'Soldiers become rulers', at: 0, strong: true }, { text: 'Baghdad 1055 · Manzikert 1071', at: 2 }, { text: 'Delhi Sultanate, 1206', at: 3 }] },
    },
    {
      ch: 2, say: 'Now the Mongols. A boy named Temüjin loses his father to poison and grows up poor. [[1]]By twelve oh six he has united every Mongol tribe, and they proclaim him Chinggis Khan, universal ruler. [[2]]He takes Beijing in twelve fifteen. [[3]]Then, after the Khwarazm Shah murders his envoys, he wipes out the shah’s empire in Central Asia and Persia.',
      view: { kind: 'histmap', layout: 'map', step: 2, landsAt: 1, citiesAt: 1, routesAt: [2, 3, 3], tagsAt: 0, side: [{ text: '1206: Chinggis Khan', at: 1, strong: true }, { text: 'Zhongdu (Beijing), 1215', at: 2 }, { text: 'Khwarazm destroyed, 1219–21', at: 3 }] },
    },
    {
      ch: 2, say: 'How could about one million Mongols beat empires many times their size? [[1]]First, fast cavalry with short, powerful bows. [[2]]Second, organization: Chinggis mixed men from different tribes into units of ten, a hundred and a thousand, and promoted for merit and loyalty. [[3]]Third, terror: cities that surrendered were spared; cities that fought were destroyed.',
      view: { kind: 'cards', title: 'Why the Mongols won', cards: [
        { head: 'Cavalry & bows', text: 'speed, mobility, archery from the saddle', at: 1 },
        { head: 'Organization', text: 'mixed-tribe units of 10, 100, 1,000; merit and loyalty', at: 2 },
        { head: 'Terror', text: 'surrender = mercy · resistance = destruction', at: 3, dark: true },
      ] },
    },
    {
      ch: 3, say: 'Chinggis dies in twelve twenty-seven, but his grandsons keep going. [[1]]Batu conquers Russia. [[2]]Hülegü sacks Baghdad in twelve fifty-eight and ends the Abbasid caliphate. [[3]]But in twelve sixty, Egypt’s Mamluks stop the Mongols at Ain Jalut. [[4]]Khubilai Khan conquers southern China by twelve seventy-nine. [[5]]Only Japan escapes: typhoons, the kamikaze, wreck two Mongol fleets.',
      view: { kind: 'histmap', layout: 'map', step: 3, landsAt: 0, citiesAt: 1, routesAt: [1, 2, 3, 4, 5], tagsAt: 5, side: [{ text: 'Largest land empire ever', at: 0, strong: true }, { text: 'Baghdad sacked, 1258', at: 2 }, { text: 'Stopped: Ain Jalut · Japan', at: 5 }] },
    },
    {
      ch: 3, say: 'The empire is too big for one ruler, so it splits into four khanates, each ruled by Chinggis’s descendants. [[1]]The Yuan dynasty in China. [[2]]The Chagatai Khanate in Central Asia. [[3]]The Ilkhanate in Persia. [[4]]And the Golden Horde on the Russian steppe.',
      view: { kind: 'cards', title: 'Four khanates, c. 1300', cards: [
        { head: 'Yuan', text: 'China · capital Khanbaliq (Beijing)', at: 1 },
        { head: 'Chagatai', text: 'Central Asia · a lasting threat to China', at: 2 },
        { head: 'Ilkhanate', text: 'Persia and Iraq · capital Tabriz', at: 3 },
        { head: 'Golden Horde', text: 'Russian steppe · capital Sarai', at: 4, dark: true },
      ] },
    },
    {
      ch: 4, say: 'With one family ruling from Korea to the Black Sea, travel becomes safer than ever. This is the Pax Mongolica, the Mongol peace. [[1]]Caravans cross the Silk Roads and the steppe, and ships sail the Indian Ocean. [[2]]Merchants, envoys and missionaries make the whole trip: Marco Polo, the friar William of Rubruck, and later Ibn Battuta.',
      view: { kind: 'histmap', layout: 'map', step: 5, landsAt: 0, citiesAt: 0, routesAt: [1, 1, 1, 1], tagsAt: 2, side: [{ text: 'Pax Mongolica', at: 0, strong: true }, { text: 'Silk Roads · steppe · sea lanes', at: 1 }, { text: 'Travelers cross Eurasia', at: 2 }] },
    },
    {
      ch: 4, say: 'Here is how the Mongol peace moved ideas. [[1]]The Mongols protect roads, with relay stations and travel passes. [[2]]Trade and travel grow. [[3]]The Mongols also move artisans, engineers and scholars wherever they are useful. [[4]]So gunpowder, printing and paper money move west, [[5]]while Persian astronomy and medicine move east to China.',
      view: { kind: 'chain', title: 'How the Pax Mongolica moved ideas', items: [
        { text: 'Protected roads, relay stations, passes', at: 1 }, { text: 'More merchants, envoys, missionaries', at: 2 }, { text: 'Artisans and experts resettled', at: 3 },
        { text: 'Gunpowder, printing, paper money → west', at: 4 }, { text: 'Astronomy, medicine → east', at: 5 },
      ] },
    },
    {
      ch: 5, say: 'But the same roads carry germs. [[1]]Bubonic plague breaks out in China in the thirteen thirties and travels west along Mongol trade routes to the Black Sea port of Caffa. [[2]]In thirteen forty-seven, Italian ships carry it into the Mediterranean. [[3]]Meanwhile the Ilkhanate collapses in thirteen thirty-five, and in thirteen sixty-eight a peasant rebellion drives the Mongols out of China and founds the Ming dynasty.',
      view: { kind: 'histmap', layout: 'map', step: 6, landsAt: 3, citiesAt: 0, routesAt: [1, 2, 2], tagsAt: 3, side: [{ text: 'Plague follows trade', at: 1, strong: true }, { text: 'Caffa 1346 · Europe 1347', at: 2 }, { text: 'Ilkhanate ends 1335 · Ming 1368', at: 3 }] },
    },
    {
      ch: 5, say: 'Why did the khanates fall so fast? [[1]]They overspent and overtaxed their peasants. [[2]]In China, the Yuan spent the gold and silver behind their paper money, so the paper lost value and prices soared. [[3]]Rival factions fought over the throne. [[4]]And plague killed huge numbers of people.',
      view: { kind: 'chain', title: 'Why the khanates declined', items: [
        { text: 'Overspending and heavy taxes', at: 1 }, { text: 'Paper money collapses', at: 2 }, { text: 'Factions fight for the throne', at: 3 }, { text: 'Plague · rebellion · collapse', at: 4 },
      ] },
    },
    {
      ch: 5, say: 'After the Mongols, a Turkish conqueror takes their place. [[1]]Timur, called Tamerlane, unites the nomads of Chagatai and builds an empire from his capital, Samarkand. [[2]]He sacks Delhi and Baghdad, and in fourteen oh two he crushes the Ottomans at Ankara. [[3]]But his empire splits after he dies in fourteen oh five, while the Ottomans recover and take Constantinople in fourteen fifty-three.',
      view: { kind: 'histmap', layout: 'map', step: 7, landsAt: 1, citiesAt: 1, routesAt: [2, 2, 2, 2], tagsAt: 3, side: [{ text: 'Timur: last great nomad conqueror', at: 1, strong: true }, { text: 'Delhi 1398 · Ankara 1402', at: 2 }, { text: 'Ottomans take Constantinople, 1453', at: 3 }] },
    },
    {
      ch: 6, say: 'Exam tip: AP loves to compare Mongol rule in different places. [[1]]In China, the Mongols kept apart from the Chinese and used foreign officials. [[2]]In Persia, they used the Persian bureaucracy and converted to Islam. [[3]]In Russia, they ruled indirectly through tribute. [[4]]In all three, nomads with no experience of ruling farmers relied on local or foreign experts.',
      view: { kind: 'table', title: 'Mongol rule compared', rows: [
        { left: 'China (Yuan)', right: 'separation · foreign officials · religious tolerance', at: 1 },
        { left: 'Persia (Ilkhanate)', right: 'Persian bureaucrats · assimilate · Islam, 1295', at: 2 },
        { left: 'Russia (Golden Horde)', right: 'indirect rule · princes pay tribute', at: 3 },
        { left: 'All three', right: 'rely on local or foreign experts to collect taxes', at: 4 },
      ] },
    },
    {
      ch: 7, say: 'Your turn! Explain one way the Pax Mongolica led to the transfer of technology or ideas across Eurasia. Use a specific example.',
      countdown: 12,
      view: { kind: 'try', text: 'Explain ONE way the Pax Mongolica led to the transfer of technology or ideas across Eurasia.', hint: ['Name the cause', 'Explain how', 'Give an example'] },
    },
    {
      ch: 7, say: 'Here is a strong answer. [[1]]The Mongols protected the caravan routes and gave travelers passes. [[2]]So merchants and experts could cross Eurasia safely, and the Mongols even moved skilled people on purpose. [[3]]For example, Chinese gunpowder and printing reached Persia and Europe, while Persian astronomers worked in Khubilai Khan’s China.',
      view: { kind: 'chain', title: 'A full-credit answer', items: [{ text: 'Mongols protect routes and issue passes', at: 1 }, { text: 'Merchants and experts travel safely', at: 2 }, { text: 'Gunpowder west · astronomy east', at: 3 }] },
    },
    {
      ch: 8, say: 'The whole chapter on one line. [[1]]Seljuks take Baghdad, ten fifty-five. [[2]]Chinggis Khan, twelve oh six. [[3]]The Mongols sack Baghdad, twelve fifty-eight. [[4]]Song China falls, twelve seventy-nine. [[5]]Plague reaches Caffa, thirteen forty-six. [[6]]The Ming expel the Mongols, thirteen sixty-eight. [[7]]Constantinople falls, fourteen fifty-three.',
      view: { kind: 'timeline', range: [1030, 1500], ticks: [1050, 1100, 1150, 1200, 1250, 1300, 1350, 1400, 1450], events: [
        { year: 1055, date: '1055', label: 'Seljuks in Baghdad', at: 1, color: '#6E5A8F' }, { year: 1206, date: '1206', label: 'Chinggis Khan', at: 2, color: '#B5482A' },
        { year: 1258, date: '1258', label: 'Baghdad sacked', at: 3, color: '#B5482A' }, { year: 1279, date: '1279', label: 'Song falls', at: 4, color: '#C99A3D' },
        { year: 1346, date: '1346', label: 'Plague at Caffa', at: 5, color: '#24303F' }, { year: 1368, date: '1368', label: 'Ming', at: 6, color: '#C99A3D' },
        { year: 1453, date: '1453', label: 'Fall of Constantinople', at: 7, color: '#2E6E9A' },
      ] },
    },
    {
      ch: 8, say: 'Recap. [[1]]The steppe made nomads mobile and deadly on horseback. [[2]]Turks became rulers from Anatolia to India. [[3]]Chinggis Khan’s heirs built the largest land empire ever, then split it into four khanates. [[4]]The Pax Mongolica moved goods, ideas and plague, until the khanates collapsed. Now try the practice questions!',
      view: { kind: 'recap', items: [
        { text: 'Steppe nomads: herding, clans, khans, cavalry.', at: 1 },
        { text: 'Turks rule from Anatolia to India: Seljuks, Delhi, Ottomans.', at: 2 },
        { text: 'Chinggis Khan (1206) → four khanates.', at: 3 },
        { text: 'Pax Mongolica: trade, ideas, plague → decline by 1368.', at: 4 },
      ] },
    },
  ],
}
