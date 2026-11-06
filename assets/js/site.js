/* Visionary Web Studio: behaviour for the static pages.
   The pages are plain HTML (tools/prerender.js), so every section is already in
   the document. Each module below finds its section and wires it; a module whose
   section isn't on the page does nothing. No React, no SPA router: links are real
   page loads, so a page always opens at the top and builds exactly once. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var clamp = function (v) { return v < 0 ? 0 : v > 1 ? 1 : v; };
  var easeOut = function (t) { return 1 - Math.pow(1 - t, 3); };
  var easeIn = function (t) { return t * t * t; };
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* one scroll + resize loop for every module */
  var frames = [], resizers = [], queued = false;
  function onFrame(fn) { frames.push(fn); }
  function onResize(fn) { resizers.push(fn); }
  function tick() { queued = false; for (var i = 0; i < frames.length; i++) frames[i](); }
  function req() { if (!queued) { queued = true; requestAnimationFrame(tick); } }
  addEventListener('scroll', req, { passive: true });
  addEventListener('resize', function () { for (var i = 0; i < resizers.length; i++) resizers[i](); req(); }, { passive: true });

  function smoothTo(y) { if (window.lenis) window.lenis.scrollTo(y, { force: true }); else scrollTo({ top: y, behavior: 'smooth' }); }

  /* Workers static assets don't serve byte ranges reliably for Safari:
     fetch the whole file once and play it from a blob URL. */
  var blobs = {};
  function loadVideo(v) {
    if (v.getAttribute('data-loaded')) return;
    v.setAttribute('data-loaded', '1');
    var src = v.getAttribute('data-src'); if (!src) return;
    (blobs[src] || (blobs[src] = fetch(src).then(function (r) { if (!r.ok) throw 0; return r.blob(); }).then(function (b) { return URL.createObjectURL(b); })))
      .then(function (u) { v.src = u; if (v.getAttribute('data-want')) v.play().catch(function () {}); })
      .catch(function () { v.src = src; });
  }
  function play(v) { v.setAttribute('data-want', '1'); loadVideo(v); if (v.src) v.play().catch(function () {}); }
  function pause(v) { v.removeAttribute('data-want'); if (v.src) v.pause(); }
  /* videos with data-src not owned by a module: load + play while on screen */
  function lazyVideos() {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) play(e.target); else pause(e.target); }); }, { rootMargin: '300px 0px' });
    $$('video[data-src]').forEach(function (v) { if (!v.closest('.vws-svc, .vws-kend')) io.observe(v); });
    $$('video[autoplay]').forEach(function (v) { v.muted = true; var p = v.play(); if (p && p.catch) p.catch(function () {}); });
  }

  /* ── smooth scroll (Lenis, the library KOTA runs) ── */
  function lenis() {
    if (!window.Lenis || reduced) return;
    var l = new Lenis({ lerp: 0.1, prevent: function (n) { return !!(n.closest && n.closest('#vws-chat-root, #vws-cookie-banner, #vws-ck-modal, [data-lenis-prevent], [role="dialog"]')); } });
    window.lenis = l;
    (function raf(t) { l.raf(t); requestAnimationFrame(raf); })(performance.now());
    l.on('scroll', req);
    /* popups/menus lock the page with overflow:hidden: follow them */
    setInterval(function () {
      var locked = getComputedStyle(document.body).overflow === 'hidden';
      if (locked && !l.isStopped) l.stop(); else if (!locked && l.isStopped) l.start();
    }, 250);
  }

  /* ── header: logo pill, centered menu with glass card, CTA pill ── */
  function header() {
    var el = $('.vws-kn'); if (!el) return;
    var btn = $('.vws-kn-menu', el);
    function setOpen(o) { el.classList.toggle('open', o); btn.setAttribute('aria-expanded', o); }
    btn.addEventListener('click', function (e) { e.stopPropagation(); setOpen(!el.classList.contains('open')); });
    document.addEventListener('click', function (e) { if (!e.target.closest('.vws-kn-card')) setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
    /* phone: menu sits at the far right, after the CTA */
    var mq = matchMedia('(max-width:809px)'), mid = $('.vws-kn-mid', el), right = $('.vws-kn-right', el), row = $('.vws-kn-row', el);
    function place() { if (mq.matches) { if (mid.parentNode !== right) right.appendChild(mid); } else if (mid.parentNode !== row) row.insertBefore(mid, right); }
    mq.addEventListener ? mq.addEventListener('change', place) : mq.addListener(place); place();
    /* light or dark under the header? */
    function tone() {
      var list = document.elementsFromPoint(innerWidth / 2, mq.matches ? 44 : 58), lum = 0;
      for (var i = 0; i < list.length; i++) {
        var n = list[i]; if (n.closest('.vws-kn')) continue;
        for (; n && n !== document.documentElement; n = n.parentElement) {
          var c = getComputedStyle(n).backgroundColor.match(/[\d.]+/g);
          if (c && (c.length < 4 || +c[3] > 0.5)) { lum = (0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2]) / 255; break; }
          if (n.closest('.vws-kh')) { lum = 0.1; break; }
          if (getComputedStyle(n).backgroundImage !== 'none' || n.tagName === 'IMG' || n.tagName === 'VIDEO') { lum = 0.7; break; }
        }
        break;
      }
      el.classList.toggle('light', lum > 0.6);
    }
    var tq = 0; onFrame(function () { if (!tq) tq = setTimeout(function () { tq = 0; tone(); }, 60); });
    tone(); setTimeout(tone, 600);
  }

  /* ── KOTA hero ── */
  function hero() {
    var s = $('.vws-kh[role="region"]'); if (!s) return;
    requestAnimationFrame(function () { requestAnimationFrame(function () { s.classList.add('in'); }); });
    var bg = $('.vws-kh-bg', s);
    onFrame(function () { var p = clamp(scrollY / (innerHeight * 0.6)); bg.style.opacity = (1 - p * 0.85).toFixed(3); });
  }

  /* ── Our Process: pinned screen, each step's image grows out of the corner ── */
  function process() {
    var root = $('.vws-pr'); if (!root) return;
    var masks = $$('.vws-pr-mask', root), imgs = $$('.vws-pr-mask img', root), items = $$('.vws-pr-item', root), N = masks.length, active = -2;
    /* KOTA's reel: the hero's small video grows into this screen as it scrolls in
       (left/size linear, vertical centre eased out, measured on madebykota.com), then
       fades to black while the steps play. Lines of the title slide in from the sides. */
    var reel = $('.vws-pr-reel', root), pin = $('.vws-pr-pin', root), thumb = $('.vws-kh-vid'), lines = $$('.vws-pr-title .ln', root);
    var STEP0 = reel ? 0.4 : 0, ovs = null, rv = null;   /* the steps start after the reel has had its screen */
    function reelFrame() {
      if (!reel) return;
      if (innerWidth < 900) { reel.style.cssText = ''; lines.forEach(function (l) { l.style.transform = ''; }); document.documentElement.classList.remove('vws-reel-on'); return; }
      document.documentElement.classList.add('vws-reel-on');
      var vw = document.documentElement.clientWidth, vh = innerHeight, s = scrollY;
      var T = root.getBoundingClientRect().top + s;            /* where the screen locks */
      var g = clamp(s / T), ge = 1 - (1 - g) * (1 - g);
      var tr = thumb ? thumb.getBoundingClientRect() : { left: vw / 2, top: vh / 2, width: 0, height: 0 };
      var w = tr.width + (vw - tr.width) * g, h = tr.height + (vh - tr.height) * g, x = tr.left * (1 - g);
      /* from the thumbnail's centre to the pinned screen's centre (viewport coords) */
      var pr = pin.getBoundingClientRect();
      var c0 = tr.top + tr.height / 2, cy = c0 + (pr.top + vh / 2 - c0) * ge;
      reel.style.width = w.toFixed(1) + 'px'; reel.style.height = h.toFixed(1) + 'px';
      reel.style.transform = 'translate(' + (x - pr.left).toFixed(1) + 'px,' + (cy - h / 2 - pr.top).toFixed(1) + 'px)';
      var p = (s - T) / vh;
      reel.style.opacity = (1 - clamp((p - 0.12) / 0.4)).toFixed(3);
      /* the darkening only comes in as it grows: the hero thumbnail stays clear */
      if (!ovs) { ovs = $$('.ov, .ov2', reel); rv = $('video', reel); }
      ovs.forEach(function (o) { o.style.opacity = ge.toFixed(3); });
      /* small, the reel is zoomed onto its centre card so the thumbnail shows a site, not black */
      if (rv) rv.style.transform = 'scale(' + (1 + 1.55 * (1 - ge)).toFixed(4) + ')';
      /* title lines converge like PLAY / REEL: ±300px while the screen arrives */
      var off = 300 * (1 - g);
      if (lines[0]) lines[0].style.transform = 'translateX(' + (-off).toFixed(1) + 'px)';
      if (lines[1]) lines[1].style.transform = 'translateX(' + off.toFixed(1) + 'px)';
    }
    function frame() {
      reelFrame();
      if (innerWidth < 900) return;
      var p = -root.getBoundingClientRect().top / innerHeight - STEP0, e = [], k;
      for (k = 0; k < N; k++) e[k] = easeOut(clamp((p - k) / 0.6));
      for (k = 0; k < N; k++) {
        var L = (100 * (1 - e[k])).toFixed(3);
        masks[k].style.clipPath = 'polygon(' + L + '% ' + L + '%, 100% ' + L + '%, 100% 101%, ' + L + '% 101%)';
        var next = k + 1 < N ? e[k + 1] : 0;
        imgs[k].style.transform = 'scale(' + (next > 0 ? 1 + 0.2 * next : 1.1 - 0.1 * e[k]).toFixed(4) + ')';
      }
      var a = p < 0.05 ? -1 : Math.min(N - 1, Math.floor(p - 0.05));
      if (a !== active) { active = a; items.forEach(function (it, j) { it.classList.toggle('on', j === a); }); }
    }
    items.forEach(function (it) {
      it.addEventListener('click', function () {
        if (innerWidth < 900) return;
        smoothTo(scrollY + root.getBoundingClientRect().top + (STEP0 + (+it.getAttribute('data-i'))) * innerHeight + innerHeight * 0.65);
      });
    });
    onResize(frame); onFrame(frame); frame();
    /* the hero reveal animates the thumbnail's box for ~1s: follow it */
    var until = Date.now() + 1600; (function follow() { reelFrame(); if (Date.now() < until) requestAnimationFrame(follow); })();
  }

  /* ── What We Offer: ring of arcs follows the panel on screen ── */
  function offer() {
    var root = $('.vws-ft'); if (!root) return;
    var arcs = $$('.arc', root), nums = $$('.num', root), N = arcs.length, active = -1;
    function layout() { document.documentElement.style.setProperty('--vws-navh', '0px'); root.style.setProperty('--s', Math.min(1, (innerWidth - 32) / 696).toFixed(3)); }
    function frame() {
      var i = Math.max(0, Math.min(N - 1, Math.round(-root.getBoundingClientRect().top / innerHeight)));
      if (i === active) return; active = i;
      arcs.forEach(function (e, k) { e.classList.toggle('on', k === i); });
      nums.forEach(function (e, k) { e.classList.toggle('on', k === i); });
    }
    layout(); onResize(function () { layout(); active = -1; }); onFrame(frame); frame();
  }

  /* ── Pricing showcase: pinned tiers, words rise line by line, tier video swaps ── */
  function pricing() {
    var root = $('.vws-svc'); if (!root) return;
    var ROW_BASE = [0, 0.06, 0.12];
    function setDelays(scope) {
      $$('.a', scope).forEach(function (el) {
        var base = ROW_BASE[+el.getAttribute('data-r') || 0], top = null, line = -1;
        $$('.w', el).forEach(function (w) {
          var y = w.offsetTop; if (top === null || y > top + 2) { top = y; line++; }
          var dl = (base + line * 0.055).toFixed(3) + 's'; w.style.transitionDelay = dl + ',' + dl;
        });
      });
    }
    function replay(el) { el.classList.remove('on'); void el.offsetWidth; el.classList.add('on'); }
    var tiers = $$('.vws-svc-tier', root), vids = $$('.vws-svc-frame video', root), links = $$('.vws-svc-list a', root), desk = $('.vws-svc-d', root);
    var active = -1, inView = false;
    function activate(i) {
      if (i === active) return; active = i;
      tiers.forEach(function (t, k) { if (k === i) { t.classList.add('on'); setDelays(t); replay(t); } else t.classList.remove('on'); });
      vids.forEach(function (v, k) { v.classList.toggle('on', k === i); if (k === i && inView) play(v); });
      setTimeout(function () { vids.forEach(function (v, k) { if (k !== active) pause(v); }); }, 320);
      links.forEach(function (a, k) { a.classList.toggle('on', k === i); });
    }
    function frame() {
      if (!desk.offsetHeight) return;
      var r = desk.getBoundingClientRect(), p = clamp(-r.top / (r.height - innerHeight));
      activate(p < 0.25 ? 0 : p < 0.75 ? 1 : 2);
    }
    links.forEach(function (a) {
      a.addEventListener('click', function () {
        var r = desk.getBoundingClientRect();
        smoothTo(scrollY + r.top + (r.height - innerHeight) * (+a.getAttribute('data-i') * 0.5) + 2);
      });
    });
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.target === desk) {
          inView = e.isIntersecting;
          vids.forEach(function (v, k) { if (inView) loadVideo(v); if (inView && k === active) play(v); else if (!inView) pause(v); });
        } else {
          var v = $('video', e.target);
          if (e.isIntersecting) { play(v); if (!e.target.classList.contains('on')) { setDelays(e.target); replay(e.target); } } else pause(v);
        }
      });
    }, { rootMargin: '400px 0px' });
    io.observe(desk);
    $$('.vws-svc-mt', root).forEach(function (b) { b.classList.remove('on'); io.observe(b); });
    tiers.forEach(function (t) { t.classList.remove('on'); });
    onResize(function () { var a = active; active = -1; frame(); if (active === -1) activate(a < 0 ? 0 : a); });
    activate(0); onFrame(frame); frame();
  }

  /* ── Services page: stacked service cards scale in and out as you scroll ── */
  function serviceStack() {
    var list = $('#vws-svc-list'); if (!list) return;
    var panels = $$('.vws-sp-panel', list), inner = panels.map(function (p) { return $('.vws-sp-card', p); });
    var vh = innerHeight, top = 0;
    function cache() { vh = innerHeight; top = list.getBoundingClientRect().top + scrollY; }
    function frame() {
      var y = scrollY;
      for (var i = 0; i < panels.length; i++) {
        if (!inner[i]) continue;
        var pOut = clamp((y - top - i * vh) / vh), pIn = i === 0 ? 1 : clamp((y - top - (i - 1) * vh) / vh);
        var eIn = easeOut(pIn), eOut = easeIn(pOut);
        inner[i].style.transform = 'scale(' + Math.min(0.72 + 0.28 * eIn, 1 - 0.32 * eOut).toFixed(4) + ') translateY(' + ((1 - eIn) * 60).toFixed(2) + 'px)';
        inner[i].style.opacity = Math.min(0.05 + 0.95 * eIn, 1 - 0.88 * eOut).toFixed(4);
      }
    }
    cache(); onResize(cache); addEventListener('load', function () { cache(); frame(); });
    onFrame(frame); frame();
  }

  /* ── About page: hero fades into the black glow, feature chain slides, FAQ cards ── */
  function about() {
    var root = $('.vws-ab'); if (!root) return;
    var bgc = $('.vws-ab-bgc', root), fade = $('.vws-ab-bg .fade', root);
    var chain = $$('.vws-ab-chain img', root), fts = $$('.vws-ab-ft .v', root), fcs = $$('.vws-ab-fc .v', root), slider = $('.vws-ab-num .slider', root);
    var active = -1;
    function frame() {
      if (!bgc || !fade) return;
      if (innerWidth < 900) { fade.style.opacity = 1; return; }
      var f = -bgc.getBoundingClientRect().top / innerHeight;
      fade.style.opacity = (f < 0 ? 0 : f < 1 ? f : f < 2 ? 1 - 0.1 * (f - 1) : 0.9).toFixed(3);
      var iw = chain.length ? chain[0].offsetWidth : 464, ih = chain.length ? chain[0].offsetHeight : 348;
      chain.forEach(function (img, k) { var s = k + 1.5 - f; img.style.transform = 'translate(' + (s * (iw + 20)).toFixed(1) + 'px,' + (s * (ih + 20)).toFixed(1) + 'px)'; });
      var v = Math.max(0, Math.min(fts.length - 1, Math.floor(f - 1.5)));
      if (v !== active) {
        active = v;
        fts.forEach(function (e, i) { e.classList.toggle('on', i === v); });
        fcs.forEach(function (e, i) { e.classList.toggle('on', i === v); });
        if (slider) slider.style.transform = 'translateY(' + (-136 * v) + 'px)';
      }
    }
    $$('.vws-ab-q', root).forEach(function (b) {
      b.addEventListener('click', function () { var c = b.parentElement, open = !c.classList.contains('open'); c.classList.toggle('open', open); b.setAttribute('aria-expanded', open); });
    });
    onFrame(frame); frame();
  }

  /* ── Ending: CTA stage sized like object-fit:cover, footer wordmark fit to width ── */
  function ending() {
    var root = $('.vws-kend'); if (!root) return;
    var cta = $('.vws-kcta', root);
    function layout() {
      if (!cta) return;
      var W = cta.clientWidth, H, k;
      if (innerWidth < 900) { k = (W - 8) / 960; H = Math.max(520, Math.round(1080 * k + 150)); cta.style.height = H + 'px'; }
      else { cta.style.height = ''; H = cta.clientHeight; k = Math.max(W / 1740, H / 1080); }
      cta.style.setProperty('--k', k.toFixed(4));
      var h2 = $('.vws-kcta-h', cta), fs = Math.max(innerWidth < 900 ? 34 : 40, 64 * k);
      h2.style.fontSize = fs + 'px';
      h2.style.top = Math.round(H / 2 + (765 - 540) * k - fs / 2) + 'px';
    }
    var svg = $('.vws-kf-word', root), t = svg && $('text', svg);
    function fit() { try { var bb = t.getBBox(); if (bb.width) svg.setAttribute('viewBox', bb.x + ' ' + bb.y + ' ' + bb.width + ' ' + bb.height); } catch (e) {} }
    if (t) { t.setAttribute('font-size', '200'); fit(); if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit); }
    layout(); onResize(layout);
    var v = cta && $('video', cta);
    if (v) new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) play(v); else pause(v); }); }, { rootMargin: '300px 0px' }).observe(cta);
    var up = $('.vws-kf-up', root); if (up) up.addEventListener('click', function () { smoothTo(0); });
  }

  /* ── Home: the two trust cards slide in from the sides ── */
  function trustCards() {
    var cards = $$('#vws-hp-trust .vws-trust-card'); if (!cards.length) return;
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('vws-card-in'); io.unobserve(e.target); } }); }, { threshold: 0.2 });
    cards.forEach(function (c) { io.observe(c); });
  }

  /* ── Contact page FAQ (was React): one open at a time feels calmer, but keep theirs: each toggles ── */
  function contactFaq() {
    $$('.vws-cfaq').forEach(function (card) {
      var btn = $('button', card), ans = $('.vws-cfaq-a', card);
      btn.setAttribute('aria-expanded', 'false');
      btn.addEventListener('click', function () {
        var open = !card.classList.contains('open');
        card.classList.toggle('open', open); btn.setAttribute('aria-expanded', open);
        ans.style.height = open ? ans.scrollHeight + 'px' : '0px';
      });
    });
    $$('button[title="Copy email"]').forEach(function (b) {
      b.addEventListener('click', function () {
        var a = b.parentElement.querySelector('a[href^="mailto:"]'); if (!a) return;
        var txt = a.getAttribute('href').replace('mailto:', '');
        (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(function () {
          b.style.color = '#4ade80'; setTimeout(function () { b.style.color = ''; }, 1800);
        }).catch(function () {});
      });
    });
  }

  /* ── Portfolio cards open the live site ── */
  function portfolio() {
    $$('.vws-pf2-card[data-url]').forEach(function (card) {
      var ty = 0, moved = false, ts = 0;
      card.addEventListener('touchstart', function (e) { ts = Date.now(); ty = e.touches[0].clientY; moved = false; }, { passive: true });
      card.addEventListener('touchmove', function (e) { if (Math.abs(e.touches[0].clientY - ty) > 8) moved = true; }, { passive: true });
      card.addEventListener('touchend', function () { if (!moved && Date.now() - ts < 600) window.open(card.getAttribute('data-url'), '_blank', 'noopener'); });
      card.addEventListener('click', function (e) { if (e.pointerType === 'touch' || e.target.closest('a')) return; window.open(card.getAttribute('data-url'), '_blank', 'noopener'); });
    });
  }

  /* ── Old pricing-patch fades (.vws-pr-fade): shown while on screen, as the old page did ── */
  function prFades() {
    var els = $$('.vws-pr-fade'); if (!els.length) return;
    if (reduced) { els.forEach(function (e) { e.classList.add('vws-revealed'); }); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) en.target.classList.add('vws-revealed'); else if (en.boundingClientRect.top > 0) en.target.classList.remove('vws-revealed'); });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ── Sections fade up as they come into view (what React's motion used to do) ── */
  function reveals() {
    var els = $$('[data-rv]'); if (!els.length || reduced) return;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('rv-in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) {
      if (el.getBoundingClientRect().top < innerHeight * 0.92) return;   /* already on screen: leave it */
      el.classList.add('rv-pre'); io.observe(el);
    });
  }

  /* ── Links: other pages are real page loads (animated by the CSS view transition);
        a link to the page you're on glides back to the top instead of reloading ── */
  function samePageLinks() {
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href]'); if (!a || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (a.target && a.target !== '_self') return;
      var u = new URL(a.href, location.href); if (u.origin !== location.origin) return;
      var here = location.pathname.replace(/\/+$/, '') || '/', there = u.pathname.replace(/\/+$/, '') || '/';
      if (here !== there || u.search !== location.search) return;
      e.preventDefault();
      var t = u.hash && document.getElementById(u.hash.slice(1));
      smoothTo(t ? t.getBoundingClientRect().top + scrollY - 90 : 0);
    });
  }

  /* ═════════ Motion borrowed from our own builds (11-06) ═════════ */

  /* wrap every word of an element's text in a mask, keeping its own markup (<br>, coloured spans) */
  function splitWords(el, cls, innerCls) {
    var n = 0;
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (c) {
        if (c.nodeType === 1) { if (c.tagName !== 'BR' && c.tagName !== 'SVG' && c.tagName !== 'IMG') walk(c); return; }
        if (c.nodeType !== 3 || !c.textContent.trim()) return;
        var frag = document.createDocumentFragment();
        c.textContent.split(/(\s+)/).forEach(function (tok) {
          if (!tok) return;
          if (/^\s+$/.test(tok)) { frag.appendChild(document.createTextNode(tok)); return; }
          var o = document.createElement('span'); o.className = cls;
          var i = document.createElement('span'); i.className = innerCls; i.textContent = tok; i.style.setProperty('--wi', n++);
          o.appendChild(i); frag.appendChild(o);
        });
        c.parentNode.replaceChild(frag, c);
      });
    })(el);
    return n;
  }
  /* Marlow Interior: section headings rise word by word as they reach 80% of the screen,
     and leave again when you scroll back up above them ("play none play reverse") */
  function wordReveal() {
    if (reduced) return;
    var SKIP = '.vws-kh,.vws-kn,.vws-pr-title,.vws-ft,.vws-svc,.vws-sp-title,#vws-hero,.vws-mq,.vws-fr';
    var els = $$('h2, .vws-ab-screen h1').filter(function (h) {
      if (h.closest(SKIP) || !h.textContent.trim() || h.querySelector('.vw')) return false;
      for (var e = h; e && e !== document.body; e = e.parentElement) if (/text/.test(getComputedStyle(e).webkitBackgroundClip || getComputedStyle(e).backgroundClip)) return false;
      return true;
    });
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) e.target.classList.add('vw-on');
        else if (e.boundingClientRect.top > 0) e.target.classList.remove('vw-on');   /* only when it's back below */
      });
    }, { rootMargin: '0px 0px -20% 0px' });
    els.forEach(function (h) {
      splitWords(h, 'vw', 'vw-i');
      var r = h.getBoundingClientRect();
      if (r.top < innerHeight * 0.8 && r.bottom > 0) requestAnimationFrame(function () { requestAnimationFrame(function () { h.classList.add('vw-on'); }); });
      io.observe(h);
    });
  }
  /* Altura: titles arrive letter by letter: service-page heroes on load, Services cards as each comes in */
  function letterReveal() {
    if (reduced) return;
    var els = $$('#vws-hero h1, .vws-sp-title');
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('hc-on'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -25% 0px' });
    els.forEach(function (h) {
      var ci = 0;
      (function walk(node) {
        Array.prototype.slice.call(node.childNodes).forEach(function (c) {
          if (c.nodeType === 1) { if (c.tagName !== 'BR') walk(c); return; }
          if (c.nodeType !== 3 || !c.textContent.trim()) return;
          var frag = document.createDocumentFragment();
          c.textContent.split(/(\s+)/).forEach(function (tok) {
            if (!tok) return;
            if (/^\s+$/.test(tok)) { frag.appendChild(document.createTextNode(tok)); return; }
            var w = document.createElement('span'); w.className = 'hw';
            Array.prototype.forEach.call(tok, function (ch) { var s = document.createElement('span'); s.className = 'hc'; s.textContent = ch; s.style.setProperty('--ci', ci); s.style.setProperty('--cy', Math.min(ci, 10)); ci++; w.appendChild(s); });
            frag.appendChild(w);
          });
          c.parentNode.replaceChild(frag, c);
        });
      })(h);
      io.observe(h);
    });
  }
  /* SOLE Residence: a slow marquee band; your scroll speed pushes it along */
  function marquee() {
    var page = location.pathname.replace(/\/+$/, ''), items, after;
    if (page === '/work') {
      items = []; $$('.vws-pf2-lbl').forEach(function (l) { var t = l.textContent.trim(); if (t && items.indexOf(t) < 0) items.push(t); });
      items = items.slice(0, 12);
    } else if (page === '/pricing') {
      items = ['One-time payment', 'No monthly fees', 'No surprises', 'You own everything on day one', 'Hosting & domain included'];
    } else return;
    after = $('.vws-kh[role="region"]'); if (!after || !items.length) return;
    var band = document.createElement('div'); band.className = 'vws-mq'; band.setAttribute('aria-hidden', 'true');
    var list = '<div class="vws-mq-l">' + items.map(function (t) { var s = document.createElement('span'); s.textContent = t; return s.outerHTML + '<i></i>'; }).join('') + '</div>';
    band.innerHTML = '<div class="vws-mq-t">' + list + list + list + '</div>';
    after.parentNode.insertBefore(band, after.nextSibling);
    if (reduced) return;
    var track = $('.vws-mq-t', band), one = $('.vws-mq-l', band), x = 0, last = performance.now(), lastY = scrollY, boost = 0;
    (function loop(t) {
      var dt = Math.min(64, t - last); last = t;
      var dy = Math.abs(scrollY - lastY); lastY = scrollY;
      boost += (Math.min(dy * 0.9, 40) - boost) * 0.08;
      x -= (0.045 + boost * 0.02) * dt;
      var w = one.offsetWidth; if (w && -x >= w) x += w;
      track.style.transform = 'translate3d(' + x.toFixed(2) + 'px,0,0)';
      requestAnimationFrame(loop);
    })(last);
  }
  /* Marlow Interior: frame growth: each portfolio card's frame opens out as it scrolls in */
  function frameGrowth() {
    var cards = $$('.vws-pf2-card'); if (!cards.length || reduced) return;
    cards.forEach(function (c) { c.classList.add('vws-fg'); });
    function frame() {
      var vh = innerHeight;
      cards.forEach(function (c) {
        var r = c.getBoundingClientRect(); if (r.bottom < -50 || r.top > vh + 50) return;
        var p = easeOut(clamp((vh - r.top) / (vh * 0.55))), ix = (1 - p) * 9, iy = (1 - p) * 7;
        c.style.clipPath = p >= 1 ? 'none' : 'inset(' + iy.toFixed(2) + '% ' + ix.toFixed(2) + '% round ' + (8 + 16 * (1 - p)).toFixed(1) + 'px)';
      });
    }
    onFrame(frame); onResize(frame); frame();
  }
  /* Aurelia Med Spa: sky reveal: a circle opens from below (contact form card, pricing formula cards) */
  function circleReveal() {
    if (reduced) return;
    var els = $$('#vws-contact-form-sec .rounded-2xl.shadow-2xl, #vws-contact-form-sec form').slice(0, 1);
    var formula = $$('h2').filter(function (h) { return /Proven Formula/i.test(h.textContent); })[0];
    if (formula) { var sec = formula.closest('section'); if (sec) els = els.concat($$('.grid > div', sec).slice(0, 8)); }
    if (!els.length) return;
    /* watch each element's parent: a fully clipped element never counts as on screen */
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (!e.isIntersecting) return; (e.target._cr || []).forEach(function (el) { el.classList.add('vws-cr-on'); }); io.unobserve(e.target); });
    }, { rootMargin: '0px 0px -12% 0px' });
    els.forEach(function (el, i) {
      el.classList.add('vws-cr'); el.style.transitionDelay = ((i % 4) * 90) + 'ms';
      var host = el.parentElement; (host._cr = host._cr || []).push(el); io.observe(host);
    });
  }
  /* Clearwell: on Contact, the full-screen background video rounds into a framed window as you scroll
     (Clearwell's hero: inset 16/12px with a growing corner radius while the video inside scales down;
     here it stops at a window that stays visible around the form and the questions) */
  function pillShrink() {
    if (location.pathname.replace(/\/+$/, '') !== '/contact' || reduced) return;
    var box = $('#root .fixed.inset-0.-z-10'), v = box && $('video', box); if (!box) return;
    function frame() {
      var p = easeOut(clamp(scrollY / (innerHeight * 0.9)));
      if (p <= 0) { box.style.clipPath = ''; if (v) v.style.transform = ''; return; }
      var sm = innerWidth < 810, ix = p * (sm ? 3 : 6), iy = p * (sm ? 4 : 8), rad = p * (sm ? 36 : 220);
      box.style.clipPath = 'inset(' + iy.toFixed(2) + '% ' + ix.toFixed(2) + '% round ' + rad.toFixed(0) + 'px)';
      if (v) { v.style.transform = 'scale(' + (1 - 0.14 * p).toFixed(4) + ')'; v.style.transformOrigin = '50% 50%'; }
    }
    onFrame(frame); frame();
  }
  /* Harbor Mind: a closing line under the footer, uncovered as the footer scrolls away;
     the footer links slide up in turn when the footer arrives */
  function footerReveal() {
    var kend = $('.vws-kend'); if (!kend || $('.vws-fr', kend)) return;
    var fr = document.createElement('div'); fr.className = 'vws-fr'; fr.innerHTML = '<p>Websites that turn searches into calls &amp; clients.</p>';
    kend.appendChild(fr);
    if (reduced) return;
    var links = $$('.vws-kf .col li a', kend);
    links.forEach(function (a, i) { var t = a.innerHTML; a.innerHTML = '<span class="vw-i" style="--wi:' + i + '">' + t + '</span>'; a.style.display = 'inline-block'; });
    var cols = $('.vws-kf-top', kend);
    if (cols) new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) cols.classList.add('vw-on'); else if (e.boundingClientRect.top > 0) cols.classList.remove('vw-on'); }); }, { rootMargin: '0px 0px -10% 0px' }).observe(cols);
  }

  function start() {
    lenis(); header(); hero(); process(); offer(); pricing(); serviceStack(); about(); ending();
    trustCards(); contactFaq(); portfolio(); prFades(); reveals(); samePageLinks(); lazyVideos();
    marquee(); wordReveal(); letterReveal(); frameGrowth(); circleReveal(); pillShrink(); footerReveal();
    requestAnimationFrame(tick);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
