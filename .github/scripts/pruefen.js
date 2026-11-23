// Pflegt pruefen.js – Vorschläge der Läufe, die der Betreiber im Backend-Artifact („🔎 Prüfen“) bestätigt.
//   node .github/scripts/pruefen.js add <vorschlaege.json> [lauf]   – neue Punkte anhängen (Liste von Objekten, s. u.)
//   node .github/scripts/pruefen.js prune [<ordner>]                – entscheidet Punkte entfernen; <ordner> = out_dir eines
//        ArtifactData-„list“ der Sammlung „pruefen“ (JSON-Dateien je Entscheidung). Ohne Ordner: nur Punkte > 60 Tage löschen.
//   node .github/scripts/pruefen.js list                            – offene Punkte zeigen
// Punkt: {typ:"spotify|doppelt|lineup|loeschen|genre|ort|preis|link|bild|hinweis", titel, text,
//         links:["https://…"], vorschlag:{kind:"ev|art|col|ven", op:"edit|add|delete", key, title, data:{"links.sp":"https://…"}}}
// key wie im Bearbeitungsmodus: Event = (d+"-"+slug(title)).slice(0,60), Artist/Veranstalter/Location = Name.
// vorschlag weglassen = reiner Hinweis (Knopf „Erledigt“). id wird automatisch vergeben; gleiche id = kein Doppel.
const fs=require("fs"),path=require("path");
const F=path.join(__dirname,"../../pruefen.js");
const slug=t=>String(t||"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/ß/g,"ss").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
const load=()=>{try{const s=fs.readFileSync(F,"utf8");return JSON.parse(s.slice(s.indexOf("["),s.lastIndexOf("]")+1))}catch(_){return []}};
const save=l=>fs.writeFileSync(F,"// Vorschläge zum Prüfen im Backend (nur dort angezeigt). Gepflegt mit .github/scripts/pruefen.js\nwindow.PRUEF="+JSON.stringify(l,null,1)+";\n");
const today=new Date().toLocaleDateString("sv-SE",{timeZone:"Europe/Vienna"});
const ok=u=>typeof u==="string"&&/^https?:\/\//.test(u);
const [cmd,arg,lauf]=process.argv.slice(2);let L=load();
if(cmd==="add"){const neu=JSON.parse(fs.readFileSync(arg,"utf8"));let n=0;
  for(const p of neu){const v=p.vorschlag;
    if(v&&(!["ev","art","col","ven"].includes(v.kind)||!v.key)){console.error("übersprungen (vorschlag unvollständig):",p.titel);continue}
    if(v&&v.data&&Object.entries(v.data).some(([k,x])=>/^(links\.|tickets$|flyer$|img$)/.test(k)&&x&&!ok(x))){console.error("übersprungen (Link ohne https):",p.titel);continue}
    const id=(p.typ||"hinweis")+"-"+slug(v?v.kind+"-"+v.key+"-"+Object.keys(v.data||{}).join("-")+(v.op==="delete"?"-del":""):p.titel).slice(0,150);
    if(L.some(x=>x.id===id))continue;
    L.push({id,ts:today,lauf:lauf||p.lauf||"",typ:p.typ||"hinweis",titel:String(p.titel||"").slice(0,200),text:String(p.text||"").slice(0,1500),links:(p.links||[]).filter(ok).slice(0,5),...(v?{vorschlag:v}:{})});n++}
  save(L);console.log(n+" neu, "+L.length+" offen")}
else if(cmd==="prune"){const done=new Set();
  if(arg&&fs.existsSync(arg)){const walk=d=>fs.readdirSync(d,{withFileTypes:true}).forEach(e=>{const p=path.join(d,e.name);if(e.isDirectory())walk(p);else if(e.name.endsWith(".json"))done.add(e.name.slice(0,-5))});walk(arg)}
  const lim=new Date(Date.now()-60*864e5).toISOString().slice(0,10);const vor=L.length;
  L=L.filter(p=>!done.has(p.id)&&p.ts>=lim);save(L);console.log((vor-L.length)+" entfernt, "+L.length+" offen")}
else if(cmd==="list"){L.forEach(p=>console.log(p.id,"|",p.titel))}
else{console.error("Aufruf: pruefen.js add <datei.json> [lauf] | prune [ordner] | list");process.exit(1)}
