const $=s=>document.querySelector(s);
const seed=()=>({
 sub:{Mathematics:[44,50],DBMS:[38,48],"Operating Systems":[36,50],"Computer Networks":[34,50],Java:[41,45]},
 tt:[{t:"09:00",s:"DBMS",r:"Room 305",f:"Dr. Mishra",st:"On"},{t:"11:00",s:"Operating Systems",r:"Lab 2",f:"Prof. Das",st:"On"},{t:"14:00",s:"Computer Networks",r:"Room 210",f:"Dr. Rao",st:"On"}],
 cmp:[{id:1024,room:"B-204",cat:"Plumbing",txt:"Bathroom tap leaking",pri:"Medium",st:"In Progress",who:"Maintenance - Ramesh",rate:0,by:"Aarav Mohanty"}],
 pass:["Riya","Kunal","Sneha","Amit","Priya","Rohan","Ishita"].map((n,i)=>({id:i+1,who:n,reason:"Home visit",st:"Pending"})),
 notices:[{c:"Examination",b:"Mid-sem exam schedule released (CSE, 3rd Year)"},{c:"Hostel",b:"Water supply off 2-4 PM, Block B"},{c:"Fee",b:"Semester fee due in 5 days"}],
 notifs:[],fee:false,me:null,certs:[],users:[{id:"admin",pw:"admin123",role:"admin",name:"Administrator",dept:"Administration",phone:"+91 94370 00001"},{id:"CSE2301",pw:"student123",role:"student",name:"Aarav Mohanty",room:"B-204",dept:"CSE",phone:"+91 98765 43210"},{id:"FAC101",pw:"faculty123",role:"faculty",name:"Dr. Mishra",dept:"CSE",phone:"+91 94370 54321"},{id:"WRD201",pw:"warden123",role:"warden",name:"Mr. Sahu",dept:"Hostel Administration",phone:"+91 94370 98765"},{id:"MESS301",pw:"mess123",role:"mess",name:"Mess Manager",dept:"Catering",phone:"+91 94370 66778"}],
 roster:["Aarav Mohanty","Riya Das","Kunal Sahu","Sneha Nayak","Amit Behera","Priya Jena","Rohan Patra","Ishita Rout","Manas Dash","Tanvi Mishra","Sourav Giri","Nisha Sahoo"].map((n,i)=>({n,p:[36,29,27,25,31,22,38,26,28,24,35,21][i],t:40})),
 reminded:false,reg:716,skip:false,menu:"Steamed rice, Dal tadka, Mixed vegetable, Curd & salad",fb:[{r:4,x:"Dal was great today"}],
 token:null,help:[{q:"I need help understanding recursion.",by:null}],

 // Disciplinary fine tracker gateway, fine payment gateway, appeal portal & fine issuers
 fines:[
   {id:101,who:"Aarav Mohanty",roll:"CSE2301",type:"Hostel",reason:"Late return to hostel after 21:30 roll call",amt:200,st:"Unpaid",date:"2026-10-07",issuedBy:"Mr. Sahu (Warden)",appeal:null},
   {id:102,who:"Kunal Sahu",roll:"CSE2303",type:"Academic",reason:"Lab equipment breakage (Multimeter probe)",amt:350,st:"Paid",date:"2026-10-04",issuedBy:"Dr. Mishra (Faculty)",appeal:null},
   {id:103,who:"Amit Behera",roll:"CSE2305",type:"Mess Wastage",reason:"Repeated excessive food waste left on dining tray",amt:150,st:"Unpaid",date:"2026-10-08",issuedBy:"Mess Manager",appeal:null}
 ],

 // Pre meal book & meal count tracker
 mealPlan:[
   {date:"Today",meal:"Breakfast",menu:"Idli, Sambar, Coconut Chutney",booked:true,consumed:true},
   {date:"Today",meal:"Lunch",menu:"Rice, Dal tadka, Mixed Veg, Curd",booked:true,consumed:false},
   {date:"Today",meal:"Dinner",menu:"Roti, Paneer Butter Masala, Salad",booked:true,consumed:false},
   {date:"Tomorrow",meal:"Breakfast",menu:"Upma, Chana Masala, Tea",booked:true,consumed:false},
   {date:"Tomorrow",meal:"Lunch",menu:"Steamed rice, Dal, Mix Veg, Curd",booked:true,consumed:false},
   {date:"Tomorrow",meal:"Dinner",menu:"Puri, Aloo Dum, Kheer",booked:false,consumed:false}
 ],
 mealStats:{booked:78,consumed:72,skipped:6,ecoCredits:60,savedRupees:720},

 // Hostel service tracker
 hostelServices:[
   {id:1,name:"Drinking Water RO Plant (Block B)",status:"Operational (Cold/Normal)",sched:"24x7 supply",health:"Normal"},
   {id:2,name:"Floor & Washroom Sanitization",status:"Completed (Today 09:00 AM)",sched:"Twice Daily",health:"Verified"},
   {id:3,name:"Hostel Wi-Fi Mesh AP-12",status:"Operational (100 Mbps fiber)",sched:"24x7",health:"Optimal"},
   {id:4,name:"Laundry Drop & Ironing",status:"Collection pickup at 17:00",sched:"Mon / Thu / Sat",health:"Scheduled"},
   {id:5,name:"Electrician & Lift Maintenance",status:"Technician Suresh on call",sched:"08:00 - 20:00",health:"Available"}
 ],

 // Automated no dues clearance tracker across 5 campus departments
 noDues:[
   {dept:"Central Library",st:"Cleared",remark:"0 overdue books; borrower card returned",date:"2026-10-01"},
   {dept:"Hostel Administration",st:"Cleared",remark:"Room inventory B-204 verified undamaged",date:"2026-10-02"},
   {dept:"Mess Accounts",st:"Cleared",remark:"Advance mess deposit reconciled",date:"2026-10-02"},
   {dept:"Accounts & Tuition",st:"Pending",remark:"Semester fee pending payment",date:null},
   {dept:"Computer Science Labs",st:"Cleared",remark:"Hardware kit & accessories handed over",date:"2026-10-03"}
 ],

 // Scholarship upload and review & Admin scholarship manager
 scholarships:[
   {id:1,who:"Aarav Mohanty",roll:"CSE2301",scheme:"Post-Matric State Scholarship",amt:45000,income:"₹1,20,000 / yr",doc:"Income_Caste_Certificate.pdf",st:"Under Review",date:"2026-09-28",notes:"Income certificate verified by nodal desk"},
   {id:2,who:"Sneha Nayak",roll:"CSE2304",scheme:"Merit-cum-Means Technical Scholarship",amt:60000,income:"₹1,80,000 / yr",doc:"Sem4_Marksheet_Proof.pdf",st:"Approved",date:"2026-09-22",notes:"Forwarded to state treasury for disbursement"}
 ],

 // Study material repository
 materials:[
   {id:1,sub:"DBMS",title:"Unit 3 - Normalization, Functional Dependencies & BCNF Notes",author:"Dr. Mishra",type:"Lecture Notes",date:"2026-10-02",size:"2.4 MB"},
   {id:2,sub:"DBMS",title:"Semester Question Bank (Last 5 Years Solved Papers)",author:"Dr. Mishra",type:"Question Bank",date:"2026-09-26",size:"4.1 MB"},
   {id:3,sub:"Operating Systems",title:"Process Synchronization, Semaphores & Deadlock Avoidance",author:"Prof. Das",type:"Lecture Notes",date:"2026-10-04",size:"3.2 MB"},
   {id:4,sub:"Computer Networks",title:"TCP/IP Protocol Suite & IPv4/IPv6 Subnetting Architecture",author:"Dr. Rao",type:"Slides / PPT",date:"2026-09-30",size:"5.8 MB"},
   {id:5,sub:"Mathematics",title:"Discrete Mathematics - Graph Theory & Recurrence Relations",author:"Dr. Mishra",type:"Reference Guide",date:"2026-10-01",size:"1.8 MB"}
 ],

 // Assignment dropbox
 assignments:[
   {id:1,sub:"DBMS",title:"Assignment 3: Relational Algebra & Complex SQL Views",due:"2026-10-15",max:20,desc:"Write queries for E-commerce schema questions 1-10.",submissions:[{who:"Aarav Mohanty",roll:"CSE2301",file:"Aarav_DBMS_Assign3.pdf",date:"2026-10-08",marks:19,fb:"Excellent relational algebra queries"}]},
   {id:2,sub:"Computer Networks",title:"Assignment 2: VLSM Subnet Design for 500 Campus Hosts",due:"2026-10-18",max:25,desc:"Calculate subnet masks, usable IP ranges and gateway routes.",submissions:[]}
 ],

 // Academic leave approvals
 leaves:[
   {id:1,who:"Aarav Mohanty",roll:"CSE2301",sub:"DBMS",type:"Medical Leave",from:"2026-10-12",to:"2026-10-13",reason:"Fever recovery - physician note attached",st:"Pending"}
 ],

 // Anti-ragging portal
 antiRagging:{
   helpline:"1800-180-5522 (24x7 Toll-Free National Anti-Ragging Cell)",
   squad:[
     {name:"Prof. S. K. Nayak",role:"Squad Convener",phone:"+91 94370 11223"},
     {name:"Dr. Mishra",role:"Faculty Representative",phone:"+91 94370 54321"},
     {name:"Mr. Sahu",role:"Hostel Warden",phone:"+91 94370 98765"},
     {name:"Inspector A. K. Jena",role:"Police Liaison Officer",phone:"+91 94370 44556"}
   ],
   reports:[
     {id:201,by:"Anonymous",loc:"Hostel Block A 2nd Floor Corridor",date:"2026-10-06",desc:"Unwanted late-night physical drill demanded near common room",st:"Under Investigation",officer:"Prof. S. K. Nayak",action:"Night squad patrolling increased; corridor CCTV reviewed"}
   ]
 },

 // Room allocation matrix for warden
 rooms:[
   {block:"B",room:"201",cap:2,occ:["Rohan Patra","Manas Dash"]},
   {block:"B",room:"202",cap:2,occ:["Amit Behera","Sourav Giri"]},
   {block:"B",room:"203",cap:2,occ:["Kunal Sahu"]},
   {block:"B",room:"204",cap:2,occ:["Aarav Mohanty"]},
   {block:"B",room:"205",cap:2,occ:["Tanvi Mishra","Nisha Sahoo"]},
   {block:"A",room:"101",cap:2,occ:["Riya Das","Priya Jena"]},
   {block:"A",room:"102",cap:2,occ:["Sneha Nayak","Ishita Rout"]},
   {block:"A",room:"103",cap:2,occ:[]}
 ],

 // Night roll call tracker
 rollCall:[
   {who:"Aarav Mohanty",room:"B-204",st:"Present"},
   {who:"Kunal Sahu",room:"B-203",st:"Present"},
   {who:"Rohan Patra",room:"B-201",st:"On Outpass"},
   {who:"Manas Dash",room:"B-201",st:"Present"},
   {who:"Amit Behera",room:"B-202",st:"Present"},
   {who:"Sourav Giri",room:"B-202",st:"Late"},
   {who:"Sneha Nayak",room:"A-102",st:"Present"},
   {who:"Riya Das",room:"A-101",st:"Present"}
 ],

 // Repair proof upload
 repairProofs:[
   {cmpId:1020,room:"B-104",cat:"Electrical",proofDoc:"CircuitBreaker_Replaced.jpg",tech:"Electrician Suresh",date:"2026-10-05",notes:"Replaced 16A MCB in distribution board"}
 ],

 // Mess meal auditor
 messAudits:[
   {date:"2026-10-09",meal:"Lunch",score:4.5,temp:"68°C",hygiene:"Clean & sanitized",auditor:"Mr. Sahu (Warden)",notes:"Fresh seasonal vegetables used; curd taste consistent"}
 ],

 // Library records
 library:[
   {roll:"CSE2301",who:"Aarav Mohanty",books:[
     {title:"Database System Concepts (Silberschatz)",due:"2026-10-20",st:"Active"},
     {title:"Computer Networking: A Top-Down Approach (Kurose)",due:"2026-10-05",st:"Overdue (₹10 fine)"}
   ]},
   {roll:"CSE2303",who:"Kunal Sahu",books:[
     {title:"Operating System Concepts (Galvin)",due:"2026-10-25",st:"Active"}
   ]}
 ],

 // Master fee gateway analytics
 feeSummary:{collected:4250000,pending:625000,studentsCount:840,paidCount:790},

 // Digital ID manager records
 idRecords:[
   {id:"CSE2301",name:"Aarav Mohanty",role:"student",dept:"CSE",valid:"2027",st:"Active"},
   {id:"FAC101",name:"Dr. Mishra",role:"faculty",dept:"CSE",valid:"2030",st:"Active"},
   {id:"WRD201",name:"Mr. Sahu",role:"warden",dept:"Hostel Administration",valid:"2028",st:"Active"},
   {id:"MESS301",name:"Mess Manager",role:"mess",dept:"Catering",valid:"2028",st:"Active"}
 ],

 // Mess wastage tracking
 messWastage:[
   {date:"2026-10-08",meal:"Dinner",wasteKg:18,prepKg:110,headcount:710,notes:"Acceptable waste range (<3%)"},
   {date:"2026-10-09",meal:"Lunch",wasteKg:26,prepKg:118,headcount:716,notes:"Rice overage noticed at table 4"}
 ]
});

let S;try{S=JSON.parse(localStorage.getItem("sch3"))}catch(e){}S=S||seed();
// Ensure newly added arrays exist if loaded from old localStorage
if(S){
 const def=seed();
 for(const k in def){if(S[k]===undefined)S[k]=def[k];}
}
const save=()=>{try{localStorage.setItem("sch3",JSON.stringify(S))}catch(e){}};
let role="student",view="dash";const me=()=>S.users.find(u=>u.id==S.me),nm=()=>me()?me().name:"";

const NAV={
 student:[
   ["dash","Dashboard"],
   ["att","Attendance"],
   ["pass","Leave & Gate Pass"],
   ["idcard","Digital Campus ID"],
   ["fee","Fee & No Dues"],
   ["fines","Fines & Appeals"],
   ["mess","Mess & Pre-Meal"],
   ["hostel","Hostel Services"],
   ["academics","Study Materials"],
   ["schol","Scholarships"],
   ["antirag","Anti-Ragging"],
   ["cmp","Complaints"],
   ["cert","Certificates"],
   ["ntc","Notices"],
   ["more","Queue & Readiness"]
 ],
 faculty:[
   ["dash","Dashboard"],
   ["take","Take Attendance"],
   ["cls","Class Schedule"],
   ["materials","Study Materials"],
   ["assign","Assignment Dropbox"],
   ["leaves","Leave Approvals"],
   ["comm","Target Batch Comms"],
   ["fines","Academic Fines"],
   ["library","Library Records"]
 ],
 warden:[
   ["dash","Hostel Dashboard"],
   ["rooms","Room Matrix"],
   ["apr","Gate Pass Approvals"],
   ["rollcall","Night Roll Call"],
   ["fines","Hostel Fines"],
   ["cmp","Maintenance"],
   ["repair","Repair Proofs"],
   ["audit","Mess Audit & Menu"]
 ],
 mess:[
   ["dash","Demand Prediction"],
   ["fb","Menu & Feedback"],
   ["audit","Meal Auditor"],
   ["wastage","Wastage & Fines"]
 ],
 admin:[
   ["dash","Admin Dashboard"],
   ["fees","Master Fee Gateway"],
   ["users","Users & Logins"],
   ["ids","Digital ID Manager"],
   ["sos","SOS Command Center"],
   ["cert","Certificate Desk"],
   ["schol","Scholarship Manager"],
   ["antirag","Anti-Ragging Portal"],
   ["ntc","Broadcast Notice"]
 ]
};

const COL={student:"#3b82f6",faculty:"#8b5cf6",warden:"#14b8a6",mess:"#f97316",admin:"#6366f1"};
const NAME={student:"Student",faculty:"Faculty",warden:"Warden / Hostel",mess:"Mess Manager",admin:"Admin"};
function toast(m){const d=document.createElement("div");d.textContent=m;$("#toast").append(d);setTimeout(()=>d.remove(),3200)}
function notify(to,msg){S.notifs.unshift({to,msg,read:false});save();if(to!==role)toast("🔔 "+NAME[to]+": "+msg)}
const pct=(a)=>Math.round(a[0]/a[1]*100);
const overall=()=>{let a=0,t=0;for(const k in S.sub){a+=S.sub[k][0];t+=S.sub[k][1]}return Math.round(a/t*100)};
const tagFor=s=>({Resolved:"t-g",Closed:"t-g",Approved:"t-g",Paid:"t-g",Cleared:"t-g",Ready:"t-g",Active:"t-g",Present:"t-g","In Progress":"t-b",Assigned:"t-b",Processing:"t-b","Under Review":"t-b","Under Investigation":"t-b",Pending:"t-a",Unpaid:"t-a",Late:"t-a","On Outpass":"t-b",Rejected:"t-r",Absent:"t-r",Cancelled:"t-r",Suspended:"t-r"}[s]||"t-a");

function qr(seed){let s=seed*9301+49297,o="";for(let i=0;i<15;i++)for(let j=0;j<15;j++){s=(s*9301+49297)%233280;const f=(i<5&&j<5)||(i<5&&j>9)||(i>9&&j<5);if(f?(i%4==0||j%4==0||(i%4==2&&j%4==2)||(i>9&&(i-10)%4==0)||(j>9&&(j-10)%4==0)):s/233280<.5)o+=`<rect x="${j*8}" y="${i*8}" width="8" height="8"/>`}return`<svg viewBox="0 0 120 120" width="120" height="120" style="background:#fff;padding:6px;border-radius:8px" fill="#111">${o}</svg>`}

let lastKey="";
function render(){
 if(!me()){document.body.classList.add("out");loginUI();return}document.body.classList.remove("out");role=me().role;if(!NAV[role].some(n=>n[0]==view))view="dash";
 $("#roles").innerHTML=`<span class="tag t-b">${NAME[role]}</span> <b>${nm()}</b> <button class="btn o" onclick="logout()">Logout</button>`;
 document.documentElement.style.setProperty("--ac",COL[role]);
 $("#nav").innerHTML=NAV[role].map(([k,l])=>`<button class="${k==view?"on":""}" onclick="view='${k}';render()">${l}</button>`).join("");
 const u=S.notifs.filter(n=>n.to==role&&!n.read).length;$("#bc").textContent=u||"";$("#bc").style.display=u?"":"none";
 const key=role+"_"+view,m=$("#main");m.innerHTML=(V[key]||(()=>""))();
 if(key!==lastKey){lastKey=key;m.classList.remove("pg");void m.offsetWidth;m.classList.add("pg")}
}

function togN(){const p=$("#np"),o=p.style.display=="block";if(o){p.style.display="none";return}
 const l=S.notifs.filter(n=>n.to==role);p.innerHTML="<h3>Notification Center</h3>"+(l.length?l.slice(0,10).map(n=>`<div class="row"><span>${n.msg}</span>${n.read?"":'<span class="tag t-b">New</span>'}</div>`).join(""):'<div class="mu">No notifications yet</div>');
 p.style.display="block";l.forEach(n=>n.read=true);save();setTimeout(render,50)}

const V={};

// ==========================================
// STUDENT MODULE VIEWS & FUNCTIONS
// ==========================================

V.student_dash=()=>{
 const o=overall(),due=!S.fee,myFines=S.fines.filter(f=>f.who==nm()&&f.st=="Unpaid");
 return`<h2>Good morning, ${nm().split(" ")[0]} 👋</h2><p class="sub">CSE · 3rd Year · Block ${me().room||"B-204"}</p>
${due?'<div class="alert">💰 Fee due in 5 days — Pending ₹12,500 <button class="btn" style="margin-left:12px;padding:4px 10px;font-size:12px" onclick="view=\'fee\';render()">Pay Online</button></div>':""}
${myFines.length?`<div class="alert r">⚠ Disciplinary Fine: ${myFines.length} unpaid fine(s) totaling ₹${myFines.reduce((a,b)=>a+b.amt,0)} <button class="btn r" style="margin-left:12px;padding:4px 10px;font-size:12px" onclick="view=\'fines\';render()">View & Appeal</button></div>`:""}
<div class="g">
  <div class="c"><h3>Attendance</h3><div class="big" style="color:${o<75?"var(--rd)":"var(--gn)"}">${o}%</div><div class="mu">Overall (${Object.keys(S.sub).length} subjects)</div></div>
  <div class="c"><h3>Semester Fee</h3><div class="big">${due?"₹12,500":"Paid ✓"}</div>${due?'<button class="btn" onclick="payFee()">Pay now</button>':'<span class="mu">Receipt #REC-2291</span>'}</div>
  <div class="c"><h3>Pending Requests</h3><div class="big">${S.pass.filter(p=>p.who==nm()&&p.st=="Pending").length+S.cmp.filter(c=>c.by==nm()&&c.st!="Resolved"&&c.st!="Closed").length+S.certs.filter(c=>c.who==nm()&&c.st!="Ready"&&c.st!="Rejected").length}</div><div class="mu">Passes + Complaints + Certs</div></div>
  <div class="c"><h3>Meal Plan</h3><div class="big" style="color:var(--ac)">${S.mealStats.consumed} / ${S.mealStats.booked}</div><div class="mu">Meals consumed this month</div></div>
</div>
<div class="c" style="border-color:var(--rd)">
  <h3 style="color:var(--rd)">🚨 Emergency SOS & Anti-Ragging Help</h3>
  <div class="row" style="border:0">
    <span class="mu">One tap sends immediate distress broadcast to Warden & Admin with your room location. National Anti-Ragging Helpline: 1800-180-5522.</span>
    <span><button class="btn r" onclick="sos()">Send SOS</button> <button class="btn o" onclick="view=\'antirag\';render()">Anti-Ragging Desk</button></span>
  </div>
</div>
<div class="c"><h3>Today's Classes (Live Timetable)</h3>${S.tt.map(c=>`<div class="row"><span><b>${c.t}</b> &nbsp;${c.s} <span class="mu">· ${c.f}</span></span><span>${c.st=="Cancelled"?'<span class="tag t-r">Cancelled</span>':`<span class="tag t-b">${c.r}</span>`}</span></div>`).join("")}</div>
<div class="c"><h3>Smart Notices for CSE · 3rd Year · Block B</h3>${vis().map(n=>`<div class="row"><span>${n.b}</span><span class="tag">${n.c}</span></div>`).join("")}</div>`;
};

V.student_att=()=>`<h2>Attendance Tracker & Timetable</h2><p class="sub">Subject-wise · 75% minimum threshold</p>
<div class="c">${Object.entries(S.sub).map(([k,a])=>{const p=pct(a),n=Math.max(0,Math.ceil((0.75*a[1]-a[0])/0.25));return`<div class="row"><span style="width:160px;font-weight:600">${k}</span><div class="bar"><i style="width:${p}%;background:${p<75?"var(--rd)":"var(--gn)"}"></i></div><b style="width:50px;text-align:right">${p}%</b></div>${p<75?`<div class="alert r">⚠ Shortage in ${k} (${a[0]}/${a[1]}) — attend next ${n} classes to recover</div>`:""}`}).join("")}</div>
<div class="c"><h3>🧮 Bunk Calculator — Safe Leaves vs Required Classes</h3>${Object.entries(S.sub).map(([k,a])=>{const x=Math.floor(a[0]/.75-a[1]);return`<div class="row"><span>${k} (${a[0]}/${a[1]} attended)</span><span class="tag ${x>=0?"t-g":"t-r"}">${x>=0?"Can safely bunk "+x+" class(es)":"Must attend next "+Math.ceil((0.75*a[1]-a[0])/0.25)+" class(es)"}</span></div>`}).join("")}</div>
<div class="c"><h3>Recent Class Log</h3>${["Mon: DBMS (P) · OS (P) · CN (P)","Tue: DBMS (P) · OS (A) · Math (P)","Wed: Java Lab (P) · CN (P) · DBMS (P)","Thu: OS (A) · Math (P) · CN (P)"].map(x=>`<div class="row">${x}</div>`).join("")}</div>`;

V.student_pass=()=>{
 const mine=S.pass.filter(p=>p.who==nm());const st=["Applied","Warden review","Decision","Digital pass"];
 const myLeaves=S.leaves.filter(l=>l.who==nm());
 return`<h2>Digital Outpass & Leave Application</h2><p class="sub">Apply for outpass (with instant QR pass) or submit academic/hostel leave</p>
<div class="g">
  <div class="c">
    <h3>New Gate Outpass Request</h3>
    <select id="rs"><option>Family function</option><option>Medical</option><option>Outing</option><option>Emergency leave</option><option>Market / Personal errand</option></select>
    <input id="rt" placeholder="Estimated return time (e.g. 20:30 today)">
    <button class="btn" onclick="applyPass()">Apply for Outpass</button>
  </div>
  <div class="c">
    <h3>Academic Leave Application</h3>
    <select id="alt"><option>Medical Leave</option><option>Duty Leave (Tech Competition / Fest)</option><option>Family Emergency</option><option>Internship / Interview</option></select>
    <div style="display:flex;gap:8px"><input id="alf" placeholder="From (YYYY-MM-DD)"><input id="alt2" placeholder="To (YYYY-MM-DD)"></div>
    <input id="alr" placeholder="Reason & medical prescription/event details">
    <button class="btn o" onclick="applyAcademicLeave()">Submit Academic Leave</button>
  </div>
</div>
<div class="c"><h3>My Gate Pass History & Live QR Passes</h3>
${mine.slice().reverse().map(p=>`<div class="c" style="margin-top:10px"><div class="row"><b>Request #${p.id} · ${p.reason}</b><span class="tag ${tagFor(p.st)}">${p.st}</span></div><div class="stepper">${st.map((s,i)=>`<span class="${i<=(p.st=="Pending"?1:3)?"on":""}">${s}</span>`).join("")}</div>
${p.st=="Approved"?`<div class="pass">${qr(p.id)}<div><b style="color:var(--gn);font-size:20px">DIGITAL GATE PASS · VERIFIED</b><div>${nm()} · CSE · ${me().room||"B-204"}</div><div class="mu">Valid today until 21:30 · Scan at campus security terminal</div><div style="margin-top:6px"><span class="tag t-g">Authorized by Warden</span></div></div></div>`:""}</div>`).join("")||'<div class="mu">No gate pass requests yet.</div>'}
</div>
<div class="c"><h3>My Academic Leave Applications</h3>
${myLeaves.slice().reverse().map(l=>`<div class="row"><span><b>${l.type}</b>: ${l.from} to ${l.to} · <span class="mu">${l.reason}</span></span><span class="tag ${tagFor(l.st)}">${l.st}</span></div>`).join("")||'<div class="mu">No academic leaves filed.</div>'}
</div>`;
};

function applyPass(){const r=$("#rs")?$("#rs").value:"Outing";const id=S.pass.length+1;S.pass.push({id,who:nm(),reason:r,st:"Pending"});save();notify("warden","New gate-pass request from "+nm());toast("Gate pass request submitted to warden");render()}
function applyAcademicLeave(){const t=$("#alt").value,f=$("#alf").value||"2026-10-15",to=$("#alt2").value||"2026-10-16",r=$("#alr").value||"Medical appointment";const id=S.leaves.length+1;S.leaves.push({id,who:nm(),roll:me().id,sub:"CSE Academic",type:t,from:f,to:to,reason:r,st:"Pending"});save();notify("faculty","New academic leave application from "+nm());toast("Academic leave application submitted");render()}

V.student_idcard=()=>{
 const u=me();
 return`<h2>Digital Campus ID</h2><p class="sub">Official electronic identification for campus access, exams, and library</p>
<div class="id-card">
  <div style="display:flex;justify-content:space-between;align-items:flex-start">
    <div>
      <div style="font-weight:900;letter-spacing:1px;font-size:16px;color:var(--ac)">CAMPUS DIGITAL ID</div>
      <div style="font-size:11px;color:var(--mu);text-transform:uppercase">State Technical University</div>
    </div>
    <div class="id-chip"></div>
  </div>
  <div style="display:flex;gap:16px;margin:16px 0;align-items:center">
    <div style="width:72px;height:72px;background:var(--bd);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:32px;border:2px solid var(--ac)">🎓</div>
    <div>
      <div style="font-size:19px;font-weight:800">${u.name}</div>
      <div style="font-size:13px;color:var(--ac);font-weight:700">Roll No: ${u.id}</div>
      <div style="font-size:12px;color:var(--mu)">Branch: ${u.dept||"Computer Science & Engineering"}</div>
      <div style="font-size:12px;color:var(--mu)">Hostel: ${u.room||"Block B-204"} · Blood: O+ve</div>
    </div>
  </div>
  <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px dashed var(--bd);padding-top:12px;margin-top:12px">
    <div>
      <div style="font-size:11px;color:var(--mu)">VALIDITY</div>
      <div style="font-weight:700;font-size:13px">Academic Year 2026 - 2027</div>
      <span class="tag t-g" style="margin-top:4px">STATUS: ACTIVE</span>
    </div>
    <div style="transform:scale(.75);transform-origin:right center">${qr(u.id.charCodeAt(0))}</div>
  </div>
</div>
<div class="c" style="max-width:440px">
  <h3>Quick Actions</h3>
  <div style="display:flex;gap:8px">
    <button class="btn" style="flex:1" onclick="toast('Digital ID barcode scanned & copied')">Copy Barcode</button>
    <button class="btn o" style="flex:1" onclick="toast('Digital ID card downloaded as verified PDF')">Download PDF</button>
  </div>
</div>`;
};

V.student_fee=()=>{
 const due=!S.fee;
 return`<h2>Fee Payment Gateway & Automated No Dues</h2><p class="sub">Pay tuition, hostel, and mess dues online & track automated departmental clearance</p>
<div class="g">
  <div class="c">
    <h3>Fee Payment Gateway</h3>
    <table class="tbl">
      <tr><th>Fee Head</th><th>Total</th><th>Status</th></tr>
      <tr><td>Tuition & Development Fee</td><td>₹55,000</td><td><span class="tag t-g">Paid</span></td></tr>
      <tr><td>Hostel Accommodation (Sem 5)</td><td>₹18,000</td><td><span class="tag t-g">Paid</span></td></tr>
      <tr><td>Mess Catering Advance</td><td>₹14,000</td><td><span class="tag t-g">Paid</span></td></tr>
      <tr><td>University Examination Fee</td><td>₹12,500</td><td><span class="tag ${due?"t-r":"t-g"}">${due?"Pending":"Paid"}</span></td></tr>
    </table>
    <div class="row" style="margin-top:12px">
      <div><b>Total Payable:</b> <span class="big" style="font-size:22px;color:${due?"var(--rd)":"var(--gn)"}">${due?"₹12,500":"₹0 (All Cleared)"}</span></div>
      ${due?'<button class="btn" onclick="payFee()">Pay ₹12,500 Now</button>':'<span class="tag t-g">Payment Complete ✓</span>'}
    </div>
    ${!due?'<div class="mu" style="font-size:12px;margin-top:8px">Transaction ID: TXN_2026_99812 · Bank Reference: HDFC_00881 · Paid on 10 Oct 2026</div>':""}
  </div>
  <div class="c">
    <h3>Automated No Dues Clearance Status</h3>
    <p class="mu" style="font-size:12px">Live automated reconciliation with Library, Hostel, Accounts, Mess, and Laboratories.</p>
    <table class="tbl">
      <tr><th>Department</th><th>Clearance</th><th>Remarks</th></tr>
      ${S.noDues.map(d=>`<tr><td><b>${d.dept}</b></td><td><span class="tag ${tagFor(d.st)}">${d.st}</span></td><td class="mu">${d.remark}</td></tr>`).join("")}
    </table>
    ${S.noDues.every(d=>d.st=="Cleared")?`
      <div class="pass" style="margin-top:14px;border-color:var(--gn)">
        <div>
          <b style="color:var(--gn);font-size:16px">AUTOMATED NO DUES CLEARANCE CERTIFICATE ISSUED</b>
          <div class="mu">All 5 campus authorities cleared. Reference #ND-2026-0814. Digitally verified.</div>
        </div>
      </div>`:
      `<div class="alert" style="margin-top:12px">Accounts clearance pending semester exam fee payment. Clear fee to unlock instant no-dues certificate.</div>`}
  </div>
</div>`;
};

function payFee(){
 S.fee=true;
 const acc=S.noDues.find(d=>d.dept.includes("Tuition"));
 if(acc){acc.st="Cleared";acc.remark="Paid via online gateway; reconciled";acc.date=new Date().toISOString().split("T")[0];}
 save();
 toast("Payment successful — ₹12,500 reconciled & receipt generated");
 notify("admin","Student fee payment received from "+nm()+": ₹12,500");
 render();
}

V.student_fines=()=>{
 const myFines=S.fines.filter(f=>f.who==nm());
 return`<h2>Disciplinary Fine Tracker & Appeal Portal</h2><p class="sub">View active campus/hostel fines, pay penalties online, or request an administrative review</p>
<div class="c">
  <h3>Active & Past Disciplinary Fines (${myFines.length})</h3>
  ${myFines.map(f=>`
    <div class="meal-box">
      <div class="row">
        <b>Fine #${f.id} · ${f.type} Disciplinary Penalty</b>
        <span class="tag ${tagFor(f.st)}">${f.st}</span>
      </div>
      <div style="font-size:14px;margin:6px 0"><b>Violation:</b> ${f.reason}</div>
      <div class="row" style="border:0">
        <span class="mu">Issued by: ${f.issuedBy} · Date: ${f.date}</span>
        <b style="font-size:18px;color:${f.st=="Paid"?"var(--gn)":"var(--rd)"}">₹${f.amt}</b>
      </div>
      ${f.st=="Unpaid"?`
        <div style="display:flex;gap:8px;margin-top:8px">
          <button class="btn" onclick="payFine(${f.id})">Pay Fine (₹${f.amt})</button>
          <button class="btn o" onclick="openAppeal(${f.id})">Request Review / Appeal</button>
        </div>
        <div id="ap_${f.id}" style="display:none;margin-top:10px">
          <textarea id="apr_${f.id}" rows="2" placeholder="State reason for review / appeal (e.g. medical emergency, false citation)..."></textarea>
          <button class="btn o" onclick="submitAppeal(${f.id})">Submit Appeal to Committee</button>
        </div>`:""}
      ${f.appeal?`<div class="alert" style="margin-top:8px"><b>Appeal Status (${f.appeal.st}):</b> ${f.appeal.reason} <span class="mu">· Submitted ${f.appeal.date}</span></div>`:""}
    </div>
  `).join("")||'<div class="mu">No disciplinary fines on record. Keep it up!</div>'}
</div>`;
};

function payFine(id){
 const f=S.fines.find(x=>x.id==id);
 if(f){f.st="Paid";save();toast(`Fine #${id} of ₹${f.amt} paid successfully`);notify(f.type=="Academic"?"faculty":"warden",`Fine #${id} paid by ${f.who}`);render();}
}
function openAppeal(id){const el=$("#ap_"+id);if(el)el.style.display=el.style.display=="block"?"none":"block";}
function submitAppeal(id){
 const txt=$("#apr_"+id)?$("#apr_"+id).value.trim():"";
 if(!txt)return toast("Please enter a justification for your appeal");
 const f=S.fines.find(x=>x.id==id);
 if(f){f.appeal={reason:txt,date:new Date().toISOString().split("T")[0],st:"Under Review"};f.st="Under Review";save();toast("Appeal submitted to disciplinary committee");notify(f.type=="Academic"?"faculty":"warden",`Fine #${id} appeal submitted by ${f.who}`);render();}
}

V.student_mess=()=>{
 return`<h2>Mess Menu & Pre-Meal Booking</h2><p class="sub">Today's menu, pre-meal booking, meal count tracker, and food feedback</p>
<div class="g">
  <div class="c">
    <h3>Pre-Meal Booking & Calendar</h3>
    <p class="mu" style="font-size:12px">Book or cancel meals 4 hours prior. Unbooked meals save food and earn eco-points!</p>
    ${S.mealPlan.map((m,i)=>`
      <div class="row">
        <span><b>${m.date} · ${m.meal}</b> <span class="mu">(${m.menu})</span></span>
        <button class="btn ${m.booked?"g2":"o"}" onclick="toggleMealBook(${i})">${m.booked?"Booked ✓":"+ Book Meal"}</button>
      </div>
    `).join("")}
  </div>
  <div class="c">
    <h3>Meal Count Tracker & Eco Points</h3>
    <div class="g" style="margin-bottom:8px">
      <div><small class="mu">Meals Booked</small><div class="big" style="color:var(--ac);font-size:24px">${S.mealStats.booked}</div></div>
      <div><small class="mu">Consumed</small><div class="big" style="color:var(--gn);font-size:24px">${S.mealStats.consumed}</div></div>
      <div><small class="mu">Skipped</small><div class="big" style="color:var(--or);font-size:24px">${S.mealStats.skipped}</div></div>
    </div>
    <div class="row"><span>🌱 Eco-Credits Earned:</span><b>${S.mealStats.ecoCredits} pts</b></div>
    <div class="row"><span>💰 Estimated Monthly Savings:</span><b>₹${S.mealStats.savedRupees}</b></div>
    <div style="margin-top:12px">
      <div class="mu" style="font-size:12px;margin-bottom:4px">Monthly Consumption Quota (${Math.round(S.mealStats.consumed/S.mealStats.booked*100)}%)</div>
      <div class="bar"><i style="width:${Math.round(S.mealStats.consumed/S.mealStats.booked*100)}%;background:var(--gn)"></i></div>
    </div>
  </div>
</div>
<div class="g">
  <div class="c">
    <h3>Today's Published Menu</h3>
    <p style="font-size:15px;margin:8px 0"><b>Lunch:</b> ${S.menu}</p>
    <p class="mu"><b>Dinner:</b> Roti, Shahi Paneer / Chicken curry, Yellow dal, Gulab jamun</p>
    <button class="btn ${S.skip?"o":""}" onclick="skip()">${S.skip?"Skipped Tomorrow's Lunch ✓ (Undo)":"Skip Tomorrow's Lunch (+10 Eco-pts)"}</button>
  </div>
  <div class="c">
    <h3>Rate Meal & Mess Feedback</h3>
    <div class="stars" id="st">${[1,2,3,4,5].map(i=>`<span onclick="setR(${i})">★</span>`).join("")}</div>
    <input id="fx" placeholder="Food quality, taste or hygiene comment...">
    <button class="btn" onclick="sendFb()">Submit Feedback</button>
  </div>
</div>`;
};

function toggleMealBook(idx){
 const m=S.mealPlan[idx];
 m.booked=!m.booked;
 if(m.booked){S.mealStats.booked++;S.reg++;}else{S.mealStats.booked--;S.mealStats.skipped++;S.mealStats.ecoCredits+=10;S.reg=Math.max(500,S.reg-1);}
 save();
 toast(`${m.meal} on ${m.date} ${m.booked?"booked":"cancelled"}`);
 notify("mess",`Meal booking updated: ${m.meal} (${m.booked?"+1":"-1"})`);
 render();
}

let R=0;function setR(n){R=n;document.querySelectorAll("#st span").forEach((s,i)=>s.classList.toggle("on",i<n))}
function skip(){S.skip=!S.skip;S.reg+=S.skip?-1:1;S.eco=Math.max(0,(S.eco||0)+(S.skip?10:-10));save();notify("mess",`Demand updated: ${S.reg} students expected for lunch`);render()}
function sendFb(){S.fb.unshift({r:R||3,x:$("#fx").value||"(no comment)"});save();notify("mess","New meal feedback received");toast("Feedback sent");render()}

V.student_hostel=()=>{
 return`<h2>Hostel Service Tracker</h2><p class="sub">Live maintenance, water supply, sanitation & service status for Block B</p>
<div class="c">
  <h3>Active Hostel Amenities & Services</h3>
  <table class="tbl">
    <tr><th>Amenity / Service</th><th>Live Status</th><th>Schedule</th><th>Health</th></tr>
    ${S.hostelServices.map(h=>`<tr><td><b>${h.name}</b></td><td><span class="tag t-g">${h.status}</span></td><td class="mu">${h.sched}</td><td><span class="tag t-b">${h.health}</span></td></tr>`).join("")}
  </table>
</div>
<div class="c">
  <h3>Request Dedicated Hostel Service Visit</h3>
  <div style="display:flex;gap:8px;flex-wrap:wrap">
    <button class="btn o" onclick="reqHostelService('Room Deep Cleaning')">🧹 Request Room Cleaning</button>
    <button class="btn o" onclick="reqHostelService('Drinking Water Filter Check')">💧 Water Filter Inspection</button>
    <button class="btn o" onclick="reqHostelService('Pest Control Sanitization')">🛡️ Pest Control Spray</button>
    <button class="btn o" onclick="reqHostelService('Wi-Fi Router Reset')">📶 Wi-Fi Router Check</button>
  </div>
</div>`;
};

function reqHostelService(name){
 const id=S.cmp.length?S.cmp[S.cmp.length-1].id+1:1001;
 S.cmp.push({id,room:me().room||"B-204",by:nm(),cat:name,txt:"Routine service request for "+name,pri:"Medium",st:"Assigned",who:"Hostel Staff - Ramesh",rate:0});
 save();
 notify("warden",`Hostel service requested: ${name} by ${nm()}`);
 toast(`Service request logged for ${name}`);
 render();
}

V.student_academics=()=>{
 const mySubmissions=S.assignments.map(a=>({assign:a,sub:a.submissions.find(s=>s.who==nm())}));
 return`<h2>Study Material Repository & Assignment Dropbox</h2><p class="sub">Download notes, syllabi, previous papers & upload course assignments</p>
<div class="g">
  <div class="c">
    <h3>Study Material Repository</h3>
    <input id="msrch" placeholder="Filter by subject or keyword..." oninput="filterMaterials(this.value)">
    <div id="mlist">
      ${S.materials.map(m=>`
        <div class="meal-box">
          <div class="row"><b>${m.title}</b><span class="tag t-b">${m.sub}</span></div>
          <div class="row" style="border:0">
            <span class="mu">${m.type} · ${m.author} · ${m.date}</span>
            <button class="btn sm o" onclick="toast('Downloading ${m.title} (${m.size})')">Download (${m.size})</button>
          </div>
        </div>
      `).join("")}
    </div>
  </div>
  <div class="c">
    <h3>Assignment Dropbox</h3>
    ${S.assignments.map(a=>{
      const s=a.submissions.find(sub=>sub.who==nm());
      return`
        <div class="meal-box">
          <div class="row"><b>${a.title}</b><span class="tag ${s?"t-g":"t-a"}">${s?"Submitted":"Due "+a.due}</span></div>
          <div style="font-size:13px;margin:4px 0">${a.desc} <span class="mu">(Max Marks: ${a.max})</span></div>
          ${s?`<div class="alert" style="margin-top:6px"><b>Uploaded:</b> ${s.file} on ${s.date}<br>${s.marks!==null?`<b>Score:</b> ${s.marks} / ${a.max} · <span class="mu">${s.fb||"Evaluated"}</span>`:"<span class='mu'>Awaiting faculty evaluation</span>"}</div>`:
          `<div style="display:flex;gap:6px;margin-top:6px"><input id="as_${a.id}" placeholder="Filename (e.g. Solution_Unit3.pdf)"><button class="btn" onclick="submitAssign(${a.id})">Upload</button></div>`}
        </div>
      `;
    }).join("")}
  </div>
</div>`;
};

function filterMaterials(q){
 const list=$("#mlist");if(!list)return;
 const filtered=S.materials.filter(m=>m.title.toLowerCase().includes(q.toLowerCase())||m.sub.toLowerCase().includes(q.toLowerCase()));
 list.innerHTML=filtered.map(m=>`
   <div class="meal-box">
     <div class="row"><b>${m.title}</b><span class="tag t-b">${m.sub}</span></div>
     <div class="row" style="border:0">
       <span class="mu">${m.type} · ${m.author} · ${m.date}</span>
       <button class="btn sm o" onclick="toast('Downloading ${m.title}')">Download (${m.size})</button>
     </div>
   </div>
 `).join("")||'<div class="mu">No matching materials found.</div>';
}

function submitAssign(id){
 const file=$("#as_"+id)?$("#as_"+id).value.trim():"";
 if(!file)return toast("Please specify your assignment submission file");
 const a=S.assignments.find(x=>x.id==id);
 if(a){
   a.submissions.push({who:nm(),roll:me().id,file,date:new Date().toISOString().split("T")[0],marks:null,fb:null});
   save();
   notify("faculty",`New assignment submission for ${a.title} from ${nm()}`);
   toast("Assignment submitted successfully");
   render();
 }
}

V.student_schol=()=>{
 const mySchols=S.scholarships.filter(s=>s.who==nm());
 const SC_STEPS=["Submitted","Under Review","Verified","Approved"];
 return`<h2>Scholarship Upload & Review Portal</h2><p class="sub">Upload scholarship applications & track department verification and treasury approval</p>
<div class="c">
  <h3>Apply for Scholarship</h3>
  <div class="g">
    <div>
      <select id="sch_t">
        <option>Post-Matric State Scholarship</option>
        <option>Merit-cum-Means Technical Scholarship</option>
        <option>Pragati Scheme for Girls</option>
        <option>Minority Welfare Scholarship</option>
        <option>State Technical Excellence Fellowship</option>
      </select>
    </div>
    <div><input id="sch_i" placeholder="Annual Family Income (e.g. ₹1,50,000)"></div>
  </div>
  <input id="sch_d" placeholder="Uploaded Document File (e.g. Income_Certificate_Signed.pdf)">
  <button class="btn" onclick="applySchol()">Submit Scholarship Application</button>
</div>
<div class="c">
  <h3>My Submitted Applications & Review Status</h3>
  ${mySchols.map(s=>`
    <div class="meal-box">
      <div class="row"><b>${s.scheme}</b><span class="tag ${tagFor(s.st)}">${s.st}</span></div>
      <div class="stepper">${SC_STEPS.map((x,i)=>`<span class="${i<=SC_STEPS.indexOf(s.st)?"on":""}">${x}</span>`).join("")}</div>
      <div class="row" style="border:0">
        <span><b>Grant:</b> ₹${s.amt} · Document: ${s.doc}</span>
        <span class="mu">Submitted: ${s.date}</span>
      </div>
      <div class="alert" style="margin-top:6px"><b>Review Remarks:</b> ${s.notes}</div>
    </div>
  `).join("")||'<div class="mu">No scholarship applications submitted yet.</div>'}
</div>`;
};

function applySchol(){
 const t=$("#sch_t")?$("#sch_t").value:"Post-Matric State Scholarship";
 const inc=$("#sch_i")?$("#sch_i").value:"₹1,20,000 / yr";
 const doc=$("#sch_d")?$("#sch_d").value:"Income_Proof.pdf";
 const id=S.scholarships.length+1;
 S.scholarships.push({id,who:nm(),roll:me().id,scheme:t,amt:45000,income:inc,doc,st:"Under Review",date:new Date().toISOString().split("T")[0],notes:"Documents received; verification in progress"});
 save();
 notify("admin",`New scholarship application (${t}) submitted by ${nm()}`);
 toast("Scholarship application submitted for review");
 render();
}

V.student_antirag=()=>{
 const myReports=S.antiRagging.reports;
 return`<h2>Anti-Ragging Portal & Emergency Help</h2><p class="sub">Zero-tolerance campus safety, 24x7 emergency helpline, squad members & confidential reporting</p>
<div class="alert r" style="font-size:15px">
  🚨 <b>National Anti-Ragging 24x7 Helpline:</b> ${S.antiRagging.helpline} · Toll-Free
</div>
<div class="g">
  <div class="c">
    <h3>Anti-Ragging Squad Members</h3>
    <table class="tbl">
      <tr><th>Member</th><th>Role</th><th>Direct Phone</th></tr>
      ${S.antiRagging.squad.map(m=>`<tr><td><b>${m.name}</b></td><td>${m.role}</td><td><a href="tel:${m.phone}">${m.phone}</a></td></tr>`).join("")}
    </table>
  </div>
  <div class="c">
    <h3>Submit Confidential / Anonymous Report</h3>
    <input id="ar_loc" placeholder="Location of incident (e.g. Block A 1st Floor, Canteen)">
    <textarea id="ar_desc" rows="3" placeholder="Describe the incident objectively..."></textarea>
    <div style="margin-bottom:8px"><label><input type="checkbox" id="ar_anon" checked style="width:auto"> Keep my identity anonymous</label></div>
    <button class="btn r" onclick="fileAntiRagging()">File Incident Report</button>
  </div>
</div>
<div class="c">
  <h3>Recent Campus Incident Reports & Corrective Actions</h3>
  ${myReports.map(r=>`
    <div class="meal-box">
      <div class="row"><b>Report #${r.id} · ${r.loc}</b><span class="tag ${tagFor(r.st)}">${r.st}</span></div>
      <div style="font-size:14px;margin:4px 0">${r.desc}</div>
      <div class="mu">Reported: ${r.date} by ${r.by} · Assigned: ${r.officer||"Anti-Ragging Squad"}</div>
      ${r.action?`<div class="alert" style="margin-top:6px;border-color:var(--gn);color:var(--gn);background:#22c55e18"><b>Action Taken:</b> ${r.action}</div>`:""}
    </div>
  `).join("")}
</div>`;
};

function fileAntiRagging(){
 const loc=$("#ar_loc")?$("#ar_loc").value.trim():"Campus Corridor";
 const desc=$("#ar_desc")?$("#ar_desc").value.trim():"";
 const anon=$("#ar_anon")?$("#ar_anon").checked:true;
 if(!desc)return toast("Please describe the incident");
 const id=S.antiRagging.reports.length+201;
 S.antiRagging.reports.unshift({id,by:anon?"Anonymous":nm(),loc,date:new Date().toISOString().split("T")[0],desc,st:"Under Investigation",officer:"Prof. S. K. Nayak",action:"Immediate squad alert dispatched"});
 save();
 notify("admin","🚨 URGENT: New anti-ragging report filed at "+loc);
 notify("warden","🚨 Anti-ragging alert at "+loc);
 toast("Report confidential submission received. Squad alerted.");
 render();
}

V.student_cmp=()=>`<h2>Feedback & Maintenance Complaints</h2><p class="sub">Report campus/hostel issues → auto-route to staff → track resolution → give feedback</p>
<div class="c"><h3>Report a Problem</h3><select id="cc"><option>Plumbing</option><option>Electrical</option><option>Fan / Light</option><option>Wi-Fi</option><option>Furniture</option><option>Drinking Water</option></select><input id="ct" placeholder="Describe the problem (e.g. Fan not working)"><button class="btn" onclick="addC()">Submit complaint</button></div>
${S.cmp.filter(c=>c.by==nm()).slice().reverse().map(c=>`<div class="c"><div class="row"><b>#H${c.id} · ${c.cat} · Room ${c.room}</b><span class="tag ${tagFor(c.st)}">${c.st}</span></div><div>${c.txt}</div><div class="mu">Priority: ${c.pri} · Assigned: ${c.who}</div>
${c.st=="Resolved"?`<div class="stars">Rate: ${[1,2,3,4,5].map(i=>`<span class="${i<=c.rate?"on":""}" onclick="rate(${c.id},${i})">★</span>`).join("")}</div>`:""}</div>`).join("")}`;

function addC(){const t=$("#ct").value.trim();if(!t)return toast("Please describe the problem");const cat=$("#cc").value,id=S.cmp[S.cmp.length-1].id+1;
 const who={Plumbing:"Plumber - Ramesh",Electrical:"Electrician - Suresh","Fan / Light":"Electrician - Suresh","Wi-Fi":"IT Cell",Furniture:"Carpenter - Mohan","Drinking Water":"Maintenance - Ramesh"}[cat]||"Maintenance Staff";
 S.cmp.push({id,room:me().room||"B-204",by:nm(),cat,txt:t,pri:cat=="Electrical"?"High":"Medium",st:"Assigned",who,rate:0});save();notify("warden",`New complaint #H${id}: ${t}`);toast("Auto-routed to "+who);render()}
function rate(id,n){const c=S.cmp.find(x=>x.id==id);if(c){c.rate=n;c.st="Closed";save();toast("Thanks for your feedback!");render()}}

const CS=["Requested","Processing","Approved","Ready"];
V.student_cert=()=>{const my=S.certs.filter(c=>c.who==nm());return`<h2>Certificate Requests & Issuance Desk</h2><p class="sub">Apply → Admin verification → Approved → Digital Ready</p>
<div class="c"><h3>New Request</h3><select id="ct2"><option>Bonafide certificate</option><option>Character certificate</option><option>Study certificate</option><option>No-dues certificate</option><option>ID card (duplicate)</option></select><button class="btn" onclick="S.certs.push({id:S.certs.length+1,who:nm(),type:$('#ct2').value,st:'Requested'});save();notify('admin','New certificate request from '+nm());toast('Request submitted');render()">Submit request</button></div>
${my.slice().reverse().map(c=>`<div class="c"><div class="row"><b>${c.type} · #C${c.id}</b><span class="tag ${c.st=="Ready"?"t-g":c.st=="Rejected"?"t-r":"t-a"}">${c.st}</span></div><div class="stepper">${CS.map((x,i)=>`<span class="${i<=CS.indexOf(c.st)?"on":""}">${x}</span>`).join("")}</div>
${c.st=="Ready"?`<div class="pass" style="border:3px double var(--ac);display:block;text-align:center"><b style="font-size:18px;color:var(--ac)">${c.type.toUpperCase()}</b><p>This is to certify that <b>${c.who}</b> is a bonafide student of the Department of CSE, 3rd Year, in good standing.</p><div class="mu">Cert No. C-${c.id} · Digitally verified by Administrator · ${new Date().toLocaleDateString()}</div></div>`:""}</div>`).join("")||'<div class="mu">No requests yet.</div>'}`};

V.student_ntc=()=>`<h2>Smart Notices</h2><p class="sub">Targeted delivery: Branch + Year + Batch + Hostel</p><div class="c">${vis().map(n=>`<div class="row"><span>${n.b}</span><span class="tag">${n.c}</span></div>`).join("")}</div>`;

V.student_more=()=>{const a=overall(),sc=Math.round((68+a+70+60)/4);return`<h2>Queue, Readiness & Peer Help Desk</h2><p class="sub">Virtual token management, exam readiness score, and collaborative student help</p>
<div class="g"><div class="c"><h3>Virtual Queue Desk</h3>${S.token?`<div class="big">${S.token.n}</div><div class="mu">${S.token.d} · 3 people ahead</div>`:`<select id="qd"><option>Accounts</option><option>Library</option><option>Administration</option><option>Certificates</option></select><button class="btn" onclick="S.token={n:'A-0'+(20+Math.floor(Math.random()*40)),d:$('#qd').value};save();toast('Token generated');render()">Take virtual token</button>`}</div>
<div class="c"><h3>Exam Readiness</h3><div class="big">${sc}%</div><div class="bar"><i style="width:${sc}%;background:var(--gn)"></i></div><div class="mu" style="margin-top:8px">Marks 68 · Attendance ${a} · Assignments 70 · Study 60<br>Pending: Assignment 3, OS Unit 4 revision</div></div></div>
<div class="c"><h3>Peer Help Desk</h3>${S.help.map((h,i)=>`<div class="row"><span>“${h.q}”</span>${h.by?`<span class="tag t-g">${h.by} volunteered</span>`:`<button class="btn o" onclick="S.help[${i}].by='Rahul';save();toast('Rahul volunteered to help');render()">I can help</button>`}</div>`).join("")}<input id="hq" placeholder="Ask for peer help..."><button class="btn" onclick="if($('#hq').value){S.help.unshift({q:$('#hq').value,by:null});save();render()}">Post</button></div>`};

// ==========================================
// FACULTY MODULE VIEWS & FUNCTIONS
// ==========================================

const risk=()=>S.roster.filter(s=>s.p/s.t<.75);

V.faculty_dash=()=>`<h2>Faculty Dashboard</h2><p class="sub">Dr. Mishra · Department of CSE</p>
<div class="c"><h3>⭐ At-Risk Student Detection & Alert</h3><div class="alert">⚠ ${risk().length} students have attendance below 75% threshold</div><div class="alert r">⚠ 3 students' marks have dropped significantly</div>
${risk().map(s=>`<div class="row"><span>${s.n}</span><span class="tag t-r">${Math.round(s.p/s.t*100)}%</span></div>`).join("")}
<br><button class="btn" onclick="S.reminded=true;save();notify('student','Attendance reminder from Dr. Mishra: please attend regularly');toast('Reminder sent to ${risk().length} students');render()">📩 Send reminder to selected students</button> ${S.reminded?'<span class="tag t-g">Sent ✓</span>':""}</div>
<div class="c"><h3>Today's Classes & Live Timetable</h3>${S.tt.map(c=>`<div class="row"><span>${c.t} ${c.s}</span><span class="tag">${c.r}</span></div>`).join("")}</div>`;

let pr={};
V.faculty_take=()=>`<h2>Attendance Entry</h2><p class="sub">DBMS · 09:00 AM · Tap to toggle present/absent</p><div class="c">${S.roster.map((s,i)=>`<div class="row"><span>${s.n}</span><button class="btn ${pr[i]===false?"r":"g2"}" onclick="pr[${i}]=pr[${i}]===false;render()">${pr[i]===false?"Absent":"Present"}</button></div>`).join("")}<br><button class="btn" onclick="subAtt()">Submit attendance</button></div>`;
function subAtt(){S.roster.forEach((s,i)=>{s.t++;if(pr[i]!==false)s.p++});const a=S.sub.DBMS;a[1]++;if(pr[0]!==false)a[0]++;pr={};save();notify("student","Attendance updated for DBMS");toast("Attendance saved");render()}

V.faculty_cls=()=>`<h2>Live Schedule Maker & Editor</h2><p class="sub">Schedule extra classes, cancel, or reassign lecture rooms in real time</p>
<div class="c">
  <h3>Add / Schedule Extra Class</h3>
  <div class="g">
    <input id="ex_s" placeholder="Course Name (e.g. DBMS Tutorial)">
    <input id="ex_t" placeholder="Time (e.g. 15:30)">
    <input id="ex_r" placeholder="Room (e.g. Lab 3 / Room 402)">
  </div>
  <button class="btn" onclick="scheduleExtraClass()">Schedule Class</button>
</div>
<div class="c">
  <h3>Existing Classes</h3>
  ${S.tt.map((c,i)=>`<div class="row"><span>${c.t} ${c.s} <span class="tag">${c.st=="Cancelled"?"Cancelled":c.r}</span></span><span><button class="btn o" onclick="chRoom(${i})">Change room</button> <button class="btn r" onclick="cancelC(${i})">${c.st=="Cancelled"?"Restore":"Cancel"}</button></span></div>`).join("")}
</div>`;

function scheduleExtraClass(){
 const s=$("#ex_s")?$("#ex_s").value.trim():"Extra Class";
 const t=$("#ex_t")?$("#ex_t").value.trim():"15:30";
 const r=$("#ex_r")?$("#ex_r").value.trim():"Room 305";
 S.tt.push({t,s,r,f:nm()||"Dr. Mishra",st:"On"});
 save();
 notify("student",`New class scheduled: ${s} at ${t} in ${r}`);
 toast("Class scheduled successfully");
 render();
}
function chRoom(i){const c=S.tt[i];c.r="Room "+(300+Math.floor(Math.random()*150));save();notify("student",`${c.s} moved to ${c.r}`);render()}
function cancelC(i){const c=S.tt[i];c.st=c.st=="Cancelled"?"On":"Cancelled";save();notify("student",`${c.s} ${c.st=="Cancelled"?"cancelled":"restored"}`);render()}

V.faculty_materials=()=>`<h2>Study Material Repository Uploader</h2><p class="sub">Upload lecture notes, syllabi, previous papers & reference guides</p>
<div class="c">
  <h3>Upload New Material</h3>
  <div class="g">
    <select id="fm_sub"><option>DBMS</option><option>Operating Systems</option><option>Computer Networks</option><option>Java</option><option>Mathematics</option></select>
    <select id="fm_type"><option>Lecture Notes</option><option>Question Bank</option><option>Slides / PPT</option><option>Lab Manual</option></select>
  </div>
  <input id="fm_title" placeholder="Material Title (e.g. Unit 4 - Transaction Management & Concurrency)">
  <input id="fm_file" placeholder="Filename / Attachment (e.g. DBMS_Unit4_Notes.pdf)">
  <button class="btn" onclick="uploadMaterial()">Publish to Repository</button>
</div>
<div class="c">
  <h3>Published Study Materials</h3>
  ${S.materials.map(m=>`<div class="row"><span><b>${m.title}</b> <span class="tag t-b">${m.sub}</span> <span class="mu">(${m.type})</span></span><span class="mu">${m.date}</span></div>`).join("")}
</div>`;

function uploadMaterial(){
 const sub=$("#fm_sub")?$("#fm_sub").value:"DBMS";
 const type=$("#fm_type")?$("#fm_type").value:"Lecture Notes";
 const title=$("#fm_title")?$("#fm_title").value.trim():"";
 if(!title)return toast("Please specify material title");
 const id=S.materials.length+1;
 S.materials.unshift({id,sub,title,author:nm()||"Dr. Mishra",type,date:new Date().toISOString().split("T")[0],size:"3.5 MB"});
 save();
 notify("student",`New study material uploaded: ${title} (${sub})`);
 toast("Material published to student repository");
 render();
}

V.faculty_assign=()=>`<h2>Assignment Dropbox & Evaluation</h2><p class="sub">Create assignments, inspect student file submissions, and record marks</p>
<div class="c">
  <h3>Create New Assignment</h3>
  <div class="g">
    <select id="fa_sub"><option>DBMS</option><option>Operating Systems</option><option>Computer Networks</option></select>
    <input id="fa_due" placeholder="Due Date (YYYY-MM-DD)">
    <input id="fa_max" placeholder="Max Marks (e.g. 20)">
  </div>
  <input id="fa_title" placeholder="Assignment Title">
  <textarea id="fa_desc" rows="2" placeholder="Brief problem statement or instructions..."></textarea>
  <button class="btn" onclick="createAssignment()">Create Assignment</button>
</div>
<div class="c">
  <h3>Student Submissions</h3>
  ${S.assignments.map(a=>`
    <div class="meal-box">
      <div class="row"><b>${a.title} (${a.sub})</b><span class="tag">${a.submissions.length} submitted</span></div>
      ${a.submissions.map(s=>`
        <div class="row" style="margin-top:6px">
          <span><b>${s.who}</b> (${s.roll}) · ${s.file}</span>
          <span>${s.marks!==null?`<span class="tag t-g">Graded: ${s.marks}/${a.max}</span>`:`<button class="btn sm" onclick="gradeAssign(${a.id},'${s.roll}')">Grade 19/${a.max}</button>`}</span>
        </div>
      `).join("")||'<div class="mu">No student submissions received yet.</div>'}
    </div>
  `).join("")}
</div>`;

function createAssignment(){
 const sub=$("#fa_sub")?$("#fa_sub").value:"DBMS";
 const due=$("#fa_due")?$("#fa_due").value:"2026-10-25";
 const max=+($("#fa_max")?$("#fa_max").value:20)||20;
 const title=$("#fa_title")?$("#fa_title").value.trim():"";
 if(!title)return toast("Please enter assignment title");
 const id=S.assignments.length+1;
 S.assignments.unshift({id,sub,title,due,max,desc:$("#fa_desc")?$("#fa_desc").value:"Complete assignment problems",submissions:[]});
 save();
 notify("student",`New assignment posted: ${title} (${sub})`);
 toast("Assignment created");
 render();
}
function gradeAssign(assignId,roll){
 const a=S.assignments.find(x=>x.id==assignId);
 if(a){
   const s=a.submissions.find(sub=>sub.roll==roll);
   if(s){s.marks=a.max-1;s.fb="Evaluated & verified by faculty";save();toast("Marks recorded");notify("student",`Assignment graded: ${a.title} (${s.marks}/${a.max})`);render();}
 }
}

V.faculty_leaves=()=>`<h2>Academic Leave Approval Queue</h2><p class="sub">Review and verify student medical, duty, or emergency leave applications</p>
<div class="c">
  ${S.leaves.map(l=>`
    <div class="row">
      <span><b>${l.who}</b> (${l.roll}) · ${l.type} (${l.from} to ${l.to})<br><span class="mu">${l.reason}</span></span>
      <span>${l.st=="Pending"?`
        <button class="btn g2" onclick="decideLeave(${l.id},'Approved')">Approve</button>
        <button class="btn r" onclick="decideLeave(${l.id},'Rejected')">Reject</button>`:
        `<span class="tag ${tagFor(l.st)}">${l.st}</span>`}
      </span>
    </div>
  `).join("")||'<div class="mu">No pending academic leaves.</div>'}
</div>`;

function decideLeave(id,st){
 const l=S.leaves.find(x=>x.id==id);
 if(l){l.st=st;save();notify("student",`Your academic leave (${l.type}) was ${st.toLowerCase()}`);toast(`Leave ${st}`);render();}
}

V.faculty_comm=()=>`<h2>Target Batch Communication</h2><p class="sub">Send instant announcements directly to specific branches, years, or batches</p>
<div class="c">
  <h3>Broadcast to Target Batch</h3>
  <select id="tc_b"><option>CSE 3rd Year</option><option>CSE 3rd Year - Section A</option><option>CSE 3rd Year - Section B</option><option>Mechanical 2nd Year</option><option>All My Classes</option></select>
  <textarea id="tc_m" rows="3" placeholder="Message content (e.g. Tomorrow's Lab batch 2 is rescheduled to 14:00)..."></textarea>
  <button class="btn" onclick="sendTargetComm()">Send Batch Announcement</button>
</div>`;

function sendTargetComm(){
 const b=$("#tc_b")?$("#tc_b").value:"CSE 3rd Year";
 const m=$("#tc_m")?$("#tc_m").value.trim():"";
 if(!m)return toast("Please enter a message");
 S.notices.unshift({c:"Faculty Announcement",b:`[${b}] `+m,a:b});
 save();
 notify("student",`Announcement for ${b}: `+m);
 toast("Message delivered to "+b);
 render();
}

V.faculty_fines=()=>`<h2>Academic Fine Issuer</h2><p class="sub">Levy academic penalties for laboratory equipment damage, library loss, or exam misconduct</p>
<div class="c">
  <h3>Issue Academic Fine</h3>
  <div class="g">
    <select id="ff_s">${S.roster.map(r=>`<option value="${r.n}">${r.n}</option>`).join("")}</select>
    <select id="ff_t"><option>Lab Equipment Damage</option><option>Late Assignment Penalty</option><option>Library Property Damage</option><option>Exam Misconduct</option></select>
    <input id="ff_a" placeholder="Fine Amount (e.g. ₹250)">
  </div>
  <input id="ff_r" placeholder="Specific violation details...">
  <button class="btn r" onclick="issueAcademicFine()">Issue Academic Fine</button>
</div>
<div class="c">
  <h3>Recent Academic Fines</h3>
  ${S.fines.filter(f=>f.type=="Academic").map(f=>`
    <div class="row">
      <span><b>${f.who}</b> · ${f.reason}</span>
      <span><b style="margin-right:8px">₹${f.amt}</b> <span class="tag ${tagFor(f.st)}">${f.st}</span></span>
    </div>
  `).join("")}
</div>`;

function issueAcademicFine(){
 const who=$("#ff_s")?$("#ff_s").value:"Aarav Mohanty";
 const reason=$("#ff_r")?$("#ff_r").value.trim():"Lab equipment damage";
 const amt=+($("#ff_a")?$("#ff_a").value:250)||250;
 const id=S.fines.length+101;
 S.fines.unshift({id,who,roll:"CSE2301",type:"Academic",reason,amt,st:"Unpaid",date:new Date().toISOString().split("T")[0],issuedBy:nm()||"Dr. Mishra",appeal:null});
 save();
 notify("student",`Academic fine of ₹${amt} issued to ${who}: ${reason}`);
 toast("Academic fine issued");
 render();
}

V.faculty_library=()=>`<h2>Library Records</h2><p class="sub">Search student borrowing records, active loans, and overdue status</p>
<div class="c">
  <input id="lib_q" placeholder="Enter student name or roll number (e.g. CSE2301)..." oninput="searchLibrary(this.value)">
  <div id="lib_res">
    ${S.library.map(l=>`
      <div class="meal-box">
        <div class="row"><b>${l.who} (${l.roll})</b><span class="tag t-b">${l.books.length} books issued</span></div>
        ${l.books.map(b=>`
          <div class="row" style="border:0">
            <span>📖 ${b.title}</span>
            <span class="tag ${b.st.includes("Overdue")?"t-r":"t-g"}">${b.st} (Due: ${b.due})</span>
          </div>
        `).join("")}
      </div>
    `).join("")}
  </div>
</div>`;

function searchLibrary(q){
 const res=$("#lib_res");if(!res)return;
 const filtered=S.library.filter(l=>l.who.toLowerCase().includes(q.toLowerCase())||l.roll.toLowerCase().includes(q.toLowerCase()));
 res.innerHTML=filtered.map(l=>`
   <div class="meal-box">
     <div class="row"><b>${l.who} (${l.roll})</b><span class="tag t-b">${l.books.length} books issued</span></div>
     ${l.books.map(b=>`
       <div class="row" style="border:0">
         <span>📖 ${b.title}</span>
         <span class="tag ${b.st.includes("Overdue")?"t-r":"t-g"}">${b.st} (Due: ${b.due})</span>
       </div>
     `).join("")}
   </div>
 `).join("")||'<div class="mu">No matching student library records found.</div>';
}

// ==========================================
// HOSTEL WARDEN / SUPERINTENDENT MODULE
// ==========================================

V.warden_dash=()=>{
 const oc=S.cmp.filter(c=>c.st!="Resolved"&&c.st!="Closed").length,pa=S.pass.filter(p=>p.st=="Pending").length;
 return`<h2>Hostel Control Room</h2><p class="sub">Live occupancy, complaints, approvals and emergency safety</p>
<div class="g">${[["Total Students",840],["Occupied Rooms",390],["Available Beds",35],["Open Complaints",oc],["Late Returns Tonight",2],["Pending Gate Passes",pa]].map(k=>`<div class="c"><div class="big" style="color:var(--ac)">${k[1]}</div><div class="mu">${k[0]}</div></div>`).join("")}</div>
<div class="alert r">⏰ Late-return alert: 2 students not back past 21:30 roll call</div>
${(S.sos||[]).map((x,i)=>`<div class="alert r">🚨 SOS from ${x.who} · Room ${x.room} · ${x.t} <button class="btn" onclick="S.sos.splice(${i},1);save();toast('Marked as responding');render()">Respond</button></div>`).join("")}`;
};

V.warden_rooms=()=>{
 return`<h2>Room Allocation Matrix</h2><p class="sub">Hostel room grid, occupancy density, bed allocation, and vacant slot management</p>
<div class="c">
  <h3>Allocate / Reassign Student to Bed</h3>
  <div class="g">
    <select id="ra_s">${S.roster.map(r=>`<option value="${r.n}">${r.n}</option>`).join("")}</select>
    <select id="ra_b"><option value="B">Block B</option><option value="A">Block A</option></select>
    <input id="ra_r" placeholder="Room No (e.g. 203)">
  </div>
  <button class="btn" onclick="allocateRoom()">Allocate Bed</button>
</div>
<div class="c">
  <h3>Room Allocation Grid (Block B & Block A)</h3>
  <div class="rm-grid">
    ${S.rooms.map(rm=>{
      const isFull=rm.occ.length>=rm.cap;
      return`
        <div class="rm-cell ${isFull?"full":"avail"}">
          <div style="font-weight:800;font-size:15px">Room ${rm.block}-${rm.room}</div>
          <div style="font-size:11px;color:var(--mu);margin:2px 0">${rm.occ.length}/${rm.cap} Beds</div>
          <span class="tag ${isFull?"t-r":"t-g"}">${isFull?"Full":`${rm.cap-rm.occ.length} Free`}</span>
          <div style="font-size:11px;margin-top:6px">${rm.occ.join(", ")||"<i class='mu'>Vacant</i>"}</div>
        </div>
      `;
    }).join("")}
  </div>
</div>`;
};

function allocateRoom(){
 const student=$("#ra_s")?$("#ra_s").value:"Aarav Mohanty";
 const block=$("#ra_b")?$("#ra_b").value:"B";
 const roomNo=$("#ra_r")?$("#ra_r").value.trim():"203";
 if(!roomNo)return toast("Please specify room number");
 let r=S.rooms.find(x=>x.block==block&&x.room==roomNo);
 if(!r){r={block,room:roomNo,cap:2,occ:[]};S.rooms.push(r);}
 if(r.occ.length>=r.cap)return toast(`Room ${block}-${roomNo} is already full`);
 if(!r.occ.includes(student))r.occ.push(student);
 const u=S.users.find(x=>x.name==student);if(u)u.room=`${block}-${roomNo}`;
 save();
 toast(`${student} allocated to Room ${block}-${roomNo}`);
 render();
}

V.warden_apr=()=>`<h2>Gate Pass Approvals Queue</h2><p class="sub">Approve or reject outing and leave requests with instant QR generation</p><div class="c">${S.pass.slice().reverse().map(p=>`<div class="row"><span><b>${p.who}</b> · ${p.reason}</span><span>${p.st=="Pending"?`<button class="btn g2" onclick="decide(${p.id},'Approved')">Approve</button> <button class="btn r" onclick="decide(${p.id},'Rejected')">Reject</button>`:`<span class="tag ${tagFor(p.st)}">${p.st}</span>`}</span></div>`).join("")}</div>`;
function decide(id,s){const p=S.pass.find(x=>x.id==id);if(p){p.st=s;save();if(S.users.some(u=>u.role=="student"&&u.name==p.who))notify("student",`Your gate pass was ${s.toLowerCase()}`);render()}}

V.warden_rollcall=()=>`<h2>Night Roll Call Tracker</h2><p class="sub">Daily hostel attendance log at 21:00 PM</p>
<div class="c">
  <div class="row" style="margin-bottom:10px">
    <b>Roll Call for Tonight · 21:00 PM</b>
    <span><button class="btn g2" onclick="markAllRollCall('Present')">Mark All Present</button></span>
  </div>
  <table class="tbl">
    <tr><th>Resident Name</th><th>Room</th><th>Status</th><th>Action</th></tr>
    ${S.rollCall.map((r,i)=>`
      <tr>
        <td><b>${r.who}</b></td>
        <td>${r.room}</td>
        <td><span class="tag ${tagFor(r.st)}">${r.st}</span></td>
        <td>
          <button class="btn sm o" onclick="toggleRollCall(${i},'Present')">Present</button>
          <button class="btn sm o" onclick="toggleRollCall(${i},'Late')">Late</button>
          <button class="btn sm r" onclick="toggleRollCall(${i},'Absent')">Absent</button>
        </td>
      </tr>
    `).join("")}
  </table>
</div>`;

function markAllRollCall(st){S.rollCall.forEach(r=>{if(r.st!="On Outpass")r.st=st;});save();toast("All residents marked "+st);render();}
function toggleRollCall(idx,st){S.rollCall[idx].st=st;save();if(st=="Late"||st=="Absent")notify("student",`Hostel roll call marked: ${st} for tonight`);render();}

V.warden_fines=()=>`<h2>Hostel Fine Issuer & Mess Wastage Penalties</h2><p class="sub">Levy disciplinary penalties for curfew breach, unauthorized appliances, or excessive food wastage</p>
<div class="g">
  <div class="c">
    <h3>Issue Hostel Disciplinary Fine</h3>
    <select id="wf_s">${S.roster.map(r=>`<option value="${r.n}">${r.n}</option>`).join("")}</select>
    <select id="wf_cat"><option>Late Return past 21:30</option><option>Prohibited Heating Appliance</option><option>Hostel Property Damage</option><option>Loud Music / Noise Breach</option></select>
    <input id="wf_amt" placeholder="Fine Amount (e.g. ₹200)">
    <input id="wf_desc" placeholder="Remarks or incident note...">
    <button class="btn r" onclick="issueHostelFine()">Issue Hostel Fine</button>
  </div>
  <div class="c">
    <h3>Mess Wastage Fine Issuer</h3>
    <select id="wf_ms">${S.roster.map(r=>`<option value="${r.n}">${r.n}</option>`).join("")}</select>
    <input id="wf_mamt" placeholder="Fine Amount (e.g. ₹150)" value="150">
    <input id="wf_mdesc" placeholder="Wastage note (e.g. Abandoned full plate at lunch)">
    <button class="btn r" onclick="issueWastageFine()">Issue Mess Wastage Fine</button>
  </div>
</div>
<div class="c">
  <h3>Recent Fines & Student Appeals</h3>
  ${S.fines.map(f=>`
    <div class="meal-box">
      <div class="row">
        <b>Fine #${f.id} · ${f.who} (${f.type})</b>
        <span class="tag ${tagFor(f.st)}">${f.st}</span>
      </div>
      <div style="font-size:14px;margin:4px 0">${f.reason} · <b>₹${f.amt}</b></div>
      ${f.appeal?`
        <div class="alert" style="margin-top:6px">
          <b>Appeal Filed:</b> ${f.appeal.reason}
          <div style="margin-top:6px">
            <button class="btn sm g2" onclick="resolveAppeal(${f.id},'Approved')">Waive Fine (Approve Appeal)</button>
            <button class="btn sm r" onclick="resolveAppeal(${f.id},'Rejected')">Reject Appeal</button>
          </div>
        </div>
      `:""}
    </div>
  `).join("")}
</div>`;

function issueHostelFine(){
 const who=$("#wf_s")?$("#wf_s").value:"Aarav Mohanty";
 const cat=$("#wf_cat")?$("#wf_cat").value:"Late Return";
 const amt=+($("#wf_amt")?$("#wf_amt").value:200)||200;
 const desc=$("#wf_desc")?$("#wf_desc").value.trim():cat;
 const id=S.fines.length+101;
 S.fines.unshift({id,who,roll:"CSE2301",type:"Hostel",reason:desc,amt,st:"Unpaid",date:new Date().toISOString().split("T")[0],issuedBy:"Mr. Sahu (Warden)",appeal:null});
 save();
 notify("student",`Hostel fine of ₹${amt} issued: ${desc}`);
 toast("Hostel fine issued");
 render();
}
function issueWastageFine(){
 const who=$("#wf_ms")?$("#wf_ms").value:"Amit Behera";
 const amt=+($("#wf_mamt")?$("#wf_mamt").value:150)||150;
 const desc=$("#wf_mdesc")?$("#wf_mdesc").value.trim():"Excessive food waste left on tray";
 const id=S.fines.length+101;
 S.fines.unshift({id,who,roll:"CSE2305",type:"Mess Wastage",reason:desc,amt,st:"Unpaid",date:new Date().toISOString().split("T")[0],issuedBy:"Mess Superintendent",appeal:null});
 save();
 notify("student",`Mess wastage penalty of ₹${amt} issued: ${desc}`);
 toast("Mess wastage fine issued");
 render();
}
function resolveAppeal(id,decision){
 const f=S.fines.find(x=>x.id==id);
 if(f&&f.appeal){
   f.appeal.st=decision;
   if(decision=="Approved"){f.st="Waived";notify("student",`Your fine #${id} appeal was approved and the fine has been waived.`);}
   else{f.st="Unpaid";notify("student",`Your fine #${id} appeal was rejected. Please pay the fine.`);}
   save();toast("Appeal marked "+decision);render();
 }
}

V.warden_cmp=()=>`<h2>Maintenance Oversight</h2><p class="sub">Assign, track, inspect and resolve hostel maintenance tickets</p>
${S.cmp.slice().reverse().map(c=>`<div class="c"><div class="row"><b>#H${c.id} · Room ${c.room} · ${c.cat}</b><span class="tag ${tagFor(c.st)}">${c.st}</span></div><div>${c.txt} <span class="mu">· Priority ${c.pri} · ${c.who}</span></div><br>${["Assigned","In Progress","Resolved"].filter(s=>c.st!=s&&c.st!="Closed"&&c.st!="Resolved").map(s=>`<button class="btn o" onclick="setC(${c.id},'${s}')">Mark ${s}</button> `).join("")}</div>`).join("")}`;
function setC(id,s){const c=S.cmp.find(x=>x.id==id);if(c){c.st=s;save();if(s=="Resolved")notify("student",`Complaint #H${id} resolved — please rate`);render()}}

V.warden_repair=()=>`<h2>Repair Proof Upload</h2><p class="sub">Upload work completion photos, technician sign-off, and repair notes before closing complaints</p>
<div class="c">
  <h3>Upload Repair Verification Proof</h3>
  <div class="g">
    <select id="rp_cmp">${S.cmp.map(c=>`<option value="${c.id}">Complaint #${c.id} (${c.cat} - Room ${c.room})</option>`).join("")}</select>
    <input id="rp_doc" placeholder="Repair Photo / Bill Proof (e.g. Tap_Replaced.jpg)">
    <input id="rp_tech" placeholder="Technician Name (e.g. Plumber Ramesh)">
  </div>
  <textarea id="rp_notes" rows="2" placeholder="Work done details (e.g. New ceramic valve installed, pressure tested)..."></textarea>
  <button class="btn" onclick="uploadRepairProof()">Attach Proof & Resolve</button>
</div>
<div class="c">
  <h3>Verified Repair Proofs Log</h3>
  ${S.repairProofs.map(r=>`
    <div class="meal-box">
      <div class="row"><b>Complaint #${r.cmpId} (${r.cat} - Room ${r.room})</b><span class="tag t-g">Verified Proof ✓</span></div>
      <div style="font-size:13px;margin:4px 0">${r.notes}</div>
      <div class="mu">Proof File: ${r.proofDoc} · Verified by: ${r.tech} on ${r.date}</div>
    </div>
  `).join("")}
</div>`;

function uploadRepairProof(){
 const cmpId=+($("#rp_cmp")?$("#rp_cmp").value:1024);
 const doc=$("#rp_doc")?$("#rp_doc").value.trim():"Repair_Receipt.jpg";
 const tech=$("#rp_tech")?$("#rp_tech").value.trim():"Technician Ramesh";
 const notes=$("#rp_notes")?$("#rp_notes").value.trim():"Repair completed and inspected";
 const c=S.cmp.find(x=>x.id==cmpId);
 S.repairProofs.unshift({cmpId,room:c?c.room:"B-204",cat:c?c.cat:"Maintenance",proofDoc:doc,tech,date:new Date().toISOString().split("T")[0],notes});
 if(c)c.st="Resolved";
 save();
 notify("student",`Complaint #${cmpId} repaired and verified with proof`);
 toast("Repair proof logged and ticket resolved");
 render();
}

V.warden_audit=()=>`<h2>Mess Meal Auditor & Menu Uploader</h2><p class="sub">Conduct daily hygiene inspections, audit food quality, and manage menu</p>
<div class="g">
  <div class="c">
    <h3>Daily Mess Meal Quality Audit</h3>
    <div class="g">
      <select id="aud_m"><option>Lunch</option><option>Dinner</option><option>Breakfast</option></select>
      <input id="aud_t" placeholder="Food Serving Temp (e.g. 70°C)">
      <input id="aud_s" placeholder="Hygiene Score 1-5 (e.g. 4.8)">
    </div>
    <textarea id="aud_n" rows="2" placeholder="Quality remarks, tasting inspection, oil freshness..."></textarea>
    <button class="btn" onclick="saveMessAudit()">Submit Inspection Log</button>
  </div>
  <div class="c">
    <h3>Update & Upload Mess Menu</h3>
    <textarea id="wm_mn" rows="3">${S.menu}</textarea>
    <button class="btn o" onclick="saveWardenMenu()">Upload & Publish Menu</button>
  </div>
</div>
<div class="c">
  <h3>Recent Meal Quality Audits</h3>
  ${S.messAudits.map(a=>`
    <div class="meal-box">
      <div class="row"><b>${a.meal} Audit (${a.date})</b><span class="tag t-g">${a.score}★ Quality Score</span></div>
      <div style="font-size:13px;margin:4px 0">${a.notes}</div>
      <div class="mu">Temp: ${a.temp} · Hygiene: ${a.hygiene} · Auditor: ${a.auditor}</div>
    </div>
  `).join("")}
</div>`;

function saveMessAudit(){
 const meal=$("#aud_m")?$("#aud_m").value:"Lunch";
 const temp=$("#aud_t")?$("#aud_t").value:"68°C";
 const score=+($("#aud_s")?$("#aud_s").value:4.5)||4.5;
 const notes=$("#aud_n")?$("#aud_n").value.trim():"Clean premises and satisfactory taste";
 S.messAudits.unshift({date:new Date().toISOString().split("T")[0],meal,score,temp,hygiene:"Verified Sanitized",auditor:nm()||"Mr. Sahu (Warden)",notes});
 save();
 toast("Meal quality audit submitted");
 render();
}
function saveWardenMenu(){
 const m=$("#wm_mn")?$("#wm_mn").value.trim():"";
 if(!m)return toast("Enter menu content");
 S.menu=m;
 S.notices.unshift({c:"Mess",b:"Menu updated: "+m});
 save();
 notify("student","Mess menu updated by Warden");
 toast("Menu uploaded and published");
 render();
}

// ==========================================
// MESS MANAGER MODULE
// ==========================================

V.mess_dash=()=>{
 const r=S.reg;
 return`<h2>Food Quantity Demand Predictor</h2><p class="sub">Predict ingredient requirements and minimize food waste using pre-meal bookings</p>
<div class="c"><h3>Tomorrow's Expected Lunch</h3><div class="big">${r} <span class="mu" style="font-size:16px">students expected</span></div><input type="range" min="500" max="840" value="${r}" oninput="S.reg=+this.value;save();render()"></div>
<div class="g">${[["Rice",.1145],["Dal",.0433],["Vegetables",.067]].map(([n,k])=>`<div class="c"><h3>${n}</h3><div class="big" style="color:var(--ac)">${Math.round(r*k)} kg</div><div class="bar"><i style="width:${Math.round(r*k)}%;background:var(--ac)"></i></div></div>`).join("")}</div>
<div class="alert" style="border-color:var(--gn);color:var(--gn);background:#22c55e18">♻ Estimated wastage reduction: ~${Math.round((840-r)/840*100)+8}% vs cooking for full strength</div>`;
};

V.mess_fb=()=>`<h2>Menu Uploader & Student Feedback</h2><p class="sub">Daily menu, notices, and student rating breakdown</p>
<div class="c"><h3>Today's menu</h3><textarea id="mn" rows="2">${S.menu}</textarea><button class="btn" onclick="S.menu=$('#mn').value;S.notices.unshift({c:'Mess',b:'Menu updated: '+S.menu});save();notify('student','Mess menu updated');toast('Menu published');render()">Publish menu change</button></div>
<div class="c"><h3>Student feedback · avg ${(S.fb.reduce((a,f)=>a+f.r,0)/S.fb.length).toFixed(1)}★</h3>${S.fb.map(f=>`<div class="row"><span>${f.x}</span><span class="tag t-a">${"★".repeat(f.r)}</span></div>`).join("")}</div>`;

V.mess_audit=()=>`<h2>Mess Meal Quality Auditor</h2><p class="sub">Log daily tasting, temperature checks, and hygiene compliance</p>
<div class="c">
  <h3>Log Daily Meal Quality Audit</h3>
  <div class="g">
    <select id="ma_m"><option>Lunch</option><option>Dinner</option><option>Breakfast</option></select>
    <input id="ma_t" placeholder="Serving Temperature (e.g. 72°C)">
    <input id="ma_s" placeholder="Hygiene Rating (1-5★)">
  </div>
  <textarea id="ma_n" rows="2" placeholder="Cleanliness observations, nutritional review..."></textarea>
  <button class="btn" onclick="saveMessManagerAudit()">Record Audit Entry</button>
</div>
<div class="c">
  <h3>Audit History</h3>
  ${S.messAudits.map(a=>`<div class="row"><span><b>${a.date} (${a.meal})</b>: ${a.notes}</span><span class="tag t-g">${a.score}★</span></div>`).join("")}
</div>`;

function saveMessManagerAudit(){
 const meal=$("#ma_m")?$("#ma_m").value:"Lunch";
 const temp=$("#ma_t")?$("#ma_t").value:"70°C";
 const score=+($("#ma_s")?$("#ma_s").value:4.6)||4.6;
 const notes=$("#ma_n")?$("#ma_n").value.trim():"Sanitary protocols followed in kitchen";
 S.messAudits.unshift({date:new Date().toISOString().split("T")[0],meal,score,temp,hygiene:"Optimal",auditor:"Mess Manager",notes});
 save();
 toast("Audit recorded");
 render();
}

V.mess_wastage=()=>`<h2>Mess Wastage Log & Fines</h2><p class="sub">Track daily kitchen/dining food wastage and penalize repeated waste</p>
<div class="g">
  <div class="c">
    <h3>Log Daily Food Wastage</h3>
    <input id="mw_kg" placeholder="Total Food Wasted in kg (e.g. 22)">
    <select id="mw_m"><option>Lunch</option><option>Dinner</option><option>Breakfast</option></select>
    <textarea id="mw_note" rows="2" placeholder="Observations (e.g. Excess cooked rice, salad overage)..."></textarea>
    <button class="btn" onclick="logWastage()">Log Wastage Data</button>
  </div>
  <div class="c">
    <h3>Wastage Trends & Statistics</h3>
    ${S.messWastage.map(w=>`
      <div class="row">
        <span><b>${w.date} (${w.meal}):</b> ${w.wasteKg} kg wasted <span class="mu">(${w.notes})</span></span>
        <span class="tag ${w.wasteKg<20?"t-g":"t-r"}">${w.wasteKg} kg</span>
      </div>
    `).join("")}
  </div>
</div>`;

function logWastage(){
 const kg=+($("#mw_kg")?$("#mw_kg").value:20)||20;
 const m=$("#mw_m")?$("#mw_m").value:"Lunch";
 const notes=$("#mw_note")?$("#mw_note").value.trim():"Recorded waste";
 S.messWastage.unshift({date:new Date().toISOString().split("T")[0],meal:m,wasteKg:kg,prepKg:115,headcount:S.reg,notes});
 save();
 toast("Wastage logged");
 render();
}

// ==========================================
// ADMIN MODULE VIEWS & FUNCTIONS
// ==========================================

V.admin_dash=()=>{
 const n=r=>S.users.filter(u=>u.role==r).length;
 return`<h2>Admin Command Dashboard</h2><p class="sub">Campus-wide visibility, safety and operations · ${nm()}</p>
<div class="g">${[["Total Users",S.users.length],["Students",n("student")],["Staff Accounts",S.users.length-n("student")-n("admin")],["Pending Certificates",S.certs.filter(c=>c.st!="Ready"&&c.st!="Rejected").length],["Open Complaints",S.cmp.filter(c=>c.st!="Resolved"&&c.st!="Closed").length],["Pending Gate Passes",S.pass.filter(p=>p.st=="Pending").length],["At-Risk Students",risk().length],["Scholarships Under Review",S.scholarships.filter(s=>s.st!="Approved"&&s.st!="Rejected").length],["Active SOS Alerts",(S.sos||[]).length],["Campus Health Score",hs()+"%"]].map(k=>`<div class="c"><div class="big" style="color:var(--ac)">${k[1]}</div><div class="mu">${k[0]}</div></div>`).join("")}</div>
<div class="c"><h3>Recent Notices</h3>${S.notices.slice(0,4).map(x=>`<div class="row"><span>${x.b}</span><span class="tag">${x.a||"All"}</span></div>`).join("")}</div>`;
};

V.admin_fees=()=>{
 return`<h2>Master Fee Gateway</h2><p class="sub">Campus-wide fee collections, pending balances, revenue breakdown and offline reconciliation</p>
<div class="g">
  <div class="c"><small class="mu">Total Collected</small><div class="big" style="color:var(--gn)">₹${(S.feeSummary.collected/100000).toFixed(2)} L</div><div class="mu">${S.feeSummary.paidCount} students settled</div></div>
  <div class="c"><small class="mu">Total Outstanding</small><div class="big" style="color:var(--rd)">₹${(S.feeSummary.pending/100000).toFixed(2)} L</div><div class="mu">50 students pending</div></div>
  <div class="c"><small class="mu">Collection Efficiency</small><div class="big" style="color:var(--ac)">${Math.round(S.feeSummary.collected/(S.feeSummary.collected+S.feeSummary.pending)*100)}%</div><div class="mu">Semester 5 cycle</div></div>
</div>
<div class="c">
  <h3>Campus Fee Heads Breakdown</h3>
  <table class="tbl">
    <tr><th>Fee Category</th><th>Collected (INR)</th><th>Outstanding (INR)</th><th>Due Date</th></tr>
    <tr><td>Semester Tuition & Lab Fees</td><td>₹28,50,000</td><td>₹3,50,000</td><td>15 Oct 2026</td></tr>
    <tr><td>Hostel Rent & Power Charges</td><td>₹8,20,000</td><td>₹1,40,000</td><td>15 Oct 2026</td></tr>
    <tr><td>Mess Advance Catering</td><td>₹4,10,000</td><td>₹85,000</td><td>10 Oct 2026</td></tr>
    <tr><td>University Examination Fees</td><td>₹1,70,000</td><td>₹50,000</td><td>20 Oct 2026</td></tr>
  </table>
</div>
<div class="c">
  <h3>Offline Fee Reconciliation (Challan / DD / NEFT)</h3>
  <div class="g">
    <input id="rec_roll" placeholder="Student Roll No (e.g. CSE2301)">
    <input id="rec_amt" placeholder="Amount Reconciled (e.g. 12500)">
    <input id="rec_ref" placeholder="Bank Challan / UTR Number">
  </div>
  <button class="btn" onclick="reconcileFee()">Reconcile & Clear Student Dues</button>
</div>`;
};

function reconcileFee(){
 const roll=$("#rec_roll")?$("#rec_roll").value.trim():"CSE2301";
 if(roll.toLowerCase()=="cse2301"){
   S.fee=true;
   const acc=S.noDues.find(d=>d.dept.includes("Tuition"));
   if(acc){acc.st="Cleared";acc.remark="Challan reconciled by Admin";acc.date=new Date().toISOString().split("T")[0];}
   save();
   notify("student","Your semester fee was reconciled by the admin accounts desk.");
   toast("Fee reconciled successfully for "+roll);
   render();
 } else {
   toast("Reconciliation entry recorded for "+roll);
 }
}

V.admin_users=()=>`<h2>Student & Faculty Addition & Edition</h2><p class="sub">Create, update profile records, and manage accounts for every role</p>
<div class="c">
  <h3>Add / Edit User</h3>
  <input id="un" placeholder="Full name">
  <input id="ui" placeholder="User ID (login)">
  <input id="up" placeholder="Password">
  <select id="ur"><option value="student">Student</option><option value="faculty">Faculty</option><option value="warden">Warden / Hostel</option><option value="mess">Mess Manager</option><option value="admin">Admin</option></select>
  <input id="udept" placeholder="Department / Branch (e.g. CSE)">
  <input id="uroom" placeholder="Room / Cabin No (e.g. B-204)">
  <button class="btn" onclick="addU()">Save User Account</button>
</div>
<div class="c"><h3>All Accounts (${S.users.length})</h3>${S.users.map(u=>`<div class="row"><span><b>${u.name}</b> <span class="mu">· ID: ${u.id} · ${u.dept||u.role} ${u.room?`· ${u.room}`:""}</span></span><span><span class="tag t-b">${NAME[u.role]}</span> <button class="btn sm o" onclick="loadEditU('${u.id}')">Edit</button> ${u.id=="admin"||u.id==S.me?"":`<button class="btn sm r" onclick="delU('${u.id}')">Remove</button>`}</span></div>`).join("")}</div>`;

function loadEditU(id){
 const u=S.users.find(x=>x.id==id);
 if(!u)return;
 $("#un").value=u.name;$("#ui").value=u.id;$("#up").value=u.pw;$("#ur").value=u.role;
 if($("#udept"))$("#udept").value=u.dept||"";
 if($("#uroom"))$("#uroom").value=u.room||"";
 toast("Editing account "+u.id);
}
function addU(){
 const n=$("#un").value.trim(),i=$("#ui").value.trim(),p=$("#up").value.trim();
 if(!n||!i||!p)return toast("Fill name, ID and password");
 const existing=S.users.find(u=>u.id.toLowerCase()==i.toLowerCase());
 if(existing){
   existing.name=n;existing.pw=p;existing.role=$("#ur").value;
   if($("#udept")&&$("#udept").value)existing.dept=$("#udept").value;
   if($("#uroom")&&$("#uroom").value)existing.room=$("#uroom").value;
   save();toast("Updated account "+n);render();return;
 }
 S.users.push({id:i,pw:p,role:$("#ur").value,name:n,room:($("#uroom")&&$("#uroom").value)?$("#uroom").value:"B-"+(100+S.users.length),dept:($("#udept")&&$("#udept").value)?$("#udept").value:"General"});
 save();toast("Account created for "+n);render();
}
function delU(id){S.users=S.users.filter(u=>u.id!=id);save();toast("Account removed");render()}

V.admin_ids=()=>`<h2>Digital ID Manager</h2><p class="sub">Verify, activate, suspend, or reissue digital student and faculty campus IDs</p>
<div class="c">
  <h3>Issued Digital Campus ID Records</h3>
  <table class="tbl">
    <tr><th>User ID</th><th>Name</th><th>Role</th><th>Dept</th><th>Status</th><th>Actions</th></tr>
    ${S.idRecords.map((id,i)=>`
      <tr>
        <td><b>${id.id}</b></td>
        <td>${id.name}</td>
        <td>${NAME[id.role]}</td>
        <td>${id.dept}</td>
        <td><span class="tag ${tagFor(id.st)}">${id.st}</span></td>
        <td>
          <button class="btn sm o" onclick="toggleIdSt(${i})">${id.st=="Active"?"Suspend":"Activate"}</button>
          <button class="btn sm" onclick="toast('New QR barcode generated for ${id.id}')">Reissue QR</button>
        </td>
      </tr>
    `).join("")}
  </table>
</div>`;

function toggleIdSt(idx){
 S.idRecords[idx].st=S.idRecords[idx].st=="Active"?"Suspended":"Active";
 save();
 toast("ID status updated for "+S.idRecords[idx].id);
 render();
}

V.admin_sos=()=>`<h2>SOS Emergency Command Center</h2><p class="sub">Real-time distress beacon dispatch, security coordination, and incident resolution</p>
<div class="c">
  <h3>Live Distress Signals (${(S.sos||[]).length})</h3>
  ${(S.sos||[]).map((x,i)=>`
    <div class="alert r">
      <div class="row" style="border:0">
        <b>🚨 CRITICAL SOS: ${x.who} · Room ${x.room} · ${x.t}</b>
        <span>
          <button class="btn" onclick="toast('Security team dispatched to Room ${x.room}')">Dispatch Security</button>
          <button class="btn g2" onclick="S.sos.splice(${i},1);save();toast('Incident marked resolved');render()">Resolve</button>
        </span>
      </div>
    </div>
  `).join("")||'<div class="mu">No active distress beacons. All campus zones secure.</div>'}
</div>`;

const NX={Requested:["Processing","Verify documents"],Processing:["Approved","Approve Bonafide"],Approved:["Ready","Issue Certificate"]};
V.admin_cert=()=>`<h2>Certificate Issuance Desk & Bonafide Approvals</h2><p class="sub">Verify, approve, digitally sign, and issue certificates</p><div class="c">${S.certs.slice().reverse().map(c=>`<div class="row"><span><b>${c.who}</b> · ${c.type}</span><span><span class="tag ${tagFor(c.st)}">${c.st}</span> ${NX[c.st]?`<button class="btn g2" onclick="certS(${c.id},'${NX[c.st][0]}')">${NX[c.st][1]}</button> <button class="btn r" onclick="certS(${c.id},'Rejected')">Reject</button>`:""}</span></div>`).join("")||'<div class="mu">No requests yet.</div>'}</div>`;
function certS(id,st){const c=S.certs.find(x=>x.id==id);if(c){c.st=st;save();notify("student",`${c.type}: ${st}`);render()}}

V.admin_schol=()=>`<h2>Scholarship Manager</h2><p class="sub">Review student scholarship applications, verify income certificates, and grant institute approval</p>
<div class="c">
  ${S.scholarships.map(s=>`
    <div class="meal-box">
      <div class="row">
        <b>${s.who} (${s.roll}) · ${s.scheme}</b>
        <span class="tag ${tagFor(s.st)}">${s.st}</span>
      </div>
      <div style="font-size:14px;margin:4px 0"><b>Family Income:</b> ${s.income} · <b>Grant:</b> ₹${s.amt} · <b>Proof:</b> ${s.doc}</div>
      <div class="mu">Remarks: ${s.notes}</div>
      <div style="margin-top:8px">
        ${s.st!="Approved"?`<button class="btn g2 sm" onclick="decideSchol(${s.id},'Approved')">Approve Scholarship</button> `:""}
        ${s.st!="Verified"?`<button class="btn o sm" onclick="decideSchol(${s.id},'Verified')">Mark Verified</button> `:""}
        ${s.st!="Rejected"?`<button class="btn r sm" onclick="decideSchol(${s.id},'Rejected')">Reject</button>`:""}
      </div>
    </div>
  `).join("")}
</div>`;

function decideSchol(id,st){
 const s=S.scholarships.find(x=>x.id==id);
 if(s){s.st=st;s.notes=st=="Approved"?"Approved by Institute Admin; queued for disbursement":"Verification completed";save();notify("student",`Scholarship (${s.scheme}) status: ${st}`);toast("Scholarship marked "+st);render();}
}

V.admin_antirag=()=>`<h2>Anti-Ragging Portal Command</h2><p class="sub">Administrative oversight of anti-ragging complaints, committee investigations, and disciplinary actions</p>
<div class="c">
  <h3>Anti-Ragging Committee & Squad Incidents</h3>
  ${S.antiRagging.reports.map(r=>`
    <div class="meal-box">
      <div class="row">
        <b>Incident #${r.id} · ${r.loc}</b>
        <span class="tag ${tagFor(r.st)}">${r.st}</span>
      </div>
      <div style="font-size:14px;margin:4px 0">${r.desc}</div>
      <div class="mu">Filed on ${r.date} by ${r.by} · Assigned Officer: ${r.officer||"Squad Convener"}</div>
      <div style="margin-top:8px;display:flex;gap:6px">
        <button class="btn sm o" onclick="arAction(${r.id},'Patrols heightened and statements recorded')">Log Action</button>
        <button class="btn sm g2" onclick="arStatus(${r.id},'Resolved & Closed')">Close Case</button>
      </div>
      ${r.action?`<div class="alert" style="margin-top:6px;border-color:var(--gn);color:var(--gn);background:#22c55e18"><b>Action Log:</b> ${r.action}</div>`:""}
    </div>
  `).join("")}
</div>`;

function arAction(id,act){
 const r=S.antiRagging.reports.find(x=>x.id==id);
 if(r){r.action=act;r.st="Action Taken";save();toast("Action recorded for incident #"+id);render();}
}
function arStatus(id,st){
 const r=S.antiRagging.reports.find(x=>x.id==id);
 if(r){r.st=st;save();toast("Incident #"+id+" status updated to "+st);render();}
}

V.admin_ntc=()=>`<h2>Broadcast Notice</h2><p class="sub">Targeted delivery across campus branches and hostels</p>
<div class="c"><h3>New Notice</h3><select id="na">${AUD.map(a=>`<option>${a}</option>`).join("")}</select><select id="nc"><option>Academic</option><option>Hostel</option><option>Examination</option><option>Fee</option><option>Emergency</option><option>Event</option></select><textarea id="nb" rows="3" placeholder="Write the announcement..."></textarea><button class="btn" onclick="sendN()">Publish notice</button></div>
<div class="c"><h3>Published</h3>${S.notices.map(n=>`<div class="row"><span>${n.b}</span><span class="tag">${n.a||"All"}</span></div>`).join("")}</div>`;

function sendN(){const b=$("#nb").value.trim();if(!b)return toast("Write a notice first");const a=$("#na").value;S.notices.unshift({c:$("#nc").value,b,a});save();if(a!="Mechanical 2nd Year")notify("student","New notice: "+b);toast("Notice delivered to: "+a);render()}

// ==========================================
// AUTHENTICATION & LOGIN UI
// ==========================================

const DEMO={student:["Student","CSE2301","student123"],faculty:["Faculty","FAC101","faculty123"],warden:["Warden / Hostel","WRD201","warden123"],mess:["Mess Owner","MESS301","mess123"],admin:["Admin","admin","admin123"]};
const MODS={student:["student"],staff:["faculty"],hostel:["warden","mess"],admin:["admin"]},MLAB={student:"Student module",staff:"Staff module",hostel:"Hostel module",admin:"Admin module"};
let MODULE=null;try{const m=new URLSearchParams(location.search).get("module");if(MODS[m])MODULE=m}catch(e){}
const rolesFor=m=>m?MODS[m]:Object.keys(DEMO);
function togSu(){const s=$("#su");s.style.display=s.style.display=="block"?"none":"block"}
function doSignup(){const n=$("#sn").value.trim(),i=$("#si").value.trim(),p=$("#sp").value.trim(),e=$("#se"),bad=m=>{e.textContent=m;e.style.display="block"};
 if(!n||!i||!p)return bad("Fill name, ID and password");if(p.length<4)return bad("Password must be at least 4 characters");if(S.users.some(u=>u.id.toLowerCase()==i.toLowerCase()))return bad("User ID already exists");
 const r=$("#sr").value;if(!rolesFor(MODULE).includes(r)||r=="admin")return bad("Choose a valid role");
 S.users.push({id:i,pw:p,role:r,name:n,room:"B-"+(100+S.users.length),dept:"CSE"});S.me=i;view="dash";save();render();toast("Welcome to UniFlow, "+n)}
function loginUI(){$("#lt").textContent=MODULE?MLAB[MODULE]+" · Sign in or sign up":"Sign in to your account";
 const sg=rolesFor(MODULE).filter(r=>r!="admin");$("#stg").style.display=sg.length?"":"none";$("#sr").innerHTML=sg.map(r=>`<option value="${r}">${DEMO[r][0]}</option>`).join("");
 $("#lc").innerHTML=Object.entries(DEMO).filter(([r])=>rolesFor(MODULE).includes(r)).map(([r,d])=>`<button class="btn o" style="margin:3px" onclick="fill('${r}')">${d[0]}</button>`).join("")}
function fill(r){$("#lu").value=DEMO[r][1];$("#lp").value=DEMO[r][2];$("#le").style.display="none"}
function doLogin(){const id=$("#lu").value.trim().toLowerCase(),u=S.users.find(x=>x.id.toLowerCase()==id&&x.pw==$("#lp").value);
 if(!u){$("#le").textContent="Invalid User ID or password";$("#le").style.display="block";return}
 S.me=u.id;view="dash";save();$("#lp").value="";render();toast("Welcome, "+u.name)}
function logout(){S.me=null;$("#np").style.display="none";save();render()}
function sos(){S.sos=S.sos||[];S.sos.unshift({who:nm(),room:me().room||"B-204",t:new Date().toLocaleTimeString()});save();notify("warden","🚨 SOS from "+nm());notify("admin","🚨 SOS from "+nm());toast("SOS sent to warden and admin");render()}
const hs=()=>Math.max(0,100-S.cmp.filter(c=>c.st!="Resolved"&&c.st!="Closed").length*4-S.pass.filter(p=>p.st=="Pending").length*2-risk().length*2-(S.sos||[]).length*10);
const AUD=["All","CSE 3rd Year","Hostel Block B","Mechanical 2nd Year"];
const vis=()=>S.notices.filter(n=>!n.a||["All","CSE 3rd Year","Hostel Block B"].includes(n.a));

render();
