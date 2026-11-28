// Chapter 11 map layers (longitude, latitude). Territory outlines are drawn loosely over
// the sea: the map clips every territory to the coastline, so only land frontiers need care.
// Sources for frontiers: standard historical atlases (Rhine–Danube limes, Hadrian's Wall line, Trajan's provinces).

const CITIES = {
  rome: { name: 'Rome', at: [12.5, 41.9], big: true },
  carthage: { name: 'Carthage', at: [10.32, 36.85], big: true },
  alexandria: { name: 'Alexandria', at: [29.9, 31.2], big: true },
  athens: { name: 'Athens', at: [23.73, 37.98] },
  corinth: { name: 'Corinth', at: [22.88, 37.9], side: 'left' },
  jerusalem: { name: 'Jerusalem', at: [35.22, 31.78], side: 'below' },
  antioch: { name: 'Antioch', at: [36.15, 36.2] },
  tarsus: { name: 'Tarsus', at: [34.9, 36.92] },
  ephesus: { name: 'Ephesus', at: [27.34, 37.94] },
  philippi: { name: 'Philippi', at: [24.28, 41.01] },
  thessalonica: { name: 'Thessalonica', at: [22.94, 40.64], side: 'left' },
  byzantium: { name: 'Byzantium', at: [28.98, 41.01] },
  syracuse: { name: 'Syracuse', at: [15.29, 37.07] },
  carthagoNova: { name: 'New Carthage', at: [-0.98, 37.6] },
  massilia: { name: 'Massilia', at: [5.37, 43.3] },
  lugdunum: { name: 'Lugdunum', at: [4.83, 45.76] },
  londinium: { name: 'Londinium', at: [-0.12, 51.5] },
  colonia: { name: 'Colonia', at: [6.95, 50.94] },
  gades: { name: 'Gades', at: [-6.29, 36.53] },
  capua: { name: 'Capua', at: [14.25, 41.08], side: 'below' },
  brundisium: { name: 'Brundisium', at: [17.94, 40.64] },
  puteoli: { name: 'Puteoli', at: [14.12, 40.82] },
  lepcis: { name: 'Lepcis Magna', at: [14.29, 32.64] },
  damascus: { name: 'Damascus', at: [36.3, 33.5] },
  ctesiphon: { name: 'Ctesiphon', at: [44.58, 33.09] },
  berenice: { name: 'Berenice', at: [35.47, 23.91] },
  cannae: { name: 'Cannae', at: [16.13, 41.3] },
  zama: { name: 'Zama', at: [9.4, 36.3], side: 'left' },
  actium: { name: 'Actium', at: [20.75, 38.95] },
  capernaum: { name: 'Capernaum', at: [35.57, 32.88], side: 'right' },
  ostia: { name: 'Ostia', at: [12.29, 41.75], side: 'left' },
}

// ---------- territories ----------
const ETRURIA = [[7.6, 44.0], [7.4, 45.6], [9.5, 46.0], [12.4, 45.7], [12.7, 44.4], [12.4, 43.5], [12.3, 42.2], [11.2, 42.0], [9.9, 43.6]]
const CAMPANIA = [[13.6, 41.4], [14.9, 41.3], [15.0, 40.4], [13.7, 40.5]]
const LATIUM = [[12.0, 42.15], [13.1, 42.1], [13.7, 41.45], [12.7, 41.2], [11.95, 41.7]]
const MAGNA_GRAECIA = [[15.4, 40.3], [16.8, 40.7], [18.7, 40.2], [17.2, 38.6], [16.0, 37.7], [15.6, 37.88], [15.68, 38.4], [15.5, 39.5]]
const EAST_SICILY = [[14.3, 38.4], [15.66, 38.4], [15.66, 36.4], [14.3, 36.4]]
const WEST_SICILY = [[12.0, 38.4], [14.3, 38.4], [14.3, 36.4], [12.0, 36.9]]
const SICILY = [[12.0, 38.4], [15.66, 38.4], [15.66, 36.4], [12.0, 36.6]]
const SARDINIA_CORSICA = [[7.9, 38.7], [10.0, 38.7], [10.0, 43.2], [7.9, 43.2]]
const AFRICA_COAST = [[-6.4, 35.3], [-6.4, 36.1], [-1.0, 36.2], [4.0, 37.2], [9.5, 37.6], [11.5, 37.2], [11.4, 35.2], [12.6, 33.6], [15.7, 32.6], [15.7, 31.6], [12.0, 32.4], [10.0, 33.4], [8.6, 34.6], [3.0, 35.4], [-2.0, 34.8]]
const SPAIN_COAST = [[-6.6, 36.0], [-6.2, 37.2], [-2.6, 37.5], [-0.9, 38.4], [0.4, 38.8], [-0.2, 37.6], [-2.0, 36.4], [-5.3, 35.8]]
const BARCID_SPAIN = [[-7.6, 36.0], [-7.2, 38.4], [-4.5, 40.0], [-1.2, 40.9], [0.9, 40.8], [0.6, 39.6], [-0.4, 38.3], [-2.0, 36.4], [-5.3, 35.8]]
const BALEARICS = [[1.0, 38.5], [4.5, 38.5], [4.5, 40.2], [1.0, 40.2]]
const ROMAN_ITALY = [[9.75, 44.15], [12.8, 44.3], [15.0, 43.5], [16.1, 42.6], [17.3, 41.8], [18.3, 41.0], [19.0, 40.3], [18.8, 39.6], [17.5, 38.8], [16.3, 37.7], [15.75, 37.88], [15.7, 38.33], [15.55, 38.75], [15.0, 40.0], [13.5, 40.6], [11.8, 41.8], [10.5, 42.9], [10.0, 43.8]]
const CISALPINE = [[6.6, 44.0], [6.8, 46.1], [10.0, 46.6], [13.8, 46.5], [13.8, 45.6], [12.8, 44.3], [9.75, 44.15], [7.6, 43.8]]
const HISPANIA_146 = [[-7.5, 36.0], [-6.6, 37.9], [-4.5, 38.6], [-2.5, 40.0], [-2.2, 41.5], [-1.5, 42.6], [0.5, 42.8], [3.3, 42.5], [3.6, 41.5], [0.6, 39.6], [-0.4, 38.3], [-2.0, 36.4], [-5.3, 35.8]]
const AFRICA_146 = [[8.4, 37.3], [11.4, 37.4], [11.3, 35.1], [10.3, 34.9], [8.6, 35.7]]
const GREECE_146 = [[19.3, 41.5], [20.8, 42.2], [23.2, 42.0], [25.2, 41.3], [25.2, 40.6], [24.2, 38.0], [23.5, 36.3], [21.5, 36.6], [20.0, 39.2], [19.3, 40.0]]
const EMPIRE_117 = [
  [-10.5, 33.9], [-10.5, 44.5], [-6.0, 48.5], [-6.6, 50.0], [-5.6, 51.6], [-5.1, 53.5], [-4.7, 54.5], [-3.6, 54.6], [-3.2, 55.0], [-1.4, 55.05], [0.5, 55.0],
  [3.5, 52.6], [4.4, 52.25], [5.8, 51.85], [6.45, 51.66], [6.95, 50.94], [7.33, 50.5], [8.5, 50.35], [8.95, 50.35], [9.15, 50.0], [9.26, 49.7], [9.6, 49.2], [9.7, 48.8], [10.6, 48.95], [11.78, 48.85],
  [12.1, 49.02], [13.45, 48.57], [15.0, 48.3], [16.37, 48.2], [16.9, 48.1], [17.9, 47.75], [19.04, 47.6], [18.9, 46.0], [19.3, 45.2], [20.46, 44.82],
  [20.6, 45.4], [21.3, 46.2], [22.4, 47.0], [23.2, 47.3], [24.5, 47.2], [25.3, 46.4], [25.7, 45.3], [24.9, 43.75], [25.5, 43.65], [27.0, 44.1], [28.0, 44.7], [28.2, 45.3], [29.8, 45.2],
  [30.5, 43.0], [35.0, 43.0], [41.5, 41.6], [44.5, 41.2], [46.3, 39.8], [46.0, 38.5], [45.0, 35.5], [47.5, 32.5], [48.6, 30.0], [47.8, 29.6], [44.0, 31.0], [39.0, 30.0], [37.8, 27.0], [36.4, 27.4],
  [35.9, 23.4], [33.0, 23.2], [30.5, 24.8], [28.5, 26.5], [25.0, 29.0], [25.0, 30.3], [20.0, 30.0], [19.0, 30.3], [15.5, 30.8], [12.0, 30.4], [10.0, 32.2], [8.5, 33.5], [6.0, 34.8], [3.0, 35.1],
  [1.0, 35.5], [-1.5, 34.7], [-4.0, 34.0], [-6.5, 33.8], [-7.5, 33.9],
]

// ---------- routes ----------
const HANNIBAL = [[-0.98, 37.6], [-0.27, 39.68], [0.6, 40.8], [2.5, 42.4], [4.7, 43.9], [6.8, 45.2], [9.6, 45.0], [12.1, 43.15], [16.13, 41.3]]
const SCIPIO = [[12.5, 41.9], [11.0, 39.5], [9.8, 37.4], [9.4, 36.3]]
const ROADS = [
  [[12.5, 41.9], [14.25, 41.08], [17.94, 40.64]],
  [[19.45, 41.32], [22.94, 40.64], [28.98, 41.01]],
  [[12.5, 41.9], [10.4, 43.7], [8.93, 44.4], [5.37, 43.3], [3.0, 43.18], [1.25, 41.12], [-0.98, 37.6], [-6.29, 36.53]],
  [[5.37, 43.3], [4.83, 45.76], [6.95, 50.94]],
  [[4.83, 45.76], [1.6, 50.7]], [[1.3, 51.1], [-0.12, 51.5]],
  [[28.98, 41.01], [32.86, 39.93], [34.9, 36.92], [36.15, 36.2], [36.3, 33.5], [35.22, 31.78], [34.45, 31.5], [32.57, 31.04], [29.9, 31.2]],
  [[29.9, 31.2], [21.86, 32.82], [14.29, 32.64], [10.32, 36.85]],
  [[12.5, 41.9], [12.3, 44.0], [13.7, 45.6], [16.37, 48.2]],
]
const SEA_LANES = [
  [[29.9, 31.2], [24.5, 34.6], [15.3, 36.6], [14.12, 40.82]],
  [[10.32, 36.85], [11.2, 39.5], [12.29, 41.75]],
  [[-6.29, 36.53], [1.0, 38.2], [8.0, 39.5], [12.29, 41.75]],
  [[32.6, 31.25], [33.5, 28.0], [35.47, 23.91]],
]
const RED_SEA = [[35.47, 23.91], [40.0, 22.6], [49.8, 22.1]]
const PAUL_2 = [[36.15, 36.2], [34.9, 36.92], [32.3, 37.6], [26.16, 39.75], [24.28, 41.01], [22.94, 40.64], [23.73, 37.98], [22.88, 37.9], [27.34, 37.94], [34.89, 32.5], [35.22, 31.78], [36.15, 36.2]]
const PAUL_ROME = [[34.89, 32.5], [29.98, 36.26], [24.8, 34.93], [14.4, 35.9], [15.29, 37.07], [15.65, 38.1], [14.12, 40.82], [12.5, 41.9]]

// ---------- map steps (the animated map) ----------
// view: [lonMin, latMin, lonMax, latMax] to zoom in, or null for the whole map.
const C = { rome: '#B5482A', etr: '#C99A3D', greek: '#4E7FA6', carth: '#6E5A8F', empire: '#B5482A' }
const STEPS = [
  {
    title: 'Italy, c. 600 BCE', caption: 'Rome is one small city in Latium. The Etruscans control the north and Campania; Greek colonies fill the south and eastern Sicily; Carthage holds western Sicily and North Africa.',
    view: [4, 33, 21, 47.5],
    lands: [{ label: 'Etruscans', color: C.etr, polys: [ETRURIA, CAMPANIA], at: [10.9, 43.6] }, { label: 'Rome & Latium', color: C.rome, polys: [LATIUM], at: [11.4, 41.0] },
      { label: 'Greek colonies', color: C.greek, polys: [MAGNA_GRAECIA, EAST_SICILY], at: [16.9, 39.4] }, { label: 'Carthage', color: C.carth, polys: [WEST_SICILY, AFRICA_COAST], at: [8.0, 34.6] }],
    cities: ['rome', 'carthage', 'syracuse', 'capua'],
  },
  {
    title: 'Rome unites Italy, 264 BCE', caption: 'By force and by offering allies tax breaks, trade rights and citizenship, the Republic controls the whole peninsula south of the Po valley.',
    view: [4, 33, 21, 47.5],
    lands: [{ label: 'Roman Italy', color: C.rome, polys: [ROMAN_ITALY], at: [16.2, 40.4] }, { label: 'Carthage', color: C.carth, polys: [WEST_SICILY, SARDINIA_CORSICA, AFRICA_COAST, SPAIN_COAST], at: [6.0, 34.8] }],
    cities: ['rome', 'carthage', 'syracuse'],
  },
  {
    title: 'The Second Punic War, 218–202 BCE', caption: 'Hannibal marches from Spain over the Alps and crushes Rome at Cannae (216 BCE). Rome refuses to quit, invades Africa, and wins at Zama (202 BCE).',
    view: [-8, 33, 19, 47],
    lands: [{ label: 'Rome', color: C.rome, polys: [ROMAN_ITALY, SICILY, SARDINIA_CORSICA], at: [16.2, 40.4] }, { label: 'Carthage', color: C.carth, polys: [AFRICA_COAST, BARCID_SPAIN, BALEARICS], at: [-3.4, 38.6] }],
    routes: [{ pts: HANNIBAL, color: C.carth, label: 'Hannibal, 218 BCE', arrow: true }, { pts: SCIPIO, color: C.rome, label: 'Scipio, 204 BCE', arrow: true, dashed: true }],
    cities: ['rome', 'carthage', 'carthagoNova', 'cannae', 'zama'],
  },
  {
    title: 'The Republic in 146 BCE', caption: 'After three Punic Wars, Carthage is destroyed. Rome also takes Macedonia and Greece. It now dominates the Mediterranean.',
    view: [-11, 30, 30, 47.5],
    lands: [{ label: 'Roman Republic', color: C.rome, polys: [ROMAN_ITALY, CISALPINE, SICILY, SARDINIA_CORSICA, HISPANIA_146, AFRICA_146, GREECE_146], at: [12.5, 43.0] }],
    cities: ['rome', 'carthage', 'athens', 'corinth', 'alexandria'],
  },
  {
    title: 'The Roman Empire, c. 117 CE', caption: 'Under Trajan the empire reaches its largest size: from Britain to Egypt and from Spain to Mesopotamia, wrapped around the whole Mediterranean, "our sea."',
    view: null,
    lands: [{ label: 'Roman Empire', color: C.empire, polys: [EMPIRE_117], at: [19.0, 44.6] }],
    cities: ['rome', 'carthage', 'alexandria', 'athens', 'byzantium', 'antioch', 'jerusalem', 'londinium', 'colonia', 'lugdunum', 'gades'],
  },
  {
    title: 'Pax Romana: roads and sea lanes', caption: 'Peace let goods move. Paved roads (solid) and sea lanes (dashed) carried grain from Egypt and Africa, wine and olive oil, and metals. Ships from Red Sea ports sailed on to India.',
    view: null,
    lands: [{ label: '', color: C.empire, polys: [EMPIRE_117], faint: true }],
    routes: [...ROADS.map(pts => ({ pts, color: '#7A3B22' })), ...SEA_LANES.map(pts => ({ pts, color: '#2E6E9A', dashed: true })), { pts: RED_SEA, color: '#2E6E9A', dashed: true, arrow: true, label: 'to India' }],
    tags: [{ text: 'grain', at: [30.8, 28.0] }, { text: 'grain', at: [9.6, 35.2] }, { text: 'olive oil · silver', at: [-4.6, 38.6] }, { text: 'wine', at: [12.8, 43.8] }, { text: 'tin', at: [-3.0, 51.0] }, { text: 'glass · cloth', at: [37.6, 34.8] }, { text: 'pepper · cotton · gems', at: [41.5, 25.4] }],
    cities: ['rome', 'alexandria', 'carthage', 'antioch', 'byzantium', 'gades', 'londinium', 'berenice'],
  },
  {
    title: 'Christianity spreads, c. 30–60 CE', caption: 'From Judea, Paul of Tarsus carried the new faith to cities across the empire (his second journey, solid). He finally reached Rome as a prisoner (dashed). Roads, sea lanes and the common Greek language helped.',
    view: [10, 29.5, 38.5, 43.5],
    lands: [{ label: '', color: C.empire, polys: [EMPIRE_117], faint: true }],
    routes: [{ pts: PAUL_2, color: '#2E6E9A', arrow: true, label: 'Paul, 2nd journey', labelAt: [30.0, 39.4] }, { pts: PAUL_ROME, color: '#B5482A', dashed: true, arrow: true, label: 'To Rome, c. 60' }],
    cities: ['jerusalem', 'capernaum', 'antioch', 'tarsus', 'ephesus', 'philippi', 'thessalonica', 'athens', 'corinth', 'rome', 'alexandria'],
  },
]

// base: the base map in src/geo; aspect: height / width of the map frame.
export default { base: 'mediterranean', aspect: 0.749, cities: CITIES, steps: STEPS }
