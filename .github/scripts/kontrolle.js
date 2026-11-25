// Lauf-Kontrolle als Skript (spart die KI): prüft Berichte, Commits, Workflows, Statistik, Pi und Dubletten,
// behebt das Mechanische selbst und gibt nur dann Aufgaben für die KI aus, wenn wirklich etwas zu tun ist.
//   node .github/scripts/kontrolle.js          → nur prüfen (nichts ändern)
//   node .github/scripts/kontrolle.js --fix    → prüfen, Genres ableiten, Veranstalter-Dubletten auflösen, Lücken-Listen anlegen,
//                                                 blockiert.md/_kontrolle.json führen, alte Berichte löschen – und alles committen/pushen
// Ausgabe (letzte Zeilen, für die KI):
//   AKTION <trigger_id> <Text>   → mit fire_trigger starten (Text als Zusatznachricht)
//   MELDUNG <Text>               → Abschluss-Nachricht an den Betreiber (eine Zeile pro Absatz)
//   PUSH <Text>                  → nur bei ⚠️: Push-Benachrichtigung mit diesem Text
const fs = require("fs"), path = require("path"), { execSync } = require("child_process");
const R = path.resolve(__dirname, "..", ".."), B = path.join(R, ".github/agent/berichte"), LI = path.join(R, ".github/agent/listen");
const FIX = process.argv.includes("--fix");
const sh = (c, o = {}) => execSync(c, { cwd: R, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], maxBuffer: 1 << 26, ...o });
const shq = c => { try { return sh(c); } catch (e) { return (e.stdout || "") + (e.stderr || ""); } };
const wien = d => new Date(d).toLocaleString("sv-SE", { timeZone: "Europe/Vienna" }).slice(0, 16);   // "JJJJ-MM-TT HH:MM"
const JETZT = wien(Date.now()), HEUTE = JETZT.slice(0, 10), UHR = JETZT.slice(11);
const T = { event: "trig_01PTmAUeDF3VBcVTTHXLZQoK", profil: "trig_01191Mw2tbPMh7dZE5F5ggvU", sonder: "trig_01LTFx5e9F2uepjVCL1Qp7ve" };
const NEUSTART = "Neustart durch die Lauf-Kontrolle: der vorige Lauf heute ist ausgefallen bzw. fand wegen blockierter Abrufe fast nichts. KEINE Unteragenten verwenden, alle Abrufe selbst im Hauptlauf.";
const aktion = [], warn = [], behoben = [], info = [];

// ---------- Stand
const KF = path.join(B, "_kontrolle.json");
let K = {}; try { K = JSON.parse(fs.readFileSync(KF, "utf8")); } catch (_) {}
const bis = K.bis || wien(Date.now() - 24 * 3600e3);
K.neustarts = K.neustarts || {}; K.sonderlaeufe = K.sonderlaeufe || {};
for (const o of [K.neustarts, K.sonderlaeufe]) for (const d of Object.keys(o)) if (d < wien(Date.now() - 7 * 864e5).slice(0, 10)) delete o[d];

// ---------- Berichte seit der letzten Kontrolle
const berichte = fs.readdirSync(B).filter(f => /^\d{4}-\d{2}-\d{2}_\d{4}_.+\.md$/.test(f));
const zeitVon = f => f.slice(0, 10) + " " + f.slice(11, 13) + ":" + f.slice(13, 15);
const kopf = f => { const t = fs.readFileSync(path.join(B, f), "utf8"); const o = { datei: f, text: t };
  for (const l of t.split("\n").slice(0, 15)) { const m = l.match(/^([a-z_]+):\s*(.*)$/); if (m) o[m[1]] = m[2].trim(); } return o; };
const neue = berichte.filter(f => zeitVon(f) > bis).map(kopf);
const heuteLauf = n => berichte.filter(f => f.startsWith(HEUTE) && f.includes("_" + n)).map(kopf);
const log = shq(`git log --since="26 hours ago" --format="%h|%ad|%an|%s" --date=format-local:"%Y-%m-%d %H:%M"`, { env: { ...process.env, TZ: "Europe/Vienna" } }).trim().split("\n").filter(Boolean).map(l => { const [h, d, a, ...s] = l.split("|"); return { h, d, a, s: s.join("|") }; });
const commitHeute = re => log.some(c => c.d.startsWith(HEUTE) && re.test(c.s));

// a) ausgefallen
for (const [lauf, ab, trig] of [["event-update", "09:00", T.event], ["profil-lauf", "15:30", T.profil]]) {
  if (UHR < ab) continue;
  const da = heuteLauf(lauf).length || (lauf === "event-update" ? commitHeute(/^Daten-Update \d{4}-\d{2}-\d{2}(?!.*(Genres abgeleitet|Laptop|Sonderlauf|Liste))/) : false);
  if (!da) { if (!(K.neustarts[HEUTE] || []).includes(lauf)) { aktion.push([trig, NEUSTART]); (K.neustarts[HEUTE] = K.neustarts[HEUTE] || []).push(lauf); behoben.push(`${lauf} heute ausgefallen – einmal neu gestartet`); }
    else warn.push(`${lauf}: heute ausgefallen, der Neustart hat auch nichts geliefert. Bitte im Verlauf der geplanten Aufgaben nachsehen.`); }
}
// b–d) Berichte auswerten
for (const r of neue) {
  const n = r.lauf || r.datei.slice(16, -3), p = (r.push || "").toLowerCase();
  if (r.push && !/^ok/.test(p)) warn.push(`${n} (${zeitVon(r.datei)}): Push nicht ok – „${r.push}“.`);
  if (/kein Schreibzugriff|Push abgelehnt|Prüfung fehlgeschlagen|zurückgenommen/i.test(r.text)) warn.push(`${n} (${zeitVon(r.datei)}): ${(r.text.match(/[^\n]*(kein Schreibzugriff|Push abgelehnt|Prüfung fehlgeschlagen|zurückgenommen)[^\n]*/i) || [""])[0].slice(0, 200)}`);
  if (/Artifact[^\n]{0,40}(Fehler|fehlgeschlagen|abgelehnt)/i.test(r.text) && !/Artifact ok/i.test(r.text)) info.push(`${n}: Artifact-Spiegel fehlgeschlagen (wird beim nächsten Lauf nachgeholt).`);
  const ok = parseInt(r.abrufe_ok) || 0, ab = parseInt(r.abrufe_abgelehnt) || 0;
  const freigabe = /Freigabe-Anfrage|PROVENANCE/i.test(r.text) || /^ja/i.test(r.unteragenten || "");
  if (freigabe && ok < 30 && /event-update|profil-lauf/.test(n)) {
    const lauf = /event/.test(n) ? "event-update" : "profil-lauf";
    if (!(K.neustarts[HEUTE] || []).includes(lauf)) { aktion.push([lauf === "event-update" ? T.event : T.profil, NEUSTART]); (K.neustarts[HEUTE] = K.neustarts[HEUTE] || []).push(lauf); behoben.push(`${lauf}: Abrufe hingen an Freigaben – neu gestartet`); }
    else warn.push(`${n}: Abrufe hingen an Freigabe-Anfragen (liegt an unserem Auftrag), Neustart half nicht.`);
  }
  if (/event-update/.test(n) && ok < 30 && !freigabe) warn.push(`${n}: nur ${ok} Seiten gelesen – ungewöhnlich wenig.`);
}
// e) Rücknahmen durch den Wächter
for (const c of log) if (/^Revert/.test(c.s)) warn.push(`Der Daten-Wächter hat einen Commit zurückgenommen: „${c.s}“ (${c.d}).`);
// f) Workflows
try {
  const runs = JSON.parse(sh(`gh api "repos/ravewien/rave.wien/actions/runs?per_page=40"`)).workflow_runs || [];
  const seit = Date.now() - 26 * 3600e3, letzte = {};
  for (const w of runs) { if (Date.parse(w.created_at) < seit) continue; if (!(w.name in letzte)) letzte[w.name] = w; }
  for (const [n, w] of Object.entries(letzte)) if (w.conclusion === "failure" && !/pages build/.test(n) || (/pages build/.test(n) && w.conclusion === "failure"))
    warn.push(`Workflow „${n}“ zuletzt fehlgeschlagen (${wien(w.created_at)}).`);
} catch (e) { info.push("Workflow-Status nicht abrufbar."); }
// Pi-Lebenszeichen
try {
  const st = JSON.parse(sh(`curl -fsSL "https://raw.githubusercontent.com/ravewien/rave.wien/abruf-pi/status.json?t=${Date.now()}"`));
  const alt = (Date.now() - Date.parse(st.zeit)) / 3600e3;
  if (st.zeit < "2001") info.push("Raspberry Pi: noch kein Abruf geliefert (Schlüssel bei GitHub eingetragen?).");
  else if (alt > 30) warn.push(`Raspberry Pi: letzter Abruf vor ${Math.round(alt)} Stunden (${wien(st.zeit)}). Pi aus, offline oder Programm hängt? Am Pi: ~/rave-insta/rave abruf`);
  else info.push(`Pi: ${st.ok}/${st.adressen} Seiten (${st.geaendert ?? "?"} geändert), ${st.ig_bilder ?? 0} Instagram-Bilder.`);
} catch (_) {}

// ---------- Statistik, Genres, Dubletten
const stat = shq("node .github/scripts/statistik-check.js");
const statWarn = (stat.split("WARNUNGEN:")[1] || "").split("\n").map(s => s.replace(/^- /, "").trim()).filter(Boolean);
const profRueck = statWarn.filter(w => /^(art|col|ven)\./.test(w));
const evWarn = statWarn.filter(w => !/^(art|col|ven)\./.test(w));
K.profilRueckgang = K.profilRueckgang || {};
for (const w of profRueck) { const k = w.split(" ")[0]; const t = K.profilRueckgang[k] || []; if (!t.includes(HEUTE)) t.push(HEUTE); K.profilRueckgang[k] = t.slice(-5);
  const drei = [0, 1, 2].every(i => t.includes(wien(Date.now() - i * 864e5).slice(0, 10))); if (drei) warn.push(`Profil-Statistik sinkt seit 3 Tagen: ${w}`); else info.push(`Profil-Statistik: ${w} (gleicht der Profil-Lauf aus)`); }
const commits = [];
const commitPush = (dateien, msg) => {
  sh(`git add ${dateien}`); if (!shq("git diff --cached --name-only").trim()) return false;
  sh(`git -c user.name=ravewien -c user.email=ravewien@users.noreply.github.com commit -q -m ${JSON.stringify(msg)}`);
  for (let i = 0; i < 3; i++) { try { sh("git push -q origin HEAD:main"); commits.push(msg); return true; } catch (_) { shq("git pull -q --rebase origin main"); } }
  warn.push(`Push abgelehnt: ${msg}`); return false;
};
const gen = shq("node .github/scripts/genres-ableiten.js --dry"); const gN = +((gen.match(/(\d+)\s+Events?/) || [])[1] || 0);
if (FIX && gN > 0) { shq("node .github/scripts/genres-ableiten.js"); if (!/Error/.test(shq("node --check events.js")) && commitPush("events.js", `Daten-Update ${HEUTE}: Genres abgeleitet (${gN})`)) behoben.push(`${gN} Genres abgeleitet`); }
const kan = shq("node .github/scripts/veranstalter-kanon.js --dry").trim();
if (!/^Keine Dubletten/.test(kan)) { const n = kan.split("\n").length;
  if (FIX) { shq("node .github/scripts/veranstalter-kanon.js"); if (commitPush("events.js past.js", `Daten-Update ${HEUTE}: Veranstalter-Dubletten aufgelöst (${n})`)) behoben.push(`Veranstalter-Dubletten aufgelöst (${n} Namen vereinheitlicht)`); }
  else info.push(`${n} Veranstalter-Namen zu vereinheitlichen (mit --fix)`); }

// Locations mit Events in den nächsten 14 Tagen, aber ohne Koordinaten (kein Wetter, kein Kartenpunkt)
try {
  const vm = require("vm"); const c = {}; vm.runInNewContext(fs.readFileSync(path.join(R, "events.js"), "utf8") + ";this.RAW=RAW;this.VG=typeof VG!=='undefined'?VG:{}", c);
  const g = {}; vm.runInNewContext(fs.readFileSync(path.join(R, "geo.js"), "utf8").replace(/^(const|let) /gm, "var "), g);
  const G = Object.assign({}, g.GEO2 || {}, c.VG || {}), bis14 = wien(Date.now() + 14 * 864e5).slice(0, 10);
  const ohne = [...new Set(c.RAW.filter(e => e.d >= HEUTE && e.d <= bis14 && e.venue && !G[e.venue] && !/TBA|Secret/i.test(e.venue)).map(e => e.venue))];
  if (ohne.length) warn.push(`Locations ohne Koordinaten (kein Wetter/Kartenpunkt): ${ohne.join(", ")} – in VG (events.js) eintragen.`);
} catch (_) {}

// ---------- Lücken-Listen
const heuteListen = K.sonderlaeufe[HEUTE] || [];
if (FIX && heuteListen.length < 3) {
  const schon = new Set(); for (const id of heuteListen) try { fs.readFileSync(path.join(LI, id + ".txt"), "utf8").split("\n").slice(1).forEach(l => l && schon.add(l.split("\t")[0])); } catch (_) {}
  const alle = []; for (let ab = 0; ab < 500; ab += 25) { const o = shq(`node .github/scripts/statistik-check.js --liste e99 --ab ${ab}`); let L = []; try { L = fs.readFileSync(path.join(LI, "e99.txt"), "utf8").split("\n").slice(1).filter(Boolean); } catch (_) {} alle.push(...L); if (L.length < 25) break; }
  try { fs.unlinkSync(path.join(LI, "e99.txt")); } catch (_) {}
  const offen = [...new Map(alle.map(l => [l.split("\t")[0], l])).values()].filter(l => !schon.has(l.split("\t")[0]));
  if (offen.length && (evWarn.length || !heuteListen.length)) {
    let nr = Math.max(0, ...fs.readdirSync(LI).map(f => +((f.match(/^e(\d+)\.txt$/) || [])[1] || 0)).filter(n => n < 99)); const neuL = [];
    for (let i = 0; i < offen.length && heuteListen.length + neuL.length < 3; i += 25) {
      const id = "e" + String(++nr).padStart(2, "0"), L = offen.slice(i, i + 25);
      fs.writeFileSync(path.join(LI, id + ".txt"), `# Sonderlauf Events – Liste ${id} (${L.length}) – automatisch aus der Lauf-Kontrolle. Format: Schlüssel<TAB>Datum<TAB>Location<TAB>Titel<TAB>fehlt<TAB>zuletzt geprüft<TAB>Quellen\n` + L.join("\n") + "\n");
      neuL.push(id);
    }
    if (neuL.length && commitPush(".github/agent/listen", `Statistik-Kontrolle: Listen ${neuL.join(", ")}`)) {
      neuL.forEach(id => aktion.push([T.sonder, `Events, Liste ${id} – Lücken aus der Statistik-Kontrolle (Genres, Preis, Lineup, Flyer, Ticketlink). Danach Artifact-Spiegel wie in der Anweisung.`]));
      K.sonderlaeufe[HEUTE] = [...heuteListen, ...neuL]; behoben.push(`Lücken-Sonderläufe ${neuL.join("/")} für ${Math.min(offen.length, neuL.length * 25)} Events gestartet`);
    }
  }
}

if (evWarn.length && !aktion.some(a => a[0] === T.sonder)) info.push("Statistik: " + evWarn.join("; ") + (heuteListen.length >= 3 ? " (heute schon 3 Lücken-Listen, morgen weiter)" : ""));

// ---------- blockiert.md aus dem heutigen Abruf (GitHub) führen, alte Berichte löschen
if (FIX) {
  try {
    const st = JSON.parse(sh(`curl -fsSL "https://raw.githubusercontent.com/ravewien/rave.wien/abruf/status.json?t=${Date.now()}"`));
    const BF = path.join(B, "blockiert.md"); const alt = fs.existsSync(BF) ? fs.readFileSync(BF, "utf8") : "";
    const zeilen = {}; for (const l of alt.split("\n")) { const c = l.split("|").map(s => s.trim()); if (c.length > 7 && /\./.test(c[1]) && !/Website/.test(c[1])) zeilen[c[1]] = c.slice(1, 8); }
    const tag = st.zeit.slice(0, 10);
    for (const [h0, v] of Object.entries(st.hosts || {})) { const h = h0.replace(/^(www|de)\./, ""); const z = zeilen[h];
      if (z) { if (z[3] !== tag) { z[3] = tag; z[4] = String((+z[4] || 0) + 1); } z[6] = (v.grund || [])[0] || z[6]; }
      else zeilen[h] = [h, "Website blockt", tag, tag, "1", "", (v.grund || [])[0] || ""]; }
    const grenze = wien(Date.now() - 14 * 864e5).slice(0, 10);
    const L = Object.values(zeilen).filter(z => z[3] >= grenze).sort((a, b) => (+b[4]) - (+a[4]) || a[0].localeCompare(b[0]));
    const kopfz = alt.split("\n| Website")[0].trim() || "# Geblockte Adressen";
    fs.writeFileSync(BF, kopfz + "\n\n| Website (Host) | Art (Freigabe / Website blockt) | zuerst gesehen | zuletzt gesehen | an wie vielen Tagen | Beispiel-Adresse | Fehlermeldung |\n|---|---|---|---|---|---|---|\n" + L.map(z => "| " + z.join(" | ") + " |").join("\n") + "\n");
    const lang = L.filter(z => +z[4] >= 3 && z[0] !== "ra.co").map(z => z[0]);
    if (lang.length) info.push(`Websites, die seit ≥3 Tagen blocken (Pi bzw. Laptop-Lauf): ${lang.slice(0, 8).join(", ")}${lang.length > 8 ? " …" : ""}`);
  } catch (_) {}
  const alt30 = wien(Date.now() - 30 * 864e5).slice(0, 10);
  berichte.filter(f => f.slice(0, 10) < alt30).forEach(f => fs.unlinkSync(path.join(B, f)));
  K.bis = JETZT; fs.writeFileSync(KF, JSON.stringify(K, null, 1) + "\n");
  commitPush(".github/agent/berichte", `Lauf-Kontrolle ${JETZT}`);
}

// ---------- Ausgabe
console.log(stat.trim());
console.log("\n--- Für die KI ---");
for (const [t, txt] of aktion) console.log(`AKTION ${t} ${txt}`);
const kurz = `${HEUTE} ${UHR}`;
if (warn.length) {
  console.log(`MELDUNG ⚠️ rave.wien Läufe (${kurz}):`); warn.forEach(w => console.log("MELDUNG - " + w));
  if (behoben.length) console.log("MELDUNG Selbst behoben: " + behoben.join("; ") + ".");
  info.forEach(i => console.log("MELDUNG (" + i + ")"));
  console.log("PUSH rave.wien: " + warn[0].slice(0, 120));
} else if (behoben.length) {
  console.log(`MELDUNG 🔧 rave.wien (${kurz}): ${behoben.join("; ")} – selbst behoben.` + (info.length ? " " + info.join(" ") : ""));
} else {
  console.log(`MELDUNG ✅ Läufe in Ordnung (${kurz}): ${neue.length} neue Berichte.` + (evWarn.length ? "" : " Statistik stabil.") + (info.length ? " " + info.join(" ") : ""));
}
