import React from 'react';
import SettingsBar from '../components/SettingsBar.tsx';
import Welcome from '../components/Welcome';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTypedTranslation } from '../utils/translationUtils.ts';

const WelcomePage: React.FC = () => {
  const { t } = useTypedTranslation();

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
