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
                                <Checkbox text="word translation" onChange={() => onchangeCheckbox('showWordTranslate')} isChecked={settings.showWordTranslate} isInvalidSettings={isInvalidSettings} />
                                <Checkbox text="word example of usage" onChange={() => onchangeCheckbox('showSentenceExample')} isChecked={settings.showSentenceExample} isInvalidSettings={isInvalidSettings} />
                                <Checkbox text="word meaning" onChange={() => onchangeCheckbox('showSentenceMeaning')} isChecked={settings.showSentenceMeaning} isInvalidSettings={isInvalidSettings} />
                            </div>
                            <div className="additional-settings">
                                <h3>Additional settings</h3>
                                <Checkbox text="word transcription" onChange={() => onchangeCheckbox('showWordTranscription')} isChecked={settings.showWordTranscription} />
                                <Checkbox text="word illustration" onChange={() => onchangeCheckbox('showWordImage')} isChecked={settings.showWordImage} />
                            </div>
                            <div className="number-words-cards">
                                <div className="number-words">
                                    <span>new words: </span>
                                    <Button title="-" onClick={() => onChangeInput('newWords', '-')} />
                                    <input type="number" min="1" max="50" name="numberLearnWord" value={settings.newWords} readOnly />
                                    <Button title="+" onClick={() => onChangeInput('newWords', '+')} />
                                </div>
                                <div className="number-cards">
                                    <span>total words:  </span>
                                    <Button title="-" onClick={() => onChangeInput('totalWords', '-')} />
                                    <input type="number" min="1" max="50" name="numberLearnCards" value={settings.totalWords} readOnly />
                                    <Button title="+" onClick={() => onChangeInput('totalWords', '+')} />
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
