export class Settings {
  static privateSettings; // { token: string; userId: string }

  //#region public methods

  static get userId() {
    return Settings.settings && Settings.settings.userId;
  }

  static get token() {
    return Settings.settings && Settings.settings.token;
  }

  static saveSettings(userId, token) {
    const settings = { userId, token }
    localStorage.setItem('rs-lang-31-settings', JSON.stringify(settings));
    Settings.privateSettings = settings;
  }

  static clearSettings() {
    localStorage.removeItem('rs-lang-31-settings');
    Settings.privateSettings = undefined;
  }

  //#endregion public methods

  static get settings() {
    if (!Settings.privateSettings) Settings.privateSettings = Settings.loadSettings();
    return Settings.privateSettings;
  }

  static loadSettings() {
    const settings = localStorage.getItem('rs-lang-31-settings');
    if (settings) {
      return JSON.parse(settings);
    }
    return null;
  }
}
