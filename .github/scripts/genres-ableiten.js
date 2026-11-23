// Ergänzt fehlende Genres kommender Events aus den Profilen (Artists im Lineup: AR.genres,
// Veranstalter: CG; sonst typische Genres der Location) und markiert sie mit gAuto:1 („abgeleitet“, auf der Seite mit * gezeigt).
//   node .github/scripts/genres-ableiten.js [--dry]
// Ändert nur Events OHNE Genres (auch bei man:1 erlaubt, weil nur ein leeres Feld gefüllt wird).
const fs=require("fs"),path=require("path"),vm=require("vm");
const F=path.join(__dirname,"../../events.js");const dry=process.argv.includes("--dry");
let src=fs.readFileSync(F,"utf8");const c={};vm.runInNewContext(src.replace(/^(const|let) /gm,"var "),c);
const today=new Date().toLocaleDateString("sv-SE",{timeZone:"Europe/Vienna"});
const norm=s=>String(s||"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"");
const AK={};for(const [k,a] of Object.entries(c.AR||{})){AK[norm(k)]=a;for(const x of [].concat(a.alias||[]))AK[norm(x)]=AK[norm(x)]||a}
const CK={};for(const [k,g] of Object.entries(c.CG||{}))CK[norm(k)]=g;
// Ersatz: typische Genres der Location aus ihren anderen Events (nur wenn ≥3 Events mit Genres)
const VG={};for(const e of c.RAW||[]){if(!e.venue||!e.genres||!e.genres.length||e.gAuto)continue;const v=VG[e.venue]=VG[e.venue]||{n:0,g:{}};v.n++;for(const x of e.genres)v.g[x]=(v.g[x]||0)+1}
let n=0;const log=[];
const lines=src.split("\n");
for(let i=0;i<lines.length;i++){const L=lines[i];if(!/^\{"d":"\d{4}-\d{2}-\d{2}"/.test(L))continue;
  let e;try{e=JSON.parse(L.replace(/,\s*$/,""))}catch(_){continue}
  if(e.d<today||(e.genres&&e.genres.length))continue;
  const cnt={};const add=(g,w)=>{for(const x of g||[])cnt[x]=(cnt[x]||0)+w};
  for(const f of e.floors||[])for(const a0 of f.a||[]){const a=String(a0).split("|").pop().replace(/\s*\((live|dj set|b2b)\)\s*$/i,"").trim();const p=AK[norm(a)];if(p)add(p.genres,(e.head||[]).includes(a)?2:1)}
  for(const co of e.coll||[])add(CK[norm(co)],2);
  if(!Object.keys(cnt).length&&!/^(tba|secret|geheim)/i.test(e.venue||"")&&VG[e.venue]&&VG[e.venue].n>=3)for(const [x,k] of Object.entries(VG[e.venue].g))if(k/VG[e.venue].n>=0.4)cnt[x]=k; // nur klar typische Genres der Location
  const g=Object.entries(cnt).sort((x,y)=>y[1]-x[1]).slice(0,4).map(x=>x[0]);
  if(!g.length){log.push("ohne Ableitung: "+e.d+" "+e.title);continue}
  e.genres=g;e.gAuto=1;if(Array.isArray(e.na))e.na=e.na.filter(x=>x!=="genres");
  lines[i]=JSON.stringify(e)+(L.trim().endsWith(",")?",":"");n++;log.push("abgeleitet: "+e.d+" "+e.title+" → "+g.join(", "))}
if(!dry&&n)fs.writeFileSync(F,lines.join("\n"));
console.log(log.join("\n"));console.log(n+" Events mit abgeleiteten Genres"+(dry?" (Probelauf)":""));
