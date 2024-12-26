import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { vi } from 'vitest';
import Register from '../components/Register';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

const mockNavigate = vi.fn();
(useNavigate as jest.Mock).mockReturnValue(mockNavigate);

vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

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
    fireEvent.click(screen.getByText('already_have_account'));
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
});
