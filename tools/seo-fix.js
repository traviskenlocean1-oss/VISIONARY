// SEO pass (11-06) over the static pages. Loads each page with JavaScript OFF (so the DOM is
// exactly the file), fixes it, writes it back.
//   1. headings: service-page H1s read "WebsiteDevelopment" (a <br> is not a space) -> add the space;
//      hidden leftover H1s become divs; Contact's visible title becomes the page's H1
//   2. structured data: the site-wide block keeps only the business + website; FAQ data moves to
//      /contact/ (its 10 visible questions), each service page gets its own Service, packages stay on /pricing/
// Serve the VISIONARY folder first, then:  NODE_PATH=<playwright> node tools/seo-fix.js http://localhost:8843
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const base = process.argv[2] || 'http://localhost:8843';
const ROOT = path.join(__dirname, '..');
const SITE = 'https://getvisionarywebstudio.com';
const PAGES = ['/', '/about/', '/services/', '/pricing/', '/work/', '/contact/', '/privacy-policy/',
  '/services/web-development/', '/services/hosting/', '/services/website-maintenance/',
  '/services/website-creation/', '/services/website-redesign/', '/services/logo-branding/', '/404.html'];
const SERVICES = {
  'web-development': ['Website Development', 'Hand-coded websites built from scratch in Miami: no templates, no builders. Fast, mobile-first and SEO-ready from day one.'],
  'hosting': ['Website Hosting & Domain Setup', 'Domain setup, DNS and fast, secure hosting on Cloudflare’s global network, included and handled for you.'],
  'website-maintenance': ['Website Maintenance', 'Updates, fixes, security checks and performance tuning after launch, handled same day so your site keeps working.'],
  'website-creation': ['Website Creation', 'No site yet? We take you from zero to live: full custom design, clean code and a site that reflects your business.'],
  'website-redesign': ['Website Redesign', 'Your current site is losing you clients. We rebuild it from the ground up: same domain, modern code, real results.'],
  'logo-branding': ['Logo & Branding Design', 'Logos and brand identity built to last: sharp at any size, distinct in any market, consistent everywhere.']
};
const CONTACT_FAQ = JSON.parse(fs.readFileSync(path.join(__dirname, 'contact-faq.json'), 'utf8'));

(async () => {
  const b = await chromium.launch({ channel: 'chrome' });
  const ctx = await b.newContext({ javaScriptEnabled: false });
  const p = await ctx.newPage();
  for (const r of PAGES) {
    await p.goto(base + r, { waitUntil: 'domcontentloaded' });
    const slug = (r.match(/^\/services\/([^/]+)\/$/) || [])[1];
    const res = await p.evaluate(({ r, slug, SITE, SERVICES, CONTACT_FAQ }) => {
      const log = [];
      // ── 1. headings
      document.querySelectorAll('#vws-hero h1 br').forEach(br => { const prev = br.previousSibling; if (!(prev && prev.nodeType === 3 && /\s$/.test(prev.textContent))) { br.before(document.createTextNode(' ')); log.push('h1-space'); } });
      // hidden H1s (inline display:none, a hidden stub, or inside one) -> div
      document.querySelectorAll('h1').forEach(h => {
        /* hidden = not rendered at all (stylesheet display:none included); the visually-hidden hero H1 still has a box */
        let hidden = !h.getClientRects().length; for (let e = h; !hidden && e && e !== document.body; e = e.parentElement) { if (e.hidden || getComputedStyle(e).display === 'none') hidden = true; }
        if (!hidden) return;
        const d = document.createElement('div'); [...h.attributes].forEach(a => d.setAttribute(a.name, a.value)); d.innerHTML = h.innerHTML; h.replaceWith(d); log.push('hidden-h1');
      });
      if (r === '/contact/' && !document.querySelector('h1')) {
        const h2 = [...document.querySelectorAll('#vws-contact-form-sec h2')].find(h => /Ready to Get Started/i.test(h.textContent));
        if (h2) { const h1 = document.createElement('h1'); [...h2.attributes].forEach(a => h1.setAttribute(a.name, a.value)); h1.innerHTML = h2.innerHTML; h2.replaceWith(h1); log.push('contact-h1'); }
      }
      // ── 2. structured data
      const blocks = [...document.querySelectorAll('script[type="application/ld+json"]')];
      const g0 = blocks[0] && JSON.parse(blocks[0].textContent);
      if (g0 && g0['@graph']) {
        const before = g0['@graph'].length;
        g0['@graph'] = g0['@graph'].filter(n => { const t = [].concat(n['@type']); return t.includes('LocalBusiness') || t.includes('WebSite'); });
        const lb = g0['@graph'].find(n => [].concat(n['@type']).includes('LocalBusiness'));
        if (lb) delete lb.hasOfferCatalog;   // the 4 old generic services; the real ones are on their own pages
        blocks[0].textContent = JSON.stringify(g0);
        log.push('global ' + before + '->' + g0['@graph'].length);
      }
      const add = obj => { const s = document.createElement('script'); s.type = 'application/ld+json'; s.textContent = JSON.stringify(obj); document.head.appendChild(s); };
      if (r === '/contact/' && !document.querySelector('script[data-seo="faq"]')) {
        add({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: Object.entries(CONTACT_FAQ).map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
        document.head.lastChild.setAttribute('data-seo', 'faq'); log.push('faq');
      }
      if (slug && SERVICES[slug] && !document.querySelector('script[data-seo="service"]')) {
        const [name, description] = SERVICES[slug];
        add({ '@context': 'https://schema.org', '@type': 'Service', '@id': SITE + '/services/' + slug + '/#service', name, description, serviceType: name, url: SITE + '/services/' + slug + '/',
          provider: { '@id': SITE + '/#business' }, areaServed: [{ '@type': 'City', name: 'Miami' }, { '@type': 'State', name: 'Florida' }] });
        document.head.lastChild.setAttribute('data-seo', 'service'); log.push('service');
      }
      if (r === '/services/' && !document.querySelector('script[data-seo="services"]')) {
        add({ '@context': 'https://schema.org', '@type': 'ItemList', name: 'Web design services', itemListElement: Object.entries(SERVICES).map(([s, [n]], i) => ({ '@type': 'ListItem', position: i + 1, url: SITE + '/services/' + s + '/', name: n })) });
        document.head.lastChild.setAttribute('data-seo', 'services'); log.push('service-list');
      }
      return { log, html: '<!DOCTYPE html>\n' + document.documentElement.outerHTML };
    }, { r, slug, SITE, SERVICES, CONTACT_FAQ });
    const file = r === '/' ? 'index.html' : r === '/404.html' ? '404.html' : r.slice(1) + 'index.html';
    fs.writeFileSync(path.join(ROOT, file), res.html);
    console.log(r.padEnd(32), res.log.join(', '));
  }
  await b.close();
})();
