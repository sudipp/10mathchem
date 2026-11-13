// Combines the two built sites into one static folder for web hosts (e.g. Hostinger):
//   dist/index.html  <- site-host/hub.html
//   dist/chemistry/  <- chemistry-self-learning/dist
//   dist/math/       <- math-self-learning/dist
import { cp, mkdir, rm, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, '..')
const out = path.join(root, 'dist')
const sites = {
  chemistry: path.join(root, 'chemistry-self-learning', 'dist'),
  math: path.join(root, 'math-self-learning', 'dist'),
}

for (const [name, dir] of Object.entries(sites)) {
  try { await stat(path.join(dir, 'index.html')) }
  catch { throw new Error(`${name} site is not built: ${dir} is missing. Run "npm run build" in its folder first.`) }
}

await rm(out, { recursive: true, force: true })
await mkdir(out, { recursive: true })
await cp(path.join(here, 'hub.html'), path.join(out, 'index.html'))
for (const [name, dir] of Object.entries(sites)) await cp(dir, path.join(out, name), { recursive: true })
console.log(`Static site ready in ${out}`)
