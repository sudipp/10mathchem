// Renders every step of a chapter's map (src/maps/ch<n>.js) as a PNG, with a longitude/latitude grid,
// so territories, routes and labels can be checked without opening the site.
// Usage: node tools/preview-map.mjs 12 [--no-grid]   ->  tools/out/ch12-step0.png, ...
import { mkdirSync, writeFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { pathOf, routeLabelAt, viewBoxOf } from '../src/mapView.js'

const here = path.dirname(fileURLToPath(import.meta.url))
const n = Number(process.argv[2]), grid = !process.argv.includes('--no-grid')
const map = (await import(pathToFileURL(path.join(here, '..', 'src', 'maps', `ch${n}.js`)))).default
const bases = {}
for (const b of new Set([map.base, ...map.steps.map(s => s.base).filter(Boolean)])) bases[b] = await import(pathToFileURL(path.join(here, '..', 'src', 'geo', `${b}.js`)))
const aspect = map.aspect ?? 0.62
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')

const svgs = map.steps.map((s, i) => {
  const bn = s.base ?? map.base, B = bases[bn], P = (lon, lat) => B.project(lon, lat), vb = viewBoxOf(B, s.view, aspect), k = vb.w / 1000
  const out = [`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.x} ${vb.y} ${vb.w} ${vb.h}" width="1000" height="${Math.round(1000 * aspect)}">`,
    `<defs><clipPath id="c${i}"><path d="${B.LAND}"/></clipPath>`]
  ;(s.routes ?? []).forEach((r, j) => { if (r.arrow) out.push(`<marker id="a${i}-${j}" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="${r.color}"/></marker>`) })
  out.push('</defs>', `<rect x="${-B.MAP.w}" y="${-B.MAP.h}" width="${B.MAP.w * 3}" height="${B.MAP.h * 3}" fill="#CFE0E6"/>`, `<path d="${B.LAND}" fill="#F3ECDD"/>`, `<path d="${B.LAKES}" fill="#CFE0E6"/>`)
  for (const d of Object.values(B.RIVERS)) out.push(`<path d="${d}" fill="none" stroke="#8FB2C6" stroke-width="${1.4 * k}"/>`)
  out.push(`<g clip-path="url(#c${i})">`)
  for (const l of s.lands ?? []) out.push(`<g fill="${l.color}" opacity="${l.faint ? 0.18 : 0.5}">${l.polys.map(p => `<path d="${pathOf(B, p)}Z"/>`).join('')}</g>`)
  out.push('</g>', `<path d="${B.LAND}" fill="none" stroke="#9DB2B9" stroke-width="${0.8 * k}"/>`)
  if (grid) {
    const step = vb.w / B.MAP.cos / B.MAP.k > 60 ? 10 : 5
    for (let lon = -180; lon <= 300; lon += step) { const [x] = P(lon, 0); if (x < vb.x || x > vb.x + vb.w) continue; out.push(`<line x1="${x}" x2="${x}" y1="${vb.y}" y2="${vb.y + vb.h}" stroke="#7a7a7a" stroke-width="${0.5 * k}" opacity=".5"/><text x="${x + 2 * k}" y="${vb.y + 10 * k}" font-size="${9 * k}" fill="#555">${lon}</text>`) }
    for (let lat = -60; lat <= 80; lat += step) { const [, y] = P(0, lat); if (y < vb.y || y > vb.y + vb.h) continue; out.push(`<line x1="${vb.x}" x2="${vb.x + vb.w}" y1="${y}" y2="${y}" stroke="#7a7a7a" stroke-width="${0.5 * k}" opacity=".5"/><text x="${vb.x + 2 * k}" y="${y - 2 * k}" font-size="${9 * k}" fill="#555">${lat}</text>`) }
  }
  const txt = (x, y, size, fill, body, anchor = 'middle', extra = '') => `<text x="${x}" y="${y}" font-size="${size * k}" fill="${fill}" text-anchor="${anchor}" font-family="Segoe UI, sans-serif" font-weight="700" paint-order="stroke" stroke="#fffdf8" stroke-width="${3 * k}" ${extra}>${esc(body)}</text>`
  ;(s.routes ?? []).forEach((r, j) => out.push(`<path d="${pathOf(B, r.pts)}" fill="none" stroke="${r.color}" stroke-width="${(r.label ? 3.2 : 2) * k}" stroke-linecap="round" stroke-linejoin="round" ${r.dashed ? `stroke-dasharray="${9 * k} ${7 * k}"` : ''} ${r.arrow ? `marker-end="url(#a${i}-${j})"` : ''}/>`))
  ;(s.routes ?? []).filter(r => r.label).forEach(r => { const [x, y] = P(...routeLabelAt(r)); out.push(txt(x, y - 8 * k, 13, r.color, r.label)) })
  ;(s.lands ?? []).filter(l => l.label && l.at).forEach(l => { const [x, y] = P(...l.at); out.push(txt(x, y, 17, '#3a2a20', l.label)) })
  ;(s.tags ?? []).forEach(t => { const [x, y] = P(...t.at); out.push(txt(x, y, 12, '#7A3B22', t.text, 'middle', 'font-style="italic"')) })
  for (const id of s.cities ?? []) {
    const c = map.cities[id]; if (!c) { console.error(`step ${i}: unknown city ${id}`); continue }
    const [x, y] = P(...c.at)
    out.push(`<circle cx="${x}" cy="${y}" r="${(c.big ? 4.5 : 3.2) * k}" fill="#24303F" stroke="#fff" stroke-width="${0.8 * k}"/>`)
    out.push(txt(x + (c.side === 'left' ? -6 : c.side === 'below' ? 0 : 6) * k, y + (c.side === 'below' ? 15 : -5) * k, c.big ? 14 : 12, '#24303F', c.name, c.side === 'left' ? 'end' : c.side === 'below' ? 'middle' : 'start'))
  }
  out.push('</svg>')
  return out.join('')
})

const dir = path.join(here, 'out')
mkdirSync(dir, { recursive: true })
const html = `<!doctype html><meta charset="utf-8"><style>body{margin:0;background:#fff;font-family:Segoe UI,sans-serif}.s{width:1000px;padding:0 0 8px}h2{font-size:18px;margin:6px 8px}p{font-size:13px;margin:4px 8px;color:#444}</style>${map.steps.map((s, i) => `<div class="s" id="s${i}"><h2>Step ${i}: ${esc(s.title)}</h2>${svgs[i]}<p>${esc(s.caption)}</p></div>`).join('')}`
const file = path.join(dir, `ch${n}-map.html`)
writeFileSync(file, html)
const py = `
import sys
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b = p.chromium.launch(channel="msedge")
    pg = b.new_page(viewport={"width": 1000, "height": 900})
    pg.goto(sys.argv[1])
    for i in range(int(sys.argv[2])):
        pg.locator(f"#s{i}").screenshot(path=sys.argv[3] + f"-step{i}.png")
    b.close()
`
execFileSync('python', ['-c', py, pathToFileURL(file).href, String(map.steps.length), path.join(dir, `ch${n}`)], { stdio: 'inherit' })
console.log(`Wrote ${map.steps.length} previews to ${path.join(dir, `ch${n}-step*.png`)}`)
