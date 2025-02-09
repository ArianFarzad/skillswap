import styled from 'styled-components';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;

  @media (max-width: 767px) {
    & > :first-child {
      display: none;
    }
  }
`;
