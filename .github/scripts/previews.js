// Erzeugt kleine Vorschauseiten (Open Graph) für geteilte Links:
//   /e/<event-id>  /a/<artist>  /c/<veranstalter>  /v/<location>
// Messenger und soziale Netzwerke lesen daraus Titel, Text und Bild;
// Menschen werden sofort auf die passende Karte in rave.wien weitergeleitet.
const fs = require("fs"), path = require("path"), vm = require("vm");
const root = path.resolve(__dirname, "..", "..");
const ctx = {};
vm.runInNewContext(
  fs.readFileSync(path.join(root, "events.js"), "utf8") +
    "\n;this.RAW=RAW;this.V=V;this.AR=typeof AR!=='undefined'?AR:{};this.CI=typeof CI!=='undefined'?CI:{};this.VI=typeof VI!=='undefined'?VI:{};",
  ctx
);
const { RAW, V, AR, CI, VI } = ctx;
const pctx = {};
try { vm.runInNewContext(fs.readFileSync(path.join(root, "past.js"), "utf8") + "\n;this.PAST=PAST;", pctx); } catch (_) { pctx.PAST = []; }
const PAST = pctx.PAST || [];

const slug = t => String(t).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ß/g, "ss").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const esc = s => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const isImg = u => /^https:\/\/[^"'<>\s]+\.(jpe?g|png|webp|gif|avif)(\?[^"'<>\s]*)?$/i.test(u || "") || /^https:\/\/i\.scdn\.co\/image\/[a-z0-9]+$/i.test(u || "");
const nm = a => (a.includes("|") ? a.split("|")[1] : a);
const splitA = n => n.split(/\s+b2b\s+/i).map(x => x.trim()).filter(Boolean);
const DAYS = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
const fmtDay = d => { const [y, m, t] = d.split("-").map(Number); const w = new Date(Date.UTC(y, m - 1, t)).getUTCDay(); return `${DAYS[w]}., ${String(t).padStart(2, "0")}.${String(m).padStart(2, "0")}.${y}`; };
const clip = (s, n) => (s.length > n ? s.slice(0, n - 1).replace(/\s+\S*$/, "") + " …" : s);
const SITE = "https://rave.wien";
const DEF_IMG = SITE + "/og.png";

function page({ url, target, title, desc, img }) {
  const big = !!img;
  return `<!doctype html>
<html lang="de"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)} · rave.wien</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${esc(url)}">
<meta property="og:site_name" content="rave.wien">
<meta property="og:type" content="website">
<meta property="og:locale" content="de_AT">
<meta property="og:url" content="${esc(url)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="${esc(img || DEF_IMG)}">
<meta name="twitter:card" content="${big ? "summary_large_image" : "summary_large_image"}">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${esc(img || DEF_IMG)}">
<meta name="robots" content="noindex,follow">
<meta http-equiv="refresh" content="0;url=${esc(target)}">
<style>body{background:#131519;color:#e8ecf1;font:16px system-ui,sans-serif;display:grid;place-items:center;min-height:90vh;margin:0}a{color:#5b8cff}</style>
</head><body><p><a href="${esc(target)}">${esc(title)} auf rave.wien öffnen →</a></p>
<script>location.replace(${JSON.stringify(target)})</script>
</body></html>
`;
}

const out = new Map(); // relative path -> html
const add = (dir, key, o) => { if (!key) return; const rel = `${dir}/${key}.html`; if (!out.has(rel)) out.set(rel, page(o)); };

// Events (gleiche ID-Bildung wie in index.html)
const today = new Date(Date.now() - 2 * 864e5).toISOString().slice(0, 10);
const seen = new Set();
RAW.slice().sort((a, b) => (a.d + (a.s || "99")).localeCompare(b.d + (b.s || "99"))).forEach(e => {
  let id = (e.d + "-" + slug(e.title)).slice(0, 60).replace(/-$/, ""), k = id, i = 2;
  while (seen.has(k)) k = id + "-" + i++;
  seen.add(k);
  const arts = [...new Set((e.floors || []).flatMap(f => f.a).map(nm).flatMap(splitA).filter(a => a !== "TBA"))];
  const head = (e.head || []).filter(Boolean);
  const order = [...head, ...arts.filter(a => !head.includes(a))];
  const bits = [fmtDay(e.d) + (e.s ? " · " + e.s : ""), e.venue && e.venue !== "TBA" ? e.venue : ""].filter(Boolean).join(" · ");
  const lu = order.length ? clip(order.join(", "), 140) : "";
  const note = e.note && (e.note.de || e.note.en) ? clip((e.note.de || e.note.en).replace(/\s+/g, " "), 160) : "";
  const desc = [bits, lu, !lu ? note : ""].filter(Boolean).join(" — ");
  add("e", k, { url: `${SITE}/e/${k}`, target: `/#${k}`, title: e.title, desc, img: isImg(e.flyer) ? e.flyer : "" });
});

// Archiv (vergangene Events) – gleiche ID-Bildung wie in index.html
const todayStr = new Date().toISOString().slice(0, 10);
PAST.filter(r => r[0] < todayStr).forEach(r => {
  let id = (r[0] + "-" + slug(r[2])).slice(0, 60).replace(/-$/, ""), k = id, i = 2;
  while (seen.has(k)) k = id + "-" + i++;
  seen.add(k);
  const arts = [...new Set((r[4] || []).flatMap(splitA))];
  const x = r[5] || {};
  const desc = [fmtDay(r[0]) + (x.s ? " · " + x.s : "") + " · " + r[1], arts.length ? clip(arts.join(", "), 140) : ""].filter(Boolean).join(" — ");
  add("e", k, { url: `${SITE}/e/${k}`, target: `/#${k}`, title: r[2], desc, img: "" });
});

// Artists
const artists = new Set(Object.keys(AR));
RAW.forEach(e => (e.floors || []).forEach(f => f.a.map(nm).flatMap(splitA).forEach(a => a !== "TBA" && artists.add(a))));
artists.forEach(n => {
  const a = AR[n] || {}; const s = slug(n);
  const from = a.from ? a.from.de || a.from.en : "";
  const bio = a.bio ? clip((a.bio.de || a.bio.en || "").replace(/\s+/g, " "), 170) : "";
  const desc = [["Artist", from].filter(Boolean).join(" aus "), bio].filter(Boolean).join(" — ") || "Artist auf rave.wien – Termine in Wien und Sets zum Reinhören.";
  add("a", s, { url: `${SITE}/a/${s}`, target: `/#a/${s}`, title: n, desc, img: isImg(a.img) ? a.img : "" });
});

// Veranstalter
const colls = new Set(Object.keys(CI));
RAW.forEach(e => (e.coll || []).forEach(c => colls.add(c)));
colls.forEach(n => {
  const c = CI[n] || {}; const s = slug(n);
  const txt = c.de ? clip(c.de.replace(/\s+/g, " "), 190) : "Veranstalter auf rave.wien – kommende Termine in Wien.";
  add("c", s, { url: `${SITE}/c/${s}`, target: `/#c/${s}`, title: n, desc: txt, img: isImg(c.logo) ? c.logo : "" });
});

// Locations
Object.keys(V).filter(v => v !== "TBA" && v !== "Secret Location").forEach(n => {
  const vi = VI[n] || {}; const s = slug(n);
  const addr = V[n] && V[n] !== "Wien" ? V[n] + " Wien" : "Wien";
  const txt = [addr, vi.de ? clip(vi.de.replace(/\s+/g, " "), 160) : ""].filter(Boolean).join(" — ");
  add("v", s, { url: `${SITE}/v/${s}`, target: `/#v/${s}`, title: n, desc: txt, img: isImg(vi.logo) ? vi.logo : "" });
});

let n = 0;
for (const [rel, html] of out) {
  const f = path.join(root, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  if (!fs.existsSync(f) || fs.readFileSync(f, "utf8") !== html) { fs.writeFileSync(f, html); n++; }
}
console.log(`${out.size} Vorschauseiten, ${n} neu oder geändert.`);
