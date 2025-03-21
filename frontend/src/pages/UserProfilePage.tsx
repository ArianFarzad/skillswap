import React, { useEffect, useState } from 'react';
import SettingsBar from '../components/SettingsBar.tsx';
import Profile from '../components/Profile';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTypedTranslation } from '../utils/translationUtils.ts';
import { showToast } from '../utils/toastUtils.ts';
import axios from '../utils/axiosInstance.ts';
import { IProfile } from '../models/models.ts';
import Spinner from '../components/Spinner.tsx';
import MySessions from '../components/MySessions';
import { Row } from '../style/pages/UserProfilePage.style';

const UserProfilePage: React.FC = () => {
  const { t } = useTypedTranslation();
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/profiles');
        setProfile(response.data);
      } catch (error) {
        showToast('error', error, t);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile().catch((error) => showToast('error', error, t));
  }, [t]);

  return (
    <HelmetProvider>
      <>
        <Helmet>
          <title>SkillSwap - {t('user_profile')}</title>
        </Helmet>
        <SettingsBar profile={profile} />
        {loading ? (
          <Spinner />
        ) : (
          <>
            <NavBar />
            <Row>
              <Profile profile={profile} setProfile={setProfile} />
              <MySessions />
            </Row>
            <Footer />
          </>
        )}
      </>
    </HelmetProvider>
  );
};

export default UserProfilePage;
