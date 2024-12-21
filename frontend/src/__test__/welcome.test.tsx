import React from 'react';
import { render, screen } from '@testing-library/react';
import { Welcome } from '../components/Welcome';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n'; // Assuming you have an i18n configuration file
import { describe, it, expect } from 'vitest';

const renderWelcomeComponent = () => {
  render(
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <Welcome />
      </BrowserRouter>
    </I18nextProvider>
  );
};

describe('Welcome', () => {
  it('renders title', () => {
    renderWelcomeComponent();
    expect(screen.getByText('welcome')).toBeInTheDocument();
  });

  it('renders welcome text', () => {
    renderWelcomeComponent();
    expect(screen.getByText('connect_learn_grow')).toBeInTheDocument();
  });

  it('renders login and register links', () => {
    renderWelcomeComponent();
    expect(screen.getByText('login')).toBeInTheDocument();
    expect(screen.getByText('register')).toBeInTheDocument();
  });
});
