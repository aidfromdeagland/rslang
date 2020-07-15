import { MODE_GAME_LANG } from './constants';

export const tryExecute = async (funcExecute, errorFunc) => {
    try {
        await funcExecute();
    } catch (error) {
        errorFunc(error, funcExecute);
    }
};

export const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
    } : null;
};

// eslint-disable-next-line no-bitwise
export const rgbToHex = (rgb) => `#${((1 << 24) + (rgb.r << 16) + (rgb.g << 8) + rgb.b).toString(16).slice(1)}`;

export const getKeyByValue = (object, value) => Object.keys(object)
    .find((key) => object[key] === value);

export const getDifferentColor = (proccent, startColor, diffColor) => {
    const color = {
        r: startColor.r + Math.round(diffColor.r * proccent),
        g: startColor.g + Math.round(diffColor.g * proccent),
        b: startColor.b + Math.round(diffColor.b * proccent),
    };
    return `rgb(${color.r}, ${color.g}, ${color.b})`;
};

export const getTextWord = (word, modeLangGame, isQuest) => {
    if (modeLangGame === MODE_GAME_LANG['English to russian']) {
        return isQuest ? word.word : word.wordTranslate;
    }
    return isQuest ? word.wordTranslate : word.word;
};

/**
* @param {string} s1 Исходная строка
* @param {string} s2 Сравниваемая строка
* @param {object} [costs] Веса операций { [replace], [replaceCase], [insert], [remove] }
* @return {number} Расстояние Левенштейна
* https://ru.wikibooks.org/wiki/Реализации_алгоритмов/Расстояние_Левенштейна#JavaScript
*/
export const levenshtein = (s1, s2, costsInput) => {
    let i; let j; let ch; let chl; let ii; let ii2; let cost;
    const l1 = s1.length;
    const l2 = s2.length;

    const costs = costsInput || {};
    const cr = costs.replace || 1;
    const cri = costs.replaceCase || costs.replace || 1;
    const ci = costs.insert || 1;
    const cd = costs.remove || 1;

    const cutHalf = Math.max(l1, l2);
    let flip = cutHalf;

    const minCost = Math.min(cd, ci, cr);
    const minD = Math.max(minCost, (l1 - l2) * cd);
    const minI = Math.max(minCost, (l2 - l1) * ci);
    const buf = new Array((cutHalf * 2) - 1);

    for (i = 0; i <= l2; i += 1) {
        buf[i] = i * minD;
    }

    for (i = 0; i < l1; i += 1, flip = cutHalf - flip) {
        ch = s1[i];
        chl = ch.toLowerCase();

        buf[flip] = (i + 1) * minI;

        ii = flip;
        ii2 = cutHalf - flip;

        for (j = 0; j < l2; j += 1, ii += 1, ii2 += 1) {
            if (ch === s2[j]) {
                cost = 0;
            } else if (chl === s2[j].toLowerCase()) {
                cost = cri;
            } else {
                cost = cr;
            }
            buf[ii + 1] = Math.min(buf[ii2 + 1] + cd, buf[ii] + ci, buf[ii2] + cost);
        }
    }
    return buf[l2 + cutHalf - flip];
};
