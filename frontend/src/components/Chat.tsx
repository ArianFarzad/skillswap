import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

interface Message {
  sender: {
    _id: string;
    name: string;
  };
  content: string;
  timestamp: string;
}

const Chat: React.FC = () => {
  const { t } = useTranslation();
  const { sessionId } = useParams<{ sessionId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const senderId = localStorage.getItem('myUserId') || '';

  useEffect(() => {
    // Fetch messages for the session
    axios
      .get(`http://localhost:8000/api/sessions/${sessionId}/messages`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setMessages(res.data);
      })
      .catch((error) => {
        console.error('Error fetching messages:', error);
      });
  }, [sessionId]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      axios
        .post(
          `http://localhost:8000/api/sessions/${sessionId}/messages`,
          {
            content: newMessage,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        .then((res) => {
          setMessages((prevMessages) => [...prevMessages, res.data]);
          setNewMessage('');
        })
        .catch((error) => {
          console.error('Error sending message:', error);
        });
    }
  };

  return (
    <div className="chat-container">
      <h2>
        {t('chat_with')} Session {sessionId}
      </h2>
      <div className="messages-list">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.sender._id === senderId ? 'my-message' : 'their-message'
            }
          >
            <p>
              <strong>{msg.sender.name}:</strong> {msg.content}
            </p>
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
