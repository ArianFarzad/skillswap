import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Form,
  Headline,
  Input,
  LoginArea,
  LoginMessage,
  Paragraph,
} from '../style/components/Login.style';
import axiosInstance from '../utils/axiosInstance';
import axios from 'axios';
import loggerInstance from '../utils/loggerInstance.ts';

const Login: React.FC = () => {
  const {
    t,
  }: {
    t: (key: keyof typeof import('../../public/locales/en.json')) => string;
  } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/api/auth/login', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('myUserId', response.data.userId);
      loggerInstance.info(
        'Login successful, saved userId:',
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
      <LoginArea>
        <Headline data-testid={'login-headline'}>{t('login')}</Headline>
        <Paragraph>{t('please_enter_details')}</Paragraph>
        <Form onSubmit={handleSubmit}>
          <label htmlFor={'input-email'}>{t('Please_enter_your_email')}</label>
          <Input
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
          <Input
            type="password"
            id={'input-password'}
            placeholder={t('password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <LoginMessage onClick={() => navigate('/register')}>
            {t('new_here')}
          </LoginMessage>
          <Button type="submit">{t('login')}</Button>
          {message && <p>{message}</p>}
        </Form>
      </LoginArea>
    </>
  );
};

export default Login;
