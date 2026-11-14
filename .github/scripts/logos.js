// Misst für jedes Logo den tatsächlich genutzten Bildbereich (ohne transparenten
// oder einfarbigen Rand) und schreibt logos.js: LOGOBOX[url] = [B, H, x0, y0, x1, y1, Randfarbe].
// Die Seite zeigt Logos damit so groß wie möglich, ohne etwas abzuschneiden oder zu verzerren.
const fs = require("fs"), path = require("path"), vm = require("vm");
const sharp = require("sharp");
const root = path.resolve(__dirname, "..", "..");
const ctx = {};
vm.runInNewContext(fs.readFileSync(path.join(root, "events.js"), "utf8") + "\n;this.AR=typeof AR!=='undefined'?AR:{};this.CI=typeof CI!=='undefined'?CI:{};this.VI=typeof VI!=='undefined'?VI:{};", ctx);
const isLogo = u => /^https:\/\/[^"'<>\s]+\.(jpe?g|png|webp|gif|avif|svg)(\?[^"'<>\s]*)?$/i.test(u || "");
const urls = new Set();
[ctx.AR, ctx.CI, ctx.VI].forEach(o => Object.values(o || {}).forEach(x => x && isLogo(x.logo) && urls.add(x.logo)));

const outF = path.join(root, "logos.js");
let old = {};
try { const c = {}; vm.runInNewContext(fs.readFileSync(outF, "utf8") + "\n;this.L=LOGOBOX;", c); old = c.L || {}; } catch (_) {}

const hex = (r, g, b) => "#" + [r, g, b].map(v => v.toString(16).padStart(2, "0")).join("");
async function measure(u) {
  const ac = new AbortController(); const t = setTimeout(() => ac.abort(), 20000);
  const res = await fetch(u, { signal: ac.signal, headers: { "user-agent": "Mozilla/5.0 (rave.wien logo check)" } }); clearTimeout(t);
  if (!res.ok) throw new Error("HTTP " + res.status);
  if (+(res.headers.get("content-length") || 0) > 15e6) throw new Error("zu groß");
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length > 15e6) throw new Error("zu groß");
  let img = sharp(buf, { density: 150 }).ensureAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height, C = info.channels;
  const px = (x, y) => { const i = (y * W + x) * C; return [data[i], data[i + 1], data[i + 2], data[i + 3]]; };
  // 1) transparenter Rand
  let keep = p => p[3] > 16, bg = "";
  // 2) kein transparenter Rand: einfarbiger Rand (alle vier Ecken gleich und deckend)
  const cs = [px(0, 0), px(W - 1, 0), px(0, H - 1), px(W - 1, H - 1)];
  const near = (a, b, t) => Math.abs(a[0] - b[0]) <= t && Math.abs(a[1] - b[1]) <= t && Math.abs(a[2] - b[2]) <= t;
  if (cs.every(c => c[3] > 240) && cs.every(c => near(c, cs[0], 12))) {
    const c0 = cs[0]; keep = p => p[3] > 16 && !near(p, c0, 24); bg = hex(c0[0], c0[1], c0[2]);
  }
  let x0 = W, y0 = H, x1 = -1, y1 = -1;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (keep(px(x, y))) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  if (x1 < 0) return [W, H, 0, 0, W, H, "#000000"];
  // 3) transparenter Hintergrund: Schwarz oder Weiß – je nachdem, was mehr Kontrast zur Logofarbe hat
  if (!bg) {
    const lin = v => { v /= 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    let sw = 0, sb = 0, n = 0; const st = Math.max(1, Math.floor(Math.sqrt(((x1 - x0 + 1) * (y1 - y0 + 1)) / 40000)));
    for (let y = y0; y <= y1; y += st) for (let x = x0; x <= x1; x += st) {
      const p = px(x, y); if (p[3] <= 16) continue;
      const a = p[3] / 255, L = 0.2126 * lin(p[0]) + 0.7152 * lin(p[1]) + 0.0722 * lin(p[2]);
      sw += a * (1.05 / (L + 0.05)); sb += a * ((L + 0.05) / 0.05); n += a;
    }
    bg = n && sw > sb ? "#ffffff" : "#000000";
  }
  return [W, H, x0, y0, x1 + 1, y1 + 1, bg];
}

(async () => {
  const out = {}, tot = []; let neu = 0, fehl = 0;
  for (const u of urls) {
    if (old[u] && old[u][6]) { out[u] = old[u]; continue; }
    try { out[u] = await measure(u); neu++; } catch (e) { fehl++; if (old[u]) out[u] = old[u]; if (/HTTP 4\d\d/.test(String(e.message))) tot.push(u + "  (" + e.message + ")"); console.log("nicht messbar:", u, String(e.message || e)); }
  }
  const keys = Object.keys(out).sort();
  const body = "// Automatisch erzeugt (.github/scripts/logos.js) – nicht bearbeiten.\nconst LOGOBOX={\n" + keys.map(k => JSON.stringify(k) + ":" + JSON.stringify(out[k])).join(",\n") + "\n};\n";
  fs.writeFileSync(outF, body);
  // Kaputte Logo-Adressen für den Profil-Lauf (der sucht dann eine neue Adresse)
  fs.writeFileSync(path.join(root, "logos-kaputt.txt"), tot.length ? "# Logo-Adressen, die nicht mehr erreichbar sind – im Profil-Lauf ersetzen\n" + tot.join("\n") + "\n" : "");
  console.log(`${keys.length} Logos, ${neu} neu gemessen, ${fehl} nicht messbar.`);
})();
