import React, { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import { format, isSameDay } from 'date-fns';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Value } from 'react-calendar/dist/cjs/shared/types';
import axios from '../utils/axiosInstance';
import log from '../utils/loggerInstance.ts';
import { useTypedTranslation } from '../utils/translationUtils.ts';
import { showToast } from '../utils/toastUtils.ts';
import {
  FiCalendar,
  FiClock,
  FiUploadCloud,
  FiWatch,
  FiX,
} from 'react-icons/fi';
import {
  ActionButton,
  CalendarWrapper,
  CloseButton,
  Container,
  EventDot,
  EventItem,
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

interface Event {
  summary: string;
  description: string;
  start: string;
  end: string;
}

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
  const [uploadedEvents, setUploadedEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<Value>(new Date());
  const [selectedDateEvents, setSelectedDateEvents] = useState<Event[]>([]);
  const [showEventsPopup, setShowEventsPopup] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (sessionId) {
      fetchEvents();
    }
  }, [sessionId]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get<Event[]>(`/api/calendar/${sessionId}`);
      setUploadedEvents(response.data);
    } catch (error) {
      showToast('error', error, t);
      log.error('Error fetching events:', error);
    }
  };

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (new Date(formData.endDateTime) <= new Date(formData.startDateTime)) {
      log.debug('Validation triggered: End date is before start date');
      showToast('error', 'end_date_before_start_date', t);
      return;
    }
    const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${formData.title}
DESCRIPTION:${formData.description}
DTSTART:${format(new Date(formData.startDateTime), "yyyyMMdd'T'HHmmss'Z'")}
DTEND:${format(new Date(formData.endDateTime), "yyyyMMdd'T'HHmmss'Z'")}
END:VEVENT
END:VCALENDAR
    `.trim();

    const blob = new Blob([icsContent], {
      type: 'text/calendar;charset=utf-8',
    });
    saveAs(blob, 'appointment.ics');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const formData = new FormData();
      formData.append('file', e.target.files[0]);

      try {
        const response = await axios.post<Event[]>(
          `/api/calendar/import/${sessionId}`,
          formData
        );
        setUploadedEvents([...uploadedEvents, ...response.data]);
        showToast('success', 'upload_ics', t);
      } catch (error) {
        showToast('error', error, t);
        log.error('Error uploading ICS file:', error);
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

  const tileContent = ({ date }: { date: Date }) => {
    const dayEvents = uploadedEvents.filter((event) =>
      isSameDay(new Date(event.start), date)
    );

    return (
      <div className="calendar-day" onClick={() => handleDateClick(date)}>
        {dayEvents.map((_, index) => (
          <EventDot key={index} count={dayEvents.length} />
        ))}
      </div>
    );
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
          tileContent={tileContent}
          className="custom-calendar"
        />

        {showEventsPopup && (
          <EventsPopup>
            <CloseButton onClick={() => setShowEventsPopup(false)}>
              <FiX />
            </CloseButton>
            <h3>{format(selectedDate as Date, 'dd.MM.yyyy')}</h3>
            {selectedDateEvents.length > 0 ? (
              selectedDateEvents.map((event, index) => (
                <EventItem key={index}>
                  <EventTitle>
                    <FiWatch />
                    {event.summary}
                  </EventTitle>
                  <EventTime>
                    {format(new Date(event.start), 'HH:mm')} -{' '}
                    {format(new Date(event.end), 'HH:mm')}
                  </EventTime>
                  <p>{event.description}</p>
                </EventItem>
              ))
            ) : (
              <p>{t('no_events')}</p>
            )}
          </EventsPopup>
        )}
      </CalendarWrapper>

      <FormCard
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
      >
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