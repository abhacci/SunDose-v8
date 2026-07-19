// ==========================================
// SunDose v9 Alpha
// Main Script
// By Waled & ChatGPT
// ==========================================

"use strict";

// ==========================================
// Local Memory
// ==========================================

const memory = {

    gender: localStorage.getItem("gender") || "",

    name: localStorage.getItem("userName") || "",

    birthDate: localStorage.getItem("birthDate") || "",

    medicine: localStorage.getItem("medicine") || "",

    firstVisit: localStorage.getItem("firstVisit") === "true",

    streak: Number(localStorage.getItem("streak")) || 0,

    bestStreak: Number(localStorage.getItem("bestStreak")) || 0,

    totalDose: Number(localStorage.getItem("totalDose")) || 0,

    lastDay: localStorage.getItem("lastDay") || "",

    darkMode: localStorage.getItem("darkMode") === "true"

};

// ==========================================
// Elements
// ==========================================

const speechBubble = document.getElementById("speechBubble");
const speechText = document.getElementById("speechText");

const questionArea = document.getElementById("questionArea");

const maleBtn = document.getElementById("maleBtn");
const femaleBtn = document.getElementById("femaleBtn");

const userNameInput = document.getElementById("userNameInput");
const birthInput = document.getElementById("birthInput");
const nextQuestion = document.getElementById("nextQuestion");

const welcome = document.getElementById("welcome");
const message = document.getElementById("message");
const quote = document.getElementById("quote");

const takeDose = document.getElementById("takeDose");

const streakBox = document.getElementById("streak");
const bestBox = document.getElementById("bestStreak");
const totalBox = document.getElementById("totalDose");
const goalBox = document.getElementById("goalPercent");

const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

const calendar = document.getElementById("calendar");
const badges = document.getElementById("badges");

// ==========================================
// Sana
// ==========================================

const sana = {

    state:"idle",

    busy:false,

    typingSpeed:40,

    readingDelay:1800

};

// ==========================================
// Helpers
// ==========================================

function wait(ms){

    return new Promise(resolve=>setTimeout(resolve,ms));

}

function saveMemory(){

    localStorage.setItem("gender",memory.gender);

    localStorage.setItem("userName",memory.name);

    localStorage.setItem("birthDate",memory.birthDate);

    localStorage.setItem("medicine",memory.medicine);

    localStorage.setItem("firstVisit",memory.firstVisit);

    localStorage.setItem("streak",memory.streak);

    localStorage.setItem("bestStreak",memory.bestStreak);

    localStorage.setItem("totalDose",memory.totalDose);

    localStorage.setItem("lastDay",memory.lastDay);

    localStorage.setItem("darkMode",memory.darkMode);

}

function getAge(){

    if(memory.birthDate==="") return 0;

    const today=new Date();

    const birth=new Date(memory.birthDate);

    let age=today.getFullYear()-birth.getFullYear();

    const month=today.getMonth()-birth.getMonth();

    if(

        month<0 ||

        (month===0 && today.getDate()<birth.getDate())

    ){

        age--;

    }

    return age;

}const bestBox = document.getElementById("bestStreak");
const totalBox = document.getElementById("totalDose");
const goalBox = document.getElementById("goalPercent");

const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

const calendar = document.getElementById("calendar");
const badges = document.getElementById("badges");

const quote = document.getElementById("quote");
const message = document.getElementById("message");

const takeDose = document.getElementById("takeDose");
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
// تحميل الإعدادات
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

// ===============================
// حفظ الإعدادات
// ===============================

document.getElementById("saveSettings").onclick = function(){

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

// ===============================
// زر الجرعة
// ===============================

takeDose.onclick = function(){

let today = new Date().toISOString().slice(0,10);

if(today === lastDay){

message.innerHTML = "💛 تم تسجيل الجرعة بالفعل اليوم.";

happySun("🌞 ممتاز... الجرعة متسجلة بالفعل.");

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

document.body.animate([
{transform:"scale(1)"},
{transform:"scale(1.01)"},
{transform:"scale(1)"}
],{
duration:300
});

};
// ===============================
// تشغيل التطبيق
// ===============================

loadSettings();

updateDashboard();

updateBadges();

buildCalendar();

updateQuote();

// ===============================
// تغيير رسالة الشمس كل فترة
// ===============================

setInterval(function(){

const hour = new Date().getHours();

if(hour >= 20){

happySun("🌙 متنسيش الجرعة قبل النوم");

}else{

updateQuote();
setTimeout(()=>{

sunSpeak(
sunMessages[
Math.floor(Math.random()*sunMessages.length)
]
);

},1000);
}

},8000);

// ===============================
// Splash Screen
// ===============================

window.addEventListener("load",function(){

setTimeout(function(){

const splash=document.getElementById("splash");

if(splash){

splash.classList.add("hide");

}

},2000);

});

// ===============================
// Side Menu
// ===============================

const menuBtn=document.getElementById("menuBtn");
const sideMenu=document.getElementById("sideMenu");
const closeMenu=document.getElementById("closeMenu");
const overlay=document.getElementById("overlay");

if(menuBtn){

menuBtn.onclick=function(){

sideMenu.classList.add("open");

if(overlay){

overlay.classList.add("show");

}

}

}

function closeSideMenu(){

sideMenu.classList.remove("open");

if(overlay){

overlay.classList.remove("show");

}

}

if(closeMenu){

closeMenu.onclick=closeSideMenu;

}

if(overlay){

overlay.onclick=closeSideMenu;

}

// ===============================
// Service Worker
// ===============================

if("serviceWorker" in navigator){

navigator.serviceWorker.register("service-worker.js");

}
const bubble = document.getElementById("speechBubble");
const mascot = document.getElementById("sunMascot");

const sunMessages = [

"☀️ صباح الخير يا ملك",
"💛 مستعدة للجرعة؟",
"🌸 انتي تقدري تكملي",
"🌞 أنا فخورة بيكي",
"✨ يلا ناخد الجرعة"

];

function sunSpeak(text){

bubble.innerHTML = text;

bubble.classList.add("show");

mascot.classList.add("talking");

// تحريك العينين
document.querySelector(".left").classList.add("look-left");
document.querySelector(".right").classList.add("look-left");

setTimeout(()=>{

document.querySelector(".left").classList.remove("look-left");
document.querySelector(".right").classList.remove("look-left");

},900);

// غمزة بعد شوية
setTimeout(()=>{

document.querySelector(".left").style.transform="scaleY(.1)";

setTimeout(()=>{

document.querySelector(".left").style.transform="scaleY(1)";

},180);

},2200);

// إنهاء الكلام
setTimeout(()=>{

bubble.classList.remove("show");

mascot.classList.remove("talking");

},4500);

}
// =========================
// تشغيل سنا
// =========================

// =========================
// أول لقاء مع سنا
// =========================

window.addEventListener("load", function () {

    const firstVisit = localStorage.getItem("firstVisit");

    if (!firstVisit) {

        setTimeout(() => {

            sana.say("🌞 أهلاً... أنا سنا");

        }, 1500);

        setTimeout(() => {

            sana.say("💛 يسعدني جدًا إنك هنا.");

        }, 9000);

        setTimeout(() => {

            sana.say("✨ اسمي سنا... ومعناه الضوء والإشراق.");

        }, 17000);

        setTimeout(() => {

            sana.say("☀️ هدفي أساعدك تهتم بصحتك خطوة بخطوة.");

        }, 14000);

        setTimeout(() => {

            sana.say("🤝 من النهارده... إحنا فريق واحد.");

            localStorage.setItem("firstVisit", "true");

        }, 26000);

    } else {

        setTimeout(() => {

            sana.say("☀️ سعيده أشوفك من جديد.");

        }, 7000);

    }

});
// ============================================
// Sana Core Engine
// ============================================

const sana = {

    state: "idle",

    typingSpeed: 45,

    readingSpeed: 2200,

    busy: false

};

// ============================================
// Helpers
// ============================================

function wait(ms){

    return new Promise(resolve=>setTimeout(resolve,ms));

}

function saveMemory(){

    localStorage.setItem("gender",memory.gender);

    localStorage.setItem("userName",memory.name);

    localStorage.setItem("birthDate",memory.birthDate);

    localStorage.setItem("medicine",memory.medicine);

    localStorage.setItem("firstVisit",memory.firstVisit);

    localStorage.setItem("streak",memory.streak);

    localStorage.setItem("bestStreak",memory.bestStreak);

    localStorage.setItem("totalDose",memory.totalDose);

    localStorage.setItem("lastDay",memory.lastDay);

    localStorage.setItem("darkMode",memory.darkMode);

}

function calculateAge(){

    if(memory.birthDate==="") return 0;

    const today=new Date();

    const birth=new Date(memory.birthDate);

    let age=today.getFullYear()-birth.getFullYear();

    const month=today.getMonth()-birth.getMonth();

    if(

        month<0 ||

        (month===0 && today.getDate()<birth.getDate())

    ){

        age--;

    }

    return age;
// ============================================
// Dialogue Engine
// ============================================

let dialogueStep = 0;

// كتابة الرسالة

async function speak(text){

    await sanaSpeak(text);

}

// إخفاء الرسالة

async function hide(){

    await sanaHide();

}

// إظهار اختيار الجنس

function showGenderQuestion(){

    questionArea.style.display="block";

    maleBtn.style.display="block";

    femaleBtn.style.display="block";

    userNameInput.style.display="none";

    birthInput.style.display="none";

    nextQuestion.style.display="none";

}

// إظهار الاسم

function showNameQuestion(){

    maleBtn.style.display="none";

    femaleBtn.style.display="none";

    userNameInput.style.display="block";

    nextQuestion.style.display="block";

}

// إظهار تاريخ الميلاد

function showBirthQuestion(){

    userNameInput.style.display="none";

    birthInput.style.display="block";

    nextQuestion.style.display="block";

}

// إخفاء كل العناصر

function hideQuestions(){

    questionArea.style.display="none";

    maleBtn.style.display="none";

    femaleBtn.style.display="none";

    userNameInput.style.display="none";

    birthInput.style.display="none";

    nextQuestion.style.display="none";

}
}
// ==========================================
// Sana Dialogue Engine
// ==========================================

async function sanaSpeak(text){

    while(sana.busy){

        await wait(100);

    }

    sana.busy=true;

    sana.state="talking";

    speechBubble.classList.add("show");

    speechText.innerHTML="";

    for(let i=0;i<text.length;i++){

        speechText.innerHTML+=text.charAt(i);

        await wait(sana.typingSpeed);

    }

    await wait(

        sana.readingDelay+

        (text.length*35)

    );

}

async function sanaHide(){

    speechBubble.classList.remove("show");

    await wait(350);

    sana.busy=false;

    sana.state="idle";

}

// ==========================================
// Welcome Messages
// ==========================================

const welcomeMale=[

"☀️ صباح الخير يا {name}",

"🌞 سعيد أشوفك من جديد يا {name}",

"💛 عامل إيه النهارده يا {name}",

"✨ مستعد نبدأ يوم جديد يا {name}"

];

const welcomeFemale=[

"☀️ صباح الخير يا {name}",

"🌸 سعيدة أشوفك من جديد يا {name}",

"💛 عاملة إيه النهارده يا {name}",

"✨ مستعدة نبدأ يوم جديد يا {name}"

];

function randomWelcome(){

    let list=

    memory.gender==="female"

    ?

    welcomeFemale

    :

    welcomeMale;

    let text=

    list[

    Math.floor(

    Math.random()*list.length

    )

    ];

    return text.replace("{name}",memory.name);

}

// ==========================================
// Quotes
// ==========================================

const quotes=[

"☀️ كل يوم تلتزم فيه هو خطوة لصحة أفضل.",

"💛 صحتك تستحق دقيقة من وقتك.",

"🌸 الاستمرار أهم من البداية.",

"🌞 أنا فخورة بالتزامك.",

"✨ العادات الصغيرة تصنع فرقًا كبيرًا.",

"🤍 يوم جديد يعني فرصة جديدة."

];

function updateQuote(){

    quote.innerHTML=

    quotes[

    Math.floor(

    Math.random()*quotes.length

    )

    ];

}
// ==========================================
// Dashboard Engine
// ==========================================

function updateDashboard(){

    streakBox.innerHTML=memory.streak;

    bestBox.innerHTML=memory.bestStreak;

    totalBox.innerHTML=memory.totalDose;

    let percent=Math.round(

        (memory.streak/30)*100

    );

    if(percent>100){

        percent=100;

    }

    goalBox.innerHTML=percent+"%";

    progressBar.style.width=percent+"%";

    progressText.innerHTML=percent+"%";

}

// ==========================================
// Calendar
// ==========================================

function buildCalendar(){

    calendar.innerHTML="";

    const today=new Date();

    const days=new Date(

        today.getFullYear(),

        today.getMonth()+1,

        0

    ).getDate();

    for(

        let i=1;

        i<=days;

        i++

    ){

        const day=document.createElement("div");

        day.className="day";

        day.innerHTML=i;

        if(

            i===today.getDate()

        ){

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

// ==========================================
// Badges
// ==========================================

function updateBadges(){

    badges.innerHTML="";

    const list=[

        {

            need:1,

            title:"🎉 أول جرعة"

        },

        {

            need:3,

            title:"🌱 بداية رائعة"

        },

        {

            need:7,

            title:"🔥 أسبوع"

        },

        {

            need
            // ==========================================
// First Meeting
// ==========================================

async function firstMeeting(){

    hideQuestions();

    await sanaSpeak("🌞 أهلاً... أنا سنا.");

    await sanaHide();

    await sanaSpeak("💛 يسعدني جدًا إننا هنبدأ رحلتنا سوا.");

    await sanaHide();

    // =====================
    // Gender
    // =====================

    if(memory.gender===""){

        await sanaSpeak("👤 قبل أي حاجة... تحب أعرف إنك ولد ولا بنت؟");

        showGenderQuestion();

        while(memory.gender===""){

            await wait(200);

        }

        hideQuestions();

        await sanaHide();

    }

    // =====================
    // Name
    // =====================

    if(memory.name===""){

        await sanaSpeak("✨ جميل... ممكن أعرف اسمك؟");

        showNameQuestion();

        while(userNameInput.value.trim()===""){

            await wait(200);

        }

        memory.name=userNameInput.value.trim();

        saveMemory();

        hideQuestions();

        await sanaHide();

    }

    // =====================
    // Birth Date
    // =====================

    if(memory.birthDate===""){

        await sanaSpeak("🎂 كام تاريخ ميلادك؟");

        showBirthQuestion();

        while(birthInput.value===""){

            await wait(200);

        }

        memory.birthDate=birthInput.value;

        saveMemory();

        hideQuestions();

        await sanaHide();

    }

    // =====================
    // Medicine
    // =====================

    if(memory.medicine===""){

        const med=

        prompt("اكتب اسم العلاج أو الفيتامين");

        if(med){

            memory.medicine=med;

            saveMemory();

        }

    }

    const age=getAge();

    // =====================
    // Age Message
    // =====================

    if(age<18){

        await sanaSpeak(

        "🌱 جميل إنك بدأت تهتم بصحتك من السن ده."

        );

    }

    else if(age<=25){

        await sanaSpeak(

        "💛 أفضل وقت تبني فيه عادات صحية هو المرحلة دي."

        );

    }

    else if(age<=40){

        await sanaSpeak(

        "🌞 كل عادة صحية النهارده هتشوف نتيجتها بعد سنين."

        );

    }

    else{

        await sanaSpeak(

        "🤍 الاهتمام بالصحة هو أفضل استثمار في نفسك."

        );

    }

    await sanaHide();

    // =====================
    // Welcome
    // =====================

    await sanaSpeak(

    "🤝 من النهارده هنكون فريق واحد."

    );

    await sanaHide();

    memory.firstVisit=true;

    saveMemory();

    welcome.innerHTML=

    randomWelcome();
// ==========================================
// App Start
// ==========================================

async function startApp(){

    // تحميل الوضع الليلي

    if(memory.darkMode){

        document.body.classList.add("dark");

    }

    // تحميل لوحة البيانات

    updateDashboard();

    updateBadges();

    buildCalendar();

    updateQuote();

    // أول تشغيل

    if(!memory.firstVisit){

        await firstMeeting();

    }

    // مستخدم قديم

    else{

        welcome.innerHTML=randomWelcome();

        await sanaSpeak(

        randomWelcome()

        );

        await sanaHide();

    }

}

// ==========================================
// Daily Reminder
// ==========================================

setInterval(async()=>{

    if(sana.busy) return;

    const hour=new Date().getHours();

    if(hour>=20){

        await sanaSpeak(

        "🌙 متنساش "+memory.medicine+" قبل النوم."

        );

    }

    else if(hour>=6 && hour<=11){

        await sanaSpeak(

        "☀️ صباح الخير يا "+memory.name

        );

    }

    else if(hour>=12 && hour<=17){

        await sanaSpeak(

        "🌞 أتمنى يومك يكون جميل."

        );

    }

    else{

        await sanaSpeak(

        "💛 افتكر تشرب مية وتهتم بنفسك."

        );

    }

    await sanaHide();

},180000);

// ==========================================
// Start
// ==========================================

window.addEventListener(

"load",

function(){

    startApp();

});

// ==========================================
// Service Worker
// ==========================================

if("serviceWorker" in navigator){

navigator.serviceWorker.register(

"service-worker.js"

);// ==========================================
// Settings Engine
// ==========================================

const nameInput=document.getElementById("nameInput");
const medicineInput=document.getElementById("medicineInput");
const darkMode=document.getElementById("darkMode");
const saveSettings=document.getElementById("saveSettings");

function loadSettings(){

    nameInput.value=memory.name;

    medicineInput.value=memory.medicine;

    darkMode.checked=memory.darkMode;

}

saveSettings.onclick=async function(){

    memory.name=nameInput.value.trim();

    memory.medicine=medicineInput.value.trim();

    memory.darkMode=darkMode.checked;

    saveMemory();

    if(memory.darkMode){

        document.body.classList.add("dark");

    }else{

        document.body.classList.remove("dark");

    }

    welcome.innerHTML=randomWelcome();

    await sanaSpeak("💛 تم حفظ الإعدادات بنجاح.");

    await sanaHide();

};

// ==========================================
// Welcome Refresh
// ==========================================

function refreshWelcome(){

    if(memory.name==="") return;

    welcome.innerHTML=randomWelcome();

}

// ==========================================
// Splash
// ==========================================

window.addEventListener("load",function(){

    setTimeout(function(){

        const splash=document.getElementById("splash");

        if(splash){

            splash.classList.add("hide");

        }

    },2200);

});

// ==========================================
// Menu
// ==========================================

const menuBtn=document.getElementById("menuBtn");

const sideMenu=document.getElementById("sideMenu");

const closeMenu=document.getElementById("closeMenu");

const overlay=document.getElementById("overlay");

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

// ==========================================
// First Load
// ==========================================

loadSettings();

refreshWelcome();

}
}
    // ==========================================
// Sana Animation Engine
// ==========================================

const sanaImage=document.getElementById("sana");

function sanaState(state){

    sana.state=state;

    switch(state){

        case "happy":

            sanaImage.src="images/happy.png";

        break;

        case "thinking":

            sanaImage.src="images/thinking.png";

        break;

        case "sleep":

            sanaImage.src="images/sleep.png";

        break;

        case "talking":

            sanaImage.src="images/talking.png";

        break;

        default:

            sanaImage.src="images/happy.png";

    }

}

// ==========================================
// Blink
// ==========================================

setInterval(function(){

    if(sana.busy) return;

    sanaImage.classList.add("blink");

    setTimeout(function(){

        sanaImage.classList.remove("blink");

    },180);

},4500);

// ==========================================
// Smile
// ==========================================

async function sanaSmile(){

    sanaImage.classList.add("smile");

    await wait(900);

    sanaImage.classList.remove("smile");

}

// ==========================================
// Thinking
// ==========================================

async function sanaThinking(){

    sanaState("thinking");

    await wait(1200);

    sanaState("happy");

}

// ==========================================
// Talking Animation
// ==========================================

async function sanaTalk(text){

    sanaState("talking");

    await sanaSpeak(text);

    sanaState("happy");

    await sanaSmile();

}

// ==========================================
// Daily Welcome
// ==========================================

async function welcomeUser(){

    await sanaThinking();

    await sanaTalk(

        randomWelcome()

    );

}

// ==========================================
// Good Night
// ==========================================

async function goodNight(){

    sanaState("sleep");

    await sanaTalk(

        "🌙 تصبح على خير."

    );

}

// ==========================================
// Hour Events
// ==========================================

setInterval(async function(){

    if(sana.busy) return;

    const hour=new Date().getHours();

    if(hour>=22){

        await goodNight();

        return;

    }

    if(hour===8){

        await welcomeUser();

        return;

    }

},60000);

// ==========================================
// Finish Loading
// ==========================================

window.addEventListener("load",async()=>{

    sanaState("happy");

    await wait(1000);

    if(memory.firstVisit){

        await welcomeUser();

    }

});
