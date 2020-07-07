import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './timer.scss';

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
        const { stopGame } = this.props;
        stopGame();
    }

    tick() {
        const { seconds } = this.state;
        if (seconds > 0) {
            this.setState({
                seconds: seconds - 1,
            });
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
