import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
`;


export const ProfileCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.1),
    0 0 20px rgba(255, 255, 255, 0.1) inset;
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow:
      0 12px 40px rgba(0, 0, 0, 0.2),
      0 0 30px rgba(255, 255, 255, 0.15) inset;
  }
`;

export const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  position: relative;
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      rgba(30, 144, 255, 0) 0%,
      var(--primary-color) 50%,
      rgba(30, 144, 255, 0) 100%
    );
    opacity: 0.3;
    transition: all 0.3s ease;
  }

  &:hover::after {
    opacity: 1;
    height: 3px;
  }
`;

export const ProfileName = styled.div`
  font-weight: 700;
  color: var(--text-color);
  font-size: 1.8rem;
  letter-spacing: -0.5px;
  position: relative;
  overflow: hidden;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const inputFloat = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-2px); }
  100% { transform: translateY(0); }
`;

export const StyledInput = styled.input`
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-color);
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 10px;
  padding: 0.8rem 1.2rem;
  width: 100%;
  transition: all 0.3s ease;
  box-shadow: 0 0 0 2px transparent;

  &:focus {
    outline: none;
    box-shadow:
      0 0 0 2px var(--primary-color),
      0 0 20px rgba(30, 144, 255, 0.2);
    animation: ${inputFloat} 1.5s ease-in-out infinite;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const buttonHover = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

export const EditButton = styled.button`
  background: rgba(30, 144, 255, 0.2);
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
  padding: 0.6rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      45deg,
      transparent 0%,
      rgba(255, 255, 255, 0.1) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    background: rgba(30, 144, 255, 0.3);
    animation: ${buttonHover} 0.6s ease;

    &::before {
      opacity: 1;
    }
  }

  svg {
    font-size: 1.4rem;
    transition: transform 0.3s ease;
  }
`;

export const CancelButton = styled(EditButton)`
  background: rgba(255, 69, 0, 0.15);
  border-color: var(--error-color);
  color: var(--error-color);

  &:hover {
    background: rgba(255, 69, 0, 0.25);
  }
`;

export const ProfilePoints = styled.div`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem 1.5rem;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 15px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      45deg,
      transparent 0%,
      rgba(255, 255, 255, 0.05) 100%
    );
    pointer-events: none;
  }

  span {
    font-weight: 700;
    color: var(--primary-color);
    position: relative;
    padding: 0.3rem 0.8rem;
    border-radius: 8px;
    background: rgba(30, 144, 255, 0.15);
    animation: ${float} 3s ease-in-out infinite;
  }
`;