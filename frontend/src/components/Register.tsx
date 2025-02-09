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
  Row,
  Column,
  SpaceBetween,
  RowLeft,
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
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handlePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

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
        <Headline data-testid={'register-headline'}>{t('sign_up')}</Headline>
        <RowLeft>
          <Paragraph>{t('Already_have_an_account?')}</Paragraph>
          <RegisterMessage onClick={() => navigate('/login')}>
            {t('sign_in')}
          </RegisterMessage>
        </RowLeft>
        <form onSubmit={handleSubmit}>
          <Column>
            <Label htmlFor={'input-name'}>{t('username')}</Label>
            <Input
              type="text"
              id={'input-name'}
              placeholder={t('your_name')}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Column>
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
            <Label htmlFor={'input-password'}>{t('password')}</Label>
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
            <Row>
              <input
                type={'checkbox'}
                onChange={handlePasswordVisibility}
                id={'show_password'}
              />
              <Label htmlFor={'show_password'}>{t('show_password')}</Label>
            </Row>
            <Button data-testid={'register-button'} type="submit">
              {t('register')}
            </Button>
          </SpaceBetween>
        </form>
      </RegisterArea>
    </>
  );
};

export default Register;
