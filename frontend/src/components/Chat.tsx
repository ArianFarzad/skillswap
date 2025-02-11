import React, { useEffect, useRef, useState } from 'react';
import axios from '../utils/axiosInstance';
import log from '../utils/loggerInstance.ts';
import SendIcon from '@mui/icons-material/Send';
import { useTypedTranslation } from '../utils/translationUtils.ts';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { IMessage, IUser } from '../models/models.ts';
import socket, {
  connectSocket,
  disconnectSocket,
  onNewMessage,
  sendMessage,
} from '../utils/socket';
import {
  ChatContainer,
  ChatHeader,
  MessageInputContainer,
  MessageInputField,
  MessagesContainer,
  MyMessageBubble,
  ScrollToBottomButton,
  SendButton,
  TheirMessageBubble,
} from '../style/components/Chat.style';

interface ChatParams {
  sessionId: string | undefined;
  senderId: string;
  onMessagesCountChange: (count: number) => void;
}

const Chat: React.FC<ChatParams> = ({
  sessionId,
  senderId,
  onMessagesCountChange,
}) => {
  const { t } = useTypedTranslation();

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [otherPerson, setOtherPerson] = useState<IUser | null>(null);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const [exchangedMessagesCount, setExchangedMessagesCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Fetch messages and set up socket connection
  useEffect(() => {
    if (!sessionId) return;

    // Fetch messages and other person's details
    axios
      .get(`/api/sessions/${sessionId}`)
      .then((res) => {
        setMessages(res.data.messages);
        const otherPerson =
          res.data.tutor._id === senderId ? res.data.student : res.data.tutor;
        setOtherPerson(otherPerson);
      })
      .catch((error) => log.error('Error fetching messages:', error));

    // Connect to socket
    connectSocket(sessionId);

    // Handle new messages from socket
    const handleNewMessage = (message: IMessage) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      setExchangedMessagesCount((prevCount) => prevCount + 1);
    };
    onNewMessage(handleNewMessage);

    // Cleanup socket on unmount
    return () => {
      socket.off('newMessage', handleNewMessage);
      disconnectSocket();
    };
  }, [sessionId, senderId]);

  // Notify parent component about message count changes
  useEffect(() => {
    onMessagesCountChange(exchangedMessagesCount);
  }, [exchangedMessagesCount, onMessagesCountChange]);

  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      sendMessage(sessionId!, senderId, newMessage);
      setNewMessage('');
    }
  };

  // Handle scroll events to show/hide scroll-to-bottom button
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollHeight, clientHeight, scrollTop } = e.currentTarget;
    setShowScrollToBottom(scrollHeight - clientHeight - scrollTop > 100);
  };

  return (
    <ChatContainer>
      {/* Chat Header */}
      <ChatHeader>
        <h2>{otherPerson?.name}</h2>
      </ChatHeader>

      {/* Messages List */}
      <MessagesContainer onScroll={handleScroll}>
        {messages.map((msg, index) =>
          msg.sender._id === senderId ? (
            <MyMessageBubble key={index}>
              <p>{msg.content}</p>
              <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
            </MyMessageBubble>
          ) : (
            <TheirMessageBubble key={index}>
              <p>{msg.content}</p>
              <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
            </TheirMessageBubble>
          )
        )}
        <div ref={messagesEndRef} />
      </MessagesContainer>

      {/* Scroll-to-bottom Button */}
      {showScrollToBottom && (
        <ScrollToBottomButton
          onClick={() =>
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
          }
        >
          <KeyboardDoubleArrowDownIcon />
        </ScrollToBottomButton>
      )}

      {/* Message Input Area */}
      <MessageInputContainer>
        <MessageInputField
          type="text"
          placeholder={t('type_message')}
          maxLength={2000}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
        <SendButton onClick={handleSendMessage}>
          <SendIcon />
        </SendButton>
      </MessageInputContainer>
    </ChatContainer>
  );
};

export default Chat;
