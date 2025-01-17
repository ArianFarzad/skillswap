import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ColumnHeading,
  ColumnText,
  LeftColumn,
  List,
  ListItem,
  ProfileContainer,
  ProfileContent,
  ProfileInfo,
  ProfilePageHeadline,
  RightColumn,
  ScrollArea,
  UserEmail,
  UserName,
} from '../style/components/UserInfos.style';
import axiosInstance from '../utils/axiosInstance';

interface ProfileData {
  name: string;
  email: string;
  skills: string[];
  interests: string[];
}

const UserInfos: React.FC = () => {
  const {
    t,
  }: {
    t: (key: keyof typeof import('../../public/locales/en.json')) => string;
  } = useTranslation();
  const { profileId } = useParams<{ profileId: string }>();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!profileId) {
      setMessage('Profile ID is missing');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get(
          `http://localhost:8000/api/profiles/${profileId}`
        );
        setProfileData(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setMessage(
            `Error fetching profile: ${error.response?.data?.message || error.message}`
          );
        } else {
          setMessage('An unexpected error occurred');
        }
      }
    };

    fetchProfile().catch(() => {
      setMessage('An unexpected error occurred');
    });
  }, [profileId]);

  return (
    <ProfileContainer>
      <ProfilePageHeadline data-testid={'profilePage-headline'}>
        {t('profile_page')}
      </ProfilePageHeadline>
      <ProfileContent>
        {message && <p>{message}</p>}
        {profileData && (
          <ProfileInfo>
            <LeftColumn>
              <UserName>
                <ColumnHeading>{t('user_name')}</ColumnHeading>
                <ColumnText>{profileData.name}</ColumnText>
              </UserName>
              <UserEmail>
                <ColumnHeading>E-mail</ColumnHeading>
                <ColumnText>{profileData.email}</ColumnText>
              </UserEmail>
            </LeftColumn>
            <RightColumn>
              <div>
                <ColumnHeading>{t('skills')}</ColumnHeading>
                <ScrollArea>
                  <List>
                    {profileData.skills.map((skill) => (
                      <ListItem key={skill}>{skill}</ListItem>
                    ))}
                  </List>
                </ScrollArea>
              </div>
              <div>
                <ColumnHeading>{t('interests')}</ColumnHeading>
                <ScrollArea>
                  <List>
                    {profileData.interests.map((interest) => (
                      <ListItem key={interest}>{interest}</ListItem>
                    ))}
                  </List>
                </ScrollArea>
              </div>
            </RightColumn>
          </ProfileInfo>
        )}
      </ProfileContent>
    </ProfileContainer>
  );
};

export default UserInfos;
