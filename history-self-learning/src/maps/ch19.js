// Chapter 19 map layers (longitude, latitude). Territory outlines are drawn loosely over
// the sea: the map clips every territory to the coastline, so only land frontiers need care.
// Sources for frontiers: standard historical atlases (Byzantium after Manzikert, Europe c. 1200,
// Hanseatic and Italian trade c. 1300, crusader states c. 1140, Reconquista stages, Baltic crusades).

const CITIES = {
  constantinople: { name: 'Constantinople', at: [28.98, 41.01], big: true },
  nicaea: { name: 'Nicaea', at: [29.72, 40.43], side: 'below' },
  manzikert: { name: 'Manzikert, 1071', at: [42.54, 39.14] },
  konya: { name: 'Konya', at: [32.49, 37.87] },
  antioch: { name: 'Antioch', at: [36.16, 36.2], side: 'left' },
  edessa: { name: 'Edessa', at: [38.79, 37.16] },
  jerusalem: { name: 'Jerusalem', at: [35.22, 31.78], big: true },
  acre: { name: 'Acre', at: [35.08, 32.93], side: 'left' },
  damascus: { name: 'Damascus', at: [36.3, 33.51] },
  cairo: { name: 'Cairo', at: [31.24, 30.04] },
  alexandria: { name: 'Alexandria', at: [29.92, 31.2], side: 'left' },
  clermont: { name: 'Clermont, 1095', at: [3.08, 45.78], side: 'below' },
  venice: { name: 'Venice', at: [12.33, 45.44], big: true },
  genoa: { name: 'Genoa', at: [8.93, 44.41], big: true, side: 'left' },
  zara: { name: 'Zara', at: [15.23, 44.12] },
  rome: { name: 'Rome', at: [12.5, 41.9] },
  palermo: { name: 'Palermo', at: [13.36, 38.12] },
  bari: { name: 'Bari', at: [16.87, 41.12] },
  paris: { name: 'Paris', at: [2.35, 48.86], big: true },
  london: { name: 'London', at: [-0.12, 51.5], big: true, side: 'left' },
  aachen: { name: 'Aachen', at: [6.08, 50.78], side: 'left' },
  milan: { name: 'Milan', at: [9.19, 45.46], side: 'left' },
  lubeck: { name: 'Lübeck', at: [10.69, 53.87], big: true },
  hamburg: { name: 'Hamburg', at: [9.99, 53.55], side: 'left' },
  bruges: { name: 'Bruges', at: [3.22, 51.21] },
  novgorod: { name: 'Novgorod', at: [31.27, 58.52], big: true },
  bergen: { name: 'Bergen', at: [5.32, 60.39], side: 'left' },
  visby: { name: 'Visby', at: [18.29, 57.64] },
  troyes: { name: 'Troyes', at: [4.07, 48.3], side: 'left' },
  caffa: { name: 'Caffa', at: [35.38, 45.03] },
  tana: { name: 'Tana', at: [39.42, 47.1] },
  toledo: { name: 'Toledo, 1085', at: [-4.03, 39.86] },
  lasNavas: { name: 'Las Navas, 1212', at: [-3.58, 38.28] },
  cordoba: { name: 'Córdoba, 1236', at: [-4.78, 37.89], side: 'left' },
  seville: { name: 'Seville, 1248', at: [-5.98, 37.39], side: 'left' },
  granada: { name: 'Granada, 1492', at: [-3.6, 37.18], side: 'below' },
  lisbon: { name: 'Lisbon, 1147', at: [-9.14, 38.72] },
  valencia: { name: 'Valencia, 1238', at: [-0.38, 39.47] },
  zaragoza: { name: 'Zaragoza, 1118', at: [-0.88, 41.65] },
  riga: { name: 'Riga, 1201', at: [24.1, 56.95] },
  vinland: { name: 'Vinland, c. 1000', at: [-55.53, 51.6] },
  greenland: { name: 'Greenland, 985', at: [-45.5, 61.15] },
  iceland: { name: 'Iceland, c. 870', at: [-21.9, 64.15] },
  trondheim: { name: 'Trondheim', at: [10.4, 63.43] },
  hastings: { name: 'Hastings, 1066', at: [0.57, 50.85] },
}

// ---------- territories ----------
// Byzantium c. 1100 (after Manzikert, before the Komnenian recovery of the Anatolian coast was complete)
const BYZ_1100 = [[19.0, 41.9], [20.0, 42.6], [21.0, 43.3], [22.0, 44.2], [22.6, 44.6], [23.5, 43.8], [25.5, 43.7], [27.0, 44.1], [28.0, 44.4], [28.8, 45.2], [29.7, 45.2],
  [30.6, 44.2], [31.2, 42.3], [31.6, 41.4], [31.0, 40.0], [30.6, 39.0], [30.4, 38.0], [30.7, 37.0], [31.2, 36.3], [29.0, 35.8], [27.0, 34.6], [23.0, 34.9], [21.0, 36.4], [19.3, 39.5], [19.0, 40.6]]
const CYPRUS = [[32.2, 34.5], [34.7, 34.5], [34.7, 35.8], [32.2, 35.8]]
const SELJUQ_ANATOLIA = [[31.6, 41.4], [33.0, 42.3], [37.0, 42.0], [41.5, 41.6], [44.5, 41.2], [45.5, 39.5], [44.0, 37.5], [41.0, 37.0], [38.0, 37.3], [36.5, 37.3], [34.5, 37.4],
  [33.0, 37.0], [31.3, 36.9], [30.7, 37.0], [30.4, 38.0], [30.6, 39.0], [31.0, 40.0]]
const NORMAN_ITALY = [[13.7, 41.2], [14.0, 41.75], [14.7, 42.15], [16.5, 42.3], [19.2, 40.4], [17.6, 38.5], [15.7, 37.3], [15.4, 36.5], [12.2, 36.5], [12.0, 38.3], [13.5, 38.6], [12.8, 40.5], [13.2, 41.0]]

// Europe c. 1200
const ENGLAND = [[-6.5, 49.8], [1.8, 50.9], [2.0, 52.8], [0.8, 53.8], [-1.0, 55.0], [-1.9, 55.8], [-2.6, 55.6], [-3.1, 55.0], [-3.8, 54.6], [-5.0, 54.2], [-5.5, 53.0], [-5.6, 51.5]]
const ANGEVIN_FRANCE = [[1.4, 50.05], [1.7, 49.3], [1.5, 48.6], [1.0, 48.1], [1.4, 47.5], [1.8, 46.8], [2.3, 46.2], [2.5, 45.4], [2.0, 44.5], [1.2, 43.9], [0.8, 43.3], [-0.5, 43.0],
  [-1.8, 43.35], [-5.5, 43.6], [-6.5, 48.5], [-2.0, 49.9]]
const FRANCE_EAST = [[4.6, 43.4], [4.7, 44.2], [4.8, 45.0], [4.85, 45.7], [4.9, 46.3], [5.2, 46.8], [5.3, 47.6], [5.1, 48.3], [5.0, 49.0], [4.8, 49.8], [4.0, 50.0], [3.4, 50.5], [3.75, 51.0], [3.6, 51.45]]
const FRANCE = [[1.4, 50.05], [2.5, 51.2], ...FRANCE_EAST.slice().reverse(), [3.5, 42.95], [2.2, 42.85], [1.8, 42.6], [1.0, 42.7], [0.0, 42.75], [-0.5, 43.0],
  [0.8, 43.3], [1.2, 43.9], [2.0, 44.5], [2.5, 45.4], [2.3, 46.2], [1.8, 46.8], [1.4, 47.5], [1.0, 48.1], [1.5, 48.6], [1.7, 49.3]]
const PAPAL_NORTH = [[11.3, 42.4], [11.6, 42.5], [11.9, 42.9], [12.0, 43.3], [11.6, 43.6], [11.4, 44.0], [11.8, 44.3], [12.3, 44.8]]
const SICILY_FRONTIER = [[13.9, 42.9], [13.4, 42.7], [13.9, 42.0], [13.7, 41.6], [13.1, 41.2]]
const PAPAL_STATES = [...PAPAL_NORTH, [13.5, 44.5], [14.5, 43.2], ...SICILY_FRONTIER, [12.0, 41.4], [11.0, 42.2]]
const KINGDOM_SICILY = [...SICILY_FRONTIER.slice().reverse(), [15.5, 42.6], [19.2, 40.4], [17.6, 38.5], [15.7, 37.0], [15.2, 36.4], [12.2, 36.4], [12.0, 38.3], [13.5, 38.6], [12.8, 40.5], [13.0, 41.0]]
const HRE = [[3.6, 51.45], [4.0, 52.0], [4.5, 53.3], [7.0, 53.9], [8.6, 54.35], [9.8, 54.5], [10.9, 54.45], [11.5, 54.4], [13.0, 54.6], [15.0, 54.4], [16.3, 54.6],
  [16.0, 53.8], [15.4, 53.0], [14.6, 52.3], [14.8, 51.1], [15.4, 50.9], [16.2, 50.5], [16.9, 50.3], [17.7, 50.1], [18.2, 49.8], [18.4, 49.4], [17.9, 48.9], [17.1, 48.6],
  [17.0, 48.1], [16.6, 47.6], [16.3, 47.0], [16.1, 46.6], [15.6, 46.2], [15.2, 45.7], [14.5, 45.5], [14.0, 45.3], [13.4, 45.6], [12.6, 45.4], [12.5, 44.9],
  ...PAPAL_NORTH.slice().reverse(), [10.0, 42.5], [9.0, 43.9], [7.5, 43.6], [6.0, 42.9], ...FRANCE_EAST]
// Iberia c. 1200: the Christian–Almohad frontier runs roughly along the Tagus–Guadiana watershed.
const FRONTIER_1200 = [[-8.9, 38.4], [-8.0, 38.6], [-7.0, 38.9], [-6.5, 39.4], [-5.5, 39.7], [-4.5, 39.6], [-3.5, 39.7], [-2.5, 40.0], [-1.6, 40.2], [-1.0, 40.3], [-0.3, 40.5], [0.4, 40.6], [0.6, 40.5]]
const PORTUGAL = [[-10.0, 42.0], [-8.8, 41.95], [-8.2, 42.05], [-7.2, 41.9], [-6.5, 41.6], [-6.9, 41.0], [-6.9, 40.2], [-7.0, 39.6], [-7.0, 38.9], [-8.0, 38.6], [-8.9, 38.4], [-10.0, 38.3]]
const LEON = [[-10.0, 43.9], [-4.5, 43.9], [-4.5, 43.4], [-4.7, 42.8], [-5.0, 42.0], [-5.1, 41.2], [-5.3, 40.4], [-5.5, 39.7], [-6.5, 39.4], [-7.0, 39.6], [-6.9, 40.2], [-6.9, 41.0],
  [-6.5, 41.6], [-7.2, 41.9], [-8.2, 42.05], [-8.8, 41.95], [-10.0, 42.0]]
const CASTILE = [[-4.5, 43.9], [-1.6, 43.6], [-1.8, 43.3], [-2.0, 43.0], [-2.3, 42.6], [-2.0, 42.3], [-1.6, 42.0], [-1.9, 41.5], [-1.8, 40.8], [-1.6, 40.2], [-2.5, 40.0], [-3.5, 39.7],
  [-4.5, 39.6], [-5.5, 39.7], [-5.3, 40.4], [-5.1, 41.2], [-5.0, 42.0], [-4.7, 42.8], [-4.5, 43.4]]
const NAVARRE = [[-1.8, 43.3], [-1.4, 43.25], [-0.75, 42.95], [-0.8, 42.8], [-1.2, 42.4], [-1.6, 42.0], [-2.0, 42.3], [-2.3, 42.6], [-2.0, 43.0]]
const ARAGON = [[-0.75, 42.95], [0.0, 42.75], [1.0, 42.7], [1.8, 42.6], [2.2, 42.85], [3.5, 42.95], [3.8, 41.8], [1.0, 40.6], [0.6, 40.5], [0.4, 40.6], [-0.3, 40.5], [-1.0, 40.3],
  [-1.6, 40.2], [-1.8, 40.8], [-1.9, 41.5], [-1.6, 42.0], [-1.2, 42.4], [-0.8, 42.8]]
const ALMOHADS = [[-10.0, 38.3], ...FRONTIER_1200, [1.6, 39.5], [1.0, 38.0], [4.0, 37.3], [10.5, 37.4], [11.2, 36.5], [10.0, 34.0], [-2.0, 34.0], [-7.0, 34.0], [-10.0, 36.0]]

// Baltic crusader states c. 1300 (Teutonic Order in Prussia; Livonian Order and Danish Estonia to the north)
const PRUSSIA = [[18.6, 54.6], [21.1, 55.75], [22.0, 55.0], [22.8, 54.3], [21.0, 53.6], [19.5, 53.3], [18.6, 53.2], [18.5, 53.6], [18.9, 54.35]]
const LIVONIA = [[20.5, 56.0], [20.8, 57.6], [22.5, 59.6], [28.0, 59.5], [27.6, 58.0], [27.8, 57.3], [27.0, 56.2], [26.5, 55.7], [24.0, 56.0], [22.0, 56.1], [21.1, 56.0]]
const ICELAND = [[-25.0, 63.0], [-13.0, 63.0], [-13.0, 67.0], [-25.0, 67.0]]
const GREENLAND_SW = [[-52.5, 59.8], [-43.0, 59.5], [-43.0, 61.5], [-50.0, 65.0], [-54.5, 65.0], [-54.0, 63.0]]
const SICILY = [[12.2, 36.5], [15.7, 36.5], [15.8, 38.4], [12.2, 38.4]]

// Iberia: stages of the Reconquista
const IB_C1000 = [[-10.0, 44.2], [-1.6, 43.6], [-1.8, 43.35], [-1.4, 43.25], [-0.75, 42.95], [0.0, 42.75], [1.0, 42.7], [1.8, 42.6], [2.2, 42.85], [3.2, 42.45], [3.8, 42.4],
  [3.6, 41.0], [2.0, 41.3], [1.0, 42.2], [-0.2, 42.3], [-1.2, 42.4], [-1.8, 42.3], [-2.5, 41.9], [-3.7, 41.6], [-4.7, 41.6], [-6.0, 41.4], [-7.5, 41.2], [-8.6, 41.1], [-10.0, 41.1]]
const FRONTIER_1150 = [[-9.0, 38.5], [-7.5, 39.0], [-6.5, 39.6], [-5.0, 39.9], [-3.8, 39.7], [-2.8, 40.2], [-1.9, 40.8], [-1.0, 41.1], [0.4, 40.7], [0.9, 40.7]]
const IB_WON_1150 = [[-10.0, 41.1], [-8.6, 41.1], [-7.5, 41.2], [-6.0, 41.4], [-4.7, 41.6], [-3.7, 41.6], [-2.5, 41.9], [-1.8, 42.3], [-1.2, 42.4], [-0.2, 42.3], [1.0, 42.2], [2.0, 41.3],
  [3.0, 41.0], [1.2, 40.4], ...FRONTIER_1150.slice().reverse(), [-10.0, 38.5]]
const GRANADA_LINE = [[-1.75, 37.25], [-2.2, 37.4], [-2.8, 37.6], [-3.8, 37.5], [-4.6, 37.2], [-5.4, 36.7], [-5.7, 36.1]]
const IB_WON_1250 = [[-10.0, 38.5], ...FRONTIER_1150, [1.2, 40.4], [0.5, 38.5], [-1.0, 37.4], ...GRANADA_LINE, [-6.5, 36.0], [-9.5, 36.8], [-10.0, 37.5]]
const BALEARICS = [[1.1, 38.6], [4.5, 38.6], [4.5, 40.2], [1.1, 40.2]]
const GRANADA = [...GRANADA_LINE, [-5.5, 36.0], [-1.5, 36.5]]

// Crusader states c. 1140: Edessa, Antioch, Tripoli and the Kingdom of Jerusalem
const EDESSA = [[37.2, 37.0], [37.5, 37.9], [39.0, 38.0], [40.0, 37.3], [39.5, 36.6], [38.0, 36.5]]
const ANTIOCH = [[35.0, 35.5], [35.5, 36.8], [35.8, 36.9], [37.2, 37.0], [37.3, 36.4], [36.8, 35.6], [35.7, 35.2]]
const TRIPOLI = [[35.0, 35.3], [35.7, 35.2], [36.4, 35.0], [36.5, 34.3], [35.9, 34.1], [35.0, 34.2]]
const JERUSALEM = [[34.8, 34.2], [35.9, 34.1], [36.0, 33.3], [35.9, 32.7], [36.2, 32.0], [35.9, 31.0], [35.4, 29.6], [34.9, 29.5], [34.4, 31.0], [34.0, 31.4], [34.5, 32.5]]

// ---------- routes ----------
const SELJUQ_ADVANCE = [[44.0, 39.4], [39.5, 39.0], [35.5, 38.6], [32.49, 37.87], [30.6, 39.6]]
const NORMAN_ENGLAND = [[-0.1, 49.3], [0.3, 50.1], [0.57, 50.8]]
const HANSA_EAST = [[10.69, 53.87], [12.5, 54.5], [14.5, 55.1], [17.0, 56.6], [18.29, 57.64], [21.5, 58.9], [24.0, 59.6], [27.0, 60.0], [30.0, 59.95], [31.5, 59.9], [31.27, 58.52]]
const HANSA_BERGEN = [[10.69, 53.87], [11.2, 54.5], [12.75, 55.6], [12.2, 56.4], [11.5, 57.4], [11.0, 58.1], [9.5, 58.2], [7.0, 57.7], [5.0, 59.2], [5.32, 60.39]]
const HANSA_WEST = [[9.99, 53.55], [8.6, 54.0], [6.0, 53.8], [4.5, 53.2], [3.6, 52.0], [3.22, 51.3]]
const HANSA_LONDON = [[3.22, 51.21], [2.0, 51.45], [1.0, 51.5], [-0.12, 51.5]]
const HANSA_LAND = [[9.99, 53.55], [10.69, 53.87]]
const VENICE_EAST = [[12.33, 45.44], [13.5, 44.6], [16.5, 42.6], [19.0, 40.0], [21.0, 37.0], [22.8, 36.2], [24.5, 37.5], [26.0, 39.6], [26.4, 40.2], [28.98, 41.01], [29.4, 41.4],
  [31.0, 42.6], [33.5, 44.0], [35.38, 45.03], [36.5, 45.3], [37.8, 46.4], [39.42, 47.1]]
const VENICE_EGYPT = [[22.8, 36.2], [26.0, 34.6], [29.92, 31.2]]
const GENOA_SEA = [[8.93, 44.41], [8.0, 42.8], [4.5, 40.5], [0.5, 38.5], [-2.5, 36.5], [-5.6, 35.95], [-9.3, 36.9], [-9.8, 39.0], [-9.6, 43.2], [-5.5, 48.3], [-2.0, 49.9], [1.4, 50.6], [3.22, 51.21]]
const GENOA_EAST = [[8.93, 44.41], [9.8, 42.5], [11.5, 40.0], [14.5, 38.6], [15.6, 38.1], [16.5, 37.5], [21.0, 37.0]]
const OVERLAND = [[9.19, 45.46], [7.4, 45.7], [6.4, 46.4], [5.0, 47.3], [4.07, 48.3], [3.4, 49.6], [3.22, 51.21]]
const FIRST_CRUSADE = [[3.08, 45.78], [7.6, 47.6], [11.0, 48.4], [16.37, 48.2], [19.04, 47.5], [20.46, 44.82], [21.9, 43.3], [23.32, 42.7], [26.56, 41.68], [28.98, 41.01],
  [29.72, 40.43], [30.52, 39.78], [32.49, 37.87], [35.0, 37.4], [36.16, 36.2], [35.84, 34.44], [35.08, 32.93], [35.22, 31.78]]
const FOURTH_CRUSADE = [[12.33, 45.44], [14.0, 44.6], [15.23, 44.12], [15.8, 43.4], [17.0, 42.7], [18.4, 41.9], [19.0, 40.7], [19.3, 39.8], [20.5, 38.0], [21.0, 36.8], [22.3, 36.2], [23.4, 36.3], [24.0, 37.6], [25.0, 39.0], [26.0, 40.0], [26.4, 40.2], [28.98, 41.01]]
const NORSE = [[5.32, 60.39], [-1.0, 61.0], [-7.0, 62.0], [-14.0, 63.6], [-21.9, 64.15], [-28.0, 64.5], [-38.0, 63.5], [-45.5, 61.15], [-50.0, 59.0], [-55.53, 51.6]]
const BALTIC_CRUSADE = [[13.4, 52.5], [16.5, 53.6], [19.5, 54.1]]
const LIVONIAN_CRUSADE = [[10.69, 53.87], [14.5, 55.0], [19.0, 56.4], [23.8, 57.1]]

// ---------- map steps (the animated map) ----------
// view: [lonMin, latMin, lonMax, latMax] to zoom in, or null for the whole map.
const C = { red: '#B5482A', gold: '#C99A3D', blue: '#4E7FA6', purple: '#6E5A8F', green: '#4E7A55', sea: '#2E6E9A', brown: '#7A3B22' }
const STEPS = [
  {
    title: 'Byzantium under pressure, 1071–1100', chip: 'Byzantium',
    caption: 'After the Seljuq Turks crushed the Byzantine army at Manzikert (1071), they overran the Anatolian plateau, the empire’s grain land and recruiting ground. Normans took the last Byzantine towns in southern Italy (Bari, 1071).',
    base: 'mediterranean', view: [12, 29.5, 47, 47],
    lands: [{ label: 'Byzantine Empire', color: C.blue, polys: [BYZ_1100, CYPRUS], at: [24.2, 42.4] }, { label: 'Seljuq Turks', color: C.green, polys: [SELJUQ_ANATOLIA], at: [38.6, 40.8] },
      { label: 'Normans', color: C.red, polys: [NORMAN_ITALY], at: [15.4, 40.2] }],
    routes: [{ pts: SELJUQ_ADVANCE, color: C.green, label: 'Seljuq advance', labelAt: [38.0, 37.9], arrow: true }],
    tags: [{ text: 'lost grain lands', at: [33.6, 39.6] }, { text: 'themes decay', at: [24.0, 39.0] }],
    cities: ['constantinople', 'nicaea', 'manzikert', 'konya', 'antioch', 'jerusalem', 'bari', 'palermo', 'rome', 'venice'],
  },
  {
    title: 'Regional states, c. 1200', chip: 'States c. 1200',
    caption: 'No single empire ruled the west. The Holy Roman Empire, Capetian France, Norman-Angevin England, the Papal States, the Norman kingdom of Sicily and Christian kingdoms in Iberia all competed. English kings also held western France.',
    view: [-11, 35, 26, 58.5],
    lands: [{ label: 'England', color: C.red, polys: [ENGLAND], at: [-1.6, 52.6] }, { label: 'English lands', color: C.red, polys: [ANGEVIN_FRANCE], at: [0.2, 46.0] },
      { label: 'France', color: C.blue, polys: [FRANCE], at: [3.4, 47.3] }, { label: 'Holy Roman Empire', color: C.gold, polys: [HRE], at: [11.0, 50.6] },
      { label: 'Papal States', color: C.purple, polys: [PAPAL_STATES], at: [12.9, 43.3] }, { label: 'Kingdom of Sicily', color: C.brown, polys: [KINGDOM_SICILY], at: [16.0, 39.4] },
      { label: 'Portugal', color: C.sea, polys: [PORTUGAL], at: [-8.2, 40.0] }, { label: 'León', color: C.red, polys: [LEON], at: [-6.4, 42.6] },
      { label: 'Castile', color: C.gold, polys: [CASTILE], at: [-3.4, 41.3] }, { label: '', color: C.brown, polys: [NAVARRE] },
      { label: 'Aragon', color: C.purple, polys: [ARAGON], at: [0.0, 41.7] }, { label: 'Almohads', color: C.green, polys: [ALMOHADS], at: [-4.6, 37.6] }],
    routes: [{ pts: NORMAN_ENGLAND, color: C.red, label: 'Normans, 1066', labelAt: [-4.2, 49.4], arrow: true, dashed: true }],
    tags: [{ text: 'Lombard cities', at: [10.2, 44.7] }],
    cities: ['london', 'hastings', 'paris', 'milan', 'venice', 'rome', 'palermo', 'toledo'],
  },
  {
    title: 'Towns and trade, c. 1300', chip: 'Trade',
    caption: 'Two trade zones met in Flanders and at the Champagne fairs. In the north the Hanseatic League (blue) moved grain, fish, furs and timber; in the south Venice and Genoa (red) brought silk and spices from Egypt and the Black Sea. Overland routes (brown) crossed the Alps.',
    view: [-11, 30, 42, 62],
    routes: [{ pts: HANSA_EAST, color: C.sea, dashed: true, label: 'Hanseatic League', labelAt: [21.0, 56.6] }, { pts: HANSA_BERGEN, color: C.sea, dashed: true }, { pts: HANSA_WEST, color: C.sea, dashed: true },
      { pts: HANSA_LONDON, color: C.sea, dashed: true }, { pts: HANSA_LAND, color: C.brown },
      { pts: VENICE_EAST, color: C.red, dashed: true, label: 'Venice', labelAt: [18.2, 41.3] }, { pts: VENICE_EGYPT, color: C.red, dashed: true }, { pts: GENOA_EAST, color: C.red, dashed: true },
      { pts: GENOA_SEA, color: C.red, dashed: true, label: 'Genoa to Bruges, 1277', labelAt: [-5.6, 46.6] }, { pts: OVERLAND, color: C.brown, label: 'Overland', labelAt: [7.8, 46.7] }],
    tags: [{ text: 'wool', at: [-2.6, 54.3] }, { text: 'woolen cloth', at: [2.6, 52.6] }, { text: 'Champagne fairs', at: [8.8, 48.9] }, { text: 'furs · wax', at: [33.5, 57.4] },
      { text: 'herring · grain', at: [17.2, 55.6] }, { text: 'dried fish', at: [8.0, 61.4] }, { text: 'timber · amber', at: [21.5, 53.8] }, { text: 'wine', at: [0.6, 44.2] },
      { text: 'grain · slaves', at: [33.4, 47.3] }, { text: 'silk · spices', at: [33.0, 33.3] }, { text: 'silk · spices', at: [34.2, 42.2] }],
    cities: ['lubeck', 'hamburg', 'bruges', 'london', 'novgorod', 'bergen', 'visby', 'troyes', 'milan', 'venice', 'genoa', 'constantinople', 'caffa', 'tana', 'alexandria'],
  },
  {
    title: 'Christendom expands, 870–1300', chip: 'Expansion',
    caption: 'Norse sailors settled Iceland and Greenland and briefly reached Vinland (Newfoundland). Normans took Sicily from Muslim rulers (1061–1091). Crusading knights conquered pagan peoples around the Baltic, and the Reconquista pushed south in Spain.',
    view: [-60, 36, 34, 72],
    lands: [{ label: 'Norse settlers', color: C.sea, polys: [ICELAND, GREENLAND_SW], at: [-34.0, 67.0] }, { label: 'Baltic crusades', color: C.gold, polys: [PRUSSIA, LIVONIA], at: [22.0, 51.2] },
      { label: 'Norman Sicily', color: C.red, polys: [SICILY], at: [14.0, 35.3] }, { label: 'Reconquista', color: C.purple, polys: [IB_WON_1150, IB_WON_1250, BALEARICS], at: [-4.0, 36.6] }],
    routes: [{ pts: NORSE, color: C.sea, dashed: true, arrow: true, label: 'Norse voyages', labelAt: [-30.0, 64.5] }, { pts: BALTIC_CRUSADE, color: C.gold, arrow: true },
      { pts: LIVONIAN_CRUSADE, color: C.gold, arrow: true, dashed: true }],
    tags: [{ text: 'Scandinavian kings convert, c. 960–1100', at: [14.0, 66.5] }],
    cities: ['vinland', 'greenland', 'iceland', 'trondheim', 'lubeck', 'riga', 'palermo', 'toledo', 'rome'],
  },
  {
    title: 'The Reconquista, 1000–1492', chip: 'Reconquista',
    caption: 'Christian kingdoms grew out of the mountains of the north. Toledo fell in 1085; after Las Navas de Tolosa (1212) Córdoba and Seville followed. By 1250 only the emirate of Granada was left, and it held out until 1492.',
    base: 'mediterranean', view: [-10.5, 35.3, 4.5, 44.2],
    lands: [{ label: 'Christian c. 1000', color: C.blue, polys: [IB_C1000], at: [-5.0, 42.8] }, { label: 'Won by 1150', color: C.purple, polys: [IB_WON_1150], at: [-3.4, 40.7] },
      { label: 'Won by 1250', color: C.red, polys: [IB_WON_1250, BALEARICS], at: [-6.6, 38.4] }, { label: 'Granada', color: C.green, polys: [GRANADA], at: [-3.6, 36.6] }],
    cities: ['lisbon', 'toledo', 'zaragoza', 'valencia', 'lasNavas', 'cordoba', 'seville', 'granada'],
  },
  {
    title: 'The Crusades, 1096–1204', chip: 'Crusades',
    caption: 'Pope Urban II called the First Crusade at Clermont in 1095. Crusaders marched through Constantinople and took Jerusalem in 1099, founding four crusader states. The Fourth Crusade (dashed) sailed from Venice and sacked Constantinople in 1204.',
    base: 'mediterranean', view: [-1, 29.5, 46, 50],
    lands: [{ label: 'Byzantine Empire', color: C.blue, polys: [BYZ_1100, CYPRUS], faint: true }, { label: 'Seljuq Turks', color: C.green, polys: [SELJUQ_ANATOLIA], faint: true },
      { label: 'Crusader states', color: C.red, polys: [EDESSA, ANTIOCH, TRIPOLI, JERUSALEM], at: [39.6, 34.4] }],
    routes: [{ pts: FIRST_CRUSADE, color: C.red, arrow: true, label: 'First Crusade, 1096–99', labelAt: [12.0, 49.0] },
      { pts: FOURTH_CRUSADE, color: C.purple, arrow: true, dashed: true, label: 'Fourth Crusade, 1202–04', labelAt: [16.8, 39.0] }],
    tags: [{ text: 'Saladin retakes Jerusalem, 1187', at: [28.0, 32.6] }],
    cities: ['clermont', 'venice', 'zara', 'rome', 'constantinople', 'nicaea', 'konya', 'antioch', 'edessa', 'acre', 'jerusalem', 'damascus', 'cairo'],
  },
]

// base: the base map in src/geo; aspect: height / width of the map frame.
export default { base: 'world', aspect: 0.62, cities: CITIES, steps: STEPS }
