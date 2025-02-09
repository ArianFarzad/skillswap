import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  AlignCenter,
  Button,
  Column,
  Form,
  Headline,
  Input,
  Label,
  LoginArea,
  Paragraph,
  Row,
  SpaceBetween,
  StyledLink,
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
  const [passwordVisible, setPasswordVisible] = useState(false);
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
        response.data.userId
      );
      navigate(redirect);
    } catch (error) {
      showToastError(error, t);
    }
  };

  const handlePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  return (
    <>
      <LoginArea>
        <Headline data-testid={'login-headline'}>{t('login')}</Headline>
        <Row>
          <Paragraph>{t('do_not_have_an_account_yet')}</Paragraph>
          <StyledLink onClick={() => navigate('/register')}>
            {t('sign_up')}
          </StyledLink>
        </Row>
        <Form onSubmit={handleSubmit}>
          <Column>
            <Label htmlFor={'input-email'}>{t('email_address')}</Label>
            <Input
              type="email"
              id={'input-email'}
              placeholder={'you@example.com'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Column>
          <Column>
            <SpaceBetween>
              <Label htmlFor={'input-password'}>{t('password')}</Label>
              <StyledLink>{t('password_forget')}</StyledLink>
            </SpaceBetween>
            <Input
              type={passwordVisible ? 'text' : 'password'}
              id={'input-password'}
              placeholder={t('enter_password')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Column>
          <SpaceBetween>
            <AlignCenter>
              <input
                type={'checkbox'}
                onChange={handlePasswordVisibility}
                id={'show_password'}
              />
              <label htmlFor={'show_password'}>{t('show_password')}</label>
            </AlignCenter>
            <Button data-testid={'login-button'} type="submit">
              {t('login')}
            </Button>
          </SpaceBetween>
        </Form>
      </LoginArea>
    </>
  );
};

export default Login;
