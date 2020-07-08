import React, { Component } from 'react';
import './modal.scss';
import { Checkbox } from './checkBox';
import { Button } from '../../shared/button';

export class ModalSettings extends Component {
    render() {
        const {
            closeModal,
            settings,
            onChangeInput,
            checkSettings,
            onchangeCheckbox,
            isInvalidSettings,
        } = this.props;
        return (
            <div id="openModal" className="modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <Button className="close-modal close" onClick={closeModal} title="×" />
                        </div>
                        <div className="modal-body">
                            <div className="main-settings">
                                <h3>Main settings</h3>
                                <Checkbox text="learn by word" onChange={() => onchangeCheckbox('word')} isChecked={settings.word} isInvalidSettings={isInvalidSettings} />
                                <Checkbox text="learn on offer" onChange={() => onchangeCheckbox('textExample')} isChecked={settings.textExample} isInvalidSettings={isInvalidSettings} />
                                <Checkbox text="learn by the meaning" onChange={() => onchangeCheckbox('textMeaning')} isChecked={settings.textMeaning} isInvalidSettings={isInvalidSettings} />
                            </div>
                            <div className="additional-settings">
                                <h3>Additional settings</h3>
                                <Checkbox text="Show transcription" onChange={() => onchangeCheckbox('showTranscription')} isChecked={settings.showTranscription} />
                                <Checkbox text="Show picture" onChange={() => onchangeCheckbox('showPicture')} isChecked={settings.showPicture} />
                            </div>
                            <div className="number-words-cards">
                                <div className="number-words">
                                    <span>Learn words a day:  </span>
                                    <Button title="-" onClick={() => onChangeInput('numberLearnWord', '-')} />
                                    <input type="number" min="1" max="50" name="numberLearnWord" value={settings.numberLearnWord} readOnly />
                                    <Button title="+" onClick={() => onChangeInput('numberLearnWord', '+')} />
                                </div>
                                <div className="number-cards">
                                    <span>Number of cards a day:  </span>
                                    <Button title="-" onClick={() => onChangeInput('numberLearnCard', '-')} />
                                    <input type="number" min="1" max="50" name="numberLearnCards" value={settings.numberLearnCard} readOnly />
                                    <Button title="+" onClick={() => onChangeInput('numberLearnCard', '+')} />
                                </div>
                            </div>
                        </div>
                        <Button className="close-modal-ok button" onClick={checkSettings} title="OK" />
                    </div>
                </div>
            </div>
        );
    }
}
