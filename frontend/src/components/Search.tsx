import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import NavBar from './NavBar';
import '../style/search.css';
import { Footer } from './Footer';

interface Profile {
  id: string; // Mapped from _id
  userId: string;
  name: string;
  email?: string; // Optional, if not always present
  skills: string[];
  interests: string[];
  points?: number; // Optional, if needed
}

const Search = () => {
  const { t } = useTranslation();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [keyword, setKeyword] = useState('');
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  const fetchProfiles = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error(t('missing_token'));
        return;
      }

      console.log('Fetching profiles with token:', token);

      const response = await axios.get(
        `http://localhost:8000/api/profiles/search?keyword=${encodeURIComponent(keyword)}&filter=${encodeURIComponent(filter)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Profiles fetched:', response.data);

      const data = Array.isArray(response.data)
        ? response.data
        : [response.data];

      const mappedProfiles = data.map((profile: any) => ({
        id: profile._id,
        userId: profile.userId,
        name: profile.name,
        email: profile.email || 'N/A',
        skills: profile.skills || [],
        interests: profile.interests || [],
        points: profile.points || 0,
      }));

      setProfiles(mappedProfiles);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          `${t('error_fetching_profiles')}: ${error.response?.data?.message || error.message}`
        );
      } else {
        console.error(t('unexpected_error'));
      }
    }
  }, [keyword, filter, t]);

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
      <NavBar />
      <div className="search-area">
        <div className="filter-container">
          <input
            className={'keyword-input'}
            type="text"
            placeholder={t('keyword')}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <input
            className={'filter-input'}
            type="number"
            min="0"
            placeholder={t('filter_by_points')}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className="all-profiles-container">
          <h2 id="all-profiles-headline">{t('all_profiles')}</h2>

          <div className="profiles-grid">
            {profiles.length === 0 ? (
              <div>{t('no_profiles_found')}</div>
            ) : (
              profiles.map((profile) => (
                <div key={profile.id} className="profile-card">
                  <h3 onClick={() => handleNameClick(profile.id)}>
                    {profile.name}
                  </h3>
                  <p>
                    {t('skills')}: {profile.skills.join(', ')}
                  </p>
                  <p>
                    {t('interests')}: {profile.interests.join(', ')}
                  </p>
                  <p>
                    {t('points')}: {profile.points}
                  </p>
                  <button onClick={() => handleChatRequest(profile.id)}>
                    {t('chat')}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Search;
