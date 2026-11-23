// Für die automatischen Läufe: Abruf-Kopien holen und entpacken.
//   (Schlüssel in /tmp/abruf-key.pem oder ABRUF_KEY) node .github/scripts/abruf-holen.js            → letzter Voll-Abruf (Branch „abruf“) nach /tmp/abruf
//   node .github/scripts/abruf-holen.js https://a https://b …                       → diese Adressen jetzt frisch holen lassen (dauert 1–3 Min.)
// Ergebnis: /tmp/abruf/index.tsv (adresse, status, zeichen, datei, fehler), /tmp/abruf/seiten/*.txt, status.json
const { execSync: x } = require("child_process"), fs = require("fs"), path = require("path"), os = require("os");
const repo = "ravewien/rave.wien", ziel = process.env.ABRUF_ZIEL || "/tmp/abruf";
const sh = (c, o = {}) => x(c, { stdio: ["ignore", "pipe", "pipe"], encoding: "utf8", maxBuffer: 1 << 28, ...o });
let key = (process.env.ABRUF_KEY || "").replace(/\\n/g, "\n").trim();
if (!key) try { key = fs.readFileSync(process.env.ABRUF_KEY_DATEI || "/tmp/abruf-key.pem", "utf8").trim(); } catch (_) {}
if (!/BEGIN PRIVATE KEY/.test(key)) { console.error("Schlüssel fehlt: /tmp/abruf-key.pem anlegen (Inhalt steht im Auftrag des Laufs)"); process.exit(2); }
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "abr-")); fs.writeFileSync(path.join(tmp, "k.pem"), key + "\n", { mode: 0o600 });
const urls = process.argv.slice(2).filter(u => /^https?:\/\//.test(u));
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
      const [u, st, , f, err] = r.split("\t"); if (err || !f) continue;
      const alt = idx.get(u); if (alt && !alt.split("\t")[4]) continue;   // GitHub-Kopie ist gut → die bleibt
      const raw = fs.readFileSync(path.join(pz, "seiten", f), "utf8"); const cut = raw.indexOf("\n\n");
      const kopf = raw.slice(0, cut), body = raw.slice(cut + 2), typ = (kopf.match(/^TYP: (.*)$/m) || [])[1] || "";
      const txt = /json/.test(typ) ? body.slice(0, 600000) : text(body, u);
      const fn = "pi_" + f.replace(/\.html$/, ".txt");
      fs.writeFileSync(path.join(z, "seiten", fn), kopf.replace(/^TYP:.*\n?/m, "") + "\nQUELLE: Raspberry Pi (Heimanschluss)\n\n" + txt);
      idx.set(u, [u, st, txt.length, fn, ""].join("\t")); alt ? ersetzt++ : neu++;
    }
    fs.writeFileSync(path.join(z, "index.tsv"), head + "\n" + [...idx.values()].join("\n") + "\n");
    console.log(`Pi-Abruf (${pst.zeit}): ${ersetzt} gesperrte/fehlerhafte Seiten ersetzt, ${neu} zusätzliche`);
  } else console.log(`Pi-Abruf zu alt (${pst.zeit}) – nicht verwendet`);
} catch (e) { console.log("Pi-Abruf nicht verfügbar"); }
// Nachlade-Branch wird vom Workflow nach 2 Stunden automatisch gelöscht.
fs.rmSync(tmp, { recursive: true, force: true });
const st = JSON.parse(fs.readFileSync(path.join(z, "status.json"), "utf8"));
console.log(`entpackt nach ${z}: ${st.ok} Seiten ok, ${st.fehler} Fehler (Stand ${st.zeit})`);
