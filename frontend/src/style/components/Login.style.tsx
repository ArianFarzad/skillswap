import '../index.css';
import styled from 'styled-components';

export const LoginArea = styled.div`
  padding: 2rem;
  border-left: var(--box-border-left);
  flex: 1;
`;

export const Headline = styled.h1`
  text-align: left;
  margin-bottom: 1.5rem;
  color: #666;
`;

export const Paragraph = styled.p`
  text-align: center;
  margin: 0;
  color: var(--info-text-color);
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.3em;
  margin-bottom: 1em;
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

export const Label = styled.label`
  color: var(--text-color);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  width: 95%;
  padding: var(--input-padding);
  font-size: 1rem;
  margin-bottom: 1rem;
  border: var(--input-border);
  border-radius: var(--input-border-radius);
  transition: border-color 0.3s ease;
  background-color: var(--input-background);
  &:focus {
    border-color: var(--input-border-color-focus);
    box-shadow: var(--input-shadow-focus);
    outline: none;
    transition: all 0.3s ease;
  }
`;

export const StyledLink = styled.p`
  margin: 0;
  color: var(--link-color);
  text-align: right;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: var(--link-hover);
  }
`;

export const Button = styled.button`
  width: 30%;
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

export const AlignCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5em;

  * {
    cursor: pointer;
  }

  &:nth-child(1) {
    color: var(--text-color);
  }
`;
