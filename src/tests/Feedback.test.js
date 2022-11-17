import mockFetch from "./mockFetch.js";
import mockFetchFail from "./mockFetchFail.js";
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { findByText, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe('testando a tela de feedback', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockFetch),
    }));

    // global.fetch = jest.fn().mockResolvedValue({
    //   json: jest.fn().mockResolvedValue(mockData),
    // });
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  it('testa se o usuario é redirecionado para a tele de login caso aperte em "play again" ', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('input-gravatar-email');
    userEvent.type(inputEmail, '123@.com');
    const inputName = screen.getByTestId('input-player-name');
    userEvent.type(inputName, 'My name');
    const btnPlay = screen.getByTestId('btn-play');
    userEvent.click(btnPlay);
    await waitFor(() => expect(history.location.pathname).toBe('/game'));

    const wrongAnswer = await screen.findByTestId('wrong-answer-0');
    userEvent.click(wrongAnswer);
    const btnNext = await screen.findByTestId('btn-next');
    userEvent.click(btnNext);

    const wrongAnswer2 = await screen.findByTestId('wrong-answer-0');
    userEvent.click(wrongAnswer2);
    userEvent.click(btnNext);

    const wrongAnswer3 = await screen.findByTestId('wrong-answer-0');
    userEvent.click(wrongAnswer3);
    userEvent.click(btnNext);

    const wrongAnswer4 = await screen.findByTestId('wrong-answer-0');
    userEvent.click(wrongAnswer4);
    userEvent.click(btnNext);

    const wrongAnswer5 = await screen.findByTestId('wrong-answer-0');
    userEvent.click(wrongAnswer5);
    userEvent.click(btnNext);
    await waitFor(() => expect(history.location.pathname).toBe('/feedback'));

    const expectedMessage = await screen.findByTestId('feedback-text');
    expect(expectedMessage.innerHTML).toBe('Could be better...');

    const btnPlayAgain = await screen.findByTestId('btn-play-again');
    userEvent.click(btnPlayAgain);
    await waitFor(() => expect(history.location.pathname).toBe('/'));
  })

  it('teste se o usuario é redirecionado a tela de ranking caso aperte em "Ranking"', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('input-gravatar-email');
    userEvent.type(inputEmail, '123@.com');
    const inputName = screen.getByTestId('input-player-name');
    userEvent.type(inputName, 'My name');
    const btnPlay = screen.getByTestId('btn-play');
    userEvent.click(btnPlay);
    await waitFor(() => expect(history.location.pathname).toBe('/game'));

    const wrongAnswer = await screen.findByTestId('wrong-answer-0');
    userEvent.click(wrongAnswer);
    const btnNext = await screen.findByTestId('btn-next');
    userEvent.click(btnNext);

    const wrongAnswer2 = await screen.findByTestId('wrong-answer-0');
    userEvent.click(wrongAnswer2);
    userEvent.click(btnNext);

    const wrongAnswer3 = await screen.findByTestId('wrong-answer-0');
    userEvent.click(wrongAnswer3);
    userEvent.click(btnNext);

    const wrongAnswer4 = await screen.findByTestId('wrong-answer-0');
    userEvent.click(wrongAnswer4);
    userEvent.click(btnNext);

    const wrongAnswer5 = await screen.findByTestId('wrong-answer-0');
    userEvent.click(wrongAnswer5);
    userEvent.click(btnNext);
    await waitFor(() => expect(history.location.pathname).toBe('/feedback'));


    const btnRanking = await screen.findByTestId('btn-ranking');
    userEvent.click(btnRanking);
    await waitFor(() => expect(history.location.pathname).toBe('/ranking'));

    const btnGoHome = await screen.findByTestId('btn-go-home');
    userEvent.click(btnGoHome);
    await waitFor(() => expect(history.location.pathname).toBe('/'));
  });

  
});
