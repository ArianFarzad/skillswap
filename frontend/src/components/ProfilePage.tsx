import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

interface Profile {
  _id: string;
  userId: string;
  name: string;
  skills: string[];
  interests: string[];
  points: number;
}

const ProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const { userId } = useParams<{ userId: string }>();
  const [profileData, setProfileData] = useState<Profile | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/profiles/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log('Response data:', response.data); // Log the response data
        setProfileData(response.data.profile); // Extract the profile data
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setMessage(t('error_fetching_profiles'));
      }
    };

    fetchProfileData();
  }, [userId, t]);

  if (!profileData) {
    return <p>{t('loading')}</p>;
  }

  const { name, skills, interests } = profileData;

  return (
    <div>
      <h2>{t('profile_page')}</h2>
      {message && <p>{message}</p>}
      <div>
        <h3>{name}</h3>
        
        <h4>{t('skills')}</h4>
        <ul>
          {Array.isArray(skills) && skills.length > 0 ? (
            skills.map((skill: string) => (
              <li key={skill}>{skill}</li>
            ))
          ) : (
            <li>{t('no_skills')}</li>
          )}
        </ul>
        <h4>{t('interests')}</h4>
        <ul>
          {Array.isArray(interests) && interests.length > 0 ? (
            interests.map((interest: string) => (
              <li key={interest}>{interest}</li>
            ))
          ) : (
            <li>{t('no_interests')}</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;