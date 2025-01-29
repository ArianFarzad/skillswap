import React, { useState } from 'react';
import {
  Button,
  Container,
  FormArea,
  Headline,
  Headline2,
  Input,
  InputContainer,
  Item,
  ItemContainer,
  List,
  MainContainer,
  RemoveButton,
} from '../style/components/Profile.style';
import axiosInstance from '../utils/axiosInstance';
import loggerInstance from '../utils/loggerInstance.ts';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useTypedTranslation } from '../utils/translationUtils.ts';
import toast from 'react-hot-toast';
import { showToastError } from '../utils/toastUtils.ts';

import { IProfile } from '../models/models.ts';

interface ProfileProps {
  profile: IProfile | null;
  setProfile: React.Dispatch<React.SetStateAction<IProfile | null>>;
}

const Profile: React.FC<ProfileProps> = ({ profile, setProfile }) => {
  const { t } = useTypedTranslation();

  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');

  const handleAddSkill = async () => {
    if (!newSkill.trim()) {
      toast.error(t('error.empty_skill'));
      return;
    }
    try {
      const response = await axiosInstance.post('/api/profiles/skills', {
        skill: newSkill,
      });
      loggerInstance.info('Skill added:', response.data);
      toast.success(t('skill_added'), { icon: '💡' });
      setProfile(response.data);
      setNewSkill('');
    } catch (error) {
      showToastError(error, t);
    }
  };

  const handleRemoveSkill = async (skill: string) => {
    try {
      const response = await axiosInstance.delete('/api/profiles/skills', {
        data: { skill },
      });
      loggerInstance.info('Skill removed:', response.data);
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
      const response = await axiosInstance.post('/api/profiles/interests', {
        interest: newInterest,
      });
      loggerInstance.info('Interest added:', response.data);
      toast.success(t('interest_added'), { icon: '📚' });
      setProfile(response.data);
      setNewInterest('');
    } catch (error) {
      showToastError(error, t);
    }
  };

  const handleRemoveInterest = async (interest: string) => {
    try {
      const response = await axiosInstance.delete('/api/profiles/interests', {
        data: { interest },
      });
      loggerInstance.info('Interest removed:', response.data);
      toast(t('interest_removed'), { icon: '🗑️' });
      setProfile(response.data);
    } catch (error) {
      showToastError(error, t);
    }
  };

  return (
    <>
      <MainContainer>
        <Headline data-testid={'profile-headline'}>{t('profile')}</Headline>
        {profile && (
          <FormArea>
            <Container>
              <Headline2>{t('skills')}</Headline2>
              <List>
                {profile.skills.map((skill: string) => (
                  <li key={skill}>
                    <ItemContainer>
                      <Item>{skill}</Item>
                      <RemoveButton
                        data-testid={`remove-skill-${skill}`}
                        onClick={() => handleRemoveSkill(skill)}
                      >
                        <RemoveIcon className={'react-remove-icon'} />
                      </RemoveButton>
                    </ItemContainer>
                  </li>
                ))}
              </List>
              <InputContainer>
                <Input
                  type="text"
                  placeholder={t('new_skill')}
                  data-testid="input-skill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={async (e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      await handleAddSkill();
                    }
                  }}
                />
                <Button onClick={handleAddSkill} data-testid="add-skill-button">
                  <AddIcon className={'react-add-icon'} />
                </Button>
              </InputContainer>
            </Container>
            <Container>
              <Headline2>{t('interests')}</Headline2>
              <List>
                {profile.interests.map((interest: string) => (
                  <li key={interest}>
                    <ItemContainer>
                      <Item>{interest}</Item>
                      <RemoveButton
                        onClick={() => handleRemoveInterest(interest)}
                        data-testid={`remove-interest-${interest}`}
                      >
                        <RemoveIcon className={'react-remove-icon'} />
                      </RemoveButton>
                    </ItemContainer>
                  </li>
                ))}
              </List>
              <InputContainer>
                <Input
                  type="text"
                  placeholder={t('new_interest')}
                  data-testid="input-interest"
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  onKeyDown={async (e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      await handleAddInterest();
                    }
                  }}
                />
                <Button
                  onClick={handleAddInterest}
                  data-testid="add-interest-button"
                >
                  <AddIcon className={'react-add-icon'} />
                </Button>
              </InputContainer>
            </Container>
          </FormArea>
        )}
      </MainContainer>
    </>
  );
};

export default Profile;
