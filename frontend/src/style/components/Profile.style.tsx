import '../index.css';
import styled from 'styled-components';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px var(--box-shadow-color);
  background-color: var(--background-color);
  margin: 0;
  padding-top: 4em;
  height: 100vh;

  @media (max-width: 768px) {
    margin-top: 2em;
    height: auto;
  }
`;

export const Headline = styled.h2`
  border-radius: 7px;
  color: var(--primary-color);
  width: 100%;
  padding: 1em 0;
  text-align: center;
  margin: 0;
`;

export const FormArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 3rem;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Headline2 = styled.h3`
  text-align: left;
  margin: 0;
  border-bottom: var(--secondary-color) 1px solid;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: auto;
`;

export const Input = styled.input`
  padding: 0.75rem;
  font-size: 1rem;
  border: none;
  border-bottom: 2px solid #ccc;
  transition: border-color 0.3s ease;
  border-radius: 5px 0 0 5px;

  &:focus {
    border: none;
    outline: none;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const Button = styled.button`
  padding: 0.75rem;
  font-size: 1rem;
  background-color: var(--primary-color);
  color: var(--text-color);
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 0 5px 5px 0;

  &:hover {
    background-color: var(--primary-color-hover);
  }
`;

export const RemoveButton = styled.button`
  border-radius: 0 5px 5px 0;
  background-color: var(--primary-color);
  border: none;
`;

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: var(--background-color-secondary);
  border-radius: 5px 0 0 5px;
`;

export const List = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Item = styled.p`
  padding-left: 0.8em;
  text-decoration: none;
`;
