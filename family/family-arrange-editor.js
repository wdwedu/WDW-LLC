/* Wayne's Family Tree: opt-in drag layout editor and card-photo uploads.
 * Edits stay in this browser until exported; does not modify family genealogy or publish them. */
(()=>{
'use strict';
const STORE='wdw-family-editor-layout-v2';
const DBNAME='wdw-family-editor-photos-v1';
const canvas=document.getElementById('canvas'),viewport=document.getElementById('viewport');
const toolbar=document.querySelector('.toolbar');
if(!canvas||!viewport||!toolbar)return;
const safeParse=(s,fallback)=>{try{return JSON.parse(s)||fallback}catch{return fallback}};
const getSaved=()=>{try{return localStorage.getItem(STORE)}catch{return null}};
const state={arrange:false,offsets:safeParse(getSaved(),{}),photos:{},cards:[],selected:null,drag:null,modal:null,redrawPending:false,db:null};
const personCards=()=>[...document.querySelectorAll('#root li > .person'),...document.querySelectorAll('.williams-extension .w-card')];
const make=(tag,attrs={},text)=>{const el=document.createElement(tag);for(const [k,v] of Object.entries(attrs))el.setAttribute(k,v);if(text!==undefined)el.textContent=text;return el};
const dataKey=card=>{
 const li=card.closest('#root li');
 if(li&&card.classList.contains('person')){
  const path=[];let curr=li;
  while(curr){const parentUl=curr.parentElement;const siblings=parentUl?[...parentUl.children].filter(x=>x.tagName==='LI'):[];path.unshift(String(siblings.indexOf(curr)));curr=parentUl?.closest('li')||null}
  return 'g:'+path.join('.');
 }
 const all=[...document.querySelectorAll('.williams-extension .w-card')];
 return 'w:'+all.indexOf(card);
};
const nameOf=card=>card.querySelector(':scope > .name')?.textContent.trim()||card.querySelector(':scope > strong')?.textContent.trim()||'Family member';
const readZoom=()=>Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--zoom'))||1;
const saveOffsets=()=>{try{localStorage.setItem(STORE,JSON.stringify(state.offsets));announce('Layout saved in this browser.')}catch(e){announce('Unable to save here; export a backup.')}};
let status;
function announce(message){if(status){status.textContent=message;status.title=message}}
function applyOffset(card){const value=state.offsets[card.dataset.familyKey];if(value&&Number.isFinite(+value.x)&&Number.isFinite(+value.y)){
 card.style.translate=`${Number(value.x)}px ${Number(value.y)}px`;
 card.dataset.moved='1';
 }else{card.style.translate='';delete card.dataset.moved;}}
function updateAll(){state.cards=personCards();state.cards.forEach(card=>{
 if(!card.dataset.familyKey)card.dataset.familyKey=dataKey(card);
 applyOffset(card);
 if(!card.querySelector(':scope > .family-upload-btn')){
  const btn=make('button',{type:'button',class:'family-upload-btn',title:'Add or replace photo for '+nameOf(card),'aria-label':'Add or replace photo for '+nameOf(card)},'📷');
  btn.addEventListener('pointerdown',e=>e.stopPropagation());
  btn.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();openPhoto(card)});
  card.append(btn);
 }
 if(state.photos[card.dataset.familyKey])showPhoto(card,state.photos[card.dataset.familyKey]);
 });
 draw();
}
const overlay=make('svg',{id:'familyArrangeConnectors','aria-hidden':'true'});canvas.insertBefore(overlay,canvas.firstChild);
function draw(){if(!state.arrange||state.redrawPending)return;state.redrawPending=true;requestAnimationFrame(()=>{
 state.redrawPending=false;if(!state.arrange)return;
 const z=readZoom(),base=canvas.getBoundingClientRect();
 const w=Math.max(canvas.scrollWidth,canvas.clientWidth),h=Math.max(canvas.scrollHeight,canvas.clientHeight);
 overlay.setAttribute('width',String(w));overlay.setAttribute('height',String(h));overlay.setAttribute('viewBox',`0 0 ${w} ${h}`);
 const pos=el=>{const r=el.getBoundingClientRect();return {left:(r.left-base.left)/z,top:(r.top-base.top)/z,right:(r.right-base.left)/z,bottom:(r.bottom-base.top)/z,width:r.width/z,height:r.height/z}};
 const visible=el=>el&&el.getClientRects().length>0&&getComputedStyle(el).visibility!=='hidden';
 const links=[];
 const connect=(p,c)=>{if(!visible(p)||!visible(c))return;const a=pos(p),b=pos(c);const x=a.left+a.width/2,y=a.bottom,u=b.left+b.width/2,v=b.top;
 const mid=y+(v-y)*.5;
 if(Math.abs(v-y)<80){links.push(`M ${x} ${y} C ${x} ${mid}, ${u} ${mid}, ${u} ${v}`)}else{links.push(`M ${x} ${y} C ${x} ${mid}, ${u} ${mid}, ${u} ${v}`)};
 };
 document.querySelectorAll('#root li').forEach(li=>{
  const card=li.querySelector(':scope > .person');
  const ul=li.querySelector(':scope > ul');
  if(card&&ul&&!li.classList.contains('collapsed'))for(const child of ul.children)connect(card,child.querySelector(':scope > .person'));
 });
 const wayne=state.cards.find(c=>c.querySelector(':scope > .role')?.textContent.trim()==='You');
 const wcards=[...document.querySelectorAll('.williams-extension .w-card')];
 if(wayne&&wcards[0]){
  const a=pos(wayne),b=pos(wcards[0]);const x=a.left,y=a.top+a.height*.55,u=b.right,v=b.top+b.height*.5,m=(x+u)/2;
  links.push(`M ${x} ${y} C ${m} ${y}, ${m} ${v}, ${u} ${v}`);
  const stage=document.querySelectorAll('.williams-extension .w-stage');
  if(stage[0])stage[0].querySelectorAll('.w-card').forEach(card=>connect(wcards[0],card));
  for(let k=1;k<stage.length;k++){
   const top=[...stage[k-1].querySelectorAll('.w-card')],bottom=[...stage[k].querySelectorAll('.w-card')];
   bottom.forEach((card,j)=>{if(top.length)connect(top[Math.min(top.length-1,Math.floor(j*top.length/bottom.length))],card)})
  }
 }
 overlay.innerHTML=links.map(d=>`<path d="${d}"/>`).join('');
 });}
function setArrange(value){state.arrange=!!value;document.body.classList.toggle('family-arrange',state.arrange);arrangeBtn.classList.toggle('family-active',state.arrange);arrangeBtn.textContent=state.arrange?'✓ Arrange Mode ON':'✥ Arrange Mode';announce(state.arrange?'Drag any family card, then Save Layout.':'Normal family tree view. Photos can still be added.');if(state.arrange)draw()}
function dragDown(e){if(!state.arrange||e.button!==0||e.target.closest('button,input,a')||e.target.closest('.family-user-photo-frame'))return;
 const card=e.target.closest('.person,.w-card');if(!card||!state.cards.includes(card))return;
 e.preventDefault();e.stopPropagation();
 const key=card.dataset.familyKey;const prev=state.offsets[key]||{x:0,y:0};state.drag={id:e.pointerId,card,key,x:e.clientX,y:e.clientY,startX:Number(prev.x)||0,startY:Number(prev.y)||0};
 card.classList.add('family-moving');try{card.setPointerCapture(e.pointerId)}catch{}
}
function dragMove(e){const d=state.drag;if(!d||d.id!==e.pointerId)return;e.preventDefault();e.stopPropagation();const z=readZoom();state.offsets[d.key]={x:Math.round(d.startX+(e.clientX-d.x)/z),y:Math.round(d.startY+(e.clientY-d.y)/z)};applyOffset(d.card);draw()}
function dragEnd(e){if(!state.drag||state.drag.id!==e.pointerId)return;e.stopPropagation();state.drag.card.classList.remove('family-moving');state.drag=null;saveOffsets();draw()}
viewport.addEventListener('pointerdown',dragDown,true);viewport.addEventListener('pointermove',dragMove,true);viewport.addEventListener('pointerup',dragEnd,true);viewport.addEventListener('pointercancel',dragEnd,true);
// Block native card click actions after dragging a card; otherwise photo selection opens by accident.
viewport.addEventListener('click',e=>{if(state.arrange&&e.target.closest('.person,.w-card')&&!e.target.closest('button')){e.stopImmediatePropagation();e.preventDefault()}},true);
const editor=make('span',{id:'familyEditorToolbar'}),arrangeBtn=make('button',{type:'button',id:'familyArrangeToggle'},'✥ Arrange Mode');
const saveBtn=make('button',{type:'button'},'Save Layout'),exportBtn=make('button',{type:'button'},'Export Layout + Photos'),importBtn=make('button',{type:'button'},'Import'),resetBtn=make('button',{type:'button'},'Reset Layout');
status=make('span',{class:'family-status',role:'status','aria-live':'polite'},'Move cards and add photos.');
editor.append(arrangeBtn,saveBtn,exportBtn,importBtn,resetBtn,status);toolbar.append(editor);
arrangeBtn.onclick=()=>setArrange(!state.arrange);saveBtn.onclick=saveOffsets;resetBtn.onclick=()=>{if(!confirm('Reset ONLY card positions? Existing family data and photos are not changed.'))return;state.offsets={};saveOffsets();state.cards.forEach(applyOffset);draw()};
const chooseFile=make('input',{type:'file',accept:'application/json,.json',style:'display:none'});document.body.append(chooseFile);
importBtn.onclick=()=>chooseFile.click();
chooseFile.onchange=async()=>{try{const f=chooseFile.files?.[0];if(!f)return;const data=JSON.parse(await f.text());if(data.type!=='wdw-family-layout-photo-backup')throw Error('This is not a family-tree export.');
 if(!confirm('Import card positions and pictures from this backup? This will replace saved browser edits, not the original family data.'))return;
 state.offsets=data.offsets||{};localStorage.setItem(STORE,JSON.stringify(state.offsets));
 for(const [key,photo] of Object.entries(data.photos||{})){if(photo?.src?.startsWith('data:image/')){state.photos[key]=photo;await photoStore(key,photo)}}
 state.cards.forEach(card=>{applyOffset(card);if(state.photos[card.dataset.familyKey])showPhoto(card,state.photos[card.dataset.familyKey]);});announce('Imported photo and layout backup.');draw();
 }catch(e){alert('Could not import backup: '+e.message)}finally{chooseFile.value=''}};
function downloadFile(name,contents,mime){const a=make('a');const u=URL.createObjectURL(new Blob([contents],{type:mime}));a.href=u;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),1500)}
exportBtn.onclick=async()=>{const data={type:'wdw-family-layout-photo-backup',version:2,created:new Date().toISOString(),offsets:state.offsets,photos:state.photos};downloadFile('Waynes-Family-Layout-and-Photos.json',JSON.stringify(data),'application/json');announce('Backup exported. Upload the JSON file here in ChatGPT to publish your changes.')};
// IndexedDB can hold portrait data URLs more reliably than localStorage's small quota.
async function connectDB(){return new Promise((resolve,reject)=>{if(!window.indexedDB){reject(Error('Unavailable'));return;}const req=indexedDB.open(DBNAME,1);req.onupgradeneeded=()=>req.result.createObjectStore('images');req.onerror=()=>reject(req.error);req.onsuccess=()=>resolve(req.result)})}
function photoStore(key,value){if(!state.db)return Promise.reject(Error('Browser photo storage unavailable'));return new Promise((resolve,reject)=>{const tx=state.db.transaction('images','readwrite');tx.objectStore('images').put(value,key);tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error)})}
function readPhotos(){if(!state.db)return Promise.resolve({});return new Promise(resolve=>{const tx=state.db.transaction('images','readonly');const store=tx.objectStore('images');const keys=store.getAllKeys(),values=store.getAll();tx.oncomplete=()=>{const photos={};keys.result.forEach((k,i)=>photos[k]=values.result[i]);resolve(photos)};tx.onerror=()=>resolve({})})}
function showPhoto(card,photo){card.classList.add('has-family-upload');let frame=card.querySelector(':scope > .family-user-photo-frame');if(!frame){frame=make('div',{class:'family-user-photo-frame'});frame.append(make('img',{alt:'Chosen portrait for '+nameOf(card)}));card.insertBefore(frame,card.firstElementChild)}const img=frame.querySelector('img');img.src=photo.src;img.style.objectPosition=`${photo.x??50}% ${photo.y??50}%`;img.style.transform=`scale(${photo.zoom??1})`}
function removePhoto(card){card.classList.remove('has-family-upload');card.querySelector(':scope > .family-user-photo-frame')?.remove()}
// Self-contained photo editor with crop position, scale and upload from phone.
const modal=make('div',{id:'familyPhotoModal',role:'dialog','aria-modal':'true','aria-label':'Family photo editor'});
modal.innerHTML=`<div class="family-modal-inner"><h2 id="familyPhotoTitle">Add family portrait</h2><p class="family-help">Choose a photograph from your phone or computer. It will be resized for the website. Drag the crop sliders until the face fits.</p><label for="familyPhotoFile">Choose image</label><input type="file" id="familyPhotoFile" accept="image/*"><div class="family-preview"><img id="familyPhotoPreview" alt="Photo crop preview"></div><label for="familyPhotoX">Move photo horizontally</label><input id="familyPhotoX" type="range" min="0" max="100" value="50"><label for="familyPhotoY">Move photo vertically</label><input id="familyPhotoY" type="range" min="0" max="100" value="50"><label for="familyPhotoZoom">Zoom in on photo</label><input id="familyPhotoZoom" type="range" min="100" max="250" value="100"><p class="family-help" id="familyPhotoMessage">Your photo is stored in this browser until you export and publish your backup.</p><div class="family-actions"><button id="familyPhotoCancel" type="button">Cancel</button><button id="familyPhotoRemove" type="button">Remove added photo</button><button id="familyPhotoSave" type="button" class="family-save">Use This Photo</button></div></div>`;
document.body.append(modal);state.modal=modal;
const input=modal.querySelector('#familyPhotoFile'),preview=modal.querySelector('#familyPhotoPreview');const sliderX=modal.querySelector('#familyPhotoX'),sliderY=modal.querySelector('#familyPhotoY'),sliderZ=modal.querySelector('#familyPhotoZoom'),msg=modal.querySelector('#familyPhotoMessage');
let draft=null;
function redrawPreview(){if(!draft)return;preview.src=draft.src;preview.style.objectPosition=`${sliderX.value}% ${sliderY.value}%`;preview.style.transform=`scale(${Number(sliderZ.value)/100})`}
[sliderX,sliderY,sliderZ].forEach(s=>s.addEventListener('input',redrawPreview));
function openPhoto(card){state.selected=card;draft=state.photos[card.dataset.familyKey]||null;modal.querySelector('#familyPhotoTitle').textContent='Photo: '+nameOf(card);input.value='';sliderX.value=draft?.x??50;sliderY.value=draft?.y??50;sliderZ.value=Math.round((draft?.zoom??1)*100);preview.src=draft?.src||'';preview.style.visibility=draft?'visible':'hidden';msg.textContent='Choose a file or adjust the current crop. The original photo stays unchanged until you save.';modal.classList.add('open');if(draft)redrawPreview()}
const closePhoto=()=>{modal.classList.remove('open');state.selected=null;draft=null};
modal.querySelector('#familyPhotoCancel').onclick=closePhoto;modal.addEventListener('click',e=>{if(e.target===modal)closePhoto()});
input.onchange=async()=>{const file=input.files?.[0];if(!file)return;if(!file.type.startsWith('image/')){msg.textContent='Choose an image file.';return;}try{const src=await compress(file);draft={src,x:50,y:50,zoom:1};sliderX.value=50;sliderY.value=50;sliderZ.value=100;preview.style.visibility='visible';redrawPreview();msg.textContent='Photo ready. Adjust the crop then select Use This Photo.'}catch(e){msg.textContent='Unable to open this picture: '+e.message}};
function compress(file){return new Promise((resolve,reject)=>{const url=URL.createObjectURL(file),im=new Image();im.onload=()=>{const ratio=Math.min(1,1100/Math.max(im.naturalWidth,im.naturalHeight));const c=document.createElement('canvas');c.width=Math.max(1,Math.round(im.naturalWidth*ratio));c.height=Math.max(1,Math.round(im.naturalHeight*ratio));const ctx=c.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,c.width,c.height);ctx.drawImage(im,0,0,c.width,c.height);URL.revokeObjectURL(url);resolve(c.toDataURL('image/jpeg',.82))};im.onerror=()=>{URL.revokeObjectURL(url);reject(Error('Invalid image'))};im.src=url})}
modal.querySelector('#familyPhotoSave').onclick=async()=>{if(!draft||!state.selected){msg.textContent='Choose a picture first.';return}const card=state.selected,key=card.dataset.familyKey,photo={...draft,x:+sliderX.value,y:+sliderY.value,zoom:+sliderZ.value/100};state.photos[key]=photo;showPhoto(card,photo);try{await photoStore(key,photo);announce('Photo saved in this browser. Export it to make it permanent on the site.')}catch(e){announce('Photo shown here; export a backup because automatic storage is unavailable.')}closePhoto();draw()};
modal.querySelector('#familyPhotoRemove').onclick=async()=>{const card=state.selected;if(!card)return;const key=card.dataset.familyKey;delete state.photos[key];removePhoto(card);if(state.db){await new Promise(res=>{const tx=state.db.transaction('images','readwrite');tx.objectStore('images').delete(key);tx.oncomplete=tx.onerror=()=>res()})}closePhoto();announce('Added photo removed; original photo restored.');draw()};
function init(){updateAll();connectDB().then(async db=>{state.db=db;state.photos=await readPhotos();state.cards.forEach(c=>{if(state.photos[c.dataset.familyKey])showPhoto(c,state.photos[c.dataset.familyKey])});announce('Ready. Switch on Arrange Mode to move the cards.');draw()}).catch(()=>announce('Ready. Use Export to save photos if browser storage is unavailable.'));
 // Re-render connectors when the tree expands, resizes or zooms. Do not modify expansion behavior.
 document.querySelectorAll('#expand,#collapse,#mine,#fit,#plus,#minus,#resetPan').forEach(b=>b?.addEventListener('click',()=>setTimeout(draw,300)));
 document.querySelector('#search')?.addEventListener('input',()=>setTimeout(draw,100));window.addEventListener('resize',draw);
 new MutationObserver(()=>{if(state.arrange)draw()}).observe(document.getElementById('root'),{attributes:true,subtree:true,attributeFilter:['class']});
}
if(document.readyState==='loading')window.addEventListener('DOMContentLoaded',()=>window.addEventListener('load',()=>setTimeout(init,100)));else window.addEventListener('load',()=>setTimeout(init,100));
})();