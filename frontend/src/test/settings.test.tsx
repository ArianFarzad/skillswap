import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import i18n from '../i18nForTests';
import Settings from '../components/Settings';
import { BrowserRouter } from 'react-router-dom';

const renderWithI18n = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Settings Component', () => {
  test('renders Settings component', async () => {
    renderWithI18n(<Settings />);
    await waitFor(() => {
      expect(screen.getByTestId('settings-headline')).toBeInTheDocument();
    });
  });

  test('changes language to English', () => {
    renderWithI18n(<Settings />);
    fireEvent.click(screen.getByLabelText(/english/i));
    expect(i18n.language).toBe('en');
  });

  test('changes language to German', () => {
    renderWithI18n(<Settings />);
    fireEvent.click(screen.getByLabelText(/german/i));
    expect(i18n.language).toBe('de');
  });

  test('displays correct text after language change', () => {
    renderWithI18n(<Settings />);
    fireEvent.click(screen.getByLabelText(/german/i));
    expect(screen.getByText('Einstellungen')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText(/english/i));
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });
});
