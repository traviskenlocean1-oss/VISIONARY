// renders tools/og/og.html -> /og-v3.png (1200x630). Serve the VISIONARY folder first, then:
//   NODE_PATH=<dir with playwright> node tools/og/render.js http://localhost:8843
const { chromium } = require('playwright'); const path = require('path');
(async () => { const b = await chromium.launch({ channel: 'chrome' }); const p = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await p.goto((process.argv[2] || 'http://localhost:8843') + '/tools/og/og.html', { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(400);
  await p.screenshot({ path: path.join(__dirname, '..', '..', 'og-v3.png'), clip: { x: 0, y: 0, width: 1200, height: 630 } }); await b.close(); console.log('og-v3.png'); })();
