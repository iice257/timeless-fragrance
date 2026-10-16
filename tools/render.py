"""Renders og.png (1200x630) and apple-touch-icon.png (180x180) from tools/*.html with Edge."""
from pathlib import Path
from playwright.sync_api import sync_playwright
root = Path(__file__).resolve().parent.parent
with sync_playwright() as p:
    b = p.chromium.launch(channel='msedge')
    for html, out, w, h in [('og.html', 'og.png', 1200, 630), ('icon.html', 'apple-touch-icon.png', 180, 180)]:
        pg = b.new_page(viewport={'width': w, 'height': h})
        pg.goto((root / 'tools' / html).as_uri()); pg.wait_for_timeout(1500)
        pg.screenshot(path=str(root / out))
    b.close()
