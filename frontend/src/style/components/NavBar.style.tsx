import '../index.css';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavArea = styled.nav`
  background-color: var(--background-color-nav);
  display: flex;
  flex-direction: row;
  gap: 10em;
  padding: 1.5em;
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

export const FilterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  @media (max-width: 768px) {
    align-items: flex-end;
  }
`;

export const KeywordInput = styled.input`
  border: var(--input-border);
  border-radius: var(--input-border-radius);
  padding: var(--input-padding);
  margin-right: 1rem;
`;

export const FilterInput = styled.input`
  border: var(--input-border);
  border-radius: var(--input-border-radius);
  padding: var(--input-padding);
  margin-right: 1rem;
`;
