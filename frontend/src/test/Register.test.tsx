import './testUtils/mocks';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Register from '../components/Register';
import axiosInstance from '../utils/axiosInstance';
import { I18nextProvider } from 'react-i18next';
import i18n from './testUtils/i18nTestConfig';
import { showToast } from '../utils/toastUtils';
import { beforeEach, describe, expect, test } from 'vitest';

describe('Register Component', () => {
  beforeEach(() => {
    render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </I18nextProvider>
    );
  });

  test('renders register headline', () => {
    const headline = screen.getByTestId('register-headline');
    expect(headline).toBeInTheDocument();
  });

  test('renders register form fields', () => {
    const usernameInput = screen.getByLabelText('username');
    const emailInput = screen.getByLabelText('email_address');
    const passwordInput = screen.getByLabelText('password');
    const registerButton = screen.getByTestId('register-button');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });

  test('submit register form successfully', async () => {
    const usernameInput = screen.getByLabelText('username');
    const emailInput = screen.getByLabelText('email_address');
    const passwordInput = screen.getByLabelText('password');
    const registerButton = screen.getByTestId('register-button');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'testuser@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(registerButton);

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(axiosInstance.post).toHaveBeenCalledWith('/api/auth/register', {
      name: 'testuser',
      email: 'testuser@example.com',
      password: 'password',
    });

    await waitFor(() => {
      expect(showToast).toHaveBeenCalledWith(
        'success',
        'register_success',
        expect.any(Function)
      );
    });
  });

  test.skip('handle register form error', async () => {});
});
