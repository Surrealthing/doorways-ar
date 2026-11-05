/* how separable are the 48 colour signatures under lighting changes?
   distort each card's own signature (exposure, white balance, noise, some
   points lost) and see whether rank() still picks it, and by what margin */
import {rank} from '../sig.js';
import {SIGNATURES} from '../signatures.js';
let rng=1; const rnd=()=>((rng=Math.imul(rng^rng>>>15,2246822507)+12345|0)>>>0)/4294967296;
const trials=60; let wrong=0, worst=9; const bad={};
for(let i=0;i<48;i++) for(let t=0;t<trials;t++){
  const exp=(rnd()-.5)*.24, wa=(rnd()-.5)*.04, wb=(rnd()-.5)*.05, sat=.8+rnd()*.3;
  const obs=SIGNATURES[i].map(p=>!p||rnd()<.2?null:[p[0]+exp+(rnd()-.5)*.04, p[1]*sat+wa+(rnd()-.5)*.02, p[2]*sat+wb+(rnd()-.5)*.02]);
  const r=rank(obs,SIGNATURES);
  if(r[0].i!==i){ wrong++; bad[i+1]=(bad[i+1]||[]).concat(r[0].i+1); }
  else worst=Math.min(worst,r[1].d/r[0].d);
}
console.log(`trials ${48*trials} · misidentified ${wrong} (${(wrong/48/trials*100).toFixed(2)}%) · weakest correct margin ${worst.toFixed(2)}`);
console.log('confused (card → picked):',JSON.stringify(Object.fromEntries(Object.entries(bad).map(([k,v])=>[k,[...new Set(v)]]))));
