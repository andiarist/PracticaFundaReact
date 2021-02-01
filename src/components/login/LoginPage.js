import React from 'react';
import { login } from '../../api/auth';
import Tipos from 'prop-types';

import './LoginPage.css';

class LoginPage extends React.Component {
  state = {
    form: {
      email: '',
      password: '',
      remember: false,
    },
    error: false,
  };

  handleChangeCheckbox = event => {
    this.setState(state => ({
      form: { ...state.form, remember: event.target.checked },
    }));
  };

  handleChangeForm = event => {
    this.setState(state => ({
      form: { ...state.form, [event.target.name]: event.target.value },
    }));
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { onLogin, history } = this.props;
    const { form: credentials } = this.state;
    try {
      const loggedUser = await login(credentials);
      onLogin(loggedUser);
      if (loggedUser) {
        history.push('/adverts');
      } else {
        this.setState({ error: true });
      }
    } catch (er) {}
  };

  render() {
    const {
      form: { email, password, remember },
      error,
      errorMessage,
    } = this.state;
    return (
      <div className="loginPage">
        <h1 className="loginPage-title">Log in</h1>
        <form className="login-form" onSubmit={this.handleSubmit}>
          <input
            className="input-text"
            type="email"
            name="email"
            value={email}
            onChange={this.handleChangeForm}
            required
          />
          <input
            className="input-text"
            type="password"
            name="password"
            value={password}
            onChange={this.handleChangeForm}
            required
          />
          <label htmlFor="remember">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              checked={remember}
              onChange={this.handleChangeCheckbox}
            />
            Remember me
          </label>
          <button type="submit" className="button-submit">
            Log in
          </button>
        </form>
        {error && <div>Error de credenciales</div>}
      </div>
    );
  }
}

LoginPage.propTypes = {
  onLogin: Tipos.func.isRequired,
  history: Tipos.object.isRequired,
};
export default LoginPage;
