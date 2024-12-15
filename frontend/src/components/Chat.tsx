import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import { useTranslation } from 'react-i18next';

const socket = io('http://localhost:8000');

interface Message {
  sender: string;
  receiver: string;
  content: string;
  timestamp: string;
}

const Chat: React.FC = () => {
  const { t } = useTranslation();
  const { userId } = useParams<{ userId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const senderId = localStorage.getItem('userId') || '';

  useEffect(() => {
    // Chatraum beitreten
    socket.emit('join', senderId);

    // Nachrichtenverlauf abrufen
    fetch(`http://localhost:8000/api/messages/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => setMessages(data))
      .catch((error) => console.error('Error fetching messages:', error));

    // Eingehende Nachrichten empfangen
    socket.on('receiveMessage', (message: Message) => {
      if (
        (message.sender === userId && message.receiver === senderId) ||
        (message.sender === senderId && message.receiver === userId)
      ) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [userId, senderId]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      socket.emit('sendMessage', {
        senderId,
        receiverId: userId,
        content: newMessage,
      });
      setNewMessage('');
    }
  };

  return (
    <div className="chat-container">
      <h2>
        {t('chat_with')} {userId}
      </h2>
      <div className="messages-list">
        {Array.isArray(messages) && messages.map((msg, index) => (
          <div
            key={index}
            className={msg.sender === senderId ? 'my-message' : 'their-message'}
          >
            <p>{msg.content}</p>
            <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          placeholder={t('type_message')}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>{t('send')}</button>
      </div>
    </div>
  );
};

export default Chat;