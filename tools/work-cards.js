// Portfolio page: replace the old phone+laptop mockup cards with modern screenshot cards
// (name + industry, opens the live site). Run once: node tools/work-cards.js
const fs = require('fs'), path = require('path');
const f = path.join(__dirname, '..', 'work', 'index.html');
let t = fs.readFileSync(f, 'utf8');
const NAMES = {
  'harber.': 'Harbor Mind', 'clearwell.': 'Clearwell', 'steadfast.': 'Steadfast', 'sole-residence.': 'SOLE Residence',
  'aurelia-med-spa.': 'Aurelia Med Spa', 'psychoticlove.net': 'Psychotic Love', 'altura-collection.': 'The Altura Collection',
  'marlow-interior.': 'Marlow Interior', 'meridian-estates.': 'Meridian Estates', 'stack.': 'STACK', 'aqualine-pools.': 'Aqualine Pools',
  'ironclad.': 'Ironclad Construction', 'cloudefy.': 'Cloudefy', 'lalasweetsandcakes': 'Lala’s Sweets', 'contract.': 'Willpower Solutions',
  'junkrepo.': 'SwiftHaul Junk Removal', 'meadowline.': 'Meadowline Lawn & Garden', 'endeavor-evolution': 'Endeavor Evolution',
  'beauty.': 'Solène', 'roofing-demo.': 'Summit Roofing & Exteriors', 'contractor-demo.': 'El Duro Construction', 'mobiledetail.': 'CoolMint Detailing',
  'hvac-plumbing-demo.': 'Artic Air & Plumbing'
};
const esc = s => s.replace(/&(?!amp;|#)/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const a = t.indexOf('<section class="vws-pf-grid-sec">'), b = t.indexOf('</section>', a) + '</section>'.length;
if (a < 0) throw new Error('grid section not found');
const old = t.slice(a, b), cards = [];
const re = /<div class="vws-pf2-card[^"]*" data-url="([^"]+)"[^>]*><span class="vws-pf2-lbl">([^<]+)<\/span>[\s\S]*?<img src="([^"]+)"/g; let m;
while ((m = re.exec(old))) {
  const key = Object.keys(NAMES).find(k => m[1].includes(k)); if (!key) throw new Error('no name for ' + m[1]);
  cards.push({ url: m[1], cat: m[2], img: m[3], name: NAMES[key] });
}
if (cards.length !== 23) throw new Error('found ' + cards.length + ' cards');
const html = '<section class="vws-wk-sec" aria-label="Selected work"><div class="vws-wk-head"><p>Selected work</p><p>(' + cards.length + ')</p></div><div class="vws-wk">'
  + cards.map(c => '<a class="vws-wk-card" href="' + c.url + '" target="_blank" rel="noopener">'
    + '<div class="vws-wk-m"><div class="vws-wk-z"><img src="' + c.img + '" alt="' + esc(c.name) + ' website, home page" loading="lazy" decoding="async"></div>'
    + '<span class="vws-wk-go">View live site <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span></div>'
    + '<div class="vws-wk-meta"><p class="n">' + esc(c.name) + '</p><p class="c">' + c.cat + '</p></div></a>').join('')
  + '</div></section>';
const CSS = `<style id="vws-wk-css">
/* Portfolio cards (11-06): big screenshots on black, name + industry; each opens out of a
   Clearwell-style pill as it scrolls in (site.js workCards) */
.vws-wk-sec{background:#000;color:#fff;padding:110px 40px 140px;font-family:"VWS Sans",Inter,system-ui,sans-serif;-webkit-font-smoothing:antialiased}
.vws-wk-head{display:flex;justify-content:space-between;align-items:baseline;border-bottom:1px solid rgba(255,255,255,.14);padding-bottom:18px;margin-bottom:48px}
html body .vws-wk-head p{margin:0!important;font-size:14px!important;line-height:20px!important;color:rgba(255,255,255,.6)!important;letter-spacing:0!important}
.vws-wk{display:grid;grid-template-columns:1fr 1fr;column-gap:20px;row-gap:72px}
.vws-wk-card{display:block;color:#fff!important;text-decoration:none!important}
.vws-wk-m{position:relative;aspect-ratio:16/10;border-radius:12px;overflow:hidden;background:#0d0e10;will-change:clip-path}
.vws-wk-z{position:absolute;inset:0;will-change:transform}
.vws-wk-z img{width:100%;height:100%;object-fit:cover;object-position:50% 0;display:block;transition:transform .9s cubic-bezier(.16,1,.3,1)}
.vws-wk-card:hover .vws-wk-z img{transform:scale(1.04)}
.vws-wk-go{position:absolute;left:20px;bottom:20px;display:inline-flex;align-items:center;gap:8px;padding:12px 18px;border-radius:100px;background:rgba(10,10,12,.5);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);box-shadow:inset 0 0 0 1px rgba(255,255,255,.18);font-size:14px;line-height:1;color:#fff;opacity:0;transform:translateY(8px);transition:opacity .35s ease,transform .35s ease}
.vws-wk-go svg{width:14px;height:14px}
.vws-wk-card:hover .vws-wk-go,.vws-wk-card:focus-visible .vws-wk-go{opacity:1;transform:none}
.vws-wk-meta{display:flex;justify-content:space-between;align-items:baseline;gap:16px;margin-top:18px}
html body .vws-wk-meta .n{margin:0!important;font-size:28px!important;line-height:1.15!important;font-weight:400!important;letter-spacing:-.02em!important;color:#fff!important}
html body .vws-wk-meta .c{margin:0!important;font-size:14px!important;line-height:20px!important;color:rgba(255,255,255,.55)!important;text-align:right;white-space:nowrap}
@media (max-width:809px){
  .vws-wk-sec{padding:72px 16px 96px}
  .vws-wk{grid-template-columns:1fr;row-gap:48px}
  html body .vws-wk-meta .n{font-size:22px!important}
  .vws-wk-go{opacity:1;transform:none;left:12px;bottom:12px;padding:10px 14px;font-size:13px}
}
</style>`;
t = t.slice(0, a) + html + t.slice(b);
if (!t.includes('id="vws-wk-css"')) t = t.replace('</head>', CSS + '\n</head>');
fs.writeFileSync(f, t);
console.log('cards', cards.length, cards.map(c => c.name).join(', '));
