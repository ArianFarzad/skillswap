import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import axios from 'axios';
import ProfilePage from '../components/ProfilePage';

vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useParams: () => ({ profileId: '1' }),
    BrowserRouter: actual.BrowserRouter,
  };
});

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('ProfilePage Component', () => {
  test('renders ProfilePage component', async () => {
    renderWithProviders(<ProfilePage />);
    await waitFor(() => {
      expect(screen.getByTestId('profilePage-headline')).toBeInTheDocument();
    });
  });

  test('fetches and displays profile data', async () => {
    const profileData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      skills: ['JavaScript', 'React'],
      interests: ['Coding', 'Music'],
    };

    mockedAxios.get.mockResolvedValueOnce({ data: profileData });

    renderWithProviders(<ProfilePage />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
      profileData.skills.forEach((skill) => {
        expect(screen.getByText(skill)).toBeInTheDocument();
      });
      profileData.interests.forEach((interest) => {
        expect(screen.getByText(interest)).toBeInTheDocument();
      });
    });
  });

  test('shows error message if fetching profile fails', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));

    renderWithProviders(<ProfilePage />);

    await waitFor(() => {
      expect(
        screen.getByText(/An unexpected error occurred/i)
      ).toBeInTheDocument();
    });
  });
});
