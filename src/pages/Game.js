import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getQuestions from '../service/getQuestions';
import styles from './Game.module.css';

class Game extends React.Component {
  state = {
    questions: {},
    currentQuestion: 0,
    loadingQuestions: true,
    required: false,
  };

  async componentDidMount() {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const questions = await getQuestions(token);
    const expirationCode = 3;

    if (questions.response_code === expirationCode) {
      localStorage.removeItem('token');
      history.push('/');
    }

    this.setState({
      questions,
    }, () => { this.setState({ loadingQuestions: false }); });
  }

  redirectPage = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { questions, currentQuestion, loadingQuestions, required } = this.state;
    if (loadingQuestions) return (<p>Carregando Perguntas</p>);
    const { category, question } = questions.results[currentQuestion];
    const correctAnswer = questions.results[currentQuestion].correct_answer;
    const incorrectAnswers = questions.results[currentQuestion].incorrect_answers;
    const alternatives = [correctAnswer, ...incorrectAnswers];
    const randomDivision = 0.5;
    const shuffledAlternatives = alternatives
      .sort(() => Math.random() - randomDivision);
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
                      >
                        {alternative}
                      </button>
                    );
                  } style = styles.CorrectAnswer;
                }
                return (
                  <button
                    key={ index }
                    type="button"
                    data-testid={ dataTestId }
                    className={ style }
                    onClick={ () => this.setState({ required: true }) }
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
