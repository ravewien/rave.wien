// Erzeugt abonnierbare Kalender (iCalendar/.ics):
//   cal/alle.ics · cal/v/<location>.ics · cal/c/<veranstalter>.ics · cal/a/<artist>.ics
// Kalender-Apps holen die Datei regelmäßig neu – neue oder geänderte Events erscheinen von selbst.
const fs = require("fs"), path = require("path"), vm = require("vm");
const root = path.resolve(__dirname, "..", "..");
const ctx = {};
vm.runInNewContext(fs.readFileSync(path.join(root, "events.js"), "utf8") +
  "\n;this.RAW=RAW;this.V=V;this.AR=typeof AR!=='undefined'?AR:{};this.CI=typeof CI!=='undefined'?CI:{};this.VI=typeof VI!=='undefined'?VI:{};", ctx);
const { RAW, V, AR, CI, VI } = ctx;
const SITE = "https://rave.wien";
const slug = t => String(t).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ß/g, "ss").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const nm = a => (a.includes("|") ? a.split("|")[1] : a);
const splitA = n => n.split(/\s+b2b\s+/i).map(x => x.trim()).filter(Boolean);
// Aliase auf den Haupteintrag
const canon = (map) => { const m = {}; Object.keys(map).forEach(k => { m[k] = k; [].concat(map[k].alias || []).forEach(a => { if (!map[a]) m[a] = k; }); }); return n => m[n] || n; };
const cA = canon(AR), cC = canon(CI), cV = canon(VI);

// ---- iCalendar-Hilfen ----
const escT = s => String(s || "").replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
const fold = line => { const b = Buffer.from(line, "utf8"); if (b.length <= 74) return line; const out = []; let cur = ""; for (const ch of line) { if (Buffer.byteLength(cur + ch) > 73) { out.push(cur); cur = " " + ch; } else cur += ch; } out.push(cur); return out.join("\r\n"); };
const dt = (d, t) => d.replace(/-/g, "") + "T" + t.replace(":", "") + "00";
const addDay = (d, n) => { const x = new Date(d + "T12:00:00Z"); x.setUTCDate(x.getUTCDate() + n); return x.toISOString().slice(0, 10); };
const addH = (d, t, h) => { const [H, M] = t.split(":").map(Number); let m = H * 60 + M + h * 60, dd = d; while (m >= 1440) { m -= 1440; dd = addDay(dd, 1); } return [dd, String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0")]; };
const VTZ = ["BEGIN:VTIMEZONE", "TZID:Europe/Vienna", "BEGIN:DAYLIGHT", "TZOFFSETFROM:+0100", "TZOFFSETTO:+0200", "TZNAME:CEST", "DTSTART:19700329T020000", "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU", "END:DAYLIGHT", "BEGIN:STANDARD", "TZOFFSETFROM:+0200", "TZOFFSETTO:+0100", "TZNAME:CET", "DTSTART:19701025T030000", "RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU", "END:STANDARD", "END:VTIMEZONE"];

// ---- Events aufbereiten (gleiche ID-Bildung wie index.html / Vorschauseiten) ----
const from = addDay(new Date().toISOString().slice(0, 10), -14);
const seen = new Set();
const EVS = [];
RAW.slice().sort((a, b) => (a.d + (a.s || "99")).localeCompare(b.d + (b.s || "99"))).forEach(e => {
  let id = (e.d + "-" + slug(e.title)).slice(0, 60).replace(/-$/, ""), k = id, i = 2;
  while (seen.has(k)) k = id + "-" + i++;
  seen.add(k);
  if (e.d < from || e.cancel) return;
  const floors = (e.floors || []).map(f => ({ f: f.f || "", a: [...new Set((f.a || []).map(nm).flatMap(splitA).filter(a => a !== "TBA"))] }));
  const arts = [...new Set(floors.flatMap(f => f.a))];
  const venue = e.venue && e.venue !== "TBA" && e.venue !== "Secret Location" ? e.venue : "";
  const lines = [];
  floors.forEach(f => { if (f.a.length) lines.push((floors.length > 1 && f.f ? f.f + ": " : "") + f.a.join(", ")); });
  if (e.coll && e.coll.length) lines.push("Veranstalter: " + e.coll.join(", "));
  if (e.price) lines.push(/^eintritt/i.test(e.price) ? e.price : "Eintritt: " + e.price);
  if (e.note && (e.note.de || e.note.en)) lines.push("", (e.note.de || e.note.en).replace(/\s+/g, " "));
  lines.push("", `${SITE}/e/${k}`);
  const ev = ["BEGIN:VEVENT", `UID:${k}@rave.wien`, `DTSTAMP:${e.d.replace(/-/g, "")}T000000Z`];
  if (e.s) {
    let ed, et;
    if (e.e) { et = e.e; ed = e.e <= e.s ? addDay(e.d, 1) : e.d; } else [ed, et] = addH(e.d, e.s, 5);
    ev.push(`DTSTART;TZID=Europe/Vienna:${dt(e.d, e.s)}`, `DTEND;TZID=Europe/Vienna:${dt(ed, et)}`);
  } else ev.push(`DTSTART;VALUE=DATE:${e.d.replace(/-/g, "")}`, `DTEND;VALUE=DATE:${addDay(e.d, 1).replace(/-/g, "")}`);
  ev.push(`SUMMARY:${escT(e.title)}`);
  if (venue) ev.push(`LOCATION:${escT(venue + (V[venue] && V[venue] !== "Wien" ? ", " + V[venue] + " Wien" : ", Wien"))}`);
  ev.push(`DESCRIPTION:${escT(lines.join("\n"))}`, `URL:${SITE}/e/${k}`, "END:VEVENT");
  EVS.push({ ev, venue: venue ? cV(venue) : "", colls: (e.coll || []).map(cC), arts: arts.map(cA) });
});

const cal = (name, list) => ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//rave.wien//Kalender//DE", "CALSCALE:GREGORIAN", "METHOD:PUBLISH",
  `X-WR-CALNAME:${escT(name)}`, "X-WR-TIMEZONE:Europe/Vienna", `X-WR-CALDESC:${escT("Termine von rave.wien – aktualisiert sich automatisch")}`,
  "REFRESH-INTERVAL;VALUE=DURATION:PT6H", "X-PUBLISHED-TTL:PT6H", ...VTZ, ...list.flatMap(x => x.ev), "END:VCALENDAR"].map(fold).join("\r\n") + "\r\n";

const out = new Map();
out.set("cal/alle.ics", cal("rave.wien – alle Events", EVS));
// Alle bekannten Namen bekommen einen Kalender (auch ohne aktuelle Termine – er füllt sich, sobald etwas kommt)
const vNames = new Set(Object.keys(V).filter(v => v !== "TBA" && v !== "Secret Location").map(cV));
const cNames = new Set([...Object.keys(CI), ...RAW.flatMap(e => e.coll || [])].map(cC));
const aNames = new Set([...Object.keys(AR), ...RAW.flatMap(e => (e.floors || []).flatMap(f => (f.a || []).map(nm).flatMap(splitA)))].filter(a => a && a !== "TBA").map(cA));
vNames.forEach(n => out.set(`cal/v/${slug(n)}.ics`, cal(`${n} · rave.wien`, EVS.filter(x => x.venue === n))));
cNames.forEach(n => out.set(`cal/c/${slug(n)}.ics`, cal(`${n} · rave.wien`, EVS.filter(x => x.colls.includes(n)))));
aNames.forEach(n => out.set(`cal/a/${slug(n)}.ics`, cal(`${n} · rave.wien`, EVS.filter(x => x.arts.includes(n)))));

let changed = 0;
for (const [rel, txt] of out) {
  if (!slug(path.basename(rel, ".ics"))) continue;
  const f = path.join(root, rel); fs.mkdirSync(path.dirname(f), { recursive: true });
  if (!fs.existsSync(f) || fs.readFileSync(f, "utf8") !== txt) { fs.writeFileSync(f, txt); changed++; }
}
console.log(`${out.size} Kalender, ${changed} neu oder geändert, ${EVS.length} Events.`);
