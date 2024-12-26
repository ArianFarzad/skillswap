import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import '../style/register.css';
import logo from '../assets/logo.png';

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
            'Bei SkillSwap verbinden wir dich mit anderen Nutzern, um deine Fähigkeiten zu teilen und gleichzeitig von den Fähigkeiten anderer zu profitieren.'
          )}
        </h2>
      </div>
      <div className="register-area">
        <h1 data-testid={'register-headline'}>{t('register')}</h1>
        <p>{t('please_fill_details')}</p>
        <form className="register-form" onSubmit={handleSubmit}>
          <label htmlFor={'input-name'}>
            {t('Bitte geben Sie einen Benutzernamen ein')}
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
            {t('Bitte geben Sie eine E-Mail-Adresse ein')}
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
            {t('Bitte geben Sie ein Passwort ein')}
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
            {t('already_have_account')}
          </p>
          <button type="submit">{t('register')}</button>
          {message && <p>{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
