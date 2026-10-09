const test=require("node:test"),assert=require("node:assert/strict"),{load}=require("./helpers");
test("every role portal view renders without errors", ()=>{
  const a=load(),ids={student:"CSE2301",faculty:"FAC101",warden:"WRD201",mess:"MESS301",admin:"admin"};
  for(const r in ids){a.run(`S.me='${ids[r]}'`);for(const [k] of JSON.parse(a.run("JSON.stringify(NAV['"+r+"'])")))
    assert.doesNotThrow(()=>a.run(`view='${k}';render();V['${r}_${k}']().length`),`${r}/${k}`);}
});
