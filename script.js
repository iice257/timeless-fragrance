(function () {
  var C = window.CATALOG, B = C.brand;
  var state = { cat: 'all', vibe: 'all', q: '', size: {} };
  var $ = function (s) { return document.querySelector(s); };

  function wa(text) { return 'https://wa.me/' + B.whatsapp + '?text=' + encodeURIComponent(text); }
  function money(n) { return n == null ? 'Ask for price' : B.currency + n.toLocaleString('en-NG'); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  /* ---------- theme ---------- */
  var root = document.documentElement, tbtn = $('#theme'), meta = document.querySelector('meta[name="theme-color"]');
  function applyTheme(t, save) {
    root.dataset.theme = t;
    tbtn.setAttribute('aria-pressed', t === 'dark');
    tbtn.setAttribute('aria-label', t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    if (meta) meta.content = t === 'dark' ? '#231048' : '#f8f3fc';
    if (save) { try { localStorage.setItem('tf-theme', t); } catch (e) {} }
  }
  applyTheme(root.dataset.theme === 'dark' ? 'dark' : 'light', false);
  tbtn.addEventListener('click', function () { applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true); });

  /* ---------- whatsapp links ---------- */
  var msgs = {
    hello: "Hi Timeless Fragrance! I'd like to place an order.",
    gift: "Hi Timeless Fragrance! I'd like to ask about gifting.",
    request: "Hi Timeless Fragrance! I'm looking for a scent I can't see on the site.",
    vibe: "Hi Timeless Fragrance! Can you help me find my vibe?"
  };
  document.querySelectorAll('[data-wa]').forEach(function (a) {
    a.href = wa(msgs[a.dataset.wa] || msgs.hello); a.target = '_blank'; a.rel = 'noopener';
  });
  $('#tt').href = B.tiktok; $('#tt1').href = B.tiktok;
  $('#handle').textContent = B.tiktokHandle;
  $('#phone').textContent = '0' + B.whatsapp.slice(3).replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');

  /* ---------- bottle illustration (until a real photo is in images/products/) ---------- */
  var tints = {
    Soft: ['#f6d9ea', '#e3b4d6'], Fresh: ['#d6e6f7', '#a9c8ec'],
    Sweet: ['#fbdcc8', '#f0b08e'], Bold: ['#b99ad6', '#6d3fa3']
  };
  var shapes = {
    perfumes: { cap: '<rect x="47" y="8" width="26" height="15" rx="3" fill="url(#cap)"/>', neck: '<rect x="55" y="23" width="10" height="9" fill="#d9c6ea"/>',
      body: 'M34 44a12 12 0 0 1 12-12h28a12 12 0 0 1 12 12v58a10 10 0 0 1-10 10H44a10 10 0 0 1-10-10z', lab: [42, 62, 36, 28] },
    bodysprays: { cap: '<rect x="52" y="6" width="16" height="12" rx="3" fill="url(#cap)"/><rect x="46" y="18" width="28" height="14" rx="3" fill="url(#cap)"/>', neck: '',
      body: 'M40 38a6 6 0 0 1 6-6h28a6 6 0 0 1 6 6v68a8 8 0 0 1-8 8H48a8 8 0 0 1-8-8z', lab: [45, 58, 30, 32] },
    diffusers: { cap: '<path d="M52 56 46 4M60 56 62 0M68 56 80 6" stroke="#8a6a52" stroke-width="2.4" stroke-linecap="round" fill="none"/>', neck: '<rect x="52" y="52" width="16" height="10" rx="2" fill="#d9c6ea"/>',
      body: 'M40 62h40c9 9 14 22 14 38 0 9-6 14-14 14H40c-8 0-14-5-14-14 0-16 5-29 14-38z', lab: [40, 82, 40, 22] },
    oils: { cap: '<rect x="50" y="14" width="20" height="14" rx="7" fill="url(#cap)"/>', neck: '<rect x="55" y="28" width="10" height="10" fill="#d9c6ea"/>',
      body: 'M40 46a8 8 0 0 1 8-8h24a8 8 0 0 1 8 8v58a8 8 0 0 1-8 8H48a8 8 0 0 1-8-8z', lab: [45, 66, 30, 24] }
  };
  var uid = 0;
  function bottle(cat, vibe) {
    var sh = shapes[cat] || shapes.perfumes, t = tints[vibe] || tints.Soft, id = 'g' + (uid++), l = sh.lab;
    return '<svg class="bottle" viewBox="0 0 120 124" aria-hidden="true"><defs>' +
      '<linearGradient id="' + id + '" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="' + t[0] + '"/><stop offset="1" stop-color="' + t[1] + '"/></linearGradient>' +
      '<linearGradient id="cap" x1="0" x2="1"><stop offset="0" stop-color="#3a2268"/><stop offset="1" stop-color="#231048"/></linearGradient>' +
      '<linearGradient id="hl" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".75"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>' +
      '<ellipse cx="60" cy="116" rx="34" ry="4.5" fill="#6d3fa3" opacity=".2"/>' +
      sh.cap + sh.neck +
      '<path d="' + sh.body + '" fill="url(#' + id + ')" stroke="#fff" stroke-opacity=".9" stroke-width="1.2"/>' +
      '<path d="' + sh.body + '" fill="url(#hl)" opacity=".5"/>' +
      '<rect x="' + l[0] + '" y="' + l[1] + '" width="' + l[2] + '" height="' + l[3] + '" rx="2" fill="#fbf7fe" opacity=".92"/>' +
      '<text x="60" y="' + (l[1] + l[3] / 2 - 1) + '" text-anchor="middle" font-family="Cinzel,serif" font-size="5.2" letter-spacing=".5" fill="#231048">TIMELESS</text>' +
      '<text x="60" y="' + (l[1] + l[3] / 2 + 5) + '" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="2.2" letter-spacing="1.4" fill="#6d3fa3">FRAGRANCE</text></svg>';
  }

  /* ---------- catalog ---------- */
  var tabs = $('#tabs'), chips = $('#chips');
  var catLabel = {}; C.categories.forEach(function (c) { catLabel[c.id] = c.label; });
  function mark(box, id) {
    box.querySelectorAll('button').forEach(function (b) { b.classList.toggle('on', b.dataset.id === id); });
  }
  [{ id: 'all', label: 'All' }].concat(C.categories).forEach(function (c) {
    var b = document.createElement('button');
    b.className = 'tab' + (c.id === 'all' ? ' on' : '');
    b.textContent = c.label; b.dataset.id = c.id; b.setAttribute('role', 'tab');
    b.onclick = function () { state.cat = c.id; mark(tabs, c.id); render(); };
    tabs.appendChild(b);
  });
  ['all'].concat(C.vibes).forEach(function (v) {
    var b = document.createElement('button');
    b.className = 'chip' + (v === 'all' ? ' on' : '');
    b.textContent = v === 'all' ? 'Any vibe' : v; b.dataset.id = v;
    b.onclick = function () { state.vibe = v; mark(chips, v); render(); };
    chips.appendChild(b);
  });

  function message(p, s) {
    return "Hi Timeless Fragrance! I'd like to order:\n\n" + p.name + ' (' + catLabel[p.category] + ')\nSize: ' + s.label +
      (s.price != null ? '\nPrice: ' + money(s.price) : '') + '\n\nIs it available?';
  }

  function render() {
    var list = C.products.filter(function (p) {
      return (state.cat === 'all' || p.category === state.cat) && (state.vibe === 'all' || p.vibe === state.vibe) &&
        (!state.q || (p.name + ' ' + p.notes + ' ' + p.vibe + ' ' + catLabel[p.category]).toLowerCase().indexOf(state.q) > -1);
    });
    $('#grid').innerHTML = list.map(function (p) {
      var si = state.size[p.id] || 0, s = p.sizes[si];
      var sizes = p.sizes.length > 1
        ? '<div class="sizes" role="group" aria-label="Size">' + p.sizes.map(function (z, i) {
            return '<button class="size' + (i === si ? ' on' : '') + '" data-p="' + p.id + '" data-i="' + i + '">' + esc(z.label) + '</button>';
          }).join('') + '</div>'
        : '<div class="sizes"><span class="size one">' + esc(s.label) + '</span></div>';
      return '<article class="shell card"><div class="core">' +
        '<div class="ph"><img src="images/products/' + p.id + '.jpg" alt="' + esc(p.name) + '" loading="lazy" onerror="this.remove()">' +
        bottle(p.category, p.vibe) + '<span class="vibe">' + esc(p.vibe) + '</span></div>' +
        '<div class="info"><p class="cat">' + esc(catLabel[p.category]) + '</p><h3>' + esc(p.name) + '</h3>' +
        '<p class="notes">' + esc(p.notes) + '</p>' + sizes +
        '<div class="buy"><span class="price' + (s.price == null ? ' ask' : '') + '">' + money(s.price) + '</span>' +
        '<a class="btn btn-sm" target="_blank" rel="noopener" href="' + wa(message(p, s)) + '"><span>Order</span><i class="arr" aria-hidden="true"></i></a></div></div></div></article>';
    }).join('');
    $('#empty').hidden = list.length > 0;
  }
  $('#grid').addEventListener('click', function (e) {
    var b = e.target.closest('.size[data-p]'); if (!b) return;
    state.size[b.dataset.p] = +b.dataset.i; render();
  });
  $('#q').addEventListener('input', function (e) { state.q = e.target.value.trim().toLowerCase(); render(); });
  render();

  /* category quick links */
  var cats = $('#cats');
  cats.innerHTML = C.categories.map(function (c) {
    var n = C.products.filter(function (p) { return p.category === c.id; }).length;
    return '<a href="#collection" data-cat="' + c.id + '"><span>' + esc(c.label) + '</span><small>' + n + ' scents</small></a>';
  }).join('');
  cats.addEventListener('click', function (e) {
    var a = e.target.closest('a[data-cat]'); if (!a) return;
    state.cat = a.dataset.cat; mark(tabs, state.cat); render();
  });

  /* ---------- vibes ---------- */
  var vibeCopy = {
    Soft: 'Gentle, powdery and close to the skin. Easy to wear all day.',
    Fresh: 'Clean, bright and airy. Made for sunny days and early starts.',
    Sweet: 'Warm, sugary and impossible to ignore. The one people ask about.',
    Bold: 'Deep, rich and confident. Made for evenings out.'
  };
  $('#vibeGrid').innerHTML = C.vibes.map(function (v, i) {
    var n = C.products.filter(function (p) { return p.vibe === v; }).length;
    return '<button class="vcard" data-v="' + v + '"><span class="num">0' + (i + 1) + '</span><h3>' + esc(v) + '</h3><p>' + esc(vibeCopy[v] || '') +
      '</p><span class="go">' + n + ' scents <i aria-hidden="true">→</i></span></button>';
  }).join('');
  $('#vibeGrid').addEventListener('click', function (e) {
    var b = e.target.closest('.vcard'); if (!b) return;
    state.vibe = b.dataset.v; state.cat = 'all'; state.q = ''; $('#q').value = '';
    mark(chips, state.vibe); mark(tabs, 'all'); render();
    document.getElementById('collection').scrollIntoView({ behavior: 'smooth' });
  });

  /* ---------- letter game ---------- */
  $('#letters').innerHTML = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(function (l) {
    return '<a class="letter" target="_blank" rel="noopener" href="' +
      wa("Hi Timeless Fragrance! My partner's name starts with " + l + ", so they owe me a perfume 😌") + '">' + l + '</a>';
  }).join('');

  /* ---------- reveal + nav state ---------- */
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 }) : null;
  document.querySelectorAll('.reveal').forEach(function (el) { io ? io.observe(el) : el.classList.add('in'); });

  var hero = $('.hero');
  function onScroll() { document.body.classList.toggle('past-hero', window.scrollY > hero.offsetHeight * 0.6); }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
})();
