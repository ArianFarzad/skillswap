import React, { useEffect, useRef, useState } from 'react';
import axios from '../utils/axiosInstance';
import log from '../utils/loggerInstance.ts';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import UploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import { useTypedTranslation } from '../utils/translationUtils.ts';
import { showToast } from '../utils/toastUtils.ts';
import { IProfile } from '../models/models.ts';
import EditIcon from '@mui/icons-material/Edit';
import Save from '@mui/icons-material/Save';
import UserStatistics from './UserStatistics';
import MyProfile from './MyProfile';
import {
  AboutMeText,
  AddButton,
  ClearButton,
  Column,
  FloatingEditButton,
  FloatingMenu,
  FloatingMenuItem,
  HiddenFileInput,
  InputGroup,
  InterestItem,
  InterestList,
  MainContainer,
  ProfileContent,
  ProfileEditLabel,
  ProfileImage,
  ProfileImageContainer,
  QuoteIcon,
  RemoveButton,
  SectionTitle,
  SkillItem,
  SkillList,
  StyledLabel,
  StyledSection,
  StyledTextArea,
  TextInput,
} from '../style/components/Profile.style';
import {
  hasDuplicates,
  isValidSkillOrInterest,
} from '../../../shared/validation.ts';
import { handleEnterKeyPress, isNotBlank } from '../utils/helpers.ts';
import { Edit } from '@mui/icons-material';

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
  const [isEditingSkill, setIsEditingSkill] = useState(false);
  const [isEditingInterest, setIsEditingInterest] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isEditingAboutMe, setIsEditingAboutMe] = useState(false);
  const [aboutMeText, setAboutMeText] = useState(profile?.aboutMe || '');
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
        showToast('error', error, t);
      });
    }
  }, [profile, t]);

  useEffect(() => {
    if (!isEditingAboutMe) {
      setAboutMeText(profile?.aboutMe || '');
    }
  }, [isEditingAboutMe, profile]);

  const handleSetAboutMe = async () => {
    if (isEditingAboutMe && aboutMeText.trim() != profile?.aboutMe) {
      try {
        const response = await axios.put('/api/profiles', {
          aboutMe: aboutMeText,
          userId: loggedInUserId,
        });

        setProfile(
          (prev) => prev && { ...prev, aboutMe: response.data.aboutMe }
        );
        showToast('success', 'about_me_updated', t);
      } catch (error) {
        showToast('error', error, t);
      }
    } else {
      setAboutMeText(profile?.aboutMe || '');
    }
    setIsEditingAboutMe((prev) => !prev);
  };

  const handleEditSkill = () => {
    setIsEditingSkill(!isEditingSkill);
  };

  const handleEditInterest = () => {
    setIsEditingInterest(!isEditingInterest);
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
    }
  };

  return (
    <>
      <MainContainer>
        {profile && (
          <ProfileContent>
            <Column>
              {/* Profile Picture */}
              <StyledSection>
                <ProfileImageContainer ref={menuRef}>
                  <ProfileImage
                    src={profile?.profilePicture || '/avatar.png'}
                    alt={'Profile'}
                  />
                  {isOwnProfile && (
                    <ProfileEditLabel showMenu={showMenu} onClick={toggleMenu}>
                      {showMenu ? (
                        <ClearIcon id={'clear-icon'} />
                      ) : (
                        <CameraAltIcon />
                      )}
                    </ProfileEditLabel>
                  )}

                  {/* Floating Menu */}
                  {showMenu && (
                    <FloatingMenu>
                      <FloatingMenuItem>
                        <StyledLabel htmlFor="profilePicture">
                          <UploadIcon />
                          <span>{t('upload_profile_picture')}</span>
                        </StyledLabel>

                        <HiddenFileInput
                          id="profilePicture"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </FloatingMenuItem>
                      {isNotBlank(profile?.profilePicture) && (
                        <FloatingMenuItem onClick={handleDeleteProfilePicture}>
                          <DeleteIcon /> {t('delete_profile_picture')}
                        </FloatingMenuItem>
                      )}
                    </FloatingMenu>
                  )}
                </ProfileImageContainer>
                <MyProfile profile={profile} setProfile={setProfile} />
              </StyledSection>
              <StyledSection>
                <QuoteIcon>❝</QuoteIcon>
                <QuoteIcon>❞</QuoteIcon>
                <SectionTitle>
                  {t('about_me')}
                  {isOwnProfile && (
                    <FloatingEditButton onClick={handleSetAboutMe}>
                      {isEditingAboutMe ? <Save /> : <Edit />}
                    </FloatingEditButton>
                  )}
                </SectionTitle>
                {isEditingAboutMe ? (
                  <StyledTextArea
                    as="textarea"
                    value={aboutMeText}
                    onChange={(e) => setAboutMeText(e.target.value)}
                    placeholder={t('tell_us_about_yourself')}
                  />
                ) : (
                  <AboutMeText>
                    {profile?.aboutMe || t('no_about_me')}
                  </AboutMeText>
                )}
              </StyledSection>
              <StyledSection>
                <SectionTitle>
                  {t('skills')}
                  {isOwnProfile && (
                    <FloatingEditButton onClick={handleEditSkill}>
                      {isEditingSkill ? <Save /> : <EditIcon />}
                    </FloatingEditButton>
                  )}
                </SectionTitle>
                <SkillList>
                  {profile.skills.map((skill) => (
                    <SkillItem key={skill}>
                      {skill}
                      {isEditingSkill && isOwnProfile && (
                        <RemoveButton onClick={() => handleRemoveSkill(skill)}>
                          <RemoveIcon />
                        </RemoveButton>
                      )}
                    </SkillItem>
                  ))}
                </SkillList>
                {isEditingSkill && isOwnProfile && (
                  <InputGroup>
                    <TextInput
                      type="text"
                      placeholder={t('new_skill')}
                      value={newSkill}
                      autoFocus
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={(e) => handleEnterKeyPress(e, handleAddSkill)}
                    />
                    {newSkill && (
                      <ClearButton onClick={() => setNewSkill('')}>
                        <ClearIcon />
                      </ClearButton>
                    )}
                    <AddButton onClick={handleAddSkill}>
                      <AddIcon />
                    </AddButton>
                  </InputGroup>
                )}
              </StyledSection>

              <StyledSection>
                <SectionTitle>
                  {t('interests')}
                  {isOwnProfile && (
                    <FloatingEditButton onClick={handleEditInterest}>
                      {isEditingInterest ? <Save /> : <EditIcon />}
                    </FloatingEditButton>
                  )}
                </SectionTitle>
                <InterestList>
                  {profile.interests.map((interest) => (
                    <InterestItem key={interest}>
                      {interest}
                      {isEditingInterest && isOwnProfile && (
                        <RemoveButton
                          onClick={() => handleRemoveInterest(interest)}
                        >
                          <RemoveIcon />
                        </RemoveButton>
                      )}
                    </InterestItem>
                  ))}
                </InterestList>

                {isEditingInterest && isOwnProfile && (
                  <InputGroup>
                    <TextInput
                      type="text"
                      placeholder={t('new_interest')}
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value)}
                      autoFocus
                      onKeyDown={(e) =>
                        handleEnterKeyPress(e, handleAddInterest)
                      }
                    />
                    {newInterest && (
                      <ClearButton onClick={() => setNewInterest('')}>
                        <ClearIcon />
                      </ClearButton>
                    )}
                    <AddButton onClick={handleAddInterest}>
                      <AddIcon />
                    </AddButton>
                  </InputGroup>
                )}
              </StyledSection>
            </Column>
            <UserStatistics {...statistics} />
          </ProfileContent>
        )}
      </MainContainer>
    </>
  );
};

export default Profile;
