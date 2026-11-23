// Every math unit on the site. To add a unit, create src/units/unit-N/index.jsx
// (lessons, homework, videos, day plan; see unit-4 for the shape) and list it here.
import unit0 from './unit-0/index.jsx'
import unit1 from './unit-1/index.jsx'
import unit2 from './unit-2/index.jsx'
import unit3 from './unit-3/index.jsx'
import unit4 from './unit-4/index.jsx'
import unit5 from './unit-5/index.jsx'

export const UNITS = [unit0, unit1, unit2, unit3, unit4, unit5]

export const findUnit = slug => UNITS.find(u => u.slug === slug)
export const videoSeconds = unit => Object.values(unit.videos ?? {}).reduce((a, v) => a + v.seconds, 0)
