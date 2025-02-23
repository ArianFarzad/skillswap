import styled from 'styled-components';

export const StatisticsContainer = styled.div`
  background: linear-gradient(
    135deg,
    var(--background-color-secondary) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  border-left: 4px solid var(--primary-color);
  padding: 2rem;

  border-radius: 12px;
`;

export const SectionTitle = styled.h3`
  color: var(--text-color);
  font-size: 1.8rem;
  margin-bottom: 2rem;
  text-align: center;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  overflow-y: auto;
  scrollbar-width: none;
  scrollbar-color: var(--primary-color) var(--background-color-secondary);
  height: 130vh;
`;

export const ChartContainer = styled.div`
  background: var(--background-color);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const StatCard = styled.div`
  background: var(--background-color);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 600;
  color: var(--primary-color);
  margin: 1rem 0;
`;

export const StatLabel = styled.div`
  font-size: 1.2rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
`;

export const RatingContainer = styled.div`
  .rating-stars {
    font-size: 1.5rem;
    color: #ffd700;
    margin-top: 0.5rem;
  }
`;

export const RatingValue = styled(StatValue)`
  font-size: 2rem;
  color: var(--text-color);
`;

export const FeedbackContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FeedbackValue = styled(StatValue)`
  font-size: 2rem;
  color: var(--text-color);
`;
