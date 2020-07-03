/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createIncArray } from '../../../utils/utils';
import { Spinner } from '../../shared/spinner';
import { GROUP_COUNT, PAGE_COUNT } from '../../../constants/globalConstants';
import { Repository } from './repository';
import { SimpleSelect } from './simpleSelect';

export class AudioCallStart extends Component {
    constructor(props) {
        super(props);
        const isLoadingSettings = !props.repositoryState;
        this.state = {
            isLoading: false,
            isLoadingSettings,
            group: isLoadingSettings || props.repositoryState.currentSettings.group,
            page: isLoadingSettings || props.repositoryState.currentSettings.page,
        };
    }

    componentDidMount() {
        this.repository = new Repository(this.props.repositoryState);
        if (!this.state.isLoadingSettings) {
            this.repository.setLevel(this.state.page, this.state.group);
            return;
        }
        this.repository.loadSettings((settings) => {
            this.repository.loadData();
            this.setState({ isLoadingSettings: false, group: settings.group, page: settings.page });
        });
    }

    handleGroupChange(group) {
        this.setState({ group });
    }

    handlePageChange(page) {
        this.setState({ page });
    }

    handleStartGame() {
        this.repository.setLevel(this.state.page, this.state.group);
        if (!this.repository.checkLoaded(() => {
            this.setState({ isGame: true, isLoading: false });
            this.props.startGame(this.repository.state);
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
                {!this.state.modeIsUserWords && !this.state.isLoadingSettings
                    && (
                        <div className="audio-call__levels">
                            <SimpleSelect
                                key="group"
                                values={createIncArray(GROUP_COUNT)}
                                defaultValue={this.state.group}
                                onChange={(v) => this.handleGroupChange(v)}
                                title="level"
                            />
                            <SimpleSelect
                                key="page"
                                values={createIncArray(PAGE_COUNT)}
                                defaultValue={this.state.page}
                                onChange={(v) => this.handlePageChange(v)}
                                title="round"
                            />
                        </div>
                    )}
                <span className="audio-call__description">Select the translation of the spoken word</span>
                <span className="audio-call__train">Improves the perception of English speech by ear</span>
                {
                    this.state.isLoading || this.state.isLoadingSettings
                        ? <Spinner />
                        : <button className="audio-call__button audio-call__start-game" type="button" onClick={() => this.handleStartGame()}>Start game</button>
                }
            </div>
        );
    }
}

AudioCallStart.defaultProps = {
    repositoryState: undefined,
};

AudioCallStart.propTypes = {
    repositoryState: PropTypes.shape({
        currentSettings: PropTypes.shape({
            group: PropTypes.number,
            page: PropTypes.number,
        }),
    }),
    startGame: PropTypes.func.isRequired,
};
