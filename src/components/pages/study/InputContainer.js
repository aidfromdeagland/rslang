import React, { Component } from 'react'

export class InputContainer extends Component {
    // constructor(props) {
    //     super(props);
    //     this.prevValue = '';
    //     this.state = {
    //         valueInput: '',
    //         isCorrectWord: null,
    //     }
    // }

    // checkWord = () => {
    //     const actualValue = this.prevValue.toLocaleLowerCase();
    //     const studiedWord = this.props.word;

    //     const word = studiedWord.split('').map((letter, index) => {
    //         return <span className={letter === actualValue[index] ? 'correct-letter' : 'uncorrect-letter'} key={index}>{letter}</span>;
    //     });
    //     return word;
    // }

    // handleSubmit(event) {
    //     event.preventDefault();
    //     const actualValue = this.state.valueInput.toLocaleLowerCase();

    //     if (actualValue === this.props.word) {
    //         this.setState({
    //             isCorrectWord: true,
    //         });
    //         this.playAudio(this.props.contextAudio);
    //         // alert('correct');
    //         return;
    //     }
    //     this.playAudio(this.props.wordAudio);
    //     this.prevValue = this.state.valueInput;
    //     this.setState({
    //         isCorrectWord: false,
    //         valueInput: ''
    //     });
    // }

    // handleChange(event) {
    //     this.setState({
    //         isCorrectWord: null,
    //         valueInput: event.target.value
    //     });
    // }

    // playAudio = (url) => {
    //     const audio = new Audio(url);
    //     audio.play();
    // }

    render() {
        return (
            <span className="input-container">
                <span className={`background ${this.props.isCorrectWord ? 'correct' : ''}`}>
                    <span className="hidden">{this.props.word}</span>
                </span>
                <span className="word-container">
                    {this.props.isCorrectWord === false ? this.props.checkWord() : null}
                </span>
                <form className="answer-form" onSubmit={(e) => this.props.handleSubmit(e)}>
                    <input
                        className="answer-input"
                        type="text"
                        autoFocus={true}
                        value={this.props.valueInput}
                        onChange={(e) => this.props.handleChange(e)}
                    />
                </form>

            </span>
        );
    }
}
