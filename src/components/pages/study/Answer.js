import React, { Component } from 'react';
import { InputContainer } from './InputContainer';

export class Answer extends Component {

    createContext = () => {
        const context = this.props.context.split(/(\s+)/);
        const total = context.map((word, index) => {
            if (/<i>(.*?)<\/i>/.test(word) || /<b>(.*?)<\/b>/.test(word) || context.length === 1) {
                word.replace(/(\<(\/?[^>]+)>)/g, '');
                return (<InputContainer word={this.props.word} wordAudio={this.props.wordAudio} contextAudio={this.props.contextAudio} key={index} />);
            }
            if (word !== ' ') {
                return <span className="word" key={index}>{word}</span>
            }
            return <span className="space" key={index}>  </span>
        })
        return total;
    }

    render() {
        return (
            <div className="answer-container">
                {this.createContext()}
            </div>
        );
    }
}
