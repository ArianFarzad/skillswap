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
    <div className={'banner'}>
      <nav className="nav-area">
        <ul className="list-area">
          <li className="list-item">
            <Link to="/profile">&#128100;{t('profile')} </Link>
          </li>
          <li className="list-item">
            <Link to="/search">&#128270;{t('search')}</Link>
          </li>
        </ul>
        <p className={'logout'} onClick={handleLogout}>
          {t('logout')}
        </p>
      </nav>
    </div>
  );
};

export default NavBar;
