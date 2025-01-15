import React from 'react';
import TranslationBar from '../components/TranslationBar';
import Search from '../components/Search';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const SearchPage: React.FC = () => {
  return (
    <>
      <TranslationBar />
      <NavBar />
      <Search />
      <Footer />
    </>
  );
};

export default SearchPage;
