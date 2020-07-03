/* eslint-disable no-underscore-dangle */
import { shuffle, randomInteger, getUniqueByKey } from '../../../utils/utils';
import { WordService } from '../../../services/wordServices';
import { SettingService } from '../../../services/settingServices';
import {
    MEDIA_PREFIX_URL, WORDS_COUNT, GROUP_COUNT, PAGE_COUNT,
} from '../../../constants/globalConstants';
import { MAX_INDEX_QUEST_WORDS, MAX_INDEX_QUEST_WORDS_NOT_CORRECT } from './constants';
import { levenshtein, getDifferentColor } from './utils';

export class Repository {
    static setNextGame(state) {
        const repositoryState = state;
        let { group, page } = repositoryState.currentSettings;
        page += 1;
        if (page >= PAGE_COUNT) {
            page = 0;
            group += 1;
            if (group >= GROUP_COUNT) {
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
            currentSettings: undefined, // '{"wordCount":n,"group":n,"page":n,
            // "colorStart":{"r":n,"g":n,"b":n},"colorEnd":{"r":n,"g":n,"b":n}}',
            allWords: undefined, // все слова. Используются для формирования ошибочных вариантов
            gameWords: undefined, // слова, которые будут заданы в процессе игры
            loaded: undefined,
            step: undefined,
            loadedGroup: undefined,
            loadedPage: undefined,
        };
    }

    async loadSettings(success) {
        try {
            const settings = await SettingService.get();
            this.state.currentSettings = JSON.parse(settings.optional.audioCall);
            this.state.step = 1 / this.state.currentSettings.wordCount;
            const { colorStart, colorEnd } = this.state.currentSettings;
            this.state.colorDiff = {
                r: colorEnd.r - colorStart.r,
                g: colorEnd.g - colorStart.g,
                b: colorEnd.b - colorStart.b,
            };
            success(this.state.currentSettings);
        } catch (error) {
            // TODO показать ошибку пользователю
        }
    }

    async loadData() {
        const { page, group, wordCount } = this.state.currentSettings;
        const { loadedGroup, loadedPage, loaded } = this.state;

        const isLoadingPage = loadedPage !== page || loadedGroup !== group;
        if (loadedGroup !== group) {
            this.state.allWords = undefined;
            this.state.gameWords = undefined;
            // в дальнейшем в бэке скорее всего уберут возможность брать всё,
            // поэтому сразу расчитываю, что есть только слова по группам
            const aggWords = await WordService.getUserAggWords(group, '', WORDS_COUNT);
            const words = aggWords[0].paginatedResults;
            this.state.allWords = words.filter((w) => w.group === group);
            this.state.loadedGroup = group;
        }
        if (isLoadingPage) {
            this.state.gameWords = undefined;
            this.state.gameWords = shuffle(
                this.state.allWords.filter((w) => w.page === page),
            ).slice(wordCount);
            this.state.loadedPage = page;
        }
        if (this.state.loaded) {
            this.state.loaded = undefined;
            loaded();
        }
    }

    isHaveWord() {
        return this.state.indexWord < this.state.currentSettings.wordCount;
    }

    setLevel(newPage, newGroup) {
        this.state.currentSettings.page = newPage;
        this.state.currentSettings.group = newGroup;
        this.loadData();
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
        return this.state.gameWords[this.state.indexWord];
    }

    getWordsForGame() {
        const word = this.getWord();
        const { wordTranslate } = word;
        const wordId = word.id;
        let gameWords = this.state.allWords.filter((w) => w.id !== wordId);
        gameWords = getUniqueByKey(gameWords, 'wordTranslate');
        gameWords = gameWords.sort((a, b) => levenshtein(a.wordTranslate, wordTranslate)
            - levenshtein(b.wordTranslate, wordTranslate));
        gameWords = gameWords.slice(0, MAX_INDEX_QUEST_WORDS);
        gameWords.splice(randomInteger(MAX_INDEX_QUEST_WORDS_NOT_CORRECT), 0, word);
        return gameWords;
    }

    getAudio() {
        return new Audio(MEDIA_PREFIX_URL + this.getWord().audio);
    }

    getBackgroundProgress() {
        const startPrecent = this.state.indexWord * this.state.step;
        const startRoundColor = getDifferentColor(startPrecent,
            this.state.colorStart, this.state.colorEnd);
        const endPrecent = startPrecent + this.state.step;
        const endRoundColor = getDifferentColor(endPrecent,
            this.state.colorStart, this.state.colorEnd);
        return `linear-gradient(${startRoundColor}, ${endRoundColor})`;
    }

    increment() {
        this.state.indexWord += 1;
        if (!this.isHaveWord()) {
            return false;
        }
        return true;
    }
}
