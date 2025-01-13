import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    backend: {
      loadPath: '/locales/{{lng}}.json', // Pfad zu den Übersetzungsdateien
    },
    interpolation: {
      escapeValue: false,
    },
  })
  .then(() => {
    console.log('i18n initialized');
  })
  .catch((error) => {
    console.error('Error initializing i18n:', error);
  });

export default i18n;
