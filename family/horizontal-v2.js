/* Expanded Wayne's Family Tree, October 25, 2026.
   Keeps the v1 saved positions, images and all 102 legacy identities. */
(()=>{
 'use strict';
 const familyId=(id)=>byId.get(id);
 // Names verified from the family photo descriptions (card IDs and saved positions remain stable).
 const nameUpdates={
   'w1':'Laurence Williams',
   'w2':'Gertrude Smith Williams',
   'wa-henderson-reginald':'Reginal Henderson'
 };
 for(const [id,label] of Object.entries(nameUpdates)){
   const person=byId.get(id);if(!person)continue;
   person.name=label;
   const card=cardEls.get(id);
   if(card){card.setAttribute('aria-label',label+' — '+person.role);const name=card.querySelector('.name');if(name)name.textContent=label;}
 }

 const law=familyId('w1'), ger=familyId('w2');
 const siblings=['wa-larry','wa-jimmy','wa-roseanne','wa-gary','w0','wa-derek','wa-brody','wa-patrice','wa-thelma','wa-elaine','wa-teresa','wa-fred'];
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
 const fatherReference={x:railX,y:firstY+siblings.indexOf('w0')*spacing};
 for(const [i,id] of siblings.entries()){
   if(id==='w0')continue; // Show a reference in the siblings column but keep Wayne Sr.'s single identity.
   extraPosition(id,railX,firstY+i*spacing);
 }
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
   layoutCard(person);
   const card=cardEls.get(person.id);
   if(card){card.dataset.kind=person.kind;
     if(person.unconfirmed)card.classList.add('needs-check');
     if(person.kind==='cousin')card.classList.add('cousin');
   }
 }
 const dadReference=document.createElement('button');dadReference.type='button';dadReference.className='person family-reference';dadReference.style.left=fatherReference.x+'px';dadReference.style.top=fatherReference.y+'px';dadReference.innerHTML='<span class="visual"><span class="fallback">W</span></span><span class="details"><span class="name">Wayne Williams Sr.</span><span class="relation">Father · see center ↗</span></span>';dadReference.addEventListener('click',()=>openEditor(dad.id));board.append(dadReference);
 const fatherPhoto=getPic(dad);if(fatherPhoto){const im=document.createElement('img');im.src=fatherPhoto;im.alt='Wayne Sr.';dadReference.querySelector('.visual').replaceChildren(im)}
 const marriagePairs=[['w0',ma.id],['w1','w2'],['w3','w4'],['w5','w6']];
 const rawDrawLines=drawLines;
 function addLine(a,b,kind=''){
   if(!pos[a]||!pos[b])return;
   edge(a,b,false);
   const el=wire.lastElementChild;
   if(el)el.classList.add(kind);
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
   // Reference for the existing Wayne Sr. card completes the visible group of 12.
   for(const parent of [law.id,ger.id]){
     const A=pos[parent];if(!A)continue;
     const x1=A.x+CW/2,y1=A.y+CH/2,x2=fatherReference.x+CW/2,y2=fatherReference.y+CH/2;
     const line=document.createElementNS('http://www.w3.org/2000/svg','path');
     line.setAttribute('d',`M ${x1} ${y1} C ${(x1+x2)/2} ${y1}, ${(x1+x2)/2} ${y2}, ${x2} ${y2}`);
     line.setAttribute('class','connect');wire.append(line);
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
 const maphelp=document.querySelector('.maphelp');if(maphelp)maphelp.innerHTML='<strong>Wayne is your center.</strong> Scroll left for Williams, right for Goodson, and up or down for the growing branches. Drag empty space to pan. Turn on Arrange to move people.';
 const legend=document.createElement('div');legend.id='familyLegend';legend.innerHTML='<span class="dot"></span> dotted black/white = marriage &nbsp;&nbsp; <span class="dot purple"></span> purple = cousin branch';
 document.body.append(legend);
 // Parent/cousin family detail defaults, editable in the individual person card.
 if(!saved.profiles||typeof saved.profiles!=='object')saved.profiles={};
 const defaults={
  [girl?.id]:{parents:'Wayne Williams and Michelle Joseph',relationship:'Daughter',notes:'Michelle Joseph is the other parent and is not displayed in this blood-relative tree.'},
  [boy?.id]:{parents:'Wayne Williams and Anika Fountain',relationship:'Son',notes:'Anika Fountain is the other parent and is not displayed in this blood-relative tree.'},
  [ma?.id]:{relationship:'Mother',occupation:'Registered nurse',children:'Wayne Williams Jr.'},
  [dad?.id]:{relationship:'Father',parents:'Lawrence Williams and Gertrude Smith',children:'Wayne Williams Jr.'},
  [law.id]:{relationship:'Paternal grandfather',spouse:'Gertrude Smith Williams; other partner name unknown',children:'Larry, Jimmy, Roseanne, Gary, Wayne Sr., Derek, Brody, Patrice, Thelma, Elaine, Teresa, Fred',notes:'Laurence Williams is Wayne Williams’s paternal grandfather. He is pictured alongside Gertrude Smith Williams in a family photograph.'},
  [ger.id]:{relationship:'Paternal grandmother',spouse:'Laurence Williams',children:'Larry, Jimmy, Roseanne, Gary, Wayne Sr., Derek, Brody, Patrice, Thelma, Elaine, Teresa, Fred',notes:'Gertrude Smith Williams is Wayne Williams’s paternal grandmother. She is pictured alongside Laurence Williams in a family photograph.'},
  'wa-elaine':{relationship:'Paternal aunt',children:'Derek Henderson, Wendy Henderson, Reginald Henderson'},
  'wa-brody':{relationship:'Paternal uncle',children:'Isaiah Williams, Jason Williams, Justin Williams, Brianna Williams, daughter (name unknown)',notes:'Brody Williams is Wayne’s paternal uncle. In a family gathering photograph, he stands in the middle with Gary Williams (left) and Larry Williams (right).'},
  'wa-gary':{relationship:'Paternal uncle',children:'Chloe Williams',notes:'Gary Williams is Wayne’s paternal uncle. In a family gathering photograph, he stands on the left with Brody Williams (middle) and Larry Williams (right).'},

  'wa-larry':{relationship:'Paternal uncle',notes:'Larry Williams is Wayne’s paternal uncle. In a family gathering photograph, he appears on the right with his brothers Brody and Gary Williams.'},
  'wa-henderson-derek':{relationship:'Paternal first cousin',parents:'Elaine Williams',notes:'Derek Henderson is the oldest son of Wayne’s aunt Elaine Williams and is part of the Williams–Henderson family branch.'},
  'wa-henderson-reginald':{relationship:'Paternal first cousin',parents:'Elaine Williams',notes:'Reginal Henderson is the youngest son of Wayne’s aunt Elaine Williams and is part of the Williams–Henderson family branch.'},
  'w4':{relationship:'Paternal great-grandmother',notes:'Eloise Williams is Wayne Williams’s paternal great-grandmother. She appears in a family photograph outdoors beside a car.'},
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
 const getProfile=id=>({...defaults[id],...(saved.profiles?.[id]||{})});
 const drawer=document.getElementById('drawer');
 const relation=document.getElementById('personRelation');
 const heading=document.createElement('h3');heading.textContent='Family profile';heading.id='profileHeading';
 const summary=document.createElement('div');summary.className='family-summary';summary.id='familySummary';
 relation.insertAdjacentElement('afterend',heading);heading.insertAdjacentElement('afterend',summary);
 const fields=[['relationship','Relationship to Wayne'],['parents','Parents'],['spouse','Spouse / partner'],['children','Children'],['siblings','Brothers and sisters'],['occupation','Occupation / life history'],['notes','Biography / memories']];
 const fieldWrap=document.createElement('section');fieldWrap.id='profileFields';
 const selectors={};
 for(const [key,title]of fields){
   const label=document.createElement('label');label.textContent=title;label.htmlFor='profile-'+key;
   const el=document.createElement(key==='notes'?'textarea':'input');
   el.id='profile-'+key;if(key!=='notes')el.type='text';el.placeholder='Add details';
   fieldWrap.append(label,el);selectors[key]=el;
 }
 const addNote=document.createElement('p');addNote.className='fieldhint';addNote.textContent='Edit these details and choose Save Profile. Changes stay in this browser until you Export and send the backup for publishing.';
 const saveProfile=document.createElement('button');saveProfile.className='navbtn profile-save';saveProfile.type='button';saveProfile.textContent='Save Profile';
 fieldWrap.append(addNote,saveProfile);
 summary.insertAdjacentElement('afterend',fieldWrap);
 function profileText(p){
   const x=getProfile(p.id),family=[];
   if(x.parents)family.push('Parents: '+x.parents);
   else if(p.parent && byId.has(p.parent))family.push('Parent / ancestor connection: '+shortName(byId.get(p.parent).name));
   if(x.spouse)family.push('Partner: '+x.spouse);
   if(x.children)family.push('Children: '+x.children);
   if(x.siblings)family.push('Siblings: '+x.siblings);
   if(x.occupation)family.push('Occupation: '+x.occupation);
   if(x.notes)family.push(x.notes);
   if(!family.length)family.push('Family information is ready to be added.');
   summary.replaceChildren();
   for(const item of family){const line=document.createElement('div');line.textContent=item;line.style.marginBottom='8px';summary.append(line)}
 }
 const originalOpenEditor=openEditor;
 openEditor=function(id){originalOpenEditor(id);const p=byId.get(id);if(!p)return;
   const x=getProfile(id);for(const [key]of fields)selectors[key].value=x[key]||'';
   profileText(p);
   document.getElementById('personRelation').textContent=x.relationship||p.role;
 };
 saveProfile.onclick=()=>{
    if(!focused)return;
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
 focus(CENTER.x,CENTER.y,true);
})();