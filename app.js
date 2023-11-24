class AlarmClock {
    constructor() {
        this.alarmTime = null;
        this.myAudio = this.buildAudio();
        this.init();
    }

    init() {
        this.startTime();
        this.hrsMenu();
        this.minsMenu();
        this.secsMenu();
        this.soundMenu();
        this.bindEvents();
    }

    startTime() {
        setInterval(() => {
            const today = new Date();
            const h = today.getHours();
            const m = today.getMinutes();
            const s = today.getSeconds();
            const time = this.checkZero(h) + ":" + this.checkZero(m) + ":" + this.checkZero(s);
            document.getElementById("time").innerHTML = time;

            if (this.alarmTime && time === this.alarmTime) {
                this.playAlarmSound();
            }
        }, 1000);
    }

    checkZero(i) {
        return i < 10 ? "0" + i : i;
    }

    hrsMenu() {
        this.populateMenu("alarmHrs", 23);
    }

    minsMenu() {
        this.populateMenu("alarmMins", 59);
    }

    secsMenu() {
        this.populateMenu("alarmSecs", 59);
    }

    soundMenu() {
        const select = document.getElementById("mySelect");
        const sounds = [
            { name: "Birds", url: "https://www.freespecialeffects.co.uk/soundfx/various/forest.wav" },
            // ... (other sounds)
        ];

        for (const sound of sounds) {
            this.addOption(select, sound.name, sound.url);
        }
    }

    buildAudio() {
        const myDiv = document.getElementById("myDiv");
        const myAudio = document.createElement("audio");
        myAudio.id = "myAudio";
        myDiv.appendChild(myAudio);
        return myAudio;
    }

    addOption(select, text, value) {
        const option = document.createElement("option");
        option.text = text;
        option.value = value;
        select.add(option);
    }

    populateMenu(id, maxValue) {
        const select = document.getElementById(id);

        for (let i = 0; i <= maxValue; i++) {
            const value = this.checkZero(i);
            this.addOption(select, value, value);
        }
    }

    bindEvents() {
        document.getElementById("mySetButton").addEventListener("click", () => this.setAlarm());
        document.getElementById("myClearButton").addEventListener("click", () => this.clearAlarm());
        document.getElementById("mySelect").addEventListener("change", () => this.getSrc());
    }

    setAlarm() {
        const hour = document.getElementById("alarmHrs");
        const min = document.getElementById("alarmMins");
        const sec = document.getElementById("alarmSecs");

        const selectedHour = hour.options[hour.selectedIndex].value;
        const selectedMin = min.options[min.selectedIndex].value;
        const selectedSec = sec.options[sec.selectedIndex].value;

        this.alarmTime = this.checkZero(selectedHour) + ":" + this.checkZero(selectedMin) + ":" + this.checkZero(selectedSec);

        this.disableInputs(true);
    }

    disableInputs(disable) {
        document.getElementById('alarmHrs').disabled = disable;
        document.getElementById('alarmMins').disabled = disable;
        document.getElementById('alarmSecs').disabled = disable;
        document.getElementById('mySelect').disabled = disable;
    }

    playAlarmSound() {
        this.myAudio.src = document.getElementById("mySelect").value;
        this.myAudio.play();
        this.myAudio.loop = true;
    }

    clearAlarm() {
        this.alarmTime = null;
        this.disableInputs(false);
        this.myAudio.pause();
    }

    getSrc() {
        this.myAudio.src = document.getElementById("mySelect").value;
    }
}

// Inisialisasi objek AlarmClock
const alarmClock = new AlarmClock();
