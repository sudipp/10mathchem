// Chapter 17 map layers (longitude, latitude). Territory outlines are drawn loosely over
// the sea: the map clips every territory to the coastline, so only land frontiers need care.
// Sources for frontiers: standard historical atlases (Seljuk empire c. 1092, Mongol Empire 1227 and 1279,
// the four khanates c. 1300, Timur's empire c. 1405, Ottoman lands c. 1451).

const CITIES = {
  karakorum: { name: 'Karakorum', at: [102.8, 47.2], big: true },
  khanbaliq: { name: 'Khanbaliq (Beijing)', at: [116.4, 39.9], big: true },
  dadu: { name: 'Khanbaliq', at: [116.4, 39.9], big: true },
  baghdadB: { name: 'Baghdad', at: [44.4, 33.3], big: true, side: 'below' },
  zhongdu: { name: 'Zhongdu (Beijing)', at: [116.4, 39.9], big: true },
  hangzhou: { name: 'Hangzhou', at: [120.15, 30.27] },
  quanzhou: { name: 'Quanzhou', at: [118.6, 24.9] },
  nanjing: { name: 'Nanjing', at: [118.8, 32.06] },
  sarai: { name: 'Sarai', at: [47.5, 46.8], big: true },
  tabriz: { name: 'Tabriz', at: [46.3, 38.08], big: true },
  baghdad: { name: 'Baghdad', at: [44.4, 33.3], big: true, side: 'left' },
  isfahan: { name: 'Isfahan', at: [51.67, 32.65] },
  samarkand: { name: 'Samarkand', at: [66.96, 39.65], big: true },
  bukhara: { name: 'Bukhara', at: [64.42, 39.77], side: 'left' },
  merv: { name: 'Merv', at: [62.2, 37.6], side: 'below' },
  otrar: { name: 'Otrar', at: [68.3, 42.85] },
  kashgar: { name: 'Kashgar', at: [75.99, 39.47] },
  almaliq: { name: 'Almaliq', at: [80.9, 43.9] },
  ghazni: { name: 'Ghazni', at: [68.42, 33.55] },
  delhi: { name: 'Delhi', at: [77.2, 28.6], big: true },
  constantinople: { name: 'Constantinople', at: [28.98, 41.01] },
  manzikert: { name: 'Manzikert', at: [42.5, 39.15] },
  konya: { name: 'Konya', at: [32.5, 37.87], side: 'below' },
  kiev: { name: 'Kiev', at: [30.52, 50.45] },
  moscow: { name: 'Moscow', at: [37.6, 55.75] },
  aynJalut: { name: 'Ain Jalut', at: [35.36, 32.55], side: 'left' },
  cairo: { name: 'Cairo', at: [31.24, 30.04], side: 'left' },
  caffa: { name: 'Caffa', at: [35.38, 45.03] },
  messina: { name: 'Messina', at: [15.55, 38.19], side: 'left' },
  venice: { name: 'Venice', at: [12.3, 45.4], side: 'below' },
  hakata: { name: 'Hakata', at: [130.4, 33.6] },
  ankara: { name: 'Ankara', at: [32.85, 39.93] },
  damascus: { name: 'Damascus', at: [36.3, 33.5], side: 'left' },
  herat: { name: 'Herat', at: [62.2, 34.35], side: 'below' },
  hormuz: { name: 'Hormuz', at: [56.3, 27.1], side: 'below' },
}

// ---------- territories ----------
const STEPPE = [[21, 47.5], [26, 48.8], [32, 50.6], [40, 52], [50, 53.8], [60, 54.5], [70, 54], [80, 52.6], [88, 51.2], [95, 50.6], [100, 51.6], [108, 51.2], [115, 50.6], [120, 49.6], [123, 46.5], [121, 43.5], [116, 42], [110, 41.2], [104, 40.8], [98, 41.8], [92, 43.2], [86, 44.2], [80, 43.4], [74, 43.2], [68, 42.6], [62, 44], [58, 44.6], [54, 46], [50, 46.6], [47, 45.2], [44, 44.8], [40, 45.8], [36, 46.2], [32, 46.4], [29, 46.6], [26, 46.2], [22, 46.4]]
const SONG_1000 = [[97.5, 28], [100, 33], [103, 34.5], [105, 36.5], [108, 38], [111, 39.2], [114, 39], [117, 38.9], [119, 38.6], [123, 37.5], [123, 30], [121, 25], [117, 22], [110, 19.5], [108, 21.6], [105.5, 23], [101, 22], [98, 24]]
const ABBASID_1000 = [[35.5, 37], [38, 37.5], [42, 37.5], [45, 38.5], [48, 38.5], [50, 37.5], [54, 37], [56, 36], [57, 32], [58, 27], [56, 25.5], [52, 27.5], [50, 29.5], [48, 30], [47.5, 29.5], [44, 29], [40, 30], [37, 29], [34.8, 30], [34.3, 31.5], [35, 33], [35.8, 35]]
const BYZ_1000 = [[19.3, 40], [19.4, 42.5], [21, 44.5], [24, 44.6], [27.5, 44.2], [29.5, 45.3], [30.5, 43], [35, 42.2], [40, 41.2], [44, 41.5], [45, 39.5], [42, 37.5], [38, 37.5], [35.5, 37], [33, 36], [29, 36.2], [27, 36.5], [24, 35], [22, 36.3], [20.5, 38.5]]
const BYZ_1100 = [[19.3, 40], [19.4, 42.5], [21, 44.5], [24, 44.6], [27.5, 44.2], [29.5, 45.3], [30.5, 43], [31.5, 41.2], [30.5, 40.3], [29.5, 39.3], [28.8, 37.5], [27, 36.5], [24, 35], [22, 36.3], [20.5, 38.5]]
const SELJUK_1092 = [[29.6, 40.6], [32, 41.8], [36, 41.6], [40, 41.1], [44, 41.6], [47, 42], [49.5, 40.8], [50, 38], [54, 37.4], [56, 38.6], [60, 39.6], [62.5, 41.3], [66, 41.4], [69, 41], [70, 39], [68, 37.2], [64, 36], [62, 34.5], [61, 31], [58, 27], [56, 25.5], [52, 27.5], [50, 29.5], [48, 30], [47.5, 29.5], [46, 29], [44, 30.5], [41, 32.5], [38.5, 31.5], [36, 30.5], [34.8, 31], [34.3, 31.6], [35.8, 35.5], [36.2, 36.5], [33.5, 36.2], [30.5, 36.6], [29, 37.6]]
const GHAZNAVID = [[62, 35.2], [63.5, 37.4], [67, 37.6], [70, 37.2], [72, 35.8], [74, 33.6], [74.6, 31.6], [72.6, 29.6], [70.6, 27.4], [68.5, 25], [66, 25.3], [63, 27.2], [61.8, 30], [61.4, 33]]
const DELHI_1236 = [[72.6, 29.6], [74.6, 31.6], [75.2, 33], [77.5, 31.5], [80, 29.8], [84, 27.6], [88, 26.6], [89.6, 25.6], [88.5, 22.2], [86, 23.4], [83, 24.3], [80, 24.3], [77, 24], [74, 24.6], [71.5, 26], [69.6, 27.6]]
const MONGOL_1227 = [[49, 38.5], [50.5, 41], [53, 44], [53.5, 46.5], [50, 47.5], [49, 50], [54, 52.6], [62, 54.8], [75, 54.8], [88, 53.4], [98, 52.6], [108, 53.2], [118, 53], [124, 50.5], [127.5, 45.5], [124.5, 41.5], [121, 40.3], [118.5, 38.6], [115.5, 36.8], [112, 36.2], [108, 36.8], [104.5, 34.8], [101, 36.5], [96, 37], [90, 38.6], [80, 36.4], [75, 36.6], [72, 35.6], [70.5, 33.5], [68, 32.5], [64, 34], [60.5, 34.5], [58, 35.8], [54, 36.2], [51, 36.4]]
const SONG_SOUTH = [[103, 30], [105.5, 32.6], [110, 32.2], [114, 32.2], [118.5, 33], [121.5, 33.2], [123, 30], [121, 25], [117, 22], [110, 19.5], [108, 21.6], [105.5, 23], [101, 22], [98, 24], [98.5, 28]]
const EMPIRE_1279 = [
  [131, 42.4], [129.6, 38.6], [126.4, 34.3], [123, 30], [121, 25], [117, 22.3], [110, 19.5], [108, 21.6], [106, 22.8], [101.5, 22], [98, 24], [97.5, 28], [93, 28.4], [88, 27.8], [82, 30], [79, 32.5], [75, 34.4], [72, 35.4], [71, 34], [69.5, 31], [66, 29.5], [62, 27], [58.5, 25.5], [56, 26],
  [52, 27.5], [50, 29.5], [48, 30], [47.5, 29.5], [46, 29], [44, 31], [41.5, 34], [40, 35.5], [38.5, 36.5], [37, 37], [36, 37.2], [34, 36.3], [30.6, 36.6], [29.8, 38.5], [30.5, 40.5], [31.8, 41.6], [36, 41.6], [40, 41.2], [41.8, 41.6],
  [40, 44.6], [36.5, 45.4], [33.5, 44.4], [30.8, 46.6], [29.6, 46.2], [28.2, 47.6], [26.6, 48.4], [25.2, 50], [24.2, 51.6], [25, 53.2], [27.2, 54.6], [30, 56], [33, 57.4], [38, 58.6], [45, 59.6], [52, 59.6], [58, 58], [62, 56],
  [75, 55], [88, 53.6], [98, 52.6], [108, 53.2], [118, 53.2], [124, 52.4], [130, 48.4], [134, 47.4], [135, 43.6],
]
const YUAN = [[131, 42.4], [129.6, 38.6], [126.4, 34.3], [123, 30], [121, 25], [117, 22.3], [110, 19.5], [108, 21.6], [106, 22.8], [101.5, 22], [98, 24], [97.5, 28], [93, 28.4], [88, 27.8], [82, 30], [79, 32.5], [79.2, 35.2], [82, 36], [87, 38], [90.5, 42], [88.5, 46], [88, 49.2], [90, 51], [98, 52.6], [108, 53.2], [118, 53.2], [124, 52.4], [130, 48.4], [134, 47.4], [135, 43.6]]
const CHAGATAI = [[88, 49.2], [88.5, 46], [90.5, 42], [87, 38], [82, 36], [79.2, 35.2], [75, 34.4], [72, 35.4], [69.5, 35.6], [66.5, 37.3], [64.5, 38], [62, 39.6], [60.4, 41], [59.4, 42.6], [60.6, 44.2], [63.5, 45.2], [68, 46.8], [75, 48.4], [82, 49.4]]
const ILKHANATE = [[30.5, 40.5], [31.8, 41.6], [36, 41.6], [40, 41.2], [41.8, 41.6], [44, 42.2], [46.5, 41.8], [48.6, 41.6], [50, 40.2], [50, 38], [54, 37.4], [56.5, 38.2], [59, 40.2], [60.4, 41], [62, 39.6], [64.5, 38], [66.5, 37.3], [69.5, 35.6], [69.5, 31], [66, 29.5], [62, 27], [58.5, 25.5], [56, 26], [52, 27.5], [50, 29.5], [48, 30], [47.5, 29.5], [46, 29], [44, 31], [41.5, 34], [40, 35.5], [38.5, 36.5], [37, 37], [36, 37.2], [34, 36.3], [30.6, 36.6], [29.8, 38.5]]
const GOLDEN_HORDE = [[28.2, 47.6], [29.6, 46.2], [30.8, 46.6], [33.5, 44.4], [36.5, 45.4], [40, 44.6], [44, 42.2], [46.5, 41.8], [48.6, 41.6], [50, 44], [53, 45.5], [54, 42], [57, 41.8], [59.4, 42.6], [60.6, 44.2], [63.5, 45.2], [68, 46.8], [75, 48.4], [82, 49.4], [88, 49.2], [88, 53.6], [75, 55], [62, 56], [55, 56.8], [50, 56.6], [47, 55.2], [42, 53.2], [38, 52.2], [33, 51.6], [30, 50.2], [27.5, 49.8], [26.6, 48.4]]
const MAMLUK = [[25, 31.6], [29, 31.2], [32, 31.4], [34.3, 31.6], [35, 33.5], [35.8, 35.6], [36, 36.9], [38.2, 36.9], [40.5, 35.4], [41, 33.5], [38.5, 31.5], [36.5, 29.6], [37, 26], [39, 22], [36.5, 22], [32, 21.8], [30, 22], [25, 22]]
const MING_1368 = [[98.5, 24], [98, 28], [102, 33], [104, 35.5], [100, 37.5], [101, 39], [105, 38.5], [108, 39.8], [111, 41], [115, 41.3], [119, 41], [121.5, 40.5], [123, 37.5], [123, 30], [121, 25], [117, 22.3], [110, 19.5], [108, 21.6], [106, 22.8], [101.5, 22]]
const TIMUR_1405 = [[40.5, 39.8], [42, 41.6], [45, 42.2], [48.6, 41.6], [50, 40.2], [50, 38], [54, 37.4], [56.5, 38.2], [59.4, 42.6], [60.6, 44.2], [64, 44.6], [69, 44.2], [72.5, 44.2], [77, 43.4], [80, 42.2], [77.5, 40.2], [75, 37.4], [72, 36.6], [70.5, 34.2], [69.5, 31], [66, 28], [62.5, 25.5], [58.5, 25.5], [56, 26], [52, 27.5], [50, 29.5], [48, 30], [47.5, 29.5], [46, 29], [44, 31], [41.5, 34], [40.2, 35.8], [39, 37.2], [38.6, 38.6]]
const OTTOMAN_1451 = [[19.6, 40], [19.5, 41.8], [20.8, 43.2], [22.6, 44.2], [26, 44], [28.6, 44.2], [28.6, 43], [29.8, 41.4], [31.5, 41.3], [34, 42], [36.4, 41.5], [36.4, 39.8], [35, 38.6], [33.2, 37.4], [31.5, 36.7], [29.5, 36.4], [27.6, 36.8], [26.6, 38.4], [26.2, 40], [24.6, 40.6], [23.2, 39.4], [22.4, 38.2], [21.3, 37.6], [20.8, 39]]
const RUS = [[24.5, 54], [27, 57], [29, 60], [34, 61.5], [42, 61.5], [48, 60.5], [50, 56.6], [47, 55.2], [42, 53.2], [38, 52.2], [33, 51.6], [30, 50.2], [27.5, 49.8], [25, 51.6]]

// ---------- routes ----------
const SILK_ROAD = [[29.9, 40.8], [32.86, 39.93], [38.5, 38.6], [42.5, 38.9], [46.3, 38.08], [51.4, 35.7], [58.8, 36.2], [62.2, 37.6], [64.42, 39.77], [66.96, 39.65], [71.8, 40.8], [75.99, 39.47], [82, 41.7], [89.2, 42.9], [94.7, 40.1], [103.8, 36.1], [108.9, 34.3], [112.5, 37.9], [116.4, 39.9]]
const STEPPE_ROAD = [[35.38, 45.03], [40, 47.2], [47.5, 46.8], [53, 46.6], [58.6, 44.8], [62, 42.8], [68.3, 42.85], [76.9, 43.25], [80.9, 43.9], [88, 46.2], [95, 47], [102.8, 47.2]]
const SEA_LANE = [[118.6, 24.9], [114.5, 20.5], [110, 14], [106.5, 8], [104.8, 2.2], [101.5, 2.6], [98.5, 5.4], [94, 6.4], [85, 6.2], [80.4, 5.6], [77, 7.6], [75.4, 11.6], [71.5, 18], [66.5, 23.2], [59.5, 24.4], [56.3, 26.6]]
const C = { steppe: '#4E7A55', mongol: '#B5482A', turk: '#6E5A8F', china: '#C99A3D', islam: '#4E7FA6', byz: '#7A3B22', yuan: '#C99A3D', chag: '#4E7A55', ilk: '#4E7FA6', gold: '#B5482A', timur: '#6E5A8F', ott: '#2E6E9A', road: '#7A3B22', sea: '#2E6E9A' }

// ---------- map steps (the animated map) ----------
// view: [lonMin, latMin, lonMax, latMax] to zoom in, or null for the whole map.
const EURASIA = [20, 15, 140, 60]
const STEPS = [
  {
    title: 'The steppe, c. 1000', caption: 'A belt of grassland runs about 7,000 km from Hungary to Manchuria. Too dry for big farms, it is home to herders who move with their sheep, horses and camels and trade with the farming lands to the south.',
    view: EURASIA,
    lands: [{ label: 'The steppe', color: C.steppe, polys: [STEPPE], at: [58, 50.2] },
      { label: 'Song China', color: C.china, polys: [SONG_1000], faint: true, at: [111, 28] },
      { label: 'Abbasid lands', color: C.islam, polys: [ABBASID_1000], faint: true, at: [51, 30.6] },
      { label: 'Byzantium', color: C.byz, polys: [BYZ_1000], faint: true, at: [35, 37.4] }],
    routes: [{ pts: SILK_ROAD, color: C.road, dashed: true, label: 'caravan routes', labelAt: [88, 40.6] }],
    tags: [{ text: 'Turkic peoples', at: [38, 49.8] }, { text: 'Mongols', at: [110, 47.6] }, { text: 'horses · sheep · felt yurts', at: [86, 48.2] }, { text: 'grain · tea · silk ⇄ horses · hides', at: [121, 33.6] }],
    cities: ['baghdad', 'constantinople', 'samarkand'],
  },
  {
    title: 'Turkish empires, 1055–1206', caption: 'Seljuk Turks take Baghdad in 1055 and crush Byzantium at Manzikert in 1071, opening Anatolia. Further east the Ghaznavid Turks raid India, and in 1206 Turkish generals found the Sultanate of Delhi.',
    view: [18, 18, 92, 50],
    lands: [{ label: 'Seljuk empire', color: C.turk, polys: [SELJUK_1092], at: [53.5, 29.8] },
      { label: 'Ghaznavids', color: C.mongol, polys: [GHAZNAVID], at: [66, 31.6] },
      { label: 'Delhi Sultanate', color: C.china, polys: [DELHI_1236], at: [80.5, 26.6] },
      { label: 'Byzantium', color: C.byz, polys: [BYZ_1100], faint: true, at: [24, 42.4] }],
    routes: [{ pts: [[66, 42.5], [61, 38.8], [56.5, 36.6], [51.67, 32.65], [47.5, 33.3], [44.8, 33.3]], color: C.turk, arrow: true, label: 'Baghdad, 1055', labelAt: [62.5, 37.6] },
      { pts: [[51.67, 32.65], [48.5, 36.4], [45, 38.6], [42.9, 39.1]], color: C.turk, arrow: true, label: 'Manzikert, 1071', labelAt: [46, 43] },
      { pts: [[42.5, 39.15], [38, 39.2], [33.2, 38]], color: C.turk, arrow: true, dashed: true },
      { pts: [[68.42, 33.55], [70.8, 30.5], [71.4, 26.5], [70.6, 21.5]], color: C.mongol, arrow: true, label: 'Mahmud’s raids', labelAt: [74, 23.2] }],
    cities: ['baghdad', 'isfahan', 'manzikert', 'constantinople', 'konya', 'ghazni', 'delhi'],
  },
  {
    title: 'Chinggis Khan, 1206–1227', caption: 'In 1206 Temüjin unites the Mongols and is proclaimed Chinggis Khan. He takes Zhongdu (Beijing) in 1215 and destroys the Khwarazm Shah after his men are murdered at Otrar. By his death in 1227 he rules from northern China to Persia.',
    view: EURASIA,
    lands: [{ label: 'Mongol Empire, 1227', color: C.mongol, polys: [MONGOL_1227], at: [80, 49.6] },
      { label: 'Song China', color: C.china, polys: [SONG_SOUTH], faint: true, at: [112, 27] },
      { label: 'Delhi Sultanate', color: C.china, polys: [DELHI_1236], faint: true, at: [80, 26.4] }],
    routes: [{ pts: [[102.8, 47.2], [108, 44.2], [113, 41.6], [116.1, 40.1]], color: C.mongol, arrow: true, label: 'Zhongdu, 1215', labelAt: [120, 43.2] },
      { pts: [[102.8, 47.2], [92, 46.4], [82, 44.6], [72, 43.4], [68.6, 42.8], [65, 40.2]], color: C.mongol, arrow: true, label: 'Khwarazm, 1219–21', labelAt: [88, 42.6] },
      { pts: [[64.42, 39.77], [62.2, 37.6], [58.8, 36.2], [55, 36.4]], color: C.mongol, arrow: true, dashed: true }],
    tags: [{ text: 'Mongol homeland', at: [106, 51.6] }],
    cities: ['karakorum', 'zhongdu', 'otrar', 'bukhara', 'samarkand', 'merv'],
  },
  {
    title: 'The Mongol Empire, c. 1279', caption: 'Chinggis’s sons and grandsons keep going: Batu conquers Russia (1237–41), Hülegü sacks Baghdad (1258) and Khubilai finishes off Song China (1279). It is the largest land empire in history, but Egypt’s Mamluks stop the Mongols at Ain Jalut (1260) and typhoons wreck two fleets sent against Japan.',
    view: EURASIA,
    lands: [{ label: 'Mongol Empire', color: C.mongol, polys: [EMPIRE_1279], at: [86, 46] },
      { label: 'Mamluks', color: C.ilk, polys: [MAMLUK], faint: true, at: [29, 25] }],
    routes: [{ pts: [[58, 52], [50, 53], [44, 52.4], [39, 54.6], [37.6, 55.75], [33, 52.5], [30.52, 50.45], [24.5, 50], [21, 48.2]], color: C.mongol, arrow: true, label: 'Batu, 1237–41', labelAt: [58, 53.8] },
      { pts: [[66.96, 39.65], [61, 37], [53, 36.2], [48, 35], [44.7, 33.5]], color: C.mongol, arrow: true, label: 'Hülegü, 1258', labelAt: [53, 38.2] },
      { pts: [[44.4, 33.3], [40.5, 35.3], [37.5, 35.4], [35.7, 32.8]], color: C.mongol, arrow: true, dashed: true },
      { pts: [[116.4, 39.9], [115, 35], [115.5, 31], [119.8, 30.3]], color: C.mongol, arrow: true, label: 'Song falls, 1279', labelAt: [111, 33] },
      { pts: [[126.7, 37.2], [128.6, 35.1], [129.7, 34.2], [130.2, 33.7]], color: C.sea, arrow: true, dashed: true, label: 'Japan', labelAt: [124.5, 33] }],
    tags: [{ text: 'stopped, 1260', at: [33, 28.6] }, { text: 'typhoons, 1274 & 1281', at: [127.5, 27.4] }],
    cities: ['karakorum', 'khanbaliq', 'hangzhou', 'kiev', 'moscow', 'baghdadB', 'aynJalut', 'hakata'],
  },
  {
    title: 'The four khanates, c. 1300', caption: 'After 1260 the empire splits into four states ruled by Chinggis’s descendants: the Yuan dynasty in China, the Chagatai Khanate in Central Asia, the Ilkhanate in Persia and the Golden Horde on the Russian steppe.',
    view: EURASIA,
    lands: [{ label: 'Yuan', color: C.yuan, polys: [YUAN], at: [106, 36] },
      { label: 'Chagatai', color: C.chag, polys: [CHAGATAI], at: [75, 42] },
      { label: 'Ilkhanate', color: C.ilk, polys: [ILKHANATE], at: [52, 32.4] },
      { label: 'Golden Horde', color: C.gold, polys: [GOLDEN_HORDE], at: [58, 51] },
      { label: 'Rus’ (tribute)', color: C.gold, polys: [RUS], faint: true, at: [38, 58.6] }],
    cities: ['khanbaliq', 'karakorum', 'almaliq', 'samarkand', 'tabriz', 'baghdad', 'sarai', 'moscow'],
  },
  {
    title: 'Pax Mongolica, c. 1250–1350', caption: 'With one family ruling from Korea to the Black Sea, merchants, envoys and missionaries crossed Eurasia in safety. Goods, technologies, foods and ideas moved both ways along the overland roads and the sea lanes.',
    view: [4, 5, 140, 60],
    lands: [{ label: '', color: C.yuan, polys: [YUAN], faint: true }, { label: '', color: C.chag, polys: [CHAGATAI], faint: true },
      { label: '', color: C.ilk, polys: [ILKHANATE], faint: true }, { label: '', color: C.gold, polys: [GOLDEN_HORDE], faint: true }],
    routes: [{ pts: SILK_ROAD, color: C.road, label: 'Silk Roads', labelAt: [99, 35.2] },
      { pts: STEPPE_ROAD, color: C.road, label: 'steppe road', labelAt: [66, 46.6] },
      { pts: SEA_LANE, color: C.sea, dashed: true, label: 'sea lanes', labelAt: [88, 3.4] },
      { pts: [[12.6, 45.2], [14, 43.8], [17, 42.2], [19, 39.8], [20.6, 37], [26, 35.4], [32, 35.2], [35.9, 36.7]], color: C.sea, dashed: true }],
    tags: [{ text: 'paper money · printing · gunpowder →', at: [76, 34.6] }, { text: '← Persian astronomy · medicine', at: [106, 43.6] },
      { text: 'Marco Polo, 1271–95', at: [101, 30.6] }, { text: 'Rubruck, 1253–55', at: [62, 50] }, { text: 'Ibn Battuta, 1330s–40s', at: [74, 15.6] }],
    cities: ['venice', 'constantinople', 'tabriz', 'samarkand', 'sarai', 'karakorum', 'dadu', 'quanzhou', 'hormuz'],
  },
  {
    title: 'Plague and decline, 1330s–1368', caption: 'Bubonic plague spreads along Mongol trade routes, reaching the Black Sea port of Caffa in 1346 and Europe in 1347. The Ilkhanate collapses in 1335, and in 1368 a peasant rebellion drives the Mongols out of China and founds the Ming dynasty.',
    view: [4, 15, 140, 60],
    lands: [{ label: 'Ming (1368)', color: C.yuan, polys: [MING_1368], at: [108, 29.6] },
      { label: 'Golden Horde', color: C.gold, polys: [GOLDEN_HORDE], faint: true, at: [62, 53] },
      { label: 'Chagatai', color: C.chag, polys: [CHAGATAI], faint: true, at: [76, 39.4] },
      { label: '', color: C.ilk, polys: [ILKHANATE], faint: true }],
    routes: [{ pts: [[85, 44.6], [76.9, 43.25], [68.3, 42.85], [60, 44.6], [53, 46.6], [47.5, 46.8], [40, 47.2], [35.6, 45.2]], color: '#24303F', arrow: true, label: 'plague, 1340s', labelAt: [70, 46.2] },
      { pts: [[35.38, 45.03], [32, 43.4], [29.1, 41.2], [26.3, 40.1], [25, 37.6], [21.5, 36.4], [16.5, 37.6], [15.7, 38.1]], color: '#24303F', arrow: true, dashed: true, label: 'to Sicily, 1347', labelAt: [20.5, 33.4] },
      { pts: [[25, 37.6], [27.5, 34], [29.8, 31.5]], color: '#24303F', arrow: true, dashed: true }],
    tags: [{ text: 'Ilkhanate collapses, 1335', at: [51, 31.4] }, { text: 'plague in China, 1330s', at: [114, 42.6] }, { text: 'paper money loses value', at: [110, 25.4] }],
    cities: ['dadu', 'nanjing', 'sarai', 'caffa', 'constantinople', 'cairo', 'messina', 'tabriz'],
  },
  {
    title: 'Timur and the Ottomans, 1370–1453', caption: 'Timur, a Turkish conqueror from the Chagatai Khanate, builds an empire from Samarkand, sacks Delhi (1398) and Baghdad (1401) and beats the Ottomans at Ankara (1402). His empire splits after 1405, but the Ottomans recover and take Constantinople in 1453.',
    view: [18, 18, 92, 50],
    lands: [{ label: 'Timur’s empire, 1405', color: C.timur, polys: [TIMUR_1405], at: [55, 31] },
      { label: 'Ottomans', color: C.ott, polys: [OTTOMAN_1451], at: [27, 42.8] },
      { label: 'Golden Horde', color: C.gold, polys: [GOLDEN_HORDE], faint: true, at: [40, 49.4] }],
    routes: [{ pts: [[66.96, 39.65], [68.4, 36.6], [69.2, 34.6], [71.6, 33], [74.3, 31.5], [76.9, 28.8]], color: C.timur, arrow: true, label: 'Delhi, 1398', labelAt: [75, 34.6] },
      { pts: [[66.96, 39.65], [62, 36.8], [55, 35.8], [49, 34.6], [44.7, 33.4]], color: C.timur, arrow: true, label: 'Baghdad, 1401', labelAt: [60, 37.2] },
      { pts: [[46.3, 38.08], [42, 39.6], [37, 39.9], [33.2, 39.9]], color: C.timur, arrow: true, label: 'Ankara, 1402', labelAt: [39, 37.6] },
      { pts: [[66.96, 39.65], [63.5, 44.6], [56, 47.4], [48.2, 47]], color: C.timur, arrow: true, dashed: true, label: 'vs Golden Horde, 1395', labelAt: [66, 47.4] }],
    tags: [{ text: 'Istanbul, 1453', at: [26, 38.3] }],
    cities: ['samarkand', 'herat', 'delhi', 'baghdad', 'damascus', 'ankara', 'constantinople', 'tabriz', 'sarai'],
  },
]

// base: the base map in src/geo; aspect: height / width of the map frame.
export default { base: 'world', aspect: 0.62, cities: CITIES, steps: STEPS }
