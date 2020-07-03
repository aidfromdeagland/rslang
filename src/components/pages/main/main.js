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
        const settings = SettingService.createObject(12, this.state.settings);
        SettingService.put(settings);
    }

    checkboxHandle = (property) => {
        this.setState((prev) => {
            return { settings: { ...prev.settings, [property]: !prev.settings[property] } };
        });
        this.setState({ isInvalidSettings: false });
    }

    checkSettings = () => {
        const settingsValues = Object.entries(this.state.settings).filter((option) => option[0] === 'textMeaning' || option[0] === 'textExample' || option[0] === 'word').find((setting) => setting[1] === true);
        if (!settingsValues) {
            this.setState({ isInvalidSettings: true });
            return;
        }
        this.settings = this.state.settings;
        this.handleCloseModal();
        this.putSettings();
    }

    handleInput = (property, operation) => {
        let prop = parseFloat(this.state.settings[property]);
        if (operation === '+') {
            prop += 10;
            this.setState(() => ({ settings: { ...this.state.settings, [property]: prop } }));
            if (property === 'numberLearnWord' && prop > this.state.settings.numberLearnCard) {
                this.setState(() => ({ settings: { ...this.state.settings, numberLearnCard: prop, [property]: prop } }));
            }
        }
        if (operation === '-') {
            prop = prop === 0 ? 0 : prop - 10;
            this.setState({ settings: { ...this.state.settings, [property]: prop } });
            if (property === 'numberLearnCard' && prop < this.state.settings.numberLearnCard) {
                this.setState(() => ({ settings: { ...this.state.settings, numberLearnWord: prop, [property]: prop } }));
            }
        }
    }

    handleCloseModal = () => {
        this.setState((prev) => ({
            isOpenModal: !prev.isOpenModal,
        }));
        this.setState({ settings: this.settings });
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
