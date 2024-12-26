import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../style/welcom.css';

export const Welcome = () => {
  const { t } = useTranslation();

  return (
    <div className="main-container">
      <h1 id="welcome-headline" data-testid={'welcome-headline'}>
        {t('welcome')}
      </h1>
      <p id="welcome-text">{t('connect_learn_grow')}</p>
      <Link to="/login" className="link">
        {t('login')}
      </Link>
      <Link to="/register" className="link">
        {t('register')}
      </Link>
    </div>
  );
};
