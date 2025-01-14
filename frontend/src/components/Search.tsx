import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AllProfilesContainer,
  AllProfilesHeadline,
  FilterContainer,
  ProfilesGrid,
  ProfileCard,
  ProfileCardTitle,
  ProfileCardText,
  ProfileCardButton,
  KeywordInput,
  FilterInput,
} from '../style/components/Search.style';

interface Profile {
  id: string;
  userId: string;
  name: string;
  email?: string;
  skills: string[];
  interests: string[];
  points?: number;
}

const Search: React.FC = () => {
  const { t } = useTranslation();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [keyword, setKeyword] = useState('');
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  const fetchProfiles = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      const response = await axios.get(
        `http://localhost:8000/api/profiles/search?keyword=${encodeURIComponent(keyword)}&filter=${encodeURIComponent(filter)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = Array.isArray(response.data) ? response.data : [response.data];

      const mappedProfiles = data.map((profile) => ({
        id: profile._id,
        userId: profile.userId,
        name: profile.name,
        email: profile.email || 'N/A',
        skills: profile.skills || [],
        interests: profile.interests || [],
        points: profile.points || 0,
      }));

      setProfiles(mappedProfiles);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(`${t('error_fetching_profiles')}: ${error.response?.data?.message || error.message}`);
      } else {
        console.error(t('unexpected_error'));
      }
    }
  }, [keyword, filter, t]);

  useEffect(() => {
    fetchProfiles().catch((error) => {
      console.error('Error fetching profiles:', error);
    });
  }, [fetchProfiles]);

  const handleChatRequest = async (otherUserId: string) => {
    const myUserId = localStorage.getItem('myUserId') || '';
    try {
      const response = await axios.get(
        `http://localhost:8000/api/sessions/check?user1=${myUserId}&user2=${otherUserId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      let sessionId = response.data.sessionId;

      if (!sessionId) {
        const createResponse = await axios.post(
          'http://localhost:8000/api/sessions',
          {
            tutor: myUserId,
            student: otherUserId,
            date: new Date(),
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        sessionId = createResponse.data._id;
      }

      navigate(`/chat/${sessionId}`);
    } catch (error) {
      console.error('Error handling chat request:', error);
    }
  };

  const handleNameClick = (userId: string) => {
    navigate(`/profiles/${userId}`);
  };

  return (
    <div className="search-area">
      <FilterContainer>
        <KeywordInput
          type="text"
          placeholder={t('keyword')}
          data-testid="keyword-input"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <FilterInput
          type="number"
          min="0"
          placeholder={t('filter_by_points')}
          data-testid="filter-input"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </FilterContainer>
      <AllProfilesContainer>
        <AllProfilesHeadline data-testid="search-headline">
          {t('all_profiles')}
        </AllProfilesHeadline>
        <ProfilesGrid>
          {profiles.length === 0 ? (
            <div>{t('no_profiles_found')}</div>
          ) : (
            profiles.map((profile) => (
              <ProfileCard key={profile.id}>
                <ProfileCardTitle onClick={() => handleNameClick(profile.id)}>
                  {profile.name}
                </ProfileCardTitle>
                <ProfileCardText>
                  {t('skills')}: {profile.skills.join(', ')}
                </ProfileCardText>
                <ProfileCardText>
                  {t('interests')}: {profile.interests.join(', ')}
                </ProfileCardText>
                <ProfileCardText>
                  {t('points')}: {profile.points}
                </ProfileCardText>
                <ProfileCardButton onClick={() => handleChatRequest(profile.userId)}>
                  {t('chat_with')} {profile.name}
                </ProfileCardButton>
              </ProfileCard>
            ))
          )}
        </ProfilesGrid>
      </AllProfilesContainer>
    </div>
  );
};

export default Search;