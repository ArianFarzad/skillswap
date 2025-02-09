import styled from 'styled-components';
import '../index.css';

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 80vh;
  margin-top: 1em;
  background-color: var(--background-color);
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  width: 80%;
  overflow: hidden;
`;

export const ChatHeader = styled.div`
  padding: 1.5rem;
  background-color: var(--primary-color);
  color: var(--text-color-on-button);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  h2 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

export const MessagesContainer = styled.div`
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  scrollbar-width: thin;
  scrollbar-color: var(--primary-color) transparent;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--primary-color);
    border-radius: 4px;
  }
`;

export const MessageInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.3rem;
  padding: 1.5rem;
  background-color: var(--background-color-secondary);
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
  justify-content: center;
`;

export const MessageInputField = styled.input`
  flex: 1;
  padding: 1rem;
  border: 2px solid var(--border-color);
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    border-color: var(--primary-color);
    outline: none;
    box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.2);
  }
`;

export const SendButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 1.5rem;
  background-color: var(--primary-color);
  color: var(--text-color-on-button);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--primary-color-hover);
    transform: translateY(-1px);
  }

  svg {
    font-size: 1.2rem;
  }
`;

export const MyMessageBubble = styled.div`
  align-self: flex-end;
  background: linear-gradient(
    135deg,
    var(--primary-color),
    var(--primary-color-hover)
  );
  color: var(--text-color-on-button);
  padding: 1rem 1.5rem;
  border-radius: 20px 20px 4px 20px;
  max-width: 70%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  animation: messageAppear 0.3s ease;

  p {
    margin: 0;
    line-height: 1.4;
  }

  span {
    display: block;
    font-size: 0.8rem;
    opacity: 0.8;
    margin-top: 0.5rem;
    text-align: right;
  }

  @keyframes messageAppear {
    from {
      transform: translateY(10px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

export const TheirMessageBubble = styled.div`
  align-self: flex-start;
  background-color: var(--background-color-secondary);
  color: var(--text-color);
  padding: 1rem 1.5rem;
  border-radius: 20px 20px 20px 4px;
  max-width: 70%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  animation: messageAppear 0.3s ease;

  p {
    margin: 0;
    line-height: 1.4;
  }

  span {
    display: block;
    font-size: 0.8rem;
    color: var(--text-secondary-color);
    margin-top: 0.5rem;
    text-align: right;
  }
`;

export const ScrollToBottomButton = styled.button`
  position: fixed;
  bottom: 6rem;
  right: 2rem;
  background-color: var(--primary-color);
  color: var(--text-color-on-button);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--primary-color-hover);
    transform: translateY(-2px) scale(1.1);
  }

  svg {
    font-size: 1.2rem;
  }
`;
