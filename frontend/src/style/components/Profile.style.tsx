import styled from 'styled-components';
import '../index.css';

export const MainContainer = styled.div`
  background-color: var(--background-color);
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  max-width: 40%;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  position: relative;
  left: 0.5em;
  scale: 0.85;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    max-width: 35%;
  }
`;

export const ProfileHeader = styled.h1`
  color: var(--text-color);
  font-size: 2.5rem;
  text-align: left;
  margin-bottom: 2rem;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
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

  @media (max-width: 768px) {
    font-size: 1rem;
    flex-direction: column;
    justify-content: flex-start;
  }
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

  @media (max-width: 768px) {
    font-size: 0.7rem;
    padding: 0.1rem 0.3rem;
    gap: 0.1rem;
  }
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

  @media (max-width: 768px) {
    font-size: 0.7rem;
    padding: 0.1rem 0.3rem;
    gap: 0.1rem;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  gap: 0.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    font-size: 0.1rem;

    * {
      font-size: 1rem;
    }
  }
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
  padding: 0.75rem 1rem;
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

  @media (max-width: 768px) {
    scale: 0.7;
  }
`;

export const EditButton = styled.button`
  background-color: var(--primary-color);
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 50%;
  font-size: 0.3em;

  &:hover {
    background-color: var(--primary-color-hover);
  }

  svg {
    color: var(--text-color-on-button);
  }

  @media (max-width: 768px) {
    &:first-child {
      scale: 0.7;
    }
  }
`;
