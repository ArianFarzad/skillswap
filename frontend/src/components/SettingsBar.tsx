import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import log from '../utils/loggerInstance.ts';
import {
  Brightness4,
  Brightness7,
  Home,
  LogoutSharp,
} from '@mui/icons-material';
import { FiArrowLeft } from 'react-icons/fi';
import {
  Label,
  LeftContainer,
  MainContainer,
  ProfilePictureSmall,
  RightContainer,
  StyledButton,
  StyledFlag,
  StyledInput,
} from '../style/components/SettingsBar.style';
import axios from '../utils/axiosInstance.ts';
import { IProfile } from '../models/models.ts';

interface SettingsBarProps {
  profile: IProfile | null;
}

const SettingsBar: React.FC<SettingsBarProps> = ({ profile }) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });
  const [lang, setLang] = useState<string>(() => i18n.language || 'en');
  const location = useLocation();
  const isAuthPage =
    location.pathname === '/login' ||
    location.pathname === '/register' ||
    location.pathname === '/';

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng).catch((err) => log.log(err));
    setLang(lng);
  };

  const handleGoBack = () => {
    void navigate(-1);
  };

  const handleGoHome = () => {
    void navigate('/profile');
  };

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout');

      localStorage.removeItem('token');
      localStorage.removeItem('myUserId');

      void navigate('/login');
    } catch (e) {
      log.error(`Logout failed with error: ${e}`);
    }
  };

  return (
    <MainContainer>
      <LeftContainer>
        {!isAuthPage && (
          <StyledButton onClick={handleGoBack}>
            <FiArrowLeft />
          </StyledButton>
        )}
        {!isAuthPage && (
          <StyledButton onClick={handleLogout}>
            <LogoutSharp />
          </StyledButton>
        )}
        {!isAuthPage && (
          <StyledButton onClick={handleGoHome}>
            <Home />
          </StyledButton>
        )}
        <Label>
          <StyledInput
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </Label>
      </LeftContainer>
      <RightContainer>
        {!isAuthPage && (
          <ProfilePictureSmall
            src={profile?.profilePicture || '/avatar.png'}
            alt="Profile"
          />
        )}
        <StyledFlag
          code="GB"
          lang={lang}
          currentLang={'en'}
          onClick={() => changeLanguage('en')}
        />
        <StyledFlag
          code="DE"
          lang={lang}
          currentLang={'de'}
          onClick={() => changeLanguage('de')}
        />
      </RightContainer>
    </MainContainer>
  );
};

export default SettingsBar;
