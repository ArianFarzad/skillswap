import React, { useCallback, useEffect, useState } from 'react';
import {
  FeedbackContainer,
  FeedbackForm,
  FeedbackHeader,
  FeedbackList,
  FeedbackCard,
  FeedbackUser,
  FeedbackRating,
  FeedbackComment,
  FeedbackTextarea,
  StarRating,
  Star,
  SubmitButton,
  AverageRating,
  AverageRatingText,
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
    <FeedbackContainer>
      <FeedbackHeader>{t('rate_session')}</FeedbackHeader>
      <FeedbackForm>
        <FeedbackTextarea
          placeholder={t('enter_feedback')}
          rows={5}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <StarRating>
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              active={index < rating}
              onClick={() => handleRating(index + 1)}
            >
              {index < rating ? '★' : '☆'}
            </Star>
          ))}
        </StarRating>
        <SubmitButton onClick={handleSendFeedback}>
          {t('submit_feedback')}
        </SubmitButton>
      </FeedbackForm>

      <FeedbackHeader>{t('feedbacks_for_session')}</FeedbackHeader>
      <FeedbackList>
        {feedbacks.map((feedback, index) => (
          <FeedbackCard key={index}>
            <FeedbackUser>
              <strong>{feedback.userId.name}</strong>
            </FeedbackUser>
            <FeedbackRating>
              {'★'.repeat(feedback.rating) + '☆'.repeat(5 - feedback.rating)}
            </FeedbackRating>
            <FeedbackComment>{feedback.feedback}</FeedbackComment>
          </FeedbackCard>
        ))}
      </FeedbackList>

      {averageRating !== null && (
        <AverageRating>
          <AverageRatingText>{t('average_rating')}</AverageRatingText>
          <StarRating>
            {[...Array(5)].map((_, index) => (
              <Star key={index} active={index < Math.ceil(averageRating)}>
                {index < Math.ceil(averageRating) ? '★' : '☆'}
              </Star>
            ))}
          </StarRating>
        </AverageRating>
      )}
    </FeedbackContainer>
  );
};

export default Feedback;
