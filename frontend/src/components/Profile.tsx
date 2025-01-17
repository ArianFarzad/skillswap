import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
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

interface ProfileType {
  skills: string[];
  interests: string[];
  points: number;
}

const Profile: React.FC = () => {
  const {
    t,
  }: {
    t: (key: keyof typeof import('../../public/locales/en.json')) => string;
  } = useTranslation();
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setMessage('No token found');
          return;
        }
        console.log('Fetching profile with token:', token);
        const response = await axiosInstance.get('/api/profiles');
        console.log('Profile fetched:', response.data);
        setProfile(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(
            'Error fetching profile:',
            error.response?.data?.message || error.message
          );
          setMessage(
            `Error fetching profile: ${error.response?.data?.message || error.message}`
          );
        } else {
          console.error('An unexpected error occurred:', error);
          setMessage('An unexpected error occurred');
        }
      }
    };

    fetchProfile().catch((error) =>
      console.error('Error fetching profile:', error)
    );
  }, []);

  const handleAddSkill = async () => {
    if (!newSkill.trim()) {
      setMessage('Skill cannot be empty');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('No token found');
        return;
      }
      console.log('Adding skill with token:', token, 'and skill:', newSkill);
      const response = await axiosInstance.post(
        '/api/profiles/skills',
        { skill: newSkill },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Skill added:', response.data);
      setProfile(response.data);
      setNewSkill('');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          'Error adding skill:',
          error.response?.data?.message || error.message
        );
        setMessage(
          `Error adding skill: ${error.response?.data?.message || error.message}`
        );
      } else {
        console.error('An unexpected error occurred:', error);
        setMessage('An unexpected error occurred');
      }
    }
  };

  const handleRemoveSkill = async (skill: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('No token found');
        return;
      }
      console.log('Removing skill with token:', token, 'and skill:', skill);
      const response = await axiosInstance.delete('/api/profiles/skills', {
        data: { skill },
      });
      console.log('Skill removed:', response.data);
      setProfile(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          'Error removing skill:',
          error.response?.data?.message || error.message
        );
        setMessage(
          `Error removing skill: ${error.response?.data?.message || error.message}`
        );
      } else {
        console.error('An unexpected error occurred:', error);
        setMessage('An unexpected error occurred');
      }
    }
  };

  const handleAddInterest = async () => {
    if (!newInterest.trim()) {
      setMessage('Interest cannot be empty');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('No token found');
        return;
      }
      console.log(
        'Adding interest with token:',
        token,
        'and interest:',
        newInterest
      );
      const response = await axiosInstance.post('/api/profiles/interests', {
        interest: newInterest,
      });
      console.log('Interest added:', response.data);
      setProfile(response.data);
      setNewInterest('');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          'Error adding interest:',
          error.response?.data?.message || error.message
        );
        setMessage(
          `Error adding interest: ${error.response?.data?.message || error.message}`
        );
      } else {
        console.error('An unexpected error occurred:', error);
        setMessage('An unexpected error occurred');
      }
    }
  };

  const handleRemoveInterest = async (interest: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('No token found');
        return;
      }
      console.log(
        'Removing interest with token:',
        token,
        'and interest:',
        interest
      );
      const response = await axiosInstance.delete('/api/profiles/interests', {
        data: { interest },
      });
      console.log('Interest removed:', response.data);
      setProfile(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          'Error removing interest:',
          error.response?.data?.message || error.message
        );
        setMessage(
          `Error removing interest: ${error.response?.data?.message || error.message}`
        );
      } else {
        console.error('An unexpected error occurred:', error);
        setMessage('An unexpected error occurred');
      }
    }
  };

  return (
    <>
      <MainContainer>
        <Headline data-testid={'profile-headline'}>{t('profile')}</Headline>
        {message && <p>{message}</p>}
        {profile && (
          <FormArea>
            <Container>
              <Headline2>{t('skills')}</Headline2>
              <List>
                {profile.skills.map((skill) => (
                  <li key={skill}>
                    <ItemContainer>
                      <Item>{skill}</Item>
                      <RemoveButton
                        data-testid={`remove-skill-${skill}`}
                        onClick={() => handleRemoveSkill(skill)}
                      >
                        &#10006;
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
                />
                <Button onClick={handleAddSkill} data-testid="add-skill-button">
                  &#10133;
                </Button>
              </InputContainer>
            </Container>
            <Container>
              <Headline2>{t('interests')}</Headline2>
              <List>
                {profile.interests.map((interest) => (
                  <li key={interest}>
                    <ItemContainer>
                      <Item>{interest}</Item>
                      <RemoveButton
                        onClick={() => handleRemoveInterest(interest)}
                        data-testid={`remove-interest-${interest}`}
                      >
                        &#10006;
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
                />
                <Button
                  onClick={handleAddInterest}
                  data-testid="add-interest-button"
                >
                  &#10133;
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
