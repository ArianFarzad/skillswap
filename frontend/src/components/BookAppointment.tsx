import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import { format } from 'date-fns';
import NavBar from './NavBar';

const BookAppointment: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

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
      <div>
        <h2>Termin buchen</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleBookAppointment();
          }}
        >
          <div>
            <label>Titel:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Beschreibung:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Startdatum:</label>
            <input
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Enddatum:</label>
            <input
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
          <button type="submit">Termin buchen und exportieren</button>
        </form>
      </div>
    </>
  );
};

export default BookAppointment;
