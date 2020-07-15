import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Button } from '../shared/button';

export class AuthBlock extends Component {
    render() {
        const { isAuth, logOut } = this.props;
        return (
            isAuth
                ? <Button title="Logout" onClick={logOut} className="header__button header__button_logout" />
                : <NavLink exact className="header__button header__button_register" to="/auth"> Authentication </NavLink>
        );
    }
}

AuthBlock.propTypes = {
    isAuth: PropTypes.bool.isRequired,
    logOut: PropTypes.func.isRequired,
};
