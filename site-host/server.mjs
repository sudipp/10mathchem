// Serves the combined static site (the root dist/ folder made by "npm run build") on the local network.
// Mirrors site-host/public/.htaccess, which applies the same rules on Hostinger:
//   - "Accept: text/markdown" gets a page's index.md where one exists
//   - every response carries a Link header pointing at /llms.txt
import { createServer } from 'node:http'
import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { networkInterfaces } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const PORT = Number(process.env.PORT ?? 8080)
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist')
const LINK = '</llms.txt>; rel=describedby'
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon', '.json': 'application/json',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.mp4': 'video/mp4', '.webm': 'video/webm',
}

const notFound = res => { res.writeHead(404, { 'Content-Type': 'text/plain', Link: LINK }); res.end('Not found') }
const isFile = file => stat(file).then(info => info.isFile(), () => false)

// Range requests (HTTP 206) are required for video playback on iPad/iPhone Safari.
async function serveFile(req, res, target, info) {
  const ext = path.extname(target)
  const headers = {
    'Content-Type': TYPES[ext] ?? 'application/octet-stream',
    'Cache-Control': target.includes(`${path.sep}assets${path.sep}`) ? 'public, max-age=31536000, immutable' : 'no-cache',
    'Last-Modified': info.mtime.toUTCString(),
    'Accept-Ranges': 'bytes',
    'X-Content-Type-Options': 'nosniff',
    Link: LINK,
    ...(ext === '.html' || ext === '.md' ? { Vary: 'Accept' } : {}),
  }
  const size = info.size
  const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range ?? '')
  if (range && (range[1] || range[2])) {
    let start = range[1] ? Number(range[1]) : size - Number(range[2])
    const end = range[1] && range[2] ? Math.min(Number(range[2]), size - 1) : size - 1
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
}

createServer(async (req, res) => {
  let pathname
  try { pathname = decodeURIComponent(new URL(req.url, 'http://local').pathname) } catch { return notFound(res) }
  // Hidden files such as .htaccess are never served, matching Apache.
  if (pathname.split('/').some(part => part.startsWith('.'))) return notFound(res)
  const file = path.resolve(ROOT, '.' + path.posix.normalize('/' + pathname))
  if (!file.startsWith(ROOT + path.sep) && file !== ROOT) return notFound(res)
  try {
    let target = file, info = await stat(file)
    if (info.isDirectory()) {
      if (!pathname.endsWith('/')) { res.writeHead(301, { Location: `${pathname}/` }); return res.end() }
      target = path.join(file, 'index.html')
      info = await stat(target)
    }
    if (path.basename(target) === 'index.html' && /text\/markdown/i.test(req.headers.accept ?? '')) {
      const markdown = path.join(path.dirname(target), 'index.md')
      if (await isFile(markdown)) { target = markdown; info = await stat(markdown) }
    }
    await serveFile(req, res, target, info)
  } catch {
    notFound(res)
  }
}).listen(PORT, '0.0.0.0', () => {
  const ips = Object.values(networkInterfaces()).flat().filter(i => i.family === 'IPv4' && !i.internal).map(i => i.address)
  console.log('Self Learning sites are running. Open on any device on this network:')
  for (const ip of ips) console.log(`  http://${ip}:${PORT}/   (chemistry: /chemistry/  math: /math/)`)
  console.log('Keep this window open. Press Ctrl+C to stop.')
})
