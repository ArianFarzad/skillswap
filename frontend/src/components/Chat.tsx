import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import '../style/chat.css';

interface Message {
  sender: {
    _id: string;
    name: string;
  };
  content: string;
  timestamp: string;
}

interface Feedback {
  userId: {
    _id: string;
    name: string;
  };
  rating: number;
  feedback: string;
}

const Chat: React.FC = () => {
  const { t } = useTranslation();
  const { sessionId } = useParams<{ sessionId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const senderId = localStorage.getItem('myUserId') || '';
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [averageRating, setAverageRating] = useState<number | null>(null);

  const handleRating = (value: number) => {
    setRating(value);
  };

  useEffect(() => {
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

    axios
      .get(`http://localhost:8000/api/feedback/session/${sessionId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setFeedbacks(res.data);
      })
      .catch((error) => {
        console.error('Error fetching feedbacks:', error);
      });

    axios
      .get(
        `http://localhost:8000/api/feedback/user/${senderId}/average-rating`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then((res) => {
        setAverageRating(res.data.averageRating);
      })
      .catch((error) => {
        console.error('Error fetching average rating:', error);
      });
  }, [sessionId, senderId]);

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

  const handleSendFeedback = () => {
    axios
      .post(
        'http://localhost:8000/api/feedback',
        {
          sessionId: sessionId,
          userId: senderId,
          rating: rating,
          feedback: comment || ' ',
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then(() => {
        console.log('Feedback sent successfully');
        setFeedbackSuccess(true);
        setTimeout(() => {
          setFeedbackSuccess(false);
        }, 3000);
      })
      .catch((error) => {
        console.error('Error sending feedback:', error);
      });
  };

  return (
    <div className={'session-content'}>
      <div className="chat-container">
        <h2>
          {t('chat with')} Session {sessionId}
        </h2>
        <div className={'chat-content'}>
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
              className={'msg-text-field'}
              placeholder={t('type message')}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button className={'send-msg-btn'} onClick={handleSendMessage}>
              &#9993;
            </button>
          </div>
        </div>
      </div>
      <div className={'feedback-container'}>
        <h2>{t('Rate this session')}</h2>
        <textarea
          className={'feedback-textarea'}
          placeholder={t('Enter your feedback')}
          rows={5}
          cols={50}
          maxLength={200}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className={'flex-row'}>
          <div className={'star-rating'}>
            {[...Array(5)].map((_, index) => {
              return (
                <span
                  className={'star'}
                  key={index}
                  onClick={() => handleRating(index + 1)}
                >
                  {index < rating ? '★' : '☆'}
                </span>
              );
            })}
          </div>
          <button className="feedback-submit-btn" onClick={handleSendFeedback}>
            {t('Submit feedback')}
          </button>
        </div>
        {feedbackSuccess && <p>{t('feedback sent')}</p>}

        <h2>{t('Feedbacks for this session')}</h2>
        <div className="feedbacks-list">
          {feedbacks.map((feedback, index) => (
            <div key={index} className="feedback-card">
              <div className="feedback-header">
                <p>
                  <strong>{feedback.userId.name}</strong>
                </p>
                <p>
                  {'★'.repeat(feedback.rating) +
                    '☆'.repeat(5 - feedback.rating)}
                </p>
              </div>
              <p>{feedback.feedback}</p>
            </div>
          ))}
        </div>
        {averageRating !== null && (
          <div className={'flex-row'}>
            <h3>{t('Average rating')}</h3>
            <p>
              {[...Array(5)].map((_, index) => (
                <span key={index}>
                  {index < Math.ceil(averageRating) ? '★' : '☆'}
                </span>
              ))}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
