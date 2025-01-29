import '../index.css';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import banner from '../../assets/banner2.png';

export const Banner = styled.div`
  background-image: url(${banner});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 30vh;
  max-height: 50vh;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NavArea = styled.nav`
  background-color: var(--background-color-nav);
  display: flex;
  flex-direction: row;
  gap: 10em;
  padding: 1.5em;
  margin-top: 16em;
  width: 100%;
  justify-content: space-between;
  height: 2em;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2em;
    padding: 1em;
    margin-bottom: 4em;
  }
`;

export const ListArea = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  list-style: none;
  gap: 4em;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1em;
  }
`;

export const StyledLink = styled(Link)`
  display: flex;
  text-decoration: none;
  font-size: 1.3em;
  align-content: center;
  color: var(--text-color);

  &:hover {
    background-color: var(--primary-color);
    color: var(--text-color-on-button);
    border-radius: 0.5em;
    padding: 0.5em;
    transition: background-color 0.5s ease;
  }

  @media (max-width: 768px) {
    font-size: 1em;
  }
`;

export const Logout = styled.p`
  margin: auto 0;
  font-size: 1.3em;
  color: var(--text-color);
  display: flex;
  align-content: center;

  &:hover {
    color: darkred;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    font-size: 1em;
  }
`;
