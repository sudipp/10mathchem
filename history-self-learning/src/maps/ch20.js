// Chapter 20 map layers (longitude, latitude). Territory outlines are drawn loosely over
// the sea: the map clips every territory to the coastline, so only land frontiers need care.
// Steps 0–5 use the world base map; steps 6–7 switch to the Pacific base (east of 180°, keep counting: lon + 360).
// Sources for frontiers: standard historical atlases (Aztec tributary provinces c. 1519, Tawantinsuyu c. 1525,
// Chimor before the Inca conquest, Mississippian and Ancestral Puebloan culture areas).

const CITIES = {
  // Mesoamerica
  tula: { name: 'Tula', at: [-99.34, 20.06], big: true, side: 'left' },
  teotihuacan: { name: 'Teotihuacan (ruins)', at: [-98.84, 19.69], side: 'below' },
  tenochtitlan: { name: 'Tenochtitlan', at: [-99.13, 19.43], big: true, side: 'left' },
  tlaxcala: { name: 'Tlaxcala', at: [-98.24, 19.32] },
  chichen: { name: 'Chichén Itzá', at: [-88.57, 20.68] },
  mayapan: { name: 'Mayapán', at: [-89.46, 20.63], side: 'below' },
  // North America
  chaco: { name: 'Chaco Canyon', at: [-107.96, 36.06], big: true, side: 'below' },
  mesaverde: { name: 'Mesa Verde', at: [-108.46, 37.18], side: 'left' },
  cahokia: { name: 'Cahokia', at: [-90.06, 38.66], big: true },
  moundville: { name: 'Moundville', at: [-87.63, 33.0] },
  spiro: { name: 'Spiro', at: [-94.57, 35.31], side: 'left' },
  onondaga: { name: 'Onondaga', at: [-76.1, 42.95], side: 'below' },
  // Andes
  quito: { name: 'Quito', at: [-78.47, -0.18], big: true },
  tumbes: { name: 'Tumbes', at: [-80.45, -3.57], side: 'left' },
  cajamarca: { name: 'Cajamarca', at: [-78.52, -7.16] },
  chanchan: { name: 'Chan Chan', at: [-79.07, -8.11], big: true, side: 'left' },
  pachacamac: { name: 'Pachacamac', at: [-76.9, -12.26], side: 'left' },
  cuzco: { name: 'Cuzco', at: [-71.97, -13.53], big: true },
  chucuito: { name: 'Chucuito', at: [-69.89, -15.89], side: 'below' },
  santiago: { name: 'Mapocho valley', at: [-70.65, -33.45] },
  // Pacific (lon + 360 east of 180°)
  bismarck: { name: 'Bismarck Is.', at: [150.8, -4.2], side: 'left' },
  fiji: { name: 'Fiji', at: [178.4, -18.1], side: 'left' },
  tonga: { name: 'Tonga', at: [184.8, -21.1], side: 'below' },
  samoa: { name: 'Samoa', at: [188.2, -13.8] },
  tahiti: { name: 'Tahiti', at: [210.6, -17.65], big: true, side: 'below' },
  marquesas: { name: 'Marquesas', at: [220.0, -9.0] },
  hawaii: { name: 'Hawaiʻi', at: [204.5, 19.6], big: true },
  rapanui: { name: 'Rapa Nui (Easter I.)', at: [250.6, -27.12], big: true, side: 'below' },
  aotearoa: { name: 'Aotearoa (New Zealand)', at: [174.8, -39.5], big: true, side: 'left' },
  // Australia and New Guinea
  kuk: { name: 'Kuk Swamp', at: [144.33, -5.78] },
  uluru: { name: 'Uluru', at: [131.04, -25.34] },
  budjbim: { name: 'Budj Bim', at: [141.9, -38.1], side: 'below' },
}

// ---------- territories ----------
const TOLTEC = [[-100.4, 21.3], [-98.6, 21.4], [-97.9, 20.6], [-98.2, 19.6], [-99.0, 19.15], [-99.9, 19.35], [-100.6, 20.2]]
const MAYA = [[-92.3, 16.0], [-91.6, 17.6], [-91.0, 21.9], [-86.4, 21.9], [-86.8, 18.0], [-88.2, 15.8], [-89.2, 14.9], [-91.0, 15.0]]
// The empire is drawn as two halves that meet along lon -98.25, so Tlaxcala (never conquered) is left as a hole.
const AZTEC_W = [[-98.25, 22.11], [-98.25, 19.75], [-98.7, 19.75], [-98.75, 19.35], [-98.5, 19.05], [-98.25, 19.09], [-98.25, 15.81],
  [-98.5, 15.9], [-100.5, 16.6], [-102.3, 17.5], [-101.6, 18.4], [-100.6, 18.9], [-100.4, 19.6], [-100.1, 20.3], [-99.6, 21.0], [-99.2, 21.6], [-98.6, 22.0]]
const AZTEC_E = [[-98.25, 22.11], [-97.3, 22.4], [-96.0, 20.6], [-95.0, 19.1], [-94.3, 18.4], [-94.5, 17.6], [-94.9, 16.9], [-94.2, 16.3],
  [-94.0, 15.6], [-96.5, 15.2], [-98.25, 15.81], [-98.25, 19.09], [-97.8, 19.15], [-97.9, 19.75], [-98.25, 19.75]]
const SOCONUSCO = [[-93.7, 15.95], [-92.2, 15.1], [-92.0, 14.4], [-93.2, 14.6]]
const TARASCAN = [[-104.0, 20.7], [-101.0, 20.6], [-100.4, 19.6], [-100.6, 18.9], [-101.6, 18.4], [-102.3, 17.5], [-103.6, 17.8], [-105.0, 19.3]]
const TLAXCALA = [[-98.7, 19.75], [-97.9, 19.75], [-97.8, 19.15], [-98.5, 19.05], [-98.75, 19.35]]
const PUEBLO = [[-112.2, 37.9], [-108.5, 38.4], [-105.8, 37.7], [-105.3, 35.5], [-106.7, 34.1], [-109.6, 33.9], [-111.9, 35.0]]
const MISSISSIPPIAN = [[-95.6, 40.6], [-91.0, 42.6], [-87.8, 41.6], [-84.8, 39.0], [-82.0, 36.5], [-80.4, 34.4], [-81.0, 31.5], [-84.0, 29.5], [-89.0, 29.8], [-91.5, 30.8], [-94.6, 33.4], [-96.0, 36.5]]
const IROQUOIS = [[-80.0, 43.3], [-79.4, 44.4], [-75.6, 45.1], [-73.5, 44.3], [-73.7, 42.3], [-76.5, 41.8], [-79.8, 42.0]]
const CHIMU = [[-81.8, -3.2], [-80.2, -3.3], [-79.6, -5.0], [-78.6, -7.0], [-77.6, -9.0], [-76.9, -11.0], [-76.9, -11.9], [-77.8, -12.4], [-79.8, -9.5], [-81.8, -6.5]]
const CHUCUITO = [[-70.4, -15.4], [-69.6, -15.5], [-68.9, -16.2], [-69.2, -17.0], [-70.1, -17.0], [-70.7, -16.2]]
const EARLY_INCA = [[-72.6, -12.9], [-71.4, -12.9], [-71.2, -13.9], [-72.4, -14.1]]
const INCA = [
  [-80.0, 1.6], [-77.0, 1.4], [-76.6, 0.2], [-77.3, -1.5], [-77.8, -3.5], [-78.0, -5.5], [-77.0, -7.0], [-76.3, -9.0],
  [-75.0, -11.0], [-73.5, -12.4], [-72.0, -12.4], [-70.0, -13.4], [-68.5, -14.5], [-67.0, -16.0], [-65.0, -17.0], [-63.5, -18.0],
  [-63.8, -20.5], [-64.5, -23.0], [-64.8, -26.0], [-65.5, -28.5], [-67.0, -31.0], [-68.5, -33.5], [-69.8, -35.6],
  [-73.0, -35.8], [-72.4, -30.0], [-71.6, -24.0], [-71.2, -18.5], [-73.5, -16.6], [-77.8, -12.5], [-80.2, -8.5],
  [-82.0, -5.5], [-81.4, -2.0], [-80.6, 0.5],
]
const AUSTRALIA = [[112.0, -21.0], [113.6, -34.8], [118.0, -36.0], [131.0, -33.0], [138.0, -37.0], [141.0, -39.5], [148.5, -39.8], [151.5, -35.0],
  [154.5, -28.0], [154.0, -23.5], [146.5, -17.5], [145.8, -13.0], [142.6, -10.0], [141.0, -12.0], [136.0, -10.8], [132.0, -10.4], [129.0, -14.2],
  [124.0, -13.2], [121.0, -18.0], [114.0, -20.0]]
const TASMANIA = [[143.5, -39.6], [149.0, -39.6], [148.8, -44.2], [145.0, -44.2]]
const NEW_GUINEA = [[129.5, 0.6], [135.0, -0.4], [141.0, -1.4], [147.0, -3.8], [152.2, -9.4], [151.8, -11.6], [146.0, -11.0], [142.8, -9.5], [138.0, -9.4], [135.0, -5.6], [131.5, -3.9], [129.4, -2.0]]

// ---------- routes ----------
const CHACO_SOUTH = [[-107.0, 29.2], [-107.6, 32.3], [-107.85, 34.3]]
const COPPER = [[-88.6, 47.2], [-89.6, 44.0], [-90.06, 38.66]]
const SHELLS = [[-88.2, 30.4], [-89.6, 34.5], [-90.06, 38.66]]
const ROAD_HIGH = [[-78.47, -0.18], [-78.65, -1.67], [-79.0, -2.9], [-79.2, -4.6], [-78.52, -7.16], [-76.6, -9.87], [-75.5, -11.77], [-73.95, -13.65], [-71.97, -13.53],
  [-70.37, -14.9], [-69.89, -15.89], [-68.7, -16.6], [-66.8, -19.6], [-65.6, -22.5], [-65.8, -24.8], [-67.0, -27.5], [-68.8, -32.9], [-70.65, -33.45], [-71.2, -35.0]]
const ROAD_COAST = [[-80.45, -3.57], [-80.6, -5.2], [-79.07, -8.11], [-78.0, -9.6], [-76.9, -12.26], [-76.2, -13.7], [-75.0, -14.9], [-73.2, -16.3], [-71.5, -16.4],
  [-70.3, -18.5], [-70.2, -20.2], [-70.3, -23.6], [-70.3, -27.4], [-71.2, -29.9], [-70.65, -33.45]]
const ROAD_LINKS = [[[-79.07, -8.11], [-78.52, -7.16]], [[-76.9, -12.26], [-75.5, -11.77]], [[-71.5, -16.4], [-69.89, -15.89]]]
const AUSTRONESIAN = [[121.0, 22.0], [121.5, 15.0], [127.0, 3.0], [140.0, -1.0], [150.8, -4.2]]
const LAPITA = [[150.8, -4.2], [160.0, -9.5], [166.9, -15.4], [178.4, -18.1], [184.8, -21.1]]
const LAPITA_SAMOA = [[178.4, -18.1], [188.2, -13.8]]
const TO_SOCIETY = [[188.2, -13.8], [200.0, -15.0], [210.6, -17.65]]
const TO_HAWAII = [[210.6, -17.65], [208.0, 0.0], [204.5, 19.6]]
const TO_MARQUESAS = [[210.6, -17.65], [220.0, -9.0]]
const TO_RAPANUI = [[210.6, -17.65], [232.0, -24.0], [250.6, -27.12]]
const TO_AOTEAROA = [[210.6, -17.65], [200.2, -21.2], [186.0, -32.0], [174.8, -39.5]]
const SWEET_POTATO = [[279.0, -3.0], [252.0, -12.0], [220.5, -9.2]]
const TRIANGLE = [[204.5, 19.6], [250.6, -27.12], [174.8, -39.5], [204.5, 19.6]]
const PEARL_SHELL = [[124.0, -16.5], [127.5, -21.5], [131.5, -26.0], [135.5, -29.5], [138.5, -33.5]]
const OCHRE = [[139.6, -20.5], [139.2, -25.5], [138.0, -29.0], [139.5, -32.8]]

// ---------- map steps (the animated map) ----------
// view: [lonMin, latMin, lonMax, latMax] to zoom in, or null for the whole map.
const C = { toltec: '#C99A3D', aztec: '#B5482A', maya: '#4E7A55', taras: '#6E5A8F', tlax: '#4E7FA6', pueblo: '#C99A3D', miss: '#7A3B22',
  iroq: '#4E7A55', chimu: '#6E5A8F', lupaqa: '#4E7FA6', inca: '#C99A3D', sea: '#2E6E9A', road: '#7A3B22' }
const MESO = [-106, 13, -86, 24]
const STEPS = [
  {
    title: 'The Toltecs, c. 950–1150', chip: 'Toltecs', caption: 'After Teotihuacan fell, migrants from the northwest built a warrior state at Tula. At its height it held about 60,000 people in the city and 60,000 more around it; Toltec styles reached the Maya city of Chichén Itzá.',
    view: MESO,
    lands: [{ label: 'Toltecs', color: C.toltec, polys: [TOLTEC], at: [-99.3, 21.9] }, { label: 'Maya city-states', color: C.maya, polys: [MAYA], at: [-89.4, 18.0], faint: true }],
    cities: ['tula', 'teotihuacan', 'chichen'],
  },
  {
    title: 'The Aztec empire, c. 1519', chip: 'Aztecs', caption: 'From Tenochtitlan, the Mexica and their partners Texcoco and Tlacopan (the Triple Alliance) collected tribute from hundreds of towns. Tlaxcala and the Tarascan kingdom were never conquered.',
    view: MESO,
    lands: [{ label: 'Aztec empire', color: C.aztec, polys: [AZTEC_W, AZTEC_E, SOCONUSCO], at: [-97.4, 17.4] }, { label: 'Tarascans', color: C.taras, polys: [TARASCAN], at: [-103.3, 20.9] },
      { label: '', color: C.tlax, polys: [TLAXCALA] }, { label: 'Maya city-states', color: C.maya, polys: [MAYA], at: [-89.4, 18.0], faint: true }],
    cities: ['tenochtitlan', 'tlaxcala', 'mayapan'],
    tags: [{ text: 'Triple Alliance, 1428', at: [-99.5, 18.7] }, { text: 'cotton · cacao', at: [-92.4, 14.2] }, { text: 'feathers · jade · gold', at: [-96.6, 16.2] }, { text: 'maize · beans · cloth', at: [-97.2, 20.2] }],
  },
  {
    title: 'Peoples of North America, c. 900–1300', chip: 'North America', caption: 'Ancestral Puebloans built stone and adobe great houses in the Southwest. Mississippian mound builders farmed the river valleys, with Cahokia as their largest town; the Iroquois farmed the eastern woodlands. Rivers carried trade.',
    view: [-115, 27, -70, 48],
    lands: [{ label: 'Ancestral Puebloans', color: C.pueblo, polys: [PUEBLO], at: [-108.8, 39.4] }, { label: 'Mississippians', color: C.miss, polys: [MISSISSIPPIAN], at: [-85.6, 36.2] },
      { label: 'Iroquois', color: C.iroq, polys: [IROQUOIS], at: [-75.8, 45.9] }],
    routes: [{ pts: CHACO_SOUTH, color: C.toltec, arrow: true, label: 'macaws · cacao from Mexico', labelAt: [-103.5, 30.8] }, { pts: COPPER, color: C.road, arrow: true, label: 'copper', labelAt: [-86.6, 45.6] },
      { pts: SHELLS, color: C.sea, arrow: true, label: 'Gulf shells', labelAt: [-92.4, 32.6] }],
    cities: ['chaco', 'mesaverde', 'cahokia', 'moundville', 'spiro', 'onondaga'],
  },
  {
    title: 'Andean kingdoms before the Inca, c. 1000–1400', chip: 'Chimu & Chucuito', caption: 'Regional states rose after the Moche faded. Chimu ruled the north coast of Peru from its huge adobe capital, Chan Chan; Chucuito herded llamas and alpacas and grew potatoes around Lake Titicaca. The Inca were still one small group near Cuzco.',
    view: [-84, -19, -66, -1],
    lands: [{ label: 'Chimu (Chimor)', color: C.chimu, polys: [CHIMU], at: [-81.2, -10.0] }, { label: 'Kingdom of Chucuito', color: C.lupaqa, polys: [CHUCUITO], at: [-72.4, -17.5] },
      { label: 'Early Inca', color: C.inca, polys: [EARLY_INCA], at: [-72.0, -12.0] }],
    cities: ['chanchan', 'tumbes', 'cuzco', 'chucuito'],
    tags: [{ text: 'Lake Titicaca', at: [-67.6, -15.4] }, { text: 'irrigated desert valleys', at: [-80.8, -5.4] }],
  },
  {
    title: 'The Inca empire, c. 1525', chip: 'Inca empire', caption: 'Pachacuti and his heirs built Tawantinsuyu, about 4,000 kilometers long, from Quito to central Chile. Two main roads, one in the mountains and one along the coast, tied it to Cuzco.',
    view: [-86, -38, -58, 4],
    lands: [{ label: 'Inca empire', color: C.inca, polys: [INCA], at: [-88.5, -19.5] }],
    routes: [{ pts: ROAD_HIGH, color: C.road, label: 'mountain road', labelAt: [-63.2, -22.5] }, { pts: ROAD_COAST, color: C.road, dashed: true, label: 'coast road', labelAt: [-77.4, -18.6] },
      ...ROAD_LINKS.map(pts => ({ pts, color: C.road }))],
    cities: ['quito', 'tumbes', 'cajamarca', 'chanchan', 'pachacamac', 'cuzco', 'chucuito', 'santiago'],
    tags: [{ text: 'Maule River frontier', at: [-75.2, -36.2] }],
  },
  {
    title: 'The Americas, c. 1500', chip: 'Two empires', caption: 'On the eve of the Spanish arrival, two great empires ruled Mesoamerica and the Andes. Elsewhere, Maya city-states, Pueblo villages, Mississippian chiefdoms and the Iroquois Confederacy governed themselves.',
    view: [-125, -40, -45, 50],
    lands: [{ label: 'Aztec empire', color: C.aztec, polys: [AZTEC_W, AZTEC_E, SOCONUSCO], at: [-111.0, 13.5] }, { label: 'Inca empire', color: C.inca, polys: [INCA], at: [-90.5, -15.0] },
      { label: 'Maya', color: C.maya, polys: [MAYA], at: [-81.0, 17.0], faint: true }, { label: '', color: C.pueblo, polys: [PUEBLO], faint: true },
      { label: '', color: C.miss, polys: [MISSISSIPPIAN], faint: true }, { label: '', color: C.iroq, polys: [IROQUOIS], faint: true }],
    cities: ['tenochtitlan', 'cuzco'],
    tags: [{ text: 'Pueblo villages', at: [-109.0, 39.8] }, { text: 'Mississippian chiefdoms', at: [-89.0, 37.0] }, { text: 'Iroquois Confederacy', at: [-70.0, 46.2] },
      { text: 'no contact with Afro-Eurasia', at: [-38.0, 22.0] }],
  },
  {
    title: 'Australia and New Guinea', chip: 'Australia', base: 'pacific', caption: 'Aboriginal Australians lived as foragers and never adopted farming, but they traded pearl shell, ochre, spears and boomerangs across the continent. New Guinea’s highlanders grew root crops and later herded pigs.',
    view: [106, -46, 162, 4],
    lands: [{ label: 'Aboriginal foragers', color: '#4E7A55', polys: [AUSTRALIA, TASMANIA], at: [134.0, -17.5] }, { label: 'New Guinea farmers', color: C.toltec, polys: [NEW_GUINEA], at: [137.0, -1.2] }],
    routes: [{ pts: PEARL_SHELL, color: C.sea, arrow: true, label: 'pearl shell', labelAt: [121.8, -23.2] }, { pts: OCHRE, color: C.aztec, arrow: true, label: 'ochre', labelAt: [142.6, -27.0] }],
    cities: ['kuk', 'uluru', 'budjbim'],
    tags: [{ text: 'taro · yams · pigs', at: [146.0, -8.2] }, { text: 'spears · boomerangs', at: [119.5, -29.0] }, { text: 'eel traps', at: [140.5, -41.4] }],
  },
  {
    title: 'Voyagers settle the Pacific, c. 1500 BCE – 1300 CE', chip: 'Polynesia', base: 'pacific', caption: 'Lapita voyagers reached Fiji, Tonga and Samoa by about 800 BCE. Much later, Polynesians sailed from the Society Islands to Hawaiʻi, Rapa Nui and Aotearoa, steering by stars, swells and birds, and brought the sweet potato back from South America.',
    view: [113, -50, 290, 30],
    routes: [{ pts: TRIANGLE, color: '#6E5A8F', dashed: true, label: 'Polynesian Triangle', labelAt: [229.0, 9.0] },
      { pts: AUSTRONESIAN, color: C.toltec, dashed: true }, { pts: LAPITA, color: C.toltec, arrow: true, label: 'Lapita, c. 1500–800 BCE', labelAt: [163.0, 1.0] }, { pts: LAPITA_SAMOA, color: C.toltec, arrow: true },
      { pts: TO_SOCIETY, color: C.sea, arrow: true }, { pts: TO_HAWAII, color: C.sea, arrow: true, label: 'c. 1000–1300 CE', labelAt: [217.0, -1.0] },
      { pts: TO_MARQUESAS, color: C.sea, arrow: true }, { pts: TO_RAPANUI, color: C.sea, arrow: true }, { pts: TO_AOTEAROA, color: C.sea, arrow: true },
      { pts: SWEET_POTATO, color: C.aztec, arrow: true, dashed: true, label: 'sweet potato', labelAt: [262.0, -6.5] }],
    cities: ['bismarck', 'fiji', 'tonga', 'samoa', 'tahiti', 'marquesas', 'hawaii', 'rapanui', 'aotearoa'],
    tags: [{ text: 'ancestors from Taiwan, after 3000 BCE', at: [147.0, 13.0] }],
  },
]

// base: the base map in src/geo; aspect: height / width of the map frame.
export default { base: 'world', aspect: 0.62, cities: CITIES, steps: STEPS }
