import { shuffle, randomInteger } from '../../../utils/utils';
import { WordService } from '../../../services/wordServices';
import { SettingService } from '../../../services/settingServices';
import { fileResource, groupCount, pageCount } from '../../../constants/globalConstants';

export class Repository {
    static setNextGame(state) {
        const repositoryState = state;
        let { group, page } = repositoryState.currentSettings;
        page += 1;
        if (page >= pageCount) {
            page = 0;
            group += 1;
            if (group >= groupCount) {
                page = 0;
                group = 0;
            }
        }
        repositoryState.currentSettings.group = group;
        repositoryState.currentSettings.page = page;
        repositoryState.indexWord = 0;
        Repository.saveSettingsAudioCall(repositoryState.currentSettings);
        return repositoryState;
    }

    static async saveSettingsAudioCall(currentSettings) {
        try {
            const settings = await SettingService.get();
            settings.optional.audioCall = JSON.stringify(currentSettings);
            await SettingService.put(settings);
        } catch (error) {
            // TODO показать ошибку пользователю
        }
    }

    constructor(state) {
        this.state = state || {
            indexWord: 0,
            currentSettings: undefined,
            allWords: undefined, // все слова. Используются для формирования ошибочных вариантов
            gameWords: undefined, // слова, которые будут заданы
            loaded: undefined,
            step: undefined,
        };
    }

    get word() {
        return this.state.gameWords[this.state.indexWord];
    }

    async loadSettings(success) {
        try {
            const settings = await SettingService.get();
            this.state.currentSettings = JSON.parse(settings.optional.audioCall);
            this.state.step = 1 / this.state.currentSettings.wordCount;
            success(this.state.currentSettings);
        } catch (error) {
            // TODO показать ошибку пользователю
        }
    }

    async loadData() {
        const words = shuffle(await WordService.getWords(this.state.currentSettings.group,
            this.state.currentSettings.page));
        if (words[0].page !== this.state.currentSettings.page
            || words[0].group !== this.state.currentSettings.group) {
            return;
        }
        this.state.allWords = words;
        this.state.gameWords = words.slice(this.state.currentSettings.wordCount);
        if (this.state.loaded) {
            this.state.loaded();
        }
    }

    isHaveWord() {
        return this.state.indexWord < this.state.currentSettings.wordCount;
    }

    setLevel(newPage, newGroup) {
        const { page, group } = this.state.gameWords[0];
        if (page !== newPage || group !== newGroup) {
            this.state.currentSettings.page = newPage;
            this.state.currentSettings.group = newGroup;
            this.state.gameWords = undefined;
            this.loadData();
        }
    }

    checkLoaded(resolve) {
        if (this.state.gameWords) {
            resolve();
            return true;
        }
        this.state.loaded = resolve;
        return false;
    }

    getWord() {
        return this.word;
    }

    getWordsForGame() {
        const gameWords = shuffle(this.state.allWords.filter((w) => w.id !== this.word.id))
            .slice(0, 4);
        gameWords.splice(randomInteger(3), 0, this.word);
        return gameWords;
    }

    getAudio() {
        return new Audio(fileResource + this.word.audio);
    }

    getProgress() {
        return {
            currentPrecent: this.state.indexWord * this.state.step,
            step: this.state.step,
        };
    }

    increment() {
        this.state.indexWord += 1;
        if (!this.isHaveWord()) {
            return false;
        }
        return true;
    }
}
