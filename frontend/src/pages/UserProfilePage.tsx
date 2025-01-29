import React, { useEffect, useState } from 'react';
import SettingsBar from '../components/SettingsBar.tsx';
import Profile from '../components/Profile';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import MyProfile from '../components/MyProfile.tsx';
import { Row } from '../style/pages/UserProfilePage.style';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTypedTranslation } from '../utils/translationUtils.ts';
import { showToastError } from '../utils/toastUtils.ts';
import loggerInstance from '../utils/loggerInstance.ts';
import axiosInstance from '../utils/axiosInstance.ts';
import { IProfile } from '../models/models.ts';

const UserProfilePage: React.FC = () => {
  const { t } = useTypedTranslation();
  const [profile, setProfile] = useState<IProfile | null>(null);
  // const [loading, setLoading] = useState(true); TODO - implement loading spinner, yb

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get('/api/profiles');
        setProfile(response.data);
        loggerInstance.info('Profile fetched successfully:', response.data);
      } catch (error) {
        showToastError(error, t);
      } finally {
        // setLoading(false);
      }
    };

    fetchProfile().catch((error) =>
      loggerInstance.error('Error fetching profile:', error)
    );
  }, [t]);

  return (
    <HelmetProvider>
      <>
        <Helmet>
          <title>SkillSwap - {t('user_profile')}</title>
        </Helmet>
        <SettingsBar />
        <NavBar />
        <Row>
          <MyProfile profile={profile} />
          <Profile profile={profile} setProfile={setProfile} />
        </Row>
        <Footer />
      </>
    </HelmetProvider>
  );
};

export default UserProfilePage;
