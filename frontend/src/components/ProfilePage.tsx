// ProfilePage.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [profileData, setProfileData] = useState<any>(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const loggedInUserId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/profiles/${userId}`);
        setProfileData(response.data);
      } catch (error) {
        setMessage('Fehler beim Laden des Profils.');
        console.error(error);
      }
    };
    fetchProfile();
  }, [userId]);

  const handleEdit = () => {
    navigate('/profile'); // Zur eigenen Profilbearbeitungsseite
  };

  return (
    <div>
      {profileData ? (
        <div>
          <h2>{profileData.profile.name}</h2>
          <p><strong>Fähigkeiten:</strong> {profileData.profile.skills.join(', ')}</p>
          <p><strong>Interessen:</strong> {profileData.profile.interests.join(', ')}</p>

          <h3>Feedback</h3>
          {profileData.feedback && profileData.feedback.length > 0 ? (
            <ul>
              {profileData.feedback.map((fb: any) => (
                <li key={fb._id}>
                  <p>Bewertung: {fb.rating}</p>
                  <p>Kommentar: {fb.comment}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>Noch kein Feedback vorhanden.</p>
          )}

          {loggedInUserId === userId && (
            <button onClick={handleEdit}>Bearbeiten</button>
          )}
        </div>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
};

export default ProfilePage;