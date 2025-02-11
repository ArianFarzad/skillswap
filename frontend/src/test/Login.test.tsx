import './testUtils/mocks';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../components/Login';
import axiosInstance from '../utils/axiosInstance';
import { I18nextProvider } from 'react-i18next';
import i18n from './testUtils/i18nTestConfig';
import { beforeEach, describe, expect, Mock, test } from 'vitest';

describe('Login Component', () => {
  beforeEach(() => {
    render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </I18nextProvider>
    );
  });

  test('renders login headline', () => {
    const headline = screen.getByTestId('login-headline');
    expect(headline).toBeInTheDocument();
    expect(headline.textContent).toBe('login');
  });

  test('renders login form fields', () => {
    const emailInput = screen.getByLabelText('email_address');
    const passwordInput = screen.getByLabelText('password');
    const loginButton = screen.getByTestId('login-button');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test('submits login form successfully', async () => {
    const mockResponse = {
      data: {
        token: 'mockToken',
        userId: 'mockUserId',
      },
    };

    const mockPost = axiosInstance.post as Mock;

    mockPost.mockResolvedValue(mockResponse);

    const emailInput = screen.getByLabelText('email_address');
    const passwordInput = screen.getByLabelText('password');
    const loginButton = screen.getByTestId('login-button');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(axiosInstance.post).toHaveBeenCalledWith('/api/auth/login', {
      email: 'test@example.com',
      password: 'password123',
    });

    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'mockToken');
    expect(localStorage.setItem).toHaveBeenCalledWith('myUserId', 'mockUserId');
  });

  test.skip('handles login errors gracefully', async () => {});
});
