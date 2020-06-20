import { backend } from '../constants/globalConstants';
import { User } from '../components/pages/auth/user';
import { ServiceError } from './serviceError';

export class SettingService {
    static createObject(wordsPerDay, testVal)/*: ISettings */ {
        return {
            wordsPerDay,
            optional: {
                testVal,
            },
        };
    }

    static async get() {
        const rawResponse = await fetch(`${backend}/users/${User.userId}/settings`, {
            method: 'GET',
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${User.token}`,
                Accept: 'application/json',
            },
        });
        if (rawResponse.ok) {
            const content = await rawResponse.json();
            return content; // ISettings
        }
        if (rawResponse.status === 401) {
            throw new ServiceError('Access token is missing or invalid', rawResponse.status);
        }
        if (rawResponse.status === 404) {
            throw new ServiceError('Statistics not found', rawResponse.status);
        }

        const errorText = await rawResponse.text();
        throw new ServiceError(errorText, rawResponse.status);
    }

    static async put(statistic /* ISettings */) {
        const rawResponse = await fetch(`${backend}/users/${User.userId}/settings`, {
            method: 'PUT',
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${User.token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(statistic),
        });
        if (rawResponse.ok) {
            const content = await rawResponse.json();
            return content;
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

// interface ISettings {
//     wordsPerDay: number,
//     optional: IOptional,
// }

// interface IOptional {
// }
