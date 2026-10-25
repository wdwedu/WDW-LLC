/* Wayne's Family Tree: private eight-photo viewer (Phase 3).
 * No private JPEG bytes or credentials are ever included in this public script.
 * Server-side Supabase Storage RLS, not this interface, authorizes downloads.
 * Requires a project-specific family-access-config.json and SQL policies.
 */
(()=>{
 'use strict';
 const portraits=Object.freeze({
   w1:'laurence_williams.jpg',
   w2:'gertrude_smith_williams.jpg',
   w4:'eloise_williams.jpg',
   'wa-gary':'gary_williams.jpg',
   'wa-brody':'brody_williams.jpg',
   'wa-larry':'larry_williams.jpg',
   'wa-henderson-derek':'derek_henderson.jpg',
   'wa-henderson-reginald':'reginal_henderson.jpg'
 });
 const privateBucket='family-portraits';
 const photoOriginals=new Map();
 const activeObjectUrls=new Map();
 let supabase=null, authTicket=0, working=false;
 // A configuration file with a publishable (NOT secret/service-role) key is safe
 // in public client code; permissions are enforced in Storage Row Level Security.
 async function start(){
   const response=await fetch('./family-access-config.json',{cache:'no-store'}).catch(()=>null);
   if(!response?.ok)return; // No backend provisioned: retain original photos, no fake privacy.
   const config=await response.json().catch(()=>null);
   if(!config || !/^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/i.test(config.url||'') ||
      !/^(sb_publishable_|eyJ)/.test(config.publishableKey||''))return;
   if(typeof byId==='undefined'||typeof updatePhoto!=='function')return;
   let createClient;
   try{({createClient}=await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.118.0/+esm'));}
   catch(e){console.warn('Family photo authentication library unavailable');return;}
   supabase=createClient(config.url,config.publishableKey,{
     auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}
   });
   const tools=document.querySelector('nav .tools');
   if(!tools)return;
   const btn=document.createElement('button');btn.id='familyPrivatePhotos';btn.type='button';
   btn.className='navbtn';btn.textContent='Family Photos';
   btn.setAttribute('aria-controls','familyPhotoAuth');
   const panel=document.createElement('section');panel.id='familyPhotoAuth';panel.hidden=true;
   panel.setAttribute('aria-label','Private family photographs');
   panel.style.cssText='position:fixed;z-index:95;top:75px;right:12px;width:min(330px,calc(100vw - 24px));padding:16px;border:1px solid var(--border);border-radius:14px;background:var(--panel);box-shadow:var(--shadow);color:var(--text)';
   const title=document.createElement('strong');title.textContent='Family photographs';
   const description=document.createElement('p');description.textContent='Approved family members can sign in with a one-time email link. Private photographs never appear on the public file server.';
   description.style.cssText='font-size:12px;color:var(--sub)';
   const form=document.createElement('form');form.id='familyPhotoLogin';
   const email=document.createElement('input');email.type='email';email.required=true;email.autocomplete='email';
   email.placeholder='Your approved email';email.setAttribute('aria-label','Approved family email');
   email.style.cssText='width:100%;padding:9px;border:1px solid var(--border);background:var(--bg);color:var(--text);border-radius:8px';
   const signIn=document.createElement('button');signIn.className='navbtn primary';signIn.type='submit';signIn.textContent='Email sign-in link';
   signIn.style.marginTop='8px';form.append(email,signIn);
   const signOut=document.createElement('button');signOut.type='button';signOut.className='navbtn';signOut.textContent='Sign out';signOut.hidden=true;
   const status=document.createElement('p');status.setAttribute('role','status');status.style.cssText='font-size:12px;color:var(--sub)';
   const close=document.createElement('button');close.type='button';close.textContent='✕';close.setAttribute('aria-label','Close photo access');close.className='navbtn';close.style.cssText='float:right';close.onclick=()=>{panel.hidden=true;btn.setAttribute('aria-expanded','false');};
   panel.append(close,title,description,form,signOut,status);tools.append(btn);document.body.append(panel);
   btn.setAttribute('aria-expanded','false');
   btn.onclick=()=>{panel.hidden=!panel.hidden;btn.setAttribute('aria-expanded',String(!panel.hidden));};
   form.onsubmit=async event=>{
     event.preventDefault();if(working)return;
     working=true;signIn.disabled=true;
     try{
       const {error}=await supabase.auth.signInWithOtp({
         email:email.value.trim(),
         options:{shouldCreateUser:false,emailRedirectTo:location.origin+location.pathname}
       });
       status.textContent=error?'Unable to send the sign-in link. Check your approved account.':'If your email is approved, check it for a sign-in link.';
     }catch(e){status.textContent='Photo sign-in is temporarily unavailable.'}
     finally{working=false;signIn.disabled=false}
   };
   function restore(){
     for(const [id,old] of photoOriginals){
       const person=byId.get(id);if(!person)continue;
       person.photo=old;
       if(!saved?.pictures?.[id]?.data)updatePhoto(person);
     }
     const drawer=document.getElementById('drawer');
     if(drawer && !drawer.hidden){ drawer.hidden=true; }
     for(const url of activeObjectUrls.values())URL.revokeObjectURL(url);
     activeObjectUrls.clear();
   }
   async function refresh(){
     const ticket=++authTicket;
     restore();
     const {data,error}=await supabase.auth.getUser();
     if(ticket!==authTicket)return;
     const user=error?null:data?.user;
     form.hidden=!!user;signOut.hidden=!user;
     if(!user){status.textContent='Sign in to view any approved private portraits.';return;}
     status.textContent='Checking private photo permissions…';
     let loaded=0;
     await Promise.all(Object.entries(portraits).map(async([id,filename])=>{
       const person=byId.get(id);if(!person)return;
       // An owner-selected browser crop/photo wins over a family library portrait.
       if(saved?.pictures?.[id]?.data)return;
       const {data:blob,error:readError}=await supabase.storage.from(privateBucket).download('williams-eight/'+filename);
       if(ticket!==authTicket||readError||!blob)return;
       if(!photoOriginals.has(id))photoOriginals.set(id,person.photo||'');
       const url=URL.createObjectURL(blob);
       if(saved?.pictures?.[id]?.data){URL.revokeObjectURL(url);return}
       activeObjectUrls.set(id,url);person.photo=url;updatePhoto(person);loaded++;
     }));
     if(ticket===authTicket)status.textContent=loaded?`${loaded} authorized photographs available in your browser session.`:'No private photographs are available for this account.';
   }
   signOut.onclick=async()=>{++authTicket;restore();await supabase.auth.signOut();form.hidden=false;signOut.hidden=true;status.textContent='Signed out. Private photos were cleared from this view.';};
   supabase.auth.onAuthStateChange(()=>{void refresh();});
   await refresh();
 }
 void start().catch(()=>console.warn('Private photo access unavailable.'));
})();