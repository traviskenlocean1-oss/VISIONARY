// Used 11-06 for the Google Business Profile photo (CC0 desk photo + homepage on the iMac, Portfolio on the laptop):
//   node tools/og/screen-mockup.js photo.jpg out.jpg "668,618|home.png|0.022,0.032,0.022,0.03" "1210,760|work.png|0.025,0.045,0.025,0.03"
//   seed = a point inside each dark screen; last part = bezel fractions left,top,right,bottom
// Screen mockup: find each screen's exact corners in the photo (flood fill of the dark screen),
// then place screenshots with a true perspective transform (CSS matrix3d) and render.
//   node mock.js <photo> <out.jpg> <seedX,seedY:shot.png> [<seedX,seedY:shot.png> ...]
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const [photo, out, ...screens] = process.argv.slice(2);
const toData = f => 'data:image/' + (f.endsWith('.png') ? 'png' : 'jpeg') + ';base64,' + fs.readFileSync(f).toString('base64');
(async () => {
  const b = await chromium.launch({ channel: 'chrome' });
  const p = await b.newPage();
  const quads = await p.evaluate(async ({ src, seeds }) => {
    const img = new Image(); img.src = src; await img.decode();
    const W = img.naturalWidth, H = img.naturalHeight, c = document.createElement('canvas'); c.width = W; c.height = H;
    const g = c.getContext('2d'); g.drawImage(img, 0, 0); const d = g.getImageData(0, 0, W, H).data;
    const lum = (x, y) => { const i = (y * W + x) * 4; return 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]; };
    return seeds.map(([sx, sy]) => {
      const base = lum(sx, sy), thr = Math.max(base + 28, 48), seen = new Uint8Array(W * H), st = [sx + sy * W];
      let tl = [sx, sy], tr = [sx, sy], br = [sx, sy], bl = [sx, sy], n = 0; seen[sx + sy * W] = 1;
      while (st.length) {
        const k = st.pop(), x = k % W, y = (k - x) / W; n++;
        if (x + y < tl[0] + tl[1]) tl = [x, y]; if (x - y > tr[0] - tr[1]) tr = [x, y];
        if (x + y > br[0] + br[1]) br = [x, y]; if (y - x > bl[1] - bl[0]) bl = [x, y];
        for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          const nx = x + dx, ny = y + dy; if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
          const nk = nx + ny * W; if (seen[nk]) continue; seen[nk] = 1; if (lum(nx, ny) <= thr) st.push(nk);
        }
      }
      return { tl, tr, br, bl, n, base: Math.round(base), W, H };
    });
  }, { src: toData(photo), seeds: screens.map(s => s.split('|')[0].split(',').map(Number)) });
  console.log(JSON.stringify(quads));
  const { W, H } = quads[0];
  // homography: unit square -> quad, as a CSS matrix3d for an element of size w x h
  const m3d = (w, h, q) => {
    const [x0, y0] = q.tl, [x1, y1] = q.tr, [x2, y2] = q.br, [x3, y3] = q.bl;
    const dx1 = x1 - x2, dx2 = x3 - x2, dy1 = y1 - y2, dy2 = y3 - y2, sx = x0 - x1 + x2 - x3, sy = y0 - y1 + y2 - y3;
    const den = dx1 * dy2 - dx2 * dy1, g = (sx * dy2 - dx2 * sy) / den, hh = (dx1 * sy - sx * dy1) / den;
    const a = x1 - x0 + g * x1, bq = x3 - x0 + hh * x3, c = x0, d = y1 - y0 + g * y1, e = y3 - y0 + hh * y3, f = y0;
    // map element px -> unit square first
    return [a / w, d / w, 0, g / w, bq / h, e / h, 0, hh / h, 0, 0, 1, 0, c, f, 0, 1].map(v => +v.toFixed(10)).join(',');
  };
  const inset = (q, px) => { // pull corners 1.5px inward so no dark edge shows
    const cx = (q.tl[0] + q.tr[0] + q.br[0] + q.bl[0]) / 4, cy = (q.tl[1] + q.tr[1] + q.br[1] + q.bl[1]) / 4;
    const mv = ([x, y]) => { const vx = cx - x, vy = cy - y, L = Math.hypot(vx, vy); return [x + vx / L * -px, y + vy / L * -px]; };
    return { tl: mv(q.tl), tr: mv(q.tr), br: mv(q.br), bl: mv(q.bl) };
  };
  // bezel: the display sits inside the black glass. bz = [left,top,right,bottom] as fractions of the glass
  const bezel = (q, [l, tp, r, bt]) => {
    const P = (u, v) => { const a = [q.tl[0] + (q.tr[0] - q.tl[0]) * u, q.tl[1] + (q.tr[1] - q.tl[1]) * u], b = [q.bl[0] + (q.br[0] - q.bl[0]) * u, q.bl[1] + (q.br[1] - q.bl[1]) * u]; return [a[0] + (b[0] - a[0]) * v, a[1] + (b[1] - a[1]) * v]; };
    return { tl: P(l, tp), tr: P(1 - r, tp), br: P(1 - r, 1 - bt), bl: P(l, 1 - bt) };
  };
  let html = '<html><body style="margin:0"><div style="position:relative;width:' + W + 'px;height:' + H + 'px;overflow:hidden"><img src="' + toData(photo) + '" style="position:absolute;left:0;top:0;width:' + W + 'px;height:' + H + 'px">';
  screens.forEach((s, i) => {
    const parts = s.split('|'), bz = (parts[2] || '0,0,0,0').split(',').map(Number), shot = parts[1], q = bezel(quads[i], bz), hdr = fs.readFileSync(shot), sw = hdr.readUInt32BE(16), sh = hdr.readUInt32BE(20);
    html += '<div style="position:absolute;left:0;top:0;width:' + sw + 'px;height:' + sh + 'px;transform-origin:0 0;transform:matrix3d(' + m3d(sw, sh, q) + ')">'
      + '<img src="' + toData(shot) + '" style="width:100%;height:100%;display:block;filter:brightness(.9) contrast(1.02)">'
      // glass: soft diagonal reflection + faint vignette at the edges
      + '<div style="position:absolute;inset:0;background:linear-gradient(115deg,rgba(255,255,255,.10) 0%,rgba(255,255,255,.04) 38%,rgba(255,255,255,0) 52%);mix-blend-mode:screen"></div>'
      + '<div style="position:absolute;inset:0;box-shadow:inset 0 0 40px rgba(0,0,0,.35)"></div></div>';
  });
  html += '</div></body></html>';
  await p.setViewportSize({ width: W, height: H }); await p.setContent(html); await p.waitForTimeout(500);
  await p.screenshot({ path: out, type: 'jpeg', quality: 93 });
  await b.close(); console.log('wrote', out);
})();
