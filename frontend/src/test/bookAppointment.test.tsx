import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import BookAppointment from '../components/BookAppointment';
import { saveAs } from 'file-saver';

vi.mock('file-saver', () => ({
  saveAs: vi.fn(),
}));

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('BookAppointment Component', () => {
  test('renders BookAppointment component', () => {
    renderWithProviders(<BookAppointment />);
    expect(screen.getByText('Termin buchen')).toBeInTheDocument();
  });

  test('fills out and submits the form', async () => {
    renderWithProviders(<BookAppointment />);

    fireEvent.change(screen.getByLabelText('Titel:'), {
      target: { value: 'Meeting' },
    });
    fireEvent.change(screen.getByLabelText('Beschreibung:'), {
      target: { value: 'Team meeting' },
    });
    fireEvent.change(screen.getByLabelText('Startdatum:'), {
      target: { value: '2023-12-01T10:00' },
    });
    fireEvent.change(screen.getByLabelText('Enddatum:'), {
      target: { value: '2023-12-01T11:00' },
    });

    fireEvent.click(screen.getByText('Termin buchen und exportieren'));

    await waitFor(() => {
      expect(saveAs).toHaveBeenCalled();
      const blob = saveAs.mock.calls[0][0];
      const reader = new FileReader();
      reader.onload = () => {
        const icsContent = reader.result as string;
        expect(icsContent).toContain('SUMMARY:Meeting');
        expect(icsContent).toContain('DESCRIPTION:Team meeting');
        expect(icsContent).toContain('DTSTART:20231201T100000Z');
        expect(icsContent).toContain('DTEND:20231201T110000Z');
      };
      reader.readAsText(blob);
    });
  });
});
