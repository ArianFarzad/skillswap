import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../style/NavBar.css';

const NavBar: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className='nav-area'>
      <ul className='list-area'>
        <li className='list-item'>
          <Link to="/profile">{t('profile')}</Link>
        </li>
        <li className='list-item'>
          <Link to="/search">{t('search')}</Link>
        </li>
        <li className='list-item'>
          <Link to="/settings">{t('settings')}</Link>
        </li>
        <li className='list-item'>
          <Link to="/book-appointment">{t('bookAppointment')}</Link>
        </li>
      </ul>
      <p onClick={handleLogout}>{t('logout')}</p>
    </nav>
  );
};

export default NavBar;