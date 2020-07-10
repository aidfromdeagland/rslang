/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createIncArray } from '../../../utils/utils';
import { Spinner } from '../../shared/spinner';
import { GROUP_COUNT, PAGE_COUNT } from '../../../constants/globalConstants';
import { Repository } from './repository';
import { tryExecute } from './utils';
import { SimpleSelect } from './simpleSelect';
import { ModalSettings } from './modal';
import { MODE_GAME } from './constants';

export class AudioCallStart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            repositoryState: props.repositoryState,
            group: props.repositoryState ? props.repositoryState.currentSettings.group : undefined,
            page: props.repositoryState ? props.repositoryState.currentSettings.page : undefined,
        };
    }

    componentDidMount() {
        this.repository = new Repository(this.props.repositoryState, () => {
            this.setState({
                repositoryState: this.repository.state,
            });
        });
        tryExecute(async () => {
            if (this.state.repositoryState) {
                await this.repository.setLevel(this.state.page, this.state.group);
            } else {
                await this.repository.loadSettings((settings) => {
                    this.setState({
                        repositoryState: this.repository.state,
                        group: settings.group,
                        page: settings.page,
                    });
                    this.repository.loadData();
                });
            }
        }, this.props.errorFunction);
    }

    handleGroupChange(group) {
        this.setState({ group });
    }

    handlePageChange(page) {
        this.setState({ page });
    }

    handleSettingsChange(currentSettings) {
        tryExecute(async () => {
            await this.repository.setNewSettings(currentSettings,
                (repositoryState) => this.setState({ repositoryState }));
        }, this.props.errorFunction);
        this.setState({ repositoryState: this.repository.state, isOpenModal: false });
    }

    handleStartGame() {
        if (this.state.repositoryState.currentSettings.modeGame === MODE_GAME['All words']) {
            tryExecute(async () => {
                this.repository.setLevel(this.state.page, this.state.group);
            }, this.props.errorFunction);
        }

        if (!this.repository.checkLoaded(() => {
            this.setState({ isGame: true, isLoading: false });
            this.props.startGame(this.repository.state);
        })) {
            this.setState({ isLoading: true });
        }
    }

    render() {
        if (this.state.isGame) {
            return null;
        }
        const isLevelModeGame = this.state.repositoryState
            && this.state.repositoryState.load.loading.modeGame === MODE_GAME['All words'];

        return (
            <div className="audio-call">
                {this.state.isOpenModal && this.state.repositoryState
                    ? (
                        <ModalSettings
                            ok={(data) => { this.handleSettingsChange(data); }}
                            close={() => { this.setState({ isOpenModal: false }); }}
                            currentSettings={this.state.repositoryState.currentSettings}
                        />
                    ) : null}
                <h1 className="audio-call__header">Audio Call</h1>
                {isLevelModeGame
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
                <span className="audio-call__train">Use keyboard to be faster! (1, 2, 3, 4, 5, Enter)</span>
                {
                    this.state.isLoading || !this.state.repositoryState
                        ? <Spinner />
                        : (
                            <div className="audio-call__buttons">
                                <button
                                    className="audio-call__button audio-call__start-game"
                                    type="button"
                                    onClick={() => this.handleStartGame()}
                                >
                                    Start game
                                </button>
                                <button
                                    className="audio-call__button audio-call__setting-button"
                                    type="button"
                                    title="Game settings"
                                    onClick={() => this.setState({ isOpenModal: true })}
                                />
                            </div>
                        )
                }
            </div>
        );
    }
}

AudioCallStart.defaultProps = {
    repositoryState: null,
};

AudioCallStart.propTypes = {
    repositoryState: PropTypes.shape({
        currentSettings: PropTypes.shape({
            group: PropTypes.number,
            page: PropTypes.number,
        }),
    }),
    startGame: PropTypes.func.isRequired,
    errorFunction: PropTypes.func.isRequired,
};
