import React, { Component } from 'react';
import './study.scss';
import dynamic from '../../../assets/icons/dynamic.svg';
import exampleImg from '../../../assets/images/example.jpg';
import next from '../../../assets/images/next-arrow.png';
import { Button } from '../../shared/button';
import { Answer } from './Answer';
import { dataForExample, settingsForExample } from './dataForExample';

export class Study extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maxWordsOfTheDay: 10,
            wordCount: 1,
        };
    }

    chooseLearnMethod = () => {
        const selectedSentence = Object.keys(settingsForExample.mainSettings).filter((setting) => settingsForExample.mainSettings[setting] === true);
        const min = 0,
            max = selectedSentence.length - 1;
        const randomNumb = this.randomInteger(min, max);
        console.log(selectedSentence[randomNumb])
        return selectedSentence[randomNumb];
    }

    randomInteger = (min, max) => {
        const rand = min - 0.5 + Math.random() * (max - min + 1);
        if (rand < 0) {
            return 0;
        }
        return Math.round(rand);
    }

    render() {
        const context = this.chooseLearnMethod();
        const audioContext = `audio${context.slice(4) || 'audio'}`
        const dataForCard = {
            context: dataForExample[context],
            word: dataForExample.word,
            wordTranslate: dataForExample.wordTranslate,
            audioContext: `https://raw.githubusercontent.com/aidfromdeagland/rslang-data/master/${dataForExample[audioContext]}`,
            audioWord: `https://raw.githubusercontent.com/aidfromdeagland/rslang-data/master/${dataForExample.audio}`,
            translationContext: dataForExample[`${context}Translate`],
            idWord: dataForExample.id,
            wordImage: `https://raw.githubusercontent.com/aidfromdeagland/rslang-data/master/${dataForExample.image}`,
            transcription: dataForExample.transcription
        };

        return (
            <div className="study-page">
                <div className="card-container">
                    <section className="card">
                        <div className="hints-container">
                            <div className="img-container">
                                {settingsForExample.additionalSettings.image
                                    && <img src={dataForCard.wordImage} alt="exampleImg" />}
                            </div>
                            <div className="transcription">
                                {settingsForExample.additionalSettings.transcription
                                    && <span>{dataForCard.transcription}</span>}
                            </div>
                            {/* <div className="sentence">
                                <span>{}</span>
                            </div> */}
                            <div className="sentence-translation">
                                <span>{ dataForCard.translationContext }</span>
                            </div>
                        </div>
                        <div className="learn-content">
                            <div className="card-input">
                                <Answer context={dataForCard.context} word={dataForCard.word} />
                            </div>
                            <div className="translation-container">
                                <div className="translation">{dataForCard.wordTranslate}</div>
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
