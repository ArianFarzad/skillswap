import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance.ts';
import { ISession } from '../models/models.ts';
import { useTypedTranslation } from '../utils/translationUtils.ts';
import { useHandleChatRequest } from '../utils/chatUtils.ts';
import {
  ContinueButton,
  Divider,
  NoSessionsMessage,
  ParticipantsContainer,
  ProfileImage,
  RoleBadge,
  RoleContainer,
  SessionContent,
  SessionItem,
  SessionList,
  SessionsContainer,
  SessionTitle,
  UserName,
} from '../style/components/MySessions.style.tsx';
import { showToast } from '../utils/toastUtils.ts';

const MySessions: React.FC = () => {
  const myUserId = localStorage.getItem('myUserId') || '';
  const [sessions, setSessions] = useState<ISession[]>([]);
  const { t } = useTypedTranslation();
  const handleChatRequest = useHandleChatRequest();

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get(`/api/sessions/users/${myUserId}`);
        setSessions(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        showToast('error', error, t);
        setSessions([]);
      }
    };

    void fetchSessions();
  }, [myUserId, t]);

  return (
    <SessionsContainer>
      <SessionTitle>{t('my_sessions')}</SessionTitle>
      <SessionList>
        {sessions.length > 0 ? (
          sessions.map((session) => (
            <SessionItem key={session._id}>
              <SessionContent>
                <ParticipantsContainer>
                  <RoleContainer>
                    <RoleBadge>{t('tutor')}</RoleBadge>
                    <ProfileImage
                      src={session.tutor?.profilePicture || 'avatar.png'}
                      alt="Tutor"
                    />
                    <UserName>
                      {session.tutor?._id === myUserId
                        ? t('you')
                        : session.tutor?.name}
                    </UserName>
                  </RoleContainer>

                  <Divider>➔</Divider>

                  <RoleContainer>
                    <RoleBadge>{t('student')}</RoleBadge>
                    <ProfileImage
                      src={session.student?.profilePicture || 'avatar.png'}
                      alt="Student"
                    />
                    <UserName>
                      {session.student?._id === myUserId
                        ? t('you')
                        : session.student?.name}
                    </UserName>
                  </RoleContainer>
                </ParticipantsContainer>

                <ContinueButton
                  onClick={() =>
                    handleChatRequest(
                      session.tutor?._id === myUserId
                        ? session.student?._id
                        : session.tutor?._id
                    )
                  }
                >
                  {t('continue_session')}
                </ContinueButton>
              </SessionContent>
            </SessionItem>
          ))
        ) : (
          <NoSessionsMessage>{t('no_sessions')}</NoSessionsMessage>
        )}
      </SessionList>
    </SessionsContainer>
  );
};

export default MySessions;
