/* Mary Alice's direct family relationships, visually separated from Sarah Hall.
   Save keys remain stable: the former g3 card inherits its owner-arranged position. */
(()=>{
 'use strict';
 const alice=byId.get('g3');
 const father=byId.get('alice-robertson-father');
 const mother=byId.get('alice-robertson-mother');
 if(!alice||!father||!mother||!pos[alice.id])return;
 const p=pos[alice.id];
 // Retain user-arranged parent card positions when available; otherwise show above Alice.
 const defaults={
   [father.id]:{x:p.x-132,y:Math.max(110,p.y-340)},
   [mother.id]:{x:p.x+132,y:Math.max(110,p.y-340)}
 };
 for(const rel of [father,mother]){
   const prior=saved.positions?.[rel.id],def=defaults[rel.id];
   position(rel.id,prior&&Number.isFinite(prior.x)&&Number.isFinite(prior.y)?prior.x:def.x,prior&&Number.isFinite(prior.x)&&Number.isFinite(prior.y)?prior.y:def.y);
   if(!cardEls.has(rel.id))layoutCard(rel);
   const el=cardEls.get(rel.id);if(el)el.dataset.kind='maternal-robertson';
 }
 const previousDraw=drawLines;
 drawLines=function(){
   previousDraw();
   edge(father.id,alice.id);
   edge(mother.id,alice.id);
   const A=pos[father.id],B=pos[mother.id];
   if(A&&B){
     const x1=A.x+CW/2,y1=A.y+CH/2,x2=B.x+CW/2,y2=B.y+CH/2;
     const line=document.createElementNS('http://www.w3.org/2000/svg','path');
     line.setAttribute('d',`M ${x1} ${y1} C ${(x1+x2)/2} ${y1} ${(x1+x2)/2} ${y2} ${x2} ${y2}`);
     line.setAttribute('class','connect marital');
     wire.append(line);
   }
 };
 drawLines();
 // Extra grandparent cards belong to the actual existing family data (not fabricated placeholders).
 const label=document.getElementById('countLabel');
 if(label)label.textContent=PERSONS.length+' family and placeholder cards · Williams ← Wayne → Goodson';
})();