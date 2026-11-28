// Narrated chapter videos (made in ../math-videos, published with `node publish.mjs hist-<n>`).
import chapter11 from './videos/chapter-11.json'

const MANIFESTS = { 11: chapter11 }

// The narrated video for a chapter: { id, seconds, base } or null until it is published.
export function chapterVideo(n) {
  const entries = Object.entries(MANIFESTS[n] ?? {})
  if (!entries.length) return null
  const [id, info] = entries[0]
  return { id, ...info, base: `${import.meta.env.BASE_URL}videos/chapter-${n}/${id}` }
}
export const minutes = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
