import styled from 'styled-components';
import '../index.css';

export const AllProfilesContainer = styled.div`
  background-color: var(--background-color);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  width: 300px;
  max-height: 60vh;
  position: absolute;
  right: 3.5rem;
  top: 9rem;
  z-index: 100;

  @media (max-width: 768px) {
    top: 8em;
    right: 25%;
  }
`;

export const Headline = styled.h2`
  font-size: 1.25rem;
  color: var(--text-color);
  margin: 0 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--primary-color);
`;

export const ProfileList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  max-height: 50vh;
  scrollbar-width: none;
`;

export const NoProfilesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--text-color-secondary);
  font-size: 1.2rem;
  opacity: 0.8;
  gap: 0.5rem;

  svg {
    font-size: 2.5rem;
    color: var(--text-color-muted);
  }
`;

export const ProfileListItem = styled.li`
  background-color: var(--background-color-secondary);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 0.75rem;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateX(4px);
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const ProfileListItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    margin: 0;
    font-size: 1rem;
    color: var(--text-color);
    font-weight: 600;
  }
`;

export const ProfileListItemActions = styled.div`
  display: flex;
  gap: 0.5rem;

  button {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.4rem 0.8rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: opacity 0.2s ease;
    font-size: 0.85rem;

    &:hover {
      opacity: 0.9;
    }

    &.profile-page {
      background-color: var(--secondary-color);
      color: var(--text-color);
    }

    &:not(.stats) {
      background-color: var(--primary-color);
      color: var(--text-color-on-button);
    }

    svg {
      font-size: 1rem;
    }
  }
`;
