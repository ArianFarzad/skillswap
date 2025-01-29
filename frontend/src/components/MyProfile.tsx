import React from 'react';
import {
  Headline,
  Line,
  Row,
  StyledP,
} from '../style/components/MyProfile.style';
import { useTypedTranslation } from '../utils/translationUtils.ts';

import { IProfile } from '../models/models.ts';

interface MyProfileProps {
  profile: IProfile | null;
}

const MyProfile: React.FC<MyProfileProps> = ({ profile }) => {
  const { t } = useTypedTranslation();

  return (
    <div>
      <Headline>{t('welcome')}</Headline>
      <Line></Line>
      <Row>
        <StyledP>{t('username')}</StyledP>
        <StyledP>{profile?.name || t('loading')}</StyledP>
      </Row>
      <Line></Line>
      <Row>
        <StyledP>{t('points')}</StyledP>
        <StyledP>{profile?.points ?? 0}</StyledP>
      </Row>
      <Line></Line>
    </div>
  );
};

export default MyProfile;
