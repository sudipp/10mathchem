"""Writes a base map module (src/geo/<name>.js) from Natural Earth 1:50m GeoJSON (public domain).

Download ne_50m_land, ne_50m_rivers_lake_centerlines and ne_50m_lakes as GeoJSON from
nvkelso/natural-earth-vector into one folder (as land50, rivers50 and lakes50.geojson), then:

    python tools/make_basemap.py world <geojson-dir>
    python tools/make_basemap.py pacific <geojson-dir>

The projection is equirectangular: x = (lon - lon0) * cos(mid) * k, y = (lat1 - lat) * k.
The Pacific map runs from 95°E to 65°W; longitudes east of 180 continue as 181, 182, ...,
so places in the Americas are written there as lon + 360 (Hawaii is about 205, Lima 283).
"""
import json
import math
import sys
from pathlib import Path

from shapely.affinity import translate
from shapely.geometry import box, shape
from shapely.ops import unary_union

RIVERS_WORLD = {
    'Nile': ['Nile', 'El Bahr el Abyad', 'El Bahr el Azraq', 'Bahr el Jebel', 'Albert Nile', 'Victoria Nile', 'Rosetta Branch', 'Damietta Branch', 'Abay'],
    'Niger': ['Niger'], 'Benue': ['Benue', 'Bénoué'], 'Senegal': ['Sénégal', 'Bafing'], 'Congo': ['Congo', 'Lualaba'], 'Zambezi': ['Zambezi'], 'Limpopo': ['Limpopo'],
    'Tigris': ['Tigris', 'Dicle'], 'Euphrates': ['Euphrates', 'Firat', 'Al Furat', 'Shatt al Arab'], 'Jordan': ['Jordan'],
    'Indus': ['Indus', 'Chenab', 'Sutlej'], 'Ganges': ['Ganges', 'Yamuna'], 'Brahmaputra': ['Brahmaputra', 'Yarlung', 'Dihang'],
    'Amu Darya': ['Amu  Darya', 'Panj'], 'Syr Darya': ['Syr Darya', 'Naryn'], 'Tarim': ['Tarim', 'Yarkant'],
    'Huang He': ['Huang'], 'Yangtze': ['Yangtze', 'Chang Jiang', 'Jinsha'], 'Xi': ['Xi'], 'Mekong': ['Mekong', 'Lancang'], 'Red River': ['Hong'],
    'Irrawaddy': ['Ayeyarwady'], 'Amur': ['Amur', 'Heilong Jiang'], 'Liao': ['Liao'],
    'Volga': ['Volga'], 'Don': ['Don'], 'Dnieper': ['Dnipro', 'Dnepre'], 'Danube': ['Danube', 'Donau'], 'Rhine': ['Rhine', 'Rhein', 'Rhin'], 'Rhône': ['Rhône'],
    'Seine': ['Seine'], 'Loire': ['Loire'], 'Elbe': ['Elbe'], 'Vistula': ['Vistula'], 'Po': ['Po'], 'Thames': ['Thames'], 'Tagus': ['Tajo', 'Tejo'],
    'Mississippi': ['Mississippi'], 'Missouri': ['Missouri'], 'Ohio': ['Ohio'], 'St. Lawrence': ['St. Lawrence'], 'Rio Grande': ['Rio Grande'],
    'Amazon': ['Amazonas', 'Marañón', 'Ucayali'], 'Orinoco': ['Orinoco'], 'Paraná': ['Paraná'], 'Usumacinta': ['Usumacinta'],
}
RIVERS_PACIFIC = {k: v for k, v in RIVERS_WORLD.items() if k in ('Yangtze', 'Huang He', 'Mekong', 'Xi', 'Red River', 'Mississippi', 'Missouri', 'Amazon', 'Rio Grande')}
RIVERS_PACIFIC['Murray'] = ['Murray', 'Darling']

CONFIGS = {
    # Whole world without Antarctica, Atlantic-centered: Afro-Eurasia, the Americas, the Atlantic and Indian Oceans.
    'world': dict(lon0=-180, lon1=180, lat0=-56, lat1=78, mid=30, width=3600, tol=0.04, rivers=RIVERS_WORLD,
                  title='World base map'),
    # Pacific-centered: East Asia, Australia, Oceania and the Pacific coast of the Americas.
    'pacific': dict(lon0=95, lon1=295, lat0=-50, lat1=62, mid=10, width=3000, tol=0.04, rivers=RIVERS_PACIFIC, shift=True,
                    title='Pacific base map (longitudes past 180 continue as 181, 182, ...)'),
}


def load(path):
    return json.loads(Path(path).read_text(encoding='utf-8'))['features']


def main():
    name, src = sys.argv[1], Path(sys.argv[2])
    c = CONFIGS[name]
    cosv = math.cos(math.radians(c['mid']))
    k = c['width'] / ((c['lon1'] - c['lon0']) * cosv)
    h = round((c['lat1'] - c['lat0']) * k)
    bbox = box(c['lon0'], c['lat0'], c['lon1'], c['lat1'])

    def shifted(geom):
        return unary_union([geom, translate(geom, xoff=360)]) if c.get('shift') else geom

    def fmt(x, y):
        return f"{(x - c['lon0']) * cosv * k:.1f},{(c['lat1'] - y) * k:.1f}"

    def ring(coords):
        pts, last = [], None
        for x, y in coords:
            s = fmt(x, y)
            if s != last:
                pts.append(s)
            last = s
        return 'M' + 'L'.join(pts) + 'Z' if len(pts) > 2 else ''

    def poly_d(g):
        if g.is_empty:
            return ''
        if g.geom_type == 'Polygon':
            return ring(g.exterior.coords) + ''.join(ring(i.coords) for i in g.interiors)
        if hasattr(g, 'geoms'):
            return ''.join(poly_d(p) for p in g.geoms)
        return ''

    def line_d(g):
        if g.is_empty:
            return ''
        if g.geom_type == 'LineString':
            pts = [fmt(x, y) for x, y in g.coords]
            return 'M' + 'L'.join(pts) if len(pts) > 1 else ''
        if hasattr(g, 'geoms'):
            return ''.join(line_d(p) for p in g.geoms)
        return ''

    land = shifted(unary_union([shape(f['geometry']) for f in load(src / 'land50.geojson')])).intersection(bbox)
    land = land.simplify(c['tol'], preserve_topology=True)
    min_area = (1.5 / k) ** 2  # drop specks smaller than about a pixel and a half
    if hasattr(land, 'geoms'):
        land = unary_union([p for p in land.geoms if p.area > min_area])
    lakes = shifted(unary_union([shape(f['geometry']) for f in load(src / 'lakes50.geojson')])).intersection(bbox)
    lakes = lakes.simplify(c['tol'], preserve_topology=True)
    if hasattr(lakes, 'geoms'):
        lakes = unary_union([p for p in lakes.geoms if p.area > (4 / k) ** 2])
    rivers = {}
    feats = load(src / 'rivers50.geojson')
    for label, names in c['rivers'].items():
        geoms = [shape(f['geometry']) for f in feats if (f['properties'].get('name') or '') in names]
        if not geoms:
            print('no river', label)
            continue
        d = line_d(shifted(unary_union(geoms)).intersection(bbox).simplify(c['tol'] * 1.5))
        if d:
            rivers[label] = d

    out = Path(__file__).resolve().parent.parent / 'src' / 'geo' / f'{name}.js'
    js = (
        f"// {c['title']}, generated from Natural Earth 1:50m land, rivers and lakes (public domain)\n"
        f"// by tools/make_basemap.py. Equirectangular projection, scaled for {c['mid']}°.\n"
        f"export const MAP = {{ w: {c['width']}, h: {h}, lon0: {c['lon0']}, lat1: {c['lat1']}, cos: {cosv:.6f}, k: {k:.6f} }}\n"
        "export const project = (lon, lat) => [(lon - MAP.lon0) * MAP.cos * MAP.k, (MAP.lat1 - lat) * MAP.k]\n"
        f"export const LAND = '{poly_d(land)}'\n"
        f"export const LAKES = '{poly_d(lakes)}'\n"
        f"export const RIVERS = {json.dumps(rivers, ensure_ascii=False)}\n"
    )
    out.write_text(js, encoding='utf-8')
    print(f'Wrote {out} ({len(js) / 1000:.0f} kB), {c["width"]} x {h}')


if __name__ == '__main__':
    main()
