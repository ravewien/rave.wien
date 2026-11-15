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
//  - alias und src: Listen werden vereinigt (keine Dubletten).
//  - Ein neuer Name, der bereits alias eines Eintrags ist, wird auf diesen Eintrag umgeleitet.
//  - "S": {kürzel: "Quellenname"} – neue Quellen-Kürzel (nur neue, bestehende bleiben); "SO": ["kürzel"] – Kürzel, die eigene Seiten von Veranstaltern sind.
//  - "VR": {Location: {age, aw, nophoto, sound:{…}}} – Hausregeln/Soundsystem, wie AR/CI/VI zusammengeführt (Location muss in V stehen).
//  - "EV": {"<Event-Schlüssel>": {Feld: Wert, ...}} – kommende Events in RAW. Schlüssel = (d + "-" + slug(title)), auf 60 Zeichen
//    gekürzt (steht in den Listen der Sonderläufe). Regeln: man:1 → nur leere Felder ergänzen; src (Paare ["kürzel", url]) und
//    coll werden angehängt, nie ersetzt; na wird angehängt und um Felder bereinigt, die jetzt einen Wert haben; Wert null entfernt
//    ein Feld; "_delete": true entfernt das Event (Absage; nie bei man:1). Unbekannte Schlüssel werden gemeldet und übersprungen.
const fs = require("fs"), path = require("path"), vm = require("vm");
const patchF = process.argv[2], evF = process.argv[3] || path.resolve(__dirname, "..", "..", "events.js");
if (!patchF) { console.error("Aufruf: node apply-patch.js <patch.json> [events.js]"); process.exit(1); }
const patch = JSON.parse(fs.readFileSync(patchF, "utf8"));
let src = fs.readFileSync(evF, "utf8");
const names = ["V", "S", "SO", "VR", "CG", "KC", "CI", "VI", "AR"];
const hasEV = patch.EV && Object.keys(patch.EV).length > 0;
const ctx = {}; vm.runInNewContext(src + "\n;this.__o={" + names.concat(hasEV ? ["RAW"] : []).map(n => `${n}:typeof ${n}!=="undefined"?${n}:undefined`).join(",") + "};", ctx);
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
    if (top && f === "src" && Array.isArray(v) && Array.isArray(cur.src)) { // Quellen sammeln, nie ersetzen
      const out = cur.src.slice(); v.forEach(u => { if (typeof u === "string" && u.trim() && !out.includes(u.trim())) out.push(u.trim()); });
      if (out.length !== cur.src.length) { cur.src = out; changed++; } continue;
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
for (const [k, name] of Object.entries(patch.S || {})) { if (D.S && typeof name === "string" && name.trim() && /^[a-z0-9]{1,8}$/.test(k) && D.S[k] === undefined) { D.S[k] = name.trim(); changed++; } }
for (const k of patch.SO || []) { if (Array.isArray(D.SO) && typeof k === "string" && D.S && D.S[k] !== undefined && !D.SO.includes(k)) { D.SO.push(k); changed++; } }
for (const [n0, add] of Object.entries(patch.VR || {})) {
  const n = D.V[n0] !== undefined ? n0 : resolve(D.VI, n0);
  if (D.V[n] === undefined) { log.push(`VR übersprungen (Location unbekannt): ${n0}`); continue; }
  if (!D.VR[n]) D.VR[n] = {};
  mergeEntry(D.VR[n], add, true, false); // Hausregeln/Sound: nur Leeres ergänzen, nie überschreiben if (isEmpty(D.VR[n])) delete D.VR[n];
}
// Events (RAW)
if (hasEV) {
  const slug = t => String(t).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ß/g, "ss").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const evKey = e => (e.d + "-" + slug(e.title)).slice(0, 60).replace(/-$/, "");
  const NAF = ["price", "e", "flyer", "tickets", "s", "age"];
  const mergeEv = (cur, add, man) => {
    for (const [f, v] of Object.entries(add)) {
      if (f === "_delete" || f === "man") continue;
      if (f === "src" && Array.isArray(v)) {
        const out = Array.isArray(cur.src) ? cur.src.slice() : []; const have = new Set(out.map(x => x && x[1]));
        v.forEach(x => { if (Array.isArray(x) && x.length === 2 && typeof x[0] === "string" && typeof x[1] === "string" && /^https?:\/\//.test(x[1]) && !have.has(x[1])) { out.push([x[0], x[1]]); have.add(x[1]); } });
        if (out.length !== (cur.src || []).length) { cur.src = out; changed++; } continue;
      }
      if ((f === "coll" || f === "na") && Array.isArray(v)) {
        const out = Array.isArray(cur[f]) ? cur[f].slice() : [];
        v.forEach(x => { if (typeof x === "string" && x.trim() && !out.includes(x.trim())) out.push(x.trim()); });
        if (out.length !== (cur[f] || []).length) { cur[f] = out; changed++; } continue;
      }
      if (v === null) { if (!man && f in cur && !["d", "title", "venue", "src"].includes(f)) { delete cur[f]; changed++; } continue; }
      if (isObj(v) && (isObj(cur[f]) || cur[f] == null)) {
        if (cur[f] == null) cur[f] = {};
        for (const [g, w] of Object.entries(v)) { if (w == null) continue; if (man && !isEmpty(cur[f][g])) continue; if (JSON.stringify(cur[f][g]) !== JSON.stringify(w)) { cur[f][g] = w; changed++; } }
        if (isEmpty(cur[f])) delete cur[f]; continue;
      }
      if (isEmpty(v)) continue;
      if (man && !isEmpty(cur[f])) continue;
      if (JSON.stringify(cur[f]) !== JSON.stringify(v)) { cur[f] = v; changed++; }
    }
    if (Array.isArray(cur.na)) { const na = cur.na.filter(x => !(NAF.includes(x) && !isEmpty(cur[x]))); if (na.length !== cur.na.length) { changed++; if (na.length) cur.na = na; else delete cur.na; } }
  };
  for (const [k, add] of Object.entries(patch.EV)) {
    const hit = D.RAW.filter(e => evKey(e) === k);
    if (!hit.length) { log.push(`EV nicht gefunden: ${k}`); continue; }
    if (add && add._delete === true) {
      if (hit.some(e => e.man === 1)) { log.push(`EV nicht entfernt (man:1): ${k}`); continue; }
      D.RAW = D.RAW.filter(e => !hit.includes(e)); changed++; log.push(`EV entfernt: ${k}`); continue;
    }
    hit.forEach(e => mergeEv(e, add, e.man === 1));
  }
}
// zurückschreiben im vorhandenen Stil
function replaceConst(name, val, oneLine, text) {
  const re = new RegExp("^const " + name + "=", "m"); const m = re.exec(src); if (!m) throw new Error("Konstante fehlt: " + name);
  const start = m.index; let i = start + m[0].length, depth = 0, inStr = false, esc = false;
  for (; i < src.length; i++) { const c = src[i];
    if (inStr) { if (esc) esc = false; else if (c === "\\") esc = true; else if (c === '"') inStr = false; continue; }
    if (c === '"') inStr = true; else if (c === "{" || c === "[") depth++; else if (c === "}" || c === "]") { depth--; if (depth === 0) { i++; break; } } }
  if (src[i] === ";") i++;
  src = src.slice(0, start) + "const " + name + "=" + (text !== undefined ? text : oneLine ? JSON.stringify(val) : JSON.stringify(val, null, 1)) + ";" + src.slice(i);
}
const oneLine = n => { const m = new RegExp("^const " + n + "=(.*)$", "m").exec(src); return m && /;\s*$/.test(m[1]); };
for (const n of names) if (D[n] !== undefined) replaceConst(n, D[n], oneLine(n));
if (hasEV) replaceConst("RAW", D.RAW, false, "[\n" + D.RAW.map(e => JSON.stringify(e)).join(",\n") + "\n]"); // ein Event pro Zeile
fs.writeFileSync(evF, src);
console.log(`Änderungen: ${changed}` + (log.length ? `\n` + log.join("\n") : ""));
