import React, { Component } from 'react';
import './study.scss';
import dynamic from '../../../assets/icons/dynamic.svg';
import exampleImg from '../../../assets/images/example.jpg';
import next from '../../../assets/images/next-arrow.png';
import { Button } from '../../shared/button';
import { Answer } from './Answer';
import { dataForExample, settingsForExample } from './dataForExample';

export class Study extends Component {

    render() {
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
                                <Answer context={dataForExample.textMeaning} word={dataForExample.word} />
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
