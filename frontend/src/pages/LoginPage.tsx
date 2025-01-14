import React from 'react';
import TranslationBar from '../components/TranslationBar';
import Intro from '../components/Intro';
import Login from '../components/Login';
import { MainContainer } from '../style/pages/LoginPage.style';


const LoginPage: React.FC = () => {
  return (
    <>
      <TranslationBar />
      <MainContainer>
        <Intro />
        <Login />
      </MainContainer>
    </>
  );
};

export default LoginPage;
