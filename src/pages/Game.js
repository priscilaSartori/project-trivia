import React from 'react';
import PropTypes from 'prop-types';

class Game extends React.Component {
  redirectPage = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    return (
      <div>
        <p>Tela de jogo</p>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.redirectPage }
        >
          Configuração

        </button>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default Game;
