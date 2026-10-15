'use strict';

/** EDIT CONTENT HERE.
 * Dimensions and tolerance are illustrative, not internship measurements.
 * Replace captions with your experience and swap #solid-bolt / #bolt-outline
 * in immensa.html for your own geometry.
 * To use a real image for any stage, add image:"assets/your-photo.jpg" and
 * imageAlt:"Description of your photo" to that stage below. Keep a common coordinate system so
 * scanning, mesh clipping and CAD overlays continue to line up.
 */
const STORY = {
  dimensions: { length: 60, diameter: 12, pitch: 1.75 },
  tolerance: 0.10,
  stages: [
    { short:'Part', verb:'Observe', title:'The part.', mode:'Physical part', caption:'Every digital model starts with something real. A simple bolt is the starting point for this walkthrough.', readout:'SPECIMEN 001 / HEX-HEAD BOLT', status:'Ready to scan', description:'A solid hex-head bolt centered on the workshop grid.' },
    { short:'Scan', verb:'Capture', title:'Read the surface.', mode:'Laser scanning', caption:'Laser lines sweep across the surface, capturing the part’s shape as a collection of points.', readout:'SURFACE CAPTURE / LASER SWEEP', status:'Scanning', description:'Orange laser lines sweep along the bolt, leaving scanned points and triangles behind.' },
    { short:'Mesh', verb:'Reconstruct', title:'Points become a mesh.', mode:'Scan reconstruction', caption:'The scan builds into a triangulated mesh: a digital record of the physical surface, ready for the next step.', readout:'SCAN DATA / TRIANGULATED SURFACE', status:'Mesh reconstructed', description:'A dense green triangulated mesh and point cloud replace the solid bolt.' },
    { short:'Import', verb:'Prepare', title:'Into the CAD workspace.', mode:'Mesh import', caption:'I bring the mesh into CAD software, where the captured geometry becomes a reference for rebuilding the part.', readout:'PART STUDIO / MESH REFERENCE', status:'Mesh imported', description:'The scanned bolt appears inside a generic CAD window with toolbars, a model tree, and a viewport.' },
    { short:'Align', verb:'Orient', title:'A common frame of reference.', mode:'Mesh → surface alignment', caption:'Using a mesh-to-surface alignment workflow, I rotate and position the scan against the reference axes.', readout:'DATUM ALIGNMENT / X · Y · Z', status:'Aligned to datum', description:'The angled mesh rotates and snaps onto the horizontal X axis; Y and Z reference axes are shown.' },
    { short:'Measure', verb:'Inspect', title:'Find the defining dimensions.', mode:'Measurement tools', caption:'Length, diameter, and thread pitch turn the mesh into a set of dimensions I can use to recreate the geometry.', readout:'DIMENSION EXTRACTION / EXAMPLE VALUES', status:'Dimensions extracted', description:'Dimension lines mark the bolt’s example length, diameter, and thread pitch.' },
    { short:'Rebuild', verb:'Model', title:'Rebuild with intent.', mode:'Parametric reconstruction', caption:'I select two points for the 60 mm length, set the sketch to Ø12 mm, then revolve the profile through 360° to form the shaft. Head and thread features finish the part.', readout:'PARAMETRIC MODEL / SKETCH · DIMENSION · REVOLVE', status:'Building the sketch', description:'An animated cursor selects length and diameter points, adds 60 mm and diameter 12 mm dimensions, then applies a full revolve to create the shaft. Head and thread features complete the bolt.' },
    { short:'Compare', verb:'Validate', title:'Close the loop.', mode:'Deviation analysis', caption:'I compare the scan with the rebuilt surface. Green is within tolerance; blue sits inward, and red extends outward.', readout:'SCAN ↔ CAD / SIGNED SURFACE DEVIATION', status:'Comparison visualized', description:'The bolt is mostly green with a few small blue inward and red outward patches. The example tolerance is plus or minus 0.10 millimeters.' }
  ]
};

const $ = id => document.getElementById(id);
const clamp = (value, min=0, max=1) => Math.min(max, Math.max(min, value));
const smooth = value => { const t=clamp(value); return t*t*(3-2*t); };
const mix = (a,b,t) => a+(b-a)*t;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const track = $('story');
const frame = document.querySelector('.story-frame');
const ns = 'http://www.w3.org/2000/svg';

// Build reusable geometry once. A fixed seed keeps the scan identical on reload.
let seed=47;
function random() { seed=(seed*16807)%2147483647; return (seed-1)/2147483646; }
function svgNode(tag, attributes) {
  const node=document.createElementNS(ns,tag);
  Object.entries(attributes).forEach(([key,value])=>node.setAttribute(key,value));
  return node;
}
for (let x=-79; x<147; x+=12) {
  const d=`M${x} -23 C${x+13} -15 ${x-9} 13 ${x+4} 24`;
  $('physical-threads').append(svgNode('path',{d}));
  $('cad-threads').append(svgNode('path',{d}));
}
const rows=9, columns=29, vertices=[];
for (let row=0;row<=rows;row++) {
  vertices[row]=[];
  for (let col=0;col<=columns;col++) {
    vertices[row][col]=[-183+col*12.5+(random()-.5)*5,-58+row*13+(random()-.5)*4];
  }
}
for (let row=0;row<rows;row++) for (let col=0;col<columns;col++) {
  const a=vertices[row][col], b=vertices[row][col+1], c=vertices[row+1][col], d=vertices[row+1][col+1];
  for (const triangle of [[a,b,c],[b,d,c]]) {
    const points=triangle.map(p=>p.join(',')).join(' ');
    $('mesh-faces').append(svgNode('polygon',{points,fill:`hsl(87 19% ${64+random()*17}%)`,'fill-opacity':'.34',stroke:'#5a7548','stroke-width':'.55'}));
  }
  $('mesh-points').append(svgNode('circle',{cx:a[0],cy:a[1],r:1.1,fill:'#416237'}));
}

// Navigation and the plain-text transcript share the same content source.
const buttons=STORY.stages.map((stage,index)=>{
  const button=document.createElement('button');
  button.type='button';
  button.className='stage-button';
  button.innerHTML=`<span>${String(index+1).padStart(2,'0')}</span>${stage.short}`;
  button.setAttribute('aria-label',`Stage ${index+1}: ${stage.title}`);
  button.addEventListener('click',()=>jumpTo(index));
  $('stage-nav').append(button);
  const li=document.createElement('li');
  const title=document.createElement('strong');
  title.textContent=stage.title;
  li.append(title,document.createTextNode(stage.caption));
  $('transcript').append(li);
  return button;
});
$('length-label').textContent=`${STORY.dimensions.length} mm`;
$('diameter-label').textContent=`Ø${STORY.dimensions.diameter}`;
$('sketch-length-text').textContent=`${STORY.dimensions.length} mm`;
$('sketch-diameter-text').textContent=`Ø${STORY.dimensions.diameter} mm`;
$('pitch-label').textContent=`P = ${STORY.dimensions.pitch} mm`;
const tol=STORY.tolerance.toFixed(2);
$('tolerance-label').textContent=`Example tolerance ±${tol} mm`;
$('negative-range').textContent=`< −${tol} mm`;
$('within-range').textContent=`−${tol} to +${tol} mm`;
$('positive-range').textContent=`> +${tol} mm`;

// Rebuild gets three scroll lengths, giving each click and the revolve room to read.
const stageLengths=[1,1,1,1,1,1,3,1];
const stageStarts=stageLengths.map((_,i)=>stageLengths.slice(0,i).reduce((a,b)=>a+b,0));
const totalLength=stageLengths.reduce((a,b)=>a+b,0);
let stageIndex=-1, pending=false, trackTop=0, stepHeight=window.innerHeight;
function measure() {
  trackTop=track.getBoundingClientRect().top+window.scrollY;
  stepHeight=(track.offsetHeight-frame.offsetHeight)/totalLength;
  requestRender();
}
function jumpTo(index) {
  // Land late enough in a step to show its completed state. Still fully reversible.
  window.scrollTo({top:trackTop+(stageStarts[index]+(index===6?.015:.78)*stageLengths[index])*stepHeight,behavior:reducedMotion.matches?'instant':'smooth'});
}
function opacity(id,value) { $(id).setAttribute('opacity',clamp(value).toFixed(3)); }
function updateCaption(index) {
  if (index===stageIndex) return;
  stageIndex=index;
  const stage=STORY.stages[index];
  $('stage-kicker').textContent=`${String(index+1).padStart(2,'0')} / ${stage.verb}`;
  $('stage-title').textContent=stage.title;
  $('stage-caption').textContent=stage.caption;
  $('mode-label').textContent=stage.mode;
  // Optional stage photographs replace only the drawing; navigation stays intact.
  const photo=$('stage-photo');
  photo.hidden=!stage.image;
  $('scene').style.display=stage.image?'none':'';
  if(stage.image) { photo.src=stage.image; photo.alt=stage.imageAlt||stage.description; }
  $('readout').textContent=stage.readout;
  $('status').textContent=stage.status;
  $('scene-description').textContent=stage.description;
  $('progress-label').textContent=`${String(index+1).padStart(2,'0')} / 08`;
  $('scroll-hint').textContent=index===7?'Continue to internship notes':'Scroll to follow the process';
  $('legend').hidden=index!==7;
  frame.classList.toggle('is-final',index===7);
  buttons.forEach((button,i)=>{
    if (i===index) button.setAttribute('aria-current','step');
    else button.removeAttribute('aria-current');
  });
}

/** Each viewport-length interval owns one stage. Values derive only from scroll
 * position, so scrolling backward, restoring scroll, and jumping always agree.
 * Reduced motion displays completed stage states without sweeps or rotation.
 */
function render() {
  pending=false;
  const position=clamp((window.scrollY-trackTop)/Math.max(1,stepHeight),0,totalLength-.001);
  let index=stageStarts.length-1;
  while(index>0&&position<stageStarts[index]) index--;
  const local=(position-stageStarts[index])/stageLengths[index];
  const p=reducedMotion.matches?1:smooth(local/.72);
  updateCaption(index);
  // Trim empty vertical margins on phones while retaining the full CAD window.
  $('scene').setAttribute('viewBox',window.innerWidth<=680?'15 60 770 395':'0 0 800 520');
  buttons.forEach((button,i)=>button.style.setProperty('--fill',i<index?1:i===index?Math.max(.08,local):0));

  const imported=index>3?1:index===3?p:0;
  const aligned=index>4?1:index===4?p:0;
  const rotation=mix(-19,0,aligned);
  const centerX=mix(400,448,imported)+25*aligned;
  const centerY=mix(270,260,imported)+25*aligned;
  const scale=mix(1.55,1.05,imported);
  $('part-position').setAttribute('transform',`translate(${centerX} ${centerY}) scale(${scale})`);
  $('part-rotation').setAttribute('transform',`rotate(${rotation})`);
  opacity('cad-window',imported);
  opacity('part-shadow',(1-imported)*.12);
  opacity('axes',index===4?p: index===5?.28:0);

  opacity('physical',index<2?1:index===2?1-p:0);
  opacity('scan-mesh',index===0?0:index===1?.85:index===6?.12:index===7?0:1);
  $('scan-reveal').setAttribute('width',index===0?0:index===1?350*p:350);
  opacity('mesh-points',index===2?1-p*.5:.5);
  opacity('scan-light',index===1&&!reducedMotion.matches&&p<1?1:0);
  const laserX=mix(-180,170,p);
  $('laser-line').setAttribute('d',`M${laserX} -72V72`);
  $('laser-blur').setAttribute('d',`M${laserX} -72V72`);
  $('laser-fan').setAttribute('d',`M${laserX-18} -105 ${laserX+18} -105 ${laserX+8} 72 ${laserX-8} 72Z`);
  $('laser-point').setAttribute('cx',laserX);
  if(index===1) $('status').textContent=`Scan ${Math.round(p*100)}%`;

  opacity('align-tool',index===4?1:0);
  $('align-label').textContent=p>.96?'Mesh → surface / Datum aligned ✓':'Mesh → surface / Aligning to datum…';
  $('tree-feature').textContent=index>=6?'⊞ Parametric solid':'⊞ Reference axes';
  $('tree-detail').textContent=index>=6?'— Sketch / features':index>=5?'— Aligned ✓':index===4&&p>.96?'— Aligned ✓':'— Unaligned';

  opacity('dim-length',index===5?smooth(p*3):0);
  opacity('dim-diameter',index===5?smooth((p-.25)*3):0);
  opacity('dim-pitch',index===5?smooth((p-.5)*3):0);
  opacity('clean-solid',index===6?(reducedMotion.matches?1:smooth((local-.90)/.08)):index===7?1-p:0);
  opacity('build-label',index===6?1:0);
  opacity('deviation',index===7?p:0);
  renderRebuild(index, reducedMotion.matches?1:local);
}
/** Rebuild substeps, normalized across its three viewport lengths.
 * Change point coordinates here if swapping the bolt geometry. No timer runs:
 * the cursor, click rings, dimensions and revolve all scrub with the scroll.
 */
function renderRebuild(index,t) {
  const active=index===6;
  opacity('rebuild-story',active?1:0);
  const completed=smooth((t-.90)/.08);
  const revolution=smooth((t-.64)/.25);
  opacity('sketch-profile',1-revolution);
  opacity('sketch-length',smooth((t-.20)/.04)*(1-completed));
  opacity('sketch-diameter',smooth((t-.44)/.04)*(1-completed));
  opacity('revolve-blank',revolution*(1-completed));
  opacity('revolve-sweep',t>=.64&&t<.90?1:0);
  opacity('revolve-command',1-completed);
  opacity('demo-cursor',active&&!reducedMotion.matches?1-completed:0);
  // Cursor pauses on four selected points, then clicks the Revolve command.
  const keys=[[0,-160,-85],[.07,-96,-24],[.11,-96,-24],[.18,162,-24],[.22,162,-24],[.31,-40,-24],[.35,-40,-24],[.42,-40,24],[.46,-40,24],[.57,25,-116],[.64,25,-116],[1,80,-90]];
  let k=0;while(k<keys.length-2&&t>keys[k+1][0])k++;
  const a=keys[k],b=keys[k+1],u=smooth((t-a[0])/(b[0]-a[0]));
  $('demo-cursor').setAttribute('transform',`translate(${mix(a[1],b[1],u)} ${mix(a[2],b[2],u)})`);
  const clicks=[[.08,-96,-24],[.19,162,-24],[.32,-40,-24],[.43,-40,24],[.60,25,-116]];
  const click=clicks.find(([time])=>t>=time&&t<time+.035);
  opacity('cursor-click',active&&click&&!reducedMotion.matches?1:0);
  if(click) {
    const q=(t-click[0])/.035;
    $('cursor-click').setAttribute('transform',`translate(${click[1]} ${click[2]})`);
    $('click-ring').setAttribute('r',4+q*10);
    $('click-ring').setAttribute('opacity',1-q);
  }
  const angle=revolution*Math.PI*2;
  $('revolve-profile').setAttribute('transform',`scale(1 ${Math.cos(angle)})`);
  const orbitX=33+14*Math.sin(angle),orbitY=-40*Math.cos(angle);
  $('revolve-tip').setAttribute('cx',orbitX);
  $('revolve-tip').setAttribute('cy',orbitY);
  $('revolve-orbit').setAttribute('d',`M33 -40 A14 40 0 ${revolution>.5?1:0} 1 ${orbitX} ${orbitY}`);
  $('revolve-command-bg').setAttribute('fill',t>=.60?'#cbd9bb':'#e3e8d8');
  if(active) {
    const instruction=t<.12?'Length / Click point 1':t<.24?'Length / Click point 2':t<.36?'Diameter / Click upper point':t<.48?'Diameter / Click lower point':t<.64?'Feature / Apply Revolve 360°':t<.90?`Revolve / ${Math.round(revolution*360)}° around axis`:'Finish / Add head + thread features';
    $('rebuild-instruction').textContent=instruction;
    $('status').textContent=t<.48?'Dimensioning the sketch':t<.90?'Revolving the shaft':'Solid reconstructed';
    $('tree-feature').textContent=t<.64?'⊞ Dimensioned sketch':'⊞ Revolve (360°)';
    $('tree-detail').textContent=t<.90?'— Axis / X':'— Head + thread';
  }
}
function requestRender() {
  if(!pending) { pending=true; window.requestAnimationFrame(render); }
}
window.addEventListener('scroll',requestRender,{passive:true});
window.addEventListener('resize',measure,{passive:true});
window.addEventListener('pageshow',measure);
reducedMotion.addEventListener('change',requestRender);
measure();
