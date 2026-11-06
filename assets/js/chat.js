/* extracted from the old SPA page by tools/extract-legacy.js */
(function(){
  /* ── 1. Session memory: track dismiss ── */
  var DISMISSED_KEY = 'vws_chat_dismissed';
  var OPENED_KEY    = 'vws_chat_opened';

  /* ── 2. Conversation tree ── */
  var TREE = {
    start: {
      bot: "Hey! 👋 Welcome to Visionary Web Studio.\nWe build custom websites that actually get you calls — for any type of local business.\n\nWhat brings you in today?",
      replies: [
        {label:'I need a brand new website', next:'new'},
        {label:'Redesign my existing site',  next:'redesign'},
        {label:'I want to see pricing',       next:'pricing'},
        {label:'Just browsing for now',       next:'browse'}
      ]
    },
    new: {
      bot: "Building from scratch is always the cleanest approach. 💪\n\nWe hand-code everything — no templates, no WordPress — and deliver your first draft in 48 hours.\n\nWhat type of business do you run?",
      replies: [
        {label:'Service business (contractor, detailing, etc.)', next:'svc_biz'},
        {label:'Retail or local shop',   next:'retail'},
        {label:'Professional services',  next:'pro'},
        {label:'Something else',         next:'other'}
      ]
    },
    svc_biz: {
      bot: "Service businesses are our specialty — we've built for detailers, cleaners, contractors, trainers, and more.\n\nMost service businesses go with our Standard package:\n\n💰 <b>$750–1,000 one-time</b> — up to 5 pages, full SEO, contact form, Google Maps, mobile-first.\n\nWant our team to reach out to you?",
      replies: [
        {label:"Yes, have the team reach out", next:'capture'},
        {label:'Tell me more about pricing',  next:'pricing'},
        {label:'What does it look like?',     next:'portfolio'}
      ]
    },
    retail: {
      bot: "Retail and shop sites are great — product showcases, hours, location, trust-building design.\n\nOur Standard package ($750–1,000 one-time) covers everything a local shop needs to dominate Google.\n\nWant a quote? Our team will reach out.",
      replies: [
        {label:"Yes, get me a quote", next:'capture'},
        {label:'Show me pricing',     next:'pricing'}
      ]
    },
    pro: {
      bot: "Professional services need a trust-first design — clear credentials, strong copy, easy contact.\n\nWe specialize in exactly that. Starting at $750–1,000 one-time with full ownership of your site.\n\nWant our team to send you a proposal?",
      replies: [
        {label:"Yes, send a proposal", next:'capture'},
        {label:'See pricing first',    next:'pricing'}
      ]
    },
    other: {
      bot: "No problem — we work with all types of businesses. Every site is built from scratch for your specific market.\n\nBest way forward is a quick call. Want our team to reach out?",
      replies: [
        {label:"Yes, have the team call me", next:'capture'},
        {label:'See pricing first',        next:'pricing'}
      ]
    },
    redesign: {
      bot: "Got it — we do a lot of redesigns. Most launch in under 7 days.\n\nWhat platform is your current site on?",
      replies: [
        {label:'WordPress',            next:'wp'},
        {label:'Wix / Squarespace',    next:'wp'},
        {label:'Custom / HTML',        next:'redesign2'},
        {label:"Not sure",             next:'redesign2'}
      ]
    },
    wp: {
      bot: "WordPress and Wix sites are usually slow, bloated, and a pain to maintain.\n\nWe strip it all out and hand-code a clean, fast replacement — usually 3–5x faster than your current site.\n\nWant a quote to rebuild it right?",
      replies: [
        {label:"Yes, get me a quote", next:'capture'},
        {label:'What will it cost?',  next:'pricing'}
      ]
    },
    redesign2: {
      bot: "Perfect — we'll analyze your current site and rebuild what works, improve what doesn't, and make the whole thing faster and cleaner.\n\nStarting at $500, fully owned by you when done.\n\nWant our team to put together a proposal?",
      replies: [
        {label:"Yes, send a proposal", next:'capture'},
        {label:'See all pricing',      next:'pricing'}
      ]
    },
    pricing: {
      bot: "Here's the quick breakdown:\n\n💰 <b>Starter — $500–750</b> · 2–3 pages, perfect for getting online fast\n💰 <b>Standard — $750–1,000</b> · Up to 5 pages, most popular for service businesses\n💰 <b>Full Build — $1,000–2,000</b> · Up to 10 pages, blog, advanced SEO\n🔧 <b>Maintenance — $100/mo</b> · Unlimited updates, same-day turnaround\n\n<b>Deposits:</b> We require a 50% deposit to begin. Remainder due at launch.\n\nAll plans are one-time fees. You own the site outright.\n\nAny of these stand out for you?",
      replies: [
        {label:'Standard sounds right', next:'capture'},
        {label:'Tell me about Full Build',      next:'fullbuild'},
        {label:'What about maintenance?',       next:'maintenance'}
      ]
    },
    fullbuild: {
      bot: "Full Build at $1,000–2,000 gets you:\n\n✅ Up to 10 custom pages\n✅ Custom animations\n✅ Blog or portfolio section\n✅ Advanced SEO + schema markup\n✅ Logo design included\n✅ Unlimited revisions for 30 days\n\nBest value if you want the full treatment.\n\nWant to get started?",
      replies: [
        {label:"Yes, I want Full Build", next:'capture'},
        {label:"Back to pricing",        next:'pricing'}
      ]
    },
    maintenance: {
      bot: "Maintenance is $100/month and includes:\n\n✅ Unlimited content updates\n✅ Same-day turnaround on changes\n✅ Monthly performance report\n✅ Security + uptime monitoring\n✅ Priority support access\n\nCancel anytime. Most clients add it after launch.\n\nWant to get your site built first?",
      replies: [
        {label:"Yes, let's build the site", next:'capture'},
        {label:'See base pricing',          next:'pricing'}
      ]
    },
    portfolio: {
      bot: "We've built for auto detailers, fitness trainers, professional services, and more.\n\nScroll down to the portfolio section on this page to see some of our work. 👇\n\nReady to get a quote?",
      replies: [
        {label:"Yes, get me a quote", next:'capture'},
        {label:'See pricing first',   next:'pricing'}
      ]
    },
    browse: {
      bot: "No worries at all! Take a look around. 😊\n\nIf you have any questions while you're browsing — pricing, timelines, what we can build — just ask. I'm right here.",
      replies: [
        {label:'What does it cost?',          next:'pricing'},
        {label:'How fast is the turnaround?', next:'timeline'},
        {label:'Can I see some examples?',    next:'portfolio'}
      ]
    },
    timeline: {
      bot: "Most projects go like this:\n\n⚡ <b>48 hours</b> — first draft ready for review\n✏️ <b>Day 3–4</b> — revisions based on your feedback\n🚀 <b>Day 5–7</b> — live and indexed on Google\n\nSome simple sites go live in 48 hours flat.\n\nReady to get started?",
      replies: [
        {label:"Let's do it", next:'capture'},
        {label:'See pricing', next:'pricing'}
      ]
    },
    capture: {
      bot: "Great! What's your name, and a phone or email we can reach you at?\n\n🔒 Your info is private and never shared — only our team sees it.",
      replies: [],
      input: true,
      inputFields: ['name','phone','email']
    },
    done: {
      bot: "Got it, {name}! ✅\n\nYour info was sent securely to our team. We'll reach out via {contact} within a few hours — usually same day.\n\nYou can also call or text directly:\n📞 <a href=\"tel:+15618890507\" style=\"color:#60a5fa\">(561) 889-0507</a>",
      replies: [],
      final: true
    }
  };

  /* ── LEAD WEBHOOK — Make.com backup ── */
  /* Make.com scenario turned off 2026-10-23 (bots were posting to the public hook URL directly). */
  var LEAD_WEBHOOK = '';

  /* ── LEAD INBOX — Google Apps Script (outreach-bot/Code.gs doPost) ──
     Logs every lead to the "Website Leads" sheet tab and emails the owner
     with every field spelled out. text/plain + no-cors keeps it a simple
     request (no preflight), which Apps Script web apps require. */
  var LEAD_INBOX = 'https://script.google.com/macros/s/AKfycbxLPb9Xvrg7eEEnTTTE-PvGYu4cqQcjQWyUHg-InopWzRLYkewTmOwECPBHgIpbuUsMFA/exec';
  function vwsSendToInbox(data) {
    fetch(LEAD_INBOX, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(data)
    }).catch(function(){});
  }

  /* ── Spam-bot traps for every lead form and the chat form ──
     1. Honeypot: a hidden field real visitors never see; bots that fill
        every input fill it too. Also sent to FormSubmit as _honey, which
        drops any submission where it has a value.
     2. Time trap: nothing a person types arrives within 3s of page load.
     Bot submissions still get the normal "sent" UI so bots learn nothing;
     they just never reach Gmail or Make.com. */
  var VWS_LOADED_AT = Date.now();
  function vwsAddHoneypot(box) {
    if (!box || box.querySelector('.vws-hp')) return;
    var hp = document.createElement('input');
    hp.type = 'text'; hp.name = '_hp_website'; hp.className = 'vws-hp';
    hp.tabIndex = -1; hp.autocomplete = 'off';
    hp.setAttribute('aria-hidden', 'true');
    hp.style.cssText = 'position:absolute!important;left:-9999px!important;width:1px!important;height:1px!important;opacity:0!important;pointer-events:none!important';
    box.appendChild(hp);
  }
  function vwsHoneypotValue(box) {
    var hp = box && box.querySelector('.vws-hp');
    return hp ? hp.value : '';
  }
  function vwsLooksLikeBot(box) {
    return !!vwsHoneypotValue(box) || (Date.now() - VWS_LOADED_AT < 3000);
  }
  (function watchForms() {
    var queued = false;
    function tag() { queued = false; document.querySelectorAll('form, #vws-form').forEach(vwsAddHoneypot); }
    tag();
    new MutationObserver(function() {
      if (queued) return;
      queued = true;
      requestAnimationFrame(tag);
    }).observe(document.body, { childList: true, subtree: true });
  })();

  /* ── Intercept ALL site forms → Gmail via FormSubmit, suppress React error ── */
  document.addEventListener('submit', function(e) {
    var form = e.target;
    var nameEl  = form.querySelector('[name="name"]');
    var emailEl = form.querySelector('[name="email"]');
    var phoneEl = form.querySelector('[name="phone"]');
    var msgEl   = form.querySelector('[name="message"]');
    var name    = nameEl  ? nameEl.value.trim()  : '';
    var email   = emailEl ? emailEl.value.trim() : '';
    var phone   = phoneEl ? phoneEl.value.trim() : '';
    var msg     = msgEl   ? msgEl.value.trim()   : '';
    if (!name && !phone && !email) return;
    /* Stop React from seeing this submit — prevents "Something went wrong" */
    e.preventDefault();
    e.stopPropagation();
    /* Show success state on button immediately */
    var btn = form.querySelector('button[type="submit"], input[type="submit"]');
    if (btn) {
      btn.disabled = true;
      btn.setAttribute('data-vws-submitted', '1'); /* prevents MutationObserver from resetting green state */
      btn.textContent = '✓ Message Sent!';
      btn.style.cssText = 'background:#16a34a!important;color:#fff!important;opacity:1!important;cursor:default!important';
    }
    if (vwsLooksLikeBot(form)) return;
    var payload = {
      name: name,
      email: email,
      phone: phone,
      message: msg,
      _subject: 'New Lead — Visionary Web Studio',
      _template: 'table',
      _captcha: 'false',
      _replyto: email,
      source: window.location.href,
      time: new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })
    };
    /* Primary — FormSubmit → direct Gmail delivery (FormData is more reliable than JSON for AJAX endpoint) */
    var fd = new FormData();
    fd.append('name', name);
    fd.append('email', email);
    fd.append('phone', phone);
    fd.append('message', msg);
    fd.append('source', window.location.href);
    fd.append('time', new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }));
    fd.append('_subject', 'New Lead — Visionary Web Studio');
    fd.append('_template', 'table');
    fd.append('_captcha', 'false');
    fd.append('_honey', vwsHoneypotValue(form));
    fd.append('_replyto', email);
    fetch('https://formsubmit.co/ajax/visionarywebstudio6@gmail.com', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: fd
    }).catch(function(){});
    vwsSendToInbox({ name: name, phone: phone, email: email, message: msg, page: window.location.href, time: payload.time, form: 'contact form' });
    /* Backup — Make.com webhook */
    if (LEAD_WEBHOOK && LEAD_WEBHOOK !== 'YOUR_MAKE_WEBHOOK_URL') {
      fetch(LEAD_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(function(){});
    }
  }, true);

  /* ── 3. Build the widget DOM ── */
  function buildChat() {
    if (document.getElementById('vws-chat-root')) return;

    /* ── Kill React chat widget (fixed bottom-right, positive z-index only) ── */
    Array.from(document.querySelectorAll('*')).forEach(function(el) {
      /* Skip our own VWS elements — especially the nav overlay */
      if (el.id && el.id.indexOf('vws-') === 0) return;
      var s = window.getComputedStyle(el);
      var b = parseInt(s.bottom), r = parseInt(s.right);
      var zi = parseInt(s.zIndex);
      /* Skip full-screen background layers (negative z-index like -z-10) */
      if (isNaN(zi) || zi < 0) return;
      if (s.position === 'fixed' && b >= 0 && b <= 120 && r >= 0 && r <= 120) {
        el.style.cssText += ';display:none!important;visibility:hidden!important;opacity:0!important;pointer-events:none!important';
      }
    });

    /* Root */
    var root = document.createElement('div');
    root.id = 'vws-chat-root';
    root.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:10000;display:flex;flex-direction:column;align-items:flex-end;gap:12px';
    document.body.appendChild(root);

    /* ── Chat window (agency redesign) ── */
    var win = document.createElement('div');
    win.id = 'vws-chat-win';
    win.style.cssText = 'width:368px;max-width:calc(100vw - 28px);border-radius:16px;overflow:hidden;display:none;flex-direction:column;background:#ffffff;box-shadow:0 32px 80px rgba(0,0,0,.18),0 0 0 1px rgba(0,0,0,.1);animation:vws-slidein .26s cubic-bezier(.22,.68,0,1.2) both';

    win.innerHTML = [
      /* ── Header ── */
      '<div style="background:linear-gradient(135deg,#0f1f5c 0%,#1a3da8 60%,#1d4ed8 100%);padding:18px 16px 16px;flex-shrink:0;position:relative;overflow:hidden">',
        /* Top accent line */
        '<div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#60a5fa,#818cf8,#60a5fa)"></div>',
        /* Brand row */
        '<div style="display:flex;align-items:center;gap:12px">',
          /* V shield icon */
          '<div style="width:38px;height:38px;flex-shrink:0;border-radius:10px;background:rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,.15)">',
            '<svg width="22" height="26" viewBox="0 0 40 48" fill="none">',
              '<path d="M20 1L39 12V30L20 47L1 30V12L20 1Z" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" stroke-width="0.5"/>',
              '<path d="M9 18L20 38L31 18" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',
            '</svg>',
          '</div>',
          '<div style="flex:1;min-width:0">',
            '<p style="font-size:14px;font-weight:800;color:#fff;letter-spacing:.02em;margin-bottom:3px">Visionary Web Studio</p>',
            '<p id="vws-status" style="font-size:11px;color:rgba(255,255,255,.6);display:flex;align-items:center;gap:5px">',
              '<span style="width:7px;height:7px;border-radius:50%;background:#4ade80;display:inline-block;flex-shrink:0;box-shadow:0 0 6px rgba(74,222,128,.6)"></span>',
              'Online now · Replies in minutes',
            '</p>',
          '</div>',
          /* Controls */
          '<div style="display:flex;gap:6px;flex-shrink:0">',
            '<button id="vws-min" title="Minimize" style="background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);border-radius:6px;width:28px;height:28px;cursor:pointer;color:rgba(255,255,255,.8);font-size:15px;line-height:1;display:flex;align-items:center;justify-content:center;transition:background .15s">−</button>',
            '<button id="vws-cls" title="Close"    style="background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);border-radius:6px;width:28px;height:28px;cursor:pointer;color:rgba(255,255,255,.8);font-size:15px;line-height:1;display:flex;align-items:center;justify-content:center;transition:background .15s">×</button>',
          '</div>',
        '</div>',
      '</div>',
      /* ── Messages ── */
      '<div id="vws-msgs" style="height:290px;overflow-y:auto;background:#f8fafc;padding:16px 0 8px;display:flex;flex-direction:column;gap:10px;scroll-behavior:smooth">',
        '<p style="text-align:center;font-size:10px;color:rgba(0,0,0,.35);padding:0 16px;letter-spacing:.05em">— Chat started —</p>',
      '</div>',
      /* ── Quick replies ── */
      '<div id="vws-qr" style="padding:10px 14px 12px;display:flex;flex-wrap:wrap;gap:7px;background:#f8fafc;border-top:1px solid rgba(0,0,0,.08);min-height:20px"></div>',
      /* ── Lead form ── */
      '<div id="vws-form" style="display:none;padding:14px;background:#f8fafc;border-top:1px solid rgba(0,0,0,.08)">',
        '<input id="vws-fname"  placeholder="Your name"         style="width:100%;background:#fff;border:1px solid rgba(0,0,0,.15);border-radius:8px;padding:10px 13px;font-size:13px;color:#1a1a2e;outline:none;margin-bottom:9px;transition:border-color .2s,box-shadow .2s"/>',
        '<input id="vws-fphone" placeholder="Your phone number" style="width:100%;background:#fff;border:1px solid rgba(0,0,0,.15);border-radius:8px;padding:10px 13px;font-size:13px;color:#1a1a2e;outline:none;margin-bottom:9px;transition:border-color .2s,box-shadow .2s"/>',
        '<input id="vws-femail" placeholder="Your email"        style="width:100%;background:#fff;border:1px solid rgba(0,0,0,.15);border-radius:8px;padding:10px 13px;font-size:13px;color:#1a1a2e;outline:none;margin-bottom:6px;transition:border-color .2s,box-shadow .2s"/>',
        '<p style="font-size:10px;color:rgba(0,0,0,.4);margin:0 0 12px 2px">Give us a phone or an email — whichever\'s easiest for us to reach you.</p>',
        '<button id="vws-fsub" style="width:100%;background:linear-gradient(135deg,#1d4ed8,#2563eb);border:none;border-radius:8px;padding:11px;font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#fff;cursor:pointer">Send — We\'ll Reach Out →</button>',
        '<div style="display:flex;align-items:center;justify-content:center;gap:5px;margin-top:9px">',
          '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(37,99,235,0.7)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
          '<span style="font-size:10px;color:rgba(0,0,0,.45);letter-spacing:.03em">Secured & private — only our team sees this</span>',
        '</div>',
      '</div>',
      /* ── Input row ── */
      '<div style="display:flex;align-items:center;gap:10px;padding:11px 14px 12px;border-top:1px solid rgba(0,0,0,.08);background:#f8fafc">',
        '<input id="vws-input" placeholder="Type a message..." style="flex:1;background:#fff;border:1px solid rgba(0,0,0,.12);border-radius:8px;padding:9px 12px;font-size:13px;color:#374151;outline:none;transition:border-color .2s"/>',
        '<button id="vws-send" style="background:linear-gradient(135deg,#1d4ed8,#2563eb);border:none;border-radius:8px;width:36px;height:36px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:opacity .15s">',
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>',
        '</button>',
      '</div>',
      /* ── Footer ── */
      '<div style="padding:7px 14px 9px;background:#f0f4f8;text-align:center;border-top:1px solid rgba(0,0,0,.06)">',
        '<a href="tel:+15618890507" style="font-size:10px;color:rgba(0,0,0,.4);text-decoration:none;letter-spacing:.04em">Visionary Web Studio · (561) 889-0507</a>',
      '</div>',
    ].join('');

    root.appendChild(win);

    /* ── Chat button (premium pill) ── */
    var btn = document.createElement('button');
    btn.id = 'vws-chat-btn';
    btn.title = 'Chat with us';
    btn.style.cssText = 'height:52px;padding:0 20px 0 16px;border-radius:100px;background:linear-gradient(135deg,#0f1f5c,#1d4ed8);border:1px solid rgba(255,255,255,.15);cursor:pointer;display:flex;align-items:center;gap:10px;box-shadow:0 8px 32px rgba(29,78,216,.5),0 2px 8px rgba(0,0,0,.4);transition:transform .18s,box-shadow .18s;position:relative;animation:vws-pulse 3s 4s ease-in-out 3';
    btn.innerHTML = [
      '<span style="width:9px;height:9px;border-radius:50%;background:#4ade80;flex-shrink:0;box-shadow:0 0 6px rgba(74,222,128,.7)"></span>',
      '<span style="font-size:13px;font-weight:700;color:#fff;letter-spacing:.02em;white-space:nowrap">Chat with us</span>',
      '<span id="vws-badge" style="position:absolute;top:-5px;right:-5px;background:#ef4444;color:#fff;font-size:10px;font-weight:700;min-width:18px;height:18px;border-radius:100px;padding:0 5px;display:none;align-items:center;justify-content:center;border:2px solid #060916">1</span>'
    ].join('');
    btn.addEventListener('mouseenter', function(){ btn.style.transform='translateY(-2px)'; btn.style.boxShadow='0 12px 40px rgba(29,78,216,.65),0 2px 8px rgba(0,0,0,.4)'; });
    btn.addEventListener('mouseleave', function(){ btn.style.transform=''; btn.style.boxShadow='0 8px 32px rgba(29,78,216,.5),0 2px 8px rgba(0,0,0,.4)'; });
    root.appendChild(btn);

    /* ── State ── */
    var isOpen = false;
    var unread = 0;
    var userData = {};
    var currentNode = 'start';
    var chatStarted = false;

    function openChat() {
      isOpen = true;
      win.style.display = 'flex';
      win.style.animation = 'vws-slidein 0.28s cubic-bezier(.22,.68,0,1.2) both';
      hideBadge();
      if (!chatStarted) { chatStarted = true; setTimeout(function(){ botSay(currentNode); }, 350); }
    }
    function closeChat() {
      isOpen = false;
      win.style.display = 'none';
      sessionStorage.setItem(DISMISSED_KEY, '1');
    }

    btn.addEventListener('click', function(){ isOpen ? closeChat() : openChat(); });
    document.getElementById('vws-min').addEventListener('click', closeChat);
    document.getElementById('vws-cls').addEventListener('click', closeChat);

    /* ── Badge ── */
    function showBadge(n) {
      var b = document.getElementById('vws-badge');
      b.textContent = n || '1';
      b.style.display = 'flex';
      b.style.animation = 'vws-badge .25s cubic-bezier(.22,.68,0,1.4) both';
    }
    function hideBadge() { unread = 0; document.getElementById('vws-badge').style.display = 'none'; }

    /* ── Messaging ── */
    function addMsg(html, isUser, time) {
      var msgs = document.getElementById('vws-msgs');
      var wrap = document.createElement('div');
      wrap.style.cssText = 'padding:0 14px;display:flex;gap:8px;align-items:flex-end' + (isUser ? ';flex-direction:row-reverse' : '');

      var bubble = document.createElement('div');
      bubble.className = 'vws-msg-anim';
      bubble.style.cssText = isUser
        ? 'background:linear-gradient(135deg,#1d4ed8,#2563eb);border-radius:14px 14px 2px 14px;padding:10px 14px;font-size:13px;color:#fff;line-height:1.6;max-width:84%'
        : 'background:#e8eef5;border:1px solid rgba(0,0,0,.06);border-radius:14px 14px 14px 2px;padding:10px 14px;font-size:13px;color:#1a2035;line-height:1.6;max-width:84%';
      bubble.innerHTML = html.replace(/\n/g, '<br>');

      if (time) {
        var ts = document.createElement('div');
        ts.style.cssText = 'font-size:9px;color:rgba(0,0,0,.35);margin-top:4px;text-align:' + (isUser ? 'right' : 'left');
        ts.textContent = time;
        var col = document.createElement('div');
        col.style.cssText = 'display:flex;flex-direction:column;max-width:82%';
        col.appendChild(bubble);
        col.appendChild(ts);
        wrap.appendChild(col);
      } else {
        wrap.appendChild(bubble);
      }

      msgs.appendChild(wrap);
      setTimeout(function(){ msgs.scrollTop = msgs.scrollHeight; }, 50);

      if (!isUser && !isOpen) { unread++; showBadge(unread); }
    }

    function showTyping() {
      var msgs = document.getElementById('vws-msgs');
      var d = document.createElement('div');
      d.id = 'vws-typing';
      d.style.cssText = 'padding:0 14px;display:flex;gap:8px;align-items:center';
      d.innerHTML = '<div style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#1e3a8a,#1d4ed8);flex-shrink:0"></div>' +
        '<div style="background:#e8eef5;border:1px solid rgba(0,0,0,.06);border-radius:14px 14px 14px 2px;padding:10px 14px;display:flex;gap:5px;align-items:center">' +
        '<span class="vws-dot-1" style="width:7px;height:7px;border-radius:50%;background:rgba(0,0,0,.35);display:inline-block"></span>' +
        '<span class="vws-dot-2" style="width:7px;height:7px;border-radius:50%;background:rgba(0,0,0,.35);display:inline-block"></span>' +
        '<span class="vws-dot-3" style="width:7px;height:7px;border-radius:50%;background:rgba(0,0,0,.35);display:inline-block"></span>' +
        '</div>';
      msgs.appendChild(d);
      msgs.scrollTop = msgs.scrollHeight;
    }

    function hideTyping() {
      var t = document.getElementById('vws-typing');
      if (t) t.remove();
    }

    function now() {
      var d = new Date();
      var h = d.getHours(), m = d.getMinutes();
      var ampm = h >= 12 ? 'PM' : 'AM';
      h = h % 12 || 12;
      return h + ':' + (m < 10 ? '0' + m : m) + ' ' + ampm;
    }

    function setStatus(text) {
      document.getElementById('vws-status').innerHTML =
        '<span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#4ade80;margin-right:5px"></span>' + text;
    }

    function botSay(nodeKey, replacements) {
      var node = TREE[nodeKey];
      if (!node) return;
      currentNode = nodeKey;

      /* Clear quick replies while typing */
      document.getElementById('vws-qr').innerHTML = '';
      document.getElementById('vws-form').style.display = 'none';
      setStatus('Assistant is typing…');

      showTyping();
      var delay = 900 + Math.min(node.bot.length * 12, 1400);

      setTimeout(function() {
        hideTyping();
        setStatus('Live Chat · Online now');
        var text = node.bot;
        if (replacements) {
          Object.keys(replacements).forEach(function(k){
            text = text.replace(new RegExp('{' + k + '}', 'g'), replacements[k]);
          });
        }
        addMsg(text, false, now());

        if (node.input) {
          /* Show lead capture form */
          document.getElementById('vws-form').style.display = 'block';
          setTimeout(function(){ document.getElementById('vws-fname').focus(); }, 100);
        } else if (node.final) {
          /* Done — no further interaction needed */
        } else {
          /* Show quick replies */
          var qr = document.getElementById('vws-qr');
          (node.replies || []).forEach(function(r) {
            var b = document.createElement('button');
            b.textContent = r.label;
            b.style.cssText = 'background:#fff;border:1px solid rgba(37,99,235,.25);border-radius:100px;padding:7px 13px;font-size:11px;font-weight:600;color:#2563eb;cursor:pointer;transition:background .15s,color .15s,border-color .15s;white-space:nowrap';
            b.addEventListener('mouseenter', function(){ b.style.background='rgba(37,99,235,.08)'; b.style.borderColor='rgba(37,99,235,.5)'; b.style.color='#1d4ed8'; });
            b.addEventListener('mouseleave', function(){ b.style.background='#fff'; b.style.borderColor='rgba(37,99,235,.25)'; b.style.color='#2563eb'; });
            b.addEventListener('click', function() {
              addMsg(r.label, true, now());
              document.getElementById('vws-qr').innerHTML = '';
              setTimeout(function(){ botSay(r.next); }, 300);
            });
            qr.appendChild(b);
          });
        }
      }, delay);
    }

    /* ── Lead form submit ── */
    document.getElementById('vws-fsub').addEventListener('click', function() {
      var name  = document.getElementById('vws-fname').value.trim();
      var phone = document.getElementById('vws-fphone').value.trim();
      var email = document.getElementById('vws-femail').value.trim();
      /* Require name plus at least one real contact method — a bad/missing
         phone number used to mean zero way to reach the lead at all (see
         the Matteo/Crypto Officiel near-miss: his only contact info bounced
         and there was no fallback). Phone alone is no longer required. */
      var hasContact = !!(phone || email);
      if (!name || !hasContact) {
        document.getElementById('vws-fname').style.borderColor = name ? 'rgba(0,0,0,.15)' : '#ef4444';
        document.getElementById('vws-fphone').style.borderColor = hasContact ? 'rgba(0,0,0,.15)' : '#ef4444';
        document.getElementById('vws-femail').style.borderColor = hasContact ? 'rgba(0,0,0,.15)' : '#ef4444';
        return;
      }
      var contactStr = phone && email ? (phone + ' / ' + email) : (phone || email);
      userData = { name: name, phone: phone, email: email, contact: contactStr };
      addMsg('Name: ' + name + (phone ? '\nPhone: ' + phone : '') + (email ? '\nEmail: ' + email : ''), true, now());
      document.getElementById('vws-form').style.display = 'none';
      var chatBox = document.getElementById('vws-form');
      if (vwsLooksLikeBot(chatBox)) return;
      var chatTime = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
      /* Primary — FormSubmit → direct Gmail delivery, same path the Contact
         Us form uses. The chat widget previously only fired the Make.com
         webhook below, so a chat lead only reached Gmail if that Make.com
         scenario was configured and running -- this guarantees delivery
         even if Make.com is broken/paused/unset. _replyto set to the lead's
         own email (when given) so replying to the notification goes straight
         back to them — no separate live-chat channel needed for that. */
      var chatFd = new FormData();
      chatFd.append('name', name);
      chatFd.append('phone', phone);
      chatFd.append('email', email);
      chatFd.append('source', 'Chat widget — ' + window.location.href);
      chatFd.append('time', chatTime);
      chatFd.append('_subject', 'New Chat Lead — Visionary Web Studio');
      chatFd.append('_template', 'table');
      chatFd.append('_captcha', 'false');
      chatFd.append('_honey', vwsHoneypotValue(chatBox));
      if (email) chatFd.append('_replyto', email);
      fetch('https://formsubmit.co/ajax/visionarywebstudio6@gmail.com', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: chatFd
      }).catch(function(){});
      vwsSendToInbox({ name: name, phone: phone, email: email, page: window.location.href, time: chatTime, form: 'chat widget' });
      /* Backup — Make.com webhook, non-blocking, fails silently so chat always completes.
         NOTE: this payload has always included `phone` in full — if a past lead's
         Make.com notification showed no phone, that's the Make.com scenario's own
         notification/message template not being mapped to this field, not a drop
         happening here. Check the scenario's notification module, not this code. */
      if (LEAD_WEBHOOK && LEAD_WEBHOOK !== 'YOUR_MAKE_WEBHOOK_URL') {
        fetch(LEAD_WEBHOOK, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name,
            phone: phone,
            email: email,
            page: window.location.href,
            time: chatTime
          })
        }).catch(function(){});
      }
      setTimeout(function(){ botSay('done', userData); }, 400);
    });

    /* ── Free-text input ── */
    function getFreeReply(text) {
      var t = text.toLowerCase();

      /* "how can you help / what do you do / tell me about you" — lead with value prop */
      if (/\b(help|what do you|what can you|what you do|tell me about|about you|who are you|what is this|what's this)\b/.test(t)) {
        return { msg: "Great question — here's exactly what we do:\n\n✅ <b>Custom websites built from scratch</b> — no templates, no WordPress bloat\n✅ <b>First draft in 48 hours</b> — seriously\n✅ <b>Full SEO included</b> — so customers find you on Google\n✅ <b>Mobile-first</b> — looks perfect on every device\n✅ <b>You own it outright</b> — no ongoing platform fees\n\nWe specialize in local service businesses — contractors, detailers, trainers, professionals. Sites that rank <i>and</i> actually get you calls.\n\nStarting at $500–750 one-time. Want to see what we can build for you?", next: 'capture' };
      }

      /* Why choose us / are you good / best / number one */
      if (/\b(why|best|number one|#1|top|better|worth it|legit|trusted|proven|real|guarantee|results)\b/.test(t)) {
        return { msg: "Here's why clients choose us:\n\n🏆 <b>Hand-coded, not templated</b> — every site is built from scratch for your business\n⚡ <b>3–5x faster</b> than WordPress or Wix sites\n📍 <b>Local SEO experts</b> — we know how to get you found in your city\n🔧 <b>Ongoing support</b> — we don't disappear after launch\n💯 <b>Unlimited revisions</b> for 30 days — you approve every detail\n\nWe've helped dozens of local businesses go from invisible to booked out.\n\nWant to see our work or get a quote?", next: 'capture' };
      }

      /* Price / cost */
      if (/\b(price|cost|how much|charge|fee|rate|afford|cheap|expensive|budget|pay|payment)\b/.test(t)) {
        return { msg: "Here's the pricing breakdown:\n\n💰 <b>Starter — $500–750</b> · 2–3 pages, fast launch\n💰 <b>Standard — $750–1,000</b> · Up to 5 pages, most popular for service businesses\n💰 <b>Full Build — $1,000–2,000</b> · Up to 10 pages, blog, advanced SEO, logo included\n🔧 <b>Maintenance — $100/mo</b> · Unlimited updates, same-day turnaround\n\n<b>50% deposit</b> to start — remainder due at launch.\nOne-time fees. You own the site outright — no subscriptions, no platform lock-in.\n\nWhich package sounds right for you?", next: 'pricing' };
      }

      /* Timeline / turnaround */
      if (/\b(how long|timeline|fast|quick|days|week|turnaround|when|deadline|launch|ready)\b/.test(t)) {
        return { msg: "We move fast:\n\n⚡ <b>48 hours</b> — your first draft is ready for review\n✏️ <b>Day 3–4</b> — revisions based on your feedback\n🚀 <b>Day 5–7</b> — live on Google and indexed\n\nSome simple sites go live in 48 hours flat. No waiting weeks.\n\nReady to get on the schedule?", next: 'capture' };
      }

      /* Portfolio / examples */
      if (/\b(portfolio|example|sample|see|work|show|previous|past|client|done before|built|made)\b/.test(t)) {
        return { msg: "We've built sites for:\n\n🔧 Auto detailers & car care businesses\n🏋️ Fitness trainers & gyms\n🏠 Contractors & home service pros\n⚖️ Attorneys & professional services\n🛍️ Local retail & shops\n\nScroll down to the portfolio section on this page to see examples. 👇\n\nEvery site is custom — built around <i>your</i> business. Want a quote?", next: 'capture' };
      }

      /* Contact / reach us */
      if (/\b(contact|call|phone|reach|talk|speak|number|email|text|message)\b/.test(t)) {
        return { msg: "You can reach our team anytime:\n\n📞 <a href='tel:+15618890507' style='color:#60a5fa'>(561) 889-0507</a> — call or text\n📧 visionarywebstudio6@gmail.com\n\nOr drop your name and number here and we'll follow up within a few hours — usually same day.", next: 'capture' };
      }

      /* SEO / Google / ranking */
      if (/\b(seo|google|rank|search|traffic|found|map|local|listing|keywords)\b/.test(t)) {
        return { msg: "SEO is baked into every build — not an afterthought:\n\n📍 Google Maps integration\n🏷️ Schema markup so Google understands your business\n🔍 Meta tags, page titles, and keyword optimization\n📱 Mobile-first (Google ranks mobile speed first)\n⚡ Fast load times — under 2 seconds on average\n\nMost clients start ranking locally within a few weeks of launch.\n\nWant us to get your business found?", next: 'capture' };
      }

      /* WordPress / platform comparison */
      if (/\b(wordpress|wix|squarespace|template|theme|shopify|godaddy|weebly|drag and drop)\b/.test(t)) {
        return { msg: "Compared to WordPress and Wix, here's the difference:\n\n❌ Templates look generic — everyone has the same site\n❌ Plugins slow your site down (bad for SEO)\n❌ Monthly fees add up ($30–150/mo forever)\n\n✅ We hand-code from scratch — unique to your brand\n✅ 3–5x faster load times\n✅ One-time fee — you own it, no ongoing costs\n\nReady to upgrade from a template?", next: 'capture' };
      }

      /* Hosting / domain */
      if (/\b(host|domain|server|deploy|ssl|https|cloud|where|live)\b/.test(t)) {
        return { msg: "We handle everything on the technical side:\n\n🌐 Domain setup (if you need one — ~$10–15/yr)\n🔒 SSL certificate included (https)\n⚡ Fast cloud hosting — globally distributed\n🛡️ Uptime monitoring included\n\nYou don't touch any of it. We set it all up and hand you the keys.\n\nWant to get your site live?", next: 'capture' };
      }

      /* Maintenance / updates */
      if (/\b(update|change|maintain|support|after|ongoing|broken|fix|edit)\b/.test(t)) {
        return { msg: "After your site launches:\n\n✅ <b>30 days of unlimited free revisions</b> included with every build\n🔧 <b>Maintenance plan — $100/mo</b> for ongoing updates\n   · Unlimited content changes\n   · Same-day turnaround\n   · Monthly performance reports\n   · Priority support\n\nYou'll never be stuck with an outdated site. We handle it.\n\nWant to get started?", next: 'maintenance' };
      }

      /* Truly off-topic — pivot with professionalism, not deflection */
      var pivot = [
        "Appreciate you asking! We're a web studio — so while that's a bit outside our world, what we <i>are</i> experts at is making local businesses look professional online and get more calls.\n\nHere's what sets us apart:\n✅ Custom-coded, not templated\n✅ SEO built in from day one\n✅ You own the site outright\n\nWant to see what we can build for you?",
        "Ha, that's one for another day! 😄 What we <i>do</i> know inside and out is building websites that rank on Google and convert visitors into real customers.\n\nWe've done it for contractors, detailers, trainers, and dozens of local businesses. Want to see how we can do it for yours?",
        "Outside our wheelhouse — but here's what's very much <i>in</i> our wheelhouse:\n\n🏆 #1 thing we do: custom websites that actually get local businesses found and called.\n\nFast turnaround, full SEO, you own it outright. Starting at $500.\n\nInterested in learning more?"
      ];
      var pick = pivot[Math.floor(Math.random() * pivot.length)];
      return { msg: pick, next: 'capture' };
    }

    function makeQR(qr, items) {
      items.forEach(function(item) {
        var b = document.createElement('button');
        b.textContent = item.label;
        b.style.cssText = 'background:#0e1525;border:1px solid rgba(255,255,255,.1);border-radius:100px;padding:7px 13px;font-size:11px;font-weight:600;color:rgba(225,224,204,.75);cursor:pointer;transition:background .15s,color .15s,border-color .15s';
        b.addEventListener('mouseenter', function(){ b.style.background='rgba(29,78,216,.25)'; b.style.borderColor='rgba(29,78,216,.6)'; b.style.color='rgba(225,224,204,1)'; });
        b.addEventListener('mouseleave', function(){ b.style.background='#0e1525'; b.style.borderColor='rgba(255,255,255,.1)'; b.style.color='rgba(225,224,204,.75)'; });
        b.addEventListener('click', function(){
          addMsg(item.label, true, now());
          qr.innerHTML = '';
          botSay(item.next);
        });
        qr.appendChild(b);
      });
    }

    function sendFreeText() {
      var inp = document.getElementById('vws-input');
      var text = inp.value.trim();
      if (!text) return;
      addMsg(text, true, now());
      inp.value = '';
      document.getElementById('vws-qr').innerHTML = '';
      setTimeout(function(){
        showTyping();
        var reply = getFreeReply(text);
        setTimeout(function(){
          hideTyping();
          addMsg(reply.msg, false, now());
          var qr = document.getElementById('vws-qr');
          makeQR(qr, [
            {label:'Yes, have the team reach out', next:'capture'},
            {label:'See pricing',                  next:'pricing'},
            {label:'Just browsing',                next:'browse'}
          ]);
        }, 1000);
      }, 200);
    }
    document.getElementById('vws-send').addEventListener('click', sendFreeText);
    document.getElementById('vws-input').addEventListener('keydown', function(e){ if(e.key==='Enter') sendFreeText(); });

    /* ── Auto-open after 8s (if not dismissed this session) ── */
    if (!sessionStorage.getItem(DISMISSED_KEY)) {
      setTimeout(function(){
        if (!isOpen && !sessionStorage.getItem(OPENED_KEY)) {
          sessionStorage.setItem(OPENED_KEY, '1');
          /* Show badge first for 2s, then open */
          showBadge(1);
          setTimeout(function(){ if (!isOpen) openChat(); }, 2000);
        }
      }, 8000);
    }
  }

  buildChat();
  })();
