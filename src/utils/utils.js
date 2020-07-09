import { MAX_SYMBOLS_IN_GAME_STATISTICS } from '../constants/globalConstants';

export const randomInteger = function randomInteger(max) {
    const random = Math.random() * (max + 1);
    return Math.floor(random);
};

export const shuffle = function shuffle(arrayInput) {
    const array = [...arrayInput];
    for (let i = array.length - 1; i > 0; i -= 1) {
        const j = Math.floor(randomInteger(i));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

export const arrayPopByKey = function arrayPopByKey(array, key, value) {
    const elementIndex = array.findIndex((o) => o[key] === value);
    const element = array[elementIndex];
    array.splice(elementIndex, 1);
    return element;
};

export const createIncArray = function createIncArray(count) {
    return [...Array(count).keys()];
};

export const getUniqueByKey = (array, key) => array
    .filter((v, i, a) => a.findIndex((t) => (t[key] === v[key])) === i);

const removeItemOnce = (arr, value) => {
    const index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
};

export const convertStatisticJson = (statistic) => {
    const statisticJson = JSON.stringify(statistic);
    if (statisticJson.length > 500) {
        // remove the worst result
        const getPrecent = statistic[0].Score
            ? (stat) => stat.Score
            : (stat) => stat.Correct / (stat.Correct + stat.Incorrect);
        const minResult = statistic.reduce((prev, current) => (
            (getPrecent(prev) < getPrecent(current))
                ? prev : current));
        removeItemOnce(statistic, minResult);
        return convertStatisticJson(statistic);
    }
    return statisticJson;
};
