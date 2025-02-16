import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance.ts';
import log from '../utils/loggerInstance.ts';
import { ISession } from '../models/models.ts';
import { useTypedTranslation } from '../utils/translationUtils.ts';
import { useHandleChatRequest } from '../utils/chatUtils.ts';
import {
  SessionsContainer,
  SessionTitle,
  SessionList,
  SessionItem,
  SessionDetail,
  NoSessionsMessage,
  Button,
} from '../style/components/MySessions.style.tsx';

const MySessions: React.FC = () => {
  const myUserId = localStorage.getItem('myUserId') || '';
  const [sessions, setSessions] = useState<ISession[]>([]);
  const { t } = useTypedTranslation();
  const handleChatRequest = useHandleChatRequest();

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get(`/api/sessions/users/${myUserId}`);

        if (Array.isArray(response.data)) {
          setSessions(response.data);
        } else {
          log.error('Invalid response from server:', response.data);
          setSessions([]);
        }

        log.info('Sessions fetched:', response.data);
      } catch (error) {
        log.error('Error fetching sessions:', error);
        setSessions([]);
      }
    };

    void fetchSessions();
  }, [myUserId]);

  return (
    <SessionsContainer>
      <SessionTitle>{t('my_sessions')}</SessionTitle>
      <SessionList>
        {Array.isArray(sessions) && sessions.length > 0 ? (
          sessions.map((session: ISession) => (
            <SessionItem key={session._id}>
              <SessionDetail>
                <strong>{t('date')}:</strong>{' '}
                {new Date(session.date).toLocaleDateString()}
              </SessionDetail>
              <SessionDetail>
                <strong>{t('status')}:</strong> {session.status}
              </SessionDetail>
              <SessionDetail>
                <strong>{t('tutor')}:</strong>{' '}
                {session.tutor?._id === myUserId
                  ? t('you')
                  : session.tutor?.name}
              </SessionDetail>
              <SessionDetail>
                <strong>{t('student')}:</strong>{' '}
                {session.student?._id === myUserId
                  ? t('you')
                  : session.student?.name}
              </SessionDetail>
              <Button
                onClick={() =>
                  handleChatRequest(
                    session.tutor?._id === myUserId
                      ? session.student?._id
                      : session.tutor?._id
                  )
                }
              >
                {t('continue_session')}
              </Button>
            </SessionItem>
          ))
        ) : (
          <NoSessionsMessage>No sessions available.</NoSessionsMessage>
        )}
      </SessionList>
    </SessionsContainer>
  );
};

export default MySessions;
