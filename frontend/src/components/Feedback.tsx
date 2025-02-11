import React, { useCallback, useEffect, useState } from 'react';
import { IFeedback } from '../models/models.ts';
import { useTypedTranslation } from '../utils/translationUtils.ts';
import { showToast } from '../utils/toastUtils.ts';
import log from '../utils/loggerInstance.ts';
import axios from '../utils/axiosInstance';
import {
  AverageRating,
  AverageRatingText,
  FeedbackCard,
  FeedbackComment,
  FeedbackContainer,
  FeedbackForm,
  FeedbackHeader,
  FeedbackList,
  FeedbackRating,
  FeedbackTextarea,
  FeedbackUser,
  Star,
  StarRating,
  SubmitButton,
} from '../style/components/Feedback.style';

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
    axios
      .get(`/api/feedback/session/${sessionId}`)
      .then((res) => setFeedbacks(res.data))
      .catch((error) => log.error('Error fetching feedbacks:', error));
  }, [sessionId]);

  const fetchAverageRating = useCallback(() => {
    axios
      .get(`/api/feedback/user/${senderId}/average-rating`)
      .then((res) => setAverageRating(res.data.averageRating))
      .catch((error) => log.error('Error fetching average rating:', error));
  }, [senderId]);

  useEffect(() => {
    fetchFeedbacks();
    fetchAverageRating();
  }, [fetchFeedbacks, fetchAverageRating]);

  const handleSendFeedback = () => {
    axios
      .post('/api/feedback', {
        sessionId,
        userId: senderId,
        rating,
        feedback: comment || ' ',
      })
      .then(() => {
        showToast('success', 'feedback_sent', t);
        setRating(0);
        setComment('');
        fetchFeedbacks();
        fetchAverageRating();
      })
      .catch((error) => log.error('Error sending feedback:', error));
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
