import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import '../style/index.css';
import styled from "styled-components";

const LoginArea = styled.div`
  padding: 2rem;
  border-left: var(--box-border-left);
  flex: 1;
`;

const Headline = styled.h1`
  text-align: center;
  margin-bottom: 1.5rem;
  color: #666;
`;

const Paragraph = styled.p`
  text-align: center;
  margin-bottom: 1.5rem;
  color: #666;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 95%;
  padding: var(--input-padding);
  font-size: 1rem;
  margin-bottom: 1rem;
  border: var(--input-border);
  border-radius: var(--input-border-radius);
  box-shadow: var(--input-box-shadow);
  transition: border-color 0.3s ease;
    &:focus {
        border: var(--input-border-focus);
        outline: none;
    }
`;

const LoginMessage = styled.p`
  margin-top: 1rem;
  color: blue;
  text-align: right;
  cursor: pointer;
  text-decoration: underline;
  
    &:hover {
        color: var(--link-hover);;
    }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: var(--button-border-redius);
  cursor: pointer;
  transition: var(--button-transition);
  
    &:hover {
        background-color: var(--primary-color-hover);;
    }
`;

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
        <LoginArea>
          <Headline data-testid={'login-headline'}>{t('login')}</Headline>
          <Paragraph>{t('please_enter_details')}</Paragraph>
          <Form onSubmit={handleSubmit}>
            <label htmlFor={'input-email'}>
              {t('Please_enter_your_email')}
            </label>
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
