// Sucht mögliche Dubletten bei Veranstaltern, Locations und Artists (Namens-Kern, Präfix, Tippfehler, gleiche Instagram/Website/SoundCloud/Bild, Alias-Überschneidung).
// Nur Kandidaten – ob es wirklich derselbe ist, entscheidet der Monats-Cleanup (Duos/Kollektive teilen oft Profile!).
//   node .github/scripts/dubletten-suche.js [art]   (mit „art“ auch Artists, dauert ~1 Min.)
const fs=require("fs"),vm=require("vm");const c={};vm.runInNewContext(fs.readFileSync("events.js","utf8")+";this.CI=CI;this.KC=KC;this.CG=CG;this.RAW=RAW;this.AR=AR;this.VI=VI;this.V=V",c);vm.runInNewContext(fs.readFileSync("past.js","utf8").replace(/^const /gm,"this."),c);
const n=s=>String(s).toLowerCase().replace(/ø/g,"o").replace(/æ/g,"ae").replace(/ß/g,"ss").normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/&/g,"and").replace(/[^a-z0-9]/g,"");
const SUF=/(collective|kollektiv|records|recordings|events|event|crew|wien|vienna|vie|music|official|label|club|soundsystem|sound|productions|presents|pres|party|parties|rave|raves|ent|entertainment|nights|night|series|reihe|team|family|club|klub|kulturverein|verein|the)$/;
const PRE=/^(the|kollektiv|verein|club|klub|team)/;
const core=x=>{let s=n(x),p;do{p=s;s=s.replace(SUF,"").replace(PRE,"")}while(s!==p&&s.length>2);return s};
const handle=u=>((u||"").match(/instagram\.com\/([A-Za-z0-9_.]+)/)||[])[1]?.toLowerCase().replace(/[._]/g,"")||"";
const host=u=>{try{return new URL(u).hostname.replace(/^www\./,"")+new URL(u).pathname.replace(/\/$/,"").toLowerCase()}catch(e){return ""}};
function lev(a,b){if(a===b)return 0;const m=a.length,k=b.length;if(!m||!k)return m||k;let p=[...Array(k+1).keys()];for(let i=1;i<=m;i++){const q=[i];for(let j=1;j<=k;j++)q[j]=Math.min(p[j]+1,q[j-1]+1,p[j-1]+(a[i-1]===b[j-1]?0:1));p=q}return p[k]}
function scan(label,names,info,keysFn){
 const out=[];const L=[...new Set(names)];
 for(let i=0;i<L.length;i++)for(let j=i+1;j<L.length;j++){const a=L[i],b=L[j];const A=info[a]||{},Bb=info[b]||{};
  const why=[];const ca=core(a),cb=core(b),na=n(a),nb=n(b);
  if(ca.length>=2&&ca===cb)why.push("kern");
  else if(Math.min(na.length,nb.length)>=5&&(na.startsWith(nb)||nb.startsWith(na)))why.push("präfix");
  else if(Math.min(ca.length,cb.length)>=6&&lev(ca,cb)<=1)why.push("tippfehler");
  for(const f of keysFn){const x=f(A),y=f(Bb);if(x&&y&&x===y)why.push("gleich:"+f.name)}
  if((A.alias||[]).some(x=>n(x)===nb)||(Bb.alias||[]).some(x=>n(x)===na))why.push("alias!");
  if(why.length)out.push([a,b,why.join(",")])}
 console.log("### "+label+" "+out.length);out.forEach(r=>console.log(r.join("  |  ")))}
const ig=v=>handle(v.ig||(v.links||{}).ig),web=v=>host(v.web||(v.links||{}).web),sc=v=>host(v.sc||(v.links||{}).sc),logo=v=>v.logo||v.img||"";
Object.defineProperty(ig,"name",{value:"ig"});Object.defineProperty(web,"name",{value:"web"});Object.defineProperty(sc,"name",{value:"sc"});Object.defineProperty(logo,"name",{value:"bild"});
const collNames=[...Object.keys(c.CI),...c.KC,...c.RAW.flatMap(e=>e.coll||[]),...c.PAST.flatMap(p=>Array.isArray(p[3])?p[3]:[])];
scan("VERANSTALTER",collNames,c.CI,[ig,web,sc,logo]);
scan("LOCATIONS",[...Object.keys(c.V),...Object.keys(c.VI)],c.VI,[ig,web,logo]);
if(process.argv[2]==="art"){const an=[...Object.keys(c.AR)];scan("ARTISTS",an,c.AR,[ig,sc,logo])}
