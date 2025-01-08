import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import Chat from '../components/Chat';

vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Feedback functionality in Chat component', () => {
  const mockFeedbacks = [
    {
      userId: { _id: '1', name: 'User1' },
      rating: 4,
      feedback: 'Great session!',
    },
    {
      userId: { _id: '2', name: 'User2' },
      rating: 5,
      feedback: 'Excellent!',
    },
  ];

  const mockAverageRating = { averageRating: 4.5 };

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.setItem('token', 'test-token');
    localStorage.setItem('myUserId', 'test-user-id');
    mockedAxios.get.mockImplementation((url) => {
      if (url.includes('/feedback/session')) {
        return Promise.resolve({ data: mockFeedbacks });
      }
      if (url.includes('/feedback/user')) {
        return Promise.resolve({ data: mockAverageRating });
      }
      return Promise.reject(new Error('Unknown endpoint'));
    });
    mockedAxios.post.mockResolvedValue({ data: { success: true } });
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('displays a list of feedbacks for the session', async () => {
    renderWithRouter(<Chat />);

    const feedbackElements = await screen.findAllByText(
      /Great session!|Excellent!/
    );
    expect(feedbackElements).toHaveLength(mockFeedbacks.length);

    const feedbackAuthor = await screen.findByText('User1');
    expect(feedbackAuthor).toBeInTheDocument();
  });

  it('shows the average rating as star icons', async () => {
    renderWithRouter(<Chat />);

    const averageRatingElement = await screen.findByText('★★★★☆');
    expect(averageRatingElement).toBeInTheDocument();
  });

  it('shows a success message after submitting feedback', async () => {
    renderWithRouter(<Chat />);

    const textarea = screen.getByPlaceholderText('Enter your feedback');
    const stars = screen.getAllByText('☆');
    const submitButton = screen.getByText('Submit feedback');

    fireEvent.change(textarea, { target: { value: 'Awesome session!' } });
    fireEvent.click(stars[4]);
    fireEvent.click(submitButton);

    await waitFor(() => {
      const successMessage = screen.getByText('feedback sent');
      expect(successMessage).toBeInTheDocument();
    });
  });

  it('handles feedback submission errors gracefully', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('Network Error'));

    renderWithRouter(<Chat />);

    const textarea = screen.getByPlaceholderText('Enter your feedback');
    const stars = screen.getAllByText('☆');
    const submitButton = screen.getByText('Submit feedback');

    fireEvent.change(textarea, { target: { value: 'Session was okay.' } });
    fireEvent.click(stars[2]);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    });

    const errorMessage = screen.queryByText('feedback sent');
    expect(errorMessage).not.toBeInTheDocument();
  });
});
