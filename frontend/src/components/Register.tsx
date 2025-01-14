import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import '../style/register.css';
import logo from '../assets/logo.png';
import TranslationBar from './TranslationBar.tsx';

const Register = () => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/auth/register', {
        name,
        email,
        password,
      });
      setMessage(t('register_success'));
      navigate('/login');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(
          `${t('error_registering_user')}: ${error.response?.data?.message || error.message}`
        );
      } else {
        setMessage(t('unexpected_error'));
      }
    }
  };

  return (
    <>
      <TranslationBar />
      <div className={'register-container'}>
        <div className={'register-info'}>
          <img
            className="register-image"
            src={logo}
            height={300}
            width={300}
            alt=""
          />
          <h2 className={'info-text'}>
            {t(
              'At SkillSwap, we connect you with other users to share your skills while benefiting from the skills of others.'
            )}
          </h2>
        </div>
        <div className="register-area">
          <h1 data-testid={'register-headline'}>{t('register')}</h1>
          <p>{t('Please_fill_in_your_details_to_register')}</p>
          <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor={'input-name'}>
              {t('Please_enter_an_username')}
            </label>
            <input
              type="text"
              id={'input-name'}
              placeholder={t('name')}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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
              {t('Please_enter_a_password')}
            </label>
            <input
              type="password"
              id={'input-password'}
              placeholder={t('password')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p id="register-message" onClick={() => navigate('/login')}>
              {t('Already_have_an_account?')}
            </p>
            <button type="submit">{t('register')}</button>
            {message && <p>{message}</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
