import React, { Component } from 'react';
import './main.scss';
import { Options } from './options';
import { Progress } from './progress';
import { SettingService } from '../../../services/settingServices';
import { settingsDefault } from '../../../constants/globalConstants';

export class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            settings: settingsDefault,
            learnedWordsToday: 0,
            needLearnWordsToday: 0,
            totalLearnedWords: 0,
            isOpenModal: false,
            notWordForLearn: false,
            isInvalidSettings: false,
        };
        this.settings = settingsDefault;
    }

    componentDidMount() {
        this.settings = this.getSettings();
    }

    getSettings = async () => {
        const settingsResponse = await SettingService.get();
        this.setState({ settings: settingsResponse });
    }

    putSettings = () => {
        const { settings: { optional } } = this.state;
        const newSettings = SettingService.createObject(20, optional);
        SettingService.put(newSettings);
    }

    checkSettings = () => {
        const { settings: { optional } } = this.state;
        const mainSettingsValues = [
            optional.showWordTranslate, optional.showSentenceMeaning, optional.showSentenceExample];
        if (mainSettingsValues.some((settingValue) => settingValue === true)) {
            this.putSettings();
            this.setState((prev) => ({
                isOpenModal: !prev.isOpenModal,
                isInvalidSettings: false,
            }));
        } else {
            this.setState({ isInvalidSettings: true });
        }
    }

    checkboxHandle = (property) => {
        this.setState((prev) => (
            {
                ...prev,
                settings: {
                    ...prev.settings,
                    optional: {
                        ...prev.settings.optional,
                        [property]: !prev.settings.optional[property],
                    },
                },
                isInvalidSettings: false,
            }
        ));
    }

    handleInput = (property, operation) => {
        const { settings: { optional } } = this.state;
        let wordsQuantity = parseInt(optional[property], 10);
        if (operation === '+') {
            wordsQuantity += 10;
            this.setState((prev) => (
                {
                    ...prev,
                    settings: {
                        ...prev.settings,
                        optional: {
                            ...prev.settings.optional,
                            [property]: wordsQuantity,
                        },
                    },
                }
            ));
            if (property === 'newWords' && wordsQuantity > optional.totalWords) {
                this.setState((prev) => (
                    {
                        ...prev,
                        settings: {
                            ...prev.settings,
                            optional: {
                                ...prev.settings.optional,
                                [property]: wordsQuantity,
                                totalWords: wordsQuantity,
                            },
                        },
                    }
                ));
            }
        }
        if (operation === '-') {
            wordsQuantity = wordsQuantity === 0 ? 0 : wordsQuantity - 10;
            this.setState((prev) => (
                {
                    ...prev,
                    settings: {
                        ...prev.settings,
                        optional: {
                            ...prev.settings.optional,
                            [property]: wordsQuantity,
                        },
                    },
                }
            ));
            if (property === 'totalWords' && wordsQuantity < optional.newWords) {
                this.setState((prev) => (
                    {
                        ...prev,
                        settings: {
                            ...prev.settings,
                            optional: {
                                ...prev.settings.optional,
                                [property]: wordsQuantity,
                                newWords: wordsQuantity,
                            },
                        },
                    }
                ));
            }
        }
    }

    handleCloseModal = () => {
        this.setState((prev) => ({
            isOpenModal: !prev.isOpenModal,
            isInvalidSettings: false,
        }));
    }

    handleClickSettings = () => {
        this.setState((prev) => ({
            isOpenModal: !prev.isOpenModal,
        }));
    }

    render() {
        const {
            needLearnWordsToday,
            settings,
            isOpenModal,
            isInvalidSettings,
        } = this.state;
        return (
            <div className="main-page">
                <div className="main-page-container">
                    <Options
                        needLearnWordsToday={needLearnWordsToday}
                        settings={settings.optional}
                        onChangeInput={this.handleInput}
                        onchangeCheckbox={this.checkboxHandle}
                        clickSettings={this.handleClickSettings}
                        closeModal={this.checkSettings}
                        isOpenModal={isOpenModal}
                        checkSettings={this.checkSettings}
                        isInvalidSettings={isInvalidSettings}
                    />
                    <Progress />
                </div>
            </div>
        );
    }
}
