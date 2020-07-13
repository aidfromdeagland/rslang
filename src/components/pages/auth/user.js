import { Storage } from './storage';
import { UserService } from '../../../services/userServices';

// class for use in services
export class User {
    static get userId() {
        return Storage.settings && Storage.settings.userId;
    }

    static get token() {
        return Storage.settings && Storage.settings.token;
    }

    static async checkToken(resolve, reject) {
        try {
            await UserService.getUser(User.userId, User.token);
            if (resolve) {
                resolve();
            }
        } catch (e) {
            if (reject) {
                reject();
            }
        }
    }

    static logOut() {
        Storage.clearToken();
    }
}
