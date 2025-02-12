import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';
import log from '../utils/loggerInstance.ts';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useTypedTranslation } from '../utils/translationUtils.ts';
import { showToast } from '../utils/toastUtils.ts';
import { IProfile } from '../models/models.ts';
import EditIcon from '@mui/icons-material/Edit';
import UserStatistics from './UserStatistics';
import {
  AddButton,
  Column,
  EditButton,
  InputGroup,
  InterestItem,
  InterestList,
  MainContainer,
  ProfileContent,
  ProfileEditButton,
  ProfileHeader,
  ProfileImage,
  ProfileImageContainer,
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

interface ProfileProps {
  profile: IProfile | null;
  setProfile: React.Dispatch<React.SetStateAction<IProfile | null>>;
}

const Profile: React.FC<ProfileProps> = ({ profile, setProfile }) => {
  const { t } = useTypedTranslation();
  const loggedInUserId = localStorage.getItem('myUserId');
  const isOwnProfile = profile?.userId === loggedInUserId;
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');
  const [editModeSkill, setEditModeSkill] = useState(false);
  const [editModeInterest, setEditModeInterest] = useState(false);
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
      log.info('Skill added:', response.data);
      showToast('success', 'skill_added', t);
      setProfile(response.data);
      setNewSkill('');
    } catch (error) {
      showToast('error', error, t);
    }
  };

  const handleRemoveSkill = async (skill: string) => {
    try {
      const response = await axios.delete('/api/profiles/skills', {
        data: { skill },
      });
      showToast('success', 'skill_removed', t);
      setProfile(response.data);
    } catch (error) {
      showToast('error', error, t);
    }
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
      showToast('success', 'interest_added', t);
      setProfile(response.data);
      setNewInterest('');
    } catch (error) {
      showToast('error', error, t);
    }
  };

  const handleRemoveInterest = async (interest: string) => {
    try {
      const response = await axios.delete('/api/profiles/interests', {
        data: { interest },
      });
      showToast('success', 'interest_removed', t);
      setProfile(response.data);
    } catch (error) {
      showToast('error', error, t);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const uploadProfilePicture = async () => {
    if (!selectedFile) {
      showToast('error', 'error.no_image_selected', t);
      return;
    }

    const formData = new FormData();
    formData.append('profilePicture', selectedFile);

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

  return (
    <MainContainer>
      <ProfileHeader>
        {profile?.userId === loggedInUserId
          ? t('your_profile')
          : `${profile?.name}\`s ${t('profile')}`}
      </ProfileHeader>
      <ProfileImageContainer>
        {/*// TODO use a default profile picture and refine this completely!, yb*/}
        <ProfileImage
          src={profile?.profilePicture || 'https://via.placeholder.com/150'}
          alt={'Profile'}
        />
        {isOwnProfile && (
          <label>
            <ProfileEditButton>
              <CameraAltIcon />
            </ProfileEditButton>
            <input
              type={'file'}
              accept={'image/*'}
              onChange={handleFileChange}
              hidden
            />
          </label>
        )}
      </ProfileImageContainer>

      <button onClick={uploadProfilePicture} style={{ marginTop: '10px' }}>
        {t('upload_profile_picture')}
      </button>

      {profile && (
        <ProfileContent>
          <Column>
            <Section>
              <SectionTitle>
                {t('skills')}{' '}
                {profile.userId === loggedInUserId && (
                  <EditButton onClick={handleEditSkill}>
                    <EditIcon />
                  </EditButton>
                )}
              </SectionTitle>
              <SkillList>
                {profile.skills.map((skill) => (
                  <SkillItem key={skill}>
                    {skill}
                    {editModeSkill && profile.userId === loggedInUserId && (
                      <RemoveButton onClick={() => handleRemoveSkill(skill)}>
                        <RemoveIcon />
                      </RemoveButton>
                    )}
                  </SkillItem>
                ))}
              </SkillList>
              {editModeSkill && profile.userId === loggedInUserId && (
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
                {profile.userId === loggedInUserId && (
                  <EditButton onClick={handleEditInterest}>
                    <EditIcon />
                  </EditButton>
                )}
              </SectionTitle>
              <InterestList>
                {profile.interests.map((interest) => (
                  <InterestItem key={interest}>
                    {interest}
                    {editModeInterest && profile.userId === loggedInUserId && (
                      <RemoveButton
                        onClick={() => handleRemoveInterest(interest)}
                      >
                        <RemoveIcon />
                      </RemoveButton>
                    )}
                  </InterestItem>
                ))}
              </InterestList>

              {editModeInterest && profile.userId === loggedInUserId && (
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
