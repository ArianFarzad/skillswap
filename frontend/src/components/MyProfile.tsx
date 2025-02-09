import React from 'react';
import { useTypedTranslation } from '../utils/translationUtils.ts';
import Profile from '@mui/icons-material/AccountCircle';
import { IProfile } from '../models/models.ts';
import {
  Column,
  Line,
  PointsBadge,
  ProfileContainer,
  ProfileIconWrapper,
  Row,
  StyledP,
} from '../style/components/MyProfile.style';

interface MyProfileProps {
  profile: IProfile | null;
}

const MyProfile: React.FC<MyProfileProps> = ({ profile }) => {
  const { t } = useTypedTranslation();

  return (
    <ProfileContainer>
      <Row>
        <ProfileIconWrapper>
          <Profile className="profile-icon" />
        </ProfileIconWrapper>
        <Column>
          <StyledP className="profile-name">
            {profile?.name || t('loading')}
          </StyledP>
          <Line />
          <StyledP>
            {t('points')}: <PointsBadge>{profile?.points ?? 0}</PointsBadge>
          </StyledP>
        </Column>
      </Row>
    </ProfileContainer>
  );
};

export default MyProfile;
