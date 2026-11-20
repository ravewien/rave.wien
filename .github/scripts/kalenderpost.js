// Erzeugt den Instagram-Zwischenpost „Wusstest du schon..? – Artists & Veranstaltern im Kalender folgen“ (3 Bilder)
// mit aktuellen Screenshots der Seite und trägt ihn in ig/extras.json ein.
//   node .github/scripts/kalenderpost.js <kennung> <posten_ab ISO mit Zeitzone> [Veranstalter]
//   z. B. node .github/scripts/kalenderpost.js kalender2 2027-05-24T12:00:00+02:00
// Ohne Veranstalter: der mit Logo und den meisten kommenden Terminen. Braucht Playwright (in den Claude-Sitzungen vorhanden).
const {chromium}=require('playwright');const fs=require('fs');const path=require('path'),vm=require('vm');const R=path.resolve(__dirname,'..','..');const F=R+'/fonts/';
const html0=fs.readFileSync(R+'/index.html','utf8');
const DSEG=(html0.match(/@font-face\{font-family:"DSEG7";src:url\((data:font\/woff2;base64,[^)]*)\)/)||[])[1];
const f64=n=>'data:font/woff2;base64,'+fs.readFileSync(F+n).toString('base64');
const png=f=>'data:image/png;base64,'+fs.readFileSync(R+'/ig/astro/'+f).toString('base64');
const A1=png('1.png'),A2=png('2.png');
const CSS=`
@font-face{font-family:Doto;src:url(${f64('doto-latin-900-normal.woff2')});font-weight:900}
@font-face{font-family:BC;src:url(${f64('barlow-condensed-latin-700-normal.woff2')});font-weight:700}
@font-face{font-family:JB;src:url(${f64('jetbrains-mono-latin-700-normal.woff2')});font-weight:700}
@font-face{font-family:DSEG7;src:url(${DSEG})}
*{box-sizing:border-box;margin:0;padding:0}
body{width:1080px;height:1350px;background:#08090b;color:#e9ecf1;font-family:BC,sans-serif;overflow:hidden;position:relative}
.bg{position:absolute;inset:0;background:radial-gradient(900px 520px at 85% -8%,rgba(31,139,255,.22),transparent 70%),radial-gradient(700px 500px at -10% 105%,rgba(47,209,69,.10),transparent 70%)}
.bg.p{background:radial-gradient(900px 620px at 50% 108%,rgba(170,110,255,.25),transparent 70%),radial-gradient(700px 500px at 100% 0%,rgba(31,139,255,.16),transparent 70%)}
.bg.y{background:radial-gradient(900px 600px at 10% -5%,rgba(255,196,60,.16),transparent 70%),radial-gradient(800px 560px at 100% 105%,rgba(31,139,255,.2),transparent 70%)}
.grid{position:absolute;inset:0;background-image:radial-gradient(rgba(233,236,241,.07) 1.2px,transparent 1.3px);background-size:18px 18px}
.wrap{position:absolute;inset:0;padding:72px 72px 60px;display:flex;flex-direction:column}
.kick{font-family:JB;font-weight:700;font-size:24px;letter-spacing:.16em;color:#8f96a3;text-transform:uppercase}
.kick b{color:#1f8bff}
.h{font-family:Doto;font-weight:900;color:#fff;-webkit-text-stroke:2.4px #fff;line-height:.98;letter-spacing:-.01em;text-transform:uppercase}
.h em{font-style:normal;color:#1f8bff;-webkit-text-stroke-color:#1f8bff;text-shadow:0 0 26px rgba(31,139,255,.5)}
.h i{font-style:normal;color:#2fd145;-webkit-text-stroke-color:#2fd145}
.h q{quotes:none;display:inline-block;width:.15em;height:.15em;background:currentColor;margin-left:.06em}.h q:before,.h q:after{content:""}
.h s{text-decoration:none;color:#5b616c;-webkit-text-stroke-color:#5b616c}
.seg{font-family:DSEG7;color:#1f8bff;text-shadow:0 0 22px rgba(31,139,255,.5);line-height:1}
.mono{font-family:JB;font-weight:700;color:#cfd4dc}
.foot{margin-top:auto;display:flex;justify-content:space-between;align-items:flex-end;padding-top:28px;border-top:2px solid #2a2e36}
.cta{font-family:JB;font-weight:700;font-size:26px;letter-spacing:.06em;color:#8f96a3}
.cta b{display:block;margin-top:6px;color:#fff;font-family:Doto;font-weight:900;font-size:64px;letter-spacing:.02em;-webkit-text-stroke:1.4px #fff}
.cta b u{text-decoration:none;display:inline-block;width:.16em;height:.16em;background:#1f8bff;margin:0 .1em}
.astro{background:#e9ecf1;-webkit-mask-size:100% 100%;-webkit-mask-repeat:no-repeat;filter:drop-shadow(0 0 22px rgba(31,139,255,.55));aspect-ratio:131/150;flex:none}
.pill{display:inline-block;border:2px solid #2a2e36;padding:10px 18px;font-family:JB;font-weight:700;font-size:24px;letter-spacing:.08em;color:#cfd4dc;margin:0 12px 12px 0}
.pill.on{border-color:#1f8bff;color:#1f8bff}
.bar{height:30px;border:2px solid #3a3f4a;padding:4px}.bar span{display:block;height:100%;background:#1f8bff;box-shadow:0 0 18px rgba(31,139,255,.6)}
.row{display:flex;justify-content:space-between;align-items:center;padding:20px 0;border-bottom:1px solid #1d2026;font-family:JB;font-weight:700;font-size:30px;letter-spacing:.04em;color:#cfd4dc}
.row b{color:#2fd145}.row.x b{color:#ff5a5a}.row.x span{color:#5b616c;text-decoration:line-through}
`;
const foot=(t,a,w=170)=>`<div class="foot"><div class="cta">${t}<b>rave<u></u>wien</b></div><div class="astro" style="width:${w}px;-webkit-mask-image:url(${a})"></div></div>`;
const page=(bg,inner)=>`<!doctype html><meta charset="utf-8"><style>${CSS}</style><body><div class="bg ${bg}"></div><div class="grid"></div><div class="wrap">${inner}</div></body>`;
const mid=(inner)=>`<div style="flex:1;display:flex;flex-direction:column;justify-content:center">${inner}</div>`;

const [,, KEN, AB, WUNSCH] = process.argv;
if (!/^[a-z0-9-]{1,40}$/.test(KEN || "") || isNaN(Date.parse(AB || ""))) { console.error("Aufruf: kalenderpost.js <kennung> <posten_ab> [Veranstalter]"); process.exit(1); }
const slug=t=>String(t).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/ß/g,"ss").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
const ctx={};vm.runInNewContext(fs.readFileSync(R+'/events.js','utf8')+';this.o={RAW,CI}',ctx);
const heute=new Date().toLocaleDateString('sv-SE',{timeZone:'Europe/Vienna'});
const cnt={};ctx.o.RAW.filter(e=>e.d>=heute).forEach(e=>(e.coll||[]).forEach(c=>cnt[c]=(cnt[c]||0)+1));
const frueher=(()=>{try{return JSON.parse(fs.readFileSync(R+'/ig/extras.json','utf8')).posts.filter(x=>/^extra-kalender/.test(x.datum)).map(x=>(x.titel.match(/\(([^)]+)\)\s*$/)||[])[1]).filter(Boolean)}catch(_){return []}})().concat(['Zuckerwatt']);
// Kandidaten: mit Logo, mindestens 1 kommender Termin, nicht schon einmal Beispiel gewesen – die mit den meisten Terminen zuerst
const KAND=WUNSCH?[WUNSCH]:Object.keys(cnt).filter(c=>ctx.o.CI[c]&&ctx.o.CI[c].logo&&!frueher.includes(c)).sort((a,b)=>cnt[b]-cnt[a]).slice(0,12)
  // Notlösung, falls kein neues Logo ladbar ist (fremde Bildadressen sind in manchen Umgebungen gesperrt): frühere Beispiele mit Logo und kommendem Termin
  .concat(frueher.filter(c=>cnt[c]&&ctx.o.CI[c]&&ctx.o.CI[c].logo));
if(!KAND.length||!KAND.every(c=>ctx.o.CI[c])){console.error('Kein passender Veranstalter gefunden');process.exit(1)}
let NAME='';
const TMP=require('os').tmpdir();
const T={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.woff2':'font/woff2','.json':'application/json'};
(async()=>{const b=await chromium.launch();
 // 1) Screenshots der Veranstalter-Karte (Handy), lokale Dateien unter der echten Adresse, damit Logos erscheinen
 const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:3});
 await p.route('**/*',r=>{const u=new URL(r.request().url());if(u.hostname!=='rave.wien')return r.request().resourceType()==='image'?r.continue():r.abort();let f=path.join(R,decodeURIComponent(u.pathname));if(u.pathname.endsWith('/'))f+='index.html';if(!f.startsWith(R)||!fs.existsSync(f))return r.fulfill({status:404,body:''});return r.fulfill({path:f,contentType:T[path.extname(f)]||'application/octet-stream'})});
 await p.addInitScript(()=>{try{localStorage.setItem('rw-consent','all')}catch(e){}});
 for(const c of KAND){await p.goto('about:blank');await p.goto('https://rave.wien/#c/'+slug(c));await p.waitForTimeout(3500);
  const ok=await p.evaluate(()=>{const i=document.querySelector('.deck .lgt img');return !!(i&&i.naturalWidth>0)});
  if(ok||WUNSCH){NAME=c;break}console.log('Logo lädt nicht, nächster:',c)}
 if(!NAME){console.error('Bei keinem Kandidaten war das Logo ladbar');process.exit(1)}
 console.log('Beispiel:',NAME,'– kommende Termine:',cnt[NAME]||0);
 const box=s=>p.evaluate(q=>{const x=document.querySelector(q);if(!x)return null;const r=x.getBoundingClientRect();return [r.x,r.y,r.width,r.height]},s);
 const cal=await box('.deck [data-ics="sub"]');if(!cal){console.error('Kalender-Symbol nicht gefunden');process.exit(1)}
 await p.screenshot({path:TMP+'/kp-a.png'});
 await p.click('.deck [data-ics="sub"]');await p.waitForTimeout(400);const cb=await box('.deck .calbox');await p.screenshot({path:TMP+'/kp-b.png'});await p.close();
 const shot=f=>'data:image/png;base64,'+fs.readFileSync(f).toString('base64');const SA=shot(TMP+'/kp-a.png'),SB=shot(TMP+'/kp-b.png');
 const RA=[cal[0],cal[1],cal[2],cal[3]],RB=[cb[0]+7,cb[1]+5,cb[2]-14,cb[3]-9];
const Y0=255,K=790/(844-Y0),W=390*K;
const PH=(img,ring)=>`<div style="position:relative;width:${W}px;height:790px;margin:0 auto;border:3px solid #2a2e36;border-radius:34px;overflow:hidden;background:#08090b;box-shadow:0 30px 80px rgba(0,0,0,.6)">
 <div style="position:absolute;left:0;top:${-Y0*K}px;width:${W}px;height:${844*K}px;background:url(${img}) 0 0/100% 100% no-repeat"></div>
 ${ring?`<div style="position:absolute;left:${ring[0]*K-8}px;top:${(ring[1]-Y0)*K-8}px;width:${ring[2]*K+16}px;height:${ring[3]*K+16}px;border:5px solid #1f8bff;border-radius:16px;box-shadow:0 0 0 6px rgba(31,139,255,.25),0 0 40px rgba(31,139,255,.8)"></div>`:''}
</div>`;
const step=(n,t)=>`<div style="display:flex;gap:22px;align-items:baseline;margin-bottom:18px"><span class="seg" style="font-size:54px">${n}</span><span class="mono" style="font-size:38px;line-height:1.2;color:#e9ecf1">${t}</span></div>`;
const V={
'1-wusstest':page('',`<div class="kick" style="font-size:30px">Wusstest du <b>schon..?</b></div>`+mid(`<div class="h" style="font-size:118px">Du kannst<br>Artists &amp;<br>Veranstaltern<br><em>folgen</em> –</div><div class="h" style="font-size:96px;margin-top:40px">direkt in<br>deinem<br><i>Kalender.</i></div>`)+foot('Alle ihre Termine automatisch – mit',A1)),
'2-so-gehts':page('p',`<div class="kick" style="font-size:30px">So <b>geht's</b></div><div style="margin:34px 0 34px">${step('1','Artist oder Veranstalter<br>auf rave.wien antippen')}${step('2','unten in der Karte aufs<br>Kalender-Symbol tippen')}</div>`+PH(SA,RA)),
'3-fertig':page('y',`<div class="kick" style="font-size:30px">Und <b>fertig</b></div><div style="margin:34px 0 34px">${step('3','Apple, Google oder Outlook<br>wählen')}<div class="mono" style="font-size:32px;line-height:1.3;color:#8f96a3;margin-left:58px">Neue Termine landen ab jetzt<br>von selbst in deinem Kalender.</div></div>`+PH(SB,RB)),
};
 // 2) Bilder rendern
 const dir=R+'/ig/extra/'+KEN;fs.mkdirSync(dir,{recursive:true});const q=await b.newPage({viewport:{width:1080,height:1350}});let i=0;
 for(const h of Object.values(V)){await q.setContent(h);await q.evaluate(()=>document.fonts.ready);await q.waitForTimeout(300);await q.screenshot({path:dir+'/'+(++i)+'.jpg',type:'jpeg',quality:92})}
 await b.close();
 // 3) Zwischenpost eintragen (Story mit allen Bildern rund 3 Stunden später)
 const ef=R+'/ig/extras.json',j=JSON.parse(fs.readFileSync(ef,'utf8'));j.posts=j.posts.filter(x=>x.datum!=='extra-'+KEN);
 j.posts.push({datum:'extra-'+KEN,titel:'Zwischenpost „Wusstest du schon..? – Folgen im Kalender“ ('+NAME+')',posten_ab:AB,bilder:[1,2,3].map(n=>'ig/extra/'+KEN+'/'+n+'.jpg'),story_alle:true,story_nach_min:[165,195],
  text:'Wusstest du schon..? 👀 Du kannst deinen Lieblings-Artists und -Veranstaltern auf rave.wien folgen – direkt in deinem Kalender 📅\n\nKarte öffnen → Kalender-Symbol → Apple, Google oder Outlook. Neue Termine tauchen ab dann automatisch bei dir auf 🖤\n\n🔗 Link in Bio\n\n#ravewien #techno #wien #vienna #rave #viennanightlife #clubbing'});
 j.posts.sort((a,b)=>a.posten_ab.localeCompare(b.posten_ab));fs.writeFileSync(ef,JSON.stringify(j,null,1));
 console.log('fertig: ig/extra/'+KEN+'/1–3.jpg, eingeplant für '+AB);
})();
