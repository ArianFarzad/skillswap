import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { useTypedTranslation } from '../utils/translationUtils.ts';
import Profile from '../components/Profile';
import NavBar from '../components/NavBar';
import SettingsBar from '../components/SettingsBar';
import { IProfile } from '../models/models.ts';
import { showToast } from '../utils/toastUtils.ts';
import Footer from '../components/Footer.tsx';

const OtherUserProfilePage: React.FC = () => {
  const { profileId } = useParams<{ profileId: string }>();
  const { t } = useTypedTranslation();
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [ownProfile, setOwnProfile] = useState<IProfile | null>(null);

  const fetchProfile = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/api/profiles/${profileId}`);
      setProfile(response.data);
    } catch (error) {
      showToast('error', error, t);
    }
  }, [profileId, t]);

  const fetchOwnProfile = useCallback(async () => {
    try {
      const response = await axiosInstance.get('/api/profiles');
      setOwnProfile(response.data);
    } catch (error) {
      showToast('error', error, t);
    }
  }, [t]);

  useEffect(() => {
    if (profileId)
      fetchProfile().catch((error) => showToast('error', error, t));

    fetchOwnProfile().catch((error) => showToast('error', error, t));
  }, [profileId, fetchProfile, t, fetchOwnProfile]);

  return (
    <div>
      <SettingsBar profile={ownProfile} />
      <NavBar />
      {profile && <Profile profile={profile} setProfile={setProfile} />}
      <Footer />
    </div>
  );
};

export default OtherUserProfilePage;
