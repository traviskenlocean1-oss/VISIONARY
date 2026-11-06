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
    function frame() {
      if (innerWidth < 900) return;
      var p = -root.getBoundingClientRect().top / innerHeight, e = [], k;
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
        smoothTo(scrollY + root.getBoundingClientRect().top + (+it.getAttribute('data-i')) * innerHeight + innerHeight * 0.65);
      });
    });
    onFrame(frame); frame();
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

  function start() {
    lenis(); header(); hero(); process(); offer(); pricing(); serviceStack(); about(); ending();
    trustCards(); contactFaq(); portfolio(); reveals(); samePageLinks(); lazyVideos();
    requestAnimationFrame(tick);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
