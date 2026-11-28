// History · Chapter 23 video: The Transformation of Europe. Follows the class chapter notes
// (Bentley & Ziegler, Traditions & Encounters 5e, ch. 23). Maps come from the history site (src/geo).
export default {
  id: '01-transforming-europe',
  tag: 'WORLD HISTORY · CHAPTER 23 · TRANSFORMING EUROPE',
  chapters: ['Reformation', 'Wars', 'States', 'Kings', 'Economy', 'Science', 'Exam tip', 'Your turn', 'Recap'],
  layouts: { map: { type: 'histmap', chapter: 23 } },
  scenes: [
    {
      ch: 0, say: 'In fifteen hundred, western Europe had one church, and most people believed the earth stood still at the center of the universe. By eighteen hundred, both ideas were gone. How did Europe change so much? Let’s find out.',
      view: { kind: 'title', kicker: 'CHAPTER 23 · 1500 – 1800 CE', title: 'Europe:', em: 'faith, kings and reason', sub: 'The Transformation of Europe' },
    },
    {
      ch: 0, say: 'By fifteen hundred, many Europeans were angry at the church. [[1]]Popes lived like princes, and the church was rich and deep in politics. [[2]]It sold indulgences: pardons for sin, in return for money. [[3]]And ordinary believers wanted a more personal connection with God.',
      view: { kind: 'cards', title: 'Roots of reform', cards: [
        { head: 'Wealth & power', text: 'popes act like princes; corruption and greed', at: 1 },
        { head: 'Indulgences', text: 'pardons for sin sold for donations', at: 2 },
        { head: 'Personal faith', text: 'people want a closer link to God', at: 3, dark: true },
      ] },
    },
    {
      ch: 0, say: 'In fifteen seventeen, a monk named Martin Luther writes his Ninety-Five Theses in Wittenberg, attacking indulgences. [[1]]The new printing press spreads his ideas across Germany and north to Scandinavia. [[2]]From Geneva, John Calvin’s followers carry reform to France, the Netherlands, Scotland and Hungary.',
      view: { kind: 'histmap', layout: 'map', step: 0, citiesAt: 0, routesAt: [1, 1, 1, 2, 2, 2, 2], tagsAt: 1, side: [{ text: 'Luther, 1517', at: 0, strong: true }, { text: 'Printing spreads it', at: 1 }, { text: 'Calvin in Geneva', at: 2 }] },
    },
    {
      ch: 0, say: 'Luther’s big ideas: [[1]]the Bible alone is the authority, not the pope. [[2]]People are saved by faith, not by payments or good works. [[3]]In England, Henry the Eighth breaks with Rome in fifteen thirty-four, after the pope refuses him a divorce.',
      view: { kind: 'cards', title: 'A new kind of Christianity', cards: [
        { head: 'The Bible alone', text: 'not the pope or church tradition', at: 1 },
        { head: 'Faith alone', text: 'salvation is not bought or earned', at: 2 },
        { head: 'England, 1534', text: 'Henry VIII heads the Church of England', at: 3, dark: true },
      ] },
    },
    {
      ch: 0, say: 'The Catholic Church fights back with its own reform. [[1]]The Council of Trent, from fifteen forty-five to fifteen sixty-three, defends Catholic teaching but ends the worst abuses. [[2]]Ignatius Loyola founds the Jesuits, who run strong schools and become the church’s best missionaries. [[3]]And the Inquisition hunts Protestants in Spain.',
      view: { kind: 'cards', title: 'The Catholic Reformation', cards: [
        { head: 'Council of Trent', text: '1545–1563: keep doctrine, end abuses', at: 1 },
        { head: 'Jesuits', text: 'schools and missionaries, approved 1540', at: 2 },
        { head: 'Inquisition', text: 'hunts Protestants in Spain', at: 3, dark: true },
      ] },
    },
    {
      ch: 0, say: 'By sixteen hundred, Europe is split. [[1]]Lutherans in north Germany and Scandinavia. Calvinists in Scotland, the Netherlands, Switzerland and Hungary. Anglicans in England. Catholics in the south, and Orthodox Christians in the east.',
      view: { kind: 'histmap', layout: 'map', step: 1, landsAt: 1, citiesAt: 1, side: [{ text: 'Europe c. 1600', at: 0, strong: true }, { text: 'Protestant north, Catholic south', at: 1 }] },
    },
    {
      ch: 1, say: 'Division brings fear and violence. About forty-five thousand people, mostly women, are executed as witches. [[1]]France fights religious civil wars. [[2]]In fifteen eighty-eight, Spain’s Armada tries to conquer Protestant England, and fails. [[3]]Then in sixteen eighteen, the Thirty Years’ War begins in Bohemia and turns Germany into a battlefield. Perhaps a third of Germans die.',
      view: { kind: 'histmap', layout: 'map', step: 3, landsAt: 1, citiesAt: 0, routesAt: [2, 3, 3], tagsAt: 3, side: [{ text: 'Wars of religion', at: 0, strong: true }, { text: 'Armada fails, 1588', at: 2 }, { text: 'Thirty Years’ War, 1618–1648', at: 3 }] },
    },
    {
      ch: 2, say: 'Why didn’t Europe become one big empire, like China? [[1]]Emperor Charles the Fifth inherits Spain, the Netherlands, much of Italy, Austria and the Americas. [[2]]But German princes, France and the Ottomans all fight him. In fifteen fifty-six he gives up and retires to a monastery.',
      view: { kind: 'histmap', layout: 'map', step: 2, landsAt: 1, citiesAt: 1, tagsAt: 2, side: [{ text: 'Charles V, 1519–1556', at: 1, strong: true }, { text: 'Princes, France, Ottomans resist', at: 2 }] },
    },
    {
      ch: 2, say: 'In sixteen forty-eight, the Peace of Westphalia ends the war. [[1]]Europe becomes a system of sovereign, equal states, each in charge of its own religion. [[2]]The Dutch Republic and the Swiss are independent, and the empire breaks into about three hundred states. With no emperor in charge, states balance against each other.',
      view: { kind: 'histmap', layout: 'map', step: 4, landsAt: 1, citiesAt: 0, side: [{ text: 'Peace of Westphalia, 1648', at: 0, strong: true }, { text: 'Sovereign, equal states', at: 1 }, { text: 'Balance of power', at: 2 }] },
    },
    {
      ch: 2, say: 'How do these states grow strong? [[1]]New monarchs find new taxes: Henry the Eighth takes monastery lands, and French kings tax sales and salt. [[2]]In Spain, the Inquisition, founded in fourteen seventy-eight, frightens nobles into obedience. [[3]]And states race to build bigger armies and better weapons.',
      view: { kind: 'cards', title: 'Building stronger states', cards: [
        { head: 'New taxes', text: 'fees, monastery lands, taxes on salt and sales', at: 1 },
        { head: 'Inquisition, 1478', text: 'enforces Catholic unity in Spain', at: 2 },
        { head: 'Armies', text: 'a constant arms race between states', at: 3, dark: true },
      ] },
    },
    {
      ch: 3, say: 'By seventeen fifteen, there are two ways to run a strong state. [[1]]Absolute monarchs rule France, Russia, Prussia and Austria. [[2]]But Britain and the Dutch Republic share power with parliaments.',
      view: { kind: 'histmap', layout: 'map', step: 5, landsAt: 1, citiesAt: 1, tagsAt: 2, side: [{ text: 'Europe c. 1715', at: 0, strong: true }, { text: 'Absolutism: red', at: 1 }, { text: 'Constitutional: blue', at: 2 }] },
    },
    {
      ch: 3, say: 'Absolutism rests on the divine right of kings: kings answer only to God. [[1]]In France, Louis the Fourteenth, the Sun King, builds Versailles and makes great nobles live at court. [[2]]In Russia, Peter the Great builds a modern army, bans beards, and founds Saint Petersburg in seventeen oh three.',
      view: { kind: 'cards', title: 'Absolute monarchs', cards: [
        { head: 'Divine right', text: 'kings answer only to God', at: 0 },
        { head: 'Louis XIV', text: 'Versailles keeps nobles close and busy', at: 1 },
        { head: 'Peter the Great', text: 'westernizes Russia · St. Petersburg, 1703', at: 2, dark: true },
      ] },
    },
    {
      ch: 3, say: 'England goes the other way. [[1]]King Charles the First tries to tax without Parliament. [[2]]Civil war breaks out, and in sixteen forty-nine the king is beheaded. [[3]]The monarchy returns in sixteen sixty. [[4]]Then in the Glorious Revolution of sixteen eighty-eight, Parliament replaces James the Second with William and Mary, who share power with Parliament.',
      view: { kind: 'chain', title: 'England: toward shared power', items: [
        { text: 'Charles I taxes without Parliament', at: 1 }, { text: 'Civil war; king beheaded, 1649', at: 2 },
        { text: 'Monarchy restored, 1660', at: 3 }, { text: 'Glorious Revolution, 1688: shared power', at: 4 },
      ] },
    },
    {
      ch: 4, say: 'Meanwhile, [[1]]potatoes from the Americas help Europe’s population grow, from about eighty-one million to one hundred eighty million. [[2]]Joint-stock companies, like the Dutch V O C and the English East India Company, sell shares to investors and send fleets to Asia. This is early capitalism: private owners and free markets.',
      view: { kind: 'histmap', layout: 'map', step: 6, citiesAt: 0, routesAt: [2, 2, 1], tagsAt: 2, side: [{ text: 'Population grows', at: 1 }, { text: 'Joint-stock companies', at: 2, strong: true }] },
    },
    {
      ch: 5, say: 'And Europeans rethink the universe. [[1]]In fifteen forty-three, Copernicus puts the sun at the center. Kepler and Galileo back him up. [[2]]Newton explains it all with laws of motion and gravity. [[3]]In the seventeen hundreds, Enlightenment thinkers like Locke and Voltaire use reason to question kings and the church.',
      view: { kind: 'histmap', layout: 'map', step: 7, citiesAt: 1, tagsAt: 2, side: [{ text: 'Scientific Revolution', at: 1, strong: true }, { text: 'Newton’s laws, 1687', at: 2 }, { text: 'Enlightenment: reason', at: 3 }] },
    },
    {
      ch: 6, say: 'Exam tip: AP loves to compare absolutism with constitutional government. [[1]]In France and Russia, the monarch rules alone, by divine right. [[2]]In England and the Dutch Republic, power is shared with a parliament, which must approve taxes. [[3]]But both kinds of state built bigger armies, bureaucracies and tax systems.',
      view: { kind: 'table', title: 'Absolutism vs constitutionalism', rows: [
        { left: 'Absolutism', right: 'France, Russia: the king rules alone, by divine right', at: 1 },
        { left: 'Constitutional', right: 'England, Dutch Republic: power shared with parliament', at: 2 },
        { left: 'Taxes', right: 'set by the king vs approved by Parliament', at: 2 },
        { left: 'Same', right: 'both build armies, bureaucracies, tax systems', at: 3 },
      ] },
    },
    {
      ch: 7, say: 'Your turn! Explain one way the Catholic Church responded to the Protestant Reformation. Use a specific example.',
      countdown: 12,
      view: { kind: 'try', text: 'Explain ONE way the Catholic Church responded to the Protestant Reformation.', hint: ['Name the response', 'Explain what it did', 'Give an example'] },
    },
    {
      ch: 7, say: 'Here is a strong answer. [[1]]The church called the Council of Trent, from fifteen forty-five to fifteen sixty-three. [[2]]It defended Catholic teaching, like the authority of the pope. [[3]]But it banned selling indulgences for profit, so the church could answer Protestant criticism without changing its core beliefs.',
      view: { kind: 'chain', title: 'A full-credit answer', items: [{ text: 'Council of Trent, 1545–1563', at: 1 }, { text: 'Defends doctrine and the pope', at: 2 }, { text: 'Ends abuses like selling indulgences', at: 3 }] },
    },
    {
      ch: 8, say: 'The whole chapter on one line. [[1]]Luther’s theses, fifteen seventeen. [[2]]Council of Trent, fifteen forty-five. [[3]]The Armada, fifteen eighty-eight. [[4]]Thirty Years’ War, sixteen eighteen. [[5]]Westphalia, sixteen forty-eight. [[6]]Glorious Revolution, sixteen eighty-eight. [[7]]Adam Smith’s Wealth of Nations, seventeen seventy-six.',
      view: { kind: 'timeline', range: [1490, 1800], ticks: [1500, 1600, 1700, 1800], events: [
        { year: 1517, date: '1517', label: 'Luther’s theses', at: 1, color: '#4E7A55' }, { year: 1545, date: '1545', label: 'Trent', at: 2, color: '#4E7A55' },
        { year: 1588, date: '1588', label: 'Armada', at: 3, color: '#B5482A' }, { year: 1618, date: '1618', label: '30 Years’ War', at: 4, color: '#B5482A' },
        { year: 1648, date: '1648', label: 'Westphalia', at: 5, color: '#2F4A7A' }, { year: 1688, date: '1688', label: 'Glorious Rev.', at: 6, color: '#2F4A7A' },
        { year: 1776, date: '1776', label: 'Wealth of Nations', at: 7, color: '#C99A3D' },
      ] },
    },
    {
      ch: 8, say: 'Recap. [[1]]The Reformation split western Christianity, and the Catholic Reformation answered it. [[2]]Religious wars ended with Westphalia and a Europe of sovereign states. [[3]]Kings built strong states, by absolutism or by sharing power with parliaments. [[4]]And capitalism and science changed how Europeans lived and thought. Now try the practice questions on the site!',
      view: { kind: 'recap', items: [
        { text: 'Reformation splits the church; Trent and the Jesuits answer.', at: 1 },
        { text: 'Wars of religion → Westphalia, 1648: sovereign states.', at: 2 },
        { text: 'Absolutism (France, Russia) vs constitutionalism (England).', at: 3 },
        { text: 'Capitalism, science and the Enlightenment remake Europe.', at: 4 },
      ] },
    },
  ],
}
