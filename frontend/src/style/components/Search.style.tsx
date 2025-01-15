import styled from 'styled-components';
import '../index.css';

export const AllProfilesContainer = styled.div`
  background-color: var(--background-color);
  display: block;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px var(--box-shadow-color);
  width: 100%;
  height: calc(100vh - 250px);
  overflow: hidden;
`;

export const AllProfilesHeadline = styled.h2`
  color: var(--primary-color);
  font-size: 1.5rem;
  margin: 0;
  text-align: center;
`;

export const FilterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 6rem;
  margin-bottom: 1rem;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: center;
    margin-top: 8em;
    gap: 1rem;
  }
`;

export const ProfilesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin: 2rem 1rem;
  overflow-y: auto;
  max-height: calc(100vh - 300px);
  padding-bottom: 1rem;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

export const ProfileCard = styled.div`
  background-color: var(--background-color);
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px var(--box-shadow-color);
  padding: 1rem;
  text-align: center;

  @media (max-width: 767px) {
    padding: 0.5rem;
  }
`;

export const ProfileCardTitle = styled.h3`
  margin: 0;
  color: var(--primary-color);
  cursor: pointer;

  @media (max-width: 767px) {
    font-size: 1.2rem;
  }
`;

export const ProfileCardText = styled.p`
  margin: 0.5rem 0;
  color: var(--secondary-color);

  @media (max-width: 767px) {
    font-size: 0.9rem;
  }
`;

export const ProfileCardButton = styled.button`
  background-color: var(--primary-color);
  color: var(--text-color);
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color var(--button-transition);

  &:hover {
    background-color: var(--primary-color-hover);
  }

  @media (max-width: 767px) {
    padding: 8px 16px;
    font-size: 0.9rem;
  }
`;

export const KeywordInput = styled.input`
  border: var(--input-border);
  border-radius: var(--input-border-radius);
  padding: var(--input-padding);
  box-shadow: var(--input-box-shadow);
  margin-right: 1rem;
`;

export const FilterInput = styled.input`
  border: var(--input-border);
  border-radius: var(--input-border-radius);
  padding: var(--input-padding);
  box-shadow: var(--input-box-shadow);
  margin-right: 1rem;
`;
