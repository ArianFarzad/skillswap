import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/register.css';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/api/auth/register',
        {
          name,
          email,
          password,
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(`Error registering user ${error}`);
    }
  };

  const handleForwardToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="register-area">
      <h2>Register</h2>
      <p>Please enter your details to create an account.</p>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          className="register-input"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          className="register-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="register-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p id="register-message" onClick={handleForwardToLogin}>
          already have an account?
        </p>
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
