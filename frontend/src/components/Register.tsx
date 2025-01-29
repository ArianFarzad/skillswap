import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Headline,
  Input,
  Label,
  Paragraph,
  RegisterArea,
  RegisterMessage,
} from '../style/components/Register.style';
import axiosInstance from '../utils/axiosInstance';
import toast from 'react-hot-toast';
import { useTypedTranslation } from '../utils/translationUtils.ts';
import { showToastError } from '../utils/toastUtils.ts';

const Register = () => {
  const { t } = useTypedTranslation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/api/auth/register', {
        name,
        email,
        password,
      });
      toast.success(t('register_success'));
      navigate('/login');
    } catch (error) {
      showToastError(error, t);
    }
  };

  return (
    <>
      <RegisterArea>
        <Headline data-testid={'register-headline'}>{t('register')}</Headline>
        <Paragraph>{t('Please_fill_in_your_details_to_register')}</Paragraph>
        <form onSubmit={handleSubmit}>
          <Label htmlFor={'input-name'}>{t('Please_enter_a_username')}</Label>
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
          <Button data-testid={'register-button'} type="submit">
            {t('register')}
          </Button>
        </form>
      </RegisterArea>
    </>
  );
};

export default Register;
