// Chapter 24 map layers (longitude, latitude). Territory outlines are drawn loosely over
// the sea: the map clips every territory to the coastline, so only land frontiers need care.
// Pacific steps use the Pacific-centered base: east of 180° longitude keeps counting (lon + 360).
// Sources for frontiers: standard historical atlases (Aztec and Inca empires 1519/1532, viceroyalties c. 1600,
// North America c. 1700, Manila galleon routes, Cook's voyages).

const CITIES = {
  // Caribbean
  sanSalvador: { name: 'San Salvador, 1492', at: [-74.5, 24.05] },
  isabela: { name: 'La Isabela, 1493', at: [-71.08, 19.89] },
  santoDomingo: { name: 'Santo Domingo', at: [-69.9, 18.47], big: true, side: 'below' },
  sanJuan: { name: 'San Juan', at: [-66.1, 18.47] },
  havana: { name: 'Havana', at: [-82.37, 23.13], big: true },
  santiagoCuba: { name: 'Santiago de Cuba', at: [-75.82, 20.02], side: 'below' },
  // Mexico and Central America
  veracruz: { name: 'Veracruz', at: [-96.13, 19.19] },
  tlaxcala: { name: 'Tlaxcala', at: [-98.24, 19.32], side: 'below' },
  tenochtitlan: { name: 'Tenochtitlan', at: [-99.13, 19.43], big: true, side: 'left' },
  mexicoCity: { name: 'Mexico City', at: [-99.13, 19.43], big: true, side: 'left' },
  zacatecas: { name: 'Zacatecas', at: [-102.57, 22.77] },
  acapulco: { name: 'Acapulco', at: [-99.88, 16.85], side: 'left' },
  panama: { name: 'Panama', at: [-79.52, 8.98], side: 'below' },
  portobelo: { name: 'Portobelo', at: [-79.65, 9.55] },
  cartagena: { name: 'Cartagena', at: [-75.51, 10.39] },
  // South America
  tumbes: { name: 'Tumbes', at: [-80.45, -3.57], side: 'left' },
  cajamarca: { name: 'Cajamarca', at: [-78.52, -7.16], side: 'left' },
  cuzco: { name: 'Cuzco', at: [-71.97, -13.53], big: true },
  lima: { name: 'Lima', at: [-77.04, -12.05], big: true, side: 'left' },
  potosi: { name: 'Potosí', at: [-65.75, -19.58], big: true },
  buenosAires: { name: 'Buenos Aires', at: [-58.38, -34.6] },
  salvador: { name: 'Salvador (Bahia)', at: [-38.5, -12.97], big: true },
  recife: { name: 'Recife', at: [-34.88, -8.05] },
  rio: { name: 'Rio de Janeiro', at: [-43.2, -22.9], side: 'below' },
  // Europe, Africa, Asia (world base)
  seville: { name: 'Seville', at: [-5.98, 37.39], big: true, side: 'below' },
  lisbon: { name: 'Lisbon', at: [-9.14, 38.72], side: 'left' },
  london: { name: 'London', at: [-0.13, 51.5] },
  amsterdam: { name: 'Amsterdam', at: [4.9, 52.37] },
  elmina: { name: 'Elmina', at: [-1.35, 5.08], side: 'below' },
  luanda: { name: 'Luanda', at: [13.23, -8.84] },
  goa: { name: 'Goa', at: [73.83, 15.5], side: 'left' },
  malacca: { name: 'Malacca', at: [102.25, 2.2], side: 'left' },
  guangzhou: { name: 'Guangzhou', at: [113.26, 23.13], big: true },
  manilaW: { name: 'Manila', at: [120.98, 14.6], big: true },
  barbados: { name: 'Barbados', at: [-59.6, 13.1] },
  // North America
  jamestown: { name: 'Jamestown, 1607', at: [-76.78, 37.21] },
  plymouth: { name: 'Plymouth, 1620', at: [-70.67, 41.96] },
  boston: { name: 'Boston, 1630', at: [-71.06, 42.36] },
  newYork: { name: 'New Amsterdam / New York', at: [-74.01, 40.71], side: 'left' },
  quebec: { name: 'Quebec, 1608', at: [-71.21, 46.81] },
  montreal: { name: 'Montreal', at: [-73.57, 45.5], side: 'left' },
  portRoyal: { name: 'Port Royal, 1605', at: [-65.57, 44.71] },
  charleston: { name: 'Charleston, 1670', at: [-79.93, 32.78] },
  stAugustine: { name: 'St. Augustine, 1565', at: [-81.31, 29.9], side: 'left' },
  santaFe: { name: 'Santa Fe', at: [-105.94, 35.69] },
  // Pacific base (lon + 360 east of 180)
  manila: { name: 'Manila, 1571', at: [120.98, 14.6], big: true, side: 'left' },
  cebu: { name: 'Cebu', at: [123.9, 10.3], side: 'left' },
  guam: { name: 'Guam', at: [144.79, 13.44] },
  canton: { name: 'Guangzhou', at: [113.26, 23.13], side: 'left' },
  acapulcoP: { name: 'Acapulco', at: [260.12, 16.85], big: true, side: 'below' },
  mexicoP: { name: 'Mexico City', at: [260.87, 19.43] },
  limaP: { name: 'Lima', at: [282.96, -12.05], side: 'left' },
  sydney: { name: 'Sydney, 1788', at: [151.21, -33.86], big: true },
  batavia: { name: 'Batavia (Dutch)', at: [106.85, -6.2], side: 'below' },
  tahiti: { name: 'Tahiti', at: [210.55, -17.5], big: true },
  hawaii: { name: 'Hawaiʻi', at: [204.05, 19.48], big: true },
  nootka: { name: 'Nootka Sound', at: [233.4, 49.6], side: 'left' },
  queenCharlotte: { name: 'New Zealand', at: [174.3, -41.1], side: 'left' },
}

// ---------- territories ----------
const HISPANIOLA = [[-74.7, 17.6], [-74.7, 19.4], [-73.6, 20.1], [-68.1, 20.2], [-68.1, 17.6]]
const CUBA = [[-85.3, 21.6], [-84.6, 22.9], [-82.5, 23.5], [-80.0, 23.5], [-77.0, 22.7], [-74.05, 20.45], [-74.6, 19.85], [-77.8, 19.6], [-78.3, 20.6], [-81.0, 21.4], [-83.5, 21.4]]
const JAMAICA = [[-78.6, 17.6], [-78.6, 18.7], [-76.0, 18.7], [-76.0, 17.6]]
const PUERTO_RICO = [[-67.5, 17.8], [-67.5, 18.7], [-65.1, 18.7], [-65.1, 17.8]]
const AZTEC = [[-100.6, 21.0], [-97.3, 21.5], [-96.1, 19.6], [-94.6, 18.3], [-94.2, 16.6], [-92.0, 14.4], [-93.0, 14.0], [-96.5, 15.3], [-98.9, 16.2], [-101.8, 17.4], [-101.5, 19.6]]
const INCA = [[-81.5, 1.6], [-77.0, 1.7], [-77.3, -1.5], [-78.0, -4.5], [-77.0, -7.5], [-75.0, -10.5], [-72.5, -12.0], [-70.2, -13.0], [-68.6, -15.0], [-66.8, -16.6], [-64.6, -19.0], [-64.9, -22.5], [-65.6, -26.0], [-66.9, -30.0], [-69.2, -33.5], [-70.6, -35.8], [-74.5, -36.0], [-73.0, -30.0], [-71.5, -24.0], [-71.5, -18.0], [-76.5, -14.0], [-79.8, -9.0], [-82.0, -5.0], [-82.0, -1.0]]
const NEW_SPAIN_1600 = [[-109.6, 27.2], [-105.5, 26.9], [-101.2, 26.4], [-98.5, 24.6], [-97.0, 22.5], [-95.0, 19.0], [-91.5, 18.6], [-90.5, 21.6], [-86.7, 21.7], [-87.2, 16.0], [-83.2, 15.2], [-83.0, 11.0], [-81.0, 9.0], [-77.6, 9.3], [-77.4, 7.5], [-80.0, 7.0], [-86.0, 11.5], [-92.0, 14.0], [-96.5, 15.3], [-105.5, 19.5], [-106.5, 23.0], [-109.6, 25.5]]
const FLORIDA_1600 = [[-82.9, 27.3], [-80.0, 27.3], [-80.8, 30.9], [-82.6, 30.9]]
const PERU_1600 = [[-77.4, 8.6], [-75.0, 11.6], [-71.0, 12.7], [-64.0, 11.2], [-61.5, 10.6], [-62.2, 8.4], [-67.0, 6.4], [-70.0, 4.0], [-72.0, 1.0], [-74.2, -2.0], [-74.6, -6.0], [-71.2, -10.0], [-68.0, -12.2], [-64.0, -15.2], [-60.2, -17.2], [-57.6, -20.2], [-55.6, -24.0], [-54.6, -27.0], [-56.8, -31.0], [-57.3, -35.5], [-60.0, -37.0], [-65.0, -38.2], [-71.0, -38.4], [-75.0, -38.4], [-73.5, -28.0], [-71.5, -18.0], [-76.5, -14.0], [-80.2, -8.0], [-81.6, -4.0], [-80.6, 0.0], [-79.0, 2.5], [-78.0, 6.0]]
const BRAZIL_1600 = [[-35.0, -4.5], [-38.0, -3.4], [-40.8, -5.8], [-41.3, -10.0], [-41.4, -14.0], [-42.4, -18.0], [-44.0, -21.0], [-47.4, -23.4], [-48.6, -25.6], [-46.0, -26.0], [-42.0, -24.5], [-38.5, -19.0], [-36.5, -12.0], [-33.8, -7.0]]
const SUGAR_COAST = [[-34.6, -6.2], [-36.8, -6.4], [-38.4, -9.8], [-39.6, -13.8], [-38.4, -14.6], [-36.5, -11.5], [-34.2, -8.2]]
const ENGLISH_1700 = [[-68.6, 44.2], [-69.8, 45.2], [-71.4, 45.0], [-73.3, 45.0], [-73.5, 43.5], [-74.6, 43.0], [-75.6, 42.4], [-77.5, 42.0], [-78.5, 40.5], [-79.6, 39.0], [-80.6, 37.0], [-81.6, 35.0], [-82.6, 33.5], [-81.4, 31.8], [-78.0, 32.3], [-74.0, 36.0], [-72.0, 39.5], [-68.5, 41.0], [-67.6, 44.0]]
const NEW_FRANCE_1700 = [[-56.0, 52.0], [-60.0, 50.2], [-64.0, 49.2], [-67.0, 47.6], [-69.8, 47.3], [-70.9, 46.1], [-73.3, 45.1], [-76.5, 44.3], [-79.0, 43.4], [-79.6, 42.6], [-82.0, 41.9], [-84.6, 41.0], [-86.6, 40.0], [-88.0, 38.0], [-89.5, 36.0], [-90.6, 33.0], [-91.2, 31.0], [-89.0, 29.3], [-88.4, 30.4], [-91.6, 28.8], [-94.0, 29.6], [-95.0, 33.0], [-96.0, 37.0], [-97.0, 41.0], [-95.0, 45.0], [-92.0, 48.2], [-88.0, 49.4], [-84.0, 49.0], [-80.0, 50.0], [-76.0, 50.2], [-70.0, 51.0], [-64.0, 52.0]]
const ACADIA = [[-67.2, 45.2], [-64.5, 46.3], [-60.0, 47.3], [-59.4, 45.5], [-63.0, 43.2], [-66.4, 43.2]]
const HUDSON_BAY_CO = [[-96.0, 52.0], [-86.0, 51.2], [-79.6, 51.0], [-77.0, 53.0], [-77.5, 57.0], [-80.0, 62.0], [-96.0, 62.0], [-98.0, 57.0]]
const FLORIDA_1700 = [[-87.6, 30.7], [-84.0, 30.9], [-81.4, 30.8], [-80.0, 27.0], [-80.0, 24.8], [-82.0, 24.8], [-83.0, 28.0], [-85.0, 29.4]]
const NEW_MEXICO = [[-107.6, 33.0], [-107.4, 36.9], [-105.4, 37.1], [-105.2, 34.0], [-106.2, 32.4]]
const NORTH_NEW_SPAIN_1700 = [[-112.0, 30.6], [-109.0, 31.1], [-106.5, 31.9], [-104.0, 30.1], [-101.5, 29.1], [-99.5, 27.6], [-97.3, 26.0], [-96.8, 21.5], [-106.0, 21.5], [-110.0, 24.0], [-112.0, 27.0]]
// Pacific base (lon + 360 east of 180)
const PHILIPPINES = [[116.8, 7.2], [118.8, 12.2], [119.4, 19.2], [122.6, 19.3], [126.6, 13.0], [126.7, 8.6], [123.0, 7.6], [121.0, 6.2]]
const MARIANAS = [[144.2, 12.9], [146.6, 12.9], [146.6, 20.6], [144.2, 20.6]]
const NEW_SPAIN_P = [[247.0, 28.0], [251.5, 26.6], [255.0, 26.4], [258.8, 26.4], [261.5, 24.6], [263.0, 22.5], [265.0, 19.0], [268.5, 18.6], [269.5, 21.6], [273.3, 21.7], [272.8, 16.0], [276.8, 15.2], [277.0, 11.0], [279.0, 9.0], [282.4, 9.3], [282.6, 7.5], [280.0, 7.0], [274.0, 11.5], [268.0, 14.0], [263.5, 15.3], [254.5, 19.5], [253.5, 23.0], [250.4, 25.5]]
const PERU_P = [[282.6, 8.6], [289.0, 12.7], [296.0, 11.2], [298.0, 4.0], [288.0, 1.0], [285.8, -2.0], [285.4, -6.0], [288.8, -10.0], [292.0, -12.2], [296.0, -15.2], [300.0, -17.2], [302.4, -20.2], [304.4, -24.0], [305.4, -27.0], [303.2, -31.0], [300.0, -37.0], [295.0, -38.2], [285.0, -38.4], [286.5, -28.0], [288.5, -18.0], [283.5, -14.0], [279.8, -8.0], [278.4, -4.0], [279.4, 0.0], [281.0, 2.5], [282.0, 6.0]]
const NSW_1788 = [[135.0, -10.0], [146.0, -9.6], [155.5, -25.0], [152.5, -39.5], [140.0, -40.0], [135.0, -36.0]]

// ---------- routes ----------
const COLUMBUS_1492_W = [[-55.0, 26.2], [-74.4, 24.1]]
const COLUMBUS_CUBA = [[-74.4, 24.1], [-75.6, 22.2], [-75.8, 21.2], [-74.0, 20.3], [-72.5, 20.1]]
const CORTES_SEA = [[-80.0, 21.75], [-84.9, 21.6], [-86.95, 20.5], [-87.0, 21.6], [-90.4, 21.4], [-92.6, 18.7], [-95.2, 18.8], [-96.13, 19.19]]
const CORTES_LAND = [[-96.13, 19.19], [-96.9, 19.53], [-98.24, 19.32], [-98.3, 19.06], [-99.13, 19.43]]
const PIZARRO_SEA = [[-79.52, 8.98], [-79.6, 6.5], [-80.6, 2.0], [-81.0, -1.0], [-80.45, -3.57]]
const PIZARRO_LAND = [[-80.45, -3.57], [-80.63, -5.19], [-79.6, -6.3], [-78.52, -7.16], [-77.6, -9.5], [-75.2, -11.8], [-73.7, -13.2], [-71.97, -13.53]]
const SILVER_PERU = [[-65.75, -19.58], [-70.3, -18.48], [-77.15, -12.05], [-80.5, -5.0], [-80.0, 2.0], [-79.52, 8.98]]
const SILVER_ISTHMUS = [[-79.52, 8.98], [-79.65, 9.55]]
const FLOTA = [[-79.65, 9.55], [-75.51, 10.39], [-79.5, 16.5], [-84.0, 21.0], [-82.37, 23.13], [-79.0, 26.0], [-60.0, 34.0], [-30.0, 38.5], [-8.6, 37.0], [-5.98, 37.39]]
const SILVER_MEX = [[-102.57, 22.77], [-99.13, 19.43], [-96.13, 19.19], [-89.0, 22.6], [-82.37, 23.13]]
const GALLEON_W = [[-99.88, 16.85], [-110.0, 15.0], [-119.5, 13.5]]
const CAPE_ROUTE = [[-9.14, 38.72], [-19.0, 15.0], [-12.0, -12.0], [5.0, -30.0], [18.5, -35.2], [33.0, -30.0], [42.0, -15.0], [55.0, 2.0], [70.0, 13.0], [73.83, 15.5], [76.5, 8.0], [82.0, 5.5], [95.0, 5.0], [102.25, 2.2], [106.0, 5.0], [110.0, 15.0], [113.26, 21.8]]
const SLAVES_ANGOLA = [[13.23, -8.84], [0.0, -12.0], [-20.0, -13.5], [-38.3, -13.0]]
const SLAVES_GOLD = [[-1.35, 4.6], [-15.0, 4.0], [-28.0, 0.0], [-34.7, -8.0]]
const SLAVES_CARIB = [[-1.35, 4.6], [-20.0, 8.0], [-45.0, 12.0], [-59.4, 13.1]]
const SUGAR_EUROPE = [[-38.3, -13.0], [-30.0, 0.0], [-25.0, 20.0], [-15.0, 34.0], [-9.4, 38.6]]
const MAGELLAN = [[287.0, -49.5], [283.0, -40.0], [270.0, -25.0], [240.0, -12.0], [205.0, 0.0], [175.0, 10.0], [146.2, 13.4]]
const MAGELLAN_END = [[144.79, 13.44], [130.0, 11.5], [124.6, 10.6]]
const GALLEON_WEST = [[260.12, 16.85], [235.0, 14.5], [200.0, 13.5], [165.0, 13.4], [145.6, 13.4], [134.0, 13.2], [124.5, 12.6], [121.0, 14.4]]
const GALLEON_EAST = [[121.0, 14.4], [124.0, 15.5], [133.0, 24.0], [142.0, 33.5], [160.0, 39.0], [200.0, 41.5], [228.0, 41.0], [235.6, 40.0], [242.0, 34.0], [250.0, 25.5], [255.0, 19.5], [260.12, 16.85]]
const COOK_1 = [[289.0, -49.5], [250.0, -30.0], [225.0, -20.0], [210.55, -17.5], [200.0, -25.0], [184.0, -36.0], [178.2, -38.7], [174.6, -41.0], [166.5, -40.2], [155.0, -38.0], [149.8, -37.6], [151.25, -34.0], [153.3, -28.0], [150.5, -22.0], [146.0, -16.5], [143.6, -12.5], [142.4, -10.7], [130.0, -9.5], [115.0, -9.5], [106.85, -6.2]]
const COOK_3 = [[210.55, -17.5], [205.0, -2.0], [202.0, 16.0], [204.05, 19.48], [218.0, 35.0], [233.4, 49.6], [218.0, 58.5], [195.0, 60.0], [190.0, 52.0], [200.0, 30.0], [204.05, 19.6]]
const FIRST_FLEET = [[96.0, -38.5], [115.0, -40.5], [135.0, -42.5], [146.5, -44.3], [149.5, -40.5], [151.0, -35.0], [151.21, -33.9]]

// ---------- map steps (the animated map) ----------
// view: [lonMin, latMin, lonMax, latMax] to zoom in, or null for the whole map.
const C = { spain: '#B5482A', taino: '#C99A3D', aztec: '#4E7A55', inca: '#6E5A8F', port: '#4E7A55', silver: '#6E5A8F', sea: '#2E6E9A', eng: '#B5482A', fr: '#4E7FA6', hbc: '#7A3B22', slave: '#7A3B22', brit: '#4E7FA6' }
const STEPS = [
  {
    title: 'The Spanish Caribbean, 1492–1520', chip: 'Caribbean',
    caption: 'Columbus lands in the Bahamas and makes Hispaniola his base. By 1511 Spaniards hold Puerto Rico, Jamaica and Cuba. Taíno are forced to mine gold, and smallpox arrives in 1518.',
    view: [-87, 14, -60, 30],
    lands: [{ label: 'Hispaniola', color: C.spain, polys: [HISPANIOLA], at: [-71.4, 19.0] }, { label: 'Cuba, 1511', color: C.spain, polys: [CUBA], at: [-79.2, 22.0] },
      { label: '', color: C.spain, polys: [JAMAICA, PUERTO_RICO] }],
    routes: [{ pts: COLUMBUS_1492_W, color: C.sea, dashed: true, arrow: true, label: 'Columbus, 1492', labelAt: [-63.5, 25.6] }, { pts: COLUMBUS_CUBA, color: C.sea, dashed: true, arrow: true }],
    tags: [{ text: 'Taíno homeland', at: [-70.0, 21.6] }, { text: 'Jamaica, 1509', at: [-77.3, 17.0] }, { text: 'Puerto Rico, 1508', at: [-66.2, 17.3] }, { text: 'smallpox, 1518', at: [-71.4, 16.4] }, { text: 'Florida, 1513', at: [-82.0, 28.0] }],
    cities: ['sanSalvador', 'isabela', 'santoDomingo', 'sanJuan', 'havana', 'santiagoCuba'],
  },
  {
    title: 'Conquests of Mexico and Peru, 1519–1533', chip: 'Conquests',
    caption: 'Hernán Cortés sails from Cuba, lands at Veracruz and marches inland with Tlaxcalan allies to Tenochtitlan (1519–1521). Francisco Pizarro sails from Panama and seizes the Inca ruler Atahualpa at Cajamarca (1532), then takes Cuzco (1533).',
    view: [-108, -26, -54, 28],
    lands: [{ label: 'Aztec empire', color: C.aztec, polys: [AZTEC], at: [-104.5, 23.6] }, { label: 'Inca empire', color: C.inca, polys: [INCA], at: [-87.5, -16.0] }],
    routes: [{ pts: CORTES_SEA, color: C.spain, dashed: true }, { pts: CORTES_LAND, color: C.spain, arrow: true, label: 'Cortés, 1519', labelAt: [-89.0, 24.8] },
      { pts: PIZARRO_SEA, color: C.spain, dashed: true }, { pts: PIZARRO_LAND, color: C.spain, arrow: true, label: 'Pizarro, 1532', labelAt: [-90.0, -10.0] }],
    tags: [{ text: 'smallpox, 1520', at: [-104.5, 15.6] }, { text: 'Inca civil war', at: [-72.5, -4.5] }],
    cities: ['havana', 'veracruz', 'tlaxcala', 'tenochtitlan', 'panama', 'tumbes', 'cajamarca', 'cuzco'],
  },
  {
    title: 'Iberian empires in the Americas, c. 1600', chip: 'Empires',
    caption: 'Spain rules through two viceroyalties: New Spain (capital Mexico City) and Peru (capital Lima). The Treaty of Tordesillas (1494) gives Portugal Brazil, where sugar plantations line the coast. Silver comes from Zacatecas and Potosí.',
    view: [-122, -42, -28, 36],
    lands: [{ label: 'New Spain', color: C.spain, polys: [NEW_SPAIN_1600, FLORIDA_1600, CUBA, HISPANIOLA, JAMAICA, PUERTO_RICO], at: [-95.5, 27.8] },
      { label: 'Viceroyalty of Peru', color: C.silver, polys: [PERU_1600], at: [-67.0, -29.0] }, { label: 'Portuguese Brazil', color: C.port, polys: [BRAZIL_1600], at: [-30.0, -17.5] }],
    routes: [{ pts: [[-46.6, 4.0], [-46.6, -32.0]], color: '#24303F', dashed: true, label: 'Tordesillas line, 1494', labelAt: [-46.6, 5.4] }],
    tags: [{ text: 'silver', at: [-106.4, 22.4] }, { text: 'silver', at: [-65.75, -22.6] }, { text: 'sugar', at: [-32.0, -10.0] }],
    cities: ['mexicoCity', 'zacatecas', 'havana', 'cartagena', 'panama', 'lima', 'potosi', 'buenosAires', 'salvador', 'recife'],
  },
  {
    title: 'Silver links the world, c. 1600', chip: 'Silver',
    caption: 'Treasure fleets carry American silver to Seville. From Europe, Portuguese and Dutch merchants ship it around Africa to Asia. Manila galleons carry more from Acapulco across the Pacific. Much of it ends up in China.',
    view: [-132, -45, 152, 58],
    lands: [{ label: '', color: C.spain, polys: [NEW_SPAIN_1600, CUBA, HISPANIOLA], faint: true }, { label: '', color: C.silver, polys: [PERU_1600], faint: true }],
    routes: [{ pts: SILVER_PERU, color: C.silver, dashed: true }, { pts: SILVER_ISTHMUS, color: C.silver }, { pts: SILVER_MEX, color: C.silver },
      { pts: FLOTA, color: C.silver, dashed: true, arrow: true, label: 'Treasure fleet', labelAt: [-45.0, 40.0] },
      { pts: CAPE_ROUTE, color: C.sea, dashed: true, arrow: true, label: 'Silver to Asia', labelAt: [48.0, -16.0] },
      { pts: GALLEON_W, color: C.sea, dashed: true, arrow: true, label: 'To Manila', labelAt: [-108.0, 7.5] }],
    tags: [{ text: 'Potosí silver', at: [-60.0, -24.5] }, { text: 'Spain: inflation', at: [-5.0, 44.0] }, { text: 'China: silver for silk, porcelain, tea', at: [100.0, 33.0] }, { text: 'from Acapulco', at: [129.0, 9.0] }],
    cities: ['potosi', 'lima', 'acapulco', 'havana', 'seville', 'goa', 'guangzhou', 'manilaW'],
  },
  {
    title: 'Sugar and slavery, c. 1650', chip: 'Sugar',
    caption: 'Sugar mills (engenhos) on the coast of Brazil, and later on Caribbean islands such as Barbados, ran on enslaved African labor. Ships carried captives from West Africa and Angola, and sugar back to Europe.',
    view: [-90, -36, 25, 42],
    lands: [{ label: '', color: C.port, polys: [BRAZIL_1600], faint: true }, { label: 'Sugar coast', color: C.slave, polys: [SUGAR_COAST], at: [-50.0, -6.0] }],
    routes: [{ pts: SLAVES_ANGOLA, color: C.slave, arrow: true, label: 'From Angola', labelAt: [-6.0, -15.6] }, { pts: SLAVES_GOLD, color: C.slave, arrow: true },
      { pts: SLAVES_CARIB, color: C.slave, arrow: true, label: 'From West Africa', labelAt: [-30.0, 12.0] }, { pts: SUGAR_EUROPE, color: C.sea, dashed: true, arrow: true, label: 'Sugar to Europe', labelAt: [-22.0, 24.5] }],
    tags: [{ text: 'sugar · rum', at: [-62.0, 17.5] }, { text: 'one life per ton of sugar', at: [-46.0, -17.5] }, { text: 'captives', at: [8.0, -3.0] }],
    cities: ['salvador', 'recife', 'barbados', 'lisbon', 'elmina', 'luanda'],
  },
  {
    title: 'North America, c. 1700', chip: 'North America',
    caption: 'France holds the St. Lawrence, the Great Lakes and the Mississippi and lives on the fur trade. English colonies fill the Atlantic coast and grow tobacco and rice. The Dutch New Amsterdam became English New York in 1664.',
    view: [-108, 22, -52, 56],
    lands: [{ label: 'New France', color: C.fr, polys: [NEW_FRANCE_1700, ACADIA], at: [-90.0, 44.5] }, { label: 'English colonies', color: C.eng, polys: [ENGLISH_1700], at: [-81.0, 35.6] },
      { label: 'Hudson’s Bay Co.', color: C.hbc, polys: [HUDSON_BAY_CO], at: [-87.0, 53.6] }, { label: 'Spanish', color: '#C99A3D', polys: [FLORIDA_1700, NEW_MEXICO, NORTH_NEW_SPAIN_1700], at: [-102.0, 27.0] }],
    tags: [{ text: 'beaver fur', at: [-80.0, 47.6] }, { text: 'Iroquois', at: [-76.0, 43.0] }, { text: 'tobacco', at: [-79.0, 38.6] }, { text: 'rice · indigo', at: [-84.2, 33.0] }, { text: 'Pueblo Revolt, 1680', at: [-104.0, 38.2] }],
    cities: ['quebec', 'montreal', 'portRoyal', 'plymouth', 'newYork', 'jamestown', 'charleston', 'stAugustine', 'santaFe'],
  },
  {
    title: 'The Manila galleons, 1565–1815', chip: 'Manila galleons', base: 'pacific',
    caption: 'Magellan’s fleet crossed the Pacific to Guam and the Philippines in 1521. From 1565 Spanish galleons sailed west from Acapulco to Manila (founded 1571) with silver and returned along a northern route with Chinese silk and porcelain.',
    view: null,
    lands: [{ label: 'Spanish Philippines', color: C.spain, polys: [PHILIPPINES], at: [128.0, 6.5] }, { label: '', color: C.spain, polys: [MARIANAS] },
      { label: 'New Spain', color: C.spain, polys: [NEW_SPAIN_P], at: [256.0, 26.0] }, { label: '', color: C.silver, polys: [PERU_P], faint: true }],
    routes: [{ pts: MAGELLAN, color: C.inca, dashed: true, label: 'Magellan, 1520–21', labelAt: [252.0, -22.0] }, { pts: MAGELLAN_END, color: C.inca, dashed: true, arrow: true },
      { pts: GALLEON_WEST, color: C.silver, arrow: true, label: 'Silver west', labelAt: [205.0, 10.0] }, { pts: GALLEON_EAST, color: C.sea, arrow: true, label: 'Silk and porcelain east', labelAt: [190.0, 44.5] }],
    tags: [{ text: 'Marianas: Spanish mission, 1668', at: [153.0, 23.0] }, { text: 'Chinese merchants', at: [108.0, 27.5] }],
    cities: ['manila', 'canton', 'cebu', 'guam', 'acapulcoP', 'limaP'],
  },
  {
    title: 'Oceania and Captain Cook, 1768–1788', chip: 'Oceania', base: 'pacific',
    caption: 'James Cook charted Tahiti, New Zealand and eastern Australia (1768–1771) and claimed the east coast for Britain. On his third voyage he reached Hawaiʻi (1778), where he was killed in 1779. In 1788 the First Fleet brought convicts to Sydney.',
    view: null,
    lands: [{ label: 'New South Wales', color: C.brit, polys: [NSW_1788], at: [141.0, -24.0] }],
    routes: [{ pts: COOK_1, color: C.brit, dashed: true, arrow: true, label: 'Cook’s first voyage, 1768–71', labelAt: [230.0, -32.0] },
      { pts: COOK_3, color: C.spain, dashed: true, arrow: true, label: 'Third voyage, 1776–79', labelAt: [236.0, 26.0] }, { pts: FIRST_FLEET, color: C.hbc, arrow: true, label: 'First Fleet, 1788', labelAt: [118.0, -44.5] }],
    tags: [{ text: 'Dutch sighting, 1606', at: [122.0, -14.5] }, { text: 'Cook killed, 1779', at: [184.0, 14.0] }],
    cities: ['sydney', 'batavia', 'tahiti', 'hawaii', 'nootka', 'queenCharlotte'],
  },
]

// base: the base map in src/geo; aspect: height / width of the map frame.
export default { base: 'world', aspect: 0.62, cities: CITIES, steps: STEPS }
