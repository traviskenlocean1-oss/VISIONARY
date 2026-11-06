/* extracted from the old SPA page by tools/extract-legacy.js */
(function() {
    var KEY = 'vws_consent_v2';
    var REJECT_KEY = 'vws_cb_reject_count';

    /* Never show if user already accepted */
    if (localStorage.getItem(KEY)) return;
    /* After 2 rejections, stop asking */
    if (parseInt(localStorage.getItem(REJECT_KEY) || '0', 10) >= 2) return;

    /* ── Cookie categories ── */
    var CATS = [
      {
        id: 'necessary',
        label: 'Strictly Necessary',
        required: true,
        checked: true,
        desc: 'Required for the website to function. Cannot be disabled. These include session security, load balancing, and fraud prevention. No personal data is collected or shared.'
      },
      {
        id: 'analytics',
        label: 'Analytics & Statistics',
        required: false,
        checked: false,
        desc: 'Help us understand how visitors interact with our site by collecting anonymized data — page views, session duration, traffic sources. Used to improve our services. No data is sold or shared with ad networks.'
      },
      {
        id: 'marketing',
        label: 'Marketing',
        required: false,
        checked: false,
        desc: 'Allow us to show you relevant content about our services across partner sites. We never sell your data. You can opt out at any time and submissions will still reach us directly.'
      },
      {
        id: 'functional',
        label: 'Functional',
        required: false,
        checked: false,
        desc: 'Enable enhanced features like live chat, remembering your preferences, and personalized content. Disabling these may limit certain site features.'
      }
    ];

    /* ── Load GA4 (only after consent) ── */
    var GA_ID = 'G-WFEEKQFX4G';
    function loadGA() {
      if (window._vwsGaLoaded) return;
      window._vwsGaLoaded = true;
      var s = document.createElement('script');
      s.async = true;
      s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
      document.head.appendChild(s);
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', GA_ID, { send_page_view: true });
      window._vwsGtag = gtag;
    }

    /* ── Save consent ── */
    function saveConsent(prefs) {
      localStorage.setItem(KEY, JSON.stringify({ prefs: prefs, ts: Date.now(), v: '2' }));
      if (prefs.analytics) loadGA();
    }

    /* ── Auto-load GA if already accepted in a previous visit ── */
    (function() {
      var stored = localStorage.getItem(KEY);
      if (stored) {
        try { var p = JSON.parse(stored); if (p.prefs && p.prefs.analytics) loadGA(); } catch(e) {}
      }
    })();

    /* ── Build banner ── */
    var cookieSVG = '<svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8.5 8.5a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0M15 9a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0M9 15a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0M13.5 13.5a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0"/></svg>';

    var banner = document.createElement('div');
    banner.id = 'vws-cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.innerHTML =
      '<p class="vws-cb-title">We value your privacy</p>'
      + '<p class="vws-cb-text">We use cookies to enhance your experience, analyze our traffic, and for marketing purposes. You are in full control of what you share. <a href="/privacy-policy" target="_blank" rel="noopener">Privacy Policy</a></p>'
      + '<div class="vws-cb-btns">'
      + '<button id="vws-cb-deny">Reject All</button>'
      + '<button id="vws-cb-accept">Accept All</button>'
      + '</div>'
      + '<div class="vws-cb-manage-wrap"><button id="vws-cb-manage">Manage cookie preferences</button></div>';

    /* ── Build preferences modal ── */
    var catRows = CATS.map(function(c) {
      return '<div class="vws-ck-cat">'
        + '<div class="vws-ck-cat-info">'
        + '<strong>' + c.label + (c.required ? ' <span class="vws-ck-required-badge">Always On</span>' : '') + '</strong>'
        + '<p>' + c.desc + '</p>'
        + '</div>'
        + '<label class="vws-ck-toggle" aria-label="' + c.label + '">'
        + '<input type="checkbox" id="vws-ck-' + c.id + '" ' + (c.checked ? 'checked' : '') + ' ' + (c.required ? 'disabled' : '') + '/>'
        + '<span class="vws-ck-track"></span>'
        + '</label>'
        + '</div>';
    }).join('');

    var modal = document.createElement('div');
    modal.id = 'vws-ck-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Cookie preferences');
    modal.innerHTML =
      '<div id="vws-ck-box">'
      + '<h2>Cookie Preferences</h2>'
      + '<p class="vws-ck-desc">Choose which cookies you allow us to use. Strictly necessary cookies cannot be disabled as they are required for the site to function. Your choices are saved and applied immediately. You may change your preferences at any time.</p>'
      + catRows
      + '<div id="vws-ck-modal-actions">'
      + '<button id="vws-ck-acceptall">Accept All</button>'
      + '<button id="vws-ck-save">Save My Preferences</button>'
      + '</div>'
      + '</div>';

    /* ── Mount ── */
    function mount() {
      /* Suppress any React-built cookie banner */
      ['.fixed.bottom-6.left-6', '[class*="cookie"]', '[class*="consent"]'].forEach(function(sel) {
        try { var el = document.querySelector(sel); if (el && el.id !== 'vws-cookie-banner') el.style.setProperty('display','none','important'); } catch(e){}
      });

      document.body.appendChild(banner);
      document.body.appendChild(modal);

      setTimeout(function() { banner.classList.add('vws-cb-in'); }, 800);
    }

    /* ── Dismiss banner ── */
    function hideBanner() {
      banner.classList.remove('vws-cb-in');
      setTimeout(function() { banner.style.display = 'none'; }, 450);
    }

    function hideModal() {
      modal.style.display = 'none';
    }

    /* ── Wire up banner buttons ── */
    banner.querySelector('#vws-cb-accept').addEventListener('click', function() {
      saveConsent({necessary:true, analytics:true, marketing:true, functional:true});
      hideBanner();
    });

    banner.querySelector('#vws-cb-deny').addEventListener('click', function() {
      var count = parseInt(localStorage.getItem(REJECT_KEY) || '0', 10) + 1;
      localStorage.setItem(REJECT_KEY, count);
      hideBanner();
    });

    banner.querySelector('#vws-cb-manage').addEventListener('click', function() {
      modal.style.display = 'flex';
    });

    /* ── Wire up modal buttons ── */
    modal.querySelector('#vws-ck-acceptall').addEventListener('click', function() {
      CATS.forEach(function(c) { var el = document.getElementById('vws-ck-' + c.id); if (el) el.checked = true; });
      saveConsent({necessary:true, analytics:true, marketing:true, functional:true});
      hideModal();
      hideBanner();
    });

    modal.querySelector('#vws-ck-save').addEventListener('click', function() {
      var prefs = {};
      CATS.forEach(function(c) { var el = document.getElementById('vws-ck-' + c.id); prefs[c.id] = el ? el.checked : c.required; });
      saveConsent(prefs);
      hideModal();
      hideBanner();
    });

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', mount);
    } else {
      mount();
    }
  })();
