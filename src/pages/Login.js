import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getToken, getLogin } from '../redux/actions';
import logo from '../trivia.png';

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
      <div className="vh-100 d-flex justify-content-center align-items-center bg-white">
        <div
          className="col-md-4 p-5 border border-2
        rounded-5 bg-light shadow-lg"
        >
          <img src={ logo } className="App-logo" alt="logo" />
          <label htmlFor="inputEmail" className="form-label mt-5 d-grid">
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
          <label htmlFor="inputName" className="form-label d-grid">
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
          <div className="d-grid gap-2 mb-3">
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
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.redirectPage }
            className="btn btn-light border border-0"
          >
            {/* <CiSettings size={ 28 } /> */}
          </button>

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
