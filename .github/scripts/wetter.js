// Holt einmal am Tag die Wettervorhersage (Open-Meteo, ohne Schlüssel) für alle Locations mit
// Events in den nächsten 7 Tagen und schreibt wetter.js. Die Seite zeigt daraus bei
// Outdoor-Events Symbol + Temperatur zur Startzeit.
//   node .github/scripts/wetter.js
const fs=require("fs"),path=require("path"),vm=require("vm");
const R=path.resolve(__dirname,"..","..");
const c={};vm.runInNewContext(fs.readFileSync(path.join(R,"events.js"),"utf8").replace(/^(const|let) /gm,"var "),c);
const g={};vm.runInNewContext(fs.readFileSync(path.join(R,"geo.js"),"utf8").replace(/^(const|let) /gm,"var "),g);
const GEO=Object.assign({},g.GEO2||{},c.VG||{});
const day=n=>new Date(Date.now()+n*864e5).toLocaleDateString("sv-SE",{timeZone:"Europe/Vienna"});
const from=day(0),to=day(7);
const venues=[...new Set((c.RAW||[]).filter(e=>e.d>=from&&e.d<=to&&e.venue&&GEO[e.venue]).map(e=>e.venue))].sort();
(async()=>{
  const out={gen:new Date().toISOString(),t0:null,v:{}};
  for(let i=0;i<venues.length;i+=40){const part=venues.slice(i,i+40);
    const u="https://api.open-meteo.com/v1/forecast?latitude="+part.map(v=>GEO[v][0]).join(",")+"&longitude="+part.map(v=>GEO[v][1]).join(",")+
      "&hourly=temperature_2m,weather_code,precipitation_probability&timezone=Europe%2FVienna&forecast_days=9";
    const r=await fetch(u);if(!r.ok)throw new Error("Open-Meteo "+r.status+" "+await r.text());
    let j=await r.json();if(!Array.isArray(j))j=[j];
    j.forEach((x,k)=>{const h=x.hourly;out.t0=out.t0||h.time[0];
      out.v[part[k]]={T:h.temperature_2m.map(t=>t==null?null:Math.round(t)),C:h.weather_code,P:h.precipitation_probability}})}
  fs.writeFileSync(path.join(R,"wetter.js"),"// Automatisch erzeugt (.github/scripts/wetter.js, Wetterdaten: Open-Meteo.com, CC BY 4.0) – nicht bearbeiten.\nwindow.WX="+JSON.stringify(out)+";\n");
  console.log(venues.length+" Locations, Vorhersage ab "+out.t0);
})().catch(e=>{console.error(e);process.exit(1)});
