// Ermittelt Koordinaten für Locations ohne Eintrag in VG (events.js) über Nominatim (OpenStreetMap)
// und schreibt sie nach geo.js: GEO2[Venue] = [lat, lon]. Höchstens 1 Anfrage pro Sekunde.
const fs = require("fs"), path = require("path"), vm = require("vm");
const root = path.resolve(__dirname, "..", "..");
const c = {}; vm.runInNewContext(fs.readFileSync(path.join(root, "events.js"), "utf8") + ";this.V=V;this.VG=typeof VG!=='undefined'?VG:{};this.VI=typeof VI!=='undefined'?VI:{};", c);
const out = path.join(root, "geo.js");
let old = {}; try { const o = {}; vm.runInNewContext(fs.readFileSync(out, "utf8") + ";this.G=GEO2;", o); old = o.G || {}; } catch (_) {}
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const res = {}; let neu = 0, fehl = [];
  for (const [v, addr] of Object.entries(c.V)) {
    if (v === "TBA" || v === "Secret Location" || c.VG[v]) continue;
    if (old[v]) { res[v] = old[v]; continue; }
    const qs = [];
    if (addr && addr !== "Wien") qs.push(addr + ", Österreich");
    qs.push(v + ", Wien");
    let hit = null;
    for (const q of qs) {
      const u = "https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=at&q=" + encodeURIComponent(q);
      try { const r = await fetch(u, { headers: { "User-Agent": "rave.wien Eventkalender (github.com/ravewien/rave.wien)" } }); const j = await r.json(); if (j[0]) hit = [+(+j[0].lat).toFixed(5), +(+j[0].lon).toFixed(5)]; } catch (_) {}
      await sleep(1200);
      if (hit) break;
    }
    if (hit) { res[v] = hit; neu++; } else fehl.push(v);
  }
  const keys = Object.keys(res).sort();
  fs.writeFileSync(out, "// Automatisch erzeugt (.github/scripts/geocode.js, Daten © OpenStreetMap-Mitwirkende) – nicht bearbeiten.\nconst GEO2={\n" + keys.map(k => JSON.stringify(k) + ":" + JSON.stringify(res[k])).join(",\n") + "\n};\n");
  console.log(`${keys.length} Locations mit Koordinaten, ${neu} neu, nicht gefunden: ${fehl.join(", ") || "keine"}`);
})();
