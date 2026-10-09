(()=>{const d=document,nav=d.getElementById("nav"),pg=d.getElementById("prog"),rm=matchMedia("(prefers-reduced-motion:reduce)").matches;
const onScroll=()=>{const h=d.documentElement;nav.classList.toggle("on",scrollY>8);pg.style.transform=`scaleX(${scrollY/Math.max(1,h.scrollHeight-innerHeight)})`};
addEventListener("scroll",onScroll,{passive:true});onScroll();
const count=el=>{const t=+el.dataset.n,sf=el.dataset.s||"";if(rm||!t){el.textContent=t+sf;return}let s=null;(function f(ts){s=s||ts;const p=Math.min((ts-s)/1300,1),e=1-Math.pow(1-p,3);el.textContent=Math.round(t*e)+sf;if(p<1)requestAnimationFrame(f)})(performance.now())};
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;e.target.classList.add("in");e.target.querySelectorAll("[data-n]").forEach(count);io.unobserve(e.target)}),{threshold:.15});
d.querySelectorAll(".grid,.roles,.stats").forEach(g=>[...g.children].forEach((c,i)=>c.style.setProperty("--d",i*.07+"s")));
d.querySelectorAll(".rv").forEach(e=>io.observe(e));
const m=d.getElementById("mock");if(m&&!rm&&matchMedia("(hover:hover)").matches){m.addEventListener("pointermove",e=>{const r=m.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;m.style.transform=`perspective(900px) rotateY(${x*8}deg) rotateX(${-y*8}deg)`});m.addEventListener("pointerleave",()=>m.style.transform="")}})();

(()=>{const d=document,rm=matchMedia("(prefers-reduced-motion:reduce)").matches,tw=d.getElementById("tw");
const W=["students who never miss a class","staff who run campus smoothly","hostel teams who keep everyone safe and fed","admins who see everything live"];
if(tw){if(rm)tw.textContent=W[0];else{let i=0,j=0,del=false;(function t(){const w=W[i];tw.textContent=w.slice(0,j);if(!del&&j++===w.length){del=true;return setTimeout(t,1800)}if(del&&--j<0){del=false;j=0;i=(i+1)%W.length}setTimeout(t,del?28:55)})()}}
d.querySelectorAll(".card,.mod").forEach(c=>c.addEventListener("pointermove",e=>{const r=c.getBoundingClientRect();c.style.setProperty("--mx",e.clientX-r.left+"px");c.style.setProperty("--my",e.clientY-r.top+"px")}));
d.querySelectorAll(".btn").forEach(b=>b.addEventListener("pointerdown",e=>{if(rm)return;const r=b.getBoundingClientRect(),s=Math.max(r.width,r.height)*2,x=d.createElement("span");x.className="rip";x.style.cssText=`width:${s}px;height:${s}px;left:${e.clientX-r.left-s/2}px;top:${e.clientY-r.top-s/2}px`;b.append(x);setTimeout(()=>x.remove(),650)}));
d.querySelectorAll('a[href="#modules"]').forEach(a=>a.addEventListener("click",()=>{const m=d.getElementById("modules");m.classList.remove("hl");void m.offsetWidth;m.classList.add("hl")}));
const f=d.getElementById("cf");if(f)f.addEventListener("submit",e=>{e.preventDefault();let ok=true;f.querySelectorAll("[required]").forEach(i=>{const bad=!i.value.trim()||(i.type==="email"&&!/^\S+@\S+\.\S+$/.test(i.value));i.classList.toggle("bad",bad);if(bad)ok=false});
 const o=d.getElementById("ok");o.style.color=ok?"#22c55e":"#ef4444";o.textContent=ok?"Thanks! Your message is noted. We'll be in touch soon.":"Please fill in your name, a valid email and a message.";if(ok)f.reset()});
})();

(()=>{const w=document.getElementById("wm"),t=document.getElementById("totop");
if(w)w.innerHTML=[...w.textContent].map(c=>`<span>${c}</span>`).join("");
if(t)t.addEventListener("click",()=>scrollTo({top:0,behavior:matchMedia("(prefers-reduced-motion:reduce)").matches?"auto":"smooth"}))})();
