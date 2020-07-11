export const backend = 'https://afternoon-falls-25894.herokuapp.com';

export const AUDIO_URL = 'https://raw.githubusercontent.com/mrJozhkinKot/rslang-data/master/';
export const ALL_WORDS_COUNT = 3600;
export const GROUP_WORDS_COUNT = 600;
export const GROUP_COUNT = 6;
export const PAGE_COUNT = 30;
// 1'250 * 6 games = 7'500 + name games = 7'600. 10'000 - 7'600 = 2'400 for main game
export const MAX_SYMBOLS_IN_GAME_STATISTICS = 1250;
export const MEDIA_PREFIX_URL = 'https://raw.githubusercontent.com/aidfromdeagland/rslang-data/master/';
export const settingsDefault = {
    wordsPerDay: 20,
    optional: {
        totalWords: 20,
        newWords: 10,
        showWordTranslate: true,
        showSentenceMeaning: true,
        showSentenceExample: true,
        showWordTranscription: true,
        showWordImage: true,
        showSentencesTranslate: true,
        showAnswerButton: true,
        showDeleteButton: true,
        showDifficultButton: true,
        autoPronunciation: true,
        audioCall: '{"modeGame":1,"wordCount":10,"colorStart":{"r":9,"g":44,"b":112},"colorEnd":{"r":224,"g":141,"b":157},"group":0,"page":0}',
        speakit: '{"group":1,"page":1}',
        hangman: '{"group":1,"page":1}',
        gamePuzzle: '{"level":1,"page":1}',
        savannah: '{"group":0,"page":0}',
    },
};

export const statisticsDefault = {
    learnedWords: 0,
    optional: {
    },
};

export const totalLearnedWordsQuery = { 'userWord.optional.isDeleted': false };
