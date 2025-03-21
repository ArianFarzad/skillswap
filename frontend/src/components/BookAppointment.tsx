import React, { useCallback, useEffect, useState } from 'react';
import { format, isSameDay } from 'date-fns';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Value } from 'react-calendar/dist/cjs/shared/types';
import axios from '../utils/axiosInstance';
import { useTypedTranslation } from '../utils/translationUtils.ts';
import { showToast } from '../utils/toastUtils.ts';
import { IEvent } from '../models/models.ts';
import {
  FiCalendar,
  FiClock,
  FiDownload,
  FiUploadCloud,
  FiWatch,
  FiX,
} from 'react-icons/fi';
import {
  ActionButton,
  CalendarWrapper,
  CloseButton,
  Container,
  DownloadButton,
  EventActions,
  EventCard,
  EventDescription,
  EventDetails,
  EventDot,
  EventHeader,
  EventsPopup,
  EventTime,
  EventTitle,
  FloatingLabel,
  FormCard,
  FormHeader,
  GradientDivider,
  InputGroup,
  SectionTitle,
  StyledInput,
  UploadZone,
} from '../style/components/BookAppointment.style';

interface BookAppointmentProps {
  sessionId: string | undefined;
}

const BookAppointment: React.FC<BookAppointmentProps> = ({ sessionId }) => {
  const { t } = useTypedTranslation();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDateTime: '',
    endDateTime: '',
  });
  const [uploadedEvents, setUploadedEvents] = useState<IEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Value>(new Date());
  const [selectedDateEvents, setSelectedDateEvents] = useState<IEvent[]>([]);
  const [showEventsPopup, setShowEventsPopup] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const fetchEvents = useCallback(async () => {
    try {
      const response = await axios.get<IEvent[]>(`/api/calendar/${sessionId}`);
      setUploadedEvents(response.data);
    } catch (error) {
      showToast('error', error, t);
    }
  }, [sessionId, t]);

  useEffect(() => {
    if (sessionId) {
      fetchEvents().catch((error) => showToast('error', error, t));
    }
  }, [fetchEvents, sessionId, t]);

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload({
        target: { files },
      } as React.ChangeEvent<HTMLInputElement>).catch((error) =>
        showToast('error', error, t)
      );
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (new Date(formData.endDateTime) <= new Date(formData.startDateTime)) {
      showToast('error', 'end_date_before_start_date', t);
      return;
    }

    try {
      const response = await axios.post(`/api/calendar/create/${sessionId}`, {
        summary: formData.title,
        description: formData.description,
        start: formData.startDateTime,
        end: formData.endDateTime,
      });

      setUploadedEvents([...uploadedEvents, response.data]);
      showToast('success', 'event_created', t);
    } catch (error) {
      showToast('error', error, t);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const formData = new FormData();
      formData.append('file', e.target.files[0]);

      try {
        const response = await axios.post<IEvent[]>(
          `/api/calendar/import/${sessionId}`,
          formData
        );
        setUploadedEvents([...uploadedEvents, ...response.data]);
        showToast('success', 'upload_ics', t);
      } catch (error) {
        showToast('error', error, t);
      }
    }
  };

  const handleDateClick = (date: Date) => {
    const eventsForDay = uploadedEvents.filter((event) =>
      isSameDay(new Date(event.start), date)
    );
    setSelectedDateEvents(eventsForDay);
    setShowEventsPopup(true);
  };

  const handleDownloadSingleEventICS = async (eventId: string) => {
    try {
      const response = await axios.get(
        `/api/calendar/download/event/${eventId}`,
        {
          responseType: 'blob',
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'event.ics');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      showToast('error', error, t);
    }
  };

  return (
    <Container>
      <CalendarWrapper>
        <SectionTitle data-testid={'book-appointment-headline'}>
          <FiCalendar />
          {t('calendar')}
        </SectionTitle>
        <Calendar
          value={selectedDate}
          onChange={setSelectedDate}
          tileContent={({ date }) => (
            <div className="calendar-day" onClick={() => handleDateClick(date)}>
              {uploadedEvents
                .filter((event) => isSameDay(new Date(event.start), date))
                .map((_, index) => (
                  <EventDot key={index} $count={index + 1} />
                ))}
            </div>
          )}
          className="custom-calendar"
        />

        {showEventsPopup && (
          <EventsPopup>
            <CloseButton onClick={() => setShowEventsPopup(false)}>
              <FiX />
            </CloseButton>
            <EventHeader>
              <h3>{format(selectedDate as Date, 'dd.MM.yyyy')}</h3>
              <p>{t('events_for_day')}</p>
            </EventHeader>
            {selectedDateEvents.length > 0 ? (
              selectedDateEvents.map((event, index) => (
                <EventCard key={index}>
                  <EventDetails>
                    <EventTitle>
                      <FiWatch />
                      {event.summary}
                    </EventTitle>
                    <EventTime>
                      {format(new Date(event.start), 'HH:mm')} -{' '}
                      {format(new Date(event.end), 'HH:mm')}
                    </EventTime>
                    <EventDescription>{event.description}</EventDescription>
                  </EventDetails>
                  <EventActions>
                    <DownloadButton
                      onClick={() => handleDownloadSingleEventICS(event._id)}
                    >
                      <FiDownload />
                      {t('download')}
                    </DownloadButton>
                  </EventActions>
                </EventCard>
              ))
            ) : (
              <p>{t('no_events')}</p>
            )}
          </EventsPopup>
        )}
      </CalendarWrapper>

      <FormCard onSubmit={handleSubmit}>
        <FormHeader>
          <h2>{t('new_appointment')}</h2>
          <div className="accent-line" />
        </FormHeader>

        <InputGroup>
          <FloatingLabel>
            <label htmlFor={'title'}>{t('event_title')}</label>
            <StyledInput
              id="title"
              type="text"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </FloatingLabel>
        </InputGroup>

        <InputGroup>
          <FloatingLabel>
            <label htmlFor={'description'}>{t('description')}</label>
            <StyledInput
              id="description"
              type="text"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </FloatingLabel>
        </InputGroup>

        <GradientDivider />

        <InputGroup $icon>
          <FiClock />
          <FloatingLabel>
            <label htmlFor={'startDateTime'}>{t('start_time')}</label>
            <StyledInput
              id="startDateTime"
              type="datetime-local"
              value={formData.startDateTime}
              onChange={handleInputChange}
              required
            />
          </FloatingLabel>
        </InputGroup>

        <InputGroup $icon>
          <FiClock />
          <FloatingLabel>
            <label htmlFor={'endDateTime'}>{t('end_time')}</label>
            <StyledInput
              id="endDateTime"
              type="datetime-local"
              value={formData.endDateTime}
              onChange={handleInputChange}
              required
            />
          </FloatingLabel>
        </InputGroup>

        <UploadZone
          $isDragging={isDragging}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <FiUploadCloud className="upload-icon" />
          <input type="file" onChange={handleFileUpload} />
          <p>{t('drag_and_drop')}</p>
          <span className="file-types">.ics, .ical</span>
        </UploadZone>

        <ActionButton data-testid={'book-appointment-button'} type="submit">
          {t('create_event')}
        </ActionButton>
      </FormCard>
    </Container>
  );
};

export default BookAppointment;
