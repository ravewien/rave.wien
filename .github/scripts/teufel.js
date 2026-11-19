// Halloween (31. Oktober): Teufelshörner, Schwanz und Dreizack für den Astronauten auf den Instagram-Bildern
// Teufels-Accessoires als Pixel-SVG im Koordinatensystem des Astronauten (131×150), Zelle = 3
const R='#e5202e',D='#9e0f1c';
const c=(x,y,f=R)=>`<rect x="${x}" y="${y}" width="3" height="3" fill="${f}"/>`;
const H=[[48,-3],[51,-3],[54,-3],[45,-6],[48,-6],[51,-6],[45,-9],[48,-9],[42,-12],[45,-12],[42,-15]];
let horns=H.map(([x,y])=>c(x,y)+c(129-x,y)).join('')+c(54,-3,D)+c(75,-3,D);
let tri='';for(let y=-30;y<108;y+=3)tri+=c(117,y,y>60?D:R);
for(let x=105;x<=129;x+=3)tri+=c(x,-30);
for(const x of [105,129])for(let y=-42;y<-30;y+=3)tri+=c(x,y);
for(let y=-51;y<-30;y+=3)tri+=c(117,y);
tri+=c(102,-42)+c(108,-42)+c(126,-42)+c(132,-42)+c(114,-51)+c(120,-51)+c(102,-45,'transparent');
const T=[[51,108],[48,111],[45,114],[42,117],[39,117],[36,117],[33,114],[30,111],[27,108],[24,105],[21,102]];
let tail=T.map(([x,y])=>c(x,y)).join('');
for(const [y,xs] of [[84,[21]],[87,[18,21,24]],[90,[15,18,21,24,27]],[93,[12,15,18,21,24,27,30]],[96,[15,18,24,27]],[99,[21]]])for(const x of xs)tail+=c(x,y,y>=93?D:R);
const svg=m=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 131 150" shape-rendering="crispEdges" style="position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none${m?';transform:scaleX(-1)':''}" aria-hidden="true">${tri}${tail}${horns}</svg>`;
module.exports={svg};
