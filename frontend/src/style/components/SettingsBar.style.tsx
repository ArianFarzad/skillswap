import styled from 'styled-components';
import Flag from 'react-world-flags';

export const RightContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 0.4em 0.8em 0.4em 0;
`;

export const LeftContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

export const BackspaceButton = styled.button`
  cursor: pointer;
  margin-left: 1em;
  background-color: var(--primary-color);
  padding: 0.3em 0.5em;
  border-radius: var(--button-border-redius);
  display: flex;
  align-items: center;

  &:hover {
    background-color: var(--primary-color-hover);
  }
`;

export const Label = styled.label`
  cursor: pointer;
  margin-left: 1em;
  background-color: var(--primary-color);
  padding: 0.3em 0.5em;
  border-radius: var(--button-border-redius);
  display: flex;
  align-items: center;

  &:hover {
    background-color: var(--primary-color-hover);
  }
`;

export const StyledInput = styled.input`
  display: none;
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: var(--bar-color);
`;

export const StyledFlag = styled(Flag).withConfig({
  shouldForwardProp: (prop) => !['lang', 'currentLang'].includes(prop),
})<{ lang: string; currentLang: string }>`
  border: none;
  color: #333;
  font-size: 1em;
  height: 2em;
  width: 2em;
  margin: 0 0.5em;
  cursor: pointer;
  border-radius: var(--button-border-redius);
  transform: ${(props) =>
    props.lang === props.currentLang ? 'scale(1.2)' : 'none'};
`;
