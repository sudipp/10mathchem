export const CHAPTERS = [
  { n: 1, title: 'Measurement & Reference Sheets' },
  { n: 2, title: 'Atomic Theory & Nuclear Chemistry' },
  { n: 3, title: 'Electron Configuration & Periodic Trends' },
  { n: 4, title: 'Lewis Structures & Nomenclature' },
]

// `lesson` is the index in the lessons array (App.jsx); Chapter 1-3 sheets name their lesson by id instead. `due` is YYYY-MM-DD.
export const WORKSHEETS = [
  { id: 'conversions', label: 'Conversion Practice', chapter: 1, lessonId: 'c1-factor' },
  { id: 'waves', label: 'Wave Calculations WS', chapter: 2, lessonId: 'c2-photon' },
  { id: 'nuclear', label: 'Nuclear Equations WS', chapter: 2, lessonId: 'c2-nuclear' },
  { id: 'halflife', label: 'Half-Life WS', chapter: 2, lessonId: 'c2-halflife' },
  { id: 'unit2', label: 'Unit 2 Exam Review', chapter: 2, lessonId: 'c2-structure' },
  { id: 'orbitals', label: 'Orbital Diagram WS', chapter: 3, lessonId: 'c3-rules' },
  { id: 'econfig', label: 'Orbital & Electron Configuration WS', chapter: 3, lessonId: 'c3-shorthand' },
  { id: 'trends', label: 'Periodic Trends WS', chapter: 3, lessonId: 'c3-radius' },
  { id: 'unit3', label: 'Unit 3 Exam Review', chapter: 3, lessonId: 'c3-longhand' },
  { id: 'vsepr', label: 'VSEPR Worksheet', chapter: 4, lesson: 5 },
  { id: 'names', label: 'Covalent Nomenclature WS', chapter: 4, lesson: 6 },
  { id: 'ionic', label: 'Type I Ionic WS', chapter: 4, lesson: 7, due: '2026-11-03' },
  { id: 'type2', label: 'Type II Ionic WS', chapter: 4, lesson: 8, due: '2026-11-10' },
  { id: 'type3', label: 'Type III WS', chapter: 4, lesson: 9, due: '2026-11-11' },
  { id: 'flowchart', label: 'Nomenclature Flowchart', chapter: 4, lesson: 10 },
]

export const chapterOf = n => CHAPTERS.find(c => c.n === n)

const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

export function dueInfo(due, now = new Date()) {
  if (!due) return null
  const [y, m, d] = due.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  const label = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  const today = iso(now)
  const when = due === today ? 'today' : due < today ? 'past' : 'upcoming'
  return { label, when, text: when === 'today' ? `Due today · ${label}` : when === 'past' ? `Was due ${label}` : `Due ${label}` }
}
