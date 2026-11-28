// Chapter 14 map layers (longitude, latitude). Territory outlines are drawn loosely over
// the sea: the map clips every territory to the coastline, so only land frontiers need care.
// Sources for frontiers: standard historical atlases (Sui and Tang c. 610 / 750, Northern Song c. 1100, Jin–Southern Song after 1142).

const CITIES = {
  changan: { name: 'Chang’an', at: [108.94, 34.27], big: true, side: 'left' },
  luoyang: { name: 'Luoyang', at: [112.45, 34.62] },
  kaifeng: { name: 'Kaifeng', at: [114.31, 34.8], big: true },
  hangzhou: { name: 'Hangzhou', at: [120.16, 30.27], big: true },
  yangzhou: { name: 'Yangzhou', at: [119.42, 32.39] },
  zhuojun: { name: 'Zhuojun (Beijing)', at: [116.4, 39.9] },
  fanyang: { name: 'Fanyang (Beijing)', at: [116.4, 39.9] },
  yanjing: { name: 'Yanjing (Beijing)', at: [116.4, 39.9] },
  chengdu: { name: 'Chengdu', at: [104.07, 30.67], side: 'left' },
  guangzhou: { name: 'Guangzhou', at: [113.26, 23.13], side: 'left' },
  quanzhou: { name: 'Quanzhou', at: [118.59, 24.91] },
  dunhuang: { name: 'Dunhuang', at: [94.66, 40.14], side: 'below' },
  kashgar: { name: 'Kashgar', at: [75.99, 39.47], side: 'left' },
  kucha: { name: 'Kucha', at: [82.96, 41.72] },
  talas: { name: 'Talas', at: [71.37, 42.9] },
  samarkand: { name: 'Samarkand', at: [66.96, 39.65], side: 'below' },
  gandhara: { name: 'Gandhara', at: [71.6, 34.0], side: 'below' },
  pyongyang: { name: 'Pyongyang', at: [125.75, 39.02] },
  gyeongju: { name: 'Gyeongju', at: [129.21, 35.86] },
  kaesong: { name: 'Kaesong', at: [126.55, 37.97], side: 'left' },
  nara: { name: 'Nara', at: [135.8, 34.69], side: 'below' },
  naraheian: { name: 'Nara · Heian (Kyoto)', at: [135.8, 34.85], side: 'below' },
  kamakura: { name: 'Kamakura', at: [139.55, 35.32] },
  dala: { name: 'Dai La (Hanoi)', at: [105.85, 21.03], side: 'left' },
  thanglong: { name: 'Thang Long (Hanoi)', at: [105.85, 21.03], side: 'left' },
  vijaya: { name: 'Vijaya (Champa)', at: [109.1, 13.9] },
  xingqing: { name: 'Xingqing', at: [106.27, 38.47], side: 'left' },
  shangjing: { name: 'Shangjing', at: [119.2, 43.97] },
  huining: { name: 'Huining', at: [126.95, 45.5] },
}

// ---------- territories ----------
// Tang China c. 750 (the Sui held almost the same core c. 610): Ordos loop, Hexi corridor to Dunhuang, Annam in the south.
const CHINA_CORE = [
  [121.5, 41.4], [119.5, 41.9], [117.0, 41.6], [114.0, 41.3], [111.5, 41.0], [110.0, 41.6], [107.5, 41.3], [106.0, 39.6], [104.0, 39.5],
  [101.0, 40.0], [98.5, 40.6], [96.0, 41.0], [94.0, 40.8], [93.4, 40.0], [94.0, 39.3], [97.0, 39.0], [99.5, 38.3], [101.5, 37.3],
  [102.5, 36.0], [103.0, 34.5], [102.8, 32.5], [102.5, 30.5], [102.0, 28.4], [103.5, 27.1], [104.4, 25.5], [105.4, 24.0], [104.2, 22.8],
  [103.0, 22.3], [102.3, 21.6], [103.5, 20.2], [104.6, 19.0], [105.6, 18.0], [106.6, 17.0], [108.2, 17.5], [110.0, 17.8], [111.5, 18.8],
  [113.5, 21.5], [117.0, 22.5], [119.5, 24.0], [120.3, 25.6], [123.0, 30.0], [123.0, 37.0], [122.8, 38.2], [119.5, 38.8], [120.5, 40.6],
]
const PROTECTORATES = [[74.5, 37.2], [74.5, 40.5], [76.0, 41.5], [80.0, 42.5], [83.0, 44.5], [86.0, 45.5], [90.0, 45.5], [93.5, 44.0], [95.5, 42.5], [96.0, 41.0], [94.0, 40.8], [93.4, 40.0], [93.5, 39.0], [90.0, 38.0], [85.0, 37.0], [80.0, 36.8], [77.0, 37.2]]
const TIBET = [[77.5, 35.5], [80.5, 36.2], [86.0, 36.5], [91.0, 37.6], [93.5, 38.8], [97.0, 38.7], [99.5, 38.1], [101.5, 37.1], [102.4, 35.8], [102.8, 34.3], [102.6, 32.4], [102.3, 30.4], [101.8, 28.4],
  [100.5, 27.0], [98.5, 27.8], [96.0, 28.3], [93.0, 27.6], [91.5, 26.9], [89.0, 27.0], [88.0, 27.8], [86.0, 27.9], [83.0, 28.6], [81.0, 30.0], [79.0, 31.0], [78.5, 32.8]]
const STEPPE = [[88.0, 46.0], [90.0, 50.5], [97.0, 51.5], [105.0, 51.5], [112.0, 50.5], [118.0, 49.0], [120.0, 46.0], [119.5, 41.9], [117.0, 41.6], [114.0, 41.3], [111.5, 41.0], [110.0, 41.6], [107.5, 41.3], [104.0, 41.8], [99.0, 42.5], [95.0, 43.5], [91.0, 45.5]]
const GOGURYEO = [[122.0, 40.9], [122.6, 42.6], [124.0, 43.6], [126.0, 44.2], [128.5, 43.8], [130.5, 42.6], [129.8, 41.0], [128.8, 40.2], [127.8, 39.0], [126.8, 37.7], [125.5, 37.5], [124.5, 37.9], [122.5, 38.5], [121.0, 39.2]]
const SOUTH_KOREA_600 = [[124.5, 37.9], [125.5, 37.5], [126.8, 37.7], [127.8, 39.0], [129.2, 39.0], [130.5, 36.0], [129.8, 34.6], [126.5, 33.0], [125.3, 33.6], [124.2, 35.0]]
const SILLA = [[124.0, 38.7], [125.3, 38.9], [126.5, 39.1], [127.6, 39.5], [129.0, 39.2], [130.5, 36.0], [129.8, 34.6], [126.5, 33.0], [125.3, 33.6], [124.2, 35.0]]
const GORYEO = [[124.0, 39.9], [125.5, 40.3], [127.0, 40.0], [128.0, 39.9], [129.5, 39.7], [130.5, 36.0], [129.8, 34.6], [126.5, 33.0], [125.3, 33.6], [124.2, 35.0]]
const JAPAN = [[129.3, 31.0], [129.5, 34.0], [131.0, 34.6], [133.0, 35.8], [136.0, 36.8], [138.5, 38.2], [140.0, 39.8], [142.2, 39.6], [141.5, 37.5], [141.0, 35.5], [139.5, 34.5], [137.0, 33.8], [135.0, 33.0], [133.0, 32.5], [131.5, 30.8]]
const CHAMPA = [[106.2, 17.3], [107.6, 17.8], [110.5, 15.5], [109.8, 11.5], [108.5, 10.6], [107.4, 11.2], [107.5, 13.5], [107.2, 15.0]]
const ANNAM = [[102.3, 22.4], [104.2, 22.8], [105.4, 23.3], [106.6, 22.8], [108.0, 21.5], [107.8, 18.5], [107.0, 17.0], [105.6, 18.0], [104.0, 19.5], [103.0, 21.0]]
const AN_LUSHAN = [[113.5, 36.5], [114.0, 40.5], [117.0, 41.5], [119.5, 40.5], [119.0, 39.0], [117.5, 38.5], [116.5, 37.5], [115.0, 36.0]]
// Song, Liao and Xi Xia c. 1100
const SONG_N = [
  [117.8, 38.8], [116.3, 38.9], [115.3, 39.0], [114.3, 39.2], [113.3, 39.4], [112.4, 39.1], [111.3, 39.3], [110.3, 39.6], [110.0, 38.0], [108.5, 37.3],
  [107.0, 36.6], [106.0, 36.0], [104.5, 35.9], [103.6, 35.9], [102.8, 34.8], [102.6, 32.4], [102.3, 30.4], [102.0, 28.4], [103.5, 27.1], [104.4, 25.5],
  [105.4, 24.0], [106.6, 22.8], [108.0, 21.5], [109.5, 20.0], [108.4, 18.0], [111.5, 18.5], [113.5, 21.5], [117.0, 22.5], [119.5, 24.0], [120.3, 25.6],
  [123.0, 30.0], [123.0, 37.0], [122.8, 38.2], [119.5, 38.6],
]
const LIAO = [
  [117.8, 38.8], [116.3, 38.9], [115.3, 39.0], [114.3, 39.2], [113.3, 39.4], [112.4, 39.1], [111.3, 39.3], [110.3, 39.6], [109.5, 40.8], [107.0, 41.5], [104.0, 42.0],
  [100.0, 42.2], [97.0, 45.5], [99.0, 48.5], [105.0, 50.0], [112.0, 50.5], [118.0, 51.0], [122.0, 52.5], [127.0, 50.5], [131.0, 47.5], [133.0, 45.0], [131.0, 43.0],
  [130.0, 42.5], [128.0, 41.0], [125.5, 40.3], [124.0, 39.9], [122.5, 38.5], [119.5, 38.6],
]
const XI_XIA = [[110.3, 39.6], [110.0, 38.0], [108.5, 37.3], [107.0, 36.6], [106.0, 36.0], [104.5, 35.9], [103.5, 36.2], [102.0, 37.0], [100.0, 38.0], [97.0, 38.8], [94.0, 39.3], [93.0, 40.0], [93.5, 41.5], [96.0, 42.0], [100.0, 42.2], [104.0, 42.0], [107.0, 41.5], [109.5, 40.8]]
const DAI_VIET = [[102.3, 22.4], [103.0, 22.5], [104.2, 22.8], [105.4, 23.3], [106.6, 22.8], [108.0, 21.5], [107.8, 18.5], [107.0, 17.0], [105.6, 18.0], [104.0, 19.5], [103.0, 21.0]]
// Jin and Southern Song after the treaty of 1142 (frontier along the Huai River and the Qinling)
const SONG_JIN_LINE = [[122.0, 33.8], [119.5, 33.4], [117.5, 32.9], [116.0, 32.6], [114.5, 32.2], [113.0, 32.4], [111.5, 32.9], [110.0, 33.2], [108.0, 33.6], [106.5, 33.9], [105.0, 34.3]]
const SONG_S = [...SONG_JIN_LINE, [104.0, 34.0], [103.0, 33.5], [102.6, 32.4], [102.3, 30.4], [102.0, 28.4], [103.5, 27.1], [104.4, 25.5], [105.4, 24.0], [106.6, 22.8], [108.0, 21.5],
  [109.5, 20.0], [108.4, 18.0], [111.5, 18.5], [113.5, 21.5], [117.0, 22.5], [119.5, 24.0], [120.3, 25.6], [123.0, 30.0]]
const JIN = [...SONG_JIN_LINE, [104.5, 35.9], [106.0, 36.0], [107.0, 36.6], [108.5, 37.3], [110.0, 38.0], [110.3, 39.6], [109.5, 40.8], [107.0, 41.5], [111.0, 42.5], [115.0, 44.5],
  [118.0, 46.5], [120.0, 48.5], [122.0, 50.0], [127.0, 50.5], [133.0, 48.5], [135.0, 46.0], [133.0, 43.0], [130.5, 42.5], [128.0, 41.0], [125.5, 40.3], [124.0, 39.9], [122.5, 38.0], [123.5, 36.5]]

// ---------- routes ----------
const CANAL_SOUTH = [[120.16, 30.27], [120.62, 31.3], [119.45, 32.2], [119.42, 32.39], [119.0, 33.3], [118.5, 33.4], [117.0, 33.65], [115.65, 34.4], [114.31, 34.8], [113.4, 34.9], [112.45, 34.62]]
const CANAL_NORTH = [[113.4, 34.9], [113.9, 35.3], [114.6, 36.0], [115.7, 36.8], [116.3, 37.45], [116.85, 38.3], [117.1, 39.1], [116.4, 39.9]]
const CANAL_WEST = [[112.45, 34.62], [110.4, 34.6], [108.94, 34.27]]
const SUI_KOREA = [[116.4, 39.9], [119.0, 40.6], [121.5, 41.5], [123.5, 41.5], [125.0, 40.6], [125.75, 39.1]]
const TANG_WEST = [[108.94, 34.27], [106.2, 35.0], [103.8, 36.06], [102.6, 37.9], [100.4, 38.9], [97.5, 39.8], [94.66, 40.14], [93.5, 42.8], [89.2, 42.9], [86.1, 41.9], [82.96, 41.72], [79.0, 41.2], [75.99, 39.47], [73.5, 41.5], [71.6, 42.7]]
const REBELS = [[116.4, 39.9], [115.5, 38.0], [114.5, 36.0], [113.4, 35.2], [112.45, 34.62], [110.4, 34.6], [109.2, 34.3]]
const FLIGHT = [[108.94, 34.27], [107.5, 33.0], [106.0, 32.0], [104.3, 30.8]]
const UIGHURS = [[106.0, 44.0], [107.0, 40.5], [108.3, 37.0], [108.9, 34.6]]
const JURCHEN = [[126.95, 45.5], [124.0, 43.0], [121.0, 41.0], [118.0, 40.0], [116.4, 39.9], [115.5, 37.5], [114.5, 35.2]]
const COURT_FLEES = [[114.31, 34.8], [116.5, 33.5], [118.8, 32.05], [120.0, 30.5]]
const CHAMPA_RICE = [[109.1, 13.9], [110.2, 16.5], [111.5, 19.5], [114.5, 21.8], [117.5, 23.8], [118.5, 24.8]]
const SONG_CANAL = [[120.16, 30.27], [120.62, 31.3], [119.45, 32.2], [119.42, 32.39], [119.0, 33.3], [118.5, 33.4], [117.0, 33.65], [115.65, 34.4], [114.31, 34.8]]
const SEA_SOUTH = [[118.59, 24.91], [117.0, 22.0], [113.5, 18.5], [111.0, 13.0], [107.0, 8.0]]
const SEA_CANTON = [[113.26, 23.13], [113.3, 21.0], [112.36, 16.0]]
const SEA_JAPAN = [[122.2, 30.0], [124.5, 30.8], [127.5, 32.3], [130.0, 33.4]]
const BUDDHISM = [[71.6, 34.0], [73.5, 36.0], [74.8, 38.0], [75.99, 39.47], [79.0, 41.2], [82.96, 41.72], [86.1, 41.9], [89.2, 42.9], [93.5, 42.8], [94.66, 40.14],
  [97.5, 39.8], [100.4, 38.9], [102.6, 37.9], [103.8, 36.06], [106.2, 35.0], [108.94, 34.27]]
const TO_KOREA_JAPAN = [[112.45, 34.62], [116.5, 36.0], [120.0, 37.0], [122.5, 37.2], [125.0, 36.8], [126.5, 35.6], [128.2, 34.6], [131.0, 34.0], [133.5, 34.2], [135.6, 34.6]]
const ENVOYS_JAPAN = [[135.6, 34.6], [133.0, 34.0], [130.3, 33.5], [127.5, 31.5], [123.5, 31.5], [121.3, 31.8], [119.42, 32.39]]
const ENVOYS_SILLA = [[129.21, 35.86], [127.5, 35.0], [126.0, 35.6], [124.0, 36.8], [121.5, 37.3], [118.0, 36.5], [114.5, 35.2], [112.45, 34.62], [110.4, 34.6], [109.2, 34.3]]
const ENVOYS_ANNAM = [[105.85, 21.03], [108.5, 22.8], [110.3, 25.3], [112.5, 28.2], [112.0, 31.0], [110.5, 33.0], [109.2, 34.1]]

// ---------- map steps (the animated map) ----------
// view: [lonMin, latMin, lonMax, latMax] to zoom in, or null for the whole map.
const C = { china: '#B5482A', prot: '#C99A3D', tibet: '#6E5A8F', steppe: '#4E7A55', korea: '#4E7FA6', japan: '#2E6E9A', viet: '#6E5A8F', champa: '#C99A3D', rebel: '#7A3B22', route: '#7A3B22', sea: '#2E6E9A' }
const STEPS = [
  {
    title: 'Sui reunification, 589', chip: 'Sui', caption: 'The Sui reunite north and south China in 589 and link the river systems with the Grand Canal, about 2,000 km long. Three failed invasions of Goguryeo (612–614) help bring the dynasty down.',
    view: [96, 17, 136, 46],
    lands: [{ label: 'Sui China', color: C.china, polys: [CHINA_CORE], at: [109.5, 28.0] }, { label: 'Turks', color: C.steppe, polys: [STEPPE], at: [106.0, 44.3] },
      { label: 'Goguryeo', color: C.tibet, polys: [GOGURYEO], at: [127.4, 42.7] }, { label: 'Silla & Baekje', color: C.korea, polys: [SOUTH_KOREA_600], at: [128.0, 36.2] }, { label: 'Japan', color: C.japan, polys: [JAPAN], at: [133.6, 34.3] }],
    routes: [{ pts: CANAL_SOUTH, color: C.sea, label: 'Grand Canal', labelAt: [114.6, 33.3] }, { pts: CANAL_NORTH, color: C.sea }, { pts: CANAL_WEST, color: C.sea },
      { pts: SUI_KOREA, color: C.rebel, arrow: true, dashed: true, label: 'Wars in Korea, 612–614', labelAt: [117.0, 42.4] }],
    tags: [{ text: 'rice shipped north', at: [117.6, 27.4] }],
    cities: ['changan', 'luoyang', 'yangzhou', 'hangzhou', 'zhuojun', 'pyongyang'],
  },
  {
    title: 'Tang at its height, c. 750', chip: 'Tang', caption: 'From Chang’an the Tang rule China and, through protectorates, the oases of Central Asia. In 751 an Abbasid army defeats them at the Talas River. Tibet and the Uighurs are powerful neighbors.',
    view: [62, 15, 148, 52],
    lands: [{ label: 'Tang China', color: C.china, polys: [CHINA_CORE], at: [112.0, 29.0] }, { label: 'Protectorates', color: C.prot, polys: [PROTECTORATES], at: [84.5, 38.2] },
      { label: 'Tibetan Empire', color: C.tibet, polys: [TIBET], at: [88.5, 32.0] }, { label: 'Uighurs', color: C.steppe, polys: [STEPPE], at: [103.0, 46.5] }],
    routes: [{ pts: TANG_WEST, color: C.route, label: 'Silk Roads', labelAt: [100.0, 40.4] }],
    tags: [{ text: 'Abbasids win, 751', at: [70.5, 44.6] }],
    cities: ['changan', 'luoyang', 'dunhuang', 'kucha', 'kashgar', 'talas', 'samarkand', 'guangzhou'],
  },
  {
    title: 'The An Lushan rebellion, 755–763', chip: 'Rebellion', caption: 'An Lushan’s armies march from the northeast and take Luoyang and Chang’an; the emperor flees to Sichuan. Uighur horsemen help crush the revolt, then loot.',
    view: [99, 25, 126, 46],
    lands: [{ label: '', color: C.china, polys: [CHINA_CORE], faint: true }, { label: 'An Lushan’s base', color: C.rebel, polys: [AN_LUSHAN], at: [116.0, 41.4] }, { label: 'Uighurs', color: C.steppe, polys: [STEPPE], at: [111.0, 43.6] }],
    routes: [{ pts: REBELS, color: C.rebel, arrow: true, label: 'Rebels, 755–756', labelAt: [115.9, 36.6] }, { pts: FLIGHT, color: C.china, arrow: true, dashed: true, label: 'Emperor flees, 756', labelAt: [104.2, 32.6] },
      { pts: UIGHURS, color: C.steppe, arrow: true, label: 'Uighur horsemen', labelAt: [104.6, 39.4] }],
    cities: ['fanyang', 'luoyang', 'changan', 'chengdu'],
  },
  {
    title: 'Song China and its rivals, c. 1100', chip: 'Song', caption: 'The Song rule a smaller China from Kaifeng. The Khitan Liao and the Tanggut Xi Xia hold the north and northwest, and the Song pay them silver and silk to keep the peace.',
    view: [90, 15, 140, 54],
    lands: [{ label: 'Song', color: C.china, polys: [SONG_N], at: [112.0, 28.5] }, { label: 'Liao (Khitan)', color: C.steppe, polys: [LIAO], at: [116.0, 46.0] },
      { label: 'Xi Xia', color: C.prot, polys: [XI_XIA], at: [99.0, 40.6] }, { label: 'Goryeo', color: C.korea, polys: [GORYEO], at: [127.7, 36.7] }, { label: 'Dai Viet', color: C.viet, polys: [DAI_VIET], at: [105.2, 18.6] }],
    tags: [{ text: 'silver & silk paid north', at: [114.5, 37.6] }],
    cities: ['kaifeng', 'hangzhou', 'yanjing', 'xingqing', 'shangjing', 'kaesong', 'thanglong'],
  },
  {
    title: 'Jin and Southern Song, 1127–1279', chip: 'Southern Song', caption: 'In 1127 the Jurchen (Jin dynasty) take Kaifeng and the north. The Song court flees south and rules from Hangzhou until the Mongols conquer it in 1279.',
    view: [90, 15, 140, 54],
    lands: [{ label: 'Southern Song', color: C.china, polys: [SONG_S], at: [112.5, 27.5] }, { label: 'Jin (Jurchen)', color: C.prot, polys: [JIN], at: [113.5, 43.0] },
      { label: 'Xi Xia', color: C.steppe, polys: [XI_XIA], at: [99.0, 40.6] }, { label: 'Goryeo', color: C.korea, polys: [GORYEO], at: [127.7, 36.7] }, { label: 'Dai Viet', color: C.viet, polys: [DAI_VIET], at: [105.2, 18.6] }],
    routes: [{ pts: JURCHEN, color: C.rebel, arrow: true, label: 'Jurchen, 1127', labelAt: [127.0, 43.2] }, { pts: COURT_FLEES, color: C.china, arrow: true, dashed: true, label: 'Court flees south', labelAt: [114.6, 32.6] }],
    tags: [{ text: 'Mongols', at: [104.0, 47.5] }],
    cities: ['kaifeng', 'hangzhou', 'yanjing', 'huining', 'xingqing'],
  },
  {
    title: 'The Song economy, c. 1100', chip: 'Economy', caption: 'Fast-ripening Champa rice, canals, iron, printing and paper money power a commercial revolution. Ships from Quanzhou and Guangzhou trade with Southeast Asia, India and the Islamic world.',
    view: [96, 6, 142, 42],
    lands: [{ label: '', color: C.china, polys: [SONG_N], faint: true }, { label: 'Champa', color: C.champa, polys: [CHAMPA], at: [105.6, 15.0] }],
    routes: [{ pts: CHAMPA_RICE, color: '#4E7A55', arrow: true, dashed: true, label: 'Champa rice', labelAt: [114.0, 18.6] }, { pts: SONG_CANAL, color: C.sea, label: 'Grand Canal', labelAt: [113.6, 33.1] },
      { pts: SEA_SOUTH, color: C.sea, arrow: true, dashed: true, label: 'to Southeast Asia & India', labelAt: [115.5, 11.5] }, { pts: SEA_CANTON, color: C.sea, dashed: true }, { pts: SEA_JAPAN, color: C.sea, arrow: true, dashed: true, label: 'to Japan & Korea', labelAt: [133.5, 31.6] }],
    tags: [{ text: 'porcelain', at: [117.2, 29.0] }, { text: 'silk · printing', at: [116.4, 30.9] }, { text: 'tea', at: [117.9, 26.4] }, { text: 'paper money', at: [104.2, 29.2] },
      { text: 'iron · coal', at: [112.8, 37.6] }, { text: 'compass', at: [120.6, 21.4] }, { text: 'gunpowder', at: [108.6, 36.0] }],
    cities: ['kaifeng', 'hangzhou', 'yangzhou', 'quanzhou', 'guangzhou', 'chengdu', 'vijaya'],
  },
  {
    title: 'Buddhism reaches China, 400–900', chip: 'Buddhism', caption: 'Monks and merchants carry Buddhism from India across the Silk Roads to Dunhuang and Chang’an, and from China on to Korea and Japan.',
    view: [68, 18, 142, 50],
    lands: [{ label: '', color: C.china, polys: [CHINA_CORE], faint: true }],
    routes: [{ pts: BUDDHISM, color: C.tibet, arrow: true, label: 'Buddhism from India', labelAt: [86.0, 43.2] }, { pts: TO_KOREA_JAPAN, color: C.tibet, arrow: true, dashed: true, label: 'to Korea & Japan', labelAt: [122.0, 38.4] }],
    tags: [{ text: 'Mogao caves', at: [95.2, 37.7] }, { text: 'Chan · Pure Land', at: [113.5, 30.0] }],
    cities: ['gandhara', 'kashgar', 'kucha', 'dunhuang', 'changan', 'luoyang', 'gyeongju', 'nara'],
  },
  {
    title: 'China’s neighbors, c. 700–1200', chip: 'Neighbors', caption: 'Envoys, monks and students from Silla Korea, Japan and Vietnam bring Chinese writing, Confucianism and Buddhism home. Vietnam breaks free in 939; Japan moves its court to Heian, and later warriors rule from Kamakura.',
    view: [98, 10, 145, 44],
    lands: [{ label: '', color: C.china, polys: [CHINA_CORE], faint: true }, { label: 'Silla', color: C.korea, polys: [SILLA], at: [127.3, 37.4] }, { label: 'Japan', color: C.japan, polys: [JAPAN], at: [138.2, 37.6] },
      { label: 'Annam (Vietnam)', color: C.viet, polys: [ANNAM], at: [103.6, 19.6] }, { label: 'Champa', color: C.champa, polys: [CHAMPA], at: [108.9, 15.6] }],
    routes: [{ pts: ENVOYS_JAPAN, color: C.japan, arrow: true, dashed: true, label: 'Japanese envoys', labelAt: [127.6, 30.8] }, { pts: ENVOYS_SILLA, color: C.korea, arrow: true, dashed: true, label: 'Silla envoys', labelAt: [120.2, 38.2] },
      { pts: ENVOYS_ANNAM, color: C.viet, arrow: true, dashed: true }],
    tags: [{ text: 'writing · Confucianism · Buddhism', at: [125.5, 26.6] }],
    cities: ['changan', 'yangzhou', 'gyeongju', 'naraheian', 'kamakura', 'dala'],
  },
]

// base: the base map in src/geo; aspect: height / width of the map frame.
export default { base: 'world', aspect: 0.62, cities: CITIES, steps: STEPS }
