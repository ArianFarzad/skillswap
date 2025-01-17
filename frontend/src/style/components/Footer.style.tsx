import '../index.css';
import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background-color: #333;
  color: white;
  text-align: center;
  padding: 5px;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 6em;

  @media (max-width: 768px) {
    padding: 10px;
    height: auto;
  }
`;

export const Paragraph = styled.p`
  @media (max-width: 768px) {
    margin: 5px 0;
  }
`;
