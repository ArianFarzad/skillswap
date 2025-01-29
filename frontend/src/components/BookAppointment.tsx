import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import { format } from 'date-fns';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ReactPopover from 'react-popover';
import {
  AppointmentContainer,
  AppointmentForm,
  AppointmentInput,
  AppointmentSubmit,
  CalendarSection,
  StyledInput,
  EventDot,
  Headline,
  Label,
  PopoverBody,
  Column,
  Row,
  ButtonRow,
  FileSelect,
} from '../style/components/BookAppointment.style';
import { Value } from 'react-calendar/dist/cjs/shared/types';
import axiosInstance from '../utils/axiosInstance';
import loggerInstance from '../utils/loggerInstance.ts';
import { useTypedTranslation } from '../utils/translationUtils.ts';
import { toast } from 'react-hot-toast';
import { showErrorMessage } from '../utils/toastUtils.ts';

interface Event {
  summary: string;
  description: string;
  start: string;
  end: string;
}

const BookAppointment: React.FC = () => {
  const { t } = useTypedTranslation();

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
      showErrorMessage('end_date_before_start_date', t);
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
        toast('File uploaded successfully.', { icon: '📅' });
      } catch (error) {
        loggerInstance.error('Error uploading file:', error);
        showErrorMessage('error_uploading_file', t);
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
    <>
      <Headline
        className="appointment-headline"
        data-testid="bookAppointment-headline"
      >
        {t('book_appointment')}
      </Headline>
      <AppointmentContainer>
        <CalendarSection>
          <Calendar
            onChange={(value: Value) => setCalendarDate(value)}
            value={calendarDate}
            className={'react-calendar'}
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

        <AppointmentForm
          id="appointment-form"
          data-testid="appointment-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleBookAppointment();
          }}
        >
          <Row>
            <Column>
              <AppointmentInput>
                <Label htmlFor="title-input">{t('title')}</Label>
                <StyledInput
                  id="title-input"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </AppointmentInput>
              <AppointmentInput>
                <Label htmlFor="description-input">{t('description')}</Label>
                <StyledInput
                  id="description-input"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </AppointmentInput>
            </Column>
            <Column>
              <AppointmentInput>
                <Label htmlFor="start-date-input">{t('start_date')}</Label>
                <StyledInput
                  id="start-date-input"
                  type="datetime-local"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </AppointmentInput>
              <AppointmentInput>
                <Label htmlFor="end-date-input">{t('end_date')}</Label>
                <StyledInput
                  id="end-date-input"
                  type="datetime-local"
                  value={endDate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEndDate(e.target.value)
                  }
                  required
                />
              </AppointmentInput>
            </Column>
          </Row>
          <ButtonRow>
            <div className="upload-section">
              <FileSelect type="file" onChange={handleFileUpload} />
            </div>
            <AppointmentSubmit
              data-testid="book-appointment-button"
              id="appointment-submit"
              type="submit"
            >
              {t('book_and_export')}
            </AppointmentSubmit>
          </ButtonRow>
        </AppointmentForm>
      </AppointmentContainer>
    </>
  );
};

export default BookAppointment;
