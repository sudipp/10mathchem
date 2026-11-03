"""Combine build/<unit>/<id>/stills/NN.png into 2x3 contact sheets: python contact_sheet.py unit-4/<id>"""
import glob, os, sys
from PIL import Image

d = os.path.join(os.path.dirname(__file__), "build", sys.argv[1], "stills")
files = sorted(glob.glob(os.path.join(d, "[0-9][0-9].png")))
w, h = 640, 360
for sheet in range(0, len(files), 6):
    img = Image.new("RGB", (w * 2, h * 3), "white")
    for k, f in enumerate(files[sheet:sheet + 6]):
        img.paste(Image.open(f).resize((w, h)), ((k % 2) * w, (k // 2) * h))
    img.save(os.path.join(d, f"sheet{sheet // 6 + 1}.png"))
print(f"{len(files)} stills -> {(len(files) + 5) // 6} sheets")
