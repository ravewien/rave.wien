// Bereitet einen Sonderlauf vor – ohne KI. Liest die Abruf-Kopien (GitHub + Raspberry Pi) und schreibt je Event der Liste
// ein kurzes Dossier: was fehlt, welche Quellen sich seit der letzten Prüfung geändert haben, maschinenlesbare Vorschläge
// (JSON-LD, og:image, Preise/Zeiten aus der Eventseite) und knappe Textauszüge. Der Lauf liest dann NUR noch das Dossier,
// schließt Lücken und führt zusammen – statt jede Seite selbst zu holen und zu lesen.
//   node .github/scripts/dossier.js .github/agent/listen/e27.txt [abruf-ordner=/tmp/abruf]
// Ergebnis: <abruf>/dossier.md (zum Lesen) und <abruf>/dossier-patch.json (chk/srcChk für Events ohne neue Angaben –
// als Grundlage für /home/claude/patch.json).
const fs = require("fs"), path = require("path"), vm = require("vm");
const root = path.resolve(__dirname, "..", "..");
const liste = process.argv[2], dir = path.resolve(process.argv[3] || "/tmp/abruf");
if (!liste) { console.error("Aufruf: node .github/scripts/dossier.js <listen-datei> [abruf-ordner]"); process.exit(1); }
const c = {}; vm.runInNewContext(fs.readFileSync(path.join(root, "events.js"), "utf8").replace(/^(const|let) /gm, "var "), c);
const heute = new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Vienna" });
const slug = t => String(t).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ß/g, "ss").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const key = e => (e.d + "-" + slug(e.title)).slice(0, 60).replace(/-$/, "");
const norm = t => String(t || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ß/g, "ss").replace(/[^a-z0-9]+/g, "");
const uk = u => String(u || "").replace(/^https?:\/\/(www\.)?/, "").replace(/#.*$/, "").replace(/\/$/, "").toLowerCase();
const EV = {}; c.RAW.forEach(e => EV[key(e)] = e);
// Abruf-Index: adresse → [status, datei, fehler, geaendert_am]
const IDX = {};
const idxDatei = path.join(dir, "index.tsv");
if (!fs.existsSync(idxDatei)) { console.error("Keine Abruf-Kopien in " + dir + " – zuerst node .github/scripts/abruf-holen.js"); process.exit(2); }
fs.readFileSync(idxDatei, "utf8").trim().split("\n").slice(1).forEach(l => { const r = l.split("\t"); IDX[uk(r[0])] = { u: r[0], st: r[1], f: r[3], err: r[4], ge: r[5] || "" }; });
// Nachgeladene Kopien (nach-*/) zusätzlich berücksichtigen
for (const d of fs.readdirSync(dir).filter(x => /^nach-/.test(x))) try {
  fs.readFileSync(path.join(dir, d, "index.tsv"), "utf8").trim().split("\n").slice(1).forEach(l => { const r = l.split("\t"); if (!r[4] && r[3]) IDX[uk(r[0])] = { u: r[0], st: r[1], f: "../" + d + "/seiten/" + r[3], err: "", ge: heute }; });
} catch (_) {}
const lies = f => { try { return fs.readFileSync(path.join(dir, "seiten", f), "utf8"); } catch (_) { return ""; } };
// Standard-og:image je Website (Startseite) – solche Bilder sind kein Flyer
const stdBild = {}; for (const r of Object.values(IDX)) { if (r.err || !r.f) continue; try { const p = new URL(r.u); if (p.pathname.replace(/\/$/, "") === "") { const m = lies(r.f).match(/^OG:IMAGE: (.*)$/m); if (m) stdBild[p.host.replace(/^www\./, "")] = m[1].trim(); } } catch (_) {} }
const istStd = (b, u) => { try { const h = new URL(u).host.replace(/^www\./, ""); return stdBild[h] === b || /(og[_-]?image|logo|favicon|default|placeholder)/i.test(b.split("/").pop()); } catch (_) { return true; } };
const FLY = /^https:\/\/[^"'<>\s]+\.(jpe?g|png|webp|avif)(\?[^"'<>\s]*)?$/i, BOES = /fbcdn|cdninstagram|scontent|imgproxy/i;
// JSON-LD-Events aus einem Text
function docs(t) { const out = []; let i = 0; while (i < t.length) { const a = t.slice(i).search(/[\[{]/); if (a < 0) break; i += a; let d = 0, s = false, esc = false, j = i;
  for (; j < t.length; j++) { const ch = t[j]; if (s) { if (esc) esc = false; else if (ch === "\\") esc = true; else if (ch === '"') s = false; continue; } if (ch === '"') s = true; else if (ch === "{" || ch === "[") d++; else if (ch === "}" || ch === "]") { d--; if (d === 0) { j++; break; } } }
  try { out.push(JSON.parse(t.slice(i, j))); } catch (_) {} i = Math.max(j, i + 1); } return out; }
const isEv = t => [].concat(t || []).some(x => /Event$|^Festival$/.test(String(x)));
function ld(t) { const k = t.indexOf("--- JSON-LD ---"); if (k < 0) return []; const out = [];
  const walk = (o, n = 0) => { if (!o || typeof o !== "object" || n > 8) return; if (Array.isArray(o)) return o.forEach(x => walk(x, n + 1)); if (isEv(o["@type"]) && o.startDate) out.push(o); Object.values(o).forEach(v => v && typeof v === "object" && walk(v, n + 1)); };
  docs(t.slice(k + 15).split("--- __NEXT_DATA__ ---")[0]).forEach(d => walk(d)); return out; }
const str = v => typeof v === "string" ? v : (v && (v.url || v.name || v["@id"])) || "";
// Haupttext einer Seite ohne Navigation; Links nur behalten, wenn sie nach Tickets aussehen
function haupt(t) {
  const body = t.split("--- JSON-LD ---")[0].split(/\n\n/).slice(1).join("\n\n");
  return body.split("\n").map(l => l.trim().replace(/\[Bild[^\]]*(logo|icon|\.svg)[^\]]*\]\s*/gi, "")).filter(l => l && !/^[^<]{0,30}<https?:[^>]+>$/.test(l) && !/^(TITEL|OG:[A-Z]+|TWITTER:[A-Z]+|DESCRIPTION|ABGERUFEN|ADRESSE|QUELLE):/.test(l) && !/^[.\-–×|]$/.test(l))
    .map(l => l.replace(/<(https?:[^>]+)>/g, (m, u) => /ticket|shop|eventbrite|kupfticket|oeticket|ticket\.io|frey-tag|stagedates|tickethead|partyticket|eventim/i.test(u) ? "<" + u + ">" : "")).join("\n");
}
function auszug(text, e) {   // Stelle rund um das Event in einer Programmseite
  const z = text.split("\n"), nt = norm(e.title).slice(0, 18), [Y, M, D] = e.d.split("-");
  const datum = new RegExp(`(^|\\D)(${+D}|${D})\\.\\s?(${+M}|${M})\\.|${Y}-${M}-${D}`);
  let i = z.findIndex(l => nt.length > 4 && norm(l).includes(nt)); if (i < 0) i = z.findIndex(l => datum.test(l)); if (i < 0) return "";
  return z.slice(Math.max(0, i - 3), i + 14).join("\n").slice(0, 900);
}
function werte(text) {   // Preise und Zeiten aus Klartext
  const preise = [...new Set((text.match(/[^\n]{0,40}(\d+[,.]?\d*\s?(€|EUR)|€\s?\d+)[^\n]{0,30}/g) || []).map(s => s.trim()))].slice(0, 5);
  const zeiten = [...new Set((text.match(/[^\n]{0,25}\b\d{1,2}[:.]\d{2}\s*(AM|PM|Uhr|h)?\s*[-–bis]+\s*\d{1,2}[:.]\d{2}\s*(AM|PM|Uhr|h)?[^\n]{0,15}/gi) || []).map(s => s.trim()))].slice(0, 3);
  const zu = /ausverkauft|sold out|abgesagt|cancel+ed|verschoben|postponed/i.exec(text);
  return { preise, zeiten, hinweis: zu ? text.slice(Math.max(0, zu.index - 80), zu.index + 80).replace(/\n/g, " ") : "" };
}
const standDatei = path.join(root, ".github/agent/dossier-stand.json"); let STAND = {}; try { STAND = JSON.parse(fs.readFileSync(standDatei, "utf8")); } catch (_) {}
const zeilen = fs.readFileSync(path.resolve(liste), "utf8").split("\n").slice(1).filter(Boolean);
const out = [], patch = { EV: {} }; let nNeu = 0, nRuhig = 0, nWeg = 0;
for (const l of zeilen) {
  const [k, , , titel, fehlt] = l.split("\t"); const e = EV[k];
  if (!e) { out.push(`## ${k}\nNICHT MEHR IN events.js (geändert oder entfernt) – überspringen.\n`); nWeg++; continue; }
  const chk = e.chk || "", srcChk = e.srcChk || chk;
  const vi = (c.VI || {})[e.venue] || {}, cis = (e.coll || []).map(x => (c.CI || {})[x]).filter(Boolean);
  const eigen = [...new Set([...(e.src || []).map(s => s && s[1]), e.tickets].filter(Boolean))];
  const programm = [...new Set([vi.web, ...cis.flatMap(x => [x.web, x.tix])].filter(u => u && !/instagram|facebook|linktr/.test(u)))];
  const qz = [], vor = [], auszuege = []; 
  const fl = new Set(String(fehlt || "").split(",").map(x => x.replace("*", "")));
  const istStart = u => { try { const p = new URL(u).pathname.replace(/\/(de|en)?\/?$/, ""); return !p || /^\/(programm|program|events?|musik|kalender|calendar|termine)$/i.test(p); } catch (_) { return true; } };
  const quellen = [...eigen.map(u => [u, istStart(u) ? "programm" : "event"]), ...programm.filter(u => !eigen.includes(u)).map(u => [u, "programm"])];
  const gesehen = new Set(), stoff = [];
  for (const [u, art] of quellen) {
    const r = IDX[uk(u)];
    if (!r) { qz.push(`- ${u} – nicht in den Kopien${/(^|\.)ra\.co\//.test(uk(u)) ? " (ra.co gesperrt → WebSearch)" : ""}`); continue; }
    if (r.err) { qz.push(`- ${u} – gesperrt/Fehler: ${r.err}`); continue; }
    const t = lies(r.f), neu = !r.ge || r.ge > srcChk;
    // JSON-LD des Events
    const [Y, M, D] = e.d.split("-");
    for (const o of ld(t)) {
      if (!String(o.startDate).startsWith(e.d)) continue; const nt = norm(o.name), et = norm(e.title);
      if (!(art === "event" || nt.includes(et.slice(0, 12)) || et.includes(nt.slice(0, 12)))) continue;
      const off = [].concat(o.offers || []); const p = off.map(x => x.price != null ? x.price : x.lowPrice).filter(x => x !== "" && x != null && +x > 0);
      const hi = off.map(x => x.highPrice).filter(x => x && +x > 0);
      const ende = String(o.endDate || "").match(/^(\d{4}-\d{2}-\d{2})[T ](\d{2}:\d{2})/);
      const bild = str([].concat(o.image || [])[0]);
      if (fl.has("price") && p.length) vor.push(`price: ${[...new Set(p)].join(" / ")}${hi.length ? "–" + Math.max(...hi) : ""} € (JSON-LD offers) [${u}]`);
      if (fl.has("e") && ende && ende[1] >= e.d) vor.push(`e: ${ende[2]} (JSON-LD endDate ${ende[1]}) [${u}]`);
      if (fl.has("flyer") && FLY.test(bild) && !BOES.test(bild) && !istStd(bild, u)) vor.push(`flyer: ${bild} (JSON-LD image) [${u}]`);
      const tu = off.map(x => x.url).find(x => /^https:\/\//.test(x || "")); if (fl.has("tickets") && tu) vor.push(`tickets: ${tu} (JSON-LD offers.url) [${u}]`);
      const perf = [].concat(o.performer || []).map(str).filter(Boolean); if (fl.has("lineup") && perf.length) vor.push(`lineup: ${perf.join(", ")} (JSON-LD performer) [${u}]`);
    }
    if (art === "event") {
      const og = ((t.match(/^OG:IMAGE: (.*)$/m) || [])[1] || "").trim();
      if (fl.has("flyer") && og && FLY.test(og) && !BOES.test(og)) vor.push(`flyer: ${og} (og:image${istStd(og, u) ? " – SIEHT NACH STANDARDBILD/LOGO DER WEBSITE AUS, nicht nehmen" : ""}) [${u}]`);
      const h = haupt(t), w = werte(h);
      if (w.hinweis) vor.push(`HINWEIS Absage/Ausverkauft?: „${w.hinweis}“ [${u}]`);
      const hk = norm(h).slice(0, 400); stoff.push(norm(h).slice(0, 4000));
      if (!gesehen.has(hk)) { gesehen.add(hk); auszuege.push(`### ${u}\n${h.slice(0, 1600)}`); }
      if (fl.has("price") && w.preise.length) vor.push(`Preis-Zeilen: ${w.preise.join(" | ")} [${u}]`);
    } else {
      const a = auszug(haupt(t), e); if (a) { stoff.push(norm(a)); const hk = norm(a).slice(0, 300); if (!gesehen.has(hk)) { gesehen.add(hk); auszuege.push(`### ${u} (Programmseite, Ausschnitt)\n${a}`); } }
      if (!a && art === "programm" && neu) qz.push(`- ${u} – Programmseite geändert, Event dort nicht gefunden`);
    }
    qz.push(`- ${u} – ${art === "event" ? "Eventseite" : "Programmseite"}, Kopie ok, Seite zuletzt geändert ${r.ge || "?"}${neu ? " (nach der letzten Prüfung)" : ""}`);
  }
  const fp = require("crypto").createHash("sha1").update(stoff.sort().join("|")).digest("hex").slice(0, 16);
  const alt = STAND[k]; STAND[k] = { fp, d: heute, fehlt: String(fehlt || "") };
  // ruhig = der für dieses Event relevante Text ist seit dem letzten Dossier gleich geblieben (oder es gibt gar keinen lesbaren Text)
  // und die letzte Prüfung ist höchstens 10 Tage her – dann bringt neues Lesen/Suchen nichts.
  const ruhig = chk && chk >= new Date(Date.now() - 10 * 864e5).toISOString().slice(0, 10) && alt && alt.fp === fp && alt.fehlt === String(fehlt || "");
  if (ruhig) { nRuhig++; patch.EV[k] = { chk: heute, srcChk: heute }; } else nNeu++;
  out.push(`## ${e.d} · ${e.title} · ${e.venue || "?"}\nSchlüssel: ${k}\nfehlt: ${fehlt} · zuletzt geprüft: ${chk || "nie"}${e.man ? " · man:1 (nur leere Felder ergänzen)" : ""}${(e.na || []).length ? " · früher erfolglos gesucht: " + e.na.join(",") : ""}\n` +
    (ruhig ? "URTEIL: KEINE NEUEN ANGABEN – der Text aller Quellen zu diesem Event ist seit dem letzten Dossier gleich. Nicht suchen, nicht lesen (chk steht schon in dossier-patch.json).\n" :
      `URTEIL: BEARBEITEN\nQuellen:\n${qz.join("\n") || "- keine bekannten Quellen"}\n${vor.length ? "Vorschläge (prüfen, dann übernehmen):\n- " + [...new Set(vor)].join("\n- ") + "\n" : "Vorschläge: keine aus festen Formaten\n"}${auszuege.length ? auszuege.slice(0, 3).join("\n\n") + "\n" : ""}`));
}
fs.writeFileSync(path.join(dir, "dossier.md"), `# Dossier ${path.basename(liste)} – ${heute}\n${nNeu} zu bearbeiten · ${nRuhig} ohne neue Angaben (übersprungen) · ${nWeg} nicht mehr vorhanden\n\n` + out.join("\n"));
for (const [k, v] of Object.entries(STAND)) if (v.d < new Date(Date.now() - 60 * 864e5).toISOString().slice(0, 10)) delete STAND[k];
fs.writeFileSync(path.join(dir, "dossier-stand.json"), JSON.stringify(STAND, null, 0).replace(/},"/g, '},\n"'));   // der Lauf kopiert sie beim Bericht ins Repo
fs.writeFileSync(path.join(dir, "dossier-patch.json"), JSON.stringify(patch, null, 1));
console.log(`Dossier: ${nNeu} zu bearbeiten, ${nRuhig} ohne neue Angaben, ${nWeg} nicht mehr vorhanden → ${path.join(dir, "dossier.md")} (${Math.round(fs.statSync(path.join(dir, "dossier.md")).size / 1024)} KB)`);
