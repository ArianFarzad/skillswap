import React, { useState } from 'react';
import SettingsBar from '../components/SettingsBar.tsx';
import BookAppointment from '../components/BookAppointment';
import Feedback from '../components/Feedback';
import Chat from '../components/Chat';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { calculatePoints } from '../utils/helpers';
import { showToast } from '../utils/toastUtils.ts';
import {
  CalendarContainer,
  ChatContainer,
  EndSession,
  EndSessionButton,
  FeedbackButton,
  FeedbackContainer,
  OptionP,
  ReversedRow,
  SessionContent,
  StyledP,
} from '../style/pages/SessionPage.style';
import { useTypedTranslation } from '../utils/translationUtils.ts';
import axios from '../utils/axiosInstance.ts';
import log from '../utils/loggerInstance.ts';

const SessionPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTypedTranslation();
  const { sessionId } = useParams<{ sessionId: string }>();
  const senderId = localStorage.getItem('myUserId') || '';

  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
  const [isEndSessionActivated, setIsEndSessionActivated] = useState(false);
  const [exchangeMessagesCount, setExchangeMessagesCount] = useState(0);

  const isEndSessionValid = exchangeMessagesCount < 10;

  const handleFeedbackVisibility = () => {
    setIsFeedbackVisible((prevState) => !prevState);
  };

  const handleMessagesCountChange = (count: number) => {
    setExchangeMessagesCount(count);
  };

  const handleActivateEndSession = () => {
    setIsEndSessionActivated((prevState) => !prevState);
  };

  const handleEndSession = async () => {
    const points = calculatePoints(exchangeMessagesCount);
    try {
      await axios.put('/api/gamification/points', {
        userId: senderId,
        points,
      });
      setIsEndSessionActivated(false);
      void navigate('/profile');

      showToast('success', 'congrats_and_points', t, {
        params: { points: points.toString() },
      });

      log.info('Points saved:', points);
    } catch (error) {
      log.error('Error saving points:', error);
    }
  };

  return (
    <HelmetProvider>
      <>
        <Helmet>
          <title>SkillSwap - {t('session')}</title>
        </Helmet>
        {/*// TODO fix null on this SettingsBar or modify the logic, yb*/}
        <SettingsBar profile={null} />
        <SessionContent>
          <CalendarContainer className={isFeedbackVisible ? 'hide' : ''}>
            <BookAppointment sessionId={sessionId}/>
          </CalendarContainer>
          <ChatContainer>
            {isFeedbackVisible ? (
              <FeedbackContainer>
                <Feedback sessionId={sessionId} senderId={senderId} />
              </FeedbackContainer>
            ) : (
              <Chat
                sessionId={sessionId}
                senderId={senderId}
                onMessagesCountChange={handleMessagesCountChange}
              />
            )}
          </ChatContainer>
        </SessionContent>
        <EndSession>
          <ReversedRow>
            {isEndSessionActivated && (
              <>
                <OptionP
                  onClick={() => {
                    setIsEndSessionActivated(false);
                  }}
                >
                  {t('no')}
                </OptionP>
                <OptionP onClick={handleEndSession}>{t('yes')}</OptionP>
                <StyledP>{t('confirm_end_session')}</StyledP>
              </>
            )}
            <EndSessionButton
              disabled={isEndSessionValid}
              disabledStyle={isEndSessionValid}
              onClick={handleActivateEndSession}
            >
              {t('end_session')}
            </EndSessionButton>
            <FeedbackButton
              displayStyle={!isEndSessionValid}
              onClick={handleFeedbackVisibility}
            >
              {t('give_feedback')}
            </FeedbackButton>
          </ReversedRow>
        </EndSession>
      </>
    </HelmetProvider>
  );
};

export default SessionPage;
