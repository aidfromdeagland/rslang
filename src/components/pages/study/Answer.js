import React, { Component } from 'react';
import { Button } from '../../shared/button';

export class Answer extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            value: '',
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(event)
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    createContext = () => {
        const context = this.props.context.split(/(\s+)/);
        console.log(context)
        const total = context.map((word) => {
            if (/<i>(.*?)<\/i>/.test(word) || /<b>(.*?)<\/b>/.test(word) || context.length === 1) {
                const newWord = word.replace(/(\<(\/?[^>]+)>)/g, '');
                return (<form className="answer-form" onSubmit={(e) => this.handleSubmit(e)}>
                    <input
                        className="answer-input"
                        type="text"
                        style={{ width: `${130}px` }}
                        placeholder={newWord}
                        autoFocus={true}
                        value={this.state.value}
                        onChange={(e) => this.handleChange(e)}
                    />
                </form>)
            }
            if (word !== ' ') {
                return <span className="word">{word}</span>
            }
            return <span className="space">  </span>
        })
        return total;
    }

    render() {

        return (
            <div className="answer-container">
                {/* <span>fdfdfdf</span>
                <form>
                    <input className="answer-input" type="text" style={{ width: `${130}px` }} />
                </form> */}
                {this.createContext()}
            </div>
        );
    }
}
