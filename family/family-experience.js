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

/* One Background menu: separate season and day/night preferences, both Automatic by default.
   Astronomical day/night uses a NOAA-style solar position approximation for Waldorf, Maryland.
   The illustration remains fixed on the viewport while cards/connections scroll and zoom. */
const KEY_SEASON='wdw-family-tree-season',KEY_LIGHT='wdw-family-tree-light';
const savedPref=(key,valid)=>{try{const value=localStorage.getItem(key);return valid.includes(value)?value:'auto'}catch(e){return 'auto'}};
const seasonOptions=[['auto','Automatic'],['fall','Fall'],['winter','Winter'],['spring','Spring / Summer']];
const lightOptions=[['auto','Automatic'],['light','Day'],['dark','Night']];
const controls=document.createElement('div');controls.className='family-background-controls';
const bgButton=document.createElement('button');bgButton.type='button';bgButton.className='navbtn';bgButton.id='familyBackgroundButton';bgButton.textContent='Background ▾';bgButton.setAttribute('aria-expanded','false');bgButton.title='Season and day/night settings';
const panel=document.createElement('div');panel.className='family-background-panel';panel.id='familyBackgroundPanel';panel.hidden=true;
const buildSelect=(title,options,key,id)=>{
 const wrapper=document.createElement('label');wrapper.textContent=title;
 const sel=document.createElement('select');sel.id=id;
 for(const [value,text]of options){const opt=document.createElement('option');opt.value=value;opt.textContent=text;sel.append(opt)}
 sel.value=savedPref(key,options.map(o=>o[0]));wrapper.append(sel);panel.append(wrapper);
 sel.addEventListener('change',()=>{try{localStorage.setItem(key,sel.value)}catch(e){}applySeason()});
 return sel;
};
const seasonPicker=buildSelect('Season',seasonOptions,KEY_SEASON,'familySeasonPicker');
const lightPicker=buildSelect('Day / Night',lightOptions,KEY_LIGHT,'familyLightPicker');
const hint=document.createElement('small');hint.textContent='Automatic follows Maryland seasons and sunrise/sunset.';panel.append(hint);
controls.append(bgButton,panel);
const nav=document.querySelector('nav .tools'),themeBtn=document.getElementById('themeBtn');
if(themeBtn){nav?.insertBefore(controls,themeBtn);themeBtn.hidden=true;themeBtn.style.display='none'}else nav?.append(controls);
bgButton.addEventListener('click',()=>{panel.hidden=!panel.hidden;bgButton.setAttribute('aria-expanded',String(!panel.hidden))});
document.addEventListener('pointerdown',event=>{if(!controls.contains(event.target)){panel.hidden=true;bgButton.setAttribute('aria-expanded','false')}});
const mdParts=()=>{
 const parts=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',month:'numeric',day:'numeric',year:'numeric'}).formatToParts(new Date());
 const n=key=>+(parts.find(p=>p.type===key)?.value||0);
 return {month:n('month'),day:n('day'),year:n('year')};
};
const seasonal=()=>{const {month}=mdParts();return month>=9&&month<=11?'fall':month===12||month<=2?'winter':'spring'};
function marylandIsDay(d){
 // NOAA equation of time/declination and solar elevation; latitude/longitude approximate Waldorf, MD.
 const lat=38.625*Math.PI/180,longitude=-76.94;
 const yearStart=Date.UTC(d.getUTCFullYear(),0,1);
 const day=(d.getTime()-yearStart)/86400000+1;
 const gamma=2*Math.PI/365*(day-1+(d.getUTCHours()-12)/24);
 const eq=229.18*(.000075+.001868*Math.cos(gamma)-.032077*Math.sin(gamma)-.014615*Math.cos(2*gamma)-.040849*Math.sin(2*gamma));
 const dec=.006918-.399912*Math.cos(gamma)+.070257*Math.sin(gamma)-.006758*Math.cos(2*gamma)+.000907*Math.sin(2*gamma)-.002697*Math.cos(3*gamma)+.00148*Math.sin(3*gamma);
 const minute=d.getUTCHours()*60+d.getUTCMinutes()+d.getUTCSeconds()/60;
 const time=((minute+eq+longitude*4)%1440+1440)%1440;
 const hourAngle=(time/4-180)*Math.PI/180;
 const cosine=Math.sin(lat)*Math.sin(dec)+Math.cos(lat)*Math.cos(dec)*Math.cos(hourAngle);
 return cosine>Math.sin(-.833*Math.PI/180);
}
let lastAsset='';
function applySeason(){
 const season=seasonPicker.value==='auto'?seasonal():seasonPicker.value;
 const isDark=lightPicker.value==='auto'?!marylandIsDay(new Date()):lightPicker.value==='dark';
 const asset='./assets/seasonal/'+season+'-'+(isDark?'dark':'light')+'.webp';
 if(lastAsset!==asset){view.style.backgroundImage='url("'+asset+'")';lastAsset=asset}
 view.dataset.season=season;view.dataset.mode=isDark?'dark':'light';
 document.body.classList.toggle('dark',isDark);
 bgButton.title=season.replace('spring','Spring/Summer').replace('fall','Fall').replace('winter','Winter')+' · '+(isDark?'Night':'Day');
}
applySeason();
// Update around sunrise and sunset, without requiring a page refresh.
setInterval(()=>{if(seasonPicker.value==='auto'||lightPicker.value==='auto')applySeason()},60000);
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
