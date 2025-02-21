import './testUtils/mocks.ts';
import i18n from './testUtils/i18nTestConfig';
import { MemoryRouter } from 'react-router-dom';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import BookAppointment from '../components/BookAppointment';
import { saveAs } from 'file-saver';
import { I18nextProvider } from 'react-i18next';
import { showToast } from '../utils/toastUtils';
import { beforeEach, describe, expect, test } from 'vitest';

describe('BookAppointment Component', () => {
  beforeEach(async () => {
    await act(async () => {
      render(
        <I18nextProvider i18n={i18n}>
          <MemoryRouter>
            <BookAppointment sessionId={'dummy-session-id'} />
          </MemoryRouter>
        </I18nextProvider>
      );
    });
  });

  test('renders book appointment headline', () => {
    const headline = screen.getByTestId('book-appointment-headline');
    expect(headline).toBeInTheDocument();
    expect(headline.textContent).toBe('calendar');
  });

  test('renders book appointment form fields', () => {
    const startDate = screen.getByLabelText('start_time');
    const endDate = screen.getByLabelText('end_time');
    const titleInput = screen.getByLabelText('event_title');
    const descriptionInput = screen.getByLabelText('description');
    const bookAppointmentButton = screen.getByTestId('book-appointment-button');

    expect(startDate).toBeInTheDocument();
    expect(endDate).toBeInTheDocument();
    expect(titleInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(bookAppointmentButton).toBeInTheDocument();
  });

  test('submit book appointment form successfully', async () => {
    const titleInput = screen.getByLabelText('event_title');
    const descriptionInput = screen.getByLabelText('description');
    const startDateInput = screen.getByLabelText('start_time');
    const endDateInput = screen.getByLabelText('end_time');
    const bookAppointmentButton = screen.getByTestId('book-appointment-button');

    act(() => {
      fireEvent.change(titleInput, { target: { value: 'Meeting' } });
      fireEvent.change(descriptionInput, { target: { value: 'Team sync-up' } });
      fireEvent.change(startDateInput, {
        target: { value: '2025-01-26T10:00' },
      });
      fireEvent.change(endDateInput, { target: { value: '2025-01-26T11:00' } });

      fireEvent.click(bookAppointmentButton);
    });

    await waitFor(() => {
      expect(saveAs).toHaveBeenCalled();
      expect(saveAs).toHaveBeenCalledWith(expect.any(Blob), 'appointment.ics');
    });
  });

  test('handle book appointment form error', async () => {
    const titleInput = screen.getByLabelText('event_title');
    const descriptionInput = screen.getByLabelText('description');
    const startDateInput = screen.getByLabelText('start_time');
    const endDateInput = screen.getByLabelText('end_time');
    const bookAppointmentButton = screen.getByTestId('book-appointment-button');

    act(() => {
      fireEvent.change(titleInput, { target: { value: 'Meeting' } });
      fireEvent.change(descriptionInput, {
        target: { value: 'Follow-up Meeting' },
      });
      fireEvent.change(startDateInput, {
        target: { value: '2025-01-26T11:00' },
      });
      fireEvent.change(endDateInput, { target: { value: '2025-01-26T10:00' } });

      fireEvent.click(bookAppointmentButton);
    });

    await waitFor(() => {
      expect(showToast).toHaveBeenCalledTimes(5);
      expect(showToast).toHaveBeenCalledWith(
        'error',
        'end_date_before_start_date',
        expect.any(Function)
      );
    });
  });
});
