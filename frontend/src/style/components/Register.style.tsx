import '../index.css';
import styled from 'styled-components';

export const RegisterArea = styled.div`
  width: 100%;
  height: 100vh;
  padding: 2rem;
  border-left: 2px solid #5e5e63;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: var(--background-color);
  height: 83vh;
  flex: 1;
`;

export const Headline = styled.h1`
  text-align: center;
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
  box-shadow: var(--input-box-shadow);
  transition: border-color 0.3s ease;

  &:focus {
    border: var(--input-border-focus);
    outline: none;
  }
`;

export const Label = styled.label`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: var(--text-color);
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--button-border-redius);
  cursor: pointer;
  transition: var(--button-transition);

  &:hover {
    background-color: var(--primary-color-hover);
  }
`;

export const RegisterMessage = styled.p`
  color: blue;
  text-align: right;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: var(--link-hover);
  }
`;
