import React from 'react';
import {
  SpinnerContainer,
  StyledSpinner,
} from '../style/components/Spinner.style';

const Spinner: React.FC = () => {
  return (
    <SpinnerContainer>
      <StyledSpinner />
    </SpinnerContainer>
  );
};

export default Spinner;
