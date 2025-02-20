import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const SessionsContainer = styled.div`
  background-color: var(--background-color-secondary);
  padding: 1.5rem;
  margin-top: 2rem;
  margin-right: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  height: 87vh;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

export const SessionTitle = styled.h1`
  color: var(--text-color);
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
  text-align: center;
  position: relative;
  &:after {
    content: '';
    display: block;
    width: 60px;
    height: 4px;
    background: var(--primary-color);
    margin: 10px auto 0;
    border-radius: 2px;
  }
`;

export const SessionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: 70vh;
  overflow-y: auto;
  scrollbar-width: none;
`;

export const SessionItem = styled.div`
  background-color: var(--background-color);
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

export const SessionDetail = styled.p`
  color: var(--text-color);
  font-size: 1rem;
  margin: 0;
  strong {
    color: var(--primary-color);
    font-weight: 600;
  }
`;

export const NoSessionsMessage = styled.p`
  color: var(--text-color);
  font-size: 1.25rem;
  text-align: center;
  margin-top: 2rem;
  opacity: 0.7;
`;

export const Button = styled.button`
  background-color: var(--primary-color);
  color: var(--text-color-on-button);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--primary-color-hover);
  }
`;
