import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next'; // Importieren des useTranslation Hooks
import '../style/register.css';

const Register = () => {
  const { t } = useTranslation(); // Verwendung des useTranslation Hooks
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
    <div className="register-area">
      <h2>{t('register')}</h2>
      <p>{t('please_fill_details')}</p>
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={t('name')}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <p id="register-message" onClick={() => navigate('/login')}>
          {t('already_have_account')}
        </p>
        <button type="submit">{t('register')}</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default Register;
