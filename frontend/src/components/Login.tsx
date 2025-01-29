import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Button,
  Form,
  Headline,
  Input,
  Label,
  LoginArea,
  LoginMessage,
  Paragraph,
} from '../style/components/Login.style';
import axiosInstance from '../utils/axiosInstance';
import loggerInstance from '../utils/loggerInstance.ts';
import { showToastError } from '../utils/toastUtils.ts';
import { useTypedTranslation } from '../utils/translationUtils.ts';

const Login: React.FC = () => {
  const { t } = useTypedTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/profile';

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
        response.data.userId,
      );
      navigate(redirect);
    } catch (error) {
      showToastError(error, t);
    }
  };

  return (
    <>
      <LoginArea>
        <Headline data-testid={'login-headline'}>{t('login')}</Headline>
        <Paragraph>{t('please_enter_details')}</Paragraph>
        <Form onSubmit={handleSubmit}>
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
            {t('Please_enter_your_password')}
          </Label>
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
          <Button data-testid={'login-button'} type="submit">
            {t('login')}
          </Button>
        </Form>
      </LoginArea>
    </>
  );
};

export default Login;
