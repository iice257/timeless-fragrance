"""Builds the placeholder images/ files from source-frames/ (2x Lanczos + crop).
Existing files (e.g. upscaled replacements) are kept; pass --force to rebuild the low-res placeholders."""
from PIL import Image
import os, sys
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sf, out = os.path.join(root, 'source-frames'), os.path.join(root, 'images')
jobs = {  # name: (source frame, crop box or None)
    'hero.jpg': ('vid3-07.png', None),                    # stack of bags, portrait
    'bag-wide.jpg': ('vid1-04.png', (0, 285, 464, 655)),  # one bag, landscape
    'bag-close.jpg': ('vid3-07.png', (0, 410, 464, 832)), # big bag, wordmark
    'bag-qr.jpg': ('vid1-03.png', (0, 165, 464, 650)),    # bag with QR code on the side
    'note.jpg': ('vid3-02.png', (0, 270, 464, 700)),      # "your partner owes you a perfume" note
}
for name, (src, box) in jobs.items():
    if os.path.exists(os.path.join(out, name)) and '--force' not in sys.argv:
        print('keep', name); continue
    im = Image.open(os.path.join(sf, src)).convert('RGB')
    if box: im = im.crop(box)
    im = im.resize((im.width * 2, im.height * 2), Image.LANCZOS)
    im.save(os.path.join(out, name), quality=90)
    print(name, im.size)
