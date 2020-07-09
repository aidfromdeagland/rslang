import { backend } from '../constants/globalConstants';
import { User } from '../components/pages/auth/user';
import { ServiceError } from './serviceError';

export class StatisticService {
    static createObject(learnedWords, testVal)/*: IStatistic */ {
        return {
            learnedWords,
            optional: {
                testVal,
            },
        };
    }

    static createGameStat(correct, incorrect, group, page, score)/*: IStatisticGame */ {
        const result = { Date: Date.now(), Correct: correct, Incorrect: incorrect };
        if (group !== undefined) {
            result.Group = group;
        }
        if (page !== undefined) {
            result.Page = page;
        }
        if (score !== undefined) {
            result.Score = score;
        }

        return result;
    }

    static async get() {
        const rawResponse = await fetch(`${backend}/users/${User.userId}/statistics`, {
            method: 'GET',
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${User.token}`,
                Accept: 'application/json',
            },
        });
        if (rawResponse.ok) {
            const content = await rawResponse.json();
            return content; // IStatistic
        }
        if (rawResponse.status === 401) {
            throw new ServiceError('Access token is missing or invalid', rawResponse.status);
        }
        if (rawResponse.status === 404) {
            return {
                learnedWords: 0,
                optional: {
                },
            };
        }

        const errorText = await rawResponse.text();
        throw new ServiceError(errorText, rawResponse.status);
    }

    static async put(statistic /* IStatistic */) {
        const save = statistic;
        delete save.id;
        const rawResponse = await fetch(`${backend}/users/${User.userId}/statistics`, {
            method: 'PUT',
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${User.token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(save),
        });
        if (rawResponse.ok) {
            const content = await rawResponse.json();
            return content; // IStatistic
        }
        if (rawResponse.status === 400) {
            throw new ServiceError('Bad request', rawResponse.status);
        }
        if (rawResponse.status === 401) {
            throw new ServiceError('Access token is missing or invalid', rawResponse.status);
        }

        const errorText = await rawResponse.text();
        throw new ServiceError(errorText, rawResponse.status);
    }
}

// interface IStatistic {
//     id: string,
//     learnedWords: number,
//     optional: IOptional,
// }

// interface IOptional {
//    AudioCall: JSON(IStatisticGame[]),
//    Savanna: JSON(IStatisticGame[]),
//    Puzzle: JSON(IStatisticGame[]),
// }

// interface IStatisticGame {
//    Date:number,
//    Group: number,
//    Page: number?,
//    Correct: number,
//    Incorrect: number,
//    Score: number?,
// }
