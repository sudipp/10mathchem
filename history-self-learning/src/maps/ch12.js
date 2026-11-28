// Chapter 12 map layers (longitude, latitude). Territory outlines are drawn loosely over
// the sea: the map clips every territory to the coastline, so only land frontiers need care.
// Sources for frontiers: standard historical atlases (Roman Euphrates and Danube frontiers, Parthian and
// Kushan realms c. 100–150 CE, Han protectorate of the Western Regions, the Three Kingdoms c. 230 CE).

const CITIES = {
  rome: { name: 'Rome', at: [12.5, 41.9], big: true },
  constantinople: { name: 'Constantinople', at: [28.98, 41.01], big: true },
  alexandria: { name: 'Alexandria', at: [29.9, 31.2], big: true, side: 'left' },
  antioch: { name: 'Antioch', at: [36.15, 36.2] },
  jerusalem: { name: 'Jerusalem', at: [35.22, 31.78] },
  edessa: { name: 'Edessa', at: [38.79, 37.16] },
  neocaesarea: { name: 'Neocaesarea', at: [36.88, 40.6], side: 'below' },
  ctesiphon: { name: 'Ctesiphon', at: [44.58, 33.09], big: true },
  merv: { name: 'Merv', at: [61.83, 37.66] },
  samarkand: { name: 'Samarkand', at: [66.97, 39.65], side: 'left' },
  bactra: { name: 'Bactra', at: [66.9, 36.76], side: 'below' },
  kashgar: { name: 'Kashgar', at: [75.99, 39.47] },
  khotan: { name: 'Khotan', at: [79.92, 37.11], side: 'below' },
  dunhuang: { name: 'Dunhuang', at: [94.66, 40.14] },
  changan: { name: 'Chang’an', at: [108.94, 34.34], big: true, side: 'left' },
  luoyang: { name: 'Luoyang', at: [112.45, 34.62], big: true },
  chengdu: { name: 'Chengdu', at: [104.07, 30.67], side: 'below' },
  jianye: { name: 'Jianye', at: [118.8, 32.06] },
  purushapura: { name: 'Purushapura', at: [71.57, 34.0], side: 'left' },
  mathura: { name: 'Mathura', at: [77.67, 27.49] },
  pataliputra: { name: 'Pataliputra', at: [85.14, 25.6] },
  bodhgaya: { name: 'Bodh Gaya', at: [84.99, 24.7], side: 'below' },
  tamralipti: { name: 'Tamralipti', at: [87.92, 22.3] },
  barygaza: { name: 'Barygaza', at: [72.98, 21.7], side: 'left' },
  muziris: { name: 'Muziris', at: [76.2, 10.15], side: 'left' },
  anuradhapura: { name: 'Anuradhapura', at: [80.4, 8.35] },
  berenice: { name: 'Berenice', at: [35.47, 23.91], side: 'left' },
  aden: { name: 'Aden', at: [45.03, 12.8], side: 'below' },
  axum: { name: 'Axum', at: [38.72, 14.13], side: 'left' },
  rhapta: { name: 'Rhapta', at: [39.3, -6.8], side: 'left' },
  oceo: { name: 'Oc Eo (Funan)', at: [105.1, 10.25], side: 'left' },
  jiaozhi: { name: 'Jiaozhi', at: [105.85, 21.03], side: 'left' },
  guangzhou: { name: 'Guangzhou', at: [113.26, 23.13], side: 'left' },
  carthage: { name: 'Carthage', at: [10.32, 36.85] },
  hippo: { name: 'Hippo', at: [7.77, 36.88], side: 'left' },
  ravenna: { name: 'Ravenna', at: [12.2, 44.42] },
  adrianople: { name: 'Adrianople', at: [26.56, 41.68], side: 'left' },
  chalons: { name: 'Châlons', at: [4.37, 48.96] },
  toulouse: { name: 'Toulouse', at: [1.44, 43.6], side: 'left' },
}

// ---------- territories ----------
const ROME_WEST = [
  [-10.5, 33.9], [-10.5, 44.5], [-6.0, 48.5], [-6.6, 50.0], [-5.6, 51.6], [-5.1, 53.5], [-4.7, 54.5], [-3.6, 54.6], [-3.2, 55.0], [-1.4, 55.05], [0.5, 55.0],
  [3.5, 52.6], [4.4, 52.25], [5.8, 51.85], [6.45, 51.66], [6.95, 50.94], [7.33, 50.5], [8.5, 50.35], [8.95, 50.35], [9.15, 50.0], [9.26, 49.7], [9.6, 49.2], [9.7, 48.8], [10.6, 48.95], [11.78, 48.85],
  [12.1, 49.02], [13.45, 48.57], [15.0, 48.3], [16.37, 48.2], [16.9, 48.1], [17.9, 47.75], [19.04, 47.6], [18.9, 46.0], [19.3, 45.2], [19.4, 44.0], [19.3, 43.0], [19.2, 42.0],
  [18.5, 40.5], [19.0, 36.0], [19.5, 33.0], [19.5, 30.0], [15.5, 30.8], [12.0, 30.4], [10.0, 32.2], [8.5, 33.5], [6.0, 34.8], [3.0, 35.1], [1.0, 35.5], [-1.5, 34.7], [-4.0, 34.0], [-6.5, 33.8], [-7.5, 33.9],
]
const EAST_TAIL = [[37.5, 32.0], [38.2, 30.0], [37.8, 27.0], [36.4, 27.4], [35.9, 23.4], [33.0, 23.2], [30.5, 24.8], [28.5, 26.5], [25.0, 29.0], [25.0, 30.3], [20.0, 30.0], [19.5, 30.0], [19.5, 33.0], [19.0, 36.0], [18.5, 40.5]]
const BALKAN_DANUBE = [[19.2, 42.0], [19.3, 43.0], [19.4, 44.0], [19.3, 45.2], [20.46, 44.82], [22.5, 44.6], [24.9, 43.75], [25.5, 43.65], [27.0, 44.1], [28.0, 44.7], [28.2, 45.3], [29.8, 45.2], [30.5, 43.0], [35.0, 43.0], [41.5, 41.6]]
// c. 100 CE: the eastern frontier follows the upper Euphrates and the Syrian desert.
const ROME_EAST_100 = [...BALKAN_DANUBE, [40.2, 40.0], [38.8, 38.6], [38.3, 37.6], [38.0, 36.5], [38.6, 35.5], [38.6, 33.5], ...EAST_TAIL]
// After 363 CE Rome holds northern Mesopotamia up to the Dara–Amida line.
const ROME_EAST_400 = [...BALKAN_DANUBE, [42.5, 40.5], [41.5, 39.5], [40.5, 38.8], [41.3, 37.5], [40.0, 36.6], [39.0, 35.5], [38.6, 33.5], ...EAST_TAIL]
const PARTHIA = [
  [41.5, 37.3], [42.5, 37.5], [44.5, 39.0], [47.0, 39.5], [48.8, 38.5], [51.0, 37.6], [53.9, 37.3], [56.0, 38.5], [59.0, 38.4], [62.0, 38.2], [63.5, 37.0],
  [62.5, 35.0], [62.0, 32.0], [61.8, 29.5], [61.6, 25.2], [57.5, 25.4], [56.5, 27.0], [52.0, 27.5], [50.5, 29.0], [48.5, 29.8], [47.5, 30.5], [46.5, 30.9], [44.0, 31.2], [42.0, 32.5], [40.8, 34.5], [40.2, 36.0],
]
const KUSHAN = [
  [63.5, 37.0], [65.0, 38.5], [67.5, 39.0], [69.5, 39.5], [71.5, 38.5], [73.5, 37.0], [75.0, 36.0], [75.5, 34.5], [77.0, 32.5], [78.5, 30.5], [80.5, 28.5], [83.0, 26.5],
  [82.5, 25.0], [80.0, 25.0], [77.5, 25.5], [75.0, 26.0], [72.0, 25.5], [70.0, 24.0], [67.5, 24.5], [66.5, 27.0], [65.5, 30.5], [64.0, 32.0], [62.5, 35.0],
]
const HAN_CHINA = [
  [93.5, 40.5], [97.0, 41.0], [100.0, 40.0], [104.0, 41.5], [108.0, 41.5], [111.5, 41.0], [114.0, 41.0], [117.0, 41.2], [119.5, 41.5], [122.0, 42.5], [124.5, 41.5], [126.5, 40.5], [127.5, 39.5], [126.5, 38.0], [125.0, 37.5],
  [123.0, 37.0], [121.0, 33.0], [122.5, 30.5], [121.5, 26.0], [118.0, 23.5], [113.5, 21.5], [110.0, 19.5], [108.5, 21.0], [106.5, 20.0], [107.5, 18.0], [108.0, 16.0], [106.0, 16.5], [104.5, 19.0], [103.5, 22.0],
  [101.0, 22.5], [99.5, 24.5], [98.5, 25.0], [99.0, 27.0], [101.0, 28.5], [102.0, 30.5], [103.0, 32.5], [102.0, 34.5], [100.5, 36.0], [98.0, 37.0], [96.0, 38.5], [93.5, 39.5],
]
const TARIM = [[73.5, 40.5], [75.5, 41.5], [80.0, 42.5], [84.0, 43.0], [88.0, 43.5], [93.0, 43.0], [94.0, 40.8], [93.0, 38.5], [88.0, 37.5], [82.0, 36.5], [78.0, 36.8], [75.5, 37.5], [73.5, 39.0]]
const WEI = [
  [93.5, 40.5], [97.0, 41.0], [100.0, 40.0], [104.0, 41.5], [108.0, 41.5], [111.5, 41.0], [114.0, 41.0], [117.0, 41.2], [119.5, 41.5], [122.0, 42.5], [124.5, 41.5], [126.5, 40.5], [127.5, 39.5], [126.5, 38.0], [125.0, 37.5],
  [123.0, 37.0], [121.5, 35.0], [121.0, 33.5], [119.8, 32.5], [118.5, 32.6], [116.5, 32.2], [115.0, 31.8], [113.5, 32.0], [112.0, 31.6], [111.0, 32.3], [110.0, 32.6], [108.5, 33.0], [106.5, 33.5], [105.0, 34.2], [104.0, 34.6],
  [102.5, 35.0], [100.5, 36.0], [98.0, 37.0], [96.0, 38.5], [93.5, 39.5],
]
const SHU = [[108.5, 33.0], [110.0, 32.6], [110.3, 31.2], [109.5, 29.5], [108.5, 27.5], [107.0, 25.8], [105.5, 24.0], [104.0, 23.0], [102.5, 22.5], [100.5, 22.3], [99.2, 24.5], [98.5, 25.5], [99.0, 27.0], [101.0, 28.5], [102.0, 30.5], [103.0, 32.5], [104.0, 34.6], [105.0, 34.2], [106.5, 33.5]]
const WU = [
  [110.3, 31.2], [111.0, 32.3], [112.0, 31.6], [113.5, 32.0], [115.0, 31.8], [116.5, 32.2], [118.5, 32.6], [119.8, 32.5], [121.0, 33.5], [122.5, 30.5], [121.5, 26.0], [118.0, 23.5], [113.5, 21.5], [110.0, 19.5],
  [108.5, 21.0], [106.5, 20.0], [107.5, 18.0], [108.0, 16.0], [106.0, 16.5], [104.5, 19.0], [103.5, 22.0], [104.0, 23.0], [105.5, 24.0], [107.0, 25.8], [108.5, 27.5], [109.5, 29.5],
]

// ---------- routes ----------
const SILK_NORTH = [[108.94, 34.34], [103.8, 36.06], [100.45, 38.93], [94.66, 40.14], [89.18, 42.95], [82.96, 41.72], [75.99, 39.47]]
const SILK_SOUTH = [[94.66, 40.14], [89.9, 39.6], [82.7, 37.9], [79.92, 37.11], [77.24, 38.4], [75.99, 39.47]]
const SILK_WEST = [[75.99, 39.47], [72.5, 39.8], [70.9, 40.5], [66.97, 39.65], [63.6, 39.0], [61.83, 37.66], [57.5, 37.2], [54.3, 36.1], [51.4, 35.7], [48.5, 34.8], [44.58, 33.09], [40.7, 34.75], [38.27, 34.55], [36.15, 36.2]]
const SILK_BACTRA = [[75.99, 39.47], [75.2, 37.8], [71.5, 37.0], [66.9, 36.76], [61.83, 37.66]]
const SILK_INDIA = [[66.9, 36.76], [69.2, 34.5], [71.57, 34.0], [72.8, 33.75], [77.67, 27.49]]
const SEA_RED = [[35.47, 23.91], [38.5, 20.0], [42.5, 14.0], [44.5, 12.2], [52.0, 12.5], [60.0, 11.5], [70.0, 10.5], [76.0, 10.1]]
const SEA_BARYGAZA = [[52.0, 12.5], [58.0, 17.0], [68.0, 20.0], [72.6, 21.6]]
const SEA_GULF = [[47.8, 30.0], [51.0, 27.0], [56.5, 26.4], [57.5, 25.0], [60.0, 23.5], [63.0, 22.0], [68.0, 20.3]]
const SEA_AFRICA = [[51.0, 11.8], [48.0, 5.0], [42.0, -2.0], [39.6, -6.5]]
const SEA_EAST = [[76.0, 10.1], [77.3, 7.6], [79.5, 6.3], [81.7, 6.4], [83.0, 8.5], [86.0, 12.0], [92.0, 10.0], [97.0, 7.0], [99.8, 4.5], [101.3, 2.6], [103.4, 1.2], [104.5, 1.6], [104.3, 5.0], [104.3, 8.5], [104.9, 9.9]]
const SEA_CHINA = [[104.9, 9.9], [104.3, 8.5], [105.2, 8.1], [107.5, 9.8], [109.5, 12.0], [109.6, 14.5], [108.6, 17.5], [107.0, 20.4], [108.5, 20.6], [110.2, 20.2], [111.5, 21.2], [113.3, 22.6]]
const SEA_BENGAL = [[87.92, 22.3], [88.5, 19.0], [88.0, 14.0], [86.0, 12.0]]
const BUDDHISM_LAND = [[84.99, 24.7], [77.67, 27.49], [72.8, 33.75], [71.57, 34.0], [69.2, 34.5], [66.9, 36.76], [71.5, 37.0], [75.2, 37.8], [75.99, 39.47], [79.92, 37.11], [82.7, 37.9], [89.9, 39.6], [94.66, 40.14], [100.45, 38.93], [103.8, 36.06], [108.94, 34.34], [112.45, 34.62]]
const BUDDHISM_LANKA = [[87.92, 22.3], [88.0, 18.0], [85.0, 13.0], [81.9, 9.0]]
const BUDDHISM_SEA = [[88.0, 18.0], [92.0, 12.0], [97.0, 7.0], [99.8, 4.5], [101.3, 2.6], [103.4, 1.2], [104.5, 1.6], [104.3, 5.0], [104.3, 8.5], [104.9, 9.9]]
const CHRIST_WEST = [[35.22, 31.78], [36.15, 36.2], [33.0, 38.5], [29.5, 40.3], [28.98, 41.01], [26.0, 40.0], [24.5, 38.5], [22.5, 36.3], [18.0, 37.5], [15.6, 38.1], [15.0, 39.5], [13.5, 41.0], [12.5, 41.9]]
const CHRIST_AFRICA = [[35.22, 31.78], [29.9, 31.2], [25.0, 32.5], [20.0, 33.0], [14.0, 34.5], [10.32, 36.85], [7.77, 36.88]]
const CHRIST_ANATOLIA = [[36.15, 36.2], [36.88, 40.6]]
const CHRIST_EAST = [[36.15, 36.2], [38.79, 37.16], [41.22, 37.07], [43.2, 35.5], [44.58, 33.09], [52.0, 35.0], [61.83, 37.66]]
const CHRIST_INDIA = [[35.47, 23.91], [38.5, 20.0], [42.5, 14.0], [44.5, 12.2], [52.0, 12.5], [62.0, 11.0], [70.0, 10.5], [76.0, 10.1]]
const CHRIST_AXUM = [[29.9, 31.2], [31.5, 27.0], [32.9, 24.1], [33.0, 19.0], [36.0, 16.0], [38.72, 14.13]]
const MANI_WEST = [[44.58, 33.09], [40.5, 34.8], [36.15, 36.2], [33.0, 31.5], [29.9, 31.2], [25.0, 32.0], [18.0, 33.2], [12.0, 35.6], [10.32, 36.85]]
const MANI_ROME = [[36.15, 36.2], [30.0, 37.5], [24.0, 37.5], [17.0, 38.3], [12.5, 41.9]]
const MANI_EAST = [[44.58, 33.09], [48.5, 34.8], [54.3, 36.1], [61.83, 37.66], [66.97, 39.65], [70.9, 40.5], [75.99, 39.47], [82.96, 41.72], [89.18, 42.95]]
const XIONGNU = [[108.0, 46.0], [109.5, 40.5]]
const XIANBEI = [[119.0, 45.5], [116.0, 40.6]]
const HUNS = [[52.0, 48.5], [45.0, 47.5], [38.0, 47.3], [32.0, 46.8], [27.0, 46.0], [22.0, 46.6], [19.5, 47.2]]
const ATTILA = [[19.5, 47.2], [16.4, 48.2], [12.5, 48.6], [8.5, 48.9], [4.6, 48.95]]
const VISIGOTHS = [[30.0, 46.8], [28.5, 45.2], [27.3, 43.6], [26.56, 41.68], [23.5, 41.6], [21.0, 42.6], [17.5, 44.8], [14.0, 46.0], [12.0, 45.0], [12.5, 41.9], [11.0, 43.5], [8.0, 44.2], [4.5, 43.8], [1.44, 43.6]]
const VANDALS = [[9.0, 51.5], [7.0, 50.0], [4.0, 47.5], [0.5, 45.0], [-2.0, 42.5], [-4.0, 39.0], [-5.0, 36.6], [-2.0, 35.6], [3.0, 36.6], [7.77, 36.88], [10.32, 36.85]]
const VANDAL_RAID = [[10.32, 36.85], [11.4, 39.5], [12.3, 41.6]]

// ---------- map steps (the animated map) ----------
// view: [lonMin, latMin, lonMax, latMax] to zoom in, or null for the whole map.
const C = { rome: '#B5482A', parthia: '#C99A3D', kushan: '#4E7A55', han: '#4E7FA6', east: '#2E6E9A', road: '#7A3B22', sea: '#2E6E9A', buddha: '#C99A3D', christ: '#2E6E9A', mani: '#6E5A8F' }
const WHOLE = [-12, -12, 145, 58]
const FAINT_EMPIRES = [
  { label: '', color: C.rome, polys: [ROME_WEST, ROME_EAST_100], faint: true }, { label: '', color: C.parthia, polys: [PARTHIA], faint: true },
  { label: '', color: C.kushan, polys: [KUSHAN], faint: true }, { label: '', color: C.han, polys: [HAN_CHINA, TARIM], faint: true },
]
const STEPS = [
  {
    title: 'Four empires, c. 100 CE', chip: 'Four empires',
    caption: 'For the first time a chain of large, stable empires stretched across Eurasia: Rome, Parthia, the Kushans and Han China. Their peace and roads made long-distance trade possible.',
    view: WHOLE,
    lands: [{ label: 'Roman Empire', color: C.rome, polys: [ROME_WEST, ROME_EAST_100], at: [14.0, 46.5] }, { label: 'Parthia', color: C.parthia, polys: [PARTHIA], at: [55.0, 30.5] },
      { label: 'Kushan', color: C.kushan, polys: [KUSHAN], at: [72.5, 29.5] }, { label: 'Han China', color: C.han, polys: [HAN_CHINA, TARIM], at: [110.0, 29.0] }],
    tags: [{ text: 'Xiongnu nomads', at: [104.0, 46.0] }, { text: 'Germanic peoples', at: [16.0, 53.5] }],
    cities: ['rome', 'alexandria', 'purushapura', 'changan', 'luoyang'],
  },
  {
    title: 'The overland Silk Roads, c. 100 CE', chip: 'Silk Roads',
    caption: 'Caravans crossed deserts and mountains in short stages, trading at oasis towns. Silk went west; horses, glass, gold and other goods went east. Few merchants ever traveled the whole way.',
    view: [28, 15, 122, 50],
    lands: FAINT_EMPIRES,
    routes: [{ pts: SILK_NORTH, color: C.road, label: 'northern route', labelAt: [86.0, 43.4] }, { pts: SILK_SOUTH, color: C.road, label: 'southern route', labelAt: [90.5, 37.2] },
      { pts: SILK_WEST, color: C.road }, { pts: SILK_BACTRA, color: C.road }, { pts: SILK_INDIA, color: C.road }],
    tags: [{ text: 'silk · lacquer', at: [104.5, 30.0] }, { text: 'jade', at: [80.0, 34.3] }, { text: 'horses', at: [70.5, 42.0] }, { text: 'spices · cotton · gems', at: [77.5, 22.5] },
      { text: 'glass · gold · wine', at: [37.5, 31.0] }],
    cities: ['changan', 'dunhuang', 'kashgar', 'khotan', 'samarkand', 'bactra', 'merv', 'ctesiphon', 'antioch', 'purushapura', 'mathura'],
  },
  {
    title: 'Monsoon sea lanes, c. 100 CE', chip: 'Sea lanes',
    caption: 'Sailors learned the monsoon: southwest winds in summer carried ships to India, northeast winds in winter brought them home. Sea lanes linked Egypt, Arabia, East Africa, India, Southeast Asia and China.',
    view: [28, -12, 120, 34],
    lands: FAINT_EMPIRES,
    routes: [{ pts: SEA_RED, color: C.sea, dashed: true, arrow: true, label: 'to India', labelAt: [62.0, 11.2] }, { pts: SEA_BARYGAZA, color: C.sea, dashed: true, arrow: true }, { pts: SEA_GULF, color: C.sea, dashed: true },
      { pts: SEA_AFRICA, color: C.sea, dashed: true, arrow: true }, { pts: SEA_EAST, color: C.sea, dashed: true }, { pts: SEA_CHINA, color: C.sea, dashed: true, arrow: true }, { pts: SEA_BENGAL, color: C.sea, dashed: true }],
    tags: [{ text: 'summer: SW monsoon →', at: [60.0, 15.0] }, { text: '← winter: NE monsoon', at: [64.0, 4.0] }, { text: 'pepper · pearls', at: [80.5, 17.5] },
      { text: 'ivory · tortoise shell', at: [46.0, -4.0] }, { text: 'spices · tin', at: [95.0, 13.0] }, { text: 'silk', at: [111.5, 27.0] }],
    cities: ['berenice', 'aden', 'barygaza', 'muziris', 'anuradhapura', 'tamralipti', 'oceo', 'jiaozhi', 'guangzhou', 'rhapta'],
  },
  {
    title: 'Buddhism spreads, c. 100 BCE – 500 CE', chip: 'Buddhism',
    caption: 'Merchants and monks carried Buddhism from India through Bactria and the oasis towns to China. By sea, Buddhism and Hinduism reached Sri Lanka and Southeast Asia, where rulers took Indian titles and wrote in Sanskrit.',
    view: [56, 0, 128, 46],
    lands: [{ label: '', color: C.kushan, polys: [KUSHAN], faint: true }, { label: '', color: C.han, polys: [HAN_CHINA, TARIM], faint: true }],
    routes: [{ pts: BUDDHISM_LAND, color: C.buddha, arrow: true, label: 'Buddhism by land', labelAt: [89.0, 41.6] }, { pts: BUDDHISM_LANKA, color: C.buddha, arrow: true, dashed: true },
      { pts: BUDDHISM_SEA, color: C.buddha, arrow: true, dashed: true, label: 'Buddhism & Hinduism by sea', labelAt: [93.5, 13.0] }],
    tags: [{ text: 'monasteries shelter merchants', at: [80.5, 44.6] }, { text: 'rajas · Sanskrit', at: [103.0, 15.0] }],
    cities: ['bodhgaya', 'mathura', 'purushapura', 'bactra', 'kashgar', 'khotan', 'dunhuang', 'luoyang', 'anuradhapura', 'oceo'],
  },
  {
    title: 'Christianity and Manichaeism, c. 200–500 CE', chip: 'Christianity & Mani',
    caption: 'Christianity spread around the Mediterranean and east into Mesopotamia, Persia and India. Mani’s faith spread from Mesopotamia west to Roman cities and east along the Silk Roads.',
    view: [-12, 0, 82, 50],
    lands: [{ label: '', color: C.rome, polys: [ROME_WEST, ROME_EAST_100], faint: true }, { label: '', color: C.parthia, polys: [PARTHIA], faint: true }],
    routes: [{ pts: CHRIST_WEST, color: C.christ, arrow: true, label: 'Christianity', labelAt: [23.5, 34.0] }, { pts: CHRIST_AFRICA, color: C.christ, arrow: true }, { pts: CHRIST_ANATOLIA, color: C.christ, arrow: true },
      { pts: CHRIST_EAST, color: C.christ, arrow: true }, { pts: CHRIST_INDIA, color: C.christ, arrow: true, dashed: true }, { pts: CHRIST_AXUM, color: C.christ, arrow: true },
      { pts: MANI_WEST, color: C.mani, arrow: true, label: 'Manichaeism', labelAt: [15.0, 32.8] }, { pts: MANI_ROME, color: C.mani, arrow: true, dashed: true }, { pts: MANI_EAST, color: C.mani, arrow: true }],
    tags: [{ text: 'Nestorians, after 431', at: [53.0, 42.5] }, { text: 'Christians in India', at: [72.0, 17.5] }, { text: 'Axum converts, c. 330', at: [35.0, 9.5] }, { text: 'Mani, c. 216–274', at: [48.5, 30.0] }],
    cities: ['jerusalem', 'antioch', 'rome', 'constantinople', 'alexandria', 'carthage', 'hippo', 'neocaesarea', 'ctesiphon', 'merv', 'samarkand', 'muziris', 'axum'],
  },
  {
    title: 'Epidemics, 160s–540s CE', chip: 'Epidemics',
    caption: 'Trade routes also carried germs. Smallpox, measles and later bubonic plague struck people with no immunity. Rome and China each lost roughly a quarter of their people.',
    view: WHOLE,
    lands: [{ label: '', color: C.rome, polys: [ROME_WEST, ROME_EAST_100], faint: true }, { label: '', color: C.han, polys: [HAN_CHINA], faint: true }],
    routes: [{ pts: [...SILK_WEST].reverse(), color: C.rome }, { pts: SILK_NORTH, color: C.rome }, { pts: SEA_RED, color: C.rome, dashed: true }, { pts: SEA_EAST, color: C.rome, dashed: true },
      { pts: SEA_CHINA, color: C.rome, dashed: true }],
    tags: [{ text: 'Antonine Plague, 165–180', at: [16.0, 50.0] }, { text: 'Plague of Cyprian, 250s', at: [10.0, 28.5] }, { text: 'Plague of Justinian, 541–542', at: [33.0, 20.0] },
      { text: 'epidemics in China, 160s–180s', at: [110.0, 50.5] }, { text: 'Rome: c. 60 → 45 million (by 400)', at: [16.0, 54.5] }, { text: 'China: c. 60 → 45 million (200–600)', at: [110.0, 46.0] }],
    cities: ['rome', 'constantinople', 'alexandria', 'ctesiphon', 'luoyang', 'guangzhou'],
  },
  {
    title: 'The fall of the Han, 184–220 CE', chip: 'Fall of Han',
    caption: 'Court intrigue, greedy landlords, epidemics and the Yellow Turban rebellion wrecked the Han. In 220 CE the dynasty ended and China split into three kingdoms while nomads moved into the north.',
    view: [92, 17, 130, 46],
    lands: [{ label: 'Wei', color: C.han, polys: [WEI], at: [107.0, 37.5] }, { label: 'Shu', color: C.kushan, polys: [SHU], at: [103.5, 27.0] }, { label: 'Wu', color: C.parthia, polys: [WU], at: [114.0, 27.0] }],
    routes: [{ pts: XIONGNU, color: C.road, arrow: true, label: 'Xiongnu', labelAt: [108.0, 44.6] }, { pts: XIANBEI, color: C.road, arrow: true, label: 'Xianbei', labelAt: [119.0, 44.2] }],
    tags: [{ text: 'Yellow Turbans, 184', at: [116.5, 36.3] }, { text: 'Three Kingdoms, 220–280', at: [111.0, 19.5] }],
    cities: ['luoyang', 'changan', 'chengdu', 'jianye'],
  },
  {
    title: 'The fall of western Rome, 376–476 CE', chip: 'Fall of Rome',
    caption: 'Pushed by the Huns, Visigoths crossed the Danube in 376 and sacked Rome in 410. Vandals took Spain and Africa. In 476 the Germanic general Odoacer deposed the last western emperor; the eastern empire survived.',
    view: [-12, 30, 45, 58],
    lands: [{ label: 'Western empire', color: C.rome, polys: [ROME_WEST], at: [3.0, 46.5] }, { label: 'Eastern empire', color: C.east, polys: [ROME_EAST_400], at: [34.5, 39.0] }],
    routes: [{ pts: HUNS, color: '#24303F', arrow: true, label: 'Huns', labelAt: [38.0, 47.3] }, { pts: ATTILA, color: '#24303F', arrow: true, dashed: true, label: 'Attila, 451', labelAt: [12.5, 48.6] },
      { pts: VISIGOTHS, color: C.parthia, arrow: true, label: 'Visigoths', labelAt: [21.0, 42.6] }, { pts: VANDALS, color: C.mani, arrow: true, label: 'Vandals', labelAt: [-4.0, 39.0] },
      { pts: VANDAL_RAID, color: C.mani, arrow: true, dashed: true }],
    tags: [{ text: 'Rome sacked, 410', at: [7.5, 40.2] }, { text: 'Odoacer, 476', at: [7.0, 42.7] }, { text: 'Carthage, 439', at: [10.5, 34.0] }, { text: 'Adrianople, 378', at: [33.0, 43.2] }],
    cities: ['rome', 'ravenna', 'constantinople', 'carthage', 'adrianople', 'chalons', 'toulouse'],
  },
]

// base: the base map in src/geo; aspect: height / width of the map frame.
export default { base: 'world', aspect: 0.62, cities: CITIES, steps: STEPS }
