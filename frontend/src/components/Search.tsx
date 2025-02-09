import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axiosInstance';
import log from '../utils/loggerInstance.ts';
import { useTypedTranslation } from '../utils/translationUtils.ts';
import ChatIcon from '@mui/icons-material/Chat';
import { Popover, Typography } from '@mui/material';
import { showToastError } from '../utils/toastUtils.ts';
import {
  AllProfilesContainer,
  Headline,
  ProfileList,
  ProfileListItem,
  ProfileListItemActions,
  ProfileListItemContent,
  ProfileListItemDetails,
  ProfileListItemHeader,
  UserPoints,
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

interface SearchArgs {
  keyword: string;
  filter: string;
}

const Search: React.FC<SearchArgs> = ({ keyword, filter }) => {
  const { t } = useTypedTranslation();

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [popoverContent, setPopoverContent] = useState<string[]>([]);
  const navigate = useNavigate();

  const fetchProfiles = useCallback(async () => {
    try {
      const response = await axios.get(
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
      log.error('Error fetching profiles:', error);
      showToastError(error);
    });
  }, [fetchProfiles]);

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

      navigate(`/chat/${sessionId}`);
    } catch (error) {
      log.error('Error handling chat request:', error);
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
    <>
      <AllProfilesContainer>
        <Headline>{t('other_users')}</Headline>
        <ProfileList>
          {profiles.length === 0 ? (
            <div>{t('no_profiles_found')}</div>
          ) : (
            profiles.map((profile) => (
              <ProfileListItem key={profile.id}>
                <ProfileListItemHeader>
                  <h3>{profile.name}</h3>
                  <UserPoints>{profile.points} P</UserPoints>
                </ProfileListItemHeader>
                <ProfileListItemContent>
                  <ProfileListItemDetails>
                    <div>
                      <strong>{t('skills')}: </strong>
                      <span
                        onClick={(e) => handleBoxClick('skills', profile, e)}
                      >
                        {profile.skills.length > 0
                          ? profile.skills.join(', ')
                          : t('no_content_available')}
                      </span>
                    </div>
                    <div>
                      <strong>{t('interests')}: </strong>
                      <span
                        onClick={(e) => handleBoxClick('interests', profile, e)}
                      >
                        {profile.interests.length > 0
                          ? profile.interests.join(', ')
                          : t('no_content_available')}
                      </span>
                    </div>
                  </ProfileListItemDetails>
                  <ProfileListItemActions>
                    <button onClick={() => handleChatRequest(profile.userId)}>
                      <ChatIcon />
                      {t('chat')}
                    </button>
                  </ProfileListItemActions>
                </ProfileListItemContent>
              </ProfileListItem>
            ))
          )}
        </ProfileList>
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
    </>
  );
};

export default Search;
