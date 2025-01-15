import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Banner,
  NavArea,
  ListArea,
  StyledLink,
  Logout,
} from '../style/components/NavBar.style';

const NavBar: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Banner>
      <NavArea>
        <ListArea>
          <li>
            <StyledLink to="/profile">&#128100;{t('profile')} </StyledLink>
          </li>
          <li>
            <StyledLink to="/search">&#128270;{t('search')}</StyledLink>
          </li>
        </ListArea>
        <Logout className={'logout'} onClick={handleLogout}>
          {t('logout')}
        </Logout>
      </NavArea>
    </Banner>
  );
};

export default NavBar;
