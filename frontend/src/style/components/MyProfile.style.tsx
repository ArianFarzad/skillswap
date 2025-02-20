import styled from 'styled-components';

export const ProfileCard = styled.div`
  border-radius: 12px;
  padding: 1.5rem;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
`;

export const Line = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      var(--primary-color) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    transition: all 0.3s ease-in-out;
  }

  &:hover::after {
    height: 3px;
    background: linear-gradient(
      90deg,
      var(--primary-color) 0%,
      rgba(255, 255, 255, 0.2) 100%
    );
  }

  @media (max-width: 768px) {
    padding: 0.5rem 0;
    &::after {
      height: 1px;
    }
  }
`;

export const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

export const ProfileName = styled.div`
  font-weight: 600;
  color: var(--text-color);
  flex: 1;
  font-size: 2em;
`;

export const StyledInput = styled.input`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333333;
  border: none;
  outline: none;
  width: 100%;
  padding: 0.25rem 0;
  border-bottom: 2px solid #1e90ff;
`;

export const EditButton = styled.button`
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1e90ff;
  transition: color 0.3s ease;

  &:hover {
    color: #00ced1;
  }

  svg {
    font-size: 1.5rem;
  }
`;

export const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ProfilePoints = styled.div`
  font-size: 1rem;
  color: #666666;
  margin-top: 1.5em;

  span {
    font-weight: 600;
    color: #1e90ff;
  }
`;
