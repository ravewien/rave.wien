// Erzeugt die Quellenlisten für das tägliche Event-Update: quellen.html (Übersicht + feste Programmseiten)
// und quellen-N.html (Quellen der kommenden Events, je höchstens 100 Adressen).
// Hintergrund: Die automatischen Läufe dürfen nur Seiten abrufen, deren Adresse im Lauf schon vorkam.
// Der Lauf liest zuerst diese Listen – damit sind alle Adressen darin abrufbar.
const fs=require('fs'),path=require('path'),vm=require('vm');
const R=path.join(__dirname,'..','..');
const c={};vm.runInNewContext(fs.readFileSync(R+'/events.js','utf8')+';this.o={RAW,VI,CI,V};',c);const {RAW,VI,CI}=c.o;
const Q=JSON.parse(fs.readFileSync(R+'/.github/agent/quellen.json','utf8'));
const today=new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Vienna'}).format(new Date());
const ok=u=>typeof u==='string'&&/^https:\/\/[^\s"'<>]+$/.test(u)&&!/instagram\.com|facebook\.com|soundcloud\.com/.test(u);
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const up=RAW.filter(e=>e.d>=today).sort((a,b)=>a.d.localeCompare(b.d));
const seen=new Set();const uniq=l=>l.filter(([u])=>ok(u)&&!seen.has(u)&&seen.add(u));
const sec=[
 ['Club-Programme',uniq(Q.clubs.map(u=>[u,'']))],
 ['Event-Portale',uniq(Q.portale.map(u=>[u,'']))],
 ['Veranstalter-Seiten',uniq(Q.veranstalter.map(u=>[u,'']))],
 ['Websites der Locations',uniq(Object.entries(VI).filter(([k,v])=>v&&v.web&&!v.closed).map(([k,v])=>[v.web,k]))],
 ['Websites und Ticketshops der Veranstalter mit kommenden Events',uniq([...new Set(up.flatMap(e=>[].concat(e.coll||[])))].flatMap(k=>{const v=CI[k]||{};return [[v.web,k],[v.tix,k+' (Tickets)']]}))],
];
const evs=uniq(up.flatMap(e=>[...(e.src||[]).map(s=>[s[1],`${e.d} ${e.title}`]),[e.tickets,`${e.d} ${e.title} (Tickets)`]]));
const N=100,parts=[];for(let i=0;i<evs.length;i+=N)parts.push(evs.slice(i,i+N));
const page=(title,body)=>`<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="robots" content="noindex,nofollow"><title>${esc(title)}</title></head><body><h1>${esc(title)}</h1><p>Quellenliste von rave.wien für das automatische Event-Update (Stand ${today}). Jede Zeile: Adresse – wofür.</p>${body}</body></html>\n`;
const list=l=>'<ul>'+l.map(([u,t])=>`<li><a href="${esc(u)}">${esc(u)}</a>${t?' – '+esc(t):''}</li>`).join('\n')+'</ul>';
for(const f of fs.readdirSync(R))if(/^quellen-\d+\.html$/.test(f))fs.unlinkSync(R+'/'+f);
fs.writeFileSync(R+'/quellen.html',page('rave.wien – Quellen',
 '<h2>Weitere Listen: Quellen der kommenden Events</h2>'+list(parts.map((p,i)=>[`https://rave.wien/quellen-${i+1}.html`,`Events ${p[0][1].slice(0,10)} bis ${p[p.length-1][1].slice(0,10)}`]))+
 sec.map(([t,l])=>`<h2>${esc(t)}</h2>`+list(l)).join('\n')));
parts.forEach((p,i)=>fs.writeFileSync(R+`/quellen-${i+1}.html`,page(`rave.wien – Event-Quellen ${i+1}/${parts.length}`,list(p))));
console.log(`quellen.html: ${sec.reduce((n,s)=>n+s[1].length,0)} feste Adressen; ${evs.length} Event-Adressen in ${parts.length} Listen`);
