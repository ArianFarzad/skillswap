import React, { useEffect, useRef, useState } from 'react';
import {
  ChatContent,
  Headline,
  MessageInput,
  MessagesList,
  MsgTextField,
  MyMessage,
  SendMsgBtn,
  TheirMessage,
} from '../style/components/Chat.style';
import axiosInstance from '../utils/axiosInstance';
import socket, {
  connectSocket,
  disconnectSocket,
  onNewMessage,
  sendMessage,
} from '../utils/socket';
import SendIcon from '@mui/icons-material/Send';
import loggerInstance from '../utils/loggerInstance.ts';
import { useTypedTranslation } from '../utils/translationUtils.ts';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { IMessage, IUser } from '../models/models.ts';

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
      .catch((error) =>
        loggerInstance.error('Error fetching messages:', error)
      );

    connectSocket(sessionId);

    const handleNewMessage = (message: IMessage) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      setExchangedMessagesCount((prevCount) => prevCount + 1);
    };

    // Listen for new messages
    onNewMessage(handleNewMessage);

    return () => {
      socket.off('newMessage', handleNewMessage);
      disconnectSocket(); // Disconnect from Socket.IO when component unmounts
    };
  }, [senderId, sessionId]);

  useEffect(() => {
    onMessagesCountChange(exchangedMessagesCount);
  }, [exchangedMessagesCount, onMessagesCountChange]);

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
      <Headline>
        {t('chat_with')} {otherPerson?.name}
      </Headline>
      <MessagesList
        scrollBottomShowed={showScrollToBottom}
        ref={messagesListRef}
        onScroll={handleScroll}
      >
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
          <KeyboardDoubleArrowDownIcon />
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
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
        <SendMsgBtn onClick={handleSendMessage}>
          <SendIcon />
        </SendMsgBtn>
      </MessageInput>
    </ChatContent>
  );
};

export default Chat;
