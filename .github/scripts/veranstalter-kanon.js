// Veranstalter-Dubletten aufräumen: Namen, die ein Alias eines CI-Eintrags sind, werden in RAW (coll), PAST (coll),
// AR (coll), CG und KC durch den Hauptnamen ersetzt. Mit --merge "Alt=Neu" wird der CI-Eintrag „Alt“ vorher in „Neu“
// zusammengeführt (leere Felder von Neu werden aus Alt gefüllt, Listen vereinigt, Alt wird Alias). man:1-Werte bleiben.
//   node .github/scripts/veranstalter-kanon.js [--dry] [--merge "Alt=Neu" ...]
const fs = require("fs"), path = require("path"), vm = require("vm");
const root = path.resolve(__dirname, "..", ".."), F = path.join(root, "events.js"), P = path.join(root, "past.js");
const dry = process.argv.includes("--dry");
const merges = []; process.argv.forEach((a, i) => { if (a === "--merge") { const [x, y] = String(process.argv[i + 1] || "").split("="); if (x && y) merges.push([x.trim(), y.trim()]); } });
let src = fs.readFileSync(F, "utf8"), psrc = fs.readFileSync(P, "utf8");
const c = {}; vm.runInNewContext(src + ";this.o={CI,KC,CG,RAW,AR}", c); const D = c.o;
const pc = {}; vm.runInNewContext(psrc.replace(/^const PAST=/m, "this.PAST="), pc); const PAST = pc.PAST;
const key = s => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");
const log = [];
const leer = v => v == null || v === "" || (Array.isArray(v) && !v.length);
for (const [alt, neu] of merges) {
  const A = D.CI[alt], N = D.CI[neu]; if (!A || !N) { log.push(`merge übersprungen (fehlt): ${alt} → ${neu}`); continue; }
  for (const [f, v] of Object.entries(A)) {
    if (["alias", "src", "type"].includes(f) && Array.isArray(v)) { N[f] = [...new Set([...(N[f] || []), ...v])]; continue; }
    if (leer(N[f]) && !leer(v)) N[f] = v;
  }
  N.alias = [...new Set([...(N.alias || []), alt, ...(A.alias || [])])].filter(x => key(x) !== key(neu));
  delete D.CI[alt]; log.push(`zusammengeführt: ${alt} → ${neu}`);
}
const canon = {}; for (const [n, v] of Object.entries(D.CI)) { canon[key(n)] = n; for (const a of [].concat((v && v.alias) || [])) if (!canon[key(a)]) canon[key(a)] = n; }
const C = n => canon[key(n)] || n;
const fixList = (l, wo) => { if (!Array.isArray(l)) return l; const out = []; for (const x of l) { const y = C(x); if (y !== x) log.push(`${wo}: ${x} → ${y}`); if (!out.includes(y)) out.push(y); } return out; };
D.RAW.forEach(e => { if (e.coll) e.coll = fixList(e.coll, `RAW ${e.d} ${e.title}`); });
PAST.forEach(p => { if (Array.isArray(p[3])) p[3] = fixList(p[3], `PAST ${p[0]} ${p[2]}`); });
Object.entries(D.AR).forEach(([n, a]) => { if (a.coll) a.coll = fixList(a.coll, `AR ${n}`); });
for (const [n, g] of Object.entries({ ...D.CG })) { const m = C(n); if (m !== n) { D.CG[m] = [...new Set([...(D.CG[m] || []), ...g])]; delete D.CG[n]; log.push(`CG: ${n} → ${m}`); } }
const kc = []; for (const n of D.KC) { const m = C(n); if (!kc.includes(m)) kc.push(m); if (m !== n) log.push(`KC: ${n} → ${m}`); } kc.sort((a, b) => a.localeCompare(b, "de"));
console.log(log.join("\n") || "Keine Dubletten.");
if (dry || !log.length) process.exit(0);
function replaceConst(s, name, text) {
  const m = new RegExp("^const " + name + "=", "m").exec(s); if (!m) throw new Error("Konstante fehlt: " + name);
  let i = m.index + m[0].length, d = 0, inS = false, esc = false;
  for (; i < s.length; i++) { const ch = s[i]; if (inS) { if (esc) esc = false; else if (ch === "\\") esc = true; else if (ch === '"') inS = false; continue; }
    if (ch === '"') inS = true; else if (ch === "{" || ch === "[") d++; else if (ch === "}" || ch === "]") { d--; if (d === 0) { i++; break; } } }
  if (s[i] === ";") i++;
  return s.slice(0, m.index) + "const " + name + "=" + text + ";" + s.slice(i);
}
const oneLine = /^const KC=\[[^\n]*\];?$/m.test(src);
src = replaceConst(src, "CI", JSON.stringify(D.CI, null, 1));
src = replaceConst(src, "CG", /^const CG=\{[^\n]*\};?$/m.test(src) ? JSON.stringify(D.CG) : JSON.stringify(D.CG, null, 1));
src = replaceConst(src, "KC", oneLine ? JSON.stringify(kc) : JSON.stringify(kc, null, 1));
src = replaceConst(src, "AR", /^const AR=\{[^\n]*\};?$/m.test(src) ? JSON.stringify(D.AR) : JSON.stringify(D.AR, null, 1));
src = replaceConst(src, "RAW", "[\n" + D.RAW.map(e => JSON.stringify(e)).join(",\n") + "\n]");
fs.writeFileSync(F, src);
// past.js zeilenweise: nur geänderte Zeilen neu schreiben (ältere Zeilen haben ein anderes Format)
psrc = psrc.split("\n").map(L => { const m = L.match(/^(\[.*\])(,?)\s*$/); if (!m) return L; let e; try { e = JSON.parse(m[1]); } catch (_) { return L; }
  if (!Array.isArray(e[3])) return L; const neu = fixList(e[3], "-"); return JSON.stringify(neu) === JSON.stringify(e[3]) ? L : (e[3] = neu, JSON.stringify(e) + m[2]); }).join("\n");
fs.writeFileSync(P, psrc);
