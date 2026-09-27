/* ---------------- Data ---------------- */
const DAYS = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];

const faculty = {
  math: {name:"Dr. A. Sharma", room:"Room 204", email:"a.sharma@campus.edu"},
  physics: {name:"Dr. R. Verma", room:"Room 210", email:"r.verma@campus.edu"},
  chemistry: {name:"Dr. S. Iyer", room:"Room 118", email:"s.iyer@campus.edu"},
  cs: {name:"Prof. N. Rao", room:"Room 305", email:"n.rao@campus.edu"},
  electronics: {name:"Dr. K. Menon", room:"Room 220", email:"k.menon@campus.edu"},
  english: {name:"Ms. P. Nair", room:"Room 101", email:"p.nair@campus.edu"},
};

const timetable = {
  monday: ["09:00 - Math","10:00 - Physics","11:00 - CS Lab","13:00 - English"],
  tuesday: ["09:00 - Chemistry","10:00 - Math","11:00 - Electronics","13:00 - CS"],
  wednesday: ["09:00 - CS","10:00 - Physics Lab","12:00 - Workshop"],
  thursday: ["09:00 - Math","10:00 - English","11:00 - CS","13:00 - Elective"],
  friday: ["09:00 - Electronics","10:00 - CS Lab","12:00 - Seminar"],
  saturday: ["09:00 - Sports","10:00 - Club Activities"],
  sunday: ["No classes - Holiday"],
};

const canteenMenu = {
  monday:"Poha, Sandwich, Veg Thali, Cold Coffee",
  tuesday:"Idli-Sambhar, Pasta, Veg Thali, Lassi",
  wednesday:"Paratha, Noodles, Veg Thali, Tea/Coffee",
  thursday:"Upma, Burger, Veg Thali, Milkshake",
  friday:"Dosa, Pizza Slice, Veg Thali, Juice",
  saturday:"Puri-Bhaji, Sandwich, Special Thali",
  sunday:"Canteen Closed",
};

const events = [
  {date:"2026-10-10", title:"Tech Fest 'Innovate 2026' at Main Auditorium"},
  {date:"2026-10-15", title:"Guest Lecture on AI Ethics, 3 PM, Seminar Hall"},
  {date:"2026-10-20", title:"Inter-college Sports Meet"},
  {date:"2026-10-25", title:"Cultural Night at Open Air Theatre"},
];

const notices = [
  {date:"2026-09-25", tag:"Exams", title:"Mid-semester exam datesheet released"},
  {date:"2026-09-24", tag:"Library", title:"Extended library hours during exam week"},
  {date:"2026-09-20", tag:"Hostel", title:"Water supply maintenance on Sept 28"},
  {date:"2026-09-18", tag:"Fees", title:"Fee payment deadline extended to Oct 5"},
  {date:"2026-09-15", tag:"IT", title:"New WiFi network 'Campus-WiFi-5G' now live"},
];

const faqs = {
  library:"The library is open from 8:00 AM to 8:00 PM, Monday to Saturday.",
  fee:"Fees can be paid online via the campus portal under 'Payments' or at the Accounts Office (Room 5, Admin Block).",
  wifi:"Connect to 'Campus-WiFi', login with your student ID and default password 'campus@123' (change it after first login).",
  "id card":"Lost ID cards can be reissued at the Admin Office by submitting a written request and a passport photo.",
  hostel:"Hostel enquiries are handled by the Warden's Office, Block C, open 9 AM - 5 PM on weekdays.",
};

/* ---------------- State ---------------- */
let studentName = "Student";
let pendingContext = null;
let complaintCategory = null;

function loadName(){
  try{ return localStorage.getItem("campus_student_name") || "Student"; }catch(e){ return "Student"; }
}
function saveName(name){
  try{ localStorage.setItem("campus_student_name", name); }catch(e){}
}
function loadComplaints(){
  try{ return JSON.parse(localStorage.getItem("campus_complaints") || "[]"); }catch(e){ return []; }
}
function saveComplaint(c){
  try{
    const list = loadComplaints();
    list.push(c);
    localStorage.setItem("campus_complaints", JSON.stringify(list));
  }catch(e){}
}

/* ---------------- Assistant logic ---------------- */
function extractDay(text){ return DAYS.find(d => text.includes(d)) || null; }
function todayName(){ return new Date().toLocaleDateString("en-US",{weekday:"long"}).toLowerCase(); }
function cap(s){ return s.charAt(0).toUpperCase() + s.slice(1); }

function getResponse(raw){
  const text = raw.toLowerCase().trim().replace(/[^a-z0-9\s]/g,"");

  if(pendingContext === "await_subject"){
    pendingContext = null;
    const subj = Object.keys(faculty).find(s => text.includes(s));
    if(subj){ const f = faculty[subj]; return `${cap(subj)} Faculty: ${f.name} - ${f.room} - ${f.email}`; }
    return "I still couldn't find that subject. Try: math, physics, chemistry, cs, electronics, english.";
  }
  if(pendingContext === "await_complaint_category"){
    complaintCategory = raw.trim().replace(/\b\w/g, c => c.toUpperCase());
    pendingContext = "await_complaint_message";
    return `Got it (${complaintCategory}). Please describe the issue in one line.`;
  }
  if(pendingContext === "await_complaint_message"){
    saveComplaint({student:studentName, category:complaintCategory, message:raw.trim(), time:new Date().toISOString()});
    pendingContext = null;
    const cat = complaintCategory; complaintCategory = null;
    return `Your ${cat} complaint has been logged. The concerned office will reach out soon.`;
  }

  if(/\b(hi|hello|hey)\b/.test(text)) return `Hello ${studentName}! Type 'help' to see what I can do.`;
  if(/\b(bye|exit|quit)\b/.test(text)) return "__EXIT__";
  if(/(timetable|schedule|classes)/.test(text)){
    const day = extractDay(text) || todayName();
    const rows = timetable[day];
    return rows ? `Timetable for ${cap(day)}:\n  - ${rows.join("\n  - ")}` : "No timetable data for that day.";
  }
  if(/(faculty|teacher|professor|subject)/.test(text) || Object.keys(faculty).some(s=>text.includes(s))){
    const subj = Object.keys(faculty).find(s => text.includes(s));
    if(subj){ const f = faculty[subj]; return `${cap(subj)} Faculty: ${f.name} - ${f.room} - ${f.email}`; }
    pendingContext = "await_subject";
    return `Which subject? (${Object.keys(faculty).join(", ")})`;
  }
  if(/(notice|notices)/.test(text))
    return "Latest Notices:\n  - " + notices.map(n => `[${n.tag}] ${n.title}`).join("\n  - ");
  if(/(event|events|fest)/.test(text))
    return "Upcoming Campus Events:\n  - " + events.map(e => `${e.date} - ${e.title}`).join("\n  - ");
  if(/(canteen|menu|food)/.test(text)){
    const day = extractDay(text) || todayName();
    return `Canteen Menu for ${cap(day)}: ${canteenMenu[day]}`;
  }
  if(/library/.test(text)) return faqs.library;
  if(/(fee|payment)/.test(text)) return faqs.fee;
  if(/(wifi|internet)/.test(text)) return faqs.wifi;
  if(/(id ?card)/.test(text)) return faqs["id card"];
  if(/hostel/.test(text)) return faqs.hostel;
  if(/(complaint|complain|issue|problem)/.test(text)){
    pendingContext = "await_complaint_category";
    return "Sorry to hear that. What category is this? (hostel, academic, canteen, wifi, other)";
  }
  if(/(help|options|menu)/.test(text))
    return "Ask me about: timetable, faculty, notices, events, canteen, library, fee, wifi, id card, hostel, or complaint.";

  return "Sorry, I didn't understand that. Try 'help' to see what I can assist you with.";
}

/* ---------------- Chat UI ---------------- */
function appendMsg(text, cls){
  const box = document.getElementById("messages");
  const div = document.createElement("div");
  div.className = "msg " + cls;
  div.textContent = text;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}
function userSay(text){ appendMsg(studentName + ": " + text, "user"); }
function botSay(text){ appendMsg("Assistant: " + text, "bot"); }

function handleInput(text){
  if(!text.trim()) return;
  userSay(text);
  const resp = getResponse(text);
  if(resp === "__EXIT__"){
    botSay("Goodbye! Have a great day on campus.");
    document.getElementById("userInput").disabled = true;
    return;
  }
  botSay(resp);
}

function sendFromMainInput(){
  const input = document.getElementById("userInput");
  const text = input.value;
  input.value = "";
  handleInput(text);
}

/* ---------------- View switching ---------------- */
function showView(name){
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  document.getElementById("view-" + name)?.classList.add("active");
  document.querySelectorAll(".nav-item").forEach(b => b.classList.toggle("active", b.dataset.view === name));
  document.getElementById("sidebar").classList.remove("open");
  document.getElementById("overlay").classList.remove("show");
  if(name === "assistant") document.getElementById("userInput")?.focus();
}

/* ---------------- Renderers ---------------- */
function renderDashboard(){
  document.getElementById("welcomeName").textContent = studentName;
  document.getElementById("userNameChip").textContent = studentName;
  document.getElementById("cardNotices").textContent = `${notices.length} New Notices`;
  document.getElementById("cardEvents").textContent = `${events.length} Upcoming Events`;
  const today = todayName();
  document.getElementById("cardTimetable").textContent = `${(timetable[today]||[]).length} Classes Today`;
}

function renderNotices(){
  const box = document.getElementById("noticesList");
  box.innerHTML = notices.map(n => `
    <div class="list-row">
      <span class="tag">${n.tag}</span>
      <div class="title">${n.title}</div>
      <div class="meta">${n.date}</div>
    </div>`).join("");
}

function renderEvents(){
  const box = document.getElementById("eventsList");
  box.innerHTML = events.map(e => `
    <div class="list-row">
      <div class="title">${e.title}</div>
      <div class="meta">${e.date}</div>
    </div>`).join("");
}

function renderTimetable(day){
  const tabs = document.getElementById("dayTabs");
  if(!tabs.dataset.built){
    tabs.innerHTML = DAYS.map(d => `<button data-day="${d}">${cap(d)}</button>`).join("");
    tabs.dataset.built = "1";
    tabs.addEventListener("click", e => {
      const btn = e.target.closest("button[data-day]");
      if(btn) renderTimetable(btn.dataset.day);
    });
  }
  const activeDay = day || todayName();
  tabs.querySelectorAll("button").forEach(b => b.classList.toggle("active", b.dataset.day === activeDay));
  const list = document.getElementById("timetableList");
  const rows = timetable[activeDay] || [];
  list.innerHTML = rows.map(r => `<div class="list-row">${r}</div>`).join("") ||
    `<div class="list-row">No classes.</div>`;
}

function renderFaculty(){
  const grid = document.getElementById("facultyGrid");
  grid.innerHTML = Object.entries(faculty).map(([subject, f]) => `
    <div class="faculty-card">
      <div class="subject">${cap(subject)}</div>
      <h3>${f.name}</h3>
      <div class="meta">${f.room}<br>${f.email}</div>
    </div>`).join("");
}

/* ---------------- Init ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  studentName = loadName();
  document.getElementById("nameInput").value = studentName === "Student" ? "" : studentName;

  renderDashboard();
  renderNotices();
  renderEvents();
  renderTimetable();
  renderFaculty();
  botSay(`Hello ${studentName}! I'm your Campus Assistant. Type 'help' to see what I can do.`);

  // Sidebar nav
  document.querySelectorAll(".nav-item").forEach(btn => {
    btn.addEventListener("click", () => showView(btn.dataset.view));
  });
  // Dashboard cards
  document.querySelectorAll(".info-card").forEach(card => {
    card.addEventListener("click", () => showView(card.dataset.goto));
  });

  // Mobile menu toggle
  document.getElementById("menuToggle").addEventListener("click", () => {
    document.getElementById("sidebar").classList.toggle("open");
    document.getElementById("overlay").classList.toggle("show");
  });
  document.getElementById("overlay").addEventListener("click", () => {
    document.getElementById("sidebar").classList.remove("open");
    document.getElementById("overlay").classList.remove("show");
  });

  // Dashboard quick-ask
  document.getElementById("quickAskBtn").addEventListener("click", () => {
    const val = document.getElementById("quickAsk").value;
    document.getElementById("quickAsk").value = "";
    if(!val.trim()) return;
    showView("assistant");
    handleInput(val);
  });
  document.getElementById("quickAsk").addEventListener("keydown", e => {
    if(e.key === "Enter") document.getElementById("quickAskBtn").click();
  });

  // Assistant chat controls
  document.getElementById("sendBtn").addEventListener("click", sendFromMainInput);
  document.getElementById("userInput").addEventListener("keydown", e => { if(e.key==="Enter") sendFromMainInput(); });
  document.querySelectorAll("#quick-actions button").forEach(b => {
    b.addEventListener("click", () => handleInput(b.dataset.q));
  });

  // Settings
  document.getElementById("saveNameBtn").addEventListener("click", () => {
    const val = document.getElementById("nameInput").value.trim() || "Student";
    studentName = val;
    saveName(val);
    renderDashboard();
  });
  document.getElementById("clearDataBtn").addEventListener("click", () => {
    try{
      localStorage.removeItem("campus_complaints");
      localStorage.removeItem("campus_student_name");
    }catch(e){}
    studentName = "Student";
    document.getElementById("nameInput").value = "";
    renderDashboard();
  });
});
/* ---------------- Data ---------------- */
const DAYS = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];

const faculty = {
  math: {name:"Dr. A. Sharma", room:"Room 204", email:"a.sharma@campus.edu"},
  physics: {name:"Dr. R. Verma", room:"Room 210", email:"r.verma@campus.edu"},
  chemistry: {name:"Dr. S. Iyer", room:"Room 118", email:"s.iyer@campus.edu"},
  cs: {name:"Prof. N. Rao", room:"Room 305", email:"n.rao@campus.edu"},
  electronics: {name:"Dr. K. Menon", room:"Room 220", email:"k.menon@campus.edu"},
  english: {name:"Ms. P. Nair", room:"Room 101", email:"p.nair@campus.edu"},
};

const timetable = {
  monday: ["09:00 - Math","10:00 - Physics","11:00 - CS Lab","13:00 - English"],
  tuesday: ["09:00 - Chemistry","10:00 - Math","11:00 - Electronics","13:00 - CS"],
  wednesday: ["09:00 - CS","10:00 - Physics Lab","12:00 - Workshop"],
  thursday: ["09:00 - Math","10:00 - English","11:00 - CS","13:00 - Elective"],
  friday: ["09:00 - Electronics","10:00 - CS Lab","12:00 - Seminar"],
  saturday: ["09:00 - Sports","10:00 - Club Activities"],
  sunday: ["No classes - Holiday"],
};

const canteenMenu = {
  monday:"Poha, Sandwich, Veg Thali, Cold Coffee",
  tuesday:"Idli-Sambhar, Pasta, Veg Thali, Lassi",
  wednesday:"Paratha, Noodles, Veg Thali, Tea/Coffee",
  thursday:"Upma, Burger, Veg Thali, Milkshake",
  friday:"Dosa, Pizza Slice, Veg Thali, Juice",
  saturday:"Puri-Bhaji, Sandwich, Special Thali",
  sunday:"Canteen Closed",
};

const events = [
  "2026-10-10 - Tech Fest 'Innovate 2026' at Main Auditorium",
  "2026-10-15 - Guest Lecture on AI Ethics, 3 PM, Seminar Hall",
  "2026-10-20 - Inter-college Sports Meet",
  "2026-10-25 - Cultural Night at Open Air Theatre",
];

const faqs = {
  library:"The library is open from 8:00 AM to 8:00 PM, Monday to Saturday.",
  fee:"Fees can be paid online via the campus portal under 'Payments' or at the Accounts Office (Room 5, Admin Block).",
  wifi:"Connect to 'Campus-WiFi', login with your student ID and default password 'campus@123' (change it after first login).",
  "id card":"Lost ID cards can be reissued at the Admin Office by submitting a written request and a passport photo.",
  hostel:"Hostel enquiries are handled by the Warden's Office, Block C, open 9 AM - 5 PM on weekdays.",
};

/* ---------------- State ---------------- */
let studentName = "Student";
let pendingContext = null;
let complaintCategory = null;

function loadComplaints(){
  try{ return JSON.parse(localStorage.getItem("campus_complaints") || "[]"); }
  catch(e){ return []; }
}
function saveComplaint(c){
  try{
    const list = loadComplaints();
    list.push(c);
    localStorage.setItem("campus_complaints", JSON.stringify(list));
  }catch(e){ /* storage unavailable, continue silently */ }
}

/* ---------------- Assistant logic ---------------- */
function extractDay(text){
  return DAYS.find(d => text.includes(d)) || null;
}
function todayName(){
  return new Date().toLocaleDateString("en-US",{weekday:"long"}).toLowerCase();
}
function cap(s){ return s.charAt(0).toUpperCase() + s.slice(1); }

function getResponse(raw){
  const text = raw.toLowerCase().trim().replace(/[^a-z0-9\s]/g,"");

  if(pendingContext === "await_subject"){
    pendingContext = null;
    const subj = Object.keys(faculty).find(s => text.includes(s));
    if(subj){
      const f = faculty[subj];
      return `${cap(subj)} Faculty: ${f.name} - ${f.room} - ${f.email}`;
    }
    return "I still couldn't find that subject. Try: math, physics, chemistry, cs, electronics, english.";
  }
  if(pendingContext === "await_complaint_category"){
    complaintCategory = raw.trim().replace(/\b\w/g, c => c.toUpperCase());
    pendingContext = "await_complaint_message";
    return `Got it (${complaintCategory}). Please describe the issue in one line.`;
  }
  if(pendingContext === "await_complaint_message"){
    saveComplaint({student:studentName, category:complaintCategory, message:raw.trim(), time:new Date().toISOString()});
    pendingContext = null;
    const cat = complaintCategory; complaintCategory = null;
    return `Your ${cat} complaint has been logged. The concerned office will reach out soon.`;
  }

  if(/\b(hi|hello|hey)\b/.test(text))
    return `Hello ${studentName}! Type 'help' to see what I can do.`;
  if(/\b(bye|exit|quit)\b/.test(text))
    return "__EXIT__";
  if(/(timetable|schedule|classes)/.test(text)){
    const day = extractDay(text) || todayName();
    const rows = timetable[day];
    return rows ? `Timetable for ${cap(day)}:\n  - ${rows.join("\n  - ")}` : "No timetable data for that day.";
  }
  if(/(faculty|teacher|professor|subject)/.test(text) || Object.keys(faculty).some(s=>text.includes(s))){
    const subj = Object.keys(faculty).find(s => text.includes(s));
    if(subj){
      const f = faculty[subj];
      return `${cap(subj)} Faculty: ${f.name} - ${f.room} - ${f.email}`;
    }
    pendingContext = "await_subject";
    return `Which subject? (${Object.keys(faculty).join(", ")})`;
  }
  if(/(event|events|fest)/.test(text))
    return "Upcoming Campus Events:\n  - " + events.join("\n  - ");
  if(/(canteen|menu|food)/.test(text)){
    const day = extractDay(text) || todayName();
    return `Canteen Menu for ${cap(day)}: ${canteenMenu[day]}`;
  }
  if(/library/.test(text)) return faqs.library;
  if(/(fee|payment)/.test(text)) return faqs.fee;
  if(/(wifi|internet)/.test(text)) return faqs.wifi;
  if(/(id ?card)/.test(text)) return faqs["id card"];
  if(/hostel/.test(text)) return faqs.hostel;
  if(/(complaint|complain|issue|problem)/.test(text)){
    pendingContext = "await_complaint_category";
    return "Sorry to hear that. What category is this? (hostel, academic, canteen, wifi, other)";
  }
  if(/(help|options|menu)/.test(text))
    return "Here's what I can help with:\n  - timetable [day]\n  - faculty [subject]\n  - events\n  - canteen [day]\n  - library\n  - fee\n  - wifi\n  - id card\n  - hostel\n  - complaint\n  - exit / quit / bye";

  return "Sorry, I didn't understand that. Type 'help' to see what I can assist you with.";
}

/* ---------------- UI wiring ---------------- */
function startChat(){
  const val = document.getElementById("nameInput").value.trim();
  studentName = val || "Student";
  document.getElementById("login").style.display = "none";
  document.getElementById("chat-screen").style.display = "flex";
  document.getElementById("headerTitle").textContent = `🎓 Campus Assistant • ${studentName}`;
  botSay(`Hello ${studentName}! I'm your Campus Assistant. Type 'help' to see what I can do.`);
  document.getElementById("userInput").focus();
  tickClock();
  setInterval(tickClock, 1000);
}

function tickClock(){
  document.getElementById("clock").textContent = new Date().toLocaleString("en-US",{
    weekday:"short", day:"2-digit", month:"short", hour:"2-digit", minute:"2-digit", second:"2-digit"
  });
}

function appendMsg(text, cls){
  const box = document.getElementById("messages");
  const div = document.createElement("div");
  div.className = "msg " + cls;
  div.textContent = text;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}
function userSay(text){ appendMsg(studentName + ": " + text, "user"); }
function botSay(text){ appendMsg("Assistant: " + text, "bot"); }

function handleInput(text){
  if(!text.trim()) return;
  userSay(text);
  const resp = getResponse(text);
  if(resp === "__EXIT__"){
    botSay("Goodbye! Have a great day on campus.");
    document.getElementById("userInput").disabled = true;
    return;
  }
  botSay(resp);
}

function onSend(){
  const input = document.getElementById("userInput");
  const text = input.value;
  input.value = "";
  handleInput(text);
}
function quick(word){ handleInput(word); }

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("userInput").addEventListener("keydown", e => { if(e.key==="Enter") onSend(); });
  document.getElementById("nameInput").addEventListener("keydown", e => { if(e.key==="Enter") startChat(); });
});
