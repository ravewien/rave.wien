// HTML → lesbarer Text (gemeinsam für den Abrufdienst auf GitHub und die Pi-Kopien in abruf-holen.js)
const ent = s => s.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#0*39;|&apos;/g, "'")
  .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n)).replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)));
const abs = (u, base) => { try { return new URL(ent(u), base).toString(); } catch (_) { return u; } };
function text(html, base) {
  const meta = [];
  const t = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1]; if (t) meta.push("TITEL: " + ent(t).trim());
  for (const m of html.matchAll(/<meta[^>]+(?:property|name)=["'](og:image|og:title|og:description|description|twitter:image)["'][^>]*>/gi)) {
    const c = (m[0].match(/content=["']([^"']*)["']/i) || [])[1]; if (c) meta.push(m[1].toUpperCase() + ": " + (/image/.test(m[1]) ? abs(c, base) : ent(c)));
  }
  const ld = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map(m => m[1].trim()).filter(Boolean);
  const nd = (html.match(/<script[^>]+id=["']__NEXT_DATA__["'][^>]*>([\s\S]*?)<\/script>/i) || [])[1];
  let b = html.replace(/<(script|style|noscript|svg|template|iframe)[\s\S]*?<\/\1>/gi, " ").replace(/<!--[\s\S]*?-->/g, " ");
  b = b.replace(/<img[^>]*>/gi, m => { const s = (m.match(/\s(?:data-src|src)=["']([^"']+)["']/i) || [])[1]; const a = (m.match(/\salt=["']([^"']*)["']/i) || [])[1]; return s ? ` [Bild${a ? ": " + ent(a) : ""} ${abs(s, base)}] ` : " "; });
  b = b.replace(/<a\s[^>]*href=["']([^"'#][^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi, (_, h, x) => { const tx = x.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(); const u = abs(h, base); return tx ? ` ${tx} \u0001${u}\u0002 ` : ` \u0001${u}\u0002 `; });
  b = b.replace(/<(br|\/p|\/div|\/li|\/h\d|\/tr|\/section|\/article|\/header|\/footer|li|h\d|tr)[^>]*>/gi, "\n").replace(/<(td|th)[^>]*>/gi, " | ").replace(/<[^>]+>/g, " ");
  b = ent(b).split("\n").map(l => l.replace(/[ \t]+/g, " ").trim()).filter(Boolean).join("\n");
  b = b.replace(/\u0001/g, "<").replace(/\u0002/g, ">");
  let o = meta.join("\n") + "\n\n" + b;
  if (ld.length) o += "\n\n--- JSON-LD ---\n" + ld.join("\n").slice(0, 120000);
  if (nd) o += "\n\n--- __NEXT_DATA__ ---\n" + nd.slice(0, 400000);
  return o.slice(0, 600000);
}

module.exports = { text, ent, abs };
