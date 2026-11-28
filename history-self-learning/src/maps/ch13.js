// Chapter 13 map layers (longitude, latitude). Territory outlines are drawn loosely over
// the sea: the map clips every territory to the coastline, so only land frontiers need care.
// Sources for frontiers: standard historical atlases (Byzantine–Sasanian frontier c. 600, Rashidun conquests by 661,
// Umayyad caliphate c. 740, Abbasid caliphate c. 800, the divided Islamic world c. 1000, the Mongol Ilkhanate c. 1258).

const CITIES = {
  mecca: { name: 'Mecca', at: [39.83, 21.42], big: true },
  medina: { name: 'Medina', at: [39.61, 24.47], big: true },
  taif: { name: 'Ta’if', at: [40.42, 21.27], side: 'below' },
  badr: { name: 'Badr', at: [38.77, 23.73], side: 'left' },
  jerusalem: { name: 'Jerusalem', at: [35.22, 31.78], side: 'left' },
  damascus: { name: 'Damascus', at: [36.3, 33.51], big: true, side: 'left' },
  ctesiphon: { name: 'Ctesiphon', at: [44.58, 33.09] },
  constantinople: { name: 'Constantinople', at: [28.98, 41.01], big: true },
  alexandria: { name: 'Alexandria', at: [29.92, 31.2], side: 'left' },
  sanaa: { name: 'Sana’a', at: [44.2, 15.35] },
  aden: { name: 'Aden', at: [45.03, 12.8] },
  petra: { name: 'Petra', at: [35.44, 30.33], side: 'left' },
  aksum: { name: 'Aksum', at: [38.72, 14.13], side: 'left' },
  yarmuk: { name: 'Yarmuk 636', at: [35.95, 32.75], side: 'below' },
  nahavand: { name: 'Nahavand 642', at: [48.37, 34.19] },
  kufa: { name: 'Kufa', at: [44.4, 32.03], side: 'below' },
  karbala: { name: 'Karbala', at: [44.02, 32.62], side: 'left' },
  fustat: { name: 'Fustat (Cairo)', at: [31.24, 30.05], side: 'left' },
  cairo: { name: 'Cairo', at: [31.24, 30.05], big: true, side: 'left' },
  kairouan: { name: 'Kairouan', at: [10.1, 35.68], side: 'below' },
  cordoba: { name: 'Córdoba', at: [-4.78, 37.88], big: true, side: 'below' },
  tours: { name: 'Tours 732', at: [0.69, 47.39] },
  talas: { name: 'Talas 751', at: [72.2, 42.5] },
  samarkand: { name: 'Samarkand', at: [66.97, 39.65] },
  merv: { name: 'Merv', at: [61.83, 37.66], side: 'below' },
  multan: { name: 'Multan', at: [71.47, 30.2] },
  baghdad: { name: 'Baghdad', at: [44.37, 33.31], big: true },
  basra: { name: 'Basra', at: [47.8, 30.5], side: 'below' },
  siraf: { name: 'Siraf', at: [52.33, 27.67] },
  calicut: { name: 'Calicut', at: [75.78, 11.25] },
  guangzhou: { name: 'Guangzhou', at: [113.26, 23.13], side: 'left' },
  changan: { name: 'Chang’an', at: [108.94, 34.34], side: 'left' },
  kilwa: { name: 'Kilwa', at: [39.5, -8.96] },
  sijilmasa: { name: 'Sijilmasa', at: [-4.26, 31.28], side: 'below' },
  koumbi: { name: 'Koumbi Saleh', at: [-7.98, 15.77] },
  delhi: { name: 'Delhi', at: [77.2, 28.6] },
  konya: { name: 'Konya', at: [32.48, 37.87] },
  alamut: { name: 'Alamut 1256', at: [50.58, 36.44] },
  hamadan: { name: 'Hamadan', at: [48.5, 34.8], side: 'below' },
  isfahan: { name: 'Isfahan', at: [51.67, 32.65], side: 'below' },
  ghazni: { name: 'Ghazni', at: [68.42, 33.55] },
  bukhara: { name: 'Bukhara', at: [64.42, 39.77], side: 'left' },
}

// ---------- territories ----------
// Byzantine Empire c. 600 (eastern half: Balkans, Anatolia, Syria, Palestine, Egypt, Cyrenaica).
const BYZ_600 = [
  [19.5, 41.0], [19.5, 42.6], [22.5, 44.6], [28.8, 44.6], [29.5, 43.0], [31.0, 41.8], [35.0, 42.5], [41.6, 42.0], [42.2, 41.3],
  [43.6, 40.3], [41.5, 38.6], [40.5, 37.0], [40.4, 35.2], [38.6, 34.4], [38.0, 33.0], [37.4, 31.6], [36.6, 30.0], [35.0, 29.4],
  [34.6, 27.6], [36.5, 23.0], [33.0, 23.6], [25.0, 23.6], [25.0, 29.5], [20.0, 29.8], [19.0, 31.5], [20.0, 33.6],
  [25.0, 34.6], [23.0, 36.0], [21.0, 38.0],
]
// Sasanian Persia c. 600, with Persian-ruled Yemen.
const SAS_600 = [
  [43.6, 40.3], [41.5, 38.6], [40.5, 37.0], [40.4, 35.2], [41.6, 34.0], [43.5, 31.6], [46.5, 29.4], [49.0, 28.8], [51.5, 27.0],
  [55.0, 26.8], [56.6, 27.0], [58.5, 25.2], [61.6, 24.9], [66.5, 24.9], [67.6, 27.5], [66.8, 30.5], [65.0, 33.5], [67.0, 36.0],
  [66.0, 37.6], [62.0, 38.2], [57.5, 38.4], [54.0, 37.6], [52.0, 38.6], [50.5, 40.0], [49.2, 41.6], [47.5, 42.0], [45.5, 41.8],
]
const SAS_YEMEN = [[42.6, 17.4], [44.5, 17.6], [46.8, 16.2], [49.5, 15.3], [49.2, 13.6], [45.2, 12.2], [43.3, 12.5], [42.0, 15.0]]
const AKSUM = [[35.6, 16.8], [38.6, 18.2], [40.6, 15.6], [43.2, 12.7], [42.6, 10.6], [39.5, 9.8], [36.0, 10.8], [34.8, 13.8]]

// Muslim Arabia by 632.
const ARABIA_632 = [
  [35.0, 29.3], [37.4, 29.9], [39.8, 30.0], [43.0, 29.6], [46.5, 29.3], [48.6, 28.5], [50.6, 26.6], [52.0, 25.2], [54.5, 25.0],
  [56.4, 26.5], [59.0, 23.0], [60.0, 21.5], [57.0, 18.3], [52.0, 15.3], [45.0, 12.0], [43.3, 12.6], [41.3, 15.0], [40.0, 18.0],
  [38.2, 21.0], [36.9, 23.0], [36.0, 25.5],
]

// Rashidun caliphate by 661: Arabia, Syria, Egypt, Cyrenaica–Tripoli, Iraq, Persia, Armenia.
const RASHIDUN_661 = [
  [13.0, 33.3], [15.5, 32.6], [19.0, 31.6], [20.0, 33.4], [25.0, 32.4], [30.0, 31.9], [33.0, 31.6], [34.0, 32.0], [34.6, 33.2],
  [35.4, 34.7], [35.6, 35.8], [35.8, 36.5], [36.3, 36.9], [37.6, 37.6], [38.8, 38.6], [40.2, 39.6], [41.6, 40.6], [42.8, 41.3],
  [46.0, 41.9], [48.3, 42.0], [50.5, 40.4], [52.6, 38.8], [54.0, 37.6], [57.5, 38.3], [62.0, 38.2], [66.0, 37.6], [65.0, 34.8],
  [63.5, 32.0], [65.5, 29.0], [64.8, 25.0], [61.6, 24.9], [58.5, 25.0], [60.0, 22.0], [57.0, 18.3], [52.0, 15.3], [45.0, 12.0],
  [43.3, 12.6], [41.3, 15.0], [40.0, 18.0], [38.2, 21.0], [36.5, 23.0], [33.0, 23.6], [30.5, 23.8], [27.0, 25.5], [22.0, 27.0],
  [17.0, 28.5], [13.0, 30.0],
]
const BYZ_661 = [
  [19.8, 39.0], [20.5, 40.6], [23.0, 41.2], [26.0, 42.2], [28.5, 42.6], [31.0, 41.8], [35.0, 42.5], [41.6, 42.0], [42.8, 41.3],
  [41.6, 40.6], [40.2, 39.6], [38.8, 38.6], [37.6, 37.6], [36.3, 36.9], [35.8, 36.5], [33.0, 35.8], [28.0, 35.8], [26.5, 34.6],
  [23.0, 35.0], [21.0, 36.4],
]
const BYZ_AFRICA = [[7.6, 37.4], [11.6, 37.6], [11.8, 35.2], [10.6, 33.6], [8.5, 34.6], [7.8, 36.0]]
const SICILY = [[12.0, 38.4], [15.7, 38.4], [15.7, 36.4], [12.0, 36.6]]

// Umayyad caliphate c. 740, from the Atlantic to the Indus.
const UMAYYAD_740 = [
  [-10.6, 29.0], [-10.6, 36.2], [-10.0, 38.6], [-9.8, 41.1], [-6.0, 41.3], [-3.6, 41.6], [-2.0, 42.4], [-1.4, 42.8], [0.3, 42.75],
  [1.6, 42.5], [2.0, 43.0], [2.6, 43.9], [4.2, 43.8], [4.6, 43.2], [3.6, 42.3], [2.8, 41.0], [0.8, 38.5], [-0.5, 37.0], [2.0, 37.1],
  [8.0, 37.6], [11.2, 37.6], [11.8, 35.2], [12.2, 33.4], [15.5, 32.6], [19.0, 31.6], [20.0, 33.4], [25.0, 32.4], [30.0, 31.9],
  [33.0, 31.6], [34.0, 32.0], [34.6, 33.2], [35.4, 34.7], [35.6, 35.8], [35.8, 36.5], [36.3, 36.9], [37.6, 37.6], [38.8, 38.6],
  [40.2, 39.6], [41.6, 40.9], [43.5, 41.9], [46.0, 42.2], [48.3, 42.1], [50.5, 40.4], [52.6, 38.8], [54.0, 37.6], [55.0, 38.5],
  [58.0, 39.8], [60.0, 42.2], [61.5, 42.6], [63.5, 41.5], [66.5, 41.2], [69.0, 41.6], [71.5, 41.4], [73.0, 40.6], [72.5, 39.3],
  [71.0, 37.8], [69.5, 36.8], [67.5, 35.6], [65.5, 34.0], [64.5, 32.0], [66.0, 30.6], [67.6, 29.0], [69.0, 30.2], [71.0, 31.0],
  [72.6, 30.6], [72.0, 28.6], [71.0, 26.5], [70.4, 24.4], [68.6, 23.2], [66.0, 24.6], [61.6, 24.9], [58.5, 25.0], [60.0, 22.0],
  [57.0, 18.3], [52.0, 15.3], [45.0, 12.0], [43.3, 12.6], [41.3, 15.0], [40.0, 18.0], [38.2, 21.0], [36.5, 23.0], [33.0, 23.6],
  [30.5, 23.8], [27.0, 25.5], [22.0, 27.0], [17.0, 28.5], [12.0, 29.8], [8.0, 30.6], [3.0, 31.2], [-2.0, 30.6], [-6.0, 29.4],
]
// Abbasid caliphate c. 800 (Ifriqiya eastward; Spain and Morocco have broken away).
const ABBASID_800 = [
  [5.0, 37.3], [8.0, 37.6], [11.2, 37.6], [11.8, 35.2], [12.2, 33.4], [15.5, 32.6], [19.0, 31.6], [20.0, 33.4], [25.0, 32.4],
  [30.0, 31.9], [33.0, 31.6], [34.0, 32.0], [34.6, 33.2], [35.4, 34.7], [35.6, 35.8], [35.8, 36.5], [36.3, 36.9], [37.6, 37.6],
  [38.8, 38.6], [40.2, 39.6], [41.6, 40.9], [43.5, 41.9], [46.0, 42.2], [48.3, 42.1], [50.5, 40.4], [52.6, 38.8], [54.0, 37.6],
  [55.0, 38.5], [58.0, 39.8], [60.0, 42.2], [61.5, 42.6], [63.5, 41.5], [66.5, 41.2], [69.0, 41.6], [71.5, 41.4], [73.0, 40.6],
  [72.5, 39.3], [71.0, 37.8], [69.5, 36.8], [67.5, 35.6], [65.5, 34.0], [64.5, 32.0], [66.0, 30.6], [67.6, 29.0], [69.0, 30.2],
  [71.0, 31.0], [72.6, 30.6], [72.0, 28.6], [71.0, 26.5], [70.4, 24.4], [68.6, 23.2], [66.0, 24.6], [61.6, 24.9], [58.5, 25.0],
  [60.0, 22.0], [57.0, 18.3], [52.0, 15.3], [45.0, 12.0], [43.3, 12.6], [41.3, 15.0], [40.0, 18.0], [38.2, 21.0], [36.5, 23.0],
  [33.0, 23.6], [30.5, 23.8], [27.0, 25.5], [22.0, 27.0], [17.0, 28.5], [12.0, 29.8], [8.0, 30.6], [5.0, 33.0], [4.6, 35.5],
]
// Umayyad emirate (from 929 caliphate) of Córdoba: al-Andalus.
const ANDALUS = [
  [-10.4, 36.4], [-10.0, 38.6], [-9.8, 41.1], [-6.0, 41.3], [-3.6, 41.6], [-2.0, 42.4], [-1.4, 42.8], [0.3, 42.75], [1.2, 42.5],
  [2.2, 41.6], [2.8, 41.0], [0.8, 38.5], [-0.5, 37.0], [-2.2, 36.4], [-5.4, 35.9], [-6.6, 36.0], [-8.9, 36.6],
]

// ---------- c. 1000 ----------
const FATIMID_1000 = [
  [8.5, 37.6], [11.2, 37.6], [11.8, 35.2], [12.2, 33.4], [15.5, 32.6], [19.0, 31.6], [20.0, 33.4], [25.0, 32.4], [30.0, 31.9],
  [33.0, 31.6], [34.0, 32.0], [34.6, 33.2], [35.4, 34.7], [35.9, 34.9], [37.2, 34.6], [38.2, 33.6], [37.6, 31.8], [37.2, 30.0],
  [38.3, 27.5], [40.0, 25.0], [41.2, 22.0], [41.6, 19.5], [40.0, 18.0], [38.2, 21.0], [36.5, 23.0], [33.0, 23.6], [30.5, 23.8],
  [27.0, 25.5], [22.0, 27.0], [17.0, 28.5], [12.0, 29.8], [8.0, 30.6], [6.0, 33.0], [6.5, 35.8],
]
const SICILY_1000 = [[12.0, 38.4], [15.7, 38.4], [15.7, 36.4], [12.0, 36.6]]
const BUYID_1000 = [
  [38.2, 33.6], [40.4, 35.2], [42.0, 37.2], [44.4, 37.4], [46.5, 38.6], [49.0, 38.4], [50.5, 37.6], [53.5, 37.0], [55.5, 36.5],
  [56.5, 34.0], [58.5, 30.5], [60.0, 27.5], [58.5, 25.2], [56.6, 27.0], [55.0, 26.8], [51.5, 27.0], [49.0, 28.8], [46.5, 29.4],
  [43.5, 31.6], [41.6, 34.0],
]
const GHAZNAVID_1000 = [
  [55.5, 36.5], [56.0, 38.0], [58.0, 39.6], [61.5, 39.5], [64.5, 38.0], [67.5, 37.4], [69.5, 37.0], [71.5, 36.0], [73.5, 34.5],
  [74.5, 32.5], [73.0, 30.5], [70.5, 29.0], [68.0, 27.5], [66.0, 25.2], [61.6, 24.9], [60.0, 27.5], [58.5, 30.5], [56.5, 34.0],
]
const CORDOBA_1000 = [
  [-10.4, 36.4], [-10.0, 38.6], [-9.0, 40.6], [-6.5, 41.0], [-4.0, 41.2], [-2.5, 41.8], [-1.6, 42.3], [0.0, 42.4], [1.0, 41.9],
  [1.5, 41.3], [2.8, 41.0], [0.8, 38.5], [-0.5, 37.0], [-1.5, 36.0], [-5.4, 34.9], [-7.0, 34.0], [-9.0, 33.6], [-10.0, 35.0],
]

// ---------- 1258 ----------
const MONGOL_1258 = [
  [41.6, 42.0], [38.0, 44.6], [33.8, 44.3], [31.0, 46.2], [29.5, 45.2], [28.2, 45.5], [27.5, 48.3], [30.0, 50.5], [40.0, 52.0], [52.0, 52.0], [60.0, 49.5], [70.0, 49.5], [80.0, 49.5], [86.0, 48.0], [86.0, 38.0],
  [76.0, 37.0], [72.5, 34.5], [70.0, 32.5], [67.6, 29.5], [66.0, 25.2], [61.6, 24.9], [58.5, 25.0], [56.6, 27.0], [55.0, 26.8],
  [51.5, 27.0], [49.0, 28.8], [47.5, 30.0], [47.0, 31.6], [46.0, 33.2], [45.4, 34.4], [44.8, 35.8], [43.0, 37.0], [42.0, 37.8],
  [43.0, 39.6], [42.6, 41.0],
]
const ABBASID_1258 = [[46.0, 33.2], [47.0, 31.6], [47.5, 30.0], [46.0, 29.8], [44.0, 31.0], [42.5, 32.6], [42.4, 34.4], [43.8, 35.6], [44.8, 35.8], [45.4, 34.4]]
const RUM_1258 = [[27.5, 40.8], [30.0, 41.4], [33.0, 42.2], [36.5, 42.0], [39.0, 41.6], [41.6, 41.9], [42.6, 41.0], [43.0, 39.6], [42.0, 37.8], [39.5, 37.4], [37.0, 36.9], [35.6, 36.4], [32.0, 36.0], [29.0, 36.4], [28.0, 37.6], [28.8, 39.6]]
const AYYUBID_SYRIA = [[35.6, 36.4], [37.0, 36.9], [39.5, 37.4], [42.0, 37.8], [43.0, 37.0], [42.4, 34.4], [40.5, 34.2], [38.4, 32.0], [36.8, 29.6], [35.0, 29.5], [34.4, 31.4], [34.6, 33.2], [35.4, 34.7]]
const MAMLUK_EGYPT = [[25.0, 32.4], [30.0, 31.9], [33.0, 31.6], [34.4, 31.4], [35.0, 29.5], [34.6, 27.6], [36.5, 23.0], [33.0, 22.0], [31.0, 22.0], [25.0, 22.0], [25.0, 29.5]]
const DELHI_1258 = [[72.0, 30.0], [74.5, 32.2], [77.0, 31.0], [80.0, 29.0], [84.0, 26.6], [88.5, 26.0], [89.0, 22.5], [86.0, 21.8], [83.0, 23.0], [79.0, 24.0], [76.0, 25.5], [73.5, 26.0], [71.5, 27.5]]

// ---------- routes ----------
const CARAVAN_N = [[45.03, 12.8], [44.2, 15.35], [42.5, 18.0], [40.42, 21.27], [39.83, 21.42], [39.61, 24.47], [37.9, 27.6], [35.44, 30.33], [36.3, 33.51]]
const CARAVAN_GAZA = [[35.44, 30.33], [34.47, 31.5]]
const CARAVAN_IRAQ = [[39.61, 24.47], [42.0, 27.5], [44.4, 31.0], [44.58, 33.09]]
const HIJRA = [[39.83, 21.42], [39.3, 22.6], [39.61, 24.47]]
const RETURN_630 = [[39.61, 24.47], [40.25, 23.4], [40.0, 22.0], [39.83, 21.42]]
const TO_SYRIA = [[39.61, 24.47], [37.8, 28.0], [36.4, 31.6], [36.0, 32.5]]
const TO_IRAQ = [[39.61, 24.47], [42.5, 28.0], [44.2, 31.6]]
const TO_EGYPT = [[34.6, 31.3], [32.6, 30.9], [31.0, 30.4]]
const TO_PERSIA = [[44.4, 32.4], [48.0, 34.0], [53.0, 34.8], [58.8, 36.2], [61.6, 37.4]]
const TO_SPAIN = [[-2.5, 34.5], [-5.6, 35.8], [-5.8, 36.8], [-4.8, 38.0], [-3.6, 41.3], [-1.6, 43.0], [0.0, 45.5], [0.6, 47.1]]
const TO_INDUS = [[61.6, 26.5], [65.0, 25.8], [68.0, 25.0], [70.4, 28.0], [71.3, 30.0]]
const TO_TALAS = [[61.83, 37.66], [64.42, 39.77], [66.97, 39.65], [69.2, 41.3], [72.0, 42.4]]
const SILK_ROAD = [[44.37, 33.31], [48.5, 34.8], [53.0, 35.6], [58.8, 36.2], [61.83, 37.66], [64.42, 39.77], [66.97, 39.65], [72.0, 40.5], [75.99, 39.47], [81.0, 40.6], [88.0, 42.0], [94.66, 40.14], [103.8, 36.1], [108.94, 34.34]]
const WEST_ROAD = [[44.37, 33.31], [40.4, 35.0], [36.3, 33.51], [33.0, 30.6], [31.24, 30.05], [25.0, 31.0], [20.0, 31.4], [14.0, 32.4], [10.1, 35.68], [4.0, 35.6], [-2.0, 34.4], [-5.0, 34.03], [-5.6, 35.8], [-4.78, 37.88]]
const SEA_EAST = [[47.8, 30.5], [50.0, 28.8], [52.33, 27.67], [56.4, 26.0], [58.6, 23.0], [64.0, 19.0], [72.0, 14.0], [75.0, 11.5], [76.5, 8.2], [80.0, 5.4], [88.0, 5.5], [95.0, 6.0], [99.0, 3.5], [104.0, 1.4], [107.0, 8.0], [110.0, 15.0], [113.26, 22.6]]
const SEA_AFRICA = [[45.03, 12.4], [49.0, 11.8], [51.6, 11.0], [50.0, 6.0], [45.6, 1.5], [42.0, -2.5], [40.2, -6.0], [39.8, -8.9]]
const SEA_RED = [[45.03, 12.4], [43.2, 13.2], [41.0, 16.5], [38.5, 20.5], [35.5, 25.5], [33.6, 28.0], [32.6, 29.8]]
const SAHARA = [[-4.26, 31.28], [-5.5, 27.0], [-6.5, 22.5], [-7.0, 19.0], [-7.98, 15.77]]
const SELJUK_ARROW = [[64.42, 39.77], [61.83, 37.66], [58.8, 36.2], [53.0, 35.6], [48.5, 34.8], [44.6, 33.4]]
const HULAGU = [[66.97, 39.65], [61.83, 37.66], [57.0, 36.5], [52.5, 36.2], [50.58, 36.44], [48.5, 34.8], [46.0, 34.0], [44.6, 33.4]]

// ---------- map steps (the animated map) ----------
// view: [lonMin, latMin, lonMax, latMax] to zoom in, or null for the whole map.
const C = { islam: '#4E7A55', byz: '#4E7FA6', sas: '#6E5A8F', aksum: '#C99A3D', abbasid: '#C99A3D', fatimid: '#6E5A8F', turk: '#B5482A', mongol: '#B5482A', route: '#7A3B22', sea: '#2E6E9A' }
const ARABIA = [29, 11.5, 61, 35]
const REALM = [-12, 8, 80, 48]
const STEPS = [
  {
    title: 'Arabia, c. 600', caption: 'Arabia is a land of Bedouin herders and caravan towns like Mecca and Medina. Around it sit two great empires, the Christian Byzantines and Zoroastrian Sasanian Persia, worn out by wars with each other.',
    view: ARABIA,
    lands: [{ label: 'Byzantine Empire', color: C.byz, polys: [BYZ_600], at: [29.5, 27.0] }, { label: 'Sasanian Persia', color: C.sas, polys: [SAS_600, SAS_YEMEN], at: [53.5, 32.0] },
      { label: 'Aksum', color: C.aksum, polys: [AKSUM], at: [37.6, 15.6] }],
    routes: [{ pts: CARAVAN_N, color: C.route, label: 'caravan route', labelAt: [37.9, 27.6] }, { pts: CARAVAN_GAZA, color: C.route }, { pts: CARAVAN_IRAQ, color: C.route }],
    tags: [{ text: 'Arab tribes', at: [45.5, 24.5] }, { text: 'incense · spices', at: [47.5, 17.6] }],
    cities: ['mecca', 'medina', 'damascus', 'jerusalem', 'ctesiphon', 'sanaa', 'aden', 'petra'],
  },
  {
    title: 'The hijra and a united Arabia, 622–632', caption: 'In 622 Muhammad and his followers flee from Mecca to Medina (the hijra). In 630 they return and take Mecca. By Muhammad’s death in 632 most of Arabia has joined the umma.',
    chip: 'Hijra, 622',
    view: ARABIA,
    lands: [{ label: 'Muslim Arabia, 632', color: C.islam, polys: [ARABIA_632], at: [48.0, 20.5] }, { label: 'Byzantines', color: C.byz, polys: [BYZ_600], at: [29.5, 27.0], faint: true }, { label: 'Sasanians', color: C.sas, polys: [SAS_600], at: [53.5, 32.0], faint: true }],
    routes: [{ pts: HIJRA, color: C.route, arrow: true, label: 'hijra, 622', labelAt: [36.6, 22.3] }, { pts: RETURN_630, color: '#B5482A', arrow: true, dashed: true, label: 'return, 630', labelAt: [42.6, 23.2] }],
    cities: ['mecca', 'medina', 'badr'],
  },
  {
    title: 'The first caliphs’ conquests, 632–661', chip: 'Conquests, 661',
    caption: 'Arab armies beat the Byzantines at Yarmuk (636) and take Syria and Egypt. They crush the Persians at Qadisiyya and Nahavand; by 651 the Sasanian Empire is gone.',
    view: [10, 10, 72, 48],
    lands: [{ label: 'Caliphate by 661', color: C.islam, polys: [RASHIDUN_661], at: [50.0, 20.5] }, { label: 'Byzantine Empire', color: C.byz, polys: [BYZ_661, BYZ_AFRICA, SICILY], at: [32.5, 39.2] }],
    routes: [{ pts: TO_SYRIA, color: C.route, arrow: true }, { pts: TO_IRAQ, color: C.route, arrow: true }, { pts: TO_EGYPT, color: C.route, arrow: true }, { pts: TO_PERSIA, color: C.route, arrow: true }],
    cities: ['mecca', 'medina', 'damascus', 'fustat', 'kufa', 'yarmuk', 'nahavand', 'merv', 'constantinople'],
  },
  {
    title: 'The Umayyad caliphate, c. 750', chip: 'Umayyads',
    caption: 'Ruling from Damascus, the Umayyads stretch the caliphate from Spain to the Indus. Arab and Berber armies take Spain from 711; a Frankish army stops a raid into France near Tours (732).',
    view: REALM,
    lands: [{ label: 'Umayyad caliphate', color: C.islam, polys: [UMAYYAD_740], at: [44.0, 24.5] }, { label: 'Byzantines', color: C.byz, polys: [BYZ_661, SICILY], at: [32.5, 39.2], faint: true }],
    routes: [{ pts: TO_SPAIN, color: C.route, arrow: true, label: '711–732', labelAt: [-6.5, 40.0] }, { pts: TO_INDUS, color: C.route, arrow: true, label: '711', labelAt: [66.0, 23.6] }],
    cities: ['damascus', 'mecca', 'cordoba', 'tours', 'kairouan', 'fustat', 'samarkand', 'multan', 'constantinople'],
  },
  {
    title: 'The Abbasid caliphate, c. 800', chip: 'Abbasids',
    caption: 'The Abbasids move the capital east to Baghdad (founded 762), close to Persia, and beat a Tang Chinese army at Talas (751). Spain stays loyal to a surviving Umayyad prince.',
    view: REALM,
    lands: [{ label: 'Abbasid caliphate', color: C.abbasid, polys: [ABBASID_800], at: [44.0, 24.5] }, { label: 'Umayyad Spain', color: C.islam, polys: [ANDALUS], at: [-3.6, 40.2] }],
    routes: [{ pts: TO_TALAS, color: C.route, arrow: true }],
    tags: [{ text: 'House of Wisdom', at: [44.4, 35.8] }, { text: 'Persian-style court', at: [52.0, 31.0] }],
    cities: ['baghdad', 'cordoba', 'damascus', 'mecca', 'fustat', 'kairouan', 'samarkand', 'merv', 'basra', 'talas'],
  },
  {
    title: 'A hemispheric trading zone, 800–1200', chip: 'Trade',
    caption: 'Camel caravans (solid) and monsoon ships (dashed) link Dar al-Islam to China, India, East Africa and West Africa. Crops, paper, numerals and money move along the same routes.',
    view: [-16, -14, 118, 50],
    lands: [{ label: '', color: C.abbasid, polys: [ABBASID_800], faint: true }, { label: '', color: C.islam, polys: [ANDALUS], faint: true }],
    routes: [{ pts: SILK_ROAD, color: C.route, label: 'Silk Roads', labelAt: [88.0, 42.0] }, { pts: WEST_ROAD, color: C.route }, { pts: SAHARA, color: C.route, label: 'gold', labelAt: [-6.6, 22.0] },
      { pts: SEA_EAST, color: C.sea, dashed: true, label: 'monsoon sea lanes', labelAt: [88.0, 5.5] }, { pts: SEA_AFRICA, color: C.sea, dashed: true }, { pts: SEA_RED, color: C.sea, dashed: true }],
    tags: [{ text: 'paper (from China)', at: [70.0, 44.5] }, { text: 'Indian numerals', at: [78.5, 20.0] }, { text: 'sugar · cotton · rice', at: [70.0, 25.5] }, { text: 'silk · porcelain', at: [106.0, 29.0] },
      { text: 'citrus', at: [-3.5, 39.6] }, { text: 'gold · ivory · slaves', at: [33.0, -4.0] }, { text: 'spices', at: [100.0, 9.5] }],
    cities: ['baghdad', 'basra', 'cairo', 'cordoba', 'samarkand', 'changan', 'guangzhou', 'calicut', 'kilwa', 'sijilmasa', 'koumbi'],
  },
  {
    title: 'A divided Dar al-Islam, c. 1000', chip: 'Divided, c. 1000',
    caption: 'Rival caliphs rule in Córdoba (929) and Cairo (Fatimids, 969). In Baghdad the Persian Buyids control the Abbasid caliph. In 1055 the Seljuk Turks take Baghdad and rule as sultans.',
    view: REALM,
    lands: [{ label: 'Córdoba caliphate', color: C.islam, polys: [CORDOBA_1000], at: [-3.0, 40.2] }, { label: 'Fatimids', color: C.fatimid, polys: [FATIMID_1000, SICILY_1000], at: [26.0, 27.0] },
      { label: 'Buyids (Abbasid caliph)', color: C.abbasid, polys: [BUYID_1000], at: [50.0, 30.6] }, { label: 'Ghaznavid Turks', color: C.turk, polys: [GHAZNAVID_1000], at: [64.0, 29.0] }],
    routes: [{ pts: SELJUK_ARROW, color: C.turk, arrow: true, dashed: true, label: 'Seljuk Turks, 1055', labelAt: [56.0, 38.4] }],
    cities: ['cordoba', 'cairo', 'baghdad', 'ghazni', 'bukhara', 'mecca', 'kairouan'],
  },
  {
    title: 'The Mongols sack Baghdad, 1258', chip: 'Baghdad, 1258',
    caption: 'Hulagu, a grandson of Chinggis Khan, destroys the Assassins’ fortress at Alamut (1256) and then sacks Baghdad, killing the last Abbasid caliph. Mamluk Egypt and the Delhi Sultanate survive.',
    view: [14, 14, 90, 50],
    lands: [{ label: 'Mongol Empire', color: C.mongol, polys: [MONGOL_1258], at: [62.0, 44.5] }, { label: 'Abbasid Iraq', color: C.abbasid, polys: [ABBASID_1258], at: [45.5, 29.0] },
      { label: 'Seljuks of Rum', color: C.byz, polys: [RUM_1258], at: [33.5, 39.4] }, { label: 'Ayyubids', color: '#4E7A55', polys: [AYYUBID_SYRIA], at: [39.8, 35.9] },
      { label: 'Mamluks', color: C.fatimid, polys: [MAMLUK_EGYPT], at: [29.0, 26.5] }, { label: 'Delhi Sultanate', color: '#4E7A55', polys: [DELHI_1258], at: [80.0, 25.6] }],
    routes: [{ pts: HULAGU, color: C.mongol, arrow: true, label: 'Hulagu, 1256–58', labelAt: [55.0, 37.6] }],
    cities: ['baghdad', 'alamut', 'samarkand', 'cairo', 'damascus', 'konya', 'delhi', 'merv'],
  },
]

// base: the base map in src/geo; aspect: height / width of the map frame.
export default { base: 'world', aspect: 0.62, cities: CITIES, steps: STEPS }
