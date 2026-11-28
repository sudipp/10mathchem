// Chapter 23 map layers (longitude, latitude). Territory outlines are drawn loosely over
// the sea: the map clips every territory to the coastline, so only land frontiers need care.
// Sources for frontiers: standard historical atlases (Europe c. 1550, religions c. 1600, Europe 1648 and 1715).

const CITIES = {
  wittenberg: { name: 'Wittenberg', at: [12.65, 51.87], big: true },
  worms: { name: 'Worms', at: [8.36, 49.63], side: 'left' },
  geneva: { name: 'Geneva', at: [6.14, 46.2], side: 'left' },
  zurich: { name: 'Zürich', at: [8.54, 47.37] },
  rome: { name: 'Rome', at: [12.5, 41.9], big: true },
  trent: { name: 'Trent', at: [11.12, 46.07] },
  london: { name: 'London', at: [-0.12, 51.5], big: true, side: 'left' },
  paris: { name: 'Paris', at: [2.35, 48.86], big: true },
  versailles: { name: 'Versailles', at: [2.13, 48.8], side: 'left' },
  madrid: { name: 'Madrid', at: [-3.7, 40.42], big: true },
  lisbon: { name: 'Lisbon', at: [-9.14, 38.72] },
  brussels: { name: 'Brussels', at: [4.35, 50.85], side: 'left' },
  amsterdam: { name: 'Amsterdam', at: [4.9, 52.37], big: true },
  antwerp: { name: 'Antwerp', at: [4.4, 51.22], side: 'left' },
  vienna: { name: 'Vienna', at: [16.37, 48.2], big: true },
  prague: { name: 'Prague', at: [14.42, 50.08] },
  augsburg: { name: 'Augsburg', at: [10.9, 48.37] },
  yuste: { name: 'Yuste', at: [-5.74, 40.1], side: 'below' },
  istanbul: { name: 'Istanbul', at: [28.98, 41.01], big: true },
  munster: { name: 'Münster', at: [7.63, 51.96], side: 'below' },
  osnabruck: { name: 'Osnabrück', at: [8.05, 52.28] },
  stockholm: { name: 'Stockholm', at: [18.07, 59.33] },
  berlin: { name: 'Berlin', at: [13.4, 52.52], big: true },
  stpetersburg: { name: 'St. Petersburg', at: [30.32, 59.94], big: true },
  moscow: { name: 'Moscow', at: [37.62, 55.75], big: true },
  frombork: { name: 'Frombork: Copernicus', at: [19.68, 54.36], side: 'left' },
  padua: { name: 'Padua & Florence: Galileo', at: [11.88, 45.41] },
  florence: { name: 'Florence', at: [11.25, 43.77] },
  praguesci: { name: 'Prague: Kepler', at: [14.42, 50.08] },
  cambridge: { name: 'Cambridge: Newton', at: [0.12, 52.2], side: 'left' },
  parissalon: { name: 'Paris: salons, Voltaire, du Châtelet', at: [2.35, 48.86], side: 'below' },
  edinburgh: { name: 'Edinburgh: Adam Smith', at: [-3.19, 55.95] },
  leiden: { name: 'Leiden: Descartes', at: [4.49, 52.16] },
  konigsberg: { name: 'Königsberg: Kant', at: [20.5, 54.71] },
  batavia: { name: 'Batavia', at: [106.85, -6.2], big: true, side: 'left' },
  capetown: { name: 'Cape Town', at: [18.42, -33.92] },
  madras: { name: 'Madras', at: [80.27, 13.08] },
  surat: { name: 'Surat', at: [72.83, 21.17], side: 'left' },
  potosi: { name: 'Potosí', at: [-65.75, -19.58] },
}

// ---------- territories ----------
// Western Europe
const IRELAND = [[-11, 51.2], [-5.3, 51.7], [-5.2, 54.6], [-6.2, 55.6], [-8.6, 55.7], [-11, 54.3]]
const ENGLAND = [[-6.3, 49.8], [2.0, 50.8], [2.2, 52.7], [0.4, 53.6], [-1.4, 55.3], [-2.05, 55.8], [-2.6, 55.3], [-3.1, 54.95], [-3.6, 54.6], [-5.0, 53.8], [-5.0, 53.5], [-5.6, 52.0], [-6.3, 51.4]]
const SCOTLAND = [[-2.05, 55.8], [-2.6, 55.3], [-3.1, 54.95], [-3.6, 54.6], [-5.0, 54.5], [-5.75, 55.35], [-6.6, 55.75], [-8.0, 56.2], [-7.8, 58.7], [-3.0, 59.6], [-0.5, 60.9], [-1.0, 58.6], [-1.6, 57.4], [-2.2, 56.2]]
const PORTUGAL = [[-10.2, 36.8], [-7.4, 36.9], [-7.5, 37.6], [-7.0, 38.2], [-7.3, 39.4], [-6.9, 40.2], [-6.8, 41.0], [-6.2, 41.6], [-6.6, 41.95], [-8.2, 42.1], [-10.2, 42.2]]
const SPAIN = [[-7.4, 36.9], [-6.3, 36.2], [-5.6, 35.8], [-2.0, 36.4], [-0.5, 37.4], [0.6, 38.6], [1.0, 40.2], [3.6, 41.8], [3.2, 42.4], [0.7, 42.8], [-1.8, 43.35], [-8.0, 44.2], [-10.0, 43.4], [-8.2, 42.1], [-6.6, 41.95], [-6.2, 41.6], [-6.8, 41.0], [-6.9, 40.2], [-7.3, 39.4], [-7.0, 38.2], [-7.5, 37.6]]
const IBERIA = [[-10.2, 36.8], [-6.3, 36.2], [-5.6, 35.8], [-2.0, 36.4], [-0.5, 37.4], [0.6, 38.6], [1.0, 40.2], [3.6, 41.8], [3.2, 42.4], [0.7, 42.8], [-1.8, 43.35], [-8.0, 44.2], [-10.2, 43.4]]
const BALEARICS = [[1.0, 38.5], [4.6, 38.5], [4.6, 40.2], [1.0, 40.2]]
// France c. 1550–1600 (without Artois, Lorraine, Franche-Comté, Savoy, Alsace)
const FRANCE_1600 = [[-1.8, 43.35], [0.7, 42.8], [3.2, 42.4], [3.6, 43.0], [7.2, 43.5], [7.0, 44.3], [6.6, 45.1], [5.9, 45.7], [5.4, 46.3], [5.3, 47.3], [5.6, 47.9], [5.4, 48.6], [5.0, 49.4], [4.9, 50.0], [4.2, 50.3], [3.0, 50.2], [2.2, 50.2], [1.6, 50.9], [0.5, 50.4], [-1.6, 49.9], [-5.3, 48.9], [-4.8, 47.4], [-2.5, 46.5], [-1.6, 44.5]]
// France 1715 (adds Artois, Flanders coast, Alsace, Franche-Comté, Roussillon; Lorraine shown inside)
const FRANCE_1715 = [[-1.8, 43.35], [0.7, 42.8], [2.4, 42.35], [3.6, 42.6], [3.6, 43.0], [7.2, 43.5], [7.0, 44.3], [6.6, 45.1], [6.1, 45.9], [6.1, 46.6], [7.0, 47.4], [7.6, 47.6], [7.8, 48.5], [8.2, 49.0], [7.0, 49.2], [6.4, 49.5], [5.8, 49.6], [4.9, 50.0], [4.2, 50.3], [3.3, 50.6], [2.5, 51.1], [1.6, 51.2], [0.5, 50.4], [-1.6, 49.9], [-5.3, 48.9], [-4.8, 47.4], [-2.5, 46.5], [-1.6, 44.5]]
// The Low Countries (17 provinces) and their 1648 split
const LOW_COUNTRIES = [[1.6, 51.0], [3.4, 51.7], [4.5, 53.4], [7.0, 53.7], [7.2, 53.2], [6.8, 52.1], [6.2, 51.9], [6.1, 51.2], [6.0, 50.3], [6.4, 49.5], [5.8, 49.5], [4.9, 50.0], [4.2, 50.3], [3.0, 50.2], [2.2, 50.2]]
const DUTCH = [[3.2, 51.5], [4.3, 51.45], [5.1, 51.4], [5.9, 51.75], [6.2, 51.9], [6.8, 52.1], [7.2, 53.2], [7.0, 53.7], [4.5, 53.4], [3.2, 52.0]]
const SPANISH_NL = [[1.6, 51.0], [3.2, 51.5], [4.3, 51.45], [5.1, 51.4], [5.9, 51.75], [6.1, 51.2], [6.0, 50.3], [6.4, 49.5], [5.8, 49.5], [4.9, 50.0], [4.2, 50.3], [3.0, 50.2], [2.2, 50.2]]
const AUSTRIAN_NL = [[2.5, 51.1], [3.2, 51.5], [4.3, 51.45], [5.1, 51.4], [5.9, 51.75], [6.1, 51.2], [6.0, 50.3], [6.4, 49.5], [5.8, 49.6], [4.9, 50.0], [4.2, 50.3], [3.3, 50.6]]
const SWISS = [[6.1, 46.2], [6.9, 46.4], [7.5, 45.9], [8.4, 46.3], [9.0, 45.85], [10.1, 46.4], [10.5, 46.9], [9.6, 47.5], [8.6, 47.8], [7.6, 47.6], [7.0, 47.4], [6.1, 46.6]]
const FRANCHE_COMTE = [[5.4, 46.3], [5.3, 47.3], [5.6, 47.9], [6.9, 47.6], [7.0, 47.4], [6.1, 46.6], [5.9, 46.2]]
// Italy
const ITALY = [[7.2, 43.5], [7.0, 44.3], [6.6, 45.1], [5.9, 45.7], [5.9, 46.2], [6.9, 46.4], [7.5, 45.9], [8.4, 46.3], [9.0, 45.85], [10.1, 46.4], [10.5, 46.4], [11.2, 46.0], [12.0, 46.4], [12.7, 46.6], [13.5, 46.0], [13.7, 45.6], [13.2, 45.0], [14.2, 44.0], [16.0, 42.2], [19.0, 40.4], [18.6, 39.4], [16.2, 37.6], [15.8, 36.4], [12.0, 36.4], [7.8, 38.8], [7.8, 43.0], [9.9, 43.2], [8.0, 43.7]]
const MILAN = [[8.5, 45.0], [8.4, 46.3], [9.0, 45.85], [9.9, 46.2], [10.5, 45.3], [10.0, 44.9], [9.0, 44.7]]
const NAPLES = [[13.0, 41.2], [13.4, 41.8], [13.2, 42.5], [13.9, 42.9], [15.4, 42.5], [19.0, 40.4], [18.6, 39.4], [16.2, 37.6], [15.5, 38.2], [14.0, 40.4]]
const SICILY = [[12.0, 38.4], [15.7, 38.4], [15.8, 36.4], [12.0, 36.4]]
const SARDINIA = [[7.8, 38.7], [10.0, 38.7], [10.0, 41.3], [7.8, 41.3]]
// Central Europe
const HRE = [[2.5, 51.1], [3.4, 51.7], [4.5, 53.4], [7.0, 53.8], [8.6, 54.0], [8.9, 54.3], [10.9, 54.4], [12.5, 54.6], [14.5, 54.4], [16.5, 54.7], [17.6, 54.8], [17.0, 54.0], [16.5, 53.2], [15.6, 52.5], [16.5, 52.0], [17.5, 51.3], [18.5, 50.3], [18.8, 49.5], [17.8, 48.9], [17.0, 48.6], [16.9, 48.0], [16.5, 47.4], [16.0, 46.7], [15.6, 46.2], [15.2, 45.5], [14.5, 45.3], [13.7, 45.6], [13.5, 46.0], [12.7, 46.6], [12.0, 46.3], [11.2, 45.8], [10.5, 46.4], [10.5, 46.9], [9.6, 47.5], [8.6, 47.8], [7.6, 47.6], [7.0, 47.4], [6.1, 46.6], [5.9, 46.2], [5.4, 46.3], [5.3, 47.3], [5.6, 47.9], [5.4, 48.6], [5.0, 49.4], [4.9, 50.0], [4.2, 50.3], [3.3, 50.6]]
const GERMANY_WAR = [[5.9, 51.8], [6.8, 52.1], [7.2, 53.2], [8.6, 54.0], [10.9, 54.4], [14.5, 54.4], [16.5, 54.7], [17.6, 54.8], [17.0, 54.0], [16.5, 53.2], [15.6, 52.5], [16.5, 52.0], [17.5, 51.3], [18.5, 50.3], [18.8, 49.5], [17.8, 48.9], [16.9, 48.6], [14.8, 48.8], [13.8, 48.6], [13.0, 47.7], [10.5, 47.5], [9.6, 47.5], [8.6, 47.8], [7.6, 47.6], [7.8, 48.5], [6.4, 49.5], [6.0, 50.3], [6.1, 51.2]]
// Austrian Habsburg lands c. 1550: Austria, Tyrol, Bohemia, Silesia and Royal Hungary
const AUSTRIA_1550 = [[12.1, 50.3], [13.0, 50.4], [14.8, 50.9], [15.0, 51.4], [15.6, 52.0], [16.5, 52.0], [17.5, 51.3], [18.5, 50.3], [18.8, 49.5], [20.0, 49.3], [21.5, 49.0], [22.4, 48.6], [21.5, 48.3], [20.0, 47.9], [19.0, 47.8], [18.0, 47.2], [17.0, 46.4], [16.2, 45.6], [15.6, 45.0], [15.0, 44.8], [14.5, 45.3], [13.7, 45.6], [13.5, 46.0], [12.7, 46.6], [12.0, 46.3], [11.2, 45.8], [10.5, 46.4], [10.5, 46.9], [9.6, 47.5], [10.5, 47.5], [12.9, 47.6], [13.0, 48.2], [13.8, 48.8], [12.5, 49.6]]
// Habsburg monarchy 1715: adds all of Hungary and Transylvania (1699)
const AUSTRIA_1715 = [[12.1, 50.3], [13.0, 50.4], [14.8, 50.9], [15.0, 51.4], [15.6, 52.0], [16.5, 52.0], [17.5, 51.3], [18.5, 50.3], [18.8, 49.5], [20.0, 49.3], [21.5, 49.0], [22.5, 49.1], [23.0, 48.0], [24.5, 47.8], [25.5, 47.2], [26.0, 46.3], [25.6, 45.5], [23.0, 45.4], [21.5, 45.0], [20.3, 45.0], [19.0, 44.9], [17.5, 45.1], [16.2, 45.2], [15.6, 45.0], [15.0, 44.8], [14.5, 45.3], [13.7, 45.6], [13.5, 46.0], [12.7, 46.6], [12.0, 46.3], [11.2, 45.8], [10.5, 46.4], [10.5, 46.9], [9.6, 47.5], [10.5, 47.5], [12.9, 47.6], [13.0, 48.2], [13.8, 48.8], [12.5, 49.6]]
// Brandenburg-Prussia c. 1715 (Brandenburg, Farther Pomerania, East Prussia)
const BRANDENBURG = [[11.3, 53.1], [12.2, 53.3], [13.8, 53.5], [14.6, 53.5], [14.8, 54.1], [16.5, 54.6], [17.6, 54.8], [17.0, 54.0], [16.5, 53.2], [15.7, 52.6], [15.6, 52.0], [14.7, 51.6], [13.5, 51.6], [12.3, 51.9], [11.2, 52.4]]
const EAST_PRUSSIA = [[19.5, 54.4], [21.2, 55.7], [22.8, 55.0], [22.8, 54.4], [22.0, 53.6], [20.0, 53.2], [19.3, 53.6]]
// Scandinavia
const DENMARK = [[8.0, 54.3], [10.9, 54.3], [12.0, 54.4], [13.0, 55.0], [14.5, 55.3], [15.8, 56.0], [15.6, 56.3], [14.0, 56.6], [13.0, 57.1], [11.9, 57.7], [11.0, 58.0], [8.0, 57.4]]
const NORWAY = [[4.0, 58.0], [7.0, 57.7], [10.5, 58.6], [11.4, 59.1], [12.2, 60.0], [12.5, 61.0], [12.1, 62.5], [12.2, 63.5], [14.0, 65.0], [16.0, 68.0], [20.0, 69.0], [29.0, 70.0], [31.0, 71.0], [20.0, 71.5], [10.0, 66.0], [4.0, 62.0]]
const SWEDEN_1600 = [[11.9, 57.7], [13.0, 57.1], [14.0, 56.6], [15.6, 56.3], [16.6, 56.6], [19.5, 57.4], [19.6, 59.6], [18.5, 60.6], [17.5, 62.5], [21.0, 64.0], [25.0, 65.8], [24.0, 68.0], [20.0, 69.0], [16.0, 68.0], [14.0, 65.0], [12.2, 63.5], [12.1, 62.5], [12.5, 61.0], [12.2, 60.0], [11.4, 59.1]]
const SWEDEN_1715 = [[12.6, 56.1], [12.8, 55.4], [14.5, 55.3], [15.8, 56.0], [16.6, 56.6], [19.5, 57.4], [19.6, 59.6], [18.5, 60.6], [17.5, 62.5], [21.0, 64.0], [25.0, 65.8], [24.0, 68.0], [20.0, 69.0], [16.0, 68.0], [14.0, 65.0], [12.2, 63.5], [12.1, 62.5], [12.5, 61.0], [12.2, 60.0], [11.4, 59.1], [11.0, 57.9]]
const FINLAND = [[20.5, 60.0], [23.0, 59.7], [27.0, 60.3], [29.3, 61.0], [30.2, 62.5], [29.8, 64.0], [29.6, 66.0], [28.5, 69.0], [25.0, 68.5], [24.0, 66.0], [25.0, 65.6], [22.0, 63.6], [21.0, 62.0]]
const FINLAND_1715 = [[20.5, 60.0], [23.0, 59.7], [27.0, 60.3], [28.4, 60.6], [29.6, 61.4], [30.2, 62.5], [29.8, 64.0], [29.6, 66.0], [28.5, 69.0], [25.0, 68.5], [24.0, 66.0], [25.0, 65.6], [22.0, 63.6], [21.0, 62.0]]
const ESTONIA_LIVONIA = [[21.0, 57.4], [22.0, 59.3], [24.0, 59.7], [28.1, 59.5], [27.6, 58.0], [27.6, 57.5], [26.3, 57.5], [24.2, 57.2], [22.5, 57.6]]
const COURLAND = [[21.0, 56.1], [21.0, 57.4], [22.5, 57.6], [24.2, 57.2], [26.3, 57.5], [27.6, 57.5], [28.2, 56.2], [26.6, 55.7], [24.0, 56.3], [22.0, 56.4]]
const SWEDISH_POMERANIA = [[12.3, 54.2], [12.8, 54.9], [14.5, 54.5], [14.7, 53.5], [14.0, 53.3], [12.6, 53.6]]
const BREMEN_VERDEN = [[8.4, 53.0], [8.3, 53.9], [9.2, 54.0], [9.9, 53.6], [9.6, 52.9]]
// Eastern Europe
const POLAND_1600 = [[16.5, 53.2], [17.0, 54.0], [17.6, 54.8], [19.5, 54.4], [20.0, 53.2], [22.0, 53.6], [22.8, 54.4], [22.8, 55.0], [21.2, 55.7], [21.0, 56.1], [22.0, 56.4], [24.0, 56.3], [26.6, 55.7], [28.2, 56.2], [30.5, 55.8], [31.0, 55.0], [32.0, 54.0], [32.4, 53.0], [33.5, 52.2], [34.5, 51.0], [34.8, 49.6], [33.0, 48.3], [30.5, 47.8], [29.6, 47.4], [28.2, 48.3], [26.6, 48.3], [24.5, 48.0], [23.0, 49.0], [22.5, 49.1], [21.5, 49.0], [20.0, 49.3], [18.8, 49.5], [18.5, 50.3], [17.5, 51.3], [16.5, 52.0], [15.6, 52.5]]
const RUSSIA_1600 = [[28.2, 56.2], [27.6, 57.5], [27.6, 58.0], [28.1, 59.5], [29.3, 61.0], [30.2, 62.5], [29.8, 64.0], [29.6, 66.0], [28.5, 69.0], [33.0, 70.0], [52.0, 69.0], [52.0, 48.0], [40.0, 48.0], [36.5, 49.0], [34.8, 49.6], [34.5, 51.0], [33.5, 52.2], [32.4, 53.0], [32.0, 54.0], [31.0, 55.0], [30.5, 55.8]]
const RUSSIA_1715 = [[30.5, 55.8], [28.2, 56.2], [27.6, 57.5], [26.3, 57.5], [24.2, 57.2], [22.5, 57.6], [21.0, 57.4], [22.0, 59.3], [24.0, 59.7], [28.1, 59.5], [28.4, 60.6], [29.6, 61.4], [30.2, 62.5], [29.8, 64.0], [29.6, 66.0], [28.5, 69.0], [33.0, 70.0], [52.0, 69.0], [52.0, 48.5], [44.0, 49.5], [41.0, 49.0], [39.0, 49.5], [37.0, 49.3], [35.0, 48.6], [33.0, 48.3], [30.6, 48.6], [30.1, 50.0], [30.6, 51.3], [31.0, 52.0], [31.3, 53.0], [30.8, 54.0], [30.8, 55.0]]
// Ottoman Empire with vassals (Transylvania, Wallachia, Moldavia, Crimea)
const OTTOMAN = [[15.0, 44.8], [15.6, 45.0], [16.2, 45.6], [17.0, 46.4], [18.0, 47.2], [19.0, 47.8], [20.0, 47.9], [21.5, 48.3], [22.4, 48.6], [23.0, 48.0], [24.5, 48.0], [26.6, 48.3], [28.2, 48.3], [29.6, 47.4], [30.5, 47.8], [33.0, 47.4], [35.5, 47.0], [38.5, 47.2], [39.6, 46.6], [38.0, 45.6], [37.6, 44.8], [40.0, 43.5], [41.5, 41.6], [52.0, 41.2], [52.0, 33.0], [26.0, 33.0], [19.0, 39.5], [19.3, 41.5], [18.5, 42.4], [17.5, 43.0], [16.0, 43.6]]

// ---------- religions c. 1600 ----------
const LUTHERAN_GERMANY = [[7.0, 53.7], [8.6, 54.0], [8.9, 54.3], [10.9, 54.3], [12.5, 54.6], [14.5, 54.4], [16.5, 54.7], [19.5, 54.4], [21.2, 55.7], [22.8, 55.0], [22.8, 54.4], [22.0, 53.6], [20.0, 53.2], [17.0, 54.0], [16.5, 53.2], [15.6, 52.5], [16.5, 52.0], [17.5, 51.3], [18.5, 50.3], [18.8, 49.5], [17.8, 48.9], [17.0, 48.6], [16.0, 48.8], [14.8, 48.9], [13.8, 48.8], [12.5, 49.6], [12.1, 50.3], [11.0, 50.3], [10.0, 50.5], [9.4, 50.0], [8.7, 50.5], [8.8, 51.6], [8.6, 52.5], [7.8, 53.0], [7.2, 53.2]]
const SWISS_REFORMED = [[6.1, 46.2], [6.9, 46.4], [7.5, 46.3], [8.0, 46.6], [8.4, 46.8], [8.6, 47.2], [9.0, 47.5], [9.6, 47.5], [8.6, 47.8], [7.6, 47.6], [7.0, 47.4], [6.1, 46.6]]
const SWISS_CATHOLIC = [[6.9, 46.4], [7.5, 46.3], [8.0, 46.6], [8.4, 46.8], [8.6, 47.2], [9.0, 47.5], [9.6, 47.5], [10.5, 46.9], [10.1, 46.4], [9.0, 45.85], [8.4, 46.3], [7.5, 45.9]]
const HUNGARY_REFORMED = [[16.5, 46.6], [17.2, 48.0], [18.8, 48.3], [20.0, 48.6], [21.5, 48.8], [22.5, 48.3], [23.0, 48.0], [24.5, 47.8], [25.5, 47.2], [26.0, 46.3], [25.6, 45.5], [23.0, 45.4], [21.5, 45.0], [20.3, 45.0], [19.0, 45.5], [18.0, 45.8], [17.0, 46.3]]
const CATHOLIC_CENTRAL = [[1.6, 51.0], [3.2, 51.5], [4.3, 51.45], [5.1, 51.4], [5.9, 51.75], [6.8, 52.1], [7.2, 53.2], [7.8, 53.0], [8.6, 52.5], [8.8, 51.6], [8.7, 50.5], [9.4, 50.0], [10.0, 50.5], [11.0, 50.3], [12.1, 50.3], [12.5, 49.6], [13.8, 48.8], [14.8, 48.9], [16.0, 48.8], [17.0, 48.6], [17.8, 48.9], [18.8, 49.5], [20.0, 49.3], [21.5, 49.0], [21.5, 48.8], [20.0, 48.6], [18.8, 48.3], [17.2, 48.0], [16.5, 46.6], [17.0, 46.3], [16.2, 45.6], [15.6, 45.0], [15.0, 44.8], [14.0, 45.2], [13.7, 45.6], [13.5, 46.0], [12.7, 46.6], [12.0, 46.4], [11.2, 46.0], [10.5, 46.4], [10.1, 46.4], [10.5, 46.9], [9.6, 47.5], [8.6, 47.8], [7.6, 47.6], [7.0, 47.4], [6.1, 46.6], [5.9, 46.2], [5.4, 46.3], [5.3, 47.3], [5.6, 47.9], [5.4, 48.6], [5.0, 49.4], [4.9, 50.0], [4.2, 50.3], [3.0, 50.2], [2.2, 50.2]]
const POLAND_CATHOLIC = [[16.5, 53.2], [17.0, 54.0], [20.0, 53.2], [22.0, 53.6], [22.8, 54.4], [22.8, 55.0], [21.2, 55.7], [21.0, 56.1], [22.0, 56.4], [24.0, 56.3], [26.6, 55.7], [26.0, 54.5], [25.0, 53.0], [24.0, 52.0], [24.0, 50.5], [23.5, 49.5], [22.5, 49.1], [21.5, 49.0], [20.0, 49.3], [18.8, 49.5], [18.5, 50.3], [17.5, 51.3], [16.5, 52.0], [15.6, 52.5]]
const ORTHODOX_EAST = [[26.6, 55.7], [28.2, 56.2], [27.6, 57.5], [27.6, 58.0], [28.1, 59.5], [29.3, 61.0], [30.2, 62.5], [29.8, 64.0], [29.6, 66.0], [28.5, 69.0], [52.0, 69.0], [52.0, 47.5], [39.0, 47.2], [35.0, 46.8], [33.0, 46.5], [30.5, 46.0], [29.6, 46.5], [28.2, 48.3], [26.6, 48.3], [24.5, 47.8], [23.0, 48.0], [22.5, 48.3], [22.5, 49.1], [23.5, 49.5], [24.0, 50.5], [24.0, 52.0], [25.0, 53.0], [26.0, 54.5]]
const ORTHODOX_BALKANS = [[15.0, 44.8], [15.6, 45.0], [16.2, 45.6], [17.0, 46.3], [18.0, 45.8], [19.0, 45.5], [20.3, 45.0], [21.5, 45.0], [23.0, 45.4], [25.6, 45.5], [26.0, 46.3], [25.5, 47.2], [24.5, 47.8], [26.6, 48.3], [28.2, 48.3], [29.6, 46.5], [30.5, 46.0], [29.5, 44.0], [28.3, 42.0], [26.4, 41.9], [26.6, 40.4], [26.0, 39.5], [27.0, 35.0], [22.0, 35.5], [19.0, 39.5], [19.3, 41.5], [18.5, 42.4], [17.5, 43.0], [16.0, 43.6]]
const ISLAM_ANATOLIA = [[26.4, 41.9], [28.3, 42.0], [29.5, 41.5], [35.0, 42.3], [41.5, 41.6], [52.0, 41.2], [52.0, 35.0], [36.0, 35.5], [30.0, 35.8], [27.3, 36.6], [26.0, 39.5], [26.6, 40.4]]

// ---------- routes ----------
const SPREAD = [
  { pts: [[12.65, 51.87], [11.5, 55.0], [12.6, 55.7]], color: '#4E7FA6', arrow: true },
  { pts: [[12.65, 51.87], [15.5, 56.5], [18.07, 59.33]], color: '#4E7FA6', arrow: true },
  { pts: [[12.65, 51.87], [17.0, 53.6], [20.5, 54.71]], color: '#4E7FA6', arrow: true },
  { pts: [[6.14, 46.2], [4.0, 49.5], [4.9, 52.2]], color: '#6E5A8F', arrow: true },
  { pts: [[6.14, 46.2], [1.0, 51.5], [-3.2, 55.9]], color: '#6E5A8F', arrow: true },
  { pts: [[6.14, 46.2], [2.5, 45.0], [0.3, 44.2]], color: '#6E5A8F', arrow: true },
  { pts: [[6.14, 46.2], [14.0, 47.2], [21.6, 47.5]], color: '#6E5A8F', arrow: true },
]
const ARMADA = [[-9.14, 38.72], [-10.5, 42.5], [-6.5, 48.0], [-2.0, 50.0], [1.8, 51.0], [3.0, 54.5], [-0.5, 59.2], [-6.5, 59.0], [-11.0, 55.0], [-11.0, 51.5], [-9.0, 44.5], [-8.4, 43.5]]
const SWEDES = [[18.07, 59.33], [16.5, 56.2], [13.8, 54.2], [12.4, 51.4], [11.0, 49.5]]
const FRENCH_IN = [[2.35, 48.86], [5.5, 48.6], [7.7, 48.6]]
const VOC = [[4.9, 52.37], [3.0, 51.8], [1.5, 51.0], [-3.0, 49.8], [-7.0, 48.5], [-12.0, 42.0], [-14.0, 30.0], [-22.0, 10.0], [-15.0, -15.0], [10.0, -36.0], [18.42, -34.3], [40.0, -38.0], [80.0, -36.0], [100.0, -15.0], [106.85, -6.2]]
const EIC = [[-0.12, 51.5], [1.2, 51.0], [-3.0, 49.5], [-8.0, 47.5], [-14.0, 40.0], [-18.0, 30.0], [-25.0, 5.0], [-12.0, -20.0], [15.0, -37.0], [30.0, -36.0], [45.0, -22.0], [56.0, -5.0], [68.0, 15.0], [72.83, 21.17]]
const POTATO = [[-65.75, -19.58], [-72.0, -15.0], [-78.0, -5.0], [-79.5, 9.0], [-65.0, 20.0], [-45.0, 32.0], [-20.0, 38.0], [-6.29, 36.53]]

// ---------- map steps (the animated map) ----------
// view: [lonMin, latMin, lonMax, latMax] to zoom in, or null for the whole map.
const C = { catholic: '#C99A3D', lutheran: '#4E7FA6', calvin: '#6E5A8F', anglican: '#B5482A', orthodox: '#4E7A55', islam: '#7A3B22',
  habsburg: '#B5482A', france: '#2E6E9A', ottoman: '#4E7A55', hre: '#C99A3D', dutch: '#6E5A8F', swede: '#4E7FA6' }
const EUROPE = [-12, 35, 45, 62], CLOSE = [-11, 36, 32, 60]
const STEPS = [
  {
    title: 'The Reformation begins, 1517', chip: 'Reformation',
    caption: 'In 1517 Martin Luther posts his Ninety-Five Theses in Wittenberg. Printed copies spread his ideas across Germany and north to Scandinavia (blue); from Geneva, John Calvin’s followers carry reform to France, the Netherlands, Scotland and Hungary (purple).',
    view: CLOSE,
    routes: SPREAD,
    tags: [{ text: 'Luther, 1517', at: [12.6, 50.9] }, { text: 'Zwingli', at: [9.6, 48.1] }, { text: 'Calvin', at: [6.0, 45.2] }, { text: 'Huguenots', at: [-1.5, 44.6] }],
    cities: ['wittenberg', 'worms', 'geneva', 'zurich', 'rome', 'trent', 'london', 'paris', 'stockholm'],
  },
  {
    title: 'Religions of Europe, c. 1600', chip: 'Divided faith',
    caption: 'By 1600 western Christendom is split. Lutheran north Germany and Scandinavia, Calvinist Scotland, Netherlands, Switzerland and Hungary, an Anglican England, a Catholic south, and an Orthodox east. Bohemia is mostly Protestant, which matters in 1618.',
    view: EUROPE,
    lands: [
      { label: 'Catholic', color: C.catholic, polys: [IRELAND, IBERIA, BALEARICS, FRANCE_1600, CATHOLIC_CENTRAL, SWISS_CATHOLIC, ITALY, POLAND_CATHOLIC], at: [0.0, 45.0] },
      { label: 'Lutheran', color: C.lutheran, polys: [LUTHERAN_GERMANY, DENMARK, NORWAY, SWEDEN_1600, FINLAND, ESTONIA_LIVONIA, COURLAND], at: [15.6, 61.0] },
      { label: 'Calvinist', color: C.calvin, polys: [SCOTLAND, DUTCH, SWISS_REFORMED, HUNGARY_REFORMED], at: [23.8, 46.5] },
      { label: 'Anglican', color: C.anglican, polys: [ENGLAND], at: [-2.2, 53.9] },
      { label: 'Orthodox', color: C.orthodox, polys: [ORTHODOX_EAST, ORTHODOX_BALKANS], at: [36.5, 54.0] },
      { label: 'Islam', color: C.islam, polys: [ISLAM_ANATOLIA], at: [36.0, 38.6] },
    ],
    cities: ['rome', 'wittenberg', 'geneva', 'london', 'prague'],
  },
  {
    title: 'Charles V’s Habsburg lands, c. 1550', chip: 'Charles V',
    caption: 'Through marriages, Emperor Charles V inherits Spain, the Netherlands, much of Italy, Austria and the Americas. He tries to make the Holy Roman Empire a strong center, but German princes, France and the Ottomans block him. In 1556 he gives up and retires to a monastery at Yuste.',
    view: EUROPE,
    lands: [
      { label: 'Holy Roman Empire', color: C.hre, polys: [HRE], at: [9.4, 52.7], faint: true },
      { label: 'Habsburg lands', color: C.habsburg, polys: [SPAIN, BALEARICS, LOW_COUNTRIES, FRANCHE_COMTE, MILAN, NAPLES, SICILY, SARDINIA, AUSTRIA_1550], at: [-4.0, 37.9] },
      { label: 'France', color: C.france, polys: [FRANCE_1600], at: [1.0, 46.8] },
      { label: 'Ottoman Empire', color: C.ottoman, polys: [OTTOMAN], at: [33.0, 39.3] },
    ],
    tags: [{ text: 'Vienna besieged, 1529', at: [20.5, 49.8] }, { text: 'and the Americas', at: [-5.5, 46.0] }, { text: 'Peace of Augsburg, 1555', at: [11.5, 47.2] }],
    cities: ['madrid', 'brussels', 'vienna', 'augsburg', 'yuste', 'paris', 'istanbul', 'rome'],
  },
  {
    title: 'Wars of religion, 1562–1648', chip: 'Wars',
    caption: 'France fights a civil war between Catholics and Huguenots (1562–1598). Philip II’s Armada fails against England (1588) and the Dutch break free of Spain. Then the Thirty Years’ War (1618–1648) turns Germany into Europe’s battlefield.',
    view: EUROPE,
    lands: [
      { label: 'Thirty Years’ War', color: '#B5482A', polys: [GERMANY_WAR], at: [14.5, 53.9] },
      { label: 'Dutch', color: C.dutch, polys: [DUTCH], at: [3.6, 53.6] },
      { label: 'Spain', color: C.catholic, polys: [IBERIA, SPANISH_NL], at: [-5.0, 37.9] },
      { label: 'France', color: C.france, polys: [FRANCE_1600], at: [0.6, 46.6] },
    ],
    routes: [
      { pts: ARMADA, color: '#7A3B22', dashed: true, arrow: true, label: 'Armada, 1588', labelAt: [-6.8, 46.4] },
      { pts: SWEDES, color: C.swede, arrow: true, label: 'Sweden, 1630', labelAt: [19.4, 57.4] },
      { pts: FRENCH_IN, color: C.france, arrow: true },
    ],
    tags: [{ text: 'Defenestration of Prague, 1618', at: [15.0, 49.2] }, { text: 'Huguenot wars', at: [0.6, 45.4] }, { text: '≈ ⅓ of Germans die', at: [11.5, 48.0] }],
    cities: ['prague', 'paris', 'london', 'madrid', 'amsterdam', 'stockholm'],
  },
  {
    title: 'Europe after the Peace of Westphalia, 1648', chip: 'Westphalia',
    caption: 'The peace treaties signed at Münster and Osnabrück end the Thirty Years’ War. Europe becomes a system of sovereign states. The Dutch Republic and the Swiss Confederation are independent, Sweden wins Baltic lands, and the empire breaks into about 300 nearly independent states.',
    view: EUROPE,
    lands: [
      { label: 'Holy Roman Empire', color: C.hre, polys: [HRE], at: [12.6, 49.9], faint: true },
      { label: 'France', color: C.france, polys: [FRANCE_1600], at: [1.0, 46.8] },
      { label: 'Spain', color: C.habsburg, polys: [SPAIN, BALEARICS, SPANISH_NL, FRANCHE_COMTE, MILAN, NAPLES, SICILY, SARDINIA], at: [-4.5, 38.0] },
      { label: 'Portugal', color: C.orthodox, polys: [PORTUGAL], at: [-9.2, 40.6] },
      { label: 'Dutch Rep.', color: C.dutch, polys: [DUTCH], at: [3.0, 53.8] },
      { label: 'Swiss', color: C.dutch, polys: [SWISS], at: [8.0, 46.6] },
      { label: 'Sweden', color: C.swede, polys: [SWEDEN_1600, FINLAND, ESTONIA_LIVONIA, SWEDISH_POMERANIA, BREMEN_VERDEN], at: [15.4, 61.2] },
      { label: 'Austria', color: C.habsburg, polys: [AUSTRIA_1550], at: [15.6, 47.4] },
      { label: 'Poland–Lithuania', color: C.catholic, polys: [POLAND_1600, COURLAND], at: [25.6, 52.6] },
      { label: 'Russia', color: C.dutch, polys: [RUSSIA_1600], at: [40.0, 52.0] },
      { label: 'Ottoman Empire', color: C.ottoman, polys: [OTTOMAN], at: [33.0, 39.3] },
      { label: 'England', color: '#7A3B22', polys: [ENGLAND, SCOTLAND, IRELAND], at: [-2.0, 52.4] },
    ],
    cities: ['munster', 'osnabruck', 'paris', 'madrid', 'vienna', 'stockholm', 'moscow'],
  },
  {
    title: 'Absolutism and new powers, c. 1715', chip: 'New powers',
    caption: 'Absolute monarchs (red) rule France from Versailles, Russia from Peter the Great’s new St. Petersburg, plus Prussia and Austria. Britain and the Dutch Republic (blue) share power with parliaments.',
    view: EUROPE,
    lands: [
      { label: 'France: Louis XIV', color: C.habsburg, polys: [FRANCE_1715], at: [1.2, 46.6] },
      { label: 'Spain (Bourbon)', color: C.habsburg, polys: [SPAIN, BALEARICS], at: [-4.0, 40.0], faint: true },
      { label: 'Russia: Peter I', color: C.habsburg, polys: [RUSSIA_1715], at: [38.0, 51.0] },
      { label: 'Prussia', color: '#7A3B22', polys: [BRANDENBURG, EAST_PRUSSIA], at: [16.4, 53.7] },
      { label: 'Austria', color: '#7A3B22', polys: [AUSTRIA_1715, AUSTRIAN_NL, MILAN, NAPLES, SARDINIA], at: [19.6, 46.4] },
      { label: 'Great Britain', color: C.france, polys: [ENGLAND, SCOTLAND, IRELAND], at: [-4.0, 55.2] },
      { label: 'Dutch Rep.', color: C.france, polys: [DUTCH], at: [3.4, 54.0] },
      { label: '', color: C.swede, polys: [SWEDEN_1715, FINLAND_1715, SWEDISH_POMERANIA], faint: true },
    ],
    tags: [{ text: 'absolute monarchy', at: [37.0, 61.4] }, { text: 'absolute monarchy', at: [-1.0, 44.8] }, { text: 'constitutional', at: [-7.5, 50.4] }],
    cities: ['versailles', 'stpetersburg', 'moscow', 'berlin', 'vienna', 'london', 'amsterdam'],
  },
  {
    title: 'Early capitalism goes global, 1600–1800', chip: 'Capitalism',
    caption: 'Joint-stock companies, the English East India Company (1600) and the Dutch VOC (1602), raise money from investors and send fleets to Asia. Amsterdam and London grow into banking centers, while American crops like the potato feed Europe’s growing population.',
    view: [-85, -42, 115, 64],
    routes: [
      { pts: VOC, color: C.dutch, dashed: true, arrow: true, label: 'VOC (Dutch), 1602', labelAt: [62.0, -40.0] },
      { pts: EIC, color: '#B5482A', dashed: true, arrow: true, label: 'East India Co. (English), 1600', labelAt: [-50.0, 5.0] },
      { pts: POTATO, color: '#4E7A55', arrow: true, label: 'silver · potato', labelAt: [-50.0, 27.0] },
    ],
    tags: [{ text: 'stock exchange, 1602', at: [22.0, 57.0] }, { text: 'Bank of England, 1694', at: [-28.0, 46.5] }, { text: 'spices', at: [100.0, 4.5] }, { text: 'cotton · tea', at: [70.0, 27.5] }, { text: 'silver', at: [-62.0, -24.5] }],
    cities: ['amsterdam', 'london', 'capetown', 'batavia', 'surat', 'madras', 'potosi'],
  },
  {
    title: 'The Scientific Revolution and the Enlightenment, 1543–1789', chip: 'New ideas',
    caption: 'New ideas came from all over Europe: Copernicus in Poland, Kepler in Prague, Galileo in Italy, Descartes in the Dutch Republic, Newton in England. In the 1700s Paris became the center of the Enlightenment.',
    view: CLOSE,
    cities: ['frombork', 'praguesci', 'padua', 'cambridge', 'parissalon', 'leiden', 'edinburgh', 'konigsberg'],
    tags: [{ text: 'sun-centered universe, 1543', at: [21.0, 56.4] }, { text: 'telescope, 1609–10', at: [13.2, 43.8] }, { text: 'Principia, 1687', at: [-3.4, 53.8] }, { text: 'Encyclopédie, 1751', at: [-0.4, 46.6] }, { text: 'planetary laws, 1609', at: [17.4, 49.2] }],
  },
]

// base: the base map in src/geo; aspect: height / width of the map frame.
export default { base: 'world', aspect: 0.62, cities: CITIES, steps: STEPS }
