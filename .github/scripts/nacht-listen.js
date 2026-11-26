// Legt Sonderlauf-Listen für einen Vollständigkeits-Schub an (z. B. über Nacht):
//   b = Artist-Profile (neu, Bild, SoundCloud, Bio, Herkunft), c = Veranstalter, o = Locations, s = Sets+Spotify.
//   node .github/scripts/nacht-listen.js [--tage-seit-suche 14] [--b 25] [--c 15] [--o 12] [--s 40]
// Nur Artists/Veranstalter/Locations aus KOMMENDEN Events; nächste Events zuerst. Wer in den letzten
// --tage-seit-suche Tagen schon gesucht wurde, bleibt draußen. Gibt die angelegten Listen-IDs aus.
const fs = require("fs"), path = require("path"), vm = require("vm");
const R = path.resolve(__dirname, "..", ".."), L = path.join(R, ".github/agent/listen");
const arg = (k, d) => { const i = process.argv.indexOf("--" + k); return i > 0 ? +process.argv[i + 1] : d; };
const c = {}; vm.runInNewContext(fs.readFileSync(path.join(R, "events.js"), "utf8").replace(/^(const|let) /gm, "var ") + ";this.AR=AR;this.CI=CI;this.VI=VI", c);
const heute = new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Vienna" });
const tage = d => d ? Math.round((Date.parse(heute) - Date.parse(String(d).slice(0, 10))) / 864e5) : 9999;
const sperre = arg("tage-seit-suche", 14);
const up = c.RAW.filter(e => e.d >= heute && !e.cancelled).sort((a, b) => a.d.localeCompare(b.d));
const nr = p => { let n = 1; for (const f of fs.readdirSync(L)) { const m = f.match(new RegExp("^" + p + "(\\d+)\\.txt$")); if (m) n = Math.max(n, +m[1] + 1); } return p + String(n).padStart(2, "0"); };
const ctx = e => `${e.d} ${e.venue || "?"}${(e.coll || []).length ? " (" + e.coll.join(", ") + ")" : ""} – ${e.title}`;
const nonArt = /^(tba|open ?decks?|residents?|friends|special guests?|surprise guests?|secret guests?|\+ ?more|and more)$|(&|and|\+) friends$|crew$/i;
const ids = [];
const schreibe = (p, kopf, zeilen, max) => { for (let i = 0; i < zeilen.length && i < max * 3; i += max) { const id = nr(p); fs.writeFileSync(path.join(L, id + ".txt"), kopf.replace("{id}", id).replace("{n}", Math.min(max, zeilen.length - i)) + "\n" + zeilen.slice(i, i + max).join("\n") + "\n"); ids.push(id); } };
// Artists
const art = new Map();
for (const e of up) for (const f of e.floors || []) for (const a0 of f.a || []) for (const a of String(a0).split("|").pop().split(/\s+(?:b2b|x|×|vs\.?)\s+/i)) { const n = a.trim(); if (!n || nonArt.test(n)) continue; if (!art.has(n)) art.set(n, []); art.get(n).push(e); }
const B = [], S = [];
for (const [n, evs] of art) {
  const a = c.AR[n]; const ctxt = evs.slice(0, 2).map(ctx).join(" | ");
  if (!a) { B.push(`${n}\tneu\t\t\t\t${ctxt}`); continue; }
  if (a.man) continue;
  const L2 = a.links || {}, f = [];
  if (!a.img && tage(a.noImg) >= sperre) f.push("img");
  if (!Object.keys(L2).length && tage(a.noLinks) >= sperre) f.push("links");
  else if (!L2.sc && !L2.mc && tage(a.scChk || a.infoChk) >= sperre) f.push("sc");
  if (!(a.bio && (a.bio.de || a.bio.en))) f.push("bio");
  if (!a.from) f.push("from");
  const bek = [a.from && "Herkunft: " + (typeof a.from === "object" ? (a.from.de || a.from.en || "") : a.from), (a.genres || []).length && "Genres: " + a.genres.join(", "), a.alias && "alias: " + [].concat(a.alias).join(", ")].filter(Boolean).join("; ");
  const links = Object.values(L2).join(" ");
  if (f.length && tage(a.infoChk) >= sperre) B.push(`${n}\t${f.join(",")}\t${a.infoChk || ""}\t${bek}\t${links}\t${ctxt}`);
  if ((L2.sc || L2.mc)) { const o = []; if (!(a.sets || []).length && tage(a.setsChecked) >= 60) o.push("sets"); if (!L2.sp && tage(a.spChk) >= 60) o.push("sp"); if (o.length) S.push(`${n}\t${o.join("+")}\t${bek}\t${links}\t${ctxt}`); }
}
schreibe("b", "# Sonderlauf 2 Profile – Liste {id} ({n}). Format: Name<TAB>fehlt<TAB>zuletzt gesucht<TAB>bekannt<TAB>Links<TAB>Auftritte bei uns (Kontext zur Identifizierung)", B, arg("b", 25));
schreibe("s", "# Sondersuchlauf Sets+Spotify – Liste {id} ({n}). Format: Name<TAB>offen<TAB>bekannt<TAB>Links<TAB>Auftritte bei uns (Kontext zur Identifizierung)", S, arg("s", 40));
// Veranstalter
const col = new Map(); for (const e of up) for (const x of e.coll || []) { if (!col.has(x)) col.set(x, []); col.get(x).push(e); }
const C = [];
for (const [n, evs] of col) { const i = c.CI[n]; const ctxt = evs.slice(0, 2).map(e => `${e.d} ${e.venue} – ${e.title}`).join(" | ");
  if (!i) { C.push(`${n}\tneu\t\t\t${ctxt}`); continue; } if (i.man && i.logo && i.web) continue;
  const f = []; if (!(i.de || i.txt)) f.push("text"); if (!i.web && !i.ig && !i.sc && !(i.links && Object.keys(i.links).length)) f.push("links"); if (!i.ig && !(i.links || {}).ig) f.push("ig"); if (!i.logo && tage(i.noLogo) >= sperre) f.push("logo");
  if (f.length && tage(i.infoChk) >= sperre) C.push(`${n}\t${f.join(",")}\t${i.infoChk || ""}\t${[i.web && "web: " + i.web, i.ig && "ig: " + i.ig, i.sc && "sc: " + i.sc, i.lt && "lt: " + i.lt].filter(Boolean).join(" · ")}\t${ctxt}`); }
schreibe("c", "# Sonderlauf Veranstalter – Liste {id} ({n}). Format: Name<TAB>fehlt<TAB>zuletzt gesucht<TAB>bekannt<TAB>Events bei uns", C, arg("c", 15));
// Locations
const ven = new Map(); for (const e of up) { const v = e.venue; if (!v || /^(TBA|Secret Location)$/i.test(v)) continue; if (!ven.has(v)) ven.set(v, []); ven.get(v).push(e); }
const O = [];
for (const [n, evs] of [...ven].sort((a, b) => b[1].length - a[1].length)) { const i = c.VI[n] || {}; const f = [];
  if (!(i.de || i.txt)) f.push("text"); if (!i.web) f.push("web"); if (!i.logo && !i.img && tage(i.noLogo) >= sperre) f.push("logo"); if (!i.opened) f.push("opened"); if (!i.io) f.push("io");
  if (f.length && tage(i.infoChk) >= sperre) O.push(`${n}\t${f.join(",")}\t${i.infoChk || ""}\t${[(c.V || {})[n] && "Adresse: " + c.V[n], i.web && "web: " + i.web].filter(Boolean).join(" · ")}\t${evs.slice(0, 2).map(e => e.d + " " + e.title).join(" | ")}`); }
schreibe("o", "# Sonderlauf Locations – Liste {id} ({n}). Format: Name<TAB>fehlt<TAB>zuletzt gesucht<TAB>bekannt<TAB>Events bei uns", O, arg("o", 12));
console.log(`Artists offen ${B.length}, Sets/Spotify offen ${S.length}, Veranstalter offen ${C.length}, Locations offen ${O.length}`);
console.log("LISTEN " + ids.join(" "));
