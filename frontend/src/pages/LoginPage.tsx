import React, { useEffect } from 'react';
import SettingsBar from '../components/SettingsBar.tsx';
import Intro from '../components/Intro';
import Login from '../components/Login';
import { MainContainer } from '../style/pages/LoginPage.style';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTypedTranslation } from '../utils/translationUtils.ts';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const { t } = useTypedTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token') && localStorage.getItem('myUserId')) {
      void navigate('/profile', { replace: true });
    }
  }, [navigate]);

  return (
    <HelmetProvider>
      <>
        <Helmet>
          <title>SkillSwap - {t('login')}</title>
        </Helmet>
        <SettingsBar profile={null} />
        <MainContainer>
          <Intro />
          <Login />
        </MainContainer>
      </>
    </HelmetProvider>
  );
};

export default LoginPage;
