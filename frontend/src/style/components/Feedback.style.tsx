import styled from 'styled-components';

export const FeedbackCard = styled.div`
  background-color: var(--background-color-secondary);
  padding: 1em;
  border-radius: 5px;
`;

export const FeedbackHeader = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

export const FeedbacksList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  height: 15em;
  overflow-y: auto;
  padding: 1em;
`;

export const FeedbackSubmitButton = styled.button`
  padding: 0.75rem;
  font-size: 1rem;
  background-color: var(--primary-color);
  color: var(--text-color);
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: var(--button-border-redius);

  &:hover {
    background-color: var(--primary-color-hover);
  }
`;

export const Star = styled.span`
  cursor: pointer;
  font-size: 25px;
`;

export const StarRating = styled.div`
  display: flex;
  gap: 5px;
`;

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1em;
`;

export const FeedbackTextarea = styled.textarea`
  min-width: 90%;
  max-width: 90%;
  min-height: 100px;
  max-height: 150px;
  padding: var(--input-padding);
  border: var(--input-border);
  border-radius: var(--input-border-radius);
  box-shadow: var(--input-box-shadow);
`;