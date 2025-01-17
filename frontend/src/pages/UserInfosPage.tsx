import React from 'react';
import TranslationBar from '../components/TranslationBar';
import UserInfos from '../components/UserInfos';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const UserInfosPage: React.FC = () => {
  return (
    <>
      <TranslationBar />
      <NavBar />
      <UserInfos />
      <Footer />
    </>
  );
};

export default UserInfosPage;
