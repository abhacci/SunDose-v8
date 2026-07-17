// ===============================
// SunDose v8
// Part 1
// المتغيرات الأساسية
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

// البيانات المحفوظة
let streak = Number(localStorage.getItem("streak")) || 0;
let bestStreak = Number(localStorage.getItem("bestStreak")) || 0;
let totalDose = Number(localStorage.getItem("totalDose")) || 0;
let lastDay = localStorage.getItem("lastDay") || "";

// عناصر الصفحة
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

// ===============================
// الشمس
// ===============================

function happySun(text){

    mouth.style.borderRadius = "0 0 40px 40px";
    sunText.innerHTML = text;

}

function sadSun(text){

    mouth.style.borderRadius = "40px 40px 0 0";
    sunText.innerHTML = text;

}

// ===============================
// رسالة اليوم
// ===============================

function updateQuote(){

    quote.innerHTML =
    quotes[Math.floor(Math.random()*quotes.length)];

}

// ===============================
// لوحة الإحصائيات
// ===============================

function updateDashboard(){

    streakBox.innerHTML = streak;
    bestBox.innerHTML = bestStreak;
    totalBox.innerHTML = totalDose;

    let percent = Math.min(
        Math.round((streak/30)*100),
        100
    );

    goalBox.innerHTML = percent + "%";

    progressBar.style.width = percent + "%";
    progressText.innerHTML = percent + "%";

}
// ===============================
// SunDose v8
// Part 2
// الإنجازات + التقويم
// ===============================

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

        let badge = document.createElement("div");

        badge.className = "badge";

        if(streak >= item.need){

            badge.innerHTML = "✅ " + item.name;

        }else{

            badge.innerHTML = "⬜ " + item.name;

        }

        badges.appendChild(badge);

    });

}

// ===============================
// التقويم
// ===============================

function buildCalendar(){

    calendar.innerHTML = "";

    let today = new Date();

    let year = today.getFullYear();

    let month = today.getMonth();

    let days = new Date(year, month + 1, 0).getDate();

    for(let i=1;i<=days;i++){

        let day = document.createElement("div");

        day.className = "day";

        day.innerHTML = i;

        if(i === today.getDate()){

            day.classList.add("today");

        }

        if(
            i === today.getDate() &&
            lastDay === today.toISOString().slice(0,10)
        ){

            day.classList.add("done");

        }

        calendar.appendChild(day);

    }

}
// ===============================
// SunDose v8
// Part 3
// الإعدادات
// ===============================

function loadSettings(){

    const userName =
        localStorage.getItem("userName") || "ملك";

    const medicine =
        localStorage.getItem("medicine") || "فيتامين د";

    nameInput.value = userName;
    medicineInput.value = medicine;

    welcome.innerHTML =
        "صباح الخير يا " + userName + " 💛";

    if(localStorage.getItem("darkMode") === "true"){

        document.body.classList.add("dark");
        darkMode.checked = true;

    }

    if(localStorage.getItem("soundMode") === "false"){

        soundMode.checked = false;

    }


// ===============================
// حفظ الإعدادات
// ===============================

document.getElementById("saveSettings").onclick = function(){

    localStorage.setItem(
        "userName",
        nameInput.value
    );

    localStorage.setItem(
        "medicine",
        medicineInput.value
    );

    localStorage.setItem(
        "darkMode",
        darkMode.checked
    );

    localStorage.setItem(
        "soundMode",
        soundMode.checked
    );

    if(darkMode.checked){

        document.body.classList.add("dark");

    }else{

        document.body.classList.remove("dark");

    }

    happySun("💛 تم حفظ الإعدادات");

    message.innerHTML =
    "✅ تم حفظ الإعدادات بنجاح";

};
    // ===============================
// SunDose v8
// Part 4
// تسجيل الجرعة
// ===============================

takeDose.onclick = function(){

    let today = new Date().toISOString().slice(0,10);

    if(today === lastDay){

        message.innerHTML =
        "💛 تم تسجيل الجرعة بالفعل اليوم.";

        happySun("🌞 الجرعة متسجلة بالفعل.");

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

    message.innerHTML =
    "🎉 أحسنتِ يا ملك، الجرعة اتسجلت.";

    happySun("☀️ ممتاز! كملي كده.");

    document.body.animate(
    [
        {transform:"scale(1)"},
        {transform:"scale(1.02)"},
        {transform:"scale(1)"}
    ],
    {
        duration:300
    });

};

// ===============================
// تشغيل أول مرة
// ===============================

loadSettings();

updateDashboard();

updateBadges();

buildCalendar();

updateQuote();
    // ===============================
// SunDose v8
// Part 5
// Splash Screen + Side Menu
// ===============================

// شاشة البداية
window.addEventListener("load", function () {

    setTimeout(function () {

        const splash = document.getElementById("splash");

        if (splash) {

            splash.classList.add("hide");

        }

    }, 2000);

});

// عناصر القائمة الجانبية
const menuBtn = document.getElementById("menuBtn");
const sideMenu = document.getElementById("sideMenu");
const closeMenu = document.getElementById("closeMenu");
const overlay = document.getElementById("overlay");

// فتح القائمة
if(menuBtn){

menuBtn.addEventListener("click",function(){

    sideMenu.classList.add("open");
    overlay.classList.add("show");

});

}

// غلق القائمة
function closeSideMenu(){

    sideMenu.classList.remove("open");
    overlay.classList.remove("show");

}

if(closeMenu){

closeMenu.addEventListener("click",closeSideMenu);

}

if(overlay){

overlay.addEventListener("click",closeSideMenu);

}

// زر ESC للكمبيوتر
document.addEventListener("keydown",function(e){

    if(e.key==="Escape"){

        closeSideMenu();

    }

});
    // ===============================
// SunDose v8
// Part 6
// الرسائل + الأصوات + الإشعارات
// ===============================

// تغيير رسالة الشمس كل فترة
setInterval(function(){

    const hour = new Date().getHours();

    if(hour >= 20){

        sunText.innerHTML = "🌙 متنسيش الجرعة قبل النوم.";

    }else if(hour >= 12){

        sunText.innerHTML = "☀️ أتمنى يومك يكون جميل.";

    }else{

        updateQuote();

    }

},8000);

// ===============================
// تشغيل صوت بسيط
// ===============================

function playClick(){

    if(!soundMode.checked) return;

    try{

        const audio = new Audio("click.mp3");

        audio.volume = 0.4;

        audio.play();

    }catch(e){}

}

document.querySelectorAll("button").forEach(function(btn){

    btn.addEventListener("click",playClick);

});

// ===============================
// إشعار يومي
// ===============================

if("Notification" in window){

    if(Notification.permission !== "granted"){

        Notification.requestPermission();

    }

}

// ===============================
// Service Worker
// ===============================

if("serviceWorker" in navigator){

    navigator.serviceWorker
    .register("service-worker.js")
    .catch(function(err){

        console.log(err);

    });

}

console.log("✅ SunDose v8 Loaded Successfully");
