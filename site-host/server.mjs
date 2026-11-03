// Serves the Self Learning sites on the local network:
//   /            landing page
//   /chemistry/  chemistry-self-learning/dist
//   /math/       math-self-learning/dist
import { createServer } from 'node:http'
import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { networkInterfaces } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const PORT = Number(process.env.PORT ?? 8080)
const here = path.dirname(fileURLToPath(import.meta.url))
const SITES = {
  chemistry: path.resolve(here, '..', 'chemistry-self-learning', 'dist'),
  math: path.resolve(here, '..', 'math-self-learning', 'dist'),
}
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon', '.json': 'application/json',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.mp4': 'video/mp4', '.webm': 'video/webm',
}

// Range requests (HTTP 206) are required for video playback on iPad/iPhone Safari.
async function serveFile(req, res, root, relative) {
  const file = path.resolve(root, '.' + path.posix.normalize('/' + relative))
  if (!file.startsWith(root + path.sep) && file !== root) return notFound(res)
  try {
    let target = file, info = await stat(file)
    if (info.isDirectory()) { target = path.join(file, 'index.html'); info = await stat(target) }
    const ext = path.extname(target)
    const headers = {
      'Content-Type': TYPES[ext] ?? 'application/octet-stream',
      'Cache-Control': target.includes(`${path.sep}assets${path.sep}`) ? 'public, max-age=31536000, immutable' : 'no-cache',
      'Last-Modified': info.mtime.toUTCString(),
      'Accept-Ranges': 'bytes',
      'X-Content-Type-Options': 'nosniff',
    }
    const size = info.size
    const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range ?? '')
    if (range && (range[1] || range[2])) {
      let start = range[1] ? Number(range[1]) : size - Number(range[2])
      let end = range[1] && range[2] ? Math.min(Number(range[2]), size - 1) : size - 1
      start = Math.max(0, start)
      if (start > end || start >= size) {
        res.writeHead(416, { 'Content-Range': `bytes */${size}` })
        return res.end()
      }
      res.writeHead(206, { ...headers, 'Content-Range': `bytes ${start}-${end}/${size}`, 'Content-Length': end - start + 1 })
      if (req.method === 'HEAD') return res.end()
      return createReadStream(target, { start, end }).on('error', () => res.destroy()).pipe(res)
    }
    res.writeHead(200, { ...headers, 'Content-Length': size })
    if (req.method === 'HEAD') return res.end()
    createReadStream(target).on('error', () => res.destroy()).pipe(res)
  } catch {
    notFound(res)
  }
}
const notFound = res => { res.writeHead(404, { 'Content-Type': 'text/plain' }); res.end('Not found') }

createServer(async (req, res) => {
  const url = new URL(req.url, 'http://local')
  let pathname
  try { pathname = decodeURIComponent(url.pathname) } catch { return notFound(res) }
  const [, site, ...rest] = pathname.split('/')
  if (pathname === '/' || pathname === '/index.html') return serveFile(req, res, here, 'hub.html')
  if (SITES[site] && rest.length === 0) { res.writeHead(301, { Location: `/${site}/` }); return res.end() }
  if (SITES[site]) return serveFile(req, res, SITES[site], rest.join('/'))
  notFound(res)
}).listen(PORT, '0.0.0.0', () => {
  const ips = Object.values(networkInterfaces()).flat().filter(i => i.family === 'IPv4' && !i.internal).map(i => i.address)
  console.log('Self Learning sites are running. Open on any device on this network:')
  for (const ip of ips) console.log(`  http://${ip}:${PORT}/   (chemistry: /chemistry/  math: /math/)`)
  console.log('Keep this window open. Press Ctrl+C to stop.')
})
