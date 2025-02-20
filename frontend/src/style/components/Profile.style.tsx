import styled from 'styled-components';
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

export const ProfileImageSection = styled.div`
  background-color: var(--background-color-secondary);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-radius: 12px;
`;

export const ProfileImageContainer = styled.div`
  position: relative;
  display: flex;
  margin-bottom: 1rem;
`;

export const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--border-color);
`;

export const ProfileEditLabel = styled.label`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: var(--primary-color);
  color: var(--text-color-on-button);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: var(--primary-color-hover);
  }

  input {
    display: none;
  }

  svg {
    font-size: 1.2rem;
  }
`;

export const FloatingMenu = styled.div`
  position: absolute;
  bottom: 40px;
  right: 20px;
  background: var(--background-color-secondary);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 10;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeIn 0.3s ease-in-out forwards;

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const FloatingMenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  cursor: pointer;
  transition: background 0.2s ease;
  border-radius: 6px;

  &:hover {
    background: var(--primary-color-hover);
  }

  label {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  input {
    display: none;
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
  justify-content: space-between;
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
