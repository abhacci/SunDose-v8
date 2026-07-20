"use strict";

/* ==========================
   Memory
========================== */

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

/* ==========================
   Elements
========================== */

const introCard = document.getElementById("introCard");

const genderQuestion = document.getElementById("genderQuestion");
const nameQuestion = document.getElementById("nameQuestion");
const birthQuestion = document.getElementById("birthQuestion");
const medicineQuestion = document.getElementById("medicineQuestion");

const maleBtn = document.getElementById("maleBtn");
const femaleBtn = document.getElementById("femaleBtn");

const userNameInput = document.getElementById("userNameInput");
const birthInput = document.getElementById("birthInput");
const medicineName = document.getElementById("medicineName");

const nextName = document.getElementById("nextName");
const nextBirth = document.getElementById("nextBirth");
const finishIntro = document.getElementById("finishIntro");

const speechText = document.getElementById("speechText");

const welcome = document.getElementById("welcome");

const takeDose = document.getElementById("takeDose");

const message = document.getElementById("message");
/* ==========================
   Main Sections
========================== */

const app = document.getElementById("app");

/* ==========================
   Hide App First
========================== */

app.hidden = true;

/* ==========================
   Sana Speak
========================== */

function sanaSay(text){

    speechText.textContent = text;

}

/* ==========================
   First Message
========================== */

sanaSay("🌞 أهلاً بك... اختار الأول إذا كنت ولد أو بنت 💛");
/* ==========================
   Gender
========================== */

maleBtn.onclick = function(){

    memory.gender = "male";

    localStorage.setItem("gender","male");

    genderQuestion.style.display = "none";

    nameQuestion.style.display = "block";

    sanaSay("💛 جميل... اكتب اسمك.");

};

femaleBtn.onclick = function(){

    memory.gender = "female";

    localStorage.setItem("gender","female");

    genderQuestion.style.display = "none";

    nameQuestion.style.display = "block";

    sanaSay("🌸 جميل... اكتبي اسمك.");

};
/* ==========================
   Name
========================== */

nextName.onclick = function(){

    if(userNameInput.value.trim() === ""){

        alert("اكتب اسمك أولاً");

        return;

    }

    memory.name = userNameInput.value.trim();

    localStorage.setItem("userName", memory.name);

    nameQuestion.style.display = "none";

    birthQuestion.style.display = "block";

    sanaSay("🎂 ممتاز... اختار تاريخ ميلادك.");

};
/* ==========================
   Birth Date
========================== */

nextBirth.onclick = function(){

    if(birthInput.value === ""){

        alert("اختر تاريخ الميلاد");

        return;

    }

    memory.birthDate = birthInput.value;

    localStorage.setItem("birthDate", memory.birthDate);

    birthQuestion.style.display = "none";

    medicineQuestion.style.display = "block";

    sanaSay("💊 آخر خطوة... اكتب اسم العلاج.");
};
