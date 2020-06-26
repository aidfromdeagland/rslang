/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './auth.scss';
import { UserService } from '../../../services/userServices';
import { Storage } from './storage';
import { User } from './user';
import { validateEmail, validatePassword } from './util';
import { Spinner } from '../../shared/spinner';

export class Auth extends Component {
    static redirectPage(href) {
        // TODO не самый удачный вариант редиректа, но лучше реализовать не получилось.
        // Возможно вообще не потребуется, если это будет модальное окно
        window.location.href = href;
    }

    constructor(props) {
        super(props); // указать на какую страницу перемещаться (если это будет отдельной страницей)
        this.state = {
            isLoading: false,
            isAuthentication: true,
            errorMain: undefined,
            errorPassword: undefined,
            errorEmail: undefined,
        };
    }

    componentDidMount() {
        // если пользователь авторизован, то уходим с авторизации на страницу 'redirectPage'
        this.checkAuthorized();
    }

    checkAuthorized() {
        if (!User.token) {
            return;
        }

        this.setState({ isLoading: true });
        UserService.getUser(User.userId, User.token).then(() => {
            this.setState({ isLoading: false });
            const { redirectPage } = this.props;
            Auth.redirectPage(redirectPage);
        }).catch((error) => {
            Storage.clearToken();
            this.setState({
                isLoading: false,
                errorMain: error.message,
            });
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { login, password } = event.target.elements;

        if (!validatePassword(password.value)) {
            this.setState({
                errorPassword: 'the password must contain at least 8 characters, at least one uppercase letter, one uppercase letter, one digit, and one special character',
                errorMain: undefined,
            });
        } else if (!validateEmail(login.value)) {
            this.setState({
                errorEmail: 'email is not correct',
                errorPassword: undefined,
                errorMain: undefined,
            });
        } else {
            this.setState({
                isLoading: true,
                errorEmail: undefined,
                errorPassword: undefined,
                errorMain: undefined,
            });
            const { isAuthentication } = this.state;
            if (isAuthentication) {
                this.authentication(login.value, password.value);
            } else {
                this.registration(login.value, password.value);
            }
        }
    }

    authentication(login, password) {
        UserService.logIn(login, password).then((user) => {
            Storage.saveUser(user.userId, user.token, login);
            this.setState({ isLoading: false });
            const { redirectPage } = this.props;
            Auth.redirectPage(redirectPage);
        }).catch((error) => {
            this.setState({
                isLoading: false,
                errorMain: error.message,
            });
        });
    }

    registration(login, password) {
        UserService.registration(login, password).then(() => {
            this.authentication(login, password);
        }).catch((error) => {
            this.setState({
                isLoading: false,
                errorMain: error.message,
            });
        });
    }

    showRegistration() {
        this.setState({
            isAuthentication: false,
            errorEmail: undefined,
            errorPassword: undefined,
            errorMain: undefined,
        });
    }

    showAuthentication() {
        this.setState({
            isAuthentication: true,
            errorEmail: undefined,
            errorPassword: undefined,
            errorMain: undefined,
        });
    }

    render() {
        const buttons = this.state.isAuthentication
            ? (
                <div className="auth__buttons">
                    <button className="auth__button button__registration" type="button" onClick={() => this.showRegistration()}>Register</button>
                    <button className="auth__button button__log-in" type="submit">Login</button>
                </div>
            )
            : (
                <div className="auth__buttons">
                    <button className="auth__button button__registration" type="button" onClick={() => this.showAuthentication()}>Login</button>
                    <button className="auth__button button__log-in" type="submit">Register</button>
                </div>
            );

        const login = this.state.isAuthentication ? Storage.login : undefined;

        return (
            <div className="auth">
                { this.state.isLoading && <Spinner /> }
                <h1 className="auth-header">{ this.state.isAuthentication ? 'Authentication' : 'Registration' }</h1>
                <span className="auth-description">Insert your e-mail and password.</span>
                <form className="auth-form" onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="auth__inputs">
                        <input id="auth-email" className="auth-form__input auth-form__login-input" name="login" type="email" placeholder="youremail@domain.com" defaultValue={login} />
                        { this.state.errorEmail && <span className="auth-form__error">{ this.state.errorEmail }</span> }
                        <input id="auth-password" className="auth-form__input auth-form__password-input" name="password" type="password" placeholder="**************" />
                        { this.state.errorPassword && <span className="auth-form__error">{ this.state.errorPassword }</span> }
                        { this.state.errorMain && <span className="auth-form__error">{ this.state.errorMain }</span> }
                    </div>
                    { buttons }
                </form>
            </div>
        );
    }
}

Auth.propTypes = {
    redirectPage: PropTypes.string,
};

Auth.defaultProps = {
    redirectPage: '/main',
};
