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
  const buf = Buffer.from(await res.arrayBuffer());
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
  if (x1 < 0) return [W, H, 0, 0, W, H, ""];
  return [W, H, x0, y0, x1 + 1, y1 + 1, bg];
}

(async () => {
  const out = {}; let neu = 0, fehl = 0;
  for (const u of urls) {
    if (old[u]) { out[u] = old[u]; continue; }
    try { out[u] = await measure(u); neu++; } catch (e) { fehl++; console.log("nicht messbar:", u, String(e.message || e)); }
  }
  const keys = Object.keys(out).sort();
  const body = "// Automatisch erzeugt (.github/scripts/logos.js) – nicht bearbeiten.\nconst LOGOBOX={\n" + keys.map(k => JSON.stringify(k) + ":" + JSON.stringify(out[k])).join(",\n") + "\n};\n";
  fs.writeFileSync(outF, body);
  console.log(`${keys.length} Logos, ${neu} neu gemessen, ${fehl} nicht messbar.`);
})();
