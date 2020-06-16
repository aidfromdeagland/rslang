export class Settings {
  static privateSettings; // { token: string; userId: string }

  //#region public methods

  static get userId() {
    return Settings.settings && Settings.settings.userId;
  }

  static get token() {
    return Settings.settings && Settings.settings.token;
  }

  static set token(value) {
    if (!Settings.settings) Settings.settings = {};
    Settings.settings.token = value;
    localStorage.setItem('rs-lang-31-settings', JSON.stringify(Settings.settings));
  }

  static saveSettings(userId, token) {
    const settings = { userId, token }
    localStorage.setItem('rs-lang-31-settings', JSON.stringify(settings));
    Settings.privateSettings = settings;
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
