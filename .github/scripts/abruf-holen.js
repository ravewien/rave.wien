// Für die automatischen Läufe: Abruf-Kopien holen und entpacken.
//   (Schlüssel in /tmp/abruf-key.pem oder ABRUF_KEY) node .github/scripts/abruf-holen.js            → letzter Voll-Abruf (Branch „abruf“) nach /tmp/abruf
//   node .github/scripts/abruf-holen.js https://a https://b …                       → diese Adressen jetzt frisch holen lassen (dauert 1–3 Min.)
//   node .github/scripts/abruf-holen.js --pi https://a https://b …   → Auftrag an den Raspberry Pi (Heimanschluss; für Seiten, die auf GitHub gesperrt sind). Kommt sofort zurück.
//   node .github/scripts/abruf-holen.js --pi-holen                   → fertige Pi-Aufträge dieses Laufs abholen (Pi braucht 10–20 Minuten) nach /tmp/abruf/nach-pi-<kennung>/
// Ergebnis: /tmp/abruf/index.tsv (adresse, status, zeichen, datei, fehler), /tmp/abruf/seiten/*.txt, status.json
const { execSync: x } = require("child_process"), fs = require("fs"), path = require("path"), os = require("os");
const repo = "ravewien/rave.wien", ziel = process.env.ABRUF_ZIEL || "/tmp/abruf";
const sh = (c, o = {}) => x(c, { stdio: ["ignore", "pipe", "pipe"], encoding: "utf8", maxBuffer: 1 << 28, ...o });
let key = (process.env.ABRUF_KEY || "").replace(/\\n/g, "\n").trim();
if (!key) try { key = fs.readFileSync(process.env.ABRUF_KEY_DATEI || "/tmp/abruf-key.pem", "utf8").trim(); } catch (_) {}
if (!/BEGIN PRIVATE KEY/.test(key)) { console.error("Schlüssel fehlt: /tmp/abruf-key.pem anlegen (Inhalt steht im Auftrag des Laufs)"); process.exit(2); }
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "abr-")); fs.writeFileSync(path.join(tmp, "k.pem"), key + "\n", { mode: 0o600 });
const urls = process.argv.slice(2).filter(u => /^https?:\/\//.test(u));
// ---------- Auftrags-Warteschlange für den Raspberry Pi (Branch abruf-auftrag, Datei auftraege.json)
const merk = path.join(ziel, "pi-auftraege.json");
const { text: zuText } = require("./abruf-text.js");
function piPaket(g, z) {   // Pi-Paket (rohes HTML) entpacken und in Text-Kopien umwandeln
  sh(`node ${path.join(__dirname, "abruf-krypt.js")} auf ${g}/abruf.enc ${tmp}/k.pem ${tmp}/pp.tgz`);
  const pz = fs.mkdtempSync(path.join(tmp, "pz-")); sh(`tar xzf ${tmp}/pp.tgz -C ${pz}`);
  fs.mkdirSync(path.join(z, "seiten"), { recursive: true }); const out = [];
  for (const r of fs.readFileSync(path.join(pz, "index.tsv"), "utf8").trim().split("\n").slice(1)) {
    const [u, st, , f, err] = r.split("\t"); if (err || !f) { out.push([u, st, 0, "", err || "leer"].join("\t")); continue; }
    const raw = fs.readFileSync(path.join(pz, "seiten", f), "utf8"); const cut = raw.indexOf("\n\n");
    const kopf = raw.slice(0, cut), body = raw.slice(cut + 2), typ = (kopf.match(/^TYP: (.*)$/m) || [])[1] || "";
    const txt = /json/.test(typ) ? body.slice(0, 600000) : zuText(body, u); const fn = "pi_" + f.replace(/\.html$/, ".txt");
    fs.writeFileSync(path.join(z, "seiten", fn), kopf.replace(/^TYP:.*\n?/m, "") + "\nQUELLE: Raspberry Pi (Heimanschluss)\n\n" + txt);
    out.push([u, st, txt.length, fn, ""].join("\t"));
  }
  fs.writeFileSync(path.join(z, "index.tsv"), "adresse\tstatus\tzeichen\tdatei\tfehler\n" + out.join("\n") + "\n");
  return out;
}
if (process.argv[2] === "--pi") {
  if (!urls.length) { console.error("--pi braucht Adressen"); process.exit(1); }
  let alter = Infinity; try { alter = Date.now() - Date.parse(JSON.parse(sh(`git -C ${path.join(__dirname, "..", "..")} ls-remote --exit-code https://github.com/${repo}.git refs/heads/abruf-pi >/dev/null && curl -fsSL https://raw.githubusercontent.com/${repo}/abruf-pi/status.json`)).zeit); } catch (_) {}
  if (!(alter < 48 * 3600e3)) { console.log("Der Raspberry Pi hat in den letzten 48 Stunden nichts geliefert – kein Auftrag angelegt (Pi aus oder noch nicht eingerichtet)."); process.exit(4); }
  const id = "n" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); const g = path.join(tmp, "q");
  let ok = false;
  for (let i = 0; i < 4 && !ok; i++) {
    fs.rmSync(g, { recursive: true, force: true });
    try { sh(`git clone -q --depth 1 -b abruf-auftrag https://github.com/${repo}.git ${g}`); } catch (_) { fs.mkdirSync(g); sh(`git init -q -b abruf-auftrag`, { cwd: g }); sh(`git remote add origin https://github.com/${repo}.git`, { cwd: g }); }
    let L = []; try { L = JSON.parse(fs.readFileSync(path.join(g, "auftraege.json"), "utf8")); } catch (_) {}
    L = L.filter(a => Date.now() - Date.parse(a.zeit) < 3 * 3600e3); L.push({ id, zeit: new Date().toISOString(), urls: urls.slice(0, 40) });
    fs.writeFileSync(path.join(g, "auftraege.json"), JSON.stringify(L, null, 1));
    try { sh(`git add -A && git -c user.name=ravewien -c user.email=ravewien@users.noreply.github.com commit -q -m "Auftrag ${id}" && git push -q origin HEAD:refs/heads/abruf-auftrag`, { cwd: g }); ok = true; } catch (_) { x("sleep 3"); }
  }
  if (!ok) { console.error("Auftrag konnte nicht abgelegt werden"); process.exit(3); }
  fs.mkdirSync(ziel, { recursive: true }); let M = []; try { M = JSON.parse(fs.readFileSync(merk, "utf8")); } catch (_) {}
  M.push({ id, zeit: Date.now(), n: Math.min(urls.length, 40) }); fs.writeFileSync(merk, JSON.stringify(M));
  console.log(`Auftrag ${id} an den Pi abgelegt (${Math.min(urls.length, 40)} Adressen). Der Pi liefert in 10–20 Minuten; abholen mit: node .github/scripts/abruf-holen.js --pi-holen`);
  fs.rmSync(tmp, { recursive: true, force: true }); process.exit(0);
}
if (process.argv[2] === "--pi-holen") {
  let M = []; try { M = JSON.parse(fs.readFileSync(merk, "utf8")); } catch (_) {}
  const offen = M.filter(a => !a.da); if (!offen.length) { console.log("Keine offenen Pi-Aufträge."); process.exit(0); }
  for (const a of offen) {
    const g = path.join(tmp, "p-" + a.id);
    try { sh(`git clone -q --depth 1 -b abruf-${a.id}-pi https://github.com/${repo}.git ${g}`); } catch (_) { console.log(`Auftrag ${a.id}: noch nicht fertig (${Math.round((Date.now() - a.zeit) / 60000)} Min. alt)`); continue; }
    const z = path.join(ziel, "nach-pi-" + a.id); const out = piPaket(g, z); a.da = 1;
    console.log(`Auftrag ${a.id}: ${out.filter(r => !r.split("\t")[4]).length} Seiten ok, ${out.filter(r => r.split("\t")[4]).length} Fehler → ${z}`);
  }
  fs.writeFileSync(merk, JSON.stringify(M)); fs.rmSync(tmp, { recursive: true, force: true }); process.exit(0);
}
let branch = "abruf";
if (urls.length) {
  const tag = "n" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  branch = "abruf-" + tag; const t0 = new Date(Date.now() - 5000).toISOString();
  sh(`gh api -X POST repos/${repo}/actions/workflows/abruf.yml/dispatches -f ref=main -f "inputs[tag]=${tag}" -f "inputs[urls]=${urls.join(" ").replace(/"/g, "")}"`);
  console.log("Abruf angestoßen, warte …");
  let ok = false;
  for (let i = 0; i < 60 && !ok; i++) {
    x("sleep 10");
    try { sh(`git ls-remote --exit-code https://github.com/${repo}.git refs/heads/${branch}`); ok = true; } catch (_) {}
    if (!ok && i > 3) { try { const r = JSON.parse(sh(`gh api "repos/${repo}/actions/workflows/abruf.yml/runs?event=workflow_dispatch&created=>${t0}&per_page=5"`)); if (r.workflow_runs.length && r.workflow_runs.every(w => w.status === "completed" && w.conclusion !== "success")) { console.error("Abruf-Workflow fehlgeschlagen"); process.exit(3); } } catch (_) {} }
  }
  if (!ok) { console.error("Zeitüberschreitung beim Abruf"); process.exit(3); }
}
const g = path.join(tmp, "g"); sh(`git clone -q --depth 1 -b ${branch} https://github.com/${repo}.git ${g}`);
sh(`node ${path.join(__dirname, "abruf-krypt.js")} auf ${g}/abruf.enc ${tmp}/k.pem ${tmp}/a.tgz`);
const z = urls.length ? path.join(ziel, "nach-" + branch.slice(6)) : ziel;
fs.mkdirSync(z, { recursive: true }); sh(`tar xzf ${tmp}/a.tgz -C ${z}`);
// Pi-Abruf (Raspberry Pi, Heimanschluss) dazunehmen: Seiten, die auf GitHub gesperrt/fehlerhaft waren, kommen vom Pi; nur-Pi-Adressen werden angehängt.
if (!urls.length) try {
  const gp = path.join(tmp, "pi"); sh(`git clone -q --depth 1 -b abruf-pi https://github.com/${repo}.git ${gp}`);
  const pst = JSON.parse(fs.readFileSync(path.join(gp, "status.json"), "utf8"));
  if (Date.now() - Date.parse(pst.zeit) < 36 * 3600e3) {
    sh(`node ${path.join(__dirname, "abruf-krypt.js")} auf ${gp}/abruf.enc ${tmp}/k.pem ${tmp}/p.tgz`);
    const pz = path.join(tmp, "pz"); fs.mkdirSync(pz); sh(`tar xzf ${tmp}/p.tgz -C ${pz}`);
    const { text } = require("./abruf-text.js");
    const rows = fs.readFileSync(path.join(z, "index.tsv"), "utf8").trim().split("\n"); const head = rows.shift();
    const idx = new Map(rows.map(r => [r.split("\t")[0], r]));
    let neu = 0, ersetzt = 0;
    for (const r of fs.readFileSync(path.join(pz, "index.tsv"), "utf8").trim().split("\n").slice(1)) {
      const [u, st, , f, err, ge] = r.split("\t"); if (err || !f) continue;
      const alt = idx.get(u); if (alt && !alt.split("\t")[4]) continue;   // GitHub-Kopie ist gut → die bleibt
      const raw = fs.readFileSync(path.join(pz, "seiten", f), "utf8"); const cut = raw.indexOf("\n\n");
      const kopf = raw.slice(0, cut), body = raw.slice(cut + 2), typ = (kopf.match(/^TYP: (.*)$/m) || [])[1] || "";
      const txt = /json/.test(typ) ? body.slice(0, 600000) : text(body, u);
      const fn = "pi_" + f.replace(/\.html$/, ".txt");
      fs.writeFileSync(path.join(z, "seiten", fn), kopf.replace(/^TYP:.*\n?/m, "") + "\nQUELLE: Raspberry Pi (Heimanschluss)\n\n" + txt);
      idx.set(u, [u, st, txt.length, fn, "", ge || ""].join("\t")); alt ? ersetzt++ : neu++;
    }
    fs.writeFileSync(path.join(z, "index.tsv"), head + "\n" + [...idx.values()].join("\n") + "\n");
    console.log(`Pi-Abruf (${pst.zeit}): ${ersetzt} gesperrte/fehlerhafte Seiten ersetzt, ${neu} zusätzliche`);
  } else console.log(`Pi-Abruf zu alt (${pst.zeit}) – nicht verwendet`);
} catch (e) { console.log("Pi-Abruf nicht verfügbar"); }
// Was ist neu? geaendert.tsv = Seiten, deren Text sich seit dem letzten Event-Update geändert hat (oder die neu sind).
if (!urls.length) try {
  const ber = path.join(__dirname, "..", "agent", "berichte");
  const letzt = (fs.existsSync(ber) ? fs.readdirSync(ber) : []).filter(f => /^\d{4}-\d{2}-\d{2}_\d{4}_event-update\.md$/.test(f)).sort().pop();
  const seit = process.env.ABRUF_SEIT || (letzt ? letzt.slice(0, 10) : "");   // Änderungen NACH diesem Tag zählen
  const rows = fs.readFileSync(path.join(z, "index.tsv"), "utf8").trim().split("\n").slice(1).map(r => r.split("\t"));
  const hatDatum = rows.some(r => r[5]);
  const neu = rows.filter(r => !r[4] && r[3] && (!hatDatum || !r[5] || !seit || r[5] > seit));
  fs.writeFileSync(path.join(z, "geaendert.tsv"), "adresse\tdatei\tgeaendert_am\tzeichen\n" + neu.map(r => [r[0], r[3], r[5] || "", r[2]].join("\t")).join("\n") + "\n");
  console.log(`Geändert/neu seit ${seit || "(unbekannt – alle)"}: ${neu.length} von ${rows.filter(r => !r[4]).length} Seiten → ${path.join(z, "geaendert.tsv")}`);
  console.log(sh(`node ${path.join(__dirname, "abruf-kandidaten.js")} ${z}`).trim());
} catch (e) { console.log("Änderungsliste/Kandidaten nicht erstellt: " + String(e.message || e).slice(0, 200)); }
// Nachlade-Branch wird vom Workflow nach 2 Stunden automatisch gelöscht.
fs.rmSync(tmp, { recursive: true, force: true });
const st = JSON.parse(fs.readFileSync(path.join(z, "status.json"), "utf8"));
console.log(`entpackt nach ${z}: ${st.ok} Seiten ok, ${st.fehler} Fehler (Stand ${st.zeit})`);
