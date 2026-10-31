// Erzeugt stats.json: für jeden Daten-Commit eine Momentaufnahme
// (wie viele Events, Artists, Veranstalter, Locations bisher bekannt sind
// und wie vollständig ihre Infos sind). Grundlage für /statistik/.
const { execSync } = require("child_process");
const fs = require("fs"), path = require("path"), vm = require("vm");
const root = path.resolve(__dirname, "..", "..");
const sh = c => execSync(c, { cwd: root, encoding: "utf8", maxBuffer: 1 << 28 });
const show = (sha, f) => { try { return sh(`git show ${sha}:${f}`); } catch (_) { return ""; } };

const slug = t => String(t).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ß/g, "ss").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const nm = a => (String(a).includes("|") ? String(a).split("|")[1] : String(a)).trim();
const splitA = n => n.split(/\s+b2b\s+/i).map(x => x.trim()).filter(x => x && x !== "TBA");
const fold = s => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").trim();
const skipV = v => !v || v === "TBA" || v === "Secret Location";

const commits = sh("git log --reverse --format=%H%x09%cI -- events.js past.js").trim().split("\n").filter(Boolean).map(l => l.split("\t"));
const seen = { ev: new Set(), art: new Set(), col: new Set(), ven: new Set() };
const snaps = [];
for (const [sha, iso] of commits) {
  const ev = show(sha, "events.js"); if (!ev) continue;
  const c = {};
  try {
    vm.runInNewContext(ev + "\n;this.RAW=RAW;this.V=typeof V!=='undefined'?V:{};this.AR=typeof AR!=='undefined'?AR:{};this.CI=typeof CI!=='undefined'?CI:{};this.VI=typeof VI!=='undefined'?VI:{};", c);
  } catch (_) { continue; }
  const p = {}; const pj = show(sha, "past.js");
  try { if (pj) vm.runInNewContext(pj + "\n;this.PAST=PAST;", p); } catch (_) {}
  const RAW = c.RAW || [], PAST = p.PAST || [], AR = c.AR || {}, CI = c.CI || {}, V = c.V || {}, VI = c.VI || {};
  const day = iso.slice(0, 10);
  RAW.forEach(e => seen.ev.add(e.d + "|" + slug(e.title)));
  PAST.forEach(r => seen.ev.add(r[0] + "|" + slug(r[2])));
  const arts = new Set();
  RAW.forEach(e => (e.floors || []).forEach(f => (f.a || []).map(nm).flatMap(splitA).forEach(a => arts.add(fold(a)))));
  PAST.forEach(r => (r[4] || []).flatMap(splitA).forEach(a => arts.add(fold(a))));
  Object.keys(AR).forEach(a => arts.add(fold(a)));
  arts.forEach(a => seen.art.add(a));
  const cols = new Set();
  RAW.forEach(e => (e.coll || []).forEach(x => cols.add(fold(x))));
  PAST.forEach(r => (r[3] || []).forEach(x => cols.add(fold(x))));
  Object.keys(CI).forEach(x => cols.add(fold(x)));
  cols.forEach(x => seen.col.add(x));
  Object.keys(V).filter(v => !skipV(v)).forEach(v => seen.ven.add(fold(v.replace(/ (Wanne|Deck)$/, ""))));
  const up = RAW.filter(e => e.d >= day);
  const ARf = {}; Object.keys(AR).forEach(k => ARf[fold(k)] = AR[k]);
  const CIf = {}; Object.keys(CI).forEach(k => CIf[fold(k)] = CI[k]);
  const upArts = new Set(), upCols = new Set();
  RAW.filter(e => e.d >= day).forEach(e => { (e.floors || []).forEach(f => (f.a || []).map(nm).flatMap(splitA).forEach(a => upArts.add(fold(a)))); (e.coll || []).forEach(x => upCols.add(fold(x))); });
  const UA = [...upArts].map(a => ARf[a] || {}), UC = [...upCols].map(x => CIf[x] || {});
  const A = Object.values(AR), C = Object.values(CI), VV = Object.keys(V).filter(v => !skipV(v));
  const has = x => x != null && x !== "" && !(Array.isArray(x) && !x.length);
  snaps.push({
    t: iso, d: day,
    ev: { seen: seen.ev.size, up: up.length, past: PAST.length },
    art: { seen: seen.art.size, now: arts.size, ar: A.length,
      img: A.filter(a => has(a.img)).length,
      bio: A.filter(a => a.bio && (a.bio.de || a.bio.en)).length,
      links: A.filter(a => a.links && Object.values(a.links).some(has)).length,
      sets: A.filter(a => has(a.sets)).length,
      upN: UA.length, upImg: UA.filter(a => has(a.img)).length, upBio: UA.filter(a => a.bio && (a.bio.de || a.bio.en)).length,
      upLinks: UA.filter(a => a.links && Object.values(a.links).some(has)).length, upSrch: UA.filter(a => has(a.img) || has(a.noImg) || has(a.infoChk) || has(a.noLinks)).length, upSets: UA.filter(a => has(a.sets)).length },
    col: { seen: seen.col.size, now: cols.size, ci: C.length,
      txt: C.filter(x => has(x.de) || has(x.en)).length,
      logo: C.filter(x => has(x.logo)).length,
      web: C.filter(x => has(x.web) || has(x.ig)).length,
      upN: UC.length, upTxt: UC.filter(x => has(x.de) || has(x.en)).length, upLogo: UC.filter(x => has(x.logo)).length, upWeb: UC.filter(x => has(x.web) || has(x.ig)).length, upSrch: UC.filter(x => has(x.infoChk) || has(x.noLogo) || has(x.logo)).length },
    ven: { seen: seen.ven.size, now: VV.length,
      logo: VV.filter(v => VI[v] && has(VI[v].logo)).length,
      txt: VV.filter(v => VI[v] && (has(VI[v].de) || has(VI[v].en))).length,
      io: VV.filter(v => VI[v] && has(VI[v].io)).length, srch: VV.filter(v => VI[v] && (has(VI[v].logo) || has(VI[v].noLogo))).length },
    upq: { n: up.length,
      flyer: up.filter(e => has(e.flyer)).length,
      price: up.filter(e => has(e.price)).length,
      lineup: up.filter(e => (e.floors || []).some(f => (f.a || []).some(a => nm(a) !== "TBA"))).length,
      genres: up.filter(e => has(e.genres)).length,
      note: up.filter(e => e.note && (e.note.de || e.note.en)).length }
  });
}
const out = { gen: new Date().toISOString(), snaps };
fs.writeFileSync(path.join(root, "stats.json"), JSON.stringify(out));
console.log(`${snaps.length} Momentaufnahmen geschrieben.`);
