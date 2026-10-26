/* Family Jukebox: compact IEPLR-inspired branching selection and in-panel playback. */
(()=>{
'use strict';
const pop=document.getElementById('musicPop');
const trigger=document.getElementById('musicToggle');
if(!pop)return;
const movieCatalog=[{"title":"Daughters of the Dust","video":"zdMxR2M_ddM","category":"Family Heritage"},{"title":"A Raisin in the Sun","video":"g4nRjTRDo6E","category":"Family Relationships"},{"title":"Crooklyn","video":"HYVHCtw3DdQ","category":"Family Heritage"},{"title":"Sounder","video":"N_arLbvbsFo","category":"Family Heritage"},{"title":"Claudine","video":"UP-v7kxrwdE","category":"Family Relationships"},{"title":"Coming to America","video":"e5BtKlO-LnA","category":"Family Comedy"},{"title":"Fences","video":"spCxVd9ctFs","category":"Family Relationships"},{"title":"To Sleep with Anger","video":"JyQNmlioEeE","category":"Family Heritage"},{"title":"Miss Juneteenth","video":"Vb3oREG_DdA","category":"Family Relationships"},{"title":"Soul Food","video":"uqg19AMm07Q","category":"Family Heritage"},{"title":"Fast Color","video":"tySUZIiXObc","category":"Family Heritage"},{"title":"The Burial of Kojo","video":"PNe5rdF3JIM","category":"Family Heritage"}];
const tracks=window.FAMILY_IEPLR_TRACKS||[];
const guides={
 'Communication & Listening':['The Gottman Institute','Esther Perel'],
 'Healthy Boundaries':['Nedra Glover Tawwab','Esther Perel'],
 'Conflict & Forgiveness':['John Gottman','Esther Perel'],
 'Marriage & Partnership':['The Gottman Institute','Esther Perel'],
 'Parenting & Teens':['Dr. Becky Kennedy','Child Mind Institute'],
 'Adult Children & Parents':['Nedra Glover Tawwab','Dr. Ramani'],
 'Caregiving & Aging':['AARP Family Caregiving','Family Caregiver Alliance'],
 'Grief & Loss':['David Kessler','Megan Devine'],
 'Mental Health Support':['NAMI','Dr. Thema Bryant'],
 'Addiction & Recovery':['SAMHSA','Hazelden Betty Ford'],
 'Trust & Rebuilding':['Brené Brown','Esther Perel'],
 'Blended Families':['Stepfamily Foundation','Family Therapy']
};
const motivations={
 'Purpose & Legacy':['Les Brown','Maya Angelou'],
 'Encouragement':['Steve Harvey','Les Brown'],
 'Resilience':['Brené Brown','Dr. Thema Bryant'],
 'Gratitude':['Oprah Winfrey','TEDx'],
 'Positive Family Bonds':['TEDx family relationships','Family Legacy']
};
const categories={
 Music:[...new Set(tracks.map(t=>t.genre))].sort(),
 Movies:['Family Heritage','Family Relationships','Family Comedy'],
 Motivation:Object.keys(motivations),
 'Family Guidance':Object.keys(guides)
};
pop.replaceChildren();pop.classList.add('family-jukebox');
const head=document.createElement('div');head.className='family-jukebox-head';
const title=document.createElement('strong');title.textContent='Family Jukebox';
const min=document.createElement('button');min.type='button';min.textContent='−';min.setAttribute('aria-label','Minimize jukebox');
const close=document.createElement('button');close.type='button';close.textContent='×';close.setAttribute('aria-label','Close jukebox');
head.append(title,min,close);pop.append(head);
const tabs=document.createElement('div');tabs.className='music-tabs';
const content=document.createElement('div');content.className='family-jukebox-body';
const categoriesEl=document.createElement('div');categoriesEl.className='family-jukebox-categories';
const choices=document.createElement('div');choices.className='family-music-links';
const player=document.createElement('section');player.className='family-embedded-player';player.hidden=true;
const playerTitle=document.createElement('div');playerTitle.className='family-player-title';
const frameWrap=document.createElement('div');frameWrap.className='family-player-frame';
const stop=document.createElement('button');stop.type='button';stop.className='navbtn';stop.textContent='■ Stop video';stop.onclick=clearPlayer;
player.append(playerTitle,frameWrap,stop);
content.append(categoriesEl,choices,player);
pop.append(tabs,content);
const brand=document.createElement('div');brand.className='family-jukebox-brand';
const logo=document.createElement('img');
logo.src='https://raw.githubusercontent.com/inactentertainment/ie/main/assets/ie-logo.svg';
logo.alt='InAct Entertainment logo';logo.loading='lazy';logo.width=22;logo.height=22;
const brandText=document.createElement('span');brandText.textContent='Brought to you by InAct Entertainment';
brand.append(logo,brandText);pop.append(brand);
function clearPlayer(){frameWrap.replaceChildren();player.hidden=true;playerTitle.textContent=''}
function play(item){
 clearPlayer();playerTitle.textContent=item.label;
 const frame=document.createElement('iframe');
 frame.title=item.label;frame.loading='eager';
 frame.src='https://www.youtube-nocookie.com/embed/'+encodeURIComponent(item.video)+'?rel=0&playsinline=1&autoplay=1';
 frame.allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share';
 frame.allowFullscreen=true;frame.referrerPolicy='strict-origin-when-cross-origin';
 frameWrap.append(frame);player.hidden=false;
}
function item(label,video){
 const button=document.createElement('button');button.type='button';button.className='family-video-choice';
 button.textContent='▶ '+label;button.onclick=()=>play({label,video});choices.append(button);
}
function sourceSearch(label,query){
 const a=document.createElement('a');a.href='https://www.youtube.com/results?search_query='+encodeURIComponent(query);
 a.target='_blank';a.rel='noopener noreferrer';a.textContent='Find videos: '+label;choices.append(a);
}
function choose(name,button){
 categoriesEl.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b===button));
 choices.replaceChildren();clearPlayer();
 if(active==='Music'){
  for(const t of tracks.filter(t=>t.genre===name))item(t.artist+' — '+t.title,t.videoId);
 }else if(active==='Movies'){
  for(const m of movieCatalog.filter(m=>m.category===name))item(m.title+' · Trailer',m.video);
 }else{
  const sources=active==='Motivation'?motivations[name]||[]:guides[name]||[];
  for(const person of sources)sourceSearch(person,person+' '+name+' family advice videos');
 }
}
let active=null;
function activate(name,button){
 active=name;tabs.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b===button));
 categoriesEl.replaceChildren();choices.replaceChildren();clearPlayer();
 for(const category of categories[name]){
  const b=document.createElement('button');b.type='button';b.className='family-category-btn';
  b.textContent=category;b.onclick=()=>choose(category,b);categoriesEl.append(b);
 }
}
for(const label of ['Music','Movies','Motivation','Family Guidance']){
 const button=document.createElement('button');button.type='button';button.textContent=label;
 button.onclick=()=>activate(label,button);tabs.append(button);
}
min.onclick=()=>{const collapsed=pop.classList.toggle('jukebox-minimized');min.textContent=collapsed?'+':'−';if(collapsed)clearPlayer()};
close.onclick=()=>{clearPlayer();pop.hidden=true;trigger?.setAttribute('aria-expanded','false')};
trigger?.addEventListener('click',()=>{if(pop.hidden)clearPlayer()});
})();