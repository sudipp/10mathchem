// Chapter 15 map layers (longitude, latitude). Territory outlines are drawn loosely over
// the sea: the map clips every territory to the coastline, so only land frontiers need care.
// Sources for frontiers: standard historical atlases (Harsha and the Chalukyas c. 640, the Ghaznavids c. 1030,
// the Delhi Sultanate under Muhammad bin Tughluq c. 1330, the Cholas c. 1030, Vijayanagara and the Bahmanis c. 1450,
// Srivijaya c. 800, Angkor c. 1200, Majapahit c. 1350 and Melaka c. 1500).

const CITIES = {
  kanauj: { name: 'Kanauj', at: [79.92, 27.05], big: true },
  thanesar: { name: 'Thanesar', at: [76.82, 29.97], side: 'left' },
  prayag: { name: 'Prayag', at: [81.85, 25.44], side: 'below' },
  nalanda: { name: 'Nalanda', at: [85.44, 25.13] },
  badami: { name: 'Badami', at: [75.68, 15.92], side: 'left' },
  kanchi: { name: 'Kanchipuram', at: [79.7, 12.83] },
  ghazni: { name: 'Ghazni', at: [68.42, 33.55], big: true, side: 'left' },
  multan: { name: 'Multan', at: [71.47, 30.2], side: 'left' },
  lahore: { name: 'Lahore', at: [74.35, 31.55] },
  debal: { name: 'Debal', at: [67.4, 24.75], side: 'left' },
  somnath: { name: 'Somnath', at: [70.4, 20.89], side: 'below' },
  mathura: { name: 'Mathura', at: [77.67, 27.49], side: 'left' },
  delhi: { name: 'Delhi', at: [77.2, 28.6], big: true },
  daulatabad: { name: 'Daulatabad', at: [75.21, 19.94] },
  madurai: { name: 'Madurai', at: [78.12, 9.93] },
  thanjavur: { name: 'Thanjavur', at: [79.14, 10.79] },
  vijayanagara: { name: 'Hampi', at: [76.46, 15.33], big: true },
  gulbarga: { name: 'Gulbarga', at: [76.83, 17.33] },
  calicut: { name: 'Calicut', at: [75.78, 11.25], side: 'left' },
  quilon: { name: 'Quilon', at: [76.6, 8.88], side: 'left' },
  cambay: { name: 'Cambay', at: [72.62, 22.3] },
  aden: { name: 'Aden', at: [45.03, 12.8], side: 'below' },
  hormuz: { name: 'Hormuz', at: [56.46, 27.1] },
  kilwa: { name: 'Kilwa', at: [39.51, -8.96], side: 'left' },
  mogadishu: { name: 'Mogadishu', at: [45.34, 2.05], side: 'left' },
  axum: { name: 'Axum', at: [38.72, 14.13], side: 'left' },
  malacca: { name: 'Melaka', at: [102.25, 2.2] },
  guangzhou: { name: 'Guangzhou', at: [113.26, 23.13], big: true },
  palembang: { name: 'Palembang', at: [104.75, -2.99], big: true },
  kedah: { name: 'Kedah', at: [100.36, 6.12], side: 'left' },
  ocEo: { name: 'Oc Eo', at: [105.15, 10.25], side: 'left' },
  angkor: { name: 'Angkor', at: [103.87, 13.41], big: true },
  ayutthaya: { name: 'Ayutthaya', at: [100.57, 14.35], side: 'left' },
  trowulan: { name: 'Trowulan', at: [112.38, -7.56], side: 'below' },
  pasai: { name: 'Pasai', at: [97.15, 5.15], side: 'left' },
  borobudur: { name: 'Borobudur', at: [110.2, -7.61], side: 'below' },
}

// ---------- territories ----------
const HARSHA = [[73.6, 30.8], [75.2, 32.2], [77.2, 31.4], [79.6, 30.0], [81.2, 28.8], [84.2, 27.4], [87.0, 26.6], [88.6, 26.0], [88.2, 24.2], [87.0, 22.8], [85.2, 23.0], [83.0, 23.2], [80.6, 23.0], [78.0, 23.4], [76.0, 24.4], [74.6, 26.0], [73.4, 28.0]]
const CHALUKYA = [[72.4, 21.6], [74.6, 21.9], [77.0, 21.9], [79.6, 21.6], [81.6, 20.0], [82.8, 18.4], [84.0, 17.6], [82.6, 15.8], [80.6, 15.2], [78.4, 14.6], [76.4, 14.0], [74.6, 13.6], [73.6, 13.6], [72.6, 17.0]]
const PALLAVA = [[76.4, 14.0], [78.4, 14.6], [80.6, 15.2], [81.0, 13.0], [80.4, 10.6], [79.2, 10.0], [78.0, 10.6], [77.0, 11.4], [76.6, 12.6]]
const ARAB_SIND = [[66.2, 25.6], [67.0, 27.6], [68.8, 29.0], [70.6, 30.4], [71.8, 30.6], [72.6, 29.6], [71.6, 28.0], [70.6, 26.2], [70.2, 24.6], [69.0, 23.4], [67.6, 23.6], [66.2, 24.6]]
const GHAZNAVID = [[57.0, 33.0], [56.6, 36.4], [59.0, 37.8], [62.0, 38.0], [66.0, 37.6], [69.6, 37.6], [71.4, 36.4], [73.0, 34.6], [74.6, 34.0], [75.8, 32.6], [75.6, 30.8], [73.6, 29.4], [72.4, 28.6], [70.6, 28.0], [68.4, 28.2], [66.6, 29.4], [64.0, 29.8], [61.0, 30.6], [59.0, 31.6]]
const DELHI_1330 = [[69.6, 23.8], [68.0, 25.6], [68.6, 28.0], [70.8, 30.6], [72.4, 33.6], [74.6, 33.9], [76.6, 32.4], [78.6, 30.8], [80.6, 29.3], [84.0, 27.4], [88.0, 26.6], [89.8, 26.0], [92.2, 24.6], [92.4, 21.6], [88.6, 21.0], [87.2, 21.6], [85.6, 22.4], [84.2, 21.8], [83.0, 19.6], [82.4, 17.6], [81.8, 16.0], [80.6, 14.6], [80.6, 12.0], [80.0, 10.0], [79.0, 8.6], [77.8, 8.8], [77.4, 10.4], [76.8, 11.8], [75.6, 12.8], [74.4, 14.8], [73.2, 17.2], [72.6, 19.8], [72.4, 21.6], [70.6, 20.6], [68.8, 22.0]]
const CHOLA = [[75.8, 12.6], [77.2, 14.2], [78.8, 15.2], [80.6, 16.0], [82.2, 17.2], [83.4, 18.2], [84.2, 17.6], [82.4, 15.8], [80.8, 14.8], [80.6, 12.4], [80.0, 10.4], [79.6, 9.2], [78.6, 8.4], [77.4, 7.8], [76.8, 8.8], [76.6, 10.2], [76.2, 11.4]]
const SRI_LANKA = [[79.4, 10.1], [82.2, 9.6], [82.4, 5.7], [79.4, 5.7]]
const VIJAYANAGARA = [[73.6, 15.8], [75.4, 16.4], [77.2, 16.2], [78.8, 16.1], [80.4, 16.4], [82.0, 16.9], [82.4, 15.6], [80.8, 14.6], [80.6, 12.4], [80.0, 10.4], [79.6, 9.2], [78.6, 8.4], [77.4, 7.8], [76.8, 8.8], [76.4, 10.2], [75.6, 12.2], [74.6, 14.0]]
const BAHMANI = [[72.6, 19.8], [72.8, 21.2], [75.2, 21.4], [77.6, 21.0], [79.6, 19.6], [80.6, 18.2], [81.6, 17.2], [80.4, 16.4], [78.8, 16.1], [77.2, 16.2], [75.4, 16.4], [73.6, 15.8], [73.2, 17.4]]
const DELHI_1450 = [[71.8, 32.2], [74.6, 32.6], [76.6, 31.4], [78.6, 30.2], [80.0, 28.6], [80.2, 26.8], [78.6, 26.0], [76.6, 26.6], [74.8, 28.0], [72.8, 29.0], [71.4, 30.2]]
const GUJARAT_S = [[68.4, 23.6], [70.0, 24.4], [72.4, 24.6], [74.4, 23.8], [74.2, 21.8], [72.8, 20.6], [70.6, 20.6], [68.6, 21.8]]
const BENGAL_S = [[86.6, 26.4], [88.4, 26.8], [90.4, 26.2], [92.4, 24.8], [92.6, 21.6], [88.6, 21.2], [87.0, 21.8], [86.2, 23.6]]
const FUNAN = [[102.8, 10.2], [103.8, 12.4], [105.4, 13.4], [106.8, 12.8], [107.6, 11.4], [107.2, 10.2], [106.8, 8.4], [104.6, 8.4]]
const SRIVIJAYA = [[96.6, 4.6], [98.6, 4.6], [99.8, 7.4], [100.6, 9.6], [99.0, 10.6], [99.6, 11.2], [101.6, 8.6], [103.6, 4.4], [104.8, 1.4], [106.8, -1.0], [107.4, -3.6], [106.8, -5.6], [107.6, -6.2], [108.2, -7.0], [107.8, -7.9], [106.0, -7.6], [104.6, -6.6], [102.0, -5.2], [100.6, -3.2], [99.0, -1.0], [97.6, 1.6]]
const KHMER = [[98.8, 13.2], [99.2, 15.6], [100.0, 18.0], [101.6, 18.8], [103.4, 18.4], [104.8, 17.0], [106.4, 16.2], [107.8, 15.0], [108.8, 13.4], [109.4, 11.6], [107.6, 10.4], [106.8, 8.4], [104.6, 8.4], [102.8, 10.2], [101.6, 12.4], [100.2, 12.6], [99.6, 11.8]]
const MAJAPAHIT = [[105.0, -5.6], [108.6, -6.0], [111.4, -6.2], [113.4, -6.6], [116.2, -7.8], [116.2, -9.0], [114.2, -9.0], [110.8, -8.4], [107.4, -8.0], [105.2, -7.2]]
const MAJAPAHIT_CLAIMS = [[95.0, 5.8], [98.2, 5.0], [104.8, 1.0], [108.6, -1.0], [109.4, 2.0], [111.0, 2.2], [113.4, 1.8], [116.2, 3.0], [118.6, 1.0], [118.2, -2.6], [117.0, -4.4], [114.0, -4.0], [111.0, -3.4], [108.6, -3.4], [106.2, -5.0], [104.8, -6.4], [100.6, -3.6], [97.0, 1.0]]
const MELAKA = [[99.8, 6.6], [102.2, 6.6], [103.6, 4.4], [104.6, 1.2], [103.6, -1.2], [102.6, -1.0], [101.2, 0.6], [100.2, 2.4], [99.8, 4.0]]

// ---------- routes ----------
const XUANZANG = [[66.8, 37.6], [69.2, 34.6], [71.6, 34.0], [74.4, 31.6], [76.8, 30.0], [79.9, 27.1], [85.4, 25.2]]
const MAHMUD_SOMNATH = [[68.42, 33.55], [70.2, 31.8], [71.47, 30.2], [72.1, 23.85], [70.4, 20.89]]
const MAHMUD_KANAUJ = [[68.42, 33.55], [71.6, 33.4], [74.35, 31.55], [76.82, 29.97], [77.67, 27.49], [79.92, 27.05]]
const ARAB_SEA = [[56.4, 26.4], [59.0, 24.0], [63.0, 23.8], [66.8, 24.2]]
const ARAB_CAMBAY = [[59.0, 24.0], [64.0, 22.2], [68.6, 20.6], [71.0, 20.2], [72.4, 21.0], [72.6, 21.7]]
const MONGOL_RAIDS = [[64.6, 33.4], [68.0, 33.0], [71.0, 32.6], [73.4, 31.8]]
const GANGES_RAID = [[79.45, 11.21], [80.4, 15.8], [83.0, 18.2], [85.6, 20.4], [87.6, 22.6], [88.2, 24.0]]
const CHOLA_FLEET = [[79.84, 10.77], [82.0, 9.2], [87.0, 7.6], [93.0, 7.0], [97.6, 6.4], [100.0, 6.0]]
const CHOLA_FLEET2 = [[97.6, 6.4], [99.6, 4.6], [101.8, 2.6], [104.0, 1.0], [105.0, -0.6], [105.4, -1.8], [104.95, -2.4]]
// Indian Ocean sea lanes
const RED_SEA = [[45.0, 12.4], [43.4, 12.6], [41.0, 15.6], [38.6, 20.0], [36.4, 24.0], [34.2, 27.6], [32.8, 29.6]]
const GULF = [[56.6, 26.4], [53.0, 26.8], [50.0, 28.8], [48.4, 29.8]]
const ADEN_CALICUT = [[45.2, 12.4], [52.0, 13.0], [60.0, 12.6], [68.0, 11.8], [75.4, 11.2]]
const HORMUZ_CAMBAY = [[56.6, 26.2], [58.8, 24.2], [63.0, 23.0], [68.4, 21.0], [70.8, 20.3], [72.3, 21.0], [72.55, 21.9]]
const AFRICA_COAST = [[39.8, -9.0], [40.6, -5.0], [42.6, -1.4], [45.6, 1.6], [48.6, 5.0], [50.8, 9.0], [51.8, 11.6], [48.0, 12.2], [45.4, 12.5]]
const COAST_INDIA = [[72.3, 21.0], [72.4, 18.0], [73.4, 15.0], [74.8, 12.4], [75.6, 10.2], [76.4, 8.4]]
const BAY = [[76.4, 8.4], [78.4, 6.8], [80.6, 5.4], [85.0, 5.6], [92.0, 6.2], [97.0, 6.2], [99.6, 4.6], [101.2, 3.0], [102.2, 2.0]]
const SOUTH_CHINA = [[102.4, 1.8], [104.6, 1.4], [106.0, 4.0], [108.6, 8.4], [110.2, 12.0], [111.2, 16.0], [112.6, 19.6], [113.4, 22.0]]
const SPICE = [[102.4, 1.6], [104.6, 0.4], [107.4, -2.4], [109.0, -4.8], [113.0, -5.4], [118.0, -6.4], [124.4, -4.6]]
// Southeast Asia
const STRAIT_ROUTE = [[90.6, 7.0], [95.0, 6.4], [97.6, 6.0], [99.6, 4.6], [101.6, 2.6], [103.6, 0.8], [104.8, 1.6], [106.0, 4.0], [108.6, 8.4], [110.2, 12.0], [111.2, 16.0], [112.6, 19.6], [113.4, 22.0]]
const TO_PALEMBANG = [[103.6, 0.8], [104.4, -1.0], [104.75, -2.4]]

// ---------- map steps (the animated map) ----------
// view: [lonMin, latMin, lonMax, latMax] to zoom in, or null for the whole map.
const C = { harsha: '#C99A3D', chalukya: '#4E7FA6', pallava: '#6E5A8F', arab: '#4E7A55', ghazni: '#7A3B22', delhi: '#B5482A', chola: '#6E5A8F', vijaya: '#C99A3D', bahmani: '#4E7A55', sea: '#2E6E9A', srivijaya: '#2E6E9A', funan: '#C99A3D', khmer: '#B5482A', maja: '#6E5A8F', melaka: '#4E7A55' }
const INDIA = [62, 6, 98, 34]
const STEPS = [
  {
    title: 'Harsha’s kingdom, c. 640', chip: 'Harsha', caption: 'After the Gupta collapse, King Harsha briefly reunites the north from his capital at Kanauj. The Chalukya king Pulakeshin II stops him at the Narmada River; the Pallavas rule the far south. The Chinese monk Xuanzang (dashed) visits Harsha’s court and studies at Nalanda.',
    view: INDIA,
    lands: [{ label: 'Harsha', color: C.harsha, polys: [HARSHA], at: [76.6, 25.4] }, { label: 'Chalukyas', color: C.chalukya, polys: [CHALUKYA], at: [77.4, 18.8] },
      { label: 'Pallavas', color: C.pallava, polys: [PALLAVA], at: [78.6, 12.0] }],
    routes: [{ pts: XUANZANG, color: C.sea, dashed: true, arrow: true, label: 'Xuanzang, 630s', labelAt: [70.2, 31.4] }],
    cities: ['kanauj', 'thanesar', 'prayag', 'nalanda', 'badami', 'kanchi'],
  },
  {
    title: 'Islam reaches India, 711–1030', chip: 'Islam arrives', caption: 'Arab armies conquer Sind in 711, and Arab merchants settle in ports like Cambay. After 1001 Mahmud of Ghazni raids deep into India from Afghanistan, plundering temples at Mathura, Kanauj and Somnath.',
    view: [56, 12, 92, 38],
    lands: [{ label: 'Arab Sind', color: C.arab, polys: [ARAB_SIND], at: [68.6, 26.4] }, { label: 'Mahmud of Ghazni', color: C.ghazni, polys: [GHAZNAVID], at: [62.6, 31.0] }],
    routes: [{ pts: MAHMUD_SOMNATH, color: C.ghazni, arrow: true, label: 'raid, 1025', labelAt: [74.4, 25.4] }, { pts: MAHMUD_KANAUJ, color: C.ghazni, arrow: true, label: 'raids, 1001–1027', labelAt: [80.2, 30.4] },
      { pts: ARAB_SEA, color: C.sea, dashed: true, arrow: true }, { pts: ARAB_CAMBAY, color: C.sea, dashed: true, arrow: true, label: 'Arab merchants', labelAt: [63.6, 19.8] }],
    tags: [{ text: 'temples plundered', at: [82.6, 28.6] }],
    cities: ['ghazni', 'multan', 'lahore', 'debal', 'cambay', 'somnath', 'mathura', 'kanauj'],
  },
  {
    title: 'The Delhi Sultanate, c. 1330', chip: 'Delhi Sultanate', caption: 'Turkish sultans rule from Delhi after 1206. Under Muhammad bin Tughluq the sultanate reaches its greatest size, but it depends on Hindu kings who pay tribute, and it must fight off Mongol raids from the northwest.',
    view: INDIA,
    lands: [{ label: 'Delhi Sultanate', color: C.delhi, polys: [DELHI_1330], at: [79.6, 22.6] }],
    routes: [{ pts: MONGOL_RAIDS, color: '#24303F', arrow: true, label: 'Mongol raids', labelAt: [66.2, 31.6] }],
    tags: [{ text: 'Hindu kings pay tribute', at: [78.4, 18.0] }],
    cities: ['delhi', 'lahore', 'multan', 'daulatabad', 'madurai'],
  },
  {
    title: 'The Chola kingdom, c. 1030', chip: 'Cholas', caption: 'The Hindu Chola kings of the south build a sea power. Rajendra I raids the Ganges (1019–1023) and sends a fleet across the Bay of Bengal to attack Srivijaya (1025), which controls the straits to China.',
    view: [66, -5, 108, 26],
    lands: [{ label: 'Chola kingdom', color: C.chola, polys: [CHOLA, SRI_LANKA], at: [77.2, 15.0] }],
    routes: [{ pts: GANGES_RAID, color: C.chola, arrow: true, label: 'to the Ganges, 1019–23', labelAt: [87.6, 18.2] },
      { pts: CHOLA_FLEET, color: C.sea, dashed: true, arrow: true, label: 'fleet vs Srivijaya, 1025', labelAt: [89.0, 9.0] }, { pts: CHOLA_FLEET2, color: C.sea, dashed: true, arrow: true }],
    tags: [{ text: 'temple cities, irrigation', at: [73.0, 8.6] }],
    cities: ['thanjavur', 'madurai', 'kedah', 'palembang'],
  },
  {
    title: 'Vijayanagara and the sultanates, c. 1450', chip: 'Vijayanagara', caption: 'Founded in 1336 by two brothers who had served the Delhi Sultanate, Hindu Vijayanagara rules the south from its great capital (today’s Hampi). To its north the Muslim Bahmani Sultanate rivals it, while the Delhi Sultanate has shrunk to the northwest.',
    view: INDIA,
    lands: [{ label: 'Vijayanagara', color: C.vijaya, polys: [VIJAYANAGARA], at: [78.2, 12.8] }, { label: 'Bahmani Sultanate', color: C.bahmani, polys: [BAHMANI], at: [76.8, 19.4] },
      { label: 'Delhi Sultanate', color: C.delhi, polys: [DELHI_1450], at: [75.4, 31.0] }, { label: '', color: C.delhi, polys: [GUJARAT_S, BENGAL_S], faint: true }],
    tags: [{ text: 'other sultanates', at: [71.4, 22.6] }, { text: 'other sultanates', at: [89.4, 23.8] }],
    cities: ['vijayanagara', 'gulbarga', 'delhi', 'calicut'],
  },
  {
    title: 'The Indian Ocean trading world, 600–1500', chip: 'Indian Ocean', caption: 'Monsoon winds blow from the southwest in summer and from the northeast in winter, so ships cross the ocean in stages. Cosmopolitan ports (emporia) link East Africa, Arabia, India, Southeast Asia and China.',
    view: [30, -15, 125, 35],
    routes: [...[RED_SEA, GULF, ADEN_CALICUT, HORMUZ_CAMBAY, AFRICA_COAST, COAST_INDIA, BAY, SPICE].map(pts => ({ pts, color: C.sea, dashed: true })), { pts: SOUTH_CHINA, color: C.sea, dashed: true, arrow: true }],
    tags: [{ text: 'pepper · cotton · steel', at: [65.6, 16.4] }, { text: 'silk · porcelain', at: [112.4, 27.6] }, { text: 'cloves · nutmeg', at: [117.6, -9.2] }, { text: 'gold · ivory', at: [34.4, -4.0] },
      { text: 'horses · incense', at: [48.6, 20.0] }, { text: '↗ SW monsoon: summer', at: [62.6, 4.4] }, { text: '↙ NE monsoon: winter', at: [88.0, 12.0] }],
    cities: ['aden', 'hormuz', 'cambay', 'calicut', 'quilon', 'malacca', 'guangzhou', 'kilwa', 'mogadishu', 'axum'],
  },
  {
    title: 'Funan and Srivijaya, 100–1025', chip: 'Srivijaya', caption: 'Funan grew rich in the Mekong delta on trade between India and China. Later Srivijaya, based at Palembang on Sumatra, controlled the Strait of Malacca and taxed every ship. It was also a great Buddhist center.',
    view: [90, -10, 118, 20],
    lands: [{ label: 'Funan (100–550)', color: C.funan, polys: [FUNAN], at: [105.4, 14.8] }, { label: 'Srivijaya (670–1025)', color: C.srivijaya, polys: [SRIVIJAYA], at: [101.0, -4.6] }],
    routes: [{ pts: STRAIT_ROUTE, color: '#7A3B22', dashed: true, arrow: true, label: 'India–China sea route', labelAt: [94.4, 7.8] }, { pts: TO_PALEMBANG, color: '#7A3B22', dashed: true }],
    tags: [{ text: 'tolls on every ship', at: [99.2, 0.4] }, { text: 'Buddhist monks: 1,000+', at: [114.8, -4.8] }],
    cities: ['ocEo', 'palembang', 'kedah', 'borobudur'],
  },
  {
    title: 'Angkor, Majapahit and Melaka, 1100–1500', chip: 'Angkor & Melaka', caption: 'Angkor’s Khmer kings grow rich on irrigated rice and build Angkor Wat. Majapahit rules Java and claims the islands. After 1400 Melaka controls the strait, adopts Islam, and Islam spreads along the trade routes.',
    view: [90, -10, 122, 22],
    lands: [{ label: 'Khmer (Angkor)', color: C.khmer, polys: [KHMER], at: [104.6, 15.6] }, { label: 'Majapahit', color: C.maja, polys: [MAJAPAHIT], at: [109.0, -5.0] },
      { label: '', color: C.maja, polys: [MAJAPAHIT_CLAIMS], faint: true }, { label: 'Melaka sultanate', color: C.melaka, polys: [MELAKA], at: [104.6, 5.6] }],
    tags: [{ text: 'Islam spreads by trade and Sufis', at: [93.4, 9.6] }, { text: 'Majapahit claims', at: [113.6, -1.6] }, { text: 'Angkor Wat, 1100s', at: [107.8, 10.6] }],
    cities: ['angkor', 'ayutthaya', 'malacca', 'pasai', 'trowulan'],
  },
]

// base: the base map in src/geo; aspect: height / width of the map frame.
export default { base: 'world', aspect: 0.62, cities: CITIES, steps: STEPS }
