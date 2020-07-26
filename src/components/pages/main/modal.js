import React, { Component } from 'react';
import './modal.scss';
import { Checkbox } from './checkBox';
import { Button } from '../../shared/button';

export class ModalSettings extends Component {
    render() {
        const {
            acceptSettings,
            handleCloseModal,
            settings,
            onChangeInput,
            onChangeCheckbox,
            isInvalidSettings,
        } = this.props;
        return (
            <div id="openModal" className="modal-study">
                <div className="modal-study-dialog">
                    <div className="modal-study-content">
                        <div className="modal-study-header">
                            <Button className="modal-study-close" onClick={handleCloseModal} title="×" />
                        </div>
                        <div className="modal-study-body">
                            <div className="main-settings">
                                <h3>Learning context</h3>
                                <Checkbox
                                    text="word translation"
                                    onChange={() => onChangeCheckbox('showWordTranslate')}
                                    isChecked={settings.showWordTranslate}
                                    isInvalidSettings={isInvalidSettings}
                                />
                                <Checkbox
                                    text="word example of usage"
                                    onChange={() => onChangeCheckbox('showSentenceExample')}
                                    isChecked={settings.showSentenceExample}
                                    isInvalidSettings={isInvalidSettings}
                                />
                                <Checkbox
                                    text="word meaning"
                                    onChange={() => onChangeCheckbox('showSentenceMeaning')}
                                    isChecked={settings.showSentenceMeaning}
                                    isInvalidSettings={isInvalidSettings}
                                />
                            </div>
                            <div className="additional-settings">
                                <h3>Additional settings</h3>
                                <Checkbox
                                    text="word transcription"
                                    onChange={() => onChangeCheckbox('showWordTranscription')}
                                    isChecked={settings.showWordTranscription}
                                />
                                <Checkbox
                                    text="word illustration"
                                    onChange={() => onChangeCheckbox('showWordImage')}
                                    isChecked={settings.showWordImage}
                                />
                                <Checkbox
                                    text="evaluation buttons"
                                    onChange={() => onChangeCheckbox('showEvaluationButtons')}
                                    isChecked={settings.showEvaluationButtons}
                                />
                                <Checkbox
                                    text="answer button"
                                    onChange={() => onChangeCheckbox('showAnswerButton')}
                                    isChecked={settings.showAnswerButton}
                                />
                                <Checkbox
                                    text="difficult button"
                                    onChange={() => onChangeCheckbox('showDifficultButton')}
                                    isChecked={settings.showDifficultButton}
                                />
                                <Checkbox
                                    text="delete button"
                                    onChange={() => onChangeCheckbox('showDeleteButton')}
                                    isChecked={settings.showDeleteButton}
                                />
                                <Checkbox
                                    text="sentences translation"
                                    onChange={() => onChangeCheckbox('showSentencesTranslate')}
                                    isChecked={settings.showSentencesTranslate}
                                />
                                <Checkbox
                                    text="auto pronunciation"
                                    onChange={() => onChangeCheckbox('autoPronunciation')}
                                    isChecked={settings.autoPronunciation}
                                />
                            </div>
                            <div className="number-words-cards">
                                <div className="number-words">
                                    <span>new words</span>
                                    <Button
                                        title="+"
                                        onClick={() => onChangeInput('newWords', '+')}
                                        className="counter-control counter-control_plus"
                                    />
                                    <input
                                        type="number"
                                        min="0"
                                        max="50"
                                        name="numberLearnWord"
                                        value={settings.newWords}
                                        readOnly
                                    />
                                    <Button
                                        title="-"
                                        onClick={() => onChangeInput('newWords', '-')}
                                        className="counter-control counter-control_minus"
                                    />
                                </div>
                                <div className="number-cards">
                                    <span>total words </span>
                                    <Button
                                        title="+"
                                        onClick={() => onChangeInput('totalWords', '+')}
                                        className="counter-control counter-control_plus"
                                    />
                                    <input
                                        type="number"
                                        min="0"
                                        max="50"
                                        name="numberLearnCards"
                                        value={settings.totalWords}
                                        readOnly
                                    />
                                    <Button
                                        title="-"
                                        onClick={() => onChangeInput('totalWords', '-')}
                                        className="counter-control counter-control_minus"
                                    />
                                </div>
                            </div>
                        </div>
                        <Button className="close-modal-ok button" onClick={acceptSettings} title="OK" />
                    </div>
                </div>
            </div>
        );
    }
}
