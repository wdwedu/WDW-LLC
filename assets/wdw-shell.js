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