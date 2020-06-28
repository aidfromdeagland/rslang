import { shuffle, randomInteger } from '../../../utils/utils';
import { WordService } from '../../../services/wordServices';
import { fileResource } from '../../../constants/globalConstants';

export class Repository {
    constructor(group, page) {
        this.group = group;
        this.page = page;
        this.gameWordCount = 10;
        this.indexWord = 0;
        this.loadData();
    }

    async loadData() {
        const words = shuffle(await WordService.getWords(this.group, this.page));
        this.words = words;
        this.gameWords = words.slice(this.gameWordCount);
        // this.loadNextWord();
        this.word = this.gameWords[this.indexWord];
        if (this.loaded) {
            this.loaded();
        }
    }

    // loadNextWord() {
    //     this.nextWord = this.gameWords[this.indexWord + 1];
    //     if (!this.word) {
    //         this.word = this.nextWord;
    //         if (this.getWord) {
    //             this.getWord(this.word);
    //         }
    //         this.loadNextWord();
    //     }
    // }

    isHaveWord() {
        return this.indexWord < this.gameWordCount;
    }

    checkLoading(resolve) {
        if (this.word) {
            return true;
        }
        this.loaded = resolve;
        return false;
    }

    getWord() {
        return this.word;
    }

    getWordsForGame() {
        const gameWords = shuffle(this.words.filter((w) => w.id !== this.word.id)).slice(0, 4);
        gameWords.splice(randomInteger(3), 0, this.word);
        return gameWords;
    }

    getAudio() {
        return new Audio(fileResource + this.word.audio);
    }

    increment() {
        this.indexWord += 1;
        if (!this.isHaveWord()) {
            return false;
        }
        this.word = this.gameWords[this.indexWord];
        return true;
    }
}
