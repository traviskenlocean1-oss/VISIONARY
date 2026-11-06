// Builds the hero reel (assets/hero/reel.mp4 + reel-sm.mp4 + reel.jpg) by rendering
// tools/reel/scene.html frame by frame: site cards on black, KOTA-style moves.
//   1. serve the VISIONARY folder on a port (any static server)
//   2. NODE_PATH=<dir with playwright> node tools/make-reel.js http://localhost:8843
// Needs ffmpeg on PATH. Output is H.264 High @ Level 4.0 (plays inline on iOS Safari).
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path'), os = require('os'), { execSync } = require('child_process');
const base = process.argv[2] || 'http://localhost:8843';
const FPS = 30, D = 14;
const TMP = path.join(os.tmpdir(), 'vws-reel-frames');
const OUT = path.join(__dirname, '..', 'assets', 'hero');
(async () => {
  fs.rmSync(TMP, { recursive: true, force: true }); fs.mkdirSync(TMP, { recursive: true });
  const b = await chromium.launch({ channel: 'chrome' });
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  await p.goto(base + '/tools/reel/scene.html', { waitUntil: 'load' });
  await p.evaluate(() => window.ready);
  const N = FPS * D;
  for (let f = 0; f < N; f++) {
    await p.evaluate(t => { render(t); return new Promise(r => requestAnimationFrame(() => r())); }, f / FPS);
    await p.screenshot({ path: path.join(TMP, String(f).padStart(4, '0') + '.jpg'), type: 'jpeg', quality: 92 });
    if (f % 60 === 0) console.log('frame', f, '/', N);
  }
  await b.close();
  const enc = '-c:v libx264 -profile:v high -level 4.0 -pix_fmt yuv420p -preset slow -movflags +faststart -an';
  execSync(`ffmpeg -loglevel error -y -framerate ${FPS} -i "${TMP}/%04d.jpg" ${enc} -crf 24 -g 60 "${path.join(OUT, 'reel.mp4')}"`);
  execSync(`ffmpeg -loglevel error -y -i "${path.join(OUT, 'reel.mp4')}" -vf scale=480:-2 ${enc} -crf 26 "${path.join(OUT, 'reel-sm.mp4')}"`);
  execSync(`ffmpeg -loglevel error -y -ss 0.3 -i "${path.join(OUT, 'reel.mp4')}" -frames:v 1 -q:v 3 "${path.join(OUT, 'reel.jpg')}"`);
  for (const f of ['reel.mp4', 'reel-sm.mp4', 'reel.jpg']) console.log(f, (fs.statSync(path.join(OUT, f)).size / 1024).toFixed(0) + 'KB');
})();
