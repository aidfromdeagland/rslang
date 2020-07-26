import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = { seconds: 60 };
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000,
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        const { seconds } = this.state;
        if (seconds > 0) {
            this.setState({
                seconds: seconds - 1,
            });
        } else {
            const { stopGame } = this.props;
            stopGame();
        }
    }

    render() {
        const { seconds } = this.state;
        return (
            <div className="timer">
                <span>{ seconds }</span>
            </div>
        );
    }
}

Timer.propTypes = {
    stopGame: PropTypes.func,
};

Timer.defaultProps = {
    stopGame: '',
};
