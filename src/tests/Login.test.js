import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { getByText, screen, waitFor } from '@testing-library/react';

describe('Teste tela de Login', () => {
    it('Testa se o botão de configuração está na tela', () => {
        renderWithRouterAndRedux(<App />);
        const btnSettings = screen.getByRole('button', { name: 'Configuração' })
        expect(btnSettings).toBeInTheDocument();
    })
    it('Testa se o botão configurações redireciona para "/settings"', () => {
        const { history } = renderWithRouterAndRedux(<App />);
        const btnSettings = screen.getByRole('button', { name: 'Configuração' })
        userEvent.click(btnSettings);
        expect(history.location.pathname).toBe('/settings');
    })
    it('Testa se o input email está na tela', () => {
        renderWithRouterAndRedux(<App />);
        const inputEmail = screen.getByTestId('input-gravatar-email');
        expect(inputEmail).toBeInTheDocument();
    })
    it('Testa se o input nome está na tela', () => {
        renderWithRouterAndRedux(<App />);
        const inputName = screen.getByTestId("input-player-name");
        expect(inputName).toBeInTheDocument();
    })
    it('Testa se o logotipo está na tela', () => {
        renderWithRouterAndRedux(<App />);
        const logo = screen.getByAltText("logo");
        expect(logo).toBeInTheDocument();
    })
    it('Testa se o botão "Play" fica habilitado quando os campos de email e nome estão corretamente preenchidos', () => {
        renderWithRouterAndRedux(<App />);
        const inputEmail = screen.getByTestId('input-gravatar-email');
        const inputName = screen.getByTestId("input-player-name");
        const bntPlay = screen.getByRole('button', { name: 'Play' });
        userEvent.type(inputEmail, 'test@trybe.com')
        userEvent.type(inputName, 'test')
        expect(bntPlay).toBeEnabled();
    })
    it('Testa se o botão "Play" redireciona para "/Game"', async () => {

        const { history } = renderWithRouterAndRedux(<App />);
        const inputEmail = screen.getByTestId('input-gravatar-email');
        const inputName = screen.getByTestId("input-player-name");
        userEvent.type(inputEmail, 'test@trybe.com')
        userEvent.type(inputName, 'test')
        const btnPlay = screen.getByRole('button', { name: 'Play' })
        userEvent.click(btnPlay)
        const tela = await screen.findByText('Tela de jogo')
        expect(tela).toBeInTheDocument();
        expect(history.location.pathname).toBe('/game');
    })
})