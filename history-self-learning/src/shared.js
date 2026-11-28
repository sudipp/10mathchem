// Shared helpers: saved progress (this device only), the chapter list and loader, and time formatting.
import { useEffect, useState } from 'react'
import { CHAPTER_LIST } from './chapters/index.js'

const CONTENT = import.meta.glob('./chapters/ch*.js')
const MAPS = import.meta.glob('./maps/ch*.js')
const BASES = import.meta.glob('./geo/*.js')

// Chapters whose content has been written, in textbook order.
export const CHAPTERS = CHAPTER_LIST.filter(c => CONTENT[`./chapters/ch${c.n}.js`] && MAPS[`./maps/ch${c.n}.js`])
export const chapterBy = n => CHAPTERS.find(c => c.n === Number(n))

// Loads a chapter's content, its map and every base map its steps use.
export async function loadChapter(n) {
  const meta = chapterBy(n)
  const [content, mapMod] = await Promise.all([CONTENT[`./chapters/ch${n}.js`](), MAPS[`./maps/ch${n}.js`]()])
  const map = mapMod.default
  const names = [...new Set([map.base, ...map.steps.map(s => s.base).filter(Boolean)])]
  const bases = await Promise.all(names.map(b => BASES[`./geo/${b}.js`]()))
  return { ...meta, ...content.default, map: { ...map, bases: Object.fromEntries(names.map((b, i) => [b, bases[i]])) } }
}
// Timeline events of every written chapter, each tagged with its chapter number.
export const loadAllTimelines = () => Promise.all(CHAPTERS.map(c => CONTENT[`./chapters/ch${c.n}.js`]()
  .then(m => m.default.timeline.map(e => ({ ...e, ch: c.n })))))


// The six parts of a lesson day, in order. `id` matches the section anchors on the chapter page.
export const DAY_STEPS = [
  { id: 'big', label: 'Big picture', mins: 5, note: 'The question, the hook and the video' },
  { id: 'timeline', label: 'Timeline', mins: 5, note: 'When it happened, and what else was going on' },
  { id: 'map', label: 'Map', mins: 5, note: 'Watch empires, routes and ideas move' },
  { id: 'lesson', label: 'Lesson', mins: 20, note: 'Short sections with cause and effect' },
  { id: 'compare', label: 'Compare & terms', mins: 10, note: 'Tables and flashcards' },
  { id: 'practice', label: 'Practice', mins: 15, note: 'AP-style questions with answers' },
]

export function useStored(key, initial) {
  const [value, setValue] = useState(() => {
    try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : initial } catch { return initial }
  })
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* storage unavailable */ } }, [key, value])
  return [value, setValue]
}

export const yearText = y => y < 0 ? `${-y} BCE` : `${y} CE`
export const spanText = (a, b) => b == null ? yearText(a) : a < 0 && b < 0 ? `${-a}–${-b} BCE` : a < 0 ? `${-a} BCE – ${b} CE` : `${a}–${b} CE`

export const TRACKS = [
  { id: 'politics', label: 'Government', color: '#2F4A7A' },
  { id: 'war', label: 'War & expansion', color: '#B5482A' },
  { id: 'society', label: 'Society & economy', color: '#B8862B' },
  { id: 'religion', label: 'Religion & ideas', color: '#4E7A55' },
  { id: 'world', label: 'Meanwhile in the world', color: '#6E5A8F' },
]

// Stable per-question shuffle so correct answers are not always the same letter.
export function shuffleQuestion(q) {
  let h = 2166136261
  for (const ch of q.q) h = Math.imul(h ^ ch.charCodeAt(0), 16777619) >>> 0
  const idx = q.options.map((_, i) => i)
  for (let i = idx.length - 1; i > 0; i--) { h = Math.imul(h ^ (h >>> 13), 1103515245) + 12345 >>> 0; const j = h % (i + 1); [idx[i], idx[j]] = [idx[j], idx[i]] }
  return { ...q, options: idx.map(i => q.options[i]), correct: idx.indexOf(q.correct) }
}
