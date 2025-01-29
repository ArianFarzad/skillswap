import styled from 'styled-components';
import '../index.css';

export const SessionContent = styled.div`
  display: flex;
  flex-direction: row;
  height: 88vh;
`;

export const CalendarContainer = styled.div`
  flex: 1;
  padding: 1em;
  overflow-y: scroll;
  scrollbar-width: none;

  &.hide {
    display: none;
  }
`;

export const FeedbackToggle = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  margin: 0;
  padding: 0;
`;

export const ChatContainer = styled.div`
  align-content: center;
  display: flex;
  justify-content: center;
  border-left: var(--box-border-left);
  flex: 1;
`;

export const ToggleButton = styled.button`
  padding: 0.75rem;
  font-size: 1rem;
  background-color: var(--primary-color);
  color: var(--text-color-on-button);
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  position: relative;

  &:hover {
    background-color: var(--primary-color-hover);
  }
`;

export const ButtonText = styled.span`
  display: inline-block;
  transform: rotate(270deg);
`;

export const FeedbackContainer = styled.div`
  flex: 1;
  padding: 2em;
  border-left: var(--box-border-left);
`;

export const EndSession = styled.div`
  background-color: #292a2d;
  height: 7vh;
  display: flex;
  flex-direction: row-reverse;
`;

export const EndSessionButton = styled.button<{ disabledStyle: boolean }>`
  background-color: ${(props) =>
    props.disabledStyle ? 'gray' : 'var(--primary-color)'};
  color: var(--text-color);
  border: none;
  cursor: pointer;
  padding: 0.75rem;
  align-self: center;
  border-radius: var(--button-border-redius);

  &:hover {
    background-color: ${(props) =>
      props.disabledStyle ? 'gray' : 'var(--primary-color-hover)'};
  }
`;

export const StyledP = styled.p`
  color: white;
`;

export const OptionP = styled.p`
  text-decoration: underline;
  cursor: pointer;
  color: white;

  &:hover {
    color: var(--primary-color-hover);
  }
`;

export const ReversedRow = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 1em;
  padding-right: 1em;
`;
