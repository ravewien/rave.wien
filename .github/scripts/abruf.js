// Abrufdienst (nur frei zugängliche Seiten; durch Schutzseiten gesperrte Seiten werden NICHT umgangen, nur als gesperrt vermerkt): holt Webseiten (Clubprogramme, Portale, Eventseiten der kommenden Events) auf GitHub Actions,
// macht daraus lesbaren Text und legt das Ergebnis VERSCHLÜSSELT in den Branch „abruf“ bzw. „abruf-<tag>“.
// Die automatischen Läufe entpacken es mit abruf-entpacken.js und brauchen dann kein WebFetch.
//   node abruf.js <ausgabeordner>                → Voll-Abruf (feste Quellen + Quellen aller kommenden Events)
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
  // alle Veranstalter mit eigener Website bzw. eigenem Ticketshop (auch ohne kommendes Event – dort tauchen neue Termine zuerst auf)
  Object.values(CI).forEach(x => { if (x && /^https:\/\/linktr\.ee\//.test(x.lt || "")) urls.push(x.lt); });   // Linktree-Sammlung (lt) als Quelle
  Object.values(CI).forEach(x => { if (!x) return; [x.web, x.tix].forEach(w => { if (w && !/instagram|facebook|linktr\.ee/.test(w)) urls.push(w); }); });
  // Spuren der Profil-Läufe (Termine/Programmseiten, die das Event-Update prüfen soll)
  try { fs.readFileSync(path.join(root, ".github/agent/spuren.tsv"), "utf8").split("\n").slice(1).forEach(l => { const u = l.split("\t")[5]; if (/^https:\/\//.test(u || "")) urls.push(u.trim()); }); } catch (_) {}
}
const norm = u => { try { const x = new URL(u); x.hash = ""; return x.toString(); } catch (_) { return ""; } };
urls = [...new Set(urls.map(norm).filter(Boolean))].filter(u => !/(instagram\.com|facebook\.com|fb\.me|soundcloud\.com|spotify\.com|youtube\.com|tiktok\.com)/.test(u));
console.log(`${urls.length} Adressen`);
// Auftrag für den Raspberry Pi (holt dieselben Seiten von einem Heimanschluss aus, außer ra.co; dazu Instagram-Profilbilder von Veranstaltern ohne Bild)
if (!process.env.URLS) {
  const c2 = {}; vm.runInNewContext(fs.readFileSync(path.join(root, "events.js"), "utf8") + ";this.CI=CI", c2);
  const ig = Object.entries(c2.CI).filter(([k, v]) => v && !v.logo && v.ig).map(([k, v]) => ({ name: k, h: ((v.ig.match(/instagram\.com\/([A-Za-z0-9_.]+)/) || [])[1] || "") })).filter(x => x.h);
  fs.writeFileSync(path.join(out, "adressen.json"), JSON.stringify({ zeit: new Date().toISOString(), urls: urls.filter(u => !/(^|\.)ra\.co$/.test(new URL(u).host)), ig }, null, 0));
}

const { text } = require("./abruf-text.js");

// ---------- Änderungserkennung: Fingerabdruck des reinen Seitentexts (ohne Links/Bilder/__NEXT_DATA__), Vergleich mit dem vorigen Voll-Abruf
const crypto = require("crypto");
const finger = t => crypto.createHash("sha1").update(t.split("\n\n--- __NEXT_DATA__ ---")[0].replace(/<https?:[^>]*>/g, " ").replace(/\[Bild[^\]]*\]/g, " ").replace(/\s+/g, " ").toLowerCase()).digest("hex").slice(0, 16);
let alt = {}; const neuH = {};
const voll = !process.env.URLS;

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
    let ge = "";
    if (voll) { const h = finger(txt); const a = alt[u]; ge = a && a[0] === h ? a[1] : heute; neuH[u] = [h, ge]; }
    idx.push([u, st, txt.length, f, "", ge]);
  } else { if (voll && alt[u]) neuH[u] = alt[u]; idx.push([u, st, 0, "", err || "leer", ""]); }
}
(async () => {
  if (voll) try { const r = await fetch("https://raw.githubusercontent.com/ravewien/rave.wien/abruf/hashes.json?t=" + Date.now()); if (r.ok) alt = await r.json(); } catch (_) {}
  let i = 0; const q = urls.slice(); const N = 8;
  await Promise.all(Array.from({ length: N }, async () => { while (q.length) { const u = q.shift(); await hole(u, ++i); } }));
  idx.sort((a, b) => a[3].localeCompare(b[3]) || a[0].localeCompare(b[0]));
  fs.writeFileSync(path.join(out, "index.tsv"), "adresse\tstatus\tzeichen\tdatei\tfehler\tgeaendert\n" + idx.map(r => r.join("\t")).join("\n") + "\n");
  const ok = idx.filter(r => !r[4]).length, bad = idx.filter(r => r[4]);
  const hosts = {}; bad.forEach(r => { const h = new URL(r[0]).host; (hosts[h] = hosts[h] || []).push(r[4]); });
  fs.writeFileSync(path.join(out, "status.json"), JSON.stringify({ zeit: new Date().toISOString(), adressen: idx.length, ok, fehler: bad.length, hosts: Object.fromEntries(Object.entries(hosts).map(([h, e]) => [h, { n: e.length, grund: [...new Set(e)].slice(0, 3) }])) }, null, 1));
  if (voll) fs.writeFileSync(path.join(out, "hashes.json"), JSON.stringify(neuH));
  console.log(`fertig: ${ok} ok, ${bad.length} Fehler`);
})();
