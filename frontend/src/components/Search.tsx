import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import NavBar from './NavBar';
import '../style/search.css';

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

  const fetchProfiles = useCallback(async () => {
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
  }, [t]);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  const handleChatRequest = async (otherUserId: string) => {
    const myUserId = localStorage.getItem('myUserId') || '';
    try {
      // Check if a session exists between the two users
      const response = await axios.get(
        `http://localhost:8000/api/sessions/check?user1=${myUserId}&user2=${otherUserId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
      let sessionId = response.data.sessionId;
  
      if (!sessionId) {
        // If no session exists, create a new one
        const createResponse = await axios.post(
          'http://localhost:8000/api/sessions',
          {
            tutor: myUserId,
            student: otherUserId,
            date: new Date(),
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        sessionId = createResponse.data._id;
      }
  
      // Navigate to the chat page with the sessionId
      navigate(`/chat/${sessionId}`);
    } catch (error) {
      console.error('Error handling chat request:', error);
    }
  };

  const handleNameClick = (userId: string) => {
    console.log('Navigating to profile:', userId);
    navigate(`/profiles/${userId}`);
  };

  return (
    <>
      
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
    </>
  );
};

export default Search;