import '../index.css';
import styled from 'styled-components';

export const LoginArea = styled.div`
  padding: 2rem;
  border-left: var(--box-border-left);
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
  box-shadow: var(--input-box-shadow);
  transition: border-color 0.3s ease;
  &:focus {
    border: var(--input-border-focus);
    outline: none;
  }
`;

export const LoginMessage = styled.p`
  margin-top: 1rem;
  color: blue;
  text-align: right;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: var(--link-hover);
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: var(--button-border-redius);
  cursor: pointer;
  transition: var(--button-transition);

  &:hover {
    background-color: var(--primary-color-hover);
  }
`;
