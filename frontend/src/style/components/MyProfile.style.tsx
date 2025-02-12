import styled from 'styled-components';

export const ProfileContainer = styled.div`
  background-color: var(--background-color);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  width: 100%;
  max-width: 400px;
  margin-left: 1em;
  margin-top: 1em;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    margin-top: 0;
  }
`;

export const Row = styled.div<{ $pointsContainer: boolean }>`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  justify-content: ${(props) =>
    props.$pointsContainer ? 'space-between' : 'center'};
  padding: 0;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const StyledP = styled.p`
  font-size: 1rem;
  color: var(--text-color);
  margin: 0;

  &.profile-name {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--primary-color);
  }
`;

export const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--border-color);
  margin: 0.5rem 0;
`;

export const ProfileIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-color);
  border-radius: 50%;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  .profile-icon {
    color: var(--text-color-on-button);
    scale: 2;
  }
`;

export const PointsBadge = styled.span`
  display: inline-block;
  background-color: var(--secondary-color);
  color: var(--text-color-on-button);
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.9rem;
`;

export const EditButton = styled.button`
  background-color: var(--primary-color);
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 50%;
  scale: 0.8;

  &:hover {
    background-color: var(--primary-color-hover);
  }

  svg {
    color: var(--text-color-on-button);
  }
`;

export const StyledInput = styled.input<{ $onedit: boolean }>`
  background-color: var(--background-color);
  border: ${(props) => (props.$onedit ? '1px solid black' : 'none')};
  border-radius: 8px;
  color: var(--text-color);
  font-size: 1rem;
  width: 100%;
  margin: 0.5rem 0;
  padding: ${(props) => (props.$onedit ? '0.5rem' : '0')};
`;
