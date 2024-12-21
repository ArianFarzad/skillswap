import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import { format } from 'date-fns';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import NavBar from './NavBar';
import { Footer } from './Footer';
import '../style/bookAppointment.css';

const BookAppointment: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [date, setDate] = useState(new Date());

  const handleBookAppointment = () => {
    const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${title}
DESCRIPTION:${description}
DTSTART:${format(new Date(startDate), "yyyyMMdd'T'HHmmss'Z'")}
DTEND:${format(new Date(endDate), "yyyyMMdd'T'HHmmss'Z'")}
END:VEVENT
END:VCALENDAR
    `.trim();

    const blob = new Blob([icsContent], {
      type: 'text/calendar;charset=utf-8',
    });
    saveAs(blob, 'appointment.ics');
  };

  return (
    <>
      <NavBar />
      <div className={'appointment-container'}>
        <h2 className={'appointment-headline'}>Termin buchen</h2>
        <div className={'appointment-main-content'}>
          <form
            id={'appointment-form'}
            onSubmit={(e) => {
              e.preventDefault();
              handleBookAppointment();
            }}
          >
            <div className={'appointment-input'}>
              <label htmlFor={'title-input'}>Titel:</label>
              <input
                id={'title-input'}
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className={'appointment-input'}>
              <label htmlFor={'description-input'}>Beschreibung:</label>
              <input
                id={'description-input'}
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className={'appointment-input'}>
              <label htmlFor={'start-date-input'}>Startdatum:</label>
              <input
                id={'start-date-input'}
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div className={'appointment-input'}>
              <label htmlFor={'end-date-input'}>Enddatum:</label>
              <input
                id={'end-date-input'}
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
            <button id={'appointment-submit'} type="submit">
              Termin buchen und exportieren
            </button>
          </form>
          <div className={'calender-container'}>
            <Calendar onChange={setDate} value={date} />
          </div>
        </div>
      </div>
        <Footer />
    </>
  );
};

export default BookAppointment;
