import React, { Component } from 'react'

export class InputContainer extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.input = React.createRef();
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
        const actualValue = this.input.current.value.toLocaleLowerCase();

        const studiedWord = this.props.word;

        const word =  studiedWord.split('').map((letter, index) => {
            return <span className={letter === actualValue[index] ? 'correct-letter' : 'uncorrect-letter'} key={index}>{letter}</span>;
        });

        this.input.current.value = '';
        return word;
    }

    handleSubmit(event) {
        event.preventDefault();

        const actualValue = this.input.current.value.toLocaleLowerCase();
        if (actualValue === this.props.word) {
            alert('correct');
            return;
        }
        this.setState({isCorrectWord: false});
    }

    handleChange(event) {
        this.setState(prev => ({
            isCorrectWord: true
        }));
        this.input.current.value = event.target.value;
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
                        ref={this.input}
                        onChange={(e) => this.handleChange(e)}
                    />
                </form>

            </span>
        );
    }
}
