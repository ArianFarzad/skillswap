import styled from 'styled-components';
import '../index.css';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: var(--background-color);
  border-radius: 24px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  position: relative;
`;

export const CalendarWrapper = styled.div`
  background: var(--background-color-secondary);
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

  .custom-calendar {
    border: none;
    background: transparent;
    width: 100%;

    &__tile {
      position: relative;
      height: 80px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding: 8px;
      border-radius: 12px;
      transition: all 0.2s ease;

      &:hover {
        background: var(--text-color);
      }

      &--active {
        background: var(--primary-color) !important;
        color: white !important;
      }
    }

    &__navigation {
      margin-bottom: 1rem;

      button {
        background: var(--text-color);
        border-radius: 10px;
        padding: 0.8rem 1.5rem;
        color: var(--primary-color);
        font-weight: 600;
        transition: all 0.2s ease;

        &:hover {
          background: var(--primary-color);
          color: white;
        }
      }
    }
  }
`;

export const EventDot = styled.span<{ count: number }>`
  display: inline-block;
  width: ${(props) => Math.max(6, 10 - props.count)}px;
  height: ${(props) => Math.max(6, 10 - props.count)}px;
  background: var(--primary-color);
  border-radius: 50%;
  margin: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const FormCard = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: var(--background-color-secondary);
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

export const FormHeader = styled.div`
  position: relative;
  margin-bottom: 2rem;

  h2 {
    color: var(--primary-color);
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  .accent-line {
    width: 60px;
    height: 4px;
    background: var(--primary-color);
    border-radius: 2px;
    margin-top: 0.5rem;
  }
`;

export const InputGroup = styled.div<{ $icon?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;

  svg {
    color: var(--text-color);
    font-size: 1.2rem;
    flex-shrink: 0;
  }
`;

export const FloatingLabel = styled.div`
  position: relative;
  flex-grow: 1;

  span {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-color);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
    background: var(--background-color-secondary);
    padding: 0 0.3rem;
  }
`;

export const StyledInput = styled.input`
  width: 90%;
  padding: 1.2rem;
  background: var(--background-color);
  border: 2px solid var(--border-color);
  border-radius: 14px;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 4px rgba(108, 92, 231, 0.15);
    outline: none;

    + span {
      transform: translateY(-180%) scale(0.9);
      left: 0.8rem;
      color: var(--primary-color);
    }
  }

  &:not(:placeholder-shown) + span {
    transform: translateY(-180%) scale(0.9);
    left: 0.8rem;
  }
`;

export const GradientDivider = styled.div`
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--border-color),
    transparent
  );
  margin: 1.5rem 0;
`;

export const UploadZone = styled.label<{ $isDragging: boolean }>`
  border: 2px dashed var(--border-color);
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${(props) =>
    props.$isDragging ? 'rgba(108, 92, 231, 0.03)' : 'var(--background-color)'};

  &:hover {
    border-color: var(--primary-color);
    background: rgba(108, 92, 231, 0.03);

    .upload-icon {
      transform: translateY(-2px);
    }
  }

  input {
    display: none;
  }

  .upload-icon {
    font-size: 2.5rem;
    color: var(--primary-color);
    transition: transform 0.2s ease;
  }

  p {
    color: var(--text-color);
    margin: 0;
    font-weight: 500;
  }

  .file-types {
    color: var(--text-color);
    font-size: 0.9rem;
  }
`;

export const ActionButton = styled.button`
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 1.2rem 2.5rem;
  border-radius: 14px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  align-self: flex-start;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(108, 92, 231, 0.4);
    background: var(--primary-color);
  }
`;

export const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--primary-color);
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;

  svg {
    font-size: 2rem;
  }
`;

export const EventsPopup = styled.div`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--background-color);
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  width: 90%;
  max-width: 400px;
  max-height: 80vh;
  overflow-y: auto;

  h3 {
    color: var(--primary-color);
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    text-align: center;
  }

  p {
    color: var(--text-color);
    text-align: center;
    margin: 1rem 0;
  }
`;

export const EventItem = styled.div`
  background: var(--background-color-secondary);
  padding: 1.2rem;
  border-radius: 12px;
  margin-bottom: 1rem;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

export const EventTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: var(--primary-color);
  font-weight: 600;
  margin-bottom: 0.5rem;

  svg {
    font-size: 1.2rem;
  }
`;

export const EventTime = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--text-color);
  margin-bottom: 0.5rem;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: var(--text-color);
  transition: all 0.2s ease;

  &:hover {
    color: var(--primary-color);
    transform: rotate(90deg);
  }

  svg {
    font-size: 1.5rem;
  }
`;
