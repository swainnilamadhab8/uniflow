// Loads the real app.js in a stubbed browser so workflows can be tested headlessly.
const fs=require("fs"),path=require("path"),vm=require("vm");
function load(){const el=()=>new Proxy(function(){},{get:(t,k)=>k==="classList"?{add(){},remove(){},toggle(){},contains:()=>false}:k==="style"?{setProperty(){}}:k==="append"||k==="remove"||k==="querySelectorAll"?(()=>[]):k==="offsetWidth"?0:t[k]??"",set:(t,k,v)=>(t[k]=v,true),apply:()=>undefined});
 const store={},e=el(),els={},doc={querySelector:q=>els[q]||(els[q]=el()),querySelectorAll:()=>[],createElement:()=>el(),body:e,documentElement:e};
 const ctx=vm.createContext({document:doc,localStorage:{getItem:k=>store[k]??null,setItem:(k,v)=>{store[k]=v}},setTimeout:()=>0,console,Math,JSON,Date});
 vm.runInContext(fs.readFileSync(path.join(__dirname,"../app/app.js"),"utf8"),ctx);
 return{run:c=>vm.runInContext(c,ctx),store};}
module.exports={load};
