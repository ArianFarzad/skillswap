import React from 'react';
import { initializeMocks, mockedAxios, mockI18n, mockNavigate } from './testUtils/mocks.ts';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from '../components/Register';

initializeMocks();
mockI18n();

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Register Component', () => {
  test('shows a general error message on unexpected error', async () => {
    renderWithRouter(<Register />);

    mockedAxios.post.mockRejectedValueOnce(new Error('unexpected_error'));

    fireEvent.change(screen.getByPlaceholderText('name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('email'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('password'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await screen.findByText('unexpected_error');
    expect(mockedAxios.post).toHaveBeenCalledWith(
      'http://localhost:8000/api/auth/register',
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      }
    );
  });

  test('navigates to login on clicking "already have an account"', () => {
    renderWithRouter(<Register />);
    fireEvent.click(screen.getByText('Already have an account?'));
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
});
