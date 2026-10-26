/* Family Jukebox: category buttons, resource links, compact chrome. */
(()=>{'use strict';
const pop=document.getElementById('musicPop'),trigger=document.getElementById('musicToggle');
if(!pop)return;pop.replaceChildren();pop.classList.add('family-jukebox');
const header=document.createElement('div');header.className='family-jukebox-head';
const title=document.createElement('strong');title.textContent='Family Jukebox';
const mini=document.createElement('button');mini.type='button';mini.className='jukebox-mini';mini.textContent='−';mini.title='Minimize';
const close=document.createElement('button');close.type='button';close.className='jukebox-close';close.textContent='×';close.title='Close Family Jukebox';
header.append(title,mini,close);pop.append(header);
const tabs=document.createElement('div');tabs.className='music-tabs';pop.append(tabs);
const body=document.createElement('div');body.className='family-jukebox-body';pop.append(body);
const foot=document.createElement('div');foot.className='family-jukebox-brand';foot.textContent='Brought to you by InAct Entertainment LLC';pop.append(foot);
const youtube=q=>'https://www.youtube.com/results?search_query='+encodeURIComponent(q);
const tracks=window.FAMILY_IEPLR_TRACKS||[];
const genres=[...new Set(tracks.map(t=>t.genre))].sort((a,b)=>a.localeCompare(b));
const categories={
 Music:genres,
 Movies:['Family Gatherings','Black Family Classics','Comedy & Family','Parents & Children','Family Heritage','Animated Family Stories'],
 Motivation:['Purpose & Legacy','Encouragement','Resilience','Gratitude','Positive Family Bonds'],
 'Family Guidance':['Communication & Listening','Healthy Boundaries','Conflict & Forgiveness','Marriage & Partnership','Parenting & Teens','Adult Children & Parents','Caregiving & Aging','Grief & Loss','Mental Health Support','Addiction & Recovery','Trust & Rebuilding','Blended Families']
};
const films={
 'Family Gatherings':['Soul Food','This Christmas','The Best Man Holiday','The Family Stone'],
 'Black Family Classics':['Soul Food','Crooklyn','The Inkwell','The Preacher’s Wife'],
 'Comedy & Family':['Madea’s Family Reunion','My Big Fat Greek Wedding','Meet the Parents','Johnson Family Vacation'],
 'Parents & Children':['The Pursuit of Happyness','Parenthood','Instant Family','The Blind Side'],
 'Family Heritage':['The Color Purple (1985)','The Farewell','Fences','Coco'],
 'Animated Family Stories':['Encanto','Coco','Soul','Inside Out']
};
const guides={
 'Communication & Listening':[['The Gottman Institute','active listening and family communication'],['Esther Perel','how to have better conversations']],
 'Healthy Boundaries':[['Nedra Glover Tawwab','setting boundaries with family'],['Esther Perel','healthy relationship boundaries']],
 'Conflict & Forgiveness':[['Dr. John Gottman','repair after arguments'],['Esther Perel','relationship conflict and repair']],
 'Marriage & Partnership':[['The Gottman Institute','marriage communication four horsemen'],['Esther Perel','relationships and emotional intimacy']],
 'Parenting & Teens':[['Dr. Becky Kennedy','parenting with connection'],['Child Mind Institute','communicating with teenagers']],
 'Adult Children & Parents':[['Dr. Ramani Durvasula','adult family boundaries'],['Nedra Glover Tawwab','boundaries with parents']],
 'Caregiving & Aging':[['AARP','caregiving family support'],['Family Caregiver Alliance','caregiver stress family']],
 'Grief & Loss':[['Megan Devine','how to support someone grieving'],['David Kessler','grief and family healing']],
 'Mental Health Support':[['NAMI','supporting a family member with mental illness'],['Dr. Thema Bryant','family emotional wellness']],
 'Addiction & Recovery':[['SAMHSA','helping a family member with substance use'],['Hazelden Betty Ford','family support addiction recovery']],
 'Trust & Rebuilding':[['Brené Brown','anatomy of trust'],['Esther Perel','rebuilding trust']],
 'Blended Families':[['Stepfamily Foundation','blended family tips'],['family therapists','blended family support strategies']]
};
const motivation={
 'Purpose & Legacy':['Les Brown family legacy motivation','Brené Brown living with purpose'],
 'Encouragement':['Les Brown you can do it motivation','Steve Harvey motivation family'],
 'Resilience':['Maya Angelou resilience wisdom','Dr. Thema Bryant resilience'],
 'Gratitude':['gratitude TED talk family relationships','Oprah gratitude life lessons'],
 'Positive Family Bonds':['family bonding inspirational TEDx talk','building strong family relationships TEDx']
};
let active='Music';
function addLink(target,label,url){
 const a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener noreferrer';
 a.textContent=label;target.append(a);
}
function renderGroup(group,slot){
 slot.replaceChildren();
 if(active==='Music'){
  const matches=tracks.filter(t=>t.genre===group);
  for(const t of matches)addLink(slot,t.artist+' — '+t.title,'https://www.youtube.com/watch?v='+encodeURIComponent(t.videoId));
 }else if(active==='Movies'){
  for(const movie of films[group]||[])addLink(slot,movie+' · Trailer',youtube(movie+' official trailer'));
 }else if(active==='Motivation'){
  for(const term of motivation[group]||[])addLink(slot,term,youtube(term));
 }else{
  for(const [person,topic]of guides[group]||[])addLink(slot,person+' · '+group,youtube(person+' '+topic));
 }
}
function render(name){
 active=name;tabs.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b.textContent===name));
 body.replaceChildren();
 const categoriesWrap=document.createElement('div');categoriesWrap.className='family-jukebox-categories';
 const links=document.createElement('div');links.className='family-music-links';
 for(const [index,category] of categories[name].entries()){
  const b=document.createElement('button');b.type='button';b.className='family-category-btn';
  b.textContent=category;
  b.addEventListener('click',()=>{
    categoriesWrap.querySelectorAll('button').forEach(x=>x.classList.toggle('active',x===b));
    renderGroup(category,links);
  });
  categoriesWrap.append(b);
  if(index===0){b.classList.add('active');renderGroup(category,links)}
 }
 body.append(categoriesWrap,links);
}
for(const label of ['Music','Movies','Motivation','Family Guidance']){
 const b=document.createElement('button');b.type='button';b.textContent=label;b.addEventListener('click',()=>render(label));tabs.append(b);
}
close.addEventListener('click',()=>{pop.hidden=true;trigger?.setAttribute('aria-expanded','false')});
mini.addEventListener('click',()=>{const collapsed=pop.classList.toggle('jukebox-minimized');mini.textContent=collapsed?'+':'−';mini.title=collapsed?'Expand':'Minimize'});
const footnote=document.createElement('small');footnote.textContent='YouTube opens separately. Family Guidance is educational, not a substitute for professional help.';body.append(footnote);
render('Music');
})();