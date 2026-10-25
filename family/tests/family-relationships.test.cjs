'use strict';
// Phase 4 Williams–Goodson relationship and regression checks.
// Run: node family/tests/family-relationships.test.cjs
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const dir=path.resolve(__dirname,'..');
const read=name=>fs.readFileSync(path.join(dir,name),'utf8');
const files=['horizontal-data.js','grandmother-correction.js','family-additions.js','horizontal.js','horizontal-v2.js','grandmother-links.js','family-photo-extension.js','horizontal.html'];
const sources=Object.fromEntries(files.map(n=>[n,read(n)]));
// Evaluate only the identity records and their data-only correction/addition scripts.
// Browser code is intentionally not executed in Node's data-validation test.
const context=vm.createContext({});
vm.runInContext(sources['horizontal-data.js']+'\n'+sources['grandmother-correction.js']+'\n'+sources['family-additions.js']+'\nglobalThis.PHASE4_PERSONS=PERSONS;',context,{timeout:20000});
const persons=context.PHASE4_PERSONS;
const byId=new Map(persons.map(p=>[p.id,p]));
assert.equal(byId.size,persons.length,'Duplicate family card IDs');
const get=id=>{assert(byId.has(id),'Missing '+id);return byId.get(id)};
for(const person of persons){
 if(person.parent)assert(byId.has(person.parent),'Broken parent ref: '+person.id+' -> '+person.parent);
}
const siblings=['wa-larry','wa-jimmy','wa-roseanne','wa-gary','w0','wa-derek','wa-brody','wa-patrice','wa-thelma','wa-elaine','wa-teresa','wa-fred'];
assert.equal(new Set(siblings).size,12);
siblings.forEach(get);
assert.equal(get('w0').name,'Wayne Williams Sr.');
assert.equal(get('wa-henderson-derek').parent,'wa-elaine');
assert.equal(get('wa-henderson-wendy').parent,'wa-elaine');
assert.equal(get('wa-henderson-reginald').parent,'wa-elaine');
assert.equal(get('wa-gary-chloe').parent,'wa-gary');
for(const id of ['wa-brody-isaiah','wa-brody-jason','wa-brody-justin','wa-brody-brianna','wa-brody-unknown'])
 assert.equal(get(id).parent,'wa-brody');
assert.equal(get('g3').parent,null,'Alice must not be linked to Sarah Hall');
assert.match(get('g3').name,/Mary Alice/);
assert.match(get('g22').name,/William Eugene Goodson Sr/);
assert.equal(get('g22').parent,'g15');
get('alice-robertson-father');
get('alice-robertson-mother');
assert.match(sources['horizontal-v2.js'],/'w1':'Laurence Williams'/);
assert.match(sources['horizontal-v2.js'],/'w2':'Gertrude Smith Williams'/);
assert.match(sources['horizontal-v2.js'],/'wa-henderson-reginald':'Reginal Henderson'/);
assert.match(sources['horizontal-v2.js'],/\['w1','w2'\]/,'Laurence-Gertrude marriage not drawn');
assert.match(sources['horizontal-v2.js'],/\['w3','w4'\]/,'Henry-Eloise marriage not drawn');
assert.match(sources['horizontal.js'],/addKin\('Lawrence Williams','Eloise Williams'\)/,'Eloise parent-child connector missing');
assert.match(sources['horizontal-v2.js'],/curveBetween\(parent,id,'cousin'\)/,'Cousin connector not present');
assert.match(sources['horizontal-v2.js'],/drawLines=extendedLines/,'Added family links not redrawn on arrange');
assert.match(sources['grandmother-links.js'],/edge\(father.id,alice.id\)/);
assert.match(sources['grandmother-links.js'],/edge\(mother.id,alice.id\)/);
assert.match(sources['grandmother-links.js'],/data-couple','g3-g22'/,'Alice-Willie marriage missing');
assert.match(sources['grandmother-links.js'],/drawLines=function/,'Grandmother connections must redraw when moved');
const html=sources['horizontal.html'];
const scripts=[...html.matchAll(/<script src="([^"]+)"/g)].map(x=>x[1]);
assert(scripts.indexOf('./grandmother-links.js')>scripts.indexOf('./horizontal-v2.js'));
assert(scripts.indexOf('./family-photo-extension.js')>scripts.indexOf('./grandmother-links.js'));
const privateNames=['laurence_williams.jpg','gertrude_smith_williams.jpg','eloise_williams.jpg','gary_williams.jpg','brody_williams.jpg','larry_williams.jpg','derek_henderson.jpg','reginal_henderson.jpg'];
for(const filename of privateNames)assert(sources['family-photo-extension.js'].includes(filename),'Missing secure photo assignment '+filename);
assert(!sources['family-photo-extension.js'].includes("assets/williams-private/"),'Must not use public static image paths');
console.log('PASS: '+persons.length+' unique people/placeholder records; parent refs valid; 12 siblings, cousin branches, marriages, ancestry, secure photo IDs, and source load order.');
