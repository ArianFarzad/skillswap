import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axiosInstance';
import log from '../utils/loggerInstance.ts';
import { useTypedTranslation } from '../utils/translationUtils.ts';
import ChatIcon from '@mui/icons-material/Chat';
import { showToast } from '../utils/toastUtils.ts';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import { useHandleChatRequest } from '../utils/chatUtils.ts';
import {
  AllProfilesContainer,
  Headline,
  NoProfilesContainer,
  ProfileList,
  ProfileListItem,
  ProfileListItemActions,
  ProfileListItemHeader,
} from '../style/components/Search.style';
import { cleanParams } from '../utils/helpers.ts';

interface Profile {
  _id: string;
  userId: string;
  name: string;
}

interface SearchArgs {
  keyword: string;
  points: string;
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

const Search: React.FC<SearchArgs> = ({ keyword, points }) => {
  const { t } = useTypedTranslation();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const navigate = useNavigate();
  const handleChatRequest = useHandleChatRequest();

  const fetchProfiles = useCallback(async () => {
    try {
      const params = cleanParams({ keyword, points });

      const response = await axios.get<Profile[]>(`/api/profiles/search`, {
        params,
      });

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
  }, [keyword, points]);

  useEffect(() => {
    if (keyword || points) {
      fetchProfiles().catch((error) => {
        showToast('error', error, t);
      });
    }
  }, [fetchProfiles, keyword, points, t]);

  const handleProfilePage = (profileId: string) => {
    void navigate(`/profile/${profileId}`);
  };

  if (!keyword && !points) return null;

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
