import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Profile {
  id: string;
  name: string;
  email: string;
  skills: string[];
  interests: string[];
}

const Search: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const navigate = useNavigate();

  const fetchProfiles = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/profiles');
      setProfiles(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          'Error fetching profiles:',
          error.response?.data?.message || error.message
        );
      } else {
        console.error('An unexpected error occurred');
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
      <h2>Alle Profile</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Skills</th>
            <th>Interests</th>
            <th>Actions</th>
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
