const byId=new Map(PERSONS.map(p=>[p.id,p]));
const board=document.getElementById('canvas'), view=document.getElementById('viewport'), frame=document.getElementById('space'), wire=document.getElementById('links');
const CENTER={x:6000,y:2020},WIDTH=12000,HEIGHT=5200, CW=188,CH=97;
const pos={},knownLinks=[],primaryLinks=[];
const whoName='Wayne Williams Jr.';
const me=PERSONS.find(x=>x.name===whoName), ma=PERSONS.find(x=>x.role==='Your mother'), girl=PERSONS.find(x=>x.name==='Jasmine Williams'), boy=PERSONS.find(x=>x.name==='Jordan Williams'), dad=PERSONS.find(x=>x.name==='Wayne Williams Sr.');
// Create a complete and reversible horizontal display from the existing tree, not a replacement genealogy.
function position(id,x,y){pos[id]={x:Math.round(x),y:Math.round(y)}};
position(me.id,CENTER.x-CW/2,CENTER.y);
position(dad.id,CENTER.x-320,CENTER.y-290);position(ma.id,CENTER.x+130,CENTER.y-290);
position(girl.id,CENTER.x-260,CENTER.y+215);position(boy.id,CENTER.x+90,CENTER.y+215);
knownLinks.push([dad.id,me.id],[ma.id,me.id],[me.id,girl.id],[me.id,boy.id]);
primaryLinks.push([dad.id,me.id],[ma.id,me.id],[me.id,girl.id],[me.id,boy.id]);
// Build verified path through source tree toward the oldest Goodson ancestor.
let path=[];for(let n=ma;n;n=n.parent?byId.get(n.parent):null)path.push(n);
path.forEach((p,i)=>position(p.id,i===0?CENTER.x+130:CENTER.x+520+(i-1)*455,i===0?CENTER.y-290:CENTER.y-260));
for(let i=0;i<path.length-1;i++){knownLinks.push([path[i].id,path[i+1].id]);primaryLinks.push([path[i].id,path[i+1].id])}
const pathIds=new Set([...path.map(x=>x.id),me.id,girl.id,boy.id]);
// Place side branches in wide horizontal bands, minimizing vertical scrolling.
const shelves={};const anchors=[ma.id,...path.slice(1).map(x=>x.id)];
for(const a of anchors)shelves[a]=[];
for(const node of PERSONS.filter(n=>n.branch==='goodson'&&!pathIds.has(n.id))){
 // Keep Alice in the former William-card location without inventing a Sarah Hall parent link.
 if(node.id==='g3'){shelves['g1'].push(node);continue;}
 let ancestor=node.parent?byId.get(node.parent):null;
 while(ancestor&&!shelves[ancestor.id])ancestor=ancestor.parent?byId.get(ancestor.parent):null;
 if(ancestor)shelves[ancestor.id].push(node);
}
// Bands keyed to nearest direct ancestor; numbers correspond to source ancestry path, not a guessed genealogy.
const shelfRules=[
 {x:6650,y:1250,cols:8},{x:7000,y:1250,cols:8},{x:7550,y:1540,cols:12},
 {x:7850,y:390,cols:8},{x:8350,y:590,cols:9},{x:8850,y:1520,cols:9},{x:8800,y:1960,cols:9}
].map(r=>({...r,y:r.y+990}));
anchors.forEach((id,i)=>{
 const rule=shelfRules[i]||{x:9000,y:1550,cols:9};
 shelves[id].forEach((p,k)=>position(p.id,rule.x+(k%rule.cols)*220,rule.y+Math.floor(k/rule.cols)*136));
});
// Williams branch stages are inherited from the existing Williams family cards; avoid invented additional relationships.
const pStages=META.williamsStages;
const stageX=[0,CENTER.x-750,CENTER.x-1240,CENTER.x-1720,CENTER.x-2280,CENTER.x-2880,CENTER.x-3450,CENTER.x-4050];
for(let s=1;s<pStages.length;s++){
 const ids=pStages[s].ids;const x=stageX[s]||CENTER.x-3600-(s-6)*500;
 const gap=ids.length>4?143:190;
 const start=CENTER.y-320-((ids.length-1)*gap)/2;
 ids.forEach((id,j)=>position(id,x,start+j*gap));
}
// Source-confirmed immediate paternal pair relationships only. Future earlier-generation assignments remain editable.
const find=(name)=>PERSONS.find(p=>p.name===name&&p.branch==='williams');
function addKin(a,b){const aa=find(a),bb=find(b);if(aa&&bb)knownLinks.push([aa.id,bb.id])}
addKin('Wayne Williams Sr.','Lawrence Williams');addKin('Wayne Williams Sr.','Gertrude Smith');
addKin('Lawrence Williams','Henry Williams');addKin('Lawrence Williams','Eloise Williams');
addKin('Gertrude Smith','Henry J. Smith');addKin('Gertrude Smith','Violet Jackson');
// Links for all Goodson parent/child pairs, using the original data only.
for(const p of PERSONS){if(p.branch==='goodson'&&p.parent&&byId.has(p.parent))knownLinks.push([p.id,p.parent])}
// mirrored background tree paintings stay attached to the diagram while the user pans.
const isMobile=matchMedia('(max-width:790px)').matches;
let zoom=isMobile?.80:1,arrange=false,focused=null;
let saved={positions:{},pictures:{},profiles:{},layoutVersion:2};
// A public family viewer must never read browser-local editor profiles, contact fields, or photo overrides.
if(document.documentElement.dataset.familyView!=='public'){
try{const stored=localStorage.getItem('wdw-family-horizontal-v1');if(stored){const parsed=JSON.parse(stored);if(parsed&&typeof parsed==='object')saved={positions:parsed.positions||{},pictures:parsed.pictures||{},profiles:parsed.profiles||{},layoutVersion:parsed.layoutVersion||1}}}catch(e){}
}
if(saved.layoutVersion<2){for(const p of Object.values(saved.positions))if(Number.isFinite(p.x)&&Number.isFinite(p.y))p.y+=990;saved.layoutVersion=2;}
for(const [id,p]of Object.entries(saved.positions))if(byId.has(id)&&Number.isFinite(p.x)&&Number.isFinite(p.y))position(id,p.x,p.y);
const cardEls=new Map();
function safe(t){return String(t??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;')}
function shortName(n){return n.replace(/\s*\(([^)]*)\)$/, '').replace(/\s+— wife$/, '')}
function getPic(p){return saved.pictures[p.id]?.data||p.photo||''}
function layoutCard(p){
 const node=document.createElement('button');node.type='button';node.className='person';node.dataset.side=p.branch;
 if(p.id===me.id||p.id===girl.id||p.id===boy.id||p.id===ma.id||p.id===dad.id)node.classList.add('center');
 if(pathIds.has(p.id))node.classList.add('direct');
 if(/confirm|unconfirmed|verification|needs verification/i.test(p.role+' '+p.name))node.classList.add('needs-check');
 node.dataset.id=p.id;node.setAttribute('aria-label',p.name+' — '+p.role);
 node.innerHTML=`<span class="visual"></span><span class="details"><span class="name">${safe(shortName(p.name))}</span><span class="relation">${safe(p.role)}</span></span>`;
 node.addEventListener('click',e=>{if(didDrag){didDrag=false;return}openEditor(p.id)});
 node.addEventListener('pointerdown',e=>{if(!arrange||e.button!==0)return;dragId=p.id;startPointer={x:e.clientX,y:e.clientY,x0:pos[p.id].x,y0:pos[p.id].y};didDrag=false;node.setPointerCapture(e.pointerId);e.stopPropagation()});
 node.addEventListener('pointermove',e=>{if(!arrange||dragId!==p.id)return;const dx=(e.clientX-startPointer.x)/zoom,dy=(e.clientY-startPointer.y)/zoom;if(Math.abs(dx)+Math.abs(dy)>4)didDrag=true;position(p.id,startPointer.x0+dx,startPointer.y0+dy);placeOne(p.id);drawLines()});
 node.addEventListener('pointerup',e=>{if(dragId===p.id){dragId=null;if(didDrag){writeSave();showStatus('Layout moved and saved in this browser. Export to share with me.')}}});
 node.addEventListener('pointercancel',()=>{dragId=null});
 board.append(node);cardEls.set(p.id,node);updatePhoto(p);placeOne(p.id);
}
function updatePhoto(p){
 const node=cardEls.get(p.id);if(!node)return;const box=node.querySelector('.visual'),src=getPic(p);
 if(src){const im=document.createElement('img');im.loading=p.id===me.id?'eager':'lazy';im.alt='Portrait of '+p.name;im.src=src;const pic=saved.pictures[p.id];if(pic){im.style.objectPosition=`${pic.x??50}% ${pic.y??50}%`;im.style.transform=`scale(${pic.zoom??1})`};box.replaceChildren(im)}
 else{const f=document.createElement('span');f.className='fallback';f.textContent=p.name.slice(0,1);box.replaceChildren(f)}
}
function placeOne(id){let p=pos[id];const el=cardEls.get(id);if(el&&p){el.style.left=p.x+'px';el.style.top=p.y+'px'}}
for(const p of PERSONS)if(pos[p.id])layoutCard(p);
function edge(a,b,prime=false){if(!pos[a]||!pos[b])return;const A=pos[a],B=pos[b];
 const x1=A.x+CW/2,y1=A.y+CH/2,x2=B.x+CW/2,y2=B.y+CH/2;
 let startX=x1,endX=x2;if(Math.abs(x2-x1)>160){startX=x1+(x2>x1?CW/2:-CW/2);endX=x2+(x2>x1?-CW/2:CW/2)}
 const span=Math.max(45,Math.abs(endX-startX)*.46);const control=(endX>startX?span:-span);
 const d=`M ${startX} ${y1} C ${startX+control} ${y1} ${endX-control} ${y2} ${endX} ${y2}`;
 const line=document.createElementNS('http://www.w3.org/2000/svg','path');line.setAttribute('d',d);line.setAttribute('class','connect'+(prime?' primary':''));wire.append(line)
}
function drawLines(){wire.replaceChildren();const already=new Set();for(const [a,b]of knownLinks){const key=[a,b].sort().join('|');if(already.has(key))continue;already.add(key);edge(a,b,primaryLinks.some(pair=>pair[0]===a&&pair[1]===b||pair[0]===b&&pair[1]===a))}}
drawLines();
// Position marriage label between parents and visible labels on both branches.
function label(text,x,y,sub=''){const el=document.createElement('div');el.className='landmark';el.style.left=x+'px';el.style.top=y+'px';el.innerHTML=safe(text)+(sub?`<span>${safe(sub)}</span>`:'');board.append(el)}
label('WILLIAMS · PATERNAL',CENTER.x-1900,200,'Scroll left to explore your father’s family');
label('GOODSON · MATERNAL',CENTER.x+1000,200,'Scroll right to explore your mother’s family');
const marriage=document.createElement('div');marriage.className='marriage';marriage.textContent='Marriage';marriage.style.left=(CENTER.x-25)+'px';marriage.style.top=(CENTER.y-210)+'px';board.append(marriage);
function updateZoom(value,center=false){zoom=Math.max(.4,Math.min(1.5,value));frame.style.width=(WIDTH*zoom)+'px';frame.style.height=(HEIGHT*zoom)+'px';board.style.transform=`scale(${zoom})`;document.getElementById('zoomLabel').textContent=Math.round(zoom*100)+'%';if(center)focus(CENTER.x,CENTER.y-60)}
function focus(x,y,instant=false){view.scrollTo({left:Math.max(0,x*zoom-view.clientWidth/2),top:Math.max(0,y*zoom-view.clientHeight/2),behavior:instant?'instant':'smooth'})}
updateZoom(zoom);requestAnimationFrame(()=>focus(CENTER.x,CENTER.y,true));
document.getElementById('centerBtn').onclick=()=>focus(CENTER.x,CENTER.y);
document.getElementById('leftBtn').onclick=()=>focus(CENTER.x-1900,CENTER.y);
document.getElementById('rightBtn').onclick=()=>focus(CENTER.x+1900,CENTER.y);
document.getElementById('zoomIn').onclick=()=>{const x=(view.scrollLeft+view.clientWidth/2)/zoom,y=(view.scrollTop+view.clientHeight/2)/zoom;updateZoom(zoom+.15);focus(x,y)};
document.getElementById('zoomOut').onclick=()=>{const x=(view.scrollLeft+view.clientWidth/2)/zoom,y=(view.scrollTop+view.clientHeight/2)/zoom;updateZoom(zoom-.15);focus(x,y)};
let pan=null,dragId=null,startPointer={},didDrag=false;
view.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.target.closest('.person,button,input'))return;pan={x:e.clientX,y:e.clientY,scrollX:view.scrollLeft,scrollY:view.scrollTop};view.setPointerCapture(e.pointerId)});
view.addEventListener('pointermove',e=>{if(!pan)return;view.scrollLeft=pan.scrollX-(e.clientX-pan.x);view.scrollTop=pan.scrollY-(e.clientY-pan.y)});
view.addEventListener('pointerup',()=>pan=null);view.addEventListener('pointercancel',()=>pan=null);
function saveState(){return {version:1,layoutVersion:2,updated:new Date().toISOString(),positions:saved.positions,pictures:saved.pictures,profiles:saved.profiles||{}}}
function writeSave(){saved.positions=Object.fromEntries(Object.entries(pos).map(([id,p])=>[id,{x:p.x,y:p.y}]));try{localStorage.setItem('wdw-family-horizontal-v1',JSON.stringify(saveState()))}catch(e){showStatus('Your browser storage is full. Use Export Backup to keep the changes.')}}
function showStatus(t){const el=document.getElementById('status');el.textContent=t;}
const modeBtn=document.getElementById('modeBtn');modeBtn.onclick=()=>{arrange=!arrange;modeBtn.classList.toggle('active',arrange);modeBtn.textContent=arrange?'✓ Arrange ON':'↔ Arrange';showStatus(arrange?'Drag a card to rearrange it. Tap any card to add or change its photo.':'Normal view. Turn Arrange on to move cards.');cardEls.forEach(el=>el.style.touchAction=arrange?'none':'auto')};
function openEditor(id){focused=id;const p=byId.get(id);cardEls.forEach(n=>n.classList.toggle('selected',n.dataset.id===id));const d=document.getElementById('drawer');d.hidden=false;document.getElementById('personTitle').textContent=p.name;document.getElementById('personRelation').textContent=p.role;const current=getPic(p),picture=document.getElementById('drawerImage');picture.src=current||'';picture.hidden=!current;const crop=saved.pictures[id]||{};document.getElementById('cropX').value=crop.x??50;document.getElementById('cropY').value=crop.y??50;document.getElementById('cropZoom').value=crop.zoom??1;drawPreview();document.getElementById('photoUpload').value='';showStatus('')}
function drawPreview(){if(!focused)return;const im=document.getElementById('drawerImage');im.style.objectPosition=`${document.getElementById('cropX').value}% ${document.getElementById('cropY').value}%`;im.style.transform=`scale(${document.getElementById('cropZoom').value})`;im.style.transformOrigin='center center'}
for(const id of ['cropX','cropY','cropZoom'])document.getElementById(id).addEventListener('input',()=>{drawPreview();if(!focused)return;const p=byId.get(focused);const o=saved.pictures[focused]||{};saved.pictures[focused]={...o,data:o.data||p.photo||'',x:+document.getElementById('cropX').value,y:+document.getElementById('cropY').value,zoom:+document.getElementById('cropZoom').value};updatePhoto(p);writeSave()});
document.getElementById('closeDrawer').onclick=()=>{document.getElementById('drawer').hidden=true;cardEls.forEach(x=>x.classList.remove('selected'))};
document.getElementById('photoUpload').addEventListener('change',async e=>{const file=e.target.files?.[0];if(!file||!focused)return;if(!file.type.startsWith('image/')){showStatus('Please choose an image.');return}const id=focused;const url=URL.createObjectURL(file);const img=new Image();img.onload=()=>{const c=document.createElement('canvas');const k=Math.min(1,750/Math.max(img.naturalWidth,img.naturalHeight));c.width=Math.max(1,Math.round(img.naturalWidth*k));c.height=Math.max(1,Math.round(img.naturalHeight*k));c.getContext('2d').drawImage(img,0,0,c.width,c.height);URL.revokeObjectURL(url);saved.pictures[id]={data:c.toDataURL('image/jpeg',.78),x:50,y:50,zoom:1};writeSave();updatePhoto(byId.get(id));if(focused===id)openEditor(id);showStatus('Picture updated in your browser. Export a backup to share the change.')};img.onerror=()=>showStatus('That picture could not be opened.');img.src=url});
document.getElementById('restorePhoto').onclick=()=>{if(!focused)return;delete saved.pictures[focused];writeSave();updatePhoto(byId.get(focused));openEditor(focused);showStatus('Original picture restored.')};
function exportJSON(){writeSave();const data=JSON.stringify(saveState());const blob=new Blob([data],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='Wayne-Family-Tree-Arrangement-and-Photos.json';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);showStatus('Backup downloaded. Upload this JSON here to publish your changes to everyone.')}
document.getElementById('exportBtn').onclick=exportJSON;
document.getElementById('importFile').addEventListener('change',async e=>{const f=e.target.files?.[0];if(!f)return;try{const x=JSON.parse(await f.text());if(x.version!==1||typeof x.positions!=='object'||typeof x.pictures!=='object')throw Error('Invalid version');saved={positions:x.positions,pictures:x.pictures,profiles:x.profiles||{},layoutVersion:x.layoutVersion||1};if(saved.layoutVersion<2){for(const p of Object.values(saved.positions))if(Number.isFinite(p.x)&&Number.isFinite(p.y))p.y+=990;saved.layoutVersion=2;}for(const [id,p]of Object.entries(saved.positions)){if(byId.has(id)&&Number.isFinite(p.x)&&Number.isFinite(p.y))position(id,p.x,p.y)}for(const p of PERSONS){placeOne(p.id);updatePhoto(p)}drawLines();writeSave();showStatus('Backup restored.') }catch(e){showStatus('Cannot import that backup.')}});
document.getElementById('saveBtn').onclick=()=>{writeSave();showStatus('Your arrangement is saved in this browser. Export to publish it.')};
document.getElementById('resetBtn').onclick=()=>{if(confirm('Reset all positions and uploaded photos in this browser?')){try{localStorage.removeItem('wdw-family-horizontal-v1')}catch(e){}location.reload()}};
document.getElementById('search').addEventListener('input',e=>{const q=e.target.value.trim().toLowerCase();cardEls.forEach((el,id)=>el.classList.toggle('searchhit',q&&byId.get(id).name.toLowerCase().includes(q)));if(q){const match=PERSONS.find(p=>p.name.toLowerCase().includes(q)&&pos[p.id]);if(match)focus(pos[match.id].x,pos[match.id].y)}});
// Top navigation: unobtrusive 3-bar jukebox popover (existing audio links, never autoplay).
const musicToggle=document.getElementById('musicToggle'),musicPop=document.getElementById('musicPop');musicToggle.onclick=()=>{musicPop.hidden=!musicPop.hidden;musicToggle.setAttribute('aria-expanded',String(!musicPop.hidden))};
const musicData={Motivation:['Create a life that leaves a legacy','Family first — keep building'],Music:['Family soundtrack selections','Memories and reunion favorites'],Movies:['Family histories and documentaries','Watch and reflect together'],Meditation:['Quiet reflection','Breathing and calm']};
document.querySelectorAll('[data-mtab]').forEach(el=>el.onclick=()=>{document.querySelectorAll('[data-mtab]').forEach(t=>t.classList.toggle('active',t===el));document.getElementById('musicList').textContent=musicData[el.dataset.mtab].join(' • ')});
document.getElementById('musicList').textContent=musicData.Motivation.join(' • ');
const themeBtn=document.getElementById('themeBtn');try{if(localStorage.getItem('wdw-family-theme')==='dark')document.body.classList.add('dark')}catch(e){};
function showTheme(){themeBtn.textContent=document.body.classList.contains('dark')?'☀ Lights On':'☾ Lights Off'};showTheme();
themeBtn.onclick=()=>{document.body.classList.toggle('dark');showTheme();try{localStorage.setItem('wdw-family-theme',document.body.classList.contains('dark')?'dark':'light')}catch(e){}};
// Visible data-integrity disclosure: ancestry screenshots contain more names than this existing source site.
document.getElementById('countLabel').textContent=PERSONS.length+' existing family cards preserved';