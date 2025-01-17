import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ChatContent,
  MessageInput,
  MessagesList,
  MsgTextField,
  MyMessage,
  SendMsgBtn,
  TheirMessage,
} from '../style/components/Chat.style';
import { IMessage } from '../models/Message';
import { IUser } from '../models/User';
import axiosInstance from '../utils/axiosInstance';
import socket, {
  connectSocket,
  disconnectSocket,
  onNewMessage,
  sendMessage,
} from '../utils/socket';
import SendIcon from '@mui/icons-material/Send';

interface ChatParams {
  sessionId: string | undefined;
  senderId: string;
}

const Chat: React.FC<ChatParams> = ({ sessionId, senderId }) => {
  const {
    t,
  }: {
    t: (key: keyof typeof import('../../public/locales/en.json')) => string;
  } = useTranslation();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [otherPerson, setOtherPerson] = useState<IUser | null>(null);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const messagesListRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!sessionId) return;
    // Fetch Messages
    axiosInstance
      .get(`/api/sessions/${sessionId}`)
      .then((res) => {
        setMessages(res.data.messages);

        const otherPerson =
          res.data.tutor._id === senderId ? res.data.student : res.data.tutor;
        setOtherPerson(otherPerson);
      })
      .catch((error) => console.error('Error fetching messages:', error));

    connectSocket(sessionId);

    const handleNewMessage = (message: IMessage) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    // Listen for new messages
    onNewMessage(handleNewMessage);

    return () => {
      socket.off('newMessage', handleNewMessage);
      disconnectSocket(); // Disconnect from Socket.IO when component unmounts
    };
  }, [senderId, sessionId]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Notify other clients in real time via Socket.IO
      sendMessage(sessionId!, senderId, newMessage);
      setNewMessage('');
    }
  };

  const handleScroll = () => {
    if (messagesListRef.current) {
      const { scrollHeight, clientHeight, scrollTop } = messagesListRef.current;
      setShowScrollToBottom(scrollHeight - clientHeight - scrollTop > 100);
    }
  };

  return (
    <ChatContent>
      <h2>
        {t('chat_with')} {otherPerson?.name}
      </h2>
      <MessagesList ref={messagesListRef} onScroll={handleScroll}>
        {messages.map((msg, index) => {
          const isMyMessage = msg.sender._id === senderId;
          return isMyMessage ? (
            <MyMessage key={index}>
              <p>
                <strong>{msg.sender.name}:</strong> {msg.content}
              </p>
              <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
            </MyMessage>
          ) : (
            <TheirMessage key={index}>
              <p>
                <strong>{msg.sender.name}:</strong> {msg.content}
              </p>
              <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
            </TheirMessage>
          );
        })}
        <div ref={messagesEndRef}></div>
      </MessagesList>
      {showScrollToBottom && (
        <button
          className="scroll-to-bottom-btn"
          onClick={() =>
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
          }
        >
          ▼▼
        </button>
      )}
      <MessageInput>
        <MsgTextField
          type="text"
          placeholder={t('type_message')}
          value={newMessage}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewMessage(e.target.value)
          }
        />
        <SendMsgBtn onClick={handleSendMessage}>
          <SendIcon />
        </SendMsgBtn>
      </MessageInput>
    </ChatContent>
  );
};

export default Chat;
