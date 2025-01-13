import React from 'react';
import { initializeMocks, mockedAxios, mockI18n, mockNavigate } from './testUtils/mocks.ts';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../components/Login';

initializeMocks();
mockI18n();

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Login Component', () => {
  test('shows a general error message on unexpected error', async () => {
    renderWithRouter(<Login />);

    mockedAxios.post.mockRejectedValueOnce(new Error('unexpected_error'));

    fireEvent.change(screen.getByPlaceholderText('email'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('password'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await screen.findByText('unexpected_error');
    expect(mockedAxios.post).toHaveBeenCalledWith(
      'http://localhost:8000/api/auth/login',
      {
        email: 'john@example.com',
        password: 'password123',
      }
    );
  });

  test('navigates to register on clicking "new here"', () => {
    renderWithRouter(<Login />);
    fireEvent.click(screen.getByText('new here?'));
    expect(mockNavigate).toHaveBeenCalledWith('/register');
  });
});
