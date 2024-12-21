import React from 'react';
import { useTranslation } from 'react-i18next';
import NavBar from './NavBar';
import '../style/settings.css';
import {Footer} from "./Footer";

const Settings: React.FC = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <NavBar />
      <div className={'setting-container'}>
        <h2 id={'setting-headline'}>{t('settings')}</h2>
        <div className={'language-section setting-content'}>
          <h3>{t('select_language')}:</h3>
          <div className={'language-selection'}>
            <input
              type={'radio'}
              id={'englisch'}
              name={'language'}
              value={'en'}
              onChange={() => changeLanguage('en')}
            />
            <label htmlFor={'englisch'}>{t('english')}</label>
          </div>
          <div className={'language-selection'}>
            <input
              type={'radio'}
              id={'german'}
              name={'language'}
              value={'de'}
              onChange={() => changeLanguage('de')}
            />
            <label htmlFor={'german'}>{t('german')}</label>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Settings;
