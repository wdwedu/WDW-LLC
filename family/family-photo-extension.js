/* Williams eight-card portrait extension, October 25, 2026.
 * Photos are NOT included in this public repository. Supply them only in an
 * access-controlled deployment or local family preview at the paths below.
 * Existing user-uploaded photos in saved browser storage always take priority.
 * Missing private portraits fail quietly, retaining the card's current photo.
 */
(()=>{
  'use strict';
  const portraits={
    'w1':'laurence_williams.jpg',
    'w2':'gertrude_smith_williams.jpg',
    'w4':'eloise_williams.jpg',
    'wa-gary':'gary_williams.jpg',
    'wa-brody':'brody_williams.jpg',
    'wa-larry':'larry_williams.jpg',
    'wa-henderson-derek':'derek_henderson.jpg',
    'wa-henderson-reginald':'reginal_henderson.jpg'
  };
  const photoBase='./assets/williams-private/';
  const paths=Object.entries(portraits);
  if(typeof byId==='undefined'||typeof updatePhoto!=='function')return;
  for(const [id,filename] of paths){
    const person=byId.get(id);
    if(!person)continue;
    if(typeof saved!=='undefined'&&saved?.pictures?.[id]?.data)continue;
    const url=photoBase+filename;
    const probe=new Image();
    probe.onload=()=>{
      // Saved image uploads continue taking priority over bundled images.
      if(typeof saved!=='undefined'&&saved?.pictures?.[id]?.data)return;
      person.photo=url;
      updatePhoto(person);
    };
    probe.onerror=()=>{/* private asset absent: preserve current card image */};
    probe.src=url;
  }
})();