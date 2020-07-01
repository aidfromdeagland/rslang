import { gameStartColor, gameDiffColor } from './constants';

export const getDifferentColor = (proccent) => {
    const color = {
        r: gameStartColor.r + Math.round(gameDiffColor.r * proccent),
        g: gameStartColor.g + Math.round(gameDiffColor.g * proccent),
        b: gameStartColor.b + Math.round(gameDiffColor.b * proccent),
    };
    return `rgb(${color.r}, ${color.g}, ${color.b})`;
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
