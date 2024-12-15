import React from 'react';
import { useTranslation } from 'react-i18next';
import NavBar from './NavBar';

const Settings: React.FC = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <NavBar />
      <div>
        <h2>{t('settings')}</h2>
        <p>{t('select_language')}</p>
        <button onClick={() => changeLanguage('en')}>{t('english')}</button>
        <button onClick={() => changeLanguage('de')}>{t('german')}</button>
      </div>
    </>
  );
};

export default Settings;
