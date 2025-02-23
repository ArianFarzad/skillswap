import styled, { keyframes } from 'styled-components';
import '../index.css';

export const MainContainer = styled.div`
  background-color: var(--background-color);
  padding: 2rem;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  position: relative;

  @media (max-width: 768px) {
    height: auto;
  }
`;

export const ProfileContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Section = styled.div`
  background-color: var(--background-color-secondary);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

export const SectionTitle = styled.h2`
  color: var(--text-color);
  font-size: 1.75rem;
  margin-bottom: 1rem;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SkillList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

export const SkillItem = styled.li`
  background-color: var(--primary-color);
  color: var(--text-color-on-button);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

export const InterestList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

export const InterestItem = styled.li`
  background-color: var(--secondary-color);
  color: var(--text-color-on-button);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

export const InputGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const TextInput = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 2px solid var(--border-color);
  border-radius: 12px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: var(--primary-color);
    outline: none;
  }
`;

export const AddButton = styled.button`
  background-color: var(--primary-color);
  border: none;
  border-radius: 12px;
  padding: 0.75rem 0.75rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--primary-color-hover);
  }

  svg {
    color: var(--text-color-on-button);
  }
`;

export const RemoveButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;

  svg {
    color: var(--text-color-on-button);
    transition: color 0.3s ease;
  }

  &:hover svg {
    color: var(--error-color);
  }
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

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1rem;
  flex: 1;
`;

export const ClearButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;

  svg {
    color: var(--text-color-secondary);
    font-size: 1.2rem;
    transition: color 0.3s ease;
  }

  &:hover svg {
    color: var(--error-color);
  }

  &:focus {
    outline: none;
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const StyledSection = styled(Section)`
  position: relative;
  overflow: hidden;
  border-left: 4px solid var(--primary-color);
  transition: all 0.3s ease;
  background: linear-gradient(
    135deg,
    var(--background-color-secondary) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
`;

export const QuoteIcon = styled.div`
  position: absolute;
  opacity: 0.1;
  font-size: 6rem;
  color: var(--primary-color);

  &:first-child {
    top: -10px;
    left: 10px;
  }

  &:last-child {
    bottom: -20px;
    right: 10px;
    transform: rotate(180deg);
  }
`;

export const AboutMeText = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-color);
  font-family: 'Merriweather', serif;
  position: relative;
  padding: 1rem 2rem;
  white-space: pre-wrap;
  animation: ${fadeIn} 0.5s ease;

  &::first-letter {
    font-size: 2.5em;
    float: left;
    line-height: 0.8;
    margin-right: 0.1em;
    color: var(--primary-color);
    font-weight: bold;
  }
`;

export const StyledTextArea = styled(TextInput)`
  min-height: 150px;
  padding: 1.5rem;
  font-size: 1.1rem;
  line-height: 1.8;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid var(--primary-color);
  transition: all 0.3s ease;
  resize: vertical;
  scrollbar-width: none;
  min-width: 85%;

  &:focus {
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 0 15px rgba(30, 144, 255, 0.2);
  }
`;

export const FloatingEditButton = styled(EditButton)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--primary-color);
  color: white;
  border-radius: 50%;
  padding: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  z-index: 2;

  &:hover {
    transform: scale(1.1) rotate(90deg);
    background: var(--primary-color-hover);
  }

  svg {
    font-size: 1.2rem;
  }
`;

export const ProfileImageContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 1.5rem;
  border-radius: 50%;
  width: 100%;
`;

export const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  background: var(--background-color-secondary);
  border: 4px solid white;
`;

export const ProfileEditLabel = styled.label<{ showMenu: boolean }>`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: ${(props) =>
    props.showMenu ? 'rgba(255, 69, 0, 0.15)' : 'rgba(30, 144, 255, 0.2)'};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: ${(props) =>
    props.showMenu
      ? '2px solid var(--error-color)'
      : '2px solid var(--primary-color)'};

  #clear-icon {
    color: var(--error-color);
  }

  &:hover {
    background: ${(props) =>
      props.showMenu ? 'var(--error-color)' : 'var(--primary-color)'};

    svg {
      color: white;
    }

    #clear-icon {
      color: white;
    }
  }

  svg {
    color: var(--primary-color);
    font-size: 1.4rem;
  }
`;

export const FloatingMenu = styled.div`
  bottom: 60px;
  background: var(--background-color);
  border-radius: 12px;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 10;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border-color);
  margin-top: 1rem;
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const FloatingMenuItem = styled.div`
  padding: 0.75rem 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--text-color);
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--text-color);
    color: var(--background-color);
    cursor: pointer;
  }

  svg {
    font-size: 1.2rem;
    color: var(--text-color-secondary);
  }
`;

export const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  width: 100%;
`;
