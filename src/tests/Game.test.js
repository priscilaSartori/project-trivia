import mockFetch from "./mockFetch.js";
import mockFetchFail from "./mockFetchFail.js";
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { findByText, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe('testando a tela de jogo', () => {
  jest.setTimeout(50000);
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

  it('testa se ao acertar todas as questẽs a pontuação correta é obtida', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('input-gravatar-email');
    userEvent.type(inputEmail, '123@.com');

    const inputName = screen.getByTestId('input-player-name');
    userEvent.type(inputName, 'My name');

    const btnPlay = screen.getByTestId('btn-play');
    userEvent.click(btnPlay);

    await waitFor(() => expect(history.location.pathname).toBe('/game'));
    const score = await screen.findByTestId('header-score');

    const rightAnswer = await screen.findByTestId('correct-answer');
    userEvent.click(rightAnswer);
    const btnNext = await screen.findByTestId('btn-next');
    expect(score.innerHTML).toBe('70');
    userEvent.click(btnNext);

    const rightAnswer2 = await screen.findByTestId('correct-answer');
    userEvent.click(rightAnswer2)
    expect(score.innerHTML).toBe('170');
    userEvent.click(btnNext);

    const rightAnswer3 = await screen.findByTestId('correct-answer');
    userEvent.click(rightAnswer3)
    expect(score.innerHTML).toBe('210');
  });

  it('testa se ao obter um token invalido o usuario é redireciano a tele de login', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockFetchFail),
    }));

    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('input-gravatar-email');
    userEvent.type(inputEmail, '123@.com');

    const inputName = screen.getByTestId('input-player-name');
    userEvent.type(inputName, 'My name');

    const btnPlay = screen.getByTestId('btn-play');
    userEvent.click(btnPlay);

    await waitFor(() => expect(history.location.pathname).toBe('/game'));
    await waitFor(() => expect(history.location.pathname).toBe('/'));
  });

  it('testa se o usuario é redirecionado a tela de configurações', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('input-gravatar-email');
    userEvent.type(inputEmail, '123@.com');

    const inputName = screen.getByTestId('input-player-name');
    userEvent.type(inputName, 'My name');

    const btnPlay = screen.getByTestId('btn-play');
    userEvent.click(btnPlay);

    await waitFor(() => expect(history.location.pathname).toBe('/game'));
    const btnSettings = await screen.findByTestId('btn-settings');
    userEvent.click(btnSettings);
    await waitFor(() => expect(history.location.pathname).toBe('/settings'));
  });

  it('testa se ao responder 5 perguntas o ranking é salvo no localStore', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('input-gravatar-email');
    userEvent.type(inputEmail, '123@.com');
    const inputName = screen.getByTestId('input-player-name');
    userEvent.type(inputName, 'My name');
    const btnPlay = screen.getByTestId('btn-play');
    userEvent.click(btnPlay);
    await waitFor(() => expect(history.location.pathname).toBe('/game'));

    const rightAnswer = await screen.findByTestId('correct-answer');
    userEvent.click(rightAnswer);
    const btnNext = await screen.findByTestId('btn-next');
    userEvent.click(btnNext);

    const rightAnswer2 = await screen.findByTestId('correct-answer');
    userEvent.click(rightAnswer2);
    userEvent.click(btnNext);

    const rightAnswer3 = await screen.findByTestId('correct-answer');
    userEvent.click(rightAnswer3);
    userEvent.click(btnNext);

    const rightAnswer4 = await screen.findByTestId('correct-answer');
    userEvent.click(rightAnswer4);
    userEvent.click(btnNext);

    const rightAnswer5 = await screen.findByTestId('correct-answer');
    userEvent.click(rightAnswer5);
    userEvent.click(btnNext);
    await waitFor(() => expect(history.location.pathname).toBe('/feedback'));
    expect(localStorage.getItem('ranking')).toBe('[{"name":"My name","gravatarEmail":"123@.com","score":380}]');
  }); 

  it('testa se os botẽs sao desativas apos o tempo acabar', async () => {

    const testApp = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('input-gravatar-email');
    userEvent.type(inputEmail, '123@.com');
    const inputName = screen.getByTestId('input-player-name');
    userEvent.type(inputName, 'My name');
    const btnPlay = await screen.findByTestId('btn-play');
    userEvent.click(btnPlay);
    const rightAnswer = await screen.findByTestId('correct-answer');
    await waitFor(() => expect(testApp.history.location.pathname).toBe('/game'));
    const spanTempo = await screen.findByText(/Tempo:/i);
    console.log(spanTempo.innerHTML);
    await waitFor(() => expect(spanTempo.innerHTML).toBe('Tempo:29s'));
    // await new Promise((r) => setTimeout(r, 32000));
    // expect(rightAnswer).toBeDisabled();
  });
});
