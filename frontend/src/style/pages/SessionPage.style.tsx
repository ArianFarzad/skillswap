import styled from 'styled-components';
import '../index.css';

export const SessionContent = styled.div`
  display: flex;
  flex-direction: row;
  height: 88vh;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    height: 100%;
  }
`;

export const CalendarContainer = styled.div`
  flex: 1;
  min-width: 250px;
  padding: 1em;
  overflow-y: scroll;
  scrollbar-width: none;
`;

export const ChatContainer = styled.div`
  display: flex;
  flex: 2;
  justify-content: center;
  align-content: center;
  border-left: 1px solid var(--border-color);
`;

export const FeedbackContainer = styled.div`
  flex: 1;
  min-width: 250px;
  padding: 2em;
  border-left: 1px solid var(--border-color);
`;

export const EndSession = styled.div`
  background-color: var(--background-color-secondary);
  height: 7vh;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  padding: 0 2rem;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
`;

export const EndSessionButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'disabledStyle',
})<{ disabledStyle: boolean }>`
  background-color: ${(props) =>
    props.disabledStyle ? 'gray' : 'var(--primary-color)'};
  color: var(--text-color-on-button);
  border: none;
  cursor: ${(props) => (props.disabledStyle ? 'not-allowed' : 'pointer')};
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.disabledStyle
        ? 'var(--disabled-color)'
        : 'var(--primary-color-hover)'};
  }
`;

export const FeedbackButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'displayStyle',
})<{ displayStyle: boolean }>`
  display: ${(props) => (props.displayStyle ? 'block' : 'none')};
  background-color: var(--primary-color);
  color: var(--text-color-on-button);
  border: none;
  cursor: pointer;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--primary-color-hover);
  }
`;

export const StyledP = styled.p`
  color: var(--text-color);
  margin: 0 1rem;
  font-size: 1rem;
`;

export const OptionP = styled.p`
  text-decoration: underline;
  cursor: pointer;
  color: var(--text-color);
  margin: 0 1rem;
  font-size: 1rem;
  transition: color 0.3s ease;

  &:hover {
    color: var(--primary-color-hover);
  }
`;

export const ReversedRow = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  gap: 1rem;
`;
