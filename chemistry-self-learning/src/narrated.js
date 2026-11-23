// Narrated lesson videos (made in ../math-videos, published by `node publish.mjs chem-<n>`).
// Each chapter's manifest lists the published videos and their lengths in seconds.
import chapter1 from './videos/chapter-1.json'
import chapter2 from './videos/chapter-2.json'
import chapter3 from './videos/chapter-3.json'

const MANIFESTS = { 'chapter-1': chapter1, 'chapter-2': chapter2, 'chapter-3': chapter3 }

// path: 'chapter-2/07-nuclear' → { seconds, base } or null if that video is not published.
export function videoInfo(path) {
  if (!path) return null
  const [chapter, id] = path.split('/')
  const info = MANIFESTS[chapter]?.[id]
  return info ? { ...info, base: `${import.meta.env.BASE_URL}videos/${path}` } : null
}

// Exam-review videos shown at the top of the matching worksheet tab.
export const REVIEW_VIDEOS = {
  unit2: { path: 'chapter-2/09-exam-review', title: 'Chapter 2 exam review: 8 quick questions' },
  unit3: { path: 'chapter-3/08-exam-review', title: 'Chapter 3 exam review: 8 quick questions' },
}

export const minutes = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
