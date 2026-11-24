// Vorschaubilder für geteilte Event-Links (WhatsApp, Signal, Instagram …):
// lädt den Flyer jedes kommenden Events einmal herunter, verkleinert ihn (max. 1200 px, JPEG < 300 KB –
// WhatsApp zeigt größere oder langsam ladende Bilder oft gar nicht an) und legt ihn unter og/e/<id>.jpg ab.
// previews.js verwendet dann dieses Bild statt den Flyer von fremden Servern. Vergangene Events werden aufgeräumt.
const fs = require("fs"), path = require("path"), vm = require("vm");
const sharp = require("sharp");
const root = path.resolve(__dirname, "..", ".."), dir = path.join(root, "og", "e"), IDX = path.join(dir, "index.json");
const ctx = {}; vm.runInNewContext(fs.readFileSync(path.join(root, "events.js"), "utf8") + "\n;this.RAW=RAW;", ctx);
const slug = t => String(t).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ß/g, "ss").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const isImg = u => /^https:\/\/[^"'<>\s]+\.(jpe?g|png|webp|gif|avif)(\?[^"'<>\s]*)?$/i.test(u || "") || /^https:\/\/i\.scdn\.co\/image\/[a-z0-9]+$/i.test(u || "");
fs.mkdirSync(dir, { recursive: true });
let idx = {}; try { idx = JSON.parse(fs.readFileSync(IDX, "utf8")); } catch (_) {}
const ab = new Date(Date.now() - 2 * 864e5).toISOString().slice(0, 10);
// gleiche ID-Bildung wie previews.js / index.html
const seen = new Set(), job = [];
ctx.RAW.slice().sort((a, b) => (a.d + (a.s || "99")).localeCompare(b.d + (b.s || "99"))).forEach(e => {
  let id = (e.d + "-" + slug(e.title)).slice(0, 60).replace(/-$/, ""), k = id, i = 2;
  while (seen.has(k)) k = id + "-" + i++;
  seen.add(k);
  if (e.d >= ab && isImg(e.flyer)) job.push([k, e.flyer]);
});
(async () => {
  const neu = {}; let n = 0, f = 0;
  for (const [k, u] of job) {
    const ziel = path.join(dir, k + ".jpg");
    if (idx[k] === u && fs.existsSync(ziel)) { neu[k] = u; continue; }
    try {
      const ac = new AbortController(); const t = setTimeout(() => ac.abort(), 20000);
      const r = await fetch(u, { signal: ac.signal, headers: { "user-agent": "Mozilla/5.0 (compatible; rave.wien Vorschau)", accept: "image/*" } }); clearTimeout(t);
      if (!r.ok) throw new Error("HTTP " + r.status);
      const buf = Buffer.from(await r.arrayBuffer()); if (buf.length > 25e6) throw new Error("zu groß");
      let q = 80, out;
      do { out = await sharp(buf, { failOn: "none" }).rotate().resize({ width: 1200, height: 1200, fit: "inside", withoutEnlargement: true }).flatten({ background: "#0b0d10" }).jpeg({ quality: q, mozjpeg: true }).toBuffer(); q -= 10; } while (out.length > 300e3 && q >= 40);
      fs.writeFileSync(ziel, out); neu[k] = u; n++;
    } catch (err) { f++; console.log(`kein Vorschaubild ${k}: ${String(err.message || err).slice(0, 80)}`); if (idx[k] === u && fs.existsSync(ziel)) neu[k] = u; }
  }
  for (const d of fs.readdirSync(dir)) { const k = d.replace(/\.jpg$/, ""); if (d.endsWith(".jpg") && !neu[k]) fs.unlinkSync(path.join(dir, d)); }
  fs.writeFileSync(IDX, JSON.stringify(neu, null, 0));
  console.log(`Vorschaubilder: ${Object.keys(neu).length} (neu ${n}, Fehler ${f})`);
})();
