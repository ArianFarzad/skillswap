import './testUtils/mocks.ts'; // Die Mocks werden hier importiert
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BookAppointment from '../components/BookAppointment';
import { saveAs } from 'file-saver';
import { showErrorMessage } from '../utils/toastUtils';

describe('BookAppointment Component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <BookAppointment />
      </MemoryRouter>
    );
  });

  test('renders book appointment headline', () => {
    const headline = screen.getByTestId('bookAppointment-headline');
    expect(headline).toBeInTheDocument();
    expect(headline.textContent).toBe('book_appointment');
  });

  test('renders book appointment form fields', () => {
    const startDate = screen.getByLabelText('start_date');
    const endDate = screen.getByLabelText('end_date');
    const titleInput = screen.getByLabelText('title');
    const descriptionInput = screen.getByLabelText('description');
    const bookAppointmentButton = screen.getByTestId('book-appointment-button');

    expect(startDate).toBeInTheDocument();
    expect(endDate).toBeInTheDocument();
    expect(titleInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(bookAppointmentButton).toBeInTheDocument();
  });

  test('submit book appointment form successfully', async () => {
    const titleInput = screen.getByLabelText('title');
    const descriptionInput = screen.getByLabelText('description');
    const startDateInput = screen.getByLabelText('start_date');
    const endDateInput = screen.getByLabelText('end_date');
    const bookAppointmentButton = screen.getByTestId('book-appointment-button');

    fireEvent.change(titleInput, { target: { value: 'Meeting' } });
    fireEvent.change(descriptionInput, { target: { value: 'Team sync-up' } });
    fireEvent.change(startDateInput, { target: { value: '2025-01-26T10:00' } });
    fireEvent.change(endDateInput, { target: { value: '2025-01-26T11:00' } });

    fireEvent.click(bookAppointmentButton);

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(saveAs).toHaveBeenCalled();
    expect(saveAs).toHaveBeenCalledWith(expect.any(Blob), 'appointment.ics');
  });

  test('handle book appointment form error', async () => {
    const titleInput = screen.getByLabelText('title');
    const descriptionInput = screen.getByLabelText('description');
    const startDateInput = screen.getByLabelText('start_date');
    const endDateInput = screen.getByLabelText('end_date');
    const bookAppointmentButton = screen.getByTestId('book-appointment-button');

    fireEvent.change(titleInput, { target: { value: 'Meeting' } });
    fireEvent.change(descriptionInput, { target: { value: 'Team sync-up' } });
    fireEvent.change(startDateInput, { target: { value: '2025-01-26T11:00' } });
    fireEvent.change(endDateInput, { target: { value: '2025-01-26T10:00' } });

    fireEvent.click(bookAppointmentButton);

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(showErrorMessage).toHaveBeenCalledWith(
      'end_date_before_start_date',
      expect.any(Function)
    );
  });
});
