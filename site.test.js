const test=require("node:test"),assert=require("node:assert/strict"),fs=require("fs"),path=require("path");
const root=path.join(__dirname,"..");
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.name==="node_modules"?[]:e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)]);
test("content compliance: no 'BPUT' or 'Hackathon' anywhere in the project", ()=>{
  for(const f of walk(root)){if(/\.(zip|mp4|png|jpg)$/i.test(f)||f.includes(path.sep+"tests"+path.sep))continue;
    assert.doesNotMatch(fs.readFileSync(f,"utf8"),/bput|hackathon/i,f);}
});
test("no leftover placeholders", ()=>{for(const f of walk(root).filter(f=>/\.(html|md|js|css)$/.test(f)&&!f.includes("tests")))assert.doesNotMatch(fs.readFileSync(f,"utf8"),/\[Your Team Name\]|\[Add names here\]/,f);});
test("navbar has Features, Modules, Contact and a 'Sign up' CTA (no Launch App anywhere)", ()=>{
  const h=fs.readFileSync(path.join(root,"index.html"),"utf8"),n=h.match(/<nav[\s\S]*?<\/nav>/)[0];
  for(const t of ["Features","Modules","Contact"])assert.match(n,new RegExp(">"+t+"<"));
  assert.match(n,/<a class="btn sm" href="#modules">Sign up<\/a>/);assert.doesNotMatch(h,/Launch App/);
});
test("four modules (Student, Staff, Hostel, Admin) link to the app with a module", ()=>{
  const h=fs.readFileSync(path.join(root,"index.html"),"utf8");
  for(const m of ["student","staff","hostel","admin"])assert.ok(h.includes(`href="app/uniflow.html?module=${m}"`),m);
});
test("project is named UniFlow, not the old name", ()=>{
  for(const f of walk(root).filter(f=>/\.(html|md|json|js|css)$/.test(f)&&!f.includes(path.sep+"tests"+path.sep)))assert.doesNotMatch(fs.readFileSync(f,"utf8"),/SmartCampus/i,f);
  assert.match(fs.readFileSync(path.join(root,"index.html"),"utf8"),/<title>UniFlow/);
});
test("all local links and assets resolve; in-page anchors exist", ()=>{
  for(const f of ["index.html","app/uniflow.html"]){const h=fs.readFileSync(path.join(root,f),"utf8");
    for(const m of h.matchAll(/(?:href|src)="([^"#:]+)(#[^"]*)?"/g))assert.ok(fs.existsSync(path.join(root,path.dirname(f),m[1].split("?")[0])),`${f} -> ${m[1]}`);
    if(f==="index.html")for(const m of h.matchAll(/href="#(\w+)"/g))assert.ok(h.includes(`id="${m[1]}"`),"#"+m[1]);}
});
test("landing page is condensed and has hero, features and footer", ()=>{
  const h=fs.readFileSync(path.join(root,"index.html"),"utf8");
  assert.ok(h.length<14000);for(const t of ['class="hero"',"id=\"features\"","<footer"])assert.ok(h.includes(t),t);
});

test("interactive footer: module links, wordmark and back-to-top", ()=>{
  const h=fs.readFileSync(path.join(root,"index.html"),"utf8"),f=h.match(/<footer[\s\S]*<\/footer>/)[0];
  for(const t of ['id="wm"','id="totop"','class="live"','module=hostel'])assert.ok(f.includes(t),t);
});
