import '../index.css';
import styled from 'styled-components';

export const NavArea = styled.nav`
  background-color: var(--background-color-nav);
  display: flex;
  flex-direction: row-reverse;
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


export const FilterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: center;
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
