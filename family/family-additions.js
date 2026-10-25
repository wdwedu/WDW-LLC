/* Additions supplied by Wayne on October 25, 2026.
   Names and relationships are not inferred from photos. IDs remain stable for saved card positions. */
(function(){
const additions=[];
const add=(id,name,role,kind='relative',extra={})=>additions.push({id,name,role,branch:'williams',photo:'',kind,...extra});
// Eleven added siblings, plus Wayne Williams Sr. already in the existing source = twelve.
add('wa-larry','Larry Williams','Paternal uncle','sibling');
add('wa-jimmy','Jimmy Williams','Paternal uncle','sibling');
add('wa-roseanne','Roseanne Williams','Paternal aunt','sibling');
add('wa-gary','Gary Williams','Paternal uncle','sibling');
add('wa-derek','Derek Williams','Paternal uncle','sibling');
add('wa-brody','Brody Williams','Paternal uncle','sibling');
add('wa-patrice','Patrice Williams','Paternal aunt','sibling');
add('wa-thelma','Thelma Williams','Paternal aunt','sibling');
add('wa-elaine','Elaine Williams','Paternal aunt','sibling');
add('wa-teresa','Teresa Williams','Paternal aunt','sibling');
add('wa-fred','Fred Williams','Paternal uncle','sibling');
add('wa-henderson-derek','Derek Henderson','Paternal first cousin','cousin',{parent:'wa-elaine'});
add('wa-henderson-wendy','Wendy Henderson','Paternal first cousin','cousin',{parent:'wa-elaine'});
add('wa-henderson-reginald','Reginald Henderson','Paternal first cousin','cousin',{parent:'wa-elaine'});
add('wa-brody-isaiah','Isaiah Williams','Paternal first cousin','cousin',{parent:'wa-brody'});
add('wa-brody-jason','Jason Williams','Paternal first cousin','cousin',{parent:'wa-brody'});
add('wa-brody-justin','Justin Williams','Paternal first cousin','cousin',{parent:'wa-brody'});
add('wa-brody-brianna','Brianna Williams','Paternal first cousin','cousin',{parent:'wa-brody'});
add('wa-brody-unknown','Name to add · Brody’s daughter','Paternal first cousin · name unknown','cousin',{parent:'wa-brody',unconfirmed:true});
add('wa-gary-chloe','Chloe Williams','Paternal first cousin','cousin',{parent:'wa-gary'});
add('wa-lawrence-other-partner','Unknown woman · Lawrence’s other family','Name and relationship status to confirm','placeholder',{unconfirmed:true});
for(let i=1;i<=9;i++)add(`wa-lawrence-slot-${i}`,`Name to add · ${i}`,'Other Lawrence family branch · details to confirm','placeholder',{parent:'w1',unconfirmed:true});
const existing=new Set(PERSONS.map(p=>p.id));
for(const p of additions)if(!existing.has(p.id))PERSONS.push(p);
})();