// History · Chapter 18 video: States and Societies of Sub-Saharan Africa. Follows the class chapter notes
// (Bentley & Ziegler, Traditions & Encounters 5e, ch. 18). Maps come from the history site (src/geo).
export default {
  id: '01-africa',
  tag: 'WORLD HISTORY · CHAPTER 18 · SUB-SAHARAN AFRICA',
  chapters: ['Roots', 'West Africa', 'Mali', 'East coast', 'Kingdoms', 'Society', 'Exam tip', 'Your turn', 'Recap'],
  layouts: { map: { type: 'histmap', chapter: 18 } },
  scenes: [
    {
      ch: 0, say: 'How did camels crossing a desert, and winds blowing across an ocean, build some of the richest kingdoms on Earth? Let’s explore Africa south of the Sahara, from about five hundred to fifteen hundred C E.',
      view: { kind: 'title', kicker: 'CHAPTER 18 · c. 500 – 1500 CE', title: 'Africa:', em: 'gold, salt & monsoons', sub: 'States and Societies of Sub-Saharan Africa' },
    },
    {
      ch: 0, say: 'Start with the Bantu migrations. [[1]]Over thousands of years, Bantu-speaking farmers spread east and south from the Niger and Benue rivers. [[2]]They carried farming, herding and iron. [[3]]Later, Malay sailors brought bananas to Madagascar. More food meant more people.',
      view: { kind: 'histmap', layout: 'map', step: 0, landsAt: 0, routesAt: [1, 1, 3], tagsAt: 2, side: [{ text: 'Bantu migrations', at: 0, strong: true }, { text: 'Farming · herding · iron', at: 2 }, { text: 'Bananas → more people', at: 3 }] },
    },
    {
      ch: 0, say: 'Most Africans lived in kin-based villages. [[1]]A village had about a hundred people, ruled by its elders. [[2]]There were no kings and no tax collectors; elders settled disputes. [[3]]After one thousand C E, more people meant more competition for land, and chiefdoms and small kingdoms like Ife and Benin appeared.',
      view: { kind: 'cards', title: 'Kin-based societies', cards: [
        { head: 'The village', text: 'about 100 people, ruled by elders', at: 1 },
        { head: '“Stateless”', text: 'no kings, no bureaucracy, no taxes', at: 2 },
        { head: 'After 1000 CE', text: 'chiefdoms and small kingdoms: Ife, Benin', at: 3, dark: true },
      ] },
    },
    {
      ch: 1, say: 'The Sahara was a barrier until the camel arrived. [[1]]Camel caravans crossed it in seventy to ninety days. [[2]]Gold went north; salt, cloth and horses came south. [[3]]The kingdom of Ghana, with its capital at Koumbi-Saleh, grew rich by taxing every load.',
      view: { kind: 'histmap', layout: 'map', step: 1, landsAt: 3, citiesAt: 1, routesAt: [1], tagsAt: 2, side: [{ text: 'Camels: 70–90 days', at: 1, strong: true }, { text: 'Gold north · salt south', at: 2 }, { text: 'Ghana taxes the trade', at: 3 }] },
    },
    {
      ch: 1, say: 'Trade also carried a religion. [[1]]Muslim merchants ran the caravans. [[2]]They settled in West African trade towns. [[3]]Kings adopted Islam to build trust with these traders. [[4]]But they blended it with local traditions, and did not force their people to convert.',
      view: { kind: 'chain', title: 'How Islam spread in West Africa', items: [
        { text: 'Muslim merchants run the caravans', at: 1 }, { text: 'They settle in trade towns', at: 2 },
        { text: 'Kings adopt Islam for trust and trade', at: 3 }, { text: 'Blended with local traditions, not forced', at: 4 },
      ] },
    },
    {
      ch: 2, say: 'Around twelve thirty-five, Sundiata builds the Mali Empire on the ruins of Ghana. [[1]]Mali controls the gold fields, [[2]]and the trade towns along the Niger River: Jenne, Timbuktu and Gao. It becomes even richer than Ghana.',
      view: { kind: 'histmap', layout: 'map', step: 2, landsAt: 0, citiesAt: 2, routesAt: [2], tagsAt: 1, side: [{ text: 'Sundiata, c. 1235', at: 0, strong: true }, { text: 'Gold fields', at: 1 }, { text: 'Niger River trade towns', at: 2 }] },
    },
    {
      ch: 2, say: 'Mali’s most famous ruler is Mansa Musa. [[1]]In thirteen twenty-four he makes the hajj to Mecca, with thousands of followers and camels loaded with gold. [[2]]He gives away so much in Cairo that gold loses value there. [[3]]He comes home with scholars and architects, and Timbuktu becomes a center of Islamic learning.',
      view: { kind: 'histmap', layout: 'map', step: 3, landsAt: 0, citiesAt: 0, routesAt: [1], tagsAt: 2, side: [{ text: 'Hajj, 1324–1325', at: 1, strong: true }, { text: 'Gold floods Cairo', at: 2 }, { text: 'Scholars → Timbuktu', at: 3 }] },
    },
    {
      ch: 3, say: 'On the east coast, the engine is the monsoon. [[1]]These winds reverse with the seasons, so ships sail to India and back once a year. [[2]]Gold, ivory and slaves go out; Indian cotton and Chinese silk and porcelain come in. [[3]]Port cities from Mogadishu to Kilwa grow rich.',
      view: { kind: 'histmap', layout: 'map', step: 4, landsAt: 3, citiesAt: 3, routesAt: [1], tagsAt: 2, side: [{ text: 'Monsoon winds', at: 1, strong: true }, { text: 'Gold · ivory · slaves out', at: 2 }, { text: 'Swahili city-states', at: 3 }] },
    },
    {
      ch: 3, say: '[[1]]The coastal traders are called Swahili, meaning coasters, and their language mixes Bantu with Arabic. [[2]]Each city is independent, with its own king, and the rich build in coral and stone. [[3]]Kilwa controls the gold of Sofala and, by the fourteen hundreds, exports more than a ton a year. Rulers accept Islam, but do not force it on everyone.',
      view: { kind: 'cards', title: 'The Swahili coast', cards: [
        { head: 'Swahili', text: '“coasters”: a Bantu language with Arabic words', at: 1 },
        { head: 'City-states', text: 'each with its own king · coral-stone mosques', at: 2 },
        { head: 'Kilwa', text: 'gold from Sofala · over a ton a year', at: 3, dark: true },
      ] },
    },
    {
      ch: 4, say: 'Inland, two Bantu kingdoms rise. [[1]]Great Zimbabwe, the dwelling of the chief, builds stone walls without mortar and sends gold to Sofala for the coast trade. [[2]]On the Atlantic side, Kongo becomes the most centralized Bantu kingdom, with cowrie shells as royal money.',
      view: { kind: 'histmap', layout: 'map', step: 5, landsAt: 0, citiesAt: 0, routesAt: [1, 1], tagsAt: 2, side: [{ text: 'Great Zimbabwe: gold', at: 1, strong: true }, { text: 'Kongo: cowrie money', at: 2 }] },
    },
    {
      ch: 4, say: 'In the highlands of Ethiopia, a Christian kingdom. [[1]]The trading kingdom of Aksum turns Christian in the three hundreds, and the Bible is translated into Ge’ez. [[2]]After Islam spreads, Ethiopia is cut off from other Christians. [[3]]Around twelve hundred, King Lalibela has churches carved down into solid rock.',
      view: { kind: 'cards', title: 'Christian Ethiopia', cards: [
        { head: 'Aksum, 300s', text: 'merchants, then King Ezana, convert · Bible in Ge’ez', at: 1 },
        { head: 'Isolated', text: 'surrounded by Muslim states; its own traditions', at: 2 },
        { head: 'Lalibela', text: 'c. 1200: churches carved from solid rock', at: 3, dark: true },
      ] },
    },
    {
      ch: 5, say: 'Across Africa, family came first. [[1]]Land was held by kin groups, and elders shared out the harvest. [[2]]Women farmed, traded, and sometimes fought; Islamic rules for women spread slowly. [[3]]Age grades bound together people of the same age across family lines. [[4]]And most people honored a creator god, their ancestors, and diviners.',
      view: { kind: 'cards', cards: [
        { head: 'Kinship', text: 'land held together · elders share harvests', at: 1 },
        { head: 'Gender', text: 'women farm and trade · Islamic norms come slowly', at: 2 },
        { head: 'Age grades', text: 'peer groups across family lines', at: 3 },
        { head: 'Religion', text: 'creator god · ancestors · diviners', at: 4, dark: true },
      ] },
    },
    {
      ch: 5, say: 'Trade had a dark side. [[1]]From the eight hundreds, demand in the Islamic world sent perhaps ten to twenty thousand enslaved Africans a year across the Sahara and the Indian Ocean. [[2]]In Iraq, Zanj slaves from the east coast rose up in eight sixty-nine, and even captured Basra.',
      view: { kind: 'histmap', layout: 'map', step: 7, landsAt: 0, citiesAt: 0, routesAt: [1, 1, 2], tagsAt: 2, side: [{ text: 'Slave trade grows, 800s', at: 1, strong: true }, { text: 'Zanj revolt, 869', at: 2 }] },
    },
    {
      ch: 6, say: 'Exam tip: AP loves to compare trans-Saharan and Indian Ocean trade. [[1]]Camels on one, monsoon winds and ships on the other. [[2]]Both sent gold, ivory and slaves out of Africa. [[3]]Both spread Islam through merchants and rulers, not conquest. [[4]]But one built land empires like Mali, and the other built independent city-states like Kilwa.',
      view: { kind: 'table', title: 'Trans-Saharan vs Indian Ocean', rows: [
        { left: 'Technology', right: 'camels · monsoon winds and dhows', at: 1 },
        { left: 'Exports', right: 'both: gold, ivory, slaves', at: 2 },
        { left: 'Islam', right: 'both: spread by merchants and rulers', at: 3 },
        { left: 'States', right: 'Mali’s land empire · Swahili city-states', at: 4 },
      ] },
    },
    {
      ch: 7, say: 'Your turn! Explain one reason the rulers of Mali adopted Islam. Use a specific example.',
      countdown: 12,
      view: { kind: 'try', text: 'Explain ONE reason the rulers of Mali adopted Islam.', hint: ['Name the reason', 'Explain how', 'Give an example'] },
    },
    {
      ch: 7, say: 'Here is a strong answer. [[1]]Muslim merchants ran the caravans that made Mali rich. [[2]]Becoming Muslim built trust with them, and brought literate advisers and Islamic law for contracts. [[3]]Mansa Musa’s hajj in thirteen twenty-four tied Mali to Cairo and Mecca, and brought scholars to Timbuktu.',
      view: { kind: 'chain', title: 'A full-credit answer', items: [{ text: 'Muslim merchants run Mali’s trade', at: 1 }, { text: 'Islam builds trust · literate advisers', at: 2 }, { text: 'Mansa Musa’s hajj brings scholars home', at: 3 }] },
    },
    {
      ch: 8, say: 'The chapter on one line. [[1]]Aksum turns Christian, around three forty. [[2]]The Zanj revolt, eight sixty-nine. [[3]]The Almoravids attack Ghana, ten seventy-six. [[4]]Sundiata founds Mali, around twelve thirty-five. [[5]]Mansa Musa’s hajj, thirteen twenty-four. [[6]]And in fourteen ninety-eight, Vasco da Gama reaches Malindi.',
      view: { kind: 'timeline', range: [250, 1580], ticks: [300, 500, 700, 900, 1100, 1300, 1500], events: [
        { year: 340, date: 'c. 340', label: 'Aksum Christian', at: 1, color: '#4E7A55' }, { year: 869, date: '869', label: 'Zanj revolt', at: 2, color: '#B5482A' },
        { year: 1076, date: '1076', label: 'Ghana attacked', at: 3, color: '#B5482A' }, { year: 1235, date: 'c. 1235', label: 'Mali founded', at: 4, color: '#2F4A7A' },
        { year: 1324, date: '1324', label: 'Musa’s hajj', at: 5, color: '#4E7A55' }, { year: 1498, date: '1498', label: 'Da Gama', at: 6, color: '#2F4A7A' },
      ] },
    },
    {
      ch: 8, say: 'Recap. [[1]]The Bantu migrations spread farming and iron, and most people lived in kin-based villages. [[2]]Camel caravans made Ghana and Mali rich and carried Islam. [[3]]Monsoon winds made the Swahili city-states and Great Zimbabwe rich. [[4]]Islam blended with local traditions, Ethiopia stayed Christian, and the slave trade grew. Now try the practice questions on the site!',
      view: { kind: 'recap', items: [
        { text: 'Bantu migrations: farming, herding, iron; kin-based villages.', at: 1 },
        { text: 'Trans-Saharan gold and salt → Ghana, Mali, Islam.', at: 2 },
        { text: 'Monsoon trade → Swahili city-states, Great Zimbabwe.', at: 3 },
        { text: 'Islam blends in; Ethiopia stays Christian; slave trade grows.', at: 4 },
      ] },
    },
  ],
}
