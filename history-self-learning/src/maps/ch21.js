// Chapter 21 map layers (longitude, latitude). Territory outlines are drawn loosely over
// the sea: the map clips every territory to the coastline, so only land frontiers need care.
// Sources for frontiers and routes: standard historical atlases (Mongol khanates c. 1300, Mali c. 1330,
// Ming China c. 1415, the Black Death's spread 1346–1353, Zheng He's and the Portuguese voyages).
// Travelers' routes are simplified to their main stops.

const CITIES = {
  venice: { name: 'Venice', at: [12.34, 45.44] },
  genoa: { name: 'Genoa', at: [8.93, 44.41], side: 'left' },
  rome: { name: 'Rome', at: [12.5, 41.9], side: 'below' },
  constantinople: { name: 'Constantinople', at: [28.98, 41.01] },
  caffa: { name: 'Caffa', at: [35.38, 45.03] },
  cairo: { name: 'Cairo', at: [31.24, 30.04], big: true, side: 'left' },
  alexandria: { name: 'Alexandria', at: [29.9, 31.2], side: 'left' },
  damascus: { name: 'Damascus', at: [36.3, 33.5] },
  baghdad: { name: 'Baghdad', at: [44.4, 33.3] },
  mecca: { name: 'Mecca', at: [39.83, 21.42], side: 'left' },
  tabriz: { name: 'Tabriz', at: [46.3, 38.08] },
  maragha: { name: 'Maragha', at: [46.24, 37.39], side: 'below' },
  hormuz: { name: 'Hormuz', at: [56.46, 27.1] },
  aden: { name: 'Aden', at: [45.03, 12.79], side: 'below' },
  mogadishu: { name: 'Mogadishu', at: [45.34, 2.04] },
  malindi: { name: 'Malindi', at: [40.12, -3.22] },
  kilwa: { name: 'Kilwa', at: [39.51, -8.96] },
  samarkand: { name: 'Samarkand', at: [66.96, 39.65], big: true },
  sarai: { name: 'Sarai', at: [47.1, 46.6] },
  karakorum: { name: 'Karakorum', at: [102.83, 47.2] },
  khanbaliq: { name: 'Khanbaliq', at: [116.4, 39.9], big: true },
  beijing: { name: 'Beijing', at: [116.4, 39.9], big: true },
  nanjing: { name: 'Nanjing', at: [118.8, 32.06], big: true },
  quanzhou: { name: 'Quanzhou', at: [118.59, 24.87] },
  delhi: { name: 'Delhi', at: [77.2, 28.6], big: true },
  calicut: { name: 'Calicut', at: [75.78, 11.25], big: true },
  malacca: { name: 'Malacca', at: [102.25, 2.19] },
  timbuktu: { name: 'Timbuktu', at: [-3.0, 16.77] },
  tangier: { name: 'Tangier', at: [-5.8, 35.77], side: 'left' },
  fez: { name: 'Fez', at: [-5.0, 34.03], side: 'left' },
  paris: { name: 'Paris', at: [2.35, 48.86] },
  bordeaux: { name: 'Bordeaux', at: [-0.58, 44.84], side: 'below' },
  lyon: { name: 'Lyon', at: [4.83, 45.76] },
  london: { name: 'London', at: [-0.12, 51.5], side: 'left' },
  messina: { name: 'Messina', at: [15.55, 38.19] },
  marseille: { name: 'Marseille', at: [5.37, 43.3], side: 'below' },
  florence: { name: 'Florence', at: [11.25, 43.77] },
  bergen: { name: 'Bergen', at: [5.32, 60.39], side: 'left' },
  moscow: { name: 'Moscow', at: [37.6, 55.75] },
  issykKul: { name: 'Issyk-Kul', at: [76.5, 42.4], side: 'below' },
  lisbon: { name: 'Lisbon', at: [-9.14, 38.72], side: 'left' },
  palos: { name: 'Palos', at: [-6.89, 37.23], side: 'below' },
  ceuta: { name: 'Ceuta', at: [-5.31, 35.89], side: 'below' },
  madeira: { name: 'Madeira', at: [-16.92, 32.65], side: 'left' },
  azores: { name: 'Azores', at: [-25.67, 37.74], side: 'left' },
  bojador: { name: 'Cape Bojador', at: [-14.5, 26.13] },
  capeVerde: { name: 'Cape Verde Is.', at: [-23.6, 15.1], side: 'left' },
  elmina: { name: 'Elmina', at: [-1.35, 5.08] },
  goodHope: { name: 'Cape of Good Hope', at: [18.47, -34.36], side: 'left' },
  sanSalvador: { name: 'San Salvador', at: [-74.5, 24.05], side: 'below' },
}

// ---------- territories ----------
const MONGOL_KHANATES = [
  [28.5, 45.6], [30.0, 49.0], [34.0, 52.0], [40.0, 55.0], [48.0, 57.0], [56.0, 57.0], [65.0, 55.5], [75.0, 54.5], [85.0, 52.5],
  [95.0, 52.5], [105.0, 52.0], [115.0, 52.5], [125.0, 51.0], [132.0, 48.0], [136.0, 44.0], [133.0, 40.0], [126.0, 35.0],
  [123.0, 30.0], [121.0, 25.0], [117.0, 22.0], [111.0, 18.0], [108.0, 21.2], [106.5, 22.6], [104.0, 22.8], [101.0, 21.8],
  [98.5, 24.0], [97.5, 28.0], [92.0, 28.0], [86.0, 27.9], [81.0, 30.2], [78.5, 32.5], [75.5, 35.5], [72.0, 34.0],
  [70.0, 31.0], [66.5, 28.0], [62.0, 25.0], [57.0, 24.5], [52.0, 26.8], [48.5, 29.6], [46.5, 30.5], [44.5, 32.0],
  [42.0, 34.2], [40.5, 36.0], [38.0, 37.3], [36.2, 37.0], [33.0, 36.0], [29.0, 36.3], [26.5, 38.0], [26.3, 40.3],
  [29.5, 41.2], [33.0, 42.2], [37.0, 41.6], [41.5, 41.5], [37.0, 44.8], [33.0, 45.8],
]
const MALI = [[-17.5, 16.5], [-16.5, 12.5], [-12.5, 10.0], [-9.0, 8.5], [-6.0, 9.5], [-3.5, 11.0], [-1.0, 13.0], [1.5, 15.5], [1.0, 18.0], [-2.0, 19.5], [-6.0, 19.5], [-10.0, 18.0], [-14.0, 17.5]]
const MAMLUKS = [[24.8, 31.9], [25.0, 29.0], [25.0, 22.0], [31.0, 21.6], [35.5, 22.0], [37.5, 19.5], [40.5, 19.0], [41.0, 22.0], [39.2, 25.5], [38.0, 28.5], [37.0, 30.5], [38.5, 32.5], [40.5, 35.8], [38.0, 37.2], [36.2, 37.0], [35.6, 36.4], [34.0, 34.5], [33.0, 32.5], [30.5, 31.7]]
const DELHI = [[70.5, 31.0], [72.0, 34.0], [74.5, 33.0], [77.5, 31.5], [80.5, 29.8], [84.0, 27.8], [88.0, 26.5], [89.5, 24.5], [88.5, 21.5], [86.5, 20.0], [83.0, 17.0], [80.5, 13.5], [78.0, 11.5], [76.5, 13.0], [74.5, 15.0], [73.0, 18.0], [72.5, 21.0], [69.5, 22.5], [68.0, 24.0], [67.5, 26.5], [69.0, 29.0]]
const GOLDEN_HORDE = [[28.5, 45.6], [30.0, 49.0], [34.0, 52.0], [40.0, 55.0], [48.0, 57.0], [56.0, 57.0], [65.0, 55.5], [72.0, 54.5], [75.0, 50.0], [70.0, 46.0], [64.0, 43.0], [60.0, 41.5], [55.0, 41.5], [50.0, 43.0], [48.0, 41.5], [45.0, 42.5], [41.5, 43.0], [37.0, 44.8], [33.0, 45.8]]
const MING = [
  [97.6, 39.6], [100.0, 38.4], [104.0, 37.6], [106.5, 38.6], [110.0, 39.6], [112.5, 40.6], [115.0, 41.2], [118.0, 40.5],
  [120.5, 41.2], [122.5, 42.6], [124.5, 42.0], [125.5, 40.2], [124.0, 37.5], [122.5, 34.0], [122.5, 29.5], [120.5, 26.0],
  [117.0, 22.5], [113.0, 21.0], [111.5, 17.5], [108.0, 17.8], [107.8, 21.5], [106.5, 22.6], [105.0, 23.3], [103.0, 22.6],
  [101.5, 21.4], [100.0, 21.7], [98.6, 24.0], [97.6, 25.5], [98.6, 27.6], [99.0, 29.0], [100.4, 30.5], [101.5, 32.5],
  [101.5, 34.5], [100.4, 36.2], [98.5, 37.6],
]
const PORTUGAL = [[-10.5, 36.8], [-10.5, 42.2], [-8.2, 42.15], [-6.2, 41.95], [-6.9, 41.0], [-6.9, 39.3], [-7.3, 38.0], [-7.4, 37.0]]
const ISLANDS = [[[-17.6, 32.2], [-16.0, 32.2], [-16.0, 33.3], [-17.6, 33.3]], [[-31.5, 36.7], [-24.6, 36.7], [-24.6, 40.0], [-31.5, 40.0]], [[-25.6, 14.6], [-22.5, 14.6], [-22.5, 17.4], [-25.6, 17.4]]]

// ---------- routes ----------
const SILK = [
  [[116.4, 39.9], [112.5, 38.0], [108.9, 34.3], [103.8, 36.1], [100.4, 38.9], [94.66, 40.14], [89.2, 42.9], [83.0, 41.7], [76.0, 39.5], [66.96, 39.65], [64.4, 39.77], [61.8, 37.6], [58.8, 36.2], [51.4, 35.6], [46.3, 38.08], [41.3, 39.9], [39.7, 41.0]],
  [[51.4, 35.6], [48.5, 34.8], [44.4, 33.3], [40.0, 35.3], [37.16, 36.2], [35.8, 36.9]],
  [[66.96, 39.65], [68.3, 42.85], [60.0, 46.5], [51.9, 47.1], [47.1, 46.6], [39.3, 47.1], [35.38, 45.03]],
]
const SAHARA = [
  [[-3.0, 16.77], [-5.0, 23.6], [-4.25, 31.28], [-5.0, 34.03]],
  [[0.04, 16.27], [3.5, 20.0], [6.0, 25.5], [9.5, 30.1], [10.18, 36.8]],
  [[0.04, 16.27], [-3.0, 16.77]],
]
const SEA = [
  [[118.59, 24.87], [114.0, 21.0], [110.0, 15.0], [106.5, 8.5], [104.4, 1.3], [102.25, 2.19], [98.0, 5.8], [92.0, 6.5], [81.0, 5.6], [77.0, 7.6], [75.78, 11.25]],
  [[75.78, 11.25], [70.0, 17.0], [62.0, 23.0], [57.7, 25.6], [56.46, 27.1]],
  [[75.78, 11.25], [65.0, 12.5], [52.0, 12.4], [45.03, 12.79], [43.4, 12.6], [40.0, 17.0], [36.5, 22.5], [34.28, 26.1]],
  [[45.03, 12.79], [51.8, 11.9], [49.0, 5.0], [45.6, 1.7], [41.0, -2.6], [39.9, -8.9]],
  [[12.34, 45.44], [14.5, 43.5], [18.6, 39.9], [22.0, 36.2], [28.0, 33.7], [29.9, 31.2]],
  [[22.0, 36.2], [25.0, 38.0], [26.2, 40.0], [28.98, 41.01], [31.0, 42.5], [33.5, 44.0], [35.38, 45.03]],
  [[8.93, 44.41], [9.8, 40.0], [12.0, 37.6], [17.0, 35.5], [22.0, 36.2]],
]
const NILE = [[34.28, 26.1], [32.8, 25.9], [31.24, 30.04]]

const POLO_OUT = [[12.34, 45.44], [14.5, 43.5], [18.6, 39.9], [23.0, 35.8], [30.0, 34.0], [35.07, 32.93], [35.8, 36.9], [39.0, 38.8], [44.0, 38.6], [46.3, 38.08], [51.0, 34.5], [57.1, 30.3], [56.46, 27.1], [57.1, 30.3], [61.5, 33.5], [66.9, 36.76], [71.0, 37.2], [76.0, 39.5], [79.9, 37.1], [88.0, 39.0], [94.66, 40.14], [100.4, 38.9], [106.0, 40.5], [111.6, 40.8], [116.2, 42.36], [116.4, 39.9]]
const POLO_HOME = [[118.59, 24.87], [114.0, 21.0], [110.0, 15.0], [106.5, 8.5], [104.4, 1.3], [100.5, 3.5], [97.3, 5.5], [92.0, 6.5], [81.0, 5.6], [77.0, 7.6], [73.0, 15.0], [66.0, 22.5], [58.5, 24.8], [56.46, 27.1]]
const POLO_HOME_LAND = [[56.46, 27.1], [57.1, 30.3], [51.0, 34.5], [46.3, 38.08], [41.3, 39.9], [39.7, 41.0]]
const POLO_HOME_SEA = [[39.7, 41.0], [33.0, 42.2], [29.2, 41.3], [26.3, 40.1], [24.5, 37.0], [21.0, 36.6], [18.6, 39.9], [14.5, 43.5], [12.34, 45.44]]
const IBN_EAST = [[-5.8, 35.77], [3.0, 36.6], [10.18, 36.8], [13.2, 32.9], [20.07, 32.1], [29.9, 31.2], [31.24, 30.04], [34.5, 31.5], [36.3, 33.5], [39.6, 24.47], [39.83, 21.42], [41.0, 18.0], [43.5, 14.0], [45.03, 12.79], [51.0, 11.9], [47.0, 4.0], [45.34, 2.04], [41.0, -2.5], [39.51, -8.96], [44.0, -2.0], [52.0, 12.5], [54.1, 17.0], [58.5, 23.6], [56.46, 27.1], [52.5, 29.6], [48.0, 33.5], [44.0, 37.5], [38.0, 39.2], [33.0, 40.0], [35.15, 42.0], [35.38, 45.03], [40.0, 47.2], [47.1, 46.6], [55.0, 43.5], [60.6, 42.3], [64.4, 39.77], [66.96, 39.65], [66.9, 36.76], [69.2, 34.5], [72.5, 32.0], [77.2, 28.6], [76.5, 20.0], [75.78, 11.25], [73.5, 4.2], [79.9, 6.9], [86.0, 15.0], [91.8, 22.3], [93.0, 14.0], [97.15, 5.2], [104.4, 1.3], [107.5, 10.0], [113.0, 20.0], [118.59, 24.87]]
const IBN_MALI = [[-5.0, 34.03], [-4.25, 31.28], [-5.0, 23.6], [-7.0, 17.3], [-8.5, 12.5], [-3.0, 16.77], [0.04, 16.27], [6.4, 17.4], [1.5, 27.5], [-4.25, 31.28]]

const CARPINI = [[4.83, 45.76], [12.0, 48.5], [19.94, 50.06], [30.52, 50.45], [40.0, 48.5], [47.1, 46.6], [58.0, 47.0], [70.0, 45.0], [83.0, 46.0], [93.0, 47.0], [102.83, 47.2]]
const SAUMA_WEST = [[116.4, 39.9], [108.0, 40.5], [100.4, 38.9], [94.66, 40.14], [89.2, 42.9], [83.0, 41.7], [76.0, 39.5], [66.96, 39.65], [61.8, 37.6], [58.8, 36.2], [51.4, 35.6], [46.24, 37.39]]
const SAUMA_1287 = [[46.24, 37.39], [41.3, 39.9], [39.7, 41.0], [33.0, 42.2], [28.98, 41.01], [26.3, 40.1], [23.0, 37.0], [19.0, 38.5], [15.6, 38.2], [14.25, 40.85], [12.5, 41.9], [10.5, 43.0], [8.93, 44.41], [5.5, 45.5], [2.35, 48.86], [-0.58, 44.84]]
const MONTECORVINO = [[12.5, 41.9], [16.0, 38.0], [24.0, 35.5], [33.0, 34.5], [35.8, 36.9], [41.0, 39.0], [46.3, 38.08], [52.0, 31.0], [56.46, 27.1], [62.0, 22.5], [72.0, 12.0], [77.0, 7.6], [80.27, 13.08], [88.0, 8.0], [97.0, 6.0], [104.4, 1.3], [110.0, 15.0], [118.59, 24.87], [118.0, 32.0], [116.4, 39.9]]

const PLAGUE_EAST = [[76.5, 42.4], [68.3, 42.85], [60.0, 46.5], [51.9, 47.1], [47.1, 46.6], [39.3, 47.1], [35.38, 45.03]]
const PLAGUE_SEA = [
  [[35.38, 45.03], [33.5, 44.0], [31.0, 42.5], [28.98, 41.01]],
  [[28.98, 41.01], [26.3, 40.1], [24.5, 37.0], [20.0, 36.3], [15.55, 38.19]],
  [[24.5, 37.0], [28.0, 33.7], [29.9, 31.2]],
  [[15.55, 38.19], [12.0, 39.5], [9.8, 42.5], [8.93, 44.41]],
  [[15.55, 38.19], [10.0, 38.8], [6.5, 41.5], [5.37, 43.3]],
  [[15.55, 38.19], [18.6, 39.9], [14.5, 43.5], [12.34, 45.44]],
  [[-1.2, 46.0], [-5.5, 48.5], [-3.5, 50.0], [-2.45, 50.6]],
  [[-0.12, 51.5], [2.5, 53.5], [4.0, 58.5], [5.32, 60.39]],
]
const PLAGUE_LAND = [
  [[5.37, 43.3], [4.83, 45.76], [2.35, 48.86]],
  [[4.83, 45.76], [1.0, 45.5], [-0.58, 44.84], [-1.2, 46.0]],
  [[8.93, 44.41], [11.25, 43.77]],
  [[-2.45, 50.6], [-0.12, 51.5]],
  [[12.34, 45.44], [11.4, 47.3], [10.0, 50.0], [13.4, 52.5], [18.6, 54.35], [28.33, 57.82], [37.6, 55.75]],
  [[29.9, 31.2], [31.24, 30.04], [34.5, 31.5], [36.3, 33.5]],
]

const ZHENG_HE = [[118.8, 32.06], [121.2, 31.7], [123.0, 29.0], [120.0, 25.6], [116.0, 22.0], [111.0, 17.0], [109.6, 13.8], [107.0, 9.0], [104.6, 1.4], [102.25, 2.19], [98.0, 5.8], [92.0, 6.5], [81.0, 5.6], [77.0, 7.6], [75.78, 11.25], [68.0, 18.0], [60.5, 23.5], [57.7, 25.6], [56.46, 27.1]]
const ZHENG_HE_AFRICA = [[80.5, 5.5], [73.5, 3.0], [60.0, 2.0], [45.8, 1.8], [42.0, -1.2], [40.2, -3.1]]
const ZHENG_HE_ADEN = [[75.78, 11.25], [62.0, 13.0], [52.0, 12.4], [45.03, 12.79]]

const DIAS = [[-9.14, 38.72], [-10.5, 35.5], [-14.0, 29.0], [-17.5, 22.0], [-18.2, 15.0], [-15.5, 10.0], [-11.5, 5.8], [-5.0, 4.3], [2.0, 5.2], [8.0, 3.3], [8.5, -1.0], [11.0, -5.5], [12.0, -12.0], [11.5, -18.0], [13.5, -23.5], [15.5, -29.0], [17.6, -34.6], [20.0, -35.6], [22.2, -34.5], [26.6, -34.0]]
const ISLAND_RUNS = [[[-8.94, 37.0], [-13.0, 34.5], [-16.9, 32.7]], [[-8.94, 37.0], [-17.0, 37.5], [-25.6, 37.7]]]
const COLUMBUS = [[-6.89, 37.23], [-11.0, 33.0], [-15.4, 28.1], [-30.0, 27.8], [-45.0, 27.5], [-60.0, 26.0], [-74.5, 24.05]]
const DA_GAMA = [[-9.14, 38.72], [-14.0, 29.0], [-23.5, 15.0], [-26.0, 2.0], [-29.0, -15.0], [-25.0, -30.0], [-10.0, -38.0], [8.0, -37.0], [18.0, -35.3], [22.2, -34.5], [31.5, -29.5], [35.8, -24.0], [40.73, -15.03], [40.6, -9.0], [39.67, -4.04], [40.12, -3.22], [52.0, 4.0], [66.0, 10.0], [75.78, 11.25]]

// ---------- map steps (the animated map) ----------
// view: [lonMin, latMin, lonMax, latMax] to zoom in, or null for the whole map.
const C = { mongol: '#C99A3D', mali: '#4E7A55', mamluk: '#6E5A8F', delhi: '#B5482A', ming: '#B5482A', portugal: '#4E7A55', land: '#7A3B22', sea: '#2E6E9A', sahara: '#C99A3D' }
const STEPS = [
  {
    title: 'Trade networks, c. 1300', caption: 'Three great networks carry goods across Afro-Eurasia: the Silk Roads overland (solid), the sea lanes of the Mediterranean and Indian Ocean (dashed), and camel caravans across the Sahara (gold). Rich trading cities grow where they meet.',
    view: [-20, -12, 135, 58],
    lands: [{ label: 'Mongol khanates', color: C.mongol, polys: [MONGOL_KHANATES], at: [98.0, 47.5] }, { label: 'Mali', color: C.mali, polys: [MALI], at: [-8.5, 14.5] },
      { label: 'Mamluks', color: C.mamluk, polys: [MAMLUKS], at: [29.0, 25.5] }],
    routes: [{ pts: SILK[0], color: C.land, label: 'Silk Roads', labelAt: [79.0, 42.2] }, ...SILK.slice(1).map(pts => ({ pts, color: C.land })), { pts: SEA[0], color: C.sea, dashed: true, label: 'Indian Ocean sea lanes', labelAt: [87.0, 0.0] }, ...SEA.slice(1).map(pts => ({ pts, color: C.sea, dashed: true })), { pts: NILE, color: C.land }, { pts: SAHARA[0], color: C.sahara, label: 'Sahara caravans', labelAt: [-7.5, 29.5] }, ...SAHARA.slice(1).map(pts => ({ pts, color: C.sahara }))],
    tags: [{ text: 'silk · porcelain', at: [109.0, 28.0] }, { text: 'pepper · cotton cloth', at: [62.0, 6.5] }, { text: 'gold · salt', at: [-11.5, 22.5] }, { text: 'gold · ivory', at: [50.0, -4.0] }, { text: 'spices · silk to Europe', at: [20.5, 33.2] }],
    cities: ['venice', 'genoa', 'caffa', 'cairo', 'baghdad', 'hormuz', 'calicut', 'malacca', 'quanzhou', 'khanbaliq', 'samarkand', 'kilwa', 'timbuktu'],
  },
  {
    title: 'Marco Polo and Ibn Battuta, 1271–1354', caption: 'Marco Polo (red) went overland to Khubilai Khan’s court and came home by sea. Ibn Battuta (green) crossed the whole Islamic world, from Morocco to China, and later visited Mali. Routes are simplified.',
    view: [-20, -12, 135, 58],
    lands: [{ label: 'Delhi Sultanate', color: C.delhi, polys: [DELHI], at: [80.0, 23.0], faint: true }, { label: '', color: C.mali, polys: [MALI], faint: true }],
    routes: [{ pts: POLO_OUT, color: '#B5482A', arrow: true, label: 'Marco Polo, 1271–75', labelAt: [88.0, 41.5] }, { pts: POLO_HOME, color: '#B5482A', dashed: true, label: 'home by sea, 1292–95', labelAt: [86.0, -1.5] },
      { pts: POLO_HOME_LAND, color: '#B5482A' }, { pts: POLO_HOME_SEA, color: '#B5482A', dashed: true, arrow: true },
      { pts: IBN_EAST, color: '#4E7A55', arrow: true, label: 'Ibn Battuta, 1325–46', labelAt: [56.0, 4.0] }, { pts: IBN_MALI, color: '#4E7A55', arrow: true, label: 'to Mali, 1352–53', labelAt: [-1.0, 25.0] }],
    cities: ['venice', 'tangier', 'cairo', 'mecca', 'kilwa', 'samarkand', 'delhi', 'calicut', 'quanzhou', 'khanbaliq', 'timbuktu', 'hormuz'],
  },
  {
    title: 'Diplomats and missionaries, 1245–1294', caption: 'Envoys and priests crossed Eurasia in both directions. The pope’s envoy Carpini reached the Mongol capital; the Nestorian monk Rabban Sauma carried a Mongol offer of alliance to Rome and Paris; the friar John of Montecorvino built churches in Khanbaliq.',
    view: [-12, 4, 131, 60],
    lands: [{ label: '', color: C.mongol, polys: [MONGOL_KHANATES], faint: true }],
    routes: [{ pts: CARPINI, color: '#6E5A8F', arrow: true, label: 'Carpini, 1245–47', labelAt: [70.0, 47.5] },
      { pts: SAUMA_WEST, color: '#B5482A', label: 'Rabban Sauma', labelAt: [88.0, 38.5] }, { pts: SAUMA_1287, color: '#B5482A', arrow: true, label: 'Sauma’s mission, 1287', labelAt: [15.0, 35.6] },
      { pts: MONTECORVINO, color: '#2E6E9A', dashed: true, arrow: true, label: 'John of Montecorvino, 1289–94', labelAt: [96.0, 14.0] }],
    tags: [{ text: 'Sufis spread Islam', at: [80.0, 22.0] }, { text: '“Submit!” Güyük Khan, 1246', at: [103.0, 52.0] }],
    cities: ['lyon', 'rome', 'paris', 'bordeaux', 'constantinople', 'maragha', 'karakorum', 'khanbaliq'],
  },
  {
    title: 'The Black Death, 1346–1353', caption: 'Plague moved west along Mongol trade routes. It hit the Black Sea port of Caffa in 1346, rode Italian ships through the Mediterranean in 1347, swept western Europe in 1348, and reached Scandinavia and Russia by the early 1350s.',
    view: [-14, 22, 82, 64],
    lands: [{ label: 'Golden Horde', color: C.mongol, polys: [GOLDEN_HORDE], at: [58.0, 51.0] }],
    routes: [{ pts: PLAGUE_EAST, color: '#7A3B22', arrow: true, label: 'from Central Asia', labelAt: [62.0, 45.5] }, ...PLAGUE_SEA.map(pts => ({ pts, color: '#B5482A', dashed: true, arrow: true })), ...PLAGUE_LAND.map(pts => ({ pts, color: '#B5482A', arrow: true }))],
    tags: [{ text: '1338–39', at: [76.5, 45.2] }, { text: '1346', at: [36.0, 47.8] }, { text: '1347', at: [30.5, 39.0] }, { text: '1347', at: [17.4, 36.8] }, { text: '1348', at: [2.3, 46.6] },
      { text: '1348', at: [-6.5, 54.0] }, { text: '1348', at: [34.0, 28.4] }, { text: '1349', at: [9.0, 60.0] }, { text: '1350', at: [14.0, 51.8] }, { text: '1351–53', at: [33.0, 58.8] }],
    cities: ['issykKul', 'sarai', 'caffa', 'constantinople', 'messina', 'genoa', 'venice', 'florence', 'marseille', 'paris', 'london', 'bergen', 'moscow', 'cairo', 'damascus'],
  },
  {
    title: 'Ming China and Zheng He, 1405–1433', caption: 'The Yongle emperor sent Admiral Zheng He on seven huge voyages with up to 300 ships. The fleet called at Malacca, Calicut and Hormuz and reached Aden, Mogadishu and Malindi, collecting tribute and showing off Ming power. Then the voyages stopped.',
    view: [30, -12, 125, 46],
    lands: [{ label: 'Ming China', color: C.ming, polys: [MING], at: [107.0, 31.0] }],
    routes: [{ pts: ZHENG_HE, color: '#2E6E9A', dashed: true, arrow: true, label: 'Zheng He, 1405–33', labelAt: [90.0, 16.5] }, { pts: ZHENG_HE_AFRICA, color: '#2E6E9A', dashed: true, arrow: true }, { pts: ZHENG_HE_ADEN, color: '#2E6E9A', dashed: true, arrow: true }],
    tags: [{ text: 'silk · porcelain out', at: [94.0, 0.5] }, { text: 'tribute · giraffe home', at: [57.0, -7.0] }, { text: 'Mongols threaten the north', at: [108.0, 43.8] }],
    cities: ['beijing', 'nanjing', 'quanzhou', 'malacca', 'calicut', 'hormuz', 'aden', 'mogadishu', 'malindi'],
  },
  {
    title: 'Portugal reaches out, 1415–1488', caption: 'After taking Ceuta in 1415, Prince Henry sent ships into the Atlantic. The Portuguese settled Madeira and the Azores, planted sugar, and crept down Africa’s coast for gold and slaves. In 1488 Dias rounded the Cape of Good Hope.',
    view: [-30, -40, 30, 47],
    lands: [{ label: 'Portugal', color: C.portugal, polys: [PORTUGAL, ...ISLANDS], at: [-19.0, 42.5] }],
    routes: [{ pts: DIAS, color: '#B5482A', dashed: true, arrow: true, label: 'Dias, 1487–88', labelAt: [6.0, -24.0] }, ...ISLAND_RUNS.map(pts => ({ pts, color: '#4E7A55', dashed: true, arrow: true }))],
    tags: [{ text: '1415', at: [-1.6, 34.8] }, { text: 'sugar 1420s', at: [-17.5, 30.2] }, { text: '1434', at: [-9.8, 25.0] }, { text: 'slaves 1440s', at: [-11.0, 17.5] },
      { text: 'gold, 1482', at: [-2.0, 1.5] }, { text: '1488', at: [24.0, -37.5] }],
    cities: ['lisbon', 'ceuta', 'madeira', 'azores', 'bojador', 'capeVerde', 'elmina', 'goodHope'],
  },
  {
    title: 'Sea routes to Asia and America, 1492–1498', caption: 'Columbus sailed west for Spain and reached the Caribbean in 1492, thinking it was Asia. Vasco da Gama swung around Africa and reached Calicut in 1498, the same port Zheng He’s fleets had visited seventy years before.',
    view: [-96, -45, 130, 58],
    lands: [{ label: 'Ming China', color: C.ming, polys: [MING], at: [104.0, 29.0], faint: true }],
    routes: [{ pts: COLUMBUS, color: '#6E5A8F', dashed: true, arrow: true, label: 'Columbus, 1492', labelAt: [-42.0, 30.5] }, { pts: DA_GAMA, color: '#B5482A', dashed: true, arrow: true, label: 'da Gama, 1497–98', labelAt: [-9.0, -22.0] },
      { pts: ZHENG_HE, color: '#C99A3D', dashed: true, label: 'Zheng He, 1405–33', labelAt: [84.0, -3.0] }, { pts: ZHENG_HE_AFRICA, color: '#C99A3D', dashed: true }],
    cities: ['lisbon', 'palos', 'sanSalvador', 'goodHope', 'malindi', 'calicut'],
  },
]

// base: the base map in src/geo; aspect: height / width of the map frame.
export default { base: 'world', aspect: 0.62, cities: CITIES, steps: STEPS }
