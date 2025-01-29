import React, { useCallback, useEffect, useState } from 'react';
import {
  FeedbackCard,
  FeedbackHeader,
  FeedbacksList,
  FeedbackSubmitButton,
  FeedbackTextarea,
  FlexRow,
  Headline,
  Star,
  StarRating,
} from '../style/components/Feedback.style';
import loggerInstance from '../utils/loggerInstance.ts';
import { IFeedback } from '../models/models.ts';
import { useTypedTranslation } from '../utils/translationUtils.ts';
import { toast } from 'react-hot-toast';
import axiosInstance from '../utils/axiosInstance';

interface FeedbackData {
  sessionId: string | undefined;
  senderId: string;
}

const Feedback: React.FC<FeedbackData> = ({ sessionId, senderId }) => {
  const [comment, setComment] = useState('');
  const [feedbacks, setFeedbacks] = useState<IFeedback[]>([]);
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [rating, setRating] = useState(0);
  const { t } = useTypedTranslation();

  const fetchFeedbacks = useCallback(() => {
    axiosInstance
      .get(`/api/feedback/session/${sessionId}`)
      .then((res) => setFeedbacks(res.data))
      .catch((error) =>
        loggerInstance.error('Error fetching feedbacks:', error)
      );
  }, [sessionId]);

  const fetchAverageRating = useCallback(() => {
    axiosInstance
      .get(`/api/feedback/user/${senderId}/average-rating`)
      .then((res) => setAverageRating(res.data.averageRating))
      .catch((error) =>
        loggerInstance.error('Error fetching average rating:', error)
      );
  }, [senderId]);

  useEffect(() => {
    fetchFeedbacks();
    fetchAverageRating();
  }, [fetchFeedbacks, fetchAverageRating]);

  const handleSendFeedback = () => {
    axiosInstance
      .post('/api/feedback', {
        sessionId,
        userId: senderId,
        rating,
        feedback: comment || ' ',
      })
      .then(() => {
        toast.success(t('feedback_submitted'), { icon: '🚀' });
        setRating(0);
        setComment('');
        fetchFeedbacks();
        fetchAverageRating();
      })
      .catch((error) => loggerInstance.error('Error sending feedback:', error));
  };

  const handleRating = (value: number) => {
    setRating(value);
  };

  return (
    <>
      <Headline>{t('rate_session')}</Headline>
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
      <Headline>{t('feedbacks_for_session')}</Headline>
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
          <Headline>{t('average_rating')}</Headline>
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
