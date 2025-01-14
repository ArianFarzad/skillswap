import styled from 'styled-components';

export const TranslationBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 0 20px;
  background-color: #292a2d;
  padding: 0.4em 0.8em 0.4em 0;
`;

export const LangButton = styled.button`
    background-color: transparent;
    border: none;
    color: white;
    font-size: 1em;
    margin: 0 0.5em;
    cursor: pointer;

    &.selected {
        background: #9c9ca9;
        border-radius: 0.2em;
    }
`;