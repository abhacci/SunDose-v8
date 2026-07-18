// =========================
// Sana Engine v2
// =========================

class Sana {

    constructor() {

        this.name = "سنا";

        this.bubble = document.getElementById("speechBubble");

    }

    say(text, time = 4000) {

        if (!this.bubble) return;

        this.bubble.innerHTML = text;

        this.bubble.classList.add("show");

        clearTimeout(this.timer);

        this.timer = setTimeout(() => {

            this.bubble.classList.remove("show");

        }, time);

    }

}

const sana = new Sana();
