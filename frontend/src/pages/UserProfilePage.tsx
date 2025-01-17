import React from 'react';
import TranslationBar from '../components/TranslationBar';
import Profile from '../components/Profile';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const UserProfilePage: React.FC = () => {
  return (
    <>
      <TranslationBar />
      <NavBar />
      <Profile />
      <Footer />
    </>
  );
};

export default UserProfilePage;
