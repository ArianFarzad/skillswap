import React, { useEffect, useState } from 'react';
import { useTypedTranslation } from '../utils/translationUtils.ts';
import { IProfile } from '../models/models.ts';
import { Edit, Save } from '@mui/icons-material';
import axios from '../utils/axiosInstance.ts';
import { showToast } from '../utils/toastUtils.ts';
import log from '../utils/loggerInstance.ts';
import {
  ProfileCard,
  ProfileHeader,
  ProfileName,
  ProfilePoints,
  EditButton,
  ProfileContent,
  StyledInput,
  Line
} from '../style/components/MyProfile.style';

interface MyProfileProps {
  profile: IProfile | null;
}

const MyProfile: React.FC<MyProfileProps> = ({ profile }) => {
  const { t } = useTypedTranslation();
  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState(profile?.name || '');
  const [previousName, setPreviousName] = useState('');
  const loggedInUserId = localStorage.getItem('myUserId');

  useEffect(() => {
    setName(profile?.name || '');
  }, [profile]);

  const handleEdit = async () => {
    if (isEditMode) {
      if (name.trim() === '') {
        setName(previousName);
        showToast('error', 'name_empty', t);
      } else if (name !== profile?.name) {
        try {
          const response = await axios.put('api/profiles', {
            name: name,
            userId: loggedInUserId,
          });

          if (response.status === 200) {
            showToast('success', 'name_changed', t);
          } else {
            log.error(`Unexpected status code: ${response.status}`);
            showToast('error', 'error.name_change_failed', t);
          }
        } catch (error: unknown) {
          if (error && typeof error === 'object' && 'response' in error) {
            const axiosError = error as { response: { status: number } };
            if (axiosError.response.status === 400) {
              setName(previousName);
              showToast('error', 'name_exists', t);
            } else {
              log.error('Failed to change name', error);
              showToast('error', 'name_change_failed', t);
            }
          } else {
            log.error('Failed to change name', error);
            showToast('error', 'name_change_failed', t);
          }
        }
      }
    } else {
      setPreviousName(name);
    }
    setIsEditMode((prev) => !prev);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <ProfileCard>
      <ProfileHeader>
        <ProfileName>
          {isEditMode ? (
            <StyledInput
              id={'input-name'}
              value={name}
              onChange={handleNameChange}
              autoFocus
            />
          ) : (
            name
          )}
        </ProfileName>
        {loggedInUserId === profile?.userId && (
          <EditButton onClick={handleEdit}>
            {isEditMode ? <Save /> : <Edit />}
          </EditButton>
        )}
      </ProfileHeader>
      <Line />
      <ProfileContent>
        <ProfilePoints>
          {t('points')}: <span>{profile?.points ?? 0}</span>
        </ProfilePoints>
      </ProfileContent>
    </ProfileCard>
  );
};

export default MyProfile;