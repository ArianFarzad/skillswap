import styled from 'styled-components';
import Flag from 'react-world-flags';

export const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--background-color-secondary);
  padding: 0.5rem 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

export const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const RightContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const ProfilePictureSmall = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--border-color);
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

export const Label = styled.label`
  cursor: pointer;
  background-color: var(--primary-color);
  padding: 0.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--primary-color-hover);
  }

  svg {
    color: var(--text-color-on-button);
    font-size: 1.5rem;
  }
`;

export const StyledInput = styled.input`
  display: none;
`;

export const StyledFlag = styled(Flag).withConfig({
  shouldForwardProp: (prop) => !['lang', 'currentLang'].includes(prop),
})<{ lang: string; currentLang: string }>`
  border: none;
  color: #333;
  font-size: 1em;
  height: 2em;
  width: 2em;
  cursor: pointer;
  border-radius: 8px;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  transform: ${(props) =>
    props.lang === props.currentLang ? 'scale(1.2)' : 'scale(1)'};
  box-shadow: ${(props) =>
    props.lang === props.currentLang ? '0 0 8px rgba(0, 0, 0, 0.3)' : 'none'};

  &:hover {
    transform: scale(1.2);
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  }
`;

export const StyledButton = styled.button`
  background-color: var(--primary-color);
  color: var(--text-color-on-button);
  border: none;
  padding: 0.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--primary-color-hover);
  }

  svg {
    font-size: 1.5rem;
  }
`;
