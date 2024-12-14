import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/profile.css';

interface ProfileType {
  skills: string[];
  interests: string[];
  points: number;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setMessage('No token found');
          return;
        }
        console.log('Fetching profile with token:', token);
        const response = await axios.get('http://localhost:8000/api/profiles', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Profile fetched:', response.data);
        setProfile(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Error fetching profile:', error.response?.data?.message || error.message);
          setMessage(`Error fetching profile: ${error.response?.data?.message || error.message}`);
        } else {
          console.error('An unexpected error occurred:', error);
          setMessage('An unexpected error occurred');
        }
      }
    };

    fetchProfile();
  }, []);

  const handleAddSkill = async () => {
    if (!newSkill.trim()) {
      setMessage('Skill cannot be empty');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('No token found');
        return;
      }
      console.log('Adding skill with token:', token, 'and skill:', newSkill);
      const response = await axios.put(
        'http://localhost:8000/api/profiles/skills',
        { skill: newSkill },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Skill added:', response.data);
      setProfile(response.data);
      setNewSkill('');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error adding skill:', error.response?.data?.message || error.message);
        setMessage(`Error adding skill: ${error.response?.data?.message || error.message}`);
      } else {
        console.error('An unexpected error occurred:', error);
        setMessage('An unexpected error occurred');
      }
    }
  };

  const handleRemoveSkill = async (skill: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('No token found');
        return;
      }
      console.log('Removing skill with token:', token, 'and skill:', skill);
      const response = await axios.delete(
        'http://localhost:8000/api/profiles/skills',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { skill },
        }
      );
      console.log('Skill removed:', response.data);
      setProfile(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error removing skill:', error.response?.data?.message || error.message);
        setMessage(`Error removing skill: ${error.response?.data?.message || error.message}`);
      } else {
        console.error('An unexpected error occurred:', error);
        setMessage('An unexpected error occurred');
      }
    }
  };

  const handleAddInterest = async () => {
    if (!newInterest.trim()) {
      setMessage('Interest cannot be empty');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('No token found');
        return;
      }
      console.log('Adding interest with token:', token, 'and interest:', newInterest);
      const response = await axios.post(
        'http://localhost:8000/api/profiles/interests',
        { interest: newInterest },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Interest added:', response.data);
      setProfile(response.data);
      setNewInterest('');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error adding interest:', error.response?.data?.message || error.message);
        setMessage(`Error adding interest: ${error.response?.data?.message || error.message}`);
      } else {
        console.error('An unexpected error occurred:', error);
        setMessage('An unexpected error occurred');
      }
    }
  };

  const handleRemoveInterest = async (interest: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('No token found');
        return;
      }
      console.log('Removing interest with token:', token, 'and interest:', interest);
      const response = await axios.delete(
        'http://localhost:8000/api/profiles/interests',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { interest },
        }
      );
      console.log('Interest removed:', response.data);
      setProfile(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error removing interest:', error.response?.data?.message || error.message);
        setMessage(`Error removing interest: ${error.response?.data?.message || error.message}`);
      } else {
        console.error('An unexpected error occurred:', error);
        setMessage('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="profile-main-container">
      <div className="profile-container">
        <h2 id='profile-headline'>Profile</h2>
        {message && <p>{message}</p>}
        {profile && (
          <div className="form-area">
            <div className="skill-area">
              <h3 className='skill-interest-headline'>Skills</h3>
              <ul>
                {profile.skills.map((skill) => (
                  <li key={skill}>
                    {skill}
                    <button onClick={() => handleRemoveSkill(skill)}>x</button>
                  </li>
                ))}
              </ul>
              <div className="skill-input">
                <input
                  type="text"
                  placeholder="New Skill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                />
                <button onClick={handleAddSkill}>+</button>
              </div>
            </div>
            <div className="interest-area">
              <h3 className='skill-interest-headline'>Interests</h3>
              <ul>
                {profile.interests.map((interest) => (
                  <li key={interest}>
                    {interest}
                    <button onClick={() => handleRemoveInterest(interest)}>x</button>
                  </li>
                ))}
              </ul>
              <div className="interest-input">
                <input
                  type="text"
                  placeholder="New Interest"
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                />
                <button onClick={handleAddInterest}>+</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;