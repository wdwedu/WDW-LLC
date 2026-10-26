/* Family profile viewer; local-only Arrange gate is convenience, NOT server security. */
(()=>{
'use strict';
const mode=document.getElementById('modeBtn'),drawer=document.getElementById('drawer');
if(!mode||!drawer)return;
const profile=document.getElementById('profileFields'),summary=document.getElementById('familySummary');
const close=document.getElementById('closeDrawer');if(close){close.textContent='×';close.title='Close biography';close.setAttribute('aria-label','Close biography');}
const originalMode=mode.onclick;
let editUnlocked=false;
function editing(){return editUnlocked&&arrange}
const privateWrap=document.createElement('section');privateWrap.id='localPrivateFamilyFields';privateWrap.className='editor-only';
const fields=[['birthday','Birthday'],['address','Address'],['email','Email'],['phone','Phone'],['privateNotes','Private notes']];
const inputs={};
for(const [key,title]of fields){
 const lab=document.createElement('label');lab.textContent=title;const input=document.createElement(key==='privateNotes'?'textarea':'input');if(key!=='privateNotes')input.type='text';input.placeholder=title;input.autocomplete='off';lab.append(input);privateWrap.append(lab);inputs[key]=input;
}
const save=document.createElement('button');save.type='button';save.className='navbtn primary';save.textContent='Save private details';privateWrap.append(save);profile?.insertAdjacentElement('afterend',privateWrap);
function loadPrivate(id){let data={};try{data=JSON.parse(localStorage.getItem('wdw-family-private-'+id)||'{}')}catch(e){}for(const [key]of fields)inputs[key].value=data[key]||''}
save.onclick=()=>{
 if(!editing()||!focused)return;
 const record={};for(const [key]of fields)record[key]=inputs[key].value.trim();
 try{localStorage.setItem('wdw-family-private-'+focused,JSON.stringify(record));showStatus('Private notes saved on this device only.')}catch(e){showStatus('Browser storage unavailable.')}
};
const oldOpen=openEditor;
openEditor=function(id){oldOpen(id);loadPrivate(id);refresh()};
const editEls=[profile,privateWrap,document.getElementById('photoUpload'),document.getElementById('cropX'),document.getElementById('cropY'),document.getElementById('cropZoom'),document.getElementById('restorePhoto'),document.getElementById('resetBtn')];
function refresh(){
 const active=editing();
 for(const el of editEls){if(!el)continue;
  if(el===profile||el===privateWrap){el.hidden=!active;continue;}
  const parentLabel=el.closest('label')||document.querySelector('label[for="'+el.id+'"]');
  el.hidden=!active;if(parentLabel)parentLabel.hidden=!active;
 }
 const drawerExport=drawer.querySelector('button[onclick*="exportBtn"]');if(drawerExport)drawerExport.hidden=!active;
 const allDrawerP=[...drawer.querySelectorAll('p')];for(const p of allDrawerP)if(/arrangement is saved|Export a JSON backup/.test(p.textContent))p.hidden=!active;
 const imgTitle=[...drawer.querySelectorAll('h3')].find(el=>el.textContent.trim()==='Photograph');if(imgTitle)imgTitle.hidden=!active;
 const pictureFrame=drawer.querySelector('.photo-stage,.family-photo-frame');if(pictureFrame)pictureFrame.hidden=!active;
 if(summary)summary.hidden=false;
}
mode.onclick=()=>{
 if(!arrange&&!editUnlocked){
  const code=window.prompt('Enter editing code');
  if(code!=='0369'){if(code!==null)showStatus('Editing code not accepted.');return}
  editUnlocked=true;
 }
 originalMode();
 refresh();
};
document.getElementById('closeDrawer')?.addEventListener('click',refresh);
refresh();
})();