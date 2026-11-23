// Sucht Vorschaubilder für Veranstalter ohne Logo: SoundCloud (oEmbed), Linktree, Instagram-Profilseite (nur öffentlich, ohne Login), Website og:image.
// Schreibt Kandidaten nach vbilder.json (nur Workflow-Artefakt, kein Commit).
const fs=require("fs"),path=require("path"),vm=require("vm");
const root=path.resolve(__dirname,"..","..");const c={};
vm.runInNewContext(fs.readFileSync(path.join(root,"events.js"),"utf8")+";this.CI=CI",c);
const UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36";
async function get(u){try{const ac=new AbortController();const t=setTimeout(()=>ac.abort(),15000);const r=await fetch(u,{signal:ac.signal,redirect:"follow",headers:{"user-agent":UA,"accept-language":"de,en"}});clearTimeout(t);const tx=await r.text();return {st:r.status,url:r.url,tx}}catch(e){return {st:0,err:String(e)}}}
const meta=(tx,p)=>{const m=tx.match(new RegExp(`<meta[^>]+(?:property|name)=["']${p}["'][^>]*content=["']([^"']+)`,"i"))||tx.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]*(?:property|name)=["']${p}["']`,"i"));return m?m[1].replace(/&amp;/g,"&"):""};
const handle=u=>{const m=(u||"").match(/instagram\.com\/([A-Za-z0-9_.]+)/);return m?m[1]:""};
async function sc(u){const r=await get("https://soundcloud.com/oembed?format=json&url="+encodeURIComponent(u));if(r.st!==200)return null;try{const j=JSON.parse(r.tx);return {src:"sc",page:u,img:(j.thumbnail_url||"").replace(/-t\d+x\d+/,"-t500x500"),name:j.author_name||j.title}}catch(e){return null}}
async function lt(h){const r=await get("https://linktr.ee/"+h);if(r.st!==200)return null;const img=meta(r.tx,"og:image"),t=meta(r.tx,"og:title");if(!img)return null;
  const links=[...new Set((r.tx.match(/https:\/\/(?:on\.)?soundcloud\.com\/[A-Za-z0-9_\-\/]+/g)||[]))].slice(0,5);return {src:"lt",page:"https://linktr.ee/"+h,img,name:t,links}}
async function ig(h){const r=await get("https://www.instagram.com/"+h+"/");const o={src:"ig",page:"https://www.instagram.com/"+h+"/",st:r.st,final:r.url};if(r.st===200){o.img=meta(r.tx,"og:image");o.name=meta(r.tx,"og:title");o.desc=meta(r.tx,"og:description");
  o.links=[...new Set((r.tx.match(/https?:\\?\/\\?\/(?:linktr\.ee|soundcloud\.com|on\.soundcloud\.com|lnk\.bio|beacons\.ai)[^"'\s\\<]*/g)||[]).map(x=>x.replace(/\\\//g,"/")))].slice(0,5)}return o}
async function web(u){const r=await get(u);if(r.st!==200)return null;const img=meta(r.tx,"og:image");return img?{src:"web",page:u,img,name:meta(r.tx,"og:title")||meta(r.tx,"og:site_name")}:null}
(async()=>{const out={};const ents=Object.entries(c.CI).filter(([k,v])=>!v.logo&&(v.ig||v.sc||v.web));
  for(const [k,v] of ents){const cand=[];
    if(v.sc){const x=await sc(v.sc);if(x)cand.push(x)}
    const h=handle(v.ig);
    if(h){const i=await ig(h);cand.push(i);for(const l of (i.links||[])){if(/linktr\.ee/.test(l)){const x=await lt(l.split("linktr.ee/")[1].split(/[/?#]/)[0]);if(x)cand.push(x)}else if(/soundcloud/.test(l)){const x=await sc(l);if(x){x.via="ig";cand.push(x)}}}
      if(!cand.some(x=>x.src==="lt")){const x=await lt(h);if(x){x.guess=1;cand.push(x)}}
      if(!v.sc){const x=await sc("https://soundcloud.com/"+h.replace(/\./g,"-"));if(x){x.guess=1;cand.push(x)}}}
    for(const x of cand.filter(x=>x.src==="lt"))for(const l of x.links||[]){if(!cand.some(y=>y.page===l)){const y=await sc(l);if(y){y.via="lt";cand.push(y)}}}
    if(v.web){const x=await web(v.web);if(x)cand.push(x)}
    out[k]={ig:v.ig,sc:v.sc,web:v.web,cand};process.stdout.write(".");await new Promise(r=>setTimeout(r,700))}
  fs.writeFileSync(path.join(root,"vbilder.json"),JSON.stringify(out,null,1));console.log("\n",Object.keys(out).length)})();
