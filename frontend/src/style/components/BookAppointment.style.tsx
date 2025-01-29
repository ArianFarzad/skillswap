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

export const Headline = styled.h2`
  color: var(--primary-color);
  border: 1px solid var(--text-color);
  padding: 0.7em;
  display: flex;
  justify-content: center;
  margin: 0;
`;

export const Label = styled.label`
  font-size: 0.9em;
  color: var(--text-color);
`;

export const AppointmentInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

export const StyledInput = styled.input`
  width: 208px;
  padding: var(--input-padding);
  margin-top: 0.5em;
  border: var(--input-border);
  border-radius: var(--input-border-radius);
  box-shadow: var(--input-box-shadow);
`;

export const AppointmentSubmit = styled.button`
  padding: var(--input-padding);
  background-color: var(--primary-color);
  border: none;
  color: white;
  border-radius: var(--button-border-redius);
  margin: 0;

  &:hover {
    background-color: var(--primary-color-hover);
    cursor: pointer;
  }
`;

export const FileSelect = styled.input`
  padding: var(--input-padding);
  background-color: var(--primary-color);
  border: none;
  color: white;
  border-radius: var(--button-border-redius);
  margin: 0;

  &:hover {
    background-color: var(--primary-color-hover);
    cursor: pointer;
  }
`;

export const CalendarSection = styled.div`
  transform: scale(0.9);

  .react-calendar {
    max-width: 100%;
    background-color: var(--calendar-color);
    color: var(--text-color);
    border: none;
    border-radius: 1em;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    width: 100%;
  }
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
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  background-color: var(--background-color);
  color: var(--text-color);
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
    color: var(--text-color-on-button);
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

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1em;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;

export const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;
