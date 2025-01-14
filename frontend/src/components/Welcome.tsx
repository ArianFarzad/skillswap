import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../style/index.css';
import React from 'react';
import styled from 'styled-components';

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  color: rgb(212, 209, 209);
  align-items: center;
  flex-direction: column;
  text-align: center;
  background: rgba(255, 255, 255, 0.8);
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  height: 100vh;
  background: linear-gradient(45deg, #8d8e98, #a59793, #7b829c, #ae9f9f);
  animation: gradientAnimation 15s ease infinite;
`;

const Headline = styled.h1`
  font-size: 3em;
  font-weight: bold;
  margin-bottom: 1em;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const WelcomeText = styled.p`
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 2em;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
`;

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
