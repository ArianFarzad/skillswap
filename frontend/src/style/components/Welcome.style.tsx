import '../index.css';
import styled from 'styled-components';

export const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  color: rgb(212, 209, 209);
  align-items: center;
  flex-direction: column;
  text-align: center;
  background: rgba(255, 255, 255, 0.8);
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  height: 100vh;
  background: linear-gradient(45deg, #8d8e98, #a59793, #7b829c, #ae9f9f);
  animation: gradientAnimation 15s ease infinite;
`;

export const Headline = styled.h1`
  font-size: 3em;
  font-weight: bold;
  margin-bottom: 1em;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

export const WelcomeText = styled.p`
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 2em;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
`;
