// Erzeugt stats.json: für jeden Daten-Commit eine Momentaufnahme.
// Pro Zeitraum (alle Events, 7/14/28 Tage, alle kommenden) und Kategorie
// (Events, Artists, Veranstalter, Locations): Anzahl, neu, Details, schon gesucht.
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
const vkey = v => fold(String(v).replace(/ (Wanne|Deck)$/, ""));
const has = x => x != null && x !== "" && !(Array.isArray(x) && !x.length) && !(typeof x === "object" && !Array.isArray(x) && !Object.values(x).some(v => v));
const addDays = (d, n) => { const t = new Date(d + "T12:00:00Z"); t.setUTCDate(t.getUTCDate() + n); return t.toISOString().slice(0, 10); };
const vday = iso => new Date(iso).toLocaleDateString("sv-SE", { timeZone: "Europe/Vienna" });

const RANGES = ["all", "d7", "d14", "d28", "up"];
const commits = sh("git log --reverse --format=%H%x09%cI -- events.js past.js").trim().split("\n").filter(Boolean).map(l => l.split("\t"));
const first = { ev: new Map(), art: new Map(), col: new Map(), ven: new Map() };
const mark = (m, k, d) => { if (!m.has(k)) m.set(k, d); };
const snaps = []; let firstDay = null;

for (const [sha, iso] of commits) {
  const ev = show(sha, "events.js"); if (!ev) continue;
  const c = {};
  try {
    vm.runInNewContext(ev + "\n;this.RAW=RAW;this.V=typeof V!=='undefined'?V:{};this.AR=typeof AR!=='undefined'?AR:{};this.CI=typeof CI!=='undefined'?CI:{};this.VI=typeof VI!=='undefined'?VI:{};", c);
  } catch (_) { continue; }
  const p = {}; const pj = show(sha, "past.js");
  try { if (pj) vm.runInNewContext(pj + "\n;this.PAST=PAST;", p); } catch (_) {}
  const RAW = c.RAW || [], PAST = p.PAST || [], AR = c.AR || {}, CI = c.CI || {}, V = c.V || {}, VI = c.VI || {};
  const day = vday(iso); if (!firstDay) firstDay = day;
  const ARf = {}, CIf = {}, VIf = {};
  Object.keys(AR).forEach(k => ARf[fold(k)] = AR[k]);
  Object.keys(CI).forEach(k => CIf[fold(k)] = CI[k]);
  Object.keys(VI).forEach(k => { const kk = vkey(k); VIf[kk] = Object.assign({}, VIf[kk] || {}, VI[k]); });
  Object.keys(V).filter(v => !skipV(v)).forEach(v => { if (!VIf[vkey(v)]) VIf[vkey(v)] = {}; });

  // einheitliche Event-Liste
  const E = [];
  RAW.forEach(e => E.push({ k: e.d + "|" + slug(e.title), d: e.d, venue: e.venue,
    arts: (e.floors || []).flatMap(f => (f.a || []).map(nm).flatMap(splitA)), cols: e.coll || [],
    note: !!(e.note && (e.note.de || e.note.en)), price: has(e.price), genres: has(e.genres), flyer: has(e.flyer),
    srch: has(e.chk) }));
  PAST.forEach(r => { const x = r[5] || {}; E.push({ k: r[0] + "|" + slug(r[2]), d: r[0], venue: r[1],
    arts: (r[4] || []).flatMap(splitA), cols: r[3] || [],
    note: !!(x.note && (x.note.de || x.note.en)), price: has(x.price), genres: false, flyer: false,
    srch: has(x.src) || !!x.lu }); });
  E.forEach(e => { e.lineup = e.arts.length > 0; mark(first.ev, e.k, day);
    e.arts.forEach(a => mark(first.art, fold(a), day)); e.cols.forEach(x => mark(first.col, fold(x), day));
    if (!skipV(e.venue)) mark(first.ven, vkey(e.venue), day); });
  Object.keys(AR).forEach(a => mark(first.art, fold(a), day));
  Object.keys(CI).forEach(x => mark(first.col, fold(x), day));
  Object.keys(VIf).forEach(v => mark(first.ven, v, day));

  const inR = { all: () => true, up: d => d >= day, d7: d => d >= day && d < addDays(day, 7), d14: d => d >= day && d < addDays(day, 14), d28: d => d >= day && d < addDays(day, 28) };
  const nw = (m, keys) => ({ newDay: keys.filter(k => m.get(k) === day && day !== firstDay).length, newSince: keys.filter(k => m.get(k) > firstDay).length });
  const R = {};
  for (const r of RANGES) {
    const es = E.filter(e => inR[r](e.d));
    const ak = [...new Set(es.flatMap(e => e.arts.map(fold)))];
    const ck = [...new Set(es.flatMap(e => e.cols.map(fold)))];
    const vk = r === "all" ? Object.keys(VIf) : [...new Set(es.filter(e => !skipV(e.venue)).map(e => vkey(e.venue)))];
    const A = ak.map(k => ARf[k] || {}), Cc = ck.map(k => CIf[k] || {}), Vv = vk.map(k => VIf[k] || {});
    const ek = [...new Set(es.map(e => e.k))];
    R[r] = {
      ev: Object.assign({ n: es.length, note: es.filter(e => e.note).length, price: es.filter(e => e.price).length, lineup: es.filter(e => e.lineup).length,
        genres: es.filter(e => e.genres).length, flyer: es.filter(e => e.flyer).length, srch: es.filter(e => e.srch).length }, nw(first.ev, ek)),
      art: Object.assign({ n: ak.length, links: A.filter(a => has(a.links)).length, img: A.filter(a => has(a.img)).length,
        bio: A.filter(a => a.bio && (a.bio.de || a.bio.en)).length, sets: A.filter(a => has(a.sets)).length,
        srch: A.filter(a => has(a.img) || has(a.noImg) || has(a.infoChk) || has(a.noLinks)).length }, nw(first.art, ak)),
      col: Object.assign({ n: ck.length, txt: Cc.filter(x => has(x.de) || has(x.en)).length, web: Cc.filter(x => has(x.web) || has(x.ig)).length,
        logo: Cc.filter(x => has(x.logo)).length, srch: Cc.filter(x => has(x.infoChk) || has(x.noLogo) || has(x.logo)).length }, nw(first.col, ck)),
      ven: Object.assign({ n: vk.length, txt: Vv.filter(x => has(x.de) || has(x.en)).length, io: Vv.filter(x => has(x.io)).length,
        logo: Vv.filter(x => has(x.logo)).length, srch: Vv.filter(x => has(x.infoChk) || has(x.noLogo) || has(x.logo)).length }, nw(first.ven, vk))
    };
  }
  snaps.push({ t: iso, d: day, r: R });
}
fs.writeFileSync(path.join(root, "stats.json"), JSON.stringify({ gen: new Date().toISOString(), first: firstDay, snaps }));
console.log(`${snaps.length} Momentaufnahmen geschrieben.`);
