"use strict";

/* ==========================================
   Sana AI v10
========================================== */

const sanaImage=document.getElementById("sana");
const speechBubble=document.getElementById("speechBubble");
const speechText=document.getElementById("speechText");

const sana={

busy:false,

typingSpeed:35

};

const sanaMessages=[

"☀️ صباح الخير",

"💛 أنا معاك كل يوم",

"🌸 متنساش جرعتك",

"✨ الاستمرار هو سر النجاح",

"🌞 فخور بيك جدًا"

];
/* ==========================================
   Speak
========================================== */

function wait(ms){

return new Promise(resolve=>setTimeout(resolve,ms));

}

async function sanaSpeak(text){

if(sana.busy)return;

sana.busy=true;

speechBubble.style.display="block";

speechText.textContent="";

for(const ch of text){

speechText.textContent+=ch;

await wait(sana.typingSpeed);

}

await wait(2500);

speechBubble.style.display="none";

sana.busy=false;

}
/* ==========================================
   Sana Animation
========================================== */

function sanaState(state){

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

async function sanaTalk(text){

sanaState("talking");

await sanaSpeak(text);

sanaState("happy");

}
/* ==========================================
   Welcome
========================================== */

async function welcomeUser(){

const name=

localStorage.getItem("userName") || "";

if(name===""){

await sanaTalk("☀️ أهلاً بك في SunDose");

}else{

await sanaTalk("☀️ أهلاً "+name+" 💛");

}

}

window.addEventListener("load",async()=>{

await wait(1000);

welcomeUser();

});
/* ==========================================
   Random Messages
========================================== */

setInterval(async()=>{

if(sana.busy)return;

const text=

sanaMessages[

Math.floor(

Math.random()*sanaMessages.length

)

];

await sanaTalk(text);

},180000);
/* ==========================================
   Blink
========================================== */

setInterval(()=>{

sanaImage.classList.add("blink");

setTimeout(()=>{

sanaImage.classList.remove("blink");

},180);

},5000);

/* ==========================================
   Day Events
========================================== */

setInterval(async()=>{

if(sana.busy)return;

const hour=new Date().getHours();

if(hour>=22){

await sanaTalk("🌙 تصبح على خير");

}

else if(hour>=6 && hour<=10){

await sanaTalk("☀️ صباح الخير");

}

},600000);
/* ==========================================
   Intro Wizard
========================================== */

const introCard=document.getElementById("introCard");

const genderQuestion=document.getElementById("genderQuestion");
const nameQuestion=document.getElementById("nameQuestion");
const birthQuestion=document.getElementById("birthQuestion");
const medicineQuestion=document.getElementById("medicineQuestion");

const maleBtn=document.getElementById("maleBtn");
const femaleBtn=document.getElementById("femaleBtn");

const nextName=document.getElementById("nextName");
const nextBirth=document.getElementById("nextBirth");
const finishIntro=document.getElementById("finishIntro");

const userNameInput=document.getElementById("userNameInput");
const birthInput=document.getElementById("birthInput");
const medicineName=document.getElementById("medicineName");
maleBtn.onclick=function(){

localStorage.setItem("gender","male");

genderQuestion.style.display="none";

nameQuestion.style.display="block";

sanaTalk("💛 تشرفت بيك");

};

femaleBtn.onclick=function(){

localStorage.setItem("gender","female");

genderQuestion.style.display="none";

nameQuestion.style.display="block";

sanaTalk("💛 تشرفت بيكي");

};
nextName.onclick=function(){

if(userNameInput.value.trim()==""){

alert("اكتب اسمك");

return;

}

localStorage.setItem(
"userName",
userNameInput.value.trim()
);

nameQuestion.style.display="none";

birthQuestion.style.display="block";

sanaTalk("🎂 جميل جداً");
};
