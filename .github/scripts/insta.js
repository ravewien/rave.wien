// Erzeugt die Instagram-Posts (Bilder + Text) für die nächsten Tage und legt sie unter ig/ ab.
// Der Raspberry Pi holt sich ig/queue.json und postet zur angegebenen Zeit.
// Aufruf: node .github/scripts/insta.js            (nach ig/plan.json)
//         node .github/scripts/insta.js 2026-11-12 (nur diesen Tag, sofort fällig)
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const R=path.resolve(__dirname,'../..');const F=R+'/fonts/';const OUT=R+'/ig';
const TZ='Europe/Vienna';const WD=['sonntag','montag','dienstag','mittwoch','donnerstag','freitag','samstag'];
const plan=JSON.parse(fs.readFileSync(OUT+'/plan.json','utf8'));
const esc=s=>String(s||'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
// ---- Zeit (Wien) ----
const offMin=d=>{const s=new Intl.DateTimeFormat('en-US',{timeZone:TZ,timeZoneName:'longOffset'}).format(d);const m=s.match(/GMT([+-])(\d\d):(\d\d)/);return m?(m[1]==='-'?-1:1)*(+m[2]*60+ +m[3]):0};
const vienna=(ymd,hm)=>{const guess=new Date(ymd+'T'+hm+':00Z');const o=offMin(guess);const d=new Date(guess.getTime()-o*60000);const o2=offMin(d);return new Date(guess.getTime()-o2*60000)};
const iso=d=>{const o=offMin(d);const l=new Date(d.getTime()+o*60000).toISOString().slice(0,19);const s=o>=0?'+':'-';const a=Math.abs(o);return l+s+String(Math.floor(a/60)).padStart(2,'0')+':'+String(a%60).padStart(2,'0')};
const todayV=()=>new Date(Date.now()+offMin(new Date())*60000).toISOString().slice(0,10);
const addDays=(ymd,n)=>{const d=new Date(ymd+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10)};
const wdOf=ymd=>new Date(ymd+'T12:00:00Z').getUTCDay();
// ---- Preis kurz ----
const price=p=>{p=String(p||'').trim();if(!p)return 'Preis folgt';if(/^(ausverkauft|sold out)/i.test(p))return /abendkasse|\bAK\b|door/i.test(p)?'Nur noch Abendkasse':'Ausverkauft';
 if(/^(eintritt frei|free\b|frei\b|gratis)/i.test(p))return 'Eintritt frei';if(/spende/i.test(p)&&!/\d/.test(p))return 'Freie Spende';
 const main=p.replace(/\s*\([^)]*\)/g,'').split(/\s*\/\s*(?:Studierende|Student|erm|AK|VVK|Abendkasse)/i)[0];
 const RE=/€/.test(main)?/(\d+(?:[.,]\d{1,2})?)(?:\s*[–-]\s*(\d+(?:[.,]\d{1,2})?))?\s*(?:€|EUR)|€\s*(\d+(?:[.,]\d{1,2})?)(?:\s*[–-]\s*(\d+(?:[.,]\d{1,2})?))?/g:/(\d+(?:[.,]\d{1,2})?)\s*(?:[–-]\s*(\d+(?:[.,]\d{1,2})?))?/g;
 const nums=[...main.matchAll(RE)].flatMap(m=>[m[1],m[2],m[3],m[4]]).filter(Boolean).map(x=>parseFloat(x.replace(',','.'))).filter(x=>x>0&&x<500);
 if(!nums.length)return main.length>16?main.slice(0,15)+'…':main;const f=x=>(Number.isInteger(x)?String(x):x.toFixed(2).replace('.',','));const lo=Math.min(...nums),hi=Math.max(...nums);
 return (lo===hi?f(lo):f(lo)+'–'+f(hi))+' €'};
// ---- Gestaltung ----
const html0=fs.readFileSync(R+'/index.html','utf8');
const DSEG=(html0.match(/@font-face\{font-family:"DSEG7";src:url\((data:font\/woff2;base64,[^)]*)\)/)||[])[1];
const ASTRO=(html0.match(/\.astro\{[^}]*-webkit-mask:url\((data:image\/png;base64,[^)]*)\)/)||[])[1];
const f64=n=>'data:font/woff2;base64,'+fs.readFileSync(F+n).toString('base64');
const CSS=`
@font-face{font-family:Doto;src:url(${f64('doto-latin-900-normal.woff2')});font-weight:900}
@font-face{font-family:Doto;src:url(${f64('doto-latin-ext-900-normal.woff2')});font-weight:900;unicode-range:U+0100-02AF,U+1E00-1EFF,U+20AC}
@font-face{font-family:BC;src:url(${f64('barlow-condensed-latin-700-normal.woff2')});font-weight:700}
@font-face{font-family:BC;src:url(${f64('barlow-condensed-latin-600-normal.woff2')});font-weight:600}
@font-face{font-family:BC;src:url(${f64('barlow-condensed-latin-ext-700-normal.woff2')});font-weight:700;unicode-range:U+0100-02AF,U+1E00-1EFF}
@font-face{font-family:BC;src:url(${f64('barlow-condensed-latin-ext-600-normal.woff2')});font-weight:600;unicode-range:U+0100-02AF,U+1E00-1EFF}
@font-face{font-family:JB;src:url(${f64('jetbrains-mono-latin-700-normal.woff2')});font-weight:700}
@font-face{font-family:DSEG7;src:url(${DSEG})}
*{box-sizing:border-box;margin:0;padding:0}
.few .list{justify-content:flex-start;padding-top:10px}.few .ev{padding:34px 0}.few .ti{font-size:48px}.few .t{font-size:60px}.few .t small{font-size:32px}.few .ven{font-size:32px}.few .col{font-size:31px}.few .pr{font-size:32px}.few .ev{grid-template-columns:230px minmax(0,1fr)}
body{width:1080px;height:1350px;background:#08090b;color:#e9ecf1;font-family:BC,sans-serif;overflow:hidden;position:relative}
.bg{position:absolute;inset:0;background:radial-gradient(900px 520px at 85% -8%,rgba(31,139,255,.22),transparent 70%),radial-gradient(700px 500px at -10% 105%,rgba(47,209,69,.10),transparent 70%)}
.grid{position:absolute;inset:0;background-image:radial-gradient(rgba(233,236,241,.07) 1.2px,transparent 1.3px);background-size:18px 18px}
.wrap{position:absolute;inset:0;padding:64px 72px 56px;display:flex;flex-direction:column}
.brand{display:flex;align-items:center;gap:14px;font-family:Doto;font-weight:900;font-size:40px;letter-spacing:.02em;color:#e9ecf1;-webkit-text-stroke:.8px #e9ecf1}
.astro{width:40px;aspect-ratio:131/150;background:#e9ecf1;-webkit-mask:url(${ASTRO}) center/contain no-repeat}
.dot{display:inline-block;width:.16em;height:.16em;background:#1f8bff;margin:0 .12em 0 .02em}
.top{display:flex;justify-content:space-between;align-items:center}
.pg{font-family:JB;font-weight:700;font-size:32px;color:#aeb4bf;letter-spacing:.08em}
.head{margin-top:40px;padding-bottom:22px;border-bottom:2px solid #2a2e36}
.date .dd{display:block;flex:none;width:9px;height:9px;background:#1f8bff;margin:60px 10px 0 3.25px;box-shadow:0 0 14px rgba(31,139,255,.5)}
.date .dd:last-child{margin-right:0}
.hrow{display:flex;justify-content:space-between;align-items:flex-start;gap:24px}
.day{font-family:Doto;font-weight:900;font-size:86px;line-height:.95;letter-spacing:-.01em;color:#fff;-webkit-text-stroke:2px #fff;text-transform:uppercase;white-space:nowrap}
.date{display:flex;align-items:flex-start;font-family:Doto;font-weight:900;font-size:86px;line-height:.95;letter-spacing:-.01em;color:#1f8bff;-webkit-text-stroke:2px #1f8bff;white-space:nowrap;text-shadow:0 0 22px rgba(31,139,255,.45)}
.sub{margin-top:14px;font-family:JB;font-weight:700;font-size:22px;letter-spacing:.14em;color:#8f96a3;text-transform:uppercase}
.list{flex:1;min-height:0;overflow:hidden;display:flex;flex-direction:column;justify-content:flex-start;margin-top:12px}
.ev{display:grid;grid-template-columns:200px minmax(0,1fr);column-gap:26px;padding:17px 0;border-bottom:1px solid #1d2026}
.ev:last-child{border-bottom:0}
.t{font-family:DSEG7;color:#1f8bff;font-size:46px;text-align:right;line-height:1;text-shadow:0 0 14px rgba(31,139,255,.4)}
.t small{display:block;margin-top:10px;font-size:26px;color:#5d8fd0;text-shadow:none}
.ti{font-family:Doto;font-weight:900;font-size:36px;line-height:1.08;color:#fff;-webkit-text-stroke:1px #fff;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;word-break:break-word}
.meta{margin-top:10px;display:flex;justify-content:space-between;align-items:flex-start;gap:18px}
.where{flex:1 1 auto;display:flex;flex-wrap:wrap;align-items:center;gap:4px 22px;min-width:0}
.ven{display:inline-flex;align-items:center;gap:6px;color:#2fd145;font-weight:700;font-size:27px;letter-spacing:.06em;text-transform:uppercase;white-space:nowrap}
.ven svg{width:22px;height:22px;flex:none}
.pr{font-family:JB;font-weight:700;font-size:28px;color:#e9ecf1;white-space:nowrap;padding-top:1px;flex:none}
.col{display:inline-flex;align-items:center;gap:7px;color:#ff8c1a;font-weight:600;font-size:26px;letter-spacing:.03em;white-space:nowrap}
.col svg{width:24px;height:24px;flex:none}
.pr.free{color:#5fe0c0}.pr.ak{color:#ffd24a}.pr.tbd{color:#8f96a3}
.foot{display:flex;justify-content:space-between;align-items:center;padding-top:26px;border-top:2px solid #2a2e36;font-family:JB;font-weight:700;font-size:24px;letter-spacing:.06em;color:#8f96a3}
.foot b{color:#fff;font-family:Doto;font-weight:900;font-size:34px;letter-spacing:.02em;-webkit-text-stroke:.6px #fff}
.foot b i{display:inline-block;width:.16em;height:.16em;background:#1f8bff;margin:0 .1em}`;
const GRP='<svg viewBox="0 0 24 24"><path fill="#ff8c1a" d="M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zm7.5 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM9 13c-3.3 0-7 1.6-7 4.3V20h14v-2.7C16 14.6 12.3 13 9 13zm7.5 0c-.5 0-1 0-1.6.1 1.3.9 2.1 2.2 2.1 4.2V20h6v-2.4c0-2.6-3.6-4.6-6.5-4.6z"/></svg>';
const PIN='<svg viewBox="0 0 24 24"><path fill="#2fd145" d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>';
const slide=(EVS,pg,i,n,label,dd,mm)=>`<!doctype html><meta charset="utf-8"><style>${CSS}</style><body class="${EVS.length<=3?'few':''}"><div class="bg"></div><div class="grid"></div><div class="wrap">
 <div class="top"><div class="brand"><span class="astro"></span><span>rave<i class="dot"></i>wien</span></div><div class="pg">${n>1?`${i+1}/${n}`:''}</div></div>
 <div class="head"><div class="hrow"><div class="day">${esc(label)}</div><div class="date"><span>${dd}</span><i class="dd"></i><span>${mm}</span><i class="dd"></i></div></div><div class="sub">${EVS.length} Event${EVS.length===1?'':'s'} in Wien</div></div>
 <div class="list">${pg.map(e=>{const pr=price(e.p);return `<div class="ev"><div class="t">${esc(e.s||'--:--')}${e.e?`<small>-${esc(e.e)}</small>`:''}</div>
  <div><div class="ti">${esc(e.t)}</div><div class="meta"><div class="where"><span class="ven">${PIN}${esc(e.v)}</span>${e.c.length?`<span class="col">${GRP}${esc(e.c.join(' · '))}</span>`:''}</div><span class="pr ${/frei/i.test(pr)?'free':/folgt/.test(pr)?'tbd':/Abendkasse|Ausverkauft/.test(pr)?'ak':''}">${esc(pr)}</span></div></div></div>`}).join('')}</div>
 <div class="foot"><span>Lineups, Tickets &amp; mehr</span><b>rave<i></i>wien</b></div></div></body>`;
// ---- Post-Text ----
function caption(EVS,label,dd,mm,wd){
 const handles=[];EVS.forEach(e=>[e.vig,...e.cig.map(x=>x[1])].forEach(h=>{if(h&&!handles.includes(h))handles.push(h)}));
 const ok=new Set(handles.slice(0,20)); // Instagram: höchstens 20 @ pro Text
 let t=`${label.toUpperCase()} ${dd}.${mm}. – ${EVS.length} Event${EVS.length===1?'':'s'} in Wien 🖤\n\n`;
 for(const e of EVS){const parts=[e.vig&&ok.has(e.vig)?e.vig:e.v];e.cig.forEach(([n,h])=>{const x=h&&ok.has(h)?h:n;if(!parts.includes(x)&&x!==e.v)parts.push(x)});
  t+=`${e.s||''} ${e.t}\n📍 ${parts.join(' · ')}\n\n`}
 const tags=['#ravewien','#techno','#wien','#vienna','#rave',...(wd===5||wd===6||wd===0?['#wienwochenende']:[]),'#viennanightlife','#clubbing'];
 t+=`Alle Lineups, Preise & Tickets auf rave.wien 🔗 Link in Bio\n\n${tags.join(' ')}`;
 if(t.length>2200){t=t.slice(0,2150).replace(/\n[^\n]*$/,'')+'\n\n… mehr auf rave.wien'}
 return {text:t,handles,inText:[...ok]}}
// ---- Ablauf ----
(async()=>{
 const only=process.argv[2];const now=new Date();const today=todayV();
 const jobs=[];
 if(only){jobs.push({d:only,at:new Date()})}
 else for(let k=-1;k<=7;k++){const d=addDays(today,k);const r=plan[WD[wdOf(d)]];if(!r||r.aktiv===false)continue;
  const at=vienna(addDays(d,-(+r.tage_vorher||0)),r.uhrzeit||'18:00');
  if(at.getTime()>now.getTime()-6*3600e3&&at.getTime()<now.getTime()+40*3600e3)jobs.push({d,at})}
 const b=await chromium.launch();
 // Daten genau so aufbereiten wie die Website
 const ctx=await b.newContext();await ctx.route('**/*',r=>{const u=new URL(r.request().url());if(u.host==='rave.wien'){const f=R+(u.pathname==='/'?'/index.html':u.pathname);
  return fs.existsSync(f)&&fs.statSync(f).isFile()?r.fulfill({body:fs.readFileSync(f),contentType:f.endsWith('.html')?'text/html; charset=utf-8':'text/javascript; charset=utf-8'}):r.fulfill({status:404,body:''})}return r.abort()});
 const pg=await ctx.newPage();await pg.goto('https://rave.wien/');await pg.waitForFunction(()=>typeof EV!=='undefined'&&EV.length>0,null,{timeout:30000});
 const page=await b.newPage({viewport:{width:1080,height:1350}});
 const queue=[];
 for(const {d,at} of jobs){
  const EVS=await pg.evaluate(d=>{const ig=o=>{const m=JSON.stringify(o||{}).match(/instagram\.com\/([A-Za-z0-9._]+)/);return m&&!/^(p|reel|explore|stories)$/.test(m[1])?'@'+m[1].replace(/\.$/,''):''};
   return EV.filter(e=>e.d===d&&!e.cancel).map(e=>({t:e.title,s:e.s,e:e.e||'',v:e.venue,p:e.price||'',c:e.coll||[],vig:ig(VINFO[e.venue]),cig:(e.coll||[]).map(x=>[x,ig(CINFO[x])])}))},d);
  const dir=OUT+'/'+d;fs.rmSync(dir,{recursive:true,force:true});
  if(!EVS.length){console.log(d,'keine Events – kein Post');continue}
  fs.mkdirSync(dir,{recursive:true});
  const wd=wdOf(d);const label=WD[wd][0].toUpperCase()+WD[wd].slice(1);const [,mm,dd]=d.split('-');
  const split=NP=>{const ps=[];let i=0;for(let k=0;k<NP;k++){const n=Math.ceil((EVS.length-i)/(NP-k));ps.push(EVS.slice(i,i+n));i+=n}return ps};
  let files=[];
  for(let NP=Math.max(1,Math.ceil(EVS.length/8));NP<=10;NP++){const pages=split(NP);const shots=[];let ok=true;
   for(let i=0;i<pages.length;i++){await page.setContent(slide(EVS,pages[i],i,pages.length,label,dd,mm));await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(150);
    if(await page.evaluate(()=>{const l=document.querySelector('.list');return l.scrollHeight>l.clientHeight+2})){ok=false;break}
    shots.push(await page.screenshot({type:'jpeg',quality:92}))}
   if(ok||NP===10){files=shots.map((buf,i)=>{const n=`${i+1}.jpg`;fs.writeFileSync(dir+'/'+n,buf);return n});break}}
  const cap=caption(EVS,label,dd,mm,wd);
  const post={datum:d,posten_ab:iso(at),bilder:files.map(f=>`ig/${d}/${f}`),text:cap.text,erwaehnt:cap.inText,events:EVS.length};
  fs.writeFileSync(dir+'/post.json',JSON.stringify(post,null,1));fs.writeFileSync(dir+'/text.txt',cap.text);
  queue.push(post);console.log(d,'→',files.length,'Bild(er), posten ab',post.posten_ab)}
 await b.close();
 // Warteschlange: neue Posts + noch gültige frühere (bis 24 h nach Termin), alte Ordner aufräumen
 let old=[];try{old=JSON.parse(fs.readFileSync(OUT+'/queue.json','utf8')).posts||[]}catch(_){}
 const keep=old.filter(p=>!queue.find(q=>q.datum===p.datum)&&fs.existsSync(OUT+'/'+p.datum)&&new Date(p.posten_ab).getTime()>now.getTime()-24*3600e3);
 const all=[...keep,...queue].sort((a,b)=>a.posten_ab.localeCompare(b.posten_ab));
 fs.writeFileSync(OUT+'/queue.json',JSON.stringify({posts:all},null,1));
 for(const n of fs.readdirSync(OUT))if(/^\d{4}-\d\d-\d\d$/.test(n)&&n<addDays(today,-3))fs.rmSync(OUT+'/'+n,{recursive:true,force:true});
})().catch(e=>{console.error(e);process.exit(1)});
