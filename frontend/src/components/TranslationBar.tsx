import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  LangButton,
  TranslationBarContainer,
} from '../style/components/TranslationBar.style';
import loggerInstance from '../utils/loggerInstance.ts';

const TranslationBar: React.FC = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState('en');

  const changeLanguage = (lng: string) => {
    setLanguage(lng);
    i18n
      .changeLanguage(lng)
      .catch((error) =>
        loggerInstance.error('Failed to change language:', error)
      );
  };

  return (
    <TranslationBarContainer>
      <LangButton
        className={language === 'en' ? 'selected' : ''}
        onClick={() => changeLanguage('en')}
      >
        🇬🇧
      </LangButton>
      <LangButton
        className={language === 'de' ? 'selected' : ''}
        onClick={() => changeLanguage('de')}
      >
        🇩🇪
      </LangButton>
    </TranslationBarContainer>
  );
};

export default TranslationBar;
