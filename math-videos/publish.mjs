// Copies a unit's finished videos into its site:
//   math:      out/unit-N/<id>.{mp4,webm} -> ../math-self-learning/public/videos/unit-N/<id>.{mp4,webm,jpg}
//              and ../math-self-learning/src/units/unit-N/videos.json
//   chemistry: out/chem-N/<id>.{mp4,webm} -> ../chemistry-self-learning/public/videos/chapter-N/<id>.{mp4,webm,jpg}
//              and ../chemistry-self-learning/src/videos/chapter-N.json
// Each manifest records every video's duration. Usage: node publish.mjs unit-4 | chem-2
import { copyFileSync, existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const unit = process.argv[2]
if (!/^(unit|chem)-\d+$/.test(unit ?? '')) { console.error('usage: node publish.mjs unit-<number> | chem-<chapter>, e.g. unit-4 or chem-2'); process.exit(1) }
const here = path.dirname(fileURLToPath(import.meta.url))
// Math units publish to the math site; chemistry chapters (chem-N) publish to the chemistry site.
const chem = unit.startsWith('chem-')
const site = path.resolve(here, '..', chem ? 'chemistry-self-learning' : 'math-self-learning')
const slug = chem ? unit.replace('chem-', 'chapter-') : unit
const outDir = path.join(here, 'out', unit), dest = path.join(site, 'public', 'videos', slug)
const unitDir = chem ? path.join(site, 'src', 'videos') : path.join(site, 'src', 'units', unit)
if (!existsSync(outDir)) { console.error(`No rendered videos in ${outDir}`); process.exit(1) }
if (chem) mkdirSync(unitDir, { recursive: true })
if (!existsSync(unitDir)) { console.error(`No unit folder ${unitDir}. Create the unit in the site first.`); process.exit(1) }
mkdirSync(dest, { recursive: true })
const ffmpeg = execFileSync('python', ['-c', 'import imageio_ffmpeg; print(imageio_ffmpeg.get_ffmpeg_exe())']).toString().trim()

const manifest = {}
for (const file of readdirSync(outDir).filter(f => /^\d\d-.*\.mp4$/.test(f) && !f.includes('preview')).sort()) {
  const id = file.replace(/\.mp4$/, '')
  const mp4 = path.join(outDir, file), webm = path.join(outDir, `${id}.webm`)
  if (!existsSync(webm)) { console.log(`skip ${id}: no webm`); continue }
  copyFileSync(mp4, path.join(dest, `${id}.mp4`))
  copyFileSync(webm, path.join(dest, `${id}.webm`))
  execFileSync(ffmpeg, ['-y', '-loglevel', 'error', '-ss', '2.2', '-i', mp4, '-frames:v', '1', '-vf', 'scale=1280:-1', '-q:v', '3', path.join(dest, `${id}.jpg`)])
  let info = ''
  try { execFileSync(ffmpeg, ['-hide_banner', '-i', mp4], { stdio: 'pipe' }) } catch (e) { info = e.stderr.toString() }
  const [, h, m, s] = /Duration: (\d+):(\d+):([\d.]+)/.exec(info)
  manifest[id] = { seconds: Math.round(Number(h) * 3600 + Number(m) * 60 + Number(s)) }
  console.log(`${unit}/${id}: ${manifest[id].seconds}s`)
}
writeFileSync(path.join(unitDir, chem ? `${slug}.json` : 'videos.json'), JSON.stringify(manifest, null, 1) + '\n')
console.log(`Published ${Object.keys(manifest).length} videos to ${dest}`)
