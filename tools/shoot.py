"""Screenshots the local site (serve the folder first: python -m http.server 8123) (light + dark, desktop + mobile) with Microsoft Edge into screenshots/."""
from pathlib import Path
from playwright.sync_api import sync_playwright

root = Path(__file__).resolve().parent.parent
(root / 'screenshots').mkdir(exist_ok=True)
with sync_playwright() as p:
    b = p.chromium.launch(channel='msedge')
    for theme in ('light', 'dark'):
        for n, (w, h) in {'desktop': (1440, 900), 'mobile': (390, 844)}.items():
            ctx = b.new_context(viewport={'width': w, 'height': h})
            ctx.add_init_script(f"localStorage.setItem('tf-theme','{theme}')")
            pg = ctx.new_page()
            pg.goto('http://localhost:8123/index.html')
            pg.wait_for_timeout(1800)
            pg.screenshot(path=str(root / 'screenshots' / f'{theme}-{n}-hero.png'))
            pg.evaluate("document.querySelectorAll('.reveal').forEach(e=>e.classList.add('in'));document.querySelectorAll('img[loading]').forEach(i=>i.loading='eager')")
            pg.wait_for_timeout(1000)
            pg.screenshot(path=str(root / 'screenshots' / f'{theme}-{n}-full.png'), full_page=True)
            ctx.close()
    b.close()
