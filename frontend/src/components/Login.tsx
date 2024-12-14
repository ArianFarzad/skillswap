import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import '../style/login.css';

const Login: React.FC = () => {
  const { t } = useTranslation();
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
      setMessage(t('login_success'));
      localStorage.setItem('userId', response.data.userId);
      navigate('/profile');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(
          `${t('login_error')}: ${error.response?.data?.message || error.message}`
        );
      } else {
        setMessage(t('unexpected_error'));
      }
    }
  };

  return (
    <div className="login-container">
      <h2>{t('login')}</h2>
      <p>{t('please_enter_details')}</p>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder={t('email')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder={t('password')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p id="login-message" onClick={() => navigate('/register')}>
          {t('new_here')}
        </p>
        <button type="submit">{t('login')}</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default Login;