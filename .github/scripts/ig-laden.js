// Lädt Instagram-Profilbilder, deren Adressen der Laptop-Lauf in .github/agent/ig-bilder.json notiert hat
// ({"handle": "https://…cdninstagram.com/…jpg?…", …}), verkleinert sie (320 px, JPEG) und legt sie in <ziel>/ig/<handle>.jpg ab.
// Danach übernimmt pi-bilder.js sie als Vorschaubilder (logos/ig/, Feld logo). Erledigte Handles → .github/agent/ig-erledigt.json.
//   node .github/scripts/ig-laden.js <ziel-ordner>
const fs = require("fs"), path = require("path"), sharp = require("sharp");
const root = path.resolve(__dirname, "..", ".."), Q = path.join(root, ".github/agent/ig-bilder.json"), E = path.join(root, ".github/agent/ig-erledigt.json");
const ziel = path.resolve(process.argv[2] || "/tmp/igl", "ig"); fs.mkdirSync(ziel, { recursive: true });
let q = {}, erl = {}; try { q = JSON.parse(fs.readFileSync(Q, "utf8")); } catch (_) {} try { erl = JSON.parse(fs.readFileSync(E, "utf8")); } catch (_) {}
const heute = new Date().toISOString().slice(0, 10);
(async () => {
  let ok = 0, f = 0;
  for (const [h0, u] of Object.entries(q)) {
    const h = String(h0).replace(/[^A-Za-z0-9_.]/g, "");
    if (!h) continue;
    if (!u || !/^https:\/\/[^/]*(cdninstagram\.com|fbcdn\.net)\//.test(u)) { erl[h] = heute + " kein-bild"; continue; }
    try {
      const r = await fetch(u, { headers: { "user-agent": "Mozilla/5.0", accept: "image/*" } });
      if (!r.ok) throw new Error("HTTP " + r.status);
      const buf = Buffer.from(await r.arrayBuffer());
      const out = await sharp(buf).rotate().resize(320, 320, { fit: "cover" }).jpeg({ quality: 86, mozjpeg: true }).toBuffer();
      fs.writeFileSync(path.join(ziel, h + ".jpg"), out); erl[h] = heute; ok++;
    } catch (e) { f++; console.log(`${h}: ${e.message}`); erl[h] = heute + " fehler"; }
  }
  fs.writeFileSync(E, JSON.stringify(erl, null, 1) + "\n"); fs.writeFileSync(Q, "{}\n");
  console.log(`Instagram-Bilder geladen: ${ok}, Fehler: ${f}`);
})();
