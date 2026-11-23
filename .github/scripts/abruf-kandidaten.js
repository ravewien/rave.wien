// Liest aus den Abruf-Kopien die maschinenlesbaren Event-Angaben (JSON-LD: Event, MusicEvent, DanceEvent, Festival …)
// und vergleicht sie mit events.js – ohne KI. Ergebnis: <abruf>/kandidaten.tsv
//   status „neu“      = kein passendes Event in events.js (prüfen, ob es zu rave.wien passt, dann eintragen)
//   status „nicht-wien“ = Ort laut Quelle außerhalb Wiens (nur zur Info, nicht eintragen; Ausnahme Vösendorf zählt als Wien)
//   status „bekannt“  = gibt es schon; Spalte „ergaenzbar“ nennt Felder, die bei uns leer sind und in der Quelle stehen
//   node .github/scripts/abruf-kandidaten.js [abruf-ordner=/tmp/abruf]
const fs = require("fs"), path = require("path"), vm = require("vm");
const root = path.resolve(__dirname, "..", ".."), dir = path.resolve(process.argv[2] || "/tmp/abruf");
const c = {}; vm.runInNewContext(fs.readFileSync(path.join(root, "events.js"), "utf8") + ";this.RAW=RAW;this.VI=VI;this.V=V", c);
const { ent } = require("./abruf-text.js");
const heute = new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Vienna" });
const norm = t => String(t || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ß/g, "ss").replace(/[^a-z0-9]+/g, "");
const toks = t => new Set(String(t || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").split(/[^a-z0-9]+/).filter(w => w.length > 2 && !["the", "und", "and", "mit", "with", "pres", "presents", "wien", "vienna", "night", "party"].includes(w)));
const urlKey = u => String(u || "").replace(/^https?:\/\/(www\.)?/, "").replace(/[?#].*$/, "").replace(/\/$/, "").toLowerCase();
const vnorm = {}; Object.keys(c.V || {}).forEach(k => vnorm[norm(k)] = k); Object.entries(c.VI || {}).forEach(([k, v]) => [].concat((v && v.alias) || []).forEach(a => vnorm[norm(a)] = vnorm[norm(a)] || k));
const byDate = {}; const bySrc = {};
for (const e of c.RAW) { (byDate[e.d] = byDate[e.d] || []).push(e); (e.src || []).forEach(s => s && s[1] && (bySrc[urlKey(s[1])] = e)); if (e.tickets) bySrc[urlKey(e.tickets)] = e; }
// alle JSON-Dokumente aus einem Textblock holen (mehrere hintereinander, auch mehrzeilig)
function docs(t) {
  const out = []; let i = 0;
  while (i < t.length) {
    const a = t.slice(i).search(/[\[{]/); if (a < 0) break; i += a;
    let d = 0, s = false, esc = false, j = i;
    for (; j < t.length; j++) { const ch = t[j];
      if (s) { if (esc) esc = false; else if (ch === "\\") esc = true; else if (ch === '"') s = false; continue; }
      if (ch === '"') s = true; else if (ch === "{" || ch === "[") d++; else if (ch === "}" || ch === "]") { d--; if (d === 0) { j++; break; } } }
    try { out.push(JSON.parse(t.slice(i, j))); } catch (_) {}
    i = Math.max(j, i + 1);
  }
  return out;
}
const isEv = t => [].concat(t || []).some(x => /Event$|^Festival$/.test(String(x)));
function walk(o, f, depth = 0) { if (!o || typeof o !== "object" || depth > 8) return; if (Array.isArray(o)) return o.forEach(x => walk(x, f, depth + 1)); if (isEv(o["@type"]) && o.startDate && o.name) f(o); for (const v of Object.values(o)) if (v && typeof v === "object") walk(v, f, depth + 1); }
const str = v => typeof v === "string" ? v : (v && (v.name || v.url || v["@id"])) || "";
const rows = []; const seen = new Set();
const seiten = path.join(dir, "seiten");
for (const f of fs.existsSync(seiten) ? fs.readdirSync(seiten) : []) {
  const t = fs.readFileSync(path.join(seiten, f), "utf8"); const k = t.indexOf("--- JSON-LD ---"); if (k < 0) continue;
  const seite = (t.match(/^ADRESSE: (.*)$/m) || [])[1] || "";
  for (const d of docs(t.slice(k + 15).split("--- __NEXT_DATA__ ---")[0])) walk(d, o => {
    const m = String(o.startDate).match(/^(\d{4}-\d{2}-\d{2})(?:[T ](\d{2}:\d{2}))?/); if (!m || m[1] < heute) return;
    const loc = [].concat(o.location || [])[0] || {}; const adr = loc.address || {};
    const ort = str(loc), stadt = typeof adr === "string" ? adr : [adr.postalCode, adr.addressLocality].filter(Boolean).join(" ");
    const off = [].concat(o.offers || [])[0] || {}; const preis = off.price != null ? off.price : off.lowPrice != null ? off.lowPrice : "";
    const bild = str([].concat(o.image || [])[0]); const url = str(o.url) || seite; const titel = ent(ent(String(o.name))).replace(/\s+/g, " ").trim();
    const key = m[1] + "|" + norm(titel); if (seen.has(key)) return; seen.add(key);
    // Abgleich mit events.js
    const T = toks(titel), nt = norm(titel), v = vnorm[norm(ort)] || "";
    let hit = bySrc[urlKey(url)] && bySrc[urlKey(url)].d === m[1] ? bySrc[urlKey(url)] : null;
    if (!hit) hit = (byDate[m[1]] || []).find(e => { const x = norm(e.title); if (x === nt || (x.length > 5 && nt.includes(x)) || (nt.length > 5 && x.includes(nt))) return true;
      const B = toks(e.title); let n = 0; T.forEach(w => { if (B.has(w)) n++; }); const sim = T.size && B.size ? n / Math.min(T.size, B.size) : 0;
      return sim >= 0.6 || (v && e.venue === v && sim >= 0.34); });
    let erg = [];
    if (hit) { if (!hit.s && m[2]) erg.push("s=" + m[2]); if (!hit.price && preis !== "" && +preis > 0) erg.push("price=" + preis); if (!hit.flyer && /^https:\/\//.test(bild)) erg.push("flyer"); if (!hit.tickets && off.url) erg.push("tickets"); }
    const fern = !hit && !v && (stadt || ort) && !/wien|vienna|v[oö]sendorf|(^|\D)1[0-2]\d0(\D|$)/i.test(stadt + " " + ort) && /[a-z]/i.test(stadt);
    rows.push([hit ? "bekannt" : fern ? "nicht-wien" : "neu", m[1], m[2] || "", titel, ort, stadt, hit ? hit.title : "", erg.join(","), preis, url, bild, seite, f].map(x => String(x).replace(/[\t\n]+/g, " ")));
  });
}
const rang = { neu: 0, bekannt: 1, "nicht-wien": 2 };
rows.sort((a, b) => rang[a[0]] - rang[b[0]] || a[1].localeCompare(b[1]));
fs.writeFileSync(path.join(dir, "kandidaten.tsv"), "status\tdatum\tbeginn\ttitel\tort\tplz_ort\tbei_uns\tergaenzbar\tpreis\tadresse\tbild\tgefunden_auf\tdatei\n" + rows.map(r => r.join("\t")).join("\n") + "\n");
const neu = rows.filter(r => r[0] === "neu").length, erg = rows.filter(r => r[0] === "bekannt" && r[7]).length;
console.log(`Kandidaten aus festen Formaten: ${rows.length} Events (${neu} neu, ${erg} bekannt mit ergänzbaren Feldern) → ${path.join(dir, "kandidaten.tsv")}`);
