import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import getQuestions from '../service/getQuestions';
import styles from './Game.module.css';
import { addScore, addAssertions } from '../redux/actions';

class Game extends React.Component {
  state = {
    questions: {},
    currentQuestion: 0,
    loadingQuestions: true,
    required: false,
    stopwatch: 30,
    clicked: false,
    time: false,
  };

  async componentDidMount() {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const questions = await getQuestions(token);
    const expirationCode = 3;
    const timerMin = 1000;
    setInterval(this.timerStopwatch, timerMin);

    if (questions.response_code === expirationCode) {
      localStorage.removeItem('token');
      history.push('/');
    }

    for (let index = 0; index < questions.results.length; index += 1) {
      const correctAnswer = questions.results[index].correct_answer;
      const incorrectAnswers = questions.results[index].incorrect_answers;
      const alternatives = [correctAnswer, ...incorrectAnswers];
      const randomDivision = 0.5;
      const shuffledAlternatives = alternatives
        .sort(() => Math.random() - randomDivision);

      questions.results[index].shuffledAlternatives = shuffledAlternatives;
    }

    this.setState({
      questions,
    }, () => { this.setState({ loadingQuestions: false }); });
  }

  redirectPage = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  timerStopwatch = () => {
    const { stopwatch } = this.state;

    if (stopwatch > 0) {
      this.setState({ stopwatch: [stopwatch - 1], time: false });
    } else {
      this.setState({ time: true });
    }
  };

  handleClick = (testeId, difficulty) => {
    const { dispatch } = this.props;
    const { stopwatch } = this.state;
    let difficultyNumber = 0;

    const easyNumber = 1;
    const mediumNumber = 2;
    const hardNumber = 3;

    if (difficulty === 'easy') difficultyNumber = easyNumber;
    if (difficulty === 'medium') difficultyNumber = mediumNumber;
    if (difficulty === 'hard') difficultyNumber = hardNumber;

    if (testeId.includes('correct')) {
      const ScoreToAdd = 10;
      const one = 1;
      dispatch(addScore(ScoreToAdd + (stopwatch * difficultyNumber)));
      dispatch(addAssertions(one));
    }

    this.setState({
      clicked: true,
    });
  };

  nextQuestion = () => {
    const { currentQuestion } = this.state;
    const maxQuestoes = 3;
    if (currentQuestion <= maxQuestoes) {
      this.setState({
        currentQuestion: currentQuestion + 1,
        stopwatch: 30,
        required: false,
      });
    }
    if (currentQuestion > maxQuestoes) {
      const { name, score, gravatarEmail, history } = this.props;
      const InfoRanking = { name, gravatarEmail, score };
      const getRanking = JSON.parse(localStorage.getItem('ranking')) ?? [];
      if (getRanking !== []) {
        localStorage.setItem('ranking', JSON.stringify([...getRanking, InfoRanking]));
      } else {
        localStorage.setItem('ranking', JSON.stringify(InfoRanking));
      }
      history.push('/feedback');
    }
  };

  render() {
    const { questions,
      currentQuestion,
      loadingQuestions,
      time,
      stopwatch,
      clicked,
      required } = this.state;
    if (loadingQuestions) return (<p>Carregando Perguntas</p>);
    const { category,
      question,
      shuffledAlternatives,
      difficulty,
    } = questions.results[currentQuestion];
    const correctAnswer = questions.results[currentQuestion].correct_answer;
    const incorrectAnswers = questions.results[currentQuestion].incorrect_answers;
    return (
      <div>
        <Header />
        <div>
          <h2 data-testid="question-category">
            {category}
          </h2>
          <p data-testid="question-text">
            {question}
          </p>
          <span>
            Tempo:
            {stopwatch}
            s
          </span>
          <div data-testid="answer-options">
            {
              shuffledAlternatives.map((alternative, index) => {
                let dataTestId = 'correct-answer';
                let incorrectAnswerIndex = 0;
                if (alternative !== correctAnswer) {
                  incorrectAnswers.find((incorrectAnswer, i) => {
                    if (incorrectAnswer === alternative) incorrectAnswerIndex = i;
                    return 0;
                  });
                  dataTestId = `wrong-answer-${incorrectAnswerIndex}`;
                }
                let style = styles.Answer;
                if (required) {
                  if (alternative !== correctAnswer) {
                    style = styles.IncorrectAnswer;
                    return (
                      <button
                        key={ index }
                        type="button"
                        data-testid={ dataTestId }
                        className={ style }
                        onClick={ () => this.setState({ required: true }) }
                        disabled={ time }
                      >
                        {alternative}
                      </button>
                    );
                  }
                  style = styles.CorrectAnswer;
                }
                return (
                  <button
                    key={ index }
                    type="button"
                    data-testid={ dataTestId }
                    className={ style }
                    onClick={ () => this
                      .setState({ required: true }, () => this
                        .handleClick(dataTestId, difficulty)) }
                    disabled={ time }
                  >
                    {alternative}
                  </button>
                );
              })
            }
          </div>
        </div>
        {stopwatch === 0 || clicked === true
          ? (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ this.nextQuestion }
            >
              Next
            </button>
          )
          : null}
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
  dispatch: PropTypes.func.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = ({ player }) => ({
  gravatarEmail: player.gravatarEmail,
  name: player.name,
  score: player.score,
});

export default connect(mapStateToProps)(Game);
