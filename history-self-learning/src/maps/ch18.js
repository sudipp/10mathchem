// Chapter 18 map layers (longitude, latitude). Territory outlines are drawn loosely over
// the sea: the map clips every territory to the coastline, so only land frontiers need care.
// Sources for frontiers: standard historical atlases (Ghana c. 1050, Mali c. 1335, Great Zimbabwe, Kongo c. 1500, Ethiopia).
// Niani’s exact site is debated; it is placed on the upper Niger near the modern Guinea–Mali border.

const CITIES = {
  koumbi: { name: 'Koumbi-Saleh', at: [-7.97, 15.77], big: true },
  awdaghust: { name: 'Awdaghust', at: [-10.0, 17.4], side: 'left' },
  takrur: { name: 'Takrur', at: [-14.9, 16.6], side: 'left' },
  sijilmasa: { name: 'Sijilmasa', at: [-4.27, 31.28] },
  fez: { name: 'Fez', at: [-5.0, 34.03] },
  taghaza: { name: 'Taghaza', at: [-4.98, 23.63] },
  tuat: { name: 'Tuat', at: [0.28, 27.87] },
  tripoli: { name: 'Tripoli', at: [13.18, 32.89] },
  ghat: { name: 'Ghat', at: [10.17, 24.96] },
  gao: { name: 'Gao', at: [-0.04, 16.27], side: 'below' },
  timbuktu: { name: 'Timbuktu', at: [-3.0, 16.77], big: true },
  jenne: { name: 'Jenne', at: [-4.55, 13.9] },
  niani: { name: 'Niani', at: [-8.38, 11.38], big: true, side: 'left' },
  walata: { name: 'Walata', at: [-7.03, 17.3] },
  kano: { name: 'Kano', at: [8.52, 12.0] },
  ife: { name: 'Ife', at: [4.56, 7.48], side: 'left' },
  benin: { name: 'Benin', at: [5.62, 6.34], side: 'below' },
  cairo: { name: 'Cairo', at: [31.24, 30.04], big: true },
  medina: { name: 'Medina', at: [39.61, 24.47] },
  mecca: { name: 'Mecca', at: [39.83, 21.42], big: true },
  mogadishu: { name: 'Mogadishu', at: [45.34, 2.04] },
  malindi: { name: 'Malindi', at: [40.12, -3.22] },
  mombasa: { name: 'Mombasa', at: [39.67, -4.04], side: 'left' },
  zanzibar: { name: 'Zanzibar', at: [39.19, -6.16], side: 'left' },
  kilwa: { name: 'Kilwa', at: [39.51, -8.96], big: true },
  sofala: { name: 'Sofala', at: [34.8, -20.2] },
  aden: { name: 'Aden', at: [45.03, 12.8] },
  hormuz: { name: 'Hormuz', at: [56.46, 27.1] },
  basra: { name: 'Basra', at: [47.8, 30.5] },
  cambay: { name: 'Cambay', at: [72.62, 22.32] },
  calicut: { name: 'Calicut', at: [75.78, 11.25] },
  zimbabwe: { name: 'Great Zimbabwe', at: [30.93, -20.27], big: true, side: 'left' },
  mbanza: { name: 'Mbanza Kongo', at: [14.24, -6.27], big: true },
  aksum: { name: 'Aksum', at: [38.72, 14.13], big: true, side: 'left' },
  adulis: { name: 'Adulis', at: [39.66, 15.26] },
  lalibela: { name: 'Lalibela', at: [39.04, 12.03], big: true },
}

// ---------- territories ----------
const BANTU_HOME = [[6.0, 4.0], [6.5, 8.5], [9.5, 10.0], [13.5, 9.0], [14.5, 5.5], [12.0, 2.5], [8.5, 3.0]]
const GHANA = [[-12.6, 14.0], [-12.8, 17.2], [-10.5, 18.6], [-7.0, 18.2], [-5.0, 16.8], [-5.0, 14.6], [-7.2, 13.2], [-10.4, 13.0]]
const TAKRUR = [[-17.0, 15.4], [-16.8, 17.0], [-14.6, 17.3], [-12.9, 16.3], [-12.9, 14.9], [-15.0, 14.6]]
const MALI = [[-17.8, 12.0], [-17.6, 16.2], [-15.0, 17.6], [-11.0, 19.5], [-7.0, 20.6], [-3.0, 20.6], [0.0, 19.6], [2.6, 17.8], [2.0, 15.0], [-0.5, 13.6], [-3.5, 12.3], [-6.0, 10.4], [-8.5, 9.2], [-11.0, 9.4], [-13.2, 10.6], [-15.5, 11.2]]
const HAUSA = [[5.5, 11.0], [5.0, 13.4], [7.5, 13.8], [10.5, 13.2], [11.0, 11.0], [8.5, 10.2]]
const ZIMBABWE = [[26.5, -19.0], [27.6, -16.8], [30.5, -16.0], [33.0, -16.2], [33.2, -18.8], [32.4, -21.6], [30.0, -22.6], [27.8, -21.8]]
const KONGO = [[11.6, -4.6], [12.2, -9.0], [14.0, -9.6], [16.4, -9.0], [17.2, -6.6], [16.2, -4.4], [14.0, -4.2]]
const AKSUM = [[36.0, 12.6], [36.4, 16.4], [38.6, 18.3], [40.6, 16.6], [41.6, 14.0], [40.2, 12.4], [38.0, 12.0]]
const ETHIOPIA_1450 = [[34.8, 9.0], [35.4, 13.4], [36.8, 15.6], [38.6, 16.6], [40.2, 15.6], [40.4, 13.2], [40.0, 10.6], [40.6, 8.6], [39.6, 6.2], [37.0, 5.8], [35.4, 7.4]]
const ADAL = [[40.8, 7.8], [41.3, 10.6], [42.6, 12.2], [44.8, 11.0], [44.6, 9.0], [43.2, 7.6], [41.8, 7.2]]
const SWAHILI = [[44.4, 1.0], [46.2, 2.6], [41.6, -1.4], [40.9, -2.4], [40.2, -4.4], [39.9, -6.5], [40.2, -9.0], [40.9, -10.6], [40.9, -14.0], [39.6, -17.0], [36.6, -19.0], [35.3, -21.6], [34.4, -21.6], [34.2, -20.0], [35.9, -18.0], [38.3, -16.0], [39.0, -12.0], [38.7, -9.0], [38.4, -6.5], [38.8, -4.5], [39.4, -2.9], [40.5, -1.9], [41.9, -0.7], [43.9, 1.3]]

// ---------- routes ----------
const BANTU_EAST = [[11.0, 6.5], [16.5, 5.0], [23.0, 3.5], [29.0, 1.0], [32.5, -3.5], [35.0, -9.5], [35.0, -16.0], [32.0, -23.0]]
const BANTU_SOUTH = [[10.5, 3.5], [13.5, -1.5], [15.5, -7.0], [17.5, -13.0], [21.0, -19.0], [26.0, -25.5]]
const MALAY = [[56.0, -14.0], [49.5, -17.5]]
const W_ROUTE = [[-7.97, 15.77], [-10.0, 17.4], [-10.2, 21.0], [-8.0, 26.0], [-4.27, 31.28], [-5.0, 34.03]]
const SALT_ROUTE = [[-7.03, 17.3], [-4.98, 23.63], [-4.27, 31.28]]
const KOUMBI_SALT = [[-7.97, 15.77], [-4.98, 23.63]]
const TIMBUKTU_SALT = [[-3.0, 16.77], [-4.98, 23.63]]
const E_ROUTE = [[-0.04, 16.27], [1.5, 19.0], [6.0, 23.5], [10.17, 24.96], [12.8, 26.8], [13.6, 30.0], [13.18, 32.89]]
const HAJJ = [[-8.38, 11.38], [-7.2, 14.2], [-7.03, 17.3], [-4.4, 22.0], [0.28, 27.87], [7.0, 28.6], [15.0, 27.6], [23.0, 28.3], [28.5, 29.4], [31.24, 30.04], [33.0, 29.9], [35.0, 29.5], [37.0, 27.2], [39.61, 24.47], [39.83, 21.42]]
const COAST_LANE = [[34.95, -20.4], [36.5, -18.6], [40.5, -15.0], [40.2, -9.0], [39.9, -6.2], [40.0, -4.1], [40.5, -3.1], [42.2, -0.8], [45.8, 1.6], [48.6, 2.8], [51.6, 6.4], [53.0, 10.0], [52.0, 11.6], [48.5, 12.4], [45.2, 12.5]]
const LANE_INDIA_N = [[52.0, 11.4], [58.0, 13.5], [66.0, 14.0], [75.4, 11.4]]
const LANE_INDIA_S = [[40.6, -3.3], [50.0, -1.0], [62.0, 4.0], [70.0, 8.0], [75.4, 11.2]]
const LANE_GULF = [[52.0, 11.6], [55.0, 15.5], [60.0, 20.4], [60.2, 23.2], [57.8, 25.4], [56.6, 26.6]]
const LANE_CAMBAY = [[66.0, 14.0], [70.5, 18.5], [72.3, 21.8]]
const ZIM_GOLD = [[30.93, -20.27], [32.8, -20.6], [34.6, -20.2]]
const ZIM_LANE = [[34.95, -20.4], [36.5, -18.6], [40.5, -15.0], [39.8, -9.0]]
const SAHARA_SLAVES = [[-3.0, 16.77], [0.28, 27.87], [-0.8, 30.0], [-4.27, 31.28]]
const SAHARA_SLAVES_E = [[8.52, 12.0], [10.17, 24.96], [13.18, 32.89]]
const ZANJ_LANE = [[39.6, -6.5], [41.2, -2.5], [45.8, 1.6], [48.6, 2.8], [51.6, 6.4], [53.0, 10.0], [55.0, 15.5], [60.0, 20.4], [60.2, 23.2], [57.8, 25.4], [56.3, 26.6], [52.5, 27.4], [49.4, 29.4]]
const RED_SEA_LANE = [[39.9, 15.5], [39.0, 18.4], [37.6, 21.6], [35.7, 25.4], [34.0, 27.8]]

// ---------- map steps (the animated map) ----------
// view: [lonMin, latMin, lonMax, latMax] to zoom in, or null for the whole map.
const C = { bantu: '#4E7A55', ghana: '#C99A3D', mali: '#B5482A', takrur: '#6E5A8F', swahili: '#2E6E9A', zim: '#7A3B22', kongo: '#6E5A8F', eth: '#4E7FA6', adal: '#4E7A55', hausa: '#4E7A55', caravan: '#7A3B22', sea: '#2E6E9A' }
const CONTINENT = [-20, -36, 56, 38]
const WEST = [-18, 5, 15, 36]

const STEPS = [
  {
    title: 'Bantu migrations, c. 2000 BCE – 1000 CE', chip: 'Bantu migrations',
    caption: 'Bantu-speaking farmers spread east and south from the Niger–Benue region, carrying farming, herding and iron. Malay sailors later brought bananas, yams and chickens to Madagascar.',
    view: CONTINENT,
    lands: [{ label: 'Bantu homeland', color: C.bantu, polys: [BANTU_HOME], at: [10.0, 11.6] }],
    routes: [
      { pts: BANTU_EAST, color: C.bantu, arrow: true, label: 'eastern stream', labelAt: [24.0, 6.4] },
      { pts: BANTU_SOUTH, color: C.bantu, arrow: true, label: 'western stream', labelAt: [10.4, -9.0] },
      { pts: MALAY, color: C.sea, arrow: true, dashed: true, label: 'Malay sailors', labelAt: [51.0, -12.0] },
    ],
    tags: [{ text: 'farming · herding', at: [21.5, -14.5] }, { text: 'iron working', at: [30.0, -4.0] }, { text: 'bananas · yams · chickens', at: [46.0, -24.5] }, { text: 'Sahara (drying since c. 5000 BCE)', at: [11.0, 24.5] }],
  },
  {
    title: 'Ghana and the trans-Saharan trade, c. 800–1076', chip: 'Ghana',
    caption: 'Camel caravans took 70–90 days to cross the Sahara. Ghana taxed the trade: gold from the south went north; salt from Taghaza and cloth and horses from North Africa came south.',
    view: WEST,
    lands: [{ label: 'Ghana', color: C.ghana, polys: [GHANA], at: [-9.6, 13.9] }, { label: 'Takrur', color: C.takrur, polys: [TAKRUR], at: [-15.3, 14.2] }],
    routes: [
      { pts: W_ROUTE, color: C.caravan, arrow: true, label: 'camel caravans', labelAt: [-12.4, 22.4] },
      { pts: KOUMBI_SALT, color: C.caravan },
      { pts: E_ROUTE, color: C.caravan, arrow: true },
    ],
    tags: [{ text: 'gold ↑', at: [-10.6, 11.4] }, { text: 'salt ↓', at: [-2.4, 24.6] }, { text: 'ivory · slaves ↑', at: [-3.6, 11.4] }, { text: 'cloth · horses · copper ↓', at: [3.0, 33.0] }, { text: 'S A H A R A', at: [4.0, 21.0] }],
    cities: ['koumbi', 'awdaghust', 'sijilmasa', 'fez', 'taghaza', 'gao', 'tripoli', 'ghat'],
  },
  {
    title: 'The Mali Empire, c. 1235–1400s', chip: 'Mali',
    caption: 'Sundiata built Mali on the ruins of Ghana. Mali controlled the gold fields and the Niger River trade towns: Jenne, Timbuktu and Gao.',
    view: WEST,
    lands: [{ label: 'Mali', color: C.mali, polys: [MALI], at: [-9.6, 15.0] }],
    routes: [
      { pts: SALT_ROUTE, color: C.caravan, arrow: true, label: 'salt road', labelAt: [-8.6, 22.6] },
      { pts: TIMBUKTU_SALT, color: C.caravan },
      { pts: E_ROUTE, color: C.caravan, arrow: true },
    ],
    tags: [{ text: 'gold fields', at: [-10.6, 10.0] }, { text: 'mosques · scholars', at: [-0.6, 21.8] }, { text: 'Niger River', at: [-7.4, 12.6] }],
    cities: ['niani', 'jenne', 'timbuktu', 'gao', 'walata', 'taghaza', 'sijilmasa', 'tripoli'],
  },
  {
    title: 'Mansa Musa’s hajj, 1324–1325', chip: 'Mansa Musa’s hajj',
    caption: 'Mansa Musa crossed the Sahara with thousands of followers and so much gold that its value fell in Cairo. He returned with scholars and architects who built mosques in Timbuktu.',
    view: [-18, 4, 46, 36],
    lands: [{ label: 'Mali', color: C.mali, polys: [MALI], at: [-9.6, 14.6] }],
    routes: [{ pts: HAJJ, color: C.mali, arrow: true, label: 'hajj, 1324', labelAt: [12.0, 30.0] }],
    tags: [{ text: 'gold floods Cairo', at: [31.0, 26.2] }, { text: 'scholars · architects back to Mali', at: [10.0, 9.6] }],
    cities: ['niani', 'timbuktu', 'walata', 'tuat', 'cairo', 'medina', 'mecca'],
  },
  {
    title: 'Swahili city-states and the Indian Ocean, c. 1000–1500', chip: 'Swahili coast',
    caption: 'Monsoon winds carried dhows between the Swahili coast, Arabia and India. African gold, ivory and slaves went out; Indian cotton and Chinese silk and porcelain came in.',
    view: [20, -30, 80, 30],
    lands: [{ label: '', color: C.swahili, polys: [SWAHILI] }],
    routes: [
      { pts: COAST_LANE, color: C.sea, dashed: true },
      { pts: LANE_INDIA_N, color: C.sea, dashed: true, arrow: true },
      { pts: LANE_INDIA_S, color: C.sea, dashed: true, arrow: true, label: 'monsoon sea lanes', labelAt: [63.0, 3.0] },
      { pts: LANE_GULF, color: C.sea, dashed: true, arrow: true },
      { pts: LANE_CAMBAY, color: C.sea, dashed: true, arrow: true },
    ],
    tags: [{ text: 'gold ↑', at: [32.6, -23.6] }, { text: 'ivory · slaves ↑', at: [30.0, -10.5] }, { text: 'Indian cotton ↓', at: [64.0, 19.2] }, { text: 'Chinese silk · porcelain ↓', at: [62.0, -7.6] }, { text: 'Swahili coast', at: [47.0, -12.0] }],
    cities: ['mogadishu', 'malindi', 'mombasa', 'zanzibar', 'kilwa', 'sofala', 'aden', 'hormuz', 'cambay', 'calicut'],
  },
  {
    title: 'Great Zimbabwe and Kongo, c. 1200–1500', chip: 'Zimbabwe & Kongo',
    caption: 'Inland, Great Zimbabwe grew rich by sending gold to Sofala for the coast trade. On the Atlantic side, Kongo became the most centralized Bantu kingdom, with cowrie shells as royal money.',
    view: [5, -33, 45, -1],
    lands: [{ label: 'Zimbabwe kingdom', color: C.zim, polys: [ZIMBABWE], at: [29.6, -17.4] }, { label: 'Kongo', color: C.kongo, polys: [KONGO], at: [14.6, -8.0] }],
    routes: [{ pts: ZIM_GOLD, color: C.caravan, arrow: true }, { pts: ZIM_LANE, color: C.sea, dashed: true, arrow: true, label: 'to Kilwa', labelAt: [41.6, -13.0] }],
    tags: [{ text: 'gold · ivory · cattle', at: [29.8, -24.0] }, { text: 'cowrie money', at: [14.4, -11.0] }, { text: 'Congo River', at: [20.0, -2.4] }],
    cities: ['zimbabwe', 'sofala', 'kilwa', 'mbanza'],
  },
  {
    title: 'Christian Ethiopia, c. 350–1500', chip: 'Christian Ethiopia',
    caption: 'Aksum’s kings became Christian in the 300s and traded through the Red Sea port of Adulis. Later Ethiopian kings ruled from the highlands, carved churches from rock at Lalibela, and lived beside Muslim sultanates.',
    view: [28, 2, 56, 24],
    lands: [{ label: 'Ethiopia, c. 1450', color: C.eth, polys: [ETHIOPIA_1450], faint: true, at: [36.8, 8.0] }, { label: 'Aksum, c. 350', color: C.eth, polys: [AKSUM], at: [37.0, 17.6] }, { label: 'Muslim sultanates', color: C.adal, polys: [ADAL], at: [45.6, 7.0] }],
    routes: [{ pts: RED_SEA_LANE, color: C.sea, dashed: true, arrow: true, label: 'Red Sea trade', labelAt: [40.6, 21.2] }],
    tags: [{ text: 'rock-cut churches', at: [36.0, 11.0] }, { text: 'stone obelisks', at: [34.8, 14.6] }],
    cities: ['aksum', 'adulis', 'lalibela', 'aden', 'mogadishu'],
  },
  {
    title: 'Africa’s trade and the slave trade, c. 800–1500', chip: 'The slave trade',
    caption: 'Growing trade carried enslaved Africans north across the Sahara and east across the Indian Ocean, perhaps 10,000–20,000 people a year. Some reached Basra in Iraq, where Zanj slaves rose in revolt in 869.',
    view: [-20, -36, 60, 40],
    lands: [
      { label: 'Mali', color: C.mali, polys: [MALI], at: [-11.5, 14.2] }, { label: 'Hausa', color: C.hausa, polys: [HAUSA], at: [8.2, 14.8] },
      { label: 'Ethiopia', color: C.eth, polys: [ETHIOPIA_1450], at: [38.0, 9.0] }, { label: 'Zimbabwe', color: C.zim, polys: [ZIMBABWE], at: [29.8, -18.4] },
      { label: 'Kongo', color: C.kongo, polys: [KONGO], at: [14.4, -7.0] }, { label: '', color: C.swahili, polys: [SWAHILI] },
    ],
    routes: [
      { pts: SAHARA_SLAVES, color: C.caravan, arrow: true, label: 'across the Sahara', labelAt: [-6.6, 26.0] },
      { pts: SAHARA_SLAVES_E, color: C.caravan, arrow: true },
      { pts: ZANJ_LANE, color: C.sea, dashed: true, arrow: true, label: 'to Iraq', labelAt: [56.0, 10.0] },
    ],
    tags: [{ text: 'Zanj revolt, 869', at: [45.0, 34.0] }],
    cities: ['timbuktu', 'ife', 'benin', 'tripoli', 'sijilmasa', 'cairo', 'basra', 'kilwa', 'mogadishu', 'lalibela'],
  },
]

// base: the base map in src/geo; aspect: height / width of the map frame.
export default { base: 'world', aspect: 0.62, cities: CITIES, steps: STEPS }
