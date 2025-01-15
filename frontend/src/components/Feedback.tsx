import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import '../style/Feedback.css';

interface FeedbackData {
  sessionId: string | undefined;
  senderId: string;
}

const Feedback: React.FC<FeedbackData> = ({ sessionId, senderId }) => {
  const [comment, setComment] = useState('');
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [rating, setRating] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
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

  const handleRating = (value: number) => {
    setRating(value);
  };

  return (
    <>
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
        <button className="feedback-submit-btn" onClick={handleSendFeedback}>
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
                {'★'.repeat(feedback.rating) + '☆'.repeat(5 - feedback.rating)}
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
    </>
  );
};

export default Feedback;
