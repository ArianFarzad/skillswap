import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { vi } from 'vitest';
import Profile from '../components/Profile';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

const mockNavigate = vi.fn();
(useNavigate as jest.Mock).mockReturnValue(mockNavigate);

vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Profile Component', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'test-token');
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('fetches and displays profile data on mount', async () => {
    const profileData = {
      skills: ['JavaScript', 'React'],
      interests: ['Coding', 'Music'],
      points: 100,
    };

    mockedAxios.get.mockResolvedValueOnce({ data: profileData });

    renderWithRouter(<Profile />);

    await waitFor(() => {
      expect(screen.getByText('JavaScript')).toBeInTheDocument();
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('Coding')).toBeInTheDocument();
      expect(screen.getByText('Music')).toBeInTheDocument();
    });
  });

  test('shows error message if fetching profile fails', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));

    renderWithRouter(<Profile />);

    expect(
      await screen.findByText(/An unexpected error occurred/i)
    ).toBeInTheDocument();
  });

  test('adds a new skill', async () => {
    const profileData = {
      skills: ['JavaScript'],
      interests: ['Existing Interest'],
      points: 100,
    };

    mockedAxios.get.mockResolvedValueOnce({ data: profileData });
    mockedAxios.post.mockResolvedValueOnce({
      data: { ...profileData, skills: ['JavaScript', 'TypeScript'] },
    });

    renderWithRouter(<Profile />);

    await waitFor(() => {
      expect(screen.getByText('JavaScript')).toBeInTheDocument();
    });

    const skillInput = screen.getByTestId('input-skill');
    expect(skillInput).toBeInTheDocument();

    // Add a new skill
    fireEvent.change(skillInput, { target: { value: 'TypeScript' } });
    fireEvent.click(screen.getByTestId('add-skill-button'));

    await waitFor(() => {
      expect(
        screen.getByText((content, element) => {
          return (
            element?.tagName.toLowerCase() === 'p' && content === 'TypeScript'
          );
        })
      ).toBeInTheDocument();
    });
  });

  test('removes a skill', async () => {
    const profileData = {
      skills: ['JavaScript', 'React'],
      interests: ['Existing Interest'],
      points: 100,
    };

    mockedAxios.get.mockResolvedValueOnce({ data: profileData });
    mockedAxios.delete.mockResolvedValueOnce({
      data: { ...profileData, skills: ['React'] },
    });

    renderWithRouter(<Profile />);

    await waitFor(() => {
      expect(screen.getByText('JavaScript')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('remove-skill-JavaScript'));

    await waitFor(() => {
      expect(screen.queryByText('JavaScript')).not.toBeInTheDocument();
    });
  });

  test('adds a new interest', async () => {
    const profileData = {
      skills: [],
      interests: ['Coding'],
      points: 100,
    };

    mockedAxios.get.mockResolvedValueOnce({ data: profileData });
    mockedAxios.post.mockResolvedValueOnce({
      data: { ...profileData, interests: ['Coding', 'Music'] },
    });

    renderWithRouter(<Profile />);

    await waitFor(() => {
      expect(screen.getByText('Coding')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByTestId('input-interest'), {
      target: { value: 'Music' },
    });
    fireEvent.click(screen.getByTestId('add-interest-button'));

    await waitFor(() => {
      expect(screen.getByText('Music')).toBeInTheDocument();
    });
  });

  test('removes an interest', async () => {
    const profileData = {
      skills: [],
      interests: ['Coding', 'Music'],
      points: 100,
    };

    mockedAxios.get.mockResolvedValueOnce({ data: profileData });
    mockedAxios.delete.mockResolvedValueOnce({
      data: { ...profileData, interests: ['Coding'] },
    });

    renderWithRouter(<Profile />);

    await waitFor(() => {
      expect(screen.getByText('Music')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('remove-interest-Music'));

    await waitFor(() =>
      expect(screen.queryByText('Music')).not.toBeInTheDocument()
    );
  });
});
