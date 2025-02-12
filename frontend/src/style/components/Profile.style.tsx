import styled from 'styled-components';
import '../index.css';

export const MainContainer = styled.div`
  background-color: var(--background-color);
  padding: 2rem;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  position: relative;
  margin-top: 3em;

  @media (max-width: 768px) {
    margin-top: 15em;
  }
`;

export const ProfileHeader = styled.h1`
  color: var(--text-color);
  font-size: 2.5rem;
  text-align: left;
  margin-bottom: 2rem;
  font-weight: 700;
`;

export const ProfileImageContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

export const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--border-color);
`;

export const ProfileContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ProfileEditButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: var(--primary-color);
  color: var(--text-color-on-button);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--primary-color-hover);
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
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
`;
