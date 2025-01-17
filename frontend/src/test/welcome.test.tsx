import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Welcome from '../components/Welcome';
import { vi } from 'vitest';
import React from 'react';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Welcome Component', () => {
  it('renders the welcome headline', () => {
    renderWithRouter(<Welcome />);
    expect(
      screen.getByRole('heading', { name: 'welcome' })
    ).toBeInTheDocument();
  });

  it('renders the welcome text', () => {
    renderWithRouter(<Welcome />);
    expect(screen.getByText('connect_learn_grow')).toBeInTheDocument();
  });

  it('renders the login link', () => {
    renderWithRouter(<Welcome />);
    const loginLink = screen.getByRole('link', { name: 'login' });
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute('href', '/login');
  });

  it('renders the register link', () => {
    renderWithRouter(<Welcome />);
    const registerLink = screen.getByRole('link', { name: 'register' });
    expect(registerLink).toBeInTheDocument();
    expect(registerLink).toHaveAttribute('href', '/register');
  });
});
