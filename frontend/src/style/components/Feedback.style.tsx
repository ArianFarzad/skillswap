import styled from 'styled-components';

export const FeedbackContainer = styled.div`
  background-color: var(--background-color);
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  height: 65vh;
  overflow-y: scroll;
  scrollbar-width: none;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  }
`;

export const FeedbackHeader = styled.h2`
  color: var(--primary-color);
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

export const FeedbackForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

export const FeedbackTextarea = styled.textarea`
  width: 90%;
  min-height: 150px;
  padding: 1rem;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 1rem;
  color: var(--text-color);
  background-color: var(--background-color-secondary);
  transition: border-color 0.3s ease;

  &:focus {
    border-color: var(--primary-color);
    outline: none;
  }

  &::placeholder {
    color: var(--placeholder-color);
  }

  &:focus::placeholder {
    color: transparent;
  }
`;

export const StarRating = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
`;

export const Star = styled.span<{ active: boolean }>`
  cursor: pointer;
  font-size: 2rem;
  color: ${(props) => (props.active ? '#ffd700' : '#ccc')};
  transition: color 0.3s ease;

  &:hover {
    color: #ffd700;
  }
`;

export const SubmitButton = styled.button`
  background-color: var(--primary-color);
  color: var(--text-color-on-button);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--primary-color-hover);
  }
`;

export const FeedbackList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-height: 300px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--primary-color) var(--background-color);
  padding: 1rem;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--primary-color);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: var(--background-color);
  }
`;

export const FeedbackCard = styled.div`
  background-color: var(--background-color-secondary);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  color: var(--text-color);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }
`;

export const FeedbackUser = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

export const FeedbackRating = styled.div`
  font-size: 1.5rem;
  color: #ffd700;
  margin-bottom: 0.5rem;
`;

export const FeedbackComment = styled.p`
  font-size: 1rem;
  color: var(--text-color);
  margin: 0;
`;

export const AverageRating = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
`;

export const AverageRatingText = styled.p`
  font-size: 1.25rem;
  color: var(--text-color);
  margin: 0;
`;
