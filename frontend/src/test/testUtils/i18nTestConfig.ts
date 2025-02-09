import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    lng: 'en',
    resources: {
      en: {
        translation: {
          sign_up: 'Sign Up',
        },
      },
    },
    interpolation: { escapeValue: false },
  })
  .then(() => {
    console.log('i18n initialized for tests');
  })
  .catch((error) => {
    console.error('i18n initialization failed:', error);
  });
export default i18n;
