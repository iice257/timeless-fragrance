"""Builds the placeholder images/ files from source-frames/ (2x Lanczos + light crop).
Replace any file in images/ with an upscaled version using the same filename."""
from PIL import Image
import os
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sf, out = os.path.join(root, 'source-frames'), os.path.join(root, 'images')
jobs = {  # name: (source, crop box or None)
    'hero.jpg': ('vid3-08.png', None),
    'packaging.jpg': ('vid1-04.png', (0, 285, 464, 655)),
    'stack.jpg': ('vid3-01.png', (0, 0, 400, 832)),
}
for name, (src, box) in jobs.items():
    im = Image.open(os.path.join(sf, src)).convert('RGB')
    if box: im = im.crop(box)
    im = im.resize((im.width * 2, im.height * 2), Image.LANCZOS)
    im.save(os.path.join(out, name), quality=90)
    print(name, im.size)
