import { backend } from '../constants/globalConstants';
import { ServiceError } from './serviceError';

export class UserService {
    static async registration(email, password) {
        const rawResponse = await fetch(`${backend}/users`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (rawResponse.ok) {
            const content = await rawResponse.json();
            return content; // { email: string; password: string; }
        }
        if (rawResponse.status === 422) {
            throw new ServiceError('Incorrect e-mail or password', rawResponse.status);
        }
        const errorText = await rawResponse.text();
        throw Error(errorText);
    }

    static async logIn(email, password) {
        const rawResponse = await fetch(`${backend}/signin`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (rawResponse.ok) {
            const content = await rawResponse.json();
            return content; // { message: string; token: string; userId: string; }
        }
        if (rawResponse.status === 403) {
            throw new ServiceError('Incorrect e-mail or password', rawResponse.status);
        }
        const errorText = await rawResponse.text();
        throw Error(errorText);
    }

    static async getUser(userId, token) {
        const rawResponse = await fetch(`${backend}/users/${userId}`, {
            method: 'GET',
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            },
        });

        if (rawResponse.ok) {
            const content = await rawResponse.json();
            return content; // { message: string; token: string; userId: string; }
        }
        if (rawResponse.status === 401) {
            throw new ServiceError('Access token is missing or invalid', rawResponse.status);
        }
        if (rawResponse.status === 404) {
            throw new ServiceError('User not found', rawResponse.status);
        }
        const errorText = await rawResponse.text();
        throw Error(errorText);
    }
}
