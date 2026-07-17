 // =========================
// Sana Engine v1
// =========================

class Sana {

    constructor() {
        this.name = "سنا";
    }

    say(text) {

        const bubble = document.getElementById("speechBubble");

        if (!bubble) return;

        bubble.innerHTML = text;

        bubble.classList.add("show");

        setTimeout(() => {

            bubble.classList.remove("show");

        }, 4000);

    }

}

const sana = new Sana();
