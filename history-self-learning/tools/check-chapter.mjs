// Checks a chapter's content (src/chapters/ch<n>.js), its map (src/maps/ch<n>.js) and, if present, its video
// script (../math-videos/videos/hist-<n>/*.mjs). Usage: node tools/check-chapter.mjs 12 [13 ...]
import { existsSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { CHAPTER_LIST } from '../src/chapters/index.js'

const here = path.dirname(fileURLToPath(import.meta.url))
const TRACKS = ['politics', 'war', 'society', 'religion', 'world']
const BOUNDS = { mediterranean: [-11, 22, 50, 57], world: [-180, -56, 180, 78], pacific: [95, -50, 295, 62] }
let failed = false

for (const n of process.argv.slice(2).map(Number)) {
  const errs = [], warn = []
  const bad = (cond, msg) => { if (cond) errs.push(msg) }
  const meta = CHAPTER_LIST.find(c => c.n === n)
  bad(!meta, 'not in src/chapters/index.js')
  const ch = (await import(pathToFileURL(path.join(here, '..', 'src', 'chapters', `ch${n}.js`)))).default
  const map = (await import(pathToFileURL(path.join(here, '..', 'src', 'maps', `ch${n}.js`)))).default
  const str = (v, name, min = 1) => bad(typeof v !== 'string' || v.trim().length < min, `${name}: expected text`)
  const arr = (v, name, min = 1) => { bad(!Array.isArray(v) || v.length < min, `${name}: expected a list of at least ${min}`); return Array.isArray(v) ? v : [] }
  for (const k of ['n', 'title', 'short', 'era', 'part', 'question']) bad(k in ch, `${k} belongs in src/chapters/index.js, not the chapter file`)

  str(ch.hook, 'hook', 80); str(ch.apNote, 'apNote', 60); str(ch.mapSub, 'mapSub', 20)
  arr(ch.themes, 'themes', 2); arr(ch.bigIdeas, 'bigIdeas', 4)
  if (ch.video) bad(!Array.isArray(ch.video) || ch.video.length !== 3 || !/^[\w-]{11}$/.test(ch.video[0]), 'video: [11-char YouTube id, title, creator]')
  else warn.push('no outside video for step 1')
  arr(ch.zooms, 'zooms', 2).forEach((z, i) => bad(typeof z.from !== 'number' || typeof z.to !== 'number' || z.from >= z.to || !z.label, `zooms[${i}]`))

  const ids = new Set()
  arr(ch.sections, 'sections', 5).forEach((s, i) => {
    const w = `sections[${i}] (${s.id})`
    for (const k of ['id', 'title', 'when', 'theme', 'lead', 'soWhat']) str(s[k], `${w}.${k}`)
    bad(ids.has(s.id), `${w}: duplicate id`); ids.add(s.id)
    arr(s.body, `${w}.body`, 2); arr(s.facts, `${w}.facts`, 3); arr(s.chain, `${w}.chain`, 3)
    if (s.map != null) bad(!Number.isInteger(s.map) || s.map < 0 || s.map >= map.steps.length, `${w}.map: no map step ${s.map}`)
    if (s.video) bad(!Array.isArray(s.video) || s.video.length !== 3 || !/^[\w-]{11}$/.test(s.video[0]), `${w}.video: [11-char YouTube id, title, creator]`)
  })
  const labels = new Set()
  arr(ch.timeline, 'timeline', 18).forEach((e, i) => {
    const w = `timeline[${i}] (${e.label})`
    bad(!Number.isInteger(e.year), `${w}.year`); bad(e.end != null && (!Number.isInteger(e.end) || e.end < e.year), `${w}.end`)
    bad(!TRACKS.includes(e.track), `${w}.track must be one of ${TRACKS.join(', ')}`); str(e.label, `${w}.label`); str(e.detail, `${w}.detail`)
    bad(labels.has(e.label), `${w}: duplicate label`); labels.add(e.label)
    bad(e.label?.length > 38, `${w}: label over 38 characters`)
    if (!ch.zooms?.some(z => (e.end ?? e.year) >= z.from && e.year <= z.to)) warn.push(`${w} is outside every zoom`)
  })
  bad(!ch.timeline?.some(e => e.track === 'world'), 'timeline: add “Meanwhile in the world” events (track: world)')
  arr(ch.terms, 'terms', 16).forEach((t, i) => bad(!Array.isArray(t) || t.length !== 3 || t.some(x => typeof x !== 'string' || !x), `terms[${i}]: [term, meaning, why it matters]`))
  arr(ch.compare, 'compare', 1).forEach((t, i) => { str(t.title, `compare[${i}].title`); arr(t.rows, `compare[${i}].rows`, 3).forEach((r, j) => bad(r.length !== t.head?.length, `compare[${i}].rows[${j}]: ${r.length} cells but ${t.head?.length} headings`)) })
  const qs = new Set()
  arr(ch.mcq, 'mcq', 4).forEach((set, i) => {
    const w = `mcq[${i}]`
    bad(set.source?.kind !== 'text', `${w}.source.kind: 'text'`); str(set.source?.title, `${w}.source.title`); str(set.source?.text, `${w}.source.text`, 60); str(set.source?.cite, `${w}.source.cite`)
    arr(set.questions, `${w}.questions`, 2).forEach((q, j) => {
      const v = `${w}.questions[${j}]`
      str(q.q, `${v}.q`); str(q.why, `${v}.why`); bad(qs.has(q.q), `${v}: duplicate question`); qs.add(q.q)
      bad(!Array.isArray(q.options) || q.options.length !== 4, `${v}: 4 options`)
      bad(!Number.isInteger(q.correct) || q.correct < 0 || q.correct > 3, `${v}.correct: 0-3`)
      bad(new Set(q.options ?? []).size !== (q.options ?? []).length, `${v}: duplicate options`)
    })
  })
  arr(ch.saq, 'saq', 2).forEach((q, i) => { const p = arr(q.parts, `saq[${i}].parts`, 3).length; bad(q.guide?.length !== p || q.model?.length !== p, `saq[${i}]: parts, guide and model must have the same length`) })
  const leq = ch.leq ?? {}
  str(leq.prompt, 'leq.prompt'); str(leq.context, 'leq.context'); str(leq.complexity, 'leq.complexity')
  bad(arr(leq.theses, 'leq.theses', 3).filter(t => t.ok).length !== 1, 'leq.theses: exactly one ok: true')
  const sides = new Set(arr(leq.evidence, 'leq.evidence', 5).map(e => e.side)); bad(sides.size < 2, 'leq.evidence: needs two sides (e.g. change / continuity)')
  arr(ch.recall, 'recall', 5).forEach((r, i) => { str(r.q, `recall[${i}].q`); str(r.a, `recall[${i}].a`) })

  // ---------- map ----------
  const inBase = (b, [lon, lat]) => { const [a, c, d, e] = BOUNDS[b] ?? []; return lon >= a && lon <= d && lat >= c && lat <= e }
  bad(!BOUNDS[map.base], `map.base: one of ${Object.keys(BOUNDS).join(', ')}`)
  for (const [id, c] of Object.entries(map.cities ?? {})) { str(c.name, `city ${id}.name`); bad(!Array.isArray(c.at) || c.at.length !== 2, `city ${id}.at: [lon, lat]`); bad(c.side && !['left', 'right', 'below'].includes(c.side), `city ${id}.side`) }
  arr(map.steps, 'map.steps', 4).forEach((s, i) => {
    const w = `map.steps[${i}] (${s.title})`, b = s.base ?? map.base
    str(s.title, `${w}.title`); str(s.caption, `${w}.caption`, 40); bad(!BOUNDS[b], `${w}.base`)
    if (s.view) { bad(s.view.length !== 4 || s.view[0] >= s.view[2] || s.view[1] >= s.view[3], `${w}.view: [lonMin, latMin, lonMax, latMax]`); bad(!inBase(b, [s.view[0], s.view[1]]) || !inBase(b, [s.view[2], s.view[3]]), `${w}.view is outside the ${b} map`) }
    for (const l of s.lands ?? []) { bad(typeof l.color !== 'string', `${w} land ${l.label}: color`); arr(l.polys, `${w} land ${l.label}.polys`).forEach(p => bad(!Array.isArray(p) || p.length < 3, `${w} land ${l.label}: polygon with < 3 points`)); if (l.at) bad(!inBase(b, l.at), `${w} land label ${l.label} off the map`) }
    for (const r of s.routes ?? []) { bad(!Array.isArray(r.pts) || r.pts.length < 2, `${w} route: needs 2+ points`); bad((r.pts ?? []).some(p => !inBase(b, p)), `${w} route ${r.label ?? ''}: point off the ${b} map`) }
    for (const id of s.cities ?? []) { const c = map.cities?.[id]; bad(!c, `${w}: unknown city ${id}`); if (c) bad(!inBase(b, c.at), `${w}: city ${id} is off the ${b} map (Pacific map: use lon + 360 east of 180)`) }
    for (const t of s.tags ?? []) bad(!inBase(b, t.at), `${w}: tag ${t.text} off the map`)
  })

  // ---------- video script ----------
  const vdir = path.join(here, '..', '..', 'math-videos', 'videos', `hist-${n}`)
  const scripts = existsSync(vdir) ? readdirSync(vdir).filter(f => f.endsWith('.mjs')) : []
  if (!scripts.length) warn.push('no video script yet')
  for (const f of scripts) {
    const v = (await import(pathToFileURL(path.join(vdir, f)))).default
    const w = `video ${f}`
    bad(!Array.isArray(v.scenes) || v.scenes.length < 10, `${w}: at least 10 scenes`)
    const lay = Object.entries(v.layouts ?? {})
    for (const [name, l] of lay) if (l.type === 'histmap') bad(l.chapter !== n, `${w}: layout ${name} needs chapter: ${n}`)
    v.scenes?.forEach((s, i) => {
      bad(typeof s.say !== 'string' || !s.say, `${w} scene ${i}: say`)
      bad(!Number.isInteger(s.ch) || s.ch < 0 || s.ch >= (v.chapters?.length ?? 0), `${w} scene ${i}: ch must index chapters`)
      const marks = [...(s.say ?? '').matchAll(/\[\[(\d+)\]\]/g)].map(m => Number(m[1]))
      bad(marks.some((m, j) => m !== j + 1), `${w} scene ${i}: markers must be [[1]], [[2]], ... in order`)
      const used = JSON.stringify(s.view ?? {}).match(/"(?:at|landsAt|citiesAt|tagsAt)":(\d+)/g)?.map(x => Number(x.split(':')[1])) ?? []
      const ra = s.view?.routesAt ?? []
      for (const a of [...used, ...ra]) bad(a > marks.length, `${w} scene ${i}: uses marker ${a} but say has only ${marks.length}`)
      if (s.view?.kind === 'histmap') {
        bad(!v.layouts?.[s.view.layout], `${w} scene ${i}: unknown layout ${s.view.layout}`)
        bad(!Number.isInteger(s.view.step) || s.view.step < 0 || s.view.step >= map.steps.length, `${w} scene ${i}: no map step ${s.view.step}`)
      }
      bad(s.view && !['title', 'histmap', 'cards', 'chain', 'table', 'try', 'timeline', 'recap', 'lines'].includes(s.view.kind), `${w} scene ${i}: view kind ${s.view?.kind}`)
    })
  }

  const words = JSON.stringify(ch).length
  console.log(`Chapter ${n}: ${ch.sections?.length} sections, ${ch.timeline?.length} events, ${ch.terms?.length} terms, ${ch.mcq?.reduce((s, m) => s + m.questions.length, 0)} MCQs, ${map.steps?.length} map steps, ${scripts.length} video script(s), ${Math.round(words / 1000)} kB`)
  for (const w of warn) console.log(`  warning: ${w}`)
  for (const e of errs) console.log(`  ERROR: ${e}`)
  if (errs.length) failed = true
  else console.log('  OK')
}
process.exit(failed ? 1 : 0)
