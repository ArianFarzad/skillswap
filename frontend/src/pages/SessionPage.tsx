import React, { useState } from 'react';
import TranslationBar from '../components/TranslationBar';
import BookAppointment from '../components/BookAppointment';
import Feedback from '../components/Feedback';
import Chat from '../components/Chat';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import {
  ButtonText,
  CalendarContainer,
  ChatContainer,
  FeedbackContainer,
  FeedbackToggle,
  SessionContent,
  ToggleButton,
} from '../style/pages/SessionPage.style';

const SessionPage: React.FC = () => {
  const {
    t,
  }: {
    t: (key: keyof typeof import('../../public/locales/en.json')) => string;
  } = useTranslation();
  const { sessionId } = useParams<{ sessionId: string }>();
  const senderId = localStorage.getItem('myUserId') || '';

  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);

  return (
    <>
      <TranslationBar />
      <SessionContent>
        <CalendarContainer className={isFeedbackVisible ? 'hide' : ''}>
          <BookAppointment />
        </CalendarContainer>
        <ChatContainer>
          <Chat sessionId={sessionId} senderId={senderId} />
        </ChatContainer>
        <FeedbackToggle>
          <ToggleButton
            data-testid="toggle-feedback-btn"
            onClick={() => setIsFeedbackVisible(!isFeedbackVisible)}
          >
            {isFeedbackVisible ? (
              <ButtonText>{t('book_appointment')}</ButtonText>
            ) : (
              <ButtonText>{t('give_feedback')}</ButtonText>
            )}
          </ToggleButton>
        </FeedbackToggle>
        {isFeedbackVisible && (
          <FeedbackContainer>
            <Feedback sessionId={sessionId} senderId={senderId} />
          </FeedbackContainer>
        )}
      </SessionContent>
    </>
  );
};

export default SessionPage;
