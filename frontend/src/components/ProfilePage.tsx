import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import NavBar from './NavBar';
import { Footer } from './Footer';
import '../style/profilePage.css';
import axiosInstance from '../utils/axiosInstance';

interface ProfileData {
  name: string;
  email: string;
  skills: string[];
  interests: string[];
}

const ProfilePage: React.FC = () => {
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
        const response = await axiosInstance.get(`/api/profiles/${profileId}`);
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

    fetchProfile().catch((error) => {
      console.error('Unexpected error during profile fetch:', error);
    });
  }, [profileId]);

  return (
    <>
      <NavBar />
      <div className={'profile-container'}>
        <h2 id={'profile-page-headline'} data-testid={'profilePage-headline'}>
          {t('profile_page')}
        </h2>
        <div className={'profile-content'}>
          {message && <p>{message}</p>}
          {profileData && (
            <div className={'profile-info'}>
              <div className={'left-column'}>
                <div className={'user-name'}>
                  <h3>{t('user_name')} </h3>
                  <p>{profileData.name}</p>
                </div>
                <div className={'user-email'}>
                  <h3>E-mail</h3>
                  <p>{profileData.email}</p>
                </div>
              </div>
              <div className={'right-column'}>
                <div className={'user-skills'}>
                  <h4>{t('skills')}</h4>
                  <div className={'scroll-area'}>
                    <ul>
                      {profileData.skills.map((skill) => (
                        <li key={skill}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className={'user-interests'}>
                  <h4>{t('interests')}</h4>
                  <div className={'scroll-area'}>
                    <ul>
                      {profileData.interests.map((interest) => (
                        <li key={interest}>{interest}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
