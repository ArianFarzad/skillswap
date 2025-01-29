import { Link } from 'react-router-dom';
import React from 'react';
import {
  Headline,
  MainContainer,
  WelcomeText,
} from '../style/components/Welcome.style';
import { useTypedTranslation } from '../utils/translationUtils.ts';

const Welcome: React.FC = () => {
  const { t } = useTypedTranslation();

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
