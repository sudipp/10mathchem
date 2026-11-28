// History · Chapter 14 video: The Resurgence of Empire in East Asia (Sui, Tang, Song; Korea, Vietnam, Japan).
// Follows the class chapter notes (Bentley & Ziegler, Traditions & Encounters 5e, ch. 14). Maps come from the history site (src/geo).
export default {
  id: '01-east-asia',
  tag: 'WORLD HISTORY · CHAPTER 14 · EMPIRE IN EAST ASIA',
  chapters: ['Sui & Tang', 'Song', 'Economy', 'Society', 'Beliefs', 'Neighbors', 'Exam tip', 'Your turn', 'Recap'],
  layouts: { map: { type: 'histmap', chapter: 14 } },
  scenes: [
    {
      ch: 0, say: 'After the Han fell, China was split apart for more than three hundred fifty years. Then three dynasties rebuilt it, and made it the richest place on Earth. Why did Korea, Vietnam and Japan copy so much of it?',
      view: { kind: 'title', kicker: 'CHAPTER 14 · 589 – 1279 CE', title: 'East Asia:', em: 'Sui, Tang and Song', sub: 'The Resurgence of Empire in East Asia' },
    },
    {
      ch: 0, say: '[[1]]In five eighty-nine, a general named Yang Jian reunites north and south China. His Sui dynasty works people hard. [[2]]Conscripted laborers dig the Grand Canal, about two thousand kilometers long, so rice from the south can feed the north. [[3]]But forced labor and failed wars in Korea spark rebellion, and the Sui fall in six eighteen.',
      view: { kind: 'histmap', layout: 'map', step: 0, landsAt: 1, citiesAt: 1, routesAt: [2, 2, 2, 3], tagsAt: 2, side: [{ text: '589: China reunited', at: 1, strong: true }, { text: 'Grand Canal ≈ 2,000 km', at: 2 }, { text: 'Forced labor → revolt, 618', at: 3 }] },
    },
    {
      ch: 0, say: 'The Tang dynasty keeps the unity and rules better. [[1]]From its capital Chang’an, the largest city in the world, it reaches deep into Central Asia along the Silk Roads. [[2]]In seven fifty-one, an Abbasid army stops it at the Talas River.',
      view: { kind: 'histmap', layout: 'map', step: 1, landsAt: 0, citiesAt: 1, routesAt: [1], tagsAt: 2, side: [{ text: 'Tang, 618–907', at: 0, strong: true }, { text: 'Capital: Chang’an', at: 1 }, { text: 'Talas River, 751', at: 2 }] },
    },
    {
      ch: 0, say: 'How did the Tang hold it all together? [[1]]Emperor Taizong keeps taxes low and order strong. [[2]]The equal-field system hands out farmland by family size. [[3]]Civil-service exams on the Confucian classics choose officials by merit. [[4]]And neighbors send tribute and kowtow to the emperor of the Middle Kingdom.',
      view: { kind: 'cards', title: 'How the Tang ruled', cards: [
        { head: 'Taizong', text: 'r. 626–649 · law, order, low taxes', at: 1 },
        { head: 'Equal-field', text: '20% inherited, 80% redistributed', at: 2 },
        { head: 'Exams', text: 'Confucian classics → government jobs', at: 3, dark: true },
        { head: 'Tribute', text: 'gifts and the kowtow to the emperor', at: 4 },
      ] },
    },
    {
      ch: 0, say: 'Then the emperor neglects government for music and his favorite consort. [[1]]In seven fifty-five, a frontier general, An Lushan, rebels and takes both capitals. [[2]]The emperor flees. [[3]]The Tang win only by hiring Uighur horsemen, who loot the cities. The dynasty limps on until nine oh seven.',
      view: { kind: 'histmap', layout: 'map', step: 2, landsAt: 0, citiesAt: 0, routesAt: [1, 2, 3], side: [{ text: 'An Lushan rebels, 755', at: 1, strong: true }, { text: 'Uighur help, then looting', at: 3 }, { text: 'Tang ends, 907', at: 3 }] },
    },
    {
      ch: 1, say: 'In nine sixty, the Song dynasty reunites China. [[1]]Its founder, Song Taizu, was a general himself, so he puts scholars in charge instead. [[2]]Exams become the main road to office, and the bureaucracy grows huge. [[3]]But the army is weak, and the Song pay the northern Liao and Xi Xia silver and silk to keep the peace.',
      view: { kind: 'cards', title: 'Song: scholars over soldiers', cards: [
        { head: 'Song Taizu', text: 'r. 960–976 · favors civil officials', at: 1 },
        { head: 'Exam bureaucracy', text: 'huge, educated, expensive', at: 2 },
        { head: 'Weak army', text: 'pays Liao and Xi Xia to keep peace', at: 3, dark: true },
      ] },
    },
    {
      ch: 1, say: '[[1]]In eleven twenty-seven, the Jurchen of Manchuria, who call their dynasty the Jin, capture the Song capital Kaifeng. [[2]]The court flees south to Hangzhou. This Southern Song rules until the Mongols conquer it in twelve seventy-nine.',
      view: { kind: 'histmap', layout: 'map', step: 4, landsAt: 0, citiesAt: 0, routesAt: [1, 2], tagsAt: 2, side: [{ text: 'Jurchen take the north, 1127', at: 1, strong: true }, { text: 'Southern Song at Hangzhou', at: 2 }, { text: 'Mongols, 1279', at: 2 }] },
    },
    {
      ch: 2, say: 'Yet the Song are rich. [[1]]Fast-ripening Champa rice, from Vietnam, gives two harvests a year. [[2]]Canals carry food to the cities, [[3]]and workshops turn out porcelain, silk, tea and iron. [[4]]Ships from Quanzhou and Guangzhou trade with Southeast Asia, India and the Islamic world.',
      view: { kind: 'histmap', layout: 'map', step: 5, landsAt: 0, citiesAt: 0, routesAt: [1, 2, 4, 4, 4], tagsAt: 3, side: [{ text: 'Champa rice', at: 1, strong: true }, { text: 'Goods for the world', at: 3 }, { text: 'Sea trade', at: 4 }] },
    },
    {
      ch: 2, say: 'This is the Song commercial revolution, one link at a time. [[1]]Champa rice and better tools mean more food. [[2]]China’s population passes one hundred million. [[3]]Cities boom: Hangzhou has more than a million people. [[4]]Trade grows so fast that copper coins run short, [[5]]so merchants use letters of credit, and then the government prints paper money.',
      view: { kind: 'chain', title: 'The Song commercial revolution', items: [
        { text: 'Champa rice, iron plows, irrigation', at: 1 }, { text: 'Population passes 100 million', at: 2 }, { text: 'Cities boom: Hangzhou > 1 million', at: 3 },
        { text: 'Trade grows; coins run short', at: 4 }, { text: 'Flying cash → government paper money', at: 5 },
      ] },
    },
    {
      ch: 2, say: 'Song China is also the world’s workshop of invention. [[1]]Porcelain, so famous we still call it china. [[2]]Iron furnaces burning coal and coke. [[3]]Gunpowder and the magnetic compass. [[4]]And printing, with woodblocks and, by the ten forties, movable type.',
      view: { kind: 'cards', title: 'Tang and Song technology', cards: [
        { head: 'Porcelain', text: '“chinaware” for export', at: 1 },
        { head: 'Iron', text: 'coal and coke instead of charcoal', at: 2 },
        { head: 'Gunpowder · compass', text: 'weapons and navigation', at: 3 },
        { head: 'Printing', text: 'woodblocks; movable type by the 1040s', at: 4, dark: true },
      ] },
    },
    {
      ch: 3, say: 'Families become more patriarchal. [[1]]Ancestor worship grows more elaborate, and filial piety, honoring your parents, is the core virtue. [[2]]Foot binding spreads among elite women, crippling them and keeping them at home. [[3]]Yet one woman, Wu Zhao, rules China as emperor in her own name, from six ninety to seven oh five.',
      view: { kind: 'cards', title: 'Family and gender', cards: [
        { head: 'Ancestors', text: 'grave rituals · filial piety', at: 1 },
        { head: 'Foot binding', text: 'status for elites; women confined', at: 2, dark: true },
        { head: 'Wu Zhao', text: 'rules as emperor, 690–705', at: 3 },
      ] },
    },
    {
      ch: 4, say: 'After the Han fell, many Chinese turned to Buddhism. [[1]]Monks and merchants carried it from India across the Silk Roads to Dunhuang, with its cave temples, and on to Chang’an. [[2]]From China it spread to Korea and Japan.',
      view: { kind: 'histmap', layout: 'map', step: 6, landsAt: 0, citiesAt: 0, routesAt: [1, 2], tagsAt: 1, side: [{ text: 'Mahayana Buddhism', at: 0, strong: true }, { text: 'Dunhuang caves', at: 1 }, { text: 'On to Korea & Japan', at: 2 }] },
    },
    {
      ch: 4, say: 'But Buddhism clashes with Chinese values. [[1]]Monks give up marriage, while Confucians say having sons and honoring parents is a duty. [[2]]So Buddhists adapt, with the Chan, or Zen, and Pure Land schools. [[3]]In the eight forties the Tang close thousands of monasteries and seize their land. [[4]]Then the Song thinker Zhu Xi blends Confucian ethics with Buddhist ideas, creating Neo-Confucianism.',
      view: { kind: 'chain', title: 'Buddhism and Confucianism', items: [
        { text: 'Celibate monks vs filial piety', at: 1 }, { text: 'Buddhism adapts: Chan (Zen), Pure Land', at: 2 },
        { text: '840s: monasteries closed, land seized', at: 3 }, { text: 'Neo-Confucianism: Zhu Xi (1130–1200)', at: 4 },
      ] },
    },
    {
      ch: 5, say: 'China’s neighbors watch closely. [[1]]Envoys, monks and students from Korea, Japan and Vietnam travel to the Tang court. [[2]]They bring home Chinese writing, Confucian ideas and Buddhism.',
      view: { kind: 'histmap', layout: 'map', step: 7, landsAt: 0, citiesAt: 0, routesAt: [1, 1, 1], tagsAt: 2, side: [{ text: 'Envoys to Chang’an', at: 1, strong: true }, { text: 'Writing · Confucianism · Buddhism', at: 2 }] },
    },
    {
      ch: 5, say: 'But each one borrows differently. [[1]]Silla Korea accepts tribute status, yet governs itself. [[2]]Vietnam takes Chinese culture but hates Chinese rule, and wins independence in nine thirty-nine. [[3]]Japan is never invaded. It copies Tang government by choice and keeps Shinto. After eleven eighty-five, a shogun and his samurai hold real power.',
      view: { kind: 'cards', title: 'Borrowing on their own terms', cards: [
        { head: 'Korea (Silla)', text: 'tributary, but self-governing', at: 1 },
        { head: 'Vietnam', text: 'Chinese culture; independent 939', at: 2 },
        { head: 'Japan', text: 'copies by choice · Shinto · shogun', at: 3, dark: true },
      ] },
    },
    {
      ch: 6, say: 'Exam tip: AP Unit one point one loves this comparison. [[1]]All three neighbors adopted Chinese writing, Confucianism and Buddhism. [[2]]Korea stayed closest to China, as a tributary state. [[3]]Vietnam fought Chinese political control. [[4]]Japan borrowed by choice and kept its own traditions.',
      view: { kind: 'table', title: 'Korea, Vietnam, Japan', rows: [
        { left: 'All three', right: 'Chinese writing · Confucianism · Buddhism', at: 1 },
        { left: 'Korea', right: 'tributary to China, but self-governing', at: 2 },
        { left: 'Vietnam', right: 'resisted Chinese rule; independent 939', at: 3 },
        { left: 'Japan', right: 'never conquered; kept Shinto; shoguns', at: 4 },
      ] },
    },
    {
      ch: 7, say: 'Your turn! Explain one way Champa rice changed Song China. Use a specific example.',
      countdown: 12,
      view: { kind: 'try', text: 'Explain ONE way Champa rice changed Song China.', hint: ['Name the change', 'Explain how', 'Give an example'] },
    },
    {
      ch: 7, say: 'Here is a strong answer. [[1]]Champa rice ripened fast, so farmers grew two crops a year. [[2]]More food let the population grow past one hundred million. [[3]]So cities like Hangzhou grew to more than a million people, and trade boomed.',
      view: { kind: 'chain', title: 'A full-credit answer', items: [{ text: 'Champa rice: two crops a year', at: 1 }, { text: 'Population passes 100 million', at: 2 }, { text: 'Hangzhou > 1 million; trade booms', at: 3 }] },
    },
    {
      ch: 8, say: 'The whole chapter on one line. [[1]]Sui reunite China, five eighty-nine. [[2]]Tang founded, six eighteen. [[3]]An Lushan rebels, seven fifty-five. [[4]]Tang ends, nine oh seven. [[5]]Song founded, nine sixty. [[6]]Jurchen take the north, eleven twenty-seven. [[7]]Mongols conquer the Song, twelve seventy-nine.',
      view: { kind: 'timeline', range: [560, 1310], ticks: [600, 700, 800, 900, 1000, 1100, 1200, 1300], events: [
        { year: 589, date: '589', label: 'Sui unite China', at: 1, color: '#2F4A7A' }, { year: 618, date: '618', label: 'Tang', at: 2, color: '#2F4A7A' },
        { year: 755, date: '755', label: 'An Lushan', at: 3, color: '#B5482A' }, { year: 907, date: '907', label: 'Tang ends', at: 4, color: '#B5482A' },
        { year: 960, date: '960', label: 'Song', at: 5, color: '#2F4A7A' }, { year: 1127, date: '1127', label: 'Southern Song', at: 6, color: '#B5482A' },
        { year: 1279, date: '1279', label: 'Mongols', at: 7, color: '#B5482A' },
      ] },
    },
    {
      ch: 8, say: 'Recap. [[1]]The Sui reunified China and dug the Grand Canal; the Tang ruled with exams and tribute. [[2]]The Song put scholars over soldiers, and lost the north to nomads. [[3]]Champa rice, paper money and sea trade made a commercial revolution. [[4]]And Korea, Vietnam and Japan borrowed Chinese ideas in their own ways. Now try the practice questions on the site!',
      view: { kind: 'recap', items: [
        { text: 'Sui: reunion + Grand Canal. Tang: exams, equal-field, tribute.', at: 1 },
        { text: 'Song: scholar-officials, weak army; Jurchen take the north (1127).', at: 2 },
        { text: 'Champa rice → population → cities → paper money.', at: 3 },
        { text: 'Korea, Vietnam, Japan adopt and adapt Chinese models.', at: 4 },
      ] },
    },
  ],
}
