import { backend } from '../constants/globalConstants';

export class Api {
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
        if (rawResponse.status === 422) throw Error('Incorrect e-mail or password');
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
        if (rawResponse.status === 403) throw Error('Incorrect e-mail or password');
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
        if (rawResponse.status === 401) throw Error('Access token is missing or invalid');
        if (rawResponse.status === 404) throw Error('User not found');
        const errorText = await rawResponse.text();
        throw Error(errorText);
    }
}
