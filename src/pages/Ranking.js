import React from 'react';

class Ranking extends React.Component {
  redirectPage = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <div>

        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.redirectPage }
        >
          Ir para a tela inicial
        </button>

      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default Ranking;
