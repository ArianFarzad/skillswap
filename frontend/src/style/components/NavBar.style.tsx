import '../index.css';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import banner from '../../assets/banner.png';

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
    text-decoration: none;
    font-size: 1.3em;
    color: black;

    &:hover {
        color: var(--primary-color);
    }

    @media (max-width: 768px) {
        font-size: 1em;
    }
`;

export const Logout = styled.p`
  margin: auto 0;
  font-size: 1.3em;

  &:hover {
    color: var(--primary-color);
    cursor: pointer;
  }

  @media (max-width: 768px) {
    font-size: 1em;
  }
`;
