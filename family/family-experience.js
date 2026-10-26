/* Family seasonal tree backgrounds and curated family jukebox.
   Artwork only changes behind the cards; no cards or connection lines are hidden. */
(()=>{
'use strict';
const board=document.getElementById('canvas'),view=document.getElementById('viewport');
if(!board||!view)return;
for(const old of board.querySelectorAll('.tree-art,#familyArtNine'))old.remove();
const backdrop=document.createElement('div');
backdrop.id='familySeasonalBackdrop';
backdrop.setAttribute('aria-hidden','true');
board.prepend(backdrop);
const nowSeason=()=>{
 const month=new Date().getMonth()+1;
 return month>=9&&month<=11?'fall':month===12||month<=2?'winter':'spring';
};
const options=[['auto','Automatic'],['fall','Fall'],['winter','Winter'],['spring','Spring / Summer']];
const picker=document.createElement('select');
picker.id='familySeasonPicker';
picker.className='navbtn';
picker.setAttribute('aria-label','Family tree season');
picker.title='Seasonal tree background';
for(const [id,title]of options){const option=document.createElement('option');option.value=id;option.textContent=title;picker.append(option)}
let stored='auto';try{stored=localStorage.getItem('wdw-family-tree-season')||'auto'}catch(e){}
picker.value=options.some(x=>x[0]===stored)?stored:'auto';
const themeBtn=document.getElementById('themeBtn');
const nav=document.querySelector('nav .tools');
if(themeBtn)nav?.insertBefore(picker,themeBtn);else nav?.append(picker);
function applySeason(){
 const season=picker.value==='auto'?nowSeason():picker.value;
 const isDark=document.body.classList.contains('dark');
 backdrop.style.backgroundImage='url("./assets/seasonal/'+season+'-'+(isDark?'dark':'light')+'.webp")';
 backdrop.dataset.season=season;
 backdrop.dataset.mode=isDark?'dark':'light';
}
picker.addEventListener('change',()=>{try{localStorage.setItem('wdw-family-tree-season',picker.value)}catch(e){}applySeason()});
themeBtn?.addEventListener('click',()=>requestAnimationFrame(applySeason));
applySeason();
// Preserve all existing visible cards and SVG connection lines; never collapse them.
for(const el of cardEls.values())el.classList.remove('family-collapsed');
const wire=document.getElementById('links');if(wire)wire.style.visibility='visible';
// Keep the portrait editor zoom cropped inside the same fixed picture frame.
const photo=document.getElementById('drawerImage');
if(photo&&!photo.closest('.family-photo-frame')){
 const stage=document.createElement('div');stage.className='family-photo-frame';
 photo.parentNode.insertBefore(stage,photo);stage.append(photo);
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
