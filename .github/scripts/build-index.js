// Baut die öffentliche index.html für rave.wien aus der Arbeitsfassung (Backend-Artifact):
//   node .github/scripts/build-index.js <arbeitsfassung.html> > index.html
// - setzt Kopf (Viewport, Beschreibung, Vorschau-Angaben, Icons)
// - entfernt den Bearbeitungsmodus und die Backend-Vorschau (gibt es nur im privaten Backend)
// - setzt eine strenge Content-Security-Policy: Es laufen nur die Skripte dieser Datei
//   (per SHA-256-Prüfsumme freigegeben) und die eigenen Dateien – kein Skript von fremden Servern.
//   Fremdes, eingeschleustes Skript wird vom Browser nicht ausgeführt.
const fs = require("fs"), crypto = require("crypto");
const src = process.argv[2];
if (!src) { console.error("Aufruf: build-index.js <arbeitsfassung.html>"); process.exit(1); }
let body = fs.readFileSync(src, "utf8");

const cut = (marker, name) => {
  const a = body.indexOf(marker);
  if (a < 0) { console.error(`Baustein nicht gefunden: ${name}`); process.exit(1); }
  const b = body.indexOf("</script>", a);
  if (b < 0) { console.error(`Ende nicht gefunden: ${name}`); process.exit(1); }
  body = body.slice(0, a) + body.slice(b + "</script>".length);
};
cut("<script>/* Backend-Vorschau", "Backend-Vorschau");
cut("<script>\n/* ===== Bearbeitungsmodus", "Bearbeitungsmodus");

if (!body.includes("<title>rave.wien</title>")) { console.error("Titel nicht gefunden"); process.exit(1); }
body = body.replace("<title>rave.wien</title>", "<title>rave.wien – Techno- &amp; Rave-Kalender Wien</title>");

const LD = `<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebSite","name":"rave.wien","alternateName":["rave wien","Rave Wien Kalender"],"url":"https://rave.wien/","inLanguage":["de-AT","en"],"description":"Kalender für Techno-, House- und Rave-Events in Wien mit Lineups, Timetables, Preisen, Locations, Kollektiven und Artists."}</script>`;

// Prüfsummen aller ausführbaren Inline-Skripte
const hashes = [];
const re = /<script(\s[^>]*)?>([\s\S]*?)<\/script>/g; let m;
while ((m = re.exec(body))) {
  const attrs = m[1] || "";
  if (/\bsrc\s*=/.test(attrs)) continue;                       // externe Datei – über 'self' erlaubt
  if (/type\s*=\s*["']?application\/(ld\+)?json/i.test(attrs)) continue; // Datenblock, wird nicht ausgeführt
  hashes.push("'sha256-" + crypto.createHash("sha256").update(m[2], "utf8").digest("base64") + "'");
}
if (!hashes.length) { console.error("Keine Skripte gefunden"); process.exit(1); }
if (/\son[a-z]+\s*=\s*["']/i.test(body.replace(/<script[\s\S]*?<\/script>/g, ""))) { console.error("Inline-Ereignisattribut (on…=) im HTML – mit der strengen CSP nicht erlaubt"); process.exit(1); }

const CSP = [
  "default-src 'self'",
  `script-src 'self' ${hashes.join(" ")}`,
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "img-src 'self' data: https:",
  "frame-src https://w.soundcloud.com https://www.mixcloud.com https://player-widget.mixcloud.com https://open.spotify.com",
  "connect-src 'self' https://ravedotwien.goatcounter.com",
  "object-src 'none'", "base-uri 'none'", "form-action 'none'",
].join("; ");

process.stdout.write(`<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta http-equiv="Content-Security-Policy" content="${CSP}">
<meta name="referrer" content="strict-origin-when-cross-origin">
<meta name="description" content="Alle Techno-, House- und Rave-Events in Wien auf einen Blick: Lineups, Timetables, Preise, Locations, Kollektive und Artists – täglich aktualisiert.">
<meta property="og:site_name" content="rave.wien">
<meta property="og:type" content="website">
<meta property="og:locale" content="de_AT">
<meta property="og:url" content="https://rave.wien/">
<meta property="og:title" content="rave.wien – Techno- & Rave-Kalender Wien">
<meta property="og:description" content="where to rave next? Alle Techno-, House- und Rave-Events in Wien – Lineups, Timetables, Preise und Locations.">
<meta property="og:image" content="https://rave.wien/og-square.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="1200">
<meta name="twitter:card" content="summary">
<meta name="twitter:image" content="https://rave.wien/og-square.png">
<link rel="canonical" href="https://rave.wien/">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
${LD}
${body}
</html>
`);
