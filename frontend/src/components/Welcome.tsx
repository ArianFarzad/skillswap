import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/welcom.css';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="main-container">
      <h2 id="welcome-headline">Welcome to SkillSwap</h2>
      <p id="welcome-text">
        This platform offers you the opportunity to connect with other
        participants to share your skills or work on improving them.
        <span className="link" onClick={handleRegister}>
          {' '}
          Register{' '}
        </span>{' '}
        if you’re here for the first time, or
        <span className="link" onClick={handleLogin}>
          {' '}
          log in{' '}
        </span>{' '}
        if you’re already part of our platform.
      </p>
    </div>
  );
};

export default Welcome;
