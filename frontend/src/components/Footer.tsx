import React from 'react';
import { FooterContainer, Paragraph } from '../style/components/Footer.style';

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <Paragraph>&copy; fwe ws 24/25 </Paragraph>
      <Paragraph>Bogdan Polskiy | Dias Baikenov | Yusuf Birdane | Arian Farzad</Paragraph>
    </FooterContainer>
  );
};

export default Footer;
