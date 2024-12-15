import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

interface Profile {
  id: string;
  userId: string;
  name: string;
  email: string;
  skills: string[];
  interests: string[];
}

const Search: React.FC = () => {
  const { t } = useTranslation();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const navigate = useNavigate();

  const fetchProfiles = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/profiles/all');
      setProfiles(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          `${t('error_fetching_profiles')}: ${error.response?.data?.message || error.message}`
        );
      } else {
        console.error(t('unexpected_error'));
      }
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleChatRequest = (userId: string) => {
    navigate(`/chat/${userId}`);
  };

  const handleNameClick = (userId: string) => {
    console.log('Navigating to profile:', userId);
    navigate(`/profiles/${userId}`);
  };

  return (
    <div>
      <h2>{t('all_profiles')}</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>{t('skills')}</th>
            <th>{t('interests')}</th>
            <th>{t('actions')}</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile) => (
            <tr key={profile.id}>
              <td onClick={() => handleNameClick(profile.userId)}>
                {profile.name}
              </td>
              <td>{profile.email}</td>
              <td>{profile.skills.join(', ')}</td>
              <td>{profile.interests.join(', ')}</td>
              <td>
                <button onClick={() => handleChatRequest(profile.userId)}>{t('chat')}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Search;