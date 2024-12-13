import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/profile.css';

interface ProfileType {
  skills: string[];
  interests: string[];
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
        const response = await axios.get('http://localhost:8000/api/profiles', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setMessage(
            `Error fetching profile: ${error.response?.data?.message || error.message}`
          );
        } else {
          setMessage('An unexpected error occurred');
        }
      }
    };

    fetchProfile();
  }, []);

  const handleAddSkill = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:8000/api/profiles/skills',
        { skill: newSkill },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProfile(response.data);
      setNewSkill('');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(
          `Error adding skill: ${error.response?.data?.message || error.message}`
        );
      } else {
        setMessage('An unexpected error occurred');
      }
    }
  };

  const handleAddInterest = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:8000/api/profiles/interests',
        { interest: newInterest },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProfile(response.data);
      setNewInterest('');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(
          `Error adding interest: ${error.response?.data?.message || error.message}`
        );
      } else {
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
                  <li key={skill}>{skill}</li>
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
                  <li key={interest}>{interest}</li>
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
