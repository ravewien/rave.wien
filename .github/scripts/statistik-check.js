// Prüft die Statistik (stats.json) auf Rückgänge und listet kommende Events mit Lücken.
//   node .github/scripts/statistik-check.js [--liste eNN [--ab 25]]   (--ab: ab dem n-ten Event, für Folgelisten)
// Ausgabe: Vergleich „kommende Events“ heute vs. vor ~3 Tagen (Anteile in %), Warnungen,
// und mit --liste eine Sonderlauf-Liste .github/agent/listen/eNN.txt mit den Events der
// nächsten 28 Tage, denen Genres, Preis, Lineup, Flyer oder Ticketlink fehlen (höchstens 25).
const fs=require("fs"),path=require("path"),vm=require("vm");
const R=path.resolve(__dirname,"..","..");
const S=JSON.parse(fs.readFileSync(path.join(R,"stats.json"),"utf8"));
const snaps=S.snaps||[];const last=snaps[snaps.length-1];
const lim=new Date(new Date(last.t).getTime()-3*864e5).toISOString().slice(0,10);
const prev=[...snaps].reverse().find(s=>s.d<=lim)||snaps[0];
const pct=(r,k)=>r&&r.n?Math.round(100*(r[k]||0)/r.n):null;
const M={ev:["note","price","lineup","genres","flyer","tix"],art:["genres","links","bio","img"],col:["genres","txt","logo","web"],ven:["txt","web","logo"]};
const warn=[];const rows=[];
for(const [cat,ks] of Object.entries(M))for(const k of ks){const a=pct(last.r.up[cat],k),b=pct(prev.r.up[cat],k);if(a==null||b==null)continue;rows.push(`${cat}.${k}: ${b}% → ${a}%`);
  if(a<=b-3)warn.push(`${cat}.${k} gesunken: ${b}% → ${a}% (seit ${prev.d})`)}
const evUp=last.r.up.ev;if(evUp&&evUp.n-(evUp.genres||0)>0)warn.push(`${evUp.n-(evUp.genres||0)} kommende Events ohne Genres`);
console.log(`Vergleich kommende Events/Profile: ${prev.d} → ${last.d}\n`+rows.join("\n"));
console.log(warn.length?"WARNUNGEN:\n- "+warn.join("\n- "):"Keine Rückgänge.");
const i=process.argv.indexOf("--liste");
if(i>0){const id=process.argv[i+1];if(!/^e\d\d$/.test(id||"")){console.error("--liste braucht eine id wie e17");process.exit(1)}
  const c={};vm.runInNewContext(fs.readFileSync(path.join(R,"events.js"),"utf8").replace(/^(const|let) /gm,"var "),c);
  const today=new Date().toLocaleDateString("sv-SE",{timeZone:"Europe/Vienna"});const end=new Date(Date.now()+28*864e5).toISOString().slice(0,10);
  const slug=t=>String(t).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/ß/g,"ss").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
  const out=[];for(const e of c.RAW){if(e.d<today||e.d>end)continue;const f=[];
    if(!(e.genres&&e.genres.length))f.push("genres");if(!e.price)f.push("price");if(!(e.floors||[]).some(x=>(x.a||[]).some(a=>a&&a!=="TBA")))f.push("lineup");if(!e.flyer)f.push("flyer");if(!e.tickets&&!/frei|spende|free/i.test(e.price||""))f.push("tickets");
    if(!f.length)continue;out.push([(e.d+"-"+slug(e.title)).slice(0,60).replace(/-$/,""),e.d,e.venue||"",e.title,f.join(","),e.chk||"",(e.src||[]).map(s=>s[1]).slice(0,4).join(" ")].join("\t"))}
  const off=+(process.argv[process.argv.indexOf("--ab")+1]||0)*(process.argv.includes("--ab")?1:0);const L=out.slice(off,off+25);console.log("Lücken gesamt: "+out.length);fs.writeFileSync(path.join(R,".github/agent/listen",id+".txt"),`# Sonderlauf Events – Liste ${id} (${L.length}) – automatisch aus der Statistik-Kontrolle. Format: Schlüssel<TAB>Datum<TAB>Location<TAB>Titel<TAB>fehlt<TAB>zuletzt geprüft<TAB>Quellen\n`+L.join("\n")+"\n");
  console.log(`Liste ${id}: ${L.length} Events geschrieben`)}
