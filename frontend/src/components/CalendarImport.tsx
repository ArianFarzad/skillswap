import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface Event {
  summary: string;
  description: string;
  start: string;
  end: string;
}

const CalendarImport: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [message, setMessage] = useState<string>('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) {
      setMessage('Bitte wählen Sie eine Datei aus.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post<Event[]>(
        'http://localhost:8000/api/calendar/import',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setEvents(response.data);
      setMessage('Datei erfolgreich importiert.');
    } catch (error) {
      console.error('Fehler beim Hochladen der .ics-Datei:', error);
      setMessage('Fehler beim Hochladen der Datei.');
    }
  };

  return (
    <div>
      <h2>Kalender importieren</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Importieren</button>
      </form>
      {message && <p>{message}</p>}
      <h3>Importierte Ereignisse</h3>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            <strong>{event.summary}</strong>
            <br />
            {event.description}
            <br />
            Start: {new Date(event.start).toLocaleString()}
            <br />
            Ende: {new Date(event.end).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CalendarImport;
