import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Welcome from '../components/Welcome';

describe('Welcome Component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Welcome />
      </MemoryRouter>
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
