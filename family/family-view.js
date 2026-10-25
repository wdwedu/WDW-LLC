/* Family-facing UI: public biography/photos only; no browser-saved editor records.
   This is a presentation boundary, not authentication. */
(()=>{
'use strict';
const root=document.documentElement;
if(root.dataset.familyView!=='public')return;
document.body.classList.add('family-view');
const toolbar=document.querySelector('.tools');
const skipIds=['modeBtn','saveBtn','exportBtn','resetBtn','restorePhoto','photoUpload','cropX','cropY','cropZoom','importFile'];
for(const id of skipIds){const el=document.getElementById(id);if(el){el.disabled=true;el.hidden=true;}}
const fileLabel=document.querySelector('label.navbtn:has(#importFile)');if(fileLabel)fileLabel.hidden=true;
const drawer=document.getElementById('drawer');
const cropText=drawer?.querySelector('p:last-of-type');
if(cropText)cropText.hidden=true;
const profileFields=document.getElementById('profileFields');
if(profileFields){profileFields.hidden=true;for(const input of profileFields.querySelectorAll('input,textarea,button'))input.disabled=true;}
for(const el of drawer?.querySelectorAll('label')||[])el.hidden=true;
for(const el of drawer?.querySelectorAll('h3')||[])if(el.textContent.trim()==='Photograph')el.hidden=true;
const photoStage=drawer?.querySelector('.photo-stage');
if(photoStage)photoStage.setAttribute('aria-label','Family portrait');
const badge=document.createElement('span');
badge.className='family-reader-label';
badge.textContent='Family View';
badge.style.cssText='font-size:11px;color:var(--sub);font-weight:700;white-space:nowrap;';
toolbar?.prepend(badge);
const textUnder=drawer?.querySelector('p:has(#restorePhoto)');
if(textUnder)textUnder.hidden=true;
const nav=document.querySelector('nav');
nav?.setAttribute('aria-label','Read-only family-tree navigation');
})();
