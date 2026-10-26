/* Family tree experience enhancement. No personal contact information stored in public code. */
(()=>{
'use strict';
const board=document.getElementById('canvas'),view=document.getElementById('viewport');
if(!board||!view)return;
// Nine separate image panels across three rows: each column mirrors its neighbor.
for(const old of board.querySelectorAll('.tree-art'))old.remove();
const layer=document.createElement('div');layer.id='familyArtNine';layer.setAttribute('aria-hidden','true');
for(let i=0;i<9;i++){const tile=document.createElement('div');tile.className='family-art-tile tile-'+i;layer.append(tile);}
board.prepend(layer);
// Photo drawer image is clipped within its own viewport; existing crop sliders remain active.
const photo=document.getElementById('drawerImage');
if(photo){const stage=document.createElement('div');stage.className='family-photo-frame';photo.parentNode.insertBefore(stage,photo);stage.append(photo);}
// Put expand/restore alongside existing navigation; do not change stable IDs or saves.
const nav=document.querySelector('nav .tools');
const expand=document.createElement('button');expand.type='button';expand.className='navbtn';expand.id='expandFamily';expand.textContent='Expand All';
nav?.insertBefore(expand,document.getElementById('modeBtn'));
const featured=new Set([me?.id,girl?.id,boy?.id,ma?.id,dad?.id,'w1','w2','g3','g22'].filter(Boolean));
let expanded=false;
function applyView(){
  for(const [id,el] of cardEls)el.classList.toggle('family-collapsed',!expanded&&!featured.has(id));
  const connectors=document.getElementById('links');
  // Hide connectors in the simple starting view to avoid lines pointing to invisible cards.
  if(connectors)connectors.style.visibility=expanded?'visible':'hidden';
  expand.textContent=expanded?'Family Focus':'Expand All';
  expand.setAttribute('aria-pressed',String(expanded));
}
expand.addEventListener('click',()=>{
 expanded=!expanded;applyView();
 if(expanded){updateZoom(.25);focus(CENTER.x,CENTER.y,true)}
 else{updateZoom(.8);focus(CENTER.x,CENTER.y,true)}
});
applyView();
// Existing zoom lower-bound may still be used by the original controls. Give the family map a smaller overview step.
const zoomOut=document.getElementById('zoomOut');
zoomOut?.addEventListener('click',()=>{if(expanded&&zoom<=.4){updateZoom(Math.max(.2,zoom-.05));focus(CENTER.x,CENTER.y,true)}});
// Two small card actions. Opening a biography continues to use the established profile drawer.
for(const [id,el] of cardEls){
  if(el.querySelector('.family-card-actions'))continue;
  const controls=document.createElement('span');controls.className='family-card-actions';
  const detail=document.createElement('span');detail.className='family-card-action';detail.title='Open family biography';detail.textContent='▣';
  const locate=document.createElement('span');locate.className='family-card-action';locate.title='Focus on family member';locate.textContent='⊕';
  controls.append(detail,locate);el.append(controls);
  detail.addEventListener('click',e=>{e.stopPropagation();openEditor(id)});
  locate.addEventListener('click',e=>{e.stopPropagation();if(!expanded){expanded=true;applyView()}updateZoom(Math.max(zoom,.7));focus(pos[id].x,pos[id].y)});
}
// Jukebox: existing catalog provides music genres, family topics link to searches/videos.
const toggle=document.getElementById('musicToggle'),pop=document.getElementById('musicPop');
if(pop){
 pop.innerHTML='';
 const title=document.createElement('strong');title.textContent='InAct Entertainment · Family Jukebox';pop.append(title);
 const hint=document.createElement('p');hint.textContent='Music • Movies • Motivation • Mending Together';pop.append(hint);
 const tabs=document.createElement('div');tabs.className='music-tabs';pop.append(tabs);
 const area=document.createElement('div');area.className='family-music-content';pop.append(area);
 const catalog=window.FAMILY_IEPLR_TRACKS||[];
 const groups={
  Music:[...new Set(catalog.map(x=>x.genre))].sort(),
  Movies:['Family Bonds','Growing Up','Parenting & Parenthood','Grandparents & Generations','Family Reunions'],
  Motivation:['Purpose & Legacy','Strength & Resilience','Family Encouragement','Overcoming Obstacles'],
  'Mending Together':['Communication & Listening','Conflict & Forgiveness','Healthy Boundaries','Marriage & Partnership','Parenting & Teens','Adult Children & Parents','Caregiving & Aging','Grief & Loss','Family Mental Health','Addiction & Recovery','Trust & Rebuilding','Blended Families']
 };
 const films={
  'Family Bonds':['Soul','The Pursuit of Happyness','Little Miss Sunshine'],
  'Growing Up':['Inside Out','Boyhood','Turning Red'],
  'Parenting & Parenthood':['Parenthood','Mrs. Doubtfire','Instant Family'],
  'Grandparents & Generations':['Coco','Encanto','The Farewell'],
  'Family Reunions':['This Christmas','Soul Food','The Family Stone']
 };
 const guides={
 'Communication & Listening':'The Gottman Institute listening and understanding family communication',
 'Conflict & Forgiveness':'Esther Perel repair conflict family relationships',
 'Healthy Boundaries':'Esther Perel healthy family boundaries',
 'Marriage & Partnership':'The Gottman Institute four horsemen relationship repair',
 'Parenting & Teens':'Child Mind Institute parent teen communication',
 'Adult Children & Parents':'Esther Perel adult children family dynamics',
 'Caregiving & Aging':'American Psychological Association family caregiving support',
 'Grief & Loss':'Megan Devine grief and family support',
 'Family Mental Health':'NAMI family support mental health communication',
 'Addiction & Recovery':'SAMHSA supporting family member substance use recovery',
 'Trust & Rebuilding':'Brene Brown trust and vulnerability relationships',
 'Blended Families':'family therapist blended family relationships'
 };
 const youtube=q=>'https://www.youtube.com/results?search_query='+encodeURIComponent(q);
 const addLink=(name,url)=>{const a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.textContent=name;area.append(a)};
 function display(tab){
 tabs.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b.textContent===tab));area.replaceChildren();
 const pick=document.createElement('select');pick.setAttribute('aria-label','Choose '+tab+' category');pick.className='family-music-select';
 const placeholder=document.createElement('option');placeholder.value='';placeholder.textContent='Choose '+tab+' category';pick.append(placeholder);
 for(const name of groups[tab]){const option=document.createElement('option');option.value=name;option.textContent=name;pick.append(option)}
 area.append(pick);
 const links=document.createElement('div');links.className='family-music-links';area.append(links);
 function show(category){
 links.replaceChildren();if(!category)return;
 const link=(name,url)=>{const a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.textContent=name;links.append(a)};
 if(tab==='Music')for(const entry of catalog.filter(x=>x.genre===category))link(entry.artist+' — '+entry.title,'https://www.youtube.com/watch?v='+encodeURIComponent(entry.videoId));
 if(tab==='Movies')for(const film of films[category]||[])link(film+' · trailer / information',youtube(film+' official movie trailer'));
 if(tab==='Motivation')for(const q of [category+' inspirational TED talk',category+' family motivation speech'])link(q,youtube(q));
 if(tab==='Mending Together')for(const q of [guides[category],category+' licensed family therapist advice'])link(q,youtube(q));
 }
 pick.addEventListener('change',()=>show(pick.value));
 }
 for(const name of ['Music','Movies','Motivation','Mending Together']){const b=document.createElement('button');b.type='button';b.textContent=name;b.addEventListener('click',()=>display(name));tabs.append(b)}
 const note=document.createElement('p');note.textContent='Videos and titles open YouTube. Family resources are educational and do not replace professional counseling.';pop.append(note);
 display('Music');
 // Previous listener remains installed: allow original toggle but don't add a second toggle handler.
}
})();
