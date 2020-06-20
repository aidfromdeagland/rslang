import React, { Component } from 'react';
import './study.scss';
import dynamic from '../../../assets/icons/dynamic.svg';
import exampleImg from '../../../assets/images/example.jpg';
import next from '../../../assets/images/next-arrow.png';
import { Button } from '../../shared/button';
import { Answer } from './Answer';

export class Study extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const dataForExample = {
            "word": "agree",
            "image": "files/01_0001.jpg",
            "audio": "files/01_0001.mp3",
            "audioMeaning": "files/01_0001_meaning.mp3",
            "audioExample": "files/01_0001_example.mp3",
            "textMeaning": "To <i>agree</i> is to have the same opinion or belief as another person",
            "textExample": "The students <b>agree</b> they have too much homework",
            "transcription": "[əgríː]",
            "wordTranslate": "согласна",
            "textMeaningTranslate": "Согласиться - значит иметь то же мнение или убеждение, что и другой человек",
            "textExampleTranslate": "Студенты согласны, что у них слишком много домашней работы",
            "id": 1
        };
        const settingsForExample = {
            mainSettings: {
                word: true,
                sentence: false,
                textMeaning: false,
            },
            additionalSettings: {
                transcription: true,
                image: true,
            },
        };
        return (
            <div className="study-page">
                <div className="card-container">
                    <section className="card">
                        <div className="hints-container">
                            <div className="img-container">
                                <img src={exampleImg} alt="exampleImg" />
                            </div>
                            <div className="transcription">
                                <span>{dataForExample.transcription}</span>
                            </div>
                            <div className="sentence">
                                <span>{}</span>
                            </div>
                            <div className="sentence-translation">
                                <span>{dataForExample.textExampleTranslate}</span>
                            </div>
                        </div>
                        <div className="learn-content">
                            <div className="card-input">
                                {/* <div className="answer-container">
                                    <span>fdfdfdf</span>
                                    <form>
                                        <input className="answer-input" type="text" style={{ width: `${130}px` }} />
                                    </form>
                                </div> */}
                                <Answer context={dataForExample.textExample} />
                            </div>
                            <div className="translation-container">
                                <div className="translation">{dataForExample.wordTranslate}</div>
                                <img className="dynamic-icon" src={dynamic} alt="dynamic" />
                            </div>
                        </div>
                        <div className="buttons-block">
                            <Button className="button delete-btn" title="Delete" />
                            <Button className="button hard-btn" title="Add to hard" />
                        </div>
                    </section>
                    <div className="navigate-next">
                        <img src={next} alt="next" />
                    </div>
                </div>
            </div>
        );
    }
}
