// Profile.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [message, setMessage] = useState('');

  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');

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

  const handleAddSkill = () => {
    if (newSkill.trim() === '') return;
    setProfile({
      ...profile,
      skills: [...(profile.skills || []), newSkill.trim()],
    });
    setNewSkill('');
  };

  const handleDeleteSkill = (index: number) => {
    const updatedSkills = [...profile.skills];
    updatedSkills.splice(index, 1);
    setProfile({
      ...profile,
      skills: updatedSkills,
    });
  };

  const handleAddInterest = () => {
    if (newInterest.trim() === '') return;
    setProfile({
      ...profile,
      interests: [...(profile.interests || []), newInterest.trim()],
    });
    setNewInterest('');
  };

  const handleDeleteInterest = (index: number) => {
    const updatedInterests = [...profile.interests];
    updatedInterests.splice(index, 1);
    setProfile({
      ...profile,
      interests: updatedInterests,
    });
  };

  const handleSaveProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        'http://localhost:8000/api/profiles',
        {
          name: profile.name,
          skills: profile.skills,
          interests: profile.interests,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage('Profile updated successfully');
    } catch (error) {
      setMessage('Error updating profile');
    }
  };

  return (
    <div>
      <h2>Profil</h2>
      {profile ? (
        <div>
          <p>Name: {profile.name}</p>

          <h3>Skills</h3>
          <ul>
            {profile.skills &&
              profile.skills.map((skill: string, index: number) => (
                <li key={index}>
                  {skill}{' '}
                  <button onClick={() => handleDeleteSkill(index)}>Löschen</button>
                </li>
              ))}
          </ul>
          <input
            type="text"
            placeholder="Neue Skill hinzufügen"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
          />
          <button onClick={handleAddSkill}>Skill hinzufügen</button>

          <h3>Interessen</h3>
          <ul>
            {profile.interests &&
              profile.interests.map((interest: string, index: number) => (
                <li key={index}>
                  {interest}{' '}
                  <button onClick={() => handleDeleteInterest(index)}>Löschen</button>
                </li>
              ))}
          </ul>
          <input
            type="text"
            placeholder="Neue Interesse hinzufügen"
            value={newInterest}
            onChange={(e) => setNewInterest(e.target.value)}
          />
          <button onClick={handleAddInterest}>Interesse hinzufügen</button>

          <button onClick={handleSaveProfile}>Profil speichern</button>

          {message && <p>{message}</p>}
        </div>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
};

export default Profile;