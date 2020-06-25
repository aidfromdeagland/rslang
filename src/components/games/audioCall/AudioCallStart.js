/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createIncArray } from '../../../utils/utils';
import { Spinner } from '../../shared/spinner';
import { groupCount, pageCount } from '../../../constants/globalConstants';
import { Repository } from './Repository';

export class AudioCallStart extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: false, group: 1, page: 10 };
    }

    handleGroupChange(event) {
        this.setState({ group: event.target.value });
    }

    handlePageChange(event) {
        this.setState({ page: event.target.value });
    }

    handleStartGame() {
        let { repository } = this.props;
        if (!repository) {
            repository = new Repository(this.state.group, this.state.page);
        }

        if (!repository.checkLoading(() => {
            this.setState({ isGame: true, isLoading: false });
            this.props.startGame(repository);
        })) {
            this.setState({ isLoading: true });
        }
    }

    render() {
        if (this.state.isGame) {
            return (null);
        }
        const getGroupSelect = () => (
            <select className="list" key="group" value={this.state.group} onChange={(e) => this.handleGroupChange(e)}>
                {createIncArray(groupCount).map((o) => <option key={o}>{o}</option>)}
            </select>
        );
        const getPageSelect = () => (
            <select className="list" key="page" value={this.state.page} onChange={(e) => this.handlePageChange(e)}>
                {createIncArray(pageCount).map((o) => <option key={o}>{o}</option>)}
            </select>
        );

        return (
            <div className="audio-call">
                <h1 className="audio-call__header">Audio Call</h1>
                {!this.state.modeIsUserWords
                    && (
                        <div>
                            { getGroupSelect() }
                            { getPageSelect() }
                        </div>
                    )}
                <span className="audio-call__description">Select the translation of the spoken word</span>
                <span className="audio-call__train">Improves the perception of English speech by ear</span>
                {
                    this.state.isLoading
                        ? <Spinner />
                        : <button className="audio-call__start-game" type="button" onClick={() => this.handleStartGame()}>Start game</button>
                }
            </div>
        );
    }
}

AudioCallStart.defaultProps = {
    repository: undefined,
};

AudioCallStart.propTypes = {
    repository: PropTypes.shape({
        checkLoading: PropTypes.func,
    }),
    startGame: PropTypes.func.isRequired,
};
