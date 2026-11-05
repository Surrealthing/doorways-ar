/* Card identification by colour.
   Every number side carries the same white line art over its own gradient, so
   image tracking alone can't tell the 48 apart. Once the tracker has the card's
   pose, we sample the camera at these card-space points (u across, v down, in
   the trimmed card) and compare against each card's signature from tools/prep.

   Comparison works in Oklab. Lightness is normalised to the median of the
   sample (phone exposure and room light shift it a lot), and chroma counts
   more than lightness, since hue is what the gradients are made of. */
export const GRID=(()=>{ const g=[];
  for(let j=0;j<9;j++) for(let i=0;i<6;i++) g.push([.1+i*.16,.07+j*.107]);
  return g; })();

const lin=c=>c<=.04045?c/12.92:Math.pow((c+.055)/1.055,2.4);
export function oklab(r,g,b){
  r=lin(r/255);g=lin(g/255);b=lin(b/255);
  const l=Math.cbrt(.4122214708*r+.5363325363*g+.0514459929*b),m=Math.cbrt(.2119034982*r+.6806995451*g+.1073969566*b),s=Math.cbrt(.0883024619*r+.2817188376*g+.6299787005*b);
  return [.2104542553*l+.793617785*m-.0040720468*s,1.9779984951*l-2.428592205*m+.4505937099*s,.0259040371*l+.7827717662*m-.8086757660*s];
}
const median=a=>{ const s=a.slice().sort((x,y)=>x-y); return s[s.length>>1]||0; };

/* obs: array (GRID order) of [L,a,b] or null. sigs: SIGNATURES. returns ranked [{i,d}] */
export function rank(obs,sigs){
  const oL=median(obs.filter(Boolean).map(o=>o[0]));
  const out=[];
  sigs.forEach((sig,i)=>{
    const sL=median(sig.filter(Boolean).map(o=>o[0]));
    let d=0,n=0;
    for(let p=0;p<sig.length;p++){
      const s=sig[p],o=obs[p]; if(!s||!o) continue;
      const dl=(o[0]-oL)-(s[0]-sL), da=o[1]-s[1], db=o[2]-s[2];
      d+=Math.sqrt(.35*dl*dl+da*da+db*db); n++;
    }
    out.push({i,d:n?d/n:9});
  });
  return out.sort((x,y)=>x.d-y.d);
}
