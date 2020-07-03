import React, { Component } from 'react';
import './main.scss';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import { Button } from '../../shared/button';
import { ModalSettings } from './modal';

export class Options extends Component {
    render() {
        const {
            isOpenModal,
            closeModal,
            settings,
            onChangeInput,
            clickSettings,
            checkSettings,
            onchangeCheckbox,
            isInvalidSettings,
        } = this.props;
        return (
            <div className="main-page_options">
                {isOpenModal
                    ? (
                        <ModalSettings
                            closeModal={closeModal}
                            settings={settings}
                            onChangeInput={onChangeInput}
                            onchangeCheckbox={onchangeCheckbox}
                            clickSettings={clickSettings}
                            checkSettings={checkSettings}
                            isInvalidSettings={isInvalidSettings}
                        />
                    ) : null}
                <div className="options-settings">
                    <Button className="button" title="Settings" onClick={clickSettings} />
                    <NavLink to="/main/study" className="learning-words">
                        <Button className="button btn-start" title="START" />
                    </NavLink>
                </div>
                <div className="options-learning">
                    <NavLink to={{
                        pathname: '/main/study',
                    }}
                    >
                        <Button className="button" title="Learn new words" />
                    </NavLink>
                    <NavLink to="/main/study" className="learning-words">
                        <Button className="button" title="Repeat words" />
                    </NavLink>
                </div>
            </div>
        );
    }
}
