// Chapter 17 · Nomadic Empires and Eurasian Integration (Bentley & Ziegler, Traditions & Encounters, 5th ed.).
// Built from the class chapter notes. Explanations are original; quoted sources are public-domain translations.

// Title, era and big question live in ./index.js; the map is in ../maps/ch17.js.
export default {
  hook: 'In 1206 a man who had once been a hunted, half-starving outcast was proclaimed Chinggis Khan, “universal ruler” of the Mongols. There were only about a million Mongols, yet within 75 years his family ruled from Korea to Russia and from Siberia to the Persian Gulf: the largest land empire in history. Cities that resisted were wiped out. But inside that empire merchants, monks and ideas crossed Eurasia faster than ever before, and so did the plague.',
  apNote: 'This chapter sits right inside the AP exam period (c. 1200–present). It covers AP Unit 2.2, “The Mongol Empire and the Making of the Modern World,” plus the Turkic empires of Unit 1.2 (the Seljuks, the Delhi Sultanate and the early Ottomans). These topics are heavily tested: Mongol conquest and rule, the four khanates, the Pax Mongolica, the transfer of technology and ideas, the spread of the plague and the decline of the khanates.',
  themes: ['Governance', 'Economic systems', 'Cultural developments', 'Technology and innovation', 'Social structures'],
  // Outside video for step 1: [YouTube id, title, creator]
  video: ['szxPar0BcMo', 'Wait For It...The Mongols!: Crash Course World History #17', 'CrashCourse'],
  mapSub: 'Press Play all, or step through. Watch nomads burst out of the steppe, build one empire from Korea to Russia, split it into four khanates, and then lose it.',
  // Timeline zoom buttons; the first is the default view.
  zooms: [
    { label: 'Whole chapter', from: 950, to: 1460 },
    { label: 'Turks & Chinggis', from: 950, to: 1230 },
    { label: 'Mongol Empire', from: 1200, to: 1300 },
    { label: 'Decline & Timur', from: 1290, to: 1460 },
    { label: 'Long view', from: 500, to: 1550 },
  ],
  bigIdeas: [
    'Life on the dry steppe made nomads mobile, clan-based and superb cavalry fighters who both traded and fought with their settled neighbors.',
    'Turkish nomads entered the Islamic world as soldiers and became its rulers: the Seljuks took Baghdad (1055) and Anatolia (after 1071), and Turkish generals founded the Delhi Sultanate (1206).',
    'Chinggis Khan and his heirs built the largest land empire in history through organization, mobility and terror, then split it into four khanates that ruled settled peoples in different ways.',
    'The Pax Mongolica linked Eurasia, moving goods, people, technologies, ideas and the plague; by 1368 the khanates in Persia and China had collapsed, and Turkish conquerors (Timur, the Ottomans) took over.',
  ],

  sections: [
    {
      id: 'steppe', title: 'Nomads of the steppe', when: 'c. 500 – 1200 CE', theme: 'Social structures', map: 0,
      lead: 'Central Asia is too dry for large-scale farming, so its peoples lived by herding. Moving with their animals, Turkic and Mongol nomads built societies that were mobile, clan-based and very good at war.',
      body: [
        'The steppe is a vast grassland stretching from Hungary to Manchuria. With too little rain for big farms, people herded sheep, goats, horses, camels and yaks. The animals gave them almost everything: meat and milk for food, wool and skins for clothing, and felt for round tents called yurts.',
        'Herders moved with the seasons to find fresh pasture, so they built few towns. They did some small-scale farming and simple crafts, but they needed grain, tea, cloth and metal goods from settled peoples. Trade (and raiding) linked the steppe to China, Persia and the Islamic world, and nomads guided many of the caravans on the Silk Roads.',
        'Society was organized by clans, groups of related families. A charismatic leader could gather many clans into a confederation under a khan, whose orders were carried out by tribal elders. Noble status was usually inherited, but a noble who failed could lose his followers, and a talented commoner could rise. Women had real influence: they ran camps and herds, advised khans, and sometimes ruled as regents.',
        'Most nomads followed shamans, holy men believed to contact the spirit world. From the 500s CE many also adopted Buddhism, Nestorian Christianity or Manichaeism, and the Turks developed a written script, partly to record religious teachings. In the 900s, under Abbasid influence, many Turks converted to Islam.',
      ],
      facts: ['Herding: food, clothing, yurts', 'Clans unite under a khan', 'Noble rank could be lost or earned', 'Turks convert to Islam in the 900s'],
      chain: ['Too dry for big farms', 'Herding and seasonal migration', 'Riding and archery from childhood', 'Clans unite under a khan', 'Fast, powerful cavalry'],
      soWhat: 'The skills that kept herds alive (riding, archery, moving fast) made nomads the most feared soldiers in Eurasia. AP questions often ask how environment shaped nomadic societies and their relations with settled states.',
    },
    {
      id: 'turks', title: 'Turkish empires: Seljuks and the Delhi Sultanate', when: '1000 – 1250 CE', theme: 'Governance', map: 1,
      lead: 'Before the Mongols, Turkish nomads built empires across the Islamic world. They came first as hired soldiers and stayed as rulers.',
      body: [
        'From the 700s to the 900s, Turkish peoples lived on the edge of the Abbasid caliphate. Many served in Abbasid armies as slave soldiers or mercenaries, and over time Turkish generals came to dominate the caliphs they served.',
        'In 1055 the Seljuk leader Tughril Beg took Baghdad, and the caliph recognized him as sultan (“holder of power”). The Seljuks extended their rule over much of the empire, while the Abbasid caliphs stayed on only as religious figureheads.',
        'In 1071 the Seljuks crushed a Byzantine army at Manzikert and captured the emperor, Romanos IV. Turkish herders poured into Anatolia, and over the next centuries much of its Greek Christian population converted to Islam. Byzantium’s call for help led to the First Crusade (1096). Much later, another Turkish people, the Ottomans, would conquer Constantinople itself (1453).',
        'Further east, Mahmud of Ghazni (in Afghanistan) raided northern India about 17 times after 1001, first for plunder, later to rule. Later Turkish generals pushed further, and in 1206 they founded the Sultanate of Delhi, which dominated northern India in the 1200s. These Muslim rulers destroyed many temples and persecuted Buddhists and Hindus, but most Indians remained Hindu.',
      ],
      facts: ['Turks serve, then control, the Abbasids', '1055: Tughril Beg becomes sultan in Baghdad', '1071: Manzikert opens Anatolia', '1206: Sultanate of Delhi founded'],
      chain: ['Turkish soldiers serve the Abbasids', 'Generals dominate the caliphs', 'Seljuks take Baghdad, 1055', 'Victory at Manzikert, 1071', 'Anatolia becomes Turkish and Muslim'],
      soWhat: 'AP Unit 1.2 asks how Turkic peoples built new states inside Dar al-Islam: the Seljuks, the Delhi Sultanate and later the Ottomans. They kept Islamic institutions (the caliph, sharia, Persian bureaucrats) and ruled through them.',
      video: ['O9P1TaBnhg8', 'Developments in DAR-AL-ISLAM [AP World Review—Unit 1 Topic 2]', 'Heimler\'s History'],
    },
    {
      id: 'chinggis', title: 'Chinggis Khan builds an empire', when: '1167 – 1227', theme: 'Governance', map: 2,
      lead: 'A poor, fatherless boy named Temüjin united the feuding Mongol tribes and, as Chinggis Khan, launched the conquests that created the largest land empire in history.',
      body: [
        'Temüjin was born around 1167. When he was about ten, enemies poisoned his father, a prominent warrior, and the family fell into poverty. Temüjin survived by mastering steppe politics: making alliances, rewarding loyal followers and eliminating rivals.',
        'By 1206 he had brought all the Mongol tribes into one confederation, and an assembly of Mongol leaders proclaimed him Chinggis Khan, “universal ruler.” To end tribal feuds he broke up the old tribes and formed army units of 10, 100, 1,000 and 10,000 men drawn from different tribes. He promoted officers for merit and loyalty, not birth, and made Karakorum his base.',
        'There were only about one million Mongols, less than one percent of China’s population, and the army numbered 100,000 to 125,000. But its cavalry was fast, its riders shot short, powerful bows from the saddle, and it used terror on purpose: cities that surrendered were spared and rewarded; cities that resisted were destroyed.',
        'Chinggis attacked northern China first and took the Jin capital, Zhongdu (Beijing), in 1215. In 1218 the Khwarazm Shah, who ruled Persia and Central Asia, had a Mongol trade caravan massacred at Otrar and then killed Chinggis’s envoys. In 1219 Chinggis invaded, destroyed the shah’s empire and ravaged cities such as Bukhara, Samarkand, Merv and Nishapur so they could never rebel. The damage to Persia’s irrigation and population lasted for generations. Chinggis died in 1227.',
      ],
      facts: ['1206: proclaimed Chinggis Khan', 'Army units mix men from different tribes', '≈1 million Mongols; 100,000–125,000 soldiers', 'Surrender = mercy; resistance = destruction'],
      chain: ['Father poisoned; family poor', 'Temüjin builds alliances, eliminates rivals', 'Mongol tribes united, 1206', 'Merit-based, mixed-tribe army', 'Conquests in China and Persia'],
      soWhat: 'Chinggis turned a loose nomadic confederation into a disciplined state. AP asks you to explain how such a small people conquered so much: organization, mobility, terror and the use of experts from conquered lands.',
      video: ['PiIJFRqrQYk', 'Genghis Khan and the Mongol Empire', 'Khan Academy'],
      factCheck: 'Your notes say China was conquered by 1220. By then the Mongols held much of northern China (Zhongdu, now Beijing, fell in 1215), but the Jin state survived until 1234 and the Southern Song until 1279. Also, Chinggis used Karakorum as a base from about 1220, but the walled city itself was built by his son Ögedei in 1235.',
    },
    {
      id: 'khanates', title: 'Conquering Eurasia: the four khanates', when: '1227 – 1294', theme: 'Governance', map: 3,
      lead: 'Chinggis’s sons and grandsons kept conquering. By 1279 the Mongols ruled from Korea to Russia and from Siberia to the Persian Gulf, but the empire had split into four khanates.',
      body: [
        'Chinggis’s grandson Batu led armies into Russia from 1237 to 1241, sacking Kiev and many other cities, then raided Poland, Hungary and the edge of Germany. His state, the Golden Horde, ruled the steppe from its capital at Sarai and made the Russian princes pay tribute into the 1400s. (Its successor, the Crimean Khanate, lasted until 1783.)',
        'Another grandson, Hülegü, toppled the Abbasid caliphate. In 1258 his armies sacked Baghdad, killed the last caliph and massacred perhaps 200,000 people. His Ilkhanate ruled Persia and Iraq. But in 1260 Egypt’s Mamluk army defeated a Mongol force at Ain Jalut in Palestine, stopping Mongol expansion into Syria and Egypt.',
        'A third grandson, Khubilai Khan, ruled China (1260–1294). He finished conquering the Southern Song in 1279 and founded the Yuan dynasty, with its capital at Khanbaliq (Beijing). He was a ruthless warrior but tolerant in religion, and he hosted the Venetian Marco Polo. The fourth khanate, the Chagatai Khanate, held Central Asia.',
        'Khubilai’s forays into Vietnam, Cambodia, Burma and Java failed, as heat, disease and stubborn resistance blunted the Mongol cavalry. Two huge invasions of Japan, in 1274 and 1281, were wrecked by typhoons that the Japanese called kamikaze, “divine winds.”',
      ],
      facts: ['Golden Horde: Russia conquered 1237–1241', 'Ilkhanate: Baghdad sacked 1258', 'Ain Jalut, 1260: Mamluks stop the Mongols', 'Yuan: Japan invasions fail, 1274 & 1281'],
      chain: ['Chinggis’s heirs keep conquering', 'Russia, Persia and all of China fall', 'Too big for one ruler', 'Four khanates', 'Limits: Mamluks, Japan, Southeast Asia'],
      soWhat: 'Knowing the four khanates (Yuan, Chagatai, Ilkhanate, Golden Horde) and where each ruled is basic AP knowledge. The sack of Baghdad ended the Abbasid caliphate, a turning point for the Islamic world (Chapter 13).',
      video: ['KHJLZBXUyzo', 'The MONGOL Empire, Explained [AP World History Review—Unit 2 Topic 2]', 'Heimler\'s History'],
      factCheck: 'Your notes date Khubilai’s reign 1264–1294. He was proclaimed Great Khan in 1260 and won the civil war against his brother Ariq Böke in 1264, so most books give 1260–1294.',
    },
    {
      id: 'rule', title: 'Ruling settled societies', when: '1250 – 1350', theme: 'Governance', map: 4,
      lead: 'Conquering was easier than ruling. Nomads with no experience of governing farmers and cities ruled differently in each khanate, and most lost control within about a century.',
      body: [
        'In Persia, the Ilkhans depended on the existing Persian bureaucracy to collect taxes and left everyday government to it. Persian officials such as the historian and minister Rashid al-Din rose to high office. Over time the Mongols there assimilated into Islamic society; the ilkhan Ghazan converted to Islam in 1295.',
        'In China, the Yuan kept strictly apart from the Chinese. Intermarriage was forbidden, Chinese were not allowed to study the Mongol language, and the Confucian civil-service exams were suspended for decades. The Mongols imported administrators from other lands, especially Muslims from Persia and Central Asia, and ranked people with Mongols at the top and southern Chinese at the bottom. Yet they allowed religious freedom.',
        'In Russia, the Golden Horde did not govern directly. Russian princes kept their lands but paid tribute and needed the khan’s approval to rule. The princes of Moscow grew powerful by collecting that tribute for the Mongols.',
        'Shamanism stayed popular, but many Mongols were drawn to Lamaist (Tibetan) Buddhism. Its rituals and magic resembled shamanism, and its lamas flattered the khans by calling them incarnations of the Buddha.',
      ],
      facts: ['Persia: Persian bureaucrats collect taxes', 'Ilkhan Ghazan becomes Muslim, 1295', 'China: Mongols keep apart from Chinese', 'Russia: princes pay tribute'],
      chain: ['Nomads conquer settled lands', 'They need taxes from farmers', 'They rely on local or foreign officials', 'Persia: assimilation · China: separation', 'Rule fades within a century'],
      soWhat: 'A favorite AP comparison: the Mongols adopted Persian ways but kept apart from the Chinese. The Golden Horde’s indirect rule helped Moscow rise as the future center of Russia.',
    },
    {
      id: 'exchange', title: 'Pax Mongolica: Eurasia connected', when: '1250 – 1350', theme: 'Cultural developments', map: 5,
      lead: 'Mongol rulers had long experience with trade, and they protected it. For about a century merchants, diplomats and missionaries crossed Eurasia more safely than ever before.',
      body: [
        'The Mongols guarded caravan routes, built relay stations for their postal riders (the yam) and issued metal passes (paiza) that guaranteed safe travel. The volume of trade across Central Asia rose sharply. Merchants also sailed the Indian Ocean between Yuan ports such as Quanzhou and the Persian Gulf.',
        'Diplomats traveled under Mongol protection. The friars John of Plano Carpini (1245–1247) and William of Rubruck (1253–1255) reached the Mongol court; the Venetian Marco Polo served Khubilai Khan for about 17 years; and the Nestorian monk Rabban Sauma traveled from China to Rome and Paris (1287–1288). Christian, Muslim and Buddhist missionaries spread their faiths.',
        'The Mongols also moved people on purpose. They resettled artisans, engineers and scholars wherever they were useful: Chinese engineers and doctors went to Persia, while Persian and Arab administrators and astronomers went to China.',
        'Technologies and ideas flowed with them. Gunpowder, printing and the idea of paper money moved west from China; Persian astronomy, medicine and Islamic mathematics moved east. Even foods and art styles traveled: Chinese designs shaped Persian painting, and Persian cobalt blue colored Chinese porcelain. But the same routes would also carry the bubonic plague.',
      ],
      facts: ['Protected roads, relay posts, travel passes', 'Travelers: Rubruck, Marco Polo, Rabban Sauma', 'Resettlement of artisans and experts', 'Gunpowder & printing west; astronomy & medicine east'],
      chain: ['One family rules most of Eurasia', 'Roads protected, passes issued', 'More merchants, envoys, missionaries', 'Technologies and ideas exchanged', 'Germs travel too'],
      soWhat: 'Pax Mongolica (“Mongol peace”) is a key AP term. The Mongols are the classic example of an empire increasing interaction across Eurasia; this leads straight to Ibn Battuta, the plague and the European search for Asian goods (Chapter 21).',
    },
    {
      id: 'decline', title: 'Plague and the fall of the khanates', when: '1290 – 1368', theme: 'Economic systems', map: 6,
      lead: 'Within about a century of their greatest conquests, the Mongol khanates in Persia and China collapsed under bad finances, infighting and plague.',
      body: [
        'In Persia, the ilkhans overspent, and overtaxed peasants produced less and less revenue. In the 1290s an ilkhan tried to replace gold and silver coins with paper money copied from China. Merchants refused it and trade stopped, so he had to cancel it. Factions fought for power, and when the last ilkhan died without an heir in 1335, Mongol rule in Persia collapsed.',
        'In China, the Yuan spent the gold and silver that backed their paper money. People lost confidence in the paper, and prices soared. From the 1320s rival Mongol factions struggled for the throne, while famines and floods hit the countryside.',
        'Then came bubonic plague. It broke out in China in the 1330s and spread along the trade routes the Mongols had opened. In 1346 it struck the Black Sea port of Caffa, and Italian ships carried it into the Mediterranean in 1347. The Black Death killed perhaps a third of Europe’s people and huge numbers in China and the Islamic world.',
        'In 1368 a peasant rebellion led by Zhu Yuanzhang drove the Mongols out of China, and he founded the Ming dynasty. Some khanates survived: the Chagatai Khanate remained a threat to China, and the Golden Horde and its successor khanates threatened Russia until the mid-1500s.',
      ],
      facts: ['Ilkhan’s paper money fails, 1290s', 'Ilkhanate collapses, 1335', 'Yuan paper money loses value', 'Plague reaches Caffa 1346 · Ming founded 1368'],
      chain: ['Overspending and heavy taxes', 'Paper money loses value', 'Factions fight for the throne', 'Plague spreads along trade routes', 'Ilkhanate ends 1335 · Yuan expelled 1368'],
      soWhat: 'AP links the Mongol networks directly to the spread of the Black Death. The decline also shows a pattern: conquerors who could not manage money and succession lost control fast.',
      video: ['tnBQtH7G0hI', 'How did the Black Death affect Africa and Asia? (Short Animated Documentary)', 'History Matters'],
    },
    {
      id: 'timur', title: 'Tamerlane and the rise of the Ottomans', when: '1299 – 1453', theme: 'Governance', map: 7,
      lead: 'After the Mongols, Turkish conquerors took over. Timur built a dazzling but short-lived empire from Samarkand, while the Ottomans built one that would last six centuries.',
      body: [
        'Timur (c. 1336–1405) was a Turkish leader from the Chagatai Khanate. A wound left him lame, so Europeans called him Tamerlane, from “Timur the Lame.” By about 1370 he had united the Turkish nomads of Chagatai and set out to rebuild the Mongol Empire.',
        'His campaigns were famously brutal. He conquered Persia, smashed the Golden Horde (sacking Sarai in 1395), sacked Delhi (1398) and Baghdad (1401), and in 1402 defeated and captured the Ottoman sultan at Ankara. He made Samarkand a splendid capital, filling it with artisans taken from conquered cities. He died in 1405 while marching to invade Ming China.',
        'Timur ruled through personal power, not a solid system of government. After his death his heirs fought, and the empire split into four parts. Even so, his model of rule heavily influenced three later empires: the Mughals in India (founded by his descendant Babur), the Safavids in Persia and the Ottomans.',
        'The Ottomans began with Osman, a charismatic leader in Anatolia who declared independence from the Seljuk sultan in 1299. His followers, the Osmanlis (Ottomans), attacked Byzantium and in the 1350s conquered much of the Balkans, where many peasants welcomed them over weak, divided Byzantine rule. Timur’s victory in 1402 set them back, but they recovered by the 1440s, and in 1453 Sultan Mehmed II (“the Conqueror”) captured Constantinople and renamed it Istanbul.',
      ],
      facts: ['Timur unites Chagatai, c. 1370', 'Sacks Delhi 1398; beats Ottomans 1402', 'Samarkand: capital of captured artisans', '1453: Mehmed II takes Constantinople'],
      chain: ['Mongol khanates weaken', 'Timur unites Turkish nomads', 'Brutal campaigns, rich Samarkand', 'Weak institutions: empire splits after 1405', 'Ottomans recover, take Constantinople, 1453'],
      soWhat: 'Timur was the last great nomadic conqueror; after him, gunpowder empires (Ottomans, Safavids, Mughals, AP Unit 3) took over. The fall of Constantinople ended the Byzantine Empire (Chapter 16).',
      video: ['GYOgWwmwRkc', 'Tamerlane & History of The Timurid Empire', 'Epimetheus'],
    },
  ],

  // Timeline: year < 0 means BCE. end makes a span. track: politics | war | society | religion | world
  timeline: [
    { year: 960, label: 'Turks begin converting to Islam', track: 'religion', detail: 'Approximate. The Karakhanid Turks of Central Asia accept Islam under Abbasid and Persian influence.' },
    { year: 1001, end: 1027, label: 'Mahmud of Ghazni raids India', track: 'war', detail: 'About 17 raids into northern India, first for plunder (Somnath temple, 1025), later to rule.' },
    { year: 1055, label: 'Seljuks take Baghdad', track: 'politics', detail: 'Tughril Beg is recognized as sultan; Abbasid caliphs become figureheads.' },
    { year: 1071, label: 'Battle of Manzikert', track: 'war', detail: 'Seljuks defeat Byzantium and capture Emperor Romanos IV; Turks pour into Anatolia.' },
    { year: 1167, label: 'Temüjin born', track: 'politics', detail: 'Date from your notes; many historians give c. 1162. His father is poisoned about ten years later.' },
    { year: 1206, label: 'Temüjin proclaimed Chinggis Khan', track: 'politics', detail: 'A Mongol assembly names him “universal ruler” of the united tribes.' },
    { year: 1206, end: 1526, label: 'Sultanate of Delhi', track: 'politics', detail: 'Turkish Muslim sultans dominate northern India; they hold off Mongol attacks.' },
    { year: 1215, label: 'Zhongdu (Beijing) falls', track: 'war', detail: 'The Mongols take the capital of the Jin dynasty in northern China.' },
    { year: 1219, end: 1221, label: 'Mongols destroy Khwarazm', track: 'war', detail: 'Revenge for the Otrar massacre: Bukhara, Samarkand, Merv and Nishapur are ravaged.' },
    { year: 1227, label: 'Chinggis Khan dies', track: 'politics', detail: 'His empire runs from northern China to Persia and is divided among his heirs.' },
    { year: 1237, end: 1241, label: 'Mongols conquer Russia', track: 'war', detail: 'Batu sacks Kiev (1240) and raids Poland and Hungary (1241). The Golden Horde is founded.' },
    { year: 1253, end: 1255, label: 'Rubruck travels to Karakorum', track: 'society', detail: 'A Franciscan friar sent by King Louis IX of France visits the court of Möngke Khan.' },
    { year: 1258, label: 'Mongols sack Baghdad', track: 'war', detail: 'Hülegü kills the last Abbasid caliph; perhaps 200,000 die. The Ilkhanate rules Persia.' },
    { year: 1260, label: 'Battle of Ain Jalut', track: 'war', detail: 'Egypt’s Mamluks defeat the Mongols in Palestine and stop their advance.' },
    { year: 1260, end: 1294, label: 'Reign of Khubilai Khan', track: 'politics', detail: 'Proclaimed in 1260 (your notes: 1264, when he beat his brother). Founds the Yuan dynasty in 1271.' },
    { year: 1271, end: 1295, label: 'Marco Polo’s journey', track: 'society', detail: 'The Venetian serves Khubilai for about 17 years and returns by sea.' },
    { year: 1274, end: 1281, label: 'Invasions of Japan fail', track: 'war', detail: 'Typhoons, the “kamikaze” or divine winds, wreck both fleets (1274 and 1281).' },
    { year: 1279, label: 'Song falls; Yuan rules all China', track: 'politics', detail: 'Khubilai completes the conquest of southern China.' },
    { year: 1294, label: 'Ilkhan’s paper money fails', track: 'society', detail: 'Merchants refuse the new paper notes; trade stops and they are withdrawn.' },
    { year: 1295, label: 'Ilkhan Ghazan becomes Muslim', track: 'religion', detail: 'The Mongols of Persia assimilate into Islamic society.' },
    { year: 1299, label: 'Osman declares independence', track: 'politics', detail: 'The founder of the Ottoman state breaks from the Seljuk sultan in Anatolia.' },
    { year: 1335, label: 'Ilkhanate collapses', track: 'politics', detail: 'The last ilkhan dies without an heir.' },
    { year: 1346, end: 1351, label: 'Black Death reaches the West', track: 'society', detail: 'Plague hits Caffa (1346), Sicily and Egypt (1347), and most of Europe by 1351.' },
    { year: 1368, label: 'Ming drives the Mongols out', track: 'politics', detail: 'Zhu Yuanzhang’s peasant rebellion ends the Yuan dynasty.' },
    { year: 1370, end: 1405, label: 'Conquests of Timur', track: 'war', detail: 'From Samarkand: Persia, the Golden Horde (1395), Delhi (1398), Baghdad (1401); at Ankara (1402) he captures the Ottoman sultan Bayezid I.' },
    { year: 1453, label: 'Ottomans take Constantinople', track: 'war', detail: 'Mehmed II renames it Istanbul; the Byzantine Empire ends.' },
    { year: 1096, label: 'First Crusade begins', track: 'world', detail: 'Byzantium asks for help after Manzikert; Latin Christians march east (Chapter 19).' },
    { year: 1324, label: 'Mansa Musa’s hajj', track: 'world', detail: 'The ruler of Mali travels to Mecca with so much gold he lowers its price in Cairo (Chapter 18).' },
    { year: 1325, label: 'Aztecs found Tenochtitlan', track: 'world', detail: 'Across the ocean, a world with no contact with Afro-Eurasia (Chapter 20).' },
    { year: 1405, end: 1433, label: 'Zheng He’s treasure fleets', track: 'world', detail: 'Ming China sends huge fleets across the Indian Ocean (Chapter 21).' },
  ],

  terms: [
    ['Steppe', 'Dry grassland stretching from Hungary to Manchuria.', 'Too dry for big farms, so its people became herders.'],
    ['Yurt', 'Round felt tent that nomads could take down and carry.', 'Shows how herding supplied food, clothing and shelter.'],
    ['Clan', 'Group of related families, the basic unit of nomadic society.', 'Clans united under a khan to form confederations.'],
    ['Khan', 'Ruler of a nomadic confederation.', 'Leaders like Chinggis turned confederations into empires.'],
    ['Shaman', 'Holy man believed to contact the spirit world.', 'Center of traditional nomadic religion.'],
    ['Seljuk Turks', 'Turkish nomads who took Baghdad in 1055 and Anatolia after 1071.', 'Turks became the real rulers of the Islamic heartland.'],
    ['Sultan', '“Holder of power”: title of a Muslim ruler under the caliph.', 'Tughril Beg’s title shows real power moving from the caliph to Turks.'],
    ['Battle of Manzikert', 'Seljuk victory over Byzantium in 1071.', 'Opened Anatolia to Turks and Islam; led to the Crusades.'],
    ['Mahmud of Ghazni', 'Turkish ruler of Afghanistan who raided India after 1001.', 'Began Turkish Muslim rule in northern India.'],
    ['Delhi Sultanate', 'Turkish Muslim state ruling northern India from 1206.', 'Brought Islam to power in India; resisted the Mongols.'],
    ['Chinggis Khan', 'Temüjin (c. 1167–1227), proclaimed “universal ruler” in 1206.', 'United the Mongols and began the conquests.'],
    ['Karakorum', 'Mongol capital in Mongolia.', 'A cosmopolitan city of envoys, merchants and many religions.'],
    ['Khubilai Khan', 'Grandson of Chinggis; ruled China 1260–1294.', 'Conquered the Song, founded the Yuan, hosted Marco Polo.'],
    ['Yuan dynasty', 'Mongol dynasty in China, 1271–1368.', 'Ruled China but kept Mongols apart from the Chinese.'],
    ['Kamikaze', '“Divine winds”: typhoons that wrecked Mongol fleets off Japan.', 'Japan was never conquered (1274, 1281).'],
    ['Golden Horde', 'Mongol khanate on the Russian steppe, capital Sarai.', 'Made Russian princes pay tribute; helped Moscow rise.'],
    ['Ilkhanate', 'Mongol khanate in Persia and Iraq founded by Hülegü.', 'Sacked Baghdad (1258); later converted to Islam.'],
    ['Chagatai Khanate', 'Mongol khanate in Central Asia.', 'Lasted longest of the Central Asian khanates; Timur rose there.'],
    ['Battle of Ain Jalut', 'Mamluk victory over the Mongols in Palestine, 1260.', 'Stopped Mongol expansion into Syria and Egypt.'],
    ['Lamaist Buddhism', 'Tibetan Buddhism, with magic and rituals like shamanism.', 'Popular with Mongols; called khans incarnations of the Buddha.'],
    ['Pax Mongolica', '“Mongol peace”: c. 1250–1350, safe travel across Eurasia.', 'Boosted trade and the exchange of technology and ideas.'],
    ['Marco Polo', 'Venetian merchant who served Khubilai Khan (c. 1275–1292).', 'His book spread European interest in Asia.'],
    ['Resettlement', 'Mongol policy of moving artisans and experts to where they were needed.', 'Spread skills and knowledge across Eurasia.'],
    ['Bubonic plague', 'Disease that spread from Asia along trade routes in the 1330s–1340s.', 'The Black Death killed perhaps a third of Europe.'],
    ['Ming dynasty', 'Chinese dynasty founded in 1368 after expelling the Mongols.', 'Restored native Chinese rule.'],
    ['Timur (Tamerlane)', 'Turkish conqueror from Chagatai (c. 1336–1405).', 'Brutal campaigns from Delhi to Ankara; capital Samarkand.'],
    ['Ottomans', 'Turkish dynasty founded by Osman (1299) in Anatolia.', 'Took Constantinople in 1453; ruled until 1922.'],
    ['Mehmed II', 'Ottoman sultan, “the Conqueror,” who took Constantinople in 1453.', 'Ended the Byzantine Empire; made Istanbul his capital.'],
  ],

  compare: [
    {
      title: 'Mongol rule in China, Persia and Russia',
      head: ['', 'Yuan (China)', 'Ilkhanate (Persia)', 'Golden Horde (Russia)'],
      rows: [
        ['How they ruled', 'Directly, with Mongols on top and foreign (often Muslim) officials', 'Through the existing Persian bureaucracy', 'Indirectly: Russian princes ruled and paid tribute'],
        ['Relations with locals', 'Strict separation; no intermarriage; exams suspended', 'Assimilated; Persian ministers like Rashid al-Din', 'Mongols stayed on the steppe, apart from Russian towns'],
        ['Religion', 'Tolerant; many Mongols adopt Tibetan Buddhism', 'Convert to Islam (Ghazan, 1295)', 'Convert to Islam in the 1300s; tolerate the Orthodox Church'],
        ['How it ended', 'Paper-money collapse, plague; Ming rebellion, 1368', 'Overspending, failed paper money; collapse, 1335', 'Slowly; tribute ends 1480; successor khanates to the 1500s'],
        ['Legacy', 'North and south China reunited; Beijing becomes the capital', 'Persian culture revived; Baghdad’s caliphate gone', 'Moscow rises by collecting tribute'],
      ],
    },
    {
      title: 'Turks vs Mongols as empire builders',
      head: ['', 'Turks (Seljuks, Delhi, Ottomans, Timur)', 'Mongols (Chinggis and heirs)'],
      rows: [
        ['How they gained power', 'Often entered as soldiers inside the Islamic world, then took over', 'Conquered from outside, very fast, 1206–1279'],
        ['Religion', 'Muslims; ruled through Islamic institutions', 'Shamanists, tolerant of all faiths; some later converted'],
        ['Methods', 'Cavalry, slave soldiers, alliance with Muslim scholars', 'Mixed-tribe units, terror, mobility, foreign experts'],
        ['How long it lasted', 'Some states lasted centuries (Delhi to 1526, Ottomans to 1922)', 'Most khanates collapsed within about a century'],
        ['Similarity', 'Both: nomadic cavalry roots, khans and sultans, rule over settled peoples', 'Both: relied on local officials to collect taxes'],
      ],
    },
  ],

  // ---------- practice ----------
  mcq: [
    {
      source: { kind: 'text', title: 'Ibn al-Athir, an Arab Muslim historian in Mosul (Iraq), writing about the Mongol invasion of 1220–1221 in his history of the world, c. 1231', text: 'For some years I continued averse from mentioning this event, deeming it so horrible that I shrank from recording it… I say, therefore, that this thing involves the description of the greatest catastrophe and the most dire calamity… which befell all men generally, and the Muslims in particular… For these were a people who emerged from the confines of China, and attacked the cities of Turkestan, like Kashghar and Balasaghun, and thence advanced on the cities of Transoxiana, such as Samarqand, Bukhara and the like… Moreover they need no commissariat, nor the conveyance of supplies, for they have with them sheep, cows, horses, and the like quadrupeds, the flesh of which they eat, naught else.', cite: 'Ibn al-Athir, The Complete History (al-Kamil fi al-Tarikh), year 617 AH, trans. E. G. Browne, A Literary History of Persia, vol. II (1906)' },
      questions: [
        { q: 'Ibn al-Athir’s point of view in this passage is best explained by the fact that he', options: ['was a Mongol official who wanted to justify the conquest', 'was a Muslim scholar writing as the Mongols devastated the Islamic world', 'was a Christian monk hoping the Mongols would attack Islam', 'had traveled to Karakorum and met the Great Khan'], correct: 1, why: 'Sourcing: he was a Muslim historian in Iraq who saw the invasion as a catastrophe for Muslims, so he stresses horror and destruction.' },
        { q: 'The last sentence of the passage helps explain which Mongol military advantage?', options: ['Superior siege cannons built in Europe', 'Large fleets of warships', 'Mobility, because armies fed themselves from their own herds', 'Alliances with the Abbasid caliph'], correct: 2, why: 'Without supply wagons, Mongol armies could move fast over long distances, living off their animals.' },
        { q: 'Which later event would most likely have confirmed the fears Ibn al-Athir expressed for “the Muslims in particular”?', options: ['The Mongol sack of Baghdad and the end of the Abbasid caliphate in 1258', 'The failed Mongol invasions of Japan', 'The founding of the Ming dynasty in 1368', 'The Seljuk victory at Manzikert in 1071'], correct: 0, why: 'In 1258 Hülegü sacked Baghdad and killed the last Abbasid caliph, a disaster for the Islamic world.' },
      ],
    },
    {
      source: { kind: 'text', title: 'William of Rubruck, a Flemish Franciscan friar sent by King Louis IX of France, describing the Mongol capital, Karakorum, 1254 (“Saracens” = Muslims; “Cathayans” = Chinese; “mahummeries” = mosques)', text: 'Of the city of Caracarum you must know that, exclusive of the palace of the Chan, it is not as big as the village of Saint Denis… There are two quarters in it; one of the Saracens in which are the markets, and where a great many Tartars gather on account of the court, which is always near this (city), and on account of the great number of ambassadors; the other is the quarter of the Cathayans, all of whom are artisans… There are there twelve idol temples of different nations, two mahummeries in which is cried the law of Machomet, and one church of Christians in the extreme end of the city.', cite: 'William of Rubruck, The Journey of William of Rubruck to the Eastern Parts of the World, 1253–55, trans. W. W. Rockhill (1900), p. 221' },
      questions: [
        { q: 'Rubruck’s description best supports which conclusion about the Mongol Empire?', options: ['The Mongols forced all their subjects to convert to shamanism.', 'Mongol rule brought together peoples, merchants and religions from across Eurasia.', 'The Mongol capital was the largest city in the world.', 'The Mongols refused to trade with settled peoples.'], correct: 1, why: 'Muslim merchants, Chinese artisans, many ambassadors, temples, mosques and a church all in one city show a cosmopolitan empire.' },
        { q: 'The presence of a whole quarter of Chinese artisans in Karakorum most likely reflects', options: ['the Mongol policy of resettling skilled workers where they were useful', 'Chinese colonization of Mongolia under the Song dynasty', 'the spread of the bubonic plague', 'the Confucian civil-service examinations'], correct: 0, why: 'The Mongols moved artisans, engineers and scholars across their empire to serve the khans.' },
        { q: 'Rubruck’s background as a Christian missionary would most likely lead him to', options: ['ignore the religions practiced in Karakorum', 'pay close attention to religious buildings and the place of Christians in the city', 'praise the city as larger than Paris', 'describe Mongol military tactics in detail'], correct: 1, why: 'Sourcing: a friar sent partly to spread Christianity would note temples, mosques and the lone church at the city’s edge.' },
      ],
    },
    {
      source: { kind: 'text', title: 'Möngke Khan, the Great Khan of the Mongols, speaking to William of Rubruck at Karakorum, 1254, as recorded by Rubruck (“Moal” = Mongols)', text: '“We Moal,” he said, “believe that there is only one God, by whom we live and by whom we die, and for whom we have an upright heart.”… “But as God gives us the different fingers of the hand, so he gives to men divers ways. God gives you the Scriptures, and you Christians keep them not.”… “God gave you therefore the Scriptures, and you do not keep them; He gave us diviners, we do what they tell us, and we live in peace.”', cite: 'William of Rubruck, The Journey of William of Rubruck to the Eastern Parts of the World, 1253–55, trans. W. W. Rockhill (1900), pp. 235–236' },
      questions: [
        { q: 'Möngke’s comparison of religions to “the different fingers of the hand” best illustrates which Mongol policy?', options: ['Forced conversion to Islam', 'Persecution of Christian missionaries', 'Tolerance of many religions within the empire', 'Making Buddhism the only legal religion'], correct: 2, why: 'He treats different faiths as different paths given by God, the basis of Mongol religious tolerance.' },
        { q: 'This attitude most helped the Mongols to', options: ['rule huge numbers of Muslims, Buddhists and Christians with less resistance', 'defeat the Mamluks at Ain Jalut', 'avoid the spread of the plague', 'end the tribute paid by Russian princes'], correct: 0, why: 'Tolerance let the Mongols use officials, merchants and experts of every faith and reduced religious revolt.' },
        { q: 'Which development in the Ilkhanate shows a change from the religious outlook Möngke describes?', options: ['The sack of Baghdad in 1258', 'Ilkhan Ghazan’s conversion to Islam in 1295', 'The use of Persian bureaucrats', 'The failed paper money of the 1290s'], correct: 1, why: 'Continuity and change: the Mongols in Persia gradually assimilated, and Ghazan made Islam the faith of the ruling house.' },
      ],
    },
    {
      source: { kind: 'text', title: 'Marco Polo, a Venetian merchant who served Khubilai Khan c. 1275–1292, describing the Yuan dynasty’s paper money; dictated in a Genoese prison c. 1298', text: 'And the Kaan causes every year to be made such a vast quantity of this money, which costs him nothing, that it must equal in amount all the treasure in the world. With these pieces of paper, made as I have described, he causes all payments on his own account to be made; and he makes them to pass current universally over all his kingdoms and provinces and territories, and whithersoever his power and sovereignty extends. And nobody, however important he may think himself, dares to refuse them on pain of death. And indeed everybody takes them readily, for wheresoever a person may go throughout the Great Kaan’s dominions he shall find these pieces of paper current, and shall be able to transact all sales and purchases of goods by means of them just as well as if they were coins of pure gold.', cite: 'Marco Polo, The Book of Ser Marco Polo, Book 2, ch. 24, trans. H. Yule, rev. H. Cordier (1903)' },
      questions: [
        { q: 'The passage best illustrates which feature of the Yuan economy?', options: ['A return to barter after the Mongol conquest', 'Government-issued paper money used for trade across the empire', 'A ban on foreign merchants', 'Dependence on silver from the Americas'], correct: 1, why: 'Polo describes state paper money that was accepted everywhere in Khubilai’s lands, which made trade easier.' },
        { q: 'Which later development most directly resulted from the practice Polo describes of printing “such a vast quantity of this money”?', options: ['Inflation and loss of confidence in paper money that weakened the Yuan', 'The conversion of the Ilkhans to Islam', 'The Mongol conquest of Russia', 'The Ottoman capture of Constantinople'], correct: 0, why: 'Overprinting and spending the metal reserves made prices soar and people lost trust in the notes, part of the Yuan collapse in 1368.' },
        { q: 'Historians use Polo’s account with some caution mainly because', options: ['it was written in Chinese, which few Europeans could read', 'it was dictated from memory to a writer of romances while Polo was in prison', 'Polo never claimed to have visited China', 'Khubilai Khan ordered it to be written as propaganda'], correct: 1, why: 'Sourcing: Polo told his story to Rustichello of Pisa in prison years later, and some details are exaggerated or missing.' },
      ],
    },
    {
      source: { kind: 'text', title: 'Ruy González de Clavijo, ambassador of King Henry III of Castile (Spain) to Timur, describing Samarkand, 1404', text: 'The lord had so strong a desire to ennoble this city, that he brought captives to increase its population, from every land which he conquered, especially all those who were skilful in any art. From Damascus he brought weavers of silk, and men who made bows, glass, and earthenware, so that, of those articles, Samarcand produces the best in the world. From Turkey he brought archers, masons, and silversmiths… The city is also very rich in merchandize which comes from other parts. Russia and Tartary send linen and skins; China sends silks, which are the best in the world, (more especially the satins), and musk… From India come spices, such as nutmegs, cloves, mace, cinnamon, ginger, and many others which do not reach Alexandria.', cite: 'Ruy González de Clavijo, Narrative of the Embassy to the Court of Timour at Samarcand, A.D. 1403–6, trans. C. R. Markham (1859), pp. 170–171' },
      questions: [
        { q: 'Timur’s treatment of skilled captives is most similar to which earlier Mongol practice?', options: ['Paying tribute to Russian princes', 'Resettling artisans and experts to serve the rulers', 'Forbidding intermarriage with the Chinese', 'Using kamikaze winds against invaders'], correct: 1, why: 'Like the Mongols, Timur moved skilled workers from conquered lands to his capital.' },
        { q: 'The list of goods arriving in Samarkand best supports which claim about the period after the Mongol khanates declined?', options: ['Long-distance trade across Central Asia stopped completely.', 'Central Asian cities remained hubs of trade linking China, India and the west.', 'China no longer produced silk.', 'Spices reached Samarkand only by way of Alexandria.'], correct: 1, why: 'Continuity: silks, musk, spices, linen and skins still flowed into Samarkand from every direction around 1404.' },
        { q: 'Which statement best describes what happened to Timur’s empire after his death in 1405?', options: ['It conquered Ming China.', 'It lasted unchanged until 1900.', 'His heirs fought and it split apart, though his line later founded the Mughal Empire.', 'It was absorbed by the Golden Horde.'], correct: 2, why: 'Timur’s personal rule left weak institutions; his heirs divided the empire, and his descendant Babur founded the Mughal dynasty.' },
      ],
    },
  ],

  saq: [
    {
      prompt: 'Answer all parts.',
      parts: [
        'Identify ONE way Mongol rule in China differed from Mongol rule in Persia.',
        'Explain ONE way the Pax Mongolica led to the transfer of technology or ideas across Eurasia.',
        'Explain ONE reason the Mongol khanates in Persia or China declined in the 1300s.',
      ],
      guide: [
        'Accept: in China the Mongols kept apart (no intermarriage, exams suspended, foreign officials) while in Persia they used Persian bureaucrats and assimilated; Ilkhans converted to Islam while the Yuan court favored Tibetan Buddhism and tolerated all faiths.',
        'Accept with explanation: protected roads, relay stations and passes let merchants, envoys and missionaries travel; resettlement of artisans and experts; examples: gunpowder, printing, paper money west; Persian astronomy and medicine east.',
        'Accept with explanation: overspending and overtaxed peasants; failed paper money (Persia 1290s) or inflation of Yuan paper money; factional fighting and succession problems; bubonic plague; peasant rebellion (Ming, 1368).',
      ],
      model: [
        'In China the Yuan kept a strict separation from the Chinese and brought in Muslim officials, while in Persia the Ilkhans left government to the existing Persian bureaucracy.',
        'Because the Mongols protected caravan routes and issued travel passes, merchants and experts moved safely across Eurasia. For example, Chinese knowledge of gunpowder and printing reached Persia and Europe, while Persian astronomers worked in Khubilai’s China.',
        'In China the Yuan spent the gold and silver that backed their paper money, so people lost confidence in it and prices soared. Combined with plague and factional fighting, this weakened the dynasty until a peasant rebellion expelled the Mongols in 1368.',
      ],
    },
    {
      prompt: 'Answer all parts.',
      parts: [
        'Identify ONE Turkish group that built a state in the Islamic world between 1000 and 1450.',
        'Explain ONE effect of the Battle of Manzikert (1071).',
        'Explain ONE similarity OR difference between Turkish and Mongol empire builders.',
      ],
      guide: [
        'Accept: Seljuks, Ghaznavids, the Delhi Sultanate, the Ottomans, Timur’s Timurids.',
        'Accept with explanation: Turks settled Anatolia; many Anatolians converted to Islam; Byzantium lost its heartland and asked the west for help, leading to the First Crusade; it prepared the way for the Ottomans.',
        'Similar: both came from nomadic cavalry cultures and relied on local officials to tax settled peoples. Different: Turks often entered as soldiers inside Islamic states and ruled as Muslims through Islamic institutions, while the Mongols conquered from outside as shamanists tolerant of all faiths; several Turkish states lasted much longer.',
      ],
      model: [
        'The Seljuk Turks, whose leader Tughril Beg became sultan in Baghdad in 1055.',
        'After the Seljuks defeated the Byzantines at Manzikert, Turkish herders moved into Anatolia, and over time much of its Christian population converted to Islam, turning the region Turkish and Muslim.',
        'Both Turks and Mongols came from the steppe and used fast cavalry, but the Seljuks entered the Abbasid world as soldiers and ruled as Muslim sultans under the caliph, while the Mongols conquered from outside and destroyed the caliphate in 1258.',
      ],
    },
  ],

  leq: {
    prompt: 'Evaluate the extent to which the Mongol Empire changed patterns of trade and cultural exchange in Eurasia in the period c. 1200 – c. 1450.',
    theses: [
      { text: 'The Mongols built a very large empire across Eurasia.', ok: false, why: 'A fact, not an argument about trade or exchange.' },
      { text: 'The Mongols changed trade in Eurasia.', ok: false, why: 'Too vague: it does not say how or to what extent, or set up a line of reasoning.' },
      { text: 'Although the Silk Roads and Indian Ocean routes existed long before them, the Mongols greatly changed Eurasian exchange by protecting travel across one huge empire, which increased trade and the transfer of technology and ideas, and also spread the plague.', ok: true, why: 'A defensible claim that answers “to what extent,” recognizes continuity, and sets up change with specific categories of evidence.' },
    ],
    contextHint: 'What was Eurasian trade and exchange like before the Mongol conquests began in 1206?',
    contextStart: 'Before the Mongols, the Silk Roads and the Indian Ocean…',
    context: 'Before 1200 the Silk Roads and the Indian Ocean already linked China, India, Persia and the Mediterranean, but the routes crossed many rival states, and nomad raids made travel dangerous. Chinggis Khan united the Mongols in 1206 and his heirs conquered most of Eurasia by 1279.',
    evidence: [
      { text: 'Mongols protected caravans with relay stations (yam) and passes (paiza); trade volume rose.', side: 'change' },
      { text: 'Travelers such as Rubruck, Marco Polo and Rabban Sauma crossed all of Eurasia.', side: 'change' },
      { text: 'Resettlement moved artisans and experts (Chinese engineers to Persia, Muslim officials to China).', side: 'change' },
      { text: 'Gunpowder, printing and paper money moved west; Persian astronomy and medicine moved east.', side: 'change' },
      { text: 'The plague spread along Mongol routes, reaching Caffa in 1346 and Europe in 1347.', side: 'change' },
      { text: 'The Silk Roads and Indian Ocean trade had linked Eurasia for over a thousand years.', side: 'continuity' },
      { text: 'After the khanates fell, Samarkand still received silk, musk and spices (Clavijo, 1404).', side: 'continuity' },
      { text: 'Conquered peoples kept their own religions and bureaucracies; Mongols in Persia became Muslim.', side: 'continuity' },
    ],
    complexity: 'Show complexity by weighing both sides: the Mongols built on routes and religions that already existed, but by uniting the routes under one family they sped up exchange so much that they changed Eurasia, for good (trade, technology) and for ill (destruction, plague).',
  },

  recall: [
    { q: 'What title did Temüjin receive in 1206?', a: 'Chinggis Khan (“universal ruler”)' },
    { q: 'Which battle in 1071 opened Anatolia to the Seljuk Turks?', a: 'Manzikert' },
    { q: 'Name the four Mongol khanates.', a: 'Yuan, Chagatai, Ilkhanate, Golden Horde' },
    { q: 'Who stopped the Mongols at Ain Jalut in 1260?', a: 'The Mamluks of Egypt' },
    { q: 'What dynasty drove the Mongols out of China in 1368?', a: 'The Ming' },
  ],
}
