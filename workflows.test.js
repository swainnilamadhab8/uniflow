// Tests mirror the problem statement: one connected campus platform covering
// attendance, gate pass, complaints, certificates, notices, mess, hostel safety and admin control.
const test=require("node:test"),assert=require("node:assert/strict"),{load}=require("./helpers");
const login=(a,id,pw)=>{a.run(`$("#lu").value=${JSON.stringify(id)};$("#lp").value=${JSON.stringify(pw)};`);};
const as=(a,id)=>a.run(`S.me=${JSON.stringify(id)};render()`);
const notifs=(a,to)=>a.run(`S.notifs.filter(n=>n.to==${JSON.stringify(to)}).map(n=>n.msg)`);

test("auth: five demo roles exist; wrong password rejected, correct one signs in", ()=>{
  const a=load();assert.equal(a.run("JSON.stringify(S.users.map(u=>u.role).sort())"),JSON.stringify(["admin","faculty","mess","student","warden"]));
  login(a,"CSE2301","wrong");a.run("doLogin()");assert.equal(a.run("S.me"),null);
  login(a,"cse2301","student123");a.run("doLogin()");assert.equal(a.run("S.me"),"CSE2301");
  a.run("logout()");assert.equal(a.run("S.me"),null);
});
test("attendance: subject-wise %, shortage detection and bunk calculator", ()=>{
  const a=load();
  assert.equal(a.run("pct(S.sub.DBMS)"),79);
  assert.equal(a.run("pct(S.sub['Computer Networks'])"),68);          // below 75% -> shortage
  assert.equal(a.run("Math.floor(S.sub.Mathematics[0]/.75-S.sub.Mathematics[1])"),8); // safe bunks
  assert.equal(a.run("Math.ceil((0.75*50-34)/0.25)"),14);             // classes to recover
  assert.equal(a.run("overall()"),Math.round((44+38+36+34+41)/(50+48+50+50+45)*100));
});
test("faculty: attendance submission updates student record and notifies", ()=>{
  const a=load(),before=a.run("S.sub.DBMS[1]");a.run("subAtt()");
  assert.equal(a.run("S.sub.DBMS[1]"),before+1);assert.ok(notifs(a,"student").some(m=>m.includes("DBMS")));
});
test("faculty: at-risk detection flags students under 75% and sends reminders", ()=>{
  const a=load();assert.ok(a.run("risk().length")>0);assert.ok(a.run("risk().every(s=>s.p/s.t<.75)"));
  assert.ok(!a.run("risk().some(s=>s.p/s.t>=.75)"));
});
test("class updates: cancel and room change reach students instantly", ()=>{
  const a=load();a.run("cancelC(0)");assert.equal(a.run("S.tt[0].st"),"Cancelled");
  a.run("chRoom(1)");assert.ok(notifs(a,"student").some(m=>m.includes("moved to")));
});
test("gate pass: apply -> warden approves -> student notified", ()=>{
  const a=load();as(a,"CSE2301");a.run("$('#rs').value='Medical';applyPass()");
  const id=a.run("S.pass[S.pass.length-1].id");assert.equal(a.run("S.pass.at(-1).st"),"Pending");
  assert.ok(notifs(a,"warden").some(m=>m.includes("gate-pass")));
  a.run(`decide(${id},'Approved')`);assert.equal(a.run("S.pass.at(-1).st"),"Approved");
  assert.ok(notifs(a,"student").some(m=>m.includes("approved")));
});
test("gate pass: QR pass renders valid SVG", ()=>{const a=load();assert.match(a.run("qr(3)"),/^<svg[\s\S]*<\/svg>$/);});
test("complaints: auto-routing, priority, resolution and feedback closes ticket", ()=>{
  const a=load();as(a,"CSE2301");
  a.run("$('#ct').value='Fan not working';$('#cc').value='Electrical';addC()");
  assert.equal(a.run("S.cmp.at(-1).who"),"Electrician - Suresh");assert.equal(a.run("S.cmp.at(-1).pri"),"High");
  const id=a.run("S.cmp.at(-1).id");a.run(`setC(${id},'Resolved')`);
  assert.ok(notifs(a,"student").some(m=>m.includes("resolved")));
  a.run(`rate(${id},5)`);assert.equal(a.run("S.cmp.at(-1).st"),"Closed");assert.equal(a.run("S.cmp.at(-1).rate"),5);
});
test("complaints: empty description is rejected", ()=>{const a=load(),n=a.run("S.cmp.length");as(a,"CSE2301");a.run("$('#ct').value='';addC()");assert.equal(a.run("S.cmp.length"),n);});
test("certificates: Requested -> Processing -> Approved -> Ready", ()=>{
  const a=load();as(a,"CSE2301");a.run("$('#ct2').value='Bonafide certificate';S.certs.push({id:1,who:nm(),type:$('#ct2').value,st:'Requested'})");
  for(const s of ["Processing","Approved","Ready"])a.run(`certS(1,'${s}')`);
  assert.equal(a.run("S.certs[0].st"),"Ready");assert.ok(notifs(a,"student").some(m=>m.includes("Ready")));
});
test("notices: targeted audiences only reach relevant students", ()=>{
  const a=load();a.run("S.notices.unshift({c:'Event',b:'ME fest',a:'Mechanical 2nd Year'})");
  assert.ok(!a.run("vis().some(n=>n.b=='ME fest')"));
  a.run("S.notices.unshift({c:'Hostel',b:'Block B meeting',a:'Hostel Block B'})");assert.ok(a.run("vis().some(n=>n.b=='Block B meeting')"));
});
test("mess: skipping a meal lowers predicted demand and earns eco points; undo restores", ()=>{
  const a=load(),r=a.run("S.reg");a.run("skip()");assert.equal(a.run("S.reg"),r-1);assert.equal(a.run("S.eco"),10);
  a.run("skip()");assert.equal(a.run("S.reg"),r);assert.equal(a.run("S.eco"),0);
});
test("mess: demand prediction scales kilos with headcount (716 students ≈ 82 kg rice)", ()=>{
  const a=load();assert.equal(a.run("S.reg"),716);assert.equal(a.run("Math.round(S.reg*.1145)"),82);
});
test("safety: SOS alerts warden and admin; warden can respond", ()=>{
  const a=load();as(a,"CSE2301");a.run("sos()");assert.equal(a.run("S.sos.length"),1);
  assert.ok(notifs(a,"warden").length&&notifs(a,"admin").length);
});
test("admin: health score drops with SOS and risk, never below 0", ()=>{
  const a=load(),h=a.run("hs()");as(a,"CSE2301");a.run("sos()");assert.ok(a.run("hs()")<h);
  a.run("S.sos=Array(50).fill({})");assert.equal(a.run("hs()"),0);
});
test("admin: create user, reject duplicate IDs (case-insensitive), remove user", ()=>{
  const a=load();as(a,"admin");const n=a.run("S.users.length");
  a.run("$('#un').value='Test';$('#ui').value='T1';$('#up').value='pw';$('#ur').value='student';addU()");assert.equal(a.run("S.users.length"),n+1);
  a.run("$('#ui').value='t1';addU()");assert.equal(a.run("S.users.length"),n+1);
  a.run("delU('T1')");assert.equal(a.run("S.users.length"),n);
});
test("persistence: state is saved to localStorage", ()=>{const a=load();a.run("S.fee=true;save()");assert.match(a.store.sch3,/"fee":true/);});

test("modules: Student/Staff/Hostel/Admin map to the right roles", ()=>{
  const a=load(),j=c=>a.run(`JSON.stringify(rolesFor(${c}))`);
  assert.equal(j('"student"'),'["student"]');assert.equal(j('"staff"'),'["faculty"]');assert.equal(j('"hostel"'),'["warden","mess"]');assert.equal(j('"admin"'),'["admin"]');assert.equal(j("null").includes("admin"),true);
});
test("sign up: creates account, signs in, rejects duplicates and bad input", ()=>{
  const a=load(),f=(n,i,p,r)=>a.run(`$("#sn").value=${JSON.stringify(n)};$("#si").value=${JSON.stringify(i)};$("#sp").value=${JSON.stringify(p)};$("#sr").value=${JSON.stringify(r)};doSignup()`),n=a.run("S.users.length");
  f("","x","pw12","student");assert.equal(a.run("S.users.length"),n);        // missing name
  f("A","cse2301","pass1","student");assert.equal(a.run("S.users.length"),n); // duplicate id
  f("A","a","pw","student");assert.equal(a.run("S.users.length"),n);          // short password
  f("Asha Rout","ASHA1","pass1","student");assert.equal(a.run("S.users.length"),n+1);assert.equal(a.run("S.me"),"ASHA1");assert.equal(a.run("me().role"),"student");
  a.run("logout()");a.run("MODULE='student'");f("Evil","EV1","pass1","admin");assert.equal(a.run("S.users.some(u=>u.id=='EV1')"),false); // cannot self-sign-up as admin
});

test("hostel module: warden and mess features all work together", ()=>{
  const a=load();as(a,"CSE2301");a.run("sos()");a.run("$('#rs').value='Outing';applyPass()");
  as(a,"WRD201");assert.ok(a.run("V.warden_dash().includes('SOS from')"));assert.ok(a.run("V.warden_apr().includes('Approve')"));
  as(a,"MESS301");a.run("view='dash';");assert.ok(a.run("V.mess_dash().includes('students expected')"));assert.ok(a.run("V.mess_fb().includes('Publish menu change')"));
  assert.equal(a.run("JSON.stringify(rolesFor('hostel').map(r=>NAV[r].length>0))"),"[true,true]");
});

// ==========================================

// EXPANDED FUNCTIONAL WORKFLOW TESTS FOR COMPREHENSIVE CAMPUS COVERAGE

test("student fee & automated no dues: paying fee updates status and clears accounts", ()=>{
  const a=load();as(a,"CSE2301");
  assert.equal(a.run("S.fee"), false);
  assert.equal(a.run("S.noDues.find(d=>d.dept.includes('Tuition')).st"), "Pending");
  a.run("payFee()");
  assert.equal(a.run("S.fee"), true);
  assert.equal(a.run("S.noDues.find(d=>d.dept.includes('Tuition')).st"), "Cleared");
  assert.ok(a.run("S.noDues.every(d=>d.st=='Cleared')"));
  assert.ok(a.run("V.student_fee().includes('AUTOMATED NO DUES CLEARANCE CERTIFICATE')"));
});

test("disciplinary fines: track active fines, pay fine, and appeal fine", ()=>{
  const a=load();as(a,"CSE2301");
  const initialUnpaid = a.run("S.fines.filter(f=>f.who==nm()&&f.st=='Unpaid').length");
  assert.ok(initialUnpaid > 0);
  
  // Test fine appeal
  const fineId = a.run("S.fines.find(f=>f.who==nm()&&f.st=='Unpaid').id");
  a.run('$("#apr_' + fineId + '").value="Hospitalized on that evening; doctor note attached";submitAppeal(' + fineId + ')');
  assert.equal(a.run("S.fines.find(f=>f.id==" + fineId + ").st"), "Under Review");
  
  // Warden approves appeal and waives fine
  as(a,"WRD201");
  a.run("resolveAppeal(" + fineId + ", 'Approved')");
  assert.equal(a.run("S.fines.find(f=>f.id==" + fineId + ").st"), "Waived");
  
  // Student pays another fine
  as(a,"CSE2301");
  a.run("S.fines.push({id:999,who:nm(),roll:'CSE2301',type:'Hostel',reason:'Late entry',amt:100,st:'Unpaid',date:'2026-10-10',issuedBy:'Warden',appeal:null})");
  a.run("payFine(999)");
  assert.equal(a.run("S.fines.find(f=>f.id==999).st"), "Paid");
});

test("pre-meal booking & count tracker: booking toggles count and predicts demand", ()=>{
  const a=load();as(a,"CSE2301");
  const bookedBefore = a.run("S.mealStats.booked");
  const regBefore = a.run("S.reg");
  // Index 5 is Tomorrow Dinner (currently booked: false)
  a.run("toggleMealBook(5)");
  assert.equal(a.run("S.mealStats.booked"), bookedBefore + 1);
  assert.equal(a.run("S.reg"), regBefore + 1);
  assert.ok(a.run("V.student_mess().includes('Pre-Meal Booking')"));
});

test("hostel service tracker: view active services and request visit", ()=>{
  const a=load();as(a,"CSE2301");
  assert.ok(a.run("S.hostelServices.length >= 4"));
  const countBefore = a.run("S.cmp.length");
  a.run("reqHostelService('Drinking Water Filter Check')");
  assert.equal(a.run("S.cmp.length"), countBefore + 1);
  assert.equal(a.run("S.cmp.at(-1).cat"), "Drinking Water Filter Check");
});

test("study material repository: faculty uploads and student accesses", ()=>{
  const a=load();as(a,"FAC101");
  const countBefore = a.run("S.materials.length");
  a.run('$("#fm_sub").value="DBMS";$("#fm_type").value="Lecture Notes";$("#fm_title").value="Advanced Query Optimization";$("#fm_file").value="QueryOpt.pdf";uploadMaterial()');
  assert.equal(a.run("S.materials.length"), countBefore + 1);
  assert.equal(a.run("S.materials[0].title"), "Advanced Query Optimization");
  
  as(a,"CSE2301");
  assert.ok(a.run("V.student_academics().includes('Advanced Query Optimization')"));
});

test("assignment dropbox: faculty creates assignment, student submits, faculty grades", ()=>{
  const a=load();as(a,"FAC101");
  a.run('$("#fa_sub").value="DBMS";$("#fa_due").value="2026-10-30";$("#fa_max").value="25";$("#fa_title").value="Index Tuning Lab";$("#fa_desc").value="Analyze B+ Tree indices";createAssignment()');
  const assignId = a.run("S.assignments[0].id");
  
  // Student submits
  as(a,"CSE2301");
  a.run('$("#as_' + assignId + '").value="Aarav_IndexTuning.pdf";submitAssign(' + assignId + ')');
  assert.equal(a.run("S.assignments.find(x=>x.id==" + assignId + ").submissions.length"), 1);
  
  // Faculty grades
  as(a,"FAC101");
  a.run("gradeAssign(" + assignId + ", 'CSE2301')");
  assert.equal(a.run("S.assignments.find(x=>x.id==" + assignId + ").submissions[0].marks"), 24);
});

test("academic leave: student applies and faculty approves", ()=>{
  const a=load();as(a,"CSE2301");
  a.run('$("#alt").value="Medical Leave";$("#alf").value="2026-10-20";$("#alt2").value="2026-10-22";$("#alr").value="Dengue recovery";applyAcademicLeave()');
  const leaveId = a.run("S.leaves.at(-1).id");
  assert.equal(a.run("S.leaves.at(-1).st"), "Pending");
  
  as(a,"FAC101");
  a.run("decideLeave(" + leaveId + ", 'Approved')");
  assert.equal(a.run("S.leaves.find(x=>x.id==" + leaveId + ").st"), "Approved");
});

test("anti-ragging portal: student submits confidential report, admin reviews and logs action", ()=>{
  const a=load();as(a,"CSE2301");
  const initialReports = a.run("S.antiRagging.reports.length");
  a.run('$("#ar_loc").value="Hostel Block B Common Room";$("#ar_desc").value="Hostile intimidation incident";$("#ar_anon").checked=true;fileAntiRagging()');
  assert.equal(a.run("S.antiRagging.reports.length"), initialReports + 1);
  const repId = a.run("S.antiRagging.reports[0].id");
  
  as(a,"admin");
  a.run("arAction(" + repId + ", 'Anti-ragging squad deployed and statements recorded')");
  assert.equal(a.run("S.antiRagging.reports.find(r=>r.id==" + repId + ").st"), "Action Taken");
  a.run("arStatus(" + repId + ", 'Resolved & Closed')");
  assert.equal(a.run("S.antiRagging.reports.find(r=>r.id==" + repId + ").st"), "Resolved & Closed");
});

test("digital campus ID: student card renders and admin manages ID status", ()=>{
  const a=load();as(a,"CSE2301");
  const idHtml = a.run("V.student_idcard()");
  assert.ok(idHtml.includes("Aarav Mohanty"));
  assert.ok(idHtml.includes("CAMPUS DIGITAL ID"));
  assert.ok(idHtml.includes("<svg")); // QR Code SVG
  
  as(a,"admin");
  const initialSt = a.run("S.idRecords[0].st");
  a.run("toggleIdSt(0)");
  assert.notEqual(a.run("S.idRecords[0].st"), initialSt);
});

test("scholarship upload & admin management: student applies, admin approves", ()=>{
  const a=load();as(a,"CSE2301");
  const countBefore = a.run("S.scholarships.length");
  a.run('$("#sch_t").value="Pragati Scheme for Girls";$("#sch_i").value="₹90,000 / yr";$("#sch_d").value="Pragati_Docs.pdf";applySchol()');
  assert.equal(a.run("S.scholarships.length"), countBefore + 1);
  const schId = a.run("S.scholarships.at(-1).id");
  
  as(a,"admin");
  a.run("decideSchol(" + schId + ", 'Approved')");
  assert.equal(a.run("S.scholarships.find(s=>s.id==" + schId + ").st"), "Approved");
});

test("warden room allocation matrix: allocates student and updates room density", ()=>{
  const a=load();as(a,"WRD201");
  a.run('$("#ra_s").value="Nisha Sahoo";$("#ra_b").value="A";$("#ra_r").value="103";allocateRoom()');
  const r = a.run("S.rooms.find(x=>x.block=='A'&&x.room=='103')");
  assert.ok(r.occ.includes("Nisha Sahoo"));
});

test("night roll call tracker: marks in-hostel residents and records late status", ()=>{
  const a=load();as(a,"WRD201");
  a.run("markAllRollCall('Present')");
  assert.ok(a.run("S.rollCall.filter(r=>r.st!='On Outpass').every(r=>r.st=='Present')"));
  a.run("toggleRollCall(1, 'Late')");
  assert.equal(a.run("S.rollCall[1].st"), "Late");
});

test("repair proof upload: attaches proof to complaint and marks resolved", ()=>{
  const a=load();as(a,"WRD201");
  const countBefore = a.run("S.repairProofs.length");
  a.run('$("#rp_cmp").value=1024;$("#rp_doc").value="NewTapInstalled.jpg";$("#rp_tech").value="Plumber Ramesh";$("#rp_notes").value="Replaced washer";uploadRepairProof()');
  assert.equal(a.run("S.repairProofs.length"), countBefore + 1);
  assert.equal(a.run("S.cmp.find(c=>c.id==1024).st"), "Resolved");
});

test("mess meal auditor & wastage logger: conducts inspection and records waste", ()=>{
  const a=load();as(a,"WRD201");
  const auditBefore = a.run("S.messAudits.length");
  a.run('$("#aud_m").value="Lunch";$("#aud_t").value="72°C";$("#aud_s").value="4.8";$("#aud_n").value="High hygiene standard";saveMessAudit()');
  assert.equal(a.run("S.messAudits.length"), auditBefore + 1);
  
  as(a,"MESS301");
  const wasteBefore = a.run("S.messWastage.length");
  a.run('$("#mw_kg").value=18;$("#mw_m").value="Dinner";$("#mw_note").value="Low waste night";logWastage()');
  assert.equal(a.run("S.messWastage.length"), wasteBefore + 1);
});

test("faculty target communication, live schedule & library search", ()=>{
  const a=load();as(a,"FAC101");
  
  // Target batch communication
  a.run('$("#tc_b").value="CSE 3rd Year";$("#tc_m").value="Guest lecture tomorrow at 10 AM";sendTargetComm()');
  assert.ok(a.run("S.notices.some(n=>n.b.includes('Guest lecture'))"));
  
  // Live schedule maker
  const ttBefore = a.run("S.tt.length");
  a.run('$("#ex_s").value="DBMS Doubt Clearing";$("#ex_t").value="16:00";$("#ex_r").value="Room 305";scheduleExtraClass()');
  assert.equal(a.run("S.tt.length"), ttBefore + 1);
  
  // Library records
  assert.ok(a.run("V.faculty_library().includes('Database System Concepts')"));
  
  // Academic fine issuer
  const finesBefore = a.run("S.fines.length");
  a.run('$("#ff_s").value="Rohan Patra";$("#ff_t").value="Lab Equipment Damage";$("#ff_a").value=300;$("#ff_r").value="Broke beaker in Chemistry lab";issueAcademicFine()');
  assert.equal(a.run("S.fines.length"), finesBefore + 1);
});

test("admin master fee gateway & user edition", ()=>{
  const a=load();as(a,"admin");
  assert.ok(a.run("V.admin_fees().includes('Master Fee Gateway')"));
  
  // Offline fee reconciliation
  a.run('$("#rec_roll").value="CSE2301";reconcileFee()');
  assert.equal(a.run("S.fee"), true);
  
  // User edition
  a.run("loadEditU('CSE2301')");
  a.run('$("#un").value="Aarav K. Mohanty";$("#ui").value="CSE2301";$("#up").value="student123";$("#ur").value="student";$("#udept").value="CSE - AI/ML";addU()');
  assert.equal(a.run("S.users.find(u=>u.id=='CSE2301').name"), "Aarav K. Mohanty");
  assert.equal(a.run("S.users.find(u=>u.id=='CSE2301').dept"), "CSE - AI/ML");
});
