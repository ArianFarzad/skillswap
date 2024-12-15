import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Profile {
  id: string;
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
    // Chat-Anfrage Implementierung
    console.log('Chat request to:', userId);
  };

  const handleNameClick = (userId: string) => {
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
              <td onClick={() => handleNameClick(profile.id)}>
                {profile.name}
              </td>
              <td>{profile.email}</td>
              <td>{profile.skills.join(', ')}</td>
              <td>{profile.interests.join(', ')}</td>
              <td>
                <button onClick={() => handleChatRequest(profile.id)}>
                  Chat
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Search;
