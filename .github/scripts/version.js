// Schreibt ver.js: kurze Prüfsummen der Datendateien. Die Seite hängt sie als ?v=… an die Adressen,
// damit Browser die großen Dateien aus dem Cache nehmen, solange sich nichts geändert hat.
const fs = require("fs"), path = require("path"), crypto = require("crypto");
const root = path.resolve(__dirname, "..", "..");
const v = {};
for (const f of ["events.js", "past.js", "logos.js", "geo.js"]) {
  const p = path.join(root, f);
  if (fs.existsSync(p)) v[f] = crypto.createHash("sha256").update(fs.readFileSync(p)).digest("hex").slice(0, 12);
}
const out = "window.RWV=" + JSON.stringify(v) + ";\n", outF = path.join(root, "ver.js");
if (!fs.existsSync(outF) || fs.readFileSync(outF, "utf8") !== out) { fs.writeFileSync(outF, out); console.log("ver.js aktualisiert"); }
else console.log("ver.js unverändert");
