// Chapter 16 map layers (longitude, latitude). Territory outlines are drawn loosely over
// the sea: the map clips every territory to the coastline, so only land frontiers need care.
// Sources for frontiers: standard historical atlases (successor kingdoms c. 500, Justinian 565,
// Byzantium and the caliphate c. 750, Carolingian empire 814, Treaty of Verdun 843, Christendom c. 1054).

const CITIES = {
  constantinople: { name: 'Constantinople', at: [28.98, 41.01], big: true },
  rome: { name: 'Rome', at: [12.5, 41.9], big: true },
  ravenna: { name: 'Ravenna', at: [12.2, 44.42] },
  carthage: { name: 'Carthage', at: [10.32, 36.85] },
  alexandria: { name: 'Alexandria', at: [29.9, 31.2] },
  antioch: { name: 'Antioch', at: [36.15, 36.2] },
  damascus: { name: 'Damascus', at: [36.3, 33.5] },
  paris: { name: 'Paris', at: [2.35, 48.86] },
  toulouse: { name: 'Toulouse', at: [1.44, 43.6], side: 'left' },
  cartagena: { name: 'Cartagena', at: [-0.98, 37.6], side: 'left' },
  tours: { name: 'Tours', at: [0.69, 47.39], side: 'left' },
  cordoba: { name: 'Córdoba', at: [-4.78, 37.88] },
  aachen: { name: 'Aachen', at: [6.08, 50.78], big: true },
  verdun: { name: 'Verdun', at: [5.38, 49.16] },
  baghdad: { name: 'Baghdad', at: [44.36, 33.31] },
  kiev: { name: 'Kiev', at: [30.52, 50.45], big: true },
  novgorod: { name: 'Novgorod', at: [31.27, 58.52] },
  lindisfarne: { name: 'Lindisfarne', at: [-1.8, 55.67] },
  birka: { name: 'Birka', at: [17.54, 59.33] },
  bulgar: { name: 'Bulgar', at: [49.1, 54.98] },
  venice: { name: 'Venice', at: [12.33, 45.44] },
  thessalonica: { name: 'Thessalonica', at: [22.94, 40.64], side: 'left' },
}

// ---------- shared frontiers ----------
const BYZ_PERSIA = [[41.6, 41.6], [41.5, 40.0], [41.2, 38.5], [40.5, 37.3], [39.0, 36.0], [40.1, 35.0], [38.5, 34.0], [37.6, 32.6], [36.8, 31.0], [35.0, 29.5]]
const TAURUS = [[33.9, 36.3], [35.0, 37.6], [37.0, 38.3], [38.5, 39.0], [40.0, 39.8], [41.0, 40.5], [41.6, 41.4]]
const LOIRE = [[-2.5, 47.3], [0.0, 47.3], [1.9, 47.9], [3.0, 47.4]]
// Carolingian frontiers
const WEST_MID = [[3.6, 51.4], [3.5, 50.7], [4.0, 50.0], [4.8, 49.6], [5.2, 48.6], [4.9, 47.6], [4.85, 46.5], [4.8, 45.7], [4.75, 44.5], [4.6, 43.4]]
const MID_EAST = [[7.2, 53.6], [7.0, 52.3], [6.6, 51.5], [7.0, 50.9], [7.6, 50.3], [8.0, 49.9], [7.9, 49.0], [7.6, 48.0], [7.5, 47.6], [8.5, 46.6], [10.5, 46.8], [12.5, 46.6], [13.8, 46.4], [13.7, 45.6]]
const EAST_EDGE = [[7.2, 53.6], [8.5, 54.2], [9.0, 54.5], [10.0, 54.2], [10.8, 53.9], [11.5, 53.0], [12.0, 52.0], [11.9, 51.4], [11.8, 50.5], [12.4, 50.0], [12.5, 49.5], [13.0, 48.9], [13.8, 48.6], [14.5, 48.5], [16.5, 48.2], [17.0, 47.8], [17.8, 47.0], [16.8, 46.3], [15.5, 45.5], [14.5, 45.3], [13.7, 45.6]]
const ITALY_814 = [[13.7, 45.6], [13.0, 44.8], [14.5, 42.6], [14.0, 41.9], [13.2, 41.3], [12.5, 41.0], [11.0, 42.0], [9.8, 43.8], [8.0, 43.6], [6.0, 42.9], [4.6, 43.4]]
const WEST_COAST = [[4.6, 43.4], [4.0, 42.8], [3.4, 42.3], [3.4, 41.6], [1.6, 41.2], [1.0, 41.6], [0.5, 42.0], [-0.5, 42.6], [-1.8, 43.1], [-1.9, 43.5], [-2.5, 44.5], [-2.5, 46.0], [-4.5, 47.0], [-5.2, 48.5], [-4.0, 49.4], [-2.0, 49.8], [0.0, 49.9], [1.5, 51.0], [3.0, 51.6], [3.6, 51.4]]
const NORTH_SEA = [[3.6, 51.4], [3.0, 51.8], [4.5, 53.0], [7.0, 53.8], [7.2, 53.6]]
const rev = a => [...a].reverse()

// ---------- territories, c. 500 ----------
const EAST_ROME_500 = [[19.0, 41.8], [19.4, 43.0], [20.5, 44.8], [22.5, 44.6], [25.0, 43.7], [27.0, 44.1], [28.2, 45.3], [29.8, 45.2], [31.0, 44.0], [36.0, 43.0], [41.6, 43.0], ...BYZ_PERSIA,
  [34.0, 28.0], [33.5, 27.0], [33.0, 24.0], [30.5, 23.5], [28.0, 29.0], [25.0, 30.0], [19.5, 30.3], [19.5, 33.5], [21.0, 36.0], [20.5, 37.5], [19.4, 39.7]]
const PERSIA = [...BYZ_PERSIA, [35.0, 29.5], [38.0, 29.0], [44.0, 30.5], [48.0, 29.5], [51.0, 28.0], [51.0, 43.0], [46.0, 42.5]]
const OSTROGOTHS_500 = [[6.6, 44.0], [7.0, 45.8], [8.5, 46.6], [9.5, 47.5], [11.0, 48.0], [13.0, 48.2], [15.0, 47.8], [17.0, 46.5], [19.0, 45.5], [19.6, 45.0], [19.4, 43.0], [19.0, 41.8],
  [18.8, 39.5], [16.0, 36.4], [12.0, 36.5], [11.8, 38.5], [10.9, 41.0], [9.9, 43.2], [9.2, 44.2], [7.5, 43.7]]
const VISIGOTHS_500 = [[-9.8, 36.8], [-9.8, 40.5], [-9.0, 41.0], [-6.5, 41.0], [-6.5, 44.0], [-2.0, 44.5], [-1.5, 46.0], ...LOIRE, [3.9, 46.5], [4.5, 45.2], [4.8, 44.0], [5.8, 44.4], [6.6, 44.0], [7.0, 43.5],
  [5.0, 42.5], [3.4, 42.2], [1.0, 40.6], [0.3, 39.5], [-0.3, 38.2], [-0.5, 37.4], [-2.0, 36.5], [-5.5, 35.9], [-6.5, 36.0]]
const FRANKS_500 = [[-4.5, 47.6], ...LOIRE, [4.5, 47.8], [6.0, 48.3], [7.5, 48.6], [8.2, 49.5], [8.8, 50.5], [9.5, 51.5], [8.5, 52.5], [7.0, 53.4], [3.0, 51.5], [1.5, 51.0], [0.0, 49.8], [-2.0, 49.8], [-5.2, 48.8]]
const BURGUNDY_500 = [[3.0, 47.4], [4.5, 47.8], [6.2, 47.9], [7.6, 47.5], [7.0, 45.8], [6.6, 44.8], [5.8, 44.4], [4.8, 44.0], [4.5, 45.2], [3.9, 46.5]]
const VANDALS_AFRICA = [[1.5, 36.8], [2.0, 35.5], [6.0, 35.3], [8.5, 34.3], [10.0, 33.0], [12.0, 32.0], [15.5, 31.0], [19.5, 30.3], [19.5, 32.5], [15.0, 33.5], [11.5, 35.5], [11.5, 37.3], [9.0, 37.6], [3.0, 37.2]]
const SARDINIA_CORSICA = [[7.9, 38.7], [9.95, 38.7], [9.95, 43.2], [7.9, 43.2]]
const BALEARICS = [[1.0, 38.5], [4.5, 38.5], [4.5, 40.2], [1.0, 40.2]]
const ANGLO_SAXONS = [[-1.6, 50.6], [-1.5, 51.6], [-1.5, 52.5], [-1.0, 53.4], [-0.6, 54.3], [0.5, 54.5], [2.0, 53.0], [1.8, 51.0]]

// ---------- Justinian, 565 ----------
const ITALY_565 = [[6.6, 44.0], [7.0, 45.8], [8.5, 46.6], [10.0, 46.6], [13.8, 46.5], [15.5, 45.6], [17.5, 45.2], [19.0, 45.0], [19.4, 43.0], [19.0, 41.8],
  [18.8, 39.5], [16.0, 36.4], [12.0, 36.5], [11.8, 38.5], [10.9, 41.0], [9.9, 43.2], [9.2, 44.2], [7.5, 43.7]]
const SPANIA = [[-6.4, 36.1], [-5.8, 36.9], [-4.0, 37.2], [-2.5, 37.6], [-1.2, 38.3], [-0.2, 38.9], [0.5, 38.6], [-0.5, 37.4], [-2.0, 36.5], [-5.5, 35.9]]

// ---------- c. 750 ----------
const BYZ_750 = [[28.4, 42.7], [26.5, 42.6], [25.0, 41.9], [23.5, 41.5], [22.0, 40.8], [21.2, 39.7], [20.0, 39.4], [19.6, 38.8], [21.0, 36.3], [23.5, 34.6], [26.5, 34.8], [28.8, 35.7], [30.5, 36.0], [33.5, 35.9],
  ...TAURUS, [41.6, 43.0], [31.0, 43.0]]
const BYZ_ITALY_750 = [[12.0, 38.5], [15.3, 38.6], [15.5, 39.9], [16.6, 39.7], [17.3, 40.0], [17.8, 40.5], [18.7, 40.5], [18.8, 39.6], [16.5, 37.5], [15.6, 36.4], [12.0, 36.5]]
const CALIPHATE_750 = [[-9.8, 36.5], [-9.8, 41.5], [-6.0, 42.0], [-3.0, 42.6], [-1.0, 42.9], [0.7, 42.7], [3.3, 42.4], [0.8, 40.5], [0.2, 38.7], [-1.0, 37.3], [3.0, 37.2], [9.0, 37.6], [11.3, 37.3],
  [11.5, 35.5], [15.0, 33.0], [20.0, 32.8], [24.0, 33.3], [29.0, 32.0], [32.0, 32.0], [34.8, 34.2], [34.0, 35.9], ...TAURUS, [44.0, 43.5], [51.0, 43.0], [51.0, 14.0], [43.0, 12.0], [38.0, 18.0], [33.0, 22.0],
  [32.5, 24.0], [30.5, 27.0], [25.0, 29.6], [15.0, 29.2], [10.0, 30.2], [0.0, 31.2], [-5.0, 30.5], [-10.0, 29.5], [-10.5, 35.0]]
const LOMBARDS_750 = [[6.6, 44.0], [7.0, 45.8], [10.0, 46.6], [13.8, 46.5], [13.8, 45.6], [12.6, 44.0], [14.0, 43.0], [16.0, 41.9], [17.5, 41.0], [17.8, 40.5], [17.3, 40.0], [16.6, 39.7], [15.5, 39.9],
  [14.5, 40.5], [12.0, 41.5], [10.5, 42.8], [9.6, 44.0], [7.5, 43.7]]
const FRANKS_750 = [[-4.5, 47.0], [-1.5, 46.0], [-1.8, 43.4], [0.7, 42.7], [3.3, 42.4], [6.0, 43.0], [7.5, 43.7], [7.0, 45.8], [10.0, 46.6], [10.0, 47.5], [12.0, 48.0], [13.0, 48.5], [12.0, 50.0], [11.0, 51.5],
  [9.0, 52.5], [7.0, 53.3], [6.0, 54.0], [3.0, 51.5], [1.5, 51.0], [0.0, 49.8], [-2.0, 49.8], [-5.2, 48.8]]

// ---------- Carolingians ----------
const WEST_843 = [...WEST_MID, ...WEST_COAST.slice(1)]
const MIDDLE_843 = [...NORTH_SEA.slice(0, 4), ...MID_EAST, ...ITALY_814.slice(1), ...rev(WEST_MID)]
const EAST_843 = [...EAST_EDGE, ...rev(MID_EAST).slice(1)]
const EMPIRE_814 = [...WEST_COAST, ...NORTH_SEA.slice(1), ...EAST_EDGE.slice(1), ...ITALY_814.slice(1)]
const AL_ANDALUS = [[-9.8, 36.5], [-9.8, 41.0], [-7.0, 41.3], [-4.5, 41.6], [-3.0, 42.3], [-1.8, 42.7], [-0.5, 42.4], [0.5, 41.9], [1.0, 41.6], [1.6, 41.2], [1.0, 40.2], [0.2, 38.7], [-1.0, 37.3], [-2.0, 36.5], [-5.5, 35.9], [-6.5, 36.0]]
const ABBASIDS = [[-1.0, 37.0], [3.0, 37.2], [9.0, 37.6], [11.3, 37.3], [11.5, 35.5], [15.0, 33.0], [20.0, 32.8], [24.0, 33.3], [29.0, 32.0], [32.0, 32.0], [34.8, 34.2], [34.0, 35.9], ...TAURUS, [44.0, 43.5], [51.0, 43.0], [51.0, 22.0],
  [35.0, 22.0], [20.0, 26.0], [5.0, 28.0], [-2.0, 30.0]]
const ENGLAND = [[-4.3, 50.2], [-2.0, 50.4], [1.6, 50.9], [1.9, 52.9], [0.4, 54.0], [-1.0, 55.4], [-2.4, 56.1], [-3.0, 56.1], [-3.4, 55.0], [-3.0, 54.0], [-3.0, 53.3], [-3.1, 52.0], [-2.7, 51.6], [-3.5, 51.2], [-4.3, 50.9]]

// ---------- invasions ----------
const SCANDINAVIA = [[4.5, 62.0], [4.5, 58.0], [8.0, 56.0], [8.0, 54.6], [10.5, 54.3], [12.0, 54.6], [14.5, 55.3], [16.5, 56.5], [19.0, 57.5], [19.5, 60.0], [20.5, 63.5], [23.6, 65.8], [24.0, 68.0], [15.0, 68.0], [11.0, 66.0]]
const HUNGARY = [[16.5, 47.8], [18.0, 48.6], [20.5, 48.6], [22.5, 48.3], [24.5, 47.5], [25.5, 46.5], [25.0, 45.5], [22.5, 44.8], [21.0, 44.8], [19.0, 45.3], [17.0, 46.0]]
const SICILY = [[12.0, 38.5], [15.4, 38.5], [15.75, 38.25], [15.4, 37.0], [14.5, 36.5], [12.0, 36.6]]
const NORTH_AFRICA = [[-6.5, 35.9], [-1.0, 36.2], [3.0, 37.2], [9.0, 37.6], [11.3, 37.3], [11.5, 35.5], [15.0, 33.0], [20.0, 32.8], [24.0, 33.3], [29.0, 32.0], [32.0, 32.0], [35.0, 30.0], [30.0, 28.0], [10.0, 29.0], [-5.0, 29.5], [-10.5, 31.0], [-10.5, 35.0]]

// ---------- c. 1000–1054 ----------
const BYZ_1025 = [[19.3, 44.9], [21.0, 44.8], [22.5, 44.6], [25.0, 43.7], [27.0, 44.1], [28.2, 45.3], [29.8, 45.2], [30.5, 43.0], [41.6, 43.0], [41.6, 41.6], [44.0, 41.3], [45.0, 40.0], [43.5, 38.5], [40.5, 37.3],
  [38.0, 36.6], [36.6, 35.5], [35.7, 35.4], [34.6, 34.5], [32.0, 34.3], [28.0, 35.0], [23.0, 34.5], [21.0, 36.3], [19.4, 39.7], [19.2, 42.0], [19.0, 43.0]]
const BYZ_ITALY_1025 = [[15.6, 40.1], [15.8, 40.9], [15.1, 41.4], [15.2, 41.95], [15.3, 42.3], [18.8, 40.5], [18.8, 39.6], [16.6, 37.6], [15.85, 37.85], [15.62, 38.22], [15.4, 39.0]]
const RUS = [[22.5, 49.0], [23.5, 50.5], [24.0, 52.0], [26.5, 53.5], [27.0, 55.5], [27.8, 57.5], [27.5, 59.0], [29.0, 60.2], [32.0, 61.5], [38.0, 62.0], [42.0, 60.0], [42.0, 57.0], [43.0, 55.5],
  [40.0, 53.0], [38.0, 51.0], [36.0, 50.0], [34.0, 48.5], [32.0, 48.0], [29.0, 48.5], [26.5, 48.3], [24.0, 48.3]]
const CATHOLIC_1054 = [[-10.5, 40.5], [-8.8, 40.5], [-4.0, 41.0], [-2.0, 41.5], [0.5, 41.5], [1.8, 41.2], [3.5, 41.5], [7.5, 38.7], [10.0, 38.7], [10.5, 40.5], [14.8, 40.0], [15.6, 40.1], [15.8, 40.9], [15.1, 41.4],
  [15.2, 41.95], [15.3, 42.3], [18.3, 42.4], [19.2, 42.0], [19.0, 43.0], [19.3, 44.9], [21.0, 44.8], [22.5, 44.6], [25.5, 45.5], [26.0, 47.5], [24.0, 48.3], [22.5, 49.0], [23.5, 50.5], [24.0, 52.0], [23.5, 54.0],
  [19.5, 54.0], [18.5, 54.8], [17.0, 56.0], [19.5, 60.0], [20.5, 63.5], [23.6, 65.8], [24.0, 70.0], [10.0, 70.0], [4.0, 62.0], [4.0, 58.0], [-1.0, 60.5], [-11.0, 58.0], [-11.0, 51.0], [-6.0, 48.5], [-10.5, 44.0]]
const ISLAM_1054 = [[-10.5, 40.5], [-8.8, 40.5], [-4.0, 41.0], [-2.0, 41.5], [0.5, 41.5], [1.8, 41.2], [1.0, 40.0], [0.2, 38.7], [-1.0, 37.3], [3.0, 37.2], [9.0, 37.6], [11.3, 37.3], [11.8, 38.4], [15.3, 38.6],
  [15.75, 38.25], [15.5, 37.0], [14.5, 36.5], [16.0, 34.0], [20.0, 32.8], [24.0, 33.3], [29.0, 31.8], [32.0, 32.0], [34.4, 33.8], [35.9, 35.0], [36.6, 35.3], [38.0, 36.6], [40.5, 37.3], [43.5, 38.5], [45.0, 40.0],
  [52.0, 40.0], [63.0, 42.0], [63.0, 22.0], [52.0, 15.0], [43.0, 12.0], [33.0, 18.0], [15.0, 26.0], [-10.0, 28.0], [-10.5, 35.0]]

// ---------- routes ----------
const BELISARIUS_AFRICA = [[28.98, 41.01], [26.3, 40.1], [24.3, 37.6], [21.5, 36.6], [17.0, 36.6], [14.0, 36.2], [11.2, 36.6], [10.32, 36.85]]
const BELISARIUS_ITALY = [[10.32, 36.85], [12.5, 37.4], [14.9, 37.2], [15.5, 38.6], [14.5, 40.2], [13.8, 40.85], [12.5, 41.9], [12.6, 43.0], [12.2, 44.4]]
const ARAB_SIEGES = [[36.3, 33.5], [35.6, 36.6], [33.0, 37.6], [30.5, 39.6], [29.4, 40.75]]
const TOURS_RAID = [[-1.6, 42.8], [-0.6, 44.8], [0.3, 46.6], [0.6, 47.2]]
const VIKING_IRELAND = [[5.5, 60.4], [-1.0, 59.2], [-6.0, 58.2], [-8.8, 55.6], [-6.3, 53.4]]
const VIKING_ENGLAND = [[8.3, 55.8], [3.0, 55.0], [-1.0, 54.0]]
const VIKING_PARIS = [[8.3, 55.6], [4.0, 52.6], [1.0, 50.4], [0.2, 49.5], [1.3, 49.2], [2.25, 48.9]]
const RUS_ROUTE = [[18.4, 59.3], [24.0, 59.7], [30.0, 59.9], [31.3, 58.5], [31.6, 55.0], [30.5, 50.6], [33.0, 48.5], [32.5, 46.6], [31.0, 44.6], [29.2, 41.3]]
const MAGYARS_WEST = [[19.5, 47.6], [15.5, 48.4], [12.0, 48.8], [9.0, 48.6], [6.6, 48.3]]
const MAGYARS_ITALY = [[19.0, 46.8], [16.5, 46.3], [13.5, 45.9], [11.0, 45.4]]
const MUSLIM_SICILY = [[10.4, 36.9], [11.6, 37.5], [13.4, 38.3], [12.6, 40.0], [12.35, 41.6]]
const MUSLIM_PROVENCE = [[-0.4, 38.4], [3.0, 40.8], [6.4, 43.1]]
const VOLGA_ROUTE = [[18.4, 59.3], [24.0, 59.7], [30.0, 59.9], [35.0, 58.0], [39.0, 57.3], [43.0, 56.3], [49.1, 55.0], [50.1, 53.2], [46.0, 51.5], [44.5, 48.7], [47.8, 46.4], [50.5, 42.0], [51.4, 37.3], [48.5, 34.8], [44.5, 33.4]]
const SILK_ROAD = [[61.8, 37.6], [56.0, 36.5], [51.4, 35.7], [48.0, 34.4], [44.4, 33.3], [40.0, 35.5], [37.2, 36.2], [33.5, 37.8], [30.5, 39.8], [29.2, 40.8]]
const SEA_VENICE = [[28.9, 40.9], [26.3, 40.0], [24.0, 37.0], [21.5, 36.6], [19.0, 39.6], [16.5, 42.0], [13.6, 44.3], [12.45, 45.35]]
const SEA_ALEX = [[28.9, 40.9], [26.3, 40.0], [26.0, 37.0], [28.0, 34.8], [29.85, 31.35]]
const CYRIL = [[28.9, 41.1], [22.94, 40.64], [21.4, 42.6], [20.6, 45.5], [18.6, 47.6], [17.4, 49.0]]
const TO_KIEV = [[29.1, 41.3], [30.8, 44.5], [32.4, 46.6], [32.8, 48.4], [30.7, 50.2]]
const SCHISM = [[12.6, 41.9], [20.5, 41.6], [28.8, 41.0]]

// ---------- map steps (the animated map) ----------
// view: [lonMin, latMin, lonMax, latMax] to zoom in, or null for the whole map.
const C = { byz: '#6E5A8F', west: '#4E7FA6', islam: '#4E7A55', gold: '#C99A3D', red: '#B5482A', brown: '#7A3B22', sea: '#2E6E9A' }
const STEPS = [
  {
    title: 'Two halves, c. 500', chip: 'Two halves', caption: 'Rome’s eastern half survives as the Byzantine Empire, ruled from Constantinople on the Bosporus. In the West, Germanic kingdoms have replaced Roman rule.',
    view: null,
    lands: [{ label: 'Eastern Roman Empire', color: C.byz, polys: [EAST_ROME_500], at: [33.5, 39.2] },
      { label: 'Ostrogoths', color: C.gold, polys: [OSTROGOTHS_500], at: [11.0, 45.4] }, { label: 'Visigoths', color: C.red, polys: [VISIGOTHS_500], at: [-4.0, 41.2] },
      { label: 'Franks', color: C.west, polys: [FRANKS_500], at: [4.2, 50.2] }, { label: 'Burgundians', color: C.brown, polys: [BURGUNDY_500], at: [5.6, 46.6] },
      { label: 'Vandals', color: C.islam, polys: [VANDALS_AFRICA, SARDINIA_CORSICA, BALEARICS], at: [7.0, 34.6] }, { label: 'Anglo-Saxons', color: C.brown, polys: [ANGLO_SAXONS], at: [-0.4, 52.6] },
      { label: 'Persia', color: '#8A8A8A', polys: [PERSIA], at: [45.5, 35.5], faint: true }],
    cities: ['constantinople', 'rome', 'ravenna', 'paris', 'toulouse', 'carthage', 'alexandria', 'antioch'],
  },
  {
    title: 'Justinian’s reconquests, 533–565', chip: 'Justinian', caption: 'Belisarius retakes North Africa from the Vandals (533), then Italy from the Ostrogoths after twenty years of war, and a strip of southern Spain. The Byzantines rule Italy from Ravenna.',
    view: null,
    lands: [{ label: 'Byzantine Empire, 527', color: C.byz, polys: [EAST_ROME_500], at: [33.5, 39.2] },
      { label: 'Reconquered, 533–554', color: C.gold, polys: [VANDALS_AFRICA, SARDINIA_CORSICA, BALEARICS, ITALY_565, SPANIA], at: [6.5, 34.6] },
      { label: '', color: '#8A8A8A', polys: [PERSIA], faint: true }],
    routes: [{ pts: BELISARIUS_AFRICA, color: C.byz, label: 'Belisarius, 533', labelAt: [19.5, 35.6], arrow: true, dashed: true },
      { pts: BELISARIUS_ITALY, color: C.red, label: 'Italy, 535–540', labelAt: [17.8, 38.2], arrow: true }],
    tags: [{ text: 'Hagia Sophia, 537', at: [29.0, 42.5] }],
    cities: ['constantinople', 'carthage', 'rome', 'ravenna', 'cartagena', 'alexandria'],
  },
  {
    title: 'Byzantium shrinks, c. 750', chip: 'Islam', caption: 'Arab Muslim armies take Syria, Egypt, North Africa and Spain. Constantinople survives two sieges (674–678, 717–718) with Greek fire. In the West, Charles Martel stops a Muslim army at Tours (732).',
    view: null,
    lands: [{ label: 'Byzantine Empire', color: C.byz, polys: [BYZ_750, BYZ_ITALY_750], at: [33.5, 38.8] }, { label: 'Islamic caliphate', color: C.islam, polys: [CALIPHATE_750], at: [10.0, 31.0] },
      { label: 'Lombards', color: C.gold, polys: [LOMBARDS_750], at: [10.8, 45.5] }, { label: 'Franks', color: C.west, polys: [FRANKS_750], at: [3.4, 47.6] }],
    routes: [{ pts: ARAB_SIEGES, color: C.islam, label: 'Arab sieges', labelAt: [32.8, 36.6], arrow: true }, { pts: TOURS_RAID, color: C.islam, arrow: true }],
    tags: [{ text: 'Greek fire', at: [27.4, 42.6] }, { text: '732', at: [-1.2, 46.4] }],
    cities: ['constantinople', 'damascus', 'alexandria', 'rome', 'ravenna', 'tours', 'cordoba'],
  },
  {
    title: 'Charlemagne’s empire, 814', chip: 'Charlemagne', caption: 'Charlemagne conquers the Saxons, Lombards and Avars and rules from Aachen. Pope Leo III crowns him emperor in Rome in 800, a challenge to the emperor in Constantinople.',
    base: 'world', view: [-12, 33, 40, 60],
    lands: [{ label: 'Carolingian Empire', color: C.west, polys: [EMPIRE_814], at: [6.0, 47.4] }, { label: 'Byzantine Empire', color: C.byz, polys: [BYZ_750, BYZ_ITALY_750], at: [33.0, 39.2] },
      { label: 'Emirate of Córdoba', color: C.islam, polys: [AL_ANDALUS], at: [-4.6, 39.6] }, { label: 'Abbasid Caliphate', color: C.islam, polys: [ABBASIDS], at: [32.5, 31.8], faint: true },
      { label: 'Anglo-Saxons', color: C.brown, polys: [ENGLAND], at: [-1.6, 52.6] }],
    tags: [{ text: 'Saxons conquered, 772–804', at: [10.4, 53.4] }, { text: 'crowned in Rome, 800', at: [13.4, 40.6] }, { text: 'Slavs', at: [22.0, 52.0] }],
    cities: ['aachen', 'paris', 'rome', 'constantinople', 'cordoba'],
  },
  {
    title: 'Treaty of Verdun, 843', chip: 'Verdun', caption: 'Charlemagne’s grandsons split the empire in three: West Francia (Charles the Bald), the Middle Kingdom (Lothair) and East Francia (Louis the German), roughly the future France, a strip to Italy, and Germany.',
    base: 'world', view: [-7, 39, 21, 56],
    lands: [{ label: 'West Francia', color: C.west, polys: [WEST_843], at: [0.6, 46.2] }, { label: 'Middle Kingdom', color: C.gold, polys: [MIDDLE_843], at: [11.6, 44.0] },
      { label: 'East Francia', color: C.red, polys: [EAST_843], at: [11.4, 50.6] }],
    tags: [{ text: 'Charles the Bald', at: [0.6, 45.3] }, { text: 'Lothair', at: [11.6, 43.2] }, { text: 'Louis the German', at: [11.4, 49.7] }],
    cities: ['verdun', 'aachen', 'paris', 'rome'],
  },
  {
    title: 'Invasions, 800s–900s', chip: 'Invasions', caption: 'Vikings sail from Scandinavia to raid and settle from Ireland to Russia; Magyar horsemen strike from Hungary; Muslim raiders take Sicily and attack Italy and Provence.',
    base: 'world', view: [-14, 33, 42, 66],
    lands: [{ label: '', color: C.west, polys: [WEST_843, MIDDLE_843, EAST_843], faint: true }, { label: 'Norse homelands', color: C.sea, polys: [SCANDINAVIA], at: [14.0, 63.0] },
      { label: 'Magyars', color: C.gold, polys: [HUNGARY], at: [20.8, 46.9] }, { label: 'Muslims', color: C.islam, polys: [AL_ANDALUS, NORTH_AFRICA, SICILY], at: [3.0, 33.8] },
      { label: '', color: C.byz, polys: [BYZ_1025], faint: true }],
    routes: [{ pts: VIKING_IRELAND, color: C.sea, label: 'Vikings', labelAt: [-3.5, 59.6], arrow: true, dashed: true }, { pts: VIKING_ENGLAND, color: C.sea, arrow: true, dashed: true },
      { pts: VIKING_PARIS, color: C.sea, arrow: true, dashed: true }, { pts: RUS_ROUTE, color: C.sea, label: 'Rus', labelAt: [33.6, 53.0], arrow: true },
      { pts: MAGYARS_WEST, color: C.gold, arrow: true }, { pts: MAGYARS_ITALY, color: C.gold, arrow: true },
      { pts: MUSLIM_SICILY, color: C.islam, label: 'Muslim raiders', labelAt: [9.4, 39.4], arrow: true }, { pts: MUSLIM_PROVENCE, color: C.islam, arrow: true }],
    tags: [{ text: 'Lechfeld, 955', at: [10.9, 47.1] }, { text: 'sacked, 845', at: [1.8, 47.9] }],
    cities: ['lindisfarne', 'paris', 'rome', 'kiev', 'novgorod', 'constantinople'],
  },
  {
    title: 'Trade routes, c. 1000', chip: 'Trade', caption: 'Rus traders carry furs, amber and slaves down the Dnieper to Constantinople and down the Volga toward Baghdad. Silk and spices arrive from the east, and Byzantine ships link the capital to Venice and Alexandria.',
    base: 'world', view: [-4, 26, 62, 64],
    lands: [{ label: 'Byzantine Empire', color: C.byz, polys: [BYZ_1025, BYZ_ITALY_1025], at: [33.0, 39.0] }, { label: 'Kievan Rus', color: C.gold, polys: [RUS], at: [34.5, 55.0] },
      { label: 'Islamic world', color: C.islam, polys: [ISLAM_1054], at: [48.0, 29.0], faint: true }],
    routes: [{ pts: RUS_ROUTE, color: C.sea, label: 'Dnieper route', labelAt: [25.6, 55.6], arrow: true }, { pts: VOLGA_ROUTE, color: C.sea, label: 'Volga route', labelAt: [54.0, 51.0], arrow: true },
      { pts: SILK_ROAD, color: C.brown, label: 'Silk Road', labelAt: [55.0, 38.2], arrow: true }, { pts: SEA_VENICE, color: C.sea, dashed: true, arrow: true }, { pts: SEA_ALEX, color: C.sea, dashed: true, arrow: true }],
    tags: [{ text: 'furs · amber · slaves', at: [22.0, 61.2] }, { text: 'silver coins', at: [56.0, 55.0] }, { text: 'silk · spices', at: [52.0, 32.6] }, { text: 'gold bezants · silk cloth', at: [34.0, 43.4] }],
    cities: ['constantinople', 'kiev', 'novgorod', 'birka', 'bulgar', 'baghdad', 'venice', 'alexandria'],
  },
  {
    title: 'Two churches, 1054', chip: 'Schism', caption: 'Missionaries from Constantinople convert Moravia, Bulgaria and Kievan Rus. In 1054 Rome and Constantinople excommunicate each other: Catholic West, Orthodox East.',
    base: 'world', view: [-12, 32, 50, 64],
    lands: [{ label: 'Roman Catholic', color: C.west, polys: [CATHOLIC_1054], at: [7.0, 50.0] }, { label: 'Eastern Orthodox', color: C.byz, polys: [BYZ_1025, BYZ_ITALY_1025, RUS], at: [34.5, 55.0] },
      { label: 'Islam', color: C.islam, polys: [ISLAM_1054], at: [2.0, 31.0], faint: true }],
    routes: [{ pts: CYRIL, color: C.gold, label: 'Cyril & Methodius, 863', labelAt: [16.0, 47.0], arrow: true }, { pts: TO_KIEV, color: C.gold, label: 'Rus converts, 988', labelAt: [36.2, 47.0], arrow: true },
      { pts: SCHISM, color: C.red, dashed: true }],
    tags: [{ text: 'Cyrillic alphabet', at: [26.0, 43.0] }, { text: 'schism, 1054', at: [18.6, 38.6] }],
    cities: ['rome', 'constantinople', 'thessalonica', 'kiev', 'novgorod'],
  },
]

// base: the base map in src/geo; aspect: height / width of the map frame.
// aspect 0.7 (taller than usual) so Europe from North Africa to Britain and Scandinavia fits.
export default { base: 'mediterranean', aspect: 0.7, cities: CITIES, steps: STEPS }
