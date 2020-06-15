export default class Settings {
  static settings;

  //#region public methods

  static getSettings() {
    if (!Settings.settings) Settings.settings = Settings.loadSettings();
    if (!Settings.settings) Settings.settings = Settings.defaultSettings();
    return Settings.settings; // { token	string; userId	string }
  }

  static saveSettings(userId, token) {
    const settings = { userId, token }
    localStorage.setItem('rs-lang-31-settings', JSON.stringify(settings));
    Settings.settings = settings;
  }

  static clearSettings() {
    localStorage.removeItem('rs-lang-31-settings');
    Settings.settings = Settings.defaultSettings();
  }

  //#endregion public methods

  static loadSettings() {
    const settings = localStorage.getItem('rs-lang-31-settings');
    if (settings) {
      return JSON.parse(settings);
    }
    return null;
  }

  static defaultSettings() {
    return {
      userId: undefined,
      token: undefined,
    };
  }
}
