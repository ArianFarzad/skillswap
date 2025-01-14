import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import {
  RegisterArea,
  Headline,
  Paragraph,
  Label,
  Input,
  Button,
  RegisterMessage,
} from '../style/components/Register.style';

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
