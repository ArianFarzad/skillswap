import React, { useEffect } from 'react';
import SettingsBar from '../components/SettingsBar.tsx';
import Welcome from '../components/Welcome';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTypedTranslation } from '../utils/translationUtils.ts';
import { useNavigate } from 'react-router-dom';

const WelcomePage: React.FC = () => {
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
          <title>{t('welcome')}</title>
        </Helmet>
        <SettingsBar profile={null} />
        <Welcome />
      </>
    </HelmetProvider>
  );
};

export default WelcomePage;
