// History · Chapter 12 video: Cross-Cultural Exchanges on the Silk Roads. Follows the class chapter notes
// (Bentley & Ziegler, Traditions & Encounters 5e, ch. 12). Maps come from the history site (src/geo).
export default {
  id: '01-silk-roads',
  tag: 'WORLD HISTORY · CHAPTER 12 · THE SILK ROADS',
  chapters: ['Empires', 'Silk Roads', 'Sea lanes', 'Faiths', 'Disease', 'Collapse', 'Exam tip', 'Your turn', 'Recap'],
  layouts: { map: { type: 'histmap', chapter: 12 } },
  scenes: [
    {
      ch: 0, say: 'What traveled along the Silk Roads besides silk? Religions, ideas, and deadly germs. And why did the two greatest empires of the age, Han China and Rome, both fall apart? Let’s find out.',
      view: { kind: 'title', kicker: 'CHAPTER 12 · c. 200 BCE – 600 CE', title: 'The Silk Roads:', em: 'goods, gods and germs', sub: 'Cross-Cultural Exchanges on the Silk Roads' },
    },
    {
      ch: 0, say: 'Around one hundred C E, something new happens. [[1]]Four big, stable empires stretch across Eurasia: Rome, Parthia in Iran, the Kushans in Central Asia and northern India, and Han China. [[2]]For the first time, a chain of strong states links the Mediterranean to the Pacific.',
      view: { kind: 'histmap', layout: 'map', step: 0, landsAt: 1, citiesAt: 2, side: [{ text: 'Four empires, c. 100 CE', at: 0, strong: true }, { text: 'Rome · Parthia · Kushan · Han', at: 1 }, { text: 'A chain across Eurasia', at: 2 }] },
    },
    {
      ch: 0, say: 'Why does that matter? Before empires, long trips were dangerous. [[1]]Empires keep order. [[2]]They maintain roads and bridges. [[3]]They collect tariffs, taxes on trade, and spend them keeping routes open. [[4]]And sailors learn to ride the monsoon winds.',
      view: { kind: 'cards', title: 'Why trade grew', cards: [
        { head: 'Order', text: 'empires protect travelers from bandits', at: 1 },
        { head: 'Infrastructure', text: 'roads, bridges, ports', at: 2 },
        { head: 'Tariffs', text: 'trade taxes pay to keep routes open', at: 3 },
        { head: 'Monsoon', text: 'seasonal winds make sea trade regular', at: 4, dark: true },
      ] },
    },
    {
      ch: 1, say: 'In one thirty-eight B C E, the Han send the envoy Zhang Qian west, and caravans soon follow. [[1]]Routes run from Chang’an through desert oasis towns, over the mountains to Samarkand and Merv, and through Parthia to Syria. [[2]]Silk goes west. Horses, jade, glass and gold go east, and India adds cotton, pepper and gems.',
      view: { kind: 'histmap', layout: 'map', step: 1, landsAt: 0, citiesAt: 1, routesAt: [1], tagsAt: 2, side: [{ text: 'Zhang Qian, 138 BCE', at: 0, strong: true }, { text: 'Oasis towns', at: 1 }, { text: 'Silk west · gold east', at: 2 }] },
    },
    {
      ch: 1, say: 'Key idea: trade moves in stages. [[1]]Silk leaves Chang’an with a Chinese merchant. [[2]]Central Asian traders buy it in the oasis towns. [[3]]Parthian middlemen buy it next, keeping Romans and Chinese apart. [[4]]At every stop the price rises, and Rome pays in gold and silver.',
      view: { kind: 'chain', title: 'Trade in stages', items: [
        { text: 'Silk leaves Chang’an', at: 1 }, { text: 'Sold again in the oasis towns', at: 2 }, { text: 'Parthian middlemen', at: 3 }, { text: 'Rome pays in gold and silver', at: 4 },
      ] },
    },
    {
      ch: 2, say: 'Ships carry far more than camels. [[1]]The monsoon blows from the southwest in summer, carrying ships from Egypt and Arabia to India, and from the northeast in winter, bringing them home. [[2]]Roman ships sail from Red Sea ports to Muziris for pepper. [[3]]Malay and Indian sailors carry goods on through the Strait of Malacca to China.',
      view: { kind: 'histmap', layout: 'map', step: 2, landsAt: 0, citiesAt: 0, routesAt: [1, 1, 1, 1, 3, 3, 3], tagsAt: 2, side: [{ text: 'Monsoon winds', at: 1, strong: true }, { text: 'Rome → India for pepper', at: 2 }, { text: 'Malay & Indian mariners', at: 3 }] },
    },
    {
      ch: 2, say: 'Indian merchants settle in Southeast Asia, and their culture travels with them. [[1]]By the first century C E, local rulers call themselves rajas. [[2]]They write in Sanskrit. [[3]]And Hinduism and Buddhism become popular faiths, in kingdoms like Funan on the Mekong delta.',
      view: { kind: 'cards', title: 'India’s influence by sea', cards: [
        { head: 'Rajas', text: 'Southeast Asian kings take Indian titles', at: 1 },
        { head: 'Sanskrit', text: 'used for writing and records', at: 2 },
        { head: 'New faiths', text: 'Hinduism and Buddhism spread to Funan', at: 3, dark: true },
      ] },
    },
    {
      ch: 3, say: 'Merchants carry religions too. [[1]]Buddhism travels from India through the oasis towns to China, where monasteries shelter traveling merchants. [[2]]In China it is at first a faith of foreign merchants, and spreads widely only after four hundred C E. [[3]]By sea, Buddhism and Hinduism reach Sri Lanka and Southeast Asia.',
      view: { kind: 'histmap', layout: 'map', step: 3, landsAt: 0, citiesAt: 0, routesAt: [1, 3, 3], tagsAt: 1, side: [{ text: 'India → Central Asia → China', at: 1, strong: true }, { text: 'Wide spread in China after 400 CE', at: 2 }, { text: 'By sea to Southeast Asia', at: 3 }] },
    },
    {
      ch: 3, say: 'From Southwest Asia, two more universal faiths travel. [[1]]Christianity spreads around the Mediterranean, and east into Persia and even India. In Persia, most Christians later follow Nestorius. [[2]]And a new faith, Manichaeism, spreads both west into Roman cities and east along the Silk Roads.',
      view: { kind: 'histmap', layout: 'map', step: 4, landsAt: 0, citiesAt: 0, routesAt: [1, 1, 1, 1, 1, 1, 2, 2, 2], tagsAt: 2, side: [{ text: 'Christianity: Rome to India', at: 1, strong: true }, { text: 'Manichaeism: west and east', at: 2 }] },
    },
    {
      ch: 3, say: 'Mani, a prophet from Mesopotamia born in two sixteen C E, founds Manichaeism. [[1]]It is dualist: good against evil, light against darkness, spirit against matter. [[2]]The elect fast and pray; the hearers support them. [[3]]But Zoroastrian priests turn the Persian king against Mani, who dies in prison, and Rome persecutes his followers too.',
      view: { kind: 'cards', title: 'Manichaeism', cards: [
        { head: 'Dualism', text: 'good vs evil · light vs dark · spirit vs matter', at: 1 },
        { head: 'Elect & hearers', text: 'ascetic elect; lay hearers support them', at: 2 },
        { head: 'Persecuted', text: 'Mani dies in a Sasanid prison', at: 3, dark: true },
      ] },
    },
    {
      ch: 4, say: 'The same routes carry germs. [[1]]Smallpox and measles strike people with no immunity; the Antonine Plague, from one sixty-five C E, kills millions of Romans. [[2]]Rome and China each lose about a quarter of their people, trade shrinks, and regions learn to live on what they produce.',
      view: { kind: 'histmap', layout: 'map', step: 5, landsAt: 0, citiesAt: 0, routesAt: [1, 1, 1, 1, 1], tagsAt: 2, side: [{ text: 'Germs travel the trade routes', at: 1, strong: true }, { text: 'About ¼ of people die', at: 2 }, { text: 'Regional self-sufficiency', at: 2 }] },
    },
    {
      ch: 5, say: 'Now the collapse, starting with China. [[1]]Court intrigue weakens the emperors. [[2]]Landowners build private armies. [[3]]Epidemics strike. [[4]]In one eighty-four C E the Yellow Turbans rebel. [[5]]Generals crush them and take power. In two twenty C E the Han dynasty ends, and China splits into three kingdoms.',
      view: { kind: 'chain', title: 'Why the Han fell', items: [
        { text: 'Court intrigue', at: 1 }, { text: 'Landowners with private armies', at: 2 }, { text: 'Epidemics', at: 3 },
        { text: 'Yellow Turbans, 184 CE', at: 4 }, { text: 'Generals rule · Han ends, 220 CE', at: 5 },
      ] },
    },
    {
      ch: 5, say: 'Rome faces the same storm. After decades of civil war, Diocletian splits the empire in two to manage it. [[1]]In three seventy-six, Visigoths fleeing the Huns cross the Danube; in four ten they sack Rome. [[2]]Vandals take Spain and Africa, and Attila’s Huns raid Gaul. [[3]]In four seventy-six, the general Odoacer removes the last western emperor. The east survives.',
      view: { kind: 'histmap', layout: 'map', step: 7, landsAt: 0, citiesAt: 0, routesAt: [1, 2, 1, 2, 2], tagsAt: 3, side: [{ text: 'Huns push the Goths, 376', at: 1 }, { text: 'Rome sacked, 410', at: 1 }, { text: 'Western empire ends, 476', at: 3, strong: true }] },
    },
    {
      ch: 5, say:       'Meanwhile, Rome turns Christian. [[1]]Constantine’s Edict of Milan, in three thirteen, lets Christians worship freely. [[2]]In three eighty, Theodosius makes Christianity the official religion. [[3]]Augustine, once a Manichaean, becomes its greatest thinker. And in China, Buddhism and Daoism grow as faith in Confucian order fades.',
      view: { kind: 'cards', title: 'Faith in hard times', cards: [
              { head: 'Edict of Milan', text: '313: Constantine allows Christian worship', at: 1 },
              { head: 'Theodosius', text: '380: Christianity becomes official', at: 2 },
        { head: 'Augustine', text: 'ex-Manichaean, great theologian', at: 3 },
        { head: 'In China', text: 'Buddhism and Daoism gain followers', at: 3, dark: true },
      ] },
    },
    {
      ch: 6, say: 'Exam tip: AP loves to compare these two collapses. [[1]]Both empires had weak rulers, powerful landowners and epidemics. [[2]]Both faced nomads or migrants on their frontiers. [[3]]But in China the nomads became Chinese, and the Sui reunified China in five eighty-nine. The western empire was never rebuilt.',
      view: { kind: 'table', title: 'Fall of Han vs fall of western Rome', rows: [
        { left: 'Same', right: 'weak rulers · landowners · epidemics', at: 1 },
        { left: 'Same', right: 'nomads and migrants on the frontier', at: 2 },
        { left: 'Han', right: 'nomads sinicized · China reunified, 589', at: 3 },
        { left: 'Rome', right: 'Germanic kingdoms · east survives', at: 3 },
      ] },
    },
    {
      ch: 7, say: 'Your turn! Explain one way trade networks helped a religion spread between two hundred B C E and six hundred C E. Use a specific example.',
      countdown: 12,
      view: { kind: 'try', text: 'Explain ONE way trade networks helped a religion spread, c. 200 BCE – 600 CE.', hint: ['Name the religion', 'Name the route', 'Explain how'] },
    },
    {
      ch: 7, say: 'Here is a strong answer. [[1]]Buddhism spread from India along the Silk Roads. [[2]]Oasis towns like Dunhuang built monasteries that also sheltered traveling merchants. [[3]]Merchants and monks, like the pilgrim Faxian, carried the faith and its texts to China.',
      view: { kind: 'chain', title: 'A full-credit answer', items: [{ text: 'Buddhism travels the Silk Roads', at: 1 }, { text: 'Monasteries shelter merchants', at: 2 }, { text: 'Merchants and monks carry it to China', at: 3 }] },
    },
    {
      ch: 8, say: 'The whole chapter on one line. [[1]]Silk Roads open, around one thirty B C E. [[2]]Buddhism reaches China, sixty-five C E. [[3]]Antonine Plague, one sixty-five. [[4]]Han ends, two twenty. [[5]]Edict of Milan, three thirteen. [[6]]Rome sacked, four ten. [[7]]Western empire ends, four seventy-six.',
      view: { kind: 'timeline', range: [-200, 520], ticks: [-200, -100, 0, 100, 200, 300, 400, 500], events: [
        { year: -130, date: 'c. 130 BCE', label: 'Silk Roads', at: 1, color: '#7A3B22' }, { year: 65, date: '65 CE', label: 'Buddhism in China', at: 2, color: '#C99A3D' },
        { year: 165, date: '165 CE', label: 'Antonine Plague', at: 3, color: '#B5482A' }, { year: 220, date: '220 CE', label: 'Han ends', at: 4, color: '#2F4A7A' },
        { year: 313, date: '313 CE', label: 'Edict of Milan', at: 5, color: '#4E7A55' }, { year: 410, date: '410 CE', label: 'Rome sacked', at: 6, color: '#B5482A' },
        { year: 476, date: '476 CE', label: 'West falls', at: 7, color: '#2F4A7A' },
      ] },
    },
    {
      ch: 8, say: 'Recap. [[1]]Strong empires made long-distance trade safe, by land and by sea. [[2]]Trade moved in stages, along the Silk Roads and the monsoon sea lanes. [[3]]Buddhism, Christianity and Manichaeism traveled with the merchants. [[4]]And epidemics, decay and invasions brought down Han China and western Rome. Now try the practice questions on the site!',
      view: { kind: 'recap', items: [
        { text: 'Rome, Parthia, Kushan, Han: empires make trade safe.', at: 1 },
        { text: 'Silk Roads and monsoon sea lanes; trade in stages.', at: 2 },
        { text: 'Buddhism, Christianity, Manichaeism spread with merchants.', at: 3 },
        { text: 'Disease, decay, invasion: Han ends 220, western Rome 476.', at: 4 },
      ] },
    },
  ],
}
