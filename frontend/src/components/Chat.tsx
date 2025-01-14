import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BookAppointment from './BookAppointment.tsx';
import axios from 'axios';
import TranslationBar from './TranslationBar.tsx';
import '../style/chat.css';

const Chat: React.FC = () => {
  const { t } = useTranslation();
  const { sessionId } = useParams<{ sessionId: string }>();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const senderId = localStorage.getItem('myUserId') || '';
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false); // Zustand für Sichtbarkeit

  const handleRating = (value: number) => {
    setRating(value);
  };

  useEffect(() => {
    // Fetch Messages
    axios
      .get(`http://localhost:8000/api/sessions/${sessionId}/messages`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then((res) => setMessages(res.data))
      .catch((error) => console.error('Error fetching messages:', error));

    // Fetch Feedbacks
    axios
      .get(`http://localhost:8000/api/feedback/session/${sessionId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then((res) => setFeedbacks(res.data))
      .catch((error) => console.error('Error fetching feedbacks:', error));

    // Fetch Average Rating
    axios
      .get(
        `http://localhost:8000/api/feedback/user/${senderId}/average-rating`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      )
      .then((res) => setAverageRating(res.data.averageRating))
      .catch((error) => console.error('Error fetching average rating:', error));
  }, [sessionId, senderId]);

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

  const handleSendFeedback = () => {
    axios
      .post(
        'http://localhost:8000/api/feedback',
        { sessionId, userId: senderId, rating, feedback: comment || ' ' },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      )
      .then(() => {
        setFeedbackSuccess(true);
        setTimeout(() => setFeedbackSuccess(false), 3000);
      })
      .catch((error) => console.error('Error sending feedback:', error));
  };

  return (
    <>
      <TranslationBar />
      <div className="session-content">
        <div className={isFeedbackVisible ? 'hide' : 'calendar-container'}>
          <BookAppointment />
        </div>
        <div className="chat-container">
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
        </div>
        <div className="feedback-toggle">
          <button
            className="toggle-btn"
            data-testid="toggle-feedback-btn"
            onClick={() => setIsFeedbackVisible(!isFeedbackVisible)}
          >
            {isFeedbackVisible ? (
              <span className={'btn-text'}>{t('book_appointment')}</span>
            ) : (
              <span className={'btn-text'}>{t('give_feedback')}</span>
            )}
          </button>
        </div>
        {isFeedbackVisible && (
          <div className="feedback-container">
            <h2>{t('rate_session')}</h2>
            <textarea
              className="feedback-textarea"
              placeholder={t('enter_feedback')}
              rows={5}
              cols={50}
              maxLength={200}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="flex-row">
              <div className="star-rating">
                {[...Array(5)].map((_, index) => (
                  <span
                    className="star"
                    key={index}
                    onClick={() => handleRating(index + 1)}
                  >
                    {index < rating ? '★' : '☆'}
                  </span>
                ))}
              </div>
              <button
                className="feedback-submit-btn"
                onClick={handleSendFeedback}
              >
                {t('submit_feedback')}
              </button>
            </div>
            {feedbackSuccess && <p>{t('feedback_sent')}</p>}
            <h2>{t('feedbacks_for_session')}</h2>
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
              <div className="flex-row">
                <h3>{t('average_rating')}</h3>
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
        )}
      </div>
    </>
  );
};

export default Chat;
