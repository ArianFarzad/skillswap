import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import { format } from 'date-fns';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useTranslation } from 'react-i18next';
import ReactPopover from 'react-popover';
import {
  AppointmentContainer,
  AppointmentForm,
  AppointmentInput,
  AppointmentSubmit,
  CalendarSection,
  DescriptionInput,
  EndDateInput,
  EventDot,
  PopoverBody,
  StartDateInput,
  TitleInput,
} from '../style/components/BookAppointment.style';
import { Value } from 'react-calendar/dist/cjs/shared/types';
import axiosInstance from '../utils/axiosInstance';

interface Event {
  summary: string;
  description: string;
  start: string;
  end: string;
}

const BookAppointment: React.FC = () => {
  const {
    t,
  }: {
    t: (key: keyof typeof import('../../public/locales/en.json')) => string;
  } = useTranslation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [uploadedEvents, setUploadedEvents] = useState<Event[]>([]);
  const [calendarDate, setCalendarDate] = useState<Value>(new Date());
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const validateDate = (): boolean => {
    if (new Date(endDate) < new Date(startDate)) {
      alert('End date must be after start date.');
      return false;
    }
    return true;
  };

  const handleBookAppointment = () => {
    if (!validateDate()) {
      return;
    }

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

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axiosInstance.post<Event[]>(
          '/api/calendar/import',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        setUploadedEvents((prevEvents) => [...prevEvents, ...response.data]);
        alert('File uploaded successfully.');
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Error uploading file.');
      }
    }
  };

  const handlePopoverOpen = (event: Event) => {
    setSelectedEvent(event);
    setPopoverOpen(true);
  };

  const handlePopoverClose = () => {
    setPopoverOpen(false);
    setSelectedEvent(null);
  };

  return (
    <AppointmentContainer>
      <h2
        className="appointment-headline"
        data-testid="bookAppointment-headline"
      >
        {t('book_appointment')}
      </h2>
      <AppointmentForm
        id="appointment-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleBookAppointment();
        }}
      >
        <AppointmentInput>
          <label htmlFor="title-input">{t('title')}:</label>
          <TitleInput
            id="title-input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </AppointmentInput>
        <AppointmentInput>
          <label htmlFor="description-input">{t('description')}:</label>
          <DescriptionInput
            id="description-input"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </AppointmentInput>
        <AppointmentInput>
          <label htmlFor="start-date-input">{t('start_date')}:</label>
          <StartDateInput
            id="start-date-input"
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </AppointmentInput>
        <AppointmentInput>
          <label htmlFor="end-date-input">{t('end_date')}:</label>
          <EndDateInput
            id="end-date-input"
            type="datetime-local"
            value={endDate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEndDate(e.target.value)
            }
            required
          />
        </AppointmentInput>
        <AppointmentSubmit id="appointment-submit" type="submit">
          {t('book_and_export')}
        </AppointmentSubmit>
      </AppointmentForm>

      <div className="upload-section">
        <h3>{t('upload_ics')}</h3>
        <input type="file" onChange={handleFileUpload} />
      </div>

      <CalendarSection>
        <h3>{t('events_calendar')}</h3>
        <Calendar
          onChange={(value: Value) => setCalendarDate(value)}
          value={calendarDate}
          tileContent={({ date }) => {
            const eventsOnDate = uploadedEvents.filter(
              (event) =>
                new Date(event.start).toDateString() === date.toDateString()
            );

            if (eventsOnDate.length > 0) {
              return (
                <div>
                  {eventsOnDate.map((event, index) => (
                    <EventDot
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePopoverOpen(event);
                      }}
                    >
                      ●
                    </EventDot>
                  ))}
                </div>
              );
            }
            return null;
          }}
        />
      </CalendarSection>

      {selectedEvent && (
        <ReactPopover
          isOpen={popoverOpen}
          body={
            <PopoverBody>
              <h4>{selectedEvent.summary}</h4>
              <p>{selectedEvent.description}</p>
              <p>Start: {new Date(selectedEvent.start).toLocaleString()}</p>
              <p>End': {new Date(selectedEvent.end).toLocaleString()}</p>
              <button onClick={handlePopoverClose}>{t('close')}</button>
            </PopoverBody>
          }
          onOuterAction={handlePopoverClose}
        >
          <div />
        </ReactPopover>
      )}
    </AppointmentContainer>
  );
};

export default BookAppointment;
