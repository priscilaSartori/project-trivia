import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getQuestions from '../service/getQuestions';

class Game extends React.Component {
  state = {
    questions: {},
    currentQuestion: 0,
    loadingQuestions: true,
    time: false,
    stopwatch: 30,
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
      console.log(incorrectAnswers);
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

  render() {
    const { questions, currentQuestion, loadingQuestions, time, stopwatch } = this.state;
    if (loadingQuestions) return (<p>Carregando Perguntas</p>);
    const { category,
      question,
      shuffledAlternatives,
    } = questions.results[currentQuestion];
    const correctAnswer = questions.results[currentQuestion].correct_answer;
    const incorrectAnswers = questions.results[currentQuestion].incorrect_answers;
    // const alternatives = [correctAnswer, ...incorrectAnswers];
    // const randomDivision = 0.5;
    // const shuffledAlternatives = alternatives
    //  .sort(() => Math.random() - randomDivision);
    return (
      <div>
        <Header />
        <div>
          <h2 data-testid="question-category">
            {category}
          </h2>
          <p data-testid="question-text">
            {question}
            <span>
              Tempo:
              { stopwatch }
              s
            </span>
          </p>
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
                return (
                  <button
                    key={ index }
                    type="button"
                    data-testid={ dataTestId }
                    disabled={ time }
                  >
                    {alternative}
                  </button>
                );
              })
            }
          </div>
        </div>
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
