import React, { Component } from 'react';
import './savannah.scss';
import { SavannahCards } from './savannahCards';
import { SavannahLives } from './savannahLives';
import { SavannahWord } from './savannahWord';
import { SavannahImage } from './savannahImage';
import { SavannahStatistics } from './savannahStatistics';

export class SavannahGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            word: {},
            translateWords: [],
            lives: 5,
            wordClass: 'savannah__card-transition',
            imageWidth: 30,
            imageHeight: 30,
            isOver: false,
            rightAnswers: [],
            wrongAnswers: [],
        };

        this.getWord = this.getWord.bind(this);
        this.getNewCards = this.getNewCards.bind(this);
        this.timeIsOver = this.timeIsOver.bind(this);
        this.resizeImage = this.resizeImage.bind(this);
        this.getRightAnswer = this.getRightAnswer.bind(this);
        this.getWrongAnswer = this.getWrongAnswer.bind(this);
    }

    componentDidMount() {
        this.getNewCards();
        // this.timeIsOver();
    }

    // componentWillUnmount() {
    //     this.timeIsOver();
    // }

    // componentWillUpdate() {
    //     if (this.state.isOver === true) {
    //         // this.getNewCards();
    //         // this.toggleIsTimeOver();
    //         console.log('bzzz');
    //     }
    // }

    async getWord() {
        const group = Math.floor(Math.random() * (5 - 0)) + 0;
        const page = Math.floor(Math.random() * (29 - 0)) + 0;
        const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    getRightAnswer() {
        this.resizeImage();
        this.getNewCards();
        this.setState({
            wordClass: 'savannah__card-transition',
        });
        // new Audio('./../../../assets/audio/correct.mp3').play();
    }

    getWrongAnswer() {
        this.lostLive();
        this.getNewCards();
        this.setState({
            wordClass: 'savannah__card-transition',
        });
    }

    async getNewCards() {
        const wordInx = Math.floor(Math.random() * (19 - 0)) + 0;
        const rightWord = await this.getWord();
        const wrongWord1 = await this.getWord();
        const wrongWord2 = await this.getWord();
        const wrongWord3 = await this.getWord();

        Promise.all([rightWord, wrongWord1, wrongWord2, wrongWord3]).then(
            this.setState({
                word: {
                    id: rightWord[wordInx].id,
                    word: rightWord[wordInx].word,
                    translate: rightWord[wordInx].wordTranslate,
                },
                translateWords: [
                    {
                        translate: rightWord[wordInx].wordTranslate,
                        id: rightWord[wordInx].id,
                    },
                    {
                        translate: wrongWord2[wordInx].wordTranslate,
                        id: wrongWord2[wordInx].id,

                    },
                    {
                        translate: wrongWord2[wordInx].wordTranslate,
                        id: wrongWord2[wordInx].id,
                    },
                    {
                        translate: wrongWord3[wordInx].wordTranslate,
                        id: wrongWord3[wordInx].id,
                    },
                ],
                wordClass: 'savannah__card-transition card-bottom',
            }),

        );
    }

     getRightAnswersForStatistics = (value1, value2) => {
         const row = {
             word: value1,
             translate: value2,
         };
         this.setState({ rightAnswers: [...this.state.rightAnswers, row] });
     }

     getWrongAnswersForStatistics = (value1, value2) => {
         const row = {
             word: value1,
             translate: value2,
         };
         this.setState({ wrongAnswers: [...this.state.wrongAnswers, row] });
     }

      lostLive = () => {
          this.setState((prevState) => ({
              lives: prevState.lives - 1,
          }));
      };

      resizeImage() {
          this.setState({
              imageHeight: this.state.imageHeight + 10,
              imageWidth: this.state.imageWidth + 10,
          });
      }

      timeIsOver() {
          setTimeout(() => {
              this.getWrongAnswer();
          }, 5000);
      }

      render() {
          const {
              word, translateWords, lives, id, wordClass, imageHeight, imageWidth, rightAnswers, wrongAnswers,
          } = this.state;

          return (
              <div className="savannah">

                  <SavannahLives
                      lives={lives}
                  />

                  {{ word } && this.state.lives >= 1
                    && (
                        <SavannahWord
                            word={word}
                            id={id}
                            wordClass={wordClass}
                        />
                    )}

                  {{ word } && this.state.lives >= 1
                    && (
                        <SavannahCards
                            translateWords={translateWords}
                            word={word}
                            id={id}
                            lives={lives}
                            rightAnswers={rightAnswers}
                            wrongAnswers={wrongAnswers}
                            getRightAnswer={this.getRightAnswer}
                            getWrongAnswer={this.getWrongAnswer}
                            getRightAnswersForStatistics={this.getRightAnswersForStatistics}
                            getWrongAnswersForStatistics={this.getWrongAnswersForStatistics}
                        />
                    )}

                  {this.state.lives < 1
                   && (
                       <SavannahStatistics
                           rightAnswers={rightAnswers}
                           wrongAnswers={wrongAnswers}
                       />
                   )}

                  <SavannahImage
                      imageWidth={imageWidth}
                      imageHeight={imageHeight}
                  />

              </div>
          );
      }
}
