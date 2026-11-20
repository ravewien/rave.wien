// Abrufdienst: holt Webseiten (Clubprogramme, Portale, Eventseiten der kommenden Events) auf GitHub Actions,
// macht daraus lesbaren Text und legt das Ergebnis VERSCHLÜSSELT in den Branch „abruf“ bzw. „abruf-<tag>“.
// Die automatischen Läufe entpacken es mit abruf-entpacken.js und brauchen dann kein WebFetch.
//   node abruf.js <ausgabeordner>                → Voll-Abruf (feste Quellen + Quellen aller kommenden Events + RA-Wien-Liste)
//   URLS="https://… https://…" node abruf.js <ordner>   → nur diese Adressen (Nachladen während eines Laufs)
const fs = require("fs"), path = require("path"), vm = require("vm");
const root = path.resolve(__dirname, "..", "..");
const out = path.resolve(process.argv[2] || "abruf-out"); fs.mkdirSync(path.join(out, "seiten"), { recursive: true });
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";
const heute = new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Vienna" });
const addDays = (d, n) => { const t = new Date(d + "T12:00:00Z"); t.setUTCDate(t.getUTCDate() + n); return t.toISOString().slice(0, 10); };

// ---------- Adressliste
let urls = [];
if (process.env.URLS) urls = process.env.URLS.split(/\s+/).filter(u => /^https?:\/\//.test(u));
else {
  const q = JSON.parse(fs.readFileSync(path.join(root, ".github/agent/quellen.json"), "utf8"));
  Object.entries(q).forEach(([k, v]) => { if (Array.isArray(v)) v.forEach(u => typeof u === "string" && urls.push(u)); });
  const c = {}; vm.runInNewContext(fs.readFileSync(path.join(root, "events.js"), "utf8") + ";this.o={RAW,VI,CI}", c);
  const { RAW, VI, CI } = c.o; const up = RAW.filter(e => e.d >= heute);
  up.forEach(e => { (e.src || []).forEach(s => s && s[1] && urls.push(s[1])); if (e.tickets) urls.push(e.tickets); });
  [...new Set(up.map(e => e.venue))].forEach(v => { const w = VI[v] && VI[v].web; if (w && !/instagram|facebook/.test(w)) urls.push(w); });
  [...new Set(up.flatMap(e => e.coll || []))].forEach(n => { const w = CI[n] && CI[n].web; if (w && !/instagram|facebook/.test(w)) urls.push(w); });
}
const norm = u => { try { const x = new URL(u); x.hash = ""; return x.toString(); } catch (_) { return ""; } };
urls = [...new Set(urls.map(norm).filter(Boolean))].filter(u => !/(instagram\.com|facebook\.com|fb\.me|soundcloud\.com|spotify\.com|youtube\.com|tiktok\.com)/.test(u));
console.log(`${urls.length} Adressen`);

// ---------- HTML → Text
const ent = s => s.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#0*39;|&apos;/g, "'")
  .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n)).replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)));
const abs = (u, base) => { try { return new URL(ent(u), base).toString(); } catch (_) { return u; } };
function text(html, base) {
  const meta = [];
  const t = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1]; if (t) meta.push("TITEL: " + ent(t).trim());
  for (const m of html.matchAll(/<meta[^>]+(?:property|name)=["'](og:image|og:title|og:description|description|twitter:image)["'][^>]*>/gi)) {
    const c = (m[0].match(/content=["']([^"']*)["']/i) || [])[1]; if (c) meta.push(m[1].toUpperCase() + ": " + (/image/.test(m[1]) ? abs(c, base) : ent(c)));
  }
  const ld = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map(m => m[1].trim()).filter(Boolean);
  const nd = (html.match(/<script[^>]+id=["']__NEXT_DATA__["'][^>]*>([\s\S]*?)<\/script>/i) || [])[1];
  let b = html.replace(/<(script|style|noscript|svg|template|iframe)[\s\S]*?<\/\1>/gi, " ").replace(/<!--[\s\S]*?-->/g, " ");
  b = b.replace(/<img[^>]*>/gi, m => { const s = (m.match(/\s(?:data-src|src)=["']([^"']+)["']/i) || [])[1]; const a = (m.match(/\salt=["']([^"']*)["']/i) || [])[1]; return s ? ` [Bild${a ? ": " + ent(a) : ""} ${abs(s, base)}] ` : " "; });
  b = b.replace(/<a\s[^>]*href=["']([^"'#][^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi, (_, h, x) => { const tx = x.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(); const u = abs(h, base); return tx ? ` ${tx} <${u}> ` : ` <${u}> `; });
  b = b.replace(/<(br|\/p|\/div|\/li|\/h\d|\/tr|\/section|\/article|\/header|\/footer|li|h\d|tr)[^>]*>/gi, "\n").replace(/<(td|th)[^>]*>/gi, " | ").replace(/<[^>]+>/g, " ");
  b = ent(b).split("\n").map(l => l.replace(/[ \t]+/g, " ").trim()).filter(Boolean).join("\n");
  let o = meta.join("\n") + "\n\n" + b;
  if (ld.length) o += "\n\n--- JSON-LD ---\n" + ld.join("\n").slice(0, 120000);
  if (nd) o += "\n\n--- __NEXT_DATA__ ---\n" + nd.slice(0, 400000);
  return o.slice(0, 600000);
}

// ---------- Abruf
const slug = u => u.replace(/^https?:\/\//, "").replace(/[^a-zA-Z0-9.-]+/g, "_").slice(0, 120);
const sleep = ms => new Promise(r => setTimeout(r, ms));
const idx = []; const lastHost = {};
async function hole(u, i) {
  const h = new URL(u).host; const w = (lastHost[h] || 0) + 1200 - Date.now(); lastHost[h] = Date.now() + Math.max(0, w); if (w > 0) await sleep(w);
  const ctl = new AbortController(); const to = setTimeout(() => ctl.abort(), 25000);
  let st = 0, err = "", body = "", typ = "";
  try {
    const r = await fetch(u, { headers: { "User-Agent": UA, "Accept": "text/html,application/xhtml+xml,application/json;q=0.9,*/*;q=0.8", "Accept-Language": "de-AT,de;q=0.9,en;q=0.8" }, redirect: "follow", signal: ctl.signal });
    st = r.status; typ = r.headers.get("content-type") || ""; body = await r.text();
    if (/just a moment|cf-chl|captcha|one moment, please|attention required/i.test(body.slice(0, 20000)) && body.length < 60000) err = "Schutzseite (Cloudflare/Captcha)";
    else if (st >= 400) err = "HTTP " + st;
  } catch (e) { err = e.name === "AbortError" ? "Zeitüberschreitung" : String(e.message || e); }
  clearTimeout(to);
  const f = String(i).padStart(4, "0") + "_" + slug(u) + ".txt";
  if (!err && body) {
    const txt = /json/.test(typ) ? body.slice(0, 600000) : text(body, u);
    fs.writeFileSync(path.join(out, "seiten", f), `ADRESSE: ${u}\nABGERUFEN: ${new Date().toISOString()}\n\n` + txt);
    idx.push([u, st, txt.length, f, ""]);
  } else idx.push([u, st, 0, "", err || "leer"]);
}
async function raWien() { // RA: Liste aller Wien-Events der nächsten 4 Monate über die GraphQL-Schnittstelle (wie die RA-Website selbst)
  const q = `query L($f:FilterInputDtoInput,$p:Int,$s:Int){eventListings(filters:$f,pageSize:$s,page:$p){data{event{id title date startTime endTime contentUrl isTicketed images{filename} venue{name address} artists{name} promoters{name} genres{name} minimumAge cost}}totalResults}}`;
  const res = []; let area = 0;
  try { const r = await fetch("https://ra.co/graphql", { method: "POST", headers: { "Content-Type": "application/json", "User-Agent": UA, "Referer": "https://ra.co/events/at/vienna", "Origin": "https://ra.co" },
      body: JSON.stringify({ query: `{areas(searchTerm:"Vienna",limit:5){id name country{name}}}` }) }); const j = await r.json(); const a = ((j.data || {}).areas || []).find(x => /vienna|wien/i.test(x.name) && /austria/i.test((x.country || {}).name || "")); area = a ? +a.id : 0;
  } catch (e) { return { err: "RA areas: " + e.message }; }
  if (!area) return { err: "RA: Bereich Wien nicht gefunden" };
  for (let p = 1; p <= 12; p++) {
    try {
      const r = await fetch("https://ra.co/graphql", { method: "POST", headers: { "Content-Type": "application/json", "User-Agent": UA, "Referer": "https://ra.co/events/at/vienna", "Origin": "https://ra.co" },
        body: JSON.stringify({ query: q, variables: { f: { areas: { eq: area }, listingDate: { gte: heute, lte: addDays(heute, 120) } }, p, s: 100 } }) });
      const j = await r.json(); const d = (((j.data || {}).eventListings) || {}).data || []; if (j.errors && !d.length) return { err: "RA: " + JSON.stringify(j.errors).slice(0, 300), area, res };
      d.forEach(x => x.event && res.push(x.event)); if (d.length < 100) break; await sleep(1500);
    } catch (e) { return { err: "RA Seite " + p + ": " + e.message, area, res }; }
  }
  return { area, res };
}
(async () => {
  let i = 0; const q = urls.slice(); const N = 8;
  await Promise.all(Array.from({ length: N }, async () => { while (q.length) { const u = q.shift(); await hole(u, ++i); } }));
  if (!process.env.URLS) { const ra = await raWien(); fs.writeFileSync(path.join(out, "ra-wien.json"), JSON.stringify(ra, null, 1)); console.log(`RA Wien: ${(ra.res || []).length} Events${ra.err ? " – " + ra.err : ""}`); }
  idx.sort((a, b) => a[3].localeCompare(b[3]) || a[0].localeCompare(b[0]));
  fs.writeFileSync(path.join(out, "index.tsv"), "adresse\tstatus\tzeichen\tdatei\tfehler\n" + idx.map(r => r.join("\t")).join("\n") + "\n");
  const ok = idx.filter(r => !r[4]).length, bad = idx.filter(r => r[4]);
  const hosts = {}; bad.forEach(r => { const h = new URL(r[0]).host; (hosts[h] = hosts[h] || []).push(r[4]); });
  fs.writeFileSync(path.join(out, "status.json"), JSON.stringify({ zeit: new Date().toISOString(), adressen: idx.length, ok, fehler: bad.length, hosts: Object.fromEntries(Object.entries(hosts).map(([h, e]) => [h, { n: e.length, grund: [...new Set(e)].slice(0, 3) }])) }, null, 1));
  console.log(`fertig: ${ok} ok, ${bad.length} Fehler`);
})();
