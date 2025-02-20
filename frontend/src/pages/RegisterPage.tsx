import React, { useEffect } from 'react';
import SettingsBar from '../components/SettingsBar.tsx';
import Intro from '../components/Intro';
import Register from '../components/Register';
import { MainContainer } from '../style/pages/RegisterPage.style';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTypedTranslation } from '../utils/translationUtils.ts';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
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
          <title>SkillSwap - {t('register')}</title>
        </Helmet>
        <SettingsBar profile={null} />
        <MainContainer>
          <Intro />
          <Register />
        </MainContainer>
      </>
    </HelmetProvider>
  );
};

export default RegisterPage;
