import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import '../style/chat.css';

interface ChatParams {
  sessionId: string | undefined;
  senderId: string;
}

const Chat: React.FC<ChatParams> = ({ sessionId, senderId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { t } = useTranslation();

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      axios
        .post(
          `http://localhost:8000/api/sessions/${sessionId}/messages`,
          { content: newMessage },
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
        .catch((error) => console.error('Error sending message:', error));
    }
  };

  useEffect(() => {
    // Fetch Messages
    axios
      .get(`http://localhost:8000/api/sessions/${sessionId}/messages`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then((res) => setMessages(res.data))
      .catch((error) => console.error('Error fetching messages:', error));
  }, [sessionId]);

  return (
    <div className="chat-content">
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
          className="msg-text-field"
          placeholder={t('type_message')}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className="send-msg-btn" onClick={handleSendMessage}>
          &#9993;
        </button>
      </div>
    </div>
  );
};

export default Chat;
