import React, { Component } from 'react'

export class InputContainer extends Component {
    constructor(props) {
        super(props);
        this.prevValue = '';
        this.state = {
            valueInput: '',
            isCorrectWord: true,
        }
    }

    createBackgroundContainer = () => {
        const word = this.props.word;
        return <span className='hidden'>{word}</span>;
    }

    checkWord = () => {
        const actualValue = this.prevValue.toLocaleLowerCase();
        const studiedWord = this.props.word;

        const word = studiedWord.split('').map((letter, index) => {
            return <span className={letter === actualValue[index] ? 'correct-letter' : 'uncorrect-letter'} key={index}>{letter}</span>;
        });
        return word;
    }

    handleSubmit(event) {
        event.preventDefault();
        const actualValue = this.state.valueInput.toLocaleLowerCase();

        if (actualValue === this.props.word) {
            alert('correct');
            return;
        }
        this.prevValue = this.state.valueInput;
        this.setState({
            isCorrectWord: false,
            valueInput: ''
        });
    }

    handleChange(event) {
        this.setState({
            isCorrectWord: true,
            valueInput: event.target.value
        });
    }

    render() {

        return (
            <span className="input-container">
                <span className="background">
                    {this.createBackgroundContainer()}
                </span>
                <span className="word-container">
                    {!this.state.isCorrectWord ? this.checkWord() : null}
                </span>
                <form className="answer-form" onSubmit={(e) => this.handleSubmit(e)}>
                    <input
                        className="answer-input"
                        type="text"
                        autoFocus={true}
                        value={this.state.valueInput}
                        onChange={(e) => this.handleChange(e)}
                    />
                </form>

            </span>
        );
    }
}
