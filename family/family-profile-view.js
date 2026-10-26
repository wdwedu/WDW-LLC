/* Public biography cards and device-local Edit tools. The code prompt is a convenience gate. */
(()=>{
'use strict';
const mode=document.getElementById('modeBtn'),drawer=document.getElementById('drawer');
if(!mode||!drawer)return;
const profile=document.getElementById('profileFields'),summary=document.getElementById('familySummary');
const photoTools=document.getElementById('familyPhotoTools'),adminActions=document.getElementById('familyAdminActions');
const close=document.getElementById('closeDrawer');close.textContent='×';close.title='Close biography';close.setAttribute('aria-label','Close biography');
const originalMode=mode.onclick;
let editUnlocked=false;
function editing(){return editUnlocked&&arrange}
const privateWrap=document.createElement('section');privateWrap.id='localPrivateFamilyFields';privateWrap.className='editor-only';privateWrap.hidden=true;
const privateTitle=document.createElement('h3');privateTitle.textContent='Private details';privateWrap.append(privateTitle);
const privateHint=document.createElement('p');privateHint.className='family-private-hint';privateHint.textContent='Kept only in this browser. Excluded from the public biography and family export.';privateWrap.append(privateHint);
const fields=[['birthday','Birthday reminder (private)'],['address','Address'],['email','Email'],['phone','Phone'],['privateNotes','Private notes']];
const inputs={};
for(const [key,title]of fields){const lab=document.createElement('label');lab.textContent=title;const input=document.createElement(key==='privateNotes'?'textarea':'input');if(key!=='privateNotes')input.type='text';input.placeholder='Not yet recorded';input.autocomplete='off';lab.append(input);privateWrap.append(lab);inputs[key]=input}
const save=document.createElement('button');save.type='button';save.className='navbtn primary';save.textContent='Save private details';privateWrap.append(save);
// Keep a single portrait above dates and the public story. Editing controls are separate sections.
const portrait=drawer.querySelector('.photo-stage,.family-photo-frame');
const placeholder=document.createElement('div');placeholder.className='family-portrait-placeholder';placeholder.textContent='Portrait not yet added';placeholder.hidden=true;
const name=document.getElementById('personTitle'),relation=document.getElementById('personRelation');
const publicDates=window.FAMILY_PROFILE?.lifeDates;
const obsoleteHeading=document.getElementById('profileHeading');obsoleteHeading?.remove();
for(const node of [close,name,relation,portrait,placeholder,publicDates,summary,profile,photoTools,privateWrap,adminActions])if(node)drawer.append(node);
function loadPrivate(id){let data={};try{data=JSON.parse(localStorage.getItem('wdw-family-private-'+id)||'{}')}catch{}for(const [key]of fields)inputs[key].value=data[key]||''}
save.onclick=()=>{if(!editing()||!focused)return;const record={};for(const [key]of fields)record[key]=inputs[key].value.trim();try{localStorage.setItem('wdw-family-private-'+focused,JSON.stringify(record));showStatus('Private details saved on this device only.')}catch{showStatus('Browser storage unavailable.')}};
function refresh(){const active=editing();drawer.classList.toggle('family-editing',active);for(const section of [profile,photoTools,privateWrap,adminActions])if(section)section.hidden=!active;
 // Always show the public photograph; no public upload/crop controls.
 const hasPhoto=!!(focused&&getPic(byId.get(focused)));
 if(portrait)portrait.hidden=!hasPhoto;placeholder.hidden=hasPhoto;
 if(summary)summary.hidden=false;if(publicDates)publicDates.hidden=false;
}
const oldOpen=openEditor;
openEditor=function(id){oldOpen(id);loadPrivate(id);refresh()};
mode.onclick=()=>{if(!arrange&&!editUnlocked){const code=window.prompt('Enter editing code');if(code!=='0369'){if(code!==null)showStatus('Editing code not accepted.');return}editUnlocked=true}originalMode();refresh()};
refresh();
})();
