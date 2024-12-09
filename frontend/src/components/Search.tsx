// Search.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// Search.tsx

const Search: React.FC = () => {
  const [profiles, setProfiles] = useState<any[]>([]);
  const navigate = useNavigate();

  const fetchProfiles = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/profiles/all');
      setProfiles(response.data);
    } catch (error) {
      console.error('Error fetching profiles:', error);
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
            <th>Fähigkeiten</th>
            <th>Interessen</th>
            <th>Chat-Anfrage</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile) => (
            <tr key={profile.userId}>
              <td>
                <button onClick={() => handleNameClick(profile.userId)}>
                  {profile.name}
                </button>
              </td>
              <td>{profile.skills ? profile.skills.join(', ') : ''}</td>
              <td>{profile.interests ? profile.interests.join(', ') : ''}</td>
              <td>
                <button onClick={() => handleChatRequest(profile.userId)}>
                  Anfrage senden
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Alle Profile</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Fähigkeiten</th>
            <th>Interessen</th>
            <th>Chat-Anfrage</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile) => (
            <tr key={profile.userId}>
              <td>
                <button onClick={() => handleNameClick(profile.userId)}>
                  {profile.name}
                </button>
              </td>
              <td>{profile.skills ? profile.skills.join(', ') : ''}</td>
              <td>{profile.interests ? profile.interests.join(', ') : ''}</td>
              <td>
                <button onClick={() => handleChatRequest(profile.userId)}>
                  Anfrage senden
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