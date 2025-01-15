import React from 'react';
import TranslationBar from '../components/TranslationBar';
import BookAppointment from '../components/BookAppointment';
import Feedback from '../components/Feedback';
import Chat from '../components/Chat';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import '../style/SessionPage.css';

const SessionPage: React.FC = () => {
  const { t } = useTranslation();
  const { sessionId } = useParams<{ sessionId: string }>();
  const senderId = localStorage.getItem('myUserId') || '';

  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);

  return (
    <>
      <TranslationBar />
      <div className="session-content">
        <div className={isFeedbackVisible ? 'hide' : 'calendar-container'}>
          <BookAppointment />
        </div>
        <div className="chat-container">
          <Chat sessionId={sessionId} senderId={senderId} />
        </div>
        <div className="feedback-toggle">
          <button
            className="toggle-btn"
            data-testid="toggle-feedback-btn"
            onClick={() => setIsFeedbackVisible(!isFeedbackVisible)}
          >
            {isFeedbackVisible ? (
              <span className={'btn-text'}>{t('book_appointment')}</span>
            ) : (
              <span className={'btn-text'}>{t('give_feedback')}</span>
            )}
          </button>
        </div>
        {isFeedbackVisible && (
          <div className={'feedback-container'}>
            <Feedback sessionId={sessionId} senderId={senderId} />
          </div>
        )}
      </div>
    </>
  );
};

export default SessionPage;
