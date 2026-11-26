// Feiertags-Deko für die Instagram-Tagesbilder (1080×1350).
//   Dezember: Schneeflocken im Hintergrund (1.–24. dazu Zipfelmütze); schon früher ab ig/plan.json "schnee_ab"
//   31. Oktober: Teufels-Astronaut + Pixel-Kürbis
//   14. Februar: Herzballons
//   Juni (Pride Month): Astronaut mit Regenbogenfahne;
//   Tag der Regenbogenparade (ig/plan.json "pride_parade", sonst 2. Samstag im Juni): zusätzlich Regenbogenfahne im Hintergrund
// Vorschau unabhängig vom Datum: IG_THEMA=advent|dezember|halloween|valentin|pride|parade node .github/scripts/insta.js JJJJ-MM-TT
const TEUFEL=require('./teufel.js');
const pix=(rows,C,cls)=>{let r='';rows.forEach((l,y)=>{for(let x=0;x<l.length;x++)if(l[x]!=='.')r+=`<rect x="${x}" y="${y}" width="1.02" height="1.02" fill="${C[l[x]]}"${cls&&cls[l[x]]?` class="${cls[l[x]]}"`:''}/>`});return r};
const svg=(w,h,inner,st='')=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" shape-rendering="crispEdges" style="${st}">${inner}</svg>`;
const HEART=[".HH.HH.","HHHHHHH","HHHHHHH",".HHHHH.","..HHH..","...H..."];
const PUMP=["......SS......",".....SS.......","..OOOOOOOOOO..",".OOOOOOOOOOOO.","OOOYYOOOOYYOOO","OOYYYOOOOYYYOO","OOOOOOYYOOOOOO","OOYOOOOOOOOYOO","OOYYYYYYYYYYOO","OOOYOYYOYYOOOO",".OOOOOOOOOOOO.","..OOOOOOOOOO.."];
const RB=['#e40303','#ff8c00','#ffed00','#008026','#24408e','#732982'];
const HAT="data:image/svg+xml,"+encodeURIComponent(svg(22,11,pix(["......RRRR............",".....RRRRRRR..........","....RRRRRRRRRR........","....RRRRRRRRRRRR......","...RRRRRRRRRDRRRRR....","...RRRRRRRRRRDDRRRR...","..RRRRRRRRRRRR.DRRRR..","..RRRRRRRRRRRRR..WWW..",".WWWWWWWWWWWWWWW.WWWW.",".WWWWWWWWWWWWWWW..WW..",".SSSSSSSSSSSSSSS......"],{R:'#e5202e',D:'#a80f1f',W:'#fff',S:'#c9ced6'})));
function rng(seed){let s=0;for(const c of String(seed))s=(s*31+c.charCodeAt(0))>>>0;return()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296}}
const ymd=(y,m,d)=>`${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
function paradeTag(y,plan){const p=plan&&plan.pride_parade;if(p&&String(p).slice(0,4)===String(y))return p;let n=0;for(let d=1;d<=14;d++){if(new Date(Date.UTC(y,5,d)).getUTCDay()===6&&++n===2)return ymd(y,6,d)}return ''}
function themen(d,plan){const f=process.env.IG_THEMA;if(f)return {advent:['advent'],dezember:['schnee'],halloween:['halloween'],valentin:['valentin'],pride:['pride'],parade:['pride','parade']}[f]||[];
 const [y,m,t]=d.split('-').map(Number);const T=[];
 if(m===12){T.push('schnee');if(t<=24)T.push('muetze')}
 // Erster Schnee schon vor Dezember: ig/plan.json "schnee_ab": "JJJJ-MM-TT" – ab diesem Tag bis Jahresende Schneeflocken
 else if(plan&&plan.schnee_ab&&d>=plan.schnee_ab&&d.slice(0,4)===String(plan.schnee_ab).slice(0,4))T.push('schnee')
 if(m===10&&t===31)T.push('halloween');if(m===2&&t===14)T.push('valentin');
 if(m===6){T.push('pride');if(d===paradeTag(y,plan))T.push('parade')}return T}
// P = Pose {w,h,f}, k = Maßstab, i = Seitennummer
function deko(d,plan,P,k,i){let T=themen(d,plan);if(T.includes('advent'))T=['schnee','muetze'];if(!T.length)return null;
 const r=rng(d+'/'+i),W=Math.round(P.w*k),mir=/^2\./.test(P.f);let bg='',fg='',css='';
 if(T.includes('schnee')){let s='';for(let n=0;n<90;n++){const x=Math.round(r()*1080/9)*9,y=Math.round(r()*1350/9)*9,o=(.18+r()*.4).toFixed(2);
   s+=r()<.2?`<i style="left:${x-9}px;top:${y}px;width:27px;height:9px;opacity:${o}"></i><i style="left:${x}px;top:${y-9}px;width:9px;height:27px;opacity:${o}"></i>`:`<i style="left:${x}px;top:${y}px;opacity:${o}"></i>`}
  bg+=`<div class="th-schnee">${s}</div>`;css+='.th-schnee{position:absolute;inset:0}.th-schnee i{position:absolute;width:9px;height:9px;background:#fff}'}
 if(T.includes('muetze'))fg+=`<div style="position:absolute;bottom:198px;transform:translateY(100%);aspect-ratio:22/11;right:${66+Math.round(W*.15)}px;width:${Math.round(W*.55)}px;background:url('${HAT}') 0 0/100% 100% no-repeat"></div>`;
 if(T.includes('halloween')){fg+=`<div style="position:absolute;right:66px;bottom:44px;width:${W}px;height:135px">${TEUFEL.svg(mir)}</div>`;
  fg+=`<div style="position:absolute;z-index:2;right:${66+W-10}px;bottom:129px;width:78px;filter:drop-shadow(0 0 16px rgba(255,122,26,.6))">${svg(14,12,pix(PUMP,{S:'#2fd145',O:'#ff7a1a',Y:'#ffd23c'}),'display:block;width:100%')}</div>`;
  css+='.ev:last-child .pr{margin-right:230px}'}
 if(T.includes('valentin')){let s='';const spots=[[0.98,.19],[0.04,.30],[0.93,.40],[0.02,.62],[0.90,.66],[0.50,.03],[0.70,.21],[0.63,.15]];
  spots.forEach(([fx,fy],n)=>{const sz=Math.round(40+r()*38),x=Math.round(fx*1080-sz/2+(r()-.5)*40),y=Math.round(fy*1350+(r()-.5)*40),c=['#ff4fa3','#ff7ab8','#e5202e','#ff2e88'][n%4];
   s+=`<div style="position:absolute;left:${x}px;top:${y}px;width:${sz}px;opacity:${(.45+r()*.35).toFixed(2)}">${svg(7,6,pix(HEART,{H:c}),'display:block;width:100%')}<i style="display:block;width:3px;height:${Math.round(sz*1.3)}px;margin:0 auto;background:rgba(233,236,241,.35)"></i></div>`});
  bg+=`<div style="position:absolute;inset:0">${s}</div>`;
  fg+=`<div style="position:absolute;z-index:0;right:${66+(mir?W*.62:W*.08)}px;bottom:${44+135-10}px;width:44px">${svg(7,6,pix(HEART,{H:'#ff4fa3'}),'display:block;width:100%')}<i style="display:block;width:3px;height:40px;margin:0 auto;background:rgba(233,236,241,.55)"></i></div>`}
 if(T.includes('pride')){let fl='';RB.forEach((c,n)=>fl+=`<rect x="121" y="${-66+n*9}" width="74" height="9.05" fill="${c}"/>`);
  fg+=`<div style="position:absolute;right:66px;bottom:44px;width:${W}px;height:135px">${svg(131,150,`<rect x="116" y="-68" width="5" height="171" fill="#c9ced6"/><rect x="114" y="-74" width="9" height="7" fill="#ffd23c"/>${fl}`,`position:absolute;inset:0;width:100%;height:100%;overflow:visible${mir?';transform:scaleX(-1)':''}`)}</div>`}
 if(T.includes('parade')){let s='';const B=18;for(let x=0;x<1080;x+=B){const off=Math.round(Math.sin(x/140)*2)*B;RB.forEach((c,n)=>{s+=`<i style="left:${x}px;top:${300+off+n*B*7}px;height:${B*7}px;background:${c}"></i>`})}
  bg+=`<div class="th-flagge">${s}</div>`;css+='.th-flagge{position:absolute;inset:0;opacity:.34}.th-flagge i{position:absolute;width:18px}.foot b{background:linear-gradient(90deg,#e40303 0 16.6%,#ff8c00 16.6% 33.3%,#ffed00 33.3% 50%,#008026 50% 66.6%,#3a63ff 66.6% 83.3%,#a24ad6 83.3%);-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent;-webkit-text-stroke:0}.foot b i{background:#fff}'}
 return {bg,fg,css}}

// Zusatzbild am Ende des Tagesposts: am 20. April „oh.. und happy 420 ;)“ mit kiffendem Astronauten (ca. ein Viertel des Bilds)
const LEAF=["......G......","......G......",".G...GGG...G.",".GG..GGG..GG.","..GG.GGG.GG..","..GGGGGGGGG..","G..GGGGGGG..G","GGG.GGGGG.GGG",".GGGGGGGGGGG.","...GGGGGGG...","..GG..D..GG..","......D......","......D......"];
function zusatz(d,CSS,astro){const f=process.env.IG_THEMA;if(!(f==='420'||(!f&&d.slice(5)==='04-20')))return null;
 const r=rng('420'+d);let bl='';[[.08,.07,70],[.80,.05,96],[.55,.16,54],[.90,.30,60],[.06,.52,84],[.30,.86,58],[.13,.76,46],[.62,.47,44]].forEach(([fx,fy,sz],n)=>{
  bl+=`<div style="position:absolute;left:${Math.round(fx*1080)}px;top:${Math.round(fy*1350)}px;width:${sz}px;opacity:${(.3+r()*.4).toFixed(2)};transform:rotate(${Math.round(r()*50-25)}deg)">${svg(13,13,pix(LEAF,{G:['#2fd145','#25a838','#5fe06f'][n%3],D:'#1c7d2a'}),'display:block;width:100%')}</div>`});
 const AW=470,AH=Math.round(AW*150/131);
 const html=`<!doctype html><meta charset="utf-8"><style>${CSS}
 .z420{position:absolute;left:72px;top:150px;font-family:Doto;font-weight:900;color:#fff;-webkit-text-stroke:2.4px #fff;text-transform:uppercase;line-height:1.02}
 .z420 .k{font-size:104px;color:#cfd4dc;-webkit-text-stroke:2px #cfd4dc}.z420 .g{font-size:150px}.z420 em{font-style:normal;color:#2fd145;-webkit-text-stroke-color:#2fd145;text-shadow:0 0 34px rgba(47,209,69,.5)}
 .z420 .n{font-size:200px;line-height:1;margin-top:14px}</style><body><div class="bg"></div><div class="grid"></div>${bl}
 <div class="z420"><div class="k">oh..</div><div class="g">und happy</div><div class="n"><em>420</em> ;)</div></div>
 <div style="position:absolute;right:70px;bottom:150px;width:${AW}px;height:${AH}px"><div style="position:absolute;inset:0;background:#e9ecf1;-webkit-mask:url(${astro}) center/100% 100% no-repeat;filter:drop-shadow(0 0 26px rgba(47,209,69,.45))"></div>
 ${svg(131,150,`<rect x="116" y="6" width="5" height="18" fill="#f4f1e6"/><rect x="116" y="2" width="5" height="4" fill="#ff7a1a"/><rect x="116" y="24" width="5" height="3" fill="#d8c9a0"/><g fill="#c9ced6"><rect x="114" y="-7" width="4" height="4" opacity=".9"/><rect x="119" y="-15" width="4" height="4" opacity=".7"/><rect x="113" y="-23" width="4" height="4" opacity=".5"/><rect x="118" y="-32" width="5" height="5" opacity=".35"/><rect x="111" y="-42" width="5" height="5" opacity=".2"/></g>`,'position:absolute;inset:0;width:100%;height:100%;overflow:visible')}</div>
 <div class="wrap" style="justify-content:flex-end"><div class="foot"><span>Lineups, Tickets &amp; mehr auf <b>rave<i></i>wien</b></span></div></div></body>`;
 return {name:'happy420',html}}
module.exports={deko,themen,paradeTag,zusatz};

