// =========================
// Sana Engine v3
// =========================

class Sana {

    constructor() {

        this.name = "سنا";

        this.bubble = document.getElementById("speechBubble");
        this.image = document.getElementById("sana");

    }

    say(text, time = 4000) {

        if (!this.bubble) return;

        this.bubble.classList.add("show");
        this.bubble.innerHTML = "";

        clearTimeout(this.timer);

        let i = 0;

        const typing = setInterval(() => {

            this.bubble.innerHTML += text.charAt(i);

            // حركة بسيطة لسنا أثناء الكلام
            if (this.image) {

                this.image.style.transform = "scale(1.03)";

                setTimeout(() => {

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
