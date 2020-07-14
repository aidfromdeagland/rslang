import React, { Component } from 'react';
import './main.scss';
import { NavLink } from 'react-router-dom';
import { Button } from '../../shared/button';
import { ModalSettings } from './modal';

export class Options extends Component {
    render() {
        const {
            isOpenModal,
            acceptSettings,
            handleCloseModal,
            settings,
            onChangeInput,
            clickSettings,
            onChangeCheckbox,
            isInvalidSettings,
        } = this.props;
        return (
            <div className="main-page_options">
                {isOpenModal
                    ? (
                        <ModalSettings
                            acceptSettings={acceptSettings}
                            handleCloseModal={handleCloseModal}
                            settings={settings}
                            onChangeInput={onChangeInput}
                            onChangeCheckbox={onChangeCheckbox}
                            clickSettings={clickSettings}
                            isInvalidSettings={isInvalidSettings}
                        />
                    ) : null}
                <div className="options-settings">
                    <NavLink to={{
                        pathname: '/main/study',
                        allowNewWords: true,
                        allowLearnedWords: true,
                        onlyDifficultWords: false,
                    }}
                    >
                        <Button className="button btn-start" title="START" />
                    </NavLink>
                    <Button className="button" title="settings" onClick={clickSettings} />
                </div>
                <div className="options-learning">
                    <NavLink to={{
                        pathname: '/main/study',
                        allowNewWords: true,
                        allowLearnedWords: false,
                        onlyDifficultWords: false,
                    }}
                    >
                        <Button className="button" title="new words" />
                    </NavLink>
                    <NavLink to={{
                        pathname: '/main/study',
                        allowNewWords: false,
                        allowLearnedWords: true,
                        onlyDifficultWords: false,
                    }}
                    >
                        <Button className="button" title="learned words" />
                    </NavLink>
                    <NavLink to={{
                        pathname: '/main/study',
                        allowNewWords: false,
                        allowLearnedWords: true,
                        onlyDifficultWords: true,
                    }}
                    >
                        <Button className="button" title="difficult words" />
                    </NavLink>
                </div>
            </div>
        );
    }
}
