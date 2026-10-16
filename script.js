(function () {
  var C = window.CATALOG, B = C.brand;
  var state = { cat: 'all', vibe: 'all', size: {} };
  var $ = function (s) { return document.querySelector(s); };

  function wa(text) { return 'https://wa.me/' + B.whatsapp + '?text=' + encodeURIComponent(text); }
  function money(n) { return n == null ? 'Ask for price' : B.currency + n.toLocaleString('en-NG'); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  var msgs = {
    hello: "Hi Timeless Fragrance! I'd like to place an order.",
    gift: "Hi Timeless Fragrance! I'd like to ask about gifting."
  };
  document.querySelectorAll('[data-wa]').forEach(function (a) {
    a.href = wa(msgs[a.dataset.wa] || msgs.hello); a.target = '_blank'; a.rel = 'noopener';
  });
  $('#tt').href = B.tiktok;
  $('#handle').textContent = B.tiktokHandle;
  $('#phone').textContent = '0' + B.whatsapp.slice(3).replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');

  /* branded bottle illustration, shown until a real photo exists in images/products/ */
  var shapes = {
    perfumes: '<rect x="44" y="12" width="32" height="14" rx="3" class="cap"/><rect x="54" y="26" width="12" height="9" class="neck"/><rect x="30" y="35" width="60" height="78" rx="12" class="glass"/>',
    bodysprays: '<rect x="50" y="10" width="20" height="12" rx="3" class="cap"/><rect x="44" y="22" width="32" height="14" rx="3" class="neck"/><rect x="36" y="36" width="48" height="80" rx="8" class="glass"/>',
    diffusers: '<rect x="50" y="6" width="3" height="52" class="reed"/><rect x="58" y="2" width="3" height="56" class="reed"/><rect x="66" y="8" width="3" height="50" class="reed"/><rect x="52" y="52" width="16" height="10" rx="2" class="neck"/><path d="M38 62h44c8 8 12 22 12 38 0 10-6 16-14 16H40c-8 0-14-6-14-16 0-16 4-30 12-38z" class="glass"/>',
    oils: '<rect x="50" y="18" width="20" height="14" rx="6" class="cap"/><rect x="55" y="32" width="10" height="10" class="neck"/><rect x="38" y="42" width="44" height="70" rx="10" class="glass"/>'
  };
  function bottle(cat) {
    return '<svg class="bottle" viewBox="0 0 120 120" aria-hidden="true">' + (shapes[cat] || shapes.perfumes) + '</svg>';
  }

  var tabs = $('#tabs'), chips = $('#chips');
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
  function mark(box, id) {
    box.querySelectorAll('button').forEach(function (b) { b.classList.toggle('on', b.dataset.id === id); });
  }

  var catLabel = {}; C.categories.forEach(function (c) { catLabel[c.id] = c.label; });

  function message(p, s) {
    return "Hi Timeless Fragrance! I'd like to order:\n\n" + p.name + ' (' + catLabel[p.category] + ')\nSize: ' + s.label +
      (s.price != null ? '\nPrice: ' + money(s.price) : '') + '\n\nIs it available?';
  }

  function render() {
    var list = C.products.filter(function (p) {
      return (state.cat === 'all' || p.category === state.cat) && (state.vibe === 'all' || p.vibe === state.vibe);
    });
    $('#grid').innerHTML = list.map(function (p) {
      var si = state.size[p.id] || 0, s = p.sizes[si];
      var sizes = p.sizes.length > 1
        ? '<div class="sizes" role="group" aria-label="Size">' + p.sizes.map(function (z, i) {
            return '<button class="size' + (i === si ? ' on' : '') + '" data-p="' + p.id + '" data-i="' + i + '">' + esc(z.label) + '</button>';
          }).join('') + '</div>'
        : '<div class="sizes"><span class="size one">' + esc(s.label) + '</span></div>';
      return '<article class="card ' + p.category + '">' +
        '<div class="ph"><img src="images/products/' + p.id + '.jpg" alt="' + esc(p.name) + '" loading="lazy" onerror="this.remove()">' +
        bottle(p.category) + '<span class="vibe">' + esc(p.vibe) + '</span></div>' +
        '<div class="info"><p class="cat">' + esc(catLabel[p.category]) + '</p><h3>' + esc(p.name) + '</h3>' +
        '<p class="notes">' + esc(p.notes) + '</p>' + sizes +
        '<div class="buy"><span class="price' + (s.price == null ? ' ask' : '') + '">' + money(s.price) + '</span>' +
        '<a class="btn btn-sm" target="_blank" rel="noopener" href="' + wa(message(p, s)) + '">Order</a></div></div></article>';
    }).join('');
    $('#empty').hidden = list.length > 0;
  }
  $('#grid').addEventListener('click', function (e) {
    var b = e.target.closest('.size[data-p]'); if (!b) return;
    state.size[b.dataset.p] = +b.dataset.i; render();
  });
  render();

  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 }) : null;
  document.querySelectorAll('.reveal').forEach(function (el) { io ? io.observe(el) : el.classList.add('in'); });

  var nav = $('#nav'), hero = $('.hero');
  function onScroll() {
    nav.classList.toggle('solid', window.scrollY > 40);
    document.body.classList.toggle('past-hero', window.scrollY > hero.offsetHeight * 0.6);
  }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
})();
