import '../index.css';
import styled from 'styled-components';

export const RegisterArea = styled.div`
  width: 100%;
  padding: 2rem;
  border-left: 2px solid #5e5e63;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: var(--background-color);
  height: inherit;
  flex: 1;
`;

export const Headline = styled.h1`
  text-align: left;
  margin-bottom: 1.5rem;
  color: #666;
`;

export const Paragraph = styled.p`
  text-align: center;
  margin-bottom: 1.5rem;
  color: #666;
`;

export const Input = styled.input`
  padding: var(--input-padding);
  font-size: 1rem;
  margin-bottom: 1rem;
  border: var(--input-border);
  border-radius: var(--input-border-radius);
  width: 93%;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: var(--input-border-color-focus);
    box-shadow: var(--input-shadow-focus);
    outline: none;
    transition: all 0.3s ease;
  }
`;

export const Label = styled.label`
  font-size: 1rem;
  color: var(--text-color);
`;

export const Button = styled.button`
  width: 40%;
  padding: 0.75rem;
  font-size: 1rem;
  background-color: var(--primary-color);
  color: var(--text-color-on-button);
  border: none;
  border-radius: var(--input-border-radius);
  cursor: pointer;
  transition: var(--button-transition);

  &:hover {
    background-color: var(--primary-color-hover);
  }
`;

export const RegisterMessage = styled.p`
  color: var(--link-color);
  text-align: right;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: var(--link-hover);
  }
`;

export const RowLeft = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.3em;
`;

export const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3em;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

export const SpaceBetween = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0;
  align-content: center;
`;
