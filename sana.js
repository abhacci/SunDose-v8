// ==========================================
// Sana AI Engine v2
// ==========================================

class Sana{

    constructor(){

        this.name="سنا";

        this.state="happy";

        this.isTalking=false;

    }

    async think(time=1200){

        this.state="thinking";

        const img=document.getElementById("sana");

        if(img){

            img.src="images/thinking.png";

        }

        return new Promise(resolve=>{

            setTimeout(resolve,time);

        });

    }

    async happy(){

        this.state="happy";

        const img=document.getElementById("sana");

        if(img){

            img.src="images/happy.png";

        }

    }

    async sleep(){

        this.state="sleep";

        const img=document.getElementById("sana");

        if(img){

            img.src="images/sleep.png";

        }

    }

    async talk(text){

        this.isTalking=true;

        await this.think(700);

        await sanaSpeak(text);

        this.isTalking=false;

        await this.happy();

    }

}

const sana=new Sana();
                    this.image.style.transform = "scale(1)";

                }, 80);

            }

            i++;

            if (i >= text.length) {

                clearInterval(typing);

                this.timer = setTimeout(() => {

                    this.bubble.classList.remove("show");

                }, time);

            }

        }, 45);

    }

}

const sana = new Sana();
