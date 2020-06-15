import React, { Component } from 'react';
import './auth.scss';
import Api from '../../../utils/api';
import Settings from '../../../utils/settings';

export class Auth extends Component {
  static checkPassword(password) {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    return re.test(password);
  }

  static validateEmail(email) {
    // eslint-disable-next-line no-useless-escape
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  static redirectStartPage() {
    window.location.href = '/main'; // TODO не самый удачный вариант редиректа, но лучше реализовать не получилось
  }

  static checkAuthorized() {
    const settings = Settings.getSettings();
    if (!settings || !settings.token) return;

    // todo включить загрузку
    Api.getUser(settings.userId, settings.token).then((user) => {
      Auth.redirectStartPage();
      // todo выключить загрузку
    }).catch((error) => {
      Settings.clearSettings();
      this.setState({
        error2: error.message,
      });
      // todo выключить загрузку
    });
  }

  constructor(props) {
    super(props);
    this.state = { error2: undefined, errorPassword: undefined, errorEmail: undefined };
  }

  submit(event) {
    event.preventDefault();
    const { login, password } = event.target.elements;

    if (!Auth.checkPassword(password.value)) {
      this.setState({
        errorPassword: 'the password must contain at least 8 characters, at least one uppercase letter, one uppercase letter, one digit, and one special character',
        error2: undefined,
      });
    } else if (!Auth.validateEmail(login.value)) {
      this.setState({
        errorEmail: 'email is not correct',
        errorPassword: undefined,
        error2: undefined,
      });
    } else {
      this.setState({
        errorEmail: undefined,
        errorPassword: undefined,
        error2: undefined,
      });
      // todo включить загрузку
      Api.logIn(login.value, password.value).then((user) => {
        Settings.saveSettings(user.userId, user.token);
        // todo выключить загрузку
        Auth.redirectStartPage();
      }).catch((error) => {
        // todo выключить загрузку
        this.setState({
          error2: error.message,
        });
      });
    }
  }

  render() {
    const { error2, errorPassword, errorEmail } = this.state;
    Auth.checkAuthorized();

    return (
      <div className="auth">
        <h1>Authentication</h1>
        <form className="auth-form" onSubmit={(e) => this.submit(e)}>
          <label className="auth-form__label" htmlFor="auth-email">
            Email
            <input id="auth-email" className="auth-form__input" name="login" type="email" />
          </label>
          { errorEmail && <span className="auth-form__error">{ errorEmail }</span> }
          <label className="auth-form__label" htmlFor="auth-password">
            Password
            <input id="auth-password" className="auth-form__input" name="password" type="password" />
          </label>
          { errorPassword && <span className="auth-form__error">{ errorPassword }</span> }
          { error2 && <span className="auth-form__error">{ error2 }</span> }
          <button className="auth__button button__log-in" type="submit">log in</button>
        </form>
        <button className="auth__button button__registration" type="button">registration</button>
      </div>
    );
  }
}
