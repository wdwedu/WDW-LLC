(()=>{if(window.__wdwCloseoutShell)return;window.__wdwCloseoutShell=true;
const ready=fn=>document.readyState==='loading'?document.addEventListener('DOMContentLoaded',fn,{once:true}):fn();
ready(()=>{
 if(!document.querySelector('link[data-wdw-shell]')){const l=document.createElement('link');l.rel='stylesheet';l.href='/assets/wdw-shell.css';l.dataset.wdwShell='1';document.head.appendChild(l);}
 const path=location.pathname.replace(/\/+$/,'')||'/';
 const active=path.startsWith('/articles')?'articles':path.startsWith('/ai-command-center')?'command':'home';
 const nav=`<nav class="wdw-master-nav" id="wdwMasterNav" aria-label="Primary navigation"><div class="wdw-master-nav-shell">
 <a class="wdw-brand-link" href="/" aria-label="wdw.llc home"><span class="wdw-brand-mark" aria-hidden="true"></span></a>
 <div class="wdw-nav-controls"><button class="wdw-audio-video" id="wdwAudioVideo" type="button" aria-label="Open Jukebox"><span class="wdw-eq-bars" aria-hidden="true"><i></i><i></i><i></i></span></button><button class="wdw-master-menu" id="wdwMasterMenu" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="wdwQuickMenu"><span></span><span></span></button></div>
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
 <a class="wdw-master-link" href="/#contact"><span class="wdw-master-icon">✉</span><span>Contact</span></a>
 <button class="wdw-master-link wdw-install-menu-item" type="button" onclick="window.siteInstallApp?.()">Install App</button>
 </div></div></nav>`;
 const old=document.querySelector('.wdw-master-nav')||document.querySelector('header.topbar')||document.querySelector('nav.site-nav');
 // On the WDW homepage, keep the original icon navigation. Replacing it after load caused the visible snap-left.
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



/* WDW self-contained media jukebox (one content screen at a time) */
const lectures=[{"n":1,"title":"Who I Am in the Age of AI","id":"1PUPckElt7ag26cmoz91ANTt97K8IwI38"},{"n":2,"title":"Before Marcus Aurelius","id":"15vNlhwu7uPXAn87ibaZFi0SaA1VL4YeD"},{"n":3,"title":"AI Can Give You the Answer","id":"1iMNKgeT95vpxP6wlzHjYjwTM7pnuC9Pj"},{"n":4,"title":"Control What Is Yours","id":"1O4ymAK1L29HB1omU-W-Tbv9YO1gdHa8n"},{"n":5,"title":"Knowing When AI Is Wrong","id":"1xTPT9GndXCnorG0Z5UJWarJIHmb2TmQP"},{"n":6,"title":"Certainty Is Not Truth","id":"1Uz21Uw4fyDICnY_KQMil1GVJrOY11-Zs"},{"n":7,"title":"Learn Faster Without AI Dependence","id":"1NHqTPiwqMWELmfNf7WjMy8u3Dmy1EtJo"},{"n":8,"title":"Convenience Can Make You Weaker","id":"1zALE6--KQsf2pUgqPtrhVzur8vDgDSwq"},{"n":9,"title":"Ask AI to Train You","id":"1pq9mBMi1qMga0R_uif6uHL1zouZVFo0Q"},{"n":10,"title":"The Person You Become Depends on Practice","id":"1gDM3_RawVf22_cu_N3wSklESP81vCQw1"},{"n":11,"title":"The 10 Second Test for Real Understanding","id":"17nR4Hi_Aa3OZB995yTtAIod5TT9jKUU4"},{"n":12,"title":"You Are Not Too Old to Become Someone New","id":"1j3GU20cnmLHN9PX9C56_lIY7sjQMp1RZ"},{"n":13,"title":"How to Learn a New Tool Without Watching 40 Tutorials","id":"1vcMMsGPy8A9f6xIYhMQe7kNNye_zH8G9"},{"n":14,"title":"Why Your Brain Freezes When Too Many Things Change at Once","id":"170t1oLkh39xQDufs6E1C4hkKfKhnVDrW"},{"n":15,"title":"What AI Literacy Actually Means in 2026","id":"1dLIh_LM9_0evkA0N0qh6YDcmWu6erffZ"},{"n":16,"title":"Why Experts Sometimes Struggle to Teach Beginners","id":"1bJOKuRuCxFC4hlVUDyCqmJl2E2yuO57c"},{"n":17,"title":"How to Reinvent Your Career in the AI Era","id":"1nx4oJV4F5vR9oXWORDHxMVit015qiV2b"},{"n":18,"title":"Why Your Brain Feels Overloaded Even When You Are Doing Less","id":"1QtBYm7QC05oYkm3vDaU_7Qy085ki76eY"},{"n":19,"title":"What Human Skills Become More Valuable as AI Gets Smarter","id":"1dcsqvm9mpanI7hGezOEdiopz-6n2AOM3"},{"n":20,"title":"Why Some People Change Their Lives and Others Keep Planning To","id":"1AekO38lF2JF7ZEPr8mg6f_zMxuJJ3sJa"},{"n":21,"title":"Learning Design and Real Results","id":"1KeEicji-OIKDoXLrKEdGDkJx9D5OjvFR"},{"n":22,"title":"Young Men Loneliness and the Search for Purpose","id":"1d05Ai1eik4EqpBNhpvNC2LCu7Fat_JLO"},{"n":23,"title":"Why Being Good at Your Job May Not Be Enough Anymore","id":"1NXGJPUDviROJ0w2fAPBmJeCQfUHNjJ5q"},{"n":24,"title":"Confucius and the Art of Becoming Teachable Again","id":"1ZQo-cAdfWui966aJvMJWhHU5FkIrjyYr"},{"n":25,"title":"Your Phone Is Training Your Brain Every Day","id":"1jlrY14d_w05EYgp53vXmVUbdMbavp3EA"},{"n":26,"title":"Can AI Be Your Therapist What It Can Help With and Where It Can Harm","id":"1evi2CzCa08ziPEnp1q3ArQD1k_Wcmo0G"},{"n":27,"title":"Why Discipline Matters Most When Motivation Disappears","id":"1crUGZXKHacwL4MfxuMlusDlj_2PfeGwE"},{"n":28,"title":"What Happens When Your Job Becomes Your Identity","id":"1gYmEh8Hy3HcrKbuuyk0oCSfgvfF0ttza"},{"n":29,"title":"When Productivity Becomes Another Form of Avoidance","id":"1KckdTIuXdIQ1fsCGWRpohzTs-pF75lUV"},{"n":30,"title":"Why We Keep Doing Things We Know Are Bad for Us","id":"1CTbXcOlpHaXAB4Af823uLHQ4SV0MHCqD"},{"n":31,"title":"What Midlife Does to Ambition Identity and Risk","id":"1mszto1-LP6cjIFDMjRR9WBtJOWiGkuJc"},{"n":32,"title":"You Do Not Need More Confidence You Need More Evidence","id":"1rsIjcXobC0w7PmtgwzRdpBVCwNwVouIa"},{"n":33,"title":"Why Anxiety Makes Uncertainty Feel Dangerous","id":"1cOiN7RHkUPmQj6vd3V_rPrMEIIP5HsT4"},{"n":34,"title":"Marcus Aurelius Maat and the Trap of Living for Other Peoples Opinions","id":"1xtzdxrRaP8a-Kc7exLBj0aHR7eVk0ZYF"},{"n":35,"title":"The Reassurance Loop Why Anxiety Keeps Asking the Same Question","id":"1UrvledPdfeqwrpArz94YAGLcIZz4K191"},{"n":36,"title":"Why Loneliness Changes the Way You See Other People","id":"1ZYEygk9BrR0cZss0vCD_ssQiPvoPTUMo"},{"n":37,"title":"Why Male Friendships Often Disappear With Age","id":"1EBS0r0_9Y8Y-hNfMcQxVErMgTj2hKXAZ"},{"n":38,"title":"Attachment Styles Useful Psychology or an Internet Personality Test","id":"1NS8u7szTL_BUTkDI2hZz4RNHXDTpn7SO"},{"n":39,"title":"How to Have a Hard Conversation Without Turning It Into a Fight","id":"1nxvhL5TWWEectr-0MGh-m46HfkK4nQMc"},{"n":40,"title":"Why Silence Feels So Uncomfortable Now","id":"1VtdDZLJxAjQwkEGytnChNBoIl0xnOeKP"},{"n":41,"title":"Nietzsche on Why Comfort Can Become a Trap","id":"1JFin2D2hAP_etH1YD92ZiHZhhGpbwzMD"},{"n":42,"title":"The 5 Skills I Would Learn If I Had to Start My Career Again","id":"1cU6x20cwmF_3zMwVfRD66MhK-Iz60Qyh"},{"n":43,"title":"How to Become the Person Who Directs AI Instead of Competing With It","id":"1usLTIPuQjmtG6fLQeJILnfJLnPIDC2iV"},{"n":44,"title":"How to Make Yourself Valuable When Everyone Has Access to AI","id":"1aPOcRstAZlvbQbyeHDvBS9O1CZ-_HwKI"},{"n":45,"title":"Why a Tired Brain Has Trouble Learning Sleep Memory and Performance","id":"1DpTel5ODd9YGKI_agqMRVrCbh4fuaYvX"},{"n":46,"title":"Why Listening Is Harder Than Talking","id":"1qSx1pa51wBthuKvLaQxKmfwzzbTGWeGI"},{"n":47,"title":"When Depression Makes Action Feel Impossible Why Small Actions Matter","id":"1io2G0zyxkhpm3E0qTTJmknmF8LVS1bLm"},{"n":48,"title":"How to Learn From Failure Without Making Failure Your Identity","id":"1z8H_fpLlX4E9gIUfcjwSnOrITiCeOrHj"},{"n":49,"title":"How to Apologize Without Defending Yourself","id":"19mgYKmqMeUMr34HPFS_WbyFuTAeaysYG"},{"n":50,"title":"Should You Quit or Are You Just Uncomfortable","id":"1SLGe3B-sNtB5vRsVG78h2fE4sMD31tKo"}];
const films=[
 {title:'Stand and Deliver',year:1988,id:'qtQQC23eseU',cast:'Edward James Olmos, Lou Diamond Phillips',why:'High expectations and rigorous mathematics teaching',design:'Scaffolding, formative assessment, persistence',about:'A teacher challenges expectations by preparing students for advanced mathematics.'},
 {title:'Freedom Writers',year:2007,id:'miz1V13QWsU',cast:'Hilary Swank, Patrick Dempsey',why:'Building classroom trust and learner voice',design:'Authentic writing, reflection, belonging',about:'A teacher uses journaling and lived experience to engage students.'},
 {title:'The Great Debaters',year:2007,id:'VzkeDP1JWA8',cast:'Denzel Washington, Forest Whitaker',why:'Mentorship, scholarship and communicating ideas',design:'Performance-based learning and coached debate',about:'A college debate team develops critical thinking and public-speaking skills.'},
 {title:'Mona Lisa Smile',year:2003,id:'VqexVyd_ybI',cast:'Julia Roberts, Kirsten Dunst, Julia Stiles',why:'Teaching learners to question accepted assumptions',design:'Inquiry, discussion and perspective taking',about:'An art professor encourages students to examine traditional expectations.'},
 {title:'Akeelah and the Bee',year:2006,id:'8Sf4Lwxg6lQ',cast:'Keke Palmer, Laurence Fishburne, Angela Bassett',why:'Practice, community mentorship, and confidence',design:'Deliberate practice, feedback and coaching',about:'A young learner pursues the national spelling bee with support from her community.'},
 {title:'Dead Poets Society',year:1989,id:'ye4KFyWu2do',cast:'Robin Williams, Ethan Hawke, Robert Sean Leonard',why:'Finding student voice and intrinsic motivation',design:'Inquiry, dialogue and active interpretation',about:'An English teacher encourages students to think independently through poetry.'}
];
const jukeboxMusic=[
 {name:'Jazz',id:'QkqIQtp0Hgc',title:'Smooth jazz instrumentals · 1 hour',credit:'Dr. SaxLove'},
 {name:'Hip-Hop',id:'YqXLVowLaFk',title:'Lo-fi hip-hop instrumentals · 1 hour',credit:'Blissful Music Lounge'},
 {name:'Soul & R&B',id:'Hp99F_INIMU',title:'Smooth R&B instrumentals · 1 hour',credit:'Dazai Beats'},
 {name:'Classical',id:'_RpqiOaoaeI',title:'Classical piano instrumentals · 1 hour',credit:'Just Instrumental Music'},
 {name:'Lo-fi',id:'9eJ7UHoKLG0',title:'Dreamy lo-fi instrumentals · 1 hour',credit:'Lofi Hip Hop'},
 {name:'Instrumental',id:'QkqIQtp0Hgc',title:'Smooth instrumental set · 1 hour',credit:'Dr. SaxLove'},
 {name:'Blues',id:'RZX3gcXDT9I',title:'Blues guitar instrumentals · 1 hour',credit:'Midnight Blues Vibes'},
 {name:'Gospel',id:'GDXd3BVyhLQ',title:'Worship piano instrumentals · 1 hour',credit:'Lumikeyz'},
 {name:'Ambient',id:'9eJ7UHoKLG0',title:'Mellow focus instrumentals · 1 hour',credit:'Lofi Hip Hop'},
 {name:'World Music',id:null,title:'World instrumentals',credit:'Selection pending'}
];
const meditationSessions=[{"title":"Indian Sitar · Shanti of Sitar","style":"Indian classical sitar • 1 hour","id":"A9l9AlmSf3c"},{"title":"Japanese Shakuhachi · Morning Breeze","style":"Japanese bamboo flute • 1 hour","id":"ltOWYSV_diE"},{"title":"Native American Flute · Deep Rest","style":"Indigenous-inspired flute • 1 hour","id":"KlUA5b7kKzc"},{"title":"Tibetan Singing Bowls · Inner Peace","style":"Singing bowls & ambient tones • 1 hour","id":"Qfvq2dy77sY"},{"title":"Solo Harp · Sarah Bhalla","style":"Acoustic harp improvisation • 1 hour","id":"WwVLdowD0Bo"},{"title":"Handpan · Malte Marten I","style":"Handpan sound meditation • 1 hour","id":"uwEaQk5VeS4"},{"title":"Handpan · Malte Marten II","style":"Handpan variations • 1 hour","id":"Q78wQTXlTik"},{"title":"Kalimba · Relaxing Collection","style":"African thumb piano / kalimba • 1 hour","id":"ceXR9FT1_JQ"},{"title":"Kalimba · Familiar Melodies","style":"Kalimba instrumentals • 1 hour","id":"0S09OM697UA"},{"title":"Chinese Zen · Guzheng & Erhu","style":"Chinese strings and bamboo flute • 1 hour","id":"cj_kjJkMQUQ"},{"title":"Chinese Zen · Peaceful Mind","style":"Guzheng, erhu & dizi • 1 hour","id":"gxZxoksFQyw"},{"title":"Japanese Koto · Rain Garden","style":"Koto & rain ambience • 1 hour","id":"JyvQpvmCmko"},{"title":"Japanese Koto · Moonlit Night","style":"Koto and Japanese Zen ambience • 1 hour","id":"EXXTYZy32X4"},{"title":"Sufi Oud · Whirling Meditation","style":"Middle Eastern oud & ney • 1 hour","id":"uuzp7xLvZOY"},{"title":"Arabic Oud · Focus Journey","style":"Oud and gentle lo-fi fusion • 1 hour","id":"An-iBMRMpz8"},{"title":"Celtic Harp · Tranquil Reflection","style":"Celtic harp sound bath • 1 hour","id":"KnOXnvBQl-Y"},{"title":"Celtic Harp · Moonlit Lake","style":"Celtic harp ambience • 1 hour","id":"Fmz8Zjgttw4"},{"title":"Indian Bansuri · Sound Sleep","style":"Indian bamboo flute & tanpura • 90 min","id":"QNmoY_K5MxI"},{"title":"Southeast Asian Flute · Mist","style":"Khmer flute, guzheng & nature • 1 hour","id":"ToucdRS3mI0"},{"title":"Singing Bowls · Natural Sound Bath","style":"Tibetan singing bowls • 1 hour","id":"PDI3mdiQuG0"}];
const jb=document.createElement('div');jb.id='wdwJukeboxDialog';jb.hidden=true;jb.setAttribute('role','dialog');jb.setAttribute('aria-modal','true');jb.setAttribute('aria-label','WDW Jukebox');
jb.innerHTML='<div class="wdw-jb-box"><div class="wdw-jb-heading"><span class="wdw-jb-brand"><span class="wdw-jb-presented">WDW.LLC presents</span><h2>The Mix</h2><span class="wdw-jb-tagline">Listen, Watch, Learn, Unwind</span><span class="wdw-jb-media-icons" aria-hidden="true"><span>♫</span><span>▶</span><span>▤</span><span>☾</span></span></span><span class="wdw-jb-window-actions"><button type="button" class="wdw-jb-minimize" aria-label="Minimize playing video" title="Minimize video">−</button><button type="button" class="wdw-jb-expand" aria-label="Expand Jukebox" title="Expand player" hidden>▢</button><button type="button" class="wdw-jb-close" aria-label="Close Jukebox">×</button></span></div><div class="wdw-jb-pulse" aria-hidden="true"><span></span></div><div class="wdw-jb-backrow" hidden><button type="button" class="wdw-jb-back">← Back</button></div><main class="wdw-jb-view"></main><footer class="wdw-jb-fixed"><details class="wdw-jb-playlists"><summary>My Playlists <span aria-hidden="true">⌄</span></summary><div class="wdw-jb-saved"></div><button type="button" class="wdw-jb-clear">Clear saved playlist</button></details><a class="wdw-jb-cta" href="/ai-command-center/">Explore the AI Command Center →</a><div class="wdw-jb-ie"><span class="wdw-jb-ie-logo wdw-jb-ie-wordmark" role="img" aria-label="i.e. — InAct Entertainment">i.e.</span><span>Brought to you by InAct Entertainment LLC</span></div></footer></div>';
document.body.append(jb);
const view=jb.querySelector('.wdw-jb-view'),backrow=jb.querySelector('.wdw-jb-backrow'),backButton=jb.querySelector('.wdw-jb-back');
const openJb=document.getElementById('wdwAudioVideo');
const storageKey='wdw-jukebox-playlist-v1';let saved=[];try{const x=JSON.parse(localStorage.getItem(storageKey)||'[]');if(Array.isArray(x))saved=x.filter(n=>Number.isInteger(n)&&n>=1&&n<=50)}catch(e){}
const make=(tag,cls,txt)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(txt!==undefined)e.textContent=txt;return e};
const btn=(text,cls,fn)=>{const b=make('button',cls,text);b.type='button';b.addEventListener('click',fn);return b};
const pageStack=[];let current={page:'home'},lectureExpanded=false;
const minButton=jb.querySelector('.wdw-jb-minimize'),expandButton=jb.querySelector('.wdw-jb-expand');
const setMini=mini=>{if(mini&&!playing)return;jb.classList.toggle('wdw-jb-mini',mini);jb.setAttribute('aria-modal',String(!mini));minButton.hidden=mini;expandButton.hidden=!mini;};
minButton.addEventListener('click',()=>setMini(true));expandButton.addEventListener('click',()=>setMini(false));
const remember=()=>{try{localStorage.setItem(storageKey,JSON.stringify(saved))}catch(e){}refreshSaved()};
const youtubeUrl=id=>'https://www.youtube.com/watch?v='+id;
const player=make('div','wdw-jb-player');
const playerHeading=make('div','wdw-jb-player-heading');
const frame=document.createElement('iframe');frame.title='Jukebox media';frame.allow='autoplay; encrypted-media; picture-in-picture';frame.setAttribute('allowfullscreen','');frame.referrerPolicy='strict-origin-when-cross-origin';
const controls=make('div','wdw-jb-controls');
const openMedia=make('a','wdw-jb-open','Open source ↗');openMedia.target='_blank';openMedia.rel='noopener noreferrer';
const sliderPanel=make('div','wdw-jb-sliders');
const timelineRow=make('div','wdw-jb-slider-row');
const timelineTitle=make('label','','Progress');const seek=make('input','wdw-jb-seek');seek.type='range';seek.min='0';seek.max='1000';seek.value='0';seek.step='1';seek.disabled=true;seek.setAttribute('aria-label','Skip to a point in the video');const timeLabel=make('span','wdw-jb-time','0:00 / --:--');
timelineRow.append(timelineTitle,seek,timeLabel);
timelineTitle.htmlFor='wdwJukeboxSeek';seek.id='wdwJukeboxSeek';
const volumeRow=make('div','wdw-jb-slider-row');
const volumeTitle=make('label','','Volume');const volume=make('input','wdw-jb-volume');volume.type='range';volume.min='0';volume.max='100';volume.step='1';volume.value='70';try{const stored=Number(localStorage.getItem('wdw-jukebox-volume'));if(Number.isFinite(stored)&&stored>=0&&stored<=100)volume.value=String(stored)}catch(e){}volume.setAttribute('aria-label','Player volume');const volumeLabel=make('span','wdw-jb-volume-value',volume.value+'%');
volumeTitle.htmlFor='wdwJukeboxVolume';volume.id='wdwJukeboxVolume';volumeRow.append(volumeTitle,volume,volumeLabel);sliderPanel.append(timelineRow,volumeRow);
const playerNote=make('p','wdw-jb-player-note','The video timeline appears when playback information becomes available.');
player.append(playerHeading,frame,controls,sliderPanel,playerNote,openMedia);
let playing=null,videoDuration=0,videoTime=0,videoReady=false,tracking=null,seekChanging=false;
const timeFmt=t=>{t=Math.max(0,Math.floor(Number(t)||0));return Math.floor(t/3600)?Math.floor(t/3600)+':'+String(Math.floor((t%3600)/60)).padStart(2,'0')+':'+String(t%60).padStart(2,'0'):Math.floor(t/60)+':'+String(t%60).padStart(2,'0')};
const postPlayer=(func,args=[])=>{if(playing?.kind!=='youtube'||!frame.contentWindow)return;frame.contentWindow.postMessage(JSON.stringify({event:'command',func,args}),'https://www.youtube-nocookie.com')};
const syncTimeline=()=>{seek.disabled=videoDuration<=0;seek.value=String(videoDuration>0?Math.round(Math.min(1,videoTime/videoDuration)*1000):0);timeLabel.textContent=timeFmt(videoTime)+' / '+(videoDuration>0?timeFmt(videoDuration):'--:--');seek.setAttribute('aria-valuetext',timeLabel.textContent);};
const stopTracking=()=>{if(tracking!==null){clearInterval(tracking);tracking=null}};
const stop=()=>{setMini(false);stopTracking();frame.removeAttribute('src');player.remove();playing=null;videoDuration=0;videoTime=0;videoReady=false;syncTimeline()};
const playerAction=(cmd)=>{if(!playing)return;if(playing.kind==='youtube')postPlayer(cmd);else if(cmd==='playVideo')frame.src=playing.embed};
const applyVolume=()=>{volumeLabel.textContent=volume.value+'%';if(playing?.kind==='youtube'){if(Number(volume.value)===0)postPlayer('mute');else{postPlayer('unMute');postPlayer('setVolume',[Number(volume.value)])}}};
volume.addEventListener('input',()=>{try{localStorage.setItem('wdw-jukebox-volume',volume.value)}catch(e){}applyVolume()});
seek.addEventListener('pointerdown',()=>{seekChanging=true});
seek.addEventListener('pointerup',()=>{seekChanging=false});seek.addEventListener('pointercancel',()=>{seekChanging=false});seek.addEventListener('blur',()=>{seekChanging=false});
seek.addEventListener('input',()=>{if(videoDuration>0){videoTime=Math.round(Number(seek.value)/1000*videoDuration);timeLabel.textContent=timeFmt(videoTime)+' / '+timeFmt(videoDuration)}});
seek.addEventListener('change',()=>{seekChanging=false;if(videoDuration>0){const target=Number(seek.value)/1000*videoDuration;videoTime=target;postPlayer('seekTo',[target,true]);syncTimeline()}});
window.addEventListener('message',event=>{
 if(!playing||playing.kind!=='youtube'||event.source!==frame.contentWindow||!/^https:\/\/(www\.)?youtube(-nocookie)?\.com$/.test(event.origin))return;
 let data=event.data;try{if(typeof data==='string')data=JSON.parse(data)}catch{return}
 if(!data||typeof data!=='object')return;
 const info=data.info&&typeof data.info==='object'?data.info:null;if(!info)return;
 if(Number.isFinite(info.duration)&&info.duration>0)videoDuration=info.duration;
 if(Number.isFinite(info.currentTime)&&info.currentTime>=0&&!seekChanging)videoTime=info.currentTime;
 if(Number.isFinite(info.volume)&&info.volume>=0&&!document.activeElement?.isSameNode(volume)){volume.value=String(Math.round(info.volume));volumeLabel.textContent=volume.value+'%'}
 if(videoDuration>0){videoReady=true;playerNote.hidden=true;syncTimeline()}
});
frame.addEventListener('load',()=>{if(playing?.kind!=='youtube')return;frame.contentWindow?.postMessage(JSON.stringify({event:'listening',id:'wdwJukebox'}),'https://www.youtube-nocookie.com');applyVolume()});
const showMedia=(item)=>{stop();playing=item;minButton.hidden=false;playerHeading.textContent=item.title;frame.src=item.embed;openMedia.href=item.url;controls.replaceChildren();
 controls.append(btn('Play','',()=>playerAction('playVideo')),btn('Pause','',()=>playerAction('pauseVideo')),btn('Restart','',()=>{frame.src=item.embed;videoTime=0;syncTimeline()}),btn('Stop','',stop));if(item.kind==='youtube'){controls.append(btn('Fullscreen','',()=>{if(player.requestFullscreen)player.requestFullscreen().catch(()=>{});else if(frame.requestFullscreen)frame.requestFullscreen().catch(()=>{})}));controls.append(btn('−10s','',()=>{if(videoDuration>0){videoTime=Math.max(0,videoTime-10);postPlayer('seekTo',[videoTime,true]);syncTimeline()}}),btn('+10s','',()=>{if(videoDuration>0){videoTime=Math.min(videoDuration,videoTime+10);postPlayer('seekTo',[videoTime,true]);syncTimeline()}}),btn('Mute','',()=>{volume.value='0';volume.dispatchEvent(new Event('input'))}))}
 sliderPanel.hidden=item.kind!=='youtube';playerNote.hidden=item.kind!=='youtube';
 if(item.kind==='drive'){controls.querySelectorAll('button').forEach((b,i)=>{if(i<2)b.hidden=true});controls.prepend(make('span','wdw-jb-drive-note','Use the player controls inside the recording.'))}
 else {syncTimeline();tracking=setInterval(()=>{if(!playing||playing.kind!=='youtube')return;frame.contentWindow?.postMessage(JSON.stringify({event:'listening',id:'wdwJukebox'}),'https://www.youtube-nocookie.com')},1000)}
 view.replaceChildren(player);
 const desc=item.desc;if(desc){const wrap=make('details','wdw-jb-explanation');wrap.open=true;wrap.append(make('summary','','Why watch / Learning connections'));const p=make('div','wdw-jb-explanation-body');['About','Featuring','Why it matters','Instructional design','Sound / tradition','Best for'].forEach(k=>{if(desc[k]){p.append(make('strong','',k),make('p','',desc[k]))}});wrap.append(p);view.append(wrap)}
};
const playYoutube=(id,title,desc)=>showMedia({kind:'youtube',title,url:youtubeUrl(id),embed:'https://www.youtube-nocookie.com/embed/'+id+'?autoplay=1&enablejsapi=1&rel=0',desc});
const playLecture=t=>showMedia({kind:'drive',title:t.title,url:'https://drive.google.com/file/d/'+t.id+'/view',embed:'https://drive.google.com/file/d/'+t.id+'/preview'});
const refreshSaved=()=>{const host=jb.querySelector('.wdw-jb-saved');host.replaceChildren();if(!saved.length){host.append(make('p','','No lectures saved yet. Select ☆ beside a lecture.'));return}saved.forEach(n=>{const t=lectures.find(x=>x.n===n);if(t)host.append(btn(String(n).padStart(2,'0')+' · '+t.title,'wdw-jb-saved-item',()=>navigate({page:'lecture-player',n:t.n})))});};
jb.querySelector('.wdw-jb-clear').addEventListener('click',()=>{saved=[];remember()});
function navigate(next,push=true){if(push)pageStack.push(current);current=next;render()}
function render(){stop();view.replaceChildren();view.classList.toggle('wdw-jb-home',current.page==='home');backrow.hidden=current.page==='home';
 if(current.page==='home'){const grid=make('div','wdw-jb-buttons');[['Motivation','motivation'],['Music','music'],['Meditation','meditation'],['Movies','movies']].forEach(([label,page])=>grid.append(btn(label,'wdw-jb-primary',()=>navigate({page}))));
 view.append(grid,btn('My Lectures','wdw-jb-primary wdw-jb-lectures-link',()=>navigate({page:'lectures'})));
 }else if(current.page==='lectures'){
 const list=make('div','wdw-jb-list');const renderList=()=>{list.replaceChildren();(lectureExpanded?lectures:lectures.slice(0,25)).forEach(t=>{const row=make('div','wdw-jb-lecture');const name=t.n===21?'Learning Design and Real Results':t.title;row.append(btn(String(t.n).padStart(2,'0')+' · '+name,'wdw-jb-lecture-play',()=>navigate({page:'lecture-player',n:t.n})));const star=btn(saved.includes(t.n)?'★':'☆','wdw-jb-save',()=>{saved=saved.includes(t.n)?saved.filter(n=>n!==t.n):[...saved,t.n];remember();renderList()});star.setAttribute('aria-label',saved.includes(t.n)?'Remove saved lecture':'Save lecture');if(saved.includes(t.n))star.classList.add('is-saved');row.append(star);list.append(row)});};renderList();view.append(list);if(!lectureExpanded)view.append(btn('Show remaining 25 lectures','wdw-jb-primary wdw-jb-more',()=>{lectureExpanded=true;render()}));
 }else if(current.page==='lecture-player'){
 const t=lectures.find(x=>x.n===current.n);if(t)playLecture(t);
 }else if(current.page==='movies'){
 films.forEach((f,i)=>{const b=btn(f.title+' ('+f.year+')','wdw-jb-tile',()=>navigate({page:'movie-player',index:i}));b.append(make('small','',f.why));view.append(b)});
 }else if(current.page==='movie-player'){
 const f=films[current.index];if(f)playYoutube(f.id,f.title+' — Trailer',{About:f.about,Featuring:f.cast,'Why it matters':f.why,'Instructional design':f.design});
 }else if(current.page==='music'){
 jukeboxMusic.forEach((m,i)=>{const b=btn(m.name,'wdw-jb-primary wdw-jb-genre',()=>navigate({page:'music-player',index:i}));view.append(b)});
 }else if(current.page==='music-player'){
 const m=jukeboxMusic[current.index];if(m){if(m.id)playYoutube(m.id,m.title+' — '+m.credit);else {view.append(make('p','wdw-jb-empty','A verified long-form instrumental will be added to '+m.name+' soon.'));view.append(btn('Back to genres','wdw-jb-primary',()=>back()))}}
 }else if(current.page==='motivation'){
 view.append(make('p','wdw-jb-intro','Inspiring educators and researchers on persistence, learning and human potential.'));
 [['Every Kid Needs a Champion','Rita Pierson','SFnMTHhKdkw','Relationships and belief help students feel seen and supported.'],['Grit: Passion and Perseverance','Angela Duckworth','H14bBuluwB8','Growth and long-term commitment are developed through practice.']].forEach(([label,speaker,id,explanation])=>{const b=btn(label+' — '+speaker,'wdw-jb-tile',()=>navigate({page:'motivation-player',id,title:label+' — '+speaker,explanation}));b.append(make('small','',explanation));view.append(b)});
 view.append(btn('More mindset lectures by Wayne Williams','wdw-jb-tile',()=>navigate({page:'motivation-lectures',search:'learn'})));
 }else if(current.page==='motivation-player'){
 playYoutube(current.id,current.title,{'Why it matters':current.explanation,'Instructional design':'Discuss evidence, reflect on classroom practice, and apply one useful idea.'});
 }else if(current.page==='motivation-lectures'){
 const subset=lectures.filter(t=>t.title.toLowerCase().includes(current.search));if(!subset.length)view.append(make('p','','More talks will be added to this collection.'));subset.forEach(t=>view.append(btn(t.title,'wdw-jb-tile',()=>navigate({page:'lecture-player',n:t.n}))));
 }else if(current.page==='meditation'){
 view.append(make('p','wdw-jb-intro','20 long-form meditation and study selections · Instrumental traditions from around the world.'));
 meditationSessions.forEach((session,index)=>{const tile=btn(String(index+1).padStart(2,'0')+' · '+session.title,'wdw-jb-tile',()=>navigate({page:'meditation-player',index}));tile.append(make('small','',session.style));view.append(tile)});
 }else if(current.page==='meditation-player'){
 const session=meditationSessions[current.index];if(session)playYoutube(session.id,session.title,{'Sound / tradition':session.style,'Best for':'Calm listening, mindful breaks, reading, and quiet study.'});
 }
}
const back=()=>{current=pageStack.pop()||{page:'home'};render()};
backButton.addEventListener('click',back);
openJb?.addEventListener('click',()=>{jb.hidden=false;current={page:'home'};pageStack.length=0;render();refreshSaved()});
const closeJb=()=>{setMini(false);jb.hidden=true;stop()};
jb.querySelector('.wdw-jb-close').addEventListener('click',closeJb);
jb.addEventListener('click',e=>{if(e.target===jb&&!jb.classList.contains('wdw-jb-mini'))closeJb()});
frame.addEventListener('dblclick',()=>{if(playing&&player.requestFullscreen)player.requestFullscreen().catch(()=>{})});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!jb.hidden){if(pageStack.length)back();else closeJb()}});
refreshSaved();render();
 const master=document.getElementById('wdwMasterNav'),menu=document.getElementById('wdwMasterMenu'),row=document.getElementById('wdwMasterNavRow');
 const sync=()=>master?.classList.toggle('scrolled',scrollY>22);sync();addEventListener('scroll',sync,{passive:true});
 const quick=document.createElement('div');quick.id='wdwQuickMenu';quick.hidden=true;quick.setAttribute('aria-label','Website menu');
 quick.innerHTML='<div class="wdw-quick-heading"><span class="wdw-quick-heading-rule" aria-hidden="true"></span><span>Explore WDW.LLC</span><span class="wdw-quick-heading-rule" aria-hidden="true"></span></div><nav class="wdw-quick-links" aria-label="Site links">'+[...row.querySelectorAll('a')].map(a=>'<a href="'+a.getAttribute('href')+'">'+a.innerHTML+'</a>').join('')+'<button type="button" class="wdw-quick-install">Install App</button></nav>';
 master.querySelector('.wdw-master-nav-shell').appendChild(quick);
 quick.querySelector('.wdw-quick-install').addEventListener('click',()=>{setMenu(false);window.siteInstallApp?.()});
 const setMenu=o=>{quick.hidden=!o;menu?.setAttribute('aria-expanded',String(o));menu?.setAttribute('aria-label',o?'Close navigation':'Open navigation')};
 menu?.addEventListener('click',()=>setMenu(quick.hidden));
 quick.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
 document.addEventListener('click',e=>{if(!master.contains(e.target))setMenu(false)});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});

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