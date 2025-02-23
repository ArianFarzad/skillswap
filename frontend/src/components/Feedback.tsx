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
  const [givenFeedbacks, setGivenFeedbacks] = useState<IFeedback[]>([]);
  const [receivedFeedbacks, setReceivedFeedbacks] = useState<IFeedback[]>([]);
  const [averageRatingGiven, setAverageRatingGiven] = useState<number | null>(
    null
  );
  const [averageRatingReceived, setAverageRatingReceived] = useState<
    number | null
  >(null);
  const [rating, setRating] = useState(0);
  const { t } = useTypedTranslation();

  const fetchFeedbackData = useCallback(() => {
    axios
      .get(`/api/feedbacks/${sessionId}`)
      .then((res) => {
        const {
          givenFeedbacks,
          averageRatingGiven,
          receivedFeedbacks,
          averageRatingReceived,
        } = res.data;

        setGivenFeedbacks(givenFeedbacks);
        setAverageRatingGiven(averageRatingGiven);
        setReceivedFeedbacks(receivedFeedbacks);
        setAverageRatingReceived(averageRatingReceived);
      })
      .catch((error) => log.error('Error fetching feedbacks:', error));
  }, [sessionId]);

  useEffect(() => {
    fetchFeedbackData();
  }, [fetchFeedbackData]);

  const handleSendFeedback = () => {
    axios
      .post('/api/feedbacks', {
        sessionId,
        userId: senderId,
        rating,
        feedback: comment || ' ',
      })
      .then(() => {
        showToast('success', 'feedback_sent', t);
        setRating(0);
        setComment('');
        fetchFeedbackData();
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

      {/* Display feedbacks given by the logged-in user */}
      {givenFeedbacks.length > 0 && (
        <>
          <FeedbackHeader>{t('feedbacks_given')}</FeedbackHeader>
          <FeedbackList>
            {givenFeedbacks.map((feedback, index) => (
              <FeedbackCard key={index}>
                <FeedbackUser>
                  <strong>{feedback.userId.name || 'You'}</strong>
                </FeedbackUser>
                <FeedbackRating>
                  {'★'.repeat(feedback.rating) +
                    '☆'.repeat(5 - feedback.rating)}
                </FeedbackRating>
                <FeedbackComment>{feedback.feedback}</FeedbackComment>
              </FeedbackCard>
            ))}
          </FeedbackList>

          {averageRatingGiven !== null && (
            <AverageRating>
              <AverageRatingText>{t('average_rating_given')}</AverageRatingText>
              <StarRating>
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    active={index < Math.ceil(averageRatingGiven)}
                  >
                    {index < Math.ceil(averageRatingGiven) ? '★' : '☆'}
                  </Star>
                ))}
              </StarRating>
            </AverageRating>
          )}
        </>
      )}

      {/* Display feedbacks received from the other participant */}
      {receivedFeedbacks.length > 0 && (
        <>
          <FeedbackHeader>{t('feedbacks_received')}</FeedbackHeader>
          <FeedbackList>
            {receivedFeedbacks.map((feedback, index) => (
              <FeedbackCard key={index}>
                <FeedbackUser>
                  <strong>{feedback.userId.name}</strong>
                </FeedbackUser>
                <FeedbackRating>
                  {'★'.repeat(feedback.rating) +
                    '☆'.repeat(5 - feedback.rating)}
                </FeedbackRating>
                <FeedbackComment>{feedback.feedback}</FeedbackComment>
              </FeedbackCard>
            ))}
          </FeedbackList>

          {averageRatingReceived !== null && (
            <AverageRating>
              <AverageRatingText>
                {t('average_rating_received')}
              </AverageRatingText>
              <StarRating>
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    active={index < Math.ceil(averageRatingReceived)}
                  >
                    {index < Math.ceil(averageRatingReceived) ? '★' : '☆'}
                  </Star>
                ))}
              </StarRating>
            </AverageRating>
          )}
        </>
      )}
    </FeedbackContainer>
  );
};

export default Feedback;
