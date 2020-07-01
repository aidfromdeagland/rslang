export const gameProgress = { start: 1, game: 2, result: 3 };
export const gameWordCount = 5;
export const maxCountQuestWords = 5;
export const maxIndexQuestWords = maxCountQuestWords - 1;
export const maxIndexQuestWordsNotCorrect = maxIndexQuestWords - 1;

export const gameStartColor = { r: 9, g: 44, b: 112 };
const gameEndColor = { r: 224, g: 141, b: 157 };
export const gameDiffColor = {
    r: gameEndColor.r - gameStartColor.r,
    g: gameEndColor.g - gameStartColor.g,
    b: gameEndColor.b - gameStartColor.b,
};
