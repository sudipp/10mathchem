// Every math unit on the site. To add a unit, create src/units/unit-N/index.jsx
// (lessons, homework, videos, day plan; see unit-4 for the shape) and list it here.
import unit4 from './unit-4/index.jsx'

export const UNITS = [unit4]

export const findUnit = slug => UNITS.find(u => u.slug === slug)
export const videoSeconds = unit => Object.values(unit.videos ?? {}).reduce((a, v) => a + v.seconds, 0)
