/* Expanded Wayne's Family Tree, October 25, 2026.
   Keeps the v1 saved positions, images and all 102 legacy identities. */
(()=>{
 'use strict';
 const familyId=(id)=>byId.get(id);
 const law=familyId('w1'), ger=familyId('w2');
 const siblings=['wa-larry','wa-jimmy','wa-roseanne','wa-gary','wa-fred','wa-derek','wa-brody','wa-patrice','wa-thelma','wa-elaine','wa-teresa','w0'];
 const cousinFamilies={
   'wa-elaine':['wa-henderson-derek','wa-henderson-wendy','wa-henderson-reginald'],
   'wa-brody':['wa-brody-isaiah','wa-brody-jason','wa-brody-justin','wa-brody-brianna','wa-brody-unknown'],
   'wa-gary':['wa-gary-chloe']
 };
 // These are 9 empty slots, not verified names or counts from other records.
 const otherSlots=Array.from({length:9},(_,i)=>`wa-lawrence-slot-${i+1}`);
 const extras=PERSONS.filter(p=>p.id.startsWith('wa-'));
 const preservedLayout=saved?.positions||{};
 const extraPosition=(id,x,y)=>{
   if(preservedLayout[id]&&Number.isFinite(preservedLayout[id].x)&&Number.isFinite(preservedLayout[id].y))
     position(id,preservedLayout[id].x,preservedLayout[id].y);
   else position(id,x,y);
 };
 const railX=pos[ger.id].x-20;
 const firstY=CENTER.y+180,spacing=177;
 const activeSiblings=siblings.filter(id=>id!=='w0');
 const migrateFred=Number(saved.layoutVersion||2)<3;
 for(const [i,id] of siblings.entries()){
   if(id==='w0')continue; // Wayne Sr. appears once, beside Jacqueline at the center.
   if(id==='wa-fred'&&migrateFred)position(id,railX,firstY+i*spacing);else extraPosition(id,railX,firstY+i*spacing);
 }
 saved.layoutVersion=3;
 const unknownId='wa-lawrence-other-partner';
 extraPosition(unknownId,pos[law.id].x-250,CENTER.y-740);
 for(let k=0;k<9;k++){
   const col=k%5,row=Math.floor(k/5);
   extraPosition(otherSlots[k],Math.max(240,pos[law.id].x-940)+col*220,CENTER.y-1600+row*150);
 }
 for(const [parent,ids]of Object.entries(cousinFamilies)){
   if(!pos[parent])continue;
   ids.forEach((id,j)=>extraPosition(id,pos[parent].x-(j+1)*237,pos[parent].y+(j%2?14:-14)));
 }
 for(const person of extras){
   if(!pos[person.id])continue;
   if(!cardEls.has(person.id))layoutCard(person);else placeOne(person.id);
   const card=cardEls.get(person.id);
   if(card){card.dataset.kind=person.kind;
     if(person.unconfirmed)card.classList.add('needs-check');
     if(person.kind==='cousin')card.classList.add('cousin');
   }
 }
 const marriagePairs=[['w0',ma.id],['w1','w2'],['w3','w4'],['w5','w6']];
 const rawDrawLines=drawLines;
 function addLine(a,b,kind=''){
   if(!pos[a]||!pos[b])return;
   edge(a,b,false);
   const el=wire.lastElementChild;
   if(el&&kind)el.classList.add(kind);
 }
 function curveBetween(a,b,kind){
   const A=pos[a],B=pos[b];if(!A||!B)return;
   const x1=A.x+CW/2,y1=A.y+CH/2,x2=B.x+CW/2,y2=B.y+CH/2;
   const el=document.createElementNS('http://www.w3.org/2000/svg','path');
   el.setAttribute('d',`M ${x1} ${y1} C ${(x1+x2)/2} ${y1}, ${(x1+x2)/2} ${y2}, ${x2} ${y2}`);
   el.setAttribute('class','connect '+kind);wire.append(el);
 }
 function extendedLines(){
   rawDrawLines();
   marriagePairs.forEach(([a,b])=>curveBetween(a,b,'marital'));
   // The second Lawrence partnership is not confirmed as a marriage.
   curveBetween(law.id,unknownId,'provisional');
   for(const id of siblings){
      if(id==='w0')continue;
      addLine(law.id,id);
      addLine(ger.id,id);
   }
   for(const id of otherSlots){addLine(law.id,id,'provisional');addLine(unknownId,id,'provisional')}
   for(const [parent,children] of Object.entries(cousinFamilies))
      for(const id of children)curveBetween(parent,id,'cousin');
 }
 // Reassign the draw function, so every Arrange/Import event redraws the added links too.
 drawLines=extendedLines;
 drawLines();

 // Complete the four-way image: two horizontally mirrored halves, each flipped above the center.
 for(const el of document.querySelectorAll('.tree-art:not(.upper):not(.lower)')){
   for(const part of ['upper','lower']){
     const half=el.cloneNode(false);
     half.classList.add(part);
     board.insertBefore(half,board.firstChild);
   }
 }
 wire.setAttribute('height',String(HEIGHT));wire.setAttribute('viewBox',`0 0 ${WIDTH} ${HEIGHT}`);
 updateZoom(zoom); // The whole map extends further up/down without losing horizontal pan.
 document.querySelector('#viewport')?.setAttribute('aria-label','Scrollable two-dimensional Williams and Goodson family map');
 document.querySelector('nav a[href="./classic.html"]')?.remove();
 // Parent/cousin family detail defaults, editable in the individual person card.
 if(!saved.profiles||typeof saved.profiles!=='object')saved.profiles={};
 const defaults={
  [me?.id]:{lifeStatus:'living',relationship:'You',parents:'Wayne Williams Sr. and Jacqueline Marie Louise Goodson',children:'Jasmine Williams, Jordan Williams',occupation:'Educator, curriculum designer, instructional designer and family historian',notes:'Wayne Williams is an educator and lifelong learner dedicated to preserving the Williams and Goodson family history. Through curriculum design, creative projects and family storytelling, he is building a legacy for the next generation.'},
  [girl?.id]:{lifeStatus:'living',parents:'Wayne Williams and Michelle Joseph',relationship:'Daughter',notes:'Michelle Joseph is the other parent and is not displayed in this blood-relative tree.'},
  [boy?.id]:{lifeStatus:'living',parents:'Wayne Williams and Anika Fountain',relationship:'Son',notes:'Anika Fountain is the other parent and is not displayed in this blood-relative tree.'},
  [ma?.id]:{lifeStatus:'living',relationship:'Mother',occupation:'Registered nurse',children:'Wayne Williams Jr.'},
  [dad?.id]:{relationship:'Father',parents:'Lawrence Williams and Gertrude Smith',children:'Wayne Williams Jr.'},
  [law.id]:{relationship:'Paternal grandfather',spouse:'Gertrude Smith; other partner name unknown',children:'Larry, Jimmy, Roseanne, Gary, Wayne Sr., Derek, Brody, Patrice, Thelma, Elaine, Teresa, Fred'},
  [ger.id]:{relationship:'Paternal grandmother',spouse:'Lawrence Williams',children:'Larry, Jimmy, Roseanne, Gary, Wayne Sr., Derek, Brody, Patrice, Thelma, Elaine, Teresa, Fred'},
  'wa-elaine':{relationship:'Paternal aunt',children:'Derek Henderson, Wendy Henderson, Reginald Henderson'},
  'wa-brody':{relationship:'Paternal uncle',children:'Isaiah Williams, Jason Williams, Justin Williams, Brianna Williams, daughter (name unknown)'},
  'wa-gary':{relationship:'Paternal uncle',children:'Chloe Williams'},
  'g3':{relationship:'Maternal grandmother',parents:'William Robertson and Laura O. Robertson',spouse:'William Eugene Goodson Sr. “Willie”',children:'Pamela Jean Goodson, Jacqueline Goodson, William Eugene Goodson Jr., Alicia Goodson (and other descendants as shown)'},
  'g22':{relationship:'Maternal grandfather',spouse:'Mary Alice D’Agostiano (Alice Goodson)',children:'Pamela Jean Goodson, Jacqueline Goodson, William Eugene Goodson Jr., Alicia Goodson (and other descendants as shown)'},
  'alice-robertson-father':{relationship:'Maternal great-grandfather',children:'Mary Alice D’Agostiano (Alice Goodson)',spouse:'Laura O. Robertson',notes:'Listed on supplied Ancestry screenshot. Additional records and dates await confirmation.'},
  'alice-robertson-mother':{relationship:'Maternal great-grandmother',children:'Mary Alice D’Agostiano (Alice Goodson)',spouse:'William Robertson',notes:'Listed on supplied Ancestry screenshot. Additional records and dates await confirmation.'},
  [unknownId]:{relationship:'Other Lawrence family branch (details unconfirmed)',spouse:'Lawrence Williams',notes:'Name and partnership/marital status need confirmation. Nine blank child slots are provided for manual completion.'}
 };
 const siblingNames=siblings.map(id=>shortName(byId.get(id)?.name||'')).filter(Boolean);
 for(const id of siblings){
    defaults[id]={parents:'Lawrence Williams and Gertrude Smith',siblings:siblingNames.filter(x=>x!==shortName(byId.get(id)?.name||'')).join(', '),...(defaults[id]||{})};
 }
 const getProfile=id=>{const p=byId.get(id),year=p?.name.match(/\((\d{4})\s*[–-]/)?.[1]||'';return{birthDate:year,deathDate:'',lifeStatus:'unknown',...defaults[id],...(saved.profiles?.[id]||{})}};
 const drawer=document.getElementById('drawer');
 const relation=document.getElementById('personRelation');
 const heading=document.createElement('h3');heading.textContent='';heading.hidden=true;heading.id='profileHeading';
 const summary=document.createElement('div');summary.className='family-summary';summary.id='familySummary';
 relation.insertAdjacentElement('afterend',heading);heading.insertAdjacentElement('afterend',summary);
 const fields=[['birthDate','Born (date or year)'],['deathDate','Died (date or year)'],['lifeStatus','Life status'],['relationship','Relationship to Wayne'],['parents','Parents'],['spouse','Spouse / partner'],['children','Children'],['siblings','Brothers and sisters'],['occupation','Occupation / life history'],['notes','Biography / memories']];
 const fieldWrap=document.createElement('section');fieldWrap.id='profileFields';fieldWrap.hidden=true;
 const selectors={};
 for(const [key,title]of fields){
   const label=document.createElement('label');label.textContent=title;label.htmlFor='profile-'+key;
   const el=document.createElement(key==='lifeStatus'?'select':key==='notes'?'textarea':'input');
   el.id='profile-'+key;if(key==='lifeStatus'){for(const [value,text]of [['unknown','Not yet recorded'],['living','Living'],['deceased','Deceased']]){const option=document.createElement('option');option.value=value;option.textContent=text;el.append(option)}}else{if(key!=='notes')el.type='text';el.placeholder='Not yet recorded'}
   fieldWrap.append(label,el);selectors[key]=el;
 }
 const addNote=document.createElement('p');addNote.className='fieldhint';addNote.textContent='Edit these details and choose Save Profile. Changes stay in this browser until you Export and send the backup for publishing.';
 const saveProfile=document.createElement('button');saveProfile.className='navbtn profile-save';saveProfile.type='button';saveProfile.textContent='Save Profile';
 fieldWrap.append(addNote,saveProfile);
 summary.insertAdjacentElement('afterend',fieldWrap);
 const lifeDates=document.createElement('div');lifeDates.id='familyLifeDates';lifeDates.className='family-life-dates';
 function profileText(p){
   const x=getProfile(p.id);summary.replaceChildren();lifeDates.replaceChildren();
   const item=(root,label,value)=>{const row=document.createElement('div');row.className='family-fact';const term=document.createElement('dt'),detail=document.createElement('dd');term.textContent=label;detail.textContent=value||'Not yet recorded';if(!value)detail.className='family-missing';row.append(term,detail);root.append(row)};
   const dates=document.createElement('dl');item(dates,'Born',x.birthDate);
   if(x.lifeStatus==='living')item(dates,'Life status','Living');else {item(dates,'Died',x.deathDate);if(x.lifeStatus==='deceased')item(dates,'Life status','Deceased');else item(dates,'Life status','Not yet recorded')}
   lifeDates.append(dates);
   const bioTitle=document.createElement('h3');bioTitle.textContent='Biography';const bio=document.createElement('p');bio.textContent=x.notes||'A life story is waiting to be added.';if(!x.notes)bio.className='family-missing';summary.append(bioTitle,bio);
   if(x.occupation){const work=document.createElement('p');work.className='family-life-work';work.textContent=x.occupation;summary.append(work)}
   const familyTitle=document.createElement('h3');familyTitle.textContent='Family';const family=document.createElement('dl');
   for(const [key,label]of [['parents','Parents'],['spouse','Spouse / partner'],['children','Children'],['siblings','Brothers and sisters']])item(family,label,x[key]);
   summary.append(familyTitle,family);
 }
 window.FAMILY_PROFILE={get:getProfile,render:profileText,lifeDates};
 const originalOpenEditor=openEditor;
 openEditor=function(id){originalOpenEditor(id);const p=byId.get(id);if(!p)return;
   const x=getProfile(id);for(const [key]of fields)selectors[key].value=x[key]||(key==='lifeStatus'?'unknown':'');
   profileText(p);
   document.getElementById('personRelation').textContent=x.relationship||p.role;
 };
 saveProfile.onclick=()=>{
    if(!arrange||!focused)return;
    const data={};for(const [key]of fields)data[key]=selectors[key].value.trim();
    saved.profiles[focused]=data;
    writeSave();profileText(byId.get(focused));
    document.getElementById('personRelation').textContent=data.relationship||byId.get(focused).role;
    showStatus('Profile saved to this browser. Export to publish for relatives.');
 };
 // Fix image zoom: scale and pan *within the frame*, never stretch the card/drawer.
 const drawerImage=document.getElementById('drawerImage');
 const stage=document.createElement('div');stage.className='photo-stage';drawerImage.parentNode.insertBefore(stage,drawerImage);stage.append(drawerImage);
 const originalDrawPreview=drawPreview;
 drawPreview=function(){originalDrawPreview();if(!focused)return;
    const x=document.getElementById('cropX').value,y=document.getElementById('cropY').value;
    drawerImage.style.transformOrigin=`${x}% ${y}%`;
 };
 const oldUpdatePhoto=updatePhoto;
 updatePhoto=function(p){oldUpdatePhoto(p);const im=cardEls.get(p.id)?.querySelector('.visual img');if(im){const crop=saved.pictures[p.id]||{};im.style.transformOrigin=`${crop.x??50}% ${crop.y??50}%`}};
 for(const p of PERSONS)if(cardEls.has(p.id))updatePhoto(p);
 // Pan by grabbing empty canvas while keeping native horizontal/vertical scrollbars.
 view.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'&&!e.target.closest('.person,button,input'))view.classList.add('grabbing')});
 window.addEventListener('pointerup',()=>view.classList.remove('grabbing'));
 window.addEventListener('pointercancel',()=>view.classList.remove('grabbing'));

 // Curated outbound searches rather than pretending the site owns licensed playback.
 const searchURL=(q)=>'https://www.youtube.com/results?search_query='+encodeURIComponent(q);
 const groups={
 Motivation:[['Purpose & Legacy','building a family legacy motivational speech'],['Perseverance','Les Brown never give up motivational speech'],['Family First','power of family bonds inspirational speech'],['Gratitude','gratitude guided motivational speech'],['Lifelong Learning','growth mindset motivational speech'],['Strength Through Challenges','resilience overcoming obstacles motivation']],
 Music:[['Family Anthems','Sister Sledge We Are Family official music'],['Soul & R&B','The O Jays Family Reunion song'],['Motown','Jackson 5 I ll Be There official'],['Gospel','Kirk Franklin Love Theory'],['Jazz','Louis Armstrong What a Wonderful World'],['Hip-Hop','Will Smith Just the Two of Us'],['Pop','Bruno Mars Count on Me'],['Funk & Disco','Earth Wind and Fire September'],['Classic Rock','The Beatles All You Need Is Love'],['Country','Dolly Parton Coat of Many Colors'],['Reggae','Bob Marley Three Little Birds'],['Latin','Celia Cruz La Vida Es Un Carnaval'],['Classic Soul','Bill Withers Lean On Me'],['Family Memories','Stevie Wonder Isn t She Lovely']],
 Movies:[['It’s a Wonderful Life','Its a Wonderful Life 1946 official trailer'],['The Sound of Music','The Sound of Music 1965 trailer'],['Coco','Coco Disney Pixar official trailer'],['The Lion King','The Lion King 1994 official trailer'],['The Parent Trap','The Parent Trap 1998 trailer'],['The Incredibles','The Incredibles Pixar official trailer'],['Encanto','Encanto Disney official trailer'],['Little Women','Little Women 2019 official trailer'],['Finding Nemo','Finding Nemo Pixar official trailer'],['The Pursuit of Happyness','Pursuit of Happyness trailer'],['Soul','Soul Pixar official trailer'],['Hidden Figures','Hidden Figures official trailer'],['The Princess Bride','The Princess Bride movie trailer'],['Remember the Titans','Remember the Titans 2000 trailer']],
 Meditation:[['Family Gratitude','family gratitude meditation guided'],['Peaceful Reflection','10 minute quiet guided meditation'],['Remembrance','meditation honoring ancestors'],['Calming Music','calm piano music meditation'],['Breathing','5 minute guided breathing meditation']]
 };
 const musicList=document.getElementById('musicList');
 const musicSection=document.createElement('div');musicSection.className='media-section';
 musicList.replaceWith(musicSection);
 function renderMusic(tab){musicSection.replaceChildren();const intro=document.createElement('p');intro.textContent=tab==='Music'?'Family-friendly selections across genres and generations. Tap to open a listening search.':tab==='Movies'?'Family film favorites. Tap to find a trailer.':tab==='Motivation'?'Motivational video topics. Tap to browse videos.':'Quiet videos for reflection; no autoplay.';musicSection.append(intro);const links=document.createElement('div');links.className='media-links';
 const originalSelections=tab==='Music'?(window.FAMILY_IEPLR_TRACKS||[]).map(item=>[`${item.genre} · ${item.artist} — ${item.title}`,`https://www.youtube.com/watch?v=${encodeURIComponent(item.videoId)}`]):[];
 const otherSelections=groups[tab].map(([name,query])=>[name,searchURL(query)]);
 for(const [name,url] of [...originalSelections,...otherSelections]){const a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.textContent=name;links.append(a)}musicSection.append(links)}
 for(const button of document.querySelectorAll('[data-mtab]'))button.addEventListener('click',()=>renderMusic(button.dataset.mtab));
 renderMusic('Motivation');
 const textUnder=document.querySelector('.musicpop p:last-child');if(textUnder?.textContent?.includes('placeholders'))textUnder.textContent='Listening and video links open external searches; no autoplay or downloads.';
 const count=document.getElementById('countLabel');count.textContent=PERSONS.length+' family and placeholder cards · Williams ← Wayne → Goodson';
 focusWayne(true);
})();
