import React from 'react';
import logo from '../trivia.png';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
    disabled: true,
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
      <div>
        <img src={ logo } className="App-logo" alt="logo" />
        <label htmlFor="inputName">
          Nome:
          <input
            id="inputName"
            data-testid="input-player-name"
            name="name"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="inputEmail">
          Email:
          <input
            id="inputEmail"
            type="email"
            name="email"
            data-testid="input-gravatar-email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <button data-testid="btn-play" type="button" disabled={ disabled }>Play</button>
      </div>
    );
  }
}

export default Login;
