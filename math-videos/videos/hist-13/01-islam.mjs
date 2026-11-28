// History · Chapter 13 video: The Expansive Realm of Islam. Follows the class chapter notes
// (Bentley & Ziegler, Traditions & Encounters 5e, ch. 13). Maps come from the history site (src/geo).
export default {
  id: '01-islam',
  tag: 'WORLD HISTORY · CHAPTER 13 · THE REALM OF ISLAM',
  chapters: ['Muhammad', 'Pillars', 'Caliphs', 'Umayyads', 'Abbasids', 'Trade & ideas', 'Exam tip', 'Your turn', 'Recap'],
  layouts: { map: { type: 'histmap', chapter: 13 } },
  scenes: [
    {
      ch: 0, say: 'How did a faith born in a desert trading town become a civilization stretching from Spain to India in about a century? Let’s find out.',
      view: { kind: 'title', kicker: 'CHAPTER 13 · 570 – 1258 CE', title: 'The realm of Islam:', em: 'Mecca to Baghdad', sub: 'The Expansive Realm of Islam' },
    },
    {
      ch: 0, say: 'Around six hundred C E, Arabia is a land of desert herders and caravan towns. [[1]]Around it sit two great empires, the Byzantines and Sasanian Persia, worn out by wars with each other. [[2]]Caravans carry incense and spices north through Mecca and Medina.',
      view: { kind: 'histmap', layout: 'map', step: 0, landsAt: 1, routesAt: [2], tagsAt: 2, citiesAt: 0, side: [{ text: 'Arabia, c. 600', at: 0, strong: true }, { text: 'Byzantines vs Persians', at: 1 }, { text: 'Mecca: a trading town', at: 2 }] },
    },
    {
      ch: 0, say: '[[1]]Muhammad is born in Mecca around five seventy, orphaned young, and becomes a merchant. [[2]]Around six ten he reports visions of the angel Gabriel bringing the words of Allah, the one God. [[3]]Those revelations become the Quran. [[4]]But Mecca’s rich families hate his message: it attacks their idols, their pilgrim business, and their greed.',
      view: { kind: 'cards', title: 'Muhammad’s message', cards: [
        { head: 'c. 570', text: 'born in Mecca · orphan · merchant', at: 1 },
        { head: 'c. 610', text: 'visions: Gabriel · one God, Allah', at: 2 },
        { head: 'Quran', text: 'written down c. 650 · hadith = his sayings', at: 3 },
        { head: 'Conflict', text: 'threat to idols, pilgrims and the rich', at: 4, dark: true },
      ] },
    },
    {
      ch: 0, say: '[[1]]In six twenty-two Muhammad and his followers flee to Medina. This hijra is year one of the Muslim calendar. There he builds the umma, a community bound by faith instead of tribe. [[2]]In six thirty they take Mecca, and by his death in six thirty-two most of Arabia is Muslim.',
      view: { kind: 'histmap', layout: 'map', step: 1, landsAt: 2, citiesAt: 0, routesAt: [1, 2], side: [{ text: 'Hijra, 622', at: 1, strong: true }, { text: 'Umma: faith, not tribe', at: 1 }, { text: 'Arabia united by 632', at: 2 }] },
    },
    {
      ch: 1, say: 'Every Muslim shares five duties, the Five Pillars. [[1]]The shahadah: there is no god but Allah, and Muhammad is his prophet. [[2]]Prayer five times a day. [[3]]Fasting in the month of Ramadan. [[4]]Charity, about two and a half percent of your wealth. [[5]]And the hajj, a pilgrimage to Mecca.',
      view: { kind: 'table', title: 'The Five Pillars', rows: [
        { left: 'Shahadah', right: 'no god but Allah; Muhammad is his prophet', at: 1 },
        { left: 'Salat', right: 'daily prayer, facing Mecca', at: 2 },
        { left: 'Sawm', right: 'fasting during Ramadan', at: 3 },
        { left: 'Zakat', right: 'charity, about 2.5% of wealth', at: 4 },
        { left: 'Hajj', right: 'pilgrimage to Mecca', at: 5 },
      ] },
    },
    {
      ch: 2, say: 'Muhammad names no clear successor, so the community chooses a caliph, Abu Bakr. [[1]]Then Arab armies burst out of Arabia. They beat the Byzantines at Yarmuk in six thirty-six and take Syria and Egypt. [[2]]By six fifty-one the Persian empire is gone.',
      view: { kind: 'histmap', layout: 'map', step: 2, landsAt: 1, citiesAt: 1, routesAt: [1, 2], side: [{ text: 'Caliph = successor', at: 0, strong: true }, { text: 'Yarmuk, 636', at: 1 }, { text: 'Sasanians gone by 651', at: 2 }] },
    },
    {
      ch: 2, say: 'But who should lead? [[1]]Some say it should have been Ali, Muhammad’s cousin and son-in-law. Ali becomes caliph in six fifty-six, but he is assassinated in six sixty-one. [[2]]His followers become the Shia. In six eighty his son Husayn is killed at Karbala. [[3]]The majority, who accept the caliphs as chosen, become the Sunni.',
      view: { kind: 'cards', title: 'The Sunni–Shia split', cards: [
        { head: 'The question', text: 'who should succeed Muhammad?', at: 0 },
        { head: 'Ali', text: 'caliph 656 · assassinated 661', at: 1 },
        { head: 'Shia', text: '“party of Ali” · Karbala, 680', at: 2 },
        { head: 'Sunni', text: 'the majority · followers of the sunna', at: 3, dark: true },
      ] },
    },
    {
      ch: 3, say: 'In six sixty-one the Umayyad family takes over and rules from Damascus. [[1]]Their armies cross into Spain in seven eleven, and are stopped in France near Tours in seven thirty-two. [[2]]In the east they reach the Indus River. It is the largest empire the world has yet seen.',
      view: { kind: 'histmap', layout: 'map', step: 3, landsAt: 0, citiesAt: 0, routesAt: [1, 2], side: [{ text: 'Umayyads, 661–750', at: 0, strong: true }, { text: 'Spain, 711 · Tours, 732', at: 1 }, { text: 'Spain to the Indus', at: 2 }] },
    },
    {
      ch: 3, say: 'Why did the Umayyads fall? [[1]]They favor an Arab military elite. [[2]]Jews and Christians, the People of the Book, keep their faith but pay a head tax, the jizya. [[3]]Non-Arab converts, the mawali, are still treated as second-class. [[4]]And the court’s luxury hurts its moral authority. [[5]]In seven fifty, rebels from Persia overthrow them.',
      view: { kind: 'chain', title: 'Why the Umayyads fell', items: [
        { text: 'Arab military elite rules', at: 1 }, { text: 'Dhimmis pay the jizya', at: 2 }, { text: 'Mawali kept second-class', at: 3 },
        { text: 'Luxury weakens moral authority', at: 4 }, { text: 'Abbasid revolt, 750', at: 5 },
      ] },
    },
    {
      ch: 4, say: '[[1]]The new Abbasid dynasty moves the capital east, to Baghdad, founded in seven sixty-two. [[2]]In seven fifty-one their army beats a Tang Chinese army at the Talas River, and papermaking soon spreads west. [[3]]Under Harun al-Rashid, Baghdad is one of the largest cities on Earth.',
      view: { kind: 'histmap', layout: 'map', step: 4, landsAt: 1, citiesAt: 1, routesAt: [2], tagsAt: 3, side: [{ text: 'Baghdad, 762', at: 1, strong: true }, { text: 'Talas, 751', at: 2 }, { text: 'Peak: Harun al-Rashid', at: 3 }] },
    },
    {
      ch: 4, say: 'The Abbasids rule a mixed empire, not an Arab one. [[1]]Persians hold high office, and a chief minister, the vizier, runs a Persian-style bureaucracy. [[2]]Scholars, the ulama, and judges, the qadis, base law on the Quran and the sharia. [[3]]And in the House of Wisdom, scholars translate Greek, Persian and Indian books into Arabic.',
      view: { kind: 'cards', title: 'How the Abbasids ruled', cards: [
        { head: 'Persian style', text: 'non-Arabs in office · the vizier', at: 1 },
        { head: 'Ulama & qadis', text: 'law based on the Quran and sharia', at: 2 },
        { head: 'House of Wisdom', text: 'Greek, Persian, Indian books → Arabic', at: 3, dark: true },
      ] },
    },
    {
      ch: 4, say: 'After Harun, the empire slowly comes apart. [[1]]His sons fight a civil war, and governors start ruling on their own. [[2]]Rival caliphs rise in Cairo and in Córdoba. [[3]]In nine forty-five Persian nobles, the Buyids, control the caliph. [[4]]In ten fifty-five the Seljuk Turks take Baghdad, and their sultan holds the real power.',
      view: { kind: 'chain', title: 'Abbasid decline', items: [
        { text: 'Civil war of Harun’s sons', at: 1 }, { text: 'Rival caliphs: Cairo, Córdoba', at: 2 },
        { text: 'Persian Buyids, 945', at: 3 }, { text: 'Seljuk sultans, 1055', at: 4 },
      ] },
    },
    {
      ch: 4, say: '[[1]]Then, in twelve fifty-eight, the Mongols under Hulagu, a grandson of Chinggis Khan, sack Baghdad and kill the last Abbasid caliph. [[2]]Islam survives, but the age of one caliph ruling Dar al-Islam is over.',
      view: { kind: 'histmap', layout: 'map', step: 7, landsAt: 0, citiesAt: 0, routesAt: [1], side: [{ text: '1258: Baghdad sacked', at: 1, strong: true }, { text: 'Mamluks, Delhi survive', at: 2 }] },
    },
    {
      ch: 5, say: 'Through all this, Dar al-Islam is a giant trading zone. [[1]]Camel caravans cross the Silk Roads and the Sahara, and ships ride the monsoon winds to India, China and East Africa. [[2]]Sugar, cotton, rice and citrus spread west; paper comes from China; numerals come from India. [[3]]Merchants use a letter of credit, the sakk, which gives us the word check.',
      view: { kind: 'histmap', layout: 'map', step: 5, landsAt: 0, citiesAt: 0, routesAt: [1], tagsAt: 2, side: [{ text: 'Caravans + ships', at: 1 }, { text: 'Crops, paper, numerals', at: 2 }, { text: 'Sakk → “check”', at: 3, strong: true }] },
    },
    {
      ch: 5, say: '[[1]]The Quran bans killing baby girls and gives the dowry to the bride, but men still dominate the family. [[2]]Sufi mystics, like al-Ghazali, seek God through devotion and win many converts. [[3]]Persia gives Islam its style of government; India gives numerals with a zero. [[4]]And Greece gives Aristotle, whom Ibn Rushd of Córdoba passes on to Europe.',
      view: { kind: 'cards', title: 'Society and learning', cards: [
        { head: 'Women', text: 'infanticide banned · bride’s dowry · still patriarchal', at: 1 },
        { head: 'Sufis', text: 'mystics · al-Ghazali · missionaries', at: 2 },
        { head: 'Persia · India', text: 'government · numerals with zero', at: 3 },
        { head: 'Greece', text: 'Aristotle · Ibn Rushd', at: 4, dark: true },
      ] },
    },
    {
      ch: 6, say: 'Exam tip: AP loves to compare the Umayyads and the Abbasids. [[1]]Umayyads ruled from Damascus; Abbasids from Baghdad. [[2]]Umayyads relied on an Arab elite; Abbasids opened power to Persians and other non-Arabs. [[3]]Umayyads conquered; Abbasids mostly administered. [[4]]But both kept the caliphate, the sharia and the jizya.',
      view: { kind: 'table', title: 'Umayyads vs Abbasids', rows: [
        { left: 'Capital', right: 'Damascus → Baghdad', at: 1 },
        { left: 'Elite', right: 'Arab aristocracy → Persians and other non-Arabs', at: 2 },
        { left: 'Style', right: 'conquest → administration', at: 3 },
        { left: 'Same', right: 'caliphate · sharia · jizya on dhimmis', at: 4 },
      ] },
    },
    {
      ch: 7, say: 'Your turn! Explain one reason the Abbasids replaced the Umayyads in seven fifty. Use a specific example.',
      countdown: 12,
      view: { kind: 'try', text: 'Explain ONE reason the Abbasids replaced the Umayyads in 750.', hint: ['Name it', 'Explain how', 'Give an example'] },
    },
    {
      ch: 7, say: 'Here is a strong answer. [[1]]The Umayyads favored Arabs, so non-Arab converts, the mawali, got lower pay and few high posts. [[2]]Angry mawali and Shia in Persia backed Abu al-Abbas. [[3]]His army crushed the Umayyads in seven fifty.',
      view: { kind: 'chain', title: 'A full-credit answer', items: [{ text: 'Umayyads favor Arabs; mawali kept second-class', at: 1 }, { text: 'Mawali and Shia back Abu al-Abbas', at: 2 }, { text: 'Umayyads crushed, 750', at: 3 }] },
    },
    {
      ch: 8, say: 'The whole chapter on one line. [[1]]The hijra, six twenty-two. [[2]]Muhammad dies, six thirty-two. [[3]]The Umayyads, six sixty-one. [[4]]The Abbasids, seven fifty. [[5]]Baghdad founded, seven sixty-two. [[6]]The Seljuk Turks, ten fifty-five. [[7]]And the Mongols sack Baghdad, twelve fifty-eight.',
      view: { kind: 'timeline', range: [580, 1300], ticks: [600, 700, 800, 900, 1000, 1100, 1200, 1300], events: [
        { year: 622, date: '622', label: 'Hijra', at: 1, color: '#4E7A55' }, { year: 632, date: '632', label: 'Muhammad dies', at: 2, color: '#4E7A55' },
        { year: 661, date: '661', label: 'Umayyads', at: 3, color: '#2F4A7A' }, { year: 750, date: '750', label: 'Abbasids', at: 4, color: '#2F4A7A' },
        { year: 762, date: '762', label: 'Baghdad', at: 5, color: '#C99A3D' }, { year: 1055, date: '1055', label: 'Seljuks', at: 6, color: '#B5482A' },
        { year: 1258, date: '1258', label: 'Mongols', at: 7, color: '#B5482A' },
      ] },
    },
    {
      ch: 8, say: 'Recap. [[1]]Muhammad’s one-God message and the Five Pillars united Arabia by six thirty-two. [[2]]The caliphs conquered two empires, but the fight over leadership split Sunni and Shia. [[3]]The Arab Umayyads gave way to the Persian-style Abbasids in Baghdad, who lost power to Turks and then the Mongols. [[4]]And trade and learning tied Dar al-Islam to the whole hemisphere. Now try the practice questions on the site!',
      view: { kind: 'recap', items: [
        { text: 'One God, the Quran, the Five Pillars: Arabia united by 632.', at: 1 },
        { text: 'Caliphs conquer; succession splits Sunni and Shia.', at: 2 },
        { text: 'Umayyads (Damascus) → Abbasids (Baghdad) → Turks → Mongols, 1258.', at: 3 },
        { text: 'Dar al-Islam: trade, crops, paper, numerals, learning.', at: 4 },
      ] },
    },
  ],
}
