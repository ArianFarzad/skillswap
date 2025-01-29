import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Banner,
  ListArea,
  Logout,
  NavArea,
  StyledLink,
} from '../style/components/NavBar.style';
import { useTypedTranslation } from '../utils/translationUtils.ts';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';

const NavBar: React.FC = () => {
  const { t } = useTypedTranslation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('myUserId');
    navigate('/login');
  };

  return (
    <Banner>
      <NavArea>
        <ListArea>
          <li>
            <StyledLink to="/profile">
              <PersonIcon />
              &nbsp;{t('profile')}
            </StyledLink>
          </li>
          <li>
            <StyledLink to="/search">
              <SearchIcon />
              &nbsp;{t('search')}
            </StyledLink>
          </li>
        </ListArea>
        <Logout className={'logout'} onClick={handleLogout}>
          <LogoutIcon />
          &nbsp;{t('logout')}
        </Logout>
      </NavArea>
    </Banner>
  );
};

export default NavBar;
