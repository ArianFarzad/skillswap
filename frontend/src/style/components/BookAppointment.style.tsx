import styled from 'styled-components';

export const AppointmentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const AppointmentForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 2em;
  flex: 1;
`;

export const AppointmentInput = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TitleInput = styled.input`
  width: 208px;
  padding: var(--input-padding);
  margin-top: 0.5em;
  border: var(--input-border);
  border-radius: var(--input-border-radius);
  box-shadow: var(--input-box-shadow);
`;

export const DescriptionInput = styled.input`
  width: 208px;
  padding: var(--input-padding);
  margin-top: 0.5em;
  border: var(--input-border);
  border-radius: var(--input-border-radius);
  box-shadow: var(--input-box-shadow);
`;

export const StartDateInput = styled.input`
  width: 208px;
  padding: var(--input-padding);
  margin-top: 0.5em;
  border: var(--input-border);
  border-radius: var(--input-border-radius);
  box-shadow: var(--input-box-shadow);
`;

export const EndDateInput = styled.input`
  width: 208px;
  padding: var(--input-padding);
  margin-top: 0.5em;
  border: var(--input-border);
  border-radius: var(--input-border-radius);
  box-shadow: var(--input-box-shadow);
`;

export const AppointmentSubmit = styled.button`
  margin-top: 2em;
  padding: var(--input-padding);
  background-color: var(--primary-color);
  border: none;
  color: white;
  border-radius: var(--button-border-redius);

  &:hover {
    background-color: var(--primary-color-hover);
    cursor: pointer;
  }
`;

export const CalendarSection = styled.div`
  transform: scale(0.9);
`;

export const EventDot = styled.span`
  color: red;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    color: #ff6347;
  }
`;

export const PopoverBody = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  width: 250px;

  h4 {
    margin-top: 0;
    font-size: 1.2rem;
  }

  p {
    margin: 5px 0;
  }

  button {
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9rem;
    margin-top: 10px;
    width: 100%;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

export const Popover = styled.div`
  z-index: 9999;
`;
