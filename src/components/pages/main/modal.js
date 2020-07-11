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
            <div id="openModal" className="modal-study">
                <div className="modal-study-dialog">
                    <div className="modal-study-content">
                        <div className="modal-study-header">
                            <Button className="modal-study-close" onClick={closeModal} title="×" />
                        </div>
                        <div className="modal-study-body">
                            <div className="main-settings">
                                <h3>Learning context</h3>
                                <Checkbox text="word translation" onChange={() => onchangeCheckbox('showWordTranslate')} isChecked={settings.showWordTranslate} isInvalidSettings={isInvalidSettings} />
                                <Checkbox text="word example of usage" onChange={() => onchangeCheckbox('showSentenceExample')} isChecked={settings.showSentenceExample} isInvalidSettings={isInvalidSettings} />
                                <Checkbox text="word meaning" onChange={() => onchangeCheckbox('showSentenceMeaning')} isChecked={settings.showSentenceMeaning} isInvalidSettings={isInvalidSettings} />
                            </div>
                            <div className="additional-settings">
                                <h3>Additional settings</h3>
                                <Checkbox text="word transcription" onChange={() => onchangeCheckbox('showWordTranscription')} isChecked={settings.showWordTranscription} />
                                <Checkbox text="word illustration" onChange={() => onchangeCheckbox('showWordImage')} isChecked={settings.showWordImage} />
                                <Checkbox text="answer button" onChange={() => onchangeCheckbox('showAnswerButton')} isChecked={settings.showAnswerButton} />
                                <Checkbox text="difficult button" onChange={() => onchangeCheckbox('showDifficultButton')} isChecked={settings.showDifficultButton} />
                                <Checkbox text="delete button" onChange={() => onchangeCheckbox('showDeleteButton')} isChecked={settings.showDeleteButton} />
                                <Checkbox text="sentences translation" onChange={() => onchangeCheckbox('showSentencesTranslate')} isChecked={settings.showSentencesTranslate} />
                                <Checkbox text="auto pronunciation" onChange={() => onchangeCheckbox('autoPronunciation')} isChecked={settings.autoPronunciation} />
                            </div>
                            <div className="number-words-cards">
                                <div className="number-words">
                                    <span>new words</span>
                                    <Button title="+" onClick={() => onChangeInput('newWords', '+')} className="counter-control counter-control_plus" />
                                    <input type="number" min="0" max="30" name="numberLearnWord" value={settings.newWords} readOnly />
                                    <Button title="-" onClick={() => onChangeInput('newWords', '-')} className="counter-control counter-control_minus" />
                                </div>
                                <div className="number-cards">
                                    <span>total words </span>
                                    <Button title="+" onClick={() => onChangeInput('totalWords', '+')} className="counter-control counter-control_plus" />
                                    <input type="number" min="0" max="30" name="numberLearnCards" value={settings.totalWords} readOnly />
                                    <Button title="-" onClick={() => onChangeInput('totalWords', '-')} className="counter-control counter-control_minus" />
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
