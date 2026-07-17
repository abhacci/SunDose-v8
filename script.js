// ===============================
// SunDose v8
// Part 1
// ===============================

const quotes = [
"☀️ كل يوم بتلتزمي فيه هو هدية لنفسك.",
"💛 صحتك تستحق دقيقة من وقتك.",
"🌸 خطوة صغيرة كل يوم تصنع فرقًا.",
"🌞 استمري... أنا فخورة بيكي.",
"✨ انتي أقوى من النسيان.",
"🌈 يوم جديد = فرصة جديدة.",
"🤍 الالتزام هو النجاح."
];

let streak = Number(localStorage.getItem("streak")) || 0;
let bestStreak = Number(localStorage.getItem("bestStreak")) || 0;
let totalDose = Number(localStorage.getItem("totalDose")) || 0;
let lastDay = localStorage.getItem("lastDay") || "";

const streakBox = document.getElementById("streak");
const bestBox = document.getElementById("bestStreak");
const totalBox = document.getElementById("totalDose");
const goalBox = document.getElementById("goalPercent");

const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

const message = document.getElementById("message");
const quote = document.getElementById("quote");

const calendar = document.getElementById("calendar");
const badges = document.getElementById("badges");

const nameInput = document.getElementById("nameInput");
const medicineInput = document.getElementById("medicineInput");

const welcome = document.getElementById("welcome");
const takeDose = document.getElementById("takeDose");

const mouth = document.getElementById("mouth");
const sunText = document.getElementById("sunText");

const darkMode = document.getElementById("darkMode");

function happySun(msg){

mouth.style.borderRadius="0 0 40px 40px";
sunText.innerHTML=msg;

}

function sadSun(msg){

mouth.style.borderRadius="40px 40px 0 0";
sunText.innerHTML=msg;

}

function updateQuote(){

quote.innerHTML=
quotes[Math.floor(Math.random()*quotes.length)];

}

function updateDashboard(){

streakBox.innerHTML=streak;
bestBox.innerHTML=bestStreak;
totalBox.innerHTML=totalDose;

let percent=Math.min(Math.round((streak/30)*100),100);

goalBox.innerHTML=percent+"%";

progressBar.style.width=percent+"%";
progressText.innerHTML=percent+"%";

}

function updateBadges(){

badges.innerHTML="";

const data=[

{need:1,name:"🎉 أول جرعة"},
{need:3,name:"🌱 بداية رائعة"},
{need:7,name:"🔥 أسبوع"},
{need:14,name:"💛 أسبوعان"},
{need:30,name:"🏆 شهر"},
{need:60,name:"⭐ شهران"},
{need:100,name:"🌞 أسطورة"}

];

data.forEach(b=>{

let div=document.createElement("div");

div.className="badge";

div.innerHTML=(streak>=b.need?"✅ ":"⬜ ")+b.name;

badges.appendChild(div);

});

}

function buildCalendar(){

calendar.innerHTML="";

let today=new Date();

let days=new Date(
today.getFullYear(),
today.getMonth()+1,
0
).getDate();

for(let i=1;i<=days;i++){

let d=document.createElement("div");

d.className="day";

d.innerHTML=i;

if(i===today.getDate()){

d.classList.add("today");

}

if(
i===today.getDate() &&
lastDay===today.toISOString().slice(0,10)
){

d.classList.add("done");

}

calendar.appendChild(d);

}

}
// ===============================
// SunDose v8
// Part 2
// ===============================

function loadSettings(){

const userName = localStorage.getItem("userName") || "ملك";
const medicine = localStorage.getItem("medicine") || "فيتامين د";

nameInput.value = userName;
medicineInput.value = medicine;

welcome.innerHTML = "صباح الخير يا " + userName + " 💛";

if(localStorage.getItem("darkMode") === "true"){
document.body.classList.add("dark");
darkMode.checked = true;
}

}

document.getElementById("saveSettings").onclick=function(){

localStorage.setItem("userName",nameInput.value);
localStorage.setItem("medicine",medicineInput.value);
localStorage.setItem("darkMode",darkMode.checked);

if(darkMode.checked){
document.body.classList.add("dark");
}else{
document.body.classList.remove("dark");
}

happySun("💛 تم حفظ الإعدادات");

alert("✅ تم حفظ الإعدادات");

};

takeDose.onclick=function(){

let today=new Date().toISOString().slice(0,10);

if(today===lastDay){

message.innerHTML="💛 تم تسجيل الجرعة بالفعل اليوم.";

happySun("🌞 ممتاز... الجرعة متسجلة بالفعل.");

return;

}

lastDay=today;

streak++;
totalDose++;

if(streak>bestStreak){
bestStreak=streak;
}

localStorage.setItem("streak",streak);
localStorage.setItem("bestStreak",bestStreak);
localStorage.setItem("totalDose",totalDose);
localStorage.setItem("lastDay",lastDay);

updateDashboard();
updateBadges();
buildCalendar();
updateQuote();

message.innerHTML="🎉 أحسنتِ يا ملك.";

happySun("🌞 أحسنتِ! استمري 💛");

/* احتفال بسيط */

document.body.animate([
{transform:"scale(1)"},
{transform:"scale(1.01)"},
{transform:"scale(1)"}
],{
duration:300
});

};

loadSettings();

updateDashboard();

updateBadges();

buildCalendar();

updateQuote();

setInterval(function(){

const hour=new Date().getHours();

if(hour>=20){

sunText.innerHTML="🌙 متنسيش الجرعة قبل النوم";

}else{

sunText.innerHTML=
quotes[Math.floor(Math.random()*quotes.length)];

}

},8000);

if("serviceWorker" in navigator){

navigator.serviceWorker.register("service-worker.js");

}
// ===============================
// Splash Screen
// ===============================

window.addEventListener("load", () => {

    setTimeout(() => {

        const splash = document.getElementById("splash");

        if(splash){
            splash.classList.add("hide");
        }

    }, 2000);

});
// ===============================
// Side Menu
// ===============================

const menuBtn = document.getElementById("menuBtn");
const sideMenu = document.getElementById("sideMenu");
const closeMenu = document.getElementById("closeMenu");
const overlay = document.getElementById("overlay");

menuBtn.onclick = function(){

sideMenu.classList.add("open");
overlay.classList.add("show");

}

closeMenu.onclick = closeMenuNow;
overlay.onclick = closeMenuNow;

function closeMenuNow(){

sideMenu.classList.remove("open");
overlay.classList.remove("show");

}
