import React from 'react';
import TranslationBar from '../components/TranslationBar';
import Intro from '../components/Intro';
import Register from '../components/Register';
import styled from 'styled-components';

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

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
