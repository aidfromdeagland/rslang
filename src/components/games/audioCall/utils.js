import { gameStartColor, gameDiffColor } from './constants';

export const getDifferentColor = (proccent) => {
    const color = {
        r: gameStartColor.r + Math.round(gameDiffColor.r * proccent),
        g: gameStartColor.g + Math.round(gameDiffColor.g * proccent),
        b: gameStartColor.b + Math.round(gameDiffColor.b * proccent),
    };
    return `rgb(${color.r}, ${color.g}, ${color.b})`;
};
