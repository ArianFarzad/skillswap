import React from 'react';
import SettingsBar from '../components/SettingsBar.tsx';
import Search from '../components/Search';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTypedTranslation } from '../utils/translationUtils.ts';

const SearchPage: React.FC = () => {
  const { t } = useTypedTranslation();

  return (
    <HelmetProvider>
      <>
        <Helmet>
          <title>SkillSwap - {t('search')}</title>
        </Helmet>
        <SettingsBar />
        <NavBar />
        <Search />
        <Footer />
      </>
    </HelmetProvider>
  );
};

export default SearchPage;
