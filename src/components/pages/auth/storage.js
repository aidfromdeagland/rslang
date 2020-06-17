export class Storage {
    // static privateStorage; { token: string; userId: string }

    // #region public methods

    static clearToken() {
        if (!Storage.settings) Storage.settings = {};
        Storage.settings.token = null;
        localStorage.setItem('rs-lang-31-settings', JSON.stringify(Storage.settings));
    }

    static saveUser(userId, token) {
        const settings = { userId, token };
        localStorage.setItem('rs-lang-31-settings', JSON.stringify(settings));
        Storage.privateStorage = settings;
    }

    // #endregion public methods

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
