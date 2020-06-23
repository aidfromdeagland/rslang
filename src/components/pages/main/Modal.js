import React, { Component } from 'react';
import './modal.scss';
import { Checkbox } from './CheckBox';
import { Button } from '../../shared/button';
import { SettingService } from '../../../services/settingServices';
import { Dropdown } from './dropDown/Dropdown';

export class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            word: true,
            textMeaning: false,
            textExample: false,
            showPicture: false,
            showTranscription: false,
            numberLearnWord: 1,
            numberLearnCard: 1,
        };
    }

    putSettings = () => {
        const settings = SettingService.createObject(12, {
            word: this.state.word,
            textMeaning: this.state.textMeaning,
            textExample: this.state.textExample,
            showPicture: this.state.showPicture,
            showTranscription: this.state.showTranscription,
            numberLearnWord: this.state.numberLearnWord,
            numberLearnCard: this.state.numberLearnCard,
        });
        SettingService.put(settings);
    }

    checkboxHandle = (property) => {
        this.setState((prev) => ({
            [property]: !prev[property],
        }));
    }

    checkSettings = () => {
        const settingsValues = Object.values(this.state);
        if (!settingsValues.includes(true)) {
            alert('choose main settings');
            return;
        }
        this.props.closeModal();
        this.putSettings();
    }

    handleInput = (property, event) => {
        this.setState({
            [property]: event.target.value,
        });
    }

    render() {
        return (
            <div id="openModal" className="modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <Button className="close-modal close" onClick={this.props.closeModal} title="×" />
                        </div>
                        <div className="modal-body">
                            <div className="main-settings">
                                <h3>Main settings</h3>
                                <Checkbox text="learn by word" onChange={() => this.checkboxHandle('word')} checked={this.state.word} />
                                <Checkbox text="learn on offer" onChange={() => this.checkboxHandle('textExample')} checked={this.state.textExample} />
                                <Checkbox text="learn by the meaning" onChange={() => this.checkboxHandle('textMeaning')} checked={this.state.textMeaning} />
                            </div>
                            <div className="additional-settings">
                                <h3>Additional settings</h3>
                                <Checkbox text="Show transcription" />
                                <Checkbox text="Show picture" />
                            </div>
                            <div className="number-words-cards">
                                <label>
                                    Learn words a day:
                                    <input type="number" min="1" max="50" name="numberLearnWord" value={this.state.numberLearnWord} onChange={(e) => this.handleInput('numberLearnWord', e)} />
                                </label>
                                <label>
                                    Number of cards a day:
                                    <input type="number" min="1" max="50" name="numberLearnCards" value={this.state.numberLearnCard} onChange={(e) => this.handleInput('numberLearnCard', e)} />
                                </label>
                            </div>
                        </div>
                        <Button className="close-modal-ok button" onClick={this.checkSettings} title="OK" />
                    </div>
                </div>
            </div>
        );
    }
}
