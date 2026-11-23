// Chapter 1 · Lesson 3 video. Based on the Conversions & Constants reference sheet:
// °C = 5/9(°F − 32), °F = (°C × 9/5) + 32, K = °C + 273, 1 cal = 4.184 J, 1 atm = 760 torr = 101.325 kPa.
import { temperature } from '../../../chemistry-self-learning/src/measure.js'

const body = temperature(98.6, 'F', 'C').result
if (Math.abs(body - 37.0) > 0.01) throw new Error('temperature example changed')

export default {
  id: '03-temperature',
  tag: 'CHAPTER 1 · LESSON 3 · TEMPERATURE & CONSTANTS',
  chapters: ['Scales', '°F ↔ °C', 'Kelvin', 'Constants', 'Your turn', 'Recap'],
  scenes: [
    {
      ch: 0, say: 'Temperature is the one conversion that isn’t just multiplying, because the scales start at different zeros.',
      view: { kind: 'title', kicker: 'CHAPTER 1 · LESSON 3', title: 'Temperature', em: '& constants', sub: 'The rest of your reference sheet' },
    },
    {
      ch: 0, say: 'Three scales, three landmarks. [[1]]Water freezes at thirty-two Fahrenheit, zero Celsius, two seventy-three kelvin. [[2]]Water boils at two twelve Fahrenheit, one hundred Celsius, three seventy-three kelvin. [[3]]Absolute zero is zero kelvin, minus two seventy-three Celsius.',
      view: { kind: 'table', title: '°F · °C · K', rows: [
        { left: 'freezes', right: '32 °F · 0 °C · 273 K', at: 1 },
        { left: 'boils', right: '212 °F · 100 °C · 373 K', at: 2 },
        { left: 'absolute 0', right: '−460 °F · −273 °C · 0 K', at: 3 },
      ] },
    },
    {
      ch: 1, say: 'The formulas on your sheet. [[1]]Celsius equals five ninths times Fahrenheit minus thirty-two. Parentheses first! [[2]]Fahrenheit equals Celsius times nine fifths, plus thirty-two. [[3]]Body temperature, ninety-eight point six: minus thirty-two is sixty-six point six, times five ninths is thirty-seven point oh Celsius.',
      view: { kind: 'lines', lines: [
        { tex: '{}^{\\circ}\\text{C} = \\tfrac{5}{9}({}^{\\circ}\\text{F} - 32)', at: 1, box: true },
        { tex: '{}^{\\circ}\\text{F} = ({}^{\\circ}\\text{C} \\times \\tfrac{9}{5}) + 32', at: 2, box: true },
        { tex: `\\tfrac{5}{9}(98.6 - 32) = \\tfrac{5}{9}(66.6) = ${body.toFixed(1)}\\ {}^{\\circ}\\text{C}`, at: 3, glow: true },
      ] },
    },
    {
      ch: 2, say: 'Kelvin is the easy one: [[1]]kelvin equals Celsius plus two seventy-three. [[2]]Thirty-seven Celsius is three ten kelvin. [[3]]Kelvin starts at absolute zero, so it is never negative, and it has no degree sign.',
      view: { kind: 'lines', lines: [
        { tex: '\\text{K} = {}^{\\circ}\\text{C} + 273', at: 1, box: true, big: true },
        { tex: '37.0 + 273 = 310.\\ \\text{K}', at: 2 },
        { text: 'Never negative · no ° sign', at: 3, glow: true },
      ] },
    },
    {
      ch: 3, say: 'The sheet also has energy and pressure equalities. Use them as conversion factors. [[1]]One calorie equals four point one eight four joules. [[2]]One atmosphere equals seven sixty torr, seven sixty millimeters of mercury, one oh one point three two five kilopascals, or fourteen point seven p s i. [[3]]And constants for later: the speed of light, Planck’s constant, and Avogadro’s number.',
      view: { kind: 'cards', cards: [
        { head: 'Energy', text: '1 cal = 4.184 J', at: 1 },
        { head: 'Pressure', text: '1 atm = 760 torr = 760 mm Hg = 101.325 kPa = 14.7 psi', at: 2 },
        { head: 'Constants', text: 'c = 3.00 × 10⁸ m/s · h · 6.02 × 10²³', at: 3, dark: true },
      ] },
    },
    {
      ch: 3, say: 'Exam tip: [[1]]Fahrenheit to Celsius, subtract thirty-two first. [[2]]Kelvin and Celsius only differ by two seventy-three. [[3]]Gas law problems later in the year always need kelvin.',
      view: { kind: 'cards', title: 'Exam tip', cards: [
        { head: '°F → °C', text: 'subtract 32 FIRST', at: 1 },
        { head: 'K ↔ °C', text: '± 273', at: 2 },
        { head: 'Gas laws', text: 'always use K', at: 3, dark: true },
      ] },
    },
    {
      ch: 4, say: 'Your turn! Convert twenty-five degrees Celsius to kelvin, and seventy-seven Fahrenheit to Celsius.',
      countdown: 8,
      view: { kind: 'try', text: '25 °C = ? K · 77 °F = ? °C', hint: ['K = °C + 273', '°C = 5/9(°F − 32)'] },
    },
    {
      ch: 4, say: '[[1]]Twenty-five plus two seventy-three is two ninety-eight kelvin. [[2]]Seventy-seven minus thirty-two is forty-five, times five ninths is twenty-five Celsius. Room temperature!',
      view: { kind: 'lines', lines: [{ tex: '25 + 273 = 298\\ \\text{K}', at: 1 }, { tex: '\\tfrac{5}{9}(77 - 32) = \\tfrac{5}{9}(45) = 25\\ {}^{\\circ}\\text{C}', at: 2, glow: true }] },
    },
    {
      ch: 5, say: 'Recap. [[1]]Celsius equals five ninths of Fahrenheit minus thirty-two. [[2]]Kelvin equals Celsius plus two seventy-three. [[3]]Energy and pressure equalities are just conversion factors.',
      view: { kind: 'recap', items: [
        { text: '°C = 5/9(°F − 32) · °F = (°C × 9/5) + 32', at: 1 },
        { text: 'K = °C + 273 (never negative)', at: 2 },
        { text: '1 cal = 4.184 J · 1 atm = 760 torr', at: 3 },
      ] },
    },
  ],
}
