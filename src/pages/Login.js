import React from 'react';
import logo from '../trivia.png';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      <div className="position-absolute top-50 start-50 translate-middle">
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
            >
              Play

            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
