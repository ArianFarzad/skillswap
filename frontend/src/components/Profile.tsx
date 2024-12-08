import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api/profiles', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data);
      } catch (error) {
        setMessage('Error fetching profile');
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <h2>Profile</h2>
      {profile ? (
        <div>
          <p>Name: {profile.name}</p>
          <p>Skills: {profile.skills.join(', ')}</p>
          <p>Interests: {profile.interests.join(', ')}</p>
        </div>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
};

export default Profile;