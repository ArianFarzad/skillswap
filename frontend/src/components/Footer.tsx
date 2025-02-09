import React from 'react';
import {
  FooterContainer,
  ContentWrapper,
  CopyrightText,
  TeamList,
  TeamMember,
  Divider,
  FooterLink,
} from '../style/components/Footer.style';

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <ContentWrapper>
        <CopyrightText>© FWE WS 24/25</CopyrightText>

        <Divider />

        <TeamList>
          <TeamMember>
            <FooterLink href="#" target="_blank">
              Bogdan Polskiy
            </FooterLink>
          </TeamMember>
          <TeamMember>
            <FooterLink href="#" target="_blank">
              Dias Baikenov
            </FooterLink>
          </TeamMember>
          <TeamMember>
            <FooterLink href="#" target="_blank">
              Yusuf Birdane
            </FooterLink>
          </TeamMember>
          <TeamMember>
            <FooterLink href="#" target="_blank">
              Arian Farzad
            </FooterLink>
          </TeamMember>
        </TeamList>
      </ContentWrapper>
    </FooterContainer>
  );
};

export default Footer;
