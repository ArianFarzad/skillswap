import React from 'react';
import TranslationBar from "../components/TranslationBar";
import Welcome from '../components/Welcome';

const WelcomePage: React.FC = () => {
    return (
        <>
            <TranslationBar />
            <Welcome />
        </>
    );
};

export default WelcomePage;
