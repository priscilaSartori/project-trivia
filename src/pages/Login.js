import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getToken, getLogin } from '../redux/actions';
import logo from '../trivia.png';
import 'bootstrap/dist/css/bootstrap.min.css';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
    disabled: true,
  };

  redirectPage = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  handleClick = async () => {
    const { dispatch, history } = this.props;
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const json = await response.json();
    dispatch(getToken(json.token));
    dispatch(getLogin(this.state));
    localStorage.setItem('token', json.token);
    history.push('/game');
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validation());
  };

  validation = () => {
    const { name, email } = this.state;
    if (name.length > 0 && email.length > 0) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  };

  render() {
    const { disabled, name, email } = this.state;
    return (
      <div className="position-absolute top-50 start-50 translate-middle">
        <div>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.redirectPage }
          >
            Configuração

          </button>
        </div>
        <img src={ logo } className="App-logo" alt="logo" />
        <div className="mt-5">
          <div className="mb-2 d-grid gap-2">
            <label htmlFor="inputEmail" className="form-label">
              <input
                id="inputEmail"
                type="email"
                name="email"
                data-testid="input-gravatar-email"
                value={ email }
                onChange={ this.handleChange }
                className="form-control"
                placeholder="Qual é o seu e-mail do gravatar?"
              />
            </label>
          </div>
          <div className="mb-2 d-grid gap-2">
            <label htmlFor="inputName" className="form-label">
              <input
                id="inputName"
                data-testid="input-player-name"
                name="name"
                value={ name }
                onChange={ this.handleChange }
                className="form-control"
                placeholder="Qual é o seu nome?"
              />
            </label>
          </div>
          <div className="d-grid gap-2">
            <button
              data-testid="btn-play"
              type="button"
              className="btn btn-success"
              disabled={ disabled }
              onClick={ () => { this.handleClick(); } }
            >
              Play

            </button>
          </div>
        </div>

      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default connect()(Login);
