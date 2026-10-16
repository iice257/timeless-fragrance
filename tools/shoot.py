"""Screenshots the local site (desktop + mobile) with Microsoft Edge into screenshots/."""
from pathlib import Path
from playwright.sync_api import sync_playwright

root = Path(__file__).resolve().parent.parent
(root / 'screenshots').mkdir(exist_ok=True)
with sync_playwright() as p:
    b = p.chromium.launch(channel='msedge')
    for n, (w, h) in {'desktop': (1440, 900), 'mobile': (390, 844)}.items():
        pg = b.new_page(viewport={'width': w, 'height': h})
        pg.goto((root / 'index.html').as_uri())
        pg.wait_for_timeout(1800)
        pg.screenshot(path=str(root / 'screenshots' / f'{n}-hero.png'))
        pg.evaluate("document.querySelectorAll('.reveal').forEach(e=>e.classList.add('in'))")
        pg.wait_for_timeout(1000)
        pg.screenshot(path=str(root / 'screenshots' / f'{n}-full.png'), full_page=True)
    b.close()
