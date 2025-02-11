import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Welcome from '../components/Welcome';
import { I18nextProvider } from 'react-i18next';
import i18n from './testUtils/i18nTestConfig';
import { beforeEach, describe, expect, test } from 'vitest';

describe('Welcome Component', () => {
  beforeEach(() => {
    render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter>
          <Welcome />
        </MemoryRouter>
      </I18nextProvider>
    );
  });

  test('renders welcome headline', () => {
    const headline = screen.getByTestId('welcome-headline');
    expect(headline).toBeInTheDocument();
    expect(headline.textContent).toBe('welcome');
  });

  test('renders welcome text', () => {
    const welcomeText = screen.getByText('connect_learn_grow');
    expect(welcomeText).toBeInTheDocument();
  });

  test('renders login and register links', () => {
    const loginLink = screen.getByText('login');
    const registerLink = screen.getByText('register');

    expect(loginLink).toBeInTheDocument();
    expect(loginLink.getAttribute('href')).toBe('/login');

    expect(registerLink).toBeInTheDocument();
    expect(registerLink.getAttribute('href')).toBe('/register');
  });
});
