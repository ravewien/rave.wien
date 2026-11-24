// Einmalig/bei Bedarf: Headliner (head) vergangener Events aus der Git-Geschichte von events.js zurückholen
// und in past.js als {head:[…]} ergänzen. Liest je Tag einen Stand von events.js (letzte N Tage).
//   node .github/scripts/headliner-nachtragen.js [tage=120] [--dry]
const fs = require("fs"), path = require("path"), vm = require("vm"), { execSync } = require("child_process");
const root = path.resolve(__dirname, "..", ".."), P = path.join(root, "past.js");
const tage = +(process.argv.find(a => /^\d+$/.test(a)) || 120), dry = process.argv.includes("--dry");
const norm = t => String(t || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]/g, "");
const log = execSync(`git log --since="${tage} days ago" --format="%H %ad" --date=short -- events.js`, { cwd: root, encoding: "utf8" }).trim().split("\n").filter(Boolean);
const proTag = {}; for (const l of log) { const [h, d] = l.split(" "); if (!proTag[d]) proTag[d] = h; }   // jüngster Stand je Tag
const head = {};   // "datum|titel" → Headliner
for (const h of Object.values(proTag)) {
  let src; try { src = execSync(`git show ${h}:events.js`, { cwd: root, encoding: "utf8", maxBuffer: 1 << 27 }); } catch (_) { continue; }
  const c = {}; try { vm.runInNewContext(src + ";this.RAW=RAW", c); } catch (_) { continue; }
  for (const e of c.RAW || []) if ((e.head || []).length) { const k = e.d + "|" + norm(e.title); if (!head[k]) head[k] = e.head.map(a => String(a).replace(/^\d{1,2}:\d{2}\|/, "")); }
}
let n = 0;
const out = fs.readFileSync(P, "utf8").split("\n").map(L => { const m = L.match(/^(\[.*\])(,?)\s*$/); if (!m) return L; let e; try { e = JSON.parse(m[1]); } catch (_) { return L; }
  const k = e[0] + "|" + norm(e[2]); const hd = head[k]; if (!hd) return L; const x = e[5] && typeof e[5] === "object" ? e[5] : {};
  if ((x.head || []).length) return L; x.head = hd.filter(a => (e[4] || []).includes(a) || true); e[5] = x; n++; return JSON.stringify(e) + m[2]; }).join("\n");
console.log(`${Object.keys(proTag).length} Stände gelesen, ${Object.keys(head).length} Events mit Headlinern gefunden, ${n} Archiv-Einträge ergänzt`);
if (!dry && n) fs.writeFileSync(P, out);
