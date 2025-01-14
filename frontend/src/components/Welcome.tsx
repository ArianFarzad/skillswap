import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import React from 'react';
import {
  MainContainer,
  WelcomeText,
  Headline,
} from '../style/components/Welcome.style';

const Welcome: React.FC = () => {
  const { t } = useTranslation();

  return (
    <MainContainer>
      <Headline data-testid={'welcome-headline'}>{t('welcome')}</Headline>
      <WelcomeText>{t('connect_learn_grow')}</WelcomeText>
      <Link to="/login">{t('login')}</Link>
      <Link to="/register">{t('register')}</Link>
    </MainContainer>
  );
};

export default Welcome;
