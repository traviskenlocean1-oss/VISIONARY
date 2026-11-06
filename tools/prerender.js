// Prerender: turn the old React SPA (tools/legacy/spa-index.html + assets/) into plain static pages.
//   1. serve a copy of the legacy site (index.html = tools/legacy/spa-index.html) on a local port
//   2. NODE_PATH=<dir with playwright> node tools/prerender.js http://localhost:8841 <out-dir>
// Every route is loaded, scrolled top to bottom so every section has mounted, then saved
// without React, without the patch scripts and without anything those patches had hidden.
// Behaviour comes back from assets/js/site.js (+ chat.js, cookie.js from tools/extract-legacy.js).
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const base = process.argv[2] || 'http://localhost:8841';
const OUT = process.argv[3] || 'static-out';
const ROUTES = ['/', '/about', '/services', '/pricing', '/work', '/contact', '/privacy-policy',
  '/services/web-development', '/services/hosting', '/services/website-maintenance',
  '/services/website-creation', '/services/website-redesign', '/services/logo-branding'];

// the contact FAQ was a React accordion: its answers only existed in the bundle
const CONTACT_FAQ = {
  'How long does it take to build a website?': 'Most projects are completed within 5–10 business days depending on the package. Starter sites typically take 5 days, Standard around 7, and Full Builds up to 10. We move fast without cutting corners.',
  'What do I need to provide to get started?': 'Just your business name, a general idea of what you want, any photos or logos you have, and your preferred color direction. We guide you through the rest — no tech knowledge needed.',
  "Do I own my website after it's built?": 'Yes, 100%. Once your project is delivered and paid in full, everything is yours — the code, the files, the domain. No ongoing fees, no lock-in, no strings.',
  "What's the difference between Starter, Standard, and Full Build?": 'Starter is a single-page site great for getting online fast. Standard gives you up to 5 pages with animations and analytics. Full Build is the complete package — unlimited pages, all integrations, e-commerce ready, priority delivery.',
  'Can you match a specific style or vibe I have in mind?': 'Absolutely. We build completely custom — no templates. Share references, a mood board, or just a description and we design around your vision. Luxury, bold, clean, industrial, minimal — whatever direction fits your brand, we bring it to life.',
  'Can you redesign my existing website?': 'Absolutely. Redesigns fall under the Standard or Full Build packages depending on the scope. We start fresh with a clean design — no patching over old work.',
  'Do you offer payment plans?': "Yes. We typically split projects 50% upfront and 50% on delivery. For larger builds we can discuss a 3-payment structure. Reach out and we'll work something out.",
  'Will my website show up on Google?': 'Every site we build includes basic on-page SEO — meta tags, Open Graph, semantic HTML, and fast load times. For deeper SEO campaigns, we can discuss that separately as an add-on.',
  "What's included in the $100/month maintenance plan?": "Monthly content updates, security monitoring, performance checks, and priority support for any issues. It's for clients who want someone to handle everything after launch so they never have to think about it.",
  'What if I need changes after the site goes live?': 'All packages include revision rounds before launch. Post-launch changes can be handled through the maintenance plan or quoted individually depending on the scope of work.'
};
// pages the Worker doesn't title (it handles /, /about, /services, /pricing, /work, /contact)
const META = {
  '/privacy-policy': ['Privacy Policy | Visionary Web Studio', 'How Visionary Web Studio collects, uses and protects the information you share on this site.'],
  '/services/web-development': ['Website Development in Miami | Visionary Web Studio', 'Hand-coded websites built from scratch in Miami: no templates, no builders. Fast, mobile-first and SEO-ready from day one.'],
  '/services/hosting': ['Website Hosting & Domain Setup | Visionary Web Studio', 'Domain setup, DNS and fast, secure hosting on Cloudflare’s global network, included and handled for you.'],
  '/services/website-maintenance': ['Website Maintenance Plans | Visionary Web Studio', 'Updates, fixes, security checks and performance tuning after launch, handled same day so your site keeps working.'],
  '/services/website-creation': ['Website Creation for Small Businesses | Visionary Web Studio', 'No site yet? We take you from zero to live: full custom design, clean code and a site that reflects your business.'],
  '/services/website-redesign': ['Website Redesign Services | Visionary Web Studio', 'Your current site is losing you clients. We rebuild it from the ground up: same domain, modern code, real results.'],
  '/services/logo-branding': ['Logo & Branding Design | Visionary Web Studio', 'Logos and brand identity built to last: sharp at any size, distinct in any market, consistent everywhere.']
};
// Simple text pages: the React app had no content for these routes (only the ending + footer)
const sec = (cap, h1, body) => '<section class="vws-doc"><div class="vws-doc-in"><p class="vws-doc-cap">' + cap + '</p><h1>' + h1 + '</h1>' + body + '</div></section>';
const PRIVACY = sec('Legal', 'Privacy Policy', `
<p class="vws-doc-lead">Last updated November 6, 2026. This page explains what Visionary Web Studio (“we”) collects when you use getvisionarywebstudio.com, and what we do with it.</p>
<h2>What we collect</h2>
<ul><li><b>What you send us.</b> When you use the contact form or the chat, we receive the details you type in: usually your name, email, phone number and message.</li>
<li><b>Basic usage data, only if you allow it.</b> If you accept cookies, Google Analytics records anonymous information such as the pages you visit, your device type and roughly where you are. If you reject cookies, it doesn’t load.</li></ul>
<h2>How we use it</h2>
<ul><li>To reply to you about your project and send the quote or details you asked for.</li>
<li>To understand which pages are useful so we can improve the site.</li></ul>
<p>We don’t sell your information, and we don’t add you to a mailing list without asking.</p>
<h2>Services that handle it</h2>
<ul><li><b>FormSubmit</b> delivers form and chat messages to our inbox.</li>
<li><b>Google</b> (Apps Script and Sheets) keeps a copy of each enquiry so nothing gets lost, and runs Google Analytics when you allow it.</li>
<li><b>Cloudflare</b> hosts the site and protects it from abuse.</li></ul>
<h2>Cookies</h2>
<p>We only set analytics cookies after you accept them in the cookie banner. You can change your choice at any time by clearing this site’s data in your browser.</p>
<h2>Your choices</h2>
<p>You can ask us to show you, correct or delete anything you’ve sent us. Email <a href="mailto:Visionarywebstudio6@gmail.com">Visionarywebstudio6@gmail.com</a> or call <a href="tel:+15618890507">(561) 889-0507</a>.</p>`);
const NOT_FOUND = sec('404', 'This page doesn’t exist', `
<p class="vws-doc-lead">The link may be old, or the address may have a typo. Everything we do is one click away:</p>
<p class="vws-doc-links"><a href="/">Home</a><a href="/services/">Services</a><a href="/pricing/">Pricing</a><a href="/work/">Portfolio</a><a href="/contact/">Contact</a></p>`);
const DOC_CSS = '<style id="vws-doc-css">html body .vws-doc{background:#f7f8fc;color:#0b0f19;padding:160px 20px 120px;font-family:"VWS Sans",Inter,system-ui,sans-serif}'
  + 'html body .vws-doc-in{max-width:760px;margin:0 auto}html body .vws-doc p.vws-doc-cap{font-size:14px!important;line-height:20px!important;color:rgba(11,15,25,.6)!important;margin:0 0 12px!important}'
  + 'html body .vws-doc h1{font-size:clamp(44px,7vw,88px)!important;line-height:1!important;font-weight:400!important;letter-spacing:-.03em!important;margin:0 0 32px!important;color:#0b0f19!important}'
  + 'html body .vws-doc h2{font-size:24px!important;line-height:1.3!important;font-weight:500!important;letter-spacing:-.01em!important;margin:48px 0 12px!important;color:#0b0f19!important}'
  + 'html body .vws-doc p,html body .vws-doc li{font-size:17px!important;line-height:1.65!important;color:rgba(11,15,25,.78)!important;margin:0 0 10px!important}'
  + 'html body .vws-doc ul{list-style:disc!important;padding-left:22px!important;margin:0 0 10px!important}'
  + 'html body .vws-doc p.vws-doc-lead{font-size:20px!important;line-height:1.55!important;color:#0b0f19!important}html body .vws-doc a{color:#0b0f19!important;text-decoration:underline!important;text-underline-offset:3px}'
  + 'html body .vws-doc p.vws-doc-links{display:flex;flex-wrap:wrap;gap:12px;margin-top:28px!important}html body .vws-doc-links a{padding:12px 22px;border-radius:100px;background:#0b0f19;color:#fff!important;text-decoration:none!important}</style>';

