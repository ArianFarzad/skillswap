import React from "react";
import TranslationBar from "../components/TranslationBar";
import Intro from "../components/Intro";
import Login from "../components/Login";
import "../style/index.css";
import styled from "styled-components";

const MainContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: var(--background-color);
`;


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
