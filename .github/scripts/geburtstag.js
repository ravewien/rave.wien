// Geburtstags-Post von rave.wien (online seit 28. Oktober 2026).
// insta.js erzeugt ihn ab 25. Oktober jedes Jahres mit der echten Zahl der Events des abgelaufenen Jahres
// und reiht ihn für den 28. Oktober, 12:00 (Wiener Zeit) in die Warteschlange ein.
const fs=require('fs'),path=require('path'),vm=require('vm');
const R=path.resolve(__dirname,'../..');const F=R+'/fonts/';
const START='2026-10-28';
const html0=fs.readFileSync(R+'/index.html','utf8');
const DSEG=(html0.match(/@font-face\{font-family:"DSEG7";src:url\((data:font\/woff2;base64,[^)]*)\)/)||[])[1];
const f64=n=>'data:font/woff2;base64,'+fs.readFileSync(F+n).toString('base64');
const png=f=>'data:image/png;base64,'+fs.readFileSync(R+'/ig/astro/'+f).toString('base64');
const A1=png('1.png');
const slug=t=>String(t).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ß/g,'ss').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
// Events im Zeitraum [von, bis) aus kommenden Events und Archiv, ohne Absagen, jedes Event nur einmal
function zaehlen(von,bis){const c={};vm.runInNewContext(fs.readFileSync(R+'/events.js','utf8')+';this.RAW=RAW',c);
 const p={};try{vm.runInNewContext(fs.readFileSync(R+'/past.js','utf8')+';this.PAST=typeof PAST!=="undefined"?PAST:[]',p)}catch(e){p.PAST=[]}
 const s=new Set();const add=(d,t)=>{if(d>=von&&d<bis&&t)s.add((d+'-'+slug(t)).slice(0,60))};
 (c.RAW||[]).forEach(e=>{if(!e.cancel)add(e.d,e.title)});(Array.isArray(p.PAST)?p.PAST:[]).forEach(r=>{if(Array.isArray(r))add(r[0],r[2])});return s.size}
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
let seed=28;const rnd=()=>{seed=(seed*1664525+1013904223)%4294967296;return seed/4294967296};
const COL=['#1f8bff','#ffd23c','#ff4fa3','#2fd145','#ffffff','#b07aff'];
const HAT=["......Y......",".....PPP.....","....BPPPB....","....BBPBB....","...PPBBBPP...","...PPPBPPP...","..BPPPPPPPB..","..BBBPPPBBB..",".PPBBBBBBBPP.",".YYYYYYYYYYY."];
let hat='';HAT.forEach((l,y)=>{for(let x=0;x<l.length;x++)if(l[x]!=='.')hat+=`<rect x="${x}" y="${y}" width="1.02" height="1.02" fill="${{P:'#ff4fa3',B:'#1f8bff',Y:'#ffd23c'}[l[x]]}"/>`});
const MON=['Jänner','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];
function bild(Y){const J=Y-2026,n=zaehlen((Y-1)+'-10-28',Y+'-10-28');seed=28+Y;
 let KF='';for(let k=0;k<120;k++){const x=Math.round(rnd()*1080/9)*9,y=Math.round(rnd()*1350/9)*9;if(y>230&&y<1000&&x<960)continue;if(y>1040)continue;KF+=`<i style="left:${x}px;top:${y}px;background:${COL[k%COL.length]};opacity:${(.35+rnd()*.5).toFixed(2)}${rnd()<.5?';width:18px':''}"></i>`}
 const zahl=n.toLocaleString('de-AT').replace(/\u00a0/g,'.');
 const foot=`<div class="foot"><div class="cta">Alle Raves in Wien auf<b>rave<u></u>wien</b></div><div style="position:relative;flex:none;width:200px"><svg viewBox="0 0 131 150" shape-rendering="crispEdges" style="position:absolute;inset:0;width:100%;height:100%;overflow:visible;z-index:2"><g transform="translate(31,-52) scale(5.4)">${hat}</g></svg><div class="astro" style="width:200px;-webkit-mask-image:url(${A1})"></div></div></div>`;
 const html=`<!doctype html><meta charset="utf-8"><style>${CSS}.kf{position:absolute;inset:0}.kf i{position:absolute;width:9px;height:9px}.h u{text-decoration:none;display:inline-block;width:.16em;height:.16em;background:#1f8bff;margin:0 .06em;box-shadow:0 0 20px rgba(31,139,255,.6)}</style><body><div class="bg p"></div><div class="grid"></div><div class="kf">${KF}</div><div class="wrap"><div style="flex:1;display:flex;flex-direction:column;justify-content:center">
<div class="kick" style="position:relative">28. Oktober ${Y-1} – 28. Oktober ${Y}</div>
<div class="h" style="position:relative;font-size:${J>9?190:228}px;margin-top:30px"><em style="color:#ff4fa3;-webkit-text-stroke-color:#ff4fa3;text-shadow:0 0 30px rgba(255,79,163,.5)">${J} ${J>1?'Jahre':'Jahr'}</em></div>
<div class="h" style="position:relative;font-size:150px;margin-top:20px;text-transform:lowercase">rave<u></u>wien!</div>
<div style="position:relative;display:flex;align-items:baseline;gap:28px;margin-top:64px"><span class="seg" style="font-size:96px">${zahl}</span><span class="mono" style="font-size:40px;letter-spacing:.06em">EVENTS IN WIEN</span></div>
<div class="mono" style="position:relative;font-size:34px;letter-spacing:.04em;margin-top:26px;color:#8f96a3">Danke fürs Mitraven.</div>
</div>${foot}</div></body>`;
 const text=`${J} ${J>1?'Jahre':'Jahr'} rave.wien! 🎉🖤\n\n${zahl} Events in Wien in einem Jahr – danke fürs Mitraven.\n\nAlle Raves in Wien auf rave.wien 🔗 Link in Bio\n\n#ravewien #techno #wien #vienna #rave #viennanightlife #clubbing #geburtstag`;
 return {html,text,n,J}}
module.exports={bild,zaehlen,START};
