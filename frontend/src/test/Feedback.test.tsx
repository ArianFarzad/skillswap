import './testUtils/mocks';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import Feedback from '../components/Feedback';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './testUtils/i18nTestConfig';
import { showToast } from '../utils/toastUtils';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import axiosInstance from '../utils/axiosInstance';

const mockedAxios = axiosInstance as unknown as {
  get: ReturnType<typeof vi.fn>;
  post: ReturnType<typeof vi.fn>;
};

describe('Feedback Component', () => {
  const sessionId = 'test-session-id';
  const senderId = 'test-sender-id';

  beforeEach(async () => {
    vi.resetAllMocks();

    mockedAxios.get = vi.fn((url: string) => {
      if (url === `/api/feedback/session/${sessionId}`) {
        return Promise.resolve({
          data: [
            { userId: { name: 'User' }, rating: 5, feedback: 'Great session!' },
          ],
        });
      }
      if (url === `/api/feedback/user/${senderId}/average-rating`) {
        return Promise.resolve({ data: { averageRating: 4.5 } });
      }
      return Promise.reject(new Error('Unexpected API call'));
    });

    mockedAxios.post = vi.fn().mockResolvedValue({
      data: { message: 'Feedback submitted successfully' },
    });

    await act(async () => {
      render(
        <I18nextProvider i18n={i18n}>
          <MemoryRouter>
            <Feedback sessionId={sessionId} senderId={senderId} />
          </MemoryRouter>
        </I18nextProvider>
      );
    });
  });

  test('renders feedback form', () => {
    const feedbackHeader = screen.getByText('rate_session');
    const feedbackTextarea = screen.getByPlaceholderText('enter_feedback');
    const submitButton = screen.getByText('submit_feedback');

    expect(feedbackHeader).toBeInTheDocument();
    expect(feedbackTextarea).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('fetches feedbacks', async () => {
    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `/api/feedbacks/${sessionId}`
      );
    });
  });

  test('sends feedback successfully', async () => {
    fireEvent.change(screen.getByPlaceholderText('enter_feedback'), {
      target: { value: 'Bad session!' },
    });
    fireEvent.click(screen.getAllByText('☆')[0]); // Click the first star
    fireEvent.click(screen.getByText('submit_feedback')); // Click the submit button

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith('/api/feedbacks', {
        sessionId,
        userId: senderId,
        rating: 1,
        feedback: 'Bad session!',
      });
    });

    await waitFor(() => {
      expect(showToast).toHaveBeenCalledWith(
        'success',
        'feedback_sent',
        expect.any(Function)
      );
    });
  });
});
