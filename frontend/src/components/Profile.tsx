import React, { useState } from 'react';
import axios from '../utils/axiosInstance';
import log from '../utils/loggerInstance.ts';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useTypedTranslation } from '../utils/translationUtils.ts';
import toast from 'react-hot-toast';
import { showToastError } from '../utils/toastUtils.ts';
import { IProfile } from '../models/models.ts';
import EditIcon from '@mui/icons-material/Edit';
import {
  AddButton,
  EditButton,
  InputGroup,
  InterestItem,
  InterestList,
  MainContainer,
  ProfileContent,
  ProfileHeader,
  RemoveButton,
  Section,
  SectionTitle,
  SkillItem,
  SkillList,
  TextInput,
} from '../style/components/Profile.style';

interface ProfileProps {
  profile: IProfile | null;
  setProfile: React.Dispatch<React.SetStateAction<IProfile | null>>;
}

const Profile: React.FC<ProfileProps> = ({ profile, setProfile }) => {
  const { t } = useTypedTranslation();

  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');
  const [editModeSkill, setEditModeSkill] = useState(false);
  const [editModeInterest, setEditModeInterest] = useState(false);

  const handleEditSkill = () => {
    setEditModeSkill(!editModeSkill);
  };

  const handleEditInterest = () => {
    setEditModeInterest(!editModeInterest);
  };

  const handleAddSkill = async () => {
    if (!newSkill.trim()) {
      toast.error(t('error.empty_skill'));
      return;
    }
    try {
      const response = await axios.post('/api/profiles/skills', {
        skill: newSkill,
      });
      log.info('Skill added:', response.data);
      toast.success(t('skill_added'), { icon: '💡' });
      setProfile(response.data);
      setNewSkill('');
    } catch (error) {
      showToastError(error, t);
    }
  };

  const handleRemoveSkill = async (skill: string) => {
    try {
      const response = await axios.delete('/api/profiles/skills', {
        data: { skill },
      });
      log.info('Skill removed:', response.data);
      toast(t('skill_removed'), { icon: '🗑️' });
      setProfile(response.data);
    } catch (error) {
      showToastError(error, t);
    }
  };

  const handleAddInterest = async () => {
    if (!newInterest.trim()) {
      toast.error(t('error.empty_interest'));
      return;
    }
    try {
      const response = await axios.post('/api/profiles/interests', {
        interest: newInterest,
      });
      log.info('Interest added:', response.data);
      toast.success(t('interest_added'), { icon: '📚' });
      setProfile(response.data);
      setNewInterest('');
    } catch (error) {
      showToastError(error, t);
    }
  };

  const handleRemoveInterest = async (interest: string) => {
    try {
      const response = await axios.delete('/api/profiles/interests', {
        data: { interest },
      });
      log.info('Interest removed:', response.data);
      toast(t('interest_removed'), { icon: '🗑️' });
      setProfile(response.data);
    } catch (error) {
      showToastError(error, t);
    }
  };

  return (
    <MainContainer>
      <ProfileHeader>{t('your_profile')}</ProfileHeader>
      {profile && (
        <ProfileContent>
          <Section>
            <SectionTitle>
              {t('skills')}{' '}
              <EditButton onClick={handleEditSkill}>
                <EditIcon />
              </EditButton>
            </SectionTitle>
            <SkillList>
              {profile.skills.map((skill) => (
                <SkillItem key={skill}>
                  {skill}
                  {editModeSkill && (
                    <RemoveButton onClick={() => handleRemoveSkill(skill)}>
                      <RemoveIcon />
                    </RemoveButton>
                  )}
                </SkillItem>
              ))}
            </SkillList>
            {editModeSkill && (
              <InputGroup>
                <TextInput
                  type="text"
                  placeholder={t('new_skill')}
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddSkill();
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
              <EditButton onClick={handleEditInterest}>
                <EditIcon />
              </EditButton>
            </SectionTitle>
            <InterestList>
              {profile.interests.map((interest) => (
                <InterestItem key={interest}>
                  {interest}
                  {editModeInterest && (
                    <RemoveButton
                      onClick={() => handleRemoveInterest(interest)}
                    >
                      <RemoveIcon />
                    </RemoveButton>
                  )}
                </InterestItem>
              ))}
            </InterestList>

            {editModeInterest && (
              <InputGroup>
                <TextInput
                  type="text"
                  placeholder={t('new_interest')}
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddInterest();
                  }}
                />
                <AddButton onClick={handleAddInterest}>
                  <AddIcon />
                </AddButton>
              </InputGroup>
            )}
          </Section>
        </ProfileContent>
      )}
    </MainContainer>
  );
};

export default Profile;
