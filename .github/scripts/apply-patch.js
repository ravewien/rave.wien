// Wendet eine Änderungsdatei (JSON) eines Profil-Laufs auf events.js an – immer auf die
// aktuelle Version aus GitHub, damit parallel laufende Läufe sich nicht gegenseitig überschreiben.
//
//   node .github/scripts/apply-patch.js <patch.json> [events.js]
//
// patch.json: { "AR": {Name: {Feld: Wert, ...}}, "CI": {...}, "VI": {...}, "V": {Name: "Adresse"},
//               "CG": {Veranstalter: [Genres]}, "KC": ["Neuer Veranstalter", ...] }
// Regeln (wie in den Lauf-Anweisungen):
//  - Bestehende Einträge mit man:1: nur LEERE Felder ergänzen, nie Werte ändern.
//  - Vorhandenes img / logo nie ändern.
//  - Alle anderen Felder: setzen (Objekte wie links/bio/from werden feldweise zusammengeführt).
//  - alias: Listen werden vereinigt (keine Dubletten).
//  - Ein neuer Name, der bereits alias eines Eintrags ist, wird auf diesen Eintrag umgeleitet.
const fs = require("fs"), path = require("path"), vm = require("vm");
const patchF = process.argv[2], evF = process.argv[3] || path.resolve(__dirname, "..", "..", "events.js");
if (!patchF) { console.error("Aufruf: node apply-patch.js <patch.json> [events.js]"); process.exit(1); }
const patch = JSON.parse(fs.readFileSync(patchF, "utf8"));
let src = fs.readFileSync(evF, "utf8");
const names = ["V", "VR", "CG", "KC", "CI", "VI", "AR"];
const ctx = {}; vm.runInNewContext(src + "\n;this.__o={" + names.map(n => `${n}:typeof ${n}!=="undefined"?${n}:undefined`).join(",") + "};", ctx);
const D = ctx.__o;
const isEmpty = v => v == null || v === "" || (Array.isArray(v) && !v.length) || (typeof v === "object" && !Array.isArray(v) && !Object.keys(v).length);
const isObj = v => v && typeof v === "object" && !Array.isArray(v);
const key = s => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");
let changed = 0; const log = [];
function resolve(obj, name) {
  if (obj[name]) return name;
  const k = key(name);
  for (const [n, v] of Object.entries(obj)) { if (key(n) === k) return n; if ((v.alias || []).some(a => key(a) === k)) return n; }
  return name;
}
function mergeEntry(cur, add, man, top) {
  for (const [f, v] of Object.entries(add)) {
    if (v === undefined) continue;
    if (top && (f === "img" || f === "logo") && !isEmpty(cur[f])) continue;
    if (f === "alias" && Array.isArray(v)) {
      const have = new Set((cur.alias || []).map(key)); const out = (cur.alias || []).slice();
      v.forEach(a => { if (typeof a === "string" && a.trim() && !have.has(key(a))) { out.push(a.trim()); have.add(key(a)); } });
      if (out.length !== (cur.alias || []).length) { cur.alias = out; changed++; } continue;
    }
    if (isObj(v) && (isObj(cur[f]) || cur[f] == null)) {
      if (cur[f] == null) cur[f] = {};
      mergeEntry(cur[f], v, man, false); if (isEmpty(cur[f])) delete cur[f]; continue;
    }
    if (man && !isEmpty(cur[f])) continue;
    if (JSON.stringify(cur[f]) !== JSON.stringify(v)) { cur[f] = v; changed++; }
  }
}
for (const t of ["AR", "CI", "VI"]) {
  for (const [n0, add] of Object.entries(patch[t] || {})) {
    const obj = D[t]; const n = resolve(obj, n0);
    if (!obj[n]) { obj[n] = {}; log.push(`${t} neu: ${n}`); }
    mergeEntry(obj[n], add, obj[n].man === 1, true);
  }
}
for (const [n, a] of Object.entries(patch.V || {})) { if (!D.V[n] || D.V[n] === "Wien") { D.V[n] = a; changed++; } }
for (const [n, g] of Object.entries(patch.CG || {})) { const cur = D.CG[n] || []; const out = cur.slice(); (g || []).forEach(x => out.includes(x) || out.push(x)); if (out.length !== cur.length) { D.CG[n] = out; changed++; } }
let kcNew = false;
for (const n of patch.KC || []) if (!D.KC.some(x => key(x) === key(n))) { D.KC.push(n); changed++; kcNew = true; }
if (kcNew) D.KC.sort((a, b) => a.localeCompare(b, "de", { sensitivity: "base" }));
// zurückschreiben im vorhandenen Stil
function replaceConst(name, val, oneLine) {
  const re = new RegExp("^const " + name + "=", "m"); const m = re.exec(src); if (!m) throw new Error("Konstante fehlt: " + name);
  const start = m.index; let i = start + m[0].length, depth = 0, inStr = false, esc = false;
  for (; i < src.length; i++) { const c = src[i];
    if (inStr) { if (esc) esc = false; else if (c === "\\") esc = true; else if (c === '"') inStr = false; continue; }
    if (c === '"') inStr = true; else if (c === "{" || c === "[") depth++; else if (c === "}" || c === "]") { depth--; if (depth === 0) { i++; break; } } }
  if (src[i] === ";") i++;
  src = src.slice(0, start) + "const " + name + "=" + (oneLine ? JSON.stringify(val) : JSON.stringify(val, null, 1)) + ";" + src.slice(i);
}
const oneLine = n => { const m = new RegExp("^const " + n + "=(.*)$", "m").exec(src); return m && /;\s*$/.test(m[1]); };
for (const n of names) if (D[n] !== undefined) replaceConst(n, D[n], oneLine(n));
fs.writeFileSync(evF, src);
console.log(`Änderungen: ${changed}` + (log.length ? `\n` + log.join("\n") : ""));
