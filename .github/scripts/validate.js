// Prüft events.js / past.js inhaltlich (wird vom Daten-Wächter nach jedem Push ausgeführt).
// Schlägt fehl (Exit 1), wenn die Daten etwas enthalten, das dort nie hingehört:
// HTML-Tags, unsichere Link-Schemata, Steuerzeichen oder kaputte Datums-/Zeitformate.
// Die Seite maskiert zwar selbst alle Daten, das hier ist die zweite Sicherung davor.
const fs = require("fs"), path = require("path"), vm = require("vm");
const root = path.resolve(__dirname, "..", "..");
const NAMES = ["V", "S", "SO", "VR", "CG", "KC", "CI", "VI", "LS", "AR", "VG", "RAW"];
const c = {};
try {
  vm.runInNewContext(fs.readFileSync(path.join(root, "events.js"), "utf8") + ";" + NAMES.map(n => `try{this.${n}=${n}}catch(e){}`).join(";"), c, { timeout: 20000 });
  vm.runInNewContext(fs.readFileSync(path.join(root, "past.js"), "utf8") + ";try{this.PAST=PAST}catch(e){}", c, { timeout: 20000 });
} catch (e) { console.log("Daten nicht ladbar: " + e.message); process.exit(1); }

const bad = [];
const note = (what, where, val) => { if (bad.length < 40) bad.push(`${what} – ${where}: ${String(val).slice(0, 90)}`); else if (bad.length === 40) bad.push("…"); };
const TAG = /<[a-zA-Z\/!?]/, SCHEME = /^\s*(javascript|vbscript|data|file|blob)\s*:/i, CTRL = new RegExp("[\\u0000-\\u0008\\u000b\\u000c\\u000e-\\u001f\\u2028\\u2029]");
const OTHER = /^[a-z][a-z0-9+.-]*:\/\//i, HTTP = /^https?:\/\//i;
let n = 0;
const walk = (v, p) => {
  if (typeof v === "string") {
    n++;
    if (TAG.test(v)) note("HTML im Text", p, v);
    if (SCHEME.test(v)) note("unsicherer Link", p, v);
    if (CTRL.test(v)) note("Steuerzeichen", p, v);
    if (OTHER.test(v) && !HTTP.test(v)) note("Link mit unerwartetem Schema", p, v);
  } else if (Array.isArray(v)) v.forEach(x => walk(x, p + "[]"));
  else if (v && typeof v === "object") for (const k of Object.keys(v)) { walk(k, p + " (Schlüssel)"); walk(v[k], p + "." + k); }
};
for (const k of Object.keys(c)) walk(c[k], k);

const D = /^\d{4}-\d{2}-\d{2}$/, T = /^\d{1,2}:\d{2}$/;
if (!Array.isArray(c.RAW)) note("Struktur", "RAW", "fehlt oder ist keine Liste");
else c.RAW.forEach((e, i) => {
  const w = `RAW[${i}] ${e && e.title || ""}`;
  if (!e || typeof e !== "object") return note("Struktur", w, "kein Objekt");
  if (typeof e.d !== "string" || !D.test(e.d)) note("Datum", w, e.d);
  if (typeof e.title !== "string" || !e.title.trim()) note("Titel fehlt", w, e.title);
  ["s", "e"].forEach(k => { if (k in e && !(typeof e[k] === "string" && T.test(e[k]))) note("Uhrzeit " + k, w, e[k]); });
});
if (c.PAST !== undefined) {
  if (!Array.isArray(c.PAST)) note("Struktur", "PAST", "keine Liste");
  else c.PAST.forEach((r, i) => {
    const w = `PAST[${i}] ${Array.isArray(r) && r[2] || ""}`;
    if (!Array.isArray(r)) return note("Struktur", w, "keine Liste");
    if (typeof r[0] !== "string" || !D.test(r[0])) note("Datum", w, r[0]);
    const x = r[5] || {};
    ["s", "e"].forEach(k => { if (k in x && !(typeof x[k] === "string" && T.test(x[k]))) note("Uhrzeit " + k, w, x[k]); });
  });
}

if (bad.length) { console.log("Daten-Prüfung fehlgeschlagen:\n" + bad.join("\n")); process.exit(1); }
console.log(`Daten in Ordnung (${n} Texte geprüft).`);
