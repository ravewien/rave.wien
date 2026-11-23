// Artist-Dubletten zusammenführen: AR-Eintrag „Alt“ geht in „Neu“ auf (leere Felder von Neu werden gefüllt, Listen vereinigt,
// Alt wird Alias) und alle Erwähnungen werden umbenannt: RAW floors/head, PAST Artists, CI members/exMembers, AR friends.
// Einträge mit man:1 werden nie gelöscht (dann wird nur umbenannt, wenn --auch-man gesetzt ist).
//   node .github/scripts/artist-merge.js [--dry] --merge "Alt=Neu" [--merge …]
const fs = require("fs"), path = require("path"), vm = require("vm");
const root = path.resolve(__dirname, "..", ".."), F = path.join(root, "events.js"), P = path.join(root, "past.js");
const dry = process.argv.includes("--dry");
const merges = []; process.argv.forEach((a, i) => { if (a === "--merge") { const [x, y] = String(process.argv[i + 1] || "").split("="); if (x && y) merges.push([x.trim(), y.trim()]); } });
let src = fs.readFileSync(F, "utf8"), psrc = fs.readFileSync(P, "utf8");
const c = {}; vm.runInNewContext(src + ";this.o={CI,RAW,AR}", c); const D = c.o;
const leer = v => v == null || v === "" || (Array.isArray(v) && !v.length) || (typeof v === "object" && !Array.isArray(v) && !Object.keys(v).length);
const log = []; const map = {};
for (const [alt, neu] of merges) {
  const A = D.AR[alt], N = D.AR[neu];
  if (!N) { log.push(`übersprungen (Ziel fehlt): ${alt} → ${neu}`); continue; }
  if (A && A.man === 1) { log.push(`übersprungen (man:1): ${alt}`); continue; }
  if (A) {
    for (const [f, v] of Object.entries(A)) {
      if (["alias", "coll", "src", "genres"].includes(f) && Array.isArray(v)) { N[f] = [...new Set([...(N[f] || []), ...v])]; continue; }
      if (f === "links" && typeof v === "object") { N.links = N.links || {}; for (const [k, u] of Object.entries(v)) if (leer(N.links[k])) N.links[k] = u; continue; }
      if (N.man === 1 && !leer(N[f])) continue;
      if (leer(N[f]) && !leer(v)) N[f] = v;
    }
    delete D.AR[alt];
  }
  N.alias = [...new Set([...(N.alias || []), alt])].filter(x => x !== neu);
  map[alt] = neu; log.push(`zusammengeführt: ${alt} → ${neu}`);
}
const ren = s => { if (typeof s !== "string") return s; const m = s.match(/^(\d{1,2}:\d{2}\|)?(.*?)(\s*\((?:live|dj set|b2b|hybrid)\))?$/i); return m && map[m[2]] ? (m[1] || "") + map[m[2]] + (m[3] || "") : s; };
const uniq = l => [...new Set(l)];
let n = 0;
for (const e of D.RAW) {
  for (const f of e.floors || []) { const a2 = uniq((f.a || []).map(ren)); if (JSON.stringify(a2) !== JSON.stringify(f.a)) { f.a = a2; n++; } }
  if (Array.isArray(e.head)) { const h2 = uniq(e.head.map(ren)); if (JSON.stringify(h2) !== JSON.stringify(e.head)) { e.head = h2; n++; } }
}
for (const v of Object.values(D.CI)) for (const f of ["members", "exMembers"]) if (Array.isArray(v[f])) v[f] = uniq(v[f].map(ren));
for (const v of Object.values(D.AR)) if (Array.isArray(v.friends)) v.friends = uniq(v.friends.map(ren));
psrc = psrc.split("\n").map(L => { const m = L.match(/^(\[.*\])(,?)\s*$/); if (!m) return L; let e; try { e = JSON.parse(m[1]); } catch (_) { return L; }
  if (!Array.isArray(e[4])) return L; const a2 = uniq(e[4].map(ren)); if (JSON.stringify(a2) === JSON.stringify(e[4])) return L; e[4] = a2; n++; return JSON.stringify(e) + m[2]; }).join("\n");
log.push(`${n} Event-Einträge umbenannt`);
console.log(log.join("\n"));
if (dry) process.exit(0);
function replaceConst(s, name, text) {
  const m = new RegExp("^const " + name + "=", "m").exec(s); if (!m) throw new Error("Konstante fehlt: " + name);
  let i = m.index + m[0].length, d = 0, inS = false, esc = false;
  for (; i < s.length; i++) { const ch = s[i]; if (inS) { if (esc) esc = false; else if (ch === "\\") esc = true; else if (ch === '"') inS = false; continue; }
    if (ch === '"') inS = true; else if (ch === "{" || ch === "[") d++; else if (ch === "}" || ch === "]") { d--; if (d === 0) { i++; break; } } }
  if (s[i] === ";") i++;
  return s.slice(0, m.index) + "const " + name + "=" + text + ";" + s.slice(i);
}
const one = n => new RegExp("^const " + n + "=\\{[^\\n]*\\};?$", "m").test(src);
src = replaceConst(src, "AR", one("AR") ? JSON.stringify(D.AR) : JSON.stringify(D.AR, null, 1));
src = replaceConst(src, "CI", one("CI") ? JSON.stringify(D.CI) : JSON.stringify(D.CI, null, 1));
src = replaceConst(src, "RAW", "[\n" + D.RAW.map(e => JSON.stringify(e)).join(",\n") + "\n]");
fs.writeFileSync(F, src); fs.writeFileSync(P, psrc);
