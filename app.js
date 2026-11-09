/* ==========================================================================
   DOORWAYS AR — scan the number side of a Doorways card and it opens.

   Recognition runs in two steps, because all 48 number sides share the same
   white line art and differ only in their gradient:
     1. MindAR tracks one target (the line art common to every card, see
        tools/prep.html) and gives us the card's pose in 3-D;
     2. with that pose we sample the camera image at a grid of points on the
        card and match the colours against each card's signature (sig.js).
   Several agreeing frames lock the card. A holographic 3-D card is laid on
   the physical one, flips to the emotion face, and the reflection sheet
   rises with a journaling prompt.
   Without a camera, the deck grid gives the same card and sheet.
   ========================================================================== */
import * as THREE from 'three';
import {MindARThree} from 'mindar-image-three';
import {GRID, oklab, rank} from './sig.js';
import {SIGNATURES} from './signatures.js';
import {NUMS, NUM_W, NUM_H, NUM_BOX} from './numbers.js';

const CARDS = window.CARDS;
const $ = s => document.querySelector(s);
const DEBUG = /[?&]debug/.test(location.search);
const ASPECT = 1087 / 724;                       /* card height / width (80 × 120 mm trim) */
/* one motion system, shared with index.html (--ease, --t-s/m/l): a single easing curve,
   cubic-bezier(.22,1,.36,1), and three durations, in seconds */
const T = {s: .3, m: .7, l: 1.2};
function ease(t) {                                /* cubic-bezier(.22,1,.36,1), solved for y at x = t */
  t = Math.min(1, Math.max(0, t)); let u = t;
  for (let n = 0; n < 6; n++) {
    const x = 3 * (1 - u) * (1 - u) * u * .22 + 3 * (1 - u) * u * u * .36 + u * u * u - t;
    const dx = 3 * (1 - u) * (1 - u) * .22 + 6 * (1 - u) * u * (.36 - .22) + 3 * u * u * (1 - .36);
    u = Math.min(1, Math.max(0, u - x / (dx || 1)));
  }
  return 3 * (1 - u) * (1 - u) * u + 3 * (1 - u) * u * u + u * u * u;
}
const pad = n => String(n).padStart(2, '0');
const show = (id, on = true) => $(id).classList.toggle('on', on);
/* haptics where the browser has them (Android Chrome; iOS Safari has no Vibration API).
   Chrome refuses vibrate before the first tap, so skip it quietly until then. */
/* iOS 18+ Safari has no vibrate, but toggling a hidden <input switch> plays the system
   tick, so a pattern there becomes one tick per pulse */
let iosTick = null;
if (!navigator.vibrate && /iP(hone|ad|od)|Macintosh/.test(navigator.userAgent) && 'ontouchend' in document) {
  const l = document.createElement('label'), i = document.createElement('input');
  i.type = 'checkbox'; i.setAttribute('switch', ''); l.append(i);
  l.style.cssText = 'position:fixed;width:1px;height:1px;overflow:hidden;opacity:0;pointer-events:none;left:-9px;top:-9px';
  l.setAttribute('aria-hidden', 'true'); document.body.append(l);
  iosTick = () => { try { l.click(); } catch (e) {} };
}
function buzz(p) {
  if (iosTick) {
    let at = 0;
    [].concat(p).forEach((ms, k) => { if (k % 2 === 0) setTimeout(iosTick, at); at += ms; });
    return;
  }
  if (!navigator.vibrate) return;
  if (navigator.userActivation && !navigator.userActivation.hasBeenActive) return;
  try { navigator.vibrate(p); } catch (e) {}
}

/* ================================ SHEET =================================== */
let current = null, promptIdx = 0, mode = 'ar';
function setColours(c) {
  const r = document.documentElement.style;
  r.setProperty('--a', c.a); r.setProperty('--b', c.b); r.setProperty('--c', c.c || c.b);
}
function fillSheet(c) {
  current = c; promptIdx = 0;
  $('#sName').textContent = c.name;
  $('#sNum').textContent = c.num;
  $('#sCore').textContent = c.base === c.name ? 'core emotion' : c.base;
  $('#sheet').style.setProperty('--ca', c.a);
  $('#sAbout').textContent = c.about || '';
  /* its neighbours are doorways too: each one opens that card */
  const sim = $('#sSimilar'); sim.textContent = '';
  if (c.similar) {
    sim.append('close to ');
    c.similar.forEach((n, k) => {
      const to = CARDS.find(x => x.name === n); if (!to) return;
      const b = document.createElement('button'); b.className = 'rel'; b.textContent = n;
      b.onclick = e => { e.stopPropagation(); goTo(to); };
      if (k) sim.append(k === c.similar.length - 1 ? ' and ' : ', ');
      sim.append(b);
    });
  }
  openSheet(false);
  fillTry();
  $('#sPrompt').textContent = c.prompts[0];
  $('#sAgain').textContent = mode === 'ar' ? 'scan another' : 'back to the deck';
}
function nextPrompt() {
  if (!current) return;
  const p = $('#sPrompt');
  p.classList.add('out');
  /* wait for the soft fade-out, then swap and ease back in */
  setTimeout(() => {
    promptIdx = (promptIdx + 1) % current.prompts.length;
    p.textContent = current.prompts[promptIdx];
    /* double-rAF so the browser paints the out state before removing it */
    requestAnimationFrame(() => requestAnimationFrame(() => p.classList.remove('out')));
  }, T.m * 1000);
}
/* ---- try this: one small activity per card, under the prompt, done in the reader's own way ---- */
$('#sNext').onclick = nextPrompt;
const KIND = {breath: 'breathe', sensory: 'notice', task: 'do', words: 'say', media: 'listen', make: 'make'};
function fillTry() {
  const x = current && current.exercise;
  $('#sheet .try').style.display = x ? '' : 'none';
  if (!x) return;
  $('#xKind').textContent = KIND[x.kind] || 'try';
  $('#xText').textContent = x.text;
}
$('#sCopy').onclick = async e => {
  e.stopPropagation();
  const t = $('#sPrompt').textContent, b = $('#sCopy');
  try { await navigator.clipboard.writeText(t); }
  catch (_) {
    const ta = document.createElement('textarea'); ta.value = t; ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;opacity:0'; document.body.append(ta); ta.select();
    try { document.execCommand('copy'); } catch (__) {} ta.remove();
  }
  buzz(8);
  b.classList.add('done'); clearTimeout(b._t); b._t = setTimeout(() => b.classList.remove('done'), 1600);
};

/* the sheet peeks first (the feeling's name, its core and one line) so the card stays in
   view; swipe up or tap for the rest, swipe down to tuck it away again */
function openSheet(on) {
  const sh = $('#sheet');
  sh.classList.toggle('open', on);
  if (!on) requestAnimationFrame(() => sh.style.setProperty('--peek', $('#sSimilar').offsetTop - 2 + 'px'));
}
{
  const sh = $('#sheet'); let y0 = null, moved = false;
  sh.addEventListener('pointerdown', e => { if (e.target.closest('button')) return; y0 = e.clientY; moved = false; });
  sh.addEventListener('pointermove', e => { if (y0 !== null && Math.abs(e.clientY - y0) > 8) moved = true; });
  sh.addEventListener('pointerup', e => {
    if (y0 === null) return;
    const dy = e.clientY - y0; y0 = null;
    const open = sh.classList.contains('open');
    if (!moved) { if (!open) { openSheet(true); cardFace(false); } return; }
    if (dy < -24 && !open) { openSheet(true); cardFace(false); }
    else if (dy > 24 && open) { openSheet(false); cardFace(true); }
  });
  sh.addEventListener('pointercancel', () => { y0 = null; });
}

/* with the sheet pulled up, the card turns to its front (the gradient and number), so
   the words below sit with the colour; tucked back down, it turns to the emotion again.
   This turns the card without touching the sheet, unlike a tap on the card */
function cardFace(emotion) {
  const v = emotion ? 1 : 0;
  if (mode === 'ar') { if (cardGroup && cardGroup.visible && flipTarget !== v) { flipTarget = v; flipAt = 0; buzz(8); } return; }
  const card = $('#card2d');
  if (card && card.classList.contains('flipped') !== emotion) { clearTimeout(flipTimer); card.classList.toggle('flipped', emotion); }
}
/* follow a neighbouring feeling. In the deck it opens that card; over the camera the
   floating card turns back, takes the new card's art, and turns to its emotion again */
async function goTo(c) {
  if (mode !== 'ar' || !floating) return openView(c);
  let tn, tf;
  try { [tn, tf] = await Promise.all([tex(`assets/cards/num-${pad(c.id)}.jpg`), tex(`assets/cards/face-${pad(c.id)}.jpg`)]); }
  catch (e) { return; }
  locked = CARDS.indexOf(c); current = c; setColours(c);
  for (const m of [cardFront.material, cardBack.material]) { m.uniforms.uA.value.set(c.a); m.uniforms.uB.value.set(c.b); }
  cardFront.material.uniforms.map.value = tn; cardBack.material.uniforms.map.value = tf;
  showPrompt(false); sheetShownFor = null;
  flipP = 0; flipTarget = 0; appearAt = performance.now();
  flipAt = performance.now() + T.l * 1000;            /* a breath on the number side, then it turns */
  buzz(10);
}
$('#sAgain').onclick = () => mode === 'ar' ? resetCard() : closeView();

/* ================================ AR ====================================== */
let mindar = null, anchor = null, renderer, scene, camera;
let cardGroup, cardFront, cardBack, rig;
let locked = null, lostAt = 0, visible = false;
let appear = 0, flipP = 0, flipTarget = 0, sheetShownFor = null, appearAt = 0, flipAt = 0, visF = 0, needSnap = true, foundAt = 0;
const votes = [];
const texCache = new Map();
const loader = new THREE.TextureLoader();
function tex(url) {
  if (!texCache.has(url)) texCache.set(url, new Promise((res, rej) => loader.load(url, t => {
    t.colorSpace = THREE.NoColorSpace; t.anisotropy = 16; t.generateMipmaps = true; t.minFilter = THREE.LinearMipmapLinearFilter; res(t); },
    undefined, e => { texCache.delete(url); rej(e); })));
  return texCache.get(url);
}

/* ---- holographic card surface ----
   the printed art, with a thin-film rainbow that shifts with viewing angle, a
   faint sheen band in the emotion's colours. Everything that moves is
   slow and low-amplitude, so tracking noise can't turn it into flicker. uReveal wipes
   the card in from the bottom with a bright scan edge when it locks on. */
const holoVS = `
varying vec2 vUv; varying vec3 vN; varying vec3 vV;
void main(){ vUv=uv; vec4 mv=modelViewMatrix*vec4(position,1.); vN=normalize(normalMatrix*normal); vV=-mv.xyz;
  gl_Position=projectionMatrix*mv; }`;
const holoFS = `
uniform sampler2D map; uniform float uTime,uOpacity,uHolo,uDark,uRip,uReveal,uFres,uCA; uniform vec3 uA,uB; uniform vec2 uSize,uView;
/* chromatic aberration, only while the card moves: red and blue pulled apart toward the
   edges, the way a lens splits colour on fast motion. At rest uCA is 0 and this is a plain read */
vec3 samp(vec2 uv){ vec2 o=(uv-.5)*uCA; return vec3(texture2D(map,uv+o).r,texture2D(map,uv).g,texture2D(map,uv-o).b); }
varying vec2 vUv; varying vec3 vN; varying vec3 vV;
float rbox(vec2 p,vec2 b,float r){ vec2 q=abs(p)-b+r; return length(max(q,0.))+min(max(q.x,q.y),0.)-r; }
float h21(vec2 p){ p=fract(p*vec2(123.34,456.21)); p+=dot(p,p+45.32); return fract(p.x*p.y+p.x*.137); }
void main(){
  vec2 p=(vUv-.5)*uSize; float d=rbox(p,uSize*.5,.045);
  if(d>0.) discard;
  /* the viewing angle comes in pre-smoothed (uView, uFres) rather than from the per-pixel
     normal, so tracker shake can't make the rainbow shimmer frame to frame */
  float fres=pow(clamp(uFres+.32*length(vUv-.5),0.,1.),2.5);
  float t=dot(uView,vec2(.8,.5))*1.1+(vUv.x+vUv.y)*.9+uTime*.03;
  vec3 iri=.5+.5*cos(6.2832*(t+vec3(0.,.33,.67)));
  vec3 tint=mix(uA,uB,vUv.y);
  vec3 col;
  if(uDark>.5){
    /* the number side: white line art turns to holographic foil, the gradient ripples */
    vec3 raw=texture2D(map,vUv).rgb;
    float art=smoothstep(.80,.93,min(raw.r,min(raw.g,raw.b)));
    float r=length(p);                                   /* distance from the card centre, in card widths */
    float front=uRip*.62;                                /* the ring sent out when the card lands */
    float burst=exp(-pow((r-front)*7.,2.))*exp(-uRip*.5)+.55*exp(-pow((r-front+.22)*8.,2.))*exp(-uRip*.6);
    float wave=sin(r*24.-uTime*1.6)*.0011+sin(r*11.-uTime*.9+p.x*5.)*.001+burst*.016;
    /* hold the ripple still near any white art, so printing inside it (the number
       in the wave shape) stays exactly where it is printed */
    float near=0.;
    for(int k=0;k<8;k++){ float a=float(k)*.7854; vec3 q=texture2D(map,vUv+vec2(cos(a),sin(a))*vec2(.035,.023)).rgb;
      near=max(near,smoothstep(.80,.93,min(q.r,min(q.g,q.b)))); }
    wave*=1.-near;
    vec2 dir=r>1e-4?p/r:vec2(0.);
    vec3 bg=samp(vUv+dir*wave/uSize);
    /* the gradient breathes: a slow drift toward its own palette, and a soft light along the ring */
    float swell=.5+.5*sin(r*9.-uTime*1.1);
    bg=mix(bg,bg*(.94+.12*tint),.2*swell);
    bg+=burst*(tint*.32+.12);
    /* foil for the art: angle-driven spectrum with a moving rainbow bar and glints */
    float ft=dot(uView*1.4,vec2(.6,.8))*1.5+vUv.y*2.4-vUv.x*1.3+uTime*.08+burst*1.5;
    vec3 foil=.55+.45*cos(6.2832*(ft+vec3(0.,.33,.67)));
    foil=mix(foil,vec3(1.),.45)+pow(max(0.,cos(ft*6.2832*.5)),24.)*.3;
    /* sparse glints that fade in and out smoothly, instead of blinking per frame */
    vec2 g=floor(vUv*vec2(90.,135.));
    float glint=step(.993,h21(g))*pow(max(0.,sin(uTime*1.2+h21(g+3.7)*40.)),24.);
    foil+=glint*.35;
    col=mix(bg,foil,art);
    col+=iri*(.02+.1*fres)*uHolo*(1.-art);
  }else{
    vec3 base=samp(vUv);
    col=base+iri*(.03+.14*fres)*uHolo*.4;
  }
  float s=fract((vUv.x*.7+vUv.y*.5)*.8-uTime*.07);
  float band=exp(-pow((s-.5)*7.,2.));
  col+=band*(tint*.07+.02)*uHolo;
  /* lock-on wipe: the card builds up from the bottom behind a soft bright edge */
  float edge=uReveal*1.25-.12;
  float shown=1.-smoothstep(edge-.06,edge+.01,vUv.y);
  col+=exp(-pow((vUv.y-edge)*28.,2.))*(tint*.4+.25)*step(uReveal,.999);
  gl_FragColor=vec4(col,uOpacity*max(shown,exp(-pow((vUv.y-edge)*28.,2.))*.9));
}`;
function holoMat(map, dark) {
  return new THREE.ShaderMaterial({
    uniforms: {map: {value: map}, uTime: {value: 0}, uOpacity: {value: 0}, uHolo: {value: 1}, uDark: {value: dark ? 1 : 0}, uRip: {value: 9}, uReveal: {value: 1}, uFres: {value: 0}, uCA: {value: 0}, uView: {value: new THREE.Vector2()},
      uA: {value: new THREE.Color()}, uB: {value: new THREE.Color()}, uSize: {value: new THREE.Vector2(1, ASPECT)}},
    vertexShader: holoVS, fragmentShader: holoFS, transparent: true, side: THREE.FrontSide,
  });
}
function buildCard() {
  cardGroup = new THREE.Group();
  const g = new THREE.PlaneGeometry(1, ASPECT);
  cardFront = new THREE.Mesh(g, holoMat(null, true));
  cardBack = new THREE.Mesh(g, holoMat(null, false));
  cardBack.rotation.y = Math.PI;                  /* emotion face, readable once the card has turned */
  cardGroup.add(cardFront, cardBack);
  cardGroup.visible = false;
  /* the rig lives in the scene, not under the anchor: each frame it eases toward the
     anchor's pose, which takes the tracker's frame-to-frame shake out of the card */
  rig = new THREE.Group();
  rig.add(cardGroup);
  scene.add(rig);
}
const aP = new THREE.Vector3(), aQ = new THREE.Quaternion(), aS = new THREE.Vector3();
let jumpN = 0;
function followAnchor(dt) {
  anchor.group.updateWorldMatrix(true, false);
  anchor.group.matrixWorld.decompose(aP, aQ, aS);
  if (needSnap) { rig.position.copy(aP); rig.quaternion.copy(aQ); rig.scale.copy(aS); needSnap = false; return; }
  /* small moves are noise and get damped hard; a real move of the card is followed quickly.
     One frame that jumps far is usually a bad pose from the tracker, not the card moving:
     hold still for it, and follow only once the next frame agrees */
  const move = rig.position.distanceTo(aP) / Math.max(aS.x, 1e-6);
  if (move > .25 && ++jumpN < 2) return;
  if (move <= .25) jumpN = 0;
  const kp = 1 - Math.exp(-dt * (5 + 30 * Math.min(1, move / .15)));
  const kq = 1 - Math.exp(-dt * (4 + 20 * Math.min(1, rig.quaternion.angleTo(aQ) / .4)));
  rig.position.lerp(aP, kp); rig.quaternion.slerp(aQ, kq); rig.scale.lerp(aS, 1 - Math.exp(-dt * 4));
}
/* ---- the reflection sheet after a scan: the same sheet as the deck view ---- */
let promptOn = false;
function showPrompt(on) {
  promptOn = !!on;
  if (on && current) { mode = 'ar'; fillSheet(current); $('#sPrompt').classList.remove('out'); }
  show('#sheet', on);
}

/* ---- the lift ----
   tracking only has to hold for the landing: after it, the card leaves the table and
   floats in front of the camera, facing you. From then on it can't jitter or drift,
   whatever the light, the surface or the hand. */
let floating = false, lifting = false, liftP = 0, liftAt = 0;
const from = {p: new THREE.Vector3(), q: new THREE.Quaternion(), s: new THREE.Vector3()};
const to = {p: new THREE.Vector3(), q: new THREE.Quaternion()};
const tilt = {x: 0, y: 0, tx: 0, ty: 0, b0: null, g0: null, drag: null};
const qTmp = new THREE.Quaternion(), eTmp = new THREE.Euler(), nTmp = new THREE.Vector3(), viewS = new THREE.Vector2();
let fresS = 0;
function liftTarget() {
  const s = rig.scale.x, th = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);
  /* card ~44% of the view's height, and never wider than ~78% of its width */
  let D = ASPECT * s / (1.04 * th);                     /* ~52% of the view's height */
  D = Math.max(D, s / (.86 * 2 * th * camera.aspect));
  const h = 2 * D * th;
  to.p.set(0, .12 * h, -D).applyMatrix4(camera.matrixWorld);   /* centred 38% down, just above the sheet */
  to.q.copy(camera.quaternion);
  return h;
}
let floatH = 1;
function startLift() {
  if (floating || lifting || locked === null) return;
  from.p.copy(rig.position); from.q.copy(rig.quaternion); from.s.copy(rig.scale);
  floatH = liftTarget(); lifting = true; liftP = 0;
  tilt.b0 = tilt.g0 = null; tilt.tx = tilt.ty = 0; tilt.fx = tilt.fy = 0; tilt.fl = false; tilt.vx = tilt.vy = 0;
  $('#stage .veil')?.classList.add('on');
}
function dropRig() {
  floating = lifting = false; liftP = 0; liftAt = 0; flipAt = 0; needSnap = true;
  $('#stage .veil')?.classList.remove('on');
}
addEventListener('deviceorientation', e => {
  if (!floating || e.beta == null) return;
  if (tilt.b0 === null) { tilt.b0 = e.beta; tilt.g0 = e.gamma; }
  tilt.tx = 0;                                       /* front-to-back tilt is ignored: the card only turns upright */
  tilt.ty = THREE.MathUtils.clamp((e.gamma - tilt.g0) / 35, -1, 1) * .3;
});

async function lockCard(i) {
  const c = CARDS[i];
  if (DEBUG) { const t = performance.now() - (window.__arStart || 0), m = window.__m || {}; document.title = `LOCK ${c.num} total ${Math.round(t)} | cam ${m.cam} ready ${m.ready} found ${m.found} → lock ${Math.round(t - m.found)}`; }
  locked = i; votes.length = 0;
  setColours(c); mode = 'ar'; fillSheet(c);
  /* the lock is felt and seen at once, even while the textures finish loading */
  buzz([14, 45, 22]);
  hint('');
  let tn, tf;
  try { [tn, tf] = await Promise.all([tex(`assets/cards/num-${pad(c.id)}.jpg`), tex(`assets/cards/face-${pad(c.id)}.jpg`)]); }
  catch (e) { console.warn(e); if (locked === i) resetCard(); return; }
  if (locked !== i) return;
  for (const m of [cardFront.material, cardBack.material]) { m.uniforms.uA.value.set(c.a); m.uniforms.uB.value.set(c.b); }
  cardFront.material.uniforms.map.value = tn; cardBack.material.uniforms.map.value = tf;
  cardGroup.visible = true; appear = 0; flipP = 0; flipTarget = 0; flipAt = 0; appearAt = performance.now();
  if (rig.parent && !floating && !lifting) needSnap = true;
  sheetShownFor = null; showPrompt(false);
  promptIdx = 0; /* sheet filled by fillSheet(c) above */
  liftAt = performance.now() + T.m * 1000;           /* land on the card, then lift: the tracker only has to hold briefly */
}
function flipTo(v) {
  if (v !== flipTarget) buzz(10);
  flipTarget = v; flipAt = 0;
  if (!v) { sheetShownFor = null; showPrompt(false); }
}
function resetCard() {
  if (rig) dropRig();
  locked = null; votes.length = 0; flipTarget = 0; flipP = 0; appear = 0; liftAt = 0; flipAt = 0; visF = 0; needSnap = true;
  if (cardGroup) cardGroup.visible = false;
  show('#sheet', false); showPrompt(false); sheetShownFor = null;
  searchSince = performance.now(); hint(visible ? 'reading' : 'looking');
}
/* what the scanner says, quietly: 'looking' while nothing is in view, 'reading' while a
   card is being read, and after a while with no card, one clear message */
let hintState = '', searchSince = 0;
const HINTS = {
  warming: ['getting ready', 'have a card ready, front with the logo up'],
  looking: ['looking for a card', 'hold the front with the logo up to the camera'],
  reading: ['hold still', 'reading the card'],
  closer:  ['bring it closer', 'fill the corners with the card, front with the logo up'],
  lost:    ['can’t find a card', 'hold the front with the logo up, flat and in good light, so it fills most of the screen'],
};
/* the frame guide's corners: a wave along a rounded L, its phase drifting so the line
   flows. Tapered to nothing at both ends, so each corner reads as one soft stroke */
function guidePath(ph) {
  const L = 40, R = 12, A = 2.4, lam = 11, O = 4, seg = L - R, arc = Math.PI * R / 2, tot = 2 * seg + arc;
  let d = '';
  for (let s = 0; s <= tot; s += 1) {
    let x, y, nx, ny;
    if (s < seg) { x = 0; y = L - s; nx = -1; ny = 0; }
    else if (s < seg + arc) { const a = (s - seg) / R; x = R - R * Math.cos(a); y = R - R * Math.sin(a); nx = -Math.cos(a); ny = -Math.sin(a); }
    else { x = R + (s - seg - arc); y = 0; nx = 0; ny = -1; }
    const o = A * Math.min(1, s / 6, (tot - s) / 6) * Math.sin(2 * Math.PI * s / lam - ph);
    d += (s ? 'L' : 'M') + (x + O + nx * o).toFixed(2) + ' ' + (y + O + ny * o).toFixed(2);
  }
  return d;
}
let guideRaf = 0, guidePh = 0, guideLast = 0;
const stillMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
function drawGuide(t) {
  const dt = guideLast ? Math.min(.05, (t - guideLast) / 1000) : 0; guideLast = t;
  guidePh += dt * ($('#guide').classList.contains('reading') ? 10 : 4);
  const d = guidePath(guidePh);
  document.querySelectorAll('#guide path').forEach(p => p.setAttribute('d', d));
  guideRaf = stillMotion ? 0 : requestAnimationFrame(drawGuide);
}
function startGuide() { if (!guideRaf) { guideLast = 0; guideRaf = requestAnimationFrame(drawGuide); } }
function stopGuide() { cancelAnimationFrame(guideRaf); guideRaf = 0; }
function hint(state) {
  if (state === hintState) return;
  hintState = state;
  const el = $('#hint');
  el.classList.toggle('hide', !state);
  el.classList.toggle('looking', state === 'looking' || state === 'warming' || state === 'closer');
  /* the frame guide shows where to hold the card until one is being read */
  $('#guide').className = 'guide ' + (state === 'looking' || state === 'closer' || state === 'lost' ? 'on' : state === 'reading' ? 'on reading' : '');
  if (/on/.test($('#guide').className)) startGuide(); else setTimeout(() => { if (!/on/.test($('#guide').className)) stopGuide(); }, T.m * 1000);
  if (HINTS[state]) { $('#hintT').textContent = HINTS[state][0]; $('#hintS').textContent = HINTS[state][1]; }
}

/* ---- identify the card by its colours ---- */
const sCv = document.createElement('canvas'), sCx = sCv.getContext('2d', {willReadFrequently: true});
const v3 = new THREE.Vector3();
let lastSample = 0;
/* points on the white line art every card shares (from tools/mean-target.png). The
   camera's view of them tells us the room's white balance, which we take out before
   comparing colours, so warm or cool light can't shift a gradient into its neighbour's */
let WHITE_PTS = [];
(async () => {
  try {
    const im = new Image(); im.src = 'tools/mean-target.png'; await im.decode();
    const w = 181, h = 272, c = document.createElement('canvas'); c.width = w; c.height = h;
    const g = c.getContext('2d'); g.drawImage(im, 0, 0, w, h);
    const d = g.getImageData(0, 0, w, h).data, pts = [];
    for (let y = 2; y < h - 2; y += 2) for (let x = 2; x < w - 2; x += 2)
      if (d[(y * w + x) * 4] > 235) pts.push([(x + .5) / w, (y + .5) / h]);
    for (let i = 0; i < pts.length; i += Math.max(1, Math.floor(pts.length / 70))) WHITE_PTS.push(pts[i]);
  } catch (e) {}
})();
function identify(now) {
  if (now - foundAt < 100) return;                      /* let the first pose settle before reading colours */
  if (now - lastSample < 90) return;
  lastSample = now;
  const v = mindar.video; if (!v || !v.videoWidth) return;
  const vw = v.videoWidth, vh = v.videoHeight;
  const vr = v.getBoundingClientRect(), cr = renderer.domElement.getBoundingClientRect();
  const M = anchor.group.matrixWorld, obs = [];
  const toPx = (u, w) => { v3.set(u - .5, (.5 - w) * ASPECT, 0).applyMatrix4(M).project(camera);
    return [(cr.left + (v3.x + 1) / 2 * cr.width - vr.left) / vr.width * vw, (cr.top + (1 - v3.y) / 2 * cr.height - vr.top) / vr.height * vh]; };
  /* read only the card's own region of the frame, at full resolution: far less work
     per frame than the whole image, so the view stays smooth while it reads */
  const cs = [toPx(0, 0), toPx(1, 0), toPx(0, 1), toPx(1, 1)];
  const ox = Math.max(0, Math.floor(Math.min(...cs.map(c => c[0])) - 12)), oy = Math.max(0, Math.floor(Math.min(...cs.map(c => c[1])) - 12));
  const bw = Math.min(vw, Math.ceil(Math.max(...cs.map(c => c[0])) + 12)) - ox, bh = Math.min(vh, Math.ceil(Math.max(...cs.map(c => c[1])) + 12)) - oy;
  if (bw < 40 || bh < 60) return;
  if (sCv.width !== bw || sCv.height !== bh) { sCv.width = bw; sCv.height = bh; }
  sCx.drawImage(v, ox, oy, bw, bh, 0, 0, bw, bh);
  const px = sCx.getImageData(0, 0, bw, bh).data;
  const at = (X, Y) => ((Y - oy | 0) * bw + (X - ox | 0)) * 4;
  const inside = (X, Y, m) => X - ox >= m && Y - oy >= m && X - ox < bw - m - 1 && Y - oy < bh - m - 1;

  /* white balance: brightest pixel near each white-art point, median per channel */
  let gain = [1, 1, 1];
  if (WHITE_PTS.length) {
    const R = [], G = [], B = [];
    for (const [u, w] of WHITE_PTS) {
      const [X, Y] = toPx(u, w); if (!inside(X, Y, 2)) continue;
      let bk = -1, bl = -1;
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { const k = at(X + dx, Y + dy), l = px[k] + px[k + 1] + px[k + 2]; if (l > bl) { bl = l; bk = k; } }
      R.push(px[bk]); G.push(px[bk + 1]); B.push(px[bk + 2]);
    }
    if (R.length > 12) {
      const med = a => a.sort((x, y) => x - y)[a.length >> 1];
      const w = [med(R), med(G), med(B)], m = (w[0] + w[1] + w[2]) / 3;
      if (m > 60) gain = w.map(c => Math.min(1.6, Math.max(.6, m / Math.max(c, 1))));
    }
  }
  for (const [u, w] of GRID) {
    const [X, Y] = toPx(u, w);
    if (!inside(X, Y, 5)) { obs.push(null); continue; }
    let L = 0, A = 0, B = 0, n = 0;
    for (let dy = -4; dy <= 4; dy += 2) for (let dx = -4; dx <= 4; dx += 2) {
      const k = at(X + dx, Y + dy);
      const o = oklab(Math.min(255, px[k] * gain[0]), Math.min(255, px[k + 1] * gain[1]), Math.min(255, px[k + 2] * gain[2]));
      if (o[0] > .9 && Math.hypot(o[1], o[2]) < .05) continue;      /* white line art */
      L += o[0]; A += o[1]; B += o[2]; n++;
    }
    obs.push(n > 8 ? [L / n, A / n, B / n] : null);
  }
  if (obs.filter(Boolean).length < GRID.length * .5) return;
  const r = rank(obs, SIGNATURES), best = r[0], second = r[1];
  /* step 3: read the printed number. Sample its patch through the card's pose and
     compare with the templates of the colour shortlist; it settles close calls */
  const num = readNumber(px, bw, bh, ox, oy, toPx);
  let pick = best.i, why = 'colour', nccBest = 0;
  if (num) {
    const short = r.slice(0, 5).map(x => ({...x, n: slideNCC(num, NUMS[x.i])}));
    const sc = x => x.n - 2.5 * (x.d - best.d);
    const top = short.reduce((a, b) => sc(b) > sc(a) ? b : a);
    nccBest = top.n;
    if (top.n > .45) { pick = top.i; why = top.i === best.i ? 'colour + number' : 'number'; }
  }
  const margin = second.d / Math.max(best.d, 1e-4);
  if (why === 'colour' && margin < 1.3) return;            /* unsure, and the number can't settle it */
  votes.push({i: pick, m: why === 'colour' ? margin : 2, d: best.d, w: why === 'colour + number' ? 2 : 1, at: now});
  while (votes.length > 6 || (votes.length && now - votes[0].at > 1600)) votes.shift();
  if (DEBUG) $('#debug').textContent = r.slice(0, 4).map(x => `${CARDS[x.i].num} ${CARDS[x.i].name.padEnd(14)} ${x.d.toFixed(3)}`).join('\n')
    + `\nnumber ${num ? nccBest.toFixed(2) : 'too small'} · ${why}\nvotes ${votes.map(x => CARDS[x.i].num).join(' ')}`;
  /* lock when the weight for one card reaches 4: two frames where colour and number
     agree, or four colour-only frames */
  const tally = {};
  votes.forEach(x => tally[x.i] = (tally[x.i] || 0) + x.w);
  const [top, wsum] = Object.entries(tally).sort((a, b) => b[1] - a[1])[0];
  /* fetch the leader's art while the votes build, so the lock shows the card at once */
  const lc = CARDS[+top];
  tex(`assets/cards/num-${pad(lc.id)}.jpg`).catch(() => {}); tex(`assets/cards/face-${pad(lc.id)}.jpg`).catch(() => {});
  if (wsum >= 4) lockCard(+top);
}

function ncc(a, b) {
  let ma = 0, mb = 0; const n = a.length;
  for (let i = 0; i < n; i++) { ma += a[i]; mb += b[i]; }
  ma /= n; mb /= n; let sab = 0, saa = 0, sbb = 0;
  for (let i = 0; i < n; i++) { const x = a[i] - ma, y = b[i] - mb; sab += x * y; saa += x * x; sbb += y * y; }
  return sab / Math.sqrt(saa * sbb + 1e-9);
}
/* the number patch, sampled through the card's pose with a margin all round, so the
   template can slide over it: a pose a few pixels off would otherwise miss digits this small.
   null when the number is too small in the frame to read. */
const NM = 7;                                                  /* margin, in template pixels */
function readNumber(px, bw, bh, ox, oy, toPx) {
  const [x0, y0] = toPx(NUM_BOX[0], NUM_BOX[1]), [x1, y1] = toPx(NUM_BOX[0] + NUM_BOX[2], NUM_BOX[1]);
  if (Math.hypot(x1 - x0, y1 - y0) < NUM_W * .5) return null;        /* the digits need ~21 camera pixels across */
  const W = NUM_W + 2 * NM, H = NUM_H + 2 * NM, du = NUM_BOX[2] / NUM_W, dv = NUM_BOX[3] / NUM_H;
  const out = new Float32Array(W * H);
  for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) {
    let [X, Y] = toPx(NUM_BOX[0] + (i - NM + .5) * du, NUM_BOX[1] + (j - NM + .5) * dv);
    X -= ox; Y -= oy;
    if (X < 1 || Y < 1 || X > bw - 2 || Y > bh - 2) return null;
    const xi = X | 0, yi = Y | 0, fx = X - xi, fy = Y - yi, g = k => .299 * px[k] + .587 * px[k + 1] + .114 * px[k + 2];
    const k00 = (yi * bw + xi) * 4, k10 = k00 + 4, k01 = k00 + bw * 4, k11 = k01 + 4;
    out[j * W + i] = (g(k00) * (1 - fx) + g(k10) * fx) * (1 - fy) + (g(k01) * (1 - fx) + g(k11) * fx) * fy;
  }
  return out;
}
/* best normalised cross-correlation of a template anywhere inside the sampled patch */
const win = new Float32Array(NUM_W * NUM_H);
function slideNCC(patch, tpl) {
  const W = NUM_W + 2 * NM; let best = -1;
  for (let oy = 0; oy <= 2 * NM; oy++) for (let ox = 0; ox <= 2 * NM; ox++) {
    for (let j = 0; j < NUM_H; j++) for (let i = 0; i < NUM_W; i++) win[j * NUM_W + i] = patch[(j + oy) * W + i + ox];
    const n = ncc(win, tpl); if (n > best) best = n;
  }
  return best;
}

/* ---- per frame ---- */
let t0 = performance.now(), last = t0;
function frame(now) {
  const dt = Math.min((now - last) / 1000, .05); last = now;
  const t = (now - t0) / 1000;
  for (const m of [cardFront.material, cardBack.material]) m.uniforms.uTime.value = t;
  cardFront.material.uniforms.uRip.value = (now - appearAt) / 1000;   /* seconds since the card landed */

  const tracking = floating || lifting || visible || (now - lostAt < 400);
  /* on the table the card follows the smoothed anchor; a short loss holds it where it was */
  if (!floating && !lifting && visible) followAnchor(dt);

  if (locked !== null && liftAt && now > liftAt && !floating && !lifting && appear >= 1) { if (visible) startLift(); }
  if (lifting) {
    liftP = Math.min(1, liftP + dt / T.l);
    const e = ease(liftP);
    floatH = liftTarget();
    rig.position.lerpVectors(from.p, to.p, e);
    rig.quaternion.slerpQuaternions(from.q, to.q, e);
    if (liftP >= 1) {
      lifting = false; floating = true;
      appearAt = performance.now();                    /* the ring runs again, now facing you */
      flipAt = now + 2 * T.l * 1000;                   /* the ripple plays, then it turns to the emotion */
      buzz(8);
    }
  } else if (floating) {
    /* afloat: a slow breath, and a tilt that follows the phone (or a finger) */
    liftTarget();
    /* a finger leads; let go and it keeps spinning, slows, and springs softly back in range */
    if (!tilt.fl) {
      const fr = Math.exp(-dt * 2.6);                 /* momentum fades over ~a second */
      tilt.vx *= fr; tilt.vy *= fr;
      tilt.fx += tilt.vx * dt; tilt.fy += tilt.vy * dt;
      const LY = 3.0;                                  /* past the edge, a soft spring pulls it back */
      if (Math.abs(tilt.fy) > LY) { tilt.vy -= (tilt.fy - Math.sign(tilt.fy) * LY) * 14 * dt; tilt.vy *= Math.exp(-dt * 4); }
    }
    const phone = tilt.fl ? .35 : 1;                   /* the phone's own tilt stays quiet under a finger */
    const gx = tilt.fx + tilt.tx * phone, gy = tilt.fy + tilt.ty * phone;
    const k = 1 - Math.exp(-dt * (tilt.fl ? 18 : 9));
    tilt.x += (gx - tilt.x) * k;
    tilt.y += (gy - tilt.y) * k;
    rig.position.copy(to.p);
    rig.position.y += Math.sin(t * 1.1) * floatH * .008;
    eTmp.set(0, tilt.y + Math.sin(t * .5) * .05, 0);  /* turns only around its upright axis */
    rig.quaternion.copy(to.q).multiply(qTmp.setFromEuler(eTmp));
  }

  if (floating && flipAt && now > flipAt) { flipAt = 0; if (flipP === 0 && flipTarget === 0) flipTo(1); }

  if (locked !== null && cardGroup.visible) {
    /* how the card faces the camera, low-passed: drives the rainbow and the rim light */
    cardFront.getWorldQuaternion(qTmp); nTmp.set(0, 0, 1).applyQuaternion(qTmp).transformDirection(camera.matrixWorldInverse);
    const kv = 1 - Math.exp(-dt * 3);
    viewS.x += (nTmp.x - viewS.x) * kv; viewS.y += (nTmp.y - viewS.y) * kv; fresS += (1 - Math.abs(nTmp.z) - fresS) * kv;
    for (const m of [cardFront.material, cardBack.material]) { m.uniforms.uView.value.copy(viewS); m.uniforms.uFres.value = fresS; }
    appear = Math.min(1, appear + dt / T.m);
    const fd = dt / T.l;                                     /* a flip is the long duration */
    const wasP = flipP;
    flipP = flipTarget > flipP ? Math.min(flipTarget, flipP + fd) : Math.max(flipTarget, flipP - fd);
    if (wasP !== flipP && flipP === flipTarget) buzz(flipTarget ? [8, 30, 16] : 8);   /* the turn settles */
    const f = ease(flipP), a = ease(appear);
    cardGroup.rotation.y = Math.PI * f;
    /* it lands: drops the last few millimetres onto the printed card as it builds up,
       and lifts only to turn */
    cardGroup.position.z = .002 + .05 * (1 - a) + Math.sin(Math.PI * f) * .16 + .02 * f;
    cardGroup.scale.setScalar(1 + .04 * (1 - a));
    /* fade with tracking instead of cutting, so a dropped frame never makes it blink */
    visF += ((tracking ? 1 : 0) - visF) * Math.min(1, dt * (tracking ? 9 : 3));
    const op = Math.min(1, appear * 2.5) * visF;
    cardFront.material.uniforms.uOpacity.value = op;
    cardBack.material.uniforms.uOpacity.value = op;
    cardFront.material.uniforms.uReveal.value = cardBack.material.uniforms.uReveal.value = a;
    const motion = Math.max(lifting ? Math.sin(Math.PI * liftP) : 0, Math.sin(Math.PI * flipP));
    cardFront.material.uniforms.uCA.value = cardBack.material.uniforms.uCA.value = .004 * motion;   /* a hint; more read as a glitch over the camera */
    if (flipP >= 1 && sheetShownFor !== locked) { sheetShownFor = locked; showPrompt(true); }
  }
  /* lost the card for a while: forget it, so the next one is read fresh */
  if (!visible && !floating && !lifting && locked !== null && now - lostAt > 2500) resetCard();

  renderer.render(scene, camera);
  /* a while with no card in view: say so, once, plainly */
  /* low-quality cameras only find the card when it is big in the frame: ask for that early */
  if (locked === null && !visible && hintState === 'looking' && now - searchSince > 6000) hint('closer');
  if (locked === null && !visible && hintState === 'closer' && now - searchSince > 14000) hint('lost');
  if (visible && locked === null) identify(now);
}

/* the camera is asked for here, still inside the begin tap, with our own constraints:
   720p so the printed number has enough pixels to read (MindAR's default leaves iPhones
   at 640×480), and real error names when it fails */
/* the tracker's slow start (loading its target and compiling its GPU programs, ~3 s)
   is done once in the background while the home screen is up: a hidden copy runs on a
   blank picture the size the camera will likely give, then stops. The real start
   reuses the compiled programs, so the scanner is ready almost as soon as the camera */
let prewarmed = null;
function prewarm() {
  if (prewarmed || mindar || !window.isSecureContext) return;
  prewarmed = (async () => {
    const portrait = innerHeight > innerWidth, w = portrait ? 720 : 1280, h = portrait ? 1280 : 720;
    const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
    const g = cv.getContext('2d');
    const box = document.createElement('div');
    box.style.cssText = `position:fixed;left:-10000px;top:0;width:${w / 4}px;height:${h / 4}px;visibility:hidden;pointer-events:none`;
    document.body.append(box);
    const m = new MindARThree({container: box, imageTargetSrc: 'assets/targets.mind', maxTrack: 1, uiLoading: 'no', uiScanning: 'no', uiError: 'no'});
    const stream = cv.captureStream(5);
    const paint = setInterval(() => { g.fillStyle = '#777'; g.fillRect(0, 0, w, h); }, 100);
    m._startVideo = () => new Promise(res => {
      const v = m.video = document.createElement('video');
      v.muted = true; v.playsInline = true; v.setAttribute('playsinline', '');
      v.addEventListener('loadedmetadata', () => { v.setAttribute('width', v.videoWidth); v.setAttribute('height', v.videoHeight); res(); }, {once: true});
      box.append(v); v.srcObject = stream; v.play().catch(() => {});
    });
    try { await m.start(); } catch (e) {}
    try { m.stop(); } catch (e) {}
    try { m.renderer.dispose(); } catch (e) {}
    clearInterval(paint); stream.getTracks().forEach(t => t.stop()); box.remove();
  })();
  return prewarmed;
}
async function openCamera() {
  /* continuous focus keeps the small printed number sharp on cameras that support it */
  const want = {audio: false, video: {facingMode: {ideal: 'environment'}, width: {ideal: 1280}, height: {ideal: 720}, advanced: [{focusMode: 'continuous'}]}};
  try { return await navigator.mediaDevices.getUserMedia(want); }
  catch (e) {
    if (e && (e.name === 'NotAllowedError' || e.name === 'SecurityError')) throw e;
    if (e && e.name === 'OverconstrainedError') return navigator.mediaDevices.getUserMedia({audio: false, video: {facingMode: 'environment'}});
    /* a camera still releasing from the last session can fail once */
    await new Promise(r => setTimeout(r, 700));
    return navigator.mediaDevices.getUserMedia(want);
  }
}
async function startAR() {
  mode = 'ar';
  window.__arStart = performance.now();
  const stream = await openCamera();
  /* if the background warm-up is still running, let it finish rather than compile twice */
  if (prewarmed) await Promise.race([prewarmed, new Promise(r => setTimeout(r, 5000))]);
  show('#ar'); document.body.classList.add('scanning');
  mindar = new MindARThree({
    container: $('#stage'), imageTargetSrc: 'assets/targets.mind', maxTrack: 1,
    uiLoading: 'no', uiScanning: 'no', uiError: 'no',
    /* One Euro filter: minCF steadies the card at rest, beta lets it keep up when it moves.
       (beta .001 made the overlay trail behind a moving card.) */
    filterMinCF: .001, filterBeta: 10, warmupTolerance: 2, missTolerance: 8,
  });
  /* hand MindAR our stream instead of letting it ask again; the room shows as soon as the
     video plays, while the tracker warms up behind it (the slow part, a few seconds) */
  mindar._startVideo = () => new Promise((resolve, reject) => {
    const v = mindar.video = document.createElement('video');
    v.setAttribute('autoplay', ''); v.setAttribute('muted', ''); v.setAttribute('playsinline', ''); v.muted = true;
    Object.assign(v.style, {position: 'absolute', top: '0px', left: '0px', width: '100%', height: '100%', zIndex: '-2'});
    $('#stage').appendChild(v);
    v.addEventListener('loadedmetadata', () => {
      v.setAttribute('width', v.videoWidth); v.setAttribute('height', v.videoHeight);
      show('#boot', false); hint('warming');
      if (DEBUG) (window.__m = window.__m || {}).cam = Math.round(performance.now() - window.__arStart);
      resolve();
    }, {once: true});
    v.addEventListener('error', () => reject(new Error('video failed')), {once: true});
    v.srcObject = stream;
    v.play().catch(() => {});
  });
  ({renderer, scene, camera} = mindar);
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;      /* the shader writes display values directly */
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 3));   /* sharp on retina screens */
  anchor = mindar.addAnchor(0);
  hintState = '';
  buildCard();
  anchor.onTargetFound = () => {
    visible = true; foundAt = performance.now();
    if (DEBUG && window.__m && !window.__m.found) window.__m.found = Math.round(performance.now() - window.__arStart);
    /* back after a real loss: jump, don't glide; but a card already shown glides, so it never pops */
    if (performance.now() - lostAt > 400 && locked === null) needSnap = true;
    jumpN = 0;
    if (locked === null) hint('reading');
  };
  anchor.onTargetLost = () => {
    visible = false; lostAt = performance.now();
    /* half-built votes are kept through a blink of lost tracking (they expire by age in
       identify); only a real loss clears them, so the next card starts clean */
    if (locked === null) setTimeout(() => { if (!visible && locked === null) { votes.length = 0; hint('looking'); } }, 500);
  };
  /* tap the AR card to flip it */
  renderer.domElement.style.pointerEvents = 'auto';
  /* without this a phone treats a drag as a scroll and cancels the pointer mid-swipe */
  $('#stage').style.touchAction = 'none'; renderer.domElement.style.touchAction = 'none';
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  let down = null;
    /* finger-drag rotates the floating card; release keeps the angle */
  tilt.fx = 0; tilt.fy = 0; tilt.fl = false; tilt.lx = 0; tilt.ly = 0; tilt.vx = 0; tilt.vy = 0; tilt.lt = 0; tilt.z = 0;
  $('#stage').addEventListener('pointerdown', e => {
    if (e.target.closest('button,.sheet,.topbar,.hint')) return;
    down = {x: e.clientX, y: e.clientY};
    tilt.lx = e.clientX; tilt.ly = e.clientY; tilt.lt = performance.now();
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch (_) {}
    if (floating) { askMotion(); tilt.fl = true; tilt.vx = tilt.vy = 0; }
  });
  $('#stage').addEventListener('pointermove', e => {
    if (!down || !floating) return;
    if (!tilt.fl) { tilt.fl = true; tilt.vx = tilt.vy = 0; }   /* it lifted while the finger was down */
    e.preventDefault();
    const dx = e.clientX - tilt.lx, dy = e.clientY - tilt.ly;
    tilt.lx = e.clientX; tilt.ly = e.clientY;
    const tn = performance.now(), dts = Math.max(.008, (tn - tilt.lt) / 1000); tilt.lt = tn;
    const g = 0.014;                                   /* a normal swipe turns it a good way */
    tilt.fy += dx * g;                                /* sideways drags turn it; up and down don't */
    tilt.fy = THREE.MathUtils.clamp(tilt.fy, -3.4, 3.4);
    /* velocity, smoothed so one jumpy sample doesn't fling it */
    tilt.vy += (dx * g / dts - tilt.vy) * .5;
    tilt.drag = {x: 0, y: tilt.fy};
  });
  $('#stage').addEventListener('pointercancel', () => { tilt.drag = null; tilt.fl = false; down = null; });
  $('#stage').addEventListener('pointerup', e => {
    const dragged = !!tilt.drag && Math.hypot((down?.x||0) - e.clientX, (down?.y||0) - e.clientY) > 10;
    if (performance.now() - tilt.lt > 90) tilt.vx = tilt.vy = 0;   /* held still before lifting: no fling */
    tilt.vx = THREE.MathUtils.clamp(tilt.vx, -9, 9); tilt.vy = THREE.MathUtils.clamp(tilt.vy, -12, 12);
    tilt.drag = null; tilt.fl = false; down = null;
    if (dragged || locked === null || !cardGroup.visible) return;
    const r = renderer.domElement.getBoundingClientRect();
    ndc.set((e.clientX - r.left) / r.width * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    if (ray.intersectObjects([cardFront, cardBack]).length) flipTo(flipTarget ? 0 : 1);
  });
  /* the camera can hang without throwing (a permission sheet left open), so give up after a while */
  const timeout = new Promise((_, rej) => setTimeout(() => rej(new Error('camera timed out')), 15000));
  await Promise.race([mindar.start(), timeout]);
  if (!mindar.video || !mindar.video.videoWidth) await new Promise(r => setTimeout(r, 600));
  if (!mindar.video || !mindar.video.srcObject) throw new Error('no camera stream');
  searchSince = performance.now(); hint('looking');
  if (DEBUG) (window.__m = window.__m || {}).ready = Math.round(performance.now() - window.__arStart);
  const veil = document.createElement('div'); veil.className = 'veil';
  $('#stage').insertBefore(veil, renderer.domElement);
  renderer.setAnimationLoop(frame);
  if (DEBUG) $('#debug').style.display = 'block';
}
function stopAR() {
  if (!mindar) return;
  try { renderer.setAnimationLoop(null); mindar.stop(); } catch (e) {}
  /* stop() needs a finished controller; if startup failed half way, free the camera here */
  try { mindar.video && mindar.video.srcObject && mindar.video.srcObject.getTracks().forEach(t => t.stop()); } catch (e) {}
  $('#stage').innerHTML = ''; mindar = null; locked = null; visible = false;
  /* leave nothing half-done for the next session */
  floating = lifting = false; liftAt = flipAt = 0; needSnap = true; votes.length = 0; visF = 0;
  showPrompt(false); hint('');
  show('#ar', false); document.body.classList.remove('scanning');
}

/* ================================ GRID ==================================== */
let cameraOK = false;
function buildGrid() {
  const d = $('#deck');
  CARDS.forEach(c => {
    const b = document.createElement('button');
    const img = new Image(); img.loading = 'lazy'; img.alt = c.num; img.onload = () => img.classList.add('ok');
    img.src = `assets/cards/thumb-${pad(c.id)}.jpg`;
    b.append(img); b.insertAdjacentHTML('beforeend', `<span>${c.num}</span>`);
    b.onclick = () => openView(c);
    d.append(b);
  });
}
function openGrid(note) {
  stopAR(); mode = 'grid';
  $('#gridNote').textContent = note || '';
  $('#bGridScan').style.display = cameraOK || window.isSecureContext ? '' : 'none';
  show('#sheet', false); show('#grid');
}
let flipTimer = 0;
function openView(c) {
  mode = 'grid'; setColours(c); fillSheet(c);
  const card = $('#card2d');
  card.classList.remove('flipped'); show('#sheet', false);
  card.querySelector('.num img').src = `assets/cards/num-${pad(c.id)}.jpg`;
  card.querySelector('.emo img').src = `assets/cards/face-${pad(c.id)}.jpg`;
  show('#view');
  startViewGL(c);
  clearTimeout(flipTimer); flipTimer = setTimeout(() => flip2d(true), 2 * T.l * 1000);   /* the ripple plays, then it turns */
}
function flip2d(on) {
  const card = $('#card2d');
  card.classList.toggle('flipped', on);
  clearTimeout(flipTimer);
  if (on) flipTimer = setTimeout(() => show('#sheet'), 1000); else show('#sheet', false);
}
function closeView() { show('#sheet', false); show('#view', false); stopViewGL(); }

/* ---- the deck view's card: the same holographic surface as the scanner ----
   its own small renderer, sharing the shader and the textures. The finger spin and the
   tap-to-flip still live on #card2d; this just draws what they say. */
let vgl = null;
function startViewGL(c) {
  try {
    if (!vgl) {
      const cv = document.createElement('canvas'); cv.className = 'viewgl';
      card2d.append(cv);
      const r = new THREE.WebGLRenderer({canvas: cv, alpha: true, antialias: true});
      r.outputColorSpace = THREE.LinearSRGBColorSpace;      /* the shader writes display values directly */
      const sc = new THREE.Scene(), cam = new THREE.PerspectiveCamera(30, 1 / ASPECT, .1, 50);
      const pad = 1.18;                                      /* room round the card for its turn */
      cam.position.z = ASPECT * pad / (2 * Math.tan(THREE.MathUtils.degToRad(15)));
      const g = new THREE.PlaneGeometry(1, ASPECT), card = new THREE.Group();
      const front = new THREE.Mesh(g, holoMat(null, true)), back = new THREE.Mesh(g, holoMat(null, false));
      back.rotation.y = Math.PI; card.add(front, back); sc.add(card);
      for (const m of [front.material, back.material]) { m.uniforms.uOpacity.value = 1; m.uniforms.uReveal.value = 1; }
      vgl = {r, sc, cam, card, front, back, cv, raf: 0, flip: 0, t0: 0, last: 0};
    }
    for (const m of [vgl.front.material, vgl.back.material]) { m.uniforms.uA.value.set(c.a); m.uniforms.uB.value.set(c.b); }
    Promise.all([tex(`assets/cards/num-${pad(c.id)}.jpg`), tex(`assets/cards/face-${pad(c.id)}.jpg`)]).then(([tn, tf]) => {
      if (!vgl) return;
      vgl.front.material.uniforms.map.value = tn; vgl.back.material.uniforms.map.value = tf;
      card2d.classList.add('gl');
    }).catch(() => {});
    vgl.flip = 0; vgl.t0 = vgl.last = performance.now();
    const size = () => { const b = card2d.getBoundingClientRect(); vgl.r.setPixelRatio(Math.min(3, devicePixelRatio || 1)); vgl.r.setSize(b.width * 1.18, b.height * 1.18, false); };
    size(); addEventListener('resize', size);
    const step = now => {
      const dt = Math.min(.05, (now - vgl.last) / 1000); vgl.last = now;
      const target = card2d.classList.contains('flipped') ? 1 : 0;
      vgl.flip += Math.sign(target - vgl.flip) * Math.min(Math.abs(target - vgl.flip), dt / T.l);
      const ry = Math.PI * ease(vgl.flip) + THREE.MathUtils.degToRad(spin.ry);    /* upright axis only */
      vgl.card.rotation.set(0, ry, 0);
      vgl.card.position.z = Math.sin(Math.PI * vgl.flip) * .16;
      const nx = Math.sin(ry), nz = Math.cos(ry), t = (now - vgl.t0) / 1000;
      for (const m of [vgl.front.material, vgl.back.material]) {
        m.uniforms.uTime.value = t; m.uniforms.uView.value.set(nx, 0); m.uniforms.uFres.value = 1 - Math.abs(nz);
      }
      vgl.front.material.uniforms.uRip.value = t;             /* the ripple plays as the card opens */
      const sp = Math.min(1, Math.abs(spin.vy) / 600);
      vgl.front.material.uniforms.uCA.value = vgl.back.material.uniforms.uCA.value = .012 * Math.max(Math.sin(Math.PI * vgl.flip), sp);
      vgl.r.render(vgl.sc, vgl.cam);
      vgl.raf = requestAnimationFrame(step);
    };
    cancelAnimationFrame(vgl.raf); vgl.raf = requestAnimationFrame(step);
  } catch (e) { console.warn('deck view stays flat', e); card2d.classList.remove('gl'); }
}
function stopViewGL() { if (vgl) { cancelAnimationFrame(vgl.raf); vgl.raf = 0; } card2d.classList.remove('gl'); }
/* the card turns in 3d under a finger or the mouse, keeps a little spin after, and eases back */
const spin = {rx: 0, ry: 0, vx: 0, vy: 0, down: null, moved: false, raf: 0, lt: 0};
const card2d = $('#card2d');
function spinApply() { card2d.style.setProperty('--rx', spin.rx.toFixed(2) + 'deg'); card2d.style.setProperty('--ry', spin.ry.toFixed(2) + 'deg'); }
function spinLoop(t0) {
  let last = performance.now();
  const step = now => {
    const dt = Math.min(.05, (now - last) / 1000); last = now;
    if (!spin.down) {
      spin.vx *= Math.exp(-dt * 3); spin.vy *= Math.exp(-dt * 3);
      spin.rx += spin.vx * dt; spin.ry += spin.vy * dt;
      /* a soft spring home, so it never stays stuck sideways */
      spin.rx += (0 - spin.rx) * (1 - Math.exp(-dt * 1.6));
      spin.ry += (0 - spin.ry) * (1 - Math.exp(-dt * 1.6));
      spin.rx = Math.max(-70, Math.min(70, spin.rx));
      if (Math.abs(spin.rx) + Math.abs(spin.ry) + Math.abs(spin.vx) + Math.abs(spin.vy) < .05) {
        spin.rx = spin.ry = spin.vx = spin.vy = 0; spinApply(); card2d.classList.remove('spin'); spin.raf = 0; return;
      }
    }
    spinApply(); spin.raf = requestAnimationFrame(step);
  };
  if (!spin.raf) spin.raf = requestAnimationFrame(step);
}
card2d.addEventListener('pointerdown', e => {
  spin.down = {x: e.clientX, y: e.clientY}; spin.lx = e.clientX; spin.ly = e.clientY; spin.lt = performance.now();
  spin.moved = false; spin.vx = spin.vy = 0;
  try { card2d.setPointerCapture(e.pointerId); } catch (_) {}
});
card2d.addEventListener('pointermove', e => {
  if (!spin.down) return;
  e.preventDefault();
  if (!spin.moved && Math.hypot(e.clientX - spin.down.x, e.clientY - spin.down.y) < 8) return;
  if (!spin.moved) { spin.moved = true; card2d.classList.add('spin'); spinLoop(); }
  const tn = performance.now(), dts = Math.max(.008, (tn - spin.lt) / 1000);
  const dx = e.clientX - spin.lx, dy = e.clientY - spin.ly, g = .55;   /* degrees per pixel */
  spin.lx = e.clientX; spin.ly = e.clientY; spin.lt = tn;
  spin.ry += dx * g;                                     /* upright axis only */
  spin.vy += (dx * g / dts - spin.vy) * .5;
});
const spinEnd = () => {
  if (!spin.down) return;
  if (performance.now() - spin.lt > 90) spin.vx = spin.vy = 0;
  spin.vx = Math.max(-900, Math.min(900, spin.vx)); spin.vy = Math.max(-1400, Math.min(1400, spin.vy));
  spin.down = null;
};
card2d.addEventListener('pointerup', spinEnd);
card2d.addEventListener('pointercancel', spinEnd);
card2d.onclick = () => { if (spin.moved) { spin.moved = false; return; } flip2d(!card2d.classList.contains('flipped')); };
$('#bViewBack').onclick = closeView;
/* how to use, from the scanner: the camera stops, and comes back with 'begin scanning' */
$('#bArHow').onclick = () => { stopAR(); location.hash = 'how'; };
$('#bGridScan').onclick = () => { show('#grid', false); show('#view', false); boot(); };

/* ---- home + how to use (hash routes, so the phone's back gesture works) ---- */
let wasHome = true;
function route() {
  const h = location.hash, home = h === '' || h === '#';
  show('#how', h === '#how');
  show('#home', home);
  if (home && !wasHome) dropCards();                  /* coming back: the cards fall again */
  wasHome = home;
  if (h === '#how') $('#how').scrollTop = 0;
}
addEventListener('hashchange', route);
/* iOS shows one permission sheet at a time: asking for motion in the same tap as the
   camera can leave the camera request stuck behind it. So the begin tap asks only for
   the camera, and motion is asked on the first tap once the card is floating. */
let motionAsked = false;
const askMotion = () => {
  if (motionAsked) return; motionAsked = true;
  /* iOS keeps motion and orientation under one permission: ask once inside the tap, then
     the second request resolves from the answer without a second sheet */
  const orient = () => { try { if (window.DeviceOrientationEvent && DeviceOrientationEvent.requestPermission) DeviceOrientationEvent.requestPermission().catch(() => {}); } catch (e) {} };
  try {
    if (window.DeviceMotionEvent && DeviceMotionEvent.requestPermission)
      DeviceMotionEvent.requestPermission().then(r => { if (r === 'granted') listenMotion(); orient(); }).catch(orient);
    else orient();
  } catch (e) { orient(); }
};
const begin = () => { history.replaceState(null, '', location.pathname + location.search); show('#home', false); show('#how', false); boot(); };
$('#bBegin').onclick = begin;
$('#bHowBegin').onclick = begin;
$('#bHow').onclick = () => { location.hash = 'how'; };
$('#bHowBack').onclick = () => history.length > 1 && location.hash === '#how' ? history.back() : (location.hash = '');
$('#bHowDeck').onclick = () => { history.replaceState(null, '', location.pathname + location.search); show('#how', false); openGrid(); };

/* ================================ BOOT ==================================== */
/* the scanner opens straight away; the grid is only for when the camera can't */
async function boot() {
  show('#boot'); $('#bootTx').textContent = 'opening the camera';
  if (!window.isSecureContext || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    show('#boot', false);
    return openGrid(window.isSecureContext ? 'this browser has no camera access. choose your card below.'
      : 'scanning needs a secure (https) link. choose your card below.');
  }
  try {
    await startAR();                                 /* openCamera retries a busy camera once */
    cameraOK = true;
    show('#boot', false);
  } catch (e) {
    console.warn(e);
    stopAR(); show('#boot', false);
    /* MindAR rejects with nothing at all when permission is refused */
    const denied = !e || /denied|notallowed|permission/i.test(`${e.name} ${e.message}`);
    openGrid(denied ? 'the camera is off, so choose your card below. to scan, allow camera access for this site in settings.'
      : `the camera couldn’t start${e && e.message ? ` (${e.message})` : ''}, so choose your card below.`);
  }
}
/* home backdrop: one card's gradient + aura colours; shake picks a new one */
let homeGradId = null;
function setHomeGradient(preferFresh = true) {
  let c = CARDS[Math.floor(Math.random() * CARDS.length)];
  if (preferFresh && CARDS.length > 1) {
    for (let n = 0; n < 12; n++) {
      const t = CARDS[Math.floor(Math.random() * CARDS.length)];
      if (t.id !== homeGradId) { c = t; break; }
    }
  }
  homeGradId = c.id;
  setColours(c);
  const art = document.documentElement.style;
  const bg = document.querySelector('.artbg');
  const apply = () => art.setProperty('--art', `url(assets/cards/thumb-${pad(c.id)}.jpg)`);   /* blurred anyway */
  if (bg && preferFresh && homeGradId != null) {
    bg.style.opacity = '0';
    setTimeout(() => { apply(); bg.style.opacity = ''; }, 280);
  } else apply();
}
setHomeGradient(false);
/* the opening: a handful of cards drop fast across the whole screen (a quick sway,
   flutter and tilt in 3-D that dies away as they come down), and land clean, with no
   rebound, into a loose pile. Then the words arrive. */
function dropCards() {
  const box = $('#drops'); box.innerHTML = ''; pile.length = 0; shuffling = false;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { $('#home').classList.add('landed'); return; }
  $('#home').classList.remove('landed');
  /* a jittered grid shaped to the screen: 3 × 5 on a phone held upright, 5 × 3 sideways,
     so the pile reaches every edge and corner instead of gathering in the middle */
  const wide = innerWidth > innerHeight, cols = wide ? 5 : 3, rows = wide ? 3 : 5;
  const N = cols * rows, r = (a, b) => a + Math.random() * (b - a);
  const ids = [...CARDS].sort(() => Math.random() - .5).slice(0, N);
  pileGrid = {cols, rows};
  const order = [...Array(N).keys()].sort(() => Math.random() - .5);   /* which screen slot each card takes */
  let end = 0;
  ids.forEach((c, i) => {
    const img = document.createElement('div'); img.className = 'dc';
    const im = new Image(); im.src = `assets/cards/thumb-${pad(c.id)}.jpg`; im.alt = ''; img.append(im);
    box.append(img);
    /* where it lands: spread across the whole screen, on a jittered grid so no two
       cards bunch up and no corner is left empty */
    const slot = order[i];
    const cx = (slot % cols + .5) / cols - .5, cy = (Math.floor(slot / cols) + .5) / rows - .5;
    /* ±0.4 of the screen from the centre at the outer slots, plus jitter up to a third of
       a cell, so edge cards hang a little off the screen */
    const {x: x1, y: y1} = slotXY(slot, cols, rows);
    const r1 = r(-30, 30), x0 = x1 + r(-24, 24), r0 = r(-160, 160);
    /* paper falling: it rocks side to side on the air, leans into each drift, slows as it
       meets the pile and settles flat, no bounce */
    const sway = r(5, 11) * (Math.random() < .5 ? -1 : 1), swayF = r(.9, 1.5), ph = r(0, 6.28);
    const flutX = r(14, 30), flutY = r(10, 24), flutF = r(1.1, 1.9);
    const dur = T.l * 1000 * r(.8, 1.1), delay = i * T.s * 1000 * r(.14, .2) + r(0, T.s * 300);
    end = Math.max(end, delay + dur);
    setTimeout(() => buzz(6), delay + dur);             /* a light tap as each one lands */
    const K = 40, frames = [];
    for (let k = 0; k <= K; k++) {
      const t = k / K;
      const fall = ease(t);
      /* the rocking grows in mid-air and dies away before it lands */
      const env = Math.sin(Math.PI * Math.min(1, t * 1.15)) * Math.pow(1 - t, .8);
      const w = t * swayF * 6.283 + ph, sw = Math.sin(w), lean = Math.cos(w);
      const x = x1 + (x0 - x1) * (1 - fall) + sway * sw * env;
      const y = -125 + (y1 + 125) * fall;
      /* a tiny settle: the last few degrees of turn ease in just after it touches */
      const rz = r0 + (r1 - r0) * fall + 9 * lean * env;
      const rx = flutX * Math.sin(t * flutF * 6.283 + ph) * env, ry = flutY * lean * env;
      const sc = 1 + .05 * (1 - fall);                 /* a touch closer while it's high */
      frames.push({offset: t, transform: `translate3d(${x.toFixed(2)}vw,${y.toFixed(2)}vh,0) rotateZ(${rz.toFixed(1)}deg) rotateX(${rx.toFixed(1)}deg) rotateY(${ry.toFixed(1)}deg) scale(${sc.toFixed(3)})`,
        boxShadow: `0 ${(26 - 16 * fall).toFixed(0)}px ${(60 - 34 * fall).toFixed(0)}px -12px rgba(0,0,0,${(.22 + .38 * fall).toFixed(2)})`});
    }
    img.animate(frames, {duration: dur, delay, easing: 'linear', fill: 'both'});
    img.style.zIndex = i;
    pile.push({el: img, id: c.id, x: x1, y: y1, r: r1});
  });
  setTimeout(() => $('#home').classList.add('landed'), end + T.s * 1000);
}
/* a landing spot on the jittered screen grid, in vw / vh from the centre: ±0.4 of the
   screen at the outer slots, plus jitter up to a third of a cell, so edge cards hang a
   little off the screen */
function slotXY(slot, cols, rows) {
  const cx = (slot % cols + .5) / cols - .5, cy = (Math.floor(slot / cols) + .5) / rows - .5;
  return {x: cx * 96 + (Math.random() * 2 - 1) * 32 / cols, y: cy * 96 + (Math.random() * 2 - 1) * 30 / rows};
}

/* ---- shake to shuffle ----
   on home, shaking the phone rattles the pile, lifts every card, and lays them down in
   new places; a few are swapped for other cards from the deck. Tilting the phone slides
   the cards' sheen, so they catch the light like the printed foil. */
const pile = [];
let pileGrid = {cols: 3, rows: 5}, shuffling = false;
function shuffleCards(power = 1) {
  const home = $('#home');
  if (shuffling || !pile.length || !home.classList.contains('on') || !home.classList.contains('landed')) return;
  shuffling = true; power = Math.max(.6, Math.min(1.6, power));
  home.classList.add('shaking');
  buzz([18, 40, 26, 40, 18]);
  setHomeGradient(true);   /* shake also rolls a new backdrop gradient */
  const r = (a, b) => a + Math.random() * (b - a), {cols, rows} = pileGrid;
  const order = [...Array(pile.length).keys()].sort(() => Math.random() - .5);
  /* a third of the pile comes back as different cards */
  const shown = new Set(pile.map(p => p.id));
  const spare = CARDS.filter(c => !shown.has(c.id)).sort(() => Math.random() - .5);
  const z = [...Array(pile.length).keys()].sort(() => Math.random() - .5);
  let end = 0;
  pile.forEach((p, i) => {
    const {x: x1, y: y1} = slotXY(order[i], cols, rows), r1 = r(-30, 30);
    const swap = Math.random() < .34 && spare.length ? spare.pop() : null, pre = swap && new Image();
    if (pre) pre.src = `assets/cards/thumb-${pad(swap.id)}.jpg`;
    const spin = r(-70, 70) * power, lift = r(1.06, 1.14);
    const fx = r(16, 34) * (Math.random() < .5 ? -1 : 1), fy = r(12, 26), ph = r(0, 6.28);
    const dur = T.l * 1000 * r(.65, .8), delay = r(0, T.s * 300);
    end = Math.max(end, delay + dur);
    const T = (x, y, rz, s = 1, rx = 0, ry = 0) =>
      `translate3d(${x.toFixed(2)}vw,${y.toFixed(2)}vh,0) rotateZ(${rz.toFixed(1)}deg) rotateX(${rx.toFixed(1)}deg) rotateY(${ry.toFixed(1)}deg) scale(${s.toFixed(3)})`;
    const frames = [{offset: 0, transform: T(p.x, p.y, p.r), boxShadow: '0 10px 26px -12px rgba(0,0,0,.6)'}];
    /* the rattle: quick shrinking jolts where it lies */
    const J = 6;
    for (let k = 1; k <= J; k++) {
      const a = (1 - k / (J + 1)) * 1.8 * power, sgn = k % 2 ? 1 : -1;
      frames.push({offset: .34 * k / J, transform: T(p.x + sgn * a * r(.6, 1.2), p.y + r(-.5, .5) * a, p.r + sgn * a * 2.4)});
    }
    /* the toss: up off the pile, a tumble through the air, down in its new place,
       easing to a stop with no rebound */
    const K = 12;
    for (let k = 1; k <= K; k++) {
      const t = k / K, e = t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2, hump = Math.sin(Math.PI * t);
      frames.push({offset: .34 + .66 * t,
        transform: T(p.x + (x1 - p.x) * e, p.y + (y1 - p.y) * e - 4 * hump * power, p.r + (r1 + spin - p.r) * e - spin * Math.pow(t, 3),
          1 + (lift - 1) * hump, fx * Math.sin(t * 6.283 + ph) * hump, fy * Math.cos(t * 4.7 + ph) * hump),
        boxShadow: `0 ${(10 + 22 * hump).toFixed(0)}px ${(26 + 34 * hump).toFixed(0)}px -12px rgba(0,0,0,${(.6 - .25 * hump).toFixed(2)})`});
    }
    p.el.getAnimations().forEach(a => a.cancel());
    p.el.animate(frames, {duration: dur, delay, easing: 'linear', fill: 'both'});
    setTimeout(() => {
      p.el.style.zIndex = z[i];
      if (pre && pre.complete && pre.naturalWidth) { p.el.querySelector('img').src = pre.src; p.id = swap.id; }
    }, delay + dur * .67);
    if (i % 3 === 0) setTimeout(() => buzz(6), delay + dur);
    Object.assign(p, {x: x1, y: y1, r: r1});
  });
  setTimeout(() => { shuffling = false; home.classList.remove('shaking'); }, end + 120);
}
/* shake detection: several hard jolts inside ~0.7 s. Uses acceleration without gravity
   where the phone gives it, otherwise the change in acceleration-with-gravity. */
let motionOn = false, jolts = [], lastAG = null, lastShake = 0, gx = 0, gy = 0, gRaf = 0;
function onMotion(e) {
  const now = performance.now(), ag = e.accelerationIncludingGravity;
  if (ag && ag.x != null) {
    /* tilt → sheen: smoothed gravity, -1…1 */
    const flip = innerWidth > innerHeight ? -1 : 1;
    gx += (Math.max(-1, Math.min(1, ag.x / 7)) * flip - gx) * .12;
    gy += (Math.max(-1, Math.min(1, ag.y / 7)) - gy) * .12;
    if (!gRaf) gRaf = requestAnimationFrame(() => { gRaf = 0; const d = $('#drops'); d.style.setProperty('--gx', gx.toFixed(3)); d.style.setProperty('--gy', gy.toFixed(3)); });
  }
  if (!$('#home').classList.contains('on')) return;
  let m = 0;
  const a = e.acceleration;
  if (a && a.x != null) m = Math.hypot(a.x, a.y, a.z);
  else if (ag && ag.x != null) { if (lastAG) m = Math.hypot(ag.x - lastAG[0], ag.y - lastAG[1], ag.z - lastAG[2]); lastAG = [ag.x, ag.y, ag.z]; }
  if (m > 13) { jolts.push({t: now, m}); }
  jolts = jolts.filter(j => now - j.t < 700);
  if (jolts.length >= 3 && now - lastShake > 1500) {
    lastShake = now;
    const peak = Math.max(...jolts.map(j => j.m)); jolts = [];
    shuffleCards(peak / 20);
  }
}
function listenMotion() { if (motionOn) return; motionOn = true; addEventListener('devicemotion', onMotion); }
/* listen straight away: Android sends motion without asking. iOS (and newer Chrome, which
   also has requestPermission) sends nothing until a tap asks; the listener just waits */
const motionNeedsAsk = !!(window.DeviceMotionEvent && DeviceMotionEvent.requestPermission);
if (window.DeviceMotionEvent) listenMotion();
$('#home').addEventListener('pointerdown', e => { if (motionNeedsAsk && !e.target.closest('#bBegin,#bHowBegin')) askMotion(); });
/* on a desktop: S shuffles, the pointer moves the sheen */
addEventListener('keydown', e => { if ((e.key === 's' || e.key === 'S') && !e.metaKey && !e.ctrlKey) shuffleCards(1); });
$('#home').addEventListener('pointermove', e => {
  if (e.pointerType !== 'mouse') return;
  const d = $('#drops'); d.style.setProperty('--gx', (e.clientX / innerWidth * 2 - 1).toFixed(3)); d.style.setProperty('--gy', (e.clientY / innerHeight * 2 - 1).toFixed(3));
});

/* film grain that changes every frame: eight noise tiles, made once, cycled ~12 times a
   second and nudged so the pattern never repeats in place. Still under reduced motion. */
(() => {
  const el = $('.grain'); if (!el) return;
  const N = 8, S = 180, frames = [];
  for (let f = 0; f < N; f++) {
    const c = document.createElement('canvas'); c.width = c.height = S;
    const g = c.getContext('2d'), d = g.createImageData(S, S);
    for (let i = 0; i < d.data.length; i += 4) {
      const v = Math.random() * 255 | 0;
      d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255;
    }
    g.putImageData(d, 0, 0); frames.push(`url(${c.toDataURL()})`);
  }
  let k = 0;
  el.style.backgroundImage = frames[0];
  const root = document.documentElement.style; root.setProperty('--noise', frames[0]);
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  setInterval(() => {
    k = (k + 1) % N;
    const pos = `${Math.random() * S | 0}px ${Math.random() * S | 0}px`;
    el.style.backgroundImage = frames[k]; el.style.backgroundPosition = pos;
    root.setProperty('--noise', frames[k]); root.setProperty('--noise-pos', pos);
  }, 83);
})();

/* the press split on dark buttons: :active alone is too brief on a phone tap, so hold it
   for the short duration, then let it settle */
document.addEventListener('pointerdown', e => {
  const b = e.target.closest('.btn.ink,.btn.secondary,.small'); if (!b) return;
  b.classList.add('ca'); setTimeout(() => b.classList.remove('ca'), T.s * 1000);
}, {passive: true});

dropCards();
buildGrid();
/* the tracker's target file is fetched while the home screen is up, so 'begin' is quicker */
(window.requestIdleCallback || setTimeout)(() => fetch('assets/targets.mind').catch(() => {}));
/* once the home cards have landed, warm the tracker up in the background */
if (!/[?&]scan/.test(location.search)) setTimeout(() => (window.requestIdleCallback || setTimeout)(prewarm), 2500);
/* lands on the home screen; the camera only opens from 'begin scanning a card' */
route();
if (/[?&]scan/.test(location.search)) begin();
