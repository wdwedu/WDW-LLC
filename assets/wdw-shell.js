(()=>{if(window.__wdwCloseoutShell)return;window.__wdwCloseoutShell=true;
const ready=fn=>document.readyState==='loading'?document.addEventListener('DOMContentLoaded',fn,{once:true}):fn();
ready(()=>{
 if(!document.querySelector('link[data-wdw-shell]')){const l=document.createElement('link');l.rel='stylesheet';l.href='/assets/wdw-shell.css';l.dataset.wdwShell='1';document.head.appendChild(l);}
 const path=location.pathname.replace(/\/+$/,'')||'/';
 const active=path.startsWith('/articles')?'articles':path.startsWith('/ai-command-center')?'command':'home';
 const nav=`<nav class="wdw-master-nav" id="wdwMasterNav" aria-label="Primary navigation"><div class="wdw-master-nav-shell">
 <a class="wdw-brand-link" href="/" aria-label="wdw.llc home"><span class="wdw-brand-mark" aria-hidden="true"></span></a>
 <button class="wdw-master-menu" id="wdwMasterMenu" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="wdwMasterNavRow"><span></span><span></span><span></span></button>
 <div class="wdw-master-nav-row" id="wdwMasterNavRow">
 <a class="wdw-master-link ${active==='home'?'active':''}" href="/"><span class="wdw-master-icon">⌂</span><span>Home</span></a>
 <a class="wdw-master-link" href="/#about"><span class="wdw-master-icon">◉</span><span>About</span></a>
 <a class="wdw-master-link" href="/#portfolio"><span class="wdw-master-icon">▣</span><span>Portfolio</span></a>
 <a class="wdw-master-link" href="/#learning-design"><span class="wdw-master-icon">◇</span><span>Learning Design</span></a>
 <a class="wdw-master-link" href="/#curriculum"><span class="wdw-master-icon">⌘</span><span>Curriculum</span></a>
 <a class="wdw-master-link" href="/#workflows"><span class="wdw-master-icon">⌬</span><span>Workflows</span></a>
 <a class="wdw-master-link ${active==='articles'?'active':''}" href="/articles/"><span class="wdw-master-icon">▤</span><span>Articles</span></a>
 <a class="wdw-master-link ${active==='command'?'active':''}" href="/ai-command-center/"><span class="wdw-master-icon">▦</span><span>AI Command Center</span></a>
 <span class="wdw-master-sep" aria-hidden="true"></span>
 <a class="wdw-master-link utility" href="/#contact" aria-label="Contact Wayne" title="Contact Wayne"><span class="wdw-master-icon">✉</span></a>
 <a class="wdw-master-link utility" href="/#announcements" aria-label="Announcements" title="Announcements"><span class="wdw-master-icon">📣</span></a>
 <button class="wdw-master-link utility" id="wdwMusicToggle" type="button" aria-label="Music" title="Music" aria-pressed="false"><span class="wdw-master-icon">♪</span><span class="wdw-sr-only">Music</span></button>
 </div></div></nav>`;
 const old=document.querySelector('.wdw-master-nav')||document.querySelector('header.topbar')||document.querySelector('nav.site-nav');
 if(old)old.outerHTML=nav;else document.body.insertAdjacentHTML('afterbegin',nav);

 const footer=`<footer class="wdw-footer" id="footer"><div class="wrap wdw-footer-grid">
 <section class="wdw-footer-brand"><a class="wdw-footer-lockup" href="/" aria-label="wdw.llc home"><span class="wdw-brand-mark" aria-hidden="true"></span></a><p>Learning design, educational thinking, AI-supported workflows, and practical tools for better work and learning.</p></section>
 <nav class="wdw-footer-col" aria-label="Explore"><h3>Explore</h3><a href="/">Home</a><a href="/#portfolio">Portfolio</a><a href="/articles/">Articles</a><a href="/ai-command-center/">AI Command Center</a></nav>
 <nav class="wdw-footer-col" aria-label="Connect"><h3>Connect</h3><a href="https://www.youtube.com/@WDWEDU" target="_blank" rel="noopener">YouTube</a><a href="https://www.linkedin.com/in/waynewilliamsedu/" target="_blank" rel="noopener">LinkedIn</a><button type="button" class="footer-link-button" data-wdw-pending="TikTok">TikTok <small>coming soon</small></button></nav>
 <section class="wdw-footer-contact"><h3>Connect with Wayne</h3><p>Questions, collaboration, learning-design work, or a conversation about a project?</p><a class="footer-contact-button" href="/#contact">Let’s Talk</a></section>
 </div><div class="wrap wdw-footer-bottom"><span>© 2026 wdw.llc · All rights reserved.</span><div class="wdw-legal-links" aria-label="Legal and privacy">
 <button type="button" data-wdw-legal="privacy">Privacy</button><button type="button" data-wdw-legal="terms">Terms</button><button type="button" data-wdw-legal="cookies">Cookies</button><button type="button" data-wdw-legal="disclaimer">Disclaimer</button><button type="button" data-wdw-legal="preferences">Cookie Preferences</button><button type="button" data-wdw-legal="affiliate">Affiliate Disclosure</button>
 </div></div></footer>`;
 const oldFooter=document.querySelector('.wdw-footer')||document.querySelector('footer.footer');
 if(oldFooter)oldFooter.outerHTML=footer;else document.body.insertAdjacentHTML('beforeend',footer);

 let dlg=document.getElementById('wdwLegalDialog');
 if(!dlg){document.body.insertAdjacentHTML('beforeend',`<dialog class="wdw-legal-dialog" id="wdwLegalDialog"><div class="wdw-legal-head"><h2 id="wdwLegalTitle">wdw.llc</h2><button class="wdw-legal-close" type="button" aria-label="Close">×</button></div><div class="wdw-legal-body" id="wdwLegalBody"></div></dialog><div class="wdw-site-toast" id="wdwSiteToast" role="status" aria-live="polite"></div>`);dlg=document.getElementById('wdwLegalDialog');}
 const copy={
 privacy:['Privacy','<h3>Privacy at wdw.llc</h3><p>wdw.llc is designed to collect as little information as practical. Information you choose to submit through contact features is used to respond to your inquiry and support the requested conversation or service.</p><h3>Browser data</h3><p>Interactive features may use local browser storage for settings, progress, or saved workflows. That information stays in your browser unless a feature clearly states otherwise.</p>'],
 terms:['Terms','<h3>Use of this site</h3><p>wdw.llc content and tools are provided for educational, professional-development, portfolio, and informational purposes. Original writing, design, tools, and site assets remain protected unless another use is explicitly authorized.</p>'],
 cookies:['Cookies','<h3>Cookies and local storage</h3><p>The current wdw.llc experience does not require advertising cookies. Interactive tools may use local browser storage to remember functional settings, progress, or saved workflows. Third-party destinations have their own policies.</p>'],
 disclaimer:['Disclaimer','<h3>Educational and informational content</h3><p>Articles, recommendations, forecasts, and tools reflect research, professional practice, analysis, and the author’s perspective at the time of review. Third-party tools, pricing, research, and policies can change.</p>'],
 preferences:['Cookie Preferences','<h3>Current preference status</h3><p>wdw.llc currently operates without optional advertising cookies. Functional local storage may support user-controlled preferences and saved workflows. Additional controls will appear here if optional cookie categories are introduced.</p>'],
 affiliate:['Affiliate Disclosure','<h3>Affiliate relationships</h3><p>Some links on wdw.llc may be affiliate links. wdw.llc may receive compensation when a visitor purchases or signs up through those links, at no additional cost to the visitor.</p><h3>Editorial independence</h3><p>Affiliate relationships do not determine tool placement, recommendations, rankings, or editorial conclusions.</p>']
 };
 const title=document.getElementById('wdwLegalTitle'),body=document.getElementById('wdwLegalBody');
 document.querySelectorAll('[data-wdw-legal]').forEach(b=>b.addEventListener('click',()=>{const x=copy[b.dataset.wdwLegal];if(!x)return;title.textContent=x[0];body.innerHTML=x[1];dlg.showModal?dlg.showModal():dlg.setAttribute('open','')}));
 dlg.querySelector('.wdw-legal-close')?.addEventListener('click',()=>dlg.close?dlg.close():dlg.removeAttribute('open'));
 dlg.addEventListener('click',e=>{if(e.target===dlg&&dlg.close)dlg.close()});
 const toast=document.getElementById('wdwSiteToast');let tt;const say=m=>{if(!toast)return;toast.textContent=m;toast.classList.add('show');clearTimeout(tt);tt=setTimeout(()=>toast.classList.remove('show'),2200)};
 document.querySelectorAll('[data-wdw-pending]').forEach(b=>b.addEventListener('click',()=>say(b.dataset.wdwPending+' profile will be connected here.')));

 const master=document.getElementById('wdwMasterNav'),menu=document.getElementById('wdwMasterMenu'),row=document.getElementById('wdwMasterNavRow');
 const sync=()=>master?.classList.toggle('scrolled',scrollY>22);sync();addEventListener('scroll',sync,{passive:true});
 const setMenu=o=>{row?.classList.toggle('open',o);menu?.classList.toggle('open',o);menu?.setAttribute('aria-expanded',String(o));menu?.setAttribute('aria-label',o?'Close navigation':'Open navigation')};
 menu?.addEventListener('click',()=>setMenu(!row.classList.contains('open')));row?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));addEventListener('resize',()=>{if(innerWidth>960)setMenu(false)},{passive:true});

 const music=document.getElementById('wdwMusicToggle');
 let audio=document.getElementById('backgroundMusic');
 if(active==='articles'){
   if(!audio){audio=document.createElement('audio');audio.id='backgroundMusic';audio.loop=true;audio.preload='auto';document.body.appendChild(audio);}
   const src=audio.querySelector('source')||audio.appendChild(document.createElement('source'));src.src='/assets/late-head-nod.mp3';src.type='audio/mpeg';
 }else if(active==='command'){
   const src=audio?.querySelector('source');if(src&&/wdw-background\.mp3/.test(src.getAttribute('src')||'')){audio=null;}
 }
 const syncMusic=()=>{const on=!!audio&&!audio.paused;music?.setAttribute('aria-pressed',String(on));music?.classList.toggle('music-on',on);if(music)music.title=on?'Turn music off':'Turn music on'};
 if(music)music.addEventListener('click',async()=>{if(!audio){say('Music is available with the Articles experience.');return}if(audio.paused){try{if(audio.readyState<2)audio.load();await audio.play()}catch(e){say('Tap again if your browser blocked audio playback.')}}else audio.pause();syncMusic()});
 if(audio)['play','pause','ended'].forEach(ev=>audio.addEventListener(ev,syncMusic));syncMusic();

 // Typed brand references use the lowercase site mark.
 document.querySelectorAll('.wdw-footer [aria-label],.wdw-footer-contact').forEach(()=>{});
});
})();
;(()=>{const hydrate=async()=>{const src=document.querySelector('source[data-wdw-video-parts]');const v=src?.closest('video');if(!src||!v||src.dataset.wdwHydrating)return;src.dataset.wdwHydrating='1';const count=Number(src.dataset.wdwVideoParts||0);if(!count)return;try{const base=new URL('./',document.baseURI);const parts=[];for(let i=0;i<count;i++){const n=String(i).padStart(2,'0');const url=new URL('assets/home-video/part-'+n+'.bin',base);let r=await fetch(url.href,{cache:'no-cache'});if(!r.ok){r=await fetch('https://raw.githubusercontent.com/wdwedu/WDW-LLC/main/assets/home-video/part-'+n+'.bin',{cache:'no-cache'});}if(!r.ok)throw new Error('Video part '+n+' failed: '+r.status);parts.push(await r.arrayBuffer())}const blob=new Blob(parts,{type:'video/mp4'});const objectUrl=URL.createObjectURL(blob);v.src=objectUrl;v.load();v.removeAttribute('data-video-unavailable');window.addEventListener('pagehide',()=>URL.revokeObjectURL(objectUrl),{once:true})}catch(e){v.setAttribute('data-video-unavailable','true');console.error('WDW hero video failed to load.',e)}};document.readyState==='loading'?document.addEventListener('DOMContentLoaded',hydrate,{once:true}):hydrate()})();
;(()=>{if(window.__wdwCore25Affiliate)return;window.__wdwCore25Affiliate=true;
const go=()=>{
  if(!location.pathname.startsWith('/articles/')||location.pathname==='/articles/'||location.pathname==='/articles')return;
  const body=document.querySelector('.article-body, article.article-body, .article-main article, main article');
  if(!body||body.querySelector('.wdw-affiliate-card'))return;
  const slug=(location.pathname.split('/').filter(Boolean)[1]||'').toLowerCase();
  const map={
    'branching-scenarios-without-big-budget':['Bring the scenario to life','Voice, character performance, sound effects, and conversational agents can turn a branching scenario from static choice screens into a more believable rehearsal space.'],
    'scenario-design-measures-judgment':['Make the decision feel human','Use expressive voices, audio cues, sound effects, and agents when they help the learner notice context, emotion, pressure, and consequence.'],
    'production-value-vs-learning-value':['Use production value where it teaches','Audio, music, voices, dubbing, and sound effects matter when they clarify the experience, not simply because they look or sound impressive.'],
    'ai-command-center-workflow-first':['One platform, several audio workflows','When a project moves from script to voice, transcription, music, dubbing, agents, or sound design, consolidation can reduce tool switching.'],
    'ai-supported-human-directed-learning-design':['Keep the human direction, expand the medium','AI audio can accelerate production while the designer still owns the purpose, evidence, accessibility, tone, and final judgment.'],
    'from-ai-toward-agi':['Listen to what capability expansion looks like','The shift from voice generation to transcription, music, dubbing, and conversational agents is one example of AI systems expanding from single tasks toward broader workflows.'],
    'ancient-wisdom-for-the-ai-age':['Give reflection another medium','Long-form ideas can become narrated listening experiences, guided reflections, multilingual audio, or conversational experiences without changing the underlying human argument.'],
    'the-10-second-learning-test':['Turn retrieval into spoken explanation','A learner who can explain an idea aloud without the lesson doing the thinking is giving you stronger evidence than a familiar-looking multiple-choice response.'],
    'teaching-doesnt-mean-they-learned':['Let learners hear, explain, and rehearse','Audio can support access and rehearsal, but the learning still depends on what the learner must retrieve, explain, decide, and use.'],
    'designing-for-transfer':['Rehearse beyond the original screen','Voices, scenarios, dubbing, and agents can help practice travel into new contexts when the task changes but the underlying judgment must remain.'],
    'from-problem-to-performance':['Prototype the performance environment','When communication, customer interaction, coaching, or spoken practice is part of the real job, audio tools can help simulate the conditions before deployment.'],
    'training-is-not-the-solution':['Use the tool only when it solves the right problem','Audio, agents, and generated media can improve a learning experience, but they cannot repair unclear expectations, broken processes, missing incentives, or bad systems.'],
    'accessibility-is-a-design-decision':['Make media easier to access','Use narration, transcription, dubbing, captions, and voice tools when they widen access without making audio the only path to essential information.'],
    'backward-from-performance':['Prototype the performance before building the course','Voice, sound, agents, and media can help simulate the conditions people will actually face before a full learning solution is produced.'],
    'designing-for-variability':['Give one goal more than one usable path','Voice, transcription, dubbing, and multimodal media can widen access while the learning goal and performance standard stay intact.'],
    'feedback-that-changes-performance':['Make feedback easier to hear and act on','Voice and conversational agents can make feedback more immediate, human, and contextual when the next attempt matters more than the score.'],
    'human-judgment-is-the-last-mile':['Automate production without surrendering judgment','Use AI audio and agents to accelerate the workflow while people retain responsibility for context, consequence, evidence, and final decisions.'],
    'interactive-does-not-mean-engaging':['Use media to create decisions, not decoration','Expressive voice, sound, and agents are most useful when they create context, consequence, or rehearsal rather than extra clicks.'],
    'maat-balance-truth-responsibility':['Give reflective ideas another form','Narration, music, multilingual audio, and conversational formats can extend reflective work without replacing the human judgment at its center.'],
    'measure-what-matters':['Capture evidence beyond completion','Transcription and conversational tools can help collect richer evidence from explanations, practice, interviews, and spoken performance when that evidence serves the goal.'],
    'music-mind-and-meaning':['Create a listening environment on purpose','Voice, music, sound effects, transcription, and dubbing can support study, reflection, storytelling, and multilingual access when the sound has a clear job.'],
    'stoicism-in-the-age-of-ai':['Use technology without giving it your center','Narrated reflection, conversational practice, and audio experiences can support attention and learning while human agency stays in charge.'],
    'the-performance-gap':['Simulate the real conditions before prescribing training','Voice, agents, and audio can help prototype conversations and performance contexts, but they should not disguise a process or system problem.'],
    'ubuntu-human-centered-technology':['Use technology to strengthen human connection','Voice, dubbing, agents, and shared media can widen participation when they help people communicate across language and distance rather than isolate them.'],
    'what-should-never-be-automated':['Keep automation inside clear human boundaries','Voice agents and AI media can handle useful work, but identity, dignity, consent, escalation, and high consequence decisions still require deliberate human control.']
  };
  const d=map[slug]||['Turn ideas into richer experiences','ElevenLabs brings expressive voice, transcription, dubbing, music, sound effects, voice transformation, and conversational agents into one creative platform for learning, media, business, professional work, or fun.'];
  const generic='ElevenLabs brings expressive voice, transcription, dubbing, music, sound effects, voice transformation, and conversational agents into one creative platform for learning, media, business, professional work, or fun.';
  const card=document.createElement('aside'); card.className='wdw-affiliate-card'; card.setAttribute('aria-label','ElevenLabs affiliate resource');
  card.innerHTML='<div class="wdw-affiliate-inner"><div class="wdw-affiliate-brand"><div class="wdw-eleven-mark"><span class="wdw-eleven-bars"><i></i><i></i></span><span>ElevenLabs</span></div></div><div><div class="wdw-affiliate-kicker">Tool worth knowing</div><h3>'+d[0]+'</h3><p>'+d[1]+' '+generic+'</p><div class="wdw-affiliate-actions"><a class="wdw-affiliate-cta" href="https://try.elevenlabs.io/pa71uwlj1xom" target="_blank" rel="sponsored noopener">Explore ElevenLabs <span aria-hidden="true">→</span></a><span class="wdw-affiliate-note">Affiliate link. wdw.llc may earn a commission at no additional cost to you.</span></div></div></div>';
  const heads=[...body.querySelectorAll('h2')].filter(h=>!h.closest('.sources'));
  const target=heads[Math.min(3,Math.max(1,Math.floor(heads.length*.32)))]||body.children[Math.min(5,body.children.length-1)];
  if(target)target.before(card);else body.appendChild(card);
  const sources=body.querySelector('.sources')||body.querySelector('#sources')?.closest('div,section');
  const tail=document.createElement('div');tail.className='wdw-affiliate-bottom';tail.innerHTML='<span>Want to experiment with AI voice, music, dubbing, transcription, sound design, or agents?</span><a href="https://try.elevenlabs.io/pa71uwlj1xom" target="_blank" rel="sponsored noopener">Explore ElevenLabs →</a>';
  if(sources)sources.before(tail);else body.appendChild(tail);

  // Reading time is calculated from the actual article body at 220 words per minute.
  const words=(body.innerText||'').trim().split(/\s+/).filter(Boolean).length;
  const mins=Math.max(1,Math.ceil(words/220));
  document.querySelectorAll('.meta span,.article-meta span,[data-reading-time]').forEach(el=>{if(/\b\d+\s*min\s*read\b/i.test(el.textContent||'')||el.hasAttribute('data-reading-time'))el.textContent=mins+' min read';});
};
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',go,{once:true}):go();
})();