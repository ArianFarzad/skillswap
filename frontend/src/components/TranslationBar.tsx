import React from 'react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import '../style/translationBar.css';

const TranslationBar: React.FC = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState('en');

  const changeLanguage = (lng: string) => {
    setLanguage(lng);
    i18n.changeLanguage(lng);
  };

  return (
    <div className={'translation-bar'}>
      <button
        className={language == 'en' ? 'selected' : 'lang-btn'}
        onClick={() => changeLanguage('en')}
      >
        🇬🇧
      </button>
      <button
        className={language == 'de' ? 'selected' : 'lang-btn'}
        onClick={() => changeLanguage('de')}
      >
        🇩🇪
      </button>
    </div>
  );
};

export default TranslationBar;
