const $$=(s,root=document)=>[...root.querySelectorAll(s)];
const $=(s,root=document)=>root.querySelector(s);

const caseData=[
 {no:"CASE 001",type:"PROJECT",title:"Enterprise LLM Security Evaluation Framework",
  intro:"A reusable Python security-testing framework for LLM applications, based directly on the project evidence in the attached resume.",
  sections:[
   ["01 — PROBLEM","Reusable adversarial security evaluation was needed for LLM applications, including repeatable test execution and evidence capture."],
   ["02 — THREAT / RISK","Direct and indirect prompt injection, jailbreaks, sensitive-information disclosure and unsafe model outputs."],
   ["03 — APPROACH","Python test harnesses generate structured adversarial cases, execute evaluations and capture prompts, responses, application behavior and security-control results."],
   ["04 — SECURITY EVIDENCE","Findings are analyzed as model behavior, application behavior, control results and potential attack paths; selected scenarios are mapped to MITRE ATLAS."],
   ["05 — REGRESSION","Regression tests detect recurrence after prompt, model, application or guardrail changes."],
   ["06 — TOOLING","Python · PyRIT · TextAttack · MITRE ATLAS · FastAPI"],
   ["07 — STATUS","Project work documented in the attached resume. This portfolio does not imply a specific production deployment beyond the stated project evidence."],
   ["08 — LESSON","Security evidence becomes more useful when attack assumptions, observations and defensive measures are recorded alongside the test result."]
 ]},
 {no:"CASE 002",type:"LAB",title:"Secure RAG & Agent Security Lab",
  intro:"An isolated environment for studying retrieval, context-handling and agent-execution security.",
  sections:[
   ["01 — SURFACE","Retrieval, context, agent execution, tool boundaries and MCP-connected actions."],
   ["02 — RAG TESTS","Malicious documents, context poisoning, retrieval manipulation and unauthorized retrieval scenarios."],
   ["03 — AUTHORIZATION","Document-level access checks and metadata-based filtering to validate retrieval authorization behavior."],
   ["04 — AGENT TESTS","Excessive agency, unauthorized tool execution and malicious tool inputs across agent workflows."],
   ["05 — MCP","MCP-connected tool boundaries, authorization controls and controlled execution of downstream enterprise actions."],
   ["06 — HUMAN APPROVAL","High-impact agent actions are tested against human-approval controls."],
   ["07 — OBSERVABILITY","Audit logging covers retrieval activity, agent decisions and downstream tool calls."],
   ["08 — TOOLING","Python · LangGraph · RAG · Vector Search · MCP · Docker"]
 ]},
 {no:"CASE 003",type:"LAB",title:"Adversarial ML Evaluation",
  intro:"Controlled experiments used to understand model robustness and adversarial machine-learning techniques.",
  sections:[
   ["01 — ROBUSTNESS","Model behavior is evaluated under controlled adversarial conditions."],
   ["02 — EVASION","Adversarial examples are implemented and model behavior is observed under controlled evasion conditions."],
   ["03 — POISONING","Controlled data-poisoning scenarios are simulated to examine robustness and adversarial-input detection behavior."],
   ["04 — ADDITIONAL ATTACKS","Model extraction, model inversion and membership-inference concepts are studied in isolated environments."],
   ["05 — STACK","Python · PyTorch · IBM Adversarial Robustness Toolbox (ART)"],
   ["06 — EVIDENCE","Attack assumptions, observations, defensive measures, evaluation results and limitations are documented."],
   ["07 — BOUNDARY","This is explicitly described in the resume as controlled experimentation, not represented here as production exploitation."],
   ["08 — PURPOSE","Use experimentation to connect adversarial technique, measurable behavior and defensive reasoning."]
 ]}
];

const modeData={
 red:{
  label:"RED TEAM",
  intro:"Security concepts shown as adversarial lenses. These are conceptual unless explicitly supported by the project or experience evidence.",
  items:["Prompt injection","Indirect prompt injection","Jailbreaks","Sensitive-information disclosure","Context poisoning","Retrieval manipulation","Unauthorized retrieval","Excessive agency","Agent hijacking","Malicious tool inputs"]
 },
 blue:{
  label:"BLUE TEAM",
  intro:"Security concepts shown as defensive lenses, aligned to the controls and validation areas documented in the resume.",
  items:["Security validation","Input validation","Access boundaries","Document authorization","Tool authorization","Human approval","Guardrails","Security regression testing","Logging / telemetry","Pre-deployment validation"]
 }
};

const archData=[
 {id:"user",x:10,y:42,title:"USER",role:"Entry boundary",text:"The external actor or user request enters the AI application.",meta:"CONCEPTUAL NODE"},
 {id:"app",x:31,y:22,title:"APPLICATION",role:"Application layer",text:"Request handling, authentication, authorization and API communication form part of the documented application-security background.",meta:"RESUME: API SECURITY"},
 {id:"orchestrator",x:55,y:10,title:"AI ORCHESTRATION",role:"Workflow layer",text:"Agent and multi-step workflow execution can be examined for state, routing, tool permissions and human approval.",meta:"RESUME: AI AGENTS"},
 {id:"model",x:72,y:42,title:"LLM / MODEL",role:"Model layer",text:"Model behavior is evaluated for prompt injection, jailbreaks, disclosure and unsafe outputs.",meta:"RESUME: LLM SECURITY"},
 {id:"rag",x:52,y:68,title:"RAG / KNOWLEDGE",role:"Context layer",text:"Retrieved content can be tested for malicious documents, context poisoning, retrieval manipulation and authorization.",meta:"RESUME: RAG SECURITY"},
 {id:"tools",x:77,y:72,title:"TOOLS / APIs",role:"Action layer",text:"Tool authorization, unsafe invocation and MCP permission boundaries are documented security test areas.",meta:"RESUME: AGENT + MCP SECURITY"},
 {id:"data",x:28,y:82,title:"DATA",role:"Data layer",text:"Data-processing pipelines, sensitive-data handling and training-data security form part of the documented security scope.",meta:"RESUME: DATA SECURITY"}
];

const labData={
 threat:{no:"01",title:"Threat model first.",text:"Start by defining what can be trusted, what is untrusted, what the system can access, and what an attacker could influence.",nodes:[["TRUST","Define boundaries"],["INPUT","Untrusted content"],["ACTION","What can happen?"]]},
 surface:{no:"02",title:"Map the attack surface.",text:"Inspect the places where model input, retrieved context, memory, tools, APIs, data and permissions meet.",nodes:[["PROMPT","Instruction layer"],["RAG","Context layer"],["TOOLS","Action layer"],["DATA","Sensitive layer"]]},
 system:{no:"03",title:"Trace the AI system.",text:"Follow the request through the application, model, retrieval layer and action layer so each transition has an explicit boundary.",nodes:[["REQUEST","→"],["APP","→"],["MODEL","→"],["TOOLS","→"]]},
 defense:{no:"04",title:"Place controls at boundaries.",text:"Validate inputs, constrain permissions, authorize retrieval, require approval where appropriate, and observe the security-relevant path.",nodes:[["VALIDATE","Input"],["AUTHORIZE","Access"],["APPROVE","High impact"],["LOG","Evidence"]]},
 output:{no:"05",title:"Secure output — then retest.",text:"A secure result is not only a response; it is a tested behavior with evidence, regression coverage and clear limitations.",nodes:[["OUTPUT","Controlled"],["EVIDENCE","Captured"],["REGRESSION","Retested"]]}
};

const threatFlow={
 prompt:["INPUT","Normalize / validate","Policy check","Model context","Tool permission","EXECUTE / BLOCK","Log + retest"],
 retrieval:["REQUEST","Authorize source","Retrieve","Inspect context","Policy / grounding","USE / BLOCK","Log + retest"],
 tool:["TOOL INPUT","Validate schema","Authorize action","Context check","Human approval*","EXECUTE / BLOCK","Log + retest"],
 memory:["CONTEXT","Validate source","Separate trust","Limit scope","Policy check","USE / BLOCK","Log + retest"]
};

function renderLab(key){
 const d=labData[key];
 $("#labNo").textContent=d.no; $("#labTitle").textContent=d.title; $("#labText").textContent=d.text;
 $("#labDiagram").innerHTML=d.nodes.map((n,i)=>`<div class="lab-node"><b>${n[0]}</b><span>${n[1]}</span></div>${i<d.nodes.length-1?'<div class="lab-arrow">→</div>':''}`).join("");
 $$(".lab-step").forEach(b=>b.classList.toggle("active",b.dataset.lab===key));
}
$$(".lab-step").forEach(b=>b.addEventListener("click",()=>renderLab(b.dataset.lab)));
renderLab("threat");

function renderMode(mode){
 const d=modeData[mode];
 $("#modePanel").innerHTML=`<div class="mode-col"><h3>${d.label} / ${mode==="red"?"ADVERSARIAL LENS":"DEFENSIVE LENS"}</h3><p>${d.intro}</p>${d.items.map((x,i)=>`<span class="mode-item">${String(i+1).padStart(2,"0")} &nbsp; ${x}</span>`).join("")}</div>
 <div class="mode-col"><h3>BOUNDARY NOTE</h3><p>${mode==="red"?"Attack-oriented labels such as prompt injection, context poisoning and tool abuse are security concepts unless backed by an explicit project/experience statement.":"Controls such as authorization, human approval, guardrails, logging and regression testing are shown because related activities are documented in the resume."}</p>
 <div class="mode-item">SOURCE: ATTACHED RESUME</div><div class="mode-item">LABELING: EXPERIENCE vs CONCEPT</div><div class="mode-item">PRINCIPLE: NO FABRICATED CLAIMS</div></div>`;
}
$$(".mode-btn").forEach(b=>b.addEventListener("click",()=>{
 $$(".mode-btn").forEach(x=>{x.classList.remove("active");x.setAttribute("aria-selected","false")});
 b.classList.add("active");b.setAttribute("aria-selected","true");renderMode(b.dataset.mode)
}));
renderMode("red");

function renderArch(){
 const c=$("#archCanvas"); c.innerHTML="";
 const pos={};
 archData.forEach(n=>{
  const e=document.createElement("button");e.className="arch-node";e.type="button";e.dataset.id=n.id;
  e.style.left=n.x+"%";e.style.top=n.y+"%";e.innerHTML=`<span>${n.role.toUpperCase()}</span><b>${n.title}</b>`;
  e.addEventListener("click",()=>selectArch(n.id)); c.appendChild(e);pos[n.id]=n;
 });
 const links=[["user","app"],["app","orchestrator"],["orchestrator","model"],["model","rag"],["rag","tools"],["app","data"]];
 links.forEach(([a,b])=>{
  const A=pos[a],B=pos[b];const dx=B.x-A.x,dy=B.y-A.y,len=Math.sqrt(dx*dx+dy*dy);
  const l=document.createElement("div");l.className="arch-link";l.style.left=A.x+"%";l.style.top=A.y+"%";l.style.width=len*0.92+"%";l.style.transform=`rotate(${Math.atan2(dy,dx)}rad)`;c.appendChild(l);
 });
}
function selectArch(id){
 const n=archData.find(x=>x.id===id); if(!n)return;
 $$(".arch-node").forEach(x=>x.classList.toggle("active",x.dataset.id===id));
 $("#archTitle").textContent=n.title;$("#archText").textContent=n.text;$("#archMeta").textContent=n.meta;
}
renderArch();

function renderThinking(key){
 const labels=threatFlow[key];
 $("#thinkingFlow").innerHTML=labels.map((x,i)=>`<div class="flow-step"><div class="n">${String(i+1).padStart(2,"0")}</div><h4>${x}</h4><p>${i===0?"Untrusted or security-sensitive input enters the flow.":i===labels.length-2?"Decision point: allow the action only when the relevant policy permits it.":"Inspect, constrain and record the transition."}</p></div>`).join("");
}
$$(".threat-choice").forEach(b=>b.addEventListener("click",()=>{$$(".threat-choice").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderThinking(b.dataset.threat)}));
renderThinking("prompt");

const skills=[
 ["AI / ML","Machine Learning","Foundation","Personal — resume skills"],
 ["AI / ML","Deep Learning","Foundation","Personal — resume skills"],
 ["AI / ML","LLMs","Foundation","Personal — resume skills"],
 ["AI / ML","PyTorch","Tooling","Personal — resume skills"],
 ["AI / ML","LangChain","Framework","Personal — resume skills"],
 ["AI / ML","LangGraph","Framework","Personal — resume skills"],
 ["AI / ML","RAG","Architecture","Personal — resume skills"],
 ["AI / ML","Embeddings","Retrieval","Personal — resume skills"],
 ["AI / ML","Vector Search","Retrieval","Personal — resume skills"],
 ["AI / ML","AI Agents","Agents","Personal — resume skills"],
 ["AI / ML","Multi-Agent Systems","Agents","Personal — resume skills"],
 ["Security","AI Security Evaluation","AI Security","Personal — resume expertise"],
 ["Security","Adversarial Testing","AI Security","Personal — resume expertise"],
 ["Security","AI Red Teaming","AI Security","Personal — resume expertise"],
 ["Security","AI Threat Modeling","Security","Personal — resume expertise"],
 ["Security","Prompt Injection","LLM Security","Personal — resume expertise"],
 ["Security","Indirect Prompt Injection","LLM Security","Personal — resume expertise"],
 ["Security","Jailbreaks","LLM Security","Personal — resume expertise"],
 ["Security","Sensitive Information Disclosure","LLM Security","Personal — resume expertise"],
 ["Security","System Prompt Leakage","LLM Security","Personal — resume expertise"],
 ["Security","Insecure Output Handling","LLM Security","Personal — resume expertise"],
 ["Security","Excessive Agency","Agent Security","Personal — resume expertise"],
 ["Security","Data Exfiltration","LLM Security","Personal — resume expertise"],
 ["Security","Context Poisoning","RAG Security","Personal — resume expertise"],
 ["Security","Document Authorization","RAG Security","Personal — resume expertise"],
 ["Security","Tool Authorization","Agent Security","Personal — resume expertise"],
 ["Security","Agent Hijacking","Agent Security","Personal — resume expertise"],
 ["Security","Memory Security","Agent Security","Personal — resume expertise"],
 ["Security","MCP Security","Agent Security","Personal — resume expertise"],
 ["Security","Evasion","Adversarial ML","Personal — resume expertise"],
 ["Security","Data Poisoning","Adversarial ML","Personal — resume expertise"],
 ["Security","Model Extraction","Adversarial ML","Personal — resume expertise"],
 ["Security","Model Inversion","Adversarial ML","Personal — resume expertise"],
 ["Security","Membership Inference","Adversarial ML","Personal — resume expertise"],
 ["Security","API Security","Application Security","Personal — resume skills"],
 ["Security","Authentication","Application Security","Personal — resume skills"],
 ["Security","Authorization","Application Security","Personal — resume skills"],
 ["Security","OAuth 2.0","Identity","Personal — resume skills"],
 ["Security","OIDC","Identity","Personal — resume skills"],
 ["Security","RBAC","Identity","Personal — resume skills"],
 ["Engineering","Python","Programming","Personal — resume skills"],
 ["Engineering","SQL","Programming","Personal — resume skills"],
 ["Engineering","Bash","Programming","Personal — resume skills"],
 ["Engineering","FastAPI","Backend","Personal — project skills"],
 ["Engineering","REST APIs","Backend","Personal — resume skills"],
 ["Engineering","Docker","Platform","Personal — resume skills"],
 ["Engineering","Azure","Cloud / Platform","Personal — resume skills"],
 ["Engineering","Git","DevSecOps","Personal — resume skills"],
 ["Engineering","Jenkins","DevSecOps","Personal — resume skills"],
 ["Engineering","CI/CD","DevSecOps","Personal — resume expertise"],
 ["Engineering","SAST","DevSecOps","Personal — resume skills"],
 ["Engineering","Dependency Scanning","DevSecOps","Personal — resume skills"],
 ["Engineering","Secrets Management","Platform Security","Personal — resume skills"],
 ["Engineering","Logging","Observability","Personal — resume skills"],
 ["Engineering","Monitoring","Observability","Personal — resume skills"]
];

let skillFilter="ALL";
const categories=["ALL",...new Set(skills.map(s=>s[0]))];
$("#skillFilters").innerHTML=categories.map(c=>`<button class="skill-filter ${c==="ALL"?"active":""}" data-cat="${c}">${c}</button>`).join("");
function renderSkills(){
 const data=skills.filter(s=>skillFilter==="ALL"||s[0]===skillFilter);
 $("#skillGrid").innerHTML=data.map((s,i)=>`<button class="skill ${s[3].startsWith("Personal")?"evidence":""}" type="button" title="${s[3]}"><small>${s[0]} / ${s[2]}</small><h3>${s[1]}</h3><p>${s[3]}</p></button>`).join("");
}
$$(".skill-filter").forEach(b=>b.addEventListener("click",()=>{$$(".skill-filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");skillFilter=b.dataset.cat;renderSkills()}));
renderSkills();

$$(".time-entry").forEach(b=>b.addEventListener("click",()=>b.classList.toggle("open")));

function openCase(i){
 const d=caseData[i];$("#modalCase").textContent=d.no;$("#modalType").textContent=d.type;$("#modalTitle").textContent=d.title;$("#modalIntro").textContent=d.intro;
 $("#modalBody").innerHTML=d.sections.map(s=>`<div class="case-section"><strong>${s[0]}</strong><p>${s[1]}</p></div>`).join("");
 const m=$("#caseModal");m.classList.add("open");m.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";$(".modal-close").focus();
}
function closeCase(){const m=$("#caseModal");m.classList.remove("open");m.setAttribute("aria-hidden","true");document.body.style.overflow=""}
$$(".case-open").forEach((b,i)=>b.addEventListener("click",e=>{e.stopPropagation();openCase(i)}));
$$(".case").forEach((c,i)=>c.addEventListener("click",e=>{if(e.target.closest("button"))return;openCase(i)}));
$$("[data-close]").forEach(x=>x.addEventListener("click",closeCase));
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeCase();$("#scanOverlay").classList.remove("open")}});
$$(".case").forEach(c=>c.addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&!e.target.closest("button")){e.preventDefault();openCase(Number(c.dataset.case))}}));

$("#scanBtn").addEventListener("click",()=>{
 const o=$("#scanOverlay"),lines=$("#scanLines"),final=$("#scanFinal");o.classList.add("open");final.style.opacity="0";
 const labels=["SYSTEM","AI SECURITY","ATTACK SURFACE","ARCHITECTURE","PROJECTS","DEFENSE","STATUS"];
 lines.innerHTML="";
 labels.forEach((x,i)=>setTimeout(()=>{const r=document.createElement("div");r.className="scan-row";r.innerHTML=`<span>${x}</span><i>${i===labels.length-1?"READY":"ANALYZED"}</i>`;lines.appendChild(r)},i*250));
 setTimeout(()=>{final.style.opacity="1"},labels.length*250+120)
});
$("#scanOverlay").addEventListener("click",e=>{if(e.target.id==="scanOverlay")e.currentTarget.classList.remove("open")});

const progress=$("#progress");
const setProgress=()=>{const d=document.documentElement;progress.style.width=(d.scrollTop/(d.scrollHeight-d.clientHeight)*100)+"%"};addEventListener("scroll",setProgress,{passive:true});setProgress();

const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});
$$(".reveal").forEach(e=>io.observe(e));

const spot=$("#spotlight");
addEventListener("pointermove",e=>{spot.style.left=e.clientX+"px";spot.style.top=e.clientY+"px"},{passive:true});

$$("[data-tilt]").forEach(el=>el.addEventListener("pointermove",e=>{
 if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
 const r=el.getBoundingClientRect(),rx=((e.clientY-r.top)/r.height-.5)*-4,ry=((e.clientX-r.left)/r.width-.5)*4;
 el.style.transform=`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
}));
$$("[data-tilt]").forEach(el=>el.addEventListener("pointerleave",()=>el.style.transform=""));

window.addEventListener("load",()=>setTimeout(()=>$$(".reveal").forEach(x=>x.classList.add("visible")),450));

/* Lightweight anti-fake helper: no claims are generated dynamically. */
