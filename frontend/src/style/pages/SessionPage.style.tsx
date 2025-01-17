import styled from 'styled-components';

export const SessionContent = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

export const CalendarContainer = styled.div`
  flex: 1;
  padding: 1em;
  overflow-y: scroll;

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
  flex: 1;
  padding: 1em;
  border-left: var(--box-border-left);
  display: flex;
  flex-direction: row;
`;

export const ToggleButton = styled.button`
  padding: 0.75rem;
  font-size: 1rem;
  background-color: var(--primary-color);
  color: var(--text-color);
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