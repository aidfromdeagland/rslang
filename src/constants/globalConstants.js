export const backend = 'https://afternoon-falls-25894.herokuapp.com';
export const ALL_WORDS_COUNT = 3600;
export const GROUP_WORDS_COUNT = 600;
export const GROUP_COUNT = 6;
export const PAGE_COUNT = 30;
// 1'250 * 6 games = 7'500 + name games = 7'600. 10'000 - 7'600 = 2'400 for main game
export const MAX_SYMBOLS_IN_GAME_STATISTICS = 1250;
export const MEDIA_PREFIX_URL = 'https://raw.githubusercontent.com/aidfromdeagland/rslang-data/master/';
export const settingsDefault = {
    optional: {
        word: true,
        textMeaning: true,
        textExample: true,
        showPicture: true,
        showTranscription: true,
        numberLearnWord: 10,
        numberLearnCard: 10,
        audioCall: '{modeGame:1,"wordCount":10,"colorStart":{"r":9,"g":44,"b":112},"colorEnd":{"r":224,"g":141,"b":157},"group":0,"page":0}',
    },
};
