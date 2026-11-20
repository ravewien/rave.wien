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
// Nachlade-Branch wird vom Workflow nach 2 Stunden automatisch gelöscht.
fs.rmSync(tmp, { recursive: true, force: true });
const st = JSON.parse(fs.readFileSync(path.join(z, "status.json"), "utf8"));
console.log(`entpackt nach ${z}: ${st.ok} Seiten ok, ${st.fehler} Fehler (Stand ${st.zeit})`);
