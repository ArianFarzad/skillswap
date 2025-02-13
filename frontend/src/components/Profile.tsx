import React, { useEffect, useRef, useState } from 'react';
import axios from '../utils/axiosInstance';
import log from '../utils/loggerInstance.ts';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import UploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTypedTranslation } from '../utils/translationUtils.ts';
import { showToast } from '../utils/toastUtils.ts';
import { IProfile } from '../models/models.ts';
import EditIcon from '@mui/icons-material/Edit';
import Save from '@mui/icons-material/Save';
import UserStatistics from './UserStatistics';
import {
  AddButton,
  Column,
  EditButton,
  FloatingMenu,
  FloatingMenuItem,
  InputGroup,
  InterestItem,
  InterestList,
  MainContainer,
  ProfileContent,
  ProfileEditLabel,
  ProfileImage,
  ProfileImageContainer,
  ProfileImageSection,
  RemoveButton,
  Section,
  SectionTitle,
  SkillItem,
  SkillList,
  TextInput,
} from '../style/components/Profile.style';
import {
  hasDuplicates,
  isValidSkillOrInterest,
} from '../../../shared/validation.ts';
import { isNotBlank } from '../utils/helpers.ts';

interface ProfileProps {
  profile: IProfile | null;
  setProfile: React.Dispatch<React.SetStateAction<IProfile | null>>;
}

const Profile: React.FC<ProfileProps> = ({ profile, setProfile }) => {
  const { t } = useTypedTranslation();
  const loggedInUserId = localStorage.getItem('myUserId');
  const isOwnProfile = profile?.userId === loggedInUserId;

  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');
  const [editModeSkill, setEditModeSkill] = useState(false);
  const [editModeInterest, setEditModeInterest] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [statistics, setStatistics] = useState({
    sessionCount: 0,
    tutorSessionCount: 0,
    studentSessionCount: 0,
    messageCount: 0,
    sentMessagesCount: 0,
    receivedMessagesCount: 0,
    averageRating: 0,
    feedbackCount: 0,
  });

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get(
          `/api/profiles/statistics/${profile?.userId}`
        );
        setStatistics(response.data);
      } catch (error) {
        showToast('error', error, t);
      }
    };

    if (profile) {
      fetchStatistics().catch((error) => {
        log.error(`Error fetching statistics: ${error}`);
      });
    }
  }, [profile, t]);

  const handleEditSkill = () => {
    setEditModeSkill(!editModeSkill);
  };

  const handleEditInterest = () => {
    setEditModeInterest(!editModeInterest);
  };

  const handleAddSkill = async () => {
    if (!newSkill.trim()) {
      showToast('error', t('error.empty_skill'), t);
      return;
    } else if (!isValidSkillOrInterest(newSkill)) {
      showToast('error', 'error.invalid_skill', t);
      return;
    } else if (hasDuplicates(profile?.skills, newSkill)) {
      showToast('error', 'error.duplicate_skill', t);
      return;
    }

    try {
      const response = await axios.post('/api/profiles/skills', {
        skill: newSkill,
      });
      setProfile(response.data);
      setNewSkill('');
      showToast('success', 'skill_added', t);
    } catch (error) {
      showToast('error', error, t);
    }
  };

  const handleRemoveSkill = async (skill: string) => {
    try {
      const response = await axios.delete('/api/profiles/skills', {
        data: { skill },
      });
      setProfile(response.data);
      showToast('success', 'skill_removed', t);
    } catch (error) {
      showToast('error', error, t);
    }
  };

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleAddInterest = async () => {
    if (!newInterest.trim()) {
      showToast('error', 'error.empty_interest', t);
      return;
    } else if (!isValidSkillOrInterest(newInterest)) {
      showToast('error', 'error.invalid_interest', t);
      return;
    } else if (hasDuplicates(profile?.interests, newInterest)) {
      showToast('error', 'error.duplicate_interest', t);
      return;
    }

    try {
      const response = await axios.post('/api/profiles/interests', {
        interest: newInterest,
      });
      setProfile(response.data);
      setNewInterest('');
      showToast('success', 'interest_added', t);
    } catch (error) {
      showToast('error', error, t);
    }
  };

  const handleRemoveInterest = async (interest: string) => {
    try {
      const response = await axios.delete('/api/profiles/interests', {
        data: { interest },
      });
      setProfile(response.data);
      showToast('success', 'interest_removed', t);
    } catch (error) {
      showToast('error', error, t);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    try {
      setShowMenu(false);
      await uploadProfilePicture(file);
    } catch (error) {
      log.error(`Error uploading profile picture: ${error}`);
    }
  };

  const uploadProfilePicture = async (file: File) => {
    const formData = new FormData();
    formData.append('profilePicture', file);

    try {
      const response = await axios.put('/api/profiles/me/picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setProfile(
        (prev) =>
          prev && { ...prev, profilePicture: response.data.profilePicture }
      );
      showToast('success', 'profile_picture_updated', t);
    } catch (error) {
      showToast('error', error, t);
      log.error('Error uploading profile picture:', error);
    }
  };

  const handleDeleteProfilePicture = async () => {
    try {
      await axios.delete('/api/profiles/me/picture');
      setProfile((prev) => prev && { ...prev, profilePicture: '' });
      showToast('success', 'profile_picture_deleted', t);
      setShowMenu(false);
    } catch (error) {
      showToast('error', error, t);
      log.error('Error deleting profile picture:', error);
    }
  };

  const hasCustomProfilePicture = isNotBlank(profile?.profilePicture);

  return (
    <MainContainer>
      {/* Profile Picture */}
      <ProfileImageSection>
        <ProfileImageContainer ref={menuRef}>
          <ProfileImage
            src={profile?.profilePicture || '/avatar.png'}
            alt={'Profile'}
          />
          {isOwnProfile && (
            <ProfileEditLabel onClick={toggleMenu}>
              <CameraAltIcon />
            </ProfileEditLabel>
          )}

          {/*Floating Menu*/}
          {showMenu && (
            <FloatingMenu>
              <FloatingMenuItem>
                <label htmlFor="profilePicture">
                  <UploadIcon />
                  {t('upload_profile_picture')}
                  <input
                    id={'profilePicture'}
                    type={'file'}
                    accept={'image/*'}
                    onChange={handleImageUpload}
                  />
                </label>
              </FloatingMenuItem>
              {hasCustomProfilePicture && (
                <FloatingMenuItem onClick={handleDeleteProfilePicture}>
                  <DeleteIcon /> {t('delete_profile_picture')}
                </FloatingMenuItem>
              )}
            </FloatingMenu>
          )}
        </ProfileImageContainer>
      </ProfileImageSection>

      {profile && (
        <ProfileContent>
          <Column>
            <Section>
              <SectionTitle>
                {t('skills')}
                {isOwnProfile && (
                  <EditButton onClick={handleEditSkill}>
                    {editModeSkill ? <Save /> : <EditIcon />}
                  </EditButton>
                )}
              </SectionTitle>
              <SkillList>
                {profile.skills.map((skill) => (
                  <SkillItem key={skill}>
                    {skill}
                    {editModeSkill && isOwnProfile && (
                      <RemoveButton onClick={() => handleRemoveSkill(skill)}>
                        <RemoveIcon />
                      </RemoveButton>
                    )}
                  </SkillItem>
                ))}
              </SkillList>
              {editModeSkill && isOwnProfile && (
                <InputGroup>
                  <TextInput
                    type="text"
                    placeholder={t('new_skill')}
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter')
                        handleAddSkill().catch((error) =>
                          log.error(`Error adding skill: ${error}`)
                        );
                    }}
                  />
                  <AddButton onClick={handleAddSkill}>
                    <AddIcon />
                  </AddButton>
                </InputGroup>
              )}
            </Section>

            <Section>
              <SectionTitle>
                {t('interests')}
                {isOwnProfile && (
                  <EditButton onClick={handleEditInterest}>
                    {editModeInterest ? <Save /> : <EditIcon />}
                  </EditButton>
                )}
              </SectionTitle>
              <InterestList>
                {profile.interests.map((interest) => (
                  <InterestItem key={interest}>
                    {interest}
                    {editModeInterest && isOwnProfile && (
                      <RemoveButton
                        onClick={() => handleRemoveInterest(interest)}
                      >
                        <RemoveIcon />
                      </RemoveButton>
                    )}
                  </InterestItem>
                ))}
              </InterestList>

              {editModeInterest && isOwnProfile && (
                <InputGroup>
                  <TextInput
                    type="text"
                    placeholder={t('new_interest')}
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter')
                        handleAddInterest().catch((error) => {
                          log.error(`Error adding interest: ${error}`);
                        });
                    }}
                  />
                  <AddButton onClick={handleAddInterest}>
                    <AddIcon />
                  </AddButton>
                </InputGroup>
              )}
            </Section>
          </Column>
          <Section>
            <UserStatistics {...statistics} />
          </Section>
        </ProfileContent>
      )}
    </MainContainer>
  );
};

export default Profile;
