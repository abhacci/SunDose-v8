"use strict";

/* ==========================================
   SunDose v10
========================================== */

const memory = {

name: localStorage.getItem("userName") || "",

medicine: localStorage.getItem("medicine") || "",

streak: Number(localStorage.getItem("streak")) || 0,

bestStreak: Number(localStorage.getItem("bestStreak")) || 0,

totalDose: Number(localStorage.getItem("totalDose")) || 0,

lastDay: localStorage.getItem("lastDay") || "",

darkMode: localStorage.getItem("darkMode") === "true"

};

/* ==========================================
   Elements
========================================== */

const welcome=document.getElementById("welcome");

const takeDose=document.getElementById("takeDose");

const message=document.getElementById("message");

const quote=document.getElementById("quote");

const progressBar=document.getElementById("progressBar");

const progressText=document.getElementById("progressText");

const streakBox=document.getElementById("streak");

const bestBox=document.getElementById("bestStreak");

const totalBox=document.getElementById("totalDose");

const goalBox=document.getElementById("goalPercent");

const badges=document.getElementById("badges");

const calendar=document.getElementById("calendar");

const nameInput=document.getElementById("nameInput");

const medicineInput=document.getElementById("medicineInput");

const darkMode=document.getElementById("darkMode");

const saveSettings=document.getElementById("saveSettings");

const menuBtn=document.getElementById("menuBtn");

const sideMenu=document.getElementById("sideMenu");

const closeMenu=document.getElementById("closeMenu");

const overlay=document.getElementById("overlay");

/* ==========================================
   Quotes
========================================== */

const quotes=[

"☀️ كل يوم تلتزم فيه هو خطوة لصحة أفضل.",

"💛 صحتك تستحق دقيقة من وقتك.",

"🌸 الاستمرار أهم من البداية.",

"🌞 أنا فخورة بيك.",

"✨ العادات الصغيرة تصنع فرقًا كبيرًا."

];
/* ==========================================
   Save & Load
========================================== */

function saveMemory(){

localStorage.setItem("userName",memory.name);

localStorage.setItem("medicine",memory.medicine);

localStorage.setItem("streak",memory.streak);

localStorage.setItem("bestStreak",memory.bestStreak);

localStorage.setItem("totalDose",memory.totalDose);

localStorage.setItem("lastDay",memory.lastDay);

localStorage.setItem("darkMode",memory.darkMode);

}

function loadSettings(){

nameInput.value=memory.name;

medicineInput.value=memory.medicine;

darkMode.checked=memory.darkMode;

if(memory.darkMode){

document.body.classList.add("dark");

}

if(memory.name===""){

welcome.innerHTML="☀️ أهلاً بك";

}else{

welcome.innerHTML="☀️ أهلاً " + memory.name;

}

}

/* ==========================================
   Dashboard
========================================== */

function updateDashboard(){

streakBox.textContent=memory.streak;

bestBox.textContent=memory.bestStreak;

totalBox.textContent=memory.totalDose;

let percent=Math.min(Math.round((memory.streak/30)*100),100);

goalBox.textContent=percent+"%";

progressBar.style.width=percent+"%";

progressText.textContent=percent+"%";

}
/* ==========================================
   Quotes
========================================== */

function updateQuote(){

quote.textContent=

quotes[Math.floor(Math.random()*quotes.length)];

}

/* ==========================================
   Badges
========================================== */

function updateBadges(){

badges.innerHTML="";

const list=[

{need:1,title:"🎉 أول جرعة"},

{need:7,title:"🔥 أسبوع"},

{need:30,title:"🏆 شهر"},

{need:100,title:"⭐ أسطورة"}

];

list.forEach(item=>{

const div=document.createElement("div");

div.className="badge";

div.textContent=(memory.streak>=item.need?"✅ ":"⬜ ")+item.title;

badges.appendChild(div);

});

}
/* ==========================================
   Calendar
========================================== */

function buildCalendar(){

calendar.innerHTML="";

const today=new Date();

const days=new Date(
today.getFullYear(),
today.getMonth()+1,
0
).getDate();

for(let i=1;i<=days;i++){

const day=document.createElement("div");

day.className="day";

day.textContent=i;

if(i===today.getDate()){

day.classList.add("today");

}

if(
memory.lastDay===today.toISOString().slice(0,10)
&&
i===today.getDate()
){

day.classList.add("done");

}

calendar.appendChild(day);

}

}

/* ==========================================
   Take Dose
========================================== */

takeDose.onclick=function(){

const today=new Date().toISOString().slice(0,10);

if(memory.lastDay===today){

message.textContent="💛 تم تسجيل الجرعة بالفعل اليوم";

return;

}

memory.lastDay=today;

memory.streak++;

memory.totalDose++;

if(memory.streak>memory.bestStreak){

memory.bestStreak=memory.streak;

}

saveMemory();

updateDashboard();

updateBadges();

buildCalendar();

updateQuote();

message.textContent="🎉 أحسنت تم تسجيل الجرعة بنجاح";

};
/* ==========================================
   Settings
========================================== */

saveSettings.onclick=function(){

memory.name=nameInput.value.trim();

memory.medicine=medicineInput.value.trim();

memory.darkMode=darkMode.checked;

saveMemory();

if(memory.darkMode){

document.body.classList.add("dark");

}else{

document.body.classList.remove("dark");

}

welcome.textContent=

memory.name===""
?
"☀️ أهلاً بك"
:
"☀️ أهلاً "+memory.name;

};

/* ==========================================
   Side Menu
========================================== */

menuBtn.onclick=function(){

sideMenu.classList.add("open");

overlay.classList.add("show");

};

function closeSideMenu(){

sideMenu.classList.remove("open");

overlay.classList.remove("show");

}

closeMenu.onclick=closeSideMenu;

overlay.onclick=closeSideMenu;
/* ==========================================
   Start App
========================================== */

function startApp(){

loadSettings();

updateDashboard();

updateBadges();

buildCalendar();

updateQuote();

}

startApp();

/* ==========================================
   Change Quote Every Minute
========================================== */

setInterval(function(){

updateQuote();

},60000);

/* ==========================================
   Service Worker
========================================== */

if("serviceWorker" in navigator){

window.addEventListener("load",function(){

navigator.serviceWorker.register("service-worker.js")

.then(()=>{

console.log("Service Worker Registered");

})

.catch(err=>{

console.log(err);

});

});

}
/* ==========================================
   Intro
========================================== */

const introCard = document.getElementById("introCard");

const mainCard = document.querySelector(".mainCard");
const dashboard = document.querySelector(".dashboard");

const progressCard = document.getElementById("progressCard");
const badgesCard = document.getElementById("badgesCard");
const calendarCard = document.getElementById("calendarCard");
const quoteCard = document.getElementById("quoteCard");
const futureCard = document.getElementById("futureCard");

const finishIntro = document.getElementById("finishIntro");

finishIntro.onclick = function () {

memory.name = document.getElementById("userNameInput").value.trim();

memory.medicine = document.getElementById("medicineName").value.trim();

saveMemory();

localStorage.setItem("firstVisit","true");

introCard.style.display="none";

mainCard.style.display="block";

dashboard.style.display="grid";

progressCard.style.display="block";

badgesCard.style.display="block";

calendarCard.style.display="block";

quoteCard.style.display="block";

futureCard.style.display="block";

welcome.innerHTML="☀️ أهلاً " + memory.name;

};
/* ==========================================
   Intro System
========================================== */

const introCard = document.getElementById("introCard");

const genderQuestion = document.getElementById("genderQuestion");
const nameQuestion = document.getElementById("nameQuestion");
const birthQuestion = document.getElementById("birthQuestion");
const medicineQuestion = document.getElementById("medicineQuestion");

const maleBtn = document.getElementById("maleBtn");
const femaleBtn = document.getElementById("femaleBtn");

const nextName = document.getElementById("nextName");
const nextBirth = document.getElementById("nextBirth");
const finishIntro = document.getElementById("finishIntro");

const userNameInput = document.getElementById("userNameInput");
const birthInput = document.getElementById("birthInput");
const medicineName = document.getElementById("medicineName");

function showApp(){

document.querySelector(".mainCard").style.display="block";
document.querySelector(".dashboard").style.display="grid";

document.getElementById("progressCard").style.display="block";
document.getElementById("badgesCard").style.display="block";
document.getElementById("calendarCard").style.display="block";
document.getElementById("quoteCard").style.display="block";
document.getElementById("futureCard").style.display="block";

}

if(localStorage.getItem("firstVisit")==="true"){

introCard.style.display="none";
showApp();

}else{

document.querySelector(".mainCard").style.display="none";
document.querySelector(".dashboard").style.display="none";

}

maleBtn.onclick=function(){

localStorage.setItem("gender","male");

genderQuestion.style.display="none";
nameQuestion.style.display="block";

};

femaleBtn.onclick=function(){

localStorage.setItem("gender","female");

genderQuestion.style.display="none";
nameQuestion.style.display="block";

};

nextName.onclick=function(){

if(userNameInput.value.trim()==="") return;

nameQuestion.style.display="none";
birthQuestion.style.display="block";

};

nextBirth.onclick=function(){

if(birthInput.value==="") return;

birthQuestion.style.display="none";
medicineQuestion.style.display="block";

};

finishIntro.onclick=function(){

memory.name=userNameInput.value.trim();
memory.medicine=medicineName.value.trim();

saveMemory();

localStorage.setItem("birthDate",birthInput.value);
localStorage.setItem("firstVisit","true");

introCard.style.display="none";

showApp();

welcome.innerHTML="☀️ أهلاً "+memory.name;

updateDashboard();
updateBadges();
buildCalendar();
updateQuote();

};
