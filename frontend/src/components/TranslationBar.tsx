import React from 'react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { TranslationBarContainer, LangButton } from '../style/components/TranslationBar.style';

const TranslationBar: React.FC = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState('en');

  const changeLanguage = (lng: string) => {
    setLanguage(lng);
    i18n.changeLanguage(lng);
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