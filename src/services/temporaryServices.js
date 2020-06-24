export const randomizeSettingsValues = (settingsObject) => {
    const randomizedSettings = { ...settingsObject };
    const mainSettingsKeys = Object.keys(randomizedSettings.mainSettings);
    const additionalSettingsKeys = Object.keys(randomizedSettings.additionalSettings);
    mainSettingsKeys.forEach((key) => {
        randomizedSettings.mainSettings[key] = !!Math.round(Math.random());
    });
    additionalSettingsKeys.forEach((key) => {
        randomizedSettings.additionalSettings[key] = !!Math.round(Math.random());
    });
    return randomizedSettings;
};
