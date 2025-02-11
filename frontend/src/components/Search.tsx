import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axiosInstance';
import log from '../utils/loggerInstance.ts';
import { useTypedTranslation } from '../utils/translationUtils.ts';
import ChatIcon from '@mui/icons-material/Chat';
import { showToast } from '../utils/toastUtils.ts';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import {
  AllProfilesContainer,
  Headline,
  NoProfilesContainer,
  ProfileList,
  ProfileListItem,
  ProfileListItemActions,
  ProfileListItemHeader,
} from '../style/components/Search.style';

interface Profile {
  _id: string;
  userId: string;
  name: string;
}

interface SearchArgs {
  keyword: string;
  filter: string;
}

interface UserStatistics {
  sessionCount: number;
  tutorSessionCount: number;
  studentSessionCount: number;
  averageRating: number;
  feedbackCount: number;
  messageCount: number;
  sentMessagesCount: number;
  receivedMessagesCount: number;
}

const Search: React.FC<SearchArgs> = ({ keyword, filter }) => {
  const { t } = useTypedTranslation();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const navigate = useNavigate();

  const fetchProfiles = useCallback(async () => {
    try {
      const response = await axios.get<Profile[]>(
        `/api/profiles/search?keyword=${encodeURIComponent(keyword)}&filter=${encodeURIComponent(filter)}`
      );

      const data = Array.isArray(response.data)
        ? response.data
        : [response.data];

      const profilesWithStats = await Promise.all(
        data.map(async (profile) => {
          const statsResponse = await axios.get<UserStatistics>(
            `/api/profiles/statistics/${profile.userId}`
          );
          return {
            _id: profile._id,
            userId: profile.userId,
            name: profile.name,
            sessionCount: statsResponse.data.sessionCount,
            tutorSessionCount: statsResponse.data.tutorSessionCount,
            studentSessionCount: statsResponse.data.studentSessionCount,
            averageRating: statsResponse.data.averageRating,
            feedbackCount: statsResponse.data.feedbackCount,
            messageCount: statsResponse.data.messageCount,
          };
        })
      );

      setProfiles(profilesWithStats);
    } catch (error) {
      log.error('Error fetching profiles:', error);
    }
  }, [keyword, filter]);

  useEffect(() => {
    if (keyword || filter) {
      fetchProfiles().catch((error) => {
        showToast('error', error, t);
      });
    }
  }, [fetchProfiles, keyword, filter, t]);

  const handleChatRequest = async (otherUserId: string) => {
    const myUserId = localStorage.getItem('myUserId') || '';
    try {
      const response = await axios.get(
        `/api/sessions/check?user1=${myUserId}&user2=${otherUserId}`
      );

      let sessionId = response.data.sessionId;

      if (!sessionId) {
        const createResponse = await axios.post('/api/sessions', {
          tutor: myUserId,
          student: otherUserId,
          date: new Date(),
        });
        sessionId = createResponse.data._id;
      }

      void navigate(`/chat/${sessionId}`);
    } catch (error) {
      log.error('Error handling chat request:', error);
      showToast('error', error, t);
    }
  };

  const handleProfilePage = (profileId: string) => {
    void navigate(`/profile/${profileId}`);
  };

  if (!keyword && !filter) return null;

  return (
    <>
      <AllProfilesContainer>
        <Headline>{t('search_results')}</Headline>
        <ProfileList>
          {profiles.length === 0 ? (
            <NoProfilesContainer>
              <PersonOffIcon />
              <div>{t('no_profiles_found')}</div>
            </NoProfilesContainer>
          ) : (
            profiles.map((profile) => (
              <ProfileListItem key={profile._id}>
                <ProfileListItemHeader>
                  <h3>{profile.name}</h3>
                  <ProfileListItemActions>
                    <button onClick={() => handleChatRequest(profile.userId)}>
                      <ChatIcon />
                    </button>
                    <button
                      className="profile-page"
                      onClick={() => handleProfilePage(profile._id)}
                    >
                      <AccountCircleIcon />
                    </button>
                  </ProfileListItemActions>
                </ProfileListItemHeader>
              </ProfileListItem>
            ))
          )}
        </ProfileList>
      </AllProfilesContainer>
    </>
  );
};

export default Search;
