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
                                <Checkbox text="learn by word" onChange={() => onchangeCheckbox('word')} checked={settings.word} />
                                <Checkbox text="learn on offer" onChange={() => onchangeCheckbox('textExample')} checked={settings.textExample} />
                                <Checkbox text="learn by the meaning" onChange={() => onchangeCheckbox('textMeaning')} checked={settings.textMeaning} />
                            </div>
                            <div className="additional-settings">
                                <h3>Additional settings</h3>
                                <Checkbox text="Show transcription" onChange={() => onchangeCheckbox('showTranscription')} checked={settings.showTranscription} />
                                <Checkbox text="Show picture" onChange={() => onchangeCheckbox('showPicture')} checked={settings.showPicture} />
                            </div>
                            <div className="number-words-cards">
                                <label>
                                    Learn words a day:
                                    <input type="number" min="1" max="50" name="numberLearnWord" value={settings.numberLearnWord} onChange={(e) => onChangeInput('numberLearnWord', e)} />
                                </label>
                                <label>
                                    Number of cards a day:
                                    <input type="number" min="1" max="50" name="numberLearnCards" value={settings.numberLearnCard} onChange={(e) => onChangeInput('numberLearnCard', e)} />
                                </label>
                            </div>
                        </div>
                        <Button className="close-modal-ok button" onClick={checkSettings} title="OK" />
                    </div>
                </div>
            </div>
        );
    }
}
