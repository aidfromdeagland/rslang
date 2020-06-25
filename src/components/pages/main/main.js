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

        // console.log(this.settings)
        this.setState({ settings: this.settings });
    }

    putSettings = () => {
        const {
            word, textMeaning, textExample, showPicture, showTranscription, numberLearnWord, numberLearnCard,
        } = this.state.settings;
        const settings = SettingService.createObject(12, {
            word,
            textMeaning,
            textExample,
            showPicture,
            showTranscription,
            numberLearnWord,
            numberLearnCard,
        });
        SettingService.put(settings);
        this.setState(settings);
    }

    checkboxHandle = (property) => {
        this.setState((prev) => {
            return { settings: { ...prev.settings, [property]: !prev.settings[property] } };
        });
    }

    checkSettings = () => {
        const settingsValues = Object.values(this.state);
        if (!settingsValues.includes(true)) {
            alert('choose main settings');
            return;
        }
        this.handleCloseModal();
        this.putSettings();
    }

    handleInput = (property, event) => {
        this.setState({ settings: { ...this.state.settings, [property]: event.target.value } });
    }

    handleCloseModal = () => {
        this.setState((prev) => ({
            isOpenModal: !prev.isOpenModal,
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
                    />
                    {/* <Start /> */}
                    <Progress />
                </div>
            </div>
        );
    }
}
