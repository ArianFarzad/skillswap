import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BookAppointment from './BookAppointment';
import TranslationBar from './TranslationBar';
import '../style/chat.css';
import { IMessage } from '../models/Message';
import { IFeedback } from '../models/Feedback';
import { IUser } from '../models/User';
import socket, {
  connectSocket,
  disconnectSocket,
  onNewMessage,
  sendMessage,
} from '../utils/socket';
import SendIcon from '@mui/icons-material/Send';
import axiosInstance from '../utils/axiosInstance';

const Chat: React.FC = () => {
  const {
    t,
  }: {
    t: (key: keyof typeof import('../../public/locales/en.json')) => string;
  } = useTranslation();
  const { sessionId } = useParams<{ sessionId: string }>();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const senderId = localStorage.getItem('myUserId') || '';
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);
  const [feedbacks, setFeedbacks] = useState<IFeedback[]>([]);
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
  const [otherPerson, setOtherPerson] = useState<IUser | null>(null);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const messagesListRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

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

    // Fetch Feedbacks
    axiosInstance
      .get<IFeedback[]>(`/api/feedback/session/${sessionId}`)
      .then((res) => setFeedbacks(res.data))
      .catch((error) => console.error('Error fetching feedbacks:', error));

    // Fetch Average Rating
    axiosInstance
      .get(`/api/feedback/user/${senderId}/average-rating`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then((res) => setAverageRating(res.data.averageRating))
      .catch((error) => console.error('Error fetching average rating:', error));

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
  }, [sessionId, senderId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Notify other clients in real time via Socket.IO
      sendMessage(sessionId!, senderId, newMessage);
      setNewMessage('');
    }
  };

  const handleSendFeedback = () => {
    axiosInstance
      .post('/api/feedback', {
        sessionId,
        userId: senderId,
        rating,
        feedback: comment || ' ',
      })
      .then(() => {
        setFeedbackSuccess(true);
        setTimeout(() => setFeedbackSuccess(false), 3000);
      })
      .catch((error) => console.error('Error sending feedback:', error));
  };

  const handleRating = (value: number) => {
    setRating(value);
  };

  const handleScroll = () => {
    if (messagesListRef.current) {
      const { scrollHeight, clientHeight, scrollTop } = messagesListRef.current;
      setShowScrollToBottom(scrollHeight - clientHeight - scrollTop > 100);
    }
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
              {t('chat_with')} {otherPerson?.name}
            </h2>
            <div
              className="messages-list"
              ref={messagesListRef}
              onScroll={handleScroll}
            >
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
                  <span className={'timestamp'}>
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))}
              <div ref={messagesEndRef}></div>
            </div>

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

            <div className="message-input">
              <input
                type="text"
                className="msg-text-field"
                placeholder={t('type_message')}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button className="send-msg-btn" onClick={handleSendMessage}>
                <SendIcon />
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
