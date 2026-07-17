// ===============================
// SunDose v8.1
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
const soundMode = document.getElementById("soundMode");

function happySun(text){

mouth.style.borderRadius="0 0 40px 40px";
sunText.innerHTML=text;

}

function sadSun(text){

mouth.style.borderRadius="40px 40px 0 0";
sunText.innerHTML=text;

}
// ===============================
// Part 2
// Dashboard + Calendar + Badges
// ===============================

function updateQuote(){

quote.innerHTML =
quotes[Math.floor(Math.random()*quotes.length)];

}

function updateDashboard(){

streakBox.innerHTML = streak;
bestBox.innerHTML = bestStreak;
totalBox.innerHTML = totalDose;

let percent = Math.min(Math.round((streak/30)*100),100);

goalBox.innerHTML = percent + "%";

progressBar.style.width = percent + "%";
progressText.innerHTML = percent + "%";

}

function updateBadges(){

badges.innerHTML = "";

const data = [

{need:1,name:"🎉 أول جرعة"},
{need:3,name:"🌱 بداية رائعة"},
{need:7,name:"🔥 أسبوع كامل"},
{need:14,name:"💛 أسبوعان"},
{need:30,name:"🏆 شهر كامل"},
{need:60,name:"⭐ شهران"},
{need:100,name:"🌞 أسطورة الالتزام"}

];

data.forEach(function(item){

const div = document.createElement("div");

div.className = "badge";

div.innerHTML =
(streak >= item.need ? "✅ " : "⬜ ") + item.name;

badges.appendChild(div);

});

}

function buildCalendar(){

calendar.innerHTML = "";

const today = new Date();

const days =
new Date(
today.getFullYear(),
today.getMonth()+1,
0
).getDate();

for(let i=1;i<=days;i++){

const d = document.createElement("div");

d.className = "day";

d.innerHTML = i;

if(i === today.getDate()){

d.classList.add("today");

}

if(
i === today.getDate() &&
lastDay === today.toISOString().slice(0,10)
){

d.classList.add("done");

}

calendar.appendChild(d);

}

}
// ===============================
// Part 3
// Settings
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

if(localStorage.getItem("soundMode") === "false"){

soundMode.checked = false;

}

}

document.getElementById("saveSettings").onclick = function(){

localStorage.setItem("userName",nameInput.value);
localStorage.setItem("medicine",medicineInput.value);

localStorage.setItem("darkMode",darkMode.checked);
localStorage.setItem("soundMode",soundMode.checked);

if(darkMode.checked){

document.body.classList.add("dark");

}else{

document.body.classList.remove("dark");

}

happySun("💛 تم حفظ الإعدادات");

message.innerHTML = "✅ تم حفظ الإعدادات بنجاح";

};
// ===============================
// Part 4
// Take Dose
// ===============================

takeDose.onclick = function(){

const today = new Date().toISOString().slice(0,10);

if(today === lastDay){

message.innerHTML = "💛 تم تسجيل الجرعة بالفعل اليوم.";
happySun("🌞 ممتاز... الجرعة متسجلة.");

return;

}

lastDay = today;

streak++;
totalDose++;

if(streak > bestStreak){

bestStreak = streak;

}

localStorage.setItem("streak",streak);
localStorage.setItem("bestStreak",bestStreak);
localStorage.setItem("totalDose",totalDose);
localStorage.setItem("lastDay",lastDay);

updateDashboard();
updateBadges();
buildCalendar();
updateQuote();

message.innerHTML = "🎉 أحسنتِ يا ملك.";

happySun("🌞 أحسنتِ! استمري 💛");

if(soundMode.checked){

const audio = new Audio("success.mp3");

audio.play().catch(()=>{});

}

document.body.animate(

[
{transform:"scale(1)"},
{transform:"scale(1.02)"},
{transform:"scale(1)"}
],

{
duration:300
}

);

};
// ===============================
// Part 5
// Start App + Splash + Side Menu
// ===============================

loadSettings();
updateDashboard();
updateBadges();
buildCalendar();
updateQuote();

setInterval(function(){

const hour = new Date().getHours();

if(hour >= 20){

sunText.innerHTML = "🌙 متنسيش الجرعة قبل النوم";

}else{

updateQuote();

}

},8000);

// Splash

window.addEventListener("load",function(){

setTimeout(function(){

const splash = document.getElementById("splash");

if(splash){

splash.classList.add("hide");

}

},2000);

});

// Side Menu

const menuBtn = document.getElementById("menuBtn");
const sideMenu = document.getElementById("sideMenu");
const closeMenu = document.getElementById("closeMenu");
const overlay = document.getElementById("overlay");

if(menuBtn){

menuBtn.onclick = function(){

sideMenu.classList.add("open");
overlay.classList.add("show");

};

}

function closeSideMenu(){

sideMenu.classList.remove("open");
overlay.classList.remove("show");

}

if(closeMenu){

closeMenu.onclick = closeSideMenu;

}

if(overlay){

overlay.onclick = closeSideMenu;

}

// Service Worker

if("serviceWorker" in navigator){

window.addEventListener("load",function(){

navigator.serviceWorker.register("service-worker.js");

});

}
