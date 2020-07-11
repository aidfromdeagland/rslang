/* eslint-disable no-underscore-dangle */
import { shuffle, randomInteger, getUniqueByKey } from '../../../utils/utils';
import { WordService } from '../../../services/wordServices';
import { SettingService } from '../../../services/settingServices';
import {
    MEDIA_PREFIX_URL, totalLearnedWordsQuery,
    ALL_WORDS_COUNT, GROUP_WORDS_COUNT, GROUP_COUNT, PAGE_COUNT,
} from '../../../constants/globalConstants';
import { MAX_INDEX_QUEST_WORDS, MAX_INDEX_QUEST_WORDS_NOT_CORRECT, MODE_GAME } from './constants';
import { levenshtein, getDifferentColor } from './utils';

export class Repository {
    static async setNextGame(state) {
        const repositoryState = state;
        repositoryState.indexWord = 0;

        if (state.loadedMode === MODE_GAME['User words']) {
            return state;
        }

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
        Repository.saveSettingsAudioCall(repositoryState.currentSettings);
        return repositoryState;
    }

    static async saveSettingsAudioCall(currentSettings) {
        const settings = await SettingService.get();
        settings.optional.audioCall = JSON.stringify(currentSettings);
        await SettingService.put(settings);
    }

    constructor(state, changeState) {
        this.state = state || {
            indexWord: 0,
            currentSettings: undefined, // '{"wordCount":n,"group":n,"page":n,
            // "colorStart":{"r":n,"g":n,"b":n},"colorEnd":{"r":n,"g":n,"b":n}}',
            allWords: undefined, // все слова. Используются для формирования ошибочных вариантов
            gameWords: undefined, // слова, которые будут заданы в процессе игры
            loadedFunc: undefined,
            step: undefined,
            load: {
                loading: {},
                loaded: {},
            },
        };

        this.changeState = changeState || (() => {});

        this.repositoryId = Date.now();
    }

    // #region Settings

    async loadSettings(success) {
        const settings = await SettingService.get();
        this.setSettings(JSON.parse(settings.optional.audioCall));
        success(this.state.currentSettings);
    }

    async setNewSettings(currentSettings, installedSettings) {
        const newCurrentSettings = currentSettings;
        if (newCurrentSettings.page === undefined) {
            newCurrentSettings.page = this.state.currentSettings.page || 0;
            newCurrentSettings.group = this.state.currentSettings.group || 0;
        }
        if (JSON.stringify(newCurrentSettings) === JSON.stringify(this.state.currentSettings)) {
            return;
        }
        if (newCurrentSettings.modeGame !== this.state.currentSettings.modeGame
            || newCurrentSettings.wordCount !== this.state.currentSettings.wordCount) {
            this.repositoryId = Date.now();
        }
        this.setSettings(newCurrentSettings);
        installedSettings(this.state);

        await Repository.saveSettingsAudioCall(newCurrentSettings);
        await this.loadData();
    }

    // #region private

    setSettings(currentSettings) {
        this.state.currentSettings = currentSettings;
        this.state.step = 1 / this.state.currentSettings.wordCount;
        const { colorStart, colorEnd } = this.state.currentSettings;
        this.state.colorDiff = {
            r: colorEnd.r - colorStart.r,
            g: colorEnd.g - colorStart.g,
            b: colorEnd.b - colorStart.b,
        };
    }

    // #endregion private

    // #endregion Settings

    // #region Game

    getWordsForGame() {
        const word = this.getWord();
        const { wordTranslate } = word;
        let gameWords = this.state.allWords.filter((w) => w.wordTranslate !== wordTranslate);
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
        const {
            currentSettings: { colorStart }, colorDiff, step, indexWord,
        } = this.state;
        const startPrecent = indexWord * step;
        const startRoundColor = getDifferentColor(startPrecent,
            colorStart, colorDiff);
        const endPrecent = startPrecent + step;
        const endRoundColor = getDifferentColor(endPrecent,
            colorStart, colorDiff);
        return `linear-gradient(${endRoundColor}, ${startRoundColor})`;
    }

    increment() {
        this.state.indexWord += 1;
        if (!this.isHaveWord()) {
            return false;
        }
        return true;
    }

    // #region private

    getWord() {
        return this.state.gameWords[this.state.indexWord];
    }

    isHaveWord() {
        return this.state.indexWord < this.state.currentSettings.wordCount;
    }

    // #endregion private

    // #endregion Game

    // #region Load data

    async setLevel(newPage, newGroup) {
        this.state.currentSettings.page = newPage;
        this.state.currentSettings.group = newGroup;
        this.loadData();
    }

    async loadData() {
        if (this.isActualLoading()) {
            return;
        }

        this.state.load.loading.repositoryId = this.repositoryId;
        if (this.state.currentSettings.modeGame === MODE_GAME['User words']) {
            await this.loadUserWords();
        } else {
            await this.loadLevelWords();
        }

        if (this.state.loadedFunc && this.isActualLoaded()) {
            const { loadedFunc } = this.state;
            this.state.loadedFunc = undefined;
            loadedFunc();
        }
    }

    checkLoaded(resolve) {
        if (this.isActualLoaded()) {
            resolve();
            return true;
        }
        this.state.loadedFunc = resolve;
        return false;
    }

    // #region private

    isActualLoading() {
        const { currentSettings } = this.state;
        const loadingSettings = this.state.load.loading;

        return loadingSettings.modeGame === MODE_GAME['All words']
            ? currentSettings.wordCount === loadingSettings.wordCount
                && currentSettings.group === loadingSettings.group
                && currentSettings.page === loadingSettings.page
                && this.repositoryId === loadingSettings.repositoryId
            : currentSettings.wordCount === loadingSettings.wordCount
                && this.repositoryId === loadingSettings.repositoryId;
    }

    isActualLoaded() {
        const { currentSettings } = this.state;
        const loadedSettings = this.state.load.loaded;

        return loadedSettings.modeGame === MODE_GAME['All words']
            ? currentSettings.wordCount === loadedSettings.wordCount
                && currentSettings.group === loadedSettings.group
                && currentSettings.page === loadedSettings.page
                && this.repositoryId === loadedSettings.repositoryId
            : currentSettings.wordCount === loadedSettings.wordCount
                && this.repositoryId === loadedSettings.repositoryId;
    }

    async loadUserWords() {
        const { wordCount } = this.state.currentSettings;
        this.state.load.loading = {
            wordCount, modeGame: MODE_GAME['User words'], repositoryId: this.repositoryId,
        };
        const userWords = await WordService.getUserAggWords('', totalLearnedWordsQuery, ALL_WORDS_COUNT);
        if (userWords[0].paginatedResults.length >= wordCount) {
            this.changeState();

            if (!this.state.allWords || this.state.allWords.length !== ALL_WORDS_COUNT) {
                const words = await WordService.getUserAggWords('', '', ALL_WORDS_COUNT);
                this.state.allWords = words[0].paginatedResults;
            }
            this.state.gameWords = shuffle(userWords[0].paginatedResults).slice(0, wordCount);
            this.state.load.loaded = {
                wordCount, modeGame: MODE_GAME['User words'], repositoryId: this.repositoryId,
            };
        } else {
            // words are not enough for a user words game
            await this.loadLevelWords();
        }
    }

    async loadLevelWords() {
        const { wordCount, group, page } = this.state.currentSettings;
        const lastLoading = this.state.load.loading;
        this.state.load.loading = {
            wordCount, group, page, modeGame: MODE_GAME['All words'], repositoryId: this.repositoryId,
        };
        this.changeState();

        if (lastLoading.group !== group) {
            this.state.allWords = undefined;
            this.state.gameWords = undefined;
            const aggWords = await WordService.getUserAggWords(group, '', GROUP_WORDS_COUNT);
            const words = aggWords[0].paginatedResults;
            this.state.allWords = words;
            this.state.load.loaded.group = group;
            this.state.load.loaded = {
                group, modeGame: MODE_GAME['All words'], repositoryId: this.repositoryId,
            };
            if (this.state.load.loading.page !== this.state.currentSettings.page) {
                this.state.load.loading.page = this.state.currentSettings.page;
            }
        }
        if (this.state.load.loaded.group === this.state.load.loading.group) {
            const loadingPage = this.state.currentSettings.page;
            this.state.gameWords = undefined;
            this.state.gameWords = shuffle(
                this.state.allWords.filter((w) => w.page === loadingPage),
            ).slice(0, wordCount);
            this.state.load.loaded.wordCount = wordCount;
            this.state.load.loaded.page = loadingPage;
            this.state.load.loaded.repositoryId = this.repositoryId;
        }
    }

    // #endregion private

    // #endregion Load data
}
