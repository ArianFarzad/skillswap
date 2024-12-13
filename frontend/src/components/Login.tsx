import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/api/auth/login',
        {
          email,
          password,
        }
      );
      localStorage.setItem('token', response.data.token);
      setMessage('Login successful');
      localStorage.setItem('userId', response.data.userId);
      navigate('/profile');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(
          `Error logging in: ${error.response?.data?.message || error.message}`
        );
      } else {
        setMessage('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <p>Please enter your details to login.</p>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p id="login-message" onClick={() => navigate('/register')}>
          New here?
        </p>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
