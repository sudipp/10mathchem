// Chapter 10 map layers (longitude, latitude). Territory outlines are drawn loosely over
// the sea: the map clips every territory to the coastline, so only land frontiers need care.
// Sources for frontiers: standard historical atlases (Aegean Bronze Age, Greek colonization, Persian Wars,
// Delian League, Alexander's empire 323 BCE, the Hellenistic kingdoms c. 275 BCE).

const CITIES = {
  knossos: { name: 'Knossos', at: [25.16, 35.3], big: true },
  mycenae: { name: 'Mycenae', at: [22.76, 37.73], big: true },
  pylos: { name: 'Pylos', at: [21.69, 36.92], side: 'left' },
  troy: { name: 'Troy', at: [26.24, 39.96] },
  thera: { name: 'Thera', at: [25.43, 36.4] },
  athens: { name: 'Athens', at: [23.73, 37.98], big: true },
  sparta: { name: 'Sparta', at: [22.43, 37.07], big: true },
  corinth: { name: 'Corinth', at: [22.93, 37.94], side: 'left' },
  thebes: { name: 'Thebes', at: [23.32, 38.32] },
  argos: { name: 'Argos', at: [22.73, 37.63], side: 'left' },
  delphi: { name: 'Delphi', at: [22.5, 38.48], side: 'left' },
  olympia: { name: 'Olympia', at: [21.63, 37.64], side: 'left' },
  miletus: { name: 'Miletus', at: [27.28, 37.53] },
  syracuse: { name: 'Syracuse', at: [15.29, 37.07] },
  neapolis: { name: 'Neapolis (Naples)', at: [14.25, 40.85], side: 'left' },
  massalia: { name: 'Massalia', at: [5.37, 43.3] },
  emporion: { name: 'Emporion', at: [3.12, 42.13], side: 'left' },
  byzantium: { name: 'Byzantium', at: [28.98, 41.01] },
  olbia: { name: 'Olbia', at: [31.9, 46.69] },
  chersonesus: { name: 'Chersonesus', at: [33.49, 44.61], side: 'below' },
  sinope: { name: 'Sinope', at: [35.15, 42.02] },
  cyrene: { name: 'Cyrene', at: [21.86, 32.82] },
  naucratis: { name: 'Naucratis', at: [30.6, 30.9] },
  carthage: { name: 'Carthage', at: [10.32, 36.85] },
  marathon: { name: 'Marathon', at: [23.97, 38.15] },
  thermopylae: { name: 'Thermopylae', at: [22.53, 38.8], side: 'left' },
  salamis: { name: 'Salamis', at: [23.47, 37.95], side: 'below' },
  plataea: { name: 'Plataea', at: [23.27, 38.22], side: 'left' },
  sardis: { name: 'Sardis', at: [28.04, 38.49] },
  pella: { name: 'Pella', at: [22.52, 40.76], big: true },
  // Southwest, Central and South Asia (world base map)
  alexandria: { name: 'Alexandria', at: [29.9, 31.2], big: true },
  issus: { name: 'Issus', at: [36.2, 36.85] },
  gaugamela: { name: 'Gaugamela', at: [43.45, 36.36] },
  babylon: { name: 'Babylon', at: [44.42, 32.54], big: true },
  persepolis: { name: 'Persepolis', at: [52.89, 29.94] },
  susa: { name: 'Susa', at: [48.25, 32.19] },
  bactra: { name: 'Bactra', at: [66.9, 36.76], side: 'below' },
  maracanda: { name: 'Maracanda', at: [66.97, 39.65] },
  taxila: { name: 'Taxila', at: [72.83, 33.75] },
  antioch: { name: 'Antioch', at: [36.15, 36.2], big: true },
  seleucia: { name: 'Seleucia', at: [44.52, 33.1] },
  rhodes: { name: 'Rhodes', at: [28.22, 36.43] },
  pergamon: { name: 'Pergamon', at: [27.18, 39.13] },
  aikhanoum: { name: 'Ai-Khanoum', at: [69.42, 37.17] },
  kandahar: { name: 'Kandahar', at: [65.71, 31.61], side: 'below' },
  pataliputra: { name: 'Pataliputra', at: [85.14, 25.61] },
}

// ---------- territories (Aegean and Mediterranean) ----------
const CRETE = [[23.3, 35.0], [23.3, 35.8], [26.5, 35.8], [26.5, 34.8]]
const MYCENAEAN = [[20.8, 37.0], [21.0, 38.6], [21.5, 39.5], [22.0, 40.2], [23.0, 40.3], [23.5, 39.3], [24.6, 38.4], [25.6, 37.2], [24.0, 36.3], [22.5, 36.2], [21.5, 36.6]]
const LACONIA_MESSENIA = [[21.55, 37.45], [21.9, 37.6], [22.35, 37.5], [22.75, 37.4], [23.0, 37.2], [23.3, 36.4], [22.3, 36.3], [21.5, 36.7]]
const ATTICA = [[23.15, 37.95], [23.3, 38.3], [23.7, 38.35], [24.15, 38.2], [24.15, 37.6], [23.9, 37.55]]
const GREEK_HOMELAND = [[19.4, 40.0], [20.4, 41.0], [23.3, 41.0], [24.8, 40.7], [26.8, 40.3], [26.6, 37.6], [26.6, 35.0], [23.2, 35.0], [21.0, 36.4]]
const IONIA = [[26.0, 36.6], [26.0, 40.3], [27.0, 40.3], [27.2, 39.0], [27.6, 38.0], [27.8, 37.0]]
const MAGNA_GRAECIA = [[14.6, 41.2], [15.4, 40.3], [16.8, 40.7], [18.7, 40.2], [17.2, 38.6], [16.0, 37.7], [15.6, 37.88], [15.68, 38.4], [15.5, 39.5], [14.2, 40.3], [13.9, 40.9]]
const EAST_SICILY = [[14.3, 38.4], [15.66, 38.4], [15.66, 36.4], [14.3, 36.4]]
const MASSALIA_COAST = [[2.6, 41.7], [3.4, 43.5], [5.0, 43.8], [7.6, 44.0], [7.6, 43.1], [3.4, 42.2], [3.3, 41.6]]
const CYRENAICA = [[19.8, 32.0], [20.0, 33.2], [23.6, 33.2], [23.6, 32.0]]
const NAUCRATIS = [[30.1, 30.6], [30.1, 31.2], [31.0, 31.2], [31.0, 30.6]]
const BLACK_SEA_WEST = [[27.4, 42.0], [27.9, 44.6], [29.2, 45.1], [29.2, 42.0]]
const BLACK_SEA_NORTH = [[30.4, 46.0], [30.4, 47.0], [32.6, 47.0], [32.6, 45.9]]
const CRIMEA = [[32.4, 44.3], [33.6, 45.1], [36.7, 45.6], [37.0, 45.0], [33.8, 44.3]]
const BLACK_SEA_SOUTH = [[29.0, 40.9], [29.0, 41.3], [33.0, 42.1], [35.2, 42.2], [39.8, 41.2], [39.8, 40.8], [35.2, 41.5], [33.0, 41.4]]
const PHOENICIAN_WEST = [[8.4, 37.4], [11.4, 37.5], [11.2, 35.2], [8.6, 35.8]]
const WEST_SICILY = [[12.0, 38.4], [13.6, 38.4], [13.6, 36.6], [12.0, 36.9]]
const SOUTH_SPAIN = [[-6.6, 36.0], [-6.2, 37.2], [-2.6, 37.4], [-1.6, 37.3], [-2.0, 36.4], [-5.3, 35.8]]

// Persian Wars (490–479 BCE)
const PERSIA_WEST = [[30.6, 35.5], [26.8, 36.3], [25.9, 39.8], [24.4, 40.5], [23.6, 39.9], [22.5, 40.0], [21.2, 40.6], [21.4, 42.2], [30.6, 42.2]]
const GREEK_ALLIES = [[21.0, 36.5], [21.2, 37.9], [21.7, 38.35], [22.9, 38.15], [23.2, 38.25], [24.2, 38.2], [24.2, 37.55], [23.3, 36.3], [22.2, 36.25]]

// Peloponnesian War (431–404 BCE)
const EUBOEA = [[22.8, 39.05], [23.4, 39.25], [24.75, 38.25], [24.6, 37.9], [24.2, 38.15], [24.0, 38.28], [23.62, 38.45], [23.3, 38.6], [22.95, 38.78]]
const AEGEAN_ISLANDS = [[24.2, 36.2], [24.2, 40.1], [26.1, 40.1], [26.1, 37.0], [27.0, 36.2]]
const IONIA_COAST = [[26.1, 36.5], [26.1, 40.2], [27.4, 40.2], [27.6, 38.0], [28.3, 36.6]]
const THRACE_COAST = [[22.8, 39.9], [22.9, 40.6], [24.0, 40.95], [26.0, 41.05], [26.6, 40.7], [26.1, 40.1], [24.5, 40.25]]
const HELLESPONT_BOSPORUS = [[26.1, 40.0], [26.7, 40.75], [29.2, 41.4], [29.4, 40.8], [27.4, 40.2]]
const PELOPONNESE = [[21.0, 36.6], [21.2, 37.9], [21.7, 38.35], [22.9, 38.15], [23.15, 38.0], [23.05, 37.3], [23.3, 36.4], [22.3, 36.25]]
const BOEOTIA = [[22.4, 38.35], [22.7, 38.7], [23.3, 38.6], [23.62, 38.45], [23.7, 38.35], [23.3, 38.3], [22.9, 38.18]]

// ---------- territories (world base map) ----------
const EMPIRE_323 = [
  [19.4, 41.9], [21.0, 42.7], [23.0, 43.6], [25.5, 44.0], [28.6, 44.3], [29.7, 45.2], [30.5, 43.3], [35.0, 42.3], [41.5, 41.6],
  [44.0, 41.2], [46.0, 40.6], [48.6, 38.6], [49.5, 37.4], [53.9, 37.2], [56.0, 38.2], [59.8, 38.4], [61.8, 38.0],
  [64.0, 40.4], [66.0, 41.0], [69.0, 41.1], [70.9, 40.6], [71.2, 39.0], [70.6, 37.5], [71.6, 36.0], [73.5, 35.1],
  [74.6, 34.2], [75.9, 32.0], [75.4, 30.9], [73.0, 29.4], [71.5, 27.5], [70.3, 25.2], [68.5, 23.4], [66.0, 24.4],
  [61.0, 24.8], [57.0, 25.2], [56.3, 26.8], [54.0, 26.4], [51.0, 27.7], [49.0, 29.8], [47.6, 30.0], [45.5, 31.0],
  [43.0, 31.8], [40.5, 33.4], [38.5, 33.0], [37.3, 31.3], [36.0, 29.4], [35.0, 29.4], [34.0, 28.0], [33.6, 27.4],
  [32.9, 24.0], [31.0, 23.9], [29.5, 26.0], [25.3, 28.9], [24.6, 30.2], [25.0, 31.7], [25.0, 32.6], [24.0, 35.0],
  [22.0, 36.0], [20.0, 38.5], [19.4, 40.0],
]
const PTOLEMAIC = [[19.8, 30.2], [19.8, 32.8], [23.5, 33.3], [25.0, 32.2], [29.0, 31.8], [32.0, 31.6], [34.2, 31.4], [34.8, 32.6], [35.4, 33.6], [35.8, 34.9], [36.6, 34.6],
  [36.6, 33.2], [36.6, 32.0], [35.9, 30.0], [35.0, 29.4], [34.0, 28.0], [33.7, 27.1], [33.0, 24.0], [32.9, 22.5], [31.0, 22.5], [30.0, 24.0], [28.0, 25.0], [25.5, 28.5], [24.5, 29.5], [20.5, 29.6]]
const CYPRUS = [[32.0, 34.4], [34.8, 34.4], [34.8, 35.9], [32.0, 35.9]]
const SELEUCID = [[26.4, 37.9], [26.5, 40.0], [29.0, 40.2], [32.0, 39.8], [35.5, 39.5], [38.5, 39.5], [42.0, 39.0], [44.6, 38.3], [45.6, 37.0], [48.0, 36.9], [50.5, 36.9],
  [53.9, 37.0], [56.0, 38.0], [59.0, 38.4], [61.8, 38.0], [64.0, 40.2], [67.5, 40.8], [69.6, 40.5], [70.6, 38.5], [71.3, 37.0], [70.5, 35.6], [68.0, 35.2], [64.5, 34.4],
  [62.6, 33.0], [61.0, 31.2], [60.4, 29.2], [58.4, 27.6], [57.4, 25.8], [54.0, 26.4], [51.0, 27.7], [49.0, 29.8], [47.6, 30.0], [45.5, 31.0], [43.0, 31.8], [40.5, 33.4],
  [38.0, 34.0], [36.6, 34.6], [35.8, 34.9], [35.4, 36.2], [36.0, 36.9], [34.5, 36.6], [32.5, 36.0], [30.5, 36.2], [29.0, 36.5], [27.4, 36.6]]
const ANTIGONID = [[20.8, 40.5], [20.7, 41.5], [21.6, 42.2], [23.5, 42.1], [24.8, 41.4], [24.8, 40.7], [24.2, 39.4], [24.6, 38.0], [23.2, 37.5], [22.4, 38.2], [21.9, 39.0], [21.2, 39.6]]
const MAURYAN = [[61.8, 25.3], [64.5, 29.5], [64.6, 32.5], [67.0, 34.6], [70.4, 35.3], [73.5, 35.8], [76.0, 34.5], [78.5, 32.5], [80.2, 30.3], [84.0, 27.8], [88.4, 26.6],
  [89.6, 25.6], [89.6, 21.6], [86.0, 19.8], [82.0, 16.4], [80.2, 13.2], [78.0, 13.2], [75.5, 13.4], [73.6, 15.8], [72.6, 19.0], [72.4, 21.6], [69.0, 22.4], [67.0, 23.9], [64.0, 25.0]]

// ---------- routes ----------
const DARIUS_490 = [[26.95, 37.7], [25.4, 37.1], [24.4, 37.9], [24.0, 38.35], [24.03, 38.12]]
const XERXES_480 = [[28.04, 38.49], [27.2, 39.4], [26.45, 40.15], [26.5, 40.75], [25.5, 40.95], [24.0, 40.85], [22.94, 40.64], [22.55, 40.0], [22.4, 39.4], [22.55, 38.8], [23.2, 38.4], [23.73, 37.98]]
const COLONY_LANES = [
  [[23.0, 37.6], [20.5, 37.9], [17.4, 38.4], [16.2, 37.5], [15.4, 37.1]],
  [[17.4, 38.4], [16.1, 37.8], [15.62, 38.25], [15.0, 39.0], [14.25, 40.6]],
  [[15.0, 39.0], [12.0, 40.1], [9.3, 41.3], [6.0, 42.6], [5.37, 43.2]],
  [[25.5, 38.4], [26.2, 40.1], [28.98, 41.0], [30.0, 42.8], [31.0, 45.2], [31.9, 46.4]],
  [[28.98, 41.0], [32.0, 42.2], [35.15, 42.15]],
  [[23.4, 36.9], [22.6, 34.8], [21.86, 33.0]],
  [[25.4, 36.4], [28.6, 33.8], [30.4, 31.4]],
]
const ALEX_OUT = [[22.52, 40.76], [26.4, 40.2], [27.3, 40.2], [28.04, 38.49], [27.4, 37.1], [31.98, 39.65], [34.9, 36.92], [36.2, 36.85], [35.2, 33.27],
  [34.45, 31.5], [31.25, 29.85], [29.9, 31.2], [31.25, 29.85], [35.2, 33.27], [38.2, 35.9], [43.45, 36.36], [44.42, 32.54], [48.25, 32.19], [52.89, 29.94],
  [48.52, 34.8], [54.4, 36.2], [62.2, 34.35], [65.71, 31.61], [69.2, 34.5], [66.9, 36.76], [66.97, 39.65], [69.6, 40.28], [66.9, 36.76], [69.2, 34.5],
  [72.83, 33.75], [73.6, 32.9], [75.2, 31.6]]
const ALEX_BACK = [[75.2, 31.6], [73.4, 32.4], [71.2, 29.6], [68.6, 25.2], [65.5, 25.6], [61.8, 26.0], [57.5, 28.5], [52.89, 29.94], [48.25, 32.19], [44.42, 32.54]]
const ROYAL_ROAD = [[36.15, 36.2], [38.2, 35.9], [42.0, 34.5], [44.52, 33.1], [46.8, 34.3], [48.52, 34.8], [51.4, 35.6], [54.4, 36.2], [58.5, 36.6], [62.2, 34.35], [66.9, 36.76], [69.42, 37.17]]
const TO_TAXILA = [[66.9, 36.76], [69.2, 34.5], [72.83, 33.75]]
const MED_LANES = [
  [[29.9, 31.4], [28.22, 36.2], [25.5, 37.0], [23.73, 37.85]],
  [[29.9, 31.4], [33.0, 33.2], [35.8, 35.6]],
  [[28.22, 36.3], [26.8, 38.5], [27.0, 39.0]],
]
const GULF_LANE = [[47.9, 29.9], [51.0, 27.2], [56.4, 26.4], [60.0, 24.9], [66.5, 23.8], [70.0, 21.5], [72.6, 20.2]]
const RED_SEA_LANE = [[32.55, 29.9], [33.0, 28.9], [33.9, 27.6], [35.0, 25.5], [37.5, 21.0], [41.5, 15.8], [44.0, 12.4], [52.0, 13.5], [60.0, 16.5], [68.0, 19.0], [72.6, 20.2]]

// ---------- map steps (the animated map) ----------
// view: [lonMin, latMin, lonMax, latMax] to zoom in, or null for the whole map.
const C = { minoan: '#C99A3D', myc: '#7A3B22', greek: '#4E7FA6', sparta: '#B5482A', persia: '#6E5A8F', phoen: '#6E5A8F', alex: '#B5482A', ptol: '#C99A3D', sel: '#4E7A55', ant: '#4E7FA6', maur: '#6E5A8F' }
const STEPS = [
  {
    title: 'The Bronze Age Aegean, c. 2200–1100 BCE', chip: 'Minoans & Mycenaeans',
    caption: 'Minoan Crete, with its palace at Knossos, was a trading power from about 2200 BCE. After disasters struck Crete, the warlike Mycenaeans of mainland Greece took over the island around 1450 BCE.',
    view: [19.5, 34.3, 29.5, 41.6],
    lands: [{ label: 'Minoan Crete', color: C.minoan, polys: [CRETE], at: [24.5, 34.7] }, { label: 'Mycenaean Greece', color: C.myc, polys: [MYCENAEAN], at: [22.7, 39.25] }],
    cities: ['knossos', 'mycenae', 'pylos', 'troy', 'thera'],
    tags: [{ text: 'Linear A: still undeciphered', at: [28.3, 34.95] }, { text: 'Thera erupts, c. 1600', at: [27.2, 36.0] }, { text: 'Linear B = early Greek', at: [21.4, 35.75] }, { text: 'Trojan War, c. 1200?', at: [27.8, 40.35] }],
  },
  {
    title: 'The poleis, c. 500 BCE', chip: 'The polis',
    caption: 'Mountains and sea split Greece into about a thousand independent city-states. Two became famous opposites: Sparta, which ruled helot serfs in Laconia and Messenia, and Athens, which ran Attica.',
    view: [19.8, 35.6, 28.4, 40.9],
    lands: [{ label: 'Sparta + helot lands', color: C.sparta, polys: [LACONIA_MESSENIA], at: [22.3, 36.55] }, { label: 'Athens (Attica)', color: C.greek, polys: [ATTICA], at: [25.3, 37.35] },
      { label: '', color: C.greek, polys: [IONIA], faint: true }],
    cities: ['athens', 'sparta', 'corinth', 'thebes', 'argos', 'delphi', 'olympia', 'miletus'],
    tags: [{ text: 'Ionian Greek cities', at: [27.2, 39.5] }, { text: 'Olympic Games from 776', at: [20.6, 37.35] }],
  },
  {
    title: 'Greek colonization, 800–500 BCE', chip: 'Colonies',
    caption: 'Growing populations sent Greeks overseas. They founded colonies in southern Italy and Sicily, southern France, Libya, Anatolia and around the Black Sea, while the Phoenicians (Carthage) settled the west.',
    view: [-4, 28.5, 45, 49.5],
    lands: [{ label: 'Greece', color: C.myc, polys: [GREEK_HOMELAND], at: [22.2, 39.4] },
      { label: 'Greek colonies', color: C.greek, polys: [IONIA, MAGNA_GRAECIA, EAST_SICILY, MASSALIA_COAST, CYRENAICA, NAUCRATIS, BLACK_SEA_WEST, BLACK_SEA_NORTH, CRIMEA, BLACK_SEA_SOUTH], at: [36.5, 39.6] },
      { label: 'Phoenician', color: C.phoen, polys: [PHOENICIAN_WEST, WEST_SICILY, SOUTH_SPAIN], at: [7.4, 35.0], faint: true }],
    routes: COLONY_LANES.map(pts => ({ pts, color: '#2E6E9A', dashed: true })),
    cities: ['massalia', 'emporion', 'neapolis', 'syracuse', 'byzantium', 'olbia', 'chersonesus', 'sinope', 'cyrene', 'naucratis', 'miletus', 'athens', 'carthage'],
    tags: [{ text: 'wine · olive oil out', at: [24.6, 34.3] }, { text: 'grain · fish · timber', at: [38.0, 46.4] }, { text: 'grain', at: [14.6, 36.0] }],
  },
  {
    title: 'The Persian Wars, 490–479 BCE', chip: 'Persian Wars',
    caption: 'After Athens helped the Ionian Greeks revolt, Darius sent a fleet that lost at Marathon (490 BCE). In 480 BCE Xerxes marched around the Aegean, won at Thermopylae and burned Athens, but lost at Salamis (480) and Plataea (479).',
    view: [19.8, 35.8, 30.6, 41.8],
    lands: [{ label: 'Persian Empire', color: C.persia, polys: [PERSIA_WEST], at: [29.0, 39.6] }, { label: 'Greek allies', color: C.greek, polys: [GREEK_ALLIES], at: [21.7, 36.55] }],
    routes: [{ pts: DARIUS_490, color: C.persia, dashed: true, arrow: true, label: 'Darius’s fleet, 490', labelAt: [25.6, 37.25] }, { pts: XERXES_480, color: C.sparta, arrow: true, label: 'Xerxes, 480', labelAt: [25.0, 41.25] }],
    cities: ['athens', 'sparta', 'marathon', 'thermopylae', 'salamis', 'plataea', 'sardis', 'miletus'],
  },
  {
    title: 'The Peloponnesian War, 431–404 BCE', chip: 'Peloponnesian War',
    caption: 'Athens turned the Delian League into an empire of tribute-paying allies across the Aegean. Sparta led the Peloponnesian League. Their war ended with Athens’ surrender in 404 BCE.',
    view: [19.8, 35.8, 30.6, 41.8],
    lands: [{ label: 'Athens & Delian League', color: C.greek, polys: [ATTICA, EUBOEA, AEGEAN_ISLANDS, IONIA_COAST, THRACE_COAST, HELLESPONT_BOSPORUS], at: [25.2, 36.2] },
      { label: 'Sparta & allies', color: C.sparta, polys: [PELOPONNESE, BOEOTIA], at: [21.3, 36.3] }],
    cities: ['athens', 'sparta', 'corinth', 'thebes', 'miletus', 'byzantium', 'pella'],
    tags: [{ text: 'plague in Athens, 430', at: [24.7, 37.35] }, { text: 'Macedon (rising later)', at: [21.6, 41.3] }],
  },
  {
    title: 'Alexander’s campaign, 334–323 BCE', chip: 'Alexander',
    base: 'world',
    caption: 'Alexander crossed into Asia in 334 BCE, beat the Persians at Issus and Gaugamela, took Egypt and Persia, and pushed on to Bactria and India. At the Hyphasis River his exhausted army refused to go on. He died at Babylon in 323 BCE.',
    view: [10, 15, 82, 48],
    lands: [{ label: 'Alexander’s empire, 323 BCE', color: C.alex, polys: [EMPIRE_323], at: [42.0, 39.6] }],
    routes: [{ pts: ALEX_OUT, color: '#7A3B22', arrow: true, label: 'Outward, 334–326', labelAt: [60.0, 37.9] }, { pts: ALEX_BACK, color: '#2E6E9A', arrow: true, dashed: true, label: 'Return, 325–324', labelAt: [62.0, 24.0] }],
    cities: ['pella', 'issus', 'alexandria', 'gaugamela', 'babylon', 'persepolis', 'bactra', 'taxila'],
    tags: [{ text: 'mutiny, 326', at: [77.3, 29.8] }, { text: 'Gedrosian desert', at: [61.0, 27.6] }],
  },
  {
    title: 'The Hellenistic kingdoms, c. 275 BCE', chip: 'Hellenistic kingdoms',
    base: 'world',
    caption: 'Alexander’s generals split his empire. The Antigonids held Macedon and Greece, the Ptolemies Egypt, and the Seleucids most of the old Persian Empire as far as Bactria. India was now the Mauryan Empire.',
    view: [10, 15, 82, 48],
    lands: [{ label: 'Antigonid', color: C.ant, polys: [ANTIGONID], at: [22.5, 43.6] }, { label: 'Ptolemaic', color: C.ptol, polys: [PTOLEMAIC, CYPRUS], at: [28.2, 25.6] },
      { label: 'Seleucid', color: C.sel, polys: [SELEUCID], at: [57.5, 32.0] }, { label: 'Mauryan Empire', color: C.maur, polys: [MAURYAN], at: [74.5, 21.5], faint: true }],
    cities: ['pella', 'alexandria', 'antioch', 'seleucia', 'bactra', 'pataliputra'],
  },
  {
    title: 'Hellenistic trade and cities', chip: 'Trade & cities',
    base: 'world',
    caption: 'Greek settlers filled new cities from Egypt to Afghanistan. Sea lanes (dashed) and the old Persian roads (solid) linked Alexandria, Antioch and Seleucia with Bactria and India, spreading Greek language and ideas.',
    view: [10, 15, 82, 48],
    lands: [{ label: '', color: C.ant, polys: [ANTIGONID], faint: true }, { label: '', color: C.ptol, polys: [PTOLEMAIC, CYPRUS], faint: true }, { label: '', color: C.sel, polys: [SELEUCID], faint: true }],
    routes: [{ pts: ROYAL_ROAD, color: '#7A3B22' }, { pts: TO_TAXILA, color: '#7A3B22' }, ...MED_LANES.map(pts => ({ pts, color: '#2E6E9A', dashed: true })),
      { pts: GULF_LANE, color: '#2E6E9A', dashed: true, arrow: true }, { pts: RED_SEA_LANE, color: '#2E6E9A', dashed: true, arrow: true, label: 'to India', labelAt: [58.0, 15.6] }],
    cities: ['alexandria', 'antioch', 'seleucia', 'rhodes', 'pergamon', 'athens', 'bactra', 'aikhanoum', 'kandahar', 'taxila'],
    tags: [{ text: 'Library & Museum', at: [24.5, 29.4] }, { text: 'grain · papyrus · linen', at: [30.0, 26.8] }, { text: 'Greek city in Bactria', at: [71.5, 39.0] },
      { text: 'Ashoka’s edict in Greek + Aramaic', at: [62.0, 29.9] }, { text: 'Greek coins & art', at: [75.5, 36.4] }],
  },
]

// base: the base map in src/geo; aspect: height / width of the map frame.
export default { base: 'mediterranean', aspect: 0.62, cities: CITIES, steps: STEPS }
