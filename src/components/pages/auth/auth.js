import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './auth.scss';
import { Api } from '../../../services/userServices';
import { Storage } from './storage';
import { User } from './user';

export class Auth extends Component {
    static propTypes = {
        redirectPage: PropTypes.string,
    };

    static defaultProps = {
        redirectPage: '/main',
    };

    static checkPassword(password) {
        const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        return re.test(password);
    }

    static validateEmail(email) {
    // eslint-disable-next-line no-useless-escape
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    static redirectPage(href) {
        // TODO не самый удачный вариант редиректа, но лучше реализовать не получилось
        window.location.href = href;
    }

    constructor(props) {
        super(props); // указать на какую страницу перемещаться по завершению
        this.state = {
            isAuthentication: true,
            errorMain: undefined,
            errorPassword: undefined,
            errorEmail: undefined,
        };
    }

    componentDidMount() {
        this.checkAuthorized();
    }

    checkAuthorized() {
        if (!User.token) return;

        // todo включить загрузку
        Api.getUser(User.userId, User.token).then(() => {
            // todo выключить загрузку
            Auth.redirectPage(this.props.redirectPage);
        }).catch((error) => {
            Storage.clearToken();
            this.setState({
                errorMain: error.message,
            });
            // todo выключить загрузку
        });
    }

    submit(event) {
        event.preventDefault();
        const { login, password } = event.target.elements;

        if (!Auth.checkPassword(password.value)) {
            this.setState({
                errorPassword: 'the password must contain at least 8 characters, at least one uppercase letter, one uppercase letter, one digit, and one special character',
                errorMain: undefined,
            });
        } else if (!Auth.validateEmail(login.value)) {
            this.setState({
                errorEmail: 'email is not correct',
                errorPassword: undefined,
                errorMain: undefined,
            });
        } else {
            this.setState({
                errorEmail: undefined,
                errorPassword: undefined,
                errorMain: undefined,
            });
            // todo включить загрузку
            const { isAuthentication } = this.state;
            if (isAuthentication) {
                this.authentication(login.value, password.value);
            } else {
                this.registration(login.value, password.value);
            }
        }
    }

    authentication(login, password) {
        Api.logIn(login, password).then((user) => {
            Storage.saveUser(user.userId, user.token);
            // todo выключить загрузку
            Auth.redirectPage(this.props.redirectPage);
        }).catch((error) => {
            // todo выключить загрузку
            this.setState({
                errorMain: error.message,
            });
        });
    }

    registration(login, password) {
        Api.registration(login, password).then(() => {
            this.authentication(login, password);
        }).catch((error) => {
            // todo выключить загрузку
            this.setState({
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
        const {
            isAuthentication, errorMain, errorPassword, errorEmail,
        } = this.state;

        if (isAuthentication) {
            return (
                <div className="auth">
                    <h1 className="auth-header">Authentication</h1>
                    <span className="auth-description">Insert your e-mail and password.</span>
                    <form className="auth-form" onSubmit={(e) => this.submit(e)}>
                        <div className="auth__inputs">
                            <input id="auth-email" className="auth-form__input auth-form__login-input" name="login" type="email" placeholder="youremail@domain.com" />
                            { errorEmail && <span className="auth-form__error">{ errorEmail }</span> }
                            <input id="auth-password" className="auth-form__input auth-form__password-input" name="password" type="password" placeholder="**************" />
                            { errorPassword && <span className="auth-form__error">{ errorPassword }</span> }
                            { errorMain && <span className="auth-form__error">{ errorMain }</span> }
                        </div>
                        <div className="auth__buttons">
                            <button className="auth__button button__registration" type="button" onClick={() => this.showRegistration()}>Register</button>
                            <button className="auth__button button__log-in" type="submit">Login</button>
                        </div>
                    </form>
                </div>
            );
        }
        return (
            <div className="auth">
                <h1 className="auth-header">Registration</h1>
                <span className="auth-description">Insert your e-mail and password.</span>
                <form className="auth-form" onSubmit={(e) => this.submit(e)}>
                    <div className="auth__inputs">
                        <input id="auth-email" className="auth-form__input auth-form__login-input" name="login" type="email" placeholder="youremail@domain.com" />
                        { errorEmail && <span className="auth-form__error">{ errorEmail }</span> }
                        <input id="auth-password" className="auth-form__input auth-form__password-input" name="password" type="password" placeholder="**************" />
                        { errorPassword && <span className="auth-form__error">{ errorPassword }</span> }
                        { errorMain && <span className="auth-form__error">{ errorMain }</span> }
                    </div>
                    <div className="auth__buttons">
                        <button className="auth__button button__registration" type="button" onClick={() => this.showAuthentication()}>Authentication</button>
                        <button className="auth__button button__log-in" type="submit">Register</button>
                    </div>
                </form>
            </div>
        );
    }
}
