import React from 'react';
import logo from '../assets/logo.png';
import {
  InfoMessage,
  InfoText,
  StyledImage,
} from '../style/components/Intro.style';
import { useTypedTranslation } from '../utils/translationUtils.ts';

const Intro: React.FC = () => {
  const { t } = useTypedTranslation();

  return (
    <InfoMessage>
      <StyledImage src={logo} height={500} width={500} alt="" />
      <InfoText>{t('intro_message')}</InfoText>
    </InfoMessage>
  );
};

export default Intro;
