// History · Chapter 16 video: The Two Worlds of Christendom. Follows the class chapter notes
// (Bentley & Ziegler, Traditions & Encounters 5e, ch. 16). Maps come from the history site (src/geo).
export default {
  id: '01-christendom',
  tag: 'WORLD HISTORY · CHAPTER 16 · TWO WORLDS OF CHRISTENDOM',
  chapters: ['Two halves', 'Byzantium', 'Franks', 'Invasions', 'Economy', 'Faith', 'Exam tip', 'Your turn', 'Recap'],
  layouts: { map: { type: 'histmap', chapter: 16 } },
  scenes: [
    {
      ch: 0, say: 'After Rome, there were two Christian worlds: a rich, Greek-speaking empire in the East, and a patchwork of Germanic kingdoms in the West. How did they grow apart, until their churches split in ten fifty-four? Let’s find out.',
      view: { kind: 'title', kicker: 'CHAPTER 16 · c. 330 – 1100 CE', title: 'Christendom:', em: 'one faith, two worlds', sub: 'The Two Worlds of Christendom' },
    },
    {
      ch: 0, say: 'Around five hundred C E, the map looks like this. [[1]]In the East, the Roman Empire survives, ruled from Constantinople. Historians call it the Byzantine Empire. [[2]]In the West, Germanic peoples rule: Visigoths in Spain, Ostrogoths in Italy, Vandals in North Africa, and Franks in Gaul. The last western emperor was deposed in four seventy-six.',
      view: { kind: 'histmap', layout: 'map', step: 0, landsAt: 1, citiesAt: 2, side: [{ text: 'East: the Roman Empire survives', at: 1, strong: true }, { text: 'West: Germanic kingdoms', at: 2 }] },
    },
    {
      ch: 0, say: 'In three thirty C E, Constantine moved his capital to Byzantium and renamed it Constantinople. [[1]]It sits on the Bosporus, guarding trade between Europe and Asia, with water on three sides. [[2]]The emperor rules the state and the church too. This is called caesaropapism. [[3]]And at court, visitors lie flat on the floor before an emperor in royal purple.',
      view: { kind: 'cards', title: 'Constantinople, 330 CE', cards: [
        { head: 'Location', text: 'Bosporus + Golden Horn: trade and defense', at: 1 },
        { head: 'Caesaropapism', text: 'the emperor rules state and church', at: 2, dark: true },
        { head: 'The court', text: 'royal purple, prostration, mechanical lions', at: 3 },
      ] },
    },
    {
      ch: 1, say: 'Justinian, the sleepless emperor, ruled from five twenty-seven to five sixty-five. He dreamed of restoring Rome. [[1]]His general Belisarius retook North Africa from the Vandals in five thirty-three, [[2]]then fought for twenty years to win Italy. But the wars and a plague drained the empire, and soon the Lombards took most of Italy.',
      view: { kind: 'histmap', layout: 'map', step: 1, landsAt: 0, citiesAt: 0, routesAt: [1, 2], tagsAt: 2, side: [{ text: 'Justinian, 527–565', at: 0, strong: true }, { text: 'Africa retaken, 533', at: 1 }, { text: 'Italy, after 20 years of war', at: 2 }] },
    },
    {
      ch: 1, say: 'At home, Justinian left three great legacies. [[1]]In the Nika riot of five thirty-two, his wife Theodora refused to flee and saved his throne. [[2]]He built Hagia Sophia, with its giant dome. [[3]]And his experts organized centuries of Roman law into one code, which still shapes law today.',
      view: { kind: 'cards', cards: [
        { head: 'Theodora', text: 'former performer; saved the throne in the Nika riot, 532', at: 1 },
        { head: 'Hagia Sophia', text: 'giant domed church, 537', at: 2 },
        { head: 'Justinian’s Code', text: 'Corpus iuris civilis: Roman law organized', at: 3, dark: true },
      ] },
    },
    {
      ch: 1, say: 'Then came Islam. [[1]]In the six hundreds, Arab armies took Syria, Egypt and North Africa. [[2]]They besieged Constantinople twice, but the city held, thanks to its walls and Greek fire, a liquid that burned even on water. [[3]]To survive, emperors created themes: provinces run by generals, defended by free peasants who got land for military service.',
      view: { kind: 'histmap', layout: 'map', step: 2, landsAt: 1, citiesAt: 0, routesAt: [2, 2], tagsAt: 2, side: [{ text: 'Arab conquests, 630s–700s', at: 1 }, { text: 'Greek fire saves the city', at: 2, strong: true }, { text: 'Themes: soldier-farmers', at: 3 }] },
    },
    {
      ch: 2, say: 'In the West, the Franks became the strongest kingdom. Their king Clovis accepted Roman Christianity, which tied the Franks to the pope. [[1]]In seven thirty-two, Charles Martel beat a Muslim army at Tours. [[2]]His grandson Charlemagne conquered an empire from Spain to Germany and Italy, ruled from Aachen.',
      view: { kind: 'histmap', layout: 'map', step: 3, landsAt: 0, citiesAt: 2, tagsAt: 2, side: [{ text: 'Franks ally with the pope', at: 0, strong: true }, { text: 'Tours, 732', at: 1 }, { text: 'Charlemagne, 768–814', at: 2 }] },
    },
    {
      ch: 2, say: 'Charlemagne could barely write, but he gathered scholars at his court. [[1]]He sent officials called missi dominici, envoys of the lord ruler, to check on local counts. [[2]]And on Christmas Day, eight hundred, Pope Leo the Third crowned him emperor in Rome. [[3]]The emperor in Constantinople saw that as a direct challenge.',
      view: { kind: 'cards', title: 'Charlemagne’s empire', cards: [
        { head: 'Missi dominici', text: 'yearly inspectors of local counts', at: 1 },
        { head: 'Crowned, 800', text: 'by Pope Leo III in Rome', at: 2, dark: true },
        { head: 'Challenge', text: 'a rival to the Byzantine emperor', at: 3 },
      ] },
    },
    {
      ch: 3, say: 'The empire did not last. Charlemagne’s son lost control, and his three grandsons fought a civil war. [[1]]In eight forty-three, the Treaty of Verdun split the empire into three kingdoms: [[2]]roughly the future France, a middle strip down to Italy, and Germany.',
      view: { kind: 'histmap', layout: 'map', step: 4, landsAt: 1, citiesAt: 0, tagsAt: 2, side: [{ text: 'Treaty of Verdun, 843', at: 1, strong: true }, { text: 'West · Middle · East', at: 2 }] },
    },
    {
      ch: 3, say: 'Then invaders struck from every side. [[1]]From the north, Vikings in shallow longships rowed up rivers to raid towns and monasteries. [[2]]From the east, Magyar horsemen raided from Hungary. [[3]]From the south, Muslim raiders took Sicily and attacked Italy. The kings had no navy, and no quick way to fight back.',
      view: { kind: 'histmap', layout: 'map', step: 5, landsAt: 0, citiesAt: 0, routesAt: [1, 1, 1, 1, 2, 2, 3, 3], tagsAt: 2, side: [{ text: 'North: Vikings', at: 1 }, { text: 'East: Magyars', at: 2 }, { text: 'South: Muslim raiders', at: 3 }] },
    },
    {
      ch: 3, say: 'So power moved to local lords. Here is the chain. [[1]]Kings are weak and cannot stop the raids. [[2]]Local lords build private armies. [[3]]They pay their vassals with land, in return for loyalty and military service. [[4]]And serfs work the land, owing labor to the lord, unable to leave. Historians call this feudalism and manorialism.',
      view: { kind: 'chain', title: 'Why power went local', items: [
        { text: 'Weak kings, constant raids', at: 1 }, { text: 'Local lords raise private armies', at: 2 },
        { text: 'Vassals get land for military service', at: 3 }, { text: 'Serfs owe labor, bound to the land', at: 4 },
      ] },
    },
    {
      ch: 4, say: 'The two economies were very different. [[1]]Byzantium was a powerhouse: big cities, its own silk industry, and the gold bezant, the standard coin of the Mediterranean. [[2]]The West was rural and local. [[3]]But new tools, the heavy plow, water mills and the horse collar, raised harvests, [[4]]and Viking traders linked Europe to the Islamic world.',
      view: { kind: 'table', title: 'Two economies', rows: [
        { left: 'Byzantium', right: 'cities · silk industry · gold bezant · trade', at: 1 },
        { left: 'West', right: 'manors · serfs · small local trade', at: 2 },
        { left: 'New tools', right: 'heavy plow · water mill · horse collar', at: 3 },
        { left: 'Norse', right: 'raiders and traders, linked to the Islamic world', at: 4 },
      ] },
    },
    {
      ch: 5, say: 'Both halves were Christian, but they ran their churches differently. [[1]]In the West, Pope Gregory the Great claimed authority over the whole church. [[2]]In the East, emperors appointed the patriarch, and the emperor Leo the Third even banned icons, causing riots. [[3]]Monks following rules like Saint Benedict’s lived in poverty, chastity and obedience, ran hospitals, and spread the faith.',
      view: { kind: 'cards', cards: [
        { head: 'Papal primacy', text: 'Gregory I: the pope leads the whole church', at: 1 },
        { head: 'Iconoclasm', text: 'the emperor bans icons, 726–843; riots follow', at: 2 },
        { head: 'Monasteries', text: 'Basil, Benedict, Scholastica: poverty, chastity, obedience', at: 3, dark: true },
      ] },
    },
    {
      ch: 5, say: '[[1]]Byzantine missionaries Cyril and Methodius brought Christianity to the Slavs, with a new alphabet. [[2]]In nine eighty-eight, Prince Vladimir of Kiev was baptized, so Russia became Orthodox. [[3]]Meanwhile East and West argued over beards, bread, and above all the pope’s authority. In ten fifty-four, they excommunicated each other.',
      view: { kind: 'histmap', layout: 'map', step: 7, landsAt: 0, citiesAt: 0, routesAt: [1, 2, 3], tagsAt: 3, side: [{ text: 'Cyril & Methodius, 863', at: 1 }, { text: 'Kiev converts, 988', at: 2 }, { text: 'Schism, 1054', at: 3, strong: true }] },
    },
    {
      ch: 6, say: 'Exam tip: AP loves comparing the Byzantine East with the Latin West. [[1]]Both inherited Christianity and Roman traditions. [[2]]But Byzantium had a strong emperor who controlled the church, [[3]]while the West had weak kings, powerful local lords, and a pope who claimed independence. [[4]]Byzantium was urban and rich; the West was rural.',
      view: { kind: 'table', title: 'Byzantine East vs Latin West', rows: [
        { left: 'Same', right: 'Christian faith · Roman inheritance', at: 1 },
        { left: 'East', right: 'strong emperor · caesaropapism · Greek', at: 2 },
        { left: 'West', right: 'local lords · independent pope · Latin', at: 3 },
        { left: 'Economy', right: 'East: cities and trade · West: manors', at: 4 },
      ] },
    },
    {
      ch: 7, say: 'Your turn! Explain one reason political power became decentralized in western Europe after Charlemagne. Use a specific example.',
      countdown: 12,
      view: { kind: 'try', text: 'Explain ONE reason political power became decentralized in western Europe after Charlemagne.', hint: ['Name a cause', 'Explain how', 'Give an example'] },
    },
    {
      ch: 7, say: 'Here is a strong answer. [[1]]The Treaty of Verdun split the empire in eight forty-three. [[2]]Then Vikings raided by river faster than any king could respond. [[3]]So local lords defended their own lands and paid vassals with land, and real power moved to them.',
      view: { kind: 'chain', title: 'A full-credit answer', items: [{ text: 'Empire split at Verdun, 843', at: 1 }, { text: 'Viking raids too fast for kings', at: 2 }, { text: 'Local lords and vassals take over', at: 3 }] },
    },
    {
      ch: 8, say: 'The whole chapter on one line. [[1]]Constantinople, three thirty. [[2]]Justinian, five twenty-seven. [[3]]Tours, seven thirty-two. [[4]]Charlemagne crowned, eight hundred. [[5]]Verdun, eight forty-three. [[6]]Kiev converts, nine eighty-eight. [[7]]And the schism, ten fifty-four.',
      view: { kind: 'timeline', range: [280, 1100], ticks: [300, 450, 600, 750, 900, 1050], events: [
        { year: 330, date: '330', label: 'Constantinople', at: 1, color: '#6E5A8F' }, { year: 527, date: '527', label: 'Justinian', at: 2, color: '#6E5A8F' },
        { year: 732, date: '732', label: 'Tours', at: 3, color: '#B5482A' }, { year: 800, date: '800', label: 'Charlemagne', at: 4, color: '#2F4A7A' },
        { year: 843, date: '843', label: 'Verdun', at: 5, color: '#2F4A7A' }, { year: 988, date: '988', label: 'Kiev converts', at: 6, color: '#4E7A55' },
        { year: 1054, date: '1054', label: 'Schism', at: 7, color: '#B5482A' },
      ] },
    },
    {
      ch: 8, say: 'Recap. [[1]]Byzantium kept the Roman state alive, with an emperor over church and state. [[2]]In the West, the Franks allied with the pope, and Charlemagne rebuilt an empire. [[3]]After Verdun and the invasions, power went to lords, vassals and serfs. [[4]]And in ten fifty-four the church split into Orthodox and Catholic. Now try the practice questions on the site!',
      view: { kind: 'recap', items: [
        { text: 'Byzantium: emperor over state and church, Roman law, rich trade.', at: 1 },
        { text: 'Franks + pope; Charlemagne crowned emperor in 800.', at: 2 },
        { text: 'Verdun + invasions → lords, vassals and serfs.', at: 3 },
        { text: '1054: Orthodox East, Catholic West.', at: 4 },
      ] },
    },
  ],
}
