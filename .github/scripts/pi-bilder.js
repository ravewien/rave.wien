// Übernimmt Instagram-Profilbilder, die der Raspberry Pi (ohne Anmeldung) heruntergeladen hat, als Vorschaubilder
// für Veranstalter ohne Bild. Bilder liegen danach auf rave.wien unter logos/ig/<handle>.jpg (keine Links zu Instagram-Servern).
//   node pi-bilder.js <ordner-mit-ig/>   → kopiert Bilder nach logos/ig/ und schreibt /tmp/pi-bilder-patch.json
const fs = require("fs"), path = require("path"), vm = require("vm");
const root = path.resolve(__dirname, "..", ".."), src = path.resolve(process.argv[2], "ig");
const c = {}; vm.runInNewContext(fs.readFileSync(path.join(root, "events.js"), "utf8") + ";this.CI=CI", c);
const hOf = v => ((v && v.ig || "").match(/instagram\.com\/([A-Za-z0-9_.]+)/) || [])[1] || "";
const patch = { CI: {} }; let n = 0;
fs.mkdirSync(path.join(root, "logos/ig"), { recursive: true });
for (const f of fs.existsSync(src) ? fs.readdirSync(src) : []) {
  const m = f.match(/^([A-Za-z0-9_.]+)\.jpg$/); if (!m) continue;
  const buf = fs.readFileSync(path.join(src, f)); if (buf.length < 1500 || buf[0] !== 0xff || buf[1] !== 0xd8) continue;   // nur echte JPEGs
  const names = Object.keys(c.CI).filter(k => !c.CI[k].logo && hOf(c.CI[k]).toLowerCase() === m[1].toLowerCase()); if (!names.length) continue;
  const ziel = path.join(root, "logos/ig", m[1].toLowerCase() + ".jpg"); fs.writeFileSync(ziel, buf);
  names.forEach(k => { patch.CI[k] = { logo: "https://rave.wien/logos/ig/" + m[1].toLowerCase() + ".jpg" }; n++; });
}
fs.writeFileSync("/tmp/pi-bilder-patch.json", JSON.stringify(patch));
console.log(n + " Veranstalter bekommen ein Vorschaubild");
