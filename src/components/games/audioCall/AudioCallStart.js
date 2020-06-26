/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createIncArray } from '../../../utils/utils';
import { Spinner } from '../../shared/spinner';
import { groupCount, pageCount } from '../../../constants/globalConstants';
import { Repository } from './Repository';
import { SimpleSelect } from './simpleSelect';

export class AudioCallStart extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: false, group: 1, page: 10 };
    }

    handleGroupChange(group) {
        this.setState({ group });
    }

    handlePageChange(page) {
        this.setState({ page });
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

        return (
            <div className="audio-call">
                <h1 className="audio-call__header">Audio Call</h1>
                {!this.props.modeIsUserWords
                    && (
                        <div>
                            <SimpleSelect
                                key="group"
                                values={createIncArray(groupCount)}
                                defaultValue={this.state.group}
                                onChange={(v) => this.handleGroupChange(v)}
                            />
                            <SimpleSelect
                                key="page"
                                values={createIncArray(pageCount)}
                                defaultValue={this.state.page}
                                onChange={(v) => this.handlePageChange(v)}
                            />
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
    modeIsUserWords: PropTypes.bool.isRequired,
};
