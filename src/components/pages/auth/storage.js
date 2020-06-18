export class Storage {
    // static privateStorage; { token: string; userId: string; login?: string }

    static get login() {
        return Storage.settings && Storage.settings.login;
    }

    static clearToken() {
        if (!Storage.privateStorage) Storage.privateStorage = {};
        Storage.privateStorage.token = null;
        localStorage.setItem('rs-lang-31-settings', JSON.stringify(Storage.privateStorage));
    }

    static clearUser() {
        Storage.privateStorage = undefined;
        localStorage.removeItem('rs-lang-31-settings');
    }

    static saveUser(userId, token, login) {
        const settings = { userId, token, login };
        localStorage.setItem('rs-lang-31-settings', JSON.stringify(settings));
        Storage.privateStorage = settings;
    }

    static get settings() {
        if (!Storage.privateStorage) Storage.privateStorage = Storage.loadStorage();
        return Storage.privateStorage;
    }

    static loadStorage() {
        const settings = localStorage.getItem('rs-lang-31-settings');
        if (settings) {
            return JSON.parse(settings);
        }
        return null;
    }
}
