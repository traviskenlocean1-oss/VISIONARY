// renders tools/og/gbp-cover.html -> Google Business Profile cover (2400x1350 JPG)
//   NODE_PATH=<dir with playwright> node tools/og/render-gbp.js http://localhost:8843 <out.jpg>
const { chromium } = require('playwright');
(async () => { const b = await chromium.launch({ channel: 'chrome' }); const p = await b.newPage({ viewport: { width: 1200, height: 675 }, deviceScaleFactor: 2 });
  await p.goto((process.argv[2] || 'http://localhost:8843') + '/tools/og/gbp-cover.html', { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(400);
  await p.screenshot({ path: process.argv[3], clip: { x: 0, y: 0, width: 1200, height: 675 }, type: 'jpeg', quality: 90 }); await b.close(); console.log(process.argv[3]); })();
