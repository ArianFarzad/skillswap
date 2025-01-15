import React from 'react';
import TranslationBar from '../components/TranslationBar';
import Intro from '../components/Intro';
import Register from '../components/Register';
import { MainContainer } from '../style/pages/RegisterPage.style';

const RegisterPage: React.FC = () => {
  return (
    <>
      <TranslationBar />
      <MainContainer>
        <Intro />
        <Register />
      </MainContainer>
    </>
  );
};

export default RegisterPage;
