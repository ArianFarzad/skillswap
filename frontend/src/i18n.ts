import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import 'react-i18next';
import loggerInstance from './utils/loggerInstance.ts';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslations from './locales/en.json';
import deTranslations from './locales/de.json';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: { translation: enTranslations },
      de: { translation: deTranslations },
    },
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  })
  .then(() => {
    loggerInstance.log('i18n initialized');
  })
  .catch((error) => {
    loggerInstance.error('Error initializing i18n:', error);
  });
