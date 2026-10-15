
const projects=[{title:'Solenoid engine',category:'engines',type:'01 / Electromechanical systems',desc:'A project exploring electromagnetic actuation and the conversion of electrical energy into mechanical motion.',tags:'Electromagnetism · Mechanisms · Motion',color:'',shape:'grip',challenge:'Explore the relationship between solenoid actuation and mechanical motion.',approach:'Coming soon: the mechanism, component choices, assembly process, and build photographs.',validation:'Coming soon: operating observations, measurements, challenges, and lessons learned.'},{title:'Stirling engine',category:'engines',type:'02 / Thermal systems',desc:'A project exploring heat, cyclic motion, and the principles of external-combustion engines.',tags:'Thermodynamics · Heat transfer · Mechanisms',color:'dark',shape:'beam',challenge:'Explore how a temperature difference can produce mechanical motion.',approach:'Coming soon: engine configuration, materials, fabrication, and assembly details.',validation:'Coming soon: test conditions, operating observations, and opportunities for improvement.'},{title:'Solar charger',category:'energy',type:'03 / Renewable energy',desc:'A project exploring solar energy conversion and the practical design of a charging system.',tags:'Solar energy · Charging · System design',color:'peach',shape:'pcb',challenge:'Explore the use of solar energy for a practical charging application.',approach:'Coming soon: the panel, circuit, component choices, and system layout.',validation:'Coming soon: charging measurements, test conditions, and design lessons.'},{title:'Air cooler',category:'energy',type:'04 / Cooling systems',desc:'A project exploring airflow, heat transfer, and practical cooling for everyday use.',tags:'Airflow · Heat transfer · Prototyping',color:'',shape:'path',challenge:'Explore a practical approach to moving air and providing cooling.',approach:'Coming soon: the cooling principle, construction, components, and assembly.',validation:'Coming soon: temperature and airflow measurements, operating conditions, and refinements.'}];
const shapes={grip:'<g transform="translate(95 25) rotate(-12 100 100)" fill="none" stroke="currentColor" stroke-width="2"><path d="M65 100h85v75H65z" fill="#b8c2a8"/><path d="M65 115 25 70 40 22 62 30 57 66 90 100M150 115l40-45-15-48-22 8 5 36-33 34" fill="#cbd3be"/><circle cx="72" cy="114" r="10"/><circle cx="141" cy="114" r="10"/><path d="M90 175v20h35v-20M83 142h50m-50 9h50M28 15l-22 60m175-60 30 62"/><path d="M105 0v210" stroke-dasharray="3 6" stroke-width=".7"/></g>',pcb:'<g fill="none" stroke="currentColor" stroke-width="1.5"><rect x="100" y="40" width="210" height="150" rx="10"/><rect x="174" y="83" width="62" height="62" fill="#53694b"/><path d="M115 65h40v35h19m62 5h45V65h16M115 170h40v-40h19m62 0h45v40h16M190 83V55m14 28V55m14 28V55m-28 90v30m14-30v30m14-30v30"/><circle cx="120" cy="57" r="5"/><circle cx="290" cy="175" r="5"/><path d="M136 76h20m-20 7h20m98 67h15m-15 8h15"/></g>',path:'<g fill="none" stroke="#a89b84" stroke-width="1"><path d="M50 40h320v160H50zM90 40v160m40-160v160m40-160v160m40-160v160m40-160v160m40-160v160m40-160v160M50 80h320M50 120h320M50 160h320"/><path d="M130 80h40v80h-40zM250 40h40v80h-40z" fill="#c4b9a5"/><path d="m70 180 40-40V60h80v120h40v-40h80V60h40" stroke="#c45d35" stroke-width="4"/><circle cx="70" cy="180" r="6" fill="#c45d35"/><circle cx="350" cy="60" r="7" stroke="#c45d35" stroke-width="2"/></g>',beam:'<g fill="none" stroke="currentColor" stroke-width="1.4"><path d="m55 160 270-85 35 20-270 85z" fill="#c3ccb6"/><path d="M90 180v-60l270-85v60M55 160v-60l270-85 35 20M55 100l35 20"/><path d="m90 180 32-70 35 49 32-70 35 48 32-70 35 49 32-70 37 49"/><path d="m46 176-13 22h38zm312-65-13 22h38z" fill="#8c9d7c"/><path d="M150 20v50m-7-9 7 9 7-9M230 0v45m-7-9 7 9 7-9" stroke="#dc572c"/></g>'};

// Original project media. Add future photos/videos here using the same structure.
projects[0] = {...projects[0],
 desc:'A solenoid engine project, documented in a video of the physical prototype.',
 approach:'A video from the solenoid engine build.',
 media:[{type:'video',src:'assets/media/solenoid-demo.mp4',poster:'assets/media/solenoid-demo.jpg',caption:'Solenoid engine — prototype demonstration'}]
};
projects[1] = {...projects[1],
 desc:'A Stirling engine project, documented in a video of the prototype.',
 challenge:'Explore how a temperature difference can drive a mechanical engine.',
 approach:'A video from the Stirling engine build.',
 media:[
  {type:'video',src:'assets/media/stirling-demo-1.mp4',poster:'assets/media/stirling-demo-1.jpg',caption:'Stirling engine — prototype demonstration'}
 ]
};
projects[2] = {...projects[2],
 desc:'A solar charger built from small photovoltaic panels, hand-wired connections, and a voltage/current display.',
 challenge:'Connect individual solar panels into a practical charging prototype.',
 approach:'The build photos follow the panel wiring, mounted array, and display electronics.',
 media:[
  {type:'image',src:'assets/media/solar-wiring.jpeg',caption:'The panel array mounted on a board, with soldered interconnections.',alt:'Backs of small solar panels wired together with yellow wires on a rectangular board'},
  {type:'image',src:'assets/media/solar-assembly.jpg',caption:'Solar panels and wiring laid out during assembly.',alt:'Small photovoltaic panels connected by yellow and red wires on a workbench'},
  {type:'image',src:'assets/media/solar-controller.jpg',caption:'The display and adjustment board before enclosure assembly.',alt:'Circuit board with an LCD display, buttons, and two blue adjustment components'},
  {type:'image',src:'assets/media/solar-display.jpeg',caption:'A close-up of the voltage and current display during testing.',alt:'LCD display in a transparent housing showing voltage and current readings'}
 ]
};

function thumbnail(project,index) {
 const media=project.media?.[0];
 if(!media) return `<div class="art ${project.color}"><span class="number mono">0${index+1} / Project diagram</span><svg viewBox="0 0 420 230" aria-label="${project.title} concept diagram" role="img">${shapes[project.shape]}</svg></div>`;
 return `<a class="art real-media" href="#project-${index}" data-open-project="${index}" aria-label="View ${project.title} ${media.type==='video'?'videos':'photos'}"><img src="${media.poster||media.src}" alt="${media.alt||project.title+' prototype'}" loading="lazy"><span class="media-badge">${media.type==='video'?'▶ Watch video':'↗ 4 build photos'}</span></a>`;
}
document.querySelector('#project-grid').innerHTML=projects.map((p,i)=>`<article class="project" data-category="${p.category}">${thumbnail(p,i)}<div class="mono" style="margin-top:17px;color:#727b65">${p.type}</div><h3>${p.title}</h3><p>${p.desc}</p><div class="tags">${p.tags}</div><button class="case" data-project="${i}">${p.media?'View project '+(p.media[0].type==='video'?'videos':'gallery'):'Explore case study'} ↗</button></article>`).join('');

document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('[data-filter]').forEach(other=>{other.classList.toggle('active',other===button);other.setAttribute('aria-pressed',String(other===button));});
 document.querySelectorAll('.project').forEach(project=>project.classList.toggle('hidden',button.dataset.filter!=='all'&&project.dataset.category!==button.dataset.filter));
}));
const dialog=document.querySelector('#detail');
function mediaFigure(media) {
 const visual=media.type==='video'
  ? `<video controls playsinline preload="metadata" poster="${media.poster}" aria-label="${media.caption}"><source src="${media.src}" type="video/mp4">Your browser cannot play this video. <a href="${media.src}">Download the clip</a>.</video>`
  : `<a href="${media.src}" target="_blank" rel="noopener" aria-label="Open full-size image: ${media.alt}"><img src="${media.src}" alt="${media.alt}" loading="lazy"></a>`;
 return `<figure class="project-media">${visual}<figcaption>${media.caption}</figcaption></figure>`;
}
function openProject(index) {
 const p=projects[index];
 document.querySelector('#detail-title').textContent=p.title;
 document.querySelector('#detail-body').innerHTML=p.media
  ? `<p class="project-summary">${p.approach}</p><div class="media-gallery ${p.media[0].type==='video'?'video-gallery':''}">${p.media.map(mediaFigure).join('')}</div>`
  : `<p>Detailed build documentation is coming soon.</p><h3>01 / The challenge</h3><p>${p.challenge}</p><h3>02 / The approach</h3><p>${p.approach}</p><h3>03 / Evidence & lessons</h3><p>${p.validation}</p>`;
 dialog.classList.toggle('has-media',Boolean(p.media));
 dialog.showModal();dialog.scrollTop=0;
}
document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>openProject(button.dataset.project)));
document.querySelectorAll('[data-open-project]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();openProject(link.dataset.openProject);}));
document.querySelector('.close').addEventListener('click',()=>dialog.close());
// Stop both clips when closing the gallery (including the Escape key).
dialog.addEventListener('close',()=>dialog.querySelectorAll('video').forEach(video=>video.pause()));
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
