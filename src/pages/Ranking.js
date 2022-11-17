import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    const getRanking = JSON.parse(localStorage.getItem('ranking'));
    const getRankingSort = getRanking.sort((a, b) => b.score - a.score);
    this.setState({ ranking: getRankingSort });
  }

  redirectPage = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { ranking } = this.state;
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        {ranking.map((rankingUn, index) => (
          <div key={ index }>
            <p
              data-testid={ `player-name-${index}` }
            >
              {rankingUn.name}
            </p>
            <p data-testid={ `player-score-${index}` }>
              {rankingUn.score}
            </p>
            <p>{rankingUn.gravatarEmail}</p>
          </div>
        ))}
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

export default connect()(Ranking);
