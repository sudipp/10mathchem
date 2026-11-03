export const CHAPTERS = [
  { n: 4, title: 'Lewis Structures & Nomenclature' },
]

// `lesson` is the index in the lessons array (App.jsx). `due` is YYYY-MM-DD.
export const WORKSHEETS = [
  { id: 'vsepr', label: 'VSEPR Worksheet', chapter: 4, lesson: 5 },
  { id: 'names', label: 'Covalent Nomenclature WS', chapter: 4, lesson: 6 },
  { id: 'ionic', label: 'Type I Ionic WS', chapter: 4, lesson: 7, due: '2026-11-03' },
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
