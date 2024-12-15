// ProfilePage.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


interface ProfileData {
  name: string;
  email: string;
  skills: string[];
  interests: string[];
}

const ProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const { userId } = useParams<{ userId: string }>();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/profiles/${userId}`
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

    fetchProfile();
  }, [userId]);

  return (
    <div>
      <h2>{t('profile_page')}</h2>
      {message && <p>{message}</p>}
      {profileData && (
        <div>
          <h3>{profileData.name}</h3>
          <p>E-mail: {profileData.email}</p>
          <h4>{t('skills')}</h4>
          <ul>
            {profileData.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
          <h4>{t('interests')}</h4>
          <ul>
            {profileData.interests.map((interest) => (
              <li key={interest}>{interest}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
