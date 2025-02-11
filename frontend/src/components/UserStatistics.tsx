import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useTypedTranslation } from '../utils/translationUtils.ts';
import {
  StatisticsContainer,
  SectionTitle,
  GridContainer,
  ChartContainer,
  StatCard,
  StatLabel,
  RatingContainer,
  RatingValue,
  FeedbackContainer,
  FeedbackValue,
} from '../style/components/UserStatistics.style';

ChartJS.register(ArcElement, Tooltip, Legend);

interface UserStatisticsProps {
  sessionCount: number;
  tutorSessionCount: number;
  studentSessionCount: number;
  messageCount: number;
  sentMessagesCount: number;
  receivedMessagesCount: number;
  averageRating: number;
  feedbackCount: number;
}

const UserStatistics: React.FC<UserStatisticsProps> = ({
  sessionCount,
  tutorSessionCount,
  studentSessionCount,
  messageCount,
  sentMessagesCount,
  receivedMessagesCount,
  averageRating,
  feedbackCount,
}) => {
  const { t } = useTypedTranslation();

  const sessionData = {
    labels: [t('total_sessions'), t('tutor_sessions'), t('student_sessions')],
    datasets: [
      {
        data: [sessionCount, tutorSessionCount, studentSessionCount],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        borderWidth: 0,
      },
    ],
  };

  const messageData = {
    labels: [t('total_messages'), t('sent_messages'), t('received_messages')],
    datasets: [
      {
        data: [messageCount, sentMessagesCount, receivedMessagesCount],
        backgroundColor: ['#4BC0C0', '#9966FF', '#FF9F40'],
        hoverBackgroundColor: ['#4BC0C0', '#9966FF', '#FF9F40'],
        borderWidth: 0,
      },
    ],
  };

  return (
    <StatisticsContainer>
      <SectionTitle>{t('user_statistics')}</SectionTitle>

      <GridContainer>
        {/* Sessions Chart */}
        <ChartContainer>
          <StatCard>
            <StatLabel>{t('sessions')}</StatLabel>
            <Doughnut
              data={sessionData}
              options={{
                plugins: {
                  legend: {
                    position: 'bottom',
                    align: 'start',
                    labels: {
                      color: 'var(--text-color)',
                      font: {
                        size: 14,
                      },
                    },
                  },
                },
              }}
            />
          </StatCard>
        </ChartContainer>

        {/* Messages Chart */}
        <ChartContainer>
          <StatCard>
            <StatLabel>{t('messages')}</StatLabel>
            <Doughnut
              data={messageData}
              options={{
                plugins: {
                  legend: {
                    position: 'bottom',
                    align: 'start',
                    labels: {
                      color: 'var(--text-color)',
                      font: {
                        size: 14,
                      },
                    },
                  },
                },
              }}
            />
          </StatCard>
        </ChartContainer>

        {/* Average Rating */}
        <StatCard>
          <RatingContainer>
            <StatLabel>{t('average_rating')}</StatLabel>
            <RatingValue>{averageRating.toFixed(2)}</RatingValue>
            <div className="rating-stars">
              {'★'.repeat(Math.round(averageRating))}
              {'☆'.repeat(5 - Math.round(averageRating))}
            </div>
          </RatingContainer>
        </StatCard>

        {/* Feedback Count */}
        <StatCard>
          <FeedbackContainer>
            <StatLabel>{t('feedback_count')}</StatLabel>
            <FeedbackValue>{feedbackCount}</FeedbackValue>
          </FeedbackContainer>
        </StatCard>
      </GridContainer>
    </StatisticsContainer>
  );
};

export default UserStatistics;
