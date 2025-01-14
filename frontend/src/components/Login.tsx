import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import TranslationBar from './TranslationBar.tsx';
import '../style/login.css';
import logo from '../assets/logo.png';

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
      localStorage.setItem('myUserId', response.data.userId); // Speichern Sie die userId
      console.log(
        'Login erfolgreich, userId gespeichert:',
        response.data.userId
      );
      setMessage(t('login_success'));
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
    <>
      <TranslationBar />
      <div className="login-container">
        <div className={'login-info'}>
          <img
            className="register-image"
            src={logo}
            height={300}
            width={300}
            alt=""
          />
          <h2 className={'info-text'}>{t('intro_message')}</h2>
        </div>
        <div className={'login-area'}>
          <h2 data-testid={'login-headline'}>{t('login')}</h2>
          <p>{t('please_enter_details')}</p>
          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor={'input-email'}>
              {t('Please_enter_your_email')}
            </label>
            <input
              type="email"
              id={'input-email'}
              placeholder={t('email')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor={'input-password'}>
              {t('Please_enter_your_password')}
            </label>
            <input
              type="password"
              id={'input-password'}
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
      </div>
    </>
  );
};

export default Login;
