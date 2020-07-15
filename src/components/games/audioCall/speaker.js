export class Speaker {
    constructor() {
        this.message = new SpeechSynthesisUtterance();
        this.message.volume = 1;
        this.message.lang = 'ru-RU';

        this.volumeStep = 0.1;
        this.speechSynthesis = window.speechSynthesis
            || window.mozspeechSynthesis || window.webkitspeechSynthesis;
    }

    speak(text) {
        this.message.text = text;
        this.speechSynthesis.speak(this.message);
    }

    changeLanguage(language) {
        this.message.lang = language;
    }

    upVolume() {
        this.message.volume += this.volumeStep;
    }

    downVolume() {
        this.message.volume -= this.volumeStep;
    }
}
