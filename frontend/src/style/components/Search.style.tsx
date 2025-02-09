import styled from 'styled-components';
import '../index.css';

export const AllProfilesContainer = styled.div`
  background-color: var(--background-color);
  display: block;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  width: 45%;
  height: 25em;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  position: absolute;
  right: 2em;
  top: 11em;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    top: 60%;
    width: 30%;
    height: 15em;
  }
`;

export const Headline = styled.h1`
  font-size: 2rem;
  color: var(--text-color);
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const ProfileList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow-y: scroll;
  scrollbar-width: none;
  height: 22em;

  @media (max-width: 768px) {
    height: 12em;
  }
`;

export const ProfileListItem = styled.li`
  background-color: var(--background-color-secondary);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }
`;

export const ProfileListItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  h3 {
    margin: 0;
    color: var(--text-color);
    font-size: 1.75rem;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    h3 {
      font-size: 1rem;
    }
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }
`;

export const ProfileListItemContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  flex-direction: column;
`;

export const ProfileListItemDetails = styled.div`
  flex: 1;

  div {
    margin-bottom: 0.5rem;

    strong {
      color: var(--text-color);
      font-weight: 500;
    }

    span {
      color: var(--link-color);
      cursor: pointer;
      transition: color 0.3s ease;

      &:hover {
        color: var(--link-hover);
      }
    }
  }
`;

export const ProfileListItemActions = styled.div`
  button {
    background-color: var(--primary-color);
    color: var(--text-color-on-button);
    border: none;
    border-radius: 12px;
    padding: 0.75rem 1.5rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
      background-color: var(--primary-color-hover);
    }

    svg {
      color: var(--text-color-on-button);
    }
  }
`;

export const UserPoints = styled.p`
  color: var(--text-color);
  margin: 0;
  font-weight: bold;
  font-size: 1.2rem;
`;
