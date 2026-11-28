// Map geometry shared by the site's map player and the video builder (../math-videos/build.mjs).

// The SVG viewBox for a map step: view is [lonMin, latMin, lonMax, latMax], or null for the whole base map.
// The box is padded to the frame's aspect ratio (height / width) so nothing stretches.
export function viewBoxOf(base, view, aspect) {
  let x, y, w, h
  if (!view) { x = 0; y = 0; w = base.MAP.w; h = base.MAP.h }
  else {
    const [x0, y0] = base.project(view[0], view[3]), [x1, y1] = base.project(view[2], view[1])
    x = x0; y = y0; w = x1 - x0; h = y1 - y0
  }
  if (h / w > aspect) { const nw = h / aspect; return { x: x - (nw - w) / 2, y, w: nw, h } }
  const nh = w * aspect
  return { x, y: y - (nh - h) / 2, w, h: nh }
}

export const pathOf = (base, pts) => 'M' + pts.map(p => base.project(...p).map(v => v.toFixed(1)).join(',')).join('L')

// Where a route's label goes: labelAt, or the route's middle point.
export const routeLabelAt = r => r.labelAt ?? r.pts[Math.floor(r.pts.length / 2)]
