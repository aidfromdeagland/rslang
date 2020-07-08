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
    }

    componentDidMount() {
        if (!this.settings) {
            this.getSettings();
        }
    }

    getSettings = async () => {
        const settingsResponse = await SettingService.get();
        const settings = settingsResponse.optional;
        this.settings = settings || settingsDefault;
        this.setState({ settings: this.settings });
    }

    putSettings = () => {
        const { settings } = this.state;
        const newSettings = SettingService.createObject(12, settings);
        SettingService.put(newSettings);
    }

    checkboxHandle = (property) => {
        this.setState((prev) => (
            {
                settings: { ...prev.settings, [property]: !prev.settings[property] },
                isInvalidSettings: false,
            }
        ));
    }

    checkSettings = () => {
        const { settings } = this.state;
        const settingsValues = Object.entries(settings).filter((option) => option[0] === 'textMeaning' || option[0] === 'textExample' || option[0] === 'word').find((setting) => setting[1] === true);
        if (!settingsValues) {
            this.setState({ isInvalidSettings: true });
            return;
        }
        this.settings = settings;
        this.handleCloseModal();
        this.putSettings();
    }

    handleInput = (property, operation) => {
        const { settings } = this.state;
        let wordsQuantity = parseInt(settings[property], 10);
        if (operation === '+') {
            wordsQuantity += 10;
            this.setState(() => ({ settings: { ...settings, [property]: wordsQuantity } }));
            if (property === 'numberLearnWord' && wordsQuantity > settings.numberLearnCard) {
                this.setState(() => ({
                    settings: {
                        ...settings, numberLearnCard: wordsQuantity, [property]: wordsQuantity,
                    },
                }));
            }
        }
        if (operation === '-') {
            wordsQuantity = wordsQuantity === 0 ? 0 : wordsQuantity - 10;
            this.setState({ settings: { ...settings, [property]: wordsQuantity } });
            if (property === 'numberLearnCard' && wordsQuantity < settings.numberLearnCard) {
                this.setState(() => ({
                    settings: {
                        ...settings, numberLearnWord: wordsQuantity, [property]: wordsQuantity
                    },
                }));
            }
        }
    }

    handleCloseModal = () => {
        this.setState((prev) => ({
            isOpenModal: !prev.isOpenModal,
            settings: this.settings,
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
                        settings={settings}
                        onChangeInput={this.handleInput}
                        onchangeCheckbox={this.checkboxHandle}
                        clickSettings={this.handleClickSettings}
                        closeModal={this.handleCloseModal}
                        isOpenModal={isOpenModal}
                        checkSettings={this.checkSettings}
                        isInvalidSettings={isInvalidSettings}
                    />
                    {/* <Start /> */}
                    <Progress />
                </div>
            </div>
        );
    }
}
