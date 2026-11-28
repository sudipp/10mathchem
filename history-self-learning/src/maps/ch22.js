// Chapter 22 map layers (longitude, latitude). Territory outlines are drawn loosely over
// the sea: the map clips every territory to the coastline, so only land frontiers need care.
// Sources for routes and frontiers: standard historical atlases (Portuguese voyages, Magellan–Elcano track,
// Manila galleon lanes, trading posts c. 1700, Russian expansion 1505–1700, Treaty of Nerchinsk 1689).
// The world base stops at 180°, so Pacific crossings are drawn as two routes that meet at the edge.

const CITIES = {
  // Europe and the Mediterranean
  lisbon: { name: 'Lisbon', at: [-9.14, 38.72], big: true, side: 'left' },
  seville: { name: 'Seville', at: [-5.99, 37.39], big: true },
  palos: { name: 'Palos', at: [-6.89, 37.23], side: 'below' },
  london: { name: 'London', at: [-0.12, 51.5] },
  amsterdam: { name: 'Amsterdam', at: [4.9, 52.37] },
  bristol: { name: 'Bristol', at: [-2.59, 51.45], side: 'left' },
  stMalo: { name: 'St-Malo', at: [-2.0, 48.65], side: 'left' },
  venice: { name: 'Venice', at: [12.33, 45.44] },
  constantinople: { name: 'Constantinople', at: [28.98, 41.01] },
  alexandria: { name: 'Alexandria', at: [29.9, 31.2], side: 'left' },
  cairo: { name: 'Cairo', at: [31.24, 30.04], side: 'below' },
  // Atlantic islands and Africa
  madeira: { name: 'Madeira', at: [-16.9, 32.65], side: 'left' },
  azores: { name: 'Azores', at: [-25.7, 37.75], side: 'left' },
  canaries: { name: 'Canary Is.', at: [-15.5, 28.1], side: 'left' },
  capeVerde: { name: 'Cape Verde Is.', at: [-23.6, 15.0], side: 'left' },
  elmina: { name: 'Elmina', at: [-1.35, 5.08], side: 'left' },
  luanda: { name: 'Luanda', at: [13.23, -8.84], side: 'left' },
  capeGood: { name: 'Cape of Good Hope', at: [18.47, -34.36], side: 'below' },
  capeTown: { name: 'Cape Town', at: [18.42, -33.92], side: 'left' },
  mozambique: { name: 'Mozambique', at: [40.73, -15.03] },
  malindi: { name: 'Malindi', at: [40.12, -3.22] },
  // Indian Ocean and Asia
  jidda: { name: 'Jidda', at: [39.17, 21.5], side: 'left' },
  aden: { name: 'Aden', at: [45.03, 12.8], side: 'below' },
  hormuz: { name: 'Hormuz', at: [56.46, 27.1] },
  calicut: { name: 'Calicut', at: [75.78, 11.25], big: true },
  goa: { name: 'Goa', at: [73.83, 15.5], side: 'left' },
  bombay: { name: 'Bombay', at: [72.88, 19.08], side: 'left' },
  madras: { name: 'Madras', at: [80.27, 13.08] },
  calcutta: { name: 'Calcutta', at: [88.36, 22.57] },
  colombo: { name: 'Colombo', at: [79.86, 6.93] },
  malacca: { name: 'Malacca', at: [102.25, 2.2], side: 'left' },
  batavia: { name: 'Batavia', at: [106.85, -6.13], side: 'below' },
  macau: { name: 'Macau', at: [113.55, 22.2], side: 'below' },
  guangzhou: { name: 'Guangzhou', at: [113.26, 23.13] },
  beijing: { name: 'Beijing', at: [116.4, 39.9] },
  manila: { name: 'Manila', at: [120.98, 14.6] },
  nagasaki: { name: 'Nagasaki', at: [129.87, 32.75] },
  mactan: { name: 'Mactan', at: [123.97, 10.3], side: 'left' },
  moluccas: { name: 'Moluccas', at: [127.4, 0.68] },
  guam: { name: 'Guam', at: [144.79, 13.44] },
  // The Americas
  sanSalvador: { name: 'San Salvador', at: [-74.5, 24.05] },
  navidad: { name: 'La Navidad', at: [-72.1, 19.77], side: 'below' },
  portoSeguro: { name: 'Porto Seguro', at: [-39.06, -16.45] },
  panama: { name: 'Panama', at: [-79.52, 8.98], side: 'left' },
  potosi: { name: 'Potosí', at: [-65.75, -19.58] },
  acapulco: { name: 'Acapulco', at: [-99.89, 16.85], side: 'left' },
  quebec: { name: 'Quebec', at: [-71.2, 46.81], side: 'left' },
  // Russia
  moscow: { name: 'Moscow', at: [37.62, 55.75], big: true, side: 'left' },
  kazan: { name: 'Kazan', at: [49.12, 55.79] },
  astrakhan: { name: 'Astrakhan', at: [48.03, 46.35] },
  tobolsk: { name: 'Tobolsk', at: [68.25, 58.2] },
  irkutsk: { name: 'Irkutsk', at: [104.3, 52.29], side: 'below' },
  yakutsk: { name: 'Yakutsk', at: [129.73, 62.03] },
  okhotsk: { name: 'Okhotsk', at: [143.3, 59.36] },
  // Pacific base map (east of 180° counts on: lon + 360)
  manilaP: { name: 'Manila', at: [120.98, 14.6], side: 'left' },
  macauP: { name: 'Macau', at: [113.55, 22.2], side: 'left' },
  acapulcoP: { name: 'Acapulco', at: [260.11, 16.85] },
  limaP: { name: 'Lima', at: [282.97, -12.05] },
  hawaiiP: { name: 'Hawaii', at: [204.5, 19.6] },
  tahitiP: { name: 'Tahiti', at: [210.6, -17.6] },
  botanyP: { name: 'Botany Bay', at: [151.2, -34.0], side: 'left' },
  kamchatkaP: { name: 'Kamchatka', at: [158.65, 53.0], side: 'left' },
}

// ---------- territories ----------
const PORTUGAL = [[-9.6, 42.15], [-8.2, 42.15], [-6.2, 41.6], [-6.9, 40.2], [-7.0, 39.0], [-7.4, 38.2], [-7.4, 37.1], [-9.2, 36.8], [-9.9, 38.7]]
const CASTILE = [[-8.2, 42.15], [-9.4, 43.9], [-1.8, 43.5], [0.7, 42.8], [3.3, 42.5], [3.4, 41.3], [0.2, 38.8], [-1.6, 36.8], [-5.6, 35.9], [-7.4, 37.1], [-7.4, 38.2], [-7.0, 39.0], [-6.9, 40.2], [-6.2, 41.6]]
const MADEIRA_IS = [[-17.6, 33.3], [-16.0, 33.3], [-16.0, 32.3], [-17.6, 32.3]]
const AZORES_IS = [[-31.5, 40.0], [-24.8, 40.0], [-24.8, 36.6], [-31.5, 36.6]]
const CAPE_VERDE_IS = [[-25.6, 17.4], [-22.4, 17.4], [-22.4, 14.6], [-25.6, 14.6]]
const CANARY_IS = [[-18.4, 29.6], [-13.2, 29.6], [-13.2, 27.5], [-18.4, 27.5]]
const MAMLUKS = [[25.0, 31.8], [25.0, 22.0], [31.5, 22.0], [36.2, 22.0], [38.0, 23.8], [39.2, 21.0], [41.0, 18.0], [42.5, 17.0], [43.5, 22.0], [39.0, 27.5], [36.5, 30.0], [38.0, 33.5], [40.0, 35.5], [38.5, 37.0], [36.8, 37.5], [35.0, 36.6], [34.0, 34.5], [32.0, 31.5]]
const OTTOMANS_1450 = [[19.5, 42.0], [21.0, 43.5], [23.5, 44.2], [28.6, 44.3], [28.8, 41.6], [29.0, 41.25], [30.5, 41.3], [33.5, 42.2], [36.0, 41.8], [36.0, 40.0], [33.5, 38.5], [31.0, 37.2], [28.0, 36.6], [26.0, 37.8], [26.0, 40.0], [23.5, 39.6], [22.0, 38.0], [20.0, 39.5]]
const MING = [[97.5, 28.0], [98.5, 24.5], [101.5, 21.5], [106.5, 21.5], [109.5, 18.0], [111.5, 21.0], [117.0, 23.0], [120.5, 27.0], [122.0, 31.0], [120.5, 35.5], [122.5, 37.5], [118.0, 39.0], [121.5, 41.0], [124.5, 40.0], [124.0, 42.0], [119.0, 41.5], [115.0, 41.0], [111.0, 41.3], [106.0, 39.0], [103.5, 37.5], [100.0, 38.5], [97.5, 39.8], [98.5, 36.0], [101.0, 33.0], [99.0, 30.0]]
// trading posts and coastal holdings, c. 1700 (small blocks around each post)
const box = ([lon, lat], r = 0.9) => [[lon - r, lat + r], [lon + r, lat + r], [lon + r, lat - r], [lon - r, lat - r]]
const PT_ANGOLA = [[11.5, -6.0], [16.5, -6.0], [17.5, -10.0], [14.0, -13.0], [11.5, -13.0]]
const PT_MOZAMBIQUE = [[35.0, -26.0], [33.0, -20.0], [35.5, -14.0], [37.0, -10.5], [41.5, -10.5], [41.5, -15.0], [36.5, -24.5]]
const PT_TIMOR = [[124.2, -8.0], [127.4, -8.0], [127.4, -9.8], [124.2, -10.4]]
const NL_CAPE = [[17.6, -31.6], [20.6, -31.6], [20.6, -35.0], [17.6, -35.0]]
const NL_CEYLON = [[79.4, 10.0], [82.2, 9.0], [82.2, 5.6], [79.4, 5.6]]
const NL_JAVA = [[104.8, -5.4], [114.8, -6.4], [114.8, -9.0], [104.8, -7.6]]
const NL_MOLUCCAS = [[126.8, 1.4], [128.6, 1.4], [130.2, -3.2], [130.2, -5.0], [127.6, -4.0], [126.8, -2.0]]
const ES_PHILIPPINES = [[119.4, 18.8], [122.8, 18.8], [124.6, 14.0], [126.6, 9.5], [126.2, 6.5], [122.0, 6.8], [119.4, 9.5], [119.6, 15.0]]
// Russia (frontiers after standard atlases; the 1700 line follows the Treaty of Nerchinsk, 1689)
const MUSCOVY_1505 = [[28.0, 60.0], [28.2, 57.6], [30.5, 56.6], [32.5, 55.0], [35.0, 54.0], [38.0, 52.6], [42.0, 53.0], [45.0, 54.6], [47.5, 56.2], [52.0, 57.5], [56.5, 58.5], [59.5, 61.5], [61.5, 65.0], [60.0, 69.5], [44.0, 68.8], [40.0, 67.0], [33.0, 70.5], [29.5, 69.8], [30.5, 66.0], [29.5, 62.5]]
const RUSSIA_1600 = [[45.0, 54.6], [42.0, 53.0], [40.5, 50.5], [44.0, 47.5], [46.5, 45.6], [48.5, 45.2], [50.5, 46.6], [52.5, 49.2], [55.5, 51.2], [60.5, 53.5], [65.5, 55.0], [70.5, 56.5], [75.5, 58.6], [80.0, 61.5], [84.0, 65.5], [80.0, 73.5], [68.0, 73.5], [61.5, 70.0], [60.0, 69.5], [61.5, 65.0], [59.5, 61.5], [56.5, 58.5], [52.0, 57.5], [47.5, 56.2]]
const RUSSIA_1700 = [[75.5, 58.6], [70.5, 56.5], [65.5, 55.0], [72.0, 54.4], [80.0, 52.8], [87.0, 51.4], [95.0, 50.6], [104.0, 51.0], [108.0, 49.6], [116.0, 49.8], [119.5, 52.6], [127.0, 53.6], [134.0, 55.2], [139.5, 57.5], [150.0, 59.6], [160.0, 61.2], [170.0, 62.6], [179.9, 65.0], [179.9, 72.0], [150.0, 72.5], [130.0, 74.0], [110.0, 78.0], [97.0, 78.0], [84.0, 75.0], [80.0, 73.5], [84.0, 65.5], [80.0, 61.5]]

// ---------- routes ----------
const SPICE_SEA = [[102.25, 2.2], [95.0, 6.0], [80.5, 6.0], [75.78, 11.25], [62.0, 13.5], [45.03, 12.8], [43.3, 12.6], [39.17, 21.5], [34.5, 27.5], [32.55, 29.95]]
const SPICE_NILE = [[32.55, 29.95], [31.24, 30.04], [29.9, 31.2]]
const SPICE_MED = [[29.9, 31.2], [24.0, 34.6], [19.5, 37.5], [18.6, 40.4], [14.5, 43.8], [12.33, 45.44]]
const SILK_ROAD = [[116.4, 39.9], [108.9, 34.3], [94.7, 40.1], [87.0, 43.0], [75.98, 39.47], [66.97, 39.65], [59.6, 36.3], [51.4, 35.7], [46.3, 38.1], [41.3, 39.9], [35.4, 45.0]]
const DIAS = [[-9.14, 38.72], [-15.5, 30.0], [-17.5, 21.0], [-17.6, 14.7], [-13.5, 7.5], [-6.0, 4.3], [3.0, 3.5], [9.0, 1.0], [9.5, -6.0], [11.5, -16.0], [14.5, -26.0], [16.5, -31.0], [18.47, -35.0], [22.5, -34.6], [26.6, -34.0]]
const GAMA = [[-9.14, 38.72], [-16.0, 29.0], [-23.0, 16.0], [-25.0, 5.0], [-29.0, -10.0], [-28.0, -24.0], [-18.0, -33.0], [-2.0, -35.5], [12.0, -34.0], [17.9, -32.7], [19.5, -36.2], [24.0, -35.0], [31.5, -30.5], [36.0, -24.0], [40.73, -15.03], [41.0, -8.0], [40.12, -3.22], [52.0, 4.0], [66.0, 9.0], [75.78, 11.25]]
const COLUMBUS_OUT = [[-6.89, 37.23], [-12.5, 31.5], [-17.2, 28.1], [-35.0, 27.6], [-55.0, 26.5], [-74.5, 24.05], [-75.8, 22.6], [-77.5, 21.6], [-75.0, 20.4], [-72.1, 19.77]]
const COLUMBUS_BACK = [[-70.0, 19.9], [-62.0, 28.0], [-50.0, 35.0], [-37.0, 37.5], [-25.2, 37.0], [-12.0, 38.2], [-9.14, 38.72]]
const CABRAL = [[-23.6, 15.0], [-30.0, 0.0], [-36.0, -12.0], [-39.06, -16.45]]
const CABOT = [[-2.59, 51.45], [-12.0, 52.5], [-30.0, 53.0], [-45.0, 52.0], [-55.5, 51.5]]
const CARTIER = [[-2.0, 48.65], [-15.0, 49.0], [-35.0, 50.0], [-53.0, 51.6], [-60.0, 49.8], [-66.0, 49.2], [-71.2, 46.81]]
const HUDSON = [[-2.5, 58.8], [-25.0, 61.0], [-45.0, 59.5], [-62.0, 61.0], [-72.0, 62.4], [-80.0, 61.0], [-80.5, 55.0]]
const TORDESILLAS = [[-46.6, 75.0], [-46.6, -55.0]]
const MAGELLAN_A = [[-5.99, 37.39], [-14.0, 30.0], [-20.0, 15.0], [-28.0, 0.0], [-36.0, -10.0], [-43.2, -23.5], [-48.0, -28.6], [-56.0, -36.0], [-63.0, -43.0], [-67.7, -49.3], [-68.6, -52.6], [-71.5, -53.7], [-75.0, -52.4], [-78.0, -45.0], [-82.0, -32.0], [-100.0, -24.0], [-120.0, -16.0], [-140.0, -8.0], [-157.0, 0.0], [-170.0, 8.0], [-179.9, 11.5]]
const MAGELLAN_B = [[179.9, 11.5], [165.0, 12.8], [144.79, 13.44], [130.0, 11.5], [125.7, 10.8], [123.97, 10.3]]
const ELCANO = [[123.97, 10.3], [125.0, 7.0], [127.4, 0.68], [124.5, -9.6], [110.0, -22.0], [90.0, -34.0], [60.0, -40.0], [30.0, -38.0], [18.5, -35.6], [8.0, -24.0], [-5.0, -5.0], [-21.0, 12.0], [-23.6, 15.0], [-18.0, 28.0], [-6.99, 36.6]]
const GALLEON_WEST_P = [[260.11, 16.85], [245.0, 13.5], [220.0, 13.0], [190.0, 13.0], [160.0, 13.2], [144.8, 13.4], [130.0, 13.0], [121.5, 13.8]]
const GALLEON_EAST_P = [[121.5, 15.4], [126.0, 19.0], [138.0, 33.0], [160.0, 39.5], [190.0, 41.0], [220.0, 40.5], [237.0, 37.0], [246.0, 28.0], [255.0, 20.0], [259.0, 17.6]]
const DRAKE_P = [[287.0, -42.0], [285.0, -25.0], [282.5, -12.5], [279.0, -2.0], [272.0, 9.0], [262.0, 15.5], [250.0, 23.0], [242.0, 31.0], [237.0, 38.0]]
const BERING_P = [[158.65, 53.0], [172.0, 53.6], [190.0, 55.8], [205.0, 58.0], [215.5, 59.9]]
const COOK_P = [[210.6, -17.6], [195.0, -28.0], [175.0, -39.0], [165.0, -40.0], [153.5, -36.0], [151.2, -34.0], [153.5, -27.0], [146.0, -15.0], [142.0, -10.5]]
const COOK3_P = [[210.6, -17.6], [206.0, 0.0], [203.0, 18.5], [215.0, 35.0], [233.0, 48.0], [222.0, 58.5], [205.0, 57.0], [192.0, 62.0]]
const YERMAK = [[56.25, 58.0], [59.5, 58.6], [62.5, 58.2], [65.5, 57.9], [68.25, 58.2]]
const SILVER_ATL = [[-65.75, -19.58], [-70.3, -18.5], [-76.5, -11.0], [-79.5, -2.0], [-79.6, 8.9], [-79.8, 11.5], [-82.4, 23.1], [-70.0, 30.0], [-50.0, 35.0], [-30.0, 37.5], [-6.5, 37.0]]
const SILVER_PAC_A = [[-99.89, 16.85], [-120.0, 13.5], [-150.0, 13.0], [-179.9, 13.0]]
const SILVER_PAC_B = [[179.9, 13.0], [160.0, 13.2], [144.8, 13.4], [130.0, 13.4], [121.5, 14.0]]
const MANILA_CHINA = [[120.98, 14.6], [119.0, 19.0], [116.0, 22.3], [113.9, 22.6]]
const SLAVE_TRADE = [[2.0, 5.5], [-12.0, 3.0], [-30.0, 0.0], [-45.0, 2.0], [-60.0, 12.0], [-68.0, 18.0]]
const SLAVE_BRAZIL = [[11.0, -8.5], [-5.0, -10.0], [-25.0, -12.0], [-38.4, -13.0]]
const EUROPE_AFRICA = [[-1.0, 49.0], [-9.0, 44.0], [-13.0, 30.0], [-17.0, 18.0], [-12.0, 7.5], [0.0, 5.0]]

// ---------- map steps (the animated map) ----------
// view: [lonMin, latMin, lonMax, latMax] to zoom in, or null for the whole map.
const C = { pt: '#4E7A55', es: '#6E5A8F', nl: '#C99A3D', en: '#B5482A', mus: '#7A3B22', ming: '#2E6E9A', ru: '#6E5A8F', sea: '#2E6E9A', land: '#7A3B22', fr: '#4E7FA6' }
const STEPS = [
  {
    title: 'Spices through middlemen, c. 1450', chip: 'Middlemen',
    caption: 'Pepper, cloves and silk reached Europe only after passing through many hands: Indian, Arab and Egyptian merchants, the Mamluk sultan’s customs posts and Venetian ships. Each stop added duties, so prices in Europe were huge.',
    view: [-24, -6, 128, 55],
    lands: [{ label: 'Mamluk Sultanate', color: C.mus, polys: [MAMLUKS], at: [30.0, 25.5] }, { label: 'Ottomans', color: C.es, polys: [OTTOMANS_1450], at: [32.5, 38.0] },
      { label: 'Ming China', color: C.ming, polys: [MING], at: [108.0, 30.0] }, { label: 'Portugal', color: C.pt, polys: [PORTUGAL], at: [-6.0, 33.6] }],
    routes: [{ pts: SPICE_SEA, color: C.sea, dashed: true, label: 'Spice route by sea', labelAt: [62.0, 6.5] }, { pts: SPICE_NILE, color: C.land }, { pts: SPICE_MED, color: C.sea, dashed: true, arrow: true },
      { pts: SILK_ROAD, color: C.land, label: 'Silk Roads', labelAt: [80.0, 45.0] }],
    tags: [{ text: 'cloves · nutmeg', at: [102.0, -2.5] }, { text: 'pepper · ginger', at: [73.0, 3.5] }, { text: 'duties at every stop', at: [48.0, 19.5] }, { text: 'silk · porcelain', at: [112.0, 44.5] }],
    cities: ['venice', 'constantinople', 'alexandria', 'cairo', 'jidda', 'aden', 'calicut', 'malacca', 'beijing', 'lisbon'],
  },
  {
    title: 'Portugal around Africa, 1419–1499', chip: 'Portugal',
    caption: 'Prince Henry’s captains settled Madeira, the Azores and the Cape Verde Islands and planted sugar. Dias rounded the Cape of Good Hope in 1488. Da Gama swung far out into the Atlantic (the volta do mar) and reached Calicut in 1498.',
    view: [-42, -42, 80, 45],
    lands: [{ label: 'Portugal', color: C.pt, polys: [PORTUGAL, MADEIRA_IS, AZORES_IS, CAPE_VERDE_IS], at: [-31.0, 41.0] }, { label: '', color: C.es, polys: [CANARY_IS, CASTILE] }],
    routes: [{ pts: DIAS, color: '#B5482A', label: 'Dias, 1487–88', labelAt: [3.5, -22.0], arrow: true }, { pts: GAMA, color: C.sea, label: 'Da Gama, 1497–98', labelAt: [-30.0, -18.0], arrow: true }],
    tags: [{ text: 'sugar', at: [-11.0, 33.5] }, { text: 'gold · ivory · slaves', at: [-1.5, 10.5] }, { text: 'volta do mar', at: [-34.0, -6.0] }, { text: 'monsoon winds', at: [60.0, 2.0] }],
    cities: ['lisbon', 'madeira', 'azores', 'capeVerde', 'elmina', 'capeGood', 'mozambique', 'malindi', 'calicut'],
  },
  {
    title: 'Atlantic voyages, 1492–1611', chip: 'Atlantic',
    caption: 'Columbus sailed west from Spain in 1492 and reached the Bahamas, Cuba and Hispaniola. In 1494 the Treaty of Tordesillas split the world along a line 370 leagues west of the Cape Verde Islands, which put Brazil (reached by Cabral in 1500) on Portugal’s side. Farther north, Cabot, Cartier and Hudson hunted for a Northwest Passage to Asia.',
    view: [-100, -25, 10, 64],
    lands: [{ label: 'Castile', color: C.es, polys: [CASTILE, CANARY_IS], at: [-3.0, 40.4] }, { label: '', color: C.pt, polys: [PORTUGAL, MADEIRA_IS, AZORES_IS, CAPE_VERDE_IS] }],
    routes: [{ pts: TORDESILLAS, color: '#7A3B22', dashed: true, label: 'Tordesillas line, 1494', labelAt: [-46.6, 43.5] },
      { pts: COLUMBUS_OUT, color: C.es, arrow: true, label: 'Columbus, 1492', labelAt: [-38.0, 27.6] }, { pts: COLUMBUS_BACK, color: C.es, dashed: true, arrow: true },
      { pts: CABRAL, color: C.pt, arrow: true, label: 'Cabral, 1500', labelAt: [-27.0, -8.0] },
      { pts: CABOT, color: C.en, arrow: true, label: 'Cabot, 1497', labelAt: [-28.0, 53.0] }, { pts: CARTIER, color: C.fr, arrow: true, label: 'Cartier, 1534', labelAt: [-24.0, 49.4] },
      { pts: HUDSON, color: C.nl, arrow: true, label: 'Hudson, 1610', labelAt: [-30.0, 60.6] }],
    tags: [{ text: '← Spain’s side', at: [-59.0, 15.0] }, { text: 'Portugal’s side →', at: [-33.0, 3.0] }, { text: 'Brazil', at: [-52.0, -10.0] }],
    cities: ['palos', 'lisbon', 'capeVerde', 'sanSalvador', 'navidad', 'portoSeguro', 'bristol', 'stMalo', 'quebec'],
  },
  {
    title: 'Around the world, 1519–1522', chip: 'Around the world',
    caption: 'Magellan, a Portuguese captain sailing for Spain, found a strait at the tip of South America and crossed the vast Pacific; scurvy killed many of his men and he died in the Philippines in 1521. Elcano brought the last ship, the Victoria, home with 18 survivors in 1522.',
    view: null,
    lands: [{ label: '', color: C.es, polys: [CASTILE] }, { label: '', color: C.pt, polys: [PORTUGAL] }],
    routes: [{ pts: MAGELLAN_A, color: C.es, label: 'Magellan, 1519–21', labelAt: [-122.0, -12.0] }, { pts: MAGELLAN_B, color: C.es, arrow: true },
      { pts: ELCANO, color: '#B5482A', dashed: true, arrow: true, label: 'Elcano, 1521–22', labelAt: [70.0, -38.5] }],
    tags: [{ text: 'Strait of Magellan, 1520', at: [-48.0, -52.0] }, { text: 'Balboa sees the Pacific, 1513', at: [-102.0, 6.0] }, { text: 'Magellan killed, 1521', at: [126.0, 20.5] }, { text: '3 months, 20 days at sea', at: [-132.0, -31.0] }],
    cities: ['seville', 'panama', 'guam', 'mactan', 'moluccas'],
  },
  {
    title: 'Across the Pacific, 1565–1779', chip: 'Pacific', base: 'pacific',
    caption: 'From 1565 Spanish galleons linked Acapulco and Manila: American silver sailed west, Chinese silk and porcelain sailed east. Drake explored the coast of California (1579), Bering, a Dane in Russian service, sailed through the strait between Asia and America (1728) and reached Alaska (1741), and Cook charted the South Pacific and Hawaii (1768–1779).',
    view: null,
    lands: [{ label: 'Spanish Philippines', color: C.es, polys: [ES_PHILIPPINES], at: [131.0, 24.0] }],
    routes: [{ pts: GALLEON_WEST_P, color: C.es, arrow: true, label: 'Manila galleons, 1565–1815', labelAt: [195.0, 9.5] }, { pts: GALLEON_EAST_P, color: C.es, dashed: true, arrow: true },
      { pts: DRAKE_P, color: C.en, arrow: true, label: 'Drake, 1579', labelAt: [276.0, 1.0] }, { pts: BERING_P, color: C.ru, arrow: true, label: 'Bering, 1741', labelAt: [180.0, 51.0] },
      { pts: COOK_P, color: C.sea, arrow: true, label: 'Cook, 1769–70', labelAt: [184.0, -36.0] }, { pts: COOK3_P, color: C.sea, dashed: true, arrow: true, label: 'Cook, 1778', labelAt: [222.0, 31.0] }],
    tags: [{ text: 'silver →', at: [205.0, 16.0] }, { text: '← silk · porcelain', at: [190.0, 44.5] }, { text: 'Bering Strait, 1728 ↑', at: [184.0, 60.6] }],
    cities: ['manilaP', 'macauP', 'acapulcoP', 'limaP', 'hawaiiP', 'tahitiP', 'botanyP', 'kamchatkaP'],
  },
  {
    title: 'Trading-post empires, c. 1700', chip: 'Trading posts',
    caption: 'Portugal built about fifty forts and posts and charged duties on Asian shipping. By 1700 the Dutch VOC (Cape Town, Ceylon, Batavia, the Spice Islands) and the English East India Company (Bombay, Madras, Calcutta) had overtaken it. Spain ruled the Philippines from Manila.',
    view: [-22, -38, 145, 42],
    lands: [{ label: 'Portuguese', color: C.pt, polys: [PT_ANGOLA, PT_MOZAMBIQUE, PT_TIMOR, box([73.9, 15.4], 0.7), box([113.55, 22.2], 0.6)], at: [26.0, -18.0] },
      { label: 'Dutch VOC', color: C.nl, polys: [NL_CAPE, NL_CEYLON, NL_JAVA, NL_MOLUCCAS, box([102.25, 2.2], 0.7), box([-1.35, 5.08], 0.8)], at: [100.0, -13.0] },
      { label: 'English EIC', color: C.en, polys: [box([72.88, 19.08]), box([80.27, 13.08]), box([88.36, 22.57])], at: [83.0, 30.0] },
      { label: 'Spanish', color: C.es, polys: [ES_PHILIPPINES], at: [134.0, 11.0] }],
    tags: [{ text: 'pepper · cinnamon', at: [66.0, 4.0] }, { text: 'cotton textiles', at: [92.0, 17.5] }, { text: 'nutmeg · cloves', at: [130.0, -8.5] }, { text: 'tea · silk', at: [119.0, 30.0] }, { text: 'Portuguese 1515–1622', at: [49.0, 31.0] }, { text: 'Portuguese 1511, Dutch 1641', at: [90.0, -3.0] }, { text: 'Dutch from 1637', at: [-1.0, 1.0] }],
    cities: ['elmina', 'luanda', 'capeTown', 'mozambique', 'hormuz', 'goa', 'bombay', 'madras', 'calcutta', 'colombo', 'malacca', 'batavia', 'macau', 'manila', 'nagasaki'],
  },
  {
    title: 'Russia across Siberia, 1552–1700', chip: 'Russia',
    caption: 'Ivan the Terrible took the Mongol khanates of Kazan (1552) and Astrakhan (1556). Cossacks led by Yermak crossed the Urals in 1582; fur traders and soldiers reached the Pacific by 1639. The Treaty of Nerchinsk (1689) fixed the border with Qing China.',
    view: [18, 38, 180, 78],
    lands: [{ label: 'Muscovy, 1505', color: C.mus, polys: [MUSCOVY_1505], at: [42.0, 64.5] }, { label: 'Added by 1600', color: C.ru, polys: [RUSSIA_1600], at: [75.0, 67.5] },
      { label: 'Added by 1700', color: C.sea, polys: [RUSSIA_1700], at: [120.0, 65.0] }],
    routes: [{ pts: YERMAK, color: '#B5482A', arrow: true, label: 'Yermak, 1582', labelAt: [66.5, 53.0] }],
    tags: [{ text: 'furs: sable, fox, ermine', at: [100.0, 59.5] }, { text: 'Treaty of Nerchinsk, 1689', at: [126.0, 49.2] }, { text: 'Qing China', at: [105.0, 44.0] }],
    cities: ['moscow', 'kazan', 'astrakhan', 'tobolsk', 'irkutsk', 'yakutsk', 'okhotsk'],
  },
  {
    title: 'Global trade and global war, 1565–1763', chip: 'Global trade',
    caption: 'American silver flowed to Spain across the Atlantic and to China through Manila. Enslaved Africans were shipped to the Caribbean and Brazil. Rivalry over this trade exploded in the Seven Years’ War (1756–1763), fought in Europe, North America, the Caribbean and India; Britain won Canada and primacy in India.',
    view: [-180, -45, 180, 68],
    routes: [{ pts: SILVER_ATL, color: '#7A3B22', arrow: true, label: 'silver fleets', labelAt: [-45.0, 37.5] }, { pts: SILVER_PAC_A, color: '#7A3B22', label: 'silver to Asia', labelAt: [-140.0, 13.0] }, { pts: SILVER_PAC_B, color: '#7A3B22', arrow: true },
      { pts: MANILA_CHINA, color: '#7A3B22', arrow: true }, { pts: EUROPE_AFRICA, color: C.sea, dashed: true, arrow: true },
      { pts: SLAVE_TRADE, color: '#B5482A', dashed: true, arrow: true, label: 'enslaved Africans', labelAt: [-32.0, -2.5] }, { pts: SLAVE_BRAZIL, color: '#B5482A', dashed: true, arrow: true }],
    tags: [{ text: 'Quebec, 1759', at: [-71.2, 50.0] }, { text: 'sugar islands', at: [-58.0, 21.5] }, { text: 'Europe: Prussia vs Austria', at: [22.0, 61.0] }, { text: 'Plassey, 1757', at: [88.3, 23.0] }, { text: 'Chinese silk, porcelain', at: [126.0, 36.0] }],
    cities: ['seville', 'london', 'potosi', 'acapulco', 'manila', 'guangzhou'],
  },
]

// base: the base map in src/geo; aspect: height / width of the map frame.
export default { base: 'world', aspect: 0.62, cities: CITIES, steps: STEPS }
