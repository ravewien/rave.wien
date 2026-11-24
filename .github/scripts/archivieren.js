// Schritt 0 des Event-Updates ohne KI: Events, deren Datum vor gestern liegt, wandern von RAW (events.js)
// oben in PAST (past.js) – mit s, e, price, note, src (erste Quelle), head (Headliner) und lu:1.
// Kein Duplikat bei gleichem Datum + Location + ähnlichem Titel.   node .github/scripts/archivieren.js [--dry]
const fs = require("fs"), path = require("path"), vm = require("vm");
const root = path.resolve(__dirname, "..", ".."), F = path.join(root, "events.js"), P = path.join(root, "past.js");
const dry = process.argv.includes("--dry");
let src = fs.readFileSync(F, "utf8"); const c = {}; vm.runInNewContext(src + ";this.RAW=RAW", c);
let psrc = fs.readFileSync(P, "utf8"); const pc = {}; vm.runInNewContext(psrc.replace(/^const PAST=/m, "this.PAST="), pc);
const grenze = process.env.ARCHIV_BIS || new Date(Date.now() - 864e5).toLocaleDateString("sv-SE", { timeZone: "Europe/Vienna" });   // gestern
const norm = t => String(t || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]/g, "");
const nm = a => String(a).replace(/^\d{1,2}:\d{2}\|/, "");
const weg = c.RAW.filter(e => e.d < grenze), bleibt = c.RAW.filter(e => e.d >= grenze);
const neu = [];
for (const e of weg) {
  const t = norm(e.title);
  if (pc.PAST.some(p => p[0] === e.d && p[1] === e.venue && (norm(p[2]) === t || norm(p[2]).includes(t) || t.includes(norm(p[2]))))) continue;
  const arts = [...new Set((e.floors || []).flatMap(f => f.a || []).map(nm).filter(a => a && a !== "TBA"))];
  const x = { lu: 1 }; for (const f of ["s", "e", "price", "note"]) if (e[f]) x[f] = e[f];
  if ((e.src || [])[0]) x.src = e.src[0][1] || e.src[0];
  if ((e.head || []).length) x.head = e.head.map(nm);
  neu.push([e.d, e.venue, e.title, e.coll || [], arts, x]);
}
neu.sort((a, b) => b[0].localeCompare(a[0]));
console.log(`Archiv: ${weg.length} abgelaufen, ${neu.length} neu in PAST, ${weg.length - neu.length} schon vorhanden`);
if (dry || !weg.length) process.exit(0);
psrc = psrc.replace(/^const PAST=\[\n?/m, m => m.replace(/\n?$/, "\n") + neu.map(r => JSON.stringify(r) + ",").join("\n") + (neu.length ? "\n" : ""));
const m = /^const RAW=/m.exec(src); let i = m.index + m[0].length, d = 0, s = false, esc = false;
for (; i < src.length; i++) { const ch = src[i]; if (s) { if (esc) esc = false; else if (ch === "\\") esc = true; else if (ch === '"') s = false; continue; } if (ch === '"') s = true; else if (ch === "[" || ch === "{") d++; else if (ch === "]" || ch === "}") { d--; if (!d) { i++; break; } } }
src = src.slice(0, m.index) + "const RAW=[\n" + bleibt.map(e => JSON.stringify(e)).join(",\n") + "\n]" + src.slice(i);
fs.writeFileSync(P, psrc); fs.writeFileSync(F, src);
