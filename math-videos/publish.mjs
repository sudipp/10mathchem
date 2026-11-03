// Copies a unit's finished videos into the math site:
//   out/<unit>/<id>.{mp4,webm}  ->  ../math-self-learning/public/videos/<unit>/<id>.{mp4,webm,jpg}
// and writes ../math-self-learning/src/units/<unit>/videos.json with each video's duration.
// Usage: node publish.mjs unit-4
import { copyFileSync, existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const unit = process.argv[2]
if (!/^unit-\d+$/.test(unit ?? '')) { console.error('usage: node publish.mjs unit-<number>, e.g. unit-4'); process.exit(1) }
const here = path.dirname(fileURLToPath(import.meta.url))
const site = path.resolve(here, '..', 'math-self-learning')
const outDir = path.join(here, 'out', unit), dest = path.join(site, 'public', 'videos', unit)
const unitDir = path.join(site, 'src', 'units', unit)
if (!existsSync(outDir)) { console.error(`No rendered videos in ${outDir}`); process.exit(1) }
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
writeFileSync(path.join(unitDir, 'videos.json'), JSON.stringify(manifest, null, 1) + '\n')
console.log(`Published ${Object.keys(manifest).length} videos to ${dest}`)
