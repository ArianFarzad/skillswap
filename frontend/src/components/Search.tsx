import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AllProfilesContainer,
  AllProfilesHeadline,
  Box,
  BoxContainer,
  FilterContainer,
  FilterInput,
  KeywordInput,
  ProfileCard,
  ProfileCardButton,
  ProfileCardTitle,
  ProfilesGrid,
  UserPoints,
} from '../style/components/Search.style';
import axiosInstance from '../utils/axiosInstance';
import loggerInstance from '../utils/loggerInstance.ts';
import { useTypedTranslation } from '../utils/translationUtils.ts';
import ChatIcon from '@mui/icons-material/Chat';
import { Popover, Typography } from '@mui/material';
import { showToastError } from '../utils/toastUtils.ts';

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
  const { t } = useTypedTranslation();

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [keyword, setKeyword] = useState('');
  const [filter, setFilter] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [popoverContent, setPopoverContent] = useState<string[]>([]);
  const navigate = useNavigate();

  const fetchProfiles = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `/api/profiles/search?keyword=${encodeURIComponent(keyword)}&filter=${encodeURIComponent(filter)}`
      );

      const data = Array.isArray(response.data)
        ? response.data
        : [response.data];

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
      showToastError(error, t);
    }
  }, [keyword, filter, t]);

  useEffect(() => {
    fetchProfiles().catch((error) => {
      loggerInstance.error('Error fetching profiles:', error);
      showToastError(error);
    });
  }, [fetchProfiles]);

  const handleChatRequest = async (otherUserId: string) => {
    const myUserId = localStorage.getItem('myUserId') || '';
    try {
      const response = await axiosInstance.get(
        `/api/sessions/check?user1=${myUserId}&user2=${otherUserId}`
      );

      let sessionId = response.data.sessionId;

      if (!sessionId) {
        const createResponse = await axiosInstance.post('/api/sessions', {
          tutor: myUserId,
          student: otherUserId,
          date: new Date(),
        });
        sessionId = createResponse.data._id;
      }

      navigate(`/chat/${sessionId}`);
    } catch (error) {
      loggerInstance.error('Error handling chat request:', error);
      showToastError(error);
    }
  };

  const handleBoxClick = (
    type: 'skills' | 'interests',
    profile: Profile,
    event: React.MouseEvent<HTMLElement>
  ) => {
    const content = type === 'skills' ? profile.skills : profile.interests;
    if (content.length === 0) {
      setPopoverContent([t('no_content_available')]);
    } else {
      setPopoverContent(content);
    }
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className="search-area">
      <FilterContainer>
        <KeywordInput
          type="text"
          placeholder={t('keyword')}
          data-testid="keyword-input"
          value={keyword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setKeyword(e.target.value)
          }
        />
        <FilterInput
          type="number"
          min="0"
          placeholder={t('filter_by_points')}
          data-testid="filter-input"
          value={filter}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFilter(e.target.value)
          }
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
                <ProfileCardTitle>{profile.name}</ProfileCardTitle>

                <BoxContainer>
                  <Box
                    text={'skill'}
                    onClick={(e) => handleBoxClick('skills', profile, e)}
                  >
                    <strong>{t('skills')}</strong>
                  </Box>
                  <Box
                    text={'interest'}
                    onClick={(e) => handleBoxClick('interests', profile, e)}
                  >
                    <strong>{t('interests')}</strong>
                  </Box>
                </BoxContainer>
                <UserPoints>{profile.points} P</UserPoints>
                <ProfileCardButton
                  onClick={() => handleChatRequest(profile.userId)}
                >
                  <ChatIcon />
                </ProfileCardButton>
              </ProfileCard>
            ))
          )}
        </ProfilesGrid>
      </AllProfilesContainer>

      {/* Popover für Skills/Interessen */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>{popoverContent.join(', ')}</Typography>
      </Popover>
    </div>
  );
};

export default Search;
