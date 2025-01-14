import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import '../style/index.css';

const RegisterArea = styled.div`
  width: 100%;
  height: 100vh;
  padding: 2rem;
  border-left: 2px solid #5e5e63;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
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

const Input = styled.input`
  padding: var(--input-padding);
  font-size: 1rem;
  margin-bottom: 1rem;
  border: var(--input-border);
  border-radius: var(--input-border-radius);
  width: 93%;
  box-shadow: var(--input-box-shadow);
  transition: border-color 0.3s ease;

  &:focus {
    border: var(--input-border-focus);
    outline: none;
  }
`;

const Label = styled.label`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--button-border-redius);
  cursor: pointer;
  transition: var(--button-transition);

  &:hover {
    background-color: var(--primary-color-hover);
  }
`;

const RegisterMessage = styled.p`
  color: blue;
  text-align: right;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: var(--link-hover);
  }
`;

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
      <RegisterArea>
        <Headline data-testid={'register-headline'}>{t('register')}</Headline>
        <Paragraph>{t('Please_fill_in_your_details_to_register')}</Paragraph>
        <form onSubmit={handleSubmit}>
          <Label htmlFor={'input-name'}>{t('Please_enter_an_username')}</Label>
          <Input
            type="text"
            id={'input-name'}
            placeholder={t('name')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Label htmlFor={'input-email'}>{t('Please_enter_your_email')}</Label>
          <Input
            type="email"
            id={'input-email'}
            placeholder={t('email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Label htmlFor={'input-password'}>
            {t('Please_enter_a_password')}
          </Label>
          <Input
            type="password"
            id={'input-password'}
            placeholder={t('password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <RegisterMessage onClick={() => navigate('/login')}>
            {t('Already_have_an_account?')}
          </RegisterMessage>
          <Button type="submit">{t('register')}</Button>
          {message && <p>{message}</p>}
        </form>
      </RegisterArea>
    </>
  );
};

export default Register;
