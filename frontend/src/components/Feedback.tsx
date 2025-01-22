import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import {
  FeedbackCard,
  FeedbackHeader,
  FeedbacksList,
  FeedbackSubmitButton,
  FeedbackTextarea,
  FlexRow,
  Star,
  StarRating,
} from '../style/components/Feedback.style';
import loggerInstance from '../utils/loggerInstance.ts';
import { IFeedback } from '../models/Feedback';

interface FeedbackData {
  sessionId: string | undefined;
  senderId: string;
}

const Feedback: React.FC<FeedbackData> = ({ sessionId, senderId }) => {
  const [comment, setComment] = useState('');
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);
  const [feedbacks, setFeedbacks] = useState<IFeedback[]>([]);
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [rating, setRating] = useState(0);
  const {
    t,
  }: {
    t: (key: keyof typeof import('../../public/locales/en.json')) => string;
  } = useTranslation();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/feedback/session/${sessionId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then((res) => setFeedbacks(res.data))
      .catch((error) =>
        loggerInstance.error('Error fetching feedbacks:', error)
      );

    axios
      .get(
        `http://localhost:8000/api/feedback/user/${senderId}/average-rating`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      )
      .then((res) => setAverageRating(res.data.averageRating))
      .catch((error) =>
        loggerInstance.error('Error fetching average rating:', error)
      );
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
      .catch((error) => loggerInstance.error('Error sending feedback:', error));
  };

  const handleRating = (value: number) => {
    setRating(value);
  };

  return (
    <>
      <h2>{t('rate_session')}</h2>
      <FeedbackTextarea
        placeholder={t('enter_feedback')}
        rows={5}
        cols={50}
        maxLength={200}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <FlexRow>
        <StarRating>
          {[...Array(5)].map((_, index) => (
            <Star key={index} onClick={() => handleRating(index + 1)}>
              {index < rating ? '★' : '☆'}
            </Star>
          ))}
        </StarRating>
        <FeedbackSubmitButton onClick={handleSendFeedback}>
          {t('submit_feedback')}
        </FeedbackSubmitButton>
      </FlexRow>
      {feedbackSuccess && <p>{t('feedback_sent')}</p>}
      <h2>{t('feedbacks_for_session')}</h2>
      <FeedbacksList>
        {feedbacks.map((feedback, index) => (
          <FeedbackCard key={index}>
            <FeedbackHeader>
              <p>
                <strong>{feedback.userId.name}</strong>
              </p>
              <p>
                {'★'.repeat(feedback.rating) + '☆'.repeat(5 - feedback.rating)}
              </p>
            </FeedbackHeader>
            <p>{feedback.feedback}</p>
          </FeedbackCard>
        ))}
      </FeedbacksList>
      {averageRating !== null && (
        <FlexRow>
          <h3>{t('average_rating')}</h3>
          <p>
            {[...Array(5)].map((_, index) => (
              <Star key={index}>
                {index < Math.ceil(averageRating) ? '★' : '☆'}
              </Star>
            ))}
          </p>
        </FlexRow>
      )}
    </>
  );
};

export default Feedback;
