// History · Chapter 19 video: The Increasing Influence of Europe. Follows the class chapter notes
// (Bentley & Ziegler, Traditions & Encounters 5e, ch. 19). Maps come from the history site (src/geo).
export default {
  id: '01-europe',
  tag: 'WORLD HISTORY · CHAPTER 19 · THE RISE OF EUROPE',
  chapters: ['Byzantium', 'Kings & popes', 'Growth', 'Society', 'Faith', 'Crusades', 'Exam tip', 'Your turn', 'Recap'],
  layouts: { map: { type: 'histmap', chapter: 19 } },
  scenes: [
    {
      ch: 0, say: 'Around the year one thousand, western Europe was poor, rural and divided. Three hundred years later it was growing, trading, and sending armies all the way to Jerusalem. How did that happen? Let’s find out.',
      view: { kind: 'title', kicker: 'CHAPTER 19 · c. 1000 – 1350 CE', title: 'Europe:', em: 'growing, trading, crusading', sub: 'The Increasing Influence of Europe' },
    },
    {
      ch: 0, say: 'First, Europe’s eastern neighbor, Byzantium. [[1]]Its army rested on the theme system: land for free peasants who served as soldiers. Rich landowners swallowed those farms, so the empire lost soldiers and taxes. [[2]]In ten seventy-one, the Seljuq Turks crushed the Byzantines at Manzikert and poured into Anatolia, the empire’s grain land. [[3]]That same year, Normans took Bari, its last town in Italy.',
      view: { kind: 'histmap', layout: 'map', step: 0, landsAt: 1, citiesAt: 0, routesAt: [2], tagsAt: 2, side: [{ text: 'Themes decay', at: 1, strong: true }, { text: 'Manzikert, 1071', at: 2 }, { text: 'Normans take Bari, 1071', at: 3 }] },
    },
    {
      ch: 0, say: 'Byzantium’s decline, link by link. [[1]]Landowners absorb peasant farms. [[2]]Fewer soldiers and taxes. [[3]]Anatolia is lost after Manzikert. [[4]]In twelve oh four, crusaders sack Constantinople. [[5]]And in fourteen fifty-three, the Ottomans take it for good.',
      view: { kind: 'chain', title: 'Why Byzantium declined', items: [
        { text: 'Landowners absorb peasant farms', at: 1 }, { text: 'Fewer soldiers and taxes', at: 2 }, { text: 'Anatolia lost after Manzikert, 1071', at: 3 },
        { text: 'Crusaders sack Constantinople, 1204', at: 4 }, { text: 'Ottomans take the city, 1453', at: 5 },
      ] },
    },
    {
      ch: 1, say: 'Western Europe had no single ruler. [[1]]By twelve hundred it was a patchwork: the Holy Roman Empire, France, England, the Papal States, Sicily, and Christian kingdoms in Spain. [[2]]William of Normandy had conquered England in ten sixty-six, and English kings held much of western France.',
      view: { kind: 'histmap', layout: 'map', step: 1, landsAt: 1, citiesAt: 1, routesAt: [2], tagsAt: 1, side: [{ text: 'No single empire', at: 0, strong: true }, { text: 'Regional monarchies', at: 1 }, { text: 'Normans take England, 1066', at: 2 }] },
    },
    {
      ch: 1, say: 'Emperors and popes fought for power. [[1]]In nine sixty-two, the pope crowned the German king Otto the First emperor. [[2]]But when Pope Gregory the Seventh banned emperors from choosing bishops, Henry the Fourth refused, and was excommunicated. [[3]]Later, the popes helped the cities of northern Italy defeat Frederick Barbarossa.',
      view: { kind: 'cards', title: 'Emperors vs popes', cards: [
        { head: 'Otto I, 962', text: 'crowned emperor by the pope', at: 1 },
        { head: 'Investiture Contest', text: 'Gregory VII vs Henry IV · Canossa, 1077', at: 2 },
        { head: 'Barbarossa', text: 'stopped by popes and Lombard cities, 1176', at: 3, dark: true },
      ] },
    },
    {
      ch: 1, say: 'Elsewhere, kings slowly gained power. [[1]]France’s Capetian kings spread outward from Paris. [[2]]England’s Norman kings built a strong monarchy, and Magna Carta, in twelve fifteen, put the king under the law. [[3]]Italy split into city-states and the Papal States. [[4]]And Spain’s Christian kingdoms pushed south.',
      view: { kind: 'cards', cards: [
        { head: 'France', text: 'Capetians from 987, outward from Paris', at: 1 },
        { head: 'England', text: 'Normans, 1066 · Magna Carta, 1215', at: 2 },
        { head: 'Italy', text: 'city-states and the Papal States', at: 3 },
        { head: 'Iberia', text: 'Christian kingdoms push south', at: 4, dark: true },
      ] },
    },
    {
      ch: 2, say: 'Now the big change: growth. [[1]]With the invasions over, peasants cleared forests and drained swamps. [[2]]They rotated crops, planted beans, and hitched faster horses to their plows with new collars. [[3]]Europe’s population roughly doubled by thirteen hundred. [[4]]Extra people moved to towns and specialized, especially in cloth. [[5]]And trade came back to life.',
      view: { kind: 'chain', title: 'From farms to towns', items: [
        { text: 'Invasions end; new land cleared', at: 1 }, { text: 'Crop rotation, beans, horse collars', at: 2 }, { text: 'Population roughly doubles', at: 3 },
        { text: 'Towns and specialized labor', at: 4 }, { text: 'Trade revives', at: 5 },
      ] },
    },
    {
      ch: 2, say: 'Two trade zones grew. [[1]]In the north, the Hanseatic League, led by Lübeck, shipped grain, fish, timber and furs. [[2]]In the south, Venice and Genoa sailed to Constantinople, the Black Sea and Egypt for silk and spices. [[3]]They met in Flanders and at the fairs of Champagne.',
      view: { kind: 'histmap', layout: 'map', step: 2, citiesAt: 0, routesAt: [1, 1, 1, 1, 1, 2, 2, 2, 2, 3], tagsAt: 3, side: [{ text: 'Hansa: Baltic & North Sea', at: 1 }, { text: 'Venice & Genoa: the Mediterranean', at: 2 }, { text: 'They meet in Flanders & Champagne', at: 3, strong: true }] },
    },
    {
      ch: 3, say: 'Medieval writers described three estates. [[1]]Those who pray: the clergy. [[2]]Those who fight: knights, who were supposed to follow chivalry, a code the Church sponsored. [[3]]And those who work: the peasants. But that picture left out the townspeople.',
      view: { kind: 'cards', title: 'The three estates', cards: [
        { head: 'Those who pray', text: 'clergy', at: 1 },
        { head: 'Those who fight', text: 'nobles and knights · chivalry', at: 2 },
        { head: 'Those who work', text: 'peasants', at: 3 },
        { head: 'Left out', text: 'merchants, artisans, lawyers, doctors', at: 3, dark: true },
      ] },
    },
    {
      ch: 3, say: 'And towns were booming. [[1]]They won charters to govern themselves. [[2]]Guilds set prices and quality, and helped sick or poor members. [[3]]Women worked in many trades and joined most guilds. [[4]]And troubadours sang of romantic love, backed by patrons like Eleanor of Aquitaine.',
      view: { kind: 'cards', cards: [
        { head: 'Charters', text: 'towns govern themselves', at: 1 },
        { head: 'Guilds', text: 'prices, quality, membership, aid', at: 2 },
        { head: 'Urban women', text: 'needle trades · most guilds', at: 3 },
        { head: 'Troubadours', text: 'romantic love · Eleanor of Aquitaine', at: 4, dark: true },
      ] },
    },
    {
      ch: 4, say: 'Wealth also paid for learning. [[1]]Cathedral schools grew into universities at Bologna, Paris and Oxford. [[2]]Thomas Aquinas used Aristotle to show that faith and reason fit together: Scholasticism. [[3]]Ordinary people focused on sacraments, saints, relics and pilgrimages. [[4]]And friars like Francis and Dominic vowed poverty and fought heresy.',
      view: { kind: 'cards', title: 'Faith and learning', cards: [
        { head: 'Universities', text: 'Bologna · Paris · Oxford (1100s)', at: 1 },
        { head: 'Scholasticism', text: 'Aquinas: faith + Aristotle', at: 2 },
        { head: 'Popular faith', text: 'sacraments, saints, relics, pilgrimage', at: 3 },
        { head: 'Friars vs heresy', text: 'Franciscans, Dominicans vs Cathars', at: 4, dark: true },
      ] },
    },
    {
      ch: 5, say: 'Europe also pushed outward. [[1]]Norse sailors settled Iceland and Greenland, and briefly reached Vinland, in Canada. [[2]]Crusading knights conquered pagan peoples around the Baltic. [[3]]And Normans took Sicily from its Muslim rulers.',
      view: { kind: 'histmap', layout: 'map', step: 3, landsAt: 0, citiesAt: 0, routesAt: [1, 2, 2], tagsAt: 2, side: [{ text: 'Norse in the Atlantic', at: 1 }, { text: 'Baltic crusades', at: 2 }, { text: 'Normans take Sicily', at: 3, strong: true }] },
    },
    {
      ch: 5, say: 'In Spain, this was the Reconquista. [[1]]Christian kingdoms grew out of the north. [[2]]Toledo fell in ten eighty-five. [[3]]After Las Navas de Tolosa, in twelve twelve, Córdoba and Seville fell too. [[4]]Only Granada held out, until fourteen ninety-two.',
      view: { kind: 'histmap', layout: 'map', step: 4, landsAt: 1, citiesAt: 2, side: [{ text: 'Toledo, 1085', at: 2 }, { text: 'Las Navas, 1212', at: 3 }, { text: 'Granada falls, 1492', at: 4, strong: true }] },
    },
    {
      ch: 5, say: 'Then the Crusades. In ten ninety-five, Pope Urban the Second called on knights to free Jerusalem, and the crowd shouted: God wills it! [[1]]The First Crusade took Jerusalem in ten ninety-nine, but Saladin won it back in eleven eighty-seven. [[2]]And the Fourth Crusade, in debt to Venice, sacked Christian Constantinople in twelve oh four.',
      view: { kind: 'histmap', layout: 'map', step: 5, landsAt: 1, citiesAt: 0, routesAt: [1, 2], tagsAt: 1, side: [{ text: 'Clermont, 1095: “God wills it!”', at: 0, strong: true }, { text: 'Jerusalem taken, 1099', at: 1 }, { text: 'Constantinople sacked, 1204', at: 2 }] },
    },
    {
      ch: 5, say: 'As wars, the Crusades failed. [[1]]But they brought direct contact with the Muslim world. [[2]]Together with Spain and Sicily, that contact brought Aristotle, Arabic numerals and paper to Europe. [[3]]And a taste for sugar and spices made Italian merchants rich.',
      view: { kind: 'chain', title: 'Why the Crusades mattered', items: [
        { text: 'Military failure, but direct contact', at: 1 }, { text: 'Aristotle · Arabic numerals · paper', at: 2 }, { text: 'Demand for sugar, spices, silk → Italian trade', at: 3 },
      ] },
    },
    {
      ch: 6, say: 'Exam tip: compare European and Japanese feudalism, from Chapter fourteen. [[1]]In both, weak central power meant land in exchange for military service. [[2]]Europe had knights and chivalry; Japan had samurai and their code of loyalty. [[3]]But Europe had one powerful Church, and in Japan the shogun, not the emperor, held real power.',
      view: { kind: 'table', title: 'Feudal Europe vs feudal Japan', rows: [
        { left: 'Same', right: 'weak center · land for military service', at: 1 },
        { left: 'Europe', right: 'knights · chivalry · one powerful Church', at: 2 },
        { left: 'Japan', right: 'samurai · loyalty code · emperor as symbol', at: 2 },
        { left: 'Power', right: 'European kings grow stronger; Japan’s shogun rules', at: 3 },
      ] },
    },
    {
      ch: 7, say: 'Your turn! Explain one way the Crusades affected the Byzantine Empire. Use a specific example.',
      countdown: 12,
      view: { kind: 'try', text: 'Explain ONE way the Crusades affected the Byzantine Empire.', hint: ['Name the event', 'Explain the effect', 'Add a date'] },
    },
    {
      ch: 7, say: 'Here is a strong answer. [[1]]In twelve oh four, the Fourth Crusade sacked Constantinople. [[2]]Byzantium lost wealth and trade, much of it to Venice. [[3]]So even after retaking the city, it was too weak to stop the Ottomans in fourteen fifty-three.',
      view: { kind: 'chain', title: 'A full-credit answer', items: [{ text: 'Fourth Crusade sacks Constantinople, 1204', at: 1 }, { text: 'Byzantium loses wealth and trade to Venice', at: 2 }, { text: 'Too weak to stop the Ottomans, 1453', at: 3 }] },
    },
    {
      ch: 8, say: 'The chapter on one line. [[1]]Otto crowned emperor, nine sixty-two. [[2]]Manzikert, ten seventy-one. [[3]]Jerusalem taken, ten ninety-nine. [[4]]Saladin wins it back, eleven eighty-seven. [[5]]Constantinople sacked, twelve oh four. [[6]]And Acre, the last crusader city, falls in twelve ninety-one.',
      view: { kind: 'timeline', range: [930, 1320], ticks: [950, 1000, 1050, 1100, 1150, 1200, 1250, 1300], events: [
        { year: 962, date: '962', label: 'Otto I', at: 1, color: '#2F4A7A' }, { year: 1071, date: '1071', label: 'Manzikert', at: 2, color: '#B5482A' },
        { year: 1099, date: '1099', label: 'Jerusalem taken', at: 3, color: '#B5482A' }, { year: 1187, date: '1187', label: 'Saladin', at: 4, color: '#4E7A55' },
        { year: 1204, date: '1204', label: 'Sack of 1204', at: 5, color: '#B5482A' }, { year: 1291, date: '1291', label: 'Acre falls', at: 6, color: '#4E7A55' },
      ] },
    },
    {
      ch: 8, say: 'Recap. [[1]]Byzantium declined after Manzikert and the sack of twelve oh four. [[2]]Western Europe stayed divided, and popes fought emperors. [[3]]Better farming brought more people, towns, guilds and trade. [[4]]And Europe built universities and pushed outward, from Spain to the Baltic to Jerusalem. Now try the practice questions on the site!',
      view: { kind: 'recap', items: [
        { text: 'Byzantium: themes decay → Manzikert 1071 → sack 1204.', at: 1 },
        { text: 'West: regional kingdoms; popes vs emperors.', at: 2 },
        { text: 'Farms → people → towns, guilds, Hansa, Italy.', at: 3 },
        { text: 'Universities and expansion: Reconquista, Baltic, Crusades.', at: 4 },
      ] },
    },
  ],
}
