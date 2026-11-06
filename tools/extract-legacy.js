// Pulls the two self-contained vanilla widgets out of the old SPA page into their own files:
// NOTE (11-06): assets/js/chat.js and cookie.js have been edited by hand since extraction (no chat auto-open,
// subtle cookie banner). They are the source now: do not re-run this script over them.
//   assets/js/chat.js   (live chat widget + every form's honeypot/time-trap + FormSubmit sending)
//   assets/js/cookie.js (cookie consent banner)
const fs = require('fs'), path = require('path');
const src = fs.readFileSync(path.join(__dirname, 'legacy/spa-index.html'), 'utf8');
const blocks = [...src.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const swap = (s, a, b) => { if (s.split(a).length !== 2) throw new Error('patch target not found once: ' + a.slice(0, 60)); return s.replace(a, b); };
const pick = (sig, out, fix) => {
  const b = blocks.filter(x => x.includes(sig));
  if (b.length !== 1) throw new Error(sig + ' matched ' + b.length);
  const js = fix ? fix(b[0]) : b[0];
  fs.writeFileSync(path.join(__dirname, '..', out), '/* extracted from the old SPA page by tools/extract-legacy.js */\n' + js.trim() + '\n');
  console.log(out, (js.length / 1024).toFixed(1) + 'KB');
};
/* the chat used to poll up to 12 s for React's widget before building; there is no React now */
pick("DISMISSED_KEY = 'vws_cha", 'assets/js/chat.js', s => swap(s,
  s.slice(s.indexOf('  /* ── Wait for React to mount then inject ── */'), s.lastIndexOf('})();')),
  '  buildChat();\n  '));
pick("vws_consent_v2", 'assets/js/cookie.js');
