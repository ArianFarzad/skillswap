import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Feedback from '../components/Feedback';
import { MemoryRouter } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { I18nextProvider } from 'react-i18next';
import i18n from './testUtils/i18nTestConfig';
import { showToast } from '../utils/toastUtils';
import { beforeEach, describe, expect, test } from 'vitest';

describe('Feedback Component', () => {
  const sessionId = 'test-session-id';
  const senderId = 'test-sender-id';

  beforeEach(() => {
    render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter>
          <Feedback sessionId={sessionId} senderId={senderId} />
        </MemoryRouter>
      </I18nextProvider>
    );
  });

  test('renders feedback form', () => {
    const feedbackHeader = screen.getByText('rate_session');
    const feedbackTextarea = screen.getByPlaceholderText('enter_feedback');
    const submitButton = screen.getByText('submit_feedback');

    expect(feedbackHeader).toBeInTheDocument();
    expect(feedbackTextarea).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('sends feedback successfully', async () => {
    const feedbackTextarea = screen.getByPlaceholderText('enter_feedback');
    const submitButton = screen.getByText('submit_feedback');
    const star = screen.getAllByText('☆')[0];

    fireEvent.change(feedbackTextarea, { target: { value: 'Bad session!' } });
    fireEvent.click(star);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(axiosInstance.post).toHaveBeenCalledWith('/api/feedback', {
        sessionId,
        userId: senderId,
        rating: 1,
        feedback: 'Bad session!',
      });
    });

    await waitFor(() => {
      expect(showToast).toHaveBeenCalledWith('success', 'feedback_sent', expect.any(Function));
    });
  });

  test('fetches feedbacks and average rating', async () => {
    await waitFor(() => {
      expect(axiosInstance.get).toHaveBeenCalledWith(`/api/feedback/session/${sessionId}`);
      expect(axiosInstance.get).toHaveBeenCalledWith(`/api/feedback/user/${senderId}/average-rating`);
    });
  });
});