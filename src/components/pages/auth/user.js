import { Storage } from './storage';
import { Api } from '../../../services/userServices';

// class for use in services
export class User {
    static get userId() {
        return Storage.settings && Storage.settings.userId;
    }

    static get token() {
        return Storage.settings && Storage.settings.token;
    }

    static async checkToken() {
        try {
            await Api.getUser(User.userId, User.token);
            return true;
        } catch (e) {
            return false;
        }
    }

    static logOut() {
        Storage.clearToken();
    }
}
